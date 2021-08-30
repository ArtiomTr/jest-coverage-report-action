/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
build({
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'es2019',
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    keepNames: true,
    loader: {
        '.md': 'text',
    },
}).catch(() => process.exit(1));
