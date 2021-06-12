import { context } from '@actions/github';

import { CreateCheckOptions } from './CreateCheckOptions';
import { Annotation } from '../../annotations/Annotation';
import { insertArgs } from '../insertArgs';
import {
    coverageAnnotationsText,
    coverageFail,
    coverageOk,
    coverageTitle,
    coveredCheckName,
    tooMuchAnnotations,
} from '../strings.json';
import { decimalToString } from '../utils/decimalToString';

export const formatCoverageAnnotations = (
    success: boolean,
    coverage: number,
    threshold: number,
    annotations: Array<Annotation>
): CreateCheckOptions => ({
    ...context.repo,
    status: 'completed',
    head_sha: context.payload.pull_request?.head.sha ?? context.sha,
    conclusion: success ? 'success' : 'failure',
    name: coveredCheckName,
    output: {
        title: coverageTitle,
        summary: insertArgs(success ? coverageOk : coverageFail, {
            coverage: decimalToString(coverage),
            threshold: decimalToString(threshold),
        }),
        text: [
            coverageAnnotationsText,
            insertArgs(tooMuchAnnotations, {
                hiddenCount: annotations.length - 50,
            }),
        ]
            .filter(Boolean)
            .join('\n'),
        annotations: annotations.slice(0, 49),
    },
});
