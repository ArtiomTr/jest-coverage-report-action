import fs from 'fs';
import { join } from 'path';

import { exec } from '@actions/exec';

import { FailReason } from '../report/generateReport';

const joinPaths = (...segments: Array<string | undefined>) =>
    join(...(segments as string[]).filter((segment) => segment !== undefined));

export const getRawCoverage = async (
    testCommand: string,
    branch?: string,
    workingDirectory?: string
): Promise<
    string | { success: false; failReason: FailReason.TESTS_FAILED }
> => {
    if (branch) {
        // NOTE: It is possible that the 'git fetch -all' command will fail due to different file permissions, but this is unlikely to happen with github actions, so the 'try ~ catch' block is not used.
        await exec(`git fetch --all --depth=1`);
        await exec(`git checkout -f ${branch}`);
    }

    // NOTE: The `npm ci` command is not used. Because if your version of npm is old, the generated `package-lock.json` will also be old, and the latest version of `npm ci` will fail.
    fs.rmdirSync(joinPaths(workingDirectory, 'node_modules'), {
        recursive: true,
    });

    await exec('npm i', undefined, {
        cwd: workingDirectory,
    });

    let output = '';

    try {
        await exec(testCommand, [], {
            listeners: {
                stdout: (data) => (output += data.toString()),
            },
            cwd: workingDirectory,
        });
    } catch (error) {
        console.error(`Test execution failed with message: "${error.message}"`);
        return { success: false, failReason: FailReason.TESTS_FAILED };
    }

    return output;
};
