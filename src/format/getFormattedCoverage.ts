import { formatCoverageDetails } from './details/formatCoverageDetails';
import { formatCoverageSummary } from './summary/formatCoverageSummary';
import { CoverageDetailsMap, CoverageSummary } from '../typings/Coverage';
import { CoverageColumnType } from '../typings/Options';
import { i18n } from '../utils/i18n';

export const getFormattedCoverage = (
    headSummary: Array<CoverageSummary>,
    baseSummary: Array<CoverageSummary> | undefined,
    headDetails: CoverageDetailsMap,
    baseDetails: CoverageDetailsMap | undefined,
    threshold: number | undefined,
    hideDetails: boolean | undefined,
    coverageColumns?: CoverageColumnType[]
): string =>
    [
        formatCoverageSummary(headSummary, baseSummary, threshold, coverageColumns),
        !hideDetails
            ? formatCoverageDetails(headDetails, baseDetails, threshold, coverageColumns)
            : `> ${i18n('detailsHidden')}`,
    ]
        .filter(Boolean)
        .join('\n');
