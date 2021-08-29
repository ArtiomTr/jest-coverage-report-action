import { getReportTag } from '../constants/getReportTag';
import { formatCoverage } from '../format/formatCoverage';
import { formatErrors } from '../format/formatErrors';
import { insertArgs } from '../utils/insertArgs';
import template from '../format/template.md';
import { JsonReport } from '../typings/JsonReport';
import { DataCollector } from '../utils/DataCollector';
import { i18n } from '../utils/i18n';
import { context } from '@actions/github';

export const getSha = () =>
    context.payload.after ??
    context.payload.pull_request?.head.sha ??
    context.sha;

export const createReport = (
    dataCollector: DataCollector<JsonReport>,
    workingDirectory?: string,
    customTitle?: string
): string => {
    const { errors, data } = dataCollector.get();

    const formattedErrors = formatErrors(errors);

    const coverage = formatCoverage(data[0], data[1], undefined);

    return insertArgs(template, {
        body: [formattedErrors, coverage].join('\n'),
        dir: workingDirectory || '',
        tag: getReportTag(workingDirectory),
        title: insertArgs(customTitle || i18n('summaryTitle'), {
            dir: workingDirectory ? `for \`${workingDirectory}\`` : '',
        }),
        sha: getSha(),
    });
};
