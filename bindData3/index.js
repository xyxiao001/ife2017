// 实现动态的数据绑定2
// 设计模式， 观察者模式
// 实现 watch 监听事件

// 主函数 保存数据
function Observer(data, next) {
  // 传进来需要设置的data 返回一个经过重新设置的obj
  this.next = next ? true : false
  if (!this.next) {
    this.data = data
  }
  this.setVal(data)
}

Observer.prototype.setVal = function (obj) {
  // 设置值
  let i, v
  for (i in obj) {
    if (obj.hasOwnProperty(i)) {
      v = obj[i]

      // 如果是对象 则重新设置
      if (typeof v === 'object') {
        v = new Observer(v, true)
      }

      // 绑定对象get set
      this.bindSet(i, v)
    }
  }
}

Observer.prototype.bindSet = function (i, v) {
  var o;
  o = !this.next ? this.data : this
  Object.defineProperty(o, i, {
    get: function () {
      console.log('你访问了' + i)
      return v
    },
    set: function (newVal) {
      console.log('你设置了' + i)
      console.log('新的' + i + ' = ' + newVal)
      if (typeof newVal === 'object') {
        newVal = new Observer(newVal, true)
      }
      if (newVal !== v) {
        v = newVal
      }
    }
  })
}

// 实现watch
Observer.prototype.$watch = function (k, callback) {
    Object.defineProperty(this.data, k, {
      set: function (newVal) {
        callback(newVal)
        return newVal
      }
    })
}


let app2 = new Observer({
    name: {
      firstName: 'shaofeng',
      lastName: 'liang'
    },
    age: 25
});

app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
console.log(app2)
