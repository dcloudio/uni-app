# animation-view

> animation-view组件是[uts插件标准模式组件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)，仅支持 `uni-app-x`, uni-app 请使用`插件市场的另外一个插件`[animation-view](https://ext.dcloud.net.cn/plugin?name=uni-animation-view)。

> uni-app-x 的 animation-view 使用文档：[https://doc.dcloud.net.cn/uni-app-x/component/animation-view.html](https://doc.dcloud.net.cn/uni-app-x/component/animation-view.html)

> uni-app 的 animation-view 组件文档：[https://uniapp.dcloud.net.cn/component/animation-view.html](https://uniapp.dcloud.net.cn/component/animation-view.html)

### 属性说明  

|属性名			|类型					|默认值	|说明																																													|
|:-					|:-						|:-			|:-																																														|
| path			| String			|				| 动画资源地址，支持本地路径和网络路径																												|
| loop			| Boolean			| false	| 动画是否循环播放																																						|
| autoplay	| Boolean			| true	| 动画是否自动播放																																						|
| action		| String			| play	| 动画操作，可取值 play、pause、stop																													|
| @bindended| EventHandle	|				| 当播放到末尾时触发 ended 事件（自然播放结束会触发回调，循环播放结束及手动停止动画不会触发）	|
| @error| EventHandle	|				| 动画路径非法或 Lottie 加载/渲染失败时触发，事件参数符合 UniError 规范	|


**注意**
* App端实现使用了Lottie三方SDK，参考开源项目：
* [Lottie for Android](https://github.com/airbnb/lottie-android),
* [Lottie for iOS](https://github.com/airbnb/lottie-ios),
* [lottie_turbo for harmony](https://gitcode.com/CPF-ApplicationTPC/lottie_turbo),
* 微信小程序端使用了lottie-miniprogram 库：
* [Lottie for MiniProgram](https://github.com/wechat-miniprogram/lottie-miniprogram)

**特别注意**
* harmony 平台下使用 lottie_turbo 播放动画，部分动画播放时会变形，待 lottie_turbo 库官方解决。[详见issue](https://gitcode.com/CPF-ApplicationTPC/lottie_turbo/issues/197)
* 微信小程序 平台下使用 lottie-miniprogram 播放动画，部分动画播放时会变形，待 lottie-miniprogram 库官方解决。[详见issue](https://github.com/wechat-miniprogram/lottie-miniprogram/issues/60)