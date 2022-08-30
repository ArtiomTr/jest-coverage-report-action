import { context, getOctokit } from '@actions/github';

import { Options } from '../typings/Options';

export async function getPrPatch(
    octokit: ReturnType<typeof getOctokit>,
    options: Options
): Promise<string> {
    const response: { data: string } = ((await octokit.rest.pulls.get({
        ...context.repo,
        pull_number: options.pullRequest!.number,
        headers: {
            accept: 'application/vnd.github.v3.patch',
        },
    })) as unknown) as { data: string };
    const patch = response.data;
    return patch;
}
