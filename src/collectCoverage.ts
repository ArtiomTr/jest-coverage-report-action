import { readFile } from 'fs-extra';

import { REPORT_PATH } from './constants/REPORT_PATH';
import { FailReason } from './typings/Report';
import { joinPaths } from './joinPaths';

export const collectCoverage = async (workingDirectory?: string) => {
    try {
        const outBuff = await readFile(
            joinPaths(workingDirectory, REPORT_PATH)
        );
        return outBuff.toString();
    } catch (err) {
        if (err.code === 'ENOENT') {
            // TODO: replace with normal error
            throw FailReason.INVALID_COVERAGE_FORMAT;
        }

        throw err;
    }
};
