// 实现动态的数据绑定2
// 设计模式， 观察者模式
// 实现 watch 监听事件
// 思考深层次数据变化如何逐层往上传播

// 主函数 保存数据
function Observer(data, next) {
  // 传进来需要设置的data 返回一个经过重新设置的obj
  var n = next ? true : false
  if (!n) {
    this.data = data
  }
  this.setVal(data, n)
}

Observer.prototype.setVal = function (obj, n) {
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
      this.bindSet(i, v, n)
    }
  }
}

Observer.prototype.bindSet = function (i, v, n) {
  var o;
  o = !n ? this.data : this
  Object.defineProperty(o, i, {
    // 是否可以被循环枚举出来
    enumerable: true,
    // 是否可配置
    configurable: true,
    get: function () {
      //console.log('你访问了' + i)
      return v
    },
    set: function (newVal) {
      //console.log('你设置了' + i)
      //console.log('新的' + i + ' = ' + newVal)
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
    // 如果是个对象则进行里面数据绑定
    let j;
    let obj = this.data
    if(typeof obj[k] === 'object') {
      let arr = Object.getOwnPropertyNames(obj[k])
      arr.forEach(function (val, index) {
        //console.log(obj[k], val, obj[k][val], callback)
        bindEvent(obj[k], val, obj[k][val], callback)
      })
    } else {
      bindEvent(obj, k, obj[k], callback)
    }
}

function bindEvent(obj, k, v, callback) {
  Object.defineProperty(obj, k, {
    set: function (v) {
      callback(v)
      return v
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
