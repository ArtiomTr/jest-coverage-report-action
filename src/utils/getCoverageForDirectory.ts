import micromatch from 'micromatch';

import { accumulateCoverageDetails } from './accumulateCoverageDetails.js';
import { DetailedFileCoverage, FileCoverageMap } from './getFileCoverageMap.js';

export const getCoverageForDirectory = (
    directory: string,
    details: FileCoverageMap
): DetailedFileCoverage => {
    const children = micromatch(Object.keys(details), `${directory}/**`);

    return accumulateCoverageDetails(children.map((child) => details[child]));
};
