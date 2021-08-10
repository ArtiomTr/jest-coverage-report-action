import { i18n } from '../utils/i18n';

export const formatErrors = (errors: Array<string | Error>) => {
    if (errors.length === 0) {
        return '';
    }

    if (errors.length === 1) {
        const error = errors[0];

        if (typeof error === 'string') {
            return i18n(':x: ') + i18n(`errors.${error}`);
        }

        return i18n(':x: \n```\n{{ error }}\n```', {
            error: error.toString(),
        });
    }

    return (
        i18n('errors.multiple') +
        i18n('\n```\n{{ errors }}```\n', {
            errors: errors
                .map((error, index) => {
                    let stringifiedError = '';

                    if (typeof error === 'string') {
                        stringifiedError = i18n(`errors.${error}`);
                    } else {
                        stringifiedError = error.toString();
                    }

                    return ` ${String(index).padEnd(
                        2 - Math.floor(Math.log10(index)),
                        ' '
                    )} | ${stringifiedError}`;
                })
                .join('\n'),
        })
    );
};
