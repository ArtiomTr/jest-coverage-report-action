import { shrinkLongPath } from './shrinkLongPath.js';
import { CoverageDetail } from '../../typings/Coverage.js';
import { formatPercentage } from '../../utils/formatPercentage.js';
import { getStatusOfPercents } from '../../utils/getStatusOfPercents.js';

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
