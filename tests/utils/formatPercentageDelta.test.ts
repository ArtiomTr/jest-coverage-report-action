import { formatPercentageDelta } from '../../src/utils/formatPercentageDelta';

describe('formatPercentageDelta', () => {
    describe('default options (non-bold with icons)', () => {
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

    describe('bold deltas with icons', () => {
        const options = { boldDeltas: true, showDeltaIcons: true };

        it('negative delta', () => {
            expect(formatPercentageDelta(-1, options)).toBe('**`-1%`** 🔻');
            expect(formatPercentageDelta(-1.00001, options)).toBe('**`-1%`** 🔻');
            expect(formatPercentageDelta(-1 / 3, options)).toBe('**`-0.33%`** 🔻');
            expect(formatPercentageDelta(-52.11, options)).toBe('**`-52.11%`** 🔻');
        });

        it('positive delta', () => {
            expect(formatPercentageDelta(1, options)).toBe('**`+1%`** 🔼');
            expect(formatPercentageDelta(1.00001, options)).toBe('**`+1%`** 🔼');
            expect(formatPercentageDelta(1 / 3, options)).toBe('**`+0.33%`** 🔼');
            expect(formatPercentageDelta(52.11, options)).toBe('**`+52.11%`** 🔼');
        });
    });

    describe('bold deltas without icons', () => {
        const options = { boldDeltas: true, showDeltaIcons: false };

        it('negative delta', () => {
            expect(formatPercentageDelta(-1, options)).toBe('**`-1%`**');
            expect(formatPercentageDelta(-52.11, options)).toBe('**`-52.11%`**');
        });

        it('positive delta', () => {
            expect(formatPercentageDelta(1, options)).toBe('**`+1%`**');
            expect(formatPercentageDelta(52.11, options)).toBe('**`+52.11%`**');
        });
    });

    describe('non-bold without icons', () => {
        const options = { boldDeltas: false, showDeltaIcons: false };

        it('negative delta', () => {
            expect(formatPercentageDelta(-1, options)).toBe('(-1%)');
            expect(formatPercentageDelta(-52.11, options)).toBe('(-52.11%)');
        });

        it('positive delta', () => {
            expect(formatPercentageDelta(1, options)).toBe('(+1%)');
            expect(formatPercentageDelta(52.11, options)).toBe('(+52.11%)');
        });
    });
});
