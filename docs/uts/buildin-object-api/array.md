# Array

Array 对象是用于构造数组的全局对象，数组是类似于列表的高阶对象。

## 构造函数

### new \<T>(...items : T\[]) : T[]@Constructor(...items)



**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| items | T[\] | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| T[\] | 


::: preview 

>UTS
```uts
      let a1 = [1, 2, 3]
      let a2 = [1, '2', 3]
      console.log(a1) //[1, 2, 3]
      console.log(a2) // [1, '2', 3]
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


<!-- UTSJSON.Array.Constructor.tutorial -->

::: warning 注意事项

与JS中的`Array` 不同，`UTS`不支持的指定长度初始化Array的写法

```ts
let arr = new Array(10)
```

上面的代码在不同的平台的表现有差异:

- web平台

	一个长度为10的数组，每一个元素都是 undefined

- Android/ios平台

	一个长度为1的数组，其元素为 数字10

:::

## 静态方法

### from\<T>(arrayLike: ArrayLike\<T>): T[];

Array.from() 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arrayLike | [ArrayLike\<T>](#arraylike-values) | 是 | - | - | 想要转换成数组的类数组或可迭代对象。 |

#### arrayLike 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| length | number | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| T[\] | 


<!-- UTSJSON.Array.from.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.51 | 4.11 | 4.61 | 4.51 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.51 | 4.51 | √ |



### of\<T>(...items: T[]) : T[]

Array.of() 静态方法通过可变数量的参数创建一个新的 Array 实例，而不考虑参数的数量或类型

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| items | T[\] | 是 | - | - | 用于创建数组的元素。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| T[\] | 新的 Array 实例。 | 


<!-- UTSJSON.Array.of.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.51 | 4.11 | 4.61 | 4.51 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.51 | 4.51 | √ |



### isArray(arg : any) : arg is any[]

Array.isArray() 静态方法用于确定传递的值是否是一个 Array。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arg | any | 是 | - | - | 需要检测的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| arg is any[\] | 如果 value 是 Array，则为 true；否则为 false。如果 value 是 TypedArray 实例，则总是返回 false。 | 


::: preview 

>UTS
```uts
      console.log(Array.isArray([1, 3, 5]));
      // Expected output: true

      console.log(Array.isArray('[]'));
      // Expected output: false

      console.log(Array.isArray(new Array(5)));
      // Expected output: true
      // #ifdef APP-ANDROID
      console.log(Array.isArray(new Int16Array([15, 33])));
      // #endif
      // Expected output: false
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



### fromAsync\<T>(arrayLike: ArrayLike\<T>): T[];

Array.fromAsync() 静态方法可以由一个异步可迭代对象、可迭代对象或类数组对象创建一个新的、浅拷贝的 Array 实例。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arrayLike | [ArrayLike\<T>](#arraylike-values) | 是 | - | - | 要转换为数组的异步可迭代、可迭代或类数组对象。 |
| mapfn | (v: T, k: number) => any | 是 | - | - | 为数组中的每个元素执行的函数。如果提供了该函数，则每个要添加到数组中的值都会先通过该函数处理，mapFn 的返回值将代替该值被添加到数组中（在等待兑现后）。该函数被调用时将传入以下参数：element 数组当前正在处理的元素。index 数组当前正在处理的元素的索引。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Promise\<U[]> | 一个新的 Promise，其兑现值是一个新的 Array 实例。 | 


<!-- UTSJSON.Array.fromAsync.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.51 | 4.11 | 4.61 | 4.51 | 4.51 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.51 | 4.51 | √ |


### fromNative(input)

fromNative() 方法 从native 数据结构中 转换得到一个UTS环境下的Array对象<br/>     支持传入的参数类型有: kotlin.collections.List/ kotlin.Array/kotlin.ByteArray/Kotlin.LongArray/Kotlin.IntArray 等

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| input | kotlin.ByteArray \| Kotlin.LongArray \| Kotlin.IntArray \| Kotlin.FloatArray \| Kotlin.DoubleArray \| Kotlin.ShortArray \| Kotlin.CharArray \| Kotlin.BooleanArray \| kotlin.Array \| kotlin.collections.List | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| Array | 


<!-- UTSJSON.Array.fromNative.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| - | 3.90 | x | - | 3.90 | - | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | - | - |


<!-- UTSJSON.Array.fromNative.tutorial -->


## 实例属性

### length

length 是 Array 的实例属性，表示该数组中元素的个数。该值是一个无符号 32 位整数，并且其数值总是大于数组最大索引。





::: preview 

>UTS
```uts
      const arr = ['shoes', 'shirts', 'socks', 'sweaters'];
      console.log(arr.length)//4
      console.log(arr[1])//'shoes'
      console.log(arr[1])//'shirts'
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


边界情况说明：

- 在不同平台上，数组的长度限制不同，超出限制会导致相应的错误或异常
  * 编译至 JavaScript 平台时，最大长度为 2^32 - 1，超出限制会报错：`Invalid array length`。
  * 编译至 Kotlin 平台时，最大长度受系统内存的限制，超出限制报错：`java.lang.OutOfMemoryError: Failed to allocate a allocation until OOM`。
  * 编译至 Swift 平台时，最大长度也受系统内存的限制，目前超出限制没有返回信息。


## 实例方法

### toString()

toString() 方法返回一个字符串，表示指定的数组及其元素。



**返回值**
| 类型 |
| :- |
| string | 


::: preview 

>UTS
```uts
      const array1: number[] = [1, 2, 3];
      console.log(array1.toString()) //"1,2,3"
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


<!-- UTSJSON.Array.toString.tutorial -->

### add(item)

将指定的元素追加到此列表的末尾，不推荐使用本方法，推荐使用push替代。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| item | T | 是 | - | - | 添加到数组的元素。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 是否成功添加 | 


<!-- UTSJSON.Array.add.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | x | 3.90 | 4.11 | x |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | x |


<!-- UTSJSON.Array.add.tutorial -->

### toLocaleString()

toLocaleString() 方法返回一个字符串，表示数组中的所有元素。每个元素通过调用它们自己的 toLocaleString 方法转换为字符串，并且使用特定于语言环境的字符串（例如逗号“,”）分隔开。



**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.Array.toLocaleString.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | x | x | - | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| x | - | - |


<!-- UTSJSON.Array.toLocaleString.tutorial -->

### joinToString(separator)

从所有元素中使用\[separator]建字符串

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| separator | string | 是 | - | - | 分隔符 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 拼接完成的字符串 | 


<!-- UTSJSON.Array.joinToString.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| - | 3.90 | x | x | 3.90 | - | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | - | - |


<!-- UTSJSON.Array.joinToString.tutorial -->

### find(predicate, thisArg?)

find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 null。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: T, index: number, obj: Array&lt;T&gt;) => boolean | 是 | - | - | 为数组中的每个元素执行的函数。它应该返回一个真值来表示已经找到了匹配的元素。 |
| thisArg | any | 否 | - | - | 执行 callbackFn 时用作 this 的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| S \| null | 数组中第一个满足所提供测试函数的元素的值，否则返回 null | 


::: preview 

