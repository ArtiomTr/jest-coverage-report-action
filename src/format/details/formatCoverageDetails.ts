import { formatCoverageDetailsPart } from './formatCoverageDetailsPart';
import { CoverageDetailsMap } from '../../typings/Coverage';
import { getDecreasedCoverage } from '../getters/getDecreasedCoverage';
import { getNewFilesCoverage } from '../getters/getNewFilesCoverage';
import { details } from '../strings.json';

export const formatCoverageDetails = (
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap,
    threshold: number | undefined
): string => {
    const decreasedCoverage = getDecreasedCoverage(headDetails, baseDetails);

    return [
        formatCoverageDetailsPart(
            details.newFiles,
            getNewFilesCoverage(headDetails, baseDetails),
            undefined,
            threshold
        ),
        formatCoverageDetailsPart(
            details.decreasedCoverageFiles,
            decreasedCoverage.headDetails,
            decreasedCoverage.baseDetails,
            threshold
        ),
    ].join('\n');
};
