import { formatCoverage } from '../../src/format/formatCoverage';
import jsonReport from '../mock-data/jsonReport.json';

describe('formatCoverage', () => {
    it('should format standard coverage', () => {
        expect(
            formatCoverage(jsonReport, jsonReport, 0.3, false)
        ).toMatchSnapshot();
        expect(
            formatCoverage(jsonReport, undefined, 0.3, false)
        ).toMatchSnapshot();
        expect(
            formatCoverage(jsonReport, undefined, undefined, false)
        ).toMatchSnapshot();
    });

    it('should display warning if hiding details', () => {
        expect(
            formatCoverage(jsonReport, jsonReport, 0.3, true)
        ).toMatchSnapshot();
    });

    it('should return empty string if no reports specified', () => {
        expect(formatCoverage(undefined, undefined, 0.3, false)).toBe('');
    });
});
