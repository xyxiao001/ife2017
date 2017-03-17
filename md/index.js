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

var row = []

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
  dom.line = Array.prototype.slice.call(dom.line)
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
  row = []
  // 单纯的数字匹配
  dom.line = document.querySelectorAll('.md-show p')
  dom.line = Array.prototype.slice.call(dom.line)
  dom.line.forEach((item, index) => {
    reg(item.innerHTML, index)
  })
  // 生成展示的
  createShow()
}


// 正则匹配右边
var reg = (data, index) => {
  // 匹配 看需要输出为什么内容
  if (data.search(/\#( .*?)/) === 0) {
    data = data.replace('# ', '')
    row.push({
      type: 'h1',
      text: data
    })
  } else if (data.search(/\##( .*?)/) === 0) {
    data = data.replace('## ', '')
    row.push({
      type: 'h2',
      text: data
    })

  } else if (data.search(/\###( .*?)/) === 0) {
    data = data.replace('### ', '')
    row.push({
      type: 'h3',
      text: data
    })

  } else if (data.search(/\####( .*?)/) === 0) {
    data = data.replace('#### ', '')
    row.push({
      type: 'h4',
      text: data
    })

  } else if (data.search(/\#####( .*?)/) === 0) {
    data = data.replace('##### ', '')
    row.push({
      type: 'h5',
      text: data
    })

  } else if (data.search(/\######( .*?)/) === 0) {
    data = data.replace('###### ', '')
    row.push({
      type: 'h6',
      text: data
    })

  } else {
    // 判断下面的
    row.push({
      type: 'p',
      text: data
    })
  }

  // 加粗判断

  // 斜体

  // 超链接


}

// 生成展示的
var createShow = () => {
  row.forEach((item, index) => {
    switch (item.type) {
      case 'h1':
        var h1 = document.createElement('h1')
        h1.innerHTML = item.text
        dom.preview.appendChild(h1)
        break
      case 'h2':
        var h2 = document.createElement('h2')
        h2.innerHTML = item.text
        dom.preview.appendChild(h2)
      break
      case 'h3':
        var h3 = document.createElement('h3')
        h3.innerHTML = item.text
        dom.preview.appendChild(h3)
      break
      case 'h4':
        var h4 = document.createElement('h4')
        h4.innerHTML = item.text
        dom.preview.appendChild(h4)
      break
      case 'h5':
        var h5 = document.createElement('h5')
        h5.innerHTML = item.text
        dom.preview.appendChild(h5)
      break
      case 'h6':
      var h6 = document.createElement('h6')
      h6.innerHTML = item.text
      dom.preview.appendChild(h6)
      break
      case 'p':
        var p = document.createElement('p')
        p.innerHTML = item.text
        dom.preview.appendChild(p)
      break
      default:

    }
  })
}
