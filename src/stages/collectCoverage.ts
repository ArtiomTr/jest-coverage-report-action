import { readFile } from 'fs-extra';

import { FailReason } from '../typings/Report';
import { getReportPath } from '../utils/getReportPath';

export const collectCoverage = async (workingDirectory?: string) => {
    try {
        const outBuff = await readFile(getReportPath(workingDirectory));
        return outBuff.toString();
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
            throw FailReason.REPORT_NOT_FOUND;
        }

        throw err;
    }
};
