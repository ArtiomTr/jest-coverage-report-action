import { getRawCoverage } from './getRawCoverage';
import { parseCoverage } from './parseCoverage';
import { parseJsonReport } from './parseJsonReport';
import { JsonReport } from '../typings/JsonReport';
import { PackageManagerType } from '../typings/Options';
import { Report } from '../typings/Report';

export const collectCoverage = async (
    testCommand: string,
    packageManager: PackageManagerType,
    branch?: string,
    workingDirectory?: string
): Promise<[Report, JsonReport | undefined]> => {
    const source = await getRawCoverage(
        testCommand,
        packageManager,
        branch,
        workingDirectory
    );

    if (typeof source !== 'string') {
        return [source, undefined];
    }

    const jsonReport = parseJsonReport(source);

    if (
        jsonReport.success === false &&
        (jsonReport as { failReason: unknown }).failReason !== undefined
    ) {
        return [jsonReport, undefined];
    }

    return [parseCoverage(jsonReport as JsonReport), jsonReport as JsonReport];
};
