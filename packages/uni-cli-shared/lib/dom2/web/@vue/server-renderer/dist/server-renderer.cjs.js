/**
  * @vue/server-renderer v3.6.0-rc.9
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let _vue_runtime_dom = require("@vue/runtime-dom");
_vue_runtime_dom = __toESM(_vue_runtime_dom);
let _vue_shared = require("@vue/shared");
let _vue_compiler_ssr = require("@vue/compiler-ssr");
//#region packages/server-renderer/src/helpers/ssrRenderAttrs.ts
const shouldIgnoreProp = /*@__PURE__*/ (0, _vue_shared.makeMap)(`,key,ref,innerHTML,textContent,ref_key,ref_for`);
function ssrRenderAttrs(props, tag) {
	let ret = "";
	for (let key in props) {
		if (shouldIgnoreProp(key) || (0, _vue_shared.isOn)(key) || tag === "textarea" && key === "value" || key.startsWith(".")) continue;
		const value = props[key];
		if (key.startsWith("^")) key = key.slice(1);
		if (key === "class") ret += ` class="${ssrRenderClass(value)}"`;
		else if (key === "style") ret += ` style="${ssrRenderStyle(value)}"`;
		else if (key === "className") {
			if (value != null) ret += ` class="${(0, _vue_shared.escapeHtml)(String(value))}"`;
		} else ret += ssrRenderDynamicAttr(key, value, tag);
	}
	return ret;
}
function ssrRenderDynamicAttr(key, value, tag) {
	if (!(0, _vue_shared.isRenderableAttrValue)(value)) return ``;
	const attrKey = tag && (tag.indexOf("-") > 0 || (0, _vue_shared.isSVGTag)(tag)) ? key : _vue_shared.propsToAttrMap[key] || key.toLowerCase();
	if ((0, _vue_shared.isBooleanAttr)(attrKey) || attrKey === "hidden" && (typeof value === "boolean" || typeof value === "number")) return (0, _vue_shared.includeBooleanAttr)(value) ? ` ${attrKey}` : ``;
	else if ((0, _vue_shared.isSSRSafeAttrName)(attrKey)) return value === "" ? ` ${attrKey}` : ` ${attrKey}="${(0, _vue_shared.escapeHtml)(value)}"`;
	else {
		console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${attrKey}`);
		return ``;
	}
}
function ssrRenderAttr(key, value) {
	if (!(0, _vue_shared.isRenderableAttrValue)(value)) return ``;
	return ` ${key}="${(0, _vue_shared.escapeHtml)(value)}"`;
}
function ssrRenderClass(raw) {
	return (0, _vue_shared.escapeHtml)((0, _vue_shared.normalizeClass)(raw));
}
function ssrRenderStyle(raw) {
	if (!raw) return "";
	if ((0, _vue_shared.isString)(raw)) return (0, _vue_shared.escapeHtml)(raw);
	const styles = (0, _vue_shared.normalizeStyle)(ssrResetCssVars(raw));
	return (0, _vue_shared.escapeHtml)((0, _vue_shared.stringifyStyle)(styles));
}
function ssrResetCssVars(raw) {
	if (!(0, _vue_shared.isArray)(raw) && (0, _vue_shared.isObject)(raw)) {
		const res = {};
		for (const key in raw) if (key.startsWith(":--")) res[key.slice(1)] = (0, _vue_shared.normalizeCssVarValue)(raw[key]);
		else res[key] = raw[key];
		return res;
	}
	return raw;
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderComponent.ts
function ssrRenderComponent(comp, props = null, children = null, parentComponent = null, slotScopeId) {
	if ((0, _vue_shared.isString)(comp)) {
		const { getBuffer, push } = createBuffer();
		renderVNode(push, (0, _vue_runtime_dom.createVNode)(comp, props, children), parentComponent, slotScopeId);
		return getBuffer();
	}
	return renderComponentVNode((0, _vue_runtime_dom.createVNode)(comp, props, children), parentComponent, slotScopeId);
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderSlot.ts
const { ensureValidVNode } = _vue_runtime_dom.ssrUtils;
function ssrRenderSlot(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId, textMode = false) {
	push(`<!--[-->`);
	ssrRenderSlotInner(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId, void 0, textMode);
	push(`<!--]-->`);
}
function ssrRenderSlotInner(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId, transition, textMode = false) {
	const slotFn = slots[slotName];
	if (slotFn) {
		const slotBuffer = [];
		const bufferedPush = (item) => {
			slotBuffer.push(item);
		};
		const ret = slotFn(slotProps || {}, bufferedPush, parentComponent, slotScopeId ? " " + slotScopeId : "");
		if (textMode && canNormalizeTextSlotBuffer(slotBuffer)) for (let i = 0; i < slotBuffer.length; i++) slotBuffer[i] = (0, _vue_shared.normalizeUniText)(slotBuffer[i]);
		if ((0, _vue_shared.isArray)(ret)) {
			const validSlotContent = ensureValidVNode(ret);
			if (validSlotContent) renderVNodeChildren(push, validSlotContent, parentComponent, slotScopeId);
			else if (fallbackRenderFn) fallbackRenderFn();
			else if (transition) push(`<!---->`);
		} else {
			let isEmptySlot = true;
			if (transition) isEmptySlot = false;
			else for (let i = 0; i < slotBuffer.length; i++) if (!isComment(slotBuffer[i])) {
				isEmptySlot = false;
				break;
			}
			if (isEmptySlot) {
				if (fallbackRenderFn) fallbackRenderFn();
			} else {
				let start = 0;
				let end = slotBuffer.length;
				if (transition && slotBuffer[0] === "<!--[-->" && slotBuffer[end - 1] === "<!--]-->") {
					start++;
					end--;
				}
				if (start < end) for (let i = start; i < end; i++) push(slotBuffer[i]);
				else if (transition) push(`<!---->`);
			}
		}
	} else if (fallbackRenderFn) fallbackRenderFn();
	else if (transition) push(`<!---->`);
}
function canNormalizeTextSlotBuffer(buffer) {
	return buffer.length > 0 && buffer.every((item) => typeof item === "string" && !/<\/?[A-Za-z][^>]*>/.test(item));
}
const commentTestRE = /^<!--[\s\S]*-->$/;
const commentRE = /<!--[^]*?-->/gm;
function isComment(item) {
	if (typeof item !== "string" || !commentTestRE.test(item)) return false;
	if (item.length <= 8) return true;
	return !item.replace(commentRE, "").trim();
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderTeleport.ts
function ssrRenderTeleport(parentPush, contentRenderFn, target, disabled, parentComponent) {
	parentPush("<!--teleport start-->");
	const context = parentComponent.appContext.provides[_vue_runtime_dom.ssrContextKey];
	const teleportBuffers = context.__teleportBuffers || (context.__teleportBuffers = {});
	const targetBuffer = teleportBuffers[target] || (teleportBuffers[target] = []);
	const bufferIndex = targetBuffer.length;
	let teleportContent;
	if (disabled) {
		contentRenderFn(parentPush);
		teleportContent = `<!--teleport start anchor--><!--teleport anchor-->`;
	} else {
		const { getBuffer, push } = createBuffer();
		push(`<!--teleport start anchor-->`);
		contentRenderFn(push);
		push(`<!--teleport anchor-->`);
		teleportContent = getBuffer();
	}
	targetBuffer.splice(bufferIndex, 0, teleportContent);
	if ((0, _vue_shared.isPromise)(teleportContent) || (0, _vue_shared.isArray)(teleportContent) && teleportContent.hasAsync) targetBuffer.hasAsync = true;
	parentPush("<!--teleport end-->");
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrInterpolate.ts
function ssrInterpolate(value, uniText = false) {
	if (!uniText) return (0, _vue_shared.escapeHtml)((0, _vue_shared.toDisplayString)(value));
	return (0, _vue_shared.escapeHtml)((0, _vue_shared.normalizeUniText)((0, _vue_shared.toDisplayString)(value)));
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderList.ts
function ssrRenderList(source, renderItem) {
	if ((0, _vue_shared.isArray)(source) || (0, _vue_shared.isString)(source)) for (let i = 0, l = source.length; i < l; i++) renderItem(source[i], i);
	else if (typeof source === "number") {
		if (!Number.isInteger(source) || source < 0) {
			(0, _vue_runtime_dom.warn)(`The v-for range expects a positive integer value but got ${source}.`);
			return;
		}
		for (let i = 0; i < source; i++) renderItem(i + 1, i);
	} else if ((0, _vue_shared.isObject)(source)) {
		if (source[Symbol.iterator]) {
			let i = 0;
			for (const item of source) renderItem(item, i++);
		} else {
			const keys = Object.keys(source);
			for (let i = 0, l = keys.length; i < l; i++) {
				const key = keys[i];
				renderItem(source[key], key, i);
			}
		}
	}
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrRenderSuspense.ts
function ssrRenderSuspense(push, { default: renderContent }) {
	if (renderContent) renderContent();
	else push(`<!---->`);
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrGetDirectiveProps.ts
function ssrGetDirectiveProps(instance, dir, value, arg, modifiers = {}) {
	if (typeof dir !== "function" && dir.getSSRProps) return dir.getSSRProps({
		dir,
		instance: _vue_runtime_dom.ssrUtils.getComponentPublicInstance(instance.$),
		value,
		oldValue: void 0,
		arg,
		modifiers
	}, null) || {};
	return {};
}
//#endregion
//#region packages/server-renderer/src/helpers/ssrVModelHelpers.ts
const ssrLooseEqual = _vue_shared.looseEqual;
function ssrLooseContain(arr, value) {
	return (0, _vue_shared.looseIndexOf)(arr, value) > -1;
}
function ssrRenderDynamicModel(type, model, value) {
	switch (type) {
		case "radio": return (0, _vue_shared.looseEqual)(model, value) ? " checked" : "";
		case "checkbox": return ((0, _vue_shared.isArray)(model) ? ssrLooseContain(model, value) : model) ? " checked" : "";
		default: return ssrRenderAttr("value", model);
	}
}
function ssrGetDynamicModelProps(existingProps = {}, model) {
	const { type, value } = existingProps;
	switch (type) {
		case "radio": return (0, _vue_shared.looseEqual)(model, value) ? { checked: true } : null;
		case "checkbox": return ((0, _vue_shared.isArray)(model) ? ssrLooseContain(model, value) : model) ? { checked: true } : null;
		default: return { value: model };
	}
}
//#endregion
//#region packages/server-renderer/src/internal.ts
var internal_exports = /* @__PURE__ */ __exportAll({
	ssrGetDirectiveProps: () => ssrGetDirectiveProps,
	ssrGetDynamicModelProps: () => ssrGetDynamicModelProps,
	ssrIncludeBooleanAttr: () => _vue_shared.includeBooleanAttr,
	ssrInterpolate: () => ssrInterpolate,
	ssrLooseContain: () => ssrLooseContain,
	ssrLooseEqual: () => ssrLooseEqual,
	ssrRenderAttr: () => ssrRenderAttr,
	ssrRenderAttrs: () => ssrRenderAttrs,
	ssrRenderClass: () => ssrRenderClass,
	ssrRenderComponent: () => ssrRenderComponent,
	ssrRenderDynamicAttr: () => ssrRenderDynamicAttr,
	ssrRenderDynamicModel: () => ssrRenderDynamicModel,
	ssrRenderList: () => ssrRenderList,
	ssrRenderSlot: () => ssrRenderSlot,
	ssrRenderSlotInner: () => ssrRenderSlotInner,
	ssrRenderStyle: () => ssrRenderStyle,
	ssrRenderSuspense: () => ssrRenderSuspense,
	ssrRenderTeleport: () => ssrRenderTeleport,
	ssrRenderVNode: () => renderVNode
});
//#endregion
//#region packages/server-renderer/src/helpers/ssrCompile.ts
const compileCache = Object.create(null);
function ssrCompile(template, instance) {
	const Component = instance.type;
	const { isCustomElement, compilerOptions } = instance.appContext.config;
	const { delimiters, compilerOptions: componentCompilerOptions } = Component;
	const finalCompilerOptions = (0, _vue_shared.extend)((0, _vue_shared.extend)({
		isCustomElement,
		delimiters
	}, compilerOptions), componentCompilerOptions);
	finalCompilerOptions.isCustomElement = finalCompilerOptions.isCustomElement || _vue_shared.NO;
	finalCompilerOptions.isNativeTag = finalCompilerOptions.isNativeTag || _vue_shared.NO;
	const cacheKey = JSON.stringify({
		template,
		compilerOptions: finalCompilerOptions
	}, (key, value) => {
		return (0, _vue_shared.isFunction)(value) ? value.toString() : value;
	});
	const cached = compileCache[cacheKey];
	if (cached) return cached;
	finalCompilerOptions.onError = (err) => {
		{
			const message = `[@vue/server-renderer] Template compilation error: ${err.message}`;
			const codeFrame = err.loc && (0, _vue_shared.generateCodeFrame)(template, err.loc.start.offset, err.loc.end.offset);
			(0, _vue_runtime_dom.warn)(codeFrame ? `${message}\n${codeFrame}` : message);
		}
	};
	const { code } = (0, _vue_compiler_ssr.compile)(template, finalCompilerOptions);
	const requireMap = {
		vue: _vue_runtime_dom,
		"vue/server-renderer": internal_exports
	};
	const fakeRequire = (id) => requireMap[id];
	return compileCache[cacheKey] = Function("require", code)(fakeRequire);
}
//#endregion
//#region packages/server-renderer/src/render.ts
const { createComponentInstance, setCurrentRenderingInstance, setupComponent, renderComponentRoot, normalizeVNode, pushWarningContext, popWarningContext } = _vue_runtime_dom.ssrUtils;
function cleanupContext(context) {
	let firstError;
	if (context.__watcherHandles) {
		for (const unwatch of context.__watcherHandles) try {
			unwatch();
		} catch (err) {
			if (firstError === void 0) firstError = err;
		}
		context.__watcherHandles.length = 0;
	}
	if (context.__instanceScopes) {
		for (const scope of context.__instanceScopes) try {
			scope.stop();
		} catch (err) {
			if (firstError === void 0) firstError = err;
		}
		context.__instanceScopes.length = 0;
	}
	if (firstError !== void 0) throw firstError;
}
function createBuffer() {
	let appendable = false;
	const buffer = [];
	return {
		getBuffer() {
			return buffer;
		},
		push(item) {
			const isStringItem = (0, _vue_shared.isString)(item);
			if (appendable && isStringItem) {
				buffer[buffer.length - 1] += item;
				return;
			}
			buffer.push(item);
			appendable = isStringItem;
			if ((0, _vue_shared.isPromise)(item) || (0, _vue_shared.isArray)(item) && item.hasAsync) buffer.hasAsync = true;
		}
	};
}
function renderComponentVNode(vnode, parentComponent = null, slotScopeId) {
	const instance = vnode.component = createComponentInstance(vnode, parentComponent, null);
	const context = instance.appContext.provides[_vue_runtime_dom.ssrContextKey];
	if (context) (context.__instanceScopes || (context.__instanceScopes = [])).push(instance.scope);
	pushWarningContext(vnode);
	const res = setupComponent(instance, true);
	popWarningContext();
	const hasAsyncSetup = (0, _vue_shared.isPromise)(res);
	let prefetches = instance.sp;
	if (hasAsyncSetup || prefetches) return Promise.resolve(res).then(() => {
		if (hasAsyncSetup) prefetches = instance.sp;
		if (prefetches) return Promise.all(prefetches.map((prefetch) => prefetch.call(instance.proxy)));
	}).catch(_vue_shared.NOOP).then(() => renderComponentSubTree(instance, slotScopeId));
	else try {
		return renderComponentSubTree(instance, slotScopeId);
	} catch (err) {
		return Promise.reject(err);
	}
}
function renderComponentSubTree(instance, slotScopeId) {
	pushWarningContext(instance.vnode);
	const comp = instance.type;
	const { getBuffer, push } = createBuffer();
	if ((0, _vue_shared.isFunction)(comp)) {
		let root = renderComponentRoot(instance);
		if (!comp.props) {
			for (const key in instance.attrs) if (key.startsWith(`data-v-`)) (root.props || (root.props = {}))[key] = ``;
		}
		renderVNode(push, instance.subTree = root, instance, slotScopeId);
	} else {
		if ((!instance.render || instance.render === _vue_shared.NOOP) && !instance.ssrRender && !comp.ssrRender && (0, _vue_shared.isString)(comp.template)) comp.ssrRender = ssrCompile(comp.template, instance);
		const ssrRender = instance.ssrRender || comp.ssrRender;
		if (ssrRender) {
			let attrs = instance.inheritAttrs !== false ? instance.attrs : void 0;
			let hasCloned = false;
			let cur = instance;
			while (true) {
				const scopeId = cur.vnode.scopeId;
				if (scopeId) {
					if (!hasCloned) {
						attrs = { ...attrs };
						hasCloned = true;
					}
					attrs[scopeId] = "";
				}
				const parent = cur.parent;
				if (parent && parent.subTree && parent.subTree === cur.vnode) cur = parent;
				else break;
			}
			if (slotScopeId) {
				if (!hasCloned) attrs = { ...attrs };
				const slotScopeIdList = slotScopeId.trim().split(" ");
				for (let i = 0; i < slotScopeIdList.length; i++) attrs[slotScopeIdList[i]] = "";
			}
			const prev = setCurrentRenderingInstance(instance);
			try {
				ssrRender(instance.proxy, push, instance, attrs, instance.props, instance.setupState, instance.data, instance.ctx);
			} catch (err) {
				(0, _vue_runtime_dom.handleError)(err, instance, 1);
			} finally {
				setCurrentRenderingInstance(prev);
			}
		} else if (instance.render && instance.render !== _vue_shared.NOOP) renderVNode(push, instance.subTree = renderComponentRoot(instance), instance, slotScopeId);
		else {
			const componentName = comp.name || comp.__file || `<Anonymous>`;
			(0, _vue_runtime_dom.warn)(`Component ${componentName} is missing template or render function.`);
			push(`<!---->`);
		}
	}
	popWarningContext();
	return getBuffer();
}
function renderVNode(push, vnode, parentComponent, slotScopeId) {
	const { type, shapeFlag, children, dirs, props } = vnode;
	if (dirs) vnode.props = applySSRDirectives(vnode, props, dirs);
	switch (type) {
		case _vue_runtime_dom.Text:
			push((0, _vue_shared.escapeHtml)(children));
			break;
		case _vue_runtime_dom.Comment:
			push(children ? `<!--${(0, _vue_shared.escapeHtmlComment)(children)}-->` : `<!---->`);
			break;
		case _vue_runtime_dom.Static:
			push(children);
			break;
		case _vue_runtime_dom.Fragment:
			if (vnode.slotScopeIds) slotScopeId = (slotScopeId ? slotScopeId + " " : "") + vnode.slotScopeIds.join(" ");
			push(`<!--[-->`);
			renderVNodeChildren(push, children, parentComponent, slotScopeId);
			push(`<!--]-->`);
			break;
		default: if (shapeFlag & 1) renderElementVNode(push, vnode, parentComponent, slotScopeId);
		else if (shapeFlag & 6) push(renderComponentVNode(vnode, parentComponent, slotScopeId));
		else if (shapeFlag & 64) renderTeleportVNode(push, vnode, parentComponent, slotScopeId);
		else if (shapeFlag & 128) renderVNode(push, vnode.ssContent, parentComponent, slotScopeId);
		else (0, _vue_runtime_dom.warn)("[@vue/server-renderer] Invalid VNode type:", type, `(${typeof type})`);
	}
}
function renderVNodeChildren(push, children, parentComponent, slotScopeId) {
	for (let i = 0; i < children.length; i++) renderVNode(push, normalizeVNode(children[i]), parentComponent, slotScopeId);
}
function renderElementVNode(push, vnode, parentComponent, slotScopeId) {
	const tag = vnode.type;
	let { props, children, shapeFlag, scopeId } = vnode;
	let openTag = `<${tag}`;
	if (props) openTag += ssrRenderAttrs(props, tag);
	const renderedScopeIds = [];
	const appendScopeId = (id) => {
		if (id && (!props || !(0, _vue_shared.hasOwn)(props, id)) && !renderedScopeIds.includes(id)) {
			openTag += ` ${id}`;
			renderedScopeIds.push(id);
		}
	};
	if (scopeId) appendScopeId(scopeId);
	let curParent = parentComponent;
	let curVnode = vnode;
	while (curParent && curVnode === curParent.subTree) {
		curVnode = curParent.vnode;
		if (curVnode.scopeId) appendScopeId(curVnode.scopeId);
		curParent = curParent.parent;
	}
	if (slotScopeId) {
		const slotScopeIdList = slotScopeId.trim().split(" ");
		for (let i = 0; i < slotScopeIdList.length; i++) appendScopeId(slotScopeIdList[i]);
	}
	push(openTag + `>`);
	if (!(0, _vue_shared.isVoidTag)(tag)) {
		let hasChildrenOverride = false;
		if (props) {
			if (props.innerHTML) {
				hasChildrenOverride = true;
				push(props.innerHTML);
			} else if (props.textContent) {
				hasChildrenOverride = true;
				push((0, _vue_shared.escapeHtml)(props.textContent));
			} else if (tag === "textarea" && props.value) {
				hasChildrenOverride = true;
				push((0, _vue_shared.escapeHtml)(props.value));
			}
		}
		if (!hasChildrenOverride) {
			if (shapeFlag & 8) push((0, _vue_shared.escapeHtml)(children));
			else if (shapeFlag & 16) renderVNodeChildren(push, children, parentComponent, slotScopeId);
		}
		push(`</${tag}>`);
	}
}
function applySSRDirectives(vnode, rawProps, dirs) {
	const toMerge = [];
	for (let i = 0; i < dirs.length; i++) {
		const binding = dirs[i];
		const { dir: { getSSRProps } } = binding;
		if (getSSRProps) {
			const props = getSSRProps(binding, vnode);
			if (props) toMerge.push(props);
		}
	}
	return (0, _vue_runtime_dom.mergeProps)(rawProps || {}, ...toMerge);
}
function renderTeleportVNode(push, vnode, parentComponent, slotScopeId) {
	const target = vnode.props && vnode.props.to;
	const disabled = vnode.props && vnode.props.disabled;
	if (!target) {
		if (!disabled) (0, _vue_runtime_dom.warn)(`[@vue/server-renderer] Teleport is missing target prop.`);
		return [];
	}
	if (!(0, _vue_shared.isString)(target)) {
		(0, _vue_runtime_dom.warn)(`[@vue/server-renderer] Teleport target must be a query selector string.`);
		return [];
	}
	ssrRenderTeleport(push, (push) => {
		renderVNodeChildren(push, vnode.children, parentComponent, slotScopeId);
	}, target, disabled || disabled === "", parentComponent);
}
//#endregion
//#region packages/server-renderer/src/renderToString.ts
const { isVNode: isVNode$1 } = _vue_runtime_dom.ssrUtils;
function nestedUnrollBuffer(buffer, parentRet, startIndex) {
	if (!buffer.hasAsync) return parentRet + unrollBufferSync$1(buffer);
	let ret = parentRet;
	for (let i = startIndex; i < buffer.length; i += 1) {
		const item = buffer[i];
		if ((0, _vue_shared.isString)(item)) {
			ret += item;
			continue;
		}
		if ((0, _vue_shared.isPromise)(item)) return item.then((nestedItem) => {
			buffer[i] = nestedItem;
			return nestedUnrollBuffer(buffer, ret, i);
		});
		const result = nestedUnrollBuffer(item, ret, 0);
		if ((0, _vue_shared.isPromise)(result)) return result.then((nestedItem) => {
			buffer[i] = nestedItem;
			return nestedUnrollBuffer(buffer, "", i);
		});
		ret = result;
	}
	return ret;
}
function unrollBuffer$1(buffer) {
	return nestedUnrollBuffer(buffer, "", 0);
}
function unrollBufferSync$1(buffer) {
	let ret = "";
	for (let i = 0; i < buffer.length; i++) {
		let item = buffer[i];
		if ((0, _vue_shared.isString)(item)) ret += item;
		else ret += unrollBufferSync$1(item);
	}
	return ret;
}
async function renderToString(input, context = {}) {
	if (isVNode$1(input)) return renderToString((0, _vue_runtime_dom.createApp)({ render: () => input }), context);
	const vnode = (0, _vue_runtime_dom.createVNode)(input._component, input._props);
	vnode.appContext = input._context;
	input.provide(_vue_runtime_dom.ssrContextKey, context);
	try {
		const result = await unrollBuffer$1(await renderComponentVNode(vnode));
		await resolveTeleports(context);
		return result;
	} finally {
		cleanupContext(context);
	}
}
async function resolveTeleports(context) {
	if (context.__teleportBuffers) {
		context.teleports = context.teleports || {};
		for (const key in context.__teleportBuffers) context.teleports[key] = await unrollBuffer$1(context.__teleportBuffers[key]);
	}
}
//#endregion
//#region packages/server-renderer/src/renderToStream.ts
const { isVNode } = _vue_runtime_dom.ssrUtils;
async function unrollBuffer(buffer, stream) {
	if (buffer.hasAsync) for (let i = 0; i < buffer.length; i++) {
		let item = buffer[i];
		if ((0, _vue_shared.isPromise)(item)) item = await item;
		if ((0, _vue_shared.isString)(item)) stream.push(item);
		else await unrollBuffer(item, stream);
	}
	else unrollBufferSync(buffer, stream);
}
function unrollBufferSync(buffer, stream) {
	for (let i = 0; i < buffer.length; i++) {
		const item = buffer[i];
		if ((0, _vue_shared.isString)(item)) stream.push(item);
		else unrollBufferSync(item, stream);
	}
}
function renderToSimpleStream(input, context, stream) {
	if (isVNode(input)) return renderToSimpleStream((0, _vue_runtime_dom.createApp)({ render: () => input }), context, stream);
	const vnode = (0, _vue_runtime_dom.createVNode)(input._component, input._props);
	vnode.appContext = input._context;
	input.provide(_vue_runtime_dom.ssrContextKey, context);
	let cleaned = false;
	const finalize = () => {
		if (cleaned) return;
		cleaned = true;
		cleanupContext(context);
	};
	Promise.resolve().then(() => renderComponentVNode(vnode)).then((buffer) => unrollBuffer(buffer, stream)).then(() => resolveTeleports(context)).then(() => {
		finalize();
		return stream.push(null);
	}).catch((error) => {
		try {
			finalize();
		} catch {}
		stream.destroy(error);
	});
	return stream;
}
/**
* @deprecated
*/
function renderToStream(input, context = {}) {
	console.warn(`[@vue/server-renderer] renderToStream is deprecated - use renderToNodeStream instead.`);
	return renderToNodeStream(input, context);
}
function renderToNodeStream(input, context = {}) {
	const stream = new (require("node:stream")).Readable({ read() {} });
	if (!stream) throw new Error("ESM build of renderToStream() does not support renderToNodeStream(). Use pipeToNodeWritable() with an existing Node.js Writable stream instance instead.");
	return renderToSimpleStream(input, context, stream);
}
function pipeToNodeWritable(input, context = {}, writable) {
	renderToSimpleStream(input, context, {
		push(content) {
			if (content != null) writable.write(content);
			else writable.end();
		},
		destroy(err) {
			writable.destroy(err);
		}
	});
}
function renderToWebStream(input, context = {}) {
	if (typeof ReadableStream !== "function") throw new Error("ReadableStream constructor is not available in the global scope. If the target environment does support web streams, consider using pipeToWebWritable() with an existing WritableStream instance instead.");
	const encoder = new TextEncoder();
	let cancelled = false;
	return new ReadableStream({
		start(controller) {
			renderToSimpleStream(input, context, {
				push(content) {
					if (cancelled) return;
					if (content != null) controller.enqueue(encoder.encode(content));
					else controller.close();
				},
				destroy(err) {
					controller.error(err);
				}
			});
		},
		cancel() {
			cancelled = true;
		}
	});
}
function pipeToWebWritable(input, context = {}, writable) {
	const writer = writable.getWriter();
	const encoder = new TextEncoder();
	let hasReady = false;
	try {
		hasReady = (0, _vue_shared.isPromise)(writer.ready);
	} catch (e) {}
	renderToSimpleStream(input, context, {
		async push(content) {
			if (hasReady) await writer.ready;
			if (content != null) return writer.write(encoder.encode(content));
			else return writer.close();
		},
		destroy(err) {
			console.log(err);
			writer.close();
		}
	});
}
//#endregion
//#region packages/server-renderer/src/index.ts
(0, _vue_runtime_dom.initDirectivesForSSR)();
//#endregion
exports.pipeToNodeWritable = pipeToNodeWritable;
exports.pipeToWebWritable = pipeToWebWritable;
exports.renderToNodeStream = renderToNodeStream;
exports.renderToSimpleStream = renderToSimpleStream;
exports.renderToStream = renderToStream;
exports.renderToString = renderToString;
exports.renderToWebStream = renderToWebStream;
exports.ssrGetDirectiveProps = ssrGetDirectiveProps;
exports.ssrGetDynamicModelProps = ssrGetDynamicModelProps;
exports.ssrIncludeBooleanAttr = _vue_shared.includeBooleanAttr;
exports.ssrInterpolate = ssrInterpolate;
exports.ssrLooseContain = ssrLooseContain;
exports.ssrLooseEqual = ssrLooseEqual;
exports.ssrRenderAttr = ssrRenderAttr;
exports.ssrRenderAttrs = ssrRenderAttrs;
exports.ssrRenderClass = ssrRenderClass;
exports.ssrRenderComponent = ssrRenderComponent;
exports.ssrRenderDynamicAttr = ssrRenderDynamicAttr;
exports.ssrRenderDynamicModel = ssrRenderDynamicModel;
exports.ssrRenderList = ssrRenderList;
exports.ssrRenderSlot = ssrRenderSlot;
exports.ssrRenderSlotInner = ssrRenderSlotInner;
exports.ssrRenderStyle = ssrRenderStyle;
exports.ssrRenderSuspense = ssrRenderSuspense;
exports.ssrRenderTeleport = ssrRenderTeleport;
exports.ssrRenderVNode = renderVNode;
