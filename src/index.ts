import { setFailed, getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { exec } from '@actions/exec';
import { argv } from 'process';

import { readFileSync } from 'fs';

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

        console.log(headOutput, baseOutput);
    } catch (error) {
        setFailed(error.message);
    }
}

run();
