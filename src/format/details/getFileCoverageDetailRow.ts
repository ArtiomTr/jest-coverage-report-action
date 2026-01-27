import { shrinkLongPath } from './shrinkLongPath';
import { CoverageDetail } from '../../typings/Coverage';
import { formatPercentage } from '../../utils/formatPercentage';
import { DeltaFormatOptions } from '../../utils/formatPercentageDelta';
import { getStatusOfPercents } from '../../utils/getStatusOfPercents';

export const getFileCoverageDetailRow = (
    filename: string,
    headDetail: CoverageDetail,
    baseDetail?: CoverageDetail,
    threshold?: number,
    deltaOptions?: DeltaFormatOptions
): Array<string> => [
    getStatusOfPercents(headDetail.lines, threshold),
    shrinkLongPath(filename),
    formatPercentage(headDetail.statements, baseDetail?.statements, deltaOptions),
    formatPercentage(headDetail.branches, baseDetail?.branches, deltaOptions),
    formatPercentage(headDetail.functions, baseDetail?.functions, deltaOptions),
    formatPercentage(headDetail.lines, baseDetail?.lines, deltaOptions),
];
