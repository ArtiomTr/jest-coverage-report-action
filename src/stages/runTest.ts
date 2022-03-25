import { exec } from '@actions/exec';

import { getErrorMessage, toErrorWithMessage } from '../utils/getErrorMessage';
import { getTestCommand } from '../utils/getTestCommand';

const THRESHOLD_NOT_MET_REGEX = /Jest:.*coverage threshold for.*not met:.*%\S/gm;

export const runTest = async (
    testCommand: string,
    workingDirectory?: string
) => {
    try {
        await exec(
            await getTestCommand(testCommand, 'report.json', workingDirectory),
            [],
            {
                cwd: workingDirectory,
            }
        );
    } catch (error) {
        console.log('GOT RUN ERROR: ', error);
        const errMessage = getErrorMessage(error) ?? '';

        if (THRESHOLD_NOT_MET_REGEX.test(errMessage)) {
            const newErr = toErrorWithMessage(error);
            const [newMessage] =
                errMessage.match(THRESHOLD_NOT_MET_REGEX) ?? [];

            newErr.message = newMessage;

            throw newErr;
        }

        throw error;
    }
};
