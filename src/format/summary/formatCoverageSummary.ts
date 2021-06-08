import table from 'markdown-table';

import { CoverageSummary } from '../../typings/Coverage';
import { Icons } from '../Icons';
import { insertArgs } from '../insertArgs';
import { hint } from '../strings.json';
import { summary } from '../strings.json';
import { formatPercentage } from '../utils/formatPercentage';
import { formatTable } from '../utils/formatTable';
import { getStatusOfPercents } from '../utils/getStatusOfPercents';

export const formatCoverageSummary = (
    icons: Icons,
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
                        icons,
                        currSummary.percentage,
                        threshold
                    ),
                    currSummary.title,
                    formatPercentage(
                        currSummary.percentage,
                        baseSummary[index].percentage,
                        icons
                    ),
                    `${currSummary.covered}/${currSummary.total}`,
                ]),
            ],
            { align: summary.columnAlignment }
        ),
        insertArgs(hint, {
            coverageGood: icons.coverageGood,
            coverageNormal: icons.coverageNormal,
            coverageBad: icons.coverageBad,
        })
    );
