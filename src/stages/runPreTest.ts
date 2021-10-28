import { exec } from '@actions/exec';

export const runPreTest = async (
    preTestCommand: string,
    workingDirectory?: string
) => {
    await exec(preTestCommand, [], {
        cwd: workingDirectory,
    });
};
