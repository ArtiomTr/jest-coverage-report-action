export default {
    process(src) {
        return {
            code: 'module.exports = `' + src + '`;',
        };
    },
};
