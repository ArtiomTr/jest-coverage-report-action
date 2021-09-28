import { parseDetails } from '../format/details/parseDetails';
import { CoverageThreshold } from '../typings/Coverage';
import { JsonReport } from '../typings/JsonReport';
import { getThresholdMap } from '../utils/getThresholdMap';

export const checkCoverage = (
    report: JsonReport,
    threshold: CoverageThreshold
) => {
    const details = parseDetails(report);

    const thresholds = getThresholdMap(Object.keys(details), threshold);

    const detailsArr = Object.entries(details);

    for (const [filename, detail] of detailsArr) {
        const detailThreshold = thresholds[filename];
    }
};
