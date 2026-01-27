import { shrinkLongPath } from './shrinkLongPath';
import { CoverageDetail } from '../../typings/Coverage';
import { CoverageColumnType } from '../../typings/Options';
import { formatPercentage } from '../../utils/formatPercentage';
import { getStatusOfPercents } from '../../utils/getStatusOfPercents';

const ALL_COLUMNS: CoverageColumnType[] = [
    'statements',
    'branches',
    'functions',
    'lines',
];

export const getFileCoverageDetailRow = (
    filename: string,
    headDetail: CoverageDetail,
    baseDetail?: CoverageDetail,
    threshold?: number,
    coverageColumns: CoverageColumnType[] = ALL_COLUMNS
): Array<string> => {
    const columnValues: Record<CoverageColumnType, string> = {
        statements: formatPercentage(
            headDetail.statements,
            baseDetail?.statements
        ),
        branches: formatPercentage(headDetail.branches, baseDetail?.branches),
        functions: formatPercentage(headDetail.functions, baseDetail?.functions),
        lines: formatPercentage(headDetail.lines, baseDetail?.lines),
    };

    return [
        getStatusOfPercents(headDetail.lines, threshold),
        shrinkLongPath(filename),
        ...coverageColumns.map((col) => columnValues[col]),
    ];
};
