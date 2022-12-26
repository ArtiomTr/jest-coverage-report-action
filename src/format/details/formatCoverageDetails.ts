import { formatCoverageDetailsPart } from './formatCoverageDetailsPart.js';
import { getDecreasedCoverage } from './getDecreasedCoverage.js';
import { getNewFilesCoverage } from './getNewFilesCoverage.js';
import { CoverageDetailsMap } from '../../typings/Coverage.js';
import { i18n } from '../../utils/i18n.js';

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
