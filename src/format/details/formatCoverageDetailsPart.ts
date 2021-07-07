import markdownTable from 'markdown-table';

import { getFileCoverageDetailRow } from './getFileCoverageDetailRow';
import { CoverageDetailsMap } from '../../typings/Coverage';
import { i18n } from '../../utils/i18n';
import { createMarkdownSpoiler } from '../utils/createMarkdownSpoiler';
import { formatTable } from '../utils/formatTable';

export type DetailsFormatOptions = {
    summary: string;
    heading: string;
};

export const formatCoverageDetailsPart = (
    formatOptions: DetailsFormatOptions,
    headDetails: CoverageDetailsMap,
    baseDetails?: CoverageDetailsMap,
    threshold?: number
): string | undefined => {
    const { summary, heading } = formatOptions;

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
            body: formatTable(
                heading,
                markdownTable(
                    [
                        [
                            i18n('status'),
                            i18n('filename'),
                            i18n('statements'),
                            i18n('branches'),
                            i18n('function'),
                            i18n('lines'),
                        ],
                        ...tableContent,
                    ],
                    {
                        align: ['c', 'l', 'l', 'l', 'l', 'l'],
                    }
                ),
                i18n('hint')
            ),
            summary,
        });
    }

    return undefined;
};
