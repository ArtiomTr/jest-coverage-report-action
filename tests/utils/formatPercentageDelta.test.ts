import { formatPercentageDelta } from '../../src/utils/formatPercentageDelta';

describe('formatPercentageDelta', () => {
    it('negative delta', () => {
        expect(formatPercentageDelta(-1)).toBe('(-1% 🔻)');
        expect(formatPercentageDelta(-1.00001)).toBe('(-1% 🔻)');
        expect(formatPercentageDelta(-1 / 3)).toBe('(-0.33% 🔻)');
        expect(formatPercentageDelta(-52.11)).toBe('(-52.11% 🔻)');
    });

    it('positive delta', () => {
        expect(formatPercentageDelta(1)).toBe('(+1% 🔼)');
        expect(formatPercentageDelta(1.00001)).toBe('(+1% 🔼)');
        expect(formatPercentageDelta(1 / 3)).toBe('(+0.33% 🔼)');
        expect(formatPercentageDelta(52.11)).toBe('(+52.11% 🔼)');
    });
});
