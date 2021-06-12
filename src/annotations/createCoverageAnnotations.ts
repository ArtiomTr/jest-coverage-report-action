import { relative } from 'path';

import { Annotation } from './Annotation';
import {
    notCoveredBranchMessage,
    notCoveredBranchTitle,
    notCoveredFunctionMessage,
    notCoveredFunctionTitle,
    notCoveredStatementMessage,
    notCoveredStatementTitle,
} from '../format/strings.json';
import { JsonReport, Location } from '../typings/JsonReport';

const getLocation = (
    start: Location = { line: 0 },
    end: Location = { line: 0 }
): {
    start_line: number;
    end_line: number;
    start_column?: number;
    end_column?: number;
} => ({
    start_line: start.line,
    end_line: end.line,
    start_column:
        start.line === end.line && start.column !== null && end.column !== null
            ? start.column
            : undefined,
    end_column:
        start.line === end.line && start.column !== null && end.column !== null
            ? end.column
            : undefined,
});

export const createCoverageAnnotations = (
    jsonReport: JsonReport
): Array<Annotation> => {
    const annotations: Annotation[] = [];

    Object.entries(jsonReport.coverageMap).forEach(
        ([fileName, fileCoverage]) => {
            const normalizedFilename = relative(process.cwd(), fileName);
            Object.entries(fileCoverage.statementMap).forEach(
                ([statementIndex, statementCoverage]) => {
                    if (fileCoverage.s[+statementIndex] === 0) {
                        annotations.push({
                            ...getLocation(
                                statementCoverage.start,
                                statementCoverage.end
                            ),
                            path: normalizedFilename,
                            annotation_level: 'warning',
                            title: notCoveredStatementTitle,
                            message: notCoveredStatementMessage,
                        });
                    }
                }
            );

            Object.entries(fileCoverage.branchMap).forEach(
                ([branchIndex, branchCoverage]) => {
                    if (branchCoverage.locations) {
                        branchCoverage.locations.forEach(
                            (location, locationIndex) => {
                                if (
                                    fileCoverage.b[+branchIndex][
                                        locationIndex
                                    ] === 0
                                ) {
                                    annotations.push({
                                        ...getLocation(
                                            location.start,
                                            location.end
                                        ),
                                        path: normalizedFilename,
                                        annotation_level: 'warning',
                                        title: notCoveredBranchTitle,
                                        message: notCoveredBranchMessage,
                                    });
                                }
                            }
                        );
                    }
                }
            );

            Object.entries(fileCoverage.fnMap).forEach(
                ([functionIndex, functionCoverage]) => {
                    if (fileCoverage.f[+functionIndex] === 0) {
                        annotations.push({
                            ...getLocation(
                                functionCoverage.decl.start,
                                functionCoverage.decl.end
                            ),
                            path: normalizedFilename,
                            annotation_level: 'warning',
                            title: notCoveredFunctionTitle,
                            message: notCoveredFunctionMessage,
                        });
                    }
                }
            );
        }
    );

    return annotations;
};
