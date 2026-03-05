# JSON

## 静态方法

### parse

JSON.parse() 方法用来解析 JSON 字符串，构造由字符串描述的对象。可能返回值是： UTSJSONObject/Array/number/boolean/string 等基本数据类型

> JSON.parse 在App平台仅支持第一个参数

::: preview 

>UTS
```uts
      const json = `{"result":true, "count":42}`;
      const obj = JSON.parse(json) as UTSJSONObject;
      console.log(obj["count"]);
      // expected output: 42

      console.log(obj["result"]);
      // expected output: true
```

:::

**注意**

- JSON.parse 解析出来的对象（不是数组），在App平台使用方括号[]访问，即数组下标方式。并且支持第一层对象属性通过`.`运算符访问（推荐使用HBuilderX 5.0+）
- 如果输入的字符串不是合法的json格式，则会返回 null
- JSON.parse 接口内部通过[特殊方式读取了范型类型](../generics.md#使用限制)，不支持传入动态的泛型：比如将外层方法的普通泛型参数传入 JSON.parse。

### parse(text, reviver?)

JSON.parse() 方法用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。提供可选的 reviver 函数用以在返回之前对所得到的对象执行变换 (操作)。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | - | 要被解析成 JavaScript 值的字符串 |
| reviver | (this: any, key: string, value: any) => any | 否 | - | Web: x; Android: x; iOS: x; HarmonyOS: x | \[可选]转换器，如果传入该参数 (函数)，可以用来修改解析生成的原始值，调用时机在 parse 函数返回之前。 |
| ignoreError | boolean | 否 | false | Web: √; Android: 4.41; iOS: x; HarmonyOS: √ | \[ignoreError=false]是否要忽略，解析错误时引发的控制台报错，默认为false | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| any \| null | 返回一个any 或者 null | 


::: preview 

>UTS
```uts
      const json = `{"result":true, "count":42}`;
      const obj = JSON.parse(json) as UTSJSONObject;
      console.log(obj["count"]);
      // expected output: 42

      console.log(obj["result"]);
      // expected output: true
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


<!-- UTSJSON.JSON.parse.tutorial -->

### parse\<T\>(text: string)

JSON.parse() 方法用来解析 JSON 字符串，构造由字符串描述的值或者对象，其类型由泛型参数T决定<br/>     如果输入的是一个合法的json值或者对象，返回一个对应的T值或者对象，如果json描述的值或对象和 T 指定的类型不符，将返回null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | - | 要被解析成 JavaScript 值的字符串 |
| ignoreError | boolean | 否 | false | Web: x; Android: 4.41; iOS: x; HarmonyOS: 4.61 | \[ignoreError=false]是否要忽略，解析错误时引发的控制台报错，默认为false | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| T \| null | 返回一个T类型的值或者对象 或者 null | 


::: preview 

>UTS
```uts
      const json2 = '{"string":"Hello","number":42,"boolean":true,"nullValue":null,"array":[1,2,3],"object":{"nestedKey":"nestedValue"}}';
      const obj2 = JSON.parse<UTSJSONObject>(json2)!;
```

:::

JSON.parse支持传入[泛型](../generics.md)，parse结果可以直接返回类型化数据，而不是UTSJSONObject。

与不带泛型的JSON.parse 相比，多了一个`<Persion>` 尖括号 用来指定返回类型。

目前带泛型的 `parse`函数，访问性能高于不带泛型的。

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 3.90 | 4.11 | 4.61 | 3.90 | 4.11 | 4.61 |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 3.90 | 3.9 | √ |


### stringify(value, replacer?, space?)

*注意：JSON.stringify 目前仅支持第一个参数*

JSON.stringify() 方法将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | any \| null | 是 | - | - | 将要序列化成 一个 JSON 字符串的值。 |
| replacer | any \| null | 否 | - | Web: 4.25; Android: 4.25; iOS: 4.11; HarmonyOS: 4.61 | 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。 仅Android/web HBuilder X 4.25之后支持 |
| space | any \| null | 否 | - | Web: 4.25; Android: 4.25; iOS: 4.11; HarmonyOS: 4.61 | 指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为 10。该值若小于 1，则意味着没有空格；如果该参数为字符串（当字符串长度超过 10 个字母，取其前 10 个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。 仅Android/web HBuilder X 4.25之后支持 | 


**返回值**
| 类型 |
| :- |
| string | 


::: preview 

>UTS
```uts
      console.log(JSON.stringify({ x: 5, y: 6 }));
      // expected output: "{"x":5,"y":6}"

      console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
      // expected output: ""2006-01-02T15:04:05.000Z""
```

:::

序列化规则说明:

|类型名称   |适应范围                       |规则|
|:--        |:--                            |:--|
|基本类型    |number/string/boolean          |对应json格式中的 原型数据类型|
|容器数据类型|UTSArray/UTSJSONObject         |对应json格式中的 jsonarray/jsonobject|
|map和set   |map和set                       |与web保持一致，序列化为 空jsonobject对象： `{}`|
|自定义type  |开发者使用type 声明的类型对象    |被序列化为 jsonobject|
|自定义class |开发者使用class 声明的类型对象   |被序列化为 空jsonobject对象： `{}` |
|function   |对象内部声明的函数               |被序列化为 `null` |


### parseObject(text: string)

注意： 此函数需要 HBuilderX 3.9x 以上版本

JSON.parseObject() 方法用来解析 JSON 字符串，构造由字符串描述的对象。<br/>     如果输入的是一个合法的json对象，返回一个对应的UTSJSONObject，如果是json array 或者其他格式的字符串返回null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | - | 要被解析成 JavaScript 值的字符串 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| UTSJSONObject \| null | 返回一个UTSJSONObjet 或者 null | 


::: preview 

>UTS
```uts
      const json = `{"result":true, "count":42}`;
      const obj = JSON.parseObject(json);
      console.log(obj?.["count"])//42
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


### parseObject\<T\>(text: string)

注意： 此函数需要 HBuilderX 3.9x 以上版本

JSON.parseObject() 方法用来解析 JSON 字符串，构造由字符串描述的对象，该对象的类型由泛型参数T决定<br/>     如果输入的是一个合法的json对象，返回一个对应的T对象，如果是json array 或者其他格式的字符串返回null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | - | 要被解析成 JavaScript 值的字符串 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| T \| null | 返回一个T类型对象 或者 null | 


::: preview 

>UTS
```uts
      const json1 = `{
			    "name": "John",
			    "id": "30"
			  }`;
      let obj2 = JSON.parseObject<UserJSON>(json1);
      console.log(obj2!.id) //30
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
| 3.90 | 3.9 | √ |


### parseArray(text: string)

注意： 此函数需要 HBuilderX 3.9x 以上版本

JSON.parseArray() 方法用来解析 JSON 字符串，构造由字符串描述的数组。数组元素类型为any<br/>     如果输入的是一个合法的json数组，返回一个对应的Array，如果是json object 或者其他格式的字符串返回null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | - | 要被解析成 JavaScript 值的字符串 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Array\<any> \| null | 返回一个Array 或者 null | 


::: preview 

>UTS
```uts
      const json1 = `[1,2,3]`;
      const array1 = JSON.parseArray(json1);
      console.log(array1)//[1, 2, 3]
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


### parseArray\<T\>(text: string)

注意： 此函数需要 HBuilderX 3.9x 以上版本

JSON.parseArray() 方法用来解析 JSON 字符串，构造由字符串描述的数组。数组元素类型由泛型T决定<br/>     如果输入的是一个合法的json数组，返回一个对应的Array，如果是json object 或者其他格式的字符串返回null

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | - | 要被解析成 JavaScript 值的字符串 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| Array\<T> \| null | 返回一个Array 或者 null | 


::: preview 

>UTS
```uts
      const json3 = `[{"name":"John","id":"30"},{"name":"jack","id":"21"}]`;
      const array3 = JSON.parseArray<UTSJSONObject>(json3);
      console.log((array3![0])["name"])//"John"
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
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.buildInObject.JSON)


### IJSONStringify

支持开发者自定义class序列化结果，此函数的返回值就是实现了此接口的class的序列化返回值



**返回值**
| 类型 |
| :- |
| any | 


<!-- UTSJSON.IJSONStringify.toJSON.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| x | 4.53 | x | - | 4.53 | x | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| 4.53 | x | - |


<!-- UTSJSON.IJSONStringify.toJSON.tutorial -->

## 自定义序列化规则说明

默认的情况下，类型的序列化规则是固定的。如上表所列，JSON.stringify的序列化行为由UTS内部实现。

```ts
class Person {
    // 声明属性类型（必须显式初始化或在构造函数中赋值）
    name: string;
    age: number;

    // 构造函数
    constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    }

    // 方法
    greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
    }
}

