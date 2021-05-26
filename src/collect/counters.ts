import { FileCoverage } from '../typings/JsonReport';

export const standardTotalCounter = (key: keyof FileCoverage) => (
    value: FileCoverage
) => Object.values(value[key]).length;

export const standardCoveredCounter = (key: keyof FileCoverage) => (
    value: FileCoverage
) => Object.values(value[key]).filter((hits) => hits > 0).length;

export const totalBranchesCounter = (value: FileCoverage) =>
    Object.values(value.b).reduce((acc, branch) => acc + branch.length, 0);

export const coveredBranchesCounter = (value: FileCoverage) =>
    Object.values(value.b).reduce(
        (acc, branch) => acc + branch.filter((hits) => hits > 0).length,
        0
    );

const lineDiff = (startLine: number, endLine: number, lastEndLine: number) =>
    Math.max(endLine - Math.max(startLine, lastEndLine), 0);

export const totalLinesCounter = (value: FileCoverage) => {
    let lastEndLine = 0;

    return Object.values(value.statementMap).reduce((acc, statement) => {
        const newLines = lineDiff(
            statement.start.line,
            statement.end.line,
            lastEndLine
        );
        console.log(statement, newLines, lastEndLine);

        lastEndLine = statement.end.line;

        return acc + newLines;
    }, 0);
};

export const coveredLinesCounter = (value: FileCoverage) => {
    let lastEndLine = 0;

    return Object.entries(value.statementMap).reduce(
        (acc, [key, statement]) => {
            if (value.s[+key] > 0) {
                const newLines = lineDiff(
                    statement.start.line,
                    statement.end.line,
                    lastEndLine
                );

                console.log(statement, newLines, lastEndLine);

                lastEndLine = statement.end.line;

                return acc + newLines;
            }

            return acc;
        },
        0
    );
};
