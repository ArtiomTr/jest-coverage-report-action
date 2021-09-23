import type { getOctokit } from '@actions/github';
import * as all from '@actions/github';

import { generateCommitReport } from '../../src/report/generateCommitReport';

const { mockContext, clearContextMock } = all as any;

describe('generateCommitReport', () => {
    it('should generate commit report', async () => {
        const createCommitComment = jest.fn();

        mockContext({
            sha: '123456',
        });

        await generateCommitReport(
            'Report body',
            {
                owner: 'bot',
                repo: 'test-repository',
            },
            ({
                repos: {
                    createCommitComment,
                },
            } as unknown) as ReturnType<typeof getOctokit>
        );

        expect(createCommitComment).toBeCalledWith({
            owner: 'bot',
            repo: 'test-repository',
            body: 'Report body',
            commit_sha: '123456',
        });

        clearContextMock();
    });
});
