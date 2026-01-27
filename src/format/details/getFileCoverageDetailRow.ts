import { shrinkLongPath } from './shrinkLongPath';
import { CoverageDetail } from '../../typings/Coverage';
import { formatPercentage } from '../../utils/formatPercentage';
import { getStatusOfPercents } from '../../utils/getStatusOfPercents';

const calculateOverall = (detail: CoverageDetail): number => {
    return (
        (detail.statements + detail.branches + detail.functions + detail.lines) /
        4
    );
};

export const getFileCoverageDetailRow = (
    filename: string,
    headDetail: CoverageDetail,
    baseDetail?: CoverageDetail,
    threshold?: number,
    showOverallColumn: boolean = false
): Array<string> => {
    const row = [
        getStatusOfPercents(headDetail.lines, threshold),
        shrinkLongPath(filename),
        formatPercentage(headDetail.statements, baseDetail?.statements),
        formatPercentage(headDetail.branches, baseDetail?.branches),
        formatPercentage(headDetail.functions, baseDetail?.functions),
        formatPercentage(headDetail.lines, baseDetail?.lines),
    ];

    if (showOverallColumn) {
        const headOverall = calculateOverall(headDetail);
        const baseOverall = baseDetail ? calculateOverall(baseDetail) : undefined;
        row.push(formatPercentage(headOverall, baseOverall));
    }

    return row;
};
