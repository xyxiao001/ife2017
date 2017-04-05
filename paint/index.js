'use strict'
var options = {
  color: '#00000',
  lineWidth: 2,
  lastX: -1,
  lastY: -1,
}

// 获取画布节点
var paint = document.getElementById('paint')
var ctx = paint.getContext('2d')

// 更新画笔
updatePen()

// 开始画画
paint.addEventListener('mousedown', function () {
  console.log('start')
  paint.addEventListener('mousemove', move)
  paint.addEventListener('mouseleave', end)
})

paint.addEventListener('mouseup', end)

// 清除画布
document.querySelector('#clear').addEventListener('click', function () {
  clear(0, 0, 1000, 500)
})

// 导出图片
document.querySelector('#report').addEventListener('click', report)

function end() {
  console.log('end')
  options.lastX = -1
  options.lastY = -1
  paint.removeEventListener('mousemove', move)
}

// 移动函数
function move(e) {
  var x = e.clientX
  var y = e.clientY
  draw(x, y)
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
