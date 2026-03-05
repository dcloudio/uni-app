# Map

Map 对象保存键值对。任何值（对象或者基本类型）都可以作为一个键或一个值。

**注意：请勿使用下标访问或设置map的键值对，此用法虽然在uts转为kotlin时可用，但是并不跨端**

```ts
const map = new Map<string, string>()
map['key1'] = 'value1' // 不跨端的用法
map.set('key1', 'value1') // 跨端用法
console.log(map['key1']) // 不跨端的用法
console.log(map.get('key1')) // 跨端用法
```

### new() : Map\<any, any>;@Constructor()





**返回值**
| 类型 | 描述 |
| :- | :- |
| Map\<any, any> | Map 对象。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


<!-- UTSJSON.Map.Constructor.tutorial -->

### new \<K, V>(entries ?: readonly (readonly \[K, V])[]\| null) : Map\<K, V>;@Constructor(entries?)



**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| entries | readonly (readonly \\[K, V])[]\| null | 否 | - | - | 元素为键值对的数组，eg: \[[key1, value1], [key2, value2]] | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Map\<K, V> | Map 对象。 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | √ | √ |


<!-- UTSJSON.Map.Constructor_1.tutorial -->

## 实例属性


### size





**返回值**
Map 对象的成员数量。

::: preview 

>UTS
```uts
      const map1: Map<string, string> = new Map();
      map1.set('a', 'alpha');
      map1.set('b', 'beta');
      map1.set('g', 'gamma');
      console.log(map1.size);
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


### clear()

移除 Map 对象中的所有元素。



**返回值**
| 类型 |
| :- |
| void | 


::: preview 

>UTS
```uts
      const map1 = new Map<string, string>();
      map1.set('bar', 'baz');
      map1.set("1", 'foo');
      map1.clear();
      console.log(map1.size);
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


### delete(key)

用于移除 Map 对象中指定的元素。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | K | 是 | - | - | 要从 Map 对象中删除的元素的键。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果 Map 对象中的元素存在并已被移除，则为 true；如果该元素不存在，则为 false。 | 


::: preview 

