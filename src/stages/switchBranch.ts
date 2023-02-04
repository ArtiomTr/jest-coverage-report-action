import { exec } from '@actions/exec';

export const switchBranch = async (branch: string) => {
    try {
        await exec("git fetch --all --depth=1");
    } catch (err) {
        console.warn('Error fetching git repository', err);
    }

    await exec(`git checkout -f ${branch}`);
};

export const getCurrentBranch = async () => {
    try {
        let branchStr = "";
        await exec("git rev-parse --abbrev-ref HEAD", undefined, {
            listeners: {
                stdout: (data) => {
                    branchStr += data.toString();
                }
            }
        });

        return branchStr.trim();
    } catch(err) {
        console.warn('Failed to get current branch', err);
    }

    return undefined;
}