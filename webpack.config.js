// 资源管理-分离css
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

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
        use: ExtractTextWebpackPlugin.extract({
          // fallback，在禁用ExtractTextWebpackPlugin时使用style-loader
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  plugins: [
    // 使用插件需要添加插件实例
    // filename 指定打包后生成的css文件名
    new ExtractTextWebpackPlugin({
      // 禁用插件
      // disable:true,
      filename: 'styles.css',
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
