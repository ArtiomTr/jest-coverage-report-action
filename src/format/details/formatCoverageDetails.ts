import { formatCoverageDetailsPart } from './formatCoverageDetailsPart';
import { getDecreasedCoverage } from './getDecreasedCoverage';
import { getNewFilesCoverage } from './getNewFilesCoverage';
import { CoverageDetailsMap } from '../../typings/Coverage';
import { i18n } from '../../utils/i18n';

export const formatCoverageDetails = (
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap | undefined,
    threshold: number | undefined
): string => {
    const decreasedCoverage = getDecreasedCoverage(headDetails, baseDetails);

    return [
        formatCoverageDetailsPart(
            i18n('newFilesCoverage'),
            getNewFilesCoverage(headDetails, baseDetails),
            undefined,
            threshold
        ),
        formatCoverageDetailsPart(
            i18n('decreasedCoverageFiles'),
            decreasedCoverage.headDetails,
            decreasedCoverage.baseDetails,
            threshold
        ),
    ].join('\n');
};
