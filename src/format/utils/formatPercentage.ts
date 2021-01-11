import { formatPercentageDelta } from './formatPercentageDelta';

const APPROXIMATION_THRESHOLD = 1;

export const formatPercentage = (
    headPercentage: number,
    basePercentage: number = headPercentage
) => {
    const delta = basePercentage - headPercentage;

    return `${parseFloat(headPercentage.toFixed(2))}% ${
        Math.abs(delta) > APPROXIMATION_THRESHOLD
            ? formatPercentageDelta(delta)
            : ''
    }`;
};
