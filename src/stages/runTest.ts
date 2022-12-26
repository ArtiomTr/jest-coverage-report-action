import { exec } from '@actions/exec';

import { getTestCommand } from '../utils/getTestCommand.js';

export const runTest = async (
    testCommand: string,
    workingDirectory?: string
) => {
    await exec(
        await getTestCommand(testCommand, 'report.json', workingDirectory),
        [],
        {
            cwd: workingDirectory,
        }
    );
};
