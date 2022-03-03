import { context, getOctokit } from '@actions/github';

export const generateCommitReport = async (
    report: string,
    repo: { owner: string; repo: string },
    octokit: ReturnType<typeof getOctokit>
) => {
    console.log('Generating commit report');
    await octokit.repos.createCommitComment({
        ...repo,
        commit_sha: context.sha,
        body: report,
    });
};
