import { parseDetails } from '../../../src/format/details/parseDetails';
import { JsonReport } from '../../../src/typings/JsonReport';
import report from '../../mock-data/jsonReport.json';
import report2 from '../../mock-data/jsonReport2.json';

describe('parseDetails', () => {
    it('should match snapshots', () => {
        expect(parseDetails(report)).toMatchSnapshot();
        expect(
            parseDetails((report2 as unknown) as JsonReport)
        ).toMatchSnapshot();
    });
});
