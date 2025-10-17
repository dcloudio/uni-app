'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compilerDom = require('@vue/compiler-dom');
var compilerVapor = require('@vue/compiler-vapor');
var shared = require('@vue/shared');
var parser = require('@babel/parser');
var types = require('@babel/types');
var estreeWalker = require('estree-walker');
var sourceMapJs = require('source-map-js');

function transformInsertNode(oper, context) {
}
function transformPrependNode(oper, context) {
}

function isSharedDataStaticExpression(node, expressionPlugins = []) {
  const ast = node.ast || node._fastPathAst;
  if (ast) {
    return isStaticNode(ast);
  } else if (node.isStatic) {
    return true;
  } else if (node.ast === null) {
    try {
      node._fastPathAst = parser.parseExpression(node.content, {
        plugins: expressionPlugins
      });
      return isStaticNode(node._fastPathAst);
    } catch (e) {
    }
  }
  return false;
}
function isStaticNode(node) {
  node = compilerDom.unwrapTSNode(node);
  switch (node.type) {
    case "UnaryExpression":
      if (node.operator === "void") {
        return false;
      }
      return isStaticNode(node.argument);
    // case 'LogicalExpression': // 1 > 2
    // case 'BinaryExpression': // 1 + 2
    //   return isStaticNode(node.left) && isStaticNode(node.right)
    // case 'ConditionalExpression': {
    //   // 1 ? 2 : 3
    //   return (
    //     isStaticNode(node.test) &&
    //     isStaticNode(node.consequent) &&
    //     isStaticNode(node.alternate)
    //   )
    // }
    // case 'SequenceExpression': // (1, 2)
    // case 'TemplateLiteral': // `foo${1}`
    //   return node.expressions.every(expr => isStaticNode(expr))
    case "ParenthesizedExpression":
      return isStaticNode(node.expression);
    case "StringLiteral":
    case "NumericLiteral":
    case "BooleanLiteral":
    case "NullLiteral":
    case "BigIntLiteral":
      return true;
  }
  return false;
}
function parseSharedDataBooleanExpression(node) {
  try {
    const result = new Function(`return ${node.content}`)();
    return Boolean(result);
  } catch (e) {
  }
  return null;
}
function parseSharedDataStringExpression(node) {
  try {
    const result = new Function(`return ${node.content}`)();
    return typeof result === "string" ? result : null;
  } catch (e) {
  }
  return null;
}
function transformIRProp(prop, context) {
  transformSimpleExpression(prop.key, context);
  if (prop.values.length > 1 && ["class", "style"].includes(prop.key.content)) {
    prop.sharedData = {
      ident: context.nextIdent()
    };
  } else {
    transformSimpleExpressions(prop.values, context);
  }
}
function transformSimpleExpressions(expressions, context, force = false, key = false) {
  expressions.forEach((expression) => {
    transformSimpleExpression(expression, context, force, key);
  });
}
function transformSimpleExpression(expression, context, force = false, key = false) {
  if (force || !isSharedDataStaticExpression(expression)) {
    expression.sharedData = {
      ident: context.nextIdent()
    };
  }
}

function transformSetEvent(oper, context) {
  oper.delegate = false;
  transformSimpleExpression(oper.key, context);
  oper.sharedData = {
    ident: context.nextIdent()
  };
}
function transformSetDynamicEvents(oper, context) {
  transformSimpleExpression(oper.event, context, true);
}

function transformFor(oper, context) {
  transformSimpleExpression(oper.source, context, true);
  const exitIdent = context.enterIdent();
  if (oper.keyProp) {
    transformSimpleExpression(oper.keyProp, context, true);
  }
  transformBlockContent(oper.render, context);
  exitIdent();
}

function transformSetHtml(oper, context) {
  transformSimpleExpression(oper.value, context);
}

function transformIf(oper, context) {
  const { condition, positive, negative } = oper;
  const result = parseSharedDataBooleanExpression(condition);
  if (result === null) {
    transformSimpleExpression(condition, context, true);
  }
  transformBlock(positive, context);
  if (negative) {
    if (negative.type === 1) {
      transformBlock(negative, context);
    } else {
      transformIf(negative, context);
    }
  }
}

function transformSetProp(oper, context) {
  transformIRProp(oper.prop, context);
}
function transformDynamicProps(oper, context) {
  oper.sharedData = {
    ident: context.nextIdent()
  };
}

function transformSetTemplateRef({ node, value }, context) {
  if (node.tagType === 0) {
    transformSimpleExpression(value, context, true);
  }
}
function transformDeclareOldRef(oper, context) {
}

function transformSetText(oper, context) {
  transformSimpleExpressions(oper.values, context, false, true);
}
function transformGetTextChild(oper, context) {
}

function transformCreateComponent(oper, context) {
  oper.sharedData = {
    ident: context.nextIdent()
  };
  oper.slots.forEach((slot) => {
    switch (slot.slotType) {
      case 0:
        Object.keys(slot.slots).forEach((key) => {
          transformBlock(slot.slots[key], context);
        });
        break;
      case 1:
        if (!parseSharedDataStringExpression(slot.name)) {
          slot.name.sharedData = {
            ident: context.nextIdent()
          };
        }
        transformBlock(slot.fn, context);
        break;
      case 2:
        transformSimpleExpression(slot.loop.source, context);
        const exitIdent = context.enterIdent();
        if (!parseSharedDataStringExpression(slot.name)) {
          slot.name.sharedData = {
            ident: context.nextIdent()
          };
        }
        transformBlock(slot.fn, context);
        exitIdent();
        break;
      case 3:
        transformSlotDynamicConditional(slot, context);
        break;
    }
  });
}
function transformSlotDynamicConditional(slot, context) {
  const result = parseSharedDataBooleanExpression(slot.condition);
  if (result === null) {
    transformSimpleExpression(slot.condition, context, true);
  }
  transformBlock(slot.positive.fn, context);
  if (slot.negative) {
    if (slot.negative.slotType === 3) {
      transformSlotDynamicConditional(slot.negative, context);
    } else {
      transformBlock(slot.negative.fn, context);
    }
  }
}

function transformSlotOutlet(oper, context) {
  const { fallback, name } = oper;
  transformSimpleExpression(name, context);
  if (fallback) {
    transformBlock(fallback, context);
  }
}

function transformVShow({ dir: { exp } }, context) {
  if (exp) {
    transformSimpleExpression(exp, context);
  }
}

function transformVModel({ dir }, context) {
  const exp = dir.exp;
  transformSimpleExpression(exp, context, true);
  exp.sharedData.vModel = {
    eventIdent: context.nextIdent()
  };
}

function transformBuiltinDirective(oper, context) {
  switch (oper.name) {
    case "show":
      return transformVShow(oper, context);
    case "model":
      return transformVModel(oper, context);
  }
}

function transformOperations(opers, context) {
  for (const operation of opers) {
    transformOperationWithInsertionState(operation, context);
  }
}
function transformOperationWithInsertionState(oper, context) {
  transformOperation(oper, context);
}
function transformOperation(oper, context) {
  switch (oper.type) {
    case 2:
      return transformSetProp(oper, context);
    case 3:
      return transformDynamicProps(oper, context);
    case 4:
      return transformSetText(oper, context);
    case 5:
      return transformSetEvent(oper, context);
    case 6:
      return transformSetDynamicEvents(oper, context);
    case 7:
      return transformSetHtml(oper, context);
    case 8:
      return transformSetTemplateRef(oper, context);
    case 9:
      return transformInsertNode();
    case 10:
      return transformPrependNode();
    case 15:
      return transformIf(oper, context);
    case 16:
      return transformFor(oper, context);
    case 11:
      return transformCreateComponent(oper, context);
    case 14:
      return transformDeclareOldRef();
    case 12:
      return transformSlotOutlet(oper, context);
    case 13:
      return transformBuiltinDirective(oper, context);
    case 17:
      return transformGetTextChild();
    default:
      const exhaustiveCheck = oper;
      throw new Error(
        `Unhandled operation type in genOperation: ${exhaustiveCheck}`
      );
  }
}
function transformEffects(effects, context) {
  for (const effect of effects) {
    transformEffect(effect, context);
  }
}
function transformEffect({ operations }, context) {
  transformOperations(operations, context);
}

function transformSelf(dynamic, context) {
  const { operation } = dynamic;
  if (operation) {
    transformOperationWithInsertionState(operation, context);
  }
}
function transformChildren(dynamic, context) {
  const { children } = dynamic;
  const childrenToTransform = [];
  for (const [, child] of children.entries()) {
    if (child.flags & 2) ;
    const id = child.flags & 1 ? child.flags & 4 ? child.anchor : child.id : void 0;
    if (id === void 0 && !child.hasDynamicChild) {
      transformSelf(child, context);
      continue;
    }
    if (id === child.anchor) {
      transformSelf(child, context);
    }
    childrenToTransform.push(child);
  }
  for (const child of childrenToTransform) {
    transformChildren(child, context);
  }
}

function transformBlock(oper, context) {
  transformBlockContent(oper, context);
}
function transformBlockContent(block, context) {
  const { dynamic, effect, operation } = block;
  const resetBlock = context.enterBlock(block);
  for (const child of dynamic.children) {
    transformSelf(child, context);
  }
  for (const child of dynamic.children) {
    transformChildren(child, context);
  }
  transformOperations(operation, context);
  transformEffects(effect, context);
  resetBlock();
}

class IdentGenerator {
  constructor(pregenerateCount = 1e3, groupSize = 30) {
    this._chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this._nextIds = [0];
    this._generated = [];
    this._currentIndex = 0;
    if (pregenerateCount < 0) {
      throw new Error("\u9884\u751F\u6210\u6570\u91CF\u4E0D\u80FD\u4E3A\u8D1F\u6570");
    }
    this._groupSize = groupSize;
    if (pregenerateCount > 0) {
      this._pregenerate(pregenerateCount);
    }
  }
  _generateId() {
    const r = [];
    for (const char of this._nextIds) {
      r.unshift(this._chars[char]);
    }
    return r.join("");
  }
  _generateNextValidId() {
    let id;
    do {
      id = this._generateId();
      this._increment();
    } while (keywords.has(id));
    return id;
  }
  _pregenerate(count) {
    this._generated = new Array(count);
    for (let i = 0; i < count; i++) {
      this._generated[i] = this._generateNextValidId();
    }
  }
  next() {
    if (this._currentIndex < this._generated.length) {
      return this._generated[this._currentIndex++];
    }
    const newId = this._generateNextValidId();
    this._generated.push(newId);
    this._currentIndex++;
    return newId;
  }
  getIndexOf(variableName) {
    return this._generated.indexOf(variableName);
  }
  getGroupInfo(variableName) {
    const index = this.getIndexOf(variableName);
    if (index === -1) return null;
    return {
      index: Math.floor(index / this._groupSize),
      bitValue: 1 << index % this._groupSize
    };
  }
  reset() {
    this._nextIds = [0];
    this._generated = [];
    this._currentIndex = 0;
  }
  get generatedCount() {
    return this._generated.length;
  }
  get currentIndex() {
    return this._currentIndex;
  }
  get hasPregenerated() {
    return this._currentIndex < this._generated.length;
  }
  get generatedList() {
    return this._generated;
  }
  _increment() {
    for (let i = 0; i < this._nextIds.length; i++) {
      const val = ++this._nextIds[i];
      if (val >= this._chars.length) {
        this._nextIds[i] = 0;
      } else {
        return;
      }
    }
    this._nextIds.push(0);
  }
  *[Symbol.iterator]() {
    while (true) {
      yield this.next();
    }
  }
}
const keywords = /* @__PURE__ */ new Set([
  "abstract",
  "arguments",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield"
]);

class SharedDataTransformContext {
  constructor(ir, options) {
    this._ident = new IdentGenerator();
    this._identCache = /* @__PURE__ */ new Map();
    this.ir = ir;
    this.options = options;
    this.block = ir.block;
    this._identCache.set(this._ident, /* @__PURE__ */ new Map());
  }
  enterBlock(block) {
    const parent = this.block;
    this.block = block;
    return () => this.block = parent;
  }
  enterIdent() {
    const parent = this._ident;
    this._ident = new IdentGenerator();
    this._identCache.set(this._ident, /* @__PURE__ */ new Map());
    return () => this._ident = parent;
  }
  nextIdent() {
    return this._ident.next();
  }
}
function transformSharedData(ir, options) {
  const context = new SharedDataTransformContext(ir, options);
  transformBlockContent(ir.block, context);
}

