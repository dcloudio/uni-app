#### 广告

广告API

广告能力在不同小程序端实现不同，使用时需注意用[条件编译](https://uniapp.dcloud.io/platform)调用不同平台的代码。

- App平台：无需编码，在打包App时可直接勾选广告位，[详见](https://dcloud.io/dad.html)
- 微信小程序：[规范文档](https://developers.weixin.qq.com/miniprogram/dev/api/wx.createRewardedVideoAd.html)
- 百度小程序：有组件但无API
- 支付宝小程序：不支持此能力
- 头条小程序：仅小游戏可用，小程序不可用，不适用于uni-app
- QQ小程序：[规范文档](https://q.qq.com/wiki/develop/miniprogram/API/ad/qq.createRewardedVideoAd.html)