import { MESSAGE_HEADING } from './fetchPreviousComment';
import { ParsedCoverageSummary } from './parseCoverageSummary';
import table from 'markdown-table';

const map: Record<string, string> = {
    statements: 'Statements',
    branches: 'Branches',
    functions: 'Functions',
    lines: 'Lines',
};

const APPROXIMATION_DELTA = 0.1;

const getFormattedPercentage = (
    headPercentage: number,
    basePercentage: number
) => {
    const delta = headPercentage - basePercentage;

    const symbol =
        delta < -APPROXIMATION_DELTA
            ? '🔻'
            : delta > APPROXIMATION_DELTA
            ? '🔼'
            : '~';

    return `${headPercentage}% (${symbol} ${delta})`;
};

export const getCommentBody = (
    headSummary: ParsedCoverageSummary,
    baseSummary: ParsedCoverageSummary
): string => {
    return [
        MESSAGE_HEADING,
        table(
            (Object.keys(headSummary) as Array<
                keyof ParsedCoverageSummary
            >).map((value: keyof ParsedCoverageSummary) => [
                map[value],
                getFormattedPercentage(
                    headSummary[value].percentage,
                    baseSummary[value].percentage
                ),
                `${headSummary[value].covered}/${headSummary[value].total}`,
            ])
        ),
    ].join('\n');
};
