export const decimalToString = (n: number, digitsAfterDot = 2): string =>
    n.toFixed(digitsAfterDot).replace(/\.?0+$/, '');
