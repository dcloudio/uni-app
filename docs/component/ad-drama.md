<!-- ## ad-drama -->

::: sourceCode
## ad-drama
:::

uni-app x 短剧插件：uni.createDramaAd API 与 ad-drama 组件（独立运行，不依赖其他插件）

ad-drama 组件是短剧广告的组件模式接入方式：组件挂载即自动加载短剧模块，适合快速接入短剧广告。

与 API 模式（[uni.createDramaAd](../api/create-drama-ad.md)）的区别：组件模式直接使用渠道提供的短剧首页界面（含推荐、榜单等内容分发），无需自行搭建短剧列表页；API 模式则自行搭建列表页，可深度定制样式与业务。

- 示例Demo介绍：[详见](https://gitcode.com/dcloud/uni-ad-drama)
- uni-ad的业务介绍：[详见](https://uniapp.dcloud.net.cn/uni-ad/)

**开通配置广告**

[开通广告步骤详情](https://uniapp.dcloud.net.cn/uni-ad/ad-open.html)

**Tips**
- 使用短剧组件需要先开通穿山甲广告。开通问题请咨询：[uni-ad交流群](https://im.dcloud.net.cn/#/?joinGroup=65d85fc09847e92db03ff81a)。
- 标准基座不包含短剧运行时，需制作自定义基座后运行，否则报错 `-5020`。

### 配置文件

在穿山甲后台 内容输出->接入管理 找到需要接入内容SDK的应用，点击"下载SDK参数配置"，然后将SDK配置文件（例如 sdk_setting_file.json）拷贝到项目的 assets 文件夹下。

![](https://lf3-plat.pglstatp-toutiao.com/obj/union-platform/a30bc3001dff716fcf6876da15151ecf.png)

文件下载之后重命名为：`gm_SDK_Setting.json`，然后将文件放到项目根目录的`nativeResources->android->assets`目录下。
完整配置说明与错误码见 [uni.createDramaAd](../api/create-drama-ad.md)。




### 兼容性 <Help />
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.32 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| adpid | string | "" | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 短剧广告位id，在uniAD官网申请广告位 |
| free | number | 1 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 初始可免费观看的剧集数 |
| lock | number | 1 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 单次激励视频可解锁的剧集数 |
| url-callback | **DramaUrlCallback** \| null | null | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 服务端回调透传参数（userId/extra），激励发放时透传服务器校验 |

#### url-callback 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| userId | string | 否 |
| extra | string | 否 |
@
| @load | (event: [UniNativeViewEvent](/component/common.md#uninativeviewevent)) => void |   | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 短剧加载成功的回调 |
| @error | (event:[UniDramaErrorEvent](#unidramaerrorevent)) => void |   | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 短剧加载失败的回调 |
| @click | (event: [UniNativeViewEvent](/component/common.md#uninativeviewevent)) => void |   | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 点击短剧的回调 |
| @close | (event: [UniNativeViewEvent](/component/common.md#uninativeviewevent)) => void |   | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 短剧关闭的回调 |

<!-- UTSCOMJSON.ad-drama.fileFormates -->


### 事件
#### UniDramaErrorEvent


##### UniDramaErrorEvent 的属性值
| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| detail | **IUniDramaError** | 是 | 短剧统一错误对象（对齐 IUniError 规范）：errCode 为短剧错误码，errMsg 为错误描述，cause 为渠道错误明细（可能为 null）。 |
| bubbles | boolean | 是 | 是否冒泡 |
| cancelable | boolean | 是 | 是否可以取消 |
| type | string | 是 | 事件类型 |
| target | [UniElement](/api/dom/unielement.md) | 否 | 触发事件的组件 |
| currentTarget | [UniElement](/api/dom/unielement.md) | 否 | 当前组件 |
| timeStamp | number | 是 | 事件发生时的时间戳 |

#### detail 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | string | 是 | 错误码<br/>-5001 adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid<br/>-5002 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载<br/>-5010 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用<br/>-5011 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例<br/>-5012 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询<br/>-5015 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题<br/>-5016 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置<br/>-5017 短剧页面内部初始化异常——重试，仍失败请反馈问题<br/>-5018 宿主页面内容未就绪——重试<br/>-5020 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道）<br/>-5500 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试<br/><br/>广告渠道透传错误（短剧解锁的激励视频由广告 SDK 内部拉起，其错误经 onError 上报）：<br/>-5003 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过<br/>-5005 广告加载失败：网络异常或当前无广告填充——稍后重试<br/>-5006 广告已展示过：需重新加载后才能再次展示<br/>-5007 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致<br/>-5008 广告不可用或已过期：广告素材失效——重新发起请求<br/>-5009 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型<br/>-5013 广告播放失败：素材下载或播放异常——重新加载<br/><br/>渠道错误时 cause 字段携带明细（广告联盟标识、渠道广告位、渠道错误码与描述），可据此进一步定位。<br/>另继承 IUniError 的通用字段：errMsg（错误信息）、errSubject（错误来源标识）。 |
| errSubject | string | 是 | 统一错误主题（模块）名称 |
| data | any | 否 | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 |  |

##### errCode 的属性描述

| 合法值 | 描述 |
| :- | :- |
| -5001 | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | 宿主页面内容未就绪——重试 |
| -5020 | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |


##### UniDramaErrorEvent 的方法
| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| stopPropagation | () => void | 是 | 阻止当前事件的进一步传播 |
| preventDefault | () => void | 是 | 阻止当前事件的默认行为 |


<!-- UTSCOMJSON.ad-drama.component_type -->

### 子组件 @children-tags
不可以嵌套组件

## Tips


+ 短剧广告仅支持 Android 平台。




### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.ad.ad-drama)
- [插件市场](https://ext.dcloud.net.cn/plugin?id=30115)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=ad-drama&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=ad-drama&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=ad-drama&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=ad-drama&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=ad-drama&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=ad-drama)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=ad-drama&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
