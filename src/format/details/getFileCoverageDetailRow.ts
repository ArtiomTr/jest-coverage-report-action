import { CoverageDetail } from '../../typings/Coverage';
import { formatPercentage } from '../utils/formatPercentage';
import { getStatusOfPercents } from '../utils/getStatusOfPercents';
import { hideLongDirectory } from './hideLongDirectory';

export const getFileCoverageDetailRow = (
    filename: string,
    headDetail: CoverageDetail,
    baseDetail?: CoverageDetail,
    threshold?: number
): Array<string> => [
    getStatusOfPercents(headDetail.lines, threshold),
    hideLongDirectory(filename),
    formatPercentage(headDetail.statements, baseDetail?.statements),
    formatPercentage(headDetail.branches, baseDetail?.branches),
    formatPercentage(headDetail.functions, baseDetail?.functions),
    formatPercentage(headDetail.lines, baseDetail?.lines),
];
