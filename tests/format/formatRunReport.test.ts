import { formatRunReport } from '../../src/format/formatRunReport';
import { getFailureDetails } from '../../src/format/getFailureDetails';
import { JsonReport } from '../../src/typings/JsonReport';

describe('formatRunReport', () => {
    it('should generate summary as markdown (successful tests)', () => {
        expect(
            formatRunReport({
                summary: '2 Tests Passed',
                title: 'Tests Passed',
            })
        ).toMatchSnapshot();
    });
    it('should generate summary as markdown (failure tests)', () => {
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
