import table from 'markdown-table';

import { CoverageSummary } from '../../typings/Coverage';
import { i18n } from '../../utils/i18n';
import { formatPercentage } from '../utils/formatPercentage';
import { formatTable } from '../utils/formatTable';
import { getStatusOfPercents } from '../utils/getStatusOfPercents';

export const formatCoverageSummary = (
    headSummary: Array<CoverageSummary>,
    baseSummary: Array<CoverageSummary> | undefined,
    threshold: number | undefined
): string =>
    formatTable(
        i18n('summary.heading'),
        table(
            [
                [
                    i18n('status'),
                    i18n('category'),
                    i18n('percentage'),
                    i18n('ratio'),
                ],
                ...headSummary.map((currSummary, index) => [
                    getStatusOfPercents(currSummary.percentage, threshold),
                    currSummary.title,
                    formatPercentage(
                        currSummary.percentage,
                        baseSummary?.[index].percentage
                    ),
                    `${currSummary.covered}/${currSummary.total}`,
                ]),
            ],
            { align: ['c', 'l', 'l', 'c'] }
        ),
        i18n('hint')
    );
