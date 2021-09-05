import * as all from '@actions/github';

import { formatErrors } from '../../src/format/formatErrors';

const { mockContext, clearContextMock } = all as any;

describe('formatErrors', () => {
    it('should return empty string, if no errors specified', () => {
        expect(formatErrors([])).toBe('');
    });

    it('should format 1 error', () => {
        expect(formatErrors(['testsFailed'])).toBe(
            '❌ The test suite failed. Please, check the console output for more details.'
        );

        mockContext({
            payload: {},
            repo: {
                owner: 'bot',
                repo: 'test-repo',
            },
            runId: 10,
        });

        expect(formatErrors([new Error('This is unexpected error')])).toBe(
            '❌ An unexpected error occurred. For more details, [check console](https://github.com/bot/test-repo/actions/runs/10) ' +
                '\n```\n' +
                'Error: This is unexpected error' +
                '\n```'
        );

        clearContextMock();
    });

    it('should format multiple errors', () => {
        expect(
            formatErrors([
                'testsFailed',
                new Error('hello'),
                'a a a a a a a a',
                'simple error',
                new EvalError('aaa'),
            ])
        ).toMatchSnapshot();

        expect(
            formatErrors(new Array(40).fill(0).map(() => 'error'))
        ).toMatchSnapshot();

        expect(
            formatErrors(new Array(100).fill(0).map(() => 'error'))
        ).toMatchSnapshot();
    });
});
