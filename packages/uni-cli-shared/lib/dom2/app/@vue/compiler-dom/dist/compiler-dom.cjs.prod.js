/**
  * @vue/compiler-dom v3.6.0-beta.5
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
let _vue_compiler_core = require("@vue/compiler-core");
let _vue_shared = require("@vue/shared");

//#region packages/compiler-dom/src/runtimeHelpers.ts
const V_MODEL_RADIO = Symbol(``);
const V_MODEL_CHECKBOX = Symbol(``);
const V_MODEL_TEXT = Symbol(``);
const V_MODEL_SELECT = Symbol(``);
const V_MODEL_DYNAMIC = Symbol(``);
const V_ON_WITH_MODIFIERS = Symbol(``);
const V_ON_WITH_KEYS = Symbol(``);
const V_SHOW = Symbol(``);
const TRANSITION = Symbol(``);
const TRANSITION_GROUP = Symbol(``);
(0, _vue_compiler_core.registerRuntimeHelpers)({
	[V_MODEL_RADIO]: `vModelRadio`,
	[V_MODEL_CHECKBOX]: `vModelCheckbox`,
	[V_MODEL_TEXT]: `vModelText`,
	[V_MODEL_SELECT]: `vModelSelect`,
	[V_MODEL_DYNAMIC]: `vModelDynamic`,
	[V_ON_WITH_MODIFIERS]: `withModifiers`,
	[V_ON_WITH_KEYS]: `withKeys`,
	[V_SHOW]: `vShow`,
	[TRANSITION]: `Transition`,
	[TRANSITION_GROUP]: `TransitionGroup`
});

//#endregion
//#region packages/compiler-dom/src/parserOptions.ts
const parserOptions = {
	parseMode: "html",
	isVoidTag: _vue_shared.isVoidTag,
	isNativeTag: (tag) => (0, _vue_shared.isHTMLTag)(tag) || (0, _vue_shared.isSVGTag)(tag) || (0, _vue_shared.isMathMLTag)(tag),
	isPreTag: (tag) => tag === "pre",
	isIgnoreNewlineTag: (tag) => tag === "pre" || tag === "textarea",
	decodeEntities: void 0,
	isBuiltInComponent: (tag) => {
		if (tag === "Transition" || tag === "transition") return TRANSITION;
		else if (tag === "TransitionGroup" || tag === "transition-group") return TRANSITION_GROUP;
	},
	getNamespace(tag, parent, rootNamespace) {
		let ns = parent ? parent.ns : rootNamespace;
		if (parent && ns === 2) {
			if (parent.tag === "annotation-xml") {
				if ((0, _vue_shared.isSVGTag)(tag)) return 1;
				if (parent.props.some((a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml"))) ns = 0;
			} else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") ns = 0;
		} else if (parent && ns === 1) {
			if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") ns = 0;
		}
		if (ns === 0) {
			if ((0, _vue_shared.isSVGTag)(tag)) return 1;
			if ((0, _vue_shared.isMathMLTag)(tag)) return 2;
		}
		return ns;
	}
};

//#endregion
//#region packages/compiler-dom/src/transforms/transformStyle.ts
const transformStyle = (node) => {
	if (node.type === 1) node.props.forEach((p, i) => {
		if (p.type === 6 && p.name === "style" && p.value) node.props[i] = {
			type: 7,
			name: `bind`,
			arg: (0, _vue_compiler_core.createSimpleExpression)(`style`, true, p.loc),
			exp: parseInlineCSS(p.value.content, p.loc),
			modifiers: [],
			loc: p.loc
		};
	});
};
const parseInlineCSS = (cssText, loc) => {
	const normalized = (0, _vue_shared.parseStringStyle)(cssText);
	return (0, _vue_compiler_core.createSimpleExpression)(JSON.stringify(normalized), false, loc, 3);
};

//#endregion
//#region packages/compiler-dom/src/errors.ts
function createDOMCompilerError(code, loc) {
	return (0, _vue_compiler_core.createCompilerError)(code, loc, DOMErrorMessages);
}
const DOMErrorCodes = {
	"X_V_HTML_NO_EXPRESSION": 54,
	"54": "X_V_HTML_NO_EXPRESSION",
	"X_V_HTML_WITH_CHILDREN": 55,
	"55": "X_V_HTML_WITH_CHILDREN",
	"X_V_TEXT_NO_EXPRESSION": 56,
	"56": "X_V_TEXT_NO_EXPRESSION",
	"X_V_TEXT_WITH_CHILDREN": 57,
	"57": "X_V_TEXT_WITH_CHILDREN",
	"X_V_MODEL_ON_INVALID_ELEMENT": 58,
	"58": "X_V_MODEL_ON_INVALID_ELEMENT",
	"X_V_MODEL_ARG_ON_ELEMENT": 59,
	"59": "X_V_MODEL_ARG_ON_ELEMENT",
	"X_V_MODEL_ON_FILE_INPUT_ELEMENT": 60,
	"60": "X_V_MODEL_ON_FILE_INPUT_ELEMENT",
	"X_V_MODEL_UNNECESSARY_VALUE": 61,
	"61": "X_V_MODEL_UNNECESSARY_VALUE",
	"X_V_SHOW_NO_EXPRESSION": 62,
	"62": "X_V_SHOW_NO_EXPRESSION",
	"X_TRANSITION_INVALID_CHILDREN": 63,
	"63": "X_TRANSITION_INVALID_CHILDREN",
	"X_IGNORED_SIDE_EFFECT_TAG": 64,
	"64": "X_IGNORED_SIDE_EFFECT_TAG",
	"__EXTEND_POINT__": 65,
	"65": "__EXTEND_POINT__"
};
const DOMErrorMessages = {
	[54]: `v-html is missing expression.`,
	[55]: `v-html will override element children.`,
	[56]: `v-text is missing expression.`,
	[57]: `v-text will override element children.`,
	[58]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
	[59]: `v-model argument is not supported on plain elements.`,
	[60]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
	[61]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
	[62]: `v-show is missing expression.`,
	[63]: `<Transition> expects exactly one child element or component.`,
	[64]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`,
	[65]: ``
};

//#endregion
//#region packages/compiler-dom/src/transforms/vHtml.ts
const transformVHtml = (dir, node, context) => {
	const { exp, loc } = dir;
	if (!exp) context.onError(createDOMCompilerError(54, loc));
	if (node.children.length) {
		context.onError(createDOMCompilerError(55, loc));
		node.children.length = 0;
	}
	return { props: [(0, _vue_compiler_core.createObjectProperty)((0, _vue_compiler_core.createSimpleExpression)(`innerHTML`, true, loc), exp || (0, _vue_compiler_core.createSimpleExpression)("", true))] };
};

//#endregion
//#region packages/compiler-dom/src/transforms/vText.ts
const transformVText = (dir, node, context) => {
	const { exp, loc } = dir;
	if (!exp) context.onError(createDOMCompilerError(56, loc));
	if (node.children.length) {
		context.onError(createDOMCompilerError(57, loc));
		node.children.length = 0;
	}
	return { props: [(0, _vue_compiler_core.createObjectProperty)((0, _vue_compiler_core.createSimpleExpression)(`textContent`, true), exp ? (0, _vue_compiler_core.getConstantType)(exp, context) > 0 ? exp : (0, _vue_compiler_core.createCallExpression)(context.helperString(_vue_compiler_core.TO_DISPLAY_STRING), [exp], loc) : (0, _vue_compiler_core.createSimpleExpression)("", true))] };
};

//#endregion
//#region packages/compiler-dom/src/transforms/vModel.ts
const transformModel = (dir, node, context) => {
	const baseResult = (0, _vue_compiler_core.transformModel)(dir, node, context);
	if (!baseResult.props.length || node.tagType === 1) return baseResult;
	if (dir.arg) context.onError(createDOMCompilerError(59, dir.arg.loc));
	const { tag } = node;
	const isCustomElement = context.isCustomElement(tag);
	if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
		let directiveToUse = V_MODEL_TEXT;
		let isInvalidType = false;
		if (tag === "input" || isCustomElement) {
			const type = (0, _vue_compiler_core.findProp)(node, `type`);
			if (type) {
				if (type.type === 7) directiveToUse = V_MODEL_DYNAMIC;
				else if (type.value) switch (type.value.content) {
					case "radio":
						directiveToUse = V_MODEL_RADIO;
						break;
					case "checkbox":
						directiveToUse = V_MODEL_CHECKBOX;
						break;
					case "file":
						isInvalidType = true;
						context.onError(createDOMCompilerError(60, dir.loc));
						break;
					default: break;
				}
			} else if ((0, _vue_compiler_core.hasDynamicKeyVBind)(node)) directiveToUse = V_MODEL_DYNAMIC;
		} else if (tag === "select") directiveToUse = V_MODEL_SELECT;
		if (!isInvalidType) baseResult.needRuntime = context.helper(directiveToUse);
	} else context.onError(createDOMCompilerError(58, dir.loc));
	baseResult.props = baseResult.props.filter((p) => !(p.key.type === 4 && p.key.content === "modelValue"));
	return baseResult;
};

//#endregion
//#region packages/compiler-dom/src/transforms/vOn.ts
const isEventOptionModifier = /* @__PURE__ */ (0, _vue_shared.makeMap)(`passive,once,capture`);
const isNonKeyModifier = /* @__PURE__ */ (0, _vue_shared.makeMap)("stop,prevent,self,ctrl,shift,alt,meta,exact,middle");
const maybeKeyModifier = /* @__PURE__ */ (0, _vue_shared.makeMap)("left,right");
const isKeyboardEvent = /* @__PURE__ */ (0, _vue_shared.makeMap)(`onkeyup,onkeydown,onkeypress`);
const resolveModifiers = (key, modifiers, context, loc) => {
	const keyModifiers = [];
	const nonKeyModifiers = [];
	const eventOptionModifiers = [];
	for (let i = 0; i < modifiers.length; i++) {
		const modifier = modifiers[i].content;
		if (modifier === "native" && context && (0, _vue_compiler_core.checkCompatEnabled)("COMPILER_V_ON_NATIVE", context, loc)) eventOptionModifiers.push(modifier);
		else if (isEventOptionModifier(modifier)) eventOptionModifiers.push(modifier);
		else {
			const keyString = (0, _vue_shared.isString)(key) ? key : (0, _vue_compiler_core.isStaticExp)(key) ? key.content : null;
			if (maybeKeyModifier(modifier)) if (keyString) if (isKeyboardEvent(keyString.toLowerCase())) keyModifiers.push(modifier);
			else nonKeyModifiers.push(modifier);
			else {
				keyModifiers.push(modifier);
				nonKeyModifiers.push(modifier);
			}
			else if (isNonKeyModifier(modifier)) nonKeyModifiers.push(modifier);
			else keyModifiers.push(modifier);
		}
	}
	return {
		keyModifiers,
		nonKeyModifiers,
		eventOptionModifiers
	};
};
const transformClick = (key, event) => {
	return (0, _vue_compiler_core.isStaticExp)(key) && key.content.toLowerCase() === "onclick" ? (0, _vue_compiler_core.createSimpleExpression)(event, true) : key.type !== 4 ? (0, _vue_compiler_core.createCompoundExpression)([
		`(`,
		key,
		`) === "onClick" ? "${event}" : (`,
		key,
		`)`
	]) : key;
};
const transformOn = (dir, node, context) => {
	return (0, _vue_compiler_core.transformOn)(dir, node, context, (baseResult) => {
		const { modifiers } = dir;
		if (!modifiers.length) return baseResult;
		let { key, value: handlerExp } = baseResult.props[0];
		const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(key, modifiers, context, dir.loc);
		if (nonKeyModifiers.includes("right")) key = transformClick(key, `onContextmenu`);
		if (nonKeyModifiers.includes("middle")) key = transformClick(key, `onMouseup`);
		if (nonKeyModifiers.length) handlerExp = (0, _vue_compiler_core.createCallExpression)(context.helper(V_ON_WITH_MODIFIERS), [handlerExp, JSON.stringify(nonKeyModifiers)]);
		if (keyModifiers.length && (!(0, _vue_compiler_core.isStaticExp)(key) || isKeyboardEvent(key.content.toLowerCase()))) handlerExp = (0, _vue_compiler_core.createCallExpression)(context.helper(V_ON_WITH_KEYS), [handlerExp, JSON.stringify(keyModifiers)]);
		if (eventOptionModifiers.length) {
			const modifierPostfix = eventOptionModifiers.map(_vue_shared.capitalize).join("");
			key = (0, _vue_compiler_core.isStaticExp)(key) ? (0, _vue_compiler_core.createSimpleExpression)(`${key.content}${modifierPostfix}`, true) : (0, _vue_compiler_core.createCompoundExpression)([
				`(`,
				key,
				`) + "${modifierPostfix}"`
			]);
		}
		return { props: [(0, _vue_compiler_core.createObjectProperty)(key, handlerExp)] };
	});
};

