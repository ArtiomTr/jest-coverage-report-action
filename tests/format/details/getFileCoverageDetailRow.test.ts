import { getFileCoverageDetailRow } from '../../../src/format/details/getFileCoverageDetailRow';

describe('getFileCoverageDetailRow', () => {
    it('should return formatted detail row (decreased coverage)', () => {
        expect(
            getFileCoverageDetailRow(
                'hello.ts',
                {
                    filename: 'hello.ts',
                    lines: 50,
                    branches: 100,
                    functions: 50,
                    statements: 50,
                },
                {
                    filename: 'hello.ts',
                    lines: 60,
                    branches: 100,
                    functions: 60,
                    statements: 60,
                },
                70
            )
        ).toMatchSnapshot();
    });

    it('should return formatted detail row (increased coverage)', () => {
        expect(
            getFileCoverageDetailRow(
                'hello.ts',
                {
                    filename: 'hello.ts',
                    lines: 50,
                    branches: 100,
                    functions: 50,
                    statements: 50,
                },
                {
                    filename: 'hello.ts',
                    lines: 40,
                    branches: 100,
                    functions: 40,
                    statements: 40,
                },
                70
            )
        ).toMatchSnapshot();
    });

    it('should return formatted detail row (no base details)', () => {
        expect(
            getFileCoverageDetailRow(
                'hello.ts',
                {
                    filename: 'hello.ts',
                    lines: 50,
                    branches: 100,
                    functions: 50,
                    statements: 50,
                },
                undefined,
                70
            )
        ).toMatchSnapshot();
    });
});
