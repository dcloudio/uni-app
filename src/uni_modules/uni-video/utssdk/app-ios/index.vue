<template>
	<view style="width: 300px;height: 225px;">
		<slot />
	</view>
</template>
<script lang="uts">
	import { UniVideoPlayerConfig, UniVideoPlayerViewPresent } from "DCUniVideo"  assert { type: "implementationOnly" };
	import { URL, NSDictionary, CGFloat } from "Foundation";
	import { UIImage, UIInterfaceOrientationMask, UIInterfaceOrientation, UIView, UIScreen, CGRect } from 'UIKit';
	import { Bool, Int } from 'Swift';
	import { Danmu } from "../interface.uts";
	import { UniCssFlexEdge } from "DCloudUniappRuntime";

	export default {
		name: "video",
		data() {
			return {
				present: null as UniVideoPlayerViewPresent | null,
				delegate: null as DCloudUniVideoComponentDelegate | null,
			};
		},
		emits: ["play", "pause", "ended", "timeupdate", "fullscreenchange", "waiting", "error", "progress", "fullscreenclick", "controlstoggle"],
		props: {
			"src": { // 要播放视频的资源地址
				type: String,
				default: ""
			},
			"autoplay": { // 是否自动播放
				type: Boolean,
				default: false
			},
			"loop": { // 是否循环播放
				type: Boolean,
				default: false
			},
			"muted": { // 是否静音播放
				type: Boolean,
				default: false
			},
			"initialTime": { // 指定视频初始播放位置，单位为秒（s）
				type: Number,
				default: 0
			},
			"duration": { // 指定视频时长，单位为秒（s）
				type: Number,
				default: 0
			},
			"controls": { // 是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
				type: Boolean,
				default: true
			},
			"danmuList": { // 弹幕列表
				type: Array as NSDictionary[],
				default: []
			},
			"danmuBtn": { // 是否显示弹幕按钮，只在初始化时有效，不能动态变更
				type: Boolean,
				default: false
			},
			"enableDanmu": { // 是否展示弹幕，只在初始化时有效，不能动态变更
				type: Boolean,
				default: false
			},
			"pageGesture": { // 在非全屏模式下，是否开启亮度与音量调节手势
				type: Boolean,
				default: false
			},
			"direction": { // 设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
				type: Number,
				default: -90
			},
			"showProgress": { // 是否展示进度条，若不设置，宽度大于240时才会显示
				type: Boolean,
				default: true
			},
			"showFullscreenBtn": { // 是否显示全屏按钮
				type: Boolean,
				default: true
			},
			"showPlayBtn": { // 是否显示视频底部控制栏的播放按钮
				type: Boolean,
				default: true
			},
			"showCenterPlayBtn": { // 是否显示视频中间的播放按钮
				type: Boolean,
				default: true
			},
			"showLoading": { // 是否显示loading控件
				type: Boolean,
				default: true
			},
			"enableProgressGesture": { // 是否开启控制进度的手势
				type: Boolean,
				default: true
			},
			"objectFit": { // 当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖
				type: String,
				default: "contain"
			},
			"poster": { // 视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效	
				type: String,
				default: ""
			},
			"showMuteBtn": { // 是否显示静音按钮
				type: Boolean,
				default: false
			},
			"title": { // 视频的标题，全屏时在顶部展示
				type: String,
				default: ""
			},
			"enablePlayGesture": { // 是否开启播放手势，即双击切换播放/暂停
				type: Boolean,
				default: false
			},
			"vslideGesture": { // 在非全屏模式下，是否开启亮度与音量调节手势（同 page-gesture）
				type: Boolean,
				default: false
			},
			"vslideGestureInFullscreen": { // 在全屏模式下，是否开启亮度与音量调节手势
				type: Boolean,
				default: true
			},
			"codec": { // 解码器选择，hardware：硬解码（硬解码可以增加解码算力，提高视频清晰度。少部分老旧硬件可能存在兼容性问题）；software：ffmpeg 软解码；
				type: String,
				default: "hardware"
			},
			"httpCache": { // 是否对 http、https 视频源开启本地缓存。缓存策略:开启了此开关的视频源，在视频播放时会在本地保存缓存文件，如果本地缓存池已超过100M，在进行缓存前会清空之前的缓存（不适用于m3u8等流媒体协议）
				type: Boolean,
				default: false
			},
			"playStrategy": { // 播放策略，0：普通模式，适合绝大部分视频播放场景；1：平滑播放模式（降级），增加缓冲区大小，采用open sl解码音频，避免音视频脱轨的问题，可能会降低首屏展现速度、视频帧率，出现开屏音频延迟等。 适用于高码率视频的极端场景；2： M3U8优化模式，增加缓冲区大小，提升视频加载速度和流畅度，可能会降低首屏展现速度。 适用于M3U8在线播放的场景
				type: Number,
				default: 0
			},
			"header": { // HTTP 请求 Header
				type: Map<string, string>,
				default: new Map<string, string>()
			},
		},
		watch: {
			"src": {
				handler(newValue : String, oldValue : String) {
					"[weak self]"
					this?.updateProp("src", newValue);
				},
				immediate: false
			},
			"autoplay": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("autoplay", newValue);
				},
				immediate: false
			},
			"loop": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("loop", newValue);
				},
				immediate: false
			},
			"muted": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("muted", newValue);
				},
				immediate: false
			},
			"initialTime": {
				handler(newValue : Number, oldValue : Number) {
					"[weak self]"
					this?.updateProp("initialTime", newValue);
				},
				immediate: false
			},
			"duration": {
				handler(newValue : Number, oldValue : Number) {
					"[weak self]"
					this?.updateProp("duration", newValue);
				},
				immediate: false
			},
			"controls": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("controls", newValue);
				},
				immediate: false
			},
			"danmuList": {
				handler(newValue : NSDictionary[], oldValue : NSDictionary[]) {
					"[weak self]"
					this?.updateProp("danmuList", newValue);
				},
				immediate: false
			},
			"danmuBtn": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("danmuBtn", newValue);
				},
				immediate: false
			},
			"enableDanmu": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("enableDanmu", newValue);
				},
				immediate: false
			},
			"pageGesture": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("pageGesture", newValue);
				},
				immediate: false
			},
			"direction": {
				handler(newValue : Number, oldValue : Number) {
					"[weak self]"
					this?.updateProp("direction", newValue);
				},
				immediate: false
			},
			"showProgress": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("showProgress", newValue);
				},
				immediate: false
			},
			"showFullscreenBtn": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("showFullscreenBtn", newValue);
				},
				immediate: false
			},
			"showPlayBtn": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("showPlayBtn", newValue);
				},
				immediate: false
			},
			"showCenterPlayBtn": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("showCenterPlayBtn", newValue);
				},
				immediate: false
			},
			"showLoading": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("showLoading", newValue);
				},
				immediate: false
			},
			"enableProgressGesture": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("enableProgressGesture", newValue);
				},
				immediate: false
			},
			"objectFit": {
				handler(newValue : String, oldValue : String) {
					"[weak self]"
					this?.updateProp("objectFit", newValue);
				},
				immediate: false
			},
			"poster": {
				handler(newValue : String, oldValue : String) {
					"[weak self]"
					this?.updateProp("poster", newValue);
				},
				immediate: false
			},
			"showMuteBtn": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("showMuteBtn", newValue);
				},
				immediate: false
			},
			"title": {
				handler(newValue : String, oldValue : String) {
					"[weak self]"
					this?.updateProp("title", newValue);
				},
				immediate: false
			},
			"enablePlayGesture": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("enablePlayGesture", newValue);
				},
				immediate: false
			},
			"vslideGesture": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("vslideGesture", newValue);
				},
				immediate: false
			},
			"vslideGestureInFullscreen": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("vslideGestureInFullscreen", newValue);
				},
				immediate: false
			},
			"httpCache": {
				handler(newValue : Boolean, oldValue : Boolean) {
					"[weak self]"
					this?.updateProp("httpCache", newValue);
				},
				immediate: false
			},
			"codec": {
				handler(newValue : string, oldValue : string) {
					"[weak self]"
					this?.updateProp("codec", newValue);
				},
				immediate: false
			},
			"playStrategy": {
				handler(newValue : number, oldValue : number) {
					"[weak self]"
					this?.updateProp("playStrategy", newValue);
				},
				immediate: false
			},
			"header": {
				handler(newValue : Map<string, any>, oldValue : Map<string, any>) {
					"[weak self]"
					let newStr = JSON.stringify(newValue)
					let oldStr = JSON.stringify(oldValue)
					if (newStr != oldStr) {
						this?.updateProp("header", newValue);
					}
				},
				immediate: false
			}
		},

		created() {
			let config = UniVideoPlayerConfig.init(options = this.attributes)
			this.delegate = new DCloudUniVideoComponentDelegate(this)
			this.present = new UniVideoPlayerViewPresent.init(config, this.delegate)
			if (this.delegate != null) {
				this.present!.delegate = this.delegate
			}
		},

		NVLoad() : UIView {
			if (this.present != null) {
				return this.present!.contentView;
			} else {
				return new UIView()
			}
		},

		NVLayouted() {
			if (!UTSiOS.isScreenLocked()) {
				this.present?.updateViewFrame(this.calculatedFrame);
			}
		},

		unmounted() { //释放播放器
			this.present?.destroy();
		},

		expose: ['play', 'pause', 'seek', 'stop', 'sendDanmu', 'playbackRate', 'requestFullScreen', 'exitFullScreen', 'showStatusBar', 'hideStatusBar'],

		methods: {
			/**
			 * 播放视频
			 */
			play: function () {
				this.present?.play()
			},
			/**
			 * 暂停视频
			 */
			pause: function () {
				this.present?.pause()
			},
			/**
			 * 跳转到指定位置
			 * @param pos 跳转到的位置，单位：秒（s）
			 */
			seek: function (pos : number) {
				this.present?.seek(pos.floatValue)
			},
			/**
			 * 切换到全屏
			 * @param direction 视频方向，0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
			 */
			requestFullScreen: function (direction : number) {
				let dir = UniVideoPlayerConfig.direction(direction)
				this.present?.requestFullScreen(dir)
			},
			/**
			 * 退出全屏
			 */
			exitFullScreen: function () {
				this.present?.exitFullScreenForJS()
			},
			/**
			 * 停止播放视频
			 */
			stop: function () {
				this.present?.stop()
			},
			/** 
			 * 显示状态栏，仅在iOS全屏下有效
			 */
			showStatusBar: function () {
				this.present?.showStatusBar()
			},
			/**
			 * 隐藏状态栏，仅在iOS全屏下有效
			 */
			hideStatusBar: function () {
				this.present?.hideStatusBar()
			},

			/**
			 * 发送弹幕
			 * @param data 弹幕数据
			 */
			sendDanmu: function (data : Map<string, any>) {
				this.present?.sendDanmu(data)
			},
			/**
			 * 设置倍速播放
			 * @param rate 播放的倍率
			 */
			playbackRate: function (rate : string) {
				this.present?.palybackRate(rate);
			},

			updateProp: function (key : string, value : any | null) {
				DispatchQueue.main.async(execute = () : void => {
					this.present?.setControlValue(value, key)
				})

			}
		}
	}
	@UTSiOS.keyword("private")
	class DCloudUniVideoComponentDelegate implements UniVideoPlayerProtocol {
		@UTSiOS.keyword("weak")
		private component : VideoComponent | null = null
		private originalFrame : CGRect | null = null

		//todotest
		constructor(component : VideoComponent) {
			this.component = component
			super.init()
		}

		getCookieString(url : URL) : string | null {
			return UTSiOS.getCookieString(url)
		}

		getCurrentUA() : string {
			return UTSiOS.getUserAgent()
		}

		sendEvent(name : string, params : Dictionary<string, any> | null) {
			switch (name) {
				case "play":
				case "pause":
				case "waiting":
				case "ended":
				case "error":
				case "click":
					this.component?.__$$emit(name);
					break;
				case "timeupdate":
				case "fullscreenclick":
				case "fullscreenchange":
				case "controlstoggle":
					this.component?.__$$emit(name, params);
					break;
				default:
					break;
			}
		}

		loadImage(url : string, complete : (image : UIImage) => void) {
			UTSiOS.loadImage(url, (image, data) => {
				if (image != null) {
					complete(image!);
				}
			});
		}

		lockScreen() {
			UTSiOS.lockScreen()
		}

		unlockScreen() {
			UTSiOS.unlockScreen()
		}

		setFullScreen(yesOrNo : boolean) {
			UTSiOS.setFullScreen(yesOrNo)
		}

		setHomeIndicatorAutoHidden(yesOrNo : boolean) {
			UTSiOS.setHomeIndicatorAutoHidden(yesOrNo)
		}

		setTempOrientation(temp : UIInterfaceOrientationMask) {
			UTSiOS.setTempOrientation(temp)
		}

		configSupportOrientation(orientation : UIInterfaceOrientation) : boolean {
			return UTSiOS.configSupportOrientation(orientation)
		}

		setDeviceInterfaceOrientation(orientation : UIInterfaceOrientation) {
			UTSiOS.setDeviceInterfaceOrientation(orientation)
		}

		h5Path2SysPath(path : string, basePath : string | null) : string {
			return UTSiOS.getResourceAbsolutePath(path, basePath)
		}

		workRootPath() : string {
			return UTSiOS.getWorkRootPath()
		}

		videoPlayerWillEnterFullScreen(orientation : UIInterfaceOrientation) {
			this.originalFrame = this.component?.view.frame
			const deviceSize = UIScreen.main.bounds.size
			const min = min(deviceSize.width, deviceSize.height)
			const max = max(deviceSize.width, deviceSize.height)
			if (orientation == UIInterfaceOrientation.portrait) {
				this.component?.setStyleWidth(width = Float(min))
				this.component?.setStyleHeight(height = Float(max))
			} else {
				this.component?.setStyleWidth(width = Float(max))
				this.component?.setStyleHeight(height = Float(min))
			}
			this.component?.domNode?.setPositionEdge(UniCssFlexEdge.top, value = -Float(this.originalFrame?.minY ?? 0))
			this.component?.domNode?.setPositionEdge(UniCssFlexEdge.left, value = -Float(self.originalFrame?.minX ?? 0))
			this.component?.setNeedsLayout()
		}

		videoPlayerWillExitFullScreen(orientation : UIInterfaceOrientation) {
			if (this.originalFrame != null) {
				const width = this.originalFrame!.size.width
				const height = this.originalFrame!.size.height
				this.component?.setStyleWidth(width = Float(width))
				this.component?.setStyleHeight(height = Float(height))
				this.component?.domNode?.setPositionEdge(UniCssFlexEdge.top, value = 0)
				this.component?.domNode?.setPositionEdge(UniCssFlexEdge.left, value = 0)
				this.component?.setNeedsLayout()
			}
		}

		videoPlayerExitFullScreen(orientation : UIInterfaceOrientation) {

		}

		videoPlayerEnterFullScreen(orientation : UIInterfaceOrientation) {

		}

		videoCacheDir() : string {
			return UTSiOS.getVideoCacheDir()
		}
	}
</script>