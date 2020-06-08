// 资源管理-安装；加载css

const path = require('path')

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
        // webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。
        // css-loader 用于解析模块化的css文件。一个css文件就是一个模块，可以直接用模块语法导入（import）
        // style-loader 用于把 css-loader 解析后的css 写入到<style>标签并插入到index.htnl的header里
        // use的值的类型有 String('style-loader')| Array(['style-loader','css-loader'])| Object({loader:'style-loader'})
        // use: [ "style-loader" ] 是 use: [ { loader: "style-loader "} ] 的简写
        // loader执行的顺序是从右到左的，先使用css-lodaer再使用style-loader

        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
