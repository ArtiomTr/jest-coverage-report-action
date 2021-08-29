import { formatRunReport } from '../../src/format/formatRunReport';
import { getFailureDetails } from '../../src/format/getFormattedFailures';
import { JsonReport } from '../../src/typings/JsonReport';
describe('should generate summary as markdown', () => {
    it('successful tests', () => {
        expect(
            formatRunReport({
                summary: '2 Tests Passed',
                title: 'Tests Passed',
            })
        ).toMatchSnapshot();
    });
    it('failure tests', () => {
        expect(
            formatRunReport({
                summary: '2 Tests Passed, 1 Test Failed',
                title: 'Tests Failed',
                failures: getFailureDetails({
                    testResults: [
                        {
                            message: 'fail 1',
                        },
                        {
                            message: 'fail 2',
                        },
                    ],
                } as JsonReport),
            })
        ).toMatchSnapshot();
    });
});
