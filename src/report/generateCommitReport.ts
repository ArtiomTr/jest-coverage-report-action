import { getOctokit } from '@actions/github';

export const generateCommitReport = async (
    report: string,
    repo: { owner: string; repo: string },
    octokit: ReturnType<typeof getOctokit>,
    sha: string
) => {
    await octokit.rest.repos.createCommitComment({
        ...repo,
        commit_sha: sha,
        body: report,
    });
};
