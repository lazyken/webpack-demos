import _ from 'lodash'
import './style.css'
import './style1.less'

function component() {
  var element = document.createElement('div')

  element.innerHTML = _.join(['hello', 'webpack'], ' ')
  // element.classList.add('hello')
  return element
}

document.body.appendChild(component())
