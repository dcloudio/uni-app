/**
  * @dcloudio/compiler-vapor-web v3.6.0-rc.13
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
let _vue_compiler_dom = require("@vue/compiler-dom");
let _vue_compiler_vapor = require("@vue/compiler-vapor");
let _vue_compiler_ssr = require("@vue/compiler-ssr");
let _vue_shared = require("@vue/shared");
let _dcloudio_uni_shared = require("@dcloudio/uni-shared");
let hash_sum = require("hash-sum");
hash_sum = __toESM(hash_sum);
//#region packages/compiler-vapor-web/src/parse.ts
const uniNativeTags = /* @__PURE__ */ new Set([
	"view",
	"text",
	"image",
	"cover-view",
	"cover-image"
]);
function resolveParserOptions(options) {
	const getNamespace = options.getNamespace || _vue_compiler_dom.parserOptions.getNamespace;
	const isNativeTag = options.isNativeTag || _vue_compiler_dom.parserOptions.isNativeTag;
	const isCustomElement = options.isCustomElement;
	return {
		prefixIdentifiers: true,
		...options,
		isNativeTag: (tag) => uniNativeTags.has(tag) || isNativeTag(tag),
		isCustomElement: (tag) => !uniNativeTags.has(tag) && !!(isCustomElement === null || isCustomElement === void 0 ? void 0 : isCustomElement(tag)),
		getNamespace: (tag, parent, rootNamespace) => getNamespace(tag === "view" || tag === "cover-view" ? "div" : tag === "text" ? "span" : tag === "image" || tag === "cover-image" ? "img" : tag, parent, rootNamespace)
	};
}
function parse(source, options = {}) {
	return (0, _vue_compiler_dom.parse)(source, resolveParserOptions(options));
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformView.ts
function transformView(node) {
	if (node.type !== 1 || node.tag !== "view" && node.tag !== "cover-view" || node.ns !== 0) return;
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
			if (operation.type !== 6 || !textElements.has(operation.element)) return;
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
function genImageExpression(expression, context) {
	if (!expression.isStatic && expression.ast === void 0) return [[
		expression.content,
		-3,
		expression.loc
	]];
	return (0, _vue_compiler_vapor.genExpression)(expression, context);
}
function transformImage(node) {
	if (node.type !== 1 || node.tag !== "image" && node.tag !== "cover-image" || node.ns !== 0) return;
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
					isSVG: false,
					prop
				};
				operations.set(operation, key);
				context.registerEffect(prop.values, operation);
			}
		},
		genOperation(operation, context) {
			if (operation.type === 4 && imageElements.has(operation.element)) return (0, _vue_compiler_vapor.genDynamicProps)(operation, context, "setImageDynamicProps");
			if (operation.type === 8 && imageElements.has(operation.element)) return (0, _vue_compiler_vapor.genCall)(context.helper("setImageDynamicEvents"), `n${operation.element}`, (0, _vue_compiler_vapor.genExpression)(operation.event, context));
			if (operation.type !== 3) return;
			const key = operations.get(operation);
			if (!key) return;
			return [_vue_compiler_vapor.NEWLINE, ...(0, _vue_compiler_vapor.genCall)(context.helper(key === "src" ? "setImageSrc" : "setImageMode"), `n${operation.element}`, genImageExpression(operation.prop.values[0], context))];
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
				isSVG: false,
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
//#region packages/compiler-vapor-web/src/transforms/transformRecycleFor.ts
function markRecycleFor(node) {
	const key = (0, _vue_compiler_dom.findProp)(node, "key");
	if (!key) return false;
	node.__recycleFor = true;
	(node.tag === "template" ? node.children[0] : node).props.push({
		type: 7,
		name: "bind",
		arg: (0, _vue_compiler_dom.createSimpleExpression)("itemKey", true),
		exp: toExpression(key),
		modifiers: [],
		loc: node.loc
	});
	return true;
}
function createRecycleForTransform() {
	const types = /* @__PURE__ */ new WeakMap();
	const ids = /* @__PURE__ */ new WeakMap();
	const operations = /* @__PURE__ */ new WeakSet();
	const transform = (node, context) => {
		if (node.type !== 1) return;
		if (!node.__recycleFor) return;
		const type = (0, _vue_compiler_dom.findProp)(node, "type");
		const id = (0, _vue_compiler_dom.findProp)(node, "id");
		return () => {
			const operation = context.dynamic.operation;
			if (operation && operation.type === 16) {
				operations.add(operation);
				if (type) types.set(operation, toExpression(type));
				if (id) ids.set(operation, toExpression(id));
			}
		};
	};
	return {
		transform,
		isRecycleFor: (operation) => operation.type === 16 && operations.has(operation),
		genOperation(operation, context) {
			if (operation.type !== 16 || !operations.has(operation)) return;
			const { value, key, index, render, keyProp } = operation;
			const valueIds = (0, _vue_compiler_vapor.parseValueDestructure)(value, context);
			const keyIds = (0, _vue_compiler_vapor.parseValueDestructure)(key, context);
			const indexIds = (0, _vue_compiler_vapor.parseValueDestructure)(index, context);
			const [depth, exitScope] = context.enterScope();
			const args = [
				`_for_item${depth}`,
				`_for_key${depth}`,
				`_for_index${depth}`
			];
			const plugins = context.options.expressionPlugins;
			const idMap = {
				...(0, _vue_compiler_vapor.buildDestructureIdMap)(valueIds, `${args[0]}.value`, plugins),
				...(0, _vue_compiler_vapor.buildDestructureIdMap)(keyIds, `${args[1]}.value`, plugins),
				...(0, _vue_compiler_vapor.buildDestructureIdMap)(indexIds, `${args[2]}.value`, plugins)
			};
			const source = [
				"() => (",
				...(0, _vue_compiler_vapor.genExpression)(operation.source, context),
				")"
			];
			const callback = (expression) => {
				if (!expression) return false;
				const locals = {};
				for (const map of [
					valueIds,
					keyIds,
					indexIds
				]) map.forEach((_, name) => locals[name] = null);
				return context.withId(() => [
					...(0, _vue_compiler_vapor.genAliasParams)(value, key, index, context),
					" => (",
					...(0, _vue_compiler_vapor.genExpression)(expression, context),
					")"
				], locals);
			};
			const getKey = callback(keyProp);
			const getType = callback(types.get(operation));
			const getId = callback(ids.get(operation));
			const block = context.withId(() => (0, _vue_compiler_vapor.genBlock)(render, context, [args.join(", ")]), idMap);
			exitScope();
			const helper = (name) => context.helper(name);
			const flags = (operation.slotRoot ? 32 : 0) | (operation.wrappedRows ? 64 : 0);
			return [
				_vue_compiler_vapor.NEWLINE,
				`const n${operation.id} = `,
				...(0, _vue_compiler_vapor.genCall)(helper("createRecycleFor"), (0, _vue_compiler_vapor.genCall)(helper("createRecycleContext")), (0, _vue_compiler_vapor.genCall)(helper("preCreateRecycleFor"), source, getKey, getId), block, getKey, getType, flags ? String(flags) : void 0)
			];
		}
	};
}
function toExpression(prop) {
	return prop.type === 6 ? (0, _vue_compiler_dom.createSimpleExpression)(prop.value ? prop.value.content : "", true, prop.loc) : prop.exp;
}
function wrapTemplate(name, children) {
	return {
		type: 1,
		tag: "template",
		tagType: 3,
		ns: 0,
		props: [{
			type: 7,
			name: "slot",
			arg: (0, _vue_compiler_dom.createSimpleExpression)(name, true),
			exp: void 0,
			modifiers: [],
			loc: children[0].loc
		}],
		children,
		loc: children[0].loc,
		codegenNode: void 0
	};
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformComponentId.ts
function createComponentIdTransform(recycle) {
	const positions = /* @__PURE__ */ new WeakMap();
	let forKey;
	return {
		transform(node, context) {
			if (node.type !== 1) return;
			return () => {
				const operation = context.dynamic.operation;
				if (operation && operation.type === 12) positions.set(operation, node.loc.start.offset);
			};
		},
		genOperation(operation, context) {
			if (operation.type === 16) {
				const prev = forKey;
				forKey = recycle.isRecycleFor(operation) ? void 0 : operation.keyProp;
				try {
					return recycle.genOperation(operation, context) || (0, _vue_compiler_vapor.genFor)(operation, context);
				} finally {
					forKey = prev;
				}
			}
			if (operation.type !== 12 || operation.useCreateElement) return;
			const baseId = JSON.stringify((0, hash_sum.default)(`${context.options.filename}:${positions.get(operation)}`));
			const cid = forKey ? [
				baseId,
				" + \"-\" + (",
				...(0, _vue_compiler_vapor.genExpression)(forKey, context),
				")"
			] : [baseId];
			const fragments = (0, _vue_compiler_vapor.genCreateComponent)(operation, context);
			const callStart = fragments.indexOf(`const n${operation.id} = `) + 1;
			return [...fragments.slice(0, callStart), ...(0, _vue_compiler_vapor.genCall)(context.helper("withComponentId"), cid, ["() => ", ...fragments.slice(callStart)], operation.tag === "list-item" || operation.tag === "flow-item" ? "true" : void 0)];
		}
	};
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformListView.ts
const transformListView = (node) => {
	if (node.type !== 1 || node.tag !== "list-view" && node.tag !== "sticky-section") return;
	const container = node;
	if (container.__recycleForProcessed) return;
	container.__recycleForProcessed = true;
	const rowIndex = node.children.findIndex((child) => isListRow(child) && (0, _vue_compiler_dom.findDir)(child, "for") && !(0, _vue_compiler_dom.findDir)(child, "if"));
	if (node.tag === "sticky-section") {
		if (rowIndex >= 0) markRecycleFor(node.children[rowIndex]);
		return;
	}
	const sections = node.children.filter((child) => child.type === 1 && child.tag === "sticky-section");
	let start = rowIndex;
	let end = rowIndex;
	if (sections.length) {
		start = node.children.indexOf(sections[0]);
		end = node.children.indexOf(sections[sections.length - 1]);
	} else if (rowIndex < 0 || !markRecycleFor(node.children[rowIndex])) return;
	const header = [];
	const footer = [];
	const defaultChildren = [];
	const refresher = [];
	const namedSlots = [];
	for (let i = 0; i < node.children.length; i++) {
		const child = node.children[i];
		if (child.type === 1) {
			if (child.tag === "template" && (0, _vue_compiler_dom.findDir)(child, "slot", true)) {
				namedSlots.push(child);
				continue;
			}
			const slot = (0, _vue_compiler_dom.findProp)(child, "slot", false, true);
			if (slot && slot.type === 6 && slot.value && slot.value.content === "refresher") {
				child.props.splice(child.props.indexOf(slot), 1);
				refresher.push(child);
				continue;
			}
		}
		if (i < start) header.push(child);
		else if (i > end) footer.push(child);
		else defaultChildren.push(child);
	}
	node.children = [
		...header.length ? [wrapTemplate("header", header)] : [],
		...defaultChildren,
		...footer.length ? [wrapTemplate("footer", footer)] : [],
		...refresher.length ? [wrapTemplate("refresher", refresher)] : [],
		...namedSlots
	];
};
function isListRow(node) {
	return node.type === 1 && (node.tag === "list-item" || node.tag === "template" && node.children.length === 1 && node.children[0].type === 1 && node.children[0].tag === "list-item" && !(0, _vue_compiler_dom.findDir)(node.children[0], "for"));
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformWaterflow.ts
const transformWaterflow = (node) => {
	if (node.type !== 1 || node.tag !== "waterflow") return;
	const container = node;
	if (container.__recycleForProcessed) return;
	container.__recycleForProcessed = true;
	const row = node.children.find((child) => isFlowRow(child) && (0, _vue_compiler_dom.findDir)(child, "for") && !(0, _vue_compiler_dom.findDir)(child, "if"));
	if (!row || !markRecycleFor(row)) return;
	const defaultChildren = [];
	const refresher = [];
	const loadMore = [];
	const namedSlots = [];
	for (const child of node.children) {
		if (child.type === 1) {
			if (child.tag === "template" && (0, _vue_compiler_dom.findDir)(child, "slot", true)) {
				namedSlots.push(child);
				continue;
			}
			const slot = (0, _vue_compiler_dom.findProp)(child, "slot", false, true);
			if (slot && slot.type === 6 && slot.value) {
				const name = slot.value.content;
				if (name === "refresher" || name === "load-more") {
					child.props.splice(child.props.indexOf(slot), 1);
					(name === "refresher" ? refresher : loadMore).push(child);
					continue;
				}
			}
		}
		defaultChildren.push(child);
	}
	node.children = [
		...defaultChildren,
		...refresher.length ? [wrapTemplate("refresher", refresher)] : [],
		...loadMore.length ? [wrapTemplate("load-more", loadMore)] : [],
		...namedSlots
	];
};
function isFlowRow(node) {
	return node.type === 1 && (node.tag === "flow-item" || node.tag === "template" && node.children.length === 1 && node.children[0].type === 1 && node.children[0].tag === "flow-item" && !(0, _vue_compiler_dom.findDir)(node.children[0], "for"));
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformDataset.ts
function createDatasetTransform() {
	const operations = /* @__PURE__ */ new WeakMap();
	const hoists = /* @__PURE__ */ new Map();
	return {
		transformElementProps(props, node, context) {
			if (props[0] || !(0, _vue_compiler_vapor.isUniBasicElement)(node)) return;
			const data = Object.create(null);
			for (const prop of props[1]) if (prop.key.isStatic && prop.key.content.toLowerCase().startsWith("data-") && prop.modifier !== "." && prop.values[0].isStatic) data[prop.key.content] = prop.values[0].content;
			if (!Object.keys(data).length) return;
			const operation = {
				type: 3,
				element: context.reference(),
				tag: node.tag,
				isSVG: false,
				prop: {
					key: (0, _vue_compiler_dom.createSimpleExpression)("dataset", true),
					values: []
				}
			};
			operations.set(operation, JSON.stringify(data));
			context.registerOperation(operation);
		},
		genOperation(operation, context) {
			if (operation.type !== 3) return;
			const json = operations.get(operation);
			if (!json) return;
			let name = hoists.get(json);
			if (!name) {
				name = context.getUniqueLocalName("_dataset");
				hoists.set(json, name);
				context.hoists.push(`const ${name} = ${json}\n`);
			}
			return [_vue_compiler_vapor.NEWLINE, ...(0, _vue_compiler_vapor.genCall)(context.helper("initUniDataset"), `n${operation.element}`, name)];
		}
	};
}
//#endregion
//#region packages/compiler-vapor-web/src/uniElement.ts
const names = /* @__PURE__ */ new Set([..._dcloudio_uni_shared.BUILT_IN_TAGS, ..._dcloudio_uni_shared.UVUE_WEB_BUILT_IN_TAGS]);
function resolveUniElementRoot(ast, name) {
	if (!ast || !(names.has(`uni-${name}`) || (0, _dcloudio_uni_shared.isDom2AppVueComponentTag)(name))) return;
	const roots = ast.children.filter((node) => node.type !== 3 && !(node.type === 2 && !node.content.trim()));
	if (roots.length !== 1) return;
	const root = roots[0];
	if (root.type !== 1 || ![
		"view",
		"text",
		"image",
		"cover-view",
		"cover-image"
	].includes(root.tag) || root.props.some((prop) => prop.type === 7 && prop.name === "for" || prop.type === 6 && prop.name === `uni-${name}`)) return;
	return root;
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformUniElement.ts
function createUniElementTransform() {
	let root;
	let name;
	let descriptor;
	let elementOperation;
	return {
		transform(node, context) {
			if (node.type === 0) {
				name = context.options.bindingMetadata.__uniElement;
				if (name) root = resolveUniElementRoot(node, name);
			} else if (root && node.type === 1 && node.loc === root.loc && (0, _vue_compiler_vapor.isUniBasicElement)(node)) {
				if (!node.props.some((prop) => prop.type === 6 && prop.name === `uni-${name}`)) node.props.unshift({
					type: 6,
					name: `uni-${name}`,
					nameLoc: node.loc,
					value: void 0,
					loc: node.loc
				});
				const operation = {
					type: 3,
					element: context.reference(),
					tag: node.tag,
					isSVG: false,
					prop: {
						key: (0, _vue_compiler_dom.createSimpleExpression)("uniTagName", true),
						values: []
					}
				};
				elementOperation = operation;
				context.registerOperation(operation);
			}
		},
		genOperation(operation, context) {
			if (operation !== elementOperation) return;
			if (!descriptor) {
				descriptor = context.getUniqueLocalName("_uniElement");
				context.hoists.push(`const ${descriptor} = { value: ${JSON.stringify(name.toUpperCase())} }\n`);
			}
			return [_vue_compiler_vapor.NEWLINE, ...(0, _vue_compiler_vapor.genCall)(context.helper("initUniElement"), `n${operation.element}`, descriptor)];
		}
	};
}
//#endregion
//#region packages/compiler-vapor-web/src/transforms/transformUniAppXWeb.ts
function createUniAppXWebTransform(options = {}) {
	if (options.ssr) {
		const transform = (node, context) => {
			transformView(node);
			transformText(node);
			transformSSRImage(node, context);
			transformStaticStyle(node);
			return transformSSRHover(node, context);
		};
		return { transform };
	}
	const hover = createHoverTransform();
	const image = createImageTransform();
	const text = createTextTransform();
	const recycle = createRecycleForTransform();
	const componentId = createComponentIdTransform(recycle);
	const dataset = createDatasetTransform();
	const element = createUniElementTransform();
	return {
		transform: (node, context) => {
			transformListView(node, context);
			transformWaterflow(node, context);
			const exitRecycle = recycle.transform(node, context);
			const exitComponentId = componentId.transform(node, context);
			transformView(node);
			transformText(node);
			transformImage(node);
			transformStaticStyle(node);
			return [exitRecycle, exitComponentId].flat().filter((exit) => !!exit);
		},
		transformUniElement: element.transform,
		transformElementProps: (props, node, context, getEffectIndex) => {
			dataset.transformElementProps(props, node, context, getEffectIndex);
			hover.transformElementProps(props, node, context, getEffectIndex);
			image.transformElementProps(props, node, context, getEffectIndex);
			text.transformElementProps(props, node, context, getEffectIndex);
		},
		genOperation: (operation, context) => {
			var _hover$genOperation, _componentId$genOpera, _element$genOperation, _dataset$genOperation, _image$genOperation, _text$genOperation;
			const hoverOperation = (_hover$genOperation = hover.genOperation) === null || _hover$genOperation === void 0 ? void 0 : _hover$genOperation.call(hover, operation, context);
			return ((_componentId$genOpera = componentId.genOperation) === null || _componentId$genOpera === void 0 ? void 0 : _componentId$genOpera.call(componentId, operation, context)) || ((_element$genOperation = element.genOperation) === null || _element$genOperation === void 0 ? void 0 : _element$genOperation.call(element, operation, context)) || ((_dataset$genOperation = dataset.genOperation) === null || _dataset$genOperation === void 0 ? void 0 : _dataset$genOperation.call(dataset, operation, context)) || hoverOperation || ((_image$genOperation = image.genOperation) === null || _image$genOperation === void 0 ? void 0 : _image$genOperation.call(image, operation, context)) || ((_text$genOperation = text.genOperation) === null || _text$genOperation === void 0 ? void 0 : _text$genOperation.call(text, operation, context));
		},
		genEventHandler: image.genEventHandler
	};
}
function transformStaticStyle(node) {
	if (node.type !== 1 || node.tagType !== 0 && node.tagType !== 1) return;
	for (const prop of node.props) if (prop.type === 6 && prop.name === "style" && prop.value) prop.value.content = (0, _dcloudio_uni_shared.normalizeRpx)(prop.value.content);
}
//#endregion
//#region packages/compiler-vapor-web/src/compile.ts
function compile(source, options = {}) {
	var _options$bindingMetad, _options$isUniPage, _options$expressionPl;
	const resolvedOptions = {
		...options,
		...resolveParserOptions(options)
	};
	const isolation = (_options$bindingMetad = options.bindingMetadata) === null || _options$bindingMetad === void 0 ? void 0 : _options$bindingMetad.__uniStyleIsolation;
	const isPage = (_options$isUniPage = options.isUniPage) === null || _options$isUniPage === void 0 ? void 0 : _options$isUniPage.call(options, options.filename || "");
	if (isolation !== null && (isPage ? isolation !== "isolated" : isolation === "app" || isolation === "app-shared" || isolation === "app-and-page")) resolvedOptions.extraScopeId = _vue_shared.UNI_APP_SCOPE_ID;
	resolvedOptions.templateFlags = isolation === null ? 512 : !isPage && isolation === "app-and-page" ? 256 : 0;
	if (options.isTS && !((_options$expressionPl = options.expressionPlugins) === null || _options$expressionPl === void 0 ? void 0 : _options$expressionPl.includes("typescript"))) resolvedOptions.expressionPlugins = [...options.expressionPlugins || [], "typescript"];
	const ast = typeof source === "string" ? (0, _vue_compiler_dom.parse)(source, resolvedOptions) : source;
	const [nodeTransforms, directiveTransforms] = (0, _vue_compiler_vapor.getBaseTransformPreset)();
	const web = createUniAppXWebTransform();
	nodeTransforms.splice(nodeTransforms.indexOf(_vue_compiler_vapor.transformChildren), 0, web.transformUniElement);
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
exports.UNI_APP_SCOPE_ID = _vue_shared.UNI_APP_SCOPE_ID;
exports.compile = compile;
exports.compileSSR = compileSSR;
exports.parse = parse;
exports.resolveUniElementRoot = resolveUniElementRoot;
