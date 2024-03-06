import { getOctokit } from '@actions/github';

import { CreateCheckOptions } from '../format/annotations/CreateCheckOptions';

export const upsertCheck = async (
    octokit: ReturnType<typeof getOctokit>,
    check: CreateCheckOptions
) => {
    let check_id: number | undefined;

    try {
        const checks = await octokit.rest.checks.listForRef({
            owner: check.owner as string,
            repo: check.repo as string,
            ref: check.head_sha as string,
            check_name: check.name as string,
        });

        if (checks.data.check_runs.length === 1) {
            check_id = checks.data.check_runs[0].id;
        }
    } catch {
        console.warn(
            'Missing `checks: read` permission. It is required to prevent bug when manually rerunning action adds check' +
                ' twice. You can safely ignore this, and enable permission only if you encounter duplicate checks.'
        );
    }

    if (check_id === undefined) {
        await octokit.rest.checks.create(check);
    } else {
        await octokit.rest.checks.update({
            check_run_id: check_id,
            ...check,
            head_sha: undefined,
        });
    }
};
