import { CoverageSummary } from '../../typings/Coverage.js';
import { CoverageMap, FileCoverage } from '../../typings/JsonReport.js';
import { getPercents } from '../getPercents.js';

export const getSummary = (
    map: CoverageMap,
    totalCounter: (value: FileCoverage) => number,
    coveredCounter: (value: FileCoverage) => number,
    title: string
): CoverageSummary => {
    const total = Object.values(map).reduce(
        (acc, currValue) => acc + totalCounter(currValue),
        0
    );

    const covered = Object.values(map).reduce(
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
