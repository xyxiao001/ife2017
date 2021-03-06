// 实现 Observer 的函数

function Observer(data) {
  var o = {}
  o.data = {}
  var i = 0
  for (i in data) {
    setObj(o.data, i, data[i])
  }
  return o
}

// 三个参数 当前对象, 设置的key, 和 key的值
function setObj (obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('你访问了' + key)
      return val
    },
    set: function (newVal) {
       console.log('你设置了' + key);
       console.log('新的' + key + ' = ' + newVal)
       if (newVal === val) {
         return false
       } else {
         val = newVal
       }
     }
  })
}

let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

console.log(app1.data.name)
console.log(app1.data.age = 100)
console.log(app2.data.university)
console.log(app2.data.major = 'science')
