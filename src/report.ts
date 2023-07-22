import core from '@actions/core';
import { ZodError } from 'zod';

import { getCurrentBranch } from './git';
import { getOptions } from './options';

export interface InvalidOptionsReport {
    type: 'invalid-options';
    error: ZodError;
}

export type CovbotReport = InvalidOptionsReport;

export const getReport = async (): Promise<CovbotReport> => {
    core.debug('[stage]: getting options');
    const options = getOptions();

    /**
     * Report error if failed to parse options.
     * There is nothing more we could do.
     */
    if (!options.success) {
        return {
            type: 'invalid-options',
            error: options.error,
        };
    }

    /**
     * Try to get current branch on current repository.
     * This is needed just for consistency - when action ends work, return to initial branch.
     * It will automatically report warning, if getting this branch failed.
     */
    core.debug('[stage]: getting current branch');
    const currentBranch = await getCurrentBranch();

    /**
     * If it is pull request, or pull request number is present, get PR info
     */
    const pullRequest = getPullRequestInfo();
};
