import { MESSAGE_HEADING } from './fetchPreviousComment';
import { ParsedCoverageSummary } from './parseCoverageSummary';

export const getCommentBody = (
    headSummary: ParsedCoverageSummary,
    baseSummary: ParsedCoverageSummary
): string => {
    return [MESSAGE_HEADING, 'Hello world!'].join('\n');
};
