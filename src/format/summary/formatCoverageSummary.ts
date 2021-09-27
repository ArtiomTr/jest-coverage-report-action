import table from 'markdown-table';

import { CoverageSummary, CoverageThreshold } from '../../typings/Coverage';
import { formatPercentage } from '../../utils/formatPercentage';
import { getStatusOfPercents } from '../../utils/getStatusOfPercents';
import { i18n } from '../../utils/i18n';
import { withExplanation } from '../../utils/withExplanation';

export const formatCoverageSummary = (
    headSummary: Array<CoverageSummary>,
    baseSummary: Array<CoverageSummary> | undefined,
    threshold: CoverageThreshold | undefined
): string =>
    table(
        [
            [
                withExplanation(i18n('status'), i18n('statusExplanation')),
                i18n('category'),
                i18n('percentage'),
                i18n('ratio'),
            ],
            ...headSummary.map((currSummary, index) => [
                getStatusOfPercents(
                    currSummary.percentage,
                    threshold?.global[currSummary.name]
                ),
                currSummary.title,
                formatPercentage(
                    currSummary.percentage,
                    baseSummary?.[index].percentage
                ),
                `${currSummary.covered}/${currSummary.total}`,
            ]),
        ],
        { align: ['c', 'l', 'l', 'c'] }
    );
