import { getSummary } from '../../../src/format/summary/getSummary';
import { coverageMap } from '../../mock-data/jsonReport.json';

describe('getSummary', () => {
    it('should calculate summary', () => {
        const counter = jest.fn(() => 1);

        expect(
            getSummary(coverageMap, counter, counter, 'Title')
        ).toStrictEqual({
            title: 'Title',
            total: 6,
            covered: 6,
            percentage: 100,
        });
    });
});
