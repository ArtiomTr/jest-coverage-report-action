import { FileCoverageDetail } from '../../parseCoverageDetails';
import { formatPercentage } from '../utils/formatPercentage';

export const getFileCoverageDetailRow = (
    filename: string,
    headDetail: FileCoverageDetail,
    baseDetail?: FileCoverageDetail
): Array<string> => [
    filename,
    formatPercentage(headDetail.statements, baseDetail?.statements),
    formatPercentage(headDetail.branches, baseDetail?.branches),
    formatPercentage(headDetail.functions, baseDetail?.functions),
    formatPercentage(headDetail.lines, baseDetail?.lines),
];
