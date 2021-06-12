import stripAnsi from 'strip-ansi';

import { JsonReport } from '../../typings/JsonReport';
import { testsFailSummaryPt2 } from '../strings.json';

export const getFailedTestsAnnotationsBody = (jsonReport: JsonReport) =>
    testsFailSummaryPt2 +
    (jsonReport.testResults && jsonReport.testResults.length > 0
        ? '\n```bash\n' +
          jsonReport.testResults
              ?.map(({ message }) => stripAnsi(message))
              .join('```\n```bash') +
          '```'
        : '');
