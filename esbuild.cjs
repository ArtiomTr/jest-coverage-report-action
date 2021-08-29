/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
build({
    bundle: true,
    minify: false, // Cannot minify due to https://github.com/node-fetch/node-fetch/issues/784
    platform: 'node',
    target: 'es2019',
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    loader: {
        '.md': 'text',
    },
}).catch(() => process.exit(1));
