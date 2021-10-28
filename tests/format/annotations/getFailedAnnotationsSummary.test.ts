import { getFailedAnnotationsSummary } from '../../../src/format/annotations/getFailedAnnotationsSummary';
import { JsonReport } from '../../../src/typings/JsonReport';

describe('getFailedAnnotationsSummary', () => {
    it("should return succeeded report's summary", () => {
        expect(
            getFailedAnnotationsSummary(({
                numPassedTests: 10,
                numPassedTestSuites: 3,
                success: true,
            } as unknown) as JsonReport)
        ).toBe('10 tests passing in 3 suites.');

        expect(
            getFailedAnnotationsSummary(({
                numPassedTests: 10,
                numPassedTestSuites: 1,
                success: true,
            } as unknown) as JsonReport)
        ).toBe('10 tests passing in 1 suite.');
    });

    it("should return failed report's summary", () => {
        expect(
            getFailedAnnotationsSummary(({
                numFailedTests: 10,
                numTotalTests: 32,
                numFailedTestSuites: 3,
                numTotalTestSuites: 10,
                success: false,
            } as unknown) as JsonReport)
        ).toBe('Failed tests: 10/32. Failed suites: 3/10.');
    });
});
