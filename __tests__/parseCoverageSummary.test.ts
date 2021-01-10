import { parseCoverageSummary } from '../src/parseCoverageSummary';

describe('parseCoverageSummary', () => {
    it('stats', () => {
        expect(
            parseCoverageSummary(`
        =============================== Coverage summary ===============================
        Statements   : 100% ( 1/1 )
        Branches     : 1% ( 1/1 )
        Functions    : 0.001% ( 1/1 )
        Lines        : 81.15% ( 1/1 )
        ================================================================================
        `)
        ).toStrictEqual({
            statements: {
                percentage: 100,
                covered: 1,
                total: 1,
            },
            branches: {
                percentage: 1,
                covered: 1,
                total: 1,
            },
            functions: {
                percentage: 0.001,
                covered: 1,
                total: 1,
            },
            lines: {
                percentage: 81.15,
                covered: 1,
                total: 1,
            },
        });
    });
});
