import { exec } from '@actions/exec';

import { FailReason } from '../report/generateReport';

export const getRawCoverage = async (
    testCommand: string,
    branch?: string
): Promise<
    string | { success: false; failReason: FailReason.TESTS_FAILED }
> => {
    if (branch) {
        // NOTE: It is possible that the 'git fetch -all' command will fail due to different file permissions, but this is unlikely to happen with github actions, so the 'try ~ catch' block is not used.
        await exec(`git fetch --all --depth=1`);
        await exec(`git checkout -f ${branch}`);
    }

    await exec('npm ci');

    let output = '';

    try {
        await exec(testCommand, [], {
            listeners: {
                stdout: (data) => (output += data.toString()),
            },
        });
    } catch (error) {
        console.error(`Test execution failed with message: "${error.message}"`);
        return { success: false, failReason: FailReason.TESTS_FAILED };
    }

    return output;
};
