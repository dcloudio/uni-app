## key-value本地数据存储

app、小程序、web，均提供了方便的key-value模式的本地数据存储，通过键值对的方式存取数据。

uni-app的Storage在不同端的实现不同：
- H5端为localStorage，浏览器限制5M大小，是缓存概念，可能会被清理
- App端为原生storage，无大小限制，不是缓存，是持久化的
	* `Android` 端采用应用内SQLite数据库储存，储存位置为：/data/data/io.dcloud.uniappx(基座包名)/databases/DCStorage。
	* 真机运行基座下多个应用之间的storage是隔离的，同基座内的不同应用，对应一个数据库文件，但以表名区分。
- 各个小程序端为其自带的storage api，数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。
	* 微信小程序单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
	* 支付宝小程序单条数据转换成字符串后，字符串长度最大200*1024。同一个支付宝用户，同一个小程序缓存总上限为10MB。
	* 百度小程序策略[详见](https://smartprogram.baidu.com/docs/develop/api/storage/save_process/)
	* 抖音小程序策略[详见](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/data-caching/tt-get-storage)

**注意**
- `uni-`、`uni_`、`dcloud-`、`dcloud_`为前缀的key，为系统保留关键前缀。如`uni_deviceId`、`uni_id_token`，请开发者为key命名时避开这些前缀。
- 非App平台清空Storage会导致 uni.getSystemInfo/getDeviceInfo 获取到的deviceId改变

<!-- ## uni.setStorage(options) @setstorage -->

::: sourceCode
## uni.setStorage(options) @setstorage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-storage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-storage

:::

uni.setStorage函数定义
将数据存储在本地storage存储中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。


### setStorage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SetStorageOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 本地存储中的指定的 key |
| data | any | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要存储的内容，只支持能通过 JSON.stringify 序列化的对象 |
| success | (res: SetStorageSuccess) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.setStorage成功回调函数定义 |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.setStorage失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.setStorage完成回调函数定义 | 




<!-- UTSAPIJSON.setStorage.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.storage.storage.setStorage)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstorage)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorage.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setStorage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setStorage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setStorage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setStorage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setStorage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setStorage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.setStorageSync(key, data) @setstoragesync -->

::: sourceCode
## uni.setStorageSync(key, data) @setstoragesync

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-storage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-storage

:::

uni.setStorageSync函数定义
将 data 存储在本地storage存储中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。


### setStorageSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 本地storage存储中的指定的 key |
| data | any | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要存储的内容，只支持能通过 JSON.stringify 序列化的对象 | 


:::warning
参数 `data` 为对象字面量时，需要通过 `as UTSJSONObject` 明确类型，例如：
```js
uni.setStorageSync('obj', {"a": 1} as UTSJSONObject)
```
:::



<!-- UTSAPIJSON.setStorageSync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.storage.storage.setStorageSync)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstoragesync)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setStorageSync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setStorageSync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setStorageSync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setStorageSync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setStorageSync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setStorageSync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.getStorage(options) @getstorage -->

::: sourceCode
## uni.getStorage(options) @getstorage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-storage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-storage

:::

uni.getStorage函数定义
从本地存储中异步获取指定 key 对应的内容。


