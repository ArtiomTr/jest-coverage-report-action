const path = require('path');

module.exports = (env, args) => ({
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
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        target: 'es5',
                        incremental: true, // this could also be in tsconfig.json directly
                    },
                    transpileOnly: true,
                    experimentalWatchApi: true, // this enables .tsbuildinfo in the loader
                },
            },
            {
                test: /\.md$/,
                loader: 'raw-loader',
            },
        ],
    },
});
