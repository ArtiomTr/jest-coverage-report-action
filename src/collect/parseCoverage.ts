import { parseDetails } from './parseDetails';
import { parseSummary } from './parseSummary';
import { JsonReport } from '../typings/JsonReport';
import { Report } from '../typings/Report';

export const parseCoverage = (jsonReport: JsonReport): Report => {
    return {
        success: true,
        summary: parseSummary(jsonReport),
        details: parseDetails(jsonReport),
    };
};
