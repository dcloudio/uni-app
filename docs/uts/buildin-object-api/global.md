# Global


## 全局方法

### eval(x)

eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | string | 是 | - | - | 一个表示 JavaScript 表达式、语句或一系列语句的字符串。表达式可以包含变量与已存在对象的属性。 | 


**返回值**
| 类型 |
| :- |
| any | 


<!-- UTSJSON.Global.eval.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | x | x | x | x |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.eval)

### parseInt(string, radix?)

parseInt(string, radix) 解析一个字符串并返回指定基数的十进制整数，radix 是 2-36 之间的整数，表示被解析字符串的基数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| string | string | 是 | - | - | 要被解析的值。字符串开头的空白符将会被忽略。（注意：只接收字符串类型的参数，其他类型将编译报错。） |
| radix | number | 否 | - | - | 从 2 到 36 的整数，表示进制的基数。例如指定 16 表示被解析值是十六进制数。如果超出这个范围，将返回 NaN。假如指定 0 或未指定，基数将会根据字符串的值进行推算。注意，推算的结果不会永远是默认值 10！ | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 从给定的字符串中解析出的一个整数，或者 NaN。当radix 小于 2 或大于 36，或第一个非空格字符不能转换为数字时返回 NAN。 | 


> 注意：返回值类型一定是`number`，不是平台专有数字类型（如Int、Float、Double等）。

::: preview 

>UTS
```uts
      console.log(parseInt("123.456")) // 123;
      console.log(parseInt("123")) // 123;
      console.log(parseInt("123", 10)) // 123;
      console.log(parseInt("   123", 10)) // 123;
      console.log(parseInt("077")) // 77;
      console.log(parseInt("1.9")) // 1;
      console.log(parseInt("ff", 16)) // 255;
      console.log(parseInt("0xFF", 0)) // 255;
      console.log(parseInt("0xFF", 16)) // 255;
      console.log(parseInt("0xFF")) // 255;
      console.log(parseInt("0xFF", 10)) // 0;
      console.log(parseInt("0xF", 16)) // 15;
      console.log(parseInt("F", 16)) // 15;
      console.log(parseInt("021", 8)) // 17;
      console.log(parseInt("015", 10)) // 15;
      console.log(parseInt("15,123", 10)) // 15;
      console.log(parseInt("FXX123.99", 16)) // 15;
      console.log(parseInt("1111", 2)) // 15;
      console.log(parseInt("15 * 3", 10)) // 15;
      console.log(parseInt("15e2", 10)) // 15;
      console.log(parseInt("15px", 10)) // 15;
      console.log(parseInt("12", 13)) // 15;
      console.log(parseInt("17", 8)) // 15;
      console.log(isNaN(parseInt("a"))) // true
      console.log(parseInt("a", 16)) // 10
      console.log(isNaN(parseInt("345", 2))) // true
      console.log(isNaN(parseInt("hello"))) // true
      console.log(parseInt("6.022e23")) // 6
      console.log(parseInt("9223372036854775807")) // 9.223372036854778e+18
      console.log(parseInt("9223372036854775807000")) // 9.223372036854777e+21
      console.log(parseInt("922337203685477580700099999999999999999999999999999999999999999999999999999999999999999")) // 9.223372036854776e+86
      console.log(parseInt("50") / 100) // 0.5;
      console.log(parseInt("500") / 100) // 5;
      console.log(parseInt("3.0")) // 3;
      console.log(parseInt("3.02")) // 3;
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.91 | 4.11 | 4.61 | 3.91 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.91 | 4.11 | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.parseInt)

**注意**

- 该方法仅支持对 string 类型的解析，传入其他类型会编译报错。字符串开头的空白符将会被忽略。
- radix 参数可不传，默认值为 10。但是不可传入 null, 传入 null 会编译报错。
- radix 小于 2 或大于 36，或第一个非空格字符不能转换为数字将返回 NAN。第一个非空格字符不能转换为数字是指在指定的 radix 下，第一个非空字符不能转成数字，示例如下：

```ts
const a = parseInt("a"); // 结果为 NAN
const b = parseInt("a", 16) // 结果为 10 (原因：16进制下 a 是合法字符)
const c = parseInt("546", 2) // 结果为 NAN (原因：除了“0、1”外，其他数字都不是有效二进制数字)

```

- 有关 radix 缺省（ radix 为 0 或者未指定）时的自动推导：
	+ 如果输入的 string 以 0x 或 0X（一个 0，后面是小写或大写的 X）开头，那么 radix 被假定为 16，字符串的其余部分被当做十六进制数去解析。
	+ 如果输入的 string 以任何其他值开头，radix 是 10 (十进制)。
- 如果 parseInt 遇到的字符不是指定 radix 参数中的数字，它将忽略该字符以及所有后续字符，并返回到该点为止已解析的整数值。parseInt 将数字截断为整数值。允许前导和尾随空格。
- 某些数字在其字符串表示形式中使用 e 字符（例如 6.022×23 表示 6.022e23 ），因此当对非常大或非常小的数字使用数字时，使用 parseInt 截断数字将产生意外结果。如：parseInt("6.022e23") == 6。

> 特别注意：
> 当要解析的字符串表示的数字很大（超过最大的整数 9223372036854775807 ）时，将以科学计数法进行表示，此时会丢失精度（ iOS 和 Android 结果一致，和 JS 结果相比有误差）。（此特性在 HBuilderX 3.93+ 生效，HBuilderX 3.92 及以下版本可表示的数字的最大值为最大的 Int 值，iOS 平台为 9223372036854775807，Android 平台 为 2147483647，超过此值 iOS 下出现整型溢出，Android 下会返回 NAN ）。


### parseFloat(string)

parseFloat() 函数解析一个参数（直接收字符串类型的参数，其他类型编译报错）并返回一个浮点数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| string | string | 是 | - | - | 需要被解析成为浮点数的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 给定值被解析成浮点数。如果给定值不能被转换成数值，则会返回 NaN。 | 


> 注意：返回值类型一定是`number`，不是平台专有数字类型（如Int、Float、Double等）。
::: preview 

>UTS
```uts
      console.log(parseFloat("11.20")) // 11.2;
      console.log(parseFloat("3.14")) // 3.14;
      console.log(parseFloat("  3.14  ")) // 3.14;
      console.log(parseFloat("314e-2")) // 3.14;
      console.log(parseFloat("0.0314E+2")) // 3.14;
      console.log(parseFloat("3.14some non-digit characters")) // 3.14;
      console.log(parseFloat("100") / 50) // 2;
      console.log(parseFloat("105") / 50) // 2.1;
      
      console.log(parseFloat("3.0")) // 3;
      console.log(parseFloat("3.02").toString()) // "3.02";
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.91 | 4.11 | 4.61 | 3.91 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.91 | 4.11 | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.parseFloat)

- 注意： 该方法仅支持对 string 类型的解析，传入其他类型会编译报错。

### isNaN(number)

isNaN() 函数用来确定一个值是否为NaN 。注：isNaN函数内包含一些非常有趣的规则；你也可以使用 ECMAScript 2015 中定义的 Number.isNaN() 来判断。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| number | number | 是 | - | - | 要被检测的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果给定值为 NaN则返回值为true；否则为false。 | 


::: preview 

>UTS
```uts
      console.log(parseInt("123.456")) // 123;
      console.log(parseInt("123")) // 123;
      console.log(parseInt("123", 10)) // 123;
      console.log(parseInt("   123", 10)) // 123;
      console.log(parseInt("077")) // 77;
      console.log(parseInt("1.9")) // 1;
      console.log(parseInt("ff", 16)) // 255;
      console.log(parseInt("0xFF", 0)) // 255;
      console.log(parseInt("0xFF", 16)) // 255;
      console.log(parseInt("0xFF")) // 255;
      console.log(parseInt("0xFF", 10)) // 0;
      console.log(parseInt("0xF", 16)) // 15;
      console.log(parseInt("F", 16)) // 15;
      console.log(parseInt("021", 8)) // 17;
      console.log(parseInt("015", 10)) // 15;
      console.log(parseInt("15,123", 10)) // 15;
      console.log(parseInt("FXX123.99", 16)) // 15;
      console.log(parseInt("1111", 2)) // 15;
      console.log(parseInt("15 * 3", 10)) // 15;
      console.log(parseInt("15e2", 10)) // 15;
      console.log(parseInt("15px", 10)) // 15;
      console.log(parseInt("12", 13)) // 15;
      console.log(parseInt("17", 8)) // 15;
      console.log(isNaN(parseInt("a"))) // true
      console.log(parseInt("a", 16)) // 10
      console.log(isNaN(parseInt("345", 2))) // true
      console.log(isNaN(parseInt("hello"))) // true
      console.log(parseInt("6.022e23")) // 6
      console.log(parseInt("9223372036854775807")) // 9.223372036854778e+18
      console.log(parseInt("9223372036854775807000")) // 9.223372036854777e+21
      console.log(parseInt("922337203685477580700099999999999999999999999999999999999999999999999999999999999999999")) // 9.223372036854776e+86
      console.log(parseInt("50") / 100) // 0.5;
      console.log(parseInt("500") / 100) // 5;
      console.log(parseInt("3.0")) // 3;
      console.log(parseInt("3.02")) // 3;
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.91 | 4.11 | 4.61 | 3.91 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.91 | 4.11 | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.isNaN)

### isFinite(number)

isFinite() 函数用来判断被传入的参数值是否为一个有限数值（finite number）。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| number | number | 是 | - | - | 要被检测的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果参数是 NaN，正无穷大或者负无穷大，会返回false，其他返回 true。 | 


<!-- UTSJSON.Global.isFinite.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.91 | 4.11 | 4.61 | 3.91 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.91 | 4.11 | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.isFinite)

### decodeURI(encodedURI)

decodeURI() 函数能解码由encodeURI 创建或其他流程得到的统一资源标识符（URI）。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| encodedURI | string | 是 | - | - | 一个完整的编码过的 URI | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string \| null | 返回一个给定编码统一资源标识符 (URI) 的未编码版本的新字符串, 当 encodedURI 包含无效字符序列时，会返回null | 


::: preview 

>UTS
```uts
      console.log(decodeURI('%E4%BD%A0%E5%A5%BD')) // '你好'
      console.log(decodeURI("%E4%BD%A0%E5%A5%BD+22")) // '你好+22'
      console.log(decodeURI("%E4%BD%A0;/=%E5%A5%BD+22")) // '你;/=好+22'
      console.log(decodeURI("https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12")) // 'https://demo.dcloud.net.cn/mock/最新/12'
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.91 | 4.11 | 4.61 | 3.91 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.91 | 4.11 | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.decodeURI)

### decodeURIComponent(encodedURIComponent)

decodeURIComponent() 方法用于解码由 encodeURIComponent 方法或者其他类似方法编码的部分统一资源标识符（URI）。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| encodedURIComponent | string | 是 | - | - | 编码后的部分 URI | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string \| null | 一个解码后的统一资源标识符（URI）字符串，处理前的 URI 经过了给定格式的编码。当 encodedURI 包含无效字符序列时，会返回null. | 


::: preview 

>UTS
```uts
      console.log(decodeURIComponent('%E4%BD%A0%E5%A5%BD')) // '你好'
      console.log(decodeURIComponent('%E4%BD%A0%E5%A5%BD%2B22')) // '你好+22'
      console.log(decodeURIComponent('%E4%BD%A0%3B%2F%3D%E5%A5%BD%2B22')) // '你;/=好+22'
      console.log(decodeURIComponent("https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12")) // 'https://demo.dcloud.net.cn/mock/最新/12'
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.91 | 4.11 | 4.61 | 3.91 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.91 | 4.11 | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.decodeURIComponent)

### encodeURI(uri)

encodeURI() 函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列) 由两个 "代理" 字符组成)。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| uri | string | 是 | - | - | 一个完整的 URI。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string \| null | 一个新字符串，表示提供的字符串编码为统一资源标识符 (URI)。 | 


::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!::: preview 

>UTS
```uts
      console.log(encodeURI("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURI("你好+22")) // '%E4%BD%A0%E5%A5%BD+22'
      console.log(encodeURI("你;/=好+22")) // '%E4%BD%A0;/=%E5%A5%BD+22'
      console.log(encodeURI("https://demo.dcloud.net.cn/mock/最新/12")) // 'https://demo.dcloud.net.cn/mock/%E6%9C%80%E6%96%B0/12'
      let a1 = decodeURI(encodeURI("123 456+789")!)
      console.log(a1) // "123 456+789"
      let a2 = encodeURI("+-123！@#￥%……&*（）——+")!
      console.log(a2) // "+-123%EF%BC%81@#%EF%BF%A5%25%E2%80%A6%E2%80%A6&*%EF%BC%88%EF%BC%89%E2%80%94%E2%80%94+"
      let a3 = decodeURI(encodeURI("+=&123")!)
      console.log(a3) // "+=&123"
      let a5 = encodeURI(":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::'()*+,;=")
      console.log(a5) // ":/?#%5B%5D@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
      let b5 = decodeURI(a5!)  
      console.log(b5) // ":/?#[]@!<!-- UTSJSON.Global.encodeURI.test -->'()*+,;="
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.91 | 4.11 | 4.61 | 3.91 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.91 | 4.11 | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.encodeURI)

### encodeURIComponent(uriComponent)

encodeURIComponent() 函数通过将特定字符的每个实例替换成代表字符的 UTF-8 编码的一个、两个、三个或四个转义序列来编码 URI（只有由两个“代理”字符组成的字符会被编码为四个转义序列）。与 encodeURI() 相比，此函数会编码更多的字符，包括 URI 语法的一部分。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| uriComponent | string | 是 | - | - | 要被检测的 string 值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string \| null | 原字串作为 URI 组成部分被被编码后的新字符串。 | 


::: preview 

>UTS
```uts
      console.log(encodeURIComponent("你好")) // '%E4%BD%A0%E5%A5%BD'
      console.log(encodeURIComponent("你好+22")) // '%E4%BD%A0%E5%A5%BD%2B22'
      console.log(encodeURIComponent("你;/=好+22")) // '%E4%BD%A0%3B%2F%3D%E5%A5%BD%2B22'
      console.log(encodeURIComponent("https://demo.dcloud.net.cn/mock/最新/12")) // 'https%3A%2F%2Fdemo.dcloud.net.cn%2Fmock%2F%E6%9C%80%E6%96%B0%2F12'
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.91 | 4.11 | 4.61 | 3.91 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.91 | 4.11 | √ |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.encodeURIComponent)

### atob(encodedData:string):string

atob() 函数会对经过 Base64 编码的字符串进行解码

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| encodedData | string | 是 | - | - | 一个包含 base64 编码数据的二进制字符串（即字符串中的每个字符都被视为一字节的二进制数据）。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 从 encodedData 解码出来的 ASCII 字符串 | 


::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID || APP-IOS || WEB
      console.log(atob("")) // '';
      console.log(atob('aGVsbG8gd29ybGQ=')) // 'hello world';
      console.log(atob("QC0xMjM0NTY3ODkwcXdlcnR5dWlvcGFzZGZnaGprbHp4Y3Zibm0tUVdFUlRZVUlPUEFTREZHSEpLTFpYQ1ZCTk1ALTEyMzQ1Njc4OTBxd2VydHl1aW9wYXNkZmdoamtsenhjdmJubS1RV0VSVFlVSU9QQVNERkdISktMWlhDVkJOTUAtMTIzNDU2Nzg5MHF3ZXJ0eXVpb3Bhc2RmZ2hqa2x6eGN2Ym5tLVFXRVJUWVVJT1BBU0RGR0hKS0xaWENWQk5NQC0xMjM0NTY3ODkwcXdlcnR5dWlvcGFzZGZnaGprbHp4Y3Zibm0tUVdFUlRZVUlPUEFTREZHSEpLTFpYQ1ZCTk1ALTEyMzQ1Njc4OTBxd2VydHl1aW9wYXNkZmdoamtsenhjdmJubS1RV0VSVFlVSU9QQVNERkdISktMWlhDVkJOTQ==")) // '@-1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM@-1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM@-1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM@-1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM@-1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM';
      // #endif
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.61 | x | 4.25 | 4.61 | x |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.25 | 4.61 | x |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.atob)

**注意：**

- 鸿蒙平台暂不支持该方法，如需使用鸿蒙原生支持的buffer功能，参考： [@ohos.buffer@ohos.buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-buffer)。

### btoa(stringToEncode:string):string

btoa() 方法可以将一个二进制字符串（例如，将字符串中的每一个字节都视为一个二进制数据字节）编码为 Base64 编码的 ASCII 字符串

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stringToEncode | string | 是 | - | - | 一个需要编码的二进制字符串 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个包含 stringToEncode 的 Base64 表示的 ASCII 字符串。 | 


::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID || APP-IOS || WEB
      console.log(btoa("")) // '';
      console.log(btoa("hello world")) // 'aGVsbG8gd29ybGQ=';
      console.log(btoa("@-1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM@-1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM@-1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM@-1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM@-1234567890qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM")) // 'QC0xMjM0NTY3ODkwcXdlcnR5dWlvcGFzZGZnaGprbHp4Y3Zibm0tUVdFUlRZVUlPUEFTREZHSEpLTFpYQ1ZCTk1ALTEyMzQ1Njc4OTBxd2VydHl1aW9wYXNkZmdoamtsenhjdmJubS1RV0VSVFlVSU9QQVNERkdISktMWlhDVkJOTUAtMTIzNDU2Nzg5MHF3ZXJ0eXVpb3Bhc2RmZ2hqa2x6eGN2Ym5tLVFXRVJUWVVJT1BBU0RGR0hKS0xaWENWQk5NQC0xMjM0NTY3ODkwcXdlcnR5dWlvcGFzZGZnaGprbHp4Y3Zibm0tUVdFUlRZVUlPUEFTREZHSEpLTFpYQ1ZCTk1ALTEyMzQ1Njc4OTBxd2VydHl1aW9wYXNkZmdoamtsenhjdmJubS1RV0VSVFlVSU9QQVNERkdISktMWlhDVkJOTQ==';
      // #endif
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | 4.61 | x | 4.25 | 4.61 | x |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.25 | 4.61 | x |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.btoa)

**注意：**

- 鸿蒙平台暂不支持该方法，如需使用鸿蒙原生支持的buffer功能，参考： [@ohos.buffer@ohos.buffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-buffer)。

### requestAnimationFrame(callback)

在下一次重绘之前，调用用户提供的回调函数

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (task: number) => void | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.Global.requestAnimationFrame.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.25 | 4.25 | 4.61 | 4.25 | x | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | - |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.requestAnimationFrame)

### cancelAnimationFrame(taskId)

取消一个先前通过调用 requestAnimationFrame() 方法添加到计划中的动画帧请求

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| taskId | number | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.Global.cancelAnimationFrame.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.25 | 4.25 | 4.61 | 4.25 | x | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | - |



**参见** 

 [相关 Bug](https://issues.dcloud.net.cn/?mid=uts.globleMethods.cancelAnimationFrame)
