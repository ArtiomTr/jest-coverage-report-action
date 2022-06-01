import markdownTable from 'markdown-table';

import { getCoverageDetailsTruncatedRow } from './getCoverageDetailsTruncatedRow';
import { getFileCoverageDetailRow } from './getFileCoverageDetailRow';
import { CoverageDetailsMap } from '../../typings/Coverage';
import { createMarkdownSpoiler } from '../../utils/createMarkdownSpoiler';
import { i18n } from '../../utils/i18n';
import { withExplanation } from '../../utils/withExplanation';

const MAX_ROWS = 50;

export const formatCoverageDetailsPart = (
    summary: string,
    headDetails: CoverageDetailsMap,
    baseDetails?: CoverageDetailsMap,
    threshold?: number,
    truncateDetails?: boolean
): string | undefined => {
    const maxRows = truncateDetails ? MAX_ROWS - 1 : undefined;
    const headDetailsKeys = Object.keys(headDetails);
    const tableContent = headDetailsKeys
        .slice(0, maxRows)
        .map((filename) =>
            getFileCoverageDetailRow(
                filename,
                headDetails[filename],
                baseDetails?.[filename],
                threshold
            )
        );

    if (tableContent.length > 0) {
        return createMarkdownSpoiler({
            body: markdownTable(
                [
                    [
                        withExplanation(
                            i18n('status'),
                            i18n('statusExplanation')
                        ),
                        i18n('filename'),
                        i18n('statements'),
                        i18n('branches'),
                        i18n('functions'),
                        i18n('lines'),
                    ],
                    ...tableContent,
                    ...(truncateDetails && headDetailsKeys.length > MAX_ROWS
                        ? [
                              getCoverageDetailsTruncatedRow(
                                  headDetailsKeys.length - MAX_ROWS
                              ),
                          ]
                        : []),
                ],
                {
                    align: ['c', 'l', 'l', 'l', 'l', 'l'],
                }
            ),
            summary,
        });
    }

    return undefined;
};
