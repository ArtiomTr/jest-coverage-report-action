import { relative } from 'path';

import {} from '@actions/exec';

import { Annotation } from './Annotation';
import { JsonReport, Location } from '../typings/JsonReport';

const getLocation = (
    start: Location,
    end: Location
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
                            start_line: statementCoverage.start.line,
                            // start_column:
                            //     statementCoverage.start.column ?? undefined,
                            end_line: statementCoverage.end.line,
                            // end_column:
                            //     statementCoverage.end.column ?? undefined,
                            annotation_level: 'warning',
                            title: 'Statement is not covered',
                            message: 'Statement is not covered',
                        });
                    }
                }
            );
        }
    );

    return annotations;
};
