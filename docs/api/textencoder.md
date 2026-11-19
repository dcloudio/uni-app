## TextEncoder

将字符串编码为 UTF-8 格式的二进制字节序列，以便在网络传输、文件存储时使用。<br/>[MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder)

### TextEncoder 兼容性 <Help /> 
 Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71




### 构造函数
创建一个使用 UTF-8 字符集编码标签名称的 TextEncoder 实例。
### TextEncoder 的属性值 @textencoder-values
| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| encoding | string | 是 | Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71 | 只读属性，返回使用的字符集编码标签名称，总是返回 "utf-8". |




### TextEncoder 的方法 @textencoder-methods

#### encode(input ?: string) : Uint8Array; @encode

将字符串编码为 UTF-8 格式的二进制数据。

##### encode 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: x; Android: 4.31; iOS: 4.71; HarmonyOS: 4.71


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| input | string | 否 | 微信小程序: x; 支付宝小程序: x | 要编码的文本。 | 




##### 返回值 

| 类型 | 描述 |
| :- | :- |
| [Uint8Array](/uts/buildin-object-api/uint8array.md) | 包含编码后的二进制数据的 Uint8Array 对象。 |
 



