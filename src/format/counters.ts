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

export const totalLinesCounter = (value: FileCoverage) => {
    const stats: Record<string, number> = getLineCoverage(value);
    return Object.keys(stats).length;
};

export const coveredLinesCounter = (value: FileCoverage) => {
    const stats: Record<string, number> = getLineCoverage(value);
    return Object.values(stats).filter((v) => !!v).length;
};

const getLineCoverage = (value: FileCoverage) => {
    const statementMap = value.statementMap;
    const statements = value.s;

    return Object.entries(statements).reduce((acc, [st, count]) => {
        const _st: number = parseInt(st);

        if (!statementMap[_st]) {
            return acc;
        }
        const { line } = statementMap[_st].start;
        const prevVal = acc[line];
        if (prevVal === undefined || prevVal < count) {
            acc[line] = count;
        }
        return acc;
    }, {} as Record<string, number>);
};
