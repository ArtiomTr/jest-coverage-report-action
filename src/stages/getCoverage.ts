import { restoreCache, saveCache } from '@actions/cache';
import { context } from '@actions/github';

import { collectCoverage } from './collectCoverage';
import { installDependencies } from './installDependencies';
import { parseCoverage } from './parseCoverage';
import { runTest } from './runTest';
import { CacheConfig } from '../typings/CacheConfig';
import { JsonReport } from '../typings/JsonReport';
import {
    Options,
    shouldInstallDeps,
    shouldRunTestScript,
} from '../typings/Options';
import { DataCollector } from '../utils/DataCollector';
import { getReportPath } from '../utils/getReportPath';
import { runStage } from '../utils/runStage';

const getCacheConfig = (options: Options): CacheConfig => {
    return {
        primaryKey: `covbot-report-${process.env['RUNNER_OS']}-${context.payload.pull_request?.base.sha}`,
        paths: [getReportPath(options.workingDirectory)],
    };
};

export const getCoverage = async (
    dataCollector: DataCollector<JsonReport>,
    options: Options,
    runAll: boolean,
    checkCache: boolean
): Promise<JsonReport> => {
    const [isCached] = await runStage(
        'checkCache',
        dataCollector,
        async (skip) => {
            if (!checkCache) {
                skip();
            }
            const cacheConfig = getCacheConfig(options);
            const cacheKey = await restoreCache(
                cacheConfig.paths,
                cacheConfig.primaryKey
            );
            if (cacheKey === undefined) {
                skip();
            }
        }
    );

    await runStage('install', dataCollector, async (skip) => {
        if (isCached || (!runAll && !shouldInstallDeps(options.skipStep))) {
            skip();
        }

        await installDependencies(
            options.packageManager,
            options.workingDirectory
        );
    });

    await runStage('runTest', dataCollector, async (skip) => {
        if (isCached || (!runAll && !shouldRunTestScript(options.skipStep))) {
            skip();
        }

        await runTest(options.testScript, options.workingDirectory);
    });

    const [isCoverageCollected, rawCoverage] = await runStage(
        'collectCoverage',
        dataCollector,
        async () => {
            return await collectCoverage(options.workingDirectory);
        }
    );

    const [coverageParsed, jsonReport] = await runStage(
        'parseCoverage',
        dataCollector,
        async (skip) => {
            if (!isCoverageCollected) {
                skip();
            }

            const jsonReport = parseCoverage(rawCoverage!);

            return jsonReport;
        }
    );

    if (!coverageParsed || !jsonReport) {
        // TODO: set normal error
        throw 0;
    }

    await runStage('saveCache', dataCollector, async (skip) => {
        if (!checkCache || isCached) {
            skip();
        }
        try {
            const cacheConfig = getCacheConfig(options);
            await saveCache(cacheConfig.paths, cacheConfig.primaryKey);
        } catch (error) {
            dataCollector.info(
                `Caching test result failed: ${JSON.stringify(error)}`
            );
            skip();
        }
    });

    return jsonReport;
};
