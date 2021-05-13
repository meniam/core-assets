module.exports = function(options) {
    options.test = /\.css$/i;
    options.parallel = true;
    options.minimizerOptions = {
        preset: [
            'default',
            {
                // @see https://cssnano.co/docs/optimisations/
                colormin: true,
                discardComments: { removeAll: true },
            },
        ]
    };
};