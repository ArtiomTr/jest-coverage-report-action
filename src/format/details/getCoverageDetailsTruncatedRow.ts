import { i18n } from '../../utils/i18n';

export const getCoverageDetailsTruncatedRow = (
    rowCount: number
): Array<string> => {
    return [
        '',
        i18n('detailsTruncatedRows', { truncatedRows: rowCount }),
        '',
        '',
        '',
        '',
    ];
};
