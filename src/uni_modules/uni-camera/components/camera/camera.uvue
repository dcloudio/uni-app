<template>
  <uni-camera-element ref="cameraRef">
    <native-view
      ref="natvieElement"
      id="mnative-camera"
      @init="onObjectInit"
      @stop="handleStop"
      @error="handleError"
      @scancode="handleScanCode"
      @initdone="handleInitDone"
      style="width: 100%; height: 100%"
    >
    </native-view>
  </uni-camera-element>
</template>

<script setup lang="uts">
	import { CameraInstance, UniCameraElement } from "@/uni_modules/uni-camera";
	import { UniCameraStopEvent, UniCameraErrorEvent, UniCameraInitDoneEvent, UniCameraScanCodeEvent, UniCameraStopEventDetail, UniCameraErrorEventDetail, UniCameraInitDoneEventDetail, UniCameraScanCodeEventDetail } from "./global";
	const natvieElement = ref<IUniNativeElement | null>(null)

	const props = withDefaults(defineProps<{
		mode ?: "normal" | "scanCode",
		resolution ?: "low" | "medium" | "high",
		devicePosition ?: "front" | "back",
		flash ?: "auto" | "on" | "off" | "torch",
		frameSize ?: "small" | "medium" | "large",
		photoResolution ?: "low" | "medium" | "high" | "original"
	}>(), {
		mode: "normal",
		resolution: "medium", // 一旦设定不能更改
		devicePosition: "back",
		flash: "auto",
		frameSize: "medium",
		photoResolution: "medium" // 一旦设定不能更改
	})

	let cameraInstance : CameraInstance | null = null
	// #ifndef APP-IOS
	defineOptions({
		name: "camera",
		rootElement: {
			name: 'uni-camera-element',
			class: UniCameraElement
		}
	})
	// #endif
	const emit = defineEmits(['stop', 'error', 'initdone', 'scancode'])

	watchEffect(() => {
		const devicePosition = props.devicePosition
		cameraInstance?.switchCamera(devicePosition)
	})

	watchEffect(() => {
		const flash = props.flash
		cameraInstance?.setFlash(flash)
	})

	watchEffect(() => {
		const frameSize = props.frameSize
		cameraInstance?.setFrameSize(frameSize)
	})
	
	watchEffect(() => {
		const photoResolution = props.photoResolution
		cameraInstance?.setPhotoResolution(photoResolution)
	})

	const setDefaultOptions = () => {
		cameraInstance?.setFlash(props.flash)
		cameraInstance?.setFrameSize(props.frameSize)
		cameraInstance?.setPhotoResolution(props.photoResolution)
	}
	
	const setDefaultOptionsAfterInitDone = () => {
		cameraInstance?.switchCamera(props.devicePosition)
	}

	const onObjectInit = (e : UniNativeViewInitEvent) => {
		cameraInstance = new CameraInstance(e.detail.element);
		cameraInstance?.start(props.resolution ?? "medium")
		setTimeout(() => {
			setDefaultOptions()
		}, 0);
	}
	

	const handleStop = (customEvent : UniNativeViewEvent) => {
		// #ifdef APP-ANDROID
		const error = customEvent.detail.getString("error")
		// #endif
		// #ifndef APP-ANDROID
		const error = customEvent.detail["error"]
		// #endif
		
		let errCode = 2003100;
		if (error == "camera is disabled") {
			errCode = 2003004;
		} else if (error == "camera is in use") {
			errCode = 2003005;
		} else if (error == "camera fatal error") {
			errCode = 2003006;
		} else if (error == "the application enters the background") {
			errCode = 2003009;
		}
		const detail : UniCameraStopEventDetail = {
			errorCause: error,
			errSubject:"uni-camera",
			errCode: errCode,
			errMsg: error,
			data: null,
			cause: null
		}
		const event = new UniCameraStopEvent("stop", detail)
		emit("stop", event)
	}

	const handleError = (customEvent : UniNativeViewEvent) => {
		// #ifdef APP-ANDROID
		const error = customEvent.detail.getString("error")
		// #endif
		// #ifndef APP-ANDROID
		const error = customEvent.detail["error"]
		// #endif
		
		let errCode = 2003100;
		if (error == "permission denied") {
			errCode = 2003002;
		}
		
		const detail : UniCameraErrorEventDetail = {
			msg: error,
			errSubject:"uni-camera",
			errCode: errCode,
			errMsg: error,
			data: null,
			cause: null
		}
		const event = new UniCameraErrorEvent("error", detail)
		emit("error", event)
	}

	const handleInitDone = (customEvent : UniNativeViewEvent) => {
		// #ifdef APP-ANDROID
		const maxzoom = customEvent.detail.getNumber("maxzoom")
		// #endif
		// #ifndef APP-ANDROID
		const maxzoom = customEvent.detail["maxzoom"]
		// #endif
		const detail : UniCameraInitDoneEventDetail = {
			maxZoom: maxzoom
		}
		setDefaultOptionsAfterInitDone()
		const event = new UniCameraInitDoneEvent("initdone", detail)
		emit("initdone", event)
		// 当实例化完成后才可以开启扫码模式, 不是扫描模式就不要设置，否则会stopAnalysis
		if(props.mode == "scanCode") {
			//todo 临时性延迟，等onready生效后再次调用
			setTimeout(()=>{
				cameraInstance?.setScanCode(true)		
			},500)
		}
	}


	const handleScanCode = (customEvent : UniNativeViewEvent) => {
		let type : string | null = null;
		let result : string | null = null;
		let rawData: string | null = null;
		let charSet: string | null = null;
		let scanArea: Array<number> | null = null;
		if (customEvent.type == "scancode_success") {
			// #ifdef APP-ANDROID
			type = customEvent.detail.getString("scanType")
			result = customEvent.detail.getString("result")
			rawData = customEvent.detail.getString("rawData") // 二维码的原始数据，可能是图片、视频、文件等
			charSet = customEvent.detail.getString("charset") // 二维码的字符集，如 UTF-8、GBK等
			scanArea = customEvent.detail.getArray("scanArea") as Array<number>// 二维码的扫描区域

			// #endif
			// #ifndef APP-ANDROID
			type = customEvent.detail["scanType"]
			result = customEvent.detail["result"]
			rawData = customEvent.detail["rawData"] // 二维码的原始数据，可能是图片、视频、文件等
			charSet = customEvent.detail["charset"] // 二维码的字符集，如 UTF-8、GBK等
			scanArea = customEvent.detail["scanArea"] as Array<number> // 二维码的扫描区域
			// #endif
		}
		//  else if (customEvent.type == "scancode_fail") {
		// 	// #ifdef APP-ANDROID
		// 	result = customEvent.detail.getString("error")
		// 	// #endif
		// 	// #ifndef APP-ANDROID
		// 	result = customEvent.detail["error"]
		// 	// #endif
		// }

		if (result != null) {
			const detail : UniCameraScanCodeEventDetail = {
				type: type,
				result: result,
				rawData: rawData,
				charSet: charSet,
				scanArea: scanArea,
			}
			const event = new UniCameraScanCodeEvent("scancode", detail)
			emit("scancode", event)
		}
	}

	// #ifdef APP-ANDROID
	onAppHide(() => {
		
		const detail : UniCameraStopEventDetail = {
			errorCause: "the application enters the background",
			errSubject:"uni-camera",
			errCode: 2003009,
			errMsg: "the application enters the background",
			data: null,
			cause: null
		}
		const event = new UniCameraStopEvent("stop", detail)
		emit("stop", event)
	})
	// #endif

	// onHide(()=>{
	// 	const detail : UniCameraStopEventDetail = {
	// 		errorCause: "The application enters the background"
	// 	}
	// 	const event = new UniCameraStopEvent("stop", detail)
	// 	emit("stop", event)
	// }, getApp().vm!)
	
	onPageShow(() => {
		cameraInstance?.resume()
	})
	
	onPageHide(() => {
		cameraInstance?.stop()
	})
	
	
	onUnmounted(() => {
		cameraInstance?.destory()
		cameraInstance = null
	})
</script>

<style></style>
