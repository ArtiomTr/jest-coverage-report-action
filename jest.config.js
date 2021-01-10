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
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['text-summary'],
};
