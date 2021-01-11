import { argv } from 'process';

import { setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

import { collectCoverage } from './collect/collectCoverage';
import { FailReason, generateReport } from './report/generateReport';

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

        const [token, testScript, coverageThresholdStr] = argv.slice(2);

        const coverageThreshold = coverageThresholdStr
            ? parseFloat(coverageThresholdStr)
            : undefined;

        const octokit = getOctokit(token);

        const headReport = await collectCoverage(testScript);
        const baseReport = await collectCoverage(testScript);

        if (
            coverageThreshold !== undefined &&
            headReport.success &&
            headReport.summary &&
            headReport.details &&
            !headReport.failReason &&
            headReport.summary.lines.percentage < coverageThreshold
        ) {
            headReport.success = false;
            headReport.failReason = FailReason.TOO_SMALL_TOTAL_COVERAGE;
        }

        await generateReport(
            headReport,
            baseReport,
            coverageThreshold,
            repo,
            pull_request,
            octokit
        );
    } catch (error) {
        setFailed(error.message);
    }
}

run();
