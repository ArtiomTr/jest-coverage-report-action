import { readFile } from 'fs-extra';

import { REPORT_PATH } from '../constants/REPORT_PATH';
import { ActionError } from '../typings/ActionError';
import { FailReason } from '../typings/Report';
import { DataCollector } from '../utils/DataCollector';
import { i18n } from '../utils/i18n';
import { joinPaths } from '../utils/joinPaths';

export const collectCoverage = async (
    dataCollector: DataCollector<unknown>,
    workingDirectory?: string,
    coverageFile?: string
) => {
    const pathToCoverageFile = joinPaths(workingDirectory, REPORT_PATH);

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
            } catch (error) {
                throw new ActionError(FailReason.READING_COVERAGE_FILE_FAILED, {
                    error: (error as Error).toString(),
                });
            }
        }

        const outBuff = await readFile(pathToCoverageFile);

        return outBuff.toString();
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
            throw new ActionError(FailReason.REPORT_NOT_FOUND, {
                coveragePath: pathToCoverageFile,
            });
        }

        throw err;
    }
};
