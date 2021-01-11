import { argv } from 'process';

import { setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

import { collectCoverage } from './collect-coverage/collectCoverage';
import { getCommentBody } from './comment-body/getCommentBody';
import { fetchPreviousComment } from './fetchPreviousComment';

async function run() {
    try {
        const {
            payload: { pull_request },
            repo,
        } = context;

        if (!pull_request) {
            throw new Error(
                'jest-coverage-report-action supports only pull requests.'
            );
        }

        const [token, testScript] = argv.slice(2);

        const octokit = getOctokit(token);

        const [headSummary, headDetails] = await collectCoverage(testScript);
        const [baseSummary, baseDetails] = await collectCoverage(testScript);

        const previousComment = await fetchPreviousComment(
            octokit,
            repo,
            pull_request
        );

        const body = getCommentBody(
            headSummary,
            baseSummary,
            headDetails,
            baseDetails
        );

        try {
            if (previousComment) {
                await octokit.issues.deleteComment({
                    ...repo,
                    comment_id: (previousComment as { id: number }).id,
                });
            }
            await octokit.issues.createComment({
                ...repo,
                issue_number: pull_request.number,
                body,
            });
        } catch (error) {
            console.error(
                "Error deleting and/or creating comment. This can happen for PR's originating from a fork without write permissions."
            );
        }
    } catch (error) {
        setFailed(error.message);
    }
}

run();
