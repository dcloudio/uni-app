# Base64 编解码

## atob(encodedData: string): string @atob

atob() 函数会对经过 Base64 编码的字符串进行解码

### atob 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: 5.31; Android(VDOM): 4.25; Android(Vapor): 4.81; iOS: 4.61; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.43


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| encodedData | string | 是 | 微信小程序: x | 需要解码的 Base64 编码字符串。 | 




### 返回值 

| 类型 | 描述 |
| :- | :- |
| string | 解码后的二进制字符串，每个字符对应一个字节。 |
 




## btoa(stringToEncode: string): string @btoa

btoa() 方法可以将一个二进制字符串（例如，将字符串中的每一个字节都视为一个二进制数据字节）编码为 Base64 编码的 ASCII 字符串

### btoa 兼容性 <Help /> 
Web: √; 微信小程序: x; 支付宝小程序: 5.31; Android(VDOM): 4.25; Android(Vapor): 4.81; iOS: 4.61; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.43


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| stringToEncode | string | 是 | 微信小程序: x | 一个需要编码的二进制字符串 | 




### 返回值 

| 类型 | 描述 |
| :- | :- |
| string | 一个包含 stringToEncode 的 Base64 表示的 ASCII 字符串。 |
 



