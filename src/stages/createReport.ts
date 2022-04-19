import { context } from '@actions/github';

import { getReportTag } from '../constants/getReportTag';
import { formatCoverage } from '../format/formatCoverage';
import { formatErrors } from '../format/formatErrors';
import { formatRunReport } from '../format/formatRunReport';
import { formatThresholdResults } from '../format/formatThresholdResults';
import { getFailureDetails } from '../format/getFailureDetails';
import { getTestRunSummary } from '../format/summary/getTestRunSummary';
import template from '../format/template.md';
import { JsonReport } from '../typings/JsonReport';
import { Options } from '../typings/Options';
import { SummaryReport, TestRunReport } from '../typings/Report';
import { ThresholdResult } from '../typings/ThresholdResult';
import { DataCollector } from '../utils/DataCollector';
import { i18n } from '../utils/i18n';
import { insertArgs } from '../utils/insertArgs';

export const getSha = () =>
    context.payload.after ??
    context.payload.pull_request?.head.sha ??
    context.sha;

export const createReport = (
    dataCollector: DataCollector<JsonReport>,
    options: Options,
    thresholdResults: ThresholdResult[]
): SummaryReport => {
    const { workingDirectory, customTitle } = options;

    const { errors, data } = dataCollector.get();
    const [headReport, baseReport] = data;
    const formattedErrors = formatErrors(errors);

    const formattedThresholdResults = formatThresholdResults(thresholdResults);

    const coverage = formatCoverage(headReport, baseReport, undefined);

    const runReport: TestRunReport = {
        title: i18n(headReport.success ? 'testsSuccess' : 'testsFail'),
        summary: getTestRunSummary(headReport),
        failures: getFailureDetails(headReport),
    };
    const formattedReport = formatRunReport(runReport);
    return {
        text: insertArgs(template, {
            body: [
                formattedErrors,
                formattedThresholdResults,
                coverage,
                formattedReport,
            ].join('\n'),
            dir: workingDirectory || '',
            tag: getReportTag(options),
            title: insertArgs(customTitle || i18n('summaryTitle'), {
                dir: workingDirectory ? `for \`${workingDirectory}\`` : '',
            }),
            sha: getSha(),
        }),
        runReport,
    };
};
