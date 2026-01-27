import { decimalToString } from './decimalToString';
import { i18n } from './i18n';

export type DeltaFormatOptions = {
    boldDeltas?: boolean;
    showDeltaIcons?: boolean;
};

export const formatPercentageDelta = (
    delta: number,
    options: DeltaFormatOptions = {}
): string => {
    const { boldDeltas = false, showDeltaIcons = true } = options;
    const deltaStr = decimalToString(delta);
    const sign = delta > 0 ? '+' : '';
    const icon = delta > 0 ? ':arrow_up_small:' : ':small_red_triangle_down:';

    if (boldDeltas) {
        const formatted = showDeltaIcons
            ? `**\`${sign}{{ delta }}%\`** ${icon}`
            : `**\`${sign}{{ delta }}%\`**`;
        return i18n(formatted, { delta: deltaStr });
    }

    const formatted = showDeltaIcons
        ? `(${sign}{{ delta }}% ${icon})`
        : `(${sign}{{ delta }}%)`;
    return i18n(formatted, { delta: deltaStr });
};
