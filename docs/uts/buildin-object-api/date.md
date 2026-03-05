# Date

创建一个 Date 实例，该实例呈现时间中的某个时刻。Date 对象则基于 Unix Time Stamp，即自 1970 年 1 月 1 日（UTC）起经过的毫秒数。

## 语法

```ts
new Date();
new Date(value);
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
```

- 如果没有输入任何参数，则 Date 的构造器会依据系统设置的当前时间来创建一个 Date 对象。
- 如果提供了至少两个参数，其余的参数均会默认设置为 1（如果没有指定 day 参数）或者 0（如果没有指定 day 以外的参数）。
- uts 的时间由世界标准时间（UTC）1970 年 1 月 1 日开始，用毫秒计时，一天由 86,400,000 毫秒组成。Date 对象的范围是 -100,000,000 天至 100,000,000 天（等效的毫秒值）。


目前支持的字符串格式有：

+ Dec 25, 1995
+ 01 Jan 1970 00:00:00 GMT
+ 1995-12-17T03:24:00
+ December 17, 1995 03:24:00
+ December 17, 95 03:24:00
+ March 13, 08 04:20
+ July 20, 69 20:17:40 GMT+00:00
+ December 31, 1975, 23:15:30 GMT+11:00
+ 2023/08/13 12:35:54
+ 1995-02-14
+ 2024-01-09 22:00:00
+ 2024/5/1 (HBuilder X 4.18 Android/Web 支持)
+ 2024/5/1 00:00:00 (HBuilder X 4.18 Android/Web 支持)
+ 2024-05-01 00:00 (HBuilder X 4.18 Android/Web 支持)
+ 2024/05/01 00:00 (HBuilder X 4.18 Android/Web 支持)
+ 2024-5-1 00:00 (HBuilder X 4.18 Android/Web 支持)
+ 2024/5/1 00:00 (HBuilder X 4.18 Android/Web 支持)

::: warning 注意事项

如果Date构造函数传入不合法的字符串，比如：

```ts
let date = new Date("Hello World")
```

在不同的平台的表现有差异:

- web平台

	会抛出异常:`Invalid Date`

- Android/ios平台

	不会抛出异常，会变成程序执行时日期 比如：[Date]‍ Fri May 31 2024 17:18:02 GMT+0800

:::

### new() : Date;@Constructor()

新创建的 Date 对象代表当前的日期和时间。



**返回值**
| 类型 |
| :- |
| Date | 


::: preview 

>UTS
```uts
      const futureDate = new Date();
      console.log(futureDate)//日期和时间
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


<!-- UTSJSON.Date.Constructor.tutorial -->

### new(value : number \| string) : Date;@Constructor(value)



**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | number \| string | 是 | - | - | 为整数时，代表自 UTC 1970 年 1 月 1 日 00:00:00 （ECMAScript 纪元，与 UNIX 纪元相同）以来的毫秒数，忽略闰秒。请记住，大多数 UNIX 时间戳函数只精确到最近的秒。为字符串时：代表日期的字符串值，其格式由 Date.parse() 方法所识别。 | 


**返回值**
| 类型 |
| :- |
| Date | 


::: preview 

>UTS
```uts
      let date1 = new Date('1992-02-02');
      console.log(date1.getTime()) // 696988800000
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


<!-- UTSJSON.Date.Constructor_1.tutorial -->

### new(year : number, monthIndex : number, date ?: number, hours ?: number, minutes ?: number, seconds ?: number, ms ?: number) : Date;@Constructor(year, monthIndex, date?, hours?, minutes?, seconds?, ms?)

