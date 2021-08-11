import { context } from '@actions/github';

export const getConsoleLink = () => {
    const repositoryUrl =
        context.payload.repository?.html_url ??
        `https://github.com/${context.repo.owner}/${context.repo.repo}`;

    return `${repositoryUrl}/actions/runs/${context.runId}`;
};
