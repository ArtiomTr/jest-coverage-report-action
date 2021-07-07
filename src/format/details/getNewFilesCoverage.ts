import { CoverageDetailsMap } from '../../typings/Coverage';

export const getNewFilesCoverage = (
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap | undefined
): CoverageDetailsMap =>
    baseDetails
        ? Object.keys(headDetails)
              .filter((filename) => baseDetails[filename] === undefined)
              .reduce<CoverageDetailsMap>((acc, filename) => {
                  acc[filename] = headDetails[filename];
                  return acc;
              }, {})
        : {};
