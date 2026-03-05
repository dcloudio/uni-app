<template>
  <!-- #ifdef APP-HARMONY && VUE3-VAPOR -->
  <view ref="rootRef">
  <!-- #endif -->
  <!-- #ifndef APP-HARMONY && VUE3-VAPOR -->
  <uni-web-view-element ref="rootRef">
  <!-- #endif -->

    <!-- #ifdef APP-IOS -->
    <native-view class="default" @init="init" @message="onMessage" @error="onError" @load="onLoad" @loaded="onLoaded"
      @loading="onLoading" @download="onDownload" @contentheightchange="onContentheightchange"
      @didterminate="onDidterminate" @onWebViewServiceMessage="onWebViewServiceMessage"/>
    <!-- #endif -->

    <!-- #ifdef APP-HARMONY -->
    <native-view class="default" @init="init" @message="onMessage" @error="onError" @load="onLoad" @loading="onLoading"
      @download="onDownload" @contentheightchange="onContentheightchange" />
    <!-- #endif -->

    <!-- #ifdef APP-ANDROID -->
    <native-view class="default" @init="init" @message="onMessage" @error="onError" @load="onLoad" @loaded="onLoaded"
      @loading="onLoading" @download="onDownload" @contentheightchange="onContentheightchange" />
    <!-- #endif -->

  <!-- #ifndef APP-HARMONY && VUE3-VAPOR -->
  </uni-web-view-element>
  <!-- #endif -->
  <!-- #ifdef APP-HARMONY && VUE3-VAPOR -->
  </view>
  <!-- #endif -->
