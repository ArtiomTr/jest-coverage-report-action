import { Config } from '@jest/types';

import { CoverageDetail } from '../typings/Coverage';

export const isBiggerThanThreshold = (
    detail: CoverageDetail,
    threshold: Config.CoverageThresholdValue
) => {
    if (threshold.lines && threshold.lines > detail.lines) {
    }
};
