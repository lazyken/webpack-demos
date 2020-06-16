// 运行在node环境下
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
// 早期版本的require方式不同
// let CleanWebpackPlugin = require('clean-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')

let webpack = require('webpack')

// 将html打包到build下可以自动引入build目录
module.exports = {
  // entry的第一种用法：字符串
  // entry: './src/index.js', // 入口
  // 是entry: {main: './src/index.js'}的简写
  // entry的第二种用法，数组
  // 可以写数组，b.js没有使用到仍可以被一起打包到build.js里
  // 向 entry 属性传入「文件路径(file path)数组」将创建“多个主入口(multi-main entry)”。
  // 在你想要多个依赖文件一起注入，并且将它们的依赖导向(graph)到一个“chunk”时，传入数组的方式就很有用。
  // entry: ['./src/index.js', './src/b.js'],
  // entry的第三种用法,对象语法
  // 单页  index.html 引用了多个js
  // 多页  b.html引用b.js  index.html 引用 index.js
  entry: {
    pageOne: './src/index.js',
    pageTow: './src/b.js',
  },
  output: {
    // 打包出的文件名
    // [hbsh:8] 在打包出文件名添加8位hash值，默认是20位
    // filename: 'build.[hash:8].js',
    // 多入口起点：如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），
    // 则应该使用占位符(substitutions)来确保每个文件具有唯一的名称。
    filename: '[name].[hash:8].js',
    // 保存的绝对路径
    path: path.resolve('./build'),
  }, // 出口
  // 安装 webpack-dev-server,配置scripts
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 3000,
    compress: true, // 服务器压缩
    // hot: true, // 热更新,配合webpack.HotModuleReplacementPlugin插件一起使用
    open: true, // 自动打开浏览器
  }, // 开发服务器配置
  module: {}, // 模块，js模块，图片模块
  plugins: [
    // // 热更新插件
    // new webpack.HotModuleReplacementPlugin(),
    // 清空指定目录的文件
    // 按顺序执行，先清空build，再打包最新的文件
    // 早期版本的使用配置方式
    // new CleanWebpackPlugin(['./build']),
    new CleanWebpackPlugin({
      // dry: true, // 在控制台写入日志。default: false
      // verbose: true, // 重新build时，自动删除所有没有使用的打包后的文件。default: false
      // cleanStaleWebpackAssets: false, // 不允许删除当前打包的资源。default: true
    }),

    // 该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包
    // 如果你有多个 webpack 入口点， 他们都会在生成的HTML文件中的 script 标签内
    // 如果你有任何CSS assets 在webpack的输出中（例如， 利用ExtractTextPlugin提取CSS）， 那么这些将被包含在HTML head中的<link>标签内。
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定生成HTML文件的模版
      title: 'webpack 4.0', // 设置html的title。需要html配合修改，使用模板语法取这里的配置参数

      // minify:true,
      // 如果minify选项设置为true(当webpack的模式是“production”时默认)，生成的HTML将使用html-minifier-terser和以下选项被缩小
      // {
      //   collapseWhitespace: true,
      //   removeComments: true,
      //   removeRedundantAttributes: true,
      //   removeScriptTypeAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   useShortDoctype: true
      // }
      // 要使用自定义html-minifier选项，需要传递一个对象来缩小。此对象将不会与上面的默认值合并。
      // 要在生产模式中禁用缩小，请将缩小选项设置为false
      // minify: {
      //   removeAttributeQuotes: true, // 移除属性值的引号
      //   collapseWhitespace: true, // 将html代码折叠成一行，即移除空白字符
      // },

      // 如果为true，那么在html引入的所有包含的脚本和CSS文件的文件名后面会附加一个唯一的webpack编译散列（
      // 如：<script src="build.js?6847e4e218378c49b5ae"></script>）。这对于缓存破坏很有用（就是清缓存）
      hash: true,
      // 多页应用时：打包出多个html分别对应引入各自的js
      // 指定打包出的html文件名和需要引入的js（chunk）
      filename: 'pageOne.html',
      chunks: ['pageOne'],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'pageTow',
      hash: true,
      filename: 'pageTow.html',
      chunks: ['pageTow'],
    }),
  ], // 插件配置
  mode: 'development', // 模式
  resolve: {}, // 配置解析
}
