const path = require('path');

module.exports = {
    process(src, filename, config, options) {
        return 'module.exports = `' + src + '`;';
    },
};
