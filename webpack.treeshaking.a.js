const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // mode: 'production',
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin()],
    // namedModules: true,
    usedExports: true,
    // sideEffects: true,
  },
  // 打包入口配置
  entry: './tree-shaking/index.js',
  // 打包出口配置
  output: {
    // 打包出来的文件名称
    filename: 'bundle.js',
    // 打包出来的文件保存目录路径
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
};
