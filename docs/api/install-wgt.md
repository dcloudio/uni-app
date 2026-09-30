::: sourceCode
## uni.installWgt(options) @installwgt
:::

安装wgt包   

### installWgt 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android(VDOM) | Android(Vapor) | iOS 系统版本 | iOS(VDOM) | iOS(Vapor) | HarmonyOS 系统版本 | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.31 | 15.0 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **InstallWgtOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 应用资源文件（wgt）路径 |
| ignoreVersion | boolean | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 忽略版本号校验，设置为true则不校验wgt版本号，默认值为false |
| success | (result: InstallWgtSuccess) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 应用资源文件安装成功回调 |
| fail | (result: [InstallWgtFail](#installwgtfail-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 应用资源文件安装失败回调 |
| complete | (result: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 应用资源文件安装完成回调 | 

#### InstallWgtFail 的属性值 @installwgtfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | InstallWgtErrorCode | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |  |






<!-- UTSAPIJSON.installWgt.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.base.installWgt)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=installWgt&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=installWgt&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=installWgt&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=installWgt&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=installWgt&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=installWgt)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=installWgt&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.installWgt.example -->

### Tips
- 通过wgt包在线升级应用操作流程：
  + **更新版本号：** 修改应用版本名称（versionName），要求大于线上已发布的版本名称
  + **生成wgt升级包：** 在 HBuilder 中点击菜单 “发行” -> “App-制作wgt包” 导出wgt包  
  + **检测版本更新：** 在应用 `App.uvue` 的 [onLaunch](../collocation/app.md#onlaunch) 中通过 [uni.getAppBaseInfo.appWgtVersion](./get-app-base-info.md) 获取应用资源版本号，并调用 [uni.request](./request.md) 发送到服务器进行升级检测
  + **下载wgt包：** 检测到新版本后，从服务器返回的下载地址通过 [uni.downloadFile](./download-file.md) 下载到本地
  + **安装与重启：** 调用 `uni.installWgt` 安装wgt包，在安装成功的回调中调用 [getApp().restart](./get-app.md#restart) 重启应用使更新生效
- **推荐方案：** 建议直接使用 [升级中心](https://doc.dcloud.net.cn/uniCloud/upgrade-center.html) 进行 wgt 发布与更新，可大幅降低开发和测试成本。

### 注意事项  
- **真机运行环境：** 调用 `uni.installWgt` 成功后会直接替换当前运行资源。为了避免出现资源不同步，必须在安装成功的回调中调用 `getApp().restart()` 重启应用或手动关闭重新打开应用。
- **正式包环境：** 调用 `uni.installWgt` 成功后不会直接替换当前应用资源，新资源仅在重启应用或主动调用 `getApp().restart()` 后生效，不会影响当前正在运行的版本。
- **测试建议：** wgt包升级测试务必在打包后的正式包环境中进行，不建议仅凭真机运行环境测试。
- **uni-app x 兼容性：** uni-app x项目仅蒸汽（vapor）模式在App平台支持wgt包升级（鸿蒙平台暂不支持），VDOM模式不支持。

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

