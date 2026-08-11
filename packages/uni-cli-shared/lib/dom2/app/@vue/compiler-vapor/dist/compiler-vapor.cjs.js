/**
  * @vue/compiler-vapor v3.6.0-beta.5
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
let _vue_compiler_dom = require("@vue/compiler-dom");
let _vue_shared = require("@vue/shared");
let source_map_js = require("source-map-js");
let _babel_parser = require("@babel/parser");
let estree_walker = require("estree-walker");

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
const EMPTY_EXPRESSION = (0, _vue_compiler_dom.createSimpleExpression)("", true);
const TEXT_PLACEHOLDER = "__vapor_dom2_text_placeholder__";
const TEXT_NODE_PLACEHOLDER = "__vapor_dom2_text_node_placeholder__";

//#endregion
//#region packages/compiler-vapor/src/utils.ts
const findProp$1 = _vue_compiler_dom.findProp;
/** find directive */
const findDir$2 = _vue_compiler_dom.findDir;
function propToExpression(prop) {
	return prop.type === 6 ? prop.value ? (0, _vue_compiler_dom.createSimpleExpression)(prop.value.content, true, prop.value.loc) : EMPTY_EXPRESSION : prop.exp;
}
function isConstantExpression(exp) {
	return (0, _vue_compiler_dom.isLiteralWhitelisted)(exp.content) || (0, _vue_shared.isGloballyAllowed)(exp.content) || getLiteralExpressionValue(exp) !== null;
}
function isStaticExpression(node, bindings) {
	if (node.ast) return (0, _vue_compiler_dom.isConstantNode)(node.ast, bindings);
	else if (node.ast === null) {
		if (!node.isStatic && (node.content === "true" || node.content === "false")) return true;
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
	else if (isKeepAliveTag(tag)) return "VaporKeepAlive";
	else if (isTransitionTag(tag)) return "VaporTransition";
	else if (isTransitionGroupTag(tag)) return "VaporTransitionGroup";
}

//#endregion
//#region packages/compiler-vapor/src/transform.ts
const generatedVarRE = /^[nxr](\d+)$/;
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
		this.childrenTemplate = [];
		this.dynamic = this.ir.block.dynamic;
		this.imports = [];
		this.inVOnce = false;
		this.inVFor = 0;
		this.comment = [];
		this.component = this.ir.component;
		this.directive = this.ir.directive;
		this.slots = [];
		this.isLastEffectiveChild = true;
		this.isOnRightmostPath = true;
		this.hasInlineAncestorNeedingClose = false;
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
		const { block, template, dynamic, childrenTemplate, slots } = this;
		this.block = ir;
		this.dynamic = ir.dynamic;
		this.template = "";
		this.childrenTemplate = [];
		this.slots = [];
		isVFor && this.inVFor++;
		return () => {
			this.registerTemplate();
			this.block = block;
			this.template = template;
			this.dynamic = dynamic;
			this.childrenTemplate = childrenTemplate;
			this.slots = slots;
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
	pushTemplate(content) {
		const existingIndex = this.ir.templateIndexMap.get(content);
		if (existingIndex !== void 0) return existingIndex;
		const newIndex = this.ir.template.size;
		this.ir.template.set(content, this.node.ns);
		this.ir.templateIndexMap.set(content, newIndex);
		return newIndex;
	}
	registerTemplate() {
		if (!this.template) return -1;
		const id = this.pushTemplate(this.template);
		return this.dynamic.template = id;
	}
	registerEffect(expressions, operation, getIndex = () => this.block.effect.length, getOperationIndex) {
		const operations = [operation].flat();
		expressions = expressions.filter((exp) => !isConstantExpression(exp));
		if (this.inVOnce || expressions.length === 0 || expressions.every((e) => isStaticExpression(e, this.root.options.bindingMetadata))) {
			if (getOperationIndex) {
				this.block.operation.splice(getOperationIndex(), 0, ...operations);
				return;
			}
			return this.registerOperation(...operations);
		}
		this.block.effect.splice(getIndex(), 0, {
			expressions,
			operations
		});
	}
	registerOperation(...node) {
		this.block.operation.push(...node);
	}
	create(node, index) {
		let effectiveParent = this;
		while (effectiveParent && effectiveParent.node.type === 1 && effectiveParent.node.tagType === 3) effectiveParent = effectiveParent.parent;
		const isLastEffectiveChild = this.isEffectivelyLastChild(index);
		const isOnRightmostPath = this.isOnRightmostPath && isLastEffectiveChild;
		let hasInlineAncestorNeedingClose = this.hasInlineAncestorNeedingClose;
		if (this.node.type === 1) {
			if (this.node.tag === "template") hasInlineAncestorNeedingClose = false;
			else if (!hasInlineAncestorNeedingClose && !this.isOnRightmostPath && (0, _vue_shared.isInlineTag)(this.node.tag)) hasInlineAncestorNeedingClose = true;
		}
		return Object.assign(Object.create(TransformContext.prototype), this, {
			node,
			parent: this,
			index,
			template: "",
			childrenTemplate: [],
			dynamic: newDynamic(),
			effectiveParent,
			isLastEffectiveChild,
			isOnRightmostPath,
			hasInlineAncestorNeedingClose
		});
	}
	isEffectivelyLastChild(index) {
		const children = this.node.children;
		if (!children) return true;
		return children.every((c, i) => i <= index || c.type === 1 && c.tagType === 1);
	}
};
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
	onError: _vue_compiler_dom.defaultOnError,
	onWarn: _vue_compiler_dom.defaultOnWarn
};
function transform(node, options = {}) {
	const ir = {
		type: 0,
		node,
		source: node.source,
		template: /* @__PURE__ */ new Map(),
		templateIndexMap: /* @__PURE__ */ new Map(),
		rootTemplateIndexes: /* @__PURE__ */ new Set(),
		component: /* @__PURE__ */ new Set(),
		directive: /* @__PURE__ */ new Set(),
		block: newBlock(node),
		hasTemplateRef: false,
		hasDeferredVShow: false
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
	"SET_PROP": 2,
	"2": "SET_PROP",
	"SET_DYNAMIC_PROPS": 3,
	"3": "SET_DYNAMIC_PROPS",
	"SET_TEXT": 4,
	"4": "SET_TEXT",
	"SET_EVENT": 5,
	"5": "SET_EVENT",
	"SET_DYNAMIC_EVENTS": 6,
	"6": "SET_DYNAMIC_EVENTS",
	"SET_HTML": 7,
	"7": "SET_HTML",
	"SET_TEMPLATE_REF": 8,
	"8": "SET_TEMPLATE_REF",
	"INSERT_NODE": 9,
	"9": "INSERT_NODE",
	"PREPEND_NODE": 10,
	"10": "PREPEND_NODE",
	"CREATE_COMPONENT_NODE": 11,
	"11": "CREATE_COMPONENT_NODE",
	"SLOT_OUTLET_NODE": 12,
	"12": "SLOT_OUTLET_NODE",
	"DIRECTIVE": 13,
	"13": "DIRECTIVE",
	"IF": 14,
	"14": "IF",
	"FOR": 15,
	"15": "FOR",
	"GET_TEXT_CHILD": 16,
	"16": "GET_TEXT_CHILD",
	"GET_INSERTION_PARENT": 17,
	"17": "GET_INSERTION_PARENT",
	"SET_CHANGE_PROP": 18,
	"18": "SET_CHANGE_PROP"
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
	return type === 11 || type === 12 || type === 14 || type === 15;
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
	const { content, ast, isStatic, loc } = node;
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
		ids.sort((a, b) => a.start - b.start).forEach((id, i) => {
			const start = id.start - 1;
			const end = id.end - 1;
			const last = ids[i - 1];
			const leadingText = content.slice(last ? last.end - 1 : 0, start);
			if (leadingText.length) push([leadingText, -3]);
			const source = content.slice(start, end);
			const parentStack = parentStackMap.get(id);
			const parent = parentStack[parentStack.length - 1];
			hasMemberExpression || (hasMemberExpression = parent && (parent.type === "MemberExpression" || parent.type === "OptionalMemberExpression"));
			push(...genIdentifier(source, context, {
				start: (0, _vue_compiler_dom.advancePositionWithClone)(node.loc.start, source, start),
				end: (0, _vue_compiler_dom.advancePositionWithClone)(node.loc.start, source, end),
				source
			}, hasMemberExpression ? void 0 : assignment, id, parent, parentStack));
			if (i === ids.length - 1 && end < content.length) push([content.slice(end), -3]);
		});
		if (assignment && hasMemberExpression) push(` = ${assignment}`);
		return frag;
	} else return [[
		content,
		-3,
		loc
	]];
}
function genIdentifier(raw, context, loc, assignment, id, parent, parentStack) {
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
	if ((0, _vue_compiler_dom.isStaticProperty)(parent) && parent.shorthand) prefix = `${raw}: `;
	const type = bindingMetadata && bindingMetadata[raw];
	if (inline) switch (type) {
		case "setup-let":
			name = raw = assignment ? `_isRef(${raw}) ? (${raw}.value = ${assignment}) : (${raw} = ${assignment})` : unref();
			break;
		case "setup-ref":
			name = raw = withAssignment(`${raw}.value`);
			break;
		case "setup-maybe-ref":
			const isDestructureAssignment = parent && (0, _vue_compiler_dom.isInDestructureAssignment)(parent, parentStack || []);
			const isAssignmentLVal = parent && parent.type === "AssignmentExpression" && parent.left === id;
			const isUpdateArg = parent && parent.type === "UpdateExpression" && parent.argument === id;
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
	const { seenVariable, variableToExpMap, expToVariableMap, seenIdentifier, updatedVariable } = analyzeExpressions(expressions);
	const varDeclarations = processRepeatedVariables(context, seenVariable, variableToExpMap, expToVariableMap, seenIdentifier, updatedVariable);
	const expDeclarations = processRepeatedExpressions(context, expressions, varDeclarations, updatedVariable, expToVariableMap);
	return genDeclarations([...varDeclarations, ...expDeclarations], context, shouldDeclare);
}
function analyzeExpressions(expressions) {
	const seenVariable = Object.create(null);
	const variableToExpMap = /* @__PURE__ */ new Map();
	const expToVariableMap = /* @__PURE__ */ new Map();
	const seenIdentifier = /* @__PURE__ */ new Set();
	const updatedVariable = /* @__PURE__ */ new Set();
	const registerVariable = (name, exp, isIdentifier, loc, parentStack = []) => {
		if (isIdentifier) seenIdentifier.add(name);
		seenVariable[name] = (seenVariable[name] || 0) + 1;
		variableToExpMap.set(name, (variableToExpMap.get(name) || /* @__PURE__ */ new Set()).add(exp));
		const variables = expToVariableMap.get(exp) || [];
		variables.push({
			name,
			loc
		});
		expToVariableMap.set(exp, variables);
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
				const memberExp = extractMemberExpression(parent, (id) => {
					registerVariable(id.name, exp, true, {
						start: id.start,
						end: id.end
					});
				});
				const parentOfMemberExp = parentStack[parentStack.length - 2];
				if (parentOfMemberExp && isCallExpression(parentOfMemberExp)) return;
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
		expToVariableMap,
		updatedVariable
	};
}
function processRepeatedVariables(context, seenVariable, variableToExpMap, expToVariableMap, seenIdentifier, updatedVariable) {
	const declarations = [];
	const expToReplacementMap = /* @__PURE__ */ new Map();
	for (const [name, exps] of variableToExpMap) {
		if (updatedVariable.has(name)) continue;
		if (seenVariable[name] > 1 && exps.size > 0) {
			const isIdentifier = seenIdentifier.has(name);
			const varName = isIdentifier ? name : genVarName(name);
			exps.forEach((node) => {
				if (node.ast && varName !== name) {
					const replacements = expToReplacementMap.get(node) || [];
					replacements.push({
						name: varName,
						locs: expToVariableMap.get(node).reduce((locs, v) => {
							if (v.name === name && v.loc) locs.push(v.loc);
							return locs;
						}, [])
					});
					expToReplacementMap.set(node, replacements);
				}
			});
			if (!declarations.some((d) => d.name === varName) && (!isIdentifier || shouldDeclareVariable(name, expToVariableMap, exps))) declarations.push({
				name: varName,
				isIdentifier,
				value: (0, _vue_shared.extend)({ ast: isIdentifier ? null : parseExp(context, name) }, (0, _vue_compiler_dom.createSimpleExpression)(name)),
				rawName: name,
				exps,
				seenCount: seenVariable[name]
			});
		}
	}
	for (const [exp, replacements] of expToReplacementMap) {
		replacements.flatMap(({ name, locs }) => locs.map(({ start, end }) => ({
			start,
			end,
			name
		}))).sort((a, b) => b.end - a.end).forEach(({ start, end, name }) => {
			exp.content = exp.content.slice(0, start - 1) + name + exp.content.slice(end - 1);
		});
		exp.ast = parseExp(context, exp.content, exp.loc);
	}
	return declarations;
}
function shouldDeclareVariable(name, expToVariableMap, exps) {
	const vars = Array.from(exps, (exp) => expToVariableMap.get(exp).map((v) => v.name));
	if (vars.every((v) => v.length === 1)) return true;
	if (vars.some((v) => v.filter((e) => e === name).length > 1)) return true;
	const first = vars[0];
	if (vars.some((v) => v.length !== first.length)) {
		if (vars.some((v) => v.length > first.length && v.every((e) => first.includes(e))) || vars.some((v) => first.length > v.length && first.every((e) => v.includes(e)))) return false;
		return true;
	}
	if (vars.every((v) => v.every((e, idx) => e === first[idx]))) return false;
	return true;
}
function processRepeatedExpressions(context, expressions, varDeclarations, updatedVariable, expToVariableMap) {
	const declarations = [];
	const seenExp = expressions.reduce((acc, exp) => {
		const vars = expToVariableMap.get(exp);
		if (!vars) return acc;
		const variables = vars.map((v) => v.name);
		if (exp.ast && exp.ast.type !== "Identifier" && !(variables && variables.some((v) => updatedVariable.has(v)))) acc[exp.content] = (acc[exp.content] || 0) + 1;
		return acc;
	}, Object.create(null));
	Object.entries(seenExp).forEach(([content, count]) => {
		if (count > 1) {
			const varName = genVarName(content);
			if (!declarations.some((d) => d.name === varName)) {
				const delVars = {};
				for (let i = varDeclarations.length - 1; i >= 0; i--) {
					const item = varDeclarations[i];
					if (!item.exps || !item.seenCount) continue;
					if ([...item.exps].every((node) => node.content === content && item.seenCount === count)) {
						delVars[item.name] = item.rawName;
						varDeclarations.splice(i, 1);
					}
				}
				const value = (0, _vue_shared.extend)({}, expressions.find((exp) => exp.content === content));
				Object.keys(delVars).forEach((name) => {
					value.content = value.content.replace(name, delVars[name]);
					if (value.ast) value.ast = parseExp(context, value.content, value.loc);
				});
				declarations.push({
					name: varName,
					value
				});
			}
			expressions.forEach((exp) => {
				if (exp.content === content) {
					exp.content = varName;
					exp.ast = null;
				} else if (exp.content.includes(content)) {
					exp.content = exp.content.replace(new RegExp(escapeRegExp(content), "g"), varName);
					exp.ast = parseExp(context, exp.content, exp.loc);
				}
			});
		}
	});
	return declarations;
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
			const varName = ids[name] = `_${name}`;
			varNames.add(varName);
			if (shouldDeclare) push(`const `);
			push(`${varName} = `, ...context.withId(() => genExpression(value, context), ids), NEWLINE);
		}
	});
	return {
		ids,
		frag,
		varNames: [...varNames]
	};
}
function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function parseExp(context, content, loc) {
	const plugins = context.options.expressionPlugins;
	const options = { plugins: plugins ? [...plugins, "typescript"] : ["typescript"] };
	try {
		return (0, _babel_parser.parseExpression)(`(${content})`, options);
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
	const name = genName();
	const handler = [
		`${context.helper("createInvoker")}(`,
		...genEventHandler(context, [value], modifiers),
		`)`
	];
	const eventOptions = genEventOptions();
	if (delegate) {
		context.delegates.add(key.content);
		if (!context.block.operation.some(isSameDelegateEvent)) return [
			NEWLINE,
			`n${element}.$evt${key.content} = `,
			...handler
		];
	}
	return [NEWLINE, ...genCall(helper(delegate ? "delegate" : "on"), `n${element}`, name, handler, eventOptions)];
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
		if (!options.length && !effect) return;
		return genMulti(DELIMITERS_OBJECT_NEWLINE, effect && ["effect: true"], ...options.map((option) => [`${option}: true`]));
	}
	function isSameDelegateEvent(op) {
		if (op.type === 5 && op !== oper && op.delegate && op.element === oper.element && op.key.content === key.content) return true;
	}
}
function genSetDynamicEvents(oper, context) {
	const { helper } = context;
	return [NEWLINE, ...genCall(helper("setDynamicEvents"), `n${oper.element}`, genExpression(oper.event, context))];
}
function genEventHandler(context, values, modifiers = {
	nonKeys: [],
	keys: []
}, asComponentProp = false, extraWrap = false) {
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
	if (nonKeys.length) handlerExp = genWithModifiers(context, handlerExp, nonKeys);
	if (keys.length) handlerExp = genWithKeys(context, handlerExp, keys);
	if (extraWrap) handlerExp.unshift(`() => `);
	return handlerExp;
}
function genWithModifiers(context, handler, nonKeys) {
	return genCall(context.helper("withModifiers"), handler, JSON.stringify(nonKeys));
}
function genWithKeys(context, handler, keys) {
	return genCall(context.helper("withKeys"), handler, JSON.stringify(keys));
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
	const { source, value, key, index, render, keyProp, once, id, component, onlyChild } = oper;
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
	const { selectorPatterns, keyOnlyBindingPatterns } = matchPatterns(render, keyProp, idMap);
	const selectorDeclarations = [];
	const selectorSetup = [];
	for (let i = 0; i < selectorPatterns.length; i++) {
		const { selector } = selectorPatterns[i];
		const selectorName = `_selector${id}_${i}`;
		selectorDeclarations.push(`let ${selectorName}`, NEWLINE);
		if (i === 0) selectorSetup.push(`({ createSelector }) => {`, INDENT_START);
		selectorSetup.push(NEWLINE, `${selectorName} = `, ...genCall(`createSelector`, [`() => `, ...genExpression(selector, context)]));
		if (i === selectorPatterns.length - 1) selectorSetup.push(INDENT_END, NEWLINE, "}");
	}
	const blockFn = context.withId(() => {
		const frag = [];
		frag.push("(", ...args, ") => {", INDENT_START);
		if (selectorPatterns.length || keyOnlyBindingPatterns.length) frag.push(...genBlockContent(render, context, false, () => {
			const patternFrag = [];
			for (let i = 0; i < selectorPatterns.length; i++) {
				const { effect } = selectorPatterns[i];
				patternFrag.push(NEWLINE, `_selector${id}_${i}(() => {`, INDENT_START);
				for (const oper of effect.operations) patternFrag.push(...genOperation(oper, context));
				patternFrag.push(INDENT_END, NEWLINE, `})`);
			}
			for (const { effect } of keyOnlyBindingPatterns) for (const oper of effect.operations) patternFrag.push(...genOperation(oper, context));
			return patternFrag;
		}));
		else frag.push(...genBlockContent(render, context));
		frag.push(INDENT_END, NEWLINE, "}");
		return frag;
	}, idMap);
	exitScope();
	let flags = 0;
	if (onlyChild) flags |= 1;
	if (component) flags |= 2;
	if (once) flags |= 4;
	return [
		NEWLINE,
		...selectorDeclarations,
		`const n${id} = `,
		...genCall([helper("createFor"), "undefined"], sourceExpr, blockFn, genCallback(keyProp), flags ? String(flags) : void 0, selectorSetup.length ? selectorSetup : void 0)
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
							helperArgs = rawValue.slice(child.right.start - 1, child.right.end - 1);
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
				node.ast = (0, _babel_parser.parseExpression)(`(${path})`, { plugins: plugins ? [...plugins, "typescript"] : ["typescript"] });
			} else idMap[id] = path;
		} else idMap[id] = path;
	});
	return idMap;
}
function matchPatterns(render, keyProp, idMap) {
	const selectorPatterns = [];
	const keyOnlyBindingPatterns = [];
	render.effect = render.effect.filter((effect) => {
		if (keyProp !== void 0) {
			const selector = matchSelectorPattern(effect, keyProp.content, idMap);
			if (selector) {
				selectorPatterns.push(selector);
				return false;
			}
			const keyOnly = matchKeyOnlyBindingPattern(effect, keyProp.content);
			if (keyOnly) {
				keyOnlyBindingPatterns.push(keyOnly);
				return false;
			}
		}
		return true;
	});
	return {
		keyOnlyBindingPatterns,
		selectorPatterns
	};
}
function matchKeyOnlyBindingPattern(effect, key) {
	if (effect.expressions.length === 1) {
		const { ast, content } = effect.expressions[0];
		if (typeof ast === "object" && ast !== null) {
			if (isKeyOnlyBinding(ast, key, content)) return { effect };
		}
	}
}
function matchSelectorPattern(effect, key, idMap) {
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
					return {
						effect,
						selector: {
							content: name,
							ast: (0, _vue_shared.extend)({}, selector, {
								start: 1,
								end: name.length + 1
							}),
							loc: selector.loc,
							isStatic: false
						}
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
	const { condition, positive, negative, once, index } = oper;
	const [frag, push] = buildCodeFragment();
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
	push(...genCall(helper("createIf"), conditionExpr, positiveArg, negativeArg, once && "true", index !== void 0 && negative && String(index)));
	return frag;
}

//#endregion
//#region packages/compiler-vapor/src/generators/prop.ts
const helpers = {
	setText: { name: "setText" },
	setHtml: { name: "setHtml" },
	setClass: { name: "setClass" },
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
	const propValue = genPropValue(values, context);
	return [NEWLINE, ...genCall([helper(resolvedHelper.name), null], `n${oper.element}`, resolvedHelper.needKey ? genExpression(key, context) : false, propValue, resolvedHelper.isSVG && "true")];
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
	}
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
	return [NEWLINE, ...genCall(setTemplateRefIdent, `n${oper.element}`, refValue, oper.refFor && "true", refKey)];
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
	const { deferred, element } = oper;
	return [
		NEWLINE,
		deferred ? `deferredApplyVShows.push(() => ` : void 0,
		...genCall(context.helper("applyVShow"), `n${element}`, [
			`() => (`,
			...genExpression(oper.dir.exp, context),
			`)`
		]),
		deferred ? `)` : void 0
	];
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
	], genModelHandler(exp, context), modifiers.length ? `{ ${modifiers.map((e) => e.content + ": true").join(",")} }` : void 0)];
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
function genDirectiveModifiers(modifiers) {
	return modifiers.map((value) => `${(0, _vue_compiler_dom.isSimpleIdentifier)(value) ? value : JSON.stringify(value)}: true`).join(", ");
}
function filterCustomDirectives(id, operations) {
	return operations.filter((oper) => oper.type === 13 && oper.element === id && !oper.builtin);
}

