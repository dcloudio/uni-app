import { DATA_RE, Emitter, EventChannel, I18N_JSON_DELIMITERS, LINEFEED, NAVBAR_HEIGHT, OFF_HOST_THEME_CHANGE, OFF_THEME_CHANGE, ON_APP_ENTER_BACKGROUND, ON_APP_ENTER_FOREGROUND, ON_BACK_PRESS, ON_ERROR, ON_HIDE, ON_HOST_THEME_CHANGE, ON_LOAD, ON_NAVIGATION_BAR_BUTTON_TAP, ON_NAVIGATION_BAR_CHANGE, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, ON_PAGE_NOT_FOUND, ON_PAGE_SCROLL, ON_PULL_DOWN_REFRESH, ON_REACH_BOTTOM, ON_REACH_BOTTOM_DISTANCE, ON_READY, ON_RESIZE, ON_SHOW, ON_THEME_CHANGE, ON_UNHANDLE_REJECTION, ON_UNLOAD, ON_WEB_INVOKE_APP_SERVICE, ON_WXS_INVOKE_CALL_METHOD, PRIMARY_COLOR, RESPONSIVE_MIN_WIDTH, SCHEME_RE, UNI_STORAGE_LOCALE, UTS as UTS$1, UTS as UTS$2, UTSJSONObject, UTSJSONObject as UTSJSONObject$1, UTSValueIterable, UTSValueIterable as UTSValueIterable$1, UniError as UniError$1, UniError as UniError$2, UniLifecycleHooks, WEB_INVOKE_APPSERVICE, addFont, addLeadingSlash, callOptions, createRpx2Unit, debounce, decodedQuery, defaultRpx2Unit, formatDateTime, getCustomDataset, getGlobal, getLen, initCustomDatasetOnce, invokeArrayFns, invokeArrayFnsWithResults, invokeCreateErrorHandler, invokeCreateVueAppHook, isUniLifecycleHook, normalizeStyles, normalizeTitleColor, onCreateVueApp, once, parseQuery, parseUrl, passive, removeLeadingSlash, resolveComponentInstance, resolveOwnerEl, resolveOwnerVm, scrollTo, stringifyQuery, updateElementStyle } from "@dcloudio/uni-shared";
import { Comment, Fragment, KeepAlive, Transition, computed, createApp, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, effectScope, getCurrentInstance, h, inject, injectHook, isInSSRComponentSetup, isReactive, isVNode, logError, markRaw, mergeProps, nextTick, normalizeClass, normalizeStyle, onActivated, onBeforeActivate, onBeforeDeactivate, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, openBlock, provide, reactive, ref, renderList, renderSlot, resolveDynamicComponent, shallowRef, toDisplayString, vShow, watch, watchEffect, withCtx, withDirectives, withModifiers } from "vue";
import { camelize, capitalize, extend, hasOwn, hyphenate, invokeArrayFns as invokeArrayFns$1, isArray, isFunction, isObject, isPlainObject, isPromise, isString, makeMap, parseStringStyle, remove, stringifyStyle, toRawType } from "@vue/shared";
import { LOCALE_EN, LOCALE_ES, LOCALE_FR, LOCALE_ZH_HANS, LOCALE_ZH_HANT, initVueI18n, isI18nStr } from "@dcloudio/uni-i18n";
import { RouterView, createRouter, createWebHashHistory, createWebHistory, isNavigationFailure, useRoute, useRouter } from "vue-router";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
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
//#endregion
//#region src/x/polyfill/polyfill.ts
var realGlobal = getGlobal();
realGlobal.UTS = UTS$2;
realGlobal.UTSJSONObject = UTSJSONObject$1;
realGlobal.UTSValueIterable = UTSValueIterable$1;
realGlobal.UniError = UniError$2;
//#endregion
//#region ../uni-core/src/i18n/utils.ts
var isEnableLocale = /*#__PURE__*/ once(() => typeof __uniConfig !== "undefined" && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length);
//#endregion
//#region ../uni-core/src/i18n/useI18n.ts
var i18n;
function getLocaleMessage() {
	const locale = uni.getLocale();
	const locales = __uniConfig.locales;
	return locales[locale] || locales[__uniConfig.fallbackLocale] || locales.en || {};
}
function formatI18n(message) {
	if (isI18nStr(message, I18N_JSON_DELIMITERS)) return useI18n().f(message, getLocaleMessage(), I18N_JSON_DELIMITERS);
	return message;
}
function resolveJsonObj(jsonObj, names) {
	if (names.length === 1) {
		if (jsonObj) {
			const _isI18nStr = (value) => isString(value) && isI18nStr(value, I18N_JSON_DELIMITERS);
			const _name = names[0];
			let filterJsonObj = [];
			if (isArray(jsonObj) && (filterJsonObj = jsonObj.filter((item) => _isI18nStr(item[_name]))).length) return filterJsonObj;
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
	if (isArray(jsonObj)) jsonObj.forEach((item) => defineI18nProperty(item, [prop]));
	else {
		let value = jsonObj[prop];
		Object.defineProperty(jsonObj, prop, {
			get() {
				return formatI18n(value);
			},
			set(v) {
				value = v;
			}
		});
	}
	return true;
}
function useI18n() {
	if (!i18n) {
		let locale;
		locale = navigator.cookieEnabled && window.localStorage && localStorage[UNI_STORAGE_LOCALE] || __uniConfig.locale || navigator.language;
		i18n = initVueI18n(locale);
		if (isEnableLocale()) {
			const localeKeys = Object.keys(__uniConfig.locales || {});
			if (localeKeys.length) localeKeys.forEach((locale) => i18n.add(locale, __uniConfig.locales[locale]));
			i18n.setLocale(locale);
		}
	}
	return i18n;
}
//#endregion
//#region ../uni-core/src/i18n/messages.ts
function normalizeMessages(module, keys, values) {
	return keys.reduce((res, name, index) => {
		res[module + name] = values[index];
		return res;
	}, {});
}
var initI18nAsyncMsgsOnce = /*#__PURE__*/ once(() => {
	const name = "uni.async.";
	const keys = ["error"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ["The connection timed out, click the screen to try again."]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ["Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo."]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ["La connexion a expiré, cliquez sur l'écran pour réessayer."]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["连接服务器超时，点击屏幕重试"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["連接服務器超時，點擊屏幕重試"]), false);
});
var initI18nShowToastMsgsOnce = /*#__PURE__*/ once(() => {
	const name = "uni.showToast.";
	const keys = ["unpaired"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ["Please note showToast must be paired with hideToast"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ["Tenga en cuenta que showToast debe estar emparejado con hideToast"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ["Veuillez noter que showToast doit être associé à hideToast"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["请注意 showToast 与 hideToast 必须配对使用"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["請注意 showToast 與 hideToast 必須配對使用"]), false);
});
var initI18nShowLoadingMsgsOnce = /*#__PURE__*/ once(() => {
	const name = "uni.showLoading.";
	const keys = ["unpaired"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ["Please note showLoading must be paired with hideLoading"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ["Tenga en cuenta que showLoading debe estar emparejado con hideLoading"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ["Veuillez noter que showLoading doit être associé à hideLoading"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["请注意 showLoading 与 hideLoading 必须配对使用"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["請注意 showLoading 與 hideLoading 必須配對使用"]), false);
});
var initI18nChooseFileMsgsOnce = /*#__PURE__*/ once(() => {
	const name = "uni.chooseFile.";
	const keys = ["notUserActivation"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ["File chooser dialog can only be shown with a user activation"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ["El cuadro de diálogo del selector de archivos solo se puede mostrar con la activación del usuario"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ["La boîte de dialogue du sélecteur de fichier ne peut être affichée qu'avec une activation par l'utilisateur"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["文件选择器对话框只能在由用户激活时显示"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["文件選擇器對話框只能在由用戶激活時顯示"]), false);
});
var initI18nSetClipboardDataMsgsOnce = /*#__PURE__*/ once(() => {
	const name = "uni.setClipboardData.";
	const keys = ["success", "fail"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ["Content copied", "Copy failed, please copy manually"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ["Contenido copiado", "Error al copiar, copie manualmente"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ["Contenu copié", "Échec de la copie, copiez manuellement"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["内容已复制", "复制失败，请手动复制"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["內容已復制", "復制失敗，請手動復製"]), false);
});
var initI18nGetClipboardDataMsgsOnce = /*#__PURE__*/ once(() => {
	const name = "uni.getClipboardData.";
	const keys = ["fail"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ["Reading failed, please paste manually"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ["Error de lectura, pegue manualmente"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ["Échec de la lecture, veuillez coller manuellement"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["读取失败，请手动粘贴"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["讀取失敗，請手動粘貼"]), false);
});
var initI18nPickerMsgsOnce = /*#__PURE__*/ once(() => {
	const name = "uni.picker.";
	const keys = ["done", "cancel"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ["Done", "Cancel"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ["OK", "Cancelar"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ["OK", "Annuler"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["完成", "取消"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["完成", "取消"]), false);
});
var initI18nVideoMsgsOnce = /*#__PURE__*/ once(() => {
	const name = "uni.video.";
	const keys = ["danmu", "volume"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ["Danmu", "Volume"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ["Danmu", "Volumen"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(LOCALE_FR, normalizeMessages(name, keys, ["Danmu", "Le Volume"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["弹幕", "音量"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["彈幕", "音量"]), false);
});
//#endregion
//#region ../uni-core/src/i18n/component.ts
function initNavigationBarI18n(navigationBar) {
	if (isEnableLocale()) return defineI18nProperties(navigationBar, [
		["titleText"],
		["searchInput", "placeholder"],
		["buttons", "text"]
	]);
}
function initTabBarI18n(tabBar) {
	if (isEnableLocale() && tabBar.list) tabBar.list.forEach((item) => {
		defineI18nProperty(item, ["text"]);
	});
	if (isEnableLocale() && tabBar.midButton) defineI18nProperty(tabBar.midButton, ["text"]);
	return tabBar;
}
//#endregion
//#region ../uni-core/src/helpers/bridge.ts
function initBridge(subscribeNamespace) {
	const emitter = new Emitter();
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
		subscribe(event, callback, once = false) {
			emitter[once ? "once" : "on"](`${subscribeNamespace}.${event}`, callback);
		},
		unsubscribe(event, callback) {
			emitter.off(`${subscribeNamespace}.${event}`, callback);
		},
		subscribeHandler(event, args, pageId) {
			emitter.emit(`${subscribeNamespace}.${event}`, args, pageId);
		}
	};
}
//#endregion
//#region ../uni-core/src/constants.ts
var INVOKE_VIEW_API = "invokeViewApi";
var INVOKE_SERVICE_API = "invokeServiceApi";
//#endregion
//#region ../uni-core/src/view/bridge/invokeServiceMethod.ts
var invokeServiceMethodId = 1;
var invokeServiceMethod = (name, args, callback) => {
	const { subscribe, publishHandler } = UniViewJSBridge;
	const id = callback ? invokeServiceMethodId++ : 0;
	callback && subscribe("invokeServiceApi." + id, callback, true);
	publishHandler(INVOKE_SERVICE_API, {
		id,
		name,
		args
	});
};
//#endregion
//#region ../uni-core/src/view/bridge/subscribeViewMethod.ts
var viewMethods = Object.create(null);
function normalizeViewMethodName(pageId, name) {
	return pageId + "." + name;
}
function subscribeViewMethod(pageId, wrapper) {
	UniViewJSBridge.subscribe(normalizeViewMethodName(pageId, INVOKE_VIEW_API), wrapper ? wrapper(onInvokeViewMethod) : onInvokeViewMethod);
}
/**
* 仅 h5 平台需要主动取消监听
* @param pageId
*/
function unsubscribeViewMethod(pageId) {
	UniViewJSBridge.unsubscribe(normalizeViewMethodName(pageId, INVOKE_VIEW_API));
	Object.keys(viewMethods).forEach((name) => {
		if (name.indexOf(pageId + ".") === 0) delete viewMethods[name];
	});
}
function registerViewMethod(pageId, name, fn) {
	name = normalizeViewMethodName(pageId, name);
	if (!viewMethods[name]) viewMethods[name] = fn;
}
function unregisterViewMethod(pageId, name) {
	name = normalizeViewMethodName(pageId, name);
	delete viewMethods[name];
}
function onInvokeViewMethod({ id, name, args }, pageId) {
	name = normalizeViewMethodName(pageId, name);
	const publish = (res) => {
		id && UniViewJSBridge.publishHandler("invokeViewApi." + id, res);
	};
	const handler = viewMethods[name];
	if (handler) handler(args, publish);
	else publish({});
}
//#endregion
//#region ../uni-core/src/view/bridge/index.ts
var ViewJSBridge = /*#__PURE__*/ extend(/*#__PURE__*/ initBridge("service"), { invokeServiceMethod });
//#endregion
//#region ../uni-core/src/view/init/longPress.ts
var LONGPRESS_TIMEOUT = 350;
var LONGPRESS_THRESHOLD = 10;
var passiveOptions$3 = /*#__PURE__*/ passive(true);
var longPressTimer;
function clearLongPressTimer() {
	if (longPressTimer) {
		clearTimeout(longPressTimer);
		longPressTimer = null;
	}
}
var startPageX = 0;
var startPageY = 0;
function touchstart(evt) {
	clearLongPressTimer();
	if (evt.touches.length !== 1) return;
	const { pageX, pageY } = evt.touches[0];
	startPageX = pageX;
	startPageY = pageY;
	longPressTimer = setTimeout(function() {
		const customEvent = new CustomEvent("longpress", {
			bubbles: true,
			cancelable: true,
			target: evt.target,
			currentTarget: evt.currentTarget
		});
		customEvent.touches = evt.touches;
		customEvent.changedTouches = evt.changedTouches;
		evt.target.dispatchEvent(customEvent);
	}, LONGPRESS_TIMEOUT);
}
function touchmove(evt) {
	if (!longPressTimer) return;
	if (evt.touches.length !== 1) return clearLongPressTimer();
	const { pageX, pageY } = evt.touches[0];
	if (Math.abs(pageX - startPageX) > LONGPRESS_THRESHOLD || Math.abs(pageY - startPageY) > LONGPRESS_THRESHOLD) return clearLongPressTimer();
}
function initLongPress() {
	window.addEventListener("touchstart", touchstart, passiveOptions$3);
	window.addEventListener("touchmove", touchmove, passiveOptions$3);
	window.addEventListener("touchend", clearLongPressTimer, passiveOptions$3);
	window.addEventListener("touchcancel", clearLongPressTimer, passiveOptions$3);
}
//#endregion
//#region ../uni-core/src/view/init/rem.ts
function checkValue$1(value, defaultValue) {
	const newValue = Number(value);
	return isNaN(newValue) ? defaultValue : newValue;
}
var isApple$1 = () => /^Apple/.test(navigator.vendor);
function getWindowWidth$1() {
	const isApple = /^Apple/.test(navigator.vendor);
	var screenWidth = isApple && window.matchMedia("(orientation:landscape)").matches ? Math.max(screen.width, screen.height) : screen.width;
	return isApple ? Math.min(window.innerWidth, document.documentElement.clientWidth, screenWidth) || screenWidth : Math.min(window.innerWidth, document.documentElement.clientWidth);
}
function useRem() {
	const config = __uniConfig.globalStyle || {};
	const maxWidth = checkValue$1(config.rpxCalcMaxDeviceWidth, 960);
	const baseWidth = checkValue$1(config.rpxCalcBaseDeviceWidth, 375);
	function updateRem() {
		let width = getWindowWidth$1();
		width = width <= maxWidth ? width : baseWidth;
		document.documentElement.style.fontSize = width / 23.4375 + "px";
	}
	updateRem();
	document.addEventListener("DOMContentLoaded", updateRem);
	window.addEventListener("load", updateRem);
	window.addEventListener("resize", updateRem);
	if (isApple$1()) window.addEventListener("orientationchange", () => {
		updateRem();
		setTimeout(updateRem, 50);
	});
}
//#endregion
//#region ../uni-core/src/helpers/dom.ts
var import_out = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
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
			attrs.forEach(function(attr) {
				elementComputedStyle[attr] = 0;
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
		} catch (e) {}
		function addChild(parent, attr) {
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
				paddingBottom: support + "(safe-area-inset-" + attr + ")"
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
					attrChange(attr);
				}
				a1.addEventListener("scroll", onScroll, passiveEvents);
				a2.addEventListener("scroll", onScroll, passiveEvents);
			});
			var computedStyle = getComputedStyle(a1);
			Object.defineProperty(elementComputedStyle, attr, {
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
	function getAttr(attr) {
		if (!inited) init();
		return elementComputedStyle[attr];
	}
	var changeAttrs = [];
	function attrChange(attr) {
		if (!changeAttrs.length) setTimeout(function() {
			var style = {};
			changeAttrs.forEach(function(attr) {
				style[attr] = elementComputedStyle[attr];
			});
			changeAttrs.length = 0;
			callbacks.forEach(function(callback) {
				callback(style);
			});
		}, 0);
		changeAttrs.push(attr);
	}
	var callbacks = [];
	function onChange(callback) {
		if (!getSupport()) return;
		if (!inited) init();
		if (typeof callback === "function") callbacks.push(callback);
	}
	function offChange(callback) {
		var index = callbacks.indexOf(callback);
		if (index >= 0) callbacks.splice(index, 1);
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
})))());
var onEventPrevent = /*#__PURE__*/ withModifiers(() => {}, ["prevent"]);
var onEventStop = /*#__PURE__*/ withModifiers((_event) => {}, ["stop"]);
function getWindowOffsetCssVar(style, name) {
	return parseInt((style.getPropertyValue(name).match(/\d+/) || ["0"])[0]);
}
function getWindowTop() {
	const style = document.documentElement.style;
	const top = getWindowOffsetCssVar(style, "--window-top");
	return top ? top + import_out.default.top : 0;
}
function getWindowOffset() {
	const style = document.documentElement.style;
	const top = getWindowTop();
	const bottom = getWindowOffsetCssVar(style, "--window-bottom");
	const left = getWindowOffsetCssVar(style, "--window-left");
	const right = getWindowOffsetCssVar(style, "--window-right");
	const topWindowHeight = getWindowOffsetCssVar(style, "--top-window-height");
	return {
		top,
		bottom: bottom ? bottom + import_out.default.bottom : 0,
		left: left ? left + import_out.default.left : 0,
		right: right ? right + import_out.default.right : 0,
		topWindowHeight: topWindowHeight || 0
	};
}
function updateCssVar(cssVars) {
	const style = document.documentElement.style;
	Object.keys(cssVars).forEach((name) => {
		style.setProperty(name, cssVars[name]);
	});
}
function updatePageCssVar(cssVars) {
	return updateCssVar(cssVars);
}
var sheetsMap = /* @__PURE__ */ new Map();
function updateStyle(id, content) {
	let style = sheetsMap.get(id);
	if (style && !(style instanceof HTMLStyleElement)) {
		removeStyle(id);
		style = void 0;
	}
	if (!style) {
		style = document.createElement("style");
		style.setAttribute("type", "text/css");
		style.innerHTML = content;
		document.head.appendChild(style);
	} else style.innerHTML = content;
	sheetsMap.set(id, style);
}
function removeStyle(id) {
	let style = sheetsMap.get(id);
	if (style) {
		if (style instanceof CSSStyleSheet) document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== style);
		else document.head.removeChild(style);
		sheetsMap.delete(id);
	}
}
//#endregion
//#region ../uni-core/src/helpers/util.ts
function PolySymbol(name) {
	return Symbol(process.env.NODE_ENV !== "production" ? "[uni-app]: " + name : name);
}
function hasRpx(str) {
	str = str + "";
	return str.indexOf("rpx") !== -1 || str.indexOf("upx") !== -1;
}
function rpx2px(str, replace = false) {
	if (replace) return rpx2pxWithReplace(str);
	if (isString(str)) {
		const res = parseInt(str) || 0;
		if (hasRpx(str)) return uni.upx2px(res);
		return res;
	}
	return str;
}
function rpx2pxWithReplace(str) {
	if (!hasRpx(str)) return str;
	return str.replace(/(\d+(\.\d+)?)[ru]px/g, (_a, b) => {
		return uni.upx2px(parseFloat(b)) + "px";
	});
}
function get$pageByPage(page) {
	return page.vm.$basePage;
}
function isBuiltInElement(target) {
	return !!target.__isUniElement;
}
//#endregion
//#region ../uni-core/src/helpers/icon.ts
var ICON_PATH_CANCEL = "M20.928 10.176l-4.928 4.928-4.928-4.928-0.896 0.896 4.928 4.928-4.928 4.928 0.896 0.896 4.928-4.928 4.928 4.928 0.896-0.896-4.928-4.928 4.928-4.928-0.896-0.896zM16 2.080q-3.776 0-7.040 1.888-3.136 1.856-4.992 4.992-1.888 3.264-1.888 7.040t1.888 7.040q1.856 3.136 4.992 4.992 3.264 1.888 7.040 1.888t7.040-1.888q3.136-1.856 4.992-4.992 1.888-3.264 1.888-7.040t-1.888-7.040q-1.856-3.136-4.992-4.992-3.264-1.888-7.040-1.888zM16 28.64q-3.424 0-6.4-1.728-2.848-1.664-4.512-4.512-1.728-2.976-1.728-6.4t1.728-6.4q1.664-2.848 4.512-4.512 2.976-1.728 6.4-1.728t6.4 1.728q2.848 1.664 4.512 4.512 1.728 2.976 1.728 6.4t-1.728 6.4q-1.664 2.848-4.512 4.512-2.976 1.728-6.4 1.728z";
var ICON_PATH_CLEAR = "M16 0q-4.352 0-8.064 2.176-3.616 2.144-5.76 5.76-2.176 3.712-2.176 8.064t2.176 8.064q2.144 3.616 5.76 5.76 3.712 2.176 8.064 2.176t8.064-2.176q3.616-2.144 5.76-5.76 2.176-3.712 2.176-8.064t-2.176-8.064q-2.144-3.616-5.76-5.76-3.712-2.176-8.064-2.176zM22.688 21.408q0.32 0.32 0.304 0.752t-0.336 0.736-0.752 0.304-0.752-0.32l-5.184-5.376-5.376 5.184q-0.32 0.32-0.752 0.304t-0.736-0.336-0.304-0.752 0.32-0.752l5.376-5.184-5.184-5.376q-0.32-0.32-0.304-0.752t0.336-0.752 0.752-0.304 0.752 0.336l5.184 5.376 5.376-5.184q0.32-0.32 0.752-0.304t0.752 0.336 0.304 0.752-0.336 0.752l-5.376 5.184 5.184 5.376z";
var ICON_PATH_DOWNLOAD = "M15.808 1.696q-3.776 0-7.072 1.984-3.2 1.888-5.088 5.152-1.952 3.392-1.952 7.36 0 3.776 1.952 7.072 1.888 3.2 5.088 5.088 3.296 1.952 7.072 1.952 3.968 0 7.36-1.952 3.264-1.888 5.152-5.088 1.984-3.296 1.984-7.072 0-4-1.984-7.36-1.888-3.264-5.152-5.152-3.36-1.984-7.36-1.984zM20.864 18.592l-3.776 4.928q-0.448 0.576-1.088 0.576t-1.088-0.576l-3.776-4.928q-0.448-0.576-0.24-0.992t0.944-0.416h2.976v-8.928q0-0.256 0.176-0.432t0.4-0.176h1.216q0.224 0 0.4 0.176t0.176 0.432v8.928h2.976q0.736 0 0.944 0.416t-0.24 0.992z";
var ICON_PATH_INFO = "M15.808 0.128q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.176 3.776-2.176 8.16 0 4.224 2.176 7.872 2.080 3.552 5.632 5.632 3.648 2.176 7.872 2.176 4.384 0 8.16-2.176 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.416-2.176-8.16-2.112-3.616-5.728-5.728-3.744-2.176-8.16-2.176zM16.864 23.776q0 0.064-0.064 0.064h-1.568q-0.096 0-0.096-0.064l-0.256-11.328q0-0.064 0.064-0.064h2.112q0.096 0 0.064 0.064l-0.256 11.328zM16 10.88q-0.576 0-0.976-0.4t-0.4-0.96 0.4-0.96 0.976-0.4 0.976 0.4 0.4 0.96-0.4 0.96-0.976 0.4z";
var ICON_PATH_SEARCH = "M20.928 22.688q-1.696 1.376-3.744 2.112-2.112 0.768-4.384 0.768-3.488 0-6.464-1.728-2.88-1.696-4.576-4.608-1.76-2.976-1.76-6.464t1.76-6.464q1.696-2.88 4.576-4.576 2.976-1.76 6.464-1.76t6.464 1.76q2.912 1.696 4.608 4.576 1.728 2.976 1.728 6.464 0 2.272-0.768 4.384-0.736 2.048-2.112 3.744l9.312 9.28-1.824 1.824-9.28-9.312zM12.8 23.008q2.784 0 5.184-1.376 2.304-1.376 3.68-3.68 1.376-2.4 1.376-5.184t-1.376-5.152q-1.376-2.336-3.68-3.68-2.4-1.408-5.184-1.408t-5.152 1.408q-2.336 1.344-3.68 3.68-1.408 2.368-1.408 5.152t1.408 5.184q1.344 2.304 3.68 3.68 2.368 1.376 5.152 1.376zM12.8 23.008v0z";
var ICON_PATH_SUCCESS_NO_CIRCLE = "M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z";
var ICON_PATH_SUCCESS = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM24.832 11.328l-11.264 11.104q-0.032 0.032-0.112 0.032t-0.112-0.032l-5.216-5.376q-0.096-0.128 0-0.288l0.704-0.96q0.032-0.064 0.112-0.064t0.112 0.032l4.256 3.264q0.064 0.032 0.144 0.032t0.112-0.032l10.336-8.608q0.064-0.064 0.144-0.064t0.112 0.064l0.672 0.672q0.128 0.128 0 0.224z";
var ICON_PATH_WAITING = "M15.84 0.096q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM23.008 21.92l-0.512 0.896q-0.096 0.128-0.224 0.064l-8-3.808q-0.096-0.064-0.16-0.128-0.128-0.096-0.128-0.288l0.512-12.096q0-0.064 0.048-0.112t0.112-0.048h1.376q0.064 0 0.112 0.048t0.048 0.112l0.448 10.848 6.304 4.256q0.064 0.064 0.080 0.128t-0.016 0.128z";
var ICON_PATH_WARN = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM15.136 8.672h1.728q0.128 0 0.224 0.096t0.096 0.256l-0.384 10.24q0 0.064-0.048 0.112t-0.112 0.048h-1.248q-0.096 0-0.144-0.048t-0.048-0.112l-0.384-10.24q0-0.16 0.096-0.256t0.224-0.096zM16 23.328q-0.48 0-0.832-0.352t-0.352-0.848 0.352-0.848 0.832-0.352 0.832 0.352 0.352 0.848-0.352 0.848-0.832 0.352z";
var ICON_PATH_BACK = "M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z";
var ICON_PATH_CLOSE = "M17.25 16.156l7.375-7.313q0.281-0.281 0.281-0.641t-0.281-0.641q-0.25-0.25-0.625-0.25t-0.625 0.25l-7.375 7.344-7.313-7.344q-0.25-0.25-0.625-0.25t-0.625 0.25q-0.281 0.25-0.281 0.625t0.281 0.625l7.313 7.344-7.375 7.344q-0.281 0.25-0.281 0.625t0.281 0.625q0.125 0.125 0.281 0.188t0.344 0.063q0.156 0 0.328-0.063t0.297-0.188l7.375-7.344 7.375 7.406q0.125 0.156 0.297 0.219t0.328 0.063q0.188 0 0.344-0.078t0.281-0.203q0.281-0.25 0.281-0.609t-0.281-0.641l-7.375-7.406z";
function createSvgIconVNode(path, color = "#000", size = 27) {
	return createVNode("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32"
	}, [createVNode("path", {
		d: path,
		fill: color
	}, null, 8, ["d", "fill"])], 8, ["width", "height"]);
}
//#endregion
//#region ../uni-core/src/helpers/page.ts
function useCurrentPageId() {
	{
		const { $pageInstance } = getCurrentInstance();
		return $pageInstance && getPageProxyId($pageInstance.proxy);
	}
	let pageId;
	try {
		pageId = getPageProxyId(getCurrentInstance().root.proxy);
	} catch (_unused) {
		const webviewId = plus.webview.currentWebview().id;
		pageId = isNaN(Number(webviewId)) ? webviewId : Number(webviewId);
	}
	return pageId;
}
function getPageIdByVm(instance) {
	const vm = resolveComponentInstance(instance);
	if (vm.$page) return getPageProxyId(vm);
	if (!vm.$) return;
	{
		const { $pageInstance } = vm.$;
		if ($pageInstance) return getPageProxyId($pageInstance.proxy);
	}
	const rootProxy = vm.$.root.proxy;
	if (rootProxy && rootProxy.$page) return getPageProxyId(rootProxy);
}
function getCurrentPage() {
	const pages = getCurrentPages();
	const len = pages.length;
	if (len) return pages[len - 1];
}
function getCurrentPageMeta() {
	var _getCurrentPage;
	const $page = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 || (_getCurrentPage = _getCurrentPage.vm) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.$basePage;
	if ($page) return $page.meta;
}
function getCurrentPageId() {
	const meta = getCurrentPageMeta();
	if (meta) return meta.id;
	return -1;
}
function getCurrentPageVm() {
	var _getCurrentPage3;
	const page = (_getCurrentPage3 = getCurrentPage()) === null || _getCurrentPage3 === void 0 ? void 0 : _getCurrentPage3.vm;
	if (page) return page.$vm;
}
var PAGE_META_KEYS = ["navigationBar", "pullToRefresh"];
function initGlobalStyle() {
	return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
}
function initRouteMeta(pageMeta, id) {
	const globalStyle = initGlobalStyle();
	const res = extend({ id }, globalStyle, pageMeta);
	PAGE_META_KEYS.forEach((name) => {
		res[name] = extend({}, globalStyle[name], pageMeta[name]);
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
	const { id, route } = meta;
	const titleColor = normalizeStyles(meta.navigationBar, __uniConfig.themeConfig, themeMode).titleColor;
	return {
		id,
		path: addLeadingSlash(route),
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
//#endregion
//#region ../uni-core/src/helpers/hook.ts
function removeHook(vm, name, hook) {
	const hooks = vm.$[name];
	if (!isArray(hooks)) return;
	if (hook.__weh) remove(hooks, hook.__weh);
}
function invokeHook(vm, name, args) {
	if (isString(vm)) {
		args = name;
		name = vm;
		vm = getCurrentPageVm();
	} else if (typeof vm === "number") {
		const page = getCurrentPages().find((page) => get$pageByPage(page).id === vm);
		if (page) vm = page.$vm;
		else vm = getCurrentPageVm();
	}
	if (!vm) return;
	const hooks = vm.$[name];
	if (name === ON_BACK_PRESS) return hooks && invokeArrayFnsWithResults(hooks, args).some((ret) => ret === true);
	return hooks && invokeArrayFns(hooks, args);
}
//#endregion
//#region ../uni-core/src/helpers/scroll.ts
function disableScrollListener(evt) {
	evt.preventDefault();
}
var testReachBottomTimer;
var lastScrollHeight = 0;
function createScrollListener({ onPageScroll, onReachBottom, onReachBottomDistance }) {
	let ticking = false;
	let hasReachBottom = false;
	let reachBottomLocking = true;
	const isReachBottom = () => {
		const { scrollHeight } = document.documentElement;
		const windowHeight = window.innerHeight;
		const scrollY = window.scrollY;
		const isBottom = scrollY > 0 && scrollHeight > windowHeight && scrollY + windowHeight + onReachBottomDistance >= scrollHeight;
		const heightChanged = Math.abs(scrollHeight - lastScrollHeight) > onReachBottomDistance;
		if (isBottom && (!hasReachBottom || heightChanged)) {
			lastScrollHeight = scrollHeight;
			hasReachBottom = true;
			return true;
		}
		if (!isBottom && hasReachBottom) hasReachBottom = false;
		return false;
	};
	const trigger = () => {
		onPageScroll && onPageScroll(window.pageYOffset);
		function testReachBottom() {
			if (isReachBottom()) {
				onReachBottom && onReachBottom();
				reachBottomLocking = false;
				setTimeout(function() {
					reachBottomLocking = true;
				}, 350);
				return true;
			}
		}
		if (onReachBottom && reachBottomLocking) if (testReachBottom()) {} else testReachBottomTimer = setTimeout(testReachBottom, 300);
		ticking = false;
	};
	return function onScroll() {
		clearTimeout(testReachBottomTimer);
		if (!ticking) requestAnimationFrame(trigger);
		ticking = true;
	};
}
//#endregion
//#region ../uni-core/src/helpers/route.ts
function normalizeRoute(toRoute) {
	if (toRoute.indexOf("/") === 0 || toRoute.indexOf("uni:") === 0) return toRoute;
	let fromRoute = "";
	const pages = getCurrentPages();
	if (pages.length) fromRoute = get$pageByPage(pages[pages.length - 1]).route;
	return getRealRoute(fromRoute, toRoute);
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
	return addLeadingSlash(fromRouteArray.concat(toRouteArray).join("/"));
}
function getRouteOptions(path, alias = false) {
	if (alias) return __uniRoutes.find((route) => route.path === path || route.alias === path);
	return __uniRoutes.find((route) => route.path === path);
}
function normalizeTabBarRoute(index, oldPagePath, newPagePath) {
	const oldTabBarRoute = getRouteOptions(addLeadingSlash(oldPagePath));
	if (oldTabBarRoute) {
		const { meta } = oldTabBarRoute;
		delete meta.tabBarIndex;
		meta.isQuit = meta.isTabBar = false;
	}
	const newTabBarRoute = getRouteOptions(addLeadingSlash(newPagePath));
	if (newTabBarRoute) {
		const { meta } = newTabBarRoute;
		meta.tabBarIndex = index;
		meta.isQuit = meta.isTabBar = true;
		const tabBar = __uniConfig.tabBar;
		if (tabBar && tabBar.list && tabBar.list[index]) tabBar.list[index].pagePath = removeLeadingSlash(newPagePath);
	}
}
//#endregion
//#region ../uni-core/src/helpers/dialogPage.ts
var SYSTEM_DIALOG_PAGE_PATH_STARTER = "uni:";
var SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH$1 = "uni:actionSheet";
function isSystemDialogPage(page) {
	return page.route.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER);
}
function isSystemActionSheetDialogPage(page) {
	return page.route.startsWith(SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH$1);
}
function dialogPageTriggerParentHide(dialogPage) {
	dialogPageTriggerParentLifeCycle(dialogPage, ON_HIDE);
}
function dialogPageTriggerParentShow(dialogPage, triggerParentHideDialogPageNum = 0) {
	dialogPageTriggerParentLifeCycle(dialogPage, ON_SHOW, triggerParentHideDialogPageNum);
}
function dialogPageTriggerParentLifeCycle(dialogPage, lifeCycle, triggerParentHideDialogPageNum = 0) {
	if (!dialogPage.$triggerParentHide) return;
	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1];
	if (!currentPage) return;
	const parentPage = dialogPage.getParentPage();
	if (!parentPage) return;
	if (parentPage !== currentPage) return;
	const dialogPages = currentPage.getDialogPages();
	for (let i = 0; i < dialogPages.length; i++) if (!!dialogPages[i].$triggerParentHide) {
		triggerParentHideDialogPageNum++;
		if (triggerParentHideDialogPageNum > 1) return;
	}
	if (triggerParentHideDialogPageNum <= 1) {
		const systemDialogPages = getSystemDialogPages(parentPage);
		for (let i = 0; i < systemDialogPages.length; i++) if (!!systemDialogPages[i].$triggerParentHide) {
			triggerParentHideDialogPageNum++;
			if (triggerParentHideDialogPageNum > 1) return;
		}
	}
	invokeHook(currentPage.vm, lifeCycle);
}
function getSystemDialogPages(parentPage) {
	if (!parentPage) return [];
	return parentPage.$getSystemDialogPages();
}
function dialogPageTriggerPrevDialogPageLifeCycle(parentPage, lifeCycle) {
	if (!parentPage) return;
	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1];
	if (!currentPage || parentPage !== currentPage) return;
	let prevDialogPage = getLastDialogPage(currentPage);
	prevDialogPage && invokeHook(prevDialogPage.vm, lifeCycle);
}
function getLastDialogPage(parentPage) {
	var _lastSystemDialogPage, _lastDialogPage$vm;
	if (!parentPage) return null;
	const dialogPages = parentPage.getDialogPages();
	const systemDialogPages = getSystemDialogPages(parentPage);
	const lastSystemDialogPage = systemDialogPages[systemDialogPages.length - 1];
	const lastDialogPage = dialogPages[dialogPages.length - 1];
	if (!lastDialogPage) return lastSystemDialogPage;
	if (!lastSystemDialogPage) return lastDialogPage;
	return (((_lastSystemDialogPage = lastSystemDialogPage.vm) === null || _lastSystemDialogPage === void 0 || (_lastSystemDialogPage = _lastSystemDialogPage.$basePage) === null || _lastSystemDialogPage === void 0 ? void 0 : _lastSystemDialogPage.id) || Number.MAX_SAFE_INTEGER) > (((_lastDialogPage$vm = lastDialogPage.vm) === null || _lastDialogPage$vm === void 0 || (_lastDialogPage$vm = _lastDialogPage$vm.$basePage) === null || _lastDialogPage$vm === void 0 ? void 0 : _lastDialogPage$vm.id) || Number.MAX_SAFE_INTEGER) ? lastSystemDialogPage : lastDialogPage;
}
function invokeLastDialogPageHookByUniPage(parentPage, hook) {
	const lastDialogPage = getLastDialogPage(parentPage);
	if (lastDialogPage) invokeHook(lastDialogPage.vm, hook);
}
function invokeNewDialogPageHook(page, hook) {
	const currentPage = getCurrentPage();
	let shouldInvoke = false;
	if (!currentPage) shouldInvoke = true;
	else if (isSystemDialogPage(page)) shouldInvoke = getSystemDialogPages(currentPage).includes(page);
	else shouldInvoke = currentPage.getDialogPages().includes(page);
	shouldInvoke && invokeHook(page.vm, hook);
}
function getPageInstanceByChild(child) {
	var _pageInstance$type;
	let pageInstance = child;
	while (pageInstance && ((_pageInstance$type = pageInstance.type) === null || _pageInstance$type === void 0 ? void 0 : _pageInstance$type.name) !== "Page") pageInstance = pageInstance.parent;
	return pageInstance;
}
var DIALOG_TAG = "dialog";
var SYSTEM_DIALOG_TAG = "systemDialog";
function isDialogPageInstance(vm) {
	if (!vm) return false;
	return isNormalDialogPageInstance(vm) || isSystemDialogPageInstance(vm);
}
function isNormalDialogPageInstance(vm) {
	return vm.attrs["data-type"] === DIALOG_TAG;
}
function isSystemDialogPageInstance(vm) {
	return vm.attrs["data-type"] === SYSTEM_DIALOG_TAG;
}
//#endregion
//#region ../uni-core/src/view/init/index.ts
function initView() {
	useRem();
	initCustomDatasetOnce(isBuiltInElement);
	if (__UNI_FEATURE_LONGPRESS__) initLongPress();
}
//#endregion
//#region ../uni-core/src/view/plugin/componentWxs.ts
var ComponentDescriptor = class {
	constructor(vm) {
		this.$bindClass = false;
		this.$bindStyle = false;
		this.$vm = vm;
		this.$el = resolveOwnerEl(vm.$);
		if (this.$el.getAttribute) {
			this.$bindClass = !!this.$el.getAttribute("class");
			this.$bindStyle = !!this.$el.getAttribute("style");
		}
	}
	selectComponent(selector) {
		if (!this.$el || !selector) return;
		const wxsVm = getWxsVm(this.$el.querySelector(selector));
		if (!wxsVm) return;
		return createComponentDescriptor(wxsVm, false);
	}
	selectAllComponents(selector) {
		if (!this.$el || !selector) return [];
		const descriptors = [];
		const els = this.$el.querySelectorAll(selector);
		for (let i = 0; i < els.length; i++) {
			const wxsVm = getWxsVm(els[i]);
			if (wxsVm) descriptors.push(createComponentDescriptor(wxsVm, false));
		}
		return descriptors;
	}
	forceUpdate(type) {
		if (type === "class") if (this.$bindClass) {
			this.$el.__wxsClassChanged = true;
			this.$vm.$forceUpdate();
		} else this.updateWxsClass();
		else if (type === "style") if (this.$bindStyle) {
			this.$el.__wxsStyleChanged = true;
			this.$vm.$forceUpdate();
		} else this.updateWxsStyle();
	}
	updateWxsClass() {
		const { __wxsAddClass } = this.$el;
		if (__wxsAddClass.length) this.$el.className = __wxsAddClass.join(" ");
	}
	updateWxsStyle() {
		const { __wxsStyle } = this.$el;
		if (__wxsStyle) this.$el.setAttribute("style", stringifyStyle(__wxsStyle));
	}
	setStyle(style) {
		if (!this.$el || !style) return this;
		if (isString(style)) style = parseStringStyle(style);
		if (isPlainObject(style)) {
			this.$el.__wxsStyle = style;
			this.forceUpdate("style");
		}
		return this;
	}
	addClass(clazz) {
		if (!this.$el || !clazz) return this;
		const __wxsAddClass = this.$el.__wxsAddClass || (this.$el.__wxsAddClass = []);
		if (__wxsAddClass.indexOf(clazz) === -1) {
			__wxsAddClass.push(clazz);
			this.forceUpdate("class");
		}
		return this;
	}
	removeClass(clazz) {
		if (!this.$el || !clazz) return this;
		const { __wxsAddClass } = this.$el;
		if (__wxsAddClass) {
			const index = __wxsAddClass.indexOf(clazz);
			if (index > -1) __wxsAddClass.splice(index, 1);
		}
		const __wxsRemoveClass = this.$el.__wxsRemoveClass || (this.$el.__wxsRemoveClass = []);
		if (__wxsRemoveClass.indexOf(clazz) === -1) {
			__wxsRemoveClass.push(clazz);
			this.forceUpdate("class");
		}
		return this;
	}
	hasClass(cls) {
		return this.$el && this.$el.classList.contains(cls);
	}
	getDataset() {
		return this.$el && this.$el.dataset;
	}
	callMethod(funcName, args = {}) {
		const func = this.$vm[funcName];
		if (isFunction(func)) func(JSON.parse(JSON.stringify(args)));
		else if (this.$vm.ownerId) UniViewJSBridge.publishHandler(ON_WXS_INVOKE_CALL_METHOD, {
			nodeId: this.$el.__id,
			ownerId: this.$vm.ownerId,
			method: funcName,
			args
		});
	}
	requestAnimationFrame(callback) {
		return window.requestAnimationFrame(callback);
	}
	getState() {
		return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}));
	}
	triggerEvent(eventName, detail = {}) {
		return this.$vm.$emit(eventName, detail), this;
	}
	getComputedStyle(names) {
		if (this.$el) {
			const styles = window.getComputedStyle(this.$el);
			if (names && names.length) return names.reduce((res, n) => {
				res[n] = styles[n];
				return res;
			}, {});
			return styles;
		}
		return {};
	}
	setTimeout(handler, timeout) {
		return window.setTimeout(handler, timeout);
	}
	clearTimeout(handle) {
		return window.clearTimeout(handle);
	}
	getBoundingClientRect() {
		return this.$el.getBoundingClientRect();
	}
};
function createComponentDescriptor(vm, isOwnerInstance = true) {
	if (isOwnerInstance && vm) vm = resolveOwnerVm(vm.$);
	if (vm && vm.$el) {
		if (!vm.$el.__wxsComponentDescriptor) vm.$el.__wxsComponentDescriptor = new ComponentDescriptor(vm);
		return vm.$el.__wxsComponentDescriptor;
	}
}
function getComponentDescriptor(instance, isOwnerInstance) {
	return createComponentDescriptor(instance, isOwnerInstance);
}
function resolveOwnerComponentPublicInstance(eventValue, instance, checkArgsLength = true) {
	if (!instance) return false;
	if (checkArgsLength && eventValue.length < 2) return false;
	const ownerVm = resolveOwnerVm(instance);
	if (!ownerVm) return false;
	const type = ownerVm.$.type;
	if (!type.$wxs && !type.$renderjs) return false;
	return ownerVm;
}
function wrapperH5WxsEvent(event, eventValue, instance, checkArgsLength = true) {
	if (eventValue) {
		if (!event.__instance) {
			event.__instance = true;
			Object.defineProperty(event, "instance", { get() {
				return getComponentDescriptor(instance.proxy, false);
			} });
		}
		const ownerVm = resolveOwnerComponentPublicInstance(eventValue, instance, checkArgsLength);
		if (ownerVm) return [event, getComponentDescriptor(ownerVm, false)];
	}
}
function getWxsVm(el) {
	if (!el) return;
	return el.__vueParentComponent && el.__vueParentComponent.proxy;
}
//#endregion
//#region ../uni-core/src/view/plugin/componentInstance.ts
var componentInstance_exports = /* @__PURE__ */ __exportAll({
	$nne: () => $nne,
	createNativeEvent: () => createNativeEvent
});
function $nne(evt, eventValue, instance) {
	const { currentTarget } = evt;
	if (!(evt instanceof Event) || !(currentTarget instanceof HTMLElement)) return [evt];
	const isHTMLTarget = !isBuiltInElement(currentTarget);
	if (isHTMLTarget) return wrapperH5WxsEvent(evt, eventValue, instance, false) || [evt];
	const res = createNativeEvent(evt, isHTMLTarget);
	return wrapperH5WxsEvent(res, eventValue, instance) || [res];
}
function findUniTarget(target) {
	while (!isBuiltInElement(target)) target = target.parentElement;
	return target;
}
function createNativeEvent(evt, htmlElement = false) {
	const { type, timeStamp, target, currentTarget } = evt;
	let realTarget, realCurrentTarget;
	realTarget = htmlElement ? target : findUniTarget(target);
	realCurrentTarget = currentTarget;
	const event = {
		type,
		timeStamp,
		target: realTarget,
		detail: {},
		currentTarget: realCurrentTarget
	};
	if (evt instanceof CustomEvent && isPlainObject(evt.detail)) event.detail = evt.detail;
	if (evt._stopped) event._stopped = true;
	if (evt.type.startsWith("touch")) {
		event.touches = evt.touches;
		event.changedTouches = evt.changedTouches;
	}
	return new Proxy(evt, { get(target, key) {
		if (key in event) return event[key];
		const value = target[key];
		return isFunction(value) ? value.bind(target) : value;
	} });
}
//#endregion
//#region ../uni-core/src/view/plugin/appConfig.ts
function initAppConfig$1(appConfig) {
	const globalProperties = appConfig.globalProperties;
	extend(globalProperties, componentInstance_exports);
	if (__UNI_FEATURE_WXS__) globalProperties.$gcd = getComponentDescriptor;
}
//#endregion
//#region ../uni-core/src/view/plugin/index.ts
function initViewPlugin(app) {
	initAppConfig$1(app._context.config);
}
//#endregion
//#region ../uni-core/src/service/bridge/invokeOnCallback.ts
var invokeOnCallback = (name, res) => UniServiceJSBridge.emit("api." + name, res);
//#endregion
//#region ../uni-core/src/service/bridge/invokeViewMethod.ts
var invokeViewMethodId = 1;
function publishViewMethodName(pageId) {
	return (pageId || getCurrentPageId()) + "." + INVOKE_VIEW_API;
}
var invokeViewMethod = (name, args, pageId, callback) => {
	const { subscribe, publishHandler } = UniServiceJSBridge;
	const id = callback ? invokeViewMethodId++ : 0;
	callback && subscribe("invokeViewApi." + id, callback, true);
	publishHandler(publishViewMethodName(pageId), {
		id,
		name,
		args
	}, pageId);
};
var invokeViewMethodKeepAlive = (name, args, callback, pageId) => {
	const { subscribe, unsubscribe, publishHandler } = UniServiceJSBridge;
	const id = invokeViewMethodId++;
	const subscribeName = INVOKE_VIEW_API + "." + id;
	subscribe(subscribeName, callback);
	publishHandler(publishViewMethodName(pageId), {
		id,
		name,
		args
	}, pageId);
	return () => {
		unsubscribe(subscribeName);
	};
};
//#endregion
//#region ../uni-core/src/service/bridge/index.ts
var ServiceJSBridge = /*#__PURE__*/ extend(/*#__PURE__*/ initBridge("view"), {
	invokeOnCallback,
	invokeViewMethod,
	invokeViewMethodKeepAlive
});
//#endregion
//#region ../uni-core/src/service/init/on.ts
function initOn() {
	const { on } = UniServiceJSBridge;
	on(ON_RESIZE, onResize$2);
	on(ON_APP_ENTER_FOREGROUND, onAppEnterForeground);
	on(ON_APP_ENTER_BACKGROUND, onAppEnterBackground);
}
function onResize$2(res) {
	var _getCurrentPage;
	const page = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
	invokeHook(page, ON_RESIZE, res);
	{
		const dialogPages = page === null || page === void 0 ? void 0 : page.$page.getDialogPages();
		if ((dialogPages === null || dialogPages === void 0 ? void 0 : dialogPages.length) > 0) invokeHook(dialogPages[dialogPages.length - 1].vm, ON_RESIZE, res);
		const systemDialogPages = page === null || page === void 0 ? void 0 : page.$page.$getSystemDialogPages();
		if ((systemDialogPages === null || systemDialogPages === void 0 ? void 0 : systemDialogPages.length) > 0) invokeHook(systemDialogPages[systemDialogPages.length - 1].vm, ON_RESIZE, res);
	}
	UniServiceJSBridge.invokeOnCallback("onWindowResize", res);
}
function onAppEnterForeground(enterOptions) {
	var _getCurrentPage2;
	const page = (_getCurrentPage2 = getCurrentPage()) === null || _getCurrentPage2 === void 0 ? void 0 : _getCurrentPage2.vm;
	invokeHook(getApp().vm, ON_SHOW, enterOptions);
	invokeHook(page, ON_SHOW);
}
function onAppEnterBackground() {
	var _getCurrentPage3;
	invokeHook(getApp().vm, ON_HIDE);
	invokeHook((_getCurrentPage3 = getCurrentPage()) === null || _getCurrentPage3 === void 0 ? void 0 : _getCurrentPage3.vm, ON_HIDE);
}
//#endregion
//#region ../uni-core/src/service/init/subscribe.ts
var SUBSCRIBE_LIFECYCLE_HOOKS = [ON_PAGE_SCROLL, ON_REACH_BOTTOM];
function initSubscribe() {
	SUBSCRIBE_LIFECYCLE_HOOKS.forEach((name) => UniServiceJSBridge.subscribe(name, createPageEvent(name)));
}
function createPageEvent(name) {
	return (args, pageId) => {
		invokeHook(parseInt(pageId), name, args);
	};
}
//#endregion
//#region ../uni-core/src/service/init/index.ts
function initService() {
	initOn();
	initSubscribe();
}
function initAppVm(appVm) {
	appVm.$vm = appVm;
	appVm.$mpType = "app";
	const locale = ref(useI18n().getLocale());
	Object.defineProperty(appVm, "$locale", {
		get() {
			return locale.value;
		},
		set(v) {
			locale.value = v;
		}
	});
}
function initPageVm(pageVm, page) {
	pageVm.route = page.route;
	pageVm.$vm = pageVm;
	pageVm.$basePage = page;
	pageVm.$mpType = "page";
	pageVm.$fontFamilySet = /* @__PURE__ */ new Set();
	if (page.meta.isTabBar) {
		pageVm.$.__isTabBar = true;
		pageVm.$.__isActive = true;
	}
}
//#endregion
//#region ../uni-core/src/service/plugin/componentWx.ts
var componentWx_exports = /* @__PURE__ */ __exportAll({
	createIntersectionObserver: () => createIntersectionObserver$1,
	createMediaQueryObserver: () => createMediaQueryObserver$1,
	createSelectorQuery: () => createSelectorQuery$1,
	selectAllComponents: () => selectAllComponents,
	selectComponent: () => selectComponent
});
function querySelector(vm, selector) {
	const el = vm.$el.querySelector(selector);
	return el && el.__vue__;
}
function querySelectorAll(vm, selector) {
	const nodeList = vm.$el.querySelectorAll(selector);
	if (nodeList) return [...nodeList].map((node) => node.__vue__).filter(Boolean);
	return [];
}
function createSelectorQuery$1() {
	return uni.createSelectorQuery().in(this);
}
function createMediaQueryObserver$1() {
	return uni.createMediaQueryObserver(this);
}
function createIntersectionObserver$1(options) {
	return uni.createIntersectionObserver(this, options);
}
function selectComponent(selector) {
	return querySelector(this, selector);
}
function selectAllComponents(selector) {
	return querySelectorAll(this, selector);
}
//#endregion
//#region ../uni-core/src/service/plugin/componentInstance.ts
function getOpenerEventChannel() {
	if (this.$route) {
		const meta = this.$route.meta;
		if (!meta.eventChannel) meta.eventChannel = new EventChannel(this.$basePage.id);
		return meta.eventChannel;
	}
}
//#endregion
//#region ../uni-core/src/service/plugin/appConfig.ts
function initAppConfig(appConfig) {
	const globalProperties = appConfig.globalProperties;
	globalProperties.getOpenerEventChannel = getOpenerEventChannel;
	if (__UNI_FEATURE_WX__) extend(globalProperties, componentWx_exports);
}
//#endregion
//#region ../uni-core/src/service/plugin/index.ts
function initServicePlugin(app) {
	initAppConfig(app._context.config);
}
//#endregion
//#region ../uni-core/src/service/utils.ts
function createLaunchOptions() {
	return {
		path: "",
		query: {},
		scene: 1001,
		referrerInfo: {
			appId: "",
			extraData: {}
		}
	};
}
function defineGlobalData(app, defaultGlobalData) {
	const options = app.$options || {};
	options.globalData = extend(options.globalData || {}, defaultGlobalData);
	Object.defineProperty(app, "globalData", {
		get() {
			return options.globalData;
		},
		set(newGlobalData) {
			options.globalData = newGlobalData;
		}
	});
}
//#endregion
//#region ../uni-components/src/helpers/animation.ts
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
	let index = 0;
	const actions = animation.actions;
	const length = animation.actions.length;
	function animate() {
		const action = actions[index];
		const transition = action.option.transition;
		const style = getStyle(action);
		Object.keys(style).forEach((key) => {
			context.$el.style[key] = style[key];
		});
		index += 1;
		if (index < length) setTimeout(animate, transition.duration + transition.delay);
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
//#endregion
//#region ../uni-components/src/helpers/component.ts
/**
* 内置组件（对外，比如view）
* @param options
* @returns
*/
var defineBuiltInComponent = ((options) => {
	options.__reserved = true;
	const { props, mixins } = options;
	if (!props || !props.animation) (mixins || (options.mixins = [])).push(animation_default);
	{
		const rootElement = options.rootElement;
		if (rootElement) customElements.define(rootElement.name, rootElement.class, rootElement.options);
	}
	return defineSystemComponent(options);
});
/**
* 系统组件（不对外，比如App,Page等）
* @param options
* @returns
*/
var defineSystemComponent = ((options) => {
	options.__reserved = true;
	options.compatConfig = { MODE: 3 };
	return defineComponent(options);
});
/**
* 暂未支持的组件
* @param name
* @returns
*/
var defineUnsupportedComponent = (name) => {
	return defineBuiltInComponent({
		name: capitalize(camelize(name)),
		setup() {
			return () => (openBlock(), createElementBlock("uni-" + name, null, name + " is unsupported"));
		}
	});
};
//#endregion
//#region ../uni-components/src/helpers/useEvent.ts
function withWebEvent(fn) {
	return fn.__wwe = true, fn;
}
function useCustomEvent(ref, emit) {
	return (name, evt, detail) => {
		if (ref.value) emit(name, normalizeCustomEvent(name, evt, ref.value, detail || {}));
	};
}
function normalizeCustomEvent(name, domEvt, el, detail) {
	let target;
	target = el;
	return {
		type: domEvt.__evName || detail.type || name,
		timeStamp: domEvt.timeStamp || 0,
		target,
		currentTarget: target,
		detail
	};
}
//#endregion
//#region ../uni-components/src/helpers/useHover.ts
var hoverProps = {
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
function useHover(props) {
	const hovering = ref(false);
	let hoverTouch = false;
	let hoverStartTimer;
	let hoverStayTimer;
	function hoverReset() {
		requestAnimationFrame(() => {
			clearTimeout(hoverStayTimer);
			hoverStayTimer = setTimeout(() => {
				hovering.value = false;
			}, parseInt(props.hoverStayTime));
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
		if (!props.hoverClass || props.hoverClass === "none" || props.disabled) return;
		if (props.hoverStopPropagation) evt._hoverPropagationStopped = true;
		hoverTouch = true;
		hoverStartTimer = setTimeout(() => {
			hovering.value = true;
			if (!hoverTouch) hoverReset();
		}, parseInt(props.hoverStartTime));
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
//#endregion
//#region ../uni-components/src/helpers/useBooleanAttr.ts
function useBooleanAttr(props, keys) {
	if (isString(keys)) keys = [keys];
	return keys.reduce((res, key) => {
		if (props[key]) res[key] = true;
		return res;
	}, Object.create(null));
}
//#endregion
//#region ../uni-components/src/helpers/UniElement.ts
var rpx2Unit = createRpx2Unit(defaultRpx2Unit.unit, defaultRpx2Unit.unitRatio, defaultRpx2Unit.unitPrecision);
function transformRpx(value) {
	if (/(-?(?:\d+\.)?\d+)[ur]px/gi.test(value)) return value.replace(/(-?(?:\d+\.)?\d+)[ur]px/gi, (text, num) => {
		return rpx2Unit(num + "rpx");
	});
	return value;
}
var UniElement = class extends HTMLElement {
	constructor() {
		super();
		this._props = {};
		this.__isUniElement = true;
	}
	attachVmProps(props) {
		this._props = props;
	}
	getAttribute(qualifiedName) {
		const name = camelize(qualifiedName);
		const attr = name in this._props ? this._props[name] + "" : super.getAttribute(qualifiedName);
		return attr === void 0 ? null : attr;
	}
	getPage() {
		var _this$__vnode;
		return ((_this$__vnode = this.__vnode) === null || _this$__vnode === void 0 || (_this$__vnode = _this$__vnode.ctx) === null || _this$__vnode === void 0 ? void 0 : _this$__vnode.page) || null;
	}
	get uniPage() {
		return this.getPage();
	}
	getBoundingClientRectAsync(callback) {
		if (callback) {
			const domRect = this.getBoundingClientRect();
			try {
				var _callback$success;
				(_callback$success = callback.success) === null || _callback$success === void 0 || _callback$success.call(callback, domRect);
			} catch (error) {
				console.error(error);
			}
			try {
				var _callback$complete;
				(_callback$complete = callback.complete) === null || _callback$complete === void 0 || _callback$complete.call(callback, domRect);
			} catch (error) {
				console.error(error);
			}
			return;
		}
		return new Promise((resolve, reject) => {
			resolve(this.getBoundingClientRect());
		});
	}
	get style() {
		const originalStyle = super.style;
		if (originalStyle.__patchRpx__) return originalStyle;
		originalStyle.__patchRpx__ = true;
		const originalSetProperty = originalStyle.setProperty.bind(originalStyle);
		super.style.setProperty = function(property, value, priority) {
			return originalSetProperty(property, value ? transformRpx(value + "") : value, priority || void 0);
		};
		return super.style;
	}
	get tagName() {
		return super.tagName.replace(/^UNI-/, "");
	}
	get nodeName() {
		return super.nodeName.replace(/^UNI-/, "");
	}
};
//#endregion
//#region ../uni-components/src/vue/form/index.tsx
var uniFormKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniForm" : "uf");
var UniFormElement = class extends UniElement {};
var form_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Form",
	emits: ["submit", "reset"],
	rootElement: {
		name: "uni-form",
		class: UniFormElement
	},
	setup(_props, { slots, emit }) {
		const rootRef = ref(null);
		provideForm(useCustomEvent(rootRef, emit));
		onMounted(() => {
			rootRef.value.attachVmProps(_props);
		});
		return () => createVNode("uni-form", { "ref": rootRef }, [createVNode("span", null, [slots.default && slots.default()])], 512);
	}
});
function provideForm(trigger) {
	const fields = [];
	provide(uniFormKey, {
		addField(field) {
			fields.push(field);
		},
		removeField(field) {
			fields.splice(fields.indexOf(field), 1);
		},
		submit(evt) {
			trigger("submit", evt, { value: fields.reduce((res, field) => {
				if (field.submit) {
					const [name, value] = field.submit();
					name && (res[name] = value);
				}
				return res;
			}, Object.create(null)) });
		},
		reset(evt) {
			fields.forEach((field) => field.reset && field.reset());
			trigger("reset", evt);
		}
	});
	return fields;
}
//#endregion
//#region ../uni-components/src/components/label.ts
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
//#region ../uni-components/src/vue/label/index.tsx
var UniLabelElement = class extends UniElement {};
var label_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Label",
	props: labelProps,
	rootElement: {
		name: "uni-label",
		class: UniLabelElement
	},
	setup(props, { slots }) {
		const rootRef = ref(null);
		const pageId = useCurrentPageId();
		const handlers = useProvideLabel();
		const pointer = computed(() => props.for || slots.default && slots.default.length);
		const _onClick = withWebEvent(($event) => {
			const EventTarget = $event.target;
			let stopPropagation = /^uni-(checkbox|radio|switch)-/.test(EventTarget.className);
			if (!stopPropagation) stopPropagation = /^uni-(checkbox|radio|switch|button)$|^(svg|path)$/i.test(EventTarget.tagName);
			if (stopPropagation) return;
			if (props.for) UniViewJSBridge.emit("uni-label-click-" + pageId + "-" + props.for, $event, true);
			else handlers.length && handlers[0]($event, true);
		});
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => createVNode("uni-label", {
			"ref": rootRef,
			"class": { "uni-label-pointer": pointer },
			"onClick": _onClick
		}, [slots.default && slots.default()], 10, ["onClick"]);
	}
});
//#endregion
//#region ../uni-components/src/helpers/useListeners.ts
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
//#region ../uni-components/src/components/button.ts
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
//#region ../uni-components/src/vue/button/index.tsx
var UniButtonElement = class extends UniElement {};
var button_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Button",
	props: buttonProps,
	rootElement: {
		name: "uni-button",
		class: UniButtonElement
	},
	setup(props, { slots }) {
		const rootRef = ref(null);
		const uniForm = inject(uniFormKey, false);
		const { hovering, binding } = useHover(props);
		const { t } = /*#__PURE__*/ useI18n();
		const onClick = withWebEvent((e, isLabelClick) => {
			if (props.disabled) return e.stopImmediatePropagation();
			if (isLabelClick) rootRef.value.click();
			const formType = props.formType;
			if (formType) {
				if (!uniForm) return;
				if (formType === "submit") uniForm.submit(e);
				else if (formType === "reset") uniForm.reset(e);
				return;
			}
		});
		const uniLabel = inject(uniLabelKey, false);
		if (uniLabel) {
			uniLabel.addHandler(onClick);
			onBeforeUnmount(() => {
				uniLabel.removeHandler(onClick);
			});
		}
		useListeners(props, { "label-click": onClick });
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			const hoverClass = props.hoverClass;
			const booleanAttrs = useBooleanAttr(props, "disabled");
			const loadingAttrs = useBooleanAttr(props, "loading");
			const plainAttrs = useBooleanAttr(props, "plain");
			const hasHoverClass = hoverClass && hoverClass !== "none";
			return createVNode("uni-button", mergeProps({
				"ref": rootRef,
				"onClick": onClick,
				"id": props.id,
				"class": hasHoverClass && hovering.value ? hoverClass : ""
			}, hasHoverClass && binding, booleanAttrs, loadingAttrs, plainAttrs), [slots.default && slots.default()], 16, ["onClick", "id"]);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/canvas/index-x.tsx
var props$30 = { disableScroll: {
	type: [Boolean, String],
	default: false
} };
var UniCanvasElement = class extends UniElement {
	get width() {
		return this.querySelector("canvas").width;
	}
	set width(value) {
		this.querySelector("canvas").width = value;
	}
	get height() {
		return this.querySelector("canvas").height;
	}
	set height(value) {
		this.querySelector("canvas").height = value;
	}
	getContext(contextId, options) {
		return this.querySelector("canvas").getContext(contextId, options);
	}
	toBlob(...args) {
		const c = this.querySelector("canvas");
		return c.toBlob.apply(c, args);
	}
	toDataURL(type, encoderOptions) {
		return this.querySelector("canvas").toDataURL(type, encoderOptions);
	}
};
var index_x_default = /*#__PURE__*/ defineBuiltInComponent({
	inheritAttrs: true,
	name: "Canvas",
	compatConfig: { MODE: 3 },
	props: props$30,
	rootElement: {
		name: "uni-canvas",
		class: UniCanvasElement
	},
	setup(props, {}) {
		const rootRef = ref(null);
		const canvas = ref(null);
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-canvas", { "ref": rootRef }, [createVNode("canvas", {
				"ref": canvas,
				"class": "uni-canvas-canvas"
			}, null, 512)], 512);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/checkbox-group/index.tsx
var uniCheckGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniCheckGroup" : "ucg");
var props$29 = { name: {
	type: String,
	default: ""
} };
var UniCheckboxGroupElement = class extends UniElement {};
var checkbox_group_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "CheckboxGroup",
	props: props$29,
	emits: ["change"],
	rootElement: {
		name: "uni-checkbox-group",
		class: UniCheckboxGroupElement
	},
	setup(props, { emit, slots }) {
		const rootRef = ref(null);
		useProvideCheckGroup(props, useCustomEvent(rootRef, emit));
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-checkbox-group", { "ref": rootRef }, [slots.default && slots.default()], 512);
		};
	}
});
function useProvideCheckGroup(props, trigger) {
	const fields = [];
	const getFieldsValue = () => fields.reduce((res, field) => {
		if (field.value.checkboxChecked) res.push(field.value.value + "");
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
			trigger("change", $event, { value: getFieldsValue() });
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
//#region ../uni-components/src/vue/checkbox/index.tsx
var props$28 = {
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
var UniCheckboxElement = class extends UniElement {};
var checkbox_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Checkbox",
	props: props$28,
	rootElement: {
		name: "uni-checkbox",
		class: UniCheckboxElement
	},
	setup(props, { slots }) {
		const rootRef = ref(null);
		const checkboxChecked = ref(props.checked);
		const checkboxCheckedBool = computed(() => {
			return checkboxChecked.value === "true" || checkboxChecked.value === true;
		});
		const checkboxValue = ref(props.value);
		const initialCheckedValue = props.checked;
		function getCheckBoxStyle(checked) {
			if (props.disabled) return {
				backgroundColor: "#E1E1E1",
				borderColor: "#D1D1D1"
			};
			const style = {};
			if (checked) {
				if (props.activeBorderColor) style.borderColor = props.activeBorderColor;
				if (props.activeBackgroundColor) style.backgroundColor = props.activeBackgroundColor;
			} else {
				if (props.borderColor) style.borderColor = props.borderColor;
				if (props.backgroundColor) style.backgroundColor = props.backgroundColor;
			}
			return style;
		}
		const checkboxStyle = computed(() => {
			return getCheckBoxStyle(checkboxCheckedBool.value);
		});
		watch([() => props.checked, () => props.value], ([newChecked, newModelValue]) => {
			checkboxChecked.value = newChecked;
			checkboxValue.value = newModelValue;
		});
		const reset = () => {
			checkboxChecked.value = initialCheckedValue;
		};
		const { uniCheckGroup, uniLabel } = useCheckboxInject(checkboxChecked, checkboxValue, reset);
		const _onClick = ($event) => {
			if (props.disabled) return;
			checkboxChecked.value = !checkboxChecked.value;
			uniCheckGroup && uniCheckGroup.checkboxChange($event);
			$event.stopPropagation();
		};
		if (!!uniLabel) {
			uniLabel.addHandler(_onClick);
			onBeforeUnmount(() => {
				uniLabel.removeHandler(_onClick);
			});
		}
		useListeners(props, { "label-click": _onClick });
		let checkedCache = ref(checkboxCheckedBool.value);
		watch(() => checkboxCheckedBool.value, (newChecked) => {
			checkedCache.value = newChecked;
		});
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.defineProperty(rootElement, "checked", {
				get() {
					return checkedCache.value;
				},
				set(val) {
					checkedCache.value = val;
					const style = getCheckBoxStyle(val);
					const checkboxInputElement = rootElement.querySelector(".uni-checkbox-input");
					for (const key in style) {
						const value = style[key];
						value && checkboxInputElement.style.setProperty(key, value);
					}
				}
			});
			rootElement.attachVmProps(props);
		});
		return () => {
			const booleanAttrs = useBooleanAttr(props, "disabled");
			let realCheckValue;
			realCheckValue = checkedCache.value;
			return createVNode("uni-checkbox", mergeProps(booleanAttrs, {
				"id": props.id,
				"onClick": _onClick,
				"ref": rootRef
			}), [createVNode("div", {
				"class": "uni-checkbox-wrapper",
				"style": { "--HOVER-BD-COLOR": props.activeBorderColor }
			}, [createVNode("div", {
				"class": ["uni-checkbox-input", { "uni-checkbox-input-disabled": props.disabled }],
				"style": checkboxStyle.value
			}, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props.disabled ? "#ADADAD" : props.foreColor || props.iconColor || props.color, 22) : ""], 6), slots.default && slots.default()], 4)], 16, ["id", "onClick"]);
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
//#region ../uni-components/src/helpers/useKeyboard.ts
var resetTimer;
/**
* 保证iOS点击输入框外隐藏键盘
*/
function iosHideKeyboard() {}
var props$27 = {
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
var emit$1 = ["keyboardheightchange"];
function useKeyboard$1(props, elRef, trigger) {
	function initKeyboard(el) {
		const isApple = computed(() => String(navigator.vendor).indexOf("Apple") === 0);
		el.addEventListener("focus", () => {
			clearTimeout(resetTimer);
			document.addEventListener("click", iosHideKeyboard, false);
		});
		const onKeyboardHide = () => {
			document.removeEventListener("click", iosHideKeyboard, false);
			if (isApple.value) document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop);
		};
		el.addEventListener("blur", () => {
			if (isApple.value) el.blur();
			onKeyboardHide();
		});
	}
	watch(() => elRef.value, (el) => el && initKeyboard(el));
}
//#endregion
//#region src/framework/setup/provide/page.ts
var pageMetaKey = PolySymbol(process.env.NODE_ENV !== "production" ? "UniPageMeta" : "upm");
function usePageMeta() {
	return inject(pageMetaKey);
}
function providePageMeta(id) {
	const pageMeta = initPageMeta(id);
	provide(pageMetaKey, pageMeta);
	return pageMeta;
}
function usePageRoute() {
	if (__UNI_FEATURE_PAGES__) return useRoute();
	const url = location.href;
	const searchPos = url.indexOf("?");
	const hashPos = url.indexOf("#", searchPos > -1 ? searchPos : 0);
	let query = {};
	if (searchPos > -1) query = parseQuery(url.slice(searchPos + 1, hashPos > -1 ? hashPos : url.length));
	const { meta } = __uniRoutes[0];
	const path = addLeadingSlash(meta.route);
	return {
		meta,
		query,
		path,
		matched: [{ path }]
	};
}
function initPageMeta(id) {
	if (__UNI_FEATURE_PAGES__) return reactive(normalizePageMeta(JSON.parse(JSON.stringify(initRouteMeta(useRoute().meta, id)))));
	return reactive(normalizePageMeta(JSON.parse(JSON.stringify(initRouteMeta(__uniRoutes[0].meta, id)))));
}
function normalizePageMeta(pageMeta) {
	if (__UNI_FEATURE_PULL_DOWN_REFRESH__) {
		const { enablePullDownRefresh, navigationBar } = pageMeta;
		{
			const pullToRefresh = normalizePullToRefreshRpx(extend({
				support: true,
				color: "#2BD009",
				style: "circle",
				height: 70,
				range: 150,
				offset: 0
			}, pageMeta.pullToRefresh));
			const { type, style } = navigationBar;
			if (style !== "custom" && type !== "transparent") pullToRefresh.offset += NAVBAR_HEIGHT + import_out.default.top;
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
	if (__UNI_FEATURE_PAGES__ && history.state) {
		const type = history.state.__type__;
		if ((type === "redirectTo" || type === "reLaunch") && getCurrentPages().length === 0) {
			pageMeta.isEntry = true;
			pageMeta.isQuit = true;
		}
	}
	return pageMeta;
}
//#endregion
//#region ../uni-api/src/helpers/base64-arraybuffer.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = /*#__PURE__*/ (function() {
	const lookup = /* @__PURE__ */ new Uint8Array(256);
	for (var i = 0; i < chars.length; i++) lookup[chars.charCodeAt(i)] = i;
	return lookup;
})();
function encode$1(arraybuffer) {
	var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
	for (i = 0; i < len; i += 3) {
		base64 += chars[bytes[i] >> 2];
		base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
		base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
		base64 += chars[bytes[i + 2] & 63];
	}
	if (len % 3 === 2) base64 = base64.substring(0, base64.length - 1) + "=";
	else if (len % 3 === 1) base64 = base64.substring(0, base64.length - 2) + "==";
	return base64;
}
function decode(base64) {
	var bufferLength = base64.length * .75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
	if (base64[base64.length - 1] === "=") {
		bufferLength--;
		if (base64[base64.length - 2] === "=") bufferLength--;
	}
	var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
	for (i = 0; i < len; i += 4) {
		encoded1 = lookup[base64.charCodeAt(i)];
		encoded2 = lookup[base64.charCodeAt(i + 1)];
		encoded3 = lookup[base64.charCodeAt(i + 2)];
		encoded4 = lookup[base64.charCodeAt(i + 3)];
		bytes[p++] = encoded1 << 2 | encoded2 >> 4;
		bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
		bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
	}
	return arraybuffer;
}
//#endregion
//#region ../uni-api/src/helpers/protocol.ts
var CHOOSE_SIZE_TYPES = ["original", "compressed"];
var CHOOSE_SOURCE_TYPES = ["album", "camera"];
var HTTP_METHODS = [
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
function elemsInArray(strArr, optionalVal) {
	if (!isArray(strArr) || strArr.length === 0 || strArr.find((val) => optionalVal.indexOf(val) === -1)) return optionalVal;
	return strArr;
}
function validateProtocolFail(name, msg) {
	console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
	if (!onFail) onFail = validateProtocolFail;
	for (const key in protocol) {
		const errMsg = validateProp(key, data[key], protocol[key], !hasOwn(data, key));
		if (isString(errMsg)) onFail(name, errMsg);
	}
}
function validateProtocols(name, args, protocol, onFail) {
	if (!protocol) return;
	if (!isArray(protocol)) return validateProtocol(name, args[0] || Object.create(null), protocol, onFail);
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
	if (!isPlainObject(prop)) prop = { type: prop };
	const { type, required, validator } = prop;
	if (required && isAbsent) return "Missing required args: \"" + name + "\"";
	if (value == null && !required) return;
	if (type != null) {
		let isValid = false;
		const types = isArray(type) ? type : [type];
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
var isSimpleType = /*#__PURE__*/ makeMap("String,Number,Boolean,Function,Symbol");
function assertType(value, type) {
	let valid;
	const expectedType = getType(type);
	if (isSimpleType(expectedType)) {
		const t = typeof value;
		valid = t === expectedType.toLowerCase();
		if (!valid && t === "object") valid = value instanceof type;
	} else if (expectedType === "Object") valid = isObject(value);
	else if (expectedType === "Array") valid = isArray(value);
	else valid = value instanceof type;
	return {
		valid,
		expectedType
	};
}
function getInvalidTypeMessage(name, value, expectedTypes) {
	let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
	const expectedType = expectedTypes[0];
	const receivedType = toRawType(value);
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
//#endregion
//#region ../uni-api/src/helpers/api/catch.ts
function tryCatch(fn) {
	return function() {
		try {
			return fn.apply(fn, arguments);
		} catch (e) {
			console.error(e);
		}
	};
}
//#endregion
//#region ../uni-api/src/helpers/api/callback.ts
var invokeCallbackId = 1;
var invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
	invokeCallbacks[id] = {
		name,
		keepAlive,
		callback
	};
	return id;
}
function invokeCallback(id, res, extras) {
	if (typeof id === "number") {
		const opts = invokeCallbacks[id];
		if (opts) {
			if (!opts.keepAlive) delete invokeCallbacks[id];
			return opts.callback(res, extras);
		}
	}
	return res;
}
function findInvokeCallbackByName(name) {
	for (const key in invokeCallbacks) if (invokeCallbacks[key].name === name) return true;
	return false;
}
function removeKeepAliveApiCallback(name, callback) {
	for (const key in invokeCallbacks) {
		const item = invokeCallbacks[key];
		if (item.callback === callback && item.name === name) delete invokeCallbacks[key];
	}
}
function offKeepAliveApiCallback(name) {
	UniServiceJSBridge.off("api." + name);
}
function onKeepAliveApiCallback(name) {
	UniServiceJSBridge.on("api." + name, (res) => {
		for (const key in invokeCallbacks) {
			const opts = invokeCallbacks[key];
			if (opts.name === name) opts.callback(res);
		}
	});
}
function createKeepAliveApiCallback(name, callback) {
	return addInvokeCallback(invokeCallbackId++, name, callback, true);
}
function getApiCallbacks(args) {
	const apiCallbacks = {};
	for (const name in args) {
		const fn = args[name];
		if (isFunction(fn)) {
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
	if (!isPlainObject(args)) args = {};
	const { success, fail, complete } = getApiCallbacks(args);
	const hasSuccess = isFunction(success);
	const hasFail = isFunction(fail);
	const hasComplete = isFunction(complete);
	const callbackId = invokeCallbackId++;
	addInvokeCallback(callbackId, name, (res) => {
		res = res || {};
		res.errMsg = normalizeErrMsg(res.errMsg, name);
		isFunction(beforeAll) && beforeAll(res);
		if (res.errMsg === name + ":ok") {
			isFunction(beforeSuccess) && beforeSuccess(res, args);
			hasSuccess && success(res);
		} else hasFail && fail(res);
		hasComplete && complete(res);
	});
	return callbackId;
}
//#endregion
//#region ../uni-api/src/helpers/interceptor.ts
var HOOK_SUCCESS = "success";
var HOOK_FAIL = "fail";
var HOOK_COMPLETE = "complete";
var globalInterceptors = {};
var scopedInterceptors = {};
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
			if (isPromise(res)) promise = Promise.resolve(res);
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
		if (!isArray(hooks)) return;
		const oldCallback = options[name];
		options[name] = function callbackInterceptor(res) {
			queue(hooks, res, options).then((res) => {
				return isFunction(oldCallback) && oldCallback(res) || res;
			});
		};
	});
	return options;
}
function wrapperReturnValue(method, returnValue) {
	const returnValueHooks = [];
	if (isArray(globalInterceptors.returnValue)) returnValueHooks.push(...globalInterceptors.returnValue);
	const interceptor = scopedInterceptors[method];
	if (interceptor && isArray(interceptor.returnValue)) returnValueHooks.push(...interceptor.returnValue);
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
	if (interceptor && Object.keys(interceptor).length) if (isArray(interceptor.invoke)) return queue(interceptor.invoke, options).then((options) => {
		return api(wrapperOptions(getApiInterceptorHooks(method), options), ...params);
	});
	else return api(wrapperOptions(interceptor, options), ...params);
	return api(options, ...params);
}
//#endregion
//#region ../uni-api/src/helpers/api/promise.ts
function hasCallback(args) {
	if (isPlainObject(args) && [
		"success",
		"fail",
		"complete"
	].find((cb) => isFunction(args[cb]))) return true;
	return false;
}
function handlePromise(promise) {
	return promise;
}
function promisify(name, fn) {
	return (args = {}, ...rest) => {
		if (hasCallback(args)) return wrapperReturnValue(name, invokeApi(name, fn, extend({}, args), rest));
		return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
			invokeApi(name, fn, extend({}, args, {
				success: resolve,
				fail: reject
			}), rest);
		})));
	};
}
//#endregion
//#region ../uni-api/src/helpers/api/index.ts
function formatApiArgs(args, options) {
	const params = args[0];
	if (!options || !options.formatArgs || !isPlainObject(options.formatArgs) && isPlainObject(params)) return;
	const formatArgs = options.formatArgs;
	const keys = Object.keys(formatArgs);
	for (let i = 0; i < keys.length; i++) {
		const name = keys[i];
		const formatterOrDefaultValue = formatArgs[name];
		if (isFunction(formatterOrDefaultValue)) {
			const errMsg = formatterOrDefaultValue(args[0][name], params);
			if (isString(errMsg)) return errMsg;
		} else if (!hasOwn(params, name)) params[name] = formatterOrDefaultValue;
	}
}
function invokeSuccess(id, name, res) {
	const result = { errMsg: name + ":ok" };
	result.errSubject = name;
	return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
	const errMsgPrefix = name + ":fail";
	let apiErrMsg = "";
	if (!errMsg) apiErrMsg = errMsgPrefix;
	else if (errMsg.indexOf(errMsgPrefix) === 0) apiErrMsg = errMsg;
	else apiErrMsg = errMsgPrefix + " " + errMsg;
	let res = extend({ errMsg: apiErrMsg }, errRes);
	if (typeof UniError !== "undefined") res = typeof errRes.errCode !== "undefined" ? new UniError(name, errRes.errCode, apiErrMsg) : new UniError(apiErrMsg, errRes);
	return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
	if (process.env.NODE_ENV !== "production") validateProtocols(name, args, protocol);
	if (options && options.beforeInvoke) {
		const errMsg = options.beforeInvoke(args);
		if (isString(errMsg)) return errMsg;
	}
	const errMsg = formatApiArgs(args, options);
	if (errMsg) return errMsg;
}
function checkCallback(callback) {
	if (!isFunction(callback)) throw new Error("Invalid args: type check failed for args \"callback\". Expected Function");
}
function wrapperOnApi(name, fn, options) {
	return (callback) => {
		checkCallback(callback);
		const errMsg = beforeInvokeApi(name, [callback], void 0, options);
		if (errMsg) throw new Error(errMsg);
		const isFirstInvokeOnApi = !findInvokeCallbackByName(name);
		createKeepAliveApiCallback(name, callback);
		if (isFirstInvokeOnApi) {
			onKeepAliveApiCallback(name);
			fn();
		}
	};
}
function wrapperOffApi(name, fn, options) {
	return (callback) => {
		checkCallback(callback);
		const errMsg = beforeInvokeApi(name, [callback], void 0, options);
		if (errMsg) throw new Error(errMsg);
		name = name.replace("off", "on");
		removeKeepAliveApiCallback(name, callback);
		if (!findInvokeCallbackByName(name)) {
			offKeepAliveApiCallback(name);
			fn();
		}
	};
}
function parseErrMsg(errMsg) {
	if (!errMsg || isString(errMsg)) return errMsg;
	if (errMsg.stack) return errMsg.message;
	return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
	return (args) => {
		const id = createAsyncApiCallback(name, args, options);
		const errMsg = beforeInvokeApi(name, [args], protocol, options);
		if (errMsg) return invokeFail(id, name, errMsg);
		return fn(args, {
			resolve: (res) => invokeSuccess(id, name, res),
			reject: (errMsg, errRes) => invokeFail(id, name, parseErrMsg(errMsg), errRes)
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
function defineOnApi(name, fn, options) {
	return wrapperOnApi(name, fn, options);
}
function defineOffApi(name, fn, options) {
	return wrapperOffApi(name, fn, options);
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
function createUnsupportedMsg(name) {
	return `method 'uni.${name}' not supported`;
}
function createUnsupportedSyncApi(name) {
	return () => {
		console.error(createUnsupportedMsg(name));
	};
}
var createUnsupportedOnApi = createUnsupportedSyncApi;
function createUnsupportedAsyncApi(name) {
	return (_args, { reject }) => {
		return reject(createUnsupportedMsg(name));
	};
}
//#endregion
//#region ../uni-api/src/protocols/base/base64.ts
var API_BASE64_TO_ARRAY_BUFFER = "base64ToArrayBuffer";
var Base64ToArrayBufferProtocol = [{
	name: "base64",
	type: String,
	required: true
}];
var API_ARRAY_BUFFER_TO_BASE64 = "arrayBufferToBase64";
var ArrayBufferToBase64Protocol = [{
	name: "arrayBuffer",
	type: [ArrayBuffer, Uint8Array],
	required: true
}];
//#endregion
//#region ../uni-api/src/service/base/base64.ts
var base64ToArrayBuffer = /*#__PURE__*/ defineSyncApi(API_BASE64_TO_ARRAY_BUFFER, (base64) => {
	return decode(base64);
}, Base64ToArrayBufferProtocol);
var arrayBufferToBase64 = /*#__PURE__*/ defineSyncApi(API_ARRAY_BUFFER_TO_BASE64, (arrayBuffer) => {
	return encode$1(arrayBuffer);
}, ArrayBufferToBase64Protocol);
//#endregion
//#region ../uni-api/src/protocols/base/upx2px.ts
var API_UPX2PX = "upx2px";
var Upx2pxProtocol = [{
	name: "upx",
	type: [Number, String],
	required: true
}];
//#endregion
//#region ../uni-api/src/service/base/upx2px.ts
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS$1 = false;
var deviceWidth = 0;
var deviceDPR = 0;
var maxWidth = 960;
var baseWidth = 375;
var includeWidth = 750;
function checkDeviceWidth() {
	let windowWidth, pixelRatio, platform;
	{
		const { windowWidth: w, pixelRatio: p, platform: pf } = getBaseSystemInfo();
		windowWidth = w;
		pixelRatio = p;
		platform = pf;
	}
	deviceWidth = windowWidth;
	deviceDPR = pixelRatio;
	isIOS$1 = platform === "ios";
}
function checkValue(value, defaultValue) {
	const newValue = Number(value);
	return isNaN(newValue) ? defaultValue : newValue;
}
function checkMaxWidth() {
	const config = __uniConfig.globalStyle || {};
	maxWidth = checkValue(config.rpxCalcMaxDeviceWidth, 960);
	baseWidth = checkValue(config.rpxCalcBaseDeviceWidth, 375);
	includeWidth = checkValue(config.rpxCalcBaseDeviceWidth, 750);
}
var upx2px = /*#__PURE__*/ defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
	if (deviceWidth === 0) {
		checkDeviceWidth();
		checkMaxWidth();
	}
	number = Number(number);
	if (number === 0) return 0;
	let width = newDeviceWidth || deviceWidth;
	width = number === includeWidth || width <= maxWidth ? width : baseWidth;
	let result = number / BASE_DEVICE_WIDTH * width;
	if (result < 0) result = -result;
	result = Math.floor(result + EPS);
	if (result === 0) if (deviceDPR === 1 || !isIOS$1) result = 1;
	else result = .5;
	return number < 0 ? -result : result;
}, Upx2pxProtocol);
//#endregion
//#region ../uni-api/src/protocols/base/interceptor.ts
var API_ADD_INTERCEPTOR = "addInterceptor";
var API_REMOVE_INTERCEPTOR = "removeInterceptor";
var AddInterceptorProtocol = [{
	name: "method",
	type: [String, Object],
	required: true
}];
var RemoveInterceptorProtocol = AddInterceptorProtocol;
//#endregion
//#region ../uni-api/src/service/base/interceptor.ts
function mergeInterceptorHook(interceptors, interceptor) {
	Object.keys(interceptor).forEach((hook) => {
		if (isFunction(interceptor[hook])) interceptors[hook] = mergeHook(interceptors[hook], interceptor[hook]);
	});
}
function removeInterceptorHook(interceptors, interceptor) {
	if (!interceptors || !interceptor) return;
	Object.keys(interceptor).forEach((name) => {
		const hooks = interceptors[name];
		const hook = interceptor[name];
		if (isArray(hooks) && isFunction(hook)) remove(hooks, hook);
	});
}
function mergeHook(parentVal, childVal) {
	const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
	const res = [];
	for (let i = 0; i < hooks.length; i++) if (res.indexOf(hooks[i]) === -1) res.push(hooks[i]);
	return res;
}
var addInterceptor = /*#__PURE__*/ defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
	if (isString(method) && isPlainObject(interceptor)) mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
	else if (isPlainObject(method)) mergeInterceptorHook(globalInterceptors, method);
}, AddInterceptorProtocol);
var removeInterceptor = /*#__PURE__*/ defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
	if (isString(method)) if (isPlainObject(interceptor)) removeInterceptorHook(scopedInterceptors[method], interceptor);
	else delete scopedInterceptors[method];
	else if (isPlainObject(method)) removeInterceptorHook(globalInterceptors, method);
}, RemoveInterceptorProtocol);
var interceptors = {};
//#endregion
//#region ../uni-api/src/protocols/base/eventBus.ts
var OnProtocol = [{
	name: "event",
	type: String,
	required: true
}, {
	name: "callback",
	type: Function,
	required: true
}];
var API_ONCE = "$once";
var OnceProtocol = OnProtocol;
var API_OFF = "$off";
var OffProtocol = [{
	name: "event",
	type: [String, Array]
}, {
	name: "callback",
	type: [Function, Number]
}];
var API_EMIT = "$emit";
var EmitProtocol = [{
	name: "event",
	type: String,
	required: true
}];
//#endregion
//#region ../uni-api/src/service/base/eventBus.ts
var EventBus = class {
	constructor() {
		this.$emitter = new Emitter();
	}
	on(name, callback) {
		return this.$emitter.on(name, callback);
	}
	once(name, callback) {
		return this.$emitter.once(name, callback);
	}
	off(name, callback) {
		if (!name) {
			this.$emitter.e = {};
			return;
		}
		this.$emitter.off(name, callback);
	}
	emit(name, ...args) {
		this.$emitter.emit(name, ...args);
	}
};
var eventBus = new EventBus();
var $on = /*#__PURE__*/ defineSyncApi("$on", (name, callback) => {
	return eventBus.on(name, callback);
}, OnProtocol);
var $once = /*#__PURE__*/ defineSyncApi(API_ONCE, (name, callback) => {
	return eventBus.once(name, callback);
}, OnceProtocol);
var $off = /*#__PURE__*/ defineSyncApi(API_OFF, (name, callback) => {
	if (!isArray(name)) name = name ? [name] : [];
	name.forEach((n) => {
		eventBus.off(n, callback);
	});
}, OffProtocol);
var $emit = /*#__PURE__*/ defineSyncApi(API_EMIT, (name, ...args) => {
	eventBus.emit(name, ...args);
}, EmitProtocol);
//#endregion
//#region ../uni-api/src/service/base/__f__.ts
function __f__(type, filename, ...args) {
	if (filename) args.push(filename);
	console[type].apply(console, args);
}
//#endregion
//#region ../uni-api/src/protocols/context/context.ts
var validator = [{
	name: "id",
	type: String,
	required: true
}];
var API_CREATE_VIDEO_CONTEXT = "createVideoContext";
var API_CREATE_MAP_CONTEXT = "createMapContext";
var CreateMapContextProtocol = validator;
var API_CREATE_CANVAS_CONTEXT = "createCanvasContext";
var CreateCanvasContextProtocol = [{
	name: "canvasId",
	type: String,
	required: true
}, {
	name: "componentInstance",
	type: Object
}];
var API_CREATE_INNER_AUDIO_CONTEXT = "createInnerAudioContext";
validator.concat({
	name: "componentInstance",
	type: Object
});
//#endregion
//#region ../uni-api/src/service/context/createVideoContext.ts
var RATES = [
	.5,
	.8,
	1,
	1.25,
	1.5,
	2
];
var VideoContext = class {
	constructor(id, pageId) {
		this.id = id;
		this.pageId = pageId;
	}
	play() {
		operateVideoPlayer(this.id, this.pageId, "play");
	}
	pause() {
		operateVideoPlayer(this.id, this.pageId, "pause");
	}
	stop() {
		operateVideoPlayer(this.id, this.pageId, "stop");
	}
	seek(position) {
		operateVideoPlayer(this.id, this.pageId, "seek", { position });
	}
	sendDanmu(args) {
		operateVideoPlayer(this.id, this.pageId, "sendDanmu", args);
	}
	playbackRate(rate) {
		if (!~RATES.indexOf(rate)) rate = 1;
		operateVideoPlayer(this.id, this.pageId, "playbackRate", { rate });
	}
	requestFullScreen(args = {}) {
		operateVideoPlayer(this.id, this.pageId, "requestFullScreen", args);
	}
	exitFullScreen() {
		operateVideoPlayer(this.id, this.pageId, "exitFullScreen");
	}
	showStatusBar() {
		operateVideoPlayer(this.id, this.pageId, "showStatusBar");
	}
	hideStatusBar() {
		operateVideoPlayer(this.id, this.pageId, "hideStatusBar");
	}
};
var createVideoContext = /*#__PURE__*/ defineSyncApi(API_CREATE_VIDEO_CONTEXT, (id, context) => {
	if (context) return new VideoContext(id, getPageIdByVm(context));
	return new VideoContext(id, getPageIdByVm(getCurrentPageVm()));
});
//#endregion
//#region ../uni-api/src/service/context/createMapContext.ts
var operateMapCallback = (options, res) => {
	const errMsg = res.errMsg || "";
	if ((/* @__PURE__ */ new RegExp("\\:\\s*fail")).test(errMsg)) options.fail && options.fail(res);
	else options.success && options.success(res);
	options.complete && options.complete(res);
};
var operateMapWrap = (id, pageId, type, options) => {
	operateMap(id, pageId, type, options, (res) => {
		options && operateMapCallback(options, res);
	});
};
var MapContext = class {
	constructor(id, pageId) {
		this.id = id;
		this.pageId = pageId;
	}
	getCenterLocation(options) {
		operateMapWrap(this.id, this.pageId, "getCenterLocation", options);
	}
	moveToLocation(options) {
		operateMapWrap(this.id, this.pageId, "moveToLocation", options);
	}
	getScale(options) {
		operateMapWrap(this.id, this.pageId, "getScale", options);
	}
	getRegion(options) {
		operateMapWrap(this.id, this.pageId, "getRegion", options);
	}
	includePoints(options) {
		operateMapWrap(this.id, this.pageId, "includePoints", options);
	}
	translateMarker(options) {
		operateMapWrap(this.id, this.pageId, "translateMarker", options);
	}
	$getAppMap() {}
	addCustomLayer(options) {
		operateMapWrap(this.id, this.pageId, "addCustomLayer", options);
	}
	removeCustomLayer(options) {
		operateMapWrap(this.id, this.pageId, "removeCustomLayer", options);
	}
	addGroundOverlay(options) {
		operateMapWrap(this.id, this.pageId, "addGroundOverlay", options);
	}
	removeGroundOverlay(options) {
		operateMapWrap(this.id, this.pageId, "removeGroundOverlay", options);
	}
	updateGroundOverlay(options) {
		operateMapWrap(this.id, this.pageId, "updateGroundOverlay", options);
	}
	initMarkerCluster(options) {
		operateMapWrap(this.id, this.pageId, "initMarkerCluster", options);
	}
	addMarkers(options) {
		operateMapWrap(this.id, this.pageId, "addMarkers", options);
	}
	removeMarkers(options) {
		operateMapWrap(this.id, this.pageId, "removeMarkers", options);
	}
	moveAlong(options) {
		operateMapWrap(this.id, this.pageId, "moveAlong", options);
	}
	setLocMarkerIcon(options) {
		operateMapWrap(this.id, this.pageId, "setLocMarkerIcon", options);
	}
	openMapApp(options) {
		operateMapWrap(this.id, this.pageId, "openMapApp", options);
	}
	on(name, callback) {
		operateMapWrap(this.id, this.pageId, "on", {
			name,
			callback
		});
	}
};
var createMapContext = /*#__PURE__*/ defineSyncApi(API_CREATE_MAP_CONTEXT, (id, context) => {
	if (context) return new MapContext(id, getPageIdByVm(context));
	return new MapContext(id, getPageIdByVm(getCurrentPageVm()));
}, CreateMapContextProtocol);
//#endregion
//#region ../uni-api/src/protocols/context/canvas.ts
function getInt(name, defaultValue) {
	return function(value, params) {
		if (value) params[name] = Math.round(value);
		else if (typeof defaultValue !== "undefined") params[name] = defaultValue;
	};
}
var formatWidth = getInt("width");
var formatHeight = getInt("height");
var API_CANVAS_GET_IMAGE_DATA = "canvasGetImageData";
var CanvasGetImageDataOptions = { formatArgs: {
	x: getInt("x"),
	y: getInt("y"),
	width: formatWidth,
	height: formatHeight
} };
var CanvasGetImageDataProtocol = {
	canvasId: {
		type: String,
		required: true
	},
	x: {
		type: Number,
		required: true
	},
	y: {
		type: Number,
		required: true
	},
	width: {
		type: Number,
		required: true
	},
	height: {
		type: Number,
		required: true
	}
};
var API_CANVAS_PUT_IMAGE_DATA = "canvasPutImageData";
var CanvasPutImageDataOptions = CanvasGetImageDataOptions;
var CanvasPutImageDataProtocol = /*#__PURE__*/ extend({ data: {
	type: Uint8ClampedArray,
	required: true
} }, CanvasGetImageDataProtocol, { height: { type: Number } });
var fileTypes = {
	PNG: "png",
	JPG: "jpg",
	JPEG: "jpg"
};
var API_CANVAS_TO_TEMP_FILE_PATH = "canvasToTempFilePath";
var CanvasToTempFilePathOptions = { formatArgs: {
	x: getInt("x", 0),
	y: getInt("y", 0),
	width: formatWidth,
	height: formatHeight,
	destWidth: getInt("destWidth"),
	destHeight: getInt("destHeight"),
	fileType(value, params) {
		value = (value || "").toUpperCase();
		let type = fileTypes[value];
		if (!type) type = fileTypes.PNG;
		params.fileType = type;
	},
	quality(value, params) {
		params.quality = value && value > 0 && value < 1 ? value : 1;
	}
} };
var CanvasToTempFilePathProtocol = {
	x: Number,
	y: Number,
	width: Number,
	height: Number,
	destWidth: Number,
	destHeight: Number,
	canvasId: {
		type: String,
		required: true
	},
	fileType: String,
	quality: Number
};
//#endregion
//#region ../uni-api/src/service/context/canvas.ts
function operateCanvas(canvasId, pageId, type, data, callback) {
	UniServiceJSBridge.invokeViewMethod(`canvas.${canvasId}`, {
		type,
		data
	}, pageId, (data) => {
		if (callback) callback(data);
	});
}
var methods1 = [
	"scale",
	"rotate",
	"translate",
	"setTransform",
	"transform"
];
var methods2 = [
	"drawImage",
	"fillText",
	"fill",
	"stroke",
	"fillRect",
	"strokeRect",
	"clearRect",
	"strokeText"
];
var methods3 = [
	"setFillStyle",
	"setTextAlign",
	"setStrokeStyle",
	"setGlobalAlpha",
	"setShadow",
	"setFontSize",
	"setLineCap",
	"setLineJoin",
	"setLineWidth",
	"setMiterLimit",
	"setTextBaseline",
	"setLineDash"
];
function measureText(text, font) {
	const c2d = document.createElement("canvas").getContext("2d");
	c2d.font = font;
	return c2d.measureText(text).width || 0;
}
var predefinedColor = {
	aliceblue: "#f0f8ff",
	antiquewhite: "#faebd7",
	aqua: "#00ffff",
	aquamarine: "#7fffd4",
	azure: "#f0ffff",
	beige: "#f5f5dc",
	bisque: "#ffe4c4",
	black: "#000000",
	blanchedalmond: "#ffebcd",
	blue: "#0000ff",
	blueviolet: "#8a2be2",
	brown: "#a52a2a",
	burlywood: "#deb887",
	cadetblue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerblue: "#6495ed",
	cornsilk: "#fff8dc",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkblue: "#00008b",
	darkcyan: "#008b8b",
	darkgoldenrod: "#b8860b",
	darkgray: "#a9a9a9",
	darkgrey: "#a9a9a9",
	darkgreen: "#006400",
	darkkhaki: "#bdb76b",
	darkmagenta: "#8b008b",
	darkolivegreen: "#556b2f",
	darkorange: "#ff8c00",
	darkorchid: "#9932cc",
	darkred: "#8b0000",
	darksalmon: "#e9967a",
	darkseagreen: "#8fbc8f",
	darkslateblue: "#483d8b",
	darkslategray: "#2f4f4f",
	darkslategrey: "#2f4f4f",
	darkturquoise: "#00ced1",
	darkviolet: "#9400d3",
	deeppink: "#ff1493",
	deepskyblue: "#00bfff",
	dimgray: "#696969",
	dimgrey: "#696969",
	dodgerblue: "#1e90ff",
	firebrick: "#b22222",
	floralwhite: "#fffaf0",
	forestgreen: "#228b22",
	fuchsia: "#ff00ff",
	gainsboro: "#dcdcdc",
	ghostwhite: "#f8f8ff",
	gold: "#ffd700",
	goldenrod: "#daa520",
	gray: "#808080",
	grey: "#808080",
	green: "#008000",
	greenyellow: "#adff2f",
	honeydew: "#f0fff0",
	hotpink: "#ff69b4",
	indianred: "#cd5c5c",
	indigo: "#4b0082",
	ivory: "#fffff0",
	khaki: "#f0e68c",
	lavender: "#e6e6fa",
	lavenderblush: "#fff0f5",
	lawngreen: "#7cfc00",
	lemonchiffon: "#fffacd",
	lightblue: "#add8e6",
	lightcoral: "#f08080",
	lightcyan: "#e0ffff",
	lightgoldenrodyellow: "#fafad2",
	lightgray: "#d3d3d3",
	lightgrey: "#d3d3d3",
	lightgreen: "#90ee90",
	lightpink: "#ffb6c1",
	lightsalmon: "#ffa07a",
	lightseagreen: "#20b2aa",
	lightskyblue: "#87cefa",
	lightslategray: "#778899",
	lightslategrey: "#778899",
	lightsteelblue: "#b0c4de",
	lightyellow: "#ffffe0",
	lime: "#00ff00",
	limegreen: "#32cd32",
	linen: "#faf0e6",
	magenta: "#ff00ff",
	maroon: "#800000",
	mediumaquamarine: "#66cdaa",
	mediumblue: "#0000cd",
	mediumorchid: "#ba55d3",
	mediumpurple: "#9370db",
	mediumseagreen: "#3cb371",
	mediumslateblue: "#7b68ee",
	mediumspringgreen: "#00fa9a",
	mediumturquoise: "#48d1cc",
	mediumvioletred: "#c71585",
	midnightblue: "#191970",
	mintcream: "#f5fffa",
	mistyrose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajowhite: "#ffdead",
	navy: "#000080",
	oldlace: "#fdf5e6",
	olive: "#808000",
	olivedrab: "#6b8e23",
	orange: "#ffa500",
	orangered: "#ff4500",
	orchid: "#da70d6",
	palegoldenrod: "#eee8aa",
	palegreen: "#98fb98",
	paleturquoise: "#afeeee",
	palevioletred: "#db7093",
	papayawhip: "#ffefd5",
	peachpuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	powderblue: "#b0e0e6",
	purple: "#800080",
	rebeccapurple: "#663399",
	red: "#ff0000",
	rosybrown: "#bc8f8f",
	royalblue: "#4169e1",
	saddlebrown: "#8b4513",
	salmon: "#fa8072",
	sandybrown: "#f4a460",
	seagreen: "#2e8b57",
	seashell: "#fff5ee",
	sienna: "#a0522d",
	silver: "#c0c0c0",
	skyblue: "#87ceeb",
	slateblue: "#6a5acd",
	slategray: "#708090",
	slategrey: "#708090",
	snow: "#fffafa",
	springgreen: "#00ff7f",
	steelblue: "#4682b4",
	tan: "#d2b48c",
	teal: "#008080",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	wheat: "#f5deb3",
	white: "#ffffff",
	whitesmoke: "#f5f5f5",
	yellow: "#ffff00",
	yellowgreen: "#9acd32",
	transparent: "#00000000"
};
function checkColor(e) {
	e = e || "#000000";
	let t = null;
	if ((t = /^#([0-9|A-F|a-f]{6})$/.exec(e)) != null) return [
		parseInt(t[1].slice(0, 2), 16),
		parseInt(t[1].slice(2, 4), 16),
		parseInt(t[1].slice(4), 16),
		255
	];
	if ((t = /^#([0-9|A-F|a-f]{3})$/.exec(e)) != null) {
		let n = t[1].slice(0, 1);
		let o = t[1].slice(1, 2);
		let r = t[1].slice(2, 3);
		n = parseInt(n + n, 16);
		o = parseInt(o + o, 16);
		r = parseInt(r + r, 16);
		return [
			n,
			o,
			r,
			255
		];
	}
	if ((t = /^rgb\((.+)\)$/.exec(e)) != null) return t[1].split(",").map(function(e) {
		return Math.min(255, parseInt(e.trim()));
	}).concat(255);
	if ((t = /^rgba\((.+)\)$/.exec(e)) != null) return t[1].split(",").map(function(e, t) {
		return t === 3 ? Math.floor(255 * parseFloat(e.trim())) : Math.min(255, parseInt(e.trim()));
	});
	var i = e.toLowerCase();
	if (hasOwn(predefinedColor, i)) {
		t = /^#([0-9|A-F|a-f]{6,8})$/.exec(predefinedColor[i]);
		const n = parseInt(t[1].slice(0, 2), 16);
		const o = parseInt(t[1].slice(2, 4), 16);
		const r = parseInt(t[1].slice(4, 6), 16);
		let a = parseInt(t[1].slice(6, 8), 16);
		a = a >= 0 ? a : 255;
		return [
			n,
			o,
			r,
			a
		];
	}
	console.error("unsupported color:" + e);
	return [
		0,
		0,
		0,
		255
	];
}
var CanvasGradient = class {
	constructor(type, data) {
		this.type = type;
		this.data = data;
		this.colorStop = [];
	}
	addColorStop(position, color) {
		this.colorStop.push([position, checkColor(color)]);
	}
};
var Pattern = class {
	constructor(image, repetition) {
		this.type = "pattern";
		this.data = image;
		this.colorStop = repetition;
	}
};
var TextMetrics = class {
	constructor(width) {
		this.width = width;
	}
};
var getTempPath = () => {
	return "";
};
var CanvasContext = class {
	constructor(id, pageId) {
		this.id = id;
		this.pageId = pageId;
		this.actions = [];
		this.path = [];
		this.subpath = [];
		this.drawingState = [];
		this.state = {
			lineDash: [0, 0],
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowBlur: 0,
			shadowColor: [
				0,
				0,
				0,
				0
			],
			font: "10px sans-serif",
			fontSize: 10,
			fontWeight: "normal",
			fontStyle: "normal",
			fontFamily: "sans-serif"
		};
	}
	setFillStyle(color) {
		console.log("initCanvasContextProperty implemented.");
	}
	setStrokeStyle(color) {
		console.log("initCanvasContextProperty implemented.");
	}
	setShadow(offsetX, offsetY, blur, color) {
		console.log("initCanvasContextProperty implemented.");
	}
	addColorStop(stop, color) {
		console.log("initCanvasContextProperty implemented.");
	}
	setLineWidth(lineWidth) {
		console.log("initCanvasContextProperty implemented.");
	}
	setLineCap(lineCap) {
		console.log("initCanvasContextProperty implemented.");
	}
	setLineJoin(lineJoin) {
		console.log("initCanvasContextProperty implemented.");
	}
	setLineDash(pattern, offset) {
		console.log("initCanvasContextProperty implemented.");
	}
	setMiterLimit(miterLimit) {
		console.log("initCanvasContextProperty implemented.");
	}
	fillRect(x, y, width, height) {
		console.log("initCanvasContextProperty implemented.");
	}
	strokeRect(x, y, width, height) {
		console.log("initCanvasContextProperty implemented.");
	}
	clearRect(x, y, width, height) {
		console.log("initCanvasContextProperty implemented.");
	}
	fill() {
		console.log("initCanvasContextProperty implemented.");
	}
	stroke() {
		console.log("initCanvasContextProperty implemented.");
	}
	scale(scaleWidth, scaleHeight) {
		console.log("initCanvasContextProperty implemented.");
	}
	rotate(rotate) {
		console.log("initCanvasContextProperty implemented.");
	}
	translate(x, y) {
		console.log("initCanvasContextProperty implemented.");
	}
	setFontSize(fontSize) {
		console.log("initCanvasContextProperty implemented.");
	}
	fillText(text, x, y, maxWidth) {
		console.log("initCanvasContextProperty implemented.");
	}
	setTextAlign(align) {
		console.log("initCanvasContextProperty implemented.");
	}
	setTextBaseline(textBaseline) {
		console.log("initCanvasContextProperty implemented.");
	}
	drawImage(imageResource, dx, dy, dWidth, dHeigt, sx, sy, sWidth, sHeight) {
		console.log("initCanvasContextProperty implemented.");
	}
	setGlobalAlpha(alpha) {
		console.log("initCanvasContextProperty implemented.");
	}
	strokeText(text, x, y, maxWidth) {
		console.log("initCanvasContextProperty implemented.");
	}
	setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY) {
		console.log("initCanvasContextProperty implemented.");
	}
	draw(reserve = false, callback) {
		var actions = [...this.actions];
		this.actions = [];
		this.path = [];
		operateCanvas(this.id, this.pageId, "actionsChanged", {
			actions,
			reserve
		}, callback);
	}
	createLinearGradient(x0, y0, x1, y1) {
		return new CanvasGradient("linear", [
			x0,
			y0,
			x1,
			y1
		]);
	}
	createCircularGradient(x, y, r) {
		return new CanvasGradient("radial", [
			x,
			y,
			r
		]);
	}
	createPattern(image, repetition) {
		if (void 0 === repetition) console.error("Failed to execute 'createPattern' on 'CanvasContext': 2 arguments required, but only 1 present.");
		else if ([
			"repeat",
			"repeat-x",
			"repeat-y",
			"no-repeat"
		].indexOf(repetition) < 0) console.error("Failed to execute 'createPattern' on 'CanvasContext': The provided type ('" + repetition + "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'.");
		else return new Pattern(image, repetition);
	}
	measureText(text, callback) {
		const font = this.state.font;
		let width = 0;
		width = measureText(text, font);
		return new TextMetrics(width);
	}
	save() {
		this.actions.push({
			method: "save",
			data: []
		});
		this.drawingState.push(this.state);
	}
	restore() {
		this.actions.push({
			method: "restore",
			data: []
		});
		this.state = this.drawingState.pop() || {
			lineDash: [0, 0],
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowBlur: 0,
			shadowColor: [
				0,
				0,
				0,
				0
			],
			font: "10px sans-serif",
			fontSize: 10,
			fontWeight: "normal",
			fontStyle: "normal",
			fontFamily: "sans-serif"
		};
	}
	beginPath() {
		this.path = [];
		this.subpath = [];
		this.path.push({
			method: "beginPath",
			data: []
		});
	}
	moveTo(x, y) {
		this.path.push({
			method: "moveTo",
			data: [x, y]
		});
		this.subpath = [[x, y]];
	}
	lineTo(x, y) {
		if (this.path.length === 0 && this.subpath.length === 0) this.path.push({
			method: "moveTo",
			data: [x, y]
		});
		else this.path.push({
			method: "lineTo",
			data: [x, y]
		});
		this.subpath.push([x, y]);
	}
	quadraticCurveTo(cpx, cpy, x, y) {
		this.path.push({
			method: "quadraticCurveTo",
			data: [
				cpx,
				cpy,
				x,
				y
			]
		});
		this.subpath.push([x, y]);
	}
	bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
		this.path.push({
			method: "bezierCurveTo",
			data: [
				cp1x,
				cp1y,
				cp2x,
				cp2y,
				x,
				y
			]
		});
		this.subpath.push([x, y]);
	}
	arc(x, y, r, sAngle, eAngle, counterclockwise = false) {
		this.path.push({
			method: "arc",
			data: [
				x,
				y,
				r,
				sAngle,
				eAngle,
				counterclockwise
			]
		});
		this.subpath.push([x, y]);
	}
	rect(x, y, width, height) {
		this.path.push({
			method: "rect",
			data: [
				x,
				y,
				width,
				height
			]
		});
		this.subpath = [[x, y]];
	}
	arcTo(x1, y1, x2, y2, radius) {
		this.path.push({
			method: "arcTo",
			data: [
				x1,
				y1,
				x2,
				y2,
				radius
			]
		});
		this.subpath.push([x2, y2]);
	}
	clip() {
		this.actions.push({
			method: "clip",
			data: [...this.path]
		});
	}
	closePath() {
		this.path.push({
			method: "closePath",
			data: []
		});
		if (this.subpath.length) this.subpath = [this.subpath.shift()];
	}
	clearActions() {
		this.actions = [];
		this.path = [];
		this.subpath = [];
	}
	getActions() {
		var actions = [...this.actions];
		this.clearActions();
		return actions;
	}
	set lineDashOffset(value) {
		this.actions.push({
			method: "setLineDashOffset",
			data: [value]
		});
	}
	set globalCompositeOperation(type) {
		this.actions.push({
			method: "setGlobalCompositeOperation",
			data: [type]
		});
	}
	set shadowBlur(level) {
		this.actions.push({
			method: "setShadowBlur",
			data: [level]
		});
	}
	set shadowColor(color) {
		this.actions.push({
			method: "setShadowColor",
			data: [color]
		});
	}
	set shadowOffsetX(x) {
		this.actions.push({
			method: "setShadowOffsetX",
			data: [x]
		});
	}
	set shadowOffsetY(y) {
		this.actions.push({
			method: "setShadowOffsetY",
			data: [y]
		});
	}
	set font(value) {
		var self = this;
		this.state.font = value;
		var fontFormat = value.match(/^(([\w\-]+\s)*)(\d+\.?\d*r?px)(\/(\d+\.?\d*(r?px)?))?\s+(.*)/);
		if (fontFormat) {
			var style = fontFormat[1].trim().split(/\s/);
			var fontSize = parseFloat(fontFormat[3]);
			var fontFamily = fontFormat[7];
			var actions = [];
			style.forEach(function(value, index) {
				if ([
					"italic",
					"oblique",
					"normal"
				].indexOf(value) > -1) {
					actions.push({
						method: "setFontStyle",
						data: [value]
					});
					self.state.fontStyle = value;
				} else if ([
					"bold",
					"normal",
					"lighter",
					"bolder"
				].indexOf(value) > -1 || /^\d+$/.test(value)) {
					actions.push({
						method: "setFontWeight",
						data: [value]
					});
					self.state.fontWeight = value;
				} else if (index === 0) {
					actions.push({
						method: "setFontStyle",
						data: ["normal"]
					});
					self.state.fontStyle = "normal";
				} else if (index === 1) pushAction();
			});
			if (style.length === 1) pushAction();
			style = actions.map(function(action) {
				return action.data[0];
			}).join(" ");
			this.state.fontSize = fontSize;
			this.state.fontFamily = fontFamily;
			this.actions.push({
				method: "setFont",
				data: [`${style} ${fontSize}px ${fontFamily}`]
			});
		} else console.warn("Failed to set 'font' on 'CanvasContext': invalid format.");
		function pushAction() {
			actions.push({
				method: "setFontWeight",
				data: ["normal"]
			});
			self.state.fontWeight = "normal";
		}
	}
	get font() {
		return this.state.font;
	}
	set fillStyle(color) {
		this.setFillStyle(color);
	}
	set strokeStyle(color) {
		this.setStrokeStyle(color);
	}
	set globalAlpha(value) {
		value = Math.floor(255 * parseFloat(value));
		this.actions.push({
			method: "setGlobalAlpha",
			data: [value]
		});
	}
	set textAlign(align) {
		this.actions.push({
			method: "setTextAlign",
			data: [align]
		});
	}
	set lineCap(type) {
		this.actions.push({
			method: "setLineCap",
			data: [type]
		});
	}
	set lineJoin(type) {
		this.actions.push({
			method: "setLineJoin",
			data: [type]
		});
	}
	set lineWidth(value) {
		this.actions.push({
			method: "setLineWidth",
			data: [value]
		});
	}
	set miterLimit(value) {
		this.actions.push({
			method: "setMiterLimit",
			data: [value]
		});
	}
	set textBaseline(type) {
		this.actions.push({
			method: "setTextBaseline",
			data: [type]
		});
	}
};
var initCanvasContextProperty = /*#__PURE__*/ once(() => {
	[...methods1, ...methods2].forEach(function(method) {
		function get(method) {
			switch (method) {
				case "fill":
				case "stroke": return function() {
					this.actions.push({
						method: method + "Path",
						data: [...this.path]
					});
				};
				case "fillRect": return function(x, y, width, height) {
					this.actions.push({
						method: "fillPath",
						data: [{
							method: "rect",
							data: [
								x,
								y,
								width,
								height
							]
						}]
					});
				};
				case "strokeRect": return function(x, y, width, height) {
					this.actions.push({
						method: "strokePath",
						data: [{
							method: "rect",
							data: [
								x,
								y,
								width,
								height
							]
						}]
					});
				};
				case "fillText":
				case "strokeText": return function(text, x, y, maxWidth) {
					var data = [
						text.toString(),
						x,
						y
					];
					if (typeof maxWidth === "number") data.push(maxWidth);
					this.actions.push({
						method,
						data
					});
				};
				case "drawImage": return function(imageResource, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight) {
					if (sHeight === void 0) {
						sx = dx;
						sy = dy;
						sWidth = dWidth;
						sHeight = dHeight;
						dx = void 0;
						dy = void 0;
						dWidth = void 0;
						dHeight = void 0;
					}
					var data;
					function isNumber(e) {
						return typeof e === "number";
					}
					data = isNumber(dx) && isNumber(dy) && isNumber(dWidth) && isNumber(dHeight) ? [
						imageResource,
						sx,
						sy,
						sWidth,
						sHeight,
						dx,
						dy,
						dWidth,
						dHeight
					] : isNumber(sWidth) && isNumber(sHeight) ? [
						imageResource,
						sx,
						sy,
						sWidth,
						sHeight
					] : [
						imageResource,
						sx,
						sy
					];
					this.actions.push({
						method,
						data
					});
				};
				default: return function(...data) {
					this.actions.push({
						method,
						data
					});
				};
			}
		}
		CanvasContext.prototype[method] = get(method);
	});
	methods3.forEach(function(method) {
		function get(method) {
			switch (method) {
				case "setFillStyle":
				case "setStrokeStyle": return function(color) {
					if (typeof color !== "object") this.actions.push({
						method,
						data: ["normal", checkColor(color)]
					});
					else this.actions.push({
						method,
						data: [
							color.type,
							color.data,
							color.colorStop
						]
					});
				};
				case "setGlobalAlpha": return function(alpha) {
					alpha = Math.floor(255 * parseFloat(alpha));
					this.actions.push({
						method,
						data: [alpha]
					});
				};
				case "setShadow": return function(offsetX, offsetY, blur, color) {
					color = checkColor(color);
					this.actions.push({
						method,
						data: [
							offsetX,
							offsetY,
							blur,
							color
						]
					});
					this.state.shadowBlur = blur;
					this.state.shadowColor = color;
					this.state.shadowOffsetX = offsetX;
					this.state.shadowOffsetY = offsetY;
				};
				case "setLineDash": return function(pattern, offset) {
					pattern = pattern || [0, 0];
					offset = offset || 0;
					this.actions.push({
						method,
						data: [pattern, offset]
					});
					this.state.lineDash = pattern;
				};
				case "setFontSize": return function(fontSize) {
					this.state.font = this.state.font.replace(/\d+\.?\d*px/, fontSize + "px");
					this.state.fontSize = fontSize;
					this.actions.push({
						method,
						data: [fontSize]
					});
				};
				default: return function(...data) {
					this.actions.push({
						method,
						data
					});
				};
			}
		}
		CanvasContext.prototype[method] = get(method);
	});
});
var createCanvasContext = /*#__PURE__*/ defineSyncApi(API_CREATE_CANVAS_CONTEXT, (canvasId, componentInstance) => {
	initCanvasContextProperty();
	if (componentInstance) return new CanvasContext(canvasId, getPageIdByVm(componentInstance));
	const pageId = getPageIdByVm(getCurrentPageVm());
	if (pageId) return new CanvasContext(canvasId, pageId);
	else UniServiceJSBridge.emit(ON_ERROR, "createCanvasContext:fail");
}, CreateCanvasContextProtocol);
var canvasGetImageData = /*#__PURE__*/ defineAsyncApi(API_CANVAS_GET_IMAGE_DATA, ({ canvasId, x, y, width, height }, { resolve, reject }) => {
	const pageId = getPageIdByVm(getCurrentPageVm());
	if (!pageId) {
		reject();
		return;
	}
	function callback(data) {
		if (data.errMsg && data.errMsg.indexOf("fail") !== -1) {
			reject("", data);
			return;
		}
		let imgData = data.data;
		if (imgData && imgData.length) data.data = new Uint8ClampedArray(imgData);
		delete data.compressed;
		resolve(data);
	}
	operateCanvas(canvasId, pageId, "getImageData", {
		x,
		y,
		width,
		height
	}, callback);
}, CanvasGetImageDataProtocol, CanvasGetImageDataOptions);
var canvasPutImageData = /*#__PURE__*/ defineAsyncApi(API_CANVAS_PUT_IMAGE_DATA, ({ canvasId, data, x, y, width, height }, { resolve, reject }) => {
	var pageId = getPageIdByVm(getCurrentPageVm());
	if (!pageId) {
		reject();
		return;
	}
	let compressed;
	const operate = () => {
		operateCanvas(canvasId, pageId, "putImageData", {
			data,
			x,
			y,
			width,
			height,
			compressed
		}, (data) => {
			if (data.errMsg && data.errMsg.indexOf("fail") !== -1) {
				reject();
				return;
			}
			resolve(data);
		});
	};
	data = Array.prototype.slice.call(data);
	operate();
}, CanvasPutImageDataProtocol, CanvasPutImageDataOptions);
var canvasToTempFilePath = /*#__PURE__*/ defineAsyncApi(API_CANVAS_TO_TEMP_FILE_PATH, ({ x = 0, y = 0, width, height, destWidth, destHeight, canvasId, fileType, quality }, { resolve, reject }) => {
	var pageId = getPageIdByVm(getCurrentPageVm());
	if (!pageId) {
		reject();
		return;
	}
	operateCanvas(canvasId, pageId, "toTempFilePath", {
		x,
		y,
		width,
		height,
		destWidth,
		destHeight,
		fileType,
		quality,
		dirname: `${getTempPath()}/canvas`
	}, (res) => {
		if (res.errMsg && res.errMsg.indexOf("fail") !== -1) {
			reject("", res);
			return;
		}
		resolve(res);
	});
}, CanvasToTempFilePathProtocol, CanvasToTempFilePathOptions);
//#endregion
//#region ../uni-api/src/service/context/innerAudio.ts
/**
* 可以批量设置的监听事件
*/
var innerAudioContextEventNames = [
	"onCanplay",
	"onPlay",
	"onPause",
	"onStop",
	"onEnded",
	"onTimeUpdate",
	"onError",
	"onWaiting",
	"onSeeking",
	"onSeeked"
];
var innerAudioContextOffEventNames = [
	"offCanplay",
	"offPlay",
	"offPause",
	"offStop",
	"offEnded",
	"offTimeUpdate",
	"offError",
	"offWaiting",
	"offSeeking",
	"offSeeked"
];
//#endregion
//#region ../uni-api/src/service/context/editor.ts
var index$3 = 0;
var optionsCache = {};
function operateEditor(componentId, pageId, type, options) {
	const data = { options };
	const needCallOptions = options && ("success" in options || "fail" in options || "complete" in options);
	if (needCallOptions) {
		const callbackId = String(index$3++);
		data.callbackId = callbackId;
		optionsCache[callbackId] = options;
	}
	UniServiceJSBridge.invokeViewMethod(`editor.${componentId}`, {
		type,
		data
	}, pageId, ({ callbackId, data }) => {
		if (needCallOptions) {
			callOptions(optionsCache[callbackId], data);
			delete optionsCache[callbackId];
		}
	});
}
var EditorContext = class {
	constructor(id, pageId) {
		this.id = id;
		this.pageId = pageId;
	}
	format(name, value) {
		this._exec("format", {
			name,
			value
		});
	}
	insertDivider() {
		this._exec("insertDivider");
	}
	insertMention(options) {
		this._exec("insertMention", options);
	}
	insertLink(options) {
		this._exec("insertLink", options);
	}
	insertImage(options) {
		this._exec("insertImage", options);
	}
	insertText(options) {
		this._exec("insertText", options);
	}
	setContents(options) {
		this._exec("setContents", options);
	}
	getContents(options) {
		this._exec("getContents", options);
	}
	clear(options) {
		this._exec("clear", options);
	}
	removeFormat(options) {
		this._exec("removeFormat", options);
	}
	undo(options) {
		this._exec("undo", options);
	}
	redo(options) {
		this._exec("redo", options);
	}
	blur(options) {
		this._exec("blur", options);
	}
	getSelectionText(options) {
		this._exec("getSelectionText", options);
	}
	scrollIntoView(options) {
		this._exec("scrollIntoView", options);
	}
	_exec(method, options) {
		operateEditor(this.id, this.pageId, method, options);
	}
};
//#endregion
//#region ../uni-api/src/service/ui/createIntersectionObserver.ts
var defaultOptions = {
	thresholds: [0],
	initialRatio: 0,
	observeAll: false
};
var MARGINS = [
	"top",
	"right",
	"bottom",
	"left"
];
var reqComponentObserverId$1 = 1;
function normalizeRootMargin(margins = {}) {
	return MARGINS.map((name) => `${Number(margins[name]) || 0}px`).join(" ");
}
var ServiceIntersectionObserver = class {
	constructor(component, options) {
		this._pageId = getPageIdByVm(component);
		this._component = component;
		this._options = extend({}, defaultOptions, options);
	}
	relativeTo(selector, margins) {
		this._options.relativeToSelector = selector;
		this._options.rootMargin = normalizeRootMargin(margins);
		return this;
	}
	relativeToViewport(margins) {
		this._options.relativeToSelector = void 0;
		this._options.rootMargin = normalizeRootMargin(margins);
		return this;
	}
	observe(selector, callback) {
		if (!isFunction(callback)) return;
		this._options.selector = selector;
		this._reqId = reqComponentObserverId$1++;
		addIntersectionObserver({
			reqId: this._reqId,
			component: this._component,
			options: this._options,
			callback
		}, this._pageId);
	}
	disconnect() {
		this._reqId && removeIntersectionObserver({
			reqId: this._reqId,
			component: this._component
		}, this._pageId);
	}
};
var createIntersectionObserver = /*#__PURE__*/ defineSyncApi("createIntersectionObserver", (context, options) => {
	context = resolveComponentInstance(context);
	if (context && !getPageIdByVm(context)) {
		options = context;
		context = null;
	}
	if (context) return new ServiceIntersectionObserver(context, options);
	return new ServiceIntersectionObserver(getCurrentPageVm(), options);
});
//#endregion
//#region ../uni-api/src/service/ui/createMediaQueryObserver.ts
var reqComponentObserverId = 1;
var ServiceMediaQueryObserver = class {
	constructor(component) {
		this._pageId = (component === null || component === void 0 ? void 0 : component.$page) && component.$page.id;
		this._component = component;
	}
	observe(options, callback) {
		if (!isFunction(callback)) return;
		this._reqId = reqComponentObserverId++;
		addMediaQueryObserver({
			reqId: this._reqId,
			component: this._component,
			options,
			callback
		}, this._pageId);
	}
	disconnect() {
		this._reqId && removeMediaQueryObserver({
			reqId: this._reqId,
			component: this._component
		}, this._pageId);
	}
};
var createMediaQueryObserver = /*#__PURE__*/ defineSyncApi("createMediaQueryObserver", (context) => {
	context = resolveComponentInstance(context);
	if (context && !getPageIdByVm(context)) context = null;
	if (context) return new ServiceMediaQueryObserver(context);
	return new ServiceMediaQueryObserver(getCurrentPageVm());
});
//#endregion
//#region ../uni-api/src/service/ui/createSelectorQuery.ts
var ContextClasss = {
	canvas: CanvasContext,
	map: MapContext,
	video: VideoContext,
	editor: EditorContext
};
function convertContext(result) {
	if (result && result.contextInfo) {
		const { id, type, page } = result.contextInfo;
		const ContextClass = ContextClasss[type];
		result.context = new ContextClass(id, page);
		delete result.contextInfo;
	}
}
var NodesRef = class {
	constructor(selectorQuery, component, selector, single) {
		this._selectorQuery = selectorQuery;
		this._component = component;
		this._selector = selector;
		this._single = single;
	}
	boundingClientRect(callback) {
		this._selectorQuery._push(this._selector, this._component, this._single, {
			id: true,
			dataset: true,
			rect: true,
			size: true
		}, callback);
		return this._selectorQuery;
	}
	fields(fields, callback) {
		this._selectorQuery._push(this._selector, this._component, this._single, fields, callback);
		return this._selectorQuery;
	}
	scrollOffset(callback) {
		this._selectorQuery._push(this._selector, this._component, this._single, {
			id: true,
			dataset: true,
			scrollOffset: true
		}, callback);
		return this._selectorQuery;
	}
	context(callback) {
		this._selectorQuery._push(this._selector, this._component, this._single, { context: true }, callback);
		return this._selectorQuery;
	}
	node(callback) {
		this._selectorQuery._push(this._selector, this._component, this._single, { node: true }, callback);
		return this._selectorQuery;
	}
};
var SelectorQuery = class {
	constructor(page) {
		this._component = void 0;
		this._page = page;
		this._queue = [];
		this._queueCb = [];
	}
	exec(callback) {
		requestComponentInfo(this._page, this._queue, (res) => {
			const queueCbs = this._queueCb;
			res.forEach((result, index) => {
				if (isArray(result)) result.forEach(convertContext);
				else convertContext(result);
				const queueCb = queueCbs[index];
				if (isFunction(queueCb)) queueCb.call(this, result);
			});
			if (isFunction(callback)) callback.call(this, res);
		});
		return this._nodesRef;
	}
	in(component) {
		this._component = resolveComponentInstance(component);
		return this;
	}
	select(selector) {
		return this._nodesRef = new NodesRef(this, this._component, selector, true);
	}
	selectAll(selector) {
		return this._nodesRef = new NodesRef(this, this._component, selector, false);
	}
	selectViewport() {
		return this._nodesRef = new NodesRef(this, null, "", true);
	}
	_push(selector, component, single, fields, callback) {
		this._queue.push({
			component,
			selector,
			single,
			fields
		});
		this._queueCb.push(callback);
	}
};
var createSelectorQuery = /*#__PURE__*/ defineSyncApi("createSelectorQuery", (context) => {
	context = resolveComponentInstance(context);
	if (context && !getPageIdByVm(context)) context = null;
	return new SelectorQuery(context || getCurrentPageVm());
});
//#endregion
//#region ../uni-api/src/protocols/ui/createAnimation.ts
var API_CREATE_ANIMATION = "createAnimation";
var CreateAnimationOptions = { formatArgs: {} };
var CreateAnimationProtocol = {
	duration: Number,
	timingFunction: String,
	delay: Number,
	transformOrigin: String
};
//#endregion
//#region ../uni-api/src/service/ui/createAnimation.ts
var defaultOption = {
	duration: 400,
	timingFunction: "linear",
	delay: 0,
	transformOrigin: "50% 50% 0"
};
var MPAnimation = class {
	constructor(option) {
		this.actions = [];
		this.currentTransform = {};
		this.currentStepAnimates = [];
		this.option = extend({}, defaultOption, option);
	}
	_getOption(option) {
		const _option = {
			transition: extend({}, this.option, option),
			transformOrigin: ""
		};
		_option.transformOrigin = _option.transition.transformOrigin;
		delete _option.transition.transformOrigin;
		return _option;
	}
	_pushAnimates(type, args) {
		this.currentStepAnimates.push({
			type,
			args
		});
	}
	_converType(type) {
		return type.replace(/[A-Z]/g, (text) => {
			return `-${text.toLowerCase()}`;
		});
	}
	_getValue(value) {
		return typeof value === "number" ? `${value}px` : value;
	}
	export() {
		const actions = this.actions;
		this.actions = [];
		return { actions };
	}
	step(option) {
		this.currentStepAnimates.forEach((animate) => {
			if (animate.type !== "style") this.currentTransform[animate.type] = animate;
			else this.currentTransform[`${animate.type}.${animate.args[0]}`] = animate;
		});
		this.actions.push({
			animates: Object.values(this.currentTransform),
			option: this._getOption(option)
		});
		this.currentStepAnimates = [];
		return this;
	}
};
var initAnimationProperty = /*#__PURE__*/ once(() => {
	const animateTypes1 = [
		"matrix",
		"matrix3d",
		"rotate",
		"rotate3d",
		"rotateX",
		"rotateY",
		"rotateZ",
		"scale",
		"scale3d",
		"scaleX",
		"scaleY",
		"scaleZ",
		"skew",
		"skewX",
		"skewY",
		"translate",
		"translate3d",
		"translateX",
		"translateY",
		"translateZ"
	];
	const animateTypes2 = ["opacity", "backgroundColor"];
	const animateTypes3 = [
		"width",
		"height",
		"left",
		"right",
		"top",
		"bottom"
	];
	animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
		MPAnimation.prototype[type] = function(...args) {
			if (animateTypes2.concat(animateTypes3).includes(type)) this._pushAnimates("style", [this._converType(type), animateTypes3.includes(type) ? this._getValue(args[0]) : args[0]]);
			else this._pushAnimates(type, args);
			return this;
		};
	});
});
var createAnimation = /*#__PURE__*/ defineSyncApi(API_CREATE_ANIMATION, (option) => {
	initAnimationProperty();
	return new MPAnimation(option);
}, CreateAnimationProtocol, CreateAnimationOptions);
//#endregion
//#region ../uni-api/src/service/ui/tabBar.ts
var API_ON_TAB_BAR_MID_BUTTON_TAP = "onTabBarMidButtonTap";
var onTabBarMidButtonTap = /*#__PURE__*/ defineOnApi(API_ON_TAB_BAR_MID_BUTTON_TAP, () => {});
//#endregion
//#region ../uni-api/src/protocols/ui/window.ts
var API_ON_WINDOW_RESIZE = "onWindowResize";
var API_OFF_WINDOW_RESIZE = "offWindowResize";
//#endregion
//#region ../uni-api/src/service/ui/window.ts
/**
* 监听窗口大小变化
*/
var onWindowResize = /*#__PURE__*/ defineOnApi(API_ON_WINDOW_RESIZE, () => {});
/**
* 取消监听窗口大小变化
*/
var offWindowResize = /*#__PURE__*/ defineOffApi(API_OFF_WINDOW_RESIZE, () => {});
//#endregion
//#region ../uni-api/src/service/ui/locale.ts
var API_SET_LOCALE = "setLocale";
var API_GET_LOCALE = "getLocale";
var API_ON_LOCALE_CHANGE = "onLocaleChange";
var getLocale = /*#__PURE__*/ defineSyncApi(API_GET_LOCALE, () => {
	const app = getApp({ allowDefault: true });
	if (app && app.$vm) return app.$vm.$locale;
	return useI18n().getLocale();
});
var onLocaleChange = /*#__PURE__*/ defineOnApi(API_ON_LOCALE_CHANGE, () => {});
var setLocale = /*#__PURE__*/ defineSyncApi(API_SET_LOCALE, (locale) => {
	const app = getApp();
	if (!app) return false;
	if (app.$vm.$locale !== locale) {
		app.$vm.$locale = locale;
		navigator.cookieEnabled && window.localStorage && (localStorage[UNI_STORAGE_LOCALE] = locale);
		UniServiceJSBridge.invokeOnCallback(API_ON_LOCALE_CHANGE, { locale });
		return true;
	}
	return false;
});
var setPageMeta = /*#__PURE__*/ defineAsyncApi("setPageMeta", (options, { resolve }) => {
	resolve(setCurrentPageMeta(getCurrentPageVm(), options));
});
//#endregion
//#region ../uni-api/src/protocols/keyboard/getSelectedTextRange.ts
var API_GET_SELECTED_TEXT_RANGE = "getSelectedTextRange";
//#endregion
//#region ../uni-api/src/service/keyboard/getSelectedTextRange.ts
var getSelectedTextRange = /*#__PURE__*/ defineAsyncApi(API_GET_SELECTED_TEXT_RANGE, (_, { resolve, reject }) => {
	UniServiceJSBridge.invokeViewMethod(API_GET_SELECTED_TEXT_RANGE, {}, getCurrentPageId(), (res) => {
		if (typeof res.end === "undefined" && typeof res.start === "undefined") reject("no focused");
		else resolve(res);
	});
});
//#endregion
//#region ../uni-api/src/service/lifecycle/app.ts
var appHooks = {
	[ON_UNHANDLE_REJECTION]: [],
	[ON_PAGE_NOT_FOUND]: [],
	[ON_ERROR]: [],
	[ON_SHOW]: [],
	[ON_HIDE]: []
};
function onAppHook(type, hook) {
	const app = getApp({ allowDefault: true });
	if (app && app.$vm) return injectHook(type, hook, app.$vm.$);
	appHooks[type].push(hook);
}
function injectAppHooks(appInstance) {
	Object.keys(appHooks).forEach((type) => {
		appHooks[type].forEach((hook) => {
			injectHook(type, hook, appInstance);
		});
	});
}
function offAppHook(type, hook) {
	const app = getApp({ allowDefault: true });
	if (app && app.$vm) return removeHook(app.$vm, type, hook);
	remove(appHooks[type], hook);
}
function onUnhandledRejection(hook) {
	onAppHook(ON_UNHANDLE_REJECTION, hook);
}
function offUnhandledRejection(hook) {
	offAppHook(ON_UNHANDLE_REJECTION, hook);
}
function onPageNotFound(hook) {
	onAppHook(ON_PAGE_NOT_FOUND, hook);
}
function offPageNotFound(hook) {
	offAppHook(ON_PAGE_NOT_FOUND, hook);
}
function onError(hook) {
	onAppHook(ON_ERROR, hook);
}
function offError(hook) {
	offAppHook(ON_ERROR, hook);
}
function onAppShow(hook) {
	onAppHook(ON_SHOW, hook);
}
function offAppShow(hook) {
	offAppHook(ON_SHOW, hook);
}
function onAppHide(hook) {
	onAppHook(ON_HIDE, hook);
}
function offAppHide(hook) {
	offAppHook(ON_HIDE, hook);
}
var getEnterOptionsSync = /*#__PURE__*/ defineSyncApi("getEnterOptionsSync", () => {
	return getEnterOptions();
});
var getLaunchOptionsSync = /*#__PURE__*/ defineSyncApi("getLaunchOptionsSync", () => {
	return getLaunchOptions();
});
//#endregion
//#region ../uni-api/src/service/plugin/push.ts
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
	try {
		return JSON.parse(message);
	} catch (e) {}
	return message;
}
/**
* @private
* @param args
*/
function invokePushCallback(args) {
	if (args.type === "enabled") enabled = true;
	else if (args.type === "clientId") {
		cid = args.cid;
		cidErrMsg = args.errMsg;
		invokeGetPushCidCallbacks(cid, args.errMsg);
	} else if (args.type === "pushMsg") {
		const message = {
			type: "receive",
			data: normalizePushMessage(args.message)
		};
		for (let i = 0; i < onPushMessageCallbacks.length; i++) {
			const callback = onPushMessageCallbacks[i];
			callback(message);
			if (message.stopped) break;
		}
	} else if (args.type === "click") onPushMessageCallbacks.forEach((callback) => {
		callback({
			type: "click",
			data: normalizePushMessage(args.message)
		});
	});
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
	getPushCidCallbacks.forEach((callback) => {
		callback(cid, errMsg);
	});
	getPushCidCallbacks.length = 0;
}
var getPushClientId = /*#__PURE__*/ defineAsyncApi("getPushClientId", (_, { resolve, reject }) => {
	Promise.resolve().then(() => {
		if (typeof enabled === "undefined") {
			enabled = false;
			cid = "";
			cidErrMsg = "uniPush is not enabled";
		}
		getPushCidCallbacks.push((cid, errMsg) => {
			if (cid) resolve({ cid });
			else reject(errMsg);
		});
		if (typeof cid !== "undefined") invokeGetPushCidCallbacks(cid, cidErrMsg);
	});
});
var onPushMessageCallbacks = [];
var onPushMessage = (fn) => {
	if (onPushMessageCallbacks.indexOf(fn) === -1) onPushMessageCallbacks.push(fn);
};
var offPushMessage = (fn) => {
	if (!fn) onPushMessageCallbacks.length = 0;
	else {
		const index = onPushMessageCallbacks.indexOf(fn);
		if (index > -1) onPushMessageCallbacks.splice(index, 1);
	}
};
//#endregion
//#region ../uni-api/src/protocols/base/canIUse.ts
var API_CAN_I_USE = "canIUse";
var CanIUseProtocol = [{
	name: "schema",
	type: String,
	required: true
}];
//#endregion
//#region ../uni-api/src/protocols/device/makePhoneCall.ts
var API_MAKE_PHONE_CALL = "makePhoneCall";
var MakePhoneCallProtocol = { phoneNumber: String };
//#endregion
//#region ../uni-api/src/protocols/device/clipboard.ts
var API_GET_CLIPBOARD_DATA = "getClipboardData";
var API_SET_CLIPBOARD_DATA = "setClipboardData";
var SetClipboardDataOptions = {
	formatArgs: { showToast: true },
	beforeInvoke() {
		initI18nSetClipboardDataMsgsOnce();
	},
	beforeSuccess(res, params) {
		if (!params.showToast) return;
		const { t } = useI18n();
		const title = t("uni.setClipboardData.success");
		if (title) uni.showToast({
			title,
			icon: "success",
			mask: false
		});
	}
};
var SetClipboardDataProtocol = {
	data: {
		type: String,
		required: true
	},
	showToast: { type: Boolean }
};
//#endregion
//#region ../uni-api/src/protocols/device/accelerometer.ts
var API_ON_ACCELEROMETER = "onAccelerometer";
var API_OFF_ACCELEROMETER = "offAccelerometer";
var API_START_ACCELEROMETER = "startAccelerometer";
var API_STOP_ACCELEROMETER = "stopAccelerometer";
//#endregion
//#region ../uni-api/src/protocols/device/compass.ts
var API_ON_COMPASS = "onCompass";
var API_OFF_COMPASS = "offCompass";
var API_START_COMPASS = "startCompass";
var API_STOP_COMPASS = "stopCompass";
//#endregion
//#region ../uni-api/src/protocols/device/vibrate.ts
var API_VIBRATE_SHORT = "vibrateShort";
var API_VIBRATE_LONG = "vibrateLong";
//#endregion
//#region ../uni-api/src/protocols/device/brightness.ts
var API_SET_KEEP_SCREEN_ON = "setKeepScreenOn";
//#endregion
//#region ../uni-api/src/protocols/storage/storage.ts
var API_GET_STORAGE = "getStorage";
var GetStorageProtocol = { key: {
	type: String,
	required: true
} };
var API_GET_STORAGE_SYNC = "getStorageSync";
var GetStorageSyncProtocol = [{
	name: "key",
	type: String,
	required: true
}];
var API_SET_STORAGE = "setStorage";
var SetStorageProtocol = {
	key: {
		type: String,
		required: true
	},
	data: { required: true }
};
var API_SET_STORAGE_SYNC = "setStorageSync";
var SetStorageSyncProtocol = [{
	name: "key",
	type: String,
	required: true
}, {
	name: "data",
	required: true
}];
var API_REMOVE_STORAGE = "removeStorage";
var RemoveStorageProtocol = GetStorageProtocol;
var RemoveStorageSyncProtocol = GetStorageSyncProtocol;
//#endregion
//#region ../uni-api/src/protocols/file/getFileInfo.ts
var API_GET_FILE_INFO = "getFileInfo";
var GetFileInfoOptions = { formatArgs: { filePath(filePath, params) {
	params.filePath = getRealPath(filePath);
} } };
var GetFileInfoProtocol = { filePath: {
	type: String,
	required: true
} };
//#endregion
//#region ../uni-api/src/protocols/file/openDocument.ts
var API_OPEN_DOCUMENT = "openDocument";
var OpenDocumentOptions = { formatArgs: { filePath(filePath, params) {
	params.filePath = getRealPath(filePath);
} } };
var OpenDocumentProtocol = {
	filePath: {
		type: String,
		required: true
	},
	fileType: String
};
//#endregion
//#region ../uni-api/src/protocols/keyboard/keyboard.ts
var API_HIDE_KEYBOARD = "hideKeyboard";
//#endregion
//#region ../uni-api/src/protocols/location/chooseLocation.ts
var API_CHOOSE_LOCATION = "chooseLocation";
//#endregion
//#region ../uni-api/src/protocols/location/getLocation.ts
var API_GET_LOCATION = "getLocation";
var coordTypes$1 = ["wgs84", "gcj02"];
var GetLocationOptions = { formatArgs: {
	type(value, params) {
		value = (value || "").toLowerCase();
		if (coordTypes$1.indexOf(value) === -1) params.type = coordTypes$1[0];
		else params.type = value;
	},
	altitude(value, params) {
		params.altitude = value ? value : false;
	}
} };
var GetLocationProtocol = {
	type: String,
	altitude: Boolean
};
//#endregion
//#region ../uni-api/src/protocols/location/openLocation.ts
var API_OPEN_LOCATION = "openLocation";
var checkProps = (key, value) => {
	if (value === void 0) return `${key} should not be empty.`;
	if (typeof value !== "number") {
		let receivedType = typeof value;
		receivedType = receivedType[0].toUpperCase() + receivedType.substring(1);
		return `Expected Number, got ${receivedType} with value ${JSON.stringify(value)}.`;
	}
};
var OpenLocationOptions = { formatArgs: {
	latitude(value, params) {
		const checkedInfo = checkProps("latitude", value);
		if (checkedInfo) return checkedInfo;
		params.latitude = value;
	},
	longitude(value, params) {
		const checkedInfo = checkProps("longitude", value);
		if (checkedInfo) return checkedInfo;
		params.longitude = value;
	},
	scale(value, params) {
		value = Math.floor(value);
		params.scale = value >= 5 && value <= 18 ? value : 18;
	}
} };
var OpenLocationProtocol = {
	latitude: Number,
	longitude: Number,
	scale: Number,
	name: String,
	address: String
};
//#endregion
//#region ../uni-api/src/protocols/media/chooseImage.ts
var API_CHOOSE_IMAGE = "chooseImage";
var ChooseImageOptions = { formatArgs: {
	count(value, params) {
		if (!value || value <= 0) params.count = 9;
	},
	sizeType(sizeType, params) {
		params.sizeType = elemsInArray(sizeType, CHOOSE_SIZE_TYPES);
	},
	sourceType(sourceType, params) {
		params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
	},
	extension(extension, params) {
		if (extension instanceof Array && extension.length === 0) return "param extension should not be empty.";
		if (!extension) params.extension = ["*"];
	}
} };
var ChooseImageProtocol = {
	count: Number,
	sizeType: [Array, String],
	sourceType: Array,
	extension: Array
};
//#endregion
//#region ../uni-api/src/protocols/media/chooseVideo.ts
var API_CHOOSE_VIDEO = "chooseVideo";
var ChooseVideoOptions = { formatArgs: {
	sourceType(sourceType, params) {
		params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
	},
	compressed: true,
	maxDuration: 60,
	camera: "back",
	extension(extension, params) {
		if (extension instanceof Array && extension.length === 0) return "param extension should not be empty.";
		if (!extension) params.extension = ["*"];
	}
} };
var ChooseVideoProtocol = {
	sourceType: Array,
	compressed: Boolean,
	maxDuration: Number,
	camera: String,
	extension: Array
};
//#endregion
//#region ../uni-api/src/protocols/media/chooseFile.ts
var API_CHOOSE_FILE = "chooseFile";
var CHOOSE_MEDIA_TYPE = [
	"all",
	"image",
	"video"
];
var ChooseFileOptions = { formatArgs: {
	count(count, params) {
		if (!count || count <= 0) params.count = 100;
	},
	sourceType(sourceType, params) {
		params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
	},
	type(type, params) {
		params.type = elemInArray(type, CHOOSE_MEDIA_TYPE);
	},
	extension(extension, params) {
		if (extension instanceof Array && extension.length === 0) return "param extension should not be empty.";
		if (!extension) if (params.type === "all" || !params.type) params.extension = [""];
		else params.extension = ["*"];
	}
} };
var ChooseFileProtocol = {
	count: Number,
	sourceType: Array,
	type: String,
	extension: Array
};
//#endregion
//#region ../uni-api/src/protocols/media/getImageInfo.ts
var API_GET_IMAGE_INFO = "getImageInfo";
var GetImageInfoOptions = { formatArgs: { src(src, params) {
	params.src = getRealPath(src);
} } };
var GetImageInfoProtocol = { src: {
	type: String,
	required: true
} };
//#endregion
//#region ../uni-api/src/protocols/media/previewImage.ts
var API_PREVIEW_IMAGE = "previewImage";
var PreviewImageOptions = { formatArgs: {
	urls(urls, params) {
		params.urls = urls.map((url) => isString(url) && url ? getRealPath(url) : "");
	},
	current(current, params) {
		if (typeof current === "number") params.current = current > 0 && current < params.urls.length ? current : 0;
		else if (isString(current) && current) params.current = getRealPath(current);
	}
} };
var PreviewImageProtocol = {
	urls: {
		type: Array,
		required: true
	},
	current: { type: [Number, String] }
};
var API_CLOSE_PREVIEW_IMAGE = "closePreviewImage";
//#endregion
//#region ../uni-api/src/protocols/media/getVideoInfo.ts
var API_GET_VIDEO_INFO = "getVideoInfo";
var GetVideoInfoOptions = { formatArgs: { src(src, params) {
	params.src = getRealPath(src);
} } };
var GetVideoInfoProtocol = { src: {
	type: String,
	required: true
} };
//#endregion
//#region ../uni-api/src/protocols/media/saveImageToPhotosAlbum.ts
var API_SAVE_IMAGE_TO_PHOTOS_ALBUM = "saveImageToPhotosAlbum";
//#endregion
//#region ../uni-api/src/protocols/media/saveVideoToPhotosAlbum.ts
var API_SAVE_VIDEO_TO_PHOTOS_ALBUM = "saveVideoToPhotosAlbum";
//#endregion
//#region ../uni-api/src/protocols/network/request.ts
var API_REQUEST = "request";
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
	for (const key in data) if (hasOwn(data, key)) {
		let v = data[key];
		if (typeof v === "undefined" || v === null) v = "";
		else if (isPlainObject(v)) v = JSON.stringify(v);
		params[encode(key)] = encode(v);
	}
	query = Object.keys(params).map((item) => `${item}=${params[item]}`).join("&");
	return url + (query ? "?" + query : "") + (hash ? "#" + hash : "");
}
var RequestProtocol = {
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
var RequestOptions = { formatArgs: {
	method(value, params) {
		params.method = elemInArray((value || "").toUpperCase(), HTTP_METHODS);
	},
	data(value, params) {
		params.data = value || "";
	},
	url(value, params) {
		if (params.method === HTTP_METHODS[0] && isPlainObject(params.data) && Object.keys(params.data).length) params.url = stringifyQuery$1(value, params.data);
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
//#endregion
//#region ../uni-api/src/protocols/network/downloadFile.ts
var API_DOWNLOAD_FILE = "downloadFile";
var DownloadFileOptions = { formatArgs: { header(value, params) {
	params.header = value || {};
} } };
var DownloadFileProtocol = {
	url: {
		type: String,
		required: true
	},
	header: Object,
	timeout: Number
};
//#endregion
//#region ../uni-api/src/protocols/network/uploadFile.ts
var API_UPLOAD_FILE = "uploadFile";
var UploadFileOptions = { formatArgs: {
	filePath(filePath, params) {
		if (filePath) params.filePath = getRealPath(filePath);
	},
	header(value, params) {
		params.header = value || {};
	},
	formData(value, params) {
		params.formData = value || {};
	}
} };
var UploadFileProtocol = {
	url: {
		type: String,
		required: true
	},
	files: Array,
	filePath: String,
	name: String,
	header: Object,
	formData: Object,
	timeout: Number
};
//#endregion
//#region ../uni-api/src/protocols/network/socket.ts
var API_CONNECT_SOCKET = "connectSocket";
var ConnectSocketOptions = { formatArgs: {
	header(value, params) {
		params.header = value || {};
	},
	method(value, params) {
		params.method = elemInArray((value || "").toUpperCase(), HTTP_METHODS);
	},
	protocols(protocols, params) {
		if (isString(protocols)) params.protocols = [protocols];
	}
} };
var ConnectSocketProtocol = {
	url: {
		type: String,
		required: true
	},
	header: { type: Object },
	method: String,
	protocols: [Array, String]
};
var API_SEND_SOCKET_MESSAGE = "sendSocketMessage";
var SendSocketMessageProtocol = { data: [String, ArrayBuffer] };
var API_CLOSE_SOCKET = "closeSocket";
var CloseSocketProtocol = {
	code: Number,
	reason: String
};
//#endregion
//#region ../uni-api/src/protocols/location/locationChange.ts
var API_START_LOCATION_UPDATE = "startLocationUpdate";
var API_ON_LOCATION_CHANGE = "onLocationChange";
var API_STOP_LOCATION_UPDATE = "stopLocationUpdate";
var API_OFF_LOCATION_CHANGE = "offLocationChange";
var API_OFF_LOCATION_CHANGE_ERROR = "offLocationChangeError";
var API_ON_LOCATION_CHANGE_ERROR = "onLocationChangeError";
var coordTypes = ["wgs84", "gcj02"];
var StartLocationUpdateProtocol = { type: String };
var StartLocationUpdateOptions = { formatArgs: { type(value, params) {
	value = (value || "").toLowerCase();
	if (coordTypes.indexOf(value) === -1) params.type = coordTypes[1];
	else params.type = value;
} } };
//#endregion
//#region ../uni-api/src/protocols/route/encodeQueryString.ts
function encodeQueryString(url) {
	if (!isString(url)) return url;
	const index = url.indexOf("?");
	if (index === -1) return url;
	const query = url.slice(index + 1).trim().replace(/^(\?|#|&)/, "");
	if (!query) return url;
	url = url.slice(0, index);
	const params = [];
	query.split("&").forEach((param) => {
		const parts = param.replace(/\+/g, " ").split("=");
		const key = parts.shift();
		const val = parts.length > 0 ? parts.join("=") : "";
		params.push(key + "=" + encodeURIComponent(val));
	});
	return params.length ? url + "?" + params.join("&") : url;
}
//#endregion
//#region ../uni-api/src/protocols/route/route.ts
var ANIMATION_IN$1 = [
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
var ANIMATION_OUT$1 = [
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
var BaseRouteProtocol = { url: {
	type: String,
	required: true
} };
var API_NAVIGATE_TO = "navigateTo";
var API_REDIRECT_TO = "redirectTo";
var API_RE_LAUNCH = "reLaunch";
var API_SWITCH_TAB = "switchTab";
var API_NAVIGATE_BACK = "navigateBack";
var API_PRELOAD_PAGE = "preloadPage";
var NavigateToProtocol = /*#__PURE__*/ extend({}, BaseRouteProtocol, createAnimationProtocol(ANIMATION_IN$1));
var NavigateBackProtocol = /*#__PURE__*/ extend({ delta: { type: Number } }, createAnimationProtocol(ANIMATION_OUT$1));
var RedirectToProtocol = BaseRouteProtocol;
var ReLaunchProtocol = BaseRouteProtocol;
var SwitchTabProtocol = BaseRouteProtocol;
var PreloadPageProtocol = BaseRouteProtocol;
var NavigateToOptions = /*#__PURE__*/ createRouteOptions(API_NAVIGATE_TO);
var RedirectToOptions = /*#__PURE__*/ createRouteOptions(API_REDIRECT_TO);
var ReLaunchOptions = /*#__PURE__*/ createRouteOptions(API_RE_LAUNCH);
var SwitchTabOptions = /*#__PURE__*/ createRouteOptions(API_SWITCH_TAB);
var NavigateBackOptions = { formatArgs: { delta(value, params) {
	value = parseInt(value + "") || 1;
	params.delta = Math.min(getCurrentPages().length - 1, value);
} } };
function createAnimationProtocol(animationTypes) {
	return {
		animationType: {
			type: String,
			validator(type) {
				if (type && animationTypes.indexOf(type) === -1) return "`" + type + "` is not supported for `animationType` (supported values are: `" + animationTypes.join("`|`") + "`)";
			}
		},
		animationDuration: { type: Number }
	};
}
var navigatorLock;
function beforeRoute() {
	navigatorLock = "";
}
function createRouteOptions(type) {
	return {
		formatArgs: { url: createNormalizeUrl(type) },
		beforeAll: beforeRoute
	};
}
function createNormalizeUrl(type) {
	return function normalizeUrl(url, params) {
		if (!url) return `Missing required args: "url"`;
		url = normalizeRoute(url);
		const pagePath = url.split("?")[0];
		const routeOptions = getRouteOptions(pagePath, true);
		if (!routeOptions) return "page `" + url + "` is not found";
		if (type === "navigateTo" || type === "redirectTo") {
			if (routeOptions.meta.isTabBar) return `can not ${type} a tabbar page`;
		} else if (type === "switchTab") {
			if (!routeOptions.meta.isTabBar) return "can not switch to no-tabBar page";
		}
		if ((type === "switchTab" || type === "preloadPage") && routeOptions.meta.isTabBar && params.openType !== "appLaunch") url = pagePath;
		if (routeOptions.meta.isEntry) url = url.replace(routeOptions.alias, "/");
		params.url = encodeQueryString(url);
		if (type === "unPreloadPage") return;
		else if (type === "preloadPage") {
			if (routeOptions.meta.isTabBar) {
				const pages = getCurrentPages();
				const tabBarPagePath = routeOptions.path.slice(1);
				if (pages.find((page) => page.route === tabBarPagePath)) return "tabBar page `" + tabBarPagePath + "` already exists";
			}
			return;
		}
		if (navigatorLock === url && params.openType !== "appLaunch") return `${navigatorLock} locked`;
		if (__uniConfig.ready) navigatorLock = url;
	};
}
//#endregion
//#region ../uni-api/src/protocols/ui/hideToast.ts
var API_HIDE_TOAST = "hideToast";
//#endregion
//#region ../uni-api/src/protocols/ui/loadFontFace.ts
var API_LOAD_FONT_FACE = "loadFontFace";
var LoadFontFaceProtocol = {
	family: {
		type: String,
		required: true
	},
	source: {
		type: String,
		required: true
	},
	desc: Object
};
//#endregion
//#region ../uni-api/src/protocols/ui/navigationBar.ts
var FRONT_COLORS = ["#ffffff", "#000000"];
var API_SET_NAVIGATION_BAR_COLOR = "setNavigationBarColor";
var SetNavigationBarColorOptions = { formatArgs: { animation(animation, params) {
	if (!animation) animation = {
		duration: 0,
		timingFunc: "linear"
	};
	params.animation = {
		duration: animation.duration || 0,
		timingFunc: animation.timingFunc || "linear"
	};
} } };
var SetNavigationBarColorProtocol = {
	frontColor: {
		type: String,
		required: true,
		validator(frontColor) {
			if (FRONT_COLORS.indexOf(frontColor) === -1) return `invalid frontColor "${frontColor}"`;
		}
	},
	backgroundColor: {
		type: String,
		required: true
	},
	animation: Object
};
var API_SET_NAVIGATION_BAR_TITLE = "setNavigationBarTitle";
var SetNavigationBarTitleProtocol = { title: {
	type: String,
	required: true
} };
var API_SHOW_NAVIGATION_BAR_LOADING = "showNavigationBarLoading";
var API_HIDE_NAVIGATION_BAR_LOADING = "hideNavigationBarLoading";
//#endregion
//#region ../uni-api/src/protocols/ui/pageScrollTo.ts
var API_PAGE_SCROLL_TO = "pageScrollTo";
var PageScrollToProtocol = {
	scrollTop: Number,
	selector: String,
	duration: Number
};
var PageScrollToOptions = { formatArgs: { duration: 300 } };
//#endregion
//#region ../uni-api/src/protocols/ui/showActionSheet.ts
var API_SHOW_ACTION_SHEET = "showActionSheet";
//#endregion
//#region ../uni-api/src/protocols/ui/showLoading.ts
var API_SHOW_LOADING = "showLoading";
//#endregion
//#region ../uni-api/src/protocols/ui/showModal.ts
var API_SHOW_MODAL = "showModal";
//#endregion
//#region ../uni-api/src/protocols/ui/showToast.ts
var API_SHOW_TOAST = "showToast";
var SHOW_TOAST_ICON = [
	"success",
	"loading",
	"none",
	"error"
];
var ShowToastProtocol = {
	title: String,
	icon: String,
	image: String,
	duration: Number,
	mask: Boolean
};
var ShowToastOptions = { formatArgs: {
	title: "",
	icon(type, params) {
		params.icon = elemInArray(type, SHOW_TOAST_ICON);
	},
	image(value, params) {
		if (value) params.image = getRealPath(value);
		else params.image = "";
	},
	duration: 1500,
	mask: false
} };
//#endregion
//#region ../uni-api/src/protocols/ui/startPullDownRefresh.ts
var API_START_PULL_DOWN_REFRESH = "startPullDownRefresh";
//#endregion
//#region ../uni-api/src/protocols/ui/stopPullDownRefresh.ts
var API_STOP_PULL_DOWN_REFRESH = "stopPullDownRefresh";
//#endregion
//#region ../uni-api/src/protocols/ui/tabBar.ts
var IndexProtocol = { index: {
	type: Number,
	required: true
} };
var IndexOptions = {
	beforeInvoke() {
		const pageMeta = getCurrentPageMeta();
		if (pageMeta && !pageMeta.isTabBar) return "not TabBar page";
	},
	formatArgs: { index(value) {
		if (!__uniConfig.tabBar.list[value]) return "tabbar item not found";
	} }
};
var API_SET_TAB_BAR_ITEM = "setTabBarItem";
var SetTabBarItemProtocol = /*#__PURE__*/ extend({
	text: String,
	iconPath: String,
	selectedIconPath: String,
	pagePath: String
}, IndexProtocol);
var SetTabBarItemOptions = {
	beforeInvoke: IndexOptions.beforeInvoke,
	formatArgs: /*#__PURE__*/ extend({ pagePath(value, params) {
		if (value) params.pagePath = removeLeadingSlash(value);
	} }, IndexOptions.formatArgs)
};
var API_SET_TAB_BAR_STYLE = "setTabBarStyle";
var SetTabBarStyleProtocol = {
	color: String,
	selectedColor: String,
	backgroundColor: String,
	backgroundImage: String,
	backgroundRepeat: String,
	borderStyle: String
};
var GRADIENT_RE = /^(linear|radial)-gradient\(.+?\);?$/;
var SetTabBarStyleOptions = {
	beforeInvoke: IndexOptions.beforeInvoke,
	formatArgs: {
		backgroundImage(value, params) {
			if (value && !GRADIENT_RE.test(value)) params.backgroundImage = getRealPath(value);
		},
		borderStyle(value, params) {
			if (value) params.borderStyle = value === "white" ? "white" : "black";
		}
	}
};
var API_HIDE_TAB_BAR = "hideTabBar";
var HideTabBarProtocol = { animation: Boolean };
var API_SHOW_TAB_BAR = "showTabBar";
var ShowTabBarProtocol = HideTabBarProtocol;
var API_HIDE_TAB_BAR_RED_DOT = "hideTabBarRedDot";
var HideTabBarRedDotProtocol = IndexProtocol;
var HideTabBarRedDotOptions = IndexOptions;
var API_SHOW_TAB_BAR_RED_DOT = "showTabBarRedDot";
var ShowTabBarRedDotProtocol = IndexProtocol;
var ShowTabBarRedDotOptions = IndexOptions;
var API_REMOVE_TAB_BAR_BADGE = "removeTabBarBadge";
var RemoveTabBarBadgeProtocol = IndexProtocol;
var RemoveTabBarBadgeOptions = IndexOptions;
var API_SET_TAB_BAR_BADGE = "setTabBarBadge";
var SetTabBarBadgeProtocol = /*#__PURE__*/ extend({ text: {
	type: String,
	required: true
} }, IndexProtocol);
var SetTabBarBadgeOptions = {
	beforeInvoke: IndexOptions.beforeInvoke,
	formatArgs: /*#__PURE__*/ extend({ text(value, params) {
		if (getLen(value) >= 4) params.text = "...";
	} }, IndexOptions.formatArgs)
};
//#endregion
//#region ../uni-api/src/helpers/intersection-observer.js
/**
* Copyright 2016 Google Inc. All Rights Reserved.
*
* Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
*
*  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*/
var initIntersectionObserverPolyfill = function() {
	"use strict";
	if (typeof window !== "object") return;
	if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
		if (!("isIntersecting" in window.IntersectionObserverEntry.prototype)) Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", { get: function() {
			return this.intersectionRatio > 0;
		} });
		return;
	}
	/**
	* Returns the embedding frame element, if any.
	* @param {!Document} doc
	* @return {!Element}
	*/
	function getFrameElement(doc) {
		try {
			return doc.defaultView && doc.defaultView.frameElement || null;
		} catch (e) {
			return null;
		}
	}
	/**
	* A local reference to the root document.
	*/
	var document = (function(startDoc) {
		var doc = startDoc;
		var frame = getFrameElement(doc);
		while (frame) {
			doc = frame.ownerDocument;
			frame = getFrameElement(doc);
		}
		return doc;
	})(window.document);
	/**
	* An IntersectionObserver registry. This registry exists to hold a strong
	* reference to IntersectionObserver instances currently observing a target
	* element. Without this registry, instances without another reference may be
	* garbage collected.
	*/
	var registry = [];
	/**
	* The signal updater for cross-origin intersection. When not null, it means
	* that the polyfill is configured to work in a cross-origin mode.
	* @type {function(DOMRect|ClientRect, DOMRect|ClientRect)}
	*/
	var crossOriginUpdater = null;
	/**
	* The current cross-origin intersection. Only used in the cross-origin mode.
	* @type {DOMRect|ClientRect}
	*/
	var crossOriginRect = null;
	/**
	* Creates the global IntersectionObserverEntry constructor.
	* https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
	* @param {Object} entry A dictionary of instance properties.
	* @constructor
	*/
	function IntersectionObserverEntry(entry) {
		this.time = entry.time;
		this.target = entry.target;
		this.rootBounds = ensureDOMRect(entry.rootBounds);
		this.boundingClientRect = ensureDOMRect(entry.boundingClientRect);
		this.intersectionRect = ensureDOMRect(entry.intersectionRect || getEmptyRect());
		this.isIntersecting = !!entry.intersectionRect;
		var targetRect = this.boundingClientRect;
		var targetArea = targetRect.width * targetRect.height;
		var intersectionRect = this.intersectionRect;
		var intersectionArea = intersectionRect.width * intersectionRect.height;
		if (targetArea) this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
		else this.intersectionRatio = this.isIntersecting ? 1 : 0;
	}
	/**
	* Creates the global IntersectionObserver constructor.
	* https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
	* @param {Function} callback The function to be invoked after intersection
	*     changes have queued. The function is not invoked if the queue has
	*     been emptied by calling the `takeRecords` method.
	* @param {Object=} opt_options Optional configuration options.
	* @constructor
	*/
	function IntersectionObserver(callback, opt_options) {
		var options = opt_options || {};
		if (typeof callback != "function") throw new Error("callback must be a function");
		if (options.root && options.root.nodeType != 1 && options.root.nodeType != 9) throw new Error("root must be a Document or Element");
		this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);
		this._callback = callback;
		this._observationTargets = [];
		this._queuedEntries = [];
		this._rootMarginValues = this._parseRootMargin(options.rootMargin);
		this.thresholds = this._initThresholds(options.threshold);
		this.root = options.root || null;
		this.rootMargin = this._rootMarginValues.map(function(margin) {
			return margin.value + margin.unit;
		}).join(" ");
		/** @private @const {!Array<!Document>} */
		this._monitoringDocuments = [];
		/** @private @const {!Array<function()>} */
		this._monitoringUnsubscribes = [];
	}
	/**
	* The minimum interval within which the document will be checked for
	* intersection changes.
	*/
	IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;
	/**
	* The frequency in which the polyfill polls for intersection changes.
	* this can be updated on a per instance basis and must be set prior to
	* calling `observe` on the first target.
	*/
	IntersectionObserver.prototype.POLL_INTERVAL = null;
	/**
	* Use a mutation observer on the root element
	* to detect intersection changes.
	*/
	IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;
	/**
	* Sets up the polyfill in the cross-origin mode. The result is the
	* updater function that accepts two arguments: `boundingClientRect` and
	* `intersectionRect` - just as these fields would be available to the
	* parent via `IntersectionObserverEntry`. This function should be called
	* each time the iframe receives intersection information from the parent
	* window, e.g. via messaging.
	* @return {function(DOMRect|ClientRect, DOMRect|ClientRect)}
	*/
	IntersectionObserver._setupCrossOriginUpdater = function() {
		if (!crossOriginUpdater)
 /**
		* @param {DOMRect|ClientRect} boundingClientRect
		* @param {DOMRect|ClientRect} intersectionRect
		*/
		crossOriginUpdater = function(boundingClientRect, intersectionRect) {
			if (!boundingClientRect || !intersectionRect) crossOriginRect = getEmptyRect();
			else crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
			registry.forEach(function(observer) {
				observer._checkForIntersections();
			});
		};
		return crossOriginUpdater;
	};
	/**
	* Resets the cross-origin mode.
	*/
	IntersectionObserver._resetCrossOriginUpdater = function() {
		crossOriginUpdater = null;
		crossOriginRect = null;
	};
	/**
	* Starts observing a target element for intersection changes based on
	* the thresholds values.
	* @param {Element} target The DOM element to observe.
	*/
	IntersectionObserver.prototype.observe = function(target) {
		if (this._observationTargets.some(function(item) {
			return item.element == target;
		})) return;
		if (!(target && target.nodeType == 1)) throw new Error("target must be an Element");
		this._registerInstance();
		this._observationTargets.push({
			element: target,
			entry: null
		});
		this._monitorIntersections(target.ownerDocument);
		this._checkForIntersections();
	};
	/**
	* Stops observing a target element for intersection changes.
	* @param {Element} target The DOM element to observe.
	*/
	IntersectionObserver.prototype.unobserve = function(target) {
		this._observationTargets = this._observationTargets.filter(function(item) {
			return item.element != target;
		});
		this._unmonitorIntersections(target.ownerDocument);
		if (this._observationTargets.length == 0) this._unregisterInstance();
	};
	/**
	* Stops observing all target elements for intersection changes.
	*/
	IntersectionObserver.prototype.disconnect = function() {
		this._observationTargets = [];
		this._unmonitorAllIntersections();
		this._unregisterInstance();
	};
	/**
	* Returns any queue entries that have not yet been reported to the
	* callback and clears the queue. This can be used in conjunction with the
	* callback to obtain the absolute most up-to-date intersection information.
	* @return {Array} The currently queued entries.
	*/
	IntersectionObserver.prototype.takeRecords = function() {
		var records = this._queuedEntries.slice();
		this._queuedEntries = [];
		return records;
	};
	/**
	* Accepts the threshold value from the user configuration object and
	* returns a sorted array of unique threshold values. If a value is not
	* between 0 and 1 and error is thrown.
	* @private
	* @param {Array|number=} opt_threshold An optional threshold value or
	*     a list of threshold values, defaulting to [0].
	* @return {Array} A sorted list of unique and valid threshold values.
	*/
	IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
		var threshold = opt_threshold || [0];
		if (!Array.isArray(threshold)) threshold = [threshold];
		return threshold.sort().filter(function(t, i, a) {
			if (typeof t != "number" || isNaN(t) || t < 0 || t > 1) throw new Error("threshold must be a number between 0 and 1 inclusively");
			return t !== a[i - 1];
		});
	};
	/**
	* Accepts the rootMargin value from the user configuration object
	* and returns an array of the four margin values as an object containing
	* the value and unit properties. If any of the values are not properly
	* formatted or use a unit other than px or %, and error is thrown.
	* @private
	* @param {string=} opt_rootMargin An optional rootMargin value,
	*     defaulting to '0px'.
	* @return {Array<Object>} An array of margin objects with the keys
	*     value and unit.
	*/
	IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
		var margins = (opt_rootMargin || "0px").split(/\s+/).map(function(margin) {
			var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
			if (!parts) throw new Error("rootMargin must be specified in pixels or percent");
			return {
				value: parseFloat(parts[1]),
				unit: parts[2]
			};
		});
		margins[1] = margins[1] || margins[0];
		margins[2] = margins[2] || margins[0];
		margins[3] = margins[3] || margins[1];
		return margins;
	};
	/**
	* Starts polling for intersection changes if the polling is not already
	* happening, and if the page's visibility state is visible.
	* @param {!Document} doc
	* @private
	*/
	IntersectionObserver.prototype._monitorIntersections = function(doc) {
		var win = doc.defaultView;
		if (!win) return;
		if (this._monitoringDocuments.indexOf(doc) != -1) return;
		var callback = this._checkForIntersections;
		var monitoringInterval = null;
		var domObserver = null;
		if (this.POLL_INTERVAL) monitoringInterval = win.setInterval(callback, this.POLL_INTERVAL);
		else {
			addEvent(win, "resize", callback, true);
			addEvent(doc, "scroll", callback, true);
			if (this.USE_MUTATION_OBSERVER && "MutationObserver" in win) {
				domObserver = new win.MutationObserver(callback);
				domObserver.observe(doc, {
					attributes: true,
					childList: true,
					characterData: true,
					subtree: true
				});
			}
		}
		this._monitoringDocuments.push(doc);
		this._monitoringUnsubscribes.push(function() {
			var win = doc.defaultView;
			if (win) {
				if (monitoringInterval) win.clearInterval(monitoringInterval);
				removeEvent(win, "resize", callback, true);
			}
			removeEvent(doc, "scroll", callback, true);
			if (domObserver) domObserver.disconnect();
		});
		if (doc != (this.root && (this.root.ownerDocument || this.root) || document)) {
			var frame = getFrameElement(doc);
			if (frame) this._monitorIntersections(frame.ownerDocument);
		}
	};
	/**
	* Stops polling for intersection changes.
	* @param {!Document} doc
	* @private
	*/
	IntersectionObserver.prototype._unmonitorIntersections = function(doc) {
		var index = this._monitoringDocuments.indexOf(doc);
		if (index == -1) return;
		var rootDoc = this.root && (this.root.ownerDocument || this.root) || document;
		if (this._observationTargets.some(function(item) {
			var itemDoc = item.element.ownerDocument;
			if (itemDoc == doc) return true;
			while (itemDoc && itemDoc != rootDoc) {
				var frame = getFrameElement(itemDoc);
				itemDoc = frame && frame.ownerDocument;
				if (itemDoc == doc) return true;
			}
			return false;
		})) return;
		var unsubscribe = this._monitoringUnsubscribes[index];
		this._monitoringDocuments.splice(index, 1);
		this._monitoringUnsubscribes.splice(index, 1);
		unsubscribe();
		if (doc != rootDoc) {
			var frame = getFrameElement(doc);
			if (frame) this._unmonitorIntersections(frame.ownerDocument);
		}
	};
	/**
	* Stops polling for intersection changes.
	* @param {!Document} doc
	* @private
	*/
	IntersectionObserver.prototype._unmonitorAllIntersections = function() {
		var unsubscribes = this._monitoringUnsubscribes.slice(0);
		this._monitoringDocuments.length = 0;
		this._monitoringUnsubscribes.length = 0;
		for (var i = 0; i < unsubscribes.length; i++) unsubscribes[i]();
	};
	/**
	* Scans each observation target for intersection changes and adds them
	* to the internal entries queue. If new entries are found, it
	* schedules the callback to be invoked.
	* @private
	*/
	IntersectionObserver.prototype._checkForIntersections = function() {
		if (!this.root && crossOriginUpdater && !crossOriginRect) return;
		var rootIsInDom = this._rootIsInDom();
		var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();
		this._observationTargets.forEach(function(item) {
			var target = item.element;
			var targetRect = getBoundingClientRect(target);
			var rootContainsTarget = this._rootContainsTarget(target);
			var oldEntry = item.entry;
			var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, targetRect, rootRect);
			var rootBounds = null;
			if (!this._rootContainsTarget(target)) rootBounds = getEmptyRect();
			else if (!crossOriginUpdater || this.root) rootBounds = rootRect;
			var newEntry = item.entry = new IntersectionObserverEntry({
				time: now(),
				target,
				boundingClientRect: targetRect,
				rootBounds,
				intersectionRect
			});
			if (!oldEntry) this._queuedEntries.push(newEntry);
			else if (rootIsInDom && rootContainsTarget) {
				if (this._hasCrossedThreshold(oldEntry, newEntry)) this._queuedEntries.push(newEntry);
			} else if (oldEntry && oldEntry.isIntersecting) this._queuedEntries.push(newEntry);
		}, this);
		if (this._queuedEntries.length) this._callback(this.takeRecords(), this);
	};
	/**
	* Accepts a target and root rect computes the intersection between then
	* following the algorithm in the spec.
	* TODO(philipwalton): at this time clip-path is not considered.
	* https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
	* @param {Element} target The target DOM element
	* @param {Object} targetRect The bounding rect of the target.
	* @param {Object} rootRect The bounding rect of the root after being
	*     expanded by the rootMargin value.
	* @return {?Object} The final intersection rect object or undefined if no
	*     intersection is found.
	* @private
	*/
	IntersectionObserver.prototype._computeTargetAndRootIntersection = function(target, targetRect, rootRect) {
		if (window.getComputedStyle(target).display == "none") return;
		var intersectionRect = targetRect;
		var parent = getParentNode(target);
		var atRoot = false;
		while (!atRoot && parent) {
			var parentRect = null;
			var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};
			if (parentComputedStyle.display == "none") return null;
			if (parent == this.root || parent.nodeType == 9) {
				atRoot = true;
				if (parent == this.root || parent == document) if (crossOriginUpdater && !this.root) if (!crossOriginRect || crossOriginRect.width == 0 && crossOriginRect.height == 0) {
					parent = null;
					parentRect = null;
					intersectionRect = null;
				} else parentRect = crossOriginRect;
				else parentRect = rootRect;
				else {
					var frame = getParentNode(parent);
					var frameRect = frame && getBoundingClientRect(frame);
					var frameIntersect = frame && this._computeTargetAndRootIntersection(frame, frameRect, rootRect);
					if (frameRect && frameIntersect) {
						parent = frame;
						parentRect = convertFromParentRect(frameRect, frameIntersect);
					} else {
						parent = null;
						intersectionRect = null;
					}
				}
			} else {
				var doc = parent.ownerDocument;
				if (parent != doc.body && parent != doc.documentElement && parentComputedStyle.overflow != "visible") parentRect = getBoundingClientRect(parent);
			}
			if (parentRect) intersectionRect = computeRectIntersection(parentRect, intersectionRect);
			if (!intersectionRect) break;
			parent = parent && getParentNode(parent);
		}
		return intersectionRect;
	};
	/**
	* Returns the root rect after being expanded by the rootMargin value.
	* @return {ClientRect} The expanded root rect.
	* @private
	*/
	IntersectionObserver.prototype._getRootRect = function() {
		var rootRect;
		if (this.root && !isDoc(this.root)) rootRect = getBoundingClientRect(this.root);
		else {
			var doc = isDoc(this.root) ? this.root : document;
			var html = doc.documentElement;
			var body = doc.body;
			rootRect = {
				top: 0,
				left: 0,
				right: html.clientWidth || body.clientWidth,
				width: html.clientWidth || body.clientWidth,
				bottom: html.clientHeight || body.clientHeight,
				height: html.clientHeight || body.clientHeight
			};
		}
		return this._expandRectByRootMargin(rootRect);
	};
	/**
	* Accepts a rect and expands it by the rootMargin value.
	* @param {DOMRect|ClientRect} rect The rect object to expand.
	* @return {ClientRect} The expanded rect.
	* @private
	*/
	IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
		var margins = this._rootMarginValues.map(function(margin, i) {
			return margin.unit == "px" ? margin.value : margin.value * (i % 2 ? rect.width : rect.height) / 100;
		});
		var newRect = {
			top: rect.top - margins[0],
			right: rect.right + margins[1],
			bottom: rect.bottom + margins[2],
			left: rect.left - margins[3]
		};
		newRect.width = newRect.right - newRect.left;
		newRect.height = newRect.bottom - newRect.top;
		return newRect;
	};
	/**
	* Accepts an old and new entry and returns true if at least one of the
	* threshold values has been crossed.
	* @param {?IntersectionObserverEntry} oldEntry The previous entry for a
	*    particular target element or null if no previous entry exists.
	* @param {IntersectionObserverEntry} newEntry The current entry for a
	*    particular target element.
	* @return {boolean} Returns true if a any threshold has been crossed.
	* @private
	*/
	IntersectionObserver.prototype._hasCrossedThreshold = function(oldEntry, newEntry) {
		var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
		var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;
		if (oldRatio === newRatio) return;
		for (var i = 0; i < this.thresholds.length; i++) {
			var threshold = this.thresholds[i];
			if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) return true;
		}
	};
	/**
	* Returns whether or not the root element is an element and is in the DOM.
	* @return {boolean} True if the root element is an element and is in the DOM.
	* @private
	*/
	IntersectionObserver.prototype._rootIsInDom = function() {
		return !this.root || containsDeep(document, this.root);
	};
	/**
	* Returns whether or not the target element is a child of root.
	* @param {Element} target The target element to check.
	* @return {boolean} True if the target element is a child of root.
	* @private
	*/
	IntersectionObserver.prototype._rootContainsTarget = function(target) {
		var rootDoc = this.root && (this.root.ownerDocument || this.root) || document;
		return containsDeep(rootDoc, target) && (!this.root || rootDoc == target.ownerDocument);
	};
	/**
	* Adds the instance to the global IntersectionObserver registry if it isn't
	* already present.
	* @private
	*/
	IntersectionObserver.prototype._registerInstance = function() {
		if (registry.indexOf(this) < 0) registry.push(this);
	};
	/**
	* Removes the instance from the global IntersectionObserver registry.
	* @private
	*/
	IntersectionObserver.prototype._unregisterInstance = function() {
		var index = registry.indexOf(this);
		if (index != -1) registry.splice(index, 1);
	};
	/**
	* Returns the result of the performance.now() method or null in browsers
	* that don't support the API.
	* @return {number} The elapsed time since the page was requested.
	*/
	function now() {
		return window.performance && performance.now && performance.now();
	}
	/**
	* Throttles a function and delays its execution, so it's only called at most
	* once within a given time period.
	* @param {Function} fn The function to throttle.
	* @param {number} timeout The amount of time that must pass before the
	*     function can be called again.
	* @return {Function} The throttled function.
	*/
	function throttle(fn, timeout) {
		var timer = null;
		return function() {
			if (!timer) timer = setTimeout(function() {
				fn();
				timer = null;
			}, timeout);
		};
	}
	/**
	* Adds an event handler to a DOM node ensuring cross-browser compatibility.
	* @param {Node} node The DOM node to add the event handler to.
	* @param {string} event The event name.
	* @param {Function} fn The event handler to add.
	* @param {boolean} opt_useCapture Optionally adds the even to the capture
	*     phase. Note: this only works in modern browsers.
	*/
	function addEvent(node, event, fn, opt_useCapture) {
		if (typeof node.addEventListener == "function") node.addEventListener(event, fn, opt_useCapture || false);
		else if (typeof node.attachEvent == "function") node.attachEvent("on" + event, fn);
	}
	/**
	* Removes a previously added event handler from a DOM node.
	* @param {Node} node The DOM node to remove the event handler from.
	* @param {string} event The event name.
	* @param {Function} fn The event handler to remove.
	* @param {boolean} opt_useCapture If the event handler was added with this
	*     flag set to true, it should be set to true here in order to remove it.
	*/
	function removeEvent(node, event, fn, opt_useCapture) {
		if (typeof node.removeEventListener == "function") node.removeEventListener(event, fn, opt_useCapture || false);
		else if (typeof node.detatchEvent == "function") node.detatchEvent("on" + event, fn);
	}
	/**
	* Returns the intersection between two rect objects.
	* @param {Object} rect1 The first rect.
	* @param {Object} rect2 The second rect.
	* @return {?Object|?ClientRect} The intersection rect or undefined if no
	*     intersection is found.
	*/
	function computeRectIntersection(rect1, rect2) {
		var top = Math.max(rect1.top, rect2.top);
		var bottom = Math.min(rect1.bottom, rect2.bottom);
		var left = Math.max(rect1.left, rect2.left);
		var right = Math.min(rect1.right, rect2.right);
		var width = right - left;
		var height = bottom - top;
		return width >= 0 && height >= 0 && {
			top,
			bottom,
			left,
			right,
			width,
			height
		} || null;
	}
	/**
	* Shims the native getBoundingClientRect for compatibility with older IE.
	* @param {Element} el The element whose bounding rect to get.
	* @return {DOMRect|ClientRect} The (possibly shimmed) rect of the element.
	*/
	function getBoundingClientRect(el) {
		var rect;
		try {
			rect = el.getBoundingClientRect();
		} catch (err) {}
		if (!rect) return getEmptyRect();
		if (!(rect.width && rect.height)) rect = {
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom,
			left: rect.left,
			width: rect.right - rect.left,
			height: rect.bottom - rect.top
		};
		return rect;
	}
	/**
	* Returns an empty rect object. An empty rect is returned when an element
	* is not in the DOM.
	* @return {ClientRect} The empty rect.
	*/
	function getEmptyRect() {
		return {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			width: 0,
			height: 0
		};
	}
	/**
	* Ensure that the result has all of the necessary fields of the DOMRect.
	* Specifically this ensures that `x` and `y` fields are set.
	*
	* @param {?DOMRect|?ClientRect} rect
	* @return {?DOMRect}
	*/
	function ensureDOMRect(rect) {
		if (!rect || "x" in rect) return rect;
		return {
			top: rect.top,
			y: rect.top,
			bottom: rect.bottom,
			left: rect.left,
			x: rect.left,
			right: rect.right,
			width: rect.width,
			height: rect.height
		};
	}
	/**
	* Inverts the intersection and bounding rect from the parent (frame) BCR to
	* the local BCR space.
	* @param {DOMRect|ClientRect} parentBoundingRect The parent's bound client rect.
	* @param {DOMRect|ClientRect} parentIntersectionRect The parent's own intersection rect.
	* @return {ClientRect} The local root bounding rect for the parent's children.
	*/
	function convertFromParentRect(parentBoundingRect, parentIntersectionRect) {
		var top = parentIntersectionRect.top - parentBoundingRect.top;
		var left = parentIntersectionRect.left - parentBoundingRect.left;
		return {
			top,
			left,
			height: parentIntersectionRect.height,
			width: parentIntersectionRect.width,
			bottom: top + parentIntersectionRect.height,
			right: left + parentIntersectionRect.width
		};
	}
	/**
	* Checks to see if a parent element contains a child element (including inside
	* shadow DOM).
	* @param {Node} parent The parent element.
	* @param {Node} child The child element.
	* @return {boolean} True if the parent node contains the child node.
	*/
	function containsDeep(parent, child) {
		var node = child;
		while (node) {
			if (node == parent) return true;
			node = getParentNode(node);
		}
		return false;
	}
	/**
	* Gets the parent node of an element or its host element if the parent node
	* is a shadow root.
	* @param {Node} node The node whose parent to get.
	* @return {Node|null} The parent node or null if no parent exists.
	*/
	function getParentNode(node) {
		var parent = node.parentNode;
		if (node.nodeType == 9 && node != document) return getFrameElement(node);
		if (parent && parent.assignedSlot) parent = parent.assignedSlot.parentNode;
		if (parent && parent.nodeType == 11 && parent.host) return parent.host;
		return parent;
	}
	/**
	* Returns true if `node` is a Document.
	* @param {!Node} node
	* @returns {boolean}
	*/
	function isDoc(node) {
		return node && node.nodeType === 9;
	}
	window.IntersectionObserver = IntersectionObserver;
	window.IntersectionObserverEntry = IntersectionObserverEntry;
};
//#endregion
//#region ../uni-api/src/helpers/requestComponentObserver.ts
function normalizeRect(rect) {
	const { bottom, height, left, right, top, width } = rect || {};
	return {
		bottom,
		height,
		left,
		right,
		top,
		width
	};
}
function rectifyIntersectionRatio(entrie) {
	const { intersectionRatio, boundingClientRect: { height: overAllHeight, width: overAllWidth }, intersectionRect: { height: intersectionHeight, width: intersectionWidth } } = entrie;
	if (intersectionRatio !== 0) return intersectionRatio;
	return intersectionHeight === overAllHeight ? intersectionWidth / overAllWidth : intersectionHeight / overAllHeight;
}
function requestComponentObserver($el, options, callback) {
	initIntersectionObserverPolyfill();
	const root = options.relativeToSelector ? $el.querySelector(options.relativeToSelector) : null;
	const intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entrie) => {
			callback({
				intersectionRatio: rectifyIntersectionRatio(entrie),
				intersectionRect: normalizeRect(entrie.intersectionRect),
				boundingClientRect: normalizeRect(entrie.boundingClientRect),
				relativeRect: normalizeRect(entrie.rootBounds),
				time: Date.now(),
				dataset: getCustomDataset(entrie.target),
				id: entrie.target.id
			});
		});
	}, {
		root,
		rootMargin: options.rootMargin,
		threshold: options.thresholds
	});
	if (options.observeAll) {
		intersectionObserver.USE_MUTATION_OBSERVER = true;
		const nodeList = $el.querySelectorAll(options.selector);
		for (let i = 0; i < nodeList.length; i++) intersectionObserver.observe(nodeList[i]);
	} else {
		intersectionObserver.USE_MUTATION_OBSERVER = false;
		const el = $el.matches(options.selector) ? $el : $el.querySelector(options.selector);
		if (!el) console.warn(`Node ${options.selector} is not found. Intersection observer will not trigger.`);
		else intersectionObserver.observe(el);
	}
	return intersectionObserver;
}
//#endregion
//#region src/service/api/route/switchTab.ts
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
		invokeHook(curTabBarPageVm, ON_HIDE);
	}
}
/**
* 判断 url 和 page 是否为同一个页面
* @param url 目标页
* @param $page 页面栈中的某个页面
* @returns boolean
*/
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
var switchTab = /*#__PURE__*/ defineAsyncApi(API_SWITCH_TAB, ({ url, tabBarText, isAutomatedTesting }, { resolve, reject }) => {
	if (!entryPageState.handledBeforeEntryPageRoutes) {
		switchTabPagesBeforeEntryPages.push({
			args: {
				type: API_SWITCH_TAB,
				url,
				tabBarText,
				isAutomatedTesting
			},
			resolve,
			reject
		});
		return;
	}
	return removeNonTabBarPages(), navigate({
		type: API_SWITCH_TAB,
		url,
		tabBarText,
		isAutomatedTesting
	}, getTabBarPageId(url)).then(resolve).catch(reject);
}, SwitchTabProtocol, SwitchTabOptions);
//#endregion
//#region src/service/api/route/redirectTo.ts
function removeLastPage() {
	var _getCurrentPage;
	const page = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
	if (!page) return;
	const $page = getPage$BasePage(page);
	removePage(normalizeRouteKey($page.path, $page.id));
}
var redirectTo = /*#__PURE__*/ defineAsyncApi(API_REDIRECT_TO, ({ url, isAutomatedTesting }, { resolve, reject }) => {
	if (!entryPageState.handledBeforeEntryPageRoutes) {
		redirectToPagesBeforeEntryPages.push({
			args: {
				type: API_REDIRECT_TO,
				url,
				isAutomatedTesting
			},
			resolve,
			reject
		});
		return;
	}
	return removeLastPage(), navigate({
		type: API_REDIRECT_TO,
		url,
		isAutomatedTesting
	}).then(resolve).catch(reject);
}, RedirectToProtocol, RedirectToOptions);
//#endregion
//#region src/service/api/route/reLaunch.ts
function removeAllPages() {
	const keys = getCurrentPagesMap().keys();
	for (const routeKey of keys) removePage(routeKey);
}
var reLaunch = /*#__PURE__*/ defineAsyncApi(API_RE_LAUNCH, ({ url, isAutomatedTesting }, { resolve, reject }) => {
	if (!entryPageState.handledBeforeEntryPageRoutes) {
		reLaunchPagesBeforeEntryPages.push({
			args: {
				type: API_RE_LAUNCH,
				url,
				isAutomatedTesting
			},
			resolve,
			reject
		});
		return;
	}
	return removeAllPages(), navigate({
		type: API_RE_LAUNCH,
		url,
		isAutomatedTesting
	}).then(resolve).catch(reject);
}, ReLaunchProtocol, ReLaunchOptions);
//#endregion
//#region src/service/api/route/utils.ts
function navigate({ type, url, tabBarText, events, isAutomatedTesting }, __id__) {
	if (process.env.NODE_ENV !== "production" && !__UNI_FEATURE_PAGES__) console.warn("当前项目为单页面工程，不能执行页面跳转api。如果需进行页面跳转， 需要在pages.json文件的pages字段中配置多个页面，然后重新运行。");
	const router = getApp().vm.$router;
	const { path, query } = parseUrl(url);
	return new Promise((resolve, reject) => {
		const state = createPageState(type, __id__);
		router[type === "navigateTo" ? "push" : "replace"]({
			path,
			query,
			state,
			force: true
		}).then((failure) => {
			if (isNavigationFailure(failure)) return reject(failure.message);
			if (type === "switchTab") router.currentRoute.value.meta.tabBarText = tabBarText;
			if (type === "navigateTo") {
				const meta = router.currentRoute.value.meta;
				if (!meta.eventChannel) meta.eventChannel = new EventChannel(state.__id__, events);
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
//#endregion
//#region src/framework/setup/state.ts
var tabBar;
function useTabBar() {
	if (!tabBar) tabBar = __uniConfig.tabBar && reactive(initTabBarI18n(__uniConfig.tabBar));
	return tabBar;
}
//#endregion
//#region src/service/api/base/canIUse.ts
function cssSupports(css) {
	const supports = window.CSS && window.CSS.supports;
	return supports && (supports(css) || supports.apply(window.CSS, css.split(":")));
}
var cssVar = /*#__PURE__*/ cssSupports("--a:0");
var cssEnv = /*#__PURE__*/ cssSupports("top:env(a)");
var cssConstant = /*#__PURE__*/ cssSupports("top:constant(a)");
var cssBackdropFilter = /*#__PURE__*/ cssSupports("backdrop-filter:blur(10px)");
var SCHEMA_CSS = {
	"css.var": cssVar,
	"css.env": cssEnv,
	"css.constant": cssConstant,
	"css.backdrop-filter": cssBackdropFilter
};
var canIUse = /*#__PURE__*/ defineSyncApi(API_CAN_I_USE, (schema) => {
	if (hasOwn(SCHEMA_CSS, schema)) return SCHEMA_CSS[schema];
	if (hasOwn(uni, schema)) return true;
	return false;
}, CanIUseProtocol);
//#endregion
//#region src/helpers/cssVar.ts
var envMethod = /*#__PURE__*/ (() => cssEnv ? "env" : cssConstant ? "constant" : "")();
function updateCurPageCssVar(pageMeta) {
	let windowTopValue = 0;
	let windowBottomValue = 0;
	if (__UNI_FEATURE_NAVIGATIONBAR__ && pageMeta.navigationBar.style !== "custom" && ["default", "float"].indexOf(pageMeta.navigationBar.type) > -1) windowTopValue = NAVBAR_HEIGHT;
	if (__UNI_FEATURE_TABBAR__ && pageMeta.isTabBar) {
		const tabBar = useTabBar();
		tabBar.shown && (windowBottomValue = parseInt(tabBar.height));
	}
	updatePageCssVar({
		"--window-top": normalizeWindowTop(windowTopValue),
		"--window-bottom": normalizeWindowBottom(windowBottomValue)
	});
}
function normalizeWindowTop(windowTop) {
	return envMethod ? `calc(${windowTop}px + ${envMethod}(safe-area-inset-top))` : `${windowTop}px`;
}
function normalizeWindowBottom(windowBottom) {
	return envMethod ? `calc(${windowBottom}px + ${envMethod}(safe-area-inset-bottom))` : `${windowBottom}px`;
}
//#endregion
//#region src/helpers/dom.ts
function checkMinWidth(minWidth) {
	const screen = window.screen;
	const documentElement = document.documentElement;
	const sizes = [
		window.outerWidth,
		window.outerHeight,
		screen.width,
		screen.height,
		documentElement.clientWidth,
		documentElement.clientHeight
	];
	return Math.max.apply(null, sizes) > minWidth;
}
function getStateId() {
	return history.state && history.state.__id__ || 1;
}
//#endregion
//#region src/helpers/safeArea.ts
function getPageWrapperInfo(pageBody) {
	const pageWrapperRect = (pageBody || document.querySelector("uni-page-wrapper")).getBoundingClientRect();
	const bodyRect = document.body.getBoundingClientRect();
	return {
		top: pageWrapperRect.top,
		left: pageWrapperRect.left,
		right: bodyRect.right - pageWrapperRect.right,
		bottom: bodyRect.bottom - pageWrapperRect.bottom,
		width: pageWrapperRect.width,
		height: pageWrapperRect.height
	};
}
var getSystemSafeAreaInsets = function() {
	return {
		top: import_out.default.top,
		right: import_out.default.right,
		bottom: import_out.default.bottom,
		left: import_out.default.left
	};
};
/**
* 注意web端页面安全区域较为特殊，如下四个值主要为满足fixed定位时能避开系统安全区域及页面top-window、left-window、nav-bar、tab-bar等的边界
*/
function getSafeAreaInsets(pageBody) {
	const pageWrapperEdge = getPageWrapperInfo(pageBody);
	const systemSafeAreaInsets = getSystemSafeAreaInsets();
	return {
		top: Math.max(pageWrapperEdge.top, systemSafeAreaInsets.top),
		left: Math.max(pageWrapperEdge.left, systemSafeAreaInsets.left),
		right: Math.max(pageWrapperEdge.right, systemSafeAreaInsets.right),
		bottom: Math.max(pageWrapperEdge.bottom, systemSafeAreaInsets.bottom)
	};
}
//#endregion
//#region src/x/framework/setup/page.ts
var escBackPageNum = 0;
var homeDialogPages = [];
var homeSystemDialogPages = [];
function getPageElement(page) {
	var _page$vm;
	const currentPage = getCurrentPage();
	if (page !== currentPage) {
		const dialogPages = currentPage.getDialogPages();
		if (dialogPages[dialogPages.length - 1] !== page) {
			const systemDialogPages = currentPage.vm.$pageLayoutInstance.$systemDialogPages.value;
			if (systemDialogPages[systemDialogPages.length - 1] !== page) throw new Error("Can't get element of other page");
		}
	}
	const pageEle = document.querySelector(`uni-page[data-page="${(_page$vm = page.vm) === null || _page$vm === void 0 ? void 0 : _page$vm.route}"]`);
	if (!pageEle) throw new Error("page not found");
	return pageEle;
}
var UniPageImpl = class {
	get statusBarHeight() {
		return import_out.default.top;
	}
	get width() {
		return this.pageBody.width;
	}
	get height() {
		const pageHead = getPageElement(this).querySelector("uni-page-head");
		return this.pageBody.height + (pageHead ? pageHead.clientHeight : 0);
	}
	get pageBody() {
		const pageWrapperInfo = getPageWrapperInfo(getPageElement(this).querySelector("uni-page-wrapper"));
		return {
			top: pageWrapperInfo.top,
			left: pageWrapperInfo.left,
			right: pageWrapperInfo.left + pageWrapperInfo.width,
			bottom: pageWrapperInfo.top + pageWrapperInfo.height,
			width: pageWrapperInfo.width,
			height: pageWrapperInfo.height
		};
	}
	get safeAreaInsets() {
		return getSafeAreaInsets(getPageElement(this).querySelector("uni-page-wrapper"));
	}
	getPageStyle() {
		var _this$vm, _this$vm2;
		const pageMeta = ((_this$vm = this.vm) === null || _this$vm === void 0 ? void 0 : _this$vm.$basePage.meta) ? normalizeStyles((_this$vm2 = this.vm) === null || _this$vm2 === void 0 ? void 0 : _this$vm2.$basePage.meta, __uniConfig.themeConfig) : void 0;
		return pageMeta ? new UTSJSONObject$1({
			navigationBarBackgroundColor: pageMeta.navigationBar.backgroundColor,
			navigationBarTextStyle: pageMeta.navigationBar.titleColor,
			navigationBarTitleText: pageMeta.navigationBar.titleText,
			titleImage: pageMeta.navigationBar.titleImage || "",
			navigationStyle: pageMeta.navigationBar.style || "default",
			disableScroll: pageMeta.disableScroll || false,
			enablePullDownRefresh: pageMeta.enablePullDownRefresh || false,
			onReachBottomDistance: pageMeta.onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE,
			backgroundColorContent: pageMeta.backgroundColorContent
		}) : new UTSJSONObject$1({});
	}
	$getPageStyle() {
		return this.getPageStyle();
	}
	setPageStyle(style) {
		var _this$vm3;
		const pageMeta = (_this$vm3 = this.vm) === null || _this$vm3 === void 0 ? void 0 : _this$vm3.$basePage.meta;
		if (!pageMeta) return;
		for (const key in style) switch (key) {
			case "navigationBarBackgroundColor":
				pageMeta.navigationBar.backgroundColor = style[key];
				break;
			case "navigationBarTextStyle":
				const textStyle = style[key];
				if (textStyle == null) continue;
				pageMeta.navigationBar.titleColor = ["black", "white"].includes(textStyle) ? normalizeTitleColor(textStyle || "") : textStyle;
				break;
			case "navigationBarTitleText":
				pageMeta.navigationBar.titleText = style[key];
				break;
			case "titleImage":
				pageMeta.navigationBar.titleImage = style[key];
				break;
			case "navigationStyle":
				pageMeta.navigationBar.style = style[key];
				break;
			default:
				pageMeta[key] = style[key];
				break;
		}
	}
	$setPageStyle(style) {
		this.setPageStyle(style);
	}
	getElementById(id) {
		if (getCurrentPage() !== this) return null;
		const uniPageBody = document.querySelector("uni-page-body");
		return uniPageBody ? uniPageBody.querySelector(`#${id}`) : null;
	}
	querySelector(selector) {
		if (getCurrentPage() !== this) return null;
		const uniPageBody = document.querySelector("uni-page-body");
		return uniPageBody ? uniPageBody.querySelector(selector) : null;
	}
	querySelectorAll(selector) {
		const res = [];
		if (getCurrentPage() !== this) return res;
		const uniPageBody = document.querySelector("uni-page-body");
		if (!uniPageBody) return res;
		uniPageBody.querySelectorAll(selector).forEach((node) => {
			res.push(node);
		});
		return res;
	}
	getAndroidView() {
		return null;
	}
	getIOSView() {
		return null;
	}
	getHTMLElement() {
		if (getCurrentPage() !== this) return null;
		return document.querySelector("uni-page-body");
	}
	getDialogPages() {
		return [];
	}
	$getSystemDialogPages() {
		var _this$vm4;
		return ((_this$vm4 = this.vm) === null || _this$vm4 === void 0 || (_this$vm4 = _this$vm4.$pageLayoutInstance) === null || _this$vm4 === void 0 || (_this$vm4 = _this$vm4.$systemDialogPages) === null || _this$vm4 === void 0 ? void 0 : _this$vm4.value) || [];
	}
	__$$getSystemDialogPages() {
		return [];
	}
	getAndroidActivity() {
		return null;
	}
	exitFullscreen() {}
	createElement() {
		return null;
	}
	onLayoutChange() {
		return -1;
	}
	offLayoutChange() {}
	onRenderChange() {
		return -1;
	}
	offRenderChange() {}
	onTouchStart() {
		return -1;
	}
	offTouchStart() {}
	onTouchEnd() {
		return -1;
	}
	offTouchEnd() {}
	takeSnapshot() {}
	constructor({ route, options, vm }) {
		this.getParentPage = () => null;
		this.route = (vm === null || vm === void 0 ? void 0 : vm.route) || route;
		this.options = options;
		this.vm = vm;
		this.$vm = vm;
	}
};
var UniNormalPageImpl = class extends UniPageImpl {
	getDialogPages() {
		var _this$vm5;
		return ((_this$vm5 = this.vm) === null || _this$vm5 === void 0 || (_this$vm5 = _this$vm5.$pageLayoutInstance) === null || _this$vm5 === void 0 ? void 0 : _this$vm5.$dialogPages.value) || [];
	}
	constructor({ route, options, vm }) {
		super({
			route,
			options,
			vm
		});
	}
};
var UniDialogPageImpl = class extends UniPageImpl {
	getElementById(id) {
		var _this$vm6;
		if (getCurrentPage() !== this.getParentPage()) return null;
		const uniPageBody = document.querySelector(`uni-page[data-page="${(_this$vm6 = this.vm) === null || _this$vm6 === void 0 ? void 0 : _this$vm6.route}"] uni-page-body`);
		return uniPageBody ? uniPageBody.querySelector(`#${id}`) : null;
	}
	getHTMLElement() {
		var _this$vm7;
		if (getCurrentPage() !== this.getParentPage()) return null;
		return document.querySelector(`uni-page[data-page="${(_this$vm7 = this.vm) === null || _this$vm7 === void 0 ? void 0 : _this$vm7.route}"] uni-page-body`);
	}
	constructor({ route, options, $component, $triggerParentHide, getParentPage, $disableEscBack = false }) {
		super({
			route,
			options,
			vm: null
		});
		this.$component = null;
		this.$disableEscBack = false;
		this.$triggerParentHide = false;
		this.$component = markRaw($component);
		this.getParentPage = getParentPage;
		this.$disableEscBack = !!$disableEscBack;
		this.$triggerParentHide = !!$triggerParentHide;
	}
};
function initXPage(vm, route, page) {
	initPageVm(vm, page);
	if (!("$pageLayoutInstance" in vm)) Object.defineProperty(vm, "$pageLayoutInstance", { get() {
		var _vm$$, _res$type;
		let res = (_vm$$ = vm.$) === null || _vm$$ === void 0 ? void 0 : _vm$$.parent;
		while (res && ((_res$type = res.type) === null || _res$type === void 0 ? void 0 : _res$type.name) !== "Page") res = res.parent;
		return res;
	} });
	vm.$.$waitNativeRender = (callback) => {
		vm.$nextTick(() => {
			callback && callback();
		});
	};
	const pageInstance = vm.$pageLayoutInstance;
	if (!isDialogPageInstance(pageInstance)) {
		var _vm$$pageLayoutInstan;
		const uniPage = new UniNormalPageImpl({
			route: (route === null || route === void 0 ? void 0 : route.path) ? removeLeadingSlash(route === null || route === void 0 ? void 0 : route.path) : "",
			options: new UTSJSONObject$1((route === null || route === void 0 ? void 0 : route.query) || {}),
			vm
		});
		vm.$.page = uniPage;
		vm.$dialogPage = (_vm$$pageLayoutInstan = vm.$pageLayoutInstance) === null || _vm$$pageLayoutInstan === void 0 ? void 0 : _vm$$pageLayoutInstan.$dialogPage;
		currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm);
		if (currentPagesMap.size === 1) {
			setTimeout(() => {
				handleBeforeEntryPageRoutes();
			}, 0);
			if (homeDialogPages.length) {
				homeDialogPages.forEach((dialogPage) => {
					dialogPage.getParentPage = () => vm.$page;
					pageInstance.$dialogPages.value.push(dialogPage);
				});
				homeDialogPages.length = 0;
			}
			if (homeSystemDialogPages.length) {
				homeSystemDialogPages.forEach((dialogPage) => {
					dialogPage.getParentPage = () => vm.$page;
					pageInstance.$systemDialogPages.value.push(dialogPage);
				});
				homeSystemDialogPages.length = 0;
			}
		}
	} else {
		var _vm$$pageLayoutInstan2;
		vm.$.page = (_vm$$pageLayoutInstan2 = vm.$pageLayoutInstance) === null || _vm$$pageLayoutInstan2 === void 0 ? void 0 : _vm$$pageLayoutInstan2.$dialogPage;
		pageInstance.$dialogPage.vm = vm;
		pageInstance.$dialogPage.$vm = vm;
		vm.$basePage.fullPath = vm.$basePage.path;
		const parentPage = vm.$page.getParentPage();
		if (parentPage) {
			if (!parentPage.vm.$dialogPagesNum) parentPage.vm.$dialogPagesNum = 0;
			parentPage.vm.$dialogPagesNum++;
			vm.$basePage.id = parentPage.vm.$basePage.id * 10 + parentPage.vm.$dialogPagesNum;
		}
	}
}
function useBackgroundColorContent$1(vm) {
	vm && watchEffect(() => {
		const uniPageBody = document.querySelector(`uni-page[data-page="${vm.route}"] uni-page-body`);
		if (uniPageBody && vm.$basePage.meta.backgroundColorContent) uniPageBody.style.backgroundColor = vm.$basePage.meta.backgroundColorContent;
	});
}
function handleEscKeyPress(event) {
	if (event.key === "Escape") {
		const dialogPages = getCurrentPage().getDialogPages();
		const dialogPage = dialogPages[dialogPages.length - 1];
		if (!dialogPage.$disableEscBack) closeDialogPage({ dialogPage });
	}
}
function incrementEscBackPageNum() {
	escBackPageNum++;
	if (escBackPageNum === 1) document.addEventListener("keydown", handleEscKeyPress);
}
function decrementEscBackPageNum() {
	escBackPageNum--;
	if (escBackPageNum === 0) document.removeEventListener("keydown", handleEscKeyPress);
}
//#endregion
//#region src/x/service/api/route/closeDialogPage.ts
var closeDialogPage = (options) => {
	var _options$success, _options$complete;
	const currentPages = getCurrentPages();
	const currentPage = currentPages[currentPages.length - 1];
	if (!currentPage) {
		triggerFailCallback$1(options, "currentPage is null");
		return;
	}
	if (options === null || options === void 0 ? void 0 : options.dialogPage) {
		const dialogPage = options === null || options === void 0 ? void 0 : options.dialogPage;
		const parentPage = dialogPage.getParentPage();
		if (!isSystemDialogPage(dialogPage)) if (parentPage && (parentPage.vm.$basePage.meta.isTabBar || currentPages.indexOf(parentPage) !== -1)) {
			const parentDialogPages = parentPage.getDialogPages();
			const index = parentDialogPages.indexOf(dialogPage);
			invokeHook(dialogPage.vm, ON_UNLOAD);
			parentDialogPages.splice(index, 1);
			if (index === parentDialogPages.length) dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_SHOW);
			dialogPageTriggerParentShow(dialogPage, 1);
			if (!dialogPage.$disableEscBack) decrementEscBackPageNum();
		} else {
			triggerFailCallback$1(options, "dialogPage is not a valid page");
			return;
		}
		else {
			var _vm;
			const parentSystemDialogPages = (_vm = parentPage.vm) === null || _vm === void 0 || (_vm = _vm.$pageLayoutInstance) === null || _vm === void 0 || (_vm = _vm.$systemDialogPages) === null || _vm === void 0 ? void 0 : _vm.value;
			if (!parentSystemDialogPages) {
				triggerFailCallback$1(options, "dialogPage is not a valid page");
				return;
			}
			const index = parentSystemDialogPages.indexOf(dialogPage);
			if (index > -1) {
				invokeHook(parentSystemDialogPages[index].vm, ON_UNLOAD);
				parentSystemDialogPages.splice(index, 1);
				if (index === parentSystemDialogPages.length) dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_SHOW);
				dialogPageTriggerParentShow(dialogPage, 1);
			} else triggerFailCallback$1(options, "dialogPage is not a valid page");
			return;
		}
	} else {
		const dialogPages = currentPage.getDialogPages();
		for (let i = dialogPages.length - 1; i >= 0; i--) {
			invokeHook(dialogPages[i].vm, ON_UNLOAD);
			if (i > 0) invokeHook(dialogPages[i - 1].vm, ON_SHOW);
			dialogPageTriggerParentShow(dialogPages[i]);
			if ((!dialogPages[i]).$disableEscBack) decrementEscBackPageNum();
		}
		dialogPages.length = 0;
	}
	const successOptions = { errMsg: "closeDialogPage: ok" };
	options === null || options === void 0 || (_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, successOptions);
	options === null || options === void 0 || (_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options, successOptions);
};
function triggerFailCallback$1(options, errMsg) {
	var _options$fail, _options$complete2;
	const failOptions = new UniError("uni-closeDialogPage", 4, `closeDialogPage: fail, ${errMsg}`);
	options === null || options === void 0 || (_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, failOptions);
	options === null || options === void 0 || (_options$complete2 = options.complete) === null || _options$complete2 === void 0 || _options$complete2.call(options, failOptions);
}
//#endregion
//#region src/framework/setup/page.ts
var SEP = "$$";
var currentPagesMap = /* @__PURE__ */ new Map();
function getPage$BasePage(page) {
	return page.$basePage;
}
var entryPageState = { handledBeforeEntryPageRoutes: false };
var navigateToPagesBeforeEntryPages = [];
var switchTabPagesBeforeEntryPages = [];
var redirectToPagesBeforeEntryPages = [];
var reLaunchPagesBeforeEntryPages = [];
function pruneCurrentPages() {
	currentPagesMap.forEach((page, id) => {
		if (page.$.isUnmounted) currentPagesMap.delete(id);
	});
}
function getCurrentPagesMap() {
	return currentPagesMap;
}
function getCurrentPages$1() {
	return getCurrentBasePages().map((page) => page.$page);
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
		/**
		* 此逻辑为处理首页->非首页->back回首页后首页reLaunch不触发当前首页的onUnmount问题
		* 但是相关的问题并没有彻底解决，比如activated、deactivated触发不符合预期的问题，后续需要继续跟进
		*/
		routeCache.pruneCacheEntry(vnode);
	}
}
function removePage(routeKey, removeRouteCaches = true) {
	const pageVm = currentPagesMap.get(routeKey);
	{
		var _pageVm$$pageLayoutIn;
		const dialogPages = pageVm.$page.getDialogPages();
		for (let i = dialogPages.length - 1; i >= 0; i--) closeDialogPage({ dialogPage: dialogPages[i] });
		const systemDialogPages = (_pageVm$$pageLayoutIn = pageVm.$pageLayoutInstance) === null || _pageVm$$pageLayoutIn === void 0 || (_pageVm$$pageLayoutIn = _pageVm$$pageLayoutIn.$systemDialogPages) === null || _pageVm$$pageLayoutIn === void 0 ? void 0 : _pageVm$$pageLayoutIn.value;
		if (systemDialogPages) for (let i = systemDialogPages.length - 1; i >= 0; i--) closeDialogPage({ dialogPage: systemDialogPages[i] });
	}
	pageVm.$.__isUnload = true;
	invokeHook(pageVm, ON_UNLOAD);
	currentPagesMap.delete(routeKey);
	removeRouteCaches && removeRouteCache(routeKey);
	pageVm.$page.vm = null;
}
var id$1 = /*#__PURE__*/ getStateId();
function createPageState(type, __id__) {
	return {
		__id__: __id__ || ++id$1,
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
	initXPage(vm, route, page);
}
function normalizeRouteKey(path, id) {
	return path + SEP + id;
}
function useKeepAliveRoute() {
	const route = useRoute();
	return {
		routeKey: computed(() => normalizeRouteKey("/" + route.meta.route, getStateId())),
		isTabBar: computed(() => route.meta.isTabBar),
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
	routeCache.forEach((vnode, key) => {
		const cPageId = parseInt(key.split(SEP)[1]);
		if (cPageId && cPageId > pageId) {
			if (__UNI_FEATURE_TABBAR__ && isTabBarVNode(vnode)) return;
			routeCache.delete(key);
			routeCache.pruneCacheEntry(vnode);
			nextTick(() => pruneCurrentPages());
		}
	});
}
function updateCurPageAttrs(pageMeta) {
	{
		const uvueDirKey = "uvue-dir-" + __uniConfig.uvue["flex-direction"];
		document.body.setAttribute("uvue", "");
		document.body.setAttribute(uvueDirKey, "");
	}
}
function onPageShow(instance, pageMeta) {
	updateBodyScopeId(instance);
	updateCurPageCssVar(pageMeta);
	updateCurPageAttrs(pageMeta);
	initPageScrollListener(instance, pageMeta);
}
function onPageReady(instance) {
	const scopeId = getScopeId(instance);
	scopeId && updateCurPageBodyScopeId(scopeId);
}
function updateCurPageBodyScopeId(scopeId) {
	const pageBodyEl = document.querySelector("uni-page-body");
	if (pageBodyEl) pageBodyEl.setAttribute(scopeId, "");
	else if (process.env.NODE_ENV !== "production") console.warn("uni-page-body not found");
}
function getScopeId(instance) {
	return instance.type.__scopeId;
}
var curScopeId;
function updateBodyScopeId(instance) {
	const scopeId = getScopeId(instance);
	const { body } = document;
	curScopeId && body.removeAttribute(curScopeId);
	scopeId && body.setAttribute(scopeId, "");
	curScopeId = scopeId;
}
var passiveOptions$2 = /* @__PURE__ */ (() => {
	let supportsPassive = false;
	try {
		const opts = {};
		Object.defineProperty(opts, "passive", { get() {
			/* istanbul ignore next */
			supportsPassive = true;
		} });
		window.addEventListener("test-passive", () => {}, opts);
	} catch (e) {}
	return supportsPassive;
})() ? { passive: false } : false;
var curScrollListener;
function initPageScrollListener(instance, pageMeta) {
	document.removeEventListener("touchmove", disableScrollListener);
	if (curScrollListener) document.removeEventListener("scroll", curScrollListener);
	if (pageMeta.disableScroll) return document.addEventListener("touchmove", disableScrollListener, passiveOptions$2);
	const { onPageScroll, onReachBottom } = instance;
	const navigationBarTransparent = pageMeta.navigationBar.type === "transparent";
	if (!(onPageScroll === null || onPageScroll === void 0 ? void 0 : onPageScroll.length) && !(onReachBottom === null || onReachBottom === void 0 ? void 0 : onReachBottom.length) && !navigationBarTransparent) return;
	const opts = {};
	const pageId = getPage$BasePage(instance.proxy).id;
	if (onPageScroll || navigationBarTransparent) opts.onPageScroll = createOnPageScroll(pageId, onPageScroll, navigationBarTransparent);
	if (onReachBottom === null || onReachBottom === void 0 ? void 0 : onReachBottom.length) {
		opts.onReachBottomDistance = pageMeta.onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE;
		opts.onReachBottom = () => UniViewJSBridge.publishHandler(ON_REACH_BOTTOM, {}, pageId);
	}
	curScrollListener = createScrollListener(opts);
	requestAnimationFrame(() => document.addEventListener("scroll", curScrollListener));
	watch(() => pageMeta.onReachBottomDistance, (onReachBottomDistance) => {
		if (!onReachBottom) return;
		opts.onReachBottomDistance = onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE;
		document.removeEventListener("scroll", curScrollListener);
		curScrollListener = createScrollListener(opts);
		document.addEventListener("scroll", curScrollListener);
	});
	watch(() => pageMeta.disableScroll, (disableScroll) => {
		document.removeEventListener("touchmove", disableScrollListener);
		if (disableScroll) return document.addEventListener("touchmove", disableScrollListener);
	});
}
function createOnPageScroll(pageId, onPageScroll, navigationBarTransparent) {
	return (scrollTop) => {
		if (onPageScroll) UniViewJSBridge.publishHandler(ON_PAGE_SCROLL, { scrollTop }, pageId);
		if (navigationBarTransparent) UniViewJSBridge.emit(pageId + "." + ON_PAGE_SCROLL, { scrollTop });
	};
}
//#endregion
//#region src/platform/dom.ts
function findElem(vm) {
	return vm.$el;
}
function addBase(filePath) {
	const { base: baseUrl } = __uniConfig.router;
	if (addLeadingSlash(filePath).indexOf(baseUrl) === 0) return addLeadingSlash(filePath);
	return baseUrl + filePath;
}
function getRealPath(filePath) {
	const { base, assets } = __uniConfig.router;
	if (base === "./") {
		if (filePath.indexOf("./") === 0 && (filePath.includes("/static/") || filePath.indexOf("./" + (assets || "assets") + "/") === 0)) filePath = filePath.slice(1);
	}
	if (filePath.indexOf("/") === 0) if (filePath.indexOf("//") === 0) filePath = "https:" + filePath;
	else return addBase(filePath.slice(1));
	if (SCHEME_RE.test(filePath) || DATA_RE.test(filePath) || filePath.indexOf("blob:") === 0) return filePath;
	if (process.env.NODE_ENV !== "production") {
		if (!filePath.includes("/static/")) return filePath;
	}
	const pages = getCurrentBasePages();
	if (pages.length) return addBase(getRealRoute(getPage$BasePage(pages[pages.length - 1]).route, filePath).slice(1));
	return filePath;
}
//#endregion
//#region src/service/api/base/getBaseSystemInfo.ts
var ua = navigator.userAgent;
var isAndroid = /*#__PURE__*/ /android/i.test(ua);
var isIOS = /*#__PURE__*/ /iphone|ipad|ipod/i.test(ua);
var isWindows = /*#__PURE__*/ ua.match(/Windows NT ([\d|\d.\d]*)/i);
var isMac = /*#__PURE__*/ /Macintosh|Mac/i.test(ua);
var isLinux = /*#__PURE__*/ /Linux|X11/i.test(ua);
var isIPadOS = isMac && navigator.maxTouchPoints > 0;
var isHarmony = /OpenHarmony/i.test(ua);
function getScreenFix() {
	return /^Apple/.test(navigator.vendor) && typeof window.orientation === "number";
}
function isLandscape(screenFix) {
	return screenFix && Math.abs(window.orientation) === 90;
}
function getScreenWidth(screenFix, landscape) {
	return screenFix ? Math[landscape ? "max" : "min"](screen.width, screen.height) : screen.width;
}
function getScreenHeight(screenFix, landscape) {
	return screenFix ? Math[landscape ? "min" : "max"](screen.height, screen.width) : screen.height;
}
function getWindowWidth() {
	/**
	* 安卓平台微信内置浏览器在调整微信字体大小小于标准字体时，windowWidth会大于screenWidth，此时计算rpx等时应以windowWidth为准
	* iOS端微信内置浏览器没有这个问题
	*/
	const screenFix = getScreenFix();
	if (screenFix) {
		const screenWidth = getScreenWidth(screenFix, isLandscape(screenFix));
		return Math.min(window.innerWidth, document.documentElement.clientWidth, screenWidth) || screenWidth;
	} else return Math.min(window.innerWidth, document.documentElement.clientWidth);
}
/**
* 简易版systemInfo，主要为upx2px,i18n服务
* @returns
*/
function getBaseSystemInfo() {
	const windowWidth = getWindowWidth();
	return {
		platform: isIOS ? "ios" : "other",
		pixelRatio: window.devicePixelRatio,
		windowWidth
	};
}
//#endregion
//#region src/service/api/context/operateVideoPlayer.ts
function operateVideoPlayer(videoId, pageId, type, data) {
	UniServiceJSBridge.invokeViewMethod("video." + videoId, {
		videoId,
		type,
		data
	}, pageId);
}
//#endregion
//#region src/service/api/context/operateMap.ts
function operateMap(id, pageId, type, data, operateMapCallback) {
	UniServiceJSBridge.invokeViewMethod("map." + id, {
		type,
		data
	}, pageId, operateMapCallback);
}
//#endregion
//#region src/service/api/ui/requestComponentInfo.ts
function getRootInfo(fields) {
	const info = {};
	if (fields.id) info.id = "";
	if (fields.dataset) info.dataset = {};
	if (fields.rect) {
		info.left = 0;
		info.right = 0;
		info.top = 0;
		info.bottom = 0;
	}
	if (fields.size) {
		info.width = document.documentElement.clientWidth;
		info.height = document.documentElement.clientHeight;
	}
	if (fields.scrollOffset) {
		const documentElement = document.documentElement;
		const body = document.body;
		info.scrollLeft = documentElement.scrollLeft || body.scrollLeft || 0;
		info.scrollTop = documentElement.scrollTop || body.scrollTop || 0;
		info.scrollHeight = documentElement.scrollHeight || body.scrollHeight || 0;
		info.scrollWidth = documentElement.scrollWidth || body.scrollWidth || 0;
	}
	return info;
}
function getNodeInfo(el, fields) {
	const info = {};
	const { top, topWindowHeight } = getWindowOffset();
	if (fields.node) {
		const tagName = el.tagName.split("-")[1] || el.tagName;
		if (tagName) info.node = el.querySelector(tagName);
	}
	if (fields.id) info.id = el.id;
	if (fields.dataset) info.dataset = getCustomDataset(el);
	if (fields.rect || fields.size) {
		const rect = el.getBoundingClientRect();
		if (fields.rect) {
			info.left = rect.left;
			info.right = rect.right;
			info.top = rect.top - top - topWindowHeight;
			info.bottom = rect.bottom - top - topWindowHeight;
		}
		if (fields.size) {
			info.width = rect.width;
			info.height = rect.height;
		}
	}
	if (isArray(fields.properties)) fields.properties.forEach((prop) => {
		prop = prop.replace(/-([a-z])/g, function(e, t) {
			return t.toUpperCase();
		});
	});
	if (fields.scrollOffset) if (el.tagName === "SCROLL-VIEW") {
		const scroll = el.children[0].children[0];
		info.scrollLeft = scroll.scrollLeft;
		info.scrollTop = scroll.scrollTop;
		info.scrollHeight = scroll.scrollHeight;
		info.scrollWidth = scroll.scrollWidth;
	} else {
		info.scrollLeft = 0;
		info.scrollTop = 0;
		info.scrollHeight = 0;
		info.scrollWidth = 0;
	}
	if (isArray(fields.computedStyle)) {
		const sytle = getComputedStyle(el);
		fields.computedStyle.forEach((name) => {
			info[name] = sytle[name];
		});
	}
	if (fields.context) info.contextInfo = getContextInfo(el);
	return info;
}
function findElm(component, pageVm) {
	if (!component) return pageVm.$el;
	return component.$el;
}
function matches(element, selectors) {
	return (element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector || function(selectors) {
		const matches = this.parentElement.querySelectorAll(selectors);
		let i = matches.length;
		while (--i >= 0 && matches.item(i) !== this);
		return i > -1;
	}).call(element, selectors);
}
var QuerySelectorHelper = class QuerySelectorHelper {
	constructor(element, vnode) {
		this._element = element;
		this._commentStartVNode = vnode;
	}
	static queryElement(element, selector, fields, all, vnode) {
		return new QuerySelectorHelper(element, vnode).query(selector, all, fields);
	}
	query(selector, all, fields) {
		if (this._element.nodeType === 3 || this._element.nodeType === 8) return this.queryFragment(this._element, selector, all, fields);
		else return all ? this.querySelectorAll(this._element, selector, fields) : this.querySelector(this._element, selector, fields);
	}
	queryFragment(el, selector, all, fields) {
		let current = el.nextSibling;
		if (current == null) return null;
		let depth = 65535;
		if (all) {
			const result1 = [];
			while (depth > 0) {
				depth--;
				if (current.nodeName && current.nodeName == "#comment") {
					current = current.nextSibling;
					continue;
				}
				const queryResult = this.querySelectorAll(current, selector, fields);
				if (queryResult != null) result1.push(...queryResult);
				current = current.nextSibling;
				if (current == null || this._commentStartVNode.anchor == current) break;
			}
			return result1;
		} else {
			let result2 = null;
			while (depth > 0) {
				depth--;
				if (current.nodeName && current.nodeName == "#comment") {
					current = current.nextSibling;
					continue;
				}
				result2 = this.querySelector(current, selector, fields);
				current = current.nextSibling;
				if (result2 != null || current == null || this._commentStartVNode.anchor == current) break;
			}
			return result2;
		}
	}
	querySelector(element, selector, fields) {
		let element2 = this.querySelf(element, selector);
		if (element2 == null) element2 = element.querySelector(selector);
		if (element2 != null) return this.getNodeInfo(element2, fields);
		return null;
	}
	querySelectorAll(element, selector, fields) {
		const nodesInfoArray = [];
		if (this.querySelf(element, selector) != null) nodesInfoArray.push(this.getNodeInfo(element, fields));
		const findNodes = element.querySelectorAll(selector);
		findNodes === null || findNodes === void 0 || findNodes.forEach((el) => {
			nodesInfoArray.push(this.getNodeInfo(el, fields));
		});
		return nodesInfoArray;
	}
	querySelf(element, selector) {
		if (element == null || selector.length < 2) return null;
		const selectorType = selector.charAt(0);
		const selectorName = selector.slice(1);
		if (selectorType == "." && element.classList.contains(selectorName)) return element;
		if (selectorType == "#" && element.getAttribute("id") == selectorName) return element;
		if (selector.toUpperCase() == element.nodeName.toUpperCase()) return element;
		return null;
	}
	getNodeInfo(element, fields) {
		var _element$getAttribute;
		const rect = element.getBoundingClientRect();
		const nodeInfo = {
			id: (_element$getAttribute = element.getAttribute("id")) === null || _element$getAttribute === void 0 ? void 0 : _element$getAttribute.toString(),
			left: rect.left,
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom,
			width: rect.width,
			height: rect.height
		};
		if (fields.node) nodeInfo.node = element;
		if (fields.dataset) nodeInfo.dataset = {};
		return nodeInfo;
	}
};
function getNodesInfo(pageVm, component, selector, single, fields) {
	const selfElement = findElm(component, pageVm);
	const parentElement = selfElement.parentElement;
	if (!parentElement) return single ? null : [];
	const { nodeType } = selfElement;
	const maybeFragment = nodeType === 3 || nodeType === 8;
	if (maybeFragment) return QuerySelectorHelper.queryElement(selfElement, selector, fields, !single, (component || pageVm).$.subTree);
	if (single) {
		const node = maybeFragment ? parentElement.querySelector(selector) : matches(selfElement, selector) ? selfElement : selfElement.querySelector(selector);
		if (node) return getNodeInfo(node, fields);
		return null;
	} else {
		let infos = [];
		const nodeList = (maybeFragment ? parentElement : selfElement).querySelectorAll(selector);
		if (nodeList && nodeList.length) [].forEach.call(nodeList, (node) => {
			infos.push(getNodeInfo(node, fields));
		});
		if (!maybeFragment && matches(selfElement, selector)) infos.unshift(getNodeInfo(selfElement, fields));
		return infos;
	}
}
function requestComponentInfo(page, reqs, callback) {
	const result = [];
	reqs.forEach(({ component, selector, single, fields }) => {
		if (component === null) result.push(getRootInfo(fields));
		else result.push(getNodesInfo(page, component, selector, single, fields));
	});
	callback(result);
}
//#endregion
//#region src/service/api/ui/setPageMeta.ts
function setCurrentPageMeta(_page, { pageStyle, rootFontSize }) {
	if (pageStyle) (document.querySelector("uni-page-body") || document.body).setAttribute("style", pageStyle);
	if (rootFontSize && document.documentElement.style.fontSize !== rootFontSize) document.documentElement.style.fontSize = rootFontSize;
}
//#endregion
//#region src/service/api/ui/intersectionObserver.ts
function addIntersectionObserver({ reqId, component, options, callback }, _pageId) {
	const $el = findElem(component);
	($el.__io || ($el.__io = {}))[reqId] = requestComponentObserver($el, options, callback);
}
function removeIntersectionObserver({ reqId, component }, _pageId) {
	const $el = findElem(component);
	const intersectionObserver = $el.__io && $el.__io[reqId];
	if (intersectionObserver) {
		intersectionObserver.disconnect();
		delete $el.__io[reqId];
	}
}
//#endregion
//#region src/service/api/ui/mediaQueryObserver.ts
var mediaQueryObservers = {};
var listeners = {};
function handleMediaQueryStr($props) {
	const mediaQueryArr = [];
	for (const item of [
		"width",
		"minWidth",
		"maxWidth",
		"height",
		"minHeight",
		"maxHeight",
		"orientation"
	]) {
		if (item !== "orientation" && $props[item] && Number($props[item] >= 0)) mediaQueryArr.push(`(${humpToLine(item)}: ${Number($props[item])}px)`);
		if (item === "orientation" && $props[item]) mediaQueryArr.push(`(${humpToLine(item)}: ${$props[item]})`);
	}
	return mediaQueryArr.join(" and ");
}
function humpToLine(name) {
	return name.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function addMediaQueryObserver({ reqId, component, options, callback }, _pageId) {
	const mediaQueryObserver = mediaQueryObservers[reqId] = window.matchMedia(handleMediaQueryStr(options));
	const listener = listeners[reqId] = (observer) => callback(observer.matches);
	listener(mediaQueryObserver);
	mediaQueryObserver.addListener(listener);
}
function removeMediaQueryObserver({ reqId, component }, _pageId) {
	const listener = listeners[reqId];
	const mediaQueryObserver = mediaQueryObservers[reqId];
	if (mediaQueryObserver) {
		mediaQueryObserver.removeListener(listener);
		delete listeners[reqId];
		delete mediaQueryObservers[reqId];
	}
}
//#endregion
//#region src/helpers/file.ts
/**
* 暂存的文件对象
*/
var files = {};
/**
* 从url读取File
* @param {string} url
* @param {boolean} local
* @param {Promise}
*/
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
/**
* base64转File
* @param {string} base64
* @return {File}
*/
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
/**
* 简易获取扩展名
* @param {string} type
* @return {string}
*/
function getExtname(type) {
	const extname = type.split("/")[1];
	return extname ? `.${extname}` : "";
}
/**
* 简易获取文件名
* @param {string} url
*/
function getFileName(url) {
	url = url.split("#")[0].split("?")[0];
	const array = url.split("/");
	return array[array.length - 1];
}
/**
* blob转File
* @param {Blob} blob
* @param {string} type
* @return {File}
*/
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
/**
* 从本地file或者blob对象创建url
* @param {Blob|File} file
* @return {string}
*/
function fileToUrl(file) {
	for (const key in files) if (hasOwn(files, key)) {
		if (files[key] === file) return key;
	}
	var url = (window.URL || window.webkitURL).createObjectURL(file);
	files[url] = file;
	return url;
}
function revokeObjectURL(url) {
	(window.URL || window.webkitURL).revokeObjectURL(url);
	delete files[url];
}
//#endregion
//#region src/framework/setup/utils.ts
var launchOptions = /*#__PURE__*/ createLaunchOptions();
var enterOptions = /*#__PURE__*/ createLaunchOptions();
function getEnterOptions() {
	return extend({}, enterOptions);
}
function getLaunchOptions() {
	return extend({}, launchOptions);
}
function initLaunchOptions({ path, query }) {
	extend(launchOptions, {
		path,
		query
	});
	extend(enterOptions, launchOptions);
	return extend({}, launchOptions);
}
//#endregion
//#region src/framework/components/async-loading/index.ts
var clazz = { class: "uni-async-loading" };
var loadingVNode = /*#__PURE__*/ createVNode("i", { class: "uni-loading" }, null, -1);
var async_loading_default = /*#__PURE__*/ defineSystemComponent({
	name: "AsyncLoading",
	render() {
		return openBlock(), createBlock("div", clazz, [loadingVNode]);
	}
});
//#endregion
//#region src/framework/components/async-error/index.tsx
function reload() {
	window.location.reload();
}
var async_error_default = /*#__PURE__*/ defineSystemComponent({
	name: "AsyncError",
	props: ["error"],
	setup() {
		initI18nAsyncMsgsOnce();
		const { t } = useI18n();
		return () => createVNode("div", {
			"class": "uni-async-error",
			"onClick": reload
		}, [t("uni.async.error")], 8, ["onClick"]);
	}
});
//#endregion
//#region src/framework/setup/app.ts
var appVm;
var $uniApp;
{
	class UniAppImpl {
		get vm() {
			return appVm;
		}
		get $vm() {
			return appVm;
		}
		get globalData() {
			return (appVm === null || appVm === void 0 ? void 0 : appVm.globalData) || {};
		}
		getAndroidApplication() {
			return null;
		}
		getHarmonyAbility() {
			return null;
		}
	}
	$uniApp = new UniAppImpl();
}
function getApp$1() {
	return $uniApp;
}
function initApp$1(vm) {
	appVm = vm;
	Object.defineProperty(appVm.$.ctx, "$children", { get() {
		return getCurrentBasePages().map((page) => page.$vm);
	} });
	const app = appVm.$.appContext.app;
	if (!app.component(async_loading_default.name)) app.component(async_loading_default.name, async_loading_default);
	if (!app.component(async_error_default.name)) app.component(async_error_default.name, async_error_default);
	initAppVm(appVm);
	defineGlobalData(appVm);
	initService();
	initView();
}
//#endregion
//#region src/framework/setup/index.ts
function wrapperComponentSetup(comp, { type, clone, init, setup, before, options }) {
	if (clone) comp = extend({}, comp);
	before && before(comp);
	const oldSetup = comp.setup;
	comp.setup = (props, ctx) => {
		const instance = getCurrentInstance();
		init(instance.proxy);
		setup(instance);
		if (oldSetup) return oldSetup(props, ctx);
	};
	if (type === "page" || type === "window") {
		if ((comp.styleIsolation || (__uniConfig.styleIsolation || {})[comp.__filename]) !== "isolated") comp.styleIsolation = "app";
	}
	return comp;
}
function setupComponent(comp, options) {
	if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) return wrapperComponentSetup(comp.default, options);
	return wrapperComponentSetup(comp, options);
}
function setupWindow(comp, id) {
	return setupComponent(comp, {
		type: "window",
		init: (vm) => {
			vm.$basePage = { id };
		},
		setup(instance) {
			instance.$pageInstance = instance;
		}
	});
}
function setupPage(comp, path) {
	if (process.env.NODE_ENV !== "production") comp.__mpType = "page";
	if (path) comp.__filename = path;
	return setupComponent(comp, {
		type: "page",
		clone: true,
		init: initPage,
		setup(instance) {
			instance.$pageInstance = instance;
			const route = usePageRoute();
			const query = decodedQuery(route.query);
			instance.attrs.__pageQuery = query;
			{
				const pageInstance = getPageInstanceByChild(instance);
				if (isDialogPageInstance(pageInstance)) instance.attrs.__pageQuery = decodedQuery(parseQuery((pageInstance === null || pageInstance === void 0 ? void 0 : pageInstance.attrs.route).split("?")[1] || ""));
			}
			getPage$BasePage(instance.proxy).options = query;
			instance.proxy.options = query;
			const pageMeta = usePageMeta();
			updateCurPageCssVar(pageMeta);
			instance.onReachBottom = reactive([]);
			instance.onPageScroll = reactive([]);
			watch([instance.onReachBottom, instance.onPageScroll], () => {
				const currentPage = getCurrentPage().vm;
				if (instance.proxy === currentPage) initPageScrollListener(instance, pageMeta);
			}, { once: true });
			onBeforeMount(() => {
				onPageShow(instance, pageMeta);
			});
			onMounted(() => {
				var _instance$proxy;
				if (isDialogPageInstance(getPageInstanceByChild(instance))) useBackgroundColorContent$1(instance.proxy);
				dialogPageTriggerParentHide((_instance$proxy = instance.proxy) === null || _instance$proxy === void 0 ? void 0 : _instance$proxy.$page);
				onPageReady(instance);
				const { onReady } = instance;
				onReady && invokeArrayFns$1(onReady);
				invokeOnTabItemTap(route);
			});
			onBeforeActivate(() => {
				if (!instance.__isVisible) {
					onPageShow(instance, pageMeta);
					instance.__isVisible = true;
					if (!isDialogPageInstance(getPageInstanceByChild(instance))) {
						var _instance$proxy2;
						const { onShow } = instance;
						onShow && invokeArrayFns$1(onShow);
						invokeLastDialogPageHookByUniPage((_instance$proxy2 = instance.proxy) === null || _instance$proxy2 === void 0 ? void 0 : _instance$proxy2.$page, ON_SHOW);
					}
					nextTick(() => {
						invokeOnTabItemTap(route);
					});
				}
			});
			onBeforeDeactivate(() => {
				if (instance.__isVisible && !instance.__isUnload) {
					instance.__isVisible = false;
					if (!isDialogPageInstance(getPageInstanceByChild(instance))) {
						var _instance$proxy3;
						const { onHide } = instance;
						onHide && invokeArrayFns$1(onHide);
						invokeLastDialogPageHookByUniPage((_instance$proxy3 = instance.proxy) === null || _instance$proxy3 === void 0 ? void 0 : _instance$proxy3.$page, ON_HIDE);
					}
				}
			});
			const pageId = getPageProxyId(instance.proxy);
			subscribeViewMethod(pageId);
			onBeforeUnmount(() => {
				unsubscribeViewMethod(pageId);
			});
			return query;
		}
	});
}
function setupApp(comp) {
	if (process.env.NODE_ENV !== "production") comp.__mpType = "app";
	return setupComponent(comp, {
		init: initApp$1,
		setup(instance) {
			const route = usePageRoute();
			const onLaunch = () => {
				injectAppHooks(instance);
				const { onLaunch, onShow, onPageNotFound } = instance;
				const launchOptions = initLaunchOptions({
					path: route.path.slice(1) || __uniRoutes[0].meta.route,
					query: decodedQuery(route.query)
				});
				onLaunch && invokeArrayFns$1(onLaunch, launchOptions);
				onShow && invokeArrayFns$1(onShow, launchOptions);
				if (__UNI_FEATURE_PAGES__) {
					if (!route.matched.length) {
						const pageNotFoundOptions = {
							notFound: true,
							openType: "appLaunch",
							path: route.path,
							query: decodedQuery(route.query),
							scene: 1001
						};
						handleBeforeEntryPageRoutes();
						onPageNotFound && invokeArrayFns$1(onPageNotFound, pageNotFoundOptions);
					}
				}
			};
			if (__UNI_FEATURE_PAGES__) useRouter().isReady().then(onLaunch);
			else onBeforeMount(onLaunch);
			onMounted(() => {
				window.addEventListener("resize", debounce(onResize$1, 50, {
					setTimeout,
					clearTimeout
				}));
				window.addEventListener("message", onMessage);
				document.addEventListener("visibilitychange", onVisibilityChange$1);
				onThemeChange$2();
			});
			return route.query;
		},
		before(comp) {
			comp.mpType = "app";
			const { setup } = comp;
			const render = () => {
				return openBlock(), createBlock(layout_default);
			};
			comp.setup = (props, ctx) => {
				const res = setup && setup(props, ctx);
				return isFunction(res) ? render : res;
			};
			comp.render = render;
		}
	});
}
function onResize$1() {
	const { windowWidth, windowHeight, screenWidth, screenHeight } = uni.getSystemInfoSync();
	const deviceOrientation = Math.abs(Number(window.orientation)) === 90 ? "landscape" : "portrait";
	UniServiceJSBridge.emit(ON_RESIZE, {
		deviceOrientation,
		size: {
			windowWidth,
			windowHeight,
			screenWidth,
			screenHeight
		}
	});
}
function onMessage(evt) {
	if (isPlainObject(evt.data) && evt.data.type === WEB_INVOKE_APPSERVICE) UniServiceJSBridge.emit(ON_WEB_INVOKE_APP_SERVICE, evt.data.data, evt.data.pageId);
}
function onVisibilityChange$1() {
	const { emit } = UniServiceJSBridge;
	if (document.visibilityState === "visible") emit(ON_APP_ENTER_FOREGROUND, getEnterOptions());
	else emit(ON_APP_ENTER_BACKGROUND);
}
function onThemeChange$2() {
	let mediaQueryList = null;
	try {
		mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
	} catch (error) {}
	if (mediaQueryList) {
		let callback = (e) => {
			UniServiceJSBridge.emit(ON_THEME_CHANGE, { theme: e.matches ? "dark" : "light" });
		};
		if (mediaQueryList.addEventListener) mediaQueryList.addEventListener("change", callback);
		else mediaQueryList.addListener(callback);
	}
}
function invokeOnTabItemTap(route) {
	const { tabBarText, tabBarIndex, route: pagePath } = route.meta;
	if (tabBarText) invokeHook("onTabItemTap", {
		index: tabBarIndex,
		text: tabBarText,
		pagePath
	});
}
//#endregion
//#region src/helpers/useDocumentTitle.ts
function updateDocumentTitle(title) {
	if (title && title !== document.title) document.title = title;
	UniServiceJSBridge.emit(ON_NAVIGATION_BAR_CHANGE, { titleText: title });
}
function useDocumentTitle(pageMeta) {
	function update() {
		updateDocumentTitle(pageMeta.navigationBar.titleText);
	}
	watchEffect(update);
	onActivated(update);
}
//#endregion
//#region src/service/api/base/getBrowserInfo.ts
function IEVersion() {
	const userAgent = navigator.userAgent;
	const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
	const isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
	const isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
	if (isIE) {
		(/* @__PURE__ */ new RegExp("MSIE (\\d+\\.\\d+);")).test(userAgent);
		const fIEVersion = parseFloat(RegExp.$1);
		if (fIEVersion > 6) return fIEVersion;
		else return 6;
	} else if (isEdge) return -1;
	else if (isIE11) return 11;
	else return -1;
}
function getTheme() {
	if (__uniConfig.darkmode !== true) return isString(__uniConfig.darkmode) ? __uniConfig.darkmode : "light";
	try {
		return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
	} catch (error) {
		return "light";
	}
}
function getBrowserInfo() {
	let osname;
	let osversion = "0";
	let model = "";
	let deviceType = "phone";
	const language = navigator.language;
	if (isIOS) {
		osname = "iOS";
		const osversionFind = ua.match(/OS\s([\w_]+)\slike/);
		if (osversionFind) osversion = osversionFind[1].replace(/_/g, ".");
		const iosVersion = osversion.split(".")[0];
		if (Number(iosVersion) >= 18) {
			const versionMatch = ua.match(/Version\/([\d\.]+)/);
			if (versionMatch) osversion = versionMatch[1];
		}
		const modelFind = ua.match(/\(([a-zA-Z]+);/);
		if (modelFind) model = modelFind[1];
	} else if (isAndroid) {
		osname = "Android";
		const osversionFind = ua.match(/Android[\s/]([\w\.]+)[;\s]/);
		if (osversionFind) osversion = osversionFind[1];
		const infoFind = ua.match(/\((.+?)\)/);
		const infos = infoFind ? infoFind[1].split(";") : ua.split(" ");
		const otherInfo = [
			/\bAndroid\b/i,
			/\bLinux\b/i,
			/\bU\b/i,
			/^\s?[a-z][a-z]$/i,
			/^\s?[a-z][a-z]-[a-z][a-z]$/i,
			/\bwv\b/i,
			/\/[\d\.,]+$/,
			/^\s?[\d\.,]+$/,
			/\bBrowser\b/i,
			/\bMobile\b/i
		];
		for (let i = 0; i < infos.length; i++) {
			const info = infos[i];
			if (info.indexOf("Build") > 0) {
				model = info.split("Build")[0].trim();
				break;
			}
			let other;
			for (let o = 0; o < otherInfo.length; o++) if (otherInfo[o].test(info)) {
				other = true;
				break;
			}
			if (!other) {
				model = info.trim();
				break;
			}
		}
	} else if (isIPadOS) {
		model = "iPad";
		osname = "iOS";
		deviceType = "pad";
		osversion = isFunction(window.BigInt) ? "14.0" : "13.0";
		if (parseInt(osversion) === 14) {
			const versionMatched = ua.match(/Version\/(\S*)\b/);
			if (versionMatched) osversion = versionMatched[1];
		}
	} else if (isWindows || isMac || isLinux) {
		model = "PC";
		osname = "PC";
		deviceType = "pc";
		osversion = "0";
		let osversionFind = ua.match(/\((.+?)\)/)[1];
		if (isWindows) {
			osname = "Windows";
			switch (isWindows[1]) {
				case "5.1":
					osversion = "XP";
					break;
				case "6.0":
					osversion = "Vista";
					break;
				case "6.1":
					osversion = "7";
					break;
				case "6.2":
					osversion = "8";
					break;
				case "6.3":
					osversion = "8.1";
					break;
				case "10.0":
					osversion = "10";
					break;
			}
			const framework = osversionFind && osversionFind.match(/[Win|WOW]([\d]+)/);
			if (framework) osversion += ` x${framework[1]}`;
		} else if (isMac) {
			osname = "macOS";
			const _osversion = osversionFind && osversionFind.match(/Mac OS X (.+)/) || "";
			if (osversion) {
				osversion = _osversion[1].replace(/_/g, ".");
				if (osversion.indexOf(";") !== -1) osversion = osversion.split(";")[0];
			}
		} else if (isLinux) {
			osname = "Linux";
			const _osversion = osversionFind && osversionFind.match(/Linux (.*)/) || "";
			if (_osversion) {
				osversion = _osversion[1];
				if (osversion.indexOf(";") !== -1) osversion = osversion.split(";")[0];
			}
		}
	} else if (isHarmony) {
		osname = "Harmony";
		deviceType = "phone";
		const osversionFind = ua.match(/OpenHarmony\s([\d\.]+)/);
		if (osversionFind) osversion = osversionFind[1];
		model = "";
	} else {
		osname = "Other";
		osversion = "0";
		deviceType = "unknown";
	}
	const system = `${osname} ${osversion}`;
	const platform = osname.toLowerCase();
	let browserName = "";
	let browserVersion = String(IEVersion());
	if (browserVersion !== "-1") browserName = "IE";
	else {
		const browseVendors = [
			"Version",
			"Firefox",
			"Chrome",
			"Edge{0,1}"
		];
		const vendors = [
			"Safari",
			"Firefox",
			"Chrome",
			"Edge"
		];
		for (let index = 0; index < browseVendors.length; index++) {
			const vendor = browseVendors[index];
			const reg = new RegExp(`(${vendor})/(\\S*)\\b`);
			if (reg.test(ua)) {
				browserName = vendors[index];
				browserVersion = ua.match(reg)[2];
			}
		}
	}
	let deviceOrientation = "portrait";
	if (window.matchMedia) try {
		if (window.matchMedia("(orientation:landscape)").matches) deviceOrientation = "landscape";
	} catch (_unused) {}
	if (deviceOrientation === "portrait" && window.screen.orientation !== void 0) deviceOrientation = [90, 270].includes(window.screen.orientation.angle) ? "landscape" : "portrait";
	if (deviceOrientation === "portrait" && window.orientation != null) deviceOrientation = Math.abs(window.orientation) === 90 ? "landscape" : "portrait";
	return {
		deviceBrand: void 0,
		brand: void 0,
		deviceModel: model,
		deviceOrientation,
		model,
		system,
		platform,
		browserName: browserName.toLocaleLowerCase(),
		browserVersion,
		language,
		deviceType,
		ua,
		osname,
		osversion,
		theme: getTheme()
	};
}
//#endregion
//#region src/helpers/theme.ts
function onThemeChange$1(callback) {
	if (__uniConfig.darkmode) UniServiceJSBridge.on(ON_THEME_CHANGE, callback);
}
function offThemeChange$1(callback) {
	UniServiceJSBridge.off(ON_THEME_CHANGE, callback);
}
function parseTheme(pageStyle) {
	let parsedStyle = {};
	if (__uniConfig.darkmode) parsedStyle = normalizeStyles(pageStyle, __uniConfig.themeConfig, getTheme());
	return __uniConfig.darkmode ? parsedStyle : pageStyle;
}
function useTheme(pageStyle, onThemeChangeCallback) {
	const isReactivity = isReactive(pageStyle);
	const reactivePageStyle = isReactivity ? reactive(parseTheme(pageStyle)) : parseTheme(pageStyle);
	if (__uniConfig.darkmode && isReactivity) watch(pageStyle, (value) => {
		const _pageStyle = parseTheme(value);
		for (const key in _pageStyle) reactivePageStyle[key] = _pageStyle[key];
	});
	onThemeChangeCallback && onThemeChange$1(onThemeChangeCallback);
	return reactivePageStyle;
}
//#endregion
//#region src/helpers/useBackgroundColorContent.ts
function updateBackgroundColorContent(backgroundColorContent) {
	if (backgroundColorContent) document.body.style.setProperty("--background-color-content", backgroundColorContent);
	else document.body.style.removeProperty("--background-color-content");
}
function useBackgroundColorContent(pageMeta) {
	function update() {
		if (pageMeta.backgroundColorContent) updateBackgroundColorContent(parseTheme({ backgroundColorContent: pageMeta.backgroundColorContent }).backgroundColorContent);
		else updateBackgroundColorContent("transparent");
	}
	onThemeChange$1(update);
	watchEffect(update);
	onActivated(update);
}
//#endregion
//#region src/helpers/hexToRgba.ts
/**
* 从 16 进制的色值解析成 rgba 格式的色值
* @param { string } hex, #000、#000A、#000000、#000000AA，参数只能是这四种格式
*/
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
	const r = parseInt(sr, 16), g = parseInt(sg, 16), b = parseInt(sb, 16);
	if (!sa) return {
		r,
		g,
		b,
		a: 1
	};
	return {
		r,
		g,
		b,
		a: (`0x100${sa}` - 65536) / 255
	};
}
//#endregion
//#region src/framework/components/page/transparent.ts
function usePageHeadTransparentBackgroundColor(backgroundColor) {
	const { r, g, b } = hexToRgba(backgroundColor);
	return `rgba(${r},${g},${b},0)`;
}
function usePageHeadTransparent(headRef, { id, navigationBar: { titleColor, coverage, backgroundColor } }) {
	let A = 0;
	const rgb = computed(() => hexToRgba(backgroundColor));
	const offset = parseInt(coverage);
	let titleElem;
	let transparentElemStyle;
	const iconElemsPaths = [];
	const borderRadiusElemsStyles = [];
	const oldColors = [];
	onMounted(() => {
		const $el = headRef.value;
		transparentElemStyle = $el.style;
		titleElem = $el.querySelector(".uni-page-head__title");
		const borderRadiusElems = $el.querySelectorAll(".uni-page-head-btn");
		const iconSvgElems = $el.querySelectorAll("svg path");
		for (let i = 0; i < iconSvgElems.length; i++) iconElemsPaths.push(iconSvgElems[i]);
		for (let i = 0; i < borderRadiusElems.length; i++) {
			const borderRadiusElem = borderRadiusElems[i];
			oldColors.push(getComputedStyle(borderRadiusElem).backgroundColor);
			borderRadiusElemsStyles.push(borderRadiusElem.style);
		}
	});
	useOn(id + ".onPageScroll", ({ scrollTop }) => {
		const alpha = Math.min(scrollTop / offset, 1);
		if (alpha === 1 && A === 1) return;
		if (alpha > .5 && A <= .5) iconElemsPaths.forEach(function(iconElemPath) {
			iconElemPath.setAttribute("fill", titleColor);
		});
		else if (alpha <= .5 && A > .5) iconElemsPaths.forEach(function(iconElemPath) {
			iconElemPath.setAttribute("fill", "#fff");
		});
		A = alpha;
		if (titleElem) titleElem.style.opacity = alpha;
		const bg = rgb.value;
		transparentElemStyle.backgroundColor = `rgba(${bg.r},${bg.g},${bg.b},${alpha})`;
		borderRadiusElemsStyles.forEach(function(borderRadiusElemStyle, index) {
			const rgba = oldColors[index].match(/[\d+\.]+/g);
			rgba[3] = (1 - alpha) * (rgba.length === 4 ? rgba[3] : 1);
			borderRadiusElemStyle.backgroundColor = `rgba(${rgba})`;
		});
	});
}
//#endregion
//#region src/framework/components/page/pageHead.tsx
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
var pageHead_default = /*#__PURE__*/ defineSystemComponent({
	name: "PageHead",
	setup() {
		const headRef = ref(null);
		const pageMeta = usePageMeta();
		const navigationBar = useTheme(pageMeta.navigationBar, () => {
			const _navigationBar = parseTheme(pageMeta.navigationBar);
			navigationBar.backgroundColor = _navigationBar.backgroundColor;
			navigationBar.titleColor = _navigationBar.titleColor;
		});
		const { clazz, style } = usePageHead(navigationBar);
		const buttons = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ && usePageHeadButtons(pageMeta);
		const searchInput = __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__ && navigationBar.searchInput && usePageHeadSearchInput(pageMeta);
		__UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && navigationBar.type === "transparent" && usePageHeadTransparent(headRef, pageMeta);
		return () => {
			const backButtonTsx = __UNI_FEATURE_PAGES__ ? createBackButtonTsx(navigationBar, pageMeta.isQuit) : null;
			const leftButtonsTsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ ? createButtonsTsx(buttons.left) : [];
			const rightButtonsTsx = __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__ ? createButtonsTsx(buttons.right) : [];
			const type = navigationBar.type || "default";
			const placeholderTsx = type !== "transparent" && type !== "float" && createVNode("div", { "class": {
				"uni-placeholder": true,
				"uni-placeholder-titlePenetrate": navigationBar.titlePenetrate
			} }, null, 2);
			return createVNode("uni-page-head", { "uni-page-head-type": type }, [createVNode("div", {
				"ref": headRef,
				"class": clazz.value,
				"style": style.value
			}, [
				createVNode("div", { "class": "uni-page-head-hd" }, [backButtonTsx, ...leftButtonsTsx]),
				createPageHeadBdTsx(navigationBar, searchInput),
				createVNode("div", { "class": "uni-page-head-ft" }, [...rightButtonsTsx])
			], 6), placeholderTsx], 8, ["uni-page-head-type"]);
		};
	}
});
function createBackButtonTsx(navigationBar, isQuit) {
	if (!isQuit) return createVNode("div", {
		"class": "uni-page-head-btn",
		"onClick": onPageHeadBackButton
	}, [createSvgIconVNode(ICON_PATH_BACK, navigationBar.type === "transparent" ? "#fff" : navigationBar.titleColor, 26)], 8, ["onClick"]);
}
function createButtonsTsx(btns) {
	return btns.map(({ onClick, btnClass, btnStyle, btnText, btnIconPath, badgeText, iconStyle, btnSelect }, index) => {
		return createVNode("div", {
			"key": index,
			"class": btnClass,
			"style": btnStyle,
			"onClick": onClick,
			"badge-text": badgeText
		}, [btnIconPath ? createSvgIconVNode(btnIconPath, iconStyle.color, iconStyle.fontSize) : btnSelect ? createVNode("span", { "style": iconStyle }, [createVNode("i", {
			"class": "uni-btn-icon",
			"innerHTML": btnText
		}, null, 8, ["innerHTML"]), createSvgIconVNode(ICON_PATHS["select"], "#000", 14)], 4) : createVNode("i", {
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
	return createVNode("div", { "class": "uni-page-head-bd" }, [createVNode("div", {
		"style": {
			fontSize: titleSize,
			opacity: type === "transparent" ? 0 : 1
		},
		"class": "uni-page-head__title"
	}, [loading ? createVNode("i", { "class": "uni-loading" }, null) : titleImage ? createVNode("img", {
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
	return createVNode("div", {
		"class": "uni-page-head-search",
		"style": searchStyle
	}, [createVNode("div", {
		"style": { color: placeholderColor },
		"class": placeholderClass
	}, [createVNode("div", { "class": "uni-page-head-search-icon" }, [createSvgIconVNode(ICON_PATH_SEARCH, placeholderColor, 20)]), text.value || composing.value ? "" : placeholder], 6), disabled ? createVNode(input_default, {
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
	]) : createVNode(input_default, {
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
		clazz: computed(() => {
			const { type, titlePenetrate, shadowColorType } = navigationBar;
			const clazz = {
				"uni-page-head": true,
				"uni-page-head-transparent": type === "transparent",
				"uni-page-head-titlePenetrate": titlePenetrate === "YES",
				"uni-page-head-shadow": !!shadowColorType
			};
			if (shadowColorType) clazz[`uni-page-head-shadow-${shadowColorType}`] = true;
			return clazz;
		}),
		style: computed(() => {
			return {
				backgroundColor: __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__ && navigationBar.type === "transparent" ? usePageHeadTransparentBackgroundColor(navigationBar.backgroundColor) : navigationBar.backgroundColor,
				color: navigationBar.titleColor,
				transitionDuration: navigationBar.duration,
				transitionTimingFunction: navigationBar.timingFunc
			};
		})
	};
}
function usePageHeadButtons({ id, navigationBar }) {
	const left = [];
	const right = [];
	const { buttons } = navigationBar;
	if (isArray(buttons)) {
		const { type } = navigationBar;
		const isTransparent = type === "transparent";
		const fonts = Object.create(null);
		buttons.forEach((btn, index) => {
			if (btn.fontSrc && !btn.fontFamily) {
				const fontSrc = getRealPath(btn.fontSrc);
				let fontFamily = fonts[fontSrc];
				if (!fontFamily) {
					fontFamily = `font${Date.now()}`;
					fonts[fontSrc] = fontFamily;
					onBeforeMount(() => updateStyle("uni-btn-" + fontFamily, `@font-face{font-family: "${fontFamily}";src: url("${fontSrc}") format("truetype")}`));
				}
				btn.fontFamily = fontFamily;
			}
			const pageHeadBtn = usePageHeadButton(id, index, btn, isTransparent);
			if (btn.float === "left") left.push(pageHeadBtn);
			else right.push(pageHeadBtn);
		});
	}
	return {
		left,
		right
	};
}
function usePageHeadButton(pageId, index, btn, isTransparent) {
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
			invokeHook(pageId, ON_NAVIGATION_BAR_BUTTON_TAP, extend({ index }, btn));
		},
		btnSelect: btn.select
	}, { get(target, key, receiver) {
		if (["btnText"].includes(key)) return btn.fontSrc && btn.fontFamily ? btn.text.replace("\\u", "&#x") : btn.text;
		else return Reflect.get(target, key, receiver);
	} });
}
function usePageHeadSearchInput({ id, navigationBar: { searchInput } }) {
	const focus = ref(false);
	const text = ref("");
	const composing = ref(false);
	const { disabled } = searchInput;
	if (disabled) {
		const onClick = () => {
			invokeHook(id, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
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
		invokeHook(id, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, { focus: true });
	};
	const onBlur = () => {
		focus.value = false;
		invokeHook(id, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, { focus: false });
	};
	const onInput = (evt) => {
		text.value = evt.detail.value;
		invokeHook(id, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, { text: text.value });
	};
	const onConfirm = (evt) => {
		invokeHook(id, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, { text: text.value });
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
//#endregion
//#region src/framework/components/page/page-refresh/component.vue?vue&type=script&lang.ts
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
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region src/framework/components/page/page-refresh/component.vue
var _hoisted_1 = { class: "uni-page-refresh-inner" };
var _hoisted_2 = ["fill"];
var _hoisted_5 = [/* @__PURE__ */ createElementVNode("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }, null, -1), /* @__PURE__ */ createElementVNode("path", {
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
	return openBlock(), createElementBlock("uni-page-refresh", null, [createElementVNode("div", {
		style: normalizeStyle({ "margin-top": $setup.offset + "px" }),
		class: "uni-page-refresh"
	}, [createElementVNode("div", _hoisted_1, [(openBlock(), createElementBlock("svg", {
		fill: $setup.color,
		class: "uni-page-refresh__icon",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24"
	}, _hoisted_5, 8, _hoisted_2)), (openBlock(), createElementBlock("svg", _hoisted_6, [createElementVNode("circle", {
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
var component_default = /*#__PURE__*/ _plugin_vue_export_helper_default(component_vue_vue_type_script_lang_default, [["render", _sfc_render]]);
//#endregion
//#region src/framework/components/page/page-refresh/index.ts
function processDeltaY(ev, identifier, startY) {
	const touch = Array.prototype.slice.call(ev.changedTouches).filter((touch) => touch.identifier === identifier)[0];
	if (!touch) return false;
	ev.deltaY = touch.pageY - startY;
	return true;
}
var PULLING = "pulling";
var REACHED = "reached";
var ABORTING = "aborting";
var REFRESHING = "refreshing";
var RESTORING = "restoring";
function usePageRefresh(refreshRef) {
	const pageMeta = usePageMeta();
	const { id, pullToRefresh } = pageMeta;
	const { range, height } = pullToRefresh;
	let refreshContainerElem;
	let refreshControllerElem;
	let refreshControllerElemStyle;
	let refreshInnerElemStyle;
	useSubscribe(() => {
		if (!pageMeta.enablePullDownRefresh) return;
		if (!state) {
			state = REFRESHING;
			addClass();
			setTimeout(() => {
				refreshing();
			}, 50);
		}
	}, API_START_PULL_DOWN_REFRESH, false, id);
	useSubscribe(() => {
		if (!pageMeta.enablePullDownRefresh) return;
		if (state === REFRESHING) {
			removeClass();
			state = RESTORING;
			addClass();
			restoring(() => {
				removeClass();
				state = distance = offset = null;
			});
		}
	}, API_STOP_PULL_DOWN_REFRESH, false, id);
	function initElement() {
		refreshContainerElem = refreshRef.value.$el;
		refreshControllerElem = refreshContainerElem.querySelector(".uni-page-refresh");
		refreshControllerElemStyle = refreshControllerElem.style;
		refreshInnerElemStyle = refreshControllerElem.querySelector(".uni-page-refresh-inner").style;
	}
	onMounted(() => {
		initElement();
	});
	watch(() => pageMeta.enablePullDownRefresh, (enablePullDownRefresh) => {
		if (enablePullDownRefresh) nextTick(() => {
			initElement();
		});
	});
	let touchId;
	let startY;
	let canRefresh;
	let state;
	let distance = null;
	let offset = null;
	function toggleClass(type) {
		if (!state) return;
		if (refreshContainerElem) refreshContainerElem.classList[type]("uni-page-refresh--" + state);
	}
	function addClass() {
		toggleClass("add");
	}
	function removeClass() {
		toggleClass("remove");
	}
	function pulling(deltaY) {
		if (!refreshControllerElem) return;
		let rotate = deltaY / range;
		if (rotate > 1) rotate = 1;
		else rotate = rotate * rotate * rotate;
		const y = Math.round(deltaY / (range / height)) || 0;
		refreshInnerElemStyle.transform = "rotate(" + 360 * rotate + "deg)";
		refreshControllerElemStyle.clip = "rect(" + (45 - y) + "px,45px,45px,-5px)";
		refreshControllerElemStyle.transform = "translate3d(-50%, " + y + "px, 0)";
	}
	const onTouchstartPassive = withWebEvent((ev) => {
		if (!pageMeta.enablePullDownRefresh) return;
		const touch = ev.changedTouches[0];
		touchId = touch.identifier;
		startY = touch.pageY;
		if ([
			ABORTING,
			REFRESHING,
			RESTORING
		].indexOf(state) >= 0) canRefresh = false;
		else canRefresh = true;
	});
	const onTouchmove = withWebEvent((ev) => {
		if (!pageMeta.enablePullDownRefresh) return;
		if (!canRefresh) return;
		if (!processDeltaY(ev, touchId, startY)) return;
		let { deltaY } = ev;
		if ((document.documentElement.scrollTop || document.body.scrollTop) !== 0) {
			touchId = null;
			return;
		}
		if (deltaY < 0 && !state) return;
		if (ev.cancelable) ev.preventDefault();
		if (distance === null) {
			offset = deltaY;
			state = PULLING;
			addClass();
		}
		deltaY = deltaY - offset;
		if (deltaY < 0) deltaY = 0;
		distance = deltaY;
		if (deltaY >= range && state !== REACHED || deltaY < range && state !== PULLING) {
			removeClass();
			state = state === REACHED ? PULLING : REACHED;
			addClass();
		}
		pulling(deltaY);
	});
	const onTouchend = withWebEvent((ev) => {
		if (!pageMeta.enablePullDownRefresh) return;
		if (!processDeltaY(ev, touchId, startY)) return;
		if (state === null) return;
		if (state === PULLING) {
			removeClass();
			state = ABORTING;
			addClass();
			aborting(() => {
				removeClass();
				state = distance = offset = null;
			});
		} else if (state === REACHED) {
			removeClass();
			state = REFRESHING;
			addClass();
			refreshing();
		}
	});
	function aborting(callback) {
		if (!refreshControllerElem) return;
		if (refreshControllerElemStyle.transform) {
			refreshControllerElemStyle.transition = "-webkit-transform 0.3s";
			refreshControllerElemStyle.transform = "translate3d(-50%, 0, 0)";
			const abortTransitionEnd = function() {
				timeout && clearTimeout(timeout);
				refreshControllerElem.removeEventListener("webkitTransitionEnd", abortTransitionEnd);
				refreshControllerElemStyle.transition = "";
				callback();
			};
			refreshControllerElem.addEventListener("webkitTransitionEnd", abortTransitionEnd);
			const timeout = setTimeout(abortTransitionEnd, 350);
		} else callback();
	}
	function refreshing() {
		if (!refreshControllerElem) return;
		refreshControllerElemStyle.transition = "-webkit-transform 0.2s";
		refreshControllerElemStyle.transform = "translate3d(-50%, " + height + "px, 0)";
		invokeHook(id, ON_PULL_DOWN_REFRESH);
	}
	function restoring(callback) {
		if (!refreshControllerElem) return;
		refreshControllerElemStyle.transition = "-webkit-transform 0.3s";
		refreshControllerElemStyle.transform += " scale(0.01)";
		const restoreTransitionEnd = function() {
			timeout && clearTimeout(timeout);
			refreshControllerElem.removeEventListener("webkitTransitionEnd", restoreTransitionEnd);
			refreshControllerElemStyle.transition = "";
			refreshControllerElemStyle.transform = "translate3d(-50%, 0, 0)";
			callback();
		};
		refreshControllerElem.addEventListener("webkitTransitionEnd", restoreTransitionEnd);
		const timeout = setTimeout(restoreTransitionEnd, 350);
	}
	return {
		onTouchstartPassive,
		onTouchmove,
		onTouchend,
		onTouchcancel: onTouchend
	};
}
//#endregion
//#region src/framework/components/page/pageBody.tsx
var pageBody_default = /*#__PURE__*/ defineSystemComponent({
	name: "PageBody",
	setup(props, ctx) {
		const pageMeta = __UNI_FEATURE_PULL_DOWN_REFRESH__ && usePageMeta();
		const refreshRef = __UNI_FEATURE_PULL_DOWN_REFRESH__ && ref(null);
		const wrapperRef = ref(null);
		const _pageRefresh = __UNI_FEATURE_PULL_DOWN_REFRESH__ && (pageMeta.enablePullDownRefresh || true) ? usePageRefresh(refreshRef) : null;
		const pageRefresh = ref(null);
		watch(() => {
			return pageMeta.enablePullDownRefresh;
		}, () => {
			pageRefresh.value = pageMeta.enablePullDownRefresh ? _pageRefresh : null;
		}, { immediate: true });
		function _resize() {
			const { top, left, right, bottom } = getSafeAreaInsets(wrapperRef.value);
			const vars = {
				"--uni-safe-area-inset-top": `${top}px`,
				"--uni-safe-area-inset-left": `${left}px`,
				"--uni-safe-area-inset-right": `${right}px`,
				"--uni-safe-area-inset-bottom": `${bottom}px`
			};
			for (const key in vars) wrapperRef.value.style.setProperty(key, vars[key]);
		}
		return () => {
			const pageRefreshTsx = __UNI_FEATURE_PULL_DOWN_REFRESH__ && createPageRefreshTsx(refreshRef, pageMeta);
			const pageResizeSensor = createVNode(resize_sensor_default, { "onResize": _resize }, null, 8, ["onResize"]);
			return createVNode(Fragment, null, [pageRefreshTsx, createVNode("uni-page-wrapper", mergeProps({ "ref": wrapperRef }, pageRefresh.value), [createVNode("uni-page-body", null, [renderSlot(ctx.slots, "default")]), pageResizeSensor], 16)]);
		};
	}
});
function createPageRefreshTsx(refreshRef, pageMeta) {
	return createVNode(component_default, { "ref": refreshRef }, null, 512);
}
//#endregion
//#region src/framework/components/page/index.ts
var page_default = /*#__PURE__*/ defineSystemComponent({
	name: "Page",
	setup(_props, ctx) {
		let pageMeta = providePageMeta(getStateId());
		const navigationBar = pageMeta.navigationBar;
		const pageStyle = {};
		useDocumentTitle(pageMeta);
		const currentInstance = getCurrentInstance();
		currentInstance.$dialogPages = ref([]);
		currentInstance.$systemDialogPages = ref([]);
		if (isDialogPageInstance(ctx)) {
			var _uniRoutes$find;
			pageMeta.route = ctx.attrs.route;
			const routePageMeta = (_uniRoutes$find = __uniRoutes.find((route) => route.path === pageMeta.route.split("?")[0])) === null || _uniRoutes$find === void 0 ? void 0 : _uniRoutes$find.meta;
			if (routePageMeta) {
				routePageMeta.navigationBar = Object.assign(navigationBar, routePageMeta.navigationBar);
				pageMeta = Object.assign(pageMeta, routePageMeta);
			}
			if (!(routePageMeta === null || routePageMeta === void 0 ? void 0 : routePageMeta.backgroundColorContent)) pageMeta.backgroundColorContent = "transparent";
			if (!(routePageMeta === null || routePageMeta === void 0 ? void 0 : routePageMeta.navigationBar.style)) pageMeta.navigationBar.style = "custom";
			if (ctx.attrs["data-type"] === "systemDialog") pageMeta.navigationBar.titleText = "";
			const parentInstance = inject("parentInstance");
			if (currentInstance && parentInstance) {
				currentInstance.$parentInstance = parentInstance;
				assignDialogPage(ctx, parentInstance, currentInstance);
			}
		} else {
			useBackgroundColorContent(pageMeta);
			provide("parentInstance", currentInstance);
		}
		return () => createVNode("uni-page", {
			"data-page": pageMeta.route,
			style: pageStyle
		}, __UNI_FEATURE_NAVIGATIONBAR__ && navigationBar.style !== "custom" ? [
			createVNode(pageHead_default),
			createPageBodyVNode(ctx),
			createDialogPageVNode(currentInstance.$dialogPages, currentInstance.$systemDialogPages)
		] : [createPageBodyVNode(ctx), createDialogPageVNode(currentInstance.$dialogPages, currentInstance.$systemDialogPages)]);
	}
});
function assignDialogPage(ctx, parentInstance, currentInstance) {
	let parentDialogPages = [];
	if (isNormalDialogPageInstance(ctx)) parentDialogPages = parentInstance.$dialogPages.value;
	if (isSystemDialogPageInstance(ctx)) parentDialogPages = parentInstance.$systemDialogPages.value;
	if (!parentDialogPages.length) return;
	for (let i = 0; i < parentDialogPages.length; i++) {
		const dialogPage = parentDialogPages[i];
		if (!dialogPage.$assigned) {
			dialogPage.$assigned = true;
			currentInstance.$dialogPage = dialogPage;
			break;
		}
	}
}
function createPageBodyVNode(ctx) {
	return openBlock(), createBlock(pageBody_default, { key: 0 }, {
		default: withCtx(() => [renderSlot(ctx.slots, "page")]),
		_: 3
	});
}
function createDialogPageVNode(normalDialogPages, systemDialogPages) {
	const dialogPages = [...normalDialogPages.value.map((page) => ({
		page,
		type: DIALOG_TAG
	})), ...systemDialogPages.value.map((page) => ({
		page,
		type: SYSTEM_DIALOG_TAG
	}))];
	dialogPages.sort((a, b) => {
		var _a$page$vm, _b$page$vm;
		return (((_a$page$vm = a.page.vm) === null || _a$page$vm === void 0 || (_a$page$vm = _a$page$vm.$basePage) === null || _a$page$vm === void 0 ? void 0 : _a$page$vm.id) || Number.MAX_SAFE_INTEGER) - (((_b$page$vm = b.page.vm) === null || _b$page$vm === void 0 || (_b$page$vm = _b$page$vm.$basePage) === null || _b$page$vm === void 0 ? void 0 : _b$page$vm.id) || Number.MAX_SAFE_INTEGER);
	});
	return openBlock(true), createElementBlock(Fragment, null, renderList(dialogPages, (dialogPage) => {
		const { type, page } = dialogPage;
		const fullUrl = `${page.route}${stringifyQuery(page.options)}`;
		return openBlock(), createBlock(createVNode(page.$component, {
			key: fullUrl,
			style: {
				position: "fixed",
				"z-index": 999,
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},
			"data-type": type,
			route: fullUrl
		}, null));
	}));
}
//#endregion
//#region src/x/framework/utils.ts
function renderPage(component, props) {
	return openBlock(), createBlock(page_default, null, {
		page: withCtx(() => [createVNode(component, extend({}, props, { ref: "page" }), null, 512)]),
		_: 1
	});
}
//#endregion
//#region src/x/framework/route.ts
var systemRoutes = [];
function registerSystemRoute(route, page, meta = {}) {
	if (systemRoutes.includes(route)) return;
	systemRoutes.push(route);
	if (isArray(page.styles) && page.styles.length > 0) page.styles.forEach((style, index) => {
		updateStyle(`${route}-style-${index}`, style);
	});
	const __uniPage = setupPage(page);
	__uniRoutes.push({
		path: route,
		component: {
			mpType: "page",
			setup() {
				const app = getApp();
				const query = app && app.$route && app.$route.query || {};
				return () => renderPage(__uniPage, query);
			}
		},
		meta: extend({
			isQuit: false,
			isEntry: false,
			navigationBar: {},
			route
		}, meta)
	});
}
//#endregion
//#region ../uni-components/src/helpers/html-parser.js
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
var empty = /*#__PURE__*/ makeMap$1("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
var block = /*#__PURE__*/ makeMap$1("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
var inline = /*#__PURE__*/ makeMap$1("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
var closeSelf = /*#__PURE__*/ makeMap$1("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
var fillAttrs = /*#__PURE__*/ makeMap$1("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
var special = /*#__PURE__*/ makeMap$1("script,style");
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
function makeMap$1(str) {
	var obj = {};
	var items = str.split(",");
	for (var i = 0; i < items.length; i++) obj[items[i]] = true;
	return obj;
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/loadScript.ts
var scripts = {};
function loadScript(globalName, src, callback) {
	if (isString(globalName) ? window[globalName] : globalName) {
		callback();
		return;
	}
	let callbacks = scripts[src];
	if (!callbacks) {
		callbacks = scripts[src] = [];
		const script = document.createElement("script");
		script.src = src;
		document.body.appendChild(script);
		script.onload = function() {
			callbacks.forEach((callback) => callback());
			delete scripts[src];
		};
	}
	callbacks.push(callback);
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/divider.ts
function divider_default(Quill) {
	const BlockEmbed = Quill.import("blots/block/embed");
	class Divider extends BlockEmbed {}
	Divider.blotName = "divider";
	Divider.tagName = "HR";
	return { "formats/divider": Divider };
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/ins.ts
function ins_default(Quill) {
	const Inline = Quill.import("blots/inline");
	class Ins extends Inline {}
	Ins.blotName = "ins";
	Ins.tagName = "INS";
	return { "formats/ins": Ins };
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/align.ts
function align_default(Quill) {
	const { Scope, Attributor } = Quill.import("parchment");
	const config = {
		scope: Scope.BLOCK,
		whitelist: [
			"left",
			"right",
			"center",
			"justify"
		]
	};
	return { "formats/align": new Attributor.Style("align", "text-align", config) };
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/direction.ts
function direction_default(Quill) {
	const { Scope, Attributor } = Quill.import("parchment");
	const config = {
		scope: Scope.BLOCK,
		whitelist: ["rtl"]
	};
	return { "formats/direction": new Attributor.Style("direction", "direction", config) };
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/list.ts
function list_default(Quill) {
	const Parchment = Quill.import("parchment");
	const Container = Quill.import("blots/container");
	const ListItem = Quill.import("formats/list/item");
	class List extends Container {
		static create(value) {
			const tagName = value === "ordered" ? "OL" : "UL";
			const node = super.create(tagName);
			if (value === "checked" || value === "unchecked") node.setAttribute("data-checked", value === "checked");
			return node;
		}
		static formats(domNode) {
			if (domNode.tagName === "OL") return "ordered";
			if (domNode.tagName === "UL") if (domNode.hasAttribute("data-checked")) return domNode.getAttribute("data-checked") === "true" ? "checked" : "unchecked";
			else return "bullet";
		}
		constructor(domNode) {
			super(domNode);
			const listEventHandler = (e) => {
				if (e.target.parentNode !== domNode) return;
				const format = this.statics.formats(domNode);
				const blot = Parchment.find(e.target);
				if (format === "checked") blot.format("list", "unchecked");
				else if (format === "unchecked") blot.format("list", "checked");
			};
			domNode.addEventListener("click", listEventHandler);
		}
		format(name, value) {
			if (this.children.length > 0) this.children.tail.format(name, value);
		}
		formats() {
			return { [this.statics.blotName]: this.statics.formats(this.domNode) };
		}
		insertBefore(blot, ref) {
			if (blot instanceof ListItem) super.insertBefore(blot, ref);
			else {
				const index = ref == null ? this.length() : ref.offset(this);
				const after = this.split(index);
				after.parent.insertBefore(blot, after);
			}
		}
		optimize(context) {
			super.optimize(context);
			const next = this.next;
			if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && next.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked")) {
				next.moveChildren(this);
				next.remove();
			}
		}
		replace(target) {
			if (target.statics.blotName !== this.statics.blotName) {
				const item = Parchment.create(this.statics.defaultChild);
				target.moveChildren(item);
				this.appendChild(item);
			}
			super.replace(target);
		}
	}
	List.blotName = "list";
	List.scope = Parchment.Scope.BLOCK_BLOT;
	List.tagName = ["OL", "UL"];
	List.defaultChild = "list-item";
	List.allowedChildren = [ListItem];
	return { "formats/list": List };
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/background.ts
function background_default(Quill) {
	const { Scope } = Quill.import("parchment");
	return { "formats/backgroundColor": new (Quill.import("formats/background")).constructor("backgroundColor", "background-color", { scope: Scope.INLINE }) };
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/box.ts
function box_default(Quill) {
	const { Scope, Attributor } = Quill.import("parchment");
	const config = { scope: Scope.BLOCK };
	const margin = [
		"margin",
		"marginTop",
		"marginBottom",
		"marginLeft",
		"marginRight"
	];
	const padding = [
		"padding",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight"
	];
	const result = {};
	margin.concat(padding).forEach((name) => {
		result[`formats/${name}`] = new Attributor.Style(name, hyphenate(name), config);
	});
	return result;
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/font.ts
function font_default(Quill) {
	const { Scope, Attributor } = Quill.import("parchment");
	const config = { scope: Scope.INLINE };
	const font = [
		"font",
		"fontSize",
		"fontStyle",
		"fontVariant",
		"fontWeight",
		"fontFamily"
	];
	const result = {};
	font.forEach((name) => {
		result[`formats/${name}`] = new Attributor.Style(name, hyphenate(name), config);
	});
	return result;
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/text.ts
function text_default$1(Quill) {
	const { Scope, Attributor } = Quill.import("parchment");
	const text = [
		{
			name: "lineHeight",
			scope: Scope.BLOCK
		},
		{
			name: "letterSpacing",
			scope: Scope.INLINE
		},
		{
			name: "textDecoration",
			scope: Scope.INLINE
		},
		{
			name: "textIndent",
			scope: Scope.BLOCK
		}
	];
	const result = {};
	text.forEach(({ name, scope }) => {
		result[`formats/${name}`] = new Attributor.Style(name, hyphenate(name), { scope });
	});
	return result;
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/image.ts
function image_default$1(Quill) {
	const Image = Quill.import("formats/image");
	const ATTRIBUTES = [
		"alt",
		"height",
		"width",
		"data-custom",
		"class",
		"data-local"
	];
	Image.sanitize = (url) => url ? getRealPath(url) : url;
	Image.formats = function formats(domNode) {
		return ATTRIBUTES.reduce(function(formats, attribute) {
			if (domNode.hasAttribute(attribute)) formats[attribute] = domNode.getAttribute(attribute);
			return formats;
		}, {});
	};
	const format = Image.prototype.format;
	Image.prototype.format = function(name, value) {
		if (ATTRIBUTES.indexOf(name) > -1) if (value) this.domNode.setAttribute(name, value);
		else this.domNode.removeAttribute(name);
		else format.call(this, name, value);
	};
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/link.ts
function link_default(Quill) {
	const Link = Quill.import("formats/link");
	Link.sanitize = (url) => {
		const anchor = document.createElement("a");
		anchor.href = url;
		const protocol = anchor.href.slice(0, anchor.href.indexOf(":"));
		return Link.PROTOCOL_WHITELIST.concat("file").indexOf(protocol) > -1 ? url : Link.SANITIZED_URL;
	};
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/mention.ts
var SupportStyleList = [
	"color",
	"background",
	"padding",
	"radius"
];
var MentionStyleMap = {
	color: "color",
	background: "background",
	padding: "padding",
	radius: "border-radius"
};
function getMentionStyleValue(node, styleKey) {
	const cssName = MentionStyleMap[styleKey];
	if (!cssName) return "";
	return node.style.getPropertyValue(cssName).trim();
}
var isApple = /^Apple/.test(navigator.vendor);
function mention_default(Quill) {
	const Embed = Quill.import("blots/embed");
	class MentionBlot extends Embed {
		static create(data) {
			const node = super.create();
			const id = data.id == null ? "" : data.id;
			const name = data.name == null ? "" : data.name;
			if (!isApple) node.setAttribute("contenteditable", "false");
			node.setAttribute("data-id", id);
			node.setAttribute("data-name", name);
			let style = "";
			if (isApple) style += "-webkit-user-select: none;";
			SupportStyleList.forEach((item) => {
				const styleName = MentionStyleMap[item] || item;
				if (data[item]) style += `${hyphenate(styleName)}: ${data[item]};`;
			});
			if (style) node.setAttribute("style", style);
			node.innerText = `@${name}`;
			return node;
		}
		static value(node) {
			const value = {
				id: node.dataset.id == null ? "" : node.dataset.id,
				name: node.dataset.name == null ? "" : node.dataset.name
			};
			SupportStyleList.forEach((item) => {
				const styleValue = getMentionStyleValue(node, item);
				if (styleValue) value[item] = styleValue;
			});
			return value;
		}
	}
	MentionBlot.blotName = "mention";
	MentionBlot.tagName = "span";
	MentionBlot.className = "mention";
	return { "formats/mention": MentionBlot };
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/formats/index.ts
function register(Quill) {
	const formats = {
		divider: divider_default,
		ins: ins_default,
		align: align_default,
		direction: direction_default,
		list: list_default,
		background: background_default,
		box: box_default,
		font: font_default,
		text: text_default$1,
		image: image_default$1,
		link: link_default,
		mention: mention_default
	};
	const options = {};
	Object.values(formats).forEach((value) => extend(options, value(Quill)));
	Quill.register(options, true);
}
//#endregion
//#region ../uni-components/src/vue/editor/quill/index.ts
function useQuill(props, rootRef, trigger) {
	let quillReady;
	let skipMatcher;
	let quill;
	watch(() => props.readOnly, (value) => {
		if (quillReady) {
			quill.enable(!value);
			if (value) quill.blur();
		}
	});
	watch(() => props.placeholder, (value) => {
		if (quillReady) setPlaceHolder(value);
	});
	watch(() => props.type, (value) => {
		if (quillReady) setInputMode(value);
	});
	function html2delta(html) {
		const tags = [
			"span",
			"strong",
			"b",
			"ins",
			"em",
			"i",
			"u",
			"a",
			"del",
			"s",
			"sub",
			"sup",
			"img",
			"div",
			"p",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"hr",
			"ol",
			"ul",
			"li",
			"br",
			"blockquote",
			"pre",
			"code"
		];
		let content = "";
		let disable;
		HTMLParser(html, {
			start: function(tag, attrs, unary) {
				if (!tags.includes(tag)) {
					disable = !unary;
					return;
				}
				disable = false;
				const start = `<${tag} ${attrs.map(({ name, value }) => `${name}="${value}"`).join(" ")} ${unary ? "/" : ""}>`;
				content += start;
			},
			end: function(tag) {
				if (!disable) content += `</${tag}>`;
			},
			chars: function(text) {
				if (!disable) content += text;
			}
		});
		skipMatcher = true;
		const delta = quill.clipboard.convert(content);
		skipMatcher = false;
		return delta;
	}
	function getContents() {
		return {
			html: quill.root.innerHTML,
			text: quill.getText(),
			delta: quill.getContents()
		};
	}
	function setPlaceHolder(placeholder) {
		const placeHolderAttrName = "data-placeholder";
		const QuillRoot = quill.root;
		QuillRoot.getAttribute(placeHolderAttrName) !== placeholder && QuillRoot.setAttribute(placeHolderAttrName, placeholder);
	}
	function setInputMode(type) {
		const QuillRoot = quill.root;
		if (type === "none") QuillRoot.setAttribute("inputmode", "none");
		else QuillRoot.removeAttribute("inputmode");
	}
	let oldStatus = {};
	function updateStatus(range) {
		const status = range ? quill.getFormat(range) : {};
		const keys = Object.keys(status);
		if (keys.length !== Object.keys(oldStatus).length || keys.find((key) => status[key] !== oldStatus[key])) {
			oldStatus = status;
			trigger("statuschange", {}, status);
		}
	}
	function fixCursor() {
		var _leaf$statics;
		const range = quill.getSelection();
		if (!range) return;
		const [leaf] = quill.getLeaf(range.index - 1);
		if ((leaf === null || leaf === void 0 || (_leaf$statics = leaf.statics) === null || _leaf$statics === void 0 ? void 0 : _leaf$statics.blotName) === "mention") quill.setSelection(range.index, 0, "silent");
	}
	function textChangeHandler() {
		fixCursor();
		trigger("input", {}, getContents());
	}
	function initQuill(imageResizeModules) {
		const Quill = window.Quill;
		register(Quill);
		const options = {
			toolbar: false,
			readOnly: props.readOnly,
			placeholder: props.placeholder
		};
		if (imageResizeModules.length) {
			Quill.register("modules/ImageResize", window.ImageResize.default);
			options.modules = {
				syntax: true,
				ImageResize: { modules: imageResizeModules }
			};
		}
		const rootEl = rootRef.value;
		quill = new Quill(rootEl, options);
		setInputMode(props.type);
		const $el = quill.root;
		[
			"focus",
			"blur",
			"input"
		].forEach((name) => {
			$el.addEventListener(name, ($event) => {
				const contents = getContents();
				if (name === "input") {
					if (getBaseSystemInfo().platform === "ios") {
						const regExpContent = (contents.html.match(/<span [\s\S]*>([\s\S]*)<\/span>/) || [])[1];
						setPlaceHolder(regExpContent && regExpContent.replace(/\s/g, "") ? "" : props.placeholder);
					}
					$event.stopPropagation();
				} else trigger(name, $event, contents);
			});
		});
		quill.on("text-change", textChangeHandler);
		quill.on("selection-change", updateStatus);
		quill.on("scroll-optimize", () => {
			const range = quill.selection.getRange()[0];
			updateStatus(range);
		});
		quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
			if (skipMatcher) return delta;
			if (delta.ops) delta.ops = delta.ops.filter(({ insert }) => isString(insert)).map(({ insert }) => ({ insert }));
			return delta;
		});
		quillReady = true;
		trigger("ready", {}, {});
	}
	useSubscribe((type, data, resolve) => {
		const { options, callbackId } = data;
		let res;
		let range;
		let errMsg;
		if (quillReady) {
			const Quill = window.Quill;
			switch (type) {
				case "format":
					{
						let { name = "", value = false } = options;
						range = quill.getSelection(true);
						if (!name) break;
						let format = quill.getFormat(range)[name] || false;
						if ([
							"bold",
							"italic",
							"underline",
							"strike",
							"ins"
						].includes(name)) value = !format;
						else if (name === "direction") {
							value = value === "rtl" && format ? false : value;
							const align = quill.getFormat(range).align;
							if (value === "rtl" && !align) quill.format("align", "right", "user");
							else if (!value && align === "right") quill.format("align", false, "user");
						} else if (name === "indent") {
							const rtl = quill.getFormat(range).direction === "rtl";
							value = value === "+1";
							if (rtl) value = !value;
							value = value ? "+1" : "-1";
						} else {
							if (name === "list") {
								value = value === "check" ? "unchecked" : value;
								format = format === "checked" ? "unchecked" : format;
							}
							value = format && format !== (value || false) || !format && value ? value : !format;
						}
						quill.format(name, value, "user");
					}
					break;
				case "insertDivider":
					range = quill.getSelection(true);
					quill.insertText(range.index, LINEFEED, "user");
					quill.insertEmbed(range.index + 1, "divider", true, "user");
					quill.setSelection(range.index + 2, 0, "silent");
					break;
				case "insertMention":
					{
						range = quill.getSelection(true);
						const mentionData = extend({
							id: "",
							name: ""
						}, options);
						quill.insertEmbed(range.index, "mention", mentionData, "user");
						quill.setSelection(range.index + 1, 0);
					}
					break;
				case "insertImage":
					{
						range = quill.getSelection(true);
						const { src = "", alt = "", width = "", height = "", extClass = "", data = {} } = options;
						const path = getRealPath(src);
						quill.insertEmbed(range.index, "image", path, "silent");
						const local = /^(file|blob):/.test(path) ? path : false;
						quill.formatText(range.index, 1, "data-local", local, "silent");
						quill.formatText(range.index, 1, "alt", alt, "silent");
						quill.formatText(range.index, 1, "width", width, "silent");
						quill.formatText(range.index, 1, "height", height, "silent");
						quill.formatText(range.index, 1, "class", extClass, "silent");
						quill.formatText(range.index, 1, "data-custom", Object.keys(data).map((key) => `${key}=${data[key]}`).join("&"), "silent");
						quill.setSelection(range.index + 1, 0, "silent");
						quill.scrollIntoView();
						setTimeout(() => {
							textChangeHandler();
						}, 1e3);
					}
					break;
				case "insertText":
					{
						range = quill.getSelection(true);
						const { text = "" } = options;
						quill.insertText(range.index, text, "user");
						quill.setSelection(range.index + text.length, 0, "silent");
					}
					break;
				case "insertLink":
					{
						range = quill.getSelection(true);
						const { text = "", href = "" } = options;
						if (!href) break;
						if (range.length > 0) quill.format("link", href, "user");
						else {
							const linkText = text || href;
							quill.insertText(range.index, linkText, "link", href, "user");
							quill.setSelection(range.index + linkText.length, 0, "silent");
						}
					}
					break;
				case "setContents":
					{
						const { delta, html } = options;
						if (typeof delta === "object") quill.setContents(delta, "silent");
						else if (isString(html)) quill.setContents(html2delta(html), "silent");
						else errMsg = "contents is missing";
					}
					break;
				case "getContents":
					res = getContents();
					break;
				case "clear":
					quill.setText("");
					break;
				case "removeFormat":
					{
						range = quill.getSelection(true);
						const parchment = Quill.import("parchment");
						if (range.length) quill.removeFormat(range.index, range.length, "user");
						else Object.keys(quill.getFormat(range)).forEach((key) => {
							if (parchment.query(key, parchment.Scope.INLINE)) quill.format(key, false);
						});
					}
					break;
				case "undo":
					quill.history.undo();
					break;
				case "redo":
					quill.history.redo();
					break;
				case "blur":
					quill.blur();
					break;
				case "getSelectionText":
					range = quill.selection.savedRange;
					res = { text: "" };
					if (range && range.length !== 0) res.text = quill.getText(range.index, range.length);
					break;
				case "scrollIntoView":
					quill.scrollIntoView();
					break;
				default: break;
			}
			updateStatus(range);
		} else errMsg = "not ready";
		if (callbackId) resolve({
			callbackId,
			data: extend({}, res, { errMsg: `${type}:${errMsg ? "fail " + errMsg : "ok"}` })
		});
	}, useContextInfo(), true);
	onMounted(() => {
		const imageResizeModules = [];
		if (props.showImgSize) imageResizeModules.push("DisplaySize");
		if (props.showImgToolbar) imageResizeModules.push("Toolbar");
		if (props.showImgResize) imageResizeModules.push("Resize");
		const quillSrc = "https://unpkg.com/quill@1.3.7/dist/quill.min.js";
		loadScript("hljs", "https://unpkg.com/@highlightjs/cdn-assets@11.11.1/highlight.min.js", () => {
			loadScript(window.Quill, quillSrc, () => {
				if (imageResizeModules.length) loadScript(window.ImageResize, "https://unpkg.com/quill-image-resize-mp@3.0.1/image-resize.min.js", () => {
					initQuill(imageResizeModules);
				});
				else initQuill(imageResizeModules);
			});
		});
	});
}
//#endregion
//#region ../uni-components/src/vue/editor/index.tsx
var props$26 = /*#__PURE__*/ extend({}, props$27, {
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
var UniEditorElement = class extends UniElement {};
var editor_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Editor",
	props: props$26,
	emit: [
		"ready",
		"focus",
		"blur",
		"input",
		"statuschange",
		...emit$1
	],
	rootElement: {
		name: "uni-editor",
		class: UniEditorElement
	},
	setup(props, { emit }) {
		const rootRef = ref(null);
		const trigger = useCustomEvent(rootRef, emit);
		useQuill(props, rootRef, trigger);
		useKeyboard$1(props, rootRef, trigger);
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-editor", {
				"ref": rootRef,
				"id": props.id,
				"class": "ql-container"
			}, null, 8, ["id"]);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/icon/index.tsx
var INFO_COLOR = "#10aeff";
var WARN_COLOR = "#f76260";
var GREY_COLOR = "#b2b2b2";
var ICONS = {
	success: {
		d: ICON_PATH_SUCCESS,
		c: PRIMARY_COLOR
	},
	success_no_circle: {
		d: ICON_PATH_SUCCESS_NO_CIRCLE,
		c: PRIMARY_COLOR
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
		c: PRIMARY_COLOR
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
var UniIconElement = class extends UniElement {};
var icon_default = /*#__PURE__*/ defineBuiltInComponent({
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
	rootElement: {
		name: "uni-icon",
		class: UniIconElement
	},
	setup(props) {
		const rootRef = ref(null);
		const path = computed(() => ICONS[props.type]);
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			const { value } = path;
			return createVNode("uni-icon", { "ref": rootRef }, [value && value.d && createSvgIconVNode(value.d, props.color || value.c, rpx2px(props.size))], 512);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/resize-sensor/index.tsx
var resize_sensor_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "ResizeSensor",
	props: { initial: {
		type: Boolean,
		default: false
	} },
	emits: ["resize"],
	setup(props, { emit }) {
		const rootRef = ref(null);
		const reset = useResizeSensorReset(rootRef);
		const update = useResizeSensorUpdate(rootRef, emit, reset);
		useResizeSensorLifecycle(rootRef, props, update, reset);
		return () => createVNode("uni-resize-sensor", {
			"ref": rootRef,
			"onAnimationstartOnce": update
		}, [createVNode("div", { "onScroll": update }, [createVNode("div", null, null)], 40, ["onScroll"]), createVNode("div", { "onScroll": update }, [createVNode("div", null, null)], 40, ["onScroll"])], 40, ["onAnimationstartOnce"]);
	}
});
function useResizeSensorUpdate(rootRef, emit, reset) {
	const size = reactive({
		width: -1,
		height: -1
	});
	watch(() => extend({}, size), (value) => emit("resize", value));
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
function useResizeSensorLifecycle(rootRef, props, update, reset) {
	onActivated(reset);
	onMounted(() => {
		if (props.initial) nextTick(update);
		const rootEl = rootRef.value;
		if (rootEl.offsetParent !== rootEl.parentElement) rootEl.parentElement.style.position = "relative";
		if (!("AnimationEvent" in window)) reset();
	});
}
//#endregion
//#region ../uni-components/src/vue/image/index.tsx
var props$25 = {
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
var UniImageElement = class extends UniElement {};
var image_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Image",
	props: props$25,
	rootElement: {
		name: "uni-image",
		class: UniImageElement
	},
	setup(props, { emit }) {
		const rootRef = ref(null);
		const state = useImageState(rootRef, props);
		const trigger = useCustomEvent(rootRef, emit);
		const { fixSize } = useImageSize(rootRef, props, state);
		useImageLoader(state, props, rootRef, fixSize, trigger);
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.defineProperty(rootElement, "src", {
				get() {
					return rootElement.querySelector("img").src;
				},
				set(value) {
					rootElement.querySelector("div").style.backgroundImage = `url("${value}")`;
					rootElement.querySelector("img").src = value;
				}
			});
			rootElement.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-image", { "ref": rootRef }, [createVNode("div", { "style": state.modeStyle }, null, 4), FIX_MODES[props.mode] ? createVNode(resize_sensor_default, { "onResize": fixSize }, null, 8, ["onResize"]) : createVNode("span", null, null)], 512);
		};
	}
});
function useImageState(rootRef, props) {
	const imgSrc = ref("");
	const modeStyleRef = computed(() => {
		let size = "auto";
		let position = "";
		const opts = IMAGE_MODES[props.mode];
		if (!opts) {
			position = "0% 0%";
			size = "100% 100%";
		} else {
			opts[0] && (position = opts[0]);
			opts[1] && (size = opts[1]);
		}
		return `background-image:${imgSrc.value ? "url(\"" + imgSrc.value + "\")" : "none"};background-position:${position};background-size:${size};`;
	});
	const state = reactive({
		rootEl: rootRef,
		src: computed(() => props.src ? getRealPath(props.src) : ""),
		origWidth: 0,
		origHeight: 0,
		origStyle: {
			width: "",
			height: ""
		},
		modeStyle: modeStyleRef,
		imgSrc
	});
	onMounted(() => {
		const rootEl = rootRef.value;
		state.origWidth = rootEl.clientWidth || 0;
		state.origHeight = rootEl.clientHeight || 0;
	});
	return state;
}
function useImageLoader(state, props, rootRef, fixSize, trigger) {
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
			nextTick(() => {
				fixSize();
			});
			img.draggable = props.draggable;
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
	watch(() => state.src, (value) => loadImage(value));
	watch(() => state.imgSrc, (value) => {
		if (!value && draggableImg) {
			draggableImg.remove();
			draggableImg = null;
		}
	});
	onMounted(() => loadImage(state.src));
	onBeforeUnmount(() => resetImage());
}
var isChrome = navigator.vendor === "Google Inc.";
function fixNumber(num) {
	if (isChrome && num > 10) num = Math.round(num / 2) * 2;
	return num;
}
function useImageSize(rootRef, props, state) {
	const fixSize = () => {
		const { mode } = props;
		const names = FIX_MODES[mode];
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
	watch(() => props.mode, (value, oldValue) => {
		if (FIX_MODES[oldValue]) resetSize();
		if (FIX_MODES[value]) fixSize();
	});
	return {
		fixSize,
		resetSize
	};
}
//#endregion
//#region ../uni-components/src/helpers/throttle.ts
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
//#endregion
//#region ../uni-components/src/helpers/useUserAction.ts
var passiveOptions$1 = /*#__PURE__*/ passive(true);
var states = [];
var userInteract = 0;
var inited = false;
var setUserAction = (userAction) => states.forEach((vm) => vm.userAction = userAction);
function addInteractListener(vm = { userAction: false }) {
	if (!inited) {
		[
			"touchstart",
			"touchmove",
			"touchend",
			"mousedown",
			"mouseup"
		].forEach((eventName) => {
			document.addEventListener(eventName, function() {
				!userInteract && setUserAction(true);
				userInteract++;
				setTimeout(() => {
					!--userInteract && setUserAction(false);
				}, 0);
			}, passiveOptions$1);
		});
		inited = true;
	}
	states.push(vm);
}
function removeInteractListener(vm) {
	const index = states.indexOf(vm);
	if (index >= 0) states.splice(index, 1);
}
var getInteractStatus = () => !!userInteract;
function useUserAction() {
	const state = reactive({ 
	/**
	* 是否用户激活
	*/
userAction: false });
	onMounted(() => {
		addInteractListener(state);
	});
	onBeforeUnmount(() => {
		removeInteractListener(state);
	});
	return { state };
}
//#endregion
//#region ../uni-components/src/helpers/useScopedAttrs.ts
function useScopedAttrs() {
	const state = reactive({ attrs: {} });
	onMounted(() => {
		let instance = getCurrentInstance();
		while (instance) {
			const scopeId = instance.type.__scopeId;
			if (scopeId) state.attrs[scopeId] = "";
			instance = instance.proxy && instance.proxy.$mpType === "page" ? null : instance.parent;
		}
	});
	return { state };
}
//#endregion
//#region ../uni-components/src/helpers/useFormField.ts
function useFormField(nameKey, value) {
	const uniForm = inject(uniFormKey, false);
	if (!uniForm) return;
	const instance = getCurrentInstance();
	const initialValue = isString(value) ? instance.proxy[value] : value.value;
	const ctx = {
		submit() {
			const proxy = instance.proxy;
			return [proxy[nameKey], isString(value) ? proxy[value] : value.value];
		},
		reset() {
			if (isString(value)) instance.proxy[value] = initialValue;
			else value.value = initialValue;
		}
	};
	uniForm.addField(ctx);
	onBeforeUnmount(() => {
		uniForm.removeField(ctx);
	});
}
//#endregion
//#region ../uni-components/src/helpers/useField.ts
function getSelectedTextRange$1(_, resolve) {
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
	registerViewMethod(getCurrentPageId(), "getSelectedTextRange", getSelectedTextRange$1);
};
var startTime;
function getValueString(value, type, maxlength) {
	if (type === "number" && isNaN(Number(value))) value = "";
	const valueStr = value === null || value === void 0 ? "" : String(value);
	if (maxlength == void 0) return valueStr;
	return valueStr.slice(0, maxlength);
}
var INPUT_MODES = [
	"none",
	"text",
	"decimal",
	"numeric",
	"tel",
	"search",
	"email",
	"url"
];
var props$24 = /*#__PURE__*/ extend({}, {
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
	/**
	* 已废弃属性，用于历史兼容
	*/
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
		default: Infinity
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
}, props$27);
var emit = [
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
function useBase(props, rootRef, emit) {
	const fieldRef = ref(null);
	const trigger = useCustomEvent(rootRef, emit);
	const selectionStart = computed(() => {
		const selectionStart = Number(props.selectionStart);
		return isNaN(selectionStart) ? -1 : selectionStart;
	});
	const selectionEnd = computed(() => {
		const selectionEnd = Number(props.selectionEnd);
		return isNaN(selectionEnd) ? -1 : selectionEnd;
	});
	const cursor = computed(() => {
		const cursor = Number(props.cursor);
		return isNaN(cursor) ? -1 : cursor;
	});
	const maxlength = computed(() => {
		var maxlength = Number(props.maxlength);
		return isNaN(maxlength) || maxlength < 0 ? Infinity : Math.floor(maxlength);
	});
	let value = "";
	{
		const modelValueString = getValueString(props.modelValue, props.type, maxlength.value);
		const valueString = getValueString(props.value, props.type, maxlength.value);
		value = props.modelValue !== void 0 ? modelValueString !== null && modelValueString !== void 0 ? modelValueString : valueString : valueString;
	}
	const state = reactive({
		value,
		valueOrigin: value,
		maxlength,
		focus: props.focus,
		composing: false,
		selectionStart,
		selectionEnd,
		cursor
	});
	watch(() => state.focus, (val) => emit("update:focus", val));
	watch(() => state.maxlength, (val) => state.value = state.value.slice(0, val), { immediate: true });
	return {
		fieldRef,
		state,
		trigger
	};
}
function useValueSync(props, state, emit, trigger, fieldRef) {
	let valueChangeFn = null;
	valueChangeFn = throttle((val) => {
		state.value = getValueString(val, props.type, state.maxlength);
	}, 100);
	watch(() => props.modelValue, valueChangeFn);
	watch(() => props.value, valueChangeFn);
	const triggerInputFn = throttle((event, detail) => {
		valueChangeFn.cancel();
		emit("update:modelValue", detail.value);
		emit("update:value", detail.value);
		trigger("input", event, detail);
	}, 100);
	const triggerInput = (event, detail, force) => {
		valueChangeFn.cancel();
		detail.value;
		triggerInputFn(event, detail);
		if (force) triggerInputFn.flush();
	};
	onBeforeMount(() => {
		valueChangeFn.cancel();
		triggerInputFn.cancel();
	});
	return {
		trigger,
		triggerInput
	};
}
function useAutoFocus(props, fieldRef) {
	const { state: userActionState } = useUserAction();
	const needFocus = computed(() => props.autoFocus || props.focus);
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
	watch(() => props.focus, (value) => {
		if (value) focus();
		else blur();
	});
	onMounted(() => {
		startTime = startTime || Date.now();
		if (needFocus.value) nextTick(focus);
	});
}
function useEvent(fieldRef, state, props, trigger, triggerInput, beforeInput) {
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
			if (isFunction(beforeInput) && beforeInput(event, state) === false) return;
			state.value = field.value;
			if (!state.composing || !props.ignoreCompositionEvent) triggerInput(event, {
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
			if (!props.ignoreCompositionEvent) trigger(event.type, event, { value: event.data });
		}
	}
	watch([() => state.selectionStart, () => state.selectionEnd], checkSelection);
	watch(() => state.cursor, checkCursor);
	watch(() => fieldRef.value, initField);
}
function useField(props, rootRef, emit, beforeInput) {
	UniViewJSBridgeSubscribe();
	const { fieldRef, state, trigger } = useBase(props, rootRef, emit);
	const { triggerInput } = useValueSync(props, state, emit, trigger, fieldRef);
	useAutoFocus(props, fieldRef);
	useKeyboard$1(props, fieldRef, trigger);
	const { state: scopedAttrsState } = useScopedAttrs();
	useFormField("name", state);
	useEvent(fieldRef, state, props, trigger, triggerInput, beforeInput);
	return {
		fieldRef,
		state,
		scopedAttrsState,
		fixDisabledColor: String(navigator.vendor).indexOf("Apple") === 0 && CSS.supports("image-orientation:from-image"),
		trigger
	};
}
once(() => {
	{
		const ua = navigator.userAgent;
		let osVersion = "";
		const osVersionFind = ua.match(/OS\s([\w_]+)\slike/);
		if (osVersionFind) osVersion = osVersionFind[1].replace(/_/g, ".");
		else if (/Macintosh|Mac/i.test(ua) && navigator.maxTouchPoints > 0) {
			const versionMatched = ua.match(/Version\/(\S*)\b/);
			if (versionMatched) osVersion = versionMatched[1];
		}
		return !!osVersion && parseInt(osVersion) >= 16 && parseFloat(osVersion) < 17.2;
	}
});
//#endregion
//#region ../uni-components/src/vue/input/index.tsx
var props$23 = /*#__PURE__*/ extend({}, props$24, {
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
function useCache(props, type) {
	if (type.value === "number") {
		const value = typeof props.modelValue === "undefined" ? props.value : props.modelValue;
		const cache = ref(typeof value !== "undefined" && value !== null ? value.toLocaleString() : "");
		watch(() => props.modelValue, (value) => {
			cache.value = typeof value !== "undefined" && value !== null ? value.toLocaleString() : "";
		});
		watch(() => props.value, (value) => {
			cache.value = typeof value !== "undefined" && value !== null ? value.toLocaleString() : "";
		});
		return cache;
	} else return ref("");
}
var UniInputElement = class extends UniElement {
	focus(options) {
		var _this$querySelector;
		(_this$querySelector = this.querySelector("input")) === null || _this$querySelector === void 0 || _this$querySelector.focus(options);
	}
};
var input_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Input",
	props: props$23,
	emits: ["confirm", ...emit],
	rootElement: {
		name: "uni-input",
		class: UniInputElement
	},
	setup(props, { emit, expose }) {
		const INPUT_TYPES = [
			"text",
			"number",
			"idcard",
			"digit",
			"password",
			"tel"
		];
		const AUTOCOMPLETES = ["off", "one-time-code"];
		const type = computed(() => {
			let type = "";
			switch (props.type) {
				case "text":
					type = "text";
					if (props.confirmType === "search") type = "search";
					break;
				case "idcard":
					type = "text";
					break;
				case "digit":
					type = "number";
					break;
				case "none":
					type = "text";
					break;
				default:
					type = INPUT_TYPES.includes(props.type) ? props.type : "text";
					break;
			}
			return props.password ? "password" : type;
		});
		const autocomplete = computed(() => {
			const camelizeIndex = AUTOCOMPLETES.indexOf(props.textContentType);
			const kebabCaseIndex = AUTOCOMPLETES.indexOf(hyphenate(props.textContentType));
			return AUTOCOMPLETES[camelizeIndex !== -1 ? camelizeIndex : kebabCaseIndex !== -1 ? kebabCaseIndex : 0];
		});
		const inputmode = computed(() => {
			if (props.inputmode !== void 0) return props.inputmode;
			if (INPUT_MODES.includes(props.type)) return props.type;
			return {
				number: "numeric",
				digit: "decimal",
				idcard: "text"
			}[props.type];
		});
		let cache = useCache(props, type);
		const rootRef = ref(null);
		const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } = useField(props, rootRef, emit, (event, state) => {});
		watch(() => state.value, (value) => {
			if (props.type === "number" && !(cache.value === "-" && value === "")) cache.value = value.toString();
		});
		watch(() => props.maxlength, (length) => {
			length = parseInt(length, 10);
			const realValue = state.value.slice(0, length);
			realValue !== state.value && (state.value = realValue);
		});
		const NUMBER_TYPES = ["number", "digit"];
		const step = computed(() => NUMBER_TYPES.includes(props.type) ? props.step : "");
		function onKeyUpEnter(event) {
			if (event.key !== "Enter") return;
			const input = event.target;
			event.stopPropagation();
			trigger("confirm", event, { value: input.value });
			!props.confirmHold && input.blur();
		}
		expose({ $triggerInput: (detail) => {
			emit("update:modelValue", detail.value);
			emit("update:value", detail.value);
			state.value = detail.value;
		} });
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.defineProperty(rootElement, "value", {
				get() {
					return rootElement.querySelector("input").value;
				},
				set(value) {
					rootElement.querySelector("input").value = value;
				}
			});
			rootElement.attachVmProps(props);
		});
		return () => {
			let inputNode = props.disabled && fixDisabledColor ? createVNode("input", {
				"key": "disabled-input",
				"ref": fieldRef,
				"value": state.value,
				"tabindex": "-1",
				"readonly": !!props.disabled,
				"type": type.value,
				"maxlength": state.maxlength,
				"step": step.value,
				"class": "uni-input-input",
				"style": props.cursorColor ? { caretColor: props.cursorColor } : {},
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
			]) : createVNode("input", {
				"key": "input",
				"ref": fieldRef,
				"value": state.value,
				"onInput": withModifiers((event) => {
					const value = event.target.value.toString();
					if (type.value === "number" && state.maxlength > 0 && value.length > state.maxlength) {
						if (isPaste(event)) state.value = value.slice(0, state.maxlength);
						return;
					}
					if (value.length === 0 && event.inputType === "insertText" && event.data === ".") return;
					state.value = value;
				}, ["stop"]),
				"disabled": !!props.disabled,
				"type": type.value,
				"maxlength": state.maxlength,
				"step": step.value,
				"enterkeyhint": props.confirmType,
				"pattern": props.type === "number" ? "[0-9]*" : void 0,
				"class": "uni-input-input",
				"style": props.cursorColor ? { caretColor: props.cursorColor } : {},
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
			return createVNode("uni-input", { "ref": rootRef }, [createVNode("div", { "class": "uni-input-wrapper" }, [withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
				"style": props.placeholderStyle,
				"class": ["uni-input-placeholder", props.placeholderClass]
			}), [props.placeholder], 16), [[vShow, !(state.value.length || cache.value === "-" || cache.value.includes("."))]]), props.confirmType === "search" ? createVNode("form", {
				"action": "",
				"onSubmit": (event) => event.preventDefault(),
				"class": "uni-input-form"
			}, [inputNode], 40, ["onSubmit"]) : inputNode])], 512);
		};
	}
});
//#endregion
//#region ../uni-components/src/helpers/useAttrs.ts
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
function disableScrollBounce({ disable }) {}
//#endregion
//#region ../uni-components/src/helpers/flatVNode.ts
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
//#region ../uni-components/src/components/movableArea.ts
var movableAreaProps = { scaleArea: {
	type: Boolean,
	default: false
} };
//#endregion
//#region ../uni-components/src/vue/movable-area/index.tsx
var UniMovableAreaElement = class extends UniElement {};
var movable_area_default = /*#__PURE__*/ defineBuiltInComponent({
	inheritAttrs: false,
	name: "MovableArea",
	props: movableAreaProps,
	rootElement: {
		name: "uni-movable-area",
		class: UniMovableAreaElement
	},
	setup(props, { slots }) {
		const rootRef = ref(null);
		const _isMounted = ref(false);
		let { setContexts, events: movableAreaEvents } = useMovableAreaState(props, rootRef);
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
		onMounted(() => {
			movableAreaEvents._resize();
			_isMounted.value = true;
		});
		let movableViewItems = [];
		const originMovableViewContexts = [];
		function updateMovableViewContexts() {
			const contexts = [];
			for (let index = 0; index < movableViewItems.length; index++) {
				let movableViewItem = movableViewItems[index];
				movableViewItem = movableViewItem.el;
				const movableViewContext = originMovableViewContexts.find((context) => movableViewItem === context.rootRef.value);
				if (movableViewContext) contexts.push(markRaw(movableViewContext));
			}
			setContexts(contexts);
		}
		const addMovableViewContext = (movableViewContext) => {
			originMovableViewContexts.push(movableViewContext);
			updateMovableViewContexts();
		};
		const removeMovableViewContext = (movableViewContext) => {
			const index = originMovableViewContexts.indexOf(movableViewContext);
			if (index >= 0) {
				originMovableViewContexts.splice(index, 1);
				updateMovableViewContexts();
			}
		};
		provide("_isMounted", _isMounted);
		provide("movableAreaRootRef", rootRef);
		provide("addMovableViewContext", addMovableViewContext);
		provide("removeMovableViewContext", removeMovableViewContext);
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			movableViewItems = flatVNode(slots.default && slots.default());
			return createVNode("uni-movable-area", mergeProps({ "ref": rootRef }, $attrs.value, $excludeAttrs.value, _listeners), [createVNode(resize_sensor_default, { "onResize": movableAreaEvents._resize }, null, 8, ["onResize"]), movableViewItems], 16);
		};
	}
});
function calc(e) {
	return Math.sqrt(e.x * e.x + e.y * e.y);
}
function useMovableAreaState(props, rootRef) {
	const width = ref(0);
	const height = ref(0);
	const gapV = reactive({
		x: null,
		y: null
	});
	const pinchStartLen = ref(null);
	let _scaleMovableView = null;
	let movableViewContexts = [];
	function _updateScale(e) {
		if (e && e !== 1) {
			if (props.scaleArea) movableViewContexts.forEach(function(item) {
				item._setScale(e);
			});
			else if (_scaleMovableView) _scaleMovableView._setScale(e);
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
	const _onTouchstart = withWebEvent((t) => {
		disableScrollBounce({ disable: true });
		let i = t.touches;
		if (i) {
			if (i.length > 1) {
				let r = {
					x: i[1].pageX - i[0].pageX,
					y: i[1].pageY - i[0].pageY
				};
				pinchStartLen.value = calc(r);
				gapV.x = r.x;
				gapV.y = r.y;
				if (!props.scaleArea) {
					let touch0 = _find(i[0].target);
					let touch1 = _find(i[1].target);
					_scaleMovableView = touch0 && touch0 === touch1 ? touch0 : null;
				}
			}
		}
	});
	const _onTouchmove = withWebEvent((t) => {
		let n = t.touches;
		if (n) {
			if (n.length > 1) {
				t.preventDefault();
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
	const _onTouchend = withWebEvent((e) => {
		disableScrollBounce({ disable: false });
		let t = e.touches;
		if (!(t && t.length)) {
			if (e.changedTouches) {
				gapV.x = 0;
				gapV.y = 0;
				pinchStartLen.value = null;
				if (props.scaleArea) movableViewContexts.forEach(function(item) {
					item._endScale();
				});
				else if (_scaleMovableView) _scaleMovableView._endScale();
			}
		}
	});
	function _resize() {
		_getWH();
		movableViewContexts.forEach(function(item, index) {
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
	provide("movableAreaWidth", width);
	provide("movableAreaHeight", height);
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
//#endregion
//#region ../uni-components/src/helpers/useTouchtrack.ts
var addListenerToElement = function(element, type, callback, capture) {
	element.addEventListener(type, ($event) => {
		if (isFunction(callback)) {
			if (callback($event) === false) {
				if (typeof $event.cancelable !== "undefined" ? $event.cancelable : true) $event.preventDefault();
				$event.stopPropagation();
			}
		}
	}, { passive: false });
};
var __mouseMoveEventListener;
var __mouseUpEventListener;
function useTouchtrack(element, method, useCancel) {
	onBeforeUnmount(() => {
		document.removeEventListener("mousemove", __mouseMoveEventListener);
		document.removeEventListener("mouseup", __mouseUpEventListener);
	});
	let x0 = 0;
	let y0 = 0;
	let x1 = 0;
	let y1 = 0;
	const fn = function($event, state, x, y) {
		if (method({
			cancelable: $event.cancelable,
			target: $event.target,
			currentTarget: $event.currentTarget,
			preventDefault: $event.preventDefault.bind($event),
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
				timeStamp: $event.timeStamp
			}
		}) === false) return false;
	};
	let $eventOld = null;
	let hasTouchStart;
	let hasMouseDown;
	addListenerToElement(element, "touchstart", function($event) {
		hasTouchStart = true;
		if ($event.touches.length === 1 && !$eventOld) {
			$eventOld = $event;
			x0 = x1 = $event.touches[0].pageX;
			y0 = y1 = $event.touches[0].pageY;
			return fn($event, "start", x0, y0);
		}
	});
	addListenerToElement(element, "mousedown", function($event) {
		hasMouseDown = true;
		if (!hasTouchStart && !$eventOld) {
			$eventOld = $event;
			x0 = x1 = $event.pageX;
			y0 = y1 = $event.pageY;
			return fn($event, "start", x0, y0);
		}
	});
	addListenerToElement(element, "touchmove", function($event) {
		if ($event.touches.length === 1 && $eventOld) {
			const res = fn($event, "move", $event.touches[0].pageX, $event.touches[0].pageY);
			x1 = $event.touches[0].pageX;
			y1 = $event.touches[0].pageY;
			return res;
		}
	});
	const mouseMoveEventListener = __mouseMoveEventListener = function($event) {
		if (!hasTouchStart && hasMouseDown && $eventOld) {
			const res = fn($event, "move", $event.pageX, $event.pageY);
			x1 = $event.pageX;
			y1 = $event.pageY;
			return res;
		}
	};
	document.addEventListener("mousemove", mouseMoveEventListener);
	addListenerToElement(element, "touchend", function($event) {
		if ($event.touches.length === 0 && $eventOld) {
			hasTouchStart = false;
			$eventOld = null;
			return fn($event, "end", $event.changedTouches[0].pageX, $event.changedTouches[0].pageY);
		}
	});
	const mouseUpEventListener = __mouseUpEventListener = function($event) {
		hasMouseDown = false;
		if (!hasTouchStart && $eventOld) {
			$eventOld = null;
			return fn($event, "end", $event.pageX, $event.pageY);
		}
	};
	document.addEventListener("mouseup", mouseUpEventListener);
	addListenerToElement(element, "touchcancel", function($event) {
		if ($eventOld) {
			hasTouchStart = false;
			const $eventTemp = $eventOld;
			$eventOld = null;
			return fn($event, useCancel ? "cancel" : "end", $eventTemp.touches[0].pageX, $eventTemp.touches[0].pageY);
		}
	});
}
//#endregion
//#region ../uni-components/src/components/movable-view/utils.js
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
function Friction$1(e, t) {
	this._m = e;
	this._f = 1e3 * t;
	this._startTime = 0;
	this._v = 0;
}
Friction$1.prototype.setV = function(x, y) {
	const n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), .5);
	this._x_v = x;
	this._y_v = y;
	this._x_a = -this._f * this._x_v / n;
	this._y_a = -this._f * this._y_v / n;
	this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a);
	this._lastDt = null;
	this._startTime = (/* @__PURE__ */ new Date()).getTime();
};
Friction$1.prototype.setS = function(x, y) {
	this._x_s = x;
	this._y_s = y;
};
Friction$1.prototype.s = function(t) {
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
Friction$1.prototype.ds = function(t) {
	if (void 0 === t) t = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	if (t > this._t) t = this._t;
	return {
		dx: this._x_v + this._x_a * t,
		dy: this._y_v + this._y_a * t
	};
};
Friction$1.prototype.delta = function() {
	return {
		x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0,
		y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0
	};
};
Friction$1.prototype.dt = function() {
	return -this._x_v / this._x_a;
};
Friction$1.prototype.done = function() {
	const t = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t;
	this._lastDt = null;
	return t;
};
Friction$1.prototype.setEnd = function(x, y) {
	this._endPositionX = x;
	this._endPositionY = y;
};
Friction$1.prototype.reconfigure = function(m, f) {
	this._m = m;
	this._f = 1e3 * f;
};
function Spring$1(m, k, c) {
	this._m = m;
	this._k = k;
	this._c = c;
	this._solution = null;
	this._endPosition = 0;
	this._startTime = 0;
}
Spring$1.prototype._solve = function(e, t) {
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
Spring$1.prototype.x = function(e) {
	if (void 0 === e) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return this._solution ? this._endPosition + this._solution.x(e) : 0;
};
Spring$1.prototype.dx = function(e) {
	if (void 0 === e) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
	return this._solution ? this._solution.dx(e) : 0;
};
Spring$1.prototype.setEnd = function(e, n, i) {
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
Spring$1.prototype.snap = function(e) {
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
Spring$1.prototype.done = function(n) {
	if (!n) n = (/* @__PURE__ */ new Date()).getTime();
	return e(this.x(), this._endPosition, .1) && t(this.dx(), .1);
};
Spring$1.prototype.reconfigure = function(m, t, c) {
	this._m = m;
	this._k = t;
	this._c = c;
	if (!this.done()) {
		this._solution = this._solve(this.x() - this._endPosition, this.dx());
		this._startTime = (/* @__PURE__ */ new Date()).getTime();
	}
};
Spring$1.prototype.springConstant = function() {
	return this._k;
};
Spring$1.prototype.damping = function() {
	return this._c;
};
Spring$1.prototype.configuration = function() {
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
	this._springX = new Spring$1(e, t, n);
	this._springY = new Spring$1(e, t, n);
	this._springScale = new Spring$1(e, t, n);
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
//#region ../uni-components/src/components/movable-view/index.ts
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
//#region ../uni-components/src/vue/movable-view/index.tsx
var UniMovableViewElement = class extends UniElement {};
var movable_view_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "MovableView",
	props: movableViewProps,
	emits: ["change", "scale"],
	rootElement: {
		name: "uni-movable-view",
		class: UniMovableViewElement
	},
	setup(props, { slots, emit }) {
		const rootRef = ref(null);
		const { setParent } = useMovableViewState(props, useCustomEvent(rootRef, emit), rootRef);
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-movable-view", { "ref": rootRef }, [createVNode(resize_sensor_default, { "onResize": setParent }, null, 8, ["onResize"]), slots.default && slots.default()], 512);
		};
	}
});
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
function p(t, n) {
	if (t === n) return 0;
	let i = t.offsetLeft;
	return t.offsetParent ? i += p(t.offsetParent, n) : 0;
}
function f(t, n) {
	if (t === n) return 0;
	let i = t.offsetTop;
	return t.offsetParent ? i += f(t.offsetParent, n) : 0;
}
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
function _getPx(val) {
	if (/\d+[ur]px$/i.test(val)) return uni.upx2px(parseFloat(val));
	return Number(val) || 0;
}
function useMovableViewLayout(rootRef, _scale, _adjustScale) {
	const movableAreaWidth = inject("movableAreaWidth", ref(0));
	const movableAreaHeight = inject("movableAreaHeight", ref(0));
	const movableAreaRootRef = inject("movableAreaRootRef");
	const _offset = {
		x: 0,
		y: 0
	};
	const _scaleOffset = {
		x: 0,
		y: 0
	};
	const width = ref(0);
	const height = ref(0);
	const minX = ref(0);
	const minY = ref(0);
	const maxX = ref(0);
	const maxY = ref(0);
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
function useMovableViewTransform(rootRef, props, _scaleOffset, _scale, maxX, maxY, minX, minY, _translateX, _translateY, _SFA, _FA, _adjustScale, trigger) {
	const dampingNumber = computed(() => {
		let val = Number(props.damping);
		return isNaN(val) ? 20 : val;
	});
	const xMove = computed(() => props.direction === "all" || props.direction === "horizontal");
	const yMove = computed(() => props.direction === "all" || props.direction === "vertical");
	const xSync = ref(_getPx(props.x));
	const ySync = ref(_getPx(props.y));
	watch(() => props.x, (val) => {
		xSync.value = _getPx(val);
	});
	watch(() => props.y, (val) => {
		ySync.value = _getPx(val);
	});
	watch(xSync, (val) => {
		_setX(val);
	});
	watch(ySync, (val) => {
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
		if (!props.scale) scale = _scale.value;
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
		_STD._springX._endPosition = _translateX.value;
		_STD._springY._endPosition = _translateY.value;
		_STD._springScale._endPosition = _scale.value;
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
		if (!props.scale) scale = _scale.value;
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
function useMovableViewInit(props, rootRef, trigger, _scale, _oldScale, _isScaling, _translateX, _translateY, _SFA, _FA) {
	const scaleMinNumber = computed(() => {
		let val = Number(props.scaleMin);
		return isNaN(val) ? .1 : val;
	});
	const scaleMaxNumber = computed(() => {
		let val = Number(props.scaleMax);
		return isNaN(val) ? 10 : val;
	});
	const scaleValueSync = ref(Number(props.scaleValue) || 1);
	watch(scaleValueSync, (val) => {
		_setScaleValue(val);
	});
	watch(scaleMinNumber, () => {
		_setScaleMinOrMax();
	});
	watch(scaleMaxNumber, () => {
		_setScaleMinOrMax();
	});
	watch(() => props.scaleValue, (val) => {
		scaleValueSync.value = Number(val) || 0;
	});
	const { _updateBoundary, _updateOffset, _updateWH, _scaleOffset, minX, minY, maxX, maxY } = useMovableViewLayout(rootRef, _scale, _adjustScale);
	const { FAandSFACancel, _getLimitXY, _animationTo, _setTransform, _revise, dampingNumber, xMove, yMove, xSync, ySync, _STD } = useMovableViewTransform(rootRef, props, _scaleOffset, _scale, maxX, maxY, minX, minY, _translateX, _translateY, _SFA, _FA, _adjustScale, trigger);
	function _updateScale(scale, animat) {
		if (props.scale) {
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
		if (!props.scale) return false;
		_updateScale(_scale.value, true);
		_updateOldScale(_scale.value);
	}
	function _setScaleValue(scale) {
		if (!props.scale) return false;
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
function useMovableViewState(props, trigger, rootRef) {
	const _isMounted = inject("_isMounted", ref(false));
	const addMovableViewContext = inject("addMovableViewContext", () => {});
	const removeMovableViewContext = inject("removeMovableViewContext", () => {});
	let _scale = ref(1);
	let _oldScale = ref(1);
	let _isScaling = ref(false);
	let _translateX = ref(0);
	let _translateY = ref(0);
	let _SFA = null;
	let _FA = null;
	let _isTouching = false;
	let __baseX;
	let __baseY;
	let _checkCanMove = null;
	let _firstMoveDirection = null;
	const _declineX = new Decline();
	const _declineY = new Decline();
	const __touchInfo = {
		historyX: [0, 0],
		historyY: [0, 0],
		historyT: [0, 0]
	};
	const frictionNumber = computed(() => {
		let val = Number(props.friction);
		return isNaN(val) || val <= 0 ? 2 : val;
	});
	const _friction = new Friction$1(1, frictionNumber.value);
	watch(() => props.disabled, () => {
		__handleTouchStart();
	});
	const { _updateOldScale, _endScale, _setScale, scaleValueSync, _updateBoundary, _updateOffset, _updateWH, _scaleOffset, minX, minY, maxX, maxY, FAandSFACancel, _getLimitXY, _setTransform, _revise, dampingNumber, xMove, yMove, xSync, ySync, _STD } = useMovableViewInit(props, rootRef, trigger, _scale, _oldScale, _isScaling, _translateX, _translateY, _SFA, _FA);
	function __handleTouchStart() {
		if (!_isScaling.value) {
			if (!props.disabled) {
				disableScrollBounce({ disable: true });
				FAandSFACancel();
				__touchInfo.historyX = [0, 0];
				__touchInfo.historyY = [0, 0];
				__touchInfo.historyT = [0, 0];
				if (xMove.value) __baseX = _translateX.value;
				if (yMove.value) __baseY = _translateY.value;
				rootRef.value.style.willChange = "transform";
				_checkCanMove = null;
				_firstMoveDirection = null;
				_isTouching = true;
			}
		}
	}
	function __handleTouchMove(event) {
		if (!_isScaling.value && !props.disabled && _isTouching) {
			let x = _translateX.value;
			let y = _translateY.value;
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
				event.preventDefault();
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
					_setTransform(x, y, _scale.value, source);
				});
			}
		}
	}
	function __handleTouchEnd() {
		if (!_isScaling.value && !props.disabled && _isTouching) {
			disableScrollBounce({ disable: false });
			rootRef.value.style.willChange = "auto";
			_isTouching = false;
			if (!_checkCanMove && !_revise("out-of-bounds") && props.inertia) {
				const xv = 1e3 * (__touchInfo.historyX[1] - __touchInfo.historyX[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
				const yv = 1e3 * (__touchInfo.historyY[1] - __touchInfo.historyY[0]) / (__touchInfo.historyT[1] - __touchInfo.historyT[0]);
				const __translateX = _translateX.value;
				const __translateY = _translateY.value;
				_friction.setV(xv, yv);
				_friction.setS(__translateX, __translateY);
				const x0 = _friction.delta().x;
				const y0 = _friction.delta().y;
				let x = x0 + __translateX;
				let y = y0 + __translateY;
				if (x < minX.value) {
					x = minX.value;
					y = __translateY + (minX.value - __translateX) * y0 / x0;
				} else if (x > maxX.value) {
					x = maxX.value;
					y = __translateY + (maxX.value - __translateX) * y0 / x0;
				}
				if (y < minY.value) {
					y = minY.value;
					x = __translateX + (minY.value - __translateY) * x0 / y0;
				} else if (y > maxY.value) {
					y = maxY.value;
					x = __translateX + (maxY.value - __translateY) * x0 / y0;
				}
				_friction.setEnd(x, y);
				_FA = g(_friction, function() {
					let t = _friction.s();
					let x = t.x;
					let y = t.y;
					_setTransform(x, y, _scale.value, "friction");
				}, function() {
					_FA.cancel();
				});
			}
		}
		if (!props.outOfBounds && !props.inertia) FAandSFACancel();
	}
	function setParent() {
		if (!_isMounted.value) return;
		FAandSFACancel();
		let scale = props.scale ? scaleValueSync.value : 1;
		_updateOffset();
		_updateWH(scale);
		_updateBoundary();
		let limitXY = _getLimitXY(xSync.value + _scaleOffset.x, ySync.value + _scaleOffset.y);
		let x = limitXY.x;
		let y = limitXY.y;
		_setTransform(x, y, scale, "", true);
		_updateOldScale(scale);
	}
	onMounted(() => {
		useTouchtrack(rootRef.value, (event) => {
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
		setParent();
		_friction.reconfigure(1, frictionNumber.value);
		_STD.reconfigure(1, 9 * Math.pow(dampingNumber.value, 2) / 40, dampingNumber.value);
		rootRef.value.style.transformOrigin = "center";
		const context = {
			rootRef,
			setParent,
			_endScale,
			_setScale
		};
		addMovableViewContext(context);
		onUnmounted(() => {
			removeMovableViewContext(context);
		});
	});
	onUnmounted(() => {
		FAandSFACancel();
	});
	return { setParent };
}
//#endregion
//#region ../uni-components/src/components/navigator.ts
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
		const onFail = (error) => {
			console.error(error.errMsg);
		};
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
//#region ../uni-components/src/vue/navigator/index.tsx
var UniNavigatorElement = class extends UniElement {};
var navigator_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Navigator",
	inheritAttrs: false,
	compatConfig: { MODE: 3 },
	props: /*#__PURE__*/ extend({}, navigatorProps, { renderLink: {
		type: Boolean,
		default: true
	} }),
	rootElement: {
		name: "uni-navigator",
		class: UniNavigatorElement
	},
	setup(props, { slots }) {
		const rootRef = ref(null);
		const vm = getCurrentInstance();
		const __scopeId = vm && vm.vnode.scopeId || "";
		const { hovering, binding } = useHover(props);
		const onClick = createNavigatorOnClick(props);
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			const { hoverClass, url } = props;
			const hasHoverClass = props.hoverClass && props.hoverClass !== "none";
			const innerNode = props.renderLink ? createVNode("a", {
				"class": "navigator-wrap",
				"href": url,
				"onClick": onEventPrevent,
				"onMousedown": onEventPrevent
			}, [slots.default && slots.default()], 40, [
				"href",
				"onClick",
				"onMousedown"
			]) : slots.default && slots.default();
			return createVNode("uni-navigator", mergeProps({
				"class": hasHoverClass && hovering.value ? hoverClass : "",
				"ref": rootRef
			}, hasHoverClass && binding, vm ? vm.attrs : {}, { [__scopeId]: "" }, { "onClick": onClick }), [innerNode], 16, ["onClick"]);
		};
	}
});
//#endregion
//#region ../uni-components/src/components/pickerView.ts
var pickerViewProps = {
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
};
//#endregion
//#region ../uni-components/src/vue/picker-view/index.tsx
function useState$3(props) {
	const state = reactive({
		value: reactive([...props.value]),
		height: 34
	});
	watch(() => props.value, (val, oldVal) => {
		state.value.length = val.length;
		val.forEach((val, index) => {
			if (val !== state.value[index]) state.value.splice(index, 1, val);
		});
	});
	return state;
}
var UniPickerViewElement = class extends UniElement {};
var picker_view_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "PickerView",
	props: pickerViewProps,
	emits: [
		"change",
		"pickstart",
		"pickend",
		"update:value"
	],
	rootElement: {
		name: "uni-picker-view",
		class: UniPickerViewElement
	},
	setup(props, { slots, emit }) {
		const rootRef = ref(null);
		const wrapperRef = ref(null);
		const trigger = useCustomEvent(rootRef, emit);
		const state = useState$3(props);
		const resizeSensorRef = ref(null);
		const onMountedCallback = () => {
			const resizeSensor = resizeSensorRef.value;
			resizeSensor && (state.height = resizeSensor.$el.offsetHeight);
		};
		onMounted(onMountedCallback);
		let ColumnsPreRef = ref([]);
		let columnsRef = ref([]);
		function getItemIndex(vnode) {
			let columnVNodes = columnsRef.value;
			columnVNodes = columnVNodes.filter((vnode) => vnode.type !== Comment);
			let index = columnVNodes.indexOf(vnode);
			return index !== -1 ? index : ColumnsPreRef.value.indexOf(vnode);
		}
		const getPickerViewColumn = function(columnInstance) {
			return computed({
				get() {
					const index = getItemIndex(columnInstance.vnode);
					return state.value[index] || 0;
				},
				set(current) {
					const index = getItemIndex(columnInstance.vnode);
					if (index < 0) return;
					if (state.value[index] !== current) {
						state.value[index] = current;
						const value = state.value.map((val) => val);
						emit("update:value", value);
						trigger("change", {}, { value });
					}
				}
			});
		};
		provide("getPickerViewColumn", getPickerViewColumn);
		provide("pickerViewProps", props);
		provide("pickerViewState", state);
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.defineProperty(rootElement, "value", {
				get() {
					const columns = rootElement.querySelectorAll("uni-picker-view-column");
					return Array.from(columns).map((item) => item.current);
				},
				set(value) {
					const columns = rootElement.querySelectorAll("uni-picker-view-column");
					Array.from(columns).forEach((item, index) => {
						item.current = value[index] || 0;
					});
				}
			});
			rootElement.attachVmProps(props);
		});
		return () => {
			const defaultSlots = slots.default && slots.default();
			{
				const vnode = flatVNode(defaultSlots);
				ColumnsPreRef.value = vnode;
				nextTick(() => {
					columnsRef.value = vnode;
				});
			}
			return createVNode("uni-picker-view", { "ref": rootRef }, [createVNode(resize_sensor_default, {
				"ref": resizeSensorRef,
				"onResize": ({ height }) => state.height = height
			}, null, 8, ["onResize"]), createVNode("div", {
				"ref": wrapperRef,
				"class": "uni-picker-view-wrapper"
			}, [defaultSlots], 512)], 512);
		};
	}
});
//#endregion
//#region ../uni-components/src/helpers/scroller/Friction.ts
var Friction = class {
	constructor(drag) {
		this._drag = drag;
		this._dragLog = Math.log(drag);
		this._x = 0;
		this._v = 0;
		this._startTime = 0;
	}
	set(x, v) {
		this._x = x;
		this._v = v;
		this._startTime = (/* @__PURE__ */ new Date()).getTime();
	}
	setVelocityByEnd(e) {
		this._v = (e - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1);
	}
	x(e) {
		if (e === void 0) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
		const t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e);
		this._dt = e;
		return this._x + this._v * t / this._dragLog - this._v / this._dragLog;
	}
	dx(e) {
		if (e === void 0) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
		const t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e);
		this._dt = e;
		return this._v * t;
	}
	done() {
		return Math.abs(this.dx()) < 3;
	}
	reconfigure(e) {
		const t = this.x();
		const n = this.dx();
		this._drag = e;
		this._dragLog = Math.log(e);
		this.set(t, n);
	}
	configuration() {
		const e = this;
		return [{
			label: "Friction",
			read: function() {
				return e._drag;
			},
			write: function(t) {
				e.reconfigure(t);
			},
			min: .001,
			max: .1,
			step: .001
		}];
	}
};
//#endregion
//#region ../uni-components/src/helpers/scroller/Spring.ts
function o(e, t, n) {
	return e > t - n && e < t + n;
}
function a(e, t) {
	return o(e, 0, t);
}
var Spring = class {
	constructor(m, k, c) {
		this._m = m;
		this._k = k;
		this._c = c;
		this._solution = null;
		this._endPosition = 0;
		this._startTime = 0;
	}
	_solve(e, t) {
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
			const l = (t - c * e) / (u - c);
			const s = e - l;
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
					return s * t + l * n;
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
					return s * c * t + l * u * n;
				}
			};
		}
		const d = Math.sqrt(4 * i * r - n * n) / (2 * i);
		const a = -n / 2 * i;
		const s = e;
		const l = (t - a * e) / d;
		return {
			x: function(e) {
				return Math.pow(Math.E, a * e) * (s * Math.cos(d * e) + l * Math.sin(d * e));
			},
			dx: function(e) {
				const t = Math.pow(Math.E, a * e);
				const n = Math.cos(d * e);
				const i = Math.sin(d * e);
				return t * (l * d * n - s * d * i) + a * t * (l * i + s * n);
			}
		};
	}
	x(e) {
		if (e === void 0) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
		return this._solution ? this._endPosition + this._solution.x(e) : 0;
	}
	dx(e) {
		if (e === void 0) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
		return this._solution ? this._solution.dx(e) : 0;
	}
	setEnd(e, t, n) {
		if (!n) n = (/* @__PURE__ */ new Date()).getTime();
		if (e !== this._endPosition || !a(t, .4)) {
			t = t || 0;
			let i = this._endPosition;
			if (this._solution) {
				if (a(t, .4)) t = this._solution.dx((n - this._startTime) / 1e3);
				i = this._solution.x((n - this._startTime) / 1e3);
				if (a(t, .4)) t = 0;
				if (a(i, .4)) i = 0;
				i += this._endPosition;
			}
			if (!(this._solution && a(i - e, .4) && a(t, .4))) {
				this._endPosition = e;
				this._solution = this._solve(i - this._endPosition, t);
				this._startTime = n;
			}
		}
	}
	snap(e) {
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
	}
	done(e) {
		if (!e) e = (/* @__PURE__ */ new Date()).getTime();
		return o(this.x(), this._endPosition, .4) && a(this.dx(), .4);
	}
	reconfigure(e, t, n) {
		this._m = e;
		this._k = t;
		this._c = n;
		if (!this.done()) {
			this._solution = this._solve(this.x() - this._endPosition, this.dx());
			this._startTime = (/* @__PURE__ */ new Date()).getTime();
		}
	}
	springConstant() {
		return this._k;
	}
	damping() {
		return this._c;
	}
	configuration() {
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
	}
};
//#endregion
//#region ../uni-components/src/helpers/scroller/Scroll.ts
var Scroll = class {
	constructor(extent, friction, spring) {
		this._extent = extent;
		this._friction = friction || new Friction(.01);
		this._spring = spring || new Spring(1, 90, 20);
		this._startTime = 0;
		this._springing = false;
		this._springOffset = 0;
	}
	snap(e, t) {
		this._springOffset = 0;
		this._springing = true;
		this._spring.snap(e);
		this._spring.setEnd(t);
	}
	set(e, t) {
		this._friction.set(e, t);
		if (e > 0 && t >= 0) {
			this._springOffset = 0;
			this._springing = true;
			this._spring.snap(e);
			this._spring.setEnd(0);
		} else if (e < -this._extent && t <= 0) {
			this._springOffset = 0;
			this._springing = true;
			this._spring.snap(e);
			this._spring.setEnd(-this._extent);
		} else this._springing = false;
		this._startTime = (/* @__PURE__ */ new Date()).getTime();
	}
	x(e) {
		if (!this._startTime) return 0;
		if (!e) e = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
		if (this._springing) return this._spring.x() + this._springOffset;
		let t = this._friction.x(e);
		let n = this.dx(e);
		if (t > 0 && n >= 0 || t < -this._extent && n <= 0) {
			this._springing = true;
			this._spring.setEnd(0, n);
			if (t < -this._extent) this._springOffset = -this._extent;
			else this._springOffset = 0;
			t = this._spring.x() + this._springOffset;
		}
		return t;
	}
	dx(e) {
		let t;
		if (this._lastTime === e) t = this._lastDx;
		else t = this._springing ? this._spring.dx(e) : this._friction.dx(e);
		this._lastTime = e;
		this._lastDx = t;
		return t;
	}
	done() {
		return this._springing ? this._spring.done() : this._friction.done();
	}
	setVelocityByEnd(e) {
		this._friction.setVelocityByEnd(e);
	}
	configuration() {
		const e = this._friction.configuration();
		e.push.apply(e, this._spring.configuration());
		return e;
	}
};
//#endregion
//#region ../uni-components/src/helpers/scroller/Scroller.ts
function calculateSnapIndex(position, itemSize) {
	return Math.round(Math.abs(position) / itemSize);
}
function createAnimation$1(scroll, onScroll, onEnd) {
	const state = {
		id: 0,
		cancelled: false
	};
	function startAnimation(state, scroll, onScroll, onEnd) {
		if (!state || !state.cancelled) {
			onScroll(scroll);
			const isDone = scroll.done();
			if (!isDone) {
				if (!state.cancelled) state.id = requestAnimationFrame(startAnimation.bind(null, state, scroll, onScroll, onEnd));
			}
			if (isDone && onEnd) onEnd(scroll);
		}
	}
	function cancel(state) {
		if (state && state.id) cancelAnimationFrame(state.id);
		if (state) state.cancelled = true;
	}
	startAnimation(state, scroll, onScroll, onEnd);
	return {
		cancel: cancel.bind(null, state),
		model: scroll
	};
}
var Scroller = class {
	constructor(element, options) {
		options = options || {};
		this._element = element;
		this._options = options;
		this._enableSnap = options.enableSnap || false;
		this._itemSize = options.itemSize || 0;
		this._enableX = options.enableX || false;
		this._enableY = options.enableY || false;
		this._shouldDispatchScrollEvent = !!options.onScroll;
		if (this._enableX) {
			this._extent = (options.scrollWidth || this._element.offsetWidth) - this._element.parentElement.offsetWidth;
			this._scrollWidth = options.scrollWidth;
		} else {
			this._extent = (options.scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight;
			this._scrollHeight = options.scrollHeight;
		}
		this._position = 0;
		this._scroll = new Scroll(this._extent, options.friction, options.spring);
		this._onTransitionEnd = this.onTransitionEnd.bind(this);
		this.updatePosition();
	}
	onTouchStart() {
		this._startPosition = this._position;
		this._lastChangePos = this._startPosition;
		if (this._startPosition > 0) this._startPosition /= .5;
		else if (this._startPosition < -this._extent) this._startPosition = (this._startPosition + this._extent) / .5 - this._extent;
		if (this._animation) {
			this._animation.cancel();
			this._scrolling = false;
		}
		this.updatePosition();
	}
	onTouchMove(x, y) {
		let startPosition = this._startPosition;
		if (this._enableX) startPosition += x;
		else if (this._enableY) startPosition += y;
		if (startPosition > 0) startPosition *= .5;
		else if (startPosition < -this._extent) startPosition = .5 * (startPosition + this._extent) - this._extent;
		this._position = startPosition;
		this.updatePosition();
		this.dispatchScroll();
	}
	onTouchEnd(x, y, o) {
		if (this._enableSnap && this._position > -this._extent && this._position < 0) {
			if (this._enableY && (Math.abs(y) < this._itemSize && Math.abs(o.y) < 300 || Math.abs(o.y) < 150)) {
				this.snap();
				return;
			}
			if (this._enableX && (Math.abs(x) < this._itemSize && Math.abs(o.x) < 300 || Math.abs(o.x) < 150)) {
				this.snap();
				return;
			}
		}
		if (this._enableX) this._scroll.set(this._position, o.x);
		else if (this._enableY) this._scroll.set(this._position, o.y);
		let c;
		if (this._enableSnap) {
			const s = this._scroll._friction.x(100);
			const l = s % this._itemSize;
			c = Math.abs(l) > this._itemSize / 2 ? s - (this._itemSize - Math.abs(l)) : s - l;
			if (c <= 0 && c >= -this._extent) this._scroll.setVelocityByEnd(c);
		}
		this._lastTime = Date.now();
		this._lastDelay = 0;
		this._scrolling = true;
		this._lastChangePos = this._position;
		this._lastIdx = calculateSnapIndex(this._position, this._itemSize);
		this._animation = createAnimation$1(this._scroll, () => {
			const e = Date.now();
			const i = (e - this._scroll._startTime) / 1e3;
			const r = this._scroll.x(i);
			this._position = r;
			this.updatePosition();
			const o = this._scroll.dx(i);
			if (this._shouldDispatchScrollEvent && e - this._lastTime > this._lastDelay) {
				this.dispatchScroll();
				this._lastDelay = Math.abs(2e3 / o);
				this._lastTime = e;
			}
		}, () => {
			if (this._enableSnap) {
				if (c <= 0 && c >= -this._extent) {
					this._position = c;
					this.updatePosition();
				}
				if (isFunction(this._options.onSnap)) this._options.onSnap(calculateSnapIndex(this._position, this._itemSize));
			}
			if (this._shouldDispatchScrollEvent) this.dispatchScroll();
			this._scrolling = false;
		});
	}
	onTransitionEnd() {
		this._element.style.webkitTransition = "";
		this._element.style.transition = "";
		this._element.removeEventListener("transitionend", this._onTransitionEnd);
		if (this._snapping) this._snapping = false;
		this.dispatchScroll();
	}
	snap() {
		const itemSize = this._itemSize;
		const position = this._position % itemSize;
		const i = Math.abs(position) > this._itemSize / 2 ? this._position - (itemSize - Math.abs(position)) : this._position - position;
		if (this._position !== i) {
			this._snapping = true;
			this.scrollTo(-i);
			if (isFunction(this._options.onSnap)) this._options.onSnap(Math.round(Math.abs(this._position) / this._itemSize));
		}
	}
	scrollTo(position, time) {
		if (this._animation) {
			this._animation.cancel();
			this._scrolling = false;
		}
		if (typeof position === "number") this._position = -position;
		if (this._position < -this._extent) this._position = -this._extent;
		else if (this._position > 0) this._position = 0;
		const transition = "transform " + (time || .2) + "s ease-out";
		this._element.style.webkitTransition = "-webkit-" + transition;
		this._element.style.transition = transition;
		this.updatePosition();
		this._element.addEventListener("transitionend", this._onTransitionEnd);
	}
	dispatchScroll() {
		if (isFunction(this._options.onScroll) && Math.round(Number(this._lastPos)) !== Math.round(this._position)) {
			this._lastPos = this._position;
			const event = { target: {
				scrollLeft: this._enableX ? -this._position : 0,
				scrollTop: this._enableY ? -this._position : 0,
				scrollHeight: this._scrollHeight || this._element.offsetHeight,
				scrollWidth: this._scrollWidth || this._element.offsetWidth,
				offsetHeight: this._element.parentElement.offsetHeight,
				offsetWidth: this._element.parentElement.offsetWidth
			} };
			this._options.onScroll(event);
		}
	}
	update(height, scrollHeight, itemSize) {
		let extent = 0;
		const position = this._position;
		if (this._enableX) {
			extent = this._element.childNodes.length ? (scrollHeight || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0;
			this._scrollWidth = scrollHeight;
		} else {
			extent = this._element.childNodes.length ? (scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0;
			this._scrollHeight = scrollHeight;
		}
		if (typeof height === "number") this._position = -height;
		if (this._position < -extent) this._position = -extent;
		else if (this._position > 0) this._position = 0;
		this._itemSize = itemSize || this._itemSize;
		this.updatePosition();
		if (position !== this._position) {
			this.dispatchScroll();
			if (isFunction(this._options.onSnap)) this._options.onSnap(Math.round(Math.abs(this._position) / this._itemSize));
		}
		this._extent = extent;
		this._scroll._extent = extent;
	}
	updatePosition() {
		let transform = "";
		if (this._enableX) transform = "translateX(" + this._position + "px) translateZ(0)";
		else if (this._enableY) transform = "translateY(" + this._position + "px) translateZ(0)";
		this._element.style.webkitTransform = transform;
		this._element.style.transform = transform;
	}
	isScrolling() {
		return this._scrolling || this._snapping;
	}
};
//#endregion
//#region ../uni-components/src/helpers/scroller/index.ts
function useScroller(element, options) {
	const touchInfo = {
		trackingID: -1,
		maxDy: 0,
		maxDx: 0
	};
	const scroller = new Scroller(element, options);
	function findDelta(event) {
		const touchtrackEvent = event;
		const mouseEvent = event;
		return touchtrackEvent.detail.state === "move" || touchtrackEvent.detail.state === "end" ? {
			x: touchtrackEvent.detail.dx,
			y: touchtrackEvent.detail.dy
		} : {
			x: mouseEvent.screenX - touchInfo.x,
			y: mouseEvent.screenY - touchInfo.y
		};
	}
	function handleTouchStart(event) {
		const touchtrackEvent = event;
		const mouseEvent = event;
		if (touchtrackEvent.detail.state === "start") {
			touchInfo.trackingID = "touch";
			touchInfo.x = touchtrackEvent.detail.x;
			touchInfo.y = touchtrackEvent.detail.y;
		} else {
			touchInfo.trackingID = "mouse";
			touchInfo.x = mouseEvent.screenX;
			touchInfo.y = mouseEvent.screenY;
		}
		touchInfo.maxDx = 0;
		touchInfo.maxDy = 0;
		touchInfo.historyX = [0];
		touchInfo.historyY = [0];
		touchInfo.historyTime = [touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp];
		touchInfo.listener = scroller;
		if (scroller.onTouchStart) scroller.onTouchStart();
		if (typeof event.cancelable !== "boolean" || event.cancelable) event.preventDefault();
	}
	function handleTouchMove(event) {
		const touchtrackEvent = event;
		const mouseEvent = event;
		if (touchInfo.trackingID !== -1) {
			if (typeof event.cancelable !== "boolean" || event.cancelable) event.preventDefault();
			const delta = findDelta(event);
			if (delta) {
				for (touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)), touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)), touchInfo.historyX.push(delta.x), touchInfo.historyY.push(delta.y), touchInfo.historyTime.push(touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp); touchInfo.historyTime.length > 10;) {
					touchInfo.historyTime.shift();
					touchInfo.historyX.shift();
					touchInfo.historyY.shift();
				}
				if (touchInfo.listener && touchInfo.listener.onTouchMove) touchInfo.listener.onTouchMove(delta.x, delta.y);
			}
		}
	}
	function handleTouchEnd(event) {
		if (touchInfo.trackingID !== -1) {
			event.preventDefault();
			const delta = findDelta(event);
			if (delta) {
				const listener = touchInfo.listener;
				touchInfo.trackingID = -1;
				touchInfo.listener = null;
				const length = touchInfo.historyTime.length;
				const o = {
					x: 0,
					y: 0
				};
				if (length > 2) for (let i = touchInfo.historyTime.length - 1, time1 = touchInfo.historyTime[i], x = touchInfo.historyX[i], y = touchInfo.historyY[i]; i > 0;) {
					i--;
					const time = time1 - touchInfo.historyTime[i];
					if (time > 30 && time < 50) {
						o.x = (x - touchInfo.historyX[i]) / (time / 1e3);
						o.y = (y - touchInfo.historyY[i]) / (time / 1e3);
						break;
					}
				}
				touchInfo.historyTime = [];
				touchInfo.historyX = [];
				touchInfo.historyY = [];
				if (listener && listener.onTouchEnd) listener.onTouchEnd(delta.x, delta.y, o);
			}
		}
	}
	return {
		scroller,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd
	};
}
//#endregion
//#region ../uni-components/src/vue/picker-view-column/index.tsx
function useCustomClick(dom) {
	const MAX_MOVE = 20;
	let x = 0;
	let y = 0;
	dom.addEventListener("touchstart", (event) => {
		const info = event.changedTouches[0];
		x = info.clientX;
		y = info.clientY;
	});
	dom.addEventListener("touchend", (event) => {
		const info = event.changedTouches[0];
		if (Math.abs(info.clientX - x) < MAX_MOVE && Math.abs(info.clientY - y) < MAX_MOVE) {
			const options = {
				bubbles: true,
				cancelable: true,
				target: event.target,
				currentTarget: event.currentTarget
			};
			const customClick = new CustomEvent("click", options);
			[
				"screenX",
				"screenY",
				"clientX",
				"clientY",
				"pageX",
				"pageY"
			].forEach((key) => {
				customClick[key] = info[key];
			});
			event.target.dispatchEvent(customClick);
		}
	});
}
var UniPickerViewColumnElement = class extends UniElement {};
var picker_view_column_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "PickerViewColumn",
	rootElement: {
		name: "uni-picker-view-column",
		class: UniPickerViewColumnElement
	},
	setup(props, { slots, emit }) {
		const rootRef = ref(null);
		const contentRef = ref(null);
		const getPickerViewColumn = inject("getPickerViewColumn");
		const instance = getCurrentInstance();
		const currentRef = getPickerViewColumn ? getPickerViewColumn(instance) : ref(0);
		const pickerViewProps = inject("pickerViewProps");
		const pickerViewState = inject("pickerViewState");
		const indicatorHeight = ref(34);
		const resizeSensorRef = ref(null);
		const initIndicatorHeight = () => {
			indicatorHeight.value = resizeSensorRef.value.$el.getBoundingClientRect().height;
		};
		onMounted(initIndicatorHeight);
		const maskSize = computed(() => (pickerViewState.height - indicatorHeight.value) / 2);
		const { state: scopedAttrsState } = useScopedAttrs();
		let scroller;
		const state = reactive({
			current: currentRef.value,
			length: 0
		});
		let updatesScrollerRequest;
		function updatesScroller() {
			if (scroller && !updatesScrollerRequest) {
				updatesScrollerRequest = true;
				nextTick(() => {
					updatesScrollerRequest = false;
					let current = Math.min(state.current, state.length - 1);
					current = Math.max(current, 0);
					scroller.update(current * indicatorHeight.value, void 0, indicatorHeight.value);
				});
			}
		}
		watch(() => currentRef.value, (current) => {
			if (current !== state.current) {
				state.current = current;
				updatesScroller();
			}
		});
		watch(() => state.current, (current) => currentRef.value = current);
		watch([
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
		const initScroller = () => {
			const el = rootRef.value;
			const content = contentRef.value;
			const { scroller: scrollerOrigin, handleTouchStart, handleTouchMove, handleTouchEnd } = useScroller(content, {
				enableY: true,
				enableX: false,
				enableSnap: true,
				itemSize: indicatorHeight.value,
				friction: new Friction(1e-4),
				spring: new Spring(2, 90, 20),
				onSnap: (index) => {
					if (!isNaN(index) && index !== state.current) state.current = index;
				}
			});
			scroller = scrollerOrigin;
			useTouchtrack(el, (e) => {
				switch (e.detail.state) {
					case "start":
						handleTouchStart(e);
						disableScrollBounce({ disable: true });
						break;
					case "move":
						handleTouchMove(e);
						e.stopPropagation();
						break;
					case "end":
					case "cancel":
						handleTouchEnd(e);
						disableScrollBounce({ disable: false });
				}
			}, true);
			useCustomClick(el);
			updatesScroller();
		};
		onMounted(initScroller);
		let currentCache = state.current;
		watch(() => state.current, (newCurrent) => {
			currentCache = newCurrent;
		});
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.defineProperty(rootElement, "current", {
				get() {
					return currentCache;
				},
				set(current) {
					currentCache = current;
					scroller.scrollTo(current * indicatorHeight.value);
				}
			});
			rootElement.attachVmProps(props);
		});
		return () => {
			const defaultSlots = slots.default && slots.default();
			state.length = flatVNode(defaultSlots).length;
			const padding = `${maskSize.value}px 0`;
			return createVNode("uni-picker-view-column", { "ref": rootRef }, [createVNode("div", {
				"onWheel": handleWheel,
				"onClick": handleTap,
				"class": "uni-picker-view-group"
			}, [
				createVNode("div", mergeProps(scopedAttrsState.attrs, {
					"class": ["uni-picker-view-mask", pickerViewProps.maskClass],
					"style": `background-size: 100% ${maskSize.value}px;${pickerViewProps.maskStyle}`
				}), null, 16),
				createVNode("div", mergeProps(scopedAttrsState.attrs, {
					"class": ["uni-picker-view-indicator", pickerViewProps.indicatorClass],
					"style": pickerViewProps.indicatorStyle
				}), [createVNode(resize_sensor_default, {
					"ref": resizeSensorRef,
					"onResize": ({ height }) => indicatorHeight.value = height
				}, null, 8, ["onResize"])], 16),
				createVNode("div", {
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
//#endregion
//#region ../uni-components/src/components/progress.ts
var FONT_SIZE = 16;
var PROGRESS_VALUES = {
	activeColor: PRIMARY_COLOR,
	backgroundColor: "#EBEBEB",
	activeMode: "backwards"
};
var progressProps = {
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
//#endregion
//#region ../uni-components/src/vue/progress/index.tsx
var UniProgressElement = class extends UniElement {};
var progress_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Progress",
	props: progressProps,
	rootElement: {
		name: "uni-progress",
		class: UniProgressElement
	},
	setup(props) {
		const rootRef = ref(null);
		const state = useProgressState(props);
		_activeAnimation(state, props);
		watch(() => state.realPercent, (newValue, oldValue) => {
			state.strokeTimer && clearInterval(state.strokeTimer);
			state.lastPercent = oldValue || 0;
			_activeAnimation(state, props);
		});
		let percentCache = state.currentPercent;
		watch(() => state.currentPercent, (newPercent) => {
			percentCache = newPercent;
		});
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.defineProperty(rootElement, "percent", {
				get() {
					return percentCache;
				},
				set(value) {
					percentCache = value;
					rootElement.querySelector(".uni-progress-inner-bar").style.width = `${value}%`;
					if (props.showInfo) rootElement.querySelector(".uni-progress-info").innerText = `${value}%`;
				}
			});
			rootElement.attachVmProps(props);
		});
		return () => {
			const { showInfo } = props;
			const { outerBarStyle, innerBarStyle, currentPercent } = state;
			return createVNode("uni-progress", {
				"class": "uni-progress",
				"ref": rootRef
			}, [createVNode("div", {
				"style": outerBarStyle,
				"class": "uni-progress-bar"
			}, [createVNode("div", {
				"style": innerBarStyle,
				"class": "uni-progress-inner-bar"
			}, null, 4)], 4), showInfo ? createVNode("p", { "class": "uni-progress-info" }, [currentPercent + "%"]) : ""], 512);
		};
	}
});
function useProgressState(props) {
	const currentPercent = ref(0);
	return reactive({
		outerBarStyle: computed(() => `background-color: ${props.backgroundColor}; height: ${rpx2px(props.strokeWidth)}px;`),
		innerBarStyle: computed(() => {
			const backgroundColor = props.color !== PROGRESS_VALUES.activeColor && props.activeColor === PROGRESS_VALUES.activeColor ? props.color : props.activeColor;
			return `width: ${currentPercent.value}%;background-color: ${backgroundColor}`;
		}),
		realPercent: computed(() => {
			if (typeof props.percent === "string" && !/^-?\d*\.?\d*$/.test(props.percent)) return 0;
			let realValue = parseFloat(props.percent);
			if (Number.isNaN(realValue) || realValue < 0) realValue = 0;
			else if (realValue > 100) realValue = 100;
			return realValue;
		}),
		currentPercent,
		strokeTimer: 0,
		lastPercent: 0
	});
}
function _activeAnimation(state, props) {
	if (props.active) {
		state.currentPercent = props.activeMode === PROGRESS_VALUES.activeMode ? 0 : state.lastPercent;
		state.strokeTimer = setInterval(() => {
			if (state.currentPercent + 1 > state.realPercent) {
				state.currentPercent = state.realPercent;
				state.strokeTimer && clearInterval(state.strokeTimer);
			} else state.currentPercent += 1;
		}, parseFloat(props.duration));
	} else state.currentPercent = state.realPercent;
}
//#endregion
//#region ../uni-components/src/vue/radio-group/index.tsx
var uniRadioGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniCheckGroup" : "ucg");
var props$22 = { name: {
	type: String,
	default: ""
} };
var UniRadioGroupElement = class extends UniElement {};
var radio_group_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "RadioGroup",
	props: props$22,
	rootElement: {
		name: "uni-radio-group",
		class: UniRadioGroupElement
	},
	setup(props, { emit, slots }) {
		const rootRef = ref(null);
		useProvideRadioGroup(props, useCustomEvent(rootRef, emit));
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-radio-group", { "ref": rootRef }, [slots.default && slots.default()], 512);
		};
	}
});
function useProvideRadioGroup(props, trigger) {
	const fields = [];
	onMounted(() => {
		_resetRadioGroupValue(fields.length - 1);
	});
	const getFieldsValue = () => {
		var _fields$find;
		return ((_fields$find = fields.find((field) => field.value.radioChecked)) === null || _fields$find === void 0 ? void 0 : _fields$find.value.value) + "";
	};
	provide(uniRadioGroupKey, {
		addField(field) {
			fields.push(field);
		},
		removeField(field) {
			fields.splice(fields.indexOf(field), 1);
		},
		radioChange($event, field) {
			_resetRadioGroupValue(fields.indexOf(field), true);
			trigger("change", $event, { value: getFieldsValue() });
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
			else fields.forEach((v, i) => {
				if (index >= i) return;
				if (fields[i].value.radioChecked) setFieldChecked(fields[index], false);
			});
		});
	}
	return fields;
}
//#endregion
//#region ../uni-components/src/vue/radio/index-x.tsx
var props$21 = {
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
	},
	foreColor: {
		type: String,
		default: ""
	}
};
var UniRadioElement = class extends UniElement {};
var index_x_default$2 = /*#__PURE__*/ defineBuiltInComponent({
	name: "Radio",
	props: props$21,
	rootElement: {
		name: "uni-radio",
		class: UniRadioElement
	},
	setup(props, { slots }) {
		const rootRef = ref(null);
		const radioChecked = ref(props.checked);
		const radioValue = ref(props.value);
		const initialCheckedValue = props.checked;
		function getRadioStyle(checked) {
			if (props.disabled) return {
				backgroundColor: "#E1E1E1",
				borderColor: "#D1D1D1"
			};
			const style = {};
			if (radioChecked.value) {
				style.backgroundColor = props.activeBackgroundColor || props.color;
				style.borderColor = props.activeBorderColor || style.backgroundColor;
			} else {
				if (props.borderColor) style.borderColor = props.borderColor;
				if (props.backgroundColor) style.backgroundColor = props.backgroundColor;
			}
			return style;
		}
		const radioStyle = computed(() => {
			return getRadioStyle(radioChecked.value);
		});
		watch([() => props.checked, () => props.value], ([newChecked, newModelValue]) => {
			radioChecked.value = newChecked;
			radioValue.value = newModelValue;
		});
		const reset = () => {
			radioChecked.value = initialCheckedValue;
		};
		const { uniCheckGroup, uniLabel, field } = useRadioInject(radioChecked, radioValue, reset);
		const _onClick = ($event) => {
			if (props.disabled || radioChecked.value) return;
			radioChecked.value = true;
			uniCheckGroup && uniCheckGroup.radioChange($event, field);
			$event.stopPropagation();
		};
		if (!!uniLabel) {
			uniLabel.addHandler(_onClick);
			onBeforeUnmount(() => {
				uniLabel.removeHandler(_onClick);
			});
		}
		useListeners(props, { "label-click": _onClick });
		const checkedCache = ref(radioChecked.value);
		watch(() => radioChecked.value, (value) => {
			checkedCache.value = value;
		});
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.defineProperty(rootElement, "checked", {
				get() {
					return checkedCache.value;
				},
				set(value) {
					checkedCache.value = value;
					const style = getRadioStyle(value);
					const checkboxInputElement = rootElement.querySelector(".uni-checkbox-input");
					for (const key in style) {
						const value = style[key];
						value && checkboxInputElement.style.setProperty(key, value);
					}
				}
			});
			rootElement.attachVmProps(props);
		});
		return () => {
			const booleanAttrs = useBooleanAttr(props, "disabled");
			let realCheckValue;
			realCheckValue = checkedCache.value;
			return createVNode("uni-radio", mergeProps(booleanAttrs, {
				"onClick": _onClick,
				"ref": rootRef,
				"id": props.id,
				"class": "uni-radio-wrapper",
				"style": { "--HOVER-BD-COLOR": !radioChecked.value ? props.activeBorderColor : radioStyle.value.borderColor }
			}), [createVNode("div", {
				"class": ["uni-radio-input", { "uni-radio-input-disabled": props.disabled }],
				"style": radioStyle.value
			}, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props.disabled ? "#ADADAD" : props.foreColor || props.iconColor, 18) : ""], 6), slots.default && slots.default()], 16, ["onClick", "id"]);
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
//#region ../uni-components/src/vue/rich-text/nodes-parser.ts
var TAGS = {
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
		if (hasOwn(CHARS, stage) && CHARS[stage]) return CHARS[stage];
		if (/^#[0-9]{1,4}$/.test(stage)) return String.fromCharCode(stage.slice(1));
		if (/^#x[0-9a-f]{1,4}$/i.test(stage)) return String.fromCharCode(Number("0" + stage.slice(1)));
		return match;
	});
}
function processClickEvent(node, triggerItemClick) {
	if (node.name && ["a", "img"].includes(node.name) && triggerItemClick) return { onClickCapture: (e) => {
		if (node.name === "a") triggerItemClick(e, { href: (node.attrs || {}).href });
		else triggerItemClick(e, { src: (node.attrs || {}).src });
		e.stopPropagation();
		e.preventDefault();
		e.returnValue = false;
	} };
}
function normalizeValue(tagName, name, value) {
	if (tagName === "img" && name === "src" && isString(value)) return getRealPath(value);
	return value;
}
function normalizeAttrs(tagName, attrs) {
	if (!isPlainObject(attrs)) return;
	TAGS[tagName];
	const normalizedAttrs = {};
	Object.keys(attrs).forEach((name) => {
		normalizedAttrs[name] = normalizeValue(tagName, name, attrs[name]);
	});
	return normalizedAttrs;
}
var nodeList2VNode = (scopeId, triggerItemClick, nodeList) => {
	if (!nodeList || Array.isArray(nodeList) && !nodeList.length) return [];
	return nodeList.map((node) => {
		if (!isPlainObject(node)) return;
		if (!hasOwn(node, "type") || node.type === "node") {
			if (!isString(node.name) || !node.name) return;
			const tagName = node.name.toLowerCase();
			const nodeProps = extend({ [scopeId]: "" }, processClickEvent(node, triggerItemClick), normalizeAttrs(tagName, node.attrs));
			return h(node.name, nodeProps, nodeList2VNode(scopeId, triggerItemClick, node.children));
		}
		if (node.type === "text" && isString(node.text) && node.text !== "") return createTextVNode(decodeEntities(node.text || ""));
	});
};
//#endregion
//#region ../uni-components/src/components/rich-text/html-parser.js
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
//#region ../uni-components/src/components/rich-text/index.ts
var props$20 = { nodes: {
	type: [Array, String],
	default: function() {
		return [];
	}
} };
//#endregion
//#region ../uni-components/src/vue/rich-text/index.tsx
var UniRichTextElement = class extends UniElement {};
var rich_text_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "RichText",
	compatConfig: { MODE: 3 },
	props: props$20,
	emits: ["itemclick"],
	rootElement: {
		name: "uni-rich-text",
		class: UniRichTextElement
	},
	setup(props, { emit }) {
		const vm = getCurrentInstance();
		const scopeId = vm && vm.vnode.scopeId || "";
		const rootRef = ref(null);
		const _vnode = shallowRef([]);
		const trigger = useCustomEvent(rootRef, emit);
		function triggerItemClick(e, detail = {}) {
			trigger("itemclick", e, detail);
		}
		function renderVNode() {
			let nodeList = props.nodes;
			if (isString(nodeList)) nodeList = parseHtml(props.nodes);
			_vnode.value = nodeList2VNode(scopeId, triggerItemClick, nodeList);
		}
		watch(() => props.nodes, renderVNode, {
			immediate: true,
			deep: true
		});
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => h("uni-rich-text", { ref: rootRef }, h("div", {}, _vnode.value));
	}
});
//#endregion
//#region ../uni-components/src/vue/refresher/index.tsx
var refresher_default = /*#__PURE__*/ defineBuiltInComponent({
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
			default: "transparent"
		}
	},
	setup(props, { slots }) {
		const rootRef = ref(null);
		const rootStyle = computed(() => {
			const style = { backgroundColor: props.refresherBackground };
			switch (props.refreshState) {
				case "pulling":
					style.height = props.refresherHeight + "px";
					break;
				case "refreshing":
					style.height = props.refresherThreshold + "px";
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
		const refreshRotate = computed(() => {
			const route = props.refresherHeight / props.refresherThreshold;
			return (route > 1 ? 1 : route) * 360;
		});
		return () => {
			const { refreshState, refresherDefaultStyle, refresherThreshold } = props;
			return createVNode("div", {
				"ref": rootRef,
				"style": rootStyle.value,
				"class": "uni-scroll-view-refresher"
			}, [refresherDefaultStyle !== "none" ? createVNode("div", { "class": "uni-scroll-view-refresh" }, [createVNode("div", { "class": "uni-scroll-view-refresh-inner" }, [refreshState == "pulling" ? createVNode("svg", {
				"key": "refresh__icon",
				"style": { transform: "rotate(" + refreshRotate.value + "deg)" },
				"fill": "#2BD009",
				"class": "uni-scroll-view-refresh__icon",
				"width": "24",
				"height": "24",
				"viewBox": "0 0 24 24"
			}, [createVNode("path", { "d": "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }, null), createVNode("path", {
				"d": "M0 0h24v24H0z",
				"fill": "none"
			}, null)], 4) : null, refreshState == "refreshing" ? createVNode("svg", {
				"key": "refresh__spinner",
				"class": "uni-scroll-view-refresh__spinner",
				"width": "24",
				"height": "24",
				"viewBox": "25 25 50 50"
			}, [createVNode("circle", {
				"cx": "50",
				"cy": "50",
				"r": "20",
				"fill": "none",
				"style": "color: #2bd009",
				"stroke-width": "3"
			}, null)]) : null])]) : null, refresherDefaultStyle === "none" ? createVNode("div", {
				"class": "uni-scroll-view-refresher-container",
				"style": { height: `${refresherThreshold}px` }
			}, [slots.default && slots.default()], 4) : null], 4);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/scroll-view/index.tsx
var passiveOptions = /*#__PURE__*/ passive(true);
var props$19 = {
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
		default: "transparent"
	},
	refresherTriggered: {
		type: [Boolean, String],
		default: false
	}
};
var UniScrollViewElement = class extends UniElement {};
var scroll_view_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "ScrollView",
	compatConfig: { MODE: 3 },
	props: props$19,
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
	rootElement: {
		name: "uni-scroll-view",
		class: UniScrollViewElement
	},
	setup(props, { emit, slots, expose }) {
		const rootRef = ref(null);
		const main = ref(null);
		const wrap = ref(null);
		const content = ref(null);
		const trigger = useCustomEvent(rootRef, emit);
		const { state, scrollTopNumber, scrollLeftNumber } = useScrollViewState(props);
		const { realScrollX, realScrollY, _scrollLeftChanged, _scrollTopChanged } = useScrollViewLoader(props, state, scrollTopNumber, scrollLeftNumber, trigger, rootRef, main, content, emit);
		const mainStyle = computed(() => {
			let style = "";
			realScrollX.value ? style += "overflow-x:auto;" : style += "overflow-x:hidden;";
			realScrollY.value ? style += "overflow-y:auto;" : style += "overflow-y:hidden;";
			return style;
		});
		const scrollBarClassName = computed(() => {
			let className = "uni-scroll-view";
			if (props.showScrollbar === false) className += " uni-scroll-view-scrollbar-hidden";
			return className;
		});
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.defineProperties(rootElement, {
				scrollHeight: { get() {
					return main.value.scrollHeight;
				} },
				scrollWidth: { get() {
					return main.value.scrollWidth;
				} },
				scrollLeft: {
					get() {
						return main.value.scrollLeft;
					},
					set(val) {
						_scrollLeftChanged(val);
					}
				},
				scrollTop: {
					get() {
						return main.value.scrollTop;
					},
					set(val) {
						_scrollTopChanged(val);
					}
				},
				scrollTo: { get() {
					return main.value.scrollTo.bind(main.value);
				} },
				scrollBy: { get() {
					return main.value.scrollBy.bind(main.value);
				} }
			});
			rootElement.attachVmProps(props);
		});
		expose({ $getMain() {
			return main.value;
		} });
		return () => {
			const { refresherEnabled, refresherBackground, refresherDefaultStyle, refresherThreshold } = props;
			const { refresherHeight, refreshState } = state;
			return createVNode("uni-scroll-view", { "ref": rootRef }, [createVNode("div", {
				"ref": wrap,
				"class": "uni-scroll-view"
			}, [createVNode("div", {
				"ref": main,
				"style": mainStyle.value,
				"class": scrollBarClassName.value
			}, [refresherEnabled ? createVNode(refresher_default, {
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
			]) : null, createVNode("div", {
				"ref": content,
				"class": "uni-scroll-view-content"
			}, [slots.default && slots.default()], 512)], 6)], 512)], 512);
		};
	}
});
function useScrollViewState(props) {
	const scrollTopNumber = computed(() => {
		return Number(props.scrollTop) || 0;
	});
	const scrollLeftNumber = computed(() => {
		return Number(props.scrollLeft) || 0;
	});
	return {
		state: reactive({
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
function useScrollViewLoader(props, state, scrollTopNumber, scrollLeftNumber, trigger, rootRef, main, content, emit) {
	let _innerSetScrollTop = false;
	let _innerSetScrollLeft = false;
	let beforeRefreshing = false;
	let toUpperNumber = 0;
	let triggerAbort = false;
	let __transitionEnd = () => {};
	const realScrollX = computed(() => {
		if (props.direction === "horizontal" || props.direction === "all") return true;
		return false;
	});
	const realScrollY = computed(() => {
		if (props.direction === "vertical" || props.direction === "all") return true;
		return false;
	});
	const upperThresholdNumber = computed(() => {
		let val = Number(props.upperThreshold);
		return isNaN(val) ? 50 : val;
	});
	const lowerThresholdNumber = computed(() => {
		let val = Number(props.lowerThreshold);
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
	function _handleScroll($event) {
		const target = $event.target;
		trigger("scroll", $event, {
			scrollLeft: target.scrollLeft,
			scrollTop: target.scrollTop,
			scrollHeight: target.scrollHeight,
			scrollWidth: target.scrollWidth,
			deltaX: state.lastScrollLeft - target.scrollLeft,
			deltaY: state.lastScrollTop - target.scrollTop
		});
		if (realScrollY.value) {
			if (target.scrollTop <= upperThresholdNumber.value && state.lastScrollTop - target.scrollTop > 0 && $event.timeStamp - state.lastScrollToUpperTime > 200) {
				trigger("scrolltoupper", $event, { direction: "top" });
				state.lastScrollToUpperTime = $event.timeStamp;
			}
			if (target.scrollTop + target.offsetHeight + lowerThresholdNumber.value >= target.scrollHeight && state.lastScrollTop - target.scrollTop < 0 && $event.timeStamp - state.lastScrollToLowerTime > 200) {
				trigger("scrolltolower", $event, { direction: "bottom" });
				state.lastScrollToLowerTime = $event.timeStamp;
			}
		}
		if (realScrollX.value) {
			if (target.scrollLeft <= upperThresholdNumber.value && state.lastScrollLeft - target.scrollLeft > 0 && $event.timeStamp - state.lastScrollToUpperTime > 200) {
				trigger("scrolltoupper", $event, { direction: "left" });
				state.lastScrollToUpperTime = $event.timeStamp;
			}
			if (target.scrollLeft + target.offsetWidth + lowerThresholdNumber.value >= target.scrollWidth && state.lastScrollLeft - target.scrollLeft < 0 && $event.timeStamp - state.lastScrollToLowerTime > 200) {
				trigger("scrolltolower", $event, { direction: "right" });
				state.lastScrollToLowerTime = $event.timeStamp;
			}
		}
		state.lastScrollTop = target.scrollTop;
		state.lastScrollLeft = target.scrollLeft;
	}
	function _scrollTopChanged(val) {
		if (realScrollY.value) if (_innerSetScrollTop) _innerSetScrollTop = false;
		else if (props.scrollWithAnimation) scrollTo(val, "y");
		else main.value.scrollTop = val;
	}
	function _scrollLeftChanged(val) {
		if (realScrollX.value) if (_innerSetScrollLeft) _innerSetScrollLeft = false;
		else if (props.scrollWithAnimation) scrollTo(val, "x");
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
					if (props.scrollWithAnimation) scrollTo(x, "x");
					else main.value.scrollLeft = x;
				}
				if (realScrollY.value) {
					let top = elRect.top - mainRect.top;
					let y = main.value.scrollTop + top;
					if (props.scrollWithAnimation) scrollTo(y, "y");
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
		if (!props.refresherEnabled) return;
		switch (_state) {
			case "refreshing":
				state.refresherHeight = props.refresherThreshold;
				if (!beforeRefreshing) {
					beforeRefreshing = true;
					trigger("refresherpulling", {}, {
						deltaY: state.refresherHeight,
						dy: state.refresherHeight
					});
					trigger("refresherrefresh", {}, { dy: touchEnd.y - touchStart.y });
					emit("update:refresherTriggered", true);
				}
				break;
			case "restore":
			case "refresherabort":
				beforeRefreshing = false;
				state.refresherHeight = toUpperNumber = 0;
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
		y: props.refresherThreshold
	};
	onMounted(() => {
		nextTick(() => {
			_scrollTopChanged(scrollTopNumber.value);
			_scrollLeftChanged(scrollLeftNumber.value);
		});
		_scrollIntoViewChanged(props.scrollIntoView);
		let __handleScroll = function(event) {
			event.preventDefault();
			event.stopPropagation();
			_handleScroll(event);
		};
		let needStop = null;
		let __handleTouchMove = function(event) {
			if (touchStart === null) return;
			let x = event.touches[0].pageX;
			let y = event.touches[0].pageY;
			let _main = main.value;
			if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) if (realScrollX.value) {
				if (_main.scrollLeft === 0 && x > touchStart.x) {
					needStop = false;
					return;
				} else if (_main.scrollWidth === _main.offsetWidth + _main.scrollLeft && x < touchStart.x) {
					needStop = false;
					return;
				}
				needStop = true;
			} else needStop = false;
			else if (realScrollY.value) if (_main.scrollTop === 0 && y > touchStart.y) {
				needStop = false;
				if (props.refresherEnabled && event.cancelable !== false) event.preventDefault();
			} else if (_main.scrollHeight === _main.offsetHeight + _main.scrollTop && y < touchStart.y) {
				needStop = false;
				return;
			} else needStop = true;
			else needStop = false;
			if (needStop) event.stopPropagation();
			if (_main.scrollTop === 0 && event.touches.length === 1) _setRefreshState("pulling");
			if (props.refresherEnabled && state.refreshState === "pulling") {
				const dy = y - touchStart.y;
				if (toUpperNumber === 0) toUpperNumber = y;
				if (!beforeRefreshing) {
					state.refresherHeight = y - toUpperNumber;
					if (state.refresherHeight > 0) {
						triggerAbort = true;
						trigger("refresherpulling", event, {
							deltaY: dy,
							dy
						});
					}
				} else {
					state.refresherHeight = dy + props.refresherThreshold;
					triggerAbort = false;
				}
			}
		};
		let __handleTouchStart = function(event) {
			if (event.touches.length === 1) {
				disableScrollBounce({ disable: true });
				touchStart = {
					x: event.touches[0].pageX,
					y: event.touches[0].pageY
				};
			}
		};
		let __handleTouchEnd = function(event) {
			touchEnd = {
				x: event.changedTouches[0].pageX,
				y: event.changedTouches[0].pageY
			};
			disableScrollBounce({ disable: false });
			if (state.refresherHeight >= props.refresherThreshold) _setRefreshState("refreshing");
			else _setRefreshState("refresherabort");
			touchStart = {
				x: 0,
				y: 0
			};
			touchEnd = {
				x: 0,
				y: props.refresherThreshold
			};
		};
		main.value.addEventListener("touchstart", __handleTouchStart, passiveOptions);
		main.value.addEventListener("touchmove", __handleTouchMove, passive(false));
		main.value.addEventListener("scroll", __handleScroll, passive(false));
		main.value.addEventListener("touchend", __handleTouchEnd, passiveOptions);
		onBeforeUnmount(() => {
			main.value.removeEventListener("touchstart", __handleTouchStart);
			main.value.removeEventListener("touchmove", __handleTouchMove);
			main.value.removeEventListener("scroll", __handleScroll);
			main.value.removeEventListener("touchend", __handleTouchEnd);
		});
	});
	onActivated(() => {
		realScrollY.value && (main.value.scrollTop = state.lastScrollTop);
		realScrollX.value && (main.value.scrollLeft = state.lastScrollLeft);
	});
	watch(scrollTopNumber, (val) => {
		_scrollTopChanged(val);
	});
	watch(scrollLeftNumber, (val) => {
		_scrollLeftChanged(val);
	});
	watch(() => props.scrollIntoView, (val) => {
		_scrollIntoViewChanged(val);
	});
	watch(() => props.refresherTriggered, (val) => {
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
//#endregion
//#region ../uni-components/src/vue/slider/index-x.tsx
var SLIDER_BLOCK_SIZE_MIN_VALUE = 12;
var SLIDER_BLOCK_SIZE_MAX_VALUE = 28;
var props$18 = {
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
	activeBackgroundColor: {
		type: String,
		default: ""
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
	foreColor: {
		type: String,
		default: ""
	},
	valueColor: {
		type: String,
		default: "#888888"
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
var getValuePercentage = (value, min, max) => {
	return 100 * (value - min) / (max - min) + "%";
};
var UniSliderElement = class extends UniElement {
	constructor(..._args) {
		super(..._args);
		this._initialValue = 0;
	}
	init() {
		this.htmlSlider = this.querySelector(".uni-slider-browser-input-range");
		this.trackValue = this.querySelector(".uni-slider-track-value");
		this.thumbValue = this.querySelector(".uni-slider-thumb-value");
		this.inputValue = this.querySelector(".uni-slider-value");
		this.updateValue(this.value);
	}
	get value() {
		return Number(this.htmlSlider.value);
	}
	set value(value) {
		this.htmlSlider.value = value.toString();
		this.updateValue(value);
	}
	reset() {
		this.value = this._initialValue;
	}
	updateValue(value) {
		const min = Number(this.htmlSlider.getAttribute("min"));
		const max = Number(this.htmlSlider.getAttribute("max"));
		if (value < min) value = min;
		else if (value > max) value = max;
		const percentage = getValuePercentage(value, min, max);
		this.trackValue.style.width = percentage;
		this.thumbValue.style.left = percentage;
		this.inputValue.innerText = value.toString();
	}
};
var index_x_default$3 = /*#__PURE__*/ defineBuiltInComponent({
	name: "Slider",
	props: props$18,
	emits: ["changing", "change"],
	rootElement: {
		name: "uni-slider",
		class: UniSliderElement
	},
	setup(props, { emit }) {
		const sliderRef = ref(null);
		const sliderValueRef = ref(null);
		let uniSliderElement;
		watch(() => props.value, (val) => {
			uniSliderElement.value = Number(val);
		});
		const trigger = useCustomEvent(sliderRef, emit);
		const state = useSliderState(props);
		const { _onInput, _onChange } = useSliderLoader(props, sliderRef, trigger);
		onMounted(() => {
			uniSliderElement = sliderRef.value;
			uniSliderElement._initialValue = props.value;
			uniSliderElement.init();
			uniSliderElement.attachVmProps(props);
		});
		return () => {
			const { setTrackBgColor, setActiveColor, setThumbStyle, thumbTrackStyle, setValueStyle } = state;
			return createVNode("uni-slider", { "ref": sliderRef }, [createVNode("div", { "class": "uni-slider-wrapper" }, [createVNode("div", { "class": "uni-slider-input" }, [
				createVNode("div", {
					"style": setTrackBgColor.value,
					"class": "uni-slider-track"
				}, [createVNode("div", {
					"style": setActiveColor.value,
					"class": "uni-slider-track-value"
				}, null, 4)], 4),
				createVNode("div", {
					"style": thumbTrackStyle.value,
					"class": "uni-slider-thumb-track"
				}, [createVNode("div", {
					"style": setThumbStyle.value,
					"class": "uni-slider-thumb-value"
				}, null, 4)], 4),
				createVNode("input", {
					"class": "uni-slider-browser-input-range",
					"type": "range",
					"min": props.min,
					"max": props.max,
					"step": props.step,
					"value": props.value,
					"onInput": withWebEvent(_onInput),
					"onChange": withWebEvent(_onChange)
				}, null, 40, [
					"min",
					"max",
					"step",
					"value",
					"onInput",
					"onChange"
				])
			]), withDirectives(createVNode("span", {
				"ref": sliderValueRef,
				"style": setValueStyle.value,
				"class": "uni-slider-value"
			}, null, 4), [[vShow, props.showValue]])])], 512);
		};
	}
});
function useSliderState(props) {
	const _getBgColor = () => {
		return props.backgroundColor !== "#e9e9e9" ? props.backgroundColor : props.color !== "#007aff" ? props.color : "#007aff";
	};
	const _getActiveColor = () => {
		const activeColor = props.activeBackgroundColor || props.activeColor;
		return activeColor !== "#007aff" ? activeColor : props.selectedColor !== "#e9e9e9" ? props.selectedColor : "#e9e9e9";
	};
	const _getBlockSizeString = () => {
		return Math.min(Math.max(Number(props.blockSize), SLIDER_BLOCK_SIZE_MIN_VALUE), SLIDER_BLOCK_SIZE_MAX_VALUE) + "px";
	};
	return {
		setTrackBgColor: computed(() => ({ backgroundColor: _getBgColor() })),
		setActiveColor: computed(() => ({ backgroundColor: _getActiveColor() })),
		thumbTrackStyle: computed(() => ({ marginRight: _getBlockSizeString() })),
		setThumbStyle: computed(() => ({
			width: _getBlockSizeString(),
			height: _getBlockSizeString(),
			backgroundColor: props.foreColor || props.blockColor
		})),
		setValueStyle: computed(() => ({ color: props.valueColor }))
	};
}
function useSliderLoader(props, sliderRef, trigger) {
	const _onInput = (event) => {
		if (props.disabled) return;
		const valueNumber = Number(event.target.value);
		sliderRef.value.updateValue(valueNumber);
		trigger("changing", event, { value: valueNumber });
	};
	const _onChange = (event) => {
		if (props.disabled) return;
		const valueNumber = Number(event.target.value);
		sliderRef.value.updateValue(valueNumber);
		trigger("change", event, { value: valueNumber });
	};
	const uniForm = inject(uniFormKey, false);
	if (!!uniForm) {
		const field = {
			reset: () => {
				sliderRef.value.reset();
			},
			submit: () => {
				const data = ["", null];
				const value = sliderRef.value.value;
				if (props.name !== "") {
					data[0] = props.name;
					data[1] = value;
				}
				return data;
			}
		};
		uniForm.addField(field);
		onBeforeUnmount(() => {
			uniForm.removeField(field);
		});
	}
	return {
		_onInput,
		_onChange
	};
}
//#endregion
//#region ../uni-components/src/vue/swiper/index.tsx
var props$17 = {
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
function useState$2(props) {
	return reactive({
		interval: computed(() => {
			const interval = Number(props.interval);
			return isNaN(interval) ? 5e3 : interval;
		}),
		duration: computed(() => {
			const duration = Number(props.duration);
			return isNaN(duration) ? 500 : duration;
		}),
		displayMultipleItems: computed(() => {
			const displayMultipleItems = Math.round(props.displayMultipleItems);
			return isNaN(displayMultipleItems) ? 1 : displayMultipleItems;
		}),
		current: Math.round(props.current) || 0,
		currentItemId: props.currentItemId,
		userTracking: false
	});
}
function useLayout(props, state, swiperContexts, slideFrameRef, emit, trigger) {
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
	let animationFrame;
	const swiperEnabled = computed(() => swiperContexts.value.length > state.displayMultipleItems);
	const circularEnabled = computed(() => props.circular && swiperEnabled.value);
	function checkCircularLayout(index) {
		if (!invalid) for (let items = swiperContexts.value, n = items.length, i = index + state.displayMultipleItems, r = 0; r < n; r++) {
			const item = items[r];
			const s = Math.floor(index / n) * n + r;
			const l = s + n;
			const c = s - n;
			const u = Math.max(index - (s + 1), s - i, 0);
			const d = Math.max(index - (l + 1), l - i, 0);
			const h = Math.max(index - (c + 1), c - i, 0);
			const p = Math.min(u, d, h);
			const position = [
				s,
				l,
				c
			][[
				u,
				d,
				h
			].indexOf(p)];
			item.updatePosition(position, props.vertical);
		}
	}
	function updateViewport(index) {
		if (!(Math.floor(2 * viewportPosition) === Math.floor(2 * index) && Math.ceil(2 * viewportPosition) === Math.ceil(2 * index))) {
			if (circularEnabled.value) checkCircularLayout(index);
		}
		const x = props.vertical ? "0" : 100 * -index * viewportMoveRatio + "%";
		const y = props.vertical ? 100 * -index * viewportMoveRatio + "%" : "0";
		const transform = "translate(" + x + ", " + y + ") translateZ(0)";
		const slideFrame = slideFrameRef.value;
		if (slideFrame) {
			slideFrame.style.webkitTransform = transform;
			slideFrame.style.transform = transform;
		}
		viewportPosition = index;
		if (!transitionStart) {
			if (index % 1 === 0) return;
			transitionStart = index;
		}
		index -= Math.floor(transitionStart);
		const items = swiperContexts.value;
		if (index <= -(items.length - 1)) index += items.length;
		else if (index >= items.length) index -= items.length;
		index = transitionStart % 1 > .5 || transitionStart < 0 ? index - 1 : index;
		trigger("transition", {}, {
			dx: props.vertical ? 0 : index * slideFrame.offsetWidth,
			dy: props.vertical ? index * slideFrame.offsetHeight : 0
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
		const index = (Math.round(current) % length + length) % length;
		if (circularEnabled.value) {
			if (length <= state.displayMultipleItems) return 0;
		} else if (index > length - state.displayMultipleItems) return length - state.displayMultipleItems;
		return index;
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
		animationFrame = requestAnimationFrame(animateFrameFuncProto);
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
			animationFrame = requestAnimationFrame(animateFrameFuncProto);
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
		for (let i = 0; i < items.length; i++) items[i].updatePosition(i, props.vertical);
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
				if (props.autoplay) scheduleAutoplay();
			}
		} else {
			invalid = true;
			updateViewport(-state.displayMultipleItems - 1);
		}
	}
	watch([
		() => props.current,
		() => props.currentItemId,
		() => [...swiperContexts.value]
	], () => {
		let current = -1;
		if (props.currentItemId) {
			for (let i = 0, items = swiperContexts.value; i < items.length; i++) if (items[i].getItemId() === props.currentItemId) {
				current = i;
				break;
			}
		}
		if (current < 0) current = Math.round(props.current) || 0;
		current = current < 0 ? 0 : current;
		if (state.current !== current) {
			currentChangeSource = "";
			state.current = current;
		}
	});
	watch([
		() => props.vertical,
		() => circularEnabled.value,
		() => state.displayMultipleItems,
		() => [...swiperContexts.value]
	], resetLayout);
	watch(() => state.interval, () => {
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
	watch(() => state.current, (val, oldVal) => {
		currentChanged(val, oldVal);
		emit("update:current", val);
	});
	watch(() => state.currentItemId, (val) => {
		emit("update:currentItemId", val);
	});
	function inintAutoplay(enable) {
		if (enable) scheduleAutoplay();
		else cancelSchedule();
	}
	watch(() => props.autoplay && !state.userTracking, inintAutoplay);
	inintAutoplay(props.autoplay && !state.userTracking);
	onMounted(() => {
		let userDirectionChecked = false;
		let contentTrackSpeed = 0;
		let contentTrackT = 0;
		function handleTrackStart() {
			cancelSchedule();
			contentTrackViewport = viewportPosition;
			contentTrackSpeed = 0;
			contentTrackT = Date.now();
			cancelViewportAnimation();
		}
		function handleTrackMove(data) {
			const oldContentTrackT = contentTrackT;
			contentTrackT = Date.now();
			const other = swiperContexts.value.length - state.displayMultipleItems;
			function calc(val) {
				return .5 - .25 / (val + .5);
			}
			function move(oldVal, newVal) {
				let val = contentTrackViewport + oldVal;
				contentTrackSpeed = .6 * contentTrackSpeed + .4 * newVal;
				if (!circularEnabled.value) {
					if (val < 0 || val > other) {
						if (val < 0) val = -calc(-val);
						else if (val > other) val = other + calc(val - other);
						contentTrackSpeed = 0;
					}
				}
				updateViewport(val);
			}
			const time = contentTrackT - oldContentTrackT || 1;
			const slideFrameEl = slideFrameRef.value;
			if (props.vertical) move(-data.dy / slideFrameEl.offsetHeight, -data.ddy / time);
			else move(-data.dx / slideFrameEl.offsetWidth, -data.ddx / time);
		}
		function handleTrackEnd(isCancel) {
			state.userTracking = false;
			const t = contentTrackSpeed / Math.abs(contentTrackSpeed);
			let n = 0;
			if (!isCancel && Math.abs(contentTrackSpeed) > .2) n = .5 * t;
			const current = normalizeCurrentValue(viewportPosition + n);
			if (isCancel) animateViewport(state.current, "", 0);
			else {
				currentChangeSource = "touch";
				state.current = current;
				animateViewport(current, "touch", n !== 0 ? n : current === 0 && circularEnabled.value && viewportPosition >= 1 ? 1 : 0);
			}
		}
		useTouchtrack(slideFrameRef.value, (event) => {
			if (props.disableTouch) return;
			if (!invalid) {
				if (event.detail.state === "start") {
					state.userTracking = true;
					userDirectionChecked = false;
					return handleTrackStart();
				}
				if (event.detail.state === "end") return handleTrackEnd(false);
				if (event.detail.state === "cancel") return handleTrackEnd(true);
				if (state.userTracking) {
					if (!userDirectionChecked) {
						userDirectionChecked = true;
						const t = Math.abs(event.detail.dx);
						const n = Math.abs(event.detail.dy);
						if (t >= n && props.vertical) state.userTracking = false;
						else if (t <= n && !props.vertical) state.userTracking = false;
						if (!state.userTracking) {
							if (props.autoplay) scheduleAutoplay();
							return;
						}
					}
					handleTrackMove(event.detail);
					return false;
				}
			}
		}, true);
	});
	onUnmounted(() => {
		cancelSchedule();
		cancelAnimationFrame(animationFrame);
	});
	function onSwiperDotClick(index) {
		animateViewport(state.current = index, currentChangeSource = "click", circularEnabled.value ? 1 : 0);
	}
	return {
		onSwiperDotClick,
		circularEnabled,
		swiperEnabled
	};
}
var UniSwiperElement = class extends UniElement {};
var swiper_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Swiper",
	props: props$17,
	emits: [
		"change",
		"transition",
		"animationfinish",
		"update:current",
		"update:currentItemId"
	],
	rootElement: {
		name: "uni-swiper",
		class: UniSwiperElement
	},
	setup(props, { slots, emit }) {
		const rootRef = ref(null);
		const trigger = useCustomEvent(rootRef, emit);
		const slidesWrapperRef = ref(null);
		const slideFrameRef = ref(null);
		const state = useState$2(props);
		const slidesStyle = computed(() => {
			let style = {};
			if (props.nextMargin || props.previousMargin) style = props.vertical ? {
				left: 0,
				right: 0,
				top: rpx2px(props.previousMargin, true),
				bottom: rpx2px(props.nextMargin, true)
			} : {
				top: 0,
				bottom: 0,
				left: rpx2px(props.previousMargin, true),
				right: rpx2px(props.nextMargin, true)
			};
			return style;
		});
		const slideFrameStyle = computed(() => {
			const value = Math.abs(100 / state.displayMultipleItems) + "%";
			return {
				width: props.vertical ? "100%" : value,
				height: !props.vertical ? "100%" : value
			};
		});
		let swiperItems = [];
		const originSwiperContexts = [];
		const swiperContexts = ref([]);
		function updateSwiperContexts() {
			const contexts = [];
			for (let index = 0; index < swiperItems.length; index++) {
				let swiperItem = swiperItems[index];
				if (!(swiperItem instanceof Element)) swiperItem = swiperItem.el;
				const swiperContext = originSwiperContexts.find((context) => swiperItem === context.rootRef.value);
				if (swiperContext) contexts.push(markRaw(swiperContext));
			}
			swiperContexts.value = contexts;
		}
		const addSwiperContext = function(swiperContext) {
			originSwiperContexts.push(swiperContext);
			updateSwiperContexts();
		};
		provide("addSwiperContext", addSwiperContext);
		const removeSwiperContext = function(swiperContext) {
			const index = originSwiperContexts.indexOf(swiperContext);
			if (index >= 0) {
				originSwiperContexts.splice(index, 1);
				updateSwiperContexts();
			}
		};
		provide("removeSwiperContext", removeSwiperContext);
		const { onSwiperDotClick, circularEnabled, swiperEnabled } = useLayout(props, state, swiperContexts, slideFrameRef, emit, trigger);
		let createNavigationTsx = () => null;
		createNavigationTsx = useSwiperNavigation(rootRef, props, state, onSwiperDotClick, swiperContexts, circularEnabled, swiperEnabled);
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			const defaultSlots = slots.default && slots.default();
			swiperItems = flatVNode(defaultSlots);
			return createVNode("uni-swiper", { "ref": rootRef }, [createVNode("div", {
				"ref": slidesWrapperRef,
				"class": "uni-swiper-wrapper"
			}, [
				createVNode("div", {
					"class": "uni-swiper-slides",
					"style": slidesStyle.value
				}, [createVNode("div", {
					"ref": slideFrameRef,
					"class": "uni-swiper-slide-frame",
					"style": slideFrameStyle.value
				}, [defaultSlots], 4)], 4),
				props.indicatorDots && createVNode("div", { "class": ["uni-swiper-dots", props.vertical ? "uni-swiper-dots-vertical" : "uni-swiper-dots-horizontal"] }, [swiperContexts.value.map((_, index, array) => createVNode("div", {
					"onClick": () => onSwiperDotClick(index),
					"class": {
						"uni-swiper-dot": true,
						"uni-swiper-dot-active": index < state.current + state.displayMultipleItems && index >= state.current || index < state.current + state.displayMultipleItems - array.length
					},
					"style": { background: index === state.current ? props.indicatorActiveColor : props.indicatorColor }
				}, null, 14, ["onClick"]))], 2),
				createNavigationTsx()
			], 512)], 512);
		};
	}
});
var useSwiperNavigation = (rootRef, props, state, onSwiperDotClick, swiperContext, circularEnabled, swiperEnabled) => {
	let isNavigationAuto = false;
	let prevDisabled = false;
	let nextDisabled = false;
	let hideNavigation = ref(false);
	watchEffect(() => {
		isNavigationAuto = props.navigation === "auto";
		hideNavigation.value = props.navigation !== true || isNavigationAuto;
		swiperAddMouseEvent();
	});
	watchEffect(() => {
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
		target.style.backgroundColor = type === "over" ? props.navigationActiveColor : "";
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
	const createNavigationSVG = () => createSvgIconVNode(ICON_PATH_BACK, props.navigationColor, 26);
	let setHideNavigationTimer;
	const _mousemove = (e) => {
		clearTimeout(setHideNavigationTimer);
		const { clientX, clientY } = e;
		const { left, right, top, bottom, width, height } = rootRef.value.getBoundingClientRect();
		let hide = false;
		if (props.vertical) hide = !(clientY - top < height / 3 || bottom - clientY < height / 3);
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
	onMounted(swiperAddMouseEvent);
	function createNavigationTsx() {
		const navigationClass = {
			"uni-swiper-navigation-hide": hideNavigation.value,
			"uni-swiper-navigation-vertical": props.vertical
		};
		if (props.navigation) return createVNode(Fragment, null, [createVNode("div", mergeProps({
			"class": ["uni-swiper-navigation uni-swiper-navigation-prev", extend({ "uni-swiper-navigation-disabled": prevDisabled }, navigationClass)],
			"onClick": (e) => navigationClick(e, "prev", prevDisabled)
		}, navigationAttr), [createNavigationSVG()], 16, ["onClick"]), createVNode("div", mergeProps({
			"class": ["uni-swiper-navigation uni-swiper-navigation-next", extend({ "uni-swiper-navigation-disabled": nextDisabled }, navigationClass)],
			"onClick": (e) => navigationClick(e, "next", nextDisabled)
		}, navigationAttr), [createNavigationSVG()], 16, ["onClick"])]);
		return null;
	}
	return createNavigationTsx;
};
//#endregion
//#region ../uni-components/src/vue/swiper-item/index.tsx
var props$16 = { itemId: {
	type: String,
	default: ""
} };
var UniSwiperItemElement = class extends UniElement {};
var swiper_item_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "SwiperItem",
	props: props$16,
	rootElement: {
		name: "uni-swiper-item",
		class: UniSwiperItemElement
	},
	setup(props, { slots }) {
		const rootRef = ref(null);
		const context = {
			rootRef,
			getItemId() {
				return props.itemId;
			},
			getBoundingClientRect() {
				return rootRef.value.getBoundingClientRect();
			},
			updatePosition(position, vertical) {
				const x = vertical ? "0" : 100 * position + "%";
				const y = vertical ? 100 * position + "%" : "0";
				const rootEl = rootRef.value;
				const value = `translate(${x},${y}) translateZ(0)`;
				if (rootEl) {
					rootEl.style.webkitTransform = value;
					rootEl.style.transform = value;
				}
			}
		};
		onMounted(() => {
			const addSwiperContext = inject("addSwiperContext");
			if (addSwiperContext) addSwiperContext(context);
		});
		onUnmounted(() => {
			const removeSwiperContext = inject("removeSwiperContext");
			if (removeSwiperContext) removeSwiperContext(context);
		});
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-swiper-item", {
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
//#endregion
//#region ../uni-components/src/vue/switch/index-x.tsx
var props$15 = {
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
	},
	backgroundColor: {
		type: String,
		default: "#e9e9ea"
	},
	activeBackgroundColor: {
		type: String,
		default: ""
	},
	foreColor: {
		type: String,
		default: ""
	},
	activeForeColor: {
		type: String,
		default: ""
	}
};
var UniSwitchElement = class extends UniElement {};
var index_x_default$4 = /*#__PURE__*/ defineBuiltInComponent({
	name: "Switch",
	props: props$15,
	emits: ["change"],
	rootElement: {
		name: "uni-switch",
		class: UniSwitchElement
	},
	setup(props, { emit }) {
		const rootRef = ref(null);
		const switchChecked = ref(props.checked);
		const uniLabel = useSwitchInject(rootRef, props, switchChecked);
		const trigger = useCustomEvent(rootRef, emit);
		watch(() => props.checked, (val) => {
			switchChecked.value = val;
		});
		const _onClick = ($event) => {
			if (props.disabled) return;
			switchChecked.value = !switchChecked.value;
			trigger("change", $event, { value: switchChecked.value });
		};
		if (!!uniLabel) {
			uniLabel.addHandler(_onClick);
			onBeforeUnmount(() => {
				uniLabel.removeHandler(_onClick);
			});
		}
		useListeners(props, { "label-click": _onClick });
		let checkedCache = ref(switchChecked.value);
		watch(() => switchChecked.value, (val) => {
			checkedCache.value = val;
		});
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.defineProperty(rootElement, "checked", {
				get() {
					return checkedCache.value;
				},
				set(val) {
					checkedCache.value = val;
				}
			});
			rootElement.attachVmProps(props);
		});
		return () => {
			const { activeBackgroundColor, activeForeColor, backgroundColor, color, foreColor, type } = props;
			const booleanAttrs = useBooleanAttr(props, "disabled");
			const switchInputStyle = {};
			const fixColor = activeBackgroundColor || color;
			const bgColor = switchChecked.value ? fixColor : backgroundColor;
			if (bgColor) {
				switchInputStyle["backgroundColor"] = bgColor;
				switchInputStyle["borderColor"] = bgColor;
			}
			const thumbStyle = {};
			const fgColor = switchChecked.value ? activeForeColor : foreColor;
			if (fgColor) thumbStyle["backgroundColor"] = fgColor;
			let realCheckValue;
			realCheckValue = checkedCache.value;
			return createVNode("uni-switch", mergeProps({
				"id": props.id,
				"ref": rootRef
			}, booleanAttrs, { "onClick": _onClick }), [createVNode("div", { "class": "uni-switch-wrapper" }, [withDirectives(createVNode("div", {
				"class": ["uni-switch-input", [switchChecked.value ? "uni-switch-input-checked" : ""]],
				"style": switchInputStyle
			}, [createVNode("div", {
				"class": ["uni-switch-thumb", [switchChecked.value ? "uni-switch-thumb-checked" : ""]],
				"style": thumbStyle
			}, null, 6)], 6), [[vShow, type === "switch"]]), withDirectives(createVNode("div", { "class": "uni-checkbox-input" }, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props.color, 22) : ""], 512), [[vShow, type === "checkbox"]])])], 16, ["id", "onClick"]);
		};
	}
});
function useSwitchInject(rootRef, props, switchChecked) {
	const initialCheckedValue = props.checked;
	const uniForm = inject(uniFormKey, false);
	const uniLabel = inject(uniLabelKey, false);
	const formField = {
		submit: () => {
			const data = ["", null];
			if (props.name) {
				data[0] = props.name;
				data[1] = rootRef.value.checked;
			}
			return data;
		},
		reset: () => {
			switchChecked.value = initialCheckedValue;
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
//#region ../uni-components/src/helpers/text.ts
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
			if (char === "n") result += LINEFEED;
			else if (char === "\\") result += "\\";
			else result += "\\" + char;
			isEscape = false;
		} else if (char === "\\") isEscape = true;
		else result += char;
	}
	if (!decode) return result;
	return result.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(/&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&apos;/g, "'");
}
function parseTextIgnoreLinefeed(text, options) {
	return normalizeText(text, options);
}
//#endregion
//#region ../uni-components/src/vue/text/index.tsx
var UniTextElement = class extends UniElement {};
var text_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Text",
	rootElement: {
		name: "uni-text",
		class: UniTextElement
	},
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
	setup(props, { slots }) {
		const rootRef = ref(null);
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			const children = [];
			if (slots.default) slots.default().forEach((vnode) => {
				if (vnode.shapeFlag & 8 && vnode.type !== Comment) {
					let lines = [];
					lines = [parseTextIgnoreLinefeed(vnode.children, {
						space: props.space,
						decode: props.decode
					})];
					const len = lines.length - 1;
					lines.forEach((line, index) => {
						if (index === 0 && !line) {} else children.push(createTextVNode(line));
						if (index !== len) children.push(createVNode("br"));
					});
				} else {
					if (process.env.NODE_ENV !== "production" && vnode.shapeFlag & 6 && vnode.type.name !== "Text") console.warn("Do not nest other components in the text component, as there may be display differences on different platforms.");
					children.push(vnode);
				}
			});
			return createVNode("uni-text", {
				"ref": rootRef,
				"selectable": props.selectable ? true : null
			}, [createVNode("span", null, children)], 8, ["selectable"]);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/textarea/index.tsx
var props$14 = /*#__PURE__*/ extend({}, props$24, {
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
function setFixMargin() {
	const DARK_TEST_STRING = "(prefers-color-scheme: dark)";
	fixMargin = String(navigator.platform).indexOf("iP") === 0 && String(navigator.vendor).indexOf("Apple") === 0 && window.matchMedia(DARK_TEST_STRING).media !== DARK_TEST_STRING;
}
var UniTextareaElement = class extends UniElement {
	focus(options) {
		var _this$querySelector;
		(_this$querySelector = this.querySelector("textarea")) === null || _this$querySelector === void 0 || _this$querySelector.focus(options);
	}
};
var textarea_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Textarea",
	props: props$14,
	emits: [
		"confirm",
		"change",
		"linechange",
		...emit
	],
	rootElement: {
		name: "uni-textarea",
		class: UniTextareaElement
	},
	setup(props, { emit, expose }) {
		const rootRef = ref(null);
		const wrapperRef = ref(null);
		const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } = useField(props, rootRef, emit);
		const valueCompute = computed(() => state.value.split(LINEFEED));
		const isDone = computed(() => ConfirmTypes.includes(props.confirmType));
		const heightRef = ref(0);
		const lineRef = ref(null);
		watch(() => heightRef.value, (height) => {
			const el = rootRef.value;
			const lineEl = lineRef.value;
			const wrapper = wrapperRef.value;
			let lineHeight = parseFloat(getComputedStyle(el).lineHeight);
			if (isNaN(lineHeight)) lineHeight = lineEl.offsetHeight;
			var lineCount = Math.round(height / lineHeight);
			trigger("linechange", {}, {
				height,
				heightRpx: 750 / window.innerWidth * height,
				lineCount
			});
			if (props.autoHeight) wrapper.style.height = height + "px";
		});
		watch(() => props.autoHeight, (autoHeight) => {
			const wrapper = wrapperRef.value;
			if (autoHeight) wrapper.style.height = heightRef.value + "px";
			else wrapper.style.height = "";
		});
		function onResize({ height }) {
			heightRef.value = height;
		}
		function onChange(event) {
			trigger("change", event, { value: state.value });
		}
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
				!props.confirmHold && textarea.blur();
			}
		}
		setFixMargin();
		expose({ $triggerInput: (detail) => {
			emit("update:modelValue", detail.value);
			emit("update:value", detail.value);
			state.value = detail.value;
		} });
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.defineProperty(rootElement, "value", {
				get() {
					return state.value;
				},
				set(value) {
					rootElement.querySelector("textarea").value = value;
				}
			});
			rootElement.attachVmProps(props);
		});
		return () => {
			let textareaNode = props.disabled && fixDisabledColor ? createVNode("textarea", {
				"key": "disabled-textarea",
				"ref": fieldRef,
				"value": state.value,
				"tabindex": "-1",
				"readonly": !!props.disabled,
				"maxlength": state.maxlength,
				"class": {
					"uni-textarea-textarea": true,
					"uni-textarea-textarea-fix-margin": fixMargin
				},
				"style": {
					overflowY: props.autoHeight ? "hidden" : "auto",
					...props.cursorColor && { caretColor: props.cursorColor }
				},
				"onFocus": (event) => event.target.blur()
			}, null, 46, [
				"value",
				"readonly",
				"maxlength",
				"onFocus"
			]) : createVNode("textarea", {
				"key": "textarea",
				"ref": fieldRef,
				"value": state.value,
				"disabled": !!props.disabled,
				"maxlength": state.maxlength,
				"enterkeyhint": props.confirmType,
				"inputmode": props.inputmode,
				"class": {
					"uni-textarea-textarea": true,
					"uni-textarea-textarea-fix-margin": fixMargin
				},
				"style": {
					overflowY: props.autoHeight ? "hidden" : "auto",
					...props.cursorColor && { caretColor: props.cursorColor }
				},
				"onKeydown": onKeyDownEnter,
				"onKeyup": onKeyUpEnter,
				"onChange": onChange
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
			return createVNode("uni-textarea", {
				"ref": rootRef,
				"auto-height": props.autoHeight
			}, [createVNode("div", {
				"ref": wrapperRef,
				"class": "uni-textarea-wrapper"
			}, [
				withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
					"style": props.placeholderStyle,
					"class": ["uni-textarea-placeholder", props.placeholderClass]
				}), [props.placeholder], 16), [[vShow, !state.value.length]]),
				createVNode("div", {
					"ref": lineRef,
					"class": "uni-textarea-line"
				}, [" "], 512),
				createVNode("div", { "class": {
					"uni-textarea-compute": true,
					"uni-textarea-compute-auto-height": props.autoHeight
				} }, [valueCompute.value.map((item) => createVNode("div", null, [item.trim() ? item : "."])), createVNode(resize_sensor_default, {
					"initial": true,
					"onResize": onResize
				}, null, 8, ["initial", "onResize"])], 2),
				props.confirmType === "search" ? createVNode("form", {
					"action": "",
					"onSubmit": () => false,
					"class": "uni-input-form"
				}, [textareaNode], 40, ["onSubmit"]) : textareaNode
			], 512)], 8, ["auto-height"]);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/view/index.tsx
var UniViewElement = class extends UniElement {};
var view_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "View",
	props: /*#__PURE__*/ extend({}, hoverProps),
	rootElement: {
		name: "uni-view",
		class: UniViewElement
	},
	setup(props, { slots }) {
		const rootRef = ref(null);
		const { hovering, binding } = useHover(props);
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			const hoverClass = props.hoverClass;
			if (hoverClass && hoverClass !== "none") return createVNode("uni-view", mergeProps({
				"class": hovering.value ? hoverClass : "",
				"ref": rootRef
			}, binding), [renderSlot(slots, "default")], 16);
			return createVNode("uni-view", { "ref": rootRef }, [renderSlot(slots, "default")], 512);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/list-view/index.tsx
function isHTMlElement(node) {
	return !!(node && node.nodeType === 1);
}
function getChildren(root) {
	const children = [];
	if (root) walk(root, children);
	return children;
}
var ChildType = [
	"ListItem",
	"StickySection",
	"StickyHeader"
];
function walk(vnode, children) {
	if (vnode.component && vnode.component.type && vnode.component.type.name && ChildType.includes(vnode.component.type.name)) children.push(vnode);
	else if (vnode.component) walk(vnode.component.subTree, children);
	else if (vnode.shapeFlag & 16) {
		const vnodes = vnode.children;
		for (let i = 0; i < vnodes.length; i++) walk(vnodes[i], children);
	}
}
function traverseListView(visibleVNode, callback) {
	const children = getChildren(visibleVNode);
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		callback(child);
	}
}
function traverseStickySection(stickySectionVNode, callback) {
	const children = getChildren(stickySectionVNode.component.subTree);
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		callback(child);
	}
}
var props$13 = {
	direction: {
		type: String,
		default: "vertical",
		validator: (val) => {
			return [
				"none",
				"vertical",
				"horizontal"
			].includes(val);
		}
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
		default: "transparent"
	},
	refresherTriggered: {
		type: [Boolean, String],
		default: false
	}
};
var UniListViewElement = class extends UniElement {};
var list_view_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "ListView",
	props: props$13,
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
	rootElement: {
		name: "uni-list-view",
		class: UniListViewElement
	},
	setup(props, { slots, emit }) {
		const rootRef = ref(null);
		const containerRef = ref(null);
		const visibleRef = ref(null);
		const { isVertical, state } = useListViewState(props);
		provide("__listViewIsVertical", isVertical);
		provide("__listViewDefaultItemSize", state.defaultItemSize);
		provide("__listViewDefaultHeaderSize", state.defaultHeaderSize);
		const rearrangeDebounce = debounce(() => {
			nextTick(() => {
				_rearrange();
			});
		}, 5, {
			clearTimeout,
			setTimeout
		});
		const childStatus = [];
		provide("__listViewRegisterItem", (status) => {
			childStatus.push(status);
			rearrangeDebounce();
		});
		provide("__listViewUnregisterItem", (status) => {
			const index = childStatus.indexOf(status);
			childStatus.splice(index, 1);
			rearrangeDebounce();
		});
		provide("__listViewFirstItemRendered", (status) => {
			state.defaultItemSize = status.cachedSize;
			state.defaultItemSizeUpdated = true;
		});
		watch(() => {
			return state.defaultHeaderSize;
		}, (value) => {
			rearrangeDebounce();
		});
		watch(() => {
			return state.defaultItemSize;
		}, () => {
			childStatus.forEach((status) => {
				if (status.cachedSizeUpdated) return;
				status.cachedSize = state.defaultItemSize;
			});
			rearrangeDebounce();
		});
		const trigger = useCustomEvent(rootRef, emit);
		handleTouchEvent(isVertical, containerRef, props, state, trigger, emit);
		function getOffset() {
			return isVertical.value ? containerRef.value.scrollTop : containerRef.value.scrollLeft;
		}
		function resetContainerSize() {
			const containerEl = containerRef.value;
			state.containerSize = isVertical.value ? containerEl.clientHeight : containerEl.clientWidth;
			rearrangeDebounce();
		}
		watch(isVertical, () => {
			resetContainerSize();
		});
		const upperThresholdNumber = computed(() => {
			const val = Number(props.upperThreshold);
			return isNaN(val) ? 50 : val;
		});
		const lowerThresholdNumber = computed(() => {
			const val = Number(props.lowerThreshold);
			return isNaN(val) ? 50 : val;
		});
		const scrollTopNumber = computed(() => {
			return Number(props.scrollTop) || 0;
		});
		const scrollLeftNumber = computed(() => {
			return Number(props.scrollLeft) || 0;
		});
		watch(scrollTopNumber, (val) => {
			if (containerRef.value) containerRef.value.scrollTop = val;
		});
		watch(scrollLeftNumber, (val) => {
			if (containerRef.value) containerRef.value.scrollLeft = val;
		});
		watch(() => props.scrollIntoView, (val) => {
			_scrollIntoViewChanged(val);
		});
		function _scrollIntoViewChanged(val) {
			if (val) {
				if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
					console.error(`id error: scroll-into-view=${val}`);
					return;
				}
				let element = containerRef.value.querySelector("#" + val);
				if (element) {
					let mainRect = containerRef.value.getBoundingClientRect();
					let elRect = element.getBoundingClientRect();
					if (!isVertical.value) {
						let left = elRect.left - mainRect.left;
						let x = containerRef.value.scrollLeft + left;
						containerRef.value.scrollLeft = x;
					}
					if (isVertical.value) {
						let top = elRect.top - mainRect.top;
						let y = containerRef.value.scrollTop + top;
						containerRef.value.scrollTop = y;
					}
				}
			}
		}
		let lastScrollLeft = 0;
		let lastScrollTop = 0;
		onActivated(() => {
			if (containerRef.value) {
				containerRef.value.scrollLeft = lastScrollLeft;
				containerRef.value.scrollTop = lastScrollTop;
			}
		});
		onMounted(() => {
			resetContainerSize();
			let lastScrollOffset = 0;
			containerRef.value.addEventListener("scroll", function($event) {
				const target = $event.target;
				if (isHTMlElement(target)) {
					lastScrollLeft = target.scrollLeft;
					lastScrollTop = target.scrollTop;
				}
				trigger("scroll", $event, {
					scrollLeft: target.scrollLeft,
					scrollTop: target.scrollTop,
					scrollHeight: target.scrollHeight,
					scrollWidth: target.scrollWidth,
					deltaX: isVertical.value ? 0 : lastScrollOffset - target.scrollLeft,
					deltaY: isVertical.value ? lastScrollOffset - target.scrollTop : 0
				});
				const currentOffset = getOffset();
				const upperOffset = upperThresholdNumber.value;
				if (currentOffset <= upperOffset && lastScrollOffset > upperOffset) trigger("scrolltoupper", $event, { direction: isVertical.value ? "top" : "left" });
				const lowerOffset = (isVertical.value ? target.scrollHeight : target.scrollWidth) - (isVertical.value ? target.clientHeight : target.clientWidth) - lowerThresholdNumber.value;
				if (currentOffset >= lowerOffset && lastScrollOffset < lowerOffset) trigger("scrolltolower", $event, { direction: isVertical.value ? "bottom" : "right" });
				lastScrollOffset = currentOffset;
				if (_shouldRearrange()) _rearrange();
			});
			const rootElement = rootRef.value;
			const containerElement = containerRef.value;
			Object.defineProperties(rootElement, {
				scrollHeight: { get() {
					return containerElement.scrollHeight;
				} },
				scrollWidth: { get() {
					return containerElement.scrollWidth;
				} },
				scrollLeft: {
					get() {
						return containerElement.scrollLeft;
					},
					set(val) {
						containerElement.scrollLeft = val;
					}
				},
				scrollTop: {
					get() {
						return containerElement.scrollTop;
					},
					set(val) {
						containerElement.scrollTop = val;
					}
				},
				scrollBy: { get() {
					return containerElement.scrollBy.bind(containerElement);
				} }
			});
			rootElement.attachVmProps(props);
		});
		function onResize() {
			childStatus.forEach((status) => {
				status.cachedSizeUpdated = false;
			});
			resetContainerSize();
		}
		function _rearrange() {
			rearrange(visibleVNode, containerRef, isVertical, state);
		}
		function _shouldRearrange() {
			return shouldRearrange(containerRef, isVertical, state);
		}
		/**
		* scroll-behavior: smooth; 自chrome61版本起支持，safari自15.4版本起支持。除safari外无兼容问题
		*/
		const containerStyle = computed(() => {
			return `${props.direction === "none" ? "overflow: hidden;" : props.direction === "all" ? "overflow: auto;" : isVertical.value ? "overflow: hidden auto;" : "overflow: auto hidden;"}scroll-behavior: ${props.scrollWithAnimation ? "smooth" : "auto"};`;
		});
		const contentStyle = computed(() => {
			return `position: relative; ${isVertical.value ? "height" : "width"}: ${state.totalSize}px;`;
		});
		const visibleStyle = computed(() => {
			return `position: absolute; ${isVertical.value ? "width" : "height"}: 100%; ${isVertical.value ? "top" : "left"}: ${state.placehoderSize}px;`;
		});
		let visibleVNode = null;
		return () => {
			const { refresherEnabled, refresherBackground, refresherDefaultStyle, refresherThreshold } = props;
			const { refresherHeight, refreshState } = state;
			const defaultSlot = slots.default && slots.default();
			visibleVNode = createVNode("div", {
				"ref": visibleRef,
				"class": "uni-list-view-visible",
				"style": visibleStyle.value
			}, [defaultSlot], 4);
			return createVNode("uni-list-view", {
				"ref": rootRef,
				"class": "uni-list-view"
			}, [createVNode("div", {
				"ref": containerRef,
				"class": `uni-list-view-container ${props.showScrollbar === false ? "uni-list-view-scrollbar-hidden" : ""}`,
				"style": containerStyle.value
			}, [refresherEnabled ? createVNode(refresher_default, {
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
			]) : null, createVNode("div", {
				"class": "uni-list-view-content",
				"style": contentStyle.value
			}, [visibleVNode], 4)], 6), createVNode(resize_sensor_default, { "onResize": onResize }, null, 8, ["onResize"])], 512);
		};
	}
});
function useListViewState(props) {
	const isVertical = computed(() => {
		return props.direction !== "horizontal";
	});
	return {
		state: reactive({
			defaultItemSize: 40,
			defaultItemSizeUpdated: false,
			defaultHeaderSize: 40,
			defaultHeaderSizeUpdated: false,
			totalSize: 0,
			placehoderSize: 0,
			visibleSize: 0,
			containerSize: 0,
			cacheScreenCount: 10,
			loadScreenThreshold: 8,
			refresherHeight: 0,
			refreshState: "",
			lastRenderOffsetMin: 0,
			lastRenderOffsetMax: 0
		}),
		isVertical
	};
}
function shouldRearrange(containerRef, isVertical, state) {
	const offset = isVertical.value ? containerRef.value.scrollTop : containerRef.value.scrollLeft;
	const loadScreenThresholdSize = state.containerSize * state.loadScreenThreshold;
	const rearrangeOffsetMin = state.lastRenderOffsetMin + loadScreenThresholdSize;
	const rearrangeOffsetMax = state.lastRenderOffsetMax - loadScreenThresholdSize;
	return offset < rearrangeOffsetMin || offset > rearrangeOffsetMax;
}
function rearrange(visibleVNode, containerRef, isVertical, state) {
	if (!visibleVNode) return;
	const containerEl = containerRef.value;
	if (!containerEl) return;
	const offset = isVertical.value ? containerEl.scrollTop : containerEl.scrollLeft;
	const offsetMin = Math.max(offset - state.containerSize * state.cacheScreenCount, 0);
	const offsetMax = Math.max(offset + state.containerSize * (state.cacheScreenCount + 1), offsetMin + 1);
	state.lastRenderOffsetMin = offsetMin;
	state.lastRenderOffsetMax = offsetMax;
	let tempTotalSize = 0;
	let tempVisibleSize = 0;
	let tempPlaceholderSize = 0;
	let start = false, end = false;
	function callback(child) {
		var _child$component, _child$component2;
		const childType = (_child$component = child.component) === null || _child$component === void 0 ? void 0 : _child$component.type.name;
		const status = (_child$component2 = child.component) === null || _child$component2 === void 0 || (_child$component2 = _child$component2.exposed) === null || _child$component2 === void 0 ? void 0 : _child$component2.__listViewChildStatus;
		if (childType === "StickySection") {
			const { headSize, tailSize, placeholderSize } = status;
			tempTotalSize += headSize.value;
			let tempPlaceholderSizeOfSection = 0;
			traverseStickySection(child, (child) => {
				var _child$component3, _child$component4;
				const childType = (_child$component3 = child.component) === null || _child$component3 === void 0 ? void 0 : _child$component3.type.name;
				const status = (_child$component4 = child.component) === null || _child$component4 === void 0 || (_child$component4 = _child$component4.exposed) === null || _child$component4 === void 0 ? void 0 : _child$component4.__listViewChildStatus;
				if (childType === "StickyHeader") {
					const { cachedSize, cachedSizeUpdated } = status;
					if (cachedSizeUpdated && cachedSize > 0 && !state.defaultHeaderSizeUpdated) {
						state.defaultHeaderSize = cachedSize;
						state.defaultHeaderSizeUpdated = true;
					}
					tempTotalSize += cachedSize || state.defaultHeaderSize;
					tempVisibleSize += cachedSize;
				} else if (childType === "ListItem") {
					const { cachedSize, cachedSizeUpdated } = status;
					if (cachedSizeUpdated && cachedSize > 0 && !state.defaultItemSizeUpdated) {
						state.defaultItemSize = cachedSize;
						state.defaultItemSizeUpdated = true;
					}
					const itemSize = cachedSize || state.defaultItemSize;
					tempTotalSize += itemSize;
					if (!start && tempTotalSize > offsetMin) start = true;
					if (start && !end) {
						tempVisibleSize += itemSize;
						status.visible.value = true;
					} else {
						status.visible.value = false;
						tempPlaceholderSizeOfSection += itemSize;
					}
					if (!end && tempTotalSize >= offsetMax) end = true;
				}
			});
			tempVisibleSize += tempPlaceholderSizeOfSection;
			tempTotalSize += tailSize.value;
			placeholderSize.value = tempPlaceholderSizeOfSection;
		} else if (childType === "ListItem") {
			const { cachedSize, cachedSizeUpdated } = status;
			if (cachedSizeUpdated && cachedSize > 0 && !state.defaultItemSizeUpdated) {
				state.defaultItemSize = cachedSize;
				state.defaultItemSizeUpdated = true;
			}
			const itemSize = cachedSize || state.defaultItemSize;
			tempTotalSize += itemSize;
			if (!start && tempTotalSize > offsetMin) start = true;
			if (!start) tempPlaceholderSize += itemSize;
			if (start && !end) {
				tempVisibleSize += itemSize;
				status.visible.value = true;
			} else status.visible.value = false;
			if (!end && tempTotalSize >= offsetMax) end = true;
		} else if (childType === "StickyHeader") {
			const { cachedSize, cachedSizeUpdated } = status;
			if (cachedSizeUpdated && cachedSize > 0 && !state.defaultHeaderSizeUpdated) {
				state.defaultHeaderSize = cachedSize;
				state.defaultHeaderSizeUpdated = true;
			}
			tempTotalSize += cachedSize || state.defaultHeaderSize;
			tempVisibleSize += cachedSize;
		}
	}
	traverseListView(visibleVNode, callback);
	state.totalSize = tempTotalSize;
	state.visibleSize = tempVisibleSize;
	state.placehoderSize = tempPlaceholderSize;
}
function handleTouchEvent(isVertical, containerRef, props, state, trigger, emit) {
	let beforeRefreshing = false;
	let triggerAbort = false;
	let toUpperNumber = 0;
	let touchStart = {
		x: 0,
		y: 0
	};
	let touchEnd = {
		x: 0,
		y: props.refresherThreshold
	};
	function _setRefreshState(_state) {
		if (!props.refresherEnabled) return;
		switch (_state) {
			case "refreshing":
				state.refresherHeight = props.refresherThreshold;
				if (!beforeRefreshing) {
					beforeRefreshing = true;
					trigger("refresherpulling", {}, {
						deltaY: state.refresherHeight,
						dy: state.refresherHeight
					});
					trigger("refresherrefresh", {}, { dy: touchEnd.y - touchStart.y });
					emit("update:refresherTriggered", true);
				}
				break;
			case "restore":
			case "refresherabort":
				beforeRefreshing = false;
				state.refresherHeight = toUpperNumber = 0;
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
	watch(() => props.refresherTriggered, (val) => {
		if (val === true) _setRefreshState("refreshing");
		else if (val === false) _setRefreshState("restore");
	});
	function __handleTouchStart(event) {
		if (event.touches.length === 1) touchStart = {
			x: event.touches[0].pageX,
			y: event.touches[0].pageY
		};
	}
	function __handleTouchMove(event) {
		const containerEl = containerRef.value;
		if (touchStart === null) return;
		let x = event.touches[0].pageX;
		let y = event.touches[0].pageY;
		if (!isVertical.value) return;
		let needStop = false;
		if (Math.abs(touchStart.y - y) < Math.abs(touchStart.x - x)) needStop = false;
		else if (containerEl.scrollTop === 0 && y > touchStart.y) {
			needStop = false;
			if (props.refresherEnabled && event.cancelable !== false) event.preventDefault();
		} else if (containerEl.scrollHeight === containerEl.offsetHeight + containerEl.scrollTop && y < touchStart.y) {
			needStop = false;
			return;
		} else needStop = true;
		if (needStop) event.stopPropagation();
		if (!props.refresherEnabled) return;
		if (containerEl.scrollTop === 0 && event.touches.length === 1) _setRefreshState("pulling");
		if (props.refresherEnabled && state.refreshState === "pulling") {
			const dy = y - touchStart.y;
			if (toUpperNumber === 0) toUpperNumber = y;
			if (!beforeRefreshing) {
				state.refresherHeight = y - toUpperNumber;
				if (state.refresherHeight > 0) {
					triggerAbort = true;
					trigger("refresherpulling", event, {
						deltaY: dy,
						dy
					});
				}
			} else {
				state.refresherHeight = dy + props.refresherThreshold;
				triggerAbort = false;
			}
		}
	}
	function __handleTouchEnd(event) {
		touchEnd = {
			x: event.changedTouches[0].pageX,
			y: event.changedTouches[0].pageY
		};
		if (state.refresherHeight >= props.refresherThreshold) _setRefreshState("refreshing");
		else _setRefreshState("refresherabort");
		touchStart = {
			x: 0,
			y: 0
		};
		touchEnd = {
			x: 0,
			y: props.refresherThreshold
		};
	}
	onMounted(() => {
		const containerEl = containerRef.value;
		containerEl.addEventListener("touchstart", __handleTouchStart);
		containerEl.addEventListener("touchmove", __handleTouchMove, { passive: false });
		containerEl.addEventListener("touchend", __handleTouchEnd);
	});
	onBeforeUnmount(() => {
		const containerEl = containerRef.value;
		containerEl.removeEventListener("touchstart", __handleTouchStart);
		containerEl.removeEventListener("touchmove", __handleTouchMove);
		containerEl.removeEventListener("touchend", __handleTouchEnd);
	});
}
//#endregion
//#region ../uni-components/src/vue/list-item/index.tsx
function getSize(isVertical, el) {
	var style = window.getComputedStyle(el);
	if (isVertical) return parseFloat(style.marginTop) + el.getBoundingClientRect().height + parseFloat(style.marginBottom);
	else return parseFloat(style.marginLeft) + el.getBoundingClientRect().width + parseFloat(style.marginRight);
}
var UniListItemElement = class extends UniElement {};
var list_item_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "ListItem",
	props: {},
	rootElement: {
		name: "uni-list-item",
		class: UniListItemElement
	},
	setup(props, { slots, expose, attrs }) {
		if (attrs.slot === "refresher") return () => {
			return createVNode("uni-list-item", null, [slots.default && slots.default()]);
		};
		const rootRef = ref(null);
		const isVertical = inject("__listViewIsVertical");
		const visible = ref(false);
		const status = {
			type: "ListItem",
			visible,
			cachedSize: inject("__listViewDefaultItemSize"),
			cachedSizeUpdated: false
		};
		expose({ __listViewChildStatus: status });
		const registerItem = inject("__listViewRegisterItem");
		const unregisterItem = inject("__listViewUnregisterItem");
		const firstItemRendered = inject("__listViewFirstItemRendered");
		onMounted(() => {
			registerItem(status);
		});
		onBeforeUnmount(() => {
			unregisterItem(status);
		});
		watch(visible, (value) => {
			if (!value || status.cachedSizeUpdated) return;
			nextTick(() => {
				const rootNode = rootRef.value;
				if (isHTMlElement(rootNode)) {
					status.cachedSize = getSize(isVertical.value, rootNode);
					status.cachedSizeUpdated = true;
					firstItemRendered(status);
				}
			});
		});
		return () => {
			if (!visible.value) return null;
			return createVNode("uni-list-item", { "ref": rootRef }, [slots.default && slots.default()], 512);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/sticky-section/index.tsx
var UniStickySectionElement = class extends UniElement {};
var sticky_section_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "StickySection",
	props: { padding: {
		type: Array,
		default: [
			0,
			0,
			0,
			0
		]
	} },
	rootElement: {
		name: "uni-sticky-section",
		class: UniStickySectionElement
	},
	setup(props, { slots, expose }) {
		const rootRef = ref(null);
		const isVertical = inject("__listViewIsVertical");
		const placeholderSize = ref(0);
		const style = computed(() => {
			const padding = props.padding;
			const paddingTop = padding[0];
			const paddingRight = padding[1];
			const paddingBottom = padding[2];
			const paddingLeft = padding[3];
			return {
				paddingTop: paddingTop + "px",
				paddingRight: paddingRight + "px",
				paddingBottom: (isVertical.value ? paddingBottom + placeholderSize.value : paddingBottom) + "px",
				paddingLeft: (isVertical.value ? paddingLeft : paddingLeft + placeholderSize.value) + "px"
			};
		});
		expose({ __listViewChildStatus: {
			type: "StickySection",
			headSize: computed(() => {
				return isVertical ? props.padding[0] : props.padding[3];
			}),
			tailSize: computed(() => {
				return isVertical ? props.padding[2] : props.padding[1];
			}),
			placeholderSize
		} });
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			var _slots$default;
			return createVNode("uni-sticky-section", {
				"ref": rootRef,
				"style": style.value
			}, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 4);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/sticky-header/index.tsx
var UniStickyHeaderElement = class extends UniElement {};
var sticky_header_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "StickyHeader",
	props: { padding: {
		type: Array,
		default: [
			0,
			0,
			0,
			0
		]
	} },
	rootElement: {
		name: "uni-sticky-header",
		class: UniStickyHeaderElement
	},
	setup(props, { slots, expose }) {
		const rootRef = ref(null);
		const isVertical = inject("__listViewIsVertical");
		const style = computed(() => {
			return {
				paddingTop: props.padding[0] + "px",
				paddingRight: props.padding[1] + "px",
				paddingBottom: props.padding[2] + "px",
				paddingLeft: props.padding[3] + "px",
				top: 0 - props.padding[0] + "px"
			};
		});
		const status = {
			type: "StickyHeader",
			cachedSize: inject("__listViewDefaultHeaderSize"),
			cachedSizeUpdated: false
		};
		expose({ __listViewChildStatus: status });
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		onMounted(() => {
			const rect = rootRef.value.getBoundingClientRect();
			status.cachedSize = isVertical ? rect.height : rect.width;
			status.cachedSizeUpdated = true;
		});
		return () => {
			var _slots$default;
			return createVNode("uni-sticky-header", {
				"ref": rootRef,
				"style": style.value
			}, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 4);
		};
	}
});
//#endregion
//#region ../uni-app/dist/uni-app.es.js
var createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = getCurrentInstance()) => {
	!isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
var onLoad = /*#__PURE__*/ createLifeCycleHook(ON_LOAD, 2);
var onReady = /*#__PURE__*/ createLifeCycleHook(ON_READY, 2);
var onUnload = /*#__PURE__*/ createLifeCycleHook(ON_UNLOAD, 2);
var onResize = /*#__PURE__*/ createLifeCycleHook(ON_RESIZE, 2);
var onBackPress = /*#__PURE__*/ createLifeCycleHook(ON_BACK_PRESS, 2);
//#endregion
//#region ../uni-components/src/vue/page-container/element.ts
var UniPageContainerElement = class extends UniElement {};
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/objectSpread2.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
//#endregion
//#region ../uni-components/src/vue/page-container/index.vue?vue&type=script&setup=true&lang.ts
var MAX_SLIDER_DISTANCE = 100;
var MIN_SLIDER_VELOCITY = .3;
//#endregion
//#region ../uni-components/src/vue/page-container/index.vue
var page_container_default = /* @__PURE__ */ defineComponent(_objectSpread2(_objectSpread2({}, {
	name: "page-container",
	rootElement: {
		name: "uni-page-container",
		class: UniPageContainerElement
	}
}), {}, {
	__name: "index",
	props: {
		show: {
			type: Boolean,
			default: false
		},
		duration: {
			default: 300,
			type: Number
		},
		zIndex: {
			default: 100,
			type: Number
		},
		overlay: {
			type: Boolean,
			default: true
		},
		round: {
			type: Boolean,
			default: false
		},
		position: {
			default: "bottom",
			type: String
		},
		customStyle: {
			default: "",
			type: String
		},
		overlayStyle: {
			default: "",
			type: String
		},
		closeOnSlideDown: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		"beforeenter",
		"enter",
		"afterenter",
		"beforeleave",
		"leave",
		"afterleave",
		"clickoverlay"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const showPageContainer = ref(false);
		const isAnimating = ref(false);
		const transitionTimer = ref(null);
		const isEntered = ref(false);
		let touchStartX = 0;
		let touchStartY = 0;
		let touchStartTime = 0;
		let isDragging = false;
		const translateValue = ref(0);
		const overlayStyleMap = computed(() => {
			const styleObj = {
				"z-index": props.zIndex,
				"transition-duration": props.duration + "ms"
			};
			if (isEntered.value) {
				styleObj["opacity"] = "1";
				styleObj["pointer-events"] = "auto";
			}
			return styleObj;
		});
		const innerStyleMap = computed(() => {
			const styleObj = {
				"z-index": props.zIndex + 1,
				"transition-duration": props.duration + "ms"
			};
			if (translateValue.value != 0 && isDragging) {
				let transformValue = "";
				switch (props.position) {
					case "bottom":
					case "top":
						transformValue = `translateY(${translateValue.value}px)`;
						break;
					case "left":
					case "right":
						transformValue = `translateX(${translateValue.value}px)`;
						break;
				}
				if (transformValue != "") {
					styleObj["transform"] = transformValue;
					styleObj["transition"] = "none";
				}
			} else if (translateValue.value != 0 && !isDragging) styleObj["transition"] = `transform ${props.duration}ms ease`;
			return styleObj;
		});
		const popupClasses = computed(() => {
			const classes = [];
			if (props.position != null) classes.push(`uni-page-container-popup-${props.position}`);
			if (props.round) classes.push("uni-page-container-popup-round");
			if (isEntered.value) classes.push("uni-page-container-popup-enter");
			return classes;
		});
		function clearTransitionTimer() {
			if (transitionTimer.value != null) {
				clearTimeout(transitionTimer.value);
				transitionTimer.value = null;
			}
		}
		function onAnimationEnd(type) {
			isAnimating.value = false;
			clearTransitionTimer();
			if (type == "enter") emits("afterenter");
			else if (type == "leave") {
				showPageContainer.value = false;
				emits("afterleave");
			}
		}
		function listenTransitionEnd(type) {
			clearTransitionTimer();
			transitionTimer.value = setTimeout(() => {
				onAnimationEnd(type);
			}, props.duration);
		}
		function resetDragState() {
			isDragging = false;
			translateValue.value = 0;
		}
		function openContainer() {
			emits("beforeenter");
			showPageContainer.value = true;
			isEntered.value = false;
			resetDragState();
			nextTick(() => {
				emits("enter");
				isAnimating.value = true;
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						isEntered.value = true;
						listenTransitionEnd("enter");
					});
				});
			});
		}
		function closeContainer() {
			if (isAnimating.value) return;
			emits("beforeleave");
			isAnimating.value = true;
			nextTick(() => {
				isEntered.value = false;
				emits("leave");
				listenTransitionEnd("leave");
			});
		}
		watch(() => props.show, (newVal) => {
			if (newVal && !showPageContainer.value) openContainer();
			else if (!newVal && showPageContainer.value) closeContainer();
		});
		function onClickOverlay(event) {
			if (isAnimating.value) return;
			emits("clickoverlay", event);
			nextTick(() => {
				closeContainer();
			});
		}
		function onTouchStart(e) {
			if (!props.closeOnSlideDown) return;
			if (e.touches.length > 0) {
				const { clientX, clientY } = e.touches[0];
				touchStartX = clientX;
				touchStartY = clientY;
				touchStartTime = Date.now();
				isDragging = false;
			}
		}
		function onTouchMove(e) {
			if (!props.closeOnSlideDown) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			if (e.touches.length > 0) {
				const { clientX, clientY } = e.touches[0];
				const deltaX = clientX - touchStartX;
				const deltaY = clientY - touchStartY;
				let shouldDrag = false;
				let dragValue = 0;
				switch (props.position) {
					case "bottom":
						if (deltaY > 0) {
							shouldDrag = true;
							dragValue = deltaY;
						}
						break;
					case "top":
						if (deltaY < 0) {
							shouldDrag = true;
							dragValue = deltaY;
						}
						break;
					case "left":
						if (deltaX < 0) {
							shouldDrag = true;
							dragValue = deltaX;
						}
						break;
					case "right":
						if (deltaX > 0) {
							shouldDrag = true;
							dragValue = deltaX;
						}
						break;
				}
				if (shouldDrag) {
					isDragging = true;
					translateValue.value = dragValue;
					e.preventDefault();
					e.stopPropagation();
				}
			}
		}
		function onTouchEnd() {
			if (!props.closeOnSlideDown) return;
			if (isDragging) {
				const deltaTime = Date.now() - touchStartTime;
				const velocity = Math.abs(translateValue.value) / deltaTime;
				if (Math.abs(translateValue.value) > MAX_SLIDER_DISTANCE || velocity > MIN_SLIDER_VELOCITY) {
					resetDragState();
					closeContainer();
				} else resetDragState();
			}
		}
		function onTouchCancel() {
			if (!props.closeOnSlideDown) return;
			if (isDragging) resetDragState();
		}
		onBackPress(() => {
			if (showPageContainer.value) {
				closeContainer();
				return true;
			}
			return false;
		});
		onMounted(() => {
			if (props.show) openContainer();
		});
		onBeforeUnmount(() => {
			clearTransitionTimer();
		});
		return (_ctx, _cache) => {
			const _component_view = view_default;
			return openBlock(), createElementBlock(Fragment, null, [_ctx.overlay && showPageContainer.value ? (openBlock(), createBlock(_component_view, {
				key: 0,
				class: "uni-page-container-overlay",
				style: normalizeStyle([overlayStyleMap.value, _ctx.overlayStyle]),
				onClick: onClickOverlay,
				onTouchmove: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent", "stop"]))
			}, null, 8, ["style"])) : createCommentVNode("", true), showPageContainer.value ? (openBlock(), createBlock(_component_view, {
				key: 1,
				class: normalizeClass(["uni-page-container-popup", popupClasses.value]),
				style: normalizeStyle([innerStyleMap.value, _ctx.customStyle]),
				onTouchstart: onTouchStart,
				onTouchmove: onTouchMove,
				onTouchend: onTouchEnd,
				onTouchcancel: onTouchCancel
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class", "style"])) : createCommentVNode("", true)], 64);
		};
	}
}));
//#endregion
//#region ../uni-components/src/vue/loading/element.ts
var UniVueElement = class extends HTMLElement {};
var UniLoadingElement = class extends UniVueElement {};
//#endregion
//#region ../uni-components/src/vue/loading/useLoadingStyle.ts
function useLoadingStyle(targetElement, bold) {
	const loadingSize = ref("16px");
	const loadingBorderWidth = ref("1px");
	const loadingBorderRadius = ref("8px");
	let observer = null;
	const calculateLoadingWidth = (element, bold) => {
		const { width, height } = element.getBoundingClientRect();
		const coefficient = bold ? 2 : 1;
		const minSide = Math.min(width, height);
		const calculatedWidth = minSide / 16 * coefficient;
		loadingSize.value = `${minSide}px`;
		loadingBorderWidth.value = `${calculatedWidth}px`;
		loadingBorderRadius.value = `${minSide / 2}px`;
	};
	const setupObserver = (cb) => {
		const el = targetElement.value;
		if (!el) return;
		observer = new ResizeObserver((entries) => {
			cb(el);
		});
		observer.observe(el);
	};
	onMounted(() => {
		setupObserver((el) => {
			calculateLoadingWidth(el, bold.value);
		});
		watchEffect(() => {
			const _bold = bold.value;
			const el = targetElement.value;
			if (el !== null) calculateLoadingWidth(el, _bold);
		});
	});
	onUnmounted(() => {
		if (observer) observer.disconnect();
	});
	return {
		size: loadingSize,
		borderWidth: loadingBorderWidth,
		borderRadius: loadingBorderRadius
	};
}
//#endregion
//#region ../uni-components/src/vue/loading/index-x.vue
var index_x_default$1 = /* @__PURE__ */ defineComponent(_objectSpread2(_objectSpread2({}, {
	name: "loading",
	rootElement: {
		name: "uni-loading-element",
		class: UniLoadingElement
	}
}), {}, {
	__name: "index-x",
	props: {
		paused: {
			type: Boolean,
			default: false
		},
		bold: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const LoadingRef = ref(null);
		const loadingStyle = reactive(useLoadingStyle(LoadingRef, computed(() => props.bold)));
		return (_ctx, _cache) => {
			const _component_view = view_default;
			return openBlock(), createBlock(_component_view, {
				class: "__uni_loading_container__",
				ref_key: "LoadingRef",
				ref: LoadingRef,
				style: { "display": "flex" }
			}, {
				default: withCtx(() => [createVNode(_component_view, {
					class: normalizeClass(["__uni-loading__ __loading-4-3__", { "__uni-loading__paused": props.paused }]),
					style: normalizeStyle([{ "box-sizing": "border-box" }, {
						width: loadingStyle.size,
						height: loadingStyle.size,
						borderWidth: loadingStyle.borderWidth
					}])
				}, null, 8, ["class", "style"])]),
				_: 1
			}, 512);
		};
	}
}));
//#endregion
//#region ../uni-components/src/helpers/useSubscribe.ts
function normalizeEvent(vm, id) {
	if (!id) id = vm.id;
	if (!id) return;
	return vm.$options.name.toLowerCase() + "." + id;
}
function addSubscribe(name, callback, pageId) {
	if (!name) return;
	registerViewMethod(pageId || getCurrentPageId(), name, ({ type, data }, resolve) => {
		callback(type, data, resolve);
	});
}
function removeSubscribe(name, pageId) {
	if (!name) return;
	unregisterViewMethod(pageId || getCurrentPageId(), name);
}
function useSubscribe(callback, name, multiple, pageId) {
	const vm = getCurrentInstance().proxy;
	pageId = pageId == null ? useCurrentPageId() : pageId;
	onMounted(() => {
		addSubscribe(name || normalizeEvent(vm), callback, pageId);
		if (multiple || !name) watch(() => vm.id, (value, oldValue) => {
			addSubscribe(normalizeEvent(vm, value), callback, pageId);
			removeSubscribe(oldValue && normalizeEvent(vm, oldValue));
		});
	});
	onBeforeUnmount(() => {
		removeSubscribe(name || normalizeEvent(vm), pageId);
	});
}
function useOn(name, callback) {
	onMounted(() => UniViewJSBridge.on(name, callback));
	onBeforeUnmount(() => UniViewJSBridge.off(name));
}
//#endregion
//#region ../uni-components/src/helpers/useContextInfo.ts
var index$2 = 0;
function useContextInfo(_id) {
	const page = useCurrentPageId();
	const vm = getCurrentInstance().proxy;
	const type = vm.$options.name.toLowerCase();
	const id = _id || vm.id || `context${index$2++}`;
	onMounted(() => {
		const el = vm.$el;
		el.__uniContextInfo = {
			id,
			type,
			page
		};
	});
	return `${type}.${id}`;
}
function getContextInfo(el) {
	return el.__uniContextInfo;
}
//#endregion
//#region ../uni-vue/src/componentOptions/hooks.ts
function injectLifecycleHook(name, hook, publicThis, instance) {
	if (isFunction(hook)) injectHook(name, hook.bind(publicThis), instance);
}
function initHooks(options, instance, publicThis) {
	const mpType = options.mpType || publicThis.$mpType;
	if (!mpType || mpType === "component" || mpType === "page" && instance.renderer === "component") return;
	Object.keys(options).forEach((name) => {
		if (isUniLifecycleHook(name, options[name], false)) {
			const hooks = options[name];
			if (isArray(hooks)) hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
			else injectLifecycleHook(name, hooks, publicThis, instance);
		}
	});
	if (mpType === "page") {
		instance.__isVisible = true;
		try {
			let query = instance.attrs.__pageQuery;
			query = new UTSJSONObject$1(decodedQuery(query));
			invokeHook(publicThis, ON_LOAD, query);
			if (!instance.vapor) delete instance.attrs.__pageQuery;
			const $basePage = publicThis.$basePage;
			if (($basePage === null || $basePage === void 0 ? void 0 : $basePage.openType) !== "preloadPage") if (isDialogPageInstance(getPageInstanceByChild(instance))) invokeNewDialogPageHook(publicThis.$page, ON_SHOW);
			else invokeHook(publicThis, ON_SHOW);
		} catch (e) {
			console.error(e.message + LINEFEED + e.stack);
		}
	}
}
//#endregion
//#region ../uni-vue/src/componentOptions/index.ts
function applyOptions(options, instance, publicThis) {
	initHooks(options, instance, publicThis);
}
//#endregion
//#region ../uni-vue/src/componentInstance.ts
function set(target, key, val) {
	return target[key] = val;
}
function $callMethod(method, ...args) {
	const fn = this[method];
	if (fn) return fn(...args);
	console.error(`method ${method} not found`);
	return null;
}
//#endregion
//#region ../uni-vue/src/appConfig.ts
function createErrorHandler(app) {
	const userErrorHandler = app.config.errorHandler;
	return function errorHandler(err, instance, info) {
		if (userErrorHandler) userErrorHandler(err, instance, info);
		const appInstance = app._instance;
		if (!appInstance || !appInstance.proxy) throw err;
		if (appInstance[ON_ERROR]) invokeHook(appInstance.proxy, ON_ERROR, err);
		else logError(err, info, instance ? instance.$.vnode : null, false);
	};
}
function mergeAsArray(to, from) {
	return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
	UniLifecycleHooks.forEach((name) => {
		optionMergeStrategies[name] = mergeAsArray;
	});
}
//#endregion
//#region ../uni-vue/src/uni-id-mixin.ts
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
//#endregion
//#region ../uni-vue/src/index.ts
function initApp(app) {
	const appConfig = app.config;
	appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
	initOptionMergeStrategies(appConfig.optionMergeStrategies);
	const globalProperties = appConfig.globalProperties;
	if (__UNI_FEATURE_UNI_CLOUD__) uniIdMixin(globalProperties);
	globalProperties.$set = set;
	globalProperties.$applyOptions = applyOptions;
	globalProperties.$callMethod = $callMethod;
	invokeCreateVueAppHook(app);
}
//#endregion
//#region src/helpers/usePopupStyle.ts
function usePopupStyle(props) {
	const popupWidth = ref(0);
	const popupHeight = ref(0);
	const isDesktop = computed(() => popupWidth.value >= 500 && popupHeight.value >= 500);
	const popupStyle = computed(() => {
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
		const popover = props.popover;
		function getNumber(value) {
			return Number(value) || 0;
		}
		if (isDesktop.value && popover) {
			extend(triangleStyle, {
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
	});
	onMounted(() => {
		const fixSize = () => {
			const { windowWidth, windowHeight, windowTop } = uni.getSystemInfoSync();
			popupWidth.value = windowWidth;
			popupHeight.value = windowHeight + (windowTop || 0);
		};
		window.addEventListener("resize", fixSize);
		fixSize();
		onUnmounted(() => {
			window.removeEventListener("resize", fixSize);
		});
	});
	return {
		isDesktop,
		popupStyle
	};
}
//#endregion
//#region src/helpers/useKeyboard.ts
var KEY_MAPS = {
	esc: ["Esc", "Escape"],
	enter: ["Enter"]
};
var KEYS = Object.keys(KEY_MAPS);
function useKeyboard() {
	const key = ref("");
	const disable = ref(false);
	const onKeyup = (evt) => {
		if (disable.value) return;
		const res = KEYS.find((key) => KEY_MAPS[key].indexOf(evt.key) !== -1);
		if (res) key.value = res;
		nextTick(() => key.value = "");
	};
	onMounted(() => {
		document.addEventListener("keyup", onKeyup);
	});
	onBeforeUnmount(() => {
		document.removeEventListener("keyup", onKeyup);
	});
	return {
		key,
		disable
	};
}
//#endregion
//#region src/service/api/ui/popup/utils.ts
function createRootApp(component, rootState, callback) {
	rootState.onClose = (...args) => (rootState.visible = false, callback.apply(null, args));
	return createApp(defineComponent({ setup() {
		return () => (openBlock(), createBlock(component, rootState, null, 16));
	} }));
}
function ensureRoot(id) {
	let rootEl = document.getElementById(id);
	if (!rootEl) {
		rootEl = document.createElement("div");
		rootEl.id = id;
		document.body.append(rootEl);
	}
	return rootEl;
}
function usePopup(props, { onEsc, onEnter }) {
	const visible = ref(props.visible);
	const { key, disable } = useKeyboard();
	watch(() => props.visible, (value) => visible.value = value);
	watch(() => visible.value, (value) => disable.value = !value);
	watchEffect(() => {
		const { value } = key;
		if (value === "esc") onEsc && onEsc();
		else if (value === "enter") onEnter && onEnter();
	});
	return visible;
}
//#endregion
//#region src/service/api/ui/popup/showActionSheet.ts
var showActionSheetState;
var hideActionSheet$2 = () => {
	if (showActionSheetState) showActionSheetState.visible = false;
};
//#endregion
//#region src/service/api/ui/popup/showModal.ts
var showModalState;
var hideModal$2 = () => {
	if (showModalState) showModalState.visible = false;
};
//#endregion
//#region src/framework/plugin/router.ts
function initRouter(app) {
	const router = createRouter(createRouterOptions());
	router.beforeEach((to, from) => {
		hideActionSheet$2();
		hideModal$2();
		uni.hideToast();
		uni.hideLoading({ fail(error) {
			const pages = getCurrentBasePages();
			if (!pages[pages.length - 1]) return;
			throw new Error(error.errMsg);
		} });
	});
	router.beforeEach((to, from) => {
		if (to && from && to.meta.isTabBar && from.meta.isTabBar) saveTabBarScrollPosition(from.meta.tabBarIndex);
	});
	app.router = router;
	app.use(router);
}
var positionStore = Object.create(null);
function getTabBarScrollPosition(id) {
	return positionStore[id];
}
function saveTabBarScrollPosition(id) {
	if (typeof window !== "undefined") positionStore[id] = {
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
function removeCurrentPages(delta = 1) {
	const keys = getCurrentBasePages();
	const start = keys.length - 1;
	const end = start - delta;
	for (let i = start; i > end; i--) {
		const page = getPage$BasePage(keys[i]);
		removePage(normalizeRouteKey(page.path, page.id), false);
	}
}
function initHistory() {
	let { routerBase } = __uniConfig.router;
	if (routerBase === "/") routerBase = "";
	const history = __UNI_FEATURE_ROUTER_MODE__ === "history" ? createWebHistory(routerBase) : createWebHashHistory(routerBase);
	history.listen((_to, _from, info) => {
		if (info.direction === "back") removeCurrentPages(Math.abs(info.delta));
	});
	return history;
}
//#endregion
//#region src/framework/plugin/index.ts
var plugin_default = { install(app) {
	initApp(app);
	initViewPlugin(app);
	initServicePlugin(app);
	if (!app.config.warnHandler) app.config.warnHandler = warnHandler;
	if (__UNI_FEATURE_PAGES__) initRouter(app);
} };
function warnHandler(msg, instance, trace) {
	if (instance) {
		if ("PageMetaHead" === instance.$.type.name) return;
		const parent = instance.$.parent;
		if (parent && parent.type.name === "PageMeta") return;
	}
	const warnArgs = [`[Vue warn]: ${msg}`];
	if (trace.length) warnArgs.push(`\n`, trace);
	console.warn(...warnArgs);
}
//#endregion
//#region src/view/components/video/index.tsx
function formatTime(val) {
	val = val > 0 && val < Infinity ? val : 0;
	const h = Math.floor(val / 3600);
	const m = Math.floor(val % 3600 / 60);
	const s = Math.floor(val % 3600 % 60);
	const hStr = (h < 10 ? "0" : "") + h;
	const mStr = (m < 10 ? "0" : "") + m;
	const sStr = (s < 10 ? "0" : "") + s;
	let str = mStr + ":" + sStr;
	if (hStr !== "00") str = hStr + ":" + str;
	return str;
}
function useGesture(props, videoState, videoRef, fullscreenState) {
	const state = reactive({
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
			if (!props.enableProgressGesture) {
				state.gestureType = "stop";
				return;
			}
			state.gestureType = "progress";
			state.currentTimeOld = state.currentTimeNew = video.currentTime;
			if (!fullscreenState.fullscreen) stop();
		} else {
			if (!props.pageGesture && !props.vslideGesture) {
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
	const state = reactive({ fullscreen: false });
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
	onBeforeUnmount(exitFullScreen);
	return {
		state,
		onFullscreenChange,
		emitFullscreenChange,
		toggleFullscreen,
		requestFullScreen,
		exitFullScreen
	};
}
function useVideo(props, attrs, trigger) {
	const videoRef = ref(null);
	const src = computed(() => getRealPath(props.src));
	const muted = computed(() => props.muted === "true" || props.muted === true);
	const state = reactive({
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
	watch(() => src.value, () => {
		state.playing = false;
		state.currentTime = 0;
	});
	watch(() => state.buffered, (buffered) => {
		trigger("progress", {}, { buffered });
	});
	watch(() => muted.value, (muted) => {
		const video = videoRef.value;
		video.muted = muted;
	});
	watch([() => state.duration, () => props.duration], () => {
		let _duration = Number(props.duration);
		isNaN(_duration) && (_duration = 0);
		state.currentDuration = _duration > 0 ? _duration : state.duration;
	});
	function onDurationChange({ target }) {
		state.duration = target.duration;
	}
	function onLoadedMetadata($event) {
		const initialTime = Number(props.initialTime) || 0;
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
function useControls(props, videoState, seek, seeking) {
	const progressRef = ref(null);
	const ballRef = ref(null);
	const centerPlayBtnShow = computed(() => props.showCenterPlayBtn && !videoState.start);
	const controlsVisible = ref(true);
	const state = reactive({
		seeking: false,
		touching: false,
		controlsTouching: false,
		centerPlayBtnShow,
		controlsShow: computed(() => !centerPlayBtnShow.value && props.controls && controlsVisible.value),
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
	onBeforeUnmount(() => {
		if (hideTiming) clearTimeout(hideTiming);
	});
	watch(() => state.controlsShow && videoState.playing && !state.controlsTouching, (val) => {
		if (val) autoHideStart();
		else autoHideEnd();
	});
	onMounted(() => {
		const passiveOptions = passive(false);
		let originX;
		let originY;
		let moveOnce = true;
		let originProgress;
		const ball = ballRef.value;
		function touchmove(event) {
			const toucher = event.targetTouches[0];
			const pageX = toucher.pageX;
			const pageY = toucher.pageY;
			if (moveOnce && Math.abs(pageX - originX) < Math.abs(pageY - originY)) {
				touchend(event);
				return;
			}
			moveOnce = false;
			const w = progressRef.value.offsetWidth;
			let progress = originProgress + (pageX - originX) / w * 100;
			if (progress < 0) progress = 0;
			else if (progress > 100) progress = 100;
			videoState.progress = progress;
			seeking === null || seeking === void 0 || seeking(videoState.currentDuration * progress / 100);
			state.seeking = true;
			event.preventDefault();
			event.stopPropagation();
		}
		function touchend(event) {
			state.controlsTouching = false;
			if (state.touching) {
				ball.removeEventListener("touchmove", touchmove, passiveOptions);
				if (!moveOnce) {
					event.preventDefault();
					event.stopPropagation();
					seek(videoState.currentDuration * videoState.progress / 100);
				}
				state.touching = false;
			}
		}
		ball.addEventListener("touchstart", (event) => {
			state.controlsTouching = true;
			const toucher = event.targetTouches[0];
			originX = toucher.pageX;
			originY = toucher.pageY;
			originProgress = videoState.progress;
			moveOnce = true;
			state.touching = true;
			ball.addEventListener("touchmove", touchmove, passiveOptions);
		});
		ball.addEventListener("touchend", touchend);
		ball.addEventListener("touchcancel", touchend);
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
function useDanmu(props, videoState) {
	const danmuRef = ref(null);
	const state = reactive({ enable: Boolean(props.enableDanmu) });
	let danmuIndex = {
		time: 0,
		index: -1
	};
	const danmuList = isArray(props.danmuList) ? JSON.parse(JSON.stringify(props.danmuList)) : [];
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
		if (currentTime > oldDanmuIndex.time) for (let index = oldDanmuIndex.index + 1; index < danmuList.length; index++) {
			const element = danmuList[index];
			if (currentTime >= (element.time || 0)) {
				newDanmuIndex.index = index;
				if (videoState.playing && state.enable) playDanmu(element);
			} else break;
		}
		else if (currentTime < oldDanmuIndex.time) for (let index = oldDanmuIndex.index - 1; index > -1; index--) if (currentTime <= (danmuList[index].time || 0)) newDanmuIndex.index = index - 1;
		else break;
		danmuIndex = newDanmuIndex;
	}
	function playDanmu(danmu) {
		const p = document.createElement("p");
		p.className = "uni-video-danmu-item";
		p.innerText = danmu.text;
		let style = `bottom: ${Math.random() * 100}%;color: ${danmu.color};`;
		p.setAttribute("style", style);
		danmuRef.value.appendChild(p);
		setTimeout(function() {
			style += "left: 0;-webkit-transform: translateX(-100%);transform: translateX(-100%);";
			p.setAttribute("style", style);
			setTimeout(function() {
				p.remove();
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
	const progressing = computed(() => gestureState.gestureType === "progress" || controlsState.touching);
	watch(progressing, (val) => {
		videoState.pauseUpdatingCurrentTime = val;
		controlsState.controlsTouching = val;
		if (gestureState.gestureType === "progress" && val) controlsState.controlsVisible = val;
	});
	watch([() => videoState.currentTime, () => videoState.currentDuration], () => {
		if (videoState.currentDuration > 0) videoState.progress = videoState.currentTime / videoState.currentDuration * 100;
		else videoState.progress = 0;
		videoState.progress > 100 && (videoState.progress = 100);
	}, { immediate: true });
	watch(() => gestureState.currentTimeNew, (currentTimeNew) => {
		videoState.currentTime = currentTimeNew;
	});
	return progressing;
}
var props$12 = {
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
var UniVideoElement = class extends UniElement {};
var video_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Video",
	props: props$12,
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
	rootElement: {
		name: "uni-video",
		class: UniVideoElement
	},
	setup(props, { emit, attrs, slots }) {
		const rootRef = ref(null);
		const containerRef = ref(null);
		const trigger = useCustomEvent(rootRef, emit);
		const { state: userActionState } = useUserAction();
		const { $attrs: videoAttrs } = useAttrs({ excludeListeners: true });
		initI18nVideoMsgsOnce();
		const { videoRef, state: videoState, play, pause, stop, seek, playbackRate, toggle, onDurationChange, onLoadedMetadata, onProgress, onWaiting, onVideoError, onPlay, onPause, onEnded, onTimeUpdate } = useVideo(props, attrs, trigger);
		const { state: danmuState, danmuRef, updateDanmu, toggleDanmu, sendDanmu } = useDanmu(props, videoState);
		const { state: fullscreenState, onFullscreenChange, emitFullscreenChange, toggleFullscreen, requestFullScreen, exitFullScreen } = useFullscreen(trigger, containerRef, videoRef, userActionState, rootRef);
		const { state: gestureState, onTouchstart, onTouchend, onTouchmove } = useGesture(props, videoState, videoRef, fullscreenState);
		const { state: controlsState, progressRef, ballRef, clickProgress, toggleControls, autoHideEnd, autoHideStart } = useControls(props, videoState, seek, (currentTimeNew) => {
			gestureState.currentTimeNew = currentTimeNew;
		});
		useContext(play, pause, stop, seek, sendDanmu, playbackRate, requestFullScreen, exitFullScreen);
		const progressing = useProgressing(videoState, gestureState, controlsState, autoHideEnd, autoHideStart);
		onMounted(() => {
			const rootElement = rootRef.value;
			Object.assign(rootElement, {
				play,
				pause,
				stop,
				seek,
				sendDanmu,
				playbackRate,
				requestFullScreen,
				exitFullScreen
			});
			rootElement.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-video", {
				"ref": rootRef,
				"id": props.id,
				"onClick": toggleControls
			}, [createVNode("div", {
				"ref": containerRef,
				"class": "uni-video-container",
				"onTouchstart": onTouchstart,
				"onTouchend": onTouchend,
				"onTouchmove": onTouchmove,
				"onFullscreenchange": withModifiers(onFullscreenChange, ["stop"]),
				"onWebkitfullscreenchange": withModifiers(($event) => onFullscreenChange($event, true), ["stop"])
			}, [
				createVNode("video", mergeProps({
					"ref": videoRef,
					"style": { "object-fit": props.objectFit },
					"muted": !!props.muted,
					"loop": !!props.loop,
					"src": videoState.src,
					"poster": props.poster,
					"autoplay": !!props.autoplay
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
				withDirectives(createVNode("div", {
					"class": "uni-video-bar uni-video-bar-full",
					"onClick": withModifiers(() => {}, ["stop"])
				}, [
					createVNode("div", { "class": "uni-video-controls" }, [
						withDirectives(createVNode("div", {
							"class": {
								"uni-video-icon": true,
								"uni-video-control-button": true,
								"uni-video-control-button-play": !videoState.playing,
								"uni-video-control-button-pause": videoState.playing
							},
							"onClick": withModifiers(toggle, ["stop"])
						}, null, 10, ["onClick"]), [[vShow, props.showPlayBtn]]),
						withDirectives(createVNode("div", { "class": "uni-video-current-time" }, [formatTime(videoState.currentTime)], 512), [[vShow, props.showProgress]]),
						withDirectives(createVNode("div", {
							"ref": progressRef,
							"class": "uni-video-progress-container",
							"onClick": withModifiers(clickProgress, ["stop"])
						}, [createVNode("div", { "class": {
							"uni-video-progress": true,
							"uni-video-progress-progressing": progressing.value
						} }, [
							createVNode("div", {
								"style": {
									width: videoState.buffered - videoState.progress + "%",
									left: videoState.progress + "%"
								},
								"class": "uni-video-progress-buffered"
							}, null, 4),
							createVNode("div", {
								"style": { width: videoState.progress + "%" },
								"class": "uni-video-progress-played"
							}, null, 4),
							createVNode("div", {
								"ref": ballRef,
								"style": { left: videoState.progress + "%" },
								"class": {
									"uni-video-ball": true,
									"uni-video-ball-progressing": progressing.value
								}
							}, [createVNode("div", { "class": "uni-video-inner" }, null)], 6)
						], 2)], 8, ["onClick"]), [[vShow, props.showProgress]]),
						withDirectives(createVNode("div", { "class": "uni-video-duration" }, [formatTime(videoState.currentDuration)], 512), [[vShow, props.showProgress]])
					]),
					withDirectives(createVNode("div", {
						"class": {
							"uni-video-icon": true,
							"uni-video-danmu-button": true,
							"uni-video-danmu-button-active": danmuState.enable
						},
						"onClick": withModifiers(toggleDanmu, ["stop"])
					}, null, 10, ["onClick"]), [[vShow, props.danmuBtn]]),
					withDirectives(createVNode("div", {
						"class": {
							"uni-video-icon": true,
							"uni-video-fullscreen": true,
							"uni-video-type-fullscreen": fullscreenState.fullscreen
						},
						"onClick": withModifiers(() => toggleFullscreen(!fullscreenState.fullscreen), ["stop"])
					}, null, 10, ["onClick"]), [[vShow, props.showFullscreenBtn]])
				], 8, ["onClick"]), [[vShow, controlsState.controlsShow]]),
				withDirectives(createVNode("div", {
					"ref": danmuRef,
					"style": "z-index: 0;",
					"class": "uni-video-danmu"
				}, null, 512), [[vShow, videoState.start && danmuState.enable]]),
				controlsState.centerPlayBtnShow && createVNode("div", {
					"class": "uni-video-cover",
					"onClick": withModifiers(() => {}, ["stop"])
				}, [createVNode("div", {
					"class": "uni-video-cover-play-button uni-video-icon",
					"onClick": withModifiers(play, ["stop"])
				}, null, 8, ["onClick"])], 8, ["onClick"]),
				createVNode("div", { "class": "uni-video-loading" }, [gestureState.gestureType === "volume" ? createVNode("div", {
					"class": {
						"uni-video-toast-container": true,
						"uni-video-toast-container-thin": gestureState.toastThin
					},
					"style": { marginTop: `5px` }
				}, [!gestureState.toastThin && gestureState.volumeNew > 0 && gestureState.gestureType === "volume" ? createVNode("text", { "class": "uni-video-icon uni-video-toast-icon" }, [""]) : !gestureState.toastThin && createVNode("text", { "class": "uni-video-icon uni-video-toast-icon" }, [""]), createVNode("div", {
					"class": "uni-video-toast-draw",
					"style": { width: `${gestureState.volumeNew * 100}%` }
				}, null, 4)], 2) : null]),
				createVNode("div", { "class": {
					"uni-video-toast": true,
					"uni-video-toast-progress": progressing.value
				} }, [createVNode("div", { "class": "uni-video-toast-title" }, [
					createVNode("span", { "class": "uni-video-toast-title-current-time" }, [formatTime(gestureState.currentTimeNew)]),
					" / ",
					formatTime(videoState.currentDuration)
				])], 2),
				createVNode("div", { "class": "uni-video-slots" }, [slots.default && slots.default()])
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
//#endregion
//#region src/service/onWebInvokeAppService.ts
var onWebInvokeAppService = ({ name, arg }) => {
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
//#endregion
//#region src/view/components/web-view/index-x.tsx
var Invoke = /*#__PURE__*/ once(() => UniServiceJSBridge.on(ON_WEB_INVOKE_APP_SERVICE, onWebInvokeAppService));
var props$11 = { src: {
	type: String,
	default: ""
} };
var UniWebViewElement = class extends UniElement {};
var index_x_default$5 = /*#__PURE__*/ defineBuiltInComponent({
	inheritAttrs: false,
	name: "WebView",
	props: props$11,
	emits: ["load"],
	rootElement: {
		name: "uni-web-view",
		class: UniWebViewElement
	},
	setup(props, { emit }) {
		Invoke();
		const rootRef = ref(null);
		const iframeRef = ref(null);
		const { $attrs, $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
		const trigger = useCustomEvent(rootRef, emit);
		const renderIframe = () => {
			const iframe = document.createElement("iframe");
			iframe.onload = function(event) {
				trigger("load", event, {
					src: props.src,
					url: props.src
				});
			};
			watchEffect(() => {
				for (const key in $attrs.value) if (hasOwn($attrs.value, key)) iframe[key] = $attrs.value[key];
			});
			watchEffect(() => {
				iframe.src = getRealPath(props.src);
			});
			iframeRef.value = iframe;
		};
		renderIframe();
		onMounted(() => {
			var _rootRef$value;
			(_rootRef$value = rootRef.value) === null || _rootRef$value === void 0 || _rootRef$value.appendChild(iframeRef.value);
		});
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-web-view", mergeProps({ "class": "uni-webview" }, $listeners.value, $excludeAttrs.value, { "ref": rootRef }), null, 16);
		};
	}
});
//#endregion
//#region ../../node_modules/.pnpm/@amap+amap-jsapi-types@0.0.8/node_modules/@amap/amap-jsapi-types/index.js
var require_amap_jsapi_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
//#endregion
//#region src/helpers/getJSONP.ts
var index$1 = 0;
function getJSONP(url, options, success, error) {
	var js = document.createElement("script");
	var callbackKey = options.callback || "callback";
	var callbackName = "__uni_jsonp_callback_" + index$1++;
	var timeout = options.timeout || 3e4;
	var timing;
	function end() {
		clearTimeout(timing);
		delete window[callbackName];
		js.remove();
	}
	window[callbackName] = (res) => {
		if (isFunction(success)) success(res);
		end();
	};
	js.onerror = () => {
		if (isFunction(error)) error();
		end();
	};
	timing = setTimeout(function() {
		if (isFunction(error)) error();
		end();
	}, timeout);
	js.src = url + (url.indexOf("?") >= 0 ? "&" : "?") + callbackKey + "=" + callbackName;
	document.body.appendChild(js);
}
//#endregion
//#region src/view/components/map/maps/Callout.ts
function createCallout(maps) {
	function onAdd() {
		const div = this.div;
		this.getPanes().floatPane.appendChild(div);
	}
	function onRemove() {
		const parentNode = this.div.parentNode;
		if (parentNode) parentNode.removeChild(this.div);
	}
	function createAMapText() {
		const option = this.option;
		this.Text = new maps.Text({
			text: option.content,
			anchor: "bottom-center",
			offset: new maps.Pixel(0, option.offsetY - 16),
			style: {
				padding: (option.padding || 8) + "px",
				"line-height": (option.fontSize || 14) + "px",
				"border-radius": (option.borderRadius || 0) + "px",
				"border-color": `${option.bgColor || "#fff"} transparent transparent`,
				"background-color": option.bgColor || "#fff",
				"box-shadow": "0 2px 6px 0 rgba(114, 124, 245, .5)",
				"text-align": "center",
				"font-size": (option.fontSize || 14) + "px",
				color: option.color || "#000"
			},
			position: option.position
		});
		(maps.event || maps.Event).addListener(this.Text, "click", () => {
			this.callback();
		});
		this.Text.setMap(option.map);
	}
	function createBMapText() {}
	function removeAMapText() {
		if (this.Text) this.option.map.remove(this.Text);
	}
	function removeBMapText() {
		if (this.Text) this.option.map.remove(this.Text);
	}
	class Callout {
		set onclick(callback) {
			this.div.onclick = callback;
		}
		get onclick() {
			return this.div.onclick;
		}
		constructor(option = {}, callback) {
			this.createAMapText = createAMapText;
			this.removeAMapText = removeAMapText;
			this.createBMapText = createBMapText;
			this.removeBMapText = removeBMapText;
			this.onAdd = onAdd;
			this.construct = onAdd;
			this.onRemove = onRemove;
			this.destroy = onRemove;
			this.option = option || {};
			const visible = this.visible = this.alwaysVisible = option.display === "ALWAYS";
			if (getIsAMap()) {
				this.callback = callback;
				if (this.visible) this.createAMapText();
			} else if (getIsBMap()) {
				if (this.visible) this.createBMapText();
			} else {
				const map = option.map;
				this.position = option.position;
				this.index = 1;
				const div = this.div = document.createElement("div");
				const divStyle = div.style;
				divStyle.position = "absolute";
				divStyle.whiteSpace = "nowrap";
				divStyle.transform = "translateX(-50%) translateY(-100%)";
				divStyle.zIndex = "1";
				divStyle.boxShadow = option.boxShadow || "none";
				divStyle.display = visible ? "block" : "none";
				const triangle = this.triangle = document.createElement("div");
				triangle.setAttribute("style", "position: absolute;white-space: nowrap;border-width: 4px;border-style: solid;border-color: #fff transparent transparent;border-image: initial;font-size: 12px;padding: 0px;background-color: transparent;width: 0px;height: 0px;transform: translate(-50%, 100%);left: 50%;bottom: 0;");
				this.setStyle(option);
				div.appendChild(triangle);
				if (map) this.setMap(map);
			}
		}
		setOption(option) {
			this.option = option;
			if (option.display === "ALWAYS") this.alwaysVisible = this.visible = true;
			else this.alwaysVisible = false;
			if (getIsAMap()) {
				if (this.visible) this.createAMapText();
			} else if (getIsBMap()) {
				if (this.visible) this.createBMapText();
			} else {
				this.setPosition(option.position);
				this.setStyle(option);
			}
		}
		setStyle(option) {
			const div = this.div;
			const divStyle = div.style;
			div.innerText = option.content || "";
			divStyle.lineHeight = (option.fontSize || 14) + "px";
			divStyle.fontSize = (option.fontSize || 14) + "px";
			divStyle.padding = (option.padding || 8) + "px";
			divStyle.color = option.color || "#000";
			divStyle.borderRadius = (option.borderRadius || 0) + "px";
			divStyle.backgroundColor = option.bgColor || "#fff";
			divStyle.marginTop = "-" + ((option.top || 0) + 5) + "px";
			this.triangle.style.borderColor = `${option.bgColor || "#fff"} transparent transparent`;
		}
		setPosition(position) {
			this.position = position;
			this.draw();
		}
		draw() {
			const overlayProjection = this.getProjection();
			if (!this.position || !this.div || !overlayProjection) return;
			const pixel = overlayProjection.fromLatLngToDivPixel(this.position);
			const divStyle = this.div.style;
			divStyle.left = pixel.x + "px";
			divStyle.top = pixel.y + "px";
		}
		changed() {
			const divStyle = this.div.style;
			divStyle.display = this.visible ? "block" : "none";
		}
	}
	if (!getIsAMap() && !getIsBMap()) {
		const overlay = new (maps.OverlayView || maps.Overlay)();
		Callout.prototype.setMap = overlay.setMap;
		Callout.prototype.getMap = overlay.getMap;
		Callout.prototype.getPanes = overlay.getPanes;
		Callout.prototype.getProjection = overlay.getProjection;
		Callout.prototype.map_changed = overlay.map_changed;
		Callout.prototype.set = overlay.set;
		Callout.prototype.get = overlay.get;
		Callout.prototype.setOptions = overlay.setValues;
		Callout.prototype.bindTo = overlay.bindTo;
		Callout.prototype.bindsTo = overlay.bindsTo;
		Callout.prototype.notify = overlay.notify;
		Callout.prototype.setValues = overlay.setValues;
		Callout.prototype.unbind = overlay.unbind;
		Callout.prototype.unbindAll = overlay.unbindAll;
		Callout.prototype.addListener = overlay.addListener;
	}
	return Callout;
}
//#endregion
//#region src/view/components/map/maps/index.ts
var maps;
var callbacksMap = {};
var GOOGLE_MAP_CALLBACKNAME = "__map_callback__";
function loadMaps(libraries, callback) {
	const mapInfo = getMapInfo();
	if (!mapInfo.key) {
		console.error("Map key not configured.");
		return;
	}
	const callbacks = callbacksMap[mapInfo.type] = callbacksMap[mapInfo.type] || [];
	if (maps) callback(maps);
	else if (window[mapInfo.type] && window[mapInfo.type].maps) {
		maps = getIsAMap() || getIsBMap() ? window[mapInfo.type] : window[mapInfo.type].maps;
		maps.Callout = maps.Callout || createCallout(maps);
		callback(maps);
	} else if (callbacks.length) callbacks.push(callback);
	else {
		callbacks.push(callback);
		const globalExt = window;
		const callbackName = GOOGLE_MAP_CALLBACKNAME + mapInfo.type;
		globalExt[callbackName] = function() {
			delete globalExt[callbackName];
			maps = getIsAMap() || getIsBMap() ? window[mapInfo.type] : window[mapInfo.type].maps;
			maps.Callout = createCallout(maps);
			callbacks.forEach((callback) => callback(maps));
			callbacks.length = 0;
		};
		if (getIsAMap()) handleAMapSecurityPolicy(mapInfo);
		const script = document.createElement("script");
		let src = getScriptBaseUrl(mapInfo.type);
		if (mapInfo.type === MapType.QQ) libraries.push("geometry");
		if (libraries.length) src += `libraries=${libraries.join("%2C")}&`;
		if (mapInfo.type === MapType.BMAP) script.src = `${src}ak=${mapInfo.key}&callback=${callbackName}`;
		else script.src = `${src}key=${mapInfo.key}&callback=${callbackName}`;
		script.onerror = function() {
			console.error("Map load failed.");
		};
		document.body.appendChild(script);
	}
}
var getScriptBaseUrl = (mapType) => {
	return {
		qq: "https://map.qq.com/api/js?v=2.exp&",
		google: "https://maps.googleapis.com/maps/api/js?",
		AMap: "https://webapi.amap.com/maps?v=2.0&",
		BMapGL: "https://api.map.baidu.com/api?type=webgl&v=1.0&"
	}[mapType];
};
function handleAMapSecurityPolicy(mapInfo) {
	window._AMapSecurityConfig = {
		securityJsCode: mapInfo.securityJsCode || "",
		serviceHost: mapInfo.serviceHost || ""
	};
}
//#endregion
//#region src/helpers/location.ts
var ICON_PATH_LOCTAION = "M13.3334375 16 q0.033125 1.1334375 0.783125 1.8834375 q0.75 0.75 1.8834375 0.75 q1.1334375 0 1.8834375 -0.75 q0.75 -0.75 0.75 -1.8834375 q0 -1.1334375 -0.75 -1.8834375 q-0.75 -0.75 -1.8834375 -0.75 q-1.1334375 0 -1.8834375 0.75 q-0.75 0.75 -0.783125 1.8834375 ZM30.9334375 14.9334375 l-1.1334375 0 q-0.5 -5.2 -4.0165625 -8.716875 q-3.516875 -3.5165625 -8.716875 -4.0165625 l0 -1.1334375 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 l0 1.1334375 q-5.2 0.5 -8.716875 4.0165625 q-3.5165625 3.516875 -4.0165625 8.716875 l-1.1334375 0 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 l1.1334375 0 q0.5 5.2 4.0165625 8.716875 q3.516875 3.5165625 8.716875 4.0165625 l0 1.1334375 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 l0 -1.1334375 q5.2 -0.5 8.716875 -4.0165625 q3.5165625 -3.516875 4.0165625 -8.716875 l1.1334375 0 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 ZM17.0665625 27.6665625 l0 -2.0665625 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 l0 2.0665625 q-4.3 -0.4665625 -7.216875 -3.383125 q-2.916875 -2.916875 -3.3834375 -7.216875 l2.0665625 0 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 q0 -0.4665625 -0.3 -0.7665625 q-0.3 -0.3 -0.7665625 -0.3 l-2.0665625 0 q0.4665625 -4.3 3.3834375 -7.216875 q2.9165625 -2.916875 7.216875 -3.3834375 l0 2.0665625 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 q0.4665625 0 0.7665625 -0.3 q0.3 -0.3 0.3 -0.7665625 l0 -2.0665625 q4.3 0.4665625 7.216875 3.3834375 q2.9165625 2.9165625 3.383125 7.216875 l-2.0665625 0 q-0.4665625 0 -0.7665625 0.3 q-0.3 0.3 -0.3 0.7665625 q0 0.4665625 0.3 0.7665625 q0.3 0.3 0.7665625 0.3 l2.0665625 0 q-0.4665625 4.3 -3.383125 7.216875 q-2.916875 2.9165625 -7.216875 3.383125 Z";
var ICON_PATH_ORIGIN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAC01BMVEUAAAAAef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef96quGStdqStdpbnujMzMzCyM7Gyc7Ky83MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwAef8GfP0yjfNWnOp0qOKKsdyYt9mju9aZt9mMstx1qeJYnekyjvIIfP0qivVmouaWttnMzMyat9lppOUujPQKffxhoOfNzc3Y2Njh4eHp6enu7u7y8vL19fXv7+/i4uLZ2dnOzs6auNgOf/sKff15quHR0dHx8fH9/f3////j4+N6quFdn+iywdPb29vw8PD+/v7c3NyywtLa2tr29vbS0tLd3d38/Pzf39/o6Ojc7f+q0v+HwP9rsf9dqv9Hnv9Vpv/q6urj8P+Vx/9Am/8Pgf8Iff/z8/OAvP95uf/n5+c5l//V6f+52v+y1//7+/vt7e0rkP/09PTQ0NDq9P8Whf+cy//W1tbe3t7A3v/m5ubs7OxOov/r6+vk5OQiaPjKAAAAknRSTlMACBZ9oB71/jiqywJBZATT6hBukRXv+zDCAVrkDIf4JbQsTb7eVeJLbwfa8Rh4G/OlPS/6/kxQ9/xdmZudoJxNVhng7B6wtWdzAtQOipcF1329wS44doK/BAkyP1pvgZOsrbnGXArAg34G2IsD1eMRe7bi7k5YnqFT9V0csyPedQyYD3p/Fje+hDpskq/MwpRBC6yKp2MAAAQdSURBVHja7Zn1exMxGIAPHbrhDsPdneHuNtzd3d3dIbjLh93o2o4i7TpgG1Jk0g0mMNwd/gTa5rq129reHnK5e/bk/TFNk/dJ7r5894XjGAwGg8GgTZasCpDIll1+hxw5vXLJLpEboTx5ZXbIhyzkl9fB28cqUaCgrBKFkI3CcjoUKYolihWXUSI7EihRUjaHXF52CVRKLoe8eZIdUOkyMknkRw6UlcehYAFHiXK+skgURk6Ul8OhQjFnCVRRBolKqRxQ5SzUHaqgNGSj7VCmalqJnDkoS5RF6ZCbroNvufQkUD6qEuXTdUA+3hQdqiEXVKfnUKOmK4latalJ1EEuoZZ6162HJ9x/4OChw0eOHj12/MTJU6dxG7XUu751tjNnz4ET5y9ctLZTSr0beKFLl89bpuUDrqgC1RqNWqsKuqqzNFw7e51S6u3tc+OmZUJ9kCHY6ECwOkRvab51iUrqXej2HYDQsHBjWgx3Ae7dppB6N2wEcF9jdMGDUIDGTaR2aNoM9FqjG7QmaN5CWgc/gIePjG559BigpZQOrYB/4jBfRGRUtDkmJjY6KjLCofkpD62lc2gDfMpWPIuLdwyV8XEpHgaddBZ+wBuSFcwJqSN2ovmZ/dfnOvCTxqGtwzq8SEjv4EhISn48eWgnhUP7DvDSvgzxrs6vV6+FLiro2EkCic4QKkzwJsH1KYreCp0eQhfyDl1B/w4P/xa5JVJ4U03QjbRD9x7wXlgH5IE3wmMBHXoSlugFAcI6f/AkkSi8q6HQm6xDn77wEQ8djTwSj3tqAMguRTe4ikeOQyJ4YV+KfkQl+oNW5GbY4gWOWgbwJ+kwAD6Fi90MK2ZsrIeBBCUGwRXbqJ+/iJMQliIEBhOU6AJhtlG/IpHE2bqrYQg5h6HA4yQiRqwEfkGCdTCMmMRw+IbPDCQaHCsCYAQxiZHw3TbmD/ESOHgHwShiEqPhp/gggYkSztIxxCRawy/bmEniJaJtfwiEscQkxkFgRqJESqQwwHhiEuMBp3Vm8RK/cZoHEzKXhCK2QxEPpiJe0YlKCFaKCNv/cYBNUsBRPlkJSc0U+dM7E9H0ThGJbgZT/iR7yj+VqMS06Qr4+OFm2JdCxIa8lugzkJs5K6MfxAaYPUcBpYG5khZJEkUUSb7DPCnKRfPBXj6M8FwuegoLpCgXcQszVjhbJFUJUee2hBhLoYTIcYtB57KY+opSMdVqwatSlZVj05aV//CwJLMX2DluaUcwhXm4ali2XOoLjxUrPV26zFtF4f5p0Gp310+z13BUWNvbehEXona6iAtX/zVZmtfN4WixfsNky4S6gCCVVq3RPLdfSfpv3MRRZfPoLc6Xs/5bt3EyMGzE9h07/Xft2t15z6i9+zgGg8FgMBgMBoPBYDAYDAYj8/APG67Rie8pUDsAAAAASUVORK5CYII=";
var ICON_PATH_TARGET = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAACcCAMAAAC3Fl5oAAAB3VBMVEVMaXH/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/EhL/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/Dw//AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/GRn/NTX/Dw//Fhb/AAD/AAD/AAD/GRn/GRn/Y2P/AAD/AAD/ExP/Ghr/AAD/AAD/MzP/GRn/AAD/Hh7/AAD/RUX/AAD/AAD/AAD/AAD/AAD/AAD/Dg7/AAD/HR3/Dw//FRX/SUn/AAD/////kJD/DQ3/Zmb/+/v/wMD/mJj/6en/vb3/1NT//Pz/ODj/+fn/3Nz/nJz/j4//9/f/7e3/9vb/7Oz/2Nj/x8f/Ozv/+Pj/3d3/nZ3/2dn//f3/6Oj/2tr/v7//09P/vr7/mZn/l5cdSvP3AAAAe3RSTlMAAhLiZgTb/vztB/JMRhlp6lQW86g8mQ4KFPs3UCH5U8huwlesWtTYGI7RsdVeJGfTW5rxnutLsvXWF8vQNdo6qQbuz7D4hgVIx2xtw8GC1TtZaIw0i84P98tU0/fsj7PKaAgiZZxeVfo8Z52eg1P0nESrENnjXVPUgw/uuSmDAAADsUlEQVR42u3aZ3cTRxgF4GtbYleSLdnGcsENG2ODjbExEHrvhAQCIb1Bem+QdkeuuFMNBBJIfmuOckzZI8/srHYmH3Lm+QNXK632LTvQ03Tu/IWeU/tTGTKT2n+q58L5c00wpXJd47DHEt5w47pKxLbhdLdPKb/7dBYxVLxw1GcI/2h1BcpzKNFHLX2JQ4gumaiitqpEEhEdOMJI9h5AFC3feYzI+7IF2tpSLEOqDXpObPRYFm/jCWho/4Ble7MdoT7fzhhq9yHEz28wltU1UPrJZ0wd66HwicfYvEFIfePTAP8tSLTupBHvtGJFH9bSkNrNWEHzERrT34xSH9Ogr1CijkbVAUH1KRqVqkdQAw07iIAaGlcTqI+/0LjeJJ5J0IIEnkpXMdzs4sTtW9dnZq7fuj2xOMtwVWk88RHDjBYejYvnjD8qjOpfQsUqhvj7oSjxcJIhVj3pyKqpNjYvVjQ/RrXq5YABKi3MCYm5BSrtWO5v11DlmlC4RpU1WRS9SJU7QukOVbpQ9JLu549+Dd0AUOlTbkGEuk85vxLAK5QbuytC3R2j3HoAjZSbFxrmKTcCoJdSk0LLJKV6gSaPMqNTQsvUKGW8JrxKqUWhaZFSeWyh1LTQNE2pHF6mzOy40DQ+S5mLimJcENoKlOnBWsr8KbRNUGYt5LXgd6HtD3lNQIoyN4S2G5RJIUOZm0LbTcqsBqVmhLYZSlkPsP4VWf+Rrd+m1v9o9h8Vv5p42C1R5qL1x7WRglOgVN52yfwNOBu76P+lLPoYidu23KPciIHGa07ZeIW1jvcNtI7q5vexCPGYCmf+m/Y9a3sAwQ5bI9T7ukPgPcn9GToEao+xk1OixJT+GIsvNAbx6eAgPq0xiF+KtkpYKhRXCQ8eFFcJhSWGu3rZ8jJkCM8kz9K4TUnrC6mAgzTsB9tLwQ2W15qfosQ2GrQNpZr7aczbzVjBZsvLcaC1g0bsbIVEnU8DOr6H1KDH2LwtUBi0/JII6Dxm9zUXkH+XMWzfh1Dte1i2Pe3QkC77Zel7aehpO8wyHG6Dtt0NjKxhN6I4uSli/TqJiJJDUQ4NDCURXTrXRy1XcumyD24M+AzhD1RXIIZsl/LoyZmurJHDM7s8lvB2FQ/PmPJ6PseAXP5HGMYAAC7ABbgAF+ACXIALcAEuwAW4ABfgAlyAC3ABLsAFuID/d8Cx4NEt8/byOf0wLnis8zjMq9/Kp7bWw4JOj8u8TlhRl+G/Mp2wpOX48GffvvZ1CyL4B53LAS6zb08EAAAAAElFTkSuQmCC";
var MapType = /* @__PURE__ */ function(MapType) {
	MapType["QQ"] = "qq";
	MapType["GOOGLE"] = "google";
	MapType["AMAP"] = "AMap";
	MapType["BMAP"] = "BMapGL";
	MapType["UNKNOWN"] = "";
	return MapType;
}({});
function getMapInfo() {
	if (__uniConfig.bMapKey) return {
		type: "BMapGL",
		key: __uniConfig.bMapKey
	};
	if (__uniConfig.qqMapKey) return {
		type: "qq",
		key: __uniConfig.qqMapKey
	};
	if (__uniConfig.googleMapKey) return {
		type: "google",
		key: __uniConfig.googleMapKey
	};
	if (__uniConfig.aMapKey) return {
		type: "AMap",
		key: __uniConfig.aMapKey,
		securityJsCode: __uniConfig.aMapSecurityJsCode,
		serviceHost: __uniConfig.aMapServiceHost
	};
	return {
		type: "",
		key: ""
	};
}
var IS_AMAP = false;
var hasGetIsAMap = false;
var getIsAMap = () => {
	if (hasGetIsAMap) return IS_AMAP;
	else {
		hasGetIsAMap = true;
		return IS_AMAP = getMapInfo().type === "AMap";
	}
};
var getIsBMap = () => {
	return getMapInfo().type === "BMapGL";
};
function translateCoordinateSystem(type, coords, skip) {
	const mapInfo = getMapInfo();
	if (type && type.toUpperCase() === "WGS84" || ["google"].includes(mapInfo.type) || skip) return Promise.resolve(coords);
	if (mapInfo.type === "qq") return new Promise((resolve) => {
		getJSONP(`https://apis.map.qq.com/ws/coord/v1/translate?type=1&locations=${coords.latitude},${coords.longitude}&key=${mapInfo.key}&output=jsonp`, { callback: "callback" }, (res) => {
			if ("locations" in res && res.locations.length) {
				const { lng, lat } = res.locations[0];
				resolve({
					longitude: lng,
					latitude: lat,
					altitude: coords.altitude,
					accuracy: coords.accuracy,
					altitudeAccuracy: coords.altitudeAccuracy,
					heading: coords.heading,
					speed: coords.speed
				});
			} else resolve(coords);
		}, () => resolve(coords));
	});
	if (mapInfo.type === "AMap") return new Promise((resolve) => {
		loadMaps([], () => {
			window.AMap.convertFrom([coords.longitude, coords.latitude], "gps", (_, res) => {
				if (res.info === "ok" && res.locations.length) {
					const { lat, lng } = res.locations[0];
					resolve({
						longitude: lng,
						latitude: lat,
						altitude: coords.altitude,
						accuracy: coords.accuracy,
						altitudeAccuracy: coords.altitudeAccuracy,
						heading: coords.heading,
						speed: coords.speed
					});
				} else resolve(coords);
			});
		});
	});
	return Promise.reject(/* @__PURE__ */ new Error("translate coordinate system faild, map provider not configured or not supported"));
}
//#endregion
//#region src/view/components/map/MapMarker.tsx
var props$10 = {
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
function useMarkerLabelStyle(id) {
	const className = "uni-map-marker-label-" + id;
	const styleEl = document.createElement("style");
	styleEl.id = className;
	document.head.appendChild(styleEl);
	onUnmounted(() => {
		styleEl.remove();
	});
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
var MapMarker_default = /*#__PURE__*/ defineSystemComponent({
	name: "MapMarker",
	props: props$10,
	setup(props) {
		const id = String(!isNaN(Number(props.id)) ? props.id : "");
		const onMapReady = inject("onMapReady");
		const updateMarkerLabelStyle = useMarkerLabelStyle(id);
		let marker;
		function removeMarker() {
			if (marker) {
				if (marker.label && "setMap" in marker.label) marker.label.setMap(null);
				if (marker.callout) removeMarkerCallout(marker.callout);
				marker.setMap(null);
			}
		}
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
					let h;
					let top;
					let x = typeof anchor.x === "number" ? anchor.x : .5;
					let y = typeof anchor.y === "number" ? anchor.y : 1;
					if (option.iconPath && (option.width || option.height)) {
						w = option.width || img.width / img.height * option.height;
						h = option.height || img.height / img.width * option.width;
					} else {
						w = img.width / 2;
						h = img.height / 2;
					}
					imgHeight = h;
					top = h - (h - y * h);
					if ("MarkerImage" in maps) icon = new maps.MarkerImage(img.src, null, null, new maps.Point(x * w, y * h), new maps.Size(w, h));
					else if ("Icon" in maps) icon = new maps.Icon({
						image: img.src,
						size: new maps.Size(w, h),
						imageSize: new maps.Size(w, h),
						imageOffset: new maps.Pixel(x * w, y * h)
					});
					else icon = {
						url: img.src,
						anchor: new maps.Point(x, y),
						size: new maps.Size(w, h)
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
								if (id !== "") trigger("callouttap", {}, { markerId: Number(id) });
							};
							callout = marker.callout = new maps.Callout(calloutStyle, callback);
						} else {
							callout = marker.callout = new maps.Callout(calloutStyle);
							callout.div.onclick = function($event) {
								if (id !== "") trigger("callouttap", $event, { markerId: Number(id) });
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
			function addMarker(props) {
				if (!getIsBMap()) marker = new maps.Marker({
					map,
					flat: true,
					autoRotation: false
				});
				updateMarker(props);
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
					if (id) trigger("markertap", {}, {
						markerId: Number(id),
						latitude: props.latitude,
						longitude: props.longitude
					});
				});
			}
			addMarker(props);
			watch(props, updateMarker);
		});
		if (id) {
			const addMapChidlContext = inject("addMapChidlContext");
			const removeMapChidlContext = inject("removeMapChidlContext");
			const context = {
				id,
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
						const movingEvent = MapsEvent.addListener(marker, "moving", (e) => {
							const latLng = e.latLng;
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
							if (isFunction(cb)) cb();
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
			};
			addMapChidlContext(context);
			onUnmounted(() => removeMapChidlContext(context));
		}
		onUnmounted(removeMarker);
		return () => {
			return null;
		};
	}
});
var MapPolyline_default = /*#__PURE__*/ defineSystemComponent({
	name: "MapPolyline",
	props: {
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
	},
	setup(props) {
		const onMapReady = inject("onMapReady");
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
			addPolyline(props);
			watch(props, updatePolyline);
		});
		onUnmounted(removePolyline);
		return () => {
			return null;
		};
	}
});
var MapCircle_default = /*#__PURE__*/ defineSystemComponent({
	name: "MapCircle",
	props: {
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
	},
	setup(props) {
		const onMapReady = inject("onMapReady");
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
			addCircle(props);
			watch(props, updateCircle);
		});
		onUnmounted(removeCircle);
		return () => {
			return null;
		};
	}
});
var MapControl_default = /*#__PURE__*/ defineSystemComponent({
	name: "MapControl",
	props: {
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
	},
	setup(props) {
		const imgPath = computed(() => getRealPath(props.iconPath));
		const positionStyle = computed(() => {
			let positionStyle = `top:${props.position.top || 0}px;left:${props.position.left || 0}px;`;
			if (props.position.width) positionStyle += `width:${props.position.width}px;`;
			if (props.position.height) positionStyle += `height:${props.position.height}px;`;
			return positionStyle;
		});
		const handleClick = ($event) => {
			if (props.clickable) props.trigger("controltap", $event, { controlId: props.id });
		};
		return () => {
			return createVNode("div", { "class": "uni-map-control" }, [createVNode("img", {
				"src": imgPath.value,
				"style": positionStyle.value,
				"class": "uni-map-control-icon",
				"onClick": handleClick
			}, null, 12, ["src", "onClick"])]);
		};
	}
});
//#endregion
//#region src/service/api/context/createInnerAudioContext.ts
var initInnerAudioContextEventOnce = /*#__PURE__*/ once(() => {
	innerAudioContextEventNames.forEach((eventName) => {
		InnerAudioContext.prototype[eventName] = function(callback) {
			if (isFunction(callback)) this._events[eventName].push(callback);
		};
	});
	innerAudioContextOffEventNames.forEach((eventName) => {
		InnerAudioContext.prototype[eventName] = function(callback) {
			var handle = this._events[eventName.replace("off", "on")];
			var index = handle.indexOf(callback);
			if (index >= 0) handle.splice(index, 1);
		};
	});
});
/**
* 音频上下文对象
*/
var InnerAudioContext = class {
	/**
	* 音频上下文初始化
	*/
	constructor() {
		this._src = "";
		var audio = this._audio = new Audio();
		this._stoping = false;
		[
			"src",
			"autoplay",
			"loop",
			"duration",
			"currentTime",
			"paused",
			"volume"
		].forEach((property) => {
			Object.defineProperty(this, property, {
				set: property === "src" ? (src) => {
					audio.src = getRealPath(src);
					this._src = src;
					return src;
				} : (val) => {
					audio[property] = val;
					return val;
				},
				get: property === "src" ? () => {
					return this._src;
				} : () => {
					return audio[property];
				}
			});
		});
		this.startTime = 0;
		Object.defineProperty(this, "obeyMuteSwitch", {
			set: () => false,
			get: () => false
		});
		Object.defineProperty(this, "buffered", { get() {
			var buffered = audio.buffered;
			if (buffered.length) return buffered.end(buffered.length - 1);
			else return 0;
		} });
		this._events = {};
		innerAudioContextEventNames.forEach((eventName) => {
			this._events[eventName] = [];
		});
		audio.addEventListener("loadedmetadata", () => {
			var startTime = Number(this.startTime) || 0;
			if (startTime > 0) audio.currentTime = startTime;
		});
		var stopEventNames = [
			"canplay",
			"pause",
			"seeking",
			"seeked",
			"timeUpdate"
		];
		stopEventNames.concat([
			"play",
			"ended",
			"error",
			"waiting"
		]).forEach((eventName) => {
			audio.addEventListener(eventName.toLowerCase(), () => {
				if (this._stoping && stopEventNames.indexOf(eventName) >= 0) return;
				const EventName = `on${eventName.slice(0, 1).toUpperCase()}${eventName.slice(1)}`;
				this._events[EventName].forEach((callback) => {
					callback();
				});
			}, false);
		});
		initInnerAudioContextEventOnce();
	}
	/**
	* 播放
	*/
	play() {
		this._stoping = false;
		this._audio.play();
	}
	/**
	* 暂停
	*/
	pause() {
		this._audio.pause();
	}
	/**
	* 停止
	*/
	stop() {
		this._stoping = true;
		this._audio.pause();
		this._audio.currentTime = 0;
		this._events.onStop.forEach((callback) => {
			callback();
		});
	}
	/**
	* 跳转到
	* @param {number} position
	*/
	seek(position) {
		this._stoping = false;
		position = Number(position);
		if (typeof position === "number" && !isNaN(position)) this._audio.currentTime = position;
	}
	/**
	* 销毁
	*/
	destroy() {
		this.stop();
	}
};
/**
* 创建音频上下文
*/
var createInnerAudioContext = /*#__PURE__*/ defineSyncApi(API_CREATE_INNER_AUDIO_CONTEXT, () => {
	return new InnerAudioContext();
});
//#endregion
//#region src/service/api/device/makePhoneCall.ts
var makePhoneCall = /*#__PURE__*/ defineAsyncApi(API_MAKE_PHONE_CALL, ({ phoneNumber }, { resolve }) => {
	window.location.href = `tel:${phoneNumber}`;
	return resolve();
}, MakePhoneCallProtocol);
//#endregion
//#region src/helpers/uuid.ts
var UUID_KEY = "__DC_STAT_UUID";
var storage = navigator.cookieEnabled && (window.localStorage || window.sessionStorage) || {};
var deviceId;
function uuid_default() {
	deviceId = deviceId || storage[UUID_KEY];
	if (!deviceId) {
		deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
		try {
			storage[UUID_KEY] = deviceId;
		} catch (error) {}
	}
	return deviceId;
}
//#endregion
//#region src/service/api/device/getWindowInfo.ts
var getWindowInfo = /*#__PURE__*/ defineSyncApi("getWindowInfo", () => {
	const pixelRatio = window.devicePixelRatio;
	const screenFix = getScreenFix();
	const landscape = isLandscape(screenFix);
	const screenWidth = getScreenWidth(screenFix, landscape);
	const screenHeight = getScreenHeight(screenFix, landscape);
	const windowWidth = getWindowWidth();
	let windowHeight = window.innerHeight;
	const statusBarHeight = import_out.default.top;
	const safeArea = {
		left: import_out.default.left,
		right: windowWidth - import_out.default.right,
		top: import_out.default.top,
		bottom: windowHeight - import_out.default.bottom,
		width: windowWidth - import_out.default.left - import_out.default.right,
		height: windowHeight - import_out.default.top - import_out.default.bottom
	};
	const { top: windowTop, bottom: windowBottom } = getWindowOffset();
	windowHeight -= windowTop;
	windowHeight -= windowBottom;
	return {
		windowTop,
		windowBottom,
		windowWidth,
		windowHeight,
		pixelRatio,
		screenWidth,
		screenHeight,
		statusBarHeight,
		safeArea,
		safeAreaInsets: {
			top: import_out.default.top,
			right: import_out.default.right,
			bottom: import_out.default.bottom,
			left: import_out.default.left
		},
		screenTop: screenHeight - windowHeight
	};
});
//#endregion
//#region src/service/api/device/getSystemInfoSync.ts
var browserInfo;
var _initBrowserInfo = true;
function initBrowserInfo() {
	if (!_initBrowserInfo) return;
	browserInfo = getBrowserInfo();
}
var getDeviceInfo = /*#__PURE__*/ defineSyncApi("getDeviceInfo", () => {
	initBrowserInfo();
	const { deviceBrand, deviceModel, brand, model, platform, system, deviceOrientation, deviceType, osname, osversion } = browserInfo;
	return extend({
		brand,
		deviceBrand,
		deviceModel,
		devicePixelRatio: window.devicePixelRatio,
		deviceId: uuid_default(),
		deviceOrientation,
		deviceType,
		model,
		osName: osname ? osname.toLowerCase() : void 0,
		osVersion: osversion,
		platform,
		system
	});
});
var getAppBaseInfo = /*#__PURE__*/ defineSyncApi("getAppBaseInfo", () => {
	initBrowserInfo();
	const { theme, language, browserName, browserVersion } = browserInfo;
	return extend({
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
		isUniAppX: true,
		language,
		SDKVersion: "",
		theme,
		uniPlatform: "web",
		uniCompileVersion: __uniConfig.compilerVersion,
		uniCompilerVersion: __uniConfig.compilerVersion,
		uniRuntimeVersion: __uniConfig.compilerVersion,
		version: ""
	}, {
		uniCompilerVersionCode: parseFloat(__uniConfig.compilerVersion),
		uniRuntimeVersionCode: parseFloat(__uniConfig.compilerVersion),
		uniRuntimeVersion: __uniConfig.compilerVersion
	});
});
/**
* 获取系统信息-同步
*/
var getSystemInfoSync = /*#__PURE__*/ defineSyncApi("getSystemInfoSync", () => {
	_initBrowserInfo = true;
	initBrowserInfo();
	_initBrowserInfo = false;
	const windowInfo = getWindowInfo();
	const deviceInfo = getDeviceInfo();
	const appBaseInfo = getAppBaseInfo();
	_initBrowserInfo = true;
	const { ua, browserName, browserVersion, osname, osversion } = browserInfo;
	const systemInfo = extend(windowInfo, deviceInfo, appBaseInfo, {
		browserName,
		browserVersion,
		fontSizeSetting: void 0,
		osName: osname.toLowerCase(),
		osVersion: osversion,
		osLanguage: void 0,
		osTheme: void 0,
		ua,
		uniPlatform: "web",
		uniCompileVersion: __uniConfig.compilerVersion,
		uniRuntimeVersion: __uniConfig.compilerVersion
	});
	delete systemInfo.screenTop;
	delete systemInfo.enableDebug;
	if (!__uniConfig.darkmode) delete systemInfo.theme;
	return systemInfo;
});
//#endregion
//#region src/service/api/device/getSystemInfo.ts
var getSystemInfo = /*#__PURE__*/ defineAsyncApi("getSystemInfo", (_args, { resolve }) => {
	return resolve(getSystemInfoSync());
});
//#endregion
//#region src/service/api/device/network.ts
var API_ON_NETWORK_STATUS_CHANGE = "onNetworkStatusChange";
var NONE = "none";
function networkListener() {
	getNetworkType().then(({ networkType }) => {
		UniServiceJSBridge.invokeOnCallback(API_ON_NETWORK_STATUS_CHANGE, {
			isConnected: networkType !== NONE,
			networkType
		});
	});
}
function getConnection() {
	return navigator.connection || navigator.webkitConnection || navigator.mozConnection;
}
var onNetworkStatusChange = /*#__PURE__*/ defineOnApi(API_ON_NETWORK_STATUS_CHANGE, () => {
	const connection = getConnection();
	if (connection) connection.addEventListener("change", networkListener);
	else {
		window.addEventListener("offline", networkListener);
		window.addEventListener("online", networkListener);
	}
});
var offNetworkStatusChange = /*#__PURE__*/ defineOffApi("offNetworkStatusChange", () => {
	const connection = getConnection();
	if (connection) connection.removeEventListener("change", networkListener);
	else {
		window.removeEventListener("offline", networkListener);
		window.removeEventListener("online", networkListener);
	}
});
var getNetworkType = /*#__PURE__*/ defineAsyncApi("getNetworkType", (_args, { resolve }) => {
	const connection = getConnection();
	let networkType = "unknown";
	if (connection) {
		const effectiveType = connection.effectiveType;
		networkType = connection.type;
		if (networkType === "cellular" && effectiveType) networkType = effectiveType.replace("slow-", "");
		else if ((!networkType || networkType === NONE) && effectiveType) networkType = effectiveType;
		else if (![NONE, "wifi"].includes(networkType)) networkType = "unknown";
	} else if (navigator.onLine === false) networkType = NONE;
	return resolve({ networkType });
});
//#endregion
//#region src/service/api/device/accelerometer.ts
var listener$1 = null;
var onAccelerometerChange = /*#__PURE__*/ defineOnApi(API_ON_ACCELEROMETER, () => {
	startAccelerometer();
});
var offAccelerometerChange = /*#__PURE__*/ defineOffApi(API_OFF_ACCELEROMETER, () => {
	stopAccelerometer();
});
var startAccelerometer = /*#__PURE__*/ defineAsyncApi(API_START_ACCELEROMETER, (_, { resolve, reject }) => {
	if (!window.DeviceMotionEvent) {
		reject();
		return;
	}
	function addEventListener() {
		listener$1 = function(event) {
			const acceleration = event.acceleration || event.accelerationIncludingGravity;
			UniServiceJSBridge.invokeOnCallback(API_ON_ACCELEROMETER, {
				x: acceleration && acceleration.x || 0,
				y: acceleration && acceleration.y || 0,
				z: acceleration && acceleration.z || 0
			});
		};
		window.addEventListener("devicemotion", listener$1, false);
	}
	if (!listener$1) {
		if (DeviceMotionEvent.requestPermission) {
			DeviceMotionEvent.requestPermission().then((res) => {
				if (res === "granted") {
					addEventListener();
					resolve();
				} else reject(`${res}`);
			}).catch((error) => {
				reject(`${error}`);
			});
			return;
		}
		addEventListener();
	}
	resolve();
});
var stopAccelerometer = /*#__PURE__*/ defineAsyncApi(API_STOP_ACCELEROMETER, (_, { resolve }) => {
	if (listener$1) {
		window.removeEventListener("devicemotion", listener$1, false);
		listener$1 = null;
	}
	resolve();
});
//#endregion
//#region src/service/api/device/compass.ts
var listener = null;
var onCompassChange = /*#__PURE__*/ defineOnApi(API_ON_COMPASS, () => {
	startCompass();
});
var offCompassChange = /*#__PURE__*/ defineOffApi(API_OFF_COMPASS, () => {
	stopCompass();
});
var startCompass = /*#__PURE__*/ defineAsyncApi(API_START_COMPASS, (_, { resolve, reject }) => {
	if (!window.DeviceOrientationEvent) {
		reject();
		return;
	}
	function addEventListener() {
		listener = function(event) {
			const direction = 360 - (event.alpha !== null ? event.alpha : 360);
			UniServiceJSBridge.invokeOnCallback(API_ON_COMPASS, { direction });
		};
		window.addEventListener("deviceorientation", listener, false);
	}
	if (!listener) {
		if (DeviceOrientationEvent.requestPermission) {
			DeviceOrientationEvent.requestPermission().then((res) => {
				if (res === "granted") {
					addEventListener();
					resolve();
				} else reject(`${res}`);
			}).catch((error) => {
				reject(`${error}`);
			});
			return;
		}
		addEventListener();
	}
	resolve();
});
var stopCompass = /*#__PURE__*/ defineAsyncApi(API_STOP_COMPASS, (_, { resolve }) => {
	if (listener) {
		window.removeEventListener("deviceorientation", listener, false);
		listener = null;
	}
	resolve();
});
//#endregion
//#region src/service/api/device/vibrate.ts
var _isSupport = !!window.navigator.vibrate;
var vibrateShort = /*#__PURE__*/ defineAsyncApi(API_VIBRATE_SHORT, (args, { resolve, reject }) => {
	if (_isSupport && window.navigator.vibrate(15)) resolve();
	else reject("vibrateShort:fail");
});
var vibrateLong = /*#__PURE__*/ defineAsyncApi(API_VIBRATE_LONG, (args, { resolve, reject }) => {
	if (_isSupport && window.navigator.vibrate(400)) resolve();
	else reject("vibrateLong:fail");
});
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(n, t, e, r, o, a, c) {
	try {
		var i = n[a](c), u = i.value;
	} catch (n) {
		e(n);
		return;
	}
	i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
	return function() {
		var t = this, e = arguments;
		return new Promise(function(r, o) {
			var a = n.apply(t, e);
			function _next(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
			}
			function _throw(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
			}
			_next(void 0);
		});
	};
}
//#endregion
//#region src/service/api/device/clipboard.ts
var getClipboardData = /*#__PURE__*/ defineAsyncApi(API_GET_CLIPBOARD_DATA, function() {
	var _ref = _asyncToGenerator(function* (_, { resolve, reject }) {
		initI18nGetClipboardDataMsgsOnce();
		const { t } = useI18n();
		try {
			resolve({ data: yield navigator.clipboard.readText() });
		} catch (error) {
			_getClipboardData(resolve, () => {
				reject(`${error} ${t("uni.getClipboardData.fail")}`);
			});
		}
	});
	return function(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());
var setClipboardData = /*#__PURE__*/ defineAsyncApi(API_SET_CLIPBOARD_DATA, function() {
	var _ref2 = _asyncToGenerator(function* ({ data }, { resolve, reject }) {
		try {
			yield navigator.clipboard.writeText(data);
			resolve();
		} catch (error) {
			_setClipboardData(data, resolve, reject);
		}
	});
	return function(_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}(), SetClipboardDataProtocol, SetClipboardDataOptions);
function _getClipboardData(resolve, reject) {
	const pasteText = document.getElementById("#clipboard");
	const data = pasteText ? pasteText.value : void 0;
	if (data) resolve({ data });
	else reject();
}
function _setClipboardData(data, resolve, reject) {
	const pasteText = document.getElementById("#clipboard");
	pasteText && pasteText.remove();
	const textarea = document.createElement("textarea");
	textarea.setAttribute("inputmode", "none");
	textarea.id = "#clipboard";
	textarea.style.position = "fixed";
	textarea.style.top = "-9999px";
	textarea.style.zIndex = "-9999";
	document.body.appendChild(textarea);
	textarea.value = data;
	textarea.select();
	textarea.setSelectionRange(0, textarea.value.length);
	const result = document.execCommand("Copy", false);
	textarea.blur();
	if (result) resolve();
	else reject();
}
//#endregion
//#region src/service/api/device/theme.ts
var themeChangeCallBack = (res) => {
	UniServiceJSBridge.invokeOnCallback(ON_THEME_CHANGE, res);
};
var onThemeChange = /*#__PURE__*/ defineOnApi(ON_THEME_CHANGE, () => {
	UniServiceJSBridge.on(ON_THEME_CHANGE, themeChangeCallBack);
});
var offThemeChange = /*#__PURE__*/ defineOffApi(OFF_THEME_CHANGE, () => {
	UniServiceJSBridge.off(ON_THEME_CHANGE, themeChangeCallBack);
});
var THEME_CALLBACK = [];
var onHostThemeChange = /*#__PURE__*/ defineSyncApi(ON_HOST_THEME_CHANGE, (callback) => {
	const onHostThemeChangeCallback = (res) => {
		callback({ hostTheme: res.theme });
	};
	const index = THEME_CALLBACK.push([callback, onHostThemeChangeCallback]) - 1;
	UniServiceJSBridge.on(ON_THEME_CHANGE, onHostThemeChangeCallback);
	return index;
});
var offHostThemeChange = /*#__PURE__*/ defineSyncApi(OFF_HOST_THEME_CHANGE, (callbackId) => {
	if (isFunction(callbackId)) callbackId = THEME_CALLBACK.findIndex(([callback]) => callback === callbackId);
	if (callbackId > -1) {
		const arr = THEME_CALLBACK.splice(callbackId, 1)[0];
		isArray(arr) && UniServiceJSBridge.off(ON_THEME_CHANGE, arr[1]);
	}
});
//#endregion
//#region src/service/api/storage/storage.ts
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
		const object = isString(value) ? JSON.parse(value) : value;
		const type = object.type;
		if (types.indexOf(type) >= 0) {
			const keys = Object.keys(object);
			if (keys.length === 2 && "data" in object) {
				if (typeof object.data === type) {
					if (type === "object") return UTS.JSON.parse(JSON.stringify(object.data));
					return object.data;
				}
				if (type === "object" && /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(object.data)) return new Date(object.data);
			} else if (keys.length === 1) return "";
		}
	} catch (error) {}
}
var setStorageSync = /*#__PURE__*/ defineSyncApi(API_SET_STORAGE_SYNC, (key, data) => {
	const type = typeof data;
	const value = type === "string" ? data : JSON.stringify({
		type,
		data
	});
	localStorage.setItem(key, value);
}, SetStorageSyncProtocol);
var setStorage = /*#__PURE__*/ defineAsyncApi(API_SET_STORAGE, ({ key, data }, { resolve, reject }) => {
	try {
		setStorageSync(key, data);
		resolve();
	} catch (error) {
		reject(error.message);
	}
}, SetStorageProtocol);
function getStorageOrigin(key) {
	const value = localStorage && localStorage.getItem(key);
	if (!isString(value)) throw new Error("data not found");
	let data = value;
	try {
		const result = parseValue(JSON.parse(value));
		if (result !== void 0) data = result;
	} catch (error) {}
	return data;
}
var getStorageSync = /*#__PURE__*/ defineSyncApi(API_GET_STORAGE_SYNC, (key) => {
	try {
		return getStorageOrigin(key);
	} catch (error) {
		return "";
	}
}, GetStorageSyncProtocol);
var getStorage = /*#__PURE__*/ defineAsyncApi(API_GET_STORAGE, ({ key }, { resolve, reject }) => {
	try {
		resolve({ data: getStorageOrigin(key) });
	} catch (error) {
		reject(error.message);
	}
}, GetStorageProtocol);
var removeStorageSync = /*#__PURE__*/ defineSyncApi(API_REMOVE_STORAGE, (key) => {
	if (localStorage) localStorage.removeItem(key);
}, RemoveStorageSyncProtocol);
var removeStorage = /*#__PURE__*/ defineAsyncApi(API_REMOVE_STORAGE, ({ key }, { resolve }) => {
	removeStorageSync(key);
	resolve();
}, RemoveStorageProtocol);
var clearStorageSync = /*#__PURE__*/ defineSyncApi("clearStorageSync", () => {
	if (localStorage) localStorage.clear();
});
var clearStorage = /*#__PURE__*/ defineAsyncApi("clearStorage", (_, { resolve }) => {
	clearStorageSync();
	resolve();
});
var getStorageInfoSync = /*#__PURE__*/ defineSyncApi("getStorageInfoSync", () => {
	const length = localStorage && localStorage.length || 0;
	const keys = [];
	let currentSize = 0;
	for (let index = 0; index < length; index++) {
		const key = localStorage.key(index);
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
var getStorageInfo = /*#__PURE__*/ defineAsyncApi("getStorageInfo", (_, { resolve }) => {
	resolve(getStorageInfoSync());
});
//#endregion
//#region src/service/api/file/getFileInfo.ts
var getFileInfo = /*#__PURE__*/ defineAsyncApi(API_GET_FILE_INFO, ({ filePath }, { resolve, reject }) => {
	urlToFile(filePath).then((res) => {
		resolve({ size: res.size });
	}).catch((err) => {
		reject(String(err));
	});
}, GetFileInfoProtocol, GetFileInfoOptions);
//#endregion
//#region src/service/api/file/openDocument.ts
var openDocument = /*#__PURE__*/ defineAsyncApi(API_OPEN_DOCUMENT, ({ filePath }, { resolve }) => {
	window.open(filePath);
	return resolve();
}, OpenDocumentProtocol, OpenDocumentOptions);
//#endregion
//#region src/service/api/keyboard/keyboard.ts
var hideKeyboard = /*#__PURE__*/ defineAsyncApi(API_HIDE_KEYBOARD, (args, { resolve, reject }) => {
	const activeElement = document.activeElement;
	if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "INPUT")) {
		activeElement.blur();
		resolve();
	}
});
//#endregion
//#region src/service/api/media/getImageInfo.ts
function getServiceAddress() {
	return window.location.protocol + "//" + window.location.host;
}
var getImageInfo = /*#__PURE__*/ defineAsyncApi(API_GET_IMAGE_INFO, ({ src }, { resolve, reject }) => {
	const img = new Image();
	img.onload = function() {
		resolve({
			width: img.naturalWidth,
			height: img.naturalHeight,
			path: src.indexOf("/") === 0 ? getServiceAddress() + src : src
		});
	};
	img.onerror = function() {
		reject();
	};
	img.src = src;
}, GetImageInfoProtocol, GetImageInfoOptions);
//#endregion
//#region src/service/api/media/getVideoInfo.ts
var getVideoInfo = /*#__PURE__*/ defineAsyncApi(API_GET_VIDEO_INFO, ({ src }, { resolve, reject }) => {
	urlToFile(src, true).then((file) => {
		return file;
	}).catch(() => {
		return null;
	}).then((file) => {
		const video = document.createElement("video");
		if (video.onloadedmetadata !== void 0) {
			const handle = setTimeout(() => {
				video.onloadedmetadata = null;
				video.onerror = null;
				reject();
			}, src.startsWith("data:") || src.startsWith("blob:") ? 300 : 3e3);
			video.onloadedmetadata = function() {
				clearTimeout(handle);
				video.onerror = null;
				resolve({
					size: Math.ceil((file ? file.size : 0) / 1024),
					duration: video.duration || 0,
					width: video.videoWidth || 0,
					height: video.videoHeight || 0
				});
			};
			video.onerror = function() {
				clearTimeout(handle);
				video.onloadedmetadata = null;
				reject();
			};
			video.src = src;
		} else reject();
	});
}, GetVideoInfoProtocol, GetVideoInfoOptions);
//#endregion
//#region src/service/api/media/MIMEType.ts
var MIMEType = {
	/**
	* 关于图片常见的MIME类型
	*/
	image: {
		jpg: "jpeg",
		jpe: "jpeg",
		pbm: "x-portable-bitmap",
		pgm: "x-portable-graymap",
		pnm: "x-portable-anymap",
		ppm: "x-portable-pixmap",
		psd: "vnd.adobe.photoshop",
		pic: "x-pict",
		rgb: "x-rgb",
		svg: "svg+xml",
		svgz: "svg+xml",
		tif: "tiff",
		xif: "vnd.xiff",
		wbmp: "vnd.wap.wbmp",
		wdp: "vnd.ms-photo",
		xbm: "x-xbitmap",
		ico: "x-icon"
	},
	/**
	* 关于视频常见的MIME类型
	*/
	video: {
		"3g2": "3gpp2",
		"3gp": "3gpp",
		avi: "x-msvideo",
		f4v: "x-f4v",
		flv: "x-flv",
		jpgm: "jpm",
		jpgv: "jpeg",
		m1v: "mpeg",
		m2v: "mpeg",
		mpe: "mpeg",
		mpg: "mpeg",
		mpg4: "mpeg",
		m4v: "x-m4v",
		mkv: "x-matroska",
		mov: "quicktime",
		qt: "quicktime",
		movie: "x-sgi-movie",
		mp4v: "mp4",
		ogv: "ogg",
		smv: "x-smv",
		wm: "x-ms-wm",
		wmv: "x-ms-wmv",
		wmx: "x-ms-wmx",
		wvx: "x-ms-wvx"
	}
};
//#endregion
//#region src/service/api/media/createInput.ts
var ALL = "all";
function isWXEnv() {
	const matchUA = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
	return !!(matchUA && matchUA[0] === "micromessenger");
}
function createInput_default({ count, sourceType, type, extension }) {
	addInteractListener();
	const inputEl = document.createElement("input");
	inputEl.type = "file";
	updateElementStyle(inputEl, {
		position: "absolute",
		visibility: "hidden",
		zIndex: "-999",
		width: "0",
		height: "0",
		top: "0",
		left: "0"
	});
	/**
	* 选择文件
	* chooseFile 使用后缀名
	* chooseImage、chooseVideo 使用MIME类型
	*/
	inputEl.accept = extension.map((item) => {
		if (type !== ALL) {
			const MIMEKey = item.replace(".", "");
			return `${type}/${MIMEType[type][MIMEKey] || MIMEKey}`;
		} else {
			if (isWXEnv()) return ".";
			return item.indexOf(".") === 0 ? item : `.${item}`;
		}
	}).join(",");
	if (count && count > 1) inputEl.multiple = true;
	if (type !== ALL && sourceType instanceof Array && sourceType.length === 1 && sourceType[0] === "camera") inputEl.setAttribute("capture", "camera");
	return inputEl;
}
//#endregion
//#region src/service/api/media/chooseFile.ts
var fileInput = null;
var chooseFile = /*#__PURE__*/ defineAsyncApi(API_CHOOSE_FILE, ({ count, sourceType, type, extension }, { resolve, reject }) => {
	initI18nChooseFileMsgsOnce();
	const { t } = useI18n();
	if (fileInput) {
		document.body.removeChild(fileInput);
		fileInput = null;
	}
	fileInput = createInput_default({
		count,
		sourceType,
		type,
		extension
	});
	document.body.appendChild(fileInput);
	fileInput.addEventListener("cancel", () => {
		reject("chooseFile:fail cancel");
	});
	fileInput.addEventListener("change", function(event) {
		const eventTarget = event.target;
		const tempFiles = [];
		if (eventTarget && eventTarget.files) {
			const fileCount = eventTarget.files.length;
			for (let i = 0; i < fileCount; i++) {
				const file = eventTarget.files[i];
				let filePath;
				Object.defineProperty(file, "path", { get() {
					filePath = filePath || fileToUrl(file);
					return filePath;
				} });
				if (i < count) tempFiles.push(file);
			}
		}
		resolve({
			get tempFilePaths() {
				return tempFiles.map(({ path }) => path);
			},
			tempFiles
		});
	});
	fileInput.click();
	if (!getInteractStatus()) console.warn(t("uni.chooseFile.notUserActivation"));
}, ChooseFileProtocol, ChooseFileOptions);
//#endregion
//#region src/service/api/media/chooseImage.ts
var imageInput = null;
var chooseImage = /*#__PURE__*/ defineAsyncApi(API_CHOOSE_IMAGE, ({ count, sourceType, extension }, { resolve, reject }) => {
	initI18nChooseFileMsgsOnce();
	const { t } = useI18n();
	if (imageInput) {
		document.body.removeChild(imageInput);
		imageInput = null;
	}
	imageInput = createInput_default({
		count,
		sourceType,
		extension,
		type: "image"
	});
	document.body.appendChild(imageInput);
	imageInput.addEventListener("cancel", () => {
		reject("chooseImage:fail cancel");
	});
	imageInput.addEventListener("change", function(event) {
		const eventTarget = event.target;
		const tempFiles = [];
		if (eventTarget && eventTarget.files) {
			const fileCount = eventTarget.files.length;
			for (let i = 0; i < fileCount; i++) {
				const file = eventTarget.files[i];
				let filePath;
				Object.defineProperty(file, "path", { get() {
					filePath = filePath || fileToUrl(file);
					return filePath;
				} });
				if (i < count) tempFiles.push(file);
			}
		}
		resolve({
			get tempFilePaths() {
				return tempFiles.map(({ path }) => path);
			},
			tempFiles
		});
	});
	imageInput.click();
	if (!getInteractStatus()) console.warn(t("uni.chooseFile.notUserActivation"));
}, ChooseImageProtocol, ChooseImageOptions);
//#endregion
//#region src/helpers/usePreventScroll.ts
var index = 0;
var overflow = "";
function preventScroll(prevent) {
	let before = index;
	index += prevent ? 1 : -1;
	index = Math.max(0, index);
	if (index > 0) {
		if (before === 0) {
			overflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";
		}
	} else {
		document.body.style.overflow = overflow;
		overflow = "";
	}
}
function usePreventScroll() {
	onMounted(() => preventScroll(true));
	onUnmounted(() => preventScroll(false));
}
var ImageView_default = /*#__PURE__*/ defineSystemComponent({
	name: "ImageView",
	props: { src: {
		type: String,
		default: ""
	} },
	setup(props) {
		const state = reactive({ direction: "none" });
		let scale = 1;
		let imgWidth = 0;
		let imgHeight = 0;
		let width = 0;
		let height = 0;
		function onScale({ detail }) {
			scale = detail.scale;
		}
		function onImgLoad(event) {
			const rect = event.target.getBoundingClientRect();
			imgWidth = rect.width;
			imgHeight = rect.height;
		}
		function onTouchStart(event) {
			const rect = event.target.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
			checkDirection(event);
		}
		function onTouchEnd(event) {
			const horizontal = scale * imgWidth > width;
			const vertical = scale * imgHeight > height;
			if (horizontal && vertical) state.direction = "all";
			else if (horizontal) state.direction = "horizontal";
			else if (vertical) state.direction = "vertical";
			else state.direction = "none";
			checkDirection(event);
		}
		function checkDirection(event) {
			if (state.direction === "all" || state.direction === "horizontal") event.stopPropagation();
		}
		return () => {
			const viewStyle = {
				position: "absolute",
				left: "0",
				top: "0",
				width: "100%",
				height: "100%"
			};
			return createVNode(movable_area_default, {
				"style": viewStyle,
				"onTouchstart": withWebEvent(onTouchStart),
				"onTouchmove": withWebEvent(checkDirection),
				"onTouchend": withWebEvent(onTouchEnd)
			}, { default: () => [createVNode(movable_view_default, {
				"style": viewStyle,
				"direction": state.direction,
				"inertia": true,
				"scale": true,
				"scale-min": "1",
				"scale-max": "4",
				"onScale": onScale
			}, { default: () => [createVNode("img", {
				"src": props.src,
				"style": {
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
					maxHeight: "100%",
					maxWidth: "100%"
				},
				"onLoad": onImgLoad
			}, null, 40, ["src", "onLoad"])] }, 8, [
				"style",
				"direction",
				"inertia",
				"scale",
				"onScale"
			])] }, 8, [
				"style",
				"onTouchstart",
				"onTouchmove",
				"onTouchend"
			]);
		};
	}
});
//#endregion
//#region src/service/api/media/previewImage/ImagePreview.tsx
function _isSlot$1(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var props$5 = {
	urls: {
		type: Array,
		default() {
			return [];
		}
	},
	current: {
		type: [Number, String],
		default: 0
	}
};
function getIndex(props) {
	let index = typeof props.current === "number" ? props.current : props.urls.indexOf(props.current);
	index = index < 0 ? 0 : index;
	return index;
}
var ImagePreview_default = /*#__PURE__*/ defineSystemComponent({
	name: "ImagePreview",
	props: props$5,
	emits: ["close"],
	setup(props, { emit }) {
		usePreventScroll();
		const { key } = useKeyboard();
		const rootRef = ref(null);
		const indexRef = ref(getIndex(props));
		watch(() => props.current, () => indexRef.value = getIndex(props));
		watch(() => key.value, (value) => {
			if (value === "esc") onClick();
		});
		let preventDefault;
		onMounted(() => {
			const el = rootRef.value;
			const MAX_MOVE = 20;
			let x = 0;
			let y = 0;
			el.addEventListener("mousedown", (event) => {
				preventDefault = false;
				x = event.clientX;
				y = event.clientY;
			});
			el.addEventListener("mouseup", (event) => {
				if (Math.abs(event.clientX - x) > MAX_MOVE || Math.abs(event.clientY - y) > MAX_MOVE) preventDefault = true;
			});
		});
		function onClick() {
			if (!preventDefault) nextTick(() => {
				emit("close");
			});
		}
		function onChange(event) {
			indexRef.value = event.detail.current;
		}
		const closeBtnStyle = {
			position: "absolute",
			"box-sizing": "border-box",
			top: "0",
			right: "0",
			width: "60px",
			height: "44px",
			padding: "6px",
			"line-height": "32px",
			"font-size": "26px",
			color: "white",
			"text-align": "center",
			cursor: "pointer"
		};
		return () => {
			let _slot;
			return createVNode("div", {
				"ref": rootRef,
				"style": {
					display: "block",
					position: "fixed",
					left: "0",
					top: "0",
					width: "100%",
					height: "100%",
					zIndex: 999,
					background: "rgba(0,0,0,0.8)"
				},
				"onClick": onClick
			}, [createVNode(swiper_default, {
				"navigation": "auto",
				"current": indexRef.value,
				"onChange": onChange,
				"indicator-dots": false,
				"autoplay": false,
				"style": {
					position: "absolute",
					left: "0",
					top: "0",
					width: "100%",
					height: "100%"
				}
			}, _isSlot$1(_slot = props.urls.map((src) => createVNode(swiper_item_default, null, { default: () => [createVNode(ImageView_default, { "src": src }, null, 8, ["src"])] }))) ? _slot : {
				default: () => [_slot],
				_: 1
			}, 8, ["current", "onChange"]), createVNode("div", { "style": closeBtnStyle }, [createSvgIconVNode(ICON_PATH_CLOSE, "#ffffff", 26)], 4)], 8, ["onClick"]);
		};
	}
});
//#endregion
//#region src/service/api/media/previewImage/index.ts
var state$1 = null;
var imagePreviewInstance;
var closePreviewImageView = () => {
	state$1 = null;
	nextTick(() => {
		imagePreviewInstance === null || imagePreviewInstance === void 0 || imagePreviewInstance.unmount();
		imagePreviewInstance = null;
	});
};
var previewImage = /*#__PURE__*/ defineAsyncApi(API_PREVIEW_IMAGE, (args, { resolve }) => {
	if (!state$1) {
		state$1 = reactive(args);
		nextTick(() => {
			imagePreviewInstance = createRootApp(ImagePreview_default, state$1, closePreviewImageView);
			imagePreviewInstance.mount(ensureRoot("u-a-p"));
		});
	} else extend(state$1, args);
	resolve();
}, PreviewImageProtocol, PreviewImageOptions);
var closePreviewImage = /*#__PURE__*/ defineAsyncApi(API_CLOSE_PREVIEW_IMAGE, (_, { resolve, reject }) => {
	if (imagePreviewInstance) {
		closePreviewImageView();
		resolve();
	} else reject();
});
//#endregion
//#region src/service/api/media/chooseVideo.ts
var videoInput = null;
var chooseVideo = /*#__PURE__*/ defineAsyncApi(API_CHOOSE_VIDEO, ({ sourceType, extension }, { resolve, reject }) => {
	initI18nChooseFileMsgsOnce();
	const { t } = useI18n();
	if (videoInput) {
		document.body.removeChild(videoInput);
		videoInput = null;
	}
	videoInput = createInput_default({
		sourceType,
		extension,
		type: "video"
	});
	document.body.appendChild(videoInput);
	videoInput.addEventListener("cancel", () => {
		reject("chooseVideo:fail cancel");
	});
	videoInput.addEventListener("change", function(event) {
		const file = event.target.files[0];
		let filePath = "";
		const callbackResult = {
			tempFilePath: filePath,
			tempFile: file,
			size: file.size,
			duration: 0,
			width: 0,
			height: 0,
			name: file.name
		};
		Object.defineProperty(callbackResult, "tempFilePath", { get() {
			filePath = filePath || fileToUrl(this.tempFile);
			return filePath;
		} });
		const video = document.createElement("video");
		if (video.onloadedmetadata !== void 0) {
			const filePath = fileToUrl(file);
			video.onloadedmetadata = function() {
				revokeObjectURL(filePath);
				resolve(extend(callbackResult, {
					duration: video.duration || 0,
					width: video.videoWidth || 0,
					height: video.videoHeight || 0
				}));
			};
			setTimeout(() => {
				video.onloadedmetadata = null;
				revokeObjectURL(filePath);
				resolve(callbackResult);
			}, 300);
			video.src = filePath;
		} else resolve(callbackResult);
	});
	videoInput.click();
	if (!getInteractStatus()) console.warn(t("uni.chooseFile.notUserActivation"));
}, ChooseVideoProtocol, ChooseVideoOptions);
//#endregion
//#region src/service/api/network/request.ts
var request = /*#__PURE__*/ defineTaskApi(API_REQUEST, ({ url, data, header = {}, method, dataType, responseType, enableChunked, withCredentials, timeout = __uniConfig.networkTimeout.request }, { resolve, reject }) => {
	timeout = timeout == null ? __uniConfig.networkTimeout.request : timeout;
	let body = null;
	const contentType = normalizeContentType(header);
	if (method !== "GET") if (isString(data) || data instanceof ArrayBuffer) body = data;
	else if (contentType === "json") try {
		body = JSON.stringify(data);
	} catch (error) {
		body = data.toString();
	}
	else if (contentType === "urlencoded") {
		const bodyArray = [];
		for (const key in data) if (hasOwn(data, key)) bodyArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
		body = bodyArray.join("&");
	} else body = data.toString();
	let requestTask;
	if (!enableChunked) {
		const xhr = new XMLHttpRequest();
		requestTask = new RequestTask(xhr);
		xhr.open(method, url);
		for (const key in header) if (hasOwn(header, key)) xhr.setRequestHeader(key, header[key]);
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
			if (responseType === "text") res = parseResponseText(res, responseType, dataType);
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
			const header = response.headers;
			const body = response.body;
			const headerObj = {};
			header.forEach((value, key) => {
				headerObj[key] = value;
			});
			const cookies = cookiesParse(headerObj);
			requestTask._emitter.emit("headersReceived", {
				header: headerObj,
				statusCode,
				cookies
			});
			if (!body) {
				resolve({
					data: "",
					statusCode,
					header: headerObj,
					cookies
				});
				return;
			}
			const reader = body.getReader();
			const bodyBuffers = [];
			const streamReaderRead = () => {
				reader.read().then(({ done, value }) => {
					if (done) {
						const result = concatArrayBuffers(bodyBuffers);
						let res = responseType === "text" ? new TextDecoder().decode(result) : result;
						if (responseType === "text") res = parseResponseText(res, responseType, dataType);
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
	const name = Object.keys(header).find((name) => name.toLowerCase() === "content-type");
	if (!name) return;
	const contentType = header[name];
	if (!contentType) return "string";
	if (contentType.indexOf("application/json") === 0) return "json";
	else if (contentType.indexOf("application/x-www-form-urlencoded") === 0) return "urlencoded";
	return "string";
}
/**
* 请求任务类
*/
var RequestTask = class {
	constructor(controller) {
		this._requestOnChunkReceiveCallbackId = 0;
		this._requestOnChunkReceiveCallbacks = /* @__PURE__ */ new Map();
		this._requestOnHeadersReceiveCallbackId = 0;
		this._requestOnHeadersReceiveCallbacks = /* @__PURE__ */ new Map();
		this._emitter = new Emitter();
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
			this._requestOnHeadersReceiveCallbacks.forEach((cb, id) => {
				if (cb === callback) {
					this._requestOnHeadersReceiveCallbacks.delete(id);
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
			this._requestOnChunkReceiveCallbacks.forEach((cb, id) => {
				if (cb === callback) {
					this._requestOnChunkReceiveCallbacks.delete(id);
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
/**
* 解析响应头
* @param {string} headers
* @return {object}
*/
function parseHeaders(headers) {
	const headersObject = {};
	headers.split(LINEFEED).forEach((header) => {
		const find = header.match(/(\S+\s*):\s*(.*)/);
		if (!find || find.length !== 3) return;
		headersObject[find[1]] = find[2];
	});
	return headersObject;
}
function parseResponseText(responseText, responseType, dataType) {
	let res = responseText;
	if (responseType === "text" && dataType === "json") try {
		res = UTS.JSON.parse(res) || res;
	} catch (error) {}
	return res;
}
//#endregion
//#region src/service/api/network/downloadFile.ts
/**
* 下载任务
*/
var DownloadTask = class {
	constructor(xhr) {
		this._callbacks = [];
		this._xhr = xhr;
	}
	/**
	* 监听下载进度
	* @param {Function} callback 回调
	*/
	onProgressUpdate(callback) {
		if (!isFunction(callback)) return;
		this._callbacks.push(callback);
	}
	offProgressUpdate(callback) {
		const index = this._callbacks.indexOf(callback);
		if (index >= 0) this._callbacks.splice(index, 1);
	}
	/**
	* 停止任务
	*/
	abort() {
		if (this._xhr) {
			this._xhr.abort();
			delete this._xhr;
		}
	}
	onHeadersReceived(callback) {
		throw new Error("Method not implemented.");
	}
	offHeadersReceived(callback) {
		throw new Error("Method not implemented.");
	}
};
/**
* 下载文件
* @param {*} param0
* @param {string} callbackId
* @return {DownloadTask}
*/
var downloadFile = /*#__PURE__*/ defineTaskApi(API_DOWNLOAD_FILE, ({ url, header = {}, timeout = __uniConfig.networkTimeout.downloadFile }, { resolve, reject }) => {
	timeout = timeout == null ? __uniConfig.networkTimeout.downloadFile : timeout;
	var timer;
	var xhr = new XMLHttpRequest();
	var downloadTask = new DownloadTask(xhr);
	xhr.open("GET", url, true);
	Object.keys(header).forEach((key) => {
		xhr.setRequestHeader(key, header[key]);
	});
	xhr.responseType = "blob";
	xhr.onload = function() {
		clearTimeout(timer);
		const statusCode = xhr.status;
		const blob = this.response;
		let filename;
		const contentDisposition = xhr.getResponseHeader("content-disposition");
		if (contentDisposition) {
			const res = contentDisposition.match(/filename="?(\S+)"?\b/);
			if (res) filename = res[1];
		}
		blob.name = filename || getFileName(url);
		resolve({
			statusCode,
			tempFilePath: fileToUrl(blob)
		});
	};
	xhr.onabort = function() {
		clearTimeout(timer);
		reject("abort", { errCode: 600003 });
	};
	xhr.onerror = function() {
		clearTimeout(timer);
		reject("", { errCode: 602001 });
	};
	xhr.onprogress = function(event) {
		downloadTask._callbacks.forEach((callback) => {
			var totalBytesWritten = event.loaded;
			var totalBytesExpectedToWrite = event.total;
			callback({
				progress: Math.round(totalBytesWritten / totalBytesExpectedToWrite * 100),
				totalBytesWritten,
				totalBytesExpectedToWrite
			});
		});
	};
	xhr.send();
	timer = setTimeout(function() {
		xhr.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null;
		downloadTask.abort();
		reject("timeout", { errCode: 5 });
	}, timeout);
	return downloadTask;
}, DownloadFileProtocol, DownloadFileOptions);
//#endregion
//#region src/service/api/network/uploadFile.ts
/**
* 上传任务
*/
var UploadTask = class {
	constructor(xhr) {
		this._callbacks = [];
		this._xhr = xhr;
	}
	/**
	* 监听上传进度
	* @param callback 回调
	*/
	onProgressUpdate(callback) {
		if (!isFunction(callback)) return;
		this._callbacks.push(callback);
	}
	offProgressUpdate(callback) {
		const index = this._callbacks.indexOf(callback);
		if (index >= 0) this._callbacks.splice(index, 1);
	}
	/**
	* 中断上传任务
	*/
	abort() {
		this._isAbort = true;
		if (this._xhr) {
			this._xhr.abort();
			delete this._xhr;
		}
	}
	onHeadersReceived(callback) {
		throw new Error("Method not implemented.");
	}
	offHeadersReceived(callback) {
		throw new Error("Method not implemented.");
	}
};
var uploadFile = /*#__PURE__*/ defineTaskApi(API_UPLOAD_FILE, ({ url, file, filePath, name, files, header = {}, formData = {}, timeout = __uniConfig.networkTimeout.uploadFile }, { resolve, reject }) => {
	timeout = timeout == null ? __uniConfig.networkTimeout.uploadFile : timeout;
	var uploadTask = new UploadTask();
	if (!isArray(files) || !files.length) {
		if (!filePath) reject("file error");
		files = [{
			name,
			file,
			uri: filePath
		}];
	}
	function upload(realFiles) {
		var xhr = new XMLHttpRequest();
		var form = new FormData();
		var timer;
		Object.keys(formData).forEach((key) => {
			form.append(key, formData[key]);
		});
		Object.values(files).forEach(({ name }, index) => {
			const file = realFiles[index];
			form.append(name || "file", file, file.name || `file-${Date.now()}`);
		});
		xhr.open("POST", url);
		Object.keys(header).forEach((key) => {
			xhr.setRequestHeader(key, header[key]);
		});
		xhr.upload.onprogress = function(event) {
			uploadTask._callbacks.forEach((callback) => {
				var totalBytesSent = event.loaded;
				var totalBytesExpectedToSend = event.total;
				callback({
					progress: Math.round(totalBytesSent / totalBytesExpectedToSend * 100),
					totalBytesSent,
					totalBytesExpectedToSend
				});
			});
		};
		xhr.onerror = function() {
			clearTimeout(timer);
			reject("", { errCode: 602001 });
		};
		xhr.onabort = function() {
			clearTimeout(timer);
			reject("abort", { errCode: 600003 });
		};
		xhr.onload = function() {
			clearTimeout(timer);
			const statusCode = xhr.status;
			const responseHeaders = xhr.getAllResponseHeaders();
			const header = responseHeaders ? responseHeaders.trim().split(/[\r\n]+/).reduce((acc, line) => {
				const parts = line.split(": ");
				const header = parts.shift();
				acc[header] = parts.join(": ");
				return acc;
			}, {}) : {};
			resolve({
				statusCode,
				data: xhr.responseText || xhr.response,
				header
			});
		};
		if (!uploadTask._isAbort) {
			timer = setTimeout(function() {
				xhr.upload.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null;
				uploadTask.abort();
				reject("timeout", { errCode: 5 });
			}, timeout);
			xhr.send(form);
			uploadTask._xhr = xhr;
		} else reject("abort", { errCode: 600003 });
	}
	Promise.all(files.map(({ file, uri }) => file instanceof Blob ? Promise.resolve(blobToFile(file)) : urlToFile(uri))).then(upload).catch(() => {
		setTimeout(() => {
			reject("file error");
		}, 0);
	});
	return uploadTask;
}, UploadFileProtocol, UploadFileOptions);
//#endregion
//#region src/service/api/network/socket.ts
var socketTasks = [];
var globalEvent = {
	open: "",
	close: "",
	error: "",
	message: ""
};
var SocketTask = class {
	/**
	* 构造函数
	* @param {string} url
	* @param {Array} protocols
	*/
	constructor(url, protocols, callback) {
		this._callbacks = {
			open: [],
			close: [],
			error: [],
			message: []
		};
		let error;
		try {
			const webSocket = this._webSocket = new WebSocket(url, protocols);
			webSocket.binaryType = "arraybuffer";
			[
				"open",
				"close",
				"error",
				"message"
			].forEach((name) => {
				this._callbacks[name] = [];
				webSocket.addEventListener(name, (event) => {
					const { data, code, reason } = event;
					const res = name === "message" ? { data } : name === "close" ? {
						code,
						reason
					} : {};
					this._callbacks[name].forEach((callback) => {
						try {
							callback(res);
						} catch (e) {
							console.error(`thirdScriptError\n${e};at socketTask.on${capitalize(name)} callback function\n`, e);
						}
					});
					if (this === socketTasks[0] && globalEvent[name]) UniServiceJSBridge.invokeOnCallback(globalEvent[name], res);
					if (name === "error" || name === "close") {
						const index = socketTasks.indexOf(this);
						if (index >= 0) socketTasks.splice(index, 1);
					}
				});
			});
			[
				"CLOSED",
				"CLOSING",
				"CONNECTING",
				"OPEN",
				"readyState"
			].forEach((property) => {
				Object.defineProperty(this, property, { get() {
					return webSocket[property];
				} });
			});
		} catch (e) {
			error = e;
		}
		callback && callback(error, this);
	}
	/**
	* 发送
	* @param {any} data
	*/
	send(options) {
		const data = (options || {}).data;
		const ws = this._webSocket;
		try {
			if (ws.readyState !== ws.OPEN) {
				callOptions(options, {
					errMsg: `sendSocketMessage:fail SocketTask.readyState is not OPEN`,
					errCode: 10002
				});
				throw new Error("SocketTask.readyState is not OPEN");
			}
			ws.send(data);
			callOptions(options, "sendSocketMessage:ok");
		} catch (error) {
			callOptions(options, {
				errMsg: `sendSocketMessage:fail ${error}`,
				errCode: 602001
			});
		}
	}
	/**
	* 关闭
	* @param {number} code
	* @param {string} reason
	*/
	close(options = {}) {
		const ws = this._webSocket;
		try {
			const code = options.code || 1e3;
			const reason = options.reason;
			if (isString(reason)) ws.close(code, reason);
			else ws.close(code);
			callOptions(options, "closeSocket:ok");
		} catch (error) {
			callOptions(options, `closeSocket:fail ${error}`);
		}
	}
	onOpen(callback) {
		this._callbacks.open.push(callback);
	}
	onMessage(callback) {
		this._callbacks.message.push(callback);
	}
	onError(callback) {
		this._callbacks.error.push(callback);
	}
	onClose(callback) {
		this._callbacks.close.push(callback);
	}
};
var connectSocket = /*#__PURE__*/ defineTaskApi(API_CONNECT_SOCKET, ({ url, protocols }, { resolve, reject }) => {
	return new SocketTask(url, protocols, (error, socketTask) => {
		if (error) {
			reject(error.toString(), { errCode: 600009 });
			return;
		}
		socketTasks.push(socketTask);
		resolve();
	});
}, ConnectSocketProtocol, ConnectSocketOptions);
function callSocketTask(socketTask, method, option, resolve, reject) {
	const fn = socketTask[method];
	if (isFunction(fn)) fn.call(socketTask, extend({}, option, {
		success() {
			resolve();
		},
		fail({ errMsg }) {
			reject(errMsg.replace("sendSocketMessage:fail ", ""));
		},
		complete: void 0
	}));
}
var sendSocketMessage = /*#__PURE__*/ defineAsyncApi(API_SEND_SOCKET_MESSAGE, (options, { resolve, reject }) => {
	const socketTask = socketTasks[0];
	if (socketTask && socketTask.readyState === socketTask.OPEN) callSocketTask(socketTask, "send", options, resolve, reject);
	else reject("WebSocket is not connected");
}, SendSocketMessageProtocol);
var closeSocket = /*#__PURE__*/ defineAsyncApi(API_CLOSE_SOCKET, (options, { resolve, reject }) => {
	const socketTask = socketTasks[0];
	if (socketTask) callSocketTask(socketTask, "close", options, resolve, reject);
	else reject("WebSocket is not connected");
}, CloseSocketProtocol);
function on(event) {
	const api = `onSocket${capitalize(event)}`;
	return /*#__PURE__*/ defineOnApi(api, () => {
		globalEvent[event] = api;
	});
}
var onSocketOpen = /*#__PURE__*/ on("open");
var onSocketError = /*#__PURE__*/ on("error");
var onSocketMessage = /*#__PURE__*/ on("message");
var onSocketClose = /*#__PURE__*/ on("close");
//#endregion
//#region src/service/api/location/getLocation.ts
var getLocation = /*#__PURE__*/ defineAsyncApi(API_GET_LOCATION, ({ type, altitude, highAccuracyExpireTime, isHighAccuracy }, { resolve, reject }) => {
	const mapInfo = getMapInfo();
	new Promise((resolve, reject) => {
		if (navigator.geolocation) navigator.geolocation.getCurrentPosition((res) => resolve({ coords: res.coords }), reject, {
			enableHighAccuracy: isHighAccuracy || altitude,
			timeout: highAccuracyExpireTime || 1e3 * 100
		});
		else reject(/* @__PURE__ */ new Error("device nonsupport geolocation"));
	}).catch((error) => {
		return new Promise((resolve, reject) => {
			if (mapInfo.type === MapType.QQ) getJSONP(`https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=${mapInfo.key}`, { callback: "callback" }, (res) => {
				if ("result" in res && res.result.location) {
					const location = res.result.location;
					resolve({
						coords: {
							latitude: location.lat,
							longitude: location.lng
						},
						skip: true
					});
				} else reject(new Error(res.message || JSON.stringify(res)));
			}, () => reject(/* @__PURE__ */ new Error("network error")));
			else if (mapInfo.type === MapType.GOOGLE) request({
				method: "POST",
				url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${mapInfo.key}`,
				success(res) {
					const data = res.data;
					if ("location" in data) resolve({
						coords: {
							latitude: data.location.lat,
							longitude: data.location.lng,
							accuracy: data.accuracy
						},
						skip: true
					});
					else reject(new Error(data.error && data.error.message || JSON.stringify(res)));
				},
				fail() {
					reject(/* @__PURE__ */ new Error("network error"));
				}
			});
			else if (mapInfo.type === MapType.AMAP) loadMaps([], () => {
				window.AMap.plugin("AMap.Geolocation", () => {
					new window.AMap.Geolocation({
						enableHighAccuracy: true,
						timeout: 1e4
					}).getCurrentPosition((status, data) => {
						if (status === "complete") resolve({
							coords: {
								latitude: data.position.lat,
								longitude: data.position.lng,
								accuracy: data.accuracy
							},
							skip: true
						});
						else reject(new Error(data.message));
					});
				});
			});
			else reject(error);
		});
	}).then(({ coords, skip }) => {
		translateCoordinateSystem(type, coords, skip).then((coords) => {
			resolve({
				latitude: coords.latitude,
				longitude: coords.longitude,
				accuracy: coords.accuracy,
				speed: coords.altitude || 0,
				altitude: coords.altitude || 0,
				verticalAccuracy: coords.altitudeAccuracy || 0,
				horizontalAccuracy: coords.accuracy || 0
			});
		}).catch((error) => {
			reject(error.message);
		});
	}).catch((error) => {
		reject(error.message || JSON.stringify(error));
	});
}, GetLocationProtocol, GetLocationOptions);
//#endregion
//#region src/service/api/location/openLocation/LocationView.tsx
var ICON_PATH_NAV = "M28 17c-6.49396875 0-12.13721875 2.57040625-15 6.34840625V5.4105l6.29859375 6.29859375c0.387875 0.387875 1.02259375 0.387875 1.4105 0 0.387875-0.387875 0.387875-1.02259375 0-1.4105L12.77853125 2.36803125a0.9978125 0.9978125 0 0 0-0.0694375-0.077125c-0.1944375-0.1944375-0.45090625-0.291375-0.70721875-0.290875l-0.00184375-0.0000625-0.00184375 0.0000625c-0.2563125-0.0005-0.51278125 0.09640625-0.70721875 0.290875a0.9978125 0.9978125 0 0 0-0.0694375 0.077125l-7.930625 7.9305625c-0.387875 0.387875-0.387875 1.02259375 0 1.4105 0.387875 0.387875 1.02259375 0.387875 1.4105 0L11 5.4105V29c0 0.55 0.45 1 1 1s1-0.45 1-1c0-5.52284375 6.71571875-10 15-10 0.55228125 0 1-0.44771875 1-1 0-0.55228125-0.44771875-1-1-1z";
var props$4 = {
	latitude: { type: Number },
	longitude: { type: Number },
	scale: {
		type: Number,
		default: 18
	},
	name: {
		type: String,
		default: ""
	},
	address: {
		type: String,
		default: ""
	}
};
function useState$1(props) {
	const state = reactive({
		center: {
			latitude: 0,
			longitude: 0
		},
		marker: {
			id: 1,
			latitude: 0,
			longitude: 0,
			iconPath: ICON_PATH_TARGET,
			width: 32,
			height: 52
		},
		location: {
			id: 2,
			latitude: 0,
			longitude: 0,
			iconPath: ICON_PATH_ORIGIN,
			width: 44,
			height: 44
		}
	});
	function updatePosition() {
		if (props.latitude && props.longitude) {
			state.center.latitude = props.latitude;
			state.center.longitude = props.longitude;
			state.marker.latitude = props.latitude;
			state.marker.longitude = props.longitude;
		}
	}
	watch([() => props.latitude, () => props.longitude], updatePosition);
	updatePosition();
	return state;
}
var LocationView_default = /*#__PURE__*/ defineSystemComponent({
	name: "LocationView",
	props: props$4,
	emits: ["close"],
	setup(props, { emit }) {
		const state = useState$1(props);
		usePreventScroll();
		getLocation({
			type: "gcj02",
			success: ({ latitude, longitude }) => {
				state.location.latitude = latitude;
				state.location.longitude = longitude;
			}
		});
		function onRegionChange(event) {
			const centerLocation = event.detail.centerLocation;
			if (centerLocation) {
				state.center.latitude = centerLocation.latitude;
				state.center.longitude = centerLocation.longitude;
			}
		}
		function nav() {
			const mapInfo = getMapInfo();
			let url = "";
			if (mapInfo.type === MapType.GOOGLE) url = `https://www.google.com/maps/dir/?api=1${state.location.latitude ? `&origin=${state.location.latitude}%2C${state.location.longitude}` : ""}&destination=${props.latitude}%2C${props.longitude}`;
			else if (mapInfo.type === MapType.QQ) url = `https://apis.map.qq.com/uri/v1/routeplan?type=drive${state.location.latitude ? `&fromcoord=${state.location.latitude}%2C${state.location.longitude}&from=${encodeURIComponent("我的位置")}` : ""}&tocoord=${props.latitude}%2C${props.longitude}&to=${encodeURIComponent(props.name || "目的地")}&ref=${mapInfo.key}`;
			else if (mapInfo.type === MapType.AMAP) url = `https://uri.amap.com/navigation?${state.location.latitude ? `from=${state.location.longitude},${state.location.latitude},${encodeURIComponent("我的位置")}&` : ""}to=${props.longitude},${props.latitude},${encodeURIComponent(props.name || "目的地")}`;
			window.open(url);
		}
		function back() {
			emit("close");
		}
		function setCenter({ latitude, longitude }) {
			state.center.latitude = latitude;
			state.center.longitude = longitude;
		}
		return () => {
			return createVNode("div", { "class": "uni-system-open-location" }, [
				createVNode(map_default, {
					"latitude": state.center.latitude,
					"longitude": state.center.longitude,
					"class": "map",
					"markers": [state.marker, state.location],
					"onRegionchange": onRegionChange
				}, { default: () => [createVNode("div", {
					"class": "map-move",
					"onClick": () => setCenter(state.location)
				}, [createSvgIconVNode(ICON_PATH_LOCTAION, "#000000", 24)], 8, ["onClick"])] }, 8, [
					"latitude",
					"longitude",
					"markers",
					"onRegionchange"
				]),
				createVNode("div", { "class": "info" }, [
					createVNode("div", {
						"class": "name",
						"onClick": () => setCenter(state.marker)
					}, [props.name], 8, ["onClick"]),
					createVNode("div", {
						"class": "address",
						"onClick": () => setCenter(state.marker)
					}, [props.address], 8, ["onClick"]),
					createVNode("div", {
						"class": "nav",
						"onClick": nav
					}, [createSvgIconVNode(ICON_PATH_NAV, "#ffffff", 26)], 8, ["onClick"])
				]),
				createVNode("div", {
					"class": "nav-btn-back",
					"onClick": back
				}, [createSvgIconVNode(ICON_PATH_BACK, "#ffffff", 26)], 8, ["onClick"])
			]);
		};
	}
});
//#endregion
//#region src/service/api/location/openLocation/index.ts
var state = null;
var openLocation = /*#__PURE__*/ defineAsyncApi(API_OPEN_LOCATION, (args, { resolve }) => {
	if (!state) {
		state = reactive(args);
		nextTick(() => {
			const app = createRootApp(LocationView_default, state, () => {
				state = null;
				nextTick(() => {
					app.unmount();
				});
			});
			app.mount(ensureRoot("u-a-o"));
		});
	} else extend(state, args);
	resolve();
}, OpenLocationProtocol, OpenLocationOptions);
//#endregion
//#region src/service/api/location/locationChange.ts
var started = false;
var watchId = 0;
var startLocationUpdate = /*#__PURE__*/ defineAsyncApi(API_START_LOCATION_UPDATE, (options, { resolve, reject }) => {
	if (!navigator.geolocation) {
		reject();
		return;
	}
	watchId = watchId || navigator.geolocation.watchPosition((res) => {
		started = true;
		translateCoordinateSystem(options === null || options === void 0 ? void 0 : options.type, res.coords).then((coords) => {
			UniServiceJSBridge.invokeOnCallback("onLocationChange", coords);
			resolve();
		}).catch((error) => {
			UniServiceJSBridge.invokeOnCallback("onLocationChangeError", { errMsg: `onLocationChange:fail ${error.message}` });
		});
	}, (error) => {
		if (!started) {
			reject(error.message);
			started = true;
		}
		UniServiceJSBridge.invokeOnCallback("onLocationChangeError", { errMsg: `onLocationChange:fail ${error.message}` });
	});
	setTimeout(resolve, 100);
}, StartLocationUpdateProtocol, StartLocationUpdateOptions);
var stopLocationUpdate = /*#__PURE__*/ defineAsyncApi(API_STOP_LOCATION_UPDATE, (_, { resolve }) => {
	if (watchId) {
		navigator.geolocation.clearWatch(watchId);
		started = false;
		watchId = 0;
	}
	resolve();
});
var onLocationChange = /*#__PURE__*/ defineOnApi(API_ON_LOCATION_CHANGE, () => {});
var offLocationChange = /*#__PURE__*/ defineOffApi(API_OFF_LOCATION_CHANGE, () => {});
var onLocationChangeError = /*#__PURE__*/ defineOnApi(API_ON_LOCATION_CHANGE_ERROR, () => {});
var offLocationChangeError = /*#__PURE__*/ defineOffApi(API_OFF_LOCATION_CHANGE_ERROR, () => {});
//#endregion
//#region src/service/api/route/navigateBack.ts
var navigateBack = /*#__PURE__*/ defineAsyncApi(API_NAVIGATE_BACK, (args, { resolve, reject }) => {
	let canBack = true;
	if (invokeHook(ON_BACK_PRESS, { from: args.from || "navigateBack" }) === true) canBack = false;
	{
		const currentPage = getCurrentPage();
		if (currentPage) {
			const dialogPages = currentPage.getDialogPages();
			if (dialogPages.length > 0) {
				const dialogPage = dialogPages[dialogPages.length - 1];
				if (invokeHook(dialogPage.vm, ON_BACK_PRESS, { from: args.from || "navigateBack" }) === true) canBack = false;
			}
		}
	}
	if (!canBack) return reject(ON_BACK_PRESS);
	getApp().vm.$router.go(-args.delta);
	return resolve();
}, NavigateBackProtocol, NavigateBackOptions);
//#endregion
//#region src/service/api/route/navigateTo.ts
var navigateTo = /*#__PURE__*/ defineAsyncApi(API_NAVIGATE_TO, ({ url, events, isAutomatedTesting }, { resolve, reject }) => {
	if (!entryPageState.handledBeforeEntryPageRoutes) {
		navigateToPagesBeforeEntryPages.push({
			args: {
				type: API_NAVIGATE_TO,
				url,
				events,
				isAutomatedTesting
			},
			resolve,
			reject
		});
		return;
	}
	return navigate({
		type: API_NAVIGATE_TO,
		url,
		events,
		isAutomatedTesting
	}).then(resolve).catch(reject);
}, NavigateToProtocol, NavigateToOptions);
//#endregion
//#region src/service/api/route/preloadPage.ts
var preloadPage = /*#__PURE__*/ defineAsyncApi(API_PRELOAD_PAGE, ({ url }, { resolve, reject }) => {
	const path = url.split("?")[0];
	const route = getRouteOptions(path);
	if (!route) {
		reject(`${url}`);
		return;
	}
	route.loader && route.loader().then(() => {
		resolve({
			url,
			errMsg: "preloadPage:ok"
		});
	}).catch((err) => {
		reject(`${url} ${String(err)}`);
	});
}, PreloadPageProtocol);
if (process.env.NODE_ENV !== "production" && !process.env.UNI_AUTOMATOR_WS_ENDPOINT) document.addEventListener("DOMContentLoaded", () => {
	console.log("Preload pages in uni-app-x development mode.");
	__uniRoutes.reduce((prev, route) => {
		return prev.then(() => {
			return new Promise((resolve) => {
				preloadPage({
					url: route.alias || route.path,
					complete() {
						setTimeout(() => {
							resolve();
						}, 200);
					}
				});
			});
		});
	}, Promise.resolve());
});
//#endregion
//#region src/service/api/ui/popup/toast.tsx
var props$3 = {
	title: {
		type: String,
		default: ""
	},
	icon: {
		default: "success",
		validator(value) {
			return SHOW_TOAST_ICON.indexOf(value) !== -1;
		}
	},
	image: {
		type: String,
		default: ""
	},
	duration: {
		type: Number,
		default: 1500
	},
	mask: {
		type: Boolean,
		default: false
	},
	visible: { type: Boolean }
};
var ToastIconClassName = "uni-toast__icon";
var ICONCOLOR = {
	light: "#fff",
	dark: "rgba(255,255,255,0.9)"
};
var getIconColor = (theme) => ICONCOLOR[theme];
var toast_default = /* @__PURE__ */ defineComponent({
	name: "Toast",
	props: props$3,
	setup(props) {
		initI18nShowToastMsgsOnce();
		initI18nShowLoadingMsgsOnce();
		const { Icon } = useToastIcon(props);
		const visible = usePopup(props, {});
		return () => {
			const { mask, duration, title, image } = props;
			return createVNode(Transition, { "name": "uni-fade" }, { default: () => [withDirectives(createVNode("uni-toast", { "data-duration": duration }, [mask ? createVNode("div", {
				"class": "uni-mask",
				"style": "background: transparent;",
				"onTouchmove": onEventPrevent
			}, null, 40, ["onTouchmove"]) : "", !image && !Icon.value ? createVNode("div", { "class": "uni-sample-toast" }, [createVNode("p", { "class": "uni-simple-toast__text" }, [title])]) : createVNode("div", { "class": "uni-toast" }, [image ? createVNode("img", {
				"src": image,
				"class": ToastIconClassName
			}, null, 10, ["src"]) : Icon.value, createVNode("p", { "class": "uni-toast__content" }, [title])])], 8, ["data-duration"]), [[vShow, visible.value]])] });
		};
	}
});
function useToastIcon(props) {
	const iconColor = ref(getIconColor(getTheme()));
	const _onThemeChange = ({ theme }) => iconColor.value = getIconColor(theme);
	watchEffect(() => {
		if (props.visible) onThemeChange$1(_onThemeChange);
		else offThemeChange$1(_onThemeChange);
	});
	return { Icon: computed(() => {
		switch (props.icon) {
			case "success": return createVNode(createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, iconColor.value, 38), { class: ToastIconClassName });
			case "error": return createVNode(createSvgIconVNode(ICON_PATH_WARN, iconColor.value, 38), { class: ToastIconClassName });
			case "loading": return createVNode("i", { "class": [ToastIconClassName, "uni-loading"] }, null, 2);
			default: return null;
		}
	}) };
}
//#endregion
//#region src/service/api/ui/popup/showToast.ts
var showToastState;
var showType = "";
var timeoutId;
var scope = /*#__PURE__*/ effectScope();
function watchVisible() {
	scope.run(() => {
		watch([() => showToastState.visible, () => showToastState.duration], ([visible, duration]) => {
			if (visible) {
				timeoutId && clearTimeout(timeoutId);
				if (showType === "onShowLoading") return;
				timeoutId = setTimeout(() => {
					hidePopup("onHideToast");
				}, duration);
			} else timeoutId && clearTimeout(timeoutId);
		});
	});
}
function createToast(args) {
	if (!showToastState) {
		showToastState = reactive(extend(args, { visible: false }));
		nextTick(() => {
			watchVisible();
			UniServiceJSBridge.on("onHidePopup", () => hidePopup("onHidePopup"));
			createRootApp(toast_default, showToastState, () => {}).mount(ensureRoot("u-a-t"));
		});
	} else extend(showToastState, args);
	setTimeout(() => {
		showToastState.visible = true;
	}, 10);
}
var showToast = /*#__PURE__*/ defineAsyncApi(API_SHOW_TOAST, (args, { resolve, reject }) => {
	createToast(args);
	showType = "onShowToast";
	resolve();
}, ShowToastProtocol, ShowToastOptions);
var hideToast = /*#__PURE__*/ defineAsyncApi(API_HIDE_TOAST, (args, { resolve, reject }) => {
	hidePopup("onHideToast");
	resolve();
});
function hidePopup(type) {
	const { t } = useI18n();
	if (!showType) return;
	let warnMsg = "";
	if (type === "onHideToast" && showType !== "onShowToast") warnMsg = t("uni.showToast.unpaired");
	else if (type === "onHideLoading" && showType !== "onShowLoading") warnMsg = t("uni.showLoading.unpaired");
	if (warnMsg) return console.warn(warnMsg);
	showType = "";
	setTimeout(() => {
		showToastState.visible = false;
	}, 10);
}
//#endregion
//#region src/service/api/ui/loadFontFace.ts
var loadFontFace = /*#__PURE__*/ defineAsyncApi(API_LOAD_FONT_FACE, ({ family, source, desc }, { resolve, reject }) => {
	if (source.startsWith(`url("`) || source.startsWith(`url('`)) source = `url('${getRealPath(source.substring(5, source.length - 2))}')`;
	else if (source.startsWith("url(")) source = `url('${getRealPath(source.substring(4, source.length - 1))}')`;
	else source = getRealPath(source);
	addFont(family, source, desc).then(() => {
		resolve();
	}).catch((err) => {
		reject(`loadFontFace:fail ${err}`);
	});
}, LoadFontFaceProtocol);
//#endregion
//#region src/service/api/ui/navigationBar.ts
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
			break;
	}
	resolve();
}
var setNavigationBarColor = /*#__PURE__*/ defineAsyncApi(API_SET_NAVIGATION_BAR_COLOR, (args, { resolve, reject }) => {
	setNavigationBar(getCurrentPageMeta(), API_SET_NAVIGATION_BAR_COLOR, args, resolve, reject);
}, SetNavigationBarColorProtocol, SetNavigationBarColorOptions);
var showNavigationBarLoading = /*#__PURE__*/ defineAsyncApi(API_SHOW_NAVIGATION_BAR_LOADING, (args, { resolve, reject }) => {
	setNavigationBar(getCurrentPageMeta(), API_SHOW_NAVIGATION_BAR_LOADING, args || {}, resolve, reject);
});
var hideNavigationBarLoading = /*#__PURE__*/ defineAsyncApi(API_HIDE_NAVIGATION_BAR_LOADING, (args, { resolve, reject }) => {
	setNavigationBar(getCurrentPageMeta(), API_HIDE_NAVIGATION_BAR_LOADING, args || {}, resolve, reject);
});
var setNavigationBarTitle = /*#__PURE__*/ defineAsyncApi(API_SET_NAVIGATION_BAR_TITLE, (args, { resolve, reject }) => {
	setNavigationBar(getCurrentPageMeta(), API_SET_NAVIGATION_BAR_TITLE, args, resolve, reject);
}, SetNavigationBarTitleProtocol);
//#endregion
//#region src/service/api/ui/pageScrollTo.ts
var pageScrollTo = /*#__PURE__*/ defineAsyncApi(API_PAGE_SCROLL_TO, ({ scrollTop, selector, duration }, { resolve }) => {
	scrollTo(selector || scrollTop || 0, duration, true);
	resolve();
}, PageScrollToProtocol, PageScrollToOptions);
//#endregion
//#region src/service/api/ui/startPullDownRefresh.ts
var startPullDownRefresh = /*#__PURE__*/ defineAsyncApi(API_START_PULL_DOWN_REFRESH, (_args, { resolve }) => {
	UniServiceJSBridge.invokeViewMethod(API_START_PULL_DOWN_REFRESH, {}, getCurrentPageId());
	resolve();
});
//#endregion
//#region src/service/api/ui/stopPullDownRefresh.ts
var stopPullDownRefresh = /*#__PURE__*/ defineAsyncApi(API_STOP_PULL_DOWN_REFRESH, (_args, { resolve }) => {
	UniServiceJSBridge.invokeViewMethod(API_STOP_PULL_DOWN_REFRESH, {}, getCurrentPageId());
	resolve();
});
//#endregion
//#region src/service/api/ui/tabBar.ts
var setTabBarItemProps = [
	"text",
	"iconPath",
	"iconfont",
	"selectedIconPath",
	"visible"
];
var setTabBarStyleProps = [
	"color",
	"selectedColor",
	"backgroundColor",
	"borderStyle",
	"borderColor",
	"midButton"
];
var setTabBarBadgeProps = ["badge", "redDot"];
function setProperties(item, props, propsData) {
	props.forEach(function(name) {
		if (hasOwn(propsData, name)) item[name] = propsData[name];
	});
}
function setTabBar(type, args, resolve, reject) {
	let isTabBar = false;
	const pages = getCurrentBasePages();
	if (pages.length) {
		if (getPage$BasePage(pages[pages.length - 1]).meta.isTabBar) isTabBar = true;
	}
	if (!isTabBar) return reject(`not TabBar page`);
	const { index } = args;
	if (typeof index === "number") {
		var __uniConfig2;
		const tabBarListLength = (__uniConfig2 = __uniConfig) === null || __uniConfig2 === void 0 || (__uniConfig2 = __uniConfig2.tabBar) === null || __uniConfig2 === void 0 ? void 0 : __uniConfig2.list.length;
		if (!tabBarListLength || index >= tabBarListLength) return reject(`tabbar item not found`);
	}
	const tabBar = useTabBar();
	switch (type) {
		case API_SHOW_TAB_BAR:
			tabBar.shown = true;
			break;
		case API_HIDE_TAB_BAR:
			tabBar.shown = false;
			break;
		case API_SET_TAB_BAR_ITEM:
			const tabBarItem = tabBar.list[index];
			const oldPagePath = tabBarItem.pagePath;
			setProperties(tabBarItem, setTabBarItemProps, args);
			const { pagePath } = args;
			if (pagePath) {
				const newPagePath = addLeadingSlash(pagePath);
				if (newPagePath !== oldPagePath) normalizeTabBarRoute(index, oldPagePath, newPagePath);
			}
			break;
		case API_SET_TAB_BAR_STYLE:
			setProperties(tabBar, setTabBarStyleProps, args);
			break;
		case API_SHOW_TAB_BAR_RED_DOT:
			setProperties(tabBar.list[index], setTabBarBadgeProps, {
				badge: "",
				redDot: true
			});
			break;
		case API_SET_TAB_BAR_BADGE:
			setProperties(tabBar.list[index], setTabBarBadgeProps, {
				badge: args.text,
				redDot: true
			});
			break;
		case API_HIDE_TAB_BAR_RED_DOT:
		case API_REMOVE_TAB_BAR_BADGE:
			setProperties(tabBar.list[index], setTabBarBadgeProps, {
				badge: "",
				redDot: false
			});
			break;
	}
	resolve();
}
var setTabBarItem = /*#__PURE__*/ defineAsyncApi(API_SET_TAB_BAR_ITEM, (args, { resolve, reject }) => {
	setTabBar(API_SET_TAB_BAR_ITEM, args, resolve, reject);
}, SetTabBarItemProtocol, SetTabBarItemOptions);
var setTabBarStyle = /*#__PURE__*/ defineAsyncApi(API_SET_TAB_BAR_STYLE, (args, { resolve, reject }) => {
	setTabBar(API_SET_TAB_BAR_STYLE, args, resolve, reject);
}, SetTabBarStyleProtocol, SetTabBarStyleOptions);
var hideTabBar = /*#__PURE__*/ defineAsyncApi(API_HIDE_TAB_BAR, (args, { resolve, reject }) => {
	setTabBar(API_HIDE_TAB_BAR, args ? args : {}, resolve, reject);
}, HideTabBarProtocol);
var showTabBar = /*#__PURE__*/ defineAsyncApi(API_SHOW_TAB_BAR, (args, { resolve, reject }) => {
	setTabBar(API_SHOW_TAB_BAR, args ? args : {}, resolve, reject);
}, ShowTabBarProtocol);
var hideTabBarRedDot = /*#__PURE__*/ defineAsyncApi(API_HIDE_TAB_BAR_RED_DOT, (args, { resolve, reject }) => {
	setTabBar(API_HIDE_TAB_BAR_RED_DOT, args, resolve, reject);
}, HideTabBarRedDotProtocol, HideTabBarRedDotOptions);
var showTabBarRedDot = /*#__PURE__*/ defineAsyncApi(API_SHOW_TAB_BAR_RED_DOT, (args, { resolve, reject }) => {
	setTabBar(API_SHOW_TAB_BAR_RED_DOT, args, resolve, reject);
}, ShowTabBarRedDotProtocol, ShowTabBarRedDotOptions);
var removeTabBarBadge = /*#__PURE__*/ defineAsyncApi(API_REMOVE_TAB_BAR_BADGE, (args, { resolve, reject }) => {
	setTabBar(API_REMOVE_TAB_BAR_BADGE, args, resolve, reject);
}, RemoveTabBarBadgeProtocol, RemoveTabBarBadgeOptions);
var setTabBarBadge = /*#__PURE__*/ defineAsyncApi(API_SET_TAB_BAR_BADGE, (args, { resolve, reject }) => {
	setTabBar(API_SET_TAB_BAR_BADGE, args, resolve, reject);
}, SetTabBarBadgeProtocol, SetTabBarBadgeOptions);
//#endregion
//#region src/framework/components/layout/tabBar.tsx
var UNI_TABBAR_ICON_FONT = "UniTabbarIconFont";
var _middleButton = {
	width: "50px",
	height: "50px",
	iconWidth: "24px"
};
var tabBar_default = /*#__PURE__*/ defineSystemComponent({
	name: "TabBar",
	setup() {
		const visibleList = ref([]);
		const _tabBar = useTabBar();
		const tabBar = useTheme(_tabBar, () => {
			const tabBarStyle = parseTheme(_tabBar);
			tabBar.backgroundColor = tabBarStyle.backgroundColor;
			tabBar.borderStyle = tabBarStyle.borderStyle;
			tabBar.color = tabBarStyle.color;
			tabBar.selectedColor = tabBarStyle.selectedColor;
			tabBar.blurEffect = tabBarStyle.blurEffect;
			tabBar.midButton = tabBarStyle.midButton;
			if (tabBarStyle.list && tabBarStyle.list.length) tabBarStyle.list.forEach((item, index) => {
				tabBar.list[index].iconPath = item.iconPath;
				tabBar.list[index].selectedIconPath = item.selectedIconPath;
			});
		});
		useVisibleList(tabBar, visibleList);
		useTabBarCssVar(tabBar);
		const onSwitchTab = useSwitchTab(useRoute(), tabBar, visibleList);
		const { style, borderStyle, placeholderStyle } = useTabBarStyle(tabBar);
		onMounted(() => {
			if (tabBar.iconfontSrc) loadFontFace({
				family: UNI_TABBAR_ICON_FONT,
				source: `url("${tabBar.iconfontSrc}")`
			});
		});
		return () => {
			const tabBarItemsTsx = createTabBarItemsTsx(tabBar, onSwitchTab, visibleList);
			return createVNode("uni-tabbar", { "class": "uni-tabbar-" + tabBar.position }, [createVNode("div", {
				"class": "uni-tabbar",
				"style": style.value
			}, [createVNode("div", {
				"class": "uni-tabbar-border",
				"style": borderStyle.value
			}, null, 4), tabBarItemsTsx], 4), createVNode("div", {
				"class": "uni-placeholder",
				"style": placeholderStyle.value
			}, null, 4)], 2);
		};
	}
});
function useTabBarCssVar(tabBar) {
	watch(() => tabBar.shown, (value) => {
		updatePageCssVar({ "--window-bottom": normalizeWindowBottom(value ? parseInt(tabBar.height) : 0) });
	});
}
function useVisibleList(tabBar, visibleList) {
	const internalMidButton = ref(extend({ type: "midButton" }, tabBar.midButton));
	function setVisibleList() {
		let tempList = [];
		tempList = tabBar.list.filter((item) => item.visible !== false);
		if (__UNI_FEATURE_TABBAR_MIDBUTTON__ && tabBar.midButton) {
			internalMidButton.value = extend({}, _middleButton, internalMidButton.value, tabBar.midButton);
			tempList = tempList.filter((item) => !isMidButton(item));
			if (tempList.length % 2 === 0) tempList.splice(Math.floor(tempList.length / 2), 0, internalMidButton.value);
		}
		visibleList.value = tempList;
	}
	watchEffect(setVisibleList);
}
function useSwitchTab(route, tabBar, visibleList) {
	watchEffect(() => {
		const meta = route.meta;
		if (meta.isTabBar) {
			const pagePath = meta.route;
			tabBar.selectedIndex = visibleList.value.findIndex((item) => item.pagePath === pagePath);
		}
	});
	return (tabBarItem, index) => {
		const { type } = tabBarItem;
		return () => {
			if (__UNI_FEATURE_TABBAR_MIDBUTTON__ && type === "midButton") return UniServiceJSBridge.invokeOnCallback(API_ON_TAB_BAR_MID_BUTTON_TAP);
			const { pagePath, text } = tabBarItem;
			let url = addLeadingSlash(pagePath);
			if (url === __uniRoutes[0].alias) url = "/";
			if (route.path !== url) uni.switchTab({
				from: "tabBar",
				url,
				tabBarText: text
			});
			else invokeHook("onTabItemTap", {
				index,
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
/**
* useTabBarStyle
* @param tabBar
* @returns
*/
function useTabBarStyle(tabBar) {
	return {
		style: computed(() => {
			let backgroundColor = tabBar.backgroundColor;
			const blurEffect = tabBar.blurEffect;
			if (!backgroundColor) {
				if (cssBackdropFilter && blurEffect && blurEffect !== "none") backgroundColor = BLUR_EFFECT_COLORS[blurEffect];
			}
			return {
				backgroundColor: backgroundColor || DEFAULT_BG_COLOR,
				backdropFilter: blurEffect !== "none" ? "blur(10px)" : blurEffect
			};
		}),
		borderStyle: computed(() => {
			const { borderStyle, borderColor } = tabBar;
			if (borderColor && isString(borderColor)) return { backgroundColor: borderColor };
			return { backgroundColor: BORDER_COLORS[borderStyle] || BORDER_COLORS["black"] };
		}),
		placeholderStyle: computed(() => {
			return { height: tabBar.height };
		})
	};
}
function isMidButton(item) {
	return item.type === "midButton";
}
function createTabBarItemsTsx(tabBar, onSwitchTab, visibleList) {
	const { selectedIndex, selectedColor, color } = tabBar;
	return visibleList.value.map((item, index) => {
		const selected = selectedIndex === index;
		const textColor = selected ? selectedColor : color;
		const iconPath = (selected ? item.selectedIconPath || item.iconPath : item.iconPath) || "";
		const iconfontText = item.iconfont ? selected ? item.iconfont.selectedText || item.iconfont.text : item.iconfont.text : void 0;
		const iconfontColor = item.iconfont ? selected ? item.iconfont.selectedColor || item.iconfont.color : item.iconfont.color : void 0;
		if (!__UNI_FEATURE_TABBAR_MIDBUTTON__) return createTabBarItemTsx(textColor, iconPath, iconfontText, iconfontColor, item, tabBar, index, onSwitchTab);
		return isMidButton(item) ? createTabBarMidButtonTsx(textColor, iconPath, iconfontText, iconfontColor, item, tabBar, index, onSwitchTab) : createTabBarItemTsx(textColor, iconPath, iconfontText, iconfontColor, item, tabBar, index, onSwitchTab);
	});
}
function createTabBarItemTsx(color, iconPath, iconfontText, iconfontColor, tabBarItem, tabBar, index, onSwitchTab) {
	return createVNode("div", {
		"key": index,
		"class": "uni-tabbar__item",
		"onClick": onSwitchTab(tabBarItem, index)
	}, [createTabBarItemBdTsx(color, iconPath || "", iconfontText, iconfontColor, tabBarItem, tabBar)], 8, ["onClick"]);
}
function createTabBarItemBdTsx(color, iconPath, iconfontText, iconfontColor, tabBarItem, tabBar) {
	const { height } = tabBar;
	return createVNode("div", {
		"class": "uni-tabbar__bd",
		"style": { height }
	}, [
		iconfontText ? createTabBarItemIconfontTsx(iconfontText, iconfontColor || BLUR_EFFECT_COLOR_DARK, tabBarItem, tabBar) : iconPath && createTabBarItemIconTsx(iconPath, tabBarItem, tabBar),
		tabBarItem.text && createTabBarItemTextTsx(color, tabBarItem, tabBar),
		tabBarItem.redDot && createTabBarItemRedDotTsx(tabBarItem.badge)
	], 4);
}
function createTabBarItemIconTsx(iconPath, tabBarItem, tabBar) {
	const { type, text } = tabBarItem;
	const { iconWidth } = tabBar;
	return createVNode("div", {
		"class": "uni-tabbar__icon" + (text ? " uni-tabbar__icon__diff" : ""),
		"style": {
			width: iconWidth,
			height: iconWidth
		}
	}, [type !== "midButton" && createVNode("img", { "src": getRealPath(iconPath) }, null, 8, ["src"])], 6);
}
function createTabBarItemIconfontTsx(iconfontText, iconfontColor, tabBarItem, tabBar) {
	var _tabBarItem$iconfont;
	const { type, text } = tabBarItem;
	const { iconWidth } = tabBar;
	const clazz = "uni-tabbar__icon" + (text ? " uni-tabbar__icon__diff" : "");
	const style = {
		width: iconWidth,
		height: iconWidth
	};
	const iconfontStyle = {
		fontSize: ((_tabBarItem$iconfont = tabBarItem.iconfont) === null || _tabBarItem$iconfont === void 0 ? void 0 : _tabBarItem$iconfont.fontSize) || iconWidth,
		color: iconfontColor
	};
	return createVNode("div", {
		"class": clazz,
		"style": style
	}, [type !== "midButton" && createVNode("div", {
		"class": "uni-tabbar__iconfont",
		"style": iconfontStyle
	}, [iconfontText], 4)], 6);
}
function createTabBarItemTextTsx(color, tabBarItem, tabBar) {
	const { iconPath, text } = tabBarItem;
	const { fontSize, spacing } = tabBar;
	return createVNode("div", {
		"class": "uni-tabbar__label",
		"style": {
			color,
			fontSize,
			lineHeight: !iconPath ? 1.8 : "normal",
			marginTop: !iconPath ? "inherit" : spacing
		}
	}, [text], 4);
}
function createTabBarItemRedDotTsx(badge) {
	return createVNode("div", { "class": "uni-tabbar__reddot" + (badge ? " uni-tabbar__badge" : "") }, [badge], 2);
}
function createTabBarMidButtonTsx(color, iconPath, iconfontText, iconfontColor, midButton, tabBar, index, onSwitchTab) {
	const { width, height, backgroundImage, iconWidth } = midButton;
	return createVNode("div", {
		"key": "midButton",
		"class": "uni-tabbar__item",
		"style": {
			flex: "0 0 " + width,
			position: "relative"
		},
		"onClick": onSwitchTab(midButton, index)
	}, [createVNode("div", {
		"class": "uni-tabbar__mid",
		"style": {
			width,
			height,
			backgroundImage: backgroundImage ? "url('" + getRealPath(backgroundImage) + "')" : "none"
		}
	}, [iconPath && createVNode("img", {
		"style": {
			width: iconWidth,
			height: iconWidth
		},
		"src": getRealPath(iconPath)
	}, null, 12, ["src"])], 4), createTabBarItemBdTsx(color, iconPath, iconfontText, iconfontColor, midButton, tabBar)], 12, ["onClick"]);
}
//#endregion
//#region src/framework/components/layout/index.tsx
var DEFAULT_CSS_VAR_VALUE = "0px";
var globalLayoutState = void 0;
function getLayoutState() {
	return globalLayoutState;
}
var layout_default = /*#__PURE__*/ defineSystemComponent({
	name: "Layout",
	setup(_props, { emit }) {
		const rootRef = ref(null);
		initCssVar();
		const keepAliveRoute = __UNI_FEATURE_PAGES__ && useKeepAliveRoute();
		const { layoutState, windowState } = useState();
		useMaxWidth(layoutState, rootRef);
		const topWindow = __UNI_FEATURE_TOPWINDOW__ && useTopWindow(layoutState);
		const leftWindow = __UNI_FEATURE_LEFTWINDOW__ && useLeftWindow(layoutState);
		const rightWindow = __UNI_FEATURE_RIGHTWINDOW__ && useRightWindow(layoutState);
		const showTabBar = __UNI_FEATURE_TABBAR__ && useShowTabBar(emit);
		const clazz = useAppClass(showTabBar);
		globalLayoutState = layoutState;
		return () => {
			const layoutTsx = createLayoutTsx(keepAliveRoute, layoutState, windowState, topWindow, leftWindow, rightWindow);
			const tabBarTsx = __UNI_FEATURE_TABBAR__ && createTabBarTsx(showTabBar);
			return createVNode("uni-app", {
				"ref": rootRef,
				"class": clazz.value
			}, [layoutTsx, tabBarTsx], 2);
		};
	}
});
function useAppClass(showTabBar) {
	const showMaxWidth = ref(false);
	return computed(() => {
		return {
			"uni-app--showtabbar": showTabBar && showTabBar.value,
			"uni-app--maxwidth": showMaxWidth.value
		};
	});
}
function initCssVar() {
	updateCssVar({
		"--status-bar-height": DEFAULT_CSS_VAR_VALUE,
		"--top-window-height": DEFAULT_CSS_VAR_VALUE,
		"--window-left": DEFAULT_CSS_VAR_VALUE,
		"--window-right": DEFAULT_CSS_VAR_VALUE,
		"--window-margin": DEFAULT_CSS_VAR_VALUE,
		"--tab-bar-height": DEFAULT_CSS_VAR_VALUE
	});
}
function initMediaQuery(minWidth, callback) {
	const mediaQueryList = window.matchMedia("(min-width: " + minWidth + "px)");
	if (mediaQueryList.addEventListener) mediaQueryList.addEventListener("change", callback);
	else mediaQueryList.addListener(callback);
	return mediaQueryList.matches;
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
		const maxWidth = parseInt(String((hasOwn(meta, "maxWidth") ? meta.maxWidth : __uniConfig.globalStyle.maxWidth) || Number.MAX_SAFE_INTEGER));
		let showMaxWidth = false;
		if (windowWidth > maxWidth) showMaxWidth = true;
		else showMaxWidth = false;
		if (showMaxWidth && maxWidth) {
			layoutState.marginWidth = (windowWidth - maxWidth) / 2;
			nextTick(() => {
				const rootEl = rootRef.value;
				if (rootEl) rootEl.setAttribute("style", "max-width:" + maxWidth + "px;margin:0 auto;");
			});
		} else {
			layoutState.marginWidth = 0;
			nextTick(() => {
				const rootEl = rootRef.value;
				if (rootEl) rootEl.removeAttribute("style");
			});
		}
	}
	watch([() => route.path], checkMaxWidth);
	onMounted(() => {
		checkMaxWidth();
		window.addEventListener("resize", checkMaxWidth);
	});
}
function useState() {
	const route = usePageRoute();
	if (!__UNI_FEATURE_RESPONSIVE__) {
		const layoutState = reactive({
			marginWidth: 0,
			leftWindowWidth: 0,
			rightWindowWidth: 0
		});
		watch(() => layoutState.marginWidth, (value) => updateCssVar({ "--window-margin": value + "px" }));
		watch(() => layoutState.leftWindowWidth + layoutState.marginWidth, (value) => {
			updateCssVar({ "--window-left": value + "px" });
		});
		watch(() => layoutState.rightWindowWidth + layoutState.marginWidth, (value) => {
			updateCssVar({ "--window-right": value + "px" });
		});
		return {
			layoutState,
			windowState: computed(() => ({}))
		};
	}
	const topWindowMediaQuery = ref(false);
	const leftWindowMediaQuery = ref(false);
	const rightWindowMediaQuery = ref(false);
	const layoutState = reactive({
		topWindowMediaQuery,
		showTopWindow: computed(() => __UNI_FEATURE_TOPWINDOW__ && route.meta.topWindow !== false && topWindowMediaQuery.value),
		apiShowTopWindow: false,
		leftWindowMediaQuery,
		showLeftWindow: computed(() => __UNI_FEATURE_LEFTWINDOW__ && route.meta.leftWindow !== false && leftWindowMediaQuery.value),
		apiShowLeftWindow: false,
		rightWindowMediaQuery,
		showRightWindow: computed(() => __UNI_FEATURE_RIGHTWINDOW__ && route.meta.rightWindow !== false && rightWindowMediaQuery.value),
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
		let topWindowMinWidth = RESPONSIVE_MIN_WIDTH;
		if (matchMedia && hasOwn(matchMedia, "minWidth")) {
			const minWidth = matchMedia.minWidth;
			topWindowMinWidth = checkMinWidth(minWidth) ? minWidth : topWindowMinWidth;
		}
		const matches = initMediaQuery(topWindowMinWidth, (ev) => {
			layoutState[`${prop}MediaQuery`] = ev.matches;
		});
		layoutState[`${prop}MediaQuery`] = matches;
	});
	watch(() => layoutState.topWindowHeight, (value) => updateCssVar({ "--top-window-height": value + "px" }));
	watch(() => layoutState.marginWidth, (value) => updateCssVar({ "--window-margin": value + "px" }));
	watch(() => layoutState.leftWindowWidth + layoutState.marginWidth, (value) => {
		updateCssVar({ "--window-left": value + "px" });
	});
	watch(() => layoutState.rightWindowWidth + layoutState.marginWidth, (value) => {
		updateCssVar({ "--window-right": value + "px" });
	});
	UniServiceJSBridge.on(ON_NAVIGATION_BAR_CHANGE, (navigationBar) => {
		layoutState.navigationBarTitleText = navigationBar.titleText;
	});
	return {
		layoutState,
		windowState: computed(() => ({
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
	return createVNode("uni-layout", { "class": {
		"uni-app--showtopwindow": __UNI_FEATURE_TOPWINDOW__ && layoutState.showTopWindow,
		"uni-app--showleftwindow": __UNI_FEATURE_LEFTWINDOW__ && layoutState.showLeftWindow,
		"uni-app--showrightwindow": __UNI_FEATURE_RIGHTWINDOW__ && layoutState.showRightWindow
	} }, [topWindowTsx, createVNode("uni-content", null, [
		createVNode("uni-main", null, [routerVNode]),
		leftWindowTsx,
		rightWindowTsx
	])], 2);
}
function useShowTabBar(emit) {
	const route = usePageRoute();
	const tabBar = useTabBar();
	const showTabBar = computed(() => route.meta.isTabBar && tabBar.shown);
	updateCssVar({ "--tab-bar-height": tabBar.height });
	return showTabBar;
}
function createTabBarTsx(showTabBar) {
	return withDirectives(createVNode(tabBar_default, null, null, 512), [[vShow, showTabBar.value]]);
}
function createPageVNode() {
	return createVNode(__uniRoutes[0].component);
}
function createRouterViewVNode({ routeKey, isTabBar, routeCache }) {
	return createVNode(RouterView, null, {
		default: withCtx(({ Component }) => [(openBlock(), createBlock(KeepAlive, {
			matchBy: "key",
			cache: routeCache
		}, [(openBlock(), createBlock(resolveDynamicComponent(Component), {
			type: isTabBar.value ? "tabBar" : "",
			key: routeKey.value
		}))], 1032, ["cache"]))]),
		_: 1
	});
}
function useTopWindow(layoutState) {
	const { component, style } = __uniConfig.topWindow;
	const windowRef = ref(null);
	function updateWindow() {
		const instance = windowRef.value;
		if (!instance || !instance.$) return;
		const el = resolveOwnerEl(instance.$);
		if (!el) return;
		/**
		* el指开发者top-window的根节点，其高度可能并不正确。
		* pages.json内的top-window style被设置到了el的父元素上。需要以父元素的高度为准。此值会影响--top-window-height变量
		*/
		const uniTopWindowStyleEl = el.parentElement;
		if (!uniTopWindowStyleEl) return;
		layoutState.topWindowHeight = uniTopWindowStyleEl.getBoundingClientRect().height;
	}
	watch(() => windowRef.value, () => {
		updateWindow();
	});
	watch(() => layoutState.showTopWindow || layoutState.apiShowTopWindow, () => nextTick(updateWindow));
	layoutState.topWindowStyle = style;
	return {
		component,
		windowRef
	};
}
function useLeftWindow(layoutState) {
	const { component, style } = __uniConfig.leftWindow;
	const windowRef = ref(null);
	function updateWindow() {
		const instance = windowRef.value;
		if (!instance || !instance.$) return;
		const el = resolveOwnerEl(instance.$);
		if (!el) return;
		/**
		* left-window样式应用节点为el的父元素的父元素。
		*/
		const uniLeftWindowStyleEl = el.parentElement && el.parentElement.parentElement;
		if (!uniLeftWindowStyleEl) return;
		layoutState.leftWindowWidth = uniLeftWindowStyleEl.getBoundingClientRect().width;
	}
	watch(() => windowRef.value, () => {
		updateWindow();
	});
	watch(() => layoutState.showLeftWindow || layoutState.apiShowLeftWindow, () => nextTick(updateWindow));
	layoutState.leftWindowStyle = style;
	return {
		component,
		windowRef
	};
}
function useRightWindow(layoutState) {
	const { component, style } = __uniConfig.rightWindow;
	const windowRef = ref(null);
	function updateWindow() {
		const instance = windowRef.value;
		if (!instance || !instance.$) return;
		const el = resolveOwnerEl(instance.$);
		if (!el) return;
		/**
		* right-window样式应用节点为el的父元素的父元素。
		*/
		const uniRightWindowStyleEl = el.parentElement && el.parentElement.parentElement;
		if (!uniRightWindowStyleEl) return;
		layoutState.rightWindowWidth = uniRightWindowStyleEl.getBoundingClientRect().width;
	}
	watch(() => windowRef.value, () => {
		updateWindow();
	});
	watch(() => layoutState.showRightWindow || layoutState.apiShowRightWindow, () => nextTick(updateWindow));
	layoutState.rightWindowStyle = style;
	return {
		component,
		windowRef
	};
}
function createTopWindowTsx(topWindow, layoutState, windowState) {
	if (topWindow) {
		const { component: TopWindow, windowRef } = topWindow;
		/**
		* 注意如果修改layoutState.topWindowStyle所在的元素，需要同步修改useTopWindow函数中layoutState.topWindowHeight的计算逻辑。
		*/
		return withDirectives(createVNode("uni-top-window", null, [createVNode("div", {
			"class": "uni-top-window",
			"style": layoutState.topWindowStyle
		}, [createVNode(TopWindow, mergeProps({
			"ref": windowRef,
			"navigation-bar-title-text": layoutState.navigationBarTitleText
		}, windowState), null, 16, ["navigation-bar-title-text"])], 4), createVNode("div", {
			"class": "uni-top-window--placeholder",
			"style": { height: layoutState.topWindowHeight + "px" }
		}, null, 4)], 512), [[vShow, layoutState.showTopWindow || layoutState.apiShowTopWindow]]);
	}
}
function createLeftWindowTsx(leftWindow, layoutState, windowState) {
	if (leftWindow) {
		const { component: LeftWindow, windowRef } = leftWindow;
		/**
		* 注意如果修改layoutState.leftWindowStyle所在的元素，需要同步修改useLeftWindow函数中layoutState.leftWindowWidth的计算逻辑。
		*/
		return withDirectives(createVNode("uni-left-window", {
			"data-show": layoutState.apiShowLeftWindow || void 0,
			"style": layoutState.leftWindowStyle
		}, [layoutState.apiShowLeftWindow ? createVNode("div", {
			"class": "uni-mask",
			"onClick": () => layoutState.apiShowLeftWindow = false
		}, null, 8, ["onClick"]) : null, createVNode("div", { "class": "uni-left-window" }, [createVNode(LeftWindow, mergeProps({ "ref": windowRef }, windowState), null, 16)])], 12, ["data-show"]), [[vShow, layoutState.showLeftWindow || layoutState.apiShowLeftWindow]]);
	}
}
function createRightWindowTsx(rightWindow, layoutState, windowState) {
	if (rightWindow) {
		const { component: RightWindow, windowRef } = rightWindow;
		/**
		* 注意如果修改layoutState.rightWindowStyle所在的元素，需要同步修改useRightWindow函数中layoutState.rightWindowWidth的计算逻辑。
		*/
		return withDirectives(createVNode("uni-right-window", {
			"data-show": layoutState.apiShowRightWindow || void 0,
			"style": layoutState.rightWindowStyle
		}, [layoutState.apiShowRightWindow ? createVNode("div", {
			"class": "uni-mask",
			"onClick": () => layoutState.apiShowRightWindow = false
		}, null, 8, ["onClick"]) : null, createVNode("div", { "class": "uni-right-window" }, [createVNode(RightWindow, mergeProps({ "ref": windowRef }, windowState), null, 16)])], 12, ["data-show"]), [[vShow, layoutState.showRightWindow || layoutState.apiShowRightWindow]]);
	}
}
//#endregion
//#region src/service/api/ui/window.ts
var showTopWindow = /*#__PURE__*/ defineAsyncApi("showTopWindow", (_, { resolve, reject }) => {
	const state = getLayoutState();
	if (!state) {
		reject();
		return;
	}
	state.apiShowTopWindow = true;
	nextTick(resolve);
});
var hideTopWindow = /*#__PURE__*/ defineAsyncApi("hideTopWindow", (_, { resolve, reject }) => {
	const state = getLayoutState();
	if (!state) {
		reject();
		return;
	}
	state.apiShowTopWindow = false;
	nextTick(resolve);
});
var showLeftWindow = /*#__PURE__*/ defineAsyncApi("showLeftWindow", (_, { resolve, reject }) => {
	const state = getLayoutState();
	if (!state) {
		reject();
		return;
	}
	state.apiShowLeftWindow = true;
	nextTick(resolve);
});
var hideLeftWindow = /*#__PURE__*/ defineAsyncApi("hideLeftWindow", (_, { resolve, reject }) => {
	const state = getLayoutState();
	if (!state) {
		reject();
		return;
	}
	state.apiShowLeftWindow = false;
	nextTick(resolve);
});
var showRightWindow = /*#__PURE__*/ defineAsyncApi("showRightWindow", (_, { resolve, reject }) => {
	const state = getLayoutState();
	if (!state) {
		reject();
		return;
	}
	state.apiShowRightWindow = true;
	nextTick(resolve);
});
var hideRightWindow = /*#__PURE__*/ defineAsyncApi("hideRightWindow", (_, { resolve, reject }) => {
	const state = getLayoutState();
	if (!state) {
		reject();
		return;
	}
	state.apiShowRightWindow = false;
	nextTick(resolve);
});
var getTopWindowStyle = /*#__PURE__*/ defineSyncApi("getTopWindowStyle", () => {
	const state = getLayoutState();
	return extend({}, state && state.topWindowStyle);
});
var setTopWindowStyle = /*#__PURE__*/ defineSyncApi("setTopWindowStyle", (style) => {
	const state = getLayoutState();
	if (state) state.topWindowStyle = style;
});
var getLeftWindowStyle = /*#__PURE__*/ defineSyncApi("getLeftWindowStyle", () => {
	const state = getLayoutState();
	return extend({}, state && state.leftWindowStyle);
});
var setLeftWindowStyle = /*#__PURE__*/ defineSyncApi("setLeftWindowStyle", (style) => {
	const state = getLayoutState();
	if (state) state.leftWindowStyle = style;
});
var getRightWindowStyle = /*#__PURE__*/ defineSyncApi("getRightWindowStyle", () => {
	const state = getLayoutState();
	return extend({}, state && state.rightWindowStyle);
});
var setRightWindowStyle = /*#__PURE__*/ defineSyncApi("setRightWindowStyle", (style) => {
	const state = getLayoutState();
	if (state) state.rightWindowStyle = style;
});
//#endregion
//#region src/service/api/plugin/facialVerify.ts
var getFacialRecognitionMetaInfo = /*#__PURE__*/ defineSyncApi("getFacialRecognitionMetaInfo", () => {
	if (Object.getPrototypeOf(window) !== Window.prototype) {
		console.error("getFacialRecognitionMetaInfo:fail window对象原型被篡改，可能存在劫持");
		return "";
	}
	if (window.window !== window || window.self !== window) {
		console.error("getFacialRecognitionMetaInfo:fail window对象属性引用异常，可能被劫持");
		return "";
	}
	if (Object.prototype.toString.call(window) !== "[object Window]" && Object.prototype.toString.call(window) !== "[object DOMWindow]") {
		console.error("getFacialRecognitionMetaInfo:fail window对象类型标识异常，可能被劫持");
		return "";
	}
	if (isFunction(window.getMetaInfo)) return window.getMetaInfo();
	else {
		console.error("getFacialRecognitionMetaInfo:fail window对象缺少getMetaInfo方法，请参考文档引用：https://doc.dcloud.net.cn/uniCloud/frv/dev.html#window-get-meta-info");
		return "";
	}
});
//#endregion
//#region src/service/api/brightness/brightness.ts
var keepScreenOn = false;
var wakeLockSentinel = null;
var wakeLockRequest = null;
var visibilityChangeListenerAdded = false;
function getWakeLockManager() {
	const currentNavigator = navigator;
	if (currentNavigator.wakeLock != null) return currentNavigator.wakeLock;
	return null;
}
function getUnsupportedMessage() {
	return `method 'uni.${API_SET_KEEP_SCREEN_ON}' not supported`;
}
function getErrorMessage(error) {
	return error == null ? void 0 : `${error}`;
}
function onWakeLockRelease(event) {
	const sentinel = event.target;
	if (sentinel) sentinel.removeEventListener("release", onWakeLockRelease);
	if (wakeLockSentinel === sentinel) wakeLockSentinel = null;
}
function requestWakeLock() {
	const wakeLockManager = getWakeLockManager();
	if (wakeLockManager == null) return Promise.reject(getUnsupportedMessage());
	if (wakeLockSentinel && !wakeLockSentinel.released) return Promise.resolve(wakeLockSentinel);
	if (wakeLockRequest) return wakeLockRequest;
	wakeLockRequest = wakeLockManager.request("screen").then((sentinel) => {
		wakeLockSentinel = sentinel;
		sentinel.addEventListener("release", onWakeLockRelease);
		return sentinel;
	}).finally(() => {
		wakeLockRequest = null;
	});
	return wakeLockRequest;
}
function releaseWakeLock() {
	return _releaseWakeLock.apply(this, arguments);
}
function _releaseWakeLock() {
	_releaseWakeLock = _asyncToGenerator(function* () {
		if (wakeLockRequest) yield wakeLockRequest.catch(() => null);
		const sentinel = wakeLockSentinel;
		wakeLockSentinel = null;
		if (sentinel == null) return;
		sentinel.removeEventListener("release", onWakeLockRelease);
		if (!sentinel.released) yield sentinel.release();
	});
	return _releaseWakeLock.apply(this, arguments);
}
function onVisibilityChange() {
	if (document.visibilityState === "visible" && keepScreenOn) requestWakeLock().catch(() => {});
}
function addVisibilityChangeListener() {
	if (!visibilityChangeListenerAdded) {
		document.addEventListener("visibilitychange", onVisibilityChange);
		visibilityChangeListenerAdded = true;
	}
}
function removeVisibilityChangeListener() {
	if (visibilityChangeListenerAdded) {
		document.removeEventListener("visibilitychange", onVisibilityChange);
		visibilityChangeListenerAdded = false;
	}
}
var setKeepScreenOn = /*#__PURE__*/ defineAsyncApi(API_SET_KEEP_SCREEN_ON, ({ keepScreenOn: value }, { resolve, reject }) => {
	keepScreenOn = !!value;
	if (keepScreenOn) {
		addVisibilityChangeListener();
		requestWakeLock().then(() => {
			resolve();
		}).catch((error) => {
			keepScreenOn = false;
			removeVisibilityChangeListener();
			reject(getErrorMessage(error));
		});
	} else {
		removeVisibilityChangeListener();
		releaseWakeLock().then(resolve).catch((error) => {
			reject(getErrorMessage(error));
		});
	}
});
//#endregion
//#region src/service/api/todo/index.ts
var saveImageToPhotosAlbum = /*#__PURE__*/ defineAsyncApi(API_SAVE_IMAGE_TO_PHOTOS_ALBUM, createUnsupportedAsyncApi(API_SAVE_IMAGE_TO_PHOTOS_ALBUM));
var API_GET_RECORDER_MANAGER = "getRecorderManager";
var getRecorderManager = /*#__PURE__*/ defineSyncApi(API_GET_RECORDER_MANAGER, createUnsupportedSyncApi(API_GET_RECORDER_MANAGER));
var saveVideoToPhotosAlbum = /*#__PURE__*/ defineAsyncApi(API_SAVE_VIDEO_TO_PHOTOS_ALBUM, createUnsupportedAsyncApi(API_SAVE_VIDEO_TO_PHOTOS_ALBUM));
var API_CREATE_CAMERA_CONTEXT = "createCameraContext";
var createCameraContext = /*#__PURE__*/ defineSyncApi(API_CREATE_CAMERA_CONTEXT, createUnsupportedSyncApi(API_CREATE_CAMERA_CONTEXT));
var API_CREATE_LIVE_PLAYER_CONTEXT = "createLivePlayerContext";
var createLivePlayerContext = /*#__PURE__*/ defineSyncApi(API_CREATE_LIVE_PLAYER_CONTEXT, createUnsupportedSyncApi(API_CREATE_LIVE_PLAYER_CONTEXT));
var API_SAVE_FILE = "saveFile";
var saveFile = /*#__PURE__*/ defineAsyncApi(API_SAVE_FILE, createUnsupportedAsyncApi(API_SAVE_FILE));
var API_GET_SAVED_FILE_LIST = "getSavedFileList";
var getSavedFileList = /*#__PURE__*/ defineAsyncApi(API_GET_SAVED_FILE_LIST, createUnsupportedAsyncApi(API_GET_SAVED_FILE_LIST));
var API_GET_SAVED_FILE_INFO = "getSavedFileInfo";
var getSavedFileInfo = /*#__PURE__*/ defineAsyncApi(API_GET_SAVED_FILE_INFO, createUnsupportedAsyncApi(API_GET_SAVED_FILE_INFO));
var API_REMOVE_SAVED_FILE = "removeSavedFile";
var removeSavedFile = /*#__PURE__*/ defineAsyncApi(API_REMOVE_SAVED_FILE, createUnsupportedAsyncApi(API_REMOVE_SAVED_FILE));
var API_ON_MEMORY_WARNING = "onMemoryWarning";
var onMemoryWarning = /*#__PURE__*/ defineOnApi(API_ON_MEMORY_WARNING, createUnsupportedOnApi(API_ON_MEMORY_WARNING));
var API_ON_GYROSCOPE_CHANGE = "onGyroscopeChange";
var onGyroscopeChange = /*#__PURE__*/ defineOnApi(API_ON_GYROSCOPE_CHANGE, createUnsupportedOnApi(API_ON_GYROSCOPE_CHANGE));
var API_START_GYROSCOPE = "startGyroscope";
var startGyroscope = /*#__PURE__*/ defineAsyncApi(API_START_GYROSCOPE, createUnsupportedAsyncApi(API_START_GYROSCOPE));
var API_STOP_GYROSCOPE = "stopGyroscope";
var stopGyroscope = /*#__PURE__*/ defineAsyncApi(API_STOP_GYROSCOPE, createUnsupportedAsyncApi(API_STOP_GYROSCOPE));
var API_SCAN_CODE = "scanCode";
var scanCode = /*#__PURE__*/ defineAsyncApi(API_SCAN_CODE, createUnsupportedAsyncApi(API_SCAN_CODE));
var API_SET_SCREEN_BRIGHTNESS = "setScreenBrightness";
var setScreenBrightness = /*#__PURE__*/ defineAsyncApi(API_SET_SCREEN_BRIGHTNESS, createUnsupportedAsyncApi(API_SET_SCREEN_BRIGHTNESS));
var API_GET_SCREEN_BRIGHTNESS = "getScreenBrightness";
var getScreenBrightness = /*#__PURE__*/ defineAsyncApi(API_GET_SCREEN_BRIGHTNESS, createUnsupportedAsyncApi(API_GET_SCREEN_BRIGHTNESS));
var API_ON_USER_CAPTURE_SCREEN = "onUserCaptureScreen";
var onUserCaptureScreen = /*#__PURE__*/ defineOnApi(API_ON_USER_CAPTURE_SCREEN, createUnsupportedOnApi(API_ON_USER_CAPTURE_SCREEN));
var API_ADD_PHONE_CONTACT = "addPhoneContact";
var addPhoneContact = /*#__PURE__*/ defineAsyncApi(API_ADD_PHONE_CONTACT, createUnsupportedAsyncApi(API_ADD_PHONE_CONTACT));
var API_LOGIN = "login";
var login = /*#__PURE__*/ defineAsyncApi(API_LOGIN, createUnsupportedAsyncApi(API_LOGIN));
var API_GET_PROVIDER = "getProvider";
var getProvider = /*#__PURE__*/ defineAsyncApi(API_GET_PROVIDER, createUnsupportedAsyncApi(API_GET_PROVIDER));
//#endregion
//#region src/service/api/context/createCanvasContextAsync.ts
var CanvasImage = class extends Image {
	constructor() {
		super();
		this._src = "";
	}
	get src() {
		return this._src;
	}
	set src(value) {
		this._src = value;
		super.src = getRealPath(value);
	}
};
var CanvasContextImpl = class {
	constructor(element) {
		this._element = element;
	}
	getContext(type) {
		return this._element.getContext(type);
	}
	toBlob(callback, type, quality) {
		this._element.toBlob(callback, type, quality);
	}
	toDataURL(type, encoderOptions) {
		return this._element.toDataURL(type, encoderOptions);
	}
	createImage() {
		return new CanvasImage();
	}
	createPath2D() {
		return new Path2D();
	}
	requestAnimationFrame(callback) {
		return window.requestAnimationFrame(callback);
	}
	cancelAnimationFrame(taskId) {
		window.cancelAnimationFrame(taskId);
	}
};
var createCanvasContextAsync = function(options) {
	nextTick(() => {
		var _options$component;
		const pages = getCurrentBasePages();
		const currentPage = (_options$component = options.component) !== null && _options$component !== void 0 ? _options$component : pages[pages.length - 1];
		requestComponentInfo(currentPage, [{
			component: currentPage,
			selector: "#" + options.id,
			single: true,
			fields: { node: true }
		}], (result) => {
			var _options$complete;
			if (result.length > 0) {
				var _options$success;
				const canvas = result[0].node;
				(_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, new CanvasContextImpl(canvas));
			} else {
				var _options$fail;
				const uniError = new UniError("uni-createCanvasContextAsync", -1, "canvas id invalid.");
				(_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, uniError);
			}
			(_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options);
		});
	});
};
//#endregion
//#region src/service/api/context/createEditorContextAsync.ts
var ERR_SUBJECT = "uni-createEditorContextAsync";
var createEditorContextAsync = function(options) {
	nextTick(() => {
		var _options$component;
		const pages = getCurrentBasePages();
		const currentPage = (_options$component = options.component) !== null && _options$component !== void 0 ? _options$component : pages[pages.length - 1];
		requestComponentInfo(currentPage, [{
			component: currentPage,
			selector: "#" + options.id,
			single: true,
			fields: { context: true }
		}], (result) => {
			var _options$complete;
			if (result.length > 0) {
				const contextInfo = result[0].contextInfo;
				const id = contextInfo === null || contextInfo === void 0 ? void 0 : contextInfo.id;
				const page = contextInfo === null || contextInfo === void 0 ? void 0 : contextInfo.page;
				if (id != null && page != null) {
					var _options$success;
					(_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, new EditorContext(id, page));
				} else {
					var _options$fail;
					const uniError = new UniError(ERR_SUBJECT, -2, "Editor context information not found.");
					(_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, uniError);
				}
			} else {
				var _options$fail2;
				const uniError = new UniError(ERR_SUBJECT, -1, "Editor id or component invalid.");
				(_options$fail2 = options.fail) === null || _options$fail2 === void 0 || _options$fail2.call(options, uniError);
			}
			(_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options);
		});
	});
};
//#endregion
//#region src/view/components/map/MapLocation.tsx
var CONTEXT_ID = "MAP_LOCATION";
var MapLocation_default = /*#__PURE__*/ defineSystemComponent({
	name: "MapLocation",
	setup() {
		const state = reactive({
			latitude: 0,
			longitude: 0,
			rotate: 0
		});
		{
			const onMapReady = inject("onMapReady");
			let timer;
			function compassChangeHandler(res) {
				state.rotate = res.direction;
			}
			function updateLocation() {
				getLocation({
					type: "gcj02",
					success: (res) => {
						state.latitude = res.latitude;
						state.longitude = res.longitude;
					},
					complete: () => {
						timer = setTimeout(updateLocation, 3e4);
					}
				});
			}
			function removeLocation() {
				if (timer) clearTimeout(timer);
				offCompassChange(compassChangeHandler);
			}
			onCompassChange(compassChangeHandler);
			onMapReady(updateLocation);
			onUnmounted(removeLocation);
			const addMapChidlContext = inject("addMapChidlContext");
			const removeMapChidlContext = inject("removeMapChidlContext");
			const context = {
				id: CONTEXT_ID,
				state
			};
			addMapChidlContext(context);
			onUnmounted(() => removeMapChidlContext(context));
		}
		return () => {
			return state.latitude ? createVNode(MapMarker_default, mergeProps({
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
//#endregion
//#region src/view/components/map/map-polygon/index.tsx
var map_polygon_default = /*#__PURE__*/ defineSystemComponent({
	name: "MapPolygon",
	props: {
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
	},
	setup(props) {
		let polygonIns;
		inject("onMapReady")((map, maps, trigger) => {
			function drawPolygon() {
				const { points, strokeWidth, strokeColor, dashArray, fillColor, zIndex } = props;
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
			watch(props, drawPolygon);
		});
		onUnmounted(() => {
			polygonIns.setMap(null);
		});
		return () => null;
	}
});
require_amap_jsapi_types();
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
	if (isArray(points)) points.forEach((point) => {
		if (point && point.latitude && point.longitude) newPoints.push({
			latitude: point.latitude,
			longitude: point.longitude
		});
	});
	return newPoints;
}
function getAMapPosition(maps, latitude, longitude) {
	return new maps.LngLat(longitude, latitude);
}
function getBMapPosition(maps, latitude, longitude) {
	return new maps.Point(longitude, latitude);
}
function getGoogleOrQQMapPosition(maps, latitude, longitude) {
	return new maps.LatLng(latitude, longitude);
}
function getMapPosition(maps, latitude, longitude) {
	if (getIsBMap()) return getBMapPosition(maps, latitude, longitude);
	else if (getIsAMap()) return getAMapPosition(maps, latitude, longitude);
	else return getGoogleOrQQMapPosition(maps, latitude, longitude);
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
function useMap(props, rootRef, emit) {
	const trigger = useCustomEvent(rootRef, emit);
	const mapRef = ref(null);
	let maps;
	let map;
	const state = reactive({
		latitude: Number(props.latitude),
		longitude: Number(props.longitude),
		includePoints: getPoints(props.includePoints)
	});
	const onMapReadyCallbacks = [];
	let isMapReady;
	function onMapReady(callback) {
		if (isMapReady) callback(map, maps, trigger);
		else onMapReadyCallbacks.push(callback);
	}
	function emitMapReady() {
		isMapReady = true;
		onMapReadyCallbacks.forEach((callback) => callback(map, maps, trigger));
		onMapReadyCallbacks.length = 0;
	}
	let isBoundsReady;
	const onBoundsReadyCallbacks = [];
	function onBoundsReady(callback) {
		if (isBoundsReady) callback();
		else onMapReadyCallbacks.push(callback);
	}
	const contexts = {};
	function addMapChidlContext(context) {
		contexts[context.id] = context;
	}
	function removeMapChidlContext(context) {
		delete contexts[context.id];
	}
	watch([() => props.latitude, () => props.longitude], ([latitudeVlaue, longitudeVlaue]) => {
		const latitude = Number(latitudeVlaue);
		const longitude = Number(longitudeVlaue);
		if (latitude !== state.latitude || longitude !== state.longitude) {
			state.latitude = latitude;
			state.longitude = longitude;
			if (map) {
				const centerPosition = getMapPosition(maps, state.latitude, state.longitude);
				map.setCenter(centerPosition);
			}
		}
	});
	watch(() => props.includePoints, (points) => {
		state.includePoints = getPoints(points);
		if (isBoundsReady) updateBounds();
	}, { deep: true });
	function emitBoundsReady() {
		isBoundsReady = true;
		onBoundsReadyCallbacks.forEach((callback) => callback());
		onBoundsReadyCallbacks.length = 0;
	}
	function getMapInfo() {
		const center = map.getCenter();
		return {
			scale: map.getZoom(),
			centerLocation: {
				latitude: getLat(center),
				longitude: getLng(center)
			}
		};
	}
	function updateCenter() {
		const centerPosition = getMapPosition(maps, state.latitude, state.longitude);
		map.setCenter(centerPosition);
	}
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
	function initMap() {
		const mapEl = mapRef.value;
		const center = getMapPosition(maps, state.latitude, state.longitude);
		const event = maps.event || maps.Event;
		const map = new maps.Map(mapEl, {
			center,
			zoom: Number(props.scale),
			disableDoubleClickZoom: true,
			mapTypeControl: false,
			zoomControl: false,
			scaleControl: false,
			panControl: false,
			fullscreenControl: false,
			streetViewControl: false,
			keyboardShortcuts: false,
			minZoom: 5,
			maxZoom: 18,
			draggable: true
		});
		if (getIsBMap()) {
			map.centerAndZoom(center, Number(props.scale));
			map.enableScrollWheelZoom();
			map._printLog && map._printLog("uniapp");
		}
		watch(() => props.scale, (scale) => {
			map.setZoom(Number(scale) || 16);
		});
		onBoundsReady(() => {
			if (state.includePoints.length) {
				updateBounds();
				updateCenter();
			}
		});
		if (getIsBMap()) {
			map.addEventListener("click", () => {
				trigger("tap", {}, {});
				trigger("click", {}, {});
			});
			map.addEventListener("dragstart", () => {
				trigger("regionchange", {}, {
					type: "begin",
					causedBy: "gesture"
				});
			});
			map.addEventListener("dragend", () => {
				trigger("regionchange", {}, extend({
					type: "end",
					causedBy: "drag"
				}, getMapInfo()));
			});
		} else {
			const boundsChangedEvent = event.addListener(map, "bounds_changed", () => {
				boundsChangedEvent.remove();
				emitBoundsReady();
			});
			event.addListener(map, "complete", () => {
				emitBoundsReady();
			});
			event.addListener(map, "click", () => {
				trigger("tap", {}, {});
				trigger("click", {}, {});
			});
			event.addListener(map, "dragstart", () => {
				trigger("regionchange", {}, {
					type: "begin",
					causedBy: "gesture"
				});
			});
			event.addListener(map, "dragend", () => {
				trigger("regionchange", {}, extend({
					type: "end",
					causedBy: "drag"
				}, getMapInfo()));
			});
			const zoomChangedCallback = () => {
				emit("update:scale", map.getZoom());
				trigger("regionchange", {}, extend({
					type: "end",
					causedBy: "scale"
				}, getMapInfo()));
			};
			event.addListener(map, "zoom_changed", zoomChangedCallback);
			event.addListener(map, "zoomend", zoomChangedCallback);
			event.addListener(map, "center_changed", () => {
				const center = map.getCenter();
				const latitude = getLat(center);
				const longitude = getLng(center);
				emit("update:latitude", latitude);
				emit("update:longitude", longitude);
			});
		}
		return map;
	}
	try {
		useSubscribe((type, data = {}) => {
			switch (type) {
				case "getCenterLocation":
					onMapReady(() => {
						const center = map.getCenter();
						callOptions(data, {
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
							if (map) {
								const centerPosition = getMapPosition(maps, latitude, longitude);
								map.setCenter(centerPosition);
							}
							onMapReady(() => {
								callOptions(data, `${type}:ok`);
							});
						} else callOptions(data, `${type}:fail`);
					}
					break;
				case "translateMarker":
					onMapReady(() => {
						const context = contexts[data.markerId];
						if (context) {
							try {
								context.translate(data);
							} catch (error) {
								callOptions(data, `${type}:fail ${error.message}`);
							}
							callOptions(data, `${type}:ok`);
						} else callOptions(data, `${type}:fail not found`);
					});
					break;
				case "includePoints":
					state.includePoints = getPoints(data.includePoints);
					if (isBoundsReady || getIsAMap()) updateBounds();
					onBoundsReady(() => {
						callOptions(data, `${type}:ok`);
					});
					break;
				case "getRegion":
					onBoundsReady(() => {
						const latLngBounds = map.getBounds();
						const southwest = latLngBounds.getSouthWest();
						const northeast = latLngBounds.getNorthEast();
						callOptions(data, {
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
						callOptions(data, {
							scale: map.getZoom(),
							errMsg: `${type}:ok`
						});
					});
					break;
			}
		}, useContextInfo(), true);
	} catch (error) {}
	onMounted(() => {
		loadMaps(props.libraries, (result) => {
			maps = result;
			map = initMap();
			emitMapReady();
			trigger("updated", {}, {});
		});
	});
	provide("onMapReady", onMapReady);
	provide("addMapChidlContext", addMapChidlContext);
	provide("removeMapChidlContext", removeMapChidlContext);
	return {
		state,
		mapRef,
		trigger
	};
}
var UniMapElement = class extends UniElement {};
var map_default = /*#__PURE__*/ defineBuiltInComponent({
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
	rootElement: {
		name: "uni-map",
		class: UniMapElement
	},
	setup(props, { emit, slots }) {
		const rootRef = ref(null);
		const { mapRef, trigger } = useMap(props, rootRef, emit);
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-map", {
				"ref": rootRef,
				"id": props.id
			}, [
				createVNode("div", {
					"ref": mapRef,
					"style": "width: 100%; height: 100%; position: relative; overflow: hidden"
				}, null, 512),
				props.markers.map((item) => createVNode(MapMarker_default, mergeProps({ "key": item.id }, item), null, 16)),
				props.polyline.map((item) => createVNode(MapPolyline_default, item, null, 16)),
				props.circles.map((item) => createVNode(MapCircle_default, item, null, 16)),
				props.controls.map((item) => createVNode(MapControl_default, mergeProps(item, { "trigger": trigger }), null, 16, ["trigger"])),
				props.showLocation && createVNode(MapLocation_default, null, null),
				props.polygons.map((item) => createVNode(map_polygon_default, item, null, 16)),
				createVNode("div", { "style": "position: absolute;top: 0;width: 100%;height: 100%;overflow: hidden;pointer-events: none;" }, [slots.default && slots.default()])
			], 8, ["id"]);
		};
	}
});
//#endregion
//#region src/view/components/cover-view/index.tsx
var props$1 = { scrollTop: {
	type: [String, Number],
	default: 0
} };
var UniCoverViewElement = class extends UniElement {};
var cover_view_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "CoverView",
	compatConfig: { MODE: 3 },
	props: props$1,
	rootElement: {
		name: "uni-cover-view",
		class: UniCoverViewElement
	},
	setup(props, { slots }) {
		const root = ref(null);
		const content = ref(null);
		watch(() => props.scrollTop, (val) => {
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
		onMounted(() => {
			setScrollTop(props.scrollTop);
		});
		onMounted(() => {
			root.value.attachVmProps(props);
		});
		return () => {
			return createVNode("uni-cover-view", {
				"scroll-top": props.scrollTop,
				"ref": root
			}, [createVNode("div", {
				"ref": content,
				"class": "uni-cover-view"
			}, [slots.default && slots.default()], 512)], 8, ["scroll-top"]);
		};
	}
});
//#endregion
//#region src/view/components/cover-image/index.tsx
var UniCoverImageElement = class extends UniElement {};
var cover_image_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "CoverImage",
	compatConfig: { MODE: 3 },
	props: { src: {
		type: String,
		default: ""
	} },
	rootElement: {
		name: "uni-cover-image",
		class: UniCoverImageElement
	},
	emits: ["load", "error"],
	setup(props, { emit }) {
		const root = ref(null);
		const trigger = useCustomEvent(root, emit);
		function load($event) {
			trigger("load", $event);
		}
		function error($event) {
			trigger("error", $event);
		}
		onMounted(() => {
			root.value.attachVmProps(props);
		});
		return () => {
			const { src } = props;
			return createVNode("uni-cover-image", {
				"ref": root,
				"src": src
			}, [createVNode("div", { "class": "uni-cover-image" }, [src ? createVNode("img", {
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
//#endregion
//#region src/view/components/picker/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function getDefaultStartValue(props) {
	if (props.mode === mode.TIME) return "00:00";
	if (props.mode === mode.DATE) {
		const year = (/* @__PURE__ */ new Date()).getFullYear() - 150;
		switch (props.fields) {
			case fields.YEAR: return year.toString();
			case fields.MONTH: return year + "-01";
			default: return year + "-01-01";
		}
	}
	return "";
}
function getDefaultEndValue(props) {
	if (props.mode === mode.TIME) return "23:59";
	if (props.mode === mode.DATE) {
		const year = (/* @__PURE__ */ new Date()).getFullYear() + 150;
		switch (props.fields) {
			case fields.YEAR: return year.toString();
			case fields.MONTH: return year + "-12";
			default: return year + "-12-31";
		}
	}
	return "";
}
function getDateValueArray(props, state, valueStr, defaultValue) {
	const splitStr = props.mode === mode.DATE ? "-" : ":";
	const array = props.mode === mode.DATE ? state.dateArray : state.timeArray;
	let max;
	if (props.mode === mode.TIME) max = 2;
	else switch (props.fields) {
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
	if (value.indexOf(-1) >= 0) value = defaultValue ? getDateValueArray(props, state, defaultValue) : value.map(() => 0);
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
		default: (props) => {
			return getDefaultStartValue(props);
		}
	},
	end: {
		type: String,
		default: (props) => {
			return getDefaultEndValue(props);
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
var UniPickerElement = class extends UniElement {};
var picker_default = /*#__PURE__*/ defineBuiltInComponent({
	name: "Picker",
	compatConfig: { MODE: 3 },
	props,
	emits: [
		"change",
		"cancel",
		"columnchange"
	],
	rootElement: {
		name: "uni-picker",
		class: UniPickerElement
	},
	setup(props, { emit, slots }) {
		initI18nPickerMsgsOnce();
		const { t } = useI18n();
		const rootRef = ref(null);
		const pickerRef = ref(null);
		const selectRef = ref(null);
		const inputRef = ref(null);
		const pickerRender = ref(false);
		const { state, rangeArray } = usePickerState(props);
		const { system, selectorTypeComputed, _show, _l10nColumn, _l10nItem, _input, _fixInputPosition, _pickerViewChange, _cancel, _change, _resetFormData, _getFormData, _createTime, _createDate, _setValueSync } = usePickerMethods(props, state, useCustomEvent(rootRef, emit), rootRef, pickerRef, selectRef, inputRef);
		usePickerWatch(state, _cancel, _change);
		usePickerForm(_resetFormData, _getFormData);
		_createTime();
		_createDate();
		_setValueSync();
		const popup = usePopupStyle(state);
		watchEffect(() => {
			state.isDesktop = popup.isDesktop.value;
			state.popupStyle = popup.popupStyle.value;
		});
		onBeforeUnmount(() => {
			pickerRef.value && pickerRef.value.remove();
		});
		onMounted(() => {
			pickerRender.value = true;
		});
		onMounted(() => {
			rootRef.value.attachVmProps(props);
		});
		return () => {
			let _slot2;
			const { visible, contentVisible, valueArray, popupStyle, valueSync } = state;
			const { rangeKey, mode, start, end } = props;
			const booleanAttrs = useBooleanAttr(props, "disabled");
			return createVNode("uni-picker", mergeProps({ "ref": rootRef }, booleanAttrs, { "onClick": withWebEvent(_show) }), [
				pickerRender.value ? createVNode("div", {
					"ref": pickerRef,
					"class": ["uni-picker-container", `uni-${mode}-${selectorTypeComputed.value}`],
					"onWheel": onEventPrevent,
					"onTouchmove": onEventPrevent
				}, [createVNode(Transition, { "name": "uni-fade" }, { default: () => [withDirectives(createVNode("div", {
					"class": "uni-mask uni-picker-mask",
					"onClick": withWebEvent(_cancel),
					"onMousemove": _fixInputPosition
				}, null, 40, ["onClick", "onMousemove"]), [[vShow, visible]])] }), !system.value ? createVNode("div", {
					"class": [{ "uni-picker-toggle": visible }, "uni-picker-custom"],
					"style": popupStyle.content
				}, [
					createVNode("div", {
						"class": "uni-picker-header",
						"onClick": onEventStop
					}, [createVNode("div", {
						"class": "uni-picker-action uni-picker-action-cancel",
						"onClick": withWebEvent(_cancel)
					}, [t("uni.picker.cancel")], 8, ["onClick"]), createVNode("div", {
						"class": "uni-picker-action uni-picker-action-confirm",
						"onClick": _change
					}, [t("uni.picker.done")], 8, ["onClick"])], 8, ["onClick"]),
					contentVisible ? createVNode(picker_view_default, {
						"value": _l10nColumn(valueArray),
						"class": "uni-picker-content",
						"onChange": _pickerViewChange
					}, _isSlot(_slot2 = renderList(_l10nColumn(rangeArray.value), (rangeItem, index0) => {
						let _slot;
						return createVNode(picker_view_column_default, { "key": index0 }, _isSlot(_slot = renderList(rangeItem, (item, index) => createVNode("div", {
							"key": index,
							"class": "uni-picker-item"
						}, [typeof item === "object" ? item[rangeKey] || "" : _l10nItem(item, index0)]))) ? _slot : {
							default: () => [_slot],
							_: 1
						});
					})) ? _slot2 : {
						default: () => [_slot2],
						_: 1
					}, 8, ["value", "onChange"]) : null,
					createVNode("div", {
						"ref": selectRef,
						"class": "uni-picker-select",
						"onWheel": onEventStop,
						"onTouchmove": onEventStop
					}, [renderList(rangeArray.value[0], (item, index) => createVNode("div", {
						"key": index,
						"class": ["uni-picker-item", { selected: valueArray[0] === index }],
						"onClick": () => {
							valueArray[0] = index;
							_change();
						}
					}, [typeof item === "object" ? item[rangeKey] || "" : item], 10, ["onClick"]))], 40, ["onWheel", "onTouchmove"]),
					createVNode("div", { "style": popupStyle.triangle }, null, 4)
				], 6) : null], 42, ["onWheel", "onTouchmove"]) : null,
				createVNode("div", null, [slots.default && slots.default()]),
				system.value ? createVNode("div", {
					"class": "uni-picker-system",
					"onMousemove": withWebEvent(_fixInputPosition)
				}, [createVNode("input", {
					"class": ["uni-picker-system_input", system.value],
					"ref": inputRef,
					"value": valueSync,
					"type": mode,
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
function usePickerState(props) {
	const state = reactive({
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
		rangeArray: computed(() => {
			let val = props.range;
			switch (props.mode) {
				case mode.SELECTOR: return [val];
				case mode.MULTISELECTOR: return val;
				case mode.TIME: return state.timeArray;
				case mode.DATE: {
					const dateArray = state.dateArray;
					switch (props.fields) {
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
var getiPadFlag = () => String(navigator.vendor).indexOf("Apple") === 0 && navigator.maxTouchPoints > 0;
function useIsiPad() {
	const isiPad = ref(false);
	isiPad.value = getiPadFlag();
	return isiPad;
}
var getSystem = () => {
	if (/win|mac/i.test(navigator.platform)) {
		if (navigator.vendor === "Google Inc.") return "chrome";
		else if (/Firefox/.test(navigator.userAgent)) return "firefox";
	}
	return "";
};
function useSystem() {
	const _system = ref("");
	_system.value = getSystem();
	return _system;
}
var __contentVisibleDelay;
function usePickerMethods(props, state, trigger, rootRef, pickerRef, selectRef, inputRef) {
	const isiPad = useIsiPad();
	const _system = useSystem();
	const selectorTypeComputed = computed(() => {
		const type = props.selectorType;
		if (Object.values(selectorType).includes(type)) return type;
		return isiPad.value ? selectorType.PICKER : selectorType.SELECT;
	});
	const system = computed(() => {
		if (props.mode === mode.DATE && !Object.values(fields).includes(props.fields) && state.isDesktop) return _system.value;
		return "";
	});
	const startArray = computed(() => {
		return getDateValueArray(props, state, props.start, getDefaultStartValue(props));
	});
	const endArray = computed(() => {
		return getDateValueArray(props, state, props.end, getDefaultEndValue(props));
	});
	function _show(event) {
		if (props.disabled) return;
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
			key: props.name
		};
	}
	function _resetFormData() {
		switch (props.mode) {
			case mode.SELECTOR:
				state.valueSync = 0;
				break;
			case mode.MULTISELECTOR:
				state.valueSync = props.value.map((val) => 0);
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
		if (props.start) {
			const _year = new Date(props.start).getFullYear();
			if (!isNaN(_year) && _year < start) start = _year;
		}
		if (props.end) {
			const _year = new Date(props.end).getFullYear();
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
	/**
	* 将右侧数组值同步到左侧（交集部分）
	*/
	function _cloneArray(val1, val2) {
		for (let i = 0; i < val1.length && i < val2.length; i++) val1[i] = val2[i];
	}
	function _setValueSync() {
		let val = props.value;
		switch (props.mode) {
			case mode.MULTISELECTOR:
				{
					if (!isArray(val)) val = state.valueArray;
					if (!isArray(state.valueSync)) state.valueSync = [];
					const length = state.valueSync.length = Math.max(val.length, props.range.length);
					for (let index = 0; index < length; index++) {
						const val0 = Number(val[index]);
						const val1 = Number(state.valueSync[index]);
						const val2 = isNaN(val0) ? isNaN(val1) ? 0 : val1 : val0;
						const maxVal = props.range[index] ? props.range[index].length - 1 : 0;
						state.valueSync.splice(index, 1, val2 < 0 || val2 > maxVal ? 0 : val2);
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
		switch (props.mode) {
			case mode.MULTISELECTOR:
				valueArray = [...val];
				break;
			case mode.TIME:
				valueArray = getDateValueArray(props, state, val, formatDateTime({ mode: mode.TIME }));
				break;
			case mode.DATE:
				valueArray = getDateValueArray(props, state, val, formatDateTime({ mode: mode.DATE }));
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
		switch (props.mode) {
			case mode.SELECTOR: return val[0];
			case mode.MULTISELECTOR: return val.map((val) => val);
			case mode.TIME: return state.valueArray.map((val, i) => state.timeArray[i][val]).join(":");
			case mode.DATE: return state.valueArray.map((val, i) => state.dateArray[i][val]).join("-");
		}
	}
	function _change() {
		_close();
		state.valueChangeSource = "click";
		const value = _getValue();
		state.valueSync = isArray(value) ? value.map((val) => val) : value;
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
		if (props.mode === mode.SELECTOR && selectorTypeComputed.value === selectorType.SELECT) selectRef.value.scrollTop = state.valueArray[0] * 34;
	}
	function _input($event) {
		state.valueSync = $event.target.value;
		nextTick(() => {
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
		const { getLocale } = useI18n();
		if (props.mode === mode.DATE) {
			const locale = getLocale();
			if (!locale.startsWith("zh")) switch (props.fields) {
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
	function _l10nItem(item, index) {
		const { getLocale } = useI18n();
		if (props.mode === mode.DATE) {
			const locale = getLocale();
			if (locale.startsWith("zh")) return item + [
				"年",
				"月",
				"日"
			][index];
			else if (props.fields !== fields.YEAR && index === (props.fields !== fields.MONTH && (locale === "es" || locale === "fr") ? 1 : 0)) {
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
	watch(() => state.visible, (val) => {
		if (val) {
			clearTimeout(__contentVisibleDelay);
			state.contentVisible = val;
			_select();
		} else __contentVisibleDelay = setTimeout(() => {
			state.contentVisible = val;
		}, 300);
	});
	watch([
		() => props.mode,
		() => props.value,
		() => props.range
	], _setValueSync, { deep: true });
	watch(() => state.valueSync, _setValueArray, { deep: true });
	watch(() => state.valueArray, (val) => {
		if (props.mode === mode.TIME || props.mode === mode.DATE) {
			const getValue = props.mode === mode.TIME ? _getTimeValue : _getDateValue;
			const valueArray = state.valueArray;
			const _startArray = startArray.value;
			const _endArray = endArray.value;
			if (props.mode === mode.DATE) {
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
				if (props.mode === mode.MULTISELECTOR) trigger("columnchange", {}, {
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
	watchEffect(() => {
		disable.value = !state.visible;
	});
	watch(key, (value) => {
		if (value === "esc") _cancel();
		else if (value === "enter") _change();
	});
}
function usePickerForm(_resetFormData, _getFormData) {
	const uniForm = inject(uniFormKey, false);
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
		onBeforeUnmount(() => {
			uniForm.removeField(field);
		});
	}
}
//#endregion
//#region src/view/components/ad/index.tsx
var AdConfig = class AdConfig {
	static get instance() {
		if (!AdConfig._instance) {
			AdConfig._instance = new AdConfig();
			AdConfig._instance._init();
		}
		return AdConfig._instance;
	}
	constructor() {
		this._adConfig = null;
		this._isLoading = false;
		this._callbacks = [];
		this._configLast = 0;
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
					this._callbacks.forEach(({ adpid, success, fail }) => {
						this._doCallback(adpid, success, fail);
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
AdConfig.IC = 0;
AdConfig.IS = 0;
AdConfig.URL = "https://hac1.dcloud.net.cn/ah5v2";
AdConfig.KEY = "uni_app_ad_config";
AdConfig.CACHE_TIME = 1e3 * 60 * 10;
AdConfig.ERROR_INVALID_ADPID = { "-5002": "invalid adpid" };
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
AdReport.URL = "https://has1.dcloud.net.cn/ahl";
AdReport.KEY = "uni_app_ad_guid";
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
	constructor(props, trigger, rootRef, options) {
		this._pi = 0;
		this._pl = [];
		this._b = {};
		this._checkTimerCount = 0;
		this._currentChannel = null;
		this._tuiaData = null;
		this._checkTimer = null;
		this._adpid = props.adpid;
		this._adpidWidescreen = props.adpidWidescreen;
		this._widescreenWidth = props.widescreenWidth;
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
		const id = this._randomId();
		this._createView(id);
		if (providerId === AD_PROVIDER.GDT) {
			window.TencentGDT = window.TencentGDT || [];
			AdScript.instance.load({
				provider: providerId,
				script
			}, () => {
				this._renderGdt(id, data);
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
				this._renderTuiaMaterial(id, data);
			}, (err) => {
				this._trigger("error", {}, err);
				this._renderNext();
			});
			return;
		}
		this._renderNext();
	}
	_createView(id) {
		if (!this._rootRef.value) return null;
		var adView = document.createElement("div");
		adView.setAttribute("id", id);
		adView.setAttribute("class", id);
		this._rootRef.value.innerHTML = "";
		this._rootRef.value.append(adView);
		return adView;
	}
	_renderGdt(id, data) {
		window.TencentGDT.push({
			placement_id: data.a3,
			app_id: data.a2,
			type: "native",
			count: 1,
			onComplete: (res) => {
				if (res && res.constructor === Array && res.length > 0) {
					window.TencentGDT.NATIVE.renderAd(res[0], id);
					this._trigger("load", {}, {});
				} else {
					this._trigger("error", {}, res || { errMsg: "No advertisement" });
					this._renderNext();
				}
			}
		});
		this._startCheckTimer();
	}
	_renderTuiaMaterial(id, data) {
		const adView = document.getElementById(id);
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
var ad_default = /*#__PURE__*/ defineBuiltInComponent({
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
			default: 750
		}
	},
	setup(props, { emit, slots }) {
		const rootRef = ref(null);
		const customTuiaVisible = ref(false);
		const { $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
		const ad = new AdRender(props, useCustomEvent(rootRef, emit), rootRef, {
			hasCustomTuiaMaterial: () => Boolean(slots.default && slots.default().length),
			setCustomTuiaVisible: (visible) => {
				customTuiaVisible.value = visible;
			}
		});
		watch(() => props.adpid, (val) => {
			ad.load(val);
		});
		watch(() => props.adpidWidescreen, (val) => {
			ad.load(val);
		});
		onMounted(() => {
			const compilerVersion = typeof __uniConfig !== "undefined" ? __uniConfig.compilerVersion ?? "" : "";
			ad.load(null);
			AdReport.instance.get({
				h: compilerVersion,
				a: props.adpid,
				at: -3,
				ic: AdConfig.IC,
				is: AdConfig.IS
			});
		});
		onBeforeUnmount(() => {
			ad.dispose();
		});
		return () => {
			const { adpid, adpidWidescreen, widescreenWidth } = props;
			return createVNode(Fragment, null, [createVNode("uni-ad", mergeProps($listeners.value, $excludeAttrs.value, {
				"adpid": adpid,
				"adpidWidescreen": adpidWidescreen,
				"widescreenWidth": widescreenWidth
			}), [createVNode("div", {
				"ref": rootRef,
				"class": "uni-ad-container",
				"onClick": () => ad.report(41)
			}, null, 8, ["onClick"]), customTuiaVisible.value && slots.default ? createVNode("div", {
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
//#endregion
//#region src/view/components/ad-content-page/index.tsx
var ad_content_page_default = /*#__PURE__*/ defineUnsupportedComponent("ad-content-page");
//#endregion
//#region src/view/components/ad-draw/index.tsx
var ad_draw_default = /*#__PURE__*/ defineUnsupportedComponent("ad-draw");
//#endregion
//#region src/view/components/camera/index.tsx
var camera_default = /*#__PURE__*/ defineUnsupportedComponent("camera");
//#endregion
//#region src/view/components/live-player/index.tsx
var live_player_default = /*#__PURE__*/ defineUnsupportedComponent("live-player");
//#endregion
//#region src/view/components/live-pusher/index.tsx
var live_pusher_default = /*#__PURE__*/ defineUnsupportedComponent("live-pusher");
//#endregion
//#region ../../uni-ext-api/uni_modules/uni-match-media/customElements/uni-match-media/uni-match-media.uts.ts
var RE_MQ_FEATURE = /^(min|max)?([A-Z]?[a-z]+)(?:([A-Z])([a-z]+))?$/;
var UniMatchMediaElement = class UniMatchMediaElement extends UniViewElement {
	static get observedAttributes() {
		return [
			"orientation",
			"width",
			"minWidth",
			"maxWidth",
			"height",
			"minHeight",
			"maxHeight"
		];
	}
	constructor() {
		super();
		_defineProperty(this, "_expressions", []);
	}
	connectedCallback() {
		this._expressions = this.getExpressions();
		this.uniPage.vm.$.$waitNativeRender(() => {
			this.toggleElement(this.isValid({
				width: this.uniPage.pageBody.width,
				height: this.uniPage.pageBody.height,
				orientation: uni.getDeviceInfo().deviceOrientation
			}));
		});
		onResize((res) => {
			this.toggleElement(this.isValid({
				orientation: res.deviceOrientation,
				width: res.size.windowWidth,
				height: res.size.windowHeight
			}));
		}, this.uniPage.vm.$);
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (this._expressions.length == 0 || newValue == null) return;
		const matches = name.match(RE_MQ_FEATURE);
		if (matches == null || matches.length == 0) return;
		const modifier = matches[1] != null ? matches[1] : "";
		const feature = matches[2] != null ? matches[2].toLowerCase() : "";
		const expression = this._expressions.find((expr) => expr.feature == feature && expr.modifier == modifier);
		if (expression == null) return;
		expression.value = newValue;
		this.toggleElement(this.isValid({
			width: this.uniPage.pageBody.width,
			height: this.uniPage.pageBody.height,
			orientation: uni.getDeviceInfo().deviceOrientation
		}));
	}
	getExpressions() {
		const expressions = [];
		UniMatchMediaElement.observedAttributes.forEach((key) => {
			const value = this.getAttribute(key);
			const feature = key.match(RE_MQ_FEATURE);
			if (value != null && feature != null && feature.length > 0) expressions.push({
				modifier: feature[1] != null ? feature[1] : "",
				feature: feature[2] != null ? feature[2].toLowerCase() : "",
				value
			});
		});
		return expressions;
	}
	toggleElement(show) {
		this.style.setProperty("display", show ? "flex" : "none");
	}
	isValid(values) {
		return this._expressions.every((expression) => {
			switch (expression.feature) {
				case "orientation": return values[expression.feature] === this.getAttribute(expression.feature);
				case "width":
				case "height": break;
			}
			const expressionValue = values[expression.feature];
			switch (expression.modifier) {
				case "min": return parseFloat(expression.value) <= expressionValue;
				case "max": return parseFloat(expression.value) >= expressionValue;
				default: return parseFloat(expression.value) === expressionValue;
			}
		});
	}
};
//#endregion
//#region src/x/view/components/customElements.ts
var MatchMedia = /*#__PURE__*/ (() => {
	customElements.define("uni-match-media", UniMatchMediaElement);
	return "uni-match-media";
})();
//#endregion
//#region src/view/bridge/index.ts
var UniViewJSBridge$1 = /*#__PURE__*/ extend(ViewJSBridge, { publishHandler(event, args, pageId) {
	UniServiceJSBridge.subscribeHandler(event, args, pageId);
} });
//#endregion
//#region src/x/service/api/element/getElementById.ts
var getElementById = /*#__PURE__*/ defineSyncApi("getElementById", (id) => {
	const uniPageBody = document.querySelector("uni-page-body");
	return uniPageBody ? uniPageBody.querySelector(`#${id}`) : null;
});
//#endregion
//#region src/x/service/api/route/utils.ts
function closePreSystemDialogPage(dialogPages, type) {
	const targetSystemDialogPages = dialogPages.filter((page) => page.route.startsWith(type));
	if (targetSystemDialogPages.length > 1) setTimeout(() => {
		dialogPages.splice(dialogPages.indexOf(targetSystemDialogPages[0]), 1);
	}, 150);
}
//#endregion
//#region src/x/service/api/route/openDialogPage.ts
var openDialogPage = (options) => {
	var _options$success, _options$complete;
	if (!options.url) {
		triggerFailCallback(options, "url is required");
		return null;
	}
	let { path, query } = parseUrl(options.url);
	path = normalizeRoute(path);
	const errMsg = createNormalizeUrl("navigateTo")(options.url, {});
	if (errMsg) {
		triggerFailCallback(options, errMsg);
		return null;
	}
	const targetRoute = __uniRoutes.find((route) => {
		return route.path === path || `/${route.meta.route}` === path;
	});
	const dialogPage = markRaw(new UniDialogPageImpl({
		route: removeLeadingSlash(path),
		options: new UTSJSONObject$1(query),
		$component: targetRoute.component,
		getParentPage: () => null,
		$disableEscBack: options.disableEscBack,
		$triggerParentHide: !!options.triggerParentHide
	}));
	let parentPage = options.parentPage;
	const currentPages = getCurrentPages();
	if (parentPage) {
		if (currentPages.indexOf(parentPage) === -1) {
			triggerFailCallback(options, "parentPage is not a valid page");
			return null;
		}
	}
	if (!isSystemDialogPage(dialogPage)) {
		if (!currentPages.length) homeDialogPages.push(dialogPage);
		else {
			if (!parentPage) parentPage = currentPages[currentPages.length - 1];
			dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_HIDE);
			dialogPage.getParentPage = () => parentPage;
			parentPage.getDialogPages().push(dialogPage);
		}
		if (!options.disableEscBack) incrementEscBackPageNum();
	} else {
		let targetSystemDialogPages = [];
		if (!currentPages.length) targetSystemDialogPages = homeSystemDialogPages;
		else {
			var _vm$$pageLayoutInstan;
			if (!parentPage) parentPage = currentPages[currentPages.length - 1];
			dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_HIDE);
			dialogPage.getParentPage = () => parentPage;
			targetSystemDialogPages = (_vm$$pageLayoutInstan = parentPage.vm.$pageLayoutInstance) === null || _vm$$pageLayoutInstan === void 0 ? void 0 : _vm$$pageLayoutInstan.$systemDialogPages.value;
		}
		targetSystemDialogPages.push(dialogPage);
		if (isSystemActionSheetDialogPage(dialogPage)) closePreSystemDialogPage(targetSystemDialogPages, SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH$1);
	}
	const successOptions = { errMsg: "openDialogPage:ok" };
	(_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, successOptions);
	(_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options, successOptions);
	return dialogPage;
};
function triggerFailCallback(options, errMsg) {
	var _options$fail, _options$complete2;
	const failOptions = new UniError("uni-openDialogPage", 4, `openDialogPage: fail, ${errMsg}`);
	(_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, failOptions);
	(_options$complete2 = options.complete) === null || _options$complete2 === void 0 || _options$complete2.call(options, failOptions);
}
//#endregion
//#region ../../uni-ext-apiuni:actionSheet.vue
var actionSheet_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "actionSheet",
	setup(__props) {
		const uniPageInstance = getCurrentInstance().proxy.$page;
		const show = ref(false);
		const i18nCancelText = reactive({
			en: "Cancel",
			es: "Cancelar",
			fr: "Annuler",
			zhHans: "取消",
			zhHant: "取消"
		});
		const readyEventName = ref("");
		const optionsEventName = ref("");
		const successEventName = ref("");
		const failEventName = ref("");
		const title = ref(null);
		const itemList = ref([]);
		const optionCancelText = ref(null);
		const titleColor = ref(null);
		const itemColor = ref(null);
		const cancelColor = ref(null);
		const backgroundColor = ref(null);
		const language = ref("zhHans");
		const theme = ref("light");
		const isLandscape = ref(false);
		const bottomNavigationHeight = ref(0);
		const appTheme = ref(null);
		const hostTheme = ref(null);
		const menuItemClicked = ref(false);
		const cancelButtonClicked = ref(false);
		const windowWidth = ref(0);
		const windowHeight = ref(0);
		const popover = reactive({});
		const fixSize = () => {
			const systemInfo = uni.getSystemInfoSync();
			windowWidth.value = systemInfo.windowWidth;
			windowHeight.value = systemInfo.windowHeight + (systemInfo.windowTop || 0);
		};
		const closeActionSheet = () => {
			show.value = false;
			setTimeout(() => {
				uni.closeDialogPage({ dialogPage: uniPageInstance });
			}, 250);
		};
		const handleMenuItemClick = (tapIndex) => {
			menuItemClicked.value = true;
			closeActionSheet();
			uni.$emit(successEventName.value, tapIndex);
		};
		const handleCancel = () => {
			cancelButtonClicked.value = true;
			closeActionSheet();
			uni.$emit(failEventName.value, {});
		};
		const handleThemeChange = () => {
			if (hostTheme.value != null) theme.value = hostTheme.value;
			else if (appTheme.value != null) theme.value = appTheme.value;
		};
		onLoad((options) => {
			readyEventName.value = options["readyEventName"];
			optionsEventName.value = options["optionsEventName"];
			successEventName.value = options["successEventName"];
			failEventName.value = options["failEventName"];
			uni.$on(optionsEventName.value, (data) => {
				itemList.value = data["itemList"];
				if (data["title"] != null) title.value = data["title"];
				if (data["cancelText"] != null) optionCancelText.value = data["cancelText"];
				if (data["titleColor"] != null) titleColor.value = data["titleColor"];
				if (data["itemColor"] != null) itemColor.value = data["itemColor"];
				if (data["cancelColor"] != null) cancelColor.value = data["cancelColor"];
				if (data["backgroundColor"] != null) backgroundColor.value = data["backgroundColor"];
				if (data["popover"] != null) popover.value = data["popover"];
			});
			uni.$emit(readyEventName.value, {});
			const systemInfo = uni.getSystemInfoSync();
			const osLanguage = systemInfo.osLanguage;
			const appLanguage = systemInfo.appLanguage;
			if (appLanguage != null) language.value = appLanguage;
			else if (osLanguage != null) language.value = osLanguage;
			const systemAppTheme = systemInfo.appTheme;
			if (systemAppTheme != null && systemAppTheme != "auto") {
				appTheme.value = systemAppTheme;
				handleThemeChange();
			}
			const systemOsTheme = systemInfo.osTheme;
			if (systemOsTheme != null && appTheme.value == null) {
				appTheme.value = systemOsTheme;
				handleThemeChange();
			}
			const systemHostTheme = systemInfo.hostTheme;
			if (systemHostTheme != null) {
				hostTheme.value = systemHostTheme;
				handleThemeChange();
			}
			uni.onHostThemeChange((res) => {
				hostTheme.value = res.theme;
				handleThemeChange();
			});
			windowWidth.value = systemInfo.windowWidth;
			windowHeight.value = systemInfo.windowHeight;
			window.addEventListener("resize", fixSize);
			language.value = uni.getLocale();
			uni.onLocaleChange((res) => {
				if (res.locale) language.value = res.locale;
			});
			isLandscape.value = systemInfo.deviceOrientation == "landscape";
		});
		const isWidescreen = computed(() => {
			return windowHeight.value >= 500 && windowWidth.value >= 500;
		});
		const containerStyle = computed(() => {
			if (Object.keys(popover).length == 0) return {};
			const res = { transform: "none !important" };
			const top = popover.top;
			const left = popover.left;
			const width = popover.width;
			const height = popover.height;
			const center = left + width / 2;
			res["left"] = `${Math.max(0, center - 300 / 2)}px`;
			const vcl = windowHeight.value / 2;
			if (top + height - vcl > vcl - top) {
				res["top"] = "auto";
				res["bottom"] = `${windowHeight.value - top + 6}px`;
			} else res["top"] = `${top + height + 6}px`;
			return res;
		});
		const triangleStyle = computed(() => {
			if (Object.keys(popover).length == 0) return {};
			const res = {};
			const borderColor = backgroundColor.value || (theme.value == "dark" ? "#2C2C2B" : "#fcfcfd");
			const top = popover.top;
			const left = popover.left;
			const width = popover.width;
			const height = popover.height;
			const center = left + width / 2;
			const contentLeft = Math.max(0, center - 300 / 2);
			let triangleLeft = Math.max(12, center - contentLeft);
			triangleLeft = Math.min(288, triangleLeft);
			res["left"] = `${triangleLeft}px`;
			const vcl = windowHeight.value / 2;
			if (top + height - vcl > vcl - top) {
				res["bottom"] = "-6px";
				res["border-width"] = "6px 6px 0 6px";
				res["border-color"] = `${borderColor} transparent transparent transparent`;
			} else {
				res["top"] = "-6px";
				res["border-width"] = "0 6px 6px 6px";
				res["border-color"] = `transparent transparent ${borderColor} transparent`;
			}
			return res;
		});
		const cancelText = computed(() => {
			if (optionCancelText.value != null) return optionCancelText.value;
			if (language.value.startsWith("en")) return i18nCancelText["en"];
			if (language.value.startsWith("es")) return i18nCancelText["es"];
			if (language.value.startsWith("fr")) return i18nCancelText["fr"];
			if (language.value.startsWith("zhHans")) return i18nCancelText["zhHans"];
			if (language.value.startsWith("zhHant")) return i18nCancelText["zhHant"];
			return "取消";
		});
		const computedBackgroundColor = computed(() => {
			return backgroundColor.value !== null ? backgroundColor.value : theme.value == "dark" ? "#2C2C2B" : "#ffffff";
		});
		const hoverClass = computed(() => {
			return theme.value == "dark" ? "uni-action-sheet_dialog__hover__dark__mode" : "uni-action-sheet_dialog__hover";
		});
		onReady(() => {
			bottomNavigationHeight.value = uniPageInstance.safeAreaInsets.bottom;
			setTimeout(() => {
				show.value = true;
			}, 10);
		});
		onResize((_) => {
			isLandscape.value = uni.getSystemInfoSync().deviceOrientation == "landscape";
		});
		onBeforeUnmount(() => {
			if (!menuItemClicked.value && !cancelButtonClicked.value) uni.$emit(failEventName.value, {});
			uni.$off(optionsEventName.value, null);
			uni.$off(readyEventName.value, null);
			uni.$off(successEventName.value, null);
			uni.$off(failEventName.value, null);
			window.removeEventListener("resize", fixSize);
		});
		return (_ctx, _cache) => {
			const _component_view = view_default;
			const _component_text = text_default;
			return openBlock(), createBlock(_component_view, null, {
				default: withCtx(() => [createVNode(_component_view, {
					class: normalizeClass(["uni-action-sheet_dialog__mask", { "uni-action-sheet_dialog__mask__show": show.value }]),
					onClick: handleCancel
				}, null, 8, ["class"]), createVNode(_component_view, {
					style: normalizeStyle(isWidescreen.value ? containerStyle.value : {}),
					class: normalizeClass(["uni-action-sheet_dialog__container", {
						"uni-action-sheet_dialog__show": show.value,
						"uni-action-sheet_dark__mode": theme.value == "dark",
						"uni-action-sheet_landscape__mode": isLandscape.value
					}])
				}, {
					default: withCtx(() => [
						createVNode(_component_view, {
							style: normalizeStyle(backgroundColor.value != null ? { backgroundColor: backgroundColor.value } : {}),
							class: normalizeClass(["uni-action-sheet_dialog__menu", {
								"uni-action-sheet_dark__mode": theme.value == "dark",
								"uni-action-sheet_landscape__mode": isLandscape.value
							}])
						}, {
							default: withCtx(() => [title.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(_component_view, { class: normalizeClass(["uni-action-sheet_dialog__title border-b", {
								"uni-action-sheet_dark__mode": theme.value == "dark",
								"uni-action-sheet_landscape__mode": isLandscape.value
							}]) }, {
								default: withCtx(() => [createVNode(_component_text, {
									style: normalizeStyle(titleColor.value != null ? { color: titleColor.value } : {}),
									class: normalizeClass(["uni-action-sheet_dialog__title__text", { "uni-action-sheet_dark__mode": theme.value == "dark" }])
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(title.value), 1)]),
									_: 1
								}, 8, ["style", "class"])]),
								_: 1
							}, 8, ["class"]), createVNode(_component_view, { class: normalizeClass(["divider", { "uni-action-sheet_dark__mode": theme.value == "dark" }]) }, null, 8, ["class"])], 64)) : createCommentVNode("", true), createVNode(_component_view, { class: normalizeClass(["uni-action-sheet_dialog__cell__container", { "uni-action-sheet_landscape__mode": isLandscape.value }]) }, {
								default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(itemList.value, (item, index) => {
									return openBlock(), createElementBlock(Fragment, { key: index }, [index !== 0 ? (openBlock(), createBlock(_component_view, {
										key: 0,
										class: normalizeClass(["divider", { "uni-action-sheet_dark__mode": theme.value == "dark" }])
									}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(_component_view, {
										class: normalizeClass(["uni-action-sheet_dialog__cell", {
											"uni-action-sheet_dark__mode": theme.value == "dark",
											"uni-action-sheet_landscape__mode": isLandscape.value,
											"border-t": index !== 0
										}]),
										"hover-class": hoverClass.value,
										onClick: ($event) => handleMenuItemClick(index)
									}, {
										default: withCtx(() => [createVNode(_component_text, {
											style: normalizeStyle(itemColor.value != null ? { color: itemColor.value } : {}),
											class: normalizeClass(["uni-action-sheet_dialog__cell__text", { "uni-action-sheet_dark__mode": theme.value == "dark" }])
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(item), 1)]),
											_: 2
										}, 1032, ["style", "class"])]),
										_: 2
									}, 1032, [
										"class",
										"hover-class",
										"onClick"
									])], 64);
								}), 128))]),
								_: 1
							}, 8, ["class"])]),
							_: 1
						}, 8, ["style", "class"]),
						createVNode(_component_view, {
							style: normalizeStyle(backgroundColor.value != null ? { backgroundColor: backgroundColor.value } : {}),
							class: normalizeClass(["uni-action-sheet_dialog__action", {
								"uni-action-sheet_dark__mode": theme.value == "dark",
								"uni-action-sheet_landscape__mode": isLandscape.value
							}]),
							"hover-class": hoverClass.value,
							onClick: handleCancel
						}, {
							default: withCtx(() => [createVNode(_component_text, {
								style: normalizeStyle(cancelColor.value != null ? { color: cancelColor.value } : {}),
								class: normalizeClass(["uni-action-sheet_dialog__action__text", { "uni-action-sheet_dark__mode": theme.value == "dark" }])
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(cancelText.value), 1)]),
								_: 1
							}, 8, ["style", "class"])]),
							_: 1
						}, 8, [
							"style",
							"class",
							"hover-class"
						]),
						!isLandscape.value ? (openBlock(), createBlock(_component_view, {
							key: 0,
							style: normalizeStyle({
								height: `${bottomNavigationHeight.value}px`,
								backgroundColor: computedBackgroundColor.value
							})
						}, null, 8, ["style"])) : createCommentVNode("", true),
						isWidescreen.value && Object.keys(popover).length > 0 ? (openBlock(), createBlock(_component_view, {
							key: 1,
							style: normalizeStyle(triangleStyle.value),
							class: "uni-action-sheet_dialog__triangle"
						}, null, 8, ["style"])) : createCommentVNode("", true)
					]),
					_: 1
				}, 8, ["style", "class"])]),
				_: 1
			});
		};
	}
}), [["styles", ["\n.uni-action-sheet_dialog__mask {\n    position: fixed;\n    z-index: 999;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n    opacity: 0;\n    background-color: rgba(0, 0, 0, 0.6);\n    transition: opacity 0.1s;\n}\n.uni-action-sheet_dialog__mask__show {\n    opacity: 1;\n}\n.uni-action-sheet_dialog__container {\n    position: fixed;\n    width: 100%;\n    left: 0;\n    bottom: 0;\n    z-index: 999;\n    transform: translate(0, 100%);\n    transition-property: transform;\n    transition-duration: 0.15s;\n    background-color: #f7f7f7;\n    border-top-left-radius: 12px;\n    border-top-right-radius: 12px;\n}\n.uni-action-sheet_dialog__menu {\n    border-top-left-radius: 12px;\n    border-top-right-radius: 12px;\n    overflow: hidden;\n}\n.uni-action-sheet_dialog__container.uni-action-sheet_dialog__show {\n    transform: translate(0, 0);\n}\n.uni-action-sheet_dialog__title,\n  .uni-action-sheet_dialog__cell,\n  .uni-action-sheet_dialog__action {\n    padding: 16px;\n}\n.uni-action-sheet_dialog__title__text,\n  .uni-action-sheet_dialog__cell__text,\n  .uni-action-sheet_dialog__action__text {\n    line-height: 1.4;\n    text-align: center;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.uni-action-sheet_dialog__action {\n    margin-top: 8px;\n}\n.uni-action-sheet_dialog__title__text {\n    color: #666666;\n}\n.uni-action-sheet_dialog__cell__text,\n  .uni-action-sheet_dialog__action__text {\n    color: #000000;\n}\n.uni-action-sheet_dialog__menu,\n  .uni-action-sheet_dialog__action {\n    background-color: #ffffff;\n}\n.uni-action-sheet_dialog__cell__container {\n    max-height: 330px;\n\n    display: block;\n    overflow-y: auto;\n    scrollbar-width: none;\n}\n.uni-action-sheet_dialog__hover {\n		background-color: #efefef;\n}\n.uni-action-sheet_dialog__hover__dark__mode {\n		background-color: #1c1c1c;\n}\n.divider{\n    height: 1px;\n    background-color: #e5e5e5;\n    transform: scaleY(0.5);\n}\n.divider.uni-action-sheet_dark__mode {\n    background-color: #2F3131;\n}\n\n\n  /* dark mode */\n.uni-action-sheet_dialog__container.uni-action-sheet_dark__mode {\n    background-color: #1D1E1E;\n}\n.uni-action-sheet_dialog__menu.uni-action-sheet_dark__mode,\n  .uni-action-sheet_dialog__action.uni-action-sheet_dark__mode {\n    background-color: #2C2C2B;\n}\n.uni-action-sheet_dialog__title__text.uni-action-sheet_dark__mode {\n    color: #999999;\n}\n.uni-action-sheet_dialog__cell__text.uni-action-sheet_dark__mode,\n  .uni-action-sheet_dialog__action__text.uni-action-sheet_dark__mode {\n    color: #ffffff;\n}\n\n  /* landscape mode */\n.uni-action-sheet_dialog__container.uni-action-sheet_landscape__mode {\n    width: 300px;\n    position: fixed;\n    left: 50%;\n    right: auto;\n    top: 50%;\n    bottom: auto;\n    z-index: 999;\n    transform: translate(-50%, -50%);\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n    border-bottom-right-radius: 5px;\n}\n.uni-action-sheet_dialog__menu.uni-action-sheet_landscape__mode {\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n    border-bottom-right-radius: 5px;\n    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);\n}\n.uni-action-sheet_dialog__action.uni-action-sheet_landscape__mode {\n    display: none;\n}\n.uni-action-sheet_dialog__cell__container.uni-action-sheet_landscape__mode {\n    max-height: 260px;\n}\n.uni-action-sheet_dialog__title.uni-action-sheet_landscape__mode,\n  .uni-action-sheet_dialog__cell.uni-action-sheet_landscape__mode,\n  .uni-action-sheet_dialog__action.uni-action-sheet_landscape__mode {\n    padding: 10px 6px;\n}\n.uni-action-sheet_dialog__menu {\n    display: block;\n}\n.uni-action-sheet_dialog__title,\n  .uni-action-sheet_dialog__cell,\n  .uni-action-sheet_dialog__action {\n    display: block;\n    text-align: center;\n    line-height: 1.4;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.uni-action-sheet_dialog__cell,\n  .uni-action-sheet_dialog__action {\n    cursor: pointer;\n}\n.uni-action-sheet_dialog__triangle {\n    position: absolute;\n    width: 0;\n    height: 0;\n    margin-left: -6px;\n    border-style: solid;\n}\n  /* web wide screen */\n@media screen and (min-width: 500px) and (min-height: 500px) {\n.uni-action-sheet_dialog__mask {\n      background: none;\n}\n.uni-action-sheet_dialog__container {\n      width: 300px;\n      position: fixed;\n      left: 50%;\n      right: auto;\n      top: 50%;\n      bottom: auto;\n      z-index: 999;\n      border-radius: 5px;\n      transform: translate(-50%, -50%);\n      box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);\n}\n.uni-action-sheet_dialog__show {\n      transform: translate(-50%, -50%) !important;\n}\n.uni-action-sheet_dialog__menu {\n      border-radius: 5px;\n}\n.uni-action-sheet_dialog__cell__container {\n      max-height: 260px;\n}\n.uni-action-sheet_dialog__action {\n      display: none;\n}\n.uni-action-sheet_dialog__title {\n      font-size: 15px;\n}\n.uni-action-sheet_dialog__title,\n    .uni-action-sheet_dialog__cell,\n    .uni-action-sheet_dialog__action {\n      padding: 10px 6px;\n}\n}\n\n"]]]);
//#endregion
//#region ../../uni-ext-api/uni_modules/uni-actionSheet/utssdk/interface.uts.ts
var ShowActionSheetSuccessImpl = class {
	constructor(tapIndex, errMsg = "showActionSheet:ok") {
		_defineProperty(this, "tapIndex", void 0);
		_defineProperty(this, "errMsg", void 0);
		this.errMsg = errMsg;
		this.tapIndex = tapIndex;
	}
};
var ShowActionSheetFailImpl = class extends UniError {
	constructor(errMsg = "showActionSheet:fail cancel", errCode = 4) {
		super();
		_defineProperty(this, "errCode", void 0);
		this.errMsg = errMsg;
		this.errCode = errCode;
	}
};
//#endregion
//#region ../../uni-ext-api/uni_modules/uni-actionSheet/utssdk/index.uts.ts
var showActionSheet$1 = (options) => {
	const baseEventName = `uni_action_sheet_${`${Date.now()}${Math.floor(Math.random() * 1e7)}`}`;
	const readyEventName = `${baseEventName}_ready`;
	const optionsEventName = `${baseEventName}_options`;
	const successEventName = `${baseEventName}_success`;
	const failEventName = `${baseEventName}_fail`;
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)));
	});
	uni.$on(successEventName, (index) => {
		var _options$success, _options$complete;
		const res = new ShowActionSheetSuccessImpl(index);
		(_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, res);
		(_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options, res);
	});
	uni.$on(failEventName, () => {
		var _options$fail, _options$complete2;
		const res = new ShowActionSheetFailImpl();
		(_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, res);
		(_options$complete2 = options.complete) === null || _options$complete2 === void 0 || _options$complete2.call(options, res);
	});
	uni.openDialogPage({
		url: `uni:actionSheet?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail(err) {
			var _options$fail2, _options$complete3;
			const res = new ShowActionSheetFailImpl(`showActionSheet failed, ${err.errMsg}`);
			(_options$fail2 = options.fail) === null || _options$fail2 === void 0 || _options$fail2.call(options, res);
			(_options$complete3 = options.complete) === null || _options$complete3 === void 0 || _options$complete3.call(options, res);
			uni.$off(readyEventName);
			uni.$off(successEventName);
			uni.$off(failEventName);
		}
	});
};
var SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH = "uni:actionSheet";
var hideActionSheet$1 = () => {
	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1];
	if (currentPage == null) return;
	currentPage.$getSystemDialogPages().forEach((page) => {
		if (page.route.startsWith(SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH)) uni.closeDialogPage({ dialogPage: page });
	});
};
//#endregion
//#region src/x/service/api/pages/actionSheet.ts
var registerActionSheetOnce = /* @__PURE__ */ once(() => {
	registerSystemRoute("uni:actionSheet", actionSheet_default);
});
var hideActionSheet = () => {
	registerActionSheetOnce();
	hideActionSheet$1();
};
var showActionSheet = /*#__PURE__*/ defineAsyncApi(API_SHOW_ACTION_SHEET, (args, { resolve, reject }) => {
	registerActionSheetOnce();
	showActionSheet$1(extend({
		success: (res) => {
			resolve(res);
		},
		fail: (err) => {
			reject(err);
		}
	}, args));
});
//#endregion
//#region ../../uni-ext-apiuni:chooseLocation.vue
var chooseLocation_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "chooseLocation",
	setup(__props) {
		const defaultPoi = {
			latitude: 39.908823,
			longitude: 116.39747
		};
		const languageData = {
			"en": {
				"ok": "ok",
				"cancel": "cancel",
				"locationLoading": "positioning...",
				"search": "Search location"
			},
			"zh-Hans": {
				"ok": "确定",
				"cancel": "取消",
				"locationLoading": "获取定位中...",
				"search": "搜索地点"
			},
			"zh-Hant": {
				"ok": "確定",
				"cancel": "取消",
				"locationLoading": "獲取定位中...",
				"search": "蒐索地點"
			}
		};
		const currentInstance = getCurrentInstance().proxy;
		const uniPage = currentInstance.$page;
		const readyEventName = ref("");
		const optionsEventName = ref("");
		const successEventName = ref("");
		const failEventName = ref("");
		const mapId = ref(`UniMap1_${(Math.random() * 1e6).toString(36)}`);
		const isFocus = ref(false);
		const latitude = ref(0);
		const longitude = ref(0);
		const locationComplete = ref(false);
		const locationLoading = ref(false);
		const chooseLocationOptions = reactive({});
		const pageIndex = ref(1);
		const pageSize = ref(20);
		const pois = ref([]);
		const selected = ref(-1);
		const searchValue = ref("");
		const safeArea = reactive({
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		});
		const icon = reactive({
			target: "",
			success: "",
			position: "",
			search: ""
		});
		ref(0);
		const searchLoading = ref(false);
		const language = ref("zh-Hans");
		const scrollTop = ref(0);
		const isLandscape = ref(false);
		const theme = ref("light");
		const searchValueChangeTimer = ref(-1);
		const lastPoi = reactive({
			latitude: null,
			longitude: null,
			selected: -1,
			pois: [],
			scrollTop: 0
		});
		const errMsg = ref("");
		const callUniMapCoErr = ref(false);
		const useUniCloud = ref(true);
		const mapHeight = ref(350);
		const timeoutTimers = ref([]);
		const mapTargetRef = ref(null);
		const scrollRef = ref(null);
		const checkUniCloud = () => {
			if (typeof uniCloud == "undefined" || typeof uniCloud.config == "undefined" || uniCloud.config.spaceId == "") {
				errMsg.value = "uni.chooseLocation 依赖 uniCloud 的 uni-map-common 插件，请先关联服务空间，并安装 uni-map-common 插件，插件地址：https://ext.dcloud.net.cn/plugin?id=13872";
				useUniCloud.value = false;
				console.error(errMsg.value);
			}
		};
		const initPageOptions = (options) => {
			readyEventName.value = options["readyEventName"];
			optionsEventName.value = options["optionsEventName"];
			successEventName.value = options["successEventName"];
			failEventName.value = options["failEventName"];
			uni.$on(optionsEventName.value, (data) => {
				if (data["latitude"] != null) chooseLocationOptions.latitude = data["latitude"];
				if (data["longitude"] != null) chooseLocationOptions.longitude = data["longitude"];
				if (data["keyword"] != null) {
					let keyword = data["keyword"];
					chooseLocationOptions.keyword = keyword;
					searchValue.value = keyword;
				} else chooseLocationOptions.keyword = "";
				if (data["payload"] != null) chooseLocationOptions.payload = data["payload"];
			});
			uni.$emit(readyEventName.value, {});
		};
		const callUniMapCo = (action, data) => {
			let promise = new Promise((resolve, reject) => {
				if (useUniCloud.value == false) {
					reject(errMsg.value);
					return;
				}
				errMsg.value = "";
				const uniMapCo = uniCloud.importObject("uni-map-co", { customUI: true });
				let chooseLocationData = {
					action,
					data
				};
				if (chooseLocationOptions.payload != null) chooseLocationData["payload"] = chooseLocationOptions.payload;
				uniMapCo.chooseLocation(chooseLocationData).then((res) => {
					resolve(res);
				}).catch((err) => {
					if (err instanceof UniCloudError) {
						const cloudError = err;
						const errCode = cloudError.errCode;
						const errorMsg = cloudError.errMsg;
						const errSubject = cloudError.errSubject;
						if (errorMsg.indexOf("在云端不存在") > -1 || errorMsg.indexOf("未匹配") > -1) {
							errMsg.value = "uni.chooseLocation 依赖 uniCloud 的 uni-map-common 插件，请安装 uni-map-common 插件，插件地址：https://ext.dcloud.net.cn/plugin?id=13872";
							console.error(errMsg.value);
						} else {
							errMsg.value = errorMsg;
							console.error("获取POI信息失败，" + JSON.stringify({
								errCode,
								errMsg: errorMsg,
								errSubject
							}));
						}
					}
					reject(err);
				});
			});
			promise.then((res) => {
				callUniMapCoErr.value = false;
			}).catch((err) => {
				callUniMapCoErr.value = true;
			});
			return promise;
		};
		const calcDirection = (poi1, poi2) => {
			const toRadians = (angle) => angle * (Math.PI / 180);
			const toDegrees = (angle) => angle * (180 / Math.PI);
			const lat1 = toRadians(poi1.latitude);
			const lon1 = toRadians(poi1.longitude);
			const lat2 = toRadians(poi2.latitude);
			const dLon = toRadians(poi2.longitude) - lon1;
			const y = Math.sin(dLon) * Math.cos(lat2);
			const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
			let angle = toDegrees(Math.atan2(y, x));
			angle = (angle + 360) % 360;
			if (angle < 22.5 || angle >= 337.5) return "北";
			else if (angle >= 22.5 && angle < 67.5) return "东北";
			else if (angle >= 67.5 && angle < 112.5) return "东";
			else if (angle >= 112.5 && angle < 157.5) return "东南";
			else if (angle >= 157.5 && angle < 202.5) return "南";
			else if (angle >= 202.5 && angle < 247.5) return "西南";
			else if (angle >= 247.5 && angle < 292.5) return "西";
			else return "西北";
		};
		const distanceHandle = (distance) => {
			if (distance < 1e3) return distance + "m";
			else return parseFloat((distance / 1e3).toFixed(2)) + "km";
		};
		const safeSetTimeout = (callback, delay) => {
			let timerId = -1;
			timerId = setTimeout(() => {
				callback();
				const index = timeoutTimers.value.indexOf(timerId);
				if (index > -1) timeoutTimers.value.splice(index, 1);
			}, delay);
			timeoutTimers.value.push(timerId);
			return timerId;
		};
		const updateScrollTop = (scrollTopValue) => {
			safeSetTimeout(() => {
				scrollTop.value = scrollTopValue;
			}, 10);
		};
		const poiHandle = (poisData) => {
			let list = poisData.map((item, index) => {
				const location = item["location"];
				let distance = item["distance"];
				let lat = location["lat"];
				let lng = location["lng"];
				if (distance == 0) {
					lat = latitude.value;
					lng = longitude.value;
				}
				return {
					title: item["title"],
					address: item["address"],
					distance,
					distanceStr: distanceHandle(distance),
					location: {
						latitude: lat,
						longitude: lng
					}
				};
			});
			if (pageIndex.value == 1) {
				pois.value = list;
				updateScrollTop(0);
			} else pois.value = pois.value.concat(list);
		};
		const getPoi = (type) => {
			let searchVal = searchValue.value;
			let lat = latitude.value;
			let lng = longitude.value;
			let index = pageIndex.value;
			let size = pageSize.value;
			if (["searchValueChange"].indexOf(type) == -1) searchLoading.value = true;
			if (searchVal != "" && searchVal.length > 0) callUniMapCo("search", {
				keyword: searchVal,
				location: {
					lat,
					lng
				},
				radius: 5e3,
				auto_extend: 1,
				orderby: "weight",
				page_index: index,
				page_size: size
			}).then((res) => {
				var _res$getJSON;
				poiHandle((_res$getJSON = res.getJSON("result")) === null || _res$getJSON === void 0 || (_res$getJSON = _res$getJSON.getJSON("result")) === null || _res$getJSON === void 0 ? void 0 : _res$getJSON.getArray("data"));
				searchLoading.value = false;
			}).catch((err) => {
				searchLoading.value = false;
			});
			else callUniMapCo("location2address", {
				location: `${lat},${lng}`,
				get_poi: 1,
				poi_options: {
					radius: 3e3,
					policy: index == 1 ? 3 : 4,
					roadlevel: 1,
					homeorcorp: 1,
					page_index: index,
					page_size: size
				}
			}).then((res) => {
				var _res$getJSON2;
				poiHandle((_res$getJSON2 = res.getJSON("result")) === null || _res$getJSON2 === void 0 || (_res$getJSON2 = _res$getJSON2.getJSON("result")) === null || _res$getJSON2 === void 0 ? void 0 : _res$getJSON2.getArray("pois"));
				if (pois.value.length > 0 && index == 1) {
					let poi = pois.value[0];
					if (poi.distance > 0) {
						let poi1 = poi.location;
						let poi2 = {
							latitude: latitude.value,
							longitude: longitude.value
						};
						let distance = poi.distance;
						let direction = calcDirection(poi1, poi2);
						if (poi.address.indexOf("米") == -1) {
							let suffix = `向${direction}${distance}米`;
							let newPoi = {
								title: `${poi.title}${suffix}`,
								address: `${poi.address}${suffix}`,
								distance: 0,
								distanceStr: distanceHandle(distance),
								location: poi2
							};
							pois.value.unshift(newPoi);
						}
					}
					searchLoading.value = false;
					if (selected.value == -1) {
						safeSetTimeout(() => {
							selected.value = 0;
						}, 20);
						lastPoi.latitude = latitude.value;
						lastPoi.longitude = longitude.value;
						lastPoi.selected = selected.value;
						lastPoi.pois = pois.value;
					}
				}
			}).catch((err) => {
				searchLoading.value = false;
			});
		};
		const getLocation = () => {
			if (chooseLocationOptions.latitude != null && chooseLocationOptions.longitude != null) {
				latitude.value = chooseLocationOptions.latitude;
				longitude.value = chooseLocationOptions.longitude;
				locationComplete.value = true;
				getPoi("getLocation");
			} else {
				locationLoading.value = true;
				uni.getLocation({
					type: "gcj02",
					success: (res) => {
						latitude.value = res.latitude;
						longitude.value = res.longitude;
						locationComplete.value = true;
						locationLoading.value = false;
						getPoi("getLocation");
					},
					fail: (err) => {
						console.error("getLocationErr: ", err);
						latitude.value = defaultPoi.latitude;
						longitude.value = defaultPoi.longitude;
						locationComplete.value = true;
						locationLoading.value = false;
						getPoi("getLocation");
					}
				});
			}
		};
		const getSafeAreaInsets = () => {
			const info = uni.getWindowInfo();
			safeArea.top = info.safeAreaInsets.top;
			safeArea.bottom = info.safeAreaInsets.bottom;
			safeArea.left = info.safeAreaInsets.left;
			safeArea.right = info.safeAreaInsets.right;
		};
		const getMapContext = () => {
			return uni.createMapContext(mapId.value, currentInstance);
		};
		const regionchange = (e) => {
			let causedBy = e.causedBy;
			if (!causedBy) causedBy = e.detail.causedBy;
			if (e.type !== "end" || causedBy != "drag" || locationComplete.value == false) return;
			const mapContext = getMapContext();
			if (mapContext != null) mapContext.getCenterLocation({ success: (res) => {
				let latitudeDiff = Math.abs(res.latitude - latitude.value);
				let longitudeDiff = Math.abs(res.longitude - longitude.value);
				if (latitudeDiff > 1e-6 || longitudeDiff > 1e-6) {
					latitude.value = parseFloat(res.latitude.toFixed(6));
					longitude.value = parseFloat(res.longitude.toFixed(6));
					searchValue.value = "";
					selected.value = -1;
					pageIndex.value = 1;
					getPoi("regionchange");
					const element = mapTargetRef.value;
					if (element != null) {
						const duration = 250;
						element.style.setProperty("transition-duration", `${duration}ms`);
						element.style.setProperty("transform", "translateY(0px)");
						element.style.setProperty("transform", "translateY(-15px)");
						safeSetTimeout(() => {
							element.style.setProperty("transform", "translateY(0px)");
						}, duration);
					}
				}
			} });
		};
		const clearSearchValueChangeTimer = () => {
			if (searchValueChangeTimer.value != -1) {
				clearTimeout(searchValueChangeTimer.value);
				searchValueChangeTimer.value = -1;
			}
		};
		const clearAllTimeoutTimers = () => {
			timeoutTimers.value.forEach((timer) => {
				if (timer != -1) clearTimeout(timer);
			});
			timeoutTimers.value = [];
		};
		const poiSearch = (type) => {
			clearSearchValueChangeTimer();
			pageIndex.value = 1;
			selected.value = -1;
			getPoi(type);
		};
		const searchValueChange = (e) => {
			clearSearchValueChangeTimer();
			searchValueChangeTimer.value = setTimeout(() => {
				poiSearch("searchValueChange");
			}, 200);
		};
		const cancelSearch = () => {
			isFocus.value = false;
			searchValue.value = "";
			if (lastPoi.latitude != null) latitude.value = lastPoi.latitude;
			if (lastPoi.longitude != null) longitude.value = lastPoi.longitude;
			if (lastPoi.pois.length - 1 > lastPoi.selected) {
				pois.value = lastPoi.pois;
				selected.value = lastPoi.selected;
				updateScrollTop(lastPoi.scrollTop);
			} else poiSearch("cancelSearch");
		};
		const selectPoi = (item, index) => {
			isFocus.value = false;
			selected.value = index;
			latitude.value = item.location.latitude;
			longitude.value = item.location.longitude;
			if (searchValue.value == chooseLocationOptions.keyword) {
				lastPoi.latitude = latitude.value;
				lastPoi.longitude = longitude.value;
				lastPoi.selected = selected.value;
				lastPoi.pois = pois.value;
				const scrollElement = scrollRef.value;
				if (scrollElement != null) {
					const scrollTopVal = scrollElement.scrollTop;
					lastPoi.scrollTop = scrollTopVal;
					scrollTop.value = scrollTopVal;
				}
			}
		};
		const scrolltolower = () => {
			pageIndex.value++;
			getPoi("scrolltolower");
		};
		const mapReset = () => {
			isFocus.value = false;
			pageIndex.value = 1;
			selected.value = -1;
			getLocation();
		};
		const closeDialogPage = () => {
			uni.closeDialogPage({ dialogPage: uniPage });
		};
		const back = () => {
			uni.$emit(failEventName.value, 1);
			closeDialogPage();
		};
		const confirm = () => {
			if (selected.value < 0) {
				if (callUniMapCoErr.value) {
					uni.$emit(successEventName.value, {
						name: "",
						address: "",
						latitude: parseFloat(latitude.value.toFixed(6)),
						longitude: parseFloat(longitude.value.toFixed(6))
					});
					closeDialogPage();
				}
				return;
			}
			let item = pois.value[selected.value];
			let res = {
				name: item.title,
				address: item.address,
				latitude: item.location.latitude,
				longitude: item.location.longitude
			};
			uni.$emit(successEventName.value, res);
			closeDialogPage();
		};
		const getSystemInfo = () => {
			const info = uni.getWindowInfo();
			safeArea.top = info.safeAreaInsets.top;
			safeArea.bottom = info.safeAreaInsets.bottom;
			safeArea.left = info.safeAreaInsets.left;
			safeArea.right = info.safeAreaInsets.right;
			mapHeight.value = (info.screenHeight - safeArea.top - safeArea.bottom) * .6;
			const systemInfo = uni.getSystemInfoSync();
			language.value = systemInfo.appLanguage;
			const osTheme = systemInfo.osTheme;
			const appTheme = systemInfo.appTheme;
			if (appTheme != null && appTheme != "auto") theme.value = appTheme;
			else if (osTheme != null) theme.value = osTheme;
			isLandscape.value = systemInfo.windowWidth >= 900 ? true : false;
			const hostTheme = systemInfo.hostTheme;
			if (hostTheme != null) theme.value = hostTheme;
			language.value = uni.getLocale();
		};
		const languageCom = computed(() => {
			return languageData[language.value] != null ? languageData[language.value] : languageData["zh-Hans"];
		});
		const darkClassCom = computed(() => {
			return theme.value == "dark" ? "uni-choose-location-dark" : "uni-choose-location-light";
		});
		const landscapeClassCom = computed(() => {
			return isLandscape.value ? "uni-choose-location-landscape" : "uni-choose-location-vertical";
		});
		const mapBoxStyleCom = computed(() => {
			let list = [];
			if (!useUniCloud.value) list.push(`flex: 1;`);
			if (!isLandscape.value) {
				let top = isFocus.value ? (300 - mapHeight.value) / 2 : 0;
				list.push(`transform:translateY(${top}px);`);
				list.push(`height:${mapHeight.value}px;`);
			}
			return list.join("");
		});
		const poiBoxStyleCom = computed(() => {
			let list = [];
			if (!isLandscape.value) {
				let top = isFocus.value ? 300 : mapHeight.value;
				list.push(`top:${top}px;`);
			}
			return list.join("");
		});
		const resetStyleCom = computed(() => {
			let list = [];
			if (!isLandscape.value) {
				let bottom = isFocus.value ? (mapHeight.value - 300) / 2 + 300 - mapHeight.value : 0;
				list.push(`transform:translateY(${bottom}px);`);
			}
			return list.join("");
		});
		onLoad((options) => {
			checkUniCloud();
			initPageOptions(options);
			getSystemInfo();
			getLocation();
		});
		onReady(() => {
			getSafeAreaInsets();
		});
		onUnload(() => {
			uni.$off(optionsEventName.value, null);
			uni.$off(readyEventName.value, null);
			uni.$off(successEventName.value, null);
			uni.$off(failEventName.value, null);
			clearSearchValueChangeTimer();
			clearAllTimeoutTimers();
		});
		onResize(() => {
			getSystemInfo();
		});
		return (_ctx, _cache) => {
			const _component_map = map_default;
			const _component_text = text_default;
			const _component_view = view_default;
			const _component_input = input_default;
			const _component_loading = index_x_default$1;
			const _component_scroll_view = scroll_view_default;
			return openBlock(), createBlock(_component_view, { class: normalizeClass(["uni-choose-location", darkClassCom.value]) }, {
				default: withCtx(() => [
					createVNode(_component_view, {
						class: normalizeClass(["uni-choose-location-map-box", [landscapeClassCom.value]]),
						style: normalizeStyle(mapBoxStyleCom.value)
					}, {
						default: withCtx(() => [
							createVNode(_component_map, {
								class: "uni-choose-location-map",
								id: mapId.value,
								latitude: latitude.value,
								longitude: longitude.value,
								"layer-style": theme.value == "dark" ? "2" : "1",
								"show-compass": false,
								"enable-zoom": true,
								"enable-scroll": true,
								"enable-rotate": false,
								"enable-poi": true,
								"show-location": true,
								onRegionchange: regionchange
							}, null, 8, [
								"id",
								"latitude",
								"longitude",
								"layer-style"
							]),
							createVNode(_component_view, {
								class: "uni-choose-location-map-target",
								ref_key: "mapTargetRef",
								ref: mapTargetRef
							}, {
								default: withCtx(() => [createVNode(_component_text, { class: "uni-choose-location-icons uni-choose-location-map-target-icon" }, {
									default: withCtx(() => [createTextVNode(toDisplayString(icon.target), 1)]),
									_: 1
								})]),
								_: 1
							}, 512),
							createVNode(_component_view, {
								class: normalizeClass(["uni-choose-location-map-reset", [landscapeClassCom.value, darkClassCom.value]]),
								onClick: mapReset,
								style: normalizeStyle(resetStyleCom.value)
							}, {
								default: withCtx(() => [createVNode(_component_text, { class: normalizeClass(["uni-choose-location-icons uni-choose-location-map-reset-icon", [darkClassCom.value]]) }, {
									default: withCtx(() => [createTextVNode(toDisplayString(icon.position), 1)]),
									_: 1
								}, 8, ["class"])]),
								_: 1
							}, 8, ["class", "style"])
						]),
						_: 1
					}, 8, ["class", "style"]),
					createVNode(_component_view, {
						class: "uni-choose-location-nav",
						style: normalizeStyle("height:" + (60 + safeArea.top) + "px;")
					}, {
						default: withCtx(() => [createVNode(_component_view, {
							class: normalizeClass(["uni-choose-location-nav-btn uni-choose-location-nav-back-btn", [landscapeClassCom.value]]),
							style: normalizeStyle(safeArea.top > 0 ? "top: " + safeArea.top + "px;" : "")
						}, {
							default: withCtx(() => [createVNode(_component_text, {
								class: "uni-choose-location-nav-text uni-choose-location-nav-back-text",
								onClick: back
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(languageCom.value["cancel"]), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["class", "style"]), createVNode(_component_view, {
							class: normalizeClass(["uni-choose-location-nav-btn uni-choose-location-nav-confirm-btn", [landscapeClassCom.value, selected.value < 0 && !callUniMapCoErr.value ? "disable" : "active"]]),
							style: normalizeStyle(safeArea.top > 0 ? "top: " + safeArea.top + "px;" : ""),
							onClick: confirm
						}, {
							default: withCtx(() => [createVNode(_component_text, { class: "uni-choose-location-nav-text uni-choose-location-nav-confirm-text" }, {
								default: withCtx(() => [createTextVNode(toDisplayString(languageCom.value["ok"]), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["class", "style"])]),
						_: 1
					}, 8, ["style"]),
					useUniCloud.value ? (openBlock(), createBlock(_component_view, {
						key: 0,
						class: normalizeClass(["uni-choose-location-poi", [landscapeClassCom.value, darkClassCom.value]]),
						style: normalizeStyle(poiBoxStyleCom.value)
					}, {
						default: withCtx(() => [createVNode(_component_view, { class: normalizeClass(["uni-choose-location-poi-search", [darkClassCom.value]]) }, {
							default: withCtx(() => [createVNode(_component_view, { class: normalizeClass(["uni-choose-location-poi-search-box", [darkClassCom.value]]) }, {
								default: withCtx(() => [createVNode(_component_text, { class: normalizeClass(["uni-choose-location-icons uni-choose-location-search-icon", [darkClassCom.value]]) }, {
									default: withCtx(() => [createTextVNode(toDisplayString(icon.search), 1)]),
									_: 1
								}, 8, ["class"]), createVNode(_component_input, {
									modelValue: searchValue.value,
									"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchValue.value = $event),
									type: "text",
									placeholder: languageCom.value["search"],
									class: normalizeClass(["uni-choose-location-poi-search-input uni-choose-location-icons", [darkClassCom.value]]),
									onFocus: _cache[1] || (_cache[1] = ($event) => isFocus.value = true),
									onConfirm: _cache[2] || (_cache[2] = ($event) => poiSearch("poiSearch")),
									onInput: searchValueChange
								}, null, 8, [
									"modelValue",
									"placeholder",
									"class"
								])]),
								_: 1
							}, 8, ["class"]), isFocus.value || searchValue.value != "" ? (openBlock(), createBlock(_component_text, {
								key: 0,
								class: "uni-choose-location-poi-search-cancel",
								onClick: cancelSearch
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(languageCom.value["cancel"]), 1)]),
								_: 1
							})) : createCommentVNode("", true)]),
							_: 1
						}, 8, ["class"]), createVNode(_component_scroll_view, {
							ref_key: "scrollRef",
							ref: scrollRef,
							"scroll-with-animation": false,
							direction: "vertical",
							"scroll-top": scrollTop.value,
							"lower-threshold": 50,
							onScrolltolower: scrolltolower,
							class: "uni-choose-location-poi-list"
						}, {
							default: withCtx(() => [errMsg.value != "" ? (openBlock(), createBlock(_component_view, {
								key: 0,
								class: "uni-choose-location-poi-search-error"
							}, {
								default: withCtx(() => [createVNode(_component_text, { class: normalizeClass(["uni-choose-location-poi-search-error-text", [darkClassCom.value]]) }, {
									default: withCtx(() => [createTextVNode(toDisplayString(errMsg.value), 1)]),
									_: 1
								}, 8, ["class"])]),
								_: 1
							})) : locationLoading.value ? (openBlock(), createBlock(_component_view, {
								key: 1,
								class: "uni-choose-location-poi-search-loading"
							}, {
								default: withCtx(() => [createVNode(_component_text, { class: normalizeClass(["uni-choose-location-poi-search-loading-text", [darkClassCom.value]]) }, {
									default: withCtx(() => [createTextVNode(toDisplayString(languageCom.value["locationLoading"]), 1)]),
									_: 1
								}, 8, ["class"])]),
								_: 1
							})) : searchLoading.value && pageIndex.value == 1 ? (openBlock(), createBlock(_component_view, {
								key: 2,
								class: "uni-choose-location-poi-search-loading"
							}, {
								default: withCtx(() => [createVNode(_component_loading, { class: normalizeClass(["uni-choose-location-poi-search-loading-item", [darkClassCom.value]]) }, null, 8, ["class"])]),
								_: 1
							})) : (openBlock(true), createElementBlock(Fragment, { key: 3 }, renderList(pois.value, (item, index) => {
								return openBlock(), createBlock(_component_view, {
									key: index,
									class: normalizeClass(["uni-choose-location-poi-item", [landscapeClassCom.value]]),
									onClick: ($event) => selectPoi(item, index)
								}, {
									default: withCtx(() => [
										createVNode(_component_view, null, {
											default: withCtx(() => [createVNode(_component_view, null, {
												default: withCtx(() => [createVNode(_component_text, { class: normalizeClass(["uni-choose-location-poi-item-title-text", [darkClassCom.value]]) }, {
													default: withCtx(() => [createTextVNode(toDisplayString(item.title), 1)]),
													_: 2
												}, 1032, ["class"])]),
												_: 2
											}, 1024), createVNode(_component_view, null, {
												default: withCtx(() => [createVNode(_component_text, { class: normalizeClass(["uni-choose-location-poi-item-detail-text", [darkClassCom.value]]) }, {
													default: withCtx(() => [createTextVNode(toDisplayString(item.distance > 0 ? item.distanceStr + " | " : "") + toDisplayString(item.address), 1)]),
													_: 2
												}, 1032, ["class"])]),
												_: 2
											}, 1024)]),
											_: 2
										}, 1024),
										selected.value == index ? (openBlock(), createBlock(_component_text, {
											key: 0,
											class: "uni-choose-location-icons uni-choose-location-poi-item-selected-icon"
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(icon.success), 1)]),
											_: 1
										})) : createCommentVNode("", true),
										createVNode(_component_view, { class: normalizeClass(["uni-choose-location-poi-item-after", [darkClassCom.value]]) }, null, 8, ["class"])
									]),
									_: 2
								}, 1032, ["class", "onClick"]);
							}), 128)), searchLoading.value && pageIndex.value > 1 ? (openBlock(), createBlock(_component_view, {
								key: 4,
								class: "uni-choose-location-poi-search-loading"
							}, {
								default: withCtx(() => [createVNode(_component_loading, { class: normalizeClass(["uni-choose-location-poi-search-loading-item", [darkClassCom.value]]) }, null, 8, ["class"])]),
								_: 1
							})) : createCommentVNode("", true)]),
							_: 1
						}, 8, ["scroll-top"])]),
						_: 1
					}, 8, ["class", "style"])) : createCommentVNode("", true)
				]),
				_: 1
			}, 8, ["class"]);
		};
	}
}), [["styles", ["\n@font-face {\n    font-family: UniChooseLocationFontFamily;\n    src: url('data:font/ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQiCLJXoAAAE4AAAAVE9TLzI8Rkp9AAABjAAAAGBjbWFw0euemwAAAgAAAAGyZ2x5ZuUB/iAAAAPAAAACsGhlYWQp23fyAAAA4AAAADZoaGVhB94DhgAAALwAAAAkaG10eBQAAAAAAAHsAAAAFGxvY2EBUAG+AAADtAAAAAxtYXhwARIAfQAAARgAAAAgbmFtZUTMSfwAAAZwAAADS3Bvc3RLRtf0AAAJvAAAAFIAAQAAA4D/gABcBAAAAAAABAAAAQAAAAAAAAAAAAAAAAAAAAUAAQAAAAEAAIZo1N5fDzz1AAsEAAAAAADjXhn6AAAAAONeGfoAAP+ABAADgQAAAAgAAgAAAAAAAAABAAAABQBxAAMAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKADAAPgACREZMVAAObGF0bgAaAAQAAAAAAAAAAQAAAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAQEAAGQAAUAAAKJAswAAACPAokCzAAAAesAMgEIAAACAAUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBmRWQAwOYx560DgP+AAAAD3ACAAAAAAQAAAAAAAAAAAAAAAAACBAAAAAQAAAAEAAAABAAAAAQAAAAAAAAFAAAAAwAAACwAAAAEAAABcgABAAAAAABsAAMAAQAAACwAAwAKAAABcgAEAEAAAAAKAAgAAgAC5jHmU+aD563//wAA5jHmU+aD563//wAAAAAAAAAAAAEACgAKAAoACgAAAAIAAwAEAAEAAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAEAAAAAAAAAABAAA5jEAAOYxAAAAAgAA5lMAAOZTAAAAAwAA5oMAAOaDAAAABAAA560AAOetAAAAAQAAAAAAAABIAGYBCAFYAAIAAP/SA4cDNgAdACoAACUGBwYnLgEnJjc+ATc2Fx4BFxYHBgcXHgEOAiYnJTI+ATQuASIOARQeAQJlSFdVT1FsDQwdHodWU1JTeBQUFhc+7AUFBAsPEAX+T0uASkqAln9LS3/MMwkIICKLV1RQUnMQEBoagVZTUlU+7AYPDwsEBAbrSoCWf0tLf5aASgAAAAEAAAAAA8ACyAANAAATNwU3Njc2NxcHBgcGB0A5AQdAVGaPnxdXbWuWfAGPN986TFl8hTpVbG6aiQAAAAMAAP+ABAADgQAzAGcAcAAAAQYHBgcGBxUUBi4BPQEmJyYnJicjIiY+ATsBNjc2NzY3NTQ2MhYdARYXFhcWFzM2HgEGKwIiJj4BOwEmJyYnJicVFAYiJj0BBgcGBwYHMzYeAQYrARYXFhcWFzU0Nh4BHQE2NzY3NiUiJjQ2MhYUBgOyBjk3WlxtDxUPbF1aNzgGNAsPAQ4LNAY4N1pdbA8VD21cWjc5BjMLDwEPC2eaCg8BDgqaBjIwT1BfDxUPXlFOMTEGmAsPAQ8LmQYxMU5RXhAVDl9QTzAy/ocWHR0rHh4BZmxdWjc4BzMLDwEOCzMHODdaXWwQFA9tXFo3OQY0ChAOCzUGOTdaXG0BDxUQEBQPX1BPMDEHmQsODwqZBzEwT1BfAQ8VEF5RTjExBpgLDwEOC5gGMTFOUUUdKx4eKx0AAAMAAP+BAyoDfgAIACYAMwAABRQWMjY0JiIGExEUBisBIiY1ES4BJyY1NDc2NzYyFxYXFhUUBw4BAwYeAj4BNC4CDgEBwCU1JiY1JWoGBEAEB0d1ISIpJ0RFokVEJykiIXX9AiRATEImJT9KQCdUEhkZIxkZAXH+iAQGBgQBeApTP0FJUUVEJykpJ0RFUUlBP1MBIiZDJwImQks/JQEjPQAAABIA3gABAAAAAAAAABMAAAABAAAAAAABABsAEwABAAAAAAACAAcALgABAAAAAAADABsANQABAAAAAAAEABsAUAABAAAAAAAFAAsAawABAAAAAAAGABsAdgABAAAAAAAKACsAkQABAAAAAAALABMAvAADAAEECQAAACYAzwADAAEECQABADYA9QADAAEECQACAA4BKwADAAEECQADADYBOQADAAEECQAEADYBbwADAAEECQAFABYBpQADAAEECQAGADYBuwADAAEECQAKAFYB8QADAAEECQALACYCR0NyZWF0ZWQgYnkgaWNvbmZvbnRVbmlDaG9vc2VMb2NhdGlvbkZvbnRGYW1pbHlSZWd1bGFyVW5pQ2hvb3NlTG9jYXRpb25Gb250RmFtaWx5VW5pQ2hvb3NlTG9jYXRpb25Gb250RmFtaWx5VmVyc2lvbiAxLjBVbmlDaG9vc2VMb2NhdGlvbkZvbnRGYW1pbHlHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQBDAHIAZQBhAHQAZQBkACAAYgB5ACAAaQBjAG8AbgBmAG8AbgB0AFUAbgBpAEMAaABvAG8AcwBlAEwAbwBjAGEAdABpAG8AbgBGAG8AbgB0AEYAYQBtAGkAbAB5AFIAZQBnAHUAbABhAHIAVQBuAGkAQwBoAG8AbwBzAGUATABvAGMAYQB0AGkAbwBuAEYAbwBuAHQARgBhAG0AaQBsAHkAVQBuAGkAQwBoAG8AbwBzAGUATABvAGMAYQB0AGkAbwBuAEYAbwBuAHQARgBhAG0AaQBsAHkAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAbgBpAEMAaABvAG8AcwBlAEwAbwBjAGEAdABpAG8AbgBGAG8AbgB0AEYAYQBtAGkAbAB5AEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAQIBAwEEAQUBBgAGc291c3VvB2dvdXh1YW4HZGluZ3dlaQtkaXR1LXR1ZGluZwAAAAA=') format('truetype');\n}\n.uni-choose-location-icons {\n    font-family: \"UniChooseLocationFontFamily\";\n    font-size: 16px;\n    font-style: normal;\n}\n.uni-choose-location {\n    position: relative;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background: #f8f8f8;\n    z-index: 999;\n}\n.uni-choose-location-map-box {\n    position: relative;\n    width: 100%;\n    height: 350px;\n}\n.uni-choose-location-map-box.uni-choose-location-vertical {\n    transition-property: transform;\n    transition-duration: 0.25s;\n    transition-timing-function: ease-out;\n}\n.uni-choose-location-map {\n    width: 100%;\n    height: 100%;\n}\n.uni-choose-location-map-target {\n    position: absolute;\n    left: 50%;\n    bottom: 50%;\n    width: 50px;\n    height: 50px;\n    margin-left: -25px;\n    transition-property: transform;\n    transition-duration: 0.25s;\n    transition-timing-function: ease-out;\n}\n.uni-choose-location-map-target-icon {\n    font-size: 50px;\n    color: #f0493e;\n}\n\n  /* #1aad19; #f0493e; #007aff;*/\n.uni-choose-location-map-reset {\n    position: absolute;\n    left: 20px;\n    bottom: 40px;\n    width: 40px;\n    height: 40px;\n    box-sizing: border-box;\n    background-color: #fff;\n    border-radius: 20px;\n    pointer-events: auto;\n    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .3);\n    z-index: 9;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.uni-choose-location-map-reset.uni-choose-location-vertical {\n    transition-property: transform;\n    transition-duration: 0.25s;\n    transition-timing-function: ease-out;\n}\n.uni-choose-location-map-reset-icon {\n    font-size: 26px;\n    text-align: center;\n    line-height: 40px;\n}\n.uni-choose-location-nav {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 60px;\n    background-color: rgba(0, 0, 0, 0);\n    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));\n}\n.uni-choose-location-nav-btn {\n    position: absolute;\n    top: 5px;\n    left: 5px;\n    width: 64px;\n    height: 44px;\n    padding: 5px;\n}\n.uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn {\n    left: auto;\n    right: 5px;\n}\n.uni-choose-location-nav-confirm-text {\n    background-color: #007aff;\n    border-radius: 5px;\n}\n.uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn.active:active {\n    opacity: 0.7;\n}\n.uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn.disable {\n    opacity: 0.4;\n}\n.uni-choose-location-nav-back-text {\n    color: #fff;\n}\n.uni-choose-location-nav-text {\n    padding: 8px 0px;\n    font-size: 14px;\n    text-align: center;\n\n    letter-spacing: 0.1em;\n\n    color: #fff;\n}\n.uni-choose-location-poi {\n    position: absolute;\n    top: 350px;\n    width: 100%;\n    bottom: 0;\n    background-color: #fff;\n    z-index: 10\n}\n.uni-choose-location-poi.uni-choose-location-vertical {\n    transition-property: top;\n    transition-duration: 0.25s;\n    transition-timing-function: ease-out;\n}\n.uni-choose-location-poi-search {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    height: 50px;\n    padding: 8px;\n    background-color: #fff;\n}\n.uni-choose-location-poi-search-box {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    height: 32px;\n    flex: 1;\n    border-radius: 5px;\n    padding: 0 15px;\n    background-color: #ededed;\n}\n.uni-choose-location-poi-search-input {\n    flex: 1;\n    height: 100%;\n    border-radius: 5px;\n    padding: 0 5px;\n    background: #ededed;\n}\n.uni-choose-location-poi-search-cancel {\n    margin-left: 5px;\n    color: #007aff;\n    font-size: 15px;\n    text-align: center;\n}\n.uni-choose-location-poi-list {\n    flex: 1;\n}\n.uni-choose-location-poi-search-loading {\n    display: flex;\n    align-items: center;\n    padding: 10px 0px;\n}\n.uni-choose-location-poi-search-loading-text {\n    color: #191919;\n}\n.uni-choose-location-poi-search-error {\n    display: flex;\n    align-items: center;\n    padding: 10px;\n}\n.uni-choose-location-poi-search-error-text {\n    color: #191919;\n    font-size: 14px;\n}\n.uni-choose-location-poi-item {\n    position: relative;\n    padding: 15px 10px;\n    padding-right: 40px;\n}\n.uni-choose-location-poi-item-title-text {\n    font-size: 14px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    color: #191919;\n}\n.uni-choose-location-poi-item-detail-text {\n    font-size: 12px;\n    margin-top: 5px;\n    color: #b2b2b2;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n.uni-choose-location-poi-item-selected-icon {\n    position: absolute;\n    top: 50%;\n    right: 10px;\n    width: 26px;\n    height: 26px;\n    margin-top: -13px;\n    color: #007aff;\n    font-size: 24px;\n}\n.uni-choose-location-poi-item-after {\n    position: absolute;\n    height: 1px;\n    left: 10px;\n    bottom: 0px;\n    right: 10px;\n    width: auto;\n    border-bottom: 1px solid #f8f8f8;\n}\n.uni-choose-location-search-icon {\n    color: #808080;\n    padding-left: 5px;\n}\n.uni-choose-location-poi-search-loading-item {\n    width: 28px;\n    height: 28px;\n    border-color: #D0D0D0;\n}\n\n  /* 横屏样式开始 */\n.uni-choose-location-map-box.uni-choose-location-landscape {\n    height: 100%;\n}\n.uni-choose-location-poi.uni-choose-location-landscape {\n    position: absolute;\n    top: 80px;\n    right: 25px;\n    width: 300px;\n    bottom: 20px;\n    max-height: 600px;\n    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .3);\n    border-radius: 5px;\n}\n.uni-choose-location-map-reset.uni-choose-location-landscape {\n    left: 40px;\n    bottom: 40px;\n}\n.uni-choose-location-poi-item.uni-choose-location-landscape {\n    padding: 10px;\n}\n.uni-choose-location-nav-btn.uni-choose-location-landscape {\n    top: 10px;\n    left: 20px;\n}\n.uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn.uni-choose-location-landscape {\n    left: auto;\n    right: 20px;\n}\n\n  /* 横屏样式结束 */\n\n  /* 暗黑模式样式开始 */\n.uni-choose-location-dark.uni-choose-location-map-reset {\n    background-color: #111111;\n    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, .3);\n}\n.uni-choose-location-dark.uni-choose-location-poi-search-box {\n    background-color: #111111;\n}\n.uni-choose-location-dark.uni-choose-location-search-icon {\n    color: #d1d1d1;\n}\n.uni-choose-location-dark.uni-choose-location-poi-search-loading-text {\n    color: #d1d1d1;\n}\n.uni-choose-location-dark.uni-choose-location-poi-search {\n    background-color: #181818\n}\n.uni-choose-location-dark.uni-choose-location-poi-search-input {\n    background: #111111;\n    color: #d1d1d1;\n}\n.uni-choose-location-dark.uni-choose-location-poi-item-title-text {\n    color: #d1d1d1;\n}\n.uni-choose-location-dark.uni-choose-location-poi-item-detail-text {\n    color: #595959;\n}\n.uni-choose-location-dark.uni-choose-location-poi {\n    background-color: #181818\n}\n.uni-choose-location-dark.uni-choose-location-poi-item-after {\n    border-bottom: 1px solid #1e1e1e;\n}\n.uni-choose-location-dark.uni-choose-location-map-reset-icon {\n    color: #d1d1d1;\n}\n.uni-choose-location-dark.uni-choose-location-poi-search-error-text {\n    color: #d1d1d1;\n}\n.uni-choose-location-dark.uni-choose-location-poi-search-loading-item {\n    border-color: #d1d1d1;\n}\n  /* 暗黑模式样式结束 */\n\n"]]]);
//#endregion
//#region ../../uni-ext-api/uni_modules/uni-chooseLocation/utssdk/interface.uts.ts
var ChooseLocationFailImpl = class extends UniError {
	constructor(errMsg = "chooseLocation:fail cancel", errCode = 1) {
		super();
		_defineProperty(this, "errCode", void 0);
		this.errCode = errCode;
		this.errMsg = errMsg;
	}
};
//#endregion
//#region ../../uni-ext-api/uni_modules/uni-chooseLocation/utssdk/web/index.uts.ts
var chooseLocation$1 = (options) => {
	const baseEventName = `uni_choose_location_${`${Date.now()}${Math.floor(Math.random() * 1e7)}`}`;
	const readyEventName = `${baseEventName}_ready`;
	const optionsEventName = `${baseEventName}_options`;
	const successEventName = `${baseEventName}_success`;
	const failEventName = `${baseEventName}_fail`;
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, JSON.parse(JSON.stringify(options)));
	});
	uni.$on(successEventName, (result) => {
		var _options$success, _options$complete;
		(_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, result);
		(_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options, result);
	});
	uni.$on(failEventName, () => {
		var _options$fail, _options$complete2;
		(_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, new ChooseLocationFailImpl());
		(_options$complete2 = options.complete) === null || _options$complete2 === void 0 || _options$complete2.call(options, new ChooseLocationFailImpl());
	});
	uni.openDialogPage({
		url: `uni:chooseLocation?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		triggerParentHide: true,
		fail(err) {
			var _options$fail2, _options$complete3;
			(_options$fail2 = options.fail) === null || _options$fail2 === void 0 || _options$fail2.call(options, new ChooseLocationFailImpl(`chooseLocation:fail ${err.errMsg}`, 4));
			(_options$complete3 = options.complete) === null || _options$complete3 === void 0 || _options$complete3.call(options, new ChooseLocationFailImpl(`chooseLocation:fail ${err.errMsg}`, 4));
			uni.$off(readyEventName);
			uni.$off(successEventName);
			uni.$off(failEventName);
		}
	});
};
//#endregion
//#region src/x/service/api/pages/chooseLocation.ts
var registerChooseLocationOnce = /* @__PURE__ */ once(() => {
	registerSystemRoute("uni:chooseLocation", chooseLocation_default);
});
var chooseLocation = /*#__PURE__*/ defineAsyncApi(API_CHOOSE_LOCATION, (args, { resolve, reject }) => {
	registerChooseLocationOnce();
	chooseLocation$1(extend({
		success: (res) => {
			resolve(res);
		},
		fail: (err) => {
			reject(err);
		}
	}, args));
});
//#endregion
//#region ../../uni-ext-apiuni:uniModal.vue
var uniModal_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "uniModal",
	setup(__props) {
		const theme = ref("light");
		const isDark = computed(() => theme.value == "dark");
		const language = ref("zh-Hans");
		const i18nCancelText = {
			en: "Cancel",
			es: "Cancelar",
			fr: "Annuler",
			"zh-Hans": "取消",
			"zh-Hant": "取消"
		};
		const i18nConfirmText = {
			en: "OK",
			es: "Confirmar",
			fr: "Confirmer",
			"zh-Hans": "确定",
			"zh-Hant": "確定"
		};
		const readyEventName = ref("");
		const optionsEventName = ref("");
		const successEventName = ref("");
		const failEventName = ref("");
		const title = ref("");
		const content = ref("");
		const showCancel = ref(true);
		const editable = ref(false);
		const placeholderText = ref(null);
		const inputConfirmText = ref(null);
		const inputCancelText = ref(null);
		const cancelColor = ref("#000000");
		const confirmColor = ref("#4A5E86");
		const inputBottom = ref("0px");
		const maxScrollHeight = ref("192px");
		const inputCancelColor = ref(null);
		const inputConfirmColor = ref(null);
		const hoverClassName = ref("uni-modal-dialog__action--hover");
		const showAnim = ref(false);
		const isAutoHeight = ref(true);
		const hasTitle = computed(() => {
			return title.value != "";
		});
		const instance = getCurrentInstance();
		const cancelText = computed(() => {
			if (inputCancelText.value != null) return inputCancelText.value;
			if (language.value.startsWith("en")) return i18nCancelText["en"];
			if (language.value.startsWith("es")) return i18nCancelText["es"];
			if (language.value.startsWith("fr")) return i18nCancelText["fr"];
			if (language.value.startsWith("zh-Hans")) return i18nCancelText["zh-Hans"];
			if (language.value.startsWith("zh-Hant")) return i18nCancelText["zh-Hant"];
			return "取消";
		});
		const confirmText = computed(() => {
			if (inputConfirmText.value != null) return inputConfirmText.value;
			if (language.value.startsWith("en")) return i18nConfirmText["en"];
			if (language.value.startsWith("es")) return i18nConfirmText["es"];
			if (language.value.startsWith("fr")) return i18nConfirmText["fr"];
			if (language.value.startsWith("zh-Hans")) return i18nConfirmText["zh-Hans"];
			if (language.value.startsWith("zh-Hant")) return i18nConfirmText["zh-Hant"];
			return "确定";
		});
		const onInputBlur = (e) => {
			setTimeout(() => {
				inputBottom.value = "0px";
			}, 220);
		};
		const onInputKeyboardChange = (e) => {
			const keyBoardHeight = e.detail.height;
			if (keyBoardHeight > 0) inputBottom.value = `${keyBoardHeight / 2}px`;
		};
		const isValidColor = (inputColor) => {
			const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
			if (inputColor == null) return false;
			/**
			* #888
			* #808080
			*/
			return hexColorRegex.test(inputColor);
		};
		/**
		* update ui when theme change.
		*/
		const updateUI = () => {
			if (isValidColor(inputConfirmColor.value)) confirmColor.value = inputConfirmColor.value;
			else if (theme.value == "dark") confirmColor.value = "#7388a2";
			else confirmColor.value = "#4A5E86";
			if (isValidColor(inputCancelColor.value)) cancelColor.value = inputCancelColor.value;
			else if (theme.value == "dark") cancelColor.value = "#a5a5a5";
			else cancelColor.value = "#000000";
			if (theme.value == "dark") hoverClassName.value = "uni-modal-dialog__action--hover-dark";
			else hoverClassName.value = "uni-modal-dialog__action--hover";
		};
		const closeModal = () => {
			showAnim.value = false;
			setTimeout(() => {
				var _instance$proxy;
				uni.closeDialogPage({ dialogPage: instance === null || instance === void 0 || (_instance$proxy = instance.proxy) === null || _instance$proxy === void 0 ? void 0 : _instance$proxy.$page });
			}, 300);
		};
		const handleCancel = () => {
			closeModal();
			uni.$emit(successEventName.value, JSON.stringify({
				cancel: true,
				confirm: false
			}));
		};
		const handleSure = () => {
			closeModal();
			const ret = {
				cancel: false,
				confirm: true,
				content: editable.value ? content.value : null
			};
			uni.$emit(successEventName.value, JSON.stringify(ret));
		};
		onReady(() => {
			setTimeout(() => {
				showAnim.value = true;
			}, 10);
		});
		onLoad((options) => {
			/**
			* show modal 不需要对内置文案进行i18n适配。（参考微信）
			*/
			const systemInfo = uni.getSystemInfoSync();
			const osLanguage = systemInfo.osLanguage;
			maxScrollHeight.value = Math.floor(systemInfo.screenHeight * .55) + "px";
			/**
			* add since 2025-04-03 目前暂不支持设置app language
			*/
			const appLanguage = systemInfo.appLanguage;
			if (appLanguage != null) language.value = appLanguage;
			else if (osLanguage != null) language.value = osLanguage;
			const hostTheme = systemInfo.hostTheme;
			if (hostTheme != null) {
				theme.value = hostTheme;
				updateUI();
			}
			uni.onThemeChange((res) => {
				theme.value = res.theme;
				updateUI();
			});
			language.value = uni.getLocale();
			uni.onLocaleChange((res) => {
				if (res.locale) language.value = res.locale;
			});
			readyEventName.value = options["readyEventName"];
			optionsEventName.value = options["optionsEventName"];
			successEventName.value = options["successEventName"];
			failEventName.value = options["failEventName"];
			uni.$on(optionsEventName.value, (data) => {
				if (data["title"] != null) title.value = data["title"];
				if (data["content"] != null) content.value = data["content"];
				if (data["showCancel"] != null) showCancel.value = data["showCancel"];
				if (data["editable"] != null) editable.value = data["editable"];
				if (data["placeholderText"] != null) placeholderText.value = data["placeholderText"];
				if (data["confirmText"] != null) inputConfirmText.value = data["confirmText"];
				if (data["cancelText"] != null) inputCancelText.value = data["cancelText"];
				if (data["confirmColor"] != null) inputConfirmColor.value = data["confirmColor"];
				if (data["cancelColor"] != null) inputCancelColor.value = data["cancelColor"];
				updateUI();
			});
			uni.$emit(readyEventName.value, {});
		});
		onUnload(() => {
			uni.$off(optionsEventName.value, null);
			uni.$off(readyEventName.value, null);
			uni.$off(successEventName.value, null);
			uni.$off(failEventName.value, null);
		});
		onBackPress((_) => {
			uni.$emit(successEventName.value, JSON.stringify({
				cancel: false,
				confirm: false
			}));
			return false;
		});
		return (_ctx, _cache) => {
			const _component_text = text_default;
			const _component_view = view_default;
			const _component_textarea = textarea_default;
			const _component_scroll_view = scroll_view_default;
			return openBlock(), createBlock(_component_view, { class: normalizeClass(["uni-modal-mask", {
				"uni-modal-mask--show": showAnim.value,
				"uni-modal-mask--hide": !showAnim.value
			}]) }, {
				default: withCtx(() => [createVNode(_component_view, {
					class: normalizeClass(["uni-modal-dialog", {
						"uni-modal-dialog--show": showAnim.value,
						"uni-modal--dark": isDark.value
					}]),
					style: normalizeStyle({ bottom: inputBottom.value })
				}, {
					default: withCtx(() => [createVNode(_component_view, { class: normalizeClass(["uni-modal-dialog__inner", { "uni-modal--dark": isDark.value }]) }, {
						default: withCtx(() => [
							createVNode(_component_view, { class: "uni-modal-dialog__title__container" }, {
								default: withCtx(() => [hasTitle.value ? (openBlock(), createBlock(_component_text, {
									key: 0,
									"max-lines": "2",
									class: normalizeClass(["uni-modal-dialog__title", { "uni-modal--dark": isDark.value }])
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(title.value), 1)]),
									_: 1
								}, 8, ["class"])) : createCommentVNode("", true)]),
								_: 1
							}),
							createVNode(_component_view, { class: normalizeClass(["uni-modal-dialog__body", { "no-title": !hasTitle.value }]) }, {
								default: withCtx(() => [editable.value ? (openBlock(), createBlock(_component_textarea, {
									key: 0,
									modelValue: content.value,
									"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => content.value = $event),
									class: normalizeClass(["uni-modal-dialog__textarea", { "uni-modal--dark": isDark.value }]),
									"placeholder-class": "uni-modal-dialog__textarea-placeholder",
									focus: true,
									"adjust-position": false,
									onBlur: onInputBlur,
									onKeyboardheightchange: onInputKeyboardChange,
									"auto-height": isAutoHeight.value,
									placeholder: placeholderText.value
								}, null, 8, [
									"modelValue",
									"class",
									"auto-height",
									"placeholder"
								])) : content.value.length > 0 ? (openBlock(), createBlock(_component_scroll_view, {
									key: 1,
									class: "uni-modal-dialog__scroll",
									"show-scrollbar": "true",
									style: normalizeStyle({ maxHeight: maxScrollHeight.value })
								}, {
									default: withCtx(() => [createVNode(_component_text, { class: "uni-modal-dialog__message" }, {
										default: withCtx(() => [createTextVNode(toDisplayString(content.value), 1)]),
										_: 1
									})]),
									_: 1
								}, 8, ["style"])) : createCommentVNode("", true)]),
								_: 1
							}, 8, ["class"]),
							createVNode(_component_view, { class: normalizeClass(["uni-modal-dialog__divider", { "uni-modal--dark": isDark.value }]) }, null, 8, ["class"]),
							createVNode(_component_view, { class: "uni-modal-dialog__actions" }, {
								default: withCtx(() => [
									showCancel.value ? (openBlock(), createBlock(_component_view, {
										key: 0,
										class: "uni-modal-dialog__action uni-modal-dialog__action--cancel",
										"hover-class": hoverClassName.value,
										onClick: handleCancel
									}, {
										default: withCtx(() => [createVNode(_component_text, {
											style: normalizeStyle({ color: cancelColor.value }),
											"max-lines": "1",
											class: "uni-modal-dialog__action-text"
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(cancelText.value), 1)]),
											_: 1
										}, 8, ["style"])]),
										_: 1
									}, 8, ["hover-class"])) : createCommentVNode("", true),
									showCancel.value ? (openBlock(), createBlock(_component_view, {
										key: 1,
										class: normalizeClass(["uni-modal-dialog__split", { "uni-modal--dark": isDark.value }])
									}, null, 8, ["class"])) : createCommentVNode("", true),
									createVNode(_component_view, {
										class: "uni-modal-dialog__action uni-modal-dialog__action--confirm",
										"hover-class": hoverClassName.value,
										onClick: handleSure
									}, {
										default: withCtx(() => [createVNode(_component_text, {
											style: normalizeStyle({ color: confirmColor.value }),
											"max-lines": "1",
											class: "uni-modal-dialog__action-text uni-modal-dialog__action-text--confirm"
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(confirmText.value), 1)]),
											_: 1
										}, 8, ["style"])]),
										_: 1
									}, 8, ["hover-class"])
								]),
								_: 1
							})
						]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				}, 8, ["style", "class"])]),
				_: 1
			}, 8, ["class"]);
		};
	}
}), [["styles", ["\n	/**\n	 * 透明背景\n	 */\n.uni-modal-mask {\n		display: flex;\n		height: 100%;\n		width: 100%;\n		justify-content: center;\n		align-items: center;\n		background-color: rgba(0, 0, 0, 0.55);\n		transition-property: opacity;\n}\n.uni-modal-mask--hide {\n		transition-duration: 0s;\n		opacity: 0;\n}\n.uni-modal-mask--show {\n		transition-duration: 0.1s;\n		opacity: 1;\n}\n\n	/**\n	 * 居中的内容展示区域\n	 */\n.uni-modal-dialog {\n		width: 80%;\n		max-width: 90%;\n		max-height: 90%;\n		background-color: #ffffff;\n		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n		border-radius: 16px;\n		opacity: 0;\n		transform: scale(0.9);\n		transition-duration: 0.1s;\n		transition-property: opacity, transform;\n}\n@media screen and (min-width: 768px) {\n.uni-modal-dialog {\n			max-width: 556px;\n}\n}\n.uni-modal-dialog.uni-modal-dialog--show {\n		opacity: 1;\n		transform: scale(1);\n}\n.uni-modal-dialog.uni-modal--dark {\n		background-color: #272727;\n}\n.uni-modal-dialog__inner {\n		width: 100%;\n		height: 100%;\n		background-color: #ffffff;\n		border-radius: 8px;\n}\n.uni-modal-dialog__inner.uni-modal--dark {\n		background-color: #272727;\n}\n.uni-modal-dialog__title__container {\n		padding: 33px 24px 18px;\n}\n.uni-modal-dialog__title {\n		font-size: 17px;\n		font-weight: 600;\n		text-align: center;\n		text-overflow: ellipsis;\n\n		lines: 2;\n\n		line-height: 22px;\n\n		display: -webkit-box;\n		-webkit-line-clamp: 2;\n		-webkit-box-orient: vertical;\n		overflow: hidden;\n}\n.uni-modal-dialog__title.uni-modal--dark {\n		color: #cfcfcf;\n}\n.uni-modal-dialog__body {\n		justify-content: center;\n		align-items: center;\n		padding: 0 22px;\n		margin-bottom: 13px;\n}\n.uni-modal-dialog__body.no-title {\n		margin-top: -10px;\n		margin-bottom: 20px;\n}\n.uni-modal-dialog__scroll {\n		max-height: 192px;\n		margin: 2px;\n		width: 100%;\n}\n.uni-modal-dialog__message {\n		font-size: 17px;\n		font-weight: normal;\n		text-align: center;\n		color: #7f7f7f;\n		line-height: 1.5em;\n		width: 100%;\n		padding-bottom: 10px;\n}\n.uni-modal-dialog__textarea {\n		font-size: 17px;\n		background-color: #f6f6f6;\n		color: #000000;\n		width: 96%;\n		padding: 5px;\n		margin-top: 2px;\n		margin-bottom: 7px;\n		max-height: 192px;\n\n		word-break: break-word;\n}\n.uni-modal-dialog__textarea.uni-modal--dark {\n		background-color: #3d3d3d;\n		color: #cfcfcf;\n}\n.uni-modal-dialog__textarea-placeholder {\n		color: #808080;\n}\n.uni-modal-dialog__divider {\n		width: 100%;\n		height: 1px;\n		transform: scaleY(0.5);\n		background-color: #e3e3e3;\n}\n.uni-modal-dialog__divider.uni-modal--dark {\n		background-color: #303030;\n}\n.uni-modal-dialog__actions {\n		display: flex;\n		width: 100%;\n		height: 56px;\n		flex-direction: row;\n		overflow: hidden;\n}\n.uni-modal-dialog__action {\n		justify-content: center;\n		flex-grow: 1;\n}\n.uni-modal-dialog__action--cancel{\n		padding: 0 4px 0 10px;\n}\n.uni-modal-dialog__action--confirm{\n		padding: 0 10px 0 4px;\n}\n.uni-modal-dialog__action--hover {\n		background-color: #efefef;\n}\n.uni-modal-dialog__action--hover-dark {\n		background-color: #1c1c1c;\n}\n.uni-modal-dialog__action-text {\n		letter-spacing: 1px;\n		font-size: 17px;\n		text-align: center;\n\n		lines: 1;\n\n		white-space: nowrap;\n		font-weight: 600;\n}\n.uni-modal-dialog__action-text--confirm {\n		color: #4A5E86;\n}\n.uni-modal-dialog__split {\n		width: 1px;\n		height: 100%;\n		transform: scaleX(0.5);\n		background-color: #e3e3e3;\n}\n.uni-modal-dialog__split.uni-modal--dark {\n		background-color: #303030;\n}\n.uni-textarea-wrapper {\n		min-height: 18px !important;\n}\n\n"]]]);
//#endregion
//#region ../../uni-ext-api/uni_modules/uni-modal/utssdk/interface.uts.ts
var ShowModalSuccessImpl = class {
	constructor(cancel, confirm, content = null, errMsg = "showModal:ok") {
		_defineProperty(this, "errMsg", void 0);
		_defineProperty(this, "content", void 0);
		_defineProperty(this, "cancel", void 0);
		_defineProperty(this, "confirm", void 0);
		this.errMsg = errMsg;
		this.content = content;
		this.cancel = cancel;
		this.confirm = confirm;
	}
};
var ShowModalFailImpl = class extends UniError {
	constructor(errMsg = "showModal:fail cancel", errCode = 4) {
		super();
		_defineProperty(this, "errCode", void 0);
		this.errMsg = errMsg;
		this.errCode = errCode;
	}
};
var HideModalSuccessImpl = class {
	constructor(errMsg = "hideModal:ok") {
		_defineProperty(this, "errMsg", void 0);
		this.errMsg = errMsg;
	}
};
var HideModalFailImpl = class extends UniError {
	constructor(errMsg = "hideModal:fail cancel", errCode = 4) {
		super();
		_defineProperty(this, "errCode", void 0);
		this.errMsg = errMsg;
		this.errCode = errCode;
	}
};
//#endregion
//#region ../../uni-ext-api/uni_modules/uni-modal/utssdk/index.uts.ts
var showModal$1 = (options) => {
	var _options$fail3, _options$complete4;
	const baseEventName = `uni_modal_${`${Date.now()}${Math.floor(Math.random() * 1e7)}`}`;
	const readyEventName = `${baseEventName}_ready`;
	const optionsEventName = `${baseEventName}_options`;
	const successEventName = `${baseEventName}_success`;
	const failEventName = `${baseEventName}_fail`;
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, options != null ? JSON.parse(JSON.stringify(options)) : {});
	});
	uni.$on(successEventName, (inputParamStr) => {
		var _options$success, _options$complete;
		const inputParam = JSON.parse(inputParamStr);
		const res = new ShowModalSuccessImpl(inputParam["cancel"], inputParam["confirm"], inputParam["content"]);
		options === null || options === void 0 || (_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, res);
		options === null || options === void 0 || (_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options, res);
	});
	uni.$on(failEventName, () => {
		var _options$fail, _options$complete2;
		const res = new ShowModalFailImpl();
		options === null || options === void 0 || (_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, res);
		options === null || options === void 0 || (_options$complete2 = options.complete) === null || _options$complete2 === void 0 || _options$complete2.call(options, res);
	});
	const openRet = uni.openDialogPage({
		url: `uni:uniModal?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail(err) {
			var _options$fail2, _options$complete3;
			const res = new ShowModalFailImpl(`showModal failed, ${err.errMsg}`);
			options === null || options === void 0 || (_options$fail2 = options.fail) === null || _options$fail2 === void 0 || _options$fail2.call(options, res);
			options === null || options === void 0 || (_options$complete3 = options.complete) === null || _options$complete3 === void 0 || _options$complete3.call(options, res);
			uni.$off(readyEventName);
			uni.$off(successEventName);
			uni.$off(failEventName);
		}
	});
	if (openRet != null) return openRet;
	const res = new ShowModalFailImpl();
	options === null || options === void 0 || (_options$fail3 = options.fail) === null || _options$fail3 === void 0 || _options$fail3.call(options, res);
	options === null || options === void 0 || (_options$complete4 = options.complete) === null || _options$complete4 === void 0 || _options$complete4.call(options, res);
	return null;
};
var SYSTEM_DIALOG_MODAL_PAGE_PATH = "uni:uniModal";
var hideModal$1 = (options) => {
	var _options$success2, _options$complete6;
	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1];
	if (currentPage == null) {
		var _options$fail4, _options$complete5;
		const res = new HideModalFailImpl();
		options === null || options === void 0 || (_options$fail4 = options.fail) === null || _options$fail4 === void 0 || _options$fail4.call(options, res);
		options === null || options === void 0 || (_options$complete5 = options.complete) === null || _options$complete5 === void 0 || _options$complete5.call(options, res);
		return;
	}
	const systemDialogPages = currentPage.$getSystemDialogPages();
	const modalPage = options === null || options === void 0 ? void 0 : options.modalPage;
	for (let i = systemDialogPages.length - 1; i >= 0; i--) {
		const page = systemDialogPages[i];
		if (!page.route.startsWith(SYSTEM_DIALOG_MODAL_PAGE_PATH)) continue;
		if (modalPage == null) uni.closeDialogPage({ dialogPage: page });
		else if (modalPage === page) {
			uni.closeDialogPage({ dialogPage: page });
			break;
		}
	}
	const res = new HideModalSuccessImpl();
	options === null || options === void 0 || (_options$success2 = options.success) === null || _options$success2 === void 0 || _options$success2.call(options, res);
	options === null || options === void 0 || (_options$complete6 = options.complete) === null || _options$complete6 === void 0 || _options$complete6.call(options, res);
};
//#endregion
//#region src/x/service/api/pages/modal.ts
var API_HIDE_MODAL = "hideModal";
var registerModalOnce = /* @__PURE__ */ once(() => {
	registerSystemRoute("uni:uniModal", uniModal_default);
});
var hideModal = /*#__PURE__*/ defineAsyncApi(API_HIDE_MODAL, (args, { resolve, reject }) => {
	registerModalOnce();
	hideModal$1(extend({
		success: (res) => {
			resolve(res);
		},
		fail: (err) => {
			reject(err);
		}
	}, args));
});
var showModal = /*#__PURE__*/ defineAsyncApi(API_SHOW_MODAL, (args, { resolve, reject }) => {
	registerModalOnce();
	return showModal$1(extend({
		success: (res) => {
			resolve(res);
		},
		fail: (err) => {
			reject(err);
		}
	}, args));
});
//#endregion
//#region ../../uni-ext-apiuni:showLoading.vue
var showLoading_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "showLoading",
	setup(__props) {
		const readyEventName = ref("");
		const optionsEventName = ref("");
		const successEventName = ref("");
		const failEventName = ref("");
		const title = ref("");
		const showAnim = ref(false);
		const iosSpinner = ref(true);
		onReady(() => {
			setTimeout(() => {
				showAnim.value = true;
			}, 10);
		});
		onLoad((options) => {
			readyEventName.value = options["readyEventName"];
			optionsEventName.value = options["optionsEventName"];
			successEventName.value = options["successEventName"];
			failEventName.value = options["failEventName"];
			uni.$on(optionsEventName.value, (data) => {
				if (data["title"] != null) title.value = data["title"];
				if (data["iosSpinner"] != null) iosSpinner.value = data["iosSpinner"];
			});
			uni.$emit(readyEventName.value, {});
			uni.$emit(successEventName.value, "");
		});
		onUnload(() => {
			uni.$off(optionsEventName.value, null);
			uni.$off(readyEventName.value, null);
			uni.$off(successEventName.value, null);
			uni.$off(failEventName.value, null);
		});
		return (_ctx, _cache) => {
			const _component_loading = index_x_default$1;
			const _component_text = text_default;
			const _component_view = view_default;
			return openBlock(), createBlock(_component_view, { class: normalizeClass(["uni-loading-mask", { "uni-loading-mask--show": showAnim.value }]) }, {
				default: withCtx(() => [createVNode(_component_view, { class: normalizeClass(["uni-loading-dialog", { "uni-loading-dialog--show": showAnim.value }]) }, {
					default: withCtx(() => [createVNode(_component_loading, {
						class: "uni-loading-dialog__spinner",
						"ios-spinner": iosSpinner.value
					}, null, 8, ["ios-spinner"]), title.value ? (openBlock(), createBlock(_component_text, {
						key: 0,
						class: "uni-loading-dialog__title",
						"max-lines": "1"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(title.value), 1)]),
						_: 1
					})) : createCommentVNode("", true)]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 8, ["class"]);
		};
	}
}), [["styles", ["\n	/**\n	 * 透明背景\n	 */\n.uni-loading-mask {\n		display: flex;\n		height: 100%;\n		width: 100%;\n		justify-content: center;\n		align-items: center;\n		background-color: rgba(0, 0, 0, 0);\n		transition-duration: 0.1s;\n		transition-property: opacity;\n		opacity: 0;\n}\n.uni-loading-mask--show {\n		opacity: 1;\n}\n\n	/**\n	 * 居中的内容展示区域\n	 */\n.uni-loading-dialog {\n		display: flex;\n		justify-content: center;\n		align-items: center;\n		min-width: 136px;\n		max-width: 600rpx;\n		height: 136px;\n		padding: 10px;\n		background-color: rgba(76, 76, 76, 1);\n		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n		border-radius: 8px;\n		opacity: 0;\n		transform: scale(0.9);\n		transition-duration: 0.1s;\n		transition-property: opacity, transform;\n}\n.uni-loading-dialog.uni-loading-dialog--show {\n		opacity: 1;\n		transform: scale(1);\n}\n.uni-loading-dialog__spinner {\n		width: 36px;\n		height: 36px;\n		border-color: white;\n}\n.uni-loading-dialog__title {\n		margin-top: 14px;\n		color: white;\n		font-size: 16px;\n		lines: 1;\n		text-align: center;\n		text-overflow: ellipsis;\n\n		display: -webkit-box;\n		-webkit-line-clamp: 1;\n		-webkit-box-orient: vertical;\n		overflow: hidden;\n}\n"]]]);
//#endregion
//#region ../../uni-ext-api/uni_modules/uni-showLoading/utssdk/interface.uts.ts
var ShowLoadingSuccessImpl = class {
	constructor(errMsg = "showLoading:ok") {
		_defineProperty(this, "errMsg", void 0);
		this.errMsg = errMsg;
	}
};
var ShowLoadingFailImpl = class extends UniError {
	constructor(errMsg = "showLoading:fail cancel", errCode = 4) {
		super();
		_defineProperty(this, "errCode", void 0);
		this.errMsg = errMsg;
		this.errCode = errCode;
	}
};
var HideLoadingSuccessImpl = class {
	constructor(errMsg = "hideLoading:ok") {
		_defineProperty(this, "errMsg", void 0);
		this.errMsg = errMsg;
	}
};
var HideLoadingFailImpl = class extends UniError {
	constructor(errMsg = "hideLoading:fail cancel", errCode = 4) {
		super();
		_defineProperty(this, "errCode", void 0);
		this.errMsg = errMsg;
		this.errCode = errCode;
	}
};
//#endregion
//#region ../../uni-ext-api/uni_modules/uni-showLoading/utssdk/index.uts.ts
var showLoading$1 = (options) => {
	var _options$fail3, _options$complete4;
	const baseEventName = `uni_loading_${`${Date.now()}${Math.floor(Math.random() * 1e7)}`}`;
	const readyEventName = `${baseEventName}_ready`;
	const optionsEventName = `${baseEventName}_options`;
	const successEventName = `${baseEventName}_success`;
	const failEventName = `${baseEventName}_fail`;
	uni.$on(readyEventName, () => {
		uni.$emit(optionsEventName, options != null ? JSON.parse(JSON.stringify(options)) : {});
	});
	uni.$on(successEventName, (_) => {
		var _options$success, _options$complete;
		const res = new ShowLoadingSuccessImpl();
		options === null || options === void 0 || (_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, res);
		options === null || options === void 0 || (_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options, res);
	});
	uni.$on(failEventName, () => {
		var _options$fail, _options$complete2;
		const res = new ShowLoadingFailImpl();
		options === null || options === void 0 || (_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, res);
		options === null || options === void 0 || (_options$complete2 = options.complete) === null || _options$complete2 === void 0 || _options$complete2.call(options, res);
	});
	const openRet = uni.openDialogPage({
		url: `uni:showLoading?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
		fail(err) {
			var _options$fail2, _options$complete3;
			const res = new ShowLoadingFailImpl(`showLoading failed, ${err.errMsg}`);
			options === null || options === void 0 || (_options$fail2 = options.fail) === null || _options$fail2 === void 0 || _options$fail2.call(options, res);
			options === null || options === void 0 || (_options$complete3 = options.complete) === null || _options$complete3 === void 0 || _options$complete3.call(options, res);
			uni.$off(readyEventName);
			uni.$off(successEventName);
			uni.$off(failEventName);
		}
	});
	if (openRet != null) return openRet;
	const res = new ShowLoadingFailImpl();
	options === null || options === void 0 || (_options$fail3 = options.fail) === null || _options$fail3 === void 0 || _options$fail3.call(options, res);
	options === null || options === void 0 || (_options$complete4 = options.complete) === null || _options$complete4 === void 0 || _options$complete4.call(options, res);
	return null;
};
var SYSTEM_DIALOG_LOADING_PAGE_PATH = "uni:showLoading";
var hideLoading$1 = (options) => {
	var _options$success2, _options$complete6;
	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1];
	if (currentPage == null) {
		var _options$fail4, _options$complete5;
		const res = new HideLoadingFailImpl();
		options === null || options === void 0 || (_options$fail4 = options.fail) === null || _options$fail4 === void 0 || _options$fail4.call(options, res);
		options === null || options === void 0 || (_options$complete5 = options.complete) === null || _options$complete5 === void 0 || _options$complete5.call(options, res);
		return;
	}
	const loadingPage = options === null || options === void 0 ? void 0 : options.loadingPage;
	const systemDialogPages = currentPage.$getSystemDialogPages();
	for (let i = systemDialogPages.length - 1; i >= 0; i--) {
		const page = systemDialogPages[i];
		if (!page.route.startsWith(SYSTEM_DIALOG_LOADING_PAGE_PATH)) continue;
		if (loadingPage == null) uni.closeDialogPage({ dialogPage: page });
		else if (loadingPage === page) {
			uni.closeDialogPage({ dialogPage: page });
			break;
		}
	}
	const res = new HideLoadingSuccessImpl();
	options === null || options === void 0 || (_options$success2 = options.success) === null || _options$success2 === void 0 || _options$success2.call(options, res);
	options === null || options === void 0 || (_options$complete6 = options.complete) === null || _options$complete6 === void 0 || _options$complete6.call(options, res);
};
//#endregion
//#region src/x/service/api/pages/loading.ts
var API_HIDE_LOADING = "hideLoading";
var registerLoadingOnce = /* @__PURE__ */ once(() => {
	registerSystemRoute("uni:showLoading", showLoading_default);
});
var hideLoading = /*#__PURE__*/ defineAsyncApi(API_HIDE_LOADING, (args, { resolve, reject }) => {
	registerLoadingOnce();
	hideLoading$1(extend({
		success: (res) => {
			resolve(res);
		},
		fail: (err) => {
			reject(err);
		}
	}, args));
});
var showLoading = /*#__PURE__*/ defineAsyncApi(API_SHOW_LOADING, (args, { resolve, reject }) => {
	registerLoadingOnce();
	return showLoading$1(extend({
		success: (res) => {
			resolve(res);
		},
		fail: (err) => {
			reject(err);
		}
	}, args));
});
//#endregion
//#region src/x/service/api/worker/createWorker.ts
var API_CREATE_WORKER = "createWorker";
var MESSAGE_EVENT = "__UNI_WEB_WORKER_MESSAGE";
var ERROR_EVENT = "__UNI_WEB_WORKER_ERROR";
var id = 0;
var createWorker = /*#__PURE__*/ defineSyncApi(API_CREATE_WORKER, (url) => {
	const MESSAGE_EVENT_NAME = `${MESSAGE_EVENT}_${id}`;
	const ERROR_EVENT_NAME = `${ERROR_EVENT}_${id}`;
	id++;
	const threadWorker = new Worker(getRealPath(url.startsWith("/") ? url : "/" + url), { type: "module" });
	threadWorker.onmessage = (event) => {
		$emit(MESSAGE_EVENT_NAME, event.data);
	};
	threadWorker.onmessageerror = (error) => {
		$emit(ERROR_EVENT_NAME, error.data);
	};
	threadWorker.onerror = (error) => {
		$emit(ERROR_EVENT_NAME, `${error.message} in ${error.filename}(${error.lineno}:${error.colno})`);
	};
	class WorkerImpl {
		constructor() {
			this._threadWorker = threadWorker;
		}
		onMessage(listener) {
			$on(MESSAGE_EVENT_NAME, listener);
		}
		onError(listener) {
			$on(ERROR_EVENT_NAME, listener);
		}
		postMessage(message, options = null) {
			var _ref;
			this._threadWorker.postMessage(message, (_ref = options === null || options === void 0 ? void 0 : options.transfer) !== null && _ref !== void 0 ? _ref : void 0);
		}
		terminate() {
			$off(MESSAGE_EVENT_NAME);
			$off(ERROR_EVENT_NAME);
			this._threadWorker.terminate();
		}
	}
	return new WorkerImpl();
});
//#endregion
//#region src/x/service/api/index.ts
var api_exports = /* @__PURE__ */ __exportAll({
	$emit: () => $emit,
	$off: () => $off,
	$on: () => $on,
	$once: () => $once,
	__f__: () => __f__,
	addInterceptor: () => addInterceptor,
	addPhoneContact: () => addPhoneContact,
	arrayBufferToBase64: () => arrayBufferToBase64,
	base64ToArrayBuffer: () => base64ToArrayBuffer,
	canIUse: () => canIUse,
	canvasGetImageData: () => canvasGetImageData,
	canvasPutImageData: () => canvasPutImageData,
	canvasToTempFilePath: () => canvasToTempFilePath,
	chooseFile: () => chooseFile,
	chooseImage: () => chooseImage,
	chooseLocation: () => chooseLocation,
	chooseVideo: () => chooseVideo,
	clearStorage: () => clearStorage,
	clearStorageSync: () => clearStorageSync,
	closeDialogPage: () => closeDialogPage,
	closePreviewImage: () => closePreviewImage,
	closeSocket: () => closeSocket,
	connectSocket: () => connectSocket,
	createAnimation: () => createAnimation,
	createCameraContext: () => createCameraContext,
	createCanvasContext: () => createCanvasContext,
	createCanvasContextAsync: () => createCanvasContextAsync,
	createEditorContextAsync: () => createEditorContextAsync,
	createInnerAudioContext: () => createInnerAudioContext,
	createIntersectionObserver: () => createIntersectionObserver,
	createLivePlayerContext: () => createLivePlayerContext,
	createMapContext: () => createMapContext,
	createMediaQueryObserver: () => createMediaQueryObserver,
	createSelectorQuery: () => createSelectorQuery,
	createVideoContext: () => createVideoContext,
	createWorker: () => createWorker,
	cssBackdropFilter: () => cssBackdropFilter,
	cssConstant: () => cssConstant,
	cssEnv: () => cssEnv,
	cssVar: () => cssVar,
	downloadFile: () => downloadFile,
	getAppBaseInfo: () => getAppBaseInfo,
	getClipboardData: () => getClipboardData,
	getDeviceInfo: () => getDeviceInfo,
	getElementById: () => getElementById,
	getEnterOptionsSync: () => getEnterOptionsSync,
	getFacialRecognitionMetaInfo: () => getFacialRecognitionMetaInfo,
	getFileInfo: () => getFileInfo,
	getImageInfo: () => getImageInfo,
	getLaunchOptionsSync: () => getLaunchOptionsSync,
	getLeftWindowStyle: () => getLeftWindowStyle,
	getLocale: () => getLocale,
	getLocation: () => getLocation,
	getNetworkType: () => getNetworkType,
	getProvider: () => getProvider,
	getPushClientId: () => getPushClientId,
	getRecorderManager: () => getRecorderManager,
	getRightWindowStyle: () => getRightWindowStyle,
	getSavedFileInfo: () => getSavedFileInfo,
	getSavedFileList: () => getSavedFileList,
	getScreenBrightness: () => getScreenBrightness,
	getSelectedTextRange: () => getSelectedTextRange,
	getStorage: () => getStorage,
	getStorageInfo: () => getStorageInfo,
	getStorageInfoSync: () => getStorageInfoSync,
	getStorageSync: () => getStorageSync,
	getSystemInfo: () => getSystemInfo,
	getSystemInfoSync: () => getSystemInfoSync,
	getTabBarPageId: () => getTabBarPageId,
	getTopWindowStyle: () => getTopWindowStyle,
	getVideoInfo: () => getVideoInfo,
	getWindowInfo: () => getWindowInfo,
	hideActionSheet: () => hideActionSheet,
	hideKeyboard: () => hideKeyboard,
	hideLeftWindow: () => hideLeftWindow,
	hideLoading: () => hideLoading,
	hideModal: () => hideModal,
	hideNavigationBarLoading: () => hideNavigationBarLoading,
	hideRightWindow: () => hideRightWindow,
	hideTabBar: () => hideTabBar,
	hideTabBarRedDot: () => hideTabBarRedDot,
	hideToast: () => hideToast,
	hideTopWindow: () => hideTopWindow,
	interceptors: () => interceptors,
	invokePushCallback: () => invokePushCallback,
	loadFontFace: () => loadFontFace,
	login: () => login,
	makePhoneCall: () => makePhoneCall,
	navigateBack: () => navigateBack,
	navigateTo: () => navigateTo,
	offAccelerometerChange: () => offAccelerometerChange,
	offAppHide: () => offAppHide,
	offAppShow: () => offAppShow,
	offCompassChange: () => offCompassChange,
	offError: () => offError,
	offHostThemeChange: () => offHostThemeChange,
	offLocationChange: () => offLocationChange,
	offLocationChangeError: () => offLocationChangeError,
	offNetworkStatusChange: () => offNetworkStatusChange,
	offPageNotFound: () => offPageNotFound,
	offPushMessage: () => offPushMessage,
	offThemeChange: () => offThemeChange,
	offUnhandledRejection: () => offUnhandledRejection,
	offWindowResize: () => offWindowResize,
	onAccelerometerChange: () => onAccelerometerChange,
	onAppHide: () => onAppHide,
	onAppShow: () => onAppShow,
	onCompassChange: () => onCompassChange,
	onCreateVueApp: () => onCreateVueApp,
	onError: () => onError,
	onGyroscopeChange: () => onGyroscopeChange,
	onHostThemeChange: () => onHostThemeChange,
	onLocaleChange: () => onLocaleChange,
	onLocationChange: () => onLocationChange,
	onLocationChangeError: () => onLocationChangeError,
	onMemoryWarning: () => onMemoryWarning,
	onNetworkStatusChange: () => onNetworkStatusChange,
	onPageNotFound: () => onPageNotFound,
	onPushMessage: () => onPushMessage,
	onSocketClose: () => onSocketClose,
	onSocketError: () => onSocketError,
	onSocketMessage: () => onSocketMessage,
	onSocketOpen: () => onSocketOpen,
	onTabBarMidButtonTap: () => onTabBarMidButtonTap,
	onThemeChange: () => onThemeChange,
	onUnhandledRejection: () => onUnhandledRejection,
	onUserCaptureScreen: () => onUserCaptureScreen,
	onWindowResize: () => onWindowResize,
	openDialogPage: () => openDialogPage,
	openDocument: () => openDocument,
	openLocation: () => openLocation,
	pageScrollTo: () => pageScrollTo,
	preloadPage: () => preloadPage,
	previewImage: () => previewImage,
	reLaunch: () => reLaunch,
	redirectTo: () => redirectTo,
	removeAllPages: () => removeAllPages,
	removeInterceptor: () => removeInterceptor,
	removeLastPage: () => removeLastPage,
	removeNonTabBarPages: () => removeNonTabBarPages,
	removeSavedFile: () => removeSavedFile,
	removeStorage: () => removeStorage,
	removeStorageSync: () => removeStorageSync,
	removeTabBarBadge: () => removeTabBarBadge,
	request: () => request,
	rpx2px: () => upx2px,
	saveFile: () => saveFile,
	saveImageToPhotosAlbum: () => saveImageToPhotosAlbum,
	saveVideoToPhotosAlbum: () => saveVideoToPhotosAlbum,
	scanCode: () => scanCode,
	sendSocketMessage: () => sendSocketMessage,
	setClipboardData: () => setClipboardData,
	setKeepScreenOn: () => setKeepScreenOn,
	setLeftWindowStyle: () => setLeftWindowStyle,
	setLocale: () => setLocale,
	setNavigationBarColor: () => setNavigationBarColor,
	setNavigationBarTitle: () => setNavigationBarTitle,
	setPageMeta: () => setPageMeta,
	setRightWindowStyle: () => setRightWindowStyle,
	setScreenBrightness: () => setScreenBrightness,
	setStorage: () => setStorage,
	setStorageSync: () => setStorageSync,
	setTabBarBadge: () => setTabBarBadge,
	setTabBarItem: () => setTabBarItem,
	setTabBarStyle: () => setTabBarStyle,
	setTopWindowStyle: () => setTopWindowStyle,
	showActionSheet: () => showActionSheet,
	showLeftWindow: () => showLeftWindow,
	showLoading: () => showLoading,
	showModal: () => showModal,
	showNavigationBarLoading: () => showNavigationBarLoading,
	showRightWindow: () => showRightWindow,
	showTabBar: () => showTabBar,
	showTabBarRedDot: () => showTabBarRedDot,
	showToast: () => showToast,
	showTopWindow: () => showTopWindow,
	startAccelerometer: () => startAccelerometer,
	startCompass: () => startCompass,
	startGyroscope: () => startGyroscope,
	startLocationUpdate: () => startLocationUpdate,
	startPullDownRefresh: () => startPullDownRefresh,
	stopAccelerometer: () => stopAccelerometer,
	stopCompass: () => stopCompass,
	stopGyroscope: () => stopGyroscope,
	stopLocationUpdate: () => stopLocationUpdate,
	stopPullDownRefresh: () => stopPullDownRefresh,
	switchTab: () => switchTab,
	uploadFile: () => uploadFile,
	upx2px: () => upx2px,
	vibrateLong: () => vibrateLong,
	vibrateShort: () => vibrateShort
});
window.UniResizeObserver = window.ResizeObserver;
//#endregion
//#region src/x/service/api/uni.ts
var uni$1 = api_exports;
//#endregion
//#region src/service/bridge/index.ts
var UniServiceJSBridge$1 = /*#__PURE__*/ extend(ServiceJSBridge, { publishHandler(event, args, pageId) {
	UniViewJSBridge.subscribeHandler(event, args, pageId);
} });
//#endregion
export { $emit, $off, $on, $once, ad_default as Ad, ad_content_page_default as AdContentPage, ad_draw_default as AdDraw, async_error_default as AsyncErrorComponent, async_loading_default as AsyncLoadingComponent, button_default as Button, camera_default as Camera, index_x_default as Canvas, checkbox_default as Checkbox, checkbox_group_default as CheckboxGroup, cover_image_default as CoverImage, cover_view_default as CoverView, editor_default as Editor, form_default as Form, icon_default as Icon, image_default as Image, input_default as Input, label_default as Label, layout_default as LayoutComponent, list_item_default as ListItem, list_view_default as ListView, live_player_default as LivePlayer, live_pusher_default as LivePusher, index_x_default$1 as Loading, map_default as Map, MatchMedia, movable_area_default as MovableArea, movable_view_default as MovableView, navigator_default as Navigator, page_default as PageComponent, page_container_default as PageContainer, picker_default as Picker, picker_view_default as PickerView, picker_view_column_default as PickerViewColumn, progress_default as Progress, index_x_default$2 as Radio, radio_group_default as RadioGroup, resize_sensor_default as ResizeSensor, rich_text_default as RichText, scroll_view_default as ScrollView, index_x_default$3 as Slider, sticky_header_default as StickyHeader, sticky_section_default as StickySection, swiper_default as Swiper, swiper_item_default as SwiperItem, index_x_default$4 as Switch, text_default as Text, textarea_default as Textarea, UTS$1 as UTS, UTSJSONObject, UTSValueIterable, UniButtonElement, UniButtonElement as UniButtonElementImpl, UniCanvasElement, UniCanvasElement as UniCanvasElementImpl, UniCheckboxElement, UniCheckboxElement as UniCheckboxElementImpl, UniCheckboxGroupElement, UniCheckboxGroupElement as UniCheckboxGroupElementImpl, UniCoverImageElement, UniCoverViewElement, UniEditorElement, UniEditorElement as UniEditorElementImpl, UniElement, UniElement as UniElementImpl, UniError$1 as UniError, UniFormElement, UniFormElement as UniFormElementImpl, UniIconElement, UniIconElement as UniIconElementImpl, UniImageElement, UniImageElement as UniImageElementImpl, UniInputElement, UniInputElement as UniInputElementImpl, UniLabelElement, UniLabelElement as UniLabelElementImpl, UniListItemElement, UniListItemElement as UniListItemElementImpl, UniListViewElement, UniListViewElement as UniListViewElementImpl, UniMapElement, UniMovableAreaElement, UniMovableAreaElement as UniMovableAreaElementImpl, UniMovableViewElement, UniMovableViewElement as UniMovableViewElementImpl, UniNavigatorElement, UniNavigatorElement as UniNavigatorElementImpl, UniPageContainerElement, UniPageContainerElement as UniPageContainerElementImpl, UniPickerElement, UniPickerViewColumnElement, UniPickerViewColumnElement as UniPickerViewColumnElementImpl, UniPickerViewElement, UniPickerViewElement as UniPickerViewElementImpl, UniProgressElement, UniProgressElement as UniProgressElementImpl, UniRadioElement, UniRadioElement as UniRadioElementImpl, UniRadioGroupElement, UniRadioGroupElement as UniRadioGroupElementImpl, UniRichTextElement, UniRichTextElement as UniRichTextElementImpl, UniScrollViewElement, UniScrollViewElement as UniScrollViewElementImpl, UniServiceJSBridge$1 as UniServiceJSBridge, UniSliderElement, UniSliderElement as UniSliderElementImpl, UniStickyHeaderElement, UniStickyHeaderElement as UniStickyHeaderElementImpl, UniStickySectionElement, UniStickySectionElement as UniStickySectionElementImpl, UniSwiperElement, UniSwiperElement as UniSwiperElementImpl, UniSwiperItemElement, UniSwiperItemElement as UniSwiperItemElementImpl, UniSwitchElement, UniSwitchElement as UniSwitchElementImpl, UniTextElement, UniTextElement as UniTextElementImpl, UniTextareaElement, UniTextareaElement as UniTextareaElementImpl, UniVideoElement, UniViewElement, UniViewElement as UniViewElementImpl, UniViewJSBridge$1 as UniViewJSBridge, UniWebViewElement, video_default as Video, view_default as View, index_x_default$5 as WebView, __f__, addInterceptor, addPhoneContact, arrayBufferToBase64, base64ToArrayBuffer, canIUse, canvasGetImageData, canvasPutImageData, canvasToTempFilePath, chooseFile, chooseImage, chooseLocation, chooseVideo, clearStorage, clearStorageSync, closeDialogPage, closePreviewImage, closeSocket, connectSocket, createAnimation, createCameraContext, createCanvasContext, createCanvasContextAsync, createEditorContextAsync, createInnerAudioContext, createIntersectionObserver, createLivePlayerContext, createMapContext, createMediaQueryObserver, createSelectorQuery, createVideoContext, createWorker, cssBackdropFilter, cssConstant, cssEnv, cssVar, downloadFile, getApp$1 as getApp, getAppBaseInfo, getClipboardData, getCurrentPages$1 as getCurrentPages, getDeviceInfo, getElementById, getEnterOptionsSync, getFacialRecognitionMetaInfo, getFileInfo, getImageInfo, getLaunchOptionsSync, getLeftWindowStyle, getLocale, getLocation, getNetworkType, getProvider, getPushClientId, getRealPath, getRecorderManager, getRightWindowStyle, getSavedFileInfo, getSavedFileList, getScreenBrightness, getSelectedTextRange, getStorage, getStorageInfo, getStorageInfoSync, getStorageSync, getSystemInfo, getSystemInfoSync, getTabBarPageId, getTopWindowStyle, getVideoInfo, getWindowInfo, hideActionSheet, hideKeyboard, hideLeftWindow, hideLoading, hideModal, hideNavigationBarLoading, hideRightWindow, hideTabBar, hideTabBarRedDot, hideToast, hideTopWindow, interceptors, invokePushCallback, loadFontFace, login, makePhoneCall, navigateBack, navigateTo, offAccelerometerChange, offAppHide, offAppShow, offCompassChange, offError, offHostThemeChange, offLocationChange, offLocationChangeError, offNetworkStatusChange, offPageNotFound, offPushMessage, offThemeChange, offUnhandledRejection, offWindowResize, onAccelerometerChange, onAppHide, onAppShow, onCompassChange, onCreateVueApp, onError, onGyroscopeChange, onHostThemeChange, onLocaleChange, onLocationChange, onLocationChangeError, onMemoryWarning, onNetworkStatusChange, onPageNotFound, onPushMessage, onSocketClose, onSocketError, onSocketMessage, onSocketOpen, onTabBarMidButtonTap, onThemeChange, onUnhandledRejection, onUserCaptureScreen, onWindowResize, openDialogPage, openDocument, openLocation, pageScrollTo, plugin_default as plugin, preloadPage, previewImage, reLaunch, redirectTo, removeAllPages, removeInterceptor, removeLastPage, removeNonTabBarPages, removeSavedFile, removeStorage, removeStorageSync, removeTabBarBadge, request, upx2px as rpx2px, upx2px, saveFile, saveImageToPhotosAlbum, saveVideoToPhotosAlbum, scanCode, sendSocketMessage, setClipboardData, setKeepScreenOn, setLeftWindowStyle, setLocale, setNavigationBarColor, setNavigationBarTitle, setPageMeta, setRightWindowStyle, setScreenBrightness, setStorage, setStorageSync, setTabBarBadge, setTabBarItem, setTabBarStyle, setTopWindowStyle, setupApp, setupPage, setupWindow, showActionSheet, showLeftWindow, showLoading, showModal, showNavigationBarLoading, showRightWindow, showTabBar, showTabBarRedDot, showToast, showTopWindow, startAccelerometer, startCompass, startGyroscope, startLocationUpdate, startPullDownRefresh, stopAccelerometer, stopCompass, stopGyroscope, stopLocationUpdate, stopPullDownRefresh, switchTab, uni$1 as uni, uploadFile, useI18n, useTabBar, vibrateLong, vibrateShort };