// 使用类
const alice = new Person("Alice", 30);
// 此时只能得到 '{}'
console.log("data",JSON.stringify(alice))
```

但有些场景下开发者需要自定义class的序列化规则，所以从HBuilder X 4.53开始，新增了一个接口`IJSONStringify`，用于支持开发者实现自定义序列化

```ts
class Person implements IJSONStringify {
    // 声明属性类型（必须显式初始化或在构造函数中赋值）
    name: string;
    age: number;

    // 构造函数
    constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    }
    
    // 自定义序列化规则
    toJSON():any{
        let jsonRet = UTSJSONObject()
        jsonRet["name"] = this.name
        jsonRet["age"] = this.age
        return jsonRet
    }
    // 方法
    greet(): string {
        return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
    }
}

// 使用类
const alice = new Person("Alice", 30);
// {"name":"Alice","age":30}
console.log("data",JSON.stringify(alice))

```

`IJSONStringify` 接口内部仅包含一个待实现方法 ` toJSON():any|null` 

该方法的返回值会成为当前class序列化后的值。该方法声明的返回值类型为any|null

实际支持下面的几种类型

+ [JSON协议](https://www.json.org/json-en.html)中支持的基本数据类型

string,number,boolean,null

+ [JSON协议](https://www.json.org/json-en.html)中支持的容器数据类型

Array 对应 Array

UTSJSONObject 对应 object 

+ IJSONStringify

如果toJSON函数的返回值是另外一个 `IJSONStringify`对象，则序列化逻辑会继续调用该对象的 `toJSON`方法，直到一个不为 `IJSONStringify`的值。换句话说就是toJSON函数支持嵌套。