//#endregion
//#region packages/compiler-vapor/src/generators/component.ts
function genCreateComponent(operation, context) {
	const { helper } = context;
	const tag = genTag();
	const { root, props, slots, once } = operation;
	const rawSlots = genRawSlots(slots, context);
	const [ids, handlers] = processInlineHandlers(props, context);
	const rawProps = context.withId(() => genRawProps(props, context), ids);
	return [
		NEWLINE,
		...handlers.reduce((acc, { name, value }) => {
			const handler = genEventHandler(context, [value], void 0, false, false);
			return [
				...acc,
				`const ${name} = `,
				...handler,
				NEWLINE
			];
		}, []),
		`const n${operation.id} = `,
		...genCall(operation.dynamic && !operation.dynamic.isStatic ? helper("createDynamicComponent") : operation.isCustomElement ? helper("createPlainElement") : operation.asset ? helper("createComponentWithFallback") : helper("createComponent"), tag, rawProps, rawSlots, root ? "true" : false, once && "true"),
		...genDirectivesForElement(operation.id, context)
	];
	function genTag() {
		if (operation.isCustomElement) return JSON.stringify(operation.tag);
		else if (operation.dynamic) if (operation.dynamic.isStatic) return genCall(helper("resolveDynamicComponent"), genExpression(operation.dynamic, context));
		else return [
			"() => (",
			...genExpression(operation.dynamic, context),
			")"
		];
		else if (operation.asset) return (0, _vue_compiler_dom.toValidAssetId)(operation.tag, "component");
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
function genRawProps(props, context) {
	const staticProps = props[0];
	if ((0, _vue_shared.isArray)(staticProps)) {
		if (!staticProps.length && props.length === 1) return;
		return genStaticProps(staticProps, context, genDynamicProps(props.slice(1), context));
	} else if (props.length) return genStaticProps([], context, genDynamicProps(props, context));
}
function genStaticProps(props, context, dynamicProps) {
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
			if (!!prop.handlerModifiers && (prop.handlerModifiers.keys.length > 0 || prop.handlerModifiers.nonKeys.length > 0) || prop.values.length <= 1) addHandler(keyName, keyFrag, genEventHandler(context, prop.values, prop.handlerModifiers, true, false));
			else for (const value of prop.values) addHandler(keyName, keyFrag, genEventHandler(context, [value], prop.handlerModifiers, true, false));
			continue;
		}
		args.push(genProp(prop, context, true));
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
				const modifiersKey = key.isStatic ? [(0, _vue_shared.getModifierPropName)(key.content)] : [
					"[",
					...genExpression(key, context),
					" + \"Modifiers\"]"
				];
				const modifiersVal = genDirectiveModifiers(modelModifiers);
				args.push([...modifiersKey, `: () => ({ ${modifiersVal} })`]);
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
function genDynamicProps(props, context) {
	const { helper } = context;
	const frags = [];
	for (const p of props) {
		let expr;
		if ((0, _vue_shared.isArray)(p)) {
			if (p.length) frags.push(genStaticProps(p, context));
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
				": () => ",
				...genModelHandler(p.values[0], context)
			]);
			const { modelModifiers } = p;
			if (modelModifiers && modelModifiers.length) {
				const modifiersKey = p.key.isStatic ? [(0, _vue_shared.getModifierPropName)(p.key.content)] : [
					"[",
					...genExpression(p.key, context),
					" + \"Modifiers\"]"
				];
				const modifiersVal = genDirectiveModifiers(modelModifiers);
				entries.push([...modifiersKey, `: () => ({ ${modifiersVal} })`]);
			}
			expr = genMulti(DELIMITERS_OBJECT_NEWLINE, ...entries);
		} else expr = genMulti(DELIMITERS_OBJECT, genProp(p, context));
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
function genProp(prop, context, isStatic) {
	const values = genPropValue(prop.values, context);
	return [
		...genPropKey(prop, context),
		": ",
		...prop.handler ? genEventHandler(context, prop.values, prop.handlerModifiers, true, true) : isStatic ? [
			"() => (",
			...values,
			")"
		] : values
	];
}
function genRawSlots(slots, context) {
	if (!slots.length) return;
	const staticSlots = slots[0];
	if (staticSlots.slotType === 0) return genStaticSlots(staticSlots, context, slots.length > 1 ? slots.slice(1) : void 0);
	else return genStaticSlots({
		slotType: 0,
		slots: {}
	}, context, slots);
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
	return withFunction ? [
		"() => (",
		...frag,
		")"
	] : frag;
}
function genBasicDynamicSlot(slot, context) {
	const { name, fn } = slot;
	return genMulti(DELIMITERS_OBJECT_NEWLINE, ["name: ", ...genExpression(name, context)], ["fn: ", ...genSlotBlockWithProps(fn, context)]);
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
	const slotExpr = genMulti(DELIMITERS_OBJECT_NEWLINE, ["name: ", ...context.withId(() => genExpression(name, context), idMap)], ["fn: ", ...context.withId(() => genSlotBlockWithProps(fn, context), idMap)]);
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
function genSlotBlockWithProps(oper, context) {
	let propsName;
	let exitScope;
	let depth;
	const { props, key, node } = oper;
	const idToPathMap = props ? parseValueDestructure(props, context) : /* @__PURE__ */ new Map();
	if (props) if (props.ast) {
		[depth, exitScope] = context.enterScope();
		propsName = `_slotProps${depth}`;
	} else propsName = props.content;
	const idMap = idToPathMap.size ? buildDestructureIdMap(idToPathMap, propsName || "", context.options.expressionPlugins) : {};
	if (propsName) idMap[propsName] = null;
	let blockFn = context.withId(() => genBlock(oper, context, propsName ? [propsName] : []), idMap);
	exitScope && exitScope();
	if (key) blockFn = [
		`() => {`,
		INDENT_START,
		NEWLINE,
		`return `,
		...genCall(context.helper("createKeyedFragment"), [`() => `, ...genExpression(key, context)], blockFn),
		INDENT_END,
		NEWLINE,
		`}`
	];
	if (node.type === 1) {
		if (needsVaporCtx(oper)) blockFn = [
			`${context.helper("withVaporCtx")}(`,
			...blockFn,
			`)`
		];
	}
	return blockFn;
}
/**
* Check if a slot block needs withVaporCtx wrapper.
* Returns true if the block contains:
* - Component creation (needs scopeId inheritance)
* - Slot outlet (needs rawSlots from slot owner)
*/
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
		if (type === 11 || type === 12) return true;
		if (type === 14) {
			if (hasComponentOrSlotInIf(dynamic.operation)) return true;
		}
		if (type === 15) {
			if (hasComponentOrSlotInBlock(dynamic.operation.render)) return true;
		}
	}
	for (const child of dynamic.children) if (hasComponentOrSlotInDynamic(child)) return true;
	return false;
}
function hasComponentOrSlotInOperations(operations) {
	for (const op of operations) switch (op.type) {
		case 11:
		case 12: return true;
		case 14:
			if (hasComponentOrSlotInIf(op)) return true;
			break;
		case 15:
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
	const { id, name, fallback, noSlotted, once } = oper;
	const [frag, push] = buildCodeFragment();
	const nameExpr = name.isStatic ? genExpression(name, context) : [
		"() => (",
		...genExpression(name, context),
		")"
	];
	let fallbackArg;
	if (fallback) fallbackArg = genBlock(fallback, context);
	push(NEWLINE, `const n${id} = `, ...genCall(helper("createSlot"), nameExpr, genRawProps(oper.props, context) || "null", fallbackArg, noSlotted && "true", once && "true"));
	return frag;
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
		case 2: return genSetProp(oper, context);
		case 3: return genDynamicProps$1(oper, context);
		case 4: return genSetText(oper, context);
		case 5: return genSetEvent(oper, context);
		case 6: return genSetDynamicEvents(oper, context);
		case 7: return genSetHtml(oper, context);
		case 8: return genSetTemplateRef(oper, context);
		case 9: return genInsertNode(oper, context);
		case 10: return genPrependNode(oper, context);
		case 14: return genIf(oper, context);
		case 15: return genFor(oper, context);
		case 11: return genCreateComponent(oper, context);
		case 12: return genSlotOutlet(oper, context);
		case 13: return genBuiltinDirective(oper, context);
		case 16: return genGetTextChild(oper, context);
		case 17: return [];
		case 18: return [];
		default:
			const exhaustiveCheck = oper;
			throw new Error(`Unhandled operation type in genOperation: ${exhaustiveCheck}`);
	}
}
function genEffects(effects, context, genExtraFrag) {
	const { helper } = context;
	const expressions = effects.flatMap((effect) => effect.expressions);
	const [frag, push, unshift] = buildCodeFragment();
	const shouldDeclare = genExtraFrag === void 0;
	let operationsCount = 0;
	const { ids, frag: declarationFrags, varNames } = processExpressions(context, expressions, shouldDeclare);
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
}
function genEffect({ operations }, context) {
	const [frag, push] = buildCodeFragment();
	const operationsExps = genOperations(operations, context);
	if (operationsExps.filter((frag) => frag === NEWLINE).length > 1) push(...operationsExps);
	else push(...operationsExps.filter((frag) => frag !== NEWLINE));
	return frag;
}
function genInsertionState(operation, context) {
	const { parent, anchor, logicalIndex, append, last } = operation;
	return [NEWLINE, ...genCall(context.helper("setInsertionState"), `n${parent}`, anchor == null ? void 0 : anchor === -1 ? `0` : append ? "null" : `n${anchor}`, logicalIndex !== void 0 ? String(logicalIndex) : void 0, last && "true")];
}

//#endregion
//#region packages/compiler-vapor/src/generators/template.ts
function genTemplates(templates, rootIndexes, context) {
	const result = [];
	let i = 0;
	templates.forEach((ns, template) => {
		result.push(`const ${context.tName(i)} = ${context.helper("template")}(${JSON.stringify(template).replace(IMPORT_EXPR_RE, `" + $1 + "`)}${rootIndexes.has(i) ? ", true" : ns ? ", false" : ""}${ns ? `, ${ns}` : ""})\n`);
		i++;
	});
	return result.join("");
}
function genSelf(dynamic, context) {
	const [frag, push] = buildCodeFragment();
	const { id, template, operation, hasDynamicChild } = dynamic;
	if (id !== void 0 && template !== void 0) {
		push(NEWLINE, `const n${id} = ${context.tName(template)}()`);
		push(...genDirectivesForElement(id, context));
	}
	if (operation) push(...genOperationWithInsertionState(operation, context));
	if (hasDynamicChild) push(...genChildren(dynamic, context, push, `n${id}`));
	return frag;
}
function genChildren(dynamic, context, pushBlock, from = `n${dynamic.id}`) {
	const { helper } = context;
	const [frag, push] = buildCodeFragment();
	const { children } = dynamic;
	let offset = 0;
	let prev;
	for (const [index, child] of children.entries()) {
		if (child.flags & 2) offset--;
		if (child.flags & 4 && child.template != null) {
			push(...genSelf(child, context));
			continue;
		}
		const id = child.flags & 1 ? child.flags & 4 ? child.anchor : child.id : void 0;
		if (id === void 0 && !child.hasDynamicChild) {
			push(...genSelf(child, context));
			continue;
		}
		const elementIndex = index + offset;
		const logicalIndex = child.logicalIndex !== void 0 ? String(child.logicalIndex) : void 0;
		const variable = id === void 0 ? context.pName(context.block.tempId++) : `n${id}`;
		pushBlock(NEWLINE, `const ${variable} = `);
		if (prev) if (elementIndex - prev[1] === 1) pushBlock(...genCall(helper("next"), prev[0], logicalIndex));
		else pushBlock(...genCall(helper("nthChild"), from, String(elementIndex), logicalIndex));
		else if (elementIndex === 0) pushBlock(...genCall(helper("child"), from, child.logicalIndex !== 0 ? logicalIndex : void 0));
		else {
			let init = genCall(helper("child"), from);
			if (elementIndex === 1) init = genCall(helper("next"), init, logicalIndex);
			else if (elementIndex > 1) init = genCall(helper("nthChild"), from, String(elementIndex), logicalIndex);
			pushBlock(...init);
		}
		if (id === child.anchor && !child.hasDynamicChild) push(...genSelf(child, context));
		if (id !== void 0) push(...genDirectivesForElement(id, context));
		prev = [variable, elementIndex];
		push(...genChildren(child, context, pushBlock, variable));
	}
	return frag;
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
function genBlockContent(block, context, root, genEffectsExtraFrag) {
	const [frag, push] = buildCodeFragment();
	const { dynamic, effect, operation, returns } = block;
	const resetBlock = context.enterBlock(block);
	if (root) {
		for (let name of context.ir.component) {
			const id = (0, _vue_compiler_dom.toValidAssetId)(name, "component");
			const maybeSelfReference = name.endsWith("__self");
			if (maybeSelfReference) name = name.slice(0, -6);
			push(NEWLINE, `const ${id} = `, ...genCall(context.helper("resolveComponent"), JSON.stringify(name), maybeSelfReference ? "true" : void 0));
		}
		genResolveAssets("directive", "resolveDirective");
	}
	for (const child of dynamic.children) push(...genSelf(child, context));
	for (const child of dynamic.children) if (!child.hasDynamicChild) push(...genChildren(child, context, push, `n${child.id}`));
	push(...genOperations(operation, context));
	push(...genEffects(effect, context, genEffectsExtraFrag));
	if (root && context.ir.hasDeferredVShow) push(NEWLINE, `deferredApplyVShows.forEach(fn => fn())`);
	push(NEWLINE, `return `);
	const returnNodes = returns.map((n) => `n${n}`);
	push(...returnNodes.length > 1 ? genMulti(DELIMITERS_ARRAY, ...returnNodes) : [returnNodes[0] || "null"]);
	resetBlock();
	return frag;
	function genResolveAssets(kind, helper) {
		for (const name of context.ir[kind]) push(NEWLINE, `const ${(0, _vue_compiler_dom.toValidAssetId)(name, kind)} = `, ...genCall(context.helper(helper), JSON.stringify(name)));
	}
}

//#endregion
//#region packages/compiler-vapor/src/generate.ts
const idWithTrailingDigitsRE = /^([A-Za-z_$][\w$]*)(\d+)$/;
var CodegenContext = class {
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
	enterScope() {
		return [this.scopeLevel++, () => this.scopeLevel--];
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
		this.helper = (name) => {
			if (this.helpers.has(name)) return this.helpers.get(name);
			const base = `_${name}`;
			if (this.bindingNames.size === 0 || !this.bindingNames.has(base)) {
				this.helpers.set(name, base);
				return base;
			}
			const alias = `${base}${getNextId(this.nextIdMap.get(base), 1)}`;
			this.helpers.set(name, alias);
			return alias;
		};
		this.delegates = /* @__PURE__ */ new Set();
		this.identifiers = Object.create(null);
		this.seenInlineHandlerNames = Object.create(null);
		this.scopeLevel = 0;
		this.templateVars = /* @__PURE__ */ new Map();
		this.nextIdMap = /* @__PURE__ */ new Map();
		this.lastIdMap = /* @__PURE__ */ new Map();
		this.lastTIndex = -1;
		this.options = (0, _vue_shared.extend)({
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
		}, options);
		this.block = ir.block;
		this.bindingNames = new Set(this.options.bindingMetadata ? Object.keys(this.options.bindingMetadata) : []);
		this.initNextIdMap();
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
	if (ir.hasTemplateRef) push(NEWLINE, `const ${setTemplateRefIdent} = ${context.helper("createTemplateRefSetter")}()`);
	if (ir.hasDeferredVShow) push(NEWLINE, `const deferredApplyVShows = []`);
	push(...genBlockContent(ir.block, context, true));
	push(INDENT_END, NEWLINE);
	if (!inline) push("}");
	const delegates = genDelegates(context);
	const templates = genTemplates(ir.template, ir.rootTemplateIndexes, context);
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

//#endregion
//#region packages/compiler-vapor/src/transforms/transformChildren.ts
const transformChildren = (node, context) => {
	const isFragment = node.type === 0 || node.type === 1 && (node.tagType === 3 || node.tagType === 1);
	if (!isFragment && node.type !== 1) return;
	for (const [i, child] of node.children.entries()) {
		const childContext = context.create(child, i);
		transformNode(childContext);
		const childDynamic = childContext.dynamic;
		if (isFragment) {
			childContext.reference();
			childContext.registerTemplate();
			if (!(childDynamic.flags & 2) || childDynamic.flags & 4) context.block.returns.push(childContext.dynamic.id);
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
	let dynamicCount = 0;
	let lastInsertionChild;
	const children = context.dynamic.children;
	let logicalIndex = 0;
	for (const [index, child] of children.entries()) {
		if (child.flags & 4) {
			child.logicalIndex = logicalIndex;
			prevDynamics.push(lastInsertionChild = child);
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
				dynamicCount += prevDynamics.length;
				prevDynamics = [];
			}
			staticCount++;
			logicalIndex++;
		}
	}
	if (prevDynamics.length) registerInsertion(prevDynamics, context, dynamicCount + staticCount, true);
	if (lastInsertionChild && lastInsertionChild.operation) lastInsertionChild.operation.last = true;
}
function registerInsertion(dynamics, context, anchor, append) {
	for (const child of dynamics) {
		const logicalIndex = child.logicalIndex;
		if (child.template != null) context.registerOperation({
			type: 9,
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
//#region packages/compiler-vapor/src/transforms/transformElement.ts
const isReservedProp = /* @__PURE__ */ (0, _vue_shared.makeMap)(",key,ref,ref_for,ref_key,");
const transformElement = (node, context) => {
	let effectIndex = context.block.effect.length;
	const getEffectIndex = () => effectIndex++;
	let operationIndex = context.block.operation.length;
	const getOperationIndex = () => operationIndex++;
	let parentSlots;
	if (node.type === 1 && (node.tagType === 1 || context.options.isCustomElement(node.tag))) {
		parentSlots = context.slots;
		context.slots = [];
	}
	return function postTransformElement() {
		({node} = context);
		if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1))) return;
		const isCustomElement = !!context.options.isCustomElement(node.tag);
		const isComponent = node.tagType === 1 || isCustomElement;
		const isDynamicComponent = isComponentTag(node.tag);
		const propsResult = buildProps(node, context, isComponent, isDynamicComponent, getEffectIndex);
		const singleRoot = isSingleRoot(context);
		if (isComponent) transformComponentElement(node, propsResult, singleRoot, context, isDynamicComponent, isCustomElement);
		else transformNativeElement(node, propsResult, singleRoot, context, getEffectIndex, context.root === context.effectiveParent || canOmitEndTag(node, context), getOperationIndex);
		if (parentSlots) context.slots = parentSlots;
	};
};
function canOmitEndTag(node, context) {
	const { block, parent } = context;
	if (!parent) return false;
	if (block !== parent.block) return true;
	if ((0, _vue_shared.isAlwaysCloseTag)(node.tag) && !context.isOnRightmostPath) return false;
	if ((0, _vue_shared.isFormattingTag)(node.tag) || parent.node.type === 1 && node.tag === parent.node.tag) return context.isOnRightmostPath;
	if ((0, _vue_shared.isBlockTag)(node.tag) && context.hasInlineAncestorNeedingClose) return false;
	return context.isLastEffectiveChild;
}
function isSingleRoot(context) {
	if (context.inVFor) return false;
	let { parent } = context;
	if (parent && !((0, _vue_compiler_dom.hasSingleChild)(parent.node) || (0, _vue_compiler_dom.isSingleIfBlock)(parent.node))) return false;
	while (parent && parent.parent && parent.node.type === 1 && parent.node.tagType === 3) {
		parent = parent.parent;
		if (!((0, _vue_compiler_dom.hasSingleChild)(parent.node) || (0, _vue_compiler_dom.isSingleIfBlock)(parent.node))) return false;
	}
	return context.root === parent;
}
function transformComponentElement(node, propsResult, singleRoot, context, isDynamicComponent, isCustomElement) {
	const dynamicComponent = isDynamicComponent ? resolveDynamicComponent(node) : void 0;
	let { tag } = node;
	let asset = true;
	if (!dynamicComponent && !isCustomElement) {
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
	context.dynamic.operation = {
		type: 11,
		node,
		id: context.reference(),
		tag,
		props: propsResult[0] ? propsResult[1] : [propsResult[1]],
		asset,
		root: singleRoot,
		slots: [...context.slots],
		once: context.inVOnce,
		dynamic: dynamicComponent,
		isCustomElement
	};
	context.slots = [];
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
function transformNativeElement(node, propsResult, singleRoot, context, getEffectIndex, omitEndTag, getOperationIndex) {
	const isDom2 = !!context.options.platform;
	if (isDom2) omitEndTag = false;
	const { tag } = node;
	const { scopeId } = context.options;
	let template = "";
	template += `<${tag}`;
	if (scopeId) template += ` ${scopeId}`;
	if (isDom2 && singleRoot) {
		template += ` gen-flag-flatten=""`;
		const rootElementTagName = context.options.rootElementTagName;
		if (rootElementTagName || context.options.genVueId) template += ` gen-vue-id=""`;
		if (rootElementTagName) template += ` custom-tag-name="${rootElementTagName}"`;
	}
	const dynamicProps = [];
	if (propsResult[0]) {
		const [, dynamicArgs, expressions] = propsResult;
		context.registerEffect(expressions, {
			type: 3,
			node,
			element: context.reference(),
			props: dynamicArgs,
			tag
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
					const { key, values } = props[i];
					if (key.content.startsWith("change:") || changeProps.includes(key.content)) continue;
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
		let prevWasQuoted = false;
		for (const prop of propsResult[1]) {
			const { key, values } = prop;
			if (isDom2) {
				if (key.content.startsWith("change:")) {
					dynamicProps.push(key.content);
					values[0].isStatic = false;
					context.registerEffect(values, {
						type: 18,
						node,
						prop
					}, getEffectIndex);
					continue;
				}
				if (key.content === "class") hasClass = true;
			}
			if (context.imports.some((imported) => values[0].content.includes(imported.exp.content))) {
				if (!prevWasQuoted) template += ` `;
				template += `${key.content}="${IMPORT_EXP_START}${values[0].content}${IMPORT_EXP_END}"`;
				prevWasQuoted = true;
			} else if (key.isStatic && values.length === 1 && (values[0].isStatic || values[0].content === "''") && !dynamicKeys.includes(key.content)) {
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
						type: 2,
						node,
						element: context.reference(),
						prop,
						tag
					}, getEffectIndex, getOperationIndex);
					continue;
				}
				if (!prevWasQuoted) template += ` `;
				const value = values[0].content === "''" ? "" : values[0].content;
				template += key.content;
				if (value) template += (prevWasQuoted = NEEDS_QUOTES_RE.test(value)) ? `="${value.replace(/"/g, "&quot;")}"` : `=${value}`;
				else prevWasQuoted = false;
			} else {
				dynamicProps.push(key.content);
				context.registerEffect(values, {
					type: 2,
					node,
					isChangeProp: changeProps.includes(key.content),
					element: context.reference(),
					prop,
					tag
				}, getEffectIndex);
			}
		}
		if (hasStaticStyle && hasClass) template += ` ext:style`;
	}
	template += `>` + context.childrenTemplate.join("");
	if (!(0, _vue_shared.isVoidTag)(tag) && !omitEndTag) template += `</${tag}>`;
	if (singleRoot) context.ir.rootTemplateIndexes.add(context.ir.template.size);
	if (context.parent && context.parent.node.type === 1 && !(0, _vue_compiler_dom.isValidHTMLNesting)(context.parent.node.tag, tag)) {
		context.reference();
		context.dynamic.template = context.pushTemplate(template);
		context.dynamic.flags |= 6;
	} else context.template += template;
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
	for (const prop of props) {
		if (prop.type === 7 && !prop.arg) {
			if (prop.name === "bind") {
				if (prop.exp) {
					dynamicExpr.push(prop.exp);
					pushMergeArg();
					dynamicArgs.push({
						kind: 0,
						value: prop.exp
					});
				} else context.options.onError((0, _vue_compiler_dom.createCompilerError)(34, prop.loc));
				continue;
			} else if (prop.name === "on") {
				if (prop.exp) if (isComponent) {
					dynamicExpr.push(prop.exp);
					pushMergeArg();
					dynamicArgs.push({
						kind: 0,
						value: prop.exp,
						handler: true
					});
				} else context.registerEffect([prop.exp], {
					type: 6,
					node,
					element: context.reference(),
					event: prop.exp
				}, getEffectIndex);
				else context.options.onError((0, _vue_compiler_dom.createCompilerError)(35, prop.loc));
				continue;
			}
		}
		if (isDynamicComponent && prop.type === 6 && prop.name === "is" || prop.type === 7 && prop.name === "bind" && (0, _vue_compiler_dom.isStaticArgOf)(prop.arg, "is")) continue;
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
			type: 13,
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
function mergePropValues(existing, incoming) {
	const newValues = incoming.values;
	existing.values.push(...newValues);
}
function isComponentTag(tag) {
	return tag === "component" || tag === "Component";
}

//#endregion
//#region packages/compiler-vapor/src/transforms/vHtml.ts
const transformVHtml = (dir, node, context) => {
	let { exp, loc } = dir;
	if (!exp) {
		context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(54, loc));
		exp = EMPTY_EXPRESSION;
	}
	if (node.children.length) {
		context.options.onError((0, _vue_compiler_dom.createDOMCompilerError)(55, loc));
		context.childrenTemplate.length = 0;
	}
	context.registerEffect([exp], {
		type: 7,
		node,
		element: context.reference(),
		value: exp,
		isComponent: node.tagType === 1
	});
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

//#endregion
//#region packages/shared/src/domTagConfig.ts
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
/**
* Compiler only.
* Do NOT use in runtime code paths unless behind `__DEV__` flag.
*/
const isVoidTag = /* @__PURE__ */ makeMap$1(VOID_TAGS);

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
	}
	if (isVoidTag(context.node.tag)) return;
	const literal = getLiteralExpressionValue(exp);
	if (literal != null) context.childrenTemplate = [String(literal)];
	else {
		context.childrenTemplate = [context.options.platform ? TEXT_PLACEHOLDER : " "];
		const isComponent = node.tagType === 1;
		if (!isComponent) context.registerOperation({
			type: 16,
			node,
			parent: context.reference()
		});
		context.registerEffect([exp], {
			type: 4,
			node,
			element: context.reference(),
			values: [exp],
			generated: true,
			isComponent
		});
	}
};

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
	exp = resolveExpression(exp, isComponent);
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
//#region packages/compiler-vapor/src/transforms/vOn.ts
const delegatedEvents = /* @__PURE__ */ (0, _vue_shared.makeMap)("beforeinput,click,dblclick,contextmenu,focusin,focusout,input,keydown,keyup,mousedown,mousemove,mouseout,mouseover,mouseup,pointerdown,pointermove,pointerout,pointerover,pointerup,touchend,touchmove,touchstart");
const transformVOn = (dir, node, context) => {
	let { arg, exp, loc, modifiers } = dir;
	const isComponent = node.tagType === 1;
	const isSlotOutlet = node.tag === "slot";
	if (!exp && !modifiers.length) context.options.onError((0, _vue_compiler_dom.createCompilerError)(35, loc));
	arg = resolveExpression(arg);
	const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = (0, _vue_compiler_dom.resolveModifiers)(arg.isStatic ? `on${arg.content}` : arg, modifiers, null, loc);
	let keyOverride;
	const isStaticClick = arg.isStatic && arg.content.toLowerCase() === "click";
	if (nonKeyModifiers.includes("middle")) {
		if (keyOverride) {}
		if (isStaticClick) arg = (0, _vue_shared.extend)({}, arg, { content: "mouseup" });
		else if (!arg.isStatic) keyOverride = ["click", "mouseup"];
	}
	if (nonKeyModifiers.includes("right")) {
		if (isStaticClick) arg = (0, _vue_shared.extend)({}, arg, { content: "contextmenu" });
		else if (!arg.isStatic) keyOverride = ["click", "contextmenu"];
	}
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
	const delegate = arg.isStatic && !eventOptionModifiers.length && delegatedEvents(arg.content);
	const operation = {
		type: 5,
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
	let shouldDeferred = false;
	const parentNode = context.parent && context.parent.node;
	if (parentNode && parentNode.type === 1) {
		shouldDeferred = !!(isTransitionTag(parentNode.tag) && findProp$1(parentNode, "appear", false, true));
		if (shouldDeferred) context.ir.hasDeferredVShow = true;
	}
	context.registerOperation({
		type: 13,
		node,
		element: context.reference(),
		dir,
		name: "show",
		builtin: true,
		deferred: shouldDeferred
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
			type: 8,
			node,
			element: id,
			value,
			refFor: !!context.inVFor,
			effect
		});
	};
};

//#endregion
//#region packages/compiler-vapor/src/transforms/transformText.ts
const seen = /* @__PURE__ */ new WeakMap();
function markNonTemplate(node, context) {
	seen.get(context.root).add(node);
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
		if (!isFragment && isAllTextLike && hasInterp) processTextContainer(node.children, context);
		else if (hasInterp) for (let i = 0; i < node.children.length; i++) {
			const c = node.children[i];
			const prev = node.children[i - 1];
			if (c.type === 5 && prev && prev.type === 2) markNonTemplate(prev, context);
		}
	} else if (node.type === 5) processInterpolation(context);
	else if (node.type === 2) {
		var _context$parent;
		const parent = (_context$parent = context.parent) === null || _context$parent === void 0 ? void 0 : _context$parent.node;
		const isRootText = !parent || parent.type === 0 || parent.type === 1 && (parent.tagType === 3 || parent.tagType === 1);
		context.template += isRootText ? node.content : (0, _vue_shared.escapeHtml)(node.content);
	}
};
function processInterpolation(context) {
	const parentNode = context.parent.node;
	const children = parentNode.children;
	const nexts = children.slice(context.index);
	const idx = nexts.findIndex((n) => !isTextLike(n));
	const nodes = idx > -1 ? nexts.slice(0, idx) : nexts;
	const prev = children[context.index - 1];
	if (prev && prev.type === 2) nodes.unshift(prev);
	const values = processTextLikeChildren(nodes, context);
	if (values.length === 0 && parentNode.type !== 0) return;
	const literalValues = values.map((v) => getLiteralExpressionValue(v));
	if (literalValues.every((v) => v != null) && parentNode.type !== 0) {
		const text = literalValues.join("");
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
		type: 4,
		node: context.node,
		element: id,
		values
	});
}
function processTextContainer(children, context) {
	const values = processTextLikeChildren(children, context);
	const literals = values.map((value) => getLiteralExpressionValue(value));
	if (literals.every((l) => l != null)) context.childrenTemplate = literals.map((l) => (0, _vue_shared.escapeHtml)(String(l)));
	else {
		context.childrenTemplate = [context.options.platform ? TEXT_PLACEHOLDER : " "];
		context.registerOperation({
			type: 16,
			node: context.node,
			parent: context.reference()
		});
		context.registerEffect(values, {
			type: 4,
			node: context.node,
			element: context.reference(),
			values,
			generated: true
		});
	}
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
		type: 13,
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
const transformComment = (node, context) => {
	if (node.type !== 3) return;
	if (getSiblingIf(context)) {
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
	if (dir.name === "if") {
		const id = context.reference();
		context.dynamic.flags |= 4;
		const [branch, onExit] = createIfBranch(node, context);
		return () => {
			onExit();
			context.dynamic.operation = {
				type: 14,
				node,
				id,
				condition: dir.exp,
				positive: branch,
				index: isInTransition(context) ? context.root.nextIfIndex() : void 0,
				once: context.inVOnce || isStaticExpression(dir.exp, context.options.bindingMetadata)
			};
		};
	} else {
		const siblingIf = getSiblingIf(context, true);
		const siblings = context.parent && context.parent.dynamic.children;
		let lastIfNode;
		if (siblings) {
			let i = siblings.length;
			while (i--) if (siblings[i].operation && siblings[i].operation.type === 14) {
				lastIfNode = siblings[i].operation;
				break;
			}
		}
		if (!siblingIf || !lastIfNode || lastIfNode.type !== 14) {
			context.options.onError((0, _vue_compiler_dom.createCompilerError)(30, node.loc));
			return;
		}
		while (lastIfNode.negative && lastIfNode.negative.type === 14) lastIfNode = lastIfNode.negative;
		if (dir.name === "else-if" && lastIfNode.negative) context.options.onError((0, _vue_compiler_dom.createCompilerError)(30, node.loc));
		if (context.root.comment.length) {
			node = wrapTemplate(node, ["else-if", "else"]);
			context.node = node = (0, _vue_shared.extend)({}, node, { children: [...context.comment, ...node.children] });
		}
		context.root.comment = [];
		const [branch, onExit] = createIfBranch(node, context);
		if (dir.name === "else") lastIfNode.negative = branch;
		else lastIfNode.negative = {
			type: 14,
			node,
			id: -1,
			condition: dir.exp,
			positive: branch,
			index: isInTransition(context) ? context.root.nextIfIndex() : void 0,
			once: context.inVOnce || isStaticExpression(dir.exp, context.options.bindingMetadata)
		};
		return () => onExit();
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
	context.node = node = wrapTemplate(node, ["for"]);
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
			type: 15,
			node,
			id,
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
		const runtimeDirective = context.block.operation.find((oper) => oper.type === 13 && oper.element === id);
		if (runtimeDirective) context.options.onError((0, _vue_compiler_dom.createCompilerError)(36, runtimeDirective.dir.loc));
	}
	return () => {
		exitBlock && exitBlock();
		context.dynamic.operation = {
			type: 12,
			node,
			id,
			name: slotName,
			props: irProps,
			fallback,
			noSlotted: !!(context.options.scopeId && !context.options.slotted),
			once: context.inVOnce
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
	const dir = findDir$2(node, "slot", true);
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
	const emptyTextNodes = [];
	const nonSlotTemplateChildren = children.filter((n) => {
		if (isNonWhitespaceContent(n)) return !(n.type === 1 && n.props.some(_vue_compiler_dom.isVSlot));
		else emptyTextNodes.push(n);
	});
	if (!nonSlotTemplateChildren.length) emptyTextNodes.forEach((n) => {
		markNonTemplate(n, context);
	});
	const [block, onExit] = createSlotBlock(node, dir, context);
	if (isTransitionNode(node) && nonSlotTemplateChildren.length) {
		const nonCommentChild = nonSlotTemplateChildren.find((n) => !(0, _vue_compiler_dom.isCommentOrWhitespace)(n));
		if (nonCommentChild) {
			const keyProp = findProp$1(nonCommentChild, "key");
			if (keyProp) block.key = keyProp.exp;
		}
	}
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
	const arg = dir.arg && resolveExpression(dir.arg);
	const vFor = findDir$2(node, "for");
	const vIf = findDir$2(node, "if");
	const vElse = findDir$2(node, /^else(-if)?$/, true);
	const { slots } = context;
	const [block, onExit] = createSlotBlock(node, dir, context);
	if (!vFor && !vIf && !vElse) {
		const slotName = arg ? arg.isStatic && arg.content : "default";
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
		if (vIfSlot.slotType === 3) {
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
	if (children.length === 1 && first.type === 1 && (findDir$2(first, "for") || (0, _vue_compiler_dom.isTemplateNode)(first))) return true;
	const hasElse = (node) => findDir$2(node, "else-if") || findDir$2(node, "else", true);
	if (children.every((c, index) => c.type === 1 && !(0, _vue_compiler_dom.isTemplateNode)(c) && !findDir$2(c, "for") && (index === 0 ? findDir$2(c, "if") : hasElse(c)))) return false;
	return children.length > 1;
}

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
//#region packages/compiler-vapor/src/errors.ts
function createVaporCompilerError(code, loc) {
	return (0, _vue_compiler_dom.createCompilerError)(code, loc, VaporErrorMessages);
}
const VaporErrorCodes = {
	"X_V_PLACEHOLDER": 100,
	"100": "X_V_PLACEHOLDER",
	"__EXTEND_POINT__": 101,
	"101": "__EXTEND_POINT__"
};
const VaporErrorMessages = {
	[100]: `[placeholder]`,
	[101]: ``
};

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
exports.genMulti = genMulti;
exports.generate = generate;
exports.getBaseTransformPreset = getBaseTransformPreset;
exports.getLiteralExpressionValue = getLiteralExpressionValue;
exports.isBlockOperation = isBlockOperation;
exports.isBuiltInComponent = isBuiltInComponent;
exports.isConstantExpression = isConstantExpression;
exports.isKeepAliveTag = isKeepAliveTag;
exports.isStaticExpression = isStaticExpression;
exports.isTeleportTag = isTeleportTag;
exports.isTransitionGroupTag = isTransitionGroupTag;
exports.isTransitionTag = isTransitionTag;
exports.needsVaporCtx = needsVaporCtx;
exports.parse = _vue_compiler_dom.parse;
exports.parseValueDestructure = parseValueDestructure;
exports.propToExpression = propToExpression;
exports.transform = transform;
exports.transformChildren = transformChildren;
exports.transformComment = transformComment;
exports.transformElement = transformElement;
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