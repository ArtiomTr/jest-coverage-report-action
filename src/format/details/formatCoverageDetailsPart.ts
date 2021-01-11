import markdownTable from 'markdown-table';

import { getFileCoverageDetailRow } from './getFileCoverageDetailRow';
import { ParsedCoverageDetails } from '../../collect/parseCoverageDetails';
import { details } from '../strings.json';
import { hint } from '../strings.json';
import { createMarkdownSpoiler } from '../utils/createMarkdownSpoiler';
import { formatTable } from '../utils/formatTable';

export type DetailsFormatOptions = {
    summary: string;
    heading: string;
};

export const formatCoverageDetailsPart = (
    formatOptions: DetailsFormatOptions,
    headDetails: ParsedCoverageDetails,
    baseDetails?: ParsedCoverageDetails,
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
                markdownTable([details.columnHeaders, ...tableContent], {
                    align: details.columnAlignment,
                }),
                hint
            ),
            summary,
        });
    }

    return undefined;
};
