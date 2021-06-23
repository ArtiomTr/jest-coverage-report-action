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
import { generateReport } from './report/generateReport';
import { getOptions } from './typings/Options';
import { FailReason } from './typings/Report';

async function run() {
    try {
        const {
            payload: { pull_request },
            repo,
        } = context;

        if (!pull_request) {
            throw new Error(
                'jest-coverage-report-action supports only pull requests'
            );
        }

        const {
            token,
            testScript,
            threshold,
            workingDirectory,
            iconType,
            annotations,
            skipStep,
        } = await getOptions();

        const octokit = getOctokit(token);

        const [headReport, jsonReport] = await collectCoverage(
            testScript,
            skipStep,
            undefined,
            workingDirectory
        );
        const [baseReport] = await collectCoverage(
            testScript,
            pull_request.base.ref,
            workingDirectory
        );

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

        await generateReport(
            (icons as Record<string, Icons>)[iconType],
            headReport,
            baseReport,
            threshold,
            repo,
            pull_request,
            octokit,
            workingDirectory
        );
    } catch (error) {
        setFailed(error.message);
    }
}

run();
