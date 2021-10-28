import { getNewFilesCoverage } from '../../../src/format/details/getNewFilesCoverage';

describe('getNewFilesCoverage', () => {
    it('should return new file coverage', () => {
        expect(
            getNewFilesCoverage(
                {
                    'hello.ts': {
                        filename: 'hello.ts',
                        functions: 50,
                        branches: 50,
                        lines: 50,
                        statements: 50,
                    },
                },
                {}
            )
        ).toStrictEqual({
            'hello.ts': {
                filename: 'hello.ts',
                functions: 50,
                branches: 50,
                lines: 50,
                statements: 50,
            },
        });
    });

    it('should return empty object, when base details not specified', () => {
        expect(
            getNewFilesCoverage(
                {
                    'hello.ts': {
                        filename: 'hello.ts',
                        functions: 50,
                        branches: 50,
                        lines: 50,
                        statements: 50,
                    },
                },
                undefined
            )
        ).toStrictEqual({});
    });
});
