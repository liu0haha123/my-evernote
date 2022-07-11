module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    parser: "@babel/eslint-parser",
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        'no-console': 'off',
    }
}
