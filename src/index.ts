import { setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { exec } from '@actions/exec';
import { argv } from 'process';

import { parseCoverageSummary } from './parseCoverageSummary';
import { fetchPreviousComment } from './fetchPreviousComment';
import { getCommentBody } from './getCommentBody';

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

        const previousComment = await fetchPreviousComment(
            octokit,
            repo,
            pull_request
        );

        const body = getCommentBody(headSummary, baseSummary);

        if (previousComment) {
            try {
                await octokit.issues.deleteComment({
                    ...repo,
                    comment_id: (previousComment as any).id,
                });

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
        }
    } catch (error) {
        setFailed(error.message);
    }
}

run();
