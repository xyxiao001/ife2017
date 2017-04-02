'use strict'
var options = {
  color: '#00000',
  lastX: -1,
  lastY: -1,
}

// 获取画布节点
var paint = document.getElementById('paint')
var ctx = paint.getContext('2d')
ctx.strokeStyle= '#000'
ctx.lineWidth = 2
ctx.lineCap = 'round'

// 开始画画
paint.addEventListener('mousedown', function () {
  console.log('start')
  paint.addEventListener('mousemove', move)
  paint.addEventListener('mouseleave', end)
})

paint.addEventListener('mouseup', end)

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
