// 渲染模板
function Vue(data) {
  this.el = data.el
  this.data = data.data
  // 渲染模板
  this.render()
}

// 获取需要渲染的模板
Vue.prototype.getMode = function () {
  let mode = document.querySelector(this.el).innerHTML
  return mode
}

// 渲染函数
Vue.prototype.render = function () {
  console.log('render')
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
