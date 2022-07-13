import { context } from '@actions/github';

import { CreateCheckOptions } from './CreateCheckOptions';
import { getFailedTestsAnnotationsBody } from './getFailedTestsAnnotationsBody';
import { Annotation } from '../../annotations/Annotation';
import { Options } from '../../typings/Options';
import { TestRunReport } from '../../typings/Report';
import { i18n } from '../../utils/i18n';

export const formatFailedTestsAnnotations = (
    runReport: TestRunReport,
    annotations: Array<Annotation>,
    options: Options
): CreateCheckOptions => ({
    ...context.repo,
    status: 'completed',
    head_sha: options?.pullRequest?.head?.sha ?? context.sha,
    conclusion: 'failure',
    name: i18n('failedTestsCheckName'),
    output: {
        title: i18n('testsFail'),
        text: [
            getFailedTestsAnnotationsBody(runReport),
            annotations.length > 50 &&
                i18n('tooMuchAnnotations', {
                    hiddenCount: annotations.length - 50,
                }),
        ]
            .filter(Boolean)
            .join('\n'),
        summary: runReport.summary,
        annotations: annotations.slice(0, 49),
    },
});
