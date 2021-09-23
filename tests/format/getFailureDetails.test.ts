import { getFailureDetails } from '../../src/format/getFailureDetails';
import { JsonReport } from '../../src/typings/JsonReport';

describe('getFormattedFailures', () => {
    it('should return empty string, if no test results (or all passed)', () => {
        expect(getFailureDetails(({} as unknown) as JsonReport)).toBe('');

        expect(
            getFailureDetails(({
                testResults: [],
            } as unknown) as JsonReport)
        ).toBe('');

        expect(
            getFailureDetails(({
                testResults: [
                    {
                        status: 'passed',
                        message: '',
                    },
                ],
            } as unknown) as JsonReport)
        ).toBe('');
    });

    it('should format failure details', () => {
        expect(
            getFailureDetails({
                testResults: [
                    {
                        status: 'passed',
                        message: 'asdfasdfasdf',
                    },
                    {
                        status: 'failed',
                        message: 'This is simple error message',
                    },
                    {
                        status: 'failed',
                        message: '',
                    },
                    {
                        status: 'failed',
                        message: 'Another error message',
                    },
                    {
                        status: 'passed',
                        message: 'Ignored message, because test is passed',
                    },
                ],
            } as JsonReport)
        ).toBe(
            '```\n' +
                'This is simple error message\n' +
                '```\n' +
                '---\n' +
                '```\n' +
                'Another error message\n' +
                '```'
        );
    });
});
