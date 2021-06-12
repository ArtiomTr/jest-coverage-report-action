import { context } from '@actions/github';

import { CreateCheckOptions } from './CreateCheckOptions';
import { getFailedAnnotationsSummary } from './getFailedAnnotationsSummary';
import { getFailedTestsAnnotationsBody } from './getFailedTestsAnnotationsBody';
import { Annotation } from '../../annotations/Annotation';
import { JsonReport } from '../../typings/JsonReport';
import { failedTestsCheckName, testsFail, testsSuccess } from '../strings.json';

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
