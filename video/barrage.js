class Barrage {
  constructor(video, canvas, options) {
    if (!canvas || !video) {
      return
    }
    this.video = video
    this.canvas = canvas
  	let defaults = {
  		opacity: 100,
  		fontSize: 24,
  		speed: 2,
  		range: [0, 1],
  		color: 'white',
  		data: []
  	}
  	var options = options || {}
    this.options = {}
    // 合并配置
    for (let key in defaults) {
      if (options[key]) {
  			this.options[key] = options[key]
  		} else {
  			this.options[key] = defaults[key]
  		}
    }
    this.init()
  }

  init () {
    // 暂停与否
    this.isPause = true
  	// 播放时长
    this.time = video.currentTime

    this.data = this.options.data || []

    if (this.data.length === 0) {
		  return
	  }
    // 设置弹幕数据
    this.store = []

    var that = this
    var fontSize = 28
    // 设置数据
    this.initData = function (obj) {
      // 一些变量参数
  		this.value = obj.value
  		this.time = obj.time
  		// data中的可以覆盖全局的设置
  		this.init = function () {
  			// 1. 速度
  			var speed = that.options.speed
  			if (obj.hasOwnProperty('speed')) {
  				speed = obj.speed
  			}
  			if (speed !== 0) {
  				// 随着字数不同，速度会有微调
  				speed = speed + obj.value.length / 100
  			}
  			// 2. 字号大小
  			var fontSize = obj.fontSize || that.options.fontSize

  			// 3. 文字颜色
  			var color = obj.color || that.options.color
  			// 转换成rgb颜色
  			color = (function () {
  				var div = document.createElement('div')
  				div.style.backgroundColor = color
  				document.body.appendChild(div)
  				var c = window.getComputedStyle(div).backgroundColor
  				document.body.removeChild(div)
  				return c
  			})()

  			// 4. range范围
  			var range = obj.range || that.options.range
  			// 5. 透明度
  			var opacity = obj.opacity || that.options.opacity
  			opacity = opacity / 100

  			// 计算出内容长度
  			var span = document.createElement('span')
  			span.style.position = 'absolute'
  			span.style.whiteSpace = 'nowrap'
  			span.style.font = 'bold ' + fontSize + 'px "microsoft yahei", sans-serif'
  			span.innerText = obj.value
  			span.textContent = obj.value
  			document.body.appendChild(span)
  			// 求得文字内容宽度
  			this.width = span.clientWidth
  			// 移除dom元素
  			document.body.removeChild(span)

  			// 初始水平位置和垂直位置
  			this.x = canvas.width
  			if (speed == 0) {
  				this.x	= (this.x - this.width) / 2
  			}
  			this.actualX = canvas.width
  			this.y = range[0] * canvas.height + (range[1] - range[0]) * canvas.height * Math.random()
  			if (this.y < fontSize) {
  				this.y = fontSize
  			} else if (this.y > canvas.height - fontSize) {
  				this.y = canvas.height - fontSize
  			}

  			this.moveX = speed
  			this.opacity = opacity
  			this.color = color
  			this.range = range
  			this.fontSize = fontSize
  		}

  		this.draw = function () {
  			// 根据此时x位置绘制文本
  			that.context.shadowColor = 'rgba(0,0,0,'+ this.opacity +')'
  			that.context.shadowBlur = 2
  			that.context.font = this.fontSize + 'px "microsoft yahei", sans-serif'
  			if (/rgb\(/.test(this.color)) {
  				that.context.fillStyle = 'rgba('+ this.color.split('(')[1].split(')')[0] +','+ this.opacity +')'
  			} else {
  				that.context.fillStyle = this.color
  			}
  			// 填色
  			that.context.fillText(this.value, this.x, this.y)
  		}
  	}

    this.data.forEach((obj, index) => {
  		this.store[index] = new this.initData(obj)
  	})
    // 处理数据

    video.addEventListener('play', () => {
      // 视频开始 开始执行弹幕的
      this.context = canvas.getContext('2d')
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      this.isPause = false
      this.render()
    })

    video.addEventListener('pause', () => {
      // 视频开始 开始执行弹幕的
      this.isPause = true
    })

    video.addEventListener('seeked', () => {
      // 视频跳转 清除弹幕
      this.reset()
    })
  }

  draw () {
    var store = this.store
    for (var index in store) {
      var barrage = store[index];

      if (barrage && !barrage.disabled && this.time >= barrage.time) {
        if (!barrage.inited) {
          barrage.init()
          barrage.inited = true
        }
        barrage.x -= barrage.moveX
        if (barrage.moveX == 0) {
          // 不动的弹幕
          barrage.actualX -= this.options.speed
        } else {
          barrage.actualX = barrage.x
        }
        // 移出屏幕
        if (barrage.actualX < -1 * barrage.width) {
          // 下面这行给speed为0的弹幕
          barrage.x = barrage.actualX
          // 该弹幕不运动
          barrage.disabled = true
        }
        // 根据新位置绘制圆圈圈
        barrage.draw()
      }
    }
  }

  add (obj) {
    this.store[Object.keys(this.store).length] = new this.initData(obj)
  }

  render () {
    // 更新已经播放时间
    this.time = video.currentTime
    this.render = this.render.bind(this)
    // 清除画布
    this.context.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制画布
    this.draw()
    // 继续渲染
    if (this.isPause === false) {
      requestAnimationFrame(this.render)
    }
  }

  // 清除弹幕
  reset () {
    var store = this.store
    this.time = video.currentTime
		// 画布清除
		this.context.clearRect(0, 0, canvas.width, canvas.height)
		for (var index in store) {
			var barrage = store[index];
			if (barrage) {
				// 状态变化
				barrage.disabled = false;
				// 根据时间判断哪些可以走起
				if (this.time < barrage.time) {
					// 视频时间小于播放时间
					barrage.inited = null;
				} else {
					// 视频时间大于播放时间
					barrage.disabled = true;
				}
			}
		}
  }
}
