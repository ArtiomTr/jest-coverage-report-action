import { argv } from 'process';

import { setFailed } from '@actions/core';
import { exec } from '@actions/exec';
import { context, getOctokit } from '@actions/github';

import { getCommentBody } from './comment-body/getCommentBody';
import { fetchPreviousComment } from './fetchPreviousComment';
import { parseCoverageDetails } from './parseCoverageDetails';
import { parseCoverageSummary } from './parseCoverageSummary';

async function getCoverage(testCommand: string, branch?: string) {
    if (branch) {
        try {
            await exec(`git fetch ${branch} --depth=1`);
        } catch (error) {
            console.error('Fetch failed', error.message);
        }

        await exec(`git checkout -f ${branch}`);
    }

    await exec('npm ci');

    let output = '';

    try {
        await exec(testCommand, [], {
            listeners: {
                stdout: (data) => (output += data.toString()),
            },
        });
    } catch (error) {
        setFailed(`Test execution failed with message: "${error.message}"`);
    }

    return output;
}

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

        const headOutput = await getCoverage(testScript);
        const baseOutput = await getCoverage(testScript, pull_request.base.ref);

        const headSummary = parseCoverageSummary(headOutput);
        const baseSummary = parseCoverageSummary(baseOutput);

        const headDetails = parseCoverageDetails(headOutput);
        const baseDetails = parseCoverageDetails(baseOutput);

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
