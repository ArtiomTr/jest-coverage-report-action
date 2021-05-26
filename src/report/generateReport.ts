import { setFailed } from '@actions/core';
import { getOctokit } from '@actions/github';
import { context } from '@actions/github';

import { fetchPreviousReport } from './fetchPreviousReport';
import { getReportTag } from '../constants/getReportTag';
import { getFormattedCoverage } from '../format/getFormattedCoverage';
import { getFormattedFailReason } from '../format/getFormattedFailReason';
import { insertArgs } from '../format/insertArgs';
import REPORT from '../format/REPORT.md';
import { FailReason, Report } from '../typings/Report';

export const generateReport = async (
    headReport: Report,
    baseReport: Report,
    coverageThreshold: number | undefined,
    repo: { owner: string; repo: string },
    pr: { number: number },
    octokit: ReturnType<typeof getOctokit>,
    dir?: string
) => {
    const previousReport = await fetchPreviousReport(octokit, repo, pr, dir);

    try {
        let reportContent = '';

        let failReason = headReport.failReason;

        if (
            headReport.success &&
            headReport.summary &&
            headReport.details &&
            !headReport.failReason
        ) {
            if (
                baseReport.success &&
                baseReport.summary &&
                baseReport.details &&
                !baseReport.failReason
            ) {
                reportContent = getFormattedCoverage(
                    headReport.summary,
                    baseReport.summary,
                    headReport.details,
                    baseReport.details,
                    coverageThreshold
                );
            } else {
                console.log(
                    'Skipping reporting without rejecting request, because head is ok, but base branch has not valid coverage.'
                );

                if (previousReport) {
                    await octokit.issues.deleteComment({
                        ...repo,
                        comment_id: (previousReport as { id: number }).id,
                    });
                }

                return;
            }
        } else {
            failReason = failReason ?? FailReason.UNKNOWN_ERROR;
            reportContent = getFormattedFailReason(
                failReason,
                coverageThreshold,
                headReport.summary?.find(
                    (value) => value.title === 'Statements'
                )?.percentage,
                headReport.error
            );
            if (
                failReason === FailReason.UNDER_THRESHOLD &&
                headReport.summary &&
                headReport.details &&
                baseReport.summary &&
                baseReport.details
            ) {
                reportContent = reportContent.concat(
                    '\n',
                    getFormattedCoverage(
                        headReport.summary,
                        baseReport.summary,
                        headReport.details,
                        baseReport.details,
                        coverageThreshold
                    )
                );
            }
        }

        const reportBody = insertArgs(REPORT, {
            head: getReportTag(dir),
            body: reportContent,
            sha: context.sha,
            dir: dir ? `for \`${dir}\`` : '',
        });

        if (previousReport) {
            await octokit.issues.updateComment({
                ...repo,
                body: reportBody,
                comment_id: (previousReport as { id: number }).id,
            });
        } else {
            await octokit.issues.createComment({
                ...repo,
                body: reportBody,
                issue_number: pr.number,
            });
        }

        if (failReason) {
            setFailed(reportContent);
        }
    } catch (error) {
        console.error(
            "Error deleting and/or creating comment. This can happen for PR's originating from a fork without write permissions."
        );
    }
};
