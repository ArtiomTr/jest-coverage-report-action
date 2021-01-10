import { MESSAGE_HEADING } from './fetchPreviousComment';
import { ParsedCoverageSummary } from './parseCoverageSummary';
import table from 'markdown-table';
import {
    FileCoverageDetail,
    ParsedCoverageDetails,
} from './parseCoverageDetails';

const map: Record<string, string> = {
    statements: 'Statements',
    branches: 'Branches',
    functions: 'Functions',
    lines: 'Lines',
};

const APPROXIMATION_DELTA = 0.1;

const getFormattedPercentage = (
    headPercentage: number,
    basePercentage: number
) => {
    const delta = headPercentage - basePercentage;

    const symbol =
        delta < -APPROXIMATION_DELTA
            ? '🔻'
            : delta > APPROXIMATION_DELTA
            ? '🔼'
            : '~';

    return `${headPercentage}% (${symbol} ${delta})`;
};

const getSummaryTable = (
    headSummary: ParsedCoverageSummary,
    baseSummary: ParsedCoverageSummary
) =>
    table(
        [
            ['Category', 'Percentage', 'Covered / Total'],
            ...(Object.keys(headSummary) as Array<
                keyof ParsedCoverageSummary
            >).map((value: keyof ParsedCoverageSummary) => [
                map[value],
                getFormattedPercentage(
                    headSummary[value].percentage,
                    baseSummary[value].percentage
                ),
                `${headSummary[value].covered}/${headSummary[value].total}`,
            ]),
        ],
        { align: ['l', 'l', 'c'] }
    );

const getDetailsTable = (content: string[][]) =>
    table([
        ['Filename', 'Statements', 'Branches', 'Functions', 'Lines'],
        ...content,
    ]);

const getNewFilesSpoiler = (
    headDetails: ParsedCoverageDetails,
    baseDetails: ParsedCoverageDetails
) => {
    const tableContent = Object.keys(headDetails)
        .filter((filename) => baseDetails[filename] === undefined)
        .map((filename) => [
            filename,
            `${headDetails[filename].statements}%`,
            `${headDetails[filename].branches}%`,
            `${headDetails[filename].functions}%`,
            `${headDetails[filename].lines}%`,
        ]);

    if (tableContent.length > 0) {
        return `
<details>
    <summary>Show new covered files</summary>

### Coverage of new files

${getDetailsTable(tableContent)}

</details>
`;
    }

    return undefined;
};

const ltCoverage = (first: FileCoverageDetail, second: FileCoverageDetail) =>
    first.statements < second.statements ||
    first.branches < second.branches ||
    first.functions < second.functions ||
    first.lines < second.lines;

const getFilesWithDecreasedCoverage = (
    headDetails: ParsedCoverageDetails,
    baseDetails: ParsedCoverageDetails
) => {
    const tableContent = Object.keys(headDetails)
        .filter(
            (filename) =>
                headDetails[filename] &&
                baseDetails[filename] &&
                ltCoverage(headDetails[filename], baseDetails[filename])
        )
        .map((filename) => [
            filename,
            getFormattedPercentage(
                headDetails[filename].statements,
                baseDetails[filename].statements
            ),
            getFormattedPercentage(
                headDetails[filename].branches,
                baseDetails[filename].branches
            ),
            getFormattedPercentage(
                headDetails[filename].functions,
                baseDetails[filename].functions
            ),
            getFormattedPercentage(
                headDetails[filename].lines,
                baseDetails[filename].lines
            ),
        ]);

    if (tableContent.length > 0) {
        return `
<details>
    <summary>Show files with reduced coverage</summary>

### Reduced coverage

${getDetailsTable(tableContent)}
    
</details>
        `;
    }

    return undefined;
};

export const getCommentBody = (
    headSummary: ParsedCoverageSummary,
    baseSummary: ParsedCoverageSummary,
    headDetails: ParsedCoverageDetails,
    baseDetails: ParsedCoverageDetails
): string => {
    return [
        MESSAGE_HEADING,
        '### Total coverage',
        getSummaryTable(headSummary, baseSummary),
        getFilesWithDecreasedCoverage(headDetails, baseDetails),
        getNewFilesSpoiler(headDetails, baseDetails),
    ]
        .filter(Boolean)
        .join('\n');
};
