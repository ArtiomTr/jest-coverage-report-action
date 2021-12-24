import { restoreCache, saveCache } from '@actions/cache';
import { context } from '@actions/github';
import isNil from 'lodash/isNil';

import { collectCoverage } from './collectCoverage';
import { installDependencies } from './installDependencies';
import { parseCoverage } from './parseCoverage';
import { runTest } from './runTest';
import { REPORT_PATH } from '../constants/REPORT_PATH';
import { ActionError } from '../typings/ActionError';
import { JsonReport } from '../typings/JsonReport';
import {
    Options,
    shouldInstallDeps,
    shouldRunTestScript,
} from '../typings/Options';
import { FailReason } from '../typings/Report';
import { DataCollector } from '../utils/DataCollector';
import { hashObject } from '../utils/hash';
import { joinPaths } from '../utils/joinPaths';
import { runStage } from '../utils/runStage';

const getCacheKey = (options: Options) => {
    const parts: string[] = [
        // Prefix
        'covbot-report',
        // OS
        process.env['RUNNER_OS'],
        // Necessary options
        hashObject([options.workingDirectory, options.testScript]),
        // Commit sha,
        context.payload.pull_request?.base.sha,
    ];
    return parts.join('-');
};

const getCacheConfig = (options: Options) => ({
    key: getCacheKey(options),
    paths: [joinPaths(options.workingDirectory, REPORT_PATH)],
});

export const getCoverage = async (
    dataCollector: DataCollector<JsonReport>,
    options: Options,
    runAll: boolean,
    coverageFilePath: string | undefined,
    useCache: boolean
): Promise<JsonReport> => {
    const [cacheLoaded] = await runStage(
        'loadCache',
        dataCollector,
        async (skip) => {
            if (!useCache || coverageFilePath) {
                skip();
            }

            const { paths: cachedPaths, key: cacheKey } = getCacheConfig(
                options
            );

            const cacheId = await restoreCache(cachedPaths, cacheKey);

            if (isNil(cacheId)) {
                // Cache miss, TODO: add more detailed message here.
                skip();
            }
        }
    );

    await runStage('install', dataCollector, async (skip) => {
        if (
            cacheLoaded ||
            coverageFilePath ||
            (!runAll && !shouldInstallDeps(options.skipStep))
        ) {
            skip();
        }

        await installDependencies(
            options.packageManager,
            options.workingDirectory
        );
    });

    await runStage('runTest', dataCollector, async (skip) => {
        if (
            cacheLoaded ||
            coverageFilePath ||
            (!runAll && !shouldRunTestScript(options.skipStep))
        ) {
            skip();
        }

        await runTest(options.testScript, options.workingDirectory);
    });

    const [isCoverageCollected, rawCoverage] = await runStage(
        'collectCoverage',
        dataCollector,
        () =>
            collectCoverage(
                dataCollector as DataCollector<unknown>,
                options.workingDirectory,
                coverageFilePath
            )
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

    await runStage('saveCache', dataCollector, async (skip) => {
        if (!useCache || cacheLoaded) {
            skip();
        }

        try {
            const { paths: cachedPaths, key: cacheKey } = getCacheConfig(
                options
            );

            await saveCache(cachedPaths, cacheKey);
        } catch (error) {
            console.warn(`Caching failed:`, error);

            skip();
        }
    });

    if (!coverageParsed || !jsonReport) {
        throw new ActionError(FailReason.FAILED_GETTING_COVERAGE);
    }

    return jsonReport;
};