构造一个新的日期。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| year | number | 是 | - | - | 表示年的整数。从 0 到 99 的值映射了 1900 到 1999 年。其他值对应真实的年份。 |
| monthIndex | number | 是 | - | - | 表示月份的整数，从代表一月的 0 开始到代表十二月的 11 结束。 |
| date | number | 否 | - | - | 可选：表示一个月中第几天的整数。默认为 1。 |
| hours | number | 否 | - | - | 可选：表示一天中的小时数的整数值，在 0 到 23 之间。默认值为 0。 |
| minutes | number | 否 | - | - | 可选：表示时间的分钟段的整数值。默认为小时后的 0 分钟。 |
| seconds | number | 否 | - | - | 可选：表示时间的秒数段的整数值。默认为分钟后的 0 秒。 |
| ms | number | 否 | - | - | 可选：表示时间的毫秒段的整数值。默认为 0 毫秒的秒数。 | 


**返回值**
| 类型 |
| :- |
| Date | 


::: preview 

>UTS
```uts
      let date7 = new Date(2016, 6, 6, 14, 6, 59, 1000)
      console.log(date7.getMinutes()) //7
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


<!-- UTSJSON.Date.Constructor_2.tutorial -->


## 静态方法

### now()

返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数。



**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const start = Date.now()
      // this example takes 2 seconds to run
      console.log('starting timer...')
      // expected output: starting timer...
      setTimeout(() => {
        const millis = Date.now() - start
        console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`)
        // expected output: seconds elapsed = 2
      }, 2000)
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


### UTC(year, monthIndex, date?, hours?, minutes?, seconds?, ms?)

接受的参数同 Date 构造函数接受最多参数时一样，但该前者会视它们为 UTC 时间，其返回从 1970 年 1 月 1 日 00:00:00 UTC 到指定时间的毫秒数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| year | number | 是 | - | - | 一个表示年份的整数值。从 0 到 99 的值会被映射到 1900 至 1999 年。其他的值则代表实际的年份。 |
| monthIndex | number | 是 | - | - | 0（一月）到 11（十二月）之间的一个整数，表示月份。从 ECMAScript 2017 开始，如果忽略该值，则默认为 0。（直到 ECMAScript 2016，month 都是必须的参数。而从 ES2017 开始，它不再是必须的。） |
| date | number | 否 | - | - | 1 到 31 之间的一个整数，表示某月当中的第几天。如果忽略该值，则默认为 1。 |
| hours | number | 否 | - | - | 0 到 23 之间的一个整数，表示小时。如果忽略该值，则默认为 0。 |
| minutes | number | 否 | - | - | 0 到 59 之间的一个整数，表示分钟。如果忽略该值，则默认为 0。 |
| seconds | number | 否 | - | - | 0 到 59 之间的一个整数，表示秒。如果忽略该值，则默认为 0。 |
| ms | number | 否 | - | - | 0 到 999 之间的一个整数，表示毫秒。如果忽略该值，则默认为 0。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 一个数字，表示从 1970 年 1 月 1 日 00:00:00 UTC 到给定时间的毫秒数。 | 


<!-- UTSJSON.Date.UTC.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.UTC.tutorial -->

## 实例方法


### toString()

返回一个字符串，以本地的时区表示该 Date 对象。



**返回值**
| 类型 |
| :- |
| string | 


::: preview 

>UTS
```uts
        let event = new Date('1995-12-17T03:24:00');
        let ret = event.toString()
        console.log(ret)//"Sun Dec 17 1995 03:24:00 GMT+0800"
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


### toDateString()

以美式英语和人类易读的形式返回一个日期对象日期部分的字符串。



**返回值**
| 类型 |
| :- |
| string | 


::: preview 

>UTS
```uts
        event = new Date('1995-12-17T03:24:00');
        let ret1 = event.toDateString() //"Sun Dec 17 1995"
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


### toTimeString()

以人类易读形式返回一个日期对象时间部分的字符串，该字符串以美式英语格式化。



**返回值**
| 类型 |
| :- |
| string | 


::: preview 

