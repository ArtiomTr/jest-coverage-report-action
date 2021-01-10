import { setFailed, getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { exec } from '@actions/exec';
import { argv, cwd } from 'process';

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

    await exec(testCommand);

    const output = readFileSync(coverageOutput);

    return output.toString();
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

        const octokit = getOctokit('cb3e22207e148ada031b7c31aaf61bf75ce46de6');

        const headOutput = await getCoverage(testScript, coverageOutputFile);
        // const baseOutput = await getCoverage(
        //     testScript,
        //     coverageOutputFile,
        //     pull_request.base.ref
        // );

        console.log(headOutput);
    } catch (error) {
        setFailed(error.message);
    }
}

run();
