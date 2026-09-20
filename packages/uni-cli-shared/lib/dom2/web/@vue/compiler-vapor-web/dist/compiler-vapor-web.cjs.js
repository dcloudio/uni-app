/**
  * @dcloudio/compiler-vapor-web v3.6.0-rc.9
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let _vue_compiler_dom = require("@vue/compiler-dom");
let _vue_compiler_vapor = require("@vue/compiler-vapor");
let _vue_compiler_ssr = require("@vue/compiler-ssr");
let _vue_shared = require("@vue/shared");
//#region packages/compiler-vapor-web/src/parse.ts
function resolveParserOptions(options) {
	const getNamespace = options.getNamespace || _vue_compiler_dom.parserOptions.getNamespace;
	const isNativeTag = options.isNativeTag || _vue_compiler_dom.parserOptions.isNativeTag;
	const isPreTag = options.isPreTag || _vue_compiler_dom.parserOptions.isPreTag;
	const isCustomElement = options.isCustomElement;
	return {
		prefixIdentifiers: true,
		...options,
		isNativeTag: (tag) => tag === "view" || tag === "text" || tag === "image" || isNativeTag(tag),
		isCustomElement: (tag) => tag !== "view" && tag !== "text" && tag !== "image" && !!(isCustomElement === null || isCustomElement === void 0 ? void 0 : isCustomElement(tag)),
		isPreTag: (tag) => tag === "text" || isPreTag(tag),
		getNamespace: (tag, parent, rootNamespace) => getNamespace(tag === "view" ? "div" : tag === "text" ? "span" : tag === "image" ? "img" : tag, parent, rootNamespace)
	};
}
function parse(source, options = {}) {
	return (0, _vue_compiler_dom.parse)(source, resolveParserOptions(options));
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformView.ts
function transformView(node) {
	if (node.type !== 1 || node.tag !== "view" || node.ns !== 0) return;
	node.tag = "div";
	node.tagType = 0;
	node.props = node.props.filter((prop) => {
		var _prop$arg;
		if (prop.type === 6) return prop.name !== "flatten";
		return !(prop.name === "bind" && ((_prop$arg = prop.arg) === null || _prop$arg === void 0 ? void 0 : _prop$arg.type) === 4 && prop.arg.isStatic && prop.arg.content === "flatten");
	});
	if (!node.props.some((prop) => prop.type === 6 && prop.name === "uni-view")) node.props.unshift({
		type: 6,
		name: "uni-view",
		nameLoc: node.loc,
		value: void 0,
		loc: node.loc
	});
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformText.ts
const unsupportedProps = /* @__PURE__ */ new Set([
	"space",
	"decode",
	"max-lines"
]);
function transformText(node) {
	if (node.type !== 1 || node.tag !== "text" || node.ns !== 0) return;
	node.tag = "span";
	node.tagType = 0;
	node.__uniText = true;
	for (const child of node.children) if (child.type === 2) child.content = (0, _vue_shared.normalizeUniText)(child.content);
	node.props = node.props.filter((prop) => {
		var _prop$arg;
		if (prop.type === 6) return !unsupportedProps.has(prop.name);
		return !(prop.name === "bind" && ((_prop$arg = prop.arg) === null || _prop$arg === void 0 ? void 0 : _prop$arg.type) === 4 && prop.arg.isStatic && unsupportedProps.has(prop.arg.content));
	});
	if (!node.props.some((prop) => prop.type === 6 && prop.name === "uni-text")) node.props.unshift({
		type: 6,
		name: "uni-text",
		nameLoc: node.loc,
		value: void 0,
		loc: node.loc
	});
	for (const child of node.children) if (child.type === 1 && child.tag === "slot") child.__uniTextSlot = true;
}
const isUniTextElement = (node) => node.type === 1 && node.tag === "span" && node.props.some((prop) => prop.type === 6 && prop.name === "uni-text");
function createTextTransform() {
	const textElements = /* @__PURE__ */ new Set();
	return {
		transformElementProps(props, node, context) {
			if (node.type === 1 && isUniTextElement(node)) textElements.add(context.reference());
		},
		genOperation(operation, context) {
			if (operation.type !== 5 || !textElements.has(operation.element)) return;
			const value = operation.values.flatMap((expression, index) => {
				let result = (0, _vue_compiler_vapor.genExpression)(expression, context);
				if (!expression.isStatic) result = (0, _vue_compiler_vapor.genCall)(context.helper("toDisplayString"), result);
				if (index > 0) result.unshift(" + ");
				return result;
			});
			const normalizedValue = (0, _vue_compiler_vapor.genCall)(context.helper("normalizeUniText"), value);
			return [_vue_compiler_vapor.NEWLINE, ...(0, _vue_compiler_vapor.genCall)(context.helper("setText"), `${operation.generated ? "x" : "n"}${operation.element}`, normalizedValue)];
		}
	};
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformImage.ts
function transformImage(node) {
	if (node.type !== 1 || node.tag !== "image" || node.ns !== 0) return;
	node.tag = "img";
	node.tagType = 0;
	node.children = [];
	if (!node.props.some((prop) => prop.type === 6 && prop.name === "uni-image")) node.props.unshift({
		type: 6,
		name: "uni-image",
		nameLoc: node.loc,
		value: void 0,
		loc: node.loc
	});
	if (!node.props.some((prop) => prop.type === 6 && prop.name === "draggable")) node.props.push({
		type: 6,
		name: "draggable",
		nameLoc: node.loc,
		value: {
			type: 2,
			content: "false",
			loc: node.loc
		},
		loc: node.loc
	});
}
const transformSSRImage = (node) => {
	transformImage(node);
};
function createImageTransform() {
	const operations = /* @__PURE__ */ new WeakMap();
	const imageElements = /* @__PURE__ */ new Set();
	return {
		transformElementProps(props, node, context) {
			var _props$;
			if (node.type !== 1 || node.tag !== "img" || !node.props.some((p) => p.type === 6 && p.name === "uni-image")) return;
			const element = context.reference();
			imageElements.add(element);
			if (props[0]) return;
			const imageProps = (_props$ = props[1]) === null || _props$ === void 0 ? void 0 : _props$.filter((prop) => prop.key.content === "src" || prop.key.content === "mode" && (!prop.values[0].isStatic || prop.values[0].content === "widthFix" || prop.values[0].content === "heightFix"));
			if (!(imageProps === null || imageProps === void 0 ? void 0 : imageProps.length)) return;
			props[1] = props[1].filter((prop) => !imageProps.includes(prop));
			for (const prop of imageProps) {
				const key = prop.key.content;
				const operation = {
					type: 3,
					element,
					tag: "img",
					prop
				};
				operations.set(operation, key);
				context.registerEffect(prop.values, operation);
			}
		},
		genOperation(operation, context) {
			if (operation.type === 4 && imageElements.has(operation.element)) return (0, _vue_compiler_vapor.genDynamicProps)(operation, context, "setImageDynamicProps");
			if (operation.type === 7 && imageElements.has(operation.element)) return (0, _vue_compiler_vapor.genCall)(context.helper("setImageDynamicEvents"), `n${operation.element}`, (0, _vue_compiler_vapor.genExpression)(operation.event, context));
			if (operation.type !== 3) return;
			const key = operations.get(operation);
			if (!key) return;
			return [_vue_compiler_vapor.NEWLINE, ...(0, _vue_compiler_vapor.genCall)(context.helper(key === "src" ? "setImageSrc" : "setImageMode"), `n${operation.element}`, (0, _vue_compiler_vapor.genExpression)(operation.prop.values[0], context))];
		},
		genEventHandler(operation, context, handler) {
			if (!imageElements.has(operation.element) || !operation.key.isStatic) return;
			const event = operation.key.content.toLowerCase();
			if (event !== "load" && event !== "error") return;
			return (0, _vue_compiler_vapor.genCall)(context.helper("withImageEventDetail"), [
				"(",
				...handler,
				")"
			], JSON.stringify(event));
		}
	};
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformHover.ts
const hoverProps = [
	"hoverClass",
	"hoverStopPropagation",
	"hoverStartTime",
	"hoverStayTime"
];
const transformSSRHover = (node) => {
	if (node.type !== 1 || !isHoverElement(node)) return;
	node.props = node.props.filter((prop) => {
		var _prop$arg;
		const name = prop.type === 6 ? prop.name : prop.name === "bind" && ((_prop$arg = prop.arg) === null || _prop$arg === void 0 ? void 0 : _prop$arg.type) === 4 && prop.arg.isStatic ? prop.arg.content : "";
		return !hoverProps.includes((0, _vue_shared.camelize)(name));
	});
};
function createHoverTransform() {
	const operations = /* @__PURE__ */ new WeakMap();
	const hoverElements = /* @__PURE__ */ new Set();
	return {
		transformElementProps(props, node, context, getEffectIndex) {
			if (node.type !== 1 || !isHoverElement(node)) return;
			if (props[0]) {
				hoverElements.add(context.reference());
				return;
			}
			const values = [
				"none",
				"false",
				"50",
				"400"
			].map((value, index) => (0, _vue_compiler_dom.createSimpleExpression)(value, index === 0, node.loc));
			values[1].ast = null;
			for (let i = 2; i < values.length; i++) values[i].ast = {
				type: "NumericLiteral",
				value: Number(values[i].content)
			};
			props[1] = props[1].filter((prop) => {
				if (prop.key.content === "flatten") return false;
				const index = hoverProps.indexOf((0, _vue_shared.camelize)(prop.key.content));
				if (index < 0) return true;
				values[index] = prop.values[0];
				return false;
			});
			if (values[0].isStatic && (!values[0].content || values[0].content === "none")) return;
			const classes = [];
			for (const prop of props[1]) if (prop.key.content === "class") classes.push(...prop.values);
			const operation = {
				type: 3,
				element: context.reference(),
				tag: node.tag,
				prop: {
					key: (0, _vue_compiler_dom.createSimpleExpression)("hover", true),
					values
				}
			};
			operations.set(operation, (0, _vue_compiler_vapor.foldClassValues)(classes) || "");
			context.registerEffect(values, operation, getEffectIndex);
		},
		genOperation(operation, context) {
			if (operation.type === 4 && hoverElements.has(operation.element)) return (0, _vue_compiler_vapor.genDynamicProps)(operation, context, "setViewDynamicProps");
			if (operation.type !== 3 || !operations.has(operation)) return;
			return [_vue_compiler_vapor.NEWLINE, ...(0, _vue_compiler_vapor.genCall)(context.helper("setHover"), `n${operation.element}`, ...operation.prop.values.map((value) => (0, _vue_compiler_vapor.genExpression)(value, context)), JSON.stringify(operations.get(operation)))];
		}
	};
}
function isHoverElement(node) {
	return node.tag === "div" && node.props.some((p) => p.type === 6 && p.name === "uni-view") || node.tag === "span" && isUniTextElement(node);
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformUniAppXWeb.ts
function createUniAppXWebTransform(options = {}) {
	if (options.ssr) {
		const transform = (node, context) => {
			transformView(node);
			transformText(node);
			transformSSRImage(node, context);
			return transformSSRHover(node, context);
		};
		return { transform };
	}
	const hover = createHoverTransform();
	const image = createImageTransform();
	const text = createTextTransform();
	return {
		transform: (node, context) => {
			transformView(node);
			transformText(node);
			transformImage(node);
		},
		transformElementProps: (props, node, context, getEffectIndex) => {
			hover.transformElementProps(props, node, context, getEffectIndex);
			image.transformElementProps(props, node, context, getEffectIndex);
			text.transformElementProps(props, node, context, getEffectIndex);
		},
		genOperation: (operation, context) => {
			var _hover$genOperation, _image$genOperation, _text$genOperation;
			return ((_hover$genOperation = hover.genOperation) === null || _hover$genOperation === void 0 ? void 0 : _hover$genOperation.call(hover, operation, context)) || ((_image$genOperation = image.genOperation) === null || _image$genOperation === void 0 ? void 0 : _image$genOperation.call(image, operation, context)) || ((_text$genOperation = text.genOperation) === null || _text$genOperation === void 0 ? void 0 : _text$genOperation.call(text, operation, context));
		},
		genEventHandler: image.genEventHandler
	};
}
//#endregion
//#region packages/compiler-vapor-web/src/compile.ts
function compile(source, options = {}) {
	var _options$expressionPl;
	const resolvedOptions = {
		...options,
		...resolveParserOptions(options)
	};
	if (options.isTS && !((_options$expressionPl = options.expressionPlugins) === null || _options$expressionPl === void 0 ? void 0 : _options$expressionPl.includes("typescript"))) resolvedOptions.expressionPlugins = [...options.expressionPlugins || [], "typescript"];
	const ast = typeof source === "string" ? (0, _vue_compiler_dom.parse)(source, resolvedOptions) : source;
	const [nodeTransforms, directiveTransforms] = (0, _vue_compiler_vapor.getBaseTransformPreset)();
	const web = createUniAppXWebTransform();
	const ir = (0, _vue_compiler_vapor.transform)(ast, {
		...resolvedOptions,
		transformElementProps: web.transformElementProps,
		nodeTransforms: [
			web.transform,
			...nodeTransforms,
			...[_vue_compiler_vapor.transformTransition],
			...options.nodeTransforms || []
		],
		directiveTransforms: {
			...directiveTransforms,
			...options.directiveTransforms
		}
	});
	return (0, _vue_compiler_vapor.generate)(ir, {
		...resolvedOptions,
		genOperation: web.genOperation,
		genEventHandler: web.genEventHandler
	});
}
function compileSSR(source, options = {}) {
	const ast = typeof source === "string" ? parse(source, options) : source;
	const web = createUniAppXWebTransform({ ssr: true });
	const { ssrPreTagTransforms = [], nodeTransforms = [], ...compilerOptions } = options;
	return (0, _vue_compiler_ssr.compile)(ast, {
		...compilerOptions,
		nodeTransforms: nodeTransforms.filter((transform) => !ssrPreTagTransforms.includes(transform)),
		preNodeTransforms: [web.transform, ...ssrPreTagTransforms]
	});
}
//#endregion
exports.compile = compile;
exports.compileSSR = compileSSR;
exports.parse = parse;
