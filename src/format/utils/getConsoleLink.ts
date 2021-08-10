import { context } from '@actions/github';

export const getConsoleLink = () => {
    return context.repo.repo;
    // context.payload.repository?.html_url + `/actions/runs/${context.runId}`
};
