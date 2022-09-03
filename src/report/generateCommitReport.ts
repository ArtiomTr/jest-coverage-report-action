import { context, getOctokit } from '@actions/github';

export const generateCommitReport = async (
    report: string,
    repo: { owner: string; repo: string },
    octokit: ReturnType<typeof getOctokit>
) => {
    await octokit.rest.repos.createCommitComment({
        ...repo,
        commit_sha: context.sha,
        body: report,
    });
};
