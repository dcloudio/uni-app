## TextDecoder

文本解码器，将二进制数据解码为字符串。创建实例时可指定使用的字符集编码标签名称。

### TextDecoder 兼容性 <Help /> 
 Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71



**注意事项**

app-andorid平台 蒸汽模式 在非uts插件中仅支持`utf-8`字符集标签。



### 构造函数
创建一个使用指定字符集编码标签名称的 TextDecoder 实例。
| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| label | string | 否 | 字符集编码标签名称，支持 utf-8、gbk、gb2312，默认为 "utf-8"。不支持的字符集编码标签名称按 "utf-8" 处理。 |

### TextDecoder 的属性值 @textdecoder-values
| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| encoding | string | 是 | Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71 | 只读属性，返回使用的字符集编码标签名称。 |




### TextDecoder 的方法 @textdecoder-methods

#### decode(input : ArrayBuffer) : string; @decode

将ArrayBuffer类型的二进制数据按照指定的字符集解码还原为文本字符串。

##### decode 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71


##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| input | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | 要解码的二进制数据源。 | 




##### 返回值 

| 类型 | 描述 |
| :- | :- |
| string | 解码后的字符串。 |
 




#### decode(input : DataView) : string; @decode_1

将DataView类型的二进制数据按照指定的字符集解码还原为文本字符串。

##### decode 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: x; HarmonyOS: 4.71


##### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| input | [DataView](/uts/buildin-object-api/dataview.md) | 是 | 要解码的二进制数据源。 | 




##### 返回值 

| 类型 | 描述 |
| :- | :- |
| string | 解码后的字符串。 |
 




#### decode(input : Float32Array \| Float64Array \| Int8Array \| Int16Array \| Int32Array \| Uint8Array \| Uint8ClampedArray \| Uint16Array \| Uint32Array) : string; @decode_2

将TypedArray类型的二进制数据按照指定的字符集解码还原为文本字符串。

##### decode 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| input | [Float32Array](/uts/buildin-object-api/float32array.md) \| [Float64Array](/uts/buildin-object-api/float64array.md) \| [Int8Array](/uts/buildin-object-api/int8array.md) \| [Int16Array](/uts/buildin-object-api/int16array.md) \| [Int32Array](/uts/buildin-object-api/int32array.md) \| [Uint8Array](/uts/buildin-object-api/uint8array.md) \| [Uint8ClampedArray](/uts/buildin-object-api/uint8clampedarray.md) \| [Uint16Array](/uts/buildin-object-api/uint16array.md) \| [Uint32Array](/uts/buildin-object-api/uint32array.md) | 是 | 微信小程序: x; 支付宝小程序: x | 要解码的二进制数据源。 | 




##### 返回值 

| 类型 | 描述 |
| :- | :- |
| string | 解码后的字符串。 |
 



