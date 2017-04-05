'use strict'
var options = {
  color: '#00000',
  width: 1000,
  height: 500,
  lineWidth: 2,
  lastX: -1,
  lastY: -1,
  now: 0,
  history: []
}

// 获取画布节点
var paint = document.getElementById('paint')
// 设置canvas
paint.width = options.width = document.body.clientWidth - 2
paint.height = options.height = document.body.clientHeight - 202
var ctx = paint.getContext('2d')

// 更新画笔
updatePen()

// 开始画画
paint.addEventListener('mousedown', function () {
  console.log('start')
  options.now += 1
  options.history.push([])
  paint.addEventListener('mousemove', move)
  paint.addEventListener('mouseleave', end)
})

paint.addEventListener('touchstart', function () {
  console.log('start')
  options.now += 1
  options.history.push([])
  paint.addEventListener('touchmove', move)
  paint.addEventListener('touchend', end)
})

paint.addEventListener('mouseup', end)

// 清除画布
document.querySelector('#clear').addEventListener('click', function () {
  clear(0, 0, options.width, options.height)
  options.now = 0
  options.history = []
})

// 导出图片
document.querySelector('#report').addEventListener('click', report)

// 上一步
document.querySelector('#pre').addEventListener('click', function () {
  var arr = options.history
  if (arr.length > 0) {
    arr.pop()
    options.now -= 1
    updateCanvas()
  } else {
    console.log(options.history)
    console.log('已经回退完了')
  }
})

function end() {
  console.log('end')
  options.lastX = -1
  options.lastY = -1
  paint.removeEventListener('touchmove', move)
  paint.removeEventListener('mousemove', move)
}

// 移动函数
function move(e) {
  e.preventDefault()
  var x = e.clientX ? e.clientX : e.touches[0].clientX
  var y = e.clientY ? e.clientY : e.touches[0].clientY
  options.history[options.now - 1].push({
    x: x,
    y: y
  })
  updateCanvas()
  // console.log('正在移动')
}

// 画图函数
function draw(x, y) {
  ctx.beginPath()
  if (options.lastX > 0) {
    ctx.moveTo(options.lastX, options.lastY)
  } else {
    ctx.moveTo(x, y)
  }
  options.lastX = x
  options.lastY = y
  ctx.lineTo(x, y)
  ctx.closePath()
  ctx.stroke()
}

function updatePen() {
  ctx.strokeStyle= options.color
  ctx.lineWidth = options.lineWidth
  ctx.lineCap = 'round'
}

function clear(x, y, w, h) {
  ctx.clearRect(x, y, w, h)
}

function report() {
	window.open(paint.toDataURL())
  console.log('导出图片')
}

// 更新视图
function updateCanvas() {
  // 先清除画布
  clear(0, 0, options.width, options.height)
  // 循环历史命令
  options.history.forEach(function(val, index) {
    ctx.beginPath()
    ctx.moveTo(val[0].x, val[0].y)
    for (var i = 1; i < val.length - 1; i++) {
      var c = (val[i].x + val[i + 1].x) / 2;
      var d = (val[i].y + val[i + 1].y) / 2;
      ctx.quadraticCurveTo(val[i].x, val[i].y, c, d)
    }
    ctx.stroke()
  })
}

//下载  a.href = window.URL.createObjectURL(blob)
