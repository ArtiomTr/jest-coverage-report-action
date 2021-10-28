import { decimalToString } from '../../src/utils/decimalToString';

describe('decimalToString', () => {
    it('should convert integers to string', () => {
        expect(decimalToString(5)).toBe('5');
        expect(decimalToString(0)).toBe('0');
        expect(decimalToString(0.0)).toBe('0');
        expect(decimalToString(1000)).toBe('1000');
    });

    it('should convert decimals to string', () => {
        expect(decimalToString(1.15)).toBe('1.15');
        expect(decimalToString(4.01)).toBe('4.01');
        expect(decimalToString(4.1)).toBe('4.1');
        expect(decimalToString(1 / 3)).toBe('0.33');
        expect(decimalToString(2 / 3)).toBe('0.67');
    });

    it('should convert decimals to string (custom digits after dot)', () => {
        expect(decimalToString(1.15, 1)).toBe('1.1');
        expect(decimalToString(4.01, 3)).toBe('4.01');
        expect(decimalToString(4.1, 0)).toBe('4');
        expect(decimalToString(1 / 3, 4)).toBe('0.3333');
        expect(decimalToString(2 / 3, 5)).toBe('0.66667');
    });
});