>UTS
```uts
      let array2: number[] = [1, 2, 3];
      array2.find((element: number, index: number, array: number[]): boolean => {
        console.log(array[index]) //1=>2=>3
        return true;
      })
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


### find(predicate, thisArg?)

<!-- UTSJSON.Array.find_1.description -->

<!-- UTSJSON.Array.find_1.param -->

<!-- UTSJSON.Array.find_1.returnValue -->

::: preview 

>UTS
```uts
      const array3: number[] = [5, 12, 8, 130, 44];
      const found2 = array3.find((element: number, index: number): boolean => element < 5);
      console.log(found2) // null
```

:::

<!-- UTSJSON.Array.find_1.compatibility -->

<!-- UTSJSON.Array.find_1.tutorial -->

### find(predicate, thisArg?)

<!-- UTSJSON.Array.find_2.description -->

<!-- UTSJSON.Array.find_2.param -->

<!-- UTSJSON.Array.find_2.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[] = [5, 12, 8, 130, 44];
      const found1 = array1.find((element: number): boolean => element > 10);
      console.log(found1) //12
```

:::

<!-- UTSJSON.Array.find_2.compatibility -->

<!-- UTSJSON.Array.find_2.tutorial -->

### findIndex(predicate, thisArg?)

findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: T, index: number, obj: Array&lt;T&gt;) => boolean | 是 | - | - | 为数组中的每个元素执行的函数。它应该返回一个真值以指示已找到匹配元素，否则返回一个假值。 |
| thisArg | any | 否 | - | - | 执行 callbackFn 时用作 this 的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 数组中第一个满足测试条件的元素的索引。否则返回 -1。 | 


::: preview 

>UTS
```uts
      const array1: number[] = [5, 12, 8, 130, 44];
      let isLargeNumber = (element: number, index: number): boolean => element > 13;
      console.log(isLargeNumber)//3

      const array2: number[] = [10, 11, 12];
      console.log(array2.findIndex(isLargeNumber))//3

      const array3: number[] = [1, 2, 3];
      array3.findIndex((element: number, index: number, array: number[]): boolean => {
        console.log(array[index]) //1=>2=>3
        return true;
      })
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


### findIndex(predicate, thisArg?)

<!-- UTSJSON.Array.findIndex_1.description -->

<!-- UTSJSON.Array.findIndex_1.param -->

<!-- UTSJSON.Array.findIndex_1.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[] = [5, 12, 8, 130, 44];
      let isLargeNumber = (element: number, index: number): boolean => element > 13;
      console.log(isLargeNumber)//3

      const array2: number[] = [10, 11, 12];
      console.log(array2.findIndex(isLargeNumber))//3

      const array3: number[] = [1, 2, 3];
      array3.findIndex((element: number, index: number, array: number[]): boolean => {
        console.log(array[index]) //1=>2=>3
        return true;
      })
```

:::

<!-- UTSJSON.Array.findIndex_1.compatibility -->

<!-- UTSJSON.Array.findIndex_1.tutorial -->

### findIndex(predicate, thisArg?)

<!-- UTSJSON.Array.findIndex_2.description -->

<!-- UTSJSON.Array.findIndex_2.param -->

<!-- UTSJSON.Array.findIndex_2.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[] = [5, 12, 8, 130, 44];
      let isLargeNumber = (element: number, index: number): boolean => element > 13;
      console.log(isLargeNumber)//3

      const array2: number[] = [10, 11, 12];
      console.log(array2.findIndex(isLargeNumber))//3

      const array3: number[] = [1, 2, 3];
      array3.findIndex((element: number, index: number, array: number[]): boolean => {
        console.log(array[index]) //1=>2=>3
        return true;
      })
```

:::

<!-- UTSJSON.Array.findIndex_2.compatibility -->

<!-- UTSJSON.Array.findIndex_2.tutorial -->

### fill(value, start?, end?)

fill() 方法用一个固定值填充一个数组中从起始索引（默认为 0）到终止索引（默认为 array.length）内的全部元素。它返回修改后的数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | T | 是 | - | - | 用来填充数组元素的值。注意所有数组中的元素都将是这个确定的值：如果 value 是个对象，那么数组的每一项都会引用这个元素。 |
| start | number | 否 | - | - | 基于零的索引，从此开始填充，转换为整数。 |
| end | number | 否 | - | - | 基于零的索引，在此结束填充，转换为整数。fill() 填充到但不包含 end 索引。 | 


**返回值**
| 类型 |
| :- |
| this | 


::: preview 

>UTS
```uts
      const array1: number[] = [1, 2, 3, 4];
      let ret1 = array1.fill(0, 2, 4)
      console.log(ret1); //[1, 2, 0, 0]
```

:::

需要注意的是，截止HBuilder 4.22  部分平台尚不支持[根据元素个数构造`Array`的写法](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/array.html#constructor)

所以下面的代码在 部分平台可能不符合预期


::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID
      new Array(20).fill(0)
      // #endif

```

:::

可以使用下面的代码替代

::: preview 

>UTS
```uts
      let b = new Array<Number>()
      for (let i = 0; i < 20; i++) {
        b.push(0)
      }
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


### copyWithin(target, start?, end?)

copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| target | number | 是 | - | - | 序列开始替换的目标位置，以 0 为起始的下标表示，且将被转换为整数 |
| start | number | 否 | - | - | 要复制的元素序列的起始位置，以 0 为起始的下标表示，且将被转换为整数 |
| end | number | 否 | - | - | 要复制的元素序列的结束位置，以 0 为起始的下标表示，且将被转换为整数。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。 | 


**返回值**
| 类型 |
| :- |
| this | 


::: preview 

>UTS
```uts
      const arr = ['a', 'b', 'c', 'd', 'e'];
      let ret1 = arr.copyWithin(0, 3, 4)
      console.log(ret1)//["d", "b", "c", "d", "e"]
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


### pop()

pop() 方法从数组中删除最后一个元素，并返回该元素的值。此方法会更改数组的长度。



**返回值**
| 类型 |
| :- |
| T \| null | 


::: preview 

>UTS
```uts
      const plants: string[] = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
      let ret1 = plants.pop()
      console.log(ret1)//"tomato"
      console.log(plants)//["broccoli", "cauliflower", "cabbage", "kale"]
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


### push(...items)

push() 方法将指定的元素添加到数组的末尾，并返回新的数组长度。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| items | T[\] | 是 | - | - | 添加到数组末尾的元素。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 调用方法的对象的新 length 属性。 | 


::: preview 

>UTS
```uts
      const animals: string[] = ['pigs', 'goats', 'sheep'];
      const count = animals.push('cows');
      console.log(count)//4
      console.log(animals) //['pigs', 'goats', 'sheep', 'cows']
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


### concat(...items)

concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| items | ConcatArray\<T>[\] | 是 | - | - | 数组和/或值，将被合并到一个新的数组中。如果省略了所有 valueN 参数，则 concat 会返回调用此方法的现存数组的一个浅拷贝。详情请参阅下文描述。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| T[\] | 新的 Array 实例。 | 


::: preview 

