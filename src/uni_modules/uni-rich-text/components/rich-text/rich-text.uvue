<template>
	<!--
	添加根 view 节点原因：
	期望：rich-text的高度 = web-view高度 + rich-text外层设置的border高度
	目前： 去掉根view，rich-text的高度 = web-view高度， 外层设置的border高度内嵌了；
	为了解决 web-view 与外层 border 同层布局时的高度计算异常问题，
	通过根容器隔离 web-view 的原生布局。
	-->
	<view>
		<!-- #ifndef APP-ANDROID || APP-HARMONY -->
		<web-view :id="webviewId" src="about:blank" class="default" :bounces="false" :verticalScrollBarAccess="false"
			:webview-styles="webviewStyles" @contentheightchange="contentheightchange" @message="message"
			@load="load"></web-view>
		<!-- #endif -->

		<!-- #ifdef APP-ANDROID -->
		<web-view v-if="props.mode == 'web'" :id="webviewId" src="" class="default" :bounces="false" :darkMode="false" :verticalScrollBarAccess="false"
			:webview-styles="webviewStyles" @contentheightchange="contentheightchange" @message="message" @load="load"></web-view>
		<rich-text-native v-else-if="props.mode == 'native'" :nodes="_nodes" :selectable="_selectable" @itemclick="itemclick"></rich-text-native>
		<!-- #endif -->

		<!-- #ifdef APP-HARMONY -->
		<web-view v-if="props.mode == 'web'" :id="webviewId" src="" class="default" :bounces="false" :verticalScrollBarAccess="false" @contentheightchange="contentheightchange" @message="message" @load="load"></web-view>
		<!-- #ifdef VUE3-VAPOR -->
		<rich-text-native v-else-if="props.mode == 'native'" :html="htmlContent" @itemclick="itemclick" :style="style"></rich-text-native>
		<!-- #endif -->
		<!-- #endif -->
	</view>