>UTS
```uts
        event = new Date('1995-12-17T03:24:00');
        let ret2 = event.toTimeString() // "03:24:00 GMT+0800"
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | x | 4.61 | 3.90 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | x | √ |


<!-- UTSJSON.Date.toTimeString.tutorial -->

### toLocaleString()

返回该日期对象的字符串，该字符串格式因不同语言而不同。



**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.Date.toLocaleString.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.toLocaleString.tutorial -->

### toLocaleDateString()

返回指定日期对象日期部分的字符串，该字符串格式因不同语言而不同。



**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.Date.toLocaleDateString.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.toLocaleDateString.tutorial -->

### toLocaleTimeString()

返回该日期对象时间部分的字符串，该字符串格式因语言而异。



**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.Date.toLocaleTimeString.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.toLocaleTimeString.tutorial -->

### valueOf()

返回从UTC时间1970年1月1日午夜开始以毫秒为单位存储的时间值。



**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const date1 = new Date('December 17, 1995 03:24:00');
      console.log(date1.valueOf())//819141840000
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.valueOf.tutorial -->

### toISOString()

一个 ISO（ISO 8601 Extended Format）格式的字符串： YYYY-MM-DDTHH:mm:ss.sssZ。时区总是 UTC（协调世界时），加一个后缀“Z”标识。



**返回值**
| 类型 |
| :- |
| string | 


::: preview 

>UTS
```uts
        event = new Date('1995-12-17T03:24:00');
        console.log(event.toISOString())//"1995-12-16T19:24:00.000Z"
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.11 | x | 4.61 | 4.11 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.11 | x | √ |


### toUTCString()

把一个日期转换为一个字符串，使用 UTC 时区。



**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.Date.toUTCString.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.toUTCString.tutorial -->

### toJSON()

返回 Date 对象的字符串形式。调用 toJSON() 返回一个 JSON 格式字符串 (使用 toISOString())，表示该日期对象的值。默认情况下，这个方法常用于 JSON序列化Date对象。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | any | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| string | 


::: preview 

>UTS
```uts
        event = new Date('1995-12-17T03:24:00');
        console.log(event.toJSON()) //"1995-12-16T19:24:00.000Z"
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.11 | x | 4.61 | 4.11 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.11 | x | √ |


### getTime()

返回从UTC时间1970年1月1日午夜开始以毫秒为单位存储的时间值。



**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const moonLanding = new Date('July 20, 69 20:17:40 GMT+00:00');
      console.log(moonLanding.getTime()); // -14182940000

      const dateEpoch = new Date(0);
      console.log(dateEpoch.getTime()); // 0

      const dateOneMillisecond = new Date(1);
      console.log(dateOneMillisecond.getTime()); // 1
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


### getFullYear()

根据本地时间返回指定日期的年份。此方法替代 getYear() 。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 根据当地时间，返回一个对应于给定日期的年份数字。 | 


::: preview 

>UTS
```uts
      const moonLanding = new Date('July 20, 69 00:20:18');
      const firstMillisecondYear = new Date(2016, 0);
      const previousMillisecondYear = new Date(2016, 0, 1, 0, 0, 0, -1);
      const finalMillisecondYear = new Date(2016, 11, 31, 23, 59, 59, 999);
      const subsequentMillisecondYear = new Date(2016, 11, 31, 23, 59, 59, 1000);

      console.log('Moon landing year:', moonLanding.getFullYear()); // 1969

      console.log('First millisecond year:', firstMillisecondYear.getFullYear()); // 2016
      console.log('Previous millisecond year:', previousMillisecondYear.getFullYear()); // 2015
      console.log('Final millisecond year:', finalMillisecondYear.getFullYear()); // 2016
      console.log('Subsequent millisecond year:', subsequentMillisecondYear.getFullYear()); // 2017

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


### getUTCFullYear()

以世界时为标准，返回一个指定的日期对象的年份。



**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.Date.getUTCFullYear.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.getUTCFullYear.tutorial -->

### getMonth()

