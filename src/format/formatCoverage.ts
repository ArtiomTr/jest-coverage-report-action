import { parseDetails } from './details/parseDetails';
import { parseSummary } from './summary/parseSummary';
import { getFormattedCoverage } from './getFormattedCoverage';
import { JsonReport } from '../typings/JsonReport';

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
