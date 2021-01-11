import {
    parseCoverageDetails,
    ParsedCoverageDetails,
} from './parseCoverageDetails';
import {
    parseCoverageSummary,
    ParsedCoverageSummary,
} from './parseCoverageSummary';

export const parseCoverage = (
    source: string
): [ParsedCoverageSummary, ParsedCoverageDetails] => {
    if (!source.includes('-') || !source.includes('=')) {
        throw new Error(
            'Command output has invalid output. Please, check the documentation (https://github.com/ArtiomTr/jest-coverage-report-action#jest-coverage-report-) for more information.'
        );
    }

    return [parseCoverageSummary(source), parseCoverageDetails(source)];
};
