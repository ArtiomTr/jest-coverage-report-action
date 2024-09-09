import { context, getOctokit } from '@actions/github';
import { Endpoints } from '@octokit/types';

import { Options } from '../typings/Options';

type getPullsResponse = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}']['response'];

export async function getPrPatch(
    octokit: ReturnType<typeof getOctokit>,
    options: Options
): Promise<string> {
    const pullsResponse: getPullsResponse = ((await octokit.rest.pulls.get({
        ...context.repo,
        pull_number: options.pullRequest!.number,
    })) as unknown) as getPullsResponse;

    const headSha = pullsResponse.data.head.sha;
    const baseSha = pullsResponse.data.base.sha;

    const compareResponse: {
        data: string;
    } = ((await octokit.rest.repos.compareCommits({
        ...context.repo,
        base: baseSha,
        head: headSha,
        headers: {
            accept: 'application/vnd.github.v3.patch',
        },
    })) as unknown) as { data: string };

    return compareResponse.data;
}
