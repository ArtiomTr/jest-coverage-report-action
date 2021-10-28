import { formatCoverage } from '../../src/format/formatCoverage';
import jsonReport from '../mock-data/jsonReport.json';

describe('formatCoverage', () => {
    it('should format standard coverage', () => {
        expect(formatCoverage(jsonReport, jsonReport, 0.3)).toMatchSnapshot();
        expect(formatCoverage(jsonReport, undefined, 0.3)).toMatchSnapshot();
        expect(
            formatCoverage(jsonReport, undefined, undefined)
        ).toMatchSnapshot();
    });

    it('should return empty string if no reports specified', () => {
        expect(formatCoverage(undefined, undefined, 0.3)).toBe('');
    });
});
