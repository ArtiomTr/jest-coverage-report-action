import { shrinkLongPath } from './shrinkLongPath';
import { CoverageDetail } from '../../typings/Coverage';
import { formatPercentage } from '../../utils/formatPercentage';
import { getStatusOfPercents } from '../../utils/getStatusOfPercents';

export const getFileCoverageDetailRow = (
    filename: string,
    headDetail: CoverageDetail,
    baseDetail?: CoverageDetail,
    threshold?: number
): Array<string> => [
    getStatusOfPercents(headDetail.lines, threshold),
    shrinkLongPath(filename),
    formatPercentage(headDetail.statements, baseDetail?.statements),
    formatPercentage(headDetail.branches, baseDetail?.branches),
    formatPercentage(headDetail.functions, baseDetail?.functions),
    formatPercentage(headDetail.lines, baseDetail?.lines),
];
