## importObject(objectName, options?) @importobject

引用云对象

### importObject 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.9，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| objectName | string ([string.CloudObjectString](/uts/data-type.md#ide-string)) | 是 | - | - | - |
| options | **UniCloudImportObjectOptions** | 否 | - | - | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| customUI | boolean | 否 | - | - | 是否移除自动展示的ui |
| loadingOptions | **UniCloudImportObjectLoadingOptions** | 否 | - | - | loading界面配置 |
| errorOptions | **UniCloudImportObjectErrorOptions** | 否 | - | - | 错误提示配置 |
| secretMethods | any | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x; HarmonyOS(Vapor): - | 指定方法的加密类型 | 

##### loadingOptions 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 否 | - | - | 加载框标题 |
| mask | boolean | 否 | - | - | 加载框是否显示mask |

##### errorOptions 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 否 | - | - | 错误提示类型，可以是modal或者toast |
| retry | boolean | 否 | - | - | 是否显示重试按钮 |


### 返回值 

| 类型 |
| :- |
| [UniCloudCloudObjectCaller](#unicloudcloudobjectcaller-values) |

#### UniCloudCloudObjectCaller 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| _obj | [InternalUniCloudCloudObject](#internalunicloudcloudobject-values) | 是 | - | - | - |
##### InternalUniCloudCloudObject 的方法 @internalunicloudcloudobject-values 

##### callMethod\<T = UTSJSONObject>(methodName: string, args: Array\<any \| null>): Promise\<T>; @callmethod
callMethod

###### callMethod 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| methodName | string | 是 | - | - | - |
| args | Array&lt;any&gt; | 是 | - | - | - | 

###### 返回值 

| 类型 |
| :- |
| Promise\<T> |
 

#### UniCloudCloudObjectCaller 的方法 @unicloudcloudobjectcaller-values 

#### _getArgs: protected _getArgs(...args: Array\<any \| null>): Array\<any \| null>; @_getargs
_getArgs

##### _getArgs 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| args | Array&lt;any&gt; | 否 | - | - | - | 

##### 返回值 

| 类型 |
| :- |
| Array&lt;any&gt; |
 
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.cloudObject.importObject)

### uni-app x内使用云对象的特殊说明@strictly-typed-object

由于强类型语言的限制，uni-app-x在编译时需要读取本地云对象导出的方法列表生成客户端对象。
- 请确保调用的云对象在本地包含导出的方法。
- 请确保本地工程的云对象的方法是正确的。
- 如由于云函数加密等因素导致`index.obj.js`无法被正确解析，请在云对象目录创建`index.obj.d.ts`声明云对象内包含的方法。`index.obj.d.ts`示例代码如下：

```ts
// index.obj.d.ts
type AnyFunction = (...args: any[]) => any;

declare const add: AnyFunction
declare const update: AnyFunction
declare const deleteRecord: AnyFunction

export { // 上面的写法可以自己调整，仅需保证export内包含所有方法即可
  add,
  update
  deleteRecord as remove
}
```

<!-- UTSUNICLOUDAPIJSON.unicloud-import-object.example -->

### 调用云对象时传入泛型

> 4.13版本起支持，仅安卓端会构造对应的泛型的实例，web端和iOS端泛型仅作为类型使用。

用法：`obj.add<泛型类型>()`

在不传泛型时云对象方法返回的类型为`Promise<UTSJSONObject>`，传入泛型后callFunction返回的类型为`Promise<泛型类型>`

**代码示例**

```ts
// 云对象todo代码
'use strict';
module.exports = {
  async add(title, content) {
    return {
      errCode: 0,
      errMsg: '',
      detail: `Todo added, title: ${title}, content: ${content}`
    }
  },
}
```

```ts
// 客户端代码
const todo = uniCloud.importObject('todo')
type CallObjectResult = {
  errCode : number
  errMsg : string
  detail : string
}
todo.add<CallObjectResult>('todo title', 'todo content').then((res) => {
  const detail = res.detail // res类型为CallObjectResult，可直接通过.detail访问其中detail属性
  console.log(detail)
}).catch((err : any | null) => {
  console.error(err)
})
```
