import isNil from 'lodash/isNil';

import { DetailedFileCoverage } from './getFileCoverageMap';
import { getPercents } from '../format/getPercents';
import { SingleThreshold } from '../typings/JestThreshold';
import { ThresholdResult, ThresholdType } from '../typings/ThresholdResult';

export const checkSingleThreshold = (
    threshold: SingleThreshold,
    coverage: DetailedFileCoverage,
    path: string
): ThresholdResult | undefined => {
    const queue = [
        {
            total: coverage.totalStatements,
            covered: coverage.coveredStatements,
            threshold: threshold.statements,
            type: ThresholdType.STATEMENTS,
        },
        {
            total: coverage.totalBranches,
            covered: coverage.coveredBranches,
            threshold: threshold.branches,
            type: ThresholdType.BRANCHES,
        },
        {
            total: coverage.totalFunctions,
            covered: coverage.coveredFunctions,
            threshold: threshold.functions,
            type: ThresholdType.FUNCTIONS,
        },
        {
            total: coverage.totalLines,
            covered: coverage.coveredLines,
            threshold: threshold.lines,
            type: ThresholdType.LINES,
        },
    ];

    for (const { total, covered, threshold, type } of queue) {
        const result = checkSingleStat(total, covered, threshold, type, path);

        if (result) {
            return result;
        }
    }

    return undefined;
};

const checkSingleStat = (
    total: number,
    covered: number,
    threshold: number | undefined,
    type: ThresholdType,
    path: string
): ThresholdResult | undefined => {
    if (isNil(threshold)) {
        return undefined;
    }

    if (threshold >= 0) {
        const percents = getPercents(covered, total);

        return percents >= threshold
            ? undefined
            : {
                  expected: threshold,
                  received: percents,
                  type,
                  path,
              };
    }

    return covered >= -threshold
        ? undefined
        : {
              expected: threshold,
              received: covered,
              type,
              path,
          };
};
