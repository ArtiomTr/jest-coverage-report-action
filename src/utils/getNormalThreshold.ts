import isNil from 'lodash/isNil';

import { tryGetJestThreshold } from './tryGetJestThreshold';
import { JestThreshold } from '../typings/JestThreshold';

export const getNormalThreshold = async (
    workingDirectory: string,
    thresholdFromOptions: number | undefined
): Promise<JestThreshold> => {
    const threshold = await tryGetJestThreshold(workingDirectory);

    // Should be removed in further versions
    if (isNil(threshold)) {
        return {
            global: {
                branches: thresholdFromOptions,
                functions: thresholdFromOptions,
                lines: thresholdFromOptions,
                statements: thresholdFromOptions,
            },
        };
    }

    return threshold;
};
