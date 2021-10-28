import { JsonReport } from '../../typings/JsonReport';
import { insertArgs } from '../insertArgs';
import { testsFailSummary, testsSuccessSummary } from '../strings.json';

export const getFailedAnnotationsSummary = (jsonReport: JsonReport) =>
    jsonReport.success
        ? insertArgs(testsSuccessSummary, {
              numPassedTests: jsonReport.numPassedTests,
              numPassedTestSuites: jsonReport.numPassedTestSuites,
              ending: jsonReport.numPassedTestSuites > 1 ? 's' : '',
          })
        : insertArgs(testsFailSummary, {
              numFailedTests: jsonReport.numFailedTests,
              numTotalTests: jsonReport.numTotalTests,
              numFailedTestSuites: jsonReport.numFailedTestSuites,
              numTotalTestSuites: jsonReport.numTotalTestSuites,
          });
