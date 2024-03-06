import { getFailureDetails } from '../format/getFailureDetails';
import { JsonReport } from '../typings/JsonReport';
import { TestRunReport } from '../typings/Report';
import { i18n } from '../utils/i18n';

export const createRunReport = (headReport: JsonReport): TestRunReport => {
    return headReport.success
        ? {
              success: true,
              title: i18n('testsSuccess'),
              summary: i18n('testsSuccessSummary', {
                  numPassedTests: headReport.numPassedTests,
                  numPassedTestSuites: headReport.numPassedTestSuites,
                  ending: headReport.numPassedTestSuites > 1 ? 's' : '',
              }),
          }
        : {
              success: false,
              title: i18n('testsFail'),
              summary: i18n('testsFailSummary', {
                  numFailedTests: headReport.numFailedTests,
                  numTotalTests: headReport.numTotalTests,
                  numFailedTestSuites: headReport.numFailedTestSuites,
                  numTotalTestSuites: headReport.numTotalTestSuites,
              }),
              failures: getFailureDetails(headReport),
          };
};
