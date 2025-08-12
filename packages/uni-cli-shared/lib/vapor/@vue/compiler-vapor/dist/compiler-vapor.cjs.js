/**
* @vue/compiler-vapor v3.6.0-alpha.2
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compilerDom = require('@vue/compiler-dom');
var shared = require('@vue/shared');
var sourceMapJs = require('source-map-js');
var parser = require('@babel/parser');
var types = require('@babel/types');
var estreeWalker = require('estree-walker');

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
    return node;
  }
  const reserved = [];
  const pass = [];
  node.props.forEach((prop) => {
    if (prop.type === 7 && dirs.includes(prop.name)) {
      reserved.push(prop);
    } else {
      pass.push(prop);
    }
  });
  return shared.extend({}, node, {
    type: 1,
    tag: "template",
    props: reserved,
    tagType: 3,
    children: [shared.extend({}, node, { props: pass })]
  });
}
const EMPTY_EXPRESSION = compilerDom.createSimpleExpression(
  "",
  true
);

const findProp = compilerDom.findProp;
const findDir = compilerDom.findDir;
function propToExpression(prop) {
  return prop.type === 6 ? prop.value ? compilerDom.createSimpleExpression(prop.value.content, true, prop.value.loc) : EMPTY_EXPRESSION : prop.exp;
}
function isConstantExpression(exp) {
  return compilerDom.isLiteralWhitelisted(exp.content) || shared.isGloballyAllowed(exp.content) || getLiteralExpressionValue(exp) !== null;
}
function isStaticExpression(node, bindings) {
  if (node.ast) {
    return compilerDom.isConstantNode(node.ast, bindings);
  } else if (node.ast === null) {
    const type = bindings[node.content];
    return type === "literal-const";
  }
  return false;
}
function resolveExpression(exp) {
  if (!exp.isStatic) {
    const value = getLiteralExpressionValue(exp);
    if (value !== null) {
      return compilerDom.createSimpleExpression("" + value, true, exp.loc);
    }
  }
  return exp;
}
function getLiteralExpressionValue(exp) {
  if (exp.ast) {
    if (exp.ast.type === "StringLiteral") {
      return exp.ast.value;
    } else if (exp.ast.type === "TemplateLiteral" && exp.ast.expressions.length === 0) {
      return exp.ast.quasis[0].value.cooked;
    }
  }
  return exp.isStatic ? exp.content : null;
}

class TransformContext {
  constructor(ir, node, options = {}) {
    this.ir = ir;
    this.node = node;
    this.selfName = null;
    this.parent = null;
    this.index = 0;
    this.block = this.ir.block;
    this.template = "";
    this.childrenTemplate = [];
    this.dynamic = this.ir.block.dynamic;
    this.inVOnce = false;
    this.inVFor = 0;
    this.comment = [];
    this.component = this.ir.component;
    this.directive = this.ir.directive;
    this.slots = [];
    this.globalId = 0;
    this.increaseId = () => this.globalId++;
    this.options = shared.extend({}, defaultOptions, options);
    this.root = this;
    if (options.filename) this.selfName = compilerDom.getSelfName(options.filename);
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
  reference() {
    if (this.dynamic.id !== void 0) return this.dynamic.id;
    this.dynamic.flags |= 1;
    return this.dynamic.id = this.increaseId();
  }
  pushTemplate(content) {
    const existing = this.ir.template.findIndex(
      (template) => template === content
    );
    if (existing !== -1) return existing;
    this.ir.template.push(content);
    return this.ir.template.length - 1;
  }
  registerTemplate() {
    if (!this.template) return -1;
    const id = this.pushTemplate(this.template);
    return this.dynamic.template = id;
  }
  registerEffect(expressions, operation, getIndex = () => this.block.effect.length) {
    const operations = [operation].flat();
    expressions = expressions.filter((exp) => !isConstantExpression(exp));
    if (this.inVOnce || expressions.length === 0 || expressions.every(
      (e) => isStaticExpression(e, this.root.options.bindingMetadata)
    )) {
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
    return Object.assign(Object.create(TransformContext.prototype), this, {
      node,
      parent: this,
      index,
      template: "",
      childrenTemplate: [],
      dynamic: newDynamic()
    });
  }
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
  isBuiltInComponent: shared.NOOP,
  isCustomElement: shared.NOOP,
  expressionPlugins: [],
  scopeId: null,
  slotted: true,
  ssr: false,
  inSSR: false,
  ssrCssVars: ``,
  templateMode: "string",
  bindingMetadata: shared.EMPTY_OBJ,
  inline: false,
  isTS: false,
  // fixed by uts
  disableEventDelegation: false,
  disableClassBinding: false,
  onError: compilerDom.defaultOnError,
  onWarn: compilerDom.defaultOnWarn
};
function transform(node, options = {}) {
  const ir = {
    type: 0,
    node,
    source: node.source,
    template: [],
    component: /* @__PURE__ */ new Set(),
    directive: /* @__PURE__ */ new Set(),
    block: newBlock(node),
    hasTemplateRef: false
  };
  const context = new TransformContext(ir, node, options);
  transformNode(context);
  return ir;
}
function transformNode(context) {
  let { node } = context;
  const { nodeTransforms } = context.options;
  const exitFns = [];
  for (const nodeTransform of nodeTransforms) {
    const onExit = nodeTransform(node, context);
    if (onExit) {
      if (shared.isArray(onExit)) {
        exitFns.push(...onExit);
      } else {
        exitFns.push(onExit);
      }
    }
    if (!context.node) {
      return;
    } else {
      node = context.node;
    }
  }
  context.node = node;
  let i = exitFns.length;
  while (i--) {
    exitFns[i]();
  }
  if (context.node.type === 0) {
    context.registerTemplate();
  }
}
function createStructuralDirectiveTransform(name, fn) {
  const matches = (n) => shared.isString(name) ? n === name : name.includes(n);
  return (node, context) => {
    if (node.type === 1) {
      const { props } = node;
      if (node.tagType === 3 && props.some(compilerDom.isVSlot)) {
        return;
      }
      const exitFns = [];
      for (const prop of props) {
        if (prop.type === 7 && matches(prop.name)) {
          const onExit = fn(
            node,
            prop,
            context
          );
          if (onExit) exitFns.push(onExit);
        }
      }
      return exitFns;
    }
  };
}

const NEWLINE = Symbol(`newline` );
const LF = Symbol(`line feed` );
const INDENT_START = Symbol(`indent start` );
const INDENT_END = Symbol(`indent end` );
function buildCodeFragment(...frag) {
  const push = frag.push.bind(frag);
  const unshift = frag.unshift.bind(frag);
  return [frag, push, unshift];
}
function genMulti([left, right, seg, placeholder], ...frags) {
  if (placeholder) {
    while (frags.length > 0 && !frags[frags.length - 1]) {
      frags.pop();
    }
    frags = frags.map((frag2) => frag2 || placeholder);
  } else {
    frags = frags.filter(Boolean);
  }
  const frag = [];
  push(left);
  for (let [i, fn] of frags.entries()) {
    push(fn);
    if (i < frags.length - 1) push(seg);
  }
  push(right);
  return frag;
  function push(fn) {
    if (!shared.isArray(fn)) fn = [fn];
    frag.push(...fn);
  }
}
const DELIMITERS_ARRAY = ["[", "]", ", "];
const DELIMITERS_ARRAY_NEWLINE = [
  ["[", INDENT_START, NEWLINE],
  [INDENT_END, NEWLINE, "]"],
  [", ", NEWLINE]
];
const DELIMITERS_OBJECT = ["{ ", " }", ", "];
const DELIMITERS_OBJECT_NEWLINE = [
  ["{", INDENT_START, NEWLINE],
  [INDENT_END, NEWLINE, "}"],
  [", ", NEWLINE]
];
function genCall(name, ...frags) {
  const hasPlaceholder = shared.isArray(name);
  const fnName = hasPlaceholder ? name[0] : name;
  const placeholder = hasPlaceholder ? name[1] : "null";
  return [fnName, ...genMulti(["(", ")", ", ", placeholder], ...frags)];
}
function codeFragmentToString(code, context) {
  const {
    options: { filename, sourceMap }
  } = context;
  let map;
  if (sourceMap) {
    map = new sourceMapJs.SourceMapGenerator();
    map.setSourceContent(filename, context.ir.source);
    map._sources.add(filename);
  }
  let codegen = "";
  const pos = { line: 1, column: 1, offset: 0 };
  let indentLevel = 0;
  for (let frag of code) {
    if (!frag) continue;
    if (frag === NEWLINE) {
      frag = [`
${`  `.repeat(indentLevel)}`, 0];
    } else if (frag === INDENT_START) {
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
    if (shared.isString(frag)) frag = [frag];
    let [code2, newlineIndex = -2, loc, name] = frag;
    codegen += code2;
    if (map) {
      if (loc) addMapping(loc.start, name);
      if (newlineIndex === -3) {
        compilerDom.advancePositionWithMutation(pos, code2);
      } else {
        pos.offset += code2.length;
        if (newlineIndex === -2) {
          pos.column += code2.length;
        } else {
          if (newlineIndex === -1) {
            newlineIndex = code2.length - 1;
          }
          pos.line++;
          pos.column = code2.length - newlineIndex;
        }
      }
      if (loc && loc !== compilerDom.locStub) {
        addMapping(loc.end);
      }
    }
  }
  return [codegen, map];
  function addMapping(loc, name = null) {
    const { _names, _mappings } = map;
    if (name !== null && !_names.has(name)) _names.add(name);
    _mappings.add({
      originalLine: loc.line,
      originalColumn: loc.column - 1,
      // source-map column is 0 based
      generatedLine: pos.line,
      generatedColumn: pos.column - 1,
      source: filename,
      name
    });
  }
}

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
  "DECLARE_OLD_REF": 14,
  "14": "DECLARE_OLD_REF",
  "IF": 15,
  "15": "IF",
  "FOR": 16,
  "16": "FOR",
  "GET_TEXT_CHILD": 17,
  "17": "GET_TEXT_CHILD"
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
  return type === 11 || type === 12 || type === 15 || type === 16;
}

function genInsertNode({ parent, elements, anchor }, { helper }) {
  let element = elements.map((el) => `n${el}`).join(", ");
  if (elements.length > 1) element = `[${element}]`;
  return [
    NEWLINE,
    ...genCall(
      helper("insert"),
      element,
      `n${parent}`,
      anchor === void 0 ? void 0 : `n${anchor}`
    )
  ];
}
function genPrependNode(oper, { helper }) {
  return [
    NEWLINE,
    ...genCall(
      helper("prepend"),
      `n${oper.parent}`,
      ...oper.elements.map((el) => `n${el}`)
    )
  ];
}