>UTS
```uts
      let ret = ['a', 'b', 'c'].concat(['d', 'e', 'f'])
      console.log(ret) //["a", "b", "c", "d", "e", "f"]
      let ret1 = [1, 2, 3].concat([4, 5, 6])
      console.log(ret1)//[1, 2, 3, 4, 5, 6]
      let ret2 = [''].concat([''])//
      console.log(ret2)//["", ""]

      const num1 = [1, 2, 3];
      const num2 = [4, 5, 6];
      const num3 = [7, 8, 9];
      const numbers = num1.concat(num2, num3);
      console.log(numbers)//[1, 2, 3, 4, 5, 6, 7, 8, 9]
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


### concat(...items)

concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| items | (T \| ConcatArray\<T>)[\] | 是 | - | - | 数组和/或值，将被合并到一个新的数组中。如果省略了所有 valueN 参数，则 concat 会返回调用此方法的现存数组的一个浅拷贝。详情请参阅下文描述。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| T[\] | 新的 Array 实例。 | 


::: preview 

>UTS
```uts
      let ret = ['a', 'b', 'c'].concat(['d', 'e', 'f'])
      console.log(ret) //["a", "b", "c", "d", "e", "f"]
      let ret1 = [1, 2, 3].concat([4, 5, 6])
      console.log(ret1)//[1, 2, 3, 4, 5, 6]
      let ret2 = [''].concat([''])//
      console.log(ret2)//["", ""]

      const num1 = [1, 2, 3];
      const num2 = [4, 5, 6];
      const num3 = [7, 8, 9];
      const numbers = num1.concat(num2, num3);
      console.log(numbers)//[1, 2, 3, 4, 5, 6, 7, 8, 9]
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


### join(separator?)

join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔。如果数组只有一个元素，那么将返回该元素而不使用分隔符。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| separator | string | 否 | - | - | 指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果省略，数组元素用逗号（,）分隔。如果 separator 是空字符串（""），则所有元素之间都没有任何字符。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 一个所有数组元素连接的字符串。如果 arr.length 为 0，则返回空字符串。 | 


::: preview 

>UTS
```uts
      const elements: string[] = ['Fire', 'Air', 'Water'];
      let ret1 = elements.join()//Fire,Air,Water
      let ret2 = elements.join('') //FireAirWater
      let ret3 = elements.join('-')//Fire-Air-Water
      console.log(ret1) // "Fire,Air,Water";
      console.log(ret2) // "FireAirWater";
      console.log(ret3) // "Fire-Air-Water";
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| - | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### reverse()

reverse() 方法就地反转数组中的元素，并返回同一数组的引用。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。换句话说，数组中的元素顺序将被翻转，变为与之前相反的方向。



**返回值**
| 类型 | 描述 |
| :- | :- |
| T[\] | 原始数组反转后的引用。注意，数组是就地反转的，并且没有复制。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


### shift()

shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。



**返回值**
| 类型 | 描述 |
| :- | :- |
| T \| null | 从数组中删除的元素；如果数组为空则返回 null。 | 


::: preview 

>UTS
```uts
      const array1 = [1, 2, 3];

      const firstElement = array1.shift();

      console.log(array1); // [2, 3]

      console.log(firstElement); //1
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

slice() 方法返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的浅拷贝（包括 start，不包括 end），其中 start 和 end 代表了数组元素的索引。原始数组不会被改变。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| start | number | 否 | - | - | 提取起始处的索引（从 0 开始），会转换为整数。 |
| end | number | 否 | - | - | 提取终止处的索引（从 0 开始），会转换为整数。slice() 会提取到但不包括 end 的位置。 | 


**返回值**
| 类型 |
| :- |
| T[\] | 


::: preview 

>UTS
```uts
      const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

      console.log(animals.slice(2));
      //  ["camel", "duck", "elephant"]

      console.log(animals.slice(2, 4));
      //["camel", "duck"]

      console.log(animals.slice(1, 5));
      //  ["bison", "camel", "duck", "elephant"]

      console.log(animals.slice(-2));
      // ["duck", "elephant"]

      console.log(animals.slice(2, -1));
      // ["camel", "duck"]

      console.log(animals.slice());
      //["ant", "bison", "camel", "duck", "elephant"]
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


### sort(compareFn?)

sort() 方法就地对数组的元素进行排序，并返回对相同数组的引用。默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| compareFn | (a: T, b: T) => number | 否 | - | - | 定义排序顺序的函数。返回值应该是一个数字，其正负性表示两个元素的相对顺序。该函数使用以下参数调用： a:第一个用于比较的元素。不会是 null。 b:第二个用于比较的元素。不会是 null。 如果省略该函数，数组元素会被转换为字符串，然后根据每个字符的 Unicode 码位值进行排序。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| this | 经过排序的原始数组的引用。注意数组是就地排序的，不会进行复制。 | 


::: preview 

>UTS
```uts
      const months = ['March', 'Jan', 'Feb', 'Dec'];
      months.sort();
      console.log(months)//["Dec", "Feb", "Jan", "March"]
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


**平台差异性**

在android平台，一定不能忽略两个对比元素相等的场景，否则可能会出现`java.lang.IllegalArgumentException: Comparison method violates its general contract!‌`
::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID
      let a = [2, 0, 4];
      a.sort((a, b): number => {
        // 这里的判断不能省略
        if (a.compareTo(b) == 0) {
          return 0
        }
        return a - b
      })
      // #endif

```

:::



### splice(start, deleteCount, ...items)

splice() 方法通过移除或者替换已存在的元素和/或添加新元素就地改变一个数组的内容。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| start | number | 是 | - | - | 从 0 开始计算的索引，表示要开始改变数组的位置，它会被转换成整数。 |
| deleteCount | number | 否 | - | - | 一个整数，表示数组中要从 start 开始删除的元素数量。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| T[\] | 一个包含了删除的元素的数组。 | 


::: preview 

>UTS
```uts
      const months: string[] = ['Jan', 'March', 'April', 'June'];
      months.splice(1, 0, 'Feb');
      console.log(months)//["Jan", "Feb", "March", "April", "June"]
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


### unshift(...items)

unshift() 方法将指定元素添加到数组的开头，并返回数组的新长度。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| items | T[\] | 是 | - | - | 添加到 arr 开头的元素。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const array1 = [1, 2, 3];
      let ret1 = array1.unshift(4, 5)
      console.log(ret1);
      //  5

      console.log(array1);
      // [4, 5, 1, 2, 3]
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


### indexOf(searchElement, fromIndex?)

indexOf() 方法返回数组中第一次出现给定元素的下标，如果不存在则返回 -1。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchElement | T | 是 | - | - | 数组中要查找的元素。 |
| fromIndex | number | 否 | - | - | 开始搜索的索引（从零开始），会转换为整数。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const beasts: string[] = ['ant', 'bison', 'camel', 'duck', 'bison'];

      console.log(beasts.indexOf('bison')); //  1


      console.log(beasts.indexOf('bison', 2));// 2

      console.log(beasts.indexOf('giraffe'));// -1
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


### lastIndexOf(searchElement, fromIndex?)

lastIndexOf() 方法返回数组中给定元素最后一次出现的索引，如果不存在则返回 -1。该方法从 fromIndex 开始向前搜索数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchElement | T | 是 | - | - | 被查找的元素。 |
| fromIndex | number | 否 | - | - | 以 0 起始的索引，表明反向搜索的起始位置，会被转换为整数。 | 


**返回值**
| 类型 |
| :- |
| number | 


::: preview 

