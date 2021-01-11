import { coverageStatusIcons } from '../strings.json';

const DEFAULT_STEP = 20;

export const getStatusOfPercents = (percentage: number, threshold = 60) => {
    let step = DEFAULT_STEP;

    if (threshold > 100 - DEFAULT_STEP * 2) {
        step = (100 - threshold) / 2;
    }

    if (percentage < threshold) {
        return coverageStatusIcons.bad;
    } else if (percentage < threshold + step) {
        return coverageStatusIcons.normal;
    } else {
        return coverageStatusIcons.good;
    }
};
