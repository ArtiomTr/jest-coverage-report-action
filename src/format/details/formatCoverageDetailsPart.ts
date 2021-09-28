import markdownTable from 'markdown-table';

import { getFileCoverageDetailRow } from './getFileCoverageDetailRow';
import { CoverageDetailsMap, CoverageThreshold } from '../../typings/Coverage';
import { createMarkdownSpoiler } from '../../utils/createMarkdownSpoiler';
import { getThresholdMap } from '../../utils/getThresholdMap';
import { i18n } from '../../utils/i18n';
import { withExplanation } from '../../utils/withExplanation';

export const formatCoverageDetailsPart = (
    summary: string,
    headDetails: CoverageDetailsMap,
    baseDetails?: CoverageDetailsMap,
    threshold?: CoverageThreshold
): string | undefined => {
    const filenames = Object.keys(headDetails);

    const thresholdMap = getThresholdMap(filenames, threshold);

    const tableContent = filenames.map((filename) =>
        getFileCoverageDetailRow(
            filename,
            headDetails[filename],
            baseDetails?.[filename],
            thresholdMap[filename]
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
