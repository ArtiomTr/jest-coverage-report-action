import { formatPercentage } from '../../src/utils/formatPercentage';

describe('formatPercentage', () => {
    it('only head coverage provided', () => {
        expect(formatPercentage(10)).toBe('10%');
        expect(formatPercentage(60.01)).toBe('60.01%');
        expect(formatPercentage(1 / 3)).toBe('0.33%');
    });

    it('coverage reduced', () => {
        expect(formatPercentage(10, 20)).toBe(
            '<div title="Base coverage is: 20%">10% (-10% 🔻)</div>'
        );
        expect(formatPercentage(1.15, 20.15)).toBe(
            '<div title="Base coverage is: 20.15%">1.15% (-19% 🔻)</div>'
        );
        expect(formatPercentage(1.15, 20)).toBe(
            '<div title="Base coverage is: 20%">1.15% (-18.85% 🔻)</div>'
        );
        expect(formatPercentage(1.15, 20.1)).toBe(
            '<div title="Base coverage is: 20.1%">1.15% (-18.95% 🔻)</div>'
        );
    });

    it('coverage increased', () => {
        expect(formatPercentage(20, 10)).toBe(
            '<div title="Base coverage is: 10%">20% (+10% 🔼)</div>'
        );
        expect(formatPercentage(20.15, 1.15)).toBe(
            '<div title="Base coverage is: 1.15%">20.15% (+19% 🔼)</div>'
        );
        expect(formatPercentage(20, 1.15)).toBe(
            '<div title="Base coverage is: 1.15%">20% (+18.85% 🔼)</div>'
        );
        expect(formatPercentage(20.1, 1.15)).toBe(
            '<div title="Base coverage is: 1.15%">20.1% (+18.95% 🔼)</div>'
        );
    });
});
