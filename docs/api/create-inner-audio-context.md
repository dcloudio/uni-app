<!-- ## uni.createInnerAudioContext() @createinneraudiocontext -->

::: sourceCode
## uni.createInnerAudioContext() @createinneraudiocontext

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-createInnerAudioContext


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-createInnerAudioContext

:::

创建并返回 audio 上下文 audioContext 对象


:::warning 注意
使用完后，必须调用destory方法将资源进行释放
:::

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

- App-Android 平台播放的网络音频，默认会缓存到应用cache目录的uni-audio文件夹下，默认大小为100M，超过后会根据最近最少使用的缓存算法自动进行清除；
- 4.51 版本以上 App-iOS 平台支持Cache功能，缓存路径、默认大小和自动清理机制和 Android 一样；

### createInnerAudioContext 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |




### 返回值 

| 类型 |
| :- |
| [InnerAudioContext](#inneraudiocontext-values) |

#### InnerAudioContext 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| duration | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 当前音频的长度（单位：s），只有在当前有合法的 src 时返回 |
| currentTime | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回 |
| paused | boolean | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放 |
| src | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 音频的数据链接，用于直接播放 |
| startTime | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 音频开始播放的位置（单位：s） |
| buffered | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: x | 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲 |
| autoplay | boolean | 是 | false | Web: 4.0; 微信小程序: 4.41; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 是否自动开始播放，默认 false |
| loop | boolean | 是 | false | Web: 4.0; 微信小程序: 4.41; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 是否循环播放，默认 false |
| obeyMuteSwitch | boolean | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: 5.0; iOS uni-app x UTS 插件: 5.0; HarmonyOS: x | 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true |
| volume | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 音量。范围 0~1。 |
| playbackRate | number | 否 | 1.0 | Web: x; 微信小程序: 4.41; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: x | 播放的倍率。可取值： 0.5/0.8/1.0/1.25/1.5/2.0，默认值为1.0。（仅 App 支持） |
| cache | boolean | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: x | 是否缓存线上音频资源，默认值为true，当设置false时，不会缓存资源到本地，直播地址需要主动设置为false |
| referrerPolicy | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.13.0`<br/><br/>`origin`: 发送完整的referrer; `no-referrer`: 不发送。格式固定为 `https://servicewechat.com/{appid}/{version}/page-frame.html`，其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版、体验版以及审核版本，版本号为 devtools 表示为开发者工具，其余为正式版本；<br/> |
#### InnerAudioContext 的方法 @inneraudiocontext-values 

#### pause(): void; @pause
pause
暂停
##### pause 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |



#### stop(): void; @stop
stop
停止
##### stop 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |



#### play(): void; @play
play
播放
##### play 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |



#### seek(position: number): void; @seek
seek
跳转到指定位置，单位 s
##### seek 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| position | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### destroy(): void; @destroy
destroy
销毁当前实例
##### destroy 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.33 | 4.41 | 4.41 | 4.61 |



#### onCanplay(callback: (result: any) => void): void; @oncanplay
onCanplay
音频进入可以播放状态，但不保证后面可以流畅播放
##### onCanplay 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onPlay(callback: (result: any) => void): void; @onplay
onPlay
音频播放事件
##### onPlay 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onPause(callback: (result: any) => void): void; @onpause
onPause
音频暂停事件
##### onPause 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onStop(callback: (result: any) => void): void; @onstop
onStop
音频停止事件
##### onStop 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onEnded(callback: (result: any) => void): void; @onended
onEnded
音频自然播放结束事件
##### onEnded 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onTimeUpdate(callback: (result: any) => void): void; @ontimeupdate
onTimeUpdate
音频播放进度更新事件
##### onTimeUpdate 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onError(callback: (result: ICreateInnerAudioContextFail) => void): void; @onerror
onError
音频播放错误事件
##### onError 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [ICreateInnerAudioContextFail](#icreateinneraudiocontextfail-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### ICreateInnerAudioContextFail 的属性值 @icreateinneraudiocontextfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1107601 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 系统错误 |
| 1107602 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 网络错误 |
| 1107603 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 文件错误 |
| 1107604 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 格式错误 |
| 1107605 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 未知错误 |
| 1107609 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61 | 播放路径不能为空 |


#### onWaiting(callback: (result: any) => void): void; @onwaiting
onWaiting
音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
##### onWaiting 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onSeeking(callback: (result: any) => void): void; @onseeking
onSeeking
音频进行 seek 操作事件
##### onSeeking 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onSeeked(callback: (result: any) => void): void; @onseeked
onSeeked
音频完成 seek 操作事件
##### onSeeked 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offCanplay(callback: (result: any) => void): void; @offcanplay
offCanplay
取消监听 onCanplay 事件
##### offCanplay 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offPlay(callback: (result: any) => void): void; @offplay
offPlay
取消监听 onPlay 事件
##### offPlay 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offPause(callback: (result: any) => void): void; @offpause
offPause
取消监听 onPause 事件
##### offPause 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offStop(callback: (result: any) => void): void; @offstop
offStop
取消监听 onStop 事件
##### offStop 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offEnded(callback: (result: any) => void): void; @offended
offEnded
取消监听 onEnded 事件
##### offEnded 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offTimeUpdate(callback: (result: any) => void): void; @offtimeupdate
offTimeUpdate
取消监听 onTimeUpdate 事件
##### offTimeUpdate 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offError(callback: (result: ICreateInnerAudioContextFail) => void): void; @offerror
offError
取消监听 onWaiting 事件
##### offError 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [ICreateInnerAudioContextFail](#icreateinneraudiocontextfail-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offWaiting(callback: (result: any) => void): void; @offwaiting
offWaiting
取消监听 onWaiting 事件
##### offWaiting 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offSeeking(callback: (result: any) => void): void; @offseeking
offSeeking
取消监听 onSeeking 事件
##### offSeeking 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offSeeked(callback: (result: any) => void): void; @offseeked
offSeeked
取消监听 onSeeked 事件
##### offSeeked 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.33 | 4.41 | 4.41 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.createInnerAudioContext)
- [参见uni-app相关文档](http://uniapp.dcloud.io/api/media/audio-context.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createInnerAudioContext&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createInnerAudioContext&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createInnerAudioContext&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createInnerAudioContext&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createInnerAudioContext)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createInnerAudioContext&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/create-inner-audio-context/create-inner-audio-context.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/create-inner-audio-context/create-inner-audio-context.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/create-inner-audio-context/create-inner-audio-context

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/create-inner-audio-context/create-inner-audio-context

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <view class="uni-padding-wrap">
      <page-head title="audio"></page-head>
      <view class="uni-common-mt">
        <slider ref="sliderRef" :value="position" :min="0" :max="data.duration" @changing="onchanging"
          @change="onchange"></slider>
      </view>
      <view class="uni-title">
        <text class="uni-title-text">属性示例</text>
      </View>
      <text class="uni-text-box uni-common-mt">当前音频播放位置（保留小数点后 3 位）：{{data.currentTime}} s</text>
      <text class="uni-text-box">音频的长度（单位:s）：{{data.duration}} s</text>
      <text class="uni-text-box">当前是否停止状态：{{data.isPaused}}</text>
      <text class="uni-text-box">音频缓冲的时间点：{{data.buffered}} s</text>
      <text class="uni-text-box">当前音量：{{data.volume}}</text>
      <button plain :disabled="data.volume == 1" @click="increaseVolume">增加音量</button>
      <button plain :disabled="data.volume == 0" @click="decreaseVolume">减少音量</button>

      <text class="uni-subtitle-text uni-title">开始播放的位置（单位：s）</text>
      <input :value="data.startTime" type="number" placeholder="开始播放的位置（单位：s）" class="uni-input"
        @input="startTimeInput"></input>
      <boolean-data :defaultValue="false" title="是否自动开始播放" @change="setAutoplay"></boolean-data>
      <boolean-data :defaultValue="false" title="是否循环播放" @change="setLoop"></boolean-data>
			<!-- #ifdef APP-IOS -->
			<boolean-data :defaultValue="true" title="是否遵循系统静音开关" @change="setObeyMuteSwitch"></boolean-data>
			<!-- #endif -->

      <text class="uni-subtitle-text uni-title"
        style="padding-left: 10px;padding-top: 10px;padding-right: 10px;">播放倍率(Web/HarmonyOS 不支持)</text>
      <radio-group class="uni-flex uni-row radio-group" @change="playbackRateChange"
        style="flex-wrap: wrap;padding: 10px;">
        <radio value="0.5" style="margin-right: 3px">0.5
        </radio>
        <radio value="0.8" style="margin-right: 3px">0.8</radio>
        <radio value="1.0" style="margin-right: 3px" :checked="data.playbackRateChecked">1.0</radio>
        <radio value="1.25" style="margin-right: 3px">1.25</radio>
        <radio value="1.5" style="margin-right: 3px">1.5</radio>
        <radio value="2.0">2.0</radio>
      </radio-group>

      <view class="uni-title">
        <text class="uni-title-text">方法示例</text>
      </View>
      <button :disabled="data.isPlaying" @click="play" class="uni-btn">播放</button>
      <button :disabled="!data.isPlaying" @click="pause" class="uni-btn">暂停</button>
      <button :disabled="!data.isPlaying" @click="stop" class="uni-btn">停止</button>
      <button @click="onchangeValue(20)" class="uni-btn">跳转到指定位置20</button>
      <button @click="onTimeUpdate" class="uni-btn">onTimeUpdate</button>
      <button @click="offTimeUpdate" class="uni-btn">offTimeUpdate</button>
      <button @click="onWaiting" class="uni-btn">onWaiting</button>
      <button @click="offWaiting" class="uni-btn">offWaiting</button>


      <text style="color: red;font-size: 15px;margin-top: 10px;">tip:销毁后请重新进入此界面再播放</text>
      <button @click="destory" class="uni-btn">销毁</button>

      <view class="uni-title">
        <text class="uni-title-text">格式/路径示例</text>
      </View>
      <navigator url="/pages/API/create-inner-audio-context/inner-audio-format" class="uni-btn">
        <button @click="pause">音频格式示例</button>
      </navigator>
      <navigator url="/pages/API/create-inner-audio-context/inner-audio-path" class="uni-btn">
        <button @click="pause">音频路径示例</button>
      </navigator>
      <navigator url="/pages/API/create-inner-audio-context/inner-audio-mult" class="uni-btn">
        <button @click="pause">多音频同时播放</button>
      </navigator>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>
<script setup lang="uts">
  const audioUrl = 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3'

  type DataType = {
    currentTime : number,
    duration : number,
    startTime : number,
    buffered : number,
    volume : number,
    isCanplay : boolean,
    isPlaying : boolean,
    isPaused : boolean,
    isPlayEnd : boolean,
    _isChanging : boolean,
    _audioContext : InnerAudioContext | null,
    playbackRateChecked : boolean,
    onSeekingTest : boolean,
    onSeekedTest : boolean,
    onWaitingTest : boolean
  }

  const title = ref("innerAudioContext")
  const sliderRef = ref<UniSliderElement | null>(null)
  const onTimeUpdateCb = ref((res : any) => { })
  const onWaitingCb = ref((res : any) => { })

  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    currentTime: 0,
    duration: 100,
    startTime: 0,
    buffered: 0,
    volume: 0.5,
    isCanplay: false,
    isPlaying: false,
    isPaused: true,
    isPlayEnd: false,
    _isChanging: false,
    _audioContext: null as InnerAudioContext | null,
    playbackRateChecked: true,
    onSeekingTest: false,
    onSeekedTest: false,
    onWaitingTest: false
  } as DataType)

  const position = computed(() : number => {
    return data.isPlayEnd ? 0 : data.currentTime;
  })

  const stop = () => {
    console.log('stop');
    data._audioContext!.onStop(() => {
      // 第一次点停止时，不触发
      data.isPaused = true;
      console.log('音频停止事件');
    });
    data._audioContext!.stop();
    data.isPlaying = false;
    console.log('stop', data.isPaused);
  }

  const onCanplay = () => {
    data._audioContext!.onCanplay(() => {
      console.log('音频进入可以播放状态事件');
      data.isCanplay = true;
      // #ifdef MP
      // 微信小程序安卓端过早的时机获取的volume为undefine，改为在此处获取
      data.volume = data._audioContext!.volume;
      // #endif
      // 当音频可以播放时，获取缓冲信息
      data.buffered = data._audioContext!.buffered;
      data.duration = data._audioContext!.duration
    });
  }

  const onchanging = () => {
    data._isChanging = true;
  }

  const setAutoplay = () => {
    data._audioContext!.autoplay = !data._audioContext!.autoplay;
    console.log(data._audioContext!.autoplay, 'autoplay');
  }

  const setLoop = () => {
    data._audioContext!.loop = !data._audioContext!.loop;
    console.log(data._audioContext!.loop, 'loop');
  }

	const setObeyMuteSwitch = () => {
	  data._audioContext!.obeyMuteSwitch = !data._audioContext!.obeyMuteSwitch;
	  console.log(data._audioContext!.obeyMuteSwitch, 'obeyMuteSwitch');
	}


  const onSeeking = () => {
    data._audioContext!.onSeeking(() => {
      console.log('音频进行 seek 操作事件');
      data.onSeekingTest = true
    });
  }

  const onSeeked = () => {
    data._audioContext!.onSeeked(() => {
      console.log('音频完成 seek 操作事件');
      data.onSeekedTest = true
    });
  }

  const onchange = (e : UniSliderChangeEvent) => {
    let pos = e.detail.value;
    console.log('pos', pos);
    onSeeking()
    onSeeked()
    data._audioContext!.seek(pos);
    data._isChanging = false;
  }

  const onchangeValue = (pos : number) => {
    onSeeking()
    onSeeked()
    data._audioContext!.seek(pos);
    data._isChanging = false;
  }

  const startTimeInput = (e : UniInputEvent) => {
    let startTimeValue = parseInt(e.detail.value)
    data._audioContext!.startTime = startTimeValue;
    onchangeValue(startTimeValue)
  }

  const play = () => {
    if (!data.isCanplay) {
      uni.showToast({
        title: '音频未进入可以播放状态，请稍后再试',
        icon: 'error'
      });
      return;
    }
    data.isPlaying = true;
    data._audioContext!.play();
    data.isPlayEnd = false;
    if (data._audioContext!.startTime > 0) {
      onchangeValue(data._audioContext!.startTime)
    }
  }

  const onWaiting = () => {
    data._audioContext!.onWaiting(onWaitingCb.value);
  }

  const offWaiting = () => {
    data._audioContext!.offWaiting(onWaitingCb.value);
  }

  const onTimeUpdate = () => {
    data._audioContext!.onTimeUpdate(onTimeUpdateCb.value);
  }

  const offTimeUpdate = () => {
    data._audioContext!.offTimeUpdate(onTimeUpdateCb.value);
  }

  const increaseVolume = () => {
    data.volume = Math.min(data.volume + 0.1, 1);
    data.volume = parseFloat(data.volume.toFixed(1));
    data._audioContext!.volume = data.volume
    console.log('增加音量', data.volume);
  }

  const decreaseVolume = () => {
    data.volume = Math.max(data.volume - 0.1, 0);
    data.volume = parseFloat(data.volume.toFixed(1));
    console.log('减少音量', data.volume);
    data._audioContext!.volume = data.volume
  }

  const onEnded = () => {
    data._audioContext!.onEnded(() => {
      console.log('播放结束');
      data.currentTime = 0;
      data.startTime = 0
      data.isPlaying = false;
      data.isPaused = true;
      data.isPlayEnd = true;
      sliderRef.value!.value = 0
    });
  }

  const onError = () => {
    data._audioContext!.onError((err) => {
      console.log('err', err);
      data.isPlaying = false;
      data.isPaused = true;
    });
  }

  const pause = () => {
    data._audioContext!.onPause(() => {
      console.log('音频暂停事件');
      data.isPaused = true;
    });
    data._audioContext!.pause();
    data.isPlaying = false;
  }

  const destory = () => {
    if (data._audioContext != null) {
      data.isPlaying = false;
      data._audioContext!.destroy()
    }
  }

  const playbackRateChange = (e : UniRadioGroupChangeEvent) => {
    // if (data._audioContext != null && data.isPlaying) {
    console.log(parseFloat(e.detail.value))
    data._audioContext!.playbackRate = parseFloat(e.detail.value)
    // }
  }

  //just for test
  const setSrc = (src : string) => {
    if (data._audioContext != null) {
      data._audioContext!.src = src
    }
  }

  onReady(() => {
    data._audioContext = uni.createInnerAudioContext();
    data._audioContext!.src = audioUrl;
    data.volume = data._audioContext!.volume;
    onCanplay()
    data._audioContext!.onPlay(() => {
      data.isPaused = false;
      data.isPlaying = true;
      console.log('开始播放', data.isPaused);
    });

    onTimeUpdateCb.value = (res : any) => {
      if (data._isChanging) { return; }
      data.currentTime = data._audioContext!.currentTime;
      data.buffered = data._audioContext!.buffered;
      console.log('onTimeUpdateCb', data.currentTime)

      // #ifdef MP
      // 微信小程序安卓端过早的时机获取的buffered、duration为0，改为在此处获取
      if (data._audioContext!.duration === 0) {
        data.buffered = data._audioContext!.buffered;
        data.duration = data._audioContext!.duration
      }
      // #endif
      if (data.currentTime > data.buffered) {
        console.log('缓冲不足');
      }
    };

    onWaitingCb.value = (res : any) => {
      console.log('音频加载中事件');
      data.onWaitingTest = true
    }

    onTimeUpdate()
    // onWaiting()
    onError()
    onEnded()
  })

  onUnload(() => {
    if (data._audioContext != null) {
      if (data.isPlaying) {
        stop();
      }
      data._audioContext!.destroy()
    }
  })

  defineExpose({
    data,
    setSrc,
    play,
    stop,
    pause,
    onchangeValue
  })
