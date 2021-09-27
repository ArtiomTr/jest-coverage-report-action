import { Config } from '@jest/types';

import { CoverageSummary } from '../../typings/Coverage';
import { CoverageMap, FileCoverage } from '../../typings/JsonReport';
import { getPercents } from '../getPercents';

export const getSummary = (
    map: CoverageMap,
    totalCounter: (value: FileCoverage) => number,
    coveredCounter: (value: FileCoverage) => number,
    title: string,
    name: keyof Config.CoverageThresholdValue
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
        name,
        total,
        covered,
        percentage: getPercents(covered, total),
    };
};
