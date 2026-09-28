::: sourceCode
## uni.createDramaAd(options) @createdramaad
:::

创建短剧广告实例：创建即自动加载短剧模块（自动加载模式），加载结果经 onLoad / onError 上报

短剧广告：通过短剧内容生态（穿山甲内容联盟）变现的高价值广告形式。开发者将短剧内容（列表、播放页）嵌入自己的应用，用户免费观看指定集数后，需观看激励视频解锁后续剧集，从而实现广告变现。

uni-app x 内置短剧插件 uni-drama，提供两种接入方式：

| 接入方式 | 说明 | 适用场景 |
| :- | :- | :- |
| API 模式 | 通过 `uni.createDramaAd` 创建实例，自行搭建短剧列表页，调用查询接口获取短剧数据，再调用 `open` 打开原生播放页 | 需要自定义短剧列表页样式、深度定制业务 |
| 组件模式 | 使用 `<ad-drama>` 组件（native-view），内嵌短剧首页 Fragment，组件挂载即自动加载 | 快速接入，直接使用渠道提供的短剧首页 |

组件模式另见：[ad-drama 组件](../component/ad-drama.md)。

### 开通与配置

1. 开通短剧广告位

   登录 [uni-ad 广告联盟](https://uniad.dcloud.net.cn/) 开通短剧广告，创建短剧广告位后获取广告位标识 `adpid`。

2. 配置广告模块

   短剧广告能力来自 uni-ad 的内容聚合模块 `gm-content`（对应穿山甲内容生态，含短剧/信息流场景）。在 `manifest.json` 的 `app -> distribute -> modules` 下添加：

   ```json
   	modules:{
   		"uni-ad":{
   			"gm-content":{}
   		}
   	}
   ```

   详见 [manifest uni-ad 模块配置](../collocation/manifest-modules.md#uni-ad)。

3. 配置原生资源

   在项目 `nativeResources/android/assets/` 下添加 `gm_SDK_Setting.json`，配置穿山甲内容联盟 SDK 参数与 VOD 点播 license。该文件随自定义基座打进 APK assets。

4. 制作自定义基座

   标准基座不包含短剧运行时，需制作自定义基座后运行，否则报错 `-5020`（见下方错误码）。

### 服务器回调

用户观看激励视频解锁剧集后，为防止客户端伪造看完广告的凭据，解锁集数的发放由服务器回调完成，这是业内通行的安全方案。调用 `open` 时传入 `urlCallback`（userId/extra），激励发放时会透传到业务服务器参与校验。

### createDramaAd 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android |
| :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.21 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **CreateDramaAdOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | uni-drama 短剧插件类型定义（原 uni-ad-dom2 短剧部分独立拆分）。 依赖 uni-ad-dom2 广告插件（提供 SDK 初始化与 AAR），本文件只包含短剧 API 与组件类型。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| adpid | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 短剧广告位标识 | 




### 返回值 

| 类型 | 描述 |
| :- | :- |
| [DramaAd](#dramaad-values) | 短剧广告实例：自建聚合页场景的列表/搜索/详情能力入口。<br/>创建实例（uni.createDramaAd）即自动加载短剧模块（自动加载模式），<br/>加载结果经 onLoad / onError 上报。 |

#### DramaAd 的方法 @dramaad-values 

#### getList(options : DramaListOptions) : void @getlist
getList
显式加载短剧模块（已注释：当前版本创建即自动加载，无需此方法；
如恢复手动加载模式，放开下面声明并同步放开实现处的注释）。
##### getList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 列表查询参数：page 从 1 开始；success/fail/complete 与 open(options) 形态一致。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询成功的回调函数 |
| fail | (err: [DramaError](#dramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   |

###### DramaError 的属性值 @dramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| code | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| message | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |



#### getRecommendedList(options : DramaListOptions) : void @getrecommendedlist
getRecommendedList

##### getRecommendedList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 列表查询参数：page 从 1 开始；success/fail/complete 与 open(options) 形态一致。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询成功的回调函数 |
| fail | (err: [DramaError](#dramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   |

###### DramaError 的属性值 @dramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| code | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| message | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |



#### getCollectionList(options : DramaListOptions) : void @getcollectionlist
getCollectionList

##### getCollectionList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 列表查询参数：page 从 1 开始；success/fail/complete 与 open(options) 形态一致。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询成功的回调函数 |
| fail | (err: [DramaError](#dramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   |

###### DramaError 的属性值 @dramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| code | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| message | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |



#### getHistoryList(options : DramaListOptions) : void @gethistorylist
getHistoryList

##### getHistoryList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaListOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 列表查询参数：page 从 1 开始；success/fail/complete 与 open(options) 形态一致。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| order | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询成功的回调函数 |
| fail | (err: [DramaError](#dramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   |

###### DramaError 的属性值 @dramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| code | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| message | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |



#### search(options : DramaSearchOptions) : void @search
search

##### search 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaSearchOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 搜索参数：isFuzzy 为 true 时模糊匹配（默认 true）；success/fail/complete 与 open(options) 形态一致。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| searchWord | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| isFuzzy | boolean | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| page | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| pageSize | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 搜索成功的回调函数 |
| fail | (err: [DramaError](#dramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 搜索失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 搜索结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   |

###### DramaError 的属性值 @dramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| code | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| message | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |



#### getInfo(options : DramaInfoOptions) : void @getinfo
getInfo

##### getInfo 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaInfoOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 指定短剧信息查询参数：dramaId 与 dramaIds 二选一；success/fail/complete 与 open(options) 形态一致。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| dramaIds | Array&lt;number&gt; | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |  |
| success | (res: [DramaListResult](#dramalistresult-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询成功的回调函数 |
| fail | (err: [DramaError](#dramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 查询结束的回调函数（成功失败都会执行） | 

###### DramaListResult 的属性值 @dramalistresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramas | Array&lt;**DramaInfo**&gt; | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   |

#### dramas 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| title | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| coverUrl | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| desc | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| categoryName | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| currentEpisode | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| totalEpisodes | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| groupId | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| unlockIndex | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| styleType | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| duration | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| rawInfo | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 |   |

###### DramaError 的属性值 @dramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| code | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| message | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |



#### open(options : DramaOpenOptions) : void @open
open

##### open 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **DramaOpenOptions** | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 打开短剧播放页参数（含 success/fail/complete 回调）。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dramaId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 短剧 ID（与 DramaInfo.dramaId 一致，统一为 string） |
| episode | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 起播集数，默认 1 |
| lock | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 单次激励视频解锁的集数，默认 1 |
| free | number | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 初始免费观看集数，默认 1 |
| urlCallback | **DramaUrlCallback** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 服务端回调透传参数：激励发放时回传服务器校验。 |
| success | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 播放页打开成功的回调函数 |
| fail | (err: [DramaError](#dramaerror-values)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 播放页打开失败的回调函数 |
| complete | () => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x | 打开结束的回调函数（成功失败都会执行） | 

##### urlCallback 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| userId | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | string | 否 | Web: x; 微信小程序: x; 支付宝小程序: x |

###### DramaError 的属性值 @dramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| code | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| message | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |



#### destroy() : void @destroy
destroy

##### destroy 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |




#### onLoad(callback : DramaSimpleCallback) : void @onload
onLoad

##### onLoad 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 



#### offLoad(callback : DramaSimpleCallback) : void @offload
offLoad

##### offLoad 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 



#### onError(callback : DramaErrorCallback) : void @onerror
onError

##### onError 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (err: [DramaError](#dramaerror-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 

##### DramaError 的属性值 @dramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| code | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| message | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |



#### offError(callback : DramaErrorCallback) : void @offerror
offError

##### offError 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (err: [DramaError](#dramaerror-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 

##### DramaError 的属性值 @dramaerror-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| code | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| message | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| extra | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |



#### onPlayEvent(callback : DramaEventCallback) : void @onplayevent
onPlayEvent

##### onPlayEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   |



#### offPlayEvent(callback : DramaEventCallback) : void @offplayevent
offPlayEvent

##### offPlayEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   |



#### onAdEvent(callback : DramaEventCallback) : void @onadevent
onAdEvent

##### onAdEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   |



#### offAdEvent(callback : DramaEventCallback) : void @offadevent
offAdEvent

##### offAdEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (res: [DramaEventResult](#dramaeventresult-values)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 

##### DramaEventResult 的属性值 @dramaeventresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| event | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x |
| info | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 |   |



#### onUnlockEvent(callback : DramaSimpleCallback) : void @onunlockevent
onUnlockEvent

##### onUnlockEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 



#### offUnlockEvent(callback : DramaSimpleCallback) : void @offunlockevent
offUnlockEvent

##### offUnlockEvent 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 |
| :- | :- | :- |
| x | x | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | Web: x; 微信小程序: x; 支付宝小程序: x | 


 


### 错误码

| 错误码 | 说明 |
| :-: | :- |
| -5001 | 广告位标识 adpid 为空。 |
| -5010 | 宿主 Activity 缺失。 |
| -5011 | 短剧客户端已销毁。 |
| -5012 | 短剧模块未加载。创建实例即自动加载，请等待 `onLoad` 事件触发后再调用查询方法。 |
| -5015 | 宿主 Activity 不是 FragmentActivity。 |
| -5016 | 短剧详情页/首页创建失败。 |
| -5017 | 短剧 Fragment 缺失。 |
| -5018 | Activity content 视图获取失败。 |
| -5020 | 短剧运行时加载失败（当前基座缺少短剧类，需自定义基座）。 |
| -5500 | uni-ad SDK start 失败（启动门禁拦截）。 |

**渠道透传错误**：除上表外，其余错误码为短剧 AAR / 广告渠道透传（如 `-5005` 广告加载失败）。此类错误的 `extra` 字段为渠道错误明细 JSON 数组，每项包含 `p`（渠道标识）、`id`、`code`（渠道错误码）、`msg`（渠道错误描述），可用于定位配置问题。例如：

```json
[{"p":"gm","id":"1","code":4,"msg":"package_name参数与平台package_name不匹配"}]
```

## Tips

+ 短剧广告仅支持 Android 平台，且需使用自定义基座，标准基座缺少短剧运行时会报错 `-5020`。

+ 当前版本为自动加载模式：创建实例即自动加载短剧模块，无需手动调用 `load()`（当前版本未提供该方法）。列表查询等实例方法需在 `onLoad` 事件触发后调用，否则报错 `-5012`。

+ `onLoad` 可能同步到达：若短剧模块已就绪（如从短剧组件页返回后再次创建实例），`onLoad` 事件会在 `uni.createDramaAd` 返回前同步触发。依赖 onLoad 时序的业务（如加载计时）需在创建实例之前完成初始化。

+ 排查指引：

  | 现象 | 定位 |
  | :- | :- |
  | 创建实例后一直"加载中" | 检查 adpid 是否正确、网络是否可用、uni-ad 后台广告位状态 |
  | 报错 `-5020` | 未使用自定义基座，或基座中未包含短剧 AAR |
  | 报错 `-5500` | uni-ad SDK 启动被门禁拦截，检查 uni-ad 后台应用配置 |
  | 渠道透传错误且 extra 含 package_name 不匹配 | nativeResources 中渠道配置的包名与平台登记的 package_name 不一致 |

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

