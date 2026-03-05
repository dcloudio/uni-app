# TextEncoder

TextEncoder 接受码位流作为输入，并提供 UTF-8 字节流作为输出。

[TextEncoder MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/API/TextEncoder)


## 实例属性


### encoding

返回 "utf-8".





<!-- UTSJSON.TextEncoder.encoding.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| √ | 4.31 | 4.71 | 5.0.2 | 4.71 | 4.31 | 4.71 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | x | - |


<!-- UTSJSON.TextEncoder.encoding.tutorial -->


## 实例方法


### encode(input?)

TextEncoder.encode() 方法接受一个字符串作为输入，返回一个对参数中给定的文本的编码后的 Uint8Array，编码的方法通过 TextEncoder 对象指定。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| input | string | 否 | - | - | 一个包含了将要编码的文本。 | 


**返回值**
| 类型 |
| :- |
| Uint8Array | 


::: preview 

>UTS
```uts
      const encoder = new TextEncoder()
      const int8 = encoder.encode("€");
      console.log(int8); // Uint8Array(3) [226, 130, 172]
```

:::

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| √ | 4.31 | 4.71 | 5.0.2 | 4.71 | 4.31 | 4.71 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | x | - |


<!-- UTSJSON.TextEncoder.encode.tutorial -->
