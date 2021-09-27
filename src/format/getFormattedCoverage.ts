import { formatCoverageDetails } from './details/formatCoverageDetails';
import { formatCoverageSummary } from './summary/formatCoverageSummary';
import {
    CoverageDetailsMap,
    CoverageSummary,
    CoverageThreshold,
} from '../typings/Coverage';

export const getFormattedCoverage = (
    headSummary: Array<CoverageSummary>,
    baseSummary: Array<CoverageSummary> | undefined,
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap | undefined,
    threshold: CoverageThreshold | undefined
): string =>
    [
        formatCoverageSummary(headSummary, baseSummary, threshold),
        formatCoverageDetails(headDetails, baseDetails, threshold),
    ]
        .filter(Boolean)
        .join('\n');
