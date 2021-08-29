import type { getOctokit } from '@actions/github';

import { getReportTag } from '../../src/constants/getReportTag';
import { fetchPreviousReport } from '../../src/report/fetchPreviousReport';

describe('fetchPreviousReport', () => {
    it('should find previous report', async () => {
        const paginate = jest.fn();

        paginate.mockImplementationOnce(() => [
            {
                body: 'Just simple comment',
            },
            {
                body: 'Another comment',
            },
            {
                body: `${getReportTag()}\n This is jest-coverage-report-action report`,
            },
            {
                body: 'One more comment',
            },
        ]);

        await expect(
            fetchPreviousReport(
                ({
                    paginate,
                } as unknown) as ReturnType<typeof getOctokit>,
                {
                    owner: 'bot',
                    repo: 'test-repo',
                },
                {
                    number: 5,
                }
            )
        ).resolves.toStrictEqual({
            body: `${getReportTag()}\n This is jest-coverage-report-action report`,
        });

        expect(paginate).toBeCalledWith(
            'GET /repos/:owner/:repo/issues/:issue_number/comments',
            {
                owner: 'bot',
                repo: 'test-repo',
                issue_number: 5,
            }
        );
    });

    it('should find previous report for specified directory', async () => {
        const paginate = jest.fn();

        paginate.mockImplementationOnce(() => [
            {
                body: 'Just simple comment',
            },
            {
                body: `${getReportTag(
                    'folder1'
                )}\n This is jest-coverage-report-action report`,
            },
            {
                body: 'Another comment',
            },
            {
                body: `${getReportTag(
                    'folder2'
                )}\n This is jest-coverage-report-action report`,
            },
            {
                body: 'One more comment',
            },
        ]);

        await expect(
            fetchPreviousReport(
                ({
                    paginate,
                } as unknown) as ReturnType<typeof getOctokit>,
                {
                    owner: 'bot',
                    repo: 'test-repo',
                },
                {
                    number: 5,
                },
                'folder2'
            )
        ).resolves.toStrictEqual({
            body: `${getReportTag(
                'folder2'
            )}\n This is jest-coverage-report-action report`,
        });
    });

    it('should return null if no report found', async () => {
        const paginate = jest.fn();

        paginate.mockImplementationOnce(() => [
            {
                body: 'Just simple comment',
            },
            {
                body: 'Another comment',
            },
            {
                body: 'One more comment',
            },
        ]);

        await expect(
            fetchPreviousReport(
                ({
                    paginate,
                } as unknown) as ReturnType<typeof getOctokit>,
                {
                    owner: 'bot',
                    repo: 'test-repo',
                },
                {
                    number: 5,
                },
                'folder2'
            )
        ).resolves.toStrictEqual(null);
    });
});
