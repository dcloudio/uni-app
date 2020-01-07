* 基础
  * [日志打印](api/log.md)
  * [定时器](api/timer.md)
  * [uni.base64ToArrayBuffer](api/base64ToArrayBuffer?id=base64toarraybuffer)
  * [uni.arrayBufferToBase64](api/arrayBufferToBase64?id=arraybuffertobase64)
  * [生命周期](api/lifecycle.md)
* 网络
  * [发起请求](api/request/request.md)
  * [上传、下载](api/request/network-file.md)
  * [WebSocket](api/request/websocket.md)
  * [SocketTask](api/request/socket-task.md)
  * [mDNS](api/request/mDNS.md)
  * [UDP 通信](api/request/UDP.md)
* 路由与页面跳转
  * [uni.navigateTo](/api/router?id=navigateto)
  * [uni.redirectTo](/api/router?id=redirectto)
  * [uni.reLaunch](/api/router?id=relaunch)
  * [uni.switchTab](/api/router?id=switchtab)
  * [uni.navigateBack](/api/router?id=navigateback)
  * [窗口动画](/api/router?id=animation)
* 数据缓存
  * [uni.setStorage](/api/storage/storage?id=setstorage)
  * [uni.setStorageSync](/api/storage/storage?id=setStorageSync)
  * [uni.getStorage](/api/storage/storage?id=getStorage)
  * [uni.getStorageSync](/api/storage/storage?id=getStorageSync)
  * [uni.getStorageInfo](/api/storage/storage?id=getStorageInfo)
  * [uni.getStorageInfoSync](/api/storage/storage?id=getStorageInfoSync)
  * [uni.removeStorage](/api/storage/storage?id=removeStorage)
  * [uni.removeStorageSync](/api/storage/storage?id=removeStorageSync)
  * [uni.clearStorage](/api/storage/storage?id=clearStorage)
  * [uni.clearStorageSync](/api/storage/storage?id=clearstoragesync)
* 位置
  * [获取位置](api/location/location.md)
  * [查看位置](api/location/open-location.md)
  * [地图组件控制](api/location/map.md)
* 媒体
  * [图片](api/media/image.md)
  * [录音管理](api/media/record-manager.md)
  * [背景音频播放管理](api/media/background-audio-manager.md)
  * [音频组件控制](api/media/audio-context.md)
  * [视频](api/media/video.md)
  * [视频组件控制](api/media/video-context.md)
  * [相机组件控制](api/media/camera-context.md)
  * [直播组件控制](api/media/live-player-context.md)
  * [富文本](api/media/editor-context.md)
* 设备
  * [系统信息](api/system/info.md)
  * [内存](api/system/memory.md)
  * [网络状态](api/system/network.md)
  * [加速度计](api/system/accelerometer.md)
  * [罗盘](api/system/compass.md)
  * [陀螺仪](api/system/gyroscope.md)
  * [拨打电话](api/system/phone.md)
  * [扫码](api/system/barcode.md)
  * [剪贴板](api/system/clipboard.md)
  * [屏幕](api/system/brightness.md)
  * [用户截屏事件](api/system/capture-screen.md)
  * [振动](api/system/vibrate.md)
  * [手机联系人](api/system/contact.md)
  * [蓝牙](api/system/bluetooth.md)
  * [低功耗蓝牙](api/system/ble.md)
  * [iBeacon](api/system/ibeacon.md)
  * [Wi-Fi](api/system/wifi.md)
  * [电量](api/system/batteryInfo.md)
  * [NFC](api/system/nfc.md)
  * [设备方向](api/system/deviceMotion.md)
  * [生物认证](api/system/authentication.md)
* [Worker](api/worker.md)
* 键盘
  * [uni.hideKeyboard](/api/key?id=hidekeyboard)
  * [uni.onKeyboardHeightChange](/api/key?id=onkeyboardheightchange)
* 界面
  * [交互反馈](api/ui/prompt.md)
  * [设置导航条](api/ui/navigationbar.md)
  * [设置TabBar](api/ui/tabbar.md)
  * [背景](api/ui/bgcolor.md)
  * [动画](api/ui/animation?id=unicreateanimationobject)
  * [滚动](api/ui/scroll)
  * [窗口](api/ui/window.md)
  * [字体](api/ui/font.md)
  * [下拉刷新](api/ui/pulldown.md)
  * [节点信息](api/ui/nodes-info.md)
  * [节点布局相交状态](api/ui/intersection-observer.md)
  * [自定义组件](api/ui/nextTick.md)
  * [菜单](api/ui/menuButton.md)
* 页面和窗体
  * [页面](api/window/window.md)
  * [页面通讯](api/window/communication.md) 
  * [subNVue原生子窗体](api/window/subNVues.md)
* 文件
  * [uni.saveFile](/api/file/file?id=savefile)
  * [uni.getSavedFileList](/api/file/file?id=getSavedFileList)
  * [uni.getSavedFileInfo](/api/file/file?id=getSavedFileInfo)
  * [uni.removeSavedFile](/api/file/file?id=removeSavedFile)
  * [uni.getFileInfo](/api/file/file?id=getFileInfo)
  * [uni.openDocument](/api/file/file?id=openDocument)
  * [uni.getFileSystemManager](/api/file/getFileSystemManager)
