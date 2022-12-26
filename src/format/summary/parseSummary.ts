import { getSummary } from './getSummary.js';
import { JsonReport } from '../../typings/JsonReport.js';
import { i18n } from '../../utils/i18n.js';
import {
    coveredBranchesCounter,
    coveredLinesCounter,
    standardCoveredCounter,
    standardTotalCounter,
    totalBranchesCounter,
    totalLinesCounter,
} from '../counters.js';

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
