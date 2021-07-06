import { exec } from '@actions/exec';
import { readFile } from 'fs-extra';

import { REPORT_PATH } from '../constants/REPORT_PATH';
import { PackageManagerType, SkipStepType } from '../typings/Options';
import { FailReason } from '../typings/Report';

export const getRawCoverage = async (
    testCommand: string,
    packageManager: PackageManagerType,
    skipStep: SkipStepType,
    branch?: string,
    workingDirectory?: string
): Promise<
    | string
    | { success: false; failReason: FailReason.TESTS_FAILED; error?: Error }
> => {
    if (branch) {
        // NOTE: It is possible that the 'git fetch -all' command will fail due to different file permissions, so allow that to fail gracefully
    }

    if (shouldInstallDeps(skipStep)) {
    }

    let executionError: Error | undefined = undefined;

    if (shouldRunTestScript(skipStep)) {
        try {
            await exec(testCommand, [], {
                cwd: workingDirectory,
            });
        } catch (error) {
            console.error('Test execution failed with error:', error);
            executionError = error instanceof Error ? error : undefined;
        }
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
