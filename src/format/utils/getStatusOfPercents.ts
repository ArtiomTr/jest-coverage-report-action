import { Icons } from '../Icons';

const DEFAULT_STEP = 1;

export const getStatusOfPercents = (
    icons: Icons,
    percentage: number,
    threshold = 60
) => {
    let step = DEFAULT_STEP;

    if (threshold > 100 - DEFAULT_STEP * 2) {
        step = (100 - threshold) / 2;
    }

    if (percentage < threshold) {
        return icons.coverageBad;
    } else if (percentage < threshold + step) {
        return icons.coverageNormal;
    } else {
        return icons.coverageGood;
    }
};
