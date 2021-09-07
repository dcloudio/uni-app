## 背景

为有效治理App强制授权、过度索权、超范围收集个人信息等现象，落实《网络安全法》《消费者权益保护法》的要求，保障个人信息安全，2019年1月，中央网信办、工信部、公安部、市场监管总局等四部委发布了《关于开展App违法违规收集使用个人信息专项治理的公告》，在全国范围组织开展App违法违规收集使用个人信息专项治理，并陆续出台完善了《App违法违规收集使用个人信息行为认定方法》、《GB/T 35273-2020 信息安全技术 个人信息安全规范》等标准规范。

根据以上规范要求，各大应用市场都加强应用的检测，要求应用必须符合相关政策，否则应用将有被通报或下架的风险。

目前开发者最常碰到的以下问题：
- 违规收集个人信息
- 强制、频繁、过度索取权限

针对以上问题，请参考下文的解决方案，务必仔细阅读，注意各细节问题。

**`首先碰到此问题请更新到HbuilderX3.1.22及以上版本`**

## 如何解决"违规收集个人信息"问题
关于收集个人信息问题，首先应用必须配置“隐私与政策”协议框，其次必须在“隐私与政策”非常清楚、全面地说明（不要用可能收集、了解用户信息这种模糊不清晰的词语）收集用户个人信息的目的、方式和范围，用户个人信息包括但不限于mac地址、设备序列号、imei、imsi、软件安装列表、通讯录信息、短信信息等。

## **注意：根据政策要求隐私提示框显示之前不能调用涉及个人信息相关API（如设备标识），因此需要更新到HBuilderX3.1.22及以上版本重新提交云端打包**

### 第一步：配置隐私与政策提示框

必须确保应用存在《隐私政策》，在应用首次启动时弹出提示并取得用户同意。

## **注意：一定要配置使用`template`模式隐私与政策提示框，详情参考[https://ask.dcloud.net.cn/article/36937](https://ask.dcloud.net.cn/article/36937)**

### 第二步：在隐私政策中添加DCloud相关条款

请在《隐私政策》中必告知用户您的应用基于DCloud uni-app(5+ App/Wap2App)开发，添加如下参考条款：

`我们的产品基于DCloud uni-app(5+ App/Wap2App)开发，应用运行期间需要收集您的设备唯一识别码（IMEI/android ID/DEVICE_ID/IDFA、SIM 卡 IMSI 信息）以提供统计分析服务，并通过应用启动数据及异常错误日志分析改进性能和用户体验，为用户提供更好的服务。`

### 第三步：在隐私政策中添加其它三方SDK的条款

#### uni-app默认集成三方SDK

