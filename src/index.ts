import { setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

import { createCoverageAnnotations } from './annotations/createCoverageAnnotations';
import { createFailedTestsAnnotations } from './annotations/createFailedTestsAnnotations';
import { formatCoverageAnnotations } from './format/annotations/formatCoverageAnnotations';
import { formatFailedTestsAnnotations } from './format/annotations/formatFailedTestsAnnotations';
import { generateCommitReport } from './report/generateCommitReport';
import { generatePRReport } from './report/generatePRReport';
import { createReport } from './stages/createReport';
import { getCoverage } from './stages/getCoverage';
import { switchBranch } from './stages/switchBranch';
import { JsonReport } from './typings/JsonReport';
import { getOptions } from './typings/Options';
import { createDataCollector } from './utils/DataCollector';
import { i18n } from './utils/i18n';
import { runStage } from './utils/runStage';

async function run() {
    const dataCollector = createDataCollector<JsonReport>();
    const isInPR = context.eventName === 'pull_request';

    const [isInitialized, options] = await runStage(
        'initialize',
        dataCollector,
        getOptions
    );

    if (!isInitialized || !options) {
        throw Error('Initialization failed.');
    }

    const [isHeadCoverageGenerated, headCoverage] = await runStage(
        'headCoverage',
        dataCollector,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async (_skip) => {
            return await getCoverage(dataCollector, options, false);
        }
    );

    if (headCoverage) {
        dataCollector.add(headCoverage);
    }

    const [isSwitched] = await runStage(
        'switchToBase',
        dataCollector,
        async (skip) => {
            const baseBranch = context.payload.pull_request?.base.ref;

            if (!isInPR || !baseBranch) {
                skip();
            }

            await switchBranch(baseBranch);
        }
    );

    const ignoreCollector = createDataCollector<JsonReport>();

    const [, baseCoverage] = await runStage(
        'baseCoverage',
        dataCollector,
        async (skip) => {
            if (!isSwitched) {
                skip();
            }

            return await getCoverage(ignoreCollector, options, true);
        }
    );

    if (baseCoverage) {
        dataCollector.add(baseCoverage);
    }

    const [isReportContentGenerated, reportContent] = await runStage(
        'generateReportContent',
        dataCollector,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async (_skip) => {
            return createReport(dataCollector, options?.workingDirectory);
        }
    );

    await runStage('publishReport', dataCollector, async (skip) => {
        if (!isReportContentGenerated) {
            skip();
        }

        const octokit = getOctokit(options.token);

        if (isInPR) {
            await generatePRReport(
                reportContent!,
                options.workingDirectory,
                context.repo,
                context.payload.pull_request!,
                octokit
            );
        } else {
            await generateCommitReport(reportContent!, context.repo, octokit);
        }
    });

    await runStage('failedTestsAnnotations', dataCollector, async (skip) => {
        if (
            !isHeadCoverageGenerated ||
            !['all', 'failed-tests'].includes(options.annotations)
        ) {
            skip();
        }

        const octokit = getOctokit(options.token);
        const failedAnnotations = createFailedTestsAnnotations(headCoverage!);

        if (failedAnnotations.length === 0) {
            skip();
        }

        await octokit.checks.create(
            formatFailedTestsAnnotations(headCoverage!, failedAnnotations)
        );
    });

    await runStage('coverageAnnotations', dataCollector, async (skip) => {
        if (
            !isHeadCoverageGenerated ||
            !['all', 'coverage'].includes(options.annotations)
        ) {
            skip();
        }

        const octokit = getOctokit(options.token);
        const coverageAnnotations = createCoverageAnnotations(headCoverage!);

        if (coverageAnnotations.length === 0) {
            skip();
        }

        await octokit.checks.create(
            formatCoverageAnnotations(coverageAnnotations)
        );
    });

    if (dataCollector.get().errors.length > 0) {
        setFailed(i18n('failed'));
    }
}

run();
