import {
    FileCoverageDetail,
    ParsedCoverageDetails,
} from '../../collect-coverage/parseCoverageDetails';

const coverageLessThan = (
    first: FileCoverageDetail,
    second: FileCoverageDetail
) =>
    first.statements < second.statements ||
    first.branches < second.branches ||
    first.functions < second.functions ||
    first.lines < second.lines;

export const getDecreasedCoverage = (
    headDetails: ParsedCoverageDetails,
    baseDetails: ParsedCoverageDetails
) =>
    Object.keys(headDetails)
        .filter(
            (filename) =>
                headDetails[filename] &&
                baseDetails[filename] &&
                coverageLessThan(headDetails[filename], baseDetails[filename])
        )
        .reduce<{
            headDetails: ParsedCoverageDetails;
            baseDetails: ParsedCoverageDetails;
        }>(
            (acc, filename) => {
                acc.headDetails[filename] = headDetails[filename];
                acc.baseDetails[filename] = baseDetails[filename];
                return acc;
            },
            { headDetails: {}, baseDetails: {} }
        );
