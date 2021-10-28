import jsonReport from './jsonReport.json';
import {
    coveredLinesCounter,
    totalLinesCounter,
} from '../../src/collect/counters';
import { getSummary } from '../../src/collect/getSummary';

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
