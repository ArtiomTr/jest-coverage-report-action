import { readFile } from 'fs-extra';

import { REPORT_PATH } from '../constants/REPORT_PATH';
import { FailReason } from '../typings/Report';
import { DataCollector } from '../utils/DataCollector';
import { i18n } from '../utils/i18n';
import { joinPaths } from '../utils/joinPaths';

export const collectCoverage = async (
    dataCollector: DataCollector<unknown>,
    workingDirectory?: string,
    coverageFile?: string
) => {
    try {
        // Originally made by Jeremy Gillick (https://github.com/jgillick)
        // Modified after big refactor by Artiom Tretjakovas (https://github.com/ArtiomTr)
        // Load coverage from file
        if (coverageFile) {
            try {
                dataCollector.info(
                    i18n('loadingCoverageFromFile', { coverageFile })
                );
                const contents = await readFile(coverageFile);
                return contents.toString();
            } catch (err) {
                dataCollector.error(FailReason.READING_COVERAGE_FILE_FAILED);
                throw err;
            }
        }

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