>UTS
```uts
      const animals: string[] = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
      console.log(animals.lastIndexOf('Dodo'));//3
      console.log(animals.lastIndexOf('Tiger'));//1
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


### every(predicate, thisArg?)

every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: T, index: number, array: Array&lt;T&gt;) => boolean | 是 | - | - | 为数组中的每个元素执行的函数。它应该返回一个真值以指示元素通过测试，否则返回一个假值。该函数被调用时将传入以下参数： value:数组中当前正在处理的元素。 index:正在处理的元素在数组中的索引。 array:调用了 every() 的数组本身。 |
| thisArg | any | 否 | - | - | 执行 callbackFn 时用作 this 的值 | 


**返回值**
| 类型 |
| :- |
| this is S[\] | 


::: preview 

>UTS
```uts
      const isBelowThreshold = (currentValue: number): boolean => currentValue < 40;
      const array1: number[] = [1, 30, 39, 29, 10, 13];
      console.log(array1.every(isBelowThreshold));// true

      const array2: number[] = [1, 30, 39, 29, 10, 13, 41];
      console.log(array2.every(isBelowThreshold));// false

      const array3: number[] = [1, 2, 3];
      array3.every((element: number, index: number, array: number[]): boolean => {
        console.log(array[index])//1=>2->3
        return true;
      })

```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | - | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| - | - | √ |


### every(predicate, thisArg?)

every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: T, index: number, array: Array&lt;T&gt;) => boolean | 是 | - | - | 为数组中的每个元素执行的函数。它应该返回一个真值以指示元素通过测试，否则返回一个假值。该函数被调用时将传入以下参数： value:数组中当前正在处理的元素。 index:正在处理的元素在数组中的索引。 array:调用了 every() 的数组本身。 |
| thisArg | any | 否 | - | - | 执行 callbackFn 时用作 this 的值 | 


**返回值**
| 类型 |
| :- |
| boolean | 


::: preview 

>UTS
```uts
      const isBelowThreshold = (currentValue: number): boolean => currentValue < 40;
      const array1: number[] = [1, 30, 39, 29, 10, 13];
      console.log(array1.every(isBelowThreshold));// true

      const array2: number[] = [1, 30, 39, 29, 10, 13, 41];
      console.log(array2.every(isBelowThreshold));// false

      const array3: number[] = [1, 2, 3];
      array3.every((element: number, index: number, array: number[]): boolean => {
        console.log(array[index])//1=>2->3
        return true;
      })

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


<!-- UTSJSON.Array.every_1.tutorial -->

### every(predicate, thisArg?)

<!-- UTSJSON.Array.every_2.description -->

<!-- UTSJSON.Array.every_2.param -->

<!-- UTSJSON.Array.every_2.returnValue -->

::: preview 

>UTS
```uts
      const isBelowThreshold = (currentValue: number): boolean => currentValue < 40;
      const array1: number[] = [1, 30, 39, 29, 10, 13];
      console.log(array1.every(isBelowThreshold));// true

      const array2: number[] = [1, 30, 39, 29, 10, 13, 41];
      console.log(array2.every(isBelowThreshold));// false

      const array3: number[] = [1, 2, 3];
      array3.every((element: number, index: number, array: number[]): boolean => {
        console.log(array[index])//1=>2->3
        return true;
      })

```

:::

<!-- UTSJSON.Array.every_2.compatibility -->

<!-- UTSJSON.Array.every_2.tutorial -->

### every(predicate, thisArg?)

<!-- UTSJSON.Array.every_3.description -->

<!-- UTSJSON.Array.every_3.param -->

<!-- UTSJSON.Array.every_3.returnValue -->

::: preview 

>UTS
```uts
      const isBelowThreshold = (currentValue: number): boolean => currentValue < 40;
      const array1: number[] = [1, 30, 39, 29, 10, 13];
      console.log(array1.every(isBelowThreshold));// true

      const array2: number[] = [1, 30, 39, 29, 10, 13, 41];
      console.log(array2.every(isBelowThreshold));// false

      const array3: number[] = [1, 2, 3];
      array3.every((element: number, index: number, array: number[]): boolean => {
        console.log(array[index])//1=>2->3
        return true;
      })

```

:::

<!-- UTSJSON.Array.every_3.compatibility -->

<!-- UTSJSON.Array.every_3.tutorial -->


### some(predicate, thisArg?)

some() 方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。如果在数组中找到一个元素使得提供的函数返回 true，则返回 true；否则返回 false。它不会修改数组。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: T, index: number, array: Array&lt;T&gt;) => boolean | 是 | - | - | 为数组中的每个元素执行的函数。它应该返回一个真值以指示元素通过测试，否则返回一个假值。该函数被调用时将传入以下参数： value:数组中当前正在处理的元素。 index:正在处理的元素在数组中的索引。 array:调用了 some() 的数组本身。 |
| thisArg | any | 否 | - | - | 执行 callbackFn 时用作 this 的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果回调函数对数组中至少一个元素返回一个真值，则返回 true。否则返回 false。 | 


::: preview 

>UTS
```uts
      const array: number[] = [1, 2, 3, 4, 5];
      const even = (element: number): boolean => element % 2 == 0;
      console.log(array.some(even));//true
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


### some(predicate, thisArg?)

<!-- UTSJSON.Array.some_1.description -->

<!-- UTSJSON.Array.some_1.param -->

<!-- UTSJSON.Array.some_1.returnValue -->

<!-- UTSJSON.Array.some_1.test -->

<!-- UTSJSON.Array.some_1.compatibility -->

<!-- UTSJSON.Array.some_1.tutorial -->

### some(predicate, thisArg?)

<!-- UTSJSON.Array.some_2.description -->

<!-- UTSJSON.Array.some_2.param -->

<!-- UTSJSON.Array.some_2.returnValue -->

<!-- UTSJSON.Array.some_2.test -->

<!-- UTSJSON.Array.some_2.compatibility -->

<!-- UTSJSON.Array.some_2.tutorial -->

### forEach(callbackfn, thisArg?)

forEach() 方法对数组的每个元素执行一次给定的函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (value: T, index: number, array: Array&lt;T&gt;) => void | 是 | - | - | 为数组中每个元素执行的函数。并会丢弃它的返回值。该函数被调用时将传入以下参数： value:数组中正在处理的当前元素。 index:数组中正在处理的当前元素的索引。 array:调用了 forEach() 的数组本身。 |
| thisArg | any | 否 | - | - | 执行 callbackFn 时用作 this 的值。 | 


**返回值**
| 类型 |
| :- |
| void | 


::: preview 

>UTS
```uts
      const array1: string[] = ['a', 'b', 'c'];
      array1.forEach(element => {console.log(element)});
      // expected output: "a"
      // expected output: "b"
      // expected output: "c"
      const items: string[] = ['item1', 'item2', 'item3'];
      const copyItems: string[] = [];
      items.forEach((item: string) => {
        copyItems.push(item);
      });
      console.log(copyItems)//['item1', 'item2', 'item3']
```

:::

> 特别注意：
> 不可在 forEach 的 callbackFn 里添加或者删除原数组元素，此行为是危险的，在 Android 平台会造成闪退，在 iOS 平台会造成行为不符合预期。如果想实现该效果，请用 while 循环。

::: preview 

>UTS
```uts
      let array = ['a', 'b', 'c'];
      array.forEach(element => {
        console.log(element)
        // array.pop() // 此行为在 Android 平台会造成闪退，在 iOS 平台会输出 'a', 'b', 'c', 而 JS 会输出 'a', 'b'
      });

      // 如果想让上述行为正常运行，可以用 while 循环实现：

      array = ['a', 'b', 'c'];
      let index = 0;
      while (index < array.length) {
        console.log(array[index]);
        array.pop();
        index += 1;
      }
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


