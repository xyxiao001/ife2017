//引入css 文件
require('./index.scss')
window.onload = () => {
  var data = window.localStorage.getItem('md')
  dom.show.innerHTML = data ? data : '<p># 开始你的markdown之旅</p>'
  createLine()
}

var dom = {
  order: document.querySelector('.md-order'),
  show: document.querySelector('.md-show'),
  line: document.querySelectorAll('.md-show p')
}

window.addEventListener('keyup', function (e) {
  // 处理键盘事件
  write(e)
})

window.addEventListener('keydown', function (e) {
  // 处理键盘事件
  write(e)
})

// 出来键盘方法
var write = (e) => {
  dom.line = document.querySelectorAll('.md-show p')

  // 开始生成行数
  createLine()
  if (dom.line.length === 1 && e.keyCode === 8) {
    if (dom.line[0].innerHTML === '<br>') {
      e.preventDefault()
    }
  }

  // 储存数据
  setData()
}

var createLine = () => {
  dom.line = document.querySelectorAll('.md-show p')
  dom.order.innerHTML = ''
  dom.line.forEach((item, index) => {
    var div = document.createElement('div')
    div.innerHTML = index + 1
    div.className = 'order-item'
    dom.order.appendChild(div)
  })
}

// 储存数据函数
var setData = () => {
  dom.show = document.querySelector('.md-show')
  window.localStorage.setItem('md', dom.show.innerHTML)
}
