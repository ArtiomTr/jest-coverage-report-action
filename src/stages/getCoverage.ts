import { collectCoverage } from './collectCoverage';
import { installDependencies } from './installDependencies';
import { parseCoverage } from './parseCoverage';
import { runTest } from './runTest';
import { ActionError } from '../typings/ActionError';
import { JsonReport } from '../typings/JsonReport';
import {
    Options,
    shouldInstallDeps,
    shouldRunTestScript,
} from '../typings/Options';
import { FailReason } from '../typings/Report';
import { DataCollector } from '../utils/DataCollector';
import { runStage } from '../utils/runStage';

export const getCoverage = async (
    dataCollector: DataCollector<JsonReport>,
    options: Options,
    runAll: boolean,
    coverageFilePath: string | undefined
): Promise<JsonReport> => {
    await runStage('install', dataCollector, async (skip) => {
        if (
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

    if (!coverageParsed || !jsonReport) {
        throw new ActionError(FailReason.FAILED_GETTING_COVERAGE);
    }

    return jsonReport;
};
