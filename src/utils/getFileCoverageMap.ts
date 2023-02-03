import {
    coveredBranchesCounter,
    coveredLinesCounter,
    standardCoveredCounter,
    standardTotalCounter,
    totalBranchesCounter,
    totalLinesCounter,
} from '../format/counters';
import { JsonReport } from '../typings/JsonReport';

export type DetailedFileCoverage = {
    totalStatements: number;
    coveredStatements: number;
    totalFunctions: number;
    coveredFunctions: number;
    totalBranches: number;
    coveredBranches: number;
    totalLines: number;
    coveredLines: number;
};

export type FileCoverageMap = Record<string, DetailedFileCoverage>;

export const getFileCoverageMap = (jsonReport: JsonReport) =>
    Object.entries(jsonReport.coverageMap).reduce<FileCoverageMap>(
        (acc, [filename, fileCoverage]) => {
            const normalizedFileCoverage =
                'statementMap' in fileCoverage
                    ? fileCoverage
                    : fileCoverage.data;

            acc[filename] = {
                totalStatements: standardTotalCounter('s')(
                    normalizedFileCoverage
                ),
                coveredStatements: standardCoveredCounter('s')(
                    normalizedFileCoverage
                ),
                totalFunctions: standardTotalCounter('f')(
                    normalizedFileCoverage
                ),
                coveredFunctions: standardCoveredCounter('f')(
                    normalizedFileCoverage
                ),
                totalBranches: totalBranchesCounter(normalizedFileCoverage),
                coveredBranches: coveredBranchesCounter(normalizedFileCoverage),
                totalLines: totalLinesCounter(normalizedFileCoverage),
                coveredLines: coveredLinesCounter(normalizedFileCoverage),
            };
            return acc;
        },
        {}
    );
