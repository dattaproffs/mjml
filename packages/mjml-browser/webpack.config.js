const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    "mjml": ['../mjml/lib/index'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 5,
          keep_classnames: true,
          keep_fnames: true,
          compress: {
            passes: 2,
            keep_fargs: false,
          },
          output: {
            beautify: false,
          },
          mangle: true,
        },
      }),
    ],
  },
  output: {
    library: 'mjml',
    filename: 'index.js',
    path: path.resolve(__dirname, './lib'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  resolve: {
    alias: {
      'path': path.resolve(__dirname, 'browser-mocks/path'),
      'fs': path.resolve(__dirname, 'browser-mocks/fs'),
      'uglify-js': path.resolve(__dirname, 'browser-mocks/uglify-js'),
      'detect-node': path.resolve(__dirname, 'browser-mocks/detect-node')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['last 2 versions', 'ie >= 11']
                  },
                  loose: true
                }]
              ],
              plugins: [
                ["@babel/plugin-transform-private-methods", { "loose": true }],
                ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }],
                "@babel/plugin-proposal-function-bind",
                "@babel/plugin-proposal-export-default-from",
              ],
              babelrc: false,
            },
          },
        ],
      },
    ],
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false,
    process: false,
    Buffer: false,
    setImmediate: false
  }
}
