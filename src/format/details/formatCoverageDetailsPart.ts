import markdownTable from 'markdown-table';

import { getFileCoverageDetailRow } from './getFileCoverageDetailRow';
import { CoverageDetailsMap } from '../../typings/Coverage';
import { createMarkdownSpoiler } from '../../utils/createMarkdownSpoiler';
import { i18n } from '../../utils/i18n';
import { withExplanation } from '../../utils/withExplanation';

export const formatCoverageDetailsPart = (
    summary: string,
    headDetails: CoverageDetailsMap,
    baseDetails?: CoverageDetailsMap,
    threshold?: number,
    showOverallColumn: boolean = false
): string | undefined => {
    const tableContent = Object.keys(headDetails).map((filename) =>
        getFileCoverageDetailRow(
            filename,
            headDetails[filename],
            baseDetails?.[filename],
            threshold,
            showOverallColumn
        )
    );

    if (tableContent.length > 0) {
        const headers = [
            withExplanation(i18n('status'), i18n('statusExplanation')),
            i18n('filename'),
            i18n('statements'),
            i18n('branches'),
            i18n('functions'),
            i18n('lines'),
        ];

        const aligns: Array<'c' | 'l'> = ['c', 'l', 'l', 'l', 'l', 'l'];

        if (showOverallColumn) {
            headers.push(i18n('overall'));
            aligns.push('l');
        }

        return createMarkdownSpoiler({
            body: markdownTable([headers, ...tableContent], {
                align: aligns,
                stringLength: () => 1,
                alignDelimiters: false,
            }),
            summary,
        });
    }

    return undefined;
};
