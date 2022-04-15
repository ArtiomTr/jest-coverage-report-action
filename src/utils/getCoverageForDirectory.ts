import micromatch from 'micromatch';

import { accumulateCoverageDetails } from './accumulateCoverageDetails';
import { DetailedFileCoverage, FileCoverageMap } from './getFileCoverageMap';

export const getCoverageForDirectory = (
    directory: string,
    details: FileCoverageMap
): DetailedFileCoverage => {
    const children = micromatch(Object.keys(details), `${directory}/**`);

    return accumulateCoverageDetails(children.map((child) => details[child]));
};
