import { ThresholdResult } from '../typings/ThresholdResult';
import { i18n } from '../utils/i18n';

export const formatThresholdResults = (results: ThresholdResult[]): string => {
    return results
        .map(({ type, path, expected, received }) =>
            i18n(`thresholdFailures.${expected < 0 ? 'ones' : 'percents'}`, {
                path,
                type: i18n(type),
                ltype: i18n(type).toLowerCase(),
                expected: Math.abs(expected),
                coverage: received,
            })
        )
        .join('\n');
};
