import { getRawCoverage } from './getRawCoverage';
import { parseCoverage } from './parseCoverage';
import { Report } from '../typings/Report';

export const collectCoverage = async (
    testCommand: string,
    branch?: string,
    workingDirectory?: string
): Promise<Report> => {
    const source = await getRawCoverage(testCommand, branch, workingDirectory);

    if (typeof source === 'string') {
        return parseCoverage(source);
    } else {
        return source;
    }
};
