import { context } from '@actions/github';

import { CreateCheckOptions } from './CreateCheckOptions';
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
    conclusion: runReport.success ? 'success' : 'failure',
    name: i18n('testRunCheckName'),
    output: {
        title: runReport.success ? i18n('testsSuccess') : i18n('testsFail'),
        text: [
            annotations.length > 50 &&
                i18n('tooMuchAnnotations', {
                    hiddenCount: annotations.length - 50,
                }),
            i18n('testsFailSummaryPt2') +
                (!runReport.success ? '\n' + runReport.failures : ''),
        ]
            .filter(Boolean)
            .join('\n'),
        summary: runReport.summary,
        annotations:
            annotations.length > 0 ? annotations.slice(0, 49) : undefined,
    },
});
