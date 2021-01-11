import { formatPercentageDelta } from './formatPercentageDelta';

const APPROXIMATION_THRESHOLD = 1;

export const formatPercentage = (
    headPercentage: number,
    basePercentage: number = headPercentage
) => {
    const delta = headPercentage - basePercentage;

    return `${Number(headPercentage.toFixed(2))}% ${
        Math.abs(delta) > APPROXIMATION_THRESHOLD
            ? formatPercentageDelta(delta)
            : ''
    }`;
};
