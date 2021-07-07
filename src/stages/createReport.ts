import { getReportTag } from '../constants/getReportTag';
import { formatCoverage } from '../format/formatCoverage';
import { formatErrors } from '../format/formatErrors';
import { insertArgs } from '../format/insertArgs';
import template from '../format/template.md';
import { JsonReport } from '../typings/JsonReport';
import { DataCollector } from '../utils/DataCollector';

export const createReport = (
    dataCollector: DataCollector<JsonReport>,
    workingDirectory?: string
): string => {
    const { errors, data } = dataCollector.get();

    const formattedErrors = formatErrors(errors);

    const coverage = formatCoverage(data[0], data[1], undefined);

    return insertArgs(template, {
        body: [formattedErrors, coverage].join('\n'),
        dir: workingDirectory || '',
        tag: getReportTag(workingDirectory),
    });
};