### getStorage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetStorageOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 本地存储中的指定的 key |
| success | (res: [GetStorageSuccess](#getstoragesuccess-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.getStorage成功回调函数定义 |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.getStorage失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.getStorage完成回调函数定义 | 

#### GetStorageSuccess 的属性值 @getstoragesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | key 对应的内容 |




**注意：**

getStorageSync的返回值类型为any。因为set的时候任意类型都可以set进去。

使用any类型的数据需要as为正确的类型，才能调用类型上的方法。

对于简单类型，如string，只需要 as string。但对于复杂类型，比如 UTSJSONObject、type、class，需要参考获取复杂类型的数据章节，[见下](#gettypedata)

> 注意：获取一个不存在的 key 会触发 fail 回调，返回错误信息为 "getStorage:fail data not found" 的错误。

<!-- UTSAPIJSON.getStorage.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.storage.storage.getStorage)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorage)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorage.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getStorage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getStorage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getStorage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getStorage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getStorage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getStorage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.getStorageSync(key) @getstoragesync -->

::: sourceCode
## uni.getStorageSync(key) @getstoragesync

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-storage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-storage

:::

uni.getStorageSync函数定义
从本地存储中同步获取指定 key 对应的内容。


### getStorageSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 本地存储中的指定的 key | 


### 返回值 

| 类型 | 必备 |
| :- | :- |
| any | 否 |
 


**注意：**

getStorageSync的返回值类型为any。因为set的时候任意类型都可以set进去。

使用any类型的数据需要as为正确的类型，才能调用类型上的方法。

对于简单类型，如string，只需要 as string。但对于复杂类型，比如 UTSJSONObject、type、class，需要参考获取复杂类型的数据章节，[见下](#gettypedata)

另注意，同步方法获取一个不存在的 key 会返回空字符串，而不是 null。如需准确判断是空字符串还是null，应该使用异步方法`uni.getStorage`。

获取较大量的数据时，也推荐使用异步方法`uni.getStorage`，避免同步阻塞。

<!-- UTSAPIJSON.getStorageSync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.storage.storage.getStorageSync)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstoragesync)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getStorageSync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getStorageSync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getStorageSync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getStorageSync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getStorageSync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getStorageSync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.getStorageInfo(options) @getstorageinfo -->

::: sourceCode
## uni.getStorageInfo(options) @getstorageinfo

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-storage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-storage

:::

uni.getStorageInfo函数定义
异步获取当前 storage 的相关信息。


### getStorageInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetStorageInfoOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: [GetStorageInfoSuccess](#getstorageinfosuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.getStorageInfo成功回调函数定义 |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.getStorageInfo失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.getStorageInfo完成回调函数定义 | 

#### GetStorageInfoSuccess 的属性值 @getstorageinfosuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| keys | Array&lt;string&gt; | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 当前 storage 中所有的 key |
| currentSize | number | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 当前占用的空间大小, 单位：kb |
| limitSize | number | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 限制的空间大小, 单位：kb |




<!-- UTSAPIJSON.getStorageInfo.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.storage.storage.getStorageInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorageinfo)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageInfo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getStorageInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getStorageInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getStorageInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getStorageInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getStorageInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getStorageInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.getStorageInfoSync() @getstorageinfosync -->

::: sourceCode
## uni.getStorageInfoSync() @getstorageinfosync

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-storage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-storage

:::

uni.getStorageInfoSync函数定义
同步获取当前 storage 的相关信息。


### getStorageInfoSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |




### 返回值 

| 类型 | 描述 |
| :- | :- |
| **GetStorageInfoSuccess** | uni.getStorageInfo成功回调参数 |

#### GetStorageInfoSuccess 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| keys | Array&lt;string&gt; | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 当前 storage 中所有的 key |
| currentSize | number | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 当前占用的空间大小, 单位：kb |
| limitSize | number | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 限制的空间大小, 单位：kb | 


<!-- UTSAPIJSON.getStorageInfoSync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.storage.storage.getStorageInfoSync)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorageinfosync)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageInfoSync.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getStorageInfoSync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getStorageInfoSync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getStorageInfoSync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getStorageInfoSync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getStorageInfoSync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getStorageInfoSync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.removeStorage(options) @removestorage -->

::: sourceCode
## uni.removeStorage(options) @removestorage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-storage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-storage

:::

uni.removeStorage函数定义
从本地存储中异步移除指定 key。


### removeStorage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **RemoveStorageOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 本地存储中的指定的 key |
| success | (res: RemoveStorageSuccess) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.removeStorage成功回调函数定义 |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.removeStorage失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.removeStorage完成回调函数定义 | 




<!-- UTSAPIJSON.removeStorage.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.storage.storage.removeStorage)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#removestorage)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorage.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=removeStorage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=removeStorage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=removeStorage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=removeStorage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=removeStorage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=removeStorage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.removeStorageSync(key) @removestoragesync -->

::: sourceCode
## uni.removeStorageSync(key) @removestoragesync

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-storage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-storage

:::

uni.removeStorageSync函数定义
从本地存储中同步移除指定 key。


### removeStorageSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| key | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 本地存储中的指定的 key | 




<!-- UTSAPIJSON.removeStorageSync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.storage.storage.removeStorageSync)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#removestoragesync)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorageSync.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=removeStorageSync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=removeStorageSync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=removeStorageSync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=removeStorageSync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=removeStorageSync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=removeStorageSync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.clearStorage(option?) @clearstorage -->

::: sourceCode
## uni.clearStorage(option?) @clearstorage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-storage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-storage

:::

uni.clearStorage函数定义
清除本地数据存储。


### clearStorage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **ClearStorageOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.removeStorage参数定义 |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: ClearStorageSuccess) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.clearStorage 成功回调函数定义 |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.clearStorage 失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.clearStorage 完成回调函数定义 | 




<!-- UTSAPIJSON.clearStorage.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.storage.storage.clearStorage)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#clearstorage)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorage.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=clearStorage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=clearStorage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=clearStorage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=clearStorage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=clearStorage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=clearStorage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.clearStorageSync() @clearstoragesync -->

::: sourceCode
## uni.clearStorageSync() @clearstoragesync

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-storage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-storage

:::

uni.clearStorageSync函数定义
清除本地数据存储。


### clearStorageSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |






<!-- UTSAPIJSON.clearStorageSync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.storage.storage.clearStorageSync)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/storage/storage.html#clearstoragesync)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorageSync.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=clearStorageSync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=clearStorageSync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=clearStorageSync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=clearStorageSync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=clearStorageSync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=clearStorageSync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/storage/storage.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/storage/storage.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/storage/storage

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/storage/storage

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view>
      <page-head :title="data.title"></page-head>
      <view class="uni-common-mt">
        <view class="uni-list">
          <view class="uni-list-cell uni-list-cell-line">
            <view class="uni-list-cell-left">
              <view class="uni-label">key</view>
            </view>
            <view class="uni-list-cell-db">
              <input class="uni-input" type="text" placeholder="请输入key" name="key" :value="data.key" maxlength="-1"
                @input="keyChange" />
            </view>
          </view>
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">value</view>
            </view>
            <view class="uni-list-cell-db">
              <input class="uni-input" type="text" placeholder="请输入value" name="data"
                :value="typeof data.data === 'string' ? data.data : JSON.stringify(data.data)" maxlength="-1" @input="dataChange" />
            </view>
          </view>
        </view>
        <view class="uni-padding-wrap">
          <view class="uni-btn-v">
            <button class="uni-btn btn-getStorageInfoASync" type="primary" @tap="getStorageInfo">
              获取存储概述信息-异步
            </button>
            <button class="uni-btn btn-getStorageInfoSync" @tap="getStorageInfoSync">
              获取存储概述信息-同步
            </button>
          </view>
          <text class="uni-list-cell-db-text">{{ data.storageInfo }}</text>
          <view class="uni-flex uni-row">
            <button type="default" style="width:50%" @tap="strMock">
              填充字符串
            </button>
            <button type="default" style="width:50%" @tap="complexMock">
              填充复杂对象
            </button>
          </view>
          <view class="uni-flex uni-row">
            <button type="default" style="width:50%" @tap="numberMock">
              填充整型
            </button>
            <button type="default" style="width:50%" @tap="floatMock">
              填充浮点型
            </button>
          </view>
          <view class="uni-flex uni-row">
            <button type="default" style="width:50%" @tap="jsonLikeMock">
              填充json字符串
            </button>
            <button type="default" style="width:50%" @tap="longLikeMock">
              填充整数字符串
            </button>
          </view>
          <view class="uni-flex uni-row">
            <button type="default" style="width:50%" @tap="floatLikeMock">
              填充浮点字符串
            </button>
            <button type="default" style="width:50%" @tap="negativeLikeMock">
              填充负数字符串
            </button>
          </view>
          <view class="uni-flex uni-row">
            <button type="default" class="uni-btn btn-complexStaticTest" style="width:100%" @tap="complexStaticTest">
              字面量读写测试
            </button>
          </view>
        </view>
        <view class="uni-padding-wrap">
          <view class="uni-btn-v">
            <button type="primary" class="uni-btn btn-setstorageAsync" @tap="setStorage">
              存储数据-异步
            </button>
            <button class="uni-btn btn-getstorageAsync" @tap="getStorage">读取数据-异步</button>
            <button class="uni-btn btn-removeStorageInfoASync" @tap="removeStorage">移除数据-异步</button>
            <button class="uni-btn btn-clearStorageInfoASync" @tap="clearStorage">清理数据-异步</button>
          </view>

          <view class="uni-btn-v">
            <button type="primary" class="uni-btn btn-setstorageSync" @tap="setStorageSync">
              存储数据-同步
            </button>
            <button class="uni-btn btn-getstorageSync" @tap="getStorageSync">读取数据-同步</button>
            <button class="uni-btn btn-removeStorageInfoSync" @tap="removeStorageSync">
              移除数据-同步
            </button>
            <button class="uni-btn btn-clearStorageInfoSync" @tap="clearStorageSync">
              清理数据-同步
            </button>
          </view>
        </view>
      </view>
      <button type="primary" @click="goto">前往storage管理器</button>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type DataType = {
    title: string
    key: string
    data: any
    apiGetData: any | null
    storageInfo: string
    staticComplexRet: boolean
    jest_saveUTSJSONObjectSyncResult: number
    jest_saveUTSJSONObjectAsyncResult: number
    jest_saveUTSJSONObjectArraySyncResult: number
  }
  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    title: 'get/set/clearStorage',
    key: '',
    data: '',
    apiGetData: '',
    storageInfo: '',
    staticComplexRet: false,
    jest_saveUTSJSONObjectSyncResult: 0,
    jest_saveUTSJSONObjectAsyncResult: 0,
    jest_saveUTSJSONObjectArraySyncResult: 0
  } as DataType)

  const getStorageInfo = () => {
    uni.getStorageInfo({
      success: (res) => {
        data.apiGetData = res
        data.storageInfo = JSON.stringify(res)
      },
    })
  }

  const getStorageInfoSync = () => {
    try {
      const res = uni.getStorageInfoSync()
      data.apiGetData = res
      data.storageInfo = JSON.stringify(res)
    } catch (e) {
      // error
      console.log(e)
    }
  }

  const jsonLikeMock = () => {
    data.key = 'key_' + Math.random()
    data.data = JSON.stringify({
      name: "james",
      age: 12,
      from: "american"
    });
  }

  const longLikeMock = () => {
    data.key = 'key_' + Math.random()
    data.data = "1234567890"
  }

  const floatLikeMock = () => {
    data.key = 'key_' + Math.random()
    data.data = "321456.1234567890"
  }

  const negativeLikeMock = () => {
    data.key = 'key_' + Math.random()
    data.data = "-321456"
  }

  const strMock = () => {
    data.key = 'key_' + Math.random()
    data.data = '测试字符串数据，长度为16个字符'
  }

  const complexStaticTest = () => {
    uni.setStorageSync("key_complexStaticMock", {
      name: "张三",
      age: 12
    })
    let savedData = uni.getStorageSync("key_complexStaticMock")
    data.staticComplexRet = false
    if (savedData instanceof UTSJSONObject) {
      if ((savedData as UTSJSONObject).getNumber('age') == 12) {
        data.staticComplexRet = true
        uni.showToast({
          icon: 'success',
          title: '测试通过'
        })
      }
    }
  }

  const complexMock = () => {
    data.key = 'key_' + Math.random()
    let jsonObj = {
      name: '张三',
      age: 12,
      classMate: [
        {
          id: 1001,
          name: '李四',
        },
        {
          id: 1002,
          name: 'jack ma',
        },
      ],
    }
    data.data = jsonObj
  }

  const numberMock = () => {
    data.key = 'key_' + Math.random()
    data.data = 10011
  }

  const floatMock = () => {
    data.key = 'key_' + Math.random()
    data.data = 3.1415926535893384626
  }

  const keyChange = (e : InputEvent) => {
    data.key = e.detail.value
  }

  const dataChange = (e : InputEvent) => {
    data.data = e.detail.value
  }

  const getStorage = () => {
    var key = data.key
    if (key.length == 0) {
      // #ifndef MP
      uni.hideModal({
        modalPage:null
      })
      // #endif
      uni.showModal({
        title: '读取数据失败',
        content: 'key 不能为空',
        showCancel: false,
      })
    } else {
      uni.getStorage({
        key: key,
        success: (res) => {
          data.apiGetData = res.data
          let desc : string = typeof data.apiGetData
          if ("object" == desc) {
            desc = desc + ": " + JSON.stringify(data.apiGetData)
          } else {
            desc = desc + ": " + data.apiGetData
          }
          // #ifndef MP
          uni.hideModal({
            modalPage:null
          })
          // #endif
          uni.showModal({
            title: '读取数据成功',
            content: desc,
            showCancel: false,
          })
        },
        fail: () => {
          // #ifndef MP
          uni.hideModal({
            modalPage:null
          })
          // #endif
          uni.showModal({
            title: '读取数据失败',
            content: '找不到 key 对应的数据',
            showCancel: false,
          })
        },
      })
    }
  }

  const getStorageSync = () => {
    var key = data.key
    if (key.length == 0) {
      // #ifndef MP
      uni.hideModal({
        modalPage:null
      })
      // #endif
      uni.showModal({
        title: '读取数据失败',
        content: 'key 不能为空',
        showCancel: false,
      })
    } else {
      data.apiGetData = uni.getStorageSync(key)

      let desc : string = typeof data.apiGetData
      if ("object" == desc) {
        desc = desc + ": " + JSON.stringify(data.apiGetData)
      } else {
        desc = desc + ": " + data.apiGetData
      }
      // #ifndef MP
      uni.hideModal({
        modalPage:null
      })
      // #endif
      uni.showModal({
        title: '读取数据成功',
        content: desc,
        showCancel: false,
      })
    }
  }

  const setStorage = () => {
    var key = data.key
    var storageData = data.data
    if (key.length == 0) {
      // #ifndef MP
      uni.hideModal({
        modalPage:null
      })
      // #endif
      uni.showModal({
        title: '保存数据失败',
        content: 'key 不能为空',
        showCancel: false,
      })
    } else {
      uni.setStorage({
        key: key,
        data: storageData,
        success: () => {
          // #ifndef MP
          uni.hideModal({
            modalPage:null
          })
          // #endif
          uni.showModal({
            title: '存储数据成功',
            showCancel: false,
          })
        },
        fail: () => {
          // #ifndef MP
          uni.hideModal({
            modalPage:null
          })
          // #endif
          uni.showModal({
            title: '储存数据失败!',
            showCancel: false,
          })
        },
      })
    }
  }

  const setStorageSync = () => {
    var key = data.key
    var storageData = data.data
    if (key.length == 0) {
      // #ifndef MP
      uni.hideModal({
        modalPage:null
      })
      // #endif
      uni.showModal({
        title: '保存数据失败',
        content: 'key 不能为空',
        showCancel: false,
      })
    } else {
      uni.setStorageSync(key, storageData)
      // #ifndef MP
      uni.hideModal({
        modalPage:null
      })
      // #endif
      uni.showModal({
        title: '存储数据成功',
        showCancel: false,
      })
    }
  }

  const removeStorage = () => {
    uni.removeStorage({
      key: data.key,
      success: () => {
        // #ifndef MP
        uni.hideModal({
          modalPage:null
        })
        // #endif
        uni.showModal({
          title: '移除数据成功',
          showCancel: false,
        })
      },
      fail: () => {
        // #ifndef MP
        uni.hideModal({
          modalPage:null
        })
        // #endif
        uni.showModal({
          title: '移除数据失败',
          showCancel: false,
        })
      },
    })
  }

  const removeStorageSync = () => {
    uni.removeStorageSync(data.key)
    // #ifndef MP
    uni.hideModal({
      modalPage:null
    })
    // #endif
    uni.showModal({
      title: '移除数据成功',
      showCancel: false,
    })
  }

  const clearStorage = () => {
    data.key = ''
    data.data = ''
    uni.clearStorage({
      success: function (_) {
        // #ifndef MP
        uni.hideModal({
          modalPage:null
        })
        // #endif
        uni.showModal({
          title: '清除数据成功',
          showCancel: false,
        })
      },
      fail: function (_) {
        // #ifndef MP
        uni.hideModal({
          modalPage:null
        })
        // #endif
        uni.showModal({
          title: '清除数据失败',
          showCancel: false,
        })
      },
    })
  }

  const clearStorageSync = () => {
    data.key = ''
    data.data = ''
    uni.clearStorageSync()
    // #ifndef MP
    uni.hideModal({
      modalPage:null
    })
    // #endif
    uni.showModal({
      title: '清除数据成功',
      content: ' ',
      showCancel: false,
    })
  }

  const jest_saveUTSJSONObject = () => {
    const key = 'test_key_saveUTSJSONObject'
    uni.setStorageSync(key, {
      a: {
        b: 1
      }
    })
    const dataSync = uni.getStorageSync(key) as UTSJSONObject
    const dataSyncA = dataSync['a'] as UTSJSONObject
    data.jest_saveUTSJSONObjectSyncResult = dataSyncA.get('b') as number
    uni.getStorage({
      key,
      success: (res) => {
        const dataAsync = res.data as UTSJSONObject
        const dataAsyncA = dataAsync['a'] as UTSJSONObject
        data.jest_saveUTSJSONObjectAsyncResult = dataAsyncA.get('b') as number
        console.log('data.jest_saveUTSJSONObjectSyncResult: ' + data.jest_saveUTSJSONObjectSyncResult)
        console.log('data.jest_saveUTSJSONObjectAsyncResult: ' + data.jest_saveUTSJSONObjectAsyncResult)
      }
    })
  }

  const jest_saveUTSJSONObjectArray = () => {
    const key = 'test_key_saveUTSJSONObjectArray'
    uni.setStorageSync(key, [{
      a: 1
    }] as UTSJSONObject[])
    const dataSync = uni.getStorageSync(key) as UTSJSONObject[]
    data.jest_saveUTSJSONObjectArraySyncResult = dataSync[0].get('a') as number
  }

  const goto = () => {
    uni.navigateTo({
      url:"/pages/API/storage/storagemanage"
    })
  }

  defineExpose({
    data,
    jest_saveUTSJSONObject,
    jest_saveUTSJSONObjectArray
  })
</script>

<style>
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |



## 类型数据的存取说明@gettypedata

首先明确一个原则，Storage实际储存到各终端文件系统的是**序列化后的数据**。

也就是当我们使用setStorage/setStorageSync 储存一个带类型的数据时，插件内部会自动将其序列化为字符串后进行储存。当我们调用 getStorage/getStorageSync 插件内部也会尝试对字符串进行类型还原，分为以下几种情况：

不同平台支持的数据类型略有差异。

- web端支持类型：String、Number、Boolean、Object(任意对象，包括UTSJSONObject)、Array、null。
- 微信小程序支持类型：String、Number、Boolean、Object(任意对象，包括UTSJSONObject)、Array、null、Date（取出时会反序列化为Date实例）。
- 鸿蒙app端支持类型：String、Number、Boolean、Object(任意对象，包括UTSJSONObject)、Array、null。
- Android app端支持类型：String、Number、Boolean、Object(UTSJSONObject/Type)、Array。
- iOS app端支持类型：String、Number、Boolean、Object(UTSJSONObject/Type)、Array。

#### UTSJSONObject

如果是`UTSJSONObject` 类型，不会有类型的丢失

```ts
let json1 = {
	id:1001,
	name:"jack"
}

uni.setStorageSync("test-json",json1)
let json2 = uni.getStorageSync("test-json")
// json2 ‍[⁠UTSJSONObject⁠]‍ {id: 1001, name: "jack"}
console.log("json2",json2)
```

