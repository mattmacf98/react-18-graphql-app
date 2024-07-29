const nodeExternals = require("webpack-node-externals");
const path = require("path");
const { ProvidePlugin } = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');

const rules = [{
    test: /\.(tsx|ts)$/,
    use: 'ts-loader',
    exclude: /node_modules/
}];

const client = {
    mode: "production",
    entry: {
        bundle: "./src/client/client.tsx"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, './dist/public'),
        filename: '[name].js',
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          buffer: require.resolve('buffer/'),
          stream: require.resolve('stream-browserify'),
          vm: require.resolve("vm-browserify"),
          os: require.resolve("os-browserify/browser"),
          path: require.resolve("path-browserify")
        }
    },
    plugins: [
        new ProvidePlugin({
               process: 'process/browser',
        })
    ],
    module: {
        rules: rules
    }
};

const server = {
    mode: "production",
    entry: "./src/server/server.ts",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'server.js',
        publicPath: "/"
    },
    module: {
        rules: rules
    },
    target: "node",
    externals: [nodeExternals()],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        new CopyPlugin({
          patterns: [
            { from: '.env', to: '.' }
          ],
        }),
    ]
};

module.exports = [client, server];