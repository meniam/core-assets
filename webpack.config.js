const Encore = require('@symfony/webpack-encore');

const path = require('path');

const TerserOptions  = require('./config/webpack/helpers/terser.options');
const CssMinimizerOptions = require('./config/webpack/helpers/css-minimizer.options');

Encore
    .disableSingleRuntimeChunk()
    .setOutputPath('dist/static/')
    .setPublicPath('/')
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enablePostCssLoader((opts) => {opts.postcssOptions = {config: path.join(__dirname, './postcss.config.js')}})
    .configureCssLoader(()=>({url: false}))
    .enableSassLoader(() => {},{resolveUrlLoader: false})
    .enableSassLoader()
    .configureBabel(function (config) {})
    .enableSourceMaps(false)
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
        assets: 'assets/[name][ext]'
    })
    .configureImageRule({enabled: false})
    .configureFontRule({enabled: false})
    .configureTerserPlugin(TerserOptions)
    .configureCssMinimizerPlugin(CssMinimizerOptions)
    .when(true, Encore => Encore.copyFiles([
        {from: './assets/fonts/',  to: 'fonts/[path][name].[ext]'},
    ]))

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

const config = Encore.getWebpackConfig();
config.resolve.alias = require('./config/webpack/helpers/resolve.alias');

module.exports = config;
