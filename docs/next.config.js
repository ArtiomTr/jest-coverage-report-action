const withImages = require('next-images');
const path = require('path');

const remarkPlugins = [require('remark-slug')];

module.exports = withImages({
    webpack5: true,
    fileExtensions: ['jpg', 'jpeg', 'png'],
    pageExtensions: ['tsx', 'jsx', 'md', 'mdx'],
    esModule: true,
    webpack(config, { isServer, defaultLoaders }) {
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
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        });

        return config;
    },
});
