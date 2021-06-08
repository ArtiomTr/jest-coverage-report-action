import { argv } from 'process';

import { setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

import { createFailedTestsAnnotations } from './annotations/createFailedTestsAnnotations';
import { collectCoverage } from './collect/collectCoverage';
import { formatFailedTestsAnnotations } from './format/annotations/formatFailedTestsAnnotations';
import { Icons } from './format/Icons';
import { icons } from './format/strings.json';
import { generateReport } from './report/generateReport';
import { FailReason } from './typings/Report';

async function run() {
    try {
        const {
            payload: { pull_request },
            repo,
        } = context;

        if (!pull_request) {
            throw new Error(
                'jest-coverage-report-action supports only pull requests.'
            );
        }

        const [
            token,
            testScript,
            coverageThresholdStr,
            workingDirectory,
            iconType,
        ] = argv.slice(2);

        const coverageThreshold = coverageThresholdStr
            ? parseFloat(coverageThresholdStr)
            : undefined;

        if (!Object.keys(icons).includes(iconType)) {
            throw new Error(
                `Specify icons type (${iconType}) is not supported. Available options: ${Object.keys(
                    icons
                ).join(', ')}.`
            );
        }

        if (
            coverageThreshold !== undefined &&
            (coverageThreshold > 100 || coverageThreshold < 0)
        ) {
            throw new Error(
                `Specified threshold '${coverageThreshold}' is not valid. Threshold should be more than 0 and less than 100.`
            );
        }

        const octokit = getOctokit(token);

        const [headReport, jsonReport] = await collectCoverage(
            testScript,
            undefined,
            workingDirectory
        );
        const [baseReport] = await collectCoverage(
            testScript,
            pull_request.base.ref,
            workingDirectory
        );

        if (
            coverageThreshold !== undefined &&
            headReport.success &&
            headReport.summary &&
            headReport.details &&
            !headReport.failReason &&
            headReport.summary.find((value) => value.title === 'Statements')!
                .percentage < coverageThreshold
        ) {
            headReport.success = false;
            headReport.failReason = FailReason.UNDER_THRESHOLD;
        }

        if (jsonReport) {
            const failedAnnotations = createFailedTestsAnnotations(jsonReport);
            octokit.checks.create(
                formatFailedTestsAnnotations(jsonReport, failedAnnotations)
            );
        }

        await generateReport(
            (icons as Record<string, Icons>)[iconType],
            headReport,
            baseReport,
            coverageThreshold,
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
