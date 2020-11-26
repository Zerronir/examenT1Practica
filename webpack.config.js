const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const mincss = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const minjs = require("terser-webpack-plugin");

module.exports = {
    entry: {
        // Ex 4 - Unificar todos los CSS en uno solo
        styles: ['./libs/bootstrap-4.5.3/scss/bootstrap.scss', './libs/bootstrap-4.5.3/scss/bootstrap-grid.scss', './libs/bootstrap-4.5.3/scss/bootstrap-reboot.scss', './assets/css/dashboard.css'],
        // Ex 5 - Unificar todos los JS en uno solo
        app: ['./assets/js/app.js', './libs/bootstrap-4.5.3/dist/js/bootstrap.bundle.min.js'],
    },
    module: {
        rules: [
            // Ex 1 - Compilar SASS de la carpeta bootstrap
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
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
            },
            // Ex6 - Ejecutar Babel ES5
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
                exclude: '/node_modules/'
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          // Ex 2 - Minimizar css
          new CssMinimizerPlugin(),
          // Ex-3 -> Minimizar js
          new minjs({test: /\.js(\?.*)?$/i, exclude: '/node_modules/'})
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
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
    ],
    // Exportamos al resultado
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, './dist/'),
    },
    externals:{
        jquery: 'jQuery'
    }
}