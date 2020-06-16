// 热更新
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')

let webpack = require('webpack')

module.exports = {
  entry: './src/index.js', // 入口
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve('./build'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 3000,
    compress: true,
    hot: true, // 热更新,配合webpack.HotModuleReplacementPlugin插件一起使用
    open: true,
    // 如果报错Error: getaddrinfo ENOTFOUND localhost，一般是localhost没有绑定127.0.0.1这个ip导致的
    // 指定一下host，或者修改系统的localhost的ip
    host: '127.0.0.1',
  },
  plugins: [
    // 热更新插件
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'webpack 4.0',
      hash: true,
    }),
  ], // 插件配置
  mode: 'development', // 模式
  resolve: {}, // 配置解析
}
