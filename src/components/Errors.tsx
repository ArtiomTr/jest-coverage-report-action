import { ErrorView } from './ErrorView.js';
import { ActionError } from '../typings/ActionError.js';
import { FailReason } from '../typings/Report.js';
import { i18n } from '../utils/i18n.js';

export type ErrorsProps = {
    errors: Error[];
};

const getNumberWidth = (index: number) => Math.floor(Math.log10(index));

const combineErrors = (errors: Error[]) => {
    return errors
        .map(
            (error, index) =>
                ` ${String(1 + index).padEnd(
                    1 + getNumberWidth(errors.length),
                    ' '
                )} | ${error.toString()}`
        )
        .join('\n');
};

export const Errors = ({ errors }: ErrorsProps) => {
    if (errors.length === 0) {
        return null;
    }

    if (errors.length > 1) {
        return (
            <ErrorView
                error={i18n('errors.multiple')}
                details={combineErrors(errors)}
            />
        );
    }

    const error = errors[0];

    if (!(error instanceof ActionError)) {
        return (
            <ErrorView
                error={i18n('errors.unexpectedError')}
                details={error.toString()}
            />
        );
    }

    if (error.reason === FailReason.UNKNOWN_ERROR) {
        return <ErrorView error={error.toString()} />;
    }

    return <ErrorView error={error.toString()} />;
};
