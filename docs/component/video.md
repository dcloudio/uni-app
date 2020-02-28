#### video
视频。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|基础库1.10.0+|√|√|√|

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|src|String||要播放视频的资源地址||
|autoplay|Boolean|false|是否自动播放||
|loop|Boolean|false|是否循环播放|头条小程序不支持|
|muted|Boolean|false|是否静音播放|头条小程序不支持|
|initial-time|Number||指定视频初始播放位置，单位为秒（s）。|头条小程序不支持|
|duration|Number||指定视频时长，单位为秒（s）。|头条小程序不支持|
|controls|Boolean|true|是否显示默认播放控件（播放/暂停按钮、播放进度、时间）|头条小程序不支持|
|danmu-list|Object Array||弹幕列表|头条小程序不支持|
|danmu-btn|Boolean|false|是否显示弹幕按钮，只在初始化时有效，不能动态变更|头条小程序不支持|
|enable-danmu|Boolean|false|是否展示弹幕，只在初始化时有效，不能动态变更|头条小程序不支持|
|page-gesture|Boolean|false|在非全屏模式下，是否开启亮度与音量调节手势|微信小程序、H5|
|direction|Number||设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）|H5和头条小程序不支持|
|show-progress|Boolean|true|若不设置，宽度大于240时才会显示|头条小程序不支持|
|show-fullscreen-btn|Boolean|true|是否显示全屏按钮|头条小程序不支持|
|show-play-btn|Boolean|true|是否显示视频底部控制栏的播放按钮|头条小程序不支持|
|show-center-play-btn|Boolean|true|是否显示视频中间的播放按钮|头条小程序不支持|
|enable-progress-gesture|Boolean|true|是否开启控制进度的手势|头条小程序不支持|
|objectFit|String|contain|当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖|微信小程序、H5|
|poster|String||视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效|头条小程序不支持|
|show-mute-btn|Boolean|false|是否显示静音按钮|微信小程序|
|title|String||视频的标题，全屏时在顶部展示|微信小程序|
|play-btn-position|String|bottom|播放按钮的位置|微信小程序|
|enable-play-gesture|Boolean|false|是否开启播放手势，即双击切换播放/暂停|微信小程序|
|auto-pause-if-navigate|Boolean|true|当跳转到其它小程序页面时，是否自动暂停本页面的视频|微信小程序|
|auto-pause-if-open-native|Boolean|true|当跳转到其它微信原生页面时，是否自动暂停本页面的视频|微信小程序|
|vslide-gesture|Boolean|false|在非全屏模式下，是否开启亮度与音量调节手势（同 page-gesture）|微信小程序|
|vslide-gesture-in-fullscreen|Boolean|true|在全屏模式下，是否开启亮度与音量调节手势|微信小程序|
|ad-unit-id|String||视频前贴广告单元ID，更多详情可参考开放能力[视频前贴广告](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/ad/video-patch-ad.html)|微信小程序|
|poster-for-crawler|String||用于给搜索等场景作为视频封面展示，建议使用无播放 icon 的视频封面图，只支持网络地址|微信小程序|
|@play|EventHandle||当开始/继续播放时触发play事件|头条小程序不支持|
|@pause|EventHandle||当暂停播放时触发 pause 事件|头条小程序不支持|
|@ended|EventHandle||当播放到末尾时触发 ended 事件|头条小程序不支持|
|@timeupdate|EventHandle||播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次|头条小程序不支持|
|@fullscreenchange|EventHandle||当视频进入和退出全屏时触发，event.detail = {fullScreen, direction}，direction取为 vertical 或 horizontal|头条小程序不支持|
|@waiting|EventHandle||视频出现缓冲时触发|头条小程序不支持|
|@error|EventHandle||视频播放出错时触发|头条小程序不支持|
|@progress|EventHandle||加载进度变化时触发，只支持一段加载。event.detail = {buffered}，百分比|微信小程序、H5|
|@loadedmetadata|EventHandle||视频元数据加载完成时触发。event.detail = {width, height, duration}|微信小程序、H5|
|@fullscreenclick|EventHandle||视频播放全屏播放时点击事件。event.detail = { screenX:"Number类型，点击点相对于屏幕左侧边缘的 X 轴坐标", screenY:"Number类型，点击点相对于屏幕顶部边缘的 Y 轴坐标", screenWidth:"Number类型，屏幕总宽度", screenHeight:"Number类型，屏幕总高度"}|App 2.6.3+|

`<video>` 默认宽度 300px、高度 225px，可通过 css 设置宽高。


