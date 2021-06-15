import markdownTable from 'markdown-table';

import { getFileCoverageDetailRow } from './getFileCoverageDetailRow';
import { CoverageDetailsMap } from '../../typings/Coverage';
import { Icons } from '../Icons';
import { details } from '../strings.json';
import { createMarkdownSpoiler } from '../utils/createMarkdownSpoiler';
import { formatTable } from '../utils/formatTable';

export type DetailsFormatOptions = {
    summary: string;
    heading: string;
};

export const formatCoverageDetailsPart = (
    icons: Icons,
    formatOptions: DetailsFormatOptions,
    headDetails: CoverageDetailsMap,
    baseDetails?: CoverageDetailsMap,
    threshold?: number
): string | undefined => {
    const { summary, heading } = formatOptions;

    const tableContent = Object.keys(headDetails).map((filename) =>
        getFileCoverageDetailRow(
            icons,
            filename,
            headDetails[filename],
            baseDetails?.[filename],
            threshold
        )
    );

    if (tableContent.length > 0) {
        return createMarkdownSpoiler({
            body: formatTable(
                markdownTable([details.columnHeaders, ...tableContent], {
                    align: details.columnAlignment,
                })
            ),
            summary,
        });
    }

    return undefined;
};
