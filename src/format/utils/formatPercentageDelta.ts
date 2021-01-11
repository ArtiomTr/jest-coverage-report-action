import { decimalToString } from './decimalToString';
import { decreaseIcon, increaseIcon } from '../strings.json';

export const formatPercentageDelta = (delta: number): string =>
    delta > 0
        ? `(+${decimalToString(delta)}% ${increaseIcon})`
        : `(${decimalToString(delta)}% ${decreaseIcon})`;
