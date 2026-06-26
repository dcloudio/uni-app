import { Comment, Fragment, Text as Text$1, computed, createElementVNode, createVNode, defineComponent, getCurrentInstance, inject, isVNode, mergeProps, nextTick, onBeforeUnmount, onMounted, onUnmounted, parseClassList, provide, reactive, ref, resolveComponent, shallowRef, watch, watchEffect } from "vue";
import { extend, hasOwn, isArray, isFunction, isPlainObject, isString } from "@vue/shared";
import { PRIMARY_COLOR, cacheStringFunction } from "@dcloudio/uni-shared";
//#region src/components/navigator.ts
var OPEN_TYPES = [
	"navigate",
	"redirect",
	"switchTab",
	"reLaunch",
	"navigateBack"
];
var ANIMATION_IN = [
	"slide-in-right",
	"slide-in-left",
	"slide-in-top",
	"slide-in-bottom",
	"fade-in",
	"zoom-out",
	"zoom-fade-out",
	"pop-in",
	"none"
];
var ANIMATION_OUT = [
	"slide-out-right",
	"slide-out-left",
	"slide-out-top",
	"slide-out-bottom",
	"fade-out",
	"zoom-in",
	"zoom-fade-in",
	"pop-out",
	"none"
];
var navigatorProps = {
	hoverClass: {
		type: String,
		default: "navigator-hover"
	},
	url: {
		type: String,
		default: ""
	},
	openType: {
		type: String,
		default: "navigate",
		validator(value) {
			return Boolean(~OPEN_TYPES.indexOf(value));
		}
	},
	delta: {
		type: Number,
		default: 1
	},
	hoverStartTime: {
		type: [Number, String],
		default: 50
	},
	hoverStayTime: {
		type: [Number, String],
		default: 600
	},
	exists: {
		type: String,
		default: ""
	},
	hoverStopPropagation: {
		type: Boolean,
		default: false
	},
	animationType: {
		type: String,
		default: "",
		validator(value) {
			return !value || ANIMATION_IN.concat(ANIMATION_OUT).includes(value);
		}
	},
	animationDuration: {
		type: [String, Number],
		default: 300
	}
};
function createNavigatorOnClick(props) {
	return () => {
		if (props.openType !== "navigateBack" && !props.url) {
			console.error("<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab");
			return;
		}
		const animationDuration = parseInt(props.animationDuration);
		const onFail = void 0;
		switch (props.openType) {
			case "navigate":
				uni.navigateTo({
					url: props.url,
					animationType: props.animationType || "pop-in",
					animationDuration,
					fail: onFail
				});
				break;
			case "redirect":
				uni.redirectTo({
					url: props.url,
					exists: props.exists,
					fail: onFail
				});
				break;
			case "switchTab":
				uni.switchTab({
					url: props.url,
					fail: onFail
				});
				break;
			case "reLaunch":
				uni.reLaunch({
					url: props.url,
					fail: onFail
				});
				break;
			case "navigateBack":
				uni.navigateBack({
					delta: props.delta,
					animationType: props.animationType || "pop-out",
					animationDuration,
					fail: onFail
				});
				break;
			default: break;
		}
	};
}
//#endregion
//#region src/nvue/utils.ts
function useHoverClass(props) {
	if (props.hoverClass && props.hoverClass !== "none") {
		const hoverAttrs = { hoverClass: props.hoverClass };
		if (hasOwn(props, "hoverStartTime")) hoverAttrs.hoverStartTime = props.hoverStartTime;
		if (hasOwn(props, "hoverStayTime")) hoverAttrs.hoverStayTime = props.hoverStayTime;
		if (hasOwn(props, "hoverStopPropagation")) hoverAttrs.hoverStopPropagation = props.hoverStopPropagation;
		return hoverAttrs;
	}
	return {};
}
function createNVueTextVNode(text, attrs) {
	return createElementVNode("u-text", extend({ appendAsTree: true }, attrs), text);
}
var navigator_default = /* @__PURE__ */ defineComponent({
	name: "Navigator",
	props: navigatorProps,
	styles: [{ "navigator-hover": { "": {
		backgroundColor: "rgba(0,0,0,0.1)",
		opacity: .7
	} } }],
	setup(props, { slots }) {
		const onClick = createNavigatorOnClick(props);
		return () => {
			return createVNode("view", mergeProps(useHoverClass(props), { "onClick": onClick }), [slots.default && slots.default()]);
		};
	}
});
//#endregion
//#region ../uni-core/src/helpers/util.ts
function PolySymbol(name) {
	return Symbol(process.env.NODE_ENV !== "production" ? "[uni-app]: " + name : name);
}
//#endregion
//#region ../uni-core/src/helpers/page.ts
function useCurrentPageId() {
	let pageId;
	try {
		pageId = getPageProxyId(getCurrentInstance().root.proxy);
	} catch {
		const webviewId = plus.webview.currentWebview().id;
		pageId = isNaN(Number(webviewId)) ? webviewId : Number(webviewId);
	}
	return pageId;
}
function getPageProxyId(proxy) {
	return proxy.$page?.id || proxy.$basePage?.id;
}
//#endregion
//#region ../uni-core/src/helpers/showPage.ts
var plus_;
var weex_;
var BroadcastChannel_;
function getRuntime() {
	return typeof window === "object" && typeof navigator === "object" && typeof document === "object" ? "webview" : "v8";
}
function getPageId() {
	return plus_.webview.currentWebview().id;
}
var channel;
var globalEvent;
var callbacks = {};
function onPlusMessage(res) {
	const message = res.data && res.data.__message;
	if (!message || !message.__page) return;
	const pageId = message.__page;
	const callback = callbacks[pageId];
	callback && callback(message);
	if (!message.keep) delete callbacks[pageId];
}
function addEventListener(pageId, callback) {
	if (getRuntime() === "v8") {
		if (BroadcastChannel_) {
			channel && channel.close();
			channel = new BroadcastChannel_(getPageId());
			channel.onmessage = onPlusMessage;
		} else if (!globalEvent) {
			globalEvent = weex_.requireModule("globalEvent");
			globalEvent.addEventListener("plusMessage", onPlusMessage);
		}
	} else window.__plusMessage = onPlusMessage;
	callbacks[pageId] = callback;
}
var Page = class {
	constructor(webview) {
		this.webview = webview;
	}
	sendMessage(data) {
		const message = JSON.parse(JSON.stringify({ __message: { data } }));
		const id = this.webview.id;
		if (BroadcastChannel_) new BroadcastChannel_(id).postMessage(message);
		else plus_.webview.postMessageToUniNView && plus_.webview.postMessageToUniNView(message, id);
	}
	close() {
		this.webview.close();
	}
};
function showPage({ context = {}, url, data = {}, style = {}, onMessage, onClose }) {
	let darkmode = __uniConfig.darkmode;
	plus_ = context.plus || plus;
	weex_ = context.weex || (typeof weex === "object" ? weex : null);
	BroadcastChannel_ = context.BroadcastChannel || (typeof BroadcastChannel === "object" ? BroadcastChannel : null);
	const titleNView = {
		autoBackButton: true,
		titleSize: "17px"
	};
	const pageId = `page${Date.now()}`;
	style = extend({}, style);
	if (style.titleNView !== false && style.titleNView !== "none") style.titleNView = extend(titleNView, style.titleNView);
	style = extend({
		top: 0,
		bottom: 0,
		usingComponents: {},
		popGesture: "close",
		scrollIndicator: "none",
		animationType: "pop-in",
		animationDuration: 200,
		uniNView: {
			path: `/${url}.js`,
			defaultFontSize: 16,
			viewport: plus_.screen.resolutionWidth
		}
	}, style);
	const page = plus_.webview.create("", pageId, style, { extras: {
		from: getPageId(),
		runtime: getRuntime(),
		data: extend({}, data, { darkmode }),
		useGlobalEvent: !BroadcastChannel_
	} });
	page.addEventListener("close", onClose);
	addEventListener(pageId, (message) => {
		if (isFunction(onMessage)) onMessage(message.data);
		if (!message.keep) page.close("auto");
	});
	page.show(style.animationType, style.animationDuration);
	return new Page(page);
}
//#endregion
//#region src/components/label.ts
var labelProps = { for: {
	type: String,
	default: ""
} };
var uniLabelKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniLabel" : "ul");
function useProvideLabel() {
	const handlers = [];
	provide(uniLabelKey, {
		addHandler(handler) {
			handlers.push(handler);
		},
		removeHandler(handler) {
			handlers.splice(handlers.indexOf(handler), 1);
		}
	});
	return handlers;
}
//#endregion
//#region src/nvue/label/index.tsx
var label_default = /* @__PURE__ */ defineComponent({
	name: "Label",
	props: labelProps,
	styles: [],
	setup(props, { slots }) {
		const pageId = useCurrentPageId();
		const handlers = useProvideLabel();
		const _onClick = ($event) => {
			if (props.for) UniViewJSBridge.emit(`uni-label-click-${pageId}-${props.for}`, $event, true);
			else handlers.length && handlers[0]($event, true);
		};
		return () => createVNode("view", { "onClick": _onClick }, [slots.default && slots.default()]);
	}
});
//#endregion
//#region src/helpers/useListeners.ts
function useListeners(props, listeners) {
	_addListeners(props.id, listeners);
	watch(() => props.id, (newId, oldId) => {
		_removeListeners(oldId, listeners, true);
		_addListeners(newId, listeners, true);
	});
	onUnmounted(() => {
		_removeListeners(props.id, listeners);
	});
}
function _addListeners(id, listeners, watch) {
	const pageId = useCurrentPageId();
	if (watch && !id) return;
	if (!isPlainObject(listeners)) return;
	Object.keys(listeners).forEach((name) => {
		if (watch) {
			if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) UniViewJSBridge.on(`uni-${name}-${pageId}-${id}`, listeners[name]);
		} else if (name.indexOf("uni-") === 0) UniViewJSBridge.on(name, listeners[name]);
		else if (id) UniViewJSBridge.on(`uni-${name}-${pageId}-${id}`, listeners[name]);
	});
}
function _removeListeners(id, listeners, watch) {
	const pageId = useCurrentPageId();
	if (watch && !id) return;
	if (!isPlainObject(listeners)) return;
	Object.keys(listeners).forEach((name) => {
		if (watch) {
			if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) UniViewJSBridge.off(`uni-${name}-${pageId}-${id}`, listeners[name]);
		} else if (name.indexOf("uni-") === 0) UniViewJSBridge.off(name, listeners[name]);
		else if (id) UniViewJSBridge.off(`uni-${name}-${pageId}-${id}`, listeners[name]);
	});
}
//#endregion
//#region src/helpers/useAttrs.ts
function entries(obj) {
	return Object.keys(obj).map((key) => [key, obj[key]]);
}
var DEFAULT_EXCLUDE_KEYS = ["class", "style"];
var LISTENER_PREFIX = /^on[A-Z]+/;
var useAttrs = (params = {}) => {
	const { excludeListeners = false, excludeKeys = [] } = params;
	const instance = getCurrentInstance();
	const attrs = shallowRef({});
	const listeners = shallowRef({});
	const excludeAttrs = shallowRef({});
	const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
	instance.attrs = reactive(instance.attrs);
	watchEffect(() => {
		const res = entries(instance.attrs).reduce((acc, [key, val]) => {
			if (allExcludeKeys.includes(key)) acc.exclude[key] = val;
			else if (LISTENER_PREFIX.test(key)) {
				if (!excludeListeners) acc.attrs[key] = val;
				acc.listeners[key] = val;
			} else acc.attrs[key] = val;
			return acc;
		}, {
			exclude: {},
			attrs: {},
			listeners: {}
		});
		attrs.value = res.attrs;
		listeners.value = res.listeners;
		excludeAttrs.value = res.exclude;
	});
	return {
		$attrs: attrs,
		$listeners: listeners,
		$excludeAttrs: excludeAttrs
	};
};
//#endregion
//#region src/components/button.ts
var buttonProps = {
	id: {
		type: String,
		default: ""
	},
	hoverClass: {
		type: String,
		default: "button-hover"
	},
	hoverStartTime: {
		type: [Number, String],
		default: 20
	},
	hoverStayTime: {
		type: [Number, String],
		default: 70
	},
	hoverStopPropagation: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: [Boolean, String],
		default: false
	},
	formType: {
		type: String,
		default: ""
	},
	openType: {
		type: String,
		default: ""
	},
	loading: {
		type: [Boolean, String],
		default: false
	},
	plain: {
		type: [Boolean, String],
		default: false
	}
};
//#endregion
//#region src/components/form.ts
var uniFormKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniForm" : "uf");
//#endregion
//#region src/nvue/button/index.tsx
var buttonStyle = [{
	ub: { "": {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		paddingLeft: "5",
		paddingRight: "5",
		overflow: "hidden",
		color: "#000000",
		backgroundColor: "#f8f8f8",
		borderRadius: "5",
		borderStyle: "solid",
		borderWidth: "1",
		borderColor: "#dbdbdb"
	} },
	"ub-t": { "": {
		color: "#000000",
		fontSize: "18",
		textDecoration: "none",
		lineHeight: "46"
	} },
	"ub-d": { "": { backgroundColor: "#f8f8f8" } },
	"ub-p": { "": {
		backgroundColor: "#007aff",
		borderColor: "#0062cc"
	} },
	"ub-w": { "": {
		backgroundColor: "#e64340",
		borderColor: "#b83633"
	} },
	"ub-d-t": { "": { color: "#000000" } },
	"ub-p-t": { "": { color: "#ffffff" } },
	"ub-w-t": { "": { color: "#ffffff" } },
	"ub-d-d": { "": { backgroundColor: "#f7f7f7" } },
	"ub-p-d": { "": {
		backgroundColor: "#63acfc",
		borderColor: "#4f8aca"
	} },
	"ub-w-d": { "": {
		backgroundColor: "#ec8b89",
		borderColor: "#bd6f6e"
	} },
	"ub-d-t-d": { "": { color: "#cccccc" } },
	"ub-p-t-d": { "": { color: "rgba(255,255,255,0.6)" } },
	"ub-w-t-d": { "": { color: "rgba(255,255,255,0.6)" } },
	"ub-d-plain": { "": {
		borderColor: "#353535",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-p-plain": { "": {
		borderColor: "#007aff",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-w-plain": { "": {
		borderColor: "#e64340",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-d-t-plain": { "": { color: "#353535" } },
	"ub-p-t-plain": { "": { color: "#007aff" } },
	"ub-w-t-plain": { "": { color: "#e64340" } },
	"ub-d-d-plain": { "": {
		borderColor: "#c6c6c6",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-p-d-plain": { "": {
		borderColor: "#c6c6c6",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-w-d-plain": { "": {
		borderColor: "#c6c6c6",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-d-t-d-plain": { "": { color: "rgba(0,0,0,0.2)" } },
	"ub-p-t-d-plain": { "": { color: "rgba(0,0,0,0.2)" } },
	"ub-w-t-d-plain": { "": { color: "rgba(0,0,0,0.2)" } },
	"ub-mini": { "": {
		lineHeight: "30",
		fontSize: "13",
		paddingTop: 0,
		paddingRight: "17.5",
		paddingBottom: 0,
		paddingLeft: "17.5"
	} },
	"ub-loading": { "": {
		width: "18",
		height: "18",
		marginRight: "10"
	} },
	"ub-d-loading": { "": {
		color: "rgba(255,255,255,0.6)",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-p-loading": { "": {
		color: "rgba(255,255,255,0.6)",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-w-loading": { "": {
		color: "rgba(255,255,255,0.6)",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-d-loading-plain": { "": { color: "#353535" } },
	"ub-p-loading-plain": { "": {
		color: "#007aff",
		backgroundColor: "#0062cc"
	} },
	"ub-w-loading-plain": { "": {
		color: "#e64340",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-d-hover": { "": {
		opacity: .8,
		backgroundColor: "#dedede"
	} },
	"ub-p-hover": { "": {
		opacity: .8,
		backgroundColor: "#0062cc"
	} },
	"ub-w-hover": { "": {
		opacity: .8,
		backgroundColor: "#ce3c39"
	} },
	"ub-d-t-hover": { "": { color: "rgba(0,0,0,0.6)" } },
	"ub-p-t-hover": { "": { color: "rgba(255,255,255,0.6)" } },
	"ub-w-t-hover": { "": { color: "rgba(255,255,255,0.6)" } },
	"ub-d-hover-plain": { "": {
		color: "rgba(53,53,53,0.6)",
		borderColor: "rgba(53,53,53,0.6)",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-p-hover-plain": { "": {
		color: "rgba(26,173,25,0.6)",
		borderColor: "rgba(0,122,255,0.6)",
		backgroundColor: "rgba(0,0,0,0)"
	} },
	"ub-w-hover-plain": { "": {
		color: "rgba(230,67,64,0.6)",
		borderColor: "rgba(230,67,64,0.6)",
		backgroundColor: "rgba(0,0,0,0)"
	} }
}];
var TYPES = {
	default: "d",
	primary: "p",
	warn: "w"
};
var button_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	name: "Button",
	props: extend(buttonProps, {
		type: {
			type: String,
			default: "default"
		},
		size: {
			type: String,
			default: "default"
		}
	}),
	styles: buttonStyle,
	setup(props, { slots, attrs }) {
		const { $attrs, $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
		const type = props.type;
		const rootRef = ref(null);
		const uniForm = inject(uniFormKey, false);
		const onClick = (e, isLabelClick) => {
			const _onClick = $listeners.value.onClick || (() => {});
			if (props.disabled) return;
			_onClick(e);
			const formType = props.formType;
			if (formType) {
				if (!uniForm) return;
				if (formType === "submit") uniForm.submit(e);
				else if (formType === "reset") uniForm.reset(e);
			}
		};
		const _getClass = (t) => {
			let cl = "ub-" + TYPES[type] + t;
			props.disabled && (cl += "-d");
			props.plain && (cl += "-plain");
			props.size === "mini" && t === "-t" && (cl += " ub-mini");
			return cl;
		};
		const _getHoverClass = (t) => {
			if (props.disabled) return "";
			let cl = "ub-" + TYPES[type] + t + "-hover";
			props.plain && (cl += "-plain");
			return cl;
		};
		const uniLabel = inject(uniLabelKey, false);
		if (uniLabel) {
			uniLabel.addHandler(onClick);
			onBeforeUnmount(() => {
				uniLabel.removeHandler(onClick);
			});
		}
		useListeners(props, { "label-click": onClick });
		const _listeners = computed(() => {
			const obj = {};
			for (const eventName in $listeners.value) {
				const event = $listeners.value[eventName];
				if (eventName !== "onClick") obj[eventName] = event;
			}
			return obj;
		});
		const wrapSlots = () => {
			if (!slots.default) return [];
			const vnodes = slots.default();
			if (vnodes.length === 1 && vnodes[0].type === Text$1) return [createNVueTextVNode(vnodes[0].children, { class: "ub-t " + _getClass("-t") })];
			return vnodes;
		};
		return () => {
			const _attrs = extend({}, useHoverClass(props), { hoverClass: _getHoverClass("") }, $attrs.value, $excludeAttrs.value, _listeners.value);
			return createVNode("view", mergeProps({
				"ref": rootRef,
				"class": ["ub", _getClass("")],
				"onClick": onClick
			}, _attrs), [props.loading ? createVNode("loading-indicator", mergeProps({ "class": ["ub-loading", `ub-${TYPES[type]}-loading`] }, {
				arrow: "false",
				animating: "true"
			}), null) : null, ...wrapSlots()]);
		};
	}
});
//#endregion
//#region src/components/movableArea.ts
var movableAreaProps = { scaleArea: {
	type: Boolean,
	default: false
} };
//#endregion
//#region src/helpers/flatVNode.ts
function flatVNode(nodes) {
	const array = [];
	if (isArray(nodes)) nodes.forEach((vnode) => {
		if (isVNode(vnode)) if (vnode.type === Fragment) array.push(...flatVNode(vnode.children));
		else array.push(vnode);
		else if (isArray(vnode)) array.push(...flatVNode(vnode));
	});
	return array;
}
//#endregion
//#region src/nvue/helpers/common.ts
function cached(fn) {
	const cache = Object.create(null);
	return function cachedFn(str) {
		return cache[str] || (cache[str] = fn(str));
	};
}
var parseStyleText = cached(function(cssText) {
	const res = {};
	const listDelimiter = /;(?![^(]*\))/g;
	const propertyDelimiter = /:(.+)/;
	cssText.split(listDelimiter).forEach(function(item) {
		if (item) {
			const tmp = item.split(propertyDelimiter);
			tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
		}
	});
	return res;
});
//#endregion
//#region src/nvue/helpers/dom.ts
var getComponentSize = (el) => {
	return new Promise((resolve, reject) => {
		if (!el) return resolve({
			width: 0,
			height: 0,
			top: 0,
			left: 0
		});
		weex.requireModule("dom").getComponentRect(el, ({ size }) => {
			resolve(size);
		});
	});
};
//#endregion
//#region src/nvue/movable-area/index.tsx
var movable_area_default = /* @__PURE__ */ defineComponent({
	name: "MovableArea",
	props: movableAreaProps,
	styles: [{ "uni-movable-area": { "": {
		overflow: "hidden",
		width: "10px",
		height: "10px"
	} } }],
	setup(props, { slots }) {
		const width = ref(0);
		const height = ref(0);
		const top = ref(0);
		const left = ref(0);
		const _isMounted = ref(false);
		const rootRef = ref(null);
		const originMovableViewContexts = [];
		let touchMovableView = null;
		const setTouchMovableViewContext = (movableview) => {
			touchMovableView = movableview;
		};
		const _getWH = () => {
			return getComponentSize(rootRef.value).then(({ width: _width, height: _height, top: _top, left: _left }) => {
				width.value = _width;
				height.value = _height;
				top.value = _top;
				left.value = _left;
			});
		};
		const _resize = () => {
			_getWH().then(() => {
				originMovableViewContexts.forEach(function(item) {
					item.setParent();
				});
			});
		};
		onMounted(() => {
			setTimeout(() => {
				_isMounted.value = true;
				_resize();
			}, 200);
		});
		const listeners = {
			onPanstart(e) {
				touchMovableView && touchMovableView.touchstart(e);
			},
			onPanmove(e) {
				e.stopPropagation();
				touchMovableView && touchMovableView.touchmove(e);
			},
			onPanend(e) {
				touchMovableView && touchMovableView.touchend(e);
				touchMovableView = null;
			}
		};
		const addMovableViewContext = (movableViewContext) => {
			originMovableViewContexts.push(movableViewContext);
		};
		const removeMovableViewContext = (movableViewContext) => {
			const index = originMovableViewContexts.indexOf(movableViewContext);
			if (index >= 0) originMovableViewContexts.splice(index, 1);
		};
		provide("_isMounted", _isMounted);
		provide("parentSize", {
			width,
			height,
			top,
			left
		});
		provide("addMovableViewContext", addMovableViewContext);
		provide("removeMovableViewContext", removeMovableViewContext);
		provide("setTouchMovableViewContext", setTouchMovableViewContext);
		return () => {
			const movableViewItems = flatVNode(slots.default && slots.default());
			return createVNode("view", mergeProps({
				"ref": rootRef,
				"class": "uni-movable-area"
			}, listeners), [movableViewItems]);
		};
	}
});
//#endregion
//#region src/nvue/movable-view/useTouchtrack.ts
function useTouchtrack(method) {
	const __event = {};
	function callback(type, $event) {
		if (__event[type]) __event[type]($event);
	}
	function addListener(type, callback) {
		__event[type] = function($event) {
			if (isFunction(callback)) {
				$event.touches = $event.changedTouches;
				if (callback($event) === false) $event.stopPropagation();
			}
		};
	}
	let x0 = 0;
	let y0 = 0;
	let x1 = 0;
	let y1 = 0;
	const fn = function($event, state, x, y) {
		if (method({
			target: $event.target,
			currentTarget: $event.currentTarget,
			stopPropagation: $event.stopPropagation.bind($event),
			touches: $event.touches,
			changedTouches: $event.changedTouches,
			detail: {
				state,
				x,
				y,
				dx: x - x0,
				dy: y - y0,
				ddx: x - x1,
				ddy: y - y1,
				timeStamp: $event.timeStamp || Date.now()
			}
		}) === false) return false;
	};
	let $eventOld = null;
	addListener("touchstart", function($event) {
		if (!$eventOld) {
			$eventOld = $event;
			x0 = x1 = $event.touches[0].pageX;
			y0 = y1 = $event.touches[0].pageY;
			return fn($event, "start", x0, y0);
		}
	});
	addListener("touchmove", function($event) {
		if ($eventOld) {
			const res = fn($event, "move", $event.touches[0].pageX, $event.touches[0].pageY);
			x1 = $event.touches[0].pageX;
			y1 = $event.touches[0].pageY;
			return res;
		}
	});
	addListener("touchend", function($event) {
		if ($eventOld) {
			$eventOld = null;
			return fn($event, "end", $event.changedTouches[0].pageX, $event.changedTouches[0].pageY);
		}
	});
	return {
		touchstart: function($event) {
			callback("touchstart", $event);
		},
		touchmove: function($event) {
			callback("touchmove", $event);
		},
		touchend: function($event) {
			callback("touchend", $event);
		}
	};
}
//#endregion
//#region src/helpers/useNVueEvent.ts
function useCustomEvent(ref, emit) {
	return (name, detail) => {
		if (ref.value) emit(name, normalizeCustomEvent(name, ref.value, detail || {}));
	};
}
function normalizeCustomEvent(name, target, detail = {}) {
	target = processTarget(target);
	return {
		type: name,
		timeStamp: Date.now(),
		target,
		currentTarget: target,
		detail
	};
}
var firstLetterToLowerCase = cacheStringFunction((str) => {
	return str.charAt(0).toLowerCase() + str.slice(1);
});
function processTarget(weexTarget) {
	const { offsetLeft, offsetTop } = weexTarget;
	const attr = weexTarget.attr;
	const dataset = {};
	Object.keys(attr || {}).forEach((key) => {
		if (key.indexOf("data") === 0) dataset[firstLetterToLowerCase(key.replace("data", ""))] = attr[key];
	});
	return {
		id: attr && attr.id || "",
		dataset,
		offsetLeft: offsetLeft || 0,
		offsetTop: offsetTop || 0
	};
}
//#endregion
//#region src/components/movable-view/utils.js
function e(e, t, n) {
	return e > t - n && e < t + n;
}
function t(t, n) {
	return e(t, 0, n);
}
function Decline() {}
Decline.prototype.x = function(e) {
	return Math.sqrt(e);
};
function Friction(e, t) {
	this._m = e;
	this._f = 1e3 * t;
	this._startTime = 0;
	this._v = 0;
}
Friction.prototype.setV = function(x, y) {
	const n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), .5);
	this._x_v = x;
	this._y_v = y;
	this._x_a = -this._f * this._x_v / n;
	this._y_a = -this._f * this._y_v / n;
	this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a);
	this._lastDt = null;
	this._startTime = (/* @__PURE__ */ new Date()).getTime();
};
Friction.prototype.setS = function(x, y) {
	this._x_s = x;
	this._y_s = y;
};
Friction.prototype.s = function(t) {
	if (void 0 === t) t = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	if (t > this._t) {
		t = this._t;
		this._lastDt = t;
	}
	let x = this._x_v * t + .5 * this._x_a * Math.pow(t, 2) + this._x_s;
	let y = this._y_v * t + .5 * this._y_a * Math.pow(t, 2) + this._y_s;
	if (this._x_a > 0 && x < this._endPositionX || this._x_a < 0 && x > this._endPositionX) x = this._endPositionX;
	if (this._y_a > 0 && y < this._endPositionY || this._y_a < 0 && y > this._endPositionY) y = this._endPositionY;
	return {
		x,
		y
	};
};
Friction.prototype.ds = function(t) {
	if (void 0 === t) t = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	if (t > this._t) t = this._t;
	return {
		dx: this._x_v + this._x_a * t,
		dy: this._y_v + this._y_a * t
	};
};
Friction.prototype.delta = function() {
	return {
		x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0,
		y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0
	};
};
Friction.prototype.dt = function() {
	return -this._x_v / this._x_a;
};
Friction.prototype.done = function() {
	const t = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
	this._lastDt = null;
	return t;
};
Friction.prototype.setEnd = function(x, y) {
	this._endPositionX = x;
	this._endPositionY = y;
};
Friction.prototype.reconfigure = function(m, f) {
	this._m = m;
	this._f = 1e3 * f;
};
function Spring(m, k, c) {
	this._m = m;
	this._k = k;
	this._c = c;
	this._solution = null;
	this._endPosition = 0;
	this._startTime = 0;
}
Spring.prototype._solve = function(e, t) {
	const n = this._c;
	const i = this._m;
	const r = this._k;
	const o = n * n - 4 * i * r;
	if (o === 0) {
		const a = -n / (2 * i);
		const s = e;
		const l = t / (a * e);
		return {
			x: function(e) {
				return (s + l * e) * Math.pow(Math.E, a * e);
			},
			dx: function(e) {
				const t = Math.pow(Math.E, a * e);
				return a * (s + l * e) * t + l * t;
			}
		};
	}
	if (o > 0) {
		const c = (-n - Math.sqrt(o)) / (2 * i);
		const u = (-n + Math.sqrt(o)) / (2 * i);
		const d = (t - c * e) / (u - c);
		const h = e - d;
		return {
			x: function(e) {
				let t;
				let n;
				if (e === this._t) {
					t = this._powER1T;
					n = this._powER2T;
				}
				this._t = e;
				if (!t) t = this._powER1T = Math.pow(Math.E, c * e);
				if (!n) n = this._powER2T = Math.pow(Math.E, u * e);
				return h * t + d * n;
			},
			dx: function(e) {
				let t;
				let n;
				if (e === this._t) {
					t = this._powER1T;
					n = this._powER2T;
				}
				this._t = e;
				if (!t) t = this._powER1T = Math.pow(Math.E, c * e);
				if (!n) n = this._powER2T = Math.pow(Math.E, u * e);
				return h * c * t + d * u * n;
			}
		};
	}
	const p = Math.sqrt(4 * i * r - n * n) / (2 * i);
	const f = -n / 2 * i;
	const v = e;
	const g = (t - f * e) / p;
	return {
		x: function(e) {
			return Math.pow(Math.E, f * e) * (v * Math.cos(p * e) + g * Math.sin(p * e));
		},
		dx: function(e) {
			const t = Math.pow(Math.E, f * e);
			const n = Math.cos(p * e);
			const i = Math.sin(p * e);
			return t * (g * p * n - v * p * i) + f * t * (g * i + v * n);
		}
	};
};
Spring.prototype.x = function(e) {
	if (void 0 === e) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return this._solution ? this._endPosition + this._solution.x(e) : 0;
};
Spring.prototype.dx = function(e) {
	if (void 0 === e) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return this._solution ? this._solution.dx(e) : 0;
};
Spring.prototype.setEnd = function(e, n, i) {
	if (!i) i = (/* @__PURE__ */ new Date()).getTime();
	if (e !== this._endPosition || !t(n, .1)) {
		n = n || 0;
		let r = this._endPosition;
		if (this._solution) {
			if (t(n, .1)) n = this._solution.dx((i - this._startTime) / 1e3);
			r = this._solution.x((i - this._startTime) / 1e3);
			if (t(n, .1)) n = 0;
			if (t(r, .1)) r = 0;
			r += this._endPosition;
		}
		if (!(this._solution && t(r - e, .1) && t(n, .1))) {
			this._endPosition = e;
			this._solution = this._solve(r - this._endPosition, n);
			this._startTime = i;
		}
	}
};
Spring.prototype.snap = function(e) {
	this._startTime = (/* @__PURE__ */ new Date()).getTime();
	this._endPosition = e;
	this._solution = {
		x: function() {
			return 0;
		},
		dx: function() {
			return 0;
		}
	};
};
Spring.prototype.done = function(n) {
	if (!n) n = (/* @__PURE__ */ new Date()).getTime();
	return e(this.x(), this._endPosition, .1) && t(this.dx(), .1);
};
Spring.prototype.reconfigure = function(m, t, c) {
	this._m = m;
	this._k = t;
	this._c = c;
	if (!this.done()) {
		this._solution = this._solve(this.x() - this._endPosition, this.dx());
		this._startTime = (/* @__PURE__ */ new Date()).getTime();
	}
};
Spring.prototype.springConstant = function() {
	return this._k;
};
Spring.prototype.damping = function() {
	return this._c;
};
Spring.prototype.configuration = function() {
	function e(e, t) {
		e.reconfigure(1, t, e.damping());
	}
	function t(e, t) {
		e.reconfigure(1, e.springConstant(), t);
	}
	return [{
		label: "Spring Constant",
		read: this.springConstant.bind(this),
		write: e.bind(this, this),
		min: 100,
		max: 1e3
	}, {
		label: "Damping",
		read: this.damping.bind(this),
		write: t.bind(this, this),
		min: 1,
		max: 500
	}];
};
function STD(e, t, n) {
	this._springX = new Spring(e, t, n);
	this._springY = new Spring(e, t, n);
	this._springScale = new Spring(e, t, n);
	this._startTime = 0;
}
STD.prototype.setEnd = function(e, t, n, i) {
	const r = (/* @__PURE__ */ new Date()).getTime();
	this._springX.setEnd(e, i, r);
	this._springY.setEnd(t, i, r);
	this._springScale.setEnd(n, i, r);
	this._startTime = r;
};
STD.prototype.x = function() {
	const e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return {
		x: this._springX.x(e),
		y: this._springY.x(e),
		scale: this._springScale.x(e)
	};
};
STD.prototype.done = function() {
	const e = (/* @__PURE__ */ new Date()).getTime();
	return this._springX.done(e) && this._springY.done(e) && this._springScale.done(e);
};
STD.prototype.reconfigure = function(e, t, n) {
	this._springX.reconfigure(e, t, n);
	this._springY.reconfigure(e, t, n);
	this._springScale.reconfigure(e, t, n);
};
//#endregion
//#region src/components/movable-view/index.ts
var movableViewProps = {
	direction: {
		type: String,
		default: "none"
	},
	inertia: {
		type: [Boolean, String],
		default: false
	},
	outOfBounds: {
		type: [Boolean, String],
		default: false
	},
	x: {
		type: [Number, String],
		default: 0
	},
	y: {
		type: [Number, String],
		default: 0
	},
	damping: {
		type: [Number, String],
		default: 20
	},
	friction: {
		type: [Number, String],
		default: 2
	},
	disabled: {
		type: [Boolean, String],
		default: false
	},
	scale: {
		type: [Boolean, String],
		default: false
	},
	scaleMin: {
		type: [Number, String],
		default: .1
	},
	scaleMax: {
		type: [Number, String],
		default: 10
	},
	scaleValue: {
		type: [Number, String],
		default: 1
	},
	animation: {
		type: [Boolean, String],
		default: true
	}
};
function v(a, b) {
	return +((1e3 * a - 1e3 * b) / 1e3).toFixed(1);
}
//#endregion
//#region src/nvue/movable-view/index.tsx
function g(friction, execute, endCallback) {
	let record = {
		id: 0,
		cancelled: false
	};
	let cancel = function(record) {
		if (record && record.id) cancelAnimationFrame(record.id);
		if (record) record.cancelled = true;
	};
	function fn(record, friction, execute, endCallback) {
		if (!record || !record.cancelled) {
			execute(friction);
			let isDone = friction.done();
			if (!isDone) {
				if (!record.cancelled) record.id = requestAnimationFrame(fn.bind(null, record, friction, execute, endCallback));
			}
			if (isDone && endCallback) endCallback(friction);
		}
	}
	fn(record, friction, execute, endCallback);
	return {
		cancel: cancel.bind(null, record),
		model: friction
	};
}
var requesting = false;
function _requestAnimationFrame(e) {
	if (!requesting) {
		requesting = true;
		requestAnimationFrame(function() {
			e();
			requesting = false;
		});
	}
}
function requestAnimationFrame(callback) {
	return setTimeout(callback, 16);
}
function cancelAnimationFrame(id) {
	clearTimeout(id);
}
var animation = weex.requireModule("animation");
var movable_view_default = /* @__PURE__ */ defineComponent({
	name: "MovableView",
	props: movableViewProps,
	emits: ["change", "scale"],
	styles: [{ "uni-movable-view": { "": {
		position: "absolute",
		top: "0px",
		left: "0px",
		width: "10px",
		height: "10px"
	} } }],
	setup(props, { emit, slots }) {
		const rootRef = ref(null);
		const touchStart = useMovableViewState(props, useCustomEvent(rootRef, emit), rootRef, inject("setTouchMovableViewContext", () => {}));
		return () => {
			return createVNode("view", mergeProps({
				"ref": rootRef,
				"onTouchstart": touchStart,
				"class": "uni-movable-view",
				"style": "transform-origin: center;"
			}, { preventGesture: true }), [slots.default && slots.default()]);
		};
	}
});
function useMovableViewState(props, trigger, rootRef, setTouchMovableViewContext) {
	const _isMounted = inject("_isMounted", ref(false));
	const parentSize = inject("parentSize", {
		width: ref(0),
		height: ref(0),
		top: ref(0),
		left: ref(0)
	});
	const addMovableViewContext = inject("addMovableViewContext", () => {});
	const removeMovableViewContext = inject("removeMovableViewContext", () => {});
	let movableViewContext = {
		touchstart: () => {},
		touchmove: () => {},
		touchend: () => {}
	};
	function _getPx(val) {
		return Number(val) || 0;
	}
	function _getScaleNumber(val) {
		val = Number(val);
		return isNaN(val) ? 1 : val;
	}
	const xSync = ref(_getPx(props.x));
	const ySync = ref(_getPx(props.y));
	const scaleValueSync = ref(_getScaleNumber(Number(props.scaleValue)));
	const width = ref(0);
	const height = ref(0);
	const minX = ref(0);
	const minY = ref(0);
	const maxX = ref(0);
	const maxY = ref(0);
	let _SFA = null;
	let _FA = null;
	const _offset = {
		x: 0,
		y: 0
	};
	const _scaleOffset = {
		x: 0,
		y: 0
	};
	let _scale = 1;
	let _translateX = 0;
	let _translateY = 0;
	let _isTouching = false;
	let __baseX;
	let __baseY;
	let _checkCanMove = null;
	let _firstMoveDirection = null;
	let _rect = {
		top: 0,
		left: 0,
		width: 0,
		height: 0
	};
	const _declineX = new Decline();
	const _declineY = new Decline();
	const __touchInfo = {
		historyX: [0, 0],
		historyY: [0, 0],
		historyT: [0, 0]
	};
	const dampingNumber = computed(() => {
		let val = Number(props.damping);
		return isNaN(val) ? 20 : val;
	});
	const frictionNumber = computed(() => {
		let val = Number(props.friction);
		return isNaN(val) || val <= 0 ? 2 : val;
	});
	const scaleMinNumber = computed(() => {
		let val = Number(props.scaleMin);
		return isNaN(val) ? .1 : val;
	});
	const scaleMaxNumber = computed(() => {
		let val = Number(props.scaleMax);
		return isNaN(val) ? 10 : val;
	});
	const xMove = computed(() => props.direction === "all" || props.direction === "horizontal");
	const yMove = computed(() => props.direction === "all" || props.direction === "vertical");
	const _STD = new STD(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
	const _friction = new Friction(1, frictionNumber.value);
	watch(() => props.x, (val) => {
		xSync.value = _getPx(val);
	});
	watch(() => props.y, (val) => {
		ySync.value = _getPx(val);
	});
	watch(() => props.scaleValue, (val) => {
		scaleValueSync.value = _getScaleNumber(Number(val));
	});
	watch(xSync, _setX);
	watch(ySync, _setY);
	watch(scaleValueSync, _setScaleValue);
	watch(scaleMinNumber, _setScaleMinOrMax);
	watch(scaleMaxNumber, _setScaleMinOrMax);
	function FAandSFACancel() {
		if (_FA) _FA.cancel();
		if (_SFA) _SFA.cancel();
	}
	function _setX(val) {
		if (xMove.value) if (val + _scaleOffset.x === _translateX) return _translateX;
		else {
			if (_SFA) _SFA.cancel();
			_animationTo(val + _scaleOffset.x, ySync.value + _scaleOffset.y, _scale);
		}
		return val;
	}
	function _setY(val) {
		if (yMove.value) if (val + _scaleOffset.y === _translateY) return _translateY;
		else {
			if (_SFA) _SFA.cancel();
			_animationTo(xSync.value + _scaleOffset.x, val + _scaleOffset.y, _scale);
		}
		return val;
	}
	function _setScaleMinOrMax() {
		if (!props.scale) return false;
		_updateScale(_scale, true);
	}
	function _setScaleValue(scale) {
		if (!props.scale) return false;
		scale = _adjustScale(scale);
		_updateScale(scale, true);
		return scale;
	}
	function __handleTouchStart() {
		if (!props.disabled) {
			FAandSFACancel();
			__touchInfo.historyX = [0, 0];
			__touchInfo.historyY = [0, 0];
			__touchInfo.historyT = [0, 0];
			if (xMove.value) __baseX = _translateX;
			if (yMove.value) __baseY = _translateY;
			_checkCanMove = null;
			_firstMoveDirection = null;
			_isTouching = true;
		}
	}
	function __handleTouchMove(event) {
		if (!props.disabled && _isTouching) {
			let x = _translateX;
			let y = _translateY;
			if (_firstMoveDirection === null) _firstMoveDirection = Math.abs(event.detail.dx / event.detail.dy) > 1 ? "htouchmove" : "vtouchmove";
			if (xMove.value) {
				x = event.detail.dx + __baseX;
				__touchInfo.historyX.shift();
				__touchInfo.historyX.push(x);
				if (!yMove.value && _checkCanMove === null) _checkCanMove = Math.abs(event.detail.dx / event.detail.dy) < 1;
			}
			if (yMove.value) {
				y = event.detail.dy + __baseY;
				__touchInfo.historyY.shift();
				__touchInfo.historyY.push(y);
				if (!xMove.value && _checkCanMove === null) _checkCanMove = Math.abs(event.detail.dy / event.detail.dx) < 1;
			}
			__touchInfo.historyT.shift();
			__touchInfo.historyT.push(event.detail.timeStamp);
			if (!_checkCanMove) {
				let source = "touch";
				if (x < minX.value) if (props.outOfBounds) {
					source = "touch-out-of-bounds";
					x = minX.value - _declineX.x(minX.value - x);
				} else x = minX.value;
				else if (x > maxX.value) if (props.outOfBounds) {
					source = "touch-out-of-bounds";
					x = maxX.value + _declineX.x(x - maxX.value);
				} else x = maxX.value;
				if (y < minY.value) if (props.outOfBounds) {
					source = "touch-out-of-bounds";
					y = minY.value - _declineY.x(minY.value - y);
				} else y = minY.value;
				else if (y > maxY.value) if (props.outOfBounds) {
					source = "touch-out-of-bounds";
					y = maxY.value + _declineY.x(y - maxY.value);
				} else y = maxY.value;
				_requestAnimationFrame(function() {
					_setTransform(x, y, _scale, source);
				});
			}
		}
	}
	function __handleTouchEnd() {
		if (!props.disabled && _isTouching) {
			_isTouching = false;
			if (!_checkCanMove && !_revise("out-of-bounds") && props.inertia) {
				const xv = 1e3 * (__touchInfo.historyX[1] - __touchInfo.historyX[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
				const yv = 1e3 * (__touchInfo.historyY[1] - __touchInfo.historyY[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
				_friction.setV(xv, yv);
				_friction.setS(_translateX, _translateY);
				const x0 = _friction.delta().x;
				const y0 = _friction.delta().y;
				let x = x0 + _translateX;
				let y = y0 + _translateY;
				if (x < minX.value) {
					x = minX.value;
					y = _translateY + (minX.value - _translateX) * y0 / x0;
				} else if (x > maxX.value) {
					x = maxX.value;
					y = _translateY + (maxX.value - _translateX) * y0 / x0;
				}
				if (y < minY.value) {
					y = minY.value;
					x = _translateX + (minY.value - _translateY) * x0 / y0;
				} else if (y > maxY.value) {
					y = maxY.value;
					x = _translateX + (maxY.value - _translateY) * x0 / y0;
				}
				_friction.setEnd(x, y);
				_FA = g(_friction, function() {
					let t = _friction.s();
					let x = t.x;
					let y = t.y;
					_setTransform(x, y, _scale, "friction");
				}, function() {
					_FA.cancel();
				});
			}
		}
	}
	function _getLimitXY(x, y) {
		let outOfBounds = false;
		if (x > maxX.value) {
			x = maxX.value;
			outOfBounds = true;
		} else if (x < minX.value) {
			x = minX.value;
			outOfBounds = true;
		}
		if (y > maxY.value) {
			y = maxY.value;
			outOfBounds = true;
		} else if (y < minY.value) {
			y = minY.value;
			outOfBounds = true;
		}
		return {
			x,
			y,
			outOfBounds
		};
	}
	function _updateOffset() {
		_offset.x = _rect.left - parentSize.left.value;
		_offset.y = _rect.top - parentSize.top.value;
	}
	function _updateWH(scale) {
		scale = scale || _scale;
		scale = _adjustScale(scale);
		height.value = _rect.height / _scale;
		width.value = _rect.width / _scale;
		let _height = height.value * scale;
		_scaleOffset.x = (width.value * scale - width.value) / 2;
		_scaleOffset.y = (_height - height.value) / 2;
	}
	function _updateBoundary() {
		let x = 0 - _offset.x + _scaleOffset.x;
		let _width = parentSize.width.value - width.value - _offset.x - _scaleOffset.x;
		minX.value = Math.min(x, _width);
		maxX.value = Math.max(x, _width);
		let y = 0 - _offset.y + _scaleOffset.y;
		let _height = parentSize.height.value - height.value - _offset.y - _scaleOffset.y;
		minY.value = Math.min(y, _height);
		maxY.value = Math.max(y, _height);
	}
	function _updateScale(scale, animat) {
		if (props.scale) {
			scale = _adjustScale(scale);
			_updateWH(scale);
			_updateBoundary();
			const limitXY = _getLimitXY(_translateX, _translateY);
			const x = limitXY.x;
			const y = limitXY.y;
			if (animat) _animationTo(x, y, scale, "", true, true);
			else _requestAnimationFrame(function() {
				_setTransform(x, y, scale, "", true, true);
			});
		}
	}
	function _adjustScale(scale) {
		scale = Math.max(.1, scaleMinNumber.value, scale);
		scale = Math.min(10, scaleMaxNumber.value, scale);
		return scale;
	}
	function _animationTo(x, y, scale, source, r, o) {
		FAandSFACancel();
		if (!xMove.value) x = _translateX;
		if (!yMove.value) y = _translateY;
		if (!props.scale) scale = _scale;
		let limitXY = _getLimitXY(x, y);
		x = limitXY.x;
		y = limitXY.y;
		if (!props.animation) {
			_setTransform(x, y, scale, source, r, o);
			return;
		}
		_STD._springX._solution = null;
		_STD._springY._solution = null;
		_STD._springScale._solution = null;
		_STD._springX._endPosition = _translateX;
		_STD._springY._endPosition = _translateY;
		_STD._springScale._endPosition = _scale;
		_STD.setEnd(x, y, scale, 1);
		_SFA = g(_STD, function() {
			let data = _STD.x();
			let x = data.x;
			let y = data.y;
			let scale = data.scale;
			_setTransform(x, y, scale, source, r, o);
		}, function() {
			_SFA.cancel();
		});
	}
	function _revise(source) {
		let limitXY = _getLimitXY(_translateX, _translateY);
		let x = limitXY.x;
		let y = limitXY.y;
		let outOfBounds = limitXY.outOfBounds;
		if (outOfBounds) _animationTo(x, y, _scale, source);
		return outOfBounds;
	}
	function _setTransform(x, y, scale, source = "", r, o) {
		if (!(x !== null && x.toString() !== "NaN" && typeof x === "number")) x = _translateX || 0;
		if (!(y !== null && y.toString() !== "NaN" && typeof y === "number")) y = _translateY || 0;
		x = Number(x.toFixed(1));
		y = Number(y.toFixed(1));
		scale = Number(scale.toFixed(1));
		if (!(_translateX === x && _translateY === y)) {
			if (!r) trigger("change", {
				x: v(x, _scaleOffset.x),
				y: v(y, _scaleOffset.y),
				source
			});
		}
		if (!props.scale) scale = _scale;
		scale = _adjustScale(scale);
		scale = +scale.toFixed(3);
		if (o && scale !== _scale) trigger("scale", {
			x,
			y,
			scale
		});
		const transform = `translate(${x}px, ${y}px) scale(${scale})`;
		animation.transition(rootRef.value, {
			styles: { transform },
			duration: 0,
			delay: 0
		});
		_translateX = x;
		_translateY = y;
		_scale = scale;
	}
	function _updateRect() {
		return getComponentSize(rootRef.value).then((rect) => {
			_rect = rect;
		});
	}
	function setParent() {
		if (!_isMounted.value) return;
		FAandSFACancel();
		let scale = props.scale ? scaleValueSync.value : 1;
		_updateOffset();
		_updateWH(scale);
		_updateBoundary();
		_translateX = xSync.value + _scaleOffset.x;
		_translateY = ySync.value + _scaleOffset.y;
		let limitXY = _getLimitXY(_translateX, _translateY);
		let x = limitXY.x;
		let y = limitXY.y;
		_setTransform(x, y, scale, "", true);
	}
	onMounted(() => {
		movableViewContext = useTouchtrack((event) => {
			switch (event.detail.state) {
				case "start":
					__handleTouchStart();
					break;
				case "move":
					__handleTouchMove(event);
					break;
				case "end": __handleTouchEnd();
			}
		});
		setTimeout(() => {
			_updateRect().then(() => {
				setParent();
			});
		}, 100);
		_friction.reconfigure(1, frictionNumber.value);
		_STD.reconfigure(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
		const context = { setParent };
		addMovableViewContext(context);
		onUnmounted(() => {
			removeMovableViewContext(context);
		});
	});
	onUnmounted(() => {
		FAandSFACancel();
	});
	const touchStart = () => {
		setTouchMovableViewContext(movableViewContext);
	};
	return touchStart;
}
//#endregion
//#region src/components/progress.ts
var FONT_SIZE = 16;
var PROGRESS_VALUES = {
	activeColor: PRIMARY_COLOR,
	backgroundColor: "#EBEBEB",
	activeMode: "backwards"
};
var progress_default = /* @__PURE__ */ defineComponent({
	name: "Progress",
	props: {
		percent: {
			type: [Number, String],
			default: 0,
			validator(value) {
				return !isNaN(parseFloat(value));
			}
		},
		fontSize: {
			type: [String, Number],
			default: FONT_SIZE
		},
		showInfo: {
			type: [Boolean, String],
			default: false
		},
		strokeWidth: {
			type: [Number, String],
			default: 6,
			validator(value) {
				return !isNaN(parseFloat(value));
			}
		},
		color: {
			type: String,
			default: PROGRESS_VALUES.activeColor
		},
		activeColor: {
			type: String,
			default: PROGRESS_VALUES.activeColor
		},
		backgroundColor: {
			type: String,
			default: PROGRESS_VALUES.backgroundColor
		},
		active: {
			type: [Boolean, String],
			default: false
		},
		activeMode: {
			type: String,
			default: PROGRESS_VALUES.activeMode
		},
		duration: {
			type: [Number, String],
			default: 30,
			validator(value) {
				return !isNaN(parseFloat(value));
			}
		},
		borderRadius: {
			type: [Number, String],
			default: 0
		}
	},
	styles: [{
		"uni-progress": { "": {
			flex: 1,
			flexDirection: "row",
			alignItems: "center"
		} },
		"uni-progress-bar": { "": { flex: 1 } },
		"uni-progress-inner-bar": { "": { position: "absolute" } },
		"uni-progress-info": { "": { marginLeft: "15px" } }
	}],
	emits: ["activeend"],
	setup(props, { emit }) {
		const progressRef = ref(null);
		const progressBarRef = ref(null);
		const trigger = useCustomEvent(progressRef, emit);
		const state = useProgressState(props);
		watch(() => state.realPercent, (newValue, oldValue) => {
			state.lastPercent = oldValue || 0;
			_activeAnimation(state, props, trigger);
		});
		onMounted(() => {
			setTimeout(() => {
				getComponentSize(progressBarRef.value).then(({ width }) => {
					state.progressWidth = width || 0;
					_activeAnimation(state, props, trigger);
				});
			}, 50);
		});
		return () => {
			const { showInfo, fontSize } = props;
			const { outerBarStyle, innerBarStyle, currentPercent } = state;
			return createVNode("div", {
				"ref": progressRef,
				"class": "uni-progress"
			}, [createVNode("div", {
				"ref": progressBarRef,
				"style": outerBarStyle,
				"class": "uni-progress-bar"
			}, [createVNode("div", {
				"style": innerBarStyle,
				"class": "uni-progress-inner-bar"
			}, null)]), showInfo ? createNVueTextVNode(currentPercent + "%", {
				class: "uni-progress-info",
				style: { fontSize }
			}) : null]);
		};
	}
});
function useProgressState(props) {
	const currentPercent = ref(0);
	const progressWidth = ref(0);
	return reactive({
		outerBarStyle: computed(() => ({
			backgroundColor: props.backgroundColor,
			borderRadius: props.borderRadius,
			height: props.strokeWidth
		})),
		innerBarStyle: computed(() => {
			const backgroundColor = props.color !== PROGRESS_VALUES.activeColor && props.activeColor === PROGRESS_VALUES.activeColor ? props.color : props.activeColor;
			return {
				width: currentPercent.value * progressWidth.value / 100,
				height: props.strokeWidth,
				backgroundColor,
				borderRadius: props.borderRadius
			};
		}),
		realPercent: computed(() => {
			let realValue = parseFloat(props.percent);
			realValue < 0 && (realValue = 0);
			realValue > 100 && (realValue = 100);
			return realValue;
		}),
		currentPercent,
		strokeTimer: 0,
		lastPercent: 0,
		progressWidth
	});
}
function _activeAnimation(state, props, trigger) {
	state.strokeTimer && clearInterval(state.strokeTimer);
	if (props.active) {
		state.currentPercent = props.activeMode === PROGRESS_VALUES.activeMode ? 0 : state.lastPercent;
		state.strokeTimer = setInterval(() => {
			if (state.currentPercent + 1 > state.realPercent) {
				state.currentPercent = state.realPercent;
				state.strokeTimer && clearInterval(state.strokeTimer);
				trigger("activeend", {});
			} else state.currentPercent += 1;
		}, parseFloat(props.duration));
	} else state.currentPercent = state.realPercent;
}
var picker_view_default = /* @__PURE__ */ defineComponent({
	name: "PickerView",
	props: extend({}, {
		value: {
			type: Array,
			default() {
				return [];
			},
			validator: function(val) {
				return isArray(val) && val.filter((val) => typeof val === "number").length === val.length;
			}
		},
		indicatorStyle: {
			type: String,
			default: ""
		},
		indicatorClass: {
			type: String,
			default: ""
		},
		maskStyle: {
			type: String,
			default: ""
		},
		maskClass: {
			type: String,
			default: ""
		}
	}, {
		height: {
			type: [Number, String],
			default: 0
		},
		maskTopStyle: {
			type: String,
			default: ""
		},
		maskBottomStyle: {
			type: String,
			default: ""
		}
	}),
	emits: ["change", "update:value"],
	setup(props, { slots, emit }) {
		const rootRef = ref(null);
		const state = useState(props);
		const trigger = useCustomEvent(rootRef, emit);
		let columnVNodes = [];
		const getItemIndex = (vnode) => {
			return Array.prototype.indexOf.call(columnVNodes.filter((vnode) => vnode.type !== Comment), vnode);
		};
		const getPickerViewColumn = (columnInstance) => {
			return computed({
				get() {
					const index = getItemIndex(columnInstance.vnode);
					return state.value[index] || 0;
				},
				set(current) {
					if (!columnInstance.data._isMounted) return;
					const index = getItemIndex(columnInstance.vnode);
					if (index < 0) return;
					if (state.value[index] !== current) {
						state.value[index] = current;
						const value = state.value.map((val) => val);
						emit("update:value", value);
						trigger("change", { value });
					}
				}
			});
		};
		provide("getPickerViewColumn", getPickerViewColumn);
		provide("pickerViewProps", props);
		return () => {
			columnVNodes = flatVNode(slots.default && slots.default());
			return createVNode("view", mergeProps({
				"ref": rootRef,
				"class": "uni-picker-view",
				"style": props.height ? { height: `${parseFloat(props.height)}px` } : {}
			}, { preventGesture: true }), [createVNode("view", { "class": "uni-picker-view-wrapper" }, [columnVNodes])]);
		};
	},
	styles: [{
		"uni-picker-view": { "": { position: "relative" } },
		"uni-picker-view-wrapper": { "": {
			display: "flex",
			flexDirection: "row",
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			overflow: "hidden"
		} }
	}]
});
function useState(props) {
	const state = reactive({ value: reactive([...props.value]) });
	watch(() => props.value, (val) => {
		state.value.length = val.length;
		nextTick(() => {
			val.forEach((val, index) => {
				if (val !== state.value[index]) state.value.splice(index, 1, val);
			});
		});
	});
	return state;
}
//#endregion
//#region src/nvue/picker-view-column/index.tsx
var dom = weex.requireModule("dom");
var isAndroid$1 = weex.config.env.platform.toLowerCase() === "android";
function getStyle(val) {
	return extend({}, isString(val) ? parseStyleText(val) : val);
}
var picker_view_column_default = /* @__PURE__ */ defineComponent({
	name: "PickerViewColumn",
	props: { length: {
		type: [Number, String],
		default: 0
	} },
	data: () => ({ _isMounted: false }),
	setup(props, { slots }) {
		const instance = getCurrentInstance();
		const rootRef = ref(null);
		const contentRef = ref(null);
		const scrollViewItemRef = ref(null);
		const indicatorRef = ref(null);
		const pickerViewProps = inject("pickerViewProps");
		const current = inject("getPickerViewColumn")(instance);
		const indicatorStyle = computed(() => getStyle(pickerViewProps.indicatorStyle));
		const maskTopStyle = computed(() => getStyle(pickerViewProps.maskTopStyle));
		const maskBottomStyle = computed(() => getStyle(pickerViewProps.maskBottomStyle));
		let indicatorHeight = ref(0);
		indicatorHeight.value = getHeight(indicatorStyle.value);
		let pickerViewHeight = ref(0);
		pickerViewHeight.value = parseFloat(pickerViewProps.height);
		const { setCurrent, onScrollend } = usePickerColumnScroll(props, current, contentRef, indicatorHeight);
		const checkMounted = () => {
			let height_;
			let indicatorHeight_;
			setTimeout(() => {
				Promise.all([getComponentSize(rootRef.value).then(({ height }) => {
					height_ = pickerViewHeight.value = height;
				}), isAndroid$1 && props.length ? getComponentSize(scrollViewItemRef.value).then(({ height }) => {
					indicatorHeight_ = indicatorHeight.value = height / parseFloat(props.length);
				}) : getComponentSize(indicatorRef.value).then(({ height }) => {
					indicatorHeight_ = indicatorHeight.value = height;
				})]).then(() => {
					if (height_ && indicatorHeight_) setTimeout(() => {
						instance.data._isMounted = true;
						setCurrent(current.value, false, true);
					}, 50);
					else checkMounted();
				});
			}, 50);
		};
		onMounted(checkMounted);
		const createScrollViewChild = (item) => {
			if (!item) return null;
			return isAndroid$1 ? createVNode("div", {
				"ref": scrollViewItemRef,
				"style": "flex-direction:column;"
			}, [item]) : item;
		};
		return () => {
			const children = slots.default && slots.default();
			let padding = (pickerViewHeight.value - indicatorHeight.value) / 2;
			const maskPosition = `${pickerViewHeight.value - padding}px`;
			const scrollOptions = {
				showScrollbar: false,
				scrollToBegin: false,
				decelerationRate: .3,
				scrollY: true
			};
			if (!isAndroid$1) scrollOptions.scrollTop = current.value * indicatorHeight.value;
			return createVNode("view", {
				"ref": rootRef,
				"class": "uni-picker-view-column"
			}, [
				createVNode("scroll-view", mergeProps({
					"class": "uni-picker-view-group",
					"style": "flex-direction:column;",
					"onScrollend": onScrollend
				}, scrollOptions), [createVNode("view", {
					"ref": contentRef,
					"class": "uni-picker-view-content",
					"style": {
						paddingTop: `${padding}px`,
						paddingBottom: `${padding}px`
					}
				}, [createScrollViewChild(children)])]),
				createVNode("u-scalable", { "class": "uni-picker-view-mask" }, [createVNode("u-scalable", {
					"class": "uni-picker-view-mask uni-picker-view-mask-top",
					"style": extend({}, maskTopStyle.value, { bottom: maskPosition })
				}, null), createVNode("u-scalable", {
					"class": "uni-picker-view-mask uni-picker-view-mask-bottom",
					"style": extend({}, maskBottomStyle.value, { top: maskPosition })
				}, null)]),
				createVNode("u-scalable", {
					"ref": indicatorRef,
					"class": "uni-picker-view-indicator",
					"style": extend({}, indicatorStyle.value, { top: `${padding}px` })
				}, null)
			]);
		};
	},
	styles: [{
		"uni-picker-view-column": { "": {
			flex: 1,
			position: "relative",
			alignItems: "stretch",
			overflow: "hidden"
		} },
		"uni-picker-view-mask": { "": {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			pointerEvents: "none"
		} },
		"uni-picker-view-mask-top": { "": {
			bottom: 0,
			backgroundImage: "linear-gradient(to bottom,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))"
		} },
		"uni-picker-view-mask-bottom": { "": {
			top: 0,
			backgroundImage: "linear-gradient(to top,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))"
		} },
		"uni-picker-view-group": { "": {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		} },
		"uni-picker-view-content": { "": {
			flexDirection: "column",
			paddingTop: 0,
			paddingRight: 0,
			paddingBottom: 0,
			paddingLeft: 0
		} },
		"uni-picker-view-indicator": { "": {
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			height: "34px",
			pointerEvents: "none",
			borderColor: "#e5e5e5",
			borderTopWidth: "1px",
			borderBottomWidth: "1px"
		} }
	}]
});
function getHeight(style) {
	const res = (style.height || style.lineHeight || "").match(/(-?[\d\.]+)px/);
	let value = 0;
	if (res) value = parseFloat(res[1]);
	return value;
}
function usePickerColumnScroll(props, current, contentRef, indicatorHeight) {
	let scrollToElementTime;
	function setDomScrollToElement(_current, animated = true) {
		dom.scrollToElement(contentRef.value, {
			offset: _current * indicatorHeight.value,
			animated
		});
		if (animated) scrollToElementTime = Date.now();
	}
	watch(() => props.length, () => {
		setTimeout(() => {
			setCurrent(current.value, true, true);
		}, 150);
	});
	watch(current, (val) => setDomScrollToElement(val));
	const setCurrent = (_current, animated = true, force) => {
		if (current.value === _current && !force) return;
		current.value = _current;
		if (isAndroid$1) setDomScrollToElement(_current, animated);
	};
	const onScrollend = (event) => {
		if (Date.now() - scrollToElementTime < 340) return;
		const y = event.detail.contentOffset.y;
		const _current = Math.round(y / indicatorHeight.value);
		if (y % indicatorHeight.value) setCurrent(_current, true, true);
		else current.value = _current;
	};
	return {
		setCurrent,
		onScrollend
	};
}
//#endregion
//#region src/nvue/picker/index.tsx
var mode = {
	SELECTOR: "selector",
	MULTISELECTOR: "multiSelector",
	TIME: "time",
	DATE: "date"
};
var fields = {
	YEAR: "year",
	MONTH: "month",
	DAY: "day"
};
function padLeft(num) {
	return num > 9 ? num : `0${num}`;
}
function getDate(str, _mode) {
	str = String(str || "");
	const date = /* @__PURE__ */ new Date();
	if (_mode === mode.TIME) {
		const strs = str.split(":");
		if (strs.length === 2) date.setHours(parseInt(strs[0]), parseInt(strs[1]));
	} else {
		const strs = str.split("-");
		if (strs.length === 3) date.setFullYear(parseInt(strs[0]), parseInt(String(parseFloat(strs[1]) - 1)), parseInt(strs[2]));
	}
	return date;
}
function getDefaultStartValue(props) {
	if (props.mode === mode.TIME) return "00:00";
	if (props.mode === mode.DATE) {
		const year = (/* @__PURE__ */ new Date()).getFullYear() - 100;
		switch (props.fields) {
			case fields.YEAR: return year;
			case fields.MONTH: return year + "-01";
			default: return year + "-01-01";
		}
	}
	return "";
}
function getDefaultEndValue(props) {
	if (props.mode === mode.TIME) return "23:59";
	if (props.mode === mode.DATE) {
		const year = (/* @__PURE__ */ new Date()).getFullYear() + 100;
		switch (props.fields) {
			case fields.YEAR: return year;
			case fields.MONTH: return year + "-12";
			default: return year + "-12-31";
		}
	}
	return "";
}
var picker_default = /* @__PURE__ */ defineComponent({
	name: "Picker",
	props: {
		name: {
			type: String,
			default: ""
		},
		range: {
			type: Array,
			default() {
				return [];
			}
		},
		rangeKey: {
			type: String,
			default: ""
		},
		value: {
			type: [
				Number,
				String,
				Array
			],
			default: 0
		},
		mode: {
			type: String,
			default: mode.SELECTOR,
			validator(val) {
				return Object.values(mode).indexOf(val) >= 0;
			}
		},
		fields: {
			type: String,
			default: ""
		},
		start: {
			type: String,
			default: getDefaultStartValue
		},
		end: {
			type: String,
			default: getDefaultEndValue
		},
		disabled: {
			type: [Boolean, String],
			default: false
		}
	},
	emits: [
		"change",
		"cancel",
		"columnchange"
	],
	setup(props, { slots, emit }) {
		const rootRef = ref(null);
		const trigger = useCustomEvent(rootRef, emit);
		const valueSync = ref(null);
		const page = ref(null);
		const _setValueSync = () => {
			let val = props.value;
			switch (props.mode) {
				case mode.MULTISELECTOR:
					{
						if (!isArray(val)) val = [];
						if (!isArray(valueSync.value)) valueSync.value = [];
						const length = valueSync.value.length = Math.max(val.length, props.range.length);
						for (let index = 0; index < length; index++) {
							const val0 = Number(val[index]);
							const val1 = Number(valueSync.value[index]);
							const val2 = isNaN(val0) ? isNaN(val1) ? 0 : val1 : val0;
							valueSync.value.splice(index, 1, val2 < 0 ? 0 : val2);
						}
					}
					break;
				case mode.TIME:
				case mode.DATE:
					valueSync.value = String(val);
					break;
				default: {
					const _valueSync = Number(val);
					valueSync.value = _valueSync < 0 ? 0 : _valueSync;
					break;
				}
			}
		};
		const _updatePicker = (data) => {
			page.value && page.value.sendMessage(data);
		};
		const _showWeexPicker = (data) => {
			let res = { event: "cancel" };
			page.value = showPage({
				url: "__uniapppicker",
				data,
				style: {
					titleNView: false,
					animationType: "none",
					animationDuration: 0,
					background: "rgba(0,0,0,0)",
					popGesture: "none"
				},
				onMessage: (message) => {
					const event = message.event;
					if (event === "created") {
						_updatePicker(data);
						return;
					}
					if (event === "columnchange") {
						delete message.event;
						trigger(event, message);
						return;
					}
					res = message;
				},
				onClose: () => {
					page.value = null;
					const event = res.event;
					delete res.event;
					event && trigger(event, res);
				}
			});
		};
		const _showNativePicker = (data) => {
			plus.nativeUI[props.mode === mode.TIME ? "pickTime" : "pickDate"]((res) => {
				const date = res.date;
				trigger("change", { value: props.mode === mode.TIME ? `${padLeft(date.getHours())}:${padLeft(date.getMinutes())}` : `${date.getUTCFullYear()}-${padLeft(date.getUTCMonth() + 1)}-${padLeft(date.getUTCDate())}` });
			}, () => {
				trigger("cancel", {});
			}, props.mode === mode.TIME ? { time: getDate(props.value, mode.TIME) } : {
				date: getDate(props.value, mode.DATE),
				minDate: getDate(props.start, mode.DATE),
				maxDate: getDate(props.end, mode.DATE)
			});
		};
		const _showPicker = (data) => {
			if ((data.mode === mode.TIME || data.mode === mode.DATE) && !data.fields) _showNativePicker(data);
			else {
				data.fields = Object.values(fields).includes(data.fields) ? data.fields : fields.DAY;
				_showWeexPicker(data);
			}
		};
		const _show = (event) => {
			if (props.disabled) return;
			_showPicker(extend({}, props, {
				value: valueSync.value,
				locale: uni.getLocale()
			}));
		};
		const uniForm = inject(uniFormKey, false);
		const formField = {
			submit: () => [props.name, valueSync.value],
			reset: () => {
				switch (props.mode) {
					case mode.SELECTOR:
						valueSync.value = 0;
						break;
					case mode.MULTISELECTOR:
						isArray(props.value) && (valueSync.value = props.value.map((val) => 0));
						break;
					case mode.DATE:
					case mode.TIME:
						valueSync.value = "";
						break;
					default: break;
				}
			}
		};
		if (uniForm) {
			uniForm.addField(formField);
			onBeforeUnmount(() => uniForm.removeField(formField));
		}
		Object.keys(props).forEach((key) => {
			watch(() => props[key], (val) => {
				const data = {};
				data[key] = val;
				_updatePicker(data);
			}, { deep: true });
		});
		watch(() => props.value, _setValueSync, { deep: true });
		_setValueSync();
		return () => {
			return createVNode("view", {
				"ref": rootRef,
				"onClick": _show
			}, [slots.default && slots.default()]);
		};
	}
});
var slider_default = /* @__PURE__ */ defineComponent({
	name: "USlider",
	props: {
		name: {
			type: String,
			default: ""
		},
		min: {
			type: [Number, String],
			default: 0
		},
		max: {
			type: [Number, String],
			default: 100
		},
		value: {
			type: [Number, String],
			default: 0
		},
		step: {
			type: [Number, String],
			default: 1
		},
		disabled: {
			type: [Boolean, String],
			default: false
		},
		color: {
			type: String,
			default: "#e9e9e9"
		},
		backgroundColor: {
			type: String,
			default: "#e9e9e9"
		},
		activeColor: {
			type: String,
			default: "#007aff"
		},
		selectedColor: {
			type: String,
			default: "#007aff"
		},
		blockColor: {
			type: String,
			default: "#ffffff"
		},
		blockSize: {
			type: [Number, String],
			default: 28
		},
		showValue: {
			type: [Boolean, String],
			default: false
		}
	},
	styles: [{
		"uni-slider": { "": {
			flex: 1,
			flexDirection: "column"
		} },
		"uni-slider-wrapper": { "": {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center"
		} },
		"uni-slider-tap-area": { "": {
			position: "relative",
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			paddingTop: "14",
			paddingBottom: "14"
		} },
		"uni-slider-handle-wrapper": { "": {
			position: "relative",
			flex: 1,
			backgroundColor: "#e9e9e9",
			height: "2",
			borderRadius: "5",
			marginRight: "14",
			marginLeft: "14"
		} },
		"uni-slider-track": { "": {
			height: "2",
			borderRadius: "6",
			backgroundColor: "#007aff"
		} },
		"uni-slider-thumb": { "": {
			position: "absolute",
			top: "1",
			width: "28",
			height: "28",
			borderRadius: 50,
			boxShadow: "0 0 4px #ebebeb"
		} },
		"uni-slider-value": { "": {
			color: "#888888",
			fontSize: "16",
			width: "30"
		} }
	}],
	setup(props, { emit }) {
		const sliderRef = ref(null);
		const sliderTrackRef = ref(null);
		const trigger = useCustomEvent(sliderRef, emit);
		const state = useSliderState(props);
		const listeners = useSliderListeners(props, state, trigger);
		useSliderInject(props, state);
		watch(() => props.value, (val) => {
			state.sliderValue = Number(val);
		});
		onMounted(() => {
			setTimeout(() => {
				getComponentSize(sliderTrackRef.value).then(({ width, left }) => {
					state.sliderLeft = left;
					state.sliderWidth = width || 0;
					state.sliderValue = Number(props.value);
				});
			}, 100);
		});
		return () => {
			const { showValue } = props;
			const { trackTapStyle, trackStyle, trackActiveStyle, thumbStyle, sliderValue } = state;
			return createVNode("div", {
				"class": "uni-slider",
				"ref": sliderRef
			}, [createVNode("div", { "class": "uni-slider-wrapper" }, [createVNode("div", mergeProps({
				"class": "uni-slider-tap-area",
				"style": trackTapStyle
			}, listeners), [createVNode("div", {
				"class": "uni-slider-handle-wrapper",
				"style": trackStyle,
				"ref": sliderTrackRef
			}, [createVNode("div", {
				"class": "uni-slider-track",
				"style": trackActiveStyle
			}, null)]), createVNode("div", {
				"class": "uni-slider-thumb",
				"style": thumbStyle
			}, null)]), showValue ? createNVueTextVNode(sliderValue + "", { class: "uni-slider-value" }) : null])]);
		};
	}
});
function useSliderState(props) {
	const sliderLeft = ref(0);
	const sliderWidth = ref(0);
	const sliderValue = ref(0);
	const _getBgColor = () => {
		return props.backgroundColor !== "#e9e9e9" ? props.backgroundColor : props.color !== "#007aff" ? props.color : "#007aff";
	};
	const _getActiveColor = () => {
		return props.activeColor !== "#007aff" ? props.activeColor : props.selectedColor !== "#e9e9e9" ? props.selectedColor : "#e9e9e9";
	};
	const _getValueWidth = () => {
		const max = Number(props.max);
		const min = Number(props.min);
		return (sliderValue.value - min) / (max - min) * sliderWidth.value;
	};
	const sliderThumbOffset = Number(props.blockSize) / 2;
	return reactive({
		sliderLeft,
		sliderWidth,
		sliderValue,
		sliderThumbOffset,
		trackTapStyle: computed(() => ({
			paddingTop: sliderThumbOffset,
			paddingBottom: sliderThumbOffset
		})),
		trackStyle: computed(() => ({
			backgroundColor: _getBgColor(),
			marginLeft: sliderThumbOffset,
			marginRight: sliderThumbOffset
		})),
		trackActiveStyle: computed(() => ({
			backgroundColor: _getActiveColor(),
			width: _getValueWidth()
		})),
		thumbStyle: computed(() => ({
			width: props.blockSize,
			height: props.blockSize,
			backgroundColor: props.blockColor,
			left: _getValueWidth()
		}))
	});
}
function useSliderListeners(props, state, trigger) {
	let eventOld = null;
	function onTrack(action, x) {
		if (!props.disabled) {
			if (action === "move") {
				changedValue(x);
				trigger("changing", { value: state.sliderValue });
			} else if (action === "end") {
				changedValue(x);
				trigger("change", { value: state.sliderValue });
			}
		}
	}
	function changedValue(x) {
		x -= state.sliderThumbOffset;
		if (x < 0) x = 0;
		if (x > state.sliderWidth) x = state.sliderWidth;
		const max = Number(props.max);
		const min = Number(props.min);
		const step = Number(props.step);
		let value = x / state.sliderWidth * (max - min);
		if (step > 0 && value > step && value % step / step !== 0) value -= value % step;
		else value = parseInt(value + "");
		state.sliderValue = value + min;
	}
	return {
		onTouchstart(e) {
			if (e.changedTouches.length === 1 && !eventOld) {
				eventOld = e;
				onTrack("start", e.changedTouches[0].pageX);
			}
		},
		onTouchmove(e) {
			if (e.changedTouches.length === 1 && eventOld) onTrack("move", e.changedTouches[0].pageX);
		},
		onTouchend(e) {
			if (e.changedTouches.length === 1 && eventOld) {
				eventOld = null;
				onTrack("end", e.changedTouches[0].pageX);
			}
		}
	};
}
function useSliderInject(props, state) {
	const uniForm = inject(uniFormKey, false);
	const formField = {
		submit: () => {
			const data = ["", null];
			if (props.name) {
				data[0] = props.name;
				data[1] = state.sliderValue;
			}
			return data;
		},
		reset: () => {
			state.sliderValue = Number(props.value);
		}
	};
	if (!!uniForm) {
		uniForm.addField(formField);
		onUnmounted(() => {
			uniForm.removeField(formField);
		});
	}
}
//#endregion
//#region src/components/switch.ts
var switchProps = {
	name: {
		type: String,
		default: ""
	},
	checked: {
		type: [Boolean, String],
		default: false
	},
	type: {
		type: String,
		default: "switch"
	},
	id: {
		type: String,
		default: ""
	},
	disabled: {
		type: [Boolean, String],
		default: false
	},
	color: {
		type: String,
		default: "#007aff"
	}
};
//#endregion
//#region src/nvue/switch/index.tsx
var SwitchType = {
	switch: "switch",
	checkbox: "checkbox"
};
var DCSwitchSize = {
	width: 52,
	height: 32
};
var switch_default = /* @__PURE__ */ defineComponent({
	name: "Switch",
	props: switchProps,
	emits: ["change"],
	setup(props, { emit }) {
		const rootRef = ref(null);
		const switchChecked = ref(props.checked);
		const uniLabel = useSwitchInject(props, switchChecked);
		const trigger = useCustomEvent(rootRef, emit);
		watch(() => props.checked, (val) => {
			switchChecked.value = val;
		});
		const _onClick = ($event, isLabelClick) => {
			if (props.disabled) return;
			if (isLabelClick) {}
			switchChecked.value = $event.detail ? $event.detail.value : !switchChecked.value;
			trigger("change", { value: switchChecked.value });
		};
		if (!!uniLabel) {
			uniLabel.addHandler(_onClick);
			onBeforeUnmount(() => {
				uniLabel.removeHandler(_onClick);
			});
		}
		useListeners(props, { "label-click": _onClick });
		return () => {
			const { color, type, disabled } = props;
			return createVNode("div", { "ref": rootRef }, [type === SwitchType.switch ? createVNode("dc-switch", mergeProps({ dataUncType: "uni-switch" }, { "onChange": _onClick }, {
				checked: switchChecked.value,
				color,
				disabled
			}, { "style": DCSwitchSize }), null) : null, type === SwitchType.checkbox ? createVNode(resolveComponent("checkbox"), mergeProps({ "style": { color } }, {
				checked: switchChecked.value,
				disabled
			}, { "onClick": _onClick }), null) : null]);
		};
	}
});
function useSwitchInject(props, switchChecked) {
	const uniForm = inject(uniFormKey, false);
	const uniLabel = inject(uniLabelKey, false);
	const formField = {
		submit: () => {
			const data = ["", null];
			if (props.name) {
				data[0] = props.name;
				data[1] = switchChecked.value;
			}
			return data;
		},
		reset: () => {
			switchChecked.value = false;
		}
	};
	if (!!uniForm) {
		uniForm.addField(formField);
		onUnmounted(() => {
			uniForm.removeField(formField);
		});
	}
	return uniLabel;
}
//#endregion
//#region src/components/checkbox.ts
var checkboxProps = {
	checked: {
		type: [Boolean, String],
		default: false
	},
	id: {
		type: String,
		default: ""
	},
	disabled: {
		type: [Boolean, String],
		default: false
	},
	color: {
		type: String,
		default: "#007aff"
	},
	value: {
		type: String,
		default: ""
	}
};
//#endregion
//#region src/components/checkbox-group.ts
var uniCheckGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniCheckGroup" : "ucg");
var checkboxGroupProps = { name: {
	type: String,
	default: ""
} };
var checkbox_default = /* @__PURE__ */ defineComponent({
	name: "Checkbox",
	props: checkboxProps,
	styles: [{
		"uni-checkbox": { "": {
			flexDirection: "row",
			alignItems: "center"
		} },
		"uni-checkbox-input": { "": {
			justifyContent: "center",
			alignItems: "center",
			position: "relative",
			borderWidth: "1",
			borderColor: "#d1d1d1",
			borderStyle: "solid",
			backgroundColor: "#ffffff",
			borderRadius: "3",
			width: "22",
			height: "22"
		} },
		"uni-icon": { "": {
			fontFamily: "unincomponents",
			fontSize: "16",
			marginLeft: "2",
			marginTop: "2",
			color: "#007aff"
		} },
		"uni-checkbox-input-disabled": { "": { backgroundColor: "#e1e1e1" } },
		"uni-checkbox-input-disabled-before": { "": { color: "#adadad" } },
		"uni-checkbox-slot": { "": {
			fontSize: "16",
			marginLeft: "5"
		} }
	}],
	setup(props, { slots }) {
		const rootRef = ref(null);
		const checkboxChecked = ref(props.checked);
		const checkboxValue = ref(props.value);
		const checkboxColor = computed(() => props.disabled ? "#adadad" : props.color);
		const reset = () => {
			checkboxChecked.value = false;
		};
		const _onClick = ($event, isLabelClick) => {
			if (props.disabled) return;
			if (isLabelClick) {}
			checkboxChecked.value = !checkboxChecked.value;
			uniCheckGroup && uniCheckGroup.checkboxChange($event);
		};
		const { uniCheckGroup, uniLabel } = useCheckboxInject(checkboxChecked, checkboxValue, reset);
		if (uniLabel) {
			uniLabel.addHandler(_onClick);
			onBeforeUnmount(() => {
				uniLabel.removeHandler(_onClick);
			});
		}
		useListeners(props, { "label-click": _onClick });
		watch([() => props.checked, () => props.value], ([newChecked, newModelValue]) => {
			checkboxChecked.value = newChecked;
			checkboxValue.value = newModelValue;
		});
		const wrapSlots = () => {
			if (!slots.default) return [];
			const vnodes = slots.default();
			if (vnodes.length === 1 && vnodes[0].type === Text) return [createNVueTextVNode(vnodes[0].children, { class: "uni-checkbox-slot" })];
			return vnodes;
		};
		return () => {
			return createVNode("div", mergeProps({ "ref": rootRef }, { dataUncType: "uni-checkbox" }, {
				"onClick": _onClick,
				"class": "uni-checkbox"
			}), [createVNode("div", { "class": ["uni-checkbox-input", { "uni-checkbox-input-disabled": props.disabled }] }, [checkboxChecked.value ? createNVueTextVNode("", {
				class: "uni-icon",
				style: { color: checkboxColor.value }
			}) : null]), ...wrapSlots()]);
		};
	}
});
function useCheckboxInject(checkboxChecked, checkboxValue, reset) {
	const field = computed(() => ({
		checkboxChecked: Boolean(checkboxChecked.value),
		value: checkboxValue.value
	}));
	const formField = { reset };
	const uniCheckGroup = inject(uniCheckGroupKey, false);
	if (!!uniCheckGroup) uniCheckGroup.addField(field);
	const uniForm = inject(uniFormKey, false);
	if (!!uniForm) uniForm.addField(formField);
	const uniLabel = inject(uniLabelKey, false);
	onBeforeUnmount(() => {
		uniCheckGroup && uniCheckGroup.removeField(field);
		uniForm && uniForm.removeField(formField);
	});
	return {
		uniCheckGroup,
		uniForm,
		uniLabel
	};
}
//#endregion
//#region src/nvue/checkbox-group/index.tsx
var checkbox_group_default = /* @__PURE__ */ defineComponent({
	name: "CheckboxGroup",
	props: checkboxGroupProps,
	emits: ["change"],
	setup(props, { slots, emit }) {
		const rootRef = ref(null);
		useProvideCheckGroup(props, useCustomEvent(rootRef, emit));
		return () => {
			return createVNode("div", {
				"ref": rootRef,
				"class": "uni-checkbox-group"
			}, [slots.default && slots.default()]);
		};
	}
});
function useProvideCheckGroup(props, trigger) {
	const fields = [];
	const getFieldsValue = () => fields.reduce((res, field) => {
		if (field.value.checkboxChecked) res.push(field.value.value);
		return res;
	}, new Array());
	provide(uniCheckGroupKey, {
		addField(field) {
			fields.push(field);
		},
		removeField(field) {
			fields.splice(fields.indexOf(field), 1);
		},
		checkboxChange($event) {
			trigger("change", { value: getFieldsValue() });
		}
	});
	const uniForm = inject(uniFormKey, false);
	if (uniForm) uniForm.addField({ submit: () => {
		let data = ["", null];
		if (props.name !== "") {
			data[0] = props.name;
			data[1] = getFieldsValue();
		}
		return data;
	} });
	return getFieldsValue;
}
//#endregion
//#region src/components/radio.ts
var radioProps = {
	checked: {
		type: [Boolean, String],
		default: false
	},
	id: {
		type: String,
		default: ""
	},
	disabled: {
		type: [Boolean, String],
		default: false
	},
	color: {
		type: String,
		default: "#007aff"
	},
	value: {
		type: String,
		default: ""
	}
};
//#endregion
//#region src/components/radio-group.ts
var uniRadioGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniRadioGroup" : "ucg");
var radioGroupProps = { name: {
	type: String,
	default: ""
} };
var radio_default = /* @__PURE__ */ defineComponent({
	name: "Radio",
	props: radioProps,
	styles: [{
		"uni-radio": { "": {
			alignItems: "center",
			flexDirection: "row"
		} },
		"uni-radio-input": { "": {
			position: "relative",
			alignItems: "center",
			justifyContent: "center",
			marginRight: "5",
			borderStyle: "solid",
			borderWidth: "1",
			borderColor: "#d1d1d1",
			borderRadius: 50,
			width: "22",
			height: "22",
			outline: 0
		} },
		"uni-radio-input-icon": { "": {
			fontFamily: "unincomponents",
			fontSize: "14",
			color: "#ffffff"
		} },
		"uni-radio-input-disabled": { "": {
			backgroundColor: "#e1e1e1",
			borderColor: "#d1d1d1",
			color: "#adadad"
		} },
		"uni-radio-slot": { "": {
			fontSize: "16",
			marginLeft: "5"
		} }
	}],
	emits: ["change"],
	setup(props, { slots }) {
		const rootRef = ref(null);
		const radioChecked = ref(props.checked);
		const radioValue = ref(props.value);
		const radioStyle = computed(() => {
			const color = props.disabled ? "#adadad" : props.color;
			if (radioChecked.value) return {
				backgroundColor: color,
				borderColor: color
			};
			return { borderColor: "#d1d1d1" };
		});
		const reset = () => {
			radioChecked.value = false;
		};
		const { uniCheckGroup, uniLabel, field } = useRadioInject(radioChecked, radioValue, reset);
		const _onClick = ($event, isLabelClick) => {
			if (props.disabled || radioChecked.value) return;
			if (isLabelClick) {}
			radioChecked.value = !radioChecked.value;
			uniCheckGroup && uniCheckGroup.radioChange($event, field);
		};
		if (uniLabel) {
			uniLabel.addHandler(_onClick);
			onBeforeUnmount(() => {
				uniLabel.removeHandler(_onClick);
			});
		}
		useListeners(props, { "label-click": _onClick });
		watch([() => props.checked, () => props.value], ([newChecked, newModelValue]) => {
			radioChecked.value = newChecked;
			radioValue.value = newModelValue;
		});
		const wrapSlots = () => {
			if (!slots.default) return [];
			const vnodes = slots.default();
			if (vnodes.length === 1 && vnodes[0].type === Text) return [createNVueTextVNode(vnodes[0].children, { class: "uni-radio-slot" })];
			return vnodes;
		};
		return () => {
			const { disabled } = props;
			return createVNode("div", mergeProps({ "ref": rootRef }, { dataUncType: "uni-radio" }, {
				"onClick": _onClick,
				"class": "uni-radio"
			}), [createVNode("div", {
				"style": radioStyle.value,
				"class": ["uni-radio-input", { "uni-radio-input-disabled": disabled }]
			}, [radioChecked.value ? createNVueTextVNode("", { class: "uni-radio-input-icon" }) : null]), ...wrapSlots()]);
		};
	}
});
function useRadioInject(radioChecked, radioValue, reset) {
	const field = computed({
		get: () => ({
			radioChecked: Boolean(radioChecked.value),
			value: radioValue.value
		}),
		set: ({ radioChecked: checked }) => {
			radioChecked.value = checked;
		}
	});
	const formField = { reset };
	const uniCheckGroup = inject(uniRadioGroupKey, false);
	if (!!uniCheckGroup) uniCheckGroup.addField(field);
	const uniForm = inject(uniFormKey, false);
	if (!!uniForm) uniForm.addField(formField);
	const uniLabel = inject(uniLabelKey, false);
	onBeforeUnmount(() => {
		uniCheckGroup && uniCheckGroup.removeField(field);
		uniForm && uniForm.removeField(formField);
	});
	return {
		uniCheckGroup,
		uniForm,
		uniLabel,
		field
	};
}
//#endregion
//#region src/nvue/radio-group/index.tsx
var radio_group_default = /* @__PURE__ */ defineComponent({
	name: "RadioGroup",
	props: radioGroupProps,
	emits: ["change"],
	setup(props, { slots, emit }) {
		const rootRef = ref(null);
		useProvideRadioGroup(props, useCustomEvent(rootRef, emit));
		return () => {
			return createVNode("div", { "ref": rootRef }, [slots.default && slots.default()]);
		};
	}
});
function useProvideRadioGroup(props, trigger) {
	const fields = [];
	onMounted(() => {
		_resetRadioGroupValue(fields.length - 1);
	});
	const getFieldsValue = () => fields.find((field) => field.value.radioChecked)?.value.value;
	provide(uniRadioGroupKey, {
		addField(field) {
			fields.push(field);
		},
		removeField(field) {
			fields.splice(fields.indexOf(field), 1);
		},
		radioChange($event, field) {
			_resetRadioGroupValue(fields.indexOf(field), true);
			trigger("change", { value: getFieldsValue() });
		}
	});
	const uniForm = inject(uniFormKey, false);
	const formField = { submit: () => {
		let data = ["", null];
		if (props.name !== "") {
			data[0] = props.name;
			data[1] = getFieldsValue();
		}
		return data;
	} };
	if (uniForm) {
		uniForm.addField(formField);
		onBeforeUnmount(() => {
			uniForm.removeField(formField);
		});
	}
	function setFieldChecked(field, radioChecked) {
		field.value = {
			radioChecked,
			value: field.value.value
		};
	}
	function _resetRadioGroupValue(key, change) {
		fields.forEach((value, index) => {
			if (index === key) return;
			if (change) setFieldChecked(fields[index], false);
		});
	}
	return fields;
}
//#endregion
//#region src/nvue/form/index.tsx
var NATIVE_COMPONENTS = ["u-input", "u-textarea"];
var form_default = /* @__PURE__ */ defineComponent({
	name: "Form",
	emits: ["submit", "reset"],
	setup({}, { slots, emit }) {
		const rootRef = ref(null);
		const trigger = useCustomEvent(rootRef, emit);
		const fields = [];
		let resetNative;
		provide(uniFormKey, {
			addField(field) {
				fields.push(field);
			},
			removeField(field) {
				fields.splice(fields.indexOf(field), 1);
			},
			submit(evt) {
				let outFormData = {};
				resetNative && resetNative(outFormData);
				let formData = fields.reduce((res, field) => {
					if (field.submit) {
						const [name, value] = field.submit();
						name && (res[name] = value);
					}
					return res;
				}, Object.create(null));
				Object.assign(outFormData, formData);
				trigger("submit", { value: outFormData });
			},
			reset(evt) {
				resetNative && resetNative();
				fields.forEach((field) => field.reset && field.reset());
				trigger("reset", evt);
			}
		});
		return () => {
			const vnodes = slots.default && slots.default();
			resetNative = useResetNative(vnodes);
			return createVNode("view", { "ref": rootRef }, [vnodes]);
		};
	}
});
function useResetNative(children) {
	const modulePlus = weex.requireModule("plus");
	const getOrClearNativeValue = (outResult, nodes) => {
		(nodes || children || []).forEach(function(node) {
			if (NATIVE_COMPONENTS.indexOf(String(node.type)) >= 0 && node.el && node.el.attr && node.el.attr.name) if (outResult) outResult[node.el.attr.name] = modulePlus.getValue(node.el.nodeId);
			else node.el.setValue("");
			if (isArray(node.children) && node.children && node.children.length) getOrClearNativeValue(outResult, node.children);
		});
	};
	return getOrClearNativeValue;
}
//#endregion
//#region src/components/icon.ts
var iconProps = {
	type: {
		type: String,
		default: ""
	},
	size: {
		type: [String, Number],
		default: 23
	},
	color: {
		type: String,
		default: ""
	}
};
var iconColors = {
	success: "#09bb07",
	info: "#10aeff",
	warn: "#f76260",
	waiting: "#10aeff",
	safe_success: "#09bb07",
	safe_warn: "#ffbe00",
	success_circle: "#09bb07",
	success_no_circle: "#09bb07",
	waiting_circle: "#10aeff",
	circle: "#c9c9c9",
	download: "#09bb07",
	info_circle: "#09bb07",
	cancel: "#f43530",
	search: "#b2b2b2",
	clear: "#b2b2b2"
};
//#endregion
//#region src/nvue/icon/index.tsx
var iconChars = {
	success: "",
	info: "",
	warn: "",
	waiting: "",
	safe_success: "",
	safe_warn: "",
	success_circle: "",
	success_no_circle: "",
	waiting_circle: "",
	circle: "",
	download: "",
	info_circle: "",
	cancel: "",
	search: "",
	clear: ""
};
var icon_default = /* @__PURE__ */ defineComponent({
	name: "Icon",
	props: iconProps,
	styles: [{ "uni-icon": { "": { fontFamily: "unincomponents" } } }],
	setup(props, {}) {
		return () => {
			return createNVueTextVNode(iconChars[props.type], {
				class: "uni-icon",
				style: {
					color: props.color || iconColors[props.type],
					fontSize: props.size
				}
			});
		};
	}
});
//#endregion
//#region src/components/swiper.ts
var swiperProps = {
	indicatorDots: {
		type: [Boolean, String],
		default: false
	},
	vertical: {
		type: [Boolean, String],
		default: false
	},
	autoplay: {
		type: [Boolean, String],
		default: false
	},
	circular: {
		type: [Boolean, String],
		default: false
	},
	interval: {
		type: [Number, String],
		default: 5e3
	},
	duration: {
		type: [Number, String],
		default: 500
	},
	current: {
		type: [Number, String],
		default: 0
	},
	indicatorColor: {
		type: String,
		default: "rgba(0,0,0,.3)"
	},
	indicatorActiveColor: {
		type: String,
		default: "#000000"
	},
	previousMargin: {
		type: String,
		default: ""
	},
	nextMargin: {
		type: String,
		default: ""
	},
	currentItemId: {
		type: String,
		default: ""
	},
	skipHiddenItemLayout: {
		type: [Boolean, String],
		default: false
	},
	displayMultipleItems: {
		type: [Number, String],
		default: 1
	},
	disableTouch: {
		type: [Boolean, String],
		default: false
	}
};
//#endregion
//#region src/nvue/swiper/index.tsx
var isAndroid = weex.config.env.platform.toLowerCase() === "android";
var swiper_default = /* @__PURE__ */ defineComponent({
	name: "Swiper",
	props: swiperProps,
	styles: [{
		"uni-swiper": { "": {
			position: "relative",
			height: "150px"
		} },
		"uni-swiper-slider": { "": {
			position: "absolute",
			left: 0,
			top: 0,
			right: 0,
			bottom: 0
		} },
		"uni-swiper-dots": { "": {
			position: "absolute",
			left: 0,
			right: 0,
			bottom: "10",
			height: "10"
		} }
	}],
	emits: [
		"change",
		"transition",
		"animationfinish"
	],
	setup(props, { slots, emit }) {
		const rootRef = ref(null);
		let swiperItems = [];
		const trigger = useCustomEvent(rootRef, emit);
		const state = useSwiperState(props);
		const listeners = useSwiperListeners(state, props, swiperItems, trigger);
		watch([() => props.current, () => props.currentItemId], ([newChecked, newModelValue]) => {
			currentCheck(state, props, swiperItems);
		});
		onMounted(() => {
			setTimeout(() => {
				getComponentSize(rootRef.value).then(({ width, height }) => {
					state.swiperWidth = width;
					state.swiperHeight = height;
				});
			}, 50);
		});
		return () => {
			const defaultSlots = slots.default && slots.default();
			const { indicatorStyle, currentSync } = state;
			swiperItems = flatVNode(defaultSlots);
			return createVNode("div", {
				"ref": rootRef,
				"class": "uni-swiper"
			}, [createVNode("slider", mergeProps({ "class": "uni-swiper-slider" }, {
				autoPlay: props.autoplay,
				interval: props.interval,
				index: currentSync,
				keepIndex: true,
				showIndicators: props.indicatorDots,
				infinite: props.circular,
				vertical: props.vertical,
				scrollable: !props.disableTouch
			}, listeners), [swiperItems, createVNode("indicator", {
				"class": "uni-swiper-dots",
				"style": indicatorStyle
			}, null)])]);
		};
	}
});
function useSwiperState(props) {
	let swiperWidth = ref(0);
	let swiperHeight = ref(0);
	const currentSync = ref(props.current);
	const currentChangeSource = ref("autoplay");
	return reactive({
		swiperWidth,
		swiperHeight,
		indicatorStyle: computed(() => ({
			itemColor: props.indicatorColor,
			itemSelectedColor: props.indicatorActiveColor,
			itemSize: 8,
			opacity: props.indicatorDots ? 1 : 0
		})),
		currentSync,
		currentChangeSource
	});
}
function useSwiperListeners(state, props, swiperItems, trigger) {
	let lastOffsetRatio = 0;
	const onScroll = (event) => {
		const detail = event.detail;
		const isVertical = props.vertical;
		let offsetRatio = (isVertical ? detail.offsetYRatio : detail.offsetXRatio) || 0;
		if (event.drag || event.drag) state.currentChangeSource = "touch";
		if (offsetRatio === 0) {
			const lastOffsetRatio2 = Math.abs(lastOffsetRatio);
			if (lastOffsetRatio2 === 1) return;
			else if (lastOffsetRatio2 > .5) offsetRatio = 1;
		}
		lastOffsetRatio = offsetRatio;
		trigger("transition", {
			dx: isVertical ? 0 : -state.swiperWidth * offsetRatio,
			dy: isVertical ? -state.swiperHeight * offsetRatio : 0
		});
	};
	const onScrollend = (event) => {
		const end = () => {
			trigger("animationfinish", getDetail());
			state.currentChangeSource = "autoplay";
		};
		if (isAndroid) end();
		else setTimeout(end, 50);
	};
	const onChange = (event) => {
		if (isString(event.detail.source)) state.currentChangeSource = event.detail.source;
		state.currentSync = event.detail.index;
		lastOffsetRatio = 0;
	};
	function getDetail() {
		const current = Number(state.currentSync);
		const currentItem = swiperItems[current] || {};
		return {
			current,
			currentItemId: currentItem.componentInstance && currentItem.componentInstance.itemId || "",
			source: state.currentChangeSource
		};
	}
	watch(() => state.currentSync, (val) => {
		trigger("change", getDetail());
	});
	return {
		onScroll,
		onScrollend,
		onChange
	};
}
function currentCheck(state, props, swiperItems) {
	let current = -1;
	if (props.currentItemId) for (let i = 0, items = swiperItems; i < items.length; i++) {
		const componentInstance = items[i].componentInstance;
		if (componentInstance && componentInstance.itemId === props.currentItemId) {
			current = i;
			break;
		}
	}
	if (current < 0) current = Math.round(Number(props.current)) || 0;
	current = current < 0 ? 0 : current;
	if (state.currentSync !== current) {
		state.currentChangeSource = "";
		state.currentSync = current;
	}
}
//#endregion
//#region src/nvue/swiper-item/index.tsx
var swiper_item_default = /* @__PURE__ */ defineComponent({
	name: "SwiperItem",
	props: { itemId: {
		type: String,
		default: ""
	} },
	setup(props, { slots }) {
		return () => {
			return createVNode("div", {
				"class": "uni-swiper-item",
				"style": {
					position: "absolute",
					left: 0,
					top: 0,
					right: 0,
					bottom: 0,
					overflow: "hidden"
				}
			}, [slots.default && slots.default()]);
		};
	}
});
//#endregion
//#region src/helpers/html-parser.js
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
var empty = /*#__PURE__*/ makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
var block = /*#__PURE__*/ makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
var inline = /*#__PURE__*/ makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
var closeSelf = /*#__PURE__*/ makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
var fillAttrs = /*#__PURE__*/ makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
var special = /*#__PURE__*/ makeMap("script,style");
function HTMLParser(html, handler) {
	var index;
	var chars;
	var match;
	var stack = [];
	var last = html;
	stack.last = function() {
		return this[this.length - 1];
	};
	while (html) {
		chars = true;
		if (!stack.last() || !special[stack.last()]) {
			if (html.indexOf("<!--") == 0) {
				index = html.indexOf("-->");
				if (index >= 0) {
					if (handler.comment) handler.comment(html.substring(4, index));
					html = html.substring(index + 3);
					chars = false;
				}
			} else if (html.indexOf("</") == 0) {
				match = html.match(endTag);
				if (match) {
					html = html.substring(match[0].length);
					match[0].replace(endTag, parseEndTag);
					chars = false;
				}
			} else if (html.indexOf("<") == 0) {
				match = html.match(startTag);
				if (match) {
					html = html.substring(match[0].length);
					match[0].replace(startTag, parseStartTag);
					chars = false;
				}
			}
			if (chars) {
				index = html.indexOf("<");
				var text = index < 0 ? html : html.substring(0, index);
				html = index < 0 ? "" : html.substring(index);
				if (handler.chars) handler.chars(text);
			}
		} else {
			html = html.replace(new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"), function(all, text) {
				text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
				if (handler.chars) handler.chars(text);
				return "";
			});
			parseEndTag("", stack.last());
		}
		if (html == last) throw "Parse Error: " + html;
		last = html;
	}
	parseEndTag();
	function parseStartTag(tag, tagName, rest, unary) {
		tagName = tagName.toLowerCase();
		if (block[tagName]) while (stack.last() && inline[stack.last()]) parseEndTag("", stack.last());
		if (closeSelf[tagName] && stack.last() == tagName) parseEndTag("", tagName);
		unary = empty[tagName] || !!unary;
		if (!unary) stack.push(tagName);
		if (handler.start) {
			var attrs = [];
			rest.replace(attr, function(match, name) {
				var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
				attrs.push({
					name,
					value,
					escaped: value.replace(/(^|[^\\])"/g, "$1\\\"")
				});
			});
			if (handler.start) handler.start(tagName, attrs, unary);
		}
	}
	function parseEndTag(tag, tagName) {
		if (!tagName) var pos = 0;
		else for (var pos = stack.length - 1; pos >= 0; pos--) if (stack[pos] == tagName) break;
		if (pos >= 0) {
			for (var i = stack.length - 1; i >= pos; i--) if (handler.end) handler.end(stack[i]);
			stack.length = pos;
		}
	}
}
function makeMap(str) {
	var obj = {};
	var items = str.split(",");
	for (var i = 0; i < items.length; i++) obj[items[i]] = true;
	return obj;
}
//#endregion
//#region src/components/rich-text/html-parser.js
function removeDOCTYPE(html) {
	return html.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "");
}
function parseAttrs(attrs) {
	return attrs.reduce(function(pre, attr) {
		let value = attr.value;
		const name = attr.name;
		if (value.match(/ /) && ["style", "src"].indexOf(name) === -1) value = value.split(" ");
		if (pre[name]) if (Array.isArray(pre[name])) pre[name].push(value);
		else pre[name] = [pre[name], value];
		else pre[name] = value;
		return pre;
	}, {});
}
function parseHtml(html) {
	html = removeDOCTYPE(html);
	const stacks = [];
	const results = {
		node: "root",
		children: []
	};
	HTMLParser(html, {
		start: function(tag, attrs, unary) {
			const node = { name: tag };
			if (attrs.length !== 0) node.attrs = parseAttrs(attrs);
			if (unary) {
				const parent = stacks[0] || results;
				if (!parent.children) parent.children = [];
				parent.children.push(node);
			} else stacks.unshift(node);
		},
		end: function(tag) {
			const node = stacks.shift();
			if (node.name !== tag) console.error("invalid state: mismatch end tag");
			if (stacks.length === 0) results.children.push(node);
			else {
				const parent = stacks[0];
				if (!parent.children) parent.children = [];
				parent.children.push(node);
			}
		},
		chars: function(text) {
			const node = {
				type: "text",
				text
			};
			if (stacks.length === 0) results.children.push(node);
			else {
				const parent = stacks[0];
				if (!parent.children) parent.children = [];
				parent.children.push(node);
			}
		},
		comment: function(text) {
			const node = {
				node: "comment",
				text
			};
			const parent = stacks[0];
			if (parent) {
				if (!parent.children) parent.children = [];
				parent.children.push(node);
			}
		}
	});
	return results.children;
}
//#endregion
//#region src/components/rich-text/index.ts
var props = { nodes: {
	type: [Array, String],
	default: function() {
		return [];
	}
} };
//#endregion
//#region src/nvue/rich-text/index.tsx
var defaultFontSize = 16;
var rich_text_default = /* @__PURE__ */ defineComponent({
	name: "RichText",
	props,
	setup(props) {
		const instance = getCurrentInstance();
		return () => {
			let nodes = props.nodes;
			if (isString(nodes)) nodes = parseHtml(nodes);
			return createVNode("u-rich-text", { value: normalizeNodes(nodes || [], instance.root, { defaultFontSize }) }, null);
		};
	}
});
function normalizeNodes(nodes, instance, options) {
	const TAGS = [
		"span",
		"a",
		"image",
		"img"
	];
	const strategies = {
		blockquote: block,
		br,
		div: block,
		dl: block,
		h1: createHeading(2),
		h2: createHeading(1.5),
		h3: createHeading(1.17),
		h4: createHeading(1),
		h5: createHeading(.83),
		h6: createHeading(.67),
		hr: block,
		ol: block,
		p: block,
		strong: bold,
		table: block,
		tbody: block,
		tfoot: block,
		thead: block,
		ul: block
	};
	const HTML_RE = /&(amp|gt|lt|nbsp|quot|apos);/g;
	const CHARS = {
		amp: "&",
		gt: ">",
		lt: "<",
		nbsp: " ",
		quot: "\"",
		apos: "'"
	};
	const breakNode = {
		type: "span",
		__type: "break",
		attr: { value: "\n" }
	};
	let lastNode = {
		__block: true,
		__break: true,
		children: []
	};
	let breakNodes = null;
	function parseStyle(node) {
		const styles = Object.create(null);
		if (node.attrs) {
			const classList = (node.attrs.class || "").split(" ");
			Object.assign(styles, parseClassList(classList, instance), parseStyleText(node.attrs.style || ""));
		}
		if (node.name === "img" || node.name === "image") {
			const attrs = node.attrs;
			styles.width = styles.width || attrs.width;
			styles.height = styles.height || attrs.height;
		}
		return styles;
	}
	function block(node) {
		node.__block = true;
		return node;
	}
	function heading(node, em) {
		if (node.style) !node.style.fontSize && (node.style.fontSize = options.defaultFontSize * em);
		return block(bold(node));
	}
	function createHeading(em) {
		return function(node) {
			return heading(node, em);
		};
	}
	function bold(node) {
		if (node.style) !node.style.fontWeight && (node.style.fontWeight = "bold");
		return node;
	}
	function br(node) {
		node.__value = " ";
		return block(node);
	}
	function normalizeText(str) {
		return str.replace(HTML_RE, function(match, entity) {
			return CHARS[entity];
		});
	}
	function normalizeNode(node) {
		let type = (node.name || "").toLowerCase();
		const __type = type;
		const strategy = strategies[type];
		if (TAGS.indexOf(type) === -1) type = "span";
		if (type === "img") type = "image";
		const nvueNode = {
			type,
			__type,
			attr: Object.create(null)
		};
		if (node.type === "text" || node.text) nvueNode.__value = nvueNode.attr.value = normalizeText((node.text || "").trim());
		if (node.attrs) Object.keys(node.attrs).forEach((name) => {
			if (name !== "class" && name !== "style") nvueNode.attr[name] = node.attrs[name];
		});
		nvueNode.style = parseStyle(node);
		if (strategy) strategy(nvueNode);
		if (lastNode.__block || nvueNode.__block) {
			if (!breakNodes) {
				lastNode.children.push(breakNode);
				breakNodes = [lastNode, breakNode];
			}
		}
		lastNode = nvueNode;
		if (lastNode.__value || lastNode.type === "image" && lastNode.attr.src) breakNodes = null;
		nvueNode.children = normalizeNodes(node.children);
		lastNode = nvueNode;
		if (lastNode.__block && lastNode.style.height && !/^0(px)?$/.test(lastNode.style.height)) breakNodes = null;
		return nvueNode;
	}
	function normalizeNodes(nodes) {
		if (isArray(nodes)) return nodes.map((node) => normalizeNode(node));
		return [];
	}
	const nvueNodes = normalizeNodes(nodes);
	if (breakNodes) {
		const [lastNode, breakNode] = breakNodes;
		const children = lastNode.children;
		const index = children.indexOf(breakNode);
		children.splice(index, 1);
	}
	return nvueNodes;
}
//#endregion
//#region src/components/ad.ts
var _adDataCache$1 = {};
function getAdData$1(data, onsuccess, onerror) {
	const { adpid, width } = data;
	const key = adpid + "-" + width;
	const adDataList = _adDataCache$1[key];
	if (adDataList && adDataList.length > 0) {
		onsuccess(adDataList.splice(0, 1)[0]);
		return;
	}
	plus.ad.getAds(data, (res) => {
		const list = res.ads;
		onsuccess(list.splice(0, 1)[0]);
		_adDataCache$1[key] = adDataList ? adDataList.concat(list) : list;
	}, (err) => {
		onerror({
			errCode: err.code,
			errMsg: err.message
		});
	});
}
var adProps = {
	adpid: {
		type: [Number, String],
		default: ""
	},
	data: {
		type: String,
		default: ""
	},
	width: {
		type: String,
		default: ""
	},
	channel: {
		type: String,
		default: ""
	}
};
//#endregion
//#region src/nvue/ad/index.tsx
var AdEventType$1 = {
	load: "load",
	close: "close",
	error: "error",
	downloadchange: "downloadchange"
};
var ad_default = /* @__PURE__ */ defineComponent({
	name: "Ad",
	props: adProps,
	emits: [
		AdEventType$1.load,
		AdEventType$1.close,
		AdEventType$1.error,
		AdEventType$1.downloadchange
	],
	setup(props, { emit }) {
		const adRef = ref(null);
		const trigger = useCustomEvent(adRef, emit);
		const state = useAdState(props);
		watch(() => props.adpid, (value) => {
			_loadAdData$1(state, props, trigger);
		});
		watch(() => props.data, (value) => {
			state.data = value;
		});
		onMounted(() => {
			setTimeout(() => {
				getComponentSize(adRef.value).then(({ width }) => {
					state.width = width === 0 ? -1 : width;
					_loadAdData$1(state, props, trigger);
				});
			}, 50);
		});
		const listeners = {
			onDownloadchange(e) {
				trigger(AdEventType$1.downloadchange, e);
			},
			onDislike(e) {
				trigger(AdEventType$1.close, e);
			}
		};
		return () => {
			return createVNode("u-ad", mergeProps({ "ref": adRef }, {
				data: state.data,
				rendering: true
			}, listeners), null);
		};
	}
});
function useAdState(props) {
	return reactive({
		width: 0,
		data: ref("")
	});
}
function _loadAdData$1(state, props, trigger) {
	getAdData$1({
		adpid: props.adpid,
		width: state.width
	}, (res) => {
		state.data = res;
		trigger(AdEventType$1.load, {});
	}, (err) => {
		trigger(AdEventType$1.error, err);
	});
}
//#endregion
//#region src/components/ad-draw.ts
var _adDataCache = {};
function getAdData(adpid, width, height, onsuccess, onerror) {
	const key = adpid + "-" + width;
	const adDataList = _adDataCache[key];
	if (adDataList && adDataList.length > 0) {
		onsuccess(adDataList.splice(0, 1)[0]);
		return;
	}
	plus.ad.getDrawAds({
		adpid: String(adpid),
		count: 3,
		width
	}, (res) => {
		const list = res.ads;
		onsuccess(list.splice(0, 1)[0]);
		_adDataCache[key] = adDataList ? adDataList.concat(list) : list;
	}, (err) => {
		onerror({
			errCode: err.code,
			errMsg: err.message
		});
	});
}
var adDrawProps = {
	adpid: {
		type: [Number, String],
		default: ""
	},
	data: {
		type: String,
		default: ""
	},
	width: {
		type: String,
		default: ""
	}
};
//#endregion
//#region src/nvue/ad-draw/index.tsx
var AdEventType = {
	load: "load",
	close: "close",
	error: "error"
};
var ad_draw_default = /* @__PURE__ */ defineComponent({
	name: "AdDraw",
	props: adDrawProps,
	emits: [
		AdEventType.load,
		AdEventType.close,
		AdEventType.error
	],
	setup(props, { emit }) {
		const adRef = ref(null);
		const trigger = useCustomEvent(adRef, emit);
		const state = useAdDrawState(props);
		watch(() => props.adpid, (value) => {
			_loadAdData(state, props, trigger);
		});
		watch(() => props.data, (value) => {
			state.data = value;
		});
		const listeners = { onDislike(e) {
			trigger(AdEventType.close, e);
		} };
		onMounted(() => {
			setTimeout(() => {
				getComponentSize(adRef.value).then(({ width, height }) => {
					state.width = width === 0 ? -1 : width;
					state.height = height === 0 ? -1 : height;
					_loadAdData(state, props, trigger);
				});
			}, 50);
		});
		return () => {
			const { data } = state;
			return createVNode("u-ad-draw", mergeProps({ "ref": adRef }, {
				data,
				rendering: true
			}, listeners), null);
		};
	}
});
function useAdDrawState(props) {
	return reactive({
		width: 0,
		height: 0,
		data: ref("")
	});
}
function _loadAdData(state, props, trigger) {
	getAdData(props.adpid, state.width, state.height, (res) => {
		state.data = res;
		trigger(AdEventType.load, {});
	}, (err) => {
		trigger(AdEventType.error, err);
	});
}
//#endregion
//#region src/nvue/components.ts
var components_default = {
	Navigator: navigator_default,
	Label: label_default,
	Button: button_default,
	MovableArea: movable_area_default,
	MovableView: movable_view_default,
	Progress: progress_default,
	PickerView: picker_view_default,
	PickerViewColumn: picker_view_column_default,
	Picker: picker_default,
	USlider: slider_default,
	Switch: switch_default,
	Checkbox: checkbox_default,
	CheckboxGroup: checkbox_group_default,
	Radio: radio_default,
	RadioGroup: radio_group_default,
	Form: form_default,
	Icon: icon_default,
	Swiper: swiper_default,
	SwiperItem: swiper_item_default,
	RichText: rich_text_default,
	Ad: ad_default,
	AdDraw: ad_draw_default
};
//#endregion
export { components_default as default };
