import { getOctokit } from '@actions/github';

import { getReportTag } from '../constants/getReportTag';

export async function fetchPreviousReport(
    octokit: ReturnType<typeof getOctokit>,
    repo: { owner: string; repo: string },
    pr: { number: number },
    dir?: string
) {
    const commentList = await octokit.paginate(
        'GET /repos/:owner/:repo/issues/:issue_number/comments',
        {
            ...repo,
            issue_number: pr.number,
        }
    );

    const sizeLimitComment = commentList.find((comment) =>
        (comment as { body: string }).body.startsWith(getReportTag(dir))
    );

    return !sizeLimitComment ? null : sizeLimitComment;
}
