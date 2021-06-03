## ad-content-page 广告

### 简介

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√(3.1.17)|x|x|x|x|x|x|x|x|


**开通配置广告**

开通广告步骤：
1. 开通广告
需在广告平台后台操作：
    * App平台：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
    * 小程序平台：在各自的小程序管理后台操作。
2. 申请广告位id
在各位后台申请广告位id
3. 在页面合适位置编写代码，放置ad组件，配上广告位adpid
4. App端打包后生效，打包时必须选择要集成的广告SDK（穿山甲、广点通、360联盟、快手）。

**属性说明**

|属性名|类型|默认值|说明|平台差异|
|:-|:-|:-|:-|:-|
|adpid|String||uni-AD App广告位id，在[uni-AD官网](https://uniad.dcloud.net.cn/)申请广告位|仅Android支持|
|@load|EventHandle||广告加载成功的回调||
|@error|EventHandle||广告加载失败的回调||

