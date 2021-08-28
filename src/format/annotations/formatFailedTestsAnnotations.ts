import { context } from '@actions/github';

import { CreateCheckOptions } from './CreateCheckOptions';
import { getFailedTestsAnnotationsBody } from './getFailedTestsAnnotationsBody';
import { Annotation } from '../../annotations/Annotation';
import { TestRunReport } from '../../typings/Report';
import { insertArgs } from '../../utils/insertArgs';
import {
    failedTestsCheckName,
    testsFail,
    tooMuchAnnotations,
} from '../strings.json';

export const formatFailedTestsAnnotations = (
    runReport: TestRunReport,
    annotations: Array<Annotation>
): CreateCheckOptions => ({
    ...context.repo,
    status: 'completed',
    head_sha: context.payload.pull_request?.head.sha ?? context.sha,
    conclusion: 'failure',
    name: failedTestsCheckName,
    output: {
        title: testsFail,
        text: [
            getFailedTestsAnnotationsBody(runReport),
            annotations.length > 50 &&
                insertArgs(tooMuchAnnotations, {
                    hiddenCount: annotations.length - 50,
                }),
        ]
            .filter(Boolean)
            .join('\n'),
        summary: runReport.summary,
        annotations: annotations.slice(0, 49),
    },
});
