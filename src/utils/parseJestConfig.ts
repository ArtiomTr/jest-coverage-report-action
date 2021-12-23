import { resolve } from 'path';

import { parseConfigurations, PossibleConfiguration } from 'cfgn';

// These constants are taken from "jest-config" module, file "constants.js"
const JEST_CONFIG_BASE_NAME = 'jest.config';
const JEST_CONFIG_EXT_ORDER = Object.freeze([
    '.js',
    '.ts',
    '.mjs',
    '.cjs',
    '.json',
]);

export const parseJestConfig = (workingDirectory: string): Promise<unknown> => {
    const possibleJestConfigs: PossibleConfiguration[] = JEST_CONFIG_EXT_ORDER.map(
        (extension) => ({
            path: resolve(
                workingDirectory,
                JEST_CONFIG_BASE_NAME.concat(extension)
            ),
        })
    );

    return parseConfigurations(possibleJestConfigs);
};
