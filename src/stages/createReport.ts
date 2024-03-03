import { context } from '@actions/github';

import { getReportTag } from '../constants/getReportTag';
import { GITHUB_MESSAGE_SIZE_LIMIT } from '../constants/GITHUB_MESSAGE_SIZE_LIMIT';
import { formatCoverage } from '../format/formatCoverage';
import { formatErrors } from '../format/formatErrors';
import { formatRunReport } from '../format/formatRunReport';
import { formatThresholdResults } from '../format/formatThresholdResults';
import { getFailureDetails } from '../format/getFailureDetails';
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
    const formattedErrors = formatErrors(
        errors,
        headReport.success,
        thresholdResults.length > 0
    );

    const formattedThresholdResults = formatThresholdResults(thresholdResults);
    const coverage = formatCoverage(headReport, baseReport, undefined, false);
    const runReport: TestRunReport = headReport.success
        ? {
              success: true,
              title: i18n('testsSuccess'),
              summary: i18n('testsSuccessSummary', {
                  numPassedTests: headReport.numPassedTests,
                  numPassedTestSuites: headReport.numPassedTestSuites,
                  ending: headReport.numPassedTestSuites > 1 ? 's' : '',
              }),
          }
        : {
              success: false,
              title: i18n('testsFail'),
              summary: i18n('testsFailSummary', {
                  numFailedTests: headReport.numFailedTests,
                  numTotalTests: headReport.numTotalTests,
                  numFailedTestSuites: headReport.numFailedTestSuites,
                  numTotalTestSuites: headReport.numTotalTestSuites,
              }),
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

        if (templateText.length > GITHUB_MESSAGE_SIZE_LIMIT) {
            templateText = insertArgs(template, {
                body: insertArgs('> {{ text }}', {
                    text: i18n('errors.reportGenerationError'),
                }),
                dir: workingDirectory || '',
                tag: getReportTag(options),
                title: insertArgs(customTitle || i18n('summaryTitle'), {
                    dir: workingDirectory ? `for \`${workingDirectory}\`` : '',
                }),
                sha: getSha(),
            });
        }
    }

    return {
        text: templateText,
        runReport,
    };
};
