<!-- ## uni.request(param) @request -->

::: sourceCode
## uni.request(param) @request

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-network


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-network

:::

发起网络请求。

### request 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| param | [RequestOptions\<T>](#requestoptions-values) | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 网络请求参数 |

#### param 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开发者服务器接口地址<br/> |
| data | any | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 请求的参数 在`app-android端，参数类型只能为`UTSJSONObject`或者`string`类型,app-android平台从 4.51版本开始支持ArrayBuffer, app-ios平台从 4.61版本开始支持ArrayBuffer |
| header | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设置请求的 header，header 中不能设置 Referer |
| method | string | 否 | "GET" | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 请求方法 |
| timeout | number | 否 | 60000 | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: - | 超时时间，单位 ms |
| enableQuic | boolean | 否 | false | Web: √; 微信小程序: √; Android 系统版本: 6.0; Android: 5.0; iOS: 5.0; iOS uni-app x UTS 插件: 5.0; HarmonyOS: 5.0; HarmonyOS(Vapor): 5.0 | 是否开启 Quic/h3 协议<br/>`web` 端由服务端和浏览器共同决定是否启用 Quic/h3 协议，无需设置此参数 |
| withCredentials | boolean | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: x | 跨域请求时是否携带凭证（cookies）<br/> |
| firstIpv4 | boolean | 否 | false | Web: x; 微信小程序: 4.41; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: x | DNS解析时优先使用ipv4 |
| enableChunked | boolean | 否 | - | Web: 4.71; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.71; HarmonyOS uni-app x UTS 插件: 4.71 | 开启 transfer-encoding chunked。 |
| success | (option: [RequestSuccess\<T>](#requestsuccess-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 网络请求成功回调。 |
| fail | (option: [RequestFail](#requestfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 网络请求失败回调。 |
| complete | (option: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 网络请求完成回调，成功或者失败都会调用。 | 

##### method 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| GET | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | GET方法请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据。 |
| POST | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | POST方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用。 |
| PUT | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | PUT方法用有效载荷请求替换目标资源的所有当前表示。 |
| PATCH | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | PATCH方法用于对资源应用部分修改。 |
| DELETE | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | DELETE方法删除指定的资源。 |
| HEAD | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | HEAD方法请求一个与GET请求的响应相同的响应，但没有响应体。 |
| OPTIONS | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | OPTIONS 方法用于描述目标资源的通信选项。 |

#### RequestSuccess\<T> 的属性值 @requestsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | T | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开发者服务器返回的数据, app-android平台从 4.51版本开始支持ArrayBuffer, app-ios平台从 4.61版本开始支持ArrayBuffer |
| statusCode | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开发者服务器返回的 HTTP 状态码 |
| header | any | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开发者服务器返回的 HTTP Response Header |
| cookies | Array&lt;string&gt; | 是 | - | Web: x; 微信小程序: -; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开发者服务器返回的 cookies，格式为字符串数组 |

#### RequestFail 的属性值 @requestfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 5 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口超时 |
| 1000 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 服务端系统错误 |
| 100001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | json数据解析错误 |
| 100002 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息json解析失败 |
| 100003 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | json解析类型转换失败 |
| 600003 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 网络中断 |
| 600008 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | data参数类型不合法 |
| 600009 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | URL格式不合法 |
| 602001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | request系统错误 |


### 返回值 

| 类型 |
| :- |
| [RequestTask](#requesttask-values) |

#### RequestTask 的方法 @requesttask-values 

#### abort(): void @abort
abort
中断网络请求。
##### abort 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |



#### onChunkReceived(listener: RequestTaskOnChunkReceivedCallback): number @onchunkreceived
onChunkReceived
监听 Transfer-Encoding Chunk Received 事件。
##### onChunkReceived 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS uni-app x UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.71 | 4.41 | 4.71 | 4.71 | 4.71 | 4.71 | 4.71 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| listener | (result: [RequestTaskOnChunkReceivedListenerResult](#requesttaskonchunkreceivedlistenerresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### RequestTaskOnChunkReceivedListenerResult 的属性值 @requesttaskonchunkreceivedlistenerresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: 4.71; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.71; HarmonyOS uni-app x UTS 插件: 4.71 | 返回的chunk buffer |

##### 返回值 

| 类型 |
| :- |
| number |
 

#### offChunkReceived(listener?: number \| RequestTaskOnChunkReceivedCallback \| null): void @offchunkreceived
offChunkReceived
移除 Transfer-Encoding Chunk Received 事件的监听函数。
##### offChunkReceived 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS uni-app x UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.71 | 4.41 | 4.71 | 4.71 | 4.71 | 4.71 | 4.71 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| listener | number \| (result: [RequestTaskOnChunkReceivedListenerResult](#requesttaskonchunkreceivedlistenerresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onHeadersReceived(listener: RequestTaskOnHeadersReceivedCallback): number @onheadersreceived
onHeadersReceived
监听 HTTP Response Header 事件。
##### onHeadersReceived 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS uni-app x UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.71 | 4.41 | 4.71 | 4.71 | 4.71 | 4.71 | 4.71 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| listener | (result: [RequestTaskOnHeadersReceivedListenerResult](#requesttaskonheadersreceivedlistenerresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | HTTP Response Header 事件的监听函数 | 

##### RequestTaskOnHeadersReceivedListenerResult 的属性值 @requesttaskonheadersreceivedlistenerresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| cookies | Array&lt;string&gt; | 是 | - | Web: 4.71; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.71; HarmonyOS uni-app x UTS 插件: 4.71 | 开发者服务器返回的 cookies，格式为字符串数组 |
| header | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | - | Web: 4.71; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.71; HarmonyOS uni-app x UTS 插件: 4.71 | 开发者服务器返回的 HTTP Response Header |
| statusCode | number | 是 | - | Web: 4.71; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.71; HarmonyOS uni-app x UTS 插件: 4.71 | 开发者服务器返回的 HTTP 状态码 （目前开发者工具上不会返回 statusCode 字段，可用真机查看该字段，后续将会支持） |

##### 返回值 

| 类型 |
| :- |
| number |
 

#### offHeadersReceived(listener?: number \| RequestTaskOnHeadersReceivedCallback \| null): void @offheadersreceived
offHeadersReceived
移除 HTTP Response Header 事件的监听函数。
##### offHeadersReceived 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS uni-app x UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- |
| 4.71 | 4.41 | 4.71 | 4.71 | 4.71 | 4.71 | 4.71 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| listener | number \| (result: [RequestTaskOnHeadersReceivedListenerResult](#requesttaskonheadersreceivedlistenerresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.request)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/request/request.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/RequestTask.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=request&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=request&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=request&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=request&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=request)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=request&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/request/request.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/request/request.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/request/request

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/request/request

>示例
```vue
<template>
  <view style="flex: 1;">
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-common-mt" style="border-width: 2px;border-style: solid; border-radius: 4px;">
        <textarea :value="data.res" class="uni-textarea" style="width: 100%"></textarea>
      </view>
      <view>
        <text>地址 : {{ data.host + data.url}}</text>
        <text>请求方式 : {{data.method}}</text>
      </view>
      <view class="uni-btn-v uni-common-mt">
        <button type="primary" @click="sendRequest">发起请求</button>
      </view>
    </view>
    <scroll-view style="flex: 1;" show-scrollbar="true">
      <view style="padding: 20px;">
        <text>设置请求方式</text>
        <view class="uni-common-pb"></view>
        <view style="flex-direction: row;flex-wrap: wrap;">
          <button style="padding: 5px; margin-right: 10px;" type="primary" size="mini"
            @click="changeMethod('GET')">GET</button>
          <button style="padding: 5px; margin-right: 10px; " type="primary" size="mini"
            @click="changeMethod('POST')">POST</button>
          <button style="padding: 5px; margin-right: 10px; " type="primary" size="mini"
            @click="changeMethod('PUT')">PUT</button>
          <button style="padding: 5px; margin-right: 10px;" type="primary" size="mini"
            @click="changeMethod('DELETE')">DELETE</button>
          <button style="padding: 5px; margin-right: 10px; " type="primary" size="mini"
            @click="changeMethod('PATCH')">PATCH</button>
          <button style="padding: 5px;margin-right: 10px;" type="primary" size="mini"
            @click="changeMethod('OPTIONS')">OPTIONS</button>
          <button style="padding: 5px;" type="primary" size="mini" @click="changeMethod('HEAD')">HEAD</button>
        </view>
      </view>
      <view style="padding: 20px;">
        <text>请求返回错误码的接口（默认为GET）</text>
        <view class="uni-common-pb"></view>
        <view style="flex-direction: row;flex-wrap: wrap;">
          <button style="padding: 5px;" type="primary" size="mini" v-for="(item, index) in data.errorCodeUrls" :key="index"
            @click="changeUrl(item)">{{item}}</button>
        </view>
      </view>
      <view style="padding: 20px;">
        <text>请求不同header的接口（默认为GET）</text>
        <view class="uni-common-pb"></view>
        <view style="flex-direction: row;flex-wrap: wrap;">
          <button style="padding: 5px;" type="primary" size="mini" v-for="(item, index) in data.headerUrls" :key="index"
            @click="changeUrl(item)">{{item}}</button>
        </view>
      </view>
      <view style="padding: 20px;">
        <text>请求不同content-type的接口（默认为GET）</text>
        <view class="uni-common-pb"></view>
        <view style="flex-direction: row;flex-wrap: wrap;">
          <button style="padding: 5px;" type="primary" size="mini" v-for="(item, index) in data.contentTypeUrls" :key="index"
            @click="changeUrl(item)">{{item}}</button>
        </view>
      </view>

      <view style="padding: 20px;">
        <text>POST请求(有body)</text>
        <view class="uni-common-pb"></view>
        <view style="flex-direction: row;flex-wrap: wrap;">
          <button style="padding: 5px;" type="primary" size="mini" v-for="(item, index) in data.postUrls" :key="index"
            @click="changeUrlFromPost(item)">{{item}}</button>
        </view>
      </view>
      <!-- #ifdef APP || MP-WEIXIN || WEB -->
      <view style="padding: 20px;">
        <text>ArrayBuffer 测试</text>
        <view class="uni-common-pb"></view>
        <view style="flex-direction: row;flex-wrap: wrap;">
          <button style="padding: 5px;" type="primary" size="mini"
            @click="sendArrayBuffer(false)">请求body为ArrayBuffer，response也为ArrayBuffer</button>
          <button style="padding: 5px;" type="primary" size="mini"
            @click="sendArrayBuffer(true)">请求response为ArrayBuffer</button>
        </view>
      </view>
      <!-- #endif -->

      <view style="padding: 20px;">
        <text>RequestTask 测试</text>
        <view class="uni-common-pb"></view>
        <button type="primary" @click="sendChunkRequest">流式请求</button>
      </view>

      <view style="padding: 20px;">
        <text>enableQuic 测试</text>
        <view class="uni-common-pb"></view>
        <button type="primary" @click="sendH3Request">http3请求</button>
      </view>

      <view style="padding: 20px;">
        <text>Accept-Encoding:'gzip'测试</text>
        <view class="uni-common-pb"></view>
        <button type="primary" @click="sendGzipRequest">Accept-Encoding:'gzip'请求</button>
      </view>

      <view style="padding: 20px;">
        <text>检测query</text>
        <view class="uni-common-pb"></view>
        <button type="primary" @click="checkQuery">检测query</button>
      </view>

      <view class="uni-common-pb"></view>
      <view class="uni-common-pb"></view>
    </scroll-view>
  </view>
