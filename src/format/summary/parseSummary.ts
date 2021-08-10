import { getSummary } from './getSummary';
import { JsonReport } from '../../typings/JsonReport';
import {
    coveredBranchesCounter,
    coveredLinesCounter,
    standardCoveredCounter,
    standardTotalCounter,
    totalBranchesCounter,
    totalLinesCounter,
} from '../counters';
import { i18n } from '../../utils/i18n';

export const parseSummary = (jsonReport: JsonReport) => {
    return [
        getSummary(
            jsonReport.coverageMap,
            standardTotalCounter('s'),
            standardCoveredCounter('s'),
            i18n('statements')
        ),
        getSummary(
            jsonReport.coverageMap,
            totalBranchesCounter,
            coveredBranchesCounter,
            i18n('branches')
        ),
        getSummary(
            jsonReport.coverageMap,
            standardTotalCounter('f'),
            standardCoveredCounter('f'),
            i18n('functions')
        ),
        getSummary(
            jsonReport.coverageMap,
            totalLinesCounter,
            coveredLinesCounter,
            i18n('lines')
        ),
    ];
};
