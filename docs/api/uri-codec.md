# URI 编解码

## decodeURI(encodedURI: string): string \| null @decodeuri

decodeURI() 函数能解码由encodeURI 创建或其他流程得到的统一资源标识符（URI）。

### decodeURI 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| encodedURI | string | 是 | 一个完整的编码过的 URI | 




### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| string | 返回一个给定编码统一资源标识符 (URI) 的未编码版本的新字符串, 当 encodedURI 包含无效字符序列时，会返回null | 否 |
 




## encodeURI(uri: string): string \| null @encodeuri

encodeURI() 将完整的统一资源标识符（URI）编码为字符串，保留 URI 语法中用于分隔各部分的字符。

### encodeURI 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| uri | string | 是 | 一个完整的 URI。 | 




### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| string | 一个新字符串，表示提供的字符串编码为统一资源标识符 (URI)。 | 否 |
 




## decodeURIComponent(encodedURIComponent: string): string \| null @decodeuricomponent

decodeURIComponent() 方法用于解码由 encodeURIComponent 方法或者其他类似方法编码的部分统一资源标识符（URI）。

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

encodeURIComponent() 函数通过将特定字符的每个实例替换成代表字符的 UTF-8 编码的一个、两个、三个或四个转义序列来编码 URI（只有由两个“代理”字符组成的字符会被编码为四个转义序列）。与 encodeURI() 相比，此函数会编码更多的字符，包括 URI 语法的一部分。

### encodeURIComponent 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| uriComponent | string | 是 | 要被检测的 string 值。 | 




### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| string | 原字符串作为 URI 组成部分编码后的新字符串。 | 否 |
 



