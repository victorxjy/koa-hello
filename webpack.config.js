const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    cache: {
        type: 'memory'
    },
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            { test: /\.m?js$/, exclude: /(node_modules|bower_components)/ }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
};
