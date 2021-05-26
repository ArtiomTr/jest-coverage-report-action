import { parseDetails } from './parseDetails';
import { parseSummary } from './parseSummary';
import { JsonReport } from '../typings/JsonReport';
import { FailReason, Report } from '../typings/Report';

export const parseCoverage = (source: string): Report => {
    try {
        const jsonReport: JsonReport = JSON.parse(source);

        return {
            success: true,
            summary: parseSummary(jsonReport),
            details: parseDetails(jsonReport),
        };
    } catch (err) {
        return {
            success: false,
            error: err,
            failReason: FailReason.INVALID_COVERAGE_FORMAT,
        };
    }
};
