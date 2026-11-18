# Base64 编解码

## atob(encodedData: string): string @atob

对经过 Base64 编码的字符串进行解码。

### atob 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: 5.31; Android: 4.25; iOS(VDOM): 4.61; iOS(Vapor): 5.36; HarmonyOS: x


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| encodedData | string | 是 | 微信小程序: x; HarmonyOS: x | 包含 base64 编码数据的二进制字符串。 | 




### 返回值 

| 类型 | 描述 |
| :- | :- |
| string | 解码出来的字符串。 |
 




## btoa(stringToEncode: string): string @btoa

将一个二进制字符串（例如，将字符串中的每一个字节都视为一个二进制数据字节）编码为 Base64 编码的 ASCII 字符串。

### btoa 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: 5.31; Android: 4.25; iOS(VDOM): 4.61; iOS(Vapor): 5.36; HarmonyOS: x


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| stringToEncode | string | 是 | 微信小程序: x; HarmonyOS: x | 需要编码的二进制字符串。 | 




### 返回值 

| 类型 | 描述 |
| :- | :- |
| string | Base64 表示的 ASCII 字符串。 |
 