</template>
<script setup lang="uts">
  import {
    UniWebViewMessageEventDetail,
    UniWebViewMessageEvent,
    UniWebViewLoadEventDetail,
    UniWebViewLoadEvent,
    UniWebViewLoadingEventDetail,
    UniWebViewLoadingEvent,
    UniWebViewDownloadEventDetail,
    UniWebViewDownloadEvent,
    UniWebViewContentHeightChangeEventDetail,
    UniWebViewContentHeightChangeEvent,
    UniWebViewErrorEvent,
    UniWebViewErrorEventDetail
  } from './global.uts'

  // #ifdef APP-IOS
  import {
    UniWebViewDidTerminateEventDetail,
    UniWebViewDidTerminateEvent,
  } from './global.uts'
  // #endif

  // #ifdef APP-IOS || APP-ANDROID
  import {
    UniWebViewLoadedEventDetail,
    UniWebViewLoadedEvent
  } from './global.uts'
  // #endif

  import {
    UniWebViewElement,
    NativeWebView,
    WebViewStyles
  } from "@/uni_modules/uni-web-view";

  defineOptions({
    name: 'web-view',
    // @ts-ignore
    rootElement: {
      name: 'uni-web-view-element',
      class: UniWebViewElement
    }
  });

  const rootRef = ref<UniElement | null>(null);

  const props = withDefaults(defineProps<{
    /**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    src ?: string | null,
    /**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    webviewStyles ?: WebViewStyles,
    /**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    horizontalScrollBarAccess ?: boolean,
    /**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    verticalScrollBarAccess ?: boolean,
    /**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    bounces ?: boolean,
    /**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    androidNestedScroll ?: 'all' | 'vertical' | 'horizontal' | 'none',
    /**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    disableUserSelectMenu ?: boolean,
    /**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
    darkMode ?: boolean
  }>(), {
    webviewStyles: {
      progress: {
        color: '#00FF00'
      }
    },
    horizontalScrollBarAccess: true,
    verticalScrollBarAccess: true,
    bounces: true,
    androidNestedScroll: 'all',
    disableUserSelectMenu: false,
    darkMode: true
  });

  type Native = {
    webview : NativeWebView | null
  }

  let native = reactive<Native>({
    webview: null
  })

  /// 监听属性变化
  watchEffect(() => {
    const src = props.src
    native.webview?.setSrc(src)
  })

  watchEffect(() => {
  	const webviewStyles = props.webviewStyles
  	
  	// #ifndef APP-IOS
  	native.webview?.setWebViewStyles(webviewStyles)
  	// #endif
  	
  	// #ifdef APP-IOS
  	function isSafeDict(val) {
			const toString = Object.prototype.toString
			return toString.call(val) === '[object Object]'
  	}
  	
  	if (isSafeDict(webviewStyles)) {
			native.webview?.setWebViewStyles(webviewStyles)
  	} else {
			console.log('web-view 参数webview-styles类型错误，请参考文档: https://doc.dcloud.net.cn/uni-app-x/component/web-view.html#web-view')
			native.webview?.setWebViewStyles({
				progress: {
					color: '#00FF00'
				}
			})
  	}
  	// #endif
  })

  watchEffect(() => {
    const horizontalScrollBarAccess = props.horizontalScrollBarAccess
    native.webview?.setHorizontalScrollBarAccess(horizontalScrollBarAccess)
  })

  watchEffect(() => {
    const verticalScrollBarAccess = props.verticalScrollBarAccess
    native.webview?.setVerticalScrollBarAccess(verticalScrollBarAccess)
  })

  watchEffect(() => {
    const bounces = props.bounces
    native.webview?.setBounces(bounces)
  })

  // #ifdef APP-ANDROID
  watchEffect(() => {
    const androidNestedScroll = props.androidNestedScroll
    native.webview?.setNestedScroll(androidNestedScroll)
  })

  watchEffect(() => {
    const darkMode = props.darkMode
    native.webview?.setDarkMode(darkMode)
  })
  // #endif

  watchEffect(() => {
    const disableUserSelectMenu = props.disableUserSelectMenu
    native.webview?.setDisableUserSelectMenu(disableUserSelectMenu)
  })

  /// 声明事件
  // #ifdef APP-IOS
  const emit = defineEmits<{
    message : [event: UniWebViewMessageEvent];
    load : [event: UniWebViewLoadEvent];
    loaded : [event: UniWebViewLoadedEvent];
    loading : [event: UniWebViewLoadingEvent];
    download : [event: UniWebViewDownloadEvent];
    contentheightchange : [event: UniWebViewContentHeightChangeEvent];
    didterminate : [event: UniWebViewDidTerminateEvent];
	onWebViewServiceMessage : [event: UniWebViewOnWebViewServiceMessageEvent];
    error : [event: UniWebViewErrorEvent];
  }>();
  // #endif

  // #ifdef APP-ANDROID
  const emit = defineEmits<{
    message : [event: UniWebViewMessageEvent];
    load : [event: UniWebViewLoadEvent];
    loaded : [event: UniWebViewLoadedEvent];
    loading : [event: UniWebViewLoadingEvent];
    download : [event: UniWebViewDownloadEvent];
    contentheightchange : [event: UniWebViewContentHeightChangeEvent];
    error : [event: UniWebViewErrorEvent];
  }>();
  // #endif

  // #ifdef APP-HARMONY
  const emit = defineEmits<{
    message : [event: UniWebViewMessageEvent];
    load : [event: UniWebViewLoadEvent];
    loading : [event: UniWebViewLoadingEvent];
    download : [event: UniWebViewDownloadEvent];
    contentheightchange : [event: UniWebViewContentHeightChangeEvent];
    error : [event: UniWebViewErrorEvent];
  }>();
  // #endif

  /// event
  const onMessage = (customEvent : UniNativeViewEvent) => {
    const messageEventDetail : UniWebViewMessageEventDetail = {
      data: customEvent.detail["data"] as UTSJSONObject[] | null ?? new Array<UTSJSONObject>()
    }
    const event = new UniWebViewMessageEvent(rootRef.value!, customEvent.type, messageEventDetail)
    emit("message", event)
  }

  const onLoad = (customEvent : UniNativeViewEvent) => {
    const loadEventDetail : UniWebViewLoadEventDetail = {
      url: customEvent.detail["url"] as string | null ?? '',
      src: customEvent.detail["src"] as string | null ?? ''
    }
    const event = new UniWebViewLoadEvent(rootRef.value!, customEvent.type, loadEventDetail)
    emit("load", event)
  }

  // #ifndef APP-HARMONY
  const onLoaded = (customEvent : UniNativeViewEvent) => {
    const loadedEventDetail : UniWebViewLoadedEventDetail = {
      url: customEvent.detail["url"] as string | null ?? '',
      src: customEvent.detail["src"] as string | null ?? ''
    }
    const event = new UniWebViewLoadedEvent(rootRef.value!, customEvent.type, loadedEventDetail)
    emit("loaded", event)
  }
  // #endif

  const onLoading = (customEvent : UniNativeViewEvent) => {
    const loadingEventDetail : UniWebViewLoadingEventDetail = {
      url: customEvent.detail["url"] as string | null ?? '',
      src: customEvent.detail["src"] as string | null ?? ''
    }
    const event = new UniWebViewLoadingEvent(rootRef.value!, customEvent.type, loadingEventDetail)
    emit("loading", event)
  }

  const onDownload = (customEvent : UniNativeViewEvent) => {
    const downloadEventDetail : UniWebViewDownloadEventDetail = {
      url: customEvent.detail["url"] as string | null ?? '',
      userAgent: customEvent.detail["userAgent"] as string | null ?? '',
      contentDisposition: customEvent.detail["contentDisposition"] as string | null ?? '',
      mimetype: customEvent.detail["mimetype"] as string | null ?? '',
      contentLength: customEvent.detail["contentLength"] as number | null ?? 0
    }
    const event = new UniWebViewDownloadEvent(rootRef.value!, customEvent.type, downloadEventDetail)
    emit("download", event)
  }

  const onContentheightchange = (customEvent : UniNativeViewEvent) => {
    const contentheightchangeEventDetail : UniWebViewContentHeightChangeEventDetail = {
      height: customEvent.detail["height"] as number | null ?? 0
    }
    const event = new UniWebViewContentHeightChangeEvent(rootRef.value!, customEvent.type, contentheightchangeEventDetail)
    emit("contentheightchange", event)
  }
  
  // #ifdef APP-IOS
  const onDidterminate = (customEvent : UniNativeViewEvent) => {
    const didterminateEventDetail : UniWebViewDidTerminateEventDetail = {}
    const event = new UniWebViewDidTerminateEvent(rootRef.value!, customEvent.type, didterminateEventDetail)
    emit("didterminate", event)
  }
  
  const onWebViewServiceMessage = (customEvent : UniNativeViewEvent) => {
	  const data = customEvent?.detail?.data?.args?.data as UTSJSONObject | undefined;
	   
	  // ---- 安全读取字段 ----
	  const rawName = data?.name;
	  const name = typeof rawName === "string" ? rawName : "";
	   
	  const arg = (data?.arg as UTSJSONObject) ?? {};
	  const delta = typeof arg.delta === "number" ? arg.delta : 1;
	  const url = typeof arg.url === "string" ? arg.url : "";

	  switch (name) {
	      case "navigateTo":
	          uni.navigateTo({ url })
	          break
	      case "redirectTo":
	          uni.redirectTo({ url })
	          break
	      case "switchTab":
	          uni.switchTab({ url })
	          break
	      case "reLaunch":
	          uni.reLaunch({ url })
	          break
	      case "navigateBack":
	          uni.navigateBack({ delta })
	          break
	      default:
	          break
	  }
  }
  // #endif

  const onError = (customEvent : UniNativeViewEvent) => {
    const errorEventDetail : UniWebViewErrorEventDetail = {
      errSubject: 'uni-web-view',
      errCode: customEvent.detail["errCode"] as number | null ?? 0,
      errMsg: customEvent.detail["errMsg"] as string | null ?? '',
      url: customEvent.detail["url"] as string | null ?? '',
      fullUrl: customEvent.detail["fullUrl"] as string | null ?? '',
      src: customEvent.detail["src"] as string | null ?? ''
    }
    const event = new UniWebViewErrorEvent(rootRef.value!, customEvent.type, errorEventDetail)
    emit("error", event)
  }
  
  //native-view初始化时触发此方法
  const init = (e : UniNativeViewInitEvent) => {
    //获取UniNativeViewElement 传递给NativeButton对象
    // #ifdef APP-HARMONY && VUE3-VAPOR
    native.webview = new NativeWebView(e.detail.element, {
      onMessage,
      onLoad,
      onLoading,
      onDownload,
      onContentheightchange,
      onError
    });
    // #endif
    // #ifndef APP-HARMONY && VUE3-VAPOR
    native.webview = new NativeWebView(e.detail.element);
    // #endif
  }
  

  onUnmounted(() => {
    native.webview?.destroy()
    native.webview = null
  })
</script>
<style>
  .default {
    width: 100%;
    height: 100%;
  }
</style>