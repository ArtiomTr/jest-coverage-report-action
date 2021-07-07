import { decimalToString } from './decimalToString';
import { formatPercentageDelta } from './formatPercentageDelta';
import { i18n } from '../../utils/i18n';

const APPROXIMATION_THRESHOLD = 1;

export const formatPercentage = (
    headPercentage: number,
    basePercentage: number = headPercentage
) => {
    const delta = headPercentage - basePercentage;

    return i18n('{{ percentage }}% {{ delta }}', {
        percentage: decimalToString(headPercentage),
        delta:
            Math.abs(delta) > APPROXIMATION_THRESHOLD
                ? formatPercentageDelta(delta)
                : '',
    });
};