</script>
<style>
  .play-time-area {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }

  .duration {
    margin-left: auto;
  }

  .play-button-area {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 50px 0;
  }

  .icon-play {
    width: 60px;
    height: 60px;
  }
</style>

```

:::


<!-- ## uni.setInnerAudioOption() @setinneraudiooption -->

::: sourceCode
## uni.setInnerAudioOption(option) @setinneraudiooption

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-createInnerAudioContext


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-createInnerAudioContext

:::

设置 InnerAudioContext 的播放选项，需要在InnerAudioContext对象调用音频播放前设置才生效。

### setInnerAudioOption 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.73 | 4.81 | 4.81 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **SetInnerAudioOptionOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| mixWithOther | boolean | 否 | true | Web: 4.0; 微信小程序: 4.41; Android: 4.73; iOS: 4.81; iOS uni-app x UTS 插件: 4.81; HarmonyOS: x | 是否与其他音频混播，设置为 true 之后，不会终止其他应用或应用内的音频； 设置为false之后，会暂停背景音频和三方app音频 |
| speakerOn | boolean | 否 | true | Web: 4.0; 微信小程序: 4.41; Android: 5.0; iOS: 5.0; iOS uni-app x UTS 插件: 5.0; HarmonyOS: x | true 代表用扬声器播放，false 代表听筒播放 |
| obeyMuteSwitch | boolean | 否 | true | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: 5.0; iOS uni-app x UTS 插件: 5.0; HarmonyOS: x | （仅在 iOS 生效）是否遵循静音开关，设置为 false 之后，即使是在静音模式下，也能播放声音 |
| success | (result: SetInnerAudioOptionSuccess) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.73; iOS: 4.81; iOS uni-app x UTS 插件: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (result: [ICreateInnerAudioContextFail](#icreateinneraudiocontextfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.73; iOS: 4.81; iOS uni-app x UTS 插件: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.73; iOS: 4.81; iOS uni-app x UTS 插件: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.media.setInnerAudioOption)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.setInnerAudioOption.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setInnerAudioOption&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setInnerAudioOption&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setInnerAudioOption&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setInnerAudioOption&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setInnerAudioOption)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setInnerAudioOption&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/set-inner-audio-option/set-inner-audio-option.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/set-inner-audio-option/set-inner-audio-option.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/set-inner-audio-option/set-inner-audio-option

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/set-inner-audio-option/set-inner-audio-option

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-head title="setInnerAudioOption"></page-head>
    <text class="labelText">是否允许与其他音频同时播放</text>
    <radio-group class="uni-flex radioGroup" @change="(event:UniRadioGroupChangeEvent)=>handleRadioChange(event, 'mixWithOther')">
      <radio value="1" :checked="true">是</radio>
      <radio value="0" class="radioItem">否</radio>
    </radio-group>

    <text class="labelText">是否允许扬声器播放</text>
    <radio-group class="uni-flex radioGroup" @change="(event:UniRadioGroupChangeEvent)=>handleRadioChange(event, 'speakerOn')">
      <radio value="1" :checked="true">是</radio>
      <radio value="0" class="radioItem">否</radio>
    </radio-group>

<!-- #ifdef APP-IOS -->
    <text class="labelText">（仅在 iOS 生效）是否遵循静音开关，设置为 false 之后，即使是在静音模式下，也能播放声音</text>
    <radio-group class="uni-flex radioGroup" @change="(event:UniRadioGroupChangeEvent)=>handleRadioChange(event, 'obeyMuteSwitch')">
      <radio value="1" :checked="true">是</radio>
      <radio value="0" class="radioItem">否</radio>
    </radio-group>
<!-- #endif -->

    <view class="buttonContainer">
      <button @click="playBackgroundMusic" type="primary" class="radioGroup">播放背景音频</button>
      <button @click="pauseBackgroundMusic" type="primary" class="radioGroup">暂停背景音频</button>
      <button @click="stopBackgroundMusic" type="primary" class="radioGroup">停止背景音频</button>

      <button @click="playInnerMusic" type="primary" class="radioGroup">播放音频</button>
      <button @click="pauseInnerMusic" type="primary" class="radioGroup">暂停音频</button>
      <button @click="stopInnerMusic" type="primary" class="radioGroup">停止音频</button>
    </view>
    <view style="padding: 16px 8px;">
      <text>1. uni.setInnerAudioOption需要与uni.createInnerAudioContext搭配才会生效 \n </text>
      <text>2. 设置mixWithOther为true时，会暂停其他App的音频和背景音频 \n</text>
      <text>3. speakerOn参数：Android不支持在播放音频的过程中切换为扬声器播放，iOS支持播放状态时动态切换 \n</text>
      <text>4. obeyMuteSwitch参数：仅支持iOS</text>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type DataType = {
    isBackgroundAudioPaused: boolean,
    mixWithOther: boolean,
    speakerOn: boolean,
    obeyMuteSwitch: boolean,
  }

  // 使用reactive包装数据，便于自动化测试获取
  const data = reactive({
    isBackgroundAudioPaused: false,
    mixWithOther: true,
    speakerOn: true,
    obeyMuteSwitch: true,
  } as DataType)

  const backgroundManager = ref<BackgroundAudioManager | null>(null)
  const innerAudio = ref<InnerAudioContext | null>(null)

  onUnload(() => {
    backgroundManager.value?.stop()
    innerAudio.value?.stop()
    innerAudio.value?.destroy()
  })

  function playBackgroundMusic() {
    if (backgroundManager.value == null) {
      backgroundManager.value = uni.getBackgroundAudioManager()
      backgroundManager.value.onPause(() => {
        data.isBackgroundAudioPaused = true
      })
    } else {
      backgroundManager.value!.stop()
    }
    backgroundManager.value!.src = 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3'
    backgroundManager.value!.coverImgUrl = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png';
    backgroundManager.value!.play()
  }

  function pauseBackgroundMusic() {
    backgroundManager.value?.pause()
  }

  function stopBackgroundMusic() {
    backgroundManager.value?.stop()
  }

  function playInnerMusic() {
    if (innerAudio.value == null)
      innerAudio.value = uni.createInnerAudioContext()
    else {
      innerAudio.value!.stop()
    }
    innerAudio.value!.src = 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3'
    innerAudio.value!.play()
  }

  function pauseInnerMusic() {
    innerAudio.value?.pause()
  }

  function stopInnerMusic() {
    innerAudio.value?.stop()
  }

  function handleRadioChange(event : UniRadioGroupChangeEvent, propertyName : 'mixWithOther' | 'speakerOn' | 'obeyMuteSwitch') {
    const value = event.detail.value == "1"

    // 使用 switch 语句，意图更明确
    switch (propertyName) {
      case 'mixWithOther':
        data.mixWithOther = value;
        break;
      case 'speakerOn':
        data.speakerOn = value;
        break;
      case 'obeyMuteSwitch':
        data.obeyMuteSwitch = value;
        break;
    }

    uni.setInnerAudioOption({
      mixWithOther: data.mixWithOther,
      speakerOn: data.speakerOn,
      obeyMuteSwitch: data.obeyMuteSwitch
    })
  }

  function testInnerAudioOption() {
    uni.setInnerAudioOption({
      mixWithOther: false
    })
  }

  defineExpose({
    data,
    playBackgroundMusic,
    testInnerAudioOption,
    playInnerMusic
  })


</script>

<style>
.labelText {
  margin-left: 8px
}

.radioGroup {
  margin: 8px
}

.radioItem {
  margin-left: 16px
}

.buttonContainer {
  padding: 8px 8px;
}
</style>

```

:::


## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

