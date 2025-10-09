import { getIncreasedCoverage } from '../../../src/format/details/getIncreasedCoverage';

describe('getIncreasedCoverage', () => {
    it('should return files with increased coverage', () => {
        expect(
            getIncreasedCoverage(
                {
                    'hello.ts': {
                        filename: 'hello.ts',
                        lines: 50,
                        branches: 50,
                        functions: 50,
                        statements: 50,
                    },
                    'hello2.ts': {
                        filename: 'hello.ts',
                        lines: 50,
                        branches: 50,
                        functions: 50,
                        statements: 50,
                    },
                },
                {
                    'hello.ts': {
                        filename: 'hello.ts',
                        lines: 50,
                        branches: 40,
                        functions: 50,
                        statements: 50,
                    },
                    'hello2.ts': {
                        filename: 'hello.ts',
                        lines: 50,
                        branches: 50,
                        functions: 50,
                        statements: 50,
                    },
                }
            )
        ).toStrictEqual({
            headDetails: {
                'hello.ts': {
                    filename: 'hello.ts',
                    lines: 50,
                    branches: 50,
                    functions: 50,
                    statements: 50,
                },
            },
            baseDetails: {
                'hello.ts': {
                    filename: 'hello.ts',
                    lines: 50,
                    branches: 40,
                    functions: 50,
                    statements: 50,
                },
            },
        });
    });

    it('should return empty object, when base details not specified', () => {
        expect(
            getIncreasedCoverage(
                {
                    'hello.ts': {
                        filename: 'hello.ts',
                        lines: 50,
                        branches: 50,
                        functions: 50,
                        statements: 50,
                    },
                    'hello2.ts': {
                        filename: 'hello.ts',
                        lines: 50,
                        branches: 50,
                        functions: 50,
                        statements: 50,
                    },
                },
                undefined
            )
        ).toStrictEqual({
            headDetails: {},
            baseDetails: {},
        });
    });
});
