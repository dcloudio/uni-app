## 关键字

### this

安卓端this只会指向其所在的类的实例，而编译到js后this的值取决于它出现的上下文：函数、类或全局。参考： [MDN this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

以下述代码为例

```vue
<template>
  <view></view>
</template>
<script>
  export default {
    data() {
      return {
        title: '' 
      }
    },
    methods: {
      getTitle() {
        uni.request({
          url: 'xxx',
          success() {
            this.title = 'xxx'
          }
        })
      }
    }
  }
</script>
```

上述代码中的this在安卓端会指向页面/组件实例，在web端会指向uni.request的参数。为保证多端一致，建议在上面的场景使用this时搭配箭头函数。上述代码修改为下面的写法后即可兼容多端

```vue
<template>
  <view></view>
</template>
<script>
  export default {
    data() {
      return {
        title: '' 
      }
    },
    methods: {
      getTitle() {
        uni.request({
          url: 'xxx',
          success: () => {
            this.title = 'xxx'
          }
        })
      }
    }
  }
</script>
```


### 类型断言as@as

类型可能不明确、不唯一时，可以使用类型断言操作符 `as` 来为值指定类型。

常见于 any 类型的明确、字面量的明确，也可以用于可为空 `|null` 类型的明确。

```ts
const a: any = 'a'
a as string // as之后a就可以当做string直接使用了

const a: string | null = 'a'
a as string // 正常
```

当一个字面量可能成为多种类型时，可以通过as来明确具体类型。
```ts
// 数字字面量可以被指定为任何相容的数字类型
1.0 as Double
1.0 as number

// 对象字面量也可以as为USTJSONObject或某个type
{"id":1} as UTSJSONObject

type t = {
	id:number
}
{"id":1} as t
```

number数据类型与平台专有数字类型不应该直接使用as转换：
- number转平台专有数字类型应该使用 [Number对象](buildin-object-api/number.md) 的 toXXX 方法转换
```ts
let a:number = 1;

let i:Int = a.toInt()				// 正确
let i:Int = a as Int				// 错误

let f:Float = a.toFloat()		// 正确
let f:Float = a as Float		// 错误

let d:Double = a.toDouble()	// 正确
let d:Double = a as Double	// 错误

//系统API需要平台专有数字类型，也应该使用 toXXX 方法转换平台专有数字类型
systemAPI(a.toDouble())			// 正确
systemAPI(a as Double)			// 错误
```
- 平台专有数字类型应该使用  [Number.from()](buildin-object-api/number.md#from) 方法转换
```
let i:Int = 1;
let d:Double = 1.0;

let n:number = Number.from(i)	// 正确
let n:number = i as number		// 错误

let n:number = Number.from(d)	// 正确
let n:number = d as number		// 错误
```

> 虽然在某些情况下使用 as 转换也可以正常工作，但为了保证各平台兼容性推荐使用上述方法转换

只允许将类型as为具体或更不具体的类型，不能强制转换两个不可能兼容的类型：

```ts
const a: string = 'a'

a as any // 正确
a as string // 正确
a as number // 错误
```

USTJSONObject和type不相容，无法互相as。应该在初始的字面量或JSON.parse环节就决定好类型。

类型断言会在运行时进行，如果无法强制转换，类型断言运算符会引发异常：

```ts
const a: string | null = 'a'
a as string // 正常

a = null
a as string // 异常
```

以上代码中当值为 `null` 的时，强制转换为 `string` 会引发异常。为了让这样的代码用于可空值，请在类型断言的右侧使用可空类型：

```ts
a as string ｜ null // 正常
```

当 as 操作符的左侧为[对象字面量](./literal.md#object-literal)时，编译器会进行[特殊处理](./object.md#实例化)：自动创建类型对应的实例。

```ts
{ name: 'Tom', printName: function () { } } as Person
```

另外：当 `as` 用在[模块](./module.md)导入时，它和类型断言无关，其功能为[指定别名](./module.md#指定别名)。


### typeof实例类型获取@typeof

使用 `typeof` 运算符获取一个实例对象的类型，返回表示类型的字符串。

| 类型                						 			 | 结果             |
| ------------------------------------------------------ | ---------------- |
| null                						 			 | "object"         |
| boolean     		  						 			 | "boolean"        |
| number       		  						 			 | "number"         |
| string       		  						 			 | "string"         |
| function     		  						 			 | "function"       |
| 平台专有数字类型: Int, Float, Double, Long ... 		    | "Int","Float","Double","Long" ... |
| 平台专有字符串类型: Char ... 			                    | "Char" ... |
| 其他任何对象(包含但不限于：Date, Array, Map, UTSJSONObject) | "object"         |
| any                                                    | 实际类型 |


为了与web保持一致，typeof除了布尔、数字、字符串、函数外，全部返回object。如需判断object范围内的具体类型，需另见[instanceof](#instanceof)

用法示例：

```ts
let a = 10.0  //自动推断为number类型
let b: Double = 3.14
let c: Int = 2

typeof a == "number" //true
typeof b == "Double" //true
typeof c == "Int" //true

// string
let str = "hello uts"
typeof str == "string" //true

//boolean
let ret = true
typeof ret == "boolean" //true

//function
function fn(obj: string) {
  if (obj instanceof String) {
    // ...
  }
}

typeof fn == "function" //true
typeof Math.sign == "function" //true

//object
let obj = {
	"x": 1,
	"y": 2
}

typeof obj == "object" // true

typeof null == "object" //true
typeof [1, 2, 3] == "object" //true

```

**注意**
`typeof` 运算符的参数只能是实例对象，不能是类型，如下操作是错误用法：
```ts
type MyType = {
    name:string
}
typeof MyType   //报错
```

`typeof` 运算返回值一定是字符串，不会返回 TypeScript 类型，这与TypeScript存在差异：
```ts
type MyType = {
    name:string
}
let my:MyType = {name:"abc"}
type NewType = typeof my;   //报错
```

**特殊情况**
在Android平台，将 number 类型赋值给 any 类型变量时，会根据数值将类型转变为实际平台专有数字类型，使用 typeof 获取此 any 类型变量将会返回实际平台专有数字类型。
同样，将 number 类型保存在 UTSJSONObject 中，通过下标 `[""]` 获取对应的属性值类型为 any，使用 typeof 获取此属性值类型也将返回实际平台专有数字类型。

```ts
let a = 10.0    //自动推断为number类型
let b: Double = 3.14
let c: any = a
let d: any = b

typeof a == "number" //true
typeof b == "Double" //true
typeof d == "Double" //true

// 在 iOS 平台上
typeof c == "number" //true

// Android平台 HBuilder X 4.44之后 
typeof c == "number" //true


```

在Android平台，如果类型（或class）存在伴生对象（companion object）时，可以使用`typeof`运算符，返回的值为object，但不推荐这么使用

```ts
typeof Double   //在Android平台Double有伴生对象可以正常运行，实际值为object；在iOS平台报错
```


### instanceof实例类型判断@instanceof

使用 `instanceof` 运算符执行运行时检查，以标识对象是否符合给定类型。

| 类型                						 			 								| 结果             |
| ------------------------------------------------------------------------------------ 	| ---------------- |
| Boolean                						 		 								| 编译报错，不支持    |
| Number     		  						 			 								| 编译报错，不支持    |
| String       		  						 			 								| 编译报错，不支持    |
| 平台专有数字类型: Int, Float, Double, Long ... 			 								| true or false    |
| typeof 结果为 "object" 的类型(包含但不限于：Date, Array, Map, UTSJSONObject, 自定义类型)	| true or false    |

> 特别说明：
> HBuilderX3.9.0 使用 `instaceof` 对 Boolean, Number, String 类型的实例进行判断会编译报错，请使用 `typeof` 。在HBuilderX3.9.0之前版本可正常使用 `instaceof` 对上述类型的判断。


```ts
function fn(obj: any) {
  if (obj instanceof Date) {
    // ...
  }
}
```

包含[泛型](./generics.md)的类型，不能缺省泛型信息。如不需要判断具体的泛型类型，可以使用 `unknown` 表示任意泛型类型：

```ts
function fn(obj: any) {
  if (obj instanceof Map<unknown, unknown>) {
    // ...
  }
}
```

已经可以明确判断类型兼容性时无需使用 `instanceof` 在运行时进行判断，编译阶段会检查出这种情况会报错或者警告：

```ts
function fn(obj: Date) {
  if (obj instanceof Date) {
    // ...
  }
}
```

对于数字类型，`instanceof` 细化了判断逻辑，除了能判断是否是 number, 还能判断是否是 Int Float Double Int64 Long ... 等所有平台专有数字类型。

```ts

let a: Double = 3.14
let b: Int = 2

a instanceof Double //true
b instanceof Int //true

```

### await
> 3.93+ (Android)
await 操作符用于等待一个 [Promise](./buildin-object-api/promise.md) 兑现并获取它兑现之后的值。它只能在[异步函数](./function.md#async)中使用。
3.93 之前的版本请参考：[安卓 异步函数](../plugin/uts-for-android.md#thread-environment)

> 4.11+ （iOS）
在 iOS 平台上，HBuilderX 4.11 之前的版本，`uvue` 由于运行在 JS 环境中，可以正常使用 `Promise` `async` `await`, 但在 `uts 插件中` 不支持 `Promise`, 且对 `async` 和 `await` 的支持使用的是iOS 系统的异步函数，支持有限，且仅支持 iOS 13.0 及以上版本。参考文档：[iOS 异步函数](../plugin/uts-for-ios.md#async-method)
从 HBuilderX 4.11 版本开始，iOS 平台 `uts 插件中` 支持了 Promise / async / await。可以在 uts 插件中正常使用相关功能。 注意从这个版本开始，iOS 平台上的 async / await 不再是 iOS 系统的 async / awiait，也不再有 iOS 13.0 的系统最低版本号限制。[iOS Promise](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/promise.html)

```ts
async function test(): Promise<string> {
  return await Promise.resolve('hello world');
}
```


### 关键字列表

- `as` 
    * 用于类型转换。
    * 为导入指定一个别名
- `break` 
    * 中止当前循环，switch语句，并把程序控制流转到紧接着被中止语句后面的语句。
- `case` 
    * 与 `switch` 搭配使用。
- `catch` 
    * 与 `try` 搭配使用，捕获程序异常。
- `class` 
    * 声明创建一个新类。
- `const` 
    * 声明一个常量，不能重新赋值。
- `continue` 
    * 声明终止当前循环或标记循环的当前迭代中的语句执行，并在下一次迭代时继续执行循环。
- `debugger` 
    * 调用任何可用的调试功能，例如设置断点。 如果没有调试功能可用，则此语句不起作用。
- `default` 
    * 与 `switch` 搭配，匹配不存在时做的事情，也可以用于 `export` 语句。
- `delete` 
    * 用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放。（目前仅支持 `Javascript` 平台）
- `do` 
    * 创建一个执行指定语句的循环，直到condition值为 false。在执行statement 后检测condition，所以指定的statement至少执行一次。
- `else` 
    * 与 `if` 搭配使用。
- `export` 
    * 用于模块导出。
- `extends` 
    * 用于 `class` 继承。
- `finally` 
    * 与 `try-catch` 搭配使用。
- `for` 
    * 创建一个循环，它包含了三个可选的表达式，这三个表达式被包围在圆括号之中，使用分号分隔，后跟一个用于在循环中执行的语句（通常是一个块语句）。
- `function` 
    * 声明定义一个具有指定参数的函数。
- `if` 
    * 当指定条件为真，if 语句会执行一段语句。如果条件为假，则执行另一段语句。
- `import` 
    * 用于导入由另一个模块导出的绑定。
- `in` 
    * 可在 for 循环中迭代对象。
- `instanceof` 
    * 检测一个值具有指定类型。
- `new` 
    * 创建一个 `class` 实例。
- `return` 
    * 终止函数的执行，并返回一个指定的值给函数调用者。
- `super` 
    * 用于访问和调用一个对象的父对象上的函数。
- `switch` 
    * 评估一个表达式，将表达式的值与case子句匹配，并执行与该情况相关联的语句。
- `this` 
    * 引用当前接收者。
- `throw` 
    * 抛出一个异常。
- `try` 
    * 与 `catch` 搭配使用，捕获一个异常。
- `typeof` 
    * 返回一个字符串，表示未经计算的操作数的类型。
- `var` 
    * 声明一个变量，不建议使用。
- `void` 
    * 表示函数没有返回结果。
- `while` 
    * 在某个条件表达式为真的前提下，循环执行指定的一段代码，直到那个表达式不为真时结束循环。
- `with` 
    * 扩展一个语句的作用域链。（目前仅支持 `Javascript` 平台）
- `yield` 
    * 用来暂停和恢复一个生成器函数。（目前仅支持 `Javascript` 平台）
- `enum`
- `implements`
- `interface`
- `let`
- `package`
- `private`
- `protected`
- `public`
- `static`
- `await`
- `abstract`
- `boolean`
- `byte`
- `char`
- `double`
- `final`
- `float`
- `goto`
- `int`
- `long`
- `native`
- `short`
- `synchronized`
- `transient`
- `volatile`
