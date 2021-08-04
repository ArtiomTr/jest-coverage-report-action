import { setFailed } from '@actions/core';
import { getOctokit } from '@actions/github';
import { context } from '@actions/github';

import { getReportBody } from './getReportBody';
import { Icons } from '../format/Icons';
import { FailReason, Report } from '../typings/Report';

export const generateCommitReport = async (
    icons: Icons,
    headReport: Report,
    coverageThreshold: number | undefined,
    repo: { owner: string; repo: string },
    octokit: ReturnType<typeof getOctokit>,
    dir?: string,
    customTitle?: string
) => {
    try {
        const reportBody = getReportBody(
            icons,
            headReport,
            undefined,
            coverageThreshold,
            dir,
            customTitle
        );

        await octokit.repos.createCommitComment({
            ...repo,
            commit_sha: context.sha,
            body: reportBody,
        });

        if (headReport.failReason || !headReport.success || headReport.error) {
            setFailed(headReport.failReason ?? FailReason.UNKNOWN_ERROR);
        }
    } catch (error) {
        console.error(
            "Error deleting and/or creating comment. This can happen for PR's originating from a fork without write permissions.",
            error
        );

        setFailed(error);
    }
};
