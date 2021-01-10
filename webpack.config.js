const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: `index.js`,
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ],
    },
};
