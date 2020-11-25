const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const mincss = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        bootstrap: ['./libs/bootstrap-4.5.3/scss/bootstrap.scss', './libs/bootstrap-4.5.3/scss/bootstrap-grid.scss', './libs/bootstrap-4.5.3/scss/bootstrap-reboot.scss'],
        bootstrap_bundle_js: './libs/bootstrap-4.5.3/dist/js/bootstrap.js',
        app: './assets/js/app.js',
        dashboard: './assets/css/dashboard.css'
    },
    module: {
        rules: [
            // Ex 1 - Compilar SASS de la carpeta bootstrap
            {
                test: /\.scss$/,
                use: [
                    mincss.loader,
                    'css-loader',
                    'sass-loader'
                ],
                exclude: '/node_modules/'
            },
            // Ex 2 - Cargar y minimizar el css, para minimizarlo usaremos la opción de optimitzation, que está definida más abajo
            {
                test: /\.css$/,
                use: [
                    mincss.loader,
                    'css-loader'
                ],
                exclude: '/node_modules/'
            }
        ]
    },
    // Ex 2 - Minimizar css
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
        ],
      },
    plugins: [
        new mincss({
            filename: "[name].min.css",
            chunkFilename: '[id].css'
        }),
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html"
        }),
    ],
    // Exportamos al resultado
    output: {
        filename: '[name]_examen.js',
        path: path.resolve(__dirname, './dist/')
    }
}