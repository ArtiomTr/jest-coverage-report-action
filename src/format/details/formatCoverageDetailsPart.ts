import markdownTable from 'markdown-table';

import { getFileCoverageDetailRow } from './getFileCoverageDetailRow';
import { CoverageDetailsMap } from '../../typings/Coverage';
import { CoverageColumnType } from '../../typings/Options';
import { createMarkdownSpoiler } from '../../utils/createMarkdownSpoiler';
import { i18n } from '../../utils/i18n';
import { withExplanation } from '../../utils/withExplanation';

const ALL_COLUMNS: CoverageColumnType[] = [
    'statements',
    'branches',
    'functions',
    'lines',
];

const COLUMN_HEADERS: Record<CoverageColumnType, string> = {
    statements: 'statements',
    branches: 'branches',
    functions: 'functions',
    lines: 'lines',
};

export const formatCoverageDetailsPart = (
    summary: string,
    headDetails: CoverageDetailsMap,
    baseDetails?: CoverageDetailsMap,
    threshold?: number,
    coverageColumns: CoverageColumnType[] = ALL_COLUMNS
): string | undefined => {
    const tableContent = Object.keys(headDetails).map((filename) =>
        getFileCoverageDetailRow(
            filename,
            headDetails[filename],
            baseDetails?.[filename],
            threshold,
            coverageColumns
        )
    );

    if (tableContent.length > 0) {
        const columnHeaders = coverageColumns.map((col) =>
            i18n(COLUMN_HEADERS[col])
        );
        const columnAligns = coverageColumns.map(() => 'l' as const);

        return createMarkdownSpoiler({
            body: markdownTable(
                [
                    [
                        withExplanation(
                            i18n('status'),
                            i18n('statusExplanation')
                        ),
                        i18n('filename'),
                        ...columnHeaders,
                    ],
                    ...tableContent,
                ],
                {
                    align: ['c', 'l', ...columnAligns],
                    stringLength: () => 1,
                    alignDelimiters: false,
                }
            ),
            summary,
        });
    }

    return undefined;
};
