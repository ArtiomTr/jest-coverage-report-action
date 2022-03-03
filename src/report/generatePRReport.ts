import { getOctokit } from '@actions/github';

import { fetchPreviousReport } from './fetchPreviousReport';
import { Options } from '../typings/Options';

export const generatePRReport = async (
    report: string,
    options: Options,
    repo: { owner: string; repo: string },
    pr: { number: number },
    octokit: ReturnType<typeof getOctokit>
) => {
    console.log('generating PR report');

    const previousReport = await fetchPreviousReport(
        octokit,
        repo,
        pr,
        options
    );

    if (previousReport) {
        console.log('Previous report fetched');
        await octokit.issues.updateComment({
            ...repo,
            body: report,
            comment_id: (previousReport as { id: number }).id,
        });
    } else {
        await octokit.issues.createComment({
            ...repo,
            body: report,
            issue_number: pr.number,
        });
    }
};
