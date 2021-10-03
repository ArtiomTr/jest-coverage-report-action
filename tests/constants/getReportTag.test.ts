import { getReportTag } from '../../src/constants/getReportTag';

const REPORT_TAG_REGEX = /<!-- jest coverage report action for options with hash [0-9a-f]{32} -->/;

describe('getReportTag', () => {
    it('should return report tag for full options', () => {
        const options = {
            workingDirectory: 'directory',
            testScript: 'script',
            coverageFile: 'coverage',
            baseCoverageFile: 'baseCoverage',
        };

        const reportTag = getReportTag(options);

        expect(reportTag).toMatch(REPORT_TAG_REGEX);
    });

    it('should return report tag for partial options', () => {
        const options = {
            testScript: 'script',
        };

        const reportTag = getReportTag(options);

        expect(reportTag).toMatch(REPORT_TAG_REGEX);
    });

    it('should return different tags for different options', () => {
        const options = {
            workingDirectory: 'directory',
            testScript: 'script',
            coverageFile: 'coverage',
            baseCoverageFile: 'baseCoverage',
        };

        const reportTag = getReportTag(options);

        [
            'workingDirectory',
            'testScript',
            'coverageFile',
            'baseCoverageFile',
        ].forEach((option) => {
            const changedOptions = { ...options, [option]: 'changed option' };

            const changedReportTag = getReportTag(changedOptions);

            expect(changedReportTag).not.toEqual(reportTag);
        });
    });

    it('should return same tag if only arbitrary options change', () => {
        const options = {
            workingDirectory: 'directory',
            testScript: 'script',
            coverageFile: 'coverage',
            baseCoverageFile: 'baseCoverage',
        };

        const reportTag = getReportTag(options);

        [
            'token',
            'iconType',
            'annotations',
            'threshold',
            'packageManager',
            'skipStep',
            'customTitle',
        ].forEach((option) => {
            const changedOptions = { ...options, [option]: 'changed option' };

            const changedReportTag = getReportTag(changedOptions);

            expect(changedReportTag).toEqual(reportTag);
        });
    });
});
