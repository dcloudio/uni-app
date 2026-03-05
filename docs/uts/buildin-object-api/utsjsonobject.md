# UTSJSONObject

UTSJSONObject 是 UTS语言的内置类型，主要用来操作[匿名对象](../object.md#anonymous-object)。

js 中操作 json 使用的是 object对象，但 object对象非常灵活，不止是用于处理 json。在 uts 中，UTSJSONObject 类似于 js 中 object 的一个专用子集，专门用于操作 json。

本文为UTSJSONObject对象的API介绍，具体的UTSJSONObject数据类型的介绍，[另见](../data-type.md#UTSJSONObject)

uni-app x 5.0+ 起，Android平台 UTSJSONObject 的性能大幅提升，超过了 type 的性能。

## 创建实例

UTSJSONObject 对象的实例目前主要通过两种方式来创建：

* 通过[对象字面量](../literal.md#object-literal)


::: preview 

>UTS
```uts
      const person: UTSJSONObject = {
        name: 'Tom',
        printName: () => {
          // ...
        }
      }
      //返回指定键对应的值，如果对象中不存在此键则返回 null。
      let name: string = person["name"] as string
      //get 方法可以简化为使用下标运算符 `[]` 访问
      name = person['name'] as string
      //增加或更新指定键对应的值。
      person.set('name', 'Tom1')
      //set 方法可以简化为使用下标运算符 `[]` 赋值
      person['name'] = 'Tom2'
```

>Kotlin
```kt
        var person: UTSJSONObject = object : UTSJSONObject() {
            var name = "Tom"
            var printName = fun(){
                console.log(name)
            }
        }
        //返回指定键对应的值，如果对象中不存在此键则返回 null。
        var name: String = person["name"] as String
        
        //get 方法可以简化为使用下标运算符 `[]` 访问
        name = person["name"] as String
        
        //增加或更新指定键对应的值。
        person["name"] = "Tom1"
        
        //set 方法可以简化为使用下标运算符 `[]` 赋值
        person["name"] = "Tom2"
        
```

>Swift
```swift
        var person: UTSJSONObject = UTSJSONObject([
           "name": "Tom",
           "printName": {() -> Void in}
        ])
        //返回指定键对应的值，如果对象中不存在此键则返回 null。
        var name: String? = person["name"] as? String
        
        //get 方法可以简化为使用下标运算符 `[]` 访问
        name = person["name"] as? String
        
        //增加或更新指定键对应的值。
        person.set("name", "Tom1")
        
        //set 方法可以简化为使用下标运算符 `[]` 赋值
        person["name"] = "Tom2"
        
```

:::


* 通过 JSON对象 parse 字符串



::: preview 

>UTS
```uts
      // 写法1 推荐
      let person1: UTSJSONObject = JSON.parseObject('{"name":"Tom"}')!

      // 写法2 推荐
      const person2: UTSJSONObject = JSON.parse<UTSJSONObject>('{"name":"Tom"}')!


      // 写法3  如果 as 转换的实际类型不匹配 会导致 crash，建议先通过 `instanceof` 判断类型再进行as转换。
      const parseRet3 = JSON.parse('{"name":"Tom"}')
      if (parseRet3 instanceof UTSJSONObject) {
        const person = parseRet3 as UTSJSONObject
      }

```

>Kotlin
```kt
        
        // 写法1 推荐
         var person1: UTSJSONObject = JSON.parseObject("{\"name\":\"Tom\"}")!!
        
        // 写法2 推荐
        val person2: UTSJSONObject = JSON.parse<UTSJSONObject>("{\"name\":\"Tom\"}")!!
        
        // 写法3  如果 as 转换的实际类型不匹配 会导致 crash，建议先通过 `instanceof` 判断类型再进行as转换。
        val parseRet3 = JSON.parse("{\"name\":\"Tom\"}")
        if (parseRet3 is UTSJSONObject) {
            person = parseRet3
        }
```

>Swift
```swift
        
        // 写法1 推荐
        var person1: UTSJSONObject = JSON.parseObject("{\"name\":\"Tom\"}")!
        
        // 写法2 推荐
        let person2: UTSJSONObject = JSON.parse("{\"name\":\"Tom\"}", UTSJSONObject.self)!
        
        // 写法3  如果 as 转换的实际类型不匹配 会导致 crash，建议先通过 `instanceof` 判断类型再进行as转换。
        let parseRet3 = JSON.parse("{\"name\":\"Tom\"}")
        if parseRet3 is UTSJSONObject {
            person = parseRet3 as! UTSJSONObject
        }

```

:::



## 静态方法

### keys(object: UTSJSONObject): Array\<String>

以数组的形式返回指定UTSJSONObjetc 对象内可枚举属性的名称列表

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| item | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | - | - | 需要检索的UTSJSONObject 实例对象 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Array\<string> | 返回 Array\<string> 类型的可枚举属性的名称列表 | 



::: preview 

>UTS
```uts
      let obj = {
        name: "zhangsan",
        age: 11
      }

      let ret1 = UTSJSONObject.keys(obj).length
      console.log(ret1) //2
```

>Kotlin
```kt
        var obj: UTSJSONObject = object : UTSJSONObject() {
            var name = "zhangsan"
            var age: Number = 11
        }
        var ret1 = UTSJSONObject.keys(obj).length
        console.log(ret1) //2
```

>Swift
```swift
        let obj = UTSJSONObject(dictionary: [
            "name": "zhangsan",
            "age": 11
        ])
        let ret1 = UTSJSONObject.keys(obj).length
        console.log(ret1) //2
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.25 | 4.18 | x | 4.61 | 4.18 | 4.23 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.18 | 4.23 | √ |



### assign(...items): UTSJSONObject

该方法允许输入一个或者多个UTSJSONObject对象，合并后返回一个新的UTSJSONObject，其中包含全部输入对象的属性字段，如果存在同名的属性会以后传入的属性为准

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| items | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | - | - | 需要被合并的UTSJSONObject 实例对象 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| UTSJSONObject | 合并后的UTSJSONObject | 



::: preview 

>UTS
```uts
      let target = { a: 1, b: 2 };
      let source = { b: 4, c: 5 };
      // 得到一个UTSJSONObject对象
      let returnedTarget = UTSJSONObject.assign(target, source);
```

>Kotlin
```kt
        var target: UTSJSONObject = object : UTSJSONObject() {
            var a: Number = 1
            var b: Number = 2
        }
        var source: UTSJSONObject = object : UTSJSONObject() {
            var b: Number = 4
            var c: Number = 5
        }
        // 得到一个UTSJSONObject对象
        var returnedTarget = UTSJSONObject.assign(target, source)
        console.log(returnedTarget.toMap().count()) //3

        var target1: UTSJSONObject = object : UTSJSONObject() {
            var a: Number = 1
            var b: Number = 2
        }
        var source1: UTSJSONObject = object : UTSJSONObject() {
            var b: Number = 4
            var c: Number = 5
        }
        // 得到一个UTSJSONObject对象
        var returned = UTSJSONObject.assign<UTSJSONObject>(target1, source1)
        console.log(returned) // {"a": 1, "b": 4, "c": 5}
```

>Swift
```swift
        let target = UTSJSONObject(dictionary: [
            "a": 1,
            "b": 2
        ]);
        let source = UTSJSONObject(dictionary: [
            "b": 4,
            "c": 5
        ])
        // 得到一个UTSJSONObject对象
        let returnedTarget = UTSJSONObject.assign(target, source);
        console.log(returnedTarget.toMap().count) //3

        let target1 = UTSJSONObject(dictionary: [
            "a": 1,
            "b": 2
        ]);
        let source1 = UTSJSONObject(dictionary: [
            "b": 4,
            "c": 5
        ])
        // 得到一个UTSJSONObject对象
        let ret = UTSJSONObject.assign(target1, source1, type: UTSJSONObject.self);
        console.log(ret) // {"a": 1, "b": 4, "c": 5}
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.25 | 4.18 | x | 4.61 | 4.18 | 4.23 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.18 | 4.23 | √ |


> 注意： 与js中的`Object.assign`不同， 这里每次返回的都是一个新的对象

### assign\<T>(...items: T[]): T

该方法允许输入一个或者多个UTSJSONObject对象，合并后返回一个新的泛型对象T，其中包含全部输入对象的属性字段，如果存在同名的属性会以后传入的属性为准

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| items | any[\] | 是 | - | - | 需要被合并的实例对象 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| T \| null | 合并后的泛型对象 | 




::: preview 

>UTS
```uts
      let target1 = { a: 1, b: 2 };
      let source1 = { b: 4, c: 5 };
      // 得到一个UTSJSONObject对象
      let returned = UTSJSONObject.assign<UTSJSONObject>(target1, source1);
      console.log(returned)
```

:::


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.25 | 4.18 | x | 4.61 | 4.18 | 4.23 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.18 | 4.23 | √ |


> 注意： 与js中的`Object.assign`不同， 这里每次返回的都是一个新的对象

## 实例方法

### parse()

将当前的UTSJSONObject对象转换为某一个具体的类型 T



**返回值**
| 类型 | 描述 |
| :- | :- |
| T \| null | 具体的类型T，如果失败返回null | 


<!-- UTSJSON.UTSJSONObject.parse.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 3.90 | x | x | 3.90 | x | x |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | x | x |


<!-- UTSJSON.UTSJSONObject.parse.tutorial -->

### get(key: string): any | null

获取一个 属性，返回类型是any 或者 null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | - | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| any \| null | 如果属性存在返回结果，不存在返回null | 



::: preview 

>UTS
```uts
      const person: UTSJSONObject = {
        name: 'Tom',
        printName: () => {
          // ...
        }
      }
      //返回指定键对应的值，如果对象中不存在此键则返回 null。
      let name: string = person["name"] as string
      //get 方法可以简化为使用下标运算符 `[]` 访问
      name = person['name'] as string
      //增加或更新指定键对应的值。
      person.set('name', 'Tom1')
      //set 方法可以简化为使用下标运算符 `[]` 赋值
      person['name'] = 'Tom2'
```

>Kotlin
```kt
        var person: UTSJSONObject = object : UTSJSONObject() {
            var name = "Tom"
            var printName = fun(){
                console.log(name)
            }
        }
        //返回指定键对应的值，如果对象中不存在此键则返回 null。
        var name: String = person["name"] as String
        
        //get 方法可以简化为使用下标运算符 `[]` 访问
        name = person["name"] as String
        
        //增加或更新指定键对应的值。
        person["name"] = "Tom1"
        
        //set 方法可以简化为使用下标运算符 `[]` 赋值
        person["name"] = "Tom2"
        
```

>Swift
```swift
        var person: UTSJSONObject = UTSJSONObject([
           "name": "Tom",
           "printName": {() -> Void in}
        ])
        //返回指定键对应的值，如果对象中不存在此键则返回 null。
        var name: String? = person["name"] as? String
        
        //get 方法可以简化为使用下标运算符 `[]` 访问
        name = person["name"] as? String
        
        //增加或更新指定键对应的值。
        person.set("name", "Tom1")
        
        //set 方法可以简化为使用下标运算符 `[]` 赋值
        person["name"] = "Tom2"
        
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


### set(key: string, value: any | null)

添加或更新一个指定的属性

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | - |
| value | any | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 



::: preview 

>UTS
```uts
      const person: UTSJSONObject = {
        name: 'Tom',
        printName: () => {
          // ...
        }
      }
      //返回指定键对应的值，如果对象中不存在此键则返回 null。
      let name: string = person["name"] as string
      //get 方法可以简化为使用下标运算符 `[]` 访问
      name = person['name'] as string
      //增加或更新指定键对应的值。
      person.set('name', 'Tom1')
      //set 方法可以简化为使用下标运算符 `[]` 赋值
      person['name'] = 'Tom2'
```

>Kotlin
```kt
        var person: UTSJSONObject = object : UTSJSONObject() {
            var name = "Tom"
            var printName = fun(){
                console.log(name)
            }
        }
        //返回指定键对应的值，如果对象中不存在此键则返回 null。
        var name: String = person["name"] as String
        
        //get 方法可以简化为使用下标运算符 `[]` 访问
        name = person["name"] as String
        
        //增加或更新指定键对应的值。
        person["name"] = "Tom1"
        
        //set 方法可以简化为使用下标运算符 `[]` 赋值
        person["name"] = "Tom2"
        
```

>Swift
```swift
        var person: UTSJSONObject = UTSJSONObject([
           "name": "Tom",
           "printName": {() -> Void in}
        ])
        //返回指定键对应的值，如果对象中不存在此键则返回 null。
        var name: String? = person["name"] as? String
        
        //get 方法可以简化为使用下标运算符 `[]` 访问
        name = person["name"] as? String
        
        //增加或更新指定键对应的值。
        person.set("name", "Tom1")
        
        //set 方法可以简化为使用下标运算符 `[]` 赋值
        person["name"] = "Tom2"
        
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


### getAny(key): any | null

获取一个 属性，返回类型是any 或者 null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | - | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| any \| null | 如果属性存在返回结果，不存在返回null | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | √ | √ |


### getAny(key, def): any

获取一个 属性，返回类型是any

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | 属性值, 可以是keyPath |
| def | any | 是 | - | - | 指定的默认值 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| any | 如果属性存在返回结果，不存在返回指定的默认值 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.51 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | √ | √ |


### getBoolean(key): boolean | null

获取一个Boolean属性，返回类型是Boolean 或者 null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | - | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean \| null | 如果属性名存在，且类型为Boolean返回对应的结果，不存在返回null | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | √ | √ |


### getBoolean(key, def): boolean

获取一个Boolean属性，返回类型是Boolean

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | 属性值, 可以是keyPath |
| def | boolean | 是 | - | - | 指定的默认值 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果属性名存在，且类型为Boolean返回对应的结果，不存在返回指定的默认值 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.51 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | √ | √ |


### getNumber(key): number | null

获取一个number属性，返回类型是number 或者 null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | - | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number \| null | 如果属性名存在，且类型为number返回对应的结果，不存在返回null | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | √ | √ |


### getNumber(key, def): number

获取一个number属性，返回类型是number

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | 属性值, 可以是keyPath |
| def | number | 是 | - | - | 指定的默认值 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 如果属性名存在，且类型为number返回对应的结果，不存在返回指定的默认值 | 


**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.51 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | √ | √ |


### getString(key): string | null

获取一个string属性，返回类型是string 或者 null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | - | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string \| null | 如果属性名存在，且类型为string返回对应的结果，不存在返回null | 



::: preview 

>UTS
```uts
      const utsObj: UTSJSONObject = {} as any as UTSJSONObject
      for (let i = 0; i < 100; i++) {
        utsObj.set('' + i, '' + i)
      }

      console.log('--start--')
      let startTime = Date.now()
      for (let i = 0; i < 10000; i++) {
        utsObj.getString('0')
      }
```

>Kotlin
```kt
        
        val utsObj: UTSJSONObject = UTSJSONObject()
        run {
            var i: Number = 0
            while(i < 100){
                utsObj.set("" + i, "" + i)
                i++
            }
        }
        console.log("--start--")
        var startTime = Date.now()
        run {
            var i: Number = 0
            while(i < 10000){
                utsObj.getString("0")
                i++
            }
        }

        var spendTime = Date.now() - startTime
        console.log(spendTime < 800) // true
```

>Swift
```swift
        let obj = UTSJSONObject()
        var i = 0
        while i < 100 {
            obj.set("\(i)", "\(i)")
            i++
        }
        
        let startTime = Date.now()
        var j = 0
        while j < 10000 {
            obj.getString("0")
            j++
        }
        let spendTime = Date.now() - startTime
        console.log(spendTime < 800) // true
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



### getString(key, def): string

获取一个string属性，返回类型是string

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | 属性值, 可以是keyPath |
| def | string | 是 | - | - | 指定的默认值 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 如果属性名存在，且类型为string返回对应的结果，不存在返回指定的默认值 | 


<!-- UTSJSON.UTSJSONObject.getString_1.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.51 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | √ | √ |


### getJSON(key): UTSJSONObject | null

获取一个UTSJSONObject属性，返回类型是UTSJSONObject 或者 null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | - | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| UTSJSONObject \| null | 如果属性名存在，且类型为UTSJSONObject返回对应的结果，不存在返回null | 



::: preview 

>UTS
```uts
      let obj = {
        "cars": [
          {
            name: "car1",
            value: 100
          }
        ]
      }

      let cars: Array<UTSJSONObject> | null = obj.getArray<UTSJSONObject>("cars")
      cars![0].set("value", 20)
      let firstCar = obj.getJSON("cars[0]")
      console.log(firstCar!['value'])//20
```

>Kotlin
```kt
        var obj: UTSJSONObject = object : UTSJSONObject() {
          var cars = utsArrayOf(
              object : UTSJSONObject() {
                  var name = "car1"
                  var value: Number = 100
              }
          )
        }
        var firstCar = obj.getJSON("cars[0]")
        console.log(firstCar!!["value"]) // 100
```

>Swift
```swift
        let obj = UTSJSONObject(dictionary: [
            "cars": [
                UTSJSONObject(dictionary: [
                    "name": "car1",
                    "value": 100
                ])
            ]
        ])
        let firstCar = obj.getJSON("cars[0]")
        console.log(firstCar!["value"]) // 100
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


### getJSON(key, def): UTSJSONObject

获取一个UTSJSONObject属性，返回类型是UTSJSONObject

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | 属性值, 可以是keyPath |
| def | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | - | - | 指定的默认值 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| UTSJSONObject | 如果属性名存在，且类型为UTSJSONObject返回对应的结果，不存在返回指定的默认值 | 


<!-- UTSJSON.UTSJSONObject.getJSON_1.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.51 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | √ | √ |


### getArray(key): Array\<T> | null

获取一个Array属性，返回类型是Array 或者 null, 数组元素类型由泛型T决定

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | - | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Array\<T> \| null | 如果属性名存在，且类型为Array返回对应的结果，不存在返回null | 



::: preview 

>UTS
```uts
      let obj = {
        "cars": [
          {
            name: "car1",
            value: 100
          }
        ]
      }

      let cars: Array<UTSJSONObject> | null = obj.getArray<UTSJSONObject>("cars")
      cars![0].set("value", 20)
      let firstCar = obj.getJSON("cars[0]")
      console.log(firstCar!['value'])//20
```

>Kotlin
```kt
        var obj: UTSJSONObject = object : UTSJSONObject() {
            var cars = utsArrayOf(
                object : UTSJSONObject() {
                    var name = "car1"
                    var value: Number = 100
                }
            )
        }
        
        var cars: UTSArray<UTSJSONObject>? = obj.getArray<UTSJSONObject>("cars")
        cars!![0].set("value", 20)
        console.log(cars[0]["value"]) // 20
```

>Swift
```swift
        let obj = UTSJSONObject(dictionary: [
            "cars": [
                UTSJSONObject(dictionary: [
                    "name": "car1",
                    "value": 100
                ])
            ]
        ])
        
        let cars: [UTSJSONObject]? = obj.getArray("cars")
        cars![0].set("value", 20)
        console.log(cars![0]["value"]) // 20
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


### getArray(key, def: Array\<T>): Array\<T>

获取一个Array属性，返回类型是Array, 数组元素类型由泛型T决定

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | 属性值, 可以是keyPath |
| def | Array&lt;T&gt;\<T> | 是 | - | - | 指定的默认值 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Array\<T> | 如果属性名存在，且类型为Array返回对应的结果，不存在返回指定的默认值 | 



::: preview 

>UTS
```uts
      //这个方法用来获取指定元素类型的数组
      let obj = JSON.parseObject('{"name":"tom","tag":["student","user"]}')
      // #ifdef APP-HARMONY
      // arkts any类型使用受限 https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/typescript-to-arkts-migration-guide#限制使用esobject类型
      let noGenericArray: (any | null)[] | null = obj!.getArray("tag")
      // #endif
      // #ifndef APP-HARMONY
      // 这里得到是 Array<*>
      let noGenericArray = obj!.getArray("tag")
      // #endif
      console.log(noGenericArray)

      // 这里得到是 Array<string>
      let genericArray = obj!.getArray<string>("tag")
      console.log(genericArray)
```

>Kotlin
```kt
        //这个方法用来获取指定元素类型的数组
        var obj1 = JSON.parseObject("{\"name\":\"tom\",\"tag\":[\"student\",\"user\"]}")
        
        // 这里得到是 Array<*>
        var noGenericArray = obj1!!.getArray("tag")
        console.log(noGenericArray)
        
        // 这里得到是 Array<string>, 注意：要手动指定返回值类型，以便Swift进行泛型推断
        var genericArray = obj1.getArray<String>("tag")
        console.log(genericArray) //["student", "user"]
```

>Swift
```swift
        //这个方法用来获取指定元素类型的数组
        let obj1 = JSON.parseObject("{\"name\":\"tom\",\"tag\":[\"student\",\"user\"]}")

        // 这里得到是 Array<*>
        let noGenericArray = obj1!.getArray("tag")
        console.log(noGenericArray)

        // 这里得到是 Array<string>, 注意：要手动指定返回值类型，以便Swift进行泛型推断
        let genericArray: [String]? = obj1!.getArray("tag")
        console.log(genericArray) //["student", "user"]
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.51 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | √ | √ |


### getArray(key): Array\<any> | null

获取一个Array属性，返回类型是Array 或者 null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | - | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Array\<any> \| null | 如果属性名存在，且类型为Array返回对应的结果，不存在返回null | 


<!-- UTSJSON.UTSJSONObject.getArray_2.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | √ | √ |



### getArray(key, def: Array\<any>): Array\<any>

获取一个Array属性，返回类型是Array

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | - | 属性值, 可以是keyPath |
| def | Array&lt;any&gt;\<any> | 是 | - | - | 指定的默认值 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Array\<any> | 如果属性名存在，且类型为Array返回对应的结果，不存在返回指定的默认值 | 


<!-- UTSJSON.UTSJSONObject.getArray_3.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.51 | 3.90 | x | 4.61 | 3.90 | x | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | x | √ |


### toMap(): Map\<string, any>

将当前 UTSJSONObject 实例转换为 Map 实例。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Map\<string, any> | 返回 Map\<string, any> 类型的 map | 



::: preview 

>UTS
```uts
      person1 = JSON.parseObject('{"name":"Tom"}')!
      person1.toMap().forEach((value: any | null, key: string) => {
        console.log(key)
        console.log(value)
      })
```

>Kotlin
```kt
        val person0 = JSON.parseObject("{\"name\":\"Tom\"}")!!
        person0.toMap().forEach(fun(value, key){
            console.log(key)
            console.log(value)
        })
```

>Swift
```swift
        person1 = JSON.parseObject("{\"name\":\"Tom\"}")!
        person1.toMap().forEach { value, key in
            console.log(key, value)
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
| 3.90 | √ | √ |



### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.UTSJSONObject)




## 常见问题

#### 目标语言为js时UTSJSONObject实例方法可以被覆盖

> 如非必要请勿利用此特性

如下代码会将getString覆盖为1

```typescript
const a = {
  getString: 1
}
console.log(a.getString) // 1
```

#### UTSJSONObject 与 type 相互转换

可以使用下面的代码，进行 `UTSJSONObject` 和 `type` 转换

::: preview 

>UTS
```uts
      type User = {
        name: string,
        age: number
      }
      let jsonObj = {
        name: "张三",
        age: 12
      }
      // UTSJSONObject => 自定义type
      let userA = JSON.parse<User>(JSON.stringify(jsonObj)!)
      console.log(userA!.name)
      // 自定义type => UTSJSONObject
      let utsJsonA = JSON.parseObject(JSON.stringify(userA)!)
      console.log(utsJsonA)
```

>Kotlin
```kt
        
        open class User (
            @JsonNotNull
            open var name: String,
            @JsonNotNull
            open var age: Number,
        ) : UTSObject() {
            
        }
        var jsonObj: UTSJSONObject = object : UTSJSONObject() {
            var name = "张三"
            var age: Number = 12
        }
        // UTSJSONObject => 自定义type
        var userA = JSON.parse<User>(JSON.stringify(jsonObj))!!
        console.log(userA.name)
        // 自定义type => UTSJSONObject
        var utsJsonA = JSON.parseObject(JSON.stringify(userA))!!
        console.log(utsJsonA)
```

>Swift
```swift
        
        //自定义class 如果需要使用JSON.stringify 或者 JSON.parse处理，则需要实现 Codable 协议
        //通常 uts 代码中 Class 的Codable 协议的实现由编译器自动实现，因此，这类代码不建议在混编代码中使用，除非你能很熟练的使用Codable协议
        class User : Codable {
            var name: String
            var age: NSNumber
            
            public init(_ obj: UTSJSONObject) {
                self.name = obj["name"] as! String
                self.age = obj["age"] as! NSNumber
            }
            
            enum CodingKeys: String, CodingKey { case name; case age }
            
            required public init(from decoder: Decoder) throws {
                let container = try decoder.container(keyedBy: CodingKeys.self)
                self.name = try container.decode(String.self, forKey: .name, decoder)
                self.age = try container.decode(NSNumber.self, forKey: .age, decoder)
            }
            
            func encode(to encoder: Encoder) throws {
                var container = encoder.container(keyedBy: CodingKeys.self)
                try container.encode(name, forKey: .name, encoder)
                try container.encode(age, forKey: .age, encoder)
            }
        }
        
        let jsonObj = UTSJSONObject([
            "name": "张三",
            "age": 12 as NSNumber
        ])
        
        let userA = JSON.parse(JSON.stringify(jsonObj)!, User.self)
        console.log(userA?.name)
        
        let utsJsonA = JSON.parseObject(JSON.stringify(userA)!)
        console.log(utsJsonA)
```

:::

## Android 平台方法

* 目前 UTSJSONObject 类型编译到 kotlin 为 io.dcloud.uts.UTSJSONObject


::: preview

> UTS

```ts
// 创建一个kotlin hashmap
let kotlinMap = new kotlin.collections.HashMap<string,number>()
kotlinMap.put("a",111)
kotlinMap.put("b",2)
// 转换为UTSJSONObject
let utsObj = new UTSJSONObject(kotlinMap)
console.log(utsObj)
// UTSJSONObject 转换为 Map
let nextMap = utsObj.toMap()
console.log(nextMap)
```

> Kotlin

```kotlin
// 创建一个kotlin hashmap
var kotlinMap = kotlin.collections.HashMap<String, Number>();
kotlinMap.put("a", 111);
kotlinMap.put("b", 2);
// 转换为UTSJSONObject
var utsObj = UTSJSONObject(kotlinMap, UTSSourceMapPosition("utsObj", "pages/index/helloView.uvue", 33, 8));
console.log(utsObj);
// UTSJSONObject 转换为 Map
var nextMap = utsObj.toMap();
console.log(nextMap);
```

:::
