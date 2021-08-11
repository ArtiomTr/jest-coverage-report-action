import { decimalToString } from './decimalToString';
import { i18n } from './i18n';

export const formatPercentageDelta = (delta: number): string =>
    i18n(
        delta > 0
            ? `(+{{ delta }}% :arrow_up_small:)`
            : `({{ delta }}% :small_red_triangle_down:)`,
        {
            delta: decimalToString(delta),
        }
    );
