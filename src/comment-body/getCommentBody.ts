import { formatCoverageDetails } from './details/formatCoverageDetails';
import { formatCoverageSummary } from './summary/formatCoverageSummary';
import { MESSAGE_HEADING } from '../fetchPreviousComment';
import { ParsedCoverageDetails } from '../parseCoverageDetails';
import { ParsedCoverageSummary } from '../parseCoverageSummary';

export const getCommentBody = (
    headSummary: ParsedCoverageSummary,
    baseSummary: ParsedCoverageSummary,
    headDetails: ParsedCoverageDetails,
    baseDetails: ParsedCoverageDetails
): string => {
    return [
        MESSAGE_HEADING,
        formatCoverageSummary(headSummary, baseSummary),
        formatCoverageDetails(headDetails, baseDetails),
    ]
        .filter(Boolean)
        .join('\n');
};