### forEach(callbackfn, thisArg?)

<!-- UTSJSON.Array.forEach_1.description -->

<!-- UTSJSON.Array.forEach_1.param -->

<!-- UTSJSON.Array.forEach_1.returnValue -->

::: preview 

>UTS
```uts
      const array1: string[] = ['a', 'b', 'c'];
      array1.forEach(element => {console.log(element)});
      // expected output: "a"
      // expected output: "b"
      // expected output: "c"
      const items: string[] = ['item1', 'item2', 'item3'];
      const copyItems: string[] = [];
      items.forEach((item: string) => {
        copyItems.push(item);
      });
      console.log(copyItems)//['item1', 'item2', 'item3']
```

:::

<!-- UTSJSON.Array.forEach_1.compatibility -->

<!-- UTSJSON.Array.forEach_1.tutorial -->

### forEach(callbackfn, thisArg?)

<!-- UTSJSON.Array.forEach_2.description -->

<!-- UTSJSON.Array.forEach_2.param -->

<!-- UTSJSON.Array.forEach_2.returnValue -->

::: preview 

>UTS
```uts
      const array1: string[] = ['a', 'b', 'c'];
      array1.forEach(element => {console.log(element)});
      // expected output: "a"
      // expected output: "b"
      // expected output: "c"
      const items: string[] = ['item1', 'item2', 'item3'];
      const copyItems: string[] = [];
      items.forEach((item: string) => {
        copyItems.push(item);
      });
      console.log(copyItems)//['item1', 'item2', 'item3']
```

:::

<!-- UTSJSON.Array.forEach_2.compatibility -->

<!-- UTSJSON.Array.forEach_2.tutorial -->

### map(callbackfn, thisArg?)

map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (value: T, index: number, array: Array&lt;T&gt;) => any | 是 | - | - | 为数组中的每个元素执行的函数。它的返回值作为一个元素被添加为新数组中。该函数被调用时将传入以下参数： value:数组中当前正在处理的元素。 index:正在处理的元素在数组中的索引。 array:调用了 map() 的数组本身。 |
| thisArg | any | 否 | - | - | 执行 callbackFn 时用作 this 的值 | 


**返回值**
| 类型 |
| :- |
| U[\] | 


::: preview 

>UTS
```uts
      const array1: number[] = [1, 4, 9, 16];
      const map1 = array1.map((x: number): number => x * 2);
      console.log(map1);
      // expected output: Array [2, 8, 18, 32]
      const numbers: number[] = [1, 4, 9];
      const roots = numbers.map((num: number): number => num + 1);


      const array2: number[] = [1, 2, 3];
      array2.map((element: number, index: number, array: number[]) => {
        console.log(array[index]) //1=>2=>3
      })
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


### map(callbackfn, thisArg?)

<!-- UTSJSON.Array.map_1.description -->

<!-- UTSJSON.Array.map_1.param -->

<!-- UTSJSON.Array.map_1.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[] = [1, 4, 9, 16];
      const map1 = array1.map((x: number): number => x * 2);
      console.log(map1);
      // expected output: Array [2, 8, 18, 32]
      const numbers: number[] = [1, 4, 9];
      const roots = numbers.map((num: number): number => num + 1);


      const array2: number[] = [1, 2, 3];
      array2.map((element: number, index: number, array: number[]) => {
        console.log(array[index]) //1=>2=>3
      })
```

:::

<!-- UTSJSON.Array.map_1.compatibility -->

<!-- UTSJSON.Array.map_1.tutorial -->

### map(callbackfn, thisArg?)

<!-- UTSJSON.Array.map_2.description -->

<!-- UTSJSON.Array.map_2.param -->

<!-- UTSJSON.Array.map_2.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[] = [1, 4, 9, 16];
      const map1 = array1.map((x: number): number => x * 2);
      console.log(map1);
      // expected output: Array [2, 8, 18, 32]
      const numbers: number[] = [1, 4, 9];
      const roots = numbers.map((num: number): number => num + 1);


      const array2: number[] = [1, 2, 3];
      array2.map((element: number, index: number, array: number[]) => {
        console.log(array[index]) //1=>2=>3
      })
```

:::

<!-- UTSJSON.Array.map_2.compatibility -->

<!-- UTSJSON.Array.map_2.tutorial -->

### filter(predicate, thisArg?)

filter() 方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: T, index: number, array: Array&lt;T&gt;) => boolean | 是 | - | - | 为数组中的每个元素执行的函数。它应该返回一个真值以将元素保留在结果数组中，否则返回一个假值。该函数被调用时将传入以下参数： value:数组中当前正在处理的元素。 index:正在处理的元素在数组中的索引。 array:调用了 filter() 的数组本身。 |
| thisArg | any | 否 | - | - | 执行 callbackFn 时用作 this 的值 | 


**返回值**
| 类型 |
| :- |
| S[\] | 


::: preview 

>UTS
```uts
      const words: string[] = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
      const result = words.filter((word: string): boolean => word.length > 6);
      console.log(result);// ["exuberant", "destruction", "present"]

      const array1: number[] = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      const isPrime = array1.filter((num: number): boolean => {
        for (let i = 2; num > i; i++) {
          // swift里，基础类型暂不支持!==,===对比
          if (num % i == 0) {
            return false;
          }
        }
        return num > 1;
      })
      console.log(isPrime)//[2, 3, 5, 7, 11, 13]

      const array2: number[] = [1, 2, 3];
      array2.filter((element: number, index: number, array: number[]): boolean => {
        console.log(array[index])//1=>2=>3
        return true;
      })
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | - | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| - | - | √ |


### filter(predicate, thisArg?)

filter() 方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| predicate | (value: T, index: number, array: Array&lt;T&gt;) => boolean | 是 | - | - | 为数组中的每个元素执行的函数。它应该返回一个真值以将元素保留在结果数组中，否则返回一个假值。该函数被调用时将传入以下参数： value:数组中当前正在处理的元素。 index:正在处理的元素在数组中的索引。 array:调用了 filter() 的数组本身。 |
| thisArg | any | 否 | - | - | 执行 callbackFn 时用作 this 的值 | 


**返回值**
| 类型 |
| :- |
| T[\] | 


::: preview 

>UTS
```uts
      const words: string[] = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
      const result = words.filter((word: string): boolean => word.length > 6);
      console.log(result);// ["exuberant", "destruction", "present"]

      const array1: number[] = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      const isPrime = array1.filter((num: number): boolean => {
        for (let i = 2; num > i; i++) {
          // swift里，基础类型暂不支持!==,===对比
          if (num % i == 0) {
            return false;
          }
        }
        return num > 1;
      })
      console.log(isPrime)//[2, 3, 5, 7, 11, 13]

      const array2: number[] = [1, 2, 3];
      array2.filter((element: number, index: number, array: number[]): boolean => {
        console.log(array[index])//1=>2=>3
        return true;
      })
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


<!-- UTSJSON.Array.filter_1.tutorial -->

### filter(predicate, thisArg?)

<!-- UTSJSON.Array.filter_2.description -->

<!-- UTSJSON.Array.filter_2.param -->

<!-- UTSJSON.Array.filter_2.returnValue -->

::: preview 

>UTS
```uts
      const words: string[] = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
      const result = words.filter((word: string): boolean => word.length > 6);
      console.log(result);// ["exuberant", "destruction", "present"]

      const array1: number[] = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      const isPrime = array1.filter((num: number): boolean => {
        for (let i = 2; num > i; i++) {
          // swift里，基础类型暂不支持!==,===对比
          if (num % i == 0) {
            return false;
          }
        }
        return num > 1;
      })
      console.log(isPrime)//[2, 3, 5, 7, 11, 13]

      const array2: number[] = [1, 2, 3];
      array2.filter((element: number, index: number, array: number[]): boolean => {
        console.log(array[index])//1=>2=>3
        return true;
      })