根据本地时间，返回一个指定的日期对象的月份，为基于 0 的值（0 表示一年中的第一月）。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 一个 0 到 11 的整数值：0 代表一月份，1 代表二月份，2 代表三月份，依次类推。 | 


::: preview 

>UTS
```uts
      const moonLanding = new Date('July 20, 69 00:20:18');
      const firstMillisecondMonth = new Date(2016, 6);
      const previousMillisecondMonth = new Date(2016, 6, 0, 0, 0, 0, -1);
      const finalMillisecondMonth = new Date(2016, 6, 31, 23, 59, 59, 999);
      const subsequentMillisecondMonth = new Date(2016, 6, 31, 23, 59, 59, 1000);

      console.log('Moon landing month:', moonLanding.getMonth()); // 6

      console.log('First millisecond month:', firstMillisecondMonth.getMonth()); // 6
      console.log('Previous millisecond month:', previousMillisecondMonth.getMonth()); // 5
      console.log('Final millisecond month:', finalMillisecondMonth.getMonth()); // 6
      console.log('Subsequent millisecond month:', subsequentMillisecondMonth.getMonth()); // 7

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


### getUTCMonth()

以世界时为标准，返回一个指定的日期对象的月份，它是从 0 开始计数的（0 代表一年的第一个月）。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个 0 到 11 的整数，分别对应以下月份：0 代表一月，1 代表二月，2 代表三月，依次类推。 | 


<!-- UTSJSON.Date.getUTCMonth.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.getUTCMonth.tutorial -->

### getDate()

根据本地时间，返回一个指定的日期对象为一个月中的哪一日（从 1--31）。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个 1 到 31 的整数值。 | 


::: preview 

>UTS
```uts
      // Common variables
      const birthday = new Date('August 19, 1975 23:15:30');
      const firstMillisecondDate = new Date(2016, 6, 6);
      const previousMillisecondDate = new Date(2016, 6, 6, 0, 0, 0, -1);
      const finalMillisecondDate = new Date(2016, 6, 6, 23, 59, 59, 999);
      const subsequentMillisecondDate = new Date(2016, 6, 6, 23, 59, 59, 1000);

      const firstMonthBoundaryDate = new Date(2016, 1, 29);
      const previousMonthBoundaryDate = new Date(2016, 1, 29, 0, 0, 0, -1);
      const finalMonthBoundaryDate = new Date(2016, 1, 29, 23, 59, 59, 999);
      const subsequentMonthBoundaryDate = new Date(2016, 1, 29, 23, 59, 59, 1000);

      console.log('Birthday date:', birthday.getDate()); // 19

      console.log('First millisecond date:', firstMillisecondDate.getDate()); // 6
      console.log('Previous millisecond date:', previousMillisecondDate.getDate()); // 5
      console.log('Final millisecond date:', finalMillisecondDate.getDate()); // 6
      console.log('Subsequent millisecond date:', subsequentMillisecondDate.getDate()); // 7

      console.log('First millisecond (month boundary) date:', firstMonthBoundaryDate.getDate()); // 29
      console.log('Previous millisecond (month boundary) date:', previousMonthBoundaryDate.getDate()); // 28
      console.log('Final millisecond (month boundary) date:', finalMonthBoundaryDate.getDate()); // 29
      console.log('Subsequent millisecond (month boundary) date:', subsequentMonthBoundaryDate.getDate()); // 1

      // #ifndef WEB
      // safari 15不支持此格式的日期字符串
      const parsedDate = Date.parse("2024-01-09 22:00:00");
      console.log('Parsed date:', parsedDate); // 1704808800000
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


### getUTCDate()

以世界时为标准，返回一个指定的日期对象为一个月中的第几天



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个 1 到 31 的整数值 | 


<!-- UTSJSON.Date.getUTCDate.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.getUTCDate.tutorial -->

### getDay()

