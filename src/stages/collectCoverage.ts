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
    const pathToCoverageFile = joinPaths(
        workingDirectory,
        coverageFile || REPORT_PATH
    );

    try {
        // Originally made by Jeremy Gillick (https://github.com/jgillick)
        // Modified after big refactor by Artiom Tretjakovas (https://github.com/ArtiomTr)
        // Load coverage from file

        dataCollector.info(
            i18n('loadingCoverageFromFile', {
                pathToCoverageFile,
            })
        );

        const outputBuffer = await readFile(pathToCoverageFile);

        return outputBuffer.toString();
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            throw new ActionError(FailReason.REPORT_NOT_FOUND, {
                coveragePath: pathToCoverageFile,
            });
        }

        throw new ActionError(FailReason.READING_COVERAGE_FILE_FAILED, {
            error: (error as Error).toString(),
        });
    }
};
