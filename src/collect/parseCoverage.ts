import { parseDetails } from './parseDetails';
import { parseSummary } from './parseSummary';
import { JsonReport } from '../typings/JsonReport';
import { Report } from '../typings/Report';

export const parseCoverage = (source: string): Report => {
    const jsonReport: JsonReport = JSON.parse(source);

    return {
        success: true,
        summary: parseSummary(jsonReport),
        details: parseDetails(jsonReport),
    };
};
