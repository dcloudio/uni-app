# uni-push

uni-push是DCloud与合作伙伴个推共同推出的统一推送服务。用于从服务器端推送消息到客户端。

它包括在线推送、离线推送，聚合了Apple、华为、小米、OPPO、VIVO、魅族、荣耀(3.99+)、Google等多个手机厂商的推送通道。

若不使用服务器推送，仅想创建手机通知栏本地消息，也需要使用本模块的API。

它是一个云端一体的业务，涉及多份文档：
1. 业务介绍：对于未使用过uni-push的新用户，本文必读：[uni-push业务介绍](https://uniapp.dcloud.net.cn/unipush-v2.html)
2. 客户端API，即本文
3. 服务器API，[另见](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api)

## 注意事项
* Android离线推送消息，需要开通厂商通道，在UniPush2.0中进行配置 [文档](https://uniapp.dcloud.net.cn/unipush-v2.html#%E7%AC%AC%E4%BA%8C%E6%AD%A5-%E9%85%8D%E7%BD%AE)
* iOS平台配置证书时，请注意开通推送能力，否则云打包会报错，配置如下图：
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/uni-push/iOS/ios-profile-push-notification.jpg)
* iOS平台可以通过[info.plist](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#usagedescription)配置通知权限描述 

## uni.getPushClientId(options) @getpushclientid

获取客户端唯一的推送标识

### getPushClientId 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.27 | 4.41 | 3.98 | 4.18 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetPushClientIdOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [GetPushClientIdSuccess](#getpushclientidsuccess-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### GetPushClientIdSuccess 的属性值 @getpushclientidsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| cid | string | 是 | - | Web: 4.27; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 个推客户端推送id，对应uni-id-device表的push_clientid<br/> |
| errMsg | string | 是 | - | Web: 4.27; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 错误描述<br/> |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.push.uni-push.getPushClientId)
- [参见uni-app相关文档](http://uniapp.dcloud.io/api/plugins/push.html#getpushclientid)

## uni.onPushMessage(callback) @onpushmessage

启动监听推送消息事件

### onPushMessage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.27 | 4.41 | 3.98 | 4.18 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnPushMessageCallbackResult](#onpushmessagecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### OnPushMessageCallbackResult 的属性值 @onpushmessagecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 是 | - | Web: 4.27; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 事件类型<br/>- click 从系统推送服务点击消息启动应用事件<br/>- receive 应用从推送服务器接收到推送消息事件 |
| data | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | - | Web: 4.27; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 消息内容<br/> |

#### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| click | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| receive | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.push.uni-push.onPushMessage)
- [参见uni-app相关文档](http://uniapp.dcloud.io/api/plugins/push.html#onpushmessage)

### 注意事项

* 如果多次监听`onPushMessage`，那么事件也会多次触发，所以当不需要监听的时候需要`offPushMessage`。

## uni.offPushMessage(callback) @offpushmessage

关闭推送消息监听事件，iOS端调用会关闭所有监听。

### offPushMessage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.27 | 4.41 | 3.98 | 4.18 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnPushMessageCallbackResult](#onpushmessagecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### OnPushMessageCallbackResult 的属性值 @onpushmessagecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 是 | - | Web: 4.27; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 事件类型<br/>- click 从系统推送服务点击消息启动应用事件<br/>- receive 应用从推送服务器接收到推送消息事件 |
| data | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | - | Web: 4.27; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 消息内容<br/> |

#### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| click | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| receive | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.push.uni-push.offPushMessage)
- [参见uni-app相关文档](http://uniapp.dcloud.io/api/plugins/push.html#offpushmessage)

### 注意事项

* 由于各大厂商限制推送频次，当使用厂商离线推送的时，需要在不同品牌手机后台开通自分类权益，[限制数量说明](https://docs.getui.com/getui/mobile/vendor/qps/)
  - [华为](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/message-classification-0000001149358835?ha_source=Dcloud&ha_sourceId=89000448)
  - [小米](https://dev.mi.com/console/doc/detail?pId=2422)
  - [oppo](https://open.oppomobile.com/new/developmentDoc/info?id=11227)
  - [vivo](https://dev.vivo.com.cn/documentCenter/doc/359)
  - [honor](https://developer.hihonor.com/cn/kitdoc?category=%E5%9F%BA%E7%A1%80%E6%9C%8D%E5%8A%A1&kitId=11002&navigation=guides&docId=notification-class.html)

	uni-push从HBuilderX 3.99起支持荣耀推送

  开通自分类权益后，需要客户端创建channel，因此客户端提供了`setPushChannel`来进行channel的创建，通过此Api来创建渠道进行推送。
  客户端创建渠道成功后，即可通过云函数进行推送，[uni-push2服务端文档](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api.html)。


* 由于Android通知渠道的机制问题，一旦通知渠道建立，便不能修改此渠道的配置，即使删除渠道后再次创建同channelId名称的渠道，也不会改变原先渠道的配置（除非删除应用），最明显的现象就是铃声动态修改失败，比如调用`setPushChannel`时，第一次的设置参数是`{"channelId":"test","soundName":"pushsound"}` , 这时你想切换铃音，你的channelId就不能再叫test了，而应该为`{"channelId":"test2","soundName":"ring"}` ，此时会新建一个渠道。



## uni.createPushMessage(options) @createpushmessage

创建本地通知栏消息


### createPushMessage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 3.98 | 4.18 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CreatePushMessageOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| cover | boolean | 否 | false | Web: x; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 是否覆盖上一次提示的消息 |
| delay | number | 否 | 0 | Web: x; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 提示消息延迟显示的时间,单位为s |
| icon | string | 否 | null | Web: x; 微信小程序: -; Android: 3.98; iOS: x; HarmonyOS: - | 推送消息的图标 |
| sound | string | 否 | "system" | Web: x; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 推送消息的提示音<br/>- system: 使用系统通知提示音（默认值）<br/>- none: 不使用提示音 |
| title | string | 否 | App的名称 | Web: x; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 推送消息的标题 |
| content | string | 是 | - | Web: x; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 消息显示的内容，在系统通知中心中显示的文本内容。鸿蒙系统中，此字段为必填字段。<br/> |
| payload | any | 否 | null | Web: x; 微信小程序: -; Android: 3.98; iOS: 4.18; HarmonyOS: - | 消息承载的数据，可根据业务逻辑自定义数据格式，在点击通知消息时`onPushMessage`回调中会返回此字段的数据。 |
| when | number | 否 | 当前时间 | Web: x; 微信小程序: -; Android: 3.98; iOS: x; HarmonyOS: - | 消息上显示的提示时间，需要传入时间戳。 |
| channelId | string | 否 | "DcloudChannelID" | Web: x; 微信小程序: -; Android: 3.98; iOS: x; HarmonyOS: - | 渠道id，Android特有字段，[通知渠道介绍](https://developer.android.com/develop/ui/views/notifications/channels?hl=zh-cn)，<br/>创建通知渠道请使用`getPushChannelManager`获取PushChannelManager对象，调用`setPushChannel`方法配置渠道。 |
| category | string | 否 | null | Web: x; 微信小程序: -; Android: 3.98; iOS: x; HarmonyOS: - | 通知类别，Android特有字段，[通知渠道介绍](https://developer.android.com/develop/ui/views/notifications/channels?hl=zh-cn)，<br/>标识通知的类别，应用场景为对于离线推送厂商配置的支持，比如[华为消息分类](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/message-classification-0000001149358835#section5101818813) |
| success | (result: CreatePushMessageSuccess) => void | 否 | null | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | null | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.push.uni-push.getChannelManager)
- [参见uni-app相关文档](http://uniapp.dcloud.io/api/plugins/push.html#createpushmessage)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## uni.getPushChannelManager() @getpushchannelmanager

获取通知渠道管理器，Android 8系统以上才可以设置通知渠道，Android 8系统以下返回null，[通知渠道介绍](https://developer.android.com/develop/ui/views/notifications/channels?hl=zh-cn)，iOS不支持。


### getPushChannelManager 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 4.25 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |




### 返回值 

| 类型 |
| :- |
| [ChannelManager](#channelmanager-values) |

#### ChannelManager 的方法 @channelmanager-values 

#### setPushChannel(options: SetPushChannelOptions): void; @setpushchannel
setPushChannel
设置推送渠道

##### setPushChannel 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 3.98 | x | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SetPushChannelOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| soundName | string | 否 | null | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 添加的声音文件，注意raw目录下必须要有 ，不传此字段将使用默认铃音。 |
| channelId | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 通知渠道id |
| channelDesc | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 通知渠道描述 |
| enableLights | boolean | 否 | false | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 呼吸灯闪烁 |
| enableVibration | boolean | 否 | false | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 震动 |
| importance | number | 否 | 3 | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 通知的重要性级别，可选范围IMPORTANCE_LOW：2、IMPORTANCE_DEFAULT：3、IMPORTANCE_HIGH：4 。 |
| lockscreenVisibility | number | 否 | -1000 | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 锁屏可见性，可选范围VISIBILITY_PRIVATE：0、VISIBILITY_PUBLIC：1、VISIBILITY_SECRET：-1、VISIBILITY_NO_OVERRIDE：-1000。 | 


#### getAllChannels(): Array\<string>; @getallchannels
getAllChannels
获取当前应用注册的所有的通知渠道。

##### getAllChannels 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 3.98 | x | - |


##### 返回值 

| 类型 |
| :- |
| Array&lt;string&gt; |
 
 


<!-- UTSAPIJSON.getPushChannelManager.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.push.uni-push.createPushMessage)

## uni.setAppBadgeNumber(num, options?) @setappbadgenumber

设置应用图标上显示的角标数字，注意：不同手机厂商的角标显示规则不同，有部分设备的rom版本不支持显示角标，另有部分rom需要在应用的通知管理里开启`桌面角标`配置，才可以设置角标成功。


### setAppBadgeNumber 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 4.25 | 4.25 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| num | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要显示的角标数字值，参数为0则表示清除角标数字。 |
| options | **BadgeOptions** | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 小米手机显示角标需要在系统消息中心显示一条通知，此参数用于设置通知的标题（title）和内容（content）。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 否 | 应用的名称 | Web: x; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: - | 消息的标题 |
| content | string | 否 | '您有x条未读消息'，其中x为设置的角标数字值。 | Web: x; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: - | 消息的内容 | 




<!-- UTSAPIJSON.setAppBadgeNumber.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.push.uni-push.getPushChannelManager)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/push.html#setappbadgenumber)

::: sourceCode
## uni.~~getChannelManager()~~ @getchannelmanager
:::

获取通知渠道管理器，Android 8系统以上才可以设置通知渠道，Android 8系统以下返回null，[通知渠道介绍](https://developer.android.com/develop/ui/views/notifications/channels?hl=zh-cn) ，iOS不支持。
  **已废弃，仅为了向下兼容保留，建议使用`getPushChannelManager`。**

### getChannelManager 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 3.98 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |




### 返回值 

| 类型 |
| :- |
| [ChannelManager](#channelmanager-values) |

#### ChannelManager 的方法 @channelmanager-values 

#### setPushChannel(options: SetPushChannelOptions): void; @setpushchannel
setPushChannel
设置推送渠道

##### setPushChannel 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 3.98 | x | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SetPushChannelOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| soundName | string | 否 | null | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 添加的声音文件，注意raw目录下必须要有 ，不传此字段将使用默认铃音。 |
| channelId | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 通知渠道id |
| channelDesc | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 通知渠道描述 |
| enableLights | boolean | 否 | false | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 呼吸灯闪烁 |
| enableVibration | boolean | 否 | false | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 震动 |
| importance | number | 否 | 3 | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 通知的重要性级别，可选范围IMPORTANCE_LOW：2、IMPORTANCE_DEFAULT：3、IMPORTANCE_HIGH：4 。 |
| lockscreenVisibility | number | 否 | -1000 | Web: x; 微信小程序: -; Android: -; iOS: x; HarmonyOS: - | 锁屏可见性，可选范围VISIBILITY_PRIVATE：0、VISIBILITY_PUBLIC：1、VISIBILITY_SECRET：-1、VISIBILITY_NO_OVERRIDE：-1000。 | 


#### getAllChannels(): Array\<string>; @getallchannels
getAllChannels
获取当前应用注册的所有的通知渠道。

##### getAllChannels 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 3.98 | x | - |


##### 返回值 

| 类型 |
| :- |
| Array&lt;string&gt; |
 
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.push.uni-push.setAppBadgeNumber)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/push.html#getchannelmanager)

#### 注意事项

- Android原生的系统其实是不支持设置角标的，在原生系统中应用有通知时，会在图标右上角出现圆点，所以原生系统并不适用 `setAppBadgeNumber`。
- 支持的手机品牌为：小米、华为、荣耀、OPPO、vivo、三星、索尼。
- 在小米系统上设置角标有个默认的行为，即：app处于前台状态会清空角标数（可以理解为已读），所以小米平台建议在`onHide`中设置角标。


## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/uni-push/uni-push.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/uni-push/uni-push.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/uni-push/uni-push

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/uni-push/uni-push

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
  <view>
    <!-- #ifdef APP-ANDROID -->
    <button class="normal-button" type="default" @click="handleCreateChannel(true)">
      创建通知渠道 | setPushChannel
    </button>
    <button class="normal-button" type="default" @click="handleGetAllChannels">
      获取所有通知渠道信息 | getAllChannels
    </button>
    <textarea style="width: 100%;" :disabled="true" :value="channelInfo"></textarea>
    <!-- #endif -->
    <!-- #ifdef APP -->
    <button class="normal-button" type="default" @click="handleCreateLocalNotification">
      创建本地通知消息 | createPushMessage
    </button>
    <text class="instructions">
      不同手机厂商的角标显示规则不同，有部分设备的rom版本不支持显示角标，另有部分rom需要在应用的通知管理里开启`桌面角标`配置，才可以设置角标成功。\n
      部分rom需要在设置中同时开启`通知开关`和`桌面角标`配置，才允许设置角标，例如鸿蒙4.2。 \n
      另外针对高版本小米设备，会借助创建通知栏消息来设置角标数，所以设置时需要注意是否有权限创建通知栏消息。
    </text>
    <button class="normal-button" type="default" @click="handleSetBadge">
      设置角标为5 | setAppBadgeNumber(5)
    </button>
    <button class="normal-button" type="default" @click="handleCleanBadge">
      清空角标 | setAppBadgeNumber(0)
    </button>
    <!-- #endif -->
    <button class="normal-button" type="default" @click="handleSendPushMessage">
      发送通知消息 | sendPushMessage
    </button>
    <button class="normal-button uni-common-mb" type="default" @click="handleGetClientId">
      获取cid | getPushClientId
    </button>
    <button class="normal-button" type="default" @click="handleOnPushMessage">
      注册回调 | onPushMessage
    </button>
    <button class="normal-button" type="default" @click="handleOffPushMessage">
      注销回调 | offPushMessage
    </button>
  </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  // 自动化测试
  type TypeJestResult = {
    clientId : string,
    sendPushMessageRes : number,
    onPushMessageType:string,
    onPushMessageCallbackInfo:string,
    hasGetuiAppId: boolean
  }
  type TypeIsRegister = {
    state:boolean
  }
  const jestResult = reactive({
    clientId:"",
    sendPushMessageRes:-1,
    onPushMessageType:"",
    onPushMessageCallbackInfo:"",
    hasGetuiAppId: true
  } as TypeJestResult)

  // #ifdef APP-HARMONY
  jestResult.hasGetuiAppId = false;
  // 判断鸿蒙平台是否配置了个推AppId
  import bundleManager from '@ohos.bundle.bundleManager';
  const bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION | bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_METADATA;
  try {
    bundleManager.getBundleInfoForSelf(bundleFlags).then((data) => {
      jestResult.hasGetuiAppId = data.appInfo?.metadata?.entry?.find(item=>item.name === 'GETUI_APPID') != null;
      console.error('jestResult.hasGetuiAppId:', jestResult.hasGetuiAppId);
    }).catch((err) => {
      console.error('Promise 捕获错误:', err);
    });
  } catch (_) {}
  // #endif

  // 自动化测试
  const autoTest = ref(false);
  const updateAutoTest = (value : boolean) => {
    autoTest.value = value
  }

  const channelInfo = ref("")
  const onPushMessageCallback = (res : OnPushMessageCallbackResult) => {
    // 自动化测试
    jestResult.onPushMessageType = res.type
    jestResult.onPushMessageCallbackInfo = JSON.stringify(res.data)
    if (!autoTest.value) {
      uni.showModal({
        title: "onPushMessage回调信息",
        content: `type：${res.type} \n data：${JSON.stringify(res.data)}`
      })
    }
  }

  // 为兼容Android测试例中能获取到，此处用reactive定义
  const isRegister = reactive({
    state:false
  } as TypeIsRegister);

  const handleOnPushMessage = () => {
    if (isRegister.state) {
      uni.showToast({
        icon: "error",
        title: "无需重复注册"
      })
      return
    }
    uni.onPushMessage(onPushMessageCallback)
    isRegister.state = true
    uni.showToast({
      title: "成功注册"
    })
  }

  const handleOffPushMessage = () => {
    if (!isRegister.state) {
      uni.showToast({
        icon: "error",
        title: "未注册, 无需注销"
      })
      return
    }
    uni.offPushMessage(onPushMessageCallback)
    isRegister.state = false
    uni.showToast({
      title: "成功注销"
    })
  }

  const handleCreateChannel = (showToast : boolean) => {
    // #ifdef APP-ANDROID
    const manager = uni.getPushChannelManager()
    manager.setPushChannel({
      channelId: "msg-pass",
      channelDesc: "留言审核通过",
      soundName: "#填写配置的声音文件名#",
      enableLights: true,
      enableVibration: true,
      importance: 4,
      lockscreenVisibility: 1
    } as SetPushChannelOptions)
    if (showToast) {
      uni.showToast({
        title: "设置渠道成功"
      })
    }
    // #endif
  }
  const handleGetAllChannels = () => {
    // #ifdef APP-ANDROID
    const manager = uni.getPushChannelManager()
    console.log("channels : " + manager.getAllChannels());
    channelInfo.value = `渠道信息为: \n ${manager.getAllChannels()}`
    // #endif
  }
  const handleCreateLocalNotification = () => {
    if (uni.getAppAuthorizeSetting().notificationAuthorized == "authorized") {
      handleCreateChannel(false)
      const date = new Date();
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      const formateTime = (target : number) : string => {
        return target < 10 ? `0${target}` : `${target}`
      }
      uni.createPushMessage({
        title: "主标题(title)",
        content: `内容(content)，创建时间: ${formateTime(hour)}:${formateTime(minute)}:${formateTime(second)}`,
        cover: false,
        channelId: "msg-pass",
        when: Date.now() + 10000,
        icon: "/static/test-image/logo.png",
        sound: "system",
        delay: 1,
        payload: {
          pkey: "pvalue1"
        },
        // #ifdef APP-HARMONY
        category: "SOCIAL_COMMUNICATION",
        // #endif
        // #ifndef APP-HARMONY
        category: "IM",
        // #endif
        success(res) {
          console.log("res: " + res);
          uni.hideToast()
          uni.showToast({
            title: "创建本地通知消息成功"
          })
        },
        fail(e) {
          console.log("fail :" + e);
          uni.hideToast()
          uni.showToast({
            title: "创建本地通知消息失败",
            icon: "error"
          })
        }
      })
    } else {
      uni.showToast({
        title: "请在设置中开启通知权限",
        icon: "error"
      })
    }
  }

  async function getPushClientId(): Promise<string>{
    let pushClientId = '';
    let res:void = await new Promise<void>(resolve => {
      uni.getPushClientId({
        success: (res: GetPushClientIdSuccess) => {
          console.log(res.cid)
          pushClientId = res.cid
          resolve()
        },
        fail: (err: GetPushClientIdFail) => {
          resolve()
          console.error(err);
          if (err.message.includes('uniPush is not enabled')) {
            uni.showModal({
              title: '获取cid失败',
              content: '当前项目未启用uni-push，检查manifest.json中的uni-push配置',
              showCancel: false
            });
          } else if (err.message.includes('getPushClientId:fail register fail: {\"errorCode\":1,\"errorMsg\":\"\"}')) {
            uni.showModal({
              title: '获取cid失败',
              content: '当前项目未开通uni-push，开通文档：https://uniapp.dcloud.net.cn/unipush-v2.html#%E7%AC%AC%E4%B8%80%E6%AD%A5-%E5%BC%80%E9%80%9A',
              showCancel: false
            });
          } else {
            uni.showToast({
              title: `获取cid失败`,
              icon: "error"
            })
          }
        }
      })
    })
    return pushClientId
  }

  const handleGetClientId = async():Promise<void> =>{
    uni.showLoading({
      title: "正在获取cid",
    })
    const cid = await getPushClientId()
    if (cid != '') {
      // 自动化测试
      jestResult.clientId = cid
      if (!autoTest.value) {
        uni.showModal({
          title: "获取cid",
          content: "获取cid成功" + cid,
          showCancel: false
        })
      }
    }
    uni.hideLoading()
  }
  const handleSendPushMessage = async():Promise<void>=> {
    const pushClientId = await getPushClientId()
    if (pushClientId == ''){
      return
    }
    const uniPushCo = uniCloud.importObject("uni-push-co")
    try {
      const res = await uniPushCo.sendPushMessage(pushClientId)
      // 自动化测试
      jestResult.sendPushMessageRes = res.errCode as number
      if (!autoTest.value) {
        uni.showToast({
          title: "发送通知消息成功"
        })
      }
    } catch (err:any) {
      const error = err as UniCloudError
      console.error(error)
      if (!autoTest.value) {
        uni.showToast({
          title: "发送通知消息失败",
          icon: "error"
        })
      }
    }
  }
  const handleSetBadge = () => {
    if (uni.getDeviceInfo().deviceBrand?.toLowerCase() == "xiaomi") {
      if (uni.getAppAuthorizeSetting().notificationAuthorized == "authorized") {
        uni.setAppBadgeNumber(5, {
          title: "AppName",
          content: "您有5条未读消息"
        } as BadgeOptions)
        uni.showToast({
          title: "设置应用角标数为5"
        })
      } else {
        uni.showToast({
          title: "请在设置中开启通知权限",
          icon: "error"
        })
      }

    } else {
      uni.setAppBadgeNumber(5)
      uni.showToast({
        title: "设置应用角标数为5"
      })
    }
  }
  const handleCleanBadge = () => {
    if (uni.getDeviceInfo().deviceBrand?.toLowerCase() == "xiaomi") {
      if (uni.getAppAuthorizeSetting().notificationAuthorized == "authorized") {
        uni.setAppBadgeNumber(0, {} as BadgeOptions)
        uni.showToast({
          title: "清空应用角标数"
        })
      } else {
        uni.showToast({
          title: "请在设置中开启通知权限",
          icon: "error"
        })
      }
    } else {
      uni.setAppBadgeNumber(0)
      uni.showToast({
        title: "清空应用角标数"
      })
    }
  }

  // 自动化测试
  defineExpose({
    jestResult,
    autoTest,
    updateAutoTest,
    isRegister,
    handleSendPushMessage,
    handleGetClientId,
    handleOnPushMessage,
    handleOffPushMessage
  })
</script>

<style>
  .normal-button {
    width: 100%;
  }

  .instructions {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #eee;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |



## app-android平台高级场景用途

在[nativeResources/android](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#%E5%BA%94%E7%94%A8%E8%B5%84%E6%BA%90)目录可以配置图片和声音的二进制文件资源。

### 通知栏显示图标自定义
关于图标的配置，需要创建[nativeResources](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#%E5%BA%94%E7%94%A8%E8%B5%84%E6%BA%90)目录，
放置对应分辨率的图片资源即可（打包后生效），目录配置如下

```
├── nativeResources
│   └── android
│       └── res
│           ├── drawable-ldpi
│           │   ├── push.png            // 分辨率要求48x48
│           │   └── push_small.png      // 分辨率要求18x18
│           ├── drawable-mdpi
│           │   ├── push.png            // 分辨率要求64x64
│           │   └── push_small.png      // 分辨率要求24x24
│           ├── drawable-hdpi
│           │   ├── push.png            // 分辨率要求96x96
│           │   └── push_small.png      // 分辨率要求36x36
│           ├── drawable-xhdpi
│           │   ├── push.png            // 分辨率要求128x128
│           │   └── push_small.png      // 分辨率要求48x48
│           ├── drawable-xxhdpi
│           │   ├── push.png            // 分辨率要求192x192
│           │   └── push_small.png      // 分辨率要求72x72
│           ├── drawable-xxxhdpi
│           │   └── push_small.png      // 分辨率要求96x96
│           └── raw
│               └── pushsound.mp3       // 声音文件， 自定义推送铃音时使用
```

[小图标要求](https://uniapp.dcloud.net.cn/tutorial/app-push-unipush.html#%E6%8E%A8%E9%80%81%E5%B0%8F%E5%9B%BE%E6%A0%87-small-%E8%A6%81%E6%B1%82)

### 通知声音自定义

有些场景，如到账提醒，需要自定义通知声音。

`setPushChannel`设置新建渠道时，`soundName`字段的值为目录nativeResources->android->res->raw中存放的音频文件名称，（打包后生效）
注意不要带文件的后缀，比如`pushsound.mp3`文件，例：
```ts
const channelManager = getChannelManager()
channelManager.setPushChannel({
	channelId: "test1",
	channelDesc: "test1 desc",
	soundName: "pushsound"
})
```

### 在通知栏显示App下载进度

很多Android应用升级下载apk时会在通知栏显示下载进度。

该功能已经内置到[uni升级中心](https://doc.dcloud.net.cn/uniCloud/upgrade-center.html)中，此开源模板可直接使用。

### 在通知栏显示音乐播放条

需要使用uts插件，[见插件市场](https://ext.dcloud.net.cn/search?q=%E9%80%9A%E7%9F%A5%E6%A0%8F&orderBy=Relevance&uni-appx=1)

## 注意事项

* 关于隐私安全问题，由于在调用`getPushClientId`或者`onPushMessage`时，才会初始化个推SDK，所以开发者要确保**弹出隐私框之前不调用此两项API**。
* 获取手机端app是否拥有push权限，请使用API [uni.getAppAuthorizeSetting](get-app-authorize-setting.md)
* uni-app x 的push模块仅支持uni-push2，不再支持uni-push1。但不要误会这不是强绑uniCloud的付费行为。而是DCloud的所有云服务都将统一纳入到uniCloud体系管理，开发者在开通uni-push2后，也可以拿到mastersecret，然后在自己的服务器去直接连接个推服务器。另外uniCloud的免费版也足够很多开发者使用。
* uni-push是一个独立的模块，HBuilderX4.25以前版本标准基座中并不包含，HBuilder4.25及以上版本标准基座中包含，可直接在标准基座体验创建本地通知消息相关业务。由于push消息推送功能需要关联包名及签名信息，完整消息推送功能需打包自定义基座。
* 创建本地通知栏，理论上可以和个推的服务无关。但目前也都包含在push模块里了。如果您不需要服务器推送，只需要本地创建通知栏，也需要打包push模块才行。
* 部分手机创建本地通知时，App如果在后台状态，点击通知消息并不会拉起App，原因是厂商增加了后台弹窗权限，需要用户手动打开此权限。
