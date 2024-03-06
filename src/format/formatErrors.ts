import { formatThresholdResults } from './formatThresholdResults';
import { ActionError } from '../typings/ActionError';
import { FailReason } from '../typings/Report';
import { ThresholdResult } from '../typings/ThresholdResult';
import { getConsoleLink } from '../utils/getConsoleLink';
import { i18n } from '../utils/i18n';

const getNumberWidth = (index: number) => Math.floor(Math.log10(index));

const formatErrorsInner = (
    errors: Array<Error>,
    testsFailed: boolean,
    thresholdResults: ThresholdResult[]
) => {
    if (thresholdResults.length > 0) {
        return (
            i18n('errors.coverageFail') +
            '\n' +
            formatThresholdResults(thresholdResults) +
            '\n'
        );
    }

    if (errors.length === 0) {
        return undefined;
    }

    if (
        errors.some(
            (error) =>
                error instanceof ActionError &&
                error.failReason === FailReason.MISSING_CHECKS_PERMISSION
        )
    ) {
        return i18n('errors.missingChecksPermissionDetail');
    }

    if (errors.length === 1) {
        const error = errors[0];

        if (error instanceof ActionError) {
            return i18n('{{ error }}', { error: error.toString() });
        }

        if (
            error instanceof Error &&
            /The process [^\s]+ failed with exit code 1($|\s)/.test(
                error.message
            ) &&
            testsFailed
        ) {
            return i18n('errors.testFail');
        }

        return i18n('{{ unexpectedError }} \n```\n{{ error }}\n```', {
            error: error.toString(),
            unexpectedError: i18n('errors.unexpectedError', {
                consoleLink: getConsoleLink(),
            }),
        });
    }

    return (
        i18n('errors.multiple') +
        i18n('\n```\n{{ errors }}\n```\n', {
            errors: errors
                .map(
                    (error, index) =>
                        ` ${String(1 + index).padEnd(
                            1 + getNumberWidth(errors.length),
                            ' '
                        )} | ${error.toString()}`
                )
                .join('\n'),
        })
    );
};

export const formatErrors = (
    errors: Array<Error>,
    testsFailed: boolean,
    thresholdResults: ThresholdResult[]
) => {
    const text = formatErrorsInner(errors, testsFailed, thresholdResults);

    if (!text) {
        return '';
    }

    return (
        '> [!CAUTION]\n' +
        text
            .split('\n')
            .map((it) => `> ${it}\n`)
            .join('')
    );
};
