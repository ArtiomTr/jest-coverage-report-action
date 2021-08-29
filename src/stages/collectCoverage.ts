import { readFile } from 'fs-extra';

import { FailReason } from '../typings/Report';
import { getReportPath } from '../utils/getReportPath';

export const collectCoverage = async (workingDirectory?: string) => {
    try {
        const outBuff = await readFile(getReportPath(workingDirectory));
        return outBuff.toString();
    } catch (err) {
        if ((err as NodeJS.ErrnoException)?.code === 'ENOENT') {
            // TODO: replace with normal error
            throw FailReason.INVALID_COVERAGE_FORMAT;
        }

        throw err;
    }
};
