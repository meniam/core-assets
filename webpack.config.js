const Encore = require('@symfony/webpack-encore');

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const FontAwesomeMinifyPlugin = require("font-awesome-minify-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
    templates: path.join(__dirname, 'templates'),
    frontend: path.join(__dirname, 'templates/frontend'),
    backend: path.join(__dirname, 'templates/backend'),
    form: path.join(__dirname, 'templates/shared/form')
};

function collectWhitelist() {
    // do something to collect the whitelist
    return ['page'];
}
function collectWhitelistPatterns() {
    // do something to collect the whitelist
    return [/^(page|dropdown)/];
}

function collectWhitelistPatternsChildren() {
    // do something to collect the whitelist
    return [/^(page|dropdown|input-|autocomplete|modal|super|button|d-|col-|form-)/];
}

Encore
    .configureRuntimeEnvironment('dev')
    .disableSingleRuntimeChunk()
    .setOutputPath('dist/static/')
    .setPublicPath('/static/')
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(false) //!Encore.isProduction()
    .enableVersioning(false)
    .autoProvideVariables({
        '$': 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
        Popper: 'popper.js'
    })
    .configureFilenames({
        js: '[name].js',
        css: '[name].css',
        images: 'img/[name].[ext]',
        fonts: 'fonts/[name].[ext]'
    })
    .enableSassLoader(function(sassOptions) {}, {
        resolveUrlLoader: false
    })
    // .addPlugin(
    //     new CopyWebpackPlugin(
    //         [
    //             { from: 'assets/img', to: 'img' },
    //             { from: 'assets/fonts', to: 'fonts' },
    //             { from: 'node_modules/@fortawesome/fontawesome-pro/webfonts', to: 'fonts' },
    //         ]
    //     )
    // )
    .addPlugin(new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/i,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    )

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Shared
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    .addEntry('js/shared/codemirror', './assets/js/_shared/codemirror.js')
    .addStyleEntry('css/shared/codemirror', './assets/scss/_shared/codemirror.scss')

    .addEntry('js/shared/markdown', './assets/js/_shared/markdown.js')
    .addStyleEntry('css/shared/markdown', './assets/scss/_shared/markdown.scss')


    .addPlugin(new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            parallel: true,
            extractComments: false,
            sourceMap: false,
            terserOptions: { output: {comments: false} }
        })
    )
;

var config = Encore.getWebpackConfig();
config.resolve.alias = {
    '/assets': path.resolve(__dirname, 'assets/'),
    'assets': path.resolve(__dirname, 'assets/'),
    '../webfonts/': path.resolve(__dirname, 'public/static/fonts/'),
};
module.exports = config;