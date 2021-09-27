import { getSummary } from './getSummary';
import { JsonReport } from '../../typings/JsonReport';
import { i18n } from '../../utils/i18n';
import {
    coveredBranchesCounter,
    coveredLinesCounter,
    standardCoveredCounter,
    standardTotalCounter,
    totalBranchesCounter,
    totalLinesCounter,
} from '../counters';

export const parseSummary = (jsonReport: JsonReport) => {
    return [
        getSummary(
            jsonReport.coverageMap,
            standardTotalCounter('s'),
            standardCoveredCounter('s'),
            i18n('statements'),
            'statements'
        ),
        getSummary(
            jsonReport.coverageMap,
            totalBranchesCounter,
            coveredBranchesCounter,
            i18n('branches'),
            'branches'
        ),
        getSummary(
            jsonReport.coverageMap,
            standardTotalCounter('f'),
            standardCoveredCounter('f'),
            i18n('functions'),
            'functions'
        ),
        getSummary(
            jsonReport.coverageMap,
            totalLinesCounter,
            coveredLinesCounter,
            i18n('lines'),
            'lines'
        ),
    ];
};
