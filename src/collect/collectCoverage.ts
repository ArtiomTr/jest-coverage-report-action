import { getRawCoverage } from './getRawCoverage';
import { parseCoverage } from './parseCoverage';
import { ReportData } from '../report/generateReport';

export const collectCoverage = async (
    testCommand: string,
    branch?: string
): Promise<ReportData> => {
    const source = await getRawCoverage(testCommand, branch);

    if (typeof source === 'string') {
        return parseCoverage(source);
    } else {
        return source;
    }
};
