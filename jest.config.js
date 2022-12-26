export default {
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': ['ts-jest', {
            useESM: true
        }],
        '^.+\\.md$': '<rootDir>/fileTransformer.js',
    },
    testMatch: ['**/*.(test|spec).ts'],
    moduleNameMapper: {
        '^(.+)\\.js$': '$1'
    },
    collectCoverageFrom: ['src/**/{!(index.ts),}.ts'],
    coveragePathIgnorePatterns: ['/node_modules/'],
};
