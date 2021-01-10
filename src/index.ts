import { setFailed } from '@actions/core';
import { context } from '@actions/github';

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
    } catch (error) {
        setFailed(error.message);
    }
}

run();