//#endregion
//#region packages/compiler-dom/src/transforms/vShow.ts
const transformShow = (dir, node, context) => {
	const { exp, loc } = dir;
	if (!exp) context.onError(createDOMCompilerError(62, loc));
	return {
		props: [],
		needRuntime: context.helper(V_SHOW)
	};
};

//#endregion
//#region packages/compiler-dom/src/transforms/Transition.ts
function postTransformTransition(node, onError, hasMultipleChildren = defaultHasMultipleChildren) {
	return () => {
		if (!node.children.length) return;
		if (hasMultipleChildren(node)) onError(createDOMCompilerError(63, {
			start: node.children[0].loc.start,
			end: node.children[node.children.length - 1].loc.end,
			source: ""
		}));
		const child = node.children[0];
		if (child.type === 1) {
			for (const p of child.props) if (p.type === 7 && p.name === "show") node.props.push({
				type: 6,
				name: "persisted",
				nameLoc: node.loc,
				value: void 0,
				loc: node.loc
			});
		}
	};
}
function defaultHasMultipleChildren(node) {
	const children = node.children = node.children.filter((c) => !(0, _vue_compiler_core.isCommentOrWhitespace)(c));
	const child = children[0];
	return children.length !== 1 || child.type === 11 || child.type === 9 && child.branches.some(defaultHasMultipleChildren);
}

