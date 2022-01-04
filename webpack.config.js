const { resolve } = require('path');
const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.m?js$/, exclude: /(node_modules|bower_components)/ }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './')
        },
        fallback: {
            assert: false,
            buffer: false,
            crypto: false,
            fs: false,
            http: false,
            net: false,
            os: false,
            querystring: false,
            path: false,
            stream: false,
            url: false,
            util: false,
            zlib: false,
        }
    }
};
