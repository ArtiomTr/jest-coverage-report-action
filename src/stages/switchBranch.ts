import { exec } from '@actions/exec';

import { GithubRef } from '../typings/Options';

export const switchBranch = async (branch: string) => {
    try {
        await exec(`git fetch --all --depth=1`);
    } catch (err) {
        console.warn('Error fetching git repository', err);
    }

    await exec(`git checkout -f ${branch}`);
};

const checkoutRefNew = async (
    ref: GithubRef,
    remoteName: string,
    newBranchName: string
) => {
    if (!ref.ref || !ref.repo || !ref.repo.clone_url || !ref.sha) {
        throw new Error('Invalid ref in context - cannot checkout branch');
    }

    try {
        // Make sure repository is accessible
        await exec(`git fetch --depth=1 --dry-run ${ref.repo.clone_url}`);

        // And only then add it as remote
        await exec(`git remote add ${remoteName} ${ref.repo.clone_url}`);
    } catch {
        /* Ignore error */
    }

    try {
        // Try to forcibly fetch remote
        await exec(`git fetch --depth=1 ${remoteName}`);
    } catch {
        /* Ignore error */
    }

    await exec(
        `git checkout -b ${newBranchName} --track ${remoteName}/${ref.ref} -f`
    );
};

export const checkoutRef = async (
    ref: GithubRef,
    remoteName: string,
    newBranchName: string
) => {
    try {
        await checkoutRefNew(ref, remoteName, newBranchName);
    } catch {
        console.warn(
            'Failed to perform new algorithm for checking out. ' +
                'The action will automatically fallback and try to do as much as it could. ' +
                'However, this may lead to inconsistent behavior. Usually, this issue is ' +
                'caused by old version of `actions/checkout` action. Try to use modern ' +
                'version, like `v2` or `v3`.'
        );

        try {
            await exec(`git fetch --depth=1`);
        } catch (err) {
            console.warn('Error fetching git repository', err);
        }
        await exec(`git checkout ${ref.ref} -f`);
    }
};

export const getCurrentBranch = async () => {
    try {
        let branchStr = '';
        await exec('git show -s --pretty=%D HEAD', undefined, {
            listeners: {
                stdout: (data) => {
                    branchStr += data.toString();
                },
            },
        });

        const realBranchName = branchStr.trim().match(/\S+$/);

        if (realBranchName === null) {
            return;
        }

        return realBranchName[0].trim();
    } catch (err) {
        console.warn('Failed to get current branch', err);
    }

    return undefined;
};
