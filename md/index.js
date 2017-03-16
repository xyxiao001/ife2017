//引入css 文件
require('./index.scss')
var dom = {
  order: document.querySelector('.md-order'),
  show: document.querySelector('.md-show'),
  line: document.querySelectorAll('.md-show p')
}

window.addEventListener('keyup', function (e) {
  // 处理键盘事件
  write(e)
})

// 出来键盘方法
var write = (e) => {
  dom.line = document.querySelectorAll('.md-show p')
  if (dom.line.length <= 0) {
    console.log(dom.line)
    var p = document.createElement('p')
    p.innerHTML = '<br>'
    dom.show.appendChild(p)
  }
  // 开始生成行数
  dom.order.innerHTML = ''
  dom.line.forEach((item, index) => {
    var div = document.createElement('div')
    div.innerHTML = index + 1
    div.className = 'order-item'
    dom.order.appendChild(div)
  })
}
