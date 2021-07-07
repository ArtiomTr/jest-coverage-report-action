import { CoverageDetail, CoverageDetailsMap } from '../../typings/Coverage';

const coverageLessThan = (first: CoverageDetail, second: CoverageDetail) =>
    first.statements < second.statements ||
    first.branches < second.branches ||
    first.functions < second.functions;

export const getDecreasedCoverage = (
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap | undefined
) =>
    Object.keys(headDetails)
        .filter(
            (filename) =>
                headDetails[filename] &&
                baseDetails?.[filename] &&
                coverageLessThan(headDetails[filename], baseDetails[filename])
        )
        .reduce<{
            headDetails: CoverageDetailsMap;
            baseDetails: CoverageDetailsMap;
        }>(
            (acc, filename) => {
                acc.headDetails[filename] = headDetails[filename];
                acc.baseDetails[filename] = baseDetails![filename];
                return acc;
            },
            { headDetails: {}, baseDetails: {} }
        );
