import { i18n } from './i18n';

const DEFAULT_STEP = 20;

export const getStatusOfPercents = (percentage: number, threshold = 60) => {
    let step = DEFAULT_STEP;

    if (threshold > 100 - DEFAULT_STEP * 2) {
        step = (100 - threshold) / 2;
    }

    if (percentage < threshold) {
        return i18n(':red_circle:');
    } else if (percentage < threshold + step) {
        return i18n(':yellow_circle:');
    } else {
        return i18n(':green_circle:');
    }
};