function genExpression(node, context, assignment) {
  const { content, ast, isStatic, loc } = node;
  if (isStatic) {
    return [[JSON.stringify(content), -2, loc]];
  }
  if (!node.content.trim() || // there was a parsing error
  ast === false || isConstantExpression(node)) {
    return [[content, -2, loc], assignment && ` = ${assignment}`];
  }
  if (ast === null) {
    return genIdentifier(content, context, loc, assignment);
  }
  const ids = [];
  const parentStackMap = /* @__PURE__ */ new Map();
  const parentStack = [];
  compilerDom.walkIdentifiers(
    ast,
    (id) => {
      ids.push(id);
      parentStackMap.set(id, parentStack.slice());
    },
    false,
    parentStack
  );
  let hasMemberExpression = false;
  if (ids.length) {
    const [frag, push] = buildCodeFragment();
    const isTSNode = ast && compilerDom.TS_NODE_TYPES.includes(ast.type);
    ids.sort((a, b) => a.start - b.start).forEach((id, i) => {
      const start = id.start - 1;
      const end = id.end - 1;
      const last = ids[i - 1];
      if (!(isTSNode && i === 0)) {
        const leadingText = content.slice(last ? last.end - 1 : 0, start);
        if (leadingText.length) push([leadingText, -3]);
      }
      const source = content.slice(start, end);
      const parentStack2 = parentStackMap.get(id);
      const parent = parentStack2[parentStack2.length - 1];
      hasMemberExpression || (hasMemberExpression = parent && (parent.type === "MemberExpression" || parent.type === "OptionalMemberExpression"));
      push(
        ...genIdentifier(
          source,
          context,
          {
            start: compilerDom.advancePositionWithClone(node.loc.start, source, start),
            end: compilerDom.advancePositionWithClone(node.loc.start, source, end),
            source
          },
          hasMemberExpression ? void 0 : assignment,
          id,
          parent,
          parentStack2
        )
      );
      if (i === ids.length - 1 && end < content.length && !isTSNode) {
        push([content.slice(end), -3]);
      }
    });
    if (assignment && hasMemberExpression) {
      push(` = ${assignment}`);
    }
    return frag;
  } else {
    return [[content, -3, loc]];
  }
}
function genIdentifier(raw, context, loc, assignment, id, parent, parentStack) {
  const { options, helper, identifiers } = context;
  const { inline, bindingMetadata } = options;
  let name = raw;
  const idMap = identifiers[raw];
  if (idMap && idMap.length) {
    const replacement = idMap[0];
    if (shared.isString(replacement)) {
      if (parent && parent.type === "ObjectProperty" && parent.shorthand) {
        return [[`${name}: ${replacement}`, -2, loc]];
      } else {
        return [[replacement, -2, loc]];
      }
    } else {
      return genExpression(replacement, context, assignment);
    }
  }
  let prefix;
  if (compilerDom.isStaticProperty(parent) && parent.shorthand) {
    prefix = `${raw}: `;
  }
  const type = bindingMetadata && bindingMetadata[raw];
  if (inline) {
    switch (type) {
      case "setup-let":
        name = raw = assignment ? `_isRef(${raw}) ? (${raw}.value = ${assignment}) : (${raw} = ${assignment})` : unref();
        break;
      case "setup-ref":
        name = raw = withAssignment(`${raw}.value`);
        break;
      case "setup-maybe-ref":
        const isDestructureAssignment = parent && compilerDom.isInDestructureAssignment(parent, parentStack || []);
        const isAssignmentLVal = parent && parent.type === "AssignmentExpression" && parent.left === id;
        const isUpdateArg = parent && parent.type === "UpdateExpression" && parent.argument === id;
        raw = isAssignmentLVal || isUpdateArg || isDestructureAssignment ? name = `${raw}.value` : assignment ? `${helper("isRef")}(${raw}) ? (${raw}.value = ${assignment}) : null` : unref();
        break;
      case "props":
        raw = shared.genPropsAccessExp(raw);
        break;
      case "props-aliased":
        raw = shared.genPropsAccessExp(bindingMetadata.__propsAliases[raw]);
        break;
      default:
        raw = withAssignment(raw);
    }
  } else {
    if (canPrefix(raw)) {
      if (type === "props-aliased") {
        raw = `$props['${bindingMetadata.__propsAliases[raw]}']`;
      } else {
        raw = `${type === "props" ? "$props" : "_ctx"}.${raw}`;
      }
    }
    raw = withAssignment(raw);
  }
  return [prefix, [raw, -2, loc, name]];
  function withAssignment(s) {
    return assignment ? `${s} = ${assignment}` : s;
  }
  function unref() {
    return `${helper("unref")}(${raw})`;
  }
}
function canPrefix(name) {
  if (shared.isGloballyAllowed(name)) {
    return false;
  }
  if (
    // special case for webpack compilation
    name === "require" || name === "$props" || name === "$emit" || name === "$attrs" || name === "$slots"
  )
    return false;
  return true;
}
function processExpressions(context, expressions, shouldDeclare) {
  const {
    seenVariable,
    variableToExpMap,
    expToVariableMap,
    seenIdentifier,
    updatedVariable
  } = analyzeExpressions(expressions);
  const varDeclarations = processRepeatedVariables(
    context,
    seenVariable,
    variableToExpMap,
    expToVariableMap,
    seenIdentifier,
    updatedVariable
  );
  const expDeclarations = processRepeatedExpressions(
    context,
    expressions,
    varDeclarations,
    updatedVariable,
    expToVariableMap
  );
  return genDeclarations(
    [...varDeclarations, ...expDeclarations],
    context,
    shouldDeclare
  );
}
function analyzeExpressions(expressions) {
  const seenVariable = /* @__PURE__ */ Object.create(null);
  const variableToExpMap = /* @__PURE__ */ new Map();
  const expToVariableMap = /* @__PURE__ */ new Map();
  const seenIdentifier = /* @__PURE__ */ new Set();
  const updatedVariable = /* @__PURE__ */ new Set();
  const registerVariable = (name, exp, isIdentifier, loc, parentStack = []) => {
    if (isIdentifier) seenIdentifier.add(name);
    seenVariable[name] = (seenVariable[name] || 0) + 1;
    variableToExpMap.set(
      name,
      (variableToExpMap.get(name) || /* @__PURE__ */ new Set()).add(exp)
    );
    const variables = expToVariableMap.get(exp) || [];
    variables.push({ name, loc });
    expToVariableMap.set(exp, variables);
    if (parentStack.some(
      (p) => p.type === "UpdateExpression" || p.type === "AssignmentExpression"
    )) {
      updatedVariable.add(name);
    }
  };
  for (const exp of expressions) {
    if (!exp.ast) {
      exp.ast === null && registerVariable(exp.content, exp, true);
      continue;
    }
    compilerDom.walkIdentifiers(exp.ast, (currentNode, parent, parentStack) => {
      if (parent && isMemberExpression(parent)) {
        const memberExp = extractMemberExpression(parent, (id) => {
          registerVariable(id.name, exp, true, {
            start: id.start,
            end: id.end
          });
        });
        registerVariable(
          memberExp,
          exp,
          false,
          { start: parent.start, end: parent.end },
          parentStack
        );
      } else if (!parentStack.some(isMemberExpression)) {
        registerVariable(
          currentNode.name,
          exp,
          true,
          { start: currentNode.start, end: currentNode.end },
          parentStack
        );
      }
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
            locs: expToVariableMap.get(node).reduce(
              (locs, v) => {
                if (v.name === name && v.loc) locs.push(v.loc);
                return locs;
              },
              []
            )
          });
          expToReplacementMap.set(node, replacements);
        }
      });
      if (!declarations.some((d) => d.name === varName) && (!isIdentifier || shouldDeclareVariable(name, expToVariableMap, exps))) {
        declarations.push({
          name: varName,
          isIdentifier,
          value: shared.extend(
            { ast: isIdentifier ? null : parseExp(context, name) },
            compilerDom.createSimpleExpression(name)
          ),
          rawName: name,
          exps,
          seenCount: seenVariable[name]
        });
      }
    }
  }
  for (const [exp, replacements] of expToReplacementMap) {
    replacements.flatMap(
      ({ name, locs }) => locs.map(({ start, end }) => ({ start, end, name }))
    ).sort((a, b) => b.end - a.end).forEach(({ start, end, name }) => {
      exp.content = exp.content.slice(0, start - 1) + name + exp.content.slice(end - 1);
    });
    exp.ast = parseExp(context, exp.content);
  }
  return declarations;
}
function shouldDeclareVariable(name, expToVariableMap, exps) {
  const vars = Array.from(
    exps,
    (exp) => expToVariableMap.get(exp).map((v) => v.name)
  );
  if (vars.every((v) => v.length === 1)) {
    return true;
  }
  if (vars.some((v) => v.filter((e) => e === name).length > 1)) {
    return true;
  }
  const first = vars[0];
  if (vars.some((v) => v.length !== first.length)) {
    if (vars.some(
      (v) => v.length > first.length && v.every((e) => first.includes(e))
    ) || vars.some((v) => first.length > v.length && first.every((e) => v.includes(e)))) {
      return false;
    }
    return true;
  }
  if (vars.some((v) => v.some((e) => first.includes(e)))) {
    return false;
  }
  return true;
}
function processRepeatedExpressions(context, expressions, varDeclarations, updatedVariable, expToVariableMap) {
  const declarations = [];
  const seenExp = expressions.reduce(
    (acc, exp) => {
      const variables = expToVariableMap.get(exp).map((v) => v.name);
      if (exp.ast && exp.ast.type !== "Identifier" && !(variables && variables.some((v) => updatedVariable.has(v)))) {
        acc[exp.content] = (acc[exp.content] || 0) + 1;
      }
      return acc;
    },
    /* @__PURE__ */ Object.create(null)
  );
  Object.entries(seenExp).forEach(([content, count]) => {
    if (count > 1) {
      const varName = genVarName(content);
      if (!declarations.some((d) => d.name === varName)) {
        const delVars = {};
        for (let i = varDeclarations.length - 1; i >= 0; i--) {
          const item = varDeclarations[i];
          if (!item.exps || !item.seenCount) continue;
          const shouldRemove = [...item.exps].every(
            (node) => node.content === content && item.seenCount === count
          );
          if (shouldRemove) {
            delVars[item.name] = item.rawName;
            varDeclarations.splice(i, 1);
          }
        }
        const value = shared.extend(
          {},
          expressions.find((exp) => exp.content === content)
        );
        Object.keys(delVars).forEach((name) => {
          value.content = value.content.replace(name, delVars[name]);
          if (value.ast) value.ast = parseExp(context, value.content);
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
          exp.content = exp.content.replace(
            new RegExp(escapeRegExp(content), "g"),
            varName
          );
          exp.ast = parseExp(context, exp.content);
        }
      });
    }
  });
  return declarations;
}
function genDeclarations(declarations, context, shouldDeclare) {
  const [frag, push] = buildCodeFragment();
  const ids = /* @__PURE__ */ Object.create(null);
  const varNames = /* @__PURE__ */ new Set();
  declarations.forEach(({ name, isIdentifier, value }) => {
    if (isIdentifier) {
      const varName = ids[name] = `_${name}`;
      varNames.add(varName);
      if (shouldDeclare) {
        push(`const `);
      }
      push(`${varName} = `, ...genExpression(value, context), NEWLINE);
    }
  });
  declarations.forEach(({ name, isIdentifier, value }) => {
    if (!isIdentifier) {
      const varName = ids[name] = `_${name}`;
      varNames.add(varName);
      if (shouldDeclare) {
        push(`const `);
      }
      push(
        `${varName} = `,
        ...context.withId(() => genExpression(value, context), ids),
        NEWLINE
      );
    }
  });
  return { ids, frag, varNames: [...varNames] };
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function parseExp(context, content) {
  const plugins = context.options.expressionPlugins;
  const options = {
    plugins: plugins ? [...plugins, "typescript"] : ["typescript"]
  };
  return parser.parseExpression(`(${content})`, options);
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
    case "StringLiteral":
      return exp.extra ? exp.extra.raw : exp.value;
    case "NumericLiteral":
      return exp.value.toString();
    case "BinaryExpression":
      return `${extractMemberExpression(exp.left, onIdentifier)} ${exp.operator} ${extractMemberExpression(exp.right, onIdentifier)}`;
    case "CallExpression":
      return `${extractMemberExpression(exp.callee, onIdentifier)}(${exp.arguments.map((arg) => extractMemberExpression(arg, onIdentifier)).join(", ")})`;
    case "MemberExpression":
    // foo[bar.baz]
    case "OptionalMemberExpression":
      const object = extractMemberExpression(exp.object, onIdentifier);
      const prop = exp.computed ? `[${extractMemberExpression(exp.property, onIdentifier)}]` : `.${extractMemberExpression(exp.property, shared.NOOP)}`;
      return `${object}${prop}`;
    default:
      return "";
  }
}
const isMemberExpression = (node) => {
  return node.type === "MemberExpression" || node.type === "OptionalMemberExpression";
};

function genSetEvent(oper, context) {
  const { helper } = context;
  const { element, key, keyOverride, value, modifiers, delegate, effect } = oper;
  const name = genName();
  const handler = genEventHandler(context, value, modifiers);
  const eventOptions = genEventOptions();
  if (delegate) {
    context.delegates.add(key.content);
    if (!context.block.operation.some(isSameDelegateEvent)) {
      return [NEWLINE, `n${element}.$evt${key.content} = `, ...handler];
    }
  }
  return [
    NEWLINE,
    ...genCall(
      helper(delegate ? "delegate" : "on"),
      `n${element}`,
      name,
      handler,
      eventOptions
    )
  ];
  function genName() {
    const expr = genExpression(key, context);
    if (keyOverride) {
      const find = JSON.stringify(keyOverride[0]);
      const replacement = JSON.stringify(keyOverride[1]);
      const wrapped = ["(", ...expr, ")"];
      return [...wrapped, ` === ${find} ? ${replacement} : `, ...wrapped];
    } else {
      return genExpression(key, context);
    }
  }
  function genEventOptions() {
    let { options } = modifiers;
    if (!options.length && !effect) return;
    return genMulti(
      DELIMITERS_OBJECT_NEWLINE,
      effect && ["effect: true"],
      ...options.map((option) => [`${option}: true`])
    );
  }
  function isSameDelegateEvent(op) {
    if (op.type === 5 && op !== oper && op.delegate && op.element === oper.element && op.key.content === key.content) {
      return true;
    }
  }
}
function genSetDynamicEvents(oper, context) {
  const { helper } = context;
  return [
    NEWLINE,
    ...genCall(
      helper("setDynamicEvents"),
      `n${oper.element}`,
      genExpression(oper.event, context)
    )
  ];
}
function genEventHandler(context, value, modifiers = { nonKeys: [], keys: [] }, extraWrap = false) {
  let handlerExp = [`() => {}`];
  if (value && value.content.trim()) {
    if (compilerDom.isMemberExpression(value, context.options)) {
      handlerExp = genExpression(value, context);
      if (!isConstantBinding(value, context) && !extraWrap) {
        handlerExp = [`e => `, ...handlerExp, `(e)`];
      }
    } else if (compilerDom.isFnExpression(value, context.options)) {
      handlerExp = genExpression(value, context);
    } else {
      const referencesEvent = value.content.includes("$event");
      const hasMultipleStatements = value.content.includes(`;`);
      const expr = referencesEvent ? context.withId(() => genExpression(value, context), {
        $event: null
      }) : genExpression(value, context);
      handlerExp = [
        referencesEvent ? "$event => " : "() => ",
        hasMultipleStatements ? "{" : "(",
        ...expr,
        hasMultipleStatements ? "}" : ")"
      ];
    }
  }
  const { keys, nonKeys } = modifiers;
  if (nonKeys.length)
    handlerExp = genWithModifiers(context, handlerExp, nonKeys);
  if (keys.length) handlerExp = genWithKeys(context, handlerExp, keys);
  if (extraWrap) handlerExp.unshift(`() => `);
  return handlerExp;
}
function genWithModifiers(context, handler, nonKeys) {
  return genCall(
    context.helper("withModifiers"),
    handler,
    JSON.stringify(nonKeys)
  );
}
function genWithKeys(context, handler, keys) {
  return genCall(context.helper("withKeys"), handler, JSON.stringify(keys));
}
function isConstantBinding(value, context) {
  if (value.ast === null) {
    const bindingType = context.options.bindingMetadata[value.content];
    if (bindingType === "setup-const") {
      return true;
    }
  }
}

