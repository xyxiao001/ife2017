//引入css 文件
require('./index.scss')
window.onload = () => {
  var data = window.localStorage.getItem('md')
  dom.show.innerHTML = data ? data : '<p># 开始你的markdown之旅</p>'
  createLine()
  update()
}

var dom = {
  order: document.querySelector('.md-order'),
  show: document.querySelector('.md-show'),
  line: document.querySelectorAll('.md-show p'),
  preview: document.querySelector('.x-show')
}

window.addEventListener('keyup', function (e) {
  // 处理键盘事件
  write(e)
})

window.addEventListener('keydown', function (e) {
  // 处理键盘事件
  write(e)
})

window.addEventListener('mousedown', function (e) {
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

  // 右侧实时预览
  update()

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

// 右侧预览
var update = () => {
  dom.preview = document.querySelector('.x-show')
  dom.preview.innerHTML = ''
  // 单纯的数字匹配
  dom.line = document.querySelectorAll('.md-show p')
  dom.line.forEach((item, index) => {
    reg(item.innerHTML, index)
  })
}


// 正则匹配右边
var reg = (data, index) => {
  if (data.search(/\#( .*?)/) === 0) {
    data = data.replace('# ', '')
    var h1 = document.createElement('h1')
    h1.innerHTML = data
    dom.preview.appendChild(h1)
  } else if (data.search(/\##( .*?)/) === 0) {
    data = data.replace('## ', '')
    var h2 = document.createElement('h2')
    h2.innerHTML = data
    dom.preview.appendChild(h2)
  } else if (data.search(/\###( .*?)/) === 0) {
    data = data.replace('### ', '')
    var h3 = document.createElement('h3')
    h3.innerHTML = data
    dom.preview.appendChild(h3)
  } else if (data.search(/\####( .*?)/) === 0) {
    data = data.replace('#### ', '')
    var h4 = document.createElement('h4')
    h4.innerHTML = data
    dom.preview.appendChild(h4)
  } else if (data.search(/\#####( .*?)/) === 0) {
    data = data.replace('##### ', '')
    var h5 = document.createElement('h5')
    h5.innerHTML = data
    dom.preview.appendChild(h5)
  } else if (data.search(/\######( .*?)/) === 0) {
    data = data.replace('###### ', '')
    var h6 = document.createElement('h6')
    h6.innerHTML = data
    dom.preview.appendChild(h6)
  } else {
    // 判断下面的
    var p = document.createElement('p')
    p.innerHTML = data
    dom.preview.appendChild(p)
  }
}
