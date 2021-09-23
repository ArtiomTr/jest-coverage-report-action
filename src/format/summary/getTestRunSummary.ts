import { JsonReport } from '../../typings/JsonReport';
import { i18n } from '../../utils/i18n';

export const getTestRunSummary = (jsonReport: JsonReport) =>
    jsonReport.success
        ? i18n('testsSuccessSummary', {
              numPassedTests: jsonReport.numPassedTests,
              numPassedTestSuites: jsonReport.numPassedTestSuites,
              ending: jsonReport.numPassedTestSuites > 1 ? 's' : '',
          })
        : i18n('testsFailSummary', {
              numFailedTests: jsonReport.numFailedTests,
              numTotalTests: jsonReport.numTotalTests,
              numFailedTestSuites: jsonReport.numFailedTestSuites,
              numTotalTestSuites: jsonReport.numTotalTestSuites,
          });
