import type { getOctokit } from '@actions/github';

type Octokit = ReturnType<typeof getOctokit>;

export type CreateCheckOptions = Required<
    Parameters<Octokit['rest']['checks']['create']>
>[0];
