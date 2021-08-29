/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
build({
    bundle: true,
    minify: false,
    platform: 'node',
    target: 'es2019',
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    loader: {
        '.md': 'text',
    },
}).catch(() => process.exit(1));
