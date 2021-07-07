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
            {
                heading: i18n('details.newFiles.heading'),
                summary: i18n('details.newFiles.summary'),
            },
            getNewFilesCoverage(headDetails, baseDetails),
            undefined,
            threshold
        ),
        formatCoverageDetailsPart(
            {
                heading: i18n('details.decreasedCoverageFiles.heading'),
                summary: i18n('details.decreasedCoverageFiles.summary'),
            },
            decreasedCoverage.headDetails,
            decreasedCoverage.baseDetails,
            threshold
        ),
    ].join('\n');
};
