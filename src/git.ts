import core from '@actions/core';
import { exec } from '@actions/exec';

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
        core.warning(
            'Unable to retrieve current git branch. Please note that this may cause potential issues ' +
                'as the system will not revert back to the original branch once the action is completed. ' +
                err
        );
    }

    return undefined;
};
