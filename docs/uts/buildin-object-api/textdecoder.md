# TextDecoder

TextDecoder 接口表示一个文本解码器，一个解码器只支持一种特定文本编码，例如 UTF-8、GB2312、GBK，等等。解码器将字节流作为输入，并提供码位流作为输出。

当解码器在解码时遇到格式错误的数据时，解码器将使用替换字符 U+FFFD（�）替换无效的数据。

[TextDecoder MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoder)

## 实例属性


### encoding

只读属性 TextDecoder.encoding 返回一个字符串，其中包含了指定的解码器的解码算法的名称。





<!-- UTSJSON.TextDecoder.encoding.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| √ | 4.31 | 4.71 | 5.0.2 | 4.71 | 4.31 | 4.71 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | x | - |


<!-- UTSJSON.TextDecoder.encoding.tutorial -->


## 实例方法


### decode(input)

TextDecoder.decode() 方法返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| input | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | - | ArrayBuffer。 | 


**返回值**
| 类型 |
| :- |
| string | 


::: preview 

>UTS
```uts
      var utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'

      var u8arr = Uint8Array.of(240, 160, 174, 183);
      var i8arr = Int8Array.of(-16, -96, -82, -73);

      console.log(utf8decoder.decode(u8arr)) // '𠮷'
      console.log(utf8decoder.decode(i8arr)) // '𠮷'

      utf8decoder = new TextDecoder("gbk"); // default 'utf-8' or 'utf8'
      console.log(utf8decoder.decode(u8arr)) // '馉';
      console.log(utf8decoder.decode(i8arr)) // '馉'

      // #ifndef APP-IOS
      utf8decoder = new TextDecoder("utf-8");
      var arraybuffer = new ArrayBuffer(4)
      var dataView = new DataView(arraybuffer)
      dataView.setInt8(0, -16)
      dataView.setInt8(1, -96)
      dataView.setInt8(2, -82)
      dataView.setInt8(3, -73)
      console.log(utf8decoder.decode(dataView)) // '𠮷';
      // #endif
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


<!-- UTSJSON.TextDecoder.decode.tutorial -->

### decode(input)

TextDecoder.decode() 方法返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| input | [DataView](/uts/buildin-object-api/dataview.md) | 是 | - | - | DataView。 | 


**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.TextDecoder.decode_1.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| √ | 4.31 | x | 5.0.2 | 4.71 | 4.31 | x | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | x | - |


<!-- UTSJSON.TextDecoder.decode_1.tutorial -->

### decode(input)

TextDecoder.decode() 方法返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| input | TypedArray | 是 | - | - | Float32Array，Float64Array，Int8Array，Int16Array，Int32Array，Uint8Array，Uint8ClampedArray，Uint16Array，Uint32Array 的实例 | 


**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.TextDecoder.decode_2.test -->

**兼容性**

**uni-app x 兼容性**
| Web | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| √ | 4.31 | 4.71 | 5.0.2 | 4.71 | 4.31 | 4.71 | - |


**uni-app 兼容性**
| Android UTS 插件 | iOS UTS 插件 | HarmonyOS UTS 插件 |
| :- | :- | :- |
| √ | x | - |


<!-- UTSJSON.TextDecoder.decode_2.tutorial -->
