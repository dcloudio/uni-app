# 其他组件

## App平台

uni-app x在App端还有一批组件未与uni-app js引擎版拉齐。有的在排期中，有的提供了替代方案，有的需开发者自行开发插件。

- ad：正在补充
- movable-view：没有ui层和逻辑层的通信阻塞，开发者可自己写代码拖动view。hello uni-app x中有[示例代码](https://gitcode.com/dcloud/hello-uni-app-x/blob/dev/pages/component/general-event/touch-event.uvue)
- picker：可改用[picker-view](picker-view.md)。在主流的uni-app x三方ui库中，基本都有封装好的弹出组件。uni ui的[uni-data-picker](https://ext.dcloud.net.cn/plugin?id=3796)
- canvas：App平台目前没有完整的canvas组件，但
	* 每个view，都提供了[draw API](../dom/drawablecontext.md)，可以高性能的画各种形状、写字。这组API与web的canvas api接近但不同。
	* 截图或海报需求，无需像webview那样通过canvas中转，app平台view直接提供截图API，[takesnapshot](../dom/unielement.md#takesnapshot)。
	* 使用web-view中的canvas也是一种方案，uvue页面里的web-view组件可以和uvue页面里的uts代码双向通信。
	* 二维码展示需求：[见插件市场](https://ext.dcloud.net.cn/search?q=%E4%BA%8C%E7%BB%B4%E7%A0%81&uni-appx=1)
	* 图表需求：[插件市场搜echart](https://ext.dcloud.net.cn/search?q=chart&orderBy=Relevance&uni-appx=1)、[插件市场搜F2](https://ext.dcloud.net.cn/search?q=f2&orderBy=Relevance&uni-appx=1)
	* 手写签名：[见插件市场](https://ext.dcloud.net.cn/search?q=%E7%AD%BE%E5%90%8D&orderBy=Relevance&uni-appx=1)
	* 后期App平台中也会补充正式的canvas组件
- waterfall/grid-view：会补充
- editor：使用web-view来加载
- map：
	* [见插件市场](https://ext.dcloud.net.cn/search?q=%E5%9C%B0%E5%9B%BE&orderBy=Relevance&uni-appx=1)
	* 或使用web-view中的地图
- live-pusher：直播推流 [见插件市场](https://ext.dcloud.net.cn/search?q=%E7%9B%B4%E6%92%AD&orderBy=Relevance&uni-appx=1)
- label：用view加事件来替代

## Web平台

uni-app x的web版从uni-app的js引擎版迁移而来，理论上所有uni-app js引擎版的组件在uni-app x的web版中都可以使用。

web平台也可以使用浏览器的内置标签，但不是写在template里，而是通过`document.createElement`的方式创建并append到view中。示例代码[详见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/browser-element/browser-element.uvue)
