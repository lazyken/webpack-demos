// 资源管理-分离css
const path = require('path')

// 将其他类型文件从js bundle 中抽离出来
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

// 需要抽离成多个文件就使用多个实例抽离
const cssExtract = require('extract-text-webpack-plugin')
const lessExtract = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'development',
  // 打包入口配置
  entry: './src/index.js',
  // 打包出口配置
  output: {
    // 打包出来的文件名称
    filename: 'bundle.js',
    // 打包出来的文件保存目录路径
    path: path.resolve(__dirname, 'dist'),
  },
  // 模块。决定了如何处理项目中的不同类型的模块
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        // 上面的用法，最终是把css样式打包在bundle.js中，通过加载js把style标签插入header标签。下面介绍如何将css样式分离出来，单独生成一个css文件
        // 使用插件 extract-text-webpack-plugin (有个版本bug，请看最下方注释) ----------------------------------------
        // 首先安装一下 npm install --save-dev extract-text-webpack-plugin
        // 它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 styles.css）当中。
        //  如果你的样式文件大小较大，这会做更快提前加载，因为 CSS bundle 会跟 JS bundle 并行加载。

        // use: ExtractTextWebpackPlugin.extract({
        //   // fallback，在禁用ExtractTextWebpackPlugin时使用style-loader
        //   fallback: 'style-loader',
        //   use: 'css-loader',
        // }),

        // 同一个ExtractTextWebpackPlugin实例会把所有的文件抽离到同一个文件中。如果想抽离到多个文件则需要分别用到多个实例
        use: cssExtract.extract({
          fallback: 'style-loader',
          // 安装postcss-loader和 autoprefixer， 使用Can I Use中的值向CSS规则添加供应商前缀，如“-webkit-”。Autoprefixer将使用基于当前浏览器流行度和属性支持的数据为您应用前缀。
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')],
              },
            },
          ],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
        // use: lessExtract.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'less-loader'],
        // }),
      },
    ],
  },
  plugins: [
    // 使用插件需要添加插件实例
    // filename 指定打包后生成的css文件名
    // new ExtractTextWebpackPlugin({
    //   // 禁用插件
    //   // disable:true,
    //   filename: 'styles.css',
    // }),

    // 使用多个实例，抽离为多个文件
    new cssExtract({
      filename: 'css/css.css',
    }),
    new lessExtract({
      filename: 'css/less.css',
    }),
    // 简写
    // new ExtractTextWebpackPlugin('styles.css')
  ],
}

// Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
// 原因：
// extract-text-webpack-plugin还不能支持webpack4.0.0以上的版本。
// 解决办法：
// npm install –save-dev extract-text-webpack-plugin@next
// 会下载到+ extract-text-webpack-plugin@4.0.0-beta
