module.exports = function (options) {
    options.test = /\.js(\?.*)?$/i;
    options.exclude =/(jquery|bootstrap)/;
    options.parallel = true;
    options.extractComments = false;
    options.terserOptions = {
        output: {
            comments: false
        }
    }
};