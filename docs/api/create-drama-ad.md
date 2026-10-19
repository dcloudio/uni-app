::: sourceCode
## uni.createDramaAd(options) @createdramaad
:::

创建短剧广告实例：创建即自动加载短剧模块（自动加载模式），加载结果经 onLoad / onError 上报

> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-drama](https://ext.dcloud.net.cn/plugin?id=30115)

短剧广告：通过短剧内容生态 `穿山甲内容联盟(短剧)` 变现的高价值广告形式。将短剧内容（列表）嵌入自己的应用中，用户免费观看指定集数后，需观看激励视频解锁后续剧集，从而实现广告变现。

通过 uni.createDramaAd 可实现 API 模式接入方式： 调用查询接口获取短剧数据，自定义实现短剧列表界面，用户点击后通过 `open` 打开短剧播放界面。如需快速接入，请使用（[ad-drama](../component/ad-drama.md)）组件模式接入。

- uni-ad的业务介绍：[详见](https://uniapp.dcloud.net.cn/uni-ad/)
- 示例Demo：[详见](https://gitcode.com/dcloud/uni-ad-drama)

**开通配置广告**

[开通广告步骤详情](https://uniapp.dcloud.net.cn/uni-ad/ad-open.html)

**Tips**
- HBuilder 5.32 版本 app-android 平台支持。
- 使用短剧组件需要先开通穿山甲广告，相关问题请咨询：[uni-ad交流群](https://im.dcloud.net.cn/#/?joinGroup=65d85fc09847e92db03ff81a)。
- 标准基座不包含短剧功能，需勾选广告联盟中的“穿山甲内容联盟(短剧)”，打包自定义基座后运行，否则报错 `-5020` 错误。

### 配置文件

短剧功能使用的“穿山甲内容联盟(短剧)”要求配置 `SDK参数配置` 文件，在穿山甲后台 "内容输出" -> "接入管理" 找到需要接入内容SDK的应用，点击"下载SDK参数配置"：

![](https://lf3-plat.pglstatp-toutiao.com/obj/union-platform/a30bc3001dff716fcf6876da15151ecf.png)

配置文件下载之后重命名为 `gm_SDK_Setting.json`，然后将文件放到到 uni-app x 项目的 `nativeResources\android\assets` 文件夹中。

### 服务器回调

短剧的变现逻辑是：用户免费看完前面几集后，需要看一段激励视频才能解锁后续剧集。这里有一个关键的安全问题——"用户到底有没有真的看完广告"，这件事不能听客户端的。

客户端播放结束时的结果（如 `isEnded`）只是本地状态，很容易被黑产通过反编译、抓包伪造请求来冒充。如果直接按客户端上报来解锁，攻击者可以一次广告都不看就骗取解锁，而广告平台那边并没有真正产生广告收入，最后是开发者既赔了内容又拿不到钱。

所以，解锁集数的发放必须由服务器回调来完成：用户完整看完激励视频后，广告平台会通知 uni-ad，uni-ad 再通过 uniCloud 把"这次广告确实看完了"的可信消息发送到开发者自己的业务服务器，由业务服务器来发放解锁。这条链路黑产无法伪造，是业内通行的安全方案（支付回调同理），没有配置服务器回调的解锁是不安全的。

接入步骤：

1. 在 uni-ad 后台为短剧广告位开启激励视频服务器回调，并选择业务所在位置：业务在 uniCloud 则选云函数/云对象；业务在传统服务器则配置回调 URL。
2. 调用 `open` 时传入 `urlCallback`，用于把业务身份带给服务器：
   - `userId`：用户唯一标识，服务器据此知道该给谁解锁；
   - `extra`：业务自定义参数，例如本次要解锁的剧集 ID、订单号等，回调时原样回传。
3. 业务服务器收到回调后，按 `userId` / `extra` 校验并解锁对应集数。客户端不要自行解锁，只根据服务器结果刷新界面。

服务器回调的详细机制、回调参数、签名校验和完整配置流程，详见 [激励视频广告服务器回调](https://uniapp.dcloud.net.cn/uni-ad/ad-rewarded-video.html#callback)。

### createDramaAd 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.32 | √ | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **CreateDramaAdOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 用于创建短剧广告（DramaAd）实例时传入的配置项类型，目前仅包含必填的 adpid |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| adpid | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧广告位标识<br/>必填；在 uni-ad 平台申请短剧广告位获取的 adpid。<br/>adpid 为空、无效或广告位未开通时，创建后经 onError 上报 -5001 / -5002 / -5003。 | 




### 返回值 

| 类型 | 描述 |
| :- | :- |
| [DramaAd](#dramaad-values) | 短剧广告实例：自建聚合页场景的列表/搜索/详情能力入口。<br/>创建实例（uni.createDramaAd）即自动加载短剧模块（自动加载模式），<br/>加载结果经 onLoad / onError 上报。 |

#### DramaAd 的方法 @dramaad-values 

#### getList(options : DramaListOptions) : void @getlist
getList
获取短剧列表，用于自建聚合页渲染；分页参数 page 从 1 开始，结果经 options.success / options.fail 回调返回
##### getList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 列表查询参数（getList / getRecommendedList / getCollectionList / getHistoryList 通用） page 从 1 开始、pageSize 默认 20；查询结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 页码，从 1 开始；不传默认 1 |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 每页短剧数量；不传默认 20 |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 列表排序方式；不传默认 "default"。<br/>仅 getList 生效：推荐列表（getRecommendedList）、收藏列表（getCollectionList）、观看历史（getHistoryList）忽略该参数 |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### getRecommendedList(options : DramaListOptions) : void @getrecommendedlist
getRecommendedList
分页获取推荐短剧列表，结果经 options.success / options.fail 回调返回
##### getRecommendedList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 列表查询参数（getList / getRecommendedList / getCollectionList / getHistoryList 通用） page 从 1 开始、pageSize 默认 20；查询结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 页码，从 1 开始；不传默认 1 |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 每页短剧数量；不传默认 20 |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 列表排序方式；不传默认 "default"。<br/>仅 getList 生效：推荐列表（getRecommendedList）、收藏列表（getCollectionList）、观看历史（getHistoryList）忽略该参数 |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### getCollectionList(options : DramaListOptions) : void @getcollectionlist
getCollectionList
分页获取用户收藏的短剧列表，结果经 options.success / options.fail 回调返回
##### getCollectionList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 列表查询参数（getList / getRecommendedList / getCollectionList / getHistoryList 通用） page 从 1 开始、pageSize 默认 20；查询结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 页码，从 1 开始；不传默认 1 |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 每页短剧数量；不传默认 20 |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 列表排序方式；不传默认 "default"。<br/>仅 getList 生效：推荐列表（getRecommendedList）、收藏列表（getCollectionList）、观看历史（getHistoryList）忽略该参数 |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### getHistoryList(options : DramaListOptions) : void @gethistorylist
getHistoryList
分页获取用户观看记录的短剧列表，结果经 options.success / options.fail 回调返回
##### getHistoryList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 列表查询参数（getList / getRecommendedList / getCollectionList / getHistoryList 通用） page 从 1 开始、pageSize 默认 20；查询结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 页码，从 1 开始；不传默认 1 |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 每页短剧数量；不传默认 20 |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 列表排序方式；不传默认 "default"。<br/>仅 getList 生效：推荐列表（getRecommendedList）、收藏列表（getCollectionList）、观看历史（getHistoryList）忽略该参数 |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### search(options : DramaSearchOptions) : void @search
search
根据关键词搜索短剧，isFuzzy 为 true 时模糊匹配（默认 true），结果经 options.success / options.fail 回调返回
##### search 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaSearchOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | search 搜索参数 searchWord 必填；isFuzzy 默认 true（模糊匹配）；搜索结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| searchWord | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 搜索关键词，必填 |
| isFuzzy | boolean | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 是否模糊匹配；不传默认 true（模糊匹配） |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 页码，从 1 开始；不传默认 1 |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 每页短剧数量；不传默认 20 |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 搜索成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 搜索失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 搜索结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### getInfo(options : DramaInfoOptions) : void @getinfo
getInfo
获取指定短剧信息，参数 dramaId 与 dramaIds 二选一，结果经 options.success / options.fail 回调返回
##### getInfo 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaInfoOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | getInfo 查询参数 dramaId / dramaIds 二选一，同时传入时优先 dramaIds；查询结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 单个短剧 ID；与 dramaIds 二选一，两者同时传入时优先使用 dramaIds |
| dramaIds | Array&lt;number&gt; | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 批量短剧 ID 列表；与 dramaId 二选一，两者同时传入时优先使用 dramaIds |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页短剧列表 |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 渠道扩展信息（如分页游标等），无扩展数据时为空对象 |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧唯一标识（统一为 string，由渠道原始 ID 转换而来） |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧标题 |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 封面图片 URL |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧简介 |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类 ID |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分类名称 |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前观看到的集数 |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧总集数 |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 分组 ID（渠道侧的短剧分组/专辑标识） |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 已解锁集数索引（当前可观看进度） |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 样式类型标识，取值由渠道定义 |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧时长（单位由渠道定义，通常为秒） |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   | 渠道原始数据（短剧信息的原始 JSON 快照），可能为 null；<br/>字段可能因渠道差异，业务侧做好空值兼容 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### open(options : DramaOpenOptions) : void @open
open
打开短剧播放页播放指定短剧；支持起播集数 episode、单次激励视频解锁集数 lock、初始免费观看集数 free 与服务端回调透传 urlCallback，结果经 options.success / options.fail 回调返回
##### open 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaOpenOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | open 打开短剧播放页参数 free 初始免费观看集数、lock 单次激励视频可解锁的集数；打开结果经 success / fail / complete 回调返回。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧 ID（与 DramaInfo.dramaId 一致，统一为 string） |
| episode | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 起播集数，默认 1 |
| lock | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 单次激励视频解锁的集数，默认 1 |
| free | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 初始免费观看集数，默认 1 |
| urlCallback | **DramaUrlCallback** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 服务端回调透传参数：激励发放时回传服务器校验。 |
| success | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 播放页打开成功的回调函数 |
| fail | (err: [IUniDramaError](#iunidramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 播放页打开失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 打开结束的回调函数（成功失败都会执行） | 

##### urlCallback 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| userId | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 用户唯一标识：激励视频解锁发放时，用于服务端回调校验；不传则不透传 |
| extra | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 服务端回调透传的附加参数（业务自定义，回调时原样回传）；不传则不透传 |

###### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### destroy() : void @destroy
destroy
销毁短剧广告实例并释放资源；API 模式请在页面 onUnmounted 时调用
##### destroy 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |




#### onLoad(callback : DramaSimpleCallback) : void @onload
onLoad
短剧模块加载成功时触发（res.providerType 为渠道类型）；open() 打开的播放页就绪后会再次触发（res.type 为 "detail" 并携带 dramaId）
##### onLoad 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 简单事件回调，res 为事件数据对象（模块加载成功时含 providerType；播放页就绪时含 type / dramaId） | 



#### offLoad(callback : DramaSimpleCallback) : void @offload
offLoad
取消 onLoad(callback) 注册的监听
##### offLoad 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 简单事件回调，res 为事件数据对象（模块加载成功时含 providerType；播放页就绪时含 type / dramaId） | 



#### onError(callback : DramaErrorCallback) : void @onerror
onError
发生错误时触发（模块加载失败、查询前置校验失败等），回调参数为 IUniDramaError（errCode / errMsg）
##### onError 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (err: [IUniDramaError](#iunidramaerror-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误回调，err 为 IUniDramaError（errCode 错误码 / errMsg 错误描述） | 

##### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### offError(callback : DramaErrorCallback) : void @offerror
offError
取消 onError(callback) 注册的监听
##### offError 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (err: [IUniDramaError](#iunidramaerror-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误回调，err 为 IUniDramaError（errCode 错误码 / errMsg 错误描述） | 

##### IUniDramaError 的属性值 @iunidramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| -5001 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | adpid 为空：创建实例时未传入短剧广告位标识——传入在 uni-ad 后台申请的 adpid |
| -5002 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 无效的 adpid 或短剧容器未就绪：核对 adpid 是否正确、组件是否完成挂载 |
| -5003 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告位未开通：在 uni-ad 后台申请短剧广告位并确保审核通过 |
| -5005 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告加载失败：网络异常或当前无广告填充——稍后重试 |
| -5006 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告已展示过：需重新加载后才能再次展示 |
| -5007 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 未获取到广告配置：请检查广告是否开启，或 appid 与广告后台是否一致 |
| -5008 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告不可用或已过期：广告素材失效——重新发起请求 |
| -5009 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告类型不符：adpid 对应的广告类型与请求不符——核对后台申请的广告位类型 |
| -5010 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面缺失或已销毁：页面未就绪时发起创建/请求——请在页面存活期间调用 |
| -5011 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧实例已销毁：destroy() 后仍调用实例方法——重新 uni.createDramaAd 创建实例 |
| -5012 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧模块未加载完成：onLoad 触发前调用了查询方法——注册 onLoad 监听，模块就绪后再查询 |
| -5013 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告播放失败：素材下载或播放异常——重新加载 |
| -5015 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 当前页面环境不支持承载短剧页面——常规 uni-app x 页面不会出现，如遇到请反馈问题 |
| -5016 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧首页/详情页创建失败：渠道页面创建异常——重试，持续失败请检查基座与包名配置 |
| -5017 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧页面内部初始化异常——重试，仍失败请反馈问题 |
| -5018 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 宿主页面内容未就绪——重试 |
| -5020 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 短剧运行时加载失败：当前基座缺少短剧原生类——必须使用云打包的自定义基座（manifest.json 配置 uni-ad 模块并含 gm-content 渠道） |
| -5500 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 广告 SDK 启动失败：uni-ad SDK 初始化 start 未成功（多为网络异常或模块未配置）——检查网络与 uni-ad 模块配置后重试 |



#### onPlayEvent(callback : DramaEventCallback) : void @onplayevent
onPlayEvent
播放相关事件，事件数据包含 event（如 playStart / playEnd / pause / resume / seek / playComplete / nextPlaylet / playError / fullDisplay）与 info
##### onPlayEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 播放/广告事件回调，res 为 DramaEventResult（event 事件名 + info 事件附加信息） | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 事件名：播放事件如 playStart / playEnd / pause / resume / seek / playComplete / nextPlaylet / playError / fullDisplay；<br/>广告事件如 show / click / close / skip / reward / loadSuccess / loadFail / videoPlayEnd / showError |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 事件附加信息，字段随事件不同而不同（如 code / message / position / endTime / result），无附加信息时为空对象 |



#### offPlayEvent(callback : DramaEventCallback) : void @offplayevent
offPlayEvent
取消 onPlayEvent(callback) 注册的监听
##### offPlayEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 播放/广告事件回调，res 为 DramaEventResult（event 事件名 + info 事件附加信息） | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 事件名：播放事件如 playStart / playEnd / pause / resume / seek / playComplete / nextPlaylet / playError / fullDisplay；<br/>广告事件如 show / click / close / skip / reward / loadSuccess / loadFail / videoPlayEnd / showError |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 事件附加信息，字段随事件不同而不同（如 code / message / position / endTime / result），无附加信息时为空对象 |



#### onAdEvent(callback : DramaEventCallback) : void @onadevent
onAdEvent
短剧内广告相关事件，事件数据包含 event（如 show / click / close / skip / reward / loadSuccess / loadFail / videoPlayEnd / showError）与 info
##### onAdEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 播放/广告事件回调，res 为 DramaEventResult（event 事件名 + info 事件附加信息） | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 事件名：播放事件如 playStart / playEnd / pause / resume / seek / playComplete / nextPlaylet / playError / fullDisplay；<br/>广告事件如 show / click / close / skip / reward / loadSuccess / loadFail / videoPlayEnd / showError |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 事件附加信息，字段随事件不同而不同（如 code / message / position / endTime / result），无附加信息时为空对象 |



#### offAdEvent(callback : DramaEventCallback) : void @offadevent
offAdEvent
取消 onAdEvent(callback) 注册的监听
##### offAdEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 播放/广告事件回调，res 为 DramaEventResult（event 事件名 + info 事件附加信息） | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 事件名：播放事件如 playStart / playEnd / pause / resume / seek / playComplete / nextPlaylet / playError / fullDisplay；<br/>广告事件如 show / click / close / skip / reward / loadSuccess / loadFail / videoPlayEnd / showError |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   | 事件附加信息，字段随事件不同而不同（如 code / message / position / endTime / result），无附加信息时为空对象 |



#### onUnlockEvent(callback : DramaSimpleCallback) : void @onunlockevent
onUnlockEvent
短剧解锁相关事件（激励视频解锁成功等）
##### onUnlockEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 简单事件回调，res 为事件数据对象（模块加载成功时含 providerType；播放页就绪时含 type / dramaId） | 



#### offUnlockEvent(callback : DramaSimpleCallback) : void @offunlockevent
offUnlockEvent
取消 onUnlockEvent(callback) 注册的监听
##### offUnlockEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | 5.32 | √ | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 简单事件回调，res 为事件数据对象（模块加载成功时含 providerType；播放页就绪时含 type / dramaId） | 


 


## Tips

+ 短剧广告仅支持 Android 平台。

<!-- UTSAPIJSON.createDramaAd.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ad.createDramaAd)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=createDramaAd&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createDramaAd&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createDramaAd&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createDramaAd&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createDramaAd&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createDramaAd)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createDramaAd&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

