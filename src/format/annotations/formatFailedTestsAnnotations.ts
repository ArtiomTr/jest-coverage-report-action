import type { getOctokit } from '@actions/github';
import { context } from '@actions/github';

import { getFailedAnnotationsSummary } from './getFailedAnnotationsSummary';
import { getFailedTestsAnnotationsBody } from './getFailedTestsAnnotationsBody';
import { Annotation } from '../../annotations/createFailedTestsAnnotations';
import { JsonReport } from '../../typings/JsonReport';
import { failedTestsCheckName, testsFail, testsSuccess } from '../strings.json';

type Octokit = ReturnType<typeof getOctokit>;

type CreateCheckOptions = Required<Parameters<Octokit['checks']['create']>>[0];

export const formatFailedTestsAnnotations = (
    jsonReport: JsonReport,
    annotations: Array<Annotation>
): CreateCheckOptions => ({
    ...context.repo,
    status: 'completed',
    head_sha: context.payload.pull_request?.head.sha ?? context.sha,
    conclusion: jsonReport.success ? 'success' : 'failure',
    name: failedTestsCheckName,
    output: {
        title: jsonReport.success ? testsSuccess : testsFail,
        text: getFailedTestsAnnotationsBody(jsonReport),
        summary: getFailedAnnotationsSummary(jsonReport),
        annotations,
    },
});