</template>
<script setup lang="uts">
  // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
  import {
    testInovkeRequest,
    CommonOptions
  } from '@/uni_modules/test-invoke-network-api'
  // #endif

  class GETDataType {
    data : UTSJSONObject | null = null
  }

  const duration = 2000
  const methodMap = {
    "GET": "/api/http/method/get",
    "POST": "/api/http/method/post",
    "PUT": "/api/http/method/put",
    "DELETE": "/api/http/method/delete",
    "PATCH": "/api/http/method/patch",
    "OPTIONS": "/api/http/method/options",
    "HEAD": "/api/http/method/head"
  }

  const h3url = "https://request-h3.dcloud.net.cn/api/http/protocol";

  type DataType = {
    title: string;
    res: string;
    task: RequestTask | null;
    host: string;
    url: string;
    method: RequestMethod | null;
    data: any | null;
    header: UTSJSONObject | null;
    errorCodeUrls: string[];
    headerUrls: string[];
    contentTypeUrls: string[];
    postUrls: string[];
    jest_requestTask_result: boolean;
    jest_result: boolean;
    jest_result_data: string;
    jest_complete: boolean;
  }

  const data = reactive({
    title: 'request',
    res: '',
    task: null,
    host: "https://request.dcloud.net.cn",
    url: "/api/http/method/get",
    method: "GET",
    data: null,
    header: null,
    errorCodeUrls: [
      "/api/http/statusCode/200",
      "/api/http/statusCode/204",
      "/api/http/statusCode/301",
      "/api/http/statusCode/302",
      "/api/http/statusCode/307",
      "/api/http/statusCode/400",
      "/api/http/statusCode/401",
      "/api/http/statusCode/403",
      "/api/http/statusCode/404",
      "/api/http/statusCode/405",
      "/api/http/statusCode/500",
      "/api/http/statusCode/502",
      "/api/http/statusCode/503",
      "/api/http/statusCode/504",
    ],
    headerUrls: [
      "/api/http/header/ua",
      "/api/http/header/referer",
      "/api/http/header/requestCookie",
      "/api/http/header/setCookie",
      "/api/http/header/deleteCookie"
    ],
    contentTypeUrls: [
      "/api/http/contentType/text/plain",
      "/api/http/contentType/text/html",
      "/api/http/contentType/text/xml",
      "/api/http/contentType/image/gif",
      "/api/http/contentType/image/jpeg",
      "/api/http/contentType/image/png",
      "/api/http/contentType/application/json",
      "/api/http/contentType/application/octetStream",
    ],
    postUrls: [
      "/api/http/contentType/json",
      "/api/http/contentType/xWwwFormUrlencoded",
    ],
    //自动化测试例专用
    jest_requestTask_result: false,
    jest_result: false,
    jest_complete: false,
    jest_result_data: ""
  } as DataType)

  onUnload(() => {
    uni.hideLoading();
    data.task?.abort();
  })

  const sendChunkRequest = () => {
    uni.navigateTo({
      url: "/pages/API/request/requestTask"
    })
  }

  const sendH3Request = () => {
    uni.showLoading({
      title: "请求中..."
    })
    uni.request<string>({
      url:h3url,
      // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
      enableQuic:true,
      // #endif
      dataType: 'text',
      success:(res) => {
        data.res = JSON.stringify(res)
        uni.hideLoading();
        uni.showToast({
          title: '请求成功',
          icon: 'success',
          duration: duration
        })
        console.log("res: ", res);
      },
      fail:(e) => {
        data.res = e.errMsg
        uni.hideLoading();
        uni.showToast({
          title: '请求失败',
          icon: 'error',
          duration: duration
        })
        console.log("error: ", e);
      }
    })
  }

  const sendGzipRequest = () => {
    uni.request({
      url: data.host + methodMap["POST"],
      header: {
        'Accept-Encoding': 'gzip'
      },
      method:"POST",
      data:{
        "hello": "world"
      },
      success:(res) => {
        console.log("res: ", res);
        data.jest_result = true;
      },
      fail: (e) => {
        console.log("error: ", e);
        data.jest_result = false;
      }
    })
  }

  const checkQuery = () => {
    uni.request<string>({
      url: "https://request.dcloud.net.cn/api/http/echo/text?Signature=whpMFJg%2B%2Fc0tqdNXxo4330muVdc%3D",
      success:(res) => {
        data.jest_result = res.data == "Signature=whpMFJg%2B%2Fc0tqdNXxo4330muVdc%3D\n";
        console.log("res: ", res);
      },
      fail: (e) => {
        console.log("error: ", e);
        data.jest_result = false;
      }
    })
  }

  const changeMethod = (e : RequestMethod) => {
    data.method = e;
    data.url = methodMap[e] as string;
    data.data = null;
    data.header = null;
  }

  const changeUrl = (e : string) => {
    data.method = "GET";
    data.url = e;
    data.data = null;
    data.header = null;
  }

  const changeUrlFromPost = (e : string) => {
    data.method = "POST";
    data.url = e;
    switch (e) {
      case "/api/http/contentType/json":
        data.header = {
          "Content-Type": "application/json"
        };
        data.data = {
          "hello": "world"
        };
        break;
      case "/api/http/contentType/xWwwFormUrlencoded":
        data.header = {
          "Content-Type": "application/x-www-form-urlencoded"
        };
        data.data = "hello=world";
        break;
    }
  }

  // #ifdef APP | MP-WEIXIN | WEB
  const sendArrayBuffer = (onlyResponse : boolean) => {
    data.method = "POST"
    data.url = "/api/http/contentType/arrayBuffer/post"

    if (onlyResponse) {
      data.header = {
        "Content-Type": "application/json"
      };
      data.data = {
        "hello": "world"
      };
      uni.showLoading({
        title: "请求中..."
      })
      data.task = uni.request<ArrayBuffer>({
        url: data.host + data.url,
        method: data.method,
        data: data.data,
        header: data.header,
        timeout: 60000,
        sslVerify: false,
        withCredentials: false,
        responseType: 'arraybuffer',
        firstIpv4: false,
        success: (res) => {
          if (res.data != null) {
            let uint8 = new Uint8Array(res.data as ArrayBuffer)
            console.log('request success', uint8.toString())
            data.res = '请求结果 : ' + uint8.toString()

            console.log('request success header is :', JSON.stringify(res.header))
            uni.showToast({
              title: '请求成功',
              icon: 'success',
              mask: true,
              duration: duration
            });
          } else {
            uni.showModal({
              content: 'error',
              showCancel: false
            });
          }

        },
        fail: (err) => {
          console.log('request fail', err);
          uni.showModal({
            content: err.errMsg,
            showCancel: false
          });
        },
        complete: () => {
          uni.hideLoading()
          data.task = null
        },
      });


    } else {
      uni.chooseImage({
        count: 1,
        albumMode: "system",
        sizeType: ["original"],
        sourceType: ["album"],
        success: (e) => {
          console.log(e.tempFilePaths[0]);
          uni.getFileSystemManager().readFile({
            filePath: e.tempFilePaths[0],
            success: (res) => {
              data.data = res.data as ArrayBuffer
              data.header = {
                "Content-Type": "application/octet-stream"
              };

              uni.showLoading({
                title: "请求中..."
              })
              data.task = uni.request<ArrayBuffer>({
                url: data.host + data.url,
                method: data.method,
                data: data.data,
                header: data.header,
                timeout: 60000,
                sslVerify: false,
                withCredentials: false,
                firstIpv4: false,
                responseType: 'arraybuffer',
                success: (res) => {
                  console.log()
                  if (res.data != null) {
                    uni.showToast({
                      title: '请求成功',
                      icon: 'success',
                      mask: true,
                      duration: duration
                    });
                    data.res = '请求结果 : byteLength=' + (res.data as ArrayBuffer).byteLength
                    console.log('request success header is :', JSON.stringify(res.header))
                  } else {
                    uni.showModal({
                      content: 'error',
                      showCancel: false
                    });
                  }

                },
                fail: (err) => {
                  console.log('request fail', err);
                  uni.showModal({
                    content: err.errMsg,
                    showCancel: false
                  });
                },
                complete: () => {
                  uni.hideLoading()
                  data.task = null
                },
              });

            }
          })
        }
      });
    }
  }
  // #endif

  const sendRequest = () => {
    uni.showLoading({
      title: "请求中..."
    })
    data.task = uni.request({
      url: data.host + data.url,
      // dataType: "json",
      // responseType: "json",
      method: data.method,
      data: data.data,
      header: data.header,
      timeout: 6000,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: (res) => {
        console.log('request success', JSON.stringify(res.data))
        console.log('request success header is :', JSON.stringify(res.header))
        uni.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: duration
        });
        data.res = '请求结果 : ' + JSON.stringify(res);
      },
      fail: (err) => {
        console.log('request fail', err);
        uni.showModal({
          content: err.errMsg,
          showCancel: false
        });
      },
      complete: () => {
        uni.hideLoading()
        data.task = null
      },
    });
  }

  //自动化测试例专用
  const jest_request = () => {
    uni.request({
      url: data.host + data.url,
      // dataType: "json",
      // responseType: "json",
      method: data.method,
      data: data.data,
      header: data.header,
      timeout: 6000,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: () => {
        data.jest_result = true;
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_cookie_request = (needCookie : boolean) => {
    uni.request({
      url: data.host + "/api/http/header/requestCookie",
      method: "GET",
      timeout: 6000,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: (res) => {
        const requestCookie = (res.data as UTSJSONObject).getJSON("data")?.getAny("requestCookie")
        data.jest_result_data = JSON.stringify(requestCookie)
        if (requestCookie instanceof Array) {
          data.jest_result = needCookie ? requestCookie.length > 0 : requestCookie.length == 0
        } else {
          data.jest_result = needCookie ? (requestCookie as UTSJSONObject).toMap().size > 0 : (requestCookie as UTSJSONObject).toMap().size == 0
        }
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_set_cookie = () => {
    uni.request({
      url: data.host + "/api/http/header/setCookie",
      method: "GET",
      timeout: 6000,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: () => {
        jest_cookie_request(true)
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_set_cookie_expires = () => {
    uni.request({
      url: data.host + "/api/http/header/setCookie?expires=5",
      method: "GET",
      timeout: 6000,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: () => {
        jest_cookie_request(true)
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_delete_cookie = () => {
    uni.request({
      url: data.host + "/api/http/header/deleteCookie",
      method: "GET",
      timeout: 6000,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: () => {
        jest_cookie_request(false)
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }



  const jest_timeout_null = () => {
    uni.request({
      url: data.host + (methodMap['GET'] as string),
      method: "GET",
      timeout: null,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: () => {
        data.jest_result = true;
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_get_with_data = () => {
    uni.request({
      url: "https://unidemo.dcloud.net.cn/api/banner/36kr",
      method: "GET",
      data: {
        column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
      },
      timeout: 6000,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: () => {
        data.jest_result = true;
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_get_with_generics = () => {
    uni.request<GETDataType>({
      url: data.host + (methodMap['GET'] as string),
      method: "GET",
      timeout: null,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: (res : RequestSuccess<GETDataType>) => {
        data.jest_result = true;
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_get_array = () => {
    uni.request<UTSJSONObject[]>({
      url: 'https://unidemo.dcloud.net.cn/api/news?column=title,author_name,cover,published_at',
      method: "GET",
      success: (res : RequestSuccess<UTSJSONObject[]>) => {
        if (res.statusCode == 200 && Array.isArray(res.data)) {
          data.jest_result = true
        } else {
          data.jest_result = false
        }
      },
      fail: () => {
        data.jest_result = false
      }
    });
  }

  const jest_uts_module_invoked = () => {
    // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
    data.jest_result = false
    testInovkeRequest({
      success: (res : any) => {
        data.jest_result = true
      },
      fail: (err : any) => {
        data.jest_result = false
      }
    } as CommonOptions)
    // #endif
  }

  const jest_respone_json_string = () => {
    uni.request({
      url: "https://request.dcloud.net.cn/api/http/contentType/text/json",
      success: (res : RequestSuccess<any>) => {
        data.jest_result = typeof res.data == "object"
      },
      fail: (e : RequestFail) => {
        data.jest_result = false
      }
    })
  }

  const jest_respone_with_string_generics = () => {
    uni.request<string>({
      url: data.host + (methodMap['GET'] as string),
      method: "GET",
      timeout: null,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: (res : RequestSuccess<string>) => {
        data.jest_result = true;
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_respone_with_404_and_string_generics = () => {
    uni.request<string>({
      url: data.host + "/api/http/statusCode/404",
      method: "GET",
      timeout: null,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: (res : RequestSuccess<string>) => {
        data.jest_result = true;
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_issue_19687 = () => {
    uni.request({
      url: data.host + "/api/http/statusCode/404",
      method: "GET",
      success: (res) => {
        data.jest_result = typeof res.data === 'string';
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_test_issue21823_crash = () => {
    uni.request<string>({
      url: "http://www.kld20s.cn:88/Appfile/App/Tcrysta/kld/TcnAppUpgrade.json",
      method: "GET",
      timeout: null,
      complete: () => {
        data.jest_complete = true;
      }
    });
  }

  defineExpose({
    data,
    sendArrayBuffer,
    jest_request,
    jest_set_cookie,
    jest_set_cookie_expires,
    jest_delete_cookie,
    jest_cookie_request,
    jest_timeout_null,
    jest_get_with_data,
    jest_get_with_generics,
    jest_get_array,
    jest_uts_module_invoked,
    jest_respone_json_string,
    jest_respone_with_string_generics,
    jest_respone_with_404_and_string_generics,
    jest_issue_19687,
    jest_test_issue21823_crash,
    sendGzipRequest,
    checkQuery
  })
</script>

<style>
  .uni-textarea {
    padding: 9px;
    font-size: 14px;
  }
</style>

```

:::

## cookie管理
- `uni.request`、`uni.uploadFile`、`uni.downloadFile`等网络API之间支持共享cookie [Cookie共享介绍](network-summarize.md)。

## 流式响应@chrunk

AI大语言模型的服务器，向客户端持续的流式输出AI推理的结果文本。在客户端表现为打字机效果。

在uni-app x中，实现AI聊天的方式如下：
1. 使用uni.request，把客户端的prompt通过POST的方式发送到LLM服务器，同时设置响应体格式为arraybuffer
2. 客户端监听onChunkReceived事件，流式接收arraybuffer数据
3. 客户端通过TextEncoder解码出文本，一般是markdown格式。（注意小程序自身没有TextEncoder，需要再通过三方库解码）
4. 客户端流式渲染markdown格式

实现AI聊天的工作较为复杂，流式接收和渲染markdown很容易引发性能问题，处理原生的markdown解析工作量也很大。
所以DCloud提供了开源的uni-ai x，已完整实现原生的、全端的AI聊天，[详见](https://ext.dcloud.net.cn/plugin?name=uni-ai-x)

## JSON解析注意@json

由于uni-app x的强类型，导致联网获取JSON，拿到的不是js的object。

默认返回的是UTSJSONObject，UTSJSONObject是UTS提供的JSON数据对象，实现了js的object的JSON相关功能，但又有区别。**如果照搬js的object用法会失败**。

同时request也支持泛型，返回一个开发者自定义的type。

**请不熟悉强类型的开发者务必阅读教程：**[uni-app x的联网教程](../tutorial/request.md)

## 注意事项@tips

* uni-app x 5.0+，Android支持了h/3网络，加快了网络连接，但因为引入了cronet库，导致APK包体积增加了数M（具体取决于包含的CPU数量）。
* 拦截器在js中使用很普通，但原生语言由于缺少动态性，模拟实现拦截达不到js的全部效果。一般建议开发者直接使用uni.request，不封装拦截器。如仍想使用拦截器，见[插件市场](https://ext.dcloud.net.cn/search?q=%E7%BD%91%E7%BB%9C%E6%8B%A6%E6%88%AA%E5%99%A8&uni-appx=1)
* app-android平台 request 接口如需包装和传递泛型，需参考[泛型传递丢失注意](../plugin/uts-for-android.md#lost-generics)。成熟的拦截器插件均已自动处理这些问题。
* 如果使用泛型先创建RequestOptions实例，再传入uni.request()，此时请务必确保request要显式指定泛型，例：
```typescript
const options: RequestOptions<Person> = ...
uni.request<Person>(options)
```
* app-android、app-ios平台 uni.request()暂未支持Promise，返回值是RequestTask。
* app-ios平台的 RequestTask.onChunkReceived 基于原生 URLSession 实现，需要服务端必须采用「流式响应」方式——即使用 Transfer-Encoding: chunked，或以 Content-Type: text/event-stream 形式持续输出数据
* web平台 request接口目前不支持创建传入的泛型的实例
* web平台 request接口在 4.01版本之前返回数据是一个普通对象，4.01起调整为UTSJSONObject类型
* 在4.25版本iOS平台增加了Task原生对象自动销毁的逻辑，即网络请求完成后自动释放原生的Task对象，建议开发者在`complete`回调中置空Task对象，例

```typescript
complete: () => {
            this.task = null
          },
```

如不释放，在调用Task对象的方法将导致控制台报错：
`error: instance object does not exist: id:15`

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

