import { exec, ExecOptions } from '@actions/exec';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
    checkoutRef,
    getCurrentBranch,
    switchBranch,
} from '../../src/stages/switchBranch';
import { GithubRef } from '../../src/typings/Options';

vi.mock('@actions/exec');

const clearMocks = () => {
    vi.mocked(exec).mockClear();
};

beforeEach(clearMocks);

describe('switchBranch', () => {
    it('should fetch repository & switch to branch', async () => {
        await switchBranch('Test-branch');

        expect(exec).toBeCalledWith('git fetch --all --depth=1');
        expect(exec).toBeCalledWith('git checkout -f Test-branch');
    });

    it('should switch to branch, even if fetch failed', async () => {
        vi.mocked(exec).mockImplementationOnce(() => {
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

    it('should not add new remote, if fetching failed', async () => {
        vi.mocked(exec).mockRejectedValueOnce('Something went wrong...');

        try {
            await checkoutRef(
                {
                    ref: 'hello',
                    repo: { clone_url: 'https://github.com/test/repo.git' },
                    sha: '123456',
                },
                'remote-1',
                'branch-1'
            );
        } catch {
            /* Ignore error */
        }

        expect(exec).not.toBeCalledWith(
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

    it('should fallback to the old behavior, if something went wrong', async () => {
        await checkoutRef(
            {
                ref: 'hello',
            } as GithubRef,
            'remote-1',
            'branch-1'
        );

        expect(exec).toBeCalledWith('git checkout hello -f');
    });
});

describe('getCurrentBranch', () => {
    it('should get current branch', async () => {
        vi.mocked(exec).mockImplementation(
            (_command?: unknown, _args?: unknown, options?: ExecOptions) => {
                options?.listeners?.stdout?.(Buffer.from('   Te'));
                options?.listeners?.stdout?.(Buffer.from('st-branch\n \t'));

                return Promise.resolve(0);
            }
        );

        expect(await getCurrentBranch()).toBe('Test-branch');

        vi.mocked(exec).mockImplementation(
            (_command?: unknown, _args?: unknown, options?: ExecOptions) => {
                options?.listeners?.stdout?.(
                    Buffer.from(
                        'HEAD -> Fallback-to-old-behavior, origin/Fallback-to-old-behavior\n\n'
                    )
                );

                return Promise.resolve(0);
            }
        );

        expect(await getCurrentBranch()).toBe(
            'origin/Fallback-to-old-behavior'
        );

        vi.mocked(exec).mockImplementation(
            (_command?: unknown, _args?: unknown, options?: ExecOptions) => {
                options?.listeners?.stdout?.(
                    Buffer.from(
                        'HEAD -> Fallback-to-old-behavior, origin/Fallback-to-old-behavior\n\n'
                    )
                );

                return Promise.resolve(0);
            }
        );

        expect(await getCurrentBranch()).toBe(
            'origin/Fallback-to-old-behavior'
        );
    });

    it('should not throw, if getting branch failed', async () => {
        vi.mocked(exec).mockImplementation(() => {
            return Promise.reject(0);
        });

        await expect(getCurrentBranch()).resolves.toBe(undefined);
    });
});
