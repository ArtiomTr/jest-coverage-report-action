import * as all from '@actions/github';

import { formatErrors } from '../../src/format/formatErrors';
import { ActionError } from '../../src/typings/ActionError';
import { FailReason } from '../../src/typings/Report';

const { mockContext, clearContextMock } = all as any;

describe('formatErrors', () => {
    it('should return empty string, if no errors specified', () => {
        expect(formatErrors([])).toBe('');
    });

    it('should format 1 error', () => {
        expect(formatErrors([new ActionError(FailReason.TESTS_FAILED)])).toBe(
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
                new ActionError(FailReason.TESTS_FAILED),
                new Error('hello'),
                new ActionError(FailReason.TESTS_FAILED),
                new EvalError('aaa'),
            ])
        ).toMatchSnapshot();

        expect(
            formatErrors(new Array(40).fill(0).map(() => new Error('error')))
        ).toMatchSnapshot();

        expect(
            formatErrors(new Array(100).fill(0).map(() => new Error('error')))
        ).toMatchSnapshot();
    });
});
