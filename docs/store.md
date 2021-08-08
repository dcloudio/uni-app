## 国内应用市场上架
最近为有效治理App强制授权、过度索权、超范围收集个人信息等现象，落实《网络安全法》《消费者权益保护法》的要求，保障个人信息安全，各大应用市场都加强应用审核的检测，要求应用必须符合相关政策，否则应用将有被通报或下架的风险。

**应用市场上架审核合规指南：**[https://ask.dcloud.net.cn/article/39073](https://ask.dcloud.net.cn/article/39073)



## Google Play上架

首先App提交云端打包时请务必勾选“GooglePlay”渠道：

![](https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/uni-app/doc/channel-google.png)

Google Play上架审核要求比较严格，需要注意以下问题：
- 应用中不能存在下载/安装apk的行为，不要勾选android.permission.INSTALL_PACKAGES、android.permission.REQUEST_INSTALL_PACKAGES权限‘
- 应用中的任何功能都不能引导用户下载其它应用，以下模块不能使用：
  + QQ登录、QQ分享：手机没有安装QQ应用时，会引导用户安装
  + uni-AD 增强广告SDK：广告中存在下载安装其它三方应用的行为。**uni-AD 广告基础功能不受影响**
- 应用中不能使用动态加载代码，因此无法配置使用X5内核，详情：[https://ask.dcloud.net.cn/article/36806](https://ask.dcloud.net.cn/article/36806)

**应用必须适配Android11，设置targetSdkVersion大于等于30：**[https://ask.dcloud.net.cn/article/193](https://ask.dcloud.net.cn/article/193#targetsdkversion)

**上传安装包使用Android App Bundle（AAB）格式：**[https://ask.dcloud.net.cn/article/39052](https://ask.dcloud.net.cn/article/39052)



## App Store上架

>再次说明：uni-app并不是简单的使用Webview套壳，Webview仅负责vue页面的UI渲染，nvue页面则完全由原生UI渲染，业务逻辑代码是运行在独立的JS引擎（JSCore）中，并且封装了很多JS API调用原生能力（OC代码实现），完全可以上架苹果应用市场。

苹果App Store上架审核规范比较细，提交审核前建议仔细阅读苹果官方[App Store审核指南](https://developer.apple.com/cn/app-store/review/guidelines/)。

需要注意以下问题：
- 应用功能不能过于简单
- 应用功能不能跟已经上架的应用相似，就是不能做马甲包

**使用广告标识（IDFA）相关说明：**[https://ask.dcloud.net.cn/article/36107](https://ask.dcloud.net.cn/article/36107)

**UIWebview API 已废弃：**[https://ask.dcloud.net.cn/article/36348](https://ask.dcloud.net.cn/article/36348)