根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 根据本地时间，返回一个 0 到 6 之间的整数值，代表星期几：0 代表星期日，1 代表星期一，2 代表星期二，依次类推。 | 


::: preview 

>UTS
```uts
      const birthday = new Date('August 19, 1975 23:15:30');
      const firstMillisecondDay = new Date(2016, 6, 6);
      const previousMillisecondDay = new Date(2016, 6, 6, 0, 0, 0, -1);
      const finalMillisecondDay = new Date(2016, 6, 6, 23, 59, 59, 999);
      const subsequentMillisecondDay = new Date(2016, 6, 6, 23, 59, 59, 1000);

      const firstWeekBoundaryDay = new Date(2016, 6, 9);
      const previousWeekBoundaryDay = new Date(2016, 6, 9, 0, 0, 0, -1);
      const finalWeekBoundaryDay = new Date(2016, 6, 9, 23, 59, 59, 999);
      const subsequentWeekBoundaryDay = new Date(2016, 6, 9, 23, 59, 59, 1000);

      console.log('Birthday day:', birthday.getDay()); // 2 (Tuesday)

      console.log('First millisecond day:', firstMillisecondDay.getDay()); // 3 (Wednesday)
      console.log('Previous millisecond day:', previousMillisecondDay.getDay()); // 2 (Tuesday)
      console.log('Final millisecond day:', finalMillisecondDay.getDay()); // 3 (Wednesday)
      console.log('Subsequent millisecond day:', subsequentMillisecondDay.getDay()); // 4 (Thursday)

      console.log('First millisecond (week boundary) day:', firstWeekBoundaryDay.getDay()); // 6 (Saturday)
      console.log('Previous millisecond (week boundary) day:', previousWeekBoundaryDay.getDay()); // 5 (Friday)
      console.log('Final millisecond (week boundary) day:', finalWeekBoundaryDay.getDay()); // 6 (Saturday)
      console.log('Subsequent millisecond (week boundary) day:', subsequentWeekBoundaryDay.getDay()); // 0 (Sunday)

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


### getUTCDay()

以世界时为标准，返回一个指定的日期对象为一星期中的第几天，其中 0 代表星期天。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个对应一星期中第几天的整数：0 代表星期天，1 代表星期一，2 代表星期二，依次类推。 | 


<!-- UTSJSON.Date.getUTCDay.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.getUTCDay.tutorial -->

### getHours()

根据本地时间，返回一个指定的日期对象的小时。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个 0 到 23 之间的整数值。 | 


::: preview 

>UTS
```uts
      const birthday = new Date('March 13, 08 04:20');
      console.log('Birthday hours:', birthday.getHours()); // 4

      const date1 = new Date(2016, 6, 6, 13);
      const date2 = new Date(2016, 6, 6, 13, 0, 0, -1);
      const date3 = new Date(2016, 6, 6, 13, 59, 59, 999);
      const date4 = new Date(2016, 6, 6, 13, 59, 59, 1000);

      console.log('First millisecond hours:', date1.getHours()); // 13
      console.log('Previous millisecond hours:', date2.getHours()); // 12
      console.log('Final millisecond hours:', date3.getHours()); // 13
      console.log('Subsequent millisecond hours:', date4.getHours()); // 14
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


### getUTCHours()

以世界时为标准，返回一个指定的日期对象的小时数。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个 0 到 23 的整数。 | 


<!-- UTSJSON.Date.getUTCHours.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.getUTCHours.tutorial -->

### getMinutes()

根据本地时间，返回一个指定的日期对象的分钟数。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个 0 到 59 的整数值。 | 


::: preview 

>UTS
```uts
      const birthday = new Date('March 13, 08 04:20');
      console.log('Birthday minutes:', birthday.getMinutes()); // 20

      const date1 = new Date(2016, 6, 6, 14, 6);
      const date2 = new Date(2016, 6, 6, 14, 6, 0, -1);
      const date3 = new Date(2016, 6, 6, 14, 6, 59, 999);
      const date4 = new Date(2016, 6, 6, 14, 6, 59, 1000);

      console.log('First millisecond minutes:', date1.getMinutes()); // 6
      console.log('Previous millisecond minutes:', date2.getMinutes()); // 5
      console.log('Final millisecond minutes:', date3.getMinutes()); // 6
      console.log('Subsequent millisecond minutes:', date4.getMinutes()); // 7
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


### getUTCMinutes()

以世界时为标准，返回一个指定的日期对象的分钟数。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个 0 到 59 的整数。 | 


<!-- UTSJSON.Date.getUTCMinutes.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.getUTCMinutes.tutorial -->

### getSeconds()

根据本地时间，返回一个指定的日期对象的秒数。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个 0 到 59 的整数值。 | 


::: preview 

>UTS
```uts
      const moonLanding = new Date('July 20, 69 00:20:18');
      console.log('Moon landing seconds:', moonLanding.getSeconds()); // 18

      const date1 = new Date(2016, 6, 6, 14, 16, 30);
      const date2 = new Date(2016, 6, 6, 14, 16, 30, -1);
      const date3 = new Date(2016, 6, 6, 14, 16, 30, 999);
      const date4 = new Date(2016, 6, 6, 14, 16, 30, 1000);

      console.log('First millisecond seconds:', date1.getSeconds()); // 30
      console.log('Previous millisecond seconds:', date2.getSeconds()); // 29
      console.log('Final millisecond seconds:', date3.getSeconds()); // 30
      console.log('Subsequent millisecond seconds:', date4.getSeconds()); // 31
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


### getUTCSeconds()

以世界时为标准，返回一个指定的日期对象的秒数。



**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回一个 0 到 59 的整数。 | 


<!-- UTSJSON.Date.getUTCSeconds.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.getUTCSeconds.tutorial -->

### setTime(time)

以一个表示从 1970-1-1 00:00:00 UTC 计时的毫秒数为来为 Date 对象设置时间。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| time | number | 是 | - | - | 一个整数，表示从 1970-1-1 00:00:00 UTC 开始计时的毫秒数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | UTC 1970 年 1 月 1 日 00:00:00 与更新日期之间的毫秒数（实际上是自变量的值）。 | 


::: preview 

>UTS
```uts
      const launchDate = new Date('July 1, 1999, 12:00:00');

      const futureDate = new Date();
      futureDate.setTime(launchDate.getTime());
      console.log('Future date time:', futureDate.getTime()); // Should match launchDate.getTime()
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


### setMilliseconds(ms)

根据本地时间设置一个日期对象的豪秒数。如果指定的数字超出了合理范围，则日期对象的时间信息会被相应地更新。例如，如果指定了 1005，则秒数加 1，豪秒数为 5。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| ms | number | 是 | - | - | 一个 0 到 999 的数字，表示豪秒数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回更新后的时间距 1970 年 1 月 1 日 00:00:00 的毫秒数。 | 


::: preview 

>UTS
```uts
      const event = new Date('August 19, 1975 23:15:30');
      console.log('Original milliseconds:', event.getMilliseconds()); // 0

      event.setMilliseconds(456);
      console.log('Updated milliseconds:', event.getMilliseconds()); // 456
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


### setUTCMilliseconds(ms)

根据世界时来设置指定时间的毫秒数。如果传递的参数超出了指定的范围，setUTCMilliseconds() 方法会相应地尝试更新储存在 Date 的时间信息。例如，假设你传递参数的值是 1100，存储在 Date 的秒数会加 1，然后使用 100 来作为毫秒数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| ms | number | 是 | - | - | 0 - 999 之间的数值，代表毫秒数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回更新后的时间距 1970 年 1 月 1 日 00:00:00 (UTC) 的毫秒数。 | 


<!-- UTSJSON.Date.setUTCMilliseconds.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.setUTCMilliseconds.tutorial -->

