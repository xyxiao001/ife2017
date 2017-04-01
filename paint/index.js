'use strict'
var options = {
  color: '#00000',
}

// 获取画布节点
var paint = document.getElementById('paint')
var ctx = paint.getContext('2d')

// 开始画画
paint.addEventListener('mousedown', function () {
  console.log('start')
  paint.addEventListener('mousemove', move)
})

paint.addEventListener('mouseup', function () {
  console.log('end')
  paint.removeEventListener('mousemove', move)
})

// 移动函数
function move(e) {
  var x = e.clientX
  var y = e.clientY
  draw(x, y)
  // console.log('正在移动')
}

// 画图函数
function draw(x, y) {
  ctx.strokeStyle= '#000'
  ctx.lineWidth = 1
  ctx.lineCap= 'round'
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.closePath()
}
