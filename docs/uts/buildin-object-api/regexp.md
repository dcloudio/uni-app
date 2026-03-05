# RegExp

RegExp 对象用于将文本与一个模式匹配。

#### 调整 

正则表达式存在子规范。\
HBuilder X 4.72之前版本 Android端正则使用kotlin正则规范，即 ​​`PCRE`(Perl Compatible Regular Expressions) 标准，部分细节与web存在差异。\
HBuilder X 4.72及之后版本 Android端正则引擎完全遵循`ECMAScript`标准(与web完全保持一致)。

对开发者的影响：

绝大多数场景下`PCRE`正则引擎与`ECMAScript`引擎表现是一致的，这部分场景不会对开发者产生任何影响。

少部分语法执行结果存在差异，以[issue 16951](https://issues.dcloud.net.cn/pages/issues/detail?id=16951) 为例:

开发者不可以继续使用​​`PCRE`风格的语法:

```
'10px 20px'.replace(FLOAT_REGEX, '\\${0}')  
```

这会导致不符合预期的结果:

```
\${0}px \${0}px
```

应该修改为与web一致的语法:

```
'10px 20px'.replace(FLOAT_REGEX, '${0}') 
```


### new(pattern : RegExp \| string) : RegExp;@Constructor(pattern)

用于创建正则表达式对象，该对象用于将文本与一个模式匹配。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| pattern | RegExp \| string | 是 | - | - | 正则表达式的文本，也可以是另一个 RegExp 对象或文字。 | 


**返回值**
| 类型 |
| :- |
| RegExp | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


<!-- UTSJSON.RegExp.Constructor.tutorial -->

### new(pattern : string, flags ?: string) : RegExp;@Constructor(pattern, flags?)

用于创建正则表达式对象，该对象用于将文本与一个模式匹配。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| pattern | string | 是 | - | - | 正则表达式的文本，也可以是另一个 RegExp 对象或文字。 |
| flags | string | 否 | - | - | 如果指定，flags 是包含要添加的标志的字符串。 | 


**返回值**
| 类型 |
| :- |
| RegExp | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


<!-- UTSJSON.RegExp.Constructor_1.tutorial -->

## 实例属性


### flags

返回一个字符串，由当前正则表达式对象的标志组成。此属性是一个只读属性<br/>     此字符串中的字符按以下顺序排序和连接:<br/><br/>        - "g" for global<br/>        - "i" for ignoreCase<br/>        - "m" for multiline<br/>        - "u" for unicode<br/>        - "y" for sticky<br/><br/>     如果没有设置标志，则该值为空字符串。





::: preview 

>UTS
```uts
      const regex1 = new RegExp('foo', 'ig');
      console.log(regex1.flags);
      // expected output: "gi"

      const regex2 = new RegExp('bar', 'myu');
      console.log(regex2.flags);
      // expected output: "muy"

      const regex3 = new RegExp('bar');
      console.log(regex3.flags);
      // expected output: ""
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### dotAll

表明是否在正则表达式中一起使用"s"修饰符（引入/s 修饰符，使得。可以匹配任意单个字符）。dotAll 是一个只读的属性，属于单个正则表达式实例。





::: preview 

>UTS
```uts
      const regex1 = new RegExp('foo', 's');
      console.log(regex1.dotAll);
      // expected output: true

      const regex2 = new RegExp('bar');
      console.log(regex2.dotAll);
      // expected output: false
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | - | √ |


<!-- UTSJSON.RegExp.dotAll.tutorial -->

### hasIndices

指示 d 标志是否与正则表达式一起使用。只读的。





::: preview 

>UTS
```uts
      const regex1 = new RegExp('foo', 'd');
      console.log(regex1.hasIndices);
      // expected output: true

      const regex2 = new RegExp('bar');
      console.log(regex2.hasIndices);
      // expected output: false
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | - | √ |


<!-- UTSJSON.RegExp.hasIndices.tutorial -->

### sticky

搜索是否具有粘性（仅从正则表达式的 lastIndex 属性表示的索引处搜索）。sticky 是正则表达式对象的只读属性。默认为false。只读的。





::: preview 

>UTS
```uts
      const str1 = 'table football';
      const regex1 = new RegExp('foo', 'y');
      regex1.lastIndex = 6;

      console.log(regex1.sticky);
      // expected output: true
      let ret = regex1.test(str1)
      console.log(ret);
      // expected output: true 

      regex1.lastIndex = 0;
      console.log(regex1.test(str1));
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | - | √ |


<!-- UTSJSON.RegExp.sticky.tutorial -->

### unicode

表明正则表达式带有"u" 标志。 unicode 是正则表达式独立实例的只读属性。unicode 的值是 Boolean，并且如果使用了 "u" 标志则为 true；否则为 false。"u" 标志开启了多种 Unicode 相关的特性。使用 "u" 标志，任何 Unicode 代码点的转义都会被解释。





<!-- UTSJSON.RegExp.unicode.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | - | √ |


<!-- UTSJSON.RegExp.unicode.tutorial -->

### source

返回一个值为当前正则表达式对象的模式文本的字符串，该字符串不会包含正则字面量两边的斜杠以及任何的标志字符。





::: preview 

>UTS
```uts
      const regex1 = new RegExp('foo', 'ig');
      console.log(regex1.source);
      // expected output: "foo"

      const regex2 = new RegExp('bar');
      console.log(regex2.source);
      // expected output: "bar"

      const regex3 = /\w+/gi;
      console.log(regex3.source);
      // expected output: "\\w+"

      const regex4 = new RegExp('\\d+', 'ig');
      console.log(regex4.source);
      // expected output: "\\d+"
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### global

表明正则表达式是否使用了 "g" 标志。global 是一个正则表达式实例的只读属性。





::: preview 

>UTS
```uts
      const regex1 = new RegExp('foo', 'g');
      console.log(regex1.global);
      // expected output: true

      const regex2 = new RegExp('bar');
      console.log(regex2.global);
      // expected output: false
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### ignoreCase

表明正则表达式是否使用了 "i" 标志。ignoreCase 是正则表达式实例的只读属性。





::: preview 

>UTS
```uts
      const regex1 = new RegExp('foo', 'i');
      console.log(regex1.ignoreCase);
      // expected output: true

      const regex2 = new RegExp('bar');
      console.log(regex2.ignoreCase);
      // expected output: false
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### multiline

表明正则表达式是否使用了 "m" 标志。multiline 是正则表达式实例的一个只读属性。





::: preview 

>UTS
```uts
      const regex1 = new RegExp('foo', 'm');
      console.log(regex1.multiline);
      // expected output: true

      const regex2 = new RegExp('bar');
      console.log(regex2.multiline);
      // expected output: false
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### lastIndex

正则表达式的一个可读可写的整型属性，用来指定下一次匹配的起始索引。





::: preview 

>UTS
```uts
      const regex = /ab/g;
      const str = 'ab ab ab';

      const result1 = regex.exec(str)!;
      console.log(result1.index);
      const ret1 = regex.lastIndex
      console.log(ret1);
      // expected output: 
      // result1.index: 0
      // regex.lastIndex: 2

      const result2 = regex.exec(str)!;
      console.log(result2.index);
      let ret2 = regex.lastIndex
      console.log(ret2);
      // expected output: 
      // result2.index: 3
      // regex.lastIndex: 5

      const result3 = regex.exec(str)!;
      console.log(result3.index);
      let ret3 = regex.lastIndex
      console.log(ret3);
      // expected output: 
      // result3.index: 6
      // regex.lastIndex: 8

```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |



## 实例方法


### exec(string)

在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| string | string | 是 | - | - | 要匹配正则表达式的字符串。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| RegExpExecArray \| null | 如果匹配失败，exec() 方法返回 null，并将正则表达式的 lastIndex 重置为 0。如果匹配成功，exec() 方法返回一个数组，并更新正则表达式对象的 lastIndex 属性。完全匹配成功的文本将作为返回数组的第一项，从第二项起，后续每项都对应一个匹配的捕获组。 | 


::: preview 

>UTS
```uts
      const pattern1 = new RegExp('hello');
      const result1 = pattern1.exec('hello world')!;
      console.log(result1[0]) //'hello'
      console.log(result1.index) //0
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### test(string)

执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| string | string | 是 | - | - | 用来与正则表达式匹配的字符串。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果正则表达式与指定的字符串匹配，返回true；否则false。如果正则表达式设置了全局标志，test() 的执行会改变正则表达式 lastIndex属性。连续的执行test()方法，后续的执行将会从 lastIndex 处开始匹配字符串。 | 


::: preview 

>UTS
```uts
      const str = 'table football';
      const regex = new RegExp('foo*');
      const globalRegex = new RegExp('foo*', 'g');

      console.log(regex.test(str));
      // // expected output: true

      console.log(globalRegex.lastIndex);
      // // expected output: 0

      console.log(globalRegex.test(str));
      // // expected output: true

      console.log(globalRegex.lastIndex);
      // // expected output: 9

      console.log(globalRegex.test(str));
      // // expected output: false

```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |



### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.RegExp)

## Bug & Tips@tips

* 目前 RegExp 类型编译到 kotlin 为 io.dcloud.uts.UTSRegExp



::: preview

> UTS

```ts
// 创建Kotlin HashSet
let kotlinSet = new kotlin.collections.HashSet<string>()
kotlinSet.add("a")
kotlinSet.add("b")
// 转换为 UTS Set
let utsSet = new Set<string>()
utsSet.addAll(kotlinSet)
console.log(utsSet)
// UTS Set 转换为 Kotlin HashSet
let nextKotlinSet = new kotlin.collections.HashSet<string>()
nextKotlinSet.addAll(utsSet)
console.log(nextKotlinSet)
```

> Kotlin

```Kotlin
// 创建Kotlin HashSet
var kotlinSet = kotlin.collections.HashSet<String>();
kotlinSet.add("a");
kotlinSet.add("b");
// 转换为 UTS Set
var utsSet = Set<String>();
utsSet.addAll(kotlinSet);
console.log(utsSet, " at pages/index/helloView.uvue:35");
// UTS Set 转换为 Kotlin HashSet
var nextKotlinSet = kotlin.collections.HashSet<String>();
nextKotlinSet.addAll(utsSet);
console.log(nextKotlinSet, " at pages/index/helloView.uvue:38");
```

:::
