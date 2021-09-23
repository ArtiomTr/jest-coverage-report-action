import { getFailedTestsAnnotationsBody } from '../../../src/format/annotations/getFailedTestsAnnotationsBody';

describe('getFailedTestsAnnotationsBody', () => {
    it('should return failed tests annotations body', () => {
        expect(
            getFailedTestsAnnotationsBody({
                title: 'Title',
                failures: 'Failures',
                summary: 'Simple summary',
            })
        )
            .toBe(`Created failed tests' annotations. To disable them, see [documentation](https://github.com/ArtiomTr/jest-coverage-report-action#jest-coverage-report-).
Failures`);
    });
});
