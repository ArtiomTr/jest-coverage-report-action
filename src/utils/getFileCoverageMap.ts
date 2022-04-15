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
            acc[filename] = {
                totalStatements: standardTotalCounter('s')(fileCoverage),
                coveredStatements: standardCoveredCounter('s')(fileCoverage),
                totalFunctions: standardTotalCounter('f')(fileCoverage),
                coveredFunctions: standardCoveredCounter('f')(fileCoverage),
                totalBranches: totalBranchesCounter(fileCoverage),
                coveredBranches: coveredBranchesCounter(fileCoverage),
                totalLines: totalLinesCounter(fileCoverage),
                coveredLines: coveredLinesCounter(fileCoverage),
            };
            return acc;
        },
        {}
    );