//#endregion
//#region packages/compiler-dom/src/transforms/stringifyStatic.ts
/**
* This module is Node-only.
*/
/**
* Regex for replacing placeholders for embedded constant variables
* (e.g. import URL string constants generated by compiler-sfc)
*/
const expReplaceRE = /__VUE_EXP_START__(.*?)__VUE_EXP_END__/g;
/**
* Turn eligible hoisted static trees into stringified static nodes, e.g.
*
* ```js
* const _hoisted_1 = createStaticVNode(`<div class="foo">bar</div>`)
* ```
*
* A single static vnode can contain stringified content for **multiple**
* consecutive nodes (element and plain text), called a "chunk".
* `@vue/runtime-dom` will create the content via innerHTML in a hidden
* container element and insert all the nodes in place. The call must also
* provide the number of nodes contained in the chunk so that during hydration
* we can know how many nodes the static vnode should adopt.
*
* The optimization scans a children list that contains hoisted nodes, and
* tries to find the largest chunk of consecutive hoisted nodes before running
* into a non-hoisted node or the end of the list. A chunk is then converted
* into a single static vnode and replaces the hoisted expression of the first
* node in the chunk. Other nodes in the chunk are considered "merged" and
* therefore removed from both the hoist list and the children array.
*
* This optimization is only performed in Node.js.
*/
const stringifyStatic = (children, context, parent) => {
	if (context.scopes.vSlot > 0) return;
	const isParentCached = parent.type === 1 && parent.codegenNode && parent.codegenNode.type === 13 && parent.codegenNode.children && !(0, _vue_shared.isArray)(parent.codegenNode.children) && parent.codegenNode.children.type === 20;
	let nc = 0;
	let ec = 0;
	const currentChunk = [];
	const stringifyCurrentChunk = (currentIndex) => {
		if (nc >= 20 || ec >= 5) {
			const staticCall = (0, _vue_compiler_core.createCallExpression)(context.helper(_vue_compiler_core.CREATE_STATIC), [JSON.stringify(currentChunk.map((node) => stringifyNode(node, context)).join("")).replace(expReplaceRE, `" + $1 + "`), String(currentChunk.length)]);
			const deleteCount = currentChunk.length - 1;
			if (isParentCached) children.splice(currentIndex - currentChunk.length, currentChunk.length, staticCall);
			else {
				currentChunk[0].codegenNode.value = staticCall;
				if (currentChunk.length > 1) {
					children.splice(currentIndex - currentChunk.length + 1, deleteCount);
					const cacheIndex = context.cached.indexOf(currentChunk[currentChunk.length - 1].codegenNode);
					if (cacheIndex > -1) {
						for (let i = cacheIndex; i < context.cached.length; i++) {
							const c = context.cached[i];
							if (c) c.index -= deleteCount;
						}
						context.cached.splice(cacheIndex - deleteCount + 1, deleteCount);
					}
				}
			}
			return deleteCount;
		}
		return 0;
	};
	let i = 0;
	for (; i < children.length; i++) {
		const child = children[i];
		if (isParentCached || getCachedNode(child)) {
			const result = analyzeNode(child);
			if (result) {
				nc += result[0];
				ec += result[1];
				currentChunk.push(child);
				continue;
			}
		}
		i -= stringifyCurrentChunk(i);
		nc = 0;
		ec = 0;
		currentChunk.length = 0;
	}
	stringifyCurrentChunk(i);
};
const getCachedNode = (node) => {
	if ((node.type === 1 && node.tagType === 0 || node.type === 12) && node.codegenNode && node.codegenNode.type === 20) return node.codegenNode;
};
const dataAriaRE = /^(?:data|aria)-/;
const isStringifiableAttr = (name, ns) => {
	return (ns === 0 ? (0, _vue_shared.isKnownHtmlAttr)(name) : ns === 1 ? (0, _vue_shared.isKnownSvgAttr)(name) : ns === 2 ? (0, _vue_shared.isKnownMathMLAttr)(name) : false) || dataAriaRE.test(name);
};
const isNonStringifiable = /* @__PURE__ */ (0, _vue_shared.makeMap)(`caption,thead,tr,th,tbody,td,tfoot,colgroup,col`);
/**
* for a cached node, analyze it and return:
* - false: bailed (contains non-stringifiable props or runtime constant)
* - [nc, ec] where
*   - nc is the number of nodes inside
*   - ec is the number of element with bindings inside
*/
function analyzeNode(node) {
	if (node.type === 1 && isNonStringifiable(node.tag)) return false;
	if (node.type === 1 && (0, _vue_compiler_core.findDir)(node, "once", true)) return false;
	if (node.type === 12) return [1, 0];
	let nc = 1;
	let ec = node.props.length > 0 ? 1 : 0;
	let bailed = false;
	const bail = () => {
		bailed = true;
		return false;
	};
	function walk(node) {
		const isOptionTag = node.tag === "option" && node.ns === 0;
		for (let i = 0; i < node.props.length; i++) {
			const p = node.props[i];
			if (p.type === 6 && !isStringifiableAttr(p.name, node.ns)) return bail();
			if (p.type === 7 && p.name === "bind") {
				if (p.arg && (p.arg.type === 8 || p.arg.isStatic && !isStringifiableAttr(p.arg.content, node.ns))) return bail();
				if (p.exp && (p.exp.type === 8 || p.exp.constType < 3)) return bail();
				if (isOptionTag && (0, _vue_compiler_core.isStaticArgOf)(p.arg, "value") && p.exp && !p.exp.isStatic) return bail();
			}
		}
		for (let i = 0; i < node.children.length; i++) {
			nc++;
			const child = node.children[i];
			if (child.type === 1) {
				if (child.props.length > 0) ec++;
				walk(child);
				if (bailed) return false;
			}
		}
		return true;
	}
	return walk(node) ? [nc, ec] : false;
}
function stringifyNode(node, context) {
	if ((0, _vue_shared.isString)(node)) return node;
	if ((0, _vue_shared.isSymbol)(node)) return ``;
	switch (node.type) {
		case 1: return stringifyElement(node, context);
		case 2: return (0, _vue_shared.escapeHtml)(node.content);
		case 3: return `<!--${(0, _vue_shared.escapeHtml)(node.content)}-->`;
		case 5: return (0, _vue_shared.escapeHtml)((0, _vue_shared.toDisplayString)(evaluateConstant(node.content)));
		case 8: return (0, _vue_shared.escapeHtml)(evaluateConstant(node));
		case 12: return stringifyNode(node.content, context);
		default: return "";
	}
}
function stringifyElement(node, context) {
	let res = `<${node.tag}`;
	let innerHTML = "";
	for (let i = 0; i < node.props.length; i++) {
		const p = node.props[i];
		if (p.type === 6) {
			res += ` ${p.name}`;
			if (p.value) res += `="${(0, _vue_shared.escapeHtml)(p.value.content)}"`;
		} else if (p.type === 7) {
			if (p.name === "bind") {
				const exp = p.exp;
				if (exp.content[0] === "_") {
					res += ` ${p.arg.content}="__VUE_EXP_START__${exp.content}__VUE_EXP_END__"`;
					continue;
				}
				if ((0, _vue_shared.isBooleanAttr)(p.arg.content) && exp.content === "false") continue;
				let evaluated = evaluateConstant(exp);
				if (evaluated != null) {
					const arg = p.arg && p.arg.content;
					if (arg === "class") evaluated = (0, _vue_shared.normalizeClass)(evaluated);
					else if (arg === "style") evaluated = (0, _vue_shared.stringifyStyle)((0, _vue_shared.normalizeStyle)(evaluated));
					res += ` ${p.arg.content}="${(0, _vue_shared.escapeHtml)(evaluated)}"`;
				}
			} else if (p.name === "html") innerHTML = evaluateConstant(p.exp);
			else if (p.name === "text") innerHTML = (0, _vue_shared.escapeHtml)((0, _vue_shared.toDisplayString)(evaluateConstant(p.exp)));
		}
	}
	if (context.scopeId) res += ` ${context.scopeId}`;
	res += `>`;
	if (innerHTML) res += innerHTML;
	else for (let i = 0; i < node.children.length; i++) res += stringifyNode(node.children[i], context);
	if (!(0, _vue_shared.isVoidTag)(node.tag)) res += `</${node.tag}>`;
	return res;
}
function evaluateConstant(exp) {
	if (exp.type === 4) return new Function(`return (${exp.content})`)();
	else {
		let res = ``;
		exp.children.forEach((c) => {
			if ((0, _vue_shared.isString)(c) || (0, _vue_shared.isSymbol)(c)) return;
			if (c.type === 2) res += c.content;
			else if (c.type === 5) res += (0, _vue_shared.toDisplayString)(evaluateConstant(c.content));
			else res += evaluateConstant(c);
		});
		return res;
	}
}

