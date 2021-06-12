import { context } from '@actions/github';

import { CreateCheckOptions } from './CreateCheckOptions';
import { Annotation } from '../../annotations/Annotation';
import { JsonReport } from '../../typings/JsonReport';

export const formatCoverageAnnotations = (
    jsonReport: JsonReport,
    annotations: Array<Annotation>
): CreateCheckOptions => ({
    ...context.repo,
    status: 'completed',
    head_sha: context.payload.pull_request?.head.sha ?? context.sha,
    conclusion: jsonReport.success ? 'success' : 'failure',
    name: 'Coverage annotations',
    output: {
        title: 'Coverage report annotations',
        summary: 'Annotations',
        annotations,
    },
});
