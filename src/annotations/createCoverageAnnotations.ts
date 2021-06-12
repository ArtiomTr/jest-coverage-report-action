import { relative } from 'path';

import { Annotation } from './Annotation';
import { JsonReport } from '../typings/JsonReport';

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
                            path: normalizedFilename,
                            start_line: statementCoverage.start.line,
                            start_column: statementCoverage.start.column,
                            end_line: statementCoverage.end.line,
                            end_column: statementCoverage.end.column,
                            annotation_level: 'warning',
                            message: 'Statement is not covered',
                        });
                    }
                }
            );
        }
    );

    return annotations;
};
