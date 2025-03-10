const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    optimization: {
        splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: "~",
        enforceSizeThreshold: 50000,
        cacheGroups: {
            defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            },
            default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
            },
        },
        },
    },
});
