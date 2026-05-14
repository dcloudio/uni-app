Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (all, symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
let vue = require("vue");
let __vue_shared = require("@vue/shared");
let __dcloudio_uni_shared = require("@dcloudio/uni-shared");
let __dcloudio_uni_i18n = require("@dcloudio/uni-i18n");
let vue_router = require("vue-router");
const isEnableLocale = /* @__PURE__ */ (0, __dcloudio_uni_shared.once)(() => typeof __uniConfig !== "undefined" && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length);
var i18n;
function getLocaleMessage() {
	const locale = uni.getLocale();
	const locales = __uniConfig.locales;
	return locales[locale] || locales[__uniConfig.fallbackLocale] || locales.en || {};
}
function formatI18n(message) {
	if ((0, __dcloudio_uni_i18n.isI18nStr)(message, __dcloudio_uni_shared.I18N_JSON_DELIMITERS)) return useI18n().f(message, getLocaleMessage(), __dcloudio_uni_shared.I18N_JSON_DELIMITERS);
	return message;
}
function resolveJsonObj(jsonObj, names) {
	if (names.length === 1) {
		if (jsonObj) {
			const _isI18nStr = (value$1) => (0, __vue_shared.isString)(value$1) && (0, __dcloudio_uni_i18n.isI18nStr)(value$1, __dcloudio_uni_shared.I18N_JSON_DELIMITERS);
			const _name = names[0];
			let filterJsonObj = [];
			if ((0, __vue_shared.isArray)(jsonObj) && (filterJsonObj = jsonObj.filter((item) => _isI18nStr(item[_name]))).length) return filterJsonObj;
			const value = jsonObj[names[0]];
			if (_isI18nStr(value)) return jsonObj;
		}
		return;
	}
	const name = names.shift();
	return resolveJsonObj(jsonObj && jsonObj[name], names);
}
function defineI18nProperties(obj, names) {
	return names.map((name) => defineI18nProperty(obj, name));
}
function defineI18nProperty(obj, names) {
	const jsonObj = resolveJsonObj(obj, names);
	if (!jsonObj) return false;
	const prop = names[names.length - 1];
	if ((0, __vue_shared.isArray)(jsonObj)) jsonObj.forEach((item) => defineI18nProperty(item, [prop]));
	else {
		let value = jsonObj[prop];
		Object.defineProperty(jsonObj, prop, {
			get() {
				return formatI18n(value);
			},
			set(v$1) {
				value = v$1;
			}
		});
	}
	return true;
}
function useI18n() {
	if (!i18n) {
		let locale;
		locale = (0, __dcloudio_uni_shared.getEnvLocale)();
		i18n = (0, __dcloudio_uni_i18n.initVueI18n)(locale);
		if (isEnableLocale()) {
			const localeKeys = Object.keys(__uniConfig.locales || {});
			if (localeKeys.length) localeKeys.forEach((locale$1) => i18n.add(locale$1, __uniConfig.locales[locale$1]));
			i18n.setLocale(locale);
		}
	}
	return i18n;
}
function normalizeMessages(module$1, keys, values) {
	return keys.reduce((res, name, index$1) => {
		res[module$1 + name] = values[index$1];
		return res;
	}, {});
}
const initI18nAsyncMsgsOnce = /* @__PURE__ */ (0, __dcloudio_uni_shared.once)(() => {
	const name = "uni.async.";
	const keys = ["error"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(__dcloudio_uni_i18n.LOCALE_EN, normalizeMessages(name, keys, ["The connection timed out, click the screen to try again."]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(__dcloudio_uni_i18n.LOCALE_ES, normalizeMessages(name, keys, ["Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo."]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(__dcloudio_uni_i18n.LOCALE_FR, normalizeMessages(name, keys, ["La connexion a expiré, cliquez sur l'écran pour réessayer."]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(__dcloudio_uni_i18n.LOCALE_ZH_HANS, normalizeMessages(name, keys, ["连接服务器超时，点击屏幕重试"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(__dcloudio_uni_i18n.LOCALE_ZH_HANT, normalizeMessages(name, keys, ["連接服務器超時，點擊屏幕重試"]), false);
});
const initI18nPickerMsgsOnce = /* @__PURE__ */ (0, __dcloudio_uni_shared.once)(() => {
	const name = "uni.picker.";
	const keys = ["done", "cancel"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(__dcloudio_uni_i18n.LOCALE_EN, normalizeMessages(name, keys, ["Done", "Cancel"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(__dcloudio_uni_i18n.LOCALE_ES, normalizeMessages(name, keys, ["OK", "Cancelar"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(__dcloudio_uni_i18n.LOCALE_FR, normalizeMessages(name, keys, ["OK", "Annuler"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(__dcloudio_uni_i18n.LOCALE_ZH_HANS, normalizeMessages(name, keys, ["完成", "取消"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(__dcloudio_uni_i18n.LOCALE_ZH_HANT, normalizeMessages(name, keys, ["完成", "取消"]), false);
});
const initI18nVideoMsgsOnce = /* @__PURE__ */ (0, __dcloudio_uni_shared.once)(() => {
	const name = "uni.video.";
	const keys = ["danmu", "volume"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(__dcloudio_uni_i18n.LOCALE_EN, normalizeMessages(name, keys, ["Danmu", "Volume"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(__dcloudio_uni_i18n.LOCALE_ES, normalizeMessages(name, keys, ["Danmu", "Volumen"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(__dcloudio_uni_i18n.LOCALE_FR, normalizeMessages(name, keys, ["Danmu", "Le Volume"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(__dcloudio_uni_i18n.LOCALE_ZH_HANS, normalizeMessages(name, keys, ["弹幕", "音量"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(__dcloudio_uni_i18n.LOCALE_ZH_HANT, normalizeMessages(name, keys, ["彈幕", "音量"]), false);
});
function initNavigationBarI18n(navigationBar) {
	if (isEnableLocale()) return defineI18nProperties(navigationBar, [
		["titleText"],
		["searchInput", "placeholder"],
		["buttons", "text"]
	]);
}
function initTabBarI18n(tabBar$1) {
	if (isEnableLocale() && tabBar$1.list) tabBar$1.list.forEach((item) => {
		defineI18nProperty(item, ["text"]);
	});
	if (isEnableLocale() && tabBar$1.midButton) defineI18nProperty(tabBar$1.midButton, ["text"]);
	return tabBar$1;
}
function initBridge(subscribeNamespace) {
	const emitter = new __dcloudio_uni_shared.Emitter();
	return {
		on(event, callback) {
			return emitter.on(event, callback);
		},
		once(event, callback) {
			return emitter.once(event, callback);
		},
		off(event, callback) {
			return emitter.off(event, callback);
		},
		emit(event, ...args) {
			return emitter.emit(event, ...args);
		},
		subscribe(event, callback, once$5 = false) {
			emitter[once$5 ? "once" : "on"](`${subscribeNamespace}.${event}`, callback);
		},
		unsubscribe(event, callback) {
			emitter.off(`${subscribeNamespace}.${event}`, callback);
		},
		subscribeHandler(event, args, pageId) {
			emitter.emit(`${subscribeNamespace}.${event}`, args, pageId);
		}
	};
}
const INVOKE_VIEW_API = "invokeViewApi";
const INVOKE_SERVICE_API = "invokeServiceApi";
var invokeServiceMethodId = 1;
const invokeServiceMethod = (name, args, callback) => {
	const { subscribe, publishHandler } = UniViewJSBridge;
	const id$1 = callback ? invokeServiceMethodId++ : 0;
	callback && subscribe("invokeServiceApi." + id$1, callback, true);
	publishHandler(INVOKE_SERVICE_API, {
		id: id$1,
		name,
		args
	});
};
var viewMethods = Object.create(null);
function normalizeViewMethodName(pageId, name) {
	return pageId + "." + name;
}
function registerViewMethod(pageId, name, fn) {
	name = normalizeViewMethodName(pageId, name);
	if (!viewMethods[name]) viewMethods[name] = fn;
}
const ViewJSBridge = /* @__PURE__ */ (0, __vue_shared.extend)(/* @__PURE__ */ initBridge("service"), { invokeServiceMethod });
var require_out = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var attrs = [
		"top",
		"left",
		"right",
		"bottom"
	];
	var inited;
	var elementComputedStyle = {};
	var support;
	function getSupport() {
		if (!("CSS" in window) || typeof CSS.supports != "function") support = "";
		else if (CSS.supports("top: env(safe-area-inset-top)")) support = "env";
		else if (CSS.supports("top: constant(safe-area-inset-top)")) support = "constant";
		else support = "";
		return support;
	}
	function init() {
		support = typeof support === "string" ? support : getSupport();
		if (!support) {
			attrs.forEach(function(attr$1) {
				elementComputedStyle[attr$1] = 0;
			});
			return;
		}
		function setStyle(el, style) {
			var elStyle = el.style;
			Object.keys(style).forEach(function(key) {
				elStyle[key] = style[key];
			});
		}
		var cbs = [];
		function parentReady(callback) {
			if (callback) cbs.push(callback);
			else cbs.forEach(function(cb) {
				cb();
			});
		}
		var passiveEvents = false;
		try {
			var opts = Object.defineProperty({}, "passive", { get: function() {
				passiveEvents = { passive: true };
			} });
			window.addEventListener("test", null, opts);
		} catch (e$1) {}
		function addChild(parent, attr$1) {
			var a1 = document.createElement("div");
			var a2 = document.createElement("div");
			var a1Children = document.createElement("div");
			var a2Children = document.createElement("div");
			var W = 100;
			var MAX = 1e4;
			var aStyle = {
				position: "absolute",
				width: W + "px",
				height: "200px",
				boxSizing: "border-box",
				overflow: "hidden",
				paddingBottom: support + "(safe-area-inset-" + attr$1 + ")"
			};
			setStyle(a1, aStyle);
			setStyle(a2, aStyle);
			setStyle(a1Children, {
				transition: "0s",
				animation: "none",
				width: "400px",
				height: "400px"
			});
			setStyle(a2Children, {
				transition: "0s",
				animation: "none",
				width: "250%",
				height: "250%"
			});
			a1.appendChild(a1Children);
			a2.appendChild(a2Children);
			parent.appendChild(a1);
			parent.appendChild(a2);
			parentReady(function() {
				a1.scrollTop = a2.scrollTop = MAX;
				var a1LastScrollTop = a1.scrollTop;
				var a2LastScrollTop = a2.scrollTop;
				function onScroll() {
					if (this.scrollTop === (this === a1 ? a1LastScrollTop : a2LastScrollTop)) return;
					a1.scrollTop = a2.scrollTop = MAX;
					a1LastScrollTop = a1.scrollTop;
					a2LastScrollTop = a2.scrollTop;
					attrChange(attr$1);
				}
				a1.addEventListener("scroll", onScroll, passiveEvents);
				a2.addEventListener("scroll", onScroll, passiveEvents);
			});
			var computedStyle = getComputedStyle(a1);
			Object.defineProperty(elementComputedStyle, attr$1, {
				configurable: true,
				get: function() {
					return parseFloat(computedStyle.paddingBottom);
				}
			});
		}
		var parentDiv = document.createElement("div");
		setStyle(parentDiv, {
			position: "absolute",
			left: "0",
			top: "0",
			width: "0",
			height: "0",
			zIndex: "-1",
			overflow: "hidden",
			visibility: "hidden"
		});
		attrs.forEach(function(key) {
			addChild(parentDiv, key);
		});
		document.body.appendChild(parentDiv);
		parentReady();
		inited = true;
	}
	function getAttr(attr$1) {
		if (!inited) init();
		return elementComputedStyle[attr$1];
	}
	var changeAttrs = [];
	function attrChange(attr$1) {
		if (!changeAttrs.length) setTimeout(function() {
			var style = {};
			changeAttrs.forEach(function(attr$2) {
				style[attr$2] = elementComputedStyle[attr$2];
			});
			changeAttrs.length = 0;
			callbacks.forEach(function(callback) {
				callback(style);
			});
		}, 0);
		changeAttrs.push(attr$1);
	}
	var callbacks = [];
	function onChange(callback) {
		if (!getSupport()) return;
		if (!inited) init();
		if (typeof callback === "function") callbacks.push(callback);
	}
	function offChange(callback) {
		var index$1 = callbacks.indexOf(callback);
		if (index$1 >= 0) callbacks.splice(index$1, 1);
	}
	module.exports = {
		get support() {
			return (typeof support === "string" ? support : getSupport()).length != 0;
		},
		get top() {
			return getAttr("top");
		},
		get left() {
			return getAttr("left");
		},
		get right() {
			return getAttr("right");
		},
		get bottom() {
			return getAttr("bottom");
		},
		onChange,
		offChange
	};
}));
var import_out$1 = /* @__PURE__ */ __toESM(require_out());
const onEventPrevent = /* @__PURE__ */ (0, vue.withModifiers)(() => {}, ["prevent"]);
const onEventStop = /* @__PURE__ */ (0, vue.withModifiers)((_event) => {}, ["stop"]);
function updateCssVar(cssVars) {
	const style = document.documentElement.style;
	Object.keys(cssVars).forEach((name) => {
		style.setProperty(name, cssVars[name]);
	});
}
function updatePageCssVar(cssVars) {
	return updateCssVar(cssVars);
}
function PolySymbol(name) {
	return Symbol(process.env.NODE_ENV !== "production" ? "[uni-app]: " + name : name);
}
function rpx2px(str, replace = false) {
	if (replace) return rpx2pxWithReplace(str);
	return parseInt(str + "");
}
function rpx2pxWithReplace(str) {
	return str;
}
function get$pageByPage(page) {
	return page.$page;
}
function isBuiltInElement(target) {
	return target.tagName.indexOf("UNI-") === 0;
}
const ICON_PATH_CANCEL = "M20.928 10.176l-4.928 4.928-4.928-4.928-0.896 0.896 4.928 4.928-4.928 4.928 0.896 0.896 4.928-4.928 4.928 4.928 0.896-0.896-4.928-4.928 4.928-4.928-0.896-0.896zM16 2.080q-3.776 0-7.040 1.888-3.136 1.856-4.992 4.992-1.888 3.264-1.888 7.040t1.888 7.040q1.856 3.136 4.992 4.992 3.264 1.888 7.040 1.888t7.040-1.888q3.136-1.856 4.992-4.992 1.888-3.264 1.888-7.040t-1.888-7.040q-1.856-3.136-4.992-4.992-3.264-1.888-7.040-1.888zM16 28.64q-3.424 0-6.4-1.728-2.848-1.664-4.512-4.512-1.728-2.976-1.728-6.4t1.728-6.4q1.664-2.848 4.512-4.512 2.976-1.728 6.4-1.728t6.4 1.728q2.848 1.664 4.512 4.512 1.728 2.976 1.728 6.4t-1.728 6.4q-1.664 2.848-4.512 4.512-2.976 1.728-6.4 1.728z";
const ICON_PATH_CLEAR = "M16 0q-4.352 0-8.064 2.176-3.616 2.144-5.76 5.76-2.176 3.712-2.176 8.064t2.176 8.064q2.144 3.616 5.76 5.76 3.712 2.176 8.064 2.176t8.064-2.176q3.616-2.144 5.76-5.76 2.176-3.712 2.176-8.064t-2.176-8.064q-2.144-3.616-5.76-5.76-3.712-2.176-8.064-2.176zM22.688 21.408q0.32 0.32 0.304 0.752t-0.336 0.736-0.752 0.304-0.752-0.32l-5.184-5.376-5.376 5.184q-0.32 0.32-0.752 0.304t-0.736-0.336-0.304-0.752 0.32-0.752l5.376-5.184-5.184-5.376q-0.32-0.32-0.304-0.752t0.336-0.752 0.752-0.304 0.752 0.336l5.184 5.376 5.376-5.184q0.32-0.32 0.752-0.304t0.752 0.336 0.304 0.752-0.336 0.752l-5.376 5.184 5.184 5.376z";
const ICON_PATH_DOWNLOAD = "M15.808 1.696q-3.776 0-7.072 1.984-3.2 1.888-5.088 5.152-1.952 3.392-1.952 7.36 0 3.776 1.952 7.072 1.888 3.2 5.088 5.088 3.296 1.952 7.072 1.952 3.968 0 7.36-1.952 3.264-1.888 5.152-5.088 1.984-3.296 1.984-7.072 0-4-1.984-7.36-1.888-3.264-5.152-5.152-3.36-1.984-7.36-1.984zM20.864 18.592l-3.776 4.928q-0.448 0.576-1.088 0.576t-1.088-0.576l-3.776-4.928q-0.448-0.576-0.24-0.992t0.944-0.416h2.976v-8.928q0-0.256 0.176-0.432t0.4-0.176h1.216q0.224 0 0.4 0.176t0.176 0.432v8.928h2.976q0.736 0 0.944 0.416t-0.24 0.992z";
const ICON_PATH_INFO = "M15.808 0.128q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.176 3.776-2.176 8.16 0 4.224 2.176 7.872 2.080 3.552 5.632 5.632 3.648 2.176 7.872 2.176 4.384 0 8.16-2.176 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.416-2.176-8.16-2.112-3.616-5.728-5.728-3.744-2.176-8.16-2.176zM16.864 23.776q0 0.064-0.064 0.064h-1.568q-0.096 0-0.096-0.064l-0.256-11.328q0-0.064 0.064-0.064h2.112q0.096 0 0.064 0.064l-0.256 11.328zM16 10.88q-0.576 0-0.976-0.4t-0.4-0.96 0.4-0.96 0.976-0.4 0.976 0.4 0.4 0.96-0.4 0.96-0.976 0.4z";
const ICON_PATH_SEARCH = "M20.928 22.688q-1.696 1.376-3.744 2.112-2.112 0.768-4.384 0.768-3.488 0-6.464-1.728-2.88-1.696-4.576-4.608-1.76-2.976-1.76-6.464t1.76-6.464q1.696-2.88 4.576-4.576 2.976-1.76 6.464-1.76t6.464 1.76q2.912 1.696 4.608 4.576 1.728 2.976 1.728 6.464 0 2.272-0.768 4.384-0.736 2.048-2.112 3.744l9.312 9.28-1.824 1.824-9.28-9.312zM12.8 23.008q2.784 0 5.184-1.376 2.304-1.376 3.68-3.68 1.376-2.4 1.376-5.184t-1.376-5.152q-1.376-2.336-3.68-3.68-2.4-1.408-5.184-1.408t-5.152 1.408q-2.336 1.344-3.68 3.68-1.408 2.368-1.408 5.152t1.408 5.184q1.344 2.304 3.68 3.68 2.368 1.376 5.152 1.376zM12.8 23.008v0z";
const ICON_PATH_SUCCESS_NO_CIRCLE = "M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z";
const ICON_PATH_SUCCESS = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM24.832 11.328l-11.264 11.104q-0.032 0.032-0.112 0.032t-0.112-0.032l-5.216-5.376q-0.096-0.128 0-0.288l0.704-0.96q0.032-0.064 0.112-0.064t0.112 0.032l4.256 3.264q0.064 0.032 0.144 0.032t0.112-0.032l10.336-8.608q0.064-0.064 0.144-0.064t0.112 0.064l0.672 0.672q0.128 0.128 0 0.224z";
const ICON_PATH_WAITING = "M15.84 0.096q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM23.008 21.92l-0.512 0.896q-0.096 0.128-0.224 0.064l-8-3.808q-0.096-0.064-0.16-0.128-0.128-0.096-0.128-0.288l0.512-12.096q0-0.064 0.048-0.112t0.112-0.048h1.376q0.064 0 0.112 0.048t0.048 0.112l0.448 10.848 6.304 4.256q0.064 0.064 0.080 0.128t-0.016 0.128z";
const ICON_PATH_WARN = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM15.136 8.672h1.728q0.128 0 0.224 0.096t0.096 0.256l-0.384 10.24q0 0.064-0.048 0.112t-0.112 0.048h-1.248q-0.096 0-0.144-0.048t-0.048-0.112l-0.384-10.24q0-0.16 0.096-0.256t0.224-0.096zM16 23.328q-0.48 0-0.832-0.352t-0.352-0.848 0.352-0.848 0.832-0.352 0.832 0.352 0.352 0.848-0.352 0.848-0.832 0.352z";
const ICON_PATH_BACK = "M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z";
const ICON_PATH_CLOSE = "M17.25 16.156l7.375-7.313q0.281-0.281 0.281-0.641t-0.281-0.641q-0.25-0.25-0.625-0.25t-0.625 0.25l-7.375 7.344-7.313-7.344q-0.25-0.25-0.625-0.25t-0.625 0.25q-0.281 0.25-0.281 0.625t0.281 0.625l7.313 7.344-7.375 7.344q-0.281 0.25-0.281 0.625t0.281 0.625q0.125 0.125 0.281 0.188t0.344 0.063q0.156 0 0.328-0.063t0.297-0.188l7.375-7.344 7.375 7.406q0.125 0.156 0.297 0.219t0.328 0.063q0.188 0 0.344-0.078t0.281-0.203q0.281-0.25 0.281-0.609t-0.281-0.641l-7.375-7.406z";
function createSvgIconVNode(path, color = "#000", size = 27) {
	return (0, vue.createVNode)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32"
	}, [(0, vue.createVNode)("path", {
		d: path,
		fill: color
	}, null, 8, ["d", "fill"])], 8, ["width", "height"]);
}
function useCurrentPageId() {
	{
		const { $pageInstance } = (0, vue.getCurrentInstance)();
		return $pageInstance && getPageProxyId($pageInstance.proxy);
	}
	let pageId;
	try {
		pageId = getPageProxyId((0, vue.getCurrentInstance)().root.proxy);
	} catch {
		const webviewId = plus.webview.currentWebview().id;
		pageId = isNaN(Number(webviewId)) ? webviewId : Number(webviewId);
	}
	return pageId;
}
function getCurrentPage() {
	const pages = getCurrentPages();
	const len = pages.length;
	if (len) return pages[len - 1];
}
function getCurrentPageMeta() {
	var _getCurrentPage2;
	const $page = (_getCurrentPage2 = getCurrentPage()) === null || _getCurrentPage2 === void 0 ? void 0 : _getCurrentPage2.$page;
	if ($page) return $page.meta;
}
function getCurrentPageId() {
	const meta = getCurrentPageMeta();
	if (meta) return meta.id;
	return -1;
}
function getCurrentPageVm() {
	const page = getCurrentPage();
	if (page) return page.$vm;
}
var PAGE_META_KEYS = ["navigationBar", "pullToRefresh"];
function initGlobalStyle() {
	return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
}
function initRouteMeta(pageMeta, id$1) {
	const globalStyle = initGlobalStyle();
	const res = (0, __vue_shared.extend)({ id: id$1 }, globalStyle, pageMeta);
	PAGE_META_KEYS.forEach((name) => {
		res[name] = (0, __vue_shared.extend)({}, globalStyle[name], pageMeta[name]);
	});
	const { navigationBar } = res;
	navigationBar.titleText && navigationBar.titleImage && (navigationBar.titleText = "");
	return res;
}
function normalizePullToRefreshRpx(pullToRefresh) {
	if (pullToRefresh.offset) pullToRefresh.offset = rpx2px(pullToRefresh.offset);
	if (pullToRefresh.height) pullToRefresh.height = rpx2px(pullToRefresh.height);
	if (pullToRefresh.range) pullToRefresh.range = rpx2px(pullToRefresh.range);
	return pullToRefresh;
}
function initPageInternalInstance(openType, url, pageQuery, meta, eventChannel, themeMode) {
	const { id: id$1, route } = meta;
	const titleColor = (0, __dcloudio_uni_shared.normalizeStyles)(meta.navigationBar, __uniConfig.themeConfig, themeMode).titleColor;
	return {
		id: id$1,
		path: (0, __dcloudio_uni_shared.addLeadingSlash)(route),
		route,
		fullPath: url,
		options: pageQuery,
		meta,
		openType,
		eventChannel,
		statusBarStyle: titleColor === "#ffffff" ? "light" : "dark"
	};
}
function getPageProxyId(proxy) {
	var _proxy$$page, _proxy$$basePage;
	return ((_proxy$$page = proxy.$page) === null || _proxy$$page === void 0 ? void 0 : _proxy$$page.id) || ((_proxy$$basePage = proxy.$basePage) === null || _proxy$$basePage === void 0 ? void 0 : _proxy$$basePage.id);
}
function invokeHook(vm, name, args) {
	if ((0, __vue_shared.isString)(vm)) {
		args = name;
		name = vm;
		vm = getCurrentPageVm();
	} else if (typeof vm === "number") {
		const page = getCurrentPages().find((page$1) => get$pageByPage(page$1).id === vm);
		if (page) vm = page.$vm;
		else vm = getCurrentPageVm();
	}
	if (!vm) return;
	const hooks = vm.$[name];
	if (name === __dcloudio_uni_shared.ON_BACK_PRESS) return hooks && (0, __dcloudio_uni_shared.invokeArrayFnsWithResults)(hooks, args).some((ret) => ret === true);
	return hooks && (0, __dcloudio_uni_shared.invokeArrayFns)(hooks, args);
}
function getRealRoute(fromRoute, toRoute) {
	if (toRoute.indexOf("/") === 0) return toRoute;
	if (toRoute.indexOf("./") === 0) return getRealRoute(fromRoute, toRoute.slice(2));
	const toRouteArray = toRoute.split("/");
	const toRouteLength = toRouteArray.length;
	let i = 0;
	for (; i < toRouteLength && toRouteArray[i] === ".."; i++);
	toRouteArray.splice(0, i);
	toRoute = toRouteArray.join("/");
	const fromRouteArray = fromRoute.length > 0 ? fromRoute.split("/") : [];
	fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
	return (0, __dcloudio_uni_shared.addLeadingSlash)(fromRouteArray.concat(toRouteArray).join("/"));
}
function getRouteOptions(path, alias = false) {
	if (alias) return __uniRoutes.find((route) => route.path === path || route.alias === path);
	return __uniRoutes.find((route) => route.path === path);
}
function initView() {}
function findUniTarget(target) {
	while (!isBuiltInElement(target)) target = target.parentElement;
	return target;
}
function createNativeEvent(evt, htmlElement = false) {
	const { type, timeStamp, target, currentTarget } = evt;
	let realTarget, realCurrentTarget;
	realTarget = (0, __dcloudio_uni_shared.normalizeTarget)(htmlElement ? target : findUniTarget(target));
	realCurrentTarget = (0, __dcloudio_uni_shared.normalizeTarget)(currentTarget);
	const event = {
		type,
		timeStamp,
		target: realTarget,
		detail: {},
		currentTarget: realCurrentTarget
	};
	if (evt instanceof CustomEvent && (0, __vue_shared.isPlainObject)(evt.detail)) event.detail = evt.detail;
	if (evt._stopped) event._stopped = true;
	if (evt.type.startsWith("touch")) {
		event.touches = evt.touches;
		event.changedTouches = evt.changedTouches;
	}
	wrapperEvent(event, evt);
	return event;
}
function wrapperEvent(event, evt) {
	(0, __vue_shared.extend)(event, {
		preventDefault() {
			return evt.preventDefault();
		},
		stopPropagation() {
			return evt.stopPropagation();
		}
	});
}
function initViewPlugin(app) {}
const invokeOnCallback = (name, res) => UniServiceJSBridge.emit("api." + name, res);
var invokeViewMethodId = 1;
function publishViewMethodName(pageId) {
	return (pageId || getCurrentPageId()) + ".invokeViewApi";
}
const invokeViewMethod = (name, args, pageId, callback) => {
	const { subscribe, publishHandler } = UniServiceJSBridge;
	const id$1 = callback ? invokeViewMethodId++ : 0;
	callback && subscribe("invokeViewApi." + id$1, callback, true);
	publishHandler(publishViewMethodName(pageId), {
		id: id$1,
		name,
		args
	}, pageId);
};
const invokeViewMethodKeepAlive = (name, args, callback, pageId) => {
	const { subscribe, unsubscribe, publishHandler } = UniServiceJSBridge;
	const id$1 = invokeViewMethodId++;
	const subscribeName = INVOKE_VIEW_API + "." + id$1;
	subscribe(subscribeName, callback);
	publishHandler(publishViewMethodName(pageId), {
		id: id$1,
		name,
		args
	}, pageId);
	return () => {
		unsubscribe(subscribeName);
	};
};
const ServiceJSBridge = /* @__PURE__ */ (0, __vue_shared.extend)(/* @__PURE__ */ initBridge("view"), {
	invokeOnCallback,
	invokeViewMethod,
	invokeViewMethodKeepAlive
});
function initService() {}
function initAppVm(appVm$1) {
	appVm$1.$vm = appVm$1;
	appVm$1.$mpType = "app";
	const locale = (0, vue.ref)(useI18n().getLocale());
	Object.defineProperty(appVm$1, "$locale", {
		get() {
			return locale.value;
		},
		set(v$1) {
			locale.value = v$1;
		}
	});
}
function initPageVm(pageVm, page) {
	pageVm.route = page.route;
	pageVm.$vm = pageVm;
	pageVm.$page = page;
	pageVm.$mpType = "page";
	pageVm.$fontFamilySet = /* @__PURE__ */ new Set();
	if (page.meta.isTabBar) {
		pageVm.$.__isTabBar = true;
		pageVm.$.__isActive = true;
	}
}
function initServicePlugin(app) {}
function defineGlobalData(app, defaultGlobalData) {
	const options = app.$options || {};
	options.globalData = (0, __vue_shared.extend)(options.globalData || {}, defaultGlobalData);
	Object.defineProperty(app, "globalData", {
		get() {
			return options.globalData;
		},
		set(newGlobalData) {
			options.globalData = newGlobalData;
		}
	});
}
function converPx(value) {
	if (/^-?\d+[ur]px$/i.test(value)) return value.replace(/(^-?\d+)[ur]px$/i, (text, num) => {
		return `${uni.upx2px(parseFloat(num))}px`;
	});
	else if (/^-?[\d\.]+$/.test(value)) return `${value}px`;
	return value || "";
}
function converType(type) {
	return type.replace(/[A-Z]/g, (text) => {
		return `-${text.toLowerCase()}`;
	}).replace("webkit", "-webkit");
}
function getStyle(action) {
	const animateTypes1 = [
		"matrix",
		"matrix3d",
		"scale",
		"scale3d",
		"rotate3d",
		"skew",
		"translate",
		"translate3d"
	];
	const animateTypes2 = [
		"scaleX",
		"scaleY",
		"scaleZ",
		"rotate",
		"rotateX",
		"rotateY",
		"rotateZ",
		"skewX",
		"skewY",
		"translateX",
		"translateY",
		"translateZ"
	];
	const animateTypes3 = ["opacity", "background-color"];
	const animateTypes4 = [
		"width",
		"height",
		"left",
		"right",
		"top",
		"bottom"
	];
	const animates = action.animates;
	const option = action.option;
	const transition = option.transition;
	const style = {};
	const transform = [];
	animates.forEach((animate) => {
		let type = animate.type;
		let args = [...animate.args];
		if (animateTypes1.concat(animateTypes2).includes(type)) {
			if (type.startsWith("rotate") || type.startsWith("skew")) args = args.map((value) => parseFloat(value) + "deg");
			else if (type.startsWith("translate")) args = args.map(converPx);
			if (animateTypes2.indexOf(type) >= 0) args.length = 1;
			transform.push(`${type}(${args.join(",")})`);
		} else if (animateTypes3.concat(animateTypes4).includes(args[0])) {
			type = args[0];
			const value = args[1];
			style[type] = animateTypes4.includes(type) ? converPx(value) : value;
		}
	});
	style.transform = style.webkitTransform = transform.join(" ");
	style.transition = style.webkitTransition = Object.keys(style).map((type) => `${converType(type)} ${transition.duration}ms ${transition.timingFunction} ${transition.delay}ms`).join(",");
	style.transformOrigin = style.webkitTransformOrigin = option.transformOrigin;
	return style;
}
function startAnimation(context) {
	const animation = context.animation;
	if (!animation || !animation.actions || !animation.actions.length) return;
	let index$1 = 0;
	const actions = animation.actions;
	const length = animation.actions.length;
	function animate() {
		const action = actions[index$1];
		const transition = action.option.transition;
		const style = getStyle(action);
		Object.keys(style).forEach((key) => {
			context.$el.style[key] = style[key];
		});
		index$1 += 1;
		if (index$1 < length) setTimeout(animate, transition.duration + transition.delay);
	}
	setTimeout(() => {
		animate();
	}, 0);
}
var animation_default = {
	props: ["animation"],
	watch: { animation: {
		deep: true,
		handler() {
			startAnimation(this);
		}
	} },
	mounted() {
		startAnimation(this);
	}
};
const defineBuiltInComponent = ((options) => {
	options.__reserved = true;
	const { props: props$26, mixins } = options;
	if (!props$26 || !props$26.animation) (mixins || (options.mixins = [])).push(animation_default);
	return defineSystemComponent(options);
});
const defineSystemComponent = ((options) => {
	options.__reserved = true;
	options.compatConfig = { MODE: 3 };
	return (0, vue.defineComponent)(options);
});
const defineUnsupportedComponent = (name) => {
	return defineBuiltInComponent({
		name: (0, __vue_shared.capitalize)((0, __vue_shared.camelize)(name)),
		setup() {
			return () => ((0, vue.openBlock)(), (0, vue.createElementBlock)("uni-" + name, null, name + " is unsupported"));
		}
	});
};
function withWebEvent(fn) {
	return fn.__wwe = true, fn;
}
function useCustomEvent(ref$46, emit$2) {
	return (name, evt, detail) => {
		if (ref$46.value) emit$2(name, normalizeCustomEvent(name, evt, ref$46.value, detail || {}));
	};
}
function useNativeEvent(emit$2) {
	return (name, evt) => {
		emit$2(name, createNativeEvent(evt));
	};
}
function normalizeCustomEvent(name, domEvt, el, detail) {
	let target;
	target = (0, __dcloudio_uni_shared.normalizeTarget)(el);
	return {
		type: domEvt.__evName || detail.type || name,
		timeStamp: domEvt.timeStamp || 0,
		target,
		currentTarget: target,
		detail
	};
}
const hoverProps = {
	hoverClass: {
		type: String,
		default: "none"
	},
	hoverStopPropagation: {
		type: Boolean,
		default: false
	},
	hoverStartTime: {
		type: [Number, String],
		default: 50
	},
	hoverStayTime: {
		type: [Number, String],
		default: 400
	}
};
function useHover(props$26) {
	const hovering = (0, vue.ref)(false);
	let hoverTouch = false;
	let hoverStartTimer;
	let hoverStayTimer;
	function hoverReset() {
		requestAnimationFrame(() => {
			clearTimeout(hoverStayTimer);
			hoverStayTimer = setTimeout(() => {
				hovering.value = false;
			}, parseInt(props$26.hoverStayTime));
		});
	}
	function onTouchstartPassive(evt) {
		if (evt.touches.length > 1) return;
		handleHoverStart(evt);
	}
	function onMousedown(evt) {
		if (hoverTouch) return;
		handleHoverStart(evt);
		window.addEventListener("mouseup", handlePCHoverEnd);
	}
	function handleHoverStart(evt) {
		if (evt._hoverPropagationStopped) return;
		if (!props$26.hoverClass || props$26.hoverClass === "none" || props$26.disabled) return;
		if (props$26.hoverStopPropagation) evt._hoverPropagationStopped = true;
		hoverTouch = true;
		hoverStartTimer = setTimeout(() => {
			hovering.value = true;
			if (!hoverTouch) hoverReset();
		}, parseInt(props$26.hoverStartTime));
	}
	function onTouchend() {
		handleHoverEnd();
	}
	function onMouseup() {
		if (!hoverTouch) return;
		handlePCHoverEnd();
	}
	function handleHoverEnd() {
		hoverTouch = false;
		if (hovering.value) hoverReset();
	}
	function handlePCHoverEnd() {
		handleHoverEnd();
		window.removeEventListener("mouseup", handlePCHoverEnd);
	}
	function onTouchcancel() {
		hoverTouch = false;
		hovering.value = false;
		clearTimeout(hoverStartTimer);
	}
	return {
		hovering,
		binding: {
			onTouchstartPassive: withWebEvent(onTouchstartPassive),
			onMousedown: withWebEvent(onMousedown),
			onTouchend: withWebEvent(onTouchend),
			onMouseup: withWebEvent(onMouseup),
			onTouchcancel: withWebEvent(onTouchcancel)
		}
	};
}
function useBooleanAttr(props$26, keys) {
	if ((0, __vue_shared.isString)(keys)) keys = [keys];
	return keys.reduce((res, key) => {
		if (props$26[key]) res[key] = true;
		return res;
	}, Object.create(null));
}
var rpx2Unit = (0, __dcloudio_uni_shared.createRpx2Unit)(__dcloudio_uni_shared.defaultRpx2Unit.unit, __dcloudio_uni_shared.defaultRpx2Unit.unitRatio, __dcloudio_uni_shared.defaultRpx2Unit.unitPrecision);
const uniFormKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniForm" : "uf");
var form_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Form",
	emits: ["submit", "reset"],
	setup(_props, { slots, emit: emit$2 }) {
		const rootRef = (0, vue.ref)(null);
		provideForm(useCustomEvent(rootRef, emit$2));
		return () => (0, vue.createVNode)("uni-form", { "ref": rootRef }, [(0, vue.createVNode)("span", null, [slots.default && slots.default()])], 512);
	}
});
function provideForm(trigger) {
	const fields$1 = [];
	(0, vue.provide)(uniFormKey, {
		addField(field) {
			fields$1.push(field);
		},
		removeField(field) {
			fields$1.splice(fields$1.indexOf(field), 1);
		},
		submit(evt) {
			trigger("submit", evt, { value: fields$1.reduce((res, field) => {
				if (field.submit) {
					const [name, value] = field.submit();
					name && (res[name] = value);
				}
				return res;
			}, Object.create(null)) });
		},
		reset(evt) {
			fields$1.forEach((field) => field.reset && field.reset());
			trigger("reset", evt);
		}
	});
	return fields$1;
}
const labelProps = { for: {
	type: String,
	default: ""
} };
const uniLabelKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniLabel" : "ul");
function useProvideLabel() {
	const handlers = [];
	(0, vue.provide)(uniLabelKey, {
		addHandler(handler) {
			handlers.push(handler);
		},
		removeHandler(handler) {
			handlers.splice(handlers.indexOf(handler), 1);
		}
	});
	return handlers;
}
var label_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Label",
	props: labelProps,
	setup(props$26, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const pageId = useCurrentPageId();
		const handlers = useProvideLabel();
		const pointer = (0, vue.computed)(() => props$26.for || slots.default && slots.default.length);
		const _onClick = withWebEvent(($event) => {
			const EventTarget = $event.target;
			let stopPropagation = /^uni-(checkbox|radio|switch)-/.test(EventTarget.className);
			if (!stopPropagation) stopPropagation = /^uni-(checkbox|radio|switch|button)$|^(svg|path)$/i.test(EventTarget.tagName);
			if (stopPropagation) return;
			if (props$26.for) UniViewJSBridge.emit("uni-label-click-" + pageId + "-" + props$26.for, $event, true);
			else handlers.length && handlers[0]($event, true);
		});
		return () => (0, vue.createVNode)("uni-label", {
			"ref": rootRef,
			"class": { "uni-label-pointer": pointer },
			"onClick": _onClick
		}, [slots.default && slots.default()], 10, ["onClick"]);
	}
});
function useListeners(props$26, listeners) {}
const buttonProps = {
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
var button_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Button",
	props: buttonProps,
	setup(props$26, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const uniForm = (0, vue.inject)(uniFormKey, false);
		const { hovering, binding } = useHover(props$26);
		const { t: t$1 } = /* @__PURE__ */ useI18n();
		const onClick = withWebEvent((e$1, isLabelClick) => {
			if (props$26.disabled) return e$1.stopImmediatePropagation();
			if (isLabelClick) rootRef.value.click();
			const formType = props$26.formType;
			if (formType) {
				if (!uniForm) return;
				if (formType === "submit") uniForm.submit(e$1);
				else if (formType === "reset") uniForm.reset(e$1);
				return;
			}
		});
		const uniLabel = (0, vue.inject)(uniLabelKey, false);
		if (uniLabel) uniLabel.addHandler(onClick);
		return () => {
			const hoverClass = props$26.hoverClass;
			const booleanAttrs = useBooleanAttr(props$26, "disabled");
			const loadingAttrs = useBooleanAttr(props$26, "loading");
			const plainAttrs = useBooleanAttr(props$26, "plain");
			const hasHoverClass = hoverClass && hoverClass !== "none";
			return (0, vue.createVNode)("uni-button", (0, vue.mergeProps)({
				"ref": rootRef,
				"onClick": onClick,
				"id": props$26.id,
				"class": hasHoverClass && hovering.value ? hoverClass : ""
			}, hasHoverClass && binding, booleanAttrs, loadingAttrs, plainAttrs), [slots.default && slots.default()], 16, ["onClick", "id"]);
		};
	}
});
var import_out = /* @__PURE__ */ __toESM(require_out());
var pageMetaKey = PolySymbol(process.env.NODE_ENV !== "production" ? "UniPageMeta" : "upm");
function usePageMeta() {
	return (0, vue.inject)(pageMetaKey);
}
function providePageMeta(id$1) {
	const pageMeta = initPageMeta(id$1);
	(0, vue.provide)(pageMetaKey, pageMeta);
	return pageMeta;
}
function usePageRoute() {
	if (__UNI_FEATURE_PAGES__) return (0, vue_router.useRoute)();
	const url = location.href;
	const searchPos = url.indexOf("?");
	const hashPos = url.indexOf("#", searchPos > -1 ? searchPos : 0);
	let query = {};
	if (searchPos > -1) query = (0, __dcloudio_uni_shared.parseQuery)(url.slice(searchPos + 1, hashPos > -1 ? hashPos : url.length));
	const { meta } = __uniRoutes[0];
	const path = (0, __dcloudio_uni_shared.addLeadingSlash)(meta.route);
	return {
		meta,
		query,
		path,
		matched: [{ path }]
	};
}
function initPageMeta(id$1) {
	if (__UNI_FEATURE_PAGES__) return (0, vue.reactive)(normalizePageMeta(JSON.parse(JSON.stringify(initRouteMeta((0, vue_router.useRoute)().meta, id$1)))));
	return (0, vue.reactive)(normalizePageMeta(JSON.parse(JSON.stringify(initRouteMeta(__uniRoutes[0].meta, id$1)))));
}
function normalizePageMeta(pageMeta) {
	if (__UNI_FEATURE_PULL_DOWN_REFRESH__) {
		const { enablePullDownRefresh, navigationBar } = pageMeta;
		if (enablePullDownRefresh) {
			const pullToRefresh = normalizePullToRefreshRpx((0, __vue_shared.extend)({
				support: true,
				color: "#2BD009",
				style: "circle",
				height: 70,
				range: 150,
				offset: 0
			}, pageMeta.pullToRefresh));
			const { type, style } = navigationBar;
			if (style !== "custom" && type !== "transparent") pullToRefresh.offset += __dcloudio_uni_shared.NAVBAR_HEIGHT + 0;
			pageMeta.pullToRefresh = pullToRefresh;
		}
	}
	if (__UNI_FEATURE_NAVIGATIONBAR__ || __UNI_FEATURE_I18N_LOCALE__) {
		const { navigationBar } = pageMeta;
		const { titleSize, titleColor, backgroundColor } = navigationBar;
		navigationBar.titleText = navigationBar.titleText || "";
		navigationBar.type = navigationBar.type || "default";
		navigationBar.titleSize = titleSize || "16px";
		navigationBar.titleColor = titleColor || "#000000";
		navigationBar.backgroundColor = backgroundColor || "#F8F8F8";
		__UNI_FEATURE_I18N_LOCALE__ && initNavigationBarI18n(navigationBar);
	}
	return pageMeta;
}
function checkMinWidth(minWidth) {
	return false;
}
function getStateId() {
	return 1;
}
const HTTP_METHODS = [
	"GET",
	"OPTIONS",
	"HEAD",
	"POST",
	"PUT",
	"DELETE",
	"TRACE",
	"CONNECT",
	"PATCH"
];
function elemInArray(str, arr) {
	if (!str || arr.indexOf(str) === -1) return arr[0];
	return str;
}
function validateProtocolFail(name, msg) {
	console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
	if (!onFail) onFail = validateProtocolFail;
	for (const key in protocol) {
		const errMsg = validateProp(key, data[key], protocol[key], !(0, __vue_shared.hasOwn)(data, key));
		if ((0, __vue_shared.isString)(errMsg)) onFail(name, errMsg);
	}
}
function validateProtocols(name, args, protocol, onFail) {
	if (!protocol) return;
	if (!(0, __vue_shared.isArray)(protocol)) return validateProtocol(name, args[0] || Object.create(null), protocol, onFail);
	const len = protocol.length;
	const argsLen = args.length;
	for (let i = 0; i < len; i++) {
		const opts = protocol[i];
		const data = Object.create(null);
		if (argsLen > i) data[opts.name] = args[i];
		validateProtocol(name, data, { [opts.name]: opts }, onFail);
	}
}
function validateProp(name, value, prop, isAbsent) {
	if (!(0, __vue_shared.isPlainObject)(prop)) prop = { type: prop };
	const { type, required, validator } = prop;
	if (required && isAbsent) return "Missing required args: \"" + name + "\"";
	if (value == null && !required) return;
	if (type != null) {
		let isValid = false;
		const types = (0, __vue_shared.isArray)(type) ? type : [type];
		const expectedTypes = [];
		for (let i = 0; i < types.length && !isValid; i++) {
			const { valid, expectedType } = assertType(value, types[i]);
			expectedTypes.push(expectedType || "");
			isValid = valid;
		}
		if (!isValid) return getInvalidTypeMessage(name, value, expectedTypes);
	}
	if (validator) return validator(value);
}
var isSimpleType = /* @__PURE__ */ (0, __vue_shared.makeMap)("String,Number,Boolean,Function,Symbol");
function assertType(value, type) {
	let valid;
	const expectedType = getType(type);
	if (isSimpleType(expectedType)) {
		const t$1 = typeof value;
		valid = t$1 === expectedType.toLowerCase();
		if (!valid && t$1 === "object") valid = value instanceof type;
	} else if (expectedType === "Object") valid = (0, __vue_shared.isObject)(value);
	else if (expectedType === "Array") valid = (0, __vue_shared.isArray)(value);
	else valid = value instanceof type;
	return {
		valid,
		expectedType
	};
}
function getInvalidTypeMessage(name, value, expectedTypes) {
	let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(__vue_shared.capitalize).join(", ")}`;
	const expectedType = expectedTypes[0];
	const receivedType = (0, __vue_shared.toRawType)(value);
	const expectedValue = styleValue(value, expectedType);
	const receivedValue = styleValue(value, receivedType);
	if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) message += ` with value ${expectedValue}`;
	message += `, got ${receivedType} `;
	if (isExplicable(receivedType)) message += `with value ${receivedValue}.`;
	return message;
}
function getType(ctor) {
	const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
	return match ? match[1] : "";
}
function styleValue(value, type) {
	if (type === "String") return `"${value}"`;
	else if (type === "Number") return `${Number(value)}`;
	else return `${value}`;
}
function isExplicable(type) {
	return [
		"string",
		"number",
		"boolean"
	].some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
	return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
	return function() {
		try {
			return fn.apply(fn, arguments);
		} catch (e$1) {
			console.error(e$1);
		}
	};
}
var invokeCallbackId = 1;
var invokeCallbacks = {};
function addInvokeCallback(id$1, name, callback, keepAlive = false) {
	invokeCallbacks[id$1] = {
		name,
		keepAlive,
		callback
	};
	return id$1;
}
function invokeCallback(id$1, res, extras) {
	if (typeof id$1 === "number") {
		const opts = invokeCallbacks[id$1];
		if (opts) {
			if (!opts.keepAlive) delete invokeCallbacks[id$1];
			return opts.callback(res, extras);
		}
	}
	return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
	const apiCallbacks = {};
	for (const name in args) {
		const fn = args[name];
		if ((0, __vue_shared.isFunction)(fn)) {
			apiCallbacks[name] = tryCatch(fn);
			delete args[name];
		}
	}
	return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
	if (!errMsg || errMsg.indexOf(":fail") === -1) return name + ":ok";
	return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
	if (!(0, __vue_shared.isPlainObject)(args)) args = {};
	const { success, fail, complete } = getApiCallbacks(args);
	const hasSuccess = (0, __vue_shared.isFunction)(success);
	const hasFail = (0, __vue_shared.isFunction)(fail);
	const hasComplete = (0, __vue_shared.isFunction)(complete);
	const callbackId = invokeCallbackId++;
	addInvokeCallback(callbackId, name, (res) => {
		res = res || {};
		res.errMsg = normalizeErrMsg(res.errMsg, name);
		(0, __vue_shared.isFunction)(beforeAll) && beforeAll(res);
		if (res.errMsg === name + ":ok") {
			(0, __vue_shared.isFunction)(beforeSuccess) && beforeSuccess(res, args);
			hasSuccess && success(res);
		} else hasFail && fail(res);
		hasComplete && complete(res);
	});
	return callbackId;
}
var HOOK_SUCCESS = "success";
var HOOK_FAIL = "fail";
var HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
	return function(data) {
		return hook(data, params) || data;
	};
}
function queue(hooks, data, params) {
	let promise = false;
	for (let i = 0; i < hooks.length; i++) {
		const hook = hooks[i];
		if (promise) promise = Promise.resolve(wrapperHook(hook, params));
		else {
			const res = hook(data, params);
			if ((0, __vue_shared.isPromise)(res)) promise = Promise.resolve(res);
			if (res === false) return {
				then() {},
				catch() {}
			};
		}
	}
	return promise || {
		then(callback) {
			return callback(data);
		},
		catch() {}
	};
}
function wrapperOptions(interceptors, options = {}) {
	[
		HOOK_SUCCESS,
		HOOK_FAIL,
		HOOK_COMPLETE
	].forEach((name) => {
		const hooks = interceptors[name];
		if (!(0, __vue_shared.isArray)(hooks)) return;
		const oldCallback = options[name];
		options[name] = function callbackInterceptor(res) {
			queue(hooks, res, options).then((res$1) => {
				return (0, __vue_shared.isFunction)(oldCallback) && oldCallback(res$1) || res$1;
			});
		};
	});
	return options;
}
function wrapperReturnValue(method, returnValue) {
	const returnValueHooks = [];
	if ((0, __vue_shared.isArray)(globalInterceptors.returnValue)) returnValueHooks.push(...globalInterceptors.returnValue);
	const interceptor = scopedInterceptors[method];
	if (interceptor && (0, __vue_shared.isArray)(interceptor.returnValue)) returnValueHooks.push(...interceptor.returnValue);
	returnValueHooks.forEach((hook) => {
		returnValue = hook(returnValue) || returnValue;
	});
	return returnValue;
}
function getApiInterceptorHooks(method) {
	const interceptor = Object.create(null);
	Object.keys(globalInterceptors).forEach((hook) => {
		if (hook !== "returnValue") interceptor[hook] = globalInterceptors[hook].slice();
	});
	const scopedInterceptor = scopedInterceptors[method];
	if (scopedInterceptor) Object.keys(scopedInterceptor).forEach((hook) => {
		if (hook !== "returnValue") interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
	});
	return interceptor;
}
function invokeApi(method, api, options, params) {
	const interceptor = getApiInterceptorHooks(method);
	if (interceptor && Object.keys(interceptor).length) if ((0, __vue_shared.isArray)(interceptor.invoke)) return queue(interceptor.invoke, options).then((options$1) => {
		return api(wrapperOptions(getApiInterceptorHooks(method), options$1), ...params);
	});
	else return api(wrapperOptions(interceptor, options), ...params);
	return api(options, ...params);
}
function hasCallback(args) {
	if ((0, __vue_shared.isPlainObject)(args) && [
		"success",
		"fail",
		"complete"
	].find((cb) => (0, __vue_shared.isFunction)(args[cb]))) return true;
	return false;
}
function handlePromise(promise) {
	return promise;
}
function promisify(name, fn) {
	return (args = {}, ...rest) => {
		if (hasCallback(args)) return wrapperReturnValue(name, invokeApi(name, fn, (0, __vue_shared.extend)({}, args), rest));
		return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
			invokeApi(name, fn, (0, __vue_shared.extend)({}, args, {
				success: resolve,
				fail: reject
			}), rest);
		})));
	};
}
function formatApiArgs(args, options) {
	const params = args[0];
	if (!options || !options.formatArgs || !(0, __vue_shared.isPlainObject)(options.formatArgs) && (0, __vue_shared.isPlainObject)(params)) return;
	const formatArgs = options.formatArgs;
	const keys = Object.keys(formatArgs);
	for (let i = 0; i < keys.length; i++) {
		const name = keys[i];
		const formatterOrDefaultValue = formatArgs[name];
		if ((0, __vue_shared.isFunction)(formatterOrDefaultValue)) {
			const errMsg = formatterOrDefaultValue(args[0][name], params);
			if ((0, __vue_shared.isString)(errMsg)) return errMsg;
		} else if (!(0, __vue_shared.hasOwn)(params, name)) params[name] = formatterOrDefaultValue;
	}
}
function invokeSuccess(id$1, name, res) {
	const result = { errMsg: name + ":ok" };
	return invokeCallback(id$1, (0, __vue_shared.extend)(res || {}, result));
}
function invokeFail(id$1, name, errMsg, errRes = {}) {
	const errMsgPrefix = name + ":fail";
	let apiErrMsg = "";
	if (!errMsg) apiErrMsg = errMsgPrefix;
	else if (errMsg.indexOf(errMsgPrefix) === 0) apiErrMsg = errMsg;
	else apiErrMsg = errMsgPrefix + " " + errMsg;
	delete errRes.errCode;
	return invokeCallback(id$1, (0, __vue_shared.extend)({ errMsg: apiErrMsg }, errRes));
}
function beforeInvokeApi(name, args, protocol, options) {
	if (process.env.NODE_ENV !== "production") validateProtocols(name, args, protocol);
	if (options && options.beforeInvoke) {
		const errMsg$1 = options.beforeInvoke(args);
		if ((0, __vue_shared.isString)(errMsg$1)) return errMsg$1;
	}
	const errMsg = formatApiArgs(args, options);
	if (errMsg) return errMsg;
}
function parseErrMsg(errMsg) {
	if (!errMsg || (0, __vue_shared.isString)(errMsg)) return errMsg;
	if (errMsg.stack) {
		if (typeof globalThis === "undefined" || !globalThis.harmonyChannel) console.error(errMsg.message + "\n" + errMsg.stack);
		return errMsg.message;
	}
	return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
	return (args) => {
		const id$1 = createAsyncApiCallback(name, args, options);
		const errMsg = beforeInvokeApi(name, [args], protocol, options);
		if (errMsg) return invokeFail(id$1, name, errMsg);
		return fn(args, {
			resolve: (res) => invokeSuccess(id$1, name, res),
			reject: (errMsg$1, errRes) => invokeFail(id$1, name, parseErrMsg(errMsg$1), errRes)
		});
	};
}
function wrapperSyncApi(name, fn, protocol, options) {
	return (...args) => {
		const errMsg = beforeInvokeApi(name, args, protocol, options);
		if (errMsg) throw new Error(errMsg);
		return fn.apply(null, args);
	};
}
function wrapperAsyncApi(name, fn, protocol, options) {
	return wrapperTaskApi(name, fn, protocol, options);
}
function defineTaskApi(name, fn, protocol, options) {
	return promisify(name, wrapperTaskApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options));
}
function defineSyncApi(name, fn, protocol, options) {
	return wrapperSyncApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options);
}
function defineAsyncApi(name, fn, protocol, options) {
	return promisify(name, wrapperAsyncApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options));
}
const API_ON_TAB_BAR_MID_BUTTON_TAP = "onTabBarMidButtonTap";
var API_GET_LOCALE = "getLocale";
const getLocale = /* @__PURE__ */ defineSyncApi(API_GET_LOCALE, () => {
	const app = getApp({ allowDefault: true });
	if (app && app.$vm) return app.$vm.$locale;
	return useI18n().getLocale();
});
const API_GET_STORAGE = "getStorage";
const GetStorageProtocol = { key: {
	type: String,
	required: true
} };
const API_GET_STORAGE_SYNC = "getStorageSync";
const GetStorageSyncProtocol = [{
	name: "key",
	type: String,
	required: true
}];
const API_SET_STORAGE = "setStorage";
const SetStorageProtocol = {
	key: {
		type: String,
		required: true
	},
	data: { required: true }
};
const API_SET_STORAGE_SYNC = "setStorageSync";
const SetStorageSyncProtocol = [{
	name: "key",
	type: String,
	required: true
}, {
	name: "data",
	required: true
}];
const API_REMOVE_STORAGE = "removeStorage";
const RemoveStorageProtocol = GetStorageProtocol;
const RemoveStorageSyncProtocol = GetStorageSyncProtocol;
const API_REQUEST = "request";
var dataType = { JSON: "json" };
var RESPONSE_TYPE = ["text", "arraybuffer"];
var DEFAULT_RESPONSE_TYPE = "text";
var encode = encodeURIComponent;
function stringifyQuery$1(url, data) {
	let str = url.split("#");
	const hash = str[1] || "";
	str = str[0].split("?");
	let query = str[1] || "";
	url = str[0];
	const search = query.split("&").filter((item) => item);
	const params = {};
	search.forEach((item) => {
		const part = item.split("=");
		params[part[0]] = part[1];
	});
	for (const key in data) if ((0, __vue_shared.hasOwn)(data, key)) {
		let v$1 = data[key];
		if (typeof v$1 === "undefined" || v$1 === null) v$1 = "";
		else if ((0, __vue_shared.isPlainObject)(v$1)) v$1 = JSON.stringify(v$1);
		params[encode(key)] = encode(v$1);
	}
	query = Object.keys(params).map((item) => `${item}=${params[item]}`).join("&");
	return url + (query ? "?" + query : "") + (hash ? "#" + hash : "");
}
const RequestProtocol = {
	method: String,
	data: [
		Object,
		String,
		Array,
		ArrayBuffer
	],
	url: {
		type: String,
		required: true
	},
	header: Object,
	dataType: String,
	responseType: String,
	withCredentials: Boolean
};
const RequestOptions = { formatArgs: {
	method(value, params) {
		params.method = elemInArray((value || "").toUpperCase(), HTTP_METHODS);
	},
	data(value, params) {
		params.data = value || "";
	},
	url(value, params) {
		if (params.method === HTTP_METHODS[0] && (0, __vue_shared.isPlainObject)(params.data) && Object.keys(params.data).length) params.url = stringifyQuery$1(value, params.data);
	},
	header(value, params) {
		const header = params.header = value || {};
		if (params.method !== HTTP_METHODS[0]) {
			if (!Object.keys(header).find((key) => key.toLowerCase() === "content-type")) header["Content-Type"] = "application/json";
		}
	},
	dataType(value, params) {
		params.dataType = (value || dataType.JSON).toLowerCase();
	},
	responseType(value, params) {
		params.responseType = (value || "").toLowerCase();
		if (RESPONSE_TYPE.indexOf(params.responseType) === -1) params.responseType = DEFAULT_RESPONSE_TYPE;
	}
} };
const API_SET_NAVIGATION_BAR_COLOR = "setNavigationBarColor";
const API_SET_NAVIGATION_BAR_TITLE = "setNavigationBarTitle";
const SetNavigationBarTitleProtocol = { title: {
	type: String,
	required: true
} };
const API_SHOW_NAVIGATION_BAR_LOADING = "showNavigationBarLoading";
const API_HIDE_NAVIGATION_BAR_LOADING = "hideNavigationBarLoading";
function removeNonTabBarPages() {
	const curTabBarPageVm = getCurrentPageVm();
	if (!curTabBarPageVm) return;
	const pagesMap = getCurrentPagesMap();
	const keys = pagesMap.keys();
	for (const routeKey of keys) {
		const page = pagesMap.get(routeKey);
		if (!page.$.__isTabBar) removePage(routeKey);
		else page.$.__isActive = false;
	}
	if (curTabBarPageVm.$.__isTabBar) {
		curTabBarPageVm.$.__isVisible = false;
		invokeHook(curTabBarPageVm, __dcloudio_uni_shared.ON_HIDE);
	}
}
function isSamePage(url, $page) {
	return url === $page.fullPath || url === "/" && $page.meta.isEntry;
}
function getTabBarPageId(url) {
	const pages = getCurrentPagesMap().values();
	for (const page of pages) {
		const $page = getPage$BasePage(page);
		if (isSamePage(url, $page)) {
			page.$.__isActive = true;
			return $page.id;
		}
	}
}
function removeLastPage() {
	const page = getCurrentPage();
	if (!page) return;
	const $page = getPage$BasePage(page);
	removePage(normalizeRouteKey($page.path, $page.id));
}
function removeAllPages() {
	const keys = getCurrentPagesMap().keys();
	for (const routeKey of keys) removePage(routeKey);
}
function navigate({ type, url, tabBarText, events, isAutomatedTesting }, __id__) {
	if (process.env.NODE_ENV !== "production" && !__UNI_FEATURE_PAGES__) console.warn("当前项目为单页面工程，不能执行页面跳转api。如果需进行页面跳转， 需要在pages.json文件的pages字段中配置多个页面，然后重新运行。");
	const router = getApp().$router;
	const { path, query } = (0, __dcloudio_uni_shared.parseUrl)(url);
	return new Promise((resolve, reject) => {
		const state = createPageState(type, __id__);
		router[type === "navigateTo" ? "push" : "replace"]({
			path,
			query,
			state,
			force: true
		}).then((failure) => {
			if ((0, vue_router.isNavigationFailure)(failure)) return reject(failure.message);
			if (type === "switchTab") router.currentRoute.value.meta.tabBarText = tabBarText;
			if (type === "navigateTo") {
				const meta = router.currentRoute.value.meta;
				if (!meta.eventChannel) meta.eventChannel = new __dcloudio_uni_shared.EventChannel(state.__id__, events);
				else if (events) {
					Object.keys(events).forEach((eventName) => {
						meta.eventChannel._addListener(eventName, "on", events[eventName]);
					});
					meta.eventChannel._clearCache();
				}
				return isAutomatedTesting ? resolve({ __id__: state.__id__ }) : resolve({ eventChannel: meta.eventChannel });
			}
			return isAutomatedTesting ? resolve({ __id__: state.__id__ }) : resolve();
		});
	});
}
function handleBeforeEntryPageRoutes() {
	if (entryPageState.handledBeforeEntryPageRoutes) return;
	entryPageState.handledBeforeEntryPageRoutes = true;
	const navigateToPages = [...navigateToPagesBeforeEntryPages];
	navigateToPagesBeforeEntryPages.length = 0;
	navigateToPages.forEach(({ args, resolve, reject }) => navigate(args).then(resolve).catch(reject));
	const switchTabPages = [...switchTabPagesBeforeEntryPages];
	switchTabPagesBeforeEntryPages.length = 0;
	switchTabPages.forEach(({ args, resolve, reject }) => (removeNonTabBarPages(), navigate(args, getTabBarPageId(args.url)).then(resolve).catch(reject)));
	const redirectToPages = [...redirectToPagesBeforeEntryPages];
	redirectToPagesBeforeEntryPages.length = 0;
	redirectToPages.forEach(({ args, resolve, reject }) => (removeLastPage(), navigate(args).then(resolve).catch(reject)));
	const reLaunchPages = [...reLaunchPagesBeforeEntryPages];
	reLaunchPagesBeforeEntryPages.length = 0;
	reLaunchPages.forEach(({ args, resolve, reject }) => (removeAllPages(), navigate(args).then(resolve).catch(reject)));
}
var tabBar;
function useTabBar() {
	if (!tabBar) tabBar = __uniConfig.tabBar && (0, vue.reactive)(initTabBarI18n(__uniConfig.tabBar));
	return tabBar;
}
const cssEnv = true;
const cssConstant = true;
const cssBackdropFilter = true;
var envMethod = /* @__PURE__ */ (() => "env")();
function normalizeWindowBottom(windowBottom) {
	return envMethod ? `calc(${windowBottom}px + ${envMethod}(safe-area-inset-bottom))` : `${windowBottom}px`;
}
var SEP = "$$";
const currentPagesMap = /* @__PURE__ */ new Map();
function getPage$BasePage(page) {
	return page.$page;
}
const entryPageState = { handledBeforeEntryPageRoutes: false };
const navigateToPagesBeforeEntryPages = [];
const switchTabPagesBeforeEntryPages = [];
const redirectToPagesBeforeEntryPages = [];
const reLaunchPagesBeforeEntryPages = [];
function pruneCurrentPages() {
	currentPagesMap.forEach((page, id$1) => {
		if (page.$.isUnmounted) currentPagesMap.delete(id$1);
	});
}
function getCurrentPagesMap() {
	return currentPagesMap;
}
function getCurrentPages$1() {
	return getCurrentBasePages();
}
function getCurrentBasePages() {
	const curPages = [];
	const pages = currentPagesMap.values();
	for (const page of pages) if (page.$.__isTabBar) {
		if (page.$.__isActive) curPages.push(page);
	} else curPages.push(page);
	return curPages;
}
function removeRouteCache(routeKey) {
	const vnode = pageCacheMap.get(routeKey);
	if (vnode) {
		pageCacheMap.delete(routeKey);
		routeCache.pruneCacheEntry(vnode);
	}
}
function removePage(routeKey, removeRouteCaches = true) {
	const pageVm = currentPagesMap.get(routeKey);
	pageVm.$.__isUnload = true;
	invokeHook(pageVm, __dcloudio_uni_shared.ON_UNLOAD);
	currentPagesMap.delete(routeKey);
	removeRouteCaches && removeRouteCache(routeKey);
}
var id = /* @__PURE__ */ getStateId();
function createPageState(type, __id__) {
	return {
		__id__: __id__ || ++id,
		__type__: type
	};
}
function initPublicPage(route) {
	const meta = usePageMeta();
	if (!__UNI_FEATURE_PAGES__) return initPageInternalInstance("navigateTo", __uniRoutes[0].path, {}, meta);
	let fullPath = route.fullPath;
	if (route.meta.isEntry && fullPath.indexOf(route.meta.route) === -1) fullPath = "/" + route.meta.route + fullPath.replace("/", "");
	return initPageInternalInstance("navigateTo", fullPath, {}, meta);
}
function initPage(vm) {
	const route = vm.$route;
	const page = initPublicPage(route);
	initPageVm(vm, page);
	currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm);
	if (currentPagesMap.size === 1) setTimeout(() => {
		handleBeforeEntryPageRoutes();
	}, 0);
}
function normalizeRouteKey(path, id$1) {
	return path + SEP + id$1;
}
function useKeepAliveRoute() {
	const route = (0, vue_router.useRoute)();
	return {
		routeKey: (0, vue.computed)(() => normalizeRouteKey("/" + route.meta.route, getStateId())),
		isTabBar: (0, vue.computed)(() => route.meta.isTabBar),
		routeCache
	};
}
var pageCacheMap = /* @__PURE__ */ new Map();
var routeCache = {
	get(key) {
		return pageCacheMap.get(key);
	},
	set(key, value) {
		pruneRouteCache(key);
		pageCacheMap.set(key, value);
	},
	delete(key) {
		if (!pageCacheMap.get(key)) return;
		pageCacheMap.delete(key);
	},
	forEach(fn) {
		pageCacheMap.forEach(fn);
	}
};
function isTabBarVNode(vnode) {
	return vnode.props.type === "tabBar";
}
function pruneRouteCache(key) {
	const pageId = parseInt(key.split(SEP)[1]);
	if (!pageId) return;
	routeCache.forEach((vnode, key$1) => {
		const cPageId = parseInt(key$1.split(SEP)[1]);
		if (cPageId && cPageId > pageId) {
			if (__UNI_FEATURE_TABBAR__ && isTabBarVNode(vnode)) return;
			routeCache.delete(key$1);
			routeCache.pruneCacheEntry(vnode);
			(0, vue.nextTick)(() => pruneCurrentPages());
		}
	});
}
function addBase(filePath) {
	const { base: baseUrl } = __uniConfig.router;
	if ((0, __dcloudio_uni_shared.addLeadingSlash)(filePath).indexOf(baseUrl) === 0) return (0, __dcloudio_uni_shared.addLeadingSlash)(filePath);
	return baseUrl + filePath;
}
function getRealPath(filePath) {
	const { base, assets } = __uniConfig.router;
	if (base === "./") {
		if (filePath.indexOf("./") === 0 && (filePath.includes("/static/") || filePath.indexOf("./" + (assets || "assets") + "/") === 0)) filePath = filePath.slice(1);
	}
	if (filePath.indexOf("/") === 0) if (filePath.indexOf("//") === 0) filePath = "https:" + filePath;
	else return addBase(filePath.slice(1));
	if (__dcloudio_uni_shared.SCHEME_RE.test(filePath) || __dcloudio_uni_shared.DATA_RE.test(filePath) || filePath.indexOf("blob:") === 0) return filePath;
	const pages = getCurrentBasePages();
	if (pages.length) return addBase(getRealRoute(getPage$BasePage(pages[pages.length - 1]).route, filePath).slice(1));
	return filePath;
}
function saveImage(base64, dirname, callback) {
	callback(null, base64);
}
var files = {};
function urlToFile(url, local) {
	const file = files[url];
	if (file) return Promise.resolve(file);
	if (/^data:[a-z-]+\/[a-z-]+;base64,/.test(url)) return Promise.resolve(base64ToFile(url));
	if (local) return Promise.reject(/* @__PURE__ */ new Error("not find"));
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.responseType = "blob";
		xhr.onload = function() {
			resolve(this.response);
		};
		xhr.onerror = reject;
		xhr.send();
	});
}
function base64ToFile(base64) {
	const base64Array = base64.split(",");
	const res = base64Array[0].match(/:(.*?);/);
	const type = res ? res[1] : "";
	const str = atob(base64Array[1]);
	let n = str.length;
	const array = new Uint8Array(n);
	while (n--) array[n] = str.charCodeAt(n);
	return blobToFile(array, type);
}
function getExtname(type) {
	const extname = type.split("/")[1];
	return extname ? `.${extname}` : "";
}
function blobToFile(blob, type) {
	let file;
	if (blob instanceof File) file = blob;
	else {
		type = type || blob.type || "";
		const filename = `${Date.now()}${getExtname(type)}`;
		try {
			file = new File([blob], filename, { type });
		} catch (error) {
			blob = blob instanceof Blob ? blob : new Blob([blob], { type });
			file = blob;
			file.name = file.name || filename;
		}
	}
	return file;
}
function fileToUrl(file) {
	for (const key in files) if ((0, __vue_shared.hasOwn)(files, key)) {
		if (files[key] === file) return key;
	}
	var url = (window.URL || window.webkitURL).createObjectURL(file);
	files[url] = file;
	return url;
}
function getSameOriginUrl(url) {
	const a = document.createElement("a");
	a.href = url;
	if (a.origin === location.origin) return Promise.resolve(url);
	return urlToFile(url).then(fileToUrl);
}
var resize_sensor_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "ResizeSensor",
	props: { initial: {
		type: Boolean,
		default: false
	} },
	emits: ["resize"],
	setup(props$26, { emit: emit$2 }) {
		const rootRef = (0, vue.ref)(null);
		const reset = useResizeSensorReset(rootRef);
		const update = useResizeSensorUpdate(rootRef, emit$2, reset);
		useResizeSensorLifecycle(rootRef, props$26, update, reset);
		return () => (0, vue.createVNode)("uni-resize-sensor", {
			"ref": rootRef,
			"onAnimationstartOnce": update
		}, [(0, vue.createVNode)("div", { "onScroll": update }, [(0, vue.createVNode)("div", null, null)], 40, ["onScroll"]), (0, vue.createVNode)("div", { "onScroll": update }, [(0, vue.createVNode)("div", null, null)], 40, ["onScroll"])], 40, ["onAnimationstartOnce"]);
	}
});
function useResizeSensorUpdate(rootRef, emit$2, reset) {
	const size = (0, vue.reactive)({
		width: -1,
		height: -1
	});
	(0, vue.watch)(() => (0, __vue_shared.extend)({}, size), (value) => emit$2("resize", value));
	return () => {
		const rootEl = rootRef.value;
		if (!rootEl) return;
		const rect = rootEl.getBoundingClientRect();
		size.width = rect.width;
		size.height = rect.height;
		reset();
	};
}
function useResizeSensorReset(rootRef) {
	return () => {
		const { firstElementChild, lastElementChild } = rootRef.value;
		firstElementChild.scrollLeft = 1e5;
		firstElementChild.scrollTop = 1e5;
		lastElementChild.scrollLeft = 1e5;
		lastElementChild.scrollTop = 1e5;
	};
}
function useResizeSensorLifecycle(rootRef, props$26, update, reset) {}
const pixelRatio = 1;
function wrapper(canvas, hidpi = true) {
	const pixel_ratio = hidpi ? 1 : 1;
	canvas.width = canvas.offsetWidth * pixel_ratio;
	canvas.height = canvas.offsetHeight * pixel_ratio;
	canvas.getContext("2d").__hidpi__ = hidpi;
}
var initHidpiOnce = /* @__PURE__ */ (0, __dcloudio_uni_shared.once)(() => {});
function $getRealPath(src) {
	return src ? getRealPath(src) : src;
}
function resolveColor(color) {
	color = color.slice(0);
	color[3] = color[3] / 255;
	return "rgba(" + color.join(",") + ")";
}
function processTouches(rect, touches) {
	Array.from(touches).forEach((touch) => {
		touch.x = touch.clientX - rect.left;
		touch.y = touch.clientY - rect.top;
	});
}
var tempCanvas;
function getTempCanvas(width = 0, height = 0) {
	if (!tempCanvas) tempCanvas = document.createElement("canvas");
	tempCanvas.width = width;
	tempCanvas.height = height;
	return tempCanvas;
}
var props$25 = {
	canvasId: {
		type: String,
		default: ""
	},
	disableScroll: {
		type: [Boolean, String],
		default: false
	},
	hidpi: {
		type: Boolean,
		default: true
	}
};
var canvas_default = /* @__PURE__ */ defineBuiltInComponent({
	inheritAttrs: false,
	name: "Canvas",
	compatConfig: { MODE: 3 },
	props: props$25,
	computed: { id() {
		return this.canvasId;
	} },
	setup(props$26, { emit: emit$2, slots }) {
		initHidpiOnce();
		const rootRef = (0, vue.ref)(null);
		const canvas = (0, vue.ref)(null);
		const sensor = (0, vue.ref)(null);
		const actionsWaiting = (0, vue.ref)(false);
		const trigger = useNativeEvent(emit$2);
		const { $attrs, $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
		const { _listeners } = useListeners$1(props$26, $listeners, trigger);
		const { _handleSubscribe, _resize } = useMethods(props$26, canvas, actionsWaiting);
		useSubscribe(_handleSubscribe, useContextInfo(props$26.canvasId), true);
		return () => {
			const { canvasId, disableScroll } = props$26;
			return (0, vue.createVNode)("uni-canvas", (0, vue.mergeProps)({
				"ref": rootRef,
				"canvas-id": canvasId,
				"disable-scroll": disableScroll
			}, $attrs.value, $excludeAttrs.value, _listeners.value), [
				(0, vue.createVNode)("canvas", {
					"ref": canvas,
					"class": "uni-canvas-canvas",
					"width": "300",
					"height": "150"
				}, null, 512),
				(0, vue.createVNode)("div", { "style": "position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow: hidden;" }, [slots.default && slots.default()]),
				(0, vue.createVNode)(resize_sensor_default, {
					"ref": sensor,
					"onResize": _resize
				}, null, 8, ["onResize"])
			], 16, ["canvas-id", "disable-scroll"]);
		};
	}
});
function useListeners$1(props$26, Listeners, trigger) {
	return { _listeners: (0, vue.computed)(() => {
		let events = [
			"onTouchstart",
			"onTouchmove",
			"onTouchend"
		];
		let _$listeners = Listeners.value;
		let $listeners = (0, __vue_shared.extend)({}, (() => {
			let obj = {};
			for (const key in _$listeners) if ((0, __vue_shared.hasOwn)(_$listeners, key)) obj[key] = _$listeners[key];
			return obj;
		})());
		events.forEach((event) => {
			let existing = $listeners[event];
			let eventHandler = [];
			if (existing) eventHandler.push(withWebEvent(($event) => {
				const rect = $event.currentTarget.getBoundingClientRect();
				processTouches(rect, $event.touches);
				processTouches(rect, $event.changedTouches);
				trigger(event.replace("on", "").toLocaleLowerCase(), $event);
			}));
			if (props$26.disableScroll && event === "onTouchmove") eventHandler.push(onEventPrevent);
			$listeners[event] = eventHandler;
		});
		return $listeners;
	}) };
}
function useMethods(props$26, canvasRef, actionsWaiting) {
	let _actionsDefer = [];
	let _images = {};
	const _pixelRatio = (0, vue.computed)(() => props$26.hidpi ? 1 : 1);
	function _resize(size) {
		let canvas = canvasRef.value;
		if (!(!size || canvas.width !== Math.floor(size.width * _pixelRatio.value) || canvas.height !== Math.floor(size.height * _pixelRatio.value))) return;
		if (canvas.width > 0 && canvas.height > 0) {
			let context = canvas.getContext("2d");
			let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			wrapper(canvas, props$26.hidpi);
			context.putImageData(imageData, 0, 0);
		} else wrapper(canvas, props$26.hidpi);
	}
	function actionsChanged({ actions, reserve }, resolve) {
		if (!actions) return;
		if (actionsWaiting.value) {
			_actionsDefer.push([actions, reserve]);
			return;
		}
		let canvas = canvasRef.value;
		let c2d = canvas.getContext("2d");
		if (!reserve) {
			c2d.fillStyle = "#000000";
			c2d.strokeStyle = "#000000";
			c2d.shadowColor = "#000000";
			c2d.shadowBlur = 0;
			c2d.shadowOffsetX = 0;
			c2d.shadowOffsetY = 0;
			c2d.setTransform(1, 0, 0, 1, 0, 0);
			c2d.clearRect(0, 0, canvas.width, canvas.height);
		}
		preloadImage(actions);
		for (let index$1 = 0; index$1 < actions.length; index$1++) {
			const action = actions[index$1];
			let method = action.method;
			const data = action.data;
			const actionType = data[0];
			if (/^set/.test(method) && method !== "setTransform") {
				const method1 = method[3].toLowerCase() + method.slice(4);
				let color;
				if (method1 === "fillStyle" || method1 === "strokeStyle") {
					if (actionType === "normal") color = resolveColor(data[1]);
					else if (actionType === "linear") {
						const LinearGradient = c2d.createLinearGradient(...data[1]);
						data[2].forEach(function(data2) {
							const offset = data2[0];
							const color$1 = resolveColor(data2[1]);
							LinearGradient.addColorStop(offset, color$1);
						});
						color = LinearGradient;
					} else if (actionType === "radial") {
						let _data = data[1];
						const x = _data[0];
						const y = _data[1];
						const r = _data[2];
						const LinearGradient = c2d.createRadialGradient(x, y, 0, x, y, r);
						data[2].forEach(function(data2) {
							const offset = data2[0];
							const color$1 = resolveColor(data2[1]);
							LinearGradient.addColorStop(offset, color$1);
						});
						color = LinearGradient;
					} else if (actionType === "pattern") {
						if (!checkImageLoaded(data[1], actions.slice(index$1 + 1), resolve, function(image) {
							if (image) c2d[method1] = c2d.createPattern(image, data[2]);
						})) break;
						continue;
					}
					c2d[method1] = color;
				} else if (method1 === "globalAlpha") c2d[method1] = Number(actionType) / 255;
				else if (method1 === "shadow") {
					let shadowArray = [
						"shadowOffsetX",
						"shadowOffsetY",
						"shadowBlur",
						"shadowColor"
					];
					data.forEach(function(color_, method_) {
						c2d[shadowArray[method_]] = shadowArray[method_] === "shadowColor" ? resolveColor(color_) : color_;
					});
				} else if (method1 === "fontSize") c2d.__font__ = c2d.font = (c2d.__font__ || c2d.font).replace(/\d+\.?\d*px/, actionType + "px");
				else if (method1 === "lineDash") {
					c2d.setLineDash(actionType);
					c2d.lineDashOffset = data[1] || 0;
				} else if (method1 === "textBaseline") {
					if (actionType === "normal") data[0] = "alphabetic";
					c2d[method1] = actionType;
				} else if (method1 === "font") c2d.__font__ = c2d.font = actionType;
				else c2d[method1] = actionType;
			} else if (method === "fillPath" || method === "strokePath") {
				method = method.replace(/Path/, "");
				c2d.beginPath();
				data.forEach(function(data_) {
					c2d[data_.method].apply(c2d, data_.data);
				});
				c2d[method]();
			} else if (method === "fillText") c2d.fillText.apply(c2d, data);
			else if (method === "drawImage") {
				if (function() {
					let dataArray = [...data];
					let url = dataArray[0];
					let otherData = dataArray.slice(1);
					_images = _images || {};
					if (!checkImageLoaded(url, actions.slice(index$1 + 1), resolve, function(image) {
						if (image) c2d.drawImage.apply(c2d, [image].concat([...otherData.slice(4, 8)], [...otherData.slice(0, 4)]));
					})) return "break";
				}() === "break") break;
			} else if (method === "clip") {
				data.forEach(function(data_) {
					c2d[data_.method].apply(c2d, data_.data);
				});
				c2d.clip();
			} else c2d[method].apply(c2d, data);
		}
		if (!actionsWaiting.value) resolve({ errMsg: "drawCanvas:ok" });
	}
	function preloadImage(actions) {
		actions.forEach(function(action) {
			let method = action.method;
			let data = action.data;
			let src = "";
			if (method === "drawImage") {
				src = data[0];
				src = $getRealPath(src);
				data[0] = src;
			} else if (method === "setFillStyle" && data[0] === "pattern") {
				src = data[1];
				src = $getRealPath(src);
				data[1] = src;
			}
			if (src && !_images[src]) loadImage();
			function loadImage() {
				const image = _images[src] = new Image();
				image.onload = function() {
					image.ready = true;
				};
				getSameOriginUrl(src).then((src$1) => {
					image.src = src$1;
				}).catch(() => {
					image.src = src;
				});
			}
		});
	}
	function checkImageLoaded(src, actions, resolve, fn) {
		let image = _images[src];
		if (image.ready) {
			fn(image);
			return true;
		} else {
			_actionsDefer.unshift([actions, true]);
			actionsWaiting.value = true;
			image.onload = function() {
				image.ready = true;
				fn(image);
				actionsWaiting.value = false;
				let actions$1 = _actionsDefer.slice(0);
				_actionsDefer = [];
				for (let action = actions$1.shift(); action;) {
					actionsChanged({
						actions: action[0],
						reserve: action[1]
					}, resolve);
					action = actions$1.shift();
				}
			};
			return false;
		}
	}
	function getImageData({ x = 0, y = 0, width, height, destWidth, destHeight, hidpi = true, dataType: dataType$1, quality = 1, type = "png" }, resolve) {
		const canvas = canvasRef.value;
		let data;
		const maxWidth = canvas.offsetWidth - x;
		width = width ? Math.min(width, maxWidth) : maxWidth;
		const maxHeight = canvas.offsetHeight - y;
		height = height ? Math.min(height, maxHeight) : maxHeight;
		if (!hidpi) {
			if (!destWidth && !destHeight) {
				destWidth = Math.round(width * _pixelRatio.value);
				destHeight = Math.round(height * _pixelRatio.value);
			} else if (!destWidth) {
				if (!destHeight) destHeight = Math.round(height * _pixelRatio.value);
				destWidth = Math.round(width / height * destHeight);
			} else if (!destHeight) destHeight = Math.round(height / width * destWidth);
		} else {
			destWidth = width;
			destHeight = height;
		}
		const newCanvas = getTempCanvas(destWidth, destHeight);
		const context = newCanvas.getContext("2d");
		if (type === "jpeg" || type === "jpg") {
			type = "jpeg";
			context.fillStyle = "#fff";
			context.fillRect(0, 0, destWidth, destHeight);
		}
		context.__hidpi__ = true;
		context.drawImageByCanvas(canvas, x, y, width, height, 0, 0, destWidth, destHeight, false);
		let result;
		try {
			let compressed;
			if (dataType$1 === "base64") data = newCanvas.toDataURL(`image/${type}`, quality);
			else {
				const imgData = context.getImageData(0, 0, destWidth, destHeight);
				data = Array.prototype.slice.call(imgData.data);
			}
			result = {
				data,
				compressed,
				width: destWidth,
				height: destHeight
			};
		} catch (error) {
			result = { errMsg: `canvasGetImageData:fail ${error}` };
		}
		newCanvas.height = newCanvas.width = 0;
		context.__hidpi__ = false;
		if (!resolve) return result;
		else resolve(result);
	}
	function putImageData({ data, x, y, width, height, compressed }, resolve) {
		try {
			if (!height) height = Math.round(data.length / 4 / width);
			const canvas = getTempCanvas(width, height);
			canvas.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(data), width, height), 0, 0);
			canvasRef.value.getContext("2d").drawImage(canvas, x, y, width, height);
			canvas.height = canvas.width = 0;
		} catch (error) {
			resolve({ errMsg: "canvasPutImageData:fail" });
			return;
		}
		resolve({ errMsg: "canvasPutImageData:ok" });
	}
	function toTempFilePath({ x = 0, y = 0, width, height, destWidth, destHeight, fileType, quality, dirname }, resolve) {
		const res = getImageData({
			x,
			y,
			width,
			height,
			destWidth,
			destHeight,
			hidpi: false,
			dataType: "base64",
			type: fileType,
			quality
		});
		if (res.errMsg) {
			resolve({ errMsg: res.errMsg.replace("canvasPutImageData", "toTempFilePath") });
			return;
		}
		saveImage(res.data, dirname, (error, tempFilePath) => {
			let errMsg = `toTempFilePath:${error ? "fail" : "ok"}`;
			if (error) errMsg += ` ${error.message}`;
			resolve({
				errMsg,
				tempFilePath
			});
		});
	}
	const methods = {
		actionsChanged,
		getImageData,
		putImageData,
		toTempFilePath
	};
	function _handleSubscribe(type, data, resolve) {
		let method = methods[type];
		if (type.indexOf("_") !== 0 && (0, __vue_shared.isFunction)(method)) method(data, resolve);
	}
	return (0, __vue_shared.extend)(methods, {
		_resize,
		_handleSubscribe
	});
}
const uniCheckGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniCheckGroup" : "ucg");
var props$24 = { name: {
	type: String,
	default: ""
} };
var checkbox_group_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "CheckboxGroup",
	props: props$24,
	emits: ["change"],
	setup(props$26, { emit: emit$2, slots }) {
		const rootRef = (0, vue.ref)(null);
		useProvideCheckGroup(props$26, useCustomEvent(rootRef, emit$2));
		return () => {
			return (0, vue.createVNode)("uni-checkbox-group", { "ref": rootRef }, [slots.default && slots.default()], 512);
		};
	}
});
function useProvideCheckGroup(props$26, trigger) {
	const fields$1 = [];
	const getFieldsValue = () => fields$1.reduce((res, field) => {
		if (field.value.checkboxChecked) res.push(field.value.value);
		return res;
	}, new Array());
	(0, vue.provide)(uniCheckGroupKey, {
		addField(field) {
			fields$1.push(field);
		},
		removeField(field) {
			fields$1.splice(fields$1.indexOf(field), 1);
		},
		checkboxChange($event) {
			trigger("change", $event, { value: getFieldsValue() });
		}
	});
	const uniForm = (0, vue.inject)(uniFormKey, false);
	if (uniForm) uniForm.addField({ submit: () => {
		let data = ["", null];
		if (props$26.name !== "") {
			data[0] = props$26.name;
			data[1] = getFieldsValue();
		}
		return data;
	} });
	return getFieldsValue;
}
var props$23 = {
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
	value: {
		type: String,
		default: ""
	},
	color: {
		type: String,
		default: "#007aff"
	},
	backgroundColor: {
		type: String,
		default: ""
	},
	borderColor: {
		type: String,
		default: ""
	},
	activeBackgroundColor: {
		type: String,
		default: ""
	},
	activeBorderColor: {
		type: String,
		default: ""
	},
	iconColor: {
		type: String,
		default: ""
	},
	foreColor: {
		type: String,
		default: ""
	}
};
var checkbox_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Checkbox",
	props: props$23,
	setup(props$26, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const checkboxChecked = (0, vue.ref)(props$26.checked);
		const checkboxCheckedBool = (0, vue.computed)(() => {
			return checkboxChecked.value === "true" || checkboxChecked.value === true;
		});
		const checkboxValue = (0, vue.ref)(props$26.value);
		function getCheckBoxStyle(checked) {
			if (props$26.disabled) return {
				backgroundColor: "#E1E1E1",
				borderColor: "#D1D1D1"
			};
			const style = {};
			if (checked) {
				if (props$26.activeBorderColor) style.borderColor = props$26.activeBorderColor;
				if (props$26.activeBackgroundColor) style.backgroundColor = props$26.activeBackgroundColor;
			} else {
				if (props$26.borderColor) style.borderColor = props$26.borderColor;
				if (props$26.backgroundColor) style.backgroundColor = props$26.backgroundColor;
			}
			return style;
		}
		const checkboxStyle = (0, vue.computed)(() => {
			return getCheckBoxStyle(checkboxCheckedBool.value);
		});
		(0, vue.watch)([() => props$26.checked, () => props$26.value], ([newChecked, newModelValue]) => {
			checkboxChecked.value = newChecked;
			checkboxValue.value = newModelValue;
		});
		const reset = () => {
			checkboxChecked.value = false;
		};
		const { uniCheckGroup, uniLabel } = useCheckboxInject(checkboxChecked, checkboxValue, reset);
		const _onClick = ($event) => {
			if (props$26.disabled) return;
			checkboxChecked.value = !checkboxChecked.value;
			uniCheckGroup && uniCheckGroup.checkboxChange($event);
			$event.stopPropagation();
		};
		if (!!uniLabel) uniLabel.addHandler(_onClick);
		return () => {
			const booleanAttrs = useBooleanAttr(props$26, "disabled");
			let realCheckValue;
			realCheckValue = checkboxChecked.value;
			return (0, vue.createVNode)("uni-checkbox", (0, vue.mergeProps)(booleanAttrs, {
				"id": props$26.id,
				"onClick": _onClick,
				"ref": rootRef
			}), [(0, vue.createVNode)("div", {
				"class": "uni-checkbox-wrapper",
				"style": { "--HOVER-BD-COLOR": props$26.activeBorderColor }
			}, [(0, vue.createVNode)("div", {
				"class": ["uni-checkbox-input", { "uni-checkbox-input-disabled": props$26.disabled }],
				"style": checkboxStyle.value
			}, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props$26.disabled ? "#ADADAD" : props$26.foreColor || props$26.iconColor || props$26.color, 22) : ""], 6), slots.default && slots.default()], 4)], 16, ["id", "onClick"]);
		};
	}
});
function useCheckboxInject(checkboxChecked, checkboxValue, reset) {
	const field = (0, vue.computed)(() => ({
		checkboxChecked: Boolean(checkboxChecked.value),
		value: checkboxValue.value
	}));
	const formField = { reset };
	const uniCheckGroup = (0, vue.inject)(uniCheckGroupKey, false);
	if (!!uniCheckGroup) uniCheckGroup.addField(field);
	const uniForm = (0, vue.inject)(uniFormKey, false);
	if (!!uniForm) uniForm.addField(formField);
	return {
		uniCheckGroup,
		uniForm,
		uniLabel: (0, vue.inject)(uniLabelKey, false)
	};
}
var resetTimer;
function iosHideKeyboard() {}
const props$20 = {
	cursorSpacing: {
		type: [Number, String],
		default: 0
	},
	showConfirmBar: {
		type: [Boolean, String],
		default: "auto"
	},
	adjustPosition: {
		type: [Boolean, String],
		default: true
	},
	autoBlur: {
		type: [Boolean, String],
		default: false
	}
};
const emit$1 = ["keyboardheightchange"];
function useKeyboard$1(props$26, elRef, trigger) {
	function initKeyboard(el) {
		const isApple$1 = (0, vue.computed)(() => String(navigator.vendor).indexOf("Apple") === 0);
		el.addEventListener("focus", () => {
			clearTimeout(resetTimer);
			document.addEventListener("click", iosHideKeyboard, false);
		});
		const onKeyboardHide = () => {
			document.removeEventListener("click", iosHideKeyboard, false);
			if (isApple$1.value) document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop);
		};
		el.addEventListener("blur", () => {
			if (isApple$1.value) el.blur();
			onKeyboardHide();
		});
	}
	(0, vue.watch)(() => elRef.value, (el) => el && initKeyboard(el));
}
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
var empty = /* @__PURE__ */ makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
var block = /* @__PURE__ */ makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
var inline = /* @__PURE__ */ makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
var closeSelf = /* @__PURE__ */ makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
var fillAttrs = /* @__PURE__ */ makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
var special = /* @__PURE__ */ makeMap("script,style");
function HTMLParser(html, handler) {
	var index$1;
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
				index$1 = html.indexOf("-->");
				if (index$1 >= 0) {
					if (handler.comment) handler.comment(html.substring(4, index$1));
					html = html.substring(index$1 + 3);
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
				index$1 = html.indexOf("<");
				var text = index$1 < 0 ? html : html.substring(0, index$1);
				html = index$1 < 0 ? "" : html.substring(index$1);
				if (handler.chars) handler.chars(text);
			}
		} else {
			html = html.replace(/* @__PURE__ */ new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"), function(all, text$1) {
				text$1 = text$1.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
				if (handler.chars) handler.chars(text$1);
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
			var attrs$1 = [];
			rest.replace(attr, function(match$1, name) {
				var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
				attrs$1.push({
					name,
					value,
					escaped: value.replace(/(^|[^\\])"/g, "$1\\\"")
				});
			});
			if (handler.start) handler.start(tagName, attrs$1, unary);
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
var isApple = /^Apple/.test(navigator.vendor);
function useQuill(props$26, rootRef, trigger) {
	(0, vue.watch)(() => props$26.readOnly, (value) => {});
	(0, vue.watch)(() => props$26.placeholder, (value) => {});
	(0, vue.watch)(() => props$26.type, (value) => {});
	useSubscribe((type, data, resolve) => {
		const { options, callbackId } = data;
		let res;
		let errMsg = "not ready";
		if (callbackId) resolve({
			callbackId,
			data: (0, __vue_shared.extend)({}, res, { errMsg: `${type}:${"fail " + errMsg}` })
		});
	}, useContextInfo(), true);
}
var props$22 = /* @__PURE__ */ (0, __vue_shared.extend)({}, props$20, {
	id: {
		type: String,
		default: ""
	},
	readOnly: {
		type: [Boolean, String],
		default: false
	},
	type: {
		type: String,
		default: ""
	},
	placeholder: {
		type: String,
		default: ""
	},
	showImgSize: {
		type: [Boolean, String],
		default: false
	},
	showImgToolbar: {
		type: [Boolean, String],
		default: false
	},
	showImgResize: {
		type: [Boolean, String],
		default: false
	}
});
var editor_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Editor",
	props: props$22,
	emit: [
		"ready",
		"focus",
		"blur",
		"input",
		"statuschange",
		...emit$1
	],
	setup(props$26, { emit: emit$2 }) {
		const rootRef = (0, vue.ref)(null);
		const trigger = useCustomEvent(rootRef, emit$2);
		useQuill(props$26, rootRef, trigger);
		useKeyboard$1(props$26, rootRef, trigger);
		return () => {
			return (0, vue.createVNode)("uni-editor", {
				"ref": rootRef,
				"id": props$26.id,
				"class": "ql-container"
			}, null, 8, ["id"]);
		};
	}
});
var INFO_COLOR = "#10aeff";
var WARN_COLOR = "#f76260";
var GREY_COLOR = "#b2b2b2";
var ICONS = {
	success: {
		d: ICON_PATH_SUCCESS,
		c: __dcloudio_uni_shared.PRIMARY_COLOR
	},
	success_no_circle: {
		d: ICON_PATH_SUCCESS_NO_CIRCLE,
		c: __dcloudio_uni_shared.PRIMARY_COLOR
	},
	info: {
		d: ICON_PATH_INFO,
		c: INFO_COLOR
	},
	warn: {
		d: ICON_PATH_WARN,
		c: WARN_COLOR
	},
	waiting: {
		d: ICON_PATH_WAITING,
		c: INFO_COLOR
	},
	cancel: {
		d: ICON_PATH_CANCEL,
		c: "#f43530"
	},
	download: {
		d: ICON_PATH_DOWNLOAD,
		c: __dcloudio_uni_shared.PRIMARY_COLOR
	},
	search: {
		d: ICON_PATH_SEARCH,
		c: GREY_COLOR
	},
	clear: {
		d: ICON_PATH_CLEAR,
		c: GREY_COLOR
	}
};
var icon_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Icon",
	props: {
		type: {
			type: String,
			required: true,
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
	},
	setup(props$26) {
		const rootRef = (0, vue.ref)(null);
		const path = (0, vue.computed)(() => ICONS[props$26.type]);
		return () => {
			const { value } = path;
			return (0, vue.createVNode)("uni-icon", { "ref": rootRef }, [value && value.d && createSvgIconVNode(value.d, props$26.color || value.c, rpx2px(props$26.size))], 512);
		};
	}
});
var props$21 = {
	src: {
		type: String,
		default: ""
	},
	mode: {
		type: String,
		default: "scaleToFill"
	},
	lazyLoad: {
		type: [Boolean, String],
		default: false
	},
	draggable: {
		type: Boolean,
		default: false
	}
};
var FIX_MODES = {
	widthFix: [
		"offsetWidth",
		"height",
		(value, ratio) => value / ratio
	],
	heightFix: [
		"offsetHeight",
		"width",
		(value, ratio) => value * ratio
	]
};
var IMAGE_MODES = {
	aspectFit: ["center center", "contain"],
	aspectFill: ["center center", "cover"],
	widthFix: [, "100% 100%"],
	heightFix: [, "100% 100%"],
	top: ["center top"],
	bottom: ["center bottom"],
	center: ["center center"],
	left: ["left center"],
	right: ["right center"],
	"top left": ["left top"],
	"top right": ["right top"],
	"bottom left": ["left bottom"],
	"bottom right": ["right bottom"]
};
var image_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Image",
	props: props$21,
	setup(props$26, { emit: emit$2 }) {
		const rootRef = (0, vue.ref)(null);
		const state = useImageState(rootRef, props$26);
		const trigger = useCustomEvent(rootRef, emit$2);
		const { fixSize } = useImageSize(rootRef, props$26, state);
		useImageLoader(state, props$26, rootRef, fixSize, trigger);
		return () => {
			return (0, vue.createVNode)("uni-image", { "ref": rootRef }, [(0, vue.createVNode)("div", { "style": state.modeStyle }, null, 4), FIX_MODES[props$26.mode] ? (0, vue.createVNode)(resize_sensor_default, { "onResize": fixSize }, null, 8, ["onResize"]) : (0, vue.createVNode)("span", null, null)], 512);
		};
	}
});
function useImageState(rootRef, props$26) {
	const imgSrc = (0, vue.ref)("");
	const modeStyleRef = (0, vue.computed)(() => {
		let size = "auto";
		let position = "";
		const opts = IMAGE_MODES[props$26.mode];
		if (!opts) {
			position = "0% 0%";
			size = "100% 100%";
		} else {
			opts[0] && (position = opts[0]);
			opts[1] && (size = opts[1]);
		}
		return `background-image:${imgSrc.value ? "url(\"" + imgSrc.value + "\")" : "none"};background-position:${position};background-size:${size};`;
	});
	return (0, vue.reactive)({
		rootEl: rootRef,
		src: (0, vue.computed)(() => props$26.src ? getRealPath(props$26.src) : ""),
		origWidth: 0,
		origHeight: 0,
		origStyle: {
			width: "",
			height: ""
		},
		modeStyle: modeStyleRef,
		imgSrc
	});
}
function useImageLoader(state, props$26, rootRef, fixSize, trigger) {
	let img;
	let draggableImg;
	const setState = (width = 0, height = 0, imgSrc = "") => {
		state.origWidth = width;
		state.origHeight = height;
		state.imgSrc = imgSrc;
	};
	const loadImage = (src) => {
		if (!src) {
			resetImage();
			setState();
			return;
		}
		img = img || new Image();
		img.onload = (evt) => {
			const { width, height } = img;
			setState(width, height, src);
			(0, vue.nextTick)(() => {
				fixSize();
			});
			img.draggable = props$26.draggable;
			if (draggableImg) draggableImg.remove();
			draggableImg = img;
			rootRef.value.appendChild(img);
			resetImage();
			trigger("load", evt, {
				width,
				height
			});
		};
		img.onerror = (evt) => {
			setState();
			resetImage();
			trigger("error", evt, { errMsg: `GET ${state.src} 404 (Not Found)` });
		};
		img.src = src;
	};
	const resetImage = () => {
		if (img) {
			img.onload = null;
			img.onerror = null;
			img = null;
		}
	};
	(0, vue.watch)(() => state.src, (value) => loadImage(value));
	(0, vue.watch)(() => state.imgSrc, (value) => {
		if (!value && draggableImg) {
			draggableImg.remove();
			draggableImg = null;
		}
	});
}
function fixNumber(num) {
	return num;
}
function useImageSize(rootRef, props$26, state) {
	const fixSize = () => {
		const { mode: mode$1 } = props$26;
		const names = FIX_MODES[mode$1];
		if (!names) return;
		const { origWidth, origHeight } = state;
		const ratio = origWidth && origHeight ? origWidth / origHeight : 0;
		if (!ratio) return;
		const rootEl = rootRef.value;
		const value = rootEl[names[0]];
		if (value) rootEl.style[names[1]] = fixNumber(names[2](value, ratio)) + "px";
	};
	const resetSize = () => {
		const { style } = rootRef.value;
		const { origStyle: { width, height } } = state;
		style.width = width;
		style.height = height;
	};
	(0, vue.watch)(() => props$26.mode, (value, oldValue) => {
		if (FIX_MODES[oldValue]) resetSize();
		if (FIX_MODES[value]) fixSize();
	});
	return {
		fixSize,
		resetSize
	};
}
function throttle(fn, wait) {
	let last = 0;
	let timeout;
	let waitCallback;
	const newFn = function(...arg) {
		const now = Date.now();
		clearTimeout(timeout);
		waitCallback = () => {
			waitCallback = null;
			last = now;
			fn.apply(this, arg);
		};
		if (now - last < wait) {
			timeout = setTimeout(waitCallback, wait - (now - last));
			return;
		}
		waitCallback();
	};
	newFn.cancel = function() {
		clearTimeout(timeout);
		waitCallback = null;
	};
	newFn.flush = function() {
		clearTimeout(timeout);
		waitCallback && waitCallback();
	};
	return newFn;
}
function useUserAction() {
	return { state: (0, vue.reactive)({ userAction: false }) };
}
function useScopedAttrs() {
	return { state: (0, vue.reactive)({ attrs: {} }) };
}
function useFormField(nameKey, value) {
	const uniForm = (0, vue.inject)(uniFormKey, false);
	if (!uniForm) return;
	const instance$1 = (0, vue.getCurrentInstance)();
	uniForm.addField({
		submit() {
			const proxy = instance$1.proxy;
			return [proxy[nameKey], (0, __vue_shared.isString)(value) ? proxy[value] : value.value];
		},
		reset() {
			if ((0, __vue_shared.isString)(value)) instance$1.proxy[value] = "";
			else value.value = "";
		}
	});
}
function getSelectedTextRange(_, resolve) {
	const activeElement = document.activeElement;
	if (!activeElement) return resolve({});
	const data = {};
	if (["input", "textarea"].includes(activeElement.tagName.toLowerCase())) {
		data.start = activeElement.selectionStart;
		data.end = activeElement.selectionEnd;
	}
	resolve(data);
}
var UniViewJSBridgeSubscribe = function() {
	registerViewMethod(getCurrentPageId(), "getSelectedTextRange", getSelectedTextRange);
};
function getValueString(value, type, maxlength) {
	if (type === "number" && isNaN(Number(value))) value = "";
	const valueStr = value === null || value === void 0 ? "" : String(value);
	if (maxlength == void 0) return valueStr;
	return valueStr.slice(0, maxlength);
}
const INPUT_MODES = [
	"none",
	"text",
	"decimal",
	"numeric",
	"tel",
	"search",
	"email",
	"url"
];
const props$9 = /* @__PURE__ */ (0, __vue_shared.extend)({}, {
	name: {
		type: String,
		default: ""
	},
	modelValue: { type: [String, Number] },
	value: { type: [String, Number] },
	disabled: {
		type: [Boolean, String],
		default: false
	},
	autoFocus: {
		type: [Boolean, String],
		default: false
	},
	focus: {
		type: [Boolean, String],
		default: false
	},
	cursor: {
		type: [Number, String],
		default: -1
	},
	selectionStart: {
		type: [Number, String],
		default: -1
	},
	selectionEnd: {
		type: [Number, String],
		default: -1
	},
	type: {
		type: String,
		default: "text"
	},
	password: {
		type: [Boolean, String],
		default: false
	},
	placeholder: {
		type: String,
		default: ""
	},
	placeholderStyle: {
		type: String,
		default: ""
	},
	placeholderClass: {
		type: String,
		default: ""
	},
	maxlength: {
		type: [Number, String],
		default: 140
	},
	confirmType: {
		type: String,
		default: "done"
	},
	confirmHold: {
		type: Boolean,
		default: false
	},
	ignoreCompositionEvent: {
		type: Boolean,
		default: true
	},
	step: {
		type: String,
		default: "0.000000000000000001"
	},
	inputmode: {
		type: String,
		default: void 0,
		validator: (value) => !!~INPUT_MODES.indexOf(value)
	},
	cursorColor: {
		type: String,
		default: ""
	}
}, props$20);
const emit = [
	"input",
	"focus",
	"blur",
	"update:value",
	"update:modelValue",
	"update:focus",
	"compositionstart",
	"compositionupdate",
	"compositionend",
	...emit$1
];
function useBase(props$26, rootRef, emit$2) {
	const fieldRef = (0, vue.ref)(null);
	const trigger = useCustomEvent(rootRef, emit$2);
	const selectionStart = (0, vue.computed)(() => {
		const selectionStart$1 = Number(props$26.selectionStart);
		return isNaN(selectionStart$1) ? -1 : selectionStart$1;
	});
	const selectionEnd = (0, vue.computed)(() => {
		const selectionEnd$1 = Number(props$26.selectionEnd);
		return isNaN(selectionEnd$1) ? -1 : selectionEnd$1;
	});
	const cursor = (0, vue.computed)(() => {
		const cursor$1 = Number(props$26.cursor);
		return isNaN(cursor$1) ? -1 : cursor$1;
	});
	const maxlength = (0, vue.computed)(() => {
		var maxlength$1 = Number(props$26.maxlength);
		return isNaN(maxlength$1) ? 140 : maxlength$1;
	});
	let value = "";
	value = getValueString(props$26.modelValue, props$26.type) || getValueString(props$26.value, props$26.type);
	const state = (0, vue.reactive)({
		value,
		valueOrigin: value,
		maxlength,
		focus: props$26.focus,
		composing: false,
		selectionStart,
		selectionEnd,
		cursor
	});
	(0, vue.watch)(() => state.focus, (val) => emit$2("update:focus", val));
	(0, vue.watch)(() => state.maxlength, (val) => state.value = state.value.slice(0, val), { immediate: false });
	return {
		fieldRef,
		state,
		trigger
	};
}
function useValueSync(props$26, state, emit$2, trigger, fieldRef) {
	let lastUserInputValue = null;
	let valueChangeFn = null;
	valueChangeFn = (0, __dcloudio_uni_shared.debounce)((val) => {
		const fieldElement = fieldRef.value;
		const newValue = getValueString(val, props$26.type);
		if (fieldElement && document.activeElement === fieldElement && newValue === lastUserInputValue) return;
		state.value = newValue;
	}, 100, {
		setTimeout,
		clearTimeout
	});
	(0, vue.watch)(() => props$26.modelValue, valueChangeFn);
	(0, vue.watch)(() => props$26.value, valueChangeFn);
	const triggerInputFn = throttle((event, detail) => {
		valueChangeFn.cancel();
		emit$2("update:modelValue", detail.value);
		emit$2("update:value", detail.value);
		trigger("input", event, detail);
	}, 100);
	const triggerInput = (event, detail, force) => {
		valueChangeFn.cancel();
		lastUserInputValue = detail.value;
		triggerInputFn(event, detail);
		if (force) triggerInputFn.flush();
	};
	return {
		trigger,
		triggerInput
	};
}
function useAutoFocus(props$26, fieldRef) {
	const { state: userActionState } = useUserAction();
	const needFocus = (0, vue.computed)(() => props$26.autoFocus || props$26.focus);
	function focus() {
		if (!needFocus.value) return;
		const field = fieldRef.value;
		if (!field || false) {
			setTimeout(focus, 100);
			return;
		}
		field.focus();
	}
	function blur() {
		const field = fieldRef.value;
		if (field) field.blur();
	}
	(0, vue.watch)(() => props$26.focus, (value) => {
		if (value) focus();
		else blur();
	});
}
function useEvent(fieldRef, state, props$26, trigger, triggerInput, beforeInput) {
	function checkSelection() {
		const field = fieldRef.value;
		if (field && state.focus && state.selectionStart > -1 && state.selectionEnd > -1 && field.type !== "number") {
			field.selectionStart = state.selectionStart;
			field.selectionEnd = state.selectionEnd;
		}
	}
	function checkCursor() {
		const field = fieldRef.value;
		if (field && state.focus && state.selectionStart < 0 && state.selectionEnd < 0 && state.cursor > -1 && field.type !== "number") field.selectionEnd = field.selectionStart = state.cursor;
	}
	function getFieldSelectionEnd(field) {
		if (field.type === "number") return null;
		else return field.selectionEnd;
	}
	function initField() {
		const field = fieldRef.value;
		if (!field) return;
		const onFocus = function(event) {
			state.focus = true;
			trigger("focus", event, { value: state.value });
			checkSelection();
			checkCursor();
		};
		const onInput = function(event, force) {
			event.stopPropagation();
			if ((0, __vue_shared.isFunction)(beforeInput) && beforeInput(event, state) === false) return;
			state.value = field.value;
			if (!state.composing || !props$26.ignoreCompositionEvent) triggerInput(event, {
				value: field.value,
				cursor: getFieldSelectionEnd(field)
			}, force);
		};
		const onBlur = function(event) {
			if (state.composing) {
				state.composing = false;
				onInput(event, true);
			}
			state.focus = false;
			trigger("blur", event, {
				value: state.value,
				cursor: getFieldSelectionEnd(event.target)
			});
		};
		field.addEventListener("change", (event) => event.stopPropagation());
		field.addEventListener("focus", onFocus);
		field.addEventListener("blur", onBlur);
		field.addEventListener("input", onInput);
		field.addEventListener("compositionstart", (event) => {
			event.stopPropagation();
			state.composing = true;
			_onComposition(event);
		});
		field.addEventListener("compositionend", (event) => {
			event.stopPropagation();
			if (state.composing) {
				state.composing = false;
				onInput(event);
			}
			_onComposition(event);
		});
		field.addEventListener("compositionupdate", _onComposition);
		function _onComposition(event) {
			if (!props$26.ignoreCompositionEvent) trigger(event.type, event, { value: event.data });
		}
	}
	(0, vue.watch)([() => state.selectionStart, () => state.selectionEnd], checkSelection);
	(0, vue.watch)(() => state.cursor, checkCursor);
	(0, vue.watch)(() => fieldRef.value, initField);
}
function useField(props$26, rootRef, emit$2, beforeInput) {
	UniViewJSBridgeSubscribe();
	const { fieldRef, state, trigger } = useBase(props$26, rootRef, emit$2);
	const { triggerInput } = useValueSync(props$26, state, emit$2, trigger, fieldRef);
	useAutoFocus(props$26, fieldRef);
	useKeyboard$1(props$26, fieldRef, trigger);
	const { state: scopedAttrsState } = useScopedAttrs();
	useFormField("name", state);
	useEvent(fieldRef, state, props$26, trigger, triggerInput, beforeInput);
	return {
		fieldRef,
		state,
		scopedAttrsState,
		fixDisabledColor: false,
		trigger
	};
}
var resolveDigitDecimalPointDeleteContentBackward = (0, __dcloudio_uni_shared.once)(() => {});
function resolveDigitDecimalPoint(event, cache, state, input, resetCache) {
	if (cache.value) {
		if (event.data === ".") {
			if (cache.value.slice(-1) === ".") {
				state.value = input.value = cache.value = cache.value.slice(0, -1);
				return false;
			}
			if (cache.value && !cache.value.includes(".") && cache.value === input.value) {
				cache.value += ".";
				if (resetCache) {
					resetCache.fn = () => {
						state.value = input.value = cache.value = cache.value.slice(0, -1);
						input.removeEventListener("blur", resetCache.fn);
					};
					input.addEventListener("blur", resetCache.fn);
				}
				return false;
			}
		} else if (event.inputType === "deleteContentBackward") {
			if (resolveDigitDecimalPointDeleteContentBackward()) {
				if (cache.value.slice(-2, -1) === ".") {
					cache.value = state.value = input.value = cache.value.slice(0, -2);
					return true;
				}
			}
		}
	}
}
var props$19 = /* @__PURE__ */ (0, __vue_shared.extend)({}, props$9, {
	placeholderClass: {
		type: String,
		default: "input-placeholder"
	},
	textContentType: {
		type: String,
		default: ""
	}
});
function isPaste(event) {
	return event.inputType === "insertFromPaste";
}
function useCache(props$26, type) {
	if (type.value === "number") {
		const value = typeof props$26.modelValue === "undefined" ? props$26.value : props$26.modelValue;
		const cache = (0, vue.ref)(typeof value !== "undefined" && value !== null ? value.toLocaleString() : "");
		(0, vue.watch)(() => props$26.modelValue, (value$1) => {
			cache.value = typeof value$1 !== "undefined" && value$1 !== null ? value$1.toLocaleString() : "";
		});
		(0, vue.watch)(() => props$26.value, (value$1) => {
			cache.value = typeof value$1 !== "undefined" && value$1 !== null ? value$1.toLocaleString() : "";
		});
		return cache;
	} else return (0, vue.ref)("");
}
var input_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Input",
	props: props$19,
	emits: ["confirm", ...emit],
	setup(props$26, { emit: emit$2, expose }) {
		const INPUT_TYPES = [
			"text",
			"number",
			"idcard",
			"digit",
			"password",
			"tel"
		];
		const AUTOCOMPLETES = ["off", "one-time-code"];
		const type = (0, vue.computed)(() => {
			let type$1 = "";
			switch (props$26.type) {
				case "text":
					type$1 = "text";
					if (props$26.confirmType === "search") type$1 = "search";
					break;
				case "idcard":
					type$1 = "text";
					break;
				case "digit":
					type$1 = "number";
					break;
				case "none":
					type$1 = "text";
					break;
				default:
					type$1 = INPUT_TYPES.includes(props$26.type) ? props$26.type : "text";
					break;
			}
			return props$26.password ? "password" : type$1;
		});
		const autocomplete = (0, vue.computed)(() => {
			const camelizeIndex = AUTOCOMPLETES.indexOf(props$26.textContentType);
			const kebabCaseIndex = AUTOCOMPLETES.indexOf((0, __vue_shared.hyphenate)(props$26.textContentType));
			return AUTOCOMPLETES[camelizeIndex !== -1 ? camelizeIndex : kebabCaseIndex !== -1 ? kebabCaseIndex : 0];
		});
		const inputmode = (0, vue.computed)(() => {
			if (props$26.inputmode !== void 0) return props$26.inputmode;
			if (INPUT_MODES.includes(props$26.type)) return props$26.type;
			return {
				number: "numeric",
				digit: "decimal",
				idcard: "text"
			}[props$26.type];
		});
		let cache = useCache(props$26, type);
		let resetCache = { fn: null };
		const rootRef = (0, vue.ref)(null);
		const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } = useField(props$26, rootRef, emit$2, (event, state$1) => {
			const input = event.target;
			if (type.value === "number") {
				if (resetCache.fn) {
					input.removeEventListener("blur", resetCache.fn);
					resetCache.fn = null;
				}
				if (input.validity && !input.validity.valid) {
					if ((!cache.value || !input.value) && event.data === "-" || cache.value[0] === "-" && event.inputType === "deleteContentBackward") {
						cache.value = "-";
						state$1.value = "";
						resetCache.fn = () => {
							cache.value = input.value = "";
						};
						input.addEventListener("blur", resetCache.fn);
						return false;
					}
					const res = resolveDigitDecimalPoint(event, cache, state$1, input, resetCache);
					if (typeof res === "boolean") return res;
					cache.value = state$1.value = input.value = cache.value === "-" ? "" : cache.value;
					return false;
				} else {
					const res = resolveDigitDecimalPoint(event, cache, state$1, input, resetCache);
					if (typeof res === "boolean") return res;
					cache.value = input.value;
				}
				if (state$1.maxlength > 0 && input.value.length > state$1.maxlength && !isPaste(event)) {
					input.value = cache.value = state$1.value;
					return false;
				}
			}
		});
		(0, vue.watch)(() => state.value, (value) => {
			if (props$26.type === "number" && !(cache.value === "-" && value === "")) cache.value = value.toString();
		});
		(0, vue.watch)(() => props$26.maxlength, (length) => {
			length = parseInt(length, 10);
			const realValue = state.value.slice(0, length);
			realValue !== state.value && (state.value = realValue);
		});
		const NUMBER_TYPES = ["number", "digit"];
		const step = (0, vue.computed)(() => NUMBER_TYPES.includes(props$26.type) ? props$26.step : "");
		function onKeyUpEnter(event) {
			if (event.key !== "Enter") return;
			const input = event.target;
			event.stopPropagation();
			trigger("confirm", event, { value: input.value });
			!props$26.confirmHold && input.blur();
		}
		expose({ $triggerInput: (detail) => {
			emit$2("update:modelValue", detail.value);
			emit$2("update:value", detail.value);
			state.value = detail.value;
		} });
		return () => {
			let inputNode = props$26.disabled && fixDisabledColor ? (0, vue.createVNode)("input", {
				"key": "disabled-input",
				"ref": fieldRef,
				"value": state.value,
				"tabindex": "-1",
				"readonly": !!props$26.disabled,
				"type": type.value,
				"maxlength": state.maxlength,
				"step": step.value,
				"class": "uni-input-input",
				"style": props$26.cursorColor ? { caretColor: props$26.cursorColor } : {},
				"inputmode": inputmode.value,
				"onFocus": (event) => event.target.blur()
			}, null, 44, [
				"value",
				"readonly",
				"type",
				"maxlength",
				"step",
				"inputmode",
				"onFocus"
			]) : (0, vue.createVNode)("input", {
				"key": "input",
				"ref": fieldRef,
				"value": state.value,
				"onInput": (0, vue.withModifiers)((event) => {
					const value = event.target.value.toString();
					if (type.value === "number" && state.maxlength > 0 && value.length > state.maxlength) {
						if (isPaste(event)) state.value = value.slice(0, state.maxlength);
						return;
					}
					if (value.length === 0 && event.inputType === "insertText" && event.data === ".") return;
					state.value = value;
				}, ["stop"]),
				"disabled": !!props$26.disabled,
				"type": type.value,
				"maxlength": state.maxlength,
				"step": step.value,
				"enterkeyhint": props$26.confirmType,
				"pattern": props$26.type === "number" ? "[0-9]*" : void 0,
				"class": "uni-input-input",
				"style": props$26.cursorColor ? { caretColor: props$26.cursorColor } : {},
				"autocomplete": autocomplete.value,
				"onKeyup": onKeyUpEnter,
				"inputmode": inputmode.value
			}, null, 44, [
				"value",
				"onInput",
				"disabled",
				"type",
				"maxlength",
				"step",
				"enterkeyhint",
				"pattern",
				"autocomplete",
				"onKeyup",
				"inputmode"
			]);
			return (0, vue.createVNode)("uni-input", { "ref": rootRef }, [(0, vue.createVNode)("div", { "class": "uni-input-wrapper" }, [(0, vue.withDirectives)((0, vue.createVNode)("div", (0, vue.mergeProps)(scopedAttrsState.attrs, {
				"style": props$26.placeholderStyle,
				"class": ["uni-input-placeholder", props$26.placeholderClass]
			}), [props$26.placeholder], 16), [[vue.vShow, !(state.value.length || cache.value === "-" || cache.value.includes("."))]]), props$26.confirmType === "search" ? (0, vue.createVNode)("form", {
				"action": "",
				"onSubmit": (event) => event.preventDefault(),
				"class": "uni-input-form"
			}, [inputNode], 40, ["onSubmit"]) : inputNode])], 512);
		};
	}
});
function entries(obj) {
	return Object.keys(obj).map((key) => [key, obj[key]]);
}
var DEFAULT_EXCLUDE_KEYS = ["class", "style"];
var LISTENER_PREFIX = /^on[A-Z]+/;
const useAttrs = (params = {}) => {
	const { excludeListeners = false, excludeKeys = [] } = params;
	const instance$1 = (0, vue.getCurrentInstance)();
	const attrs$1 = (0, vue.shallowRef)({});
	const listeners = (0, vue.shallowRef)({});
	const excludeAttrs = (0, vue.shallowRef)({});
	const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
	instance$1.attrs = (0, vue.reactive)(instance$1.attrs);
	(0, vue.watchEffect)(() => {
		const res = entries(instance$1.attrs).reduce((acc, [key, val]) => {
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
		attrs$1.value = res.attrs;
		listeners.value = res.listeners;
		excludeAttrs.value = res.exclude;
	});
	return {
		$attrs: attrs$1,
		$listeners: listeners,
		$excludeAttrs: excludeAttrs
	};
};
function disableScrollBounce({ disable }) {}
function flatVNode(nodes) {
	const array = [];
	if ((0, __vue_shared.isArray)(nodes)) nodes.forEach((vnode) => {
		if ((0, vue.isVNode)(vnode)) if (vnode.type === vue.Fragment) array.push(...flatVNode(vnode.children));
		else array.push(vnode);
		else if ((0, __vue_shared.isArray)(vnode)) array.push(...flatVNode(vnode));
	});
	return array;
}
const movableAreaProps = { scaleArea: {
	type: Boolean,
	default: false
} };
var movable_area_default = /* @__PURE__ */ defineBuiltInComponent({
	inheritAttrs: false,
	name: "MovableArea",
	props: movableAreaProps,
	setup(props$26, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const _isMounted = (0, vue.ref)(false);
		let { setContexts, events: movableAreaEvents } = useMovableAreaState(props$26, rootRef);
		const { $listeners, $attrs, $excludeAttrs } = useAttrs();
		const _listeners = $listeners.value;
		[
			"onTouchstart",
			"onTouchmove",
			"onTouchend"
		].forEach((event) => {
			let existing = _listeners[event];
			let ours = movableAreaEvents[`_${event}`];
			_listeners[event] = existing ? [].concat(existing, ours) : ours;
		});
		let movableViewItems = [];
		const originMovableViewContexts = [];
		function updateMovableViewContexts() {
			const contexts = [];
			for (let index$1 = 0; index$1 < movableViewItems.length; index$1++) {
				let movableViewItem = movableViewItems[index$1];
				movableViewItem = movableViewItem.el;
				const movableViewContext = originMovableViewContexts.find((context) => movableViewItem === context.rootRef.value);
				if (movableViewContext) contexts.push((0, vue.markRaw)(movableViewContext));
			}
			setContexts(contexts);
		}
		const addMovableViewContext = (movableViewContext) => {
			originMovableViewContexts.push(movableViewContext);
			updateMovableViewContexts();
		};
		const removeMovableViewContext = (movableViewContext) => {
			const index$1 = originMovableViewContexts.indexOf(movableViewContext);
			if (index$1 >= 0) {
				originMovableViewContexts.splice(index$1, 1);
				updateMovableViewContexts();
			}
		};
		(0, vue.provide)("_isMounted", _isMounted);
		(0, vue.provide)("movableAreaRootRef", rootRef);
		(0, vue.provide)("addMovableViewContext", addMovableViewContext);
		(0, vue.provide)("removeMovableViewContext", removeMovableViewContext);
		return () => {
			movableViewItems = flatVNode(slots.default && slots.default());
			return (0, vue.createVNode)("uni-movable-area", (0, vue.mergeProps)({ "ref": rootRef }, $attrs.value, $excludeAttrs.value, _listeners), [(0, vue.createVNode)(resize_sensor_default, { "onResize": movableAreaEvents._resize }, null, 8, ["onResize"]), movableViewItems], 16);
		};
	}
});
function calc(e$1) {
	return Math.sqrt(e$1.x * e$1.x + e$1.y * e$1.y);
}
function useMovableAreaState(props$26, rootRef) {
	const width = (0, vue.ref)(0);
	const height = (0, vue.ref)(0);
	const gapV = (0, vue.reactive)({
		x: null,
		y: null
	});
	const pinchStartLen = (0, vue.ref)(null);
	let _scaleMovableView = null;
	let movableViewContexts = [];
	function _updateScale(e$1) {
		if (e$1 && e$1 !== 1) {
			if (props$26.scaleArea) movableViewContexts.forEach(function(item) {
				item._setScale(e$1);
			});
			else if (_scaleMovableView) _scaleMovableView._setScale(e$1);
		}
	}
	function _find(target, items = movableViewContexts) {
		let root = rootRef.value;
		function get(node) {
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				if (node === item.rootRef.value) return item;
			}
			if (node === root || node === document.body || node === document) return null;
			return get(node.parentNode);
		}
		return get(target);
	}
	const _onTouchstart = withWebEvent((t$1) => {
		disableScrollBounce({ disable: true });
		let i = t$1.touches;
		if (i) {
			if (i.length > 1) {
				let r = {
					x: i[1].pageX - i[0].pageX,
					y: i[1].pageY - i[0].pageY
				};
				pinchStartLen.value = calc(r);
				gapV.x = r.x;
				gapV.y = r.y;
				if (!props$26.scaleArea) {
					let touch0 = _find(i[0].target);
					let touch1 = _find(i[1].target);
					_scaleMovableView = touch0 && touch0 === touch1 ? touch0 : null;
				}
			}
		}
	});
	const _onTouchmove = withWebEvent((t$1) => {
		let n = t$1.touches;
		if (n) {
			if (n.length > 1) {
				t$1.preventDefault();
				let i = {
					x: n[1].pageX - n[0].pageX,
					y: n[1].pageY - n[0].pageY
				};
				if (gapV.x !== null && pinchStartLen.value && pinchStartLen.value > 0) _updateScale(calc(i) / pinchStartLen.value);
				gapV.x = i.x;
				gapV.y = i.y;
			}
		}
	});
	const _onTouchend = withWebEvent((e$1) => {
		disableScrollBounce({ disable: false });
		let t$1 = e$1.touches;
		if (!(t$1 && t$1.length)) {
			if (e$1.changedTouches) {
				gapV.x = 0;
				gapV.y = 0;
				pinchStartLen.value = null;
				if (props$26.scaleArea) movableViewContexts.forEach(function(item) {
					item._endScale();
				});
				else if (_scaleMovableView) _scaleMovableView._endScale();
			}
		}
	});
	function _resize() {
		_getWH();
		movableViewContexts.forEach(function(item, index$1) {
			item.setParent();
		});
	}
	function _getWH() {
		let style = window.getComputedStyle(rootRef.value);
		let rect = rootRef.value.getBoundingClientRect();
		width.value = rect.width - ["Left", "Right"].reduce(function(all, item) {
			const LEFT = "border" + item + "Width";
			const RIGHT = "padding" + item;
			return all + parseFloat(style[LEFT]) + parseFloat(style[RIGHT]);
		}, 0);
		height.value = rect.height - ["Top", "Bottom"].reduce(function(all, item) {
			const TOP = "border" + item + "Width";
			const BOTTOM = "padding" + item;
			return all + parseFloat(style[TOP]) + parseFloat(style[BOTTOM]);
		}, 0);
	}
	(0, vue.provide)("movableAreaWidth", width);
	(0, vue.provide)("movableAreaHeight", height);
	return {
		setContexts(contexts) {
			movableViewContexts = contexts;
		},
		events: {
			_onTouchstart,
			_onTouchmove,
			_onTouchend,
			_resize
		}
	};
}
function e(e$1, t$1, n) {
	return e$1 > t$1 - n && e$1 < t$1 + n;
}
function t(t$1, n) {
	return e(t$1, 0, n);
}
function Decline() {}
Decline.prototype.x = function(e$1) {
	return Math.sqrt(e$1);
};
function Friction(e$1, t$1) {
	this._m = e$1;
	this._f = 1e3 * t$1;
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
Friction.prototype.s = function(t$1) {
	if (void 0 === t$1) t$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	if (t$1 > this._t) {
		t$1 = this._t;
		this._lastDt = t$1;
	}
	let x = this._x_v * t$1 + .5 * this._x_a * Math.pow(t$1, 2) + this._x_s;
	let y = this._y_v * t$1 + .5 * this._y_a * Math.pow(t$1, 2) + this._y_s;
	if (this._x_a > 0 && x < this._endPositionX || this._x_a < 0 && x > this._endPositionX) x = this._endPositionX;
	if (this._y_a > 0 && y < this._endPositionY || this._y_a < 0 && y > this._endPositionY) y = this._endPositionY;
	return {
		x,
		y
	};
};
Friction.prototype.ds = function(t$1) {
	if (void 0 === t$1) t$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	if (t$1 > this._t) t$1 = this._t;
	return {
		dx: this._x_v + this._x_a * t$1,
		dy: this._y_v + this._y_a * t$1
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
	const t$1 = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
	this._lastDt = null;
	return t$1;
};
Friction.prototype.setEnd = function(x, y) {
	this._endPositionX = x;
	this._endPositionY = y;
};
Friction.prototype.reconfigure = function(m, f$1) {
	this._m = m;
	this._f = 1e3 * f$1;
};
function Spring(m, k, c) {
	this._m = m;
	this._k = k;
	this._c = c;
	this._solution = null;
	this._endPosition = 0;
	this._startTime = 0;
}
Spring.prototype._solve = function(e$1, t$1) {
	const n = this._c;
	const i = this._m;
	const r = this._k;
	const o = n * n - 4 * i * r;
	if (o === 0) {
		const a = -n / (2 * i);
		const s = e$1;
		const l = t$1 / (a * e$1);
		return {
			x: function(e$2) {
				return (s + l * e$2) * Math.pow(Math.E, a * e$2);
			},
			dx: function(e$2) {
				const t$2 = Math.pow(Math.E, a * e$2);
				return a * (s + l * e$2) * t$2 + l * t$2;
			}
		};
	}
	if (o > 0) {
		const c = (-n - Math.sqrt(o)) / (2 * i);
		const u = (-n + Math.sqrt(o)) / (2 * i);
		const d = (t$1 - c * e$1) / (u - c);
		const h$2 = e$1 - d;
		return {
			x: function(e$2) {
				let t$2;
				let n$1;
				if (e$2 === this._t) {
					t$2 = this._powER1T;
					n$1 = this._powER2T;
				}
				this._t = e$2;
				if (!t$2) t$2 = this._powER1T = Math.pow(Math.E, c * e$2);
				if (!n$1) n$1 = this._powER2T = Math.pow(Math.E, u * e$2);
				return h$2 * t$2 + d * n$1;
			},
			dx: function(e$2) {
				let t$2;
				let n$1;
				if (e$2 === this._t) {
					t$2 = this._powER1T;
					n$1 = this._powER2T;
				}
				this._t = e$2;
				if (!t$2) t$2 = this._powER1T = Math.pow(Math.E, c * e$2);
				if (!n$1) n$1 = this._powER2T = Math.pow(Math.E, u * e$2);
				return h$2 * c * t$2 + d * u * n$1;
			}
		};
	}
	const p$1 = Math.sqrt(4 * i * r - n * n) / (2 * i);
	const f$1 = -n / 2 * i;
	const v$1 = e$1;
	const g$1 = (t$1 - f$1 * e$1) / p$1;
	return {
		x: function(e$2) {
			return Math.pow(Math.E, f$1 * e$2) * (v$1 * Math.cos(p$1 * e$2) + g$1 * Math.sin(p$1 * e$2));
		},
		dx: function(e$2) {
			const t$2 = Math.pow(Math.E, f$1 * e$2);
			const n$1 = Math.cos(p$1 * e$2);
			const i$1 = Math.sin(p$1 * e$2);
			return t$2 * (g$1 * p$1 * n$1 - v$1 * p$1 * i$1) + f$1 * t$2 * (g$1 * i$1 + v$1 * n$1);
		}
	};
};
Spring.prototype.x = function(e$1) {
	if (void 0 === e$1) e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return this._solution ? this._endPosition + this._solution.x(e$1) : 0;
};
Spring.prototype.dx = function(e$1) {
	if (void 0 === e$1) e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return this._solution ? this._solution.dx(e$1) : 0;
};
Spring.prototype.setEnd = function(e$1, n, i) {
	if (!i) i = (/* @__PURE__ */ new Date()).getTime();
	if (e$1 !== this._endPosition || !t(n, .1)) {
		n = n || 0;
		let r = this._endPosition;
		if (this._solution) {
			if (t(n, .1)) n = this._solution.dx((i - this._startTime) / 1e3);
			r = this._solution.x((i - this._startTime) / 1e3);
			if (t(n, .1)) n = 0;
			if (t(r, .1)) r = 0;
			r += this._endPosition;
		}
		if (!(this._solution && t(r - e$1, .1) && t(n, .1))) {
			this._endPosition = e$1;
			this._solution = this._solve(r - this._endPosition, n);
			this._startTime = i;
		}
	}
};
Spring.prototype.snap = function(e$1) {
	this._startTime = (/* @__PURE__ */ new Date()).getTime();
	this._endPosition = e$1;
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
Spring.prototype.reconfigure = function(m, t$1, c) {
	this._m = m;
	this._k = t$1;
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
	function e$1(e$2, t$2) {
		e$2.reconfigure(1, t$2, e$2.damping());
	}
	function t$1(e$2, t$2) {
		e$2.reconfigure(1, e$2.springConstant(), t$2);
	}
	return [{
		label: "Spring Constant",
		read: this.springConstant.bind(this),
		write: e$1.bind(this, this),
		min: 100,
		max: 1e3
	}, {
		label: "Damping",
		read: this.damping.bind(this),
		write: t$1.bind(this, this),
		min: 1,
		max: 500
	}];
};
function STD(e$1, t$1, n) {
	this._springX = new Spring(e$1, t$1, n);
	this._springY = new Spring(e$1, t$1, n);
	this._springScale = new Spring(e$1, t$1, n);
	this._startTime = 0;
}
STD.prototype.setEnd = function(e$1, t$1, n, i) {
	const r = (/* @__PURE__ */ new Date()).getTime();
	this._springX.setEnd(e$1, i, r);
	this._springY.setEnd(t$1, i, r);
	this._springScale.setEnd(n, i, r);
	this._startTime = r;
};
STD.prototype.x = function() {
	const e$1 = (/* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return {
		x: this._springX.x(e$1),
		y: this._springY.x(e$1),
		scale: this._springScale.x(e$1)
	};
};
STD.prototype.done = function() {
	const e$1 = (/* @__PURE__ */ new Date()).getTime();
	return this._springX.done(e$1) && this._springY.done(e$1) && this._springScale.done(e$1);
};
STD.prototype.reconfigure = function(e$1, t$1, n) {
	this._springX.reconfigure(e$1, t$1, n);
	this._springY.reconfigure(e$1, t$1, n);
	this._springScale.reconfigure(e$1, t$1, n);
};
const movableViewProps = {
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
var movable_view_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "MovableView",
	props: movableViewProps,
	emits: ["change", "scale"],
	setup(props$26, { slots, emit: emit$2 }) {
		const rootRef = (0, vue.ref)(null);
		const { setParent } = useMovableViewState(props$26, useCustomEvent(rootRef, emit$2), rootRef);
		return () => {
			return (0, vue.createVNode)("uni-movable-view", { "ref": rootRef }, [(0, vue.createVNode)(resize_sensor_default, { "onResize": setParent }, null, 8, ["onResize"]), slots.default && slots.default()], 512);
		};
	}
});
var requesting = false;
function _requestAnimationFrame(e$1) {
	if (!requesting) {
		requesting = true;
		requestAnimationFrame(function() {
			e$1();
			requesting = false;
		});
	}
}
function p(t$1, n) {
	if (t$1 === n) return 0;
	let i = t$1.offsetLeft;
	return t$1.offsetParent ? i += p(t$1.offsetParent, n) : 0;
}
function f(t$1, n) {
	if (t$1 === n) return 0;
	let i = t$1.offsetTop;
	return t$1.offsetParent ? i += f(t$1.offsetParent, n) : 0;
}
function g(friction, execute, endCallback) {
	let record = {
		id: 0,
		cancelled: false
	};
	let cancel = function(record$1) {
		if (record$1 && record$1.id) cancelAnimationFrame(record$1.id);
		if (record$1) record$1.cancelled = true;
	};
	function fn(record$1, friction$1, execute$1, endCallback$1) {
		if (!record$1 || !record$1.cancelled) {
			execute$1(friction$1);
			let isDone = friction$1.done();
			if (!isDone) {
				if (!record$1.cancelled) record$1.id = requestAnimationFrame(fn.bind(null, record$1, friction$1, execute$1, endCallback$1));
			}
			if (isDone && endCallback$1) endCallback$1(friction$1);
		}
	}
	fn(record, friction, execute, endCallback);
	return {
		cancel: cancel.bind(null, record),
		model: friction
	};
}
function _getPx(val) {
	if (/\d+[ur]px$/i.test(val)) return uni.upx2px(parseFloat(val));
	return Number(val) || 0;
}
function useMovableViewLayout(rootRef, _scale, _adjustScale) {
	const movableAreaWidth = (0, vue.inject)("movableAreaWidth", (0, vue.ref)(0));
	const movableAreaHeight = (0, vue.inject)("movableAreaHeight", (0, vue.ref)(0));
	const movableAreaRootRef = (0, vue.inject)("movableAreaRootRef");
	const _offset = {
		x: 0,
		y: 0
	};
	const _scaleOffset = {
		x: 0,
		y: 0
	};
	const width = (0, vue.ref)(0);
	const height = (0, vue.ref)(0);
	const minX = (0, vue.ref)(0);
	const minY = (0, vue.ref)(0);
	const maxX = (0, vue.ref)(0);
	const maxY = (0, vue.ref)(0);
	function _updateBoundary() {
		let x = 0 - _offset.x + _scaleOffset.x;
		let _width = movableAreaWidth.value - width.value - _offset.x - _scaleOffset.x;
		minX.value = Math.min(x, _width);
		maxX.value = Math.max(x, _width);
		let y = 0 - _offset.y + _scaleOffset.y;
		let _height = movableAreaHeight.value - height.value - _offset.y - _scaleOffset.y;
		minY.value = Math.min(y, _height);
		maxY.value = Math.max(y, _height);
	}
	function _updateOffset() {
		_offset.x = p(rootRef.value, movableAreaRootRef.value);
		_offset.y = f(rootRef.value, movableAreaRootRef.value);
	}
	function _updateWH(scale) {
		scale = scale || _scale.value;
		scale = _adjustScale(scale);
		let rect = rootRef.value.getBoundingClientRect();
		height.value = rect.height / _scale.value;
		width.value = rect.width / _scale.value;
		let _height = height.value * scale;
		_scaleOffset.x = (width.value * scale - width.value) / 2;
		_scaleOffset.y = (_height - height.value) / 2;
	}
	return {
		_updateBoundary,
		_updateOffset,
		_updateWH,
		_scaleOffset,
		minX,
		minY,
		maxX,
		maxY
	};
}
function useMovableViewTransform(rootRef, props$26, _scaleOffset, _scale, maxX, maxY, minX, minY, _translateX, _translateY, _SFA, _FA, _adjustScale, trigger) {
	const dampingNumber = (0, vue.computed)(() => {
		let val = Number(props$26.damping);
		return isNaN(val) ? 20 : val;
	});
	const xMove = (0, vue.computed)(() => props$26.direction === "all" || props$26.direction === "horizontal");
	const yMove = (0, vue.computed)(() => props$26.direction === "all" || props$26.direction === "vertical");
	const xSync = (0, vue.ref)(_getPx(props$26.x));
	const ySync = (0, vue.ref)(_getPx(props$26.y));
	(0, vue.watch)(() => props$26.x, (val) => {
		xSync.value = _getPx(val);
	});
	(0, vue.watch)(() => props$26.y, (val) => {
		ySync.value = _getPx(val);
	});
	(0, vue.watch)(xSync, (val) => {
		_setX(val);
	});
	(0, vue.watch)(ySync, (val) => {
		_setY(val);
	});
	const _STD = new STD(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
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
	function FAandSFACancel() {
		if (_FA) _FA.cancel();
		if (_SFA) _SFA.cancel();
	}
	function _animationTo(x, y, scale, source, r, o) {
		FAandSFACancel();
		if (!xMove.value) x = _translateX.value;
		if (!yMove.value) y = _translateY.value;
		if (!props$26.scale) scale = _scale.value;
		let limitXY = _getLimitXY(x, y);
		x = limitXY.x;
		y = limitXY.y;
		if (!props$26.animation) {
			_setTransform(x, y, scale, source, r, o);
			return;
		}
		_STD._springX._solution = null;
		_STD._springY._solution = null;
		_STD._springScale._solution = null;
		_STD._springX._endPosition = _translateX.value;
		_STD._springY._endPosition = _translateY.value;
		_STD._springScale._endPosition = _scale.value;
		_STD.setEnd(x, y, scale, 1);
		_SFA = g(_STD, function() {
			let data = _STD.x();
			let x$1 = data.x;
			let y$1 = data.y;
			let scale$1 = data.scale;
			_setTransform(x$1, y$1, scale$1, source, r, o);
		}, function() {
			_SFA.cancel();
		});
	}
	function _setTransform(x, y, scale, source = "", r, o) {
		if (!(x !== null && x.toString() !== "NaN" && typeof x === "number")) x = _translateX.value || 0;
		if (!(y !== null && y.toString() !== "NaN" && typeof y === "number")) y = _translateY.value || 0;
		x = Number(x.toFixed(1));
		y = Number(y.toFixed(1));
		scale = Number(scale.toFixed(1));
		if (!(_translateX.value === x && _translateY.value === y)) {
			if (!r) trigger("change", {}, {
				x: v(x, _scaleOffset.x),
				y: v(y, _scaleOffset.y),
				source
			});
		}
		if (!props$26.scale) scale = _scale.value;
		scale = _adjustScale(scale);
		scale = +scale.toFixed(3);
		if (o && scale !== _scale.value) trigger("scale", {}, {
			x,
			y,
			scale
		});
		let transform = "translateX(" + x + "px) translateY(" + y + "px) translateZ(0px) scale(" + scale + ")";
		if (rootRef.value) {
			rootRef.value.style.transform = transform;
			rootRef.value.style.webkitTransform = transform;
			_translateX.value = x;
			_translateY.value = y;
			_scale.value = scale;
		}
	}
	function _revise(source) {
		let limitXY = _getLimitXY(_translateX.value, _translateY.value);
		let x = limitXY.x;
		let y = limitXY.y;
		let outOfBounds = limitXY.outOfBounds;
		if (outOfBounds) _animationTo(x, y, _scale.value, source);
		return outOfBounds;
	}
	function _setX(val) {
		if (xMove.value) if (val + _scaleOffset.x === _translateX.value) return _translateX;
		else {
			if (_SFA) _SFA.cancel();
			_animationTo(val + _scaleOffset.x, ySync.value + _scaleOffset.y, _scale.value);
		}
		return val;
	}
	function _setY(val) {
		if (yMove.value) if (val + _scaleOffset.y === _translateY.value) return _translateY;
		else {
			if (_SFA) _SFA.cancel();
			_animationTo(xSync.value + _scaleOffset.x, val + _scaleOffset.y, _scale.value);
		}
		return val;
	}
	return {
		FAandSFACancel,
		_getLimitXY,
		_animationTo,
		_setTransform,
		_revise,
		dampingNumber,
		xMove,
		yMove,
		xSync,
		ySync,
		_STD
	};
}
function useMovableViewInit(props$26, rootRef, trigger, _scale, _oldScale, _isScaling, _translateX, _translateY, _SFA, _FA) {
	const scaleMinNumber = (0, vue.computed)(() => {
		let val = Number(props$26.scaleMin);
		return isNaN(val) ? .1 : val;
	});
	const scaleMaxNumber = (0, vue.computed)(() => {
		let val = Number(props$26.scaleMax);
		return isNaN(val) ? 10 : val;
	});
	const scaleValueSync = (0, vue.ref)(Number(props$26.scaleValue) || 1);
	(0, vue.watch)(scaleValueSync, (val) => {
		_setScaleValue(val);
	});
	(0, vue.watch)(scaleMinNumber, () => {
		_setScaleMinOrMax();
	});
	(0, vue.watch)(scaleMaxNumber, () => {
		_setScaleMinOrMax();
	});
	(0, vue.watch)(() => props$26.scaleValue, (val) => {
		scaleValueSync.value = Number(val) || 0;
	});
	const { _updateBoundary, _updateOffset, _updateWH, _scaleOffset, minX, minY, maxX, maxY } = useMovableViewLayout(rootRef, _scale, _adjustScale);
	const { FAandSFACancel, _getLimitXY, _animationTo, _setTransform, _revise, dampingNumber, xMove, yMove, xSync, ySync, _STD } = useMovableViewTransform(rootRef, props$26, _scaleOffset, _scale, maxX, maxY, minX, minY, _translateX, _translateY, _SFA, _FA, _adjustScale, trigger);
	function _updateScale(scale, animat) {
		if (props$26.scale) {
			scale = _adjustScale(scale);
			_updateWH(scale);
			_updateBoundary();
			const limitXY = _getLimitXY(_translateX.value, _translateY.value);
			const x = limitXY.x;
			const y = limitXY.y;
			if (animat) _animationTo(x, y, scale, "", true, true);
			else _requestAnimationFrame(function() {
				_setTransform(x, y, scale, "", true, true);
			});
		}
	}
	function _beginScale() {
		_isScaling.value = true;
	}
	function _updateOldScale(scale) {
		_oldScale.value = scale;
	}
	function _adjustScale(scale) {
		scale = Math.max(.1, scaleMinNumber.value, scale);
		scale = Math.min(10, scaleMaxNumber.value, scale);
		return scale;
	}
	function _setScaleMinOrMax() {
		if (!props$26.scale) return false;
		_updateScale(_scale.value, true);
		_updateOldScale(_scale.value);
	}
	function _setScaleValue(scale) {
		if (!props$26.scale) return false;
		scale = _adjustScale(scale);
		_updateScale(scale, true);
		_updateOldScale(scale);
		return scale;
	}
	function _endScale() {
		_isScaling.value = false;
		_updateOldScale(_scale.value);
	}
	function _setScale(scale) {
		if (scale) {
			scale = _oldScale.value * scale;
			_beginScale();
			_updateScale(scale);
		}
	}
	return {
		_updateOldScale,
		_endScale,
		_setScale,
		scaleValueSync,
		_updateBoundary,
		_updateOffset,
		_updateWH,
		_scaleOffset,
		minX,
		minY,
		maxX,
		maxY,
		FAandSFACancel,
		_getLimitXY,
		_animationTo,
		_setTransform,
		_revise,
		dampingNumber,
		xMove,
		yMove,
		xSync,
		ySync,
		_STD
	};
}
function useMovableViewState(props$26, trigger, rootRef) {
	const _isMounted = (0, vue.inject)("_isMounted", (0, vue.ref)(false));
	(0, vue.inject)("addMovableViewContext", () => {});
	(0, vue.inject)("removeMovableViewContext", () => {});
	let _scale = (0, vue.ref)(1);
	let _oldScale = (0, vue.ref)(1);
	let _isScaling = (0, vue.ref)(false);
	let _translateX = (0, vue.ref)(0);
	let _translateY = (0, vue.ref)(0);
	let _SFA = null;
	let _FA = null;
	new Decline();
	new Decline();
	const __touchInfo = {
		historyX: [0, 0],
		historyY: [0, 0],
		historyT: [0, 0]
	};
	new Friction(1, (0, vue.computed)(() => {
		let val = Number(props$26.friction);
		return isNaN(val) || val <= 0 ? 2 : val;
	}).value);
	(0, vue.watch)(() => props$26.disabled, () => {
		__handleTouchStart();
	});
	const { _updateOldScale, _endScale, _setScale, scaleValueSync, _updateBoundary, _updateOffset, _updateWH, _scaleOffset, minX, minY, maxX, maxY, FAandSFACancel, _getLimitXY, _setTransform, _revise, dampingNumber, xMove, yMove, xSync, ySync, _STD } = useMovableViewInit(props$26, rootRef, trigger, _scale, _oldScale, _isScaling, _translateX, _translateY, _SFA, _FA);
	function __handleTouchStart() {
		if (!_isScaling.value) {
			if (!props$26.disabled) {
				disableScrollBounce({ disable: true });
				FAandSFACancel();
				__touchInfo.historyX = [0, 0];
				__touchInfo.historyY = [0, 0];
				__touchInfo.historyT = [0, 0];
				if (xMove.value) _translateX.value;
				if (yMove.value) _translateY.value;
				rootRef.value.style.willChange = "transform";
			}
		}
	}
	function setParent() {
		if (!_isMounted.value) return;
		FAandSFACancel();
		let scale = props$26.scale ? scaleValueSync.value : 1;
		_updateOffset();
		_updateWH(scale);
		_updateBoundary();
		let limitXY = _getLimitXY(xSync.value + _scaleOffset.x, ySync.value + _scaleOffset.y);
		let x = limitXY.x;
		let y = limitXY.y;
		_setTransform(x, y, scale, "", true);
		_updateOldScale(scale);
	}
	return { setParent };
}
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
const navigatorProps = {
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
function createNavigatorOnClick(props$26) {
	return () => {
		if (props$26.openType !== "navigateBack" && !props$26.url) {
			console.error("<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab");
			return;
		}
		const animationDuration = parseInt(props$26.animationDuration);
		const onFail = (error) => {
			console.error(error.errMsg);
		};
		switch (props$26.openType) {
			case "navigate":
				uni.navigateTo({
					url: props$26.url,
					animationType: props$26.animationType || "pop-in",
					animationDuration,
					fail: onFail
				});
				break;
			case "redirect":
				uni.redirectTo({
					url: props$26.url,
					exists: props$26.exists,
					fail: onFail
				});
				break;
			case "switchTab":
				uni.switchTab({
					url: props$26.url,
					fail: onFail
				});
				break;
			case "reLaunch":
				uni.reLaunch({
					url: props$26.url,
					fail: onFail
				});
				break;
			case "navigateBack":
				uni.navigateBack({
					delta: props$26.delta,
					animationType: props$26.animationType || "pop-out",
					animationDuration,
					fail: onFail
				});
				break;
			default: break;
		}
	};
}
var navigator_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Navigator",
	inheritAttrs: false,
	compatConfig: { MODE: 3 },
	props: /* @__PURE__ */ (0, __vue_shared.extend)({}, navigatorProps, { renderLink: {
		type: Boolean,
		default: true
	} }),
	setup(props$26, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const vm = (0, vue.getCurrentInstance)();
		const __scopeId = vm && vm.vnode.scopeId || "";
		const { hovering, binding } = useHover(props$26);
		const onClick = createNavigatorOnClick(props$26);
		return () => {
			const { hoverClass, url } = props$26;
			const hasHoverClass = props$26.hoverClass && props$26.hoverClass !== "none";
			const innerNode = props$26.renderLink ? (0, vue.createVNode)("a", {
				"class": "navigator-wrap",
				"href": url,
				"onClick": onEventPrevent,
				"onMousedown": onEventPrevent
			}, [slots.default && slots.default()], 40, [
				"href",
				"onClick",
				"onMousedown"
			]) : slots.default && slots.default();
			return (0, vue.createVNode)("uni-navigator", (0, vue.mergeProps)({
				"class": hasHoverClass && hovering.value ? hoverClass : "",
				"ref": rootRef
			}, hasHoverClass && binding, vm ? vm.attrs : {}, { [__scopeId]: "" }, { "onClick": onClick }), [innerNode], 16, ["onClick"]);
		};
	}
});
const pickerViewProps = {
	value: {
		type: Array,
		default() {
			return [];
		},
		validator: function(val) {
			return (0, __vue_shared.isArray)(val) && val.filter((val$1) => typeof val$1 === "number").length === val.length;
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
};
function useState$2(props$26) {
	const state = (0, vue.reactive)({
		value: (0, vue.reactive)([...props$26.value]),
		height: 34
	});
	(0, vue.watch)(() => props$26.value, (val, oldVal) => {
		state.value.length = val.length;
		val.forEach((val$1, index$1) => {
			if (val$1 !== state.value[index$1]) state.value.splice(index$1, 1, val$1);
		});
	});
	return state;
}
var picker_view_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "PickerView",
	props: pickerViewProps,
	emits: [
		"change",
		"pickstart",
		"pickend",
		"update:value"
	],
	setup(props$26, { slots, emit: emit$2 }) {
		const rootRef = (0, vue.ref)(null);
		const wrapperRef = (0, vue.ref)(null);
		const trigger = useCustomEvent(rootRef, emit$2);
		const state = useState$2(props$26);
		const resizeSensorRef = (0, vue.ref)(null);
		let ColumnsPreRef = (0, vue.ref)([]);
		let columnsRef = (0, vue.ref)([]);
		function getItemIndex(vnode) {
			let columnVNodes = columnsRef.value;
			columnVNodes = columnVNodes.filter((vnode$1) => vnode$1.type !== vue.Comment);
			let index$1 = columnVNodes.indexOf(vnode);
			return index$1 !== -1 ? index$1 : ColumnsPreRef.value.indexOf(vnode);
		}
		const getPickerViewColumn = function(columnInstance) {
			return (0, vue.computed)({
				get() {
					const index$1 = getItemIndex(columnInstance.vnode);
					return state.value[index$1] || 0;
				},
				set(current) {
					const index$1 = getItemIndex(columnInstance.vnode);
					if (index$1 < 0) return;
					if (state.value[index$1] !== current) {
						state.value[index$1] = current;
						const value = state.value.map((val) => val);
						emit$2("update:value", value);
						trigger("change", {}, { value });
					}
				}
			});
		};
		(0, vue.provide)("getPickerViewColumn", getPickerViewColumn);
		(0, vue.provide)("pickerViewProps", props$26);
		(0, vue.provide)("pickerViewState", state);
		return () => {
			const defaultSlots = slots.default && slots.default();
			{
				const vnode = flatVNode(defaultSlots);
				ColumnsPreRef.value = vnode;
				(0, vue.nextTick)(() => {
					columnsRef.value = vnode;
				});
			}
			return (0, vue.createVNode)("uni-picker-view", { "ref": rootRef }, [(0, vue.createVNode)(resize_sensor_default, {
				"ref": resizeSensorRef,
				"onResize": ({ height }) => state.height = height
			}, null, 8, ["onResize"]), (0, vue.createVNode)("div", {
				"ref": wrapperRef,
				"class": "uni-picker-view-wrapper"
			}, [defaultSlots], 512)], 512);
		};
	}
});
var picker_view_column_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "PickerViewColumn",
	setup(props$26, { slots, emit: emit$2 }) {
		const rootRef = (0, vue.ref)(null);
		const contentRef = (0, vue.ref)(null);
		const getPickerViewColumn = (0, vue.inject)("getPickerViewColumn");
		const instance$1 = (0, vue.getCurrentInstance)();
		const currentRef = getPickerViewColumn ? getPickerViewColumn(instance$1) : (0, vue.ref)(0);
		const pickerViewProps$1 = (0, vue.inject)("pickerViewProps");
		const pickerViewState = (0, vue.inject)("pickerViewState");
		const indicatorHeight = (0, vue.ref)(34);
		const resizeSensorRef = (0, vue.ref)(null);
		const maskSize = (0, vue.computed)(() => (pickerViewState.height - indicatorHeight.value) / 2);
		const { state: scopedAttrsState } = useScopedAttrs();
		let scroller;
		const state = (0, vue.reactive)({
			current: currentRef.value,
			length: 0
		});
		function updatesScroller() {}
		(0, vue.watch)(() => currentRef.value, (current) => {
			if (current !== state.current) {
				state.current = current;
				updatesScroller();
			}
		});
		(0, vue.watch)(() => state.current, (current) => currentRef.value = current);
		(0, vue.watch)([
			() => indicatorHeight.value,
			() => state.length,
			() => pickerViewState.height
		], updatesScroller);
		let oldDeltaY = 0;
		function handleWheel(event) {
			const deltaY = oldDeltaY + event.deltaY;
			if (Math.abs(deltaY) > 10) {
				oldDeltaY = 0;
				let current = Math.min(state.current + (deltaY < 0 ? -1 : 1), state.length - 1);
				state.current = current = Math.max(current, 0);
				scroller.scrollTo(current * indicatorHeight.value);
			} else oldDeltaY = deltaY;
			event.preventDefault();
		}
		function handleTap({ clientY }) {
			const el = rootRef.value;
			if (!scroller.isScrolling()) {
				const r = clientY - el.getBoundingClientRect().top - pickerViewState.height / 2;
				const o = indicatorHeight.value / 2;
				if (!(Math.abs(r) <= o)) {
					const a = Math.ceil((Math.abs(r) - o) / indicatorHeight.value);
					const s = r < 0 ? -a : a;
					let current = Math.min(state.current + s, state.length - 1);
					state.current = current = Math.max(current, 0);
					scroller.scrollTo(current * indicatorHeight.value);
				}
			}
		}
		return () => {
			const defaultSlots = slots.default && slots.default();
			state.length = flatVNode(defaultSlots).length;
			const padding = `${maskSize.value}px 0`;
			return (0, vue.createVNode)("uni-picker-view-column", { "ref": rootRef }, [(0, vue.createVNode)("div", {
				"onWheel": handleWheel,
				"onClick": handleTap,
				"class": "uni-picker-view-group"
			}, [
				(0, vue.createVNode)("div", (0, vue.mergeProps)(scopedAttrsState.attrs, {
					"class": ["uni-picker-view-mask", pickerViewProps$1.maskClass],
					"style": `background-size: 100% ${maskSize.value}px;${pickerViewProps$1.maskStyle}`
				}), null, 16),
				(0, vue.createVNode)("div", (0, vue.mergeProps)(scopedAttrsState.attrs, {
					"class": ["uni-picker-view-indicator", pickerViewProps$1.indicatorClass],
					"style": pickerViewProps$1.indicatorStyle
				}), [(0, vue.createVNode)(resize_sensor_default, {
					"ref": resizeSensorRef,
					"onResize": ({ height }) => indicatorHeight.value = height
				}, null, 8, ["onResize"])], 16),
				(0, vue.createVNode)("div", {
					"ref": contentRef,
					"class": ["uni-picker-view-content"],
					"style": {
						padding,
						"--picker-view-column-indicator-height": `${indicatorHeight.value}px`
					}
				}, [defaultSlots], 4)
			], 40, ["onWheel", "onClick"])], 512);
		};
	}
});
var FONT_SIZE = 16;
const PROGRESS_VALUES = {
	activeColor: __dcloudio_uni_shared.PRIMARY_COLOR,
	backgroundColor: "#EBEBEB",
	activeMode: "backwards"
};
const progressProps = {
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
};
var progress_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Progress",
	props: progressProps,
	setup(props$26) {
		const rootRef = (0, vue.ref)(null);
		const state = useProgressState(props$26);
		_activeAnimation(state, props$26);
		(0, vue.watch)(() => state.realPercent, (newValue, oldValue) => {
			state.strokeTimer && clearInterval(state.strokeTimer);
			state.lastPercent = oldValue || 0;
			_activeAnimation(state, props$26);
		});
		return () => {
			const { showInfo } = props$26;
			const { outerBarStyle, innerBarStyle, currentPercent } = state;
			return (0, vue.createVNode)("uni-progress", {
				"class": "uni-progress",
				"ref": rootRef
			}, [(0, vue.createVNode)("div", {
				"style": outerBarStyle,
				"class": "uni-progress-bar"
			}, [(0, vue.createVNode)("div", {
				"style": innerBarStyle,
				"class": "uni-progress-inner-bar"
			}, null, 4)], 4), showInfo ? (0, vue.createVNode)("p", { "class": "uni-progress-info" }, [currentPercent + "%"]) : ""], 512);
		};
	}
});
function useProgressState(props$26) {
	const currentPercent = (0, vue.ref)(0);
	return (0, vue.reactive)({
		outerBarStyle: (0, vue.computed)(() => `background-color: ${props$26.backgroundColor}; height: ${rpx2px(props$26.strokeWidth)}px;`),
		innerBarStyle: (0, vue.computed)(() => {
			const backgroundColor = props$26.color !== PROGRESS_VALUES.activeColor && props$26.activeColor === PROGRESS_VALUES.activeColor ? props$26.color : props$26.activeColor;
			return `width: ${currentPercent.value}%;background-color: ${backgroundColor}`;
		}),
		realPercent: (0, vue.computed)(() => {
			if (typeof props$26.percent === "string" && !/^-?\d*\.?\d*$/.test(props$26.percent)) return 0;
			let realValue = parseFloat(props$26.percent);
			if (Number.isNaN(realValue) || realValue < 0) realValue = 0;
			else if (realValue > 100) realValue = 100;
			return realValue;
		}),
		currentPercent,
		strokeTimer: 0,
		lastPercent: 0
	});
}
function _activeAnimation(state, props$26) {
	if (props$26.active) {
		state.currentPercent = props$26.activeMode === PROGRESS_VALUES.activeMode ? 0 : state.lastPercent;
		state.strokeTimer = setInterval(() => {
			if (state.currentPercent + 1 > state.realPercent) {
				state.currentPercent = state.realPercent;
				state.strokeTimer && clearInterval(state.strokeTimer);
			} else state.currentPercent += 1;
		}, parseFloat(props$26.duration));
	} else state.currentPercent = state.realPercent;
}
const uniRadioGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniCheckGroup" : "ucg");
var props$18 = { name: {
	type: String,
	default: ""
} };
var radio_group_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "RadioGroup",
	props: props$18,
	setup(props$26, { emit: emit$2, slots }) {
		const rootRef = (0, vue.ref)(null);
		useProvideRadioGroup(props$26, useCustomEvent(rootRef, emit$2));
		return () => {
			return (0, vue.createVNode)("uni-radio-group", { "ref": rootRef }, [slots.default && slots.default()], 512);
		};
	}
});
function useProvideRadioGroup(props$26, trigger) {
	const fields$1 = [];
	const getFieldsValue = () => {
		var _fields$find;
		return (_fields$find = fields$1.find((field) => field.value.radioChecked)) === null || _fields$find === void 0 ? void 0 : _fields$find.value.value;
	};
	(0, vue.provide)(uniRadioGroupKey, {
		addField(field) {
			fields$1.push(field);
		},
		removeField(field) {
			fields$1.splice(fields$1.indexOf(field), 1);
		},
		radioChange($event, field) {
			_resetRadioGroupValue(fields$1.indexOf(field), true);
			trigger("change", $event, { value: getFieldsValue() });
		}
	});
	const uniForm = (0, vue.inject)(uniFormKey, false);
	const formField = { submit: () => {
		let data = ["", null];
		if (props$26.name !== "") {
			data[0] = props$26.name;
			data[1] = getFieldsValue();
		}
		return data;
	} };
	if (uniForm) uniForm.addField(formField);
	function setFieldChecked(field, radioChecked) {
		field.value = {
			radioChecked,
			value: field.value.value
		};
	}
	function _resetRadioGroupValue(key, change) {
		fields$1.forEach((value, index$1) => {
			if (index$1 === key) return;
			if (change) setFieldChecked(fields$1[index$1], false);
			else fields$1.forEach((v$1, i) => {
				if (index$1 >= i) return;
				if (fields$1[i].value.radioChecked) setFieldChecked(fields$1[index$1], false);
			});
		});
	}
	return fields$1;
}
var props$17 = {
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
	value: {
		type: String,
		default: ""
	},
	color: {
		type: String,
		default: "#007aff"
	},
	backgroundColor: {
		type: String,
		default: ""
	},
	borderColor: {
		type: String,
		default: ""
	},
	activeBackgroundColor: {
		type: String,
		default: ""
	},
	activeBorderColor: {
		type: String,
		default: ""
	},
	iconColor: {
		type: String,
		default: "#ffffff"
	}
};
var radio_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Radio",
	props: props$17,
	setup(props$26, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const radioChecked = (0, vue.ref)(props$26.checked);
		const radioValue = (0, vue.ref)(props$26.value);
		function getRadioStyle(checked) {
			if (props$26.disabled) return {
				backgroundColor: "#E1E1E1",
				borderColor: "#D1D1D1"
			};
			const style = {};
			if (radioChecked.value) {
				style.backgroundColor = props$26.activeBackgroundColor || props$26.color;
				style.borderColor = props$26.activeBorderColor || style.backgroundColor;
			} else {
				if (props$26.borderColor) style.borderColor = props$26.borderColor;
				if (props$26.backgroundColor) style.backgroundColor = props$26.backgroundColor;
			}
			return style;
		}
		const radioStyle = (0, vue.computed)(() => {
			return getRadioStyle(radioChecked.value);
		});
		(0, vue.watch)([() => props$26.checked, () => props$26.value], ([newChecked, newModelValue]) => {
			radioChecked.value = newChecked;
			radioValue.value = newModelValue;
		});
		const reset = () => {
			radioChecked.value = false;
		};
		const { uniCheckGroup, uniLabel, field } = useRadioInject(radioChecked, radioValue, reset);
		const _onClick = ($event) => {
			if (props$26.disabled || radioChecked.value) return;
			radioChecked.value = true;
			uniCheckGroup && uniCheckGroup.radioChange($event, field);
			$event.stopPropagation();
		};
		if (!!uniLabel) uniLabel.addHandler(_onClick);
		return () => {
			const booleanAttrs = useBooleanAttr(props$26, "disabled");
			let realCheckValue;
			realCheckValue = radioChecked.value;
			return (0, vue.createVNode)("uni-radio", (0, vue.mergeProps)(booleanAttrs, {
				"id": props$26.id,
				"onClick": _onClick,
				"ref": rootRef
			}), [(0, vue.createVNode)("div", {
				"class": "uni-radio-wrapper",
				"style": { "--HOVER-BD-COLOR": !radioChecked.value ? props$26.activeBorderColor : radioStyle.value.borderColor }
			}, [(0, vue.createVNode)("div", {
				"class": ["uni-radio-input", { "uni-radio-input-disabled": props$26.disabled }],
				"style": radioStyle.value
			}, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props$26.disabled ? "#ADADAD" : props$26.iconColor, 18) : ""], 6), slots.default && slots.default()], 4)], 16, ["id", "onClick"]);
		};
	}
});
function useRadioInject(radioChecked, radioValue, reset) {
	const field = (0, vue.computed)({
		get: () => ({
			radioChecked: Boolean(radioChecked.value),
			value: radioValue.value
		}),
		set: ({ radioChecked: checked }) => {
			radioChecked.value = checked;
		}
	});
	const formField = { reset };
	const uniCheckGroup = (0, vue.inject)(uniRadioGroupKey, false);
	if (!!uniCheckGroup) uniCheckGroup.addField(field);
	const uniForm = (0, vue.inject)(uniFormKey, false);
	if (!!uniForm) uniForm.addField(formField);
	return {
		uniCheckGroup,
		uniForm,
		uniLabel: (0, vue.inject)(uniLabelKey, false),
		field
	};
}
const TAGS = {
	a: "",
	abbr: "",
	address: "",
	article: "",
	aside: "",
	b: "",
	bdi: "",
	bdo: ["dir"],
	big: "",
	blockquote: "",
	br: "",
	caption: "",
	center: "",
	cite: "",
	code: "",
	col: ["span", "width"],
	colgroup: ["span", "width"],
	dd: "",
	del: "",
	div: "",
	dl: "",
	dt: "",
	em: "",
	fieldset: "",
	font: "",
	footer: "",
	h1: "",
	h2: "",
	h3: "",
	h4: "",
	h5: "",
	h6: "",
	header: "",
	hr: "",
	i: "",
	img: [
		"alt",
		"src",
		"height",
		"width"
	],
	ins: "",
	label: "",
	legend: "",
	li: "",
	mark: "",
	nav: "",
	ol: ["start", "type"],
	p: "",
	pre: "",
	q: "",
	rt: "",
	ruby: "",
	s: "",
	section: "",
	small: "",
	span: "",
	strong: "",
	sub: "",
	sup: "",
	table: ["width"],
	tbody: "",
	td: [
		"colspan",
		"height",
		"rowspan",
		"width"
	],
	tfoot: "",
	th: [
		"colspan",
		"height",
		"rowspan",
		"width"
	],
	thead: "",
	tr: [
		"colspan",
		"height",
		"rowspan",
		"width"
	],
	tt: "",
	u: "",
	ul: ""
};
var CHARS = {
	amp: "&",
	gt: ">",
	lt: "<",
	nbsp: " ",
	quot: "\"",
	apos: "'",
	ldquo: "“",
	rdquo: "”",
	yen: "￥",
	radic: "√",
	lceil: "⌈",
	rceil: "⌉",
	lfloor: "⌊",
	rfloor: "⌋",
	hellip: "…"
};
function decodeEntities(htmlString) {
	return htmlString.replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, function(match, stage) {
		if ((0, __vue_shared.hasOwn)(CHARS, stage) && CHARS[stage]) return CHARS[stage];
		if (/^#[0-9]{1,4}$/.test(stage)) return String.fromCharCode(stage.slice(1));
		if (/^#x[0-9a-f]{1,4}$/i.test(stage)) return String.fromCharCode(Number("0" + stage.slice(1)));
		return match;
	});
}
function processClickEvent(node, triggerItemClick) {
	if (node.name && ["a", "img"].includes(node.name) && triggerItemClick) return { onClickCapture: (e$1) => {
		triggerItemClick(e$1, { node });
		e$1.stopPropagation();
		e$1.preventDefault();
		e$1.returnValue = false;
	} };
}
function normalizeValue(tagName, name, value) {
	if (tagName === "img" && name === "src" && (0, __vue_shared.isString)(value)) return getRealPath(value);
	return value;
}
function normalizeAttrs(tagName, attrs$1) {
	if (!(0, __vue_shared.isPlainObject)(attrs$1)) return;
	const tagAttrs = TAGS[tagName] || [];
	const normalizedAttrs = {};
	Object.keys(attrs$1).forEach((name) => {
		if (name === "class" || name === "style" || tagAttrs.includes(name)) normalizedAttrs[name] = normalizeValue(tagName, name, attrs$1[name]);
	});
	return normalizedAttrs;
}
const nodeList2VNode = (scopeId, triggerItemClick, nodeList) => {
	if (!nodeList || Array.isArray(nodeList) && !nodeList.length) return [];
	return nodeList.map((node) => {
		if (!(0, __vue_shared.isPlainObject)(node)) return;
		if (!(0, __vue_shared.hasOwn)(node, "type") || node.type === "node") {
			if (!(0, __vue_shared.isString)(node.name) || !node.name) return;
			const tagName = node.name.toLowerCase();
			if (!(0, __vue_shared.hasOwn)(TAGS, tagName)) return;
			const nodeProps = (0, __vue_shared.extend)({ [scopeId]: "" }, processClickEvent(node, triggerItemClick), normalizeAttrs(tagName, node.attrs));
			return (0, vue.h)(node.name, nodeProps, nodeList2VNode(scopeId, triggerItemClick, node.children));
		}
		if (node.type === "text" && (0, __vue_shared.isString)(node.text) && node.text !== "") return (0, vue.createTextVNode)(decodeEntities(node.text || ""));
	});
};
function removeDOCTYPE(html) {
	return html.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "");
}
function parseAttrs(attrs$1) {
	return attrs$1.reduce(function(pre, attr$1) {
		let value = attr$1.value;
		const name = attr$1.name;
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
		start: function(tag, attrs$1, unary) {
			const node = { name: tag };
			if (attrs$1.length !== 0) node.attrs = parseAttrs(attrs$1);
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
var props$16 = { nodes: {
	type: [Array, String],
	default: function() {
		return [];
	}
} };
var rich_text_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "RichText",
	compatConfig: { MODE: 3 },
	props: props$16,
	emits: ["itemclick"],
	setup(props$26, { emit: emit$2 }) {
		const vm = (0, vue.getCurrentInstance)();
		const scopeId = vm && vm.vnode.scopeId || "";
		const rootRef = (0, vue.ref)(null);
		const _vnode = (0, vue.shallowRef)([]);
		const trigger = useCustomEvent(rootRef, emit$2);
		function triggerItemClick(e$1, detail = {}) {
			trigger("itemclick", e$1, detail);
		}
		function renderVNode() {
			let nodeList = props$26.nodes;
			if ((0, __vue_shared.isString)(nodeList)) nodeList = parseHtml(props$26.nodes);
			_vnode.value = nodeList2VNode(scopeId, triggerItemClick, nodeList);
		}
		(0, vue.watch)(() => props$26.nodes, renderVNode, {
			immediate: true,
			deep: true
		});
		return () => (0, vue.h)("uni-rich-text", { ref: rootRef }, (0, vue.h)("div", {}, _vnode.value));
	}
});
var refresher_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Refresher",
	props: {
		refreshState: {
			type: String,
			default: ""
		},
		refresherHeight: {
			type: Number,
			default: 0
		},
		refresherThreshold: {
			type: Number,
			default: 45
		},
		refresherDefaultStyle: {
			type: String,
			default: "black"
		},
		refresherBackground: {
			type: String,
			default: "#fff"
		}
	},
	setup(props$26, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const rootStyle = (0, vue.computed)(() => {
			const style = { backgroundColor: props$26.refresherBackground };
			switch (props$26.refreshState) {
				case "pulling":
					style.height = props$26.refresherHeight + "px";
					break;
				case "refreshing":
					style.height = props$26.refresherThreshold + "px";
					style.transition = "height 0.3s";
					break;
				case "":
				case "refresherabort":
				case "restore":
					style.height = "0px";
					style.transition = "height 0.3s";
					break;
				default: break;
			}
			return style;
		});
		const refreshRotate = (0, vue.computed)(() => {
			const route = props$26.refresherHeight / props$26.refresherThreshold;
			return (route > 1 ? 1 : route) * 360;
		});
		return () => {
			const { refreshState, refresherDefaultStyle, refresherThreshold } = props$26;
			return (0, vue.createVNode)("div", {
				"ref": rootRef,
				"style": rootStyle.value,
				"class": "uni-scroll-view-refresher"
			}, [refresherDefaultStyle !== "none" ? (0, vue.createVNode)("div", { "class": "uni-scroll-view-refresh" }, [(0, vue.createVNode)("div", { "class": "uni-scroll-view-refresh-inner" }, [refreshState == "pulling" ? (0, vue.createVNode)("svg", {
				"key": "refresh__icon",
				"style": { transform: "rotate(" + refreshRotate.value + "deg)" },
				"fill": "#2BD009",
				"class": "uni-scroll-view-refresh__icon",
				"width": "24",
				"height": "24",
				"viewBox": "0 0 24 24"
			}, [(0, vue.createVNode)("path", { "d": "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }, null), (0, vue.createVNode)("path", {
				"d": "M0 0h24v24H0z",
				"fill": "none"
			}, null)], 4) : null, refreshState == "refreshing" ? (0, vue.createVNode)("svg", {
				"key": "refresh__spinner",
				"class": "uni-scroll-view-refresh__spinner",
				"width": "24",
				"height": "24",
				"viewBox": "25 25 50 50"
			}, [(0, vue.createVNode)("circle", {
				"cx": "50",
				"cy": "50",
				"r": "20",
				"fill": "none",
				"style": "color: #2bd009",
				"stroke-width": "3"
			}, null)]) : null])]) : null, refresherDefaultStyle === "none" ? (0, vue.createVNode)("div", {
				"class": "uni-scroll-view-refresher-container",
				"style": { height: `${refresherThreshold}px` }
			}, [slots.default && slots.default()], 4) : null], 4);
		};
	}
});
var props$15 = {
	direction: {
		type: [String],
		default: "vertical"
	},
	scrollX: {
		type: [Boolean, String],
		default: false
	},
	scrollY: {
		type: [Boolean, String],
		default: false
	},
	showScrollbar: {
		type: [Boolean, String],
		default: true
	},
	upperThreshold: {
		type: [Number, String],
		default: 50
	},
	lowerThreshold: {
		type: [Number, String],
		default: 50
	},
	scrollTop: {
		type: [Number, String],
		default: 0
	},
	scrollLeft: {
		type: [Number, String],
		default: 0
	},
	scrollIntoView: {
		type: String,
		default: ""
	},
	scrollWithAnimation: {
		type: [Boolean, String],
		default: false
	},
	enableBackToTop: {
		type: [Boolean, String],
		default: false
	},
	refresherEnabled: {
		type: [Boolean, String],
		default: false
	},
	refresherThreshold: {
		type: Number,
		default: 45
	},
	refresherDefaultStyle: {
		type: String,
		default: "black"
	},
	refresherBackground: {
		type: String,
		default: "#fff"
	},
	refresherTriggered: {
		type: [Boolean, String],
		default: false
	}
};
var scroll_view_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "ScrollView",
	compatConfig: { MODE: 3 },
	props: props$15,
	emits: [
		"scroll",
		"scrolltoupper",
		"scrolltolower",
		"refresherrefresh",
		"refresherrestore",
		"refresherpulling",
		"refresherabort",
		"update:refresherTriggered"
	],
	setup(props$26, { emit: emit$2, slots, expose }) {
		const rootRef = (0, vue.ref)(null);
		const main = (0, vue.ref)(null);
		const wrap = (0, vue.ref)(null);
		const content = (0, vue.ref)(null);
		const trigger = useCustomEvent(rootRef, emit$2);
		const { state, scrollTopNumber, scrollLeftNumber } = useScrollViewState(props$26);
		const { realScrollX, realScrollY, _scrollLeftChanged, _scrollTopChanged } = useScrollViewLoader(props$26, state, scrollTopNumber, scrollLeftNumber, trigger, rootRef, main, content, emit$2);
		const mainStyle = (0, vue.computed)(() => {
			let style = "";
			realScrollX.value ? style += "overflow-x:auto;" : style += "overflow-x:hidden;";
			realScrollY.value ? style += "overflow-y:auto;" : style += "overflow-y:hidden;";
			return style;
		});
		const scrollBarClassName = (0, vue.computed)(() => {
			let className = "uni-scroll-view";
			if (props$26.showScrollbar === false) className += " uni-scroll-view-scrollbar-hidden";
			return className;
		});
		expose({ $getMain() {
			return main.value;
		} });
		return () => {
			const { refresherEnabled, refresherBackground, refresherDefaultStyle, refresherThreshold } = props$26;
			const { refresherHeight, refreshState } = state;
			return (0, vue.createVNode)("uni-scroll-view", { "ref": rootRef }, [(0, vue.createVNode)("div", {
				"ref": wrap,
				"class": "uni-scroll-view"
			}, [(0, vue.createVNode)("div", {
				"ref": main,
				"style": mainStyle.value,
				"class": scrollBarClassName.value
			}, [refresherEnabled ? (0, vue.createVNode)(refresher_default, {
				"refreshState": refreshState,
				"refresherHeight": refresherHeight,
				"refresherThreshold": refresherThreshold,
				"refresherDefaultStyle": refresherDefaultStyle,
				"refresherBackground": refresherBackground
			}, { default: () => [refresherDefaultStyle == "none" ? slots.refresher && slots.refresher() : null] }, 8, [
				"refreshState",
				"refresherHeight",
				"refresherThreshold",
				"refresherDefaultStyle",
				"refresherBackground"
			]) : null, (0, vue.createVNode)("div", {
				"ref": content,
				"class": "uni-scroll-view-content"
			}, [slots.default && slots.default()], 512)], 6)], 512)], 512);
		};
	}
});
function useScrollViewState(props$26) {
	const scrollTopNumber = (0, vue.computed)(() => {
		return Number(props$26.scrollTop) || 0;
	});
	const scrollLeftNumber = (0, vue.computed)(() => {
		return Number(props$26.scrollLeft) || 0;
	});
	return {
		state: (0, vue.reactive)({
			lastScrollTop: scrollTopNumber.value,
			lastScrollLeft: scrollLeftNumber.value,
			lastScrollToUpperTime: 0,
			lastScrollToLowerTime: 0,
			refresherHeight: 0,
			refreshState: ""
		}),
		scrollTopNumber,
		scrollLeftNumber
	};
}
function useScrollViewLoader(props$26, state, scrollTopNumber, scrollLeftNumber, trigger, rootRef, main, content, emit$2) {
	let _innerSetScrollTop = false;
	let _innerSetScrollLeft = false;
	let beforeRefreshing = false;
	let triggerAbort = false;
	let __transitionEnd = () => {};
	const realScrollX = (0, vue.computed)(() => {
		return props$26.scrollX;
	});
	const realScrollY = (0, vue.computed)(() => {
		return props$26.scrollY;
	});
	(0, vue.computed)(() => {
		let val = Number(props$26.upperThreshold);
		return isNaN(val) ? 50 : val;
	});
	(0, vue.computed)(() => {
		let val = Number(props$26.lowerThreshold);
		return isNaN(val) ? 50 : val;
	});
	function scrollTo(scrollToValue, direction) {
		const container = main.value;
		let transformValue = 0;
		let transform = "";
		scrollToValue < 0 ? scrollToValue = 0 : direction === "x" && scrollToValue > container.scrollWidth - container.offsetWidth ? scrollToValue = container.scrollWidth - container.offsetWidth : direction === "y" && scrollToValue > container.scrollHeight - container.offsetHeight && (scrollToValue = container.scrollHeight - container.offsetHeight);
		direction === "x" ? transformValue = container.scrollLeft - scrollToValue : direction === "y" && (transformValue = container.scrollTop - scrollToValue);
		if (transformValue === 0) return;
		let _content = content.value;
		_content.style.transition = "transform .3s ease-out";
		_content.style.webkitTransition = "-webkit-transform .3s ease-out";
		if (direction === "x") transform = "translateX(" + transformValue + "px) translateZ(0)";
		else direction === "y" && (transform = "translateY(" + transformValue + "px) translateZ(0)");
		_content.removeEventListener("transitionend", __transitionEnd);
		_content.removeEventListener("webkitTransitionEnd", __transitionEnd);
		__transitionEnd = () => _transitionEnd(scrollToValue, direction);
		_content.addEventListener("transitionend", __transitionEnd);
		_content.addEventListener("webkitTransitionEnd", __transitionEnd);
		if (direction === "x") container.style.overflowX = "hidden";
		else if (direction === "y") container.style.overflowY = "hidden";
		_content.style.transform = transform;
		_content.style.webkitTransform = transform;
	}
	function _scrollTopChanged(val) {
		if (realScrollY.value) if (_innerSetScrollTop) _innerSetScrollTop = false;
		else if (props$26.scrollWithAnimation) scrollTo(val, "y");
		else main.value.scrollTop = val;
	}
	function _scrollLeftChanged(val) {
		if (realScrollX.value) if (_innerSetScrollLeft) _innerSetScrollLeft = false;
		else if (props$26.scrollWithAnimation) scrollTo(val, "x");
		else main.value.scrollLeft = val;
	}
	function _scrollIntoViewChanged(val) {
		if (val) {
			if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
				console.error(`id error: scroll-into-view=${val}`);
				return;
			}
			let element = rootRef.value.querySelector("#" + val);
			if (element) {
				let mainRect = main.value.getBoundingClientRect();
				let elRect = element.getBoundingClientRect();
				if (realScrollX.value) {
					let left = elRect.left - mainRect.left;
					let x = main.value.scrollLeft + left;
					if (props$26.scrollWithAnimation) scrollTo(x, "x");
					else main.value.scrollLeft = x;
				}
				if (realScrollY.value) {
					let top = elRect.top - mainRect.top;
					let y = main.value.scrollTop + top;
					if (props$26.scrollWithAnimation) scrollTo(y, "y");
					else main.value.scrollTop = y;
				}
			}
		}
	}
	function _transitionEnd(val, direction) {
		content.value.style.transition = "";
		content.value.style.webkitTransition = "";
		content.value.style.transform = "";
		content.value.style.webkitTransform = "";
		let _main = main.value;
		if (direction === "x") {
			_main.style.overflowX = realScrollX.value ? "auto" : "hidden";
			_main.scrollLeft = val;
		} else if (direction === "y") {
			_main.style.overflowY = realScrollY.value ? "auto" : "hidden";
			_main.scrollTop = val;
		}
		content.value.removeEventListener("transitionend", __transitionEnd);
		content.value.removeEventListener("webkitTransitionEnd", __transitionEnd);
	}
	function _setRefreshState(_state) {
		if (!props$26.refresherEnabled) return;
		switch (_state) {
			case "refreshing":
				state.refresherHeight = props$26.refresherThreshold;
				if (!beforeRefreshing) {
					beforeRefreshing = true;
					trigger("refresherpulling", {}, {
						deltaY: state.refresherHeight,
						dy: state.refresherHeight
					});
					trigger("refresherrefresh", {}, { dy: touchEnd.y - touchStart.y });
					emit$2("update:refresherTriggered", true);
				}
				break;
			case "restore":
			case "refresherabort":
				beforeRefreshing = false;
				state.refresherHeight = 0;
				if (_state === "restore") {
					triggerAbort = false;
					trigger("refresherrestore", {}, { dy: touchEnd.y - touchStart.y });
				}
				if (_state === "refresherabort" && triggerAbort) {
					triggerAbort = false;
					trigger("refresherabort", {}, { dy: touchEnd.y - touchStart.y });
				}
				break;
		}
		state.refreshState = _state;
	}
	let touchStart = {
		x: 0,
		y: 0
	};
	let touchEnd = {
		x: 0,
		y: props$26.refresherThreshold
	};
	(0, vue.watch)(scrollTopNumber, (val) => {
		_scrollTopChanged(val);
	});
	(0, vue.watch)(scrollLeftNumber, (val) => {
		_scrollLeftChanged(val);
	});
	(0, vue.watch)(() => props$26.scrollIntoView, (val) => {
		_scrollIntoViewChanged(val);
	});
	(0, vue.watch)(() => props$26.refresherTriggered, (val) => {
		if (val === true) _setRefreshState("refreshing");
		else if (val === false) _setRefreshState("restore");
	});
	return {
		realScrollX,
		realScrollY,
		_scrollTopChanged,
		_scrollLeftChanged
	};
}
var props$14 = {
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
};
var slider_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Slider",
	props: props$14,
	emits: ["changing", "change"],
	setup(props$26, { emit: emit$2 }) {
		const sliderRef = (0, vue.ref)(null);
		const sliderValueRef = (0, vue.ref)(null);
		const sliderHandleRef = (0, vue.ref)(null);
		const sliderValue = (0, vue.ref)(Number(props$26.value));
		if (sliderValue.value < Number(props$26.min)) sliderValue.value = Number(props$26.min);
		if (sliderValue.value > Number(props$26.max)) sliderValue.value = Number(props$26.max);
		(0, vue.watch)(() => props$26.value, (val) => {
			sliderValue.value = Number(val);
		});
		const trigger = useCustomEvent(sliderRef, emit$2);
		const state = useSliderState(props$26, sliderValue);
		const { _onClick, _onTrack } = useSliderLoader(props$26, sliderValue, sliderRef, sliderValueRef, trigger);
		return () => {
			const { setBgColor, setBlockBg, setActiveColor, setBlockStyle } = state;
			return (0, vue.createVNode)("uni-slider", {
				"ref": sliderRef,
				"onClick": withWebEvent(_onClick)
			}, [(0, vue.createVNode)("div", { "class": "uni-slider-wrapper" }, [(0, vue.createVNode)("div", { "class": "uni-slider-tap-area" }, [(0, vue.createVNode)("div", {
				"style": setBgColor.value,
				"class": "uni-slider-handle-wrapper"
			}, [
				(0, vue.createVNode)("div", {
					"ref": sliderHandleRef,
					"style": setBlockBg.value,
					"class": "uni-slider-handle"
				}, null, 4),
				(0, vue.createVNode)("div", {
					"style": setBlockStyle.value,
					"class": "uni-slider-thumb"
				}, null, 4),
				(0, vue.createVNode)("div", {
					"style": setActiveColor.value,
					"class": "uni-slider-track"
				}, null, 4)
			], 4)]), (0, vue.withDirectives)((0, vue.createVNode)("span", {
				"ref": sliderValueRef,
				"class": "uni-slider-value"
			}, [sliderValue.value], 512), [[vue.vShow, props$26.showValue]])])], 8, ["onClick"]);
		};
	}
});
var getValueWidth = (value, min, max) => {
	max = Number(max);
	min = Number(min);
	return 100 * (value - min) / (max - min) + "%";
};
function useSliderState(props$26, sliderValue) {
	const _getValueWidth = () => {
		return getValueWidth(sliderValue.value, props$26.min, props$26.max);
	};
	const _getBgColor = () => {
		return props$26.backgroundColor !== "#e9e9e9" ? props$26.backgroundColor : props$26.color !== "#007aff" ? props$26.color : "#007aff";
	};
	const _getActiveColor = () => {
		return props$26.activeColor !== "#007aff" ? props$26.activeColor : props$26.selectedColor !== "#e9e9e9" ? props$26.selectedColor : "#e9e9e9";
	};
	return {
		setBgColor: (0, vue.computed)(() => ({ backgroundColor: _getBgColor() })),
		setBlockBg: (0, vue.computed)(() => ({ left: _getValueWidth() })),
		setActiveColor: (0, vue.computed)(() => ({
			backgroundColor: _getActiveColor(),
			width: _getValueWidth()
		})),
		setBlockStyle: (0, vue.computed)(() => ({
			width: props$26.blockSize + "px",
			height: props$26.blockSize + "px",
			marginLeft: -props$26.blockSize / 2 + "px",
			marginTop: -props$26.blockSize / 2 + "px",
			left: _getValueWidth(),
			backgroundColor: props$26.blockColor
		}))
	};
}
function useSliderLoader(props$26, sliderValue, sliderRef, sliderValueRef, trigger) {
	const truthStep = (0, vue.computed)(() => {
		const step = Number(props$26.step);
		if (isNaN(step)) return 1;
		return step;
	});
	const _onClick = ($event) => {
		if (props$26.disabled) return;
		_onUserChangedValue($event);
		trigger("change", $event, { value: sliderValue.value });
	};
	const _filterValue = (min, step, value) => {
		return Math.round((value - min) / step) * step + min;
	};
	const _onUserChangedValue = (e$1) => {
		const max = Number(props$26.max);
		const min = Number(props$26.min);
		const sliderRightBox = sliderValueRef.value;
		const sliderRightBoxLeft = getComputedStyle(sliderRightBox, null).marginLeft;
		let sliderRightBoxWidth = sliderRightBox.offsetWidth;
		sliderRightBoxWidth = sliderRightBoxWidth + parseInt(sliderRightBoxLeft);
		const slider = sliderRef.value;
		const offsetWidth = slider.offsetWidth - (props$26.showValue ? sliderRightBoxWidth : 0);
		const boxLeft = slider.getBoundingClientRect().left;
		const proportion = (e$1.x - boxLeft) / offsetWidth;
		const stepDecimal = (truthStep.value + "").split(".")[1];
		sliderValue.value = parseFloat(_filterValue(min, truthStep.value, lerp(min, max, proportion)).toFixed(stepDecimal ? stepDecimal.length : 0));
	};
	const _onTrack = (e$1) => {
		if (!props$26.disabled) return e$1.detail.state === "move" ? (_onUserChangedValue({ x: e$1.detail.x }), trigger("changing", e$1, { value: sliderValue.value }), !1) : e$1.detail.state === "end" && trigger("change", e$1, { value: sliderValue.value });
	};
	const uniForm = (0, vue.inject)(uniFormKey, false);
	if (!!uniForm) uniForm.addField({
		reset: () => sliderValue.value = Number(props$26.min),
		submit: () => {
			const data = ["", null];
			if (props$26.name !== "") {
				data[0] = props$26.name;
				data[1] = sliderValue.value;
			}
			return data;
		}
	});
	return {
		_onClick,
		_onTrack
	};
}
function lerp(min, max, t$1) {
	t$1 = Math.min(1, Math.max(0, t$1));
	return min * (1 - t$1) + max * t$1;
}
var props$13 = {
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
		default: ""
	},
	indicatorActiveColor: {
		type: String,
		default: ""
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
	},
	navigation: {
		type: [Boolean, String],
		default: false
	},
	navigationColor: {
		type: String,
		default: "#fff"
	},
	navigationActiveColor: {
		type: String,
		default: "rgba(53, 53, 53, 0.6)"
	}
};
function useState$1(props$26) {
	return (0, vue.reactive)({
		interval: (0, vue.computed)(() => {
			const interval = Number(props$26.interval);
			return isNaN(interval) ? 5e3 : interval;
		}),
		duration: (0, vue.computed)(() => {
			const duration = Number(props$26.duration);
			return isNaN(duration) ? 500 : duration;
		}),
		displayMultipleItems: (0, vue.computed)(() => {
			const displayMultipleItems = Math.round(props$26.displayMultipleItems);
			return isNaN(displayMultipleItems) ? 1 : displayMultipleItems;
		}),
		current: Math.round(props$26.current) || 0,
		currentItemId: props$26.currentItemId,
		userTracking: false
	});
}
function useLayout(props$26, state, swiperContexts, slideFrameRef, emit$2, trigger) {
	function cancelSchedule() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}
	let timer = null;
	let invalid = true;
	let viewportPosition = 0;
	let viewportMoveRatio = 1;
	let animating = null;
	let requestedAnimation = false;
	let contentTrackViewport = 0;
	let transitionStart;
	let currentChangeSource = "";
	const swiperEnabled = (0, vue.computed)(() => swiperContexts.value.length > state.displayMultipleItems);
	const circularEnabled = (0, vue.computed)(() => props$26.circular && swiperEnabled.value);
	function checkCircularLayout(index$1) {
		if (!invalid) for (let items = swiperContexts.value, n = items.length, i = index$1 + state.displayMultipleItems, r = 0; r < n; r++) {
			const item = items[r];
			const s = Math.floor(index$1 / n) * n + r;
			const l = s + n;
			const c = s - n;
			const u = Math.max(index$1 - (s + 1), s - i, 0);
			const d = Math.max(index$1 - (l + 1), l - i, 0);
			const h$2 = Math.max(index$1 - (c + 1), c - i, 0);
			const p$1 = Math.min(u, d, h$2);
			const position = [
				s,
				l,
				c
			][[
				u,
				d,
				h$2
			].indexOf(p$1)];
			item.updatePosition(position, props$26.vertical);
		}
	}
	function updateViewport(index$1) {
		if (!(Math.floor(2 * viewportPosition) === Math.floor(2 * index$1) && Math.ceil(2 * viewportPosition) === Math.ceil(2 * index$1))) {
			if (circularEnabled.value) checkCircularLayout(index$1);
		}
		const x = props$26.vertical ? "0" : 100 * -index$1 * viewportMoveRatio + "%";
		const y = props$26.vertical ? 100 * -index$1 * viewportMoveRatio + "%" : "0";
		const transform = "translate(" + x + ", " + y + ") translateZ(0)";
		const slideFrame = slideFrameRef.value;
		if (slideFrame) {
			slideFrame.style.webkitTransform = transform;
			slideFrame.style.transform = transform;
		}
		viewportPosition = index$1;
		if (!transitionStart) {
			if (index$1 % 1 === 0) return;
			transitionStart = index$1;
		}
		index$1 -= Math.floor(transitionStart);
		const items = swiperContexts.value;
		if (index$1 <= -(items.length - 1)) index$1 += items.length;
		else if (index$1 >= items.length) index$1 -= items.length;
		index$1 = transitionStart % 1 > .5 || transitionStart < 0 ? index$1 - 1 : index$1;
		trigger("transition", {}, {
			dx: props$26.vertical ? 0 : index$1 * slideFrame.offsetWidth,
			dy: props$26.vertical ? index$1 * slideFrame.offsetHeight : 0
		});
	}
	function endViewportAnimation() {
		if (animating) {
			updateViewport(animating.toPos);
			animating = null;
		}
	}
	function normalizeCurrentValue(current) {
		const length = swiperContexts.value.length;
		if (!length) return -1;
		const index$1 = (Math.round(current) % length + length) % length;
		if (circularEnabled.value) {
			if (length <= state.displayMultipleItems) return 0;
		} else if (index$1 > length - state.displayMultipleItems) return length - state.displayMultipleItems;
		return index$1;
	}
	function cancelViewportAnimation() {
		animating = null;
	}
	function animateFrameFuncProto() {
		if (!animating) {
			requestedAnimation = false;
			return;
		}
		const _animating = animating;
		const toPos = _animating.toPos;
		const acc = _animating.acc;
		const endTime = _animating.endTime;
		const source = _animating.source;
		const time = endTime - Date.now();
		if (time <= 0) {
			updateViewport(toPos);
			animating = null;
			requestedAnimation = false;
			transitionStart = null;
			const item = swiperContexts.value[state.current];
			if (item) {
				const currentItemId = item.getItemId();
				trigger("animationfinish", {}, {
					current: state.current,
					currentItemId,
					source
				});
			}
			return;
		}
		updateViewport(toPos + acc * time * time / 2);
		requestAnimationFrame(animateFrameFuncProto);
	}
	function animateViewport(current, source, n) {
		cancelViewportAnimation();
		const duration = state.duration;
		const length = swiperContexts.value.length;
		let position = viewportPosition;
		if (circularEnabled.value) if (n < 0) {
			for (; position < current;) position += length;
			for (; position - length > current;) position -= length;
		} else if (n > 0) {
			for (; position > current;) position -= length;
			for (; position + length < current;) position += length;
			if (position + length - current < current - position) position += length;
		} else {
			for (; position + length < current;) position += length;
			for (; position - length > current;) position -= length;
			if (position + length - current < current - position) position += length;
		}
		else if (source === "click") current = current + state.displayMultipleItems - 1 < length ? current : 0;
		animating = {
			toPos: current,
			acc: 2 * (position - current) / (duration * duration),
			endTime: Date.now() + duration,
			source
		};
		if (!requestedAnimation) {
			requestedAnimation = true;
			requestAnimationFrame(animateFrameFuncProto);
		}
	}
	function scheduleAutoplay() {
		cancelSchedule();
		const items = swiperContexts.value;
		const callback = function() {
			timer = null;
			currentChangeSource = "autoplay";
			if (circularEnabled.value) state.current = normalizeCurrentValue(state.current + 1);
			else state.current = state.current + state.displayMultipleItems < items.length ? state.current + 1 : 0;
			animateViewport(state.current, "autoplay", circularEnabled.value ? 1 : 0);
			timer = setTimeout(callback, state.interval);
		};
		if (!(invalid || items.length <= state.displayMultipleItems)) timer = setTimeout(callback, state.interval);
	}
	function resetLayout() {
		cancelSchedule();
		endViewportAnimation();
		const items = swiperContexts.value;
		for (let i = 0; i < items.length; i++) items[i].updatePosition(i, props$26.vertical);
		viewportMoveRatio = 1;
		const slideFrameEl = slideFrameRef.value;
		if (state.displayMultipleItems === 1 && items.length) {
			const itemRect = items[0].getBoundingClientRect();
			const slideFrameRect = slideFrameEl.getBoundingClientRect();
			viewportMoveRatio = itemRect.width / slideFrameRect.width;
			if (!(viewportMoveRatio > 0 && viewportMoveRatio < 1)) viewportMoveRatio = 1;
		}
		const position = viewportPosition;
		viewportPosition = -2;
		const current = state.current;
		if (current >= 0) {
			invalid = false;
			if (state.userTracking) {
				updateViewport(position + current - contentTrackViewport);
				contentTrackViewport = current;
			} else {
				updateViewport(current);
				if (props$26.autoplay) scheduleAutoplay();
			}
		} else {
			invalid = true;
			updateViewport(-state.displayMultipleItems - 1);
		}
	}
	(0, vue.watch)([
		() => props$26.current,
		() => props$26.currentItemId,
		() => [...swiperContexts.value]
	], () => {
		let current = -1;
		if (props$26.currentItemId) {
			for (let i = 0, items = swiperContexts.value; i < items.length; i++) if (items[i].getItemId() === props$26.currentItemId) {
				current = i;
				break;
			}
		}
		if (current < 0) current = Math.round(props$26.current) || 0;
		current = current < 0 ? 0 : current;
		if (state.current !== current) {
			currentChangeSource = "";
			state.current = current;
		}
	});
	(0, vue.watch)([
		() => props$26.vertical,
		() => circularEnabled.value,
		() => state.displayMultipleItems,
		() => [...swiperContexts.value]
	], resetLayout);
	(0, vue.watch)(() => state.interval, () => {
		if (timer) {
			cancelSchedule();
			scheduleAutoplay();
		}
	});
	function currentChanged(current, history) {
		const source = currentChangeSource;
		currentChangeSource = "";
		const items = swiperContexts.value;
		if (!source) {
			const length = items.length;
			animateViewport(current, "", circularEnabled.value && history + (length - current) % length > length / 2 ? 1 : 0);
		}
		const item = items[current];
		if (item) {
			const currentItemId = state.currentItemId = item.getItemId();
			trigger("change", {}, {
				current: state.current,
				currentItemId,
				source
			});
		}
	}
	(0, vue.watch)(() => state.current, (val, oldVal) => {
		currentChanged(val, oldVal);
		emit$2("update:current", val);
	});
	(0, vue.watch)(() => state.currentItemId, (val) => {
		emit$2("update:currentItemId", val);
	});
	function inintAutoplay(enable) {
		if (enable) scheduleAutoplay();
		else cancelSchedule();
	}
	(0, vue.watch)(() => props$26.autoplay && !state.userTracking, inintAutoplay);
	inintAutoplay(props$26.autoplay && !state.userTracking);
	function onSwiperDotClick(index$1) {
		animateViewport(state.current = index$1, currentChangeSource = "click", circularEnabled.value ? 1 : 0);
	}
	return {
		onSwiperDotClick,
		circularEnabled,
		swiperEnabled
	};
}
var swiper_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Swiper",
	props: props$13,
	emits: [
		"change",
		"transition",
		"animationfinish",
		"update:current",
		"update:currentItemId"
	],
	setup(props$26, { slots, emit: emit$2 }) {
		const rootRef = (0, vue.ref)(null);
		const trigger = useCustomEvent(rootRef, emit$2);
		const slidesWrapperRef = (0, vue.ref)(null);
		const slideFrameRef = (0, vue.ref)(null);
		const state = useState$1(props$26);
		const slidesStyle = (0, vue.computed)(() => {
			let style = {};
			if (props$26.nextMargin || props$26.previousMargin) style = props$26.vertical ? {
				left: 0,
				right: 0,
				top: rpx2px(props$26.previousMargin, true),
				bottom: rpx2px(props$26.nextMargin, true)
			} : {
				top: 0,
				bottom: 0,
				left: rpx2px(props$26.previousMargin, true),
				right: rpx2px(props$26.nextMargin, true)
			};
			return style;
		});
		const slideFrameStyle = (0, vue.computed)(() => {
			const value = Math.abs(100 / state.displayMultipleItems) + "%";
			return {
				width: props$26.vertical ? "100%" : value,
				height: !props$26.vertical ? "100%" : value
			};
		});
		let swiperItems = [];
		const originSwiperContexts = [];
		const swiperContexts = (0, vue.ref)([]);
		function updateSwiperContexts() {
			const contexts = [];
			for (let index$1 = 0; index$1 < swiperItems.length; index$1++) {
				let swiperItem = swiperItems[index$1];
				if (!(swiperItem instanceof Element)) swiperItem = swiperItem.el;
				const swiperContext = originSwiperContexts.find((context) => swiperItem === context.rootRef.value);
				if (swiperContext) contexts.push((0, vue.markRaw)(swiperContext));
			}
			swiperContexts.value = contexts;
		}
		const addSwiperContext = function(swiperContext) {
			originSwiperContexts.push(swiperContext);
			updateSwiperContexts();
		};
		(0, vue.provide)("addSwiperContext", addSwiperContext);
		const removeSwiperContext = function(swiperContext) {
			const index$1 = originSwiperContexts.indexOf(swiperContext);
			if (index$1 >= 0) {
				originSwiperContexts.splice(index$1, 1);
				updateSwiperContexts();
			}
		};
		(0, vue.provide)("removeSwiperContext", removeSwiperContext);
		const { onSwiperDotClick, circularEnabled, swiperEnabled } = useLayout(props$26, state, swiperContexts, slideFrameRef, emit$2, trigger);
		let createNavigationTsx = () => null;
		createNavigationTsx = useSwiperNavigation(rootRef, props$26, state, onSwiperDotClick, swiperContexts, circularEnabled, swiperEnabled);
		return () => {
			const defaultSlots = slots.default && slots.default();
			swiperItems = flatVNode(defaultSlots);
			return (0, vue.createVNode)("uni-swiper", { "ref": rootRef }, [(0, vue.createVNode)("div", {
				"ref": slidesWrapperRef,
				"class": "uni-swiper-wrapper"
			}, [
				(0, vue.createVNode)("div", {
					"class": "uni-swiper-slides",
					"style": slidesStyle.value
				}, [(0, vue.createVNode)("div", {
					"ref": slideFrameRef,
					"class": "uni-swiper-slide-frame",
					"style": slideFrameStyle.value
				}, [defaultSlots], 4)], 4),
				props$26.indicatorDots && (0, vue.createVNode)("div", { "class": ["uni-swiper-dots", props$26.vertical ? "uni-swiper-dots-vertical" : "uni-swiper-dots-horizontal"] }, [swiperContexts.value.map((_, index$1, array) => (0, vue.createVNode)("div", {
					"onClick": () => onSwiperDotClick(index$1),
					"class": {
						"uni-swiper-dot": true,
						"uni-swiper-dot-active": index$1 < state.current + state.displayMultipleItems && index$1 >= state.current || index$1 < state.current + state.displayMultipleItems - array.length
					},
					"style": { background: index$1 === state.current ? props$26.indicatorActiveColor : props$26.indicatorColor }
				}, null, 14, ["onClick"]))], 2),
				createNavigationTsx()
			], 512)], 512);
		};
	}
});
var useSwiperNavigation = (rootRef, props$26, state, onSwiperDotClick, swiperContext, circularEnabled, swiperEnabled) => {
	let isNavigationAuto = false;
	let prevDisabled = false;
	let nextDisabled = false;
	let hideNavigation = (0, vue.ref)(false);
	(0, vue.watchEffect)(() => {
		isNavigationAuto = props$26.navigation === "auto";
		hideNavigation.value = props$26.navigation !== true || isNavigationAuto;
		swiperAddMouseEvent();
	});
	(0, vue.watchEffect)(() => {
		const swiperItemLength = swiperContext.value.length;
		const notCircular = !circularEnabled.value;
		prevDisabled = state.current === 0 && notCircular;
		nextDisabled = state.current === swiperItemLength - 1 && notCircular || notCircular && state.current + state.displayMultipleItems >= swiperItemLength;
		if (!swiperEnabled.value) {
			prevDisabled = true;
			nextDisabled = true;
			isNavigationAuto && (hideNavigation.value = true);
		}
	});
	function navigationHover(event, type) {
		const target = event.currentTarget;
		if (!target) return;
		target.style.backgroundColor = type === "over" ? props$26.navigationActiveColor : "";
	}
	const navigationAttr = {
		onMouseover: (event) => navigationHover(event, "over"),
		onMouseout: (event) => navigationHover(event, "out")
	};
	function navigationClick($event, type, disabled) {
		$event.stopPropagation();
		if (disabled) return;
		const swiperItemLength = swiperContext.value.length;
		let _current = state.current;
		switch (type) {
			case "prev":
				_current--;
				if (_current < 0 && circularEnabled.value) _current = swiperItemLength - 1;
				break;
			case "next":
				_current++;
				if (_current >= swiperItemLength && circularEnabled.value) _current = 0;
				break;
		}
		onSwiperDotClick(_current);
	}
	const createNavigationSVG = () => createSvgIconVNode(ICON_PATH_BACK, props$26.navigationColor, 26);
	let setHideNavigationTimer;
	const _mousemove = (e$1) => {
		clearTimeout(setHideNavigationTimer);
		const { clientX, clientY } = e$1;
		const { left, right, top, bottom, width, height } = rootRef.value.getBoundingClientRect();
		let hide = false;
		if (props$26.vertical) hide = !(clientY - top < height / 3 || bottom - clientY < height / 3);
		else hide = !(clientX - left < width / 3 || right - clientX < width / 3);
		if (hide) return setHideNavigationTimer = setTimeout(() => {
			hideNavigation.value = hide;
		}, 300);
		hideNavigation.value = hide;
	};
	const _mouseleave = () => {
		hideNavigation.value = true;
	};
	function swiperAddMouseEvent() {
		if (rootRef.value) {
			rootRef.value.removeEventListener("mousemove", _mousemove);
			rootRef.value.removeEventListener("mouseleave", _mouseleave);
			if (isNavigationAuto) {
				rootRef.value.addEventListener("mousemove", _mousemove);
				rootRef.value.addEventListener("mouseleave", _mouseleave);
			}
		}
	}
	function createNavigationTsx() {
		const navigationClass = {
			"uni-swiper-navigation-hide": hideNavigation.value,
			"uni-swiper-navigation-vertical": props$26.vertical
		};
		if (props$26.navigation) return (0, vue.createVNode)(vue.Fragment, null, [(0, vue.createVNode)("div", (0, vue.mergeProps)({
			"class": ["uni-swiper-navigation uni-swiper-navigation-prev", (0, __vue_shared.extend)({ "uni-swiper-navigation-disabled": prevDisabled }, navigationClass)],
			"onClick": (e$1) => navigationClick(e$1, "prev", prevDisabled)
		}, navigationAttr), [createNavigationSVG()], 16, ["onClick"]), (0, vue.createVNode)("div", (0, vue.mergeProps)({
			"class": ["uni-swiper-navigation uni-swiper-navigation-next", (0, __vue_shared.extend)({ "uni-swiper-navigation-disabled": nextDisabled }, navigationClass)],
			"onClick": (e$1) => navigationClick(e$1, "next", nextDisabled)
		}, navigationAttr), [createNavigationSVG()], 16, ["onClick"])]);
		return null;
	}
	return createNavigationTsx;
};
var props$12 = { itemId: {
	type: String,
	default: ""
} };
var swiper_item_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "SwiperItem",
	props: props$12,
	setup(props$26, { slots }) {
		const rootRef = (0, vue.ref)(null);
		return () => {
			return (0, vue.createVNode)("uni-swiper-item", {
				"ref": rootRef,
				"style": {
					position: "absolute",
					width: "100%",
					height: "100%"
				}
			}, [slots.default && slots.default()], 512);
		};
	}
});
var props$11 = {
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
		default: ""
	}
};
var switch_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Switch",
	props: props$11,
	emits: ["change"],
	setup(props$26, { emit: emit$2 }) {
		const rootRef = (0, vue.ref)(null);
		const switchChecked = (0, vue.ref)(props$26.checked);
		const uniLabel = useSwitchInject(props$26, switchChecked);
		const trigger = useCustomEvent(rootRef, emit$2);
		(0, vue.watch)(() => props$26.checked, (val) => {
			switchChecked.value = val;
		});
		const _onClick = ($event) => {
			if (props$26.disabled) return;
			switchChecked.value = !switchChecked.value;
			trigger("change", $event, { value: switchChecked.value });
		};
		if (!!uniLabel) uniLabel.addHandler(_onClick);
		return () => {
			const { color, type } = props$26;
			const booleanAttrs = useBooleanAttr(props$26, "disabled");
			const switchInputStyle = {};
			if (color && switchChecked.value) {
				switchInputStyle["backgroundColor"] = color;
				switchInputStyle["borderColor"] = color;
			}
			let realCheckValue;
			realCheckValue = switchChecked.value;
			return (0, vue.createVNode)("uni-switch", (0, vue.mergeProps)({
				"id": props$26.id,
				"ref": rootRef
			}, booleanAttrs, { "onClick": _onClick }), [(0, vue.createVNode)("div", { "class": "uni-switch-wrapper" }, [(0, vue.withDirectives)((0, vue.createVNode)("div", {
				"class": ["uni-switch-input", [switchChecked.value ? "uni-switch-input-checked" : ""]],
				"style": switchInputStyle
			}, null, 6), [[vue.vShow, type === "switch"]]), (0, vue.withDirectives)((0, vue.createVNode)("div", { "class": "uni-checkbox-input" }, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props$26.color, 22) : ""], 512), [[vue.vShow, type === "checkbox"]])])], 16, ["id", "onClick"]);
		};
	}
});
function useSwitchInject(props$26, switchChecked) {
	const uniForm = (0, vue.inject)(uniFormKey, false);
	const uniLabel = (0, vue.inject)(uniLabelKey, false);
	const formField = {
		submit: () => {
			const data = ["", null];
			if (props$26.name) {
				data[0] = props$26.name;
				data[1] = switchChecked.value;
			}
			return data;
		},
		reset: () => {
			switchChecked.value = false;
		}
	};
	if (!!uniForm) uniForm.addField(formField);
	return uniLabel;
}
var SPACE_UNICODE = {
	ensp: " ",
	emsp: " ",
	nbsp: "\xA0"
};
function normalizeText(text, { space, decode }) {
	let result = "";
	let isEscape = false;
	for (let char of text) {
		if (space && SPACE_UNICODE[space] && char === " ") char = SPACE_UNICODE[space];
		if (isEscape) {
			if (char === "n") result += __dcloudio_uni_shared.LINEFEED;
			else if (char === "\\") result += "\\";
			else result += "\\" + char;
			isEscape = false;
		} else if (char === "\\") isEscape = true;
		else result += char;
	}
	if (!decode) return result;
	return result.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(/&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&apos;/g, "'");
}
function parseText(text, options) {
	return normalizeText(text, options).split(__dcloudio_uni_shared.LINEFEED);
}
var text_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Text",
	props: {
		selectable: {
			type: [Boolean, String],
			default: false
		},
		space: {
			type: String,
			default: ""
		},
		decode: {
			type: [Boolean, String],
			default: false
		}
	},
	setup(props$26, { slots }) {
		const rootRef = (0, vue.ref)(null);
		return () => {
			const children = [];
			if (slots.default) slots.default().forEach((vnode) => {
				if (vnode.shapeFlag & 8 && vnode.type !== vue.Comment) {
					let lines = [];
					lines = parseText(vnode.children, {
						space: props$26.space,
						decode: props$26.decode
					});
					const len = lines.length - 1;
					lines.forEach((line, index$1) => {
						if (index$1 === 0 && !line) {} else children.push((0, vue.createTextVNode)(line));
						if (index$1 !== len) children.push((0, vue.createVNode)("br"));
					});
				} else {
					if (process.env.NODE_ENV !== "production" && vnode.shapeFlag & 6 && vnode.type.name !== "Text") console.warn("Do not nest other components in the text component, as there may be display differences on different platforms.");
					children.push(vnode);
				}
			});
			return (0, vue.createVNode)("uni-text", {
				"ref": rootRef,
				"selectable": props$26.selectable ? true : null
			}, [(0, vue.createVNode)("span", null, children)], 8, ["selectable"]);
		};
	}
});
var props$10 = /* @__PURE__ */ (0, __vue_shared.extend)({}, props$9, {
	placeholderClass: {
		type: String,
		default: "input-placeholder"
	},
	autoHeight: {
		type: [Boolean, String],
		default: false
	},
	confirmType: {
		type: String,
		default: "return",
		validator(val) {
			return ConfirmTypes.concat("return").includes(val);
		}
	}
});
var fixMargin = false;
var ConfirmTypes = [
	"done",
	"go",
	"next",
	"search",
	"send"
];
var textarea_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Textarea",
	props: props$10,
	emits: [
		"confirm",
		"change",
		"linechange",
		...emit
	],
	setup(props$26, { emit: emit$2, expose }) {
		const rootRef = (0, vue.ref)(null);
		const wrapperRef = (0, vue.ref)(null);
		const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } = useField(props$26, rootRef, emit$2);
		const valueCompute = (0, vue.computed)(() => state.value.split(__dcloudio_uni_shared.LINEFEED));
		const isDone = (0, vue.computed)(() => ConfirmTypes.includes(props$26.confirmType));
		const heightRef = (0, vue.ref)(0);
		const lineRef = (0, vue.ref)(null);
		(0, vue.watch)(() => heightRef.value, (height) => {
			const el = rootRef.value;
			const lineEl = lineRef.value;
			const wrapper$1 = wrapperRef.value;
			let lineHeight = parseFloat(getComputedStyle(el).lineHeight);
			if (isNaN(lineHeight)) lineHeight = lineEl.offsetHeight;
			var lineCount = Math.round(height / lineHeight);
			trigger("linechange", {}, {
				height,
				heightRpx: 750 / window.innerWidth * height,
				lineCount
			});
			if (props$26.autoHeight) wrapper$1.style.height = height + "px";
		});
		function onResize({ height }) {
			heightRef.value = height;
		}
		function onChange$1(event) {}
		function confirm(event) {
			trigger("confirm", event, { value: state.value });
		}
		function onKeyDownEnter(event) {
			if (event.key !== "Enter") return;
			if (isDone.value) event.preventDefault();
		}
		function onKeyUpEnter(event) {
			if (event.key !== "Enter") return;
			if (isDone.value) {
				confirm(event);
				const textarea = event.target;
				!props$26.confirmHold && textarea.blur();
			}
		}
		expose({ $triggerInput: (detail) => {
			emit$2("update:modelValue", detail.value);
			emit$2("update:value", detail.value);
			state.value = detail.value;
		} });
		return () => {
			let textareaNode = props$26.disabled && fixDisabledColor ? (0, vue.createVNode)("textarea", {
				"key": "disabled-textarea",
				"ref": fieldRef,
				"value": state.value,
				"tabindex": "-1",
				"readonly": !!props$26.disabled,
				"maxlength": state.maxlength,
				"class": {
					"uni-textarea-textarea": true,
					"uni-textarea-textarea-fix-margin": fixMargin
				},
				"style": {
					overflowY: props$26.autoHeight ? "hidden" : "auto",
					...props$26.cursorColor && { caretColor: props$26.cursorColor }
				},
				"onFocus": (event) => event.target.blur()
			}, null, 46, [
				"value",
				"readonly",
				"maxlength",
				"onFocus"
			]) : (0, vue.createVNode)("textarea", {
				"key": "textarea",
				"ref": fieldRef,
				"value": state.value,
				"disabled": !!props$26.disabled,
				"maxlength": state.maxlength,
				"enterkeyhint": props$26.confirmType,
				"inputmode": props$26.inputmode,
				"class": {
					"uni-textarea-textarea": true,
					"uni-textarea-textarea-fix-margin": fixMargin
				},
				"style": {
					overflowY: props$26.autoHeight ? "hidden" : "auto",
					...props$26.cursorColor && { caretColor: props$26.cursorColor }
				},
				"onKeydown": onKeyDownEnter,
				"onKeyup": onKeyUpEnter,
				"onChange": onChange$1
			}, null, 46, [
				"value",
				"disabled",
				"maxlength",
				"enterkeyhint",
				"inputmode",
				"onKeydown",
				"onKeyup",
				"onChange"
			]);
			return (0, vue.createVNode)("uni-textarea", {
				"ref": rootRef,
				"auto-height": props$26.autoHeight
			}, [(0, vue.createVNode)("div", {
				"ref": wrapperRef,
				"class": "uni-textarea-wrapper"
			}, [
				(0, vue.withDirectives)((0, vue.createVNode)("div", (0, vue.mergeProps)(scopedAttrsState.attrs, {
					"style": props$26.placeholderStyle,
					"class": ["uni-textarea-placeholder", props$26.placeholderClass]
				}), [props$26.placeholder], 16), [[vue.vShow, !state.value.length]]),
				(0, vue.createVNode)("div", {
					"ref": lineRef,
					"class": "uni-textarea-line"
				}, [" "], 512),
				(0, vue.createVNode)("div", { "class": {
					"uni-textarea-compute": true,
					"uni-textarea-compute-auto-height": props$26.autoHeight
				} }, [valueCompute.value.map((item) => (0, vue.createVNode)("div", null, [item.trim() ? item : "."])), (0, vue.createVNode)(resize_sensor_default, {
					"initial": true,
					"onResize": onResize
				}, null, 8, ["initial", "onResize"])], 2),
				props$26.confirmType === "search" ? (0, vue.createVNode)("form", {
					"action": "",
					"onSubmit": () => false,
					"class": "uni-input-form"
				}, [textareaNode], 40, ["onSubmit"]) : textareaNode
			], 512)], 8, ["auto-height"]);
		};
	}
});
var view_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "View",
	props: /* @__PURE__ */ (0, __vue_shared.extend)({}, hoverProps),
	setup(props$26, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const { hovering, binding } = useHover(props$26);
		return () => {
			const hoverClass = props$26.hoverClass;
			if (hoverClass && hoverClass !== "none") return (0, vue.createVNode)("uni-view", (0, vue.mergeProps)({
				"class": hovering.value ? hoverClass : "",
				"ref": rootRef
			}, binding), [(0, vue.renderSlot)(slots, "default")], 16);
			return (0, vue.createVNode)("uni-view", { "ref": rootRef }, [(0, vue.renderSlot)(slots, "default")], 512);
		};
	}
});
function useSubscribe(callback, name, multiple, pageId) {
	(0, vue.getCurrentInstance)().proxy;
	pageId = pageId == null ? useCurrentPageId() : pageId;
}
function useOn(name, callback) {}
var index = 0;
function useContextInfo(_id) {
	useCurrentPageId();
	const vm = (0, vue.getCurrentInstance)().proxy;
	return `${vm.$options.name.toLowerCase()}.${_id || vm.id || `context${index++}`}`;
}
function injectLifecycleHook(name, hook, publicThis, instance$1) {
	if ((0, __vue_shared.isFunction)(hook)) (0, vue.injectHook)(name, hook.bind(publicThis), instance$1);
}
function initHooks(options, instance$1, publicThis) {
	const mpType = options.mpType || publicThis.$mpType;
	if (!mpType || mpType === "component" || mpType === "page" && instance$1.renderer === "component") return;
	Object.keys(options).forEach((name) => {
		if ((0, __dcloudio_uni_shared.isUniLifecycleHook)(name, options[name], false)) {
			const hooks = options[name];
			if ((0, __vue_shared.isArray)(hooks)) hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance$1));
			else injectLifecycleHook(name, hooks, publicThis, instance$1);
		}
	});
	if (mpType === "page") {
		instance$1.__isVisible = true;
		try {
			let query = instance$1.attrs.__pageQuery;
			invokeHook(publicThis, __dcloudio_uni_shared.ON_LOAD, query);
			if (!instance$1.vapor) delete instance$1.attrs.__pageQuery;
			const $basePage = publicThis.$page;
			if (($basePage === null || $basePage === void 0 ? void 0 : $basePage.openType) !== "preloadPage") invokeHook(publicThis, __dcloudio_uni_shared.ON_SHOW);
		} catch (e$1) {
			console.error(e$1.message + __dcloudio_uni_shared.LINEFEED + e$1.stack);
		}
	}
}
function applyOptions(options, instance$1, publicThis) {
	initHooks(options, instance$1, publicThis);
}
function set(target, key, val) {
	return target[key] = val;
}
function $callMethod(method, ...args) {
	const fn = this[method];
	if (fn) return fn(...args);
	console.error(`method ${method} not found`);
	return null;
}
function createErrorHandler(app) {
	const userErrorHandler = app.config.errorHandler;
	return function errorHandler(err, instance$1, info) {
		if (userErrorHandler) userErrorHandler(err, instance$1, info);
		const appInstance = app._instance;
		if (!appInstance || !appInstance.proxy) throw err;
		if (appInstance[__dcloudio_uni_shared.ON_ERROR]) invokeHook(appInstance.proxy, __dcloudio_uni_shared.ON_ERROR, err);
		else (0, vue.logError)(err, info, instance$1 ? instance$1.$.vnode : null, false);
	};
}
function mergeAsArray(to, from) {
	return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
	__dcloudio_uni_shared.UniLifecycleHooks.forEach((name) => {
		optionMergeStrategies[name] = mergeAsArray;
	});
}
var realAtob;
var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") realAtob = function(str) {
	str = String(str).replace(/[\t\n\f\r ]+/g, "");
	if (!b64re.test(str)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
	str += "==".slice(2 - (str.length & 3));
	var bitmap;
	var result = "";
	var r1;
	var r2;
	var i = 0;
	for (; i < str.length;) {
		bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
		result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
	}
	return result;
};
else realAtob = atob;
function b64DecodeUnicode(str) {
	return decodeURIComponent(realAtob(str).split("").map(function(c) {
		return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(""));
}
function getCurrentUserInfo() {
	const token = uni.getStorageSync("uni_id_token") || "";
	const tokenArr = token.split(".");
	if (!token || tokenArr.length !== 3) return {
		uid: null,
		role: [],
		permission: [],
		tokenExpired: 0
	};
	let userInfo;
	try {
		userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
	} catch (error) {
		throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
	}
	userInfo.tokenExpired = userInfo.exp * 1e3;
	delete userInfo.exp;
	delete userInfo.iat;
	return userInfo;
}
function uniIdMixin(globalProperties) {
	globalProperties.uniIDHasRole = function(roleId) {
		const { role } = getCurrentUserInfo();
		return role.indexOf(roleId) > -1;
	};
	globalProperties.uniIDHasPermission = function(permissionId) {
		const { permission } = getCurrentUserInfo();
		return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
	};
	globalProperties.uniIDTokenValid = function() {
		const { tokenExpired } = getCurrentUserInfo();
		return tokenExpired > Date.now();
	};
}
function initApp$1(app) {
	const appConfig = app.config;
	appConfig.errorHandler = (0, __dcloudio_uni_shared.invokeCreateErrorHandler)(app, createErrorHandler);
	initOptionMergeStrategies(appConfig.optionMergeStrategies);
	const globalProperties = appConfig.globalProperties;
	if (__UNI_FEATURE_UNI_CLOUD__) uniIdMixin(globalProperties);
	globalProperties.$set = set;
	globalProperties.$applyOptions = applyOptions;
	globalProperties.$callMethod = $callMethod;
	(0, __dcloudio_uni_shared.invokeCreateVueAppHook)(app);
}
function initRouter(app) {
	const router = (0, vue_router.createRouter)(createRouterOptions());
	router.beforeEach((to, from) => {
		if (to && from && to.meta.isTabBar && from.meta.isTabBar) saveTabBarScrollPosition(from.meta.tabBarIndex);
	});
	app.router = router;
	app.use(router);
}
var positionStore = Object.create(null);
function getTabBarScrollPosition(id$1) {
	return positionStore[id$1];
}
function saveTabBarScrollPosition(id$1) {
	if (typeof window !== "undefined") positionStore[id$1] = {
		left: window.pageXOffset,
		top: window.pageYOffset
	};
}
var scrollBehavior = (to, from, savedPosition) => {
	if (savedPosition) return savedPosition;
	else {
		if (to && from && to.meta.isTabBar && from.meta.isTabBar) {
			const position = getTabBarScrollPosition(to.meta.tabBarIndex);
			if (position) return position;
		}
		return {
			left: 0,
			top: 0
		};
	}
};
function createRouterOptions() {
	return {
		history: initHistory(),
		strict: !!__uniConfig.router.strict,
		routes: __uniRoutes,
		scrollBehavior
	};
}
function initHistory() {
	let { routerBase } = __uniConfig.router;
	if (routerBase === "/") routerBase = "";
	return (0, vue_router.createMemoryHistory)(routerBase);
}
var plugin_default = { install(app) {
	initApp$1(app);
	if (!app.config.warnHandler) app.config.warnHandler = warnHandler;
	if (__UNI_FEATURE_PAGES__) initRouter(app);
} };
function warnHandler(msg, instance$1, trace) {
	if (instance$1) {
		if ("PageMetaHead" === instance$1.$.type.name) return;
		const parent = instance$1.$.parent;
		if (parent && parent.type.name === "PageMeta") return;
	}
	const warnArgs = [`[Vue warn]: ${msg}`];
	if (trace.length) warnArgs.push(`\n`, trace);
	console.warn(...warnArgs);
}
var clazz = { class: "uni-async-loading" };
var loadingVNode = /* @__PURE__ */ (0, vue.createVNode)("i", { class: "uni-loading" }, null, -1);
var async_loading_default = /* @__PURE__ */ defineSystemComponent({
	name: "AsyncLoading",
	render() {
		return (0, vue.openBlock)(), (0, vue.createBlock)("div", clazz, [loadingVNode]);
	}
});
function reload() {
	window.location.reload();
}
var async_error_default = /* @__PURE__ */ defineSystemComponent({
	name: "AsyncError",
	props: ["error"],
	setup() {
		initI18nAsyncMsgsOnce();
		const { t: t$1 } = useI18n();
		return () => (0, vue.createVNode)("div", {
			"class": "uni-async-error",
			"onClick": reload
		}, [t$1("uni.async.error")], 8, ["onClick"]);
	}
});
var appVm;
function getApp$1() {
	return appVm;
}
function initApp(vm) {
	appVm = vm;
	Object.defineProperty(appVm.$.ctx, "$children", { get() {
		return getCurrentBasePages().map((page) => page.$vm);
	} });
	const app = appVm.$.appContext.app;
	if (!app.component(async_loading_default.name)) app.component(async_loading_default.name, async_loading_default);
	if (!app.component(async_error_default.name)) app.component(async_error_default.name, async_error_default);
	initAppVm(appVm);
	defineGlobalData(appVm);
}
function wrapperComponentSetup(comp, { type, clone, init: init$1, setup, before, options }) {
	if (clone) comp = (0, __vue_shared.extend)({}, comp);
	before && before(comp);
	const oldSetup = comp.setup;
	comp.setup = (props$26, ctx) => {
		const instance$1 = (0, vue.getCurrentInstance)();
		init$1(instance$1.proxy);
		setup(instance$1);
		if (oldSetup) return oldSetup(props$26, ctx);
	};
	return comp;
}
function setupComponent(comp, options) {
	if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) return wrapperComponentSetup(comp.default, options);
	return wrapperComponentSetup(comp, options);
}
function setupWindow(comp, id$1) {
	return setupComponent(comp, {
		type: "window",
		init: (vm) => {
			vm.$page = { id: id$1 };
		},
		setup(instance$1) {
			instance$1.$pageInstance = instance$1;
		}
	});
}
function setupPage(comp, path) {
	if (process.env.NODE_ENV !== "production") comp.__mpType = "page";
	return setupComponent(comp, {
		type: "page",
		clone: true,
		init: initPage,
		setup(instance$1) {
			instance$1.$pageInstance = instance$1;
			const query = (0, __dcloudio_uni_shared.decodedQuery)(usePageRoute().query);
			instance$1.attrs.__pageQuery = query;
			getPage$BasePage(instance$1.proxy).options = query;
			instance$1.proxy.options = query;
			return query;
		}
	});
}
function setupApp(comp) {
	if (process.env.NODE_ENV !== "production") comp.__mpType = "app";
	return setupComponent(comp, {
		init: initApp,
		setup(instance$1) {
			return usePageRoute().query;
		},
		before(comp$1) {
			comp$1.mpType = "app";
			const { setup } = comp$1;
			const render = () => {
				return (0, vue.openBlock)(), (0, vue.createBlock)(layout_default);
			};
			comp$1.setup = (props$26, ctx) => {
				const res = setup && setup(props$26, ctx);
				return (0, __vue_shared.isFunction)(res) ? render : res;
			};
			comp$1.render = render;
		}
	});
}
function formatTime(val) {
	val = val > 0 && val < Infinity ? val : 0;
	const h$2 = Math.floor(val / 3600);
	const m = Math.floor(val % 3600 / 60);
	const s = Math.floor(val % 3600 % 60);
	const hStr = (h$2 < 10 ? "0" : "") + h$2;
	const mStr = (m < 10 ? "0" : "") + m;
	const sStr = (s < 10 ? "0" : "") + s;
	let str = mStr + ":" + sStr;
	if (hStr !== "00") str = hStr + ":" + str;
	return str;
}
function useGesture(props$26, videoState, videoRef, fullscreenState) {
	const state = (0, vue.reactive)({
		seeking: false,
		gestureType: "none",
		volumeOld: 0,
		volumeNew: 0,
		currentTimeOld: 0,
		currentTimeNew: 0,
		toastThin: false
	});
	const touchStartOrigin = {
		x: 0,
		y: 0
	};
	let changeToastThinTimer = null;
	const changeToastThin = () => {
		if (state.gestureType !== "none" && changeToastThinTimer != null) return;
		changeToastThinTimer = setTimeout(() => {
			state.toastThin = true;
		}, 500);
	};
	let showToastTimer = void 0;
	function changeShowToast() {
		if (showToastTimer != void 0) return;
		showToastTimer = setTimeout(() => {
			state.toastThin = false;
			showToastTimer = void 0;
		}, 1e3);
	}
	function clearChangeShowToast() {
		clearTimeout(showToastTimer);
		showToastTimer = void 0;
	}
	function onTouchstart(event) {
		const toucher = event.targetTouches[0];
		touchStartOrigin.x = toucher.pageX;
		touchStartOrigin.y = toucher.pageY;
		state.gestureType = "none";
		state.volumeOld = 0;
	}
	function onTouchmove(event) {
		function stop() {
			event.stopPropagation();
			event.preventDefault();
		}
		if (fullscreenState.fullscreen) stop();
		const gestureType = state.gestureType;
		if (gestureType === "stop") return;
		const toucher = event.targetTouches[0];
		const pageX = toucher.pageX;
		const pageY = toucher.pageY;
		const origin = touchStartOrigin;
		const video = videoRef.value;
		if (gestureType === "progress") {
			changeProgress(pageX - origin.x);
			state.seeking = true;
		} else if (gestureType === "volume") changeVolume(pageY - origin.y);
		if (gestureType !== "none") return;
		if (Math.abs(pageX - origin.x) > Math.abs(pageY - origin.y)) {
			if (!props$26.enableProgressGesture) {
				state.gestureType = "stop";
				return;
			}
			state.gestureType = "progress";
			state.currentTimeOld = state.currentTimeNew = video.currentTime;
			if (!fullscreenState.fullscreen) stop();
		} else {
			if (!props$26.pageGesture && !props$26.vslideGesture) {
				state.gestureType = "stop";
				return;
			}
			changeToastThin();
			state.gestureType = "volume";
			state.volumeOld = video.volume;
			if (!fullscreenState.fullscreen) stop();
		}
	}
	function onTouchend(event) {
		const video = videoRef.value;
		if (state.gestureType !== "none" && state.gestureType !== "stop") {
			event.stopPropagation();
			event.preventDefault();
		}
		if (state.gestureType === "progress" && state.currentTimeOld !== state.currentTimeNew) video.currentTime = state.currentTimeNew;
		state.gestureType = "none";
	}
	function changeProgress(x) {
		const duration = videoState.currentDuration;
		let currentTimeNew = x / 600 * duration + state.currentTimeOld;
		if (currentTimeNew < 0) currentTimeNew = 0;
		else if (currentTimeNew > duration) currentTimeNew = duration;
		state.currentTimeNew = currentTimeNew;
	}
	function changeVolume(y) {
		const video = videoRef.value;
		const valueOld = state.volumeOld;
		let value;
		if (typeof valueOld === "number") {
			value = valueOld - y / 200;
			if (value < 0) value = 0;
			else if (value > 1) value = 1;
			clearChangeShowToast();
			changeShowToast();
			video.volume = value;
			state.volumeNew = value;
		}
	}
	return {
		state,
		onTouchstart,
		onTouchmove,
		onTouchend
	};
}
function useFullscreen(trigger, containerRef, videoRef, userActionState, rootRef) {
	const state = (0, vue.reactive)({ fullscreen: false });
	const isSafari = /^Apple/.test(navigator.vendor);
	function onFullscreenChange($event, webkit) {
		if (webkit && document.fullscreenEnabled) return;
		emitFullscreenChange(!!(document.fullscreenElement || document.webkitFullscreenElement));
	}
	function emitFullscreenChange(val) {
		state.fullscreen = val;
		trigger("fullscreenchange", {}, {
			fullScreen: val,
			direction: "vertical"
		});
	}
	function toggleFullscreen(val) {
		const root = rootRef.value;
		const container = containerRef.value;
		const video = videoRef.value;
		let mockFullScreen;
		if (val) if ((document.fullscreenEnabled || document.webkitFullscreenEnabled) && (!isSafari || userActionState.userAction)) container[document.fullscreenEnabled ? "requestFullscreen" : "webkitRequestFullscreen"]();
		else if (video.webkitEnterFullScreen) video.webkitEnterFullScreen();
		else {
			mockFullScreen = true;
			container.remove();
			container.classList.add("uni-video-type-fullscreen");
			document.body.appendChild(container);
		}
		else if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
			if (document.fullscreenElement) document.exitFullscreen();
			else if (document.webkitFullscreenElement) document.webkitExitFullscreen();
		} else if (video.webkitExitFullScreen) video.webkitExitFullScreen();
		else {
			mockFullScreen = true;
			container.remove();
			container.classList.remove("uni-video-type-fullscreen");
			root.appendChild(container);
		}
		if (mockFullScreen) emitFullscreenChange(val);
	}
	function requestFullScreen() {
		toggleFullscreen(true);
	}
	function exitFullScreen() {
		toggleFullscreen(false);
	}
	return {
		state,
		onFullscreenChange,
		emitFullscreenChange,
		toggleFullscreen,
		requestFullScreen,
		exitFullScreen
	};
}
function useVideo(props$26, attrs$1, trigger) {
	const videoRef = (0, vue.ref)(null);
	const src = (0, vue.computed)(() => getRealPath(props$26.src));
	const muted = (0, vue.computed)(() => props$26.muted === "true" || props$26.muted === true);
	const state = (0, vue.reactive)({
		start: false,
		src,
		playing: false,
		currentTime: 0,
		duration: 0,
		currentDuration: 0,
		progress: 0,
		buffered: 0,
		muted,
		pauseUpdatingCurrentTime: false
	});
	(0, vue.watch)(() => src.value, () => {
		state.playing = false;
		state.currentTime = 0;
	});
	(0, vue.watch)(() => state.buffered, (buffered) => {
		trigger("progress", {}, { buffered });
	});
	(0, vue.watch)(() => muted.value, (muted$1) => {
		const video = videoRef.value;
		video.muted = muted$1;
	});
	(0, vue.watch)([() => state.duration, () => props$26.duration], () => {
		let _duration = Number(props$26.duration);
		isNaN(_duration) && (_duration = 0);
		state.currentDuration = _duration > 0 ? _duration : state.duration;
	});
	function onDurationChange({ target }) {
		state.duration = target.duration;
	}
	function onLoadedMetadata($event) {
		const initialTime = Number(props$26.initialTime) || 0;
		const video = $event.target;
		if (initialTime > 0) video.currentTime = initialTime;
		trigger("loadedmetadata", $event, {
			width: video.videoWidth,
			height: video.videoHeight,
			duration: video.duration
		});
		onProgress($event);
	}
	function onProgress($event) {
		const video = $event.target;
		const buffered = video.buffered;
		if (buffered.length) state.buffered = buffered.end(buffered.length - 1) / video.duration * 100;
	}
	function onWaiting($event) {
		trigger("waiting", $event, {});
	}
	function onVideoError($event) {
		state.playing = false;
		trigger("error", $event, {});
	}
	function onPlay($event) {
		state.start = true;
		state.playing = true;
		trigger("play", $event, {});
	}
	function onPause($event) {
		state.playing = false;
		trigger("pause", $event, {});
	}
	function onEnded($event) {
		state.playing = false;
		trigger("ended", $event, {});
	}
	function onTimeUpdate($event) {
		const video = $event.target;
		if (!state.pauseUpdatingCurrentTime) state.currentTime = video.currentTime;
		const currentTime = video.currentTime;
		trigger("timeupdate", $event, {
			currentTime,
			duration: video.duration
		});
	}
	function toggle() {
		const video = videoRef.value;
		if (state.playing) video.pause();
		else video.play();
	}
	function play() {
		const video = videoRef.value;
		state.start = true;
		video.play();
	}
	function pause() {
		videoRef.value.pause();
	}
	function seek(position) {
		const video = videoRef.value;
		position = Number(position);
		if (typeof position === "number" && !isNaN(position)) video.currentTime = position;
	}
	function stop() {
		seek(0);
		pause();
	}
	function playbackRate(rate) {
		const video = videoRef.value;
		video.playbackRate = rate;
	}
	return {
		videoRef,
		state,
		play,
		pause,
		stop,
		seek,
		playbackRate,
		toggle,
		onDurationChange,
		onLoadedMetadata,
		onProgress,
		onWaiting,
		onVideoError,
		onPlay,
		onPause,
		onEnded,
		onTimeUpdate
	};
}
function useControls(props$26, videoState, seek, seeking) {
	const progressRef = (0, vue.ref)(null);
	const ballRef = (0, vue.ref)(null);
	const centerPlayBtnShow = (0, vue.computed)(() => props$26.showCenterPlayBtn && !videoState.start);
	const controlsVisible = (0, vue.ref)(true);
	const state = (0, vue.reactive)({
		seeking: false,
		touching: false,
		controlsTouching: false,
		centerPlayBtnShow,
		controlsShow: (0, vue.computed)(() => !centerPlayBtnShow.value && props$26.controls && controlsVisible.value),
		controlsVisible
	});
	function clickProgress(event) {
		const $progress = progressRef.value;
		let element = event.target;
		let x = event.offsetX;
		while (element && element !== $progress) {
			x += element.offsetLeft;
			element = element.parentNode;
		}
		const w = $progress.offsetWidth;
		let progress = 0;
		if (x >= 0 && x <= w) {
			progress = x / w;
			seek(videoState.currentDuration * progress);
		}
	}
	function toggleControls() {
		state.controlsVisible = !state.controlsVisible;
	}
	let hideTiming;
	function autoHideStart() {
		hideTiming = setTimeout(() => {
			state.controlsVisible = false;
		}, 3e3);
	}
	function autoHideEnd() {
		if (hideTiming) {
			clearTimeout(hideTiming);
			hideTiming = null;
		}
	}
	(0, vue.watch)(() => state.controlsShow && videoState.playing && !state.controlsTouching, (val) => {
		if (val) autoHideStart();
		else autoHideEnd();
	});
	return {
		state,
		progressRef,
		ballRef,
		clickProgress,
		toggleControls,
		autoHideStart,
		autoHideEnd
	};
}
function useDanmu(props$26, videoState) {
	const danmuRef = (0, vue.ref)(null);
	const state = (0, vue.reactive)({ enable: Boolean(props$26.enableDanmu) });
	let danmuIndex = {
		time: 0,
		index: -1
	};
	const danmuList = (0, __vue_shared.isArray)(props$26.danmuList) ? JSON.parse(JSON.stringify(props$26.danmuList)) : [];
	danmuList.sort(function(a, b) {
		return (a.time || 0) - (b.time || 0);
	});
	function toggleDanmu() {
		state.enable = !state.enable;
	}
	function updateDanmu(event) {
		const currentTime = event.target.currentTime;
		const oldDanmuIndex = danmuIndex;
		const newDanmuIndex = {
			time: currentTime,
			index: oldDanmuIndex.index
		};
		if (currentTime > oldDanmuIndex.time) for (let index$1 = oldDanmuIndex.index + 1; index$1 < danmuList.length; index$1++) {
			const element = danmuList[index$1];
			if (currentTime >= (element.time || 0)) {
				newDanmuIndex.index = index$1;
				if (videoState.playing && state.enable) playDanmu(element);
			} else break;
		}
		else if (currentTime < oldDanmuIndex.time) for (let index$1 = oldDanmuIndex.index - 1; index$1 > -1; index$1--) if (currentTime <= (danmuList[index$1].time || 0)) newDanmuIndex.index = index$1 - 1;
		else break;
		danmuIndex = newDanmuIndex;
	}
	function playDanmu(danmu) {
		const p$1 = document.createElement("p");
		p$1.className = "uni-video-danmu-item";
		p$1.innerText = danmu.text;
		let style = `bottom: ${Math.random() * 100}%;color: ${danmu.color};`;
		p$1.setAttribute("style", style);
		danmuRef.value.appendChild(p$1);
		setTimeout(function() {
			style += "left: 0;-webkit-transform: translateX(-100%);transform: translateX(-100%);";
			p$1.setAttribute("style", style);
			setTimeout(function() {
				p$1.remove();
			}, 4e3);
		}, 17);
	}
	function sendDanmu(danmu) {
		danmuList.splice(danmuIndex.index + 1, 0, {
			text: String(danmu.text),
			color: danmu.color,
			time: videoState.currentTime || 0
		});
	}
	return {
		state,
		danmuRef,
		updateDanmu,
		toggleDanmu,
		sendDanmu
	};
}
function useContext(play, pause, stop, seek, sendDanmu, playbackRate, requestFullScreen, exitFullScreen) {
	const methods = {
		play,
		stop,
		pause,
		seek,
		sendDanmu,
		playbackRate,
		requestFullScreen,
		exitFullScreen
	};
	useSubscribe((type, data) => {
		let options;
		switch (type) {
			case "seek":
				options = data.position;
				break;
			case "sendDanmu":
				options = data;
				break;
			case "playbackRate":
				options = data.rate;
				break;
		}
		if (type in methods) methods[type](options);
	}, useContextInfo(), true);
}
function useProgressing(videoState, gestureState, controlsState, autoHideEnd, autoHideStart) {
	const progressing = (0, vue.computed)(() => gestureState.gestureType === "progress" || controlsState.touching);
	(0, vue.watch)(progressing, (val) => {
		videoState.pauseUpdatingCurrentTime = val;
		controlsState.controlsTouching = val;
		if (gestureState.gestureType === "progress" && val) controlsState.controlsVisible = val;
	});
	(0, vue.watch)([() => videoState.currentTime, () => videoState.currentDuration], () => {
		if (videoState.currentDuration > 0) videoState.progress = videoState.currentTime / videoState.currentDuration * 100;
		else videoState.progress = 0;
		videoState.progress > 100 && (videoState.progress = 100);
	}, { immediate: true });
	(0, vue.watch)(() => gestureState.currentTimeNew, (currentTimeNew) => {
		videoState.currentTime = currentTimeNew;
	});
	return progressing;
}
var props$8 = {
	id: {
		type: String,
		default: ""
	},
	src: {
		type: String,
		default: ""
	},
	duration: {
		type: [Number, String],
		default: ""
	},
	controls: {
		type: [Boolean, String],
		default: true
	},
	danmuList: {
		type: Array,
		default() {
			return [];
		}
	},
	danmuBtn: {
		type: [Boolean, String],
		default: false
	},
	enableDanmu: {
		type: [Boolean, String],
		default: false
	},
	autoplay: {
		type: [Boolean, String],
		default: false
	},
	loop: {
		type: [Boolean, String],
		default: false
	},
	muted: {
		type: [Boolean, String],
		default: false
	},
	objectFit: {
		type: String,
		default: "contain"
	},
	poster: {
		type: String,
		default: ""
	},
	direction: {
		type: [String, Number],
		default: ""
	},
	showProgress: {
		type: Boolean,
		default: true
	},
	initialTime: {
		type: [String, Number],
		default: 0
	},
	showFullscreenBtn: {
		type: [Boolean, String],
		default: true
	},
	pageGesture: {
		type: [Boolean, String],
		default: false
	},
	vslideGesture: {
		type: [Boolean, String],
		default: false
	},
	enableProgressGesture: {
		type: [Boolean, String],
		default: true
	},
	showPlayBtn: {
		type: [Boolean, String],
		default: true
	},
	showCenterPlayBtn: {
		type: [Boolean, String],
		default: true
	}
};
var video_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Video",
	props: props$8,
	emits: [
		"fullscreenchange",
		"progress",
		"loadedmetadata",
		"waiting",
		"error",
		"play",
		"pause",
		"ended",
		"timeupdate"
	],
	setup(props$26, { emit: emit$2, attrs: attrs$1, slots }) {
		const rootRef = (0, vue.ref)(null);
		const containerRef = (0, vue.ref)(null);
		const trigger = useCustomEvent(rootRef, emit$2);
		const { state: userActionState } = useUserAction();
		const { $attrs: videoAttrs } = useAttrs({ excludeListeners: true });
		initI18nVideoMsgsOnce();
		const { videoRef, state: videoState, play, pause, stop, seek, playbackRate, toggle, onDurationChange, onLoadedMetadata, onProgress, onWaiting, onVideoError, onPlay, onPause, onEnded, onTimeUpdate } = useVideo(props$26, attrs$1, trigger);
		const { state: danmuState, danmuRef, updateDanmu, toggleDanmu, sendDanmu } = useDanmu(props$26, videoState);
		const { state: fullscreenState, onFullscreenChange, emitFullscreenChange, toggleFullscreen, requestFullScreen, exitFullScreen } = useFullscreen(trigger, containerRef, videoRef, userActionState, rootRef);
		const { state: gestureState, onTouchstart, onTouchend, onTouchmove } = useGesture(props$26, videoState, videoRef, fullscreenState);
		const { state: controlsState, progressRef, ballRef, clickProgress, toggleControls, autoHideEnd, autoHideStart } = useControls(props$26, videoState, seek, (currentTimeNew) => {
			gestureState.currentTimeNew = currentTimeNew;
		});
		useContext(play, pause, stop, seek, sendDanmu, playbackRate, requestFullScreen, exitFullScreen);
		const progressing = useProgressing(videoState, gestureState, controlsState, autoHideEnd, autoHideStart);
		return () => {
			return (0, vue.createVNode)("uni-video", {
				"ref": rootRef,
				"id": props$26.id,
				"onClick": toggleControls
			}, [(0, vue.createVNode)("div", {
				"ref": containerRef,
				"class": "uni-video-container",
				"onTouchstart": onTouchstart,
				"onTouchend": onTouchend,
				"onTouchmove": onTouchmove,
				"onFullscreenchange": (0, vue.withModifiers)(onFullscreenChange, ["stop"]),
				"onWebkitfullscreenchange": (0, vue.withModifiers)(($event) => onFullscreenChange($event, true), ["stop"])
			}, [
				(0, vue.createVNode)("video", (0, vue.mergeProps)({
					"ref": videoRef,
					"style": { "object-fit": props$26.objectFit },
					"muted": !!props$26.muted,
					"loop": !!props$26.loop,
					"src": videoState.src,
					"poster": props$26.poster,
					"autoplay": !!props$26.autoplay
				}, videoAttrs.value, {
					"class": {
						"uni-video-video": true,
						"uni-video-video-fullscreen": fullscreenState.fullscreen
					},
					"webkit-playsinline": true,
					"playsinline": true,
					"onDurationchange": onDurationChange,
					"onLoadedmetadata": onLoadedMetadata,
					"onProgress": onProgress,
					"onWaiting": onWaiting,
					"onError": onVideoError,
					"onPlay": onPlay,
					"onPause": onPause,
					"onEnded": onEnded,
					"onTimeupdate": (event) => {
						onTimeUpdate(event);
						updateDanmu(event);
					},
					"onWebkitbeginfullscreen": () => emitFullscreenChange(true),
					"onX5videoenterfullscreen": () => emitFullscreenChange(true),
					"onWebkitendfullscreen": () => emitFullscreenChange(false),
					"onX5videoexitfullscreen": () => emitFullscreenChange(false)
				}), null, 16, [
					"muted",
					"loop",
					"src",
					"poster",
					"autoplay",
					"webkit-playsinline",
					"playsinline",
					"onDurationchange",
					"onLoadedmetadata",
					"onProgress",
					"onWaiting",
					"onError",
					"onPlay",
					"onPause",
					"onEnded",
					"onTimeupdate",
					"onWebkitbeginfullscreen",
					"onX5videoenterfullscreen",
					"onWebkitendfullscreen",
					"onX5videoexitfullscreen"
				]),
				(0, vue.withDirectives)((0, vue.createVNode)("div", {
					"class": "uni-video-bar uni-video-bar-full",
					"onClick": (0, vue.withModifiers)(() => {}, ["stop"])
				}, [
					(0, vue.createVNode)("div", { "class": "uni-video-controls" }, [
						(0, vue.withDirectives)((0, vue.createVNode)("div", {
							"class": {
								"uni-video-icon": true,
								"uni-video-control-button": true,
								"uni-video-control-button-play": !videoState.playing,
								"uni-video-control-button-pause": videoState.playing
							},
							"onClick": (0, vue.withModifiers)(toggle, ["stop"])
						}, null, 10, ["onClick"]), [[vue.vShow, props$26.showPlayBtn]]),
						(0, vue.withDirectives)((0, vue.createVNode)("div", { "class": "uni-video-current-time" }, [formatTime(videoState.currentTime)], 512), [[vue.vShow, props$26.showProgress]]),
						(0, vue.withDirectives)((0, vue.createVNode)("div", {
							"ref": progressRef,
							"class": "uni-video-progress-container",
							"onClick": (0, vue.withModifiers)(clickProgress, ["stop"])
						}, [(0, vue.createVNode)("div", { "class": {
							"uni-video-progress": true,
							"uni-video-progress-progressing": progressing.value
						} }, [
							(0, vue.createVNode)("div", {
								"style": {
									width: videoState.buffered - videoState.progress + "%",
									left: videoState.progress + "%"
								},
								"class": "uni-video-progress-buffered"
							}, null, 4),
							(0, vue.createVNode)("div", {
								"style": { width: videoState.progress + "%" },
								"class": "uni-video-progress-played"
							}, null, 4),
							(0, vue.createVNode)("div", {
								"ref": ballRef,
								"style": { left: videoState.progress + "%" },
								"class": {
									"uni-video-ball": true,
									"uni-video-ball-progressing": progressing.value
								}
							}, [(0, vue.createVNode)("div", { "class": "uni-video-inner" }, null)], 6)
						], 2)], 8, ["onClick"]), [[vue.vShow, props$26.showProgress]]),
						(0, vue.withDirectives)((0, vue.createVNode)("div", { "class": "uni-video-duration" }, [formatTime(videoState.currentDuration)], 512), [[vue.vShow, props$26.showProgress]])
					]),
					(0, vue.withDirectives)((0, vue.createVNode)("div", {
						"class": {
							"uni-video-icon": true,
							"uni-video-danmu-button": true,
							"uni-video-danmu-button-active": danmuState.enable
						},
						"onClick": (0, vue.withModifiers)(toggleDanmu, ["stop"])
					}, null, 10, ["onClick"]), [[vue.vShow, props$26.danmuBtn]]),
					(0, vue.withDirectives)((0, vue.createVNode)("div", {
						"class": {
							"uni-video-icon": true,
							"uni-video-fullscreen": true,
							"uni-video-type-fullscreen": fullscreenState.fullscreen
						},
						"onClick": (0, vue.withModifiers)(() => toggleFullscreen(!fullscreenState.fullscreen), ["stop"])
					}, null, 10, ["onClick"]), [[vue.vShow, props$26.showFullscreenBtn]])
				], 8, ["onClick"]), [[vue.vShow, controlsState.controlsShow]]),
				(0, vue.withDirectives)((0, vue.createVNode)("div", {
					"ref": danmuRef,
					"style": "z-index: 0;",
					"class": "uni-video-danmu"
				}, null, 512), [[vue.vShow, videoState.start && danmuState.enable]]),
				controlsState.centerPlayBtnShow && (0, vue.createVNode)("div", {
					"class": "uni-video-cover",
					"onClick": (0, vue.withModifiers)(() => {}, ["stop"])
				}, [(0, vue.createVNode)("div", {
					"class": "uni-video-cover-play-button uni-video-icon",
					"onClick": (0, vue.withModifiers)(play, ["stop"])
				}, null, 8, ["onClick"])], 8, ["onClick"]),
				(0, vue.createVNode)("div", { "class": "uni-video-loading" }, [gestureState.gestureType === "volume" ? (0, vue.createVNode)("div", {
					"class": {
						"uni-video-toast-container": true,
						"uni-video-toast-container-thin": gestureState.toastThin
					},
					"style": { marginTop: `5px` }
				}, [!gestureState.toastThin && gestureState.volumeNew > 0 && gestureState.gestureType === "volume" ? (0, vue.createVNode)("text", { "class": "uni-video-icon uni-video-toast-icon" }, [""]) : !gestureState.toastThin && (0, vue.createVNode)("text", { "class": "uni-video-icon uni-video-toast-icon" }, [""]), (0, vue.createVNode)("div", {
					"class": "uni-video-toast-draw",
					"style": { width: `${gestureState.volumeNew * 100}%` }
				}, null, 4)], 2) : null]),
				(0, vue.createVNode)("div", { "class": {
					"uni-video-toast": true,
					"uni-video-toast-progress": progressing.value
				} }, [(0, vue.createVNode)("div", { "class": "uni-video-toast-title" }, [
					(0, vue.createVNode)("span", { "class": "uni-video-toast-title-current-time" }, [formatTime(gestureState.currentTimeNew)]),
					" / ",
					formatTime(videoState.currentDuration)
				])], 2),
				(0, vue.createVNode)("div", { "class": "uni-video-slots" }, [slots.default && slots.default()])
			], 40, [
				"onTouchstart",
				"onTouchend",
				"onTouchmove",
				"onFullscreenchange",
				"onWebkitfullscreenchange"
			])], 8, ["id", "onClick"]);
		};
	}
});
const onWebInvokeAppService = ({ name, arg }) => {
	if (name === "postMessage") {} else switch (name) {
		case "navigateTo":
			uni.navigateTo(arg);
			break;
		case "navigateBack":
			uni.navigateBack(arg);
			break;
		case "switchTab":
			uni.switchTab(arg);
			break;
		case "reLaunch":
			uni.reLaunch(arg);
			break;
		case "redirectTo":
			uni.redirectTo(arg);
			break;
	}
};
var Invoke = /* @__PURE__ */ (0, __dcloudio_uni_shared.once)(() => UniServiceJSBridge.on(__dcloudio_uni_shared.ON_WEB_INVOKE_APP_SERVICE, onWebInvokeAppService));
var props$7 = {
	src: {
		type: String,
		default: ""
	},
	fullscreen: {
		type: Boolean,
		default: true
	}
};
var web_view_default = /* @__PURE__ */ defineBuiltInComponent({
	inheritAttrs: false,
	name: "WebView",
	props: props$7,
	emits: ["load"],
	setup(props$26, { emit: emit$2 }) {
		Invoke();
		const rootRef = (0, vue.ref)(null);
		(0, vue.ref)(null);
		const { $attrs, $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
		useCustomEvent(rootRef, emit$2);
		let _resize;
		return () => {
			return (0, vue.createVNode)(vue.Fragment, null, [(0, vue.createVNode)("uni-web-view", (0, vue.mergeProps)({ "class": props$26.fullscreen ? "uni-webview--fullscreen" : "" }, $listeners.value, $excludeAttrs.value, { "ref": rootRef }), [(0, vue.createVNode)(resize_sensor_default, { "onResize": _resize }, null, 8, ["onResize"])], 16)]);
		};
	}
});
var require_amap_jsapi_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
const ICON_PATH_ORIGIN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAC01BMVEUAAAAAef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef96quGStdqStdpbnujMzMzCyM7Gyc7Ky83MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwAef8GfP0yjfNWnOp0qOKKsdyYt9mju9aZt9mMstx1qeJYnekyjvIIfP0qivVmouaWttnMzMyat9lppOUujPQKffxhoOfNzc3Y2Njh4eHp6enu7u7y8vL19fXv7+/i4uLZ2dnOzs6auNgOf/sKff15quHR0dHx8fH9/f3////j4+N6quFdn+iywdPb29vw8PD+/v7c3NyywtLa2tr29vbS0tLd3d38/Pzf39/o6Ojc7f+q0v+HwP9rsf9dqv9Hnv9Vpv/q6urj8P+Vx/9Am/8Pgf8Iff/z8/OAvP95uf/n5+c5l//V6f+52v+y1//7+/vt7e0rkP/09PTQ0NDq9P8Whf+cy//W1tbe3t7A3v/m5ubs7OxOov/r6+vk5OQiaPjKAAAAknRSTlMACBZ9oB71/jiqywJBZATT6hBukRXv+zDCAVrkDIf4JbQsTb7eVeJLbwfa8Rh4G/OlPS/6/kxQ9/xdmZudoJxNVhng7B6wtWdzAtQOipcF1329wS44doK/BAkyP1pvgZOsrbnGXArAg34G2IsD1eMRe7bi7k5YnqFT9V0csyPedQyYD3p/Fje+hDpskq/MwpRBC6yKp2MAAAQdSURBVHja7Zn1exMxGIAPHbrhDsPdneHuNtzd3d3dIbjLh93o2o4i7TpgG1Jk0g0mMNwd/gTa5rq129reHnK5e/bk/TFNk/dJ7r5894XjGAwGg8GgTZasCpDIll1+hxw5vXLJLpEboTx5ZXbIhyzkl9fB28cqUaCgrBKFkI3CcjoUKYolihWXUSI7EihRUjaHXF52CVRKLoe8eZIdUOkyMknkRw6UlcehYAFHiXK+skgURk6Ul8OhQjFnCVRRBolKqRxQ5SzUHaqgNGSj7VCmalqJnDkoS5RF6ZCbroNvufQkUD6qEuXTdUA+3hQdqiEXVKfnUKOmK4latalJ1EEuoZZ6162HJ9x/4OChw0eOHj12/MTJU6dxG7XUu751tjNnz4ET5y9ctLZTSr0beKFLl89bpuUDrqgC1RqNWqsKuqqzNFw7e51S6u3tc+OmZUJ9kCHY6ECwOkRvab51iUrqXej2HYDQsHBjWgx3Ae7dppB6N2wEcF9jdMGDUIDGTaR2aNoM9FqjG7QmaN5CWgc/gIePjG559BigpZQOrYB/4jBfRGRUtDkmJjY6KjLCofkpD62lc2gDfMpWPIuLdwyV8XEpHgaddBZ+wBuSFcwJqSN2ovmZ/dfnOvCTxqGtwzq8SEjv4EhISn48eWgnhUP7DvDSvgzxrs6vV6+FLiro2EkCic4QKkzwJsH1KYreCp0eQhfyDl1B/w4P/xa5JVJ4U03QjbRD9x7wXlgH5IE3wmMBHXoSlugFAcI6f/AkkSi8q6HQm6xDn77wEQ8djTwSj3tqAMguRTe4ikeOQyJ4YV+KfkQl+oNW5GbY4gWOWgbwJ+kwAD6Fi90MK2ZsrIeBBCUGwRXbqJ+/iJMQliIEBhOU6AJhtlG/IpHE2bqrYQg5h6HA4yQiRqwEfkGCdTCMmMRw+IbPDCQaHCsCYAQxiZHw3TbmD/ESOHgHwShiEqPhp/gggYkSztIxxCRawy/bmEniJaJtfwiEscQkxkFgRqJESqQwwHhiEuMBp3Vm8RK/cZoHEzKXhCK2QxEPpiJe0YlKCFaKCNv/cYBNUsBRPlkJSc0U+dM7E9H0ThGJbgZT/iR7yj+VqMS06Qr4+OFm2JdCxIa8lugzkJs5K6MfxAaYPUcBpYG5khZJEkUUSb7DPCnKRfPBXj6M8FwuegoLpCgXcQszVjhbJFUJUee2hBhLoYTIcYtB57KY+opSMdVqwatSlZVj05aV//CwJLMX2DluaUcwhXm4ali2XOoLjxUrPV26zFtF4f5p0Gp310+z13BUWNvbehEXona6iAtX/zVZmtfN4WixfsNky4S6gCCVVq3RPLdfSfpv3MRRZfPoLc6Xs/5bt3EyMGzE9h07/Xft2t15z6i9+zgGg8FgMBgMBoPBYDAYDAYj8/APG67Rie8pUDsAAAAASUVORK5CYII=";
let MapType = /* @__PURE__ */ function(MapType$1) {
	MapType$1["QQ"] = "qq";
	MapType$1["GOOGLE"] = "google";
	MapType$1["AMAP"] = "AMap";
	MapType$1["BMAP"] = "BMapGL";
	MapType$1["UNKNOWN"] = "";
	return MapType$1;
}({});
function getMapInfo() {
	if (__uniConfig.bMapKey) return {
		type: MapType.BMAP,
		key: __uniConfig.bMapKey
	};
	if (__uniConfig.qqMapKey) return {
		type: MapType.QQ,
		key: __uniConfig.qqMapKey
	};
	if (__uniConfig.googleMapKey) return {
		type: MapType.GOOGLE,
		key: __uniConfig.googleMapKey
	};
	if (__uniConfig.aMapKey) return {
		type: MapType.AMAP,
		key: __uniConfig.aMapKey,
		securityJsCode: __uniConfig.aMapSecurityJsCode,
		serviceHost: __uniConfig.aMapServiceHost
	};
	return {
		type: MapType.UNKNOWN,
		key: ""
	};
}
var IS_AMAP = false;
var hasGetIsAMap = false;
const getIsAMap = () => {
	if (hasGetIsAMap) return IS_AMAP;
	else {
		hasGetIsAMap = true;
		return IS_AMAP = getMapInfo().type === MapType.AMAP;
	}
};
const getIsBMap = () => {
	return getMapInfo().type === MapType.BMAP;
};
var props$6 = {
	id: {
		type: [Number, String],
		default: ""
	},
	latitude: {
		type: [Number, String],
		require: true
	},
	longitude: {
		type: [Number, String],
		require: true
	},
	title: {
		type: String,
		default: ""
	},
	iconPath: {
		type: String,
		require: true
	},
	rotate: {
		type: [Number, String],
		default: 0
	},
	alpha: {
		type: [Number, String],
		default: 1
	},
	width: {
		type: [Number, String],
		default: ""
	},
	height: {
		type: [Number, String],
		default: ""
	},
	callout: {
		type: Object,
		default: null
	},
	label: {
		type: Object,
		default: null
	},
	anchor: {
		type: Object,
		default: null
	},
	clusterId: {
		type: [Number, String],
		default: ""
	},
	customCallout: {
		type: Object,
		default: null
	},
	ariaLabel: {
		type: String,
		default: ""
	}
};
function useMarkerLabelStyle(id$1) {
	const className = "uni-map-marker-label-" + id$1;
	const styleEl = document.createElement("style");
	styleEl.id = className;
	document.head.appendChild(styleEl);
	return function updateMarkerLabelStyle(style) {
		const newStyle = Object.assign({}, style, {
			position: "absolute",
			top: "70px",
			borderStyle: "solid"
		});
		const div = document.createElement("div");
		Object.keys(newStyle).forEach((key) => {
			div.style[key] = newStyle[key] || "";
		});
		styleEl.innerText = `.${className}{${div.getAttribute("style")}}`;
		return className;
	};
}
var MapMarker_default = /* @__PURE__ */ defineSystemComponent({
	name: "MapMarker",
	props: props$6,
	setup(props$26) {
		const id$1 = String(!isNaN(Number(props$26.id)) ? props$26.id : "");
		const onMapReady = (0, vue.inject)("onMapReady");
		const updateMarkerLabelStyle = useMarkerLabelStyle(id$1);
		let marker;
		function removeMarkerCallout(callout) {
			if (getIsAMap()) callout.removeAMapText();
			else callout.setMap(null);
		}
		onMapReady((map, maps, trigger) => {
			function updateMarker(option) {
				const title = option.title;
				let position;
				if (getIsAMap()) position = new maps.LngLat(option.longitude, option.latitude);
				else if (getIsBMap()) position = new maps.Point(option.longitude, option.latitude);
				else position = new maps.LatLng(option.latitude, option.longitude);
				const img = new Image();
				let imgHeight = 0;
				img.onload = () => {
					const anchor = option.anchor || {};
					let icon;
					let w;
					let h$2;
					let top;
					let x = typeof anchor.x === "number" ? anchor.x : .5;
					let y = typeof anchor.y === "number" ? anchor.y : 1;
					if (option.iconPath && (option.width || option.height)) {
						w = option.width || img.width / img.height * option.height;
						h$2 = option.height || img.height / img.width * option.width;
					} else {
						w = img.width / 2;
						h$2 = img.height / 2;
					}
					imgHeight = h$2;
					top = h$2 - (h$2 - y * h$2);
					if ("MarkerImage" in maps) icon = new maps.MarkerImage(img.src, null, null, new maps.Point(x * w, y * h$2), new maps.Size(w, h$2));
					else if ("Icon" in maps) icon = new maps.Icon({
						image: img.src,
						size: new maps.Size(w, h$2),
						imageSize: new maps.Size(w, h$2),
						imageOffset: new maps.Pixel(x * w, y * h$2)
					});
					else icon = {
						url: img.src,
						anchor: new maps.Point(x, y),
						size: new maps.Size(w, h$2)
					};
					if (getIsBMap()) {
						marker = new maps.Marker(new maps.Point(position.lng, position.lat));
						map.addOverlay(marker);
					} else {
						marker.setPosition(position);
						marker.setIcon(icon);
					}
					if ("setRotation" in marker) marker.setRotation(option.rotate || 0);
					const labelOpt = option.label || {};
					if ("label" in marker) {
						marker.label.setMap(null);
						delete marker.label;
					}
					let label;
					if (labelOpt.content) {
						const labelStyle = {
							borderColor: labelOpt.borderColor,
							borderWidth: (Number(labelOpt.borderWidth) || 0) + "px",
							padding: (Number(labelOpt.padding) || 0) + "px",
							borderRadius: (Number(labelOpt.borderRadius) || 0) + "px",
							backgroundColor: labelOpt.bgColor,
							color: labelOpt.color,
							fontSize: (labelOpt.fontSize || 14) + "px",
							lineHeight: (labelOpt.fontSize || 14) + "px",
							marginLeft: (Number(labelOpt.anchorX || labelOpt.x) || 0) + "px",
							marginTop: (Number(labelOpt.anchorY || labelOpt.y) || 0) + "px"
						};
						if ("Label" in maps) {
							label = new maps.Label({
								position,
								map,
								clickable: false,
								content: labelOpt.content,
								style: labelStyle
							});
							marker.label = label;
						} else if ("setLabel" in marker) if (getIsAMap()) {
							const content = `<div style="
                  margin-left:${labelStyle.marginLeft};
                  margin-top:${labelStyle.marginTop};
                  padding:${labelStyle.padding};
                  background-color:${labelStyle.backgroundColor};
                  border-radius:${labelStyle.borderRadius};
                  line-height:${labelStyle.lineHeight};
                  color:${labelStyle.color};
                  font-size:${labelStyle.fontSize};

                  ">
                  ${labelOpt.content}
                <div>`;
							marker.setLabel({
								content,
								direction: "bottom-right"
							});
						} else {
							const className = updateMarkerLabelStyle(labelStyle);
							marker.setLabel({
								text: labelOpt.content,
								color: labelStyle.color,
								fontSize: labelStyle.fontSize,
								className
							});
						}
					}
					const calloutOpt = option.callout || {};
					let callout = marker.callout;
					let calloutStyle;
					if (calloutOpt.content || title) {
						if (getIsAMap() && calloutOpt.content) calloutOpt.content = calloutOpt.content.replaceAll("\n", "<br/>");
						const boxShadow = "0px 0px 3px 1px rgba(0,0,0,0.5)";
						let offsetY = -imgHeight / 2;
						if (option.width || option.height) offsetY += 14 - imgHeight / 2;
						calloutStyle = calloutOpt.content ? {
							position,
							map,
							top,
							offsetY,
							content: calloutOpt.content,
							color: calloutOpt.color,
							fontSize: calloutOpt.fontSize,
							borderRadius: calloutOpt.borderRadius,
							bgColor: calloutOpt.bgColor,
							padding: calloutOpt.padding,
							boxShadow: calloutOpt.boxShadow || boxShadow,
							display: calloutOpt.display
						} : {
							position,
							map,
							top,
							offsetY,
							content: title,
							boxShadow
						};
						if (callout) callout.setOption(calloutStyle);
						else if (getIsAMap()) {
							const callback = () => {
								if (id$1 !== "") trigger("callouttap", {}, { markerId: Number(id$1) });
							};
							callout = marker.callout = new maps.Callout(calloutStyle, callback);
						} else {
							callout = marker.callout = new maps.Callout(calloutStyle);
							callout.div.onclick = function($event) {
								if (id$1 !== "") trigger("callouttap", $event, { markerId: Number(id$1) });
								$event.stopPropagation();
								$event.preventDefault();
							};
							if (getMapInfo().type === MapType.GOOGLE) {
								callout.div.ontouchstart = function($event) {
									$event.stopPropagation();
								};
								callout.div.onpointerdown = function($event) {
									$event.stopPropagation();
								};
							}
						}
					} else if (callout) {
						removeMarkerCallout(callout);
						delete marker.callout;
					}
				};
				if (option.iconPath) img.src = getRealPath(option.iconPath);
				else console.error("Marker.iconPath is required.");
			}
			function addMarker(props$27) {
				if (!getIsBMap()) marker = new maps.Marker({
					map,
					flat: true,
					autoRotation: false
				});
				updateMarker(props$27);
				const MapsEvent = maps.event || maps.Event;
				if (getIsBMap()) {} else MapsEvent.addListener(marker, "click", () => {
					const callout = marker.callout;
					if (callout && !callout.alwaysVisible) if (getIsAMap()) {
						callout.visible = !callout.visible;
						if (callout.visible) marker.callout.createAMapText();
						else marker.callout.removeAMapText();
					} else {
						callout.set("visible", !callout.visible);
						if (callout.visible) {
							const div = callout.div;
							const parent = div.parentNode;
							parent.removeChild(div);
							parent.appendChild(div);
						}
					}
					if (id$1) trigger("markertap", {}, {
						markerId: Number(id$1),
						latitude: props$27.latitude,
						longitude: props$27.longitude
					});
				});
			}
			addMarker(props$26);
			(0, vue.watch)(props$26, updateMarker);
		});
		if (id$1) {
			const addMapChidlContext = (0, vue.inject)("addMapChidlContext");
			(0, vue.inject)("removeMapChidlContext");
			addMapChidlContext({
				id: id$1,
				translate(data) {
					onMapReady((map, maps, trigger) => {
						const destination = data.destination;
						const duration = data.duration;
						const autoRotate = !!data.autoRotate;
						let rotate = Number(data.rotate) || 0;
						let rotation = 0;
						if ("getRotation" in marker) rotation = marker.getRotation();
						const a = marker.getPosition();
						const b = new maps.LatLng(destination.latitude, destination.longitude);
						const speed = maps.geometry.spherical.computeDistanceBetween(a, b) / 1e3 / ((typeof duration === "number" ? duration : 1e3) / (1e3 * 60 * 60));
						const MapsEvent = maps.event || maps.Event;
						const movingEvent = MapsEvent.addListener(marker, "moving", (e$1) => {
							const latLng = e$1.latLng;
							const label = marker.label;
							if (label) label.setPosition(latLng);
							const callout = marker.callout;
							if (callout) callout.setPosition(latLng);
						});
						const event = MapsEvent.addListener(marker, "moveend", () => {
							event.remove();
							movingEvent.remove();
							marker.lastPosition = a;
							marker.setPosition(b);
							const label = marker.label;
							if (label) label.setPosition(b);
							const callout = marker.callout;
							if (callout) callout.setPosition(b);
							const cb = data.animationEnd;
							if ((0, __vue_shared.isFunction)(cb)) cb();
						});
						let lastRtate = 0;
						if (autoRotate) {
							if (marker.lastPosition) lastRtate = maps.geometry.spherical.computeHeading(marker.lastPosition, a);
							rotate = maps.geometry.spherical.computeHeading(a, b) - lastRtate;
						}
						if ("setRotation" in marker) marker.setRotation(rotation + rotate);
						if ("moveTo" in marker) marker.moveTo(b, speed);
						else {
							marker.setPosition(b);
							MapsEvent.trigger(marker, "moveend", {});
						}
					});
				}
			});
		}
		return () => {
			return null;
		};
	}
});
function hexToRgba(hex) {
	if (!hex) return {
		r: 0,
		g: 0,
		b: 0,
		a: 0
	};
	let tmpHex = hex.slice(1);
	const tmpHexLen = tmpHex.length;
	if (![
		3,
		4,
		6,
		8
	].includes(tmpHexLen)) return {
		r: 0,
		g: 0,
		b: 0,
		a: 0
	};
	if (tmpHexLen === 3 || tmpHexLen === 4) tmpHex = tmpHex.replace(/(\w{1})/g, "$1$1");
	let [sr, sg, sb, sa] = tmpHex.match(/(\w{2})/g);
	const r = parseInt(sr, 16), g$1 = parseInt(sg, 16), b = parseInt(sb, 16);
	if (!sa) return {
		r,
		g: g$1,
		b,
		a: 1
	};
	return {
		r,
		g: g$1,
		b,
		a: (`0x100${sa}` - 65536) / 255
	};
}
var props$5 = {
	points: {
		type: Array,
		require: true
	},
	color: {
		type: String,
		default: "#000000"
	},
	width: {
		type: [Number, String],
		default: ""
	},
	dottedLine: {
		type: [Boolean, String],
		default: false
	},
	arrowLine: {
		type: [Boolean, String],
		default: false
	},
	arrowIconPath: {
		type: String,
		default: ""
	},
	borderColor: {
		type: String,
		default: "#000000"
	},
	borderWidth: {
		type: [Number, String],
		default: ""
	},
	colorList: {
		type: Array,
		default() {
			return [];
		}
	},
	level: {
		type: String,
		default: ""
	}
};
var MapPolyline_default = /* @__PURE__ */ defineSystemComponent({
	name: "MapPolyline",
	props: props$5,
	setup(props$26) {
		const onMapReady = (0, vue.inject)("onMapReady");
		let polyline;
		let polylineBorder;
		function removePolyline() {
			if (polyline) polyline.setMap(null);
			if (polylineBorder) polylineBorder.setMap(null);
		}
		onMapReady((map, maps) => {
			function updatePolyline(option) {
				removePolyline();
				addPolyline(option);
			}
			function addPolyline(option) {
				const path = [];
				option.points.forEach((point) => {
					let pointPosition;
					if (getIsAMap()) pointPosition = [point.longitude, point.latitude];
					else if (getIsBMap()) pointPosition = new maps.Point(point.longitude, point.latitude);
					else pointPosition = new maps.LatLng(point.latitude, point.longitude);
					path.push(pointPosition);
				});
				const strokeWeight = Number(option.width) || 1;
				const { r: sr, g: sg, b: sb, a: sa } = hexToRgba(option.color);
				const { r: br, g: bg, b: bb, a: ba } = hexToRgba(option.borderColor);
				const polylineOptions = {
					map,
					clickable: false,
					path,
					strokeWeight,
					strokeColor: option.color || void 0,
					strokeDashStyle: option.dottedLine ? "dash" : "solid"
				};
				const borderWidth = Number(option.borderWidth) || 0;
				const polylineBorderOptions = {
					map,
					clickable: false,
					path,
					strokeWeight: strokeWeight + borderWidth * 2,
					strokeColor: option.borderColor || void 0,
					strokeDashStyle: option.dottedLine ? "dash" : "solid"
				};
				if ("Color" in maps) {
					polylineOptions.strokeColor = new maps.Color(sr, sg, sb, sa);
					polylineBorderOptions.strokeColor = new maps.Color(br, bg, bb, ba);
				} else {
					polylineOptions.strokeColor = `rgb(${sr}, ${sg}, ${sb})`;
					polylineOptions.strokeOpacity = sa;
					polylineBorderOptions.strokeColor = `rgb(${br}, ${bg}, ${bb})`;
					polylineBorderOptions.strokeOpacity = ba;
				}
				if (borderWidth) polylineBorder = new maps.Polyline(polylineBorderOptions);
				if (getIsBMap()) {
					polyline = new maps.Polyline(polylineOptions.path, polylineOptions);
					map.addOverlay(polyline);
				} else polyline = new maps.Polyline(polylineOptions);
			}
			addPolyline(props$26);
			(0, vue.watch)(props$26, updatePolyline);
		});
		return () => {
			return null;
		};
	}
});
var props$4 = {
	latitude: {
		type: [Number, String],
		require: true
	},
	longitude: {
		type: [Number, String],
		require: true
	},
	color: {
		type: String,
		default: "#000000"
	},
	fillColor: {
		type: String,
		default: "#00000000"
	},
	radius: {
		type: [Number, String],
		require: true
	},
	strokeWidth: {
		type: [Number, String],
		default: ""
	},
	level: {
		type: String,
		default: ""
	}
};
var MapCircle_default = /* @__PURE__ */ defineSystemComponent({
	name: "MapCircle",
	props: props$4,
	setup(props$26) {
		const onMapReady = (0, vue.inject)("onMapReady");
		let circle;
		function removeCircle() {
			if (circle) circle.setMap(null);
		}
		onMapReady((map, maps) => {
			function updateCircle(option) {
				removeCircle();
				addCircle(option);
			}
			function addCircle(option) {
				const circleOptions = {
					map,
					center: getIsAMap() || getIsBMap() ? [option.longitude, option.latitude] : new maps.LatLng(option.latitude, option.longitude),
					clickable: false,
					radius: option.radius,
					strokeWeight: Number(option.strokeWidth) || 1,
					strokeDashStyle: "solid"
				};
				if (getIsBMap()) {
					circleOptions.strokeColor = option.color;
					circleOptions.fillColor = option.fillColor || "#000";
					circleOptions.fillOpacity = 1;
				} else {
					const { r: fr, g: fg, b: fb, a: fa } = hexToRgba(option.fillColor);
					const { r: sr, g: sg, b: sb, a: sa } = hexToRgba(option.color);
					if ("Color" in maps) {
						circleOptions.fillColor = new maps.Color(fr, fg, fb, fa);
						circleOptions.strokeColor = new maps.Color(sr, sg, sb, sa);
					} else {
						circleOptions.fillColor = `rgb(${fr}, ${fg}, ${fb})`;
						circleOptions.fillOpacity = fa;
						circleOptions.strokeColor = `rgb(${sr}, ${sg}, ${sb})`;
						circleOptions.strokeOpacity = sa;
					}
				}
				if (getIsBMap()) {
					let pt = new maps.Point(circleOptions.center[0], circleOptions.center[1]);
					circle = new maps.Circle(pt, circleOptions.radius, circleOptions);
					map.addOverlay(circle);
				} else {
					circle = new maps.Circle(circleOptions);
					if (getIsAMap()) map.add(circle);
				}
			}
			addCircle(props$26);
			(0, vue.watch)(props$26, updateCircle);
		});
		return () => {
			return null;
		};
	}
});
var props$3 = {
	id: {
		type: [Number, String],
		default: ""
	},
	position: {
		type: Object,
		required: true
	},
	iconPath: {
		type: String,
		required: true
	},
	clickable: {
		type: [Boolean, String],
		default: ""
	},
	trigger: {
		type: Function,
		required: true
	}
};
var MapControl_default = /* @__PURE__ */ defineSystemComponent({
	name: "MapControl",
	props: props$3,
	setup(props$26) {
		const imgPath = (0, vue.computed)(() => getRealPath(props$26.iconPath));
		const positionStyle = (0, vue.computed)(() => {
			let positionStyle$1 = `top:${props$26.position.top || 0}px;left:${props$26.position.left || 0}px;`;
			if (props$26.position.width) positionStyle$1 += `width:${props$26.position.width}px;`;
			if (props$26.position.height) positionStyle$1 += `height:${props$26.position.height}px;`;
			return positionStyle$1;
		});
		const handleClick = ($event) => {
			if (props$26.clickable) props$26.trigger("controltap", $event, { controlId: props$26.id });
		};
		return () => {
			return (0, vue.createVNode)("div", { "class": "uni-map-control" }, [(0, vue.createVNode)("img", {
				"src": imgPath.value,
				"style": positionStyle.value,
				"class": "uni-map-control-icon",
				"onClick": handleClick
			}, null, 12, ["src", "onClick"])]);
		};
	}
});
const CONTEXT_ID = "MAP_LOCATION";
var MapLocation_default = /* @__PURE__ */ defineSystemComponent({
	name: "MapLocation",
	setup() {
		const state = (0, vue.reactive)({
			latitude: 0,
			longitude: 0,
			rotate: 0
		});
		return () => {
			return state.latitude ? (0, vue.createVNode)(MapMarker_default, (0, vue.mergeProps)({
				"anchor": {
					x: .5,
					y: .5
				},
				"width": "44",
				"height": "44",
				"iconPath": ICON_PATH_ORIGIN
			}, state), null, 16, ["iconPath"]) : null;
		};
	}
});
var props_default = {
	dashArray: {
		type: Array,
		default: () => [0, 0]
	},
	points: {
		type: Array,
		required: true
	},
	strokeWidth: {
		type: Number,
		default: 1
	},
	strokeColor: {
		type: String,
		default: "#000000"
	},
	fillColor: {
		type: String,
		default: "#00000000"
	},
	zIndex: {
		type: Number,
		default: 0
	}
};
var map_polygon_default = /* @__PURE__ */ defineSystemComponent({
	name: "MapPolygon",
	props: props_default,
	setup(props$26) {
		let polygonIns;
		(0, vue.inject)("onMapReady")((map, maps, trigger) => {
			function drawPolygon() {
				const { points, strokeWidth, strokeColor, dashArray, fillColor, zIndex } = props$26;
				const path = points.map((item) => {
					const { latitude, longitude } = item;
					if (getIsAMap()) return [longitude, latitude];
					else if (getIsBMap()) return new maps.Point(longitude, latitude);
					else return new maps.LatLng(latitude, longitude);
				});
				const { r: fcR, g: fcG, b: fcB, a: fcA } = hexToRgba(fillColor);
				const { r: scR, g: scG, b: scB, a: scA } = hexToRgba(strokeColor);
				const polygonOptions = {
					clickable: true,
					cursor: "crosshair",
					editable: false,
					map,
					fillColor: "",
					path,
					strokeColor: "",
					strokeDashStyle: dashArray.some((item) => item > 0) ? "dash" : "solid",
					strokeWeight: strokeWidth,
					visible: true,
					zIndex
				};
				if (maps.Color) {
					polygonOptions.fillColor = new maps.Color(fcR, fcG, fcB, fcA);
					polygonOptions.strokeColor = new maps.Color(scR, scG, scB, scA);
				} else {
					polygonOptions.fillColor = `rgb(${fcR}, ${fcG}, ${fcB})`;
					polygonOptions.fillOpacity = fcA;
					polygonOptions.strokeColor = `rgb(${scR}, ${scG}, ${scB})`;
					polygonOptions.strokeOpacity = scA;
				}
				if (polygonIns) {
					polygonIns.setOptions(polygonOptions);
					return;
				}
				if (getIsBMap()) {
					polygonIns = new maps.Polygon(polygonOptions.path, polygonOptions);
					map.addOverlay(polygonIns);
				} else polygonIns = new maps.Polygon(polygonOptions);
			}
			drawPolygon();
			(0, vue.watch)(props$26, drawPolygon);
		});
		return () => null;
	}
});
var import_amap_jsapi_types = require_amap_jsapi_types();
var props$2 = {
	id: {
		type: String,
		default: ""
	},
	latitude: {
		type: [String, Number],
		default: 0
	},
	longitude: {
		type: [String, Number],
		default: 0
	},
	scale: {
		type: [String, Number],
		default: 16
	},
	markers: {
		type: Array,
		default() {
			return [];
		}
	},
	includePoints: {
		type: Array,
		default() {
			return [];
		}
	},
	polyline: {
		type: Array,
		default() {
			return [];
		}
	},
	circles: {
		type: Array,
		default() {
			return [];
		}
	},
	controls: {
		type: Array,
		default() {
			return [];
		}
	},
	showLocation: {
		type: [Boolean, String],
		default: false
	},
	libraries: {
		type: Array,
		default() {
			return [];
		}
	},
	polygons: {
		type: Array,
		default: () => []
	}
};
function getPoints(points) {
	const newPoints = [];
	if ((0, __vue_shared.isArray)(points)) points.forEach((point) => {
		if (point && point.latitude && point.longitude) newPoints.push({
			latitude: point.latitude,
			longitude: point.longitude
		});
	});
	return newPoints;
}
function getLat(latLng) {
	if ("getLat" in latLng) return latLng.getLat();
	else {
		if (getIsBMap()) return latLng.lat;
		return latLng.lat();
	}
}
function getLng(latLng) {
	if ("getLng" in latLng) return latLng.getLng();
	else {
		if (getIsBMap()) return latLng.lng;
		return latLng.lng();
	}
}
function useMap(props$26, rootRef, emit$2) {
	const trigger = useCustomEvent(rootRef, emit$2);
	const mapRef = (0, vue.ref)(null);
	let maps;
	let map;
	const state = (0, vue.reactive)({
		latitude: Number(props$26.latitude),
		longitude: Number(props$26.longitude),
		includePoints: getPoints(props$26.includePoints)
	});
	const onMapReadyCallbacks = [];
	function onMapReady(callback) {
		onMapReadyCallbacks.push(callback);
	}
	function onBoundsReady(callback) {
		onMapReadyCallbacks.push(callback);
	}
	const contexts = {};
	function addMapChidlContext(context) {
		contexts[context.id] = context;
	}
	function removeMapChidlContext(context) {
		delete contexts[context.id];
	}
	(0, vue.watch)([() => props$26.latitude, () => props$26.longitude], ([latitudeVlaue, longitudeVlaue]) => {
		const latitude = Number(latitudeVlaue);
		const longitude = Number(longitudeVlaue);
		if (latitude !== state.latitude || longitude !== state.longitude) {
			state.latitude = latitude;
			state.longitude = longitude;
		}
	});
	(0, vue.watch)(() => props$26.includePoints, (points) => {
		state.includePoints = getPoints(points);
	}, { deep: true });
	function updateBounds() {
		if (getIsAMap()) {
			const points = [];
			state.includePoints.forEach((point) => {
				points.push([point.longitude, point.latitude]);
			});
			const bounds = new maps.Bounds(...points);
			map.setBounds(bounds);
		} else if (getIsBMap()) {} else {
			const bounds = new maps.LatLngBounds();
			state.includePoints.forEach(({ latitude, longitude }) => {
				const latLng = new maps.LatLng(latitude, longitude);
				bounds.extend(latLng);
			});
			map.fitBounds(bounds);
		}
	}
	try {
		useSubscribe((type, data = {}) => {
			switch (type) {
				case "getCenterLocation":
					onMapReady(() => {
						const center = map.getCenter();
						(0, __dcloudio_uni_shared.callOptions)(data, {
							latitude: getLat(center),
							longitude: getLng(center),
							errMsg: `${type}:ok`
						});
					});
					break;
				case "moveToLocation":
					{
						let latitude = Number(data.latitude);
						let longitude = Number(data.longitude);
						if (!latitude || !longitude) {
							const context = contexts[CONTEXT_ID];
							if (context) {
								latitude = context.state.latitude;
								longitude = context.state.longitude;
							}
						}
						if (latitude && longitude) {
							state.latitude = latitude;
							state.longitude = longitude;
							onMapReady(() => {
								(0, __dcloudio_uni_shared.callOptions)(data, `${type}:ok`);
							});
						} else (0, __dcloudio_uni_shared.callOptions)(data, `${type}:fail`);
					}
					break;
				case "translateMarker":
					onMapReady(() => {
						const context = contexts[data.markerId];
						if (context) {
							try {
								context.translate(data);
							} catch (error) {
								(0, __dcloudio_uni_shared.callOptions)(data, `${type}:fail ${error.message}`);
							}
							(0, __dcloudio_uni_shared.callOptions)(data, `${type}:ok`);
						} else (0, __dcloudio_uni_shared.callOptions)(data, `${type}:fail not found`);
					});
					break;
				case "includePoints":
					state.includePoints = getPoints(data.includePoints);
					if (getIsAMap()) updateBounds();
					onBoundsReady(() => {
						(0, __dcloudio_uni_shared.callOptions)(data, `${type}:ok`);
					});
					break;
				case "getRegion":
					onBoundsReady(() => {
						const latLngBounds = map.getBounds();
						const southwest = latLngBounds.getSouthWest();
						const northeast = latLngBounds.getNorthEast();
						(0, __dcloudio_uni_shared.callOptions)(data, {
							southwest: {
								latitude: getLat(southwest),
								longitude: getLng(southwest)
							},
							northeast: {
								latitude: getLat(northeast),
								longitude: getLng(northeast)
							},
							errMsg: `${type}:ok`
						});
					});
					break;
				case "getScale":
					onMapReady(() => {
						(0, __dcloudio_uni_shared.callOptions)(data, {
							scale: map.getZoom(),
							errMsg: `${type}:ok`
						});
					});
					break;
			}
		}, useContextInfo(), true);
	} catch (error) {}
	(0, vue.provide)("onMapReady", onMapReady);
	(0, vue.provide)("addMapChidlContext", addMapChidlContext);
	(0, vue.provide)("removeMapChidlContext", removeMapChidlContext);
	return {
		state,
		mapRef,
		trigger
	};
}
var map_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Map",
	props: props$2,
	emits: [
		"markertap",
		"labeltap",
		"callouttap",
		"controltap",
		"regionchange",
		"tap",
		"click",
		"updated",
		"update:scale",
		"update:latitude",
		"update:longitude"
	],
	setup(props$26, { emit: emit$2, slots }) {
		const rootRef = (0, vue.ref)(null);
		const { mapRef, trigger } = useMap(props$26, rootRef, emit$2);
		return () => {
			return (0, vue.createVNode)("uni-map", {
				"ref": rootRef,
				"id": props$26.id
			}, [
				(0, vue.createVNode)("div", {
					"ref": mapRef,
					"style": "width: 100%; height: 100%; position: relative; overflow: hidden"
				}, null, 512),
				props$26.markers.map((item) => (0, vue.createVNode)(MapMarker_default, (0, vue.mergeProps)({ "key": item.id }, item), null, 16)),
				props$26.polyline.map((item) => (0, vue.createVNode)(MapPolyline_default, item, null, 16)),
				props$26.circles.map((item) => (0, vue.createVNode)(MapCircle_default, item, null, 16)),
				props$26.controls.map((item) => (0, vue.createVNode)(MapControl_default, (0, vue.mergeProps)(item, { "trigger": trigger }), null, 16, ["trigger"])),
				props$26.showLocation && (0, vue.createVNode)(MapLocation_default, null, null),
				props$26.polygons.map((item) => (0, vue.createVNode)(map_polygon_default, item, null, 16)),
				(0, vue.createVNode)("div", { "style": "position: absolute;top: 0;width: 100%;height: 100%;overflow: hidden;pointer-events: none;" }, [slots.default && slots.default()])
			], 8, ["id"]);
		};
	}
});
var props$1 = { scrollTop: {
	type: [String, Number],
	default: 0
} };
var cover_view_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "CoverView",
	compatConfig: { MODE: 3 },
	props: props$1,
	setup(props$26, { slots }) {
		const root = (0, vue.ref)(null);
		const content = (0, vue.ref)(null);
		(0, vue.watch)(() => props$26.scrollTop, (val) => {
			setScrollTop(val);
		});
		function setScrollTop(val) {
			let _content = content.value;
			if (getComputedStyle(_content).overflowY === "scroll") _content.scrollTop = _upx2pxNum(val);
		}
		function _upx2pxNum(val) {
			let _val = String(val);
			if (/\d+[ur]px$/i.test(_val)) _val.replace(/\d+[ur]px$/i, (text) => {
				return String(uni.upx2px(parseFloat(text)));
			});
			return parseFloat(_val) || 0;
		}
		return () => {
			return (0, vue.createVNode)("uni-cover-view", {
				"scroll-top": props$26.scrollTop,
				"ref": root
			}, [(0, vue.createVNode)("div", {
				"ref": content,
				"class": "uni-cover-view"
			}, [slots.default && slots.default()], 512)], 8, ["scroll-top"]);
		};
	}
});
var cover_image_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "CoverImage",
	compatConfig: { MODE: 3 },
	props: { src: {
		type: String,
		default: ""
	} },
	emits: ["load", "error"],
	setup(props$26, { emit: emit$2 }) {
		const root = (0, vue.ref)(null);
		const trigger = useCustomEvent(root, emit$2);
		function load($event) {
			trigger("load", $event);
		}
		function error($event) {
			trigger("error", $event);
		}
		return () => {
			const { src } = props$26;
			return (0, vue.createVNode)("uni-cover-image", {
				"ref": root,
				"src": src
			}, [(0, vue.createVNode)("div", { "class": "uni-cover-image" }, [src ? (0, vue.createVNode)("img", {
				"src": getRealPath(src),
				"onLoad": load,
				"onError": error
			}, null, 40, [
				"src",
				"onLoad",
				"onError"
			]) : null])], 8, ["src"]);
		};
	}
});
function usePopupStyle(props$26) {
	const popupWidth = (0, vue.ref)(0);
	const popupHeight = (0, vue.ref)(0);
	const isDesktop = (0, vue.computed)(() => popupWidth.value >= 500 && popupHeight.value >= 500);
	return {
		isDesktop,
		popupStyle: (0, vue.computed)(() => {
			const style = {
				content: {
					transform: "",
					left: "",
					top: "",
					bottom: ""
				},
				triangle: {
					left: "",
					top: "",
					bottom: "",
					"border-width": "",
					"border-color": ""
				}
			};
			const contentStyle = style.content;
			const triangleStyle = style.triangle;
			const popover = props$26.popover;
			function getNumber(value) {
				return Number(value) || 0;
			}
			if (isDesktop.value && popover) {
				(0, __vue_shared.extend)(triangleStyle, {
					position: "absolute",
					width: "0",
					height: "0",
					"margin-left": "-6px",
					"border-style": "solid"
				});
				const popoverLeft = getNumber(popover.left);
				const popoverWidth = getNumber(popover.width ? popover.width : 300);
				const popoverTop = getNumber(popover.top);
				const popoverHeight = getNumber(popover.height);
				const center = popoverLeft + popoverWidth / 2;
				contentStyle.transform = "none !important";
				const contentLeft = Math.max(0, center - popoverWidth / 2);
				contentStyle.left = `${contentLeft}px`;
				if (popover.width) contentStyle.width = `${popoverWidth}px`;
				let triangleLeft = Math.max(12, center - contentLeft);
				triangleLeft = Math.min(popoverWidth - 12, triangleLeft);
				triangleStyle.left = `${triangleLeft}px`;
				const vcl = popupHeight.value / 2;
				if (popoverTop + popoverHeight - vcl > vcl - popoverTop) {
					contentStyle.top = "auto";
					contentStyle.bottom = `${popupHeight.value - popoverTop + 6}px`;
					triangleStyle.bottom = "-6px";
					triangleStyle["border-width"] = "6px 6px 0 6px";
					triangleStyle["border-color"] = "#fcfcfd transparent transparent transparent";
				} else {
					contentStyle.top = `${popoverTop + popoverHeight + 6}px`;
					triangleStyle.top = "-6px";
					triangleStyle["border-width"] = "0 6px 6px 6px";
					triangleStyle["border-color"] = "transparent transparent #fcfcfd transparent";
				}
			}
			return style;
		})
	};
}
function useKeyboard() {
	return {
		key: (0, vue.ref)(""),
		disable: (0, vue.ref)(false)
	};
}
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
function getDefaultStartValue(props$26) {
	if (props$26.mode === mode.TIME) return "00:00";
	if (props$26.mode === mode.DATE) {
		const year = (/* @__PURE__ */ new Date()).getFullYear() - 150;
		switch (props$26.fields) {
			case fields.YEAR: return year.toString();
			case fields.MONTH: return year + "-01";
			default: return year + "-01-01";
		}
	}
	return "";
}
function getDefaultEndValue(props$26) {
	if (props$26.mode === mode.TIME) return "23:59";
	if (props$26.mode === mode.DATE) {
		const year = (/* @__PURE__ */ new Date()).getFullYear() + 150;
		switch (props$26.fields) {
			case fields.YEAR: return year.toString();
			case fields.MONTH: return year + "-12";
			default: return year + "-12-31";
		}
	}
	return "";
}
function getDateValueArray(props$26, state, valueStr, defaultValue) {
	const splitStr = props$26.mode === mode.DATE ? "-" : ":";
	const array = props$26.mode === mode.DATE ? state.dateArray : state.timeArray;
	let max;
	if (props$26.mode === mode.TIME) max = 2;
	else switch (props$26.fields) {
		case fields.YEAR:
			max = 1;
			break;
		case fields.MONTH:
			max = 2;
			break;
		default:
			max = 3;
			break;
	}
	const inputArray = String(valueStr).split(splitStr);
	let value = [];
	for (let i = 0; i < max; i++) {
		const val = inputArray[i];
		value.push(array[i].indexOf(val));
	}
	if (value.indexOf(-1) >= 0) value = defaultValue ? getDateValueArray(props$26, state, defaultValue) : value.map(() => 0);
	return value;
}
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
var selectorType = {
	PICKER: "picker",
	SELECT: "select"
};
var props = {
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
			return Object.values(mode).includes(val);
		}
	},
	fields: {
		type: String,
		default: ""
	},
	start: {
		type: String,
		default: (props$26) => {
			return getDefaultStartValue(props$26);
		}
	},
	end: {
		type: String,
		default: (props$26) => {
			return getDefaultEndValue(props$26);
		}
	},
	disabled: {
		type: [Boolean, String],
		default: false
	},
	selectorType: {
		type: String,
		default: ""
	}
};
var picker_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Picker",
	compatConfig: { MODE: 3 },
	props,
	emits: [
		"change",
		"cancel",
		"columnchange"
	],
	setup(props$26, { emit: emit$2, slots }) {
		initI18nPickerMsgsOnce();
		const { t: t$1 } = useI18n();
		const rootRef = (0, vue.ref)(null);
		const pickerRef = (0, vue.ref)(null);
		const selectRef = (0, vue.ref)(null);
		const inputRef = (0, vue.ref)(null);
		const pickerRender = (0, vue.ref)(false);
		const { state, rangeArray } = usePickerState(props$26);
		const { system, selectorTypeComputed, _show, _l10nColumn, _l10nItem, _input, _fixInputPosition, _pickerViewChange, _cancel, _change, _resetFormData, _getFormData, _createTime, _createDate, _setValueSync } = usePickerMethods(props$26, state, useCustomEvent(rootRef, emit$2), rootRef, pickerRef, selectRef, inputRef);
		usePickerWatch(state, _cancel, _change);
		usePickerForm(_resetFormData, _getFormData);
		_createTime();
		_createDate();
		_setValueSync();
		const popup = usePopupStyle(state);
		(0, vue.watchEffect)(() => {
			state.isDesktop = popup.isDesktop.value;
			state.popupStyle = popup.popupStyle.value;
		});
		return () => {
			let _slot2;
			const { visible, contentVisible, valueArray, popupStyle, valueSync } = state;
			const { rangeKey, mode: mode$1, start, end } = props$26;
			const booleanAttrs = useBooleanAttr(props$26, "disabled");
			return (0, vue.createVNode)("uni-picker", (0, vue.mergeProps)({ "ref": rootRef }, booleanAttrs, { "onClick": withWebEvent(_show) }), [
				pickerRender.value ? (0, vue.createVNode)("div", {
					"ref": pickerRef,
					"class": ["uni-picker-container", `uni-${mode$1}-${selectorTypeComputed.value}`],
					"onWheel": onEventPrevent,
					"onTouchmove": onEventPrevent
				}, [(0, vue.createVNode)(vue.Transition, { "name": "uni-fade" }, { default: () => [(0, vue.withDirectives)((0, vue.createVNode)("div", {
					"class": "uni-mask uni-picker-mask",
					"onClick": withWebEvent(_cancel),
					"onMousemove": _fixInputPosition
				}, null, 40, ["onClick", "onMousemove"]), [[vue.vShow, visible]])] }), !system.value ? (0, vue.createVNode)("div", {
					"class": [{ "uni-picker-toggle": visible }, "uni-picker-custom"],
					"style": popupStyle.content
				}, [
					(0, vue.createVNode)("div", {
						"class": "uni-picker-header",
						"onClick": onEventStop
					}, [(0, vue.createVNode)("div", {
						"class": "uni-picker-action uni-picker-action-cancel",
						"onClick": withWebEvent(_cancel)
					}, [t$1("uni.picker.cancel")], 8, ["onClick"]), (0, vue.createVNode)("div", {
						"class": "uni-picker-action uni-picker-action-confirm",
						"onClick": _change
					}, [t$1("uni.picker.done")], 8, ["onClick"])], 8, ["onClick"]),
					contentVisible ? (0, vue.createVNode)(picker_view_default, {
						"value": _l10nColumn(valueArray),
						"class": "uni-picker-content",
						"onChange": _pickerViewChange
					}, _isSlot(_slot2 = (0, vue.renderList)(_l10nColumn(rangeArray.value), (rangeItem, index0) => {
						let _slot;
						return (0, vue.createVNode)(picker_view_column_default, { "key": index0 }, _isSlot(_slot = (0, vue.renderList)(rangeItem, (item, index$1) => (0, vue.createVNode)("div", {
							"key": index$1,
							"class": "uni-picker-item"
						}, [typeof item === "object" ? item[rangeKey] || "" : _l10nItem(item, index0)]))) ? _slot : {
							default: () => [_slot],
							_: 1
						});
					})) ? _slot2 : {
						default: () => [_slot2],
						_: 1
					}, 8, ["value", "onChange"]) : null,
					(0, vue.createVNode)("div", {
						"ref": selectRef,
						"class": "uni-picker-select",
						"onWheel": onEventStop,
						"onTouchmove": onEventStop
					}, [(0, vue.renderList)(rangeArray.value[0], (item, index$1) => (0, vue.createVNode)("div", {
						"key": index$1,
						"class": ["uni-picker-item", { selected: valueArray[0] === index$1 }],
						"onClick": () => {
							valueArray[0] = index$1;
							_change();
						}
					}, [typeof item === "object" ? item[rangeKey] || "" : item], 10, ["onClick"]))], 40, ["onWheel", "onTouchmove"]),
					(0, vue.createVNode)("div", { "style": popupStyle.triangle }, null, 4)
				], 6) : null], 42, ["onWheel", "onTouchmove"]) : null,
				(0, vue.createVNode)("div", null, [slots.default && slots.default()]),
				system.value ? (0, vue.createVNode)("div", {
					"class": "uni-picker-system",
					"onMousemove": withWebEvent(_fixInputPosition)
				}, [(0, vue.createVNode)("input", {
					"class": ["uni-picker-system_input", system.value],
					"ref": inputRef,
					"value": valueSync,
					"type": mode$1,
					"tabindex": "-1",
					"min": start,
					"max": end,
					"onChange": ($event) => {
						_input($event);
						onEventStop($event);
					}
				}, null, 42, [
					"value",
					"type",
					"min",
					"max",
					"onChange"
				])], 40, ["onMousemove"]) : null
			], 16, ["onClick"]);
		};
	}
});
function usePickerState(props$26) {
	const state = (0, vue.reactive)({
		valueSync: void 0,
		visible: false,
		contentVisible: false,
		popover: null,
		valueChangeSource: "",
		timeArray: [],
		dateArray: [],
		valueArray: [],
		oldValueArray: [],
		isDesktop: false,
		popupStyle: {
			content: {},
			triangle: {}
		}
	});
	return {
		state,
		rangeArray: (0, vue.computed)(() => {
			let val = props$26.range;
			switch (props$26.mode) {
				case mode.SELECTOR: return [val];
				case mode.MULTISELECTOR: return val;
				case mode.TIME: return state.timeArray;
				case mode.DATE: {
					const dateArray = state.dateArray;
					switch (props$26.fields) {
						case fields.YEAR: return [dateArray[0]];
						case fields.MONTH: return [dateArray[0], dateArray[1]];
						default: return [
							dateArray[0],
							dateArray[1],
							dateArray[2]
						];
					}
				}
			}
			return [];
		})
	};
}
function useIsiPad() {
	return (0, vue.ref)(false);
}
function useSystem() {
	return (0, vue.ref)("");
}
var __contentVisibleDelay;
function usePickerMethods(props$26, state, trigger, rootRef, pickerRef, selectRef, inputRef) {
	const isiPad = useIsiPad();
	const _system = useSystem();
	const selectorTypeComputed = (0, vue.computed)(() => {
		const type = props$26.selectorType;
		if (Object.values(selectorType).includes(type)) return type;
		return isiPad.value ? selectorType.PICKER : selectorType.SELECT;
	});
	const system = (0, vue.computed)(() => {
		if (props$26.mode === mode.DATE && !Object.values(fields).includes(props$26.fields) && state.isDesktop) return _system.value;
		return "";
	});
	const startArray = (0, vue.computed)(() => {
		return getDateValueArray(props$26, state, props$26.start, getDefaultStartValue(props$26));
	});
	const endArray = (0, vue.computed)(() => {
		return getDateValueArray(props$26, state, props$26.end, getDefaultEndValue(props$26));
	});
	function _show(event) {
		if (props$26.disabled) return;
		state.valueChangeSource = "";
		let $picker = pickerRef.value;
		let _currentTarget = event.currentTarget;
		$picker.remove();
		(document.querySelector("uni-app") || document.body).appendChild($picker);
		$picker.style.display = "block";
		const rect = _currentTarget.getBoundingClientRect();
		state.popover = {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height
		};
		setTimeout(() => {
			state.visible = true;
		}, 20);
	}
	function _getFormData() {
		return {
			value: state.valueSync,
			key: props$26.name
		};
	}
	function _resetFormData() {
		switch (props$26.mode) {
			case mode.SELECTOR:
				state.valueSync = 0;
				break;
			case mode.MULTISELECTOR:
				state.valueSync = props$26.value.map((val) => 0);
				break;
			case mode.DATE:
			case mode.TIME:
				state.valueSync = "";
				break;
			default: break;
		}
	}
	function _createTime() {
		let hours = [];
		let minutes = [];
		for (let i = 0; i < 24; i++) hours.push((i < 10 ? "0" : "") + i);
		for (let i = 0; i < 60; i++) minutes.push((i < 10 ? "0" : "") + i);
		state.timeArray.push(hours, minutes);
	}
	function getYearStartEnd() {
		let year = (/* @__PURE__ */ new Date()).getFullYear();
		let start = year - 150;
		let end = year + 150;
		if (props$26.start) {
			const _year = new Date(props$26.start).getFullYear();
			if (!isNaN(_year) && _year < start) start = _year;
		}
		if (props$26.end) {
			const _year = new Date(props$26.end).getFullYear();
			if (!isNaN(_year) && _year > end) end = _year;
		}
		return {
			start,
			end
		};
	}
	function _createDate() {
		let years = [];
		const year = getYearStartEnd();
		for (let i = year.start, end = year.end; i <= end; i++) years.push(String(i));
		let months = [];
		for (let i = 1; i <= 12; i++) months.push((i < 10 ? "0" : "") + i);
		let days = [];
		for (let i = 1; i <= 31; i++) days.push((i < 10 ? "0" : "") + i);
		state.dateArray.push(years, months, days);
	}
	function _getTimeValue(val) {
		return val[0] * 60 + val[1];
	}
	function _getDateValue(val) {
		const DAY = 31;
		return val[0] * DAY * 12 + (val[1] || 0) * DAY + (val[2] || 0);
	}
	function _cloneArray(val1, val2) {
		for (let i = 0; i < val1.length && i < val2.length; i++) val1[i] = val2[i];
	}
	function _setValueSync() {
		let val = props$26.value;
		switch (props$26.mode) {
			case mode.MULTISELECTOR:
				{
					if (!(0, __vue_shared.isArray)(val)) val = state.valueArray;
					if (!(0, __vue_shared.isArray)(state.valueSync)) state.valueSync = [];
					const length = state.valueSync.length = Math.max(val.length, props$26.range.length);
					for (let index$1 = 0; index$1 < length; index$1++) {
						const val0 = Number(val[index$1]);
						const val1 = Number(state.valueSync[index$1]);
						const val2 = isNaN(val0) ? isNaN(val1) ? 0 : val1 : val0;
						const maxVal = props$26.range[index$1] ? props$26.range[index$1].length - 1 : 0;
						state.valueSync.splice(index$1, 1, val2 < 0 || val2 > maxVal ? 0 : val2);
					}
				}
				break;
			case mode.TIME:
			case mode.DATE:
				state.valueSync = String(val);
				break;
			default: {
				const valueSync = Number(val);
				state.valueSync = valueSync < 0 ? 0 : valueSync;
				break;
			}
		}
	}
	function _setValueArray() {
		let val = state.valueSync;
		let valueArray;
		switch (props$26.mode) {
			case mode.MULTISELECTOR:
				valueArray = [...val];
				break;
			case mode.TIME:
				valueArray = getDateValueArray(props$26, state, val, (0, __dcloudio_uni_shared.formatDateTime)({ mode: mode.TIME }));
				break;
			case mode.DATE:
				valueArray = getDateValueArray(props$26, state, val, (0, __dcloudio_uni_shared.formatDateTime)({ mode: mode.DATE }));
				break;
			default:
				valueArray = [val];
				break;
		}
		state.oldValueArray = [...valueArray];
		state.valueArray = [...valueArray];
	}
	function _getValue() {
		let val = state.valueArray;
		switch (props$26.mode) {
			case mode.SELECTOR: return val[0];
			case mode.MULTISELECTOR: return val.map((val$1) => val$1);
			case mode.TIME: return state.valueArray.map((val$1, i) => state.timeArray[i][val$1]).join(":");
			case mode.DATE: return state.valueArray.map((val$1, i) => state.dateArray[i][val$1]).join("-");
		}
	}
	function _change() {
		_close();
		state.valueChangeSource = "click";
		const value = _getValue();
		state.valueSync = (0, __vue_shared.isArray)(value) ? value.map((val) => val) : value;
		trigger("change", {}, { value });
	}
	function _cancel($event) {
		if (system.value === "firefox" && $event) {
			const { top, left, width, height } = state.popover;
			const { pageX, pageY } = $event;
			if (pageX > left && pageX < left + width && pageY > top && pageY < top + height) return;
		}
		_close();
		trigger("cancel", {}, {});
	}
	function _close() {
		state.visible = false;
		setTimeout(() => {
			let $picker = pickerRef.value;
			$picker.remove();
			rootRef.value.prepend($picker);
			$picker.style.display = "none";
		}, 260);
	}
	function _select() {
		if (props$26.mode === mode.SELECTOR && selectorTypeComputed.value === selectorType.SELECT) selectRef.value.scrollTop = state.valueArray[0] * 34;
	}
	function _input($event) {
		state.valueSync = $event.target.value;
		(0, vue.nextTick)(() => {
			_change();
		});
	}
	function _fixInputPosition($event) {
		if (system.value === "chrome") {
			const rect = rootRef.value.getBoundingClientRect();
			const fontSize = 32;
			inputRef.value.style.left = `${$event.clientX - rect.left - fontSize * 1.5}px`;
			inputRef.value.style.top = `${$event.clientY - rect.top - fontSize * .5}px`;
		}
	}
	function _pickerViewChange(event) {
		state.valueArray = _l10nColumn(event.detail.value, true);
	}
	function _l10nColumn(array, normalize) {
		const { getLocale: getLocale$1 } = useI18n();
		if (props$26.mode === mode.DATE) {
			const locale = getLocale$1();
			if (!locale.startsWith("zh")) switch (props$26.fields) {
				case fields.YEAR: return array;
				case fields.MONTH: return [array[1], array[0]];
				default: switch (locale) {
					case "es":
					case "fr": return [
						array[2],
						array[1],
						array[0]
					];
					default: return normalize ? [
						array[2],
						array[0],
						array[1]
					] : [
						array[1],
						array[2],
						array[0]
					];
				}
			}
		}
		return array;
	}
	function _l10nItem(item, index$1) {
		const { getLocale: getLocale$1 } = useI18n();
		if (props$26.mode === mode.DATE) {
			const locale = getLocale$1();
			if (locale.startsWith("zh")) return item + [
				"年",
				"月",
				"日"
			][index$1];
			else if (props$26.fields !== fields.YEAR && index$1 === (props$26.fields !== fields.MONTH && (locale === "es" || locale === "fr") ? 1 : 0)) {
				let array;
				switch (locale) {
					case "es":
						array = [
							"enero",
							"febrero",
							"marzo",
							"abril",
							"mayo",
							"junio",
							"​​julio",
							"agosto",
							"septiembre",
							"octubre",
							"noviembre",
							"diciembre"
						];
						break;
					case "fr":
						array = [
							"janvier",
							"février",
							"mars",
							"avril",
							"mai",
							"juin",
							"juillet",
							"août",
							"septembre",
							"octobre",
							"novembre",
							"décembre"
						];
						break;
					default:
						array = [
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December"
						];
						break;
				}
				return array[Number(item) - 1];
			}
		}
		return item;
	}
	(0, vue.watch)(() => state.visible, (val) => {
		if (val) {
			clearTimeout(__contentVisibleDelay);
			state.contentVisible = val;
			_select();
		} else __contentVisibleDelay = setTimeout(() => {
			state.contentVisible = val;
		}, 300);
	});
	(0, vue.watch)([
		() => props$26.mode,
		() => props$26.value,
		() => props$26.range
	], _setValueSync, { deep: true });
	(0, vue.watch)(() => state.valueSync, _setValueArray, { deep: true });
	(0, vue.watch)(() => state.valueArray, (val) => {
		if (props$26.mode === mode.TIME || props$26.mode === mode.DATE) {
			const getValue = props$26.mode === mode.TIME ? _getTimeValue : _getDateValue;
			const valueArray = state.valueArray;
			const _startArray = startArray.value;
			const _endArray = endArray.value;
			if (props$26.mode === mode.DATE) {
				const dateArray = state.dateArray;
				const max = dateArray[2].length;
				const day = Number(dateArray[2][valueArray[2]]) || 1;
				const realDay = (/* @__PURE__ */ new Date(`${dateArray[0][valueArray[0]]}/${dateArray[1][valueArray[1]]}/${day}`)).getDate();
				if (realDay < day) valueArray[2] -= realDay + max - day;
			}
			if (getValue(valueArray) < getValue(_startArray)) _cloneArray(valueArray, _startArray);
			else if (getValue(valueArray) > getValue(_endArray)) _cloneArray(valueArray, _endArray);
		}
		val.forEach((value, column) => {
			if (value !== state.oldValueArray[column]) {
				state.oldValueArray[column] = value;
				if (props$26.mode === mode.MULTISELECTOR) trigger("columnchange", {}, {
					column,
					value
				});
			}
		});
	});
	return {
		selectorTypeComputed,
		system,
		_show,
		_cancel,
		_change,
		_l10nColumn,
		_l10nItem,
		_input,
		_resetFormData,
		_getFormData,
		_createTime,
		_createDate,
		_setValueSync,
		_fixInputPosition,
		_pickerViewChange
	};
}
function usePickerWatch(state, _cancel, _change) {
	const { key, disable } = useKeyboard();
	(0, vue.watchEffect)(() => {
		disable.value = !state.visible;
	});
	(0, vue.watch)(key, (value) => {
		if (value === "esc") _cancel();
		else if (value === "enter") _change();
	});
}
function usePickerForm(_resetFormData, _getFormData) {
	const uniForm = (0, vue.inject)(uniFormKey, false);
	if (uniForm) {
		const field = {
			reset: _resetFormData,
			submit: () => {
				const data = ["", null];
				const { key, value } = _getFormData();
				if (key !== "") {
					data[0] = key;
					data[1] = value;
				}
				return data;
			}
		};
		uniForm.addField(field);
	}
}
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof(o);
}
function toPrimitive(t$1, r) {
	if ("object" != _typeof(t$1) || !t$1) return t$1;
	var e$1 = t$1[Symbol.toPrimitive];
	if (void 0 !== e$1) {
		var i = e$1.call(t$1, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t$1);
}
function toPropertyKey(t$1) {
	var i = toPrimitive(t$1, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e$1, r, t$1) {
	return (r = toPropertyKey(r)) in e$1 ? Object.defineProperty(e$1, r, {
		value: t$1,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e$1[r] = t$1, e$1;
}
var AdConfig = class AdConfig {
	static get instance() {
		if (!AdConfig._instance) {
			AdConfig._instance = new AdConfig();
			AdConfig._instance._init();
		}
		return AdConfig._instance;
	}
	constructor() {
		_defineProperty(this, "_adConfig", null);
		_defineProperty(this, "_isLoading", false);
		_defineProperty(this, "_callbacks", []);
		_defineProperty(this, "_configLast", 0);
	}
	get adConfig() {
		return this._adConfig;
	}
	get isExpired() {
		if (this._adConfig == null) return true;
		if (!this._configLast) return true;
		return Math.abs(Date.now() - this._configLast) > AdConfig.CACHE_TIME;
	}
	_init() {
		var config = this._getConfig();
		if (config === null || !config.last) return;
		if (Math.abs(Date.now() - config.last) <= AdConfig.CACHE_TIME) {
			this._adConfig = config.data;
			this._configLast = config.last;
		}
	}
	get(adpid, success, fail) {
		AdConfig.IC++;
		if (this._adConfig != null) {
			this._doCallback(adpid, success, fail);
			if (this.isExpired) this._loadAdConfig(adpid);
			return;
		}
		this._callbacks.push({
			adpid,
			success,
			fail
		});
		this._loadAdConfig(adpid);
	}
	_doCallback(adpid, success, fail) {
		AdConfig.IS++;
		var { a, b } = this._adConfig;
		const adData = a[adpid];
		if (adData) success(b, Array.isArray(adData) ? adData : [adData]);
		else fail(AdConfig.ERROR_INVALID_ADPID);
	}
	_loadAdConfig(adpid) {
		if (this._isLoading === true) return;
		this._isLoading = true;
		const appid = typeof __uniConfig !== "undefined" ? __uniConfig.appId ?? "" : "";
		uni.request({
			url: AdConfig.URL,
			method: "GET",
			timeout: 8e3,
			data: {
				d: location.hostname,
				a: adpid,
				appid
			},
			dataType: "json",
			success: (res) => {
				const rd = res.data;
				if (rd.ret === 0) {
					const data = rd.data;
					this._adConfig = data;
					this._configLast = Date.now();
					this._setConfig(data);
					this._callbacks.forEach(({ adpid: adpid$1, success, fail }) => {
						this._doCallback(adpid$1, success, fail);
					});
				} else this._callbacks.forEach((i) => {
					i.fail({
						errCode: rd.ret,
						errMsg: rd.msg
					});
				});
				this._callbacks = [];
			},
			fail: (err) => {
				this._callbacks.forEach((i) => {
					i.fail(err);
				});
				this._callbacks = [];
			},
			complete: (c) => {
				this._isLoading = false;
			}
		});
	}
	_getConfig() {
		if (!navigator.cookieEnabled || !window.localStorage) return null;
		var data = localStorage.getItem(AdConfig.KEY);
		return data ? JSON.parse(data) : null;
	}
	_setConfig(data) {
		if (!navigator.cookieEnabled || !window.localStorage) return null;
		localStorage.setItem(AdConfig.KEY, JSON.stringify({
			last: Date.now(),
			data
		}));
	}
};
_defineProperty(AdConfig, "IC", 0);
_defineProperty(AdConfig, "IS", 0);
_defineProperty(AdConfig, "URL", "https://hac1.dcloud.net.cn/ah5v2");
_defineProperty(AdConfig, "KEY", "uni_app_ad_config");
_defineProperty(AdConfig, "CACHE_TIME", 1e3 * 60 * 10);
_defineProperty(AdConfig, "ERROR_INVALID_ADPID", { "-5002": "invalid adpid" });
var AdReport = class AdReport {
	static get instance() {
		if (!AdReport._instance) AdReport._instance = new AdReport();
		return AdReport._instance;
	}
	constructor() {
		var config = this._getConfig();
		if (config && config.guid) {
			this._guid = config.guid;
			return;
		}
		this._guid = this._newGUID();
		this._setConfig(this._guid);
	}
	get(data) {
		this._process(Object.assign(data, {
			d: location.hostname,
			i: this._guid
		}));
	}
	_process(data) {
		uni.request({
			url: AdReport.URL,
			method: "GET",
			data,
			dataType: "json",
			success: () => {}
		});
	}
	_newGUID() {
		let guid = "";
		const format = "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx";
		for (let i = 0; i < 36; i++) if (format[i] === "x") guid += (Math.random() * 16 | 0).toString(16);
		else guid += format[i];
		return guid.toUpperCase();
	}
	_getConfig() {
		if (!navigator.cookieEnabled || !window.localStorage) return null;
		var data = localStorage.getItem(AdReport.KEY);
		return data ? JSON.parse(data) : null;
	}
	_setConfig(guid) {
		if (!navigator.cookieEnabled || !window.localStorage) return null;
		localStorage.setItem(AdReport.KEY, JSON.stringify({
			last: Date.now(),
			guid
		}));
	}
};
_defineProperty(AdReport, "URL", "https://has1.dcloud.net.cn/ahl");
_defineProperty(AdReport, "KEY", "uni_app_ad_guid");
var AdScript = class AdScript {
	static get instance() {
		if (!AdScript._instance) AdScript._instance = new AdScript();
		return AdScript._instance;
	}
	constructor() {
		this._callback = {};
		this._cache = {};
	}
	load(data, success, fail) {
		const provider = data.provider;
		if (this._cache[provider] === void 0) this.loadScript(data);
		if (this._cache[provider] === 1) success();
		else {
			if (!this._callback[provider]) this._callback[provider] = [];
			this._callback[provider].push({
				success,
				fail
			});
		}
	}
	loadScript(data) {
		const provider = data.provider;
		this._cache[provider] = 0;
		const domid = "uniad_provider" + provider;
		const adScriptDom = document.getElementById(domid);
		if (adScriptDom && adScriptDom.getAttribute("src")) {
			this._cache[provider] = 1;
			return;
		}
		var ads = document.createElement("script");
		ads.setAttribute("id", domid);
		const script = data.script;
		for (const var1 in script) ads.setAttribute(var1, script[var1]);
		ads.onload = () => {
			this._cache[provider] = 1;
			this._callback[provider].forEach(({ success }) => {
				success();
			});
			this._callback[provider].length = 0;
		};
		ads.onerror = (err) => {
			this._cache[provider] = void 0;
			this._callback[provider].forEach(({ fail }) => {
				fail(err);
			});
			this._callback[provider].length = 0;
		};
		document.body.append(ads);
	}
};
var CHECK_RENDER_DELAY = 1e3;
var CHECK_RENDER_RETRY = 5;
var AD_PROVIDER = {
	GDT: "2",
	TUIA: "10035"
};
var AdRender = class {
	constructor(props$26, trigger, rootRef, options) {
		_defineProperty(this, "_pi", 0);
		_defineProperty(this, "_pl", []);
		_defineProperty(this, "_b", {});
		_defineProperty(this, "_checkTimerCount", 0);
		_defineProperty(this, "_currentChannel", null);
		_defineProperty(this, "_tuiaData", null);
		this._checkTimer = null;
		this._adpid = props$26.adpid;
		this._adpidWidescreen = props$26.adpidWidescreen;
		this._widescreenWidth = props$26.widescreenWidth;
		this._trigger = trigger;
		this._rootRef = rootRef;
		this._currentAdpid = this._adpid;
		this._hasCustomTuiaMaterial = options.hasCustomTuiaMaterial;
		this._setCustomTuiaVisible = options.setCustomTuiaVisible;
	}
	renderTuiaFromCustomMaterial() {
		if (!this._tuiaData) return;
		this._renderTuia(this._tuiaData);
	}
	get isWidescreen() {
		return this._rootRef.value && this._rootRef.value.clientWidth > this._widescreenWidth;
	}
	load(adpid) {
		this._currentAdpid = adpid || (this.isWidescreen ? this._adpidWidescreen : this._adpid);
		this._reset();
		AdConfig.instance.get(this._currentAdpid, (b, a) => {
			this._b = b;
			this._pl = a;
			this._renderAd();
		}, (err) => {
			this._trigger("error", {}, err);
		});
	}
	dispose() {
		this._clearCheckTimer();
		if (this._rootRef.value) this._rootRef.value.innerHTML = "";
	}
	_renderAd() {
		if (this._pi > this._pl.length - 1) return;
		const data = this._pl[this._pi];
		if (!data) {
			this._renderNext();
			return;
		}
		const providerId = String(data.a1);
		const providerConfig = this._b[providerId];
		if (!providerConfig) {
			this._renderNext();
			return;
		}
		const script = providerConfig.script || providerConfig.s;
		this._currentChannel = providerId;
		const id$1 = this._randomId();
		this._createView(id$1);
		if (providerId === AD_PROVIDER.GDT) {
			window.TencentGDT = window.TencentGDT || [];
			AdScript.instance.load({
				provider: providerId,
				script
			}, () => {
				this._renderGdt(id$1, data);
			}, (err) => {
				this._trigger("error", {}, err);
				this._renderNext();
			});
			return;
		}
		if (providerId === AD_PROVIDER.TUIA) {
			AdScript.instance.load({
				provider: providerId,
				script
			}, () => {
				this._renderTuiaMaterial(id$1, data);
			}, (err) => {
				this._trigger("error", {}, err);
				this._renderNext();
			});
			return;
		}
		this._renderNext();
	}
	_createView(id$1) {
		if (!this._rootRef.value) return null;
		var adView = document.createElement("div");
		adView.setAttribute("id", id$1);
		adView.setAttribute("class", id$1);
		this._rootRef.value.innerHTML = "";
		this._rootRef.value.append(adView);
		return adView;
	}
	_renderGdt(id$1, data) {
		window.TencentGDT.push({
			placement_id: data.a3,
			app_id: data.a2,
			type: "native",
			count: 1,
			onComplete: (res) => {
				if (res && res.constructor === Array && res.length > 0) {
					window.TencentGDT.NATIVE.renderAd(res[0], id$1);
					this._trigger("load", {}, {});
				} else {
					this._trigger("error", {}, res || { errMsg: "No advertisement" });
					this._renderNext();
				}
			}
		});
		this._startCheckTimer();
	}
	_renderTuiaMaterial(id$1, data) {
		const adView = document.getElementById(id$1);
		if (!adView) {
			this._trigger("error", {}, { errMsg: "Invalid ad container" });
			this._renderNext();
			return;
		}
		this._tuiaData = data;
		if (this._hasCustomTuiaMaterial()) {
			adView.innerHTML = "";
			this._setCustomTuiaVisible(true);
			this.report(40, this._currentChannel || void 0);
			this._trigger("load", {}, {});
			return;
		}
		this._setCustomTuiaVisible(false);
		const materialSrc = this._getRandomTuiaMaterial(data === null || data === void 0 ? void 0 : data.imgs, data === null || data === void 0 ? void 0 : data.img);
		if (!materialSrc) {
			this._trigger("error", {}, { errMsg: "Invalid tuia material imgs/img" });
			this._renderNext();
			return;
		}
		const img = document.createElement("img");
		img.src = materialSrc;
		img.onerror = () => {
			this._trigger("error", {}, { errMsg: "Tuia material load fail" });
			this._renderNext();
		};
		img.alt = "ad";
		img.setAttribute("draggable", "false");
		img.style.width = "100%";
		img.style.height = "auto";
		img.style.display = "block";
		img.style.cursor = "pointer";
		img.onclick = () => {
			this._renderTuia(data);
		};
		adView.innerHTML = "";
		adView.append(img);
		this.report(40, this._currentChannel || void 0);
		this._trigger("load", {}, {});
	}
	_getRandomTuiaMaterial(imgs, img) {
		if (Array.isArray(imgs)) {
			const list = imgs.filter((item) => typeof item === "string" && item);
			if (list.length) return list[Math.floor(Math.random() * list.length)];
		}
		if (typeof img === "string") return img;
		return "";
	}
	_renderTuia(data) {
		this._setCustomTuiaVisible(false);
		const tuia = window.TuiaSDKLite;
		if (!tuia || typeof tuia.execute !== "function") {
			this._trigger("error", {}, { errMsg: "Invalid TuiaSDKLite" });
			this._renderNext();
			return;
		}
		tuia.execute({
			data: {
				pid: data.a3,
				fail_message: "ad load fail",
				product_name: document.title || location.hostname
			},
			success: (res) => {
				this._trigger("load", {}, res || {});
			},
			fail: (err) => {
				this._trigger("error", {}, err || { errMsg: "TuiaSDKLite execute fail" });
				this._renderNext();
			}
		});
	}
	_renderAdView(provider, data) {
		var randomId = this._randomId();
		var adView = document.createElement("div");
		adView.setAttribute("class", randomId);
		this._rootRef.value.innerHTML = "";
		this._rootRef.value.append(adView);
		const scriptPath = provider.s || provider.script;
		if (!scriptPath || typeof scriptPath !== "string") {
			this._trigger("error", {}, { errMsg: "Invalid provider script" });
			this._renderNext();
			return;
		}
		try {
			let bindThis = window;
			scriptPath.split(".").reduce((total, currentValue) => {
				bindThis = total;
				return total[currentValue];
			}, window).bind(bindThis)(data.a2, randomId, 2);
		} catch (err) {
			this._trigger("error", {}, err);
			this._renderNext();
			return;
		}
		this._startCheckTimer();
	}
	_renderNext() {
		if (this._pi >= this._pl.length - 1) return;
		this._pi++;
		this._renderAd();
	}
	_checkRender() {
		if (!this._rootRef.value) return false;
		var hasContent = this._rootRef.value.children.length > 0 && this._rootRef.value.clientHeight > 40;
		if (hasContent) this.report(40, this._currentChannel || void 0);
		return hasContent;
	}
	_startCheckTimer() {
		this._clearCheckTimer();
		this._checkTimer = setInterval(() => {
			this._checkTimerCount++;
			if (this._checkTimerCount >= CHECK_RENDER_RETRY) {
				this._clearCheckTimer();
				this._renderNext();
				return;
			}
			if (this._checkRender()) this._clearCheckTimer();
		}, CHECK_RENDER_DELAY);
	}
	_clearCheckTimer() {
		this._checkTimerCount = 0;
		if (this._checkTimer != null) {
			window.clearInterval(this._checkTimer);
			this._checkTimer = null;
		}
	}
	report(type, currentChannel) {
		const reportData = {
			h: typeof __uniConfig !== "undefined" ? __uniConfig.compilerVersion ?? "" : "",
			a: this._currentAdpid,
			at: type
		};
		if (currentChannel) reportData.t = currentChannel;
		AdReport.instance.get(reportData);
	}
	_randomId() {
		var result = "";
		for (let i = 0; i < 4; i++) result += (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
		return "_u" + result;
	}
	_reset() {
		this._b = {};
		this._pl = [];
		this._pi = 0;
		this._tuiaData = null;
		this._setCustomTuiaVisible(false);
		this._clearCheckTimer();
		if (this._rootRef.value) this._rootRef.value.innerHTML = "";
	}
};
var DEFAULT_WIDESCREEN_WIDTH = 750;
var ad_default = /* @__PURE__ */ defineBuiltInComponent({
	inheritAttrs: false,
	name: "Ad",
	props: {
		adpid: {
			type: String,
			default: ""
		},
		adpidWidescreen: {
			type: String,
			default: ""
		},
		widescreenWidth: {
			type: Number,
			default: DEFAULT_WIDESCREEN_WIDTH
		}
	},
	setup(props$26, { emit: emit$2, slots }) {
		const rootRef = (0, vue.ref)(null);
		const customTuiaVisible = (0, vue.ref)(false);
		const { $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
		const ad = new AdRender(props$26, useCustomEvent(rootRef, emit$2), rootRef, {
			hasCustomTuiaMaterial: () => Boolean(slots.default && slots.default().length),
			setCustomTuiaVisible: (visible) => {
				customTuiaVisible.value = visible;
			}
		});
		(0, vue.watch)(() => props$26.adpid, (val) => {
			ad.load(val);
		});
		(0, vue.watch)(() => props$26.adpidWidescreen, (val) => {
			ad.load(val);
		});
		return () => {
			const { adpid, adpidWidescreen, widescreenWidth } = props$26;
			return (0, vue.createVNode)(vue.Fragment, null, [(0, vue.createVNode)("uni-ad", (0, vue.mergeProps)($listeners.value, $excludeAttrs.value, {
				"adpid": adpid,
				"adpidWidescreen": adpidWidescreen,
				"widescreenWidth": widescreenWidth
			}), [(0, vue.createVNode)("div", {
				"ref": rootRef,
				"class": "uni-ad-container",
				"onClick": () => ad.report(41)
			}, null, 8, ["onClick"]), customTuiaVisible.value && slots.default ? (0, vue.createVNode)("div", {
				"class": "uni-ad-custom-material",
				"onClick": () => ad.renderTuiaFromCustomMaterial()
			}, [slots.default()], 8, ["onClick"]) : null], 16, [
				"adpid",
				"adpidWidescreen",
				"widescreenWidth"
			])]);
		};
	}
});
var ad_content_page_default = /* @__PURE__ */ defineUnsupportedComponent("ad-content-page");
var ad_draw_default = /* @__PURE__ */ defineUnsupportedComponent("ad-draw");
var camera_default = /* @__PURE__ */ defineUnsupportedComponent("camera");
var live_player_default = /* @__PURE__ */ defineUnsupportedComponent("live-player");
var live_pusher_default = /* @__PURE__ */ defineUnsupportedComponent("live-pusher");
const UniViewJSBridge$1 = /* @__PURE__ */ (0, __vue_shared.extend)(ViewJSBridge, { publishHandler(event, args, pageId) {
	UniServiceJSBridge.subscribeHandler(event, args, pageId);
} });
const request = /* @__PURE__ */ defineTaskApi(API_REQUEST, ({ url, data, header = {}, method, dataType: dataType$1, responseType, enableChunked, withCredentials, timeout = __uniConfig.networkTimeout.request }, { resolve, reject }) => {
	let body = null;
	const contentType = normalizeContentType(header);
	if (method !== "GET") if ((0, __vue_shared.isString)(data) || data instanceof ArrayBuffer) body = data;
	else if (contentType === "json") try {
		body = JSON.stringify(data);
	} catch (error) {
		body = data.toString();
	}
	else if (contentType === "urlencoded") {
		const bodyArray = [];
		for (const key in data) if ((0, __vue_shared.hasOwn)(data, key)) bodyArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
		body = bodyArray.join("&");
	} else body = data.toString();
	let requestTask;
	if (!enableChunked) {
		const xhr = new XMLHttpRequest();
		requestTask = new RequestTask(xhr);
		xhr.open(method, url);
		for (const key in header) if ((0, __vue_shared.hasOwn)(header, key)) xhr.setRequestHeader(key, header[key]);
		const timer = setTimeout(function() {
			xhr.onload = xhr.onabort = xhr.onerror = null;
			requestTask.abort();
			reject("timeout", { errCode: 5 });
		}, timeout);
		xhr.responseType = responseType;
		xhr.onload = function() {
			clearTimeout(timer);
			const statusCode = xhr.status;
			let res = responseType === "text" ? xhr.responseText : xhr.response;
			if (responseType === "text") res = parseResponseText(res, responseType, dataType$1);
			resolve({
				data: res,
				statusCode,
				header: parseHeaders(xhr.getAllResponseHeaders()),
				cookies: []
			});
		};
		xhr.onabort = function() {
			clearTimeout(timer);
			reject("abort", { errCode: 600003 });
		};
		xhr.onerror = function() {
			clearTimeout(timer);
			reject(void 0, { errCode: 5 });
		};
		xhr.withCredentials = withCredentials;
		xhr.send(body);
	} else {
		const controller = new AbortController();
		const signal = controller.signal;
		requestTask = new RequestTask(controller);
		const fetchOptions = {
			method,
			headers: header,
			body,
			signal,
			credentials: withCredentials ? "include" : "same-origin"
		};
		const timer = setTimeout(function() {
			requestTask.abort();
			reject("timeout", { errCode: 5 });
		}, timeout);
		fetchOptions.signal.addEventListener("abort", function() {
			clearTimeout(timer);
			reject("abort", { errCode: 600003 });
		});
		window.fetch(url, fetchOptions).then((response) => {
			const statusCode = response.status;
			const header$1 = response.headers;
			const body$1 = response.body;
			const headerObj = {};
			header$1.forEach((value, key) => {
				headerObj[key] = value;
			});
			const cookies = cookiesParse(headerObj);
			requestTask._emitter.emit("headersReceived", {
				header: headerObj,
				statusCode,
				cookies
			});
			if (!body$1) {
				resolve({
					data: "",
					statusCode,
					header: headerObj,
					cookies
				});
				return;
			}
			const reader = body$1.getReader();
			const bodyBuffers = [];
			const streamReaderRead = () => {
				reader.read().then(({ done, value }) => {
					if (done) {
						const result = concatArrayBuffers(bodyBuffers);
						let res = responseType === "text" ? new TextDecoder().decode(result) : result;
						if (responseType === "text") res = parseResponseText(res, responseType, dataType$1);
						resolve({
							data: res,
							statusCode,
							header: headerObj,
							cookies
						});
						return;
					}
					const chunk = value;
					bodyBuffers.push(chunk);
					requestTask._emitter.emit("chunkReceived", { data: chunk });
					streamReaderRead();
				});
			};
			streamReaderRead();
		}, (error) => {
			reject(error, { errCode: 5 });
		});
	}
	return requestTask;
}, RequestProtocol, RequestOptions);
var cookiesParse = (header) => {
	let cookiesStr = header["Set-Cookie"] || header["set-cookie"];
	let cookiesArr = [];
	if (!cookiesStr) return [];
	if (cookiesStr[0] === "[" && cookiesStr[cookiesStr.length - 1] === "]") cookiesStr = cookiesStr.slice(1, -1);
	const handleCookiesArr = cookiesStr.split(";");
	for (let i = 0; i < handleCookiesArr.length; i++) if (handleCookiesArr[i].indexOf("Expires=") !== -1 || handleCookiesArr[i].indexOf("expires=") !== -1) cookiesArr.push(handleCookiesArr[i].replace(",", ""));
	else cookiesArr.push(handleCookiesArr[i]);
	cookiesArr = cookiesArr.join(";").split(",");
	return cookiesArr;
};
function concatArrayBuffers(buffers) {
	const totalLength = buffers.reduce((acc, buf) => acc + buf.byteLength, 0);
	const result = new Uint8Array(totalLength);
	let offset = 0;
	for (const buffer of buffers) {
		result.set(new Uint8Array(buffer), offset);
		offset += buffer.byteLength;
	}
	return result.buffer;
}
function normalizeContentType(header) {
	const name = Object.keys(header).find((name$1) => name$1.toLowerCase() === "content-type");
	if (!name) return;
	const contentType = header[name];
	if (name !== "Content-Type") {
		header["Content-Type"] = header[name];
		delete header[name];
	}
	if (!contentType) return "string";
	if (contentType.indexOf("application/json") === 0) return "json";
	else if (contentType.indexOf("application/x-www-form-urlencoded") === 0) return "urlencoded";
	return "string";
}
var RequestTask = class {
	constructor(controller) {
		this._requestOnChunkReceiveCallbackId = 0;
		this._requestOnChunkReceiveCallbacks = /* @__PURE__ */ new Map();
		this._requestOnHeadersReceiveCallbackId = 0;
		this._requestOnHeadersReceiveCallbacks = /* @__PURE__ */ new Map();
		this._emitter = new __dcloudio_uni_shared.Emitter();
		this._controller = controller;
	}
	abort() {
		if (this._controller) {
			this._controller.abort();
			delete this._controller;
		}
	}
	onHeadersReceived(callback) {
		this._emitter.on("headersReceived", callback);
		this._requestOnHeadersReceiveCallbackId++;
		this._requestOnHeadersReceiveCallbacks.set(this._requestOnHeadersReceiveCallbackId, callback);
		return this._requestOnHeadersReceiveCallbackId;
	}
	offHeadersReceived(callback) {
		if (callback == null) {
			this._emitter.off("headersReceived");
			return;
		}
		if (typeof callback === "function") {
			this._requestOnHeadersReceiveCallbacks.forEach((cb, id$1) => {
				if (cb === callback) {
					this._requestOnHeadersReceiveCallbacks.delete(id$1);
					this._emitter.off("headersReceived", callback);
				}
			});
			return;
		}
		const callbackFn = this._requestOnHeadersReceiveCallbacks.get(callback);
		if (!callbackFn) return;
		this._requestOnHeadersReceiveCallbacks.delete(callback);
		this._emitter.off("headersReceived", callbackFn);
	}
	onChunkReceived(callback) {
		this._emitter.on("chunkReceived", callback);
		this._requestOnChunkReceiveCallbackId++;
		this._requestOnChunkReceiveCallbacks.set(this._requestOnChunkReceiveCallbackId, callback);
		return this._requestOnChunkReceiveCallbackId;
	}
	offChunkReceived(callback) {
		if (callback == null) {
			this._emitter.off("chunkReceived");
			return;
		}
		if (typeof callback === "function") {
			this._requestOnChunkReceiveCallbacks.forEach((cb, id$1) => {
				if (cb === callback) {
					this._requestOnChunkReceiveCallbacks.delete(id$1);
					this._emitter.off("chunkReceived", callback);
				}
			});
			return;
		}
		const callbackFn = this._requestOnChunkReceiveCallbacks.get(callback);
		if (!callbackFn) return;
		this._requestOnChunkReceiveCallbacks.delete(callback);
		this._emitter.off("chunkReceived", callbackFn);
	}
};
function parseHeaders(headers) {
	const headersObject = {};
	headers.split(__dcloudio_uni_shared.LINEFEED).forEach((header) => {
		const find = header.match(/(\S+\s*):\s*(.*)/);
		if (!find || find.length !== 3) return;
		headersObject[find[1]] = find[2];
	});
	return headersObject;
}
function parseResponseText(responseText, responseType, dataType$1) {
	let res = responseText;
	if (responseType === "text" && dataType$1 === "json") try {
		res = JSON.parse(res);
	} catch (error) {}
	return res;
}
var STORAGE_KEYS = "uni-storage-keys";
function parseValue(value) {
	const types = [
		"object",
		"string",
		"number",
		"boolean",
		"undefined"
	];
	try {
		const object = (0, __vue_shared.isString)(value) ? JSON.parse(value) : value;
		const type = object.type;
		if (types.indexOf(type) >= 0) {
			const keys = Object.keys(object);
			if (keys.length === 2 && "data" in object) {
				if (typeof object.data === type) return object.data;
				if (type === "object" && /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(object.data)) return new Date(object.data);
			} else if (keys.length === 1) return "";
		}
	} catch (error) {}
}
const setStorageSync = /* @__PURE__ */ defineSyncApi(API_SET_STORAGE_SYNC, (key, data) => {
	const type = typeof data;
	const value = type === "string" ? data : JSON.stringify({
		type,
		data
	});
	localStorage.setItem(key, value);
}, SetStorageSyncProtocol);
const setStorage = /* @__PURE__ */ defineAsyncApi(API_SET_STORAGE, ({ key, data }, { resolve, reject }) => {
	try {
		setStorageSync(key, data);
		resolve();
	} catch (error) {
		reject(error.message);
	}
}, SetStorageProtocol);
function getStorageOrigin(key) {
	const value = localStorage && localStorage.getItem(key);
	if (!(0, __vue_shared.isString)(value)) throw new Error("data not found");
	let data = value;
	try {
		const result = parseValue(JSON.parse(value));
		if (result !== void 0) data = result;
	} catch (error) {}
	return data;
}
const getStorageSync = /* @__PURE__ */ defineSyncApi(API_GET_STORAGE_SYNC, (key) => {
	try {
		return getStorageOrigin(key);
	} catch (error) {
		return "";
	}
}, GetStorageSyncProtocol);
const getStorage = /* @__PURE__ */ defineAsyncApi(API_GET_STORAGE, ({ key }, { resolve, reject }) => {
	try {
		resolve({ data: getStorageOrigin(key) });
	} catch (error) {
		reject(error.message);
	}
}, GetStorageProtocol);
const removeStorageSync = /* @__PURE__ */ defineSyncApi(API_REMOVE_STORAGE, (key) => {
	if (localStorage) localStorage.removeItem(key);
}, RemoveStorageSyncProtocol);
const removeStorage = /* @__PURE__ */ defineAsyncApi(API_REMOVE_STORAGE, ({ key }, { resolve }) => {
	removeStorageSync(key);
	resolve();
}, RemoveStorageProtocol);
const clearStorageSync = /* @__PURE__ */ defineSyncApi("clearStorageSync", () => {
	if (localStorage) localStorage.clear();
});
const clearStorage = /* @__PURE__ */ defineAsyncApi("clearStorage", (_, { resolve }) => {
	clearStorageSync();
	resolve();
});
const getStorageInfoSync = /* @__PURE__ */ defineSyncApi("getStorageInfoSync", () => {
	const length = localStorage && localStorage.length || 0;
	const keys = [];
	let currentSize = 0;
	for (let index$1 = 0; index$1 < length; index$1++) {
		const key = localStorage.key(index$1);
		const value = localStorage.getItem(key) || "";
		currentSize += key.length + value.length;
		if (key !== STORAGE_KEYS) keys.push(key);
	}
	return {
		keys,
		currentSize: Math.ceil(currentSize * 2 / 1024),
		limitSize: Number.MAX_VALUE
	};
});
const getStorageInfo = /* @__PURE__ */ defineAsyncApi("getStorageInfo", (_, { resolve }) => {
	resolve(getStorageInfoSync());
});
function getTheme() {
	if (__uniConfig.darkmode !== true) return (0, __vue_shared.isString)(__uniConfig.darkmode) ? __uniConfig.darkmode : "light";
	try {
		return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
	} catch (error) {
		return "light";
	}
}
var browserInfo;
function initBrowserInfo() {
	return browserInfo = {};
}
const getDeviceInfo = /* @__PURE__ */ defineSyncApi("getDeviceInfo", () => {
	initBrowserInfo();
	const { deviceBrand, deviceModel, brand, model, platform, system, deviceOrientation, deviceType, osname, osversion } = browserInfo;
	return (0, __vue_shared.extend)({
		brand,
		deviceBrand,
		deviceModel,
		devicePixelRatio: 1,
		deviceId: Date.now() + "" + Math.floor(Math.random() * 1e7),
		deviceOrientation,
		deviceType,
		model,
		osName: osname ? osname.toLowerCase() : void 0,
		osVersion: osversion,
		platform,
		system
	});
});
const getAppBaseInfo = /* @__PURE__ */ defineSyncApi("getAppBaseInfo", () => {
	initBrowserInfo();
	const { theme, language, browserName, browserVersion } = browserInfo;
	return (0, __vue_shared.extend)({
		appId: __uniConfig.appId,
		appName: __uniConfig.appName,
		appVersion: __uniConfig.appVersion,
		appVersionCode: __uniConfig.appVersionCode,
		appLanguage: getLocale ? getLocale() : language,
		enableDebug: false,
		hostSDKVersion: void 0,
		hostPackageName: void 0,
		hostFontSizeSetting: void 0,
		hostName: browserName,
		hostVersion: browserVersion,
		hostTheme: theme,
		hostLanguage: language,
		isUniAppX: false,
		language,
		SDKVersion: "",
		theme,
		uniPlatform: "web",
		uniCompileVersion: __uniConfig.compilerVersion,
		uniCompilerVersion: __uniConfig.compilerVersion,
		uniRuntimeVersion: __uniConfig.compilerVersion,
		version: ""
	}, {});
});
const getSystemInfoSync = /* @__PURE__ */ defineSyncApi("getSystemInfoSync", () => {
	return {
		deviceId: Date.now() + "" + Math.floor(Math.random() * 1e7),
		platform: "nodejs"
	};
});
function updateDocumentTitle(title) {
	{
		const ssrContext = getApp$1().$.appContext.provides[vue.ssrContextKey];
		if (ssrContext) ssrContext[__dcloudio_uni_shared.UNI_SSR_TITLE] = title;
	}
	UniServiceJSBridge.emit(__dcloudio_uni_shared.ON_NAVIGATION_BAR_CHANGE, { titleText: title });
}
function useDocumentTitle(pageMeta) {
	function update() {
		updateDocumentTitle(pageMeta.navigationBar.titleText);
	}
	(0, vue.watchEffect)(update);
}
function setNavigationBar(pageMeta, type, args, resolve, reject) {
	if (!pageMeta) return reject("page not found");
	const { navigationBar } = pageMeta;
	switch (type) {
		case API_SET_NAVIGATION_BAR_COLOR:
			const { frontColor, backgroundColor, animation } = args;
			const { duration, timingFunc } = animation;
			if (frontColor) navigationBar.titleColor = frontColor === "#000000" ? "#000000" : "#ffffff";
			if (backgroundColor) navigationBar.backgroundColor = backgroundColor;
			navigationBar.duration = duration + "ms";
			navigationBar.timingFunc = timingFunc;
			break;
		case API_SHOW_NAVIGATION_BAR_LOADING:
			navigationBar.loading = true;
			break;
		case API_HIDE_NAVIGATION_BAR_LOADING:
			navigationBar.loading = false;
			break;
		case API_SET_NAVIGATION_BAR_TITLE:
			const { title } = args;
			navigationBar.titleText = title;
			updateDocumentTitle(args.title);
			break;
	}
	resolve();
}
const setNavigationBarTitle = /* @__PURE__ */ defineAsyncApi(API_SET_NAVIGATION_BAR_TITLE, (args, { resolve, reject }) => {
	setNavigationBar(getCurrentPageMeta(), API_SET_NAVIGATION_BAR_TITLE, args, resolve, reject);
}, SetNavigationBarTitleProtocol);
var require_localStorage = /* @__PURE__ */ __commonJSMin((() => {
	var valuesMap = /* @__PURE__ */ new Map();
	var LocalStorage = class {
		getItem(key) {
			const stringKey = String(key);
			if (valuesMap.has(key)) return String(valuesMap.get(stringKey));
			return null;
		}
		setItem(key, val) {
			valuesMap.set(String(key), String(val));
		}
		removeItem(key) {
			valuesMap.delete(key);
		}
		clear() {
			valuesMap.clear();
		}
		key(i) {
			if (arguments.length === 0) throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.");
			return Array.from(valuesMap.keys())[i];
		}
		get length() {
			return valuesMap.size;
		}
	};
	var instance = new LocalStorage();
	global.localStorage = new Proxy(instance, {
		set: function(obj, prop, value) {
			if (LocalStorage.prototype.hasOwnProperty(prop)) instance[prop] = value;
			else instance.setItem(prop, value);
			return true;
		},
		get: function(target, name) {
			if (LocalStorage.prototype.hasOwnProperty(name)) return instance[name];
			if (valuesMap.has(name)) return instance.getItem(name);
		}
	});
}));
var require___vite_browser_external = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
var require_XMLHttpRequest = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
	*
	* This can be used with JS designed for browsers to improve reuse of code and
	* allow the use of existing libraries.
	*
	* Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
	*
	* @author Dan DeFelippi <dan@driverdan.com>
	* @contributor David Ellis <d.f.ellis@ieee.org>
	* @license MIT
	*/
	var Url = require___vite_browser_external();
	var spawn = require___vite_browser_external().spawn;
	var fs = require___vite_browser_external();
	exports.XMLHttpRequest = function() {
		"use strict";
		var self = this;
		var http = require___vite_browser_external();
		var https = require___vite_browser_external();
		var request$1;
		var response;
		var settings = {};
		var disableHeaderCheck = false;
		var defaultHeaders = {
			"User-Agent": "node-XMLHttpRequest",
			"Accept": "*/*"
		};
		var headers = {};
		var headersCase = {};
		var forbiddenRequestHeaders = [
			"accept-charset",
			"accept-encoding",
			"access-control-request-headers",
			"access-control-request-method",
			"connection",
			"content-length",
			"content-transfer-encoding",
			"cookie",
			"cookie2",
			"date",
			"expect",
			"host",
			"keep-alive",
			"origin",
			"referer",
			"te",
			"trailer",
			"transfer-encoding",
			"upgrade",
			"via"
		];
		var forbiddenRequestMethods = [
			"TRACE",
			"TRACK",
			"CONNECT"
		];
		var sendFlag = false;
		var errorFlag = false;
		var listeners = {};
		this.UNSENT = 0;
		this.OPENED = 1;
		this.HEADERS_RECEIVED = 2;
		this.LOADING = 3;
		this.DONE = 4;
		this.readyState = this.UNSENT;
		this.onreadystatechange = null;
		this.responseText = "";
		this.responseXML = "";
		this.status = null;
		this.statusText = null;
		this.withCredentials = false;
		var isAllowedHttpHeader = function(header) {
			return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1;
		};
		var isAllowedHttpMethod = function(method) {
			return method && forbiddenRequestMethods.indexOf(method) === -1;
		};
		this.open = function(method, url, async, user, password) {
			this.abort();
			errorFlag = false;
			if (!isAllowedHttpMethod(method)) throw new Error("SecurityError: Request method not allowed");
			settings = {
				"method": method,
				"url": url.toString(),
				"async": typeof async !== "boolean" ? true : async,
				"user": user || null,
				"password": password || null
			};
			setState(this.OPENED);
		};
		this.setDisableHeaderCheck = function(state) {
			disableHeaderCheck = state;
		};
		this.setRequestHeader = function(header, value) {
			if (this.readyState !== this.OPENED) throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
			if (!isAllowedHttpHeader(header)) {
				console.warn("Refused to set unsafe header \"" + header + "\"");
				return;
			}
			if (sendFlag) throw new Error("INVALID_STATE_ERR: send flag is true");
			header = headersCase[header.toLowerCase()] || header;
			headersCase[header.toLowerCase()] = header;
			headers[header] = headers[header] ? headers[header] + ", " + value : value;
		};
		this.getResponseHeader = function(header) {
			if (typeof header === "string" && this.readyState > this.OPENED && response && response.headers && response.headers[header.toLowerCase()] && !errorFlag) return response.headers[header.toLowerCase()];
			return null;
		};
		this.getAllResponseHeaders = function() {
			if (this.readyState < this.HEADERS_RECEIVED || errorFlag) return "";
			var result = "";
			for (var i in response.headers) if (i !== "set-cookie" && i !== "set-cookie2") result += i + ": " + response.headers[i] + "\r\n";
			return result.substr(0, result.length - 2);
		};
		this.getRequestHeader = function(name) {
			if (typeof name === "string" && headersCase[name.toLowerCase()]) return headers[headersCase[name.toLowerCase()]];
			return "";
		};
		this.send = function(data) {
			if (this.readyState !== this.OPENED) throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
			if (sendFlag) throw new Error("INVALID_STATE_ERR: send has already been called");
			var ssl = false, local = false;
			var url = Url.parse(settings.url);
			var host;
			switch (url.protocol) {
				case "https:": ssl = true;
				case "http:":
					host = url.hostname;
					break;
				case "file:":
					local = true;
					break;
				case void 0:
				case null:
				case "":
					host = "localhost";
					break;
				default: throw new Error("Protocol not supported.");
			}
			if (local) {
				if (settings.method !== "GET") throw new Error("XMLHttpRequest: Only GET method is supported");
				if (settings.async) fs.readFile(url.pathname, "utf8", function(error, data$1) {
					if (error) self.handleError(error);
					else {
						self.status = 200;
						self.responseText = data$1;
						setState(self.DONE);
					}
				});
				else try {
					this.responseText = fs.readFileSync(url.pathname, "utf8");
					this.status = 200;
					setState(self.DONE);
				} catch (e$1) {
					this.handleError(e$1);
				}
				return;
			}
			var port = url.port || (ssl ? 443 : 80);
			var uri = url.pathname + (url.search ? url.search : "");
			for (var name in defaultHeaders) if (!headersCase[name.toLowerCase()]) headers[name] = defaultHeaders[name];
			headers.Host = host;
			if (!(ssl && port === 443 || port === 80)) headers.Host += ":" + url.port;
			if (settings.user) {
				if (typeof settings.password === "undefined") settings.password = "";
				var authBuf = new Buffer(settings.user + ":" + settings.password);
				headers.Authorization = "Basic " + authBuf.toString("base64");
			}
			if (settings.method === "GET" || settings.method === "HEAD") data = null;
			else if (data) {
				headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);
				if (!headers["Content-Type"]) headers["Content-Type"] = "text/plain;charset=UTF-8";
			} else if (settings.method === "POST") headers["Content-Length"] = 0;
			var options = {
				host,
				port,
				path: uri,
				method: settings.method,
				headers,
				agent: false,
				withCredentials: self.withCredentials
			};
			errorFlag = false;
			if (settings.async) {
				var doRequest = ssl ? https.request : http.request;
				sendFlag = true;
				self.dispatchEvent("readystatechange");
				var responseHandler = function responseHandler$1(resp$1) {
					response = resp$1;
					if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
						settings.url = response.headers.location;
						var url$1 = Url.parse(settings.url);
						host = url$1.hostname;
						request$1 = doRequest({
							hostname: url$1.hostname,
							port: url$1.port,
							path: url$1.path,
							method: response.statusCode === 303 ? "GET" : settings.method,
							headers,
							withCredentials: self.withCredentials
						}, responseHandler$1).on("error", errorHandler);
						request$1.end();
						return;
					}
					response.setEncoding("utf8");
					setState(self.HEADERS_RECEIVED);
					self.status = response.statusCode;
					response.on("data", function(chunk) {
						if (chunk) self.responseText += chunk;
						if (sendFlag) setState(self.LOADING);
					});
					response.on("end", function() {
						if (sendFlag) {
							setState(self.DONE);
							sendFlag = false;
						}
					});
					response.on("error", function(error) {
						self.handleError(error);
					});
				};
				var errorHandler = function errorHandler$1(error) {
					self.handleError(error);
				};
				request$1 = doRequest(options, responseHandler).on("error", errorHandler);
				if (data) request$1.write(data);
				request$1.end();
				self.dispatchEvent("loadstart");
			} else {
				var contentFile = ".node-xmlhttprequest-content-" + process.pid;
				var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
				fs.writeFileSync(syncFile, "", "utf8");
				var execString = "var http = require('http'), https = require('https'), fs = require('fs');var doRequest = http" + (ssl ? "s" : "") + ".request;var options = " + JSON.stringify(options) + ";var responseText = '';var req = doRequest(options, function(response) {response.setEncoding('utf8');response.on('data', function(chunk) {  responseText += chunk;});response.on('end', function() {fs.writeFileSync('" + contentFile + "', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText}}), 'utf8');fs.unlinkSync('" + syncFile + "');});response.on('error', function(error) {fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');fs.unlinkSync('" + syncFile + "');});}).on('error', function(error) {fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');fs.unlinkSync('" + syncFile + "');});" + (data ? "req.write('" + JSON.stringify(data).slice(1, -1).replace(/'/g, "\\'") + "');" : "") + "req.end();";
				var syncProc = spawn(process.argv[0], ["-e", execString]);
				while (fs.existsSync(syncFile));
				var resp = JSON.parse(fs.readFileSync(contentFile, "utf8"));
				syncProc.stdin.end();
				fs.unlinkSync(contentFile);
				if (resp.err) self.handleError(resp.err);
				else {
					response = resp.data;
					self.status = resp.data.statusCode;
					self.responseText = resp.data.text;
					setState(self.DONE);
				}
			}
		};
		this.handleError = function(error) {
			this.status = 0;
			this.statusText = error;
			this.responseText = error.stack;
			errorFlag = true;
			setState(this.DONE);
			this.dispatchEvent("error");
		};
		this.abort = function() {
			if (request$1) {
				request$1.abort();
				request$1 = null;
			}
			headers = defaultHeaders;
			this.status = 0;
			this.responseText = "";
			this.responseXML = "";
			errorFlag = true;
			if (this.readyState !== this.UNSENT && (this.readyState !== this.OPENED || sendFlag) && this.readyState !== this.DONE) {
				sendFlag = false;
				setState(this.DONE);
			}
			this.readyState = this.UNSENT;
			this.dispatchEvent("abort");
		};
		this.addEventListener = function(event, callback) {
			if (!(event in listeners)) listeners[event] = [];
			listeners[event].push(callback);
		};
		this.removeEventListener = function(event, callback) {
			if (event in listeners) listeners[event] = listeners[event].filter(function(ev) {
				return ev !== callback;
			});
		};
		this.dispatchEvent = function(event) {
			if (typeof self["on" + event] === "function") self["on" + event]();
			if (event in listeners) for (var i = 0, len = listeners[event].length; i < len; i++) listeners[event][i].call(self);
		};
		var setState = function(state) {
			if (state == self.LOADING || self.readyState !== state) {
				self.readyState = state;
				if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) self.dispatchEvent("readystatechange");
				if (self.readyState === self.DONE && !errorFlag) {
					self.dispatchEvent("load");
					self.dispatchEvent("loadend");
				}
			}
		};
	};
}));
var api_exports = /* @__PURE__ */ __export({
	clearStorage: () => clearStorage,
	clearStorageSync: () => clearStorageSync,
	getAppBaseInfo: () => getAppBaseInfo,
	getDeviceInfo: () => getDeviceInfo,
	getStorage: () => getStorage,
	getStorageInfo: () => getStorageInfo,
	getStorageInfoSync: () => getStorageInfoSync,
	getStorageSync: () => getStorageSync,
	getSystemInfoSync: () => getSystemInfoSync,
	removeStorage: () => removeStorage,
	removeStorageSync: () => removeStorageSync,
	request: () => request,
	setNavigationBarTitle: () => setNavigationBarTitle,
	setStorage: () => setStorage,
	setStorageSync: () => setStorageSync
}, 1);
require_localStorage();
global.XMLHttpRequest = require_XMLHttpRequest().XMLHttpRequest;
const uni$1 = api_exports;
const UniServiceJSBridge$1 = /* @__PURE__ */ (0, __vue_shared.extend)(ServiceJSBridge, { publishHandler(event, args, pageId) {
	UniViewJSBridge.subscribeHandler(event, args, pageId);
} });
function onThemeChange(callback) {
	if (__uniConfig.darkmode) UniServiceJSBridge.on(__dcloudio_uni_shared.ON_THEME_CHANGE, callback);
}
function parseTheme(pageStyle) {
	let parsedStyle = {};
	if (__uniConfig.darkmode) parsedStyle = (0, __dcloudio_uni_shared.normalizeStyles)(pageStyle, __uniConfig.themeConfig, getTheme());
	return __uniConfig.darkmode ? parsedStyle : pageStyle;
}
function useTheme(pageStyle, onThemeChangeCallback) {
	const isReactivity = (0, vue.isReactive)(pageStyle);
	const reactivePageStyle = isReactivity ? (0, vue.reactive)(parseTheme(pageStyle)) : parseTheme(pageStyle);
	if (__uniConfig.darkmode && isReactivity) (0, vue.watch)(pageStyle, (value) => {
		const _pageStyle = parseTheme(value);
		for (const key in _pageStyle) reactivePageStyle[key] = _pageStyle[key];
	});
	onThemeChangeCallback && onThemeChange(onThemeChangeCallback);
	return reactivePageStyle;
}
var _middleButton = {
	width: "50px",
	height: "50px",
	iconWidth: "24px"
};
var tabBar_default = /* @__PURE__ */ defineSystemComponent({
	name: "TabBar",
	setup() {
		const visibleList = (0, vue.ref)([]);
		const _tabBar = useTabBar();
		const tabBar$1 = useTheme(_tabBar, () => {
			const tabBarStyle = parseTheme(_tabBar);
			tabBar$1.backgroundColor = tabBarStyle.backgroundColor;
			tabBar$1.borderStyle = tabBarStyle.borderStyle;
			tabBar$1.color = tabBarStyle.color;
			tabBar$1.selectedColor = tabBarStyle.selectedColor;
			tabBar$1.blurEffect = tabBarStyle.blurEffect;
			tabBar$1.midButton = tabBarStyle.midButton;
			if (tabBarStyle.list && tabBarStyle.list.length) tabBarStyle.list.forEach((item, index$1) => {
				tabBar$1.list[index$1].iconPath = item.iconPath;
				tabBar$1.list[index$1].selectedIconPath = item.selectedIconPath;
			});
		});
		useVisibleList(tabBar$1, visibleList);
		useTabBarCssVar(tabBar$1);
		const onSwitchTab = useSwitchTab((0, vue_router.useRoute)(), tabBar$1, visibleList);
		const { style, borderStyle, placeholderStyle } = useTabBarStyle(tabBar$1);
		return () => {
			const tabBarItemsTsx = createTabBarItemsTsx(tabBar$1, onSwitchTab, visibleList);
			return (0, vue.createVNode)("uni-tabbar", { "class": "uni-tabbar-" + tabBar$1.position }, [(0, vue.createVNode)("div", {
				"class": "uni-tabbar",
				"style": style.value
			}, [(0, vue.createVNode)("div", {
				"class": "uni-tabbar-border",
				"style": borderStyle.value
			}, null, 4), tabBarItemsTsx], 4), (0, vue.createVNode)("div", {
				"class": "uni-placeholder",
				"style": placeholderStyle.value
			}, null, 4)], 2);
		};
	}
});
function useTabBarCssVar(tabBar$1) {
	(0, vue.watch)(() => tabBar$1.shown, (value) => {
		updatePageCssVar({ "--window-bottom": normalizeWindowBottom(value ? parseInt(tabBar$1.height) : 0) });
	});
}
function useVisibleList(tabBar$1, visibleList) {
	const internalMidButton = (0, vue.ref)((0, __vue_shared.extend)({ type: "midButton" }, tabBar$1.midButton));
	function setVisibleList() {
		let tempList = [];
		tempList = tabBar$1.list.filter((item) => item.visible !== false);
		if (__UNI_FEATURE_TABBAR_MIDBUTTON__ && tabBar$1.midButton) {
			internalMidButton.value = (0, __vue_shared.extend)({}, _middleButton, internalMidButton.value, tabBar$1.midButton);
			tempList = tempList.filter((item) => !isMidButton(item));
			if (tempList.length % 2 === 0) tempList.splice(Math.floor(tempList.length / 2), 0, internalMidButton.value);
		}
		visibleList.value = tempList;
	}
	(0, vue.watchEffect)(setVisibleList);
}
function useSwitchTab(route, tabBar$1, visibleList) {
	(0, vue.watchEffect)(() => {
		const meta = route.meta;
		if (meta.isTabBar) {
			const pagePath = meta.route;
			tabBar$1.selectedIndex = visibleList.value.findIndex((item) => item.pagePath === pagePath);
		}
	});
	return (tabBarItem, index$1) => {
		const { type } = tabBarItem;
		return () => {
			if (__UNI_FEATURE_TABBAR_MIDBUTTON__ && type === "midButton") return UniServiceJSBridge.invokeOnCallback(API_ON_TAB_BAR_MID_BUTTON_TAP);
			const { pagePath, text } = tabBarItem;
			let url = (0, __dcloudio_uni_shared.addLeadingSlash)(pagePath);
			if (url === __uniRoutes[0].alias) url = "/";
			if (route.path !== url) uni.switchTab({
				from: "tabBar",
				url,
				tabBarText: text
			});
			else invokeHook("onTabItemTap", {
				index: index$1,
				text,
				pagePath
			});
		};
	};
}
var DEFAULT_BG_COLOR = "#f7f7fa";
var BLUR_EFFECT_COLOR_DARK = "rgb(0, 0, 0, 0.8)";
var BLUR_EFFECT_COLOR_LIGHT = "rgb(250, 250, 250, 0.8)";
var BLUR_EFFECT_COLORS = {
	dark: BLUR_EFFECT_COLOR_DARK,
	light: BLUR_EFFECT_COLOR_LIGHT,
	extralight: BLUR_EFFECT_COLOR_LIGHT
};
var BORDER_COLORS = {
	white: "rgba(255, 255, 255, 0.33)",
	black: "rgba(0, 0, 0, 0.33)"
};
function useTabBarStyle(tabBar$1) {
	return {
		style: (0, vue.computed)(() => {
			let backgroundColor = tabBar$1.backgroundColor;
			const blurEffect = tabBar$1.blurEffect;
			if (!backgroundColor) {
				if (blurEffect && blurEffect !== "none") backgroundColor = BLUR_EFFECT_COLORS[blurEffect];
			}
			return {
				backgroundColor: backgroundColor || DEFAULT_BG_COLOR,
				backdropFilter: blurEffect !== "none" ? "blur(10px)" : blurEffect
			};
		}),
		borderStyle: (0, vue.computed)(() => {
			const { borderStyle, borderColor } = tabBar$1;
			if (borderColor && (0, __vue_shared.isString)(borderColor)) return { backgroundColor: borderColor };
			return { backgroundColor: BORDER_COLORS[borderStyle] || BORDER_COLORS["black"] };
		}),
		placeholderStyle: (0, vue.computed)(() => {
			return { height: tabBar$1.height };
		})
	};
}
function isMidButton(item) {
	return item.type === "midButton";
}
function createTabBarItemsTsx(tabBar$1, onSwitchTab, visibleList) {
	const { selectedIndex, selectedColor, color } = tabBar$1;
	return visibleList.value.map((item, index$1) => {
		const selected = selectedIndex === index$1;
		const textColor = selected ? selectedColor : color;
		const iconPath = (selected ? item.selectedIconPath || item.iconPath : item.iconPath) || "";
		const iconfontText = item.iconfont ? selected ? item.iconfont.selectedText || item.iconfont.text : item.iconfont.text : void 0;
		const iconfontColor = item.iconfont ? selected ? item.iconfont.selectedColor || item.iconfont.color : item.iconfont.color : void 0;
		if (!__UNI_FEATURE_TABBAR_MIDBUTTON__) return createTabBarItemTsx(textColor, iconPath, iconfontText, iconfontColor, item, tabBar$1, index$1, onSwitchTab);
		return isMidButton(item) ? createTabBarMidButtonTsx(textColor, iconPath, iconfontText, iconfontColor, item, tabBar$1, index$1, onSwitchTab) : createTabBarItemTsx(textColor, iconPath, iconfontText, iconfontColor, item, tabBar$1, index$1, onSwitchTab);
	});
}
function createTabBarItemTsx(color, iconPath, iconfontText, iconfontColor, tabBarItem, tabBar$1, index$1, onSwitchTab) {
	return (0, vue.createVNode)("div", {
		"key": index$1,
		"class": "uni-tabbar__item",
		"onClick": onSwitchTab(tabBarItem, index$1)
	}, [createTabBarItemBdTsx(color, iconPath || "", iconfontText, iconfontColor, tabBarItem, tabBar$1)], 8, ["onClick"]);
}
function createTabBarItemBdTsx(color, iconPath, iconfontText, iconfontColor, tabBarItem, tabBar$1) {
	const { height } = tabBar$1;
	return (0, vue.createVNode)("div", {
		"class": "uni-tabbar__bd",
		"style": { height }
	}, [
		iconfontText ? createTabBarItemIconfontTsx(iconfontText, iconfontColor || BLUR_EFFECT_COLOR_DARK, tabBarItem, tabBar$1) : iconPath && createTabBarItemIconTsx(iconPath, tabBarItem, tabBar$1),
		tabBarItem.text && createTabBarItemTextTsx(color, tabBarItem, tabBar$1),
		tabBarItem.redDot && createTabBarItemRedDotTsx(tabBarItem.badge)
	], 4);
}
function createTabBarItemIconTsx(iconPath, tabBarItem, tabBar$1) {
	const { type, text } = tabBarItem;
	const { iconWidth } = tabBar$1;
	const clazz$1 = "uni-tabbar__icon" + (text ? " uni-tabbar__icon__diff" : "");
	const style = {
		width: iconWidth,
		height: iconWidth
	};
	return (0, vue.createVNode)("div", {
		"class": clazz$1,
		"style": style
	}, [type !== "midButton" && (0, vue.createVNode)("img", { "src": getRealPath(iconPath) }, null, 8, ["src"])], 6);
}
function createTabBarItemIconfontTsx(iconfontText, iconfontColor, tabBarItem, tabBar$1) {
	var _tabBarItem$iconfont;
	const { type, text } = tabBarItem;
	const { iconWidth } = tabBar$1;
	const clazz$1 = "uni-tabbar__icon" + (text ? " uni-tabbar__icon__diff" : "");
	const style = {
		width: iconWidth,
		height: iconWidth
	};
	const iconfontStyle = {
		fontSize: ((_tabBarItem$iconfont = tabBarItem.iconfont) === null || _tabBarItem$iconfont === void 0 ? void 0 : _tabBarItem$iconfont.fontSize) || iconWidth,
		color: iconfontColor
	};
	return (0, vue.createVNode)("div", {
		"class": clazz$1,
		"style": style
	}, [type !== "midButton" && (0, vue.createVNode)("div", {
		"class": "uni-tabbar__iconfont",
		"style": iconfontStyle
	}, [iconfontText], 4)], 6);
}
function createTabBarItemTextTsx(color, tabBarItem, tabBar$1) {
	const { iconPath, text } = tabBarItem;
	const { fontSize, spacing } = tabBar$1;
	const style = {
		color,
		fontSize,
		lineHeight: !iconPath ? 1.8 : "normal",
		marginTop: !iconPath ? "inherit" : spacing
	};
	return (0, vue.createVNode)("div", {
		"class": "uni-tabbar__label",
		"style": style
	}, [text], 4);
}
function createTabBarItemRedDotTsx(badge) {
	const clazz$1 = "uni-tabbar__reddot" + (badge ? " uni-tabbar__badge" : "");
	return (0, vue.createVNode)("div", { "class": clazz$1 }, [badge], 2);
}
function createTabBarMidButtonTsx(color, iconPath, iconfontText, iconfontColor, midButton, tabBar$1, index$1, onSwitchTab) {
	const { width, height, backgroundImage, iconWidth } = midButton;
	return (0, vue.createVNode)("div", {
		"key": "midButton",
		"class": "uni-tabbar__item",
		"style": {
			flex: "0 0 " + width,
			position: "relative"
		},
		"onClick": onSwitchTab(midButton, index$1)
	}, [(0, vue.createVNode)("div", {
		"class": "uni-tabbar__mid",
		"style": {
			width,
			height,
			backgroundImage: backgroundImage ? "url('" + getRealPath(backgroundImage) + "')" : "none"
		}
	}, [iconPath && (0, vue.createVNode)("img", {
		"style": {
			width: iconWidth,
			height: iconWidth
		},
		"src": getRealPath(iconPath)
	}, null, 12, ["src"])], 4), createTabBarItemBdTsx(color, iconPath, iconfontText, iconfontColor, midButton, tabBar$1)], 12, ["onClick"]);
}
var globalLayoutState = void 0;
var layout_default = /* @__PURE__ */ defineSystemComponent({
	name: "Layout",
	setup(_props, { emit: emit$2 }) {
		const rootRef = (0, vue.ref)(null);
		const keepAliveRoute = __UNI_FEATURE_PAGES__ && useKeepAliveRoute();
		const { layoutState, windowState } = useState();
		useMaxWidth(layoutState, rootRef);
		const topWindow = __UNI_FEATURE_TOPWINDOW__ && useTopWindow(layoutState);
		const leftWindow = __UNI_FEATURE_LEFTWINDOW__ && useLeftWindow(layoutState);
		const rightWindow = __UNI_FEATURE_RIGHTWINDOW__ && useRightWindow(layoutState);
		const showTabBar = __UNI_FEATURE_TABBAR__ && useShowTabBar(emit$2);
		const clazz$1 = useAppClass(showTabBar);
		return () => {
			const layoutTsx = createLayoutTsx(keepAliveRoute, layoutState, windowState, topWindow, leftWindow, rightWindow);
			const tabBarTsx = __UNI_FEATURE_TABBAR__ && createTabBarTsx(showTabBar);
			return (0, vue.createVNode)("uni-app", {
				"ref": rootRef,
				"class": clazz$1.value
			}, [layoutTsx, tabBarTsx], 2);
		};
	}
});
function useAppClass(showTabBar) {
	const showMaxWidth = (0, vue.ref)(false);
	return (0, vue.computed)(() => {
		return {
			"uni-app--showtabbar": showTabBar && showTabBar.value,
			"uni-app--maxwidth": showMaxWidth.value
		};
	});
}
function initMediaQuery(minWidth, callback) {
	return false;
}
function useMaxWidth(layoutState, rootRef) {
	const route = usePageRoute();
	function checkMaxWidth() {
		const windowWidth = document.body.clientWidth;
		const pages = getCurrentBasePages();
		let meta = {};
		if (pages.length > 0) {
			const curPage = pages[pages.length - 1];
			meta = getPage$BasePage(curPage).meta;
		} else {
			const routeOptions = getRouteOptions(route.path, true);
			if (routeOptions) meta = routeOptions.meta;
		}
		const maxWidth = parseInt(String(((0, __vue_shared.hasOwn)(meta, "maxWidth") ? meta.maxWidth : __uniConfig.globalStyle.maxWidth) || Number.MAX_SAFE_INTEGER));
		let showMaxWidth = false;
		if (windowWidth > maxWidth) showMaxWidth = true;
		else showMaxWidth = false;
		if (showMaxWidth && maxWidth) {
			layoutState.marginWidth = (windowWidth - maxWidth) / 2;
			(0, vue.nextTick)(() => {
				const rootEl = rootRef.value;
				if (rootEl) rootEl.setAttribute("style", "max-width:" + maxWidth + "px;margin:0 auto;");
			});
		} else {
			layoutState.marginWidth = 0;
			(0, vue.nextTick)(() => {
				const rootEl = rootRef.value;
				if (rootEl) rootEl.removeAttribute("style");
			});
		}
	}
	(0, vue.watch)([() => route.path], checkMaxWidth);
}
function useState() {
	const route = usePageRoute();
	if (!__UNI_FEATURE_RESPONSIVE__) {
		const layoutState$1 = (0, vue.reactive)({
			marginWidth: 0,
			leftWindowWidth: 0,
			rightWindowWidth: 0
		});
		(0, vue.watch)(() => layoutState$1.marginWidth, (value) => updateCssVar({ "--window-margin": value + "px" }));
		(0, vue.watch)(() => layoutState$1.leftWindowWidth + layoutState$1.marginWidth, (value) => {
			updateCssVar({ "--window-left": value + "px" });
		});
		(0, vue.watch)(() => layoutState$1.rightWindowWidth + layoutState$1.marginWidth, (value) => {
			updateCssVar({ "--window-right": value + "px" });
		});
		return {
			layoutState: layoutState$1,
			windowState: (0, vue.computed)(() => ({}))
		};
	}
	const topWindowMediaQuery = (0, vue.ref)(false);
	const leftWindowMediaQuery = (0, vue.ref)(false);
	const rightWindowMediaQuery = (0, vue.ref)(false);
	const layoutState = (0, vue.reactive)({
		topWindowMediaQuery,
		showTopWindow: (0, vue.computed)(() => __UNI_FEATURE_TOPWINDOW__ && route.meta.topWindow !== false && topWindowMediaQuery.value),
		apiShowTopWindow: false,
		leftWindowMediaQuery,
		showLeftWindow: (0, vue.computed)(() => __UNI_FEATURE_LEFTWINDOW__ && route.meta.leftWindow !== false && leftWindowMediaQuery.value),
		apiShowLeftWindow: false,
		rightWindowMediaQuery,
		showRightWindow: (0, vue.computed)(() => __UNI_FEATURE_RIGHTWINDOW__ && route.meta.rightWindow !== false && rightWindowMediaQuery.value),
		apiShowRightWindow: false,
		topWindowHeight: 0,
		marginWidth: 0,
		leftWindowWidth: 0,
		rightWindowWidth: 0,
		navigationBarTitleText: "",
		topWindowStyle: {},
		leftWindowStyle: {},
		rightWindowStyle: {}
	});
	[
		"topWindow",
		"leftWindow",
		"rightWindow"
	].forEach((prop) => {
		var _uniConfig$prop;
		const matchMedia = (_uniConfig$prop = __uniConfig[prop]) === null || _uniConfig$prop === void 0 ? void 0 : _uniConfig$prop.matchMedia;
		let topWindowMinWidth = __dcloudio_uni_shared.RESPONSIVE_MIN_WIDTH;
		if (matchMedia && (0, __vue_shared.hasOwn)(matchMedia, "minWidth")) {
			const minWidth = matchMedia.minWidth;
			topWindowMinWidth = checkMinWidth(minWidth) ? minWidth : topWindowMinWidth;
		}
		const matches = initMediaQuery(topWindowMinWidth, (ev) => {
			layoutState[`${prop}MediaQuery`] = ev.matches;
		});
		layoutState[`${prop}MediaQuery`] = matches;
	});
	(0, vue.watch)(() => layoutState.topWindowHeight, (value) => updateCssVar({ "--top-window-height": value + "px" }));
	(0, vue.watch)(() => layoutState.marginWidth, (value) => updateCssVar({ "--window-margin": value + "px" }));
	(0, vue.watch)(() => layoutState.leftWindowWidth + layoutState.marginWidth, (value) => {
		updateCssVar({ "--window-left": value + "px" });
	});
	(0, vue.watch)(() => layoutState.rightWindowWidth + layoutState.marginWidth, (value) => {
		updateCssVar({ "--window-right": value + "px" });
	});
	UniServiceJSBridge.on(__dcloudio_uni_shared.ON_NAVIGATION_BAR_CHANGE, (navigationBar) => {
		layoutState.navigationBarTitleText = navigationBar.titleText;
	});
	return {
		layoutState,
		windowState: (0, vue.computed)(() => ({
			matchTopWindow: layoutState.topWindowMediaQuery,
			showTopWindow: layoutState.showTopWindow || layoutState.apiShowTopWindow,
			matchLeftWindow: layoutState.leftWindowMediaQuery,
			showLeftWindow: layoutState.showLeftWindow || layoutState.apiShowLeftWindow,
			matchRightWindow: layoutState.rightWindowMediaQuery,
			showRightWindow: layoutState.showRightWindow || layoutState.apiShowRightWindow
		}))
	};
}
function createLayoutTsx(keepAliveRoute, layoutState, windowState, topWindow, leftWindow, rightWindow) {
	const routerVNode = __UNI_FEATURE_PAGES__ ? createRouterViewVNode(keepAliveRoute) : createPageVNode();
	if (!__UNI_FEATURE_RESPONSIVE__) return routerVNode;
	const topWindowTsx = __UNI_FEATURE_TOPWINDOW__ ? createTopWindowTsx(topWindow, layoutState, windowState.value) : null;
	const leftWindowTsx = __UNI_FEATURE_LEFTWINDOW__ ? createLeftWindowTsx(leftWindow, layoutState, windowState.value) : null;
	const rightWindowTsx = __UNI_FEATURE_RIGHTWINDOW__ ? createRightWindowTsx(rightWindow, layoutState, windowState.value) : null;
	return (0, vue.createVNode)("uni-layout", { "class": {
		"uni-app--showtopwindow": __UNI_FEATURE_TOPWINDOW__ && layoutState.showTopWindow,
		"uni-app--showleftwindow": __UNI_FEATURE_LEFTWINDOW__ && layoutState.showLeftWindow,
		"uni-app--showrightwindow": __UNI_FEATURE_RIGHTWINDOW__ && layoutState.showRightWindow
	} }, [topWindowTsx, (0, vue.createVNode)("uni-content", null, [
		(0, vue.createVNode)("uni-main", null, [routerVNode]),
		leftWindowTsx,
		rightWindowTsx
	])], 2);
}
function useShowTabBar(emit$2) {
	const route = usePageRoute();
	const tabBar$1 = useTabBar();
	return (0, vue.computed)(() => route.meta.isTabBar && tabBar$1.shown);
}
function createTabBarTsx(showTabBar) {
	return (0, vue.withDirectives)((0, vue.createVNode)(tabBar_default, null, null, 512), [[vue.vShow, showTabBar.value]]);
}
function createPageVNode() {
	return (0, vue.createVNode)(__uniRoutes[0].component);
}
function createRouterViewVNode({ routeKey, isTabBar, routeCache: routeCache$1 }) {
	return (0, vue.createVNode)(vue_router.RouterView, null, {
		default: (0, vue.withCtx)(({ Component }) => [((0, vue.openBlock)(), (0, vue.createBlock)(vue.KeepAlive, {
			matchBy: "key",
			cache: routeCache$1
		}, [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(Component), {
			type: isTabBar.value ? "tabBar" : "",
			key: routeKey.value
		}))], 1032, ["cache"]))]),
		_: 1
	});
}
function useTopWindow(layoutState) {
	const { component, style } = __uniConfig.topWindow;
	const windowRef = (0, vue.ref)(null);
	function updateWindow() {
		const instance$1 = windowRef.value;
		if (!instance$1 || !instance$1.$) return;
		const el = (0, __dcloudio_uni_shared.resolveOwnerEl)(instance$1.$);
		if (!el) return;
		const uniTopWindowStyleEl = el.parentElement;
		if (!uniTopWindowStyleEl) return;
		layoutState.topWindowHeight = uniTopWindowStyleEl.getBoundingClientRect().height;
	}
	(0, vue.watch)(() => windowRef.value, () => {
		updateWindow();
	});
	(0, vue.watch)(() => layoutState.showTopWindow || layoutState.apiShowTopWindow, () => (0, vue.nextTick)(updateWindow));
	layoutState.topWindowStyle = style;
	return {
		component,
		windowRef
	};
}
function useLeftWindow(layoutState) {
	const { component, style } = __uniConfig.leftWindow;
	const windowRef = (0, vue.ref)(null);
	function updateWindow() {
		const instance$1 = windowRef.value;
		if (!instance$1 || !instance$1.$) return;
		const el = (0, __dcloudio_uni_shared.resolveOwnerEl)(instance$1.$);
		if (!el) return;
		const uniLeftWindowStyleEl = el.parentElement && el.parentElement.parentElement;
		if (!uniLeftWindowStyleEl) return;
		layoutState.leftWindowWidth = uniLeftWindowStyleEl.getBoundingClientRect().width;
	}
	(0, vue.watch)(() => windowRef.value, () => {
		updateWindow();
	});
	(0, vue.watch)(() => layoutState.showLeftWindow || layoutState.apiShowLeftWindow, () => (0, vue.nextTick)(updateWindow));
	layoutState.leftWindowStyle = style;
	return {
		component,
		windowRef
	};
}
function useRightWindow(layoutState) {
	const { component, style } = __uniConfig.rightWindow;
	const windowRef = (0, vue.ref)(null);
	function updateWindow() {
		const instance$1 = windowRef.value;
		if (!instance$1 || !instance$1.$) return;
		const el = (0, __dcloudio_uni_shared.resolveOwnerEl)(instance$1.$);
		if (!el) return;
		const uniRightWindowStyleEl = el.parentElement && el.parentElement.parentElement;
		if (!uniRightWindowStyleEl) return;
		layoutState.rightWindowWidth = uniRightWindowStyleEl.getBoundingClientRect().width;
	}
	(0, vue.watch)(() => windowRef.value, () => {
		updateWindow();
	});
	(0, vue.watch)(() => layoutState.showRightWindow || layoutState.apiShowRightWindow, () => (0, vue.nextTick)(updateWindow));
	layoutState.rightWindowStyle = style;
	return {
		component,
		windowRef
	};
}
function createTopWindowTsx(topWindow, layoutState, windowState) {
	if (topWindow) {
		const { component: TopWindow, windowRef } = topWindow;
		return (0, vue.withDirectives)((0, vue.createVNode)("uni-top-window", null, [(0, vue.createVNode)("div", {
			"class": "uni-top-window",
			"style": layoutState.topWindowStyle
		}, [(0, vue.createVNode)(TopWindow, (0, vue.mergeProps)({
			"ref": windowRef,
			"navigation-bar-title-text": layoutState.navigationBarTitleText
		}, windowState), null, 16, ["navigation-bar-title-text"])], 4), (0, vue.createVNode)("div", {
			"class": "uni-top-window--placeholder",
			"style": { height: layoutState.topWindowHeight + "px" }
		}, null, 4)], 512), [[vue.vShow, layoutState.showTopWindow || layoutState.apiShowTopWindow]]);
	}
}
function createLeftWindowTsx(leftWindow, layoutState, windowState) {
	if (leftWindow) {
		const { component: LeftWindow, windowRef } = leftWindow;
		return (0, vue.withDirectives)((0, vue.createVNode)("uni-left-window", {
			"data-show": layoutState.apiShowLeftWindow || void 0,
			"style": layoutState.leftWindowStyle
		}, [layoutState.apiShowLeftWindow ? (0, vue.createVNode)("div", {
			"class": "uni-mask",
			"onClick": () => layoutState.apiShowLeftWindow = false
		}, null, 8, ["onClick"]) : null, (0, vue.createVNode)("div", { "class": "uni-left-window" }, [(0, vue.createVNode)(LeftWindow, (0, vue.mergeProps)({ "ref": windowRef }, windowState), null, 16)])], 12, ["data-show"]), [[vue.vShow, layoutState.showLeftWindow || layoutState.apiShowLeftWindow]]);
	}
}
function createRightWindowTsx(rightWindow, layoutState, windowState) {
	if (rightWindow) {
		const { component: RightWindow, windowRef } = rightWindow;
		return (0, vue.withDirectives)((0, vue.createVNode)("uni-right-window", {
			"data-show": layoutState.apiShowRightWindow || void 0,
			"style": layoutState.rightWindowStyle
		}, [layoutState.apiShowRightWindow ? (0, vue.createVNode)("div", {
			"class": "uni-mask",
			"onClick": () => layoutState.apiShowRightWindow = false
		}, null, 8, ["onClick"]) : null, (0, vue.createVNode)("div", { "class": "uni-right-window" }, [(0, vue.createVNode)(RightWindow, (0, vue.mergeProps)({ "ref": windowRef }, windowState), null, 16)])], 12, ["data-show"]), [[vue.vShow, layoutState.showRightWindow || layoutState.apiShowRightWindow]]);
	}
}
function usePageHeadTransparentBackgroundColor(backgroundColor) {
	const { r, g: g$1, b } = hexToRgba(backgroundColor);
	return `rgba(${r},${g$1},${b},0)`;
}
function usePageHeadTransparent(headRef, { id: id$1, navigationBar: { titleColor, coverage, backgroundColor } }) {
	(0, vue.computed)(() => hexToRgba(backgroundColor));
	id$1 + "";
}
var ICON_PATHS = {
	none: "",
	forward: "M11 7.844q-0.25-0.219-0.25-0.578t0.25-0.578q0.219-0.25 0.563-0.25t0.563 0.25l9.656 9.125q0.125 0.125 0.188 0.297t0.063 0.328q0 0.188-0.063 0.359t-0.188 0.297l-9.656 9.125q-0.219 0.25-0.563 0.25t-0.563-0.25q-0.25-0.219-0.25-0.578t0.25-0.609l9.063-8.594-9.063-8.594z",
	back: ICON_PATH_BACK,
	select: ICON_PATH_BACK,
	share: "M26.563 24.844q0 0.125-0.109 0.234t-0.234 0.109h-17.938q-0.125 0-0.219-0.109t-0.094-0.234v-13.25q0-0.156 0.094-0.25t0.219-0.094h5.5v-1.531h-6q-0.531 0-0.906 0.391t-0.375 0.922v14.375q0 0.531 0.375 0.922t0.906 0.391h18.969q0.531 0 0.891-0.391t0.359-0.953v-5.156h-1.438v4.625zM29.813 10.969l-5.125-5.375-1.031 1.094 3.438 3.594-3.719 0.031q-2.313 0.188-4.344 1.125t-3.578 2.422-2.5 3.453-1.109 4.188l-0.031 0.25h1.469v-0.219q0.156-1.875 1-3.594t2.25-3.063 3.234-2.125 3.828-0.906l0.188-0.031 3.313-0.031-3.438 3.625 1.031 1.063 5.125-5.375-0.031-0.063 0.031-0.063z",
	favorite: "M27.594 13.375q-0.063-0.188-0.219-0.313t-0.344-0.156l-7.094-0.969-3.219-6.406q-0.094-0.188-0.25-0.281t-0.375-0.094q-0.188 0-0.344 0.094t-0.25 0.281l-3.125 6.438-7.094 1.094q-0.188 0.031-0.344 0.156t-0.219 0.313q-0.031 0.188 0.016 0.375t0.172 0.313l5.156 4.969-1.156 7.063q-0.031 0.188 0.047 0.375t0.234 0.313q0.094 0.063 0.188 0.094t0.219 0.031q0.063 0 0.141-0.031t0.172-0.063l6.313-3.375 6.375 3.313q0.063 0.031 0.141 0.047t0.172 0.016q0.188 0 0.344-0.094t0.25-0.281q0.063-0.094 0.078-0.234t-0.016-0.234q0-0.031 0-0.063l-1.25-6.938 5.094-5.031q0.156-0.156 0.203-0.344t-0.016-0.375zM11.469 19.063q0.031-0.188-0.016-0.344t-0.172-0.281l-4.406-4.25 6.063-0.906q0.156-0.031 0.297-0.125t0.203-0.25l2.688-5.531 2.75 5.5q0.063 0.156 0.203 0.25t0.297 0.125l6.094 0.844-4.375 4.281q-0.125 0.125-0.172 0.297t-0.016 0.328l1.063 6.031-5.438-2.813q-0.156-0.094-0.328-0.078t-0.297 0.078l-5.438 2.875 1-6.031z",
	home: "M23.719 16.5q-0.313 0-0.531 0.219t-0.219 0.5v7.063q0 0.219-0.172 0.391t-0.391 0.172h-12.344q-0.25 0-0.422-0.172t-0.172-0.391v-7.063q0-0.281-0.219-0.5t-0.531-0.219q-0.281 0-0.516 0.219t-0.234 0.5v7.063q0.031 0.844 0.625 1.453t1.438 0.609h12.375q0.844 0 1.453-0.609t0.609-1.453v-7.063q0-0.125-0.063-0.266t-0.156-0.234q-0.094-0.125-0.234-0.172t-0.297-0.047zM26.5 14.875l-8.813-8.813q-0.313-0.313-0.688-0.453t-0.781-0.141-0.781 0.141-0.656 0.422l-8.813 8.844q-0.188 0.219-0.188 0.516t0.219 0.484q0.094 0.125 0.234 0.172t0.297 0.047q0.125 0 0.25-0.047t0.25-0.141l8.781-8.781q0.156-0.156 0.406-0.156t0.406 0.156l8.813 8.781q0.219 0.188 0.516 0.188t0.516-0.219q0.188-0.188 0.203-0.484t-0.172-0.516z",
	menu: "M8.938 18.313q0.875 0 1.484-0.609t0.609-1.453-0.609-1.453-1.484-0.609q-0.844 0-1.453 0.609t-0.609 1.453 0.609 1.453 1.453 0.609zM16.188 18.313q0.875 0 1.484-0.609t0.609-1.453-0.609-1.453-1.484-0.609q-0.844 0-1.453 0.609t-0.609 1.453 0.609 1.453 1.453 0.609zM23.469 18.313q0.844 0 1.453-0.609t0.609-1.453-0.609-1.453-1.453-0.609q-0.875 0-1.484 0.609t-0.609 1.453 0.609 1.453 1.484 0.609z",
	close: ICON_PATH_CLOSE
};
var pageHead_default = /* @__PURE__ */ defineSystemComponent({
	name: "PageHead",
	setup() {
		const headRef = (0, vue.ref)(null);
		const pageMeta = usePageMeta();
		const navigationBar = useTheme(pageMeta.navigationBar, () => {
			const _navigationBar = parseTheme(pageMeta.navigationBar);
			navigationBar.backgroundColor = _navigationBar.backgroundColor;
			navigationBar.titleColor = _navigationBar.titleColor;
		});
		const { clazz: clazz$1, style } = usePageHead(navigationBar);
		const buttons = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ && usePageHeadButtons(pageMeta);
		const searchInput = __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__ && navigationBar.searchInput && usePageHeadSearchInput(pageMeta);
		__UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && navigationBar.type === "transparent" && usePageHeadTransparent(headRef, pageMeta);
		return () => {
			const backButtonTsx = __UNI_FEATURE_PAGES__ ? createBackButtonTsx(navigationBar, pageMeta.isQuit) : null;
			const leftButtonsTsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ ? createButtonsTsx(buttons.left) : [];
			const rightButtonsTsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ ? createButtonsTsx(buttons.right) : [];
			const type = navigationBar.type || "default";
			const placeholderTsx = type !== "transparent" && type !== "float" && (0, vue.createVNode)("div", { "class": {
				"uni-placeholder": true,
				"uni-placeholder-titlePenetrate": navigationBar.titlePenetrate
			} }, null, 2);
			return (0, vue.createVNode)("uni-page-head", { "uni-page-head-type": type }, [(0, vue.createVNode)("div", {
				"ref": headRef,
				"class": clazz$1.value,
				"style": style.value
			}, [
				(0, vue.createVNode)("div", { "class": "uni-page-head-hd" }, [backButtonTsx, ...leftButtonsTsx]),
				createPageHeadBdTsx(navigationBar, searchInput),
				(0, vue.createVNode)("div", { "class": "uni-page-head-ft" }, [...rightButtonsTsx])
			], 6), placeholderTsx], 8, ["uni-page-head-type"]);
		};
	}
});
function createBackButtonTsx(navigationBar, isQuit) {
	if (!isQuit) return (0, vue.createVNode)("div", {
		"class": "uni-page-head-btn",
		"onClick": onPageHeadBackButton
	}, [createSvgIconVNode(ICON_PATH_BACK, navigationBar.type === "transparent" ? "#fff" : navigationBar.titleColor, 26)], 8, ["onClick"]);
}
function createButtonsTsx(btns) {
	return btns.map(({ onClick, btnClass, btnStyle, btnText, btnIconPath, badgeText, iconStyle, btnSelect }, index$1) => {
		return (0, vue.createVNode)("div", {
			"key": index$1,
			"class": btnClass,
			"style": btnStyle,
			"onClick": onClick,
			"badge-text": badgeText
		}, [btnIconPath ? createSvgIconVNode(btnIconPath, iconStyle.color, iconStyle.fontSize) : btnSelect ? (0, vue.createVNode)("span", { "style": iconStyle }, [(0, vue.createVNode)("i", {
			"class": "uni-btn-icon",
			"innerHTML": btnText
		}, null, 8, ["innerHTML"]), createSvgIconVNode(ICON_PATHS["select"], "#000", 14)], 4) : (0, vue.createVNode)("i", {
			"class": "uni-btn-icon",
			"style": iconStyle,
			"innerHTML": btnText
		}, null, 12, ["innerHTML"])], 14, ["onClick", "badge-text"]);
	});
}
function createPageHeadBdTsx(navigationBar, searchInput) {
	if (!__UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__ || !navigationBar.searchInput) return createPageHeadTitleTextTsx(navigationBar);
	return createPageHeadSearchInputTsx(navigationBar, searchInput);
}
function createPageHeadTitleTextTsx({ type, loading, titleSize, titleText, titleImage }) {
	return (0, vue.createVNode)("div", { "class": "uni-page-head-bd" }, [(0, vue.createVNode)("div", {
		"style": {
			fontSize: titleSize,
			opacity: type === "transparent" ? 0 : 1
		},
		"class": "uni-page-head__title"
	}, [loading ? (0, vue.createVNode)("i", { "class": "uni-loading" }, null) : titleImage ? (0, vue.createVNode)("img", {
		"src": titleImage,
		"class": "uni-page-head__title_image"
	}, null, 8, ["src"]) : titleText], 4)]);
}
function createPageHeadSearchInputTsx(navigationBar, { text, focus, composing, onBlur, onFocus, onInput, onConfirm, onClick }) {
	const { color, align, autoFocus, disabled, borderRadius, backgroundColor, placeholder, placeholderColor } = navigationBar.searchInput;
	const searchStyle = {
		borderRadius,
		backgroundColor
	};
	const placeholderClass = ["uni-page-head-search-placeholder", `uni-page-head-search-placeholder-${focus.value || text.value ? "left" : align}`];
	return (0, vue.createVNode)("div", {
		"class": "uni-page-head-search",
		"style": searchStyle
	}, [(0, vue.createVNode)("div", {
		"style": { color: placeholderColor },
		"class": placeholderClass
	}, [(0, vue.createVNode)("div", { "class": "uni-page-head-search-icon" }, [createSvgIconVNode(ICON_PATH_SEARCH, placeholderColor, 20)]), text.value || composing.value ? "" : placeholder], 6), disabled ? (0, vue.createVNode)(input_default, {
		"disabled": true,
		"style": { color },
		"placeholder-style": "color: " + placeholderColor,
		"class": "uni-page-head-search-input",
		"confirm-type": "search",
		"onClick": onClick
	}, null, 8, [
		"style",
		"placeholder-style",
		"onClick"
	]) : (0, vue.createVNode)(input_default, {
		"focus": autoFocus,
		"style": { color },
		"placeholder-style": "color: " + placeholderColor,
		"class": "uni-page-head-search-input",
		"confirm-type": "search",
		"onFocus": onFocus,
		"onBlur": onBlur,
		"onInput": onInput,
		"onConfirm": onConfirm
	}, null, 8, [
		"focus",
		"style",
		"placeholder-style",
		"onFocus",
		"onBlur",
		"onInput",
		"onConfirm"
	])], 4);
}
function onPageHeadBackButton() {
	if (getCurrentPages().length === 1) uni.reLaunch({ url: "/" });
	else uni.navigateBack({
		from: "backbutton",
		success() {}
	});
}
function usePageHead(navigationBar) {
	return {
		clazz: (0, vue.computed)(() => {
			const { type, titlePenetrate, shadowColorType } = navigationBar;
			const clazz$1 = {
				"uni-page-head": true,
				"uni-page-head-transparent": type === "transparent",
				"uni-page-head-titlePenetrate": titlePenetrate === "YES",
				"uni-page-head-shadow": !!shadowColorType
			};
			if (shadowColorType) clazz$1[`uni-page-head-shadow-${shadowColorType}`] = true;
			return clazz$1;
		}),
		style: (0, vue.computed)(() => {
			return {
				backgroundColor: __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && navigationBar.type === "transparent" ? usePageHeadTransparentBackgroundColor(navigationBar.backgroundColor) : navigationBar.backgroundColor,
				color: navigationBar.titleColor,
				transitionDuration: navigationBar.duration,
				transitionTimingFunction: navigationBar.timingFunc
			};
		})
	};
}
function usePageHeadButtons({ id: id$1, navigationBar }) {
	const left = [];
	const right = [];
	const { buttons } = navigationBar;
	if ((0, __vue_shared.isArray)(buttons)) {
		const { type } = navigationBar;
		const isTransparent = type === "transparent";
		const fonts = Object.create(null);
		buttons.forEach((btn, index$1) => {
			if (btn.fontSrc && !btn.fontFamily) {
				const fontSrc = getRealPath(btn.fontSrc);
				let fontFamily = fonts[fontSrc];
				if (!fontFamily) {
					fontFamily = `font${Date.now()}`;
					fonts[fontSrc] = fontFamily;
				}
				btn.fontFamily = fontFamily;
			}
			const pageHeadBtn = usePageHeadButton(id$1, index$1, btn, isTransparent);
			if (btn.float === "left") left.push(pageHeadBtn);
			else right.push(pageHeadBtn);
		});
	}
	return {
		left,
		right
	};
}
function usePageHeadButton(pageId, index$1, btn, isTransparent) {
	const iconStyle = {
		color: btn.color,
		fontSize: btn.fontSize,
		fontWeight: btn.fontWeight
	};
	if (btn.fontFamily) iconStyle.fontFamily = btn.fontFamily;
	return new Proxy({
		btnClass: {
			"uni-page-head-btn": true,
			"uni-page-head-btn-red-dot": !!(btn.redDot || btn.badgeText),
			"uni-page-head-btn-select": !!btn.select
		},
		btnStyle: {
			backgroundColor: isTransparent ? btn.background : "transparent",
			width: btn.width
		},
		btnText: "",
		btnIconPath: ICON_PATHS[btn.type],
		badgeText: btn.badgeText,
		iconStyle,
		onClick() {
			invokeHook(pageId, __dcloudio_uni_shared.ON_NAVIGATION_BAR_BUTTON_TAP, (0, __vue_shared.extend)({ index: index$1 }, btn));
		},
		btnSelect: btn.select
	}, { get(target, key, receiver) {
		if (["btnText"].includes(key)) return btn.fontSrc && btn.fontFamily ? btn.text.replace("\\u", "&#x") : btn.text;
		else return Reflect.get(target, key, receiver);
	} });
}
function usePageHeadSearchInput({ id: id$1, navigationBar: { searchInput } }) {
	const focus = (0, vue.ref)(false);
	const text = (0, vue.ref)("");
	const composing = (0, vue.ref)(false);
	const { disabled } = searchInput;
	if (disabled) {
		const onClick = () => {
			invokeHook(id$1, __dcloudio_uni_shared.ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
		};
		return {
			focus,
			text,
			composing,
			onClick
		};
	}
	const onFocus = () => {
		focus.value = true;
		invokeHook(id$1, __dcloudio_uni_shared.ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, { focus: true });
	};
	const onBlur = () => {
		focus.value = false;
		invokeHook(id$1, __dcloudio_uni_shared.ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, { focus: false });
	};
	const onInput = (evt) => {
		text.value = evt.detail.value;
		invokeHook(id$1, __dcloudio_uni_shared.ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, { text: text.value });
	};
	const onConfirm = (evt) => {
		invokeHook(id$1, __dcloudio_uni_shared.ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, { text: text.value });
	};
	return {
		focus,
		text,
		composing,
		onFocus,
		onBlur,
		onInput,
		onConfirm
	};
}
var component_vue_vue_type_script_lang_default = {
	name: "PageRefresh",
	setup() {
		const { pullToRefresh } = usePageMeta();
		return {
			offset: pullToRefresh.offset,
			color: pullToRefresh.color
		};
	}
};
var __plugin_vue_export_helper_default = (sfc, props$26) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props$26) target[key] = val;
	return target;
};
var _hoisted_1 = { class: "uni-page-refresh-inner" };
var _hoisted_2 = ["fill"];
var _hoisted_5 = [/* @__PURE__ */ (0, vue.createElementVNode)("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }, null, -1), /* @__PURE__ */ (0, vue.createElementVNode)("path", {
	d: "M0 0h24v24H0z",
	fill: "none"
}, null, -1)];
var _hoisted_6 = {
	class: "uni-page-refresh__spinner",
	width: "24",
	height: "24",
	viewBox: "25 25 50 50"
};
var _hoisted_7 = ["stroke"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return (0, vue.openBlock)(), (0, vue.createElementBlock)("uni-page-refresh", null, [(0, vue.createElementVNode)("div", {
		style: (0, vue.normalizeStyle)({ "margin-top": $setup.offset + "px" }),
		class: "uni-page-refresh"
	}, [(0, vue.createElementVNode)("div", _hoisted_1, [((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", {
		fill: $setup.color,
		class: "uni-page-refresh__icon",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24"
	}, _hoisted_5, 8, _hoisted_2)), ((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", _hoisted_6, [(0, vue.createElementVNode)("circle", {
		stroke: $setup.color,
		class: "uni-page-refresh__path",
		cx: "50",
		cy: "50",
		r: "20",
		fill: "none",
		"stroke-width": "4",
		"stroke-miterlimit": "10"
	}, null, 8, _hoisted_7)]))])], 4)]);
}
var component_default = /* @__PURE__ */ __plugin_vue_export_helper_default(component_vue_vue_type_script_lang_default, [["render", _sfc_render]]);
var pageBody_default = /* @__PURE__ */ defineSystemComponent({
	name: "PageBody",
	setup(props$26, ctx) {
		const pageMeta = __UNI_FEATURE_PULL_DOWN_REFRESH__ && usePageMeta();
		const refreshRef = __UNI_FEATURE_PULL_DOWN_REFRESH__ && (0, vue.ref)(null);
		const wrapperRef = (0, vue.ref)(null);
		const _pageRefresh = null;
		const pageRefresh = (0, vue.ref)(null);
		(0, vue.watch)(() => {
			return pageMeta.enablePullDownRefresh;
		}, () => {
			pageRefresh.value = pageMeta.enablePullDownRefresh ? _pageRefresh : null;
		}, { immediate: true });
		return () => {
			const pageRefreshTsx = __UNI_FEATURE_PULL_DOWN_REFRESH__ && createPageRefreshTsx(refreshRef, pageMeta);
			const pageResizeSensor = null;
			return (0, vue.createVNode)(vue.Fragment, null, [pageRefreshTsx, (0, vue.createVNode)("uni-page-wrapper", (0, vue.mergeProps)({ "ref": wrapperRef }, pageRefresh.value), [(0, vue.createVNode)("uni-page-body", null, [(0, vue.renderSlot)(ctx.slots, "default")]), pageResizeSensor], 16)]);
		};
	}
});
function createPageRefreshTsx(refreshRef, pageMeta) {
	if (!__UNI_FEATURE_PULL_DOWN_REFRESH__ || !pageMeta.enablePullDownRefresh) return null;
	return (0, vue.createVNode)(component_default, { "ref": refreshRef }, null, 512);
}
var page_default = /* @__PURE__ */ defineSystemComponent({
	name: "Page",
	setup(_props, ctx) {
		let pageMeta = providePageMeta(getStateId());
		const navigationBar = pageMeta.navigationBar;
		const pageStyle = {};
		useDocumentTitle(pageMeta);
		(0, vue.getCurrentInstance)();
		return () => (0, vue.createVNode)("uni-page", {
			"data-page": pageMeta.route,
			style: pageStyle
		}, __UNI_FEATURE_NAVIGATIONBAR__ && navigationBar.style !== "custom" ? [
			(0, vue.createVNode)(pageHead_default),
			createPageBodyVNode(ctx),
			null
		] : [createPageBodyVNode(ctx), null]);
	}
});
function createPageBodyVNode(ctx) {
	return (0, vue.openBlock)(), (0, vue.createBlock)(pageBody_default, { key: 0 }, {
		default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(ctx.slots, "page")]),
		_: 3
	});
}
exports.Ad = ad_default;
exports.AdContentPage = ad_content_page_default;
exports.AdDraw = ad_draw_default;
exports.AsyncErrorComponent = async_error_default;
exports.AsyncLoadingComponent = async_loading_default;
exports.Button = button_default;
exports.Camera = camera_default;
exports.Canvas = canvas_default;
exports.Checkbox = checkbox_default;
exports.CheckboxGroup = checkbox_group_default;
exports.CoverImage = cover_image_default;
exports.CoverView = cover_view_default;
exports.Editor = editor_default;
exports.Form = form_default;
exports.Icon = icon_default;
exports.Image = image_default;
exports.Input = input_default;
exports.Label = label_default;
exports.LayoutComponent = layout_default;
exports.LivePlayer = live_player_default;
exports.LivePusher = live_pusher_default;
exports.Map = map_default;
exports.MovableArea = movable_area_default;
exports.MovableView = movable_view_default;
exports.Navigator = navigator_default;
exports.PageComponent = page_default;
exports.Picker = picker_default;
exports.PickerView = picker_view_default;
exports.PickerViewColumn = picker_view_column_default;
exports.Progress = progress_default;
exports.Radio = radio_default;
exports.RadioGroup = radio_group_default;
exports.ResizeSensor = resize_sensor_default;
exports.RichText = rich_text_default;
exports.ScrollView = scroll_view_default;
exports.Slider = slider_default;
exports.Swiper = swiper_default;
exports.SwiperItem = swiper_item_default;
exports.Switch = switch_default;
exports.Text = text_default;
exports.Textarea = textarea_default;
exports.UniServiceJSBridge = UniServiceJSBridge$1;
exports.UniViewJSBridge = UniViewJSBridge$1;
exports.Video = video_default;
exports.View = view_default;
exports.WebView = web_view_default;
exports.clearStorage = clearStorage;
exports.clearStorageSync = clearStorageSync;
exports.getApp = getApp$1;
exports.getAppBaseInfo = getAppBaseInfo;
exports.getCurrentPages = getCurrentPages$1;
exports.getDeviceInfo = getDeviceInfo;
exports.getRealPath = getRealPath;
exports.getStorage = getStorage;
exports.getStorageInfo = getStorageInfo;
exports.getStorageInfoSync = getStorageInfoSync;
exports.getStorageSync = getStorageSync;
exports.getSystemInfoSync = getSystemInfoSync;
exports.plugin = plugin_default;
exports.removeStorage = removeStorage;
exports.removeStorageSync = removeStorageSync;
exports.request = request;
exports.setNavigationBarTitle = setNavigationBarTitle;
exports.setStorage = setStorage;
exports.setStorageSync = setStorageSync;
exports.setupApp = setupApp;
exports.setupPage = setupPage;
exports.setupWindow = setupWindow;
exports.uni = uni$1;
exports.useI18n = useI18n;
exports.useTabBar = useTabBar;
