/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
build({
    bundle: true,
    minify: true,
    platform: 'node',
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    external: ['jest-config'],
    loader: {
        '.md': 'text',
    },
}).catch(() => process.exit(1));
