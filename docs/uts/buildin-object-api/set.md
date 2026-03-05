# Set

Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。Set 中的元素只会出现一次，即 Set 中的元素是唯一的。

## 构造函数

### new \<T = any>(values ?: readonly T[] \| null) : Set\<T>;@Constructor(values?)



**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| values | readonly T[] \| null | 否 | - | - |  | 


**返回值**
| 类型 |
| :- |
| Set\<T> | 


<!-- UTSJSON.Set.Constructor.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


<!-- UTSJSON.Set.Constructor.tutorial -->

## 实例属性

### size

返回 Set 对象中（唯一的）元素的个数。



**返回值**
返回 Set 对象中（唯一的）元素的个数。

::: preview 

>UTS
```uts
      const set1 = new Set<any>();
      const object1 = {};
      set1.add(42);
      set1.add('forty two');
      set1.add('forty two');
      set1.add(object1);
      console.log(set1.size);
      // expected output: 3
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


### add(value)

如果 Set 对象中没有具有相同值的元素，则 add() 方法将插入一个具有指定值的新元素到 Set 对象中。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | T | 是 | - | - | 要添加到 Set 对象的元素的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| this | Set 对象本身。 | 


::: preview 

>UTS
```uts
      const set1 = new Set<number>();
      set1.add(42);
      set1.add(42);
      set1.add(13);
      set1.forEach((item) => {
        console.log(item);
        // expected output: 42
        // expected output: 13
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


### clear()

移除 Set 对象中所有元素。



**返回值**
| 类型 |
| :- |
| void | 


::: preview 

>UTS
```uts
      const set1 = new Set<any>();
      set1.add(1);
      set1.add('foo');
      set1.clear();
      console.log(set1.size);
      // expected output: 0
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


### delete(value)

从 Set 对象中删除指定的值（如果该值在 Set 中）。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | T | 是 | - | - | 要从 Set 中移除的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 成功删除返回 true，否则返回 false。 | 


::: preview 

>UTS
```uts
      const set1 = new Set<any>();
      set1.add(10);
      set1.add(20);

      set1.delete(10);
      console.log(set1.size) //1
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

对 Set 对象中的每个值按插入顺序执行一次提供的函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (value: T, value2: T, set: Set\<T>) => void | 是 | - | - | 为集合中每个元素执行的回调函数，该函数接收三个参数：value、key: Set 中正在处理的当前元素。因为 Set 中没有键，所以 value 会被共同传递给这两个参数。set: 调用 forEach() 的 Set 对象。 |
| thisArg | any | 否 | - | - | 值在执行 callbackFn 时作为 this 使用。 | 


**返回值**
| 类型 |
| :- |
| void | 


::: preview 

>UTS
```uts
      const set1 = new Set<any>(['foo', 'bar'])
      let logSetElements = (value: any) => {
        console.log(value);
        // expected output: foo
        // expected output: bar
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

<!-- UTSJSON.Set.forEach_1.description -->

<!-- UTSJSON.Set.forEach_1.param -->

<!-- UTSJSON.Set.forEach_1.returnValue -->

<!-- UTSJSON.Set.forEach_1.test -->

<!-- UTSJSON.Set.forEach_1.compatibility -->

<!-- UTSJSON.Set.forEach_1.tutorial -->

### forEach(callbackfn, thisArg?)

<!-- UTSJSON.Set.forEach_2.description -->

<!-- UTSJSON.Set.forEach_2.param -->

<!-- UTSJSON.Set.forEach_2.returnValue -->

::: preview 

>UTS
```uts
      const set1 = new Set<any>(['foo', 'bar'])
      let logSetElements = (value: any) => {
        console.log(value);
        // expected output: foo
        // expected output: bar
      }
```

:::

<!-- UTSJSON.Set.forEach_2.compatibility -->

<!-- UTSJSON.Set.forEach_2.tutorial -->

### has(value)

返回一个布尔值来指示对应的值是否存在于 Set 对象中。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | T | 是 | - | - | 要测试是否存在于 Set 对象中的值。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果 Set 对象中存在具有指定值的元素，则返回 true；否则返回 false。 | 


::: preview 

>UTS
```uts
      const set1 = new Set<number>([1, 2, 3, 4, 5]);
      console.log(set1.has(1));
      // expected output: true

      console.log(set1.has(5));
      // expected output: true

      console.log(set1.has(6));
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
.


### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.Set)

## Android 平台方法

* 目前 Set 类型编译到 kotlin 为 io.dcloud.uts.Set


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
