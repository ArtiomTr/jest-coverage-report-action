import { readFile } from 'fs-extra';

import { REPORT_PATH } from '../constants/REPORT_PATH';
import { FailReason } from '../typings/Report';
import { joinPaths } from '../utils/joinPaths';

export const collectCoverage = async (workingDirectory?: string) => {
    try {
        const outBuff = await readFile(
            joinPaths(workingDirectory, REPORT_PATH)
        );
        return outBuff.toString();
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
            throw FailReason.REPORT_NOT_FOUND;
        }

        throw err;
    }
};
