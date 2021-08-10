import { context } from '@actions/github';

export const getConsoleLink = () => {
    return JSON.stringify(context);
};
