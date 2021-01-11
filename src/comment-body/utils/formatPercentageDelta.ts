import { decreaseIcon, increaseIcon } from '../strings.json';

export const formatPercentageDelta = (delta: number): string =>
    delta > 0 ? `(+${delta}% ${increaseIcon})` : `(${delta}% ${decreaseIcon})`;
