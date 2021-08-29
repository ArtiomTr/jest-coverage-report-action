/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
build({
    bundle: true,
    target: 'es5',
    minify: true,
    platform: 'node',
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    loader: {
        '.md': 'text',
    },
}).catch(() => process.exit(1));
