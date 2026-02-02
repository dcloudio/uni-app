/**
  * @vue/compiler-dom v3.6.0-beta.5
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
import { TO_DISPLAY_STRING, baseCompile, baseParse, checkCompatEnabled, createCallExpression, createCompilerError, createCompoundExpression, createObjectProperty, createSimpleExpression, findDir, findProp, getConstantType, hasDynamicKeyVBind, isCommentOrWhitespace, isStaticArgOf, isStaticExp, noopDirectiveTransform, registerRuntimeHelpers, transformModel, transformOn } from "@vue/compiler-core";
import { capitalize, extend, isHTMLTag, isMathMLTag, isSVGTag, isString, isVoidTag, makeMap, parseStringStyle } from "@vue/shared";

export * from "@vue/compiler-core"

//#region packages/compiler-dom/src/runtimeHelpers.ts
const V_MODEL_RADIO = Symbol(!!(process.env.NODE_ENV !== "production") ? `vModelRadio` : ``);
const V_MODEL_CHECKBOX = Symbol(!!(process.env.NODE_ENV !== "production") ? `vModelCheckbox` : ``);
const V_MODEL_TEXT = Symbol(!!(process.env.NODE_ENV !== "production") ? `vModelText` : ``);
const V_MODEL_SELECT = Symbol(!!(process.env.NODE_ENV !== "production") ? `vModelSelect` : ``);
const V_MODEL_DYNAMIC = Symbol(!!(process.env.NODE_ENV !== "production") ? `vModelDynamic` : ``);
const V_ON_WITH_MODIFIERS = Symbol(!!(process.env.NODE_ENV !== "production") ? `vOnModifiersGuard` : ``);
const V_ON_WITH_KEYS = Symbol(!!(process.env.NODE_ENV !== "production") ? `vOnKeysGuard` : ``);
const V_SHOW = Symbol(!!(process.env.NODE_ENV !== "production") ? `vShow` : ``);
const TRANSITION = Symbol(!!(process.env.NODE_ENV !== "production") ? `Transition` : ``);
const TRANSITION_GROUP = Symbol(!!(process.env.NODE_ENV !== "production") ? `TransitionGroup` : ``);
registerRuntimeHelpers({
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
//#region packages/compiler-dom/src/decodeHtmlBrowser.ts
let decoder;
function decodeHtmlBrowser(raw, asAttr = false) {
	if (!decoder) decoder = document.createElement("div");
	if (asAttr) {
		decoder.innerHTML = `<div foo="${raw.replace(/"/g, "&quot;")}">`;
		return decoder.children[0].getAttribute("foo");
	} else {
		decoder.innerHTML = raw;
		return decoder.textContent;
	}
}

//#endregion
//#region packages/compiler-dom/src/parserOptions.ts
const parserOptions = {
	parseMode: "html",
	isVoidTag,
	isNativeTag: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
	isPreTag: (tag) => tag === "pre",
	isIgnoreNewlineTag: (tag) => tag === "pre" || tag === "textarea",
	decodeEntities: decodeHtmlBrowser,
	isBuiltInComponent: (tag) => {
		if (tag === "Transition" || tag === "transition") return TRANSITION;
		else if (tag === "TransitionGroup" || tag === "transition-group") return TRANSITION_GROUP;
	},
	getNamespace(tag, parent, rootNamespace) {
		let ns = parent ? parent.ns : rootNamespace;
		if (parent && ns === 2) {
			if (parent.tag === "annotation-xml") {
				if (isSVGTag(tag)) return 1;
				if (parent.props.some((a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml"))) ns = 0;
			} else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") ns = 0;
		} else if (parent && ns === 1) {
			if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") ns = 0;
		}
		if (ns === 0) {
			if (isSVGTag(tag)) return 1;
			if (isMathMLTag(tag)) return 2;
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
			arg: createSimpleExpression(`style`, true, p.loc),
			exp: parseInlineCSS(p.value.content, p.loc),
			modifiers: [],
			loc: p.loc
		};
	});
};
const parseInlineCSS = (cssText, loc) => {
	const normalized = parseStringStyle(cssText);
	return createSimpleExpression(JSON.stringify(normalized), false, loc, 3);
};

//#endregion
//#region packages/compiler-dom/src/errors.ts
function createDOMCompilerError(code, loc) {
	return createCompilerError(code, loc, !!(process.env.NODE_ENV !== "production") || false ? DOMErrorMessages : void 0);
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
	return { props: [createObjectProperty(createSimpleExpression(`innerHTML`, true, loc), exp || createSimpleExpression("", true))] };
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
	return { props: [createObjectProperty(createSimpleExpression(`textContent`, true), exp ? getConstantType(exp, context) > 0 ? exp : createCallExpression(context.helperString(TO_DISPLAY_STRING), [exp], loc) : createSimpleExpression("", true))] };
};

//#endregion
//#region packages/compiler-dom/src/transforms/vModel.ts
const transformModel$1 = (dir, node, context) => {
	const baseResult = transformModel(dir, node, context);
	if (!baseResult.props.length || node.tagType === 1) return baseResult;
	if (dir.arg) context.onError(createDOMCompilerError(59, dir.arg.loc));
	function checkDuplicatedValue() {
		const value = findDir(node, "bind");
		if (value && isStaticArgOf(value.arg, "value")) context.onError(createDOMCompilerError(61, value.loc));
	}
	const { tag } = node;
	const isCustomElement = context.isCustomElement(tag);
	if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
		let directiveToUse = V_MODEL_TEXT;
		let isInvalidType = false;
		if (tag === "input" || isCustomElement) {
			const type = findProp(node, `type`);
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
					default:
						process.env.NODE_ENV !== "production" && checkDuplicatedValue();
						break;
				}
			} else if (hasDynamicKeyVBind(node)) directiveToUse = V_MODEL_DYNAMIC;
			else process.env.NODE_ENV !== "production" && checkDuplicatedValue();
		} else if (tag === "select") directiveToUse = V_MODEL_SELECT;
		else process.env.NODE_ENV !== "production" && checkDuplicatedValue();
		if (!isInvalidType) baseResult.needRuntime = context.helper(directiveToUse);
	} else context.onError(createDOMCompilerError(58, dir.loc));
	baseResult.props = baseResult.props.filter((p) => !(p.key.type === 4 && p.key.content === "modelValue"));
	return baseResult;
};

//#endregion
//#region packages/compiler-dom/src/transforms/vOn.ts
const isEventOptionModifier = /* @__PURE__ */ makeMap(`passive,once,capture`);
const isNonKeyModifier = /* @__PURE__ */ makeMap("stop,prevent,self,ctrl,shift,alt,meta,exact,middle");
const maybeKeyModifier = /* @__PURE__ */ makeMap("left,right");
const isKeyboardEvent = /* @__PURE__ */ makeMap(`onkeyup,onkeydown,onkeypress`);
const resolveModifiers = (key, modifiers, context, loc) => {
	const keyModifiers = [];
	const nonKeyModifiers = [];
	const eventOptionModifiers = [];
	for (let i = 0; i < modifiers.length; i++) {
		const modifier = modifiers[i].content;
		if (modifier === "native" && context && checkCompatEnabled("COMPILER_V_ON_NATIVE", context, loc)) eventOptionModifiers.push(modifier);
		else if (isEventOptionModifier(modifier)) eventOptionModifiers.push(modifier);
		else {
			const keyString = isString(key) ? key : isStaticExp(key) ? key.content : null;
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
	return isStaticExp(key) && key.content.toLowerCase() === "onclick" ? createSimpleExpression(event, true) : key.type !== 4 ? createCompoundExpression([
		`(`,
		key,
		`) === "onClick" ? "${event}" : (`,
		key,
		`)`
	]) : key;
};
const transformOn$1 = (dir, node, context) => {
	return transformOn(dir, node, context, (baseResult) => {
		const { modifiers } = dir;
		if (!modifiers.length) return baseResult;
		let { key, value: handlerExp } = baseResult.props[0];
		const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(key, modifiers, context, dir.loc);
		if (nonKeyModifiers.includes("right")) key = transformClick(key, `onContextmenu`);
		if (nonKeyModifiers.includes("middle")) key = transformClick(key, `onMouseup`);
		if (nonKeyModifiers.length) handlerExp = createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [handlerExp, JSON.stringify(nonKeyModifiers)]);
		if (keyModifiers.length && (!isStaticExp(key) || isKeyboardEvent(key.content.toLowerCase()))) handlerExp = createCallExpression(context.helper(V_ON_WITH_KEYS), [handlerExp, JSON.stringify(keyModifiers)]);
		if (eventOptionModifiers.length) {
			const modifierPostfix = eventOptionModifiers.map(capitalize).join("");
			key = isStaticExp(key) ? createSimpleExpression(`${key.content}${modifierPostfix}`, true) : createCompoundExpression([
				`(`,
				key,
				`) + "${modifierPostfix}"`
			]);
		}
		return { props: [createObjectProperty(key, handlerExp)] };
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
const transformTransition = (node, context) => {
	if (node.type === 1 && node.tagType === 1) {
		if (context.isBuiltInComponent(node.tag) === TRANSITION) return postTransformTransition(node, context.onError);
	}
};
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
	const children = node.children = node.children.filter((c) => !isCommentOrWhitespace(c));
	const child = children[0];
	return children.length !== 1 || child.type === 11 || child.type === 9 && child.branches.some(defaultHasMultipleChildren);
}

//#endregion
//#region packages/compiler-dom/src/transforms/ignoreSideEffectTags.ts
const ignoreSideEffectTags = (node, context) => {
	if (node.type === 1 && node.tagType === 0 && (node.tag === "script" || node.tag === "style")) {
		process.env.NODE_ENV !== "production" && context.onError(createDOMCompilerError(64, node.loc));
		context.removeNode();
	}
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
//#region packages/compiler-dom/src/transforms/validateHtmlNesting.ts
const validateHtmlNesting = (node, context) => {
	if (node.type === 1 && node.tagType === 0 && context.parent && context.parent.type === 1 && context.parent.tagType === 0 && !isValidHTMLNesting(context.parent.tag, node.tag)) {
		const error = /* @__PURE__ */ new SyntaxError(`<${node.tag}> cannot be child of <${context.parent.tag}>, according to HTML specifications. This can cause hydration errors or potentially disrupt future functionality.`);
		error.loc = node.loc;
		context.onWarn(error);
	}
};

//#endregion
//#region packages/compiler-dom/src/index.ts
const DOMNodeTransforms = [transformStyle, ...!!(process.env.NODE_ENV !== "production") ? [transformTransition, validateHtmlNesting] : []];
const DOMDirectiveTransforms = {
	cloak: noopDirectiveTransform,
	html: transformVHtml,
	text: transformVText,
	model: transformModel$1,
	on: transformOn$1,
	show: transformShow
};
function compile(src, options = {}) {
	return baseCompile(src, extend({}, parserOptions, options, {
		nodeTransforms: [
			ignoreSideEffectTags,
			...DOMNodeTransforms,
			...options.nodeTransforms || []
		],
		directiveTransforms: extend({}, DOMDirectiveTransforms, options.directiveTransforms || {}),
		transformHoist: null
	}));
}
function parse(template, options = {}) {
	return baseParse(template, extend({}, parserOptions, options));
}

//#endregion
export { DOMDirectiveTransforms, DOMErrorCodes, DOMErrorMessages, DOMNodeTransforms, TRANSITION, TRANSITION_GROUP, V_MODEL_CHECKBOX, V_MODEL_DYNAMIC, V_MODEL_RADIO, V_MODEL_SELECT, V_MODEL_TEXT, V_ON_WITH_KEYS, V_ON_WITH_MODIFIERS, V_SHOW, compile, createDOMCompilerError, isKeyboardEvent, isValidHTMLNesting, parse, parserOptions, postTransformTransition, resolveModifiers, transformStyle };