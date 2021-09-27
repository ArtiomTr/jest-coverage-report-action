import { formatCoverage } from '../../src/format/formatCoverage';
import jsonReport from '../mock-data/jsonReport.json';

describe('formatCoverage', () => {
    it('should format standard coverage', () => {
        expect(
            formatCoverage(jsonReport, jsonReport, {
                global: {
                    lines: 30,
                    statements: 30,
                    branches: 30,
                    functions: 30,
                },
            })
        ).toMatchSnapshot();
        expect(
            formatCoverage(jsonReport, undefined, {
                global: {
                    lines: 30,
                    statements: 30,
                    branches: 30,
                    functions: 30,
                },
            })
        ).toMatchSnapshot();
        expect(
            formatCoverage(jsonReport, undefined, undefined)
        ).toMatchSnapshot();
    });

    it('should return empty string if no reports specified', () => {
        expect(
            formatCoverage(undefined, undefined, {
                global: {
                    lines: 30,
                    statements: 30,
                    branches: 30,
                    functions: 30,
                },
            })
        ).toBe('');
    });
});
