<!-- ## uni.getBackgroundAudioManager() @getbackgroundaudiomanager -->

::: sourceCode
## uni.getBackgroundAudioManager() @getbackgroundaudiomanager

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getBackgroundAudioManager


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getBackgroundAudioManager

:::

获取全局唯一的背景音频管理器 backgroundAudioManager


背景音频，常见于音乐播放、听书等场景。在页面关闭、应用切换到后台时，仍然可以继续播放，并且可以在手机的通知栏里进行播放、暂停、拖进度等操作。

**支持格式**

|格式	|Android|iOS|HarmonyOS|
|:-		|:-			|:-	|:-	|
|mp3	|√			|√	|√|
|mp4	|√			|√	|x|
|m4a	|√			|√	|√|
|wav	|√			|√	|√|
|aac	|√			|√	|√|
|flac	|√			|√	|x|
|aiff	|x			|√	|x|
|amr	|√			|x	|√|
|ape	|√			|x	|x|
|caf	|x			|√	|x|
|ogg	|√			|x	|√|
|wma	|√			|x	|x|

- web平台的支持取决于浏览器的实现，一般浏览器上述音频格式均支持
- 小程序平台支持的格式见各家小程序的文档
- HarmonyOS 平台使用 [AudioPlayer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-media#audioplayerdeprecated?ha_source=Dcloud&ha_sourceId=89000448) 实现

**缓存说明**

- App-Android 平台播放的网络音频，默认会缓存到应用cache目录的uni-audio/background文件夹下，默认大小为100M，超过后会根据最近最少使用的缓存算法自动进行清除；
- 4.51 版本以上 App-iOS 平台支持Cache功能，缓存路径、默认大小和自动清理机制和 Android 一样；

**关于Cookie与UA**

- App 平台会将应用的Cookie与UA信息自动带入到请求链接

### getBackgroundAudioManager 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |




### 返回值 

| 类型 |
| :- |
| [BackgroundAudioManager](#backgroundaudiomanager-values) |

#### BackgroundAudioManager 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| duration | number | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 当前音频的长度（单位：s），只有在当前有合法的 src 时返回 |
| currentTime | number | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回 |
| paused | boolean | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放 |
| src | string | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 音频的数据源，默认为空字符串，当设置了新的 src 时，会自动开始播放 ，目前支持的格式有 m4a, aac, mp3, wav |
| startTime | number | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 音频开始播放的位置（单位：s） |
| buffered | number | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: x | 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲 |
| title | string | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。 |
| epname | string | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值 |
| singer | string | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值 |
| coverImgUrl | string | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。 |
| webUrl | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: x | 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值 |
| protocol | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS: x | 音频协议。默认值为 'http'，设置 'hls' 可以支持播放 HLS 协议的直播音频 |
| playbackRate | number | 否 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: x | 播放的倍率。可取值： 0.5/0.8/1.0/1.25/1.5/2.0，默认值为1.0。（仅 App 支持） |
| cache | boolean | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: x | 是否缓存线上音频资源，默认值为true，当设置false时，不会缓存资源到本地，直播地址需要主动设置为false |
| audioType | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `3.4.8`<br/><br/>音频类型。可设置 "audio" 和 "music" 两种值，默认为 "audio"。不同音频类型对应的播放器样式不一样（实验特性，目前仅iOS和Android端支持）<br/> |
| referrerPath | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `3.4.8`<br/><br/>关联页面路径。设置后，当点击播放器上的小程序跳转链接时，将跳转到这个关联页面路径（实验特性，目前仅Android端支持）<br/> |
| referrerPolicy | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.13.0`<br/><br/>`origin`: 发送完整的referrer; `no-referrer`: 不发送。格式固定为 `https://servicewechat.com/{appid}/{version}/page-frame.html`，其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版、体验版以及审核版本，版本号为 devtools 表示为开发者工具，其余为正式版本；<br/> |
#### BackgroundAudioManager 的方法 @backgroundaudiomanager-values 

#### play(): void; @play
play
播放
##### play 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |



#### pause(): void; @pause
pause
暂停
##### pause 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |



#### seek(position: number): void; @seek
seek
跳转到指定位置，单位 s
##### seek 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| position | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### stop(): void; @stop
stop
停止
##### stop 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |



#### onCanplay(callback: (result: any) => void): void; @oncanplay
onCanplay
背景音频进入可以播放状态，但不保证后面可以流畅播放
##### onCanplay 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onPlay(callback: (result: any) => void): void; @onplay
onPlay
背景音频播放事件
##### onPlay 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onPause(callback: (result: any) => void): void; @onpause
onPause
背景音频暂停事件
##### onPause 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onStop(callback: (result: any) => void): void; @onstop
onStop
背景音频停止事件
##### onStop 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onEnded(callback: (result: any) => void): void; @onended
onEnded
背景音频自然播放结束事件
##### onEnded 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onSeeking(callback : (result : any) => void) : void; @onseeking
onSeeking
音频进行 seek 操作事件
##### onSeeking 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onSeeked(callback : (result : any) => void) : void; @onseeked
onSeeked
音频完成 seek 操作事件
##### onSeeked 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onTimeUpdate(callback: (result: any) => void): void; @ontimeupdate
onTimeUpdate
背景音频播放进度更新事件
##### onTimeUpdate 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onPrev(callback: (result: any) => void): void; @onprev
onPrev
用户在系统音乐播放面板点击上一曲事件
##### onPrev 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onNext(callback: (result: any) => void): void; @onnext
onNext
用户在系统音乐播放面板点击下一曲事件
##### onNext 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onError(callback : (result : ICreateBackgroundAudioFail) => void) : void; @onerror
onError
背景音频播放错误事件
##### onError 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [ICreateBackgroundAudioFail](#icreatebackgroundaudiofail-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### ICreateBackgroundAudioFail 的属性值 @icreatebackgroundaudiofail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1107601 | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 系统错误 |
| 1107602 | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 网络错误 |
| 1107603 | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 文件错误 |
| 1107604 | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 格式错误 |
| 1107605 | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 未知错误 |
| 1107609 | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: - | 播放路径不能为空 |


#### onWaiting(callback: (result: any) => void): void; @onwaiting
onWaiting
音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
##### onWaiting 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.41 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offCanplay(): void; @offcanplay
offCanplay
取消监听背景音频可播放事件
##### offCanplay 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offPlay(): void; @offplay
offPlay
取消监听背景音频播放事件
##### offPlay 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offPause(): void; @offpause
offPause
取消监听背景音频暂停事件
##### offPause 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offStop(): void; @offstop
offStop
取消监听背景音频停止事件
##### offStop 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offEnded(): void; @offended
offEnded
取消监听背景音频自然播放结束事件
##### offEnded 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offSeeking() : void; @offseeking
offSeeking
取消监听音频进行 seek 操作事件
##### offSeeking 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offSeeked() : void; @offseeked
offSeeked
取消监听音频完成 seek 操作事件
##### offSeeked 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offTimeUpdate(): void; @offtimeupdate
offTimeUpdate
取消监听背景音频播放进度更新事件
##### offTimeUpdate 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offPrev(): void; @offprev
offPrev
取消监听用户在系统音乐播放面板点击上一曲事件
##### offPrev 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offNext(): void; @offnext
offNext
取消监听用户在系统音乐播放面板点击下一曲事件
##### offNext 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offError() : void; @offerror
offError
背景音频播放错误事件
##### offError 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | 5.0 |



#### offWaiting(): void; @offwaiting
offWaiting
取消监听音频加载中事件
##### offWaiting 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | 5.0 | 5.0 | 5.0 | x |


 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.getBackgroundAudioManager)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/background-audio-manager.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/BackgroundAudioManager.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getBackgroundAudioManager&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getBackgroundAudioManager&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getBackgroundAudioManager&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getBackgroundAudioManager&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getBackgroundAudioManager)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getBackgroundAudioManager&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-background-audio-manager/get-background-audio-manager.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-background-audio-manager/get-background-audio-manager.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-background-audio-manager/get-background-audio-manager
