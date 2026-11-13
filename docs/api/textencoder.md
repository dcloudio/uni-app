## TextEncoder

TextEncoder 接受码位流作为输入，并提供 UTF-8 字节流作为输出。<br/>[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder)

### TextEncoder 兼容性 <Help /> 
 Web: √; 微信小程序: x; 支付宝小程序: x




### 构造函数
创建一个使用 UTF-8 编码的 TextEncoder 实例。
### TextEncoder 的属性值 @textencoder-values
| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| encoding | string | 是 | Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71 | 返回 "utf-8". |




### TextEncoder 的方法 @textencoder-methods

#### encode(input ?: string) : Uint8Array; @encode

TextEncoder.encode() 方法接受一个字符串作为输入，返回一个对参数中给定的文本的编码后的 Uint8Array，编码的方法通过 TextEncoder 对象指定。

##### encode 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| input | string | 否 | 微信小程序: x; 支付宝小程序: x | 一个包含了将要编码的文本。 | 




##### 返回值 

| 类型 | 描述 |
| :- | :- |
| [Uint8Array](/uts/buildin-object-api/uint8array.md) | 一个 Uint8Array 对象。 |
 



