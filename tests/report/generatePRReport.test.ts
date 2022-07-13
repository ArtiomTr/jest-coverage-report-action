import type { getOctokit } from '@actions/github';

import { getReportTag } from '../../src/constants/getReportTag';
import { generatePRReport } from '../../src/report/generatePRReport';
import { Options } from '../../src/typings/Options';

const DEFAULT_OPTIONS: Options = {
    token: '',
    testScript: '',
    iconType: 'emoji',
    annotations: 'all',
    packageManager: 'npm',
    skipStep: 'all',
    prNumber: 7,
    pullRequest: {
        number: 7,
        head: { sha: '123456', ref: '123' },
        base: { ref: '456' },
    },
};

describe('generatePRReport', () => {
    it('should generate new PR report', async () => {
        const paginate = jest.fn(() => []);
        const updateComment = jest.fn();
        const createComment = jest.fn();

        await generatePRReport(
            'Report body',
            DEFAULT_OPTIONS,
            {
                owner: 'bot',
                repo: 'test-repository',
            },
            {
                number: 7,
            },
            ({
                issues: {
                    updateComment,
                    createComment,
                },
                paginate,
            } as unknown) as ReturnType<typeof getOctokit>
        );

        expect(createComment).toBeCalledWith({
            owner: 'bot',
            repo: 'test-repository',
            body: 'Report body',
            issue_number: 7,
        });

        expect(updateComment).not.toBeCalled();
    });

    it('should update old report', async () => {
        const paginate = jest.fn(() => [
            {
                body: `${getReportTag(DEFAULT_OPTIONS)}`,
                id: 15,
            },
        ]);
        const updateComment = jest.fn();
        const createComment = jest.fn();

        await generatePRReport(
            'Report body',
            DEFAULT_OPTIONS,
            {
                owner: 'bot',
                repo: 'test-repository',
            },
            {
                number: 7,
            },
            ({
                issues: {
                    updateComment,
                    createComment,
                },
                paginate,
            } as unknown) as ReturnType<typeof getOctokit>
        );

        expect(updateComment).toBeCalledWith({
            owner: 'bot',
            repo: 'test-repository',
            body: 'Report body',
            comment_id: 15,
        });

        expect(createComment).not.toBeCalled();
    });
});
