import {
    coveredBranchesCounter,
    coveredLinesCounter,
    standardCoveredCounter,
    standardTotalCounter,
    totalBranchesCounter,
    totalLinesCounter,
} from '../../src/format/counters';
import { StatementCoverage } from '../../src/typings/JsonReport';

describe('standardCounter', () => {
    it('standardTotalCounter', () => {
        expect(
            standardTotalCounter('s')({
                b: {},
                s: {
                    0: 10,
                    1: 3,
                    2: 4,
                    3: 5,
                },
                f: {},
                branchMap: {},
                fnMap: {},
                statementMap: {},
                path: 'hello.ts',
            })
        ).toBe(4);
    });

    it('standardCoveredCounter', () => {
        expect(
            standardCoveredCounter('s')({
                b: {},
                s: {
                    0: 10,
                    1: 3,
                    2: 0,
                    3: -5,
                },
                f: {},
                branchMap: {},
                fnMap: {},
                statementMap: {},
                path: 'hello.ts',
            })
        ).toBe(2);
    });
});

describe('branchCounter', () => {
    it('totalBranchesCounter', () => {
        expect(
            totalBranchesCounter({
                b: {
                    0: [1, 1],
                    1: [0, 2],
                    2: [],
                    3: [1],
                },
                s: {},
                f: {},
                branchMap: {},
                fnMap: {},
                statementMap: {},
                path: 'hello.ts',
            })
        ).toBe(5);
    });

    it('standardCoveredCounter', () => {
        expect(
            coveredBranchesCounter({
                b: {
                    0: [1, 1],
                    1: [0, 2],
                    2: [],
                    3: [1],
                },
                s: {},
                f: {},
                branchMap: {},
                fnMap: {},
                statementMap: {},
                path: 'hello.ts',
            })
        ).toBe(4);
    });
});

describe('lineCounter', () => {
    it('totalLinesCounter', () => {
        expect(
            totalLinesCounter({
                b: {},
                s: {
                    0: 10,
                    1: 15,
                    2: 0,
                    3: 11,
                    4: 16,
                },
                f: {},
                branchMap: {},
                fnMap: {},
                statementMap: {
                    0: {
                        start: {
                            line: 1,
                        },
                    } as StatementCoverage,
                    1: {
                        start: {
                            line: 2,
                        },
                    } as StatementCoverage,
                    2: {
                        start: {
                            line: 3,
                        },
                    } as StatementCoverage,
                    3: {
                        start: {
                            line: 2,
                        },
                    } as StatementCoverage,
                },
                path: 'hello.ts',
            })
        ).toBe(3);
    });

    it('coveredLinesCounter', () => {
        expect(
            coveredLinesCounter({
                b: {},
                s: {
                    0: 10,
                    1: 15,
                    2: 0,
                    3: 11,
                    4: 16,
                },
                f: {},
                branchMap: {},
                fnMap: {},
                statementMap: {
                    0: {
                        start: {
                            line: 1,
                        },
                    } as StatementCoverage,
                    1: {
                        start: {
                            line: 2,
                        },
                    } as StatementCoverage,
                    2: {
                        start: {
                            line: 3,
                        },
                    } as StatementCoverage,
                    3: {
                        start: {
                            line: 2,
                        },
                    } as StatementCoverage,
                },
                path: 'hello.ts',
            })
        ).toBe(2);
    });
});
