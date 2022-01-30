import { DetailedFileCoverage } from './getFileCoverageMap';

export const accumulateCoverageDetails = (
    coverageDetails: DetailedFileCoverage[]
): DetailedFileCoverage =>
    coverageDetails.reduce(
        (acc, current) => {
            acc.totalStatements += current.totalStatements;
            acc.coveredStatements += current.coveredStatements;
            acc.totalFunctions += current.totalFunctions;
            acc.coveredFunctions += current.coveredFunctions;
            acc.totalBranches += current.totalBranches;
            acc.coveredBranches += current.coveredBranches;
            acc.totalLines += current.totalLines;
            acc.coveredLines += current.coveredLines;

            return acc;
        },
        {
            totalStatements: 0,
            coveredStatements: 0,
            totalFunctions: 0,
            coveredFunctions: 0,
            totalBranches: 0,
            coveredBranches: 0,
            totalLines: 0,
            coveredLines: 0,
        }
    );
