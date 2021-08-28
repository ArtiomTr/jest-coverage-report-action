import stripAnsi from 'strip-ansi';

import { JsonReport } from '../typings/JsonReport';

export const getFailureDetails = (report: JsonReport): string =>
    report.testResults &&
    report.testResults.some(({ message }) => message.length > 0)
        ? '\n```bash\n' +
          report.testResults
              ?.map(({ message }) => stripAnsi(message))
              .join('```\n---\n```bash\n') +
          '```'
        : '';
