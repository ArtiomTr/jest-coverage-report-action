import { getStatusOfPercents } from '../../src/utils/getStatusOfPercents';

describe('getStatusOfPercents', () => {
    it('should handle threshold by default', () => {
        expect(getStatusOfPercents(10)).toBe('🔴');
        expect(getStatusOfPercents(33)).toBe('🔴');
        expect(getStatusOfPercents(59.99)).toBe('🔴');
        expect(getStatusOfPercents(60)).toBe('🟡');
        expect(getStatusOfPercents(73.33333)).toBe('🟡');
        expect(getStatusOfPercents(79.99)).toBe('🟡');
        expect(getStatusOfPercents(80)).toBe('🟢');
        expect(getStatusOfPercents(85.15)).toBe('🟢');
        expect(getStatusOfPercents(100)).toBe('🟢');
        expect(getStatusOfPercents(120)).toBe('🟢');
    });

    it('should handle custom threshold', () => {
        expect(getStatusOfPercents(10, 80)).toBe('🔴');
        expect(getStatusOfPercents(33, 80)).toBe('🔴');
        expect(getStatusOfPercents(79.99, 80)).toBe('🔴');
        expect(getStatusOfPercents(80, 80)).toBe('🟡');
        expect(getStatusOfPercents(85.334534, 80)).toBe('🟡');
        expect(getStatusOfPercents(89.999, 80)).toBe('🟡');
        expect(getStatusOfPercents(90, 80)).toBe('🟢');
        expect(getStatusOfPercents(93.33, 80)).toBe('🟢');
        expect(getStatusOfPercents(100, 80)).toBe('🟢');
        expect(getStatusOfPercents(120, 80)).toBe('🟢');
    });
});
