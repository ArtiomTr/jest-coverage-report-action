import { parseCoverageDetails } from './parseCoverageDetails';
import { parseCoverageSummary } from './parseCoverageSummary';
import { FailReason, ReportData } from '../report/generateReport';

export const parseCoverage = (source: string): ReportData => {
    if (!source.includes('-') || !source.includes('=')) {
        return {
            success: false,
            failReason: FailReason.INVALID_COVERAGE_FORMAT,
        };
    }

    return {
        success: true,
        summary: parseCoverageSummary(source),
        details: parseCoverageDetails(source),
    };
};