function genFor(oper, context) {
  const { helper } = context;
  const {
    source,
    value,
    key,
    index,
    render,
    keyProp,
    once,
    id,
    component,
    onlyChild
  } = oper;
  let rawValue = null;
  const rawKey = key && key.content;
  const rawIndex = index && index.content;
  const sourceExpr = ["() => (", ...genExpression(source, context), ")"];
  const idToPathMap = parseValueDestructure();
  const [depth, exitScope] = context.enterScope();
  const idMap = {};
  const itemVar = `_for_item${depth}`;
  idMap[itemVar] = null;
  idToPathMap.forEach((pathInfo, id2) => {
    let path = `${itemVar}.value${pathInfo ? pathInfo.path : ""}`;
    if (pathInfo) {
      if (pathInfo.helper) {
        idMap[pathInfo.helper] = null;
        path = `${pathInfo.helper}(${path}, ${pathInfo.helperArgs})`;
      }
      if (pathInfo.dynamic) {
        const node = idMap[id2] = compilerDom.createSimpleExpression(path);
        const plugins = context.options.expressionPlugins;
        node.ast = parser.parseExpression(`(${path})`, {
          plugins: plugins ? [...plugins, "typescript"] : ["typescript"]
        });
      } else {
        idMap[id2] = path;
      }
    } else {
      idMap[id2] = path;
    }
  });
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
  const { selectorPatterns, keyOnlyBindingPatterns } = matchPatterns(
    render,
    keyProp,
    idMap
  );
  const selectorDeclarations = [];
  const selectorSetup = [];
  for (let i = 0; i < selectorPatterns.length; i++) {
    const { selector } = selectorPatterns[i];
    const selectorName = `_selector${id}_${i}`;
    selectorDeclarations.push(`let ${selectorName}`, NEWLINE);
    if (i === 0) {
      selectorSetup.push(`({ createSelector }) => {`, INDENT_START);
    }
    selectorSetup.push(
      NEWLINE,
      `${selectorName} = `,
      ...genCall(`createSelector`, [
        `() => `,
        ...genExpression(selector, context)
      ])
    );
    if (i === selectorPatterns.length - 1) {
      selectorSetup.push(INDENT_END, NEWLINE, "}");
    }
  }
  const blockFn = context.withId(() => {
    const frag = [];
    frag.push("(", ...args, ") => {", INDENT_START);
    if (selectorPatterns.length || keyOnlyBindingPatterns.length) {
      frag.push(
        ...genBlockContent(render, context, false, () => {
          const patternFrag = [];
          for (let i = 0; i < selectorPatterns.length; i++) {
            const { effect } = selectorPatterns[i];
            patternFrag.push(
              NEWLINE,
              `_selector${id}_${i}(() => {`,
              INDENT_START
            );
            for (const oper2 of effect.operations) {
              patternFrag.push(...genOperation(oper2, context));
            }
            patternFrag.push(INDENT_END, NEWLINE, `})`);
          }
          for (const { effect } of keyOnlyBindingPatterns) {
            for (const oper2 of effect.operations) {
              patternFrag.push(...genOperation(oper2, context));
            }
          }
          return patternFrag;
        })
      );
    } else {
      frag.push(...genBlockContent(render, context));
    }
    frag.push(INDENT_END, NEWLINE, "}");
    return frag;
  }, idMap);
  exitScope();
  let flags = 0;
  if (onlyChild) {
    flags |= 1;
  }
  if (component) {
    flags |= 2;
  }
  if (once) {
    flags |= 4;
  }
  const forArgs = [
    sourceExpr,
    blockFn,
    genCallback(keyProp),
    flags ? String(flags) : void 0,
    selectorSetup.length ? selectorSetup : void 0
    // todo: hydrationNode
  ];
  if (context.options.templateMode === "factory") {
    forArgs.unshift(`$doc`);
  }
  return [
    NEWLINE,
    ...selectorDeclarations,
    `const n${id} = `,
    // fixed by uts
    ...genCall([helper("createFor"), "null"], ...forArgs)
  ];
  function parseValueDestructure() {
    const map = /* @__PURE__ */ new Map();
    if (value) {
      rawValue = value && value.content;
      if (value.ast) {
        compilerDom.walkIdentifiers(
          value.ast,
          (id2, _, parentStack, ___, isLocal) => {
            if (isLocal) {
              let path = "";
              let isDynamic = false;
              let helper2;
              let helperArgs;
              for (let i = 0; i < parentStack.length; i++) {
                const parent = parentStack[i];
                const child = parentStack[i + 1] || id2;
                if (parent.type === "ObjectProperty" && parent.value === child) {
                  if (parent.key.type === "StringLiteral") {
                    path += `[${JSON.stringify(parent.key.value)}]`;
                  } else if (parent.computed) {
                    isDynamic = true;
                    path += `[${value.content.slice(
                      parent.key.start - 1,
                      parent.key.end - 1
                    )}]`;
                  } else {
                    path += `.${parent.key.name}`;
                  }
                } else if (parent.type === "ArrayPattern") {
                  const index2 = parent.elements.indexOf(child);
                  if (child.type === "RestElement") {
                    path += `.slice(${index2})`;
                  } else {
                    path += `[${index2}]`;
                  }
                } else if (parent.type === "ObjectPattern" && child.type === "RestElement") {
                  helper2 = context.helper("getRestElement");
                  helperArgs = "[" + parent.properties.filter((p) => p.type === "ObjectProperty").map((p) => {
                    if (p.key.type === "StringLiteral") {
                      return JSON.stringify(p.key.value);
                    } else if (p.computed) {
                      isDynamic = true;
                      return value.content.slice(
                        p.key.start - 1,
                        p.key.end - 1
                      );
                    } else {
                      return JSON.stringify(p.key.name);
                    }
                  }).join(", ") + "]";
                }
                if (child.type === "AssignmentPattern" && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
                  isDynamic = true;
                  helper2 = context.helper("getDefaultValue");
                  helperArgs = value.content.slice(
                    child.right.start - 1,
                    child.right.end - 1
                  );
                }
              }
              map.set(id2.name, { path, dynamic: isDynamic, helper: helper2, helperArgs });
            }
          },
          true
        );
      } else {
        map.set(rawValue, null);
      }
    }
    return map;
  }
  function genCallback(expr) {
    if (!expr) return false;
    const res = context.withId(
      () => genExpression(expr, context),
      genSimpleIdMap()
    );
    return [
      ...genMulti(
        ["(", ")", ", "],
        rawValue ? rawValue : rawKey || rawIndex ? "_" : void 0,
        rawKey ? rawKey : rawIndex ? "__" : void 0,
        rawIndex
      ),
      " => (",
      ...res,
      ")"
    ];
  }
  function genSimpleIdMap() {
    const idMap2 = {};
    if (rawKey) idMap2[rawKey] = null;
    if (rawIndex) idMap2[rawIndex] = null;
    idToPathMap.forEach((_, id2) => idMap2[id2] = null);
    return idMap2;
  }
}
function matchPatterns(render, keyProp, idMap) {
  const selectorPatterns = [];
  const keyOnlyBindingPatterns = [];
  render.effect = render.effect.filter((effect) => {
    if (keyProp !== void 0) {
      const selector = matchSelectorPattern(effect, keyProp.ast, idMap);
      if (selector) {
        selectorPatterns.push(selector);
        return false;
      }
      const keyOnly = matchKeyOnlyBindingPattern(effect, keyProp.ast);
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
function matchKeyOnlyBindingPattern(effect, keyAst) {
  if (effect.expressions.length === 1) {
    const ast = effect.expressions[0].ast;
    if (typeof ast === "object" && ast !== null) {
      if (isKeyOnlyBinding(ast, keyAst)) {
        return { effect };
      }
    }
  }
}
function matchSelectorPattern(effect, keyAst, idMap) {
  if (effect.expressions.length === 1) {
    const ast = effect.expressions[0].ast;
    if (typeof ast === "object" && ast) {
      const matcheds = [];
      estreeWalker.walk(ast, {
        enter(node) {
          if (typeof node === "object" && node && node.type === "BinaryExpression" && node.operator === "===" && node.left.type !== "PrivateName") {
            const { left, right } = node;
            for (const [a, b] of [
              [left, right],
              [right, left]
            ]) {
              const aIsKey = isKeyOnlyBinding(a, keyAst);
              const bIsKey = isKeyOnlyBinding(b, keyAst);
              const bVars = analyzeVariableScopes(b, idMap);
              if (aIsKey && !bIsKey && !bVars.locals.length) {
                matcheds.push([a, b]);
              }
            }
          }
        }
      });
      if (matcheds.length === 1) {
        const [key, selector] = matcheds[0];
        const content2 = effect.expressions[0].content;
        let hasExtraId = false;
        const parentStackMap = /* @__PURE__ */ new Map();
        const parentStack = [];
        compilerDom.walkIdentifiers(
          ast,
          (id) => {
            if (id.start !== key.start && id.start !== selector.start) {
              hasExtraId = true;
            }
            parentStackMap.set(id, parentStack.slice());
          },
          false,
          parentStack
        );
        if (!hasExtraId) {
          const name = content2.slice(selector.start - 1, selector.end - 1);
          return {
            effect,
            // @ts-expect-error
            selector: {
              content: name,
              ast: shared.extend({}, selector, {
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
    const content = effect.expressions[0].content;
    if (typeof ast === "object" && ast && ast.type === "ConditionalExpression" && ast.test.type === "BinaryExpression" && ast.test.operator === "===" && ast.test.left.type !== "PrivateName" && compilerDom.isStaticNode(ast.consequent) && compilerDom.isStaticNode(ast.alternate)) {
      const left = ast.test.left;
      const right = ast.test.right;
      for (const [a, b] of [
        [left, right],
        [right, left]
      ]) {
        const aIsKey = isKeyOnlyBinding(a, keyAst);
        const bIsKey = isKeyOnlyBinding(b, keyAst);
        const bVars = analyzeVariableScopes(b, idMap);
        if (aIsKey && !bIsKey && !bVars.locals.length) {
          return {
            effect,
            // @ts-expect-error
            selector: {
              content: content.slice(b.start - 1, b.end - 1),
              ast: b,
              loc: b.loc,
              isStatic: false
            }
          };
        }
      }
    }
  }
}
function analyzeVariableScopes(ast, idMap) {
  let globals = [];
  let locals = [];
  const ids = [];
  const parentStackMap = /* @__PURE__ */ new Map();
  const parentStack = [];
  compilerDom.walkIdentifiers(
    ast,
    (id) => {
      ids.push(id);
      parentStackMap.set(id, parentStack.slice());
    },
    false,
    parentStack
  );
  for (const id of ids) {
    if (shared.isGloballyAllowed(id.name)) {
      continue;
    }
    if (idMap[id.name]) {
      locals.push(id.name);
    } else {
      globals.push(id.name);
    }
  }
  return { globals, locals };
}
function isKeyOnlyBinding(expr, keyAst) {
  let only = true;
  estreeWalker.walk(expr, {
    enter(node) {
      if (types.isNodesEquivalent(node, keyAst)) {
        this.skip();
        return;
      }
      if (node.type === "Identifier") {
        only = false;
      }
    }
  });
  return only;
}

function genSetHtml(oper, context) {
  const { helper } = context;
  const { value, element } = oper;
  return [
    NEWLINE,
    ...genCall(helper("setHtml"), `n${element}`, genExpression(value, context))
  ];
}

function genIf(oper, context, isNested = false) {
  const { helper } = context;
  const { condition, positive, negative, once } = oper;
  const [frag, push] = buildCodeFragment();
  const conditionExpr = [
    "() => (",
    ...genExpression(condition, context),
    ")"
  ];
  let positiveArg = genBlock(positive, context);
  let negativeArg = false;
  if (negative) {
    if (negative.type === 1) {
      negativeArg = genBlock(negative, context);
    } else {
      negativeArg = ["() => ", ...genIf(negative, context, true)];
    }
  }
  if (!isNested) push(NEWLINE, `const n${oper.id} = `);
  const ifArgs = [
    conditionExpr,
    positiveArg,
    negativeArg,
    once && "true"
  ];
  if (context.options.templateMode === "factory") {
    ifArgs.unshift(`$doc`);
  }
  push(...genCall(helper("createIf"), ...ifArgs));
  return frag;
}

const helpers = {
  setText: { name: "setText" },
  setHtml: { name: "setHtml" },
  setClass: { name: "setClass" },
  setStyle: { name: "setStyle" },
  setValue: { name: "setValue" },
  setAttr: { name: "setAttr", needKey: true },
  setProp: { name: "setProp", needKey: true },
  setDOMProp: { name: "setDOMProp", needKey: true }};
function genSetProp(oper, context) {
  const { helper } = context;
  const {
    prop: { key, values, modifier },
    tag
  } = oper;
  const resolvedHelper = getRuntimeHelper(tag, key.content, modifier);
  const propValue = genPropValue(values, context);
  return [
    NEWLINE,
    ...genCall(
      [helper(resolvedHelper.name), null],
      `n${oper.element}`,
      resolvedHelper.needKey ? genExpression(key, context) : false,
      propValue
    )
  ];
}
function genDynamicProps$1(oper, context) {
  const { helper } = context;
  const values = oper.props.map(
    (props) => Array.isArray(props) ? genLiteralObjectProps(props, context) : props.kind === 1 ? genLiteralObjectProps([props], context) : genExpression(props.value, context)
  );
  return [
    NEWLINE,
    ...genCall(
      helper("setDynamicProps"),
      `n${oper.element}`,
      genMulti(DELIMITERS_ARRAY, ...values),
      oper.root && "true"
    )
  ];
}
function genLiteralObjectProps(props, context) {
  return genMulti(
    DELIMITERS_OBJECT,
    ...props.map((prop) => [
      ...genPropKey(prop, context),
      `: `,
      ...genPropValue(prop.values, context)
    ])
  );
}
function genPropKey({ key: node, modifier, runtimeCamelize, handler, handlerModifiers }, context) {
  const { helper } = context;
  const handlerModifierPostfix = handlerModifiers ? handlerModifiers.map(shared.capitalize).join("") : "";
  if (node.isStatic) {
    const keyName = (handler ? shared.toHandlerKey(node.content) : node.content) + handlerModifierPostfix;
    return [
      [
        compilerDom.isSimpleIdentifier(keyName) ? keyName : JSON.stringify(keyName),
        -2,
        node.loc
      ]
    ];
  }
  let key = genExpression(node, context);
  if (runtimeCamelize) {
    key = genCall(helper("camelize"), key);
  }
  if (handler) {
    key = genCall(helper("toHandlerKey"), key);
  }
  return [
    "[",
    modifier && `${JSON.stringify(modifier)} + `,
    ...key,
    handlerModifierPostfix ? ` + ${JSON.stringify(handlerModifierPostfix)}` : void 0,
    "]"
  ];
}
function genPropValue(values, context) {
  if (values.length === 1) {
    return genExpression(values[0], context);
  }
  return genMulti(
    DELIMITERS_ARRAY,
    ...values.map((expr) => genExpression(expr, context))
  );
}
function getRuntimeHelper(tag, key, modifier) {
  const tagName = tag.toUpperCase();
  if (modifier) {
    if (modifier === ".") {
      return getSpecialHelper(key, tagName) || helpers.setDOMProp;
    } else {
      return helpers.setAttr;
    }
  }
  const helper = getSpecialHelper(key, tagName);
  if (helper) {
    return helper;
  }
  if (/aria[A-Z]/.test(key)) {
    return helpers.setDOMProp;
  }
  if (shared.isSVGTag(tag)) {
    return helpers.setAttr;
  }
  if (shared.shouldSetAsAttr(tagName, key) || key.includes("-")) {
    return helpers.setAttr;
  }
  return helpers.setProp;
}
function getSpecialHelper(keyName, tagName) {
  if (keyName === "value" && shared.canSetValueDirectly(tagName)) {
    return helpers.setValue;
  } else if (keyName === "class") {
    return helpers.setClass;
  } else if (keyName === "style") {
    return helpers.setStyle;
  } else if (keyName === "innerHTML") {
    return helpers.setHtml;
  } else if (keyName === "textContent") {
    return helpers.setText;
  }
}

const setTemplateRefIdent = `_setTemplateRef`;
function genSetTemplateRef(oper, context) {
  return [
    NEWLINE,
    oper.effect && `r${oper.element} = `,
    ...genCall(
      setTemplateRefIdent,
      // will be generated in root scope
      `n${oper.element}`,
      genRefValue(oper.value, context),
      oper.effect ? `r${oper.element}` : oper.refFor ? "void 0" : void 0,
      oper.refFor && "true"
    )
  ];
}
function genDeclareOldRef(oper) {
  return [NEWLINE, `let r${oper.id}`];
}
function genRefValue(value, context) {
  if (value && context.options.inline) {
    const binding = context.options.bindingMetadata[value.content];
    if (binding === "setup-let" || binding === "setup-ref" || binding === "setup-maybe-ref") {
      return [value.content];
    }
  }
  return genExpression(value, context);
}

const COMMENT_START = "<!--";
const COMMENT_END = "-->";
const DOCTYPE_START = "<!";
const WHITESPACE_REGEX = /\s/;
const ATTRIBUTE_NAME_REGEX = /[\s=]/;
const SELF_CLOSING_REGEX = /\s*\/$/;
class HtmlParser {
  constructor(html) {
    this.html = html;
    this.length = html.length;
    this.index = 0;
  }
  /**
   * Parse HTML string into an array of HTML nodes
   */
  parse() {
    const nodes = [];
    this.index = 0;
    while (this.index < this.length) {
      if (this.html[this.index] === "<") {
        const result = this.parseTag();
        if (result) {
          nodes.push(result.node);
          this.index = result.endIndex;
        } else {
          this.index++;
        }
      } else {
        const textNode = this.parseText();
        if (textNode) {
          nodes.push(textNode);
        }
      }
    }
    return nodes;
  }
  // =============================================================================
  // Private Methods - Main Parsing Logic
  // =============================================================================
  /**
   * Parse text content until next tag
   */
  parseText() {
    const start = this.index;
    const nextTag = this.html.indexOf("<", start);
    const end = nextTag === -1 ? this.length : nextTag;
    if (start === end) return null;
    const content = this.html.substring(start, end);
    this.index = end;
    return { type: "text", content };
  }
  /**
   * Parse a tag (element, comment, or doctype)
   */
  parseTag() {
    if (this.html.startsWith(COMMENT_START, this.index)) {
      return this.parseComment();
    }
    if (this.html.startsWith(DOCTYPE_START, this.index)) {
      return this.parseDoctype();
    }
    return this.parseElement();
  }
  /**
   * Parse HTML comment
   */
  parseComment() {
    const start = this.index + COMMENT_START.length;
    const end = this.html.indexOf(COMMENT_END, start);
    if (end === -1) return null;
    const content = this.html.substring(start, end);
    return {
      node: { type: "comment", content },
      endIndex: end + COMMENT_END.length
    };
  }
  /**
   * Parse DOCTYPE and other declarations
   */
  parseDoctype() {
    const end = this.html.indexOf(">", this.index + DOCTYPE_START.length);
    if (end === -1) return null;
    return {
      node: { type: "comment", content: "" },
      endIndex: end + 1
    };
  }
  /**
   * Parse HTML element
   */
  parseElement() {
    const tagEnd = this.html.indexOf(">", this.index);
    if (tagEnd === -1) return null;
    const tagContent = this.html.substring(this.index + 1, tagEnd);
    const { tag, attrs, selfClosing } = this.parseTagContent(tagContent);
    if (selfClosing) {
      return {
        node: { type: "element", tag, attrs, children: [] },
        endIndex: tagEnd + 1
      };
    }
    const endTagIndex = this.findMatchingEndTag(tag, tagEnd + 1);
    if (endTagIndex === -1) {
      return {
        node: { type: "element", tag, attrs, children: [] },
        endIndex: tagEnd + 1
      };
    }
    const innerHtml = this.html.substring(tagEnd + 1, endTagIndex);
    const children = innerHtml ? new HtmlParser(innerHtml).parse() : [];
    return {
      node: { type: "element", tag, attrs, children },
      endIndex: endTagIndex + `</${tag}>`.length
    };
  }
  // =============================================================================
  // Private Methods - Tag Content Parsing
  // =============================================================================
  /**
   * Parse tag content to extract tag name, attributes, and self-closing flag
   */
  parseTagContent(content) {
    const selfClosing = SELF_CLOSING_REGEX.test(content);
    const cleanContent = content.replace(SELF_CLOSING_REGEX, "").trim();
    if (!cleanContent) {
      return { tag: "", attrs: {}, selfClosing };
    }
    const spaceIndex = cleanContent.search(WHITESPACE_REGEX);
    const tag = spaceIndex === -1 ? cleanContent : cleanContent.substring(0, spaceIndex);
    if (spaceIndex === -1) {
      return { tag, attrs: {}, selfClosing };
    }
    const attrContent = cleanContent.substring(spaceIndex + 1);
    const attrs = this.parseAttributes(attrContent);
    return { tag, attrs, selfClosing };
  }
  /**
   * Parse attributes from attribute content string
   */
  parseAttributes(content) {
    const attrs = {};
    let i = 0;
    const length = content.length;
    while (i < length) {
      i = this.skipWhitespace(content, i);
      if (i >= length) break;
      const nameStart = i;
      while (i < length && !ATTRIBUTE_NAME_REGEX.test(content[i])) {
        i++;
      }
      if (i === nameStart) break;
      const name = content.substring(nameStart, i);
      i = this.skipWhitespace(content, i);
      if (i >= length || content[i] !== "=") {
        if (!this.isSpecialAttribute(name)) {
          attrs[name] = name;
        }
        continue;
      }
      i++;
      i = this.skipWhitespace(content, i);
      if (i >= length) {
        if (!this.isSpecialAttribute(name)) {
          attrs[name] = "";
        }
        continue;
      }
      const value = this.parseAttributeValue(content, i);
      if (!this.isSpecialAttribute(name) || value.value.trim() !== "") {
        attrs[name] = value.value;
      }
      i = value.endIndex;
    }
    return attrs;
  }
  /**
   * Parse attribute value (quoted or unquoted)
   */
  parseAttributeValue(content, startIndex) {
    const quote = content[startIndex];
    if (quote === '"' || quote === "'") {
      const valueStart = startIndex + 1;
      let i = valueStart;
      while (i < content.length && content[i] !== quote) {
        i++;
      }
      const value = content.substring(valueStart, i);
      return {
        value,
        endIndex: i < content.length ? i + 1 : i
        // Skip closing quote if found
      };
    } else {
      const valueStart = startIndex;
      let i = valueStart;
      while (i < content.length && !WHITESPACE_REGEX.test(content[i])) {
        i++;
      }
      const value = content.substring(valueStart, i);
      return { value, endIndex: i };
    }
  }
  // =============================================================================
  // Private Methods - Utilities
  // =============================================================================
  /**
   * Check if attribute is a special attribute (id, class, style)
   */
  isSpecialAttribute(name) {
    return name === "id" || name === "class" || name === "style";
  }
  /**
   * Skip whitespace characters starting from index
   */
  skipWhitespace(content, index) {
    while (index < content.length && WHITESPACE_REGEX.test(content[index])) {
      index++;
    }
    return index;
  }
  /**
   * Find matching end tag for given tag name
   */
  findMatchingEndTag(tag, startIndex) {
    const startTag = `<${tag}`;
    const endTag = `</${tag}>`;
    let depth = 1;
    let searchIndex = startIndex;
    while (depth > 0 && searchIndex < this.length) {
      const nextStart = this.html.indexOf(startTag, searchIndex);
      const nextEnd = this.html.indexOf(endTag, searchIndex);
      if (nextEnd === -1) break;
      if (nextStart !== -1 && nextStart < nextEnd) {
        const nextTagEnd = this.html.indexOf(">", nextStart);
        if (nextTagEnd !== -1 && nextTagEnd < nextEnd) {
          const nextTagContent = this.html.substring(nextStart + 1, nextTagEnd);
          if (!SELF_CLOSING_REGEX.test(nextTagContent)) {
            depth++;
          }
        }
        searchIndex = nextTagEnd + 1;
      } else {
        depth--;
        if (depth === 0) {
          return nextEnd;
        }
        searchIndex = nextEnd + endTag.length;
      }
    }
    return -1;
  }
}

const NODE_TYPE_TEXT = "text";
const NODE_TYPE_BUTTON = "button";
const NODE_TYPE_COMMENT = "comment";
const NODE_TYPE_ELEMENT = "element";
const VALUE_ATTR = "value";
const EMPTY_STRING = "";
const UNKNOWN_COMMENT = "unknown";
class DomCodeGenerator {
  constructor(options) {
    this.variableCounter = 0;
    this.styleCounter = 0;
    this.disableClassBinding = false;
    this.parseStaticStyle = options.parseStaticStyle;
    this.disableClassBinding = options.disableClassBinding;
  }
  genNodeStatements(node) {
    this.variableCounter = 0;
    this.styleCounter = 0;
    return this.genNodeCode(node);
  }
  genNodeCode(node) {
    switch (node.type) {
      case NODE_TYPE_TEXT:
        return this.createTextNode(node.content || EMPTY_STRING);
      case NODE_TYPE_COMMENT:
        return this.createCommentNode(node.content || EMPTY_STRING);
      case NODE_TYPE_ELEMENT:
        return this.genElementCode(node);
      default:
        return this.createCommentNode(UNKNOWN_COMMENT);
    }
  }
  createTextNode(content) {
    const varName = this.getNextVariableName();
    const statements = [
      // 处理换行符\n
      `const ${varName} = doc.createTextNode(${JSON.stringify(
        content.replace(/[\\]+n/g, function(match) {
          return JSON.parse(`"${match}"`);
        })
      )})`
    ];
    return { variableName: varName, statements };
  }
  createCommentNode(content) {
    const varName = this.getNextVariableName();
    const statements = [
      `const ${varName} = doc.createComment(${JSON.stringify(content)})`
    ];
    return { variableName: varName, statements };
  }
  genElementCode(node) {
    const { tag, attrs, children } = node;
    if (tag === NODE_TYPE_TEXT) {
      return this.genTextElementCode({ tag, attrs, children });
    }
    if (tag === NODE_TYPE_BUTTON) {
      return this.genButtonElementCode({ tag, attrs, children });
    }
    return this.genRegularElementCode({ tag, attrs, children });
  }
  genTextElementCode(params) {
    const { tag, attrs, children } = params;
    const hasComplexChildren = children && children.some((child) => child.type === NODE_TYPE_ELEMENT);
    if (hasComplexChildren) {
      return this.buildElementStatements(tag, attrs, children);
    } else {
      const textContent = this.extractTextContent(children);
      const finalAttrs = this.mergeTextAttributes(attrs, textContent);
      return this.buildElementStatements(tag, finalAttrs, void 0);
    }
  }
  genButtonElementCode(params) {
    const textContent = this.extractTextContent(params.children);
    const finalAttrs = this.mergeTextAttributes(params.attrs, textContent);
    return this.buildElementStatements(params.tag, finalAttrs, void 0);
  }
  genRegularElementCode(params) {
    const { tag, attrs, children } = params;
    return this.buildElementStatements(tag, attrs, children);
  }
  buildElementStatements(tag, attrs, children) {
    const varName = this.getNextVariableName();
    const statements = [];
    statements.push(`const ${varName} = doc.createElement('${tag}')`);
    if (attrs && !isEmptyAttrs(attrs, this.disableClassBinding)) {
      let shouldCacheStyle = false;
      if (this.disableClassBinding && "ext:style" in attrs) {
        shouldCacheStyle = true;
        delete attrs["ext:style"];
      }
      for (const [name, value] of Object.entries(attrs)) {
        if (name === "style") {
          const mapStyleStr = this.parseStaticStyle(value);
          if (mapStyleStr) {
            if (shouldCacheStyle) {
              const styleVar = this.getNextStyleVariableName();
              statements.push(`const ${styleVar} = ${mapStyleStr}`);
              statements.push(`${varName}.ext.set('style', ${styleVar})`);
              statements.push(`${varName}.updateStyle(${styleVar})`);
            } else {
              statements.push(`${varName}.updateStyle(${mapStyleStr})`);
            }
          }
        } else {
          let newValue = value;
          if (tag === "text" && name === "value") {
            newValue = value.replace(/[\\]+n/g, function(match) {
              return JSON.parse(`"${match}"`);
            });
          }
          statements.push(
            `${varName}.setAttribute('${name}', ${JSON.stringify(newValue)})`
          );
        }
      }
    }
    if (children && children.length > 0) {
      for (const child of children) {
        const inlineCode = this.tryInlineChild(child);
        if (inlineCode) {
          statements.push(`${varName}.appendChild(${inlineCode})`);
        } else {
          const childInfo = this.genNodeCode(child);
          statements.push(...childInfo.statements);
          statements.push(`${varName}.appendChild(${childInfo.variableName})`);
        }
      }
    }
    return { variableName: varName, statements };
  }
  extractTextContent(children) {
    if (!children || children.length !== 1 || children[0].type !== NODE_TYPE_TEXT) {
      return EMPTY_STRING;
    }
    if (children[0].content === " ") {
      return EMPTY_STRING;
    }
    return children[0].content || EMPTY_STRING;
  }
  mergeTextAttributes(attrs, textContent) {
    const result = shared.extend({}, attrs);
    if (textContent) {
      result[VALUE_ATTR] = textContent;
    }
    return result;
  }
  getNextStyleVariableName() {
    return `s${this.styleCounter++}`;
  }
  getNextVariableName() {
    return `e${this.variableCounter++}`;
  }
  tryInlineChild(child) {
    switch (child.type) {
      case NODE_TYPE_TEXT:
        return `doc.createTextNode(${JSON.stringify(child.content || EMPTY_STRING)})`;
      case NODE_TYPE_COMMENT:
        return `doc.createComment(${JSON.stringify(child.content || EMPTY_STRING)})`;
      case NODE_TYPE_ELEMENT:
        const elementChild = child;
        if (this.canInlineElement(elementChild)) {
          return `doc.createElement('${elementChild.tag}')`;
        }
        return null;
      default:
        return `doc.createComment(${JSON.stringify(UNKNOWN_COMMENT)})`;
    }
  }
  canInlineElement(node) {
    if (node.tag === NODE_TYPE_TEXT) {
      return false;
    }
    if (!isEmptyAttrs(node.attrs, this.disableClassBinding)) {
      return false;
    }
    if (node.children && node.children.length > 0) {
      return false;
    }
    return true;
  }
}
function isEmptyAttrs(attrs, disableClassBinding) {
  return !attrs || Object.keys(attrs).length === 0 || disableClassBinding && Object.keys(attrs).length === 1 && // 上一步会添加ext:style来标记当前节点有class属性，后续根据该属性设置 ext.set('style',...)
  "ext:style" in attrs;
}
class TemplateFactoryGenerator {
  constructor(options) {
    this.codeGenerator = new DomCodeGenerator(options);
    this.isTs = options.isTs || false;
    this.disableClassBinding = options.disableClassBinding;
  }
  genFactoryFunction(template, index) {
    try {
      const parser = new HtmlParser(template);
      const nodes = parser.parse();
      if (nodes.length === 0) {
        return this.genEmptyFunction(index);
      }
      if (nodes.length === 1) {
        return this.genSingleNodeFunction(nodes[0], index);
      }
      return this.genEmptyFunction(index);
    } catch (error) {
      return this.genEmptyFunction(index);
    }
  }
  genEmptyFunction(index) {
    const { paramType, returnType } = this.getFunctionSignature();
    return `function f${index}(${paramType})${returnType} {
  return doc.createTextNode(${JSON.stringify(EMPTY_STRING)})
}`;
  }
  genSingleNodeFunction(node, index) {
    const { paramType, returnType } = this.getFunctionSignature();
    const simpleReturn = this.tryGenSimpleReturn(node);
    if (simpleReturn) {
      return `function f${index}(${paramType})${returnType} {
  return ${simpleReturn}
}`;
    }
    const nodeInfo = this.codeGenerator.genNodeStatements(node);
    const statements = nodeInfo.statements.map((stmt) => `  ${stmt}`).join("\n");
    const returnStatement = `  return ${nodeInfo.variableName}`;
    return `function f${index}(${paramType})${returnType} {
${statements}
${returnStatement}
}`;
  }
  tryGenSimpleReturn(node) {
    switch (node.type) {
      case NODE_TYPE_TEXT:
        return `doc.createTextNode(${JSON.stringify(node.content || EMPTY_STRING)})`;
      case NODE_TYPE_COMMENT:
        return `doc.createComment(${JSON.stringify(node.content || EMPTY_STRING)})`;
      case NODE_TYPE_ELEMENT:
        const elementNode = node;
        if (this.isSimpleElement(elementNode)) {
          return `doc.createElement('${elementNode.tag}')`;
        }
        return null;
      default:
        return `doc.createComment(${JSON.stringify(UNKNOWN_COMMENT)})`;
    }
  }
  isSimpleElement(node) {
    const emptyAttrs = isEmptyAttrs(node.attrs, this.disableClassBinding);
    if (!emptyAttrs) return false;
    if (node.tag === NODE_TYPE_TEXT) {
      const textContent = this.extractTextContent(node.children);
      return !textContent;
    }
    return !node.children || node.children.length === 0;
  }
  extractTextContent(children) {
    if (!children || children.length !== 1 || children[0].type !== NODE_TYPE_TEXT) {
      return EMPTY_STRING;
    }
    if (children[0].content === " ") {
      return EMPTY_STRING;
    }
    return children[0].content || EMPTY_STRING;
  }
  getFunctionSignature() {
    const paramType = this.isTs ? "doc: IDocument" : "doc";
    const returnType = this.isTs ? ": UniElement" : "";
    return { paramType, returnType };
  }
}
function genFactoryFunctions(templates, context) {
  const generator = new TemplateFactoryGenerator({
    parseStaticStyle: context.options.parseStaticStyle,
    isTs: context.options.isTS,
    disableClassBinding: context.options.disableClassBinding
  });
  const functions = templates.map(
    (template, index) => generator.genFactoryFunction(template, index)
  );
  return functions.join("\n");
}
function genFactoryCallsInRender(templates, rootIndex, context) {
  const { helper } = context;
  const calls = templates.map((_, index) => {
    const rootParam = index === rootIndex ? ", true" : "";
    return `const t${index} = ${helper("factory")}($doc, f${index}${rootParam})`;
  });
  return calls.join("\n  ");
}
function genNextSiblingCall(from, context) {
  if (context.options.templateMode === "factory") {
    return [`${from}.nextSibling${context.options.isTS ? "!" : ""}`];
  }
  return genCall(context.helper("next"), from);
}
function genNthChildCall(from, index, context) {
  if (context.options.templateMode === "factory") {
    return [`${from}.childNodes[${index}]`];
  } else {
    return genCall(context.helper("nthChild"), from, String(index));
  }
}
function genFirstChildCall(from, context) {
  if (context.options.templateMode === "factory") {
    return [`${from}.firstChild${context.options.isTS ? "!" : ""}`];
  }
  return genCall(context.helper("child"), from);
}
function genTextFirstChildCall(oper, context) {
  if (context.options.templateMode === "factory") {
    return [
      NEWLINE,
      `const x${oper.parent} = n${oper.parent}.firstChild${context.options.isTS ? "!" : ""}`
    ];
  } else {
    return [
      NEWLINE,
      `const x${oper.parent} = ${context.helper("child")}(n${oper.parent})`
    ];
  }
}
function genComplexChildAccess(from, elementIndex, context) {
  if (context.options.templateMode === "factory") {
    if (elementIndex === 1) {
      return [
        `${from}.firstChild${context.options.isTS ? "!" : ""}.nextSibling${context.options.isTS ? "!" : ""}`
      ];
    } else {
      return [`${from}.childNodes[${elementIndex}]`];
    }
  } else {
    let init = genCall(context.helper("child"), from);
    if (elementIndex === 1) {
      init = genCall(context.helper("next"), init);
    } else if (elementIndex > 1) {
      init = genCall(context.helper("nthChild"), from, String(elementIndex));
    }
    return init;
  }
}

function genSetText(oper, context) {
  const { helper, options } = context;
  const { element, values, generated, jsx } = oper;
  const texts = combineValues(values, context, jsx);
  if (options.templateMode === "factory") {
    return [
      NEWLINE,
      `${generated ? "x" : "n"}${element}.setAttribute('value', `,
      // 处理换行符\n
      ...texts.map((text) => {
        if (shared.isString(text)) {
          return text.replace(/[\\]+n/g, function(match) {
            return JSON.parse(`"${match}"`);
          });
        }
        return text;
      }),
      ")"
    ];
  }
  return [
    NEWLINE,
    ...genCall(helper("setText"), `${generated ? "x" : "n"}${element}`, texts)
  ];
}
function combineValues(values, context, jsx) {
  return values.flatMap((value, i) => {
    let exp = genExpression(value, context);
    if (!jsx && getLiteralExpressionValue(value) == null) {
      exp = genCall(context.helper("toDisplayString"), exp);
    }
    if (i > 0) {
      exp.unshift(jsx ? ", " : " + ");
    }
    return exp;
  });
}
function genGetTextChild(oper, context) {
  return genTextFirstChildCall(oper, context);
}

function genVShow(oper, context) {
  return [
    NEWLINE,
    ...genCall(context.helper("applyVShow"), `n${oper.element}`, [
      `() => (`,
      ...genExpression(oper.dir.exp, context),
      `)`
    ])
  ];
}

const helperMap = {
  text: "applyTextModel",
  radio: "applyRadioModel",
  checkbox: "applyCheckboxModel",
  select: "applySelectModel",
  dynamic: "applyDynamicModel"
};
function genVModel(oper, context) {
  const {
    modelType,
    element,
    dir: { exp, modifiers }
  } = oper;
  return [
    NEWLINE,
    ...genCall(
      context.helper(helperMap[modelType]),
      `n${element}`,
      // getter
      [`() => (`, ...genExpression(exp, context), `)`],
      // setter
      genModelHandler(exp, context),
      // modifiers
      modifiers.length ? `{ ${modifiers.map((e) => e.content + ": true").join(",")} }` : void 0
    )
  ];
}
function genModelHandler(exp, context) {
  return [
    `${context.options.isTS ? `(_value: any)` : `_value`} => (`,
    ...genExpression(exp, context, "_value"),
    ")"
  ];
}

function genBuiltinDirective(oper, context) {
  switch (oper.name) {
    case "show":
      return genVShow(oper, context);
    case "model":
      return genVModel(oper, context);
    default:
      return [];
  }
}
function genDirectivesForElement(id, context) {
  const dirs = filterCustomDirectives(id, context.block.operation);
  return dirs.length ? genCustomDirectives(dirs, context) : [];
}
function genCustomDirectives(opers, context) {
  const { helper } = context;
  const element = `n${opers[0].element}`;
  const directiveItems = opers.map(genDirectiveItem);
  const directives = genMulti(DELIMITERS_ARRAY, ...directiveItems);
  return [
    NEWLINE,
    ...genCall(helper("withVaporDirectives"), element, directives)
  ];
  function genDirectiveItem({
    dir,
    name,
    asset
  }) {
    const directiveVar = asset ? compilerDom.toValidAssetId(name, "directive") : genExpression(
      shared.extend(compilerDom.createSimpleExpression(name, false), { ast: null }),
      context
    );
    const value = dir.exp && ["() => ", ...genExpression(dir.exp, context)];
    const argument = dir.arg && genExpression(dir.arg, context);
    const modifiers = !!dir.modifiers.length && [
      "{ ",
      genDirectiveModifiers(dir.modifiers.map((m) => m.content)),
      " }"
    ];
    return genMulti(
      DELIMITERS_ARRAY.concat("void 0"),
      directiveVar,
      value,
      argument,
      modifiers
    );
  }
}
function genDirectiveModifiers(modifiers) {
  return modifiers.map(
    (value) => `${compilerDom.isSimpleIdentifier(value) ? value : JSON.stringify(value)}: true`
  ).join(", ");
}
function filterCustomDirectives(id, operations) {
  return operations.filter(
    (oper) => oper.type === 13 && oper.element === id && !oper.builtin
  );
}

function genCreateComponent(operation, context) {
  const { helper } = context;
  const tag = genTag();
  const { root, props, slots, once } = operation;
  const rawSlots = genRawSlots(slots, context);
  const [ids, handlers] = processInlineHandlers(props, context);
  const rawProps = context.withId(() => genRawProps(props, context), ids);
  const inlineHandlers = handlers.reduce(
    (acc, { name, value }) => {
      const handler = genEventHandler(context, value, void 0, false);
      return [...acc, `const ${name} = `, ...handler, NEWLINE];
    },
    []
  );
  const args = [
    tag,
    rawProps,
    rawSlots,
    root ? "true" : false,
    once && "true"
  ];
  if (context.options.templateMode === "factory") {
    if (operation.asset || operation.dynamic && !operation.dynamic.isStatic) {
      args.unshift(`$doc`);
    }
  }
  return [
    NEWLINE,
    ...inlineHandlers,
    `const n${operation.id} = `,
    ...genCall(
      operation.dynamic && !operation.dynamic.isStatic ? helper("createDynamicComponent") : operation.asset ? helper("createComponentWithFallback") : helper("createComponent"),
      ...args
    ),
    ...genDirectivesForElement(operation.id, context)
  ];
  function genTag() {
    if (operation.dynamic) {
      if (operation.dynamic.isStatic) {
        return genCall(
          helper("resolveDynamicComponent"),
          genExpression(operation.dynamic, context)
        );
      } else {
        return ["() => (", ...genExpression(operation.dynamic, context), ")"];
      }
    } else if (operation.asset) {
      return compilerDom.toValidAssetId(operation.tag, "component");
    } else {
      return genExpression(
        shared.extend(compilerDom.createSimpleExpression(operation.tag, false), { ast: null }),
        context
      );
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
  const ids = /* @__PURE__ */ Object.create(null);
  const handlers = [];
  const staticProps = props[0];
  if (shared.isArray(staticProps)) {
    for (let i = 0; i < staticProps.length; i++) {
      const prop = staticProps[i];
      if (!prop.handler) continue;
      prop.values.forEach((value, i2) => {
        const isMemberExp = compilerDom.isMemberExpression(value, context.options);
        if (!isMemberExp) {
          const name = getUniqueHandlerName(context, `_on_${prop.key.content}`);
          handlers.push({ name, value });
          ids[name] = null;
          prop.values[i2] = shared.extend({ ast: null }, compilerDom.createSimpleExpression(name));
        }
      });
    }
  }
  return [ids, handlers];
}
function genRawProps(props, context) {
  const staticProps = props[0];
  if (shared.isArray(staticProps)) {
    if (!staticProps.length && props.length === 1) {
      return;
    }
    return genStaticProps(
      staticProps,
      context,
      genDynamicProps(props.slice(1), context)
    );
  } else if (props.length) {
    return genStaticProps([], context, genDynamicProps(props, context));
  }
}
function genStaticProps(props, context, dynamicProps) {
  const args = props.map((prop) => genProp(prop, context, true));
  if (dynamicProps) {
    args.push([`$: `, ...dynamicProps]);
  }
  return genMulti(
    args.length > 1 ? DELIMITERS_OBJECT_NEWLINE : DELIMITERS_OBJECT,
    ...args
  );
}
function genDynamicProps(props, context) {
  const { helper } = context;
  const frags = [];
  for (const p of props) {
    let expr;
    if (shared.isArray(p)) {
      if (p.length) {
        frags.push(genStaticProps(p, context));
      }
      continue;
    } else {
      if (p.kind === 1)
        expr = genMulti(DELIMITERS_OBJECT, genProp(p, context));
      else {
        expr = genExpression(p.value, context);
        if (p.handler) expr = genCall(helper("toHandlers"), expr);
      }
    }
    frags.push(["() => (", ...expr, ")"]);
  }
  if (frags.length) {
    return genMulti(DELIMITERS_ARRAY_NEWLINE, ...frags);
  }
}
function genProp(prop, context, isStatic) {
  const values = genPropValue(prop.values, context);
  return [
    ...genPropKey(prop, context),
    ": ",
    ...prop.handler ? genEventHandler(
      context,
      prop.values[0],
      void 0,
      true
    ) : isStatic ? ["() => (", ...values, ")"] : values,
    ...prop.model ? [...genModelEvent(prop, context), ...genModelModifiers(prop, context)] : []
  ];
}
function genModelEvent(prop, context) {
  const name = prop.key.isStatic ? [JSON.stringify(`onUpdate:${shared.camelize(prop.key.content)}`)] : ['["onUpdate:" + ', ...genExpression(prop.key, context), "]"];
  const handler = genModelHandler(prop.values[0], context);
  return [",", NEWLINE, ...name, ": () => ", ...handler];
}
function genModelModifiers(prop, context) {
  const { key, modelModifiers } = prop;
  if (!modelModifiers || !modelModifiers.length) return [];
  const modifiersKey = key.isStatic ? key.content === "modelValue" ? [`modelModifiers`] : [`${key.content}Modifiers`] : ["[", ...genExpression(key, context), ' + "Modifiers"]'];
  const modifiersVal = genDirectiveModifiers(modelModifiers);
  return [",", NEWLINE, ...modifiersKey, `: () => ({ ${modifiersVal} })`];
}
function genRawSlots(slots, context) {
  if (!slots.length) return;
  const staticSlots = slots[0];
  if (staticSlots.slotType === 0) {
    return genStaticSlots(
      staticSlots,
      context,
      slots.length > 1 ? slots.slice(1) : void 0
    );
  } else {
    return genStaticSlots(
      { slots: {} },
      context,
      slots
    );
  }
}
function genStaticSlots({ slots }, context, dynamicSlots) {
  const args = Object.keys(slots).map((name) => [
    `${JSON.stringify(name)}: `,
    ...genSlotBlockWithProps(slots[name], context)
  ]);
  if (dynamicSlots) {
    args.push([`$: `, ...genDynamicSlots(dynamicSlots, context)]);
  }
  return genMulti(DELIMITERS_OBJECT_NEWLINE, ...args);
}
function genDynamicSlots(slots, context) {
  return genMulti(
    DELIMITERS_ARRAY_NEWLINE,
    ...slots.map(
      (slot) => slot.slotType === 0 ? genStaticSlots(slot, context) : slot.slotType === 4 ? slot.slots.content : genDynamicSlot(slot, context, true)
    )
  );
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
  return withFunction ? ["() => (", ...frag, ")"] : frag;
}
function genBasicDynamicSlot(slot, context) {
  const { name, fn } = slot;
  return genMulti(
    DELIMITERS_OBJECT_NEWLINE,
    ["name: ", ...genExpression(name, context)],
    ["fn: ", ...genSlotBlockWithProps(fn, context)]
  );
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
  const slotExpr = genMulti(
    DELIMITERS_OBJECT_NEWLINE,
    ["name: ", ...context.withId(() => genExpression(name, context), idMap)],
    [
      "fn: ",
      ...context.withId(() => genSlotBlockWithProps(fn, context), idMap)
    ]
  );
  return [
    ...genCall(
      context.helper("createForSlots"),
      genExpression(source, context),
      [
        ...genMulti(
          ["(", ")", ", "],
          rawValue ? rawValue : rawKey || rawIndex ? "_" : void 0,
          rawKey ? rawKey : rawIndex ? "__" : void 0,
          rawIndex
        ),
        " => (",
        ...slotExpr,
        ")"
      ]
    )
  ];
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
  let isDestructureAssignment = false;
  let rawProps;
  let propsName;
  let exitScope;
  let depth;
  const { props } = oper;
  const idsOfProps = /* @__PURE__ */ new Set();
  if (props) {
    rawProps = props.content;
    if (isDestructureAssignment = !!props.ast) {
      [depth, exitScope] = context.enterScope();
      propsName = `_slotProps${depth}`;
      compilerDom.walkIdentifiers(
        props.ast,
        (id, _, __, ___, isLocal) => {
          if (isLocal) idsOfProps.add(id.name);
        },
        true
      );
    } else {
      idsOfProps.add(propsName = rawProps);
    }
  }
  const idMap = {};
  idsOfProps.forEach(
    (id) => idMap[id] = isDestructureAssignment ? `${propsName}[${JSON.stringify(id)}]` : null
  );
  const blockFn = context.withId(
    () => genBlock(oper, context, [propsName]),
    idMap
  );
  exitScope && exitScope();
  return blockFn;
}

function genSlotOutlet(oper, context) {
  const { helper } = context;
  const { id, name, fallback } = oper;
  const [frag, push] = buildCodeFragment();
  const nameExpr = name.isStatic ? genExpression(name, context) : ["() => (", ...genExpression(name, context), ")"];
  let fallbackArg;
  if (fallback) {
    fallbackArg = genBlock(fallback, context);
  }
  const slotArgs = [
    nameExpr,
    genRawProps(oper.props, context) || "null",
    fallbackArg
  ];
  if (context.options.templateMode === "factory") {
    slotArgs.unshift(`$doc`);
  }
  push(
    NEWLINE,
    `const n${id} = `,
    ...genCall(helper("createSlot"), ...slotArgs)
  );
  return frag;
}

function genOperations(opers, context) {
  const [frag, push] = buildCodeFragment();
  for (const operation of opers) {
    push(...genOperationWithInsertionState(operation, context));
  }
  return frag;
}
function genOperationWithInsertionState(oper, context) {
  const [frag, push] = buildCodeFragment();
  if (isBlockOperation(oper) && oper.parent) {
    push(...genInsertionState(oper, context));
  }
  push(...genOperation(oper, context));
  return frag;
}
function genOperation(oper, context) {
  switch (oper.type) {
    case 2:
      return genSetProp(oper, context);
    case 3:
      return genDynamicProps$1(oper, context);
    case 4:
      return genSetText(oper, context);
    case 5:
      return genSetEvent(oper, context);
    case 6:
      return genSetDynamicEvents(oper, context);
    case 7:
      return genSetHtml(oper, context);
    case 8:
      return genSetTemplateRef(oper, context);
    case 9:
      return genInsertNode(oper, context);
    case 10:
      return genPrependNode(oper, context);
    case 15:
      return genIf(oper, context);
    case 16:
      return genFor(oper, context);
    case 11:
      return genCreateComponent(oper, context);
    case 14:
      return genDeclareOldRef(oper);
    case 12:
      return genSlotOutlet(oper, context);
    case 13:
      return genBuiltinDirective(oper, context);
    case 17:
      return genGetTextChild(oper, context);
    default:
      const exhaustiveCheck = oper;
      throw new Error(
        `Unhandled operation type in genOperation: ${exhaustiveCheck}`
      );
  }
}
function genEffects(effects, context, genExtraFrag) {
  const { helper } = context;
  const expressions = effects.flatMap((effect) => effect.expressions);
  const [frag, push, unshift] = buildCodeFragment();
  const shouldDeclare = genExtraFrag === void 0;
  let operationsCount = 0;
  const {
    ids,
    frag: declarationFrags,
    varNames
  } = processExpressions(context, expressions, shouldDeclare);
  push(...declarationFrags);
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    operationsCount += effect.operations.length;
    const frags = context.withId(() => genEffect(effect, context), ids);
    i > 0 && push(NEWLINE);
    if (frag[frag.length - 1] === ")" && frags[0] === "(") {
      push(";");
    }
    push(...frags);
  }
  const newLineCount = frag.filter((frag2) => frag2 === NEWLINE).length;
  if (newLineCount > 1 || operationsCount > 1 || declarationFrags.length > 0) {
    unshift(`{`, INDENT_START, NEWLINE);
    push(INDENT_END, NEWLINE, "}");
    if (!effects.length) {
      unshift(NEWLINE);
    }
  }
  if (effects.length) {
    unshift(NEWLINE, `${helper("renderEffect")}(() => `);
    push(`)`);
  }
  if (!shouldDeclare && varNames.length) {
    unshift(NEWLINE, `let `, varNames.join(", "));
  }
  if (genExtraFrag) {
    push(...context.withId(genExtraFrag, ids));
  }
  return frag;
}
function genEffect({ operations }, context) {
  const [frag, push] = buildCodeFragment();
  const operationsExps = genOperations(operations, context);
  const newlineCount = operationsExps.filter((frag2) => frag2 === NEWLINE).length;
  if (newlineCount > 1) {
    push(...operationsExps);
  } else {
    push(...operationsExps.filter((frag2) => frag2 !== NEWLINE));
  }
  return frag;
}
function genInsertionState(operation, context) {
  return [
    NEWLINE,
    ...genCall(
      context.helper("setInsertionState"),
      `n${operation.parent}`,
      operation.anchor == null ? void 0 : operation.anchor === -1 ? `0` : `n${operation.anchor}`
    )
  ];
}

function genTemplates(templates, rootIndex, context) {
  const { helper, options } = context;
  if (options.templateMode === "factory") {
    const factoryFunctions = genFactoryFunctions(templates, context);
    return factoryFunctions ? factoryFunctions + "\n" : "";
  } else {
    return templates.map(
      (template, i) => `const t${i} = ${helper("template")}(${JSON.stringify(
        template
      )}${i === rootIndex ? ", true" : ""})
`
    ).join("");
  }
}
function genSelf(dynamic, context) {
  const [frag, push] = buildCodeFragment();
  const { id, template, operation } = dynamic;
  if (id !== void 0 && template !== void 0) {
    push(NEWLINE, `const n${id} = t${template}()`);
    push(...genDirectivesForElement(id, context));
  }
  if (operation) {
    push(...genOperationWithInsertionState(operation, context));
  }
  return frag;
}
function genChildren(dynamic, context, pushBlock, from = `n${dynamic.id}`) {
  const [frag, push] = buildCodeFragment();
  const { children } = dynamic;
  let offset = 0;
  let prev;
  const childrenToGen = [];
  for (const [index, child] of children.entries()) {
    if (child.flags & 2) {
      offset--;
    }
    const id = child.flags & 1 ? child.flags & 4 ? child.anchor : child.id : void 0;
    if (id === void 0 && !child.hasDynamicChild) {
      push(...genSelf(child, context));
      continue;
    }
    const elementIndex = Number(index) + offset;
    const variable = id === void 0 ? `p${context.block.tempId++}` : `n${id}`;
    pushBlock(NEWLINE, `const ${variable} = `);
    if (prev) {
      if (elementIndex - prev[1] === 1) {
        pushBlock(...genNextSiblingCall(prev[0], context));
      } else {
        pushBlock(...genNthChildCall(from, elementIndex, context));
      }
    } else {
      if (elementIndex === 0) {
        pushBlock(...genFirstChildCall(from, context));
      } else {
        pushBlock(...genComplexChildAccess(from, elementIndex, context));
      }
    }
    if (id === child.anchor) {
      push(...genSelf(child, context));
    }
    if (id !== void 0) {
      push(...genDirectivesForElement(id, context));
    }
    prev = [variable, elementIndex];
    childrenToGen.push([child, variable]);
  }
  if (childrenToGen.length) {
    for (const [child, from2] of childrenToGen) {
      push(...genChildren(child, context, pushBlock, from2));
    }
  }
  return frag;
}

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
      const id = compilerDom.toValidAssetId(name, "component");
      const maybeSelfReference = name.endsWith("__self");
      if (maybeSelfReference) name = name.slice(0, -6);
      push(
        NEWLINE,
        `const ${id} = `,
        ...genCall(
          context.helper("resolveComponent"),
          JSON.stringify(name),
          // pass additional `maybeSelfReference` flag
          maybeSelfReference ? "true" : void 0
        )
      );
    }
    genResolveAssets("directive", "resolveDirective");
  }
  for (const child of dynamic.children) {
    push(...genSelf(child, context));
  }
  for (const child of dynamic.children) {
    push(...genChildren(child, context, push, `n${child.id}`));
  }
  push(...genOperations(operation, context));
  push(...genEffects(effect, context, genEffectsExtraFrag));
  push(NEWLINE, `return `);
  const returnNodes = returns.map((n) => `n${n}`);
  const returnsCode = returnNodes.length > 1 ? genMulti(DELIMITERS_ARRAY, ...returnNodes) : [returnNodes[0] || "null"];
  push(...returnsCode);
  resetBlock();
  return frag;
  function genResolveAssets(kind, helper) {
    for (const name of context.ir[kind]) {
      push(
        NEWLINE,
        `const ${compilerDom.toValidAssetId(name, kind)} = `,
        ...genCall(context.helper(helper), JSON.stringify(name))
      );
    }
  }
}

class CodegenContext {
  constructor(ir, options) {
    this.ir = ir;
    this.helpers = /* @__PURE__ */ new Set([]);
    this.helper = (name) => {
      this.helpers.add(name);
      return `_${name}`;
    };
    this.delegates = /* @__PURE__ */ new Set();
    this.identifiers = /* @__PURE__ */ Object.create(null);
    this.seenInlineHandlerNames = /* @__PURE__ */ Object.create(null);
    this.scopeLevel = 0;
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
      expressionPlugins: [],
      // fixed by uts
      templateMode: "string",
      disableEventDelegation: false,
      parseStaticStyle: (style) => JSON.stringify(style),
      disableClassBinding: false
    };
    this.options = shared.extend(defaultOptions, options);
    this.block = ir.block;
  }
  withId(fn, map) {
    const { identifiers } = this;
    const ids = Object.keys(map);
    for (const id of ids) {
      identifiers[id] || (identifiers[id] = []);
      identifiers[id].unshift(map[id] || id);
    }
    const ret = fn();
    ids.forEach((id) => shared.remove(identifiers[id], map[id] || id));
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
}
function generate(ir, options = {}) {
  const [frag, push] = buildCodeFragment();
  const context = new CodegenContext(ir, options);
  const { helpers } = context;
  const { inline, bindingMetadata } = options;
  const functionName = "render";
  const args = ["_ctx"];
  if (bindingMetadata && !inline) {
    args.push("$props", "$emit", "$attrs", "$slots");
  }
  const signature = (options.isTS ? args.map((arg) => `${arg}: any`) : args).join(
    ", "
  );
  const shouldWrap = inline && options.templateMode === "factory";
  if (!inline) {
    push(NEWLINE, `export function ${functionName}(${signature}) {`);
  } else if (shouldWrap) {
    push(NEWLINE, `return (() => {`);
    push(NEWLINE, `  'raw js'`);
  }
  push(INDENT_START);
  if (ir.hasTemplateRef) {
    push(
      NEWLINE,
      `const ${setTemplateRefIdent} = ${context.helper("createTemplateRefSetter")}()`
    );
  }
  const codeFragments = genBlockContent(ir.block, context, true);
  if (options.templateMode === "factory") {
    if (ir.template.length > 0 || context.delegates.size > 0 || context.helpers.has("createDynamicComponent") || context.helpers.has("createComponentWithFallback") || context.helpers.has("createIf") || context.helpers.has("createFor") || context.helpers.has("createSlot")) {
      push(
        NEWLINE,
        `const $ins = ${context.helper("getCurrentGenericInstance")}()`
      );
      push(NEWLINE, `const $proxy = $ins.proxy${options.isTS ? "!" : ""}`);
      push(NEWLINE, `const $doc = $proxy.$nativePage.document`);
    }
    if (context.delegates.size) {
      const delegatesCall = genCall(
        context.helper("delegateEvents"),
        ...[`$doc`, ...Array.from(context.delegates).map((v) => `"${v}"`)]
      ).join("");
      push(NEWLINE, delegatesCall);
    }
    if (ir.template.length > 0) {
      const templateCalls = genFactoryCallsInRender(
        ir.template,
        ir.rootTemplateIndex,
        context
      );
      push(NEWLINE, templateCalls);
    }
  }
  push(...codeFragments);
  push(INDENT_END, NEWLINE);
  if (!inline) {
    push("}");
  } else if (shouldWrap) {
    push(`})()`);
  }
  const delegates = genDelegates(context);
  const templates = genTemplates(ir.template, ir.rootTemplateIndex, context);
  const imports = genHelperImports(context);
  const preamble = imports + templates + delegates;
  const newlineCount = [...preamble].filter((c) => c === "\n").length;
  if (newlineCount && !inline) {
    frag.unshift(...new Array(newlineCount).fill(LF));
  }
  let [code, map] = codeFragmentToString(frag, context);
  if (!inline) {
    code = preamble + code;
  }
  return {
    code,
    ast: ir,
    preamble,
    map: map && map.toJSON(),
    helpers
  };
}
function genDelegates({ delegates, helper, options }) {
  if (options.templateMode === "factory") {
    return "";
  }
  return delegates.size ? genCall(
    helper("delegateEvents"),
    ...Array.from(delegates).map((v) => `"${v}"`)
  ).join("") + "\n" : "";
}
function genHelperImports({ helpers, helper, options }) {
  let imports = "";
  if (helpers.size) {
    imports += `import { ${[...helpers].map((h) => `${h} as _${h}`).join(", ")} } from '${options.runtimeModuleName}';
`;
  }
  return imports;
}

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
      if (!(childDynamic.flags & 2) || childDynamic.flags & 4) {
        context.block.returns.push(childContext.dynamic.id);
      }
    } else {
      context.childrenTemplate.push(childContext.template);
    }
    if (childDynamic.hasDynamicChild || childDynamic.id !== void 0 || childDynamic.flags & 2 || childDynamic.flags & 4) {
      context.dynamic.hasDynamicChild = true;
    }
    context.dynamic.children[i] = childDynamic;
  }
  if (!isFragment) {
    processDynamicChildren(context);
  }
};
function processDynamicChildren(context) {
  let prevDynamics = [];
  let hasStaticTemplate = false;
  const children = context.dynamic.children;
  for (const [index, child] of children.entries()) {
    if (child.flags & 4) {
      prevDynamics.push(child);
    }
    if (!(child.flags & 2)) {
      if (prevDynamics.length) {
        if (hasStaticTemplate) {
          context.childrenTemplate[index - prevDynamics.length] = `<!>`;
          prevDynamics[0].flags -= 2;
          const anchor = prevDynamics[0].anchor = context.increaseId();
          registerInsertion(prevDynamics, context, anchor);
        } else {
          registerInsertion(
            prevDynamics,
            context,
            -1
            /* prepend */
          );
        }
        prevDynamics = [];
      }
      hasStaticTemplate = true;
    }
  }
  if (prevDynamics.length) {
    registerInsertion(prevDynamics, context);
  }
}
function registerInsertion(dynamics, context, anchor) {
  for (const child of dynamics) {
    if (child.template != null) {
      context.registerOperation({
        type: 9,
        elements: dynamics.map((child2) => child2.id),
        parent: context.reference(),
        anchor
      });
    } else if (child.operation && isBlockOperation(child.operation)) {
      child.operation.parent = context.reference();
      child.operation.anchor = anchor;
    }
  }
}

const transformVOnce = (node, context) => {
  if (
    // !context.inSSR &&
    node.type === 1 && compilerDom.findDir(node, "once", true)
  ) {
    context.inVOnce = true;
  }
};

const isReservedProp = /* @__PURE__ */ shared.makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,"
);
const transformElement = (node, context) => {
  let effectIndex = context.block.effect.length;
  const getEffectIndex = () => effectIndex++;
  return function postTransformElement() {
    ({ node } = context);
    if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1)))
      return;
    const isComponent = node.tagType === 1;
    const isDynamicComponent = isComponentTag(node.tag);
    const propsResult = buildProps(
      node,
      context,
      isComponent,
      isDynamicComponent,
      getEffectIndex
    );
    let { parent } = context;
    while (parent && parent.parent && parent.node.type === 1 && parent.node.tagType === 3) {
      parent = parent.parent;
    }
    const singleRoot = context.root === parent && parent.node.children.filter((child) => child.type !== 3).length === 1;
    if (isComponent) {
      transformComponentElement(
        node,
        propsResult,
        singleRoot,
        context,
        isDynamicComponent
      );
    } else {
      transformNativeElement(
        node,
        propsResult,
        singleRoot,
        context,
        getEffectIndex
      );
    }
  };
};
function transformComponentElement(node, propsResult, singleRoot, context, isDynamicComponent) {
  const dynamicComponent = isDynamicComponent ? resolveDynamicComponent(node) : void 0;
  let { tag } = node;
  let asset = true;
  if (!dynamicComponent) {
    const fromSetup = resolveSetupReference(tag, context);
    if (fromSetup) {
      tag = fromSetup;
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
    if (asset) {
      if (context.selfName && shared.capitalize(shared.camelize(tag)) === context.selfName) {
        tag += `__self`;
      }
      context.component.add(tag);
    }
  }
  context.dynamic.flags |= 2 | 4;
  context.dynamic.operation = {
    type: 11,
    id: context.reference(),
    tag,
    props: propsResult[0] ? propsResult[1] : [propsResult[1]],
    asset,
    root: singleRoot && !context.inVFor,
    slots: [...context.slots],
    once: context.inVOnce,
    dynamic: dynamicComponent
  };
  context.slots = [];
}
function resolveDynamicComponent(node) {
  const isProp = findProp(
    node,
    "is",
    false,
    true
    /* allow empty */
  );
  if (!isProp) return;
  if (isProp.type === 6) {
    return isProp.value && compilerDom.createSimpleExpression(isProp.value.content, true);
  } else {
    return isProp.exp || // #10469 handle :is shorthand
    shared.extend(compilerDom.createSimpleExpression(`is`, false, isProp.arg.loc), {
      ast: null
    });
  }
}
function resolveSetupReference(name, context) {
  const bindings = context.options.bindingMetadata;
  if (!bindings || bindings.__isScriptSetup === false) {
    return;
  }
  const camelName = shared.camelize(name);
  const PascalName = shared.capitalize(camelName);
  return bindings[name] ? name : bindings[camelName] ? camelName : bindings[PascalName] ? PascalName : void 0;
}
function transformNativeElement(node, propsResult, singleRoot, context, getEffectIndex) {
  const { tag } = node;
  const { scopeId } = context.options;
  let template = "";
  template += `<${tag}`;
  if (scopeId) template += ` ${scopeId}`;
  const dynamicProps = [];
  if (propsResult[0]) {
    const [, dynamicArgs, expressions] = propsResult;
    context.registerEffect(
      expressions,
      {
        type: 3,
        element: context.reference(),
        props: dynamicArgs,
        root: singleRoot
      },
      getEffectIndex
    );
  } else {
    let hasStaticStyle = false;
    let hasClass = false;
    for (const prop of propsResult[1]) {
      const { key, values } = prop;
      if (key.isStatic && values.length === 1 && values[0].isStatic) {
        if (key.content === "style") {
          hasStaticStyle = true;
        }
        if (key.content === "class") {
          hasClass = true;
        }
        if (context.options.disableClassBinding && key.content === "class") {
          dynamicProps.push(key.content);
          context.registerEffect(
            values,
            {
              type: 2,
              element: context.reference(),
              prop,
              root: singleRoot,
              tag
            },
            getEffectIndex
          );
          continue;
        }
        template += ` ${key.content}`;
        if (values[0].content) template += `="${values[0].content}"`;
      } else {
        if (key.content === "class") {
          hasClass = true;
        }
        dynamicProps.push(key.content);
        context.registerEffect(
          values,
          {
            type: 2,
            element: context.reference(),
            prop,
            root: singleRoot,
            tag
          },
          getEffectIndex
        );
      }
    }
    if (context.options.templateMode === "factory" && context.options.disableClassBinding) {
      if (hasStaticStyle && hasClass) {
        template += ` ext:style`;
      }
    }
  }
  template += `>` + context.childrenTemplate.join("");
  if (!shared.isVoidTag(tag)) {
    template += `</${tag}>`;
  }
  if (singleRoot) {
    context.ir.rootTemplateIndex = context.ir.template.length;
  }
  if (context.parent && context.parent.node.type === 1 && !compilerDom.isValidHTMLNesting(context.parent.node.tag, tag)) {
    context.reference();
    context.dynamic.template = context.pushTemplate(template);
    context.dynamic.flags |= 4 | 2;
  } else {
    context.template += template;
  }
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
        } else {
          context.options.onError(
            compilerDom.createCompilerError(34, prop.loc)
          );
        }
        continue;
      } else if (prop.name === "on") {
        if (prop.exp) {
          if (isComponent) {
            dynamicExpr.push(prop.exp);
            pushMergeArg();
            dynamicArgs.push({
              kind: 0,
              value: prop.exp,
              handler: true
            });
          } else {
            context.registerEffect(
              [prop.exp],
              {
                type: 6,
                element: context.reference(),
                event: prop.exp
              },
              getEffectIndex
            );
          }
        } else {
          context.options.onError(
            compilerDom.createCompilerError(35, prop.loc)
          );
        }
        continue;
      }
    }
    if (isDynamicComponent && prop.type === 6 && prop.name === "is" || prop.type === 7 && prop.name === "bind" && compilerDom.isStaticArgOf(prop.arg, "is")) {
      continue;
    }
    const result = transformProp(prop, node, context);
    if (result) {
      dynamicExpr.push(result.key, result.value);
      if (isComponent && !result.key.isStatic) {
        pushMergeArg();
        dynamicArgs.push(
          shared.extend(resolveDirectiveResult(result), {
            kind: 1
          })
        );
      } else {
        results.push(result);
      }
    }
  }
  if (dynamicArgs.length || results.some(({ key }) => !key.isStatic)) {
    pushMergeArg();
    return [true, dynamicArgs, dynamicExpr];
  }
  const irProps = dedupeProperties(results);
  return [false, irProps];
}
function transformProp(prop, node, context) {
  let { name } = prop;
  if (prop.type === 6) {
    if (isReservedProp(name)) return;
    return {
      key: compilerDom.createSimpleExpression(prop.name, true, prop.nameLoc),
      value: prop.value ? compilerDom.createSimpleExpression(prop.value.content, true, prop.value.loc) : EMPTY_EXPRESSION
    };
  }
  const directiveTransform = context.options.directiveTransforms[name];
  if (directiveTransform) {
    return directiveTransform(prop, node, context);
  }
  if (!shared.isBuiltInDirective(name)) {
    const fromSetup = resolveSetupReference(`v-${name}`, context);
    if (fromSetup) {
      name = fromSetup;
    } else {
      context.directive.add(name);
    }
    context.registerOperation({
      type: 13,
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
    if (existing) {
      if (name === "style" || name === "class") {
        mergePropValues(existing, prop);
      }
    } else {
      knownProps.set(name, prop);
      deduped.push(prop);
    }
  }
  return deduped;
}
function resolveDirectiveResult(prop) {
  return shared.extend({}, prop, {
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

const transformVHtml = (dir, node, context) => {
  let { exp, loc } = dir;
  if (!exp) {
    context.options.onError(
      compilerDom.createDOMCompilerError(53, loc)
    );
    exp = EMPTY_EXPRESSION;
  }
  if (node.children.length) {
    context.options.onError(
      compilerDom.createDOMCompilerError(54, loc)
    );
    context.childrenTemplate.length = 0;
  }
  context.registerEffect([exp], {
    type: 7,
    element: context.reference(),
    value: exp
  });
};

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}

const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);

const transformVText = (dir, node, context) => {
  let { exp, loc } = dir;
  if (!exp) {
    context.options.onError(
      compilerDom.createDOMCompilerError(55, loc)
    );
    exp = EMPTY_EXPRESSION;
  }
  if (node.children.length) {
    context.options.onError(
      compilerDom.createDOMCompilerError(56, loc)
    );
    context.childrenTemplate.length = 0;
  }
  if (isVoidTag(context.node.tag)) {
    return;
  }
  const literal = getLiteralExpressionValue(exp);
  if (literal != null) {
    context.childrenTemplate = [String(literal)];
  } else {
    context.childrenTemplate = [" "];
    context.registerOperation({
      type: 17,
      parent: context.reference()
    });
    context.registerEffect([exp], {
      type: 4,
      element: context.reference(),
      values: [exp],
      generated: true
    });
  }
};

function normalizeBindShorthand(arg, context) {
  if (arg.type !== 4 || !arg.isStatic) {
    context.options.onError(
      compilerDom.createCompilerError(
        52,
        arg.loc
      )
    );
    return compilerDom.createSimpleExpression("", true, arg.loc);
  }
  const propName = shared.camelize(arg.content);
  const exp = compilerDom.createSimpleExpression(propName, false, arg.loc);
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
    context.options.onError(
      compilerDom.createCompilerError(34, loc)
    );
    exp = compilerDom.createSimpleExpression("", true, loc);
  }
  exp = resolveExpression(exp);
  arg = resolveExpression(arg);
  if (arg.isStatic && isReservedProp(arg.content)) return;
  let camel = false;
  if (modifiersString.includes("camel")) {
    if (arg.isStatic) {
      arg = shared.extend({}, arg, { content: shared.camelize(arg.content) });
    } else {
      camel = true;
    }
  }
  return {
    key: arg,
    value: exp,
    loc,
    runtimeCamelize: camel,
    modifier: modifiersString.includes("prop") ? "." : modifiersString.includes("attr") ? "^" : void 0
  };
};

const delegatedEvents = /* @__PURE__ */ shared.makeMap(
  "beforeinput,click,dblclick,contextmenu,focusin,focusout,input,keydown,keyup,mousedown,mousemove,mouseout,mouseover,mouseup,pointerdown,pointermove,pointerout,pointerover,pointerup,touchend,touchmove,touchstart"
);
const transformVOn = (dir, node, context) => {
  let { arg, exp, loc, modifiers } = dir;
  const isComponent = node.tagType === 1;
  const isSlotOutlet = node.tag === "slot";
  if (!exp && !modifiers.length) {
    context.options.onError(
      compilerDom.createCompilerError(35, loc)
    );
  }
  arg = resolveExpression(arg);
  const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = compilerDom.resolveModifiers(
    arg.isStatic ? `on${arg.content}` : arg,
    modifiers,
    null,
    loc
  );
  let keyOverride;
  const isStaticClick = arg.isStatic && arg.content.toLowerCase() === "click";
  if (nonKeyModifiers.includes("middle")) {
    if (isStaticClick) {
      arg = shared.extend({}, arg, { content: "mouseup" });
    } else if (!arg.isStatic) {
      keyOverride = ["click", "mouseup"];
    }
  }
  if (nonKeyModifiers.includes("right")) {
    if (isStaticClick) {
      arg = shared.extend({}, arg, { content: "contextmenu" });
    } else if (!arg.isStatic) {
      keyOverride = ["click", "contextmenu"];
    }
  }
  if (isComponent || isSlotOutlet) {
    const handler = exp || EMPTY_EXPRESSION;
    return {
      key: arg,
      value: handler,
      handler: true,
      handlerModifiers: eventOptionModifiers
    };
  }
  const delegate = !context.options.disableEventDelegation && arg.isStatic && !eventOptionModifiers.length && delegatedEvents(arg.content);
  const operation = {
    type: 5,
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

const transformVShow = (dir, node, context) => {
  const { exp, loc } = dir;
  if (!exp) {
    context.options.onError(
      compilerDom.createDOMCompilerError(61, loc)
    );
    return;
  }
  if (node.tagType === 2) {
    context.options.onError(
      compilerDom.createCompilerError(
        36,
        loc
      )
    );
    return;
  }
  context.registerOperation({
    type: 13,
    element: context.reference(),
    dir,
    name: "show",
    builtin: true
  });
};

const transformTemplateRef = (node, context) => {
  if (node.type !== 1) return;
  const dir = findProp(node, "ref", false, true);
  if (!dir) return;
  context.ir.hasTemplateRef = true;
  let value;
  if (dir.type === 7) {
    value = dir.exp || normalizeBindShorthand(dir.arg, context);
  } else {
    value = dir.value ? compilerDom.createSimpleExpression(dir.value.content, true, dir.value.loc) : EMPTY_EXPRESSION;
  }
  return () => {
    const id = context.reference();
    const effect = !isConstantExpression(value);
    effect && context.registerOperation({
      type: 14,
      id
    });
    context.registerEffect([value], {
      type: 8,
      element: id,
      value,
      refFor: !!context.inVFor,
      effect
    });
  };
};

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
    for (const c of node.children) {
      if (c.type === 5) {
        hasInterp = true;
      } else if (c.type !== 2) {
        isAllTextLike = false;
      }
    }
    if (!isFragment && isAllTextLike && hasInterp) {
      processTextContainer(
        node.children,
        context
      );
    } else if (hasInterp) {
      for (let i = 0; i < node.children.length; i++) {
        const c = node.children[i];
        const prev = node.children[i - 1];
        if (c.type === 5 && prev && prev.type === 2) {
          markNonTemplate(prev, context);
        }
      }
    }
  } else if (node.type === 5) {
    processInterpolation(context);
  } else if (node.type === 2) {
    context.template += node.content;
  }
};
function processInterpolation(context) {
  const parentNode = context.parent.node;
  const children = parentNode.children;
  const nexts = children.slice(context.index);
  const idx = nexts.findIndex((n) => !isTextLike(n));
  const nodes = idx > -1 ? nexts.slice(0, idx) : nexts;
  const prev = children[context.index - 1];
  if (prev && prev.type === 2) {
    nodes.unshift(prev);
  }
  const values = processTextLikeChildren(nodes, context);
  if (values.length === 0 && parentNode.type !== 0) {
    return;
  }
  context.template += " ";
  const isParentText = context.options.templateMode === "factory" && context.parent && context.parent.node.type === 1 && (context.parent.node.tag === "text" || context.parent.node.tag === "button");
  const id = isParentText ? context.parent.reference() : context.reference();
  if (values.length === 0) {
    return;
  }
  const nonConstantExps = values.filter((v) => !isConstantExpression(v));
  const isStatic = !nonConstantExps.length || nonConstantExps.every(
    (e) => isStaticExpression(e, context.options.bindingMetadata)
  ) || context.inVOnce;
  if (isStatic) {
    context.registerOperation({
      type: 4,
      element: id,
      values
    });
  } else {
    context.registerEffect(values, {
      type: 4,
      element: id,
      values
    });
  }
}
function processTextContainer(children, context) {
  if (context.options.templateMode === "factory") {
    if (context.node.tag === "text" || context.node.tag === "button") {
      return;
    }
  }
  const values = processTextLikeChildren(children, context);
  const literals = values.map(getLiteralExpressionValue);
  if (literals.every((l) => l != null)) {
    context.childrenTemplate = literals.map((l) => String(l));
  } else {
    context.childrenTemplate = [" "];
    context.registerOperation({
      type: 17,
      parent: context.reference()
    });
    context.registerEffect(values, {
      type: 4,
      element: context.reference(),
      values,
      // indicates this node is generated, so prefix should be "x" instead of "n"
      generated: true
    });
  }
}
function processTextLikeChildren(nodes, context) {
  const exps = [];
  for (const node of nodes) {
    let exp;
    markNonTemplate(node, context);
    if (node.type === 2) {
      exp = compilerDom.createSimpleExpression(node.content, true, node.loc);
    } else {
      exp = node.content;
    }
    if (exp.content) exps.push(exp);
  }
  return exps;
}
function isTextLike(node) {
  return node.type === 5 || node.type === 2;
}

const transformVModel = (dir, node, context) => {
  const { exp, arg } = dir;
  if (!exp) {
    context.options.onError(
      compilerDom.createCompilerError(41, dir.loc)
    );
    return;
  }
  const rawExp = exp.loc.source;
  const bindingType = context.options.bindingMetadata[rawExp];
  if (bindingType === "props" || bindingType === "props-aliased") {
    context.options.onError(
      compilerDom.createCompilerError(44, exp.loc)
    );
    return;
  }
  const expString = exp.content;
  const maybeRef = context.options.inline && (bindingType === "setup-let" || bindingType === "setup-ref" || bindingType === "setup-maybe-ref");
  if (!expString.trim() || !compilerDom.isMemberExpression(exp, context.options) && !maybeRef) {
    context.options.onError(
      compilerDom.createCompilerError(42, exp.loc)
    );
    return;
  }
  const isComponent = node.tagType === 1;
  if (isComponent) {
    return {
      key: arg ? arg : compilerDom.createSimpleExpression("modelValue", true),
      value: exp,
      model: true,
      modelModifiers: dir.modifiers.map((m) => m.content)
    };
  }
  if (dir.arg)
    context.options.onError(
      compilerDom.createDOMCompilerError(
        58,
        dir.arg.loc
      )
    );
  const { tag } = node;
  const isCustomElement = context.options.isCustomElement(tag);
  let modelType = "text";
  if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
    if (tag === "input" || isCustomElement) {
      const type = compilerDom.findProp(node, "type");
      if (type) {
        if (type.type === 7) {
          modelType = "dynamic";
        } else if (type.value) {
          switch (type.value.content) {
            case "radio":
              modelType = "radio";
              break;
            case "checkbox":
              modelType = "checkbox";
              break;
            case "file":
              modelType = void 0;
              context.options.onError(
                compilerDom.createDOMCompilerError(
                  59,
                  dir.loc
                )
              );
              break;
            default:
              checkDuplicatedValue();
              break;
          }
        }
      } else if (compilerDom.hasDynamicKeyVBind(node)) {
        modelType = "dynamic";
      } else {
        checkDuplicatedValue();
      }
    } else if (tag === "select") {
      modelType = "select";
    } else {
      checkDuplicatedValue();
    }
  } else {
    context.options.onError(
      compilerDom.createDOMCompilerError(
        57,
        dir.loc
      )
    );
  }
  if (modelType)
    context.registerOperation({
      type: 13,
      element: context.reference(),
      dir,
      name: "model",
      modelType,
      builtin: true
    });
  function checkDuplicatedValue() {
    const value = compilerDom.findDir(node, "bind");
    if (value && compilerDom.isStaticArgOf(value.arg, "value")) {
      context.options.onError(
        compilerDom.createDOMCompilerError(
          60,
          value.loc
        )
      );
    }
  }
};

const transformComment = (node, context) => {
  if (node.type !== 3) return;
  if (getSiblingIf(context)) {
    context.comment.push(node);
    context.dynamic.flags |= 2;
  } else {
    context.template += `<!--${node.content}-->`;
  }
};
function getSiblingIf(context, reverse) {
  const parent = context.parent;
  if (!parent) return;
  const siblings = parent.node.children;
  let sibling;
  let i = siblings.indexOf(context.node);
  while (reverse ? --i >= 0 : ++i < siblings.length) {
    sibling = siblings[i];
    if (!isCommentLike(sibling)) {
      break;
    }
  }
  if (sibling && sibling.type === 1 && sibling.props.some(
    ({ type, name }) => type === 7 && ["else-if", reverse ? "if" : "else"].includes(name)
  )) {
    return sibling;
  }
}
function isCommentLike(node) {
  return node.type === 3 || node.type === 2 && !node.content.trim().length;
}

const transformVIf = createStructuralDirectiveTransform(
  ["if", "else", "else-if"],
  processIf
);
function processIf(node, dir, context) {
  if (dir.name !== "else" && (!dir.exp || !dir.exp.content.trim())) {
    const loc = dir.exp ? dir.exp.loc : node.loc;
    context.options.onError(
      compilerDom.createCompilerError(28, dir.loc)
    );
    dir.exp = compilerDom.createSimpleExpression(`true`, false, loc);
  }
  context.dynamic.flags |= 2;
  if (dir.name === "if") {
    const id = context.reference();
    context.dynamic.flags |= 4;
    const [branch, onExit] = createIfBranch(node, context);
    return () => {
      onExit();
      context.dynamic.operation = {
        type: 15,
        id,
        condition: dir.exp,
        positive: branch,
        once: context.inVOnce || isStaticExpression(dir.exp, context.options.bindingMetadata)
      };
    };
  } else {
    const siblingIf = getSiblingIf(context, true);
    const siblings = context.parent && context.parent.dynamic.children;
    let lastIfNode;
    if (siblings) {
      let i = siblings.length;
      while (i--) {
        if (siblings[i].operation && siblings[i].operation.type === 15) {
          lastIfNode = siblings[i].operation;
          break;
        }
      }
    }
    if (
      // check if v-if is the sibling node
      !siblingIf || // check if IfNode is the last operation and get the root IfNode
      !lastIfNode || lastIfNode.type !== 15
    ) {
      context.options.onError(
        compilerDom.createCompilerError(30, node.loc)
      );
      return;
    }
    while (lastIfNode.negative && lastIfNode.negative.type === 15) {
      lastIfNode = lastIfNode.negative;
    }
    if (dir.name === "else-if" && lastIfNode.negative) {
      context.options.onError(
        compilerDom.createCompilerError(30, node.loc)
      );
    }
    if (context.root.comment.length) {
      node = wrapTemplate(node, ["else-if", "else"]);
      context.node = node = shared.extend({}, node, {
        children: [...context.comment, ...node.children]
      });
    }
    context.root.comment = [];
    const [branch, onExit] = createIfBranch(node, context);
    if (dir.name === "else") {
      lastIfNode.negative = branch;
    } else {
      lastIfNode.negative = {
        type: 15,
        id: -1,
        condition: dir.exp,
        positive: branch,
        once: context.inVOnce
      };
    }
    return () => onExit();
  }
}
function createIfBranch(node, context) {
  context.node = node = wrapTemplate(node, ["if", "else-if", "else"]);
  const branch = newBlock(node);
  const exitBlock = context.enterBlock(branch);
  context.reference();
  return [branch, exitBlock];
}

const transformVFor = createStructuralDirectiveTransform(
  "for",
  processFor
);
function processFor(node, dir, context) {
  if (!dir.exp) {
    context.options.onError(
      compilerDom.createCompilerError(31, dir.loc)
    );
    return;
  }
  const parseResult = dir.forParseResult;
  if (!parseResult) {
    context.options.onError(
      compilerDom.createCompilerError(32, dir.loc)
    );
    return;
  }
  const { source, value, key, index } = parseResult;
  const keyProp = findProp(node, "key");
  const keyProperty = keyProp && propToExpression(keyProp);
  const isComponent = node.tagType === 1;
  context.node = node = wrapTemplate(node, ["for"]);
  context.dynamic.flags |= 2 | 4;
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
      id,
      source,
      value,
      key,
      index,
      keyProp: keyProperty,
      render,
      once: context.inVOnce || isStaticExpression(
        source,
        context.options.bindingMetadata
      ),
      component: isComponent,
      onlyChild: !!isOnlyChild
    };
  };
}

