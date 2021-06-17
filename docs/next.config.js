const withImages = require('next-images');

module.exports = withImages({
    webpack5: true,
    fileExtensions: ['jpg', 'jpeg', 'png'],
    esModule: true,
    webpack(config) {
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
