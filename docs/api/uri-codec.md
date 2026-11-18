# URI 编解码

## decodeURI(encodedURI: string): string \| null @decodeuri

解码由encodeURI 创建或其他流程得到的统一资源标识符（URI）。

### decodeURI 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| encodedURI | string | 是 | 完整的编码过的 URI。 | 




### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| string | 返回一个给定编码统一资源标识符 (URI) 的未编码版本的新字符串, 当 encodedURI 包含无效字符序列时，会返回null。 | 否 |
 




## encodeURI(uri: string): string \| null @encodeuri

将完整的统一资源标识符（URI）字符串进行编码，保留 URI 语法中用于分隔各部分的字符。

### encodeURI 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| uri | string | 是 | 一个完整的 URI。 | 




### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| string | 编码后的统一资源标识符 (URI)。 | 否 |
 




## decodeURIComponent(encodedURIComponent: string): string \| null @decodeuricomponent

解码由 encodeURIComponent 方法或者其他类似方法编码的部分统一资源标识符（URI）。

### decodeURIComponent 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| encodedURIComponent | string | 是 | 编码后的部分 URI | 




### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| string | 一个解码后的统一资源标识符（URI）字符串，处理前的 URI 经过了给定格式的编码。当 encodedURIComponent 包含无效字符序列时，会返回 null。 | 否 |
 




## encodeURIComponent(uriComponent: string): string \| null @encodeuricomponent

对统一资源标识符（URI）中的单个组成部分字符串进行编码，保留非转义字符（A-Z a-z 0-9 - _ . ! ~ * ' ( )），与 encodeURI() 相比，此函数会编码更多的字符，包括 URI 语法的一部分。

### encodeURIComponent 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| uriComponent | string | 是 | 统一资源标识符（URI）中的单个组成部分字符串。 | 




### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| string | 编码后的字符串。 | 否 |
 



