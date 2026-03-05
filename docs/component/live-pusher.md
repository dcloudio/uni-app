# uni直播

[uni直播](https://doc.dcloud.net.cn/uniCloud/uni-live/intro.html)是DCloud与七牛云合作推出的直播服务，七牛云直播依托云边一体化架构和海量节点资源，构建高效的流媒体服务。通过多维度的节点监控与弹性的节点调度管理，确保高质量服务与成本效益的完美平衡。

`live-pusher` 组件是[uni直播](https://doc.dcloud.net.cn/uniCloud/uni-live/intro.html)服务中的推流组件，在 Android/iOS 平台使用需要申请绑定包名/Bundle ID(AppID)，详情[咨询](https://im.dcloud.net.cn/#/?joinGroup=68622a2ba99ae56f95028db1)

<!-- ## live-pusher -->

::: sourceCode
## live-pusher
:::

实时音视频录制


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.81 | 4.81 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| url | string([string.VideoURIString](/uts/data-type.md#ide-string)) | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 推流地址，支持 rtmp 协议 |
| mode | string | "SD" | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | SD（标清）, HD（高清）, FHD（超清）, RTC（实时通话） |
| autopush | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 自动推流 |
| muted | boolean | false | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 是否静音 |
| enable-camera | boolean | true | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 开启摄像头 |
| auto-focus | boolean | true | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 自动获取焦点 |
| orientation | string | "vertical" | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 画面方向，可选值有 vertical，horizontal |
| beauty | number | 0 | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 美颜，取值范围 0-9（iOS取值范围为1） ，0 表示关闭 |
| aspect | string | "3:4" | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 视频宽高比例 |
| min-bitrate | number | 200 | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 最小码率 |
| max-bitrate | number | 1000 | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 最大码率 |
| waiting-image | string | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 进入后台时推流的等待画面 |
| waiting-image-md5 | string | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 等待画面资源的MD5值 |
| background-mute | boolean | false | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 进入后台时是否静音 |
| enableVideoCustomRender | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>自定义渲染，允许开发者自行处理所采集的视频帧，详见[LivePusherContext]((LivePusherContext)) |
| whiteness | number | 0 | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>美白，取值范围 0-9（iOS取值范围为1） ，0 表示关闭 |
| audio-quality | string | "high" | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>高音质(48KHz)或低音质(16KHz)，值为`high`, `low` |
| waiting-image-hash | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>等待画面资源的MD5值 |
| zoom | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>调整焦距 |
| zoom | number | 1 | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 调整焦距 |
| device-position | string | "front" | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>前置或后置，值为`front`, `back` |
| mirror | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>设置推流画面是否镜像，产生的效果在 live-player 反应到 |
| remote-mirror | boolean | false | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>同 mirror 属性，后续 mirror 将废弃 |
| local-mirror | string | "auto" | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>控制本地预览画面是否镜像 |
| audio-reverb-type | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>音频混响类型 |
| enable-mic | boolean | true | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>开启或关闭麦克风 |
| enable-agc | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>是否开启音频自动增益 |
| enable-ans | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>是否开启音频噪声抑制 |
| audio-volume-type | string | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>音量类型 |
| video-width | number | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>上推的视频流的分辨率宽度 |
| video-height | number | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>上推的视频流的分辨率高度 |
| beauty-style | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>设置美颜类型 |
| filter | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>设置色彩滤镜 |
| picture-in-picture-mode | string/Array | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string/Array)*<br/>设置小窗模式： push, pop，空字符串或通过数组形式设置多种模式（如： \["push", "pop"] |
| voice-changer-type | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>0：关闭变声；1：熊孩子；2：萝莉；3：大叔；4：重金属；6：外国人；7：困兽；8：死肥仔；9：强电流；10：重机械；11：空灵 |
| custom-effect | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(boolean)*<br/>是否启动自定义特效，设定后不能更改 |
| skin-whiteness | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>自定义特效美白效果，取值 0~1。需要开启 `custom-effect` |
| skin-smoothness | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>自定义特效磨皮效果，取值 0~1。需要开启 `custom-effect` |
| face-thinness | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>自定义特效瘦脸效果，取值 0~1。需要开启 `custom-effect` |
| eye-bigness | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>自定义特效大眼效果，取值 0~1。需要开启 `custom-effect` |
| fps | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>帧率，有效值为 1~30 |
| @statechange | (event: [UniLivePusherStatechangeEvent](#unilivepusherstatechangeevent)) => void | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 播放状态变化事件，event.detail = {code, message} |
| @statechange | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 播放状态变化事件，detail = {code} |
| @error | (event: [UniLivePusherErrorEvent](#unilivepushererrorevent)) => void | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 错误事件，event.detail = {errCode, errMsg} |
| @netstatus | (event: [UniLivePusherNetstatusEvent](#unilivepushernetstatusevent)) => void | - | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: -; HarmonyOS(Vapor): - | 网络状态通知，event.detail = {videoBitrate, audioBitrate, videoFPS, videoGOP, netSpeed, videoWidth, videoHeight} |
| @netstatus | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 网络状态通知，detail = {info} |
| @bgmstart | eventhandle | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>背景音开始播放时触发 |
| @bgmprogress | eventhandle | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>背景音进度变化时触发，detail = {progress, duration} |
| @bgmcomplete | eventhandle | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>背景音播放完成时触发 |
| @audiovolumenotify | eventhandle | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>返回麦克风采集的音量大小 |
| @enterpictureinpicture | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>进入小窗 |
| @leavepictureinpicture | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>退出小窗 |

#### mode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| RTC | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | - |
| SD | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | - |
| HD | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | - |
| FHD | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | - |
| QVGA | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | Quarter VGA |
| HVGA | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | Half-size VGA |

#### orientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| vertical | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | - |
| horizontal | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | - |

#### local-mirror 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 前置摄像头镜像，后置摄像头不镜像 |
| enable | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 前后置摄像头均镜像 |
| disable | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 前后置摄像头均不镜像 |

#### audio-reverb-type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 0 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 关闭 |
| 1 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | KTV |
| 2 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 小房间 |
| 3 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 大会堂 |
| 4 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 低沉 |
| 5 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 洪亮 |
| 6 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 金属声 |
| 7 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 磁性 |

#### audio-volume-type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 自动 |
| media | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 媒体音量 |
| voicecall | Web: x; 微信小程序: 4.41; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 通话音量 |

#### beauty-style 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| smooth | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 光滑美颜 |
| nature | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 自然美颜 |

#### filter 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| standard | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 标准 |
| pink | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 粉嫩 |
| nostalgia | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 怀旧 |
| blues | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 蓝调 |
| romantic | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 浪漫 |
| cool | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 清凉 |
| fresher | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 清新 |
| solor | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 日系 |
| aestheticism | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 唯美 |
| whitening | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 美白 |
| cerisered | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 樱红 |

#### picture-in-picture-mode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| [] | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 取消小窗 |
| push | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 路由 push 时触发小窗 |
| pop | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 路由 pop 时触发小窗 |


### 事件
#### UniLivePusherStatechangeEvent
推流状态变化事件

##### UniLivePusherStatechangeEvent 的属性值
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| detail | **UniLivePusherStatechangeEventDetail** | 是 | - | - | - |
| bubbles | boolean | 是 | - | - | - |
| cancelable | boolean | 是 | - | - | - |
| type | string | 是 | - | - | - |
| target | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| currentTarget | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| timeStamp | Long | 是 | - | - | - |

#### detail 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| code | number | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 状态码 |
| message | string | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 状态信息 |

##### code 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1001 | - | 连接中 |
| 1002 | - | 已连接 |
| 3004 | - | 连接断开 |


##### UniLivePusherStatechangeEvent 的方法
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stopPropagation | () => void | 是 | - | - | - |
| preventDefault | () => void | 是 | - | - | - |

#### UniLivePusherErrorEvent
错误事件

##### UniLivePusherErrorEvent 的属性值
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| detail | **UniLivePusherError** | 是 | - | - | - |
| bubbles | boolean | 是 | - | - | - |
| cancelable | boolean | 是 | - | - | - |
| type | string | 是 | - | - | - |
| target | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| currentTarget | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| timeStamp | Long | 是 | - | - | - |

#### detail 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | - | - |
| errSubject | string | 是 | - | - | 统一错误主题（模块）名称 |
| data | any | 否 | - | - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | - | - |

##### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 3005 | - | 网络问题 |
| 3006 | - | 推流地址错误 |
| 3007 | - | 推流地址未授权 |
| 3008 | - | 包未授权 |
| 4001 | - | 音频录制错误（android） |
| 4002 | - | 打开摄像头错误（android） |
| 4003 | - | 没有 nv21 预览格式（android） |
| 4004 | - | 开启视频编码错误（android） |
| 4005 | - | 视频编码错误（android） |
| 4006 | - | 开启音频编码错误（android） |
| 4007 | - | 音频编码错误（android） |
| 5001 | - | 编码器编码错误（iOS） |
| 5002 | - | TLS 连接失败（iOS） |
| 5003 | - | 没有 SSL 或者 TLS（iOS） |
| 5004 | - | DNS 解析失败（iOS） |
| 5005 | - | rtmp 发布失败（iOS） |
| -1 | - | - |


##### UniLivePusherErrorEvent 的方法
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stopPropagation | () => void | 是 | - | - | - |
| preventDefault | () => void | 是 | - | - | - |

#### UniLivePusherNetstatusEvent
推流网络状态事件

##### UniLivePusherNetstatusEvent 的属性值
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| detail | **UniLivePusherNetstatusEventDetail** | 是 | - | - | - |
| bubbles | boolean | 是 | - | - | - |
| cancelable | boolean | 是 | - | - | - |
| type | string | 是 | - | - | - |
| target | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| currentTarget | [UniElement](/api/dom/unielement.md) | 否 | - | - | - |
| timeStamp | Long | 是 | - | - | - |

#### detail 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| videoBitrate | number | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 当前视频编/码器输出的比特率，单位 kbps |
| audioBitrate | number | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 当前音频编/码器输出的比特率，单位 kbps |
| videoFPS | number | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 当前视频帧率 |
| videoGOP | number | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 当前视频 GOP,也就是每两个关键帧(I帧)间隔时长，单位 s |
| netSpeed | number | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 当前的发送/接收速度 |
| videoWidth | number | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 视频画面的宽度 |
| videoHeight | number | 是 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): - | 视频画面的高度 |


##### UniLivePusherNetstatusEvent 的方法
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stopPropagation | () => void | 是 | - | - | - |
| preventDefault | () => void | 是 | - | - | - |


<!-- UTSCOMJSON.live-pusher.component_type -->

### 音视频协议
- 支持 rtmp 协议格式。

### 上下文对象API
[uni.createLivePusherContext()](../api/create-live-pusher-context.md)



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/live-pusher/live-pusher.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/live-pusher/live-pusher.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/live-pusher/live-pusher
```uvue
<template>
  <view class="uni-flex-item">
    <live-pusher v-if="isPermissionGranted && isUrlSet" id="live-pusher" class="live-pusher" :url="url" :beauty="beauty"
      :whiteness="whiteness" :remote-mirror="remoteMirror" :local-mirror="localMirror" :device-position="devicePosition"
      :mode="mode" :auto-focus="autoFocus" :muted="muted" :orientation="orientation" :enable-camera="enableCamera"
      :enable-mic="enableMic" :audio-quality="audioQuality" :min-bitrate="minBitrate" :max-bitrate="maxBitrate"
      :audio-volume-type="audioVolumeType" :aspect="aspect" :background-mute="backgroundMute"
      :waiting-image="waitingImage" :zoom="zoom" @statechange="statechange" @netstatus="netstatus" @error="error">
    </live-pusher>
    <scroll-view class="uni-padding-wrap uni-common-mt uni-flex-item">
      <view class="uni-title">
        <text class="uni-title-text">API示例</text>
      </View>
      <view class="uni-btn-v">
        <button type="primary" @click="start" :disabled="connectedState || !previewState">开始推流</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="pause" :disabled="!connectedState || !previewState">暂停推流</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="resume"
          :disabled="initState || connectedState || stopState || !previewState">恢复推流</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="stop" :disabled="!connectedState || !previewState">停止推流</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="switchCamera" :disabled="stopState || !previewState">切换前后摄像头</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="snapshot" :disabled="stopState || !previewState">快照</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="startPreview" :disabled="stopState || previewState">开启摄像头预览</button>
      </view>
      <view class="uni-btn-v">
        <button type="primary" @click="stopPreview" :disabled="stopState || !previewState">关闭摄像头预览</button>
      </view>
      <view class="uni-title">
        <text class="uni-title-text">属性示例</text>
      </view>
      <input class="input margin-10" type="string" placeholder="设置推流地址" @confirm="onUrlComfirm"></input>
      <input class="input margin-10" type="string" placeholder="设置最小码率" @confirm="onMinBitrateComfirm"></input>
      <input class="input margin-10" type="string" placeholder="设置最大码率" @confirm="onMaxBitrateComfirm"></input>
      <input class="input margin-10" type="string" placeholder="设置进入后台时推流的等待画面"
        @confirm="onWaitingImageComfirm"></input>
      <input class="input margin-10" type="string" placeholder="设置焦距" @confirm="onZoomComfirm"></input>
      <view class="margin-10">
        <text>美颜, 取值范围0-9(iOS取值范围为1), 0表示关闭</text>
        <slider :min="0" :max="9" @change="onBeautyChange" />
      </view>
      <view class="margin-10">
        <text>美白, 取值范围0-9(iOS取值范围为1), 0表示关闭</text>
        <slider :min="0" :max="9" @change="onWhitenessChange" />
      </view>
      <boolean-data title="设置是否静音" :defaultValue="muted" @change="onMutedChange"></boolean-data>
      <!-- <boolean-data title="设置是否开启摄像头" :defaultValue="enableCamera" @change="onEnableCameraChange"></boolean-data> -->
      <!-- <boolean-data title="设置是否开启麦克风" :defaultValue="enableMic" @change="onEnableMicChange"></boolean-data> -->
      <boolean-data title="设置是否自动聚焦" :defaultValue="autoFocus" @change="onAutoFocusChange"></boolean-data>
      <boolean-data title="设置进入后台时是否静音" :defaultValue="backgroundMute" @change="onBackgroundMuteChange"></boolean-data>
      <boolean-data title="设置推流画面是否镜像" :defaultValue="remoteMirror" @change="onRemoteMirrorChange"></boolean-data>
      <enum-data title="设置本地预览画面是否镜像" :items="localMirrorItemTypes" @change="onLocalMirrorChange"></enum-data>
      <enum-data title="设置使用前置或后置摄像头" :items="devicePositionItemTypes" @change="onDevicePositionChange"></enum-data>
      <enum-data title="设置推流视频模式" :items="modeItemTypes" @change="onModeChange"></enum-data>
      <enum-data title="设置视频宽高比例" :items="aspectItemTypes" @change="onAspectChange"></enum-data>
      <enum-data title="设置画面方向" :items="orientationItemTypes" @change="onOrientationChange"></enum-data>
      <enum-data title="设置音质" :items="audioQualityItemTypes" @change="onAudioQualityChange"></enum-data>
    </scroll-view>
  </view>
</template>

<script setup>
  import { ItemType } from '@/components/enum-data/enum-data-types';

  const context = ref(null as LivePusherContext | null);
  const instance = ref(null as ComponentPublicInstance | null);
  const url = ref("rtmp://test");
  const beauty = ref(0);
  const whiteness = ref(0);
  const remoteMirror = ref(false);
  const localMirror = ref("auto");
  const devicePosition = ref("front");
  const mode = ref("SD");
  const autoFocus = ref(true);
  const muted = ref(false);
  const orientation = ref("orientation");
  const enableCamera = ref(true);
  const enableMic = ref(true);
  const audioQuality = ref("high");
  const minBitrate = ref(200);
  const maxBitrate = ref(1000);
  const audioVolumeType = ref("media");
  const aspect = ref("3:4");
  const backgroundMute = ref(false);
  const waitingImage = ref("");
  const zoom = ref(1);
  const videoWidth = ref(0);
  const videoHeight = ref(0);
  const fps = ref(0);
  const isPermissionGranted = ref(false);
  const isUrlSet = ref(true);
  const initState = ref(true);
  const connectedState = ref(false);
  const stopState = ref(false);
  const previewState = ref(true);

  onReady(() => {
    instance.value = getCurrentInstance()?.proxy;
    // #ifdef APP-ANDROID
    const permissions = ["android.permission.CAMERA", "android.permission.RECORD_AUDIO"];
    UTSAndroid.requestSystemPermission(UTSAndroid.getUniActivity()!, permissions, (allRight : boolean, grantedList : string[]) => {
      if (allRight) {
        isPermissionGranted.value = true;
      }
    }, (doNotAskAgain : boolean, grantedList : string[]) => { });
    // #endif
    // #ifndef APP-ANDROID
    isPermissionGranted.value = true;
    // #endif
  });

  const statechange = (e : UniLivePusherStatechangeEvent) => {
    console.log("statechange", e);
    switch (e.detail.code) {
      case 1002:
        initState.value = false;
        connectedState.value = true;
        stopState.value = false;
        break;
      case 3004:
        connectedState.value = false;
        break;
    }
  };
  const netstatus = (e : UniLivePusherNetstatusEvent) => {
    console.log("netstatus", e);
  };
  const error = (e : UniLivePusherErrorEvent) => {
    console.log("error", e);
  };
  const isUrlValid = () : boolean => {
    const valid = url.value != "rtmp://test";
    if (!valid) {
      uni.showToast({
        title: "请输入推流地址",
        icon: "none"
      });
    }
    return valid;
  };
  const start = () => {
    if (!isUrlValid()) return;
    if (context.value == null) {
      context.value = uni.createLivePusherContext("live-pusher", instance.value);
    }
    context.value?.start({
      success: (res) => {
        console.log("start", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("start", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("start", JSON.stringify(res));
      }
    });
  };
  const pause = () => {
    if (!isUrlValid()) return;
    if (context.value == null) {
      context.value = uni.createLivePusherContext("live-pusher", instance.value);
    }
    context.value?.pause({
      success: (res) => {
        console.log("pause", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("pause", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("pause", JSON.stringify(res));
      }
    });
  };
  const resume = () => {
    if (!isUrlValid()) return;
    if (context.value == null) {
      context.value = uni.createLivePusherContext("live-pusher", instance.value);
    }
    context.value?.resume({
      success: (res) => {
        console.log("resume", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("resume", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("resume", JSON.stringify(res));
      }
    });
  };
  const stop = () => {
    if (!isUrlValid()) return;
    stopState.value = true;
    if (context.value == null) {
      context.value = uni.createLivePusherContext("live-pusher", instance.value);
    }
    context.value?.stop({
      success: (res) => {
        console.log("stop", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("stop", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("stop", JSON.stringify(res));
      }
    });
  };
  const switchCamera = () => {
    if (context.value == null) {
      context.value = uni.createLivePusherContext("live-pusher", instance.value);
    }
    context.value?.switchCamera({
      success: (res) => {
        console.log("switchCamera", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("switchCamera", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("switchCamera", JSON.stringify(res));
      }
    });
  };
  const snapshot = () => {
    if (context.value == null) {
      context.value = uni.createLivePusherContext("live-pusher", instance.value);
    }
    context.value?.snapshot({
      success: (res) => {
        console.log("snapshot", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("snapshot", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("snapshot", JSON.stringify(res));
      }
    });
  };
  const startPreview = () => {
    if (context.value == null) {
      context.value = uni.createLivePusherContext("live-pusher", instance.value);
    }
    previewState.value = true;
    context.value?.startPreview({
      success: (res) => {
        console.log("startPreview", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("startPreview", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("startPreview", JSON.stringify(res));
      }
    });
  };
  const stopPreview = () => {
    if (context.value == null) {
      context.value = uni.createLivePusherContext("live-pusher", instance.value);
    }
    previewState.value = false;
    context.value?.stopPreview({
      success: (res) => {
        console.log("stopPreview", JSON.stringify(res));
      },
      fail: (err) => {
        console.log("stopPreview", JSON.stringify(err));
      },
      complete: (res) => {
        console.log("stopPreview", JSON.stringify(res));
      }
    });
  };

  const localMirrorItemTypes = [{ "value": 0, "name": "auto(前置摄像头镜像，后置摄像头不镜像)" }, { "value": 1, "name": "enable(前后置摄像头均镜像)" }, { "value": 2, "name": "disable(前后置摄像头均不镜像)" }] as ItemType[];
  const localMirrorItems = ["auto", "enable", "disable"];
  const modeItemTypes = [{ "value": 0, "name": "SD(标清)" }, { "value": 1, "name": "HD(高清)" }, { "value": 2, "name": "FHD(超清)" }] as ItemType[];
  const modeItems = ["SD", "HD", "FHD"];
  const orientationItemTypes = [{ "value": 0, "name": "vertical" }, { "value": 1, "name": "horizontal" }] as ItemType[];
  const orientationItems = ["vertical", "horizontal"];
  const aspectItemTypes = [{ "value": 0, "name": "3:4" }, { "value": 1, "name": "9:16" }] as ItemType[];
  const aspectItems = ["3:4", "9:16"];
  const audioQualityItemTypes = [{ "value": 0, "name": "high(高音质(48KHz))" }, { "value": 1, "name": "low(低音质(16KHz))" }] as ItemType[];
  const audioQualityItems = ["high", "low"];
  const devicePositionItemTypes = [{ "value": 0, "name": "front" }, { "value": 1, "name": "back" }] as ItemType[];
  const devicePositionItems = ["front", "back"];
  const onUrlComfirm = (event : UniInputConfirmEvent) => {
    let value = event.detail.value;
    if (value == '') return;
    context.value = null;
    isUrlSet.value = false;
    setTimeout(() => {
      url.value = value;
      isUrlSet.value = true;
    }, 200);
    console.log("url ->", value);
  };
  const onMinBitrateComfirm = (event : UniInputConfirmEvent) => {
    let value = event.detail.value;
    if (value == '') return;
    minBitrate.value = parseInt(value);
    console.log("min-bitrate ->", value);
  };
  const onMaxBitrateComfirm = (event : UniInputConfirmEvent) => {
    let value = event.detail.value;
    if (value == '') return;
    maxBitrate.value = parseInt(value);
    console.log("max-bitrate ->", value);
  };
  const onWaitingImageComfirm = (event : UniInputConfirmEvent) => {
    let value = event.detail.value;
    if (value == '') return;
    waitingImage.value = value;
    console.log("waiting-image ->", value);
  };
  const onZoomComfirm = (event : UniInputConfirmEvent) => {
    let value = event.detail.value;
    if (value == '') return;
    zoom.value = parseInt(value);
    console.log("zoom ->", value);
  };
  const onBeautyChange = (event : UniSliderChangeEvent) => {
    beauty.value = event.detail.value;
    console.log("beauty ->", beauty.value);
  };
  const onWhitenessChange = (event : UniSliderChangeEvent) => {
    whiteness.value = event.detail.value;
    console.log("whiteness ->", whiteness.value);
  };
  const onEnableCameraChange = (value : boolean) => {
    enableCamera.value = value;
    console.log("enable-camera ->", enableCamera.value);
  };
  const onEnableMicChange = (value : boolean) => {
    enableMic.value = value;
    console.log("enable-mic ->", enableMic.value);
  };
  const onMutedChange = (value : boolean) => {
    muted.value = value;
    console.log("muted ->", muted.value);
  };
  const onBackgroundMuteChange = (value : boolean) => {
    backgroundMute.value = value;
    console.log("background-mute ->", backgroundMute.value);
  };
  const onAutoFocusChange = (value : boolean) => {
    autoFocus.value = value;
    console.log("auto-focus ->", backgroundMute.value);
  };
  const onRemoteMirrorChange = (value : boolean) => {
    remoteMirror.value = value;
    console.log("remote-mirror ->", remoteMirror.value);
  };
  const onLocalMirrorChange = (value : number) => {
    localMirror.value = localMirrorItems[value];
    console.log("local-mirror ->", localMirrorItems[value]);
  };
  const onDevicePositionChange = (value : number) => {
    devicePosition.value = devicePositionItems[value];
    console.log("device-position ->", devicePosition.value);
  };
  const onModeChange = (value : number) => {
    mode.value = modeItems[value];
    console.log("mode ->", modeItems[value]);
  };
  const onAspectChange = (value : number) => {
    aspect.value = aspectItems[value];
    console.log("aspect ->", aspectItems[value]);
  };
  const onOrientationChange = (value : number) => {
    orientation.value = orientationItems[value];
    console.log("orientation ->", orientation.value);
  };
  const onAudioQualityChange = (value : number) => {
    audioQuality.value = audioQualityItems[value];
    console.log("audio-quality ->", audioQuality.value);
  };
</script>

<style>
  .live-pusher {
    width: 100%;
    height: 50%;
  }

  .input {
    height: 40px;
    background: #FFF;
    padding: 8px 13px;
  }

  .margin-10 {
    margin: 10px;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.media.live-pusher)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/live-pusher.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=live-pusher&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=live-pusher&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=live-pusher&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=live-pusher&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=live-pusher)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=live-pusher&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