|SDK名称|SDK包名|SDK用途|可能获取的个人信息类型|调用的设备权限|官网链接|
|:----|:----|:----|:----|:----|:----
|阿里weexSDK|com.taobao|uni-app基础模块默认集成，用于渲染uniapp的nvue页面引擎|存储的个人文件|读取外置存储器、写入外置存储器|[http://doc.weex.io/zh](http://doc.weex.io/zh/)|
|fresco图片库|com.facebook.fresco|uni-app基础模块默认集成，用于nvue页面加载图片使用|存储的个人文件|读取外置存储器、写入外置存储器|[https://www.fresco-cn.org/](https://www.fresco-cn.org/)|

#### UniPush

UniPush是DCloud联合个推公司推出的集成型统一推送服务，使用了个推提供的SDK，因此需要在《隐私政策》中添加“个推消息推送SDK”相关说明。
建议《隐私政策》添加 “与授权合作伙伴共享”条款中，将 个推的用户隐私政策 加入其中，并向终端用户逐一明示您嵌入的SDK收集使用个人信息的目的、方式和范围。参考内容如下：

`消息推送服务供应商：由每日互动股份有限公司提供推送技术服务，我们可能会将您的设备平台、设备厂商、设备品牌、设备识别码等设备信息，应用列表信息、网络信息以及位置相关信息提供给每日互动股份有限公司，用于为您提供消息推送技术服务。我们在向您推送消息时，我们可能会授权每日互动股份有限公司进行链路调节，相互促活被关闭的SDK推送进程，保障您可以及时接收到我们向您推送的消息。详细内容请访问《个推用户隐私政策》（需将《个推用户隐私政策》超链至：http://docs.getui.com/privacy）`。

UniPush模块集成的三方SDK说明

|SDK名称|SDK包名|SDK用途|可能获取的个人信息类型|调用的设备权限|SDK隐私政策链接|
|:----|:----|:----|:----|:----|:----
|个推|com.getui.gtc 、com.igexin.sdk|UniPush推送|网络信息、IMEI、openid|获取网络状态、访问Wi-Fi状态、读取手机状态和身份|[https://docs.getui.com/privacy/](https://docs.getui.com/privacy/)

#### Statistic

HX3.1.14+ 友盟SDK已升级到9.3.8版本 适配合规问题

+ 当你集成了统计模块。您需要确保App有《隐私政策》，并且在用户首次启动App时就弹出《隐私政策》取得用户同意！！！
+ 您务必告知用户您选择友盟+SDK服务，请在《隐私政策》中增加如下参考条款：“我们的产品集成友盟+SDK，友盟+SDK需要收集您的设备Mac地址、唯一设备识别码（IMEI/android ID/IDFA/OPENUDID/GUID、SIM 卡 IMSI 信息）以提供统计分析服务，并通过地理位置校准报表数据准确性，提供基础反作弊能力。”
+ 您务必确保用户同意《隐私政策》之后。再调用相关api！！！！

Statistic模块集成的三方SDK说明

|SDK名称|SDK包名|SDK用途|可能获取的个人信息类型|调用的设备权限|SDK隐私政策链接|
|:----|:----|:----|:----|:----|:----
|友盟|com.uc.crashsdk、com.efs、com.umeng|统计|网络信息、IMEI、openid|获取网络状态、访问Wi-Fi状态、读取手机状态和身份|[https://developer.umeng.com/docs/...](https://developer.umeng.com/docs/119267/detail/182050)

#### OAuth

OAuth模块集成的三方SDK说明

|SDK名称|SDK包名|SDK用途|可能获取的信息类型|调用的设备权限|SDK隐私政策链接|
|:----|:----|:----|:----|:----|:----
|微信|com.tencent.mm|微信登录|存储的个人文件|读取外置存储器、写入外置存储器|[https://weixin.qq.com/cgi-bin/readtemplate?lang=zh_CN&t=weixin_agreement&s=privacy](https://weixin.qq.com/cgi-bin/readtemplate?lang=zh_CN&t=weixin_agreement&s=privacy)|
|新浪微博|com.sina.weibo|新浪微博登录|存储的个人文件、IMEI、openid|读取外置存储器、写入外置存储器|[https://weibo.com/signup/v5/privacy?spm=a1zaa.8161610.0.0.4f8776217Wu8R1](https://weibo.com/signup/v5/privacy?spm=a1zaa.8161610.0.0.4f8776217Wu8R1)|
|QQ登录|com.tencent.open|QQ登录|IMEI、openid、位置信息|访问粗略位置、访问精准定位、后台访问地理位置、读取外置存储器、写入外置存储器、读取手机状态和身份|[https://ti.qq.com/agreement/qqface.html?appname=mqq_2019](https://ti.qq.com/agreement/qqface.html?appname=mqq_2019)|
|个验一键登录|com.g.elogin、com.g.gysdk|一键登录|运营商信息|读取外置存储器、写入外置存储器|[https://docs.getui.com/privacy/](https://docs.getui.com/privacy/)|

#### Share
Share模块集成的三方SDK说明

|SDK名称|SDK包名|SDK用途|可能获取的信息类型|调用的设备权限|SDK隐私政策链接|
|:----|:----|:----|:----|:----|:----
|微信|com.tencent.mm|微信分享|存储的个人文件|读取外置存储器、写入外置存储器|[https://weixin.qq.com/cgi-bin/readtemplate?lang=zh_CN&t=weixin_agreement&s=privacy](https://weixin.qq.com/cgi-bin/readtemplate?lang=zh_CN&t=weixin_agreement&s=privacy)|
|新浪微博|com.sina.weibo|新浪微博分享|存储的个人文件、IMEI、openid|读取外置存储器、写入外置存储器|[https://weibo.com/signup/v5/privacy?spm=a1zaa.8161610.0.0.4f8776217Wu8R1](https://weibo.com/signup/v5/privacy?spm=a1zaa.8161610.0.0.4f8776217Wu8R1)|
|QQ|com.tencent.open|QQ分享|IMEI、openid、位置信息|访问粗略位置、访问精准定位、后台访问地理位置、读取外置存储器、写入外置存储器、读取手机状态和身份|[https://ti.qq.com/agreement/qqface.html?appname=mqq_2019](https://ti.qq.com/agreement/qqface.html?appname=mqq_2019)|

#### Payment

Payment模块集成的三方SDK说明

|SDK名称|SDK包名|SDK用途|可能获取的信息类型|调用的设备权限|SDK隐私政策链接|
|:----|:----|:----|:----|:----|:----
|微信|com.tencent.mm|微信支付|存储的个人文件|读取外置存储器、写入外置存储器|[https://weixin.qq.com/cgi-bin/readtemplate?lang=zh_CN&t=weixin_agreement&s=privacy](https://weixin.qq.com/cgi-bin/readtemplate?lang=zh_CN&t=weixin_agreement&s=privacy)|
|支付宝|com.alipay|支付宝支付|暂无|读取网络状态|[https://render.alipay.com/p/c/k2cx0tg8](https://render.alipay.com/p/c/k2cx0tg8)|

#### Speech

Speech模块集成的三方SDK说明

|SDK名称|SDK包名|SDK用途|可能获取的个人信息类型|调用的设备权限|SDK隐私政策链接|
|:----|:----|:----|:----|:----|:----
|百度语音识别|com.baidu.speech|语音识别|IMEI、openid|获取网络状态、访问Wi-Fi状态、读取手机状态和身份|[https://ai.baidu.com/ai-doc/REFERENCE/Qkdykq1r3](https://ai.baidu.com/ai-doc/REFERENCE/Qkdykq1r3)|
|讯飞语音|com.iflytek|语音识别|IMEI、openid|获取网络状态、访问Wi-Fi状态、读取手机状态和身份|[https://www.xfyun.cn/doc/policy/privacy.html](https://www.xfyun.cn/doc/policy/privacy.html)|

#### Map & Geolocation

Map & Geolocation模块集成的三方SDK说明

|SDK名称|SDK包名|SDK用途|可能获取的个人信息类型|调用的设备权限|SDK隐私政策链接|
|:----|:----|:----|:----|:----|:----
|高德|com.amap.api, com.loc, com.autonavi|地图&定位|IMEI、openid、位置信息|获取网络状态、访问Wi-Fi状态、位置信息、访问粗略位置、访问精准定位、读取手机状态和身份|[https://lbs.amap.com/agreement/compliance](https://lbs.amap.com/agreement/compliance)|
|百度|com.baidu|地图&定位|IMEI、openid、位置信息|获取网络状态、访问Wi-Fi状态、位置信息、访问粗略位置、访问精准定位、读取手机状态和身份|[https://map.baidu.com/zt/client/privacy/index.html](https://map.baidu.com/zt/client/privacy/index.html)|


#### uni-AD

uni-AD广告模块集成的三方SDK说明

|SDK名称|SDK包名|SDK用途|可能获取的个人信息类型|调用的设备权限|SDK隐私政策链接|
|:----|:----|:----|:----|:----|:----
|快手|com.kwad.sdk|广告|IMEI、openid、位置信息|获取网络状态、访问Wi-Fi状态、位置信息、读写外置存储器、读取手机状态和身份|[https://www.kuaishou.com/about/policy](https://www.kuaishou.com/about/policy)|
|优量汇|com.qq.e|广告|IMEI、openid、位置信息|获取网络状态、访问Wi-Fi状态、位置信息、读写外置存储器、读取手机状态和身份|[https://imgcache.qq.com/..privacy](https://imgcache.qq.com/gdt/cdn/adn/uniondoc/ylh_sdk_privacy_statement.html)|
|穿山甲|com.bytedance.sdk. openadsdk.adhost|广告|IMEI、openid、位置信息|获取网络状态、访问Wi-Fi状态、位置信息、读写外置存储器、读取手机状态和身份|[https://www.pangle.cn/privacy/partner](https://www.pangle.cn/privacy/partner)|
|Sigmob|com.sigmob.windad|广告|IMEI、openid、位置信息|获取网络状态、访问Wi-Fi状态、位置信息、读写外置存储器、读取手机状态和身份|[https://support.sigmob.com/#/隐私条款/](https://support.sigmob.com/#/%E9%9A%90%E7%A7%81%E6%9D%A1%E6%AC%BE/)|

#### 腾讯x5内核

|SDK名称|SDK包名|SDK用途|可能获取的个人信息类型|调用的设备权限|SDK隐私政策链接|
|:----|:----|:----|:----|:----|:----
|x5内核|com.tencent.tbs、com.tencent.smtt|x5内核渲染webview|IMEI、openid|读写外置存储器、读取手机状态和身份|[https://x5.tencent.com/docs/privacy.html](https://x5.tencent.com/docs/privacy.html)|


如果您的应用使用了依赖三方SDK的模块也需要将其合规条款添加到《隐私政策》中

#### uni原生插件

如果应用使用了uni原生插件，需要注意一下几点：

+ 使用插件时请查看插件详情页面中的 `隐私、权限声明` 。（插件使用什么sdk？获取了什么用户信息？都应由插件作者提供并填写在 `隐私、权限声明`中）
+ 将插件中用到的三方SDK信息添加到用户隐私协议中。例如集成了`百度定位`。就需要在隐私协议中说明集成了百度定位SDK。获取了xxx用户信息!用于xxx.
+ 如果发现插件有获取用户信息而插件详情页并没有提供`隐私、权限声明`，请与插件开发者或与我们反馈共同督促进行补充。

#### 其它

《隐私政策》必须非常清楚、全面地说明（不要用可能收集、了解用户信息这种模糊不清晰的词语）收集用户个人信息的目的、方式和范围。
如果应用使用“通讯录”、“短信”等相关功能，请根据应用业务场景进行描述。

## 常见问题

#### 如何解决"强制、频繁、过度索取权限"问题

对于权限问题，主要注意以下几个方面：

+ 应用中没有对应的服务或场景时，不要申请对应权限（例如没有使用到位置的服务时，不要申请定位权限）
+ 应用申请权限时，如果用户拒绝，不要直接退出APP无法使用。千万不要将应用启动时申请“读写手机存储”和“访问设备信息”权限设置为“always”，详情参考：[https://ask.dcloud.net.cn/article/36549](https://ask.dcloud.net.cn/article/36549)
+ 调用申请权限相关时，如果用户拒绝，非用户主动触发功能，不要重复调用API触发弹出申请权限窗口影响用户使用

在开发uni-app中还需要注意以下问题：
`不要在页面生命周期onShow中调用可能触发权限提示框的API，如` [uni.getLocation](https://uniapp.dcloud.io/api/location/location?id=getlocation)、[uni.chooseImage](https://uniapp.dcloud.io/api/media/image?id=chooseimage)`等`。


#### 如何解决“强制用户使用定向推送功能”问题

《隐私政策》中涉及到 “推荐”、“定制”、“个性化”等关键字改为“提供、展示、通知、发送、、、”等字眼，如果确实会涉及到个性化服务请在app的设置中增加个性化推送开关

#### 如何解决 用户点击《隐私政策》“同意”前，APP和SDK不要进行任何行为，包括SDK不能初始化，APP或SDK不能收集用户信息（包括但不限于IMEI、IMSI、设备MAC地址、软件列表、设备序列号、androidID）

+ 请先确保APK是基于3.1.22+版本生产的！
+ 确保已配置使用“template”模式隐私与政策提示框！
+ 可以通过小米手机 系统是MIUI12设备。安装你的应用。然后查看`应用详情`-->`应用行为记录`是否在点击“同意”前有获取权限信息等情况。
+ 如果你 app 是离线打包请务必关闭调试开关，修改项目dcloud_control.xml中syncDebug为false
+ 以上都符合条件那就检测app是否集成三方SDK或者uni原生插件请咨询相关SDK提供方平台是否涉及有关合规问题。请更新SDK或找uni原生插件更新相关SDK合规操作。
+ 都符合请重新提交平台检测。

**各大应用市场上架合规审查细节可能存在差异，如果开发者碰到相关问题请及时反馈，我们会及时汇总整理供大家参考**

#### 如何解决“用户不同意强制退出应用”问题

这个问题可能是隐私弹窗显示后，用户选择了“不同意”按钮后应用退出导致的。请按以下修改。

+ 配置二次弹窗提示second，参考[https://ask.dcloud.net.cn/article/36937](https://ask.dcloud.net.cn/article/36937)
+ 二次弹窗配置按钮信息为“同意并继续”和“退出应用”

#### 关于离线SDK需要注意

如果重写了DCloudApplication，需要注意在Application初始化的三方SDK的合规操作。防止导致启动隐私弹窗前获取了用户信息无法上架

#### app上架应用市场，检测集成了广告被拒的解决方案

+ 使用HX云打包时是否勾选了三方广告！如果勾选了请在隐私协议添加广告隐私说明。误勾选请去除并重新打包上架。
+ 离线打包检测是否集成了相关三方广告SDK！如果集成了请在隐私协议添加广告隐私说明。误集成请去除并重新编译apk上架。

#### 应用没有勾选三方广告模块但是上架华为市场检测反馈集成了广告被拒

uni-AD广告基础功能包含管理其它三方广告SDK的逻辑，会通过反射判断广告SDK是否存在，在没有勾选“360广告联盟”、“今日头条穿山甲广告联盟”、“腾讯优量汇广告联盟”、”快手广告联盟“时，也可能会被华为应用市场检测为包含奇虎360、广点通/优量汇、穿山甲等广告SDK，实际上apk中并没有包含相应的广告SDK。我们已经在优化广告基础功能实现方案来避免（请关注新版本更新日志），目前可以通过以下临时方案解决：

+ 请使用HX3.2.1+重新打包

#### 华为市场检测app在用户同意隐私政策前申请获取用户个人信息导致无法上架市场架

我们已经收到很多开发者反馈，其他应用市场都已上架成功。但华为检测时则上架被拒。猜测是华为应用市场提交新的apk检测后依然检测之前提交的apk，导致检测不通过的问题。
这种情况请联系华为应用市场技术支持，告诉他新版本已经修改了，让华为应用市场重新检测审核。

#### 看不懂文档不知道如何修改？

可开通付费技术服务 参考：[https://ask.dcloud.net.cn/article/13015](https://ask.dcloud.net.cn/article/13015)

## 相关参考
Android平台隐私与政策提示框配置方法：[https://ask.dcloud.net.cn/article/36937](https://ask.dcloud.net.cn/article/36937)
Android平台应用启动时读写手机存储、访问设备信息(如IMEI)等权限策略及提示信息：[https://ask.dcloud.net.cn/article/36549](https://ask.dcloud.net.cn/article/36549)
Android平台配置权限参考：[https://ask.dcloud.net.cn/article/36982](https://ask.dcloud.net.cn/article/36982)