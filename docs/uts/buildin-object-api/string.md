# String

String 全局对象是一个用于字符串或一个字符序列的构造函数。

字符串字面量采取以下形式：

```ts
'string text'
"string text"
"中文/汉语"
"español"
"English "
"हिन्दी"
"العربية"
"português"
"বাংলা"
"русский"
"日本語"
"ਪੰਜਾਬੀ"
"한국어"
```

## 静态方法

### fromCharCode(...codes : number[]):string

String.fromCharCode() 静态方法返回由指定的 UTF-16 码元序列创建的字符串。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| codes | number[\] | 是 | - | - | 介于 0 和 65535（0xFFFF）之间的数字，表示一个 UTF-16 码元。大于 0xFFFF 的数字会被截断为最后的 16 位。不进行有效性检查。 | 


**返回值**
| 类型 |
| :- |
| string | 


::: preview 

>UTS
```uts
      console.log(String.fromCharCode(65, 66, 67));
      // expected output: "ABC"
      console.log(String.fromCharCode(0x12014));
      // expected output: "𝌆a𝌇"
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
| √ | 3.9 | √ |




## 实例属性


### length

返回字符串的 UTF-16 码元长度。





::: preview 

>UTS
```uts
      const x = "Mozilla";
      const e = "";

      console.log("Mozilla is " + `${x.length}` + " code units long");
      /* "Mozilla is 7 code units long" */

      console.log("The empty string is has a length of " + `${e.length}`);
      /* "The e string is has a length of 0" */
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


### toString()

返回一个字符串，表示指定的字符串。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | String 包装对象的字符串值。 | 


<!-- UTSJSON.String.toString.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.toString.tutorial -->

### includes(searchString, position?)

如果 searchString 作为此对象转换为 String 的结果的子字符串出现在大于或等于position的一个或多个位置，则返回 true；否则，返回 false。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchString | string | 是 | - | - | 要在 str 中搜索的字符串。不能是正则表达式。 |
| position | number | 否 | - | - | 在字符串中开始搜索 searchString 的位置。（默认为 0。） | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果在给定的字符串中找到了要搜索的字符串（包括 searchString 为空字符串的情况），则返回 true，否则返回 false。 | 


::: preview 

>UTS
```uts
      const sentence = 'The quick brown fox jumps over the lazy dog.';
      const word = 'fox';
      console.log(sentence.includes(word)) // true
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


### endsWith(searchString, endPosition?)

endsWith() 方法用于判断一个字符串是否以指定字符串结尾，如果是则返回 true，否则返回 false。该方法区分大小写。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchString | string | 是 | - | - | 要搜索的作为结尾的字符串，不能是正则表达式。所有非正则表达式的值都会被强制转换为字符串。 |
| endPosition | number | 否 | - | - | 可选，预期找到 searchString 的末尾位置（即 searchString 最后一个字符的索引加 1）。默认为 str.length。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果被检索字符串的末尾出现了指定的字符串（包括 searchString 为空字符串的情况），则返回 true；否则返回 false。 | 


::: preview 

>UTS
```uts
      const str1 = 'Cats are the best!';
      console.log(str1.endsWith('best!'));
      // expected output: true
      console.log(str1.endsWith('best', 17));
      // expected output: true
      const str2 = 'Is this a question?';
      console.log(str2.endsWith('question'));
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


### repeat(count)

repeat() 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| count | number | 是 | - | - | 介于 0 和 +Infinity 之间的整数。表示在新构造的字符串中重复了多少遍原字符串。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 包含指定字符串的指定数量副本的新字符串。 | 


::: preview 

>UTS
```uts
      "abc".repeat(0)      // ""
      "abc".repeat(1)      // "abc"
      "abc".repeat(2)      // "abcabc"
      "abc".repeat(3.5)    // "abcabcabc" 参数 count 将会被自动转换成整数。
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


### startsWith(searchString, position?)

startsWith() 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。这个方法区分大小写。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchString | string | 是 | - | - | 要搜索的子字符串。 |
| position | number | 否 | - | - | 在 str 中搜索 searchString 的开始位置，默认值为 0。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果在字符串的开头找到了给定的字符则返回 true；否则返回 false。 | 


::: preview 

>UTS
```uts
      const str = 'hello world';
      console.log(str.startsWith('hello'))//true
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


### at(index)

方法接受一个整数值，并返回一个新的 String，该字符串由位于指定偏移量处的单个 UTF-16 码元组成

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | - | 字符指定偏移量处，允许正整数和负整数，负整数从字符串中的最后一个字符开始倒数。 | 


**返回值**
| 类型 |
| :- |
| string \| null | 


::: preview 

>UTS
```uts
      const sentence = 'The quick brown fox jumps over the lazy dog.';
      let index = 5;
      console.log(`Using an index of ${index} the character returned is ${sentence.at(index)}`);
      // expected output: "Using an index of 5 the character returned is u"
      index = -4;
      console.log(`Using an index of ${index} the character returned is ${sentence.at(index)}`);
      // expected output: "Using an index of -4 the character returned is d"
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


### charAt(pos)

返回一个由给定索引处的单个 UTF-16 码元构成的新字符串。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| pos | number | 是 | - | - | 要返回的字符的索引，从零开始。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 返回一个字符串，该字符串表示指定 index 处的字符（恰好是一个 UTF-16 码元）。如果 index 超出了 0 – str.length - 1 的范围，charAt() 将返回一个空字符串。 | 


::: preview 

>UTS
```uts
      const anyString = "Brave new world";
      console.log("The character at index 0   is '" + anyString.charAt(0) + "'");
      // The character at index 0 is 'B'
      console.log("The character at index 1   is '" + anyString.charAt(1) + "'");
      // The character at index 1 is 'r'
      console.log("The character at index 2   is '" + anyString.charAt(2) + "'");
      // The character at index 2 is 'a'
      console.log("The character at index 3   is '" + anyString.charAt(3) + "'");
      // The character at index 3 is 'v'
      console.log("The character at index 4   is '" + anyString.charAt(4) + "'");
      // The character at index 4 is 'e'
      console.log("The character at index 999 is '" + anyString.charAt(999) + "'");
      // The character at index 999 is ''
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


### charCodeAt(index)

返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | - | 一个大于等于 0，小于字符串长度的整数。如果不是一个数值，则默认为 0。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 指定 index 处字符的 UTF-16 代码单元值的一个数字；如果 index 超出范围，charCodeAt() 返回 NaN。 | 


::: preview 

>UTS
```uts
      const sentence = 'The quick brown fox jumps over the lazy dog.';
      const index = 4;
      console.log(`The character code ${sentence.charCodeAt(index)} is equal to ${sentence.charAt(index)}`);
      // expected output: "The character code 113 is equal to q"
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




### concat(...strings)

将字符串参数连接到调用的字符串，并返回一个新的字符串。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| strings | string[\] | 是 | - | - | T要连接到 str 的一个或多个字符串。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个包含所提供的多个字符串文本组合的新字符串。 | 


::: preview 

>UTS
```uts
      let hello = 'Hello, '
      let ret1 = hello.concat('Kevin', '. Have a nice day.')
      console.log(ret1)
      // Hello, Kevin. Have a nice day.
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


### indexOf(searchString, position?)

在字符串中搜索指定子字符串，并返回其第一次出现的位置索引。它可以接受一个可选的参数指定搜索的起始位置，如果找到了指定的子字符串，则返回的位置索引大于或等于指定的数字。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchString | string | 是 | - | - | 要搜索的子字符串。 |
| position | number | 否 | - | - | 该方法返回指定子字符串在大于或等于 position 位置的第一次出现的索引，默认为 0。如果 position 大于调用字符串的长度，则该方法根本不搜索调用字符串。如果 position 小于零，该方法的行为就像 position 为 0 时一样。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 查找的字符串 searchValue 的第一次出现的索引，如果没有找到，则返回 -1。 | 


::: preview 

>UTS
```uts
      const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';
      const searchTerm = 'dog';
      const indexOfFirst = paragraph.indexOf(searchTerm);
      console.log(`The index of the first "${searchTerm}" from the beginning is ${indexOfFirst}`);
      // expected output: "The index of the first "dog" from the beginning is 40"

      console.log(`The index of the 2nd "${searchTerm}" is ${paragraph.indexOf(searchTerm, (indexOfFirst + 1))}`);
      // expected output: "The index of the 2nd "dog" is 52"
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


### lastIndexOf(searchString, position?)

搜索该字符串并返回指定子字符串最后一次出现的索引。它可以接受一个可选的起始位置参数，并返回指定子字符串在小于或等于指定数字的索引中的最后一次出现的位置。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchString | string | 是 | - | - | 要搜索的子字符串。 |
| position | number | 否 | - | - | 该方法返回指定子字符串在小于或等于 position 的位置中的最后一次出现的索引，默认为 +Infinity。如果 position 大于调用字符串的长度，则该方法将搜索整个字符串。如果 position 小于 0，则行为与 0 相同，即该方法只在索引 0 处查找指定的子字符串。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 如果找到了 searchString，则返回最后一次出现的索引，否则返回 -1。 | 


::: preview 

>UTS
```uts
      console.log('canal'.lastIndexOf('a'))//3
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


### localeCompare(that)

返回一个数字，表示参考字符串在排序顺序中是在给定字符串之前、之后还是与之相同。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| that | string | 是 | - | - | 与 referenceStr 进行比较的字符串。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个数字表示 referenceStr 在排序中是否位于 compareString 的前面、后面或二者相同。 | 


<!-- UTSJSON.String.localeCompare.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.localeCompare.tutorial -->

### match(regexp : string | RegExp) : RegExpMatchArray | null;

match() 方法检索字符串与正则表达式进行匹配的结果。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| regexp | string \| RegExp | 是 | - | - | 一个正则表达式对象或者任何具有 Symbol.match 方法的对象。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| RegExpMatchArray \| null | 一个 Array，其内容取决于是否存在全局（g）标志，如果没有匹配，则返回 null。 | 


::: preview 

>UTS
```uts
      const str = 'The quick brown fox jumps over the lazy dog. It barked.';
      const result = str.match(new RegExp('[A-Z]', 'g'));
      console.log(result![0])//"T"
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


### replace(searchValue, replaceValue)

返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchValue | string \| RegExp | 是 | - | - | RegExp: 一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。string: 一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。 |
| replaceValue | string | 是 | - | - | 用于替换掉第一个参数在原字符串中的匹配部分的字符串。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个部分或全部匹配由替代模式所取代的新的字符串。 | 


::: preview 

>UTS
```uts
      const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';
      let ret1 = p.replace('dog', 'monkey')

      console.log(ret1);
      // expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"
      const regex = /Dog/i;
      let ret2 = p.replace(regex, 'ferret')
      console.log(ret2);
      // expected output: "The quick brown fox jumps over the lazy ferret. If the dog reacted, was it really lazy?"
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


#### replaceValue 参数在 Kotlin/JVM 与 JavaScript 的差异

replaceValue 参数在包含一些特殊字符时在不同的平台被解释为不同的含义：

| 模式       | Kotlin/JVM 行为               | JavaScript 行为                  | 备注                                                                 |
|------------|-------------------------------|----------------------------------|----------------------------------------------------------------------|
| `$$`       | 闪退/不支持                   | 插入单个 `$` 字符                | Kotlin 需要转义为 `\$`                                               |
| `$&`       | 原样输出 `&`                  | 插入匹配的子串                   | JS 中相当于整个匹配                                                  |
| `` $` ``   | 原样输出 `` $` ``             | 插入匹配子串之前的文本           |                                                                      |
| `$'`       | 原样输出 `$'`                 | 插入匹配子串之后的文本           |                                                                      |
| `$n`       | 支持数字捕获组                | 支持数字捕获组                   | 差异：<br>1. Kotlin 无下标上限，JS 超限返回 `$n`<br>2. Kotlin 不存在组时闪退，JS 原样输出 |
| `${name}`  | 支持具名捕获组                | 不支持该语法                     | Kotlin 特有语法                                                     |
| `$<name>`  | 原样输出                      | 支持具名捕获组                   | JS 特有语法                                                         |
| `\`        | 有转义逻辑（如 `\d` → `d`）   | 无特殊处理                       | Kotlin 会处理转义字符                                               |



### replace(searchValue, replacer)

返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值是一个每次匹配都要调用的回调函数。如果pattern是字符串，则仅替换第一个匹配项。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchValue | string \| RegExp | 是 | - | - | RegExp: 一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。string: 一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。 |
| replacer | (substring: string, args?: Array&lt;any&gt;) => string | 是 | - | - | 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。在iOS中replacer的第二个参数是字符串数组而非可变参数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个部分或全部匹配由替代模式所取代的新的字符串。 | 


::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID
      // 不包含捕捉组的示例
      let a = "The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?"
      let b = a.replace(RegExp("fox"), function (match: string, offset: number, string: string): string {
        console.log("match", match)
        console.log("offset", offset)
        console.log("string", string)
        return "cat"
      })
      console.log("b:", b)

      // 包含一个捕获组的示例。注意，目前android仅支持最多五个捕获组
      let a1 = "The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?"
      let b1 = a1.replace(RegExp("(fox)"), function (match: string, p1: string | null, offset: number, string: string): string {
        console.log("match", match)
        console.log("p1", p1)
        console.log("offset", offset)
        console.log("string", string)
        return "cat"
      })
      console.log("b1", b1)
      // #endif

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



### search(regexp)

search() 方法执行正则表达式和 String 对象之间的一个搜索匹配。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| regexp | string \| RegExp | 是 | - | - | 一个正则表达式（regular expression）对象。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。 | 


::: preview 

>UTS
```uts
      const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';
      const regex = /[^\w\s]/g;
      // #ifdef APP-ANDROID
      console.log(paragraph.search(regex));
      // expected output: 43
      console.log(paragraph[paragraph.search(regex)]);
      // expected output: "."
      // #endif
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


### slice(start?, end?)

slice() 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| start | number | 否 | - | - | 可选。从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待，这里的strLength 是字符串的长度（例如，如果 beginIndex 是 -3 则看作是：strLength - 3） |
| end | number | 否 | - | - | 可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度 (例如，如果 endIndex 是 -3，则是，strLength - 3)。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 返回一个从原字符串中提取出来的新字符串 | 


::: preview 

>UTS
```uts
      const str = 'The quick brown fox jumps over the lazy dog.';
      let ret = str.slice(31)
      console.log(ret);
      // expected output: "the lazy dog."
      console.log(str.slice(4, 19));
      // expected output: "quick brown fox"
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


### split(separator, limit?)

split() 方法接受一个模式，通过搜索模式将字符串分割成一个有序的子串列表，将这些子串放入一个数组，并返回该数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| separator | string \| RegExp | 是 | - | - | 描述每个分割应该发生在哪里的模式。 |
| limit | number | 否 | - | - | 一个非负整数，指定数组中包含的子字符串的数量限制。当提供此参数时，split 方法会在指定 separator 每次出现时分割该字符串，但在已经有 limit 个元素时停止分割。任何剩余的文本都不会包含在数组中。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string[\] | 在给定字符串中出现 separator 的每一个点上进行分割而成的字符串数组。 | 


::: preview 

>UTS
```uts
      const str = 'The quick brown fox jumps over the lazy dog.';
      const words = str.split(' ');
      let ret1 = words[3]
      console.log(ret1);
      // expected output: "fox"
      const chars = str.split('');
      console.log(chars[8]);
      // expected output: "k"
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


### substring(start, end?)

返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引直到字符串的末尾的一个子集。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| start | number | 是 | - | - | 要截取的第一个字符的索引，该索引位置的字符作为返回的字符串的首字母。 |
| end | number | 否 | - | - | 可选。一个 0 到字符串长度之间的整数，以该数字为索引的字符不包含在截取的字符串内。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 包含给定字符串的指定部分的新字符串。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |



**bug&tips**

当前版本android平台 start 与 end 参数声明为Int, 需要将number 参数转换为int

```uts
let a = 1
let b = 2
// 临时解决办法
"hello uts".substring(a.toInt(),b.toInt())
```

这个问题后续会修复


### toLowerCase()

toLowerCase() 会将调用该方法的字符串值转为小写形式，并返回。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个新的字符串，表示转换为小写的调用字符串。 | 


::: preview 

>UTS
```uts
      const str1 = '中文简体 zh-CN || zh-Hans';
      const str2 = 'ALPHABET';
      console.log('str1'.toLowerCase());
      // 中文简体 zh-cn || zh-hans
      console.log(str2.toLowerCase());
      // "alphabet"
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


### toLocaleLowerCase(locales?)

根据任何指定区域语言环境设置的大小写映射，返回调用字符串被转换为小写的格式。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| locales | string \| string[\] | 否 | - | - | 可选。指明要转换成小写格式的特定语言区域。如果以一个数组 Array 形式给出多个 locales, 最合适的地区将被选出来应用。默认的 locale 是主机环境的当前区域 (locale) 设置。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 根据任何特定于语言环境的案例映射规则将被调用字串转换成小写格式的一个新字符串。 | 


<!-- UTSJSON.String.toLocaleLowerCase.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.toLocaleLowerCase.tutorial -->

### toUpperCase()

将调用该方法的字符串转为大写形式并返回（如果调用该方法的值不是字符串类型会被强制转换）。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个新的字符串，表示转换为大写的调用字符串。 | 


::: preview 

>UTS
```uts
      const sentence = 'The quick brown fox jumps over the lazy dog.';
      console.log(sentence.toUpperCase());
      // expected output: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
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


### toLocaleUpperCase(locales?)

根据本地主机语言环境把字符串转换为大写格式，并返回转换后的字符串。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| locales | string \| string[\] | 否 | - | - | locales参数指示要用于根据任何特定于语言环境的大小写映射转换为大写的语言环境。如果Array中给出了多个区域设置，则使用最佳可用区域设置。默认语言环境是主机环境的当前语言环境。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 根据任何特定于语言环境的大小写映射，表示转换为大写的调用字符串的新字符串。 | 


<!-- UTSJSON.String.toLocaleUpperCase.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.toLocaleUpperCase.tutorial -->

### trim()

从字符串的两端清除空格，返回一个新的字符串，而不修改原始字符串。此上下文中的空格是指所有的空白字符（空格、tab、不换行空格等）以及所有行终止符字符（如 LF、CR 等）。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个表示 str 去掉了开头和结尾的空白字符后的新字符串。 | 


::: preview 

>UTS
```uts
      let greeting = '   Hello world!   ';
      let ret = greeting.trim()
      console.log(ret) //Hello world!
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


### substr(from, length?)

返回一个字符串中从指定位置开始到指定字符数的字符。
**已废弃。警告： 尽管 String.prototype.substr(…) 没有严格被废弃 (as in "removed from the Web standards"), 但它被认作是遗留的函数并且可以的话应该避免使用。它并非 JavaScript 核心语言的一部分，未来将可能会被移除掉。如果可以的话，使用 substring() 替代它。**

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| from | number | 是 | - | - | 开始提取字符的位置。如果为负值，则被看作 strLength + start，其中 strLength 为字符串的长度（例如，如果 start 为 -3，则被看作 strLength + (-3)）。 |
| length | number | 否 | - | - | 可选。提取的字符数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 返回一个字符串中从指定位置开始到指定字符数的字符。 | 


::: preview 

>UTS
```uts
      var str1 = "Mozilla";
      let ret = str1.substring(0, 3)
      console.log(ret)//"Moz"
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.substr.tutorial -->

### padStart(targetLength, padString?)

用另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的开头开始的。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| targetLength | number | 是 | - | - | 当前 str 填充后的长度。如果该值小于或等于 str.length，则会直接返回当前 str。 |
| padString | string | 否 | - | - | 可选。用于填充当前 str 的字符串。如果 padString 太长，无法适应 targetLength，则会从末尾被截断。默认值为“ ”字符（U+0020）。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 在开头填充 padString 直到达到给定的 targetLength 所形成的 String。 | 


::: preview 

>UTS
```uts
      const str1 = '5';
      let ret = str1.padStart(2, '0')
      console.log(ret);
      // expected output: "05"
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



### padEnd(targetLength, padString?)

将当前字符串从末尾开始填充给定的字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的末尾开始的。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| targetLength | number | 是 | - | - | 当前 str 填充后的长度。如果该值小于或等于 str.length，则会直接返回当前 str。 |
| padString | string | 否 | - | - | 可选。用于填充当前 str 的字符串。如果 padString 太长，无法适应 targetLength，则会被截断。默认值为“ ”字符（U+0020）。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 在开头填充 padString 直到达到给定的 targetLength 所形成的 String。 | 


::: preview 

>UTS
```uts
      const str1 = 'Breaded Mushrooms';
      let ret1 = str1.padEnd(25, '.')
      console.log(ret1);
      // expected output: "Breaded Mushrooms........"
      const str2 = '200';
      let ret2 = str2.padEnd(5)
      console.log(ret2);
      // expected output: "200  "
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



### codePointAt(pos)

返回一个小于 1114112 (0x110000) 的非负整数 Number，它是 UTF-16 编码的代码点的代码点值，该代码点始于将此对象转换为字符串而产生的字符串中位置 pos 处的字符串元素。<br/>     如果该位置没有元素，则结果未定义。<br/>     如果有效的 UTF-16 代理项对不是从 pos 开始，则结果是 pos 处的代码单元。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| pos | number | 是 | - | - | 这个字符串中需要转码的元素的位置。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number \| null | 返回值是在字符串中的给定索引的编码单元体现的数字，如果在索引处没找到元素则返回 null。 | 


<!-- UTSJSON.String.codePointAt.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.codePointAt.tutorial -->

### normalize(form)

normalize() 方法会按照指定的一种 Unicode 正规形式将当前字符串规范化。（如果该值不是字符串，则首先将其转换为一个字符串）。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| form | "NFC" \| "NFD" \| "NFKC" \| "NFKD" | 是 | - | - | 四种 Unicode 正规形式（Unicode Normalization Form）"NFC"、"NFD"、"NFKC"，或 "NFKD" 其中的一个，默认值为 "NFC"。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 含有给定字符串的 Unicode 规范化形式的字符串。 | 


<!-- UTSJSON.String.normalize.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.normalize.tutorial -->

### normalize(form?)

normalize() 方法会按照指定的一种 Unicode 正规形式将当前字符串规范化。（如果该值不是字符串，则首先将其转换为一个字符串）。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| form | string | 否 | - | - | 四种 Unicode 正规形式（Unicode Normalization Form）"NFC"、"NFD"、"NFKC"，或 "NFKD" 其中的一个，默认值为 "NFC"。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 含有给定字符串的 Unicode 规范化形式的字符串。 | 


<!-- UTSJSON.String.normalize_1.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.normalize_1.tutorial -->

### isWellFormed()

String 值的 isWellFormed() 方法返回一个表示该字符串是否包含单独代理项的布尔值。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 如果字符串不包含单独代理项，返回 true，否则返回 false。 | 


::: preview 

>UTS
```uts
      let ret = "ab\uD800".isWellFormed()
      console.log(ret) //false
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | x | 4.61 | 4.25 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.25 | x | √ |


### toWellFormed()

String 的 toWellFormed() 方法返回一个字符串，其中该字符串的所有单独代理项都被替换为 Unicode 替换字符 U+FFFD。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 新的字符串是原字符串的一个拷贝，其中所有的单独代理项被替换为 Unicode 替换字符 U+FFFD。如果 str 是格式正确的，仍然会返回一个新字符串（本质上是 str 的一个拷贝）。 | 


::: preview 

>UTS
```uts
      let ret = "ab\uD800".toWellFormed()
      console.log(ret) //"ab\uFFFD"
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| √ | 4.25 | x | 4.61 | 4.25 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.25 | x | √ |


### toCharArray()

返回包含此字符串的字符的\[kotlin.CharArray]



**返回值**
| 类型 | 描述 |
| :- | :- |
| CharArray | 字符数组 | 


<!-- UTSJSON.String.toCharArray.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | 4.61 | 3.90 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | x | √ |


<!-- UTSJSON.String.toCharArray.tutorial -->

### valueOf()

返回 String 对象的原始值



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | String 对象的原始值 | 


<!-- UTSJSON.String.valueOf.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.valueOf.tutorial -->

### anchor(name)

anchor() 方法创建一个 \<a> HTML 锚元素，被用作超文本靶标（hypertext target）。
**浏览器兼容性的遗留特性。警告： 该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。**

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string | 是 | - | - | 一个字符串，表示被创建的标签的 name 属性。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 包含 \<a> HTML 元素的一个字符串。 | 


<!-- UTSJSON.String.anchor.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.anchor.tutorial -->

### big()

创建一个使字符串显示大号字体的\<big>标签。
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。**



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 带有 \<big>标签的字符串。 | 


<!-- UTSJSON.String.big.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.big.tutorial -->

### blink()

blink() 方法创建一个字符串，其在 \<blink>str\</blink> 中嵌入字符串，这使得字符串在旧版浏览器中闪烁。
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。<br/>#**



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 包含 \<blink> HTML 元素的字符串。 | 


<!-- UTSJSON.String.blink.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.blink.tutorial -->

### bold()

bold() 方法会创建 HTML 元素“b”，并将字符串加粗展示。
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。**



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 包含 HTML 元素 \<b> 的字符串。 | 


<!-- UTSJSON.String.bold.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.bold.tutorial -->

### fixed()

fixed() 方法创建了一个 \<tt> 标签元素将字符串包裹起来，从而让这个字符串里面的内容具有固定间距。
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。**



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 返回一个表示 \<tt> HTML 元素的字符串。 | 


<!-- UTSJSON.String.fixed.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.fixed.tutorial -->

### fontcolor(color)

创建一个\<font>的 HTML 元素让字符串被显示成指定的字体颜色。
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。<br/>备注： \<font> 元素已经在在HTML5 中 (en-US)被移除并且不应该在使用。替代的是，Web 开发者应该使用CSS属性。**

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| color | string | 是 | - | - | 代表颜色的一个字符串，可以是三个一组的十六进制的 RGB 值，也可以是一个颜色名称的字符串字面量. | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个包含一个\<font> HTML 元素的字符串。 | 


<!-- UTSJSON.String.fontcolor.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.fontcolor.tutorial -->

### fontsize(size)

返回一个' \<font> ' HTML元素并设置size属性值
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。**

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| size | number | 是 | - | - | 1到7之间的整数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 包含\<font> HTML元素的字符串。 | 


<!-- UTSJSON.String.fontsize.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.fontsize.tutorial -->

### fontsize(size)

返回一个' \<font> ' HTML元素并设置size属性值
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。**

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| size | string | 是 | - | - | 表示1到7之间的有符号整数的字符串。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 包含\<font> HTML元素的字符串。 | 


<!-- UTSJSON.String.fontsize_1.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.fontsize_1.tutorial -->

### italics()

italics()方法创建一个\<i> HTML元素，使字符串变为斜体。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 返回一个\<i> HTML元素，使字符串变为斜体。 | 


<!-- UTSJSON.String.italics.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.italics.tutorial -->

### link(url)

link() 方法创建一个 HTML 元素 \<a> ，用该字符串作为超链接的显示文本，参数作为指向另一个 URL 的超链接。
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。**

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string | 是 | - | - | 任何能够指定 a 标签的 href 属性的字符串；它应当是有效的 URL（相对或绝对），任何 & 字符将会被转义为 &amp;，任何 " 字符将会被转义为 &quot;。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个带有一个 HTML 元素 \<a> 的字符串。 | 


<!-- UTSJSON.String.link.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.link.tutorial -->

### small()

small() 方法的作用是创建一个使字符串显示小号字体的 \<small> 标签。
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。**



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 带有 \<small> 标签的字符串。 | 


<!-- UTSJSON.String.small.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.small.tutorial -->

### strike()

strike()方法创建\<strike> HTML 元素，使字符串展示为被删除的文本。
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。**



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 包含\<strike> HTML 元素的字符串。 | 


<!-- UTSJSON.String.strike.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.strike.tutorial -->

### sub()

sub()方法创建一个 \<sub> HTML 元素，使字符串展示为下标。
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。**



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 包含\<sub> HTML 元素的字符串。 | 


<!-- UTSJSON.String.sub.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.sub.tutorial -->

### sup()

sup()方法创建 一个\<sup>HTML 元素，使字符串显示为上标。
**已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；请注意，该特性随时可能无法正常工作。**



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 包含\<sup> HTML 元素的字符串。 | 


<!-- UTSJSON.String.sup.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | x | √ |


<!-- UTSJSON.String.sup.tutorial -->



### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.String)


## Android 平台实现

* 目前 string 类型编译到 kotlin 为 kotlin.String
