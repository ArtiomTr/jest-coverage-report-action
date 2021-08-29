import stripAnsi from 'strip-ansi';

import { JsonReport } from '../typings/JsonReport';

export const getFailureDetails = ({ testResults }: JsonReport): string => {
    if (!testResults?.some(({ message }) => message.length > 0)) {
        return '';
    }
    const wrapCode = (code: string) => '``` \n' + code + '```';
    const codeBlocks = testResults
        .map(({ message }) => {
            const stripped = stripAnsi(message);
            if (stripped.length === 0 || stripped.trim().length === 0) {
                return '';
            }
            return wrapCode(stripped);
        })
        .filter(({ length }) => length > 0);
    return codeBlocks.join('\n---');
};
