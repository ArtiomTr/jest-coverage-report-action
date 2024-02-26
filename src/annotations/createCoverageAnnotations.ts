import { relative } from 'path';

import { JsonReport, Location } from '../typings/JsonReport';
import { i18n } from '../utils/i18n';
import { isValidNumber } from '../utils/isValidNumber';
import { Annotation } from './Annotation';

const getLocation = (
    start: Location = { line: 0 },
    end: Location = { line: 0 }
): {
    start_line?: number;
    end_line?: number;
    start_column?: number;
    end_column?: number;
} => ({
    start_line: Math.min(start.line, end.line),
    end_line: Math.max(end.line),
    ...(start.line === end.line && start.column != null && end.column != null
        ? {
              start_column: Math.max(1, Math.min(start.column, end.column)),
              end_column: Math.max(1, start.column, end.column),
          }
        : {}),
});

export const createCoverageAnnotations = (
    jsonReport: JsonReport,
    annotationFilters: string[]
): Array<Annotation> => {
    const annotations: Partial<Annotation>[] = [];

    if (annotationFilters.length === 0) {
        annotationFilters = ['statement', 'branch', 'function'];
    }

    Object.entries(jsonReport.coverageMap).forEach(
        ([fileName, fileCoverage]) => {
            const normalizedFilename = relative(process.cwd(), fileName);
            const normalizedFileCoverage =
                'statementMap' in fileCoverage
                    ? fileCoverage
                    : fileCoverage.data;
            if (annotationFilters.includes('statement')) {
                Object.entries(normalizedFileCoverage.statementMap).forEach(
                    ([statementIndex, statementCoverage]) => {
                        if (normalizedFileCoverage.s[+statementIndex] === 0) {
                            annotations.push({
                                ...getLocation(
                                    statementCoverage.start,
                                    statementCoverage.end
                                ),
                                path: normalizedFilename,
                                annotation_level: 'warning',
                                title: i18n('notCoveredStatementTitle'),
                                message: i18n('notCoveredStatementMessage'),
                            });
                        }
                    }
                );
            }
            

            if (annotationFilters.includes('branch')) { 
                Object.entries(normalizedFileCoverage.branchMap).forEach(
                    ([branchIndex, branchCoverage]) => {
                        if (branchCoverage.locations) {
                            branchCoverage.locations.forEach(
                                (location, locationIndex) => {
                                    if (
                                        normalizedFileCoverage.b[+branchIndex][
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
                                            title: i18n('notCoveredBranchTitle'),
                                            message: i18n(
                                                'notCoveredBranchMessage'
                                            ),
                                        });
                                    }
                                }
                            );
                        }
                    }
                );
            }

            if (!annotationFilters.includes('function')) { 
                Object.entries(normalizedFileCoverage.fnMap).forEach(
                    ([functionIndex, functionCoverage]) => {
                        if (normalizedFileCoverage.f[+functionIndex] === 0) {
                            annotations.push({
                                ...getLocation(
                                    functionCoverage.decl.start,
                                    functionCoverage.decl.end
                                ),
                                path: normalizedFilename,
                                annotation_level: 'warning',
                                title: i18n('notCoveredFunctionTitle'),
                                message: i18n('notCoveredFunctionMessage'),
                            });
                        }
                    }
                );
            }

        }
    );

    return annotations.filter(
        (annotation): annotation is Annotation =>
            isValidNumber(annotation.start_line) &&
            isValidNumber(annotation.end_line)
    );
};
