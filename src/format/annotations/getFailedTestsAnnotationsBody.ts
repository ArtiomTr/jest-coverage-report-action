import { TestRunReport } from '../../typings/Report.js';
import { i18n } from '../../utils/i18n.js';

export const getFailedTestsAnnotationsBody = (report: TestRunReport) =>
    i18n('testsFailSummaryPt2') + '\n' + report.failures;
