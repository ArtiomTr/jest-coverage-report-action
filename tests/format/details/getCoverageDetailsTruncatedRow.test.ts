import { getCoverageDetailsTruncatedRow } from '../../../src/format/details/getCoverageDetailsTruncatedRow';

describe('getCoverageDetailsTruncatedRow', () => {
    it('', () => {
        expect(getCoverageDetailsTruncatedRow(10)).toStrictEqual([
            '',
            'and 10 more...',
            '',
            '',
            '',
            '',
        ]);
    });
});
