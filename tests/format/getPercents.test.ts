import { getPercents } from '../../src/format/getPercents';

describe('getPercents', () => {
    it('should return percents', () => {
        expect(getPercents(5, 10)).toBe(50);
        expect(getPercents(10, 10)).toBe(100);
        expect(getPercents(0, 10)).toBe(0);
    });

    it('should return 100 when total is 0', () => {
        expect(getPercents(0, 0)).toBe(100);
    });
});
