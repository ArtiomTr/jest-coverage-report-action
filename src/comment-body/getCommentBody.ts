import { formatCoverageDetails } from './details/formatCoverageDetails';
import { formatCoverageSummary } from './summary/formatCoverageSummary';
import { ParsedCoverageDetails } from '../collect-coverage/parseCoverageDetails';
import { ParsedCoverageSummary } from '../collect-coverage/parseCoverageSummary';
import { MESSAGE_HEADING } from '../fetchPreviousComment';

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
