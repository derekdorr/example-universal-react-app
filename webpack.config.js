const path = require('path');

module.exports = {
    target: 'web',
    context: __dirname,
    entry: {
        client: './src/client.js',
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'client.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                enforce: 'post',
            }
        ],
    },
    resolve: {
        modules: [
            'src',
            'node_modules',
        ],
        extensions: ['.js'],
    },
};
