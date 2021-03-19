const path = require('path');

module.exports = (env, args) => ({
    entry: './src/index.ts',
    output: {
        filename: `index.js`,
        path: path.resolve(
            __dirname,
            args.mode === 'production' ? 'dist' : 'build'
        ),
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
});