### setSeconds(sec)

根据本地时间设置一个日期对象的秒数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| sec | number | 是 | - | - | 一个 0 到 59 的整数。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const event = new Date('August 19, 1975 23:15:30');
      console.log('Original seconds:', event.getSeconds()); // 30

      event.setSeconds(42);
      console.log('Updated seconds:', event.getSeconds()); // 42
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


### setUTCSeconds(sec)

为一个依据国际通用时间的特定日期设置秒数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| sec | number | 是 | - | - | 一个在 0 到 59 之间的整数，表示秒数。 | 


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.Date.setUTCSeconds.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.setUTCSeconds.tutorial -->

### setMinutes(min)

根据本地时间为一个日期对象设置分钟数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| min | number | 是 | - | - | 一个 0 到 59 的整数，表示分钟数。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const event = new Date('August 19, 1975 23:15:30');
      console.log('Original minutes:', event.getMinutes()); // 15

      event.setMinutes(45);
      console.log('Updated minutes:', event.getMinutes()); // 45
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


### setUTCMinutes(min)

根据世界协调时（UTC）来设置指定日期的分钟数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| min | number | 是 | - | - | 必填，表示要设置的分钟数，是一个介于 0 和 59 之间的整数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回从 UTC 时间 1970 年 1 月 1 日 0 时 0 分 0 秒至设置后的时间的毫秒数。 | 


<!-- UTSJSON.Date.setUTCMinutes.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.setUTCMinutes.tutorial -->

### setHours(hours)

根据本地时间为一个日期对象设置小时数，返回从 1970-01-01 00:00:00 UTC 到更新后的 日期 对象实例所表示时间的毫秒数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| hours | number | 是 | - | - | 必填，一个 0 到 23 的整数，表示小时。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const event = new Date('August 19, 1975 23:15:30');
      console.log('Original hours:', event.getHours()); // 23

      event.setHours(20);
      console.log('Updated hours:', event.getHours()); // 20
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


### setUTCHours(hours)

根据世界协调时（UTC）为一个日期对象设置小时数，返回从 1970-01-01 00:00:00 UTC 到更新后的 日期 对象实例所表示时间的毫秒数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| hours | number | 是 | - | - | 必填，表示小时的整数，取值 0 到 23 之间。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 返回从 1970-01-01 00:00:00 UTC 到更新后的日期所表示时间的毫秒数。 | 


<!-- UTSJSON.Date.setUTCHours.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.setUTCHours.tutorial -->

### setDate(date)

根据本地时间来指定一个日期对象的天数。如果 dayValue 超出了月份的合理范围，setDate 将会相应地更新 Date 对象。例如，如果为 dayValue 指定 0，那么日期就会被设置为上个月的最后一天。如果 dayValue 被设置为负数，日期会设置为上个月最后一天往前数这个负数绝对值天数后的日期。-1 会设置为上月最后一天的前一天（译者注：例如当前为 4 月，如果 setDate(-2),则为 3 月 29 日）

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| date | number | 是 | - | - | 一个整数，表示该月的第几天。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const event = new Date('August 19, 1975 23:15:30');
      console.log('Original date:', event.getDate()); // 19

      event.setDate(24);
      console.log('Updated date (24):', event.getDate()); // 24

      event.setDate(32);
      console.log('Updated date (32):', event.getDate()); // 1
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


### setUTCDate(date)

根据全球时间设置特定 date 对象的日期。如果你指定的参数超出了范围，setUTCDate() 会尝试更新对应的Date 中的日期信息。例如，如果你使用了 40 来作为参数，但是Date 中存储的月份为 6 月，那么日期将被改写为 10 且月份被增到 7 月。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| date | number | 是 | - | - | 一个 1-31 的整形数字，用来指定日期。 | 


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.Date.setUTCDate.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.setUTCDate.tutorial -->

