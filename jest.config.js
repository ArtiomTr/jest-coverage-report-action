module.exports = {
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.md$': '<rootDir>/fileTransformer.js',
    },
    testMatch: ['**/*.(test|spec).ts'],
    globals: {
        'ts-jest': {
            babelConfig: true,
        },
    },
    collectCoverageFrom: ['src/**/{!(index.ts),}.ts'],
    coveragePathIgnorePatterns: ['/node_modules/'],
};
