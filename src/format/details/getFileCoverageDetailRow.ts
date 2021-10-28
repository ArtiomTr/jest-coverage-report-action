import { CoverageDetail } from '../../typings/Coverage';
import { Icons } from '../Icons';
import { formatPercentage } from '../utils/formatPercentage';
import { getStatusOfPercents } from '../utils/getStatusOfPercents';

export const getFileCoverageDetailRow = (
    icons: Icons,
    filename: string,
    headDetail: CoverageDetail,
    baseDetail?: CoverageDetail,
    threshold?: number
): Array<string> => [
    getStatusOfPercents(icons, headDetail.lines, threshold),
    filename,
    formatPercentage(headDetail.statements, baseDetail?.statements, icons),
    formatPercentage(headDetail.branches, baseDetail?.branches, icons),
    formatPercentage(headDetail.functions, baseDetail?.functions, icons),
    formatPercentage(headDetail.lines, baseDetail?.lines, icons),
];
