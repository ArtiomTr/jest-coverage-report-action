import stripAnsi from 'strip-ansi';

import { JsonReport } from '../../typings/JsonReport';
import { i18n } from '../../utils/i18n';

export const getFailedTestsAnnotationsBody = (jsonReport: JsonReport) =>
    i18n('testsFailSummaryPt2') +
    (jsonReport.testResults && jsonReport.testResults.length > 0
        ? '\n```bash\n' +
          jsonReport.testResults
              ?.map(({ message }) => stripAnsi(message))
              .join('```\n```bash') +
          '```'
        : '');
