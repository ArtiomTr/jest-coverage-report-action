import { relative } from 'path';

import { CoverageDetailsMap } from '../../typings/Coverage';
import { JsonReport } from '../../typings/JsonReport';
import {
    coveredBranchesCounter,
    coveredLinesCounter,
    standardCoveredCounter,
    standardTotalCounter,
    totalBranchesCounter,
    totalLinesCounter,
} from '../counters';
import { getPercents } from '../getPercents';

export const parseDetails = (jsonReport: JsonReport) => {
    return Object.entries(jsonReport.coverageMap).reduce<CoverageDetailsMap>(
        (acc, [filename, fileCoverage]) => {
            const normalizedFilename = relative(process.cwd(), filename);
            acc[normalizedFilename] = {
                filename: normalizedFilename,
                statements: getPercents(
                    standardCoveredCounter('s')(fileCoverage),
                    standardTotalCounter('s')(fileCoverage)
                ),
                functions: getPercents(
                    standardCoveredCounter('f')(fileCoverage),
                    standardTotalCounter('f')(fileCoverage)
                ),
                branches: getPercents(
                    coveredBranchesCounter(fileCoverage),
                    totalBranchesCounter(fileCoverage)
                ),
                lines: getPercents(
                    coveredLinesCounter(fileCoverage),
                    totalLinesCounter(fileCoverage)
                ),
            };
            return acc;
        },
        {}
    );
};
