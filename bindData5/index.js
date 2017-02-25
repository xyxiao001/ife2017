// 数据绑定5 最后一题
// 渲染模板
function Vue(data) {
  this.el = data.el
  this.data = data.data
  // 渲染模板
  this.render()
}

// 获取需要渲染的模板
Vue.prototype.getMode = function () {
  this.dom = document.querySelector(this.el)
  return this.dom.innerHTML
}

// 渲染函数
Vue.prototype.render = function () {
  var html = this.getMode()
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

// 实现动态的数据绑定4
let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25
    }
  }
});


//console.log(app)
