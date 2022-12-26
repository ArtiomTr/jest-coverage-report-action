import { context } from '@actions/github';

import { CreateCheckOptions } from './CreateCheckOptions.js';
import { getFailedTestsAnnotationsBody } from './getFailedTestsAnnotationsBody.js';
import { Annotation } from '../../annotations/Annotation.js';
import { Options } from '../../typings/Options.js';
import { TestRunReport } from '../../typings/Report.js';
import { i18n } from '../../utils/i18n.js';

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
