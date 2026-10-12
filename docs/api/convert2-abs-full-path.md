::: sourceCode
## uni.convert2AbsFullPath(inputPath) @convert2absfullpath
:::

将文件的项目相对地址转换为 运行期对应的绝对地址

### convert2AbsFullPath 兼容性 <Help /> 
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| 5.32 | 5.32 | 5.32 |


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| inputPath | string | 是 | 




### 返回值 

| 类型 |
| :- |
| string |
 


<!-- UTSAPIJSON.convert2AbsFullPath.example -->

以下为转换结果示例，实际路径因平台、系统版本不同而有所差异

```js
uni.convert2AbsFullPath('/static/logo.png')
```

返回值为绝对路径，各平台结果如下：

| 平台 | 返回值 |
| --- | --- |
| Android | `/data/data/<package-name>/apps/<appid>/www/static/logo.png` |
| iOS | `/var/mobile/Containers/.../Documents/uni-app-x/apps/<appid>/www/static/logo.png` |
| Harmony | `/data/storage/el1/bundle/.../resfile/uni-app-x/apps/<appid>/www/static/logo.png` |


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.file.convert2AbsFullPath)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=convert2AbsFullPath&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=convert2AbsFullPath&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=convert2AbsFullPath&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=convert2AbsFullPath&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=convert2AbsFullPath&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=convert2AbsFullPath)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=convert2AbsFullPath&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

