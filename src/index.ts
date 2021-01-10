import { setFailed, getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { exec } from '@actions/exec';
import { argv, report } from 'process';

import { readFileSync } from 'fs';
import { parseCoverageSummary } from './parseCoverageSummary';
import { fetchPreviousComment } from './fetchPreviousComment';
import { getCommentBody } from './getCommentBody';

async function getCoverage(
    testCommand: string,
    coverageOutput: string,
    branch?: string
) {
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

    await exec(testCommand, [], {
        listeners: {
            stdout: (data) => (output += data.toString()),
        },
    });

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

        const [token, testScript, coverageOutputFile] = argv.slice(2);

        const octokit = getOctokit(token);

        const headOutput = await getCoverage(testScript, coverageOutputFile);
        const baseOutput = await getCoverage(
            testScript,
            coverageOutputFile,
            pull_request.base.ref
        );

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
