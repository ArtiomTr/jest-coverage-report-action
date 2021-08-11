import { context } from '@actions/github';

import { CreateCheckOptions } from './CreateCheckOptions';
import { getFailedAnnotationsSummary } from './getFailedAnnotationsSummary';
import { getFailedTestsAnnotationsBody } from './getFailedTestsAnnotationsBody';
import { Annotation } from '../../annotations/Annotation';
import { JsonReport } from '../../typings/JsonReport';
import { insertArgs } from '../../utils/insertArgs';
import {
    failedTestsCheckName,
    testsFail,
    testsSuccess,
    tooMuchAnnotations,
} from '../strings.json';

export const formatFailedTestsAnnotations = (
    jsonReport: JsonReport,
    annotations: Array<Annotation>
): CreateCheckOptions => ({
    ...context.repo,
    status: 'completed',
    head_sha: context.payload.pull_request?.head.sha ?? context.sha,
    conclusion: 'success',
    name: failedTestsCheckName,
    output: {
        title: jsonReport.success ? testsSuccess : testsFail,
        text: [
            getFailedTestsAnnotationsBody(jsonReport),
            annotations.length > 50 &&
                insertArgs(tooMuchAnnotations, {
                    hiddenCount: annotations.length - 50,
                }),
        ]
            .filter(Boolean)
            .join('\n'),
        summary: getFailedAnnotationsSummary(jsonReport),
        annotations: annotations.slice(0, 49),
    },
});
