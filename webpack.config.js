const Encore = require('@symfony/webpack-encore');

const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
    .addRule({
        parser: {
            amd: false,
        },
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
    .addPlugin(
        new CopyWebpackPlugin(
            [
                { from: 'assets/fonts', to: 'fonts' }
            ]
        )
    )
    .addPlugin(new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/i,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    )
    .addPlugin(new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            parallel: true,
            extractComments: false,
            sourceMap: false,
            terserOptions: { output: {comments: false} }
        })
    )

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Shared
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    .addEntry('js/shared/codemirror', './assets/js/_shared/codemirror.js')
    .addEntry('js/shared/fancybox', './assets/js/_shared/fancybox.js')
    .addEntry('js/shared/markdown', './assets/js/_shared/markdown.js')

    .addStyleEntry('css/shared/codemirror', './assets/scss/_shared/codemirror.scss')
    .addStyleEntry('css/shared/markdown', './assets/scss/_shared/markdown.scss')
    .addStyleEntry('css/shared/select2', './assets/scss/_shared/select2.scss')
    .addStyleEntry('css/shared/selectize', './assets/scss/_shared/selectize.scss')
    .addStyleEntry('css/shared/fancybox', './assets/scss/_shared/fancybox.scss')
;

var config = Encore.getWebpackConfig();
config.resolve.alias = {
    '/assets': path.resolve(__dirname, 'assets/'),
    'assets': path.resolve(__dirname, 'assets/'),
    '../webfonts/': path.resolve(__dirname, 'public/static/fonts/'),
};
module.exports = config;