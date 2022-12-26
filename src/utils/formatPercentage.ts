import { decimalToString } from './decimalToString.js';
import { formatPercentageDelta } from './formatPercentageDelta.js';
import { i18n } from './i18n.js';

const APPROXIMATION_THRESHOLD = 0;

export const formatPercentage = (
    headPercentage: number,
    basePercentage: number = headPercentage
) => {
    const delta = headPercentage - basePercentage;

    const isDeltaValid = Math.abs(delta) > APPROXIMATION_THRESHOLD;

    return i18n(
        isDeltaValid
            ? '<div title="{{ baseCoverage }}%">{{ percentage }}% {{ delta }}</div>'
            : '{{ percentage }}%',
        {
            percentage: decimalToString(headPercentage),
            baseCoverage:
                i18n('baseCoverage') + decimalToString(basePercentage),
            delta: isDeltaValid ? formatPercentageDelta(delta) : '',
        }
    );
};
