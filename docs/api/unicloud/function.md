## callFunction(options) @callfunction

> 4.13版本起安卓端使用`UniCloudCallFunctionResult`必须传入泛型，比如`UniCloudCallFunctionResult<UTSJSONObject>`，其中泛型类型为其result属性的类型

请求云函数

### callFunction 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.9，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UniCloudCallFunctionOptions** | 是 | - | - | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string ([string.CloudFunctionString](/uts/data-type.md#ide-string)) | 是 | - | - | 云函数名 |
| data | any | 否 | - | - | 云函数参数 |
| secretType | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x; HarmonyOS(Vapor): - | 加密类型，指定加密请求、响应还是都加密 |

##### secretType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| request | - | - |
| response | - | - |
| both | - | - |
| none | - | - | 


### 返回值 

| 类型 |
| :- |
| Promise\<[UniCloudCallFunctionResult\<T>](#unicloudcallfunctionresult-values)> |

#### Promise\<UniCloudCallFunctionResult\<T>> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| result | T | 是 | - | - | 云函数返回结果 |
| requestId | string | 否 | - | - | 云函数请求id | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.cloudFunction.callFunction)

<!-- UTSUNICLOUDAPIJSON.unicloud-call-function.example -->

### 调用云函数时传入泛型

> 4.13版本起支持，仅安卓端会构造对应的泛型的实例，web端和iOS端泛型仅作为类型使用。

用法：`uniCloud.callFunction<泛型类型>({name: 'xxx', data: {}} as UniCloudCallFunctionOptions)`

在不传泛型时callFunction返回的类型为`Promise<UniCloudCallFunctionResult<UTSJSONObject>>`，传入泛型后callFunction返回的类型为`Promise<UniCloudCallFunctionResult<泛型类型>>`

**代码示例**

```ts
// 云函数fn代码
'use strict';
exports.main = async (event, context) => {
  return {
    errCode: 0,
    errMsg: '',
    detail: 'call function detail'
  };
};
```

```ts
// 客户端代码
type CallFunctionResult = {
  errCode : number,
  errMsg : string,
  detail : string
}
uniCloud.callFunction<CallFunctionResult>(
  {
    name: 'fn',
    data: { a: 1 } as UTSJSONObject,
  } as UniCloudCallFunctionOptions
).then(function (res) {
  const result = res.result // result的类型为CallFunctionResult
  const detail = result.detail // 可直接使用.detail访问
  console.log(detail)
}).catch(function (err : any | null) {
  console.error(err)
})
```
