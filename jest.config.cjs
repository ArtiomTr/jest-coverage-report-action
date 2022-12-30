const path = require('path');

const jestConfig = {
    transform: {
        '\\.[t]sx?$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
        '.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'cjs',
        'mjs',
        'json',
        'node',
    ],
    collectCoverageFrom: ['<rootDir>/src/**/!(index).{ts,tsx,js,jsx,cjs,mjs}'],
    testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx,cjs,mjs}'],
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    transformIgnorePatterns: [],
    moduleNameMapper: {
        '^(.+)\\.js$': '$1',
    },
};

module.exports = jestConfig;