**示例** [查看示例](https://uniapp.dcloud.io/h5/pages/component/video/video)
 
```html
<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <view>
                <video id="myVideo" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
            </view>
            <!-- #ifndef MP-ALIPAY -->
            <view class="uni-list uni-common-mt">
                <view class="uni-list-cell">
                    <view>
                        <view class="uni-label">弹幕内容</view>
                    </view>
                    <view class="uni-list-cell-db">
                        <input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
                    </view>
                </view>
            </view>
            <view class="uni-btn-v">
                <button @click="sendDanmu" class="page-body-button">发送弹幕</button>
            </view>
            <!-- #endif -->
        </view>
    </view>
</template>
```
 
```javascript
export default {
    data() {
        return {
            src: '',
            danmuList: [{
                    text: '第 1s 出现的弹幕',
                    color: '#ff0000',
                    time: 1
                },
                {
                    text: '第 3s 出现的弹幕',
                    color: '#ff00ff',
                    time: 3
                }
            ],
            danmuValue: ''
        }
    },
    onReady: function(res) {
        // #ifndef MP-ALIPAY
        this.videoContext = uni.createVideoContext('myVideo')
        // #endif
    },
    methods: {
        sendDanmu: function() {
            this.videoContext.sendDanmu({
                text: this.danmuValue,
                color: this.getRandomColor()
            });
            this.danmuValue = '';
        },
        videoErrorCallback: function(e) {
            uni.showModal({
                content: e.target.errMsg,
                showCancel: false
            })
        },
        getRandomColor: function() {
            const rgb = []
            for (let i = 0; i < 3; ++i) {
                let color = Math.floor(Math.random() * 256).toString(16)
                color = color.length == 1 ? '0' + color : color
                rgb.push(color)
            }
            return '#' + rgb.join('')
        }
    }
}
```

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/video.png)

相关api：[uni.createVideoContext](/api/media/video-context?id=createvideocontext)

**注意**
 
- 视频播放格式说明：
	* H5平台：支持支持的视频格式视浏览器而定，一般通用的都支持：mp4、webm 和 ogg。（``<video/>`` 组件编译到 H5 时会替换为标准 html 的 video 标签）。H5端也可以自行在条件编译里使用video.js等三方库，这些库可以自动判断环境兼容以决定使用标准video或flash来播放。
	* 小程序平台：各小程序平台支持程度不同，详见各家文档：[微信小程序视频组件文档](https://developers.weixin.qq.com/miniprogram/dev/component/video.html)、[支付宝小程序video组件](https://docs.alipay.com/mini/component/video)、[百度小程序视频组件文档](https://smartprogram.baidu.com/docs/develop/component/media/#video/)、[头条小程序视频组件文档](https://developer.toutiao.com/dev/cn/mini-app/develop/component/media-component/video)
	* App平台： 支持本地视频(mp4/flv)、网络视频地址（mp4/flv/m3u8）及流媒体（rtmp/hls/rtsp）。

- video全屏后，如何自行绘制界面？比如加个标题、加个分享按钮
	* 微信基础库 2.4.0 以上可通过cover-view来绘制界面覆盖元素
	* app端 2.1.5 以上nvue页面的video也可以通过cover-view来绘制界面覆盖元素
	* H5端可通过通用h5做法实现
	* 其他端无法全屏后自行绘制内容

- 如何实现抖音、映客等全屏视频垂直滑动切换效果？
	* 微信基础库 2.4.0 和 app端nvue 2.1.5 以上，可通过在垂直的swiper中内嵌video来实现。原生导航栏设置为custom，视频长宽设为手机屏幕大小，通过cover-view覆盖视频内容。插件市场有相关[示例](https://ext.dcloud.net.cn/search?q=%E6%8A%96%E9%9F%B3)

- `<video/>` 组件在非H5端是原生组件，层级高于普通前端组件，覆盖其需要使用[cover-view](https://uniapp.dcloud.io/component/cover-view?id=cover-view)组件或plus.nativeObj.view、subNVue。微信基础库 2.4.0 起已支持 video 组件的同层渲染，也就是video在非全屏时，可以被前端元素通过调节zindex来遮挡，但video全屏时，仍需要cover-view覆盖。
- 除微信基础库 2.4.0 和app端nvue页面 2.1.5 以上，其他情况下非H5的video不能放入scroll-view和swiper。注意参考 [原生组件使用限制](/component/native-component)。

- App平台：使用 `<video/>` 组件，打包 App 时必须勾选 manifest.json->App 模块权限配置->VideoPlayer 模块。
- App平台：如果使用的视频路径为本地路径，需要配置资源为释放模式：在 manifest.json 文件内 app-plus 节点下新增 runmode 配置，设置值为liberate。
- App平台：如果想使用非原生的video，即原来普通的html5自带video，可使用web-view组件load html页面，在其中使用普通h5 video。
- H5平台： 在部分浏览器中会强制调用原生播放器播放（如：微信内置浏览器、UC浏览器等），在 x5 内核的浏览器中支持配置[同层播放器](https://x5.tencent.com/tbs/guide/video.html)。
