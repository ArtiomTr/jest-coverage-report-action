import { parseDetails } from './details/parseDetails.js';
import { parseSummary } from './summary/parseSummary.js';
import { getFormattedCoverage } from './getFormattedCoverage.js';
import { JsonReport } from '../typings/JsonReport.js';

export const formatCoverage = (
    headReport: JsonReport | undefined,
    baseReport: JsonReport | undefined,
    threshold: number | undefined,
    hideDetails: boolean | undefined
): string => {
    if (headReport) {
        return getFormattedCoverage(
            parseSummary(headReport),
            baseReport ? parseSummary(baseReport) : undefined,
            parseDetails(headReport),
            baseReport ? parseDetails(baseReport) : undefined,
            threshold,
            hideDetails
        );
    }

    return '';
};
