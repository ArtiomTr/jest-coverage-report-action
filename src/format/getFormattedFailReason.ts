import { errorIcon, errors } from './strings.json';
import { FailReason } from '../report/generateReport';

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

export const getFormattedFailReason = (
    reason: FailReason,
    coverageThreshold?: number,
    currentCoverage?: number
): string =>
    `${errorIcon} ${insertArgs(errors[reason], {
        coverageThreshold,
        currentCoverage,
    })}`;
