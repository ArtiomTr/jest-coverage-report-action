import { restoreCache, saveCache } from '@actions/cache';
import { context } from '@actions/github';

import { collectCoverage } from './collectCoverage';
import { installDependencies } from './installDependencies';
import { parseCoverage } from './parseCoverage';
import { runTest } from './runTest';
import { JsonReport } from '../typings/JsonReport';
import {
    Options,
    shouldInstallDeps,
    shouldRunTestScript,
} from '../typings/Options';
import { DataCollector } from '../utils/DataCollector';
import { getReportPath } from '../utils/getReportPath';
import { runStage } from '../utils/runStage';

const getCacheKey = () => {
    return `covbot-report-2${process.env['RUNNER_OS']}-${context.payload.pull_request?.base.sha}`;
};
export const getCoverage = async (
    dataCollector: DataCollector<JsonReport>,
    options: Options,
    runAll: boolean,
    checkCache: boolean
): Promise<JsonReport> => {
    const [isCached, _] = await runStage(
        'checkCache',
        dataCollector,
        async (skip) => {
            if (!checkCache) {
                skip();
            }
            const reportPath = getReportPath(options.workingDirectory);
            const paths = [reportPath];
            const restoreKeys = ['covbot-report-'];
            const cacheKey = await restoreCache(
                paths,
                getCacheKey(),
                restoreKeys
            );
            console.log({ cacheKey });
            if (cacheKey === undefined) {
                throw Error('Cache not found');
            }
        }
    );

    await runStage('install', dataCollector, async (skip) => {
        if (isCached || (!runAll && !shouldInstallDeps(options!.skipStep))) {
            skip();
        }

        await installDependencies(
            options?.packageManager,
            options?.workingDirectory
        );
    });

    await runStage('runTest', dataCollector, async (skip) => {
        if (isCached || (!runAll && !shouldRunTestScript(options!.skipStep))) {
            skip();
        }

        await runTest(options!.testScript, options?.workingDirectory);
    });

    const [isCoverageCollected, rawCoverage] = await runStage(
        'collectCoverage',
        dataCollector,
        async () => {
            return await collectCoverage(options!.workingDirectory);
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

    if (!coverageParsed) {
        // TODO: set normal error
        throw 0;
    }

    await runStage('saveCache', dataCollector, async (skip) => {
        if (!checkCache || isCached) {
            skip();
        }
        const reportPath = getReportPath(options.workingDirectory);
        const paths = [reportPath];
        const cacheId = await saveCache(paths, getCacheKey());
        console.log({ cacheId });
    });

    return jsonReport!;
};