#### type类型

如果是type类型，可以正常写入，但是当读取时得到是UTSJSONObject类型，需要进行类型转换。


```ts
type User = {
	name:string,
	age:number
}
let u1 = {
	name : "张三",
	age:123
}
uni.setStorageSync("test-a",u1)
uni.getStorage({
	key:'test-a',
	success:function(res:GetStorageSuccess){
		// 此时只能得到的UTSJSONObject类型
		let jsonObject = res.data
		// 再次进行类型转换
		let userObject = JSON.parse<User>(JSON.stringify(jsonObject))
		// jsonObject ‍[⁠UTSJSONObject⁠]‍ {age: 123, name: "张三"}
		console.log("jsonObject",jsonObject)
		// userObject ‍[⁠User⁠]‍ {age: 123, name: "张三"}
		console.log("userObject",userObject)
	}
})
```

#### 自定义class

还有一种情况，如果开发者使用class而非type定义类型，默认情况下无法读写的。

> 大多数情况下，我们更推荐使用type,而不是自定义class。 因为自定义class的行为在不同终端可能表现不一致。


```ts
class Person {
	// 声明属性类型（必须显式初始化或在构造函数中赋值）
	name: string;
	age: number;

	// 构造函数
	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	// 方法
	greet(): string {
		return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
	}
}

// 使用类
const alice = new Person("Alice", 30);
console.log(alice.greet()); // "Hello, I'm Alice and I'm 30 years old."

uni.setStorageSync("test-class-0",alice)
let dataObj = uni.getStorageSync("test-class-0")
// 此时只能得到空的UTSJSONObject {}
console.log("data",dataObj)
```

如果要支持读写，开发者需要实现 `IJSONStringify`接口。关于IJSONStringify的[更多介绍](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/json.html)

```ts
class Person implements IJSONStringify {
	// 声明属性类型（必须显式初始化或在构造函数中赋值）
	name: string;
	age: number;

	// 构造函数
	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}
	// 自定义序列化规则
	toJSON():any{
		let jsonRet = UTSJSONObject()
		jsonRet["name"] = this.name
		jsonRet["age"] = this.age
		return jsonRet
	}

	// 方法
	greet(): string {
		return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
	}
}

// 使用类
const alice = new Person("Alice", 30);
console.log(alice.greet()); // "Hello, I'm Alice and I'm 30 years old."

uni.setStorageSync("test-class-0",alice)
let dataObj = uni.getStorageSync("test-class-0")
// [⁠UTSJSONObject⁠]‍ {name: "Alice", age: 30}
console.log("dataObj",dataObj)
//  ‍[⁠Person⁠]‍ {age: 30, name: "Alice"}
let personObj = JSON.parse<Person>(JSON.stringify(dataObj))
console.log("personObj",personObj)

```

此时，我们就可以让自定义class实现类似自定义type的效果了。
