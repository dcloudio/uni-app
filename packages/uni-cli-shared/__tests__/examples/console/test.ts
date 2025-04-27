// 基础测试用例
console.log('简单字符串')
console.info('双引号字符串')
console.warn(`模板字符串`)
console.error('带分号的')
console.debug('不带分号的')

// 多参数测试
console.log('参数1', '参数2', '参数3')
console.info(1, true, null, undefined)
console.warn('混合类型', 123, true, null)

// 对象和数组测试
console.log({ name: 'test', age: 18 })
console.log(['a', 'b', 'c'])
console.log({ a: 1 }, ['x', 'y'], { b: 2 })

// 表达式测试
console.log(1 + 2)
console.log(foo())
console.log(a ? b : c)
console.log(obj.method())

// 模板字符串测试
console.log(`Hello ${name}`)
console.log(`多行
模板字符串
测试`)
console.log(`${obj.method()} 和 ${arr[0]}`)

// 多行格式测试
console.log('多行参数1', '多行参数2', '多行参数3')

console.log({
  name: 'test',
  age: 18,
  nested: {
    a: 1,
    b: 2,
  },
})

// 嵌套括号测试
console.log(getData('test'))
console.log(outer(inner()))
console.log((a + b) * c)

// 函数调用测试
console.log(foo.bar())
console.log(new Date())
console.log(Array.from(set))

// 复杂混合测试
console.log(
  `用户 ${user.name}`,
  {
    id: user.id,
    time: new Date(),
    data: getData(user.id),
  },
  process.env.NODE_ENV === 'development' && '开发环境'
)

// 注释和特殊字符测试
console.log("包含'单引号'")
console.log('包含"双引号"')
console.log(`包含\`反引号\``)
console.log('包含/正斜杠/')
console.log('包含\\反斜杠\\')

// 正则表达式测试
console.log(/test/g)
console.log(new RegExp('test', 'g'))

// 特殊语法测试
console.log(...args)
console.log?.('optional chaining')

// 带注释的测试
console.log(
  'test', // 行尾注释
  /* 块注释 */ 'test2',
  'test3' /* 行内块注释 */
)

// 空参数测试
console.log()
console.log('')
console.log()

// 连续调用测试
console.log('test1')
console.log('test2')
console.log('test1')
console.log('test2')

// 条件语句中的测试
if (true) console.log('条件语句')
if (true) {
  console.log('条件语句块')
}

// 箭头函数中的测试
const fn = () => console.log('箭头函数')
const fn2 = () => {
  console.log('箭头函数块')
}

console.log(`console.log('test')`)

export const test = {
  mounted: {
    type: 'JSFunction',
    value: "function () {\n    console.log('did mount');\n  }",
    mounted2: {
      type: 'JSFunction',
      value: "function () {\n    console.log('did mount');\n  }",
    },
  },
  beforeMount: {
    type: 'JSFunction',
    value: "function () {\n    console.log('will unmount');\n  }",
  },
  beforeDestroy: {
    type: 'JSFunction',
    value: "function () {\n    console.log('will unmount');\n  }",
  },
}
