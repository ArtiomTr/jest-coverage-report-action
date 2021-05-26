module.exports = {
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/*.(test|spec).ts'],
    globals: {
        'ts-jest': {
            babelConfig: true,
        },
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageReporters: [],
};
