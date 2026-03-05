<template>
	<view style="width: 300px;height: 225px;">
		<slot />
	</view>
</template>

<script lang="uts">
	import IjkPlayerView from 'io.dcloud.media.video.ijkplayer.media.IjkPlayerView';
	import OnPlayerChangedListener from 'io.dcloud.media.video.ijkplayer.media.OnPlayerChangedListener';
	import OnTextureRenderViewListener from 'io.dcloud.media.video.ijkplayer.media.TextureRenderView.OnTextureRenderViewListener';
	import EnumPlayStrategy from 'io.dcloud.media.video.ijkplayer.option.EnumPlayStrategy';
	import MediaPlayerParams from 'io.dcloud.media.video.ijkplayer.media.MediaPlayerParams';

	import OnInfoListener from 'tv.danmaku.ijk.media.player.IMediaPlayer.OnInfoListener';
	import IMediaPlayer from 'tv.danmaku.ijk.media.player.IMediaPlayer';
	import OnBufferingUpdateListener from 'tv.danmaku.ijk.media.player.IMediaPlayer.OnBufferingUpdateListener';
	import OnErrorListener from "tv.danmaku.ijk.media.player.IMediaPlayer.OnErrorListener";

	import FrameLayout from 'android.widget.FrameLayout';
	import ViewGroup from 'android.view.ViewGroup';
	import OnHierarchyChangeListener from 'android.view.ViewGroup.OnHierarchyChangeListener';
	import View from 'android.view.View';
	import OnKeyListener from 'android.view.View.OnKeyListener';
	import KeyEvent from 'android.view.KeyEvent';
	import WindowManager from 'android.view.WindowManager';
	import TextUtils from 'android.text.TextUtils';
	import JSONObject from 'org.json.JSONObject';
	import MediaPlayer from "android.media.MediaPlayer";
	import Bitmap from 'android.graphics.Bitmap';
	import Handler from 'android.os.Handler';
	import Looper from 'android.os.Looper';
	import DisplayMetrics from 'android.util.DisplayMetrics';
	import Context from 'android.content.Context';

	import Glide from 'com.bumptech.glide.Glide';

	import File from 'java.io.File';

	import { Danmu, RequestFullScreenOptions } from '../interface.uts';
	import { UniVideoTimeUpdateEventDetail, UniVideoFullScreenChangeEventDetail, UniVideoProgressEventDetail, UniVideoFullScreenClickEventDetail, UniVideoControlsToggleEventDetail } from '../interface.uts';
	import { UniVideoTimeUpdateEventImpl, UniVideoFullScreenChangeEventImpl, UniVideoErrorEventImpl, UniVideoProgressEventImpl, UniVideoFullScreenClickEventImpl, UniVideoControlsToggleEventImpl } from './event.uts';
	import { VideoErrorImpl } from '../unierror.uts';

	export default {
		name: "video",
		data() {
			return {
				playerView: null as IjkPlayerView | null,
				currentPos: 0,
				currentFrame: null as Bitmap | null,
				handler: new Handler(Looper.getMainLooper()),
				isEnded: false,
				isFirstLayoutFinished: false,
				screenWidth: 0,
				screenHeight: 0,
				layoutWidth: 0,
				layoutHeight: 0,
				videoBox: null as FrameLayout | null,
				copyPath: ''
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
				type: Array<Danmu>,
				default: new Array<Danmu>()
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
				default: -1
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
				type: UTSJSONObject,
				default: new UTSJSONObject()
			}
		},
		watch: {
			"src": {
				handler(newValue : string, oldValue : string) {
					let path = this.getSrcPath(newValue);
					if (newValue != oldValue) { // 切换资源
						this.playerView?.setCenterPlayBntVisibility(this.showCenterPlayBtn);
						this.playerView?.switchVideoPath(path);
						this.reload(true);
					} else { // 初始化资源
						this.playerView?.setVideoPath(path);
					}
				},
				immediate: false
			},
			"autoplay": {
				handler(value : boolean) {
					// 临时方案
					setTimeout(() => { // 运行在非主线程中
						this.runOnMain(function () {
							if (value && this.playerView?.isPlaying() == false) {
								this.playerView?.start();
							}
						});
					}, 100);
				},
				immediate: false
			},
			"loop": {
				handler(_ : boolean) {
					// do nothing
				},
				immediate: false
			},
			"muted": {
				handler(value : boolean) {
					this.playerView?.setMutePlayer(value);
				},
				immediate: false
			},
			"initialTime": {
				handler(value : number) {
					if (value > 0) this.playerView?.seekTo(value.toInt() * 1000);
				},
				immediate: false
			},
			"duration": {
				handler(value : number) {
					if (value > 0) this.playerView?.setDuration(value.toInt() * 1000);
				},
				immediate: false
			},
			"controls": {
				handler(value : boolean) {
					this.playerView?.setControls(value);
				},
				immediate: false
			},
			"danmuList": {
				handler(value : Array<Danmu>) {
					this.playerView?.setmDanmuList(JSON.stringify(value));
				},
				immediate: false
			},
			"danmuBtn": {
				handler(value : boolean) {
					this.playerView?.enableDanmuBtn(value);
				},
				immediate: false
			},
			"enableDanmu": {
				handler(value : boolean) {
					this.runDelayed(() => {
						this.playerView?.enableDanmaku(value);
						this.playerView?.enableDanmuBtn(this.danmuBtn);
					}, 0);
				},
				immediate: false
			},
			"pageGesture": {
				handler(value : boolean) {
					this.playerView?.setPageGesture(value);
				},
				immediate: false
			},
			"direction": {
				handler(value : number) {
					this.playerView?.setDirection(value.toInt());
				},
				immediate: false
			},
			"showProgress": {
				handler(value : boolean) {
					this.playerView?.setProgressVisibility(value);
				},
				immediate: false
			},
			"showFullscreenBtn": {
				handler(value : boolean) {
					this.playerView?.setFullscreenBntVisibility(value);
				},
				immediate: false
			},
			"showPlayBtn": {
				handler(value : boolean) {
					this.playerView?.setPlayBntVisibility(value);
				},
				immediate: false
			},
			"showCenterPlayBtn": {
				handler(value : boolean) {
					this.playerView?.setCenterPlayBntVisibility(value);
				},
				immediate: false
			},
			"showLoading": {
				handler(value : boolean) {
					this.playerView?.setLoadingVisibility(value);
				},
				immediate: false
			},
			"enableProgressGesture": {
				handler(value : boolean) {
					this.playerView?.setIsEnableProgressGesture(value);
				},
				immediate: false
			},
			"objectFit": {
				handler(value : string) {
					this.playerView?.setScaleType(value);
				},
				immediate: false
			},
			"poster": {
				handler(value : string) {
					if (!TextUtils.isEmpty(value)) {
						let thumb = this.playerView?.mPlayerThumb;
						if (thumb != null) Glide.with(this.$androidContext!).load(value).into(thumb);
					}
				},
				immediate: false
			},
			"showMuteBtn": {
				handler(value : boolean) {
					this.playerView?.isMuteBtnShow(value);
				},
				immediate: false
			},
			"title": {
				handler(value : string) {
					if (!TextUtils.isEmpty(value)) this.playerView?.setTitle(value);
				},
				immediate: false
			},
			"enablePlayGesture": {
				handler(value : boolean) {
					this.playerView?.setmIsDoubleTapEnable(value);
				},
				immediate: false
			},
			"vslideGesture": {
				handler(value : boolean) {
					this.playerView?.setPageGesture(value);
				},
				immediate: false
			},
			"vslideGestureInFullscreen": {
				handler(value : boolean) {
					this.playerView?.setIsFullScreenPageGesture(value);
				},
				immediate: false
			},
			"codec": {
				handler(value : string) {
					this.playerView?.isUseMediaCodec(value == "hardware");
				},
				immediate: false
			},
			"httpCache": {
				handler(value : boolean) {
					this.playerView?.setViewHttpCacheOpen(value);
				},
				immediate: false
			},
			"playStrategy": {
				handler(value : number) {
					let strategy : EnumPlayStrategy;
					switch (value) {
						case EnumPlayStrategy.PLAY_SMOOTH.getFlagVal():
							strategy = EnumPlayStrategy.PLAY_SMOOTH;
							break;
						case EnumPlayStrategy.START_QUICK.getFlagVal():
							strategy = EnumPlayStrategy.START_QUICK;
							break;
						case EnumPlayStrategy.M3U8_SMOOTH.getFlagVal():
							strategy = EnumPlayStrategy.M3U8_SMOOTH;
							break;
						case EnumPlayStrategy.DEFAULT.getFlagVal():
						default:
							strategy = EnumPlayStrategy.DEFAULT;
							break;
					}
					this.playerView?.setFlowStrategy(strategy);
				},
				immediate: false
			},
			"header": {
				handler(newValue : UTSJSONObject, oldValue : UTSJSONObject) {
					const newHeader = JSON.stringify(newValue);
					const oldHeader = JSON.stringify(oldValue);
					this.playerView?.setHeader(newHeader);
					if (newHeader != oldHeader) { // 切换header
						this.playerView?.setCenterPlayBntVisibility(this.showCenterPlayBtn);
						this.playerView?.switchVideoPath(this.getSrcPath(this.src)); // 需要重新加载
						this.reload(true);
					}
				},
				immediate: false
			}
		},
		NVLoad() : IjkPlayerView {
			return new IjkPlayerView(this.$androidContext!);
		},
		NVLoaded() {
			this.playerView = this.$el;
			this.playerView?.init();
			this.playerView?.setOnPlayerChangedListener(new OnPlayerChangedListenerImpl(this));
			this.playerView?.setOnInfoListener(new OnInfoListenerImpl(this));
			this.playerView?.setOnBufferingUpdateListener(new OnBufferingUpdateListenerImpl(this));
			this.playerView?.setOnErrorListener(new OnErrorListenerImpl(this));
			this.playerView?.setOnTextureRenderViewListener(new OnTextureRenderViewListenerImpl(this));
			this.playerView?.setOnHierarchyChangeListener(new OnHierarchyChangeListenerImpl(this));
			this.playerView?.setOnKeyListener(new OnKeyListenerImpl(this));
			this.playerView?.setFocusable(true);
			this.playerView?.setFocusableInTouchMode(true);
		},
		NVLayouted() {
			if (!this.isFirstLayoutFinished) {
				this.isFirstLayoutFinished = true;
				this.playerView?.setPlayerRootView(this.$el!.getParent() as ViewGroup);
				this.layoutWidth = this.getLayoutWidth();
				this.layoutHeight = this.getLayoutHeight();
				const metrics = new DisplayMetrics();
				(this.$androidContext!.getSystemService(Context.WINDOW_SERVICE) as WindowManager).getDefaultDisplay().getRealMetrics(metrics);
				this.screenWidth = metrics.widthPixels;
				this.screenHeight = metrics.heightPixels;
				// 调整子组件视图层级
				this.videoBox = this.playerView?.findViewWithTag<FrameLayout>("fl_video_box");
				if (this.playerView?.getChildCount() ?? 0 > 1) {
					(this.playerView as IjkPlayerView).removeView(this.videoBox);
					(this.playerView as IjkPlayerView).addView(this.videoBox, 0);
				}
			}
		},
		NVUnloaded() { // 资源回收
			if (this.$el != null) { // 如果组件绑定了视图则需要在组件销毁时释放视图相关资源
				this.playerView?.onDestroy();
				this.playerView = null;
			}
			if (!this.copyPath.isEmpty()) {
				const file = new File(this.copyPath);
				if (file.exists()) file.delete();
			}
		},
		NVRecycler() {
			this.playerView = this.$el;
			this.playerView?.reset();
			this.resetListener();
			if (this.currentPos > 0) {
				this.runDelayed(() => {
					this.playerView?.hidePoster();
					this.playerView?.showLastFrame(this.currentFrame);
					this.playerView?.seekTo(this.currentPos.toInt());
				}, 100);
			}
		},
		expose: ['play', 'pause', 'seek', 'requestFullScreen', 'exitFullScreen', 'stop', 'hide', 'show', 'close', 'sendDanmu', 'playbackRate', 'currentPos', 'currentFrame', 'isEnded', 'isFirstLayoutFinished', 'videoBox', 'screenWidth', 'screenHeight', 'layoutWidth', 'layoutHeight'],
		methods: {
			/**
			 * 播放视频
			 */
			play: function () {
				this.runOnMain(function () {
					this.playerView?.start();
				});
			},
			/**
			 * 暂停视频
			 */
			pause: function () {
				this.runOnMain(function () {
					this.playerView?.pause();
				});
			},
			/**
			 * 跳转到指定位置
			 * @param pos 跳转到的位置，单位：秒（s）
			 */
			seek: function (pos : number) {
				this.playerView?.seekTo(pos.toInt() * 1000);
			},
			/**
			 * 切换到全屏
			 * @param direction 视频方向，0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
			 */
			requestFullScreen: function (options : RequestFullScreenOptions | null) {
				this.runOnMain(function () {
					let direction = -1;
					if (options != null) {
						direction = options.direction ?? -1;
					}
					this.playerView?.fullScreen(direction.toInt());
				});
			},
			/**
			 * 退出全屏
			 */
			exitFullScreen: function () {
				this.runOnMain(function () {
					this.playerView?.exitFullScreen();
				});
			},
			/**
			 * 停止播放视频
			 */
			stop: function () {
				this.runOnMain(() => {
					this.playerView?.reset();
					this.playerView?.setCenterPlayBntVisibility(this.showCenterPlayBtn);
					this.reload(false);
					this.currentPos = 0;
					this.currentFrame = null;
				});
			},
			/** 
			 * 隐藏视频播放控件
			 */
			hide: function () {
				this.runOnMain(function () {
					this.$el?.setVisibility(View.INVISIBLE);
				});
			},
			/**
			 * 显示视频播放控件
			 */
			show: function () {
				this.runOnMain(function () {
					this.$el?.setVisibility(View.VISIBLE);
				});
			},
			/**
			 * 关闭视频播放控件
			 */
			close: function () {
				this.runOnMain(function () {
					this.playerView?.stop();
					this.playerView?.onDestroy();
					this.playerView = null;
				});
			},
			/**
			 * 发送弹幕
			 * @param data 弹幕数据
			 */
			sendDanmu: function (danmu : Danmu) {
				this.runOnMain(function () {
					if (!this.enableDanmu) {
						console.error('sendDanmu is disabled, set enable-danmu true first!');
						return;
					}
					const data = new JSONObject();
					data.put('text', danmu.text);
					data.put('color', danmu.color);
					this.playerView?.sendDanmaku(data, true);
				});
			},
			/**
			 * 设置倍速播放
			 * @param rate 播放的倍率
			 */
			playbackRate: function (rate : number) {
				this.playerView?.playbackRate(rate.toString());
			},
			/**
			 * 内部函数
			 * 重新加载
			 * @param autoplay autoplay属性是否生效 切换src、header生效 stop不生效
			 */
			reload: function (autoplay : boolean) {
				this.runOnMain(function () {
					this.playerView?.setDuration(this.duration.toInt() * 1000);
					this.playerView?.seekTo(this.initialTime.toInt() * 1000);
					this.playerView?.setMutePlayer(this.playerView?.isMutePlayer() == true);
					this.playerView?.clearDanma();
					this.playerView?.enableDanmaku(this.enableDanmu);
					if (autoplay && this.autoplay) this.playerView?.start();
				});
			},
			/**
			 * 内部函数
			 * 获取资源路径
			 */
			getSrcPath: function (src : string) : string {
				if (src.startsWith("https://") || src.startsWith("http://") || src.startsWith("rtmp://") || src.startsWith("rtsp://")) { // 网络地址
					return src;
				} else { // 本地地址
					const path = UTSAndroid.convert2AbsFullPath(src);
					if (path.startsWith('/android_asset')) {
						const destDirPath = UTSAndroid.getAppContext()!.getCacheDir().getAbsolutePath() + '/uni-net-cache/video/';
						const destDir = new File(destDirPath);
						if (!destDir.exists()) destDir.mkdirs();
						const destFilePath = destDirPath + path.substring(path.lastIndexOf('/') + 1);
						const destFile = new File(destFilePath);
						if (!destFile.exists()) {
							destFile.createNewFile();
							uni.getFileSystemManager().copyFileSync(src, destFilePath);
						}
						this.copyPath = destFilePath;
						return destFilePath;
					}
					return path;
				}
			},
			/**
			 * 内部函数
			 * runnable切换到主线程执行
			 */
			runOnMain: function (runnable : () => void) {
				this.handler.post(new RunnableImpl(runnable));
			},
			/**
			 * 内部函数
			 * runnable延迟执行
			 */
			runDelayed: function (runnable : () => void, delay : Long) {
				this.handler.postDelayed(new RunnableImpl(runnable), delay);
			},
			/**
			 * 内部函数
			 * 重置监听，复用时调用
			 */
			resetListener: function () {
				this.playerView?.setOnPlayerChangedListener(new OnPlayerChangedListenerImpl(this));
				this.playerView?.setOnInfoListener(new OnInfoListenerImpl(this));
				this.playerView?.setOnBufferingUpdateListener(new OnBufferingUpdateListenerImpl(this));
				this.playerView?.setOnErrorListener(new OnErrorListenerImpl(this));
				this.playerView?.setOnTextureRenderViewListener(new OnTextureRenderViewListenerImpl(this));
				this.playerView?.setOnHierarchyChangeListener(new OnHierarchyChangeListenerImpl(this));
				this.playerView?.setOnKeyListener(new OnKeyListenerImpl(this));
			}
		}
	}

	class RunnableImpl implements Runnable {

		private runnable : (() => void) | null;

		constructor(runnable : (() => void) | null) {
			this.runnable = runnable;
		}

		override run() : void {
			this.runnable?.invoke();
		}
	}

	class OnPlayerChangedListenerImpl implements OnPlayerChangedListener {

		private comp : UTSContainer<IjkPlayerView>;
		private playerView : IjkPlayerView;

		constructor(comp : UTSContainer<IjkPlayerView>) {
			super();
			this.comp = comp;
			this.playerView = comp.$el!;
		}

		override onChanged(type : String, msg : String) : void {
			switch (type) {
				case "timeupdate":
					this.comp.$emit("timeupdate", new UniVideoTimeUpdateEventImpl(JSON.parse<UniVideoTimeUpdateEventDetail>(msg)!));
					break;
				case "fullscreenchange":
					const screenWidth = (this.comp as VideoComponent).screenWidth;
					const screenHeight = (this.comp as VideoComponent).screenHeight;
					const originLayoutWidth = (this.comp as VideoComponent).layoutWidth;
					const originLayoutHeight = (this.comp as VideoComponent).layoutHeight;
					const currentLayoutWidth = (this.comp as VideoComponent).getLayoutWidth();
					const currentLayoutHeight = (this.comp as VideoComponent).getLayoutHeight();
					const detail = JSON.parse<UniVideoFullScreenChangeEventDetail>(msg)!;
					if (detail.fullScreen) {
						if (detail.direction == 'horizontal') {
							if (currentLayoutWidth != screenHeight) this.comp.setStyleWidth(screenHeight.toFloat());
							if (currentLayoutHeight != screenWidth) this.comp.setStyleHeight(screenWidth.toFloat());
						} else if (detail.direction == 'vertical') {
							if (currentLayoutWidth != screenWidth) this.comp.setStyleWidth(screenWidth.toFloat());
							if (currentLayoutHeight != screenHeight) this.comp.setStyleHeight(screenHeight.toFloat());
						}
						setTimeout(() => {
							if (!this.playerView.isFocused()) this.playerView.requestFocus(); 
						}, 100);
					} else {
						if (currentLayoutWidth != originLayoutWidth) this.comp.setStyleWidth(originLayoutWidth.toFloat());
						if (currentLayoutHeight != originLayoutHeight) this.comp.setStyleHeight(originLayoutHeight.toFloat());
						setTimeout(() => {
							if (this.playerView.isFocused()) this.playerView.clearFocus(); 
						}, 100);
					}
					if (detail.fullScreen) { // 进入全屏时取消监听，避免触发暂停逻辑
						this.playerView.setOnTextureRenderViewListener(null);
					} else { // 退出全屏时重新监听
						setTimeout(() => {
							this.playerView.setOnTextureRenderViewListener(new OnTextureRenderViewListenerImpl(this.comp));
						}, 100);
					}
					this.comp.$emit("fullscreenchange", new UniVideoFullScreenChangeEventImpl(detail));
					break;
				case "fullscreenclick":
					this.comp.$emit("fullscreenclick", new UniVideoFullScreenClickEventImpl(JSON.parse<UniVideoFullScreenClickEventDetail>(msg)!));
					break;
				case "controlstoggle":
					const detail = JSON.parse<UniVideoControlsToggleEventDetail>(msg)!;
					if (detail.show && this.playerView.isFullscreen()) {
						setTimeout(() => {
							if (!this.playerView.isFocused()) this.playerView.requestFocus();
						}, 100);
					}
					this.comp.$emit("controlstoggle", new UniVideoControlsToggleEventImpl(detail));
					break;
				case "error":
					this.comp.$emit("error", new UniVideoErrorEventImpl(new VideoErrorImpl(100001)));
					break;
			}
		}
	}

	class OnInfoListenerImpl implements OnInfoListener {

		private comp : UTSContainer<IjkPlayerView>;
		private playerView : IjkPlayerView;

		constructor(comp : UTSContainer<IjkPlayerView>) {
			super();
			this.comp = comp;
			this.playerView = comp.$el!;
		}

		override onInfo(iMediaPlayer : IMediaPlayer | null, status : Int, extra : Int) : boolean {
			switch (status) {
				case MediaPlayerParams.STATE_COMPLETED:
					this.comp.$emit("ended", new UniEvent("ended"));
					(this.comp as VideoComponent).isEnded = true;
					if ((this.comp as VideoComponent).loop) {
						let initialTime = (this.comp as VideoComponent).initialTime;
						if (initialTime > 0) this.playerView.seekTo(initialTime.toInt() * 1000);
						this.playerView.start();
						(this.comp as VideoComponent).isEnded = false;
					}
					break;
				case MediaPlayerParams.STATE_PLAYING:
					this.comp.$emit("play", new UniEvent("play"));
					setTimeout(() => {
						if ((this.comp as VideoComponent).isEnded) {
							let initialTime = (this.comp as VideoComponent).initialTime;
							if (initialTime > 0) this.playerView.seekTo(initialTime.toInt() * 1000);
							(this.comp as VideoComponent).isEnded = false;
						}
					}, 100);
					break;
				case MediaPlayerParams.STATE_PAUSED:
					this.comp.$emit("pause", new UniEvent("pause"));
					break;
				case MediaPlayerParams.STATE_PREPARING:
				case IMediaPlayer.MEDIA_INFO_BUFFERING_START: // 开始缓冲
					this.comp.$emit("waiting", new UniEvent("waiting"));
					break;
				case MediaPlayerParams.STATE_SEEKCOMPLETE:
					// TODO
					break;
			}
			return false;
		}
	}

	class OnBufferingUpdateListenerImpl implements OnBufferingUpdateListener {

		private comp : UTSContainer<IjkPlayerView>;

		constructor(comp : UTSContainer<IjkPlayerView>) {
			super();
			this.comp = comp;
		}

		override onBufferingUpdate(iMediaPlayer : IMediaPlayer | null, i : Int) : void {
			const detail : UniVideoProgressEventDetail = {
				buffered: i
			};
			this.comp.$emit("progress", new UniVideoProgressEventImpl(detail));
		}
	}

	class OnErrorListenerImpl implements OnErrorListener {

		private comp : UTSContainer<IjkPlayerView>;

		constructor(comp : UTSContainer<IjkPlayerView>) {
			super();
			this.comp = comp;
		}

		override onError(iMediaPlayer : IMediaPlayer | null, what : Int, extra : Int) : Boolean {
			if (what == MediaPlayer.MEDIA_ERROR_UNKNOWN) {
				this.comp.$emit("error", new UniVideoErrorEventImpl(new VideoErrorImpl(200001)));
			} else {
				this.comp.$emit("error", new UniVideoErrorEventImpl(new VideoErrorImpl(300001, new SourceError(what + '-' + extra))));
			}
			return true;
		}
	}

	class OnTextureRenderViewListenerImpl implements OnTextureRenderViewListener {

		private comp : UTSContainer<IjkPlayerView>;
		private playerView : IjkPlayerView;

		constructor(comp : UTSContainer<IjkPlayerView>) {
			super();
			this.comp = comp;
			this.playerView = comp.$el!;
		}

		override onDetachedFromWindow() : void {
			if (this.playerView.isPlaying()) {
				this.playerView.pause();
				this.playerView.setCenterPlayBntVisibility((this.comp as VideoComponent).showCenterPlayBtn);
				(this.comp as VideoComponent).currentPos = this.playerView.getCurPosition();
				const frame = this.playerView.captureFrame();
				(this.comp as VideoComponent).currentFrame = frame;
				this.playerView.showLastFrame(frame);
			}
		}
	}

	class OnHierarchyChangeListenerImpl implements OnHierarchyChangeListener {

		private comp : UTSContainer<IjkPlayerView>;
		private playerView : IjkPlayerView;

		constructor(comp : UTSContainer<IjkPlayerView>) {
			super();
			this.comp = comp;
			this.playerView = comp.$el!;
		}

		override onChildViewAdded(parent : View, child : View) : void {
			// 处理子组件动态添加的情况
			if ((this.comp as VideoComponent).isFirstLayoutFinished) {
				if (this.playerView.indexOfChild((this.comp as VideoComponent).videoBox) != 0) {
					this.playerView.removeView((this.comp as VideoComponent).videoBox);
					this.playerView.addView((this.comp as VideoComponent).videoBox, 0);
				}
			}
		}

		override onChildViewRemoved(parent : View, child : View) : void {

		}
	}

	class OnKeyListenerImpl implements OnKeyListener {

		private comp : UTSContainer<IjkPlayerView>;
		private playerView : IjkPlayerView;

		constructor(comp : UTSContainer<IjkPlayerView>) {
			super();
			this.comp = comp;
			this.playerView = comp.$el!;
		}

		override onKey(v : View, keyCode : Int, event : KeyEvent) : Boolean {
			if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_UP) {
				if (this.playerView.isFullscreen()) {
					(this.comp as VideoComponent).exitFullScreen();
					return true;
				}
			}
			return false;
		}
	}
</script>