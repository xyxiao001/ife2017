//引入css 文件
require('./index.scss')
window.onload = () => {
  var data = window.localStorage.getItem('md')
  dom.show.innerHTML = data ? data :
  `<p># 一级标题   [我是超链接](http://xyxiao.cn/vue-blog/#/)   [博客](http://xyxiao.cn/vue-blog/#/)  **123**</p>
  <p>## 二级标题  [我是也是超链接](http://xyxiao.cn/vue-blog/#/)</p>
  <p>### 三级标题 [我还是超链接](http://xyxiao.cn/vue-blog/#/)</p>
  <p>#### 四级标题   **我是加粗的四级标题**</p>
  <p>#### 四级标题</p>
  <p>#### 五级标题</p>
  <p>###### 六级标题 [百度](http://baidu.com) **123**</p>
  <p>测试a链接的识别  [百度](http://baidu.com)</p>
  <p>**我是加粗的文字**   **我也是加粗的** **我是粗体**  **[加粗的 a 链接](http://xyxiao.cn/vue-blog/#/)** *123*</p>
  <p>*我是斜体*   *[斜的 a 链接](http://xyxiao.cn/vue-blog/#/)*   **112粗**</p>
  <p>> 这是引用块， 哈哈哈哈哈</p>
  <p>> 我也是</p>
  <p>图片测试 ![空链接图片]()</p>
  <p>## **图片测试**  ![goodboy](http://ofyaji162.bkt.clouddn.com/touxiang.jpg)</p>`
  createLine()
  update()
}

var dom = {
  order: document.querySelector('.md-order'),
  show: document.querySelector('.md-show'),
  line: document.querySelectorAll('.md-show p'),
  preview: document.createElement('div'),
  previews: document.querySelector('.x-show')
}

var row = []

dom.show.addEventListener('keyup', function (e) {
  // 处理键盘事件
  write(e)
})

dom.show.addEventListener('keydown', function (e) {
  // 处理键盘事件
  write(e)
})

dom.show.addEventListener('mousedown', function (e) {
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
  append()
}


// 正则匹配右边
var reg = (data, index) => {
  // 匹配 看需要输出为什么内容
  var line = {}
  if (data.search(/\#( .*?)/) === 0) {
    data = data.replace('#', '')
    line.type = 'h1'
  } else if (data.search(/\##( .*?)/) === 0) {
    data = data.replace('##', '')
    line.type = 'h2'
  } else if (data.search(/\###( .*?)/) === 0) {
    data = data.replace('###', '')
    line.type = 'h3'
  } else if (data.search(/\####( .*?)/) === 0) {
    data = data.replace('#### ', '')
    line.type = 'h4'
  } else if (data.search(/\#####( .*?)/) === 0) {
    data = data.replace('##### ', '')
    line.type = 'h5'
  } else if (data.search(/\######( .*?)/) === 0) {
    data = data.replace('###### ', '')
    line.type = 'h6'
  } else if (data.search(/\&gt;/) === 0) {
    data = data.replace('&gt;', '')
    line.type = 'blockquote'
  } else {
    // 判断下面的
    line.type = 'p'
  }
  line.text = data
  // 加粗判断
  var strong = line.text.match(/\*\*(.*?)\*\*/g)
  var strongText = ''
  if (strong) {
    strong.forEach((item, index) => {
      strongText = item.substring(2, item.length - 2)
      line.text = line.text.replace(item, `<strong>${strongText}</strong>`)
    })
  }

  // 斜体
  var em = line.text.match(/\*(.*?)\*/g)
  var emText = ''
  if (em) {
    em.forEach((item, index) => {
      emText = item.substring(1, item.length - 1)
      line.text = line.text.replace(item, `<em>${emText}</em>`)
    })
  }

  // 识别图片
  var imgArray = line.text.match(/!\[(.*?)\]\((.*?)\)/g)
  if (imgArray) {
    //console.log(aArray)
    imgArray.forEach((item, index) => {
      var old = item
      // 匹配到名字 和 链接
      var text1 = old.match(/\[(.*?)\]/)
      var name = text1[0].substring(2, text1[0].length - 1)
      var text2 = old.match(/\((.*?)\)/)
      var url =  text2[0].substring(1, text2[0].length - 1)
      line.text = line.text.replace(old, `<img src="${url}" alt="${name}" />`)
    })
  }

  // 超链接
  var aArray = line.text.match(/\[(.*?)\]\((.*?)\)/g)
  if (aArray !== null) {
    //console.log(aArray)
    aArray.forEach((item, index) => {
      var old = item
      // 匹配到名字 和 链接
      var text1 = old.match(/\[(.*?)\]/)
      var name = text1[0].substring(1, text1[0].length - 1)
      var text2 = old.match(/\((.*?)\)/)
      var url =  text2[0].substring(1, text2[0].length - 1)
      line.text = line.text.replace(old, `<a href="${url}" target="_blank">${name}</a>`)
    })
  }
  row.push(line)
}

// 生成展示的
var createShow = () => {
  dom.preview.innerHTML = ''
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
      case 'blockquote':
      var blockquote = document.createElement('blockquote')
      blockquote.innerHTML = item.text
      dom.preview.appendChild(blockquote)
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

// 渲染到模板
var append = () => {
  dom.previews.innerHTML = dom.preview.innerHTML
}
