import { context } from '@actions/github';

import { CreateCheckOptions } from './CreateCheckOptions';
import { Annotation } from '../../annotations/Annotation';
import { JsonReport } from '../../typings/JsonReport';
import {
    coverageSummary,
    coverageTitle,
    coveredCheckName,
} from '../strings.json';

export const formatCoverageAnnotations = (
    jsonReport: JsonReport,
    success: boolean,
    annotations: Array<Annotation>
): CreateCheckOptions => ({
    ...context.repo,
    status: 'completed',
    head_sha: context.payload.pull_request?.head.sha ?? context.sha,
    conclusion: success ? 'success' : 'failure',
    name: coveredCheckName,
    output: {
        title: coverageTitle,
        summary: coverageSummary,
        annotations,
    },
});
