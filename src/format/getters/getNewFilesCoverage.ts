import { CoverageDetailsMap } from '../../typings/Coverage';

export const getNewFilesCoverage = (
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap
): CoverageDetailsMap =>
    Object.keys(headDetails)
        .filter((filename) => baseDetails[filename] === undefined)
        .reduce<CoverageDetailsMap>((acc, filename) => {
            acc[filename] = headDetails[filename];
            return acc;
        }, {});
