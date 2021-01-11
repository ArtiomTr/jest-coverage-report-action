import { formatCoverageDetails } from './details/formatCoverageDetails';
import { formatCoverageSummary } from './summary/formatCoverageSummary';
import { ParsedCoverageDetails } from '../collect/parseCoverageDetails';
import { ParsedCoverageSummary } from '../collect/parseCoverageSummary';

export const getFormattedCoverage = (
    headSummary: ParsedCoverageSummary,
    baseSummary: ParsedCoverageSummary,
    headDetails: ParsedCoverageDetails,
    baseDetails: ParsedCoverageDetails,
    threshold: number | undefined
): string =>
    [
        formatCoverageSummary(headSummary, baseSummary, threshold),
        formatCoverageDetails(headDetails, baseDetails, threshold),
    ]
        .filter(Boolean)
        .join('\n');
