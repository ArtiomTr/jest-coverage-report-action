import { context, getOctokit } from '@actions/github';

import {
    PullRequestInfo,
    PullRequestInfoQuery,
    PullRequestInfoQueryVariables,
} from './generated/graphql';

export type Octokit = ReturnType<typeof getOctokit>;

function graphql<TQuery, TQueryVariables extends Record<string, unknown>>(
    octokit: Octokit,
    source: string,
    variables: TQueryVariables
) {
    return octokit.graphql<TQuery>(source, {
        ...variables,
    });
}

export const getPullRequestInfo = async (
    octokit: Octokit,
    prNumber?: number
) => {
    if (context?.payload?.pull_request) {
        return context?.payload?.pull_request;
    }

    if (!prNumber) {
        return;
    }

    const output = await graphql<
        PullRequestInfoQuery,
        PullRequestInfoQueryVariables
    >(octokit, PullRequestInfo, {
        repo: context.repo.repo,
        owner: context.repo.owner,
        prNumber,
    });

    output.repository?.pullRequest?.baseRef?.repository.nameWithOwner;
};
