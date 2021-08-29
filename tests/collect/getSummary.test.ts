import jsonReport from '../mock-data/jsonReport.json';
import {
    coveredLinesCounter,
    totalLinesCounter,
} from '../../src/format/counters';
import { getSummary } from '../../src/format/summary/getSummary';

describe('getSummary', () => {
    it('Should generate a line number coverage report', () => {
        expect(
            getSummary(
                jsonReport.coverageMap,
                totalLinesCounter,
                coveredLinesCounter,
                'Lines'
            )
        ).toMatchSnapshot();
    });
});
