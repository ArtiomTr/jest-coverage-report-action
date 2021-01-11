import { parseCoverageSummary } from '../src/collect/parseCoverageSummary';

const coverageOutput1 = `
-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|-------------------
All files                |     100 |     87.5 |     100 |     100 |
 parseCoverageSummary.ts |     100 |     87.5 |     100 |     100 | 27
-------------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 100% ( 16/16 )
Branches     : 1% ( 7/8 )
Functions    : 0.001% ( 2/2 )
Lines        : 81.15% ( 15/15 )
================================================================================
`;

describe('parseCoverageSummary', () => {
    it('stats', () => {
        expect(parseCoverageSummary(coverageOutput1)).toStrictEqual({
            statements: {
                percentage: 100,
                covered: 16,
                total: 16,
            },
            branches: {
                percentage: 1,
                covered: 7,
                total: 8,
            },
            functions: {
                percentage: 0.001,
                covered: 2,
                total: 2,
            },
            lines: {
                percentage: 81.15,
                covered: 15,
                total: 15,
            },
        });
    });
});
