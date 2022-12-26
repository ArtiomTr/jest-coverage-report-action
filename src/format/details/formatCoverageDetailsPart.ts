import markdownTable from 'markdown-table';

import { getFileCoverageDetailRow } from './getFileCoverageDetailRow.js';
import { CoverageDetailsMap } from '../../typings/Coverage.js';
import { createMarkdownSpoiler } from '../../utils/createMarkdownSpoiler.js';
import { i18n } from '../../utils/i18n.js';
import { withExplanation } from '../../utils/withExplanation.js';

export const formatCoverageDetailsPart = (
    summary: string,
    headDetails: CoverageDetailsMap,
    baseDetails?: CoverageDetailsMap,
    threshold?: number
): string | undefined => {
    const tableContent = Object.keys(headDetails).map((filename) =>
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
