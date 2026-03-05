## 字面量

字面量是js的传统概念（[MDN的字面量文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%AD%97%E9%9D%A2%E9%87%8F)）

字面量，即按字面意思给出的固定的值，而不是变量。

比如 `5`、`"abc"`、`true`，都是字面量。

字面量分：布尔字面量、数字字面量、字符串字面量、数组字面量、对象字面量、正则字面量。

举例：

```js
let a = 1 // 这里的 1 ，就是字面量


function test(score): boolean {
	return (score>=60)
}
test(61) // 这里的 61，就是字面量

let name = "zhangsan" // 字符串"zhangsan"是字面量

let nameArray = ["zhangsan","lisi"] // 数组是字面量

// 对象字面量
let user = {
	name: "zhangsan",
	age: 12
}

const re = /ab+c/  // 正则字面量

console.log("zhangsan".length) // 字面量会被自动推导类型，然后调用类型的方法和属性

```

平时js开发者很少会关心字面量的概念，但因为 uts 中涉及字面量自动类型推导，如果不学习，很难搞清楚这些字面量被自动推导成什么类型。

比如`let a = 1/10`，a会被自动推导成什么类型？是Int、double、还是number？值是0还是0.1？

下面我们来详细介绍每种字面量。


### 布尔字面量

布尔类型有两种字面量：`true` 和 `false`。

Boolean字面量的自动类型推导简单而统一，全平台必然被自动推导为布尔类型。


### 数字字面量

数字字面量包括多种基数的整数字面量和以 10 为基数的浮点数字面量


#### 整数字面量

整数可以用十进制（基数为 10）、十六进制（基数为 16）、二进制（基数为 2）表示。

- `十进制整数字面量`由一串数字序列组成，且没有前缀 0。如：`0`, `117`, `-345`

- `十六进制整数`以 0x（或 0X）开头，可以包含数字（0-9）和字母 a~f 或 A~F。如：`0x1123`, `0x00111` , `-0xF1A7`

- `二进制整数`以 0b（或 0B）开头，只能包含数字 0 和 1。如：`0b11`, `0b0011` , `-0b11`

#### 浮点数字面量

浮点数字面值可以有以下的组成部分：

- 一个十进制整数，可以带正负号（即前缀“+”或“ - ”），
- 小数点（“.”），
- 小数部分（由一串十进制数表示），
- 指数部分。

指数部分以“e”或“E”开头，后面跟着一个整数，可以有正负号（即前缀“+”或“-”）。浮点数字面量至少有一位数字，而且必须带小数点或者“e”（大写“E”也可）。

简言之，其语法是：

```
[(+|-)][digits][.digits][(E|e)[(+|-)]digits]
```

例如：

```ts
3.14
-.23456789 // -0.23456789
-3.12e+12  // -3.12*10^12
.1e-23    // 0.1*10^(-23)=10^(-24)=1e-24
```

数字字面量的类型推导，[详见](data-type.md#autotypefornumber)

### 字符串字面量@string

字符串字面量是由双引号（"）对或单引号（'）括起来的零个或多个字符。字符串被限定在同种引号之间；也即，必须是成对单引号或成对双引号。下面的例子都是字符串字面值：

```ts
"foo"
'bar'
"1234"
"one line \n another line"
"John's cat"
```

你可以在字符串字面值上使用字符串对象的所有方法，你也能用对字符串字面值使用类似 String.length 的属性：

```ts
console.log("John's cat".length)
// 将打印字符串中的字符个数（包括空格）
// 结果为：10
```

#### 模板字符串

模板字面量 是允许嵌入表达式的字符串字面量。你可以使用多行字符串和字符串插值功能。也被称为“模板字符串”。

```ts
// Basic literal string creation
`In uts '\n' is a line-feed.`

// Multiline strings
`In uts this is
 not legal.`

// String interpolation
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```

#### 转义特殊字符

|字符	|意思		|
|--		|--			|
|`\b`	|退格符		|
|`\f`	|换页符		|
|`\n`	|换行符		|
|`\r`	|回车符		|
|`\t`	|制表符		|
|`\'`	|单引号		|
|`\"`	|双引号		|
|`\\`	|反斜杠字符	|


### 数组字面量

数组字面值是一个封闭在方括号对 (`[]`) 中的包含有零个或多个表达式的列表，其中每个表达式代表数组的一个元素。当你使用数组字面值创建一个数组时，该数组将会以指定的值作为其元素进行初始化，而其长度被设定为元素的个数。

下面的示例用 3 个元素生成数组coffees，它的长度是 `3`。

```js
const coffees = ["French Roast", "Colombian", "Kona"]
```

数组字面值同时也是数组对象。


### 对象字面量@object-literal

在JS中，对象字面值是封闭在花括号对`{}`中的一个对象的零个或多个“属性名—值”对的（元素）列表。

在uts中，对象字面量赋值给变量，默认会被推导为[UTSJSONObject](data-type.md#utsjsonobject)类型。

```ts
// 创建对象
let userA = {
	name: "zhangsan",
	age: 12
}
console.log(userA)
```

对上述的userA进行typeof，得到的是object。进行 instanceof UTSJSONObject，得到的是true。也就是等同于：

```ts
// 创建对象
let userA:UTSJSONObject = {
	name: "zhangsan",
	age: 12
}
console.log(userA)
```

注意花括号还有一个使用场景，被用于type时，是定义了一个自定义类型。下面的代码通过type关键字定义了一个 User类型，该自定义类型有2个属性，string类型的name和number类型的age。

从 HBuilderX 4.31+ 起，编译器会根据上下文，自动推导对象字面量为type定义的类型。
```ts
type User = {
	name:string
	age:number
}
function printUser(user: User){
	console.log(user)
}
printUser({name: 'zhangsan',age: 12} as User) // 通过对象字面量 as User 构造一个 type 定义的 User 对象
printUser({name: 'zhangsan',age: 12}) // 从 HBuilderX 4.31+ 起，无需手动 as User

```

<!--
#### 如何使用对象字面量

在传统JS中，对象字面量的返回结果就是一个通用的object. 但是在 kotlin / swift 它是一个 支持下标访问，成员迭代等特性的看上去像是一个`object`的 `UTSJSONObject`实现。

我们可以使用下标、成员名称直接访问:
```js
let arrayObj = JSON.parse('["a","b","c"]')
console.log(arrayObj[0])

let userA = {
	name: "zhangsan",
	age: 12
}
console.log(user['name'])
```

也可以将其转换为Map对象，再实现遍历
```js
let userA = {
	name: "zhangsan",
	age: 12
}
let userMap = userA.toMap()
userMap.forEach(function(key:string,value:any){
    console.log(key)
    console.log(value)
})
```
 -->
### RegExp字面量

正则表达式是字符被斜线围成的表达式。下面是一个正则表达式文字的一个例子。

```ts
const re = /ab+c/
```

### 字面量类型

HBuilderX 3.91+ 支持使用数值字面量和字符串字面量用作类型注解，也支持联用多个相同类型的字面量以及 null 关键字。这些字面量类型仅用于方便编辑器的提示和校验，编译到目标语言后相当于 Number 或 String 类型。

```ts
type Str1 = 'a'
type Str2 = 'a' | null
type Str3 = 'a' | 'b'
type Str4 = 'a' | 'b' | null
type Num1 = 1
type Num2 = 1 | null
type Num3 = 1 | 2
type Num4 = 1 | 2 | null
```
