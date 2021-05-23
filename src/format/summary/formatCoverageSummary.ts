import table from 'markdown-table';

import { CoverageSummary } from '../../typings/Coverage';
import { hint } from '../strings.json';
import { summary } from '../strings.json';
import { formatPercentage } from '../utils/formatPercentage';
import { formatTable } from '../utils/formatTable';
import { getStatusOfPercents } from '../utils/getStatusOfPercents';

export const formatCoverageSummary = (
    headSummary: Array<CoverageSummary>,
    baseSummary: Array<CoverageSummary>,
    threshold: number | undefined
): string =>
    formatTable(
        summary.heading,
        table(
            [
                summary.columnHeaders,
                ...headSummary.map((currSummary, index) => [
                    getStatusOfPercents(
                        currSummary.covered / currSummary.total,
                        threshold
                    ),
                    currSummary.title,
                    formatPercentage(
                        currSummary.covered / currSummary.total,
                        baseSummary[index].covered / baseSummary[index].total
                    ),
                    `${currSummary.covered}/${currSummary.total}`,
                ]),
            ],
            { align: summary.columnAlignment }
        ),
        hint
    );
