import table from 'markdown-table';

import { ParsedCoverageSummary } from '../../collect/parseCoverageSummary';
import { summary } from '../strings.json';
import { formatPercentage } from '../utils/formatPercentage';
import { getStatusOfPercents } from '../utils/getStatusOfPercents';

export const formatCoverageSummary = (
    headSummary: ParsedCoverageSummary,
    baseSummary: ParsedCoverageSummary,
    threshold: number | undefined
): string =>
    [
        `### ${summary.heading}`,
        table(
            [
                summary.columnHeaders,
                ...(Object.keys(headSummary) as Array<
                    keyof ParsedCoverageSummary
                >).map((value: keyof ParsedCoverageSummary) => [
                    summary.keyToDisplayString[value],
                    getStatusOfPercents(
                        headSummary[value].percentage,
                        threshold
                    ),
                    formatPercentage(
                        headSummary[value].percentage,
                        baseSummary[value].percentage
                    ),
                    `${headSummary[value].covered}/${headSummary[value].total}`,
                ]),
            ],
            { align: summary.columnAlignment }
        ),
    ].join('\n');
