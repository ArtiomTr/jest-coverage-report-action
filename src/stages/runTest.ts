import { exec } from '@actions/exec';

export const runTest = async (
    testCommand: string,
    workingDirectory?: string
) => {
    await exec(testCommand, [], {
        cwd: workingDirectory,
    });
};
