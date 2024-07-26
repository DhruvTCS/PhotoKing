module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.worker\.ts$/,
                use: { loader: 'worker-loader' },
            },
            // Other rules
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};
