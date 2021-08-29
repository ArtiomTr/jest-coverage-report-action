import { TestRunReport } from '../../typings/Report';
import { i18n } from '../../utils/i18n';

export const getFailedTestsAnnotationsBody = (report: TestRunReport) =>
    i18n('testsFailSummaryPt2') + report.failures;
