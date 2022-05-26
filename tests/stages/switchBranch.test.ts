import { exec } from '@actions/exec';

import { switchBack, switchBranch } from '../../src/stages/switchBranch';

const clearMocks = () => {
    (exec as jest.Mock<any, any>).mockClear();
};

beforeEach(clearMocks);

describe('switchBranch', () => {
    it('should fetch repository & switch to branch', async () => {
        await switchBranch('Test-branch');

        expect(exec).toBeCalledWith('git fetch --all --depth=1');
        expect(exec).toBeCalledWith('git checkout -f Test-branch');
    });

    it('should switch to branch, even if fetch failed', async () => {
        (exec as jest.Mock<any, any>).mockImplementationOnce(() => {
            throw 0;
        });

        await switchBranch('Test-branch');

        expect(exec).toBeCalledWith('git checkout -f Test-branch');
    });
});

describe('switchBack', () => {
    it('should switch to previous branch', async () => {
        await switchBack();

        expect(exec).toBeCalledWith('git checkout -');
    });
});