</template>
<script setup lang="uts">
	import {
		UniRichTextItemClickEventDetail,
		UniRichTextItemClickEvent
	} from './global.uts'

	// 常量定义：HTML 自闭合标签
	const VOID_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']

	// 属性定义
	const props = withDefaults(defineProps<{
		nodes : any,
		selectable ?: boolean,
		mode ?: string
	}>(), {
		selectable: false,
		mode: 'web'
	});

	// 事件定义
	const emit = defineEmits<{
		itemclick : [event: UniRichTextItemClickEvent];
	}>();

	// webview id
	const webviewId = `richtext-webview-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
	const webviewStyles = { progress: false } as WebViewStyles

	// #ifdef APP-ANDROID
	const _nodes = ref<any | null>(null)
	const _selectable = ref<boolean>(false)
	// #endif

	// #ifdef APP-HARMONY && VUE3-VAPOR
	const htmlContent = ref<string>('')
	// #endif

	// webview 元素引用
	let webviewElement : UniWebViewElement | null = null

	// Style 样式监听
	const style = useComputedStyle({
		properties: ['font-family', 'line-height', 'font-size'],
		filterProperties: true
	} as UseComputedStyleOptions)

	const fontFamily = computed<string>(() => {
		return style.get('font-family')?.toString() ?? '-apple-system, HelveticaNeue'
	})
	const lineHeight = computed<string>(() => {
		return style.get('line-height')?.toString() ?? '1.5'
	})
	const fontSize = computed<string>(() => {
		return style.get('font-size')?.toString() ?? '16px'
	})

	// 内部状态
	let htmlString = ''
  let lastHtmlString = ''
	let textHeight = 0
	let cachedFontFamily = ''
	let cachedLineHeight = ''
	let cachedFontSize = ''
	let isWebViewReady = false // web-view 是否已准备好

	// ================ 核心功能函数 ================

	/**
	 * 创建完整的 HTML 文档字符串
	 */
	function createHTMLString(
		content : string,
		fontFamily : string,
		lineHeight : string,
		fontSize : string
	) : string {
		return `<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
				<style>
				body {
					background-color: transparent;
					font-family: ${fontFamily};
					line-height: ${lineHeight};
					font-size: ${fontSize};
					overflow-x: hidden;
					overflow-wrap: break-word;
					word-wrap: break-word;
				}

				img {
					max-width: 100%;
					height: auto;
				}

				* {
					margin: 0;
				}
				</style>
				<script>
					function postMessage(m) {
						window.__uniapp_x_.postMessage(JSON.stringify(m));
					}

					function updateSelection(enabled) {
						if (enabled) {
							var style = document.getElementById('disable-selection-style');
							if (style) style.remove();
							document.documentElement.style.webkitTouchCallout = 'default';
						} else {
							if (!document.getElementById('disable-selection-style')) {
								var style = document.createElement('style');
								style.id = 'disable-selection-style';
								style.textContent = '* { -webkit-user-select: none !important; user-select: none !important; }';
								document.head.appendChild(style);
							}
							document.documentElement.style.webkitTouchCallout = 'none';
						}
					}

					window.onload = function () {
						var aTags = document.getElementsByTagName('a');
						for (var i = 0; i < aTags.length; i++) {
							aTags[i].addEventListener('click', function (event) {
								event.preventDefault();
								var href = event.target.href;
								postMessage({ data: { linkClick: href } });
							});
						}

						var imgTags = document.getElementsByTagName('img');
						for (var i = 0; i < imgTags.length; i++) {
							imgTags[i].addEventListener('click', function (event) {
								var src = event.target.src;
								postMessage({ data: { imgClick: src } });
							});
						}

						updateSelection(${props.selectable})
					};
				<\/script>
			</head>
			<body>
				${content}
			</body>
			</html>`
	}

	/**
	 * 加载 HTML 内容到 WebView
	 */
	function loadHtmlContent() {
		if (webviewElement == null || !isWebViewReady ||  htmlString.length == 0 || htmlString === lastHtmlString) {
			return
		}
    lastHtmlString = htmlString

		const font = fontFamily.value
		const line = lineHeight.value
		const size = fontSize.value

		// 更新缓存
		cachedFontFamily = font
		cachedLineHeight = line
		cachedFontSize = size

		const fullHtml = createHTMLString(htmlString, font, line, size)
		webviewElement!.loadData({ data: fullHtml } as UniWebViewElementLoadDataOptions)
	}

	/**
	 * 更新选择状态
	 */
	function updateSelectable() {
		const selectable = props.selectable

    // #ifndef APP-ANDROID
    if (webviewElement == null) return
    // #endif

		if (props.mode == 'native') {
			// #ifdef APP-ANDROID
			_selectable.value = selectable;
			// #endif
			// #ifdef APP-HARMONY
				// TODO:: harmony native richtext 暂不支持 selectable
			// #endif
			return
		}

		let scriptSource = `updateSelection(${selectable})`;
		webviewElement?.evalJS(scriptSource);
	}

	/**
	 * 更新 WebView 高度
	 */
	function updateStyleHeight() {
		if (webviewElement == null) return
		webviewElement!.style.setProperty('height', `${textHeight}px`)
	}

	// ================ HTML 生成函数 ================

	/**
	 * 递归生成 HTML 字符串
	 */
	// #ifndef APP-ANDROID
	function generateHTML(nodes : Array<Map<string, any>>) : string {
		let html = ''
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i]

			// 处理文本节点
			if (node['text'] != null) {
				html += node['text'] as string
			} else {
				// 处理元素节点
				if (node['name'] != null) {
					const name = node['name'] as string
					html += `<${name}`

					// 处理属性
					if (node['attrs'] != null) {
						const attrs = node['attrs']
						const keys = Object.keys(attrs)
						for (let j = 0; j < keys.length; j++) {
							const key = keys[j]
							const value = attrs[key]
							html += ` ${key}="${value}"`
						}
					}

					// 自闭合标签（HTML void elements）
					if (VOID_ELEMENTS.includes(name)) {
						html += ' />'
					} else {
						html += '>'

						// 处理子节点
						if (node['children'] != null) {
							const children = node['children']
							if (children instanceof Array) {
								html += generateHTML(children as Array<Map<string, any>>)
							}
						}

						html += `</${name}>`
					}
				}
			}
		}
		return html
	}
	// #endif

	/**
	 * 递归生成 HTML 字符串
	 */
	// #ifdef APP-ANDROID
	function generateHTML(nodes : Array<UTSJSONObject>) : string {
		let html = '';
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			// 处理文本节点
			if (node['text'] != null) {
				html += node['text'] as string;
			} else {
				// 处理元素节点
				if (node['name'] != null) {
					const name = node['name'] as string;
					html += `<${name}`;
					// 处理属性
					if (node['attrs'] != null) {
						const attrs = node['attrs'] as UTSJSONObject;
						const keys = UTSJSONObject.keys(attrs);
						for (let j = 0; j < keys.length; j++) {
							const key = keys[j];
							const value = attrs[key];
							html += ` ${key}="${value}"`;
						}
					}
					// 自闭合标签（HTML void elements）
					if (VOID_ELEMENTS.includes(name)) {
						html += ' />';
					} else {
						html += '>';
						// 处理子节点
						if (node['children'] != null) {
							const children = node['children'];
							if (children instanceof Array) {
								html += generateHTML(children as Array<UTSJSONObject>);
							}
						}
						html += `</${name}>`;
					}
				}
			}
		}
		return html;
	}
	// #endif

  // #ifdef APP-HARMONY
  function reloadHtmlContent() {
    nextTick(() => {
      if (webviewElement == null) {
        webviewElement = uni.getElementById(webviewId) as UniWebViewElement
        isWebViewReady = true
      }

      loadHtmlContent()
    })
  }
  // #endif

	// ================ 监听器 ================

	// 监听 props.nodes、props.mode 属性变化
	watchEffect(() => {
		const nodes = props.nodes
		if (nodes == null) return

		let newHtmlString = ''
		// #ifndef APP-ANDROID || APP-HARMONY
		if (nodes instanceof Array) {
			newHtmlString = generateHTML(nodes as Array<Map<string, any>>)
		} else if (typeof nodes == 'string') {
			newHtmlString = nodes as string
		}
		if (newHtmlString != htmlString) {
			htmlString = newHtmlString
			loadHtmlContent()
		}
		// #endif

		// #ifdef APP-ANDROID
		if (props.mode == 'web') {
		  if (nodes instanceof Array<UTSJSONObject>) {
			newHtmlString = generateHTML(nodes as Array<UTSJSONObject>);
		  } else if (typeof nodes == 'string') {
			newHtmlString = nodes as string;
		  }
		  if (newHtmlString != htmlString) {
		  	htmlString = newHtmlString;
		  	loadHtmlContent();
		  }
		} else if (props.mode == 'native') {
			_nodes.value = nodes;
		}
		// #endif

		// #ifdef APP-HARMONY
		if (nodes instanceof Array) {
			newHtmlString = generateHTML(nodes as Array<Map<string, any>>)
		} else if (typeof nodes == 'string') {
			newHtmlString = nodes as string
		}
		if (newHtmlString != htmlString) {
			htmlString = newHtmlString
		}
		if (props.mode == 'web') {
			reloadHtmlContent()
		} else if (props.mode == 'native') {
			// #ifdef VUE3-VAPOR
			htmlContent.value = htmlString;
			// #endif
		}
		// #endif
	})

	// 监听样式变化
	watchEffect(() => {
		const font = fontFamily.value
		const line = lineHeight.value
		const size = fontSize.value

		if (htmlString.length == 0) return

		const styleChanged = font != cachedFontFamily || line != cachedLineHeight || size != cachedFontSize
		if (styleChanged) {
      lastHtmlString = ''
			loadHtmlContent()
		}
	})

	// 监听 selectable 属性变化
	watch([() => props.selectable, () => props.mode], () => {
		// #ifndef APP-ANDROID || APP-HARMONY
		if (!isWebViewReady) return
		// #endif

		// #ifdef APP-HARMONY
		if (props.mode == 'web' && !isWebViewReady) {
			return
		}
		// #endif
		updateSelectable()
	})

	// #ifdef APP-ANDROID || APP-HARMONY
	watch((): string => props.mode, () => {
		const mode = props.mode;
		if (mode == 'native') {
		  isWebViewReady = false;
		  htmlString = '';
      lastHtmlString = '';
		  textHeight = 0;
		  webviewElement = null;
		}
	})
	// #endif

	// ================ WebView 事件处理 ================

	const load = (event : UniWebViewLoadEvent) => {
		if (!isWebViewReady) {
			isWebViewReady = true
			// #ifdef APP-ANDROID
			webviewElement = uni.getElementById(webviewId) as UniWebViewElement | null;
			// #endif

			// #ifdef APP-HARMONY && VUE3-VAPOR
			webviewElement = uni.getElementById(webviewId) as UniWebViewElement | null;
			// #endif

			if (htmlString.length > 0) {
				loadHtmlContent()
			}
		}
	}

	const contentheightchange = (event : UniWebViewContentHeightChangeEvent) => {
		if (event.detail.height != textHeight && event.detail.height != 8) {
			textHeight = event.detail.height
			updateStyleHeight()
		}
	}

	const message = (event : UniWebViewMessageEvent) => {
		if (event.detail.data.length > 0) {
			const data = event.detail.data[0]

			let src : string | null = null
			let href : string | null = null

			if (data['linkClick'] != null) {
				href = data['linkClick'] as string
			} else if (data['imgClick'] != null) {
				src = data['imgClick'] as string
			}

			const eventDetail : UniRichTextItemClickEventDetail = { src, href }
			const itemClickEvent = new UniRichTextItemClickEvent('itemclick', eventDetail)
			emit('itemclick', itemClickEvent)
		}
	}

	// #ifdef APP-ANDROID
	const itemclick = (event : UniNativeRichTextItemClickEvent) => {
		const src = event.detail.src;
		const href = event.detail.href;
		emit('itemclick', new UniRichTextItemClickEvent('itemclick', { src, href } as UniRichTextItemClickEventDetail));
	}
	// #endif

	// #ifdef APP-HARMONY && VUE3-VAPOR
	const itemclick = (event : UniRichTextNativeItemClickEvent) => {
		const src = event.detail.src;
		const href = event.detail.href;
		const eventDetail : UniRichTextItemClickEventDetail = { src, href }
		const itemClickEvent = new UniRichTextItemClickEvent('itemclick', eventDetail)
		emit('itemclick', itemClickEvent);
	}
	// #endif

	// ================ 生命周期 ================

	onMounted(() => {
		// #ifndef APP-ANDROID || APP-HARMONY
		webviewElement = uni.getElementById(webviewId) as UniWebViewElement
		// #endif

		// #ifdef APP-HARMONY
		if (props.mode == 'web') {
			reloadHtmlContent()
		}
		// #endif
	})

	onUnload(() => {
		webviewElement = null
		htmlString = ''
		isWebViewReady = false
	})

</script>
<style>
	.default {
		width: 100%;
		height: 100%;
	}
</style>
