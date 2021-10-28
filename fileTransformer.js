module.exports = {
    process(src) {
        return 'module.exports = `' + src + '`;';
    },
};
