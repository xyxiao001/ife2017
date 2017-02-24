// 实现动态的数据绑定2
// 设计模式， 观察者模式
// 实现 watch 监听事件

// 主函数 保存数据
function Observer(data, next) {
  // 传进来需要设置的data 返回一个经过重新设置的obj
  this.data = data
  this.next = next ? true : false
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


let app1 = new Observer({
  name: 'youngwind',
  age: 25
})

app1.data.name = {
  lastName: 'liang',
  firstName: 'shaofeng'
}


app1.data.name.lastName
// 这里还需要输出 '你访问了 lastName
app1.data.name.firstName = 'lalala'
// 这里还需要输出 '你设置了firstName, 新的值为 lalala'

// 你需要实现 $watch 这个 API
app1.$watch('age', function(age) {
  console.log(`我的年纪变了，现在已经是：${age}岁了`)
});

app1.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'
