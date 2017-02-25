// 数据绑定5 最后一题
// 渲染模板
function Vue(data) {
  this.el = data.el
  this.data = data.data
  // 绑定数据
  this.observer(this.data)
  // 渲染模板
  this.getMode()
  this.render()
}

Vue.prototype.observer = function (obj) {
  // 设置值
  let i, v
  for (i in obj) {
    if (obj.hasOwnProperty(i)) {
      v = obj[i]

      // 如果是对象 则重新设置
      if (typeof v === 'object') {
        v = this.observer(v)
      }

      // 绑定对象get set
      this.bindVal(obj, i, v)
    }
  }
  return obj
}

Vue.prototype.bindVal = function (obj, i, v) {
  let that = this
  Object.defineProperty(obj, i, {
    // 是否可以被循环枚举出来
    enumerable: true,
    // 是否可配置
    configurable: true,
    get: function () {
      return v
    },
    set: function (newVal) {
      console.log('我要重新渲染了..')
      if (typeof newVal === 'object') {
        newVal = this.observer(newVal)
      }
      if (newVal !== v) {
        v = newVal
      }
      that.render()
    }
  })
}

// 获取需要渲染的模板
Vue.prototype.getMode = function () {
  this.dom = document.querySelector(this.el)
  this.template = this.dom.innerHTML
}

// 渲染函数
Vue.prototype.render = function () {
  var html = this.template
  var pattern = /\{\{(.*?)\}\}/g
  var that = this
  html.match(pattern).forEach(function (val) {
    var s = val.substr(2, val.length - 4)
    var arrS = s.split('.')
    var r = that.data
    arrS.forEach(function (v) {
      r = r[v]
    })
    html = html.replace(val, r)
  })
  this.dom.innerHTML = html
}

let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: '简单版的数据绑定',
      age: 25
    },
    city: '天门',
    major: 'computer'
  }
});


//console.log(app)
