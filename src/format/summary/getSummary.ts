import { CoverageSummary } from '../../typings/Coverage';
import { CoverageMap, FileCoverage } from '../../typings/JsonReport';
import { getPercents } from '../getPercents';

export const getSummary = (
    map: CoverageMap,
    totalCounter: (value: FileCoverage) => number,
    coveredCounter: (value: FileCoverage) => number,
    title: string
): CoverageSummary => {
    const values = Object.values(map).map((value) =>
        'statementMap' in value ? value : value.data
    );

    const total = values.reduce(
        (acc, currValue) => acc + totalCounter(currValue),
        0
    );

    const covered = values.reduce(
        (acc, currValue) => acc + coveredCounter(currValue),
        0
    );

    return {
        title,
        total,
        covered,
        percentage: getPercents(covered, total),
    };
};
