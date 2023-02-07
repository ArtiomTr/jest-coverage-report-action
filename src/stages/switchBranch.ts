import { URL } from 'url';

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

const tryGetGitUrlWithToken = (
    inputUrl: string,
    token: string
): string | undefined => {
    try {
        const url = new URL(inputUrl);
        url.username = token;
        return url.toString();
    } catch {
        return undefined;
    }
};

const checkoutRefNew = async (
    ref: GithubRef,
    remoteName: string,
    newBranchName: string,
    token: string
) => {
    if (
        !ref.ref ||
        !ref.repo ||
        (!ref.repo.ssh_url && !ref.repo.clone_url && !ref.repo.git_url) ||
        !ref.sha
    ) {
        throw new Error('Invalid ref in context - cannot checkout branch');
    }

    const possibleUrls = [
        ref.repo.clone_url,
        ref.repo.git_url,
        ref.repo.ssh_url,
        tryGetGitUrlWithToken(ref.repo.clone_url, token),
    ];

    let repoUrl: string | undefined;
    for (const possibility of possibleUrls) {
        try {
            await exec(`git fetch --depth=1 --dry-run ${possibility}`);
            repoUrl = possibility;
        } catch {
            /* ignored */
        }
    }

    if (!repoUrl) {
        throw new Error(
            `Failed to get git repository url - none of ${JSON.stringify(
                possibleUrls
            )} worked.`
        );
    }

    await exec(`git remote add ${remoteName} ${repoUrl}`);

    try {
        await exec(`git fetch --depth=1 ${remoteName}`);
    } catch (err) {
        console.warn('Error fetching git repository', err);
    }

    await exec(
        `git checkout -b ${newBranchName} --track ${remoteName}/${ref.ref} -f`
    );
};

export const checkoutRef = async (
    ref: GithubRef,
    remoteName: string,
    newBranchName: string,
    token: string
) => {
    // try {
    await checkoutRefNew(ref, remoteName, newBranchName, token);
    // } catch {
    //     try {
    //         await exec(`git fetch --depth=1`);
    //     } catch (err) {
    //         console.warn('Error fetching git repository', err);
    //     }
    //     await exec(`git checkout ${ref.ref} -f`);
    // }
};

export const getCurrentBranch = async () => {
    try {
        let branchStr = '';
        await exec('git rev-parse --abbrev-ref HEAD', undefined, {
            listeners: {
                stdout: (data) => {
                    branchStr += data.toString();
                },
            },
        });

        return branchStr.trim();
    } catch (err) {
        console.warn('Failed to get current branch', err);
    }

    return undefined;
};