function genInsertNode$1({ parent, elements, anchor }, { helper }) {
  let element = elements.map((el) => `n${el}`).join(", ");
  if (elements.length > 1) element = `[${element}]`;
  return [
    compilerVapor.NEWLINE,
    ...compilerVapor.genCall(
      helper("insert"),
      element,
      `n${parent}`,
      anchor === void 0 ? void 0 : `n${anchor}`
    )
  ];
}
function genPrependNode$1(oper, { helper }) {
  return [
    compilerVapor.NEWLINE,
    ...compilerVapor.genCall(
      helper("prepend"),
      `n${oper.parent}`,
      ...oper.elements.map((el) => `n${el}`)
    )
  ];
}

function genExpression$1(node, context, assignment) {
  const { content, ast, isStatic, loc } = node;
  if (isStatic) {
    return [[JSON.stringify(content), -2, loc]];
  }
  if (!node.content.trim() || // there was a parsing error
  ast === false || compilerVapor.isConstantExpression(node)) {
    return [[content, -2, loc], assignment && ` = ${assignment}`];
  }
  if (ast === null) {
    return genIdentifier$1(content, context, loc, assignment);
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
    const [frag, push] = compilerVapor.buildCodeFragment();
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
        ...genIdentifier$1(
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
function genIdentifier$1(raw, context, loc, assignment, id, parent, parentStack) {
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
      return genExpression$1(replacement, context, assignment);
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
    if (canPrefix$1(raw)) {
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
function canPrefix$1(name) {
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
function processExpressions$1(context, expressions, shouldDeclare) {
  const {
    seenVariable,
    variableToExpMap,
    expToVariableMap,
    seenIdentifier,
    updatedVariable
  } = analyzeExpressions$1(expressions);
  const varDeclarations = processRepeatedVariables$1(
    context,
    seenVariable,
    variableToExpMap,
    expToVariableMap,
    seenIdentifier,
    updatedVariable
  );
  const expDeclarations = processRepeatedExpressions$1(
    context,
    expressions,
    varDeclarations,
    updatedVariable,
    expToVariableMap
  );
  return genDeclarations$1(
    [...varDeclarations, ...expDeclarations],
    context,
    shouldDeclare
  );
}
function analyzeExpressions$1(expressions) {
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
      if (parent && isMemberExpression$1(parent)) {
        const memberExp = extractMemberExpression$1(parent, (id) => {
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
      } else if (!parentStack.some(isMemberExpression$1)) {
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
function processRepeatedVariables$1(context, seenVariable, variableToExpMap, expToVariableMap, seenIdentifier, updatedVariable) {
  const declarations = [];
  const expToReplacementMap = /* @__PURE__ */ new Map();
  for (const [name, exps] of variableToExpMap) {
    if (updatedVariable.has(name)) continue;
    if (seenVariable[name] > 1 && exps.size > 0) {
      const isIdentifier = seenIdentifier.has(name);
      const varName = isIdentifier ? name : genVarName$1(name);
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
      if (!declarations.some((d) => d.name === varName) && (!isIdentifier || shouldDeclareVariable$1(name, expToVariableMap, exps))) {
        declarations.push({
          name: varName,
          isIdentifier,
          value: shared.extend(
            { ast: isIdentifier ? null : parseExp$1(context, name) },
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
    exp.ast = parseExp$1(context, exp.content);
  }
  return declarations;
}
function shouldDeclareVariable$1(name, expToVariableMap, exps) {
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
function processRepeatedExpressions$1(context, expressions, varDeclarations, updatedVariable, expToVariableMap) {
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
      const varName = genVarName$1(content);
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
          if (value.ast) value.ast = parseExp$1(context, value.content);
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
            new RegExp(escapeRegExp$1(content), "g"),
            varName
          );
          exp.ast = parseExp$1(context, exp.content);
        }
      });
    }
  });
  return declarations;
}
function genDeclarations$1(declarations, context, shouldDeclare) {
  const [frag, push] = compilerVapor.buildCodeFragment();
  const ids = /* @__PURE__ */ Object.create(null);
  const varNames = /* @__PURE__ */ new Set();
  declarations.forEach(({ name, isIdentifier, value }) => {
    if (isIdentifier) {
      const varName = ids[name] = `_${name}`;
      varNames.add(varName);
      if (shouldDeclare) {
        push(`const `);
      }
      push(`${varName} = `, ...genExpression$1(value, context), compilerVapor.NEWLINE);
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
        ...context.withId(() => genExpression$1(value, context), ids),
        compilerVapor.NEWLINE
      );
    }
  });
  return { ids, frag, varNames: [...varNames] };
}
function escapeRegExp$1(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function parseExp$1(context, content) {
  const plugins = context.options.expressionPlugins;
  const options = {
    plugins: plugins ? [...plugins, "typescript"] : ["typescript"]
  };
  return parser.parseExpression(`(${content})`, options);
}
function genVarName$1(exp) {
  return `${exp.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_").replace(/_+$/, "")}`;
}
function extractMemberExpression$1(exp, onIdentifier) {
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
      return `${extractMemberExpression$1(exp.left, onIdentifier)} ${exp.operator} ${extractMemberExpression$1(exp.right, onIdentifier)}`;
    case "CallExpression":
      return `${extractMemberExpression$1(exp.callee, onIdentifier)}(${exp.arguments.map((arg) => extractMemberExpression$1(arg, onIdentifier)).join(", ")})`;
    case "MemberExpression":
    // foo[bar.baz]
    case "OptionalMemberExpression":
      const object = extractMemberExpression$1(exp.object, onIdentifier);
      const prop = exp.computed ? `[${extractMemberExpression$1(exp.property, onIdentifier)}]` : `.${extractMemberExpression$1(exp.property, shared.NOOP)}`;
      return `${object}${prop}`;
    default:
      return "";
  }
}
const isMemberExpression$1 = (node) => {
  return node.type === "MemberExpression" || node.type === "OptionalMemberExpression";
};
function genSharedDataExpression(node, context, helper, inVFor) {
  if (node.sharedData) {
    return compilerVapor.genCall(
      context.helper("setSharedData"),
      context.sharedDataVar,
      JSON.stringify(node.sharedData.ident),
      helper ? compilerVapor.genCall(helper, genExpression$1(node, context)) : genExpression$1(node, context)
    );
  }
  return genExpression$1(node, context);
}

function genSetEvent$1(oper, context) {
  const { key, keyOverride, value, modifiers, sharedData } = oper;
  const handler = genEventHandler$1(context, value, modifiers);
  return [
    compilerVapor.NEWLINE,
    ...key.sharedData ? compilerVapor.genCall(
      context.helper("setSharedData"),
      context.sharedDataVar,
      JSON.stringify(key.sharedData.ident),
      genName()
    ).concat(compilerVapor.NEWLINE) : [],
    ...compilerVapor.genCall(
      context.helper("setSharedDataEvent"),
      context.sharedDataVar,
      JSON.stringify(sharedData.ident),
      handler
    )
  ];
  function genName() {
    const expr = genExpression$1(key, context);
    if (keyOverride) {
      const find = JSON.stringify(keyOverride[0]);
      const replacement = JSON.stringify(keyOverride[1]);
      const wrapped = ["(", ...expr, ")"];
      return [...wrapped, ` === ${find} ? ${replacement} : `, ...wrapped];
    } else {
      return genExpression$1(key, context);
    }
  }
}
function genSetDynamicEvents$1(oper, context) {
  return [
    compilerVapor.NEWLINE,
    ...compilerVapor.genCall(
      context.helper("setSharedDataDynamicEvents"),
      context.sharedDataVar,
      JSON.stringify(oper.event.sharedData.ident),
      genExpression$1(oper.event, context)
    )
  ];
}
function genEventHandler$1(context, value, modifiers = { nonKeys: [], keys: [] }, extraWrap = false) {
  let handlerExp = [`() => {}`];
  if (value && value.content.trim()) {
    if (compilerDom.isMemberExpression(value, context.options)) {
      handlerExp = genExpression$1(value, context);
      if (!isConstantBinding$1(value, context) && !extraWrap) {
        if (value.ast && value.ast.type === "TSAsExpression") {
          handlerExp = [`(e: any) => (`, value.content, `)(e)`];
        } else {
          handlerExp = [`(e: any) => `, ...handlerExp, `(e)`];
        }
      }
    } else if (compilerDom.isFnExpression(value, context.options)) {
      handlerExp = genExpression$1(value, context);
    } else {
      const referencesEvent = value.content.includes("$event");
      const hasMultipleStatements = value.content.includes(`;`);
      const expr = referencesEvent ? context.withId(() => genExpression$1(value, context), {
        $event: null
      }) : genExpression$1(value, context);
      handlerExp = [
        referencesEvent ? "($event: any) => " : "() => ",
        hasMultipleStatements ? "{" : "(",
        ...expr,
        hasMultipleStatements ? "}" : ")"
      ];
    }
  }
  if (extraWrap) handlerExp.unshift(`() => `);
  return handlerExp;
}
function isConstantBinding$1(value, context) {
  if (value.ast === null) {
    const bindingType = context.options.bindingMetadata[value.content];
    if (bindingType === "setup-const") {
      return true;
    }
  }
}

function genFor$1(oper, context) {
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
  const preSharedDataVar = context.sharedDataVar;
  let rawValue = null;
  const rawKey = key && key.content;
  const rawIndex = index && index.content;
  const sourceExpr = ["() => (", ...genExpression$1(source, context), ")"];
  const idToPathMap = parseValueDestructure();
  const count = context.enterVFor();
  const [_, exitScope] = context.enterScope();
  const idMap = {};
  const itemVar = `_for_item${count}`;
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
  const args = [context.sharedDataVForVar, ", ", itemVar];
  if (rawKey) {
    const keyVar = `_for_key${count}`;
    args.push(`, ${keyVar}`);
    idMap[rawKey] = `${keyVar}.value`;
    idMap[keyVar] = null;
  }
  if (rawIndex) {
    const indexVar = `_for_index${count}`;
    args.push(`, ${indexVar}`);
    idMap[rawIndex] = `${indexVar}.value`;
    idMap[indexVar] = null;
  }
  const newSharedDataVForFrag = compilerVapor.genCall(
    helper("setSharedData"),
    preSharedDataVar,
    JSON.stringify(source.sharedData.ident),
    genSharedDataVFor(context)
  );
  const getKeyFrag = genCallback(keyProp, context, context.sharedDataVForVar);
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
    selectorDeclarations.push(
      `let ${selectorName}: (oper: () => void) => void`,
      compilerVapor.NEWLINE
    );
    if (i === 0) {
      selectorSetup.push(`({ createSelector }) => {`, compilerVapor.INDENT_START);
    }
    selectorSetup.push(
      compilerVapor.NEWLINE,
      `${selectorName} = `,
      ...compilerVapor.genCall(`createSelector`, [
        `() => `,
        ...genExpression$1(selector, context)
      ])
    );
    if (i === selectorPatterns.length - 1) {
      selectorSetup.push(compilerVapor.INDENT_END, compilerVapor.NEWLINE, "}");
    }
  }
  const blockFn = context.withId(() => {
    const frag = [];
    frag.push("(", ...args, ") => {", compilerVapor.INDENT_START);
    if (selectorPatterns.length || keyOnlyBindingPatterns.length) {
      frag.push(
        ...genBlockContent$1(render, context, false, () => {
          const patternFrag = [];
          for (let i = 0; i < selectorPatterns.length; i++) {
            const { effect } = selectorPatterns[i];
            patternFrag.push(
              compilerVapor.NEWLINE,
              `_selector${id}_${i}(() => {`,
              compilerVapor.INDENT_START
            );
            for (const oper2 of effect.operations) {
              patternFrag.push(...genOperation$1(oper2, context));
            }
            patternFrag.push(compilerVapor.INDENT_END, compilerVapor.NEWLINE, `})`);
          }
          for (const { effect } of keyOnlyBindingPatterns) {
            for (const oper2 of effect.operations) {
              patternFrag.push(...genOperation$1(oper2, context));
            }
          }
          return patternFrag;
        })
      );
    } else {
      frag.push(...genBlockContent$1(render, context));
    }
    frag.push(compilerVapor.INDENT_END, compilerVapor.NEWLINE, "}");
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
  return [
    compilerVapor.NEWLINE,
    ...selectorDeclarations,
    ...compilerVapor.genCall(
      [helper("createSharedDataFor"), "undefined"],
      newSharedDataVForFrag,
      sourceExpr,
      blockFn,
      getKeyFrag,
      flags ? String(flags) : void 0,
      selectorSetup.length ? selectorSetup : void 0
      // todo: hydrationNode
    )
  ];
  function parseValueDestructure() {
    const map = /* @__PURE__ */ new Map();
    if (value) {
      rawValue = value && value.content;
      if (value.ast) {
        compilerDom.walkIdentifiers(
          value.ast,
          (id2, _2, parentStack, ___, isLocal) => {
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
                  helper2 = context.helper("getSharedDataRestElement");
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
                  helper2 = context.helper("getSharedDataDefaultValue");
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
  function genCallback(expr, context2, sharedDataVForVar) {
    if (!expr) return false;
    const res = context2.withId(
      () => compilerVapor.genCall(
        context2.helper("setSharedData"),
        sharedDataVForVar,
        JSON.stringify(expr.sharedData.ident),
        genExpression$1(expr, context2)
      ),
      genSimpleIdMap()
    );
    return [
      ...compilerVapor.genMulti(
        ["(", ")", ", "],
        sharedDataVForVar,
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
    idToPathMap.forEach((_2, id2) => idMap2[id2] = null);
    return idMap2;
  }
}
function matchPatterns(render, keyProp, idMap) {
  const selectorPatterns = [];
  const keyOnlyBindingPatterns = [];
  render.effect.forEach((effect) => {
    if (keyProp !== void 0) {
      const selector = matchSelectorPattern(effect, keyProp.ast, idMap);
      if (selector) {
        selectorPatterns.push(selector);
        effect.generated = true;
      }
      const keyOnly = matchKeyOnlyBindingPattern(effect, keyProp.ast);
      if (keyOnly) {
        keyOnlyBindingPatterns.push(keyOnly);
        effect.generated = true;
      }
    }
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
function genSharedDataVFor(context) {
  return `${context.helper("createSharedDataVFor")}(${context.sharedDataScopeVar}, () => useSharedData<\`${context.sharedDataVForClassType}\`>(${context.sharedDataScopeVar}))`;
}

function genSetHtml$1(oper, context) {
  var _a;
  const { helper } = context;
  const { value } = oper;
  return [
    compilerVapor.NEWLINE,
    ...((_a = value.sharedData) == null ? void 0 : _a.ident) ? compilerVapor.genCall(
      helper("setSharedData"),
      context.sharedDataVar,
      JSON.stringify(value.sharedData.ident),
      genExpression$1(value, context)
    ) : []
  ];
}

function genIf$1(oper, context, isNested = false) {
  const { helper } = context;
  const { condition, positive, negative, once } = oper;
  const [frag, push] = compilerVapor.buildCodeFragment();
  const conditionExpr = [
    "() => ",
    ...genCondition$1(condition, context),
    ""
  ];
  let positiveArg = genBlock$1(positive, context);
  let negativeArg = false;
  if (negative) {
    if (negative.type === 1) {
      negativeArg = genBlock$1(negative, context);
    } else {
      negativeArg = ["() => ", ...genIf$1(negative, context, true)];
    }
  }
  if (!isNested) push(compilerVapor.NEWLINE);
  push(
    ...compilerVapor.genCall(
      helper("createSharedDataIf"),
      conditionExpr,
      positiveArg,
      negativeArg,
      once && "true"
    )
  );
  return frag;
}
function genCondition$1(condition, context) {
  return !condition.sharedData ? [JSON.stringify(parseSharedDataBooleanExpression(condition))] : compilerVapor.genCall(
    context.helper("setSharedData"),
    context.sharedDataVar,
    JSON.stringify(condition.sharedData.ident),
    compilerVapor.genCall(
      context.helper("toSharedDataBoolean"),
      genExpression$1(condition, context)
    )
  );
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
function genSetProp$1(oper, context) {
  const {
    prop: { key, values, modifier, sharedData },
    tag
  } = oper;
  const resolvedHelper = getRuntimeHelper(tag, key.content, modifier);
  const [frag, push] = compilerVapor.buildCodeFragment();
  if (sharedData) {
    push(
      compilerVapor.NEWLINE,
      ...compilerVapor.genCall(
        context.helper(
          getSetSharedDataHelper(resolvedHelper.name)
        ),
        context.sharedDataVar,
        JSON.stringify(sharedData.ident),
        genPropValue$1(values, context)
      )
    );
    return frag;
  }
  values.filter((value) => {
    var _a;
    return (_a = value.sharedData) == null ? void 0 : _a.ident;
  }).forEach((value) => {
    push(
      compilerVapor.NEWLINE,
      ...compilerVapor.genCall(
        context.helper(
          getSetSharedDataHelper(resolvedHelper.name)
        ),
        context.sharedDataVar,
        JSON.stringify(value.sharedData.ident),
        genPropValue$1([value], context)
      )
    );
  });
  return frag;
}
function genDynamicProps$2(oper, context) {
  const { helper } = context;
  const values = oper.props.map(
    (props) => Array.isArray(props) ? genLiteralObjectProps(props, context) : props.kind === 1 ? genLiteralObjectProps([props], context) : genExpression$1(props.value, context)
  );
  return [
    compilerVapor.NEWLINE,
    ...compilerVapor.genCall(
      helper(getSetSharedDataHelper("setDynamicProps")),
      context.sharedDataVar,
      JSON.stringify(oper.sharedData.ident),
      compilerVapor.genMulti(compilerVapor.DELIMITERS_ARRAY, ...values)
    )
  ];
}
function genLiteralObjectProps(props, context) {
  return compilerVapor.genMulti(
    compilerVapor.DELIMITERS_OBJECT,
    ...props.map((prop) => [
      ...genPropKey(prop, context),
      `: `,
      ...genPropValue$1(prop.values, context)
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
  let key = genExpression$1(node, context);
  if (runtimeCamelize) {
    key = compilerVapor.genCall(helper("camelize"), key);
  }
  if (handler) {
    key = compilerVapor.genCall(helper("toHandlerKey"), key);
  }
  return [
    "[",
    modifier && `${JSON.stringify(modifier)} + `,
    ...key,
    handlerModifierPostfix ? ` + ${JSON.stringify(handlerModifierPostfix)}` : void 0,
    "]"
  ];
}
function genPropValue$1(values, context) {
  if (values.length === 1) {
    return genExpression$1(values[0], context);
  }
  return compilerVapor.genMulti(
    compilerVapor.DELIMITERS_ARRAY,
    ...values.map((expr) => genExpression$1(expr, context))
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
function getSetSharedDataHelper(name) {
  switch (name) {
    case "setClass":
      return `setSharedDataClass`;
    case "setStyle":
      return `setSharedDataStyle`;
    case "setText":
    case "setHtml":
    case "setValue":
    case "setAttr":
    case "setProp":
    case "setDOMProp":
      return `setSharedDataAttr`;
    case "setDynamicProps":
      return `setSharedDataDynamicProps`;
    default:
      const exhaustiveCheck = name;
      throw new Error(
        `Unhandled operation type in genOperation: ${exhaustiveCheck}`
      );
  }
}

const setTemplateRefIdent = `_setTemplateRef`;
function genSetTemplateRef$1(oper, context) {
  let setTemplateRefCode = compilerVapor.genCall(
    setTemplateRefIdent,
    // will be generated in root scope
    `n${oper.element}`,
    genRefValue(oper.value, context),
    oper.effect ? `r${oper.element}` : oper.refFor ? "void 0" : void 0,
    oper.refFor && "true"
  );
  if (oper.value.sharedData) {
    setTemplateRefCode = compilerVapor.genCall(
      context.helper("setSharedDataTemplateRef"),
      context.sharedDataVar,
      JSON.stringify(oper.value.sharedData.ident),
      [`(n${oper.element}: number) => {`, ...setTemplateRefCode, "}"]
    );
  }
  return [compilerVapor.NEWLINE, oper.effect && `r${oper.element} = `, ...setTemplateRefCode];
}
function genDeclareOldRef$1(oper) {
  return [compilerVapor.NEWLINE, `let r${oper.id}: any | null`];
}
function genRefValue(value, context) {
  if (value && context.options.inline) {
    const binding = context.options.bindingMetadata[value.content];
    if (binding === "setup-let" || binding === "setup-ref" || binding === "setup-maybe-ref") {
      return [value.content];
    }
  }
  return genExpression$1(value, context);
}

function genSetText$1(oper, context) {
  const { helper } = context;
  const { values } = oper;
  const [frag, push] = compilerVapor.buildCodeFragment();
  const identCache = /* @__PURE__ */ new Set();
  values.filter((value) => {
    var _a;
    return (_a = value.sharedData) == null ? void 0 : _a.ident;
  }).forEach((value) => {
    const ident = value.sharedData.ident;
    if (identCache.has(ident)) {
      return;
    }
    identCache.add(ident);
    push(
      compilerVapor.NEWLINE,
      ...compilerVapor.genCall(
        helper("setSharedData"),
        context.sharedDataVar,
        JSON.stringify(value.sharedData.ident),
        compilerVapor.genCall(
          context.helper("toDisplayString"),
          genExpression$1(value, context)
        )
      )
    );
  });
  return frag;
}
function genGetTextChild$1(oper, context) {
  return [];
}

function genVShow$1({ dir: { exp } }, context) {
  if (!exp) {
    return [];
  }
  return [
    compilerVapor.NEWLINE,
    ...compilerVapor.genCall(context.helper("renderSharedDataEffect"), [
      `() => { `,
      ...compilerVapor.genCall(
        context.helper("setSharedData"),
        context.sharedDataVar,
        JSON.stringify(exp.sharedData.ident),
        compilerVapor.genCall(
          context.helper("toSharedDataBoolean"),
          genExpression$1(exp, context)
        )
      ),
      ` }`
    ])
  ];
}

function genVModel$1(oper, context) {
  const {
    dir: { exp, modifiers }
  } = oper;
  const sharedData = exp.sharedData;
  return [
    compilerVapor.NEWLINE,
    ...compilerVapor.genCall(
      context.helper("setSharedDataEvent"),
      context.sharedDataVar,
      JSON.stringify(sharedData.vModel.eventIdent),
      compilerVapor.genCall(
        context.helper("setSharedDataModel"),
        context.sharedDataVar,
        JSON.stringify(sharedData.ident),
        // getter
        [`() => (`, ...genExpression$1(exp, context), `)`],
        // setter
        genModelHandler(exp, context),
        // modifiers
        modifiers.length ? `{ ${modifiers.map((e) => e.content + ": true").join(",")} }` : void 0
      )
    )
  ];
}
function genModelHandler(exp, context) {
  return [
    `${context.options.isTS ? `(_value: any)` : `_value`} => (`,
    ...genExpression$1(exp, context, "_value"),
    ")"
  ];
}

function genBuiltinDirective$1(oper, context) {
  switch (oper.name) {
    case "show":
      return genVShow$1(oper, context);
    case "model":
      return genVModel$1(oper, context);
    default:
      return [];
  }
}
function genDirectiveModifiers$1(modifiers) {
  return modifiers.map(
    (value) => `${compilerDom.isSimpleIdentifier(value) ? value : JSON.stringify(value)}: true`
  ).join(", ");
}

function genCreateComponent$1(operation, context) {
  const { helper } = context;
  const tag = genTag();
  const { root, props, slots, sharedData } = operation;
  const rawSlots = genRawSlots$1(slots, context);
  const [ids, handlers] = processInlineHandlers$1(props, context);
  const rawProps = context.withId(() => genRawProps(props, context), ids);
  const inlineHandlers = handlers.reduce(
    (acc, { name, value }) => {
      const handler = genEventHandler$1(context, value, void 0, false);
      return [...acc, `const ${name} = `, ...handler, compilerVapor.NEWLINE];
    },
    []
  );
  const isDynamic = operation.dynamic && !operation.dynamic.isStatic;
  const isFallback = operation.asset;
  return [
    compilerVapor.NEWLINE,
    ...inlineHandlers,
    `const n${operation.id} = `,
    ...compilerVapor.genCall(
      isDynamic ? helper("createSharedDataDynamicComponent") : isFallback ? helper("createSharedDataComponentWithFallback") : helper("createSharedDataComponent"),
      tag,
      rawProps,
      rawSlots,
      root ? "true" : false
      // once && 'true',
    ),
    compilerVapor.NEWLINE,
    ...compilerVapor.genCall(
      helper("setSharedData"),
      context.sharedDataVar,
      JSON.stringify(sharedData.ident),
      [`n${operation.id}`, isFallback ? "?.sharedData" : ".sharedData"]
    )
  ];
  function genTag() {
    if (operation.dynamic) {
      if (operation.dynamic.isStatic) {
        return compilerVapor.genCall(
          helper("resolveDynamicComponent"),
          genExpression$1(operation.dynamic, context)
        );
      } else {
        return ["() => (", ...genExpression$1(operation.dynamic, context), ")"];
      }
    } else if (operation.asset) {
      return compilerDom.toValidAssetId(operation.tag, "component");
    } else {
      return genExpression$1(
        shared.extend(compilerDom.createSimpleExpression(operation.tag, false), { ast: null }),
        context
      );
    }
  }
}
function getUniqueHandlerName$1(context, name) {
  const { seenInlineHandlerNames } = context;
  name = genVarName$1(name);
  const count = seenInlineHandlerNames[name] || 0;
  seenInlineHandlerNames[name] = count + 1;
  return count === 0 ? name : `${name}${count}`;
}
function processInlineHandlers$1(props, context) {
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
          const name = getUniqueHandlerName$1(context, `_on_${prop.key.content}`);
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
      genDynamicProps$1(props.slice(1), context)
    );
  } else if (props.length) {
    return genStaticProps([], context, genDynamicProps$1(props, context));
  }
}
function genStaticProps(props, context, dynamicProps) {
  const args = props.map((prop) => genProp(prop, context, true));
  if (dynamicProps) {
    args.push([`$: `, ...dynamicProps]);
  }
  return compilerVapor.genMulti(
    args.length > 1 ? compilerVapor.DELIMITERS_OBJECT_NEWLINE : compilerVapor.DELIMITERS_OBJECT,
    ...args
  );
}
function genDynamicProps$1(props, context) {
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
        expr = compilerVapor.genMulti(compilerVapor.DELIMITERS_OBJECT, genProp(p, context));
      else {
        expr = genExpression$1(p.value, context);
        if (p.handler) expr = compilerVapor.genCall(helper("toHandlers"), expr);
      }
    }
    frags.push(["() => (", ...expr, ")"]);
  }
  if (frags.length) {
    return compilerVapor.genMulti(compilerVapor.DELIMITERS_ARRAY_NEWLINE, ...frags);
  }
}
function genProp(prop, context, isStatic) {
  const values = genPropValue$1(prop.values, context);
  return [
    ...genPropKey(prop, context),
    ": ",
    ...prop.handler ? genEventHandler$1(
      context,
      prop.values[0],
      void 0,
      true
    ) : isStatic ? ["() => (", ...values, ")"] : values,
    ...prop.model ? [...genModelEvent(prop, context), ...genModelModifiers(prop, context)] : []
  ];
}
function genModelEvent(prop, context) {
  const name = prop.key.isStatic ? [JSON.stringify(`onUpdate:${shared.camelize(prop.key.content)}`)] : ['["onUpdate:" + ', ...genExpression$1(prop.key, context), "]"];
  const handler = genModelHandler(prop.values[0], context);
  return [",", compilerVapor.NEWLINE, ...name, ": () => ", ...handler];
}
function genModelModifiers(prop, context) {
  const { key, modelModifiers } = prop;
  if (!modelModifiers || !modelModifiers.length) return [];
  const modifiersKey = key.isStatic ? key.content === "modelValue" ? [`modelModifiers`] : [`${key.content}Modifiers`] : ["[", ...genExpression$1(key, context), ' + "Modifiers"]'];
  const modifiersVal = genDirectiveModifiers$1(modelModifiers);
  return [",", compilerVapor.NEWLINE, ...modifiersKey, `: () => ({ ${modifiersVal} })`];
}
function genRawSlots$1(slots, context) {
  if (!slots.length) return;
  const staticSlots = slots[0];
  if (staticSlots.slotType === 0) {
    return genStaticSlots$1(
      staticSlots,
      context,
      slots.length > 1 ? slots.slice(1) : void 0
    );
  } else {
    return genStaticSlots$1(
      { slots: {} },
      context,
      slots
    );
  }
}
function genStaticSlots$1({ slots }, context, dynamicSlots) {
  const args = Object.keys(slots).map((name) => [
    `${JSON.stringify(name)}: `,
    ...genSlotBlockWithProps$1(slots[name], context)
  ]);
  if (dynamicSlots) {
    args.push([`$: `, ...genDynamicSlots$1(dynamicSlots, context)]);
  }
  return compilerVapor.genMulti(compilerVapor.DELIMITERS_OBJECT_NEWLINE, ...args);
}
function genDynamicSlots$1(slots, context) {
  return compilerVapor.genMulti(
    compilerVapor.DELIMITERS_ARRAY_NEWLINE,
    ...slots.map(
      (slot) => slot.slotType === 0 ? genStaticSlots$1(slot, context) : slot.slotType === 4 ? slot.slots.content : genDynamicSlot$1(slot, context, true)
    )
  );
}
function genDynamicSlot$1(slot, context, withFunction = false) {
  let frag;
  switch (slot.slotType) {
    case 1:
      frag = genBasicDynamicSlot$1(slot, context);
      break;
    case 2:
      frag = genLoopSlot$1(slot, context);
      break;
    case 3:
      frag = genConditionalSlot$1(slot, context);
      break;
  }
  return withFunction ? ["() => (", ...frag, ")"] : frag;
}
function genBasicDynamicSlot$1(slot, context) {
  const { name, fn } = slot;
  return compilerVapor.genMulti(
    compilerVapor.DELIMITERS_OBJECT_NEWLINE,
    [
      "name: ",
      ...genSharedDataExpression(
        name,
        context,
        context.helper("toDisplayString")
      )
    ],
    ["fn: ", ...genSlotBlockWithProps$1(fn, context)]
  );
}
function genLoopSlot$1(slot, context) {
  context.enterVFor();
  const { name, fn, loop } = slot;
  const { value, key, index, source } = loop;
  const rawValue = value && value.content;
  const rawKey = key && key.content;
  const rawIndex = index && index.content;
  const idMap = {};
  if (rawValue) idMap[rawValue] = rawValue;
  if (rawKey) idMap[rawKey] = rawKey;
  if (rawIndex) idMap[rawIndex] = rawIndex;
  const slotExpr = compilerVapor.genMulti(
    compilerVapor.DELIMITERS_OBJECT_NEWLINE,
    [
      "name: ",
      ...context.withId(() => {
        if (!name.sharedData) {
          return genExpression$1(name, context);
        }
        const resetBlock = context.enterBlock(fn);
        const result = genSharedDataExpression(
          name,
          context,
          context.helper("toDisplayString")
        );
        resetBlock();
        return result;
      }, idMap)
    ],
    [
      "fn: ",
      ...context.withId(() => genSlotBlockWithProps$1(fn, context), idMap)
    ]
  );
  return [
    ...compilerVapor.genCall(
      context.helper("createSharedDataForSlots"),
      compilerVapor.genCall(
        context.helper("setSharedData"),
        context.sharedDataVar,
        JSON.stringify(source.sharedData.ident),
        genSharedDataVFor(context)
      ),
      genExpression$1(source, context),
      [
        ...compilerVapor.genMulti(
          ["(", ")", ", "],
          context.sharedDataVForVar,
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
function genConditionalSlot$1(slot, context) {
  const { condition, positive, negative } = slot;
  return [
    ...genCondition$1(condition, context),
    compilerVapor.INDENT_START,
    compilerVapor.NEWLINE,
    "? ",
    ...genDynamicSlot$1(positive, context),
    compilerVapor.NEWLINE,
    ": ",
    ...negative ? [...genDynamicSlot$1(negative, context)] : ["void 0"],
    compilerVapor.INDENT_END
  ];
}
function genSlotBlockWithProps$1(oper, context) {
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
    () => genBlock$1(oper, context, [propsName]),
    idMap
  );
  exitScope && exitScope();
  return blockFn;
}

function genSlotOutlet$1(oper, context) {
  const { helper } = context;
  const { name, fallback } = oper;
  const [frag, push] = compilerVapor.buildCodeFragment();
  const nameExpr = !name.sharedData ? genExpression$1(name, context) : [
    "() => (",
    ...compilerVapor.genCall(
      context.helper("setSharedData"),
      context.sharedDataVar,
      JSON.stringify(name.sharedData.ident),
      genExpression$1(name, context)
    ),
    ")"
  ];
  let fallbackArg;
  if (fallback) {
    fallbackArg = genBlock$1(fallback, context);
  }
  push(
    compilerVapor.NEWLINE,
    ...compilerVapor.genCall(
      helper("createSharedDataSlot"),
      nameExpr,
      genRawProps(oper.props, context) || "null",
      fallbackArg
    )
  );
  return frag;
}

function genOperations$1(opers, context) {
  const [frag, push] = compilerVapor.buildCodeFragment();
  for (const operation of opers) {
    push(...genOperationWithInsertionState$1(operation, context));
  }
  return frag;
}
function genOperationWithInsertionState$1(oper, context) {
  const [frag, push] = compilerVapor.buildCodeFragment();
  push(...genOperation$1(oper, context));
  return frag;
}
function genOperation$1(oper, context) {
  switch (oper.type) {
    case 2:
      return genSetProp$1(oper, context);
    case 3:
      return genDynamicProps$2(oper, context);
    case 4:
      return genSetText$1(oper, context);
    case 5:
      return genSetEvent$1(oper, context);
    case 6:
      return genSetDynamicEvents$1(oper, context);
    case 7:
      return genSetHtml$1(oper, context);
    case 8:
      return genSetTemplateRef$1(oper, context);
    case 9:
      return genInsertNode$1(oper, context);
    case 10:
      return genPrependNode$1(oper, context);
    case 15:
      return genIf$1(oper, context);
    case 16:
      return genFor$1(oper, context);
    case 11:
      return genCreateComponent$1(oper, context);
    case 14:
      return genDeclareOldRef$1(oper);
    case 12:
      return genSlotOutlet$1(oper, context);
    case 13:
      return genBuiltinDirective$1(oper, context);
    case 17:
      return genGetTextChild$1();
    default:
      const exhaustiveCheck = oper;
      throw new Error(
        `Unhandled operation type in genOperation: ${exhaustiveCheck}`
      );
  }
}
function genEffects$1(effects, context, genExtraFrag) {
  const { helper } = context;
  const expressions = effects.flatMap((effect) => effect.expressions);
  const [frag, push, unshift] = compilerVapor.buildCodeFragment();
  const shouldDeclare = genExtraFrag === void 0;
  let operationsCount = 0;
  const {
    ids,
    frag: declarationFrags,
    varNames
  } = processExpressions$1(context, expressions, shouldDeclare);
  push(...declarationFrags);
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    operationsCount += effect.operations.length;
    const frags = context.withId(() => genEffect$1(effect, context), ids);
    i > 0 && push(compilerVapor.NEWLINE);
    if (frag[frag.length - 1] === ")" && frags[0] === "(") {
      push(";");
    }
    push(...frags);
  }
  const newLineCount = frag.filter((frag2) => frag2 === compilerVapor.NEWLINE).length;
  if (newLineCount > 1 || operationsCount > 1 || declarationFrags.length > 0) {
    unshift(`{`, compilerVapor.INDENT_START, compilerVapor.NEWLINE);
    push(compilerVapor.INDENT_END, compilerVapor.NEWLINE, "}");
    if (!effects.length) {
      unshift(compilerVapor.NEWLINE);
    }
  }
  if (effects.length) {
    unshift(compilerVapor.NEWLINE, `${helper("renderSharedDataEffect")}(() => `);
    push(`)`);
  }
  if (!shouldDeclare && varNames.length) {
    unshift(compilerVapor.NEWLINE, `let `, varNames.join(", "));
  }
  if (genExtraFrag) {
    push(...context.withId(genExtraFrag, ids));
  }
  return frag;
}
function genEffect$1({ operations }, context) {
  const [frag, push] = compilerVapor.buildCodeFragment();
  const operationsExps = genOperations$1(operations, context);
  const newlineCount = operationsExps.filter((frag2) => frag2 === compilerVapor.NEWLINE).length;
  if (newlineCount > 1) {
    push(...operationsExps);
  } else {
    push(...operationsExps.filter((frag2) => frag2 !== compilerVapor.NEWLINE));
  }
  return frag;
}

function genSelf$1(dynamic, context) {
  const [frag, push] = compilerVapor.buildCodeFragment();
  const { operation } = dynamic;
  if (operation) {
    push(...genOperationWithInsertionState$1(operation, context));
  }
  return frag;
}
function genChildren$1(dynamic, context) {
  const [frag, push] = compilerVapor.buildCodeFragment();
  const { children } = dynamic;
  const childrenToGen = [];
  for (const [_, child] of children.entries()) {
    if (child.flags & 2) ;
    const id = child.flags & 1 ? child.flags & 4 ? child.anchor : child.id : void 0;
    if (id === void 0 && !child.hasDynamicChild) {
      push(...genSelf$1(child, context));
      continue;
    }
    if (id === child.anchor) {
      push(...genSelf$1(child, context));
    }
    childrenToGen.push(child);
  }
  if (childrenToGen.length) {
    for (const child of childrenToGen) {
      push(...genChildren$1(child, context));
    }
  }
  return frag;
}

function genBlock$1(oper, context, args = [], root) {
  return [
    "(",
    ...args,
    ") => {",
    compilerVapor.INDENT_START,
    ...genBlockContent$1(oper, context, root),
    compilerVapor.INDENT_END,
    compilerVapor.NEWLINE,
    "}"
  ];
}
function genBlockContent$1(block, context, root, genEffectsExtraFrag) {
  const [frag, push] = compilerVapor.buildCodeFragment();
  const { dynamic, effect, operation } = block;
  const resetBlock = context.enterBlock(block);
  if (root) {
    for (let name of context.ir.component) {
      const id = compilerDom.toValidAssetId(name, "component");
      const maybeSelfReference = name.endsWith("__self");
      if (maybeSelfReference) name = name.slice(0, -6);
      push(
        compilerVapor.NEWLINE,
        `const ${id} = `,
        ...compilerVapor.genCall(
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
    push(...genSelf$1(child, context));
  }
  for (const child of dynamic.children) {
    push(...genChildren$1(child, context));
  }
  push(...genOperations$1(operation, context));
  push(
    ...genEffects$1(
      // fixed by uts for 中 matchPatterns 已经处理了一部分 effect
      effect.filter((effect2) => !effect2.generated),
      context,
      genEffectsExtraFrag
    )
  );
  resetBlock();
  return frag;
  function genResolveAssets(kind, helper) {
    for (const name of context.ir[kind]) {
      push(
        compilerVapor.NEWLINE,
        `const ${compilerDom.toValidAssetId(name, kind)} = `,
        ...compilerVapor.genCall(context.helper(helper), JSON.stringify(name))
      );
    }
  }
}

const RENDERER_TYPE = {
  "ELEMENT": "element",
  "NATIVE_VIEW": "nativeView"
};
const DOM2_APP_PLATFORM = {
  "APP_ANDROID": "app-android",
  "APP_HARMONY": "app-harmony",
  "APP_IOS": "app-ios"
};
function getDom2AppTarget(platform, type) {
  switch (platform) {
    case "app-harmony":
      return type === "element" ? "dom-c" : "nv-c";
    case "app-android":
      return type === "element" ? "dom-kt" : "nv-kt";
    case "app-ios":
      return type === "element" ? "dom-c" : "nv-c";
  }
}
const TARGET_LANGUAGE = {
  "TS": "ts",
  "CPP": "cpp",
  "KOTLIN": "kotlin",
  "SWIFT": "swift"
};
const COMPONENT_TYPE = {
  "APP": "app",
  "PAGE": "page",
  "COMPONENT": "component"
};
class SharedDataCodegenContext {
  constructor() {
    this.vForCount = -1;
  }
  enterVFor() {
    this.vForCount++;
    return this.vForCount;
  }
  get sharedDataVar() {
    const { node } = this.block;
    let isInVFor = false;
    if ("__vFor" in node) {
      isInVFor = node.__vFor;
    }
    node.__vFor = isInVFor = node.type === 1 && node.tagType === 3 && node.props.some(
      (prop) => prop.type === 7 && prop.name === "for"
    );
    return isInVFor ? this.sharedDataVForVar : `__sharedData`;
  }
  get sharedDataVForVar() {
    return `__sharedData_VFor${this.vForCount}`;
  }
  get sharedDataVForItemVar() {
    return `__vForItem${this.vForCount}`;
  }
}

class CodegenContext extends SharedDataCodegenContext {
  constructor(ir, options) {
    super();
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
      platform: "app-harmony",
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
      componentType: "page",
      className: ""
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
  get sharedDataScopeVar() {
    return "__sharedDataScope";
  }
  get sharedDataVForClassType() {
    return `\${__SHARED_DATA_CLASS_NAME_TYPE}_VFor${this.vForCount}`;
  }
}
function generate$1(ir, options) {
  const [frag, push] = compilerVapor.buildCodeFragment();
  const context = new CodegenContext(ir, options);
  const { helpers } = context;
  const { inline } = options;
  const functionName = "renderSharedData";
  push(compilerVapor.NEWLINE, `return (function ${functionName}(): UniSharedData { 'raw js'`);
  push(compilerVapor.INDENT_START);
  if (options.componentType === "page") {
    push(
      compilerVapor.NEWLINE,
      `const __sharedData = useSharedDataPage<__SHARED_DATA_CLASS_NAME_TYPE>(__pageId!)`
    );
    push(compilerVapor.NEWLINE, `__sharedDataScope = __sharedData`);
  } else {
    push(
      compilerVapor.NEWLINE,
      `const __sharedData = useSharedDataComponent<__SHARED_DATA_CLASS_NAME_TYPE>(__sharedDataScope)`
    );
  }
  if (ir.hasTemplateRef) {
    push(
      compilerVapor.NEWLINE,
      `const ${setTemplateRefIdent} = ${context.helper("createSharedDataTemplateRefSetter")}()`
    );
  }
  push(...genBlockContent$1(ir.block, context, true));
  push(compilerVapor.NEWLINE, `return __sharedData`);
  push(compilerVapor.INDENT_END, compilerVapor.NEWLINE);
  push("})()");
  const imports = genHelperImports$1(context);
  const preamble = imports + genClassName(context);
  const newlineCount = [...preamble].filter((c) => c === "\n").length;
  if (newlineCount && !inline) {
    frag.unshift(...new Array(newlineCount).fill(compilerVapor.LF));
  }
  const [code, map] = compilerVapor.codeFragmentToString(frag, context);
  return {
    code,
    ast: ir,
    preamble,
    map: map && map.toJSON(),
    helpers
  };
}
function genHelperImports$1({ helpers, options }) {
  let imports = "";
  if (helpers.size) {
    imports += `import { ${[...helpers].map((h) => `${h} as _${h}`).join(", ")} } from '${options.runtimeModuleName}';
`;
  }
  return imports;
}
function genClassName(context) {
  return `
const __className = '${context.options.className}' as const
type __SHARED_DATA_CLASS_NAME_TYPE = \`\${typeof __className}SharedData\`
`;
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
  const { content, ast, isStatic, loc, sharedData } = node;
  if (sharedData) {
    return [[context.sharedDataIdent(sharedData.ident), -2, loc]];
  }
  if (isStatic) {
    return [[JSON.stringify(content), -2, loc]];
  }
  if (!node.content.trim() || // there was a parsing error
  ast === false || compilerVapor.isConstantExpression(node)) {
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
  if (!(context.feature & 2)) {
    return [];
  }
  const { element, key, keyOverride, modifiers, delegate, effect, sharedData } = oper;
  const name = genName();
  const eventOptions = genEventOptions();
  const eventId = `e${sharedData.ident}${oper.element}`;
  return [
    NEWLINE,
    `const ${eventId} = ${context.sharedDataIdent(sharedData.ident)}`,
    NEWLINE,
    ...genCall(
      context.helper(delegate ? "delegate" : "onElement"),
      `n${element}`,
      name,
      [`(event: UniEvent) => {`, `${eventId}(event)`, `}`],
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
}
function genSetDynamicEvents(oper, context) {
  if (!(context.feature & 2)) {
    return [];
  }
  const { helper, sharedDataIdent } = context;
  return [
    NEWLINE,
    ...genCall(
      helper("setElementDynamicEvents"),
      `n${oper.element}`,
      sharedDataIdent(oper.event.sharedData.ident)
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
  const { helper, factoryVar } = context;
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
  const count = context.enterVFor();
  const [_, exitScope] = context.enterScope();
  const idMap = {};
  const itemVar = `_for_item${count}`;
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
  const args = [context.sharedDataVForItemVar];
  const useSharedDataVFor = `const ${context.sharedDataVForVar} = useSharedDataVFor<UniSharedData, ${context.sharedDataVForClass}>(${context.sharedDataVForItemVar})`;
  const keyVar = `_for_key${count}`;
  args.push(`, ${keyVar}`);
  if (rawKey) {
    idMap[rawKey] = `${keyVar}.value`;
    idMap[keyVar] = null;
  }
  const indexVar = `_for_index${count}`;
  args.push(`, ${indexVar}`);
  if (rawIndex) {
    idMap[rawIndex] = `${indexVar}.value`;
    idMap[indexVar] = null;
  }
  const resetBlock = context.enterBlock(render);
  const getKeyFrag = genCallback(keyProp, context.sharedDataVForItemVar);
  resetBlock();
  const { selectorPatterns, keyOnlyBindingPatterns } = matchPatterns(
    render,
    keyProp,
    idMap
  );
  const blockFn = context.withId(() => {
    const frag = [];
    frag.push(
      "(",
      ...args,
      ") => {",
      INDENT_START,
      NEWLINE,
      useSharedDataVFor,
      NEWLINE
    );
    if (selectorPatterns.length || keyOnlyBindingPatterns.length) {
      frag.push(
        ...genBlockContent(render, context, false, () => {
          const patternFrag = [];
          for (let i = 0; i < selectorPatterns.length; i++) {
            const { effect } = selectorPatterns[i];
            const operFrag = [];
            for (const oper2 of effect.operations) {
              operFrag.push(...genOperation(oper2, context));
            }
            if (operFrag.length) {
              patternFrag.push(
                NEWLINE,
                helper(`render${context.helperType}Effect`),
                `(() => {`,
                INDENT_START
              );
              patternFrag.push(...operFrag);
              patternFrag.push(INDENT_END, NEWLINE, `})`);
            }
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
  return [
    NEWLINE,
    `const n${id} = `,
    ...genCall(
      [helper(`create${context.helperType}For`), "undefined"],
      factoryVar,
      sourceExpr,
      blockFn,
      getKeyFrag,
      flags ? String(flags) : void 0,
      void 0
      // todo: hydrationNode
    )
  ];
  function parseValueDestructure() {
    const map = /* @__PURE__ */ new Map();
    if (value) {
      rawValue = value && value.content;
      if (value.ast) {
        compilerDom.walkIdentifiers(
          value.ast,
          (id2, _2, parentStack, ___, isLocal) => {
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
  function genCallback(expr, sharedDataVForItemVar) {
    if (!expr) return false;
    const res = context.withId(
      () => genExpression(expr, context),
      genSimpleIdMap()
    );
    return [
      ...genMulti(["(", ")", ", "], sharedDataVForItemVar, "_", "__"),
      " => {",
      NEWLINE,
      useSharedDataVFor,
      NEWLINE,
      "return ",
      ...res,
      "}"
    ];
  }
  function genSimpleIdMap() {
    const idMap2 = {};
    if (rawKey) idMap2[rawKey] = null;
    if (rawIndex) idMap2[rawIndex] = null;
    idToPathMap.forEach((_2, id2) => idMap2[id2] = null);
    return idMap2;
  }
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
  const { helper, factoryVar } = context;
  const { condition, positive, negative, once } = oper;
  const [frag, push] = buildCodeFragment();
  const conditionExpr = [
    "() => (",
    ...genCondition(condition, context),
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
  push(
    ...genCall(
      helper(`create${context.helperType}If`),
      factoryVar,
      conditionExpr,
      positiveArg,
      negativeArg,
      once && "true"
    )
  );
  return frag;
}
function genCondition(condition, context) {
  return !condition.sharedData ? [JSON.stringify(parseSharedDataBooleanExpression(condition))] : genExpression(condition, context);
}

const elementHelpers = {
  // setElementHtml: { name: 'setElementHtml' },
  setElementClass: { name: "setElementClass" },
  setElementStyle: { name: "setElementStyle" },
  // setElementValue: { name: 'setElementValue' },
  setElementAttr: { name: "setElementAttr", needKey: true }
  // setElementProp: { name: 'setElementProp', needKey: true },
  // setElementDOMProp: { name: 'setElementDOMProp', needKey: true },
  // setElementDynamicProps: { name: 'setElementDynamicProps' },
};
const nativeViewHelpers = {
  // setElementText: { name: 'setElementText' },
  // setElementHtml: { name: 'setElementHtml' },
  // setElementClass: { name: 'setElementClass' },
  // setElementStyle: { name: 'setElementStyle' },
  // setNativeViewValue: { name: 'setNativeViewValue' },
  setNativeViewAttr: { name: "setNativeViewAttr", needKey: true }
  // setElementProp: { name: 'setElementProp', needKey: true },
  // setElementDOMProp: { name: 'setElementDOMProp', needKey: true },
  // setElementDynamicProps: { name: 'setElementDynamicProps' },
};
function genSetProp(oper, context) {
  const { helper } = context;
  const {
    prop: { key, values, modifier, sharedData },
    tag
  } = oper;
  const propName = key.content;
  if (propName === "class" && !(context.feature & 16)) {
    return [];
  }
  if (propName === "id" && !(context.feature & 32)) {
    return [];
  }
  const resolvedHelper = context.options.renderer === "nativeView" ? getNativeViewRuntimeHelper(tag, propName, modifier) : getElementRuntimeHelper(tag, propName, modifier);
  if (sharedData) {
    return [
      NEWLINE,
      ...genCall(
        [helper(resolvedHelper.name), null],
        `n${oper.element}`,
        resolvedHelper.needKey ? genExpression(key, context) : false,
        context.sharedDataIdent(sharedData.ident)
      )
    ];
  }
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
function genDynamicProps(oper, context) {
  const { helper, sharedDataIdent } = context;
  return [
    NEWLINE,
    ...genCall(
      helper(`set${context.helperType}DynamicProps`),
      `n${oper.element}`,
      sharedDataIdent(oper.sharedData.ident)
    )
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
function getElementRuntimeHelper(tag, key, modifier) {
  tag.toUpperCase();
  if (modifier) {
    if (modifier === ".") {
      return getElementSpecialHelper(key) || elementHelpers.setElementAttr;
    } else {
      return elementHelpers.setElementAttr;
    }
  }
  const helper = getElementSpecialHelper(key);
  if (helper) {
    return helper;
  }
  return elementHelpers.setElementAttr;
}
function getElementSpecialHelper(keyName, tagName) {
  if (keyName === "class") {
    return elementHelpers.setElementClass;
  } else if (keyName === "style") {
    return elementHelpers.setElementStyle;
  }
}
function getNativeViewRuntimeHelper(tag, key, modifier) {
  tag.toUpperCase();
  if (modifier) {
    if (modifier === ".") {
      return getNativeViewSpecialHelper() || nativeViewHelpers.setNativeViewAttr;
    } else {
      return nativeViewHelpers.setNativeViewAttr;
    }
  }
  const helper = getNativeViewSpecialHelper();
  if (helper) {
    return helper;
  }
  return nativeViewHelpers.setNativeViewAttr;
}
function getNativeViewSpecialHelper(keyName, tagName) {
  return;
}

function genSetTemplateRef(oper, context) {
  if (oper.value.sharedData) {
    return [
      NEWLINE,
      context.sharedDataIdent(oper.value.sharedData.ident) + `(n${oper.element}.getNodeId())`
    ];
  }
  return [];
}
function genDeclareOldRef(oper) {
  return [];
}

function genSetText(oper, context) {
  if (!(context.feature & 1)) {
    return [];
  }
  const { helper } = context;
  const { element, values, generated } = oper;
  const texts = combineValues(values, context);
  return [
    NEWLINE,
    ...genCall(
      helper("setElementText"),
      `${generated ? "x" : "n"}${element}`,
      texts
    )
  ];
}
function combineValues(values, context) {
  return values.flatMap((value, i) => {
    let exp = genExpression(value, context);
    if (i > 0) {
      exp.unshift(" + ");
    }
    return exp;
  });
}
function genGetTextChild(oper, context) {
  if (!(context.feature & 1)) {
    return [];
  }
  return [
    NEWLINE,
    `const x${oper.parent} = ${context.helper(`child${context.helperType}`)}(n${oper.parent})`
  ];
}

function genVShow(oper, context) {
  if (!(context.feature & 8)) {
    return [];
  }
  return [
    NEWLINE,
    ...genCall(context.helper("applyElementVShow"), `n${oper.element}`, [
      `() => (`,
      ...genExpression(oper.dir.exp, context),
      `)`
    ])
  ];
}

const helperMap = {
  text: "applyElementTextModel",
  dynamic: "applyElementDynamicModel"
};
function genVModel(oper, context) {
  if (!(context.feature & 4)) {
    return [];
  }
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
      context.sharedDataIdent(exp.sharedData.vModel.eventIdent),
      // modifiers
      modifiers.length ? `{ ${modifiers.map((e) => e.content + ": true").join(",")} }` : void 0
    )
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
  const { helper, sharedDataIdent } = context;
  const { root, props, slots, sharedData } = operation;
  const rawSlots = genRawSlots(slots, context);
  const [_, handlers] = processInlineHandlers(props, context);
  const inlineHandlers = handlers.reduce(
    (acc, { name, value }) => {
      const handler = genEventHandler(context, value, void 0, false);
      return [...acc, `const ${name} = `, ...handler, NEWLINE];
    },
    []
  );
  return [
    NEWLINE,
    ...inlineHandlers,
    `const n${operation.id} = `,
    ...genCall(
      operation.dynamic && !operation.dynamic.isStatic ? helper(`create${context.helperType}DynamicComponent`) : operation.asset ? helper(`create${context.helperType}ComponentWithFallback`) : helper(`create${context.helperType}Component`),
      sharedDataIdent(sharedData.ident),
      void 0,
      rawSlots,
      root ? "true" : false
      // once && 'true',
    ),
    ...genDirectivesForElement(operation.id, context)
  ];
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
  context.enterVFor();
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
    [
      "name: ",
      ...context.withId(() => {
        const resetBlock = context.enterBlock(fn);
        const result = genExpression(name, context);
        resetBlock();
        return result;
      }, idMap)
    ],
    [
      "fn: ",
      ...context.withId(() => genSlotBlockWithProps(fn, context), idMap)
    ]
  );
  return [
    ...genCall(
      context.helper(`create${context.helperType}ForSlots`),
      genExpression(source, context),
      [
        ...genMulti(
          ["(", ")", ", "],
          context.sharedDataVForVar,
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
  push(
    NEWLINE,
    `const n${id} = `,
    ...genCall(
      helper(`create${context.helperType}Slot`),
      nameExpr,
      "null",
      fallbackArg
    )
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
  if (compilerVapor.isBlockOperation(oper) && oper.parent) {
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
      return genDynamicProps(oper, context);
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
      return genDeclareOldRef();
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
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    operationsCount += effect.operations.length;
    const frags = context.withEffect(
      () => context.withId(() => genEffect(effect, context), ids)
    );
    i > 0 && frags.length && push(NEWLINE);
    if (frag[frag.length - 1] === ")" && frags[0] === "(") {
      push(";");
    }
    push(...frags);
  }
  const newLineCount = frag.filter((frag2) => frag2 === NEWLINE).length;
  if (frag.length && (newLineCount > 1 || operationsCount > 1 || declarationFrags.length > 0)) {
    unshift(`{`, INDENT_START, NEWLINE);
    push(INDENT_END, NEWLINE, "}");
    if (!effects.length) {
      unshift(NEWLINE);
    }
  }
  if (effects.length && frag.length) {
    unshift(NEWLINE, `${helper(`render${context.helperType}Effect`)}(() => `);
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
      context.helper(`set${context.helperType}InsertionState`),
      `n${operation.parent}`,
      operation.anchor == null ? void 0 : operation.anchor === -1 ? `0` : `n${operation.anchor}`
    )
  ];
}

const NODE_TYPES = {
  TEXT: "text",
  BUTTON: "button",
  COMMENT: "comment",
  ELEMENT: "element"
};
const CONSTANTS = {
  VALUE_ATTR: "value",
  EMPTY_STRING: "",
  UNKNOWN_COMMENT: "unknown",
  EXT_STYLE_MARKER: "ext:style"
};
const VAR_PREFIXES = {
  ELEMENT: "e",
  STYLE: "s",
  TEMPLATE: "t",
  FACTORY: "f"
};

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

function extractTextContent(children) {
  if (!children || children.length !== 1 || children[0].type !== NODE_TYPES.TEXT) {
    return CONSTANTS.EMPTY_STRING;
  }
  if (children[0].content === " ") {
    return CONSTANTS.EMPTY_STRING;
  }
  return children[0].content || CONSTANTS.EMPTY_STRING;
}
function isEmptyAttrs(attrs) {
  return !attrs || Object.keys(attrs).length === 0 || Object.keys(attrs).length === 1 && CONSTANTS.EXT_STYLE_MARKER in attrs;
}
function mergeTextAttributes(attrs, textContent) {
  const result = shared.extend({}, attrs);
  if (textContent) {
    result[CONSTANTS.VALUE_ATTR] = textContent;
  }
  return result;
}
function getFunctionSignature(context) {
  const paramType = "page: UniPage";
  const returnType = context.options.renderer === "element" ? ": UniElement" : ": UniNativeBaseView";
  return { paramType, returnType };
}
function getNextVariableName(context) {
  return `${VAR_PREFIXES.ELEMENT}${context.templateVariableCounter++}`;
}
function getNextStyleVariableName(context) {
  return `${VAR_PREFIXES.STYLE}${context.templateStyleCounter++}`;
}

function genNodeStatements(node, context, resetCounters = true) {
  if (resetCounters) {
    context.resetTemplateCounters();
  }
  return genNodeCode(node, context);
}
function genNodeCode(node, context) {
  switch (node.type) {
    case NODE_TYPES.TEXT:
      return createTextElement(node.content || CONSTANTS.EMPTY_STRING, context);
    case NODE_TYPES.COMMENT:
      return createCommentNode(node.content || CONSTANTS.EMPTY_STRING, context);
    case NODE_TYPES.ELEMENT:
      return genElementCode(node, context);
    default:
      return createCommentNode(CONSTANTS.UNKNOWN_COMMENT, context);
  }
}
function createTextElement(content, context) {
  const varName = getNextVariableName(context);
  const statements = [
    `const ${varName} = ${context.genCreateTag(
      "text"
      // JSON.stringify(escapeNewlines(content)),
    )}`
  ];
  return { variableName: varName, statements };
}
function createCommentNode(content, context) {
  const varName = getNextVariableName(context);
  const statements = [
    `const ${varName} = ${context.genCreateTag("comment", JSON.stringify(content))}`
  ];
  return { variableName: varName, statements };
}
const specialTagHandlers = {
  [NODE_TYPES.TEXT]: genTextElementCode,
  [NODE_TYPES.BUTTON]: genButtonElementCode
};
function genElementCode(node, context) {
  const { tag, attrs, children } = node;
  const params = { tag, attrs, children };
  const handler = specialTagHandlers[tag];
  if (handler) {
    return handler(params, context);
  }
  return genRegularElementCode(params, context);
}
function genTextElementCode(params, context) {
  const { tag, attrs, children } = params;
  const hasComplexChildren = children && children.some((child) => child.type === NODE_TYPES.ELEMENT);
  if (hasComplexChildren) {
    return buildElementStatements(tag, context, attrs, children);
  } else {
    const textContent = extractTextContent(children);
    const finalAttrs = mergeTextAttributes(attrs, textContent);
    return buildElementStatements(tag, context, finalAttrs, void 0);
  }
}
function genButtonElementCode(params, context) {
  const textContent = extractTextContent(params.children);
  const finalAttrs = mergeTextAttributes(params.attrs, textContent);
  return buildElementStatements(params.tag, context, finalAttrs, void 0);
}
function genRegularElementCode(params, context) {
  const { tag, attrs, children } = params;
  return buildElementStatements(tag, context, attrs, children);
}
function filterAttrs(attrs, context) {
  if (!attrs) {
    return;
  }
  const newAttrs = {};
  for (const [name, value] of Object.entries(attrs)) {
    if (!context.options.isIgnoreAttr(name)) {
      newAttrs[name] = value;
    }
  }
  return newAttrs;
}
function buildElementStatements(tag, context, nodeAttrs, children) {
  const varName = getNextVariableName(context);
  const statements = [];
  statements.push(`const ${varName} = ${context.genCreateTag(tag)}`);
  const attrs = filterAttrs(nodeAttrs, context);
  if (attrs && !isEmptyAttrs(attrs)) {
    let shouldCacheStyle = false;
    if (CONSTANTS.EXT_STYLE_MARKER in attrs) {
      shouldCacheStyle = true;
      delete attrs[CONSTANTS.EXT_STYLE_MARKER];
    }
    for (const [name, value] of Object.entries(attrs)) {
      if (name === "style") {
        const styleObj = context.options.parseStaticStyle(
          context.options.platform,
          getDom2AppTarget(context.options.platform, context.options.renderer),
          value
        );
        if (styleObj) {
          const styleKeys = Object.keys(styleObj);
          if (shouldCacheStyle) {
            const styleVarName = getNextStyleVariableName(context);
            statements.push(
              `const ${styleVarName} = ${JSON.stringify(
                styleKeys.reduce(
                  (acc, key) => {
                    acc[key] = styleObj[key].valueCode;
                    return acc;
                  },
                  {}
                )
              )}`
            );
            statements.push(`${varName}.ext.set('style', ${styleVarName})`);
          }
          styleKeys.forEach((key) => {
            statements.push(`${varName}.${styleObj[key].setterCode}`);
          });
        } else {
          statements.push(
            `${varName}.setAttribute(${JSON.stringify(name)}, ${JSON.stringify(value)})`
          );
        }
      } else {
        statements.push(
          `${varName}.setAttribute(${JSON.stringify(name)}, ${JSON.stringify(value)})`
        );
      }
    }
  }
  if (children && children.length > 0) {
    for (const child of children) {
      const inlineCode = tryInlineChild(child, context);
      if (inlineCode) {
        statements.push(context.genAppendChild(varName, inlineCode));
      } else {
        const childInfo = genNodeCode(child, context);
        statements.push(...childInfo.statements);
        statements.push(context.genAppendChild(varName, childInfo.variableName));
      }
    }
  }
  return { variableName: varName, statements };
}
function tryInlineChild(child, context) {
  switch (child.type) {
    case NODE_TYPES.TEXT:
      return context.genCreateTag(
        "text"
        // JSON.stringify(child.content || CONSTANTS.EMPTY_STRING),
      );
    case NODE_TYPES.COMMENT:
      return context.genCreateTag(
        "comment",
        JSON.stringify(child.content || CONSTANTS.EMPTY_STRING)
      );
    case NODE_TYPES.ELEMENT:
      const elementChild = child;
      if (canInlineElement(elementChild)) {
        return context.genCreateTag(elementChild.tag);
      }
      return null;
    default:
      return context.genCreateTag(
        "comment",
        JSON.stringify(CONSTANTS.UNKNOWN_COMMENT)
      );
  }
}
function canInlineElement(node) {
  if (node.tag === NODE_TYPES.TEXT) {
    return false;
  }
  if (!isEmptyAttrs(node.attrs)) {
    return false;
  }
  if (node.children && node.children.length > 0) {
    return false;
  }
  return true;
}

function genFactoryFunction(template, index, context) {
  try {
    if (!template || typeof template !== "string") {
      return genEmptyFunction(index, context);
    }
    const parser = new HtmlParser(template);
    const nodes = parser.parse();
    if (nodes.length === 0) {
      return genEmptyFunction(index, context);
    }
    if (nodes.length === 1) {
      return genSingleNodeFunction(nodes[0], index, context);
    }
    return genEmptyFunction(index, context);
  } catch (error) {
    return genEmptyFunction(index, context);
  }
}
function genEmptyFunction(index, context) {
  const { paramType, returnType } = getFunctionSignature(context);
  return [
    `const ${VAR_PREFIXES.FACTORY}${index} = (${paramType})${returnType} => {`,
    NEWLINE,
    `  return ${context.genCreateTag("text", JSON.stringify(CONSTANTS.EMPTY_STRING))}`,
    NEWLINE,
    `}`
  ];
}
function genSingleNodeFunction(node, index, context) {
  const { paramType, returnType } = getFunctionSignature(context);
  const simpleReturn = tryGenSimpleReturn(node, context);
  if (simpleReturn) {
    return [
      `const ${VAR_PREFIXES.FACTORY}${index} = (${paramType})${returnType} => {`,
      NEWLINE,
      `  return ${simpleReturn}`,
      NEWLINE,
      `}`
    ];
  }
  const nodeInfo = genNodeStatements(node, context);
  const result = [
    `const ${VAR_PREFIXES.FACTORY}${index} = (${paramType})${returnType} => {`,
    NEWLINE
  ];
  for (const stmt of nodeInfo.statements) {
    if (typeof stmt === "string") {
      result.push(`  ${stmt}`, NEWLINE);
    } else {
      result.push(stmt, NEWLINE);
    }
  }
  result.push(`  return ${nodeInfo.variableName}`, NEWLINE, `}`);
  return result;
}
function tryGenSimpleReturn(node, context) {
  switch (node.type) {
    case NODE_TYPES.TEXT:
      return context.genCreateTag(
        "text"
        // JSON.stringify(node.content || CONSTANTS.EMPTY_STRING),
      );
    case NODE_TYPES.COMMENT:
      return context.genCreateTag(
        "comment",
        JSON.stringify(node.content || CONSTANTS.EMPTY_STRING)
      );
    case NODE_TYPES.ELEMENT:
      const elementNode = node;
      if (isSimpleElement(elementNode)) {
        return context.genCreateTag(elementNode.tag);
      }
      return null;
    default:
      return context.genCreateTag(
        "comment",
        JSON.stringify(CONSTANTS.UNKNOWN_COMMENT)
      );
  }
}
function isSimpleElement(node) {
  const emptyAttrs = isEmptyAttrs(node.attrs);
  if (!emptyAttrs) return false;
  if (node.tag === NODE_TYPES.TEXT) {
    const textContent = extractTextContent(node.children);
    return !textContent;
  }
  return !node.children || node.children.length === 0;
}

function genFactoryFunctions(templates, context) {
  const result = [];
  for (let i = 0; i < templates.length; i++) {
    const functionFragments = genFactoryFunction(templates[i], i, context);
    result.push(NEWLINE, ...functionFragments);
  }
  return result;
}
function genFactoryCallsInRender(templates, rootIndex, context) {
  const { helper, options } = context;
  const result = [];
  for (let i = 0; i < templates.length; i++) {
    const rootParam = i === rootIndex ? ", true" : "";
    result.push(
      `const ${VAR_PREFIXES.TEMPLATE}${i} = ${helper(`${options.renderer}Factory`)}(${context.factoryVar}, ${VAR_PREFIXES.FACTORY}${i}${rootParam})`
    );
    if (i < templates.length - 1) {
      result.push(NEWLINE);
    }
  }
  return result;
}

function genTemplates(templates, _rootIndex, context) {
  const factoryFunctions = genFactoryFunctions(templates, context);
  return factoryFunctions;
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
  const { helper } = context;
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
        pushBlock(...genCall(helper(`next${context.helperType}`), prev[0]));
      } else {
        pushBlock(
          ...genCall(
            helper(`nthChild${context.helperType}`),
            from,
            String(elementIndex)
          )
        );
      }
    } else {
      if (elementIndex === 0) {
        pushBlock(...genCall(helper(`child${context.helperType}`), from));
      } else {
        let init = genCall(helper(`child${context.helperType}`), from);
        if (elementIndex === 1) {
          init = genCall(helper(`next${context.helperType}`), init);
        } else if (elementIndex > 1) {
          init = genCall(
            helper(`nthChild${context.helperType}`),
            from,
            String(elementIndex)
          );
        }
        pushBlock(...init);
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
    ...genBlockContent(oper, context),
    INDENT_END,
    NEWLINE,
    "}"
  ];
}
function genBlockContent(block, context, root, genEffectsExtraFrag) {
  const [frag, push] = buildCodeFragment();
  const { dynamic, effect, operation, returns } = block;
  const resetBlock = context.enterBlock(block);
  for (const child of dynamic.children) {
    push(...genSelf(child, context));
  }
  for (const child of dynamic.children) {
    push(...genChildren(child, context, push, `n${child.id}`));
  }
  push(...genOperations(operation, context));
  push(
    ...genEffects(
      // fixed by uts for 中 matchPatterns 已经处理了一部分 effect
      effect.filter((effect2) => !effect2.generated),
      context,
      genEffectsExtraFrag
    )
  );
  push(NEWLINE, `return `);
  const returnNodes = returns.map((n) => `n${n}`);
  const returnsCode = returnNodes.length > 1 ? [
    ...genMulti(DELIMITERS_ARRAY, ...returnNodes),
    ` as Uni${context.helperType}Block[]`
  ] : [returnNodes[0] || "null"];
  push(...returnsCode);
  resetBlock();
  return frag;
}

const RENDER_ELEMENT_FEATURE = 1 | 2 | 4 | 8 | 16 | 32;
const RENDER_NATIVE_VIEW_FEATURE = 0;
function isIgnoreElementAttr(name) {
  return false;
}
const IGNORE_NATIVE_VIEW_ATTRS = ["class", "id"];
function isIgnoreNativeViewAttr(name) {
  if (name === "style") {
    return false;
  }
  return IGNORE_NATIVE_VIEW_ATTRS.includes(name) || true;
}

class RendererCodegenContext extends SharedDataCodegenContext {
  constructor(ir, options) {
    super();
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
    this.sharedDataIdent = (ident) => {
      this.effectSharedDataIdentifiers.add(ident);
      return `${this.sharedDataVar}.get_${ident}(__reactivity)`;
    };
    // Template factory counters
    this.templateVariableCounter = 0;
    this.templateStyleCounter = 0;
    // 记录当前 effect 中使用的 sharedData 标识符列表
    this.effectSharedDataIdentifiers = /* @__PURE__ */ new Set();
    const defaultOptions = {
      mode: "module",
      platform: "app-harmony",
      renderer: "element",
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
      componentType: "page",
      className: "",
      parseStaticStyle: (platform, target, style) => ({}),
      isIgnoreAttr: () => false
    };
    this.options = shared.extend(defaultOptions, options);
    this.block = ir.block;
    const isNativeView = this.options.renderer === "nativeView";
    this.genCreateTag = isNativeView ? this.genCreateNativeView : this.genCreateElement;
    this.genAppendChild = isNativeView ? this.genAppendChildNativeView : this.genAppendChildElement;
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
  get factoryVar() {
    return "__page";
  }
  get helperType() {
    return this.options.renderer === "nativeView" ? "NativeView" : "Element";
  }
  get sharedDataVForClass() {
    return `${this.options.className}SharedData_VFor${this.vForCount}`;
  }
  get feature() {
    return this.options.renderer === "nativeView" ? RENDER_NATIVE_VIEW_FEATURE : RENDER_ELEMENT_FEATURE;
  }
  resetTemplateCounters() {
    this.templateVariableCounter = 0;
    this.templateStyleCounter = 0;
  }
  withEffect(fn) {
    this.effectSharedDataIdentifiers.clear();
    const result = fn();
    if (this.effectSharedDataIdentifiers.size) {
      const [frag, push] = buildCodeFragment();
      push(NEWLINE);
      push(`if(${genEffectSharedDataIdentifiers(this)}) {`);
      push(NEWLINE);
      push(INDENT_START);
      push(...result);
      push(INDENT_END);
      push(NEWLINE);
      push("}");
      this.effectSharedDataIdentifiers.clear();
      return frag;
    }
    return result;
  }
  genCreateNativeView(tag, options, flatten) {
    const createArgs = [];
    if (options && tag !== "text") {
      createArgs.push(options);
    }
    if (flatten) {
      createArgs.push("true");
    } else {
      createArgs.push("false");
    }
    const args = createArgs.join(", ");
    switch (tag) {
      case "view":
        return `page.createNativeView(${args})`;
      case "text":
        return `page.createNativeTextView(${args})`;
      case "image":
        return `page.createNativeImageView(${args})`;
      case "scroll-view":
        return `page.createNativeScrollView(${args})`;
      case "native-view":
        return `page.createNativeCustomView(${args})`;
      default:
        throw new Error(`Invalid tag: ${tag}`);
    }
  }
  genCreateElement(tag, options, flatten) {
    const createArgs = [];
    if (options && tag !== "comment") {
      createArgs.push(options);
    }
    if (flatten) {
      createArgs.push("true");
    } else if (tag !== "comment") {
      createArgs.push("false");
    }
    const args = createArgs.join(", ");
    switch (tag) {
      case "view":
        return `page.createViewElement(${args})`;
      case "text":
        return `page.createTextElement(${args})`;
      case "image":
        return `page.createImageElement(${args})`;
      case "comment":
        return `page.createComment(${args || '""'})`;
      case "scroll-view":
        return `page.createScrollViewElement(${args})`;
      default:
        console.log(`Invalid tag: ${tag}`);
        return `page.createViewElement(false)`;
    }
  }
  genAppendChildNativeView(node, child) {
    return `${this.helper("appendNativeViewChild")}(${node}, ${child})`;
  }
  genAppendChildElement(node, child) {
    return `${node}.appendChild(${child})`;
  }
}
function generate(ir, options) {
  var _a;
  options.renderer = (_a = options.renderer) != null ? _a : "element";
  options.isIgnoreAttr = options.renderer === "element" ? isIgnoreElementAttr : isIgnoreNativeViewAttr;
  const [frag, push] = buildCodeFragment();
  const context = new RendererCodegenContext(ir, options);
  const { helpers } = context;
  const functionName = "render" + shared.capitalize(options.renderer);
  const signature = [
    `__sharedData: ${options.className}SharedData`,
    `__page: UniPage`,
    `__reactivity: VueReactivity`
  ].join(", ");
  {
    push(
      NEWLINE,
      `export function ${functionName}(${signature}): Uni${context.helperType}Block {`
    );
  }
  push(INDENT_START);
  const templates = genTemplates(ir.template, ir.rootTemplateIndex, context);
  push(...templates);
  if (ir.template.length > 0) {
    const templateCalls = genFactoryCallsInRender(
      ir.template,
      ir.rootTemplateIndex,
      context
    );
    push(NEWLINE, ...templateCalls);
  }
  push(...genBlockContent(ir.block, context));
  push(INDENT_END, NEWLINE);
  {
    push("}");
  }
  const delegates = genDelegates(context);
  const imports = genHelperImports(context);
  const preamble = imports + delegates;
  const newlineCount = [...preamble].filter((c) => c === "\n").length;
  if (newlineCount && true) {
    frag.unshift(...new Array(newlineCount).fill(LF));
  }
  let [code, map] = codeFragmentToString(frag, context);
  {
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
function genDelegates({ delegates, helper }) {
  return delegates.size ? genCall(
    helper("delegateEvents"),
    ...Array.from(delegates).map((v) => `"${v}"`)
  ).join("") + "\n" : "";
}
function genHelperImports({
  helpers,
  helper,
  options
}) {
  let imports = "";
  ["getRestElement", "getDefaultValue"].forEach((h) => {
    helpers.delete(h);
  });
  if (helpers.size) {
    imports += `import { ${[...helpers].map((h) => `${h} as _${h}`).join(", ")} } from '${options.runtimeModuleName}';
`;
  }
  return imports;
}
const sharedDataIdentGenerator = new IdentGenerator(2e3);
function genEffectSharedDataIdentifiers(context) {
  return Array.from(context.effectSharedDataIdentifiers).map((name) => genEffectSharedDataIdentifier(name, context)).join(" || ");
}
function genEffectSharedDataIdentifier(name, context) {
  const { index, bitValue } = sharedDataIdentGenerator.getGroupInfo(name);
  return `${context.sharedDataVar}._flag${index} & ${bitValue}`;
}

function compile(source, options) {
  const resolvedOptions = shared.extend({}, options);
  const ast = shared.isString(source) ? compilerVapor.parse(source, resolvedOptions) : source;
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
  const { expressionPlugins } = options;
  if (!expressionPlugins || !expressionPlugins.includes("typescript")) {
    resolvedOptions.expressionPlugins = [
      ...expressionPlugins || [],
      "typescript"
    ];
  }
  const vaporIR = compilerVapor.transform(
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
  transformSharedData(vaporIR, {
    platform: options.platform,
    bindingMetadata: options.bindingMetadata || shared.EMPTY_OBJ
  });
  const sharedDataResult = generate$1(vaporIR, resolvedOptions);
  const nativeViewResult = generate(vaporIR, {
    ...resolvedOptions,
    renderer: "nativeView"
  });
  const elementResult = generate(vaporIR, {
    ...resolvedOptions,
    renderer: "element"
  });
  if (options.emitElement) {
    options.emitElement(elementResult);
  }
  if (options.emitNativeView) {
    options.emitNativeView(nativeViewResult);
  }
  return {
    ...sharedDataResult,
    sharedData: sharedDataResult,
    nativeView: nativeViewResult,
    element: elementResult
  };
}
function getBaseTransformPreset() {
  return compilerVapor.getBaseTransformPreset();
}

function getIdentifierText(ident) {
  return ident.text || ident.escapedText;
}
function getClassName(decl) {
  return decl.name ? getIdentifierText(decl.name) : "";
}
function getSuperClassName(decl, ts) {
  var _a;
  const heritageClausesNode = decl.heritageClauses;
  if (!heritageClausesNode) {
    return "";
  }
  const extendsClause = heritageClausesNode.find(
    (clause) => clause.token === ts.SyntaxKind.ExtendsKeyword
  );
  const superTypeNode = (_a = extendsClause == null ? void 0 : extendsClause.types[0]) == null ? void 0 : _a.expression;
  if (!superTypeNode || !ts.isIdentifier(superTypeNode)) {
    return "";
  }
  return getIdentifierText(superTypeNode);
}
function isKeywordTypeNode(node, ts) {
  return node.kind === ts.SyntaxKind.StringKeyword || node.kind === ts.SyntaxKind.BooleanKeyword || node.kind === ts.SyntaxKind.NumberKeyword || node.kind === ts.SyntaxKind.UndefinedKeyword;
}
function parseClassMemberType(member, ts) {
  if (!ts.isPropertyDeclaration(member)) {
    return;
  }
  if (member.modifiers && member.modifiers.length > 0 && member.modifiers.some(
    (modifier) => modifier.kind === ts.SyntaxKind.ReadonlyKeyword
  )) {
    return;
  }
  if (!member.type) {
    return;
  }
  const memberNameNode = member.name;
  if (!ts.isIdentifier(memberNameNode)) {
    return;
  }
  const memberName = getIdentifierText(memberNameNode);
  const memberType = member.type;
  if (!ts.isUnionTypeNode(memberType)) {
    if (!ts.isTypeReferenceNode(memberType) && !isKeywordTypeNode(memberType, ts) && !ts.isLiteralTypeNode(memberType) && !ts.isArrayTypeNode(memberType)) {
      return;
    }
    return {
      memberName,
      type: memberType,
      optional: !!member.questionToken
    };
  }
  const typeNotNull = memberType.types.filter(
    (type2) => type2.kind !== ts.SyntaxKind.UndefinedKeyword && !(ts.isLiteralTypeNode(type2) && type2.literal.kind === ts.SyntaxKind.NullKeyword)
  );
  if (typeNotNull.length !== 1) {
    return;
  }
  const type = typeNotNull[0];
  if (!ts.isTypeReferenceNode(type) && !isKeywordTypeNode(type, ts) && !ts.isLiteralTypeNode(type)) {
    return;
  }
  return {
    memberName,
    type,
    optional: true
  };
}
function indent(level = 1, INDENT = 2) {
  return " ".repeat(INDENT * level);
}
function indentMultiLine(code, level) {
  return code.split("\n").map((line) => indent(level) + line).join("\n");
}

const TYPE_ARRAY_STRING = "ARRAY_STRING";

const identGenerator = new IdentGenerator(2e3);
function formatTypeNode(type, ts) {
  if (ts.isTypeReferenceNode(type)) {
    if (ts.isIdentifier(type.typeName)) {
      switch (getIdentifierText(type.typeName)) {
        case "UniSharedDataAny":
          return "UniSharedDataAny";
        case "UniSharedDataArray":
          return "UniSharedDataArray";
        case "UniSharedDataJSONObject":
          return "UniSharedDataJSONObject";
        case "UniSharedDataVFor":
          return "UniSharedDataVFor";
        case "UniSharedDataFunctionEventListener":
          return "UniSharedDataFunctionEventListener";
        case "UniSharedDataFunctionSetTemplateRef":
          return "UniSharedDataFunctionSetTemplateRef";
        case "Array":
          if (type.typeArguments && type.typeArguments.length === 1 && isKeywordTypeNode(type.typeArguments[0], ts) && type.typeArguments[0].kind === ts.SyntaxKind.StringKeyword) {
            return TYPE_ARRAY_STRING;
          }
        default:
          return "UniSharedData|" + getIdentifierText(type.typeName);
      }
    }
  }
  if (isKeywordTypeNode(type, ts)) {
    switch (type.kind) {
      case ts.SyntaxKind.StringKeyword:
        return "string";
      case ts.SyntaxKind.BooleanKeyword:
        return "bool";
      case ts.SyntaxKind.NumberKeyword:
        return "double";
      case ts.SyntaxKind.UndefinedKeyword:
        return "null";
    }
  }
  if (ts.isArrayTypeNode(type) && isKeywordTypeNode(type.elementType, ts) && type.elementType.kind === ts.SyntaxKind.StringKeyword) {
    return TYPE_ARRAY_STRING;
  }
  if (ts.isLiteralTypeNode(type)) {
    if (type.literal.kind === ts.SyntaxKind.NullKeyword) {
      return "null";
    }
  }
}
function generateCppSharedDataClass(decl, options) {
  const ts = options.ts;
  const nameNode = decl.name;
  const EMPTY_RESULT = {
    files: []
  };
  if (!nameNode) {
    return EMPTY_RESULT;
  }
  const className = getClassName(decl);
  if (!className) {
    return EMPTY_RESULT;
  }
  const superClassName = getSuperClassName(decl, ts);
  if (!superClassName) {
    return EMPTY_RESULT;
  }
  const isPage = superClassName === "UniSharedDataPage";
  const isComponent = superClassName === "UniSharedDataComponent";
  const defineMacroH = isPage ? "DEFINE_USER_PAGE_SHARED_DATA" : isComponent ? "DEFINE_USER_COMPONENT_SHARED_DATA" : "DEFINE_USER_SHARED_DATA";
  const defineMacroHMember = defineMacroH + "_MEMBER";
  const defineMacroHMemberFlag = "DEFINE_SHARED_DATA_MEMBER_FLAG";
  const defineMacroCpp = defineMacroH + "_CPP";
  const defineMacroCppInit = defineMacroCpp + "_INIT";
  const defineMacroCppInitMember = defineMacroCppInit + "_MEMBER";
  const defineMacroCppMember = defineMacroCpp + "_MEMBER_SETTER";
  const members = decl.members;
  let codeHDecl = "";
  let codeHMember = "";
  let codeHFlag = "";
  let codeH = `${defineMacroH}(${className},
`;
  let codeCpp = `${defineMacroCpp}(${className},
`;
  let codeCppInit = indent(1) + `${defineMacroCppInit}(${className},
`;
  let codeCppMembers = ``;
  let flags = /* @__PURE__ */ new Set();
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    const memberTypeInfo = parseClassMemberType(member, ts);
    if (!memberTypeInfo) {
      continue;
    }
    const optional = memberTypeInfo.optional;
    const memberName = memberTypeInfo.memberName;
    const memberTypeNode = memberTypeInfo.type;
    const memberType = formatTypeNode(memberTypeNode, ts);
    const { index: groupIndex, bitValue: memberBitValue } = identGenerator.getGroupInfo(memberName);
    const memberFlag = "_flag" + groupIndex;
    flags.add(memberFlag);
    if (!memberType) {
      continue;
    }
    let [memberSetterType, memberRealType] = memberType.split("|");
    let _defineMacroHMember = `${defineMacroHMember}_${memberSetterType.toUpperCase()}`;
    let _defineMacroCppMember = `${defineMacroCppMember}_${memberSetterType.toUpperCase()}`;
    if ((optional || memberSetterType === "UniSharedDataAny") && memberSetterType !== "null") {
      _defineMacroHMember += `_OR_NULL`;
      _defineMacroCppMember += `_OR_NULL`;
    }
    codeHMember += indent(1) + `${_defineMacroHMember}(${memberName}`;
    codeCppInit += indent(2) + `${defineMacroCppInitMember}(${memberName})
`;
    codeCppMembers += indent(1) + `${_defineMacroCppMember}(${className}, ${memberName}`;
    if (memberRealType) {
      codeHMember += `, ${memberRealType}`;
      codeCppMembers += `, ${memberRealType}`;
      codeHDecl += `class ${memberRealType};
`;
    }
    codeHMember += `)
`;
    codeCppMembers += `, ${memberFlag}, ${memberBitValue})
`;
  }
  codeHFlag = Array.from(flags).map((flag) => indent(1) + `${defineMacroHMemberFlag}(${flag})
`).join("") + "\n";
  codeCppInit += indent(1) + `)
`;
  codeH += codeHFlag + codeHMember + `)`;
  if (codeHDecl) {
    codeH = codeHDecl + codeH;
  }
  codeCpp += codeCppInit + codeCppMembers + `)`;
  if (isPage || isComponent) {
    codeCpp = `namespace {
${indentMultiLine(`inline ${options.renderElementCode}`, 1)}
${indentMultiLine(`inline ${options.renderNativeViewCode}`, 1)}
}
${codeCpp}`;
  }
  return {
    files: [
      {
        code: codeH,
        name: `${className}.h`,
        class: className
      },
      {
        code: codeCpp,
        name: `${className}.cpp`,
        class: className
      }
    ],
    groupName: isComponent || isPage ? className : void 0
  };
}

function genSharedDataClass(decl, options) {
  if (options.targetLanguage === "cpp") {
    return generateCppSharedDataClass(decl, options);
  }
  return {
    files: []
  };
}
function genSharedData(decls, options) {
  const sharedDataResultList = decls.map(
    (decl) => genSharedDataClass(decl, options)
  );
  const cppFile = {
    name: ".cpp",
    code: "",
    classes: []
  };
  const hFile = {
    name: ".h",
    code: "",
    classes: []
  };
  let groupName = "";
  sharedDataResultList.forEach((result) => {
    if (result.groupName) {
      groupName = result.groupName;
    }
    result.files.forEach((file) => {
      if (file.name.endsWith(".h")) {
        hFile.code += (hFile.code ? "\n\n" : "") + file.code;
        hFile.classes.push(file.class);
      } else if (file.name.endsWith(".cpp")) {
        cppFile.code += (cppFile.code ? "\n\n" : "") + file.code;
        cppFile.classes.push(file.class);
      }
    });
  });
  if (groupName) {
    hFile.name = `${groupName}.h`;
    cppFile.name = `${groupName}.cpp`;
    hFile.code = `#pragma once
#include "sdk.h"

${hFile.code}`;
    cppFile.code = `#include "${hFile.name}"

${cppFile.code}`;
  }
  return {
    files: [cppFile, hFile]
  };
}

exports.parse = compilerDom.parse;
exports.COMPONENT_TYPE = COMPONENT_TYPE;
exports.DOM2_APP_PLATFORM = DOM2_APP_PLATFORM;
exports.RENDERER_TYPE = RENDERER_TYPE;
exports.TARGET_LANGUAGE = TARGET_LANGUAGE;
exports.TARGET_PLATFORM = DOM2_APP_PLATFORM;
exports.compile = compile;
exports.genSharedData = genSharedData;
exports.genSharedDataClass = genSharedDataClass;
