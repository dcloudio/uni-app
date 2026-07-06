/**
  * @vue/compiler-vapor v3.6.0-beta.17
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let _vue_compiler_dom = require("@vue/compiler-dom");
let _vue_shared = require("@vue/shared");
let source_map_js = require("source-map-js");
let _babel_parser = require("@babel/parser");
let estree_walker = require("estree-walker");
//#region packages/compiler-vapor/src/ir/component.ts
const IRDynamicPropsKind = {
	"EXPRESSION": 0,
	"0": "EXPRESSION",
	"ATTRIBUTE": 1,
	"1": "ATTRIBUTE"
};
const IRSlotType = {
	"STATIC": 0,
	"0": "STATIC",
	"DYNAMIC": 1,
	"1": "DYNAMIC",
	"LOOP": 2,
	"2": "LOOP",
	"CONDITIONAL": 3,
	"3": "CONDITIONAL",
	"EXPRESSION": 4,
	"4": "EXPRESSION"
};
//#endregion
//#region packages/compiler-vapor/src/ir/index.ts
const IRNodeTypes = {
	"ROOT": 0,
	"0": "ROOT",
	"BLOCK": 1,
	"1": "BLOCK",
	"SET_BLOCK_KEY": 2,
	"2": "SET_BLOCK_KEY",
	"SET_PROP": 3,
	"3": "SET_PROP",
	"SET_DYNAMIC_PROPS": 4,
	"4": "SET_DYNAMIC_PROPS",
	"SET_TEXT": 5,
	"5": "SET_TEXT",
	"SET_EVENT": 6,
	"6": "SET_EVENT",
	"SET_DYNAMIC_EVENTS": 7,
	"7": "SET_DYNAMIC_EVENTS",
	"SET_HTML": 8,
	"8": "SET_HTML",
	"SET_TEMPLATE_REF": 9,
	"9": "SET_TEMPLATE_REF",
	"INSERT_NODE": 10,
	"10": "INSERT_NODE",
	"PREPEND_NODE": 11,
	"11": "PREPEND_NODE",
	"CREATE_COMPONENT_NODE": 12,
	"12": "CREATE_COMPONENT_NODE",
	"SLOT_OUTLET_NODE": 13,
	"13": "SLOT_OUTLET_NODE",
	"DIRECTIVE": 14,
	"14": "DIRECTIVE",
	"IF": 15,
	"15": "IF",
	"FOR": 16,
	"16": "FOR",
	"KEY": 17,
	"17": "KEY",
	"GET_TEXT_CHILD": 18,
	"18": "GET_TEXT_CHILD",
	"GET_INSERTION_PARENT": 19,
	"19": "GET_INSERTION_PARENT",
	"SET_CHANGE_PROP": 20,
	"20": "SET_CHANGE_PROP"
};
var TemplateRegistry = class {
	constructor() {
		this.entries = [];
	}
	keys() {
		return this.entries.map(({ content }) => content);
	}
};
const DynamicFlag = {
	"NONE": 0,
	"0": "NONE",
	"REFERENCED": 1,
	"1": "REFERENCED",
	"NON_TEMPLATE": 2,
	"2": "NON_TEMPLATE",
	"INSERT": 4,
	"4": "INSERT"
};
function isBlockOperation(op) {
	const type = op.type;
	return type === 12 || type === 13 || type === 15 || type === 17 || type === 16;
}
//#endregion
//#region packages/compiler-vapor/src/transforms/utils.ts
const newDynamic = () => ({
	flags: 1,
	children: []
});
const newBlock = (node) => ({
	type: 1,
	node,
	dynamic: newDynamic(),
	effect: [],
	operation: [],
	returns: [],
	tempId: 0
});
function wrapTemplate(node, dirs) {
	if (node.tagType === 3) {
		const otherStructuralDirs = [
			"if",
			"else-if",
			"else",
			"for"
		];
		if (!node.props.some((prop) => prop.type === 7 && otherStructuralDirs.includes(prop.name) && !dirs.includes(prop.name))) return node;
		const reserved = [];
		const pass = [];
		node.props.forEach((prop) => {
			if (prop.type === 7 && dirs.includes(prop.name)) reserved.push(prop);
			else pass.push(prop);
		});
		return (0, _vue_shared.extend)({}, node, {
			type: 1,
			tag: "template",
			props: reserved,
			tagType: 3,
			children: [(0, _vue_shared.extend)({}, node, { props: pass })]
		});
	}
	const reserved = [];
	const pass = [];
	node.props.forEach((prop) => {
		if (prop.type === 7 && (dirs.includes(prop.name) || prop.name === "bind" && prop.arg && prop.arg.type === 4 && prop.arg.content === "key" && dirs.includes("key"))) reserved.push(prop);
		else pass.push(prop);
	});
	return (0, _vue_shared.extend)({}, node, {
		type: 1,
		tag: "template",
		props: reserved,
		tagType: 3,
		children: [(0, _vue_shared.extend)({}, node, { props: pass })]
	});
}
const EMPTY_EXPRESSION = (0, _vue_compiler_dom.createSimpleExpression)("", true);
const TEXT_PLACEHOLDER = "__vapor_dom2_text_placeholder__";
const TEXT_NODE_PLACEHOLDER = "__vapor_dom2_text_node_placeholder__";
//#endregion
//#region packages/compiler-vapor/src/utils.ts
const findProp$1 = _vue_compiler_dom.findProp;
/** find directive */
const findDir$4 = _vue_compiler_dom.findDir;
function propToExpression(prop) {
	return prop.type === 6 ? prop.value ? (0, _vue_compiler_dom.createSimpleExpression)(prop.value.content, true, prop.value.loc) : EMPTY_EXPRESSION : prop.exp;
}
function isConstantExpression(exp) {
	return (0, _vue_compiler_dom.isLiteralWhitelisted)(exp.content) || (0, _vue_shared.isGloballyAllowed)(exp.content) || getLiteralExpressionValue(exp) !== null;
}
function isStaticExpression(node, bindings) {
	if (node.ast) return (0, _vue_compiler_dom.isConstantNode)(node.ast, bindings);
	else if (node.ast === null) {
		if (!node.isStatic && (node.content === "true" || node.content === "false" || node.content === "null")) return true;
		return bindings[node.content] === "literal-const";
	}
	return false;
}
function resolveExpression(exp, isComponent) {
	if (!exp.isStatic) {
		const value = getLiteralExpressionValue(exp, isComponent);
		if (value !== null) return (0, _vue_compiler_dom.createSimpleExpression)(value, true, exp.loc);
	}
	return exp;
}
function parseStaticAttrBooleanExpression(exp) {
	try {
		return (0, _vue_shared.includeBooleanAttr)(exp.isStatic ? exp.content : new Function(`return ${exp.content}`)());
	} catch (e) {}
	return null;
}
function getLiteralExpressionValue(exp, excludeNumber) {
	if (exp.ast) {
		if (exp.ast.type === "StringLiteral") return exp.ast.value;
		else if (!excludeNumber && (exp.ast.type === "NumericLiteral" || exp.ast.type === "BigIntLiteral")) return String(exp.ast.value);
		else if (exp.ast.type === "TemplateLiteral") {
			let result = "";
			for (const [index, quasi] of exp.ast.quasis.entries()) {
				result += quasi.value.cooked;
				if (exp.ast.expressions[index]) {
					let expressionValue = getLiteralExpressionValue({ ast: exp.ast.expressions[index] });
					if (expressionValue == null) return null;
					else result += expressionValue;
				}
			}
			return result;
		}
	}
	return exp.isStatic ? exp.content : null;
}
function isInTransition(context) {
	const parentNode = context.parent && context.parent.node;
	return !!(parentNode && isTransitionNode(parentNode));
}
function isTransitionNode(node) {
	return node.type === 1 && isTransitionTag(node.tag);
}
function isTransitionTag(tag) {
	tag = tag.toLowerCase();
	return tag === "transition" || tag === "vaportransition";
}
function isTransitionGroupTag(tag) {
	tag = tag.toLowerCase().replace(/-/g, "");
	return tag === "transitiongroup" || tag === "vaportransitiongroup";
}
function isKeepAliveTag(tag) {
	tag = tag.toLowerCase();
	return tag === "keepalive" || tag === "vaporkeepalive";
}
function isTeleportTag(tag) {
	tag = tag.toLowerCase();
	return tag === "teleport" || tag === "vaporteleport";
}
function isBuiltInComponent(tag) {
	if (isTeleportTag(tag)) return "VaporTeleport";
	else if (tag === "Suspense" || tag === "suspense") return "Suspense";
	else if (isKeepAliveTag(tag)) return "VaporKeepAlive";
	else if (isTransitionTag(tag)) return "VaporTransition";
	else if (isTransitionGroupTag(tag)) return "VaporTransitionGroup";
}
function getBlockShape(block) {
	if (block.returns.length === 0) return 0;
	return block.returns.length === 1 ? 1 : 2;
}
//#endregion
//#region packages/compiler-vapor/src/transform.ts
const generatedVarRE = /^[nxr](\d+)$/;
const childContextInfoCache = /* @__PURE__ */ new WeakMap();
var TransformContext = class TransformContext {
	constructor(ir, node, options = {}) {
		this.ir = ir;
		this.node = node;
		this.selfName = null;
		this.parent = null;
		this.effectiveParent = null;
		this.index = 0;
		this.block = this.ir.block;
		this.template = "";
		this.templateRoot = false;
		this.templateIndexMap = /* @__PURE__ */ new Map();
		this.childrenTemplate = [];
		this.dynamic = this.ir.block.dynamic;
		this.imports = [];
		this.inVOnce = false;
		this.inVFor = 0;
		this.comment = [];
		this.component = this.ir.component;
		this.directive = this.ir.directive;
		this.slots = [];
		this.effectIndex = this.block.effect.length;
		this.operationIndex = this.block.operation.length;
		this.isLastEffectiveChild = true;
		this.isOnRightmostPath = true;
		this.isSingleRoot = false;
		this.templateCloseTags = void 0;
		this.templateCloseBlocks = false;
		this.globalId = 0;
		this.nextIdMap = null;
		this.ifIndex = 0;
		this.increaseId = () => {
			const id = getNextId(this.nextIdMap, this.globalId);
			this.globalId = getNextId(this.nextIdMap, id + 1);
			return id;
		};
		this.options = (0, _vue_shared.extend)({}, defaultOptions, options);
		this.root = this;
		if (options.filename) this.selfName = (0, _vue_compiler_dom.getSelfName)(options.filename);
		this.initNextIdMap();
	}
	enterBlock(ir, isVFor = false) {
		const { block, template, templateRoot, templateIndexMap, dynamic, childrenTemplate, slots, effectIndex, operationIndex } = this;
		this.block = ir;
		this.dynamic = ir.dynamic;
		this.template = "";
		this.templateRoot = false;
		this.templateIndexMap = templateIndexMap;
		this.childrenTemplate = [];
		this.slots = [];
		this.effectIndex = ir.effect.length;
		this.operationIndex = ir.operation.length;
		isVFor && this.inVFor++;
		return () => {
			this.registerTemplate();
			this.block = block;
			this.template = template;
			this.templateRoot = templateRoot;
			this.templateIndexMap = templateIndexMap;
			this.dynamic = dynamic;
			this.childrenTemplate = childrenTemplate;
			this.slots = slots;
			this.effectIndex = effectIndex;
			this.operationIndex = operationIndex;
			isVFor && this.inVFor--;
		};
	}
	initNextIdMap() {
		const binding = this.root.options.bindingMetadata;
		if (!binding) return;
		const keys = Object.keys(binding);
		if (keys.length === 0) return;
		const numbers = /* @__PURE__ */ new Set();
		for (const name of keys) {
			const m = generatedVarRE.exec(name);
			if (m) numbers.add(Number(m[1]));
		}
		if (numbers.size === 0) return;
		this.globalId = getNextId(this.nextIdMap = buildNextIdMap(numbers), 0);
	}
	reference() {
		if (this.dynamic.id !== void 0) return this.dynamic.id;
		this.dynamic.flags |= 1;
		return this.dynamic.id = this.increaseId();
	}
	nextIfIndex() {
		return this.ifIndex++;
	}
	getTemplateNamespace() {
		return this.node.type === 1 ? this.node.ns : 0;
	}
	canUseStaticTemplate() {
		if (!this.template) return false;
		if (this.inVFor) return false;
		if (this.dynamic.hasDynamicChild) return false;
		if (this.block.effect.length !== this.effectIndex) return false;
		if (this.block.operation.length !== this.operationIndex) return false;
		if (this.node.type === 2 || this.node.type === 3) return true;
		return this.node.type === 1 && this.node.tagType === 0 && !(this.options.isCustomElement(this.node.tag) || this.node.tag === "template");
	}
	pushTemplate(content, { root = false, static: isStatic = false } = {}) {
		const templateKey = JSON.stringify([
			this.getTemplateNamespace(),
			root,
			isStatic,
			content
		]);
		const existingIndex = this.templateIndexMap.get(templateKey);
		if (existingIndex !== void 0) return existingIndex;
		const ns = this.getTemplateNamespace();
		const newIndex = this.ir.template.entries.length;
		this.ir.template.entries.push({
			content,
			ns,
			root,
			static: isStatic
		});
		this.templateIndexMap.set(templateKey, newIndex);
		return newIndex;
	}
	registerTemplate() {
		if (!this.template) return -1;
		const id = this.pushTemplate(this.template, {
			root: this.templateRoot,
			static: this.canUseStaticTemplate()
		});
		return this.dynamic.template = id;
	}
	registerEffect(expressions, operation, getIndex, getOperationIndex) {
		const operations = [operation].flat();
		expressions = expressions.filter((exp) => !isConstantExpression(exp));
		if (this.inVOnce || expressions.length === 0 || expressions.every((e) => isStaticExpression(e, this.root.options.bindingMetadata))) {
			if (getOperationIndex) {
				const index = getOperationIndex();
				this.block.operation.splice(index, 0, ...operations);
				this.shiftOperationBoundaries(index, operations.length);
				return;
			}
			return this.registerOperation(...operations);
		}
		const index = getIndex ? getIndex() : this.block.effect.length;
		this.block.effect.splice(index, 0, {
			expressions,
			operations
		});
		if (getIndex) this.shiftEffectBoundaries(index);
	}
	registerOperation(...node) {
		this.block.operation.push(...node);
	}
	effectBoundary() {
		return {
			operationIndex: this.operationIndex,
			effectIndex: this.effectIndex
		};
	}
	create(node, index) {
		let effectiveParent = this;
		while (effectiveParent && effectiveParent.node.type === 1 && effectiveParent.node.tagType === 3) effectiveParent = effectiveParent.parent;
		const childInfo = this.getChildContextInfo();
		const isLastEffectiveChild = childInfo.isLastEffectiveChild[index];
		const isOnRightmostPath = this.isOnRightmostPath && isLastEffectiveChild;
		const isSingleRoot = this.isSingleRootChild(childInfo);
		return Object.assign(Object.create(TransformContext.prototype), this, {
			node,
			parent: this,
			index,
			template: "",
			templateRoot: false,
			childrenTemplate: [],
			templateIndexMap: this.templateIndexMap,
			dynamic: newDynamic(),
			effectIndex: this.block.effect.length,
			operationIndex: this.block.operation.length,
			effectiveParent,
			isLastEffectiveChild,
			isOnRightmostPath,
			isSingleRoot,
			templateCloseTags: this.templateCloseTags,
			templateCloseBlocks: this.templateCloseBlocks
		});
	}
	shiftEffectBoundaries(index, dynamic = this.dynamic) {
		const operation = dynamic.operation;
		if (operation && isBlockOperation(operation) && operation.effectIndex !== void 0 && operation.effectIndex >= index) operation.effectIndex++;
		for (const child of dynamic.children) this.shiftEffectBoundaries(index, child);
	}
	shiftOperationBoundaries(index, offset, dynamic = this.dynamic) {
		const operation = dynamic.operation;
		if (operation && isBlockOperation(operation) && operation.operationIndex !== void 0 && operation.operationIndex >= index) operation.operationIndex += offset;
		for (const child of dynamic.children) this.shiftOperationBoundaries(index, offset, child);
	}
	getChildContextInfo() {
		const node = this.node;
		if (node.type !== 0 && node.type !== 1) return {
			node,
			hasSingleRootChild: true,
			isLastEffectiveChild: []
		};
		const cached = childContextInfoCache.get(this);
		if (cached && cached.node === node) return cached;
		const { children } = node;
		const isLastEffectiveChild = new Array(children.length);
		let hasFollowingEffectiveChild = false;
		for (let i = children.length - 1; i >= 0; i--) {
			isLastEffectiveChild[i] = !hasFollowingEffectiveChild;
			if (!isComponentChild(children[i])) hasFollowingEffectiveChild = true;
		}
		const childInfo = {
			node,
			hasSingleRootChild: hasSingleRootChild(children),
			isLastEffectiveChild
		};
		childContextInfoCache.set(this, childInfo);
		return childInfo;
	}
	isSingleRootChild(childInfo) {
		if (this.inVFor || !childInfo.hasSingleRootChild) return false;
		if (this.node.type === 0) return true;
		return this.node.type === 1 && this.node.tagType === 3 && !!this.parent && this.isSingleRoot;
	}
};
function hasSingleRootChild(children) {
	let nonCommentChildren = 0;
	let hasEncounteredIf = false;
	let isSingleIfBlock = true;
	for (const child of children) {
		if ((0, _vue_compiler_dom.isCommentOrWhitespace)(child)) continue;
		nonCommentChildren++;
		if (isIfChild(child)) {
			if (hasEncounteredIf) isSingleIfBlock = false;
			hasEncounteredIf = true;
		} else if (!hasEncounteredIf || !isElseChild(child)) isSingleIfBlock = false;
	}
	return nonCommentChildren === 1 || isSingleIfBlock;
}
function isComponentChild(child) {
	return child.type === 1 && child.tagType === 1;
}
function isIfChild(child) {
	return child.type === 9 || child.type === 1 && !!(0, _vue_compiler_dom.findDir)(child, "if");
}
function isElseChild(child) {
	return child.type === 1 && !!(0, _vue_compiler_dom.findDir)(child, /^else(-if)?$/, true);
}
const defaultOptions = {
	filename: "",
	prefixIdentifiers: true,
	hoistStatic: false,
	hmr: false,
	cacheHandlers: false,
	nodeTransforms: [],
	directiveTransforms: {},
	transformHoist: null,
	isBuiltInComponent: _vue_shared.NOOP,
	isCustomElement: _vue_shared.NOOP,
	isUserComponent(element) {
		return element.tagType === 1;
	},
	expressionPlugins: [],
	scopeId: null,
	slotted: true,
	ssr: false,
	inSSR: false,
	ssrCssVars: ``,
	bindingMetadata: _vue_shared.EMPTY_OBJ,
	inline: false,
	isTS: false,
	eventDelegation: true,
	onError: _vue_compiler_dom.defaultOnError,
	onWarn: _vue_compiler_dom.defaultOnWarn
};
function transform(node, options = {}) {
	const ir = {
		type: 0,
		node,
		source: node.source,
		template: new TemplateRegistry(),
		component: /* @__PURE__ */ new Set(),
		directive: /* @__PURE__ */ new Set(),
		block: newBlock(node),
		hasTemplateRef: false
	};
	const context = new TransformContext(ir, node, options);
	transformNode(context);
	ir.node.imports = context.imports;
	return ir;
}
function transformNode(context) {
	let { node } = context;
	const { nodeTransforms } = context.options;
	const exitFns = [];
	for (const nodeTransform of nodeTransforms) {
		const onExit = nodeTransform(node, context);
		if (onExit) if ((0, _vue_shared.isArray)(onExit)) exitFns.push(...onExit);
		else exitFns.push(onExit);
		if (!context.node) return;
		else node = context.node;
	}
	context.node = node;
	let i = exitFns.length;
	while (i--) exitFns[i]();
	if (context.node.type === 0) context.registerTemplate();
}
function createStructuralDirectiveTransform(name, fn) {
	const matches = (n) => (0, _vue_shared.isString)(name) ? n === name : name.includes(n);
	return (node, context) => {
		if (node.type === 1) {
			const { props } = node;
			if (node.tagType === 3 && props.some(_vue_compiler_dom.isVSlot)) return;
			const exitFns = [];
			for (const prop of props) if (prop.type === 7 && matches(prop.name)) {
				const onExit = fn(node, prop, context);
				if (onExit) exitFns.push(onExit);
			}
			return exitFns;
		}
	};
}
/**
* Build a "next-id" map from an occupied number set.
* For each consecutive range [start..end], map every v in the range to end + 1.
* Example: input [0, 1, 2, 4] => { 0: 3, 1: 3, 2: 3, 4: 5 }.
*/
function buildNextIdMap(nums) {
	const map = /* @__PURE__ */ new Map();
	const arr = Array.from(new Set(nums)).sort((a, b) => a - b);
	if (arr.length === 0) return map;
	for (let i = 0; i < arr.length; i++) {
		let start = arr[i];
		let end = start;
		while (i + 1 < arr.length && arr[i + 1] === end + 1) {
			i++;
			end = arr[i];
		}
		for (let v = start; v <= end; v++) map.set(v, end + 1);
	}
	return map;
}
/**
* Return the available id for n using a map built by buildNextIdMap:
* - If n is not occupied, return n.
* - If n is occupied, return the mapped value
*/
function getNextId(map, n) {
	if (map && map.has(n)) return map.get(n);
	return n;
}
//#endregion
//#region packages/compiler-vapor/src/generators/utils.ts
const IMPORT_EXP_START = "__IMPORT_EXP_START__";
const IMPORT_EXP_END = "__IMPORT_EXP_END__";
const IMPORT_EXPR_RE = new RegExp(`${IMPORT_EXP_START}(.*?)${IMPORT_EXP_END}`, "g");
const NEWLINE = Symbol(`newline`);
/** increase offset but don't push actual code */
const LF = Symbol(`line feed`);
const INDENT_START = Symbol(`indent start`);
const INDENT_END = Symbol(`indent end`);
function buildCodeFragment(...frag) {
	return [
		frag,
		frag.push.bind(frag),
		frag.unshift.bind(frag)
	];
}
function genMulti([left, right, seg, placeholder], ...frags) {
	if (placeholder) {
		while (frags.length > 0 && !frags[frags.length - 1]) frags.pop();
		frags = frags.map((frag) => frag || placeholder);
	} else frags = frags.filter(Boolean);
	const frag = [];
	push(left);
	for (let [i, fn] of frags.entries()) {
		push(fn);
		if (i < frags.length - 1) push(seg);
	}
	push(right);
	return frag;
	function push(fn) {
		if (!(0, _vue_shared.isArray)(fn)) fn = [fn];
		frag.push(...fn);
	}
}
const DELIMITERS_ARRAY = [
	"[",
	"]",
	", "
];
const DELIMITERS_ARRAY_NEWLINE = [
	[
		"[",
		INDENT_START,
		NEWLINE
	],
	[
		INDENT_END,
		NEWLINE,
		"]"
	],
	[",", NEWLINE]
];
const DELIMITERS_OBJECT = [
	"{ ",
	" }",
	", "
];
const DELIMITERS_OBJECT_NEWLINE = [
	[
		"{",
		INDENT_START,
		NEWLINE
	],
	[
		INDENT_END,
		NEWLINE,
		"}"
	],
	[",", NEWLINE]
];
function genCall(name, ...frags) {
	const hasPlaceholder = (0, _vue_shared.isArray)(name);
	return [hasPlaceholder ? name[0] : name, ...genMulti([
		"(",
		")",
		", ",
		hasPlaceholder ? name[1] : "null"
	], ...frags)];
}
function getParserOptions(plugins) {
	return { plugins: plugins ? plugins.some((plugin) => plugin === "typescript") ? plugins : [...plugins, "typescript"] : ["typescript"] };
}
function codeFragmentToString(code, context) {
	const { options: { sourceMap } } = context;
	const filename = context.options.relativeFilename || context.options.filename;
	let map;
	if (sourceMap) {
		map = new source_map_js.SourceMapGenerator();
		map.setSourceContent(filename, context.ir.source);
		map._sources.add(filename);
	}
	let codegen = "";
	const pos = {
		line: 1,
		column: 1,
		offset: 0
	};
	let indentLevel = 0;
	for (let frag of code) {
		if (!frag) continue;
		if (frag === NEWLINE) frag = [`\n${`  `.repeat(indentLevel)}`, 0];
		else if (frag === INDENT_START) {
			indentLevel++;
			continue;
		} else if (frag === INDENT_END) {
			indentLevel--;
			continue;
		} else if (frag === LF) {
			pos.line++;
			pos.column = 0;
			pos.offset++;
			continue;
		}
		if ((0, _vue_shared.isString)(frag)) frag = [frag];
		let [code, newlineIndex = -2, loc, name] = frag;
		codegen += code;
		if (map) {
			if (loc) addMapping(loc.start, name);
			if (newlineIndex === -3) (0, _vue_compiler_dom.advancePositionWithMutation)(pos, code);
			else {
				pos.offset += code.length;
				if (newlineIndex === -2) pos.column += code.length;
				else {
					if (newlineIndex === -1) newlineIndex = code.length - 1;
					pos.line++;
					pos.column = code.length - newlineIndex;
				}
			}
			if (loc && loc !== _vue_compiler_dom.locStub) addMapping(loc.end);
		}
	}
	return [codegen, map];
	function addMapping(loc, name = null) {
		const { _names, _mappings } = map;
		if (name !== null && !_names.has(name)) _names.add(name);
		_mappings.add({
			originalLine: loc.line,
			originalColumn: loc.column - 1,
			generatedLine: pos.line,
			generatedColumn: pos.column - 1,
			source: filename,
			name
		});
	}
}
//#endregion
//#region packages/compiler-vapor/src/generators/dom.ts
function genInsertNode({ parent, elements, anchor }, { helper }) {
	let element = elements.map((el) => `n${el}`).join(", ");
	if (elements.length > 1) element = `[${element}]`;
	return [NEWLINE, ...genCall(helper("insert"), element, `n${parent}`, anchor === void 0 ? void 0 : `n${anchor}`)];
}
function genPrependNode(oper, { helper }) {
	return [NEWLINE, ...genCall(helper("prepend"), `n${oper.parent}`, ...oper.elements.map((el) => `n${el}`))];
}
//#endregion
//#region packages/compiler-vapor/src/generators/expression.ts
function genExpression(node, context, assignment) {
	node = context.getExpressionReplacement(node);
	const { content, ast, isStatic, loc } = node;
	const { options } = context;
	const { inline } = options;
	if (isStatic) return [[
		JSON.stringify(content),
		-2,
		loc
	]];
	if (!node.content.trim() || ast === false || isConstantExpression(node)) return [[
		content,
		-2,
		loc
	], assignment && ` = ${assignment}`];
	if (ast === null) return genIdentifier(content, context, loc, assignment);
	const ids = [];
	const parentStackMap = /* @__PURE__ */ new Map();
	const parentStack = [];
	(0, _vue_compiler_dom.walkIdentifiers)(ast, (id) => {
		ids.push(id);
		parentStackMap.set(id, parentStack.slice());
	}, false, parentStack);
	let hasMemberExpression = false;
	if (ids.length) {
		const [frag, push] = buildCodeFragment();
		let lastEnd = 0;
		ids.sort((a, b) => a.start - b.start).forEach((id) => {
			const idStart = id.start - 1;
			const idEnd = id.end - 1;
			const source = content.slice(idStart, idEnd);
			const parentStack = parentStackMap.get(id);
			const parent = parentStack[parentStack.length - 1];
			let start = idStart;
			let end = idEnd;
			if (inline && options.bindingMetadata && options.bindingMetadata[source] === "setup-let" && parent && parent.type === "UpdateExpression" && parent.argument === id) {
				start = parent.start - 1;
				end = parent.end - 1;
			}
			if (start < lastEnd) return;
			const leadingText = content.slice(lastEnd, start);
			if (leadingText.length) push([leadingText, -3]);
			hasMemberExpression || (hasMemberExpression = parent && (parent.type === "MemberExpression" || parent.type === "OptionalMemberExpression"));
			push(...genIdentifier(source, context, {
				start: (0, _vue_compiler_dom.advancePositionWithClone)(node.loc.start, source, start),
				end: (0, _vue_compiler_dom.advancePositionWithClone)(node.loc.start, source, end),
				source
			}, hasMemberExpression ? void 0 : assignment, id, parent, parentStack, node));
			lastEnd = end;
		});
		if (lastEnd < content.length) push([content.slice(lastEnd), -3]);
		if (assignment && hasMemberExpression) push(` = ${assignment}`);
		return frag;
	} else return [[
		content,
		-3,
		loc
	]];
}
function genIdentifier(raw, context, loc, assignment, id, parent, parentStack, sourceNode) {
	const { options, helper, identifiers } = context;
	const { inline, bindingMetadata } = options;
	let name = raw;
	const idMap = identifiers[raw];
	if (idMap && idMap.length) {
		const replacement = idMap[0];
		if ((0, _vue_shared.isString)(replacement)) if (parent && parent.type === "ObjectProperty" && parent.shorthand) return [[
			`${name}: ${replacement}`,
			-2,
			loc
		]];
		else return [[
			replacement,
			-2,
			loc
		]];
		else return genExpression(replacement, context, assignment);
	}
	let prefix;
	const type = bindingMetadata && bindingMetadata[raw];
	const isDestructureAssignment = parent && (0, _vue_compiler_dom.isInDestructureAssignment)(parent, parentStack || []);
	const isAssignmentLVal = parent && parent.type === "AssignmentExpression" && parent.left === id;
	const isUpdateArg = parent && parent.type === "UpdateExpression" && parent.argument === id;
	if ((0, _vue_compiler_dom.isStaticProperty)(parent) && parent.shorthand && !(inline && type === "setup-let" && isDestructureAssignment)) prefix = `${raw}: `;
	if (inline) switch (type) {
		case "setup-let":
			if (isAssignmentLVal) {
				const { right, operator } = parent;
				const source = sourceNode;
				const sourceContent = source.content;
				const rightStart = right.start - 1;
				const rightEnd = right.end - 1;
				const rightContent = sourceContent.slice(rightStart, rightEnd);
				const rightExp = (0, _vue_compiler_dom.createSimpleExpression)(rightContent, false, {
					start: (0, _vue_compiler_dom.advancePositionWithClone)(source.loc.start, sourceContent, rightStart),
					end: (0, _vue_compiler_dom.advancePositionWithClone)(source.loc.start, sourceContent, rightEnd),
					source: rightContent
				});
				rightExp.ast = parseExp(context, rightContent);
				return [
					prefix,
					`${helper("isRef")}(${raw}) ? ${raw}.value ${operator} `,
					...genExpression(rightExp, context),
					` : `,
					[
						raw,
						-2,
						loc,
						name
					]
				];
			} else if (isUpdateArg) {
				const { prefix: isPrefix, operator } = parent;
				const updatePrefix = isPrefix ? operator : ``;
				const updatePostfix = isPrefix ? `` : operator;
				raw = `${helper("isRef")}(${raw}) ? ${updatePrefix}${raw}.value${updatePostfix} : ${updatePrefix}${raw}${updatePostfix}`;
			} else if (!isDestructureAssignment) name = raw = assignment ? `${helper("isRef")}(${raw}) ? (${raw}.value = ${assignment}) : (${raw} = ${assignment})` : unref();
			break;
		case "setup-ref":
			name = raw = withAssignment(`${raw}.value`);
			break;
		case "setup-maybe-ref":
			raw = isAssignmentLVal || isUpdateArg || isDestructureAssignment ? name = `${raw}.value` : assignment ? `${helper("isRef")}(${raw}) ? (${raw}.value = ${assignment}) : null` : unref();
			break;
		case "props":
			raw = (0, _vue_shared.genPropsAccessExp)(raw);
			break;
		case "props-aliased":
			raw = (0, _vue_shared.genPropsAccessExp)(bindingMetadata.__propsAliases[raw]);
			break;
		default: raw = withAssignment(raw);
	}
	else {
		if (canPrefix(raw)) if (type === "props-aliased") raw = `$props['${bindingMetadata.__propsAliases[raw]}']`;
		else raw = `${type === "props" ? "$props" : "_ctx"}.${raw}`;
		raw = withAssignment(raw);
	}
	return [prefix, [
		raw,
		-2,
		loc,
		name
	]];
	function withAssignment(s) {
		return assignment ? `${s} = ${assignment}` : s;
	}
	function unref() {
		return `${helper("unref")}(${raw})`;
	}
}
function canPrefix(name) {
	if ((0, _vue_shared.isGloballyAllowed)(name)) return false;
	if (name === "require" || name === "$props" || name === "$emit" || name === "$attrs" || name === "$slots") return false;
	return true;
}
function processExpressions(context, expressions, shouldDeclare) {
	const expressionReplacements = /* @__PURE__ */ new Map();
	const { seenVariable, variableToExpMap, expressionRecords, seenIdentifier, updatedVariable } = analyzeExpressions(expressions);
	const reservedNames = new Set(seenIdentifier);
	const varDeclarations = processRepeatedVariables(context, seenVariable, variableToExpMap, expressionRecords, seenIdentifier, updatedVariable, reservedNames, expressionReplacements);
	const expDeclarations = processRepeatedExpressions(context, expressions, varDeclarations, updatedVariable, expressionRecords, reservedNames, expressionReplacements);
	return {
		...genDeclarations([...varDeclarations, ...expDeclarations], context, shouldDeclare),
		expressionReplacements
	};
}
function analyzeExpressions(expressions) {
	const seenVariable = Object.create(null);
	const variableToExpMap = /* @__PURE__ */ new Map();
	const expressionRecords = /* @__PURE__ */ new Map();
	const seenIdentifier = /* @__PURE__ */ new Set();
	const updatedVariable = /* @__PURE__ */ new Set();
	const getRecord = (exp) => {
		let record = expressionRecords.get(exp);
		if (!record) expressionRecords.set(exp, record = { variables: [] });
		return record;
	};
	const registerVariable = (name, exp, isIdentifier, loc, parentStack = []) => {
		if (isIdentifier) seenIdentifier.add(name);
		seenVariable[name] = (seenVariable[name] || 0) + 1;
		variableToExpMap.set(name, (variableToExpMap.get(name) || /* @__PURE__ */ new Set()).add(exp));
		getRecord(exp).variables.push({
			name,
			loc
		});
		if (parentStack.some((p) => p.type === "UpdateExpression" || p.type === "AssignmentExpression")) updatedVariable.add(name);
	};
	for (const exp of expressions) {
		if (!exp.ast) {
			exp.ast === null && registerVariable(exp.content, exp, true);
			continue;
		}
		const seenParents = /* @__PURE__ */ new Set();
		(0, _vue_compiler_dom.walkIdentifiers)(exp.ast, (currentNode, parent, parentStack) => {
			if (parent && isMemberExpression$3(parent) && !seenParents.has(parent)) {
				seenParents.add(parent);
				let hasGlobalIdentifier = false;
				const memberExp = extractMemberExpression(parent, (id) => {
					registerVariable(id.name, exp, true, {
						start: id.start,
						end: id.end
					});
					if ((0, _vue_shared.isGloballyAllowed)(id.name)) hasGlobalIdentifier = true;
				});
				const parentOfMemberExp = parentStack[parentStack.length - 2];
				if (parentOfMemberExp && isCallExpression(parentOfMemberExp)) return;
				if (hasGlobalIdentifier) return;
				registerVariable(memberExp, exp, false, {
					start: parent.start,
					end: parent.end
				}, parentStack);
			} else if (!parentStack.some(isMemberExpression$3)) registerVariable(currentNode.name, exp, true, {
				start: currentNode.start,
				end: currentNode.end
			}, parentStack);
		});
	}
	return {
		seenVariable,
		seenIdentifier,
		variableToExpMap,
		expressionRecords,
		updatedVariable
	};
}
function getProcessedExpression(exp, expressionReplacements) {
	return expressionReplacements.get(exp) || exp;
}
function setExpressionReplacement(expressionReplacements, exp, content, ast) {
	expressionReplacements.set(exp, (0, _vue_shared.extend)({ ast }, (0, _vue_compiler_dom.createSimpleExpression)(content, exp.isStatic, exp.loc, exp.constType)));
}
function processRepeatedVariables(context, seenVariable, variableToExpMap, expressionRecords, seenIdentifier, updatedVariable, reservedNames, expressionReplacements) {
	const declarations = [];
	const declaredNames = /* @__PURE__ */ new Set();
	const replacementPlan = /* @__PURE__ */ new Map();
	for (const [name, exps] of variableToExpMap) {
		if (updatedVariable.has(name)) continue;
		if ((0, _vue_shared.isGloballyAllowed)(name)) continue;
		if (seenVariable[name] > 1 && exps.size > 0) {
			const isIdentifier = seenIdentifier.has(name);
			const varName = isIdentifier ? name : getUniqueDeclarationName(genVarName(name), reservedNames);
			exps.forEach((node) => {
				if (node.ast && varName !== name) {
					for (const variable of getExpressionVariables(expressionRecords, node)) if (variable.name === name && variable.loc) queueContentReplacement(replacementPlan, node, {
						start: variable.loc.start - 1,
						end: variable.loc.end - 1,
						content: varName
					});
				}
			});
			if (!declaredNames.has(varName) && (!isIdentifier || shouldDeclareVariable(name, expressionRecords, exps))) {
				declaredNames.add(varName);
				declarations.push({
					name: varName,
					isIdentifier,
					value: (0, _vue_shared.extend)({ ast: isIdentifier ? null : parseExp(context, name) }, (0, _vue_compiler_dom.createSimpleExpression)(name)),
					rawName: name,
					exps,
					seenCount: seenVariable[name]
				});
			}
		}
	}
	applyReplacementPlan(context, expressionReplacements, replacementPlan);
	return declarations;
}
function shouldDeclareVariable(name, expressionRecords, exps) {
	const variableUsages = [];
	let allSingleVariable = true;
	let hasRepeatedName = false;
	let hasDifferentLength = false;
	outer: for (const exp of exps) {
		const variables = getExpressionVariables(expressionRecords, exp);
		if (allSingleVariable && variables.length !== 1) allSingleVariable = false;
		if (!hasDifferentLength && variableUsages.length > 0 && variables.length !== variableUsages[0].length) hasDifferentLength = true;
		let nameCount = 0;
		for (const variable of variables) if (variable.name === name && ++nameCount > 1) {
			hasRepeatedName = true;
			break outer;
		}
		variableUsages.push(variables);
	}
	if (allSingleVariable) return true;
	if (hasRepeatedName) return true;
	const first = variableUsages[0];
	if (hasDifferentLength) {
		for (const variables of variableUsages) {
			if (variables.length === first.length) continue;
			const longer = variables.length > first.length ? variables : first;
			const shorter = variables.length > first.length ? first : variables;
			const shorterNames = /* @__PURE__ */ new Set();
			for (const variable of shorter) shorterNames.add(variable.name);
			let isSubset = true;
			for (const variable of longer) if (!shorterNames.has(variable.name)) {
				isSubset = false;
				break;
			}
			if (isSubset) return false;
		}
		return true;
	}
	for (const variables of variableUsages) for (let i = 0; i < variables.length; i++) if (variables[i].name !== first[i].name) return true;
	return false;
}
function processRepeatedExpressions(context, expressions, varDeclarations, updatedVariable, expressionRecords, reservedNames, expressionReplacements) {
	const declarations = [];
	const seenExp = /* @__PURE__ */ new Map();
	for (const exp of expressions) {
		var _expressionRecords$ge;
		const vars = (_expressionRecords$ge = expressionRecords.get(exp)) === null || _expressionRecords$ge === void 0 ? void 0 : _expressionRecords$ge.variables;
		if (!vars) continue;
		const processed = getProcessedExpression(exp, expressionReplacements);
		if (canCacheExpression(processed, vars, updatedVariable)) {
			const seen = seenExp.get(processed.content);
			if (seen) seen.count++;
			else seenExp.set(processed.content, {
				count: 1,
				first: exp
			});
		}
	}
	const repeatedExpressions = [...seenExp].sort(([contentA], [contentB]) => contentB.length - contentA.length);
	for (const [content, { count, first }] of repeatedExpressions) if (count > 1) {
		const removedDeclarations = [];
		for (let i = varDeclarations.length - 1; i >= 0; i--) {
			const item = varDeclarations[i];
			if (!item.exps || !item.seenCount) continue;
			if ([...item.exps].every((node) => getProcessedExpression(node, expressionReplacements).content === content && item.seenCount === count)) {
				removedDeclarations.push({
					name: item.name,
					rawName: item.rawName
				});
				reservedNames.delete(item.name);
				varDeclarations.splice(i, 1);
			}
		}
		const value = (0, _vue_shared.extend)({}, getProcessedExpression(first, expressionReplacements));
		const restorePlan = [];
		for (const { name, rawName } of removedDeclarations) restorePlan.push(...findIdentifierReplacements(value, name, rawName));
		if (restorePlan.length) {
			value.content = applyContentReplacements(value.content, restorePlan);
			if (value.ast) value.ast = parseExp(context, value.content);
		}
		const varName = getUniqueDeclarationName(genVarName(content), reservedNames);
		declarations.push({
			name: varName,
			value
		});
		for (const exp of expressions) {
			const processed = getProcessedExpression(exp, expressionReplacements);
			if (processed.content === content) setExpressionReplacement(expressionReplacements, exp, varName, null);
			else if (processed.content.includes(content)) {
				const replacements = findContentReplacements(processed, content, varName);
				if (replacements.length) {
					const replacedContent = applyContentReplacements(processed.content, replacements);
					setExpressionReplacement(expressionReplacements, exp, replacedContent, parseExp(context, replacedContent));
				}
			}
		}
	}
	return declarations;
}
function canCacheExpression(processed, vars, updatedVariable) {
	if (!processed.ast || processed.ast.type === "Identifier") return false;
	for (const { name } of vars) if (updatedVariable.has(name) || (0, _vue_shared.isGloballyAllowed)(name)) return false;
	return true;
}
function getExpressionVariables(expressionRecords, exp) {
	var _expressionRecords$ge2;
	return ((_expressionRecords$ge2 = expressionRecords.get(exp)) === null || _expressionRecords$ge2 === void 0 ? void 0 : _expressionRecords$ge2.variables) || [];
}
function queueContentReplacement(replacementPlan, exp, replacement) {
	const replacements = replacementPlan.get(exp);
	if (replacements) replacements.push(replacement);
	else replacementPlan.set(exp, [replacement]);
}
function applyReplacementPlan(context, expressionReplacements, replacementPlan) {
	for (const [exp, replacements] of replacementPlan) {
		if (!replacements.length) continue;
		const content = applyContentReplacements(getProcessedExpression(exp, expressionReplacements).content, replacements);
		setExpressionReplacement(expressionReplacements, exp, content, parseExp(context, content));
	}
}
function findContentReplacements(exp, content, replacement) {
	const identifiers = getIdentifierRanges(exp);
	if (!identifiers.length) return [];
	const replacements = [];
	let searchStart = 0;
	let start = exp.content.indexOf(content, searchStart);
	while (start !== -1) {
		const end = start + content.length;
		let canReplace = false;
		for (const identifier of identifiers) {
			if (start >= identifier.end || end <= identifier.start) continue;
			if (start > identifier.start || end < identifier.end) {
				canReplace = false;
				break;
			}
			canReplace = true;
		}
		if (canReplace) {
			replacements.push({
				start,
				end,
				content: replacement
			});
			searchStart = end;
		} else searchStart = start + 1;
		start = exp.content.indexOf(content, searchStart);
	}
	return replacements;
}
function findIdentifierReplacements(exp, name, replacement) {
	const replacements = [];
	for (const { start, end } of getIdentifierRanges(exp)) if (exp.content.slice(start, end) === name) replacements.push({
		start,
		end,
		content: replacement
	});
	return replacements;
}
function getIdentifierRanges(exp) {
	if (!exp.ast || typeof exp.ast !== "object") return [];
	const identifiers = [];
	(0, _vue_compiler_dom.walkIdentifiers)(exp.ast, (id) => {
		identifiers.push({
			start: id.start - 1,
			end: id.end - 1
		});
	}, false);
	return identifiers;
}
function applyContentReplacements(content, replacements) {
	replacements.sort((a, b) => b.start - a.start).forEach(({ start, end, content: replacement }) => {
		content = content.slice(0, start) + replacement + content.slice(end);
	});
	return content;
}
function genDeclarations(declarations, context, shouldDeclare) {
	const [frag, push] = buildCodeFragment();
	const ids = Object.create(null);
	const varNames = /* @__PURE__ */ new Set();
	declarations.forEach(({ name, isIdentifier, value }) => {
		if (isIdentifier) {
			const varName = ids[name] = `_${name}`;
			varNames.add(varName);
			if (shouldDeclare) push(`const `);
			push(`${varName} = `, ...genExpression(value, context), NEWLINE);
		}
	});
	declarations.forEach(({ name, isIdentifier, value }) => {
		if (!isIdentifier) {
			const varName = `_${name}`;
			varNames.add(varName);
			if (shouldDeclare) push(`const `);
			push(`${varName} = `, ...context.withId(() => genExpression(value, context), ids), NEWLINE);
			ids[name] = varName;
		}
	});
	return {
		ids,
		frag,
		varNames: [...varNames]
	};
}
function parseExp(context, content, loc) {
	try {
		return (0, _babel_parser.parseExpression)(`(${content})`, getParserOptions(context.options.expressionPlugins));
	} catch (e) {
		if (loc) {
			const error = new SyntaxError(e.message);
			error.loc = loc;
			context.options.onError(error);
			throw error;
		}
		throw e;
	}
}
function genVarName(exp) {
	return `${exp.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_").replace(/_+$/, "")}`;
}
function getUniqueDeclarationName(baseName, reservedNames) {
	const normalizedBase = baseName || "exp";
	let name = normalizedBase;
	let i = 1;
	while (reservedNames.has(name)) name = `${normalizedBase}_${i++}`;
	reservedNames.add(name);
	return name;
}
function extractMemberExpression(exp, onIdentifier) {
	if (!exp) return "";
	switch (exp.type) {
		case "Identifier":
			onIdentifier(exp);
			return exp.name;
		case "StringLiteral": return exp.extra ? exp.extra.raw : exp.value;
		case "NumericLiteral": return exp.value.toString();
		case "BinaryExpression": return `${extractMemberExpression(exp.left, onIdentifier)} ${exp.operator} ${extractMemberExpression(exp.right, onIdentifier)}`;
		case "CallExpression": return `${extractMemberExpression(exp.callee, onIdentifier)}(${exp.arguments.map((arg) => extractMemberExpression(arg, onIdentifier)).join(", ")})`;
		case "OptionalCallExpression": return `${extractMemberExpression(exp.callee, onIdentifier)}?.(${exp.arguments.map((arg) => extractMemberExpression(arg, onIdentifier)).join(", ")})`;
		case "MemberExpression":
		case "OptionalMemberExpression": return `${extractMemberExpression(exp.object, onIdentifier)}${exp.computed ? `[${extractMemberExpression(exp.property, onIdentifier)}]` : `.${extractMemberExpression(exp.property, _vue_shared.NOOP)}`}`;
		case "TSNonNullExpression": return `${extractMemberExpression(exp.expression, onIdentifier)}`;
		default: return "";
	}
}
const isCallExpression = (node) => {
	return node.type === "CallExpression" || node.type === "OptionalCallExpression";
};
const isMemberExpression$3 = (node) => {
	return node.type === "MemberExpression" || node.type === "OptionalMemberExpression" || node.type === "TSNonNullExpression";
};
//#endregion
//#region packages/compiler-vapor/src/generators/event.ts
function genSetEvent(oper, context) {
	const { helper } = context;
	const { element, key, keyOverride, value, modifiers, delegate, effect } = oper;
	let handler;
	if (delegate) {
		context.delegates.add(key.content);
		if (!context.block.operation.some(isSameDelegateEvent)) return [
			NEWLINE,
			`n${element}.$evt${key.content} = `,
			...genDirectHandler()
		];
	}
	const name = genName();
	const eventOptions = genEventOptions();
	return [NEWLINE, ...genCall(helper(effect ? "onBinding" : delegate ? "delegate" : "on"), `n${element}`, name, genHandler(), eventOptions)];
	function genHandler() {
		return handler || (handler = genEventHandler(context, [value], modifiers));
	}
	function genInvoker() {
		return [
			`${helper("createInvoker")}(`,
			...genHandler(),
			`)`
		];
	}
	function genDirectHandler() {
		return modifiers.keys.length || modifiers.nonKeys.length ? genEventHandler(context, [value], modifiers, { modifierHelper: "vapor" }) : genInvoker();
	}
	function genName() {
		const expr = genExpression(key, context);
		if (keyOverride) {
			const find = JSON.stringify(keyOverride[0]);
			const replacement = JSON.stringify(keyOverride[1]);
			const wrapped = [
				"(",
				...expr,
				")"
			];
			return [
				...wrapped,
				` === ${find} ? ${replacement} : `,
				...wrapped
			];
		} else return genExpression(key, context);
	}
	function genEventOptions() {
		let { options } = modifiers;
		if (!options.length) return;
		return genMulti(DELIMITERS_OBJECT_NEWLINE, ...options.map((option) => [`${option}: true`]));
	}
	function isSameDelegateEvent(op) {
		if (op.type === 6 && op !== oper && op.delegate && op.element === oper.element && op.key.content === key.content) return true;
	}
}
function genSetDynamicEvents(oper, context) {
	const { helper } = context;
	return [NEWLINE, ...genCall(helper("setDynamicEvents"), `n${oper.element}`, genExpression(oper.event, context))];
}
function genEventHandler(context, values, modifiers = {
	nonKeys: [],
	keys: []
}, options = {}) {
	const { asComponentProp = false, extraWrap = false, modifierHelper = "runtime" } = options;
	const useVaporModifierHelper = modifierHelper === "vapor";
	let handlerExp = [];
	if (values) {
		values.forEach((value, index) => {
			let exp = [];
			if (value && value.content.trim()) {
				if ((0, _vue_compiler_dom.isMemberExpression)(value, context.options)) {
					exp = genExpression(value, context);
					if (!isConstantBinding(value, context) && !asComponentProp) {
						const isTSNode = value.ast && _vue_compiler_dom.TS_NODE_TYPES.includes(value.ast.type);
						exp = [
							`e => `,
							isTSNode ? "(" : "",
							...exp,
							isTSNode ? ")" : "",
							`(e)`
						];
					}
				} else if ((0, _vue_compiler_dom.isFnExpression)(value, context.options)) exp = genExpression(value, context);
				else {
					const referencesEvent = value.content.includes("$event");
					const hasMultipleStatements = value.content.includes(`;`);
					const expr = referencesEvent ? context.withId(() => genExpression(value, context), { $event: null }) : genExpression(value, context);
					exp = [
						referencesEvent ? "$event => " : "() => ",
						hasMultipleStatements ? "{" : "(",
						...expr,
						hasMultipleStatements ? "}" : ")"
					];
				}
				handlerExp = handlerExp.concat([index !== 0 ? ", " : "", ...exp]);
			}
		});
		if (values.length > 1) handlerExp = [
			"[",
			...handlerExp,
			"]"
		];
	}
	if (handlerExp.length === 0) handlerExp = ["() => {}"];
	const { keys, nonKeys } = modifiers;
	if (nonKeys.length) handlerExp = genWithModifiers(context, handlerExp, nonKeys, useVaporModifierHelper && !keys.length);
	if (keys.length) handlerExp = genWithKeys(context, handlerExp, keys, useVaporModifierHelper);
	if (extraWrap) handlerExp.unshift(`() => `);
	return handlerExp;
}
function genWithModifiers(context, handler, nonKeys, useVaporHelper = false) {
	return genCall(context.helper(useVaporHelper ? "withVaporModifiers" : "withModifiers"), handler, JSON.stringify(nonKeys));
}
function genWithKeys(context, handler, keys, useVaporHelper = false) {
	return genCall(context.helper(useVaporHelper ? "withVaporKeys" : "withKeys"), handler, JSON.stringify(keys));
}
function isConstantBinding(value, context) {
	if (value.ast === null) {
		if (context.options.bindingMetadata[value.content] === "setup-const") return true;
	}
}
//#endregion
//#region packages/compiler-vapor/src/generators/for.ts
function genFor(oper, context) {
	const { helper } = context;
	const { source, value, key, index, render, keyProp, once, id, component, onlyChild, slotRoot } = oper;
	const rawValue = value && value.content;
	const rawKey = key && key.content;
	const rawIndex = index && index.content;
	const sourceExpr = [
		"() => (",
		...genExpression(source, context),
		")"
	];
	const idToPathMap = parseValueDestructure(value, context);
	const [depth, exitScope] = context.enterScope();
	const itemVar = `_for_item${depth}`;
	const idMap = buildDestructureIdMap(idToPathMap, `${itemVar}.value`, context.options.expressionPlugins);
	idMap[itemVar] = null;
	const args = [itemVar];
	if (rawKey) {
		const keyVar = `_for_key${depth}`;
		args.push(`, ${keyVar}`);
		idMap[rawKey] = `${keyVar}.value`;
		idMap[keyVar] = null;
	}
	if (rawIndex) {
		const indexVar = `_for_index${depth}`;
		args.push(`, ${indexVar}`);
		idMap[rawIndex] = `${indexVar}.value`;
		idMap[indexVar] = null;
	}
	const { selectorPatterns, keyOnlyBindingPatterns, skippedEffectIndexes } = matchPatterns(render, keyProp, idMap, context);
	const selectorDeclarations = [];
	const selectorName = (i) => selectorPatterns.length > 1 ? `_selector${id}_${i}` : `_selector${id}`;
	for (let i = 0; i < selectorPatterns.length; i++) {
		const { selector } = selectorPatterns[i];
		selectorDeclarations.push(`const ${selectorName(i)} = `, ...genCall(helper("createSelector"), [`() => `, ...genExpression(selector, context)]), NEWLINE);
	}
	const blockFn = context.withId(() => {
		const frag = [];
		frag.push("(", ...args, ") => {", INDENT_START);
		if (selectorPatterns.length || keyOnlyBindingPatterns.length) frag.push(...genBlockContent(render, context, false, () => {
			const patternFrag = [];
			for (let i = 0; i < selectorPatterns.length; i++) {
				const { effect } = selectorPatterns[i];
				patternFrag.push(NEWLINE, `${selectorName(i)}(`, ...genExpression(keyProp, context), `, () => {`, INDENT_START);
				for (const oper of effect.operations) patternFrag.push(...genOperation(oper, context));
				patternFrag.push(INDENT_END, NEWLINE, `})`);
			}
			for (const { effect } of keyOnlyBindingPatterns) for (const oper of effect.operations) patternFrag.push(...genOperation(oper, context));
			return patternFrag;
		}, skippedEffectIndexes));
		else frag.push(...genBlockContent(render, context));
		frag.push(INDENT_END, NEWLINE, "}");
		return frag;
	}, idMap);
	exitScope();
	const flags = genForFlags(onlyChild, component, isFragmentBlock(render), !component && isSingleNodeBlock(render), once, slotRoot);
	const onResetCalls = [];
	for (let i = 0; i < selectorPatterns.length; i++) onResetCalls.push(NEWLINE, `n${id}.onReset(${selectorName(i)}.reset)`);
	return [
		NEWLINE,
		...selectorDeclarations,
		`const n${id} = `,
		...genCall([helper("createFor"), "undefined"], sourceExpr, blockFn, genCallback(keyProp), flags),
		...onResetCalls
	];
	function genCallback(expr) {
		if (!expr) return false;
		const res = context.withId(() => genExpression(expr, context), genSimpleIdMap());
		return [
			...genMulti([
				"(",
				")",
				", "
			], rawValue ? rawValue : rawKey || rawIndex ? "_" : void 0, rawKey ? rawKey : rawIndex ? "__" : void 0, rawIndex),
			" => (",
			...res,
			")"
		];
	}
	function genSimpleIdMap() {
		const idMap = {};
		if (rawKey) idMap[rawKey] = null;
		if (rawIndex) idMap[rawIndex] = null;
		idToPathMap.forEach((_, id) => idMap[id] = null);
		return idMap;
	}
}
function genForFlags(onlyChild, component, isFragment, isSingleNode, once, slotRoot) {
	let flags = 0;
	const names = [];
	if (onlyChild) {
		flags |= 1;
		names.push("FAST_REMOVE");
	}
	if (component) {
		flags |= 2;
		names.push("IS_COMPONENT");
	}
	if (isFragment) {
		flags |= 16;
		names.push("IS_FRAGMENT");
	}
	if (isSingleNode) {
		flags |= 8;
		names.push("IS_SINGLE_NODE");
	}
	if (once) {
		flags |= 4;
		names.push("ONCE");
	}
	if (slotRoot) {
		flags |= 32;
		names.push("SLOT_ROOT");
	}
	if (!flags) return;
	return `${flags} /* ${names.join(", ")} */`;
}
function isSingleNodeBlock(block) {
	const child = getSingleReturnedChild(block);
	return !!child && child.template != null;
}
function isFragmentBlock(block) {
	const child = getSingleReturnedChild(block);
	const operation = child && child.operation;
	if (!operation) return false;
	return operation.type === 13 || operation.type === 16 || operation.type === 17 || operation.type === 15 && !operation.once || operation.type === 12 && !!operation.dynamic && !operation.dynamic.isStatic;
}
function getSingleReturnedChild(block) {
	if (block.returns.length !== 1) return;
	const id = block.returns[0];
	for (const child of block.dynamic.children) if (child.id === id) return child;
}
function parseValueDestructure(value, context) {
	const map = /* @__PURE__ */ new Map();
	if (value) {
		const rawValue = value.content;
		if (value.ast) {
			const isDom2 = !!context.options.platform;
			(0, _vue_compiler_dom.walkIdentifiers)(value.ast, (id, _, parentStack, ___, isLocal) => {
				if (isLocal) {
					let path = "";
					let isDynamic = false;
					let helper;
					let helperArgs;
					for (let i = 0; i < parentStack.length; i++) {
						const parent = parentStack[i];
						const child = parentStack[i + 1] || id;
						if (parent.type === "ObjectProperty" && parent.value === child) if (parent.key.type === "StringLiteral") path += `[${JSON.stringify(parent.key.value)}]`;
						else if (parent.computed) {
							isDynamic = true;
							path += `[${rawValue.slice(parent.key.start - 1, parent.key.end - 1)}]`;
						} else path += `.${parent.key.name}`;
						else if (parent.type === "ArrayPattern") {
							const index = parent.elements.indexOf(child);
							if (child.type === "RestElement") path += `.slice(${index})`;
							else path += `[${index}]`;
						} else if (parent.type === "ObjectPattern" && child.type === "RestElement") {
							helper = isDom2 ? context.helper("getSharedDataRestElement") : context.helper("getRestElement");
							helperArgs = "[" + parent.properties.filter((p) => p.type === "ObjectProperty").map((p) => {
								if (p.key.type === "StringLiteral") return JSON.stringify(p.key.value);
								else if (p.computed) {
									isDynamic = true;
									return rawValue.slice(p.key.start - 1, p.key.end - 1);
								} else return JSON.stringify(p.key.name);
							}).join(", ") + "]";
						}
						if (child.type === "AssignmentPattern" && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
							isDynamic = true;
							helper = isDom2 ? context.helper("getSharedDataDefaultValue") : context.helper("getDefaultValue");
							const rawDefault = rawValue.slice(child.right.start - 1, child.right.end - 1);
							helperArgs = isDom2 ? rawDefault : `() => (${rawDefault})`;
						}
					}
					map.set(id.name, {
						path,
						dynamic: isDynamic,
						helper,
						helperArgs
					});
				}
			}, true);
		} else if (rawValue) map.set(rawValue, null);
	}
	return map;
}
function buildDestructureIdMap(idToPathMap, baseAccessor, plugins) {
	const idMap = {};
	idToPathMap.forEach((pathInfo, id) => {
		let path = baseAccessor;
		if (pathInfo) {
			path = `${baseAccessor}${pathInfo.path}`;
			if (pathInfo.helper) {
				idMap[pathInfo.helper] = null;
				path = pathInfo.helperArgs ? `${pathInfo.helper}(${path}, ${pathInfo.helperArgs})` : `${pathInfo.helper}(${path})`;
			}
			if (pathInfo.dynamic) {
				const node = idMap[id] = (0, _vue_compiler_dom.createSimpleExpression)(path);
				node.ast = (0, _babel_parser.parseExpression)(`(${path})`, getParserOptions(plugins));
			} else idMap[id] = path;
		} else idMap[id] = path;
	});
	return idMap;
}
function matchPatterns(render, keyProp, idMap, context) {
	const selectorPatterns = [];
	const keyOnlyBindingPatterns = [];
	let skippedEffectIndexes;
	if (keyProp === void 0) return {
		keyOnlyBindingPatterns,
		selectorPatterns,
		skippedEffectIndexes
	};
	for (let index = 0; index < render.effect.length; index++) {
		const effect = render.effect[index];
		const selector = matchSelectorPattern(effect, keyProp.content, idMap, context);
		if (selector) {
			selectorPatterns.push(selector);
			skipEffect(index);
			continue;
		}
		const keyOnly = matchKeyOnlyBindingPattern(effect, keyProp.content);
		if (keyOnly) {
			keyOnlyBindingPatterns.push(keyOnly);
			skipEffect(index);
		}
	}
	return {
		keyOnlyBindingPatterns,
		selectorPatterns,
		skippedEffectIndexes
	};
	function skipEffect(index) {
		if (!skippedEffectIndexes) skippedEffectIndexes = /* @__PURE__ */ new Set();
		skippedEffectIndexes.add(index);
	}
}
function matchKeyOnlyBindingPattern(effect, key) {
	if (effect.expressions.length === 1) {
		const { ast, content } = effect.expressions[0];
		if (typeof ast === "object" && ast !== null) {
			if (isKeyOnlyBinding(ast, key, content)) return { effect };
		}
	}
}
function matchSelectorPattern(effect, key, idMap, context) {
	if (effect.expressions.length === 1) {
		const { ast, content } = effect.expressions[0];
		if (typeof ast === "object" && ast) {
			const matcheds = [];
			(0, estree_walker.walk)(ast, { enter(node) {
				if (typeof node === "object" && node && node.type === "BinaryExpression" && node.operator === "===" && node.left.type !== "PrivateName") {
					const { left, right } = node;
					for (const [a, b] of [[left, right], [right, left]]) {
						const aIsKey = isKeyOnlyBinding(a, key, content);
						const bIsKey = isKeyOnlyBinding(b, key, content);
						const bVars = analyzeVariableScopes(b, idMap);
						if (aIsKey && !bIsKey && !bVars.length) matcheds.push([a, b]);
					}
				}
			} });
			if (matcheds.length === 1) {
				const [key, selector] = matcheds[0];
				const content = effect.expressions[0].content;
				let hasExtraId = false;
				(0, _vue_compiler_dom.walkIdentifiers)(ast, (id) => {
					if (id.start !== key.start && id.start !== selector.start) hasExtraId = true;
				}, false);
				if (!hasExtraId) {
					const name = content.slice(selector.start - 1, selector.end - 1);
					const selectorExpression = (0, _vue_compiler_dom.createSimpleExpression)(name, false, selector.loc);
					selectorExpression.ast = (0, _babel_parser.parseExpression)(`(${name})`, getParserOptions(context.options.expressionPlugins));
					return {
						effect,
						selector: selectorExpression
					};
				}
			}
		}
	}
}
function analyzeVariableScopes(ast, idMap) {
	let locals = [];
	const ids = [];
	(0, _vue_compiler_dom.walkIdentifiers)(ast, (id) => {
		ids.push(id);
	}, false);
	for (const id of ids) {
		if ((0, _vue_shared.isGloballyAllowed)(id.name)) continue;
		if (idMap[id.name]) locals.push(id.name);
	}
	return locals;
}
function isKeyOnlyBinding(expr, key, source) {
	let only = true;
	(0, estree_walker.walk)(expr, { enter(node) {
		if (source.slice(node.start - 1, node.end - 1) === key) {
			this.skip();
			return;
		}
		if (node.type === "Identifier") only = false;
	} });
	return only;
}
//#endregion
//#region packages/compiler-vapor/src/generators/html.ts
function genSetHtml(oper, context) {
	const { helper } = context;
	const { value, element, isComponent } = oper;
	return [NEWLINE, ...genCall(isComponent ? helper("setBlockHtml") : helper("setHtml"), `n${element}`, genExpression(value, context))];
}
//#endregion
//#region packages/compiler-vapor/src/generators/if.ts
function genIf(oper, context, isNested = false) {
	const { helper } = context;
	const { condition, positive, negative, once, slotRoot, index, blockShape } = oper;
	const [frag, push] = buildCodeFragment();
	const flags = genIfFlags(blockShape, once, slotRoot, negative ? index : void 0);
	const conditionExpr = [
		"() => (",
		...genExpression(condition, context),
		")"
	];
	let positiveArg = genBlock(positive, context);
	let negativeArg = false;
	if (negative) if (negative.type === 1) negativeArg = genBlock(negative, context);
	else negativeArg = ["() => ", ...genIf(negative, context, true)];
	if (!isNested) push(NEWLINE, `const n${oper.id} = `);
	push(...genCall(helper("createIf"), conditionExpr, positiveArg, negativeArg, flags));
	return frag;
}
function genIfFlags(blockShape, once, slotRoot, index) {
	let flags = blockShape;
	if (slotRoot) flags |= 128;
	if (once) flags |= 16;
	else if (index !== void 0) flags |= index + 1 << 8;
	if (flags === 1) return false;
	return `${flags} /* ${genIfFlagNames(once, slotRoot, index, blockShape)} */`;
}
function genIfFlagNames(once, slotRoot, index, blockShape) {
	const names = [`TRUE_${genBlockShapeName(blockShape)}`];
	const falseShape = blockShape >> 2;
	const hasFalseBranch = (falseShape & 3) !== 0;
	if (hasFalseBranch) names.push(`FALSE_${genBlockShapeName(falseShape)}`);
	if (blockShape & 32) names.push("TRUE_NO_SCOPE");
	if (hasFalseBranch && blockShape & 64) names.push("FALSE_NO_SCOPE");
	if (once) names.push("ONCE");
	if (slotRoot) names.push("SLOT_ROOT");
	if (!once && index !== void 0) names.push(`KEYED_INDEX_${index}`);
	return names.join(", ");
}
function genBlockShapeName(flags) {
	switch (flags & 3) {
		case 0: return "EMPTY";
		case 1: return "SINGLE_ROOT";
		case 2: return "MULTI_ROOT";
	}
	return "UNKNOWN";
}
//#endregion
//#region packages/compiler-vapor/src/generators/prop.ts
const helpers = {
	setText: { name: "setText" },
	setHtml: { name: "setHtml" },
	setClass: { name: "setClass" },
	setClassName: { name: "setClassName" },
	setStyle: { name: "setStyle" },
	setValue: { name: "setValue" },
	setAttr: {
		name: "setAttr",
		needKey: true
	},
	setProp: {
		name: "setProp",
		needKey: true
	},
	setDOMProp: {
		name: "setDOMProp",
		needKey: true
	}
};
function genSetProp(oper, context) {
	const { helper } = context;
	const { prop: { key, values, modifier }, tag } = oper;
	const resolvedHelper = getRuntimeHelper(tag, key.content, modifier);
	if (key.content === "class" && !resolvedHelper.isSVG && resolvedHelper.name === "setClass") {
		const className = genSetClassName(oper, context);
		if (className) return className;
	}
	const propValue = genPropValue(values, context);
	return [NEWLINE, ...genCall([helper(resolvedHelper.name), null], `n${oper.element}`, resolvedHelper.needKey ? genExpression(key, context) : false, propValue, resolvedHelper.isSVG && "true")];
}
const MAX_CLASS_NAME_ENTRIES = 31;
function genSetClassName(oper, context) {
	const info = resolveClassName(oper.prop.values, context);
	if (!info) return;
	const { helper } = context;
	const flags = genClassFlags(info.entries, context);
	const classFragments = info.entries.map((entry) => JSON.stringify(!info.prefix && info.entries.length === 1 ? entry.className : ` ${entry.className}`));
	const fragments = classFragments.length === 1 ? classFragments[0] : genMulti(DELIMITERS_ARRAY, ...classFragments);
	return [NEWLINE, ...genCall([helper("setClassName"), "\"\""], `n${oper.element}`, flags, fragments, info.prefix && JSON.stringify(info.prefix), info.suffix && JSON.stringify(info.suffix))];
}
function resolveClassName(values, context) {
	let prefix = "";
	let suffix = "";
	const entries = [];
	let sawDynamic = false;
	let sawSuffix = false;
	for (const rawValue of values) {
		const value = context.getExpressionReplacement(rawValue);
		const staticValue = getLiteralExpressionValue(value, true);
		if (staticValue != null) {
			const normalized = (0, _vue_shared.normalizeClass)(staticValue);
			if (normalized) if (sawSuffix) suffix = appendClass$1(suffix, normalized);
			else if (sawDynamic) {
				sawSuffix = true;
				suffix = appendClass$1(suffix, normalized);
			} else prefix = appendClass$1(prefix, normalized);
			continue;
		}
		const ast = value.ast;
		if (!ast || sawSuffix) return;
		sawDynamic = true;
		if (ast.type === "ObjectExpression") {
			if (!resolveObjectClassName(value, ast, entries, context)) return;
		} else if (ast.type === "ConditionalExpression") {
			if (!resolveConditionalClassName(value, ast, entries, context)) return;
		} else return;
	}
	return entries.length && entries.length <= MAX_CLASS_NAME_ENTRIES ? {
		prefix,
		suffix,
		entries
	} : void 0;
}
function resolveObjectClassName(source, ast, entries, context) {
	for (const prop of ast.properties) {
		if (prop.type !== "ObjectProperty" || prop.computed) return false;
		const rawClassName = getObjectPropertyName$1(prop);
		if (rawClassName == null) return false;
		const className = (0, _vue_shared.normalizeClass)(rawClassName);
		if (!className) continue;
		const value = getBooleanValue(prop.value);
		entries.push({
			className,
			value,
			condition: value == null ? createSubExpression(source, prop.value, context) : void 0
		});
	}
	return true;
}
function resolveConditionalClassName(source, ast, entries, context) {
	const consequent = getStringClassValue(ast.consequent);
	const alternate = getStringClassValue(ast.alternate);
	if (consequent && alternate === "") {
		entries.push({
			className: consequent,
			condition: createSubExpression(source, ast.test, context)
		});
		return true;
	} else if (alternate && consequent === "") {
		entries.push({
			className: alternate,
			condition: createSubExpression(source, ast.test, context),
			negate: true
		});
		return true;
	}
	return false;
}
function genClassFlags(entries, context) {
	const values = [];
	entries.forEach((entry, index) => {
		if (index) values.push(" | ");
		const bit = 1 << index;
		if (entry.value != null) {
			values.push(entry.value ? String(bit) : "0");
			return;
		}
		values.push("(", ...genExpression(entry.condition, context), entry.negate ? ` ? 0 : ${bit}` : ` ? ${bit} : 0`, ")");
	});
	return values;
}
function appendClass$1(base, value) {
	return base ? value ? `${base} ${value}` : base : value;
}
function getObjectPropertyName$1(prop) {
	const key = prop.key;
	if (key.type === "Identifier") return key.name;
	else if (key.type === "StringLiteral") return key.value;
	else if (key.type === "NumericLiteral") return String(key.value);
}
function getStringClassValue(node) {
	if (node.type === "StringLiteral") return (0, _vue_shared.normalizeClass)(node.value);
	else if (node.type === "TemplateLiteral" && node.expressions.length === 0) return (0, _vue_shared.normalizeClass)(node.quasis[0].value.cooked || "");
	else if (node.type === "NullLiteral" || node.type === "BooleanLiteral" && !node.value) return "";
}
function getBooleanValue(node) {
	if (node.type === "BooleanLiteral") return node.value;
}
function createSubExpression(source, node, context) {
	const start = node.start == null ? 0 : node.start - 1;
	const end = node.end == null ? source.content.length : node.end - 1;
	const content = source.content.slice(start, end);
	const expression = (0, _vue_compiler_dom.createSimpleExpression)(content, false, {
		start: (0, _vue_compiler_dom.advancePositionWithClone)(source.loc.start, source.content, start),
		end: (0, _vue_compiler_dom.advancePositionWithClone)(source.loc.start, source.content, end),
		source: content
	});
	expression.ast = (0, _vue_compiler_dom.isSimpleIdentifier)(content) ? null : (0, _babel_parser.parseExpression)(`(${content})`, getParserOptions(context.options.expressionPlugins));
	return expression;
}
function genDynamicProps$1(oper, context) {
	const { helper } = context;
	const isSVG = (0, _vue_shared.isSVGTag)(oper.tag);
	const values = oper.props.map((props) => Array.isArray(props) ? genLiteralObjectProps(props, context) : props.kind === 1 ? genLiteralObjectProps([props], context) : genExpression(props.value, context));
	return [NEWLINE, ...genCall(helper("setDynamicProps"), `n${oper.element}`, genMulti(DELIMITERS_ARRAY, ...values), isSVG && "true")];
}
function genLiteralObjectProps(props, context) {
	return genMulti(DELIMITERS_OBJECT, ...props.map((prop) => [
		...genPropKey(prop, context),
		`: `,
		...genPropValue(prop.values, context)
	]));
}
function genPropKey({ key: node, modifier, runtimeCamelize, handler, handlerModifiers }, context) {
	const { helper } = context;
	const handlerModifierPostfix = handlerModifiers && handlerModifiers.options ? handlerModifiers.options.map(_vue_shared.capitalize).join("") : "";
	if (node.isStatic) {
		const keyName = (handler ? (0, _vue_shared.toHandlerKey)((0, _vue_shared.camelize)(node.content)) : node.content) + handlerModifierPostfix;
		return [[
			(0, _vue_compiler_dom.isSimpleIdentifier)(keyName) ? keyName : JSON.stringify(keyName),
			-2,
			node.loc
		]];
	}
	let key = genExpression(node, context);
	if (runtimeCamelize) {
		key.push(" || \"\"");
		key = genCall(helper("camelize"), key);
	} else if (modifier) key = [
		"(",
		...key,
		" || \"\"",
		")"
	];
	if (handler) key = genCall(helper("toHandlerKey"), key);
	return [
		"[",
		modifier && `${JSON.stringify(modifier)} + `,
		...key,
		handlerModifierPostfix ? ` + ${JSON.stringify(handlerModifierPostfix)}` : void 0,
		"]"
	];
}
function genPropValue(values, context) {
	if (values.length === 1) return genExpression(values[0], context);
	return genMulti(DELIMITERS_ARRAY, ...values.map((expr) => genExpression(expr, context)));
}
function getRuntimeHelper(tag, key, modifier) {
	const tagName = tag.toUpperCase();
	const isSVG = (0, _vue_shared.isSVGTag)(tag);
	if (modifier) if (modifier === ".") return getSpecialHelper(key, tagName, isSVG) || helpers.setDOMProp;
	else return isSVG ? (0, _vue_shared.extend)({ isSVG: true }, helpers.setAttr) : helpers.setAttr;
	const helper = getSpecialHelper(key, tagName, isSVG);
	if (helper) return helper;
	if (/aria[A-Z]/.test(key)) return helpers.setDOMProp;
	if (isSVG) return (0, _vue_shared.extend)({ isSVG: true }, helpers.setAttr);
	if ((0, _vue_shared.shouldSetAsAttr)(tagName, key) || key.includes("-")) return helpers.setAttr;
	return helpers.setProp;
}
function getSpecialHelper(keyName, tagName, isSVG) {
	if (keyName === "value" && (0, _vue_shared.canSetValueDirectly)(tagName)) return helpers.setValue;
	else if (keyName === "class") return (0, _vue_shared.extend)({ isSVG }, helpers.setClass);
	else if (keyName === "style") return helpers.setStyle;
	else if (keyName === "innerHTML") return helpers.setHtml;
	else if (keyName === "textContent") return helpers.setText;
}
//#endregion
//#region packages/compiler-vapor/src/generators/templateRef.ts
const setTemplateRefIdent = `_setTemplateRef`;
function genSetTemplateRef(oper, context) {
	const [refValue, refKey] = genRefValue(oper.value, context);
	if (context.staticTemplateRefHelperCandidate === oper) return genSetStaticTemplateRef(oper, refValue, refKey, context);
	context.needsTemplateRefSetter = true;
	return [NEWLINE, ...genCall(setTemplateRefIdent, `n${oper.element}`, refValue, oper.refFor && "true", refKey)];
}
function genSetStaticTemplateRef(oper, refValue, refKey, context) {
	return [NEWLINE, ...genCall(context.helper("setStaticTemplateRef"), `n${oper.element}`, refValue, oper.refFor && "true", refKey)];
}
function genSetTemplateRefBinding(oper, context) {
	const [refValue, refKey] = genRefValue(oper.value, context);
	const setter = context.inSlotBlock && setTemplateRefIdent;
	if (context.inSlotBlock) context.needsTemplateRefSetter = true;
	return [NEWLINE, ...genCall([context.helper("setTemplateRefBinding"), "undefined"], `n${oper.element}`, ["() => ", ...refValue], ...setter || oper.refFor || refKey ? [
		setter,
		oper.refFor && "true",
		refKey
	] : [])];
}
function genRefValue(value, context) {
	if (value && context.options.inline) {
		const binding = context.options.bindingMetadata[value.content];
		if (binding === "setup-let" || binding === "setup-ref" || binding === "setup-maybe-ref") return [[value.content], JSON.stringify(value.content)];
	}
	return [genExpression(value, context)];
}
//#endregion
//#region packages/compiler-vapor/src/generators/text.ts
function genSetText(oper, context) {
	const { helper } = context;
	const { element, values, generated, isComponent } = oper;
	const texts = combineValues(values, context);
	return [NEWLINE, ...genCall(isComponent ? helper("setBlockText") : helper("setText"), `${generated && !isComponent ? "x" : "n"}${element}`, texts)];
}
function combineValues(values, context) {
	return values.flatMap((value, i) => {
		let exp = genExpression(value, context);
		if (getLiteralExpressionValue(value, true) == null) exp = genCall(context.helper("toDisplayString"), exp);
		if (i > 0) exp.unshift(" + ");
		return exp;
	});
}
function genGetTextChild(oper, context) {
	return [NEWLINE, `const x${oper.parent} = ${context.helper("txt")}(n${oper.parent})`];
}
//#endregion
//#region packages/compiler-vapor/src/generators/vShow.ts
function genVShow(oper, context) {
	const { element } = oper;
	return [NEWLINE, ...genCall(context.helper("applyVShow"), `n${element}`, [
		`() => (`,
		...genExpression(oper.dir.exp, context),
		`)`
	])];
}
//#endregion
//#region packages/compiler-vapor/src/generators/modifier.ts
function genDirectiveModifiers(modifiers) {
	return modifiers.map((value) => `${(0, _vue_compiler_dom.isSimpleIdentifier)(value) ? value : JSON.stringify(value)}: true`).join(", ");
}
//#endregion
//#region packages/compiler-vapor/src/generators/vModel.ts
const helperMap = {
	text: "applyTextModel",
	radio: "applyRadioModel",
	checkbox: "applyCheckboxModel",
	select: "applySelectModel",
	dynamic: "applyDynamicModel"
};
function genVModel(oper, context) {
	const { modelType, element, dir: { exp, modifiers } } = oper;
	return [NEWLINE, ...genCall(context.helper(helperMap[modelType]), `n${element}`, [
		`() => (`,
		...genExpression(exp, context),
		`)`
	], genModelHandler(exp, context), modifiers.length ? `{ ${genDirectiveModifiers(modifiers.map((e) => e.content))} }` : void 0)];
}
function genModelHandler(exp, context) {
	return [
		`${context.options.isTS ? `(_value: any)` : `_value`} => (`,
		...genExpression(exp, context, "_value"),
		")"
	];
}
//#endregion
//#region packages/compiler-vapor/src/generators/directive.ts
function genBuiltinDirective(oper, context) {
	switch (oper.name) {
		case "show": return genVShow(oper, context);
		case "model": return genVModel(oper, context);
		default: return [];
	}
}
/**
* user directives via `withVaporDirectives`
*/
function genDirectivesForElement(id, context) {
	const dirs = filterCustomDirectives(id, context.block.operation);
	return dirs.length ? genCustomDirectives(dirs, context) : [];
}
function genCustomDirectives(opers, context) {
	const { helper } = context;
	const element = `n${opers[0].element}`;
	const directives = genMulti(DELIMITERS_ARRAY, ...opers.map(genDirectiveItem));
	return [NEWLINE, ...genCall(helper("withVaporDirectives"), element, directives)];
	function genDirectiveItem({ dir, name, asset }) {
		const directiveVar = asset ? (0, _vue_compiler_dom.toValidAssetId)(name, "directive") : genExpression((0, _vue_shared.extend)((0, _vue_compiler_dom.createSimpleExpression)(name, false), { ast: null }), context);
		const value = dir.exp && ["() => ", ...genExpression(dir.exp, context)];
		const argument = dir.arg && genExpression(dir.arg, context);
		const modifiers = !!dir.modifiers.length && [
			"{ ",
			genDirectiveModifiers(dir.modifiers.map((m) => m.content)),
			" }"
		];
		return genMulti(DELIMITERS_ARRAY.concat("void 0"), directiveVar, value, argument, modifiers);
	}
}
function filterCustomDirectives(id, operations) {
	return operations.filter((oper) => oper.type === 14 && oper.element === id && !oper.builtin);
}
//#endregion
//#region packages/compiler-vapor/src/generators/component.ts
function genStaticModifierPropKey(name) {
	const key = (0, _vue_shared.getModifierPropName)(name);
	return [(0, _vue_compiler_dom.isSimpleIdentifier)(key) ? key : JSON.stringify(key)];
}
function genCreateComponent(operation, context) {
	const { helper } = context;
	const singleUseAssetComponentNames = context.singleUseAssetComponentNames;
	const useAssetComponentHelper = operation.asset && !operation.dynamic && context.block === context.ir.block && !!singleUseAssetComponentNames && singleUseAssetComponentNames.has(operation.tag);
	const maybeSelfReference = useAssetComponentHelper && operation.tag.endsWith("__self");
	const tag = genTag();
	const { root, props, slots, once, slotRoot } = operation;
	const isRuntimeDynamicComponent = !!(operation.dynamic && !operation.dynamic.isStatic);
	const dynamicComponentFlags = isRuntimeDynamicComponent ? genDynamicComponentFlags(root, once, slotRoot) : false;
	const rawSlots = genRawSlots(slots, context);
	const [ids, handlers] = processInlineHandlers(props, context);
	const rawProps = context.withId(() => genRawProps(props, context, true), ids);
	return [
		NEWLINE,
		...handlers.reduce((acc, { name, value }) => {
			const handler = genEventHandler(context, [value]);
			return [
				...acc,
				`const ${name} = `,
				...handler,
				NEWLINE
			];
		}, []),
		`const n${operation.id} = `,
		...genCall(isRuntimeDynamicComponent ? helper("createDynamicComponent") : operation.useCreateElement ? helper("createPlainElement") : useAssetComponentHelper ? helper("createAssetComponent") : operation.asset ? helper("createComponentWithFallback") : helper("createComponent"), tag, rawProps, rawSlots, isRuntimeDynamicComponent ? dynamicComponentFlags : root ? "true" : false, isRuntimeDynamicComponent ? false : once && "true", isRuntimeDynamicComponent ? false : maybeSelfReference && "true"),
		...genDirectivesForElement(operation.id, context)
	];
	function genTag() {
		if (operation.useCreateElement) return JSON.stringify(operation.tag);
		else if (operation.dynamic) if (operation.dynamic.isStatic) return genCall(helper("resolveDynamicComponent"), genExpression(operation.dynamic, context));
		else return [
			"() => (",
			...genExpression(operation.dynamic, context),
			")"
		];
		else if (useAssetComponentHelper) {
			const name = maybeSelfReference ? operation.tag.slice(0, -6) : operation.tag;
			return JSON.stringify(name);
		} else if (operation.asset) return (0, _vue_compiler_dom.toValidAssetId)(operation.tag, "component");
		else {
			const { tag } = operation;
			const builtInTag = isBuiltInComponent(tag);
			if (builtInTag) {
				helper(builtInTag);
				return `_${builtInTag}`;
			}
			return genExpression((0, _vue_shared.extend)((0, _vue_compiler_dom.createSimpleExpression)(tag, false), { ast: null }), context);
		}
	}
}
function genDynamicComponentFlags(root, once, slotRoot, extraFlags) {
	let flags = 0;
	const names = [];
	if (root) {
		flags |= 1;
		names.push("SINGLE_ROOT");
	}
	if (once) {
		flags |= 2;
		names.push("ONCE");
	}
	if (slotRoot) {
		flags |= 4;
		names.push("SLOT_ROOT");
	}
	if (extraFlags) for (const [flag, name] of extraFlags) {
		flags |= flag;
		names.push(name);
	}
	if (!flags) return false;
	return `${flags} /* ${names.join(", ")} */`;
}
function getUniqueHandlerName(context, name) {
	const { seenInlineHandlerNames } = context;
	name = genVarName(name);
	const count = seenInlineHandlerNames[name] || 0;
	seenInlineHandlerNames[name] = count + 1;
	return count === 0 ? name : `${name}${count}`;
}
function processInlineHandlers(props, context) {
	const ids = Object.create(null);
	const handlers = [];
	const staticProps = props[0];
	if ((0, _vue_shared.isArray)(staticProps)) for (let i = 0; i < staticProps.length; i++) {
		const prop = staticProps[i];
		if (!prop.handler) continue;
		prop.values.forEach((value, i) => {
			if (!(0, _vue_compiler_dom.isMemberExpression)(value, context.options)) {
				const name = getUniqueHandlerName(context, `_on_${prop.key.content.replace(/-/g, "_")}`);
				handlers.push({
					name,
					value
				});
				ids[name] = null;
				prop.values[i] = (0, _vue_shared.extend)({ ast: null }, (0, _vue_compiler_dom.createSimpleExpression)(name));
			}
		});
	}
	return [ids, handlers];
}
function genRawProps(props, context, directStaticLiteralProps = false) {
	const staticProps = props[0];
	if ((0, _vue_shared.isArray)(staticProps)) {
		if (!staticProps.length && props.length === 1) return;
		return genStaticProps(staticProps, context, genDynamicProps(props.slice(1), context, directStaticLiteralProps), directStaticLiteralProps);
	} else if (props.length) return genStaticProps([], context, genDynamicProps(props, context, directStaticLiteralProps), directStaticLiteralProps);
}
function genStaticProps(props, context, dynamicProps, directStaticLiteralProps = false) {
	const args = [];
	const handlerGroups = /* @__PURE__ */ new Map();
	const ensureHandlerGroup = (keyName, keyFrag) => {
		let group = handlerGroups.get(keyName);
		if (!group) {
			const index = args.length;
			args.push([]);
			group = {
				keyFrag,
				handlers: [],
				index
			};
			handlerGroups.set(keyName, group);
		}
		return group;
	};
	const addHandler = (keyName, keyFrag, handlerExp) => {
		ensureHandlerGroup(keyName, keyFrag).handlers.push(handlerExp);
	};
	const getStaticPropKeyName = (prop) => {
		if (!prop.key.isStatic) return;
		const handlerModifierPostfix = prop.handlerModifiers && prop.handlerModifiers.options ? prop.handlerModifiers.options.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join("") : "";
		return (prop.handler ? (0, _vue_shared.toHandlerKey)((0, _vue_shared.camelize)(prop.key.content)) : prop.key.content) + handlerModifierPostfix;
	};
	for (const prop of props) {
		if (prop.handler) {
			const keyName = getStaticPropKeyName(prop);
			if (!keyName) {
				args.push(genProp(prop, context, true));
				continue;
			}
			const keyFrag = genPropKey(prop, context);
			if (!!prop.handlerModifiers && (prop.handlerModifiers.keys.length > 0 || prop.handlerModifiers.nonKeys.length > 0) || prop.values.length <= 1) addHandler(keyName, keyFrag, genEventHandler(context, prop.values, prop.handlerModifiers, { asComponentProp: true }));
			else for (const value of prop.values) addHandler(keyName, keyFrag, genEventHandler(context, [value], prop.handlerModifiers, { asComponentProp: true }));
			continue;
		}
		args.push(genProp(prop, context, true, true, directStaticLiteralProps && isDirectStaticLiteralProp(prop, context)));
		if (prop.model) {
			if (prop.key.isStatic) {
				const keyName = `onUpdate:${(0, _vue_shared.camelize)(prop.key.content)}`;
				addHandler(keyName, [JSON.stringify(keyName)], genModelHandler(prop.values[0], context));
			} else {
				const keyFrag = [
					"[\"onUpdate:\" + ",
					...genExpression(prop.key, context),
					"]"
				];
				args.push([
					...keyFrag,
					": () => ",
					...genModelHandler(prop.values[0], context)
				]);
			}
			const { key, modelModifiers } = prop;
			if (modelModifiers && modelModifiers.length) {
				const modifiersKey = key.isStatic ? genStaticModifierPropKey(key.content) : [
					"[",
					...genExpression(key, context),
					" + \"Modifiers\"]"
				];
				const modifiersVal = genDirectiveModifiers(modelModifiers);
				args.push([...modifiersKey, directStaticLiteralProps ? `: { ${modifiersVal} }` : `: () => ({ ${modifiersVal} })`]);
			}
		}
	}
	for (const group of handlerGroups.values()) {
		const handlerValue = group.handlers.length > 1 ? genMulti(DELIMITERS_ARRAY_NEWLINE, ...group.handlers) : group.handlers[0];
		args[group.index] = [
			...group.keyFrag,
			": () => ",
			...handlerValue
		];
	}
	if (dynamicProps) args.push([`$: `, ...dynamicProps]);
	return genMulti(args.length > 1 ? DELIMITERS_OBJECT_NEWLINE : DELIMITERS_OBJECT, ...args);
}
function genDynamicProps(props, context, directStaticLiteralProps = false) {
	const { helper } = context;
	const frags = [];
	for (const p of props) {
		let expr;
		if ((0, _vue_shared.isArray)(p)) {
			if (p.length) frags.push(genStaticProps(p, context, void 0, directStaticLiteralProps));
			continue;
		} else if (p.kind === 1) if (p.model) {
			const entries = [genProp(p, context)];
			const updateKey = p.key.isStatic ? [JSON.stringify(`onUpdate:${(0, _vue_shared.camelize)(p.key.content)}`)] : [
				"[\"onUpdate:\" + ",
				...genExpression(p.key, context),
				"]"
			];
			entries.push([
				...updateKey,
				": ",
				...genModelHandler(p.values[0], context)
			]);
			const { modelModifiers } = p;
			if (modelModifiers && modelModifiers.length) {
				const modifiersKey = p.key.isStatic ? genStaticModifierPropKey(p.key.content) : [
					"[",
					...genExpression(p.key, context),
					" + \"Modifiers\"]"
				];
				const modifiersVal = genDirectiveModifiers(modelModifiers);
				entries.push([...modifiersKey, `: { ${modifiersVal} }`]);
			}
			expr = genMulti(DELIMITERS_OBJECT_NEWLINE, ...entries);
		} else expr = genMulti(DELIMITERS_OBJECT, genProp(p, context, false, false));
		else {
			expr = genExpression(p.value, context);
			if (p.handler) expr = genCall(helper("toHandlers"), expr);
		}
		frags.push([
			"() => (",
			...expr,
			")"
		]);
	}
	if (frags.length) return genMulti(DELIMITERS_ARRAY_NEWLINE, ...frags);
}
function genProp(prop, context, isStatic, wrapHandler = true, directStaticLiteral = false) {
	const values = genPropValue(prop.values, context);
	return [
		...genPropKey(prop, context),
		": ",
		...prop.handler ? genEventHandler(context, prop.values, prop.handlerModifiers, {
			asComponentProp: true,
			extraWrap: wrapHandler
		}) : isStatic ? directStaticLiteral ? values : [
			"() => (",
			...values,
			")"
		] : values
	];
}
/**
* Static literal values are safe to emit directly because reading them cannot
* touch reactive state. Keep handlers, v-model values, and dynamic expressions
* as getter sources to preserve lazy access and merge semantics.
*/
function isDirectStaticLiteralProp(prop, context) {
	return prop.key.isStatic && prop.values.length === 1 && !prop.handler && !prop.model && isDirectConstantValue(prop.values[0], context);
}
function isDirectConstantValue(value, context) {
	value = context.getExpressionReplacement(value);
	if (value.isStatic) return true;
	const ast = value.ast;
	if (ast === null) return value.content === "true" || value.content === "false" || value.content === "null" || value.content === "undefined";
	if (!ast) return false;
	return isDirectConstantAst(ast);
}
function isDirectConstantAst(node) {
	switch (node.type) {
		case "StringLiteral":
		case "NumericLiteral":
		case "BooleanLiteral":
		case "NullLiteral":
		case "BigIntLiteral": return true;
		case "Identifier": return node.name === "undefined";
		case "TemplateLiteral": return node.expressions.every((expression) => isDirectTemplateConstantAst(expression));
		case "ArrayExpression": return node.elements.every((element) => element === null || element.type !== "SpreadElement" && isDirectConstantAst(element));
		case "ObjectExpression": return node.properties.every((prop) => prop.type === "ObjectProperty" && !prop.computed && isDirectConstantAst(prop.value));
	}
	return false;
}
function isDirectTemplateConstantAst(node) {
	switch (node.type) {
		case "StringLiteral":
		case "NumericLiteral":
		case "BooleanLiteral":
		case "NullLiteral":
		case "BigIntLiteral": return true;
		case "Identifier": return node.name === "undefined";
		case "TemplateLiteral": return node.expressions.every((expression) => isDirectTemplateConstantAst(expression));
	}
	return false;
}
function genRawSlots(slots, context) {
	if (!slots.length) return;
	const staticSlots = slots[0];
	if (staticSlots.slotType === 0) {
		const defaultSlot = getSingleDefaultSlot(staticSlots);
		if (defaultSlot && slots.length === 1) return genSlotBlockWithProps(defaultSlot, context);
		return genStaticSlots(staticSlots, context, slots.length > 1 ? slots.slice(1) : void 0);
	} else return genStaticSlots({
		slotType: 0,
		slots: {}
	}, context, slots);
}
function getSingleDefaultSlot({ slots }) {
	const names = Object.keys(slots);
	return names.length === 1 && names[0] === "default" ? slots.default : void 0;
}
function genStaticSlots({ slots }, context, dynamicSlots) {
	const args = Object.keys(slots).map((name) => [`${JSON.stringify(name)}: `, ...genSlotBlockWithProps(slots[name], context)]);
	if (dynamicSlots) args.push([`$: `, ...genDynamicSlots(dynamicSlots, context)]);
	return genMulti(DELIMITERS_OBJECT_NEWLINE, ...args);
}
function genDynamicSlots(slots, context) {
	return genMulti(DELIMITERS_ARRAY_NEWLINE, ...slots.map((slot) => slot.slotType === 0 ? genStaticSlots(slot, context) : slot.slotType === 4 ? slot.slots.content : genDynamicSlot(slot, context, true)));
}
function genDynamicSlot(slot, context, withFunction = false) {
	let frag;
	switch (slot.slotType) {
		case 1:
			frag = genBasicDynamicSlot(slot, context);
			break;
		case 2:
			frag = genLoopSlot(slot, context);
			break;
		case 3:
			frag = genConditionalSlot(slot, context);
			break;
	}
	if (!withFunction) return frag;
	return [
		"() => (",
		...frag,
		")"
	];
}
function genBasicDynamicSlot(slot, context) {
	const { name, fn } = slot;
	return genMulti(DELIMITERS_OBJECT_NEWLINE, ["name: ", ...genExpression(name, context)], ["fn: ", ...genSlotBlockWithProps(fn, context, false)]);
}
function genLoopSlot(slot, context) {
	const { name, fn, loop } = slot;
	const { value, key, index, source } = loop;
	const rawValue = value && value.content;
	const rawKey = key && key.content;
	const rawIndex = index && index.content;
	const idMap = {};
	if (rawValue) idMap[rawValue] = rawValue;
	if (rawKey) idMap[rawKey] = rawKey;
	if (rawIndex) idMap[rawIndex] = rawIndex;
	const slotExpr = genMulti(DELIMITERS_OBJECT_NEWLINE, ["name: ", ...context.withId(() => genExpression(name, context), idMap)], ["fn: ", ...context.withId(() => genSlotBlockWithProps(fn, context, false), idMap)]);
	return [...genCall(context.helper("createForSlots"), genExpression(source, context), [
		...genMulti([
			"(",
			")",
			", "
		], rawValue ? rawValue : rawKey || rawIndex ? "_" : void 0, rawKey ? rawKey : rawIndex ? "__" : void 0, rawIndex),
		" => (",
		...slotExpr,
		")"
	])];
}
function genConditionalSlot(slot, context) {
	const { condition, positive, negative } = slot;
	return [
		...genExpression(condition, context),
		INDENT_START,
		NEWLINE,
		"? ",
		...genDynamicSlot(positive, context),
		NEWLINE,
		": ",
		...negative ? [...genDynamicSlot(negative, context)] : ["void 0"],
		INDENT_END
	];
}
function genSlotBlockWithProps(oper, context, emitNonStableFlag = true) {
	let propsName;
	let exitScope;
	let depth;
	const { props } = oper;
	const idToPathMap = props ? parseValueDestructure(props, context) : /* @__PURE__ */ new Map();
	if (props) if (props.ast) {
		[depth, exitScope] = context.enterScope();
		propsName = `_slotProps${depth}`;
	} else propsName = props.content;
	const idMap = idToPathMap.size ? buildDestructureIdMap(idToPathMap, propsName || "", context.options.expressionPlugins) : {};
	if (propsName) idMap[propsName] = null;
	const exitSlotBlock = context.enterSlotBlock();
	const hasStableRoot = hasStableSlotRoot(oper, context);
	if (!hasStableRoot) markSlotRootOperations(oper);
	let blockFn = context.withId(() => genBlock(oper, context, propsName ? [propsName] : []), idMap);
	if (emitNonStableFlag && !hasStableRoot) blockFn = genCall(context.helper("extend"), blockFn, [`{ _: ${genSlotFlags$1(8)} }`]);
	exitSlotBlock();
	exitScope && exitScope();
	return blockFn;
}
function genSlotFlags$1(flags) {
	const names = [];
	if (flags & 1) names.push("NO_SLOTTED");
	if (flags & 2) names.push("ONCE");
	if (flags & 4) names.push("SLOT_ROOT");
	if (flags & 8) names.push("NON_STABLE");
	return `${flags} /* ${names.join(", ")} */`;
}
const commentOnlyTemplateRE = /^(?:<!--[\s\S]*?-->)+$/;
function hasStableSlotRoot(block, context) {
	let hasValidRoot = false;
	for (let i = 0; i < block.returns.length; i++) {
		const id = block.returns[i];
		const child = findReturnedDynamic$1(block, id);
		const operation = child && child.operation;
		if (!operation) {
			if (child && isStableTemplateSlotRoot(child, context)) hasValidRoot = true;
			continue;
		}
		switch (operation.type) {
			case 12:
				if (!operation.dynamic || operation.dynamic.isStatic) {
					hasValidRoot = true;
					continue;
				}
				continue;
			case 17:
				if (hasStableSlotRoot(operation.block, context)) {
					hasValidRoot = true;
					continue;
				}
				continue;
			default: continue;
		}
	}
	return hasValidRoot;
}
function isStableTemplateSlotRoot(child, context) {
	if (child.template == null) return false;
	const content = context.ir.template.entries[child.template].content;
	return content !== "" && !commentOnlyTemplateRE.test(content.trim());
}
function needsVaporCtx(block) {
	return hasComponentOrSlotInBlock(block);
}
function hasComponentOrSlotInBlock(block) {
	if (hasComponentOrSlotInOperations(block.operation)) return true;
	return hasComponentOrSlotInDynamic(block.dynamic);
}
function hasComponentOrSlotInDynamic(dynamic) {
	if (dynamic.operation) {
		const type = dynamic.operation.type;
		if (type === 12 || type === 13) return true;
		if (type === 15) {
			if (hasComponentOrSlotInIf(dynamic.operation)) return true;
		}
		if (type === 16) {
			if (hasComponentOrSlotInBlock(dynamic.operation.render)) return true;
		}
	}
	for (const child of dynamic.children) if (hasComponentOrSlotInDynamic(child)) return true;
	return false;
}
function hasComponentOrSlotInOperations(operations) {
	for (const op of operations) switch (op.type) {
		case 12:
		case 13: return true;
		case 15:
			if (hasComponentOrSlotInIf(op)) return true;
			break;
		case 16:
			if (hasComponentOrSlotInBlock(op.render)) return true;
			break;
	}
	return false;
}
function hasComponentOrSlotInIf(node) {
	if (hasComponentOrSlotInBlock(node.positive)) return true;
	if (node.negative) if ("positive" in node.negative) return hasComponentOrSlotInIf(node.negative);
	else return hasComponentOrSlotInBlock(node.negative);
	return false;
}
//#endregion
//#region packages/compiler-vapor/src/generators/slotOutlet.ts
function genSlotOutlet(oper, context) {
	const { helper } = context;
	const { id, name, fallback, flags } = oper;
	const [frag, push] = buildCodeFragment();
	let fallbackArg;
	if (fallback) {
		if (context.inSlotBlock) markSlotRootOperations(fallback);
		fallbackArg = genBlock(fallback, context);
	}
	const createSlot = helper("createSlot");
	const rawPropsArg = genRawProps(oper.props, context, true);
	const nameArg = name.isStatic && name.content === "default" && !rawPropsArg && !fallbackArg && !flags ? void 0 : name.isStatic ? genExpression(name, context) : [
		"() => (",
		...genExpression(name, context),
		")"
	];
	push(NEWLINE, `const n${id} = `, ...genCall(createSlot, nameArg, rawPropsArg, fallbackArg, genSlotFlags(flags)));
	return frag;
}
function genSlotFlags(flags) {
	if (!flags) return;
	const names = [];
	if (flags & 1) names.push("NO_SLOTTED");
	if (flags & 2) names.push("ONCE");
	if (flags & 4) names.push("SLOT_ROOT");
	return `${flags} /* ${names.join(", ")} */`;
}
//#endregion
//#region packages/compiler-vapor/src/generators/key.ts
function genKey(oper, context) {
	const { id, value, block } = oper;
	const [frag, push] = buildCodeFragment();
	const blockFn = genBlock(block, context);
	push(NEWLINE, `const n${id} = `, ...genCall(context.helper("createKeyedFragment"), [
		`() => (`,
		...genExpression(value, context),
		")"
	], blockFn));
	return frag;
}
function genSetBlockKey(oper, context) {
	return [NEWLINE, ...genCall(context.helper("setBlockKey"), `n${oper.element}`, genExpression(oper.value, context))];
}
//#endregion
//#region packages/compiler-vapor/src/generators/operation.ts
function genOperations(opers, context) {
	const [frag, push] = buildCodeFragment();
	for (const operation of opers) push(...genOperationWithInsertionState(operation, context));
	return frag;
}
function genOperationWithInsertionState(oper, context) {
	const [frag, push] = buildCodeFragment();
	if (isBlockOperation(oper) && oper.parent) push(...genInsertionState(oper, context));
	push(...genOperation(oper, context));
	return frag;
}
function genOperation(oper, context) {
	switch (oper.type) {
		case 2: return genSetBlockKey(oper, context);
		case 3: return genSetProp(oper, context);
		case 4: return genDynamicProps$1(oper, context);
		case 5: return genSetText(oper, context);
		case 6: return genSetEvent(oper, context);
		case 7: return genSetDynamicEvents(oper, context);
		case 8: return genSetHtml(oper, context);
		case 9: return genSetTemplateRef(oper, context);
		case 10: return genInsertNode(oper, context);
		case 11: return genPrependNode(oper, context);
		case 15: return genIf(oper, context);
		case 16: return genFor(oper, context);
		case 17: return genKey(oper, context);
		case 12: return genCreateComponent(oper, context);
		case 13: return genSlotOutlet(oper, context);
		case 14: return genBuiltinDirective(oper, context);
		case 18: return genGetTextChild(oper, context);
		case 19: return [];
		case 20: return [];
		default: throw new Error(`Unhandled operation type in genOperation: ${oper}`);
	}
}
function genEffects(effects, context, genExtraFrag) {
	const { helper } = context;
	const expressions = effects.flatMap((effect) => effect.expressions);
	const [frag, push, unshift] = buildCodeFragment();
	const shouldDeclare = genExtraFrag === void 0;
	let operationsCount = 0;
	const { ids, frag: declarationFrags, varNames, expressionReplacements } = processExpressions(context, expressions, shouldDeclare);
	if (shouldDeclare && !declarationFrags.length && !varNames.length) {
		const effect = effects.length === 1 ? effects[0] : void 0;
		const operation = effect && effect.operations.length === 1 ? effect.operations[0] : void 0;
		if (operation && operation.type === 9 && operation.effect && !operation.refFor) return context.withExpressionReplacements(expressionReplacements, () => context.withId(() => genSetTemplateRefBinding(operation, context), ids));
	}
	return context.withExpressionReplacements(expressionReplacements, () => {
		push(...declarationFrags);
		for (let i = 0; i < effects.length; i++) {
			const effect = effects[i];
			operationsCount += effect.operations.length;
			const frags = context.withId(() => genEffect(effect, context), ids);
			i > 0 && push(NEWLINE);
			if (frag[frag.length - 1] === ")" && frags[0] === "(") push(";");
			push(...frags);
		}
		if (frag.filter((frag) => frag === NEWLINE).length > 1 || operationsCount > 1 || declarationFrags.length > 0) {
			unshift(`{`, INDENT_START, NEWLINE);
			push(INDENT_END, NEWLINE, "}");
			if (!effects.length) unshift(NEWLINE);
		}
		if (effects.length) {
			unshift(NEWLINE, `${helper("renderEffect")}(() => `);
			push(`)`);
		}
		if (!shouldDeclare && varNames.length) unshift(NEWLINE, `let `, varNames.join(", "));
		if (genExtraFrag) push(...context.withId(genExtraFrag, ids));
		return frag;
	});
}
function genEffect({ operations }, context) {
	const [frag, push] = buildCodeFragment();
	const operationsExps = genOperations(operations, context);
	if (operationsExps.filter((frag) => frag === NEWLINE).length > 1) push(...operationsExps);
	else push(...operationsExps.filter((frag) => frag !== NEWLINE));
	return frag;
}
function genInsertionState(operation, context) {
	const { parent, anchor, logicalIndex, append } = operation;
	return [NEWLINE, ...genCall(context.helper("setInsertionState"), `n${parent}`, anchor == null ? void 0 : anchor === -1 ? `0` : append ? "null" : `n${anchor}`, logicalIndex !== void 0 ? String(logicalIndex) : void 0)];
}
//#endregion
//#region packages/compiler-vapor/src/generators/template.ts
function genTemplates(templates, context) {
	const result = [];
	templates.forEach(({ content, ns, root, static: isStatic }, i) => {
		let args = JSON.stringify(content).replace(IMPORT_EXPR_RE, `" + $1 + "`);
		const flags = (root ? 1 : 0) | (isStatic ? 2 : 0);
		if (flags || ns) args += `, ${flags}`;
		if (ns) args += `, ${ns}`;
		result.push(`const ${context.tName(i)} = ${context.helper("template")}(${args})\n`);
	});
	return result.join("");
}
function genSelf(dynamic, context, flushBeforeDynamic) {
	const [frag, push] = buildCodeFragment();
	const { id, template, operation, hasDynamicChild } = dynamic;
	if (id !== void 0 && template !== void 0) {
		push(NEWLINE, `const n${id} = ${context.tName(template)}()`);
		push(...genDirectivesForElement(id, context));
	}
	if (operation) push(...genOperationWithInsertionState(operation, context));
	if (hasDynamicChild) push(...genChildren(dynamic, context, push, `n${id}`, flushBeforeDynamic));
	return frag;
}
function genChildren(dynamic, context, pushBlock, from = `n${dynamic.id}`, flushBeforeDynamic) {
	const [frag, push] = buildCodeFragment();
	const { children } = dynamic;
	let offset = 0;
	/**
	* `reusable` means the previous access target is a p* cursor that can be
	* reassigned by the next lookup. Referenced n* variables must stay stable.
	*/
	let prev;
	for (const [index, child] of children.entries()) {
		if (child.flags & 2) offset--;
		if (child.flags & 4 && child.template != null) {
			flushBeforeDynamic && flushBeforeDynamic(child, push);
			push(...genSelf(child, context, flushBeforeDynamic));
			continue;
		}
		const id = child.flags & 1 ? child.flags & 4 ? child.anchor : child.id : void 0;
		if (id === void 0 && !child.hasDynamicChild) {
			flushBeforeDynamic && flushBeforeDynamic(child, push);
			push(...genSelf(child, context, flushBeforeDynamic));
			continue;
		}
		const elementIndex = index + offset;
		const logicalIndex = child.logicalIndex !== void 0 ? String(child.logicalIndex) : void 0;
		const inlinePlaceholder = id === void 0 && canInlinePlaceholder(child) && child.template == null && child.operation === void 0 && !(child.flags & 6);
		const accessPath = genAccessPath(context, from, child, elementIndex, logicalIndex, prev);
		if (inlinePlaceholder) {
			if (prev && prev[2]) {
				push(...genChildren(child, context, pushBlock, [
					"(",
					prev[0],
					" = ",
					...accessPath,
					")"
				], flushBeforeDynamic));
				prev = [
					prev[0],
					elementIndex,
					true
				];
				continue;
			}
			if (!hasAdjacentFollowingAccessChild(children, index, elementIndex, offset)) {
				push(...genChildren(child, context, pushBlock, accessPath, flushBeforeDynamic));
				continue;
			}
		}
		let variable;
		if (id === void 0 && prev && prev[2]) {
			variable = prev[0];
			pushBlock(NEWLINE, `${variable} = `, ...accessPath);
		} else {
			variable = id === void 0 ? context.pName(context.block.tempId++) : `n${id}`;
			pushBlock(NEWLINE, id === void 0 ? `let ${variable} = ` : `const ${variable} = `, ...accessPath);
		}
		if (id === child.anchor && !child.hasDynamicChild) {
			flushBeforeDynamic && flushBeforeDynamic(child, push);
			push(...genSelf(child, context, flushBeforeDynamic));
		}
		if (id !== void 0) push(...genDirectivesForElement(id, context));
		prev = [
			variable,
			elementIndex,
			id === void 0
		];
		push(...genChildren(child, context, pushBlock, variable, flushBeforeDynamic));
	}
	return frag;
}
/**
* Build one DOM lookup path while preserving the fast sibling walk:
* adjacent nodes use _next(prev), otherwise fall back to _nthChild(parent).
*/
function genAccessPath({ helper }, from, child, elementIndex, logicalIndex, prev) {
	if (prev) return elementIndex - prev[1] === 1 ? genCall(helper("next"), prev[0], logicalIndex) : genNthChild(helper("nthChild"), from, elementIndex, logicalIndex);
	if (elementIndex === 0) return genCall(helper("child"), from, child.logicalIndex !== 0 ? logicalIndex : void 0);
	const firstChild = genCall(helper("child"), from);
	return elementIndex === 1 ? genCall(helper("next"), firstChild, logicalIndex) : genNthChild(helper("nthChild"), from, elementIndex, logicalIndex);
}
/**
* Only inline a placeholder when materializing it would not save a parent
* lookup. If its child tree needs the parent more than once, keep p* so the
* generated code does not duplicate _child/_nthChild work.
*/
function canInlinePlaceholder(dynamic) {
	return dynamic.hasDynamicChild === true && countParentAccessUsages(dynamic) === 1;
}
/**
* A following access can reuse the current placeholder cursor only when it is
* the next DOM sibling. Gapped siblings need _nthChild(parent, index) instead.
*/
function hasAdjacentFollowingAccessChild(children, index, elementIndex, offset) {
	let futureOffset = offset;
	for (let i = index + 1; i < children.length; i++) {
		const child = children[i];
		if (child.flags & 2) futureOffset--;
		if (!(child.flags & 4 && child.template != null) && (!!(child.flags & 1) || child.hasDynamicChild)) return i + futureOffset - elementIndex === 1;
	}
	return false;
}
/**
* Mirrors genChildren's traversal closely enough to count how many emitted
* access paths would start from this placeholder's parent. This is the guard
* that keeps inline placeholders from duplicating parent lookups.
*/
function countParentAccessUsages(dynamic) {
	let usages = 0;
	let offset = 0;
	let prev;
	for (const [index, child] of dynamic.children.entries()) {
		if (child.flags & 2) offset--;
		if (child.flags & 4 && child.template != null) continue;
		const id = child.flags & 1 ? child.flags & 4 ? child.anchor : child.id : void 0;
		if (id === void 0 && !child.hasDynamicChild) continue;
		const elementIndex = index + offset;
		const usesParent = !prev || elementIndex - prev[0] !== 1;
		if (id === void 0 && canInlinePlaceholder(child) && child.template == null && child.operation === void 0 && !(child.flags & 6)) {
			if (prev && prev[1]) {
				if (usesParent) usages++;
				prev = [elementIndex, true];
				continue;
			}
			if (!hasAdjacentFollowingAccessChild(dynamic.children, index, elementIndex, offset)) {
				if (usesParent) usages++;
				continue;
			}
		}
		if (usesParent) usages++;
		prev = [elementIndex, id === void 0];
	}
	return usages;
}
function genNthChild(nthChild, from, elementIndex, logicalIndex) {
	const index = String(elementIndex);
	return genCall(nthChild, from, index, logicalIndex === index ? void 0 : logicalIndex);
}
//#endregion
//#region packages/compiler-vapor/src/generators/block.ts
function genBlock(oper, context, args = [], root) {
	return [
		"(",
		...args,
		") => {",
		INDENT_START,
		...genBlockContent(oper, context, root),
		INDENT_END,
		NEWLINE,
		"}"
	];
}
function genBlockContent(block, context, root, genEffectsExtraFrag, skippedEffectIndexes) {
	const [frag, push] = buildCodeFragment();
	const { dynamic, effect, operation, returns } = block;
	const resetBlock = context.enterBlock(block);
	const singleUseAssetComponentNames = root ? collectSingleUseAssetComponents(block) : void 0;
	const prevSingleUseAssetComponentNames = context.singleUseAssetComponentNames;
	if (singleUseAssetComponentNames) context.singleUseAssetComponentNames = singleUseAssetComponentNames;
	if (root) {
		for (let name of context.ir.component) {
			if (singleUseAssetComponentNames && singleUseAssetComponentNames.has(name)) continue;
			const id = (0, _vue_compiler_dom.toValidAssetId)(name, "component");
			const maybeSelfReference = name.endsWith("__self");
			if (maybeSelfReference) name = name.slice(0, -6);
			push(NEWLINE, `const ${id} = `, ...genCall(context.helper("resolveComponent"), JSON.stringify(name), maybeSelfReference ? "true" : void 0));
		}
		genResolveAssets("directive", "resolveDirective");
	}
	let operationIndex = 0;
	let effectIndex = 0;
	const flushPendingOperations = (operationEnd, effectEnd, push) => {
		while (operationIndex < operationEnd) {
			push(...genOperationWithInsertionState(operation[operationIndex], context));
			operationIndex++;
		}
		if (effectIndex < effectEnd) {
			push(...genEffectRange(effectIndex, effectEnd));
			effectIndex = effectEnd;
		}
	};
	const flushBeforeDynamic = (dynamic, push) => {
		const operation = dynamic.operation;
		if (operation && isBlockOperation(operation) && operation.operationIndex !== void 0 && operation.effectIndex !== void 0) flushPendingOperations(operation.operationIndex, operation.effectIndex, push);
	};
	for (const child of dynamic.children) {
		flushBeforeDynamic(child, push);
		push(...genSelf(child, context, flushBeforeDynamic));
	}
	for (const child of dynamic.children) if (!child.hasDynamicChild) push(...genChildren(child, context, push, `n${child.id}`, flushBeforeDynamic));
	if (operationIndex < operation.length) push(...genOperations(operation.slice(operationIndex), context));
	if (effectIndex < effect.length) push(...genEffectRange(effectIndex, effect.length, genEffectsExtraFrag));
	else if (genEffectsExtraFrag) push(...genEffects([], context, genEffectsExtraFrag));
	push(NEWLINE, `return `);
	const returnNodes = returns.map((n) => `n${n}`);
	push(...returnNodes.length > 1 ? genMulti(DELIMITERS_ARRAY, ...returnNodes) : [returnNodes[0] || "[]"]);
	resetBlock();
	context.singleUseAssetComponentNames = prevSingleUseAssetComponentNames;
	return frag;
	function genEffectRange(start, end, genExtraFrag) {
		if (!skippedEffectIndexes) return genEffects(effect.slice(start, end), context, genExtraFrag);
		const effects = [];
		for (let i = start; i < end; i++) if (!skippedEffectIndexes.has(i)) effects.push(effect[i]);
		if (effects.length || genExtraFrag) return genEffects(effects, context, genExtraFrag);
		return [];
	}
	function genResolveAssets(kind, helper) {
		for (const name of context.ir[kind]) push(NEWLINE, `const ${(0, _vue_compiler_dom.toValidAssetId)(name, kind)} = `, ...genCall(context.helper(helper), JSON.stringify(name)));
	}
}
function markSlotRootOperations(block) {
	for (let i = 0; i < block.returns.length; i++) {
		const child = findReturnedDynamic$1(block, block.returns[i]);
		const operation = child && child.operation;
		if (!operation) continue;
		if (operation.type === 15) markSlotRootIf(operation);
		else if (operation.type === 16) markSlotRootFor(operation);
		else if (operation.type === 12) markSlotRootComponent(operation);
	}
}
function markSlotRootIf(operation) {
	if (!operation.once) operation.slotRoot = true;
	markSlotRootOperations(operation.positive);
	const negative = operation.negative;
	if (!negative) return;
	if (negative.type === 15) markSlotRootIf(negative);
	else markSlotRootOperations(negative);
}
function markSlotRootFor(operation) {
	if (!operation.once) operation.slotRoot = true;
	markSlotRootOperations(operation.render);
}
function markSlotRootComponent(operation) {
	if (!operation.once && operation.dynamic && !operation.dynamic.isStatic) operation.slotRoot = true;
}
function findReturnedDynamic$1(block, id) {
	for (let i = 0; i < block.dynamic.children.length; i++) {
		const child = block.dynamic.children[i];
		if (child.id === id) return child;
	}
}
function collectSingleUseAssetComponents(block) {
	const usageMap = /* @__PURE__ */ new Map();
	const seenOperations = /* @__PURE__ */ new Set();
	visitBlock(block, true);
	const names = /* @__PURE__ */ new Set();
	for (const [name, usage] of usageMap) if (usage.count === 1 && usage.root) names.add(name);
	return names;
	function visitBlock(block, rootCandidate) {
		visitDynamic(block.dynamic, rootCandidate);
		for (const operation of block.operation) visitOperation(operation, rootCandidate);
		for (const effect of block.effect) for (const operation of effect.operations) visitOperation(operation, false);
	}
	function visitDynamic(dynamic, rootCandidate) {
		if (dynamic.operation) visitOperation(dynamic.operation, rootCandidate);
		for (const child of dynamic.children) visitDynamic(child, rootCandidate);
	}
	function visitOperation(operation, rootCandidate) {
		if (seenOperations.has(operation)) return;
		seenOperations.add(operation);
		if (operation.type === 12) {
			if (operation.asset) {
				const usage = usageMap.get(operation.tag) || {
					count: 0,
					root: false
				};
				usage.count++;
				if (rootCandidate) usage.root = true;
				usageMap.set(operation.tag, usage);
			}
			visitSlots(operation.slots);
			return;
		}
		switch (operation.type) {
			case 15:
				visitBlock(operation.positive, false);
				if (operation.negative) if (operation.negative.type === 15) visitOperation(operation.negative, false);
				else visitBlock(operation.negative, false);
				break;
			case 16:
				visitBlock(operation.render, false);
				break;
			case 17:
				visitBlock(operation.block, false);
				break;
			case 13:
				if (operation.fallback) visitBlock(operation.fallback, false);
				break;
		}
	}
	function visitSlots(slots) {
		for (const slot of slots) switch (slot.slotType) {
			case 0:
				for (const name in slot.slots) visitBlock(slot.slots[name], false);
				break;
			case 1:
			case 2:
				visitBlock(slot.fn, false);
				break;
			case 3:
				visitSlots([slot.positive]);
				if (slot.negative) visitSlots([slot.negative]);
				break;
		}
	}
}
//#endregion
//#region packages/compiler-vapor/src/generate.ts
const idWithTrailingDigitsRE = /^([A-Za-z_$][\w$]*)(\d+)$/;
const helperNameAliases = {
	withVaporKeys: "withKeys",
	withVaporModifiers: "withModifiers"
};
var CodegenContext = class {
	withExpressionReplacements(map, fn) {
		if (map.size === 0) return fn();
		this.expressionReplacements.unshift(map);
		try {
			return fn();
		} finally {
			(0, _vue_shared.remove)(this.expressionReplacements, map);
		}
	}
	getExpressionReplacement(node) {
		for (const map of this.expressionReplacements) {
			const replacement = map.get(node);
			if (replacement) return replacement;
		}
		return node;
	}
	withId(fn, map) {
		const { identifiers } = this;
		const ids = Object.keys(map);
		for (const id of ids) {
			identifiers[id] || (identifiers[id] = []);
			identifiers[id].unshift(map[id] || id);
		}
		const ret = fn();
		ids.forEach((id) => (0, _vue_shared.remove)(identifiers[id], map[id] || id));
		return ret;
	}
	enterBlock(block) {
		const parent = this.block;
		this.block = block;
		return () => this.block = parent;
	}
	enterSlotBlock() {
		const parent = this.inSlotBlock;
		this.inSlotBlock = true;
		return () => this.inSlotBlock = parent;
	}
	enterScope() {
		return [this.scopeLevel++, () => this.scopeLevel--];
	}
	isHelperNameAvailable(name) {
		if (this.bindingNames.has(name)) return false;
		for (const alias of this.helpers.values()) if (alias === name) return false;
		return true;
	}
	initNextIdMap() {
		if (this.bindingNames.size === 0) return;
		const map = /* @__PURE__ */ new Map();
		for (const name of this.bindingNames) {
			const m = idWithTrailingDigitsRE.exec(name);
			if (!m) continue;
			const prefix = m[1];
			const num = Number(m[2]);
			let set = map.get(prefix);
			if (!set) map.set(prefix, set = /* @__PURE__ */ new Set());
			set.add(num);
		}
		for (const [prefix, nums] of map) this.nextIdMap.set(prefix, buildNextIdMap(nums));
	}
	tName(i) {
		let name = this.templateVars.get(i);
		if (name) return name;
		const map = this.nextIdMap.get("t");
		let lastId = this.lastIdMap.get("t") || -1;
		for (let j = this.lastTIndex + 1; j <= i; j++) this.templateVars.set(j, name = `t${lastId = getNextId(map, Math.max(j, lastId + 1))}`);
		this.lastIdMap.set("t", lastId);
		this.lastTIndex = i;
		return name;
	}
	pName(i) {
		const map = this.nextIdMap.get("p");
		let lastId = this.lastIdMap.get("p") || -1;
		this.lastIdMap.set("p", lastId = getNextId(map, Math.max(i, lastId + 1)));
		return `p${lastId}`;
	}
	constructor(ir, options) {
		this.ir = ir;
		this.bindingNames = /* @__PURE__ */ new Set();
		this.helpers = /* @__PURE__ */ new Map();
		this.needsTemplateRefSetter = false;
		this.inSlotBlock = false;
		this.helper = (name) => {
			if (this.helpers.has(name)) return this.helpers.get(name);
			const base = `_${helperNameAliases[name] || name}`;
			if (this.isHelperNameAvailable(base)) {
				this.helpers.set(name, base);
				return base;
			}
			const map = this.nextIdMap.get(base);
			let next = 1;
			while (true) {
				const alias = `${base}${getNextId(map, next)}`;
				if (this.isHelperNameAvailable(alias)) {
					this.helpers.set(name, alias);
					return alias;
				}
				next++;
			}
		};
		this.delegates = /* @__PURE__ */ new Set();
		this.identifiers = Object.create(null);
		this.expressionReplacements = [];
		this.seenInlineHandlerNames = Object.create(null);
		this.scopeLevel = 0;
		this.templateVars = /* @__PURE__ */ new Map();
		this.nextIdMap = /* @__PURE__ */ new Map();
		this.lastIdMap = /* @__PURE__ */ new Map();
		this.lastTIndex = -1;
		const defaultOptions = {
			mode: "module",
			prefixIdentifiers: true,
			sourceMap: false,
			filename: `template.vue.html`,
			scopeId: null,
			runtimeGlobalName: `Vue`,
			runtimeModuleName: `vue`,
			ssrRuntimeModuleName: "vue/server-renderer",
			ssr: false,
			isTS: false,
			inSSR: false,
			inline: false,
			bindingMetadata: {},
			expressionPlugins: []
		};
		this.options = (0, _vue_shared.extend)(defaultOptions, options);
		this.block = ir.block;
		this.bindingNames = new Set(this.options.bindingMetadata ? Object.keys(this.options.bindingMetadata) : []);
		this.initNextIdMap();
		this.staticTemplateRefHelperCandidate = getStaticTemplateRefHelperCandidate(ir.block);
	}
};
function generate(ir, options = {}) {
	const [frag, push] = buildCodeFragment();
	const context = new CodegenContext(ir, options);
	const { inline, bindingMetadata } = options;
	const functionName = "render";
	const args = ["_ctx"];
	if (bindingMetadata && !inline) args.push("$props", "$emit", "$attrs", "$slots");
	const signature = (options.isTS ? args.map((arg) => `${arg}: any`) : args).join(", ");
	if (!inline) push(NEWLINE, `export function ${functionName}(${signature}) {`);
	push(INDENT_START);
	const templateRefSetterHelper = ir.hasTemplateRef ? context.helper("createTemplateRefSetter") : void 0;
	const body = genBlockContent(ir.block, context, true);
	if (context.needsTemplateRefSetter) push(NEWLINE, `const ${setTemplateRefIdent} = ${templateRefSetterHelper}()`);
	else if (templateRefSetterHelper) context.helpers.delete("createTemplateRefSetter");
	push(...body);
	push(INDENT_END, NEWLINE);
	if (!inline) push("}");
	const delegates = genDelegates(context);
	const templates = genTemplates(ir.template.entries, context);
	const preamble = genHelperImports(context) + genAssetImports(context) + templates + delegates;
	const newlineCount = [...preamble].filter((c) => c === "\n").length;
	if (newlineCount && !inline) frag.unshift(...new Array(newlineCount).fill(LF));
	let [code, map] = codeFragmentToString(frag, context);
	if (!inline) code = preamble + code;
	return {
		code,
		ast: ir,
		preamble,
		map: map && map.toJSON(),
		helpers: new Set(Array.from(context.helpers.keys()))
	};
}
function genDelegates({ delegates, helper }) {
	return delegates.size ? genCall(helper("delegateEvents"), ...Array.from(delegates).map((v) => `"${v}"`)).join("") + "\n" : "";
}
function genHelperImports({ helpers, options }) {
	let imports = "";
	if (helpers.size) imports += `import { ${Array.from(helpers).map(([h, alias]) => `${h} as ${alias}`).join(", ")} } from '${options.runtimeModuleName}';\n`;
	return imports;
}
function genAssetImports({ ir }) {
	const assetImports = ir.node.imports;
	let imports = "";
	for (const assetImport of assetImports) {
		const name = assetImport.exp.content;
		imports += `import ${name} from '${assetImport.path}';\n`;
	}
	return imports;
}
function getStaticTemplateRefHelperCandidate(block) {
	if (block.operation.length !== 1) return;
	const operation = block.operation[0];
	if (operation.type === 9 && !operation.effect && !operation.refFor && operation.value.isStatic) return operation;
}
//#endregion
//#region packages/compiler-vapor/src/transforms/vBind.ts
function normalizeBindShorthand(arg, context) {
	if (arg.type !== 4 || !arg.isStatic) {
		context.options.onError((0, _vue_compiler_dom.createCompilerError)(53, arg.loc));
		return (0, _vue_compiler_dom.createSimpleExpression)("", true, arg.loc);
	}
	const exp = (0, _vue_compiler_dom.createSimpleExpression)((0, _vue_shared.camelize)(arg.content), false, arg.loc);
	exp.ast = null;
	return exp;
}
const transformVBind = (dir, node, context) => {
	const { loc, modifiers } = dir;
	let { exp } = dir;
	let arg = dir.arg;
	const modifiersString = modifiers.map((s) => s.content);
	if (!exp) exp = normalizeBindShorthand(arg, context);
	if (!exp.content.trim()) {
		context.options.onError((0, _vue_compiler_dom.createCompilerError)(34, loc));
		exp = (0, _vue_compiler_dom.createSimpleExpression)("", true, loc);
	}
	const isComponent = node.tagType === 1;
	const isDom2DataAttr = context.options.platform && arg.isStatic && arg.content.length > 5 && arg.content.startsWith("data-");
	exp = resolveExpression(exp, isComponent || isDom2DataAttr);
	arg = resolveExpression(arg);
	if (arg.isStatic && isReservedProp(arg.content)) return;
	let camel = false;
	if (modifiersString.includes("camel")) if (arg.isStatic) arg = (0, _vue_shared.extend)({}, arg, { content: (0, _vue_shared.camelize)(arg.content) });
	else camel = true;
	return {
		key: arg,
		value: exp,
		loc,
		runtimeCamelize: camel,
		modifier: modifiersString.includes("prop") ? "." : modifiersString.includes("attr") ? "^" : void 0
	};
};
//#endregion
//#region packages/compiler-vapor/src/transforms/vHtml.ts
function ignoreVHtmlChildren(node, context, clear) {
	if (!node.children.length) return;
	const dir = (0, _vue_compiler_dom.findDir)(node, "html");
	if (!dir) return;
	context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(55, dir.loc));
	if (clear === "node") node.children.length = 0;
	else context.childrenTemplate.length = 0;
}
const transformVHtml = (dir, node, context) => {
	let { exp, loc } = dir;
	if (!exp) {
		context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(54, loc));
		exp = EMPTY_EXPRESSION;
	}
	ignoreVHtmlChildren(node, context, "template");
	context.registerEffect([exp], {
		type: 8,
		node,
		element: context.reference(),
		value: exp,
		isComponent: node.tagType === 1
	});
};
//#endregion
//#region packages/compiler-vapor/src/errors.ts
function createVaporCompilerError(code, loc) {
	return (0, _vue_compiler_dom.createCompilerError)(code, loc, VaporErrorMessages);
}
const VaporErrorCodes = {
	"X_V_PLACEHOLDER": 100,
	"100": "X_V_PLACEHOLDER",
	"X_DYNAMIC_FLATTEN_NOT_SUPPORTED": 101,
	"101": "X_DYNAMIC_FLATTEN_NOT_SUPPORTED",
	"__EXTEND_POINT__": 102,
	"102": "__EXTEND_POINT__"
};
const VaporErrorMessages = {
	[100]: `[placeholder]`,
	[101]: "The value of flatten attribute must be a static boolean value.",
	[102]: ``
};
//#endregion
//#region packages/compiler-vapor/src/transforms/transformElement.ts
const isReservedProp = /* @__PURE__ */ (0, _vue_shared.makeMap)(",key,ref,ref_for,ref_key,");
const transformElement = (node, context) => {
	let effectIndex = context.block.effect.length;
	const getEffectIndex = () => effectIndex++;
	let operationIndex = context.block.operation.length;
	const getOperationIndex = () => operationIndex++;
	if (node.type === 1 && node.children.length) ignoreVHtmlChildren(node, context, "node");
	let parentSlots;
	if (node.type === 1 && (node.tagType === 1 || context.options.isCustomElement(node.tag))) {
		parentSlots = context.slots;
		context.slots = [];
	}
	return function postTransformElement() {
		({node} = context);
		if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1))) return;
		const useCreateElement = shouldUseCreateElement(node, context);
		const isComponent = node.tagType === 1 || useCreateElement;
		const isDynamicComponent = isComponentTag(node.tag);
		const staticKey = resolveStaticKey(node, context, isComponent);
		const propsResult = buildProps(node, context, isComponent, isDynamicComponent, getEffectIndex);
		const singleRoot = context.isSingleRoot;
		if (isComponent) transformComponentElement(node, propsResult, staticKey, singleRoot, context, isDynamicComponent, useCreateElement);
		else transformNativeElement(node, propsResult, staticKey, singleRoot, context, getEffectIndex, context.root === context.effectiveParent || canOmitEndTag(node, context), getOperationIndex);
		if (parentSlots) context.slots = parentSlots;
	};
};
function canOmitEndTag(node, context) {
	const { block, parent } = context;
	if (!parent) return false;
	if (block !== parent.block) return true;
	if (context.templateCloseTags && (context.templateCloseTags.has(node.tag) || (0, _vue_shared.isAlwaysCloseTag)(node.tag) || (0, _vue_shared.isFormattingTag)(node.tag)) || context.templateCloseBlocks && (0, _vue_shared.isBlockTag)(node.tag)) return false;
	if ((0, _vue_shared.isAlwaysCloseTag)(node.tag) && !context.isOnRightmostPath) return false;
	if ((0, _vue_shared.isFormattingTag)(node.tag) || parent.node.type === 1 && node.tag === parent.node.tag) return context.isOnRightmostPath;
	return context.isLastEffectiveChild;
}
function getChildTemplateCloseState(context) {
	const { node } = context;
	if (node.type !== 1 || node.tagType !== 0 || shouldUseCreateElement(node, context)) return;
	const inSameTemplateAsParent = isInSameTemplateAsParent(context);
	const inheritedTags = inSameTemplateAsParent ? context.templateCloseTags : void 0;
	const inheritedBlocks = inSameTemplateAsParent && context.templateCloseBlocks;
	if (context.root === context.effectiveParent || canOmitEndTag(node, context) || (0, _vue_shared.isVoidTag)(node.tag)) return inheritedTags || inheritedBlocks ? {
		tags: inheritedTags,
		blocks: inheritedBlocks
	} : void 0;
	const tags = new Set(inheritedTags);
	tags.add(node.tag);
	return {
		tags,
		blocks: inheritedBlocks || (0, _vue_shared.isInlineTag)(node.tag)
	};
}
function isInSameTemplateAsParent(context) {
	const { parent, node, block } = context;
	if (!parent || block !== parent.block) return false;
	const parentNode = parent.node;
	if (parentNode.type !== 1 || parentNode.tagType !== 0) return false;
	return !shouldUseCreateElement(parentNode, parent) && (0, _vue_compiler_dom.isValidHTMLNesting)(parentNode.tag, node.tag);
}
function transformComponentElement(node, propsResult, staticKey, singleRoot, context, isDynamicComponent, useCreateElement) {
	const dynamicComponent = isDynamicComponent ? resolveDynamicComponent(node) : void 0;
	let { tag } = node;
	let asset = true;
	if (!dynamicComponent && !useCreateElement) {
		const { isEasyComponent } = context.options;
		const isEasyCom = isEasyComponent && isEasyComponent(tag);
		if (!isEasyCom) {
			const fromSetup = resolveSetupReference(tag, context);
			if (fromSetup) {
				tag = fromSetup;
				asset = false;
			}
			const builtInTag = isBuiltInComponent(tag);
			if (builtInTag) {
				tag = builtInTag;
				asset = false;
			}
			const dotIndex = tag.indexOf(".");
			if (dotIndex > 0) {
				const ns = resolveSetupReference(tag.slice(0, dotIndex), context);
				if (ns) {
					tag = ns + tag.slice(dotIndex);
					asset = false;
				}
			}
		}
		if (asset) {
			if (!isEasyCom && context.selfName && (0, _vue_shared.capitalize)((0, _vue_shared.camelize)(tag)) === context.selfName) tag += `__self`;
			context.component.add(tag);
		}
	}
	context.dynamic.flags |= 6;
	const id = context.reference();
	const flatten = extractElementFlatten(node, propsResult, context);
	context.dynamic.operation = {
		type: 12,
		node,
		id,
		...context.effectBoundary(),
		tag,
		props: propsResult[0] ? propsResult[1] : [propsResult[1]],
		asset,
		root: singleRoot,
		slots: [...context.slots],
		once: context.inVOnce,
		dynamic: dynamicComponent,
		useCreateElement,
		flatten
	};
	if (staticKey) context.registerOperation(createSetBlockKey(id, staticKey, node));
	context.slots = [];
}
function extractElementFlatten(node, propsResult, context) {
	if (!context.options.platform) return;
	const flatten = extractStaticBooleanProp(propsResult, "flatten", (loc) => {
		context.options.onError(createVaporCompilerError(101, loc));
	});
	if (flatten != null) node.flatten = flatten;
	return flatten;
}
function extractStaticBooleanProp(propsResult, name, onInvalid) {
	const groups = propsResult[0] ? propsResult[1] : [propsResult[1]];
	for (const props of groups) {
		if (!Array.isArray(props)) continue;
		for (let i = 0; i < props.length; i++) {
			const prop = props[i];
			if (prop.key.isStatic && prop.key.content === name && !prop.handler && !prop.model) {
				const value = parseStaticAttrBooleanExpression(prop.values[0]);
				props.splice(i, 1);
				if (value == null) {
					onInvalid && onInvalid(prop.values[0].loc);
					return;
				}
				return value;
			}
		}
	}
}
function resolveDynamicComponent(node) {
	const isProp = findProp$1(node, "is", false, true);
	if (!isProp) return;
	if (isProp.type === 6) return isProp.value && (0, _vue_compiler_dom.createSimpleExpression)(isProp.value.content, true);
	else return isProp.exp || (0, _vue_shared.extend)((0, _vue_compiler_dom.createSimpleExpression)(`is`, false, isProp.arg.loc), { ast: null });
}
function resolveSetupReference(name, context) {
	const bindings = context.options.bindingMetadata;
	if (!bindings || bindings.__isScriptSetup === false) return;
	const camelName = (0, _vue_shared.camelize)(name);
	const PascalName = (0, _vue_shared.capitalize)(camelName);
	return bindings[name] ? name : bindings[camelName] ? camelName : bindings[PascalName] ? PascalName : void 0;
}
const dynamicKeys = ["indeterminate"];
const NEEDS_QUOTES_RE = /[\s"'`=<>]/;
const UNSAFE_ATTR_NAME_RE = /[\u0000-\u0020"'<=/>]/;
function isDataProp(prop) {
	const name = prop.key.content;
	return prop.key.isStatic && name.length > 5 && name.startsWith("data-");
}
function transformNativeElement(node, propsResult, staticKey, singleRoot, context, getEffectIndex, omitEndTag, getOperationIndex) {
	const isDom2 = !!context.options.platform;
	if (isDom2) omitEndTag = false;
	if (isDom2) extractElementFlatten(node, propsResult, context);
	const { tag } = node;
	const { scopeId } = context.options;
	let template = "";
	template += `<${tag}`;
	if (scopeId) template += ` ${scopeId}`;
	if (isDom2) {
		if (context.effectiveParent === context.root) template += ` gen-vue-id=""`;
		if (singleRoot) {
			template += ` gen-flag-flatten=""`;
			const rootElementTagName = context.options.rootElementTagName;
			if (rootElementTagName) {
				template += ` custom-tag-name="${rootElementTagName}"`;
				if (context.options.rootElementFromUniModule) template += ` gen-root-custom-native="${rootElementTagName}"`;
			}
		}
		if (node.flatten) template += ` flatten`;
	}
	const dynamicProps = [];
	if (propsResult[0]) {
		const [, dynamicArgs, expressions] = propsResult;
		context.registerEffect(expressions, {
			type: 4,
			node,
			element: context.reference(),
			props: dynamicArgs,
			tag,
			root: singleRoot && context.effectiveParent === context.root && context.options.componentType === "component"
		}, getEffectIndex);
	} else {
		const changeProps = [];
		if (isDom2) {
			const resolveChangeProp = context.options.resolveChangeProp;
			if (resolveChangeProp) changeProps.push(...resolveChangeProp(propsResult[1], context));
			const checkStaticProp = context.options.checkStaticProp;
			if (checkStaticProp) {
				const props = propsResult[1];
				const indicesToRemove = [];
				for (let i = 0; i < props.length; i++) {
					const prop = props[i];
					const { key, values } = prop;
					if (isDataProp(prop) || key.content.startsWith("change:") || changeProps.includes(key.content)) continue;
					if (key.isStatic && values.length === 1 && !["class", "style"].includes(key.content)) {
						let endLoc = values[0].loc;
						if (endLoc === _vue_compiler_dom.locStub) endLoc = key.loc;
						if (!checkStaticProp(values.length === 1 && values[0].isStatic, key.content, values[0].content, {
							start: key.loc.start,
							end: endLoc.end
						}, node, context)) indicesToRemove.push(i);
					}
				}
				for (let i = indicesToRemove.length - 1; i >= 0; i--) props.splice(indicesToRemove[i], 1);
			}
		}
		let hasStaticStyle = false;
		let hasClass = false;
		const datasetProps = [];
		let prevWasQuoted = false;
		const appendTemplateProp = (key, value = "", generated = false) => {
			if (!prevWasQuoted) template += ` `;
			template += key;
			if (value) {
				const escapedValue = generated ? escapeGeneratedAttrValue(value) : value.replace(/"/g, "&quot;");
				template += (prevWasQuoted = NEEDS_QUOTES_RE.test(value)) ? `="${escapedValue}"` : `=${escapedValue}`;
			} else prevWasQuoted = false;
		};
		for (const prop of propsResult[1]) {
			const { key, values } = prop;
			const canStringifyAttrName = key.isStatic && !UNSAFE_ATTR_NAME_RE.test(key.content);
			let foldedValue;
			if (isDom2) {
				if (isDataProp(prop)) {
					datasetProps.push(prop);
					continue;
				}
				if (key.content.startsWith("change:")) {
					dynamicProps.push(key.content);
					values[0].isStatic = false;
					context.registerEffect(values, {
						type: 20,
						node,
						prop
					}, getEffectIndex);
					continue;
				}
				if (key.content === "class") hasClass = true;
			}
			if (canStringifyAttrName && context.imports.some((imported) => values[0].content.includes(imported.exp.content))) {
				if (!prevWasQuoted) template += ` `;
				template += `${key.content}="${IMPORT_EXP_START}${values[0].content}${IMPORT_EXP_END}"`;
				prevWasQuoted = true;
			} else if (canStringifyAttrName && values.length === 1 && (values[0].isStatic || values[0].content === "''") && !dynamicKeys.includes(key.content)) {
				if (isDom2 && key.content === "style") {
					hasStaticStyle = true;
					const checkStaticStyle = context.options.checkStaticStyle;
					if (checkStaticStyle) checkStaticStyle(values[0].content, {
						start: key.loc.start,
						end: values[0].loc.end
					}, node, context);
				}
				if (isDom2 && (key.content === "class" || key.content === "hover-class" || key.content === "style" && context.options.disableStaticStyle)) {
					dynamicProps.push(key.content);
					context.registerEffect(values, {
						type: 3,
						node,
						element: context.reference(),
						prop,
						tag
					}, getEffectIndex, getOperationIndex);
					continue;
				}
				const value = values[0].content === "''" ? "" : values[0].content;
				appendTemplateProp(key.content, value);
			} else if (canStringifyAttrName && !prop.modifier && (0, _vue_shared.isBooleanAttr)(key.content) && (foldedValue = foldBooleanAttrValue(values)) != null) {
				if (foldedValue) appendTemplateProp(key.content);
			} else if (canStringifyAttrName && !prop.modifier && !isDom2 && hasBoundValue(values) && (foldedValue = key.content === "class" ? foldClassValues(values) : key.content === "style" ? foldStyleValues(values) : void 0) != null) {
				if (foldedValue) appendTemplateProp(key.content, foldedValue, true);
			} else context.registerEffect(values, {
				type: 3,
				node,
				isChangeProp: changeProps.includes(key.content),
				element: context.reference(),
				prop,
				tag
			}, getEffectIndex);
		}
		if (hasStaticStyle && hasClass) template += ` ext:style`;
		if (datasetProps.length) {
			const expressions = datasetProps.flatMap((prop) => prop.values);
			context.registerEffect(expressions, {
				type: 3,
				node,
				element: context.reference(),
				prop: {
					...datasetProps[0],
					datasetProps
				},
				tag,
				root: singleRoot && context.effectiveParent === context.root && context.options.componentType === "component"
			}, getEffectIndex);
		}
	}
	template += `>` + context.childrenTemplate.join("");
	if (!(0, _vue_shared.isVoidTag)(tag) && !omitEndTag) template += `</${tag}>`;
	context.templateRoot = singleRoot;
	if (context.parent && context.parent.node.type === 1 && !(0, _vue_compiler_dom.isValidHTMLNesting)(context.parent.node.tag, tag)) {
		context.reference();
		context.dynamic.template = context.pushTemplate(template);
		context.dynamic.flags |= 6;
	} else context.template += template;
	if (staticKey) context.registerOperation(createSetBlockKey(context.reference(), staticKey, node));
}
function escapeGeneratedAttrValue(value) {
	return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
function foldBooleanAttrValue(values) {
	if (values.length !== 1) return;
	const evaluated = evaluateConstantExpression(values[0]);
	if (!evaluated) return;
	const value = evaluated.value;
	if (value === true || value === false || value == null) return (0, _vue_shared.includeBooleanAttr)(value);
}
function foldStyleValues(values) {
	const evaluatedValues = [];
	for (const value of values) {
		const evaluated = evaluateConstantExpression(value);
		if (!evaluated || !isStaticStyleValue(evaluated.value)) return;
		evaluatedValues.push(evaluated.value);
	}
	return (0, _vue_shared.stringifyStyle)((0, _vue_shared.normalizeStyle)(evaluatedValues.length === 1 ? evaluatedValues[0] : evaluatedValues));
}
function isStaticStyleValue(value) {
	if (typeof value === "string") return true;
	if (!value || typeof value !== "object" || Array.isArray(value)) return false;
	for (const key in value) {
		const propValue = value[key];
		if (!isSafeStylePropertyName(key) || !isSafeStylePropertyValue(propValue)) return false;
	}
	return true;
}
function isSafeStylePropertyName(key) {
	return !!key && !/[;:]/.test(key);
}
function isSafeStylePropertyValue(value) {
	return typeof value === "number" || typeof value === "string" && !value.includes(";");
}
function hasBoundValue(values) {
	return values.some((value) => !value.isStatic && value.content !== "''");
}
function foldClassValues(values) {
	let templateValue = "";
	let changed = false;
	for (const value of values) {
		const evaluated = evaluateConstantExpression(value);
		if (evaluated) {
			const normalized = (0, _vue_shared.normalizeClass)(evaluated.value);
			if (normalized) templateValue = appendClass(templateValue, normalized);
			else changed = true;
			continue;
		}
		return;
	}
	return changed || templateValue ? templateValue : void 0;
}
function appendClass(base, value) {
	return base ? value ? `${base} ${value}` : base : value;
}
function getObjectPropertyName(prop) {
	const key = prop.key;
	if (key.type === "Identifier") return key.name;
	else if (key.type === "StringLiteral") return key.value;
	else if (key.type === "NumericLiteral") return String(key.value);
}
function evaluateConstantExpression(node) {
	if (node.isStatic) return { value: node.content };
	const ast = node.ast;
	if (ast === null) {
		if (node.content === "true") return { value: true };
		else if (node.content === "false") return { value: false };
		else if (node.content === "null") return { value: null };
		else if (node.content === "undefined") return { value: void 0 };
	}
	if (!ast) return;
	return evaluateConstantAst(ast);
}
function evaluateConstantAst(node) {
	switch (node.type) {
		case "StringLiteral": return { value: node.value };
		case "NumericLiteral": return { value: node.value };
		case "BooleanLiteral": return { value: node.value };
		case "NullLiteral": return { value: null };
		case "Identifier": return node.name === "undefined" ? { value: void 0 } : void 0;
		case "UnaryExpression":
			if (node.operator === "void") return { value: void 0 };
			else if (node.operator === "-") {
				const value = evaluateConstantAst(node.argument);
				return value && typeof value.value === "number" ? { value: -value.value } : void 0;
			}
			return;
		case "TemplateLiteral": return evaluateTemplateLiteral(node);
		case "ObjectExpression": return evaluateObjectExpression(node);
	}
}
function evaluateTemplateLiteral(node) {
	if (node.type !== "TemplateLiteral") return;
	let value = "";
	for (const [index, quasi] of node.quasis.entries()) {
		value += quasi.value.cooked || "";
		const expression = node.expressions[index];
		if (expression) {
			const evaluated = evaluateConstantAst(expression);
			if (!evaluated) return;
			value += evaluated.value;
		}
	}
	return { value };
}
function evaluateObjectExpression(node) {
	const value = {};
	for (const prop of node.properties) {
		if (prop.type !== "ObjectProperty" || prop.computed) return;
		const key = getObjectPropertyName(prop);
		if (key == null) return;
		const evaluated = evaluateConstantAst(prop.value);
		if (!evaluated) return;
		value[key] = evaluated.value;
	}
	return { value };
}
function resolveStaticKey(node, context, isComponent) {
	const keyProp = findProp$1(node, "key", false, true);
	if (!keyProp) return;
	if (keyProp.type === 6) return keyProp.value ? (0, _vue_compiler_dom.createSimpleExpression)(keyProp.value.content, true, keyProp.value.loc) : EMPTY_EXPRESSION;
	const value = keyProp.exp || normalizeBindShorthand(keyProp.arg, context);
	if (isStaticExpression(value, context.options.bindingMetadata)) return resolveExpression(value, isComponent);
}
function createSetBlockKey(element, value, node) {
	return {
		type: 2,
		node,
		element,
		value
	};
}
function buildProps(node, context, isComponent, isDynamicComponent, getEffectIndex) {
	const props = node.props;
	if (props.length === 0) return [false, []];
	const dynamicArgs = [];
	const dynamicExpr = [];
	let results = [];
	function pushMergeArg() {
		if (results.length) {
			dynamicArgs.push(dedupeProperties(results));
			results = [];
		}
	}
	function pushStaticObjectLiteralProps(props) {
		if (dynamicArgs.length) {
			pushMergeArg();
			dynamicArgs.push(props);
		} else results.push(...props.map(toDirectiveResult));
	}
	for (const prop of props) {
		if (prop.type === 7 && !prop.arg) {
			if (prop.name === "bind") {
				if (prop.exp) {
					const objectLiteralProps = isComponent ? resolveComponentObjectLiteralBindProps(prop.exp, context, props, prop) : resolveNativeObjectLiteralBindProps(prop.exp, context, props, prop);
					if (objectLiteralProps) if (isComponent) pushStaticObjectLiteralProps(objectLiteralProps);
					else results.push(...objectLiteralProps.map(toDirectiveResult));
					else {
						dynamicExpr.push(prop.exp);
						pushMergeArg();
						dynamicArgs.push({
							kind: 0,
							value: prop.exp
						});
					}
				} else context.options.onError((0, _vue_compiler_dom.createCompilerError)(34, prop.loc));
				continue;
			} else if (prop.name === "on") {
				if (prop.exp) if (isComponent) {
					const objectLiteralProps = resolveComponentObjectLiteralOnProps(prop.exp, context, props, prop);
					if (objectLiteralProps) pushStaticObjectLiteralProps(objectLiteralProps);
					else {
						dynamicExpr.push(prop.exp);
						pushMergeArg();
						dynamicArgs.push({
							kind: 0,
							value: prop.exp,
							handler: true
						});
					}
				} else context.registerEffect([prop.exp], {
					type: 7,
					node,
					element: context.reference(),
					event: prop.exp
				}, getEffectIndex);
				else context.options.onError((0, _vue_compiler_dom.createCompilerError)(35, prop.loc));
				continue;
			}
		}
		if (isDynamicComponent && (prop.type === 6 && prop.name === "is" || prop.type === 7 && prop.name === "bind" && (0, _vue_compiler_dom.isStaticArgOf)(prop.arg, "is"))) continue;
		const result = transformProp(prop, node, context);
		if (result) {
			dynamicExpr.push(result.key, result.value);
			if (isComponent && !result.key.isStatic) {
				pushMergeArg();
				dynamicArgs.push((0, _vue_shared.extend)(resolveDirectiveResult(result), { kind: 1 }));
			} else results.push(result);
		}
	}
	if (dynamicArgs.length || results.some(({ key }) => !key.isStatic)) {
		pushMergeArg();
		return [
			true,
			dynamicArgs,
			dynamicExpr
		];
	}
	return [false, dedupeProperties(results)];
}
function resolveObjectLiteralProps(exp, context, keyTransform, isValidKey) {
	const ast = exp.ast;
	if (!ast || ast.type !== "ObjectExpression") return;
	const props = [];
	const knownKeys = /* @__PURE__ */ new Set();
	for (const property of ast.properties) {
		if (property.type !== "ObjectProperty" || property.computed) return;
		let key = getObjectPropertyName(property);
		if (key == null || key === "__proto__") return;
		if (isValidKey && !isValidKey(key)) return;
		if (keyTransform) key = keyTransform(key);
		if (knownKeys.has(key)) return;
		knownKeys.add(key);
		props.push({
			key: (0, _vue_compiler_dom.createSimpleExpression)(key, true),
			values: [resolveExpression(createObjectBindSubExpression(exp, property.value, context), true)]
		});
	}
	return props;
}
function resolveComponentObjectLiteralBindProps(exp, context, nodeProps, currentProp) {
	const props = resolveObjectLiteralProps(exp, context, void 0, isSafeObjectLiteralBindKey);
	if (!props || hasComponentObjectLiteralBindConflict(nodeProps, currentProp, props)) return;
	return props;
}
function resolveNativeObjectLiteralBindProps(exp, context, nodeProps, currentProp) {
	const props = resolveObjectLiteralProps(exp, context, void 0, isSafeNativeObjectLiteralBindKey);
	if (!props || hasNativeObjectLiteralBindConflict(nodeProps, currentProp, props)) return;
	return props;
}
function resolveComponentObjectLiteralOnProps(exp, context, nodeProps, currentProp) {
	const props = resolveObjectLiteralProps(exp, context, _vue_shared.toHandlerKey);
	if (!props || hasComponentObjectLiteralBindConflict(nodeProps, currentProp, props)) return;
	return props;
}
function isSafeNativeObjectLiteralBindKey(key) {
	return key !== "" && !UNSAFE_ATTR_NAME_RE.test(key) && isSafeObjectLiteralBindKey(key) && !(0, _vue_shared.isOn)(key) && key.charCodeAt(0) !== 46 && key.charCodeAt(0) !== 94;
}
function isSafeObjectLiteralBindKey(key) {
	return !isReservedProp(key);
}
function hasComponentObjectLiteralBindConflict(props, currentProp, objectLiteralProps) {
	const keys = createComponentConflictKeySet(objectLiteralProps.map((prop) => prop.key.content));
	for (const prop of props) {
		if (prop === currentProp) continue;
		let key;
		if (prop.type === 6) key = prop.name;
		else if (prop.name === "bind") {
			if (!prop.arg) {
				const bindKeys = getObjectLiteralKeys(prop.exp);
				if (bindKeys && hasComponentKeyOverlap(keys, bindKeys)) return true;
				continue;
			}
			key = getStaticBindKey(prop);
		} else if (prop.name === "on") key = getStaticHandlerKey(prop);
		else if (prop.name === "model") {
			if (hasComponentModelKey(keys, prop)) return true;
		}
		if (key && hasComponentKey(keys, key)) return true;
	}
	return false;
}
function hasComponentModelKey(keys, prop) {
	const { arg } = prop;
	if (arg && (arg.type !== 4 || !arg.isStatic)) return true;
	const key = arg ? arg.content : "modelValue";
	return hasComponentKey(keys, key) || hasComponentKey(keys, `onUpdate:${(0, _vue_shared.camelize)(key)}`) || prop.modifiers.length > 0 && hasComponentKey(keys, (0, _vue_shared.getModifierPropName)(key));
}
function hasNativeObjectLiteralBindConflict(props, currentProp, objectLiteralProps) {
	const keys = new Set(objectLiteralProps.map((prop) => prop.key.content));
	for (const prop of props) {
		if (prop === currentProp) continue;
		let key;
		if (prop.type === 6) key = prop.name;
		else if (prop.name === "bind") {
			if (!prop.arg) return true;
			key = getStaticBindKey(prop);
			if (!key) return true;
		}
		if (key && keys.has(key)) return true;
	}
	return false;
}
function getStaticBindKey(prop) {
	const { arg } = prop;
	if (!arg || arg.type !== 4 || !arg.isStatic) return;
	let key = arg.content;
	if (isReservedProp(key)) return;
	if (prop.modifiers.some((modifier) => modifier.content === "camel")) key = (0, _vue_shared.camelize)(key);
	return key;
}
function getStaticHandlerKey(prop) {
	const { arg } = prop;
	if (!arg || arg.type !== 4 || !arg.isStatic) return;
	let key = arg.content;
	if (key.startsWith("vue:")) key = `vnode-${key.slice(4)}`;
	const { nonKeyModifiers, eventOptionModifiers } = (0, _vue_compiler_dom.resolveModifiers)(`on${key}`, prop.modifiers, null, prop.loc);
	if (key.toLowerCase() === "click") {
		if (nonKeyModifiers.includes("middle")) key = "mouseup";
		if (nonKeyModifiers.includes("right")) key = "contextmenu";
	}
	key = (0, _vue_shared.toHandlerKey)((0, _vue_shared.camelize)(key));
	const optionPostfix = eventOptionModifiers.map(_vue_shared.capitalize).join("");
	if (optionPostfix) key += optionPostfix;
	return key;
}
function getObjectLiteralKeys(exp) {
	const ast = exp && exp.ast;
	if (!ast || ast.type !== "ObjectExpression") return;
	const keys = /* @__PURE__ */ new Set();
	for (const property of ast.properties) {
		if (property.type !== "ObjectProperty" || property.computed) return;
		const key = getObjectPropertyName(property);
		if (key == null) return;
		keys.add(key);
	}
	return keys;
}
function createComponentConflictKeySet(keys) {
	const normalized = /* @__PURE__ */ new Set();
	for (const key of keys) {
		normalized.add(key);
		normalized.add((0, _vue_shared.camelize)(key));
	}
	return normalized;
}
function hasComponentKey(keys, key) {
	return keys.has(key) || keys.has((0, _vue_shared.camelize)(key));
}
function hasComponentKeyOverlap(left, right) {
	for (const key of right) if (hasComponentKey(left, key)) return true;
	return false;
}
function createObjectBindSubExpression(source, node, context) {
	const start = node.start == null ? 0 : node.start - 1;
	const end = node.end == null ? source.content.length : node.end - 1;
	const content = source.content.slice(start, end);
	const expression = (0, _vue_compiler_dom.createSimpleExpression)(content, false, {
		start: (0, _vue_compiler_dom.advancePositionWithClone)(source.loc.start, source.content, start),
		end: (0, _vue_compiler_dom.advancePositionWithClone)(source.loc.start, source.content, end),
		source: content
	});
	expression.ast = (0, _vue_compiler_dom.isSimpleIdentifier)(content) ? null : (0, _babel_parser.parseExpression)(`(${content})`, getParserOptions(context.options.expressionPlugins));
	return expression;
}
function transformProp(prop, node, context) {
	let { name } = prop;
	if (prop.type === 6) {
		if (isReservedProp(name)) return;
		return {
			key: (0, _vue_compiler_dom.createSimpleExpression)(prop.name, true, prop.nameLoc),
			value: prop.value ? (0, _vue_compiler_dom.createSimpleExpression)(prop.value.content, true, prop.value.loc) : EMPTY_EXPRESSION
		};
	}
	const directiveTransform = context.options.directiveTransforms[name];
	if (directiveTransform) return directiveTransform(prop, node, context);
	if (!(0, _vue_shared.isBuiltInDirective)(name)) {
		const fromSetup = resolveSetupReference(`v-${name}`, context);
		if (fromSetup) name = fromSetup;
		else context.directive.add(name);
		context.registerOperation({
			type: 14,
			node,
			element: context.reference(),
			dir: prop,
			name,
			asset: !fromSetup
		});
	}
}
function dedupeProperties(results) {
	const knownProps = /* @__PURE__ */ new Map();
	const deduped = [];
	for (const result of results) {
		const prop = resolveDirectiveResult(result);
		if (!prop.key.isStatic) {
			deduped.push(prop);
			continue;
		}
		const name = prop.key.content;
		const existing = knownProps.get(name);
		if (existing && existing.handler === prop.handler) {
			if (name === "style" || name === "class" || prop.handler || name === "hover-class") mergePropValues(existing, prop);
		} else {
			knownProps.set(name, prop);
			deduped.push(prop);
		}
	}
	return deduped;
}
function resolveDirectiveResult(prop) {
	return (0, _vue_shared.extend)({}, prop, {
		value: void 0,
		values: [prop.value]
	});
}
function toDirectiveResult(prop) {
	return (0, _vue_shared.extend)({}, prop, {
		values: void 0,
		value: prop.values[0]
	});
}
function mergePropValues(existing, incoming) {
	const newValues = incoming.values;
	existing.values.push(...newValues);
}
function isComponentTag(tag) {
	return tag === "component" || tag === "Component";
}
function shouldUseCreateElement(node, context) {
	return context.options.isCustomElement(node.tag) || node.tagType === 0 && node.tag === "template";
}
//#endregion
//#region packages/compiler-vapor/src/transforms/transformChildren.ts
const transformChildren = (node, context) => {
	const isFragment = node.type === 0 || node.type === 1 && (node.tagType === 3 || node.tagType === 1);
	if (!isFragment && node.type !== 1) return;
	const useCreateElement = node.type === 1 && shouldUseCreateElement(node, context);
	const childTemplateCloseState = !isFragment && !useCreateElement ? getChildTemplateCloseState(context) : void 0;
	for (const [i, child] of node.children.entries()) {
		const childContext = context.create(child, i);
		const isInSameTemplate = childTemplateCloseState && child.type === 1 && child.tagType === 0 && isInSameTemplateAsParent(childContext);
		childContext.templateCloseTags = isInSameTemplate ? childTemplateCloseState.tags : void 0;
		childContext.templateCloseBlocks = isInSameTemplate ? childTemplateCloseState.blocks : false;
		transformNode(childContext);
		const childDynamic = childContext.dynamic;
		if (isFragment) {
			childContext.reference();
			childContext.registerTemplate();
			if (!(childDynamic.flags & 2) || childDynamic.flags & 4) context.block.returns.push(childContext.dynamic.id);
		} else if (useCreateElement) {
			if (childContext.template !== "" || childDynamic.template != null || childDynamic.id !== void 0 || childDynamic.operation !== void 0 || childDynamic.hasDynamicChild === true) {
				childContext.reference();
				childContext.registerTemplate();
				childDynamic.flags |= 6;
			}
		} else context.childrenTemplate.push(childContext.template);
		if (childDynamic.hasDynamicChild || childDynamic.id !== void 0 || childDynamic.flags & 2 || childDynamic.flags & 4) context.dynamic.hasDynamicChild = true;
		childDynamic.type = child.type;
		if (child.type === 1) childDynamic.tag = child.tag;
		context.dynamic.children[i] = childDynamic;
	}
	if (!isFragment) processDynamicChildren(context);
};
function processDynamicChildren(context) {
	let prevDynamics = [];
	let staticCount = 0;
	const children = context.dynamic.children;
	let logicalIndex = 0;
	for (const [index, child] of children.entries()) {
		if (child.flags & 4) {
			child.logicalIndex = logicalIndex;
			prevDynamics.push(child);
			logicalIndex++;
		}
		if (!(child.flags & 2)) {
			child.logicalIndex = logicalIndex;
			if (prevDynamics.length) {
				if (staticCount) {
					context.childrenTemplate[index - prevDynamics.length] = `<!>`;
					prevDynamics[0].flags -= 2;
					const anchor = prevDynamics[0].anchor = context.increaseId();
					registerInsertion(prevDynamics, context, anchor);
				} else registerInsertion(prevDynamics, context, -1);
				prevDynamics = [];
			}
			staticCount++;
			logicalIndex++;
		}
	}
	if (prevDynamics.length) registerInsertion(prevDynamics, context, prevDynamics[0].logicalIndex, true);
}
function registerInsertion(dynamics, context, anchor, append) {
	for (const child of dynamics) {
		const logicalIndex = child.logicalIndex;
		if (child.template != null) context.registerOperation({
			type: 10,
			node: context.node,
			elements: dynamics.map((child) => child.id),
			parent: context.reference(),
			anchor: append ? void 0 : anchor
		});
		else if (child.operation && isBlockOperation(child.operation)) {
			child.operation.parent = context.reference();
			child.operation.anchor = anchor;
			child.operation.logicalIndex = logicalIndex;
			child.operation.append = append;
		}
	}
}
//#endregion
//#region packages/compiler-vapor/src/transforms/vOnce.ts
const transformVOnce = (node, context) => {
	if (node.type === 1 && (0, _vue_compiler_dom.findDir)(node, "once", true)) context.inVOnce = true;
};
//#endregion
//#region packages/shared/src/makeMap.ts
/**
* Make a map and return a function for checking if a key
* is in that map.
* IMPORTANT: all calls of this function must be prefixed with
* \/\*#\_\_PURE\_\_\*\/
* So that they can be tree-shaken if necessary.
*/
/* @__NO_SIDE_EFFECTS__ */
function makeMap$1(str) {
	const map = Object.create(null);
	for (const key of str.split(",")) map[key] = 1;
	return (val) => val in map;
}
/**
* Compiler only.
* Do NOT use in runtime code paths unless behind `__DEV__` flag.
*/
const isVoidTag = /* @__PURE__ */ makeMap$1("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr");
//#endregion
//#region packages/compiler-vapor/src/transforms/transformText.ts
const seen = /* @__PURE__ */ new WeakMap();
function markNonTemplate(node, context) {
	let seenNodes = seen.get(context.root);
	if (!seenNodes) {
		seenNodes = /* @__PURE__ */ new WeakSet();
		seen.set(context.root, seenNodes);
	}
	seenNodes.add(node);
}
const transformText = (node, context) => {
	if (!seen.has(context.root)) seen.set(context.root, /* @__PURE__ */ new WeakSet());
	if (seen.get(context.root).has(node)) {
		context.dynamic.flags |= 2;
		return;
	}
	const isFragment = node.type === 0 || node.type === 1 && (node.tagType === 3 || node.tagType === 1);
	if ((isFragment || node.type === 1 && node.tagType === 0) && node.children.length) {
		let hasInterp = false;
		let isAllTextLike = true;
		for (const c of node.children) if (c.type === 5) hasInterp = true;
		else if (c.type !== 2) isAllTextLike = false;
		if (!isFragment && isAllTextLike && hasInterp) {
			const elementContext = context;
			if (shouldUseCreateElement(node, elementContext)) processCreateElementTextContainer(node.children, elementContext);
			else processTextContainer(node.children, elementContext);
		} else if (hasInterp) for (let i = 0; i < node.children.length; i++) {
			const c = node.children[i];
			const prev = node.children[i - 1];
			if (c.type === 5 && prev && prev.type === 2) markNonTemplate(prev, context);
		}
	} else if (node.type === 5) processInterpolation(context);
	else if (node.type === 2) {
		var _context$parent;
		const parent = (_context$parent = context.parent) === null || _context$parent === void 0 ? void 0 : _context$parent.node;
		if (parent && parent.type === 1 && shouldUseCreateElement(parent, context.parent) && node.content[0] === "<") {
			materializeLiteralTextNode((0, _vue_compiler_dom.createSimpleExpression)(node.content, true, node.loc), context);
			return;
		}
		const isRootText = !parent || parent.type === 0 || parent.type === 1 && (parent.tagType === 3 || parent.tagType === 1);
		context.template += isRootText ? node.content : (0, _vue_shared.escapeHtml)(node.content);
	}
};
function processInterpolation(context) {
	const parentNode = context.parent.node;
	const values = processTextLikeChildren(collectAdjacentText(context), context);
	if (values.length === 0 && parentNode.type !== 0) return;
	const literalValues = values.map((v) => getLiteralExpressionValue(v));
	if (literalValues.every((v) => v != null) && parentNode.type !== 0) {
		const text = literalValues.join("");
		if (parentNode.type === 1 && shouldUseCreateElement(parentNode, context.parent) && text[0] === "<") {
			materializeLiteralTextNode((0, _vue_compiler_dom.createSimpleExpression)(text, true, context.node.loc), context);
			return;
		}
		const isElementChild = parentNode.type === 1 && parentNode.tagType === 0;
		context.template += isElementChild ? (0, _vue_shared.escapeHtml)(text) : text;
		return;
	}
	const isDom2 = !!context.options.platform;
	let isTextNode = false;
	let isInComponentSlot = false;
	let shouldReuseParentText = false;
	if (isDom2) {
		const grandNode = context.parent.parent && context.parent.parent.node;
		function isComponent(node) {
			return !!(node && node.type === 1 && node.tagType === 1);
		}
		isInComponentSlot = parentNode.type === 1 && (parentNode.tagType === 1 || (0, _vue_compiler_dom.isTemplateNode)(parentNode) && isComponent(grandNode));
		shouldReuseParentText = !!(!isInComponentSlot && parentNode.loc.source.startsWith("<slot") && parentNode.type === 1 && parentNode.tag === "template" && grandNode && grandNode.tag === "text" && parentNode.children.every((child) => isTextLike(child)));
		isTextNode = isInComponentSlot || shouldReuseParentText;
	}
	context.template += isDom2 ? isTextNode ? TEXT_NODE_PLACEHOLDER : TEXT_PLACEHOLDER : " ";
	const id = context.reference();
	if (values.length === 0) return;
	context.registerEffect(values, {
		type: 5,
		node: context.node,
		element: id,
		values
	});
}
function collectAdjacentText(context) {
	const children = context.parent.node.children;
	const nodes = [];
	const prev = children[context.index - 1];
	let index = prev && prev.type === 2 ? context.index - 1 : context.index;
	for (; index < children.length; index++) {
		const child = children[index];
		if (!isTextLike(child)) break;
		nodes.push(child);
	}
	return nodes;
}
function processTextContainer(children, context) {
	const values = processTextLikeChildren(children, context);
	const literals = values.map((value) => getLiteralExpressionValue(value));
	if (literals.every((l) => l != null)) context.childrenTemplate = literals.map((l) => (0, _vue_shared.escapeHtml)(String(l)));
	else {
		context.childrenTemplate = [context.options.platform ? TEXT_PLACEHOLDER : " "];
		context.registerOperation({
			type: 18,
			node: context.node,
			parent: context.reference()
		});
		context.registerEffect(values, {
			type: 5,
			node: context.node,
			element: context.reference(),
			values,
			generated: true
		});
	}
}
function registerSyntheticTextChild(context, template, values) {
	const id = context.increaseId();
	context.dynamic.children[context.node.children.length] = {
		id,
		flags: 6,
		children: [],
		template: context.pushTemplate(template)
	};
	context.dynamic.hasDynamicChild = true;
	if (values && values.length) context.registerEffect(values, {
		type: 5,
		node: context.node,
		element: id,
		values
	});
	return id;
}
function processCreateElementTextContainer(children, context) {
	registerSyntheticTextChild(context, "", processTextLikeChildren(children, context));
}
function materializeLiteralTextNode(value, context) {
	const id = context.reference();
	context.dynamic.flags |= 6;
	context.dynamic.template = context.pushTemplate("");
	context.registerEffect([value], {
		type: 5,
		node: context.node,
		element: id,
		values: [value]
	});
}
function processTextLikeChildren(nodes, context) {
	const exps = [];
	for (const node of nodes) {
		let exp;
		markNonTemplate(node, context);
		if (node.type === 2) exp = (0, _vue_compiler_dom.createSimpleExpression)(node.content, true, node.loc);
		else exp = node.content;
		if (exp.content) exps.push(exp);
	}
	return exps;
}
function isTextLike(node) {
	return node.type === 5 || node.type === 2;
}
//#endregion
//#region packages/compiler-vapor/src/transforms/vText.ts
const transformVText = (dir, node, context) => {
	let { exp, loc } = dir;
	if (!exp) {
		context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(56, loc));
		exp = EMPTY_EXPRESSION;
	}
	if (node.children.length) {
		context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(57, loc));
		context.childrenTemplate.length = 0;
		for (const child of node.children) markNonTemplate(child, context);
	}
	if (isVoidTag(context.node.tag)) return;
	const literal = getLiteralExpressionValue(exp);
	const useCreateElement = shouldUseCreateElement(context.node, context);
	if (literal != null) if (useCreateElement) {
		const id = registerSyntheticTextChild(context, "", [exp]);
		context.registerOperation({
			type: 10,
			node,
			elements: [id],
			parent: context.reference()
		});
	} else context.childrenTemplate = [String(literal)];
	else {
		const isComponent = node.tagType === 1;
		let id;
		if (useCreateElement) {
			id = registerSyntheticTextChild(context, "");
			context.registerOperation({
				type: 10,
				node,
				elements: [id],
				parent: context.reference()
			});
		} else {
			context.childrenTemplate = [context.options.platform ? TEXT_PLACEHOLDER : " "];
			if (!isComponent) context.registerOperation({
				type: 18,
				node,
				parent: context.reference()
			});
		}
		context.registerEffect([exp], {
			type: 5,
			node,
			element: useCreateElement ? id : context.reference(),
			values: [exp],
			generated: !useCreateElement,
			isComponent
		});
	}
};
//#endregion
//#region packages/compiler-vapor/src/transforms/vOn.ts
const delegatedEvents = /* @__PURE__ */ (0, _vue_shared.makeMap)("beforeinput,click,dblclick,contextmenu,focusin,focusout,input,keydown,keyup,mousedown,mousemove,mouseout,mouseover,mouseup,pointerdown,pointermove,pointerout,pointerover,pointerup,touchend,touchmove,touchstart");
const transformVOn = (dir, node, context) => {
	let { arg, exp, loc, modifiers } = dir;
	const isComponent = node.tagType === 1;
	const isSlotOutlet = node.tag === "slot";
	if (!exp && !modifiers.length) context.options.onError((0, _vue_compiler_dom.createCompilerError)(35, loc));
	arg = resolveExpression(arg);
	if (arg.isStatic && arg.content.startsWith("vue:")) arg = (0, _vue_shared.extend)({}, arg, { content: `vnode-${arg.content.slice(4)}` });
	const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = (0, _vue_compiler_dom.resolveModifiers)(arg.isStatic ? `on${arg.content}` : arg, modifiers, null, loc);
	let keyOverride;
	const isStaticClick = arg.isStatic && arg.content.toLowerCase() === "click";
	if (nonKeyModifiers.includes("right")) {
		if (!isStaticClick && !arg.isStatic) keyOverride = ["click", "contextmenu"];
	} else if (nonKeyModifiers.includes("middle")) {
		if (!isStaticClick && !arg.isStatic) keyOverride = ["click", "mouseup"];
	}
	arg = normalizeStaticEventArg(arg, nonKeyModifiers);
	if (keyModifiers.length && (0, _vue_compiler_dom.isStaticExp)(arg) && !(0, _vue_compiler_dom.isKeyboardEvent)(`on${arg.content.toLowerCase()}`)) keyModifiers.length = 0;
	if (isComponent || isSlotOutlet) return {
		key: arg,
		value: exp || EMPTY_EXPRESSION,
		handler: true,
		handlerModifiers: {
			keys: keyModifiers,
			nonKeys: nonKeyModifiers,
			options: eventOptionModifiers
		}
	};
	const delegate = context.options.eventDelegation && arg.isStatic && !eventOptionModifiers.length && !hasStopHandlerForStaticEvent(node, arg.content) && delegatedEvents(arg.content);
	const operation = {
		type: 6,
		node,
		element: context.reference(),
		key: arg,
		value: exp,
		modifiers: {
			keys: keyModifiers,
			nonKeys: nonKeyModifiers,
			options: eventOptionModifiers
		},
		keyOverride,
		delegate,
		effect: !arg.isStatic
	};
	context.registerEffect([arg], operation);
};
function normalizeStaticEventArg(arg, nonKeyModifiers) {
	if (!arg.isStatic) return arg;
	let normalized = arg;
	const isStaticClick = arg.content.toLowerCase() === "click";
	if (nonKeyModifiers.includes("right") && isStaticClick) normalized = (0, _vue_shared.extend)({}, normalized, { content: "contextmenu" });
	else if (nonKeyModifiers.includes("middle") && isStaticClick) normalized = (0, _vue_shared.extend)({}, normalized, { content: "mouseup" });
	return normalized;
}
function hasStopHandlerForStaticEvent(node, eventName) {
	return node.props.some((prop) => {
		if (prop.type !== 7 || prop.name !== "on" || !prop.arg || prop.arg.type !== 4) return false;
		const arg = resolveExpression(prop.arg);
		if (!arg.isStatic) return false;
		const { nonKeyModifiers } = (0, _vue_compiler_dom.resolveModifiers)(`on${arg.content}`, prop.modifiers, null, prop.loc);
		return nonKeyModifiers.includes("stop") && normalizeStaticEventArg(arg, nonKeyModifiers).content === eventName;
	});
}
//#endregion
//#region packages/compiler-vapor/src/transforms/vShow.ts
const transformVShow = (dir, node, context) => {
	const { exp, loc } = dir;
	if (!exp) {
		context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(62, loc));
		return;
	}
	if (node.tagType === 2) {
		context.options.onError((0, _vue_compiler_dom.createCompilerError)(36, loc));
		return;
	}
	context.registerOperation({
		type: 14,
		node,
		element: context.reference(),
		dir,
		name: "show",
		builtin: true
	});
};
//#endregion
//#region packages/compiler-vapor/src/transforms/transformTemplateRef.ts
const transformTemplateRef = (node, context) => {
	if (node.type !== 1) return;
	const dir = findProp$1(node, "ref", false, true);
	if (!dir) return;
	context.ir.hasTemplateRef = true;
	let value;
	if (dir.type === 7) value = dir.exp || normalizeBindShorthand(dir.arg, context);
	else value = dir.value ? (0, _vue_compiler_dom.createSimpleExpression)(dir.value.content, true, dir.value.loc) : EMPTY_EXPRESSION;
	return () => {
		const id = context.reference();
		const effect = !isConstantExpression(value);
		context.registerEffect([value], {
			type: 9,
			node,
			element: id,
			value,
			refFor: !!context.inVFor,
			effect
		});
	};
};
//#endregion
//#region packages/compiler-vapor/src/transforms/vModel.ts
const transformVModel = (dir, node, context) => {
	const { exp, arg } = dir;
	if (!exp) {
		context.options.onError((0, _vue_compiler_dom.createCompilerError)(41, dir.loc));
		return;
	}
	const rawExp = exp.loc.source;
	const bindingType = context.options.bindingMetadata[rawExp];
	if (bindingType === "props" || bindingType === "props-aliased") {
		context.options.onError((0, _vue_compiler_dom.createCompilerError)(44, exp.loc));
		return;
	}
	const expString = exp.content;
	const maybeRef = context.options.inline && (bindingType === "setup-let" || bindingType === "setup-ref" || bindingType === "setup-maybe-ref");
	if (!expString.trim() || !(0, _vue_compiler_dom.isMemberExpression)(exp, context.options) && !maybeRef) {
		context.options.onError((0, _vue_compiler_dom.createCompilerError)(42, exp.loc));
		return;
	}
	if (node.tagType === 1) return {
		key: arg ? arg : (0, _vue_compiler_dom.createSimpleExpression)("modelValue", true),
		value: exp,
		model: true,
		modelModifiers: dir.modifiers.map((m) => m.content)
	};
	if (dir.arg) context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(59, dir.arg.loc));
	const { tag } = node;
	const isCustomElement = context.options.isCustomElement(tag);
	let modelType = "text";
	if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) if (tag === "input" || isCustomElement) {
		const type = (0, _vue_compiler_dom.findProp)(node, "type");
		if (type) {
			if (type.type === 7) modelType = "dynamic";
			else if (type.value) switch (type.value.content) {
				case "radio":
					modelType = "radio";
					break;
				case "checkbox":
					modelType = "checkbox";
					break;
				case "file":
					modelType = void 0;
					context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(60, dir.loc));
					break;
				default:
					checkDuplicatedValue();
					break;
			}
		} else if ((0, _vue_compiler_dom.hasDynamicKeyVBind)(node)) modelType = "dynamic";
		else checkDuplicatedValue();
	} else if (tag === "select") modelType = "select";
	else checkDuplicatedValue();
	else context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(58, dir.loc));
	if (modelType) context.registerOperation({
		type: 14,
		node,
		element: context.reference(),
		dir,
		name: "model",
		modelType,
		builtin: true
	});
	function checkDuplicatedValue() {
		const value = (0, _vue_compiler_dom.findDir)(node, "bind");
		if (value && (0, _vue_compiler_dom.isStaticArgOf)(value.arg, "value")) context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(61, value.loc));
	}
};
//#endregion
//#region packages/compiler-vapor/src/transforms/transformComment.ts
const ignoredComments = /* @__PURE__ */ new WeakMap();
function ignoreComment(node, context) {
	let ignored = ignoredComments.get(context.root);
	if (!ignored) ignoredComments.set(context.root, ignored = /* @__PURE__ */ new WeakSet());
	ignored.add(node);
}
const transformComment = (node, context) => {
	var _ignoredComments$get;
	if (node.type !== 3) return;
	if ((_ignoredComments$get = ignoredComments.get(context.root)) === null || _ignoredComments$get === void 0 ? void 0 : _ignoredComments$get.has(node)) context.dynamic.flags |= 2;
	else if (getSiblingIf(context)) {
		context.comment.push(node);
		context.dynamic.flags |= 2;
	} else context.template += `<!--${(0, _vue_shared.escapeHtml)(node.content)}-->`;
};
function getSiblingIf(context, reverse) {
	const parent = context.parent;
	if (!parent) return;
	const siblings = parent.node.children;
	let sibling;
	let i = siblings.indexOf(context.node);
	while (reverse ? --i >= 0 : ++i < siblings.length) {
		sibling = siblings[i];
		if (!(0, _vue_compiler_dom.isCommentOrWhitespace)(sibling)) break;
	}
	if (sibling && sibling.type === 1 && sibling.props.some(({ type, name }) => type === 7 && ["else-if", reverse ? "if" : "else"].includes(name))) return sibling;
}
//#endregion
//#region packages/compiler-vapor/src/transforms/vIf.ts
const transformVIf = createStructuralDirectiveTransform([
	"if",
	"else",
	"else-if"
], processIf);
function processIf(node, dir, context) {
	if (dir.name !== "else" && (!dir.exp || !dir.exp.content.trim())) {
		const loc = dir.exp ? dir.exp.loc : node.loc;
		context.options.onError((0, _vue_compiler_dom.createCompilerError)(28, dir.loc));
		dir.exp = (0, _vue_compiler_dom.createSimpleExpression)(`true`, false, loc);
	}
	context.dynamic.flags |= 2;
	const forceMultiRoot = shouldForceMultiRoot(context);
	const allowNoScope = context.block === context.root.block;
	if (dir.name === "if") {
		const id = context.reference();
		context.dynamic.flags |= 4;
		const [branch, onExit] = createIfBranch(node, context);
		return () => {
			onExit();
			context.dynamic.operation = {
				type: 15,
				node,
				id,
				...context.effectBoundary(),
				blockShape: encodeIfBlockShape(branch, forceMultiRoot, void 0, allowNoScope),
				condition: dir.exp,
				positive: branch,
				index: context.root.nextIfIndex(),
				once: context.inVOnce || isStaticExpression(dir.exp, context.options.bindingMetadata)
			};
		};
	} else {
		const siblingIf = getSiblingIf(context, true);
		const siblings = context.parent && context.parent.dynamic.children;
		let lastIfNode;
		if (siblings) {
			let i = siblings.length;
			while (i--) if (siblings[i].operation && siblings[i].operation.type === 15) {
				lastIfNode = siblings[i].operation;
				break;
			}
		}
		if (!siblingIf || !lastIfNode || lastIfNode.type !== 15) {
			context.options.onError((0, _vue_compiler_dom.createCompilerError)(30, node.loc));
			return;
		}
		while (lastIfNode.negative && lastIfNode.negative.type === 15) lastIfNode = lastIfNode.negative;
		if (dir.name === "else-if" && lastIfNode.negative) context.options.onError((0, _vue_compiler_dom.createCompilerError)(30, node.loc));
		const comments = context.comment;
		if (comments.length) {
			if (!isInTransition(context)) {
				node = wrapTemplate(node, ["else-if", "else"]);
				context.node = node = (0, _vue_shared.extend)({}, node, { children: [...comments, ...node.children] });
			}
			comments.length = 0;
		}
		const [branch, onExit] = createIfBranch(node, context);
		if (dir.name === "else") lastIfNode.negative = branch;
		else lastIfNode.negative = {
			type: 15,
			node,
			id: -1,
			condition: dir.exp,
			positive: branch,
			index: context.root.nextIfIndex(),
			blockShape: 0,
			once: context.inVOnce || isStaticExpression(dir.exp, context.options.bindingMetadata)
		};
		return () => {
			onExit();
			if (lastIfNode.negative.type === 15) lastIfNode.negative.blockShape = encodeIfBlockShape(lastIfNode.negative.positive, forceMultiRoot, void 0, allowNoScope);
			lastIfNode.blockShape = encodeIfBlockShape(lastIfNode.positive, forceMultiRoot, lastIfNode.negative, allowNoScope);
		};
	}
}
function createIfBranch(node, context) {
	context.node = node = wrapTemplate(node, [
		"if",
		"else-if",
		"else"
	]);
	const branch = newBlock(node);
	const exitBlock = context.enterBlock(branch);
	context.reference();
	return [branch, exitBlock];
}
function encodeIfBlockShape(positive, forceMultiRoot = false, negative, allowNoScope = true) {
	if (forceMultiRoot) return 10;
	const positiveNoScope = allowNoScope && canSkipIfBranchScope(positive);
	const negativeNoScope = allowNoScope && negative && negative.type !== 15 && canSkipIfBranchScope(negative);
	return getBlockShape(positive) | getNegativeIfBranchShape(negative) << 2 | (positiveNoScope ? 32 : 0) | (negativeNoScope ? 64 : 0);
}
function getNegativeIfBranchShape(negative) {
	if (!negative) return 0;
	return negative.type === 15 ? 1 : getBlockShape(negative);
}
function canSkipIfBranchScope(block) {
	if (block.effect.length || block.operation.length) return false;
	if (!isStaticBranch(block.node)) return false;
	if (block.returns.length === 0 || block.dynamic.children.length !== block.returns.length) return false;
	return block.returns.every((id) => {
		const returned = findReturnedDynamic(block, id);
		return !!(returned && returned.template != null && !returned.operation && !returned.hasDynamicChild && !(returned.flags & 6));
	});
}
function findReturnedDynamic(block, id) {
	return block.dynamic.children.find((child) => child.id === id);
}
function isStaticBranch(node) {
	if (node.type !== 1 || node.tagType !== 3 || node.children.length === 0) return false;
	return node.children.every((child) => isStaticTemplateNode(child));
}
function isStaticTemplateNode(node) {
	if (node.type === 2 || node.type === 3) return true;
	if (node.type !== 1 || node.tagType !== 0) return false;
	for (const prop of node.props) if (prop.type === 7 || prop.name === "ref") return false;
	return node.children.every((child) => isStaticTemplateNode(child));
}
function shouldForceMultiRoot(context) {
	const parent = context.parent && context.parent.node;
	return !!parent && parent.type === 1 && parent.tagType === 3 && parent.props.some((prop) => prop.type === 7 && prop.name === "for");
}
//#endregion
//#region packages/compiler-vapor/src/transforms/vFor.ts
const transformVFor = createStructuralDirectiveTransform("for", processFor);
function processFor(node, dir, context) {
	if (!dir.exp) {
		context.options.onError((0, _vue_compiler_dom.createCompilerError)(31, dir.loc));
		return;
	}
	const parseResult = dir.forParseResult;
	if (!parseResult) {
		context.options.onError((0, _vue_compiler_dom.createCompilerError)(32, dir.loc));
		return;
	}
	const { source, value, key, index } = parseResult;
	const keyProp = findProp$1(node, "key");
	const keyProperty = keyProp && propToExpression(keyProp);
	const typeProp = findProp$1(node, "type");
	const typeProperty = typeProp && propToExpression(typeProp);
	const isComponent = node.tagType === 1 || isTemplateWithSingleComponent(node);
	context.node = node = wrapTemplate(node, ["for", "key"]);
	context.dynamic.flags |= 6;
	const id = context.reference();
	const render = newBlock(node);
	const exitBlock = context.enterBlock(render, true);
	context.reference();
	return () => {
		exitBlock();
		const { parent } = context;
		const isOnlyChild = parent && parent.block.node !== parent.node && parent.node.children.length === 1;
		context.dynamic.operation = {
			type: 16,
			node,
			id,
			...context.effectBoundary(),
			source,
			value,
			key,
			index,
			keyProp: keyProperty,
			typeProp: typeProperty,
			render,
			once: context.inVOnce || isStaticExpression(source, context.options.bindingMetadata),
			component: isComponent && node.children[0].type === 1 && node.children[0].tagType === 1,
			onlyChild: !!isOnlyChild
		};
	};
}
function isTemplateWithSingleComponent(node) {
	if (node.tag !== "template") return false;
	const nonCommentChildren = node.children.filter((c) => c.type !== 3);
	return nonCommentChildren.length === 1 && nonCommentChildren[0].type === 1 && nonCommentChildren[0].tagType === 1;
}
//#endregion
//#region packages/compiler-vapor/src/transforms/transformSlotOutlet.ts
const transformSlotOutlet = (node, context) => {
	if (node.type !== 1 || node.tag !== "slot") return;
	const id = context.reference();
	context.dynamic.flags |= 6;
	const [fallback, exitBlock] = createFallback(node, context);
	let slotName;
	const slotProps = [];
	for (const prop of node.props) if (prop.type === 6) {
		if (prop.value) if (prop.name === "name") slotName = (0, _vue_compiler_dom.createSimpleExpression)(prop.value.content, true, prop.loc);
		else slotProps.push((0, _vue_shared.extend)({}, prop, { name: (0, _vue_shared.camelize)(prop.name) }));
	} else if (prop.name === "bind" && (0, _vue_compiler_dom.isStaticArgOf)(prop.arg, "name")) if (prop.exp) slotName = prop.exp;
	else {
		slotName = (0, _vue_compiler_dom.createSimpleExpression)((0, _vue_shared.camelize)(prop.arg.content), false, prop.arg.loc);
		slotName.ast = null;
	}
	else {
		let slotProp = prop;
		if (slotProp.name === "bind" && slotProp.arg && (0, _vue_compiler_dom.isStaticExp)(slotProp.arg)) slotProp = (0, _vue_shared.extend)({}, prop, { arg: (0, _vue_shared.extend)({}, slotProp.arg, { content: (0, _vue_shared.camelize)(slotProp.arg.content) }) });
		slotProps.push(slotProp);
	}
	slotName || (slotName = (0, _vue_compiler_dom.createSimpleExpression)("default", true));
	let irProps = [];
	if (slotProps.length) {
		const [isDynamic, props] = buildProps((0, _vue_shared.extend)({}, node, { props: slotProps }), context, true);
		irProps = isDynamic ? props : [props];
		const runtimeDirective = context.block.operation.find((oper) => oper.type === 14 && oper.element === id);
		if (runtimeDirective) context.options.onError((0, _vue_compiler_dom.createCompilerError)(36, runtimeDirective.dir.loc));
	}
	return () => {
		exitBlock && exitBlock();
		let flags = 0;
		if (context.options.scopeId && !context.options.slotted) flags |= 1;
		if (context.inVOnce) flags |= 2;
		context.dynamic.operation = {
			type: 13,
			node,
			id,
			...context.effectBoundary(),
			name: slotName,
			props: irProps,
			fallback,
			flags
		};
	};
};
function createFallback(node, context) {
	if (!node.children.length) return [];
	context.node = node = (0, _vue_shared.extend)({}, node, {
		type: 1,
		tag: "template",
		props: [],
		tagType: 3,
		children: node.children
	});
	const fallback = newBlock(node);
	const exitBlock = context.enterBlock(fallback);
	context.reference();
	return [fallback, exitBlock];
}
//#endregion
//#region packages/compiler-vapor/src/transforms/vSlot.ts
const transformVSlot = (node, context) => {
	if (node.type !== 1) return;
	const dir = findDir$4(node, "slot", true);
	const { tagType, children } = node;
	const { parent } = context;
	const isComponent = tagType === 1;
	const isSlotTemplate = (0, _vue_compiler_dom.isTemplateNode)(node) && parent && parent.node.type === 1 && parent.node.tagType === 1;
	if (isComponent && children.length) return transformComponentSlot(node, dir, context);
	else if (isSlotTemplate && dir) return transformTemplateSlot(node, dir, context);
	else if (!isComponent && dir) context.options.onError((0, _vue_compiler_dom.createCompilerError)(40, dir.loc));
};
function transformComponentSlot(node, dir, context) {
	const { children } = node;
	const arg = dir && dir.arg;
	const hasTemplateSlots = children.some(isSlotTemplateChild);
	const emptyTextNodes = [];
	const nonSlotTemplateChildren = children.filter((n) => {
		if (isSlotTemplateChild(n)) return false;
		if (n.type === 3 && hasTemplateSlots) {
			ignoreComment(n, context);
			return false;
		}
		if (isNonWhitespaceContent(n)) return true;
		else {
			emptyTextNodes.push(n);
			return false;
		}
	});
	if (!nonSlotTemplateChildren.length) emptyTextNodes.forEach((n) => {
		markNonTemplate(n, context);
	});
	const [block, onExit] = createSlotBlock(node, dir, context);
	const { slots } = context;
	return () => {
		onExit();
		const hasOtherSlots = !!slots.length;
		if (dir && hasOtherSlots) {
			context.options.onError((0, _vue_compiler_dom.createCompilerError)(37, dir.loc));
			return;
		}
		if (nonSlotTemplateChildren.length) if (hasStaticSlot(slots, "default")) context.options.onError((0, _vue_compiler_dom.createCompilerError)(39, nonSlotTemplateChildren[0].loc));
		else {
			registerSlot(slots, arg, block);
			context.slots = slots;
		}
		else if (hasOtherSlots) context.slots = slots;
	};
}
function transformTemplateSlot(node, dir, context) {
	context.dynamic.flags |= 2;
	const resolvedArg = dir.arg && resolveExpression(dir.arg);
	let arg = resolvedArg;
	if (!arg) arg = (0, _vue_compiler_dom.createSimpleExpression)("default", true);
	const vFor = findDir$4(node, "for");
	const vIf = findDir$4(node, "if");
	const vElse = findDir$4(node, /^else(-if)?$/, true);
	const { slots } = context;
	const [block, onExit] = createSlotBlock(node, dir, context);
	if (!vFor && !vIf && !vElse) {
		const slotName = resolvedArg ? resolvedArg.isStatic && resolvedArg.content : "default";
		if (slotName && hasStaticSlot(slots, slotName)) context.options.onError((0, _vue_compiler_dom.createCompilerError)(38, dir.loc));
		else registerSlot(slots, arg, block);
	} else if (vIf) registerDynamicSlot(slots, {
		slotType: 3,
		condition: vIf.exp,
		positive: {
			slotType: 1,
			name: arg,
			fn: block
		}
	});
	else if (vElse) {
		const vIfSlot = slots[slots.length - 1];
		if (vIfSlot && vIfSlot.slotType === 3) {
			let ifNode = vIfSlot;
			while (ifNode.negative && ifNode.negative.slotType === 3) ifNode = ifNode.negative;
			const negative = vElse.exp ? {
				slotType: 3,
				condition: vElse.exp,
				positive: {
					slotType: 1,
					name: arg,
					fn: block
				}
			} : {
				slotType: 1,
				name: arg,
				fn: block
			};
			ifNode.negative = negative;
		} else context.options.onError((0, _vue_compiler_dom.createCompilerError)(30, vElse.loc));
	} else if (vFor) if (vFor.forParseResult) registerDynamicSlot(slots, {
		slotType: 2,
		name: arg,
		fn: block,
		loop: vFor.forParseResult
	});
	else context.options.onError((0, _vue_compiler_dom.createCompilerError)(32, vFor.loc));
	return onExit;
}
function ensureStaticSlots(slots) {
	let lastSlots = slots[slots.length - 1];
	if (!slots.length || lastSlots.slotType !== 0) slots.push(lastSlots = {
		slotType: 0,
		slots: {}
	});
	return lastSlots.slots;
}
function registerSlot(slots, name, block) {
	if (!name || name.isStatic) {
		const staticSlots = ensureStaticSlots(slots);
		staticSlots[name ? name.content : "default"] = block;
	} else slots.push({
		slotType: 1,
		name,
		fn: block
	});
}
function registerDynamicSlot(allSlots, dynamic) {
	allSlots.push(dynamic);
}
function hasStaticSlot(slots, name) {
	return slots.some((slot) => {
		if (slot.slotType === 0) return !!slot.slots[name];
	});
}
function createSlotBlock(slotNode, dir, context) {
	const block = newBlock(slotNode);
	block.props = dir && dir.exp;
	return [block, context.enterBlock(block)];
}
function isNonWhitespaceContent(node) {
	if (node.type !== 2) return true;
	return !!node.content.trim();
}
function isSlotTemplateChild(node) {
	return node.type === 1 && (0, _vue_compiler_dom.isTemplateNode)(node) && !!findDir$4(node, "slot", true);
}
//#endregion
//#region packages/compiler-vapor/src/transforms/transformTransition.ts
const transformTransition = (node, context) => {
	if (node.type === 1 && node.tagType === 1) {
		if (isTransitionTag(node.tag)) return (0, _vue_compiler_dom.postTransformTransition)(node, context.options.onError, hasMultipleChildren);
	}
};
function hasMultipleChildren(node) {
	const children = node.children = node.children.filter((c) => c.type !== 3 && !(c.type === 2 && !c.content.trim()));
	const first = children[0];
	if (children.length === 1 && first.type === 1) {
		if (findDir$4(first, "for")) return true;
		if ((0, _vue_compiler_dom.isTemplateNode)(first)) return hasMultipleChildren(first);
	}
	const hasElse = (node) => findDir$4(node, "else-if") || findDir$4(node, "else", true);
	if (children.length > 0 && children.every((c, index) => c.type === 1 && (!(0, _vue_compiler_dom.isTemplateNode)(c) || !hasMultipleChildren(c)) && !findDir$4(c, "for") && (index === 0 ? findDir$4(c, "if") : hasElse(c)))) return false;
	return children.length !== 1;
}
//#endregion
//#region packages/compiler-vapor/src/transforms/transformKey.ts
const transformKey = (node, context) => {
	if (node.type !== 1 || context.inVOnce || findDir$4(node, "for")) return;
	const dir = findProp$1(node, "key", true, true);
	if (!dir || dir.type === 6) return;
	let value;
	value = dir.exp || normalizeBindShorthand(dir.arg, context);
	if (isStaticExpression(value, context.options.bindingMetadata)) return;
	let id = context.reference();
	context.dynamic.flags |= 6;
	context.node = node = wrapTemplate(node, ["key"]);
	const block = newBlock(node);
	const exitBlock = context.enterBlock(block);
	return () => {
		exitBlock();
		context.dynamic.operation = {
			type: 17,
			node,
			id,
			...context.effectBoundary(),
			value,
			block
		};
	};
};
//#endregion
//#region packages/compiler-vapor/src/compile.ts
function compile(source, options = {}) {
	const resolvedOptions = (0, _vue_shared.extend)({}, options);
	const ast = (0, _vue_shared.isString)(source) ? (0, _vue_compiler_dom.parse)(source, resolvedOptions) : source;
	const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
	if (options.isTS) {
		const { expressionPlugins } = options;
		if (!expressionPlugins || !expressionPlugins.includes("typescript")) resolvedOptions.expressionPlugins = [...expressionPlugins || [], "typescript"];
	}
	return generate(transform(ast, (0, _vue_shared.extend)({}, resolvedOptions, {
		nodeTransforms: [
			...nodeTransforms,
			...[transformTransition],
			...options.nodeTransforms || []
		],
		directiveTransforms: (0, _vue_shared.extend)({}, directiveTransforms, options.directiveTransforms || {})
	})), resolvedOptions);
}
function getBaseTransformPreset() {
	return [[
		transformVOnce,
		transformVIf,
		transformVFor,
		transformKey,
		transformSlotOutlet,
		transformTemplateRef,
		transformElement,
		transformText,
		transformVSlot,
		transformComment,
		transformChildren
	], {
		bind: transformVBind,
		on: transformVOn,
		html: transformVHtml,
		text: transformVText,
		show: transformVShow,
		model: transformVModel
	}];
}
//#endregion
exports.CodegenContext = CodegenContext;
exports.DELIMITERS_ARRAY = DELIMITERS_ARRAY;
exports.DELIMITERS_ARRAY_NEWLINE = DELIMITERS_ARRAY_NEWLINE;
exports.DELIMITERS_OBJECT = DELIMITERS_OBJECT;
exports.DELIMITERS_OBJECT_NEWLINE = DELIMITERS_OBJECT_NEWLINE;
exports.DynamicFlag = DynamicFlag;
exports.IMPORT_EXPR_RE = IMPORT_EXPR_RE;
exports.IMPORT_EXP_END = IMPORT_EXP_END;
exports.IMPORT_EXP_START = IMPORT_EXP_START;
exports.INDENT_END = INDENT_END;
exports.INDENT_START = INDENT_START;
exports.IRDynamicPropsKind = IRDynamicPropsKind;
exports.IRNodeTypes = IRNodeTypes;
exports.IRSlotType = IRSlotType;
exports.LF = LF;
exports.NEWLINE = NEWLINE;
exports.TEXT_NODE_PLACEHOLDER = TEXT_NODE_PLACEHOLDER;
exports.TEXT_PLACEHOLDER = TEXT_PLACEHOLDER;
exports.TemplateRegistry = TemplateRegistry;
exports.VaporErrorCodes = VaporErrorCodes;
exports.VaporErrorMessages = VaporErrorMessages;
exports.analyzeExpressions = analyzeExpressions;
exports.buildCodeFragment = buildCodeFragment;
exports.buildDestructureIdMap = buildDestructureIdMap;
exports.codeFragmentToString = codeFragmentToString;
exports.compile = compile;
exports.createStructuralDirectiveTransform = createStructuralDirectiveTransform;
exports.createVaporCompilerError = createVaporCompilerError;
exports.genCall = genCall;
exports.genDirectiveModifiers = genDirectiveModifiers;
exports.genDynamicComponentFlags = genDynamicComponentFlags;
exports.genMulti = genMulti;
exports.genSlotFlags = genSlotFlags;
exports.generate = generate;
exports.getBaseTransformPreset = getBaseTransformPreset;
exports.getLiteralExpressionValue = getLiteralExpressionValue;
exports.getParserOptions = getParserOptions;
exports.hasStableSlotRoot = hasStableSlotRoot;
exports.isBlockOperation = isBlockOperation;
exports.isBuiltInComponent = isBuiltInComponent;
exports.isConstantExpression = isConstantExpression;
exports.isDirectStaticLiteralProp = isDirectStaticLiteralProp;
exports.isKeepAliveTag = isKeepAliveTag;
exports.isStaticExpression = isStaticExpression;
exports.isTeleportTag = isTeleportTag;
exports.isTransitionGroupTag = isTransitionGroupTag;
exports.isTransitionTag = isTransitionTag;
exports.markSlotRootOperations = markSlotRootOperations;
exports.matchKeyOnlyBindingPattern = matchKeyOnlyBindingPattern;
exports.matchSelectorPattern = matchSelectorPattern;
exports.needsVaporCtx = needsVaporCtx;
exports.parse = _vue_compiler_dom.parse;
exports.parseStaticAttrBooleanExpression = parseStaticAttrBooleanExpression;
exports.parseValueDestructure = parseValueDestructure;
exports.propToExpression = propToExpression;
exports.transform = transform;
exports.transformChildren = transformChildren;
exports.transformComment = transformComment;
exports.transformElement = transformElement;
exports.transformKey = transformKey;
exports.transformSlotOutlet = transformSlotOutlet;
exports.transformTemplateRef = transformTemplateRef;
exports.transformText = transformText;
exports.transformVBind = transformVBind;
exports.transformVFor = transformVFor;
exports.transformVHtml = transformVHtml;
exports.transformVIf = transformVIf;
exports.transformVModel = transformVModel;
exports.transformVOn = transformVOn;
exports.transformVOnce = transformVOnce;
exports.transformVShow = transformVShow;
exports.transformVSlot = transformVSlot;
exports.transformVText = transformVText;
exports.wrapTemplate = wrapTemplate;
