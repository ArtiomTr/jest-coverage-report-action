import stripAnsi from 'strip-ansi';

import { JsonReport } from '../../typings/JsonReport';
import { testsFailSummaryPt2 } from '../strings.json';

export const getFailedTestsAnnotationsBody = (jsonReport: JsonReport) => {
    if (!jsonReport.testResults?.length) {
        return '';
    }

    const bash = (code: string) => '```bash \n' + code + '```';
    const codeBlocks = jsonReport.testResults
        .map(({ message }) => {
            const messageStripped = stripAnsi(message);
            if (messageStripped.trim() != '') {
                return bash(messageStripped);
            }
            return null;
        })
        .filter((message) => message != null)
        .join('\n');

    return `${testsFailSummaryPt2}\n${codeBlocks}`;
};
