const path = require('path')

module.exports = {
  // 打包入口配置
  entry: './src/index.js',
  // 打包出口配置
  output: {
    // 打包出来的文件名称
    filename: 'bundle.js',
    // 打包出来的文件保存目录路径
    path: path.resolve(__dirname, 'dist'),
  },
}
