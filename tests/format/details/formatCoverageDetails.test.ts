import { formatCoverageDetails } from '../../../src/format/details/formatCoverageDetails';

describe('formatCoverageDetails', () => {
    it('should match snapshots', () => {
        expect(
            formatCoverageDetails(
                {
                    'increased.ts': {
                        lines: 80,
                        statements: 70,
                        branches: 50,
                        functions: 50,
                        filename: 'increased.ts',
                    },
                    'decreased.ts': {
                        lines: 80,
                        statements: 70,
                        branches: 50,
                        functions: 50,
                        filename: 'decreased.ts',
                    },
                    'newFile.ts': {
                        lines: 50,
                        statements: 50,
                        branches: 50,
                        functions: 50,
                        filename: 'newFile.ts',
                    },
                },
                {
                    'increased.ts': {
                        lines: 50,
                        statements: 50,
                        branches: 30,
                        functions: 30,
                        filename: 'increased.ts',
                    },
                    'decreased.ts': {
                        lines: 90,
                        statements: 80,
                        branches: 60,
                        functions: 60,
                        filename: 'decreased.ts',
                    },
                },
                70
            )
        ).toMatchSnapshot();
    });
});
