import table from 'markdown-table';

import { CoverageSummary } from '../../typings/Coverage';
import { CoverageColumnType } from '../../typings/Options';
import { formatPercentage } from '../../utils/formatPercentage';
import { getStatusOfPercents } from '../../utils/getStatusOfPercents';
import { i18n } from '../../utils/i18n';
import { withExplanation } from '../../utils/withExplanation';

// Map column types to summary titles (lowercase for comparison)
const COLUMN_TO_TITLE: Record<CoverageColumnType, string> = {
    statements: 'Statements',
    branches: 'Branches',
    functions: 'Functions',
    lines: 'Lines',
};

export const formatCoverageSummary = (
    headSummary: Array<CoverageSummary>,
    baseSummary: Array<CoverageSummary> | undefined,
    threshold: number | undefined,
    coverageColumns?: CoverageColumnType[]
): string => {
    // Filter summary rows based on coverageColumns if provided
    const filteredHeadSummary = coverageColumns
        ? headSummary.filter((summary) =>
              coverageColumns.some(
                  (col) =>
                      COLUMN_TO_TITLE[col].toLowerCase() ===
                      summary.title.toLowerCase()
              )
          )
        : headSummary;

    const filteredBaseSummary = coverageColumns && baseSummary
        ? baseSummary.filter((summary) =>
              coverageColumns.some(
                  (col) =>
                      COLUMN_TO_TITLE[col].toLowerCase() ===
                      summary.title.toLowerCase()
              )
          )
        : baseSummary;

    return table(
        [
            [
                withExplanation(i18n('status'), i18n('statusExplanation')),
                i18n('category'),
                i18n('percentage'),
                i18n('ratio'),
            ],
            ...filteredHeadSummary.map((currSummary, index) => [
                getStatusOfPercents(currSummary.percentage, threshold),
                currSummary.title,
                formatPercentage(
                    currSummary.percentage,
                    filteredBaseSummary?.[index]?.percentage
                ),
                `${currSummary.covered}/${currSummary.total}`,
            ]),
        ],
        {
            align: ['c', 'l', 'l', 'c'],
            stringLength: () => 1,
            alignDelimiters: false,
        }
    );
};
