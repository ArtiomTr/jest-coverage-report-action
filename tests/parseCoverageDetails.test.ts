import { parseCoverageDetails } from '../src/collect-coverage/parseCoverageDetails';

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

describe('parseCoverageDetails', () => {
    it('', () => {
        expect(parseCoverageDetails(coverageOutput1)).toStrictEqual({
            'parseCoverageSummary.ts': {
                statements: 100,
                branches: 87.5,
                functions: 100,
                lines: 100,
            },
        });
    });
});
