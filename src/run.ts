import { setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

import { createCoverageAnnotations } from './annotations/createCoverageAnnotations';
import { createFailedTestsAnnotations } from './annotations/createFailedTestsAnnotations';
import { formatCoverageAnnotations } from './format/annotations/formatCoverageAnnotations';
import { formatFailedTestsAnnotations } from './format/annotations/formatFailedTestsAnnotations';
import { generateCommitReport } from './report/generateCommitReport';
import { generatePRReport } from './report/generatePRReport';
import { checkThreshold } from './stages/checkThreshold';
import { createReport } from './stages/createReport';
import { getCoverage } from './stages/getCoverage';
import { switchBack, switchBranch } from './stages/switchBranch';
import { JsonReport } from './typings/JsonReport';
import { getOptions } from './typings/Options';
import { createDataCollector, DataCollector } from './utils/DataCollector';
import { getNormalThreshold } from './utils/getNormalThreshold';
import { i18n } from './utils/i18n';
import { runStage } from './utils/runStage';

export const run = async (
    dataCollector = createDataCollector<JsonReport>()
) => {
    const [isInitialized, options] = await runStage(
        'initialize',
        dataCollector,
        getOptions
    );
    const isInPR = !!options?.pullRequest;

    if (!isInitialized || !options) {
        throw Error('Initialization failed.');
    }

    const [isThresholdParsed, threshold] = await runStage(
        'parseThreshold',
        dataCollector,
        () => {
            return getNormalThreshold(
                options.workingDirectory ?? process.cwd(),
                options.threshold
            );
        }
    );

    const [isHeadCoverageGenerated, headCoverage] = await runStage(
        'headCoverage',
        dataCollector,
        async () => {
            return await getCoverage(
                dataCollector,
                options,
                false,
                options.coverageFile
            );
        }
    );

    if (headCoverage) {
        dataCollector.add(headCoverage);
    }

    const [isSwitched] = await runStage(
        'switchToBase',
        dataCollector,
        async (skip) => {
            const baseBranch = options?.pullRequest?.base?.ref;

            // no need to switch branch when:
            // - this is not a PR
            // - this is the PR base branch
            // - a baseCoverageFile is provided
            if (!isInPR || !baseBranch || !!options.baseCoverageFile) {
                skip();
            }

            await switchBranch(baseBranch as string);
        }
    );

    const ignoreCollector = createDataCollector<JsonReport>();

    const [, baseCoverage] = await runStage(
        'baseCoverage',
        dataCollector,
        async (skip) => {
            if (!isSwitched && !options.baseCoverageFile) {
                skip();
            }

            return await getCoverage(
                ignoreCollector,
                options,
                true,
                options.baseCoverageFile
            );
        }
    );

    await runStage('switchBack', dataCollector, async (skip) => {
        if (!isSwitched) {
            skip();
        }

        await switchBack();
    });

    if (baseCoverage) {
        dataCollector.add(baseCoverage);
    }

    const [, thresholdResults] = await runStage(
        'checkThreshold',
        dataCollector,
        async (skip) => {
            if (!isHeadCoverageGenerated || !isThresholdParsed) {
                skip();
            }

            return checkThreshold(
                headCoverage!,
                threshold!,
                options.workingDirectory,
                dataCollector as DataCollector<unknown>
            );
        }
    );

    const [isReportContentGenerated, summaryReport] = await runStage(
        'generateReportContent',
        dataCollector,
        async () => {
            return createReport(dataCollector, options, thresholdResults ?? []);
        }
    );

    await runStage('publishReport', dataCollector, async (skip) => {
        if (!isReportContentGenerated) {
            skip();
        }

        const octokit = getOctokit(options.token);

        if (isInPR) {
            await generatePRReport(
                summaryReport!.text,
                options,
                context.repo,
                options.pullRequest as { number: number },
                octokit
            );
        } else {
            await generateCommitReport(
                summaryReport!.text,
                context.repo,
                octokit
            );
        }
    });

    await runStage('failedTestsAnnotations', dataCollector, async (skip) => {
        if (
            !isHeadCoverageGenerated ||
            !['all', 'failed-tests'].includes(options.annotations)
        ) {
            skip();
        }

        const failedAnnotations = createFailedTestsAnnotations(headCoverage!);

        if (failedAnnotations.length === 0) {
            skip();
        }

        const octokit = getOctokit(options.token);
        await octokit.checks.create(
            formatFailedTestsAnnotations(
                summaryReport!.runReport,
                failedAnnotations,
                options
            )
        );
    });

    await runStage('coverageAnnotations', dataCollector, async (skip) => {
        if (
            !isHeadCoverageGenerated ||
            !['all', 'coverage'].includes(options.annotations)
        ) {
            skip();
        }

        const coverageAnnotations = createCoverageAnnotations(headCoverage!);

        if (coverageAnnotations.length === 0) {
            skip();
        }

        const octokit = getOctokit(options.token);
        await octokit.checks.create(
            formatCoverageAnnotations(coverageAnnotations, options)
        );
    });

    if (dataCollector.get().errors.length > 0) {
        setFailed(i18n('failed'));
    }
};
