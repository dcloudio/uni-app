::: sourceCode
## uni.loadUasm(module) @loaduasm
:::

异步加载 UASM 模块

module 必须是编译时可确定的 uni_modules 插件路径，模块类型由编译器推导。


### loadUasm 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 5.31 | 5.31 | 5.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.31 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| module | string | 是 | UASM 插件路径 | 




### 返回值 

| 类型 | 描述 |
| :- | :- |
| Promise\<any> | UASM 模块实例 |
 


<!-- UTSAPIJSON.loadUasm.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.uasm.loadUasm)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=loadUasm&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=loadUasm&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=loadUasm&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=loadUasm&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=loadUasm&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=loadUasm)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=loadUasm&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.loadUasm.example -->


::: sourceCode
## uni.loadUasmSync(module) @loaduasmsync
:::

同步加载 UASM 模块

module 必须是编译时可确定的 uni_modules 插件路径，模块类型由编译器推导。


### loadUasmSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.31 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| module | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | UASM 插件路径 | 




### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| any | UASM 模块实例 | 否 |
 


<!-- UTSAPIJSON.loadUasmSync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.uasm.loadUasmSync)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=loadUasmSync&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=loadUasmSync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=loadUasmSync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=loadUasmSync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=loadUasmSync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=loadUasmSync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=loadUasmSync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.loadUasmSync.example -->

<!-- UTSAPIJSON.uasm.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

