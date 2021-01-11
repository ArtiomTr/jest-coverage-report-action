import { formatCoverageDetailsPart } from './formatCoverageDetailsPart';
import { ParsedCoverageDetails } from '../../parseCoverageDetails';
import { getDecreasedCoverage } from '../getters/getDecreasedCoverage';
import { getNewFilesCoverage } from '../getters/getNewFilesCoverage';
import { details } from '../strings.json';

export const formatCoverageDetails = (
    headDetails: ParsedCoverageDetails,
    baseDetails: ParsedCoverageDetails
): string => {
    const decreasedCoverage = getDecreasedCoverage(headDetails, baseDetails);

    return [
        formatCoverageDetailsPart(
            details.newFiles,
            getNewFilesCoverage(headDetails, baseDetails)
        ),
        formatCoverageDetailsPart(
            details.decreasedCoverageFiles,
            decreasedCoverage.headDetails,
            decreasedCoverage.baseDetails
        ),
    ].join('\n');
};
