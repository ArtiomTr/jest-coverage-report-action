import { CoverageDetail, CoverageDetailsMap } from '../../typings/Coverage';

const coverageGreaterThan = (first: CoverageDetail, second: CoverageDetail) =>
    first.statements > second.statements ||
    first.branches > second.branches ||
    first.functions > second.functions;

export const getIncreasedCoverage = (
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap | undefined
) =>
    Object.keys(headDetails)
        .filter(
            (filename) =>
                headDetails[filename] &&
                baseDetails?.[filename] &&
                coverageGreaterThan(headDetails[filename], baseDetails[filename])
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
