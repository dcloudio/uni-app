/**
  * @vue/compiler-ssr v3.6.0-rc.9
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let _vue_compiler_dom = require("@vue/compiler-dom");
let _vue_shared = require("@vue/shared");
//#region packages/compiler-ssr/src/runtimeHelpers.ts
const SSR_INTERPOLATE = Symbol(`ssrInterpolate`);
const SSR_RENDER_VNODE = Symbol(`ssrRenderVNode`);
const SSR_RENDER_COMPONENT = Symbol(`ssrRenderComponent`);
const SSR_RENDER_SLOT = Symbol(`ssrRenderSlot`);
const SSR_RENDER_SLOT_INNER = Symbol(`ssrRenderSlotInner`);
const SSR_RENDER_CLASS = Symbol(`ssrRenderClass`);
const SSR_RENDER_STYLE = Symbol(`ssrRenderStyle`);
const SSR_RENDER_ATTRS = Symbol(`ssrRenderAttrs`);
const SSR_RENDER_ATTR = Symbol(`ssrRenderAttr`);
const SSR_RENDER_DYNAMIC_ATTR = Symbol(`ssrRenderDynamicAttr`);
const SSR_RENDER_LIST = Symbol(`ssrRenderList`);
const SSR_INCLUDE_BOOLEAN_ATTR = Symbol(`ssrIncludeBooleanAttr`);
const SSR_LOOSE_EQUAL = Symbol(`ssrLooseEqual`);
const SSR_LOOSE_CONTAIN = Symbol(`ssrLooseContain`);
const SSR_RENDER_DYNAMIC_MODEL = Symbol(`ssrRenderDynamicModel`);
const SSR_GET_DYNAMIC_MODEL_PROPS = Symbol(`ssrGetDynamicModelProps`);
const SSR_RENDER_TELEPORT = Symbol(`ssrRenderTeleport`);
const SSR_RENDER_SUSPENSE = Symbol(`ssrRenderSuspense`);
const SSR_GET_DIRECTIVE_PROPS = Symbol(`ssrGetDirectiveProps`);
const ssrHelpers = {
	[SSR_INTERPOLATE]: `ssrInterpolate`,
	[SSR_RENDER_VNODE]: `ssrRenderVNode`,
	[SSR_RENDER_COMPONENT]: `ssrRenderComponent`,
	[SSR_RENDER_SLOT]: `ssrRenderSlot`,
	[SSR_RENDER_SLOT_INNER]: `ssrRenderSlotInner`,
	[SSR_RENDER_CLASS]: `ssrRenderClass`,
	[SSR_RENDER_STYLE]: `ssrRenderStyle`,
	[SSR_RENDER_ATTRS]: `ssrRenderAttrs`,
	[SSR_RENDER_ATTR]: `ssrRenderAttr`,
	[SSR_RENDER_DYNAMIC_ATTR]: `ssrRenderDynamicAttr`,
	[SSR_RENDER_LIST]: `ssrRenderList`,
	[SSR_INCLUDE_BOOLEAN_ATTR]: `ssrIncludeBooleanAttr`,
	[SSR_LOOSE_EQUAL]: `ssrLooseEqual`,
	[SSR_LOOSE_CONTAIN]: `ssrLooseContain`,
	[SSR_RENDER_DYNAMIC_MODEL]: `ssrRenderDynamicModel`,
	[SSR_GET_DYNAMIC_MODEL_PROPS]: `ssrGetDynamicModelProps`,
	[SSR_RENDER_TELEPORT]: `ssrRenderTeleport`,
	[SSR_RENDER_SUSPENSE]: `ssrRenderSuspense`,
	[SSR_GET_DIRECTIVE_PROPS]: `ssrGetDirectiveProps`
};
(0, _vue_compiler_dom.registerRuntimeHelpers)(ssrHelpers);
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrVIf.ts
const ssrTransformIf = (0, _vue_compiler_dom.createStructuralDirectiveTransform)(/^(?:if|else|else-if)$/, _vue_compiler_dom.processIf);
function ssrProcessIf(node, context, disableNestedFragments = false, disableComment = false) {
	const [rootBranch] = node.branches;
	const ifStatement = (0, _vue_compiler_dom.createIfStatement)(rootBranch.condition, processIfBranch(rootBranch, context, disableNestedFragments));
	context.pushStatement(ifStatement);
	let currentIf = ifStatement;
	for (let i = 1; i < node.branches.length; i++) {
		const branch = node.branches[i];
		const branchBlockStatement = processIfBranch(branch, context, disableNestedFragments);
		if (branch.condition) currentIf = currentIf.alternate = (0, _vue_compiler_dom.createIfStatement)(branch.condition, branchBlockStatement);
		else currentIf.alternate = branchBlockStatement;
	}
	if (!currentIf.alternate && !disableComment) currentIf.alternate = (0, _vue_compiler_dom.createBlockStatement)([(0, _vue_compiler_dom.createCallExpression)(`_push`, ["`<!---->`"])]);
}
function processIfBranch(branch, context, disableNestedFragments = false) {
	const { children } = branch;
	return processChildrenAsStatement(branch, context, !disableNestedFragments && (children.length !== 1 || children[0].type !== 1) && !(children.length === 1 && children[0].type === 11));
}
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrVFor.ts
const ssrTransformFor = (0, _vue_compiler_dom.createStructuralDirectiveTransform)("for", _vue_compiler_dom.processFor);
function ssrProcessFor(node, context, disableNestedFragments = false) {
	const needFragmentWrapper = !disableNestedFragments && (node.children.length !== 1 || node.children[0].type !== 1);
	const renderLoop = (0, _vue_compiler_dom.createFunctionExpression)((0, _vue_compiler_dom.createForLoopParams)(node.parseResult));
	renderLoop.body = processChildrenAsStatement(node, context, needFragmentWrapper);
	if (!disableNestedFragments) context.pushStringPart(`<!--[-->`);
	context.pushStatement((0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_LIST), [node.source, renderLoop]));
	if (!disableNestedFragments) context.pushStringPart(`<!--]-->`);
}
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrTransformSlotOutlet.ts
const ssrTransformSlotOutlet = (node, context) => {
	if ((0, _vue_compiler_dom.isSlotOutlet)(node)) {
		const { slotName, slotProps } = (0, _vue_compiler_dom.processSlotOutlet)(node, context);
		const args = [
			`_ctx.$slots`,
			slotName,
			slotProps || `{}`,
			`null`,
			`_push`,
			`_parent`
		];
		if (context.scopeId && context.slotted !== false) args.push(`"${context.scopeId}-s"`);
		let method = SSR_RENDER_SLOT;
		let parent = context.parent;
		if (parent) {
			const children = parent.children;
			if (parent.type === 10) parent = context.grandParent;
			let componentType;
			if (parent.type === 1 && parent.tagType === 1 && ((componentType = (0, _vue_compiler_dom.resolveComponentType)(parent, context, true)) === _vue_compiler_dom.TRANSITION || componentType === _vue_compiler_dom.TRANSITION_GROUP) && children.filter((c) => c.type === 1).length === 1) {
				method = SSR_RENDER_SLOT_INNER;
				if (!(context.scopeId && context.slotted !== false)) args.push("null");
				args.push("true");
			}
		}
		if (node.__uniTextSlot) {
			if (args.length === 6) args.push("null");
			args.push("true");
		}
		node.ssrCodegenNode = (0, _vue_compiler_dom.createCallExpression)(context.helper(method), args);
	}
};
function ssrProcessSlotOutlet(node, context) {
	const renderCall = node.ssrCodegenNode;
	if (node.children.length) {
		const fallbackRenderFn = (0, _vue_compiler_dom.createFunctionExpression)([]);
		fallbackRenderFn.body = processChildrenAsStatement(node, context);
		renderCall.arguments[3] = fallbackRenderFn;
	}
	if (context.withSlotScopeId) {
		const slotScopeId = renderCall.arguments[6];
		renderCall.arguments[6] = slotScopeId ? `${slotScopeId} + _scopeId` : `_scopeId`;
	}
	context.pushStatement(node.ssrCodegenNode);
}
//#endregion
//#region packages/compiler-ssr/src/errors.ts
function createSSRCompilerError(code, loc) {
	return (0, _vue_compiler_dom.createCompilerError)(code, loc, SSRErrorMessages);
}
const SSRErrorMessages = {
	[65]: `Unsafe attribute name for SSR.`,
	[66]: `Missing the 'to' prop on teleport element.`,
	[67]: `Invalid AST node during SSR transform.`
};
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrTransformTeleport.ts
function ssrProcessTeleport(node, context) {
	const targetProp = (0, _vue_compiler_dom.findProp)(node, "to");
	if (!targetProp) {
		context.onError(createSSRCompilerError(66, node.loc));
		return;
	}
	let target;
	if (targetProp.type === 6) target = targetProp.value && (0, _vue_compiler_dom.createSimpleExpression)(targetProp.value.content, true);
	else target = targetProp.exp;
	if (!target) {
		context.onError(createSSRCompilerError(66, targetProp.loc));
		return;
	}
	const disabledProp = (0, _vue_compiler_dom.findProp)(node, "disabled", false, true);
	const disabled = disabledProp ? disabledProp.type === 6 ? `true` : disabledProp.exp || `false` : `false`;
	const contentRenderFn = (0, _vue_compiler_dom.createFunctionExpression)([`_push`], void 0, true, false, node.loc);
	contentRenderFn.body = processChildrenAsStatement(node, context);
	context.pushStatement((0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_TELEPORT), [
		`_push`,
		contentRenderFn,
		target,
		disabled,
		`_parent`
	]));
}
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrTransformSuspense.ts
const wipMap$3 = /* @__PURE__ */ new WeakMap();
function ssrTransformSuspense(node, context) {
	return () => {
		if (node.children.length) {
			const wipEntry = {
				slotsExp: null,
				wipSlots: []
			};
			wipMap$3.set(node, wipEntry);
			wipEntry.slotsExp = (0, _vue_compiler_dom.buildSlots)(node, context, (_props, _vForExp, children, loc) => {
				const fn = (0, _vue_compiler_dom.createFunctionExpression)([], void 0, true, false, loc);
				wipEntry.wipSlots.push({
					fn,
					children
				});
				return fn;
			}).slots;
		}
	};
}
function ssrProcessSuspense(node, context) {
	const wipEntry = wipMap$3.get(node);
	if (!wipEntry) return;
	const { slotsExp, wipSlots } = wipEntry;
	for (let i = 0; i < wipSlots.length; i++) {
		const slot = wipSlots[i];
		slot.fn.body = processChildrenAsStatement(slot, context);
	}
	context.pushStatement((0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_SUSPENSE), [`_push`, slotsExp]));
}
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrTransformElement.ts
const rawChildrenMap = /* @__PURE__ */ new WeakMap();
const ssrTransformElement = (node, context) => {
	if (node.type !== 1 || node.tagType !== 0) return;
	return function ssrPostTransformElement() {
		const openTag = [`<${node.tag}`];
		const needTagForRuntime = node.tag === "textarea" || node.tag.indexOf("-") > 0;
		const hasDynamicVBind = (0, _vue_compiler_dom.hasDynamicKeyVBind)(node);
		const hasCustomDir = node.props.some((p) => p.type === 7 && !(0, _vue_shared.isBuiltInDirective)(p.name));
		const vShowPropIndex = node.props.findIndex((i) => i.type === 7 && i.name === "show");
		if (vShowPropIndex !== -1) {
			const vShowProp = node.props[vShowPropIndex];
			node.props.splice(vShowPropIndex, 1);
			node.props.push(vShowProp);
		}
		const needMergeProps = hasDynamicVBind || hasCustomDir;
		if (needMergeProps) {
			const { props, directives } = (0, _vue_compiler_dom.buildProps)(node, context, node.props, false, false, true);
			if (props || directives.length) {
				const mergedProps = buildSSRProps(props, directives, context);
				const propsExp = (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_ATTRS), [mergedProps]);
				if (node.tag === "textarea") {
					const existingText = node.children[0];
					if (!hasContentOverrideDirective(node) && (!existingText || existingText.type !== 5)) {
						const tempId = `_temp${context.temps++}`;
						propsExp.arguments = [(0, _vue_compiler_dom.createAssignmentExpression)((0, _vue_compiler_dom.createSimpleExpression)(tempId, false), mergedProps)];
						rawChildrenMap.set(node, (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_INTERPOLATE), [(0, _vue_compiler_dom.createConditionalExpression)((0, _vue_compiler_dom.createSimpleExpression)(`"value" in ${tempId}`, false), (0, _vue_compiler_dom.createSimpleExpression)(`${tempId}.value`, false), (0, _vue_compiler_dom.createSimpleExpression)(existingText ? existingText.content : ``, true), false)]));
					}
				} else if (node.tag === "input") {
					const vModel = findVModel(node);
					if (vModel) {
						const tempId = `_temp${context.temps++}`;
						const tempExp = (0, _vue_compiler_dom.createSimpleExpression)(tempId, false);
						propsExp.arguments = [(0, _vue_compiler_dom.createSequenceExpression)([(0, _vue_compiler_dom.createAssignmentExpression)(tempExp, mergedProps), (0, _vue_compiler_dom.createCallExpression)(context.helper(_vue_compiler_dom.MERGE_PROPS), [tempExp, (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_GET_DYNAMIC_MODEL_PROPS), [tempExp, vModel.exp])])])];
					}
				} else if (directives.length && !node.children.length) {
					if (!hasContentOverrideDirective(node)) {
						const tempId = `_temp${context.temps++}`;
						propsExp.arguments = [(0, _vue_compiler_dom.createAssignmentExpression)((0, _vue_compiler_dom.createSimpleExpression)(tempId, false), mergedProps)];
						rawChildrenMap.set(node, (0, _vue_compiler_dom.createConditionalExpression)((0, _vue_compiler_dom.createSimpleExpression)(`"textContent" in ${tempId}`, false), (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_INTERPOLATE), [(0, _vue_compiler_dom.createSimpleExpression)(`${tempId}.textContent`, false)]), (0, _vue_compiler_dom.createSimpleExpression)(`${tempId}.innerHTML ?? ''`, false), false));
					}
				}
				if (needTagForRuntime) propsExp.arguments.push(`"${node.tag}"`);
				openTag.push(propsExp);
			}
		}
		let dynamicClassBinding = void 0;
		let staticClassBinding = void 0;
		let dynamicStyleBinding = void 0;
		for (let i = 0; i < node.props.length; i++) {
			const prop = node.props[i];
			if (node.tag === "input" && isTrueFalseValue(prop)) continue;
			if (prop.type === 7) {
				if (prop.name === "html" && prop.exp) rawChildrenMap.set(node, (0, _vue_compiler_dom.createCompoundExpression)([
					`(`,
					prop.exp,
					`) ?? ''`
				]));
				else if (prop.name === "text" && prop.exp) node.children = [(0, _vue_compiler_dom.createInterpolation)(prop.exp, prop.loc)];
				else if (prop.name === "slot") context.onError((0, _vue_compiler_dom.createCompilerError)(40, prop.loc));
				else if (isTextareaWithValue(node, prop) && prop.exp) {
					if (!needMergeProps) node.children = [(0, _vue_compiler_dom.createInterpolation)(prop.exp, prop.loc)];
				} else if (!needMergeProps && prop.name !== "on") {
					const directiveTransform = context.directiveTransforms[prop.name];
					if (directiveTransform) {
						const { props, ssrTagParts } = directiveTransform(prop, node, context);
						if (ssrTagParts) openTag.push(...ssrTagParts);
						for (let j = 0; j < props.length; j++) {
							const { key, value } = props[j];
							if ((0, _vue_compiler_dom.isStaticExp)(key)) {
								let attrName = key.content;
								if (attrName === "key" || attrName === "ref") continue;
								if (attrName === "class") openTag.push(` class="`, dynamicClassBinding = (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_CLASS), [value]), `"`);
								else if (attrName === "style") {
									if (dynamicStyleBinding) mergeCall(dynamicStyleBinding, value);
									else openTag.push(` style="`, dynamicStyleBinding = (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_STYLE), [value]), `"`);
								} else {
									attrName = node.tag.indexOf("-") > 0 ? attrName : _vue_shared.propsToAttrMap[attrName] || attrName.toLowerCase();
									if ((0, _vue_shared.isBooleanAttr)(attrName)) openTag.push((0, _vue_compiler_dom.createConditionalExpression)((0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_INCLUDE_BOOLEAN_ATTR), [value]), (0, _vue_compiler_dom.createSimpleExpression)(" " + attrName, true), (0, _vue_compiler_dom.createSimpleExpression)("", true), false));
									else if (attrName === "hidden") openTag.push((0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_DYNAMIC_ATTR), [key, value]));
									else if ((0, _vue_shared.isSSRSafeAttrName)(attrName)) openTag.push((0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_ATTR), [key, value]));
									else context.onError(createSSRCompilerError(65, key.loc));
								}
							} else {
								const args = [key, value];
								if (needTagForRuntime) args.push(`"${node.tag}"`);
								openTag.push((0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_DYNAMIC_ATTR), args));
							}
						}
					}
				}
			} else {
				const name = prop.name;
				if (node.tag === "textarea" && name === "value" && prop.value) rawChildrenMap.set(node, (0, _vue_shared.escapeHtml)(prop.value.content));
				else if (!needMergeProps) {
					if (name === "key" || name === "ref") continue;
					if (name === "class" && prop.value) staticClassBinding = JSON.stringify(prop.value.content);
					openTag.push(` ${prop.name}` + (prop.value ? `="${(0, _vue_shared.escapeHtml)(prop.value.content)}"` : ``));
				}
			}
		}
		if (dynamicClassBinding && staticClassBinding) {
			mergeCall(dynamicClassBinding, staticClassBinding);
			removeStaticBinding(openTag, "class");
		}
		if (context.scopeId) openTag.push(` ${context.scopeId}`);
		node.ssrCodegenNode = (0, _vue_compiler_dom.createTemplateLiteral)(openTag);
	};
};
function buildSSRProps(props, directives, context) {
	let mergePropsArgs = [];
	if (props) {
		if (props.type === 14) mergePropsArgs = props.arguments;
		else mergePropsArgs.push(props);
	}
	if (directives.length) for (const dir of directives) mergePropsArgs.push((0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_GET_DIRECTIVE_PROPS), [`_ctx`, ...(0, _vue_compiler_dom.buildDirectiveArgs)(dir, context).elements]));
	return mergePropsArgs.length > 1 ? (0, _vue_compiler_dom.createCallExpression)(context.helper(_vue_compiler_dom.MERGE_PROPS), mergePropsArgs) : mergePropsArgs[0];
}
function isTrueFalseValue(prop) {
	if (prop.type === 7) return prop.name === "bind" && prop.arg && (0, _vue_compiler_dom.isStaticExp)(prop.arg) && (prop.arg.content === "true-value" || prop.arg.content === "false-value");
	else return prop.name === "true-value" || prop.name === "false-value";
}
function isTextareaWithValue(node, prop) {
	return !!(node.tag === "textarea" && prop.name === "bind" && (0, _vue_compiler_dom.isStaticArgOf)(prop.arg, "value"));
}
function mergeCall(call, arg) {
	const existing = call.arguments[0];
	if (existing.type === 17) existing.elements.push(arg);
	else call.arguments[0] = (0, _vue_compiler_dom.createArrayExpression)([existing, arg]);
}
function removeStaticBinding(tag, binding) {
	const regExp = new RegExp(`^ ${binding}=".+"$`);
	const i = tag.findIndex((e) => typeof e === "string" && regExp.test(e));
	if (i > -1) tag.splice(i, 1);
}
function findVModel(node) {
	return node.props.find((p) => p.type === 7 && p.name === "model" && p.exp);
}
function hasContentOverrideDirective(node) {
	return !!(0, _vue_compiler_dom.findDir)(node, "text") || !!(0, _vue_compiler_dom.findDir)(node, "html");
}
function ssrProcessElement(node, context) {
	const isVoidTag = context.options.isVoidTag || _vue_shared.NO;
	const elementsToAdd = node.ssrCodegenNode.elements;
	for (let j = 0; j < elementsToAdd.length; j++) context.pushStringPart(elementsToAdd[j]);
	if (context.withSlotScopeId) context.pushStringPart((0, _vue_compiler_dom.createSimpleExpression)(`_scopeId`, false));
	context.pushStringPart(`>`);
	const rawChildren = rawChildrenMap.get(node);
	if (rawChildren) context.pushStringPart(rawChildren);
	else if (node.children.length) processChildren(node, context);
	if (!isVoidTag(node.tag)) context.pushStringPart(`</${node.tag}>`);
}
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrTransformTransitionGroup.ts
const wipMap$2 = /* @__PURE__ */ new WeakMap();
function ssrTransformTransitionGroup(node, context) {
	return () => {
		const tag = (0, _vue_compiler_dom.findProp)(node, "tag");
		if (tag) {
			const otherProps = node.props.filter((p) => p !== tag);
			const { props, directives } = (0, _vue_compiler_dom.buildProps)(node, context, otherProps, true, false, true);
			let propsExp = null;
			if (props || directives.length) propsExp = (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_ATTRS), [buildSSRProps(props, directives, context)]);
			wipMap$2.set(node, {
				tag,
				propsExp,
				scopeId: context.scopeId || null
			});
		}
	};
}
function ssrProcessTransitionGroup(node, context) {
	const entry = wipMap$2.get(node);
	if (entry) {
		const { tag, propsExp, scopeId } = entry;
		if (tag.type === 7) {
			context.pushStringPart(`<`);
			context.pushStringPart(tag.exp);
			if (propsExp) context.pushStringPart(propsExp);
			if (scopeId) context.pushStringPart(` ${scopeId}`);
			context.pushStringPart(`>`);
			processChildren(
				node,
				context,
				false,
				/**
				* TransitionGroup has the special runtime behavior of flattening and
				* concatenating all children into a single fragment (in order for them to
				* be patched using the same key map) so we need to account for that here
				* by disabling nested fragment wrappers from being generated.
				*/
				true,
				/**
				* TransitionGroup filters out comment children at runtime and thus
				* doesn't expect comments to be present during hydration. We need to
				* account for that by disabling the empty comment that is otherwise
				* rendered for a falsy v-if that has no v-else specified. (#6715)
				*/
				true
			);
			context.pushStringPart(`</`);
			context.pushStringPart(tag.exp);
			context.pushStringPart(`>`);
		} else {
			context.pushStringPart(`<${tag.value.content}`);
			if (propsExp) context.pushStringPart(propsExp);
			if (scopeId) context.pushStringPart(` ${scopeId}`);
			context.pushStringPart(`>`);
			processChildren(node, context, false, true, true);
			context.pushStringPart(`</${tag.value.content}>`);
		}
	} else processChildren(node, context, true, true, true);
}
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrTransformTransition.ts
const wipMap$1 = /* @__PURE__ */ new WeakMap();
function ssrTransformTransition(node, context) {
	return () => {
		const appear = (0, _vue_compiler_dom.findProp)(node, "appear", false, true);
		wipMap$1.set(node, !!appear);
	};
}
function ssrProcessTransition(node, context) {
	node.children = node.children.filter((c) => c.type !== 3);
	if (wipMap$1.get(node)) {
		context.pushStringPart(`<template>`);
		processChildren(node, context, false, true);
		context.pushStringPart(`</template>`);
	} else processChildren(node, context, false, true);
}
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrTransformComponent.ts
const wipMap = /* @__PURE__ */ new WeakMap();
const WIP_SLOT = Symbol();
const componentTypeMap = /* @__PURE__ */ new WeakMap();
const ssrTransformComponent = (node, context) => {
	if (node.type !== 1 || node.tagType !== 1) return;
	const component = (0, _vue_compiler_dom.resolveComponentType)(node, context, true);
	const isDynamicComponent = (0, _vue_shared.isObject)(component) && component.callee === _vue_compiler_dom.RESOLVE_DYNAMIC_COMPONENT;
	componentTypeMap.set(node, component);
	if ((0, _vue_shared.isSymbol)(component)) {
		if (component === _vue_compiler_dom.SUSPENSE) return ssrTransformSuspense(node, context);
		else if (component === _vue_compiler_dom.TRANSITION_GROUP) return ssrTransformTransitionGroup(node, context);
		else if (component === _vue_compiler_dom.TRANSITION) return ssrTransformTransition(node, context);
		return;
	}
	const vnodeBranches = [];
	const clonedNode = clone(node);
	return function ssrPostTransformComponent() {
		if (clonedNode.children.length) (0, _vue_compiler_dom.buildSlots)(clonedNode, context, (props, vFor, children) => {
			vnodeBranches.push(createVNodeSlotBranch(props, vFor, children, context));
			return (0, _vue_compiler_dom.createFunctionExpression)(void 0);
		});
		let propsExp = `null`;
		if (node.props.length) {
			const { props, directives } = (0, _vue_compiler_dom.buildProps)(node, context, void 0, true, isDynamicComponent);
			if (props || directives.length) propsExp = buildSSRProps(props, directives, context);
		}
		const wipEntries = [];
		wipMap.set(node, wipEntries);
		const buildSSRSlotFn = (props, _vForExp, children, loc) => {
			const param0 = props && (0, _vue_compiler_dom.stringifyExpression)(props) || `_`;
			const fn = (0, _vue_compiler_dom.createFunctionExpression)([
				param0,
				`_push`,
				`_parent`,
				`_scopeId`
			], void 0, true, true, loc);
			wipEntries.push({
				type: WIP_SLOT,
				fn,
				children,
				vnodeBranch: vnodeBranches[wipEntries.length]
			});
			return fn;
		};
		const slots = node.children.length ? (0, _vue_compiler_dom.buildSlots)(node, context, buildSSRSlotFn).slots : `null`;
		if (typeof component !== "string") node.ssrCodegenNode = (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_VNODE), [
			`_push`,
			(0, _vue_compiler_dom.createCallExpression)(context.helper(_vue_compiler_dom.CREATE_VNODE), [
				component,
				propsExp,
				slots
			]),
			`_parent`
		]);
		else node.ssrCodegenNode = (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_COMPONENT), [
			component,
			propsExp,
			slots,
			`_parent`
		]);
	};
};
function ssrProcessComponent(node, context, parent) {
	const component = componentTypeMap.get(node);
	if (!node.ssrCodegenNode) {
		if (component === _vue_compiler_dom.TELEPORT) return ssrProcessTeleport(node, context);
		else if (component === _vue_compiler_dom.SUSPENSE) return ssrProcessSuspense(node, context);
		else if (component === _vue_compiler_dom.TRANSITION_GROUP) return ssrProcessTransitionGroup(node, context);
		else {
			if (parent.type === WIP_SLOT) context.pushStringPart(``);
			if (component === _vue_compiler_dom.TRANSITION) return ssrProcessTransition(node, context);
			processChildren(node, context);
		}
	} else {
		const wipEntries = wipMap.get(node) || [];
		for (let i = 0; i < wipEntries.length; i++) {
			const { fn, vnodeBranch } = wipEntries[i];
			fn.body = (0, _vue_compiler_dom.createIfStatement)((0, _vue_compiler_dom.createSimpleExpression)(`_push`, false), processChildrenAsStatement(wipEntries[i], context, false, true), vnodeBranch);
		}
		if (context.withSlotScopeId) node.ssrCodegenNode.arguments.push(`_scopeId`);
		if (typeof component === "string") context.pushStatement((0, _vue_compiler_dom.createCallExpression)(`_push`, [node.ssrCodegenNode]));
		else context.pushStatement(node.ssrCodegenNode);
	}
}
const rawOptionsMap = /* @__PURE__ */ new WeakMap();
const [baseNodeTransforms, baseDirectiveTransforms] = (0, _vue_compiler_dom.getBaseTransformPreset)(true);
const vnodeNodeTransforms = [...baseNodeTransforms, ..._vue_compiler_dom.DOMNodeTransforms];
const vnodeDirectiveTransforms = {
	...baseDirectiveTransforms,
	..._vue_compiler_dom.DOMDirectiveTransforms
};
function createVNodeSlotBranch(slotProps, vFor, children, parentContext) {
	const rawOptions = rawOptionsMap.get(parentContext.root);
	const subOptions = {
		...rawOptions,
		nodeTransforms: [
			...rawOptions.preNodeTransforms || [],
			...vnodeNodeTransforms,
			...rawOptions.nodeTransforms || []
		],
		directiveTransforms: {
			...vnodeDirectiveTransforms,
			...rawOptions.directiveTransforms || {}
		}
	};
	const wrapperProps = [];
	if (slotProps) wrapperProps.push({
		type: 7,
		name: "slot",
		exp: slotProps,
		arg: void 0,
		modifiers: [],
		loc: _vue_compiler_dom.locStub
	});
	if (vFor) wrapperProps.push((0, _vue_shared.extend)({}, vFor));
	subTransform({
		type: 1,
		ns: 0,
		tag: "template",
		tagType: 3,
		props: wrapperProps,
		children,
		loc: _vue_compiler_dom.locStub,
		codegenNode: void 0
	}, subOptions, parentContext);
	return (0, _vue_compiler_dom.createReturnStatement)(children);
}
function subTransform(node, options, parentContext) {
	const childRoot = (0, _vue_compiler_dom.createRoot)([node]);
	const childContext = (0, _vue_compiler_dom.createTransformContext)(childRoot, options);
	childContext.ssr = false;
	childContext.scopes = { ...parentContext.scopes };
	childContext.identifiers = { ...parentContext.identifiers };
	childContext.identifierScopes = Object.create(null);
	for (const name in parentContext.identifierScopes) childContext.identifierScopes[name] = parentContext.identifierScopes[name].slice();
	childContext.imports = parentContext.imports;
	(0, _vue_compiler_dom.traverseNode)(childRoot, childContext);
	[
		"helpers",
		"components",
		"directives"
	].forEach((key) => {
		childContext[key].forEach((value, helperKey) => {
			if (key === "helpers") {
				const parentCount = parentContext.helpers.get(helperKey);
				if (parentCount === void 0) parentContext.helpers.set(helperKey, value);
				else parentContext.helpers.set(helperKey, value + parentCount);
			} else parentContext[key].add(value);
		});
	});
}
function clone(v) {
	if ((0, _vue_shared.isArray)(v)) return v.map(clone);
	else if ((0, _vue_shared.isPlainObject)(v)) {
		const res = {};
		for (const key in v) res[key] = clone(v[key]);
		return res;
	} else return v;
}
//#endregion
//#region packages/compiler-ssr/src/ssrCodegenTransform.ts
function ssrCodegenTransform(ast, options) {
	const context = createSSRTransformContext(ast, options);
	if (options.ssrCssVars) {
		const cssContext = (0, _vue_compiler_dom.createTransformContext)((0, _vue_compiler_dom.createRoot)([]), options);
		const varsExp = (0, _vue_compiler_dom.processExpression)((0, _vue_compiler_dom.createSimpleExpression)(options.ssrCssVars, false), cssContext);
		context.body.push((0, _vue_compiler_dom.createCompoundExpression)([
			`const _cssVars = { style: `,
			varsExp,
			`}`
		]));
		Array.from(cssContext.helpers.keys()).forEach((helper) => {
			ast.helpers.add(helper);
		});
	}
	processChildren(ast, context, ast.children.length > 1 && ast.children.some((c) => !(0, _vue_compiler_dom.isText)(c)));
	ast.codegenNode = (0, _vue_compiler_dom.createBlockStatement)(context.body);
	ast.ssrHelpers = Array.from(/* @__PURE__ */ new Set([...Array.from(ast.helpers).filter((h) => h in ssrHelpers), ...context.helpers]));
	ast.helpers = new Set(Array.from(ast.helpers).filter((h) => !(h in ssrHelpers)));
}
function createSSRTransformContext(root, options, helpers = /* @__PURE__ */ new Set(), withSlotScopeId = false) {
	const body = [];
	let currentString = null;
	return {
		root,
		options,
		body,
		helpers,
		withSlotScopeId,
		onError: options.onError || ((e) => {
			throw e;
		}),
		helper(name) {
			helpers.add(name);
			return name;
		},
		pushStringPart(part) {
			if (!currentString) {
				const currentCall = (0, _vue_compiler_dom.createCallExpression)(`_push`);
				body.push(currentCall);
				currentString = (0, _vue_compiler_dom.createTemplateLiteral)([]);
				currentCall.arguments.push(currentString);
			}
			const bufferedElements = currentString.elements;
			const lastItem = bufferedElements[bufferedElements.length - 1];
			if ((0, _vue_shared.isString)(part) && (0, _vue_shared.isString)(lastItem)) bufferedElements[bufferedElements.length - 1] += part;
			else bufferedElements.push(part);
		},
		pushStatement(statement) {
			currentString = null;
			body.push(statement);
		}
	};
}
function createChildContext(parent, withSlotScopeId = parent.withSlotScopeId) {
	return createSSRTransformContext(parent.root, parent.options, parent.helpers, withSlotScopeId);
}
function processChildren(parent, context, asFragment = false, disableNestedFragments = false, disableComment = false) {
	if (asFragment) context.pushStringPart(`<!--[-->`);
	const { children } = parent;
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		switch (child.type) {
			case 1:
				switch (child.tagType) {
					case 0:
						ssrProcessElement(child, context);
						break;
					case 1:
						ssrProcessComponent(child, context, parent);
						break;
					case 2:
						ssrProcessSlotOutlet(child, context);
						break;
					case 3: break;
					default:
						context.onError(createSSRCompilerError(67, child.loc));
						return child;
				}
				break;
			case 2:
				context.pushStringPart((0, _vue_shared.escapeHtml)(child.content));
				break;
			case 3:
				if (!disableComment) context.pushStringPart(`<!--${child.content}-->`);
				break;
			case 5:
				const interpolationArgs = [child.content];
				if (parent.__uniText) interpolationArgs.push((0, _vue_compiler_dom.createSimpleExpression)("true", false));
				context.pushStringPart((0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_INTERPOLATE), [...interpolationArgs]));
				break;
			case 9:
				ssrProcessIf(child, context, disableNestedFragments, disableComment);
				break;
			case 11:
				ssrProcessFor(child, context, disableNestedFragments);
				break;
			case 10: break;
			case 12:
			case 8: break;
			default:
				context.onError(createSSRCompilerError(67, child.loc));
				return child;
		}
	}
	if (asFragment) context.pushStringPart(`<!--]-->`);
}
function processChildrenAsStatement(parent, parentContext, asFragment = false, withSlotScopeId = parentContext.withSlotScopeId) {
	const childContext = createChildContext(parentContext, withSlotScopeId);
	processChildren(parent, childContext, asFragment);
	return (0, _vue_compiler_dom.createBlockStatement)(childContext.body);
}
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrVModel.ts
const ssrTransformModel = (dir, node, context) => {
	const model = dir.exp;
	function checkDuplicatedValue() {
		const value = (0, _vue_compiler_dom.findProp)(node, "value");
		if (value) context.onError((0, _vue_compiler_dom.createDOMCompilerError)(61, value.loc));
	}
	const processSelectChildren = (children) => {
		children.forEach((child) => {
			if (child.type === 1) processOption(child);
			else if (child.type === 11) processSelectChildren(child.children);
			else if (child.type === 9) child.branches.forEach((b) => processSelectChildren(b.children));
		});
	};
	function processOption(plainNode) {
		if (plainNode.tag === "option") {
			if (plainNode.props.findIndex((p) => p.name === "selected") === -1) {
				const value = findValueBinding(plainNode);
				plainNode.ssrCodegenNode.elements.push((0, _vue_compiler_dom.createConditionalExpression)((0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_INCLUDE_BOOLEAN_ATTR), [(0, _vue_compiler_dom.createConditionalExpression)((0, _vue_compiler_dom.createCallExpression)(`Array.isArray`, [model]), (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_LOOSE_CONTAIN), [model, value]), (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_LOOSE_EQUAL), [model, value]))]), (0, _vue_compiler_dom.createSimpleExpression)(" selected", true), (0, _vue_compiler_dom.createSimpleExpression)("", true), false));
			}
		} else if (plainNode.tag === "optgroup") processSelectChildren(plainNode.children);
	}
	if (node.tagType === 0) {
		const res = { props: [] };
		if (node.tag === "input") {
			const defaultProps = [(0, _vue_compiler_dom.createObjectProperty)(`value`, model)];
			const type = (0, _vue_compiler_dom.findProp)(node, "type");
			if (type) {
				const value = findValueBinding(node);
				if (type.type === 7) res.ssrTagParts = [(0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_RENDER_DYNAMIC_MODEL), [
					type.exp,
					model,
					value
				])];
				else if (type.value) switch (type.value.content) {
					case "radio":
						res.props = [(0, _vue_compiler_dom.createObjectProperty)(`checked`, (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_LOOSE_EQUAL), [model, value]))];
						break;
					case "checkbox":
						const trueValueBinding = (0, _vue_compiler_dom.findProp)(node, "true-value");
						if (trueValueBinding) {
							const trueValue = trueValueBinding.type === 6 ? JSON.stringify(trueValueBinding.value.content) : trueValueBinding.exp;
							res.props = [(0, _vue_compiler_dom.createObjectProperty)(`checked`, (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_LOOSE_EQUAL), [model, trueValue]))];
						} else res.props = [(0, _vue_compiler_dom.createObjectProperty)(`checked`, (0, _vue_compiler_dom.createConditionalExpression)((0, _vue_compiler_dom.createCallExpression)(`Array.isArray`, [model]), (0, _vue_compiler_dom.createCallExpression)(context.helper(SSR_LOOSE_CONTAIN), [model, value]), model))];
						break;
					case "file":
						context.onError((0, _vue_compiler_dom.createDOMCompilerError)(60, dir.loc));
						break;
					default:
						checkDuplicatedValue();
						res.props = defaultProps;
				}
			} else if ((0, _vue_compiler_dom.hasDynamicKeyVBind)(node)) {} else {
				checkDuplicatedValue();
				res.props = defaultProps;
			}
		} else if (node.tag === "textarea") {
			checkDuplicatedValue();
			node.children = [(0, _vue_compiler_dom.createInterpolation)(model, model.loc)];
		} else if (node.tag === "select") processSelectChildren(node.children);
		else context.onError((0, _vue_compiler_dom.createDOMCompilerError)(58, dir.loc));
		return res;
	} else return (0, _vue_compiler_dom.transformModel)(dir, node, context);
};
function findValueBinding(node) {
	const valueBinding = (0, _vue_compiler_dom.findProp)(node, "value");
	return valueBinding ? valueBinding.type === 7 ? valueBinding.exp : (0, _vue_compiler_dom.createSimpleExpression)(valueBinding.value.content, true) : (0, _vue_compiler_dom.createSimpleExpression)(`null`, false);
}
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrVShow.ts
const ssrTransformShow = (dir, node, context) => {
	if (!dir.exp) context.onError((0, _vue_compiler_dom.createDOMCompilerError)(62));
	return { props: [(0, _vue_compiler_dom.createObjectProperty)(`style`, (0, _vue_compiler_dom.createConditionalExpression)(dir.exp, (0, _vue_compiler_dom.createSimpleExpression)(`null`, false), (0, _vue_compiler_dom.createObjectExpression)([(0, _vue_compiler_dom.createObjectProperty)(`display`, (0, _vue_compiler_dom.createSimpleExpression)(`none`, true))]), false))] };
};
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrInjectFallthroughAttrs.ts
const ssrInjectFallthroughAttrs = (node, context) => {
	if (node.type === 0) context.identifiers._attrs = 1;
	if (node.type === 1 && node.tagType === 1 && (node.tag === "transition" || node.tag === "Transition" || node.tag === "KeepAlive" || node.tag === "keep-alive")) {
		const rootChildren = (0, _vue_compiler_dom.filterNonCommentChildren)(context.root);
		if (rootChildren.length === 1 && rootChildren[0] === node) {
			if ((0, _vue_compiler_dom.hasSingleChild)(node)) injectFallthroughAttrs(node.children[0]);
			return;
		}
	}
	const parent = context.parent;
	if (!parent || parent.type !== 0) return;
	if (node.type === 10 && (0, _vue_compiler_dom.hasSingleChild)(node)) {
		if ((0, _vue_compiler_dom.isSingleIfBlock)(parent)) injectFallthroughAttrs(node.children[0]);
	} else if ((0, _vue_compiler_dom.hasSingleChild)(parent)) injectFallthroughAttrs(node);
};
function injectFallthroughAttrs(node) {
	if (node.type === 1 && (node.tagType === 0 || node.tagType === 1) && !(0, _vue_compiler_dom.findDir)(node, "for")) node.props.push({
		type: 7,
		name: "bind",
		arg: void 0,
		exp: (0, _vue_compiler_dom.createSimpleExpression)(`_attrs`, false),
		modifiers: [],
		loc: _vue_compiler_dom.locStub
	});
}
//#endregion
//#region packages/compiler-ssr/src/transforms/ssrInjectCssVars.ts
const ssrInjectCssVars = (node, context) => {
	if (!context.ssrCssVars) return;
	if (node.type === 0) context.identifiers._cssVars = 1;
	const parent = context.parent;
	if (!parent || parent.type !== 0) return;
	if (node.type === 10) for (const child of node.children) injectCssVars(child);
	else injectCssVars(node);
};
function injectCssVars(node) {
	if (node.type === 1 && (node.tagType === 0 || node.tagType === 1) && !(0, _vue_compiler_dom.findDir)(node, "for")) {
		if (node.tag === "suspense" || node.tag === "Suspense") for (const child of node.children) if (child.type === 1 && child.tagType === 3) child.children.forEach(injectCssVars);
		else injectCssVars(child);
		else node.props.push({
			type: 7,
			name: "bind",
			arg: void 0,
			exp: (0, _vue_compiler_dom.createSimpleExpression)(`_cssVars`, false),
			modifiers: [],
			loc: _vue_compiler_dom.locStub
		});
	}
}
//#endregion
//#region packages/compiler-ssr/src/index.ts
function compile(source, options = {}) {
	options = {
		...options,
		..._vue_compiler_dom.parserOptions,
		ssr: true,
		inSSR: true,
		scopeId: options.mode === "function" ? null : options.scopeId,
		prefixIdentifiers: true,
		cacheHandlers: false,
		hoistStatic: false
	};
	const ast = typeof source === "string" ? (0, _vue_compiler_dom.baseParse)(source, options) : source;
	rawOptionsMap.set(ast, options);
	(0, _vue_compiler_dom.transform)(ast, {
		...options,
		hoistStatic: false,
		nodeTransforms: [
			...options.preNodeTransforms || [],
			_vue_compiler_dom.transformVBindShorthand,
			ssrTransformIf,
			ssrTransformFor,
			_vue_compiler_dom.trackVForSlotScopes,
			_vue_compiler_dom.transformExpression,
			ssrTransformSlotOutlet,
			ssrInjectFallthroughAttrs,
			ssrInjectCssVars,
			ssrTransformElement,
			ssrTransformComponent,
			_vue_compiler_dom.trackSlotScopes,
			_vue_compiler_dom.transformStyle,
			...options.nodeTransforms || []
		],
		directiveTransforms: {
			bind: _vue_compiler_dom.transformBind,
			on: _vue_compiler_dom.transformOn,
			model: ssrTransformModel,
			show: ssrTransformShow,
			cloak: _vue_compiler_dom.noopDirectiveTransform,
			once: _vue_compiler_dom.noopDirectiveTransform,
			memo: _vue_compiler_dom.noopDirectiveTransform,
			...options.directiveTransforms || {}
		}
	});
	ssrCodegenTransform(ast, options);
	return (0, _vue_compiler_dom.generate)(ast, options);
}
//#endregion
exports.compile = compile;
