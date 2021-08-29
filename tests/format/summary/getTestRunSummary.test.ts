import { getTestRunSummary } from '../../../src/format/summary/getTestRunSummary';
import { JsonReport } from '../../../src/typings/JsonReport';

describe('getTestRunSummary', () => {
    it('should return successful summary', () => {
        expect(
            getTestRunSummary({
                success: true,
                numPassedTests: 10,
                numPassedTestSuites: 1,
            } as JsonReport)
        ).toBe('10 tests passing in 1 suite.');

        expect(
            getTestRunSummary({
                success: true,
                numPassedTests: 10,
                numPassedTestSuites: 2,
            } as JsonReport)
        ).toBe('10 tests passing in 2 suites.');
    });

    it('should return failure summary', () => {
        expect(
            getTestRunSummary({
                success: false,
                numFailedTests: 10,
                numTotalTests: 21,
                numFailedTestSuites: 2,
                numTotalTestSuites: 5,
            } as JsonReport)
        ).toBe('Failed tests: 10/21. Failed suites: 2/5.');
    });
});
