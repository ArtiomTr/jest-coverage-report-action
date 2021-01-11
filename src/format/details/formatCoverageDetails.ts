import { formatCoverageDetailsPart } from './formatCoverageDetailsPart';
import { ParsedCoverageDetails } from '../../collect/parseCoverageDetails';
import { getDecreasedCoverage } from '../getters/getDecreasedCoverage';
import { getNewFilesCoverage } from '../getters/getNewFilesCoverage';
import { details } from '../strings.json';

export const formatCoverageDetails = (
    headDetails: ParsedCoverageDetails,
    baseDetails: ParsedCoverageDetails,
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
