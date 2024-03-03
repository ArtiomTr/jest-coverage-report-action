import { getOctokit } from '@actions/github';

import { CreateCheckOptions } from '../format/annotations/CreateCheckOptions';

export const upsertCheck = async (
    octokit: ReturnType<typeof getOctokit>,
    check: CreateCheckOptions
) => {
    const checks = await octokit.rest.checks.listForRef({
        owner: check.owner as string,
        repo: check.repo as string,
        ref: check.head_sha as string,
        check_name: check.name as string,
    });

    if (checks.data.check_runs.length !== 1) {
        await octokit.rest.checks.create(check);
    } else {
        await octokit.rest.checks.update({
            check_run_id: checks.data.check_runs[0].id,
            ...check,
            head_sha: undefined,
        });
    }
};
