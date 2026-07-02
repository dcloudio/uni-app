# 其他组件

## App平台

uni-app x在App端还有一批组件未与uni-app js引擎版拉齐。有的在排期中，有的提供了替代方案，有的需开发者自行开发插件。

- movable-view：没有ui层和逻辑层的通信阻塞，开发者可自己写代码拖动view。hello uni-app x中有[示例代码](https://gitcode.com/dcloud/hello-uni-app-x/blob/dev/pages/component/general-event/touch-event.uvue)

## Web平台

uni-app x的web版从uni-app的js引擎版迁移而来，理论上所有uni-app js引擎版的组件在uni-app x的web版中都可以使用。

web平台也可以使用浏览器的内置标签，但不是写在template里，而是通过`document.createElement`的方式创建并append到view中。示例代码[详见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/browser-built-in-elements/browser-built-in-elements.uvue)