//#endregion
//#region packages/compiler-dom/src/transforms/ignoreSideEffectTags.ts
const ignoreSideEffectTags = (node, context) => {
	if (node.type === 1 && node.tagType === 0 && (node.tag === "script" || node.tag === "style")) context.removeNode();
};

//#endregion
//#region packages/compiler-dom/src/htmlNesting.ts
/**
* Copied from https://github.com/MananTank/validate-html-nesting
* with ISC license
*
* To avoid runtime dependency on validate-html-nesting
* This file should not change very often in the original repo
* but we may need to keep it up-to-date from time to time.
*/
/**
* returns true if given parent-child nesting is valid HTML
*/
function isValidHTMLNesting(parent, child) {
	if (parent === "template") return true;
	if (parent in onlyValidChildren) return onlyValidChildren[parent].has(child);
	if (child in onlyValidParents) return onlyValidParents[child].has(parent);
	if (parent in knownInvalidChildren) {
		if (knownInvalidChildren[parent].has(child)) return false;
	}
	if (child in knownInvalidParents) {
		if (knownInvalidParents[child].has(parent)) return false;
	}
	return true;
}
const headings = new Set([
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6"
]);
const emptySet = /* @__PURE__ */ new Set([]);
/**
* maps element to set of elements that can be it's children, no other */
const onlyValidChildren = {
	head: new Set([
		"base",
		"basefront",
		"bgsound",
		"link",
		"meta",
		"title",
		"noscript",
		"noframes",
		"style",
		"script",
		"template"
	]),
	optgroup: new Set(["option"]),
	select: new Set([
		"optgroup",
		"option",
		"hr"
	]),
	table: new Set([
		"caption",
		"colgroup",
		"tbody",
		"tfoot",
		"thead"
	]),
	tr: new Set(["td", "th"]),
	colgroup: new Set(["col"]),
	tbody: new Set(["tr"]),
	thead: new Set(["tr"]),
	tfoot: new Set(["tr"]),
	script: emptySet,
	iframe: emptySet,
	option: emptySet,
	textarea: emptySet,
	style: emptySet,
	title: emptySet
};
/** maps elements to set of elements which can be it's parent, no other */
const onlyValidParents = {
	html: emptySet,
	body: new Set(["html"]),
	head: new Set(["html"]),
	td: new Set(["tr"]),
	colgroup: new Set(["table"]),
	caption: new Set(["table"]),
	tbody: new Set(["table"]),
	tfoot: new Set(["table"]),
	col: new Set(["colgroup"]),
	th: new Set(["tr"]),
	thead: new Set(["table"]),
	tr: new Set([
		"tbody",
		"thead",
		"tfoot"
	]),
	dd: new Set(["dl", "div"]),
	dt: new Set(["dl", "div"]),
	figcaption: new Set(["figure"]),
	summary: new Set(["details"]),
	area: new Set(["map"])
};
/** maps element to set of elements that can not be it's children, others can */
const knownInvalidChildren = {
	p: new Set([
		"address",
		"article",
		"aside",
		"blockquote",
		"center",
		"details",
		"dialog",
		"dir",
		"div",
		"dl",
		"fieldset",
		"figure",
		"footer",
		"form",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"header",
		"hgroup",
		"hr",
		"li",
		"main",
		"nav",
		"menu",
		"ol",
		"p",
		"pre",
		"section",
		"table",
		"ul"
	]),
	svg: new Set([
		"b",
		"blockquote",
		"br",
		"code",
		"dd",
		"div",
		"dl",
		"dt",
		"em",
		"embed",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"hr",
		"i",
		"img",
		"li",
		"menu",
		"meta",
		"ol",
		"p",
		"pre",
		"ruby",
		"s",
		"small",
		"span",
		"strong",
		"sub",
		"sup",
		"table",
		"u",
		"ul",
		"var"
	])
};
/** maps element to set of elements that can not be it's parent, others can */
const knownInvalidParents = {
	a: new Set(["a"]),
	button: new Set(["button"]),
	dd: new Set(["dd", "dt"]),
	dt: new Set(["dd", "dt"]),
	form: new Set(["form"]),
	li: new Set(["li"]),
	h1: headings,
	h2: headings,
	h3: headings,
	h4: headings,
	h5: headings,
	h6: headings
};

//#endregion
//#region packages/compiler-dom/src/index.ts
const DOMNodeTransforms = [transformStyle, ...[]];
const DOMDirectiveTransforms = {
	cloak: _vue_compiler_core.noopDirectiveTransform,
	html: transformVHtml,
	text: transformVText,
	model: transformModel,
	on: transformOn,
	show: transformShow
};
function compile(src, options = {}) {
	return (0, _vue_compiler_core.baseCompile)(src, (0, _vue_shared.extend)({}, parserOptions, options, {
		nodeTransforms: [
			ignoreSideEffectTags,
			...DOMNodeTransforms,
			...options.nodeTransforms || []
		],
		directiveTransforms: (0, _vue_shared.extend)({}, DOMDirectiveTransforms, options.directiveTransforms || {}),
		transformHoist: stringifyStatic
	}));
}
function parse(template, options = {}) {
	return (0, _vue_compiler_core.baseParse)(template, (0, _vue_shared.extend)({}, parserOptions, options));
}

//#endregion
exports.DOMDirectiveTransforms = DOMDirectiveTransforms;
exports.DOMErrorCodes = DOMErrorCodes;
exports.DOMErrorMessages = DOMErrorMessages;
exports.DOMNodeTransforms = DOMNodeTransforms;
exports.TRANSITION = TRANSITION;
exports.TRANSITION_GROUP = TRANSITION_GROUP;
exports.V_MODEL_CHECKBOX = V_MODEL_CHECKBOX;
exports.V_MODEL_DYNAMIC = V_MODEL_DYNAMIC;
exports.V_MODEL_RADIO = V_MODEL_RADIO;
exports.V_MODEL_SELECT = V_MODEL_SELECT;
exports.V_MODEL_TEXT = V_MODEL_TEXT;
exports.V_ON_WITH_KEYS = V_ON_WITH_KEYS;
exports.V_ON_WITH_MODIFIERS = V_ON_WITH_MODIFIERS;
exports.V_SHOW = V_SHOW;
exports.compile = compile;
exports.createDOMCompilerError = createDOMCompilerError;
exports.isKeyboardEvent = isKeyboardEvent;
exports.isValidHTMLNesting = isValidHTMLNesting;
exports.parse = parse;
exports.parserOptions = parserOptions;
exports.postTransformTransition = postTransformTransition;
exports.resolveModifiers = resolveModifiers;
exports.transformStyle = transformStyle;
Object.keys(_vue_compiler_core).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _vue_compiler_core[k]; }
  });
});
