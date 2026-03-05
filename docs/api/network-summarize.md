## 网络概述

uni-app x中有较多网络API，包括request请求、上传下载、socket等。

uni-app x也有很多组件带有联网功能，比如image、video、web-view都支持加载联网资源。

## Cookie

### Cookie概念

HTTP cookie，简称cookie，是浏览网站时由网络服务器创建并由网页浏览器存放在用户计算机或其他设备的小文本文件。

Cookie使Web服务器能在用户的设备存储状态信息（如添加到在线商店购物车中的商品）或跟踪用户的浏览活动（如点击特定按钮、登录或记录历史）

#### 语法

```
Cookie: name=value
Cookie: name=value; name2=value2; name3=value3
```

#### Cookie共享

Cookie共享是指在应用中，请求同一域名地址，Http请求头会携带相同的Cookie。这是因为Cookie是由应用存储在用户设备上的，因此所有支持Cookie共享的API和组件都可以访问到这些Cookie。

uni-app x 实现Cookie共享的API和组件的情况如下

- [uni.request](https://doc.dcloud.net.cn/uni-app-x/api/request.html) ：用于发起网络请求，会自动携带Cookie。
- [uni.uploadFile](https://doc.dcloud.net.cn/uni-app-x/api/upload-file.html) ：用于上传文件，会自动携带Cookie。
- [uni.downloadFile](https://doc.dcloud.net.cn/uni-app-x/api/download-file.html) ：用于下载文件，会自动携带Cookie。
- [image组件](https://doc.dcloud.net.cn/uni-app-x/component/image.html) ：显示网络图片时，会自动携带Cookie（iOS端未实现Cookie共享）。
- [video组件](https://doc.dcloud.net.cn/uni-app-x/component/video.html) ：用于播放网络视频，会自动携带Cookie（iOS端未实现Cookie共享）。
- [web-view组件](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) ：用于显示网页，会自动携带Cookie（iOS端未实现Cookie共享）。
- [websocket](https://doc.dcloud.net.cn/uni-app-x/api/websocket.html)：未实现Cookie共享。

已实现Cookie共享的组件和API，开发者无须关心Cookie的存储、删除、过期等问题，uni-app x框架已自动处理。

#### Cookie共享使用场景

客户端请求接口，服务端下发Cookie，此时使用web-view组件，在web-view组件里访问同域名地址，也会携带客户端请求时设置的Cookie。
