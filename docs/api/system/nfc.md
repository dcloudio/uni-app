#### NFC

仅微信小程序平台、App平台支持，各平台开发方式暂未统一，使用时需注意用[条件编译](https://uniapp.dcloud.io/platform)调用不同平台的代码。

- 微信小程序平台实现参考：[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/wx.startHCE.html)

- App 平台：
  1. 通过Native.js实现，**安卓：**[NFC数据读取](https://ask.dcloud.net.cn/question/6726)
  2. 使用原生插件，详见[插件市场](https://ext.dcloud.net.cn/search?q=nfc)
