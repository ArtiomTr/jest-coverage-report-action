import { Config } from '@jest/types';
import { match } from 'micromatch';

import { CoverageThreshold } from '../typings/Coverage';

export const getThresholdMap = (
    filenames: string[],
    threshold: CoverageThreshold | undefined
) => {
    const thresholdMap: Record<string, Config.CoverageThresholdValue> = {};

    Object.entries(threshold ?? {})
        .sort(([patternA], [patternB]) => {
            if (patternA === 'global') {
                return -1;
            }

            if (patternB === 'global') {
                return 1;
            }

            return 0;
        })
        .forEach(([pattern, thresholdValue]) => {
            const tmpFilenames =
                pattern === 'global' ? filenames : match(filenames, pattern);

            tmpFilenames.forEach((filename) => {
                thresholdMap[filename] = thresholdValue;
            });
        });

    return thresholdMap;
};
