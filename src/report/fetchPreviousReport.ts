import { getOctokit } from '@actions/github';

import { getReportTag } from '../constants/getReportTag.js';
import { Options } from '../typings/Options.js';

export async function fetchPreviousReport(
    octokit: ReturnType<typeof getOctokit>,
    repo: { owner: string; repo: string },
    pr: { number: number },
    options: Options
) {
    const commentList = await octokit.paginate(
        'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
        {
            ...repo,
            issue_number: pr.number,
        }
    );

    const previousReport = commentList.find((comment) =>
        comment.body?.startsWith(getReportTag(options))
    );

    return !previousReport ? null : previousReport;
}
