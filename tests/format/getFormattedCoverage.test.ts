import { parseDetails } from '../../src/format/details/parseDetails';
import { getFormattedCoverage } from '../../src/format/getFormattedCoverage';
import { parseSummary } from '../../src/format/summary/parseSummary';
import jsonReport from '../mock-data/jsonReport.json';

describe('getFormattedCoverage', () => {
    it('should match snapshots', () => {
        expect(
            getFormattedCoverage(
                parseSummary(jsonReport),
                undefined,
                parseDetails(jsonReport),
                undefined,
                undefined,
                false
            )
        ).toMatchSnapshot();
    });
});
