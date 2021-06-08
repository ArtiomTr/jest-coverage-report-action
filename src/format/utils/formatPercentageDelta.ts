import { decimalToString } from './decimalToString';
import { Icons } from '../Icons';

export const formatPercentageDelta = (delta: number, icons: Icons): string =>
    delta > 0
        ? `(+${decimalToString(delta)}% ${icons.increaseIcon})`
        : `(${decimalToString(delta)}% ${icons.decreaseIcon})`;
