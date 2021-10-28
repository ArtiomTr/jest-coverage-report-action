import { formatCoverageDetails } from './details/formatCoverageDetails';
import { formatCoverageSummary } from './summary/formatCoverageSummary';
import { Icons } from './Icons';
import { CoverageDetailsMap, CoverageSummary } from '../typings/Coverage';

export const getFormattedCoverage = (
    icons: Icons,
    headSummary: Array<CoverageSummary>,
    baseSummary: Array<CoverageSummary>,
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap,
    threshold: number | undefined
): string =>
    [
        formatCoverageSummary(icons, headSummary, baseSummary, threshold),
        formatCoverageDetails(icons, headDetails, baseDetails, threshold),
    ]
        .filter(Boolean)
        .join('\n');
