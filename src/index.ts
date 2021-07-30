import { setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

import { createCoverageAnnotations } from './annotations/createCoverageAnnotations';
import { createFailedTestsAnnotations } from './annotations/createFailedTestsAnnotations';
import { isAnnotationEnabled } from './annotations/isAnnotationEnabled';
import { collectCoverage } from './collect/collectCoverage';
import { formatCoverageAnnotations } from './format/annotations/formatCoverageAnnotations';
import { formatFailedTestsAnnotations } from './format/annotations/formatFailedTestsAnnotations';
import { Icons } from './format/Icons';
import { icons } from './format/strings.json';
import { generateCommitReport } from './report/generateCommitReport';
import { generatePRReport } from './report/generatePRReport';
import { getOptions } from './typings/Options';
import { FailReason, Report } from './typings/Report';

async function run() {
    try {
        const { payload: { pull_request } = {}, repo } = context;

        const {
            token,
            testScript,
            threshold,
            workingDirectory,
            iconType,
            annotations,
            packageManager,
            skipStep,
            customTitle,
        } = await getOptions();

        const octokit = getOctokit(token);

        const isInPR = context.eventName === 'pull_request';

        const [headReport, jsonReport] = await collectCoverage(
            testScript,
            packageManager,
            skipStep,
            undefined,
            workingDirectory
        );

        let baseReport: Report | undefined = undefined;

        if (isInPR && pull_request) {
            const [generatedBaseReport] = await collectCoverage(
                testScript,
                packageManager,
                skipStep,
                pull_request.base.ref,
                workingDirectory
            );

            baseReport = generatedBaseReport;
        }

        if (
            threshold !== undefined &&
            headReport.success &&
            headReport.summary &&
            headReport.details &&
            !headReport.failReason &&
            headReport.summary.find((value) => value.title === 'Statements')!
                .percentage < threshold
        ) {
            headReport.success = false;
            headReport.failReason = FailReason.UNDER_THRESHOLD;
        }

        if (jsonReport && isAnnotationEnabled(annotations, 'failed-tests')) {
            const failedAnnotations = createFailedTestsAnnotations(jsonReport);
            if (failedAnnotations.length > 0) {
                try {
                    await octokit.checks.create(
                        formatFailedTestsAnnotations(
                            jsonReport,
                            failedAnnotations
                        )
                    );
                } catch (err) {
                    console.error('Failed to create annotations', err);
                }
            }
        }

        if (
            jsonReport &&
            isAnnotationEnabled(annotations, 'coverage') &&
            headReport.summary
        ) {
            const coverageAnnotations = createCoverageAnnotations(jsonReport);
            if (coverageAnnotations.length > 0) {
                const coverage = headReport.summary.find(
                    (value) => value.title === 'Statements'
                )!.percentage;
                try {
                    await octokit.checks.create(
                        formatCoverageAnnotations(
                            !threshold || coverage > threshold,
                            coverage,
                            threshold!,
                            coverageAnnotations
                        )
                    );
                } catch (err) {
                    console.error('Failed to create annotations', err);
                }
            }
        }

        if (isInPR && baseReport && pull_request) {
            await generatePRReport(
                (icons as Record<string, Icons>)[iconType],
                headReport,
                baseReport,
                threshold,
                repo,
                pull_request,
                octokit,
                workingDirectory,
                customTitle
            );
        } else if (!isInPR) {
            await generateCommitReport(
                (icons as Record<string, Icons>)[iconType],
                headReport,
                threshold,
                repo,
                octokit,
                workingDirectory,
                customTitle
            );
        } else {
            throw new Error(
                'Something went wrong! Looks like action runs in PR, but report for the base branch or pull_request information is missing!'
            );
        }
    } catch (error) {
        setFailed(error.message);
    }
}

run();
