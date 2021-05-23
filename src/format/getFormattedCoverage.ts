import { formatCoverageDetails } from './details/formatCoverageDetails';
import { formatCoverageSummary } from './summary/formatCoverageSummary';
import { CoverageDetailsMap, CoverageSummary } from '../typings/Coverage';

export const getFormattedCoverage = (
    headSummary: Array<CoverageSummary>,
    baseSummary: Array<CoverageSummary>,
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap,
    threshold: number | undefined
): string =>
    [
        formatCoverageSummary(headSummary, baseSummary, threshold),
        formatCoverageDetails(headDetails, baseDetails, threshold),
    ]
        .filter(Boolean)
        .join('\n');
