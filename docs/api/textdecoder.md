## TextDecoder

文本解码器，将字节数据解码为字符串。每个实例使用创建时指定的编码。

### TextDecoder 兼容性 <Help /> 
 Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71




### 构造函数
创建一个使用指定编码的 TextDecoder 实例。
| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| label | string | 否 | 编码名称，支持 utf-8、gbk、gb2312，默认为 "utf-8"。不支持的编码按 "utf-8" 处理。 |

### TextDecoder 的属性值 @textdecoder-values
| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| encoding | string | 是 | Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71 | 只读属性 TextDecoder.encoding 返回一个字符串，其中包含了指定的解码器的解码算法的名称。 |




### TextDecoder 的方法 @textdecoder-methods

#### decode(input : ArrayBuffer) : string; @decode

TextDecoder.decode() 方法返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。

##### decode 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71


##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| input | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | ArrayBuffer。 | 




##### 返回值 

| 类型 | 描述 |
| :- | :- |
| string | 一个字符串。 |
 




#### decode(input : DataView) : string; @decode_1

TextDecoder.decode() 方法返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。

##### decode 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: x; HarmonyOS: 4.71


##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| input | [DataView](/uts/buildin-object-api/dataview.md) | 是 | DataView。 | 




##### 返回值 

| 类型 | 描述 |
| :- | :- |
| string | 一个字符串。 |
 




#### decode(input : Float32Array \| Float64Array \| Int8Array \| Int16Array \| Int32Array \| Uint8Array \| Uint8ClampedArray \| Uint16Array \| Uint32Array) : string; @decode_2

TextDecoder.decode() 方法返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。

##### decode 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| input | [Float32Array](/uts/buildin-object-api/float32array.md) \| [Float64Array](/uts/buildin-object-api/float64array.md) \| [Int8Array](/uts/buildin-object-api/int8array.md) \| [Int16Array](/uts/buildin-object-api/int16array.md) \| [Int32Array](/uts/buildin-object-api/int32array.md) \| [Uint8Array](/uts/buildin-object-api/uint8array.md) \| [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md) \| [Uint16Array](/uts/buildin-object-api/uint16array.md) \| [Uint32Array](/uts/buildin-object-api/uint32array.md) | 是 | 微信小程序: x; 支付宝小程序: x | Float32Array，Float64Array，Int8Array，Int16Array，Int32Array，Uint8Array，Uint8ClampedArray，Uint16Array，Uint32Array 的实例 | 




##### 返回值 

| 类型 | 描述 |
| :- | :- |
| string | 一个字符串。 |
 



