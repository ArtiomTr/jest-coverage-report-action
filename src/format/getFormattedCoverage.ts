import { formatCoverageDetails } from './details/formatCoverageDetails';
import { formatCoverageSummary } from './summary/formatCoverageSummary';
import { ParsedCoverageDetails } from '../collect/parseCoverageDetails';
import { ParsedCoverageSummary } from '../collect/parseCoverageSummary';

export const getFormattedCoverage = (
    headSummary: ParsedCoverageSummary,
    baseSummary: ParsedCoverageSummary,
    headDetails: ParsedCoverageDetails,
    baseDetails: ParsedCoverageDetails
): string => {
    return [
        formatCoverageSummary(headSummary, baseSummary),
        formatCoverageDetails(headDetails, baseDetails),
    ]
        .filter(Boolean)
        .join('\n');
};
