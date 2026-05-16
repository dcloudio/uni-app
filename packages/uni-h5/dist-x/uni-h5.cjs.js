Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
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
let _dcloudio_uni_shared = require("@dcloudio/uni-shared");
let vue = require("vue");
let _vue_shared = require("@vue/shared");
let _dcloudio_uni_i18n = require("@dcloudio/uni-i18n");
let vue_router = require("vue-router");
//#region src/x/polyfill/polyfill.ts
var realGlobal = (0, _dcloudio_uni_shared.getGlobal)();
realGlobal.UTS = _dcloudio_uni_shared.UTS;
realGlobal.UTSJSONObject = _dcloudio_uni_shared.UTSJSONObject;
realGlobal.UTSValueIterable = _dcloudio_uni_shared.UTSValueIterable;
realGlobal.UniError = _dcloudio_uni_shared.UniError;
//#endregion
//#region ../uni-core/src/i18n/utils.ts
var isEnableLocale = /* @__PURE__ */ (0, _dcloudio_uni_shared.once)(() => typeof __uniConfig !== "undefined" && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length);
//#endregion
//#region ../uni-core/src/i18n/useI18n.ts
var i18n;
function getLocaleMessage() {
	const locale = uni.getLocale();
	const locales = __uniConfig.locales;
	return locales[locale] || locales[__uniConfig.fallbackLocale] || locales.en || {};
}
function formatI18n(message) {
	if ((0, _dcloudio_uni_i18n.isI18nStr)(message, _dcloudio_uni_shared.I18N_JSON_DELIMITERS)) return useI18n().f(message, getLocaleMessage(), _dcloudio_uni_shared.I18N_JSON_DELIMITERS);
	return message;
}
function resolveJsonObj(jsonObj, names) {
	if (names.length === 1) {
		if (jsonObj) {
			const _isI18nStr = (value) => (0, _vue_shared.isString)(value) && (0, _dcloudio_uni_i18n.isI18nStr)(value, _dcloudio_uni_shared.I18N_JSON_DELIMITERS);
			const _name = names[0];
			let filterJsonObj = [];
			if ((0, _vue_shared.isArray)(jsonObj) && (filterJsonObj = jsonObj.filter((item) => _isI18nStr(item[_name]))).length) return filterJsonObj;
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
	if ((0, _vue_shared.isArray)(jsonObj)) jsonObj.forEach((item) => defineI18nProperty(item, [prop]));
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
		locale = (0, _dcloudio_uni_shared.getEnvLocale)();
		i18n = (0, _dcloudio_uni_i18n.initVueI18n)(locale);
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
var initI18nAsyncMsgsOnce = /* @__PURE__ */ (0, _dcloudio_uni_shared.once)(() => {
	const name = "uni.async.";
	const keys = ["error"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(_dcloudio_uni_i18n.LOCALE_EN, normalizeMessages(name, keys, ["The connection timed out, click the screen to try again."]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(_dcloudio_uni_i18n.LOCALE_ES, normalizeMessages(name, keys, ["Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo."]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(_dcloudio_uni_i18n.LOCALE_FR, normalizeMessages(name, keys, ["La connexion a expiré, cliquez sur l'écran pour réessayer."]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(_dcloudio_uni_i18n.LOCALE_ZH_HANS, normalizeMessages(name, keys, ["连接服务器超时，点击屏幕重试"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(_dcloudio_uni_i18n.LOCALE_ZH_HANT, normalizeMessages(name, keys, ["連接服務器超時，點擊屏幕重試"]), false);
});
var initI18nPickerMsgsOnce = /* @__PURE__ */ (0, _dcloudio_uni_shared.once)(() => {
	const name = "uni.picker.";
	const keys = ["done", "cancel"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(_dcloudio_uni_i18n.LOCALE_EN, normalizeMessages(name, keys, ["Done", "Cancel"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(_dcloudio_uni_i18n.LOCALE_ES, normalizeMessages(name, keys, ["OK", "Cancelar"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(_dcloudio_uni_i18n.LOCALE_FR, normalizeMessages(name, keys, ["OK", "Annuler"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(_dcloudio_uni_i18n.LOCALE_ZH_HANS, normalizeMessages(name, keys, ["完成", "取消"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(_dcloudio_uni_i18n.LOCALE_ZH_HANT, normalizeMessages(name, keys, ["完成", "取消"]), false);
});
var initI18nVideoMsgsOnce = /* @__PURE__ */ (0, _dcloudio_uni_shared.once)(() => {
	const name = "uni.video.";
	const keys = ["danmu", "volume"];
	if (__UNI_FEATURE_I18N_EN__) useI18n().add(_dcloudio_uni_i18n.LOCALE_EN, normalizeMessages(name, keys, ["Danmu", "Volume"]), false);
	if (__UNI_FEATURE_I18N_ES__) useI18n().add(_dcloudio_uni_i18n.LOCALE_ES, normalizeMessages(name, keys, ["Danmu", "Volumen"]), false);
	if (__UNI_FEATURE_I18N_FR__) useI18n().add(_dcloudio_uni_i18n.LOCALE_FR, normalizeMessages(name, keys, ["Danmu", "Le Volume"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANS__) useI18n().add(_dcloudio_uni_i18n.LOCALE_ZH_HANS, normalizeMessages(name, keys, ["弹幕", "音量"]), false);
	if (__UNI_FEATURE_I18N_ZH_HANT__) useI18n().add(_dcloudio_uni_i18n.LOCALE_ZH_HANT, normalizeMessages(name, keys, ["彈幕", "音量"]), false);
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
	const emitter = new _dcloudio_uni_shared.Emitter();
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
function registerViewMethod(pageId, name, fn) {
	name = normalizeViewMethodName(pageId, name);
	if (!viewMethods[name]) viewMethods[name] = fn;
}
//#endregion
//#region ../uni-core/src/view/bridge/index.ts
var ViewJSBridge = /* @__PURE__ */ (0, _vue_shared.extend)(/* @__PURE__ */ initBridge("service"), { invokeServiceMethod });
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
var onEventPrevent = /* @__PURE__ */ (0, vue.withModifiers)(() => {}, ["prevent"]);
var onEventStop = /* @__PURE__ */ (0, vue.withModifiers)((_event) => {}, ["stop"]);
function updateCssVar(cssVars) {
	const style = document.documentElement.style;
	Object.keys(cssVars).forEach((name) => {
		style.setProperty(name, cssVars[name]);
	});
}
function updatePageCssVar(cssVars) {
	return updateCssVar(cssVars);
}
//#endregion
//#region ../uni-core/src/helpers/util.ts
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
	return page.vm.$basePage;
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
	return (0, vue.createVNode)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32"
	}, [(0, vue.createVNode)("path", {
		d: path,
		fill: color
	}, null, 8, ["d", "fill"])], 8, ["width", "height"]);
}
//#endregion
//#region ../uni-core/src/helpers/page.ts
function useCurrentPageId() {
	{
		const { $pageInstance } = (0, vue.getCurrentInstance)();
		return $pageInstance && getPageProxyId($pageInstance.proxy);
	}
	let pageId;
	try {
		pageId = getPageProxyId((0, vue.getCurrentInstance)().root.proxy);
	} catch (_unused) {
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
	const res = (0, _vue_shared.extend)({ id }, globalStyle, pageMeta);
	PAGE_META_KEYS.forEach((name) => {
		res[name] = (0, _vue_shared.extend)({}, globalStyle[name], pageMeta[name]);
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
	const titleColor = (0, _dcloudio_uni_shared.normalizeStyles)(meta.navigationBar, __uniConfig.themeConfig, themeMode).titleColor;
	return {
		id,
		path: (0, _dcloudio_uni_shared.addLeadingSlash)(route),
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
function invokeHook(vm, name, args) {
	if ((0, _vue_shared.isString)(vm)) {
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
	if (name === _dcloudio_uni_shared.ON_BACK_PRESS) return hooks && (0, _dcloudio_uni_shared.invokeArrayFnsWithResults)(hooks, args).some((ret) => ret === true);
	return hooks && (0, _dcloudio_uni_shared.invokeArrayFns)(hooks, args);
}
//#endregion
//#region ../uni-core/src/helpers/route.ts
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
	return (0, _dcloudio_uni_shared.addLeadingSlash)(fromRouteArray.concat(toRouteArray).join("/"));
}
function getRouteOptions(path, alias = false) {
	if (alias) return __uniRoutes.find((route) => route.path === path || route.alias === path);
	return __uniRoutes.find((route) => route.path === path);
}
//#endregion
//#region ../uni-core/src/helpers/dialogPage.ts
var SYSTEM_DIALOG_PAGE_PATH_STARTER = "uni:";
function isSystemDialogPage(page) {
	return page.route.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER);
}
function getSystemDialogPages(parentPage) {
	if (!parentPage) return [];
	return parentPage.$getSystemDialogPages();
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
var ServiceJSBridge = /* @__PURE__ */ (0, _vue_shared.extend)(/* @__PURE__ */ initBridge("view"), {
	invokeOnCallback,
	invokeViewMethod,
	invokeViewMethodKeepAlive
});
function initAppVm(appVm) {
	appVm.$vm = appVm;
	appVm.$mpType = "app";
	const locale = (0, vue.ref)(useI18n().getLocale());
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
//#region ../uni-core/src/service/utils.ts
function defineGlobalData(app, defaultGlobalData) {
	const options = app.$options || {};
	options.globalData = (0, _vue_shared.extend)(options.globalData || {}, defaultGlobalData);
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
	return (0, vue.defineComponent)(options);
});
/**
* 暂未支持的组件
* @param name
* @returns
*/
var defineUnsupportedComponent = (name) => {
	return defineBuiltInComponent({
		name: (0, _vue_shared.capitalize)((0, _vue_shared.camelize)(name)),
		setup() {
			return () => ((0, vue.openBlock)(), (0, vue.createElementBlock)("uni-" + name, null, name + " is unsupported"));
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
	target = (0, _dcloudio_uni_shared.normalizeTarget)(el);
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
	const hovering = (0, vue.ref)(false);
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
	if ((0, _vue_shared.isString)(keys)) keys = [keys];
	return keys.reduce((res, key) => {
		if (props[key]) res[key] = true;
		return res;
	}, Object.create(null));
}
//#endregion
//#region ../uni-components/src/helpers/UniElement.ts
var rpx2Unit = (0, _dcloudio_uni_shared.createRpx2Unit)(_dcloudio_uni_shared.defaultRpx2Unit.unit, _dcloudio_uni_shared.defaultRpx2Unit.unitRatio, _dcloudio_uni_shared.defaultRpx2Unit.unitPrecision);
function transformRpx(value) {
	if (/(-?(?:\d+\.)?\d+)[ur]px/gi.test(value)) return value.replace(/(-?(?:\d+\.)?\d+)[ur]px/gi, (text, num) => {
		return rpx2Unit(num + "rpx");
	});
	return value;
}
var UniElement = class extends Object {
	constructor() {
		super();
		this._props = {};
		this.__isUniElement = true;
	}
	attachVmProps(props) {
		this._props = props;
	}
	getAttribute(qualifiedName) {
		const name = (0, _vue_shared.camelize)(qualifiedName);
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
var form_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Form",
	emits: ["submit", "reset"],
	setup(_props, { slots, emit }) {
		const rootRef = (0, vue.ref)(null);
		provideForm(useCustomEvent(rootRef, emit));
		return () => (0, vue.createVNode)("uni-form", { "ref": rootRef }, [(0, vue.createVNode)("span", null, [slots.default && slots.default()])], 512);
	}
});
function provideForm(trigger) {
	const fields = [];
	(0, vue.provide)(uniFormKey, {
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
//#endregion
//#region ../uni-components/src/vue/label/index.tsx
var label_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Label",
	props: labelProps,
	setup(props, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const pageId = useCurrentPageId();
		const handlers = useProvideLabel();
		const pointer = (0, vue.computed)(() => props.for || slots.default && slots.default.length);
		const _onClick = withWebEvent(($event) => {
			const EventTarget = $event.target;
			let stopPropagation = /^uni-(checkbox|radio|switch)-/.test(EventTarget.className);
			if (!stopPropagation) stopPropagation = /^uni-(checkbox|radio|switch|button)$|^(svg|path)$/i.test(EventTarget.tagName);
			if (stopPropagation) return;
			if (props.for) UniViewJSBridge.emit("uni-label-click-" + pageId + "-" + props.for, $event, true);
			else handlers.length && handlers[0]($event, true);
		});
		return () => (0, vue.createVNode)("uni-label", {
			"ref": rootRef,
			"class": { "uni-label-pointer": pointer },
			"onClick": _onClick
		}, [slots.default && slots.default()], 10, ["onClick"]);
	}
});
//#endregion
//#region ../uni-components/src/vue/button/index.tsx
var button_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Button",
	props: {
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
	},
	setup(props, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const uniForm = (0, vue.inject)(uniFormKey, false);
		const { hovering, binding } = useHover(props);
		const { t } = /* @__PURE__ */ useI18n();
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
		const uniLabel = (0, vue.inject)(uniLabelKey, false);
		if (uniLabel) uniLabel.addHandler(onClick);
		return () => {
			const hoverClass = props.hoverClass;
			const booleanAttrs = useBooleanAttr(props, "disabled");
			const loadingAttrs = useBooleanAttr(props, "loading");
			const plainAttrs = useBooleanAttr(props, "plain");
			const hasHoverClass = hoverClass && hoverClass !== "none";
			return (0, vue.createVNode)("uni-button", (0, vue.mergeProps)({
				"ref": rootRef,
				"onClick": onClick,
				"id": props.id,
				"class": hasHoverClass && hovering.value ? hoverClass : ""
			}, hasHoverClass && binding, booleanAttrs, loadingAttrs, plainAttrs), [slots.default && slots.default()], 16, ["onClick", "id"]);
		};
	}
});
var index_x_default = /* @__PURE__ */ defineBuiltInComponent({
	inheritAttrs: true,
	name: "Canvas",
	compatConfig: { MODE: 3 },
	props: { disableScroll: {
		type: [Boolean, String],
		default: false
	} },
	setup(props, {}) {
		const rootRef = (0, vue.ref)(null);
		const canvas = (0, vue.ref)(null);
		return () => {
			return (0, vue.createVNode)("uni-canvas", { "ref": rootRef }, [(0, vue.createVNode)("canvas", {
				"ref": canvas,
				"class": "uni-canvas-canvas"
			}, null, 512)], 512);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/checkbox-group/index.tsx
var uniCheckGroupKey = PolySymbol(process.env.NODE_ENV !== "production" ? "uniCheckGroup" : "ucg");
var checkbox_group_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "CheckboxGroup",
	props: { name: {
		type: String,
		default: ""
	} },
	emits: ["change"],
	setup(props, { emit, slots }) {
		const rootRef = (0, vue.ref)(null);
		useProvideCheckGroup(props, useCustomEvent(rootRef, emit));
		return () => {
			return (0, vue.createVNode)("uni-checkbox-group", { "ref": rootRef }, [slots.default && slots.default()], 512);
		};
	}
});
function useProvideCheckGroup(props, trigger) {
	const fields = [];
	const getFieldsValue = () => fields.reduce((res, field) => {
		if (field.value.checkboxChecked) res.push(field.value.value);
		return res;
	}, new Array());
	(0, vue.provide)(uniCheckGroupKey, {
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
	const uniForm = (0, vue.inject)(uniFormKey, false);
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
var checkbox_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Checkbox",
	props: {
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
	},
	setup(props, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const checkboxChecked = (0, vue.ref)(props.checked);
		const checkboxCheckedBool = (0, vue.computed)(() => {
			return checkboxChecked.value === "true" || checkboxChecked.value === true;
		});
		const checkboxValue = (0, vue.ref)(props.value);
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
		const checkboxStyle = (0, vue.computed)(() => {
			return getCheckBoxStyle(checkboxCheckedBool.value);
		});
		(0, vue.watch)([() => props.checked, () => props.value], ([newChecked, newModelValue]) => {
			checkboxChecked.value = newChecked;
			checkboxValue.value = newModelValue;
		});
		const reset = () => {
			checkboxChecked.value = false;
		};
		const { uniCheckGroup, uniLabel } = useCheckboxInject(checkboxChecked, checkboxValue, reset);
		const _onClick = ($event) => {
			if (props.disabled) return;
			checkboxChecked.value = !checkboxChecked.value;
			uniCheckGroup && uniCheckGroup.checkboxChange($event);
			$event.stopPropagation();
		};
		if (!!uniLabel) uniLabel.addHandler(_onClick);
		return () => {
			const booleanAttrs = useBooleanAttr(props, "disabled");
			let realCheckValue;
			realCheckValue = checkboxChecked.value;
			return (0, vue.createVNode)("uni-checkbox", (0, vue.mergeProps)(booleanAttrs, {
				"id": props.id,
				"onClick": _onClick,
				"ref": rootRef
			}), [(0, vue.createVNode)("div", {
				"class": "uni-checkbox-wrapper",
				"style": { "--HOVER-BD-COLOR": props.activeBorderColor }
			}, [(0, vue.createVNode)("div", {
				"class": ["uni-checkbox-input", { "uni-checkbox-input-disabled": props.disabled }],
				"style": checkboxStyle.value
			}, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props.disabled ? "#ADADAD" : props.foreColor || props.iconColor || props.color, 22) : ""], 6), slots.default && slots.default()], 4)], 16, ["id", "onClick"]);
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
//#endregion
//#region ../uni-components/src/helpers/useKeyboard.ts
var resetTimer;
/**
* 保证iOS点击输入框外隐藏键盘
*/
function iosHideKeyboard() {}
var props$23 = {
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
		const isApple = (0, vue.computed)(() => String(navigator.vendor).indexOf("Apple") === 0);
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
	(0, vue.watch)(() => elRef.value, (el) => el && initKeyboard(el));
}
//#endregion
//#region src/framework/setup/provide/page.ts
var pageMetaKey = PolySymbol(process.env.NODE_ENV !== "production" ? "UniPageMeta" : "upm");
function usePageMeta() {
	return (0, vue.inject)(pageMetaKey);
}
function providePageMeta(id) {
	const pageMeta = initPageMeta(id);
	(0, vue.provide)(pageMetaKey, pageMeta);
	return pageMeta;
}
function usePageRoute() {
	if (__UNI_FEATURE_PAGES__) return (0, vue_router.useRoute)();
	const url = location.href;
	const searchPos = url.indexOf("?");
	const hashPos = url.indexOf("#", searchPos > -1 ? searchPos : 0);
	let query = {};
	if (searchPos > -1) query = (0, _dcloudio_uni_shared.parseQuery)(url.slice(searchPos + 1, hashPos > -1 ? hashPos : url.length));
	const { meta } = __uniRoutes[0];
	const path = (0, _dcloudio_uni_shared.addLeadingSlash)(meta.route);
	return {
		meta,
		query,
		path,
		matched: [{ path }]
	};
}
function initPageMeta(id) {
	if (__UNI_FEATURE_PAGES__) return (0, vue.reactive)(normalizePageMeta(JSON.parse(JSON.stringify(initRouteMeta((0, vue_router.useRoute)().meta, id)))));
	return (0, vue.reactive)(normalizePageMeta(JSON.parse(JSON.stringify(initRouteMeta(__uniRoutes[0].meta, id)))));
}
function normalizePageMeta(pageMeta) {
	if (__UNI_FEATURE_PULL_DOWN_REFRESH__) {
		const { enablePullDownRefresh, navigationBar } = pageMeta;
		{
			const pullToRefresh = normalizePullToRefreshRpx((0, _vue_shared.extend)({
				support: true,
				color: "#2BD009",
				style: "circle",
				height: 70,
				range: 150,
				offset: 0
			}, pageMeta.pullToRefresh));
			const { type, style } = navigationBar;
			if (style !== "custom" && type !== "transparent") pullToRefresh.offset += _dcloudio_uni_shared.NAVBAR_HEIGHT + 0;
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
//#endregion
//#region src/helpers/dom.ts
function checkMinWidth(minWidth) {
	return false;
}
function getStateId() {
	return 1;
}
//#endregion
//#region ../uni-api/src/helpers/protocol.ts
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
function validateProtocolFail(name, msg) {
	console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
	if (!onFail) onFail = validateProtocolFail;
	for (const key in protocol) {
		const errMsg = validateProp(key, data[key], protocol[key], !(0, _vue_shared.hasOwn)(data, key));
		if ((0, _vue_shared.isString)(errMsg)) onFail(name, errMsg);
	}
}
function validateProtocols(name, args, protocol, onFail) {
	if (!protocol) return;
	if (!(0, _vue_shared.isArray)(protocol)) return validateProtocol(name, args[0] || Object.create(null), protocol, onFail);
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
	if (!(0, _vue_shared.isPlainObject)(prop)) prop = { type: prop };
	const { type, required, validator } = prop;
	if (required && isAbsent) return "Missing required args: \"" + name + "\"";
	if (value == null && !required) return;
	if (type != null) {
		let isValid = false;
		const types = (0, _vue_shared.isArray)(type) ? type : [type];
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
var isSimpleType = /* @__PURE__ */ (0, _vue_shared.makeMap)("String,Number,Boolean,Function,Symbol");
function assertType(value, type) {
	let valid;
	const expectedType = getType(type);
	if (isSimpleType(expectedType)) {
		const t = typeof value;
		valid = t === expectedType.toLowerCase();
		if (!valid && t === "object") valid = value instanceof type;
	} else if (expectedType === "Object") valid = (0, _vue_shared.isObject)(value);
	else if (expectedType === "Array") valid = (0, _vue_shared.isArray)(value);
	else valid = value instanceof type;
	return {
		valid,
		expectedType
	};
}
function getInvalidTypeMessage(name, value, expectedTypes) {
	let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(_vue_shared.capitalize).join(", ")}`;
	const expectedType = expectedTypes[0];
	const receivedType = (0, _vue_shared.toRawType)(value);
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
function getApiCallbacks(args) {
	const apiCallbacks = {};
	for (const name in args) {
		const fn = args[name];
		if ((0, _vue_shared.isFunction)(fn)) {
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
	if (!(0, _vue_shared.isPlainObject)(args)) args = {};
	const { success, fail, complete } = getApiCallbacks(args);
	const hasSuccess = (0, _vue_shared.isFunction)(success);
	const hasFail = (0, _vue_shared.isFunction)(fail);
	const hasComplete = (0, _vue_shared.isFunction)(complete);
	const callbackId = invokeCallbackId++;
	addInvokeCallback(callbackId, name, (res) => {
		res = res || {};
		res.errMsg = normalizeErrMsg(res.errMsg, name);
		(0, _vue_shared.isFunction)(beforeAll) && beforeAll(res);
		if (res.errMsg === name + ":ok") {
			(0, _vue_shared.isFunction)(beforeSuccess) && beforeSuccess(res, args);
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
			if ((0, _vue_shared.isPromise)(res)) promise = Promise.resolve(res);
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
		if (!(0, _vue_shared.isArray)(hooks)) return;
		const oldCallback = options[name];
		options[name] = function callbackInterceptor(res) {
			queue(hooks, res, options).then((res) => {
				return (0, _vue_shared.isFunction)(oldCallback) && oldCallback(res) || res;
			});
		};
	});
	return options;
}
function wrapperReturnValue(method, returnValue) {
	const returnValueHooks = [];
	if ((0, _vue_shared.isArray)(globalInterceptors.returnValue)) returnValueHooks.push(...globalInterceptors.returnValue);
	const interceptor = scopedInterceptors[method];
	if (interceptor && (0, _vue_shared.isArray)(interceptor.returnValue)) returnValueHooks.push(...interceptor.returnValue);
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
	if (interceptor && Object.keys(interceptor).length) if ((0, _vue_shared.isArray)(interceptor.invoke)) return queue(interceptor.invoke, options).then((options) => {
		return api(wrapperOptions(getApiInterceptorHooks(method), options), ...params);
	});
	else return api(wrapperOptions(interceptor, options), ...params);
	return api(options, ...params);
}
//#endregion
//#region ../uni-api/src/helpers/api/promise.ts
function hasCallback(args) {
	if ((0, _vue_shared.isPlainObject)(args) && [
		"success",
		"fail",
		"complete"
	].find((cb) => (0, _vue_shared.isFunction)(args[cb]))) return true;
	return false;
}
function handlePromise(promise) {
	return promise;
}
function promisify(name, fn) {
	return (args = {}, ...rest) => {
		if (hasCallback(args)) return wrapperReturnValue(name, invokeApi(name, fn, (0, _vue_shared.extend)({}, args), rest));
		return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
			invokeApi(name, fn, (0, _vue_shared.extend)({}, args, {
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
	if (!options || !options.formatArgs || !(0, _vue_shared.isPlainObject)(options.formatArgs) && (0, _vue_shared.isPlainObject)(params)) return;
	const formatArgs = options.formatArgs;
	const keys = Object.keys(formatArgs);
	for (let i = 0; i < keys.length; i++) {
		const name = keys[i];
		const formatterOrDefaultValue = formatArgs[name];
		if ((0, _vue_shared.isFunction)(formatterOrDefaultValue)) {
			const errMsg = formatterOrDefaultValue(args[0][name], params);
			if ((0, _vue_shared.isString)(errMsg)) return errMsg;
		} else if (!(0, _vue_shared.hasOwn)(params, name)) params[name] = formatterOrDefaultValue;
	}
}
function invokeSuccess(id, name, res) {
	const result = { errMsg: name + ":ok" };
	result.errSubject = name;
	return invokeCallback(id, (0, _vue_shared.extend)(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
	const errMsgPrefix = name + ":fail";
	let apiErrMsg = "";
	if (!errMsg) apiErrMsg = errMsgPrefix;
	else if (errMsg.indexOf(errMsgPrefix) === 0) apiErrMsg = errMsg;
	else apiErrMsg = errMsgPrefix + " " + errMsg;
	let res = (0, _vue_shared.extend)({ errMsg: apiErrMsg }, errRes);
	if (typeof UniError !== "undefined") res = typeof errRes.errCode !== "undefined" ? new UniError(name, errRes.errCode, apiErrMsg) : new UniError(apiErrMsg, errRes);
	return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
	if (process.env.NODE_ENV !== "production") validateProtocols(name, args, protocol);
	if (options && options.beforeInvoke) {
		const errMsg = options.beforeInvoke(args);
		if ((0, _vue_shared.isString)(errMsg)) return errMsg;
	}
	const errMsg = formatApiArgs(args, options);
	if (errMsg) return errMsg;
}
function parseErrMsg(errMsg) {
	if (!errMsg || (0, _vue_shared.isString)(errMsg)) return errMsg;
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
function defineTaskApi(name, fn, protocol, options) {
	return promisify(name, wrapperTaskApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options));
}
function defineSyncApi(name, fn, protocol, options) {
	return wrapperSyncApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options);
}
function defineAsyncApi(name, fn, protocol, options) {
	return promisify(name, wrapperAsyncApi(name, fn, process.env.NODE_ENV !== "production" ? protocol : void 0, options));
}
//#endregion
//#region ../uni-api/src/service/ui/tabBar.ts
var API_ON_TAB_BAR_MID_BUTTON_TAP = "onTabBarMidButtonTap";
var getLocale = /* @__PURE__ */ defineSyncApi("getLocale", () => {
	const app = getApp({ allowDefault: true });
	if (app && app.$vm) return app.$vm.$locale;
	return useI18n().getLocale();
});
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
	for (const key in data) if ((0, _vue_shared.hasOwn)(data, key)) {
		let v = data[key];
		if (typeof v === "undefined" || v === null) v = "";
		else if ((0, _vue_shared.isPlainObject)(v)) v = JSON.stringify(v);
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
		if (params.method === HTTP_METHODS[0] && (0, _vue_shared.isPlainObject)(params.data) && Object.keys(params.data).length) params.url = stringifyQuery$1(value, params.data);
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
//#region ../uni-api/src/protocols/ui/navigationBar.ts
var API_SET_NAVIGATION_BAR_COLOR = "setNavigationBarColor";
var API_SET_NAVIGATION_BAR_TITLE = "setNavigationBarTitle";
var SetNavigationBarTitleProtocol = { title: {
	type: String,
	required: true
} };
var API_SHOW_NAVIGATION_BAR_LOADING = "showNavigationBarLoading";
var API_HIDE_NAVIGATION_BAR_LOADING = "hideNavigationBarLoading";
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
		invokeHook(curTabBarPageVm, _dcloudio_uni_shared.ON_HIDE);
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
//#endregion
//#region src/service/api/route/redirectTo.ts
function removeLastPage() {
	var _getCurrentPage;
	const page = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
	if (!page) return;
	const $page = getPage$BasePage(page);
	removePage(normalizeRouteKey($page.path, $page.id));
}
//#endregion
//#region src/service/api/route/reLaunch.ts
function removeAllPages() {
	const keys = getCurrentPagesMap().keys();
	for (const routeKey of keys) removePage(routeKey);
}
//#endregion
//#region src/service/api/route/utils.ts
function navigate({ type, url, tabBarText, events, isAutomatedTesting }, __id__) {
	if (process.env.NODE_ENV !== "production" && !__UNI_FEATURE_PAGES__) console.warn("当前项目为单页面工程，不能执行页面跳转api。如果需进行页面跳转， 需要在pages.json文件的pages字段中配置多个页面，然后重新运行。");
	const router = getApp().vm.$router;
	const { path, query } = (0, _dcloudio_uni_shared.parseUrl)(url);
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
				if (!meta.eventChannel) meta.eventChannel = new _dcloudio_uni_shared.EventChannel(state.__id__, events);
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
	if (!tabBar) tabBar = __uniConfig.tabBar && (0, vue.reactive)(initTabBarI18n(__uniConfig.tabBar));
	return tabBar;
}
//#endregion
//#region src/helpers/cssVar.ts
var envMethod = "env";
function normalizeWindowBottom(windowBottom) {
	return envMethod ? `calc(${windowBottom}px + ${envMethod}(safe-area-inset-bottom))` : `${windowBottom}px`;
}
//#endregion
//#region src/x/framework/setup/page.ts
var homeDialogPages = [];
var homeSystemDialogPages = [];
function getPageElement(page) {
	throw new Error("Not support get page element in non-browser environment");
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
		const pageBody = getPageElement(this).querySelector("uni-page-wrapper");
		const pageWrapperInfo = getPageWrapperInfo(pageBody);
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
		const pageBody = getPageElement(this).querySelector("uni-page-wrapper");
		return getSafeAreaInsets(pageBody);
	}
	getPageStyle() {
		var _this$vm, _this$vm2;
		const pageMeta = ((_this$vm = this.vm) === null || _this$vm === void 0 ? void 0 : _this$vm.$basePage.meta) ? (0, _dcloudio_uni_shared.normalizeStyles)((_this$vm2 = this.vm) === null || _this$vm2 === void 0 ? void 0 : _this$vm2.$basePage.meta, __uniConfig.themeConfig) : void 0;
		return pageMeta ? new _dcloudio_uni_shared.UTSJSONObject({
			navigationBarBackgroundColor: pageMeta.navigationBar.backgroundColor,
			navigationBarTextStyle: pageMeta.navigationBar.titleColor,
			navigationBarTitleText: pageMeta.navigationBar.titleText,
			titleImage: pageMeta.navigationBar.titleImage || "",
			navigationStyle: pageMeta.navigationBar.style || "default",
			disableScroll: pageMeta.disableScroll || false,
			enablePullDownRefresh: pageMeta.enablePullDownRefresh || false,
			onReachBottomDistance: pageMeta.onReachBottomDistance || _dcloudio_uni_shared.ON_REACH_BOTTOM_DISTANCE,
			backgroundColorContent: pageMeta.backgroundColorContent
		}) : new _dcloudio_uni_shared.UTSJSONObject({});
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
				pageMeta.navigationBar.titleColor = ["black", "white"].includes(textStyle) ? (0, _dcloudio_uni_shared.normalizeTitleColor)(textStyle || "") : textStyle;
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
		return null;
	}
	querySelector(selector) {
		return null;
	}
	querySelectorAll(selector) {
		return [];
	}
	getAndroidView() {
		return null;
	}
	getIOSView() {
		return null;
	}
	getHTMLElement() {
		return null;
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
			route: (route === null || route === void 0 ? void 0 : route.path) ? (0, _dcloudio_uni_shared.removeLeadingSlash)(route === null || route === void 0 ? void 0 : route.path) : "",
			options: new _dcloudio_uni_shared.UTSJSONObject((route === null || route === void 0 ? void 0 : route.query) || {}),
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
	pageVm.$.__isUnload = true;
	invokeHook(pageVm, _dcloudio_uni_shared.ON_UNLOAD);
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
	initXPage(vm, route, page);
}
function normalizeRouteKey(path, id) {
	return path + SEP + id;
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
	routeCache.forEach((vnode, key) => {
		const cPageId = parseInt(key.split(SEP)[1]);
		if (cPageId && cPageId > pageId) {
			if (__UNI_FEATURE_TABBAR__ && isTabBarVNode(vnode)) return;
			routeCache.delete(key);
			routeCache.pruneCacheEntry(vnode);
			(0, vue.nextTick)(() => pruneCurrentPages());
		}
	});
}
//#endregion
//#region src/platform/dom.ts
function addBase(filePath) {
	const { base: baseUrl } = __uniConfig.router;
	if ((0, _dcloudio_uni_shared.addLeadingSlash)(filePath).indexOf(baseUrl) === 0) return (0, _dcloudio_uni_shared.addLeadingSlash)(filePath);
	return baseUrl + filePath;
}
function getRealPath(filePath) {
	const { base, assets } = __uniConfig.router;
	if (base === "./") {
		if (filePath.indexOf("./") === 0 && (filePath.includes("/static/") || filePath.indexOf("./" + (assets || "assets") + "/") === 0)) filePath = filePath.slice(1);
	}
	if (filePath.indexOf("/") === 0) if (filePath.indexOf("//") === 0) filePath = "https:" + filePath;
	else return addBase(filePath.slice(1));
	if (_dcloudio_uni_shared.SCHEME_RE.test(filePath) || _dcloudio_uni_shared.DATA_RE.test(filePath) || filePath.indexOf("blob:") === 0) return filePath;
	if (process.env.NODE_ENV !== "production") {
		if (!filePath.includes("/static/")) return filePath;
	}
	const pages = getCurrentBasePages();
	if (pages.length) return addBase(getRealRoute(getPage$BasePage(pages[pages.length - 1]).route, filePath).slice(1));
	return filePath;
}
//#endregion
//#region src/framework/components/async-loading/index.ts
var clazz = { class: "uni-async-loading" };
var loadingVNode = /* @__PURE__ */ (0, vue.createVNode)("i", { class: "uni-loading" }, null, -1);
var async_loading_default = /* @__PURE__ */ defineSystemComponent({
	name: "AsyncLoading",
	render() {
		return (0, vue.openBlock)(), (0, vue.createBlock)("div", clazz, [loadingVNode]);
	}
});
//#endregion
//#region src/framework/components/async-error/index.tsx
function reload() {
	window.location.reload();
}
var async_error_default = /* @__PURE__ */ defineSystemComponent({
	name: "AsyncError",
	props: ["error"],
	setup() {
		initI18nAsyncMsgsOnce();
		const { t } = useI18n();
		return () => (0, vue.createVNode)("div", {
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
}
//#endregion
//#region src/framework/setup/index.ts
function wrapperComponentSetup(comp, { type, clone, init, setup, before, options }) {
	if (clone) comp = (0, _vue_shared.extend)({}, comp);
	before && before(comp);
	const oldSetup = comp.setup;
	comp.setup = (props, ctx) => {
		const instance = (0, vue.getCurrentInstance)();
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
			const query = (0, _dcloudio_uni_shared.decodedQuery)(usePageRoute().query);
			instance.attrs.__pageQuery = query;
			{
				const pageInstance = getPageInstanceByChild(instance);
				if (isDialogPageInstance(pageInstance)) instance.attrs.__pageQuery = (0, _dcloudio_uni_shared.decodedQuery)((0, _dcloudio_uni_shared.parseQuery)((pageInstance === null || pageInstance === void 0 ? void 0 : pageInstance.attrs.route).split("?")[1] || ""));
			}
			getPage$BasePage(instance.proxy).options = query;
			instance.proxy.options = query;
			return query;
		}
	});
}
function setupApp(comp) {
	if (process.env.NODE_ENV !== "production") comp.__mpType = "app";
	return setupComponent(comp, {
		init: initApp$1,
		setup(instance) {
			return usePageRoute().query;
		},
		before(comp) {
			comp.mpType = "app";
			const { setup } = comp;
			const render = () => {
				return (0, vue.openBlock)(), (0, vue.createBlock)(layout_default);
			};
			comp.setup = (props, ctx) => {
				const res = setup && setup(props, ctx);
				return (0, _vue_shared.isFunction)(res) ? render : res;
			};
			comp.render = render;
		}
	});
}
//#endregion
//#region src/helpers/useDocumentTitle.ts
function updateDocumentTitle(title) {
	{
		const ssrContext = getApp$1().$vm.$.appContext.provides[vue.ssrContextKey];
		if (ssrContext) ssrContext[_dcloudio_uni_shared.UNI_SSR_TITLE] = title;
	}
	UniServiceJSBridge.emit(_dcloudio_uni_shared.ON_NAVIGATION_BAR_CHANGE, { titleText: title });
}
function useDocumentTitle(pageMeta) {
	function update() {
		updateDocumentTitle(pageMeta.navigationBar.titleText);
	}
	(0, vue.watchEffect)(update);
}
//#endregion
//#region src/service/api/base/getBrowserInfo.ts
function getTheme() {
	if (__uniConfig.darkmode !== true) return (0, _vue_shared.isString)(__uniConfig.darkmode) ? __uniConfig.darkmode : "light";
	try {
		return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
	} catch (error) {
		return "light";
	}
}
//#endregion
//#region src/helpers/theme.ts
function onThemeChange(callback) {
	if (__uniConfig.darkmode) UniServiceJSBridge.on(_dcloudio_uni_shared.ON_THEME_CHANGE, callback);
}
function parseTheme(pageStyle) {
	let parsedStyle = {};
	if (__uniConfig.darkmode) parsedStyle = (0, _dcloudio_uni_shared.normalizeStyles)(pageStyle, __uniConfig.themeConfig, getTheme());
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
function useBackgroundColorContent(pageMeta) {
	function update() {
		if (pageMeta.backgroundColorContent) parseTheme({ backgroundColorContent: pageMeta.backgroundColorContent }).backgroundColorContent;
	}
	onThemeChange(update);
	(0, vue.watchEffect)(update);
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
	(0, vue.computed)(() => hexToRgba(backgroundColor));
	id + "";
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
		const { clazz, style } = usePageHead(navigationBar);
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
				"class": clazz.value,
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
	return btns.map(({ onClick, btnClass, btnStyle, btnText, btnIconPath, badgeText, iconStyle, btnSelect }, index) => {
		return (0, vue.createVNode)("div", {
			"key": index,
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
			const clazz = {
				"uni-page-head": true,
				"uni-page-head-transparent": type === "transparent",
				"uni-page-head-titlePenetrate": titlePenetrate === "YES",
				"uni-page-head-shadow": !!shadowColorType
			};
			if (shadowColorType) clazz[`uni-page-head-shadow-${shadowColorType}`] = true;
			return clazz;
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
function usePageHeadButtons({ id, navigationBar }) {
	const left = [];
	const right = [];
	const { buttons } = navigationBar;
	if ((0, _vue_shared.isArray)(buttons)) {
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
			invokeHook(pageId, _dcloudio_uni_shared.ON_NAVIGATION_BAR_BUTTON_TAP, (0, _vue_shared.extend)({ index }, btn));
		},
		btnSelect: btn.select
	}, { get(target, key, receiver) {
		if (["btnText"].includes(key)) return btn.fontSrc && btn.fontFamily ? btn.text.replace("\\u", "&#x") : btn.text;
		else return Reflect.get(target, key, receiver);
	} });
}
function usePageHeadSearchInput({ id, navigationBar: { searchInput } }) {
	const focus = (0, vue.ref)(false);
	const text = (0, vue.ref)("");
	const composing = (0, vue.ref)(false);
	const { disabled } = searchInput;
	if (disabled) {
		const onClick = () => {
			invokeHook(id, _dcloudio_uni_shared.ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
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
		invokeHook(id, _dcloudio_uni_shared.ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, { focus: true });
	};
	const onBlur = () => {
		focus.value = false;
		invokeHook(id, _dcloudio_uni_shared.ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED, { focus: false });
	};
	const onInput = (evt) => {
		text.value = evt.detail.value;
		invokeHook(id, _dcloudio_uni_shared.ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, { text: text.value });
	};
	const onConfirm = (evt) => {
		invokeHook(id, _dcloudio_uni_shared.ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, { text: text.value });
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
var component_default = /* @__PURE__ */ _plugin_vue_export_helper_default(component_vue_vue_type_script_lang_default, [["render", _sfc_render]]);
//#endregion
//#region src/framework/components/page/pageBody.tsx
var pageBody_default = /* @__PURE__ */ defineSystemComponent({
	name: "PageBody",
	setup(props, ctx) {
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
		function _resize() {}
		return () => {
			const pageRefreshTsx = __UNI_FEATURE_PULL_DOWN_REFRESH__ && createPageRefreshTsx(refreshRef, pageMeta);
			const pageResizeSensor = (0, vue.createVNode)(resize_sensor_default, { "onResize": _resize }, null, 8, ["onResize"]);
			return (0, vue.createVNode)(vue.Fragment, null, [pageRefreshTsx, (0, vue.createVNode)("uni-page-wrapper", (0, vue.mergeProps)({ "ref": wrapperRef }, pageRefresh.value), [(0, vue.createVNode)("uni-page-body", null, [(0, vue.renderSlot)(ctx.slots, "default")]), pageResizeSensor], 16)]);
		};
	}
});
function createPageRefreshTsx(refreshRef, pageMeta) {
	return (0, vue.createVNode)(component_default, { "ref": refreshRef }, null, 512);
}
//#endregion
//#region src/framework/components/page/index.ts
var page_default = /* @__PURE__ */ defineSystemComponent({
	name: "Page",
	setup(_props, ctx) {
		let pageMeta = providePageMeta(getStateId());
		const navigationBar = pageMeta.navigationBar;
		const pageStyle = {};
		useDocumentTitle(pageMeta);
		const currentInstance = (0, vue.getCurrentInstance)();
		currentInstance.$dialogPages = (0, vue.ref)([]);
		currentInstance.$systemDialogPages = (0, vue.ref)([]);
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
			const parentInstance = (0, vue.inject)("parentInstance");
			if (currentInstance && parentInstance) {
				currentInstance.$parentInstance = parentInstance;
				assignDialogPage(ctx, parentInstance, currentInstance);
			}
		} else {
			useBackgroundColorContent(pageMeta);
			(0, vue.provide)("parentInstance", currentInstance);
		}
		return () => (0, vue.createVNode)("uni-page", {
			"data-page": pageMeta.route,
			style: pageStyle
		}, __UNI_FEATURE_NAVIGATIONBAR__ && navigationBar.style !== "custom" ? [
			(0, vue.createVNode)(pageHead_default),
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
	return (0, vue.openBlock)(), (0, vue.createBlock)(pageBody_default, { key: 0 }, {
		default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(ctx.slots, "page")]),
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
	return (0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(dialogPages, (dialogPage) => {
		const { type, page } = dialogPage;
		const fullUrl = `${page.route}${(0, _dcloudio_uni_shared.stringifyQuery)(page.options)}`;
		return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.createVNode)(page.$component, {
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
//#region ../uni-components/src/helpers/html-parser.js
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
/^Apple/.test(navigator.vendor);
//#endregion
//#region ../uni-components/src/vue/editor/quill/index.ts
function useQuill(props, rootRef, trigger) {
	(0, vue.watch)(() => props.readOnly, (value) => {});
	(0, vue.watch)(() => props.placeholder, (value) => {});
	(0, vue.watch)(() => props.type, (value) => {});
	useSubscribe((type, data, resolve) => {
		const { options, callbackId } = data;
		let res;
		let errMsg = "not ready";
		if (callbackId) resolve({
			callbackId,
			data: (0, _vue_shared.extend)({}, res, { errMsg: `${type}:${"fail " + errMsg}` })
		});
	}, useContextInfo(), true);
}
var editor_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Editor",
	props: /* @__PURE__ */ (0, _vue_shared.extend)({}, props$23, {
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
	}),
	emit: [
		"ready",
		"focus",
		"blur",
		"input",
		"statuschange",
		...emit$1
	],
	setup(props, { emit }) {
		const rootRef = (0, vue.ref)(null);
		const trigger = useCustomEvent(rootRef, emit);
		useQuill(props, rootRef, trigger);
		useKeyboard$1(props, rootRef, trigger);
		return () => {
			return (0, vue.createVNode)("uni-editor", {
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
		c: _dcloudio_uni_shared.PRIMARY_COLOR
	},
	success_no_circle: {
		d: ICON_PATH_SUCCESS_NO_CIRCLE,
		c: _dcloudio_uni_shared.PRIMARY_COLOR
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
		c: _dcloudio_uni_shared.PRIMARY_COLOR
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
	setup(props) {
		const rootRef = (0, vue.ref)(null);
		const path = (0, vue.computed)(() => ICONS[props.type]);
		return () => {
			const { value } = path;
			return (0, vue.createVNode)("uni-icon", { "ref": rootRef }, [value && value.d && createSvgIconVNode(value.d, props.color || value.c, rpx2px(props.size))], 512);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/resize-sensor/index.tsx
var resize_sensor_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "ResizeSensor",
	props: { initial: {
		type: Boolean,
		default: false
	} },
	emits: ["resize"],
	setup(props, { emit }) {
		const rootRef = (0, vue.ref)(null);
		const update = useResizeSensorUpdate(rootRef, emit, useResizeSensorReset(rootRef));
		return () => (0, vue.createVNode)("uni-resize-sensor", {
			"ref": rootRef,
			"onAnimationstartOnce": update
		}, [(0, vue.createVNode)("div", { "onScroll": update }, [(0, vue.createVNode)("div", null, null)], 40, ["onScroll"]), (0, vue.createVNode)("div", { "onScroll": update }, [(0, vue.createVNode)("div", null, null)], 40, ["onScroll"])], 40, ["onAnimationstartOnce"]);
	}
});
function useResizeSensorUpdate(rootRef, emit, reset) {
	const size = (0, vue.reactive)({
		width: -1,
		height: -1
	});
	(0, vue.watch)(() => (0, _vue_shared.extend)({}, size), (value) => emit("resize", value));
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
//#endregion
//#region ../uni-components/src/vue/image/index.tsx
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
	setup(props, { emit }) {
		const rootRef = (0, vue.ref)(null);
		const state = useImageState(rootRef, props);
		const trigger = useCustomEvent(rootRef, emit);
		const { fixSize } = useImageSize(rootRef, props, state);
		useImageLoader(state, props, rootRef, fixSize, trigger);
		return () => {
			return (0, vue.createVNode)("uni-image", { "ref": rootRef }, [(0, vue.createVNode)("div", { "style": state.modeStyle }, null, 4), FIX_MODES[props.mode] ? (0, vue.createVNode)(resize_sensor_default, { "onResize": fixSize }, null, 8, ["onResize"]) : (0, vue.createVNode)("span", null, null)], 512);
		};
	}
});
function useImageState(rootRef, props) {
	const imgSrc = (0, vue.ref)("");
	const modeStyleRef = (0, vue.computed)(() => {
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
	return (0, vue.reactive)({
		rootEl: rootRef,
		src: (0, vue.computed)(() => props.src ? getRealPath(props.src) : ""),
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
			(0, vue.nextTick)(() => {
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
	(0, vue.watch)(() => props.mode, (value, oldValue) => {
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
function useUserAction() {
	return { state: (0, vue.reactive)({ 
	/**
	* 是否用户激活
	*/
userAction: false }) };
}
//#endregion
//#region ../uni-components/src/helpers/useScopedAttrs.ts
function useScopedAttrs() {
	return { state: (0, vue.reactive)({ attrs: {} }) };
}
//#endregion
//#region ../uni-components/src/helpers/useFormField.ts
function useFormField(nameKey, value) {
	const uniForm = (0, vue.inject)(uniFormKey, false);
	if (!uniForm) return;
	const instance = (0, vue.getCurrentInstance)();
	uniForm.addField({
		submit() {
			const proxy = instance.proxy;
			return [proxy[nameKey], (0, _vue_shared.isString)(value) ? proxy[value] : value.value];
		},
		reset() {
			if ((0, _vue_shared.isString)(value)) instance.proxy[value] = "";
			else value.value = "";
		}
	});
}
//#endregion
//#region ../uni-components/src/helpers/useField.ts
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
var props$20 = /* @__PURE__ */ (0, _vue_shared.extend)({}, {
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
}, props$23);
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
	const fieldRef = (0, vue.ref)(null);
	const trigger = useCustomEvent(rootRef, emit);
	const selectionStart = (0, vue.computed)(() => {
		const selectionStart = Number(props.selectionStart);
		return isNaN(selectionStart) ? -1 : selectionStart;
	});
	const selectionEnd = (0, vue.computed)(() => {
		const selectionEnd = Number(props.selectionEnd);
		return isNaN(selectionEnd) ? -1 : selectionEnd;
	});
	const cursor = (0, vue.computed)(() => {
		const cursor = Number(props.cursor);
		return isNaN(cursor) ? -1 : cursor;
	});
	const maxlength = (0, vue.computed)(() => {
		var maxlength = Number(props.maxlength);
		return isNaN(maxlength) || maxlength < 0 ? Infinity : Math.floor(maxlength);
	});
	let value = "";
	{
		const modelValueString = getValueString(props.modelValue, props.type, maxlength.value);
		const valueString = getValueString(props.value, props.type, maxlength.value);
		value = props.modelValue !== void 0 ? modelValueString !== null && modelValueString !== void 0 ? modelValueString : valueString : valueString;
	}
	const state = (0, vue.reactive)({
		value,
		valueOrigin: value,
		maxlength,
		focus: props.focus,
		composing: false,
		selectionStart,
		selectionEnd,
		cursor
	});
	(0, vue.watch)(() => state.focus, (val) => emit("update:focus", val));
	(0, vue.watch)(() => state.maxlength, (val) => state.value = state.value.slice(0, val), { immediate: true });
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
	(0, vue.watch)(() => props.modelValue, valueChangeFn);
	(0, vue.watch)(() => props.value, valueChangeFn);
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
	return {
		trigger,
		triggerInput
	};
}
function useAutoFocus(props, fieldRef) {
	const { state: userActionState } = useUserAction();
	const needFocus = (0, vue.computed)(() => props.autoFocus || props.focus);
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
	(0, vue.watch)(() => props.focus, (value) => {
		if (value) focus();
		else blur();
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
			if ((0, _vue_shared.isFunction)(beforeInput) && beforeInput(event, state) === false) return;
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
	(0, vue.watch)([() => state.selectionStart, () => state.selectionEnd], checkSelection);
	(0, vue.watch)(() => state.cursor, checkCursor);
	(0, vue.watch)(() => fieldRef.value, initField);
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
		fixDisabledColor: false,
		trigger
	};
}
(0, _dcloudio_uni_shared.once)(() => {});
//#endregion
//#region ../uni-components/src/vue/input/index.tsx
var props$19 = /* @__PURE__ */ (0, _vue_shared.extend)({}, props$20, {
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
		const cache = (0, vue.ref)(typeof value !== "undefined" && value !== null ? value.toLocaleString() : "");
		(0, vue.watch)(() => props.modelValue, (value) => {
			cache.value = typeof value !== "undefined" && value !== null ? value.toLocaleString() : "";
		});
		(0, vue.watch)(() => props.value, (value) => {
			cache.value = typeof value !== "undefined" && value !== null ? value.toLocaleString() : "";
		});
		return cache;
	} else return (0, vue.ref)("");
}
var input_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Input",
	props: props$19,
	emits: ["confirm", ...emit],
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
		const type = (0, vue.computed)(() => {
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
		const autocomplete = (0, vue.computed)(() => {
			const camelizeIndex = AUTOCOMPLETES.indexOf(props.textContentType);
			const kebabCaseIndex = AUTOCOMPLETES.indexOf((0, _vue_shared.hyphenate)(props.textContentType));
			return AUTOCOMPLETES[camelizeIndex !== -1 ? camelizeIndex : kebabCaseIndex !== -1 ? kebabCaseIndex : 0];
		});
		const inputmode = (0, vue.computed)(() => {
			if (props.inputmode !== void 0) return props.inputmode;
			if (INPUT_MODES.includes(props.type)) return props.type;
			return {
				number: "numeric",
				digit: "decimal",
				idcard: "text"
			}[props.type];
		});
		let cache = useCache(props, type);
		const rootRef = (0, vue.ref)(null);
		const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } = useField(props, rootRef, emit, (event, state) => {});
		(0, vue.watch)(() => state.value, (value) => {
			if (props.type === "number" && !(cache.value === "-" && value === "")) cache.value = value.toString();
		});
		(0, vue.watch)(() => props.maxlength, (length) => {
			length = parseInt(length, 10);
			const realValue = state.value.slice(0, length);
			realValue !== state.value && (state.value = realValue);
		});
		const NUMBER_TYPES = ["number", "digit"];
		const step = (0, vue.computed)(() => NUMBER_TYPES.includes(props.type) ? props.step : "");
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
		return () => {
			let inputNode = props.disabled && fixDisabledColor ? (0, vue.createVNode)("input", {
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
			return (0, vue.createVNode)("uni-input", { "ref": rootRef }, [(0, vue.createVNode)("div", { "class": "uni-input-wrapper" }, [(0, vue.withDirectives)((0, vue.createVNode)("div", (0, vue.mergeProps)(scopedAttrsState.attrs, {
				"style": props.placeholderStyle,
				"class": ["uni-input-placeholder", props.placeholderClass]
			}), [props.placeholder], 16), [[vue.vShow, !(state.value.length || cache.value === "-" || cache.value.includes("."))]]), props.confirmType === "search" ? (0, vue.createVNode)("form", {
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
	const instance = (0, vue.getCurrentInstance)();
	const attrs = (0, vue.shallowRef)({});
	const listeners = (0, vue.shallowRef)({});
	const excludeAttrs = (0, vue.shallowRef)({});
	const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
	instance.attrs = (0, vue.reactive)(instance.attrs);
	(0, vue.watchEffect)(() => {
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
//#region ../uni-components/src/helpers/scroll.js
function disableScrollBounce({ disable }) {}
//#endregion
//#region ../uni-components/src/helpers/flatVNode.ts
function flatVNode(nodes) {
	const array = [];
	if ((0, _vue_shared.isArray)(nodes)) nodes.forEach((vnode) => {
		if ((0, vue.isVNode)(vnode)) if (vnode.type === vue.Fragment) array.push(...flatVNode(vnode.children));
		else array.push(vnode);
		else if ((0, _vue_shared.isArray)(vnode)) array.push(...flatVNode(vnode));
	});
	return array;
}
//#endregion
//#region ../uni-components/src/vue/movable-area/index.tsx
var movable_area_default = /* @__PURE__ */ defineBuiltInComponent({
	inheritAttrs: false,
	name: "MovableArea",
	props: { scaleArea: {
		type: Boolean,
		default: false
	} },
	setup(props, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const _isMounted = (0, vue.ref)(false);
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
		let movableViewItems = [];
		const originMovableViewContexts = [];
		function updateMovableViewContexts() {
			const contexts = [];
			for (let index = 0; index < movableViewItems.length; index++) {
				let movableViewItem = movableViewItems[index];
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
			const index = originMovableViewContexts.indexOf(movableViewContext);
			if (index >= 0) {
				originMovableViewContexts.splice(index, 1);
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
function calc(e) {
	return Math.sqrt(e.x * e.x + e.y * e.y);
}
function useMovableAreaState(props, rootRef) {
	const width = (0, vue.ref)(0);
	const height = (0, vue.ref)(0);
	const gapV = (0, vue.reactive)({
		x: null,
		y: null
	});
	const pinchStartLen = (0, vue.ref)(null);
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
var movable_view_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "MovableView",
	props: movableViewProps,
	emits: ["change", "scale"],
	setup(props, { slots, emit }) {
		const rootRef = (0, vue.ref)(null);
		const { setParent } = useMovableViewState(props, useCustomEvent(rootRef, emit), rootRef);
		return () => {
			return (0, vue.createVNode)("uni-movable-view", { "ref": rootRef }, [(0, vue.createVNode)(resize_sensor_default, { "onResize": setParent }, null, 8, ["onResize"]), slots.default && slots.default()], 512);
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
function useMovableViewTransform(rootRef, props, _scaleOffset, _scale, maxX, maxY, minX, minY, _translateX, _translateY, _SFA, _FA, _adjustScale, trigger) {
	const dampingNumber = (0, vue.computed)(() => {
		let val = Number(props.damping);
		return isNaN(val) ? 20 : val;
	});
	const xMove = (0, vue.computed)(() => props.direction === "all" || props.direction === "horizontal");
	const yMove = (0, vue.computed)(() => props.direction === "all" || props.direction === "vertical");
	const xSync = (0, vue.ref)(_getPx(props.x));
	const ySync = (0, vue.ref)(_getPx(props.y));
	(0, vue.watch)(() => props.x, (val) => {
		xSync.value = _getPx(val);
	});
	(0, vue.watch)(() => props.y, (val) => {
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
	const scaleMinNumber = (0, vue.computed)(() => {
		let val = Number(props.scaleMin);
		return isNaN(val) ? .1 : val;
	});
	const scaleMaxNumber = (0, vue.computed)(() => {
		let val = Number(props.scaleMax);
		return isNaN(val) ? 10 : val;
	});
	const scaleValueSync = (0, vue.ref)(Number(props.scaleValue) || 1);
	(0, vue.watch)(scaleValueSync, (val) => {
		_setScaleValue(val);
	});
	(0, vue.watch)(scaleMinNumber, () => {
		_setScaleMinOrMax();
	});
	(0, vue.watch)(scaleMaxNumber, () => {
		_setScaleMinOrMax();
	});
	(0, vue.watch)(() => props.scaleValue, (val) => {
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
		let val = Number(props.friction);
		return isNaN(val) || val <= 0 ? 2 : val;
	}).value);
	(0, vue.watch)(() => props.disabled, () => {
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
				if (xMove.value) _translateX.value;
				if (yMove.value) _translateY.value;
				rootRef.value.style.willChange = "transform";
			}
		}
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
var navigator_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Navigator",
	inheritAttrs: false,
	compatConfig: { MODE: 3 },
	props: /* @__PURE__ */ (0, _vue_shared.extend)({}, navigatorProps, { renderLink: {
		type: Boolean,
		default: true
	} }),
	setup(props, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const vm = (0, vue.getCurrentInstance)();
		const __scopeId = vm && vm.vnode.scopeId || "";
		const { hovering, binding } = useHover(props);
		const onClick = createNavigatorOnClick(props);
		return () => {
			const { hoverClass, url } = props;
			const hasHoverClass = props.hoverClass && props.hoverClass !== "none";
			const innerNode = props.renderLink ? (0, vue.createVNode)("a", {
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
//#endregion
//#region ../uni-components/src/components/pickerView.ts
var pickerViewProps = {
	value: {
		type: Array,
		default() {
			return [];
		},
		validator: function(val) {
			return (0, _vue_shared.isArray)(val) && val.filter((val) => typeof val === "number").length === val.length;
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
function useState$2(props) {
	const state = (0, vue.reactive)({
		value: (0, vue.reactive)([...props.value]),
		height: 34
	});
	(0, vue.watch)(() => props.value, (val, oldVal) => {
		state.value.length = val.length;
		val.forEach((val, index) => {
			if (val !== state.value[index]) state.value.splice(index, 1, val);
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
	setup(props, { slots, emit }) {
		const rootRef = (0, vue.ref)(null);
		const wrapperRef = (0, vue.ref)(null);
		const trigger = useCustomEvent(rootRef, emit);
		const state = useState$2(props);
		const resizeSensorRef = (0, vue.ref)(null);
		let ColumnsPreRef = (0, vue.ref)([]);
		let columnsRef = (0, vue.ref)([]);
		function getItemIndex(vnode) {
			let columnVNodes = columnsRef.value;
			columnVNodes = columnVNodes.filter((vnode) => vnode.type !== vue.Comment);
			let index = columnVNodes.indexOf(vnode);
			return index !== -1 ? index : ColumnsPreRef.value.indexOf(vnode);
		}
		const getPickerViewColumn = function(columnInstance) {
			return (0, vue.computed)({
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
		(0, vue.provide)("getPickerViewColumn", getPickerViewColumn);
		(0, vue.provide)("pickerViewProps", props);
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
//#endregion
//#region ../uni-components/src/vue/picker-view-column/index.tsx
var picker_view_column_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "PickerViewColumn",
	setup(props, { slots, emit }) {
		const rootRef = (0, vue.ref)(null);
		const contentRef = (0, vue.ref)(null);
		const getPickerViewColumn = (0, vue.inject)("getPickerViewColumn");
		const instance = (0, vue.getCurrentInstance)();
		const currentRef = getPickerViewColumn ? getPickerViewColumn(instance) : (0, vue.ref)(0);
		const pickerViewProps = (0, vue.inject)("pickerViewProps");
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
			if (current !== state.current) state.current = current;
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
					"class": ["uni-picker-view-mask", pickerViewProps.maskClass],
					"style": `background-size: 100% ${maskSize.value}px;${pickerViewProps.maskStyle}`
				}), null, 16),
				(0, vue.createVNode)("div", (0, vue.mergeProps)(scopedAttrsState.attrs, {
					"class": ["uni-picker-view-indicator", pickerViewProps.indicatorClass],
					"style": pickerViewProps.indicatorStyle
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
//#endregion
//#region ../uni-components/src/components/progress.ts
var FONT_SIZE = 16;
var PROGRESS_VALUES = {
	activeColor: _dcloudio_uni_shared.PRIMARY_COLOR,
	backgroundColor: "#EBEBEB",
	activeMode: "backwards"
};
//#endregion
//#region ../uni-components/src/vue/progress/index.tsx
var progress_default = /* @__PURE__ */ defineBuiltInComponent({
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
	setup(props) {
		const rootRef = (0, vue.ref)(null);
		const state = useProgressState(props);
		_activeAnimation(state, props);
		(0, vue.watch)(() => state.realPercent, (newValue, oldValue) => {
			state.strokeTimer && clearInterval(state.strokeTimer);
			state.lastPercent = oldValue || 0;
			_activeAnimation(state, props);
		});
		return () => {
			const { showInfo } = props;
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
function useProgressState(props) {
	const currentPercent = (0, vue.ref)(0);
	return (0, vue.reactive)({
		outerBarStyle: (0, vue.computed)(() => `background-color: ${props.backgroundColor}; height: ${rpx2px(props.strokeWidth)}px;`),
		innerBarStyle: (0, vue.computed)(() => {
			const backgroundColor = props.color !== PROGRESS_VALUES.activeColor && props.activeColor === PROGRESS_VALUES.activeColor ? props.color : props.activeColor;
			return `width: ${currentPercent.value}%;background-color: ${backgroundColor}`;
		}),
		realPercent: (0, vue.computed)(() => {
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
var radio_group_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "RadioGroup",
	props: { name: {
		type: String,
		default: ""
	} },
	setup(props, { emit, slots }) {
		const rootRef = (0, vue.ref)(null);
		useProvideRadioGroup(props, useCustomEvent(rootRef, emit));
		return () => {
			return (0, vue.createVNode)("uni-radio-group", { "ref": rootRef }, [slots.default && slots.default()], 512);
		};
	}
});
function useProvideRadioGroup(props, trigger) {
	const fields = [];
	const getFieldsValue = () => {
		var _fields$find;
		return (_fields$find = fields.find((field) => field.value.radioChecked)) === null || _fields$find === void 0 ? void 0 : _fields$find.value.value;
	};
	(0, vue.provide)(uniRadioGroupKey, {
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
	const uniForm = (0, vue.inject)(uniFormKey, false);
	const formField = { submit: () => {
		let data = ["", null];
		if (props.name !== "") {
			data[0] = props.name;
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
var index_x_default$2 = /* @__PURE__ */ defineBuiltInComponent({
	name: "Radio",
	props: {
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
	},
	setup(props, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const radioChecked = (0, vue.ref)(props.checked);
		const radioValue = (0, vue.ref)(props.value);
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
		const radioStyle = (0, vue.computed)(() => {
			return getRadioStyle(radioChecked.value);
		});
		(0, vue.watch)([() => props.checked, () => props.value], ([newChecked, newModelValue]) => {
			radioChecked.value = newChecked;
			radioValue.value = newModelValue;
		});
		const reset = () => {
			radioChecked.value = false;
		};
		const { uniCheckGroup, uniLabel, field } = useRadioInject(radioChecked, radioValue, reset);
		const _onClick = ($event) => {
			if (props.disabled || radioChecked.value) return;
			radioChecked.value = true;
			uniCheckGroup && uniCheckGroup.radioChange($event, field);
			$event.stopPropagation();
		};
		if (!!uniLabel) uniLabel.addHandler(_onClick);
		return () => {
			const booleanAttrs = useBooleanAttr(props, "disabled");
			let realCheckValue;
			realCheckValue = radioChecked.value;
			return (0, vue.createVNode)("uni-radio", (0, vue.mergeProps)(booleanAttrs, {
				"onClick": _onClick,
				"ref": rootRef,
				"id": props.id,
				"class": "uni-radio-wrapper",
				"style": { "--HOVER-BD-COLOR": !radioChecked.value ? props.activeBorderColor : radioStyle.value.borderColor }
			}), [(0, vue.createVNode)("div", {
				"class": ["uni-radio-input", { "uni-radio-input-disabled": props.disabled }],
				"style": radioStyle.value
			}, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props.disabled ? "#ADADAD" : props.foreColor || props.iconColor, 18) : ""], 6), slots.default && slots.default()], 16, ["onClick", "id"]);
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
		if ((0, _vue_shared.hasOwn)(CHARS, stage) && CHARS[stage]) return CHARS[stage];
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
	if (tagName === "img" && name === "src" && (0, _vue_shared.isString)(value)) return getRealPath(value);
	return value;
}
function normalizeAttrs(tagName, attrs) {
	if (!(0, _vue_shared.isPlainObject)(attrs)) return;
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
		if (!(0, _vue_shared.isPlainObject)(node)) return;
		if (!(0, _vue_shared.hasOwn)(node, "type") || node.type === "node") {
			if (!(0, _vue_shared.isString)(node.name) || !node.name) return;
			const tagName = node.name.toLowerCase();
			const nodeProps = (0, _vue_shared.extend)({ [scopeId]: "" }, processClickEvent(node, triggerItemClick), normalizeAttrs(tagName, node.attrs));
			return (0, vue.h)(node.name, nodeProps, nodeList2VNode(scopeId, triggerItemClick, node.children));
		}
		if (node.type === "text" && (0, _vue_shared.isString)(node.text) && node.text !== "") return (0, vue.createTextVNode)(decodeEntities(node.text || ""));
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
//#region ../uni-components/src/vue/rich-text/index.tsx
var rich_text_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "RichText",
	compatConfig: { MODE: 3 },
	props: { nodes: {
		type: [Array, String],
		default: function() {
			return [];
		}
	} },
	emits: ["itemclick"],
	setup(props, { emit }) {
		const vm = (0, vue.getCurrentInstance)();
		const scopeId = vm && vm.vnode.scopeId || "";
		const rootRef = (0, vue.ref)(null);
		const _vnode = (0, vue.shallowRef)([]);
		const trigger = useCustomEvent(rootRef, emit);
		function triggerItemClick(e, detail = {}) {
			trigger("itemclick", e, detail);
		}
		function renderVNode() {
			let nodeList = props.nodes;
			if ((0, _vue_shared.isString)(nodeList)) nodeList = parseHtml(props.nodes);
			_vnode.value = nodeList2VNode(scopeId, triggerItemClick, nodeList);
		}
		(0, vue.watch)(() => props.nodes, renderVNode, {
			immediate: true,
			deep: true
		});
		return () => (0, vue.h)("uni-rich-text", { ref: rootRef }, (0, vue.h)("div", {}, _vnode.value));
	}
});
//#endregion
//#region ../uni-components/src/vue/refresher/index.tsx
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
			default: "transparent"
		}
	},
	setup(props, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const rootStyle = (0, vue.computed)(() => {
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
		const refreshRotate = (0, vue.computed)(() => {
			const route = props.refresherHeight / props.refresherThreshold;
			return (route > 1 ? 1 : route) * 360;
		});
		return () => {
			const { refreshState, refresherDefaultStyle, refresherThreshold } = props;
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
var scroll_view_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "ScrollView",
	compatConfig: { MODE: 3 },
	props: {
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
	},
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
	setup(props, { emit, slots, expose }) {
		const rootRef = (0, vue.ref)(null);
		const main = (0, vue.ref)(null);
		const wrap = (0, vue.ref)(null);
		const content = (0, vue.ref)(null);
		const trigger = useCustomEvent(rootRef, emit);
		const { state, scrollTopNumber, scrollLeftNumber } = useScrollViewState(props);
		const { realScrollX, realScrollY, _scrollLeftChanged, _scrollTopChanged } = useScrollViewLoader(props, state, scrollTopNumber, scrollLeftNumber, trigger, rootRef, main, content, emit);
		const mainStyle = (0, vue.computed)(() => {
			let style = "";
			realScrollX.value ? style += "overflow-x:auto;" : style += "overflow-x:hidden;";
			realScrollY.value ? style += "overflow-y:auto;" : style += "overflow-y:hidden;";
			return style;
		});
		const scrollBarClassName = (0, vue.computed)(() => {
			let className = "uni-scroll-view";
			if (props.showScrollbar === false) className += " uni-scroll-view-scrollbar-hidden";
			return className;
		});
		expose({ $getMain() {
			return main.value;
		} });
		return () => {
			const { refresherEnabled, refresherBackground, refresherDefaultStyle, refresherThreshold } = props;
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
function useScrollViewState(props) {
	const scrollTopNumber = (0, vue.computed)(() => {
		return Number(props.scrollTop) || 0;
	});
	const scrollLeftNumber = (0, vue.computed)(() => {
		return Number(props.scrollLeft) || 0;
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
function useScrollViewLoader(props, state, scrollTopNumber, scrollLeftNumber, trigger, rootRef, main, content, emit) {
	let _innerSetScrollTop = false;
	let _innerSetScrollLeft = false;
	let beforeRefreshing = false;
	let triggerAbort = false;
	let __transitionEnd = () => {};
	const realScrollX = (0, vue.computed)(() => {
		if (props.direction === "horizontal" || props.direction === "all") return true;
		return false;
	});
	const realScrollY = (0, vue.computed)(() => {
		if (props.direction === "vertical" || props.direction === "all") return true;
		return false;
	});
	(0, vue.computed)(() => {
		let val = Number(props.upperThreshold);
		return isNaN(val) ? 50 : val;
	});
	(0, vue.computed)(() => {
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
		y: props.refresherThreshold
	};
	(0, vue.watch)(scrollTopNumber, (val) => {
		_scrollTopChanged(val);
	});
	(0, vue.watch)(scrollLeftNumber, (val) => {
		_scrollLeftChanged(val);
	});
	(0, vue.watch)(() => props.scrollIntoView, (val) => {
		_scrollIntoViewChanged(val);
	});
	(0, vue.watch)(() => props.refresherTriggered, (val) => {
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
var index_x_default$3 = /* @__PURE__ */ defineBuiltInComponent({
	name: "Slider",
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
	},
	emits: ["changing", "change"],
	setup(props, { emit }) {
		const sliderRef = (0, vue.ref)(null);
		const sliderValueRef = (0, vue.ref)(null);
		let uniSliderElement;
		(0, vue.watch)(() => props.value, (val) => {
			uniSliderElement.value = Number(val);
		});
		const trigger = useCustomEvent(sliderRef, emit);
		const state = useSliderState(props);
		const { _onInput, _onChange } = useSliderLoader(props, sliderRef, trigger);
		return () => {
			const { setTrackBgColor, setActiveColor, setThumbStyle, thumbTrackStyle, setValueStyle } = state;
			return (0, vue.createVNode)("uni-slider", { "ref": sliderRef }, [(0, vue.createVNode)("div", { "class": "uni-slider-wrapper" }, [(0, vue.createVNode)("div", { "class": "uni-slider-input" }, [
				(0, vue.createVNode)("div", {
					"style": setTrackBgColor.value,
					"class": "uni-slider-track"
				}, [(0, vue.createVNode)("div", {
					"style": setActiveColor.value,
					"class": "uni-slider-track-value"
				}, null, 4)], 4),
				(0, vue.createVNode)("div", {
					"style": thumbTrackStyle.value,
					"class": "uni-slider-thumb-track"
				}, [(0, vue.createVNode)("div", {
					"style": setThumbStyle.value,
					"class": "uni-slider-thumb-value"
				}, null, 4)], 4),
				(0, vue.createVNode)("input", {
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
			]), (0, vue.withDirectives)((0, vue.createVNode)("span", {
				"ref": sliderValueRef,
				"style": setValueStyle.value,
				"class": "uni-slider-value"
			}, null, 4), [[vue.vShow, props.showValue]])])], 512);
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
		setTrackBgColor: (0, vue.computed)(() => ({ backgroundColor: _getBgColor() })),
		setActiveColor: (0, vue.computed)(() => ({ backgroundColor: _getActiveColor() })),
		thumbTrackStyle: (0, vue.computed)(() => ({ marginRight: _getBlockSizeString() })),
		setThumbStyle: (0, vue.computed)(() => ({
			width: _getBlockSizeString(),
			height: _getBlockSizeString(),
			backgroundColor: props.foreColor || props.blockColor
		})),
		setValueStyle: (0, vue.computed)(() => ({ color: props.valueColor }))
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
	const uniForm = (0, vue.inject)(uniFormKey, false);
	if (!!uniForm) uniForm.addField({
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
	});
	return {
		_onInput,
		_onChange
	};
}
//#endregion
//#region ../uni-components/src/vue/swiper/index.tsx
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
function useState$1(props) {
	return (0, vue.reactive)({
		interval: (0, vue.computed)(() => {
			const interval = Number(props.interval);
			return isNaN(interval) ? 5e3 : interval;
		}),
		duration: (0, vue.computed)(() => {
			const duration = Number(props.duration);
			return isNaN(duration) ? 500 : duration;
		}),
		displayMultipleItems: (0, vue.computed)(() => {
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
	const swiperEnabled = (0, vue.computed)(() => swiperContexts.value.length > state.displayMultipleItems);
	const circularEnabled = (0, vue.computed)(() => props.circular && swiperEnabled.value);
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
	(0, vue.watch)([
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
	(0, vue.watch)([
		() => props.vertical,
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
		emit("update:current", val);
	});
	(0, vue.watch)(() => state.currentItemId, (val) => {
		emit("update:currentItemId", val);
	});
	function inintAutoplay(enable) {
		if (enable) scheduleAutoplay();
		else cancelSchedule();
	}
	(0, vue.watch)(() => props.autoplay && !state.userTracking, inintAutoplay);
	inintAutoplay(props.autoplay && !state.userTracking);
	function onSwiperDotClick(index) {
		animateViewport(state.current = index, currentChangeSource = "click", circularEnabled.value ? 1 : 0);
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
	setup(props, { slots, emit }) {
		const rootRef = (0, vue.ref)(null);
		const trigger = useCustomEvent(rootRef, emit);
		const slidesWrapperRef = (0, vue.ref)(null);
		const slideFrameRef = (0, vue.ref)(null);
		const state = useState$1(props);
		const slidesStyle = (0, vue.computed)(() => {
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
		const slideFrameStyle = (0, vue.computed)(() => {
			const value = Math.abs(100 / state.displayMultipleItems) + "%";
			return {
				width: props.vertical ? "100%" : value,
				height: !props.vertical ? "100%" : value
			};
		});
		let swiperItems = [];
		const originSwiperContexts = [];
		const swiperContexts = (0, vue.ref)([]);
		function updateSwiperContexts() {
			const contexts = [];
			for (let index = 0; index < swiperItems.length; index++) {
				let swiperItem = swiperItems[index];
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
			const index = originSwiperContexts.indexOf(swiperContext);
			if (index >= 0) {
				originSwiperContexts.splice(index, 1);
				updateSwiperContexts();
			}
		};
		(0, vue.provide)("removeSwiperContext", removeSwiperContext);
		const { onSwiperDotClick, circularEnabled, swiperEnabled } = useLayout(props, state, swiperContexts, slideFrameRef, emit, trigger);
		let createNavigationTsx = () => null;
		createNavigationTsx = useSwiperNavigation(rootRef, props, state, onSwiperDotClick, swiperContexts, circularEnabled, swiperEnabled);
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
				props.indicatorDots && (0, vue.createVNode)("div", { "class": ["uni-swiper-dots", props.vertical ? "uni-swiper-dots-vertical" : "uni-swiper-dots-horizontal"] }, [swiperContexts.value.map((_, index, array) => (0, vue.createVNode)("div", {
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
	let hideNavigation = (0, vue.ref)(false);
	(0, vue.watchEffect)(() => {
		isNavigationAuto = props.navigation === "auto";
		hideNavigation.value = props.navigation !== true || isNavigationAuto;
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
	function createNavigationTsx() {
		const navigationClass = {
			"uni-swiper-navigation-hide": hideNavigation.value,
			"uni-swiper-navigation-vertical": props.vertical
		};
		if (props.navigation) return (0, vue.createVNode)(vue.Fragment, null, [(0, vue.createVNode)("div", (0, vue.mergeProps)({
			"class": ["uni-swiper-navigation uni-swiper-navigation-prev", (0, _vue_shared.extend)({ "uni-swiper-navigation-disabled": prevDisabled }, navigationClass)],
			"onClick": (e) => navigationClick(e, "prev", prevDisabled)
		}, navigationAttr), [createNavigationSVG()], 16, ["onClick"]), (0, vue.createVNode)("div", (0, vue.mergeProps)({
			"class": ["uni-swiper-navigation uni-swiper-navigation-next", (0, _vue_shared.extend)({ "uni-swiper-navigation-disabled": nextDisabled }, navigationClass)],
			"onClick": (e) => navigationClick(e, "next", nextDisabled)
		}, navigationAttr), [createNavigationSVG()], 16, ["onClick"])]);
		return null;
	}
	return createNavigationTsx;
};
var swiper_item_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "SwiperItem",
	props: { itemId: {
		type: String,
		default: ""
	} },
	setup(props, { slots }) {
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
var index_x_default$4 = /* @__PURE__ */ defineBuiltInComponent({
	name: "Switch",
	props: {
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
	},
	emits: ["change"],
	setup(props, { emit }) {
		const rootRef = (0, vue.ref)(null);
		const switchChecked = (0, vue.ref)(props.checked);
		const uniLabel = useSwitchInject(rootRef, props, switchChecked);
		const trigger = useCustomEvent(rootRef, emit);
		(0, vue.watch)(() => props.checked, (val) => {
			switchChecked.value = val;
		});
		const _onClick = ($event) => {
			if (props.disabled) return;
			switchChecked.value = !switchChecked.value;
			trigger("change", $event, { value: switchChecked.value });
		};
		if (!!uniLabel) uniLabel.addHandler(_onClick);
		let checkedCache = (0, vue.ref)(switchChecked.value);
		(0, vue.watch)(() => switchChecked.value, (val) => {
			checkedCache.value = val;
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
			return (0, vue.createVNode)("uni-switch", (0, vue.mergeProps)({
				"id": props.id,
				"ref": rootRef
			}, booleanAttrs, { "onClick": _onClick }), [(0, vue.createVNode)("div", { "class": "uni-switch-wrapper" }, [(0, vue.withDirectives)((0, vue.createVNode)("div", {
				"class": ["uni-switch-input", [switchChecked.value ? "uni-switch-input-checked" : ""]],
				"style": switchInputStyle
			}, [(0, vue.createVNode)("div", {
				"class": ["uni-switch-thumb", [switchChecked.value ? "uni-switch-thumb-checked" : ""]],
				"style": thumbStyle
			}, null, 6)], 6), [[vue.vShow, type === "switch"]]), (0, vue.withDirectives)((0, vue.createVNode)("div", { "class": "uni-checkbox-input" }, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props.color, 22) : ""], 512), [[vue.vShow, type === "checkbox"]])])], 16, ["id", "onClick"]);
		};
	}
});
function useSwitchInject(rootRef, props, switchChecked) {
	const initialCheckedValue = props.checked;
	const uniForm = (0, vue.inject)(uniFormKey, false);
	const uniLabel = (0, vue.inject)(uniLabelKey, false);
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
	if (!!uniForm) uniForm.addField(formField);
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
			if (char === "n") result += _dcloudio_uni_shared.LINEFEED;
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
	setup(props, { slots }) {
		const rootRef = (0, vue.ref)(null);
		return () => {
			const children = [];
			if (slots.default) slots.default().forEach((vnode) => {
				if (vnode.shapeFlag & 8 && vnode.type !== vue.Comment) {
					let lines = [];
					lines = [parseTextIgnoreLinefeed(vnode.children, {
						space: props.space,
						decode: props.decode
					})];
					const len = lines.length - 1;
					lines.forEach((line, index) => {
						if (index === 0 && !line) {} else children.push((0, vue.createTextVNode)(line));
						if (index !== len) children.push((0, vue.createVNode)("br"));
					});
				} else {
					if (process.env.NODE_ENV !== "production" && vnode.shapeFlag & 6 && vnode.type.name !== "Text") console.warn("Do not nest other components in the text component, as there may be display differences on different platforms.");
					children.push(vnode);
				}
			});
			return (0, vue.createVNode)("uni-text", {
				"ref": rootRef,
				"selectable": props.selectable ? true : null
			}, [(0, vue.createVNode)("span", null, children)], 8, ["selectable"]);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/textarea/index.tsx
var props$10 = /* @__PURE__ */ (0, _vue_shared.extend)({}, props$20, {
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
	setup(props, { emit, expose }) {
		const rootRef = (0, vue.ref)(null);
		const wrapperRef = (0, vue.ref)(null);
		const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } = useField(props, rootRef, emit);
		const valueCompute = (0, vue.computed)(() => state.value.split(_dcloudio_uni_shared.LINEFEED));
		const isDone = (0, vue.computed)(() => ConfirmTypes.includes(props.confirmType));
		const heightRef = (0, vue.ref)(0);
		const lineRef = (0, vue.ref)(null);
		(0, vue.watch)(() => heightRef.value, (height) => {
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
		(0, vue.watch)(() => props.autoHeight, (autoHeight) => {
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
		expose({ $triggerInput: (detail) => {
			emit("update:modelValue", detail.value);
			emit("update:value", detail.value);
			state.value = detail.value;
		} });
		return () => {
			let textareaNode = props.disabled && fixDisabledColor ? (0, vue.createVNode)("textarea", {
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
			]) : (0, vue.createVNode)("textarea", {
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
			return (0, vue.createVNode)("uni-textarea", {
				"ref": rootRef,
				"auto-height": props.autoHeight
			}, [(0, vue.createVNode)("div", {
				"ref": wrapperRef,
				"class": "uni-textarea-wrapper"
			}, [
				(0, vue.withDirectives)((0, vue.createVNode)("div", (0, vue.mergeProps)(scopedAttrsState.attrs, {
					"style": props.placeholderStyle,
					"class": ["uni-textarea-placeholder", props.placeholderClass]
				}), [props.placeholder], 16), [[vue.vShow, !state.value.length]]),
				(0, vue.createVNode)("div", {
					"ref": lineRef,
					"class": "uni-textarea-line"
				}, [" "], 512),
				(0, vue.createVNode)("div", { "class": {
					"uni-textarea-compute": true,
					"uni-textarea-compute-auto-height": props.autoHeight
				} }, [valueCompute.value.map((item) => (0, vue.createVNode)("div", null, [item.trim() ? item : "."])), (0, vue.createVNode)(resize_sensor_default, {
					"initial": true,
					"onResize": onResize
				}, null, 8, ["initial", "onResize"])], 2),
				props.confirmType === "search" ? (0, vue.createVNode)("form", {
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
var view_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "View",
	props: /* @__PURE__ */ (0, _vue_shared.extend)({}, hoverProps),
	setup(props, { slots }) {
		const rootRef = (0, vue.ref)(null);
		const { hovering, binding } = useHover(props);
		return () => {
			const hoverClass = props.hoverClass;
			if (hoverClass && hoverClass !== "none") return (0, vue.createVNode)("uni-view", (0, vue.mergeProps)({
				"class": hovering.value ? hoverClass : "",
				"ref": rootRef
			}, binding), [(0, vue.renderSlot)(slots, "default")], 16);
			return (0, vue.createVNode)("uni-view", { "ref": rootRef }, [(0, vue.renderSlot)(slots, "default")], 512);
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
var list_view_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "ListView",
	props: {
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
	},
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
	setup(props, { slots, emit }) {
		const rootRef = (0, vue.ref)(null);
		const containerRef = (0, vue.ref)(null);
		const visibleRef = (0, vue.ref)(null);
		const { isVertical, state } = useListViewState(props);
		(0, vue.provide)("__listViewIsVertical", isVertical);
		(0, vue.provide)("__listViewDefaultItemSize", state.defaultItemSize);
		(0, vue.provide)("__listViewDefaultHeaderSize", state.defaultHeaderSize);
		const rearrangeDebounce = (0, _dcloudio_uni_shared.debounce)(() => {
			(0, vue.nextTick)(() => {
				_rearrange();
			});
		}, 5, {
			clearTimeout,
			setTimeout
		});
		const childStatus = [];
		(0, vue.provide)("__listViewRegisterItem", (status) => {
			childStatus.push(status);
			rearrangeDebounce();
		});
		(0, vue.provide)("__listViewUnregisterItem", (status) => {
			const index = childStatus.indexOf(status);
			childStatus.splice(index, 1);
			rearrangeDebounce();
		});
		(0, vue.provide)("__listViewFirstItemRendered", (status) => {
			state.defaultItemSize = status.cachedSize;
			state.defaultItemSizeUpdated = true;
		});
		(0, vue.watch)(() => {
			return state.defaultHeaderSize;
		}, (value) => {
			rearrangeDebounce();
		});
		(0, vue.watch)(() => {
			return state.defaultItemSize;
		}, () => {
			childStatus.forEach((status) => {
				if (status.cachedSizeUpdated) return;
				status.cachedSize = state.defaultItemSize;
			});
			rearrangeDebounce();
		});
		handleTouchEvent(isVertical, containerRef, props, state, useCustomEvent(rootRef, emit), emit);
		function resetContainerSize() {
			const containerEl = containerRef.value;
			state.containerSize = isVertical.value ? containerEl.clientHeight : containerEl.clientWidth;
			rearrangeDebounce();
		}
		(0, vue.watch)(isVertical, () => {
			resetContainerSize();
		});
		(0, vue.computed)(() => {
			const val = Number(props.upperThreshold);
			return isNaN(val) ? 50 : val;
		});
		(0, vue.computed)(() => {
			const val = Number(props.lowerThreshold);
			return isNaN(val) ? 50 : val;
		});
		const scrollTopNumber = (0, vue.computed)(() => {
			return Number(props.scrollTop) || 0;
		});
		const scrollLeftNumber = (0, vue.computed)(() => {
			return Number(props.scrollLeft) || 0;
		});
		(0, vue.watch)(scrollTopNumber, (val) => {
			if (containerRef.value) containerRef.value.scrollTop = val;
		});
		(0, vue.watch)(scrollLeftNumber, (val) => {
			if (containerRef.value) containerRef.value.scrollLeft = val;
		});
		(0, vue.watch)(() => props.scrollIntoView, (val) => {
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
		function onResize() {
			childStatus.forEach((status) => {
				status.cachedSizeUpdated = false;
			});
			resetContainerSize();
		}
		function _rearrange() {
			rearrange(visibleVNode, containerRef, isVertical, state);
		}
		/**
		* scroll-behavior: smooth; 自chrome61版本起支持，safari自15.4版本起支持。除safari外无兼容问题
		*/
		const containerStyle = (0, vue.computed)(() => {
			return `${props.direction === "none" ? "overflow: hidden;" : props.direction === "all" ? "overflow: auto;" : isVertical.value ? "overflow: hidden auto;" : "overflow: auto hidden;"}scroll-behavior: ${props.scrollWithAnimation ? "smooth" : "auto"};`;
		});
		const contentStyle = (0, vue.computed)(() => {
			return `position: relative; ${isVertical.value ? "height" : "width"}: ${state.totalSize}px;`;
		});
		const visibleStyle = (0, vue.computed)(() => {
			return `position: absolute; ${isVertical.value ? "width" : "height"}: 100%; ${isVertical.value ? "top" : "left"}: ${state.placehoderSize}px;`;
		});
		let visibleVNode = null;
		return () => {
			const { refresherEnabled, refresherBackground, refresherDefaultStyle, refresherThreshold } = props;
			const { refresherHeight, refreshState } = state;
			const defaultSlot = slots.default && slots.default();
			visibleVNode = (0, vue.createVNode)("div", {
				"ref": visibleRef,
				"class": "uni-list-view-visible",
				"style": visibleStyle.value
			}, [defaultSlot], 4);
			return (0, vue.createVNode)("uni-list-view", {
				"ref": rootRef,
				"class": "uni-list-view"
			}, [(0, vue.createVNode)("div", {
				"ref": containerRef,
				"class": `uni-list-view-container ${props.showScrollbar === false ? "uni-list-view-scrollbar-hidden" : ""}`,
				"style": containerStyle.value
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
				"class": "uni-list-view-content",
				"style": contentStyle.value
			}, [visibleVNode], 4)], 6), (0, vue.createVNode)(resize_sensor_default, { "onResize": onResize }, null, 8, ["onResize"])], 512);
		};
	}
});
function useListViewState(props) {
	const isVertical = (0, vue.computed)(() => {
		return props.direction !== "horizontal";
	});
	return {
		state: (0, vue.reactive)({
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
	(0, vue.watch)(() => props.refresherTriggered, (val) => {
		if (val === true) _setRefreshState("refreshing");
		else if (val === false) _setRefreshState("restore");
	});
}
//#endregion
//#region ../uni-components/src/vue/list-item/index.tsx
function getSize(isVertical, el) {
	var style = window.getComputedStyle(el);
	if (isVertical) return parseFloat(style.marginTop) + el.getBoundingClientRect().height + parseFloat(style.marginBottom);
	else return parseFloat(style.marginLeft) + el.getBoundingClientRect().width + parseFloat(style.marginRight);
}
var list_item_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "ListItem",
	props: {},
	setup(props, { slots, expose, attrs }) {
		if (attrs.slot === "refresher") return () => {
			return (0, vue.createVNode)("uni-list-item", null, [slots.default && slots.default()]);
		};
		const rootRef = (0, vue.ref)(null);
		const isVertical = (0, vue.inject)("__listViewIsVertical");
		const visible = (0, vue.ref)(false);
		const status = {
			type: "ListItem",
			visible,
			cachedSize: (0, vue.inject)("__listViewDefaultItemSize"),
			cachedSizeUpdated: false
		};
		expose({ __listViewChildStatus: status });
		(0, vue.inject)("__listViewRegisterItem");
		(0, vue.inject)("__listViewUnregisterItem");
		const firstItemRendered = (0, vue.inject)("__listViewFirstItemRendered");
		(0, vue.watch)(visible, (value) => {
			if (!value || status.cachedSizeUpdated) return;
			(0, vue.nextTick)(() => {
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
			return (0, vue.createVNode)("uni-list-item", { "ref": rootRef }, [slots.default && slots.default()], 512);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/sticky-section/index.tsx
var sticky_section_default = /* @__PURE__ */ defineBuiltInComponent({
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
	setup(props, { slots, expose }) {
		const rootRef = (0, vue.ref)(null);
		const isVertical = (0, vue.inject)("__listViewIsVertical");
		const placeholderSize = (0, vue.ref)(0);
		const style = (0, vue.computed)(() => {
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
			headSize: (0, vue.computed)(() => {
				return isVertical ? props.padding[0] : props.padding[3];
			}),
			tailSize: (0, vue.computed)(() => {
				return isVertical ? props.padding[2] : props.padding[1];
			}),
			placeholderSize
		} });
		return () => {
			var _slots$default;
			return (0, vue.createVNode)("uni-sticky-section", {
				"ref": rootRef,
				"style": style.value
			}, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 4);
		};
	}
});
//#endregion
//#region ../uni-components/src/vue/sticky-header/index.tsx
var sticky_header_default = /* @__PURE__ */ defineBuiltInComponent({
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
	setup(props, { slots, expose }) {
		const rootRef = (0, vue.ref)(null);
		(0, vue.inject)("__listViewIsVertical");
		const style = (0, vue.computed)(() => {
			return {
				paddingTop: props.padding[0] + "px",
				paddingRight: props.padding[1] + "px",
				paddingBottom: props.padding[2] + "px",
				paddingLeft: props.padding[3] + "px",
				top: 0 - props.padding[0] + "px"
			};
		});
		expose({ __listViewChildStatus: {
			type: "StickyHeader",
			cachedSize: (0, vue.inject)("__listViewDefaultHeaderSize"),
			cachedSizeUpdated: false
		} });
		return () => {
			var _slots$default;
			return (0, vue.createVNode)("uni-sticky-header", {
				"ref": rootRef,
				"style": style.value
			}, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 4);
		};
	}
});
//#endregion
//#region ../uni-app/dist/uni-app.es.js
var createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = (0, vue.getCurrentInstance)()) => {
	!vue.isInSSRComponentSetup && (0, vue.injectHook)(lifecycle, hook, target);
};
var onBackPress = /* @__PURE__ */ createLifeCycleHook(_dcloudio_uni_shared.ON_BACK_PRESS, 2);
//#endregion
//#region ../uni-components/src/vue/page-container/element.ts
var UniPageContainerElement = class extends UniElement {};
//#endregion
//#region \0@oxc-project+runtime@0.130.0/helpers/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.130.0/helpers/toPrimitive.js
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
//#region \0@oxc-project+runtime@0.130.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.130.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.130.0/helpers/objectSpread2.js
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
var page_container_default = /* @__PURE__ */ (0, vue.defineComponent)(_objectSpread2(_objectSpread2({}, {
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
		const showPageContainer = (0, vue.ref)(false);
		const isAnimating = (0, vue.ref)(false);
		const transitionTimer = (0, vue.ref)(null);
		const isEntered = (0, vue.ref)(false);
		let touchStartX = 0;
		let touchStartY = 0;
		let touchStartTime = 0;
		let isDragging = false;
		const translateValue = (0, vue.ref)(0);
		const overlayStyleMap = (0, vue.computed)(() => {
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
		const innerStyleMap = (0, vue.computed)(() => {
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
		const popupClasses = (0, vue.computed)(() => {
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
			(0, vue.nextTick)(() => {
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
			(0, vue.nextTick)(() => {
				isEntered.value = false;
				emits("leave");
				listenTransitionEnd("leave");
			});
		}
		(0, vue.watch)(() => props.show, (newVal) => {
			if (newVal && !showPageContainer.value) openContainer();
			else if (!newVal && showPageContainer.value) closeContainer();
		});
		function onClickOverlay(event) {
			if (isAnimating.value) return;
			emits("clickoverlay", event);
			(0, vue.nextTick)(() => {
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
		return (_ctx, _cache) => {
			const _component_view = view_default;
			return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [_ctx.overlay && showPageContainer.value ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_view, {
				key: 0,
				class: "uni-page-container-overlay",
				style: (0, vue.normalizeStyle)([overlayStyleMap.value, _ctx.overlayStyle]),
				onClick: onClickOverlay,
				onTouchmove: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["prevent", "stop"]))
			}, null, 8, ["style"])) : (0, vue.createCommentVNode)("", true), showPageContainer.value ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_view, {
				key: 1,
				class: (0, vue.normalizeClass)(["uni-page-container-popup", popupClasses.value]),
				style: (0, vue.normalizeStyle)([innerStyleMap.value, _ctx.customStyle]),
				onTouchstart: onTouchStart,
				onTouchmove: onTouchMove,
				onTouchend: onTouchEnd,
				onTouchcancel: onTouchCancel
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class", "style"])) : (0, vue.createCommentVNode)("", true)], 64);
		};
	}
}));
//#endregion
//#region ../uni-components/src/vue/loading/element.ts
var UniVueElement = class extends Object {};
var UniLoadingElement = class extends UniVueElement {};
//#endregion
//#region ../uni-components/src/vue/loading/useLoadingStyle.ts
function useLoadingStyle(targetElement, bold) {
	return {
		size: (0, vue.ref)("16px"),
		borderWidth: (0, vue.ref)("1px"),
		borderRadius: (0, vue.ref)("8px")
	};
}
//#endregion
//#region ../uni-components/src/vue/loading/index-x.vue
var index_x_default$1 = /* @__PURE__ */ (0, vue.defineComponent)(_objectSpread2(_objectSpread2({}, {
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
		const LoadingRef = (0, vue.ref)(null);
		const loadingStyle = (0, vue.reactive)(useLoadingStyle(LoadingRef, (0, vue.computed)(() => props.bold)));
		return (_ctx, _cache) => {
			const _component_view = view_default;
			return (0, vue.openBlock)(), (0, vue.createBlock)(_component_view, {
				class: "__uni_loading_container__",
				ref_key: "LoadingRef",
				ref: LoadingRef,
				style: { "display": "flex" }
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createVNode)(_component_view, {
					class: (0, vue.normalizeClass)(["__uni-loading__ __loading-4-3__", { "__uni-loading__paused": props.paused }]),
					style: (0, vue.normalizeStyle)([{ "box-sizing": "border-box" }, {
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
function useSubscribe(callback, name, multiple, pageId) {
	(0, vue.getCurrentInstance)().proxy;
	pageId = pageId == null ? useCurrentPageId() : pageId;
}
//#endregion
//#region ../uni-components/src/helpers/useContextInfo.ts
var index = 0;
function useContextInfo(_id) {
	useCurrentPageId();
	const vm = (0, vue.getCurrentInstance)().proxy;
	return `${vm.$options.name.toLowerCase()}.${_id || vm.id || `context${index++}`}`;
}
//#endregion
//#region ../uni-vue/src/componentOptions/hooks.ts
function injectLifecycleHook(name, hook, publicThis, instance) {
	if ((0, _vue_shared.isFunction)(hook)) (0, vue.injectHook)(name, hook.bind(publicThis), instance);
}
function initHooks(options, instance, publicThis) {
	const mpType = options.mpType || publicThis.$mpType;
	if (!mpType || mpType === "component" || mpType === "page" && instance.renderer === "component") return;
	Object.keys(options).forEach((name) => {
		if ((0, _dcloudio_uni_shared.isUniLifecycleHook)(name, options[name], false)) {
			const hooks = options[name];
			if ((0, _vue_shared.isArray)(hooks)) hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
			else injectLifecycleHook(name, hooks, publicThis, instance);
		}
	});
	if (mpType === "page") {
		instance.__isVisible = true;
		try {
			let query = instance.attrs.__pageQuery;
			query = new _dcloudio_uni_shared.UTSJSONObject((0, _dcloudio_uni_shared.decodedQuery)(query));
			invokeHook(publicThis, _dcloudio_uni_shared.ON_LOAD, query);
			if (!instance.vapor) delete instance.attrs.__pageQuery;
			const $basePage = publicThis.$basePage;
			if (($basePage === null || $basePage === void 0 ? void 0 : $basePage.openType) !== "preloadPage") if (isDialogPageInstance(getPageInstanceByChild(instance))) invokeNewDialogPageHook(publicThis.$page, _dcloudio_uni_shared.ON_SHOW);
			else invokeHook(publicThis, _dcloudio_uni_shared.ON_SHOW);
		} catch (e) {
			console.error(e.message + _dcloudio_uni_shared.LINEFEED + e.stack);
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
		if (appInstance[_dcloudio_uni_shared.ON_ERROR]) invokeHook(appInstance.proxy, _dcloudio_uni_shared.ON_ERROR, err);
		else (0, vue.logError)(err, info, instance ? instance.$.vnode : null, false);
	};
}
function mergeAsArray(to, from) {
	return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
	_dcloudio_uni_shared.UniLifecycleHooks.forEach((name) => {
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
	appConfig.errorHandler = (0, _dcloudio_uni_shared.invokeCreateErrorHandler)(app, createErrorHandler);
	initOptionMergeStrategies(appConfig.optionMergeStrategies);
	const globalProperties = appConfig.globalProperties;
	if (__UNI_FEATURE_UNI_CLOUD__) uniIdMixin(globalProperties);
	globalProperties.$set = set;
	globalProperties.$applyOptions = applyOptions;
	globalProperties.$callMethod = $callMethod;
	(0, _dcloudio_uni_shared.invokeCreateVueAppHook)(app);
}
//#endregion
//#region src/framework/plugin/router.ts
function initRouter(app) {
	const router = (0, vue_router.createRouter)(createRouterOptions());
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
function initHistory() {
	let { routerBase } = __uniConfig.router;
	if (routerBase === "/") routerBase = "";
	return (0, vue_router.createMemoryHistory)(routerBase);
}
//#endregion
//#region src/framework/plugin/index.ts
var plugin_default = { install(app) {
	initApp(app);
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
function useVideo(props, attrs, trigger) {
	const videoRef = (0, vue.ref)(null);
	const src = (0, vue.computed)(() => getRealPath(props.src));
	const muted = (0, vue.computed)(() => props.muted === "true" || props.muted === true);
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
	(0, vue.watch)(() => muted.value, (muted) => {
		const video = videoRef.value;
		video.muted = muted;
	});
	(0, vue.watch)([() => state.duration, () => props.duration], () => {
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
	const progressRef = (0, vue.ref)(null);
	const ballRef = (0, vue.ref)(null);
	const centerPlayBtnShow = (0, vue.computed)(() => props.showCenterPlayBtn && !videoState.start);
	const controlsVisible = (0, vue.ref)(true);
	const state = (0, vue.reactive)({
		seeking: false,
		touching: false,
		controlsTouching: false,
		centerPlayBtnShow,
		controlsShow: (0, vue.computed)(() => !centerPlayBtnShow.value && props.controls && controlsVisible.value),
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
function useDanmu(props, videoState) {
	const danmuRef = (0, vue.ref)(null);
	const state = (0, vue.reactive)({ enable: Boolean(props.enableDanmu) });
	let danmuIndex = {
		time: 0,
		index: -1
	};
	const danmuList = (0, _vue_shared.isArray)(props.danmuList) ? JSON.parse(JSON.stringify(props.danmuList)) : [];
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
var video_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Video",
	props: {
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
	},
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
	setup(props, { emit, attrs, slots }) {
		const rootRef = (0, vue.ref)(null);
		const containerRef = (0, vue.ref)(null);
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
		return () => {
			return (0, vue.createVNode)("uni-video", {
				"ref": rootRef,
				"id": props.id,
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
						}, null, 10, ["onClick"]), [[vue.vShow, props.showPlayBtn]]),
						(0, vue.withDirectives)((0, vue.createVNode)("div", { "class": "uni-video-current-time" }, [formatTime(videoState.currentTime)], 512), [[vue.vShow, props.showProgress]]),
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
						], 2)], 8, ["onClick"]), [[vue.vShow, props.showProgress]]),
						(0, vue.withDirectives)((0, vue.createVNode)("div", { "class": "uni-video-duration" }, [formatTime(videoState.currentDuration)], 512), [[vue.vShow, props.showProgress]])
					]),
					(0, vue.withDirectives)((0, vue.createVNode)("div", {
						"class": {
							"uni-video-icon": true,
							"uni-video-danmu-button": true,
							"uni-video-danmu-button-active": danmuState.enable
						},
						"onClick": (0, vue.withModifiers)(toggleDanmu, ["stop"])
					}, null, 10, ["onClick"]), [[vue.vShow, props.danmuBtn]]),
					(0, vue.withDirectives)((0, vue.createVNode)("div", {
						"class": {
							"uni-video-icon": true,
							"uni-video-fullscreen": true,
							"uni-video-type-fullscreen": fullscreenState.fullscreen
						},
						"onClick": (0, vue.withModifiers)(() => toggleFullscreen(!fullscreenState.fullscreen), ["stop"])
					}, null, 10, ["onClick"]), [[vue.vShow, props.showFullscreenBtn]])
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
var Invoke = /* @__PURE__ */ (0, _dcloudio_uni_shared.once)(() => UniServiceJSBridge.on(_dcloudio_uni_shared.ON_WEB_INVOKE_APP_SERVICE, onWebInvokeAppService));
var index_x_default$5 = /* @__PURE__ */ defineBuiltInComponent({
	inheritAttrs: false,
	name: "WebView",
	props: { src: {
		type: String,
		default: ""
	} },
	emits: ["load"],
	setup(props, { emit }) {
		Invoke();
		const rootRef = (0, vue.ref)(null);
		(0, vue.ref)(null);
		const { $attrs, $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
		return () => {
			return (0, vue.createVNode)("uni-web-view", (0, vue.mergeProps)({ "class": "uni-webview" }, $listeners.value, $excludeAttrs.value, { "ref": rootRef }), null, 16);
		};
	}
});
//#endregion
//#region ../../node_modules/.pnpm/@amap+amap-jsapi-types@0.0.8/node_modules/@amap/amap-jsapi-types/index.js
var require_amap_jsapi_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
//#endregion
//#region src/helpers/location.ts
var ICON_PATH_ORIGIN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAC01BMVEUAAAAAef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef8Aef96quGStdqStdpbnujMzMzCyM7Gyc7Ky83MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwAef8GfP0yjfNWnOp0qOKKsdyYt9mju9aZt9mMstx1qeJYnekyjvIIfP0qivVmouaWttnMzMyat9lppOUujPQKffxhoOfNzc3Y2Njh4eHp6enu7u7y8vL19fXv7+/i4uLZ2dnOzs6auNgOf/sKff15quHR0dHx8fH9/f3////j4+N6quFdn+iywdPb29vw8PD+/v7c3NyywtLa2tr29vbS0tLd3d38/Pzf39/o6Ojc7f+q0v+HwP9rsf9dqv9Hnv9Vpv/q6urj8P+Vx/9Am/8Pgf8Iff/z8/OAvP95uf/n5+c5l//V6f+52v+y1//7+/vt7e0rkP/09PTQ0NDq9P8Whf+cy//W1tbe3t7A3v/m5ubs7OxOov/r6+vk5OQiaPjKAAAAknRSTlMACBZ9oB71/jiqywJBZATT6hBukRXv+zDCAVrkDIf4JbQsTb7eVeJLbwfa8Rh4G/OlPS/6/kxQ9/xdmZudoJxNVhng7B6wtWdzAtQOipcF1329wS44doK/BAkyP1pvgZOsrbnGXArAg34G2IsD1eMRe7bi7k5YnqFT9V0csyPedQyYD3p/Fje+hDpskq/MwpRBC6yKp2MAAAQdSURBVHja7Zn1exMxGIAPHbrhDsPdneHuNtzd3d3dIbjLh93o2o4i7TpgG1Jk0g0mMNwd/gTa5rq129reHnK5e/bk/TFNk/dJ7r5894XjGAwGg8GgTZasCpDIll1+hxw5vXLJLpEboTx5ZXbIhyzkl9fB28cqUaCgrBKFkI3CcjoUKYolihWXUSI7EihRUjaHXF52CVRKLoe8eZIdUOkyMknkRw6UlcehYAFHiXK+skgURk6Ul8OhQjFnCVRRBolKqRxQ5SzUHaqgNGSj7VCmalqJnDkoS5RF6ZCbroNvufQkUD6qEuXTdUA+3hQdqiEXVKfnUKOmK4latalJ1EEuoZZ6162HJ9x/4OChw0eOHj12/MTJU6dxG7XUu751tjNnz4ET5y9ctLZTSr0beKFLl89bpuUDrqgC1RqNWqsKuqqzNFw7e51S6u3tc+OmZUJ9kCHY6ECwOkRvab51iUrqXej2HYDQsHBjWgx3Ae7dppB6N2wEcF9jdMGDUIDGTaR2aNoM9FqjG7QmaN5CWgc/gIePjG559BigpZQOrYB/4jBfRGRUtDkmJjY6KjLCofkpD62lc2gDfMpWPIuLdwyV8XEpHgaddBZ+wBuSFcwJqSN2ovmZ/dfnOvCTxqGtwzq8SEjv4EhISn48eWgnhUP7DvDSvgzxrs6vV6+FLiro2EkCic4QKkzwJsH1KYreCp0eQhfyDl1B/w4P/xa5JVJ4U03QjbRD9x7wXlgH5IE3wmMBHXoSlugFAcI6f/AkkSi8q6HQm6xDn77wEQ8djTwSj3tqAMguRTe4ikeOQyJ4YV+KfkQl+oNW5GbY4gWOWgbwJ+kwAD6Fi90MK2ZsrIeBBCUGwRXbqJ+/iJMQliIEBhOU6AJhtlG/IpHE2bqrYQg5h6HA4yQiRqwEfkGCdTCMmMRw+IbPDCQaHCsCYAQxiZHw3TbmD/ESOHgHwShiEqPhp/gggYkSztIxxCRawy/bmEniJaJtfwiEscQkxkFgRqJESqQwwHhiEuMBp3Vm8RK/cZoHEzKXhCK2QxEPpiJe0YlKCFaKCNv/cYBNUsBRPlkJSc0U+dM7E9H0ThGJbgZT/iR7yj+VqMS06Qr4+OFm2JdCxIa8lugzkJs5K6MfxAaYPUcBpYG5khZJEkUUSb7DPCnKRfPBXj6M8FwuegoLpCgXcQszVjhbJFUJUee2hBhLoYTIcYtB57KY+opSMdVqwatSlZVj05aV//CwJLMX2DluaUcwhXm4ali2XOoLjxUrPV26zFtF4f5p0Gp310+z13BUWNvbehEXona6iAtX/zVZmtfN4WixfsNky4S6gCCVVq3RPLdfSfpv3MRRZfPoLc6Xs/5bt3EyMGzE9h07/Xft2t15z6i9+zgGg8FgMBgMBoPBYDAYDAYj8/APG67Rie8pUDsAAAAASUVORK5CYII=";
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
//#endregion
//#region src/view/components/map/MapMarker.tsx
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
function useMarkerLabelStyle(id) {
	const className = "uni-map-marker-label-" + id;
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
	setup(props) {
		const id = String(!isNaN(Number(props.id)) ? props.id : "");
		const onMapReady = (0, vue.inject)("onMapReady");
		const updateMarkerLabelStyle = useMarkerLabelStyle(id);
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
			(0, vue.watch)(props, updateMarker);
		});
		if (id) {
			const addMapChidlContext = (0, vue.inject)("addMapChidlContext");
			(0, vue.inject)("removeMapChidlContext");
			addMapChidlContext({
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
							if ((0, _vue_shared.isFunction)(cb)) cb();
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
var MapPolyline_default = /* @__PURE__ */ defineSystemComponent({
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
			addPolyline(props);
			(0, vue.watch)(props, updatePolyline);
		});
		return () => {
			return null;
		};
	}
});
var MapCircle_default = /* @__PURE__ */ defineSystemComponent({
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
			addCircle(props);
			(0, vue.watch)(props, updateCircle);
		});
		return () => {
			return null;
		};
	}
});
var MapControl_default = /* @__PURE__ */ defineSystemComponent({
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
		const imgPath = (0, vue.computed)(() => getRealPath(props.iconPath));
		const positionStyle = (0, vue.computed)(() => {
			let positionStyle = `top:${props.position.top || 0}px;left:${props.position.left || 0}px;`;
			if (props.position.width) positionStyle += `width:${props.position.width}px;`;
			if (props.position.height) positionStyle += `height:${props.position.height}px;`;
			return positionStyle;
		});
		const handleClick = ($event) => {
			if (props.clickable) props.trigger("controltap", $event, { controlId: props.id });
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
//#endregion
//#region src/view/components/map/MapLocation.tsx
var CONTEXT_ID = "MAP_LOCATION";
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
//#endregion
//#region src/view/components/map/map-polygon/index.tsx
var map_polygon_default = /* @__PURE__ */ defineSystemComponent({
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
		(0, vue.inject)("onMapReady")((map, maps, trigger) => {
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
			(0, vue.watch)(props, drawPolygon);
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
	if ((0, _vue_shared.isArray)(points)) points.forEach((point) => {
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
function useMap(props, rootRef, emit) {
	const trigger = useCustomEvent(rootRef, emit);
	const mapRef = (0, vue.ref)(null);
	let maps;
	let map;
	const state = (0, vue.reactive)({
		latitude: Number(props.latitude),
		longitude: Number(props.longitude),
		includePoints: getPoints(props.includePoints)
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
	(0, vue.watch)([() => props.latitude, () => props.longitude], ([latitudeVlaue, longitudeVlaue]) => {
		const latitude = Number(latitudeVlaue);
		const longitude = Number(longitudeVlaue);
		if (latitude !== state.latitude || longitude !== state.longitude) {
			state.latitude = latitude;
			state.longitude = longitude;
		}
	});
	(0, vue.watch)(() => props.includePoints, (points) => {
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
						(0, _dcloudio_uni_shared.callOptions)(data, {
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
								(0, _dcloudio_uni_shared.callOptions)(data, `${type}:ok`);
							});
						} else (0, _dcloudio_uni_shared.callOptions)(data, `${type}:fail`);
					}
					break;
				case "translateMarker":
					onMapReady(() => {
						const context = contexts[data.markerId];
						if (context) {
							try {
								context.translate(data);
							} catch (error) {
								(0, _dcloudio_uni_shared.callOptions)(data, `${type}:fail ${error.message}`);
							}
							(0, _dcloudio_uni_shared.callOptions)(data, `${type}:ok`);
						} else (0, _dcloudio_uni_shared.callOptions)(data, `${type}:fail not found`);
					});
					break;
				case "includePoints":
					state.includePoints = getPoints(data.includePoints);
					if (getIsAMap()) updateBounds();
					onBoundsReady(() => {
						(0, _dcloudio_uni_shared.callOptions)(data, `${type}:ok`);
					});
					break;
				case "getRegion":
					onBoundsReady(() => {
						const latLngBounds = map.getBounds();
						const southwest = latLngBounds.getSouthWest();
						const northeast = latLngBounds.getNorthEast();
						(0, _dcloudio_uni_shared.callOptions)(data, {
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
						(0, _dcloudio_uni_shared.callOptions)(data, {
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
	setup(props, { emit, slots }) {
		const rootRef = (0, vue.ref)(null);
		const { mapRef, trigger } = useMap(props, rootRef, emit);
		return () => {
			return (0, vue.createVNode)("uni-map", {
				"ref": rootRef,
				"id": props.id
			}, [
				(0, vue.createVNode)("div", {
					"ref": mapRef,
					"style": "width: 100%; height: 100%; position: relative; overflow: hidden"
				}, null, 512),
				props.markers.map((item) => (0, vue.createVNode)(MapMarker_default, (0, vue.mergeProps)({ "key": item.id }, item), null, 16)),
				props.polyline.map((item) => (0, vue.createVNode)(MapPolyline_default, item, null, 16)),
				props.circles.map((item) => (0, vue.createVNode)(MapCircle_default, item, null, 16)),
				props.controls.map((item) => (0, vue.createVNode)(MapControl_default, (0, vue.mergeProps)(item, { "trigger": trigger }), null, 16, ["trigger"])),
				props.showLocation && (0, vue.createVNode)(MapLocation_default, null, null),
				props.polygons.map((item) => (0, vue.createVNode)(map_polygon_default, item, null, 16)),
				(0, vue.createVNode)("div", { "style": "position: absolute;top: 0;width: 100%;height: 100%;overflow: hidden;pointer-events: none;" }, [slots.default && slots.default()])
			], 8, ["id"]);
		};
	}
});
var cover_view_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "CoverView",
	compatConfig: { MODE: 3 },
	props: { scrollTop: {
		type: [String, Number],
		default: 0
	} },
	setup(props, { slots }) {
		const root = (0, vue.ref)(null);
		const content = (0, vue.ref)(null);
		(0, vue.watch)(() => props.scrollTop, (val) => {
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
				"scroll-top": props.scrollTop,
				"ref": root
			}, [(0, vue.createVNode)("div", {
				"ref": content,
				"class": "uni-cover-view"
			}, [slots.default && slots.default()], 512)], 8, ["scroll-top"]);
		};
	}
});
//#endregion
//#region src/view/components/cover-image/index.tsx
var cover_image_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "CoverImage",
	compatConfig: { MODE: 3 },
	props: { src: {
		type: String,
		default: ""
	} },
	emits: ["load", "error"],
	setup(props, { emit }) {
		const root = (0, vue.ref)(null);
		const trigger = useCustomEvent(root, emit);
		function load($event) {
			trigger("load", $event);
		}
		function error($event) {
			trigger("error", $event);
		}
		return () => {
			const { src } = props;
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
//#endregion
//#region src/helpers/usePopupStyle.ts
function usePopupStyle(props) {
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
			const popover = props.popover;
			function getNumber(value) {
				return Number(value) || 0;
			}
			if (isDesktop.value && popover) {
				(0, _vue_shared.extend)(triangleStyle, {
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
//#endregion
//#region src/helpers/useKeyboard.ts
function useKeyboard() {
	return {
		key: (0, vue.ref)(""),
		disable: (0, vue.ref)(false)
	};
}
//#endregion
//#region src/view/components/picker/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
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
var picker_default = /* @__PURE__ */ defineBuiltInComponent({
	name: "Picker",
	compatConfig: { MODE: 3 },
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
	},
	emits: [
		"change",
		"cancel",
		"columnchange"
	],
	setup(props, { emit, slots }) {
		initI18nPickerMsgsOnce();
		const { t } = useI18n();
		const rootRef = (0, vue.ref)(null);
		const pickerRef = (0, vue.ref)(null);
		const selectRef = (0, vue.ref)(null);
		const inputRef = (0, vue.ref)(null);
		const pickerRender = (0, vue.ref)(false);
		const { state, rangeArray } = usePickerState(props);
		const { system, selectorTypeComputed, _show, _l10nColumn, _l10nItem, _input, _fixInputPosition, _pickerViewChange, _cancel, _change, _resetFormData, _getFormData, _createTime, _createDate, _setValueSync } = usePickerMethods(props, state, useCustomEvent(rootRef, emit), rootRef, pickerRef, selectRef, inputRef);
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
			const { rangeKey, mode, start, end } = props;
			const booleanAttrs = useBooleanAttr(props, "disabled");
			return (0, vue.createVNode)("uni-picker", (0, vue.mergeProps)({ "ref": rootRef }, booleanAttrs, { "onClick": withWebEvent(_show) }), [
				pickerRender.value ? (0, vue.createVNode)("div", {
					"ref": pickerRef,
					"class": ["uni-picker-container", `uni-${mode}-${selectorTypeComputed.value}`],
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
					}, [t("uni.picker.cancel")], 8, ["onClick"]), (0, vue.createVNode)("div", {
						"class": "uni-picker-action uni-picker-action-confirm",
						"onClick": _change
					}, [t("uni.picker.done")], 8, ["onClick"])], 8, ["onClick"]),
					contentVisible ? (0, vue.createVNode)(picker_view_default, {
						"value": _l10nColumn(valueArray),
						"class": "uni-picker-content",
						"onChange": _pickerViewChange
					}, _isSlot(_slot2 = (0, vue.renderList)(_l10nColumn(rangeArray.value), (rangeItem, index0) => {
						let _slot;
						return (0, vue.createVNode)(picker_view_column_default, { "key": index0 }, _isSlot(_slot = (0, vue.renderList)(rangeItem, (item, index) => (0, vue.createVNode)("div", {
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
					(0, vue.createVNode)("div", {
						"ref": selectRef,
						"class": "uni-picker-select",
						"onWheel": onEventStop,
						"onTouchmove": onEventStop
					}, [(0, vue.renderList)(rangeArray.value[0], (item, index) => (0, vue.createVNode)("div", {
						"key": index,
						"class": ["uni-picker-item", { selected: valueArray[0] === index }],
						"onClick": () => {
							valueArray[0] = index;
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
function useIsiPad() {
	return (0, vue.ref)(false);
}
function useSystem() {
	return (0, vue.ref)("");
}
var __contentVisibleDelay;
function usePickerMethods(props, state, trigger, rootRef, pickerRef, selectRef, inputRef) {
	const isiPad = useIsiPad();
	const _system = useSystem();
	const selectorTypeComputed = (0, vue.computed)(() => {
		const type = props.selectorType;
		if (Object.values(selectorType).includes(type)) return type;
		return isiPad.value ? selectorType.PICKER : selectorType.SELECT;
	});
	const system = (0, vue.computed)(() => {
		if (props.mode === mode.DATE && !Object.values(fields).includes(props.fields) && state.isDesktop) return _system.value;
		return "";
	});
	const startArray = (0, vue.computed)(() => {
		return getDateValueArray(props, state, props.start, getDefaultStartValue(props));
	});
	const endArray = (0, vue.computed)(() => {
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
					if (!(0, _vue_shared.isArray)(val)) val = state.valueArray;
					if (!(0, _vue_shared.isArray)(state.valueSync)) state.valueSync = [];
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
				valueArray = getDateValueArray(props, state, val, (0, _dcloudio_uni_shared.formatDateTime)({ mode: mode.TIME }));
				break;
			case mode.DATE:
				valueArray = getDateValueArray(props, state, val, (0, _dcloudio_uni_shared.formatDateTime)({ mode: mode.DATE }));
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
		state.valueSync = (0, _vue_shared.isArray)(value) ? value.map((val) => val) : value;
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
		() => props.mode,
		() => props.value,
		() => props.range
	], _setValueSync, { deep: true });
	(0, vue.watch)(() => state.valueSync, _setValueArray, { deep: true });
	(0, vue.watch)(() => state.valueArray, (val) => {
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
			default: 750
		}
	},
	setup(props, { emit, slots }) {
		const rootRef = (0, vue.ref)(null);
		const customTuiaVisible = (0, vue.ref)(false);
		const { $excludeAttrs, $listeners } = useAttrs({ excludeListeners: true });
		const ad = new AdRender(props, useCustomEvent(rootRef, emit), rootRef, {
			hasCustomTuiaMaterial: () => Boolean(slots.default && slots.default().length),
			setCustomTuiaVisible: (visible) => {
				customTuiaVisible.value = visible;
			}
		});
		(0, vue.watch)(() => props.adpid, (val) => {
			ad.load(val);
		});
		(0, vue.watch)(() => props.adpidWidescreen, (val) => {
			ad.load(val);
		});
		return () => {
			const { adpid, adpidWidescreen, widescreenWidth } = props;
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
//#endregion
//#region src/view/components/ad-content-page/index.tsx
var ad_content_page_default = /* @__PURE__ */ defineUnsupportedComponent("ad-content-page");
//#endregion
//#region src/view/components/ad-draw/index.tsx
var ad_draw_default = /* @__PURE__ */ defineUnsupportedComponent("ad-draw");
//#endregion
//#region src/view/components/camera/index.tsx
var camera_default = /* @__PURE__ */ defineUnsupportedComponent("camera");
//#endregion
//#region src/view/components/live-player/index.tsx
var live_player_default = /* @__PURE__ */ defineUnsupportedComponent("live-player");
//#endregion
//#region src/view/components/live-pusher/index.tsx
var live_pusher_default = /* @__PURE__ */ defineUnsupportedComponent("live-pusher");
//#endregion
//#region src/view/bridge/index.ts
var UniViewJSBridge$1 = /* @__PURE__ */ (0, _vue_shared.extend)(ViewJSBridge, { publishHandler(event, args, pageId) {
	UniServiceJSBridge.subscribeHandler(event, args, pageId);
} });
//#endregion
//#region src/service/api/network/request.ts
var request = /* @__PURE__ */ defineTaskApi(API_REQUEST, ({ url, data, header = {}, method, dataType, responseType, enableChunked, withCredentials, timeout = __uniConfig.networkTimeout.request }, { resolve, reject }) => {
	timeout = timeout == null ? __uniConfig.networkTimeout.request : timeout;
	let body = null;
	const contentType = normalizeContentType(header);
	if (method !== "GET") if ((0, _vue_shared.isString)(data) || data instanceof ArrayBuffer) body = data;
	else if (contentType === "json") try {
		body = JSON.stringify(data);
	} catch (error) {
		body = data.toString();
	}
	else if (contentType === "urlencoded") {
		const bodyArray = [];
		for (const key in data) if ((0, _vue_shared.hasOwn)(data, key)) bodyArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
		body = bodyArray.join("&");
	} else body = data.toString();
	let requestTask;
	if (!enableChunked) {
		const xhr = new XMLHttpRequest();
		requestTask = new RequestTask(xhr);
		xhr.open(method, url);
		for (const key in header) if ((0, _vue_shared.hasOwn)(header, key)) xhr.setRequestHeader(key, header[key]);
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
	if (name !== "Content-Type") {
		header["Content-Type"] = header[name];
		delete header[name];
	}
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
		this._emitter = new _dcloudio_uni_shared.Emitter();
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
	headers.split(_dcloudio_uni_shared.LINEFEED).forEach((header) => {
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
		const object = (0, _vue_shared.isString)(value) ? JSON.parse(value) : value;
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
var setStorageSync = /* @__PURE__ */ defineSyncApi(API_SET_STORAGE_SYNC, (key, data) => {
	const type = typeof data;
	const value = type === "string" ? data : JSON.stringify({
		type,
		data
	});
	localStorage.setItem(key, value);
}, SetStorageSyncProtocol);
var setStorage = /* @__PURE__ */ defineAsyncApi(API_SET_STORAGE, ({ key, data }, { resolve, reject }) => {
	try {
		setStorageSync(key, data);
		resolve();
	} catch (error) {
		reject(error.message);
	}
}, SetStorageProtocol);
function getStorageOrigin(key) {
	const value = localStorage && localStorage.getItem(key);
	if (!(0, _vue_shared.isString)(value)) throw new Error("data not found");
	let data = value;
	try {
		const result = parseValue(JSON.parse(value));
		if (result !== void 0) data = result;
	} catch (error) {}
	return data;
}
var getStorageSync = /* @__PURE__ */ defineSyncApi(API_GET_STORAGE_SYNC, (key) => {
	try {
		return getStorageOrigin(key);
	} catch (error) {
		return "";
	}
}, GetStorageSyncProtocol);
var getStorage = /* @__PURE__ */ defineAsyncApi(API_GET_STORAGE, ({ key }, { resolve, reject }) => {
	try {
		resolve({ data: getStorageOrigin(key) });
	} catch (error) {
		reject(error.message);
	}
}, GetStorageProtocol);
var removeStorageSync = /* @__PURE__ */ defineSyncApi(API_REMOVE_STORAGE, (key) => {
	if (localStorage) localStorage.removeItem(key);
}, RemoveStorageSyncProtocol);
var removeStorage = /* @__PURE__ */ defineAsyncApi(API_REMOVE_STORAGE, ({ key }, { resolve }) => {
	removeStorageSync(key);
	resolve();
}, RemoveStorageProtocol);
var clearStorageSync = /* @__PURE__ */ defineSyncApi("clearStorageSync", () => {
	if (localStorage) localStorage.clear();
});
var clearStorage = /* @__PURE__ */ defineAsyncApi("clearStorage", (_, { resolve }) => {
	clearStorageSync();
	resolve();
});
var getStorageInfoSync = /* @__PURE__ */ defineSyncApi("getStorageInfoSync", () => {
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
var getStorageInfo = /* @__PURE__ */ defineAsyncApi("getStorageInfo", (_, { resolve }) => {
	resolve(getStorageInfoSync());
});
//#endregion
//#region src/service/api/device/getSystemInfoSync.ts
var browserInfo;
function initBrowserInfo() {
	return browserInfo = {};
}
var getDeviceInfo = /* @__PURE__ */ defineSyncApi("getDeviceInfo", () => {
	initBrowserInfo();
	const { deviceBrand, deviceModel, brand, model, platform, system, deviceOrientation, deviceType, osname, osversion } = browserInfo;
	return (0, _vue_shared.extend)({
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
var getAppBaseInfo = /* @__PURE__ */ defineSyncApi("getAppBaseInfo", () => {
	initBrowserInfo();
	const { theme, language, browserName, browserVersion } = browserInfo;
	return (0, _vue_shared.extend)({
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
var getSystemInfoSync = /* @__PURE__ */ defineSyncApi("getSystemInfoSync", () => {
	return {
		deviceId: Date.now() + "" + Math.floor(Math.random() * 1e7),
		platform: "nodejs"
	};
});
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
			updateDocumentTitle(args.title);
			break;
	}
	resolve();
}
var setNavigationBarTitle = /* @__PURE__ */ defineAsyncApi(API_SET_NAVIGATION_BAR_TITLE, (args, { resolve, reject }) => {
	setNavigationBar(getCurrentPageMeta(), API_SET_NAVIGATION_BAR_TITLE, args, resolve, reject);
}, SetNavigationBarTitleProtocol);
//#endregion
//#region ../../node_modules/.pnpm/localstorage-polyfill@1.0.1/node_modules/localstorage-polyfill/localStorage.js
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
//#endregion
//#region __vite-browser-external
var require___vite_browser_external = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
//#endregion
//#region ../../node_modules/.pnpm/xmlhttprequest@1.8.0/node_modules/xmlhttprequest/lib/XMLHttpRequest.js
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
		/**
		* Private variables
		*/
		var self = this;
		var http = require___vite_browser_external();
		var https = require___vite_browser_external();
		var request;
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
		/**
		* Constants
		*/
		this.UNSENT = 0;
		this.OPENED = 1;
		this.HEADERS_RECEIVED = 2;
		this.LOADING = 3;
		this.DONE = 4;
		/**
		* Public vars
		*/
		this.readyState = this.UNSENT;
		this.onreadystatechange = null;
		this.responseText = "";
		this.responseXML = "";
		this.status = null;
		this.statusText = null;
		this.withCredentials = false;
		/**
		* Private methods
		*/
		/**
		* Check if the specified header is allowed.
		*
		* @param string header Header to validate
		* @return boolean False if not allowed, otherwise true
		*/
		var isAllowedHttpHeader = function(header) {
			return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1;
		};
		/**
		* Check if the specified method is allowed.
		*
		* @param string method Request method to validate
		* @return boolean False if not allowed, otherwise true
		*/
		var isAllowedHttpMethod = function(method) {
			return method && forbiddenRequestMethods.indexOf(method) === -1;
		};
		/**
		* Public methods
		*/
		/**
		* Open the connection. Currently supports local server requests.
		*
		* @param string method Connection method (eg GET, POST)
		* @param string url URL for the connection.
		* @param boolean async Asynchronous connection. Default is true.
		* @param string user Username for basic authentication (optional)
		* @param string password Password for basic authentication (optional)
		*/
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
		/**
		* Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
		* This does not conform to the W3C spec.
		*
		* @param boolean state Enable or disable header checking.
		*/
		this.setDisableHeaderCheck = function(state) {
			disableHeaderCheck = state;
		};
		/**
		* Sets a header for the request or appends the value if one is already set.
		*
		* @param string header Header name
		* @param string value Header value
		*/
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
		/**
		* Gets a header from the server response.
		*
		* @param string header Name of header to get.
		* @return string Text of the header or null if it doesn't exist.
		*/
		this.getResponseHeader = function(header) {
			if (typeof header === "string" && this.readyState > this.OPENED && response && response.headers && response.headers[header.toLowerCase()] && !errorFlag) return response.headers[header.toLowerCase()];
			return null;
		};
		/**
		* Gets all the response headers.
		*
		* @return string A string with all response headers separated by CR+LF
		*/
		this.getAllResponseHeaders = function() {
			if (this.readyState < this.HEADERS_RECEIVED || errorFlag) return "";
			var result = "";
			for (var i in response.headers) if (i !== "set-cookie" && i !== "set-cookie2") result += i + ": " + response.headers[i] + "\r\n";
			return result.substr(0, result.length - 2);
		};
		/**
		* Gets a request header
		*
		* @param string name Name of header to get
		* @return string Returns the request header or empty string if not set
		*/
		this.getRequestHeader = function(name) {
			if (typeof name === "string" && headersCase[name.toLowerCase()]) return headers[headersCase[name.toLowerCase()]];
			return "";
		};
		/**
		* Sends the request to the server.
		*
		* @param string data Optional data to send as request body.
		*/
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
				if (settings.async) fs.readFile(url.pathname, "utf8", function(error, data) {
					if (error) self.handleError(error);
					else {
						self.status = 200;
						self.responseText = data;
						setState(self.DONE);
					}
				});
				else try {
					this.responseText = fs.readFileSync(url.pathname, "utf8");
					this.status = 200;
					setState(self.DONE);
				} catch (e) {
					this.handleError(e);
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
				var responseHandler = function responseHandler(resp) {
					response = resp;
					if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
						settings.url = response.headers.location;
						var url = Url.parse(settings.url);
						host = url.hostname;
						request = doRequest({
							hostname: url.hostname,
							port: url.port,
							path: url.path,
							method: response.statusCode === 303 ? "GET" : settings.method,
							headers,
							withCredentials: self.withCredentials
						}, responseHandler).on("error", errorHandler);
						request.end();
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
				var errorHandler = function errorHandler(error) {
					self.handleError(error);
				};
				request = doRequest(options, responseHandler).on("error", errorHandler);
				if (data) request.write(data);
				request.end();
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
		/**
		* Called when an error is encountered to deal with it.
		*/
		this.handleError = function(error) {
			this.status = 0;
			this.statusText = error;
			this.responseText = error.stack;
			errorFlag = true;
			setState(this.DONE);
			this.dispatchEvent("error");
		};
		/**
		* Aborts a request.
		*/
		this.abort = function() {
			if (request) {
				request.abort();
				request = null;
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
		/**
		* Adds an event listener. Preferred method of binding to events.
		*/
		this.addEventListener = function(event, callback) {
			if (!(event in listeners)) listeners[event] = [];
			listeners[event].push(callback);
		};
		/**
		* Remove an event callback that has already been bound.
		* Only works on the matching funciton, cannot be a copy.
		*/
		this.removeEventListener = function(event, callback) {
			if (event in listeners) listeners[event] = listeners[event].filter(function(ev) {
				return ev !== callback;
			});
		};
		/**
		* Dispatch any events, including both "on" methods and events attached using addEventListener.
		*/
		this.dispatchEvent = function(event) {
			if (typeof self["on" + event] === "function") self["on" + event]();
			if (event in listeners) for (var i = 0, len = listeners[event].length; i < len; i++) listeners[event][i].call(self);
		};
		/**
		* Changes readyState and calls onreadystatechange.
		*
		* @param int state New state
		*/
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
//#endregion
//#region src/x/service/api/index.ts
var api_exports = /* @__PURE__ */ __exportAll({
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
});
require_localStorage();
global.XMLHttpRequest = require_XMLHttpRequest().XMLHttpRequest;
//#endregion
//#region src/x/service/api/uni.ts
var uni$1 = api_exports;
//#endregion
//#region src/service/bridge/index.ts
var UniServiceJSBridge$1 = /* @__PURE__ */ (0, _vue_shared.extend)(ServiceJSBridge, { publishHandler(event, args, pageId) {
	UniViewJSBridge.subscribeHandler(event, args, pageId);
} });
//#endregion
//#region src/framework/components/layout/tabBar.tsx
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
		const onSwitchTab = useSwitchTab((0, vue_router.useRoute)(), tabBar, visibleList);
		const { style, borderStyle, placeholderStyle } = useTabBarStyle(tabBar);
		return () => {
			const tabBarItemsTsx = createTabBarItemsTsx(tabBar, onSwitchTab, visibleList);
			return (0, vue.createVNode)("uni-tabbar", { "class": "uni-tabbar-" + tabBar.position }, [(0, vue.createVNode)("div", {
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
function useTabBarCssVar(tabBar) {
	(0, vue.watch)(() => tabBar.shown, (value) => {
		updatePageCssVar({ "--window-bottom": normalizeWindowBottom(value ? parseInt(tabBar.height) : 0) });
	});
}
function useVisibleList(tabBar, visibleList) {
	const internalMidButton = (0, vue.ref)((0, _vue_shared.extend)({ type: "midButton" }, tabBar.midButton));
	function setVisibleList() {
		let tempList = [];
		tempList = tabBar.list.filter((item) => item.visible !== false);
		if (__UNI_FEATURE_TABBAR_MIDBUTTON__ && tabBar.midButton) {
			internalMidButton.value = (0, _vue_shared.extend)({}, _middleButton, internalMidButton.value, tabBar.midButton);
			tempList = tempList.filter((item) => !isMidButton(item));
			if (tempList.length % 2 === 0) tempList.splice(Math.floor(tempList.length / 2), 0, internalMidButton.value);
		}
		visibleList.value = tempList;
	}
	(0, vue.watchEffect)(setVisibleList);
}
function useSwitchTab(route, tabBar, visibleList) {
	(0, vue.watchEffect)(() => {
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
			let url = (0, _dcloudio_uni_shared.addLeadingSlash)(pagePath);
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
		style: (0, vue.computed)(() => {
			let backgroundColor = tabBar.backgroundColor;
			const blurEffect = tabBar.blurEffect;
			if (!backgroundColor) {
				if (blurEffect && blurEffect !== "none") backgroundColor = BLUR_EFFECT_COLORS[blurEffect];
			}
			return {
				backgroundColor: backgroundColor || DEFAULT_BG_COLOR,
				backdropFilter: blurEffect !== "none" ? "blur(10px)" : blurEffect
			};
		}),
		borderStyle: (0, vue.computed)(() => {
			const { borderStyle, borderColor } = tabBar;
			if (borderColor && (0, _vue_shared.isString)(borderColor)) return { backgroundColor: borderColor };
			return { backgroundColor: BORDER_COLORS[borderStyle] || BORDER_COLORS["black"] };
		}),
		placeholderStyle: (0, vue.computed)(() => {
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
	return (0, vue.createVNode)("div", {
		"key": index,
		"class": "uni-tabbar__item",
		"onClick": onSwitchTab(tabBarItem, index)
	}, [createTabBarItemBdTsx(color, iconPath || "", iconfontText, iconfontColor, tabBarItem, tabBar)], 8, ["onClick"]);
}
function createTabBarItemBdTsx(color, iconPath, iconfontText, iconfontColor, tabBarItem, tabBar) {
	const { height } = tabBar;
	return (0, vue.createVNode)("div", {
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
	return (0, vue.createVNode)("div", {
		"class": "uni-tabbar__icon" + (text ? " uni-tabbar__icon__diff" : ""),
		"style": {
			width: iconWidth,
			height: iconWidth
		}
	}, [type !== "midButton" && (0, vue.createVNode)("img", { "src": getRealPath(iconPath) }, null, 8, ["src"])], 6);
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
	return (0, vue.createVNode)("div", {
		"class": clazz,
		"style": style
	}, [type !== "midButton" && (0, vue.createVNode)("div", {
		"class": "uni-tabbar__iconfont",
		"style": iconfontStyle
	}, [iconfontText], 4)], 6);
}
function createTabBarItemTextTsx(color, tabBarItem, tabBar) {
	const { iconPath, text } = tabBarItem;
	const { fontSize, spacing } = tabBar;
	return (0, vue.createVNode)("div", {
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
	return (0, vue.createVNode)("div", { "class": "uni-tabbar__reddot" + (badge ? " uni-tabbar__badge" : "") }, [badge], 2);
}
function createTabBarMidButtonTsx(color, iconPath, iconfontText, iconfontColor, midButton, tabBar, index, onSwitchTab) {
	const { width, height, backgroundImage, iconWidth } = midButton;
	return (0, vue.createVNode)("div", {
		"key": "midButton",
		"class": "uni-tabbar__item",
		"style": {
			flex: "0 0 " + width,
			position: "relative"
		},
		"onClick": onSwitchTab(midButton, index)
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
	}, null, 12, ["src"])], 4), createTabBarItemBdTsx(color, iconPath, iconfontText, iconfontColor, midButton, tabBar)], 12, ["onClick"]);
}
var layout_default = /* @__PURE__ */ defineSystemComponent({
	name: "Layout",
	setup(_props, { emit }) {
		const rootRef = (0, vue.ref)(null);
		const keepAliveRoute = __UNI_FEATURE_PAGES__ && useKeepAliveRoute();
		const { layoutState, windowState } = useState();
		useMaxWidth(layoutState, rootRef);
		const topWindow = __UNI_FEATURE_TOPWINDOW__ && useTopWindow(layoutState);
		const leftWindow = __UNI_FEATURE_LEFTWINDOW__ && useLeftWindow(layoutState);
		const rightWindow = __UNI_FEATURE_RIGHTWINDOW__ && useRightWindow(layoutState);
		const showTabBar = __UNI_FEATURE_TABBAR__ && useShowTabBar(emit);
		const clazz = useAppClass(showTabBar);
		return () => {
			const layoutTsx = createLayoutTsx(keepAliveRoute, layoutState, windowState, topWindow, leftWindow, rightWindow);
			const tabBarTsx = __UNI_FEATURE_TABBAR__ && createTabBarTsx(showTabBar);
			return (0, vue.createVNode)("uni-app", {
				"ref": rootRef,
				"class": clazz.value
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
		const maxWidth = parseInt(String(((0, _vue_shared.hasOwn)(meta, "maxWidth") ? meta.maxWidth : __uniConfig.globalStyle.maxWidth) || Number.MAX_SAFE_INTEGER));
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
		const layoutState = (0, vue.reactive)({
			marginWidth: 0,
			leftWindowWidth: 0,
			rightWindowWidth: 0
		});
		(0, vue.watch)(() => layoutState.marginWidth, (value) => updateCssVar({ "--window-margin": value + "px" }));
		(0, vue.watch)(() => layoutState.leftWindowWidth + layoutState.marginWidth, (value) => {
			updateCssVar({ "--window-left": value + "px" });
		});
		(0, vue.watch)(() => layoutState.rightWindowWidth + layoutState.marginWidth, (value) => {
			updateCssVar({ "--window-right": value + "px" });
		});
		return {
			layoutState,
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
		let topWindowMinWidth = _dcloudio_uni_shared.RESPONSIVE_MIN_WIDTH;
		if (matchMedia && (0, _vue_shared.hasOwn)(matchMedia, "minWidth")) {
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
	UniServiceJSBridge.on(_dcloudio_uni_shared.ON_NAVIGATION_BAR_CHANGE, (navigationBar) => {
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
function useShowTabBar(emit) {
	const route = usePageRoute();
	const tabBar = useTabBar();
	return (0, vue.computed)(() => route.meta.isTabBar && tabBar.shown);
}
function createTabBarTsx(showTabBar) {
	return (0, vue.withDirectives)((0, vue.createVNode)(tabBar_default, null, null, 512), [[vue.vShow, showTabBar.value]]);
}
function createPageVNode() {
	return (0, vue.createVNode)(__uniRoutes[0].component);
}
function createRouterViewVNode({ routeKey, isTabBar, routeCache }) {
	return (0, vue.createVNode)(vue_router.RouterView, null, {
		default: (0, vue.withCtx)(({ Component }) => [((0, vue.openBlock)(), (0, vue.createBlock)(vue.KeepAlive, {
			matchBy: "key",
			cache: routeCache
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
		const instance = windowRef.value;
		if (!instance || !instance.$) return;
		const el = (0, _dcloudio_uni_shared.resolveOwnerEl)(instance.$);
		if (!el) return;
		/**
		* el指开发者top-window的根节点，其高度可能并不正确。
		* pages.json内的top-window style被设置到了el的父元素上。需要以父元素的高度为准。此值会影响--top-window-height变量
		*/
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
		const instance = windowRef.value;
		if (!instance || !instance.$) return;
		const el = (0, _dcloudio_uni_shared.resolveOwnerEl)(instance.$);
		if (!el) return;
		/**
		* left-window样式应用节点为el的父元素的父元素。
		*/
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
		const instance = windowRef.value;
		if (!instance || !instance.$) return;
		const el = (0, _dcloudio_uni_shared.resolveOwnerEl)(instance.$);
		if (!el) return;
		/**
		* right-window样式应用节点为el的父元素的父元素。
		*/
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
		/**
		* 注意如果修改layoutState.topWindowStyle所在的元素，需要同步修改useTopWindow函数中layoutState.topWindowHeight的计算逻辑。
		*/
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
		/**
		* 注意如果修改layoutState.leftWindowStyle所在的元素，需要同步修改useLeftWindow函数中layoutState.leftWindowWidth的计算逻辑。
		*/
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
		/**
		* 注意如果修改layoutState.rightWindowStyle所在的元素，需要同步修改useRightWindow函数中layoutState.rightWindowWidth的计算逻辑。
		*/
		return (0, vue.withDirectives)((0, vue.createVNode)("uni-right-window", {
			"data-show": layoutState.apiShowRightWindow || void 0,
			"style": layoutState.rightWindowStyle
		}, [layoutState.apiShowRightWindow ? (0, vue.createVNode)("div", {
			"class": "uni-mask",
			"onClick": () => layoutState.apiShowRightWindow = false
		}, null, 8, ["onClick"]) : null, (0, vue.createVNode)("div", { "class": "uni-right-window" }, [(0, vue.createVNode)(RightWindow, (0, vue.mergeProps)({ "ref": windowRef }, windowState), null, 16)])], 12, ["data-show"]), [[vue.vShow, layoutState.showRightWindow || layoutState.apiShowRightWindow]]);
	}
}
//#endregion
exports.Ad = ad_default;
exports.AdContentPage = ad_content_page_default;
exports.AdDraw = ad_draw_default;
exports.AsyncErrorComponent = async_error_default;
exports.AsyncLoadingComponent = async_loading_default;
exports.Button = button_default;
exports.Camera = camera_default;
exports.Canvas = index_x_default;
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
exports.ListItem = list_item_default;
exports.ListView = list_view_default;
exports.LivePlayer = live_player_default;
exports.LivePusher = live_pusher_default;
exports.Loading = index_x_default$1;
exports.Map = map_default;
exports.MovableArea = movable_area_default;
exports.MovableView = movable_view_default;
exports.Navigator = navigator_default;
exports.PageComponent = page_default;
exports.PageContainer = page_container_default;
exports.Picker = picker_default;
exports.PickerView = picker_view_default;
exports.PickerViewColumn = picker_view_column_default;
exports.Progress = progress_default;
exports.Radio = index_x_default$2;
exports.RadioGroup = radio_group_default;
exports.ResizeSensor = resize_sensor_default;
exports.RichText = rich_text_default;
exports.ScrollView = scroll_view_default;
exports.Slider = index_x_default$3;
exports.StickyHeader = sticky_header_default;
exports.StickySection = sticky_section_default;
exports.Swiper = swiper_default;
exports.SwiperItem = swiper_item_default;
exports.Switch = index_x_default$4;
exports.Text = text_default;
exports.Textarea = textarea_default;
Object.defineProperty(exports, "UTS", {
	enumerable: true,
	get: function() {
		return _dcloudio_uni_shared.UTS;
	}
});
Object.defineProperty(exports, "UTSJSONObject", {
	enumerable: true,
	get: function() {
		return _dcloudio_uni_shared.UTSJSONObject;
	}
});
Object.defineProperty(exports, "UTSValueIterable", {
	enumerable: true,
	get: function() {
		return _dcloudio_uni_shared.UTSValueIterable;
	}
});
Object.defineProperty(exports, "UniError", {
	enumerable: true,
	get: function() {
		return _dcloudio_uni_shared.UniError;
	}
});
exports.UniServiceJSBridge = UniServiceJSBridge$1;
exports.UniViewJSBridge = UniViewJSBridge$1;
exports.Video = video_default;
exports.View = view_default;
exports.WebView = index_x_default$5;
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
