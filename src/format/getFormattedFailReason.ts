import { errorIcon, errors } from './strings.json';
import { FailReason } from '../typings/Report';

const insertArgs = (
    text: string,
    args: Record<string, string | number | undefined>
) => {
    Object.keys(args).forEach(
        (argName) =>
            args[argName] !== undefined &&
            args[argName] !== null &&
            (text = text.replace(`{{ ${argName} }}`, args[argName] as string))
    );
    return text;
};

const errorToDisplay = (error?: Error) =>
    error ? `\n\`\`\`\n${error.stack}\n\`\`\`` : '';

export const getFormattedFailReason = (
    reason: FailReason,
    coverageThreshold?: number,
    currentCoverage?: number,
    error?: Error
): string =>
    `${errorIcon} ${insertArgs(errors[reason], {
        coverageThreshold,
        currentCoverage,
    })}${errorToDisplay(error)}`;
