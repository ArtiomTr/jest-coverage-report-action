import { getRawCoverage } from './getRawCoverage';
import { parseCoverage } from './parseCoverage';
import { ParsedCoverageDetails } from './parseCoverageDetails';
import { ParsedCoverageSummary } from './parseCoverageSummary';

export const collectCoverage = async (
    testCommand: string,
    branch?: string
): Promise<[ParsedCoverageSummary, ParsedCoverageDetails]> => {
    const source = await getRawCoverage(testCommand, branch);

    return parseCoverage(source);
};
