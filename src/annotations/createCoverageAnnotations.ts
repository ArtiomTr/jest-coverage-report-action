import { relative } from 'path';

import { Annotation } from './Annotation';
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
        start.line === end.line &&
        start.column !== undefined &&
        end.column !== undefined
            ? start.column
            : undefined,
    end_column:
        start.line === end.line &&
        start.column !== undefined &&
        end.column !== undefined
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
                            title: '🧾 Statement is not covered',
                            message: 'Warning! Not covered statement',
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
                                        title: '🌿 Branch is not covered',
                                        message: `Warning! Not covered branch`,
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
                            title: '🕹 Function is not covered',
                            message: 'Warning! Not covered function',
                        });
                    }
                }
            );
        }
    );

    return annotations;
};
