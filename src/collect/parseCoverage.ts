import { relative } from 'path';

import { getSummary } from './getSummary';
import { CoverageDetailsMap } from '../typings/Coverage';
import { FileCoverage, JsonReport } from '../typings/JsonReport';
import { Report } from '../typings/Report';

const standardTotalCounter = (key: keyof FileCoverage) => (
    value: FileCoverage
) => Object.values(value[key]).length;

const standardCoveredCounter = (key: keyof FileCoverage) => (
    value: FileCoverage
) => Object.values(value[key]).filter((hits) => hits > 0).length;

const totalBranchesCounter = (value: FileCoverage) =>
    Object.values(value.b).reduce((acc, branch) => acc + branch.length, 0);

const coveredBranchesCounter = (value: FileCoverage) =>
    Object.values(value.b).reduce(
        (acc, branch) => acc + branch.filter((hits) => hits > 0).length,
        0
    );

export const parseCoverage = (source: string): Report => {
    const jsonReport: JsonReport = JSON.parse(source);

    const summary = [
        getSummary(
            jsonReport.coverageMap,
            standardTotalCounter('s'),
            standardCoveredCounter('s'),
            'Statements'
        ),
        getSummary(
            jsonReport.coverageMap,
            totalBranchesCounter,
            coveredBranchesCounter,
            'Branches'
        ),
        getSummary(
            jsonReport.coverageMap,
            standardTotalCounter('f'),
            standardCoveredCounter('f'),
            'Functions'
        ),
    ];

    const details = Object.entries(
        jsonReport.coverageMap
    ).reduce<CoverageDetailsMap>((acc, [filename, fileCoverage]) => {
        const normalizedFilename = relative(process.cwd(), filename);
        acc[normalizedFilename] = {
            filename: normalizedFilename,
            statements:
                standardCoveredCounter('s')(fileCoverage) /
                standardTotalCounter('s')(fileCoverage),
            functions:
                standardCoveredCounter('f')(fileCoverage) /
                standardTotalCounter('f')(fileCoverage),
            branches:
                coveredBranchesCounter(fileCoverage) /
                totalBranchesCounter(fileCoverage),
        };
        return acc;
    }, {});

    return {
        success: true,
        summary,
        details,
    };
};
