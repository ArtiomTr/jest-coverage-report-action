import { context } from '@actions/github';

import { getReportTag } from '../constants/getReportTag.js';
import { GITHUB_MESSAGE_SIZE_LIMIT } from '../constants/GITHUB_MESSAGE_SIZE_LIMIT.js';
import { formatCoverage } from '../format/formatCoverage.js';
import { formatErrors } from '../format/formatErrors.js';
import { formatRunReport } from '../format/formatRunReport.js';
import { formatThresholdResults } from '../format/formatThresholdResults.js';
import { getFailureDetails } from '../format/getFailureDetails.js';
import { getTestRunSummary } from '../format/summary/getTestRunSummary.js';
import template from '../format/template.md';
import { JsonReport } from '../typings/JsonReport.js';
import { Options } from '../typings/Options.js';
import { SummaryReport, TestRunReport } from '../typings/Report.js';
import { ThresholdResult } from '../typings/ThresholdResult.js';
import { DataCollector } from '../utils/DataCollector.js';
import { i18n } from '../utils/i18n.js';
import { insertArgs } from '../utils/insertArgs.js';

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
    const coverage = formatCoverage(headReport, baseReport, undefined, false);
    const runReport: TestRunReport = {
        title: i18n(headReport.success ? 'testsSuccess' : 'testsFail'),
        summary: getTestRunSummary(headReport),
        failures: getFailureDetails(headReport),
    };
    const formattedReport = formatRunReport(runReport);

    let templateText = insertArgs(template, {
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
    });

    if (templateText.length > GITHUB_MESSAGE_SIZE_LIMIT) {
        const reducedCoverage = formatCoverage(
            headReport,
            baseReport,
            undefined,
            true
        );

        templateText = insertArgs(template, {
            body: [
                formattedErrors,
                formattedThresholdResults,
                reducedCoverage,
                formattedReport,
            ].join('\n'),
            dir: workingDirectory || '',
            tag: getReportTag(options),
            title: insertArgs(customTitle || i18n('summaryTitle'), {
                dir: workingDirectory ? `for \`${workingDirectory}\`` : '',
            }),
            sha: getSha(),
        });
    }

    return {
        text: templateText,
        runReport,
    };
};
