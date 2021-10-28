import stripAnsi from 'strip-ansi';

import { JsonReport } from '../typings/JsonReport';

export const getFailureDetails = ({ testResults }: JsonReport): string => {
    if (
        !testResults ||
        !testResults.some(
            ({ message, status }) => message.length > 0 && status !== 'passed'
        )
    ) {
        return '';
    }
    const wrapCode = (code: string) => '```\n' + code + '\n```';
    const codeBlocks = testResults
        .filter(({ status }) => status !== 'passed')
        .map(({ message }) => {
            const stripped = stripAnsi(message);
            if (stripped.trim().length === 0) {
                return '';
            }
            return wrapCode(stripped);
        })
        .filter(({ length }) => length > 0);
    return codeBlocks.join('\n---\n');
};
