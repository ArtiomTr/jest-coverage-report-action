import fs from 'fs';

import { exec } from '@actions/exec';

import { FailReason } from '../report/generateReport';

export const getRawCoverage = async (
    testCommand: string,
    branch?: string
): Promise<
    string | { success: false; failReason: FailReason.TESTS_FAILED }
> => {
    if (branch) {
        try {
            await exec(`git fetch ${branch} --depth=1`);
        } catch (error) {
            console.error('Fetch failed', error.message);
        }

        await exec(`git checkout -f ${branch}`);
    }

    // NOTE: The `npm ci` command is not used. Because if your version of npm is old, the generated `package-lock.json` will also be old, and the latest version of `npm ci` will fail.
    fs.rmdirSync('node_modules', { recursive: true });
    await exec('npm i');

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
