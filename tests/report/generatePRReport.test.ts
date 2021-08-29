import type { getOctokit } from '@actions/github';

import { getReportTag } from '../../src/constants/getReportTag';
import { generatePRReport } from '../../src/report/generatePRReport';

describe('generatePRReport', () => {
    it('should generate new PR report', async () => {
        const paginate = jest.fn(() => []);
        const updateComment = jest.fn();
        const createComment = jest.fn();

        await generatePRReport(
            'Report body',
            undefined,
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
                body: `${getReportTag()}`,
                id: 15,
            },
        ]);
        const updateComment = jest.fn();
        const createComment = jest.fn();

        await generatePRReport(
            'Report body',
            undefined,
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
