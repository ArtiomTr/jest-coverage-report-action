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
import { runStage } from './utils/runStage';

async function run() {
    const dataCollector = createDataCollector<JsonReport>();
    const isInPR = context.eventName === 'pull_request';

    const [isInitialized, options] = await runStage(
        'initialize',
        dataCollector,
        getOptions
    );

    const [isHeadCoverageGenerated, headCoverage] = await runStage(
        'headCoverage',
        dataCollector,
        async (skip) => {
            if (!isInitialized) {
                skip();
            }

            return await getCoverage(dataCollector, options!, false);
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

            if (!isInitialized || !isInPR || !baseBranch) {
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

            return await getCoverage(ignoreCollector, options!, true);
        }
    );

    if (baseCoverage) {
        dataCollector.add(baseCoverage);
    }

    const [isReportContentGenerated, reportContent] = await runStage(
        'generateReportContent',
        dataCollector,
        async (skip) => {
            if (!isInitialized) {
                skip();
            }

            return createReport(dataCollector, options?.workingDirectory);
        }
    );

    await runStage('publishReport', dataCollector, async (skip) => {
        if (!isReportContentGenerated) {
            skip();
        }

        const octokit = getOctokit(options!.token);

        if (isInPR) {
            await generatePRReport(
                reportContent!,
                options!.workingDirectory,
                context.repo,
                context.payload.pull_request!,
                octokit
            );
        } else {
            await generateCommitReport(reportContent!, context.repo, octokit);
        }
    });

    await runStage('failedTestsAnnotations', dataCollector, async (skip) => {
        if (!isInitialized || isHeadCoverageGenerated) {
            skip();
        }

        const octokit = getOctokit(options!.token);
        const failedAnnotations = createFailedTestsAnnotations(headCoverage!);

        if (failedAnnotations.length === 0) {
            skip();
        }

        await octokit.checks.create(
            formatFailedTestsAnnotations(headCoverage!, failedAnnotations)
        );
    });

    await runStage('coverageAnnotations', dataCollector, async (skip) => {
        if (!isInitialized || isHeadCoverageGenerated) {
            skip();
        }

        const octokit = getOctokit(options!.token);
        const coverageAnnotations = createCoverageAnnotations(headCoverage!);

        if (coverageAnnotations.length === 0) {
            skip();
        }

        await octokit.checks.create(
            formatCoverageAnnotations(coverageAnnotations)
        );
    });
}

run();