```

:::

<!-- UTSJSON.Array.filter_2.compatibility -->

<!-- UTSJSON.Array.filter_2.tutorial -->

### filter(predicate, thisArg?)

<!-- UTSJSON.Array.filter_3.description -->

<!-- UTSJSON.Array.filter_3.param -->

<!-- UTSJSON.Array.filter_3.returnValue -->

::: preview 

>UTS
```uts
      const words: string[] = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
      const result = words.filter((word: string): boolean => word.length > 6);
      console.log(result);// ["exuberant", "destruction", "present"]

      const array1: number[] = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      const isPrime = array1.filter((num: number): boolean => {
        for (let i = 2; num > i; i++) {
          // swift里，基础类型暂不支持!==,===对比
          if (num % i == 0) {
            return false;
          }
        }
        return num > 1;
      })
      console.log(isPrime)//[2, 3, 5, 7, 11, 13]

      const array2: number[] = [1, 2, 3];
      array2.filter((element: number, index: number, array: number[]): boolean => {
        console.log(array[index])//1=>2=>3
        return true;
      })
```

:::

<!-- UTSJSON.Array.filter_3.compatibility -->

<!-- UTSJSON.Array.filter_3.tutorial -->

### reduce(callbackfn)

reduce() 方法对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (previousValue: T, currentValue: T, currentIndex: number, array: Array&lt;T&gt;) => T | 是 | - | - | 为数组中每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。该函数被调用时将传入以下参数： previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为 array\[0] 的值。 currentValue:当前元素的值。在第一次调用时，如果指定了 initialValue，则为 array[0] 的值，否则为 array[1] currentIndex:currentValue 在数组中的索引位置。在第一次调用时，如果指定了 initialValue 则为 0，否则为 1 array:调用了 reduce() 的数组本身。 | 


**返回值**
| 类型 |
| :- |
| T | 


::: preview 

>UTS
```uts
      const array1: number[] = [1, 2, 3, 4];
      const initialValue: number = 0;
      const sumWithInitial = array1.reduce(
        (previousValue: number, currentValue: number): number => previousValue + currentValue,
        initialValue
      );
      console.log(sumWithInitial)//10
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



### reduce(callbackfn)

reduce() 方法对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (previousValue: T, currentValue: T, currentIndex: number, array: Array&lt;T&gt;) => T | 是 | - | - | 为数组中每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。该函数被调用时将传入以下参数： previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为 array\[0] 的值。 currentValue:当前元素的值。在第一次调用时，如果指定了 initialValue，则为 array[0] 的值，否则为 array[1] currentIndex:currentValue 在数组中的索引位置。在第一次调用时，如果指定了 initialValue 则为 0，否则为 1 array:调用了 reduce() 的数组本身。 |
| initialValue | T | 是 | - | - | 第一次调用回调时初始化 accumulator 的值。如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。如果没有指定 initialValue，则 accumulator 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。在这种情况下，如果数组为空（没有第一个值可以作为 accumulator 返回），则会抛出错误。 | 


**返回值**
| 类型 |
| :- |
| T | 


::: preview 

>UTS
```uts
      const array1: number[] = [1, 2, 3, 4];
      const initialValue: number = 0;
      const sumWithInitial = array1.reduce(
        (previousValue: number, currentValue: number): number => previousValue + currentValue,
        initialValue
      );
      console.log(sumWithInitial)//10
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


<!-- UTSJSON.Array.reduce_1.tutorial -->

### reduce(callbackfn, initialValue)

reduce() 方法对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (previousValue: any, currentValue: T, currentIndex: number, array: Array&lt;T&gt;) => any | 是 | - | - | 为数组中每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。该函数被调用时将传入以下参数： previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为 array\[0] 的值。 currentValue:当前元素的值。在第一次调用时，如果指定了 initialValue，则为 array[0] 的值，否则为 array[1] currentIndex:currentValue 在数组中的索引位置。在第一次调用时，如果指定了 initialValue 则为 0，否则为 1 array:调用了 reduce() 的数组本身。 |
| initialValue | U | 是 | - | - | 第一次调用回调时初始化 accumulator 的值。如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。如果没有指定 initialValue，则 accumulator 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。在这种情况下，如果数组为空（没有第一个值可以作为 accumulator 返回），则会抛出错误。 | 


**返回值**
| 类型 |
| :- |
| U | 


::: preview 

>UTS
```uts
      const array1: number[] = [1, 2, 3, 4];
      const initialValue: number = 0;
      const sumWithInitial = array1.reduce(
        (previousValue: number, currentValue: number): number => previousValue + currentValue,
        initialValue
      );
      console.log(sumWithInitial)//10
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | - | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| - | - | √ |


<!-- UTSJSON.Array.reduce_2.tutorial -->

### reduce(callbackfn, initialValue)

<!-- UTSJSON.Array.reduce_3.description -->

<!-- UTSJSON.Array.reduce_3.param -->

<!-- UTSJSON.Array.reduce_3.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[] = [1, 2, 3, 4];
      const initialValue: number = 0;
      const sumWithInitial = array1.reduce(
        (previousValue: number, currentValue: number): number => previousValue + currentValue,
        initialValue
      );
      console.log(sumWithInitial)//10
```

:::

<!-- UTSJSON.Array.reduce_3.compatibility -->

<!-- UTSJSON.Array.reduce_3.tutorial -->

### reduce(callbackfn, initialValue)

<!-- UTSJSON.Array.reduce_4.description -->

<!-- UTSJSON.Array.reduce_4.param -->

<!-- UTSJSON.Array.reduce_4.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[] = [1, 2, 3, 4];
      const initialValue: number = 0;
      const sumWithInitial = array1.reduce(
        (previousValue: number, currentValue: number): number => previousValue + currentValue,
        initialValue
      );
      console.log(sumWithInitial)//10
```

:::

<!-- UTSJSON.Array.reduce_4.compatibility -->

<!-- UTSJSON.Array.reduce_4.tutorial -->

### reduce(callbackfn, initialValue)

<!-- UTSJSON.Array.reduce_5.description -->

<!-- UTSJSON.Array.reduce_5.param -->

<!-- UTSJSON.Array.reduce_5.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[] = [1, 2, 3, 4];
      const initialValue: number = 0;
      const sumWithInitial = array1.reduce(
        (previousValue: number, currentValue: number): number => previousValue + currentValue,
        initialValue
      );
      console.log(sumWithInitial)//10