const transformSlotOutlet = (node, context) => {
  if (node.type !== 1 || node.tag !== "slot") {
    return;
  }
  const id = context.reference();
  context.dynamic.flags |= 4 | 2;
  const [fallback, exitBlock] = createFallback(
    node,
    context
  );
  let slotName;
  const slotProps = [];
  for (const prop of node.props) {
    if (prop.type === 6) {
      if (prop.value) {
        if (prop.name === "name") {
          slotName = compilerDom.createSimpleExpression(prop.value.content, true, prop.loc);
        } else {
          slotProps.push(shared.extend({}, prop, { name: shared.camelize(prop.name) }));
        }
      }
    } else if (prop.name === "bind" && compilerDom.isStaticArgOf(prop.arg, "name")) {
      if (prop.exp) {
        slotName = prop.exp;
      } else {
        slotName = compilerDom.createSimpleExpression(
          shared.camelize(prop.arg.content),
          false,
          prop.arg.loc
        );
        slotName.ast = null;
      }
    } else {
      let slotProp = prop;
      if (slotProp.name === "bind" && slotProp.arg && compilerDom.isStaticExp(slotProp.arg)) {
        slotProp = shared.extend({}, prop, {
          arg: shared.extend({}, slotProp.arg, {
            content: shared.camelize(slotProp.arg.content)
          })
        });
      }
      slotProps.push(slotProp);
    }
  }
  slotName || (slotName = compilerDom.createSimpleExpression("default", true));
  let irProps = [];
  if (slotProps.length) {
    const [isDynamic, props] = buildProps(
      shared.extend({}, node, { props: slotProps }),
      context,
      true
    );
    irProps = isDynamic ? props : [props];
    const runtimeDirective = context.block.operation.find(
      (oper) => oper.type === 13 && oper.element === id
    );
    if (runtimeDirective) {
      context.options.onError(
        compilerDom.createCompilerError(
          36,
          runtimeDirective.dir.loc
        )
      );
    }
  }
  return () => {
    exitBlock && exitBlock();
    context.dynamic.operation = {
      type: 12,
      id,
      name: slotName,
      props: irProps,
      fallback
    };
  };
};
function createFallback(node, context) {
  if (!node.children.length) {
    return [];
  }
  context.node = node = shared.extend({}, node, {
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

const transformVSlot = (node, context) => {
  if (node.type !== 1) return;
  const dir = findDir(node, "slot", true);
  const { tagType, children } = node;
  const { parent } = context;
  const isComponent = tagType === 1;
  const isSlotTemplate = compilerDom.isTemplateNode(node) && parent && parent.node.type === 1 && parent.node.tagType === 1;
  if (isComponent && children.length) {
    return transformComponentSlot(
      node,
      dir,
      context
    );
  } else if (isSlotTemplate && dir) {
    return transformTemplateSlot(
      node,
      dir,
      context
    );
  } else if (!isComponent && dir) {
    context.options.onError(
      compilerDom.createCompilerError(40, dir.loc)
    );
  }
};
function transformComponentSlot(node, dir, context) {
  const { children } = node;
  const arg = dir && dir.arg;
  const emptyTextNodes = [];
  const nonSlotTemplateChildren = children.filter((n) => {
    if (isNonWhitespaceContent(n)) {
      return !(n.type === 1 && n.props.some(compilerDom.isVSlot));
    } else {
      emptyTextNodes.push(n);
    }
  });
  if (!nonSlotTemplateChildren.length) {
    emptyTextNodes.forEach((n) => {
      markNonTemplate(n, context);
    });
  }
  const [block, onExit] = createSlotBlock(node, dir, context);
  const { slots } = context;
  return () => {
    onExit();
    const hasOtherSlots = !!slots.length;
    if (dir && hasOtherSlots) {
      context.options.onError(
        compilerDom.createCompilerError(37, dir.loc)
      );
      return;
    }
    if (nonSlotTemplateChildren.length) {
      if (hasStaticSlot(slots, "default")) {
        context.options.onError(
          compilerDom.createCompilerError(
            39,
            nonSlotTemplateChildren[0].loc
          )
        );
      } else {
        registerSlot(slots, arg, block);
        context.slots = slots;
      }
    } else if (hasOtherSlots) {
      context.slots = slots;
    }
  };
}
function transformTemplateSlot(node, dir, context) {
  context.dynamic.flags |= 2;
  const arg = dir.arg && resolveExpression(dir.arg);
  const vFor = findDir(node, "for");
  const vIf = findDir(node, "if");
  const vElse = findDir(
    node,
    /^else(-if)?$/,
    true
    /* allowEmpty */
  );
  const { slots } = context;
  const [block, onExit] = createSlotBlock(node, dir, context);
  if (!vFor && !vIf && !vElse) {
    const slotName = arg ? arg.isStatic && arg.content : "default";
    if (slotName && hasStaticSlot(slots, slotName)) {
      context.options.onError(
        compilerDom.createCompilerError(38, dir.loc)
      );
    } else {
      registerSlot(slots, arg, block);
    }
  } else if (vIf) {
    registerDynamicSlot(slots, {
      slotType: 3,
      condition: vIf.exp,
      positive: {
        slotType: 1,
        name: arg,
        fn: block
      }
    });
  } else if (vElse) {
    const vIfSlot = slots[slots.length - 1];
    if (vIfSlot.slotType === 3) {
      let ifNode = vIfSlot;
      while (ifNode.negative && ifNode.negative.slotType === 3)
        ifNode = ifNode.negative;
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
    } else {
      context.options.onError(
        compilerDom.createCompilerError(30, vElse.loc)
      );
    }
  } else if (vFor) {
    if (vFor.forParseResult) {
      registerDynamicSlot(slots, {
        slotType: 2,
        name: arg,
        fn: block,
        loop: vFor.forParseResult
      });
    } else {
      context.options.onError(
        compilerDom.createCompilerError(32, vFor.loc)
      );
    }
  }
  return onExit;
}
function ensureStaticSlots(slots) {
  let lastSlots = slots[slots.length - 1];
  if (!slots.length || lastSlots.slotType !== 0) {
    slots.push(
      lastSlots = {
        slotType: 0,
        slots: {}
      }
    );
  }
  return lastSlots.slots;
}
function registerSlot(slots, name, block) {
  const isStatic = !name || name.isStatic;
  if (isStatic) {
    const staticSlots = ensureStaticSlots(slots);
    staticSlots[name ? name.content : "default"] = block;
  } else {
    slots.push({
      slotType: 1,
      name,
      fn: block
    });
  }
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
  const exitBlock = context.enterBlock(block);
  return [block, exitBlock];
}
function isNonWhitespaceContent(node) {
  if (node.type !== 2) return true;
  return !!node.content.trim();
}

function compile(source, options = {}) {
  const resolvedOptions = shared.extend({}, options);
  const ast = shared.isString(source) ? compilerDom.parse(source, resolvedOptions) : source;
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
  if (options.isTS) {
    const { expressionPlugins } = options;
    if (!expressionPlugins || !expressionPlugins.includes("typescript")) {
      resolvedOptions.expressionPlugins = [
        ...expressionPlugins || [],
        "typescript"
      ];
    }
  }
  const ir = transform(
    ast,
    shared.extend({}, resolvedOptions, {
      nodeTransforms: [
        ...nodeTransforms,
        ...options.nodeTransforms || []
        // user transforms
      ],
      directiveTransforms: shared.extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {}
        // user transforms
      )
    })
  );
  return generate(ir, resolvedOptions);
}
function getBaseTransformPreset() {
  return [
    [
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
    ],
    {
      bind: transformVBind,
      on: transformVOn,
      html: transformVHtml,
      text: transformVText,
      show: transformVShow,
      model: transformVModel
    }
  ];
}

function createVaporCompilerError(code, loc) {
  return compilerDom.createCompilerError(
    code,
    loc,
    VaporErrorMessages
  );
}
const VaporErrorCodes = {
  "X_V_PLACEHOLDER": 100,
  "100": "X_V_PLACEHOLDER",
  "__EXTEND_POINT__": 101,
  "101": "__EXTEND_POINT__"
};
const VaporErrorMessages = {
  [100]: `[placeholder]`,
  // just to fulfill types
  [101]: ``
};

exports.parse = compilerDom.parse;
exports.CodegenContext = CodegenContext;
exports.DynamicFlag = DynamicFlag;
exports.IRDynamicPropsKind = IRDynamicPropsKind;
exports.IRNodeTypes = IRNodeTypes;
exports.IRSlotType = IRSlotType;
exports.VaporErrorCodes = VaporErrorCodes;
exports.VaporErrorMessages = VaporErrorMessages;
exports.buildCodeFragment = buildCodeFragment;
exports.codeFragmentToString = codeFragmentToString;
exports.compile = compile;
exports.createStructuralDirectiveTransform = createStructuralDirectiveTransform;
exports.createVaporCompilerError = createVaporCompilerError;
exports.genCall = genCall;
exports.genMulti = genMulti;
exports.generate = generate;
exports.isBlockOperation = isBlockOperation;
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
