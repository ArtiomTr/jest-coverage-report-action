import stripAnsi from 'strip-ansi';

import { JsonReport } from '../../typings/JsonReport';

export const getFailedTestsAnnotationsBody = (jsonReport: JsonReport) =>
    jsonReport.testResults && jsonReport.testResults.length > 0
        ? '```bash\n' +
          jsonReport.testResults
              ?.map(({ message }) => stripAnsi(message))
              .join('```\n```bash') +
          '```'
        : '';
