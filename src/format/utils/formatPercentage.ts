import { decimalToString } from './decimalToString';
import { formatPercentageDelta } from './formatPercentageDelta';
import { Icons } from '../Icons';

const APPROXIMATION_THRESHOLD = 1;

export const formatPercentage = (
    headPercentage: number,
    basePercentage: number = headPercentage,
    icons: Icons
) => {
    const delta = headPercentage - basePercentage;

    return `${decimalToString(headPercentage)}% ${
        Math.abs(delta) > APPROXIMATION_THRESHOLD
            ? formatPercentageDelta(delta, icons)
            : ''
    }`;
};
