
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('NODE_ENV: ', NODE_ENV);

module.exports = {
    entry: {
        main: './src/main.js',
        //inresult: './src/inresult.js',
    },
    output: {
        path: __dirname + '/bundle',
        filename: '[name].js',
    },
    watch: NODE_ENV == 'development',
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel'
        },{
            test: /\.svg$/,
            loader: 'svg-inline'
        },{
            test: /\.json$/,
            loader: 'json'
        },]
    },
    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,
    resolve: {
        extensions: ['', '.js']
    },
    devServer: {
        contentBase: './',
        publicPath: "/bundle/",
    }
};