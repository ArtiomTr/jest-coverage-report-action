import { getDecreasedCoverage } from '../../../src/format/details/getDecreasedCoverage';

describe('getDecreasedCoverage', () => {
    it('should return files with decreased coverage', () => {
        expect(
            getDecreasedCoverage(
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
                        branches: 60,
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
                    branches: 60,
                    functions: 50,
                    statements: 50,
                },
            },
        });
    });

    it('should return empty object, when base details not specified', () => {
        expect(
            getDecreasedCoverage(
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
