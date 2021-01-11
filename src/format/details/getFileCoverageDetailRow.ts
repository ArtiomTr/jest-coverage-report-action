import { FileCoverageDetail } from '../../collect/parseCoverageDetails';
import { formatPercentage } from '../utils/formatPercentage';
import { getStatusOfPercents } from '../utils/getStatusOfPercents';

export const getFileCoverageDetailRow = (
    filename: string,
    headDetail: FileCoverageDetail,
    baseDetail?: FileCoverageDetail,
    threshold?: number
): Array<string> => [
    getStatusOfPercents(headDetail.lines, threshold),
    filename,
    formatPercentage(headDetail.statements, baseDetail?.statements),
    formatPercentage(headDetail.branches, baseDetail?.branches),
    formatPercentage(headDetail.functions, baseDetail?.functions),
    formatPercentage(headDetail.lines, baseDetail?.lines),
];