### setMonth(month)

根据本地时间为一个日期对象设置月份。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| month | number | 是 | - | - | 必填参数，介于 0 到 11 之间的整数（表示一月到十二月）。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 基于 1 January 1970 00:00:00 UTC 开始计算的毫秒数。 | 


::: preview 

>UTS
```uts
      const event = new Date('August 19, 1975 23:15:30');
      console.log('Original month:', event.getMonth()); // 7 (August)

      event.setMonth(3);
      console.log('Updated month:', event.getMonth()); // 3 (April)
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


### setUTCMonth(month)

根据通用的时间（ UTC ）来设置一个准确的月份。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| month | number | 是 | - | - | 必填参数，一个 0-11 的整数，代表 1 月到 12 月。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 这个数值是从 1970 年 1 月 1 号 00:00:00 到当前时间的毫秒数（国际通用时间） | 


<!-- UTSJSON.Date.setUTCMonth.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | 4.71 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.setUTCMonth.tutorial -->

### setFullYear(year)

各个平台在处理时间戳为负数时会有细节差异，尽量避免 参数小于1970的情况

根据本地时间为一个日期对象设置年份。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| year | number | 是 | - | - | 指定年份的整数值，例如 1995。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const event = new Date('August 19, 1975 23:15:30');
      event.setFullYear(1969);
      console.log('Updated year:', event.getFullYear()); // 1969
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



### setUTCFullYear(year)

根据世界标准时间 (UTC) 为一个具体日期设置年份。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| year | number | 是 | - | - | 指定年份整数值，例如，1995 | 


**返回值**
| 类型 |
| :- |
| number | 


<!-- UTSJSON.Date.setUTCFullYear.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.71 | x | 4.61 | x | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.71 | x | √ |


<!-- UTSJSON.Date.setUTCFullYear.tutorial -->

### parse(s)

解析一个表示某个日期的字符串，并返回从 1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的 UTC 时间）的毫秒数，如果该字符串无法识别，或者一些情况下，包含了不合法的日期数值（如：2015-02-31），则返回值为 NaN。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| s | string | 是 | - | - | 一个符合 RFC2822 或 ISO 8601 日期格式的字符串（其他格式也许也支持，但结果可能与预期不符）。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 一个表示从 1970-1-1 00:00:00 UTC 到给定日期字符串所表示时间的毫秒数的数值。如果参数不能解析为一个有效的日期，则返回NaN。 | 


::: preview 

>UTS
```uts
      const unixTimeZero = Date.parse('01 Jan 1970 00:00:00 GMT');
      console.log('Unix time zero:', unixTimeZero); // 0

      const javaScriptRelease = Date.parse('04 Dec 1995 00:12:00 GMT');
      console.log('JavaScript release:', javaScriptRelease); // 818035920000
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
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.Date)

## Android 平台方法

* 目前 Date 类型编译到 `kotlin` 为 `io.dcloud.uts.Date`


::: preview

> UTS

```ts
let utsDate = new Date("1991-02-03")

// UTS Date 转换 java Date
let javaDate = new java.util.Date()
javaDate.time = utsDate.getTime().toLong()
// Sun Feb 03 1991 08:00:00 GMT+0800
console.log(javaDate)
// java date 转 UTS Date
let nextUTSDate = new Date(javaDate.time)
// Sun Feb 03 1991 08:00:00 GMT+0800
console.log(nextUTSDate)
```

> Kotlin

```kotlin
val utsDate = Date("1991-02-03")
// UTS Date 转换 java Date
val javaDate = java.util.Date()
javaDate.time = utsDate.getTime().toLong()
// Sun Feb 03 1991 08:00:00 GMT+0800
console.log(javaDate)
// java date 转 UTS Date
val nextUTSDate = Date(javaDate.time)
// Sun Feb 03 1991 08:00:00 GMT+0800
console.log(nextUTSDate)
```

:::
