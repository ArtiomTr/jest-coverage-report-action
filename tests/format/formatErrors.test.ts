import * as all from '@actions/github';

import { formatErrors } from '../../src/format/formatErrors.js';
import { ActionError } from '../../src/typings/ActionError.js';
import { FailReason } from '../../src/typings/Report.js';

const { mockContext, clearContextMock } = all as any;

beforeAll(() => {
    mockContext({
        payload: {},
        repo: {
            owner: 'bot',
            repo: 'test-repo',
        },
        runId: 10,
    });
});

afterAll(() => {
    clearContextMock();
});

describe('formatErrors', () => {
    it('should return empty string, if no errors specified', () => {
        expect(formatErrors([])).toBe('');
    });

    it('should format 1 error', () => {
        expect(formatErrors([new ActionError(FailReason.TESTS_FAILED)])).toBe(
            '❌ The test suite failed. Please, check the console output for more details.\n'
        );

        expect(formatErrors([new Error('This is unexpected error')])).toBe(
            '❌ An unexpected error occurred. For more details, [check console](https://github.com/bot/test-repo/actions/runs/10)\n\n' +
                '```\n' +
                'Error: This is unexpected error\n' +
                '```\n'
        );

        expect(formatErrors([new ActionError(FailReason.UNKNOWN_ERROR)])).toBe(
            '❌ Something went wrong. If this is an issue of jest-coverage-report-action, please report about it [here](https://github.com/ArtiomTr/jest-coverage-report-action/issues/new).\n'
        );

        expect(
            formatErrors([new ActionError(FailReason.INVALID_COVERAGE_FORMAT)])
        ).toBe(
            '❌ Output of test script has invalid format. Check [documentation](https://github.com/artiomtr/jest-coverage-report-action/#readme) for more details.\n'
        );
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
