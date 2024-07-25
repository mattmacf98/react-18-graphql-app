const nodeExternals = require("webpack-node-externals");
const path = require("path");
const { ProvidePlugin } = require("webpack");
const rules = [{
    test: /\.(tsx|ts)$/,
    use: 'ts-loader',
    exclude: /node_modules/
}];

const isDevelopment = process.env.NODE_ENV !== 'production'

const client = {
    mode: "production",
    entry: "./src/client/client.tsx",
    output: {
        path: path.resolve(__dirname, './dist/public'),
        filename: 'bundle.js',
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          buffer: require.resolve('buffer/'),
          stream: require.resolve('stream-browserify'),
          vm: require.resolve("vm-browserify")
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
    }
};

module.exports = [client, server];