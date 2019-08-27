#### live-pusher

实时音视频录制，也称直播推流。

目前只有App和微信小程序支持。

- 微信小程序：[规范文档](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html)
- App平台：nvue文件下也支持live-pusher组件，API与微信相同。如果是vue文件，则需要单独编写条件编译代码，使用plus.video.LivePusher，[业务指南](https://ask.dcloud.net.cn/article/13416)、[规范文档](http://www.html5plus.org/doc/zh_cn/video.html#plus.video.LivePusher)


**注意**

* live-pusher 是原生组件，在小程序端层级高于前端组件，请勿在 scroll-view、swiper、picker-view、movable-view 中使用，需使用cover-view覆盖。在App端的nvue文件中，live-pusher没有这类限制。
* App平台：使用 `<live-pusher/>` 组件，打包 App 时必须勾选 manifest.json->App 模块权限配置->LivePusher(直播推流) 模块。
