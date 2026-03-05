## uni.canvasToTempFilePath(options, componentInstance) @canvastotempfilepath

把当前画布指定区域的内容导出生成指定大小的图片


### canvasToTempFilePath 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


* 截图或海报需求，app平台view直接提供截图API，[takesnapshot](../dom/unielement.html#takesnapshot)。

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CanvasToTempFilePathOptions** | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  |
| componentInstance | any | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 画布x轴起点（默认0） |
| y | number | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 画布y轴起点（默认0） |
| width | number | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 画布宽度（默认为canvas宽度-x） |
| height | number | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 画布高度（默认为canvas高度-y） |
| destWidth | number | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 输出图片宽度（默认为 width * 屏幕像素密度） |
| destHeight | number | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 输出图片高度（默认为 height * 屏幕像素密度） |
| canvasId | string | 是 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 画布标识，传入 \<canvas/> 的 canvas-id |
| fileType | string | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 目标文件的类型，默认为 'png' |
| quality | number | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理 |
| success | (result: [CanvasToTempFilePathSuccess](#canvastotempfilepathsuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (result: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） |
| canvas | any | 否 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x |  |

#### CanvasToTempFilePathSuccess 的属性值 @canvastotempfilepathsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | - | Web: -; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 导出生成的图片路径 |
| errMsg | string | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.canvas.canvasToTempFilePath)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/canvas/canvasToTempFilePath.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=canvasToTempFilePath&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=canvasToTempFilePath&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=canvasToTempFilePath&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=canvasToTempFilePath&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=canvasToTempFilePath)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=canvasToTempFilePath&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