```uvue
<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<text>
				注意：1.离开当前页面后背景音乐将保持播放；\n
				2. 硬退出app、调用stop api、播放结束都会清理后台控制中心和锁屏信息显示
			</text>
			<boolean-data :defaultValue="false" title="是否循环播放" @change="setLoop"></boolean-data>
			<view class="uni-common-mt">
				<slider ref="sliderRef" :value="position" :min="0" :max="duration" @changing="onchanging"
					@change="onchange"></slider>
			</view>
			<view class="page-body-buttons">
				<template v-if="playing">
					<view class="page-body-button" @tap="stop">
						<image class="image" src="/static/test-audio/stop.png"></image>
					</view>
					<view class="page-body-button" @tap="pause" style="margin-top: 20px;">
						<image class="image" src="/static/test-audio/pause.png"></image>
					</view>
				</template>
				<template v-if="!playing">
					<view class="page-body-button" @tap="play">
						<image class="image" src="/static/test-audio/play.png"></image>
					</view>
				</template>
				<view class="page-body-button"></view>
			</view>
		</view>
	</view>
</template>
<script setup lang="uts">
	const title = ref("backgroundAudio")
	const sliderRef = ref<UniSliderElement | null>(null)
	const bgAudioMannager = ref(null as BackgroundAudioManager | null)
	const dataUrl = ref('https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3')
	const playing = ref(false)
	const playTime = ref(0)
	const formatedPlayTime = ref('00:00:00')
	const count = ref(100)
	const isPlayEnd = ref(false)
	const duration = ref(100)
	const currentTime = ref(0)
	const _isChanging = ref(false)
	const buffered = ref(0)
	const isLoop = ref(false)

	const position = computed((): number => {
		return isPlayEnd.value ? 0 : currentTime.value;
	})

	const play = () => {
		console.log('play')
		isPlayEnd.value = false;
		bgAudioMannager.value!.play()
	}

	const pause = () => {
		bgAudioMannager.value?.pause();
	}

	const stop = () => {
		bgAudioMannager.value?.stop();
		playing.value = false
	}

	const onchanging = () => {
		_isChanging.value = true;
	}

	const onchange = (e: UniSliderChangeEvent) => {
		let pos = e.detail.value;
		console.log('pos', pos);
		bgAudioMannager.value!.seek(pos);
		_isChanging.value = false;
	}

	const setLoop = () => {
		isLoop.value = !isLoop.value;
		console.log('当前是否设置循环播放，loop= ', isLoop.value);
	}

  onUnload(()=>{
    // #ifdef APP
    bgAudioMannager.value?.offCanplay()
    bgAudioMannager.value?.offEnded()
    bgAudioMannager.value?.offError()
    bgAudioMannager.value?.offNext()
    bgAudioMannager.value?.offPause()
    bgAudioMannager.value?.offPlay()
    bgAudioMannager.value?.offPrev()
    bgAudioMannager.value?.offSeeked()
    bgAudioMannager.value?.offSeeking()
    bgAudioMannager.value?.offStop()
    bgAudioMannager.value?.offTimeUpdate()
    bgAudioMannager.value?.offWaiting()
    // #endif
  })

	onLoad(() => {
		let bgAudioMannagerInstance = uni.getBackgroundAudioManager();
		bgAudioMannagerInstance.title = '致爱丽丝' + count.value;
		bgAudioMannagerInstance.epname = '专辑名：致爱丽丝' + count.value
		bgAudioMannagerInstance.singer = '歌手：暂无' + count.value;
		bgAudioMannagerInstance.coverImgUrl = 'https://web-assets.dcloud.net.cn/unidoc/zh/Alice.jpeg';
		bgAudioMannagerInstance.src = dataUrl.value;
		currentTime.value = bgAudioMannagerInstance.currentTime
		duration.value = bgAudioMannagerInstance.duration
		bgAudioMannagerInstance.onCanplay(() => {
			console.log("音频进入可以播放状态事件");
			buffered.value = bgAudioMannagerInstance.buffered;
			duration.value = bgAudioMannagerInstance.duration
		})
		bgAudioMannagerInstance.onPlay(() => {
			console.log("开始播放");
			playing.value = true;
		})
		bgAudioMannagerInstance.onPause(() => {
			console.log("暂停播放");
			playing.value = false;
		})
		bgAudioMannagerInstance.onStop(() => {
			console.log("停止播放");
			playing.value = false;
		})
		bgAudioMannagerInstance.onEnded(() => {
			if (isLoop.value == false) {
				console.log("播放结束");
				playing.value = false;
				currentTime.value = 0;
				isPlayEnd.value = true;
				sliderRef.value!.value = 0
			} else {
				console.log("播放结束, 开始循环播放");
				bgAudioMannager.value!.src = dataUrl.value;
				bgAudioMannager.value?.play()
			}
		})
		bgAudioMannagerInstance.onNext(() => {
			count.value++
			console.log("下一曲", count.value);
			bgAudioMannager.value?.stop()
			bgAudioMannagerInstance.title = '致爱丽丝' + count.value;
			bgAudioMannagerInstance.singer = '歌手：暂无' + count.value;
			dataUrl.value = 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3'
			bgAudioMannagerInstance.coverImgUrl = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png';
			bgAudioMannager.value!.src = dataUrl.value;
			bgAudioMannager.value?.play()
		})
		bgAudioMannagerInstance.onPrev(() => {
			count.value--
			console.log("上一曲", count.value);
			bgAudioMannager.value?.stop()
			bgAudioMannagerInstance.title = '致爱丽丝' + count.value;
			bgAudioMannagerInstance.singer = '歌手：暂无' + count.value;
			dataUrl.value = 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3'
			bgAudioMannagerInstance.coverImgUrl = 'https://web-assets.dcloud.net.cn/unidoc/zh/Alice.jpeg';
			bgAudioMannager.value!.src = dataUrl.value;
			bgAudioMannager.value?.play()
		})
		bgAudioMannagerInstance.onSeeking(() => {
			console.log('音频进行 seek 操作事件');
		})
		bgAudioMannagerInstance.onSeeked(() => {
			console.log('音频完成 seek 操作事件');
		})
		bgAudioMannagerInstance.onWaiting(() => {
			console.log('音频加载中事件');
		})
		bgAudioMannagerInstance.onTimeUpdate(() => {
			console.log('onTimeUpdate', bgAudioMannagerInstance.currentTime)
			if (_isChanging.value) { return; }
			currentTime.value = bgAudioMannager.value!.currentTime;
			buffered.value = bgAudioMannager.value!.buffered;
			console.log('onTimeUpdateCb', currentTime.value)

			// #ifdef MP
			// 微信小程序安卓端过早的时机获取的buffered、duration为0，改为在此处获取
			if (bgAudioMannager.value!.duration === 0) {
				buffered.value = bgAudioMannager.value!.buffered;
				duration.value = bgAudioMannager.value!.duration
			}
			// #endif
			if (currentTime.value > buffered.value) {
				console.log('缓冲不足');
			}
		})
		bgAudioMannagerInstance.onError((err) => {
			console.log('播放出错err', err);
		})
		bgAudioMannager.value = bgAudioMannagerInstance;
		playing.value = !bgAudioMannagerInstance.paused
		console.log('currentTime=', bgAudioMannager.value!.currentTime, bgAudioMannager.value!.currentTime == 0)
	})

</script>

<style>
	.image {
		width: 75px;
		height: 75px;
	}

	.page-body-text {
		padding: 0 15px;
	}

	.page-body-wrapper {
		margin-top: 0;
	}

	.page-body-info {
		padding-bottom: 25px;
	}

	.time-big {
		font-size: 30px;
		margin: 10px;
	}

	.slider {
		width: 315px;
	}

	.play-time {
		width: 100%;
		padding: 10px 0;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.page-body-buttons {
		display: flex;
		justify-content: center;
		margin-top: 50px;
		flex-direction: column;
	}

	.page-body-button {
		flex-direction: row;
		justify-content: center;
	}
</style>

```
:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## 注意
1，audio默认开启了缓存策略
