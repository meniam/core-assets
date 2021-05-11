const Encore = require('@symfony/webpack-encore');

const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

Encore
    .configureRuntimeEnvironment('development')
    .disableSingleRuntimeChunk()
    .setOutputPath('dist/static/')
    .setPublicPath('/static/')
    .cleanupOutputBeforeBuild()
    .configureFriendlyErrorsPlugin()
    .enableBuildNotifications()
    .enableSourceMaps(false) //!Encore.isProduction()
    .enableVersioning(false)
    .enablePostCssLoader((options) => {
        options.postcssOptions = {
            config: path.join(__dirname, './postcss.config.js')
        };
    })
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
        assets: 'assets/[name].[ext]'
    })
    .configureImageRule({
        type: "assets"
    })
    .configureFontRule({
        type: "assets"
    })
    .copyFiles([
        {
            from: './assets/fonts/',
            to: './fonts/[path][name].[ext]'
        }
    ])
    .enableSassLoader(function (sassOptions) {
    }, {
        resolveUrlLoader: false
    })
    .addPlugin(new CssMinimizerPlugin({
            test: /\.css$/i,
            parallel: true,
            minimizerOptions: {
                preset: [
                    'default',
                    {
                        // @see https://cssnano.co/docs/optimisations/
                        svgo: true,
                        zindex: true,
                        colormin: true,
                        discardComments: { removeAll: true },
                    },
                ]
            },
        })
    )
    .addPlugin(new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            parallel: true,
            extractComments: false,
            terserOptions: {output: {comments: false}}
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