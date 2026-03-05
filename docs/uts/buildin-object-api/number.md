# Number


Number 对象是经过封装的能让你处理数字值的对象。

## 构造函数

### new(value ?: any) : Number;@Constructor(value?)

创建一个 Number 对象。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | any | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| Number | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | - | x | - | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | - | - |


<!-- UTSJSON.Number.Constructor.tutorial -->


注意：通过构造器函数创建`Number`对象的语法，目前仅支持web平台。 在app 平台，需要使用字面量定义或者`Number.from()`进行数字变量的创建 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#%E6%95%B0%E5%AD%97-number)


## 静态属性

### MAX_VALUE

在 JavaScript 里所能表示的最大数值。无限接近于 1.79E+308。





<!-- UTSJSON.Number.MAX_VALUE.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | x | 4.61 | 3.9 | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | - | √ |


<!-- UTSJSON.Number.MAX_VALUE.tutorial -->

### MIN_VALUE

表示在 JavaScript 中所能表示的最小的正值。 无限接近于 5.00E-324。





<!-- UTSJSON.Number.MIN_VALUE.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | x | 4.61 | 3.9 | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | - | √ |


<!-- UTSJSON.Number.MIN_VALUE.tutorial -->

### NaN

表示“非数字”（Not-A-Number）。和 NaN 相同。<br/>     在相等比较中，NaN不等于任何值，包括它自己。要测试一个值是否等于NaN，使用isNaN函数。





<!-- UTSJSON.Number.NaN.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | x | 4.61 | 3.9 | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | - | √ |


<!-- UTSJSON.Number.NaN.tutorial -->

### NEGATIVE_INFINITY

表示负无穷大。<br/>     Number.NEGATIVE_INFINITY 的值和全局对象的 Infinity 属性的负值相同。





<!-- UTSJSON.Number.NEGATIVE_INFINITY.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | x | - | 3.9 | - | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | - | - |


<!-- UTSJSON.Number.NEGATIVE_INFINITY.tutorial -->

### POSITIVE_INFINITY

表示正无穷大。<br/>     Number.POSITIVE_INFINITY 的值同全局对象 Infinity 属性的值相同。





<!-- UTSJSON.Number.POSITIVE_INFINITY.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.9 | x | 4.61 | 3.9 | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.9 | - | √ |


<!-- UTSJSON.Number.POSITIVE_INFINITY.tutorial -->


## 静态方法

### from()

通过 Int \| Float \| Double \| Int64 \| Int32 \| Int16 \| Int8 \| UInt \| UInt64 \| UInt32 \| UInt16 \| UInt8  \| Byte \| Short \| Long 类型创建一个 number

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | Int \| Float \| Double \| Int64 \| Int32 \| Int16 \| Int8 \| UInt \| UInt64 \| UInt32 \| UInt16 \| UInt8 \| Byte \| Short \| Long | 是 | - | - | 必填。一个 Swift 或者 Kotlin 专有数字类型的值。其中 Swift 平台 支持 Int, Float, Double, Int64, Int32, Int16, Int8, UInt,  UInt64, UInt32, UInt16, UInt8。Kotlin 平台支持  Int, Float, Double, Byte, Short, Long | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回 number | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | 3.9 | √ |


::: preview 

>UTS
```uts
      let a: Int = 12
      let b = Number.from(a)
      console.log(b);
      // expected output: 12
```

:::


### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.Number)


## 实例方法


### toFixed(fractionDigits?)

使用定点表示法来格式化一个数值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fractionDigits | number | 否 | - | - | 小数点后数字的个数；介于 0 到 20（包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 使用定点表示法表示给定数字的字符串。 | 



::: preview 

>UTS
```uts
      function financial(x: Number): String {
        return x.toFixed(2);
      }
      console.log(financial(123.456));
      // expected output: "123.46"
      console.log(financial(0.004));
      // expected output: "0.00"
```

>Kotlin
```kt
        fun financial(x: Number): String {
            return x.toFixed(2)
        }
        console.log(financial(123.456))
        // expected output: "123.46"
        console.log(financial(0.004))
        // expected output: "0.00"
```

>Swift
```swift
        let financial = { (x: NSNumber) in
            return x.toFixed(2)
        }
        
        console.log(financial(NSNumber(value: 123.456)))
        // expected output: "123.46"
        console.log(financial(NSNumber(value: 0.004)));
        // expected output: "0.00"
        
        let num: NSNumber = 3.1415926
        console.log(num.toFixed(2))
        //expected output: "3.14"
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
| 3.90 | √ | √ |


### toString(radix?)

返回指定 Number 对象的字符串表示形式。如果转换的基数大于 10，则会使用字母来表示大于 9 的数字，比如基数为 16 的情况，则使用 a 到 f 的字母来表示 10 到 15。如果基数没有指定，则使用 10。如果对象是负数，则会保留负号。即使 radix 是 2 时也是如此：返回的字符串包含一个负号（-）前缀和正数的二进制表示，不是 数值的二进制补码。进行数字到字符串的转换时，建议用小括号将要转换的目标括起来，防止出错。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| radix | number | 否 | - | - | 指定要用于数字到字符串的转换的基数 (从 2 到 36)。如果未指定 radix 参数，则默认值为 10。 | 


**返回值**
| 类型 |
| :- |
| string | 


::: preview 

>UTS
```uts
      console.log((10).toString())//10
```

>Kotlin
```kt
        console.log(10.toString(10))
        //expected output:  "10"
        console.log(17.toString(10))
        //expected output:  "17"
        console.log(17.2.toString(10))
        //expected output:  "17.2"
        console.log(6.toString(2))
        //expected output:  "110"
        console.log(254.toString(16))
        //expected output:  "fe"
        console.log((-10).toString(2))
        //expected output:  "-1010"
        console.log(10.22.toString(8))
        //expected output:  "12.16050753412172704"
        console.log((-10.22).toString(8))
        //expected output:  "-12.16050753412172704"
        console.log(123456789987654.toString(16))
        //expected output:  "7048861cc146"
        console.log((-0xff).toString(2))
        //expected output:  "-11111111"
```

>Swift
```swift
        console.log(10.toString())
        //expected output: "10"
        console.log(17.2.toString())
        //expected output:  "17.2"
        console.log(6.toString(2))
        //expected output:  "110"
        console.log(254.toString(16))
        //expected output:  "fe"
        console.log((-10).toString(2))
        //expected output:  "-1010"
        console.log(10.22.toString(8))
        //expected output:  "12.16050753412172704"
        console.log((-10.22).toString(8))
        //expected output:  "-12.16050753412172704"
        console.log(123456789987654.toString(16))
        //expected output:  "7048861cc146"
        console.log((-0xff).toString(2))
        //expected output:  "-11111111"
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
| 3.90 | √ | √ |


<!-- UTSJSON.Number.toString.tutorial -->

### toExponential(fractionDigits?)

以指数表示法返回该数值字符串表示形式。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fractionDigits | number | 否 | - | - | 可选。一个整数，用来指定小数点后有几位数字。默认情况下用尽可能多的位数来显示数字。如果 fractionDigits 太小或太大将会抛出该错误。必须介于 0 和 20（包括 20）之间。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个用幂的形式 (科学记数法) 来表示Number 对象的字符串。小数点后以 fractionDigits 提供的值来四舍五入。如果 fractionDigits 参数被忽略了，小数点后的将尽可能用最多的位数来表示该数值。 | 


<!-- UTSJSON.Number.toExponential.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | x | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | - | √ |


<!-- UTSJSON.Number.toExponential.tutorial -->

### toPrecision(precision?)

以指定的精度返回该数值对象的字符串表示。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| precision | number | 否 | - | - | 一个用来指定有效数个数的整数。 必须介于 1 到 21 之间。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 以定点表示法或指数表示法表示的一个数值对象的字符串表示，四舍五入到 precision 参数指定的显示数字位数。 | 


::: preview 

>UTS
```uts
      console.log(123.456.toPrecision(4))//123.5
```

>Kotlin
```kt
        console.log(123.456.toPrecision(4))
        //expected output: "123.5"
        console.log(0.004.toPrecision(4))
        //expected output:  "0.004000"
```

>Swift
```swift
        console.log(123.456.toPrecision(4))
        //expected output: "123.5"
        console.log((0.004).toPrecision(4))
        //expected output:  "0.004000"
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


<!-- UTSJSON.Number.toPrecision.tutorial -->

### valueOf()

返回一个被 Number 对象包装的原始值。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 表示指定 Number 对象的原始值的数字。 | 


::: preview 

>UTS
```uts
      console.log((10).valueOf()) //10
```

>Kotlin
```kt
        console.log(10.valueOf())
        //expected output: 10
        console.log((-10.2).valueOf())
        //expected output:  -10.2
        console.log(0xf.valueOf())
        //expected output:  15
```

>Swift
```swift
        console.log(10.valueOf())
        //expected output: 10
        console.log((-10.2).valueOf())
        //expected output:  -10.2
        console.log(0xf.valueOf())
        //expected output:  15
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


### toInt()

