#### live-pusher

实时音视频录制，也称直播推流。

各平台开发方式暂未统一，使用时需注意用[条件编译](https://uniapp.dcloud.io/platform)调用不同平台的代码。

- 微信小程序：[规范文档](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html)
- App平台：[业务指南](https://ask.dcloud.net.cn/article/13416)、[规范文档](http://www.html5plus.org/doc/zh_cn/video.html#plus.video.LivePusher)

**注意**

* live-pusher 是原生组件，层级高于前端组件，请勿在 scroll-view、swiper、picker-view、movable-view 中使用
* 解决 live-pusher 层级过高无法覆盖，[参考](/component/native-component)