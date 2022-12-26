import { findCommonPath } from './findCommonPath.js';
import { CoverageDetailsMap } from '../../typings/Coverage.js';
import { JsonReport } from '../../typings/JsonReport.js';
import { getFileCoverageMap } from '../../utils/getFileCoverageMap.js';
import { getPercents } from '../getPercents.js';

export const parseDetails = (jsonReport: JsonReport) => {
    // Find common root directory
    const filepaths = Object.keys(jsonReport.coverageMap);
    const trimPath = findCommonPath(filepaths).length;

    const fileCoverageMap = getFileCoverageMap(jsonReport);

    return Object.entries(fileCoverageMap).reduce<CoverageDetailsMap>(
        (acc, [filename, coverage]) => {
            const normalizedFilename = filename.substring(trimPath);

            acc[normalizedFilename] = {
                filename: normalizedFilename,
                statements: getPercents(
                    coverage.coveredStatements,
                    coverage.totalStatements
                ),
                branches: getPercents(
                    coverage.coveredBranches,
                    coverage.totalBranches
                ),
                functions: getPercents(
                    coverage.coveredFunctions,
                    coverage.totalFunctions
                ),
                lines: getPercents(coverage.coveredLines, coverage.totalLines),
            };

            return acc;
        },
        {}
    );
};
