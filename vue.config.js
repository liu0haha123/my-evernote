module.exports = {
    devServer: {
        https: true
    },
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production'
        ? '/my-note-vue/'
        : '/',
};