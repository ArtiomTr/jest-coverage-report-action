import { insertArgs } from './insertArgs';
import { errorIcon, errors } from './strings.json';
import { FailReason } from '../typings/Report';

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
        coveragePath: 'report.json',
    })}${errorToDisplay(error)}`;
