import { join } from 'path';

import { exec } from '@actions/exec';
import { readFile, rm } from 'fs-extra';

import { REPORT_PATH } from '../constants/REPORT_PATH';
import { FailReason } from '../typings/Report';

const joinPaths = (...segments: Array<string | undefined>) =>
    join(...(segments as string[]).filter((segment) => segment !== undefined));

export const getRawCoverage = async (
    testCommand: string,
    branch?: string,
    workingDirectory?: string
): Promise<
    | string
    | { success: false; failReason: FailReason.TESTS_FAILED; error?: Error }
> => {
    if (branch) {
        await exec(`git checkout -f ${branch}`);
    }

    // NOTE: The `npm ci` command is not used. Because if your version of npm is old, the generated `package-lock.json` will also be old, and the latest version of `npm ci` will fail.
    await rm(joinPaths(workingDirectory, 'node_modules'), {
        recursive: true,
        force: true,
    });

    await exec('npm i', undefined, {
        cwd: workingDirectory,
    });

    let executionError: Error | undefined = undefined;

    try {
        await exec(testCommand, [], {
            cwd: workingDirectory,
        });
    } catch (error) {
        console.error('Test execution failed with error:', error);
        executionError = error instanceof Error ? error : undefined;
    }

    try {
        const outBuff = await readFile(
            joinPaths(workingDirectory, REPORT_PATH)
        );
        return outBuff.toString();
    } catch (error) {
        console.error(
            'Could not read report file located at',
            joinPaths(workingDirectory, REPORT_PATH),
            error
        );

        return {
            success: false,
            failReason: FailReason.TESTS_FAILED,
            error: executionError,
        };
    }
};
