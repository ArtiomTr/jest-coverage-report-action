import { exec } from '@actions/exec';

import { runTest } from '../../src/stages/runTest';
import { toErrorWithMessage } from '../../src/utils/getErrorMessage';

const clearMocks = () => {
    (exec as jest.Mock<any, any>).mockClear();
};

beforeEach(clearMocks);

describe('runTest', () => {
    it('should run test script', async () => {
        await runTest('npm run test');

        expect(exec).toBeCalledWith(
            'npm run test -- --ci --json --coverage --testLocationInResults --outputFile="report.json"',
            [],
            {
                cwd: undefined,
            }
        );
    });

    it('should run test script in custom working directory', async () => {
        await runTest('npm run test', 'custom cwd');

        expect(exec).toBeCalledWith(expect.any(String), [], {
            cwd: 'custom cwd',
        });
    });

    it('should run test script and return threshold errors if there are any', async () => {
        (exec as jest.Mock).mockRejectedValueOnce(`
        PASS some/__tests__/other-test.test.js
        PASS some/__tests__/test.test.js
        Jest: "global" coverage threshold for statements (88%) not met: 79.68%
        Jest: "./some/path" coverage threshold for statements (45%) not met: 44.91%
        
        Test Suites: 5 skipped, 10 passed, 10 of 10 total
        Tests:       17 skipped, 1 todo, 1010 passed, 1010 total
        Snapshots:   116 passed, 116 total
        Time:        4.786 s
        Ran all test suites.
        `);

        let errMessage = '';

        try {
            await runTest('npm run test');
        } catch (e) {
            errMessage = toErrorWithMessage(e).message;
        }

        expect(errMessage).toEqual(
            'Jest: \\"global\\" coverage threshold for statements (88%) not met: 79.68%\\n        Jest: \\"./some/path\\" coverage threshold for statements (45%) not met: 44.91%\\'
        );
    });
});
