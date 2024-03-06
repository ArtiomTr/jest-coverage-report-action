import { context } from '@actions/github';

import { getReportTag } from '../constants/getReportTag';
import { GITHUB_MESSAGE_SIZE_LIMIT } from '../constants/GITHUB_MESSAGE_SIZE_LIMIT';
import { formatCoverage } from '../format/formatCoverage';
import { formatErrors } from '../format/formatErrors';
import { formatRunReport } from '../format/formatRunReport';
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
    runReport: TestRunReport | undefined,
    options: Options,
    thresholdResults: ThresholdResult[]
): SummaryReport => {
    const { workingDirectory, customTitle } = options;

    const { errors, data } = dataCollector.get();
    const [headReport, baseReport] = data;
    const formattedErrors = formatErrors(
        errors,
        headReport.numFailedTests !== 0 ||
            headReport.numFailedTestSuites !== 0 ||
            headReport.numRuntimeErrorTestSuites !== 0,
        thresholdResults
    );

    const coverage = formatCoverage(headReport, baseReport, undefined, false);
    const formattedReport = runReport ? formatRunReport(runReport) : '';

    let templateText = insertArgs(template, {
        body: [formattedErrors, coverage, formattedReport].join('\n'),
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
            body: [formattedErrors, reducedCoverage, formattedReport].join(
                '\n'
            ),
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
    };
};
