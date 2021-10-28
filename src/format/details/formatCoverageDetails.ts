import { formatCoverageDetailsPart } from './formatCoverageDetailsPart';
import { CoverageDetailsMap } from '../../typings/Coverage';
import { getDecreasedCoverage } from '../getters/getDecreasedCoverage';
import { getNewFilesCoverage } from '../getters/getNewFilesCoverage';
import { Icons } from '../Icons';
import { insertArgs } from '../insertArgs';
import { details } from '../strings.json';

export const formatCoverageDetails = (
    icons: Icons,
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap,
    threshold: number | undefined
): string => {
    const decreasedCoverage = getDecreasedCoverage(headDetails, baseDetails);

    return [
        formatCoverageDetailsPart(
            icons,
            {
                ...details.newFiles,
                summary: insertArgs(details.newFiles.summary, {
                    new: icons.new,
                }),
            },
            getNewFilesCoverage(headDetails, baseDetails),
            undefined,
            threshold
        ),
        formatCoverageDetailsPart(
            icons,
            {
                ...details.decreasedCoverageFiles,
                summary: insertArgs(details.decreasedCoverageFiles.summary, {
                    decreaseIcon: icons.decreaseIcon,
                }),
            },
            decreasedCoverage.headDetails,
            decreasedCoverage.baseDetails,
            threshold
        ),
    ].join('\n');
};
