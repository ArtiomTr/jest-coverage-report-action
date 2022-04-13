/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
build({
    bundle: true,
    minify: true,
    sourcemap: 'external',
    platform: 'node',
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    target: 'node10',
    loader: {
        '.md': 'text',
    },
}).catch(() => process.exit(1));
