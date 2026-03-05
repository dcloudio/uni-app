## UTS 介绍

**uts 是什么**

uts，全称 uni type script，是一门跨平台的、高性能的、强类型的现代编程语言。

它可以被编译为不同平台的编程语言，如：
- web平台/小程序：编译为JavaScript
- Android平台：编译为Kotlin
- iOS平台：编译Swift
- 鸿蒙OS平台：编译为ArkTS

uts 采用了与 ts 基本一致的语法规范，支持绝大部分 ES6 API。

但为了跨端，uts进行了一些约束和特定平台的增补。

过去在js引擎下运行支持的语法，大部分在uts的处理下也可以平滑的在kotlin和swift中使用。但有一些无法抹平，需要使用条件编译。

和uni-app的条件编译类似，uts也支持条件编译。写在条件编译里的，可以调用平台特有的扩展语法。

### 用途和关系

uts是一门语言。也仅是一门语言，不包含ui框架。

uvue是DCloud提供的跨平台的、基于uts的、使用vue方式的ui框架。

uts相当于js，uvue相当于html和css。它们类似于v8和webkit的关系，或者类似于dart和flutter的关系。

uts这门语言，有2个用途：

1. 开发uni-app 和 uni-app x 的原生扩展插件：因为uts可以调用所有原生能力。
2. uts和uvue一起组合，开发原生级的项目，也就是 uni-app x 项目

从HBuilderX 3.9起，支持uni-app x项目。详见[uni-app x](../readme.md)

也就是说，uts可以在uni-app中使用，也可以在uni-app x中使用。

- 在uni-app中，主编程语言是js。uts可以开发原生插件，包括API插件和组件插件。
- 在uni-app x中，主编程语言是uts。不管是应用逻辑还是扩展插件，均使用uts编程。仅在Web平台和iOS的js驱动模式下可以使用js。

如果插件作者，开发了uts插件，也可以同时在uni-app和uni-app x中使用。比如这2个uts插件：
- 电量：[https://ext.dcloud.net.cn/plugin?id=9295](https://ext.dcloud.net.cn/plugin?id=9295)
- lottie组件：[https://ext.dcloud.net.cn/plugin?id=10674](https://ext.dcloud.net.cn/plugin?id=10674)

这2个uts插件，一个是api插件，一个是组件插件，它们同时兼容uni-app和uni-app x。

可以通过表格更清晰的了解uts语言在uni-app和uni-app x下的编译关系。

<table>
  <thead>
    <tr>
      <th></th>
      <th colspan="2">uni-app</th>
      <th colspan="2">uni-app x</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td>普通页面和脚本</td>
      <td>uts插件</td>
      <td>普通页面和脚本</td>
      <td>uts插件</td>
    </tr>
    <tr>
      <td>Web和小程序</td>
      <td>JS</td>
      <td>JS</td>
      <td>JS</td>
      <td>JS</td>
    </tr>
    <tr>
      <td>Android</td>
      <td>JS</td>
      <td>Kotlin</td>
      <td>Kotlin</td>
      <td>Kotlin</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td>JS</td>
      <td>Swift</td>
      <td>JS(JS驱动时)</td>
      <td>Swift</td>
    </tr>
    <tr>
      <td>HarmonyNext</td>
      <td>JS</td>
      <td>ArkTS</td>
      <td>x</td>
      <td>x</td>
    </tr>
  </tbody>
</table>

这里的概念解释是：
- uts插件，指`uni_modules`目录下utssdk目录下的代码
- 除uts插件外，其他都属于 `普通页面和脚本`，包含vue、nvue、uvue等页面及单独的uts文件
- 在uni-app x的iOS平台，目前`普通页面和脚本`是编译为js的，而不是Swift。
	这个策略主要是为了解决windows电脑开发uni-app x的问题。它并不影响性能，uni-app x的iOS通过优化解决了js性能问题。同时未来也会提供js驱动和Swift驱动双选

除了查阅表格，也可以简单的记3个原则：
1. 所有的uts插件，都会编译为原生语言
2. web和小程序上，原生语言就是js
3. App上，目前仅uni-app x的Android平台会编译为原生语言，其他都编译为js

本文是 uts 的基本语法介绍。
- 想了解 uni-app 下如何开发 uts插件，另见文档[https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html](../plugin/uts-plugin.md)
- 想了解 uni-app x，另见文档[https://doc.dcloud.net.cn/uni-app-x/](../readme.md)


## 类型声明

js是无类型的，TypeScript 的 type 就是类型的意思，给js加上了类型。它的类型定义方式是在变量名后面通过加冒号和类型来进行定义。

uts 中声明变量可以用 let 或 const，详见下。

### 变量定义（let）

声明一个可重新赋值的变量。语法 `let [变量名] : [类型] = 值;`。

> 相当于 TypeScript 中的 let、kotlin 中的 var、swift 中的 var。

```ts
let str :string = "hello"; // 声明一个字符串变量
str = "hello world"; // 重新赋值
```

类型除了 string 之外，更多类型见[数据类型](data-type.md)

### 常量定义（const）

声明一个只读常量，只能为其赋值一次。语法 `const [变量名] : [类型] = 值;`。

> 相当于 TypeScript 中的 const、kotlin 中的 val、swift 中的 let。

```ts
const str :string = "hello"; // 声明一个字符串常量
str = "hello world"; // 报错，不允许重新赋值
```

注意事项：

- 当前 uts 并未限制使用 `var` 来声明变量，但除非你知道你在做什么，否则不要轻易使用它，因为有不同平台差异：
	* 编译至 JavaScript 平台时，等同于 JavaScript 平台的 var 。存在变量提升现象，具体参考 [var和let的区别](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%A3%B0%E6%98%8E)
	* 编译至 Kotlin 平台时，等同于 Kotlin 平台的 var（允许重新赋值）
- swift 中 let 是定义常量，而 uts 和 ts 中，let 是定义变量。注意勿混淆。
- 类型定义的冒号，左右可以有一个空格，也可以没有空格。`let str:string` 和 `let str : string` 和 `let str :string` 和 `let str: string` 都是合法的。

### 变量命名规则

在 uts 中，使用变量名需要遵守一定的规则。

-   变量名称可以包含数字和字母。
-   除了下划线 \_ 外，不能包含其他特殊字符，包括空格。
-   变量名不能以数字开头。

### 方法参数及返回值类型定义

方法的参数、返回值，也通过冒号定义。

如下示例，方法test，有一个参数score，是number类型，方法返回值类型为boolean类型。

```ts
function test(score: number): boolean {
	return (score>=60)
}
test(61) // 返回true
```

方法无返回值时，使用`:void`。

```ts
function add(x :string, y :string) :void {
    let z :string = x + " " + y
	console.log(z)
	// 不需要return
}
```

函数另有详细文档，详见：[函数](function.md)

### vue data类型定义

vue 选项式开发时，冒号被用于赋值，无法通过let、const和冒号来定义data数据的类型。

此时可以使用[字面量](literal.md)赋值自动推导；也可以使用 `as` 关键字来显式声明类型。

```html
<script lang="uts">
	export default {
		data() {
			const date = new Date()
			return {
				s1 : "abc", // 根据字面量推导为string
				n1 : 0 as number, // 这里其实可以根据字面量自动推导，as number写不写都行
				n2, // 不合法，必须指定类型
				n3 as number, // 不合法，uts不支持undefined，必须通过冒号初始化赋值，哪怕赋值为null，见下
				n4 : null as number | null // 合法。定义为可为null的数字，初始值是null，但在使用n4前必须为其赋值数字。（number | null）是一个或的写法，前后顺序没有关系。uts的联合类型只支持 |null 。
				year: date.getFullYear() as number, // 在data里，目前无法通过变量类型推导data项的类型，需使用 as 显式声明类型为number
			}
		}
	}
</script>
```

上述示例仅在 uni-app x 的uvue页面生效。老版uni-app，即js引擎版，不支持在页面里写uts代码，只支持在uts插件里写uts代码。

### 变量提升

UTS 会被编译到各目标平台（Kotlin/Swift/TS/ETS），变量提升与顺序依赖的行为以目标语言为准。

#### 各平台差异

| 平台 | 目标语言 | 全局作用域（模块/插件顶层） | 局部作用域（函数/代码块内） |
|---|---|---|---|
| Android | Kotlin | 函数/变量可先使用后定义 | 函数/变量必须先定义后使用 |
| iOS | Swift | 函数/变量可先使用后定义 | 函数可先使用后定义；变量需先定义后使用 |
| HarmonyOS | ETS（ArkTS） | 函数/变量可先使用后定义 | 函数可先使用后定义；变量需先定义后使用 |
| Web | TypeScript | 函数可先使用后定义；变量需先定义后使用（var 例外） | 函数可先使用后定义；变量需先定义后使用（var 例外） |

#### uvue 作用域映射说明

- 选项式：export default 外部的代码属于`全局作用域`，遵循上表`全局作用域`的平台规则。
- 组合式：script内部属于`局部作用域`，遵循上表`局部作用域`的平台规则。

> 实践建议：
> - 跨平台项目尽量遵循先定义、后使用的风格，避免依赖各平台差异化的提升行为。

### 类型自动推导

#### 字面量推导

现代语言（ts、kotlin、swift），都具备自动识别[字面量](literal.md)，进行类型推导的功能。

即：如果开发者声明变量的同时，进行了初始化赋值。那么编译器可以根据赋值的[字面量](literal.md)，自动推导出变量类型，不必开发者显式声明。

在定义变量时如果直接赋值[字面量](literal.md)，而不使用冒号声明类型，也可以合法运行。

如下2种写法都是合法的，两个变量都是string类型：

```ts
// 以下每组写法是等价的
let s1 = "hello" // 根据字面量 "hello"，自动推导为string类型
let s2 : string = "hello"
let s3 : string
s3 = "hello"

let b1 = true // 根据字面量 true，自动推导为boolean类型
let b2 : boolean = true

// 以上为字符串和布尔的字面量类型自动推导，数字和数组也支持字面量类型推导，但规则比较复杂，需另见文档

```

在HBuilderX 3.9以前， uts 未对字面量赋值类型推导做统一处理，编译到 kotlin 和 swift 时，由这2个语言自行做类型推导。

但 kotlin 和 swift 的自动推导，在某些地方有细节差异。尤其是[数字字面量](data-type.md#autotypefornumber)和[数组字面量](data-type.md#autotypeforarray)。在这2个场景下，建议显式声明类型，不使用自动推导。

```ts
// 显式声明数字和数组类型
let n1:number = 1
let n2 = 1 as number
let n3:Int = 1
let a1:Array<string> = ["uni-app", "uniCloud", "HBuilder"]
let a1:Array<number> = [1,2,3,4]
```

HBuilderX 3.9+， uts 统一了字面量自动类型推导。

建议插件作者，除了boolean和string外，其他包括数字和数组在内的类型，尽量不使用字面量自动类型推导，而是显式声明类型。避免 uts 统一自动类型推导时引发的向下兼容问题。

在 HBuilderX 4.31 以前，对象字面量{}的推导，默认是UTSJSONObject，无论是变量声明，还是传参（除了uni、uniCloud等官方API）等场景，只要没有手动 as，均会推导为 UTSJSONObject 类型。

HBuilderX 4.31+，uts 增强了对象字面量的类型推导，会根据当前上下文，来推断是否是某个type定义的类型（如果type是定义在非当前文件，需要该type对外导出）

```ts
type User = {
	name: string
	age: number
}
function printUser(user: User){
	console.log(user) 
}
printUser({ name: 'zhangsan', age: 12 }) // 从 HBuilderX 4.31+ 起，无需手动 as User

function createUser(name : string, age : number) : User {
    return { name, age } // 从 HBuilderX 4.31+ 起，无需手动 as User
}
printUser(createUser({ name: 'zhangsan', age: 12 }))

```

#### 函数返回值类型推导

在 HBuilderX 4.31 以前，所有的函数如果有 return 语句，均需要主动声明返回值类型。

HBuilderX 4.31+，uts 增强了函数返回值类型的推导，会根据当前上下文，来自动推断补充当前函数的返回值类型

```ts
function test1() { // 自动推导返回值类型为 string
    return "test1"
}
function test2(arg : boolean) { // 自动推导返回值类型为 number | null
    if (arg) {
        return 1
    }
    return null
}
function test3(arg : boolean): any { // 暂不支持多个不同类型的返回值推导，需要主动声明为 any
    if (arg) {
        return 1
    }
    return "test2"
}
```

注意：目前函数返回值仅推导相同类型，或可为空类型，不支持多个类型的推导，比如 test3 函数，可能返回 string | number，此时需要主动声明为 any 类型。

#### 函数参数推导

在 HBuilderX 4.31 以前，函数赋值或作为参数时，当前函数的参数数量必须和目标函数保持一致。

HBuilderX 4.31+，uts 增强了函数参数数量的自动推导

```ts
type TestFn = (a1: string, a2: string) => void
function callTestFn(test: TestFn) {
  test('1', '2')
}
// HBuilderX 4.31 以前仅支持传递两个参数的函数
callTestFn((arg1, arg2) => {})
// HBuilderX 4.31+支持以下调用方式
callTestFn(() => {})
callTestFn((arg1) => {})
```

### 类型判断

判断类型，有好几种方案：[typeof](operator.md#typeof)、[instanceof](operator.md#instanceof)、[isArray](buildin-object-api/array.md#isarray)。

使用 typeof 可以判断布尔值、数字、字符串、函数。
```ts
typeof(true) == "boolean"
typeof("abc") == "string"

let n1 : number = 1
typeof(n1) == "number"
```

但如果使用 typeof 验证数组，会发现返回的类型值是"object"，这与浏览器是相同的逻辑。

如果想验证数组类型，需要使用如下方法：
```ts
const a1 = ["uni-app", "uniCloud", "HBuilder"]
console.log(Array.isArray(a1)) // 返回true
console.log(a1 instanceof Array) // 返回true
```

instanceof，除了验证数组，还可以验证类型，但注意它返回的不是具体类型，而是根据入参的一个boolean值。

```ts
let myDate = new Date();
console.log(myDate instanceof Date) // 返回true

uni.request({
	url: 'https://abc',
	success: (data) => {
		if (data.statusCode == 200) {
			const result = data.data as UTSJSONObject
			console.log(result instanceof UTSJSONObject) //返回true
		}
	},
	fail: () => {
		console.log('fail');
	}
});
```

详见：[typeof](operator.md#typeof)、[instanceof](operator.md#instanceof)

### 安全调用

js没有类型检查。而uts和ts都有严格的类型检查。

对于可为null的类型，调用时需要加问号，否则编译器会报错。

```ts
const s: string | null = null // s为一个可为null的字符串
console.log(s?.length) //除非前面已经给s赋值，否则调用s的方法和属性必须加?
```

安全调用有很多细节，详见[null类型](data-type.md#null类型)

### 代码语句的分割

uts的多个代码语句，以回车或分号分割。

多行时行尾的分号可以省略。如果写在一行，应以分号分割。

如下的代码都是合法的：

```ts
let a:number = 1 //行尾可以不加分号
let b:boolean = false; //行尾可以加分号
let c:number = 3 ; let d:number = 4 // 同行多语句需要用分号分割
```

## 设计思路@design
uts这门语言不是为了发明中国自己的语言而诞生的，它是为了寻找跨平台开发的最佳方案。

跨平台有几种做法：
1. 利用一种各平台都支持的语言，比如js。之前的uni-app就是这么做的。
2. 把A平台的语言翻译成B、C、D平台的语言。比如kotlin编译为js。
3. 重新设计一门与各平台无关的语言，独立的规范，较重的运行时。比如dart。还有跨windows、mac、linux的java，也是这种思路。

A翻译B、C、D其实是一条不归路。因为这些语言设计之初就是为了服务它自己的平台，所以A、B、C、D有很多无法兼容的设计，没办法顺畅翻译。想走这条路的产品终是妄念。

**所以如果开发者期待uts完全兼容ts，那就期待错了。ts直接翻译为kotlin、swift是不现实的**

而全新语言，又会有几个问题：
1. 较重的运行时，会增大发行包体积、增加内存消耗、减缓运行性能。
2. 新语言与系统原生语言需要通信，通信耗时会造成性能损失。详见[评测](../select.md)

而uts的设计，不是上述3种方案中的某个，也完美的规避了上述3个方案的缺点。

uts是全面了解ts、kotlin、swift、ArkTS等不同的语言后，全新设计的一套跨平台语言。

它抽象了各个平台语言的共性，保证了跨平台的兼容，比如uts设计了number类型，并且通过编译+运行时的综合方案，在全平台实现了number。

同时uts又支持各平台原生语言的所有特性，比如kotlin的int，只不过这些特性的写法需要写条件编译，因为它们无法跨平台。

由于编译为平台原生语言，所以uts天生没有跨语言通信成本，也不需要新语言较重的运行时，对包体积、内存占用、运行性能的影响非常小。

所以uts可以称为最佳的跨平台方案所需的底层语言。轻运行时、高性能、与原生语言无缝交互。

且uni-app x的渲染引擎是原生渲染，和原生的UI生态也无缝交互。不像自渲染那样引发混合渲染的各种问题。

但不容易兼得的是用户的历史习惯，uts在努力照顾ts开发者的习惯，尽可能贴近ts。
- 只有在编译到浏览器或小程序等js环境时，开发者才能完全使用所有ts特性
- 编译为kotlin和swift时，开发者需要做好准备，学习uts的跨平台约束

详见：[uts和ts的差异](./uts_diff_ts.md)

## 其他FAQ

- Q：使用uts，万一uts编译器有bug、干坏事，怎么办？
1. uts发展已经2年了，已经有上千个项目和插件上线，语言虽然还需要继续完善，但本身不存在影响项目发布的bug。
2. uts编译后的kt、swift代码，都在uni-app x项目的unpackage目录下，开发者都可以看到，可以放心使用。

- Q：uts不如js好用
1. 我们承认js的灵活和易用在所有编程语言里名列前茅。如果你认为基于js的uni-app已经能满足你的跨平台需求那也很好。如果你追求原生的性能体验，那么选择uts虽然需要一定的学习和适应成本，但我们相信这个成本比任何其他方案都低。
