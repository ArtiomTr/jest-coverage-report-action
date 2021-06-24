const path = require('path');

const remarkPlugins = [require('remark-slug')];

module.exports = {
    pageExtensions: ['tsx', 'jsx', 'md', 'mdx'],
    webpack(config, { defaultLoaders }) {
        config.module.rules.push({
            test: /.mdx?$/,
            use: [
                defaultLoaders.babel,
                {
                    loader: '@mdx-js/loader',
                    options: {
                        remarkPlugins,
                    },
                },
                path.join(__dirname, './tools/loaders/md-loader'),
            ],
        });

        config.module.rules.push({
            test: /\.(jpe?g|png|webp)$/i,
            use: [
                {
                    loader: 'responsive-loader',
                    options: {
                        adapter: require('responsive-loader/sharp'),
                        sizes: [320, 640, 960, 1200, 1800, 2400],
                        outputPath: 'static',
                        publicPath: '_next/static',
                    },
                },
            ],
        });

        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