```

:::

<!-- UTSJSON.Array.reduce_5.compatibility -->

<!-- UTSJSON.Array.reduce_5.tutorial -->

### reduceRight(callbackfn)

reduceRight() 方法对累加器（accumulator）和数组的每个值（按从右到左的顺序）应用一个函数，并使其成为单个值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (previousValue: T, currentValue: T, currentIndex: number, array: Array&lt;T&gt;) => T | 是 | - | - | 为数组中的每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将成为 reduceRight() 的返回值。该函数被调用时将传入以下参数： previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为数组最后一个元素的值。 currentValue:数组中当前正在处理的元素。 currentIndex:正在处理的元素在数组中的索引。 array:调用了 reduceRight() 的数组本身。 | 


**返回值**
| 类型 |
| :- |
| T | 


::: preview 

>UTS
```uts
      const array1: number[][] = [[0, 1], [2, 3], [4, 5]];
      const result1 = array1.reduceRight((accumulator: number[], currentValue: number[]): number[] => accumulator.concat(currentValue));
      console.log(result1) //[4, 5, 2, 3, 0, 1]


      const array2: number[] = [1, 2, 3, 4];
      let result2 = array2.reduceRight((acc: number, cur: number, index: number, array: number[]): number => {
        return acc + cur;
      });

      console.log(result2) //10


      const result3 = array2.reduceRight((acc: number, cur: number): number => acc + cur, 5);
      console.log(result3) //15
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


### reduceRight(callbackfn)

reduceRight() 方法对累加器（accumulator）和数组的每个值（按从右到左的顺序）应用一个函数，并使其成为单个值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (previousValue: T, currentValue: T, currentIndex: number, array: Array&lt;T&gt;) => T | 是 | - | - | 为数组中的每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将成为 reduceRight() 的返回值。该函数被调用时将传入以下参数： previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为数组最后一个元素的值。 currentValue:数组中当前正在处理的元素。 currentIndex:正在处理的元素在数组中的索引。 array:调用了 reduceRight() 的数组本身。 |
| initialValue | T | 是 | - | - | 首次调用 callbackFn 时累加器的值。如果不提供初始值，则将使用数组中的最后一个元素，并在迭代时跳过它。没有初始值的情况下，在空数组上调用 reduceRight() 会产生 TypeError。 | 


**返回值**
| 类型 |
| :- |
| T | 


::: preview 

>UTS
```uts
      const array1: number[][] = [[0, 1], [2, 3], [4, 5]];
      const result1 = array1.reduceRight((accumulator: number[], currentValue: number[]): number[] => accumulator.concat(currentValue));
      console.log(result1) //[4, 5, 2, 3, 0, 1]


      const array2: number[] = [1, 2, 3, 4];
      let result2 = array2.reduceRight((acc: number, cur: number, index: number, array: number[]): number => {
        return acc + cur;
      });

      console.log(result2) //10


      const result3 = array2.reduceRight((acc: number, cur: number): number => acc + cur, 5);
      console.log(result3) //15
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


<!-- UTSJSON.Array.reduceRight_1.tutorial -->

### reduceRight(callbackfn)

reduceRight() 方法对累加器（accumulator）和数组的每个值（按从右到左的顺序）应用一个函数，并使其成为单个值。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (previousValue: any, currentValue: T, currentIndex: number, array: Array&lt;T&gt;) => any | 是 | - | - | 为数组中的每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将成为 reduceRight() 的返回值。该函数被调用时将传入以下参数： previousValue:上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为数组最后一个元素的值。 currentValue:数组中当前正在处理的元素。 index:正在处理的元素在数组中的索引。 array:调用了 reduceRight() 的数组本身。 |
| initialValue | U | 是 | - | - | 首次调用 callbackFn 时累加器的值。如果不提供初始值，则将使用数组中的最后一个元素，并在迭代时跳过它。没有初始值的情况下，在空数组上调用 reduceRight() 会产生 TypeError。 | 


**返回值**
| 类型 |
| :- |
| U | 


::: preview 

>UTS
```uts
      const array1: number[][] = [[0, 1], [2, 3], [4, 5]];
      const result1 = array1.reduceRight((accumulator: number[], currentValue: number[]): number[] => accumulator.concat(currentValue));
      console.log(result1) //[4, 5, 2, 3, 0, 1]


      const array2: number[] = [1, 2, 3, 4];
      let result2 = array2.reduceRight((acc: number, cur: number, index: number, array: number[]): number => {
        return acc + cur;
      });

      console.log(result2) //10


      const result3 = array2.reduceRight((acc: number, cur: number): number => acc + cur, 5);
      console.log(result3) //15
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | x | 4.61 | - | - | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| - | - | √ |


<!-- UTSJSON.Array.reduceRight_2.tutorial -->

### reduceRight(callbackfn, initialValue)

<!-- UTSJSON.Array.reduceRight_3.description -->

<!-- UTSJSON.Array.reduceRight_3.param -->

<!-- UTSJSON.Array.reduceRight_3.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[][] = [[0, 1], [2, 3], [4, 5]];
      const result1 = array1.reduceRight((accumulator: number[], currentValue: number[]): number[] => accumulator.concat(currentValue));
      console.log(result1) //[4, 5, 2, 3, 0, 1]


      const array2: number[] = [1, 2, 3, 4];
      let result2 = array2.reduceRight((acc: number, cur: number, index: number, array: number[]): number => {
        return acc + cur;
      });

      console.log(result2) //10


      const result3 = array2.reduceRight((acc: number, cur: number): number => acc + cur, 5);
      console.log(result3) //15
```

:::

<!-- UTSJSON.Array.reduceRight_3.compatibility -->

<!-- UTSJSON.Array.reduceRight_3.tutorial -->

### reduceRight(callbackfn, initialValue)

<!-- UTSJSON.Array.reduceRight_4.description -->

<!-- UTSJSON.Array.reduceRight_4.param -->

<!-- UTSJSON.Array.reduceRight_4.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[][] = [[0, 1], [2, 3], [4, 5]];
      const result1 = array1.reduceRight((accumulator: number[], currentValue: number[]): number[] => accumulator.concat(currentValue));
      console.log(result1) //[4, 5, 2, 3, 0, 1]


      const array2: number[] = [1, 2, 3, 4];
      let result2 = array2.reduceRight((acc: number, cur: number, index: number, array: number[]): number => {
        return acc + cur;
      });

      console.log(result2) //10


      const result3 = array2.reduceRight((acc: number, cur: number): number => acc + cur, 5);
      console.log(result3) //15
```

:::

<!-- UTSJSON.Array.reduceRight_4.compatibility -->

<!-- UTSJSON.Array.reduceRight_4.tutorial -->

### reduceRight(callbackfn, initialValue)

<!-- UTSJSON.Array.reduceRight_5.description -->

<!-- UTSJSON.Array.reduceRight_5.param -->

<!-- UTSJSON.Array.reduceRight_5.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[][] = [[0, 1], [2, 3], [4, 5]];
      const result1 = array1.reduceRight((accumulator: number[], currentValue: number[]): number[] => accumulator.concat(currentValue));
      console.log(result1) //[4, 5, 2, 3, 0, 1]


      const array2: number[] = [1, 2, 3, 4];
      let result2 = array2.reduceRight((acc: number, cur: number, index: number, array: number[]): number => {
        return acc + cur;
      });

      console.log(result2) //10


      const result3 = array2.reduceRight((acc: number, cur: number): number => acc + cur, 5);
      console.log(result3) //15
