import { collectCoverage } from './collectCoverage.js';
import { installDependencies } from './installDependencies.js';
import { parseCoverage } from './parseCoverage.js';
import { runTest } from './runTest.js';
import { ActionError } from '../typings/ActionError.js';
import { JsonReport } from '../typings/JsonReport.js';
import {
    Options,
    shouldInstallDeps,
    shouldRunTestScript,
} from '../typings/Options.js';
import { FailReason } from '../typings/Report.js';
import { DataCollector } from '../utils/DataCollector.js';
import { runStage } from '../utils/runStage.js';

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
