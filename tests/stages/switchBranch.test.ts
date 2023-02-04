import { exec } from '@actions/exec';

import {
    checkoutRef,
    getCurrentBranch,
    switchBranch,
} from '../../src/stages/switchBranch';
import { GithubRef } from '../../src/typings/Options';

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

describe('checkoutRef', () => {
    it('should add new remote', async () => {
        await checkoutRef(
            {
                ref: 'hello',
                repo: { clone_url: 'https://github.com/test/repo.git' },
                sha: '123456',
            },
            'remote-1',
            'branch-1'
        );

        expect(exec).toBeCalledWith(
            'git remote add remote-1 https://github.com/test/repo.git'
        );
    });

    it('should fetch new remote', async () => {
        await checkoutRef(
            {
                ref: 'hello',
                repo: { clone_url: 'https://github.com/test/repo.git' },
                sha: '123456',
            },
            'remote-1',
            'branch-1'
        );

        expect(exec).toBeCalledWith('git fetch --depth=1 remote-1');
    });

    it('should checkout to a new branch', async () => {
        await checkoutRef(
            {
                ref: 'hello',
                repo: { clone_url: 'https://github.com/test/repo.git' },
                sha: '123456',
            },
            'remote-1',
            'branch-1'
        );

        expect(exec).toBeCalledWith(
            'git checkout -b branch-1 --track remote-1/hello -f'
        );
    });

    it('should fail if ref is invalid', async () => {
        await expect(
            checkoutRef(
                {
                    ref: 'hello',
                } as GithubRef,
                'remote-1',
                'branch-1'
            )
        ).rejects.toBeDefined();

        await expect(
            checkoutRef(
                {
                    ref: 'hello',
                    repo: {},
                } as GithubRef,
                'remote-1',
                'branch-1'
            )
        ).rejects.toBeDefined();
    });

    it('should try to checkout event if fetching failed', async () => {
        (exec as jest.Mock<any, any>).mockImplementation((command: string) => {
            if (command.startsWith('git fetch')) {
                throw 0;
            }
        });

        await checkoutRef(
            {
                ref: 'hello',
                repo: { clone_url: 'https://github.com/test/repo.git' },
                sha: '123456',
            },
            'remote-1',
            'branch-1'
        );

        expect(exec).toBeCalledWith(
            'git checkout -b branch-1 --track remote-1/hello -f'
        );
    });
});

describe('getCurrentBranch', () => {
    it('should get current branch', async () => {
        (exec as jest.Mock<any, any>).mockImplementation(
            (
                _command: unknown,
                _args: unknown,
                options: { listeners: { stdout: (value: Buffer) => void } }
            ) => {
                options.listeners.stdout(Buffer.from('   Te'));
                options.listeners.stdout(Buffer.from('st-branch\n \t'));
            }
        );

        expect(await getCurrentBranch()).toBe('Test-branch');
    });

    it('should not throw, if getting branch failed', async () => {
        (exec as jest.Mock<any, any>).mockImplementation(() => {
            return Promise.reject(0);
        });

        await expect(getCurrentBranch()).resolves.toBe(undefined);
    });
});
