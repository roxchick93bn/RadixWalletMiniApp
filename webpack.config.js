const path = require("path");

module.exports = {
  // Set the mode to 'development' for easier debugging or 'production' for optimized builds
  mode: "development",

  // Entry point for the application
  entry: "./src/index.js",

  // Output configuration
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  // Resolve configuration for polyfills
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert/"),
      url: require.resolve("url/"),
    },
  },

  // Module rules for processing files
  module: {
    rules: [
      {
        // Use Babel to transpile JavaScript and JSX files
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        // Source map loader to handle source maps
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /node_modules\/rxjs-compat/,
      },
    ],
  },

  // Enable source maps for debugging
  devtool: "source-map",

  // Development server configuration
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