返回一个Int 值



**返回值**
| 类型 | 描述 |
| :- | :- |
| Int | 返回 number 对应的 Int 值。 | 


::: preview 

>UTS
```uts
      let a = 12
      console.log(a.toInt());
      // expected output: 12

      // Int最大值2147483647,溢出了
      let b = 2147483648
      // expected output: -2147483648
```

>Kotlin
```kt
      var a: Number = 12
      console.log(a.toInt())
      //expected output: 12
        
      var b: Number = 2147483648
      console.log(b.toInt())
      //expected output:  -2147483648

      var a: Int = 12
      var b = UTSNumber.from(a)
      console.log(b)
      //expected output: 12
```

>Swift
```swift
        let a: NSNumber = 12
        console.log(a.toInt())
        //expected output: 12
        
        let b: NSNumber = 2147483648
        console.log(b.toInt())
        //expected output:  -2147483648

        let a: Int = 12
        let b = NSNumber.from(a)
        console.log(b)
        //expected output: 12
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### toFloat()

返回一个Float 值



**返回值**
| 类型 | 描述 |
| :- | :- |
| Float | 返回 number 对应的 Float 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### toDouble()

返回一个 Double 值



**返回值**
| 类型 | 描述 |
| :- | :- |
| Double | 返回 number 对应的 Double 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### toUInt()

返回一个 UInt 值



**返回值**
| 类型 | 描述 |
| :- | :- |
| UInt | 返回 number 对应的 UInt 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | 3.9 | √ |


### toByte()

将当前的Number数据转换为Byte表示，如果超出Byte最大值表示范围，会得到溢出后余数表示, app-andorid平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Byte | 返回 number 对应的 Byte 值。 | 


::: preview 

>UTS
```uts
      let a = 12
      // #ifdef APP-ANDROID
      console.log(a.toByte());
      // #endif
      // expected output: 12
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | - | 3.90 | - | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | - | - |


### toLong()

将当前的Number数据转换为Long表示，如果超出Long最大值表示范围，会得到溢出后余数表示, app-andorid平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Long | 返回 number 对应的 Long 值。 | 


::: preview 

>UTS
```uts
      let a = 12
      console.log(a.toLong());
      // expected output: 12
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | 4.61 | 3.90 | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | - | √ |


### toShort()

将当前的Number数据转换为Short表示，如果超出Short最大值表示范围，会得到溢出后余数表示, app-andorid平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Short | 返回 number 对应的 Short 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | 4.61 | 3.90 | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | - | √ |


### toUShort()

将当前的 Number 数据转换为 UShort 表示，如果超出 UShort 最大值表示范围，会得到溢出后余数表示, app-andorid平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| UShort | 返回 number 对应的 UShort 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | 4.61 | 3.90 | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | - | √ |


### toULong()

将当前的 Number 数据转换为 ULong 表示，如果超出 ULong 最大值表示范围，会得到溢出后余数表示, app-andorid平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| ULong | 返回 number 对应的 ULong 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | 4.61 | 3.90 | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | - | √ |


### toInt64()

返回一个 Int64 值, app-iOS平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Int64 | 返回 number 对应的 Int64 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 4.61 | x | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | 3.9 | √ |


### toInt32()

返回一个 Int32 值, app-iOS平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Int32 | 返回 number 对应的 Int32 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 4.61 | x | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | 3.9 | √ |


### toInt16()

返回一个 Int16 值, app-iOS平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Int16 | 返回 number 对应的 Int16 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 4.61 | x | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | 3.9 | √ |


### toInt8()

返回一个 Int8 值, app-iOS平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Int8 | 返回 number 对应的 Int8 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 4.61 | x | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | 3.9 | √ |



### toUInt64()

返回一个 UInt64 值, app-iOS平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| UInt64 | 返回 number 对应的 UInt64 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 4.61 | x | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | 3.9 | √ |


### toUInt32()

返回一个 UInt32 值, app-iOS平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| UInt32 | 返回 number 对应的 UInt32 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 4.61 | x | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | 3.9 | √ |


### toUInt16()

返回一个 UInt16 值, app-iOS平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| UInt16 | 返回 number 对应的 UInt16 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 4.61 | x | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | 3.9 | √ |


### toUInt8()

返回一个 UInt8 值, app-iOS平台特有。



**返回值**
| 类型 | 描述 |
| :- | :- |
| UInt8 | 返回 number 对应的 UInt8 值。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 4.61 | x | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | 3.9 | √ |


## Android 平台方法

Number 类型编译到 `kotlin` 为 [kotlin.Number](https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-number/)