>UTS
```uts
      const map1 = new Map<string, string>();
      map1.set('bar', 'foo');
      let ret1 = map1.delete('bar')
      console.log(ret1);
      // expected result: true
      // (true indicates successful removal)
      console.log(map1.has('bar'));
      // expected result: false
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

按照插入顺序依次对 Map 中每个键/值对执行一次给定的函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (value: any, key: any, map: Map\<K, V>) => void | 是 | - | - | Map 中每个元素所要执行的函数。它具有如下的参数： value: 每个迭代的值。 key: 每个迭代的键。 map: 正在迭代的 Map。 |
| thisArg | any | 否 | - | - | 在 callbackfn 执行中使用的 this 的值。 | 


**返回值**
| 类型 |
| :- |
| void | 


::: preview 

>UTS
```uts
      const map1 = new Map<string, string>();
      map1.set('key1', 'value1');
      map1.set('key2', 'value2');
      map1.set('key3', 'value3');
      map1.forEach((value: string, key: string, map: Map<string, string>) => {
        console.log(key)
        console.log(value)
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



### forEach(callbackfn, thisArg?)

按照插入顺序依次对 Map 中每个键/值对执行一次给定的函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (value: any) => void | 是 | - | - | Map 中每个元素所要执行的函数。它具有如下的参数： value: 每个迭代的值。 |
| thisArg | any | 否 | - | - | 在 callbackfn 执行中使用的 this 的值。 | 


**返回值**
| 类型 |
| :- |
| void | 


::: preview 

>UTS
```uts
      const map1 = new Map<string, string>();
      map1.set('key1', 'value1');
      map1.set('key2', 'value2');
      map1.set('key3', 'value3');
      map1.forEach((value: string, key: string, map: Map<string, string>) => {
        console.log(key)
        console.log(value)
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


<!-- UTSJSON.Map.forEach_1.tutorial -->

### forEach(callbackfn, thisArg?)

按照插入顺序依次对 Map 中每个键/值对执行一次给定的函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackfn | (value: any, key: any) => void | 是 | - | - | Map 中每个元素所要执行的函数。它具有如下的参数： value: 每个迭代的值。 key: 每个迭代的键。 |
| thisArg | any | 否 | - | - | 在 callbackfn 执行中使用的 this 的值。 | 


**返回值**
| 类型 |
| :- |
| void | 


::: preview 

>UTS
```uts
      const map1 = new Map<string, string>();
      map1.set('key1', 'value1');
      map1.set('key2', 'value2');
      map1.set('key3', 'value3');
      map1.forEach((value: string, key: string, map: Map<string, string>) => {
        console.log(key)
        console.log(value)
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


<!-- UTSJSON.Map.forEach_2.tutorial -->

### get(key)

从 Map 对象返回指定的元素。如果与所提供的键相关联的值是一个对象，那么你将获得该对象的引用，对该对象所做的任何更改都会有效地在 Map 对象中修改它。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | K | 是 | - | - | 从 Map 对象返回的元素的键。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| V \| null | 与指定键相关联的元素，如果键在 Map 对象中找不到，则返回 null。 | 


::: preview 

>UTS
```uts
      const map1 = new Map<string, string>();
      map1.set('bar', 'foo');
      console.log(map1.get('bar'));
      // expected output: "foo"
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


### has(key)

返回一个布尔值，指示具有指定键的元素是否存在。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | K | 是 | - | - | 用于测试 Map 对象中是否存在的元素的键。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果 Map 对象中存在具有指定键的元素，则返回 true；否则返回 false。 | 


::: preview 

>UTS
```uts
      const map1 = new Map<string, string>();
      map1.set('bar', 'foo');
      console.log(map1.has('bar'));
      // expected output: true

      console.log(map1.has('baz'));
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


### set(key, value)

为 Map 对象添加或更新一个指定了键（key）和值（value）的（新）键值对。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | K | 是 | - | - | 要添加到 Map 对象的元素的键。该值可以是任何数据类型（任何原始值或任何类型的对象）。 |
| value | V | 是 | - | - | 要添加到 Map 对象的元素的值。该值可以是任何数据类型（任何原始值或任何类型的对象）。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| this | Map 对象 | 


::: preview 

>UTS
```uts
      let map1 = new Map<string, string>();
      map1.set('bar', 'foo');
      console.log(map1.get('bar'));
      // expected output: "foo"

      console.log(map1.get('baz'));
      // expected output: null
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


注意：由于Map的key是唯一的，给同一个key多次set值时，会用新值替换老值。
::: preview 

>UTS
```uts
      map1 = new Map(); //定义一个map，key为string类型，value也是string类型
      map1.set('key1', "abc");
      map1.set('key1', "def");
      console.log(map1.get('key1')) //返回 def
```

:::

## 常见操作

- 创建map
::: preview 

>UTS
```uts
      let map = new Map<string, any>()
      map.set("name", "zhangsan")
      map.set("age", 12)
      //Map(2) {"name":"zhangsan","age":12}
      console.log(map)
```

:::

- 通过key访问map元素
::: preview 

>UTS
```uts
      let map1 = new Map<string, any>()
      map1.set("name", "zhangsan")
      map1.set("age", 12)
      let nameVal = map1.get('name')
      //zhangsan
      console.log(nameVal)
```

:::

- 遍历map
::: preview 

>UTS
```uts
      let map2 = new Map<string, any | null>()
      map2.set("name", "zhangsan")
      map2.set("age", 12)

      // 遍历函数 1
      map2.forEach(function (value: any | null) {
        console.log(value)
      })
      // 遍历函数 2
      map2.forEach(function (value: any | null, key: string) {
        console.log(key)
        console.log(value)
      })
      // 遍历函数 3
      map2.forEach(function (value: any | null, key: string, map: Map<string, any | null>) {
        console.log(value)
        console.log(key)
        console.log(map)
      })
```

:::


### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.Map)

## Bug & Tips@tips

* 目前 `Map` 类型编译到 kotlin 为 io.dcloud.uts.Map 其直接父类为：[LinkedHashMap](https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-linked-hash-map/)

```ts
// kotlin map 转换为 uts map
let kotlinMap = getMapFromNative()
console.log(kotlinMap)
let utsMap = new Map<string, any>()
utsMap.putAll(kotlinMap)
```


