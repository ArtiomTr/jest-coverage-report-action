import { getOctokit } from '@actions/github';

import { MESSAGE_HEADING } from '../constants/MESSAGE_HEADING';

export async function fetchPreviousReport(
    octokit: ReturnType<typeof getOctokit>,
    repo: { owner: string; repo: string },
    pr: { number: number }
) {
    const commentList = await octokit.paginate(
        'GET /repos/:owner/:repo/issues/:issue_number/comments',
        {
            ...repo,
            issue_number: pr.number,
        }
    );

    const sizeLimitComment = commentList.find((comment) =>
        (comment as { body: string }).body.startsWith(MESSAGE_HEADING)
    );

    return !sizeLimitComment ? null : sizeLimitComment;
}