* 绘画
	* [uni.createOffscreenCanvas](api/canvas/createOffscreenCanvas.md)
	* [uni.createCanvasContext](api/canvas/createCanvasContext.md)
	* [uni.canvasToTempFilePath](api/canvas/canvasToTempFilePath.md)
	* [uni.canvasPutImageData](api/canvas/canvasPutImageData.md)
	* [uni.canvasGetImageData](api/canvas/canvasGetImageData.md)
	* [CanvasContext](api/canvas/CanvasContext.md)
	* [CanvasGradient](api/canvas/CanvasGradient.md)
* 第三方服务
  * [获取服务供应商](api/plugins/provider.md)
  * [登录](api/plugins/login.md)
  * [分享](api/plugins/share.md)
  * [支付](api/plugins/payment.md)
  * [推送](api/plugins/push.md)
  * [语音](api/plugins/voice.md)
* 平台扩展
  * [App原生插件](api/extend/native-plugin.md)
* 其他
  * [授权](api/other/authorize.md)
  * [设置](api/other/setting.md)
  * [收货地址](api/other/choose-address.md)
  * [获取发票抬头](api/other/invoice-title.md)
  * [小程序跳转](api/other/open-miniprogram.md)
  * [账号信息](api/other/getAccountInfoSync.md)
  * [运动(计步器)](api/other/sport.md)
  * [统计](api/other/report.md)
  * [卡券](api/other/card.md)
  * [模板消息](api/other/template.md)
  * [订阅消息](api/other/requestSubscribeMessage.md)
  * [小程序更新](api/other/update.md)
  * [调试](api/other/set-enable-debug.md)
  * [获取第三方平台数据](api/other/get-extconfig.md)
  * [广告](api/other/advertisement.md)
<li></li>
<div class="contact-box">
  <a href="//ask.dcloud.net.cn/explore/" target="_blank" class="contact-item">
  	<img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/d@2x.png" width="20" height="20"/>
  	<div class="contact-smg">
  		<div>论坛</div>
  	</div>
  </a>
	<div class="contact-item">
		<img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/git-1.png" width="20" height="20"/>
		<div class="contact-smg">
			<div>
	      代码仓库：<a href="https://gitee.com/dcloud/uni-app" target="_blank">码云</a>、<a href="http://github.com/dcloudio/uni-app" target="_blank">GitHub</a>
	    </div>
		</div>
	</div>
	<div class="contact-item">
    <img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/qq@2x.png" width="20" height="20"/>
    <div class="contact-smg">
       <div>官方QQ交流群</div>
    <div>群26：147867597 &nbsp;<a target="_blank" href="//shang.qq.com/wpa/qunwpa?id
      =28a1a9a3e8f1866ee6a5f2b1caba05039e30d3ae1461e64b2ec31c095fcab951">点此加入</a></div>
		<div>群35：713420817（2000人已满）</div>
		<div>群34：530305531（2000人已满）</div>
		<div>群33：498071674（2000人已满）</div>
		<div>群32：166188631（500人已满）</div>
		<div>群31：567471669（500人已满）</div>
		<div>群30：371046920（500人已满）</div>
		<div>群29：202965481（500人已满）</div>
		<div>群28：166188776（2000人已满 </div>
		<div>群27：811363410（2000人已满 </div>
		<!-- <div>群26：147867597（2000人已满）</div> -->
		<div>群25：165297000（500人已满）</div>
		<div>群24：672494800（500人已满）</div>
		<div>群23：599958679（500人已满）</div>
		<div>群22：687186952（1000人已满）</div>
		<div>群21：717019120（2000人已满）</div>
		<div>群20：165796402（500人已满）</div>
		<div>群19：165657124（1000人已满）</div>
		<div>群18：698592271（500人已满）</div>
		<div>群17：951348804（1000人已满）</div>
		<div>群16：719211033（1000人已满）</div>
		<div>群15：516984120（500人已满）</div>
		<div>群14：465953250（500人已满）</div>
		<div>群13：699478442（500人已满）</div>
		<div>群12：884860657（500人已满）</div>
		<div>群11：296811328（1000人已满）</div>
		<div>群10：959059626（2000人已满）</div>
		<div>群9：775128777（500人已满）</div>
		<div>群8：695442854（500人已满）</div>
		<div>群7：942061423（500人已满）</div>
		<div>群6：697264024（2000人已满）</div>
		<div>群5：731951419（500人已满）</div>
		<div>群4：942702595（1000人已满）</div>
		<div>群3：773794803（1000人已满） </div>
		<div>群2：901474938（1000人已满） </div>
		<div>群1：531031261（1000人已满）</div>
    </div>
  </div>
  <div class="contact-item">
  	<img src="//img-cdn-qiniu.dcloud.net.cn/uniapp/doc/weixin@2x.png" width="20" height="20"/>
  	<div class="contact-smg">
  		<div>关注微信公众号</div>
  		<img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/weixin.jpg" width="90" height="90"/>
  	</div>
  </div>
</div>
