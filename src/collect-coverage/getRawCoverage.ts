import { setFailed } from '@actions/core';
import { exec } from '@actions/exec';

export const getRawCoverage = async (testCommand: string, branch?: string) => {
    if (branch) {
        try {
            await exec(`git fetch ${branch} --depth=1`);
        } catch (error) {
            console.error('Fetch failed', error.message);
        }

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
        setFailed(`Test execution failed with message: "${error.message}"`);
    }

    return output;
};
