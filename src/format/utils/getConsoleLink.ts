import { context } from '@actions/github';

export const getConsoleLink = () => {
    return `${context.payload.pull_request!._links.self.href}/checks`;
};
