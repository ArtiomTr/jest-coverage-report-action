import { getReportTag } from '../../src/constants/getReportTag';

describe('getReportTag', () => {
    it('should return report tag', () => {
        expect(getReportTag('directory')).toBe(
            '<!-- jest coverage report action at directory -->'
        );
        expect(getReportTag(undefined)).toBe(
            '<!-- jest coverage report action at  -->'
        );
    });
});
