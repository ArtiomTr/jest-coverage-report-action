import type { getOctokit } from '@actions/github';

import { getReportTag } from '../../src/constants/getReportTag';
import { fetchPreviousReport } from '../../src/report/fetchPreviousReport';
import { Options } from '../../src/typings/Options';

const DEFAULT_OPTIONS: Options = {
    token: '',
    testScript: '',
    iconType: 'emoji',
    annotations: 'all',
    packageManager: 'npm',
    skipStep: 'all',
    prNumber: 5,
    pullRequest: {
        number: 5,
        head: { sha: '123', ref: '123' },
        base: { ref: '456' },
    },
};

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
                body: `${getReportTag(
                    DEFAULT_OPTIONS
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
                DEFAULT_OPTIONS
            )
        ).resolves.toStrictEqual({
            body: `${getReportTag(
                DEFAULT_OPTIONS
            )}\n This is jest-coverage-report-action report`,
        });

        expect(paginate).toBeCalledWith(
            'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
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
                    DEFAULT_OPTIONS
                )}\n This is jest-coverage-report-action report`,
            },
            {
                body: 'Another comment',
            },
            {
                body: `${getReportTag(
                    DEFAULT_OPTIONS
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
                DEFAULT_OPTIONS
            )
        ).resolves.toStrictEqual({
            body: `${getReportTag(
                DEFAULT_OPTIONS
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
                DEFAULT_OPTIONS
            )
        ).resolves.toStrictEqual(null);
    });
});
