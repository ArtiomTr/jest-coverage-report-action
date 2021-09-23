import { getOctokit } from '@actions/github';

import { fetchPreviousReport } from './fetchPreviousReport';

export const generatePRReport = async (
    report: string,
    dir: string | undefined,
    repo: { owner: string; repo: string },
    pr: { number: number },
    octokit: ReturnType<typeof getOctokit>
) => {
    const previousReport = await fetchPreviousReport(octokit, repo, pr, dir);

    if (previousReport) {
        await octokit.issues.updateComment({
            ...repo,
            body: report,
            comment_id: (previousReport as { id: number }).id,
        });
    } else {
        await octokit.issues.createComment({
            ...repo,
            body: report,
            issue_number: pr.number,
        });
    }
};