```

:::

<!-- UTSJSON.Array.reduceRight_5.compatibility -->

<!-- UTSJSON.Array.reduceRight_5.tutorial -->

### reduceRight(callbackfn, initialValue)

<!-- UTSJSON.Array.reduceRight_6.description -->

<!-- UTSJSON.Array.reduceRight_6.param -->

<!-- UTSJSON.Array.reduceRight_6.returnValue -->

::: preview 

>UTS
```uts
      const array1: number[][] = [[0, 1], [2, 3], [4, 5]];
      const result1 = array1.reduceRight((accumulator: number[], currentValue: number[]): number[] => accumulator.concat(currentValue));
      console.log(result1) //[4, 5, 2, 3, 0, 1]


      const array2: number[] = [1, 2, 3, 4];
      let result2 = array2.reduceRight((acc: number, cur: number, index: number, array: number[]): number => {
        return acc + cur;
      });

      console.log(result2) //10


      const result3 = array2.reduceRight((acc: number, cur: number): number => acc + cur, 5);
      console.log(result3) //15
```

:::

<!-- UTSJSON.Array.reduceRight_6.compatibility -->

<!-- UTSJSON.Array.reduceRight_6.tutorial -->

### includes(searchElement, fromIndex?)

includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| searchElement | any | 是 | - | - | 需要查找的值。 |
| fromIndex | number | 否 | - | - | 可选。开始搜索的索引（从零开始），会转换为整数。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 一个布尔值，如果在数组中（或者在 fromIndex 所指示的数组部分中，如果指定 fromIndex 的话）找到 searchElement 值，则该值为 true。 | 


::: preview 

>UTS
```uts
      const array1: number[] = [1, 2, 3];
      console.log(array1.includes(2))//true
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


### toKotlinList()

toKotlinList() 将当前的Array对象转换为 kotlin 中对应的List对象



**返回值**
| 类型 |
| :- |
| kotlin.collections.List\<any> | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | x | 3.90 | - | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | - | - |


::: preview 

>UTS
```uts
      // #ifdef APP-ANDROID
      let utsArray = ["1", 2, 3.0]
      let javaArray = utsArray.toTypedArray();
      let kotlinArray = utsArray.toKotlinList()

      let convertArrayFromJava = Array.fromNative(javaArray);
      let convertArrayFromKotlin = Array.fromNative(kotlinArray);
      console.log(convertArrayFromJava[0] == convertArrayFromKotlin[0])//true

      console.log(convertArrayFromJava[0])//"1"
```

:::

<!-- UTSJSON.Array.toKotlinList.tutorial -->


### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.Array)



## Android 平台方法

* 目前 Array 类型编译到 `kotlin` 为 `io.dcloud.uts.UTSArray`, 该类继承自 `java.util.ArrayList`,所有`java` /`kotlin` 为其提供的扩展函数(如:`toTypedArray` 等)，均可以正常调用。


::: preview

> UTS

```ts
let utsArray = ["1",2,3.0]
// UTSArray 分别转换为 Java Array / Kotlin Array
let javaArray = utsArray.toTypedArray();
let kotlinArray = utsArray.toKotlinList()
// 从Java Array 转换为 UTSArray
let convertArrayFromJava = Array.fromNative(javaArray);
// 从Kotlin Array 转换为 UTSArray
let convertArrayFromKotlin = Array.fromNative(kotlinArray);
```

> Kotlin

```kotlin
val utsArray = utsArrayOf("1",2,3.0)
// UTSArray 分别转换为 Java Array / Kotlin Array
val javaArray = utsArray.toTypedArray();
val kotlinArray = utsArray.toKotlinList()
// 从Java Array 转换为 UTSArray
val convertArrayFromJava = UTSArray.fromNative(javaArray);
// 从Kotlin Array 转换为 UTSArray
val convertArrayFromKotlin = UTSArray.fromNative(kotlinArray);
```

:::


更多平台专属Array 参考[文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#kotlin%E4%B8%93%E6%9C%89%E6%95%B0%E7%BB%84%E7%B1%BB%E5%9E%8B)

## 常见操作

- 创建数组
::: preview 

>UTS
```uts
      const fruits = ['Apple', 'Banana']
      console.log(fruits.length)
```

:::
- 通过索引访问数组元素
::: preview 

>UTS
```uts
      const first = fruits[0]
      console.log(first)     // Apple

      const last = fruits[fruits.length - 1]
      console.log(last) // Banana
```

:::
- 遍历数组
::: preview 

>UTS
```uts
      fruits.forEach(function (item, index: number, array) {
        console.log(item, index)
      })
      // Apple 0
      // Banana 1
```

:::
- 注意：数组遍历不推荐使用 for in 语句，因为在 ts 中 for in 遍历的是数组的下标，而在 Swift 和 Kottlin 中遍历的是数组的元素，存在行为不一致。

- 添加元素到数组的末尾
::: preview 

>UTS
```uts
      let newLength = fruits.push('Orange')
      // ["Apple", "Banana", "Orange"]
      console.log(newLength)//3
```

:::
- 删除数组末尾的元素
::: preview 

>UTS
```uts
      const lastE = fruits.pop() // remove Orange (from the end)
      // ["Apple", "Banana"]
      console.log(lastE)
```

:::
- 删除数组头部元素
::: preview 

>UTS
```uts
      const firstE = fruits.shift() // remove Apple from the front
      console.log(firstE) // ["Banana"]
```

:::
- 添加元素到数组的头部
::: preview 

>UTS
```uts
      newLength = fruits.unshift('Strawberry') // add to the front
      console.log(newLength) // 2
      // ["Strawberry", "Banana"]
```

:::
- 找出某个元素在数组中的索引
::: preview 

>UTS
```uts
      fruits.push('Mango')
      // ["Strawberry", "Banana", "Mango"]
      let pos = fruits.indexOf('Banana')
      // 1
```

:::
- 通过索引删除某个元素
::: preview 

>UTS
```uts
      const removedItem = fruits.splice(pos, 1) // this is how to remove an item
      console.log(removedItem) // ["Banana"]

```

:::
- 从一个索引位置删除多个元素
::: preview 

>UTS
```uts
      const vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot']
      console.log(vegetables)
      // ["Cabbage", "Turnip", "Radish", "Carrot"]
      pos = 1
      const n = 2
      const removedItems = vegetables.splice(pos, n)
      // this is how to remove items, n defines the number of items to be removed,
      // starting at the index position specified by pos and progressing toward the end of array.
      console.log(vegetables)
      // ["Cabbage", "Carrot"] (the original array is changed)
      console.log(removedItems)
      // ["Turnip", "Radish"]
```

:::
- 复制一个数组
::: preview 

>UTS
```uts
      const shallowCopy = fruits.slice() // this is how to make a copy
      console.log(shallowCopy) // ["Strawberry", "Mango"]
```

:::
### 访问数组元素

数组的索引是从 0 开始的，第一个元素的索引为 0，最后一个元素的索引等于该数组的 长度 减 1。

如果指定的索引是一个无效值，将会抛出 IndexOutOfBoundsException 异常

下面的写法是错误的，运行时会抛出 SyntaxError 异常，而原因则是使用了非法的属性名：
```ts
console.log(arr.0) // a syntax error
```
