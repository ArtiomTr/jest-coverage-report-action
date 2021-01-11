import { ParsedCoverageDetails } from '../../parseCoverageDetails';

export const getNewFilesCoverage = (
    headDetails: ParsedCoverageDetails,
    baseDetails: ParsedCoverageDetails
): ParsedCoverageDetails =>
    Object.keys(headDetails)
        .filter((filename) => baseDetails[filename] === undefined)
        .reduce<ParsedCoverageDetails>((acc, filename) => {
            acc[filename] = headDetails[filename];
            return acc;
        }, {});
