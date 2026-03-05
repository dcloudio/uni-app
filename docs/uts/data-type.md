# 类型@data-type

强类型语言的特点，是数据类型要求严格。它带来2个好处：

1. 高性能：明确的类型有更大的优化空间，在Android等OS上可以节省内存、提高运算速度；web端由于仍编译为js，不具有类型性能优化。
2. 安全的代码：强类型代码编写虽然没有弱类型自由，但类型检查、非空检查...等各种检查可以提高代码的健壮性。

如果您是js开发者，那么需要一定的学习过程来掌握 UTS 的类型系统。总体原则是你将牺牲一些代码的灵活性，来换取代码的健壮性和高性能。

所谓 类型，即 type，用于对有相同特征的变量或值进行归类。

比如 `"abc"`和`"你好"`，都属于字符串string，所有string类型有相同的方法、属性，比如`.length`属性获取字符串长度。

UTS 的类型有：

- 基础类型：boolean、number、string、any、null，都是小写。前3个typeof返回类型名称，null的typeof是object，any的typeof是运行时值的类型。
- 对象类型：Date、Array、Map、Set、UTSJSONObject，首字母大写。typeof返回"object"，判断准确类型需使用 instanceof
- 使用 type 来自定义类型
- 特殊类型：function、class、error。
- 平台专有类型：BigInt、Int、Float、Double、NSString、kotlin.Array...

除了特殊类型，其他类型都可以在变量后面通过`:`加类型名称来给这个变量声明类型。

详细的类型判断详见操作符文档：[typeof](operator.md#typeof)和[instanceof](operator.md#instanceof)

除了上述`运行时类型`，uts还有`开发时类型`的概念，指为了在开发期间ide可以更好的进行代码提示和校验，但在编译后这些类型会被擦除，变成`运行时类型`。详见[开发时类型](#devtype) 和 [类型擦除](#type-erasure)

## 布尔值（boolean）

布尔是简单的基础类型，只有2个值：`true` 和 `false`。

```ts
let a:boolean = true // 定义类型并赋值字面量
let b = false // 未显式声明类型，但根据字面量可自动推导为布尔类型
let c:boolean // 定义类型但定义时未赋值
c = true // 后续为变量赋值字面量
```

**注意：**

- 在js里，true == 1、 false == 0。但在其他强类型语言里，`1`和`0`是数字类型，无法和布尔类型相比较。
- 注意 boolean 不要简写成 bool

## 数字（number）

在 ts 中，数字不区分整型和浮点，就是一个 number。但在 kotlin 和 swift 中，数字需要是一个确定类型，比如 Int、Float、Double，没有泛数字。

UTS 在iOS和Android平台上新增了 number 类型，拉齐了web端的实现，方便开发者写全端兼容代码，也降低web开发者使用 uts 的门槛。

number 是一个泛数字类型，包括整数或浮点数，包括正数负数。例如： 正整数 `42` 或者 浮点数 `3.14159` 或者 负数 `-1` 。

```ts
let a:number = 42       //a为number类型
let b:number = 3.14159  //b为number类型
let c = 42              //注意：HBuilder X 4.41之后版本 c为number类型，之前版本推导c为Int类型，
let d = 3.14159         //注意：HBuilder X 4.41之后版本 d为number类型，之前版本推导d为float类型
```

- 编译到kotlin平台时，number 利用 kotlin的 `Number`抽象类实现
- 编译到swift平台时，number 利用 `NSNumber` 实现

### 平台专有数字类型

除了 number 类型，UTS 在 不同平台，也可以使用 kotlin 、 swift 、浏览器的专有数字类型。

日常开发使用 number 类型就可以。但是也有需要平台专有数字类型的场景：

1. 在 kotlin 和 swift 中，调用系统API或三方SDK的入参或返回值的类型，强制约定了平台专有数字类型。比如入参要求传入 Int，那么传入 number 会报错。比如方法返回了一个 Int，使用 number 类型的变量去接收，也会报错。
2. number 作为泛数字，性能还是弱于Int。在普通计算中无法体现出差异，但在千万次运算后，累计会产生毫秒级速度差异。

请注意：
number本身的使用很简单，但混入了平台专有数字类型后，会引出很多细节需要学习。

- 如果您不调用原生API，初学uts时建议跳过本节，直接往下看string类型。
- 如果您是插件作者，那请务必仔细阅读本章节。

#### Kotlin 专有数字类型 @kotlinnumber

|类型名称|长度  |最小值       |最大值          |描述|
|:--     |:---  |:---         |:---           |:-- |
|Byte    |8bit  |-128         |127            |整型|
|UByte   |8bit  |0            |255            |整型|
|Short   |16bit |-32768       |32767          |整型|
|UShort  |16bit |0            |65535          |整型|
|Int     |32bit |-2147483648  |2147483647     |整型|
|UInt    |32bit |0            |4294967295     |整型|
|Long    |64bit |-9223372036854775808 |9223372036854775807     |整型|
|ULong   |64bit |0            |9223372036854775807 * 2 + 1     |整型|
|Float   |32bit |1.4E-45F     |3.4028235E38                    |[浮点型](https://kotlinlang.org/docs/numbers.html#floating-point-types)|
|Double  |64bit |4.9E-324     |1.7976931348623157E308         |[浮点型](https://kotlinlang.org/docs/numbers.html#floating-point-types)|

+ 特别说明:

基本数据类型会有jvm编译魔法加持，kotlin 会把 Int / Double 等非空类型编译为 基本数据类型，Int? / Double? 等可为空的类型编译为 Integer等包装类型，享受不到编译优化加持。

如果涉及大量运算，建议开发者不要使用 number、Int? ，要明确使用 Int等类型 [详情](https://kotlinlang.org/docs/numbers.html#numbers-representation-on-the-jvm)

HBuilderX 4.41 之后版本： typeof 实际类型为number，声明类型为any，永远返回number； typeof 实际类型为number，声明类型为double等原生类型，会返回对应的原生类型名称，比如Double

#### Swift 专有的数字类型 @swiftnumber

|类型名称    |长度   |最小值        				|最大值          					|描述|
|:--     	|:---  |:---         				|:---           					|:-- |
|Int8    	|8bit  |-128         				|127            					|整型|
|UInt8   	|8bit  |0            				|255            					|整型|
|Int16   	|16bit |-32768       				|32767          					|整型|
|UInt16  	|16bit |0            				|65535          					|整型|
|Int32      |32bit |-2147483648  				|2147483647     					|整型|
|UInt32     |32bit |0            				|4294967295     					|整型|
|Int64      |64bit |-9223372036854775808 		|9223372036854775807     			|整型|
|UInt64   	|64bit |0                    		|9223372036854775807 * 2 + 1     	|整型|
|Int  		|64bit |-9223372036854775808 		|9223372036854775807     			|整型(64位平台下)|
|UInt   	|64bit |0                 	 		|9223372036854775807 * 2 + 1     	|整型(64位平台下)|
|Int  		|32bit |-2147483648      	 		|2147483647     				  	|整型(32位平台下)|
|UInt   	|32bit |0            	  	 		|4294967295     				  	|整型(32位平台下)|
|Float   	|32bit |1.1754944E-38     	 		|3.4028235E38                    	|单精度浮点型|
|Float16   	|16bit |6.104e-05         	 		|65504.0                    		|半精度浮点型(仅iOS14.0及以上系统支持)|
|Float32   	|32bit |1.1754944E-38     	 		|3.4028235E38                    	|单精度浮点型，等同Float|
|Float64   	|64bit |2.2250738585072014E-308     |1.7976931348623157E308             |双精度浮点型，等同Double|
|Double  	|64bit |2.2250738585072014E-308     |1.7976931348623157E308         	|双精度浮点型|

**注意：**

- Swift 中 Int 类型是根据平台动态的，在 32 位设备下等同于 Int32, 在64位设备下等同于 Int64。因此建议整型使用 Int, 除非必要，且在保证不会溢出的场景下才使用 Int32、Int64。
- 同样，Swift 中的 UInt 类型也是根据平台动态的，在 32 位设备下等同于 UInt32, 在64位设备下等同于 UInt64。建议使用 UInt，非必要不使用 UInt32、UInt64。
- Float16 在 iOS14.0 及以上系统上才能使用，使用时注意做系统版本号判断。[参考](https://uniapp.dcloud.net.cn/plugin/uts-uni-api.html#设备)
- Float32 是 Float 的类型别名, 两者等价。
- Float64 是 Double 的类型别名, 两者等价。

#### js专有的数字类型@jsnumber

js的专用数字类型是BigInt。[详见](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#bigint_%E7%B1%BB%E5%9E%8B)

#### 专有数字类型的定义方式

使用下面的方法，虽然可能会被编辑器报语法错误（后续HBuilderX会修复这类误报），但编译到 kotlin 和 swift 运行是正常的。

- 声明特定的平台数字类型

> 平台专有数字类型，均为首字母大写，注意与 number 首字母小写是不同的

```ts
// #ifdef APP
 //注意 Int 是首字母大写
let a:Int = 3
let b:Int = 4
// Double
let c:Double  = a * 1.0 / b
//Float
let d2 = (100 as Number).toFloat()
// 变量范围为 -128至+127 如果超出此范围会报错
let e:Byte = 127
// #endif
```

* 注意iOS和Android的专有数字类型不能在web端和小程序端使用，如工程需兼容非App端，要把这些代码放入条件编译中；
* iOS和Android都有的类型，比如Int，编译后可跨2个平台；但如果使用了某平台专有的数字类型，比如swift的Int8，则此代码不能编译到Android，工程如需支持Android，则把这些代码写在条件编译中。

```ts
// #ifdef APP-IOS
let d:Int8 = 1 // Int8是swift平台专有类型
// #endif
```

这些专有类型定义后，可以使用kotlin和swift为其提供的各种方法，具体参考kotlin和swift的文档。

### 字面量类型自动推导@autotypefornumber

具体值，比如`42`、`"abc"`，称之为[字面量](literal.md)

字面量可以直接用于赋值、传参，比如 `let a = 42`，就是把`42`这个数字字面量赋值给了a。

不管是 ts 、kotlin 还是 swift，都具备字面量自动推导类型的能力，为 a 自动推导合适的类型。

**在HBuilderX 3.9版之前，在未显式声明类型的情况下使用数字字面量赋值、传参，由平台语言自动推导为相应的类型**

但不同平台，推导结果不一样。

- ts 中，a 被推导为 number
- kotlin 中，a 被推导为 Int
- swift 中，a 被推导为 Int

上述只是一个简单的示例，再看一个复杂的例子，`let a = 1/10`。

a 会被自动推导成什么类型？是Int、double、还是number？值是0还是0.1？在不同平台的差异更大。

在web端，a 的类型是 number，值是0.1，但在 kotlin 中，类型是 Int，值是0。

**HBuilderX 3.9起，uts 提供了2条新的字面量类型推导规则：**

- 规则1. 在定义变量时，若没有显式声明变量类型，通过数字字面量以及数字字面量组成的运算表达式来给变量赋值，此时变量类型默认推导为 number类型

举例说明：

* HBuilderX3.9前，运行到App，由kotlin和swift编译器推导

```ts
let a = 1  // 类型为Int
let b = 1/10 // 类型为Int，值为0
```

* HBuilderX3.9起，运行到App，未显式声明类型的变量，需根据数字字面量推导变量类型，此时由 uts 编译器推导，变量类型默认为 number

```ts
let a = 1  // 类型为number
let b = 1/10 // 类型为number，值为0.1
```

如您已经显式声明变量类型，无需自动推导，则不受上述规则变化影响。不管HBuilderX 3.9之前还是之后，以下代码都是一样的

```ts
let a:Int = 1  // 类型为Int
```

`let a = 1`，a从Int变成number，这是一个**无法向下兼容的更新**，请开发者注意调整。

但`let b:Int = 1/10` 会在 HBuilderX 3.9+起报错，原因见下面第二条规则。

再澄清下规则1：

* 如果定义变量时已经显式声明了类型，和规则1无关
* 如果不是定义变量，和规则1无关

也就是如下代码中，`60`这个字面量的处理，和规则1无关，不会把这个`60`改为number类型

```ts
function test(score: Int): boolean {
	return (score>=60)
}
test(60) // 这个60可以正常传入，无论HBuilderX 3.9之前还是之后
```

- 规则2. 纯数字字面量的除法，其结果会变成number

在HBuilderX 3.9以前，字面量除法也由kotlin和swift自动推导，kotlin下存在一个问题，看如下代码：

```ts
function test(score: number): boolean {
	return (score>=60)
}
test(1/10) // 报错，类型不匹配。需要number而传入Int
```

这个问题看着有点诡异，其实是由于kotlin推导字面量时，把1/10推导成了Int，且值为0。然后把Int类型的数字传给需要number入参的函数test时，就会报类型不匹配。

为了解决这个问题，从HBuilderX 3.9起引入了一条字面量除法规则：**纯数字字面量的除法，结果一定是number**。

引入这个规则后，上述代码就可以正常运行了。

这里的`纯数字字面量的除法`，指除法表达式中除了数字和运算符，不包括任何其他东西：

- 比如变量：`let a:Int=1;let b:Int= a/1`
- 比如使用 as 断言：`(1 as Int)/10`
  以上除法表达式，都不是“纯数字字面量的除法”，都不会被推导为number。

但是这条规则，也会导致一个**向下兼容问题**。

下面的代码在HBuilderX 3.9之前是可以正常运行的，但在3.9起会报错，因为1.0/10被转为了number类型，传入需要Double的函数时就会类型不匹配。

```ts
function test(score: Double): boolean {
	return (score>=60.0)
}
test(1.0/10)
```

在HBuilderX 3.9后，为了正确传入Double，要注意跳过规则2。避免纯数字字面量除法，所以正确的写法是：

```ts
function test(score: Double): boolean {
	return (score>=60.0)
}
test((1.0 as Double)/10) //表达式中任意一个数字as一下，都不会走规则2
```

也就是，在纯字面量除法时，原生和js冲突了。uts选择了遵守js开发者的习惯，而原生开发者使用平台专有类型时则需注意使用`as`来规避。

### 各种数字类型之间的转换

对number类型的数字，使用to方法转换为平台专有类型。

而[Number.from()](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/number.html#from) 方法传入一个平台专有类型的数字，则可以转换为number。

#### kotlin

所有的 number 都支持下列方法进行转换（部分类库API使用java编写，其要求的java类型与下列kotlin类型完全一致，可以直接使用）

* [toByte(): Byte](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/number.html#tobyte)
* [toShort(): Short](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/number.html#toshort)
* [toInt(): Int](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/number.html#toint)
* [toLong(): Long](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/number.html#tolong)
* [toFloat(): Float](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/number.html#tofloat)
* [toDouble(): Double](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/number.html#todouble)

另外 `number` 还内置了以下函数进行无符号整型转换，这部分API 在jvm上没有对应的原始数据类型，主要的使用场景是 色值处理等专业计算场景下的`多平台拉齐`

* toUByte(): UByte
* toUShort(): UShort
* toUInt(): UInt
* toULong(): ULong

```ts
let a:number = 3
a.toInt() // 转换为 Int 类型。注意和parseInt、Math.floor的区别。
a.toFloat() // 转换为 Float 类型，后续也将支持 new Float(a) 方式转换
a.toDouble() // 转换为 Double 类型，后续也将支持 new Double(a) 方式转换

// 转换为 Byte 类型，超出-128至+127会溢出，结果为：-31
let b = (225 as Number).toByte()

//平台专有类型之间，也可以使用to方法转换
let i:Int = 1
i.toDouble() // 转换为 Double 类型
```

把 kotlin 专有数字类型，转换为number，使用Number.from()方法

```ts
let a: Int = 1
let a1 = Number.from(a) // Int转number

let b: Float = 3.14.toFloat()
let b1 = Number.from(b)

let c: Double = 3.1414926
let c1 = Number.from(c)

let e: Long = 2147483649
let e1 = Number.from(e)
```

#### swift

swift与kotlin类似。使用to方法和Number.from方法互相转换。

```ts
// number转成平台特有类型
let a:number = 3
a.toInt() // 转换为 Int 类型
a.toFloat() // 转换为 float 类型
a.toInt64() // 转换为 Int64 类型

// 平台特有类型转成number
let f: Float = 5.0
let n = Number(f)
let i = Number.from(3.14)
let j = Number.from(f)

let d: Int64 = 12306
let d1 = Number.from(d)

// 特定类型转成其他的特定类型
let a:Int = 3
let b = new Double(a) // 将整型变量 a 转换为 Double 类型
```

### number的边界说明

- 在不同平台上，数值的范围限制不同，超出限制会导致相应的错误或异常
  * 编译至 JavaScript 平台时，数值范围为 ±1.7976931348623157e+308，超出范围会返回 `Infinity` 或 `-Infinity`。
  * 编译至 Kotlin 平台时，整型的数值范围为 -9223372036854775808 到 9223372036854775807，超出范围会报错：`The value is out of range‌`。浮点型的数值范围为 ±1.7976931348623157e+308，超出范围会返回 `Infinity` 或 `-Infinity`。平台专有数字类型范围 [详见](#kotlinnumber)。
  * 编译至 Swift 平台时，整型的数值范围为 -9223372036854775808 到 9223372036854775807，浮点型的数值范围为 ±1.7976931348623157e+308，超出范围会报错：`integer literal overflows when stored into 'NSNumber'`。平台专有数字类型范围 [详见](#swiftnumber)

### 运算和比较

既然数字类型有很多，就涉及跨类型的数字之间的运算和比较的问题。

跨类型数字的运算，比如加减乘除取余，是什么样的？Int+number可以吗？详见 [算数运算符](operator.md#arithmeticdifftype)

跨类型数字的比较，大于小于等于不等于的规则是什么样的？详见 [比较运算符](operator.md#comparisondifftype)

### 更多API

Number内置对象还有很多API，[详见](buildin-object-api/number.md)

## 字符串（string） @string

字符串是一串表示文本值的字符序列，例如：`"hello world"`。

string在多平台均可良好兼容。

```ts
let s1:string = "abc"  //显式声明string类型并赋值
let s2 = "abc" // 根据字符串字面量"abc"，自动推导为string类型
let s3:string
s3 = "abc"
```

### 平台专有字符串类型

#### iOS 的 NSString

app-ios平台上原生有 NSString ，某些系统API或者三方库API可能使用NSString类型的字符串参数或者返回值。

定义NSString

```ts
let nstr = NSString(string="123") // 类型为NSString
```

可按照下面的方法在 string 和 NSString 之间转换：

- string 转 NSString

```ts
let str = "abcd" // 类型为string
// 方式一：
let nstr1 = NSString(string=str)  // 类型为NSString
// 方式二：
let nstr2 = str as NSString  // 类型为NSString
```

- NSString 转 string

```ts
let nstr3 = NSString(string="123") // 类型为NSString
// 方式一：
let str4 = String(nstr3)  // 类型为string
// 方式二：
let str5 = nstr3 as string  // 类型为string
```

边界情况说明：

- 在不同平台上，字符串的长度限制不同，超出限制会导致相应的错误或异常
  * 编译至 JavaScript 平台时，最大长度取决于 JavaScript 引擎，例如在 V8 中，最大长度为 2^30 - 25，超出限制会报错：`Invalid string length`；在 JSCore 中，最大长度为 2^31 - 1，超出限制会报错：`Out of memory __ERROR`。
  * 编译至 Kotlin 平台时，最大长度受系统内存的限制，超出限制会报错：`java.lang.OutOfMemoryError: char[] of length xxx would overflow`。
  * 编译至 Swift 平台时，最大长度也受系统内存的限制，超出限制目前没有返回信息。

#### Android 中的 Char 和 CharArray

app-android平台存在一种 `kotlin.Char` 类型  [文档地址](https://kotlinlang.org/docs/characters.html) ，与UTS中长度为1的字符串比较类似。

为了更好的平台兼容性，开发者在UTS中应该尽量避免使用 `kotlin.Char` 类型，当原生API 要求`kotlin.Char` 类型或 `kotlin.CharArray`类型时，可以通过下面的代码进行转换：

+ `string` 转 `kotlin.CharArray`

```uts
let kotlinCharArray = "hello".toCharArray()
console.log("CharArray",kotlinCharArray);
```

+ 截取 `string` 中的`kotlin.Char`

```uts
let singleChar = "hello".toCharArray()[0]
console.log("singleChar",singleChar);
```

当我们需要从`kotlin.CharArray`中还原字符串时，可以使用下面的代码

```uts
let arrayMock = Array<kotlin.Char>()

arrayMock.add("h".toCharArray()[0])
arrayMock.add("e".toCharArray()[0])
arrayMock.add("l".toCharArray()[0])
arrayMock.add("l".toCharArray()[0])
arrayMock.add("o".toCharArray()[0])

console.log(arrayMock.joinToString(""));
```

## any类型 @any

有时会遇到在编程阶段还不清楚类型的变量。这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。

这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。那么我们可以使用 `any` 类型来标记这些变量：

```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

```ts
let list: any[] = [1, true, "free"];
list[1] = 100;
```

**注意**

- 在 TS 中可以将 null 赋值给 any 类型的变量，但是在 Swift 和 Kottlin 中，any 类型属于非空类型，也就是不能将 null 赋值给 any 类型的变量。因此 在 UTS 中 也不能将 null 赋值给 any 类型，以免编译失败。
- 4.18版本起uts在编译到js时，any类型会包含null类型。
- 4.41版本起：app-android平台将kotlin专有数字类型赋值给 any 类型变量后，typeof 此变量将返回为 number 类型，4.41版本之前 typeof 此变量可能会返回kotlin专有数字类型。

## null类型 @null
一个表明 null 值的特殊关键字，作为字面量赋值使用时用于表示“空值”或“不存在的值”。

null类型是一种特殊类型，在 app-android/app-ios 平台不能作为变量独立的类型，需与其他类型联合使用，表示变量可为“空值”。

```ts
let t1:null = null; // app-android/app-ios不支持将变量声明为null类型
let t2 = null;  // app-ios不支持将变量自动推导为null类型，app-android平台虽然支持但类型不可预期
function t3(t:null) { // app-android/app-ios不支持将函数参数申明为null类型
}
function t4(): null {  // app-android/app-ios不支持将函数返回值申明为null类型
	return null;
}

// 正确写法
let t1:any|null = null;
let t2:any|null = null;
function t3(t:any|null) {
}
function t4(): any|null {
	return null;
}
```

null类型可以用于消除来自代码空引用的危险。

许多编程语言中最常见的陷阱之一，就是访问空引用的成员会导致空引用异常。在 Java 中，这等同于 NullPointerException 或简称 NPE。

在 uts 中，类型系统能够区分一个引用可以容纳 null （可空引用）还是不能容纳（非空引用）。 例如，string 类型的常规变量不能容纳 null：

```ts
let a: string = "abc" // 默认情况下，常规初始化意味着非空
a = null // 编译错误
```

### 定义可为null

如果要允许为空，可以声明一个变量为可空字符串（写作 string | null）

```ts
let b: string | null = "abc" // 可以设置为空
b = null // ok
```

现在，如果你调用 a 的方法或者访问它的属性，它保证不会导致 NPE，这样你就可以放心地使用：

```ts
const l = a.length //返回3
```

但是如果你想访问 b 的同一个属性，那是不安全的，并且编译器会报告一个错误：

```ts
const l = b.length // 错误：变量“b”可能为空
```

我们要庆幸编译器的报错，因为如果编译器放过后，在线上运行时万一真的为空，那会导致崩溃。

除了变量，类型的属性也可以为null。此时可以和变量一样使用` | null`，还可以用`?:`来代表可选

```ts
type obj = {
	id : number,
	name : string,
	age : number | null,
	sex ?: boolean
}
```

方法参数的可为空，也就是可选参数，其实意思是该参数有默认值，你可以不填，不填就使用默认值，具体见[function](function.md#默认参数)

### 安全的访问null

定义可为空后，如何安全访问？

#### 1. 代码中判空后再使用

如果你的代码已经判空，则编译器不会再告警。你可以显式检测 b 是否为 null，在不为 null 的情况下调用 b 的属性和方法。

```ts
if (b != null) {
  console.log(b.length) //返回3
}
```

编译器会跟踪所执行检测的信息，并允许你在 if 内部调用 length。

#### 2. 不判空，使用`?.`进行安全调用

访问可空变量的属性的第二种选择是使用安全调用操作符 `?.`

```ts
const a = "uts"
const b: string | null = null
console.log(a.length) // a是明确的string类型，它的属性可以直接调用，无需安全调用
console.log(b?.length) // b可能为null，null没有length属性，在没有判空时，.操作符前面必须加?标记
```

如果 b 非空，就返回 b.length，否则返回 null，`b?.length`这个表达式的类型是 number | null。

安全调用在链式调用中很有用。例如，一个员工 Bob 可能会（或者不会）分配给一个部门。 可能有另外一个员工是该部门的负责人。获取 Bob 所在部门负责人（如果有的话）的名字，写作：

```ts
bob?.department?.head?.name
```

如果任意一个属性（环节）为 null，这个链式调用就会返回 null。

### 空值合并

空值合并运算符（??）是一个逻辑运算符，当左侧的操作数为 null 时，返回其右侧操作数，否则返回左侧操作数。

```ts
const foo = null ?? 'default string';
console.log(foo);
// Expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// Expected output: 0
```

### 非空断言

非空断言运算符（!）将任何值转换为非空类型。可以写 b! ，这会返回一个非空的 b 值（例如：在我们示例中的 string）或者如果 b 为 null，就会抛出一个异常。

```ts
const l = b!.length
```

### vue data中null的用法

很多时候，data的数据需要通过script获取，而 uts 编译为非js时不支持 undefined，初始化时就只能赋null。一旦定义可为null后，调用时就需要用`?.`操作可选属性。

```html
<script lang=uts>
	type PersonType = {
		id: number,
	  name: string,
		age: number
	}
	export default {
		data() {
			return {
				person: null as PersonType | null,
			}
		},
		onLoad() {
			this.person = JSON.parse<PersonType>(`{
				"id": 1,
				"name": "zhangsan",
				"age": 18
			}`)
			console.log(this.person?.name);
		}
	}
</script>
```

## undefined

> 此类型仅在目标语言为js时支持

undefined是弱类型语言的特色，在js环境下，`undefined == null`的结果是`true`。

在kotlin和swift环境下，是没有undefined的，空就是null。

当需要跨平台判空时，可以利用js下`undefined == null`的特性，用 `== null`来跨平台的判断一个值是不是空值。

```ts
let a: number | undefined = undefined
let b: number | undefined = 1
console.log(a == null) // true
console.log(b == null) // false
```

HBuilderX 4.31之前的版本，在编译为kotlin或swift时，uts不会自动推断函数的返回值，因此在函数返回值并非undefined类型时需要自行添加返回值的类型信息。例如如下代码

```ts
const arr: number[] = [1,2,3]

// 错误写法
const arr1: number[] = arr.map((item: number) => {
	return item + 1;‌
});

// 正确写法
const arr2: number[] = arr.map((item: number): number => {
  return item + 1;‌
});
```

## void @void

- 作为类型时，通常用于表示一个[函数不需要返回值](function.md#无返回值的函数-void)

  * 编译为Kotlin时，对应：Unit
  * 编译为Swift时，对应：Void
  * 编译为ArkTS时，对应：void

- 作为操作符时，用于返回 undefined

  > 仅在目标语言为js时支持

## 日期（Date）@date

日期对象表示日期，包括年月日时分秒等各种日期。

它的类型名称是首字母大写`:Date`。但通过new Date()赋值时，可以省略`:Date`。

```ts
const myDate = new Date() // 通过new Date赋值时，可以省略:Date
const myDate1:Date = new Date()
console.log(myDate instanceof Date) // Date用typeof会返回object，需使用instanceof判断
const year:number = myDate.getFullYear()
```

在js中，Date其实是内置对象，typeof一个日期，返回的是`object`。

Date对象还有很多方法属性，[详见](buildin-object-api/date.md)

#### 与平台日期对象的转换

如果需要将`Date` 与java平台自带的`java.util.Date`转换，建议使用时间戳作为关键参数进行转换处理：

+ Date 转 java.util.Date

```uts
import JavaDate from 'java.util.Date' ;

let utsDate = new Date("1998-02-02 01:03:01")
let javaDate = new JavaDate(utsDate.getTime().toLong())
```

+ java.util.Date 转 Date

```uts
import JavaDate from 'java.util.Date' ;

let javaDate =  new JavaDate(1709208329000)
let utsDate = new Date(javaDate.getTime())
```

## 字节数组（ArrayBuffer）@arrayBuffer

ArrayBuffer对象用来表示通用的原始二进制数据缓冲区。它是一个字节数组，通常在其他语言中称为byte array。你不能直接操作ArrayBuffer中的内容；而是要通过类型化数组对象对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

### 定义字节数组

```ts
//直接使用ArrayBuffer初始化类型化数组
const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);

// 使用of方法
var array = Int32Array.of(1, 2, 3)

//使用from方法
var array = Int32Array.from([1, 2, 3], (v : number, _ : number) : number => v + v);

//ArrayBuffer.fromByteBuffer() 静态方法用于将android 原生的ByteBuffer对象转换为ArrayBuffer
 var byteBuffer = ByteBuffer.allocate(100)
 byteBuffer.put(1)
 byteBuffer.put(2)
 var buffer = ArrayBuffer.fromByteBuffer(byteBuffer)
 console.log('arraybuffer_toByteBuffer', buffer)

//ArrayBuffer 实例的 toByteBuffer() 方法返回一个android原生ByteBuffer对象。
 byteBuffer = buffer.toByteBuffer()
 console.log('arraybuffer_toByteBuffer', byteBuffer)
 byteBuffer.rewind()
 console.log(byteBuffer[0])//1
 console.log(byteBuffer[1])//2
```

### 类型化数组对象

[Float32Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/float32array.html)

[Float64Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/float64array.html)

[Int8Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/int8array.html)

[Int16Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/int16array.html)

[Int32Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/int32array.html)

[Uint8Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/uint8array.html)

[Uint8ClampedArray](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/uint8clampedarray.html)

[Uint16Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/uint16array.html)

[Uint32Array](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/uint32array.html)

[DataView](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/dataview.html)

### 更多API

ArrayBuffer作为内置对象，还有更多API，[详见](buildin-object-api/arraybuffer.md)

## 数组（Array）@array

Array，即数组，支持在单个变量名下存储多个元素，并具有执行常见数组操作的成员。

`js`和`swift`的Array，是可变长的泛型Array。

而在`kotlin`中，其自带的Array是不可变长的，即数组的length是固定的。只有ArrayList是可变长的。

为了拉齐实现，UTS补充了新的Array，替代kotlin的Array。它继承自kotlin的ArrayList，所以可以变长。

如果开发者需要使用原始的kotlin的不可变长的Array，需使用 `kotlin.Array`。

需要使用平台专有数组类型的场景，也是如下2种情况：

1. 某些系统API或三方原生SDK的入参或返回值强制指定了kotlin的原生数组类型。
2. uts新增的可动态变长的Array，在性能上不如固定length、不可变长的原始kotlin.Array。但也只有在巨大量的运算中才能体现出毫秒级的差异。

### 定义数组

`UTS` 中 Array 有多种创建方式，这些方式是等价的：

1. 字面量创建

```ts
let a1 = [1,2,3];//支持
let a2 = [1,'2',3];//支持

// 需要注意的是，字面量创建的数组，不支持出现空的缺省元素
let a3 = [1,,2,3];//不支持
```

如果想定义一个空数组，则不能依赖编译器的自动推导，需显式声明空数组的类型。见下

2. 使用:Array<>定义数组项的类型

```ts
const a1:Array<string> = ["uni-app", "uniCloud", "HBuilder"] //表示数组内容都是string。如不能确定可以写Array<any>
let a2:Array<number> = []; //定义一个数字类型的空数组
```

3. 使用[]定义数组项的类型

```ts
const a1: string[] = ['a', 'b', 'c']; //表示数组内容都是string
```

4. 创建数组对象

```ts
let a1 = new Array(1,2,3);//支持
let a2 = new Array(1,'2',3);//安卓平台支持, iOS 平台不支持，在 iOS 中创建 Any[] 数组请直接使用数组字面量，如 let a2 = [1, '2', 3];
let a3 = Array(1,2,3);//支持
let a4 = Array(1,'2','3');//安卓平台支持, iOS 平台不支持，在 iOS 中创建 Any[] 数组请直接使用数组字面量，如 let a4 = [1,'2','3'];
```

5. uvue的data定义数组

```ts
export default {
	data() {
		return {
			listdata: [] as Array<UTSJSONObject>,
		}
	}
}
```

字面量创建的数组，在uts的老版本上，kotlin自动推导数组类型时，可能会推导成intArray，而不是uts的array。建议显式声明类型。

typeof 一个 array 得到的是 object。需使用 Array.isArray 或 instanceof 来判断数组类型。

```ts
let a1 = [1,2,3]
console.log(Array.isArray(a1)) // 返回true
console.log(a1 instanceof Array) // 返回true
```

- 注意：uts 不支持以 Array(arrayLength) 指定数组长度的方式创建一个数组。

```ts
// 下面的写法中，a1 将是一个当前 length 为1, 元素是 100 的整型数组。而不是 length 为 100 ，由 100 个空槽组成的数组。
const a1: Array(100); // [100], 当前数组长度为1
```

### 遍历数组对象

使用foreach来实现数组的遍历

```ts
const array1: string[] = ['a', 'b', 'c'];
array1.forEach((element:string, index:number) => {
	console.log(element)
    console.log(array1[index]) //与上一行代码等价
});
// 打印结果是 a a b b c c
```

### 平台专有数组类型

#### kotlin专有数组类型

- 专有数组类型清单

  * kotlin.collections.List
  * kotlin.Array
  * kotlin.IntArray
  * kotlin.FloatArray
  * kotlin.ByteArray
  * kotlin.LongArray
  * kotlin.CharArray
  * ...
- 专有数组类型定义方式

```ts
// kotlin.collections.List
let kotlinList= mutableListOf("hello","world")
// kotlin.Array
let kotlinArray = arrayOf("hello","world")
```

- 专有数组类型 转 Array

统一使用 `Array.fromNative` 将专有数据类型转换为 Array,下面列出了常见的场景：

```ts
// kotlin.collections.List 转换 Array
	let kotlinList = mutableListOf("hello","world")
	let utsArr1 = Array.fromNative(kotlinList)

	// kotlin.Array 转换 Array
	let kotlinArray = arrayOf("hello","world")
	let utsArr2 = Array.fromNative(kotlinArray)

	//ByteArray 即 java 中的 byte[]   需要HBuilderX 3.9.0 之后版本
	let b1 = byteArrayOf(-1,2,0,3,4,5)
	let c1 = Array.fromNative(b1)

	//LongArray 即 java 中的 long[]  需要HBuilderX 3.9.0 之后版本
	let b2 = longArrayOf(-1,2,0,3,4,5)
	let c2 = Array.fromNative(b2)

	//ShortArray 即 java 中的 short[] 需要HBuilderX 3.9.0 之后版本
	let b3 = shortArrayOf(-1,2,0,3,4,5)
	let c3 = Array.fromNative(b3)

	//IntArray 即 java 中的 int[]
	let b4 = intArrayOf(-1,2,0,3,4,5)
	let c4 = Array.fromNative(b4)

	// kotlin.CharArray 即 java 中的 char[]
	let b5 = charArrayOf(Char(66),Char(66),Char(81))
	let c5 = Array.fromNative(b5)
```

举个例子。如下代码向系统查询了有多少应用可以响应 `launcher`行为 ，返回的 resolveInfo 是一个 `List<ResolveInfo>`。

```ts
let packageManager = UTSAndroid.getUniActivity()!.getPackageManager();
let intent = new Intent(Intent.ACTION_MAIN);
intent.addCategory(Intent.CATEGORY_LAUNCHER);
// 查询当前设备上安装了几个launcher
let resolveInfo = packageManager.queryIntentActivities(intent,0);
```

可以将其先转换为UTS的Array对象再进行其他处理和操作

```ts
let launcherList = Array.fromNative(resolveInfo)
console.log(clothing.length);
```

- Array 转 专有数组类型

```ts
let utsArr= ["hello","world"] //类型为Array

// Array 转换 kotlin.collections.List
let kotlinList = utsArr.toKotlinList()

// Array 转换 kotlin.Array
let kotlinArray = utsArr.toTypedArray()

// 部分java编写的api 要求 FloatArray / IntArray,可以通过下面的方法进行转换

let a:Int[] = [1,2,3,4]
let b = a.toKotlinList().toIntArray()
console.log("b",b[2])

// int[][] 二维数组，可以采用下面的写法
let a = [[2].toKotlinList().toIntArray(),[23].toKotlinList().toIntArray(),[22].toKotlinList().toIntArray()]
let b = a.toKotlinList().toTypedArray()

// Array<Number> 转 java float[]的示例
let a = new Array<Number>(10)
// b是 List<Float>
let b = a.toKotlinList().map(function(it):Float{
	return it.toFloat()
})
// c是 float[]
let c = b.toTypedArray()
// d 是 FloatArray
let d = b.toFloatArray()
```

+ 特别说明:

`Byte` 类型在 `kotlin` 中使用场景较为广泛，除表示数字，还常见于 `kotlin.ByteArray` 形式表示 文件，网络数据 等字节流。

下面列出了 `kotlin.ByteArray`的常用转换代码:

```uts
import Charsets from 'kotlin.text.Charsets'
// 将ByteArray 以 ascii 编码转换为字符串
let str =  byteArrayOf(65,66,67).toString(Charsets.ISO_8859_1)

const str: string = 'hello world!'
// 字符串以UTF-8编码转换为 ByteArray
const bytes: ByteArray = str.toByteArray(Charsets.UTF_8)
```

更多`kotlin.ByteArray`的用法参考[文档](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-byte-array/)

#### iOS 平台专有数组类型

> UTS 中的 Array 对应到 Swift 中就是 Array, 方法是通用的，无需转换。一般情况下，使用 Array 即可。
>
> 但是，某些系统或者三方库 API 可能会要求 OC 的 NSArray、NSMutableArray 类型的数组，这个时候就需要进行转换。

- 专有数组类型清单

  * NSArray
  * NSMutableArray
- 专有数组类型定义方式

1. 创建 NSArray

   > NSArray 是 OC 中的不可变数组，顾名思义，数组创建完成之后就不可以再添加或者删除元素。因此，创建 NSArray 对象时就应该完成数组的初始化。可以通过以下方式创建 NSArray:

   ```ts
   // 方式一： 创建一个空数组，注意数组创建后就不可改变，不能再添加或者删除元素，应避免使用该方式。
   	let a: NSArray = NSArray()

   	// 方式二： 用一个数组创建一个 NSArray, 推荐使用。同样，创建完成后数组不可变。
   	let b: NSArray = NSArray(array=[1, 2, 3, 4]) // 等价于 any[]，注意：不是等价于 number[]

   	// 方式三: 用一个元素定义 NSArray, 不推荐使用
   	let c: NSArray = NSArray(object=1)

   	// 方式四：用不定长元素定义 NSArray, 可以使用
   	let d: NSArray = NSArray(objects=1, "2", false, "ok")
   ```
2. 创建 NSMutableArray

   - NSMutableArray 是 OC 中的可变数组，其是 NSArray 的子类，可变数组创建后可以增加或者删除元素。NSArray 的所有创建方式也都适用于 NSMutableArray

     ```ts
     // 方式一： 创建一个空数组，其类型等价于 any[]
     let a: NSMutableArray = NSMutableArray()
     a.add(1) 	//添加一个元素
     a.add("22") //添加一个元素
     a.add(false) //添加一个元素
     a.remove(1) //移除一个元素
     a.removeObject(at=2) //移除一个指定下标的元素
     a.removeAllObjects() //移除全部元素
     a.removeLastObject() //移除最后一个元素

     // 方式二： 用一个数组创建一个 NSMutableArray, 推荐使用。
     let b: NSMutableArray = NSMutableArray(array=[1, 2, 3, 4]) // 等价于 any[]，注意：不是等价于 number[]

     // 方式三: 用一个元素定义 NSMutableArray
     let c: NSMutableArray = NSMutableArray(object=1)

     // 方式四：用不定长元素定义 NSMutableArray
     let d: NSMutableArray = NSMutableArray(objects=1, "2", false, "ok")
     ```

- 专有数组类型 转 Array

```ts
// 将 NSArray 转成 Array
let a: NSArray = NSArray(array=[1, 2, 3, 4]) // 等价于 any[]，注意：不是等价于 number[]
let a1 = Array(a)

// 将 NSMutableArray 转成 Array
let b: NSMutableArray = NSMutableArray(array=[1, 2, 3, 4]) // 等价于 any[]，注意：不是等价于 number[]
let b1 = Array(b)
```

- Array 转 专有数组类型

```ts
// 定义一个 Array
let a = [1, 2, 3] //类型为number[]

// Array 转换成 NSArray
// 方式一：
let a1: NSArray = NSArray(array= a)

// 方式二：
let a2 = a as NSArray

// Array 转换成 NSMutableArray
let a3: NSMutableArray = NSMutableArray(array= a)
```

**注意：**

+ 无论是 NSArray 还是 NSMutableArray 对象创建后都等价于 any[] 类型的数组，此时 Swift 不再有类型推导，可以往可变数组中添加任意类型的非空元素。
+ NSArray 和 NSMutableArray 类型的数组不接受空值 null, 任何情况下不要往这两种类型中注入 null。 否则，在运行时可能会引起应用闪退。
+ Array 类型不能通过 as 方式转换成 NSMutableArray 类型。 但是可以通过 as 方式 转换成 NSArray 类型。
+ Swift 中的 Array 是值类型，其和 TS 中 Array 的一点区别是 可以通 == 判断两个数组是否相等，只要两个数组的类型和元素一样，判等的结果就是 true。

### 更多API

Array作为内置对象，还有更多API，[详见](buildin-object-api/array.md)

## Map

Map 是一种 key value 形式的数据类型。

与二维数组相比，Map的key不能重复，并且读写的方式是get()、set()。与UTSJSONObject相比，Map的性能更高，但对数据格式有要求。

### 定义

```ts
//定义一个map1，key为string类型，value也是string类型
const map1: Map<string,string> = new Map();
map1.set('key1', "abc");
console.log(map1.get('key1')) //返回 abc

//定义一个map1，key为number类型，value是Map类型
const map2: Map<number,Map<string,string>> = new Map();
map2.set(1, map1); //把map1作为value传进来
console.log(map2.get(1)); //返回map1
console.log(map2.get(1)?.get("key1")); //返回 abc。因为名为1的key不一定存在，map2.get(1)可能为null，此时需使用 ?. 才能链式调用
```

//通过元素是键值对的数组来创建 Map

```ts
const myMap = new Map<number,string>([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
```

注意在HBuilderX中console.log一个Map时，返回内容格式如下：

```sh
[Object] Map(3) {"sex":0,"name":"zhangsan","age":12}  at pages/index/index.uvue:60
```

开头的[Object]代表其typeof的类型，Map代表它的实际类型，(3)是map的size，{...} 是Map的内容。

还可以把一个UTSJSONObject转为Map

```ts
let userA = {
	name: "zhangsan",
	age: 12,
	sex: 0
} // userA 被推导为UTSJSONObject
let userMap = userA.toMap() //UTSJSONObject有toMap方法
```

### 验证类型

```ts
console.log(typeof map1); //返回 object
console.log(map1 instanceof Map); //返回 true
```

### 更多API

Map对象还有很多API，delete、clear等，[详见](buildin-object-api/map.md)

## UTSJSONObject@utsjsonobject

json 在 js 中并非一个独立的类型，对一个 json 对象 typeof 返回的是 object。

json 在 js 中用起来很自由，但在强类型语言中，不管kotlin、swift、dart...，都没有这么灵活，例如：

1. json对象里的每个属性，都需要定义类型
2. 每个可为空的属性，都需要加`?.`，才能安全读写

一般其他强类型语言中使用json，是把json数据内容，转为class、interface或type。然后就可以使用`.`来访问了。

在 uts 中使用 JSON数据，有3种方式：

1. 把 json数据转 type，变成一个自定义类型。这不是本章节的内容，详见 [type](#type)
2. uts 新增了 UTSJSONObject 对象，可以把 json数据通过字面量赋值 或 JSON.parse()方式，赋值给 uts 内置的 UTSJSONObject 对象。
3. 由于 UTSJSONObject有toMap()方法，所以也可以转为Map后使用json数据。

UTSJSONObject，是一个类型，可以在变量的冒号后面使用，本节的重点就是介绍UTSJSONObject。

UTSJSONObject很贴近js，也方便兼容js生态的代码。但在编码时代码提示无法提示属性。

UTSJSONObject的运行性能目前不及type。


### 对象和数组

首先，我们需要区分JSON对象，和由JSON对象组成的数组。

这是一个 UTSJSONObject 对象。jo 对象有2个属性，x和y，都是数字类型（类型没有声明是因为根据字面量自动推导了）

```ts
let jo: UTSJSONObject = {
	"x": 1,
	"y": 2
}
```

这是一个 UTSJSONObject 数组。其数组项里有2个 UTSJSONObject 对象，每个对象都有x和y这2个属性。注意`=`左边有`[]`来表示这是一个数组类型。

```ts
let jr: UTSJSONObject[] = [
	{"x": 1,"y": 2},
	{"x": 2,"y": 1}
]
```

在 js 中，可以定义一个变量，随意接受对象字面量或数组字面量。但在 UTS 里不行。如果数据内容是数组字面量，就不能定义为 UTSJSONObject。

也就是下面的代码是错误的，不能把数组赋值给对象。在接收网络传输的json数据时，非常需要注意这个类型匹配问题。类型不匹配会造成代码错误和应用崩溃。

```ts
let jo: UTSJSONObject = [{
	"x": 1,
	"y": 2
}] //错误，类型不匹配，数组不能赋值给对象
let jo: UTSJSONObject[] = [{
	"x": 1,
	"y": 2
}] //正确，数组赋值给数组
let jo: Array<UTSJSONObject> = [{
	"x": 1,
	"y": 2
}] //正确，数组赋值给数组
let jo = [{
	"x": 1,
	"y": 2
}] //正确，自动推断为 UTSJSONObject 数组
```

### 定义 UTSJSONObject

可以通过对象字面量的方式定义一个 UTSJSONObject 对象，编译器会根据字面量自动推导类型，此时无需显式声明`:UTSJSONObject`。

```ts
let jo = {
	x: 1,
	y: 2
}

let jo2 = {
	"a-b": 1, // 如果属性名包括-，则必须两侧加引号包围
	"y": 2
}
```

关于属性名是否需要使用引号包围的规则：

1. 如果是对象字面量赋值，普通属性名称无需使用引号包围，但使用也没问题
2. 如果是对象字面量赋值，且属性名包括特殊符号，如：`-`，则必须两侧加引号包围。
3. 如果是JSON.parse()方法入参需要的字符串，则属性名必须使用双引号包围（web端规则也是如此）

如果开发者不想搞明白这些细节，可以简单粗暴的都给属性名都加上引号。

尽管在 kotlin 中属性名称包含`$`和`_`等也需要转义，但是 UTS 中是无需特殊处理的，编译器会自动转换。

对于纯字面量，jo 后面的 `:UTSJSONObject` 可以省略，这些类型比较简单，可以自动推导类型。包括下面的多层嵌套，类型也不会推导出错。

```ts
let rect = {
	"x": 20,
	"y": 12,
	"size": {
		"width": 80,
		"height": 80
	}
}
console.log(rect)
```

也就是对于形如`{x:something}`的对象字面量，如果赋值时不指定类型，在 uts 中会被自动推导为 UTSJSONObject。如果你需要转 type，则需显式声明。

除了字面量定义UTSJSONObject对象，经常用到的是通过 `JSON.parse()`，把一个 JSON 字符串转成UTSJSONObject对象。

uts 内置了大写的 `JSON` 对象，有parse()、stringify()等方法。注意`JSON`和`UTSJSONObject`不是一个对象。大写 `JSON` 内置对象，web端也是存在的。而 UTSJSONObject 是 uts 新增的。

在 HBuilderX 3.9以前，`JSON.parse()`返回的`UTSJSONObject`。但因为有时网络或其他应用传入的 JSON 数据根节点是数组，而不是对象，会导致崩溃。

所以从 HBuilderX 3.9起，`JSON.parse()`返回的类型改为`any`，即可能返回对象、也可能返回数组。这样就需要开发者自行再`as`一下来指定具体类型了。

3.9后的写法是这样：

```ts
let s = `{"result":true, "count":42}` // 常见场景中，这个字符串更多来自于网络或其他应用传输。
let jo = JSON.parse(s) as UTSJSONObject

let sr = `[{"x":1, "y":2},{"x":3, "y":4}]` // 常见场景中，这个字符串更多来自于网络或其他应用传输。
let jr = JSON.parse(s) as UTSJSONObject[]
```

当然，还有更简短的写法，使用HBuilderX 3.9新增的`JSON`的parseObject()和parseArray()方法：

```ts
let s = `{"result":true, "count":42}` // 常见场景中，这个字符串更多来自于网络或其他应用传输。
let jo = JSON.parseObject(s)

let sr = `[{"x":1, "y":2},{"x":3, "y":4}]` // 常见场景中，这个字符串更多来自于网络或其他应用传输。
let jr = JSON.parseArray(s)
```

全局对象JSON，除了parse()、parseObject()、parseArray()外，还有stringify()来把json转为字符串。[详见](buildin-object-api/json.md)

### 对象字面量在js平台推导的特殊之处@jsutsjsonobjectautotype

uts2js平台，同时存在object和UTSJSONObject，且UTSJSONObject继承自object。而kotlin和swift没有object。

在编译为kotlin和swift时，未指定type的对象字面量必然会被推导为UTSJSONObject。

而编译为js时，处理对象字面量时会根据上下文预期的对象字面量的类型来决定是转为UTSJSONObject还是object或其他。

在无法推导对象字面量预期的类型、类型为any或者类型兼容UTSJSONObject时，对象字面量会转为UTSJSONObject。其他则会推导为object或其他需要的类型。

例如：

```ts
type Person = {
  age: number
}
function test(p: Person) {
  console.log(p)
}
test({age: 1}) // 此处的对象字面量会被转成类型Person的实例，而不是UTSJSONObject

let a = {
  age: 1
} // a为UTSJSONObject类型
let b: Person = {
  age: 1
} // b为Person的实例
let c = {
  age: 1
} as Person // c为Person的实例
```

在js平台，使用三方js包还需注意，如果没有三方包的类型信息，所有三方包的导出都会按照any处理。

以lodash这个npm库为例，它并没有兼容UTSJSONObject这个类型，内部会根据入参的原型链判断是不是object。下述代码在存在`@types/lodash`时和不存在`@types/lodash`时表现有差异。

```ts
import { merge } from 'lodash'
merge(
  {a: 1},
  {b: 2}
)
```

存在`@types/lodash`时，因为可根据上下文准确推导，merge的参数类型并非any或者兼容UTSJSONObject的类型，所以两个对象字面量均不会被转为UTSJSONObject。

当不存在`@types/lodash`时，merge方法为any类型，其参数也是any类型，两个对象字面量均会被转为UTSJSONObject。

如果希望某个对象字面量不会被转为UTSJSONObject，那么不要使用自动推断，而是显式为其指定类型，写法如下：

两个对象字面量均不会被转为UTSJSONObject，注意`Record<string, any>`写法仅web端支持

```ts
import { merge } from 'lodash'
merge(
  {a: 1} as Record<string, any>,
  {b: 2} as Record<string, any>
)
```

在js平台，UTSJSONObject和object在日常使用时差别不大，但有如下几点差别：

1. UTSJSONObject多了一批通过keypath操作数据的方法 [见下](#keypath)
2. UTSJSONObject继承自object，原型链位置不同
3. instanceof返回值不同

### 验证类型

```ts
let jo = {
	x: 1,
	y: 2
}
console.log(typeof jo); //返回 object
console.log(jo instanceof UTSJSONObject); //返回 true
```

### 访问 UTSJSONObject 中的属性数据

```ts
let rect = {
	x: 20,
	y: 12,
	size: {
		width: 80,
		height: 80
	}
}
```

以上述 rect 为例，访问 UTSJSONObject 中的数据，有如下3种方式：

#### 1. `.` 操作符

```
即 `rect.x`、`rect.size.width`。

这种写法比较简单，和js习惯一致，但在 UTS 存在以下限制：
- web可以正常使用
- HBuilderX 4.41+ iOS/Android 也支持`.`操作符，但
	* 返回的数据，类型是any | null，想继续使用需要`as`为具体类型，比如：`(rect.size as UTSJSONObject).width`。
	* 不支持直接连续`.`操作符，每层数据都需要 as UTSJSONObject。可以理解为只能直接访问第一层属性。
	* HBuilderX 5.0+ Android平台修复响应式UTSJSONObject无法通过`.`操作符访问第一层属性的bug。
```

#### 2. `[""]` 下标

```
即 `rect["x"]`。

这是一种通用的方式，不管通过字面量定义的 UTSJSONObject，还是通过 `JSON.parse()`，不管是 web、Android、iOS 哪个平台，都可以使用下标方式访问 UTSJSONObject 属性。

但下标返回的数据，类型是any，想继续使用需要`as`为具体类型。

尤其是有子对象时，需要 `as` 后才能继续访问下一层数据。
```

```ts
let rect = {
	x: 20,
	y: 12,
	size: {
		width: 80,
		height: 80
	},
	border: [
		{color:"red",witdh:1},
		{color:"white",witdh:1},
		{color:"red",witdh:1},
		{color:"white",witdh:1}
	]
}

console.log(rect.x) //20 但类型为any，如果继续操作则需要as为number
console.log(rect["x"]) //20 但类型为any，如果继续操作则需要as为number

console.log(rect.size.width) //80 嵌套的UTSJSONObjectl类型仅 web 支持.操作符
console.log((rect["size"] as UTSJSONObject)["width"]) //80 使用as后需要整体用()括起来再继续使用下标[]

// 如果存在嵌套，那么需要先转成 UTSJSONObject，之后再用下标访问下一层

console.log(rect.border[0].color); //报错，一旦使用了下标访问数组，后面就无法使用.操作符了
console.log(((rect["border"] as UTSJSONObject[])[0] as UTSJSONObject)["color"]); // red
```

#### 3. 通过 keyPath 访问 UTSJSONObject 数据@keypath

`HBuilderX` 3.9+，UTSJSONObject 提供了另外一种属性访问方式: keyPath。如果你了解 XPath、JSONPath 的话，这个概念类似。

keypath是把`.`操作符作为一个字符串传入了UTSJSONObject的一个方法中，比如`utsObj.getString("address.detailInfo.street")`

以下面的 UTSJSONObject 为例

```ts
let utsObj = {
	"username": "zhangsan",
	"age": 12,
	"isStudent":false,
	"address": {
		"countyCode": "86",
		"province": "beijing",
		"detailInfo": {
			"street": "the wall street",
			"buildingNo": "5"
		}
	}
}
```

我们可以通过 getString/getNumber/getBoolean/getJSON/getAny 等函数获得指定类型的属性，如果属性不存在，则返回null

```ts
console.log(utsObj.getString("username")) // 打印结果:zhangsan
console.log(utsObj.getNumber("age")) // 打印结果:12
console.log(utsObj.getJSON("address")) // 打印结果:[object]
console.log(utsObj.getBoolean("isStudent")) // 打印结果:false
console.log(utsObj.getString("一个不存在属性")) // 打印结果:null
```

需要特别注意的是：属性名 和 属性类型，都要正确，否则不会返回对应的属性结果

```ts
console.log(utsObj.getNumber("age")) // 打印结果:12
console.log(utsObj.getNumber("agee")) // 名字不对，打印结果:null
console.log(utsObj.getString("age")) // 类型不对，打印结果:null
```

keypath的一大优势就是可以深入数据层级，如下：

```ts
console.log(utsObj.getString("address.detailInfo.street")) // 结果：the wall street
```

如果数据里包括数组、多维数组，也可以穿透下去获取数据，如下：

```ts
let obj = {
	"data": [{
			"a": "1"
		}, {
			"a": 2
		},
		[{
			"b": true
		}, {
			"b": "test"
		}],
		[1, 2, 3]
	]
}

console.log(obj.getString('data[0].a')) // 打印结果:1
console.log(obj.getNumber('data[1].a')) // 打印结果:2
console.log(obj.getBoolean('data[2][0].b')) // 打印结果:true
console.log(obj.getJSON('data[2][1]')) // 打印结果:{"b":"test"}
console.log(obj.getArray('data[3]')) // 打印结果:[1, 2, 3]
console.log(obj.getAny('data[1].a')) // 打印结果:2
```

在所有的getXXX函数中 `getAny` 是一个特殊的存在，它可以获取属性，而不要求限制类型，他的返回值是 any 类型。

需要注意的是 在强类型语言中使用 any 是一件危险的事情，如果你需要使用`getAny`请确保你已经充分了解了可能遇到的问题。

```ts
// 如果我们不确定属性类型，可以使用`getAny`来进行获取
console.log(utsObj.getAny("age") as Number)
// 如果我们不确定属性类型，可以使用`getAny`来进行获取
console.log(utsObj.getAny("address") as UTSJSONObject)
```

除了直接使用UTSJSONObject外，在 uts 中使用json数据还有2种方式：

1. UTSJSONObject.toMap() 转为Map对象 [见上](#map)
2. 把json字符串或对象字面量通过type转为自定义类型，这是ts里经常使用的方式 [见下](#type)

> 特别注意:
> UTSJSONObject 暂不支持通过 delete 删除属性
> 目前仅在 iOS 平台上，通过将属性值设为 null（例如：student["age"] = null ）可以将该属性删除。

### 更多API

UTSJSONObject对象还有很多API，[详见](buildin-object-api/utsjsonobject.md)

## type自定义类型@type

> HBuilderX 5.0起，目标语言为js时为对象字面量指定类型时不再进行字段值类型校验，详情参考：[type值类型校验变更说明](#js-type-no-field-type-check)

`type`是关键字，用于给一个类型起别名，方便在其他地方使用。

下面是一个简单的示例，给number类型起个别名`tn`，在定义变量i时，可以用`:tn`。

```ts
type tn = number
let i:tn = 0  // 等同于 let i:number = 0
```

注意：基本类型的type重命名，在uvue中选项式写法下只支持写在script的`export default {}`外。

上述简单的例子在实际开发中没有意义。

type 在 ts 中常见的用途是给联合类型命名，方便后续简化使用。在 uts 中用的比较多的场景是：

1. 给[函数类型](./function.md#%E5%87%BD%E6%95%B0%E7%B1%BB%E5%9E%8B)定义别名，以便在共享给其他模块使用。
2. 用于json对象的定义，在编译为kotlin和swift时，会编译为class。

本章节重点讲解如何把json数据转为type。

### 把json对象转为type

在 uts 中，type最常见的用途是把json数据转为自定义类型。也就是为json数据提供了一个类型描述。这样json数据就可以继续使用`.`操作符了。

```ts
type PersonType = {
	id : number,
	name : string,
	age : number
}
```

上述代码，定义了一个 PersonType 类型。变量一旦被赋予PersonType类型，就意味着变量是一个对象，包含3个属性，number类型的id属性、string类型的name属性、number类型的age属性。

然后我们给变量person赋予上面定义的PersonType类型：

```ts
let person : PersonType = { id: 1, name: "zhangsan", age: 18 }
console.log(person.name) //返回zhangsan
```

可以看到，变量person，和js里使用json没有任何区别了。支持`.`操作符，无需下标，可跨平台。

与UTSJSONObject相比，虽然多了一个type定义的过程，但可以在ide中自由的`.`，并且得到良好的提示。

所以在ts开发中，很多开发者就会把缺少类型的json数据变成一个type或interface，继续像js里那样使用这个json数据。

但在uts中，由于interface的概念在kotlin和swift有其他用途，所以uts中推荐开发者把json转成一个type，而不是interface。

### 把json数组转为type

上面的例子中，数据是json对象，下面再来定义一个json数组。

```ts
let personList = [
	{ id: 1, name: "zhangsan", age: 18 },
	{ id: 2, name: "lisi", age: 16 },
] as PersonType[]
console.log(personList[0].name); //返回zhangsan
```

把一个json数组 as 成自定义类型的数组，就可以像在js中那样随便使用json数据了。

### null的处理

但是需要注意，json数据可能不规范，有些属性缺失，此时就需要在定义type时设可为空：

```ts
type PersonType = {
	id : number,
	name : string,
	age : number | null, //属性可为null
	enable ?: boolean // 属性可为null
}

let personList = [
	{ id: 1, name: "zhangsan", age: 18 },
	{ id: 2, name: "lisi" }, // age数据为空
] as PersonType[]

console.log(personList[1].age); //null
```

### 嵌套

json对象往往有嵌套，即子对象。比如

```json
{
	"id": 1,
	"name": "zhangsan",
	"age": 18,
	"address": {
		"city": "beijing",
		"street": "dazhongsi road"
	}
}
```

如果要给Person类型再加一个子对象 address，下面又有2个属性 city、street，该怎么写呢？ 因为冒号已经用于类型定义，子对象就没有声明类型的地方了。

```ts
type PersonType = {
	id: number,
	name: string,
	age: number,
		address: { // 错误，这里的address需要单独声明类型
		city : string,
		street : string
	}
}
```

要解决这个问题，需要把 address 作为一个单独的类型来定义。

```ts
type PersonAddressType = {
	city: string,
	street: string
}
type PersonType = {
	id: number,
	name: string,
	age: number,
	address: PersonAddressType // 把address定义为PersonAddress类型
}
```

这里还要注意代码的执行顺序，执行 `address: PersonAddress` 时，这个类型必须已经被定义过。所以要被引用的类型必须定义在前面，后面才能使用这个类型。

那么嵌套的完整写法例子：

```ts
type PersonAddressType = {
	city: string,
	street: string
}
type PersonType = {
	id: number,
	name: string,
	age: number,
	address: PersonAddressType // 把address定义为PersonAddress类型
}
let person = {
	id: 1,
	name: "zhangsan",
	age: 18,
	address: {
		city: "beijing",
		street: "dazhongsi road"
	}
} as PersonType
console.log(person.address.city) //beijing
```

<!-- 注意，在HBuilderX 3.9以前，有子对象的对象字面量或UTSJSONObject，无法直接被 as 为有嵌套的type，也需要对子对象进行 as 。

```ts
let person = {
	id: 1,
	name: "zhangsan",
	age: 18,
	address: {
		city: "beijing",
		street: "dazhongsi road"
	} as PersonAddressType // HBuilderX 3.9前需对子对象单独 as
} as PersonType
``` -->

### 通过JSON.parse转type

HBuilderX 3.9+，支持JSON.parse传入[泛型](./generics.md)，把一段字符串解析为type。

```ts
type PersonType = {
	id: number,
	name: string
}
let jsonString:string = `{
	"id": 1,
	"name": "zhangsan"
}` // 注意属性必须使用引号包围，否则parse会解析失败返回null

let person = JSON.parse<PersonType>(jsonString) //这是一种泛型的写法，在方法名后面使用<>传入PersonType类型，就可以返回传入的类型。
console.log(person?.name);  // 返回zhangsan。由于person可能为null，parse可能失败，所以需要通过?.来访问属性
```

注意上述代码中，如果`let person`时，想使用冒号定义类型，需要考虑parse失败的情况，要这么写：

```ts
type PersonType = {
	id: number,
	name: string
}
let person:PersonType|null = JSON.parse<PersonType>(jsonString)
console.log(person?.name); // 返回zhangsan
```

或者如果你确保jsonString的值一定是合法的、parse一定可以成功，那么也可以在定义的末尾!号断言，告诉编译器肯定没有问题，那么此后就可以不使用`?.`了

```ts
type PersonType = {
	id: number,
	name: string
}
let person:PersonType = JSON.parse<PersonType>(jsonString)!
console.log(person.name); // 返回zhangsan
```

使用!断言，是强制编译器信任开发者的写法，编译器放过后，在运行期一旦person为null，调用`person.name`就会崩溃。而使用`person?.name`则不会崩溃，只会返回null。

#### 敏感字和符号@json_field

在定义Type时键名必须符合变量命名规则（如第一个字符不能数字，不能包含空格或运算符，不能使用语言保留的关键字等），

如果json字符串中的键名不符合变量命名规则，比如有个key的名字叫"a+b"，这种json转type会失败。

解决方案是，添加注释`@JSON_FIELD`定义键名转换规则，才能通过JSON.parse解析转type。

```ts
type ExampleType = {
  /**
  * @JSON_FIELD "a+b"
  * JSON.parse时会将json字符中的键名"a+b"转换为type类型的"a_b"属性
  * JSON.stringify时会将type类型的"a_b"属性转换为json字符串中的"a+b"键名
  */
  a_b: string
}
```

以上示例定义的 ExampleType 类型，在 `a_b: string` 声明时添加注释 `@JSON_FIELD "a+b"`，表示：

- JSON.parse 时会将json字符中的键名"a+b"转换为ExampleType类型的"a_b"属性；
- JSON.stringify 时会将ExampleType类型的"a_b"属性转换为json字符串中的"a+b"键名。

推荐的转换规则如下：

- 将不合法的字符（如空格、运算符等）转换为下划线“_”，如“a+b”转换为“a_b”
- 将保留[关键词](keywords.md)（如class、enum等）转换时，在前面添加下划线，如“class”转换为“_class”
- 如果转换后的名称已存在，在后面添加下划线`_`避免冲突，如同时存在“a+b”和“a-b”，分别转换为`a_b`和`a_b_`

以下举例json字符串 `{"a+b":"addition value","a-b":"subtraction value","class":"classification value"}`，应该如何定义 type 才能使用 JSON.parse 转换

```ts
type SpecialType = {
  /**
  * @JSON_FIELD "a+b"
  */
  a_b: string
  /**
   * @JSON_FIELD "a-b"
   */
  a_b_: string
  /**
   * @JSON_FIELD "class"
   */
  _class: string
}

//json字符串转换type对象
let t:SpecialType = JSON.parse<SpecialType>('{"a+b":"addition value","a-b":"subtraction value","class":"classification value"}');
console.log(t.a_b)		//输出: addition value
console.log(t.a_b_)		//输出: subtraction value
console.log(t._class)	//输出: classification value

//type对象转换json字符串
let t:SpecialType = {
	a_b: 'value 1',
	a_b_: 'value 2',
	_class: 'value 3'
}
console.log(JSON.stringify(t))	//输出: {"a+b":"value 1","a-b":"value 2","class":"value 3"}
```

> 以上`@JSON_FIELD`注释规则需要HBuilderX3.9.0+版本支持

#### json转type工具

如果json数据属性较多、嵌套较多、还涉及转义，那么为json数据编写type类型定义，也是一件繁琐的事情。

HBuilderX 3.9起内置了一个json转type工具，在`json编辑器`中选择一段内容点右键，选择`json转type`，即可根据json数据内容自动推导生成type定义，如果json内容涉及转义，工具也会自动转义。

![](../static/json2type.png)

把右侧生成的type复制到代码里即可，那个IRootType的名字自己按需修改。

注意json数据的属性名称需要引号包围。

如果找不到这个右键菜单，检查是否是右下角是否显示JSON编辑器；检查是否安装了 uts/uni-app x 相关插件，一般真机运行时会自动安装相关插件。

### 为vue的data中的json定义类型

uvue文件中data中的json数据也涉及类型定义。此时注意：type定义必须放在`export default {}`前面。

```html
<script>
	type PersonType = {
		id: number,
		name: string
	}
	export default {
		data() {
			return {
				personList: [
					{ id: 1, name: "zhangsan" },
					{ id: 2, name: "lisi" },
				] as PersonType[],
			}
		},
		onLoad() {
			console.log(this.personList[0].name); //zhangsan
		}
	}
</script>
```

大多数情况下，data里的json数据是空的，联网从服务器取到一段json字符串，然后再赋值并转type。

由于篇幅较长，示例另见：[request教程](../tutorial/request.md)

### type 类型的遍历

> HBuilderX3.9+

uts 为自定义 type 类型提供了迭代器，可以使用 for-in 遍历出 type 类型中的所有属性名

```ts
let person : PersonType = { id: 1, name: "zhangsan", age: 18 }

for (let key in person) {
	console.log(key) // 输出 "id", "name", "age"
}
```

### type 类型的下标访问

> HBuilderX3.9+

uts 为自定义 type 类型提供了下标操作，在适当的时机，可以使用下标的方式来读取或者修改 type 类型的属性值。

- 注意：由于通过下标修改属性值，编译阶段不会对下标操作的key值进行校验，所以可能会存在运行期代码失效的情况。为了代码安全，除非在必要时才进行通过下标修改属性的操作。

```ts
let person : PersonType = { id: 1, name: "zhangsan", age: 18 }

console.log(person["id"])  //1
obj["age"] = 25
console.log(obj["age"]) //25
console.log(obj.age) //25
```

### type值类型校验变更说明@js-type-no-field-type-check

> 自HBuilderX 5.0版本起，对象字面量转为type类型时不再进行字段值类型校验。本次调整仅针对目标语言为js的场景。

以如下代码为例

```ts
type Item = {
  id: number
  subItems?: SubItem[]
}
type SubItem = {
  name: string
}
const item1: Item = { 
  id: 1, 
  subItems: [{
    name: 'subItem1'
  }] ,
}
const item2 = {
  id: 2,
} as Item
```

item1、item2、item1内的subItems在创建对应的type实例时均不会在运行时校验字段类型，编译器校验仍然存在。

针对编译器无法校验的场景运行时也不会再报错，如下例子目标语言为js时，编译器不会报错，运行时也不会报错。目标语言为kotlin/swift时，编译器会报错。在本次调整前，目标语言为js时，运行时会报错。

```ts
type Item = {
  id: number
}
const item: Item = {
  id: "" as any
}
```

## 开发时类型@devtype

uts有`运行时类型`和`开发时类型`的概念区别。

开发时类型，指为了在开发期间ide可以更好的进行代码提示和校验，但在编译后这些类型会被擦除，变成`运行时类型`。

目前支持的`开发时类型`有：

### 相同运行时类型的字面量联合类型@literal-union-type

字面量联合类型，指相同类型的数字或字符串字面量，把多个字面量值以或的方式赋值给一个类型。

它常常用于在开发阶段的值域约束。

比如以下例子里，a1的值域只能是302或404或500，而b1的值域只能是"get"或"post"。

```ts
// 注意不要写在uvue页面的export default里面
type a = 302 | 404 | 500
let a1 : a = 404 // 运行时类型是number
console.log(a1);

type b = "get" | "post"
let b1 : b = "get" // 运行时类型是string
console.log(b1);
if (b1=="") {} //光标在双引号中间时，代码助手会提示get和post这2个候选
b1=="get1" // 当为b1赋值不在值域范围的新值时，ide会报红
```

相同字面量联合类型，在方法的参数值域定义里很常见。

但有几个注意：

1. 这些字面量必须是一个类型，或者统一是数字，或者统一是字符串。
2. 字面量联合类型只是`开发时类型`，在运行时，类型会变为number或string。

### 特殊值域string@ide-string

很多数据，虽然类型是字符串，但其实有特殊的值域范围。

上一节提到的字符串字面量联合类型，其实是一种枚举型的值域范围约束。

但很多值域无法通过枚举表达。
比如string.ColorString，代表一个合法的颜色字符串，"red"、"#000"，这些是它的合法值域。
再比如string.IDString代表页面上合法的组件的id属性值清单，string.ImageURIString则代表工程下合法的图片路径清单。

HBuilder支持给变量定义特殊值域string类型，这些类型在HBuilder里都可以得到更好的代码提示和语法校验。

当然这也是开发时类型，在运行时，这些类型会统一抹平为string类型。

| 名称 | 描述 |
| :- | :- |
| string.AttrString | 元素上的属性 |
| string.AttrValueString | 元素上某个属性的值 |
| string.ClassString | 元素全局属性`class`的值 |
| string.IDString | 元素全局属性`id`的值 |
| string.HTMLEventString | 元素上的事件 |
| string.ColorString | CSS颜色的值 |
| string.CSSString | CSS属性和属性值的组合字符串 |
| string.RequireCommonString | 提示common模块 以及js文件路径 |
| string.VueI18NKeyString | 国际化翻译的key值 |
| string.VueDataString | vue默认参数data中的属性名称 |
| string.VueRefString | vue组件中ref属性的值 |
| string.VuexDispatchString | vuex 中 actions 的名称 |
| string.VuexCommitString | vuex 中 mutations 的名称 |
| string.PageURIString | vue, nvue, uvue页面文件的文件路径(根据项目自动匹配) |
| string.NPageURIString | nvue页面文件的文件路径 |
| string.UPageURIString | uvue页面文件的文件路径, 仅在uniappx中生效 |
| string.VideoIdString | video 组件的 id, 仅在uniappx中生效 |
| string.WebviewIdString | web-view 组件的 id, 仅在uniappx中生效 |
| string.ParentFieldString | uniCloud db schema中parentKey的值 |
| string.SchemaFieldString | uniCloud db schema中required数组的值 |
| string.ValidateFunctionString | uniCloud db schema中validateFunction的值 |
| string.CloudFunctionString | uniCloud 云函数名 |
| string.CloudObjectString | uniCloud 云对象名 |
| string.DBCollectionString | uniCloud 数据库集合的名称 |
| string.DBFieldString | uniCloud 数据库字段名称 |
| string.JQLString | uniCloud 数据库要操作的集合, 要查询的字段 |
| string.cssPropertyString | CSS属性的名称 |
| string.cssPropertyValueString | CSS某个属性的值 |
| string.cssSelectorString | CSS选择器的名称 |
| string.URIString | 任意文件的文件路径 |
| string.CSSURIString | css文件的文件路径(后缀为`.css`的文件路径) |
| string.JSURIString | js文件的文件路径(后缀为`.js`的文件路径) |
| string.HTMLURIString | html文件的文件路径(后缀为`.html`的文件路径) |
| string.MarkdownURIString | markdown文件的文件路径(后缀为`.md`的文件路径) |
| string.ScriptImportURIString | js, ts, uts引用文件或模块的文件路径(支持vue,nvue,uvue中script标签内容), 例: `import xxx from 'xxx'` |
| string.CssImportURIString | css文件可以引用的文件的文件路径, 后缀为`\[".css"]的文件路径 例: `@import url('xxx.css')` |
| string.ScssImportURIString | scss文件可以引用的文件的文件路径, 后缀为`\[".scss", ".css"]的文件路径, 例: `@import 'xxx.scss'` |
| string.LessImportURIString | less文件可以引用的文件的文件路径, 后缀为`\[".less", ".css"]的文件路径, 例: `@import 'xxx.less'` |
| string.FontURIString | 字体文件的文件路径 |
| string.ImageURIString | 图片文件的文件路径 |
| string.AudioURIString | 音频文件的文件路径 |
| string.VideoURIString | 视频文件的文件路径 |

## 联合类型@union-type

联合类型(Union Types) 表示取值可以为多种类型中的一种。联合类型使用 `|` 操作符来分隔每个类型。
> HBuilderX 4.51 以前仅支持 [|null](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#null)（即可为空）及 [字面量联合类型](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#literal-union-type)。4.51起支持更多联合类型。

### 基本语法

```ts
// 可为空的 string 类型
type NullableString = string | null;
// 基本类型的联合
type StringOrNumber = string | number;
// 字面量类型的联合
type Alignment = "left" | "right" | "center";
// 对象类型的联合
type Shape = Circle | Square | Triangle;
```
### 使用场景

- 可为空
```ts
let b: string | null = "abc" // 可以设置为空
b = null // ok
```

- 值域约束，如字面量联合类型
```ts
// 限定具体值范围
type Direction = 'up' | 'down' | 'left' | 'right';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Status = 200 | 400 | 401 | 403 | 404 | 500;
```

- 多类型变量，如函数参数或返回值可以有多种可能类型。
```ts
function formatValue(value: string | number): string {
    if (typeof value == "string") {
        return `String: ${value}`;
    } else {
        return `Number: ${value}`;
    }
}
console.log(formatValue("Hello")); // String: Hello
console.log(formatValue(123)); // Number: 123
```

- 可辨识联合：创建互斥的类型组合
```ts
// 事件定义
type MouseEvent = {
    type: "click" | "mouseover";
    x: number;
    y: number;
}

type KeyboardEvent = {
    type: "keydown" | "keyup";
    key: string;
}

type UserEvent = MouseEvent | KeyboardEvent;

// 类型安全的事件处理
function handleEvent(event: UserEvent) {
  switch (event.type) {
    case 'click':
    case 'mouseover':
      return `点击位置：${event.x}, ${event.y}`
    case 'keydown':
    case 'keyup':
      return `按下按键：${event.key}`
    default:
      return '未知事件'
  }
}
```
### 最佳实践

- 使用精确的联合类型而不是过于宽泛的类型
- 配合[类型收窄](#narrowing)来确保类型安全
- 使用可辨识联合来处理复杂的类型判断
- 合理使用类型别名（type）来提高代码可读性

### 常见问题

- 不支持访问联合类型的共有属性和方法，必须使用类型收窄或手动强转类型来调用
- 不支持对象字面量类型的联合，可以声明为type定义，再联合
```ts
type User = { size: number } | { width: number; height: number } // 不支持
type Square = {
    size: number;
}
type  Rectangle= {
    width: number;
    height: number;
}
type Shape = Square | Rectangle // 支持
```
- 在uts插件中，对 js 环境（即：uni-app、uni-app x iOS 平台）导出时，暂不支持联合类型
- 不同类（比如number和string）的联合类型编译到目标平台的运行时类型实际是 any。此时仅支持HBuilderX的语法校验，并不会在编译阶段做强校验，请确保使用了类型收窄来确保类型的准确性，否则可能运行时异常。
- 可辨识联合仅支持string、number字面量或字面量联合

## 类型收窄@narrowing

在使用联合类型或any类型时，我们经常需要确定具体的类型。uts 提供了多种方式来实现这一点:

> HBuilderX 4.51+

### typeof 类型保护
> 目前[typeof](https://doc.dcloud.net.cn/uni-app-x/uts/operator.html#typeof)类型保护仅支持跨平台的基础类型，不支持平台专有类型。
```ts
function padLeft(padding: number | string, input: string): string {
  if (typeof padding == "number") {
    // 这里 padding 被收窄为 number 类型
    return " ".repeat(padding) + input;
  }
  // 这里 padding 被收窄为 string 类型
  return padding + input;
}
```

### 等值收窄
```ts
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction) {
    if (direction == "north") {
        // 这里 direction 被收窄为 "north"
        return "向北移动";
    }
    // 这里 direction 被收窄为 "south" | "east" | "west"
    return "向其他方向移动";
}
move("north")
move("south")
```

### in 操作符 @in
> in 操作符仅支持 type 定义的对象 和 UTSJSONObject 对象：
> - HBuilderX4.51及以上版本 in 操作符支持 type 定义的对象是否包含指定属性
> - HBuilderX4.54及以上版本 in 操作符支持 UTSJSONObject 对象是否包含指定属性
>
> 注意：HBuilderX4.51以下版本 app-android 平台虽然 UTSJSONObject 对象可以使用 in 操作符，但其它平台可能不兼容

以下示例演示 type 定义的对象如何使用 in 操作符：
```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        // 这里 animal 被收窄为 Fish
        animal.swim();
    } else {
        // 这里 animal 被收窄为 Bird
        animal.fly();
    }
}
move({
    swim() {
        console.log('swim')
    }
})
move({
    fly() {
        console.log('fly')
    }
})
```

### 赋值语句
```ts
let x: string | number;
x = "hello";    // x 被收窄为 string 类型
console.log(x.toUpperCase());  // OK
x = 42;         // x 被收窄为 number 类型
console.log(x.toFixed(2));      // OK
```

### 控制流分析
```ts
function test(x: string | number | boolean) {
    if (typeof x == "string") {
        // x 是 string
        console.log(x.toUpperCase());
    } else if (typeof x == "number") {
        // x 是 number
        console.log(x.toFixed(2));
    } else {
        // x 是 boolean
        console.log(x == true ? "是" : "否");
    }
}

```

### instanceof 操作符

```ts
class Dog {
    bark() { }
}

class Cat {
    meow() { }
}

function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();  // OK
    } else {
        animal.meow();  // OK
    }
}
```

### 可辨识联合

可辨识联合是一种特殊的联合类型，它具有一个公共的字面量属性作为判别标记。

```ts
type Square = {
    kind: "square";
    size: number;
}

type Rectangle= {
    kind: "rectangle";
    width: number;
    height: number;
}

type Circle = {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "square":
            return shape.size * shape.size;
        case "rectangle":
            return shape.width * shape.height;
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2);
        default:
           return -1
    }
}
getArea({ kind: "square", size: 10 })
getArea({ kind: "rectangle", width: 5, height: 5 })
getArea({ kind: "circle", radius: 10 })
```


## 类型保留和擦除@type-erasure

uts内置的类型，包括浏览器、Android、iOS内置的类型，在编译后不会擦除，在运行时仍可使用。

开发者自定义的类型，如通过类型字面量定义的type，在编译后会转为class。

开发时类型会在编译后被擦除。运行时无法通过 typeof 或 instanceof 获取。

**注意**

- 编译到js时联合类型等复杂类型在编译后会被擦除
