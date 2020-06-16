let a = require('./a.js')
document.getElementById('app').innerHTML = a
// 热更新
if (module.hot) {
  module.hot.accept()
  // module.hot.accept('./a.js', function () {
  //   let a = require('./a.js')
  //   document.getElementById('app').innerHTML = a
  // })
}
