import { ActionError } from '../typings/ActionError';
import { getConsoleLink } from '../utils/getConsoleLink';
import { i18n } from '../utils/i18n';

const getNumberWidth = (index: number) => Math.floor(Math.log10(index));

export const formatErrors = (errors: Array<Error>) => {
    if (errors.length === 0) {
        return '';
    }

    if (errors.length === 1) {
        const error = errors[0];

        if (error instanceof ActionError) {
            return i18n(':x: {{ error }}', { error: error.toString() });
        }

        return i18n(':x: {{ unexpectedError }} \n```\n{{ error }}\n```', {
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
