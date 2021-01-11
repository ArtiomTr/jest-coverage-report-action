import markdownTable from 'markdown-table';

import { getFileCoverageDetailRow } from './getFileCoverageDetailRow';
import { ParsedCoverageDetails } from '../../collect-coverage/parseCoverageDetails';
import { details } from '../strings.json';
import { createMarkdownSpoiler } from '../utils/createMarkdownSpoiler';
import { formatHeadingAndTable } from '../utils/formatHeadingAndTable';

export type DetailsFormatOptions = {
    summary: string;
    heading: string;
};

export const formatCoverageDetailsPart = (
    formatOptions: DetailsFormatOptions,
    headDetails: ParsedCoverageDetails,
    baseDetails?: ParsedCoverageDetails
): string | undefined => {
    const { summary, heading } = formatOptions;

    const tableContent = Object.keys(headDetails).map((filename) =>
        getFileCoverageDetailRow(
            filename,
            headDetails[filename],
            baseDetails?.[filename]
        )
    );

    if (tableContent.length > 0) {
        return createMarkdownSpoiler({
            body: formatHeadingAndTable(
                heading,
                markdownTable([details.columnHeaders, ...tableContent])
            ),
            summary,
        });
    }

    return undefined;
};
