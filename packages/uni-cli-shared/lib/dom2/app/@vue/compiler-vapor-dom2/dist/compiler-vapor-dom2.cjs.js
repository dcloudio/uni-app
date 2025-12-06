/**
* @vue/compiler-vapor-dom2 v3.6.0-alpha.6
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compilerDom = require('@vue/compiler-dom');
var hash_sum = require('hash-sum');
var compilerVapor = require('@vue/compiler-vapor');
var shared = require('@vue/shared');
var parser$1 = require('@babel/parser');
var estreeWalker = require('estree-walker');
var os = require('os');
var tinycolor = require('tinycolor2');
var require$$2 = require('source-map-js');
var require$$0 = require('fs');
var require$$1 = require('path');
var require$$3 = require('url');
var uniNvueStyler = require('@dcloudio/uni-nvue-styler');

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
      node._fastPathAst = parser$1.parseExpression(node.content, {
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
  if (prop.values.length > 1 && ["class", "style", "hover-class"].includes(prop.key.content)) {
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
  var _a, _b;
  if (oper.value && ((_b = (_a = context.options).isCppExpr) == null ? void 0 : _b.call(_a, oper.value.ast))) {
    return;
  }
  oper.delegate = false;
  transformSimpleExpression(oper.key, context);
  oper.sharedData = {
    ident: context.nextIdent()
  };
}
function transformSetDynamicEvents(oper, context) {
  transformSimpleExpression(oper.event, context, true);
}

function walkIdentifiers(root, onIdentifier, includeAll = false, parentStack = [], knownIds = /* @__PURE__ */ Object.create(null)) {
  const rootExp = root.type === "Program" ? root.body[0].type === "ExpressionStatement" && root.body[0].expression : root;
  estreeWalker.walk(root, {
    enter(node, parent) {
      parent && parentStack.push(parent);
      if (parent && parent.type.startsWith("TS") && !TS_NODE_TYPES.includes(parent.type)) {
        return this.skip();
      }
      if (node.type === "Identifier") {
        const isLocal = !!knownIds[node.name];
        const isRefed = isReferencedIdentifier(node, parent, parentStack);
        if (includeAll || isRefed && !isLocal) {
          onIdentifier(node, parent, parentStack, isRefed, isLocal);
        }
      } else if (node.type === "ObjectProperty" && // eslint-disable-next-line no-restricted-syntax
      (parent == null ? void 0 : parent.type) === "ObjectPattern") {
        node.inPattern = true;
      } else if (isFunctionType(node)) {
        if (node.scopeIds) {
          node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
        } else {
          walkFunctionParams(
            node,
            (id) => markScopeIdentifier(node, id, knownIds)
          );
        }
      } else if (node.type === "BlockStatement") {
        if (node.scopeIds) {
          node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
        } else {
          walkBlockDeclarations(
            node,
            (id) => markScopeIdentifier(node, id, knownIds)
          );
        }
      } else if (node.type === "SwitchStatement") {
        if (node.scopeIds) {
          node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
        } else {
          walkSwitchStatement(
            node,
            false,
            (id) => markScopeIdentifier(node, id, knownIds)
          );
        }
      } else if (node.type === "CatchClause" && node.param) {
        if (node.scopeIds) {
          node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
        } else {
          for (const id of extractIdentifiers(node.param)) {
            markScopeIdentifier(node, id, knownIds);
          }
        }
      } else if (isForStatement(node)) {
        if (node.scopeIds) {
          node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
        } else {
          walkForStatement(
            node,
            false,
            (id) => markScopeIdentifier(node, id, knownIds)
          );
        }
      }
    },
    leave(node, parent) {
      parent && parentStack.pop();
      if (node !== rootExp && node.scopeIds) {
        for (const id of node.scopeIds) {
          knownIds[id]--;
          if (knownIds[id] === 0) {
            delete knownIds[id];
          }
        }
      }
    }
  });
}
function isReferencedIdentifier(id, parent, parentStack) {
  if (!parent) {
    return true;
  }
  if (id.name === "arguments") {
    return false;
  }
  if (isReferenced(id, parent, parentStack[parentStack.length - 2])) {
    return true;
  }
  switch (parent.type) {
    case "AssignmentExpression":
    case "AssignmentPattern":
      return true;
    case "ObjectProperty":
      return parent.key !== id && isInDestructureAssignment(parent, parentStack);
    case "ArrayPattern":
      return isInDestructureAssignment(parent, parentStack);
  }
  return false;
}
function isInDestructureAssignment(parent, parentStack) {
  if (parent && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
    let i = parentStack.length;
    while (i--) {
      const p = parentStack[i];
      if (p.type === "AssignmentExpression") {
        return true;
      } else if (p.type !== "ObjectProperty" && !p.type.endsWith("Pattern")) {
        break;
      }
    }
  }
  return false;
}
function walkFunctionParams(node, onIdent) {
  for (const p of node.params) {
    for (const id of extractIdentifiers(p)) {
      onIdent(id);
    }
  }
}
function walkBlockDeclarations(block, onIdent) {
  const body = block.type === "SwitchCase" ? block.consequent : block.body;
  for (const stmt of body) {
    if (stmt.type === "VariableDeclaration") {
      if (stmt.declare) continue;
      for (const decl of stmt.declarations) {
        for (const id of extractIdentifiers(decl.id)) {
          onIdent(id);
        }
      }
    } else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
      if (stmt.declare || !stmt.id) continue;
      onIdent(stmt.id);
    } else if (isForStatement(stmt)) {
      walkForStatement(stmt, true, onIdent);
    } else if (stmt.type === "SwitchStatement") {
      walkSwitchStatement(stmt, true, onIdent);
    }
  }
}
function isForStatement(stmt) {
  return stmt.type === "ForOfStatement" || stmt.type === "ForInStatement" || stmt.type === "ForStatement";
}
function walkForStatement(stmt, isVar, onIdent) {
  const variable = stmt.type === "ForStatement" ? stmt.init : stmt.left;
  if (variable && variable.type === "VariableDeclaration" && (variable.kind === "var" ? isVar : !isVar)) {
    for (const decl of variable.declarations) {
      for (const id of extractIdentifiers(decl.id)) {
        onIdent(id);
      }
    }
  }
}
function walkSwitchStatement(stmt, isVar, onIdent) {
  for (const cs of stmt.cases) {
    for (const stmt2 of cs.consequent) {
      if (stmt2.type === "VariableDeclaration" && (stmt2.kind === "var" ? isVar : !isVar)) {
        for (const decl of stmt2.declarations) {
          for (const id of extractIdentifiers(decl.id)) {
            onIdent(id);
          }
        }
      }
    }
    walkBlockDeclarations(cs, onIdent);
  }
}
function extractIdentifiers(param, nodes = []) {
  switch (param.type) {
    case "Identifier":
      nodes.push(param);
      break;
    case "MemberExpression":
      let object = param;
      while (object.type === "MemberExpression") {
        object = object.object;
      }
      nodes.push(object);
      break;
    case "ObjectPattern":
      for (const prop of param.properties) {
        if (prop.type === "RestElement") {
          extractIdentifiers(prop.argument, nodes);
        } else {
          extractIdentifiers(prop.value, nodes);
        }
      }
      break;
    case "ArrayPattern":
      param.elements.forEach((element) => {
        if (element) extractIdentifiers(element, nodes);
      });
      break;
    case "RestElement":
      extractIdentifiers(param.argument, nodes);
      break;
    case "AssignmentPattern":
      extractIdentifiers(param.left, nodes);
      break;
  }
  return nodes;
}
function markKnownIds(name, knownIds) {
  if (name in knownIds) {
    knownIds[name]++;
  } else {
    knownIds[name] = 1;
  }
}
function markScopeIdentifier(node, child, knownIds) {
  const { name } = child;
  if (node.scopeIds && node.scopeIds.has(name)) {
    return;
  }
  markKnownIds(name, knownIds);
  (node.scopeIds || (node.scopeIds = /* @__PURE__ */ new Set())).add(name);
}
const isFunctionType = (node) => {
  return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
};
function isReferenced(node, parent, grandparent) {
  switch (parent.type) {
    // yes: PARENT[NODE]
    // yes: NODE.child
    // no: parent.NODE
    case "MemberExpression":
    case "OptionalMemberExpression":
      if (parent.property === node) {
        return !!parent.computed;
      }
      return parent.object === node;
    case "JSXMemberExpression":
      return parent.object === node;
    // no: let NODE = init;
    // yes: let id = NODE;
    case "VariableDeclarator":
      return parent.init === node;
    // yes: () => NODE
    // no: (NODE) => {}
    case "ArrowFunctionExpression":
      return parent.body === node;
    // no: class { #NODE; }
    // no: class { get #NODE() {} }
    // no: class { #NODE() {} }
    // no: class { fn() { return this.#NODE; } }
    case "PrivateName":
      return false;
    // no: class { NODE() {} }
    // yes: class { [NODE]() {} }
    // no: class { foo(NODE) {} }
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "ObjectMethod":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return false;
    // yes: { [NODE]: "" }
    // no: { NODE: "" }
    // depends: { NODE }
    // depends: { key: NODE }
    case "ObjectProperty":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return !grandparent || grandparent.type !== "ObjectPattern";
    // no: class { NODE = value; }
    // yes: class { [NODE] = value; }
    // yes: class { key = NODE; }
    case "ClassProperty":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return true;
    case "ClassPrivateProperty":
      return parent.key !== node;
    // no: class NODE {}
    // yes: class Foo extends NODE {}
    case "ClassDeclaration":
    case "ClassExpression":
      return parent.superClass === node;
    // yes: left = NODE;
    // no: NODE = right;
    case "AssignmentExpression":
      return parent.right === node;
    // no: [NODE = foo] = [];
    // yes: [foo = NODE] = [];
    case "AssignmentPattern":
      return parent.right === node;
    // no: NODE: for (;;) {}
    case "LabeledStatement":
      return false;
    // no: try {} catch (NODE) {}
    case "CatchClause":
      return false;
    // no: function foo(...NODE) {}
    case "RestElement":
      return false;
    case "BreakStatement":
    case "ContinueStatement":
      return false;
    // no: function NODE() {}
    // no: function foo(NODE) {}
    case "FunctionDeclaration":
    case "FunctionExpression":
      return false;
    // no: export NODE from "foo";
    // no: export * as NODE from "foo";
    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      return false;
    // no: export { foo as NODE };
    // yes: export { NODE as foo };
    // no: export { NODE as foo } from "foo";
    case "ExportSpecifier":
      if (grandparent == null ? void 0 : grandparent.source) {
        return false;
      }
      return parent.local === node;
    // no: import NODE from "foo";
    // no: import * as NODE from "foo";
    // no: import { NODE as foo } from "foo";
    // no: import { foo as NODE } from "foo";
    // no: import NODE from "bar";
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
      return false;
    // no: import "foo" assert { NODE: "json" }
    case "ImportAttribute":
      return false;
    // no: <div NODE="foo" />
    case "JSXAttribute":
      return false;
    // no: [NODE] = [];
    // no: ({ NODE }) = [];
    case "ObjectPattern":
    case "ArrayPattern":
      return false;
    // no: new.NODE
    // no: NODE.target
    case "MetaProperty":
      return false;
    // yes: type X = { someProperty: NODE }
    // no: type X = { NODE: OtherType }
    case "ObjectTypeProperty":
      return parent.key !== node;
    // yes: enum X { Foo = NODE }
    // no: enum X { NODE }
    case "TSEnumMember":
      return parent.id !== node;
    // yes: { [NODE]: value }
    // no: { NODE: value }
    case "TSPropertySignature":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return true;
  }
  return true;
}
const TS_NODE_TYPES = [
  "TSAsExpression",
  // foo as number
  "TSTypeAssertion",
  // (<number>foo)
  "TSNonNullExpression",
  // foo!
  "TSInstantiationExpression",
  // foo<string>
  "TSSatisfiesExpression"
  // foo satisfies T
];

function transformFor(oper, context) {
  if (isStaticFor(oper)) {
    return;
  }
  transformSimpleExpression(oper.source, context, true);
  const exitIdent = context.enterIdent();
  if (oper.keyProp) {
    transformSimpleExpression(oper.keyProp, context, true);
  }
  if (oper.typeProp) {
    transformSimpleExpression(oper.typeProp, context, true);
  }
  transformBlockContent(oper.render, context);
  exitIdent();
}
function isStaticFor(oper, ids = /* @__PURE__ */ new Set()) {
  if (!oper.once) {
    return false;
  }
  if (oper.component) {
    return false;
  }
  if (!oper.source.ast) {
    return false;
  }
  const type = oper.source.ast.type;
  if (type !== "NumericLiteral" && type !== "StringLiteral") {
    return false;
  }
  const { value, key, keyProp, index, render } = oper;
  const curIds = [];
  if (value) {
    curIds.push(value.content);
    ids.add(value.content);
  }
  if (key) {
    curIds.push(key.content);
    ids.add(key.content);
  }
  if (index) {
    curIds.push(index.content);
    ids.add(index.content);
  }
  function reset() {
    curIds.forEach((id) => ids.delete(id));
    curIds.length = 0;
  }
  if (keyProp) {
    if (isComplexExpression(keyProp)) {
      reset();
      return false;
    }
    const { seenIdentifier } = compilerVapor.analyzeExpressions([keyProp]);
    if (!Array.from(seenIdentifier).every((id) => ids.has(id))) {
      reset();
      return false;
    }
  }
  if (!isStaticBlock(render, ids)) {
    reset();
    return false;
  }
  return true;
}
function isStaticBlock(block, ids) {
  for (const oper of block.operation) {
    if (!isStaticOperation(oper, ids)) {
      return false;
    }
  }
  for (const effect of block.effect) {
    for (const oper of effect.operations) {
      if (!isStaticOperation(oper, ids)) {
        return false;
      }
    }
  }
  if (block.dynamic) {
    if (!isStaticDynamic(block.dynamic, ids)) {
      return false;
    }
  }
  return true;
}
function isStaticDynamic(dynamic, ids) {
  if (dynamic.operation) {
    if (!isStaticOperation(dynamic.operation, ids)) {
      return false;
    }
  }
  for (const child of dynamic.children) {
    if (!isStaticDynamic(child, ids)) {
      return false;
    }
  }
  return true;
}
function isStaticOperation(oper, ids) {
  switch (oper.type) {
    case 2:
    case 3:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 18:
    case 19:
      return false;
    case 17:
      return true;
    case 4:
      if (isStaticExpressions(oper.values, ids)) {
        return true;
      }
      return false;
    case 16:
      return isStaticFor(oper, ids);
    default:
      const exhaustiveCheck = oper;
      throw new Error(
        `Unhandled operation type in genOperation: ${exhaustiveCheck}`
      );
  }
}
function isStaticExpressions(exprs, ids) {
  for (const expr of exprs) {
    if (isComplexExpression(expr)) {
      return false;
    }
  }
  const { seenIdentifier } = compilerVapor.analyzeExpressions(exprs);
  return Array.from(seenIdentifier).every((id) => ids.has(id));
}
function isComplexExpression(expr) {
  if (expr.ast) {
    let hasComplexExpr = false;
    walkIdentifiers(expr.ast, (_, parent) => {
      if (parent && parent.type !== "BinaryExpression") {
        hasComplexExpr = true;
      }
    });
    return hasComplexExpr;
  }
  return false;
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
  var _a, _b;
  if (node.tagType === 0) {
    if ((_b = (_a = context.options).isCppExpr) == null ? void 0 : _b.call(_a, value.ast)) {
      return;
    }
    context.ir.hasTemplateRef = true;
    transformSimpleExpression(value, context, true);
  } else {
    context.ir.hasTemplateRef = true;
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
        transformSimpleExpression(slot.loop.source, context, true);
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
  transformSimpleExpression(slot.positive.name, context);
  transformBlock(slot.positive.fn, context);
  if (slot.negative) {
    if (slot.negative.slotType === 3) {
      transformSlotDynamicConditional(slot.negative, context);
    } else {
      transformSimpleExpression(slot.negative.name, context);
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
    case 18:
      return;
    case 19:
      return;
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
  for (const { operations } of effects) {
    for (const oper of operations) {
      if (oper.type === 19) {
        const setPropOper = findSetPropOper(oper.prop.key.content.slice(7));
        if (setPropOper) {
          oper.prop.values[0].sharedData = setPropOper.prop.values[0].sharedData;
        }
      }
    }
  }
  function findSetPropOper(name) {
    for (const effect of effects) {
      for (const oper of effect.operations) {
        if (oper.type === 2 && oper.prop.key.content === name) {
          return oper;
        }
      }
    }
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
    this.isInVFor = false;
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
    const node = block.node;
    let resetIsInVFor = () => {
    };
    if (!this.isInVFor) {
      this.isInVFor = node.type === 1 && node.tagType === 3 && node.props.some(
        (prop) => prop.type === 7 && prop.name === "for"
      );
      resetIsInVFor = () => this.isInVFor = false;
    }
    return () => {
      resetIsInVFor();
      return this.block = parent;
    };
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

const RENDERER_TYPE = {
  "ELEMENT": "element",
  "NATIVE_VIEW": "nativeView"
};
const DOM2_APP_PLATFORM = {
  "APP": "app",
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
    case "app":
      return "all";
  }
}
const DOM2_APP_TARGET = {
  "ALL": "all",
  "DOM_C": "dom-c",
  "DOM_KT": "dom-kt",
  "NV_KT": "nv-kt",
  "TXT_KT": "txt-kt",
  "DOM_OC": "dom-oc",
  "NV_C": "nv-c",
  "TXT_C": "txt-c",
  "DOM_TS": "dom-ts"
};
function isCPPTarget(target) {
  return target === "dom-c" || target === "nv-c" || target === "txt-c";
}
function isDomTarget(target) {
  return target === "dom-c" || target === "dom-kt" || target === "dom-oc" || target === "dom-ts";
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
    this.r = (name) => {
      return name;
    };
    this.vForCount = 0;
    this.vForStack = [];
    this.vForDepth = 0;
  }
  enterVFor() {
    const id = this.vForCount++;
    this.vForStack.push(id);
    return id;
  }
  exitVFor() {
    this.vForStack.pop();
  }
  enterBlock(block) {
    const parent = this.block;
    this.block = block;
    const node = this.block.node;
    const inVFor = node.type === 1 && node.tagType === 3 && node.props.some(
      (prop) => prop.type === 7 && prop.name === "for"
    );
    if (inVFor) {
      this.vForDepth++;
    }
    return () => {
      if (inVFor) {
        this.vForDepth--;
      }
      return this.block = parent;
    };
  }
  get sharedDataVar() {
    return this.vForDepth > 0 ? this.sharedDataVForVar : this.r("__sharedData");
  }
  get sharedDataVForVar() {
    const currentVForId = this.vForStack[this.vForStack.length - 1];
    return `${this.r("__sharedData_VFor")}${currentVForId}`;
  }
  get sharedDataVForItemVar() {
    const currentVForId = this.vForStack[this.vForStack.length - 1];
    return `${this.r("__vForItem")}${currentVForId}`;
  }
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
    ids.sort((a, b) => a.start - b.start).forEach((id, i) => {
      const start = id.start - 1;
      const end = id.end - 1;
      const last = ids[i - 1];
      const leadingText = content.slice(last ? last.end - 1 : 0, start);
      if (leadingText.length) push([leadingText, -3]);
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
      if (i === ids.length - 1 && end < content.length) {
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
  } = compilerVapor.analyzeExpressions(expressions);
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
    exp.ast = parseExp$1(context, exp.content, exp.loc);
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
  if (vars.every((v) => v.every((e, idx) => e === first[idx]))) {
    return false;
  }
  return true;
}
function processRepeatedExpressions$1(context, expressions, varDeclarations, updatedVariable, expToVariableMap) {
  const declarations = [];
  const seenExp = expressions.reduce(
    (acc, exp) => {
      const vars = expToVariableMap.get(exp);
      if (!vars) return acc;
      const variables = vars.map((v) => v.name);
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
          if (value.ast) value.ast = parseExp$1(context, value.content, value.loc);
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
          exp.ast = parseExp$1(context, exp.content, exp.loc);
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
function parseExp$1(context, content, loc) {
  const plugins = context.options.expressionPlugins;
  const options = {
    plugins: plugins ? [...plugins, "typescript"] : ["typescript"]
  };
  try {
    return parser$1.parseExpression(`(${content})`, options);
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
function genVarName$1(exp) {
  return `${exp.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_").replace(/_+$/, "")}`;
}
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
  var _a, _b;
  const { key, keyOverride, value, modifiers, sharedData } = oper;
  if (value && ((_b = (_a = context.options).isCppExpr) == null ? void 0 : _b.call(_a, value.ast))) {
    return [];
  }
  const handler = genEventHandler(context, [value], modifiers);
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
function genEventHandler(context, values, modifiers = { nonKeys: [], keys: [] }, extraWrap = false) {
  let handlerExp = [];
  if (values) {
    values.forEach((value, index) => {
      let exp = [];
      if (value && value.content.trim()) {
        if (compilerDom.isMemberExpression(value, context.options)) {
          exp = genExpression$1(value, context);
          if (!isConstantBinding(value, context) && !extraWrap) {
            const isTSNode = value.ast && compilerDom.TS_NODE_TYPES.includes(value.ast.type);
            exp = [
              `(e: any) => `,
              isTSNode ? "(" : "",
              ...exp,
              isTSNode ? ")" : "",
              `(e)`
            ];
          }
        } else if (compilerDom.isFnExpression(value, context.options)) {
          exp = genExpression$1(value, context);
        } else {
          const referencesEvent = value.content.includes("$event");
          const hasMultipleStatements = value.content.includes(`;`);
          const expr = referencesEvent ? context.withId(() => genExpression$1(value, context), {
            $event: null
          }) : genExpression$1(value, context);
          exp = [
            referencesEvent ? "($event: any) => " : "() => ",
            hasMultipleStatements ? "{" : "(",
            ...expr,
            hasMultipleStatements ? "}" : ")"
          ];
        }
        handlerExp = handlerExp.concat([index !== 0 ? ", " : "", ...exp]);
      }
    });
    if (values.length > 1) {
      handlerExp = ["[", ...handlerExp, "]"];
    }
  }
  if (handlerExp.length === 0) handlerExp = ["() => {}"];
  if (extraWrap) handlerExp.unshift(`() => `);
  return handlerExp;
}
function isConstantBinding(value, context) {
  if (value.ast === null) {
    const bindingType = context.options.bindingMetadata[value.content];
    if (bindingType === "setup-const") {
      return true;
    }
  }
}

const isWindows = os.platform() === "win32";
function normalizePath(id) {
  return isWindows ? id.replace(/\\/g, "/") : id;
}
function isVForListItem(node) {
  const isTemplateNode = node.type === 1 && node.tag === "template";
  if (!isTemplateNode) {
    return false;
  }
  const _node = node;
  const isListItem = _node.children.length === 1 && _node.children[0].type === 1 && (_node.children[0].tag === "list-item" || _node.children[0].tag === "ListItem");
  if (!isListItem) {
    return false;
  }
  return true;
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
    typeProp,
    once,
    id,
    component,
    onlyChild
  } = oper;
  if (!source.sharedData) {
    return [];
  }
  const isListItem = isVForListItem(oper.node);
  const preSharedDataVar = context.sharedDataVar;
  const rawValue = value && value.content;
  const rawKey = key && key.content;
  const rawIndex = index && index.content;
  const sourceExpr = ["() => (", ...genExpression$1(source, context), ")"];
  const idToPathMap = compilerVapor.parseValueDestructure(value, context);
  const vForCount = context.enterVFor();
  const [_, exitScope] = context.enterScope();
  const itemVar = `_for_item${vForCount}`;
  const idMap = compilerVapor.buildDestructureIdMap(
    idToPathMap,
    `${itemVar}.value`,
    context.options.expressionPlugins
  );
  idMap[itemVar] = null;
  const args = [context.sharedDataVForVar, ", ", itemVar];
  if (rawKey) {
    const keyVar = `_for_key${vForCount}`;
    args.push(`, ${keyVar}`);
    idMap[rawKey] = `${keyVar}.value`;
    idMap[keyVar] = null;
  }
  if (rawIndex) {
    const indexVar = `_for_index${vForCount}`;
    args.push(`, ${indexVar}`);
    idMap[rawIndex] = `${indexVar}.value`;
    idMap[indexVar] = null;
  }
  const newSharedDataVForFrag = compilerVapor.genCall(
    helper("setSharedData"),
    preSharedDataVar,
    JSON.stringify(source.sharedData.ident),
    genSharedDataVFor(context, vForCount)
  );
  const getKeyFrag = genCallback(keyProp, context, context.sharedDataVForVar);
  const getKeyWithoutSharedDataFrag = genCallbackWithoutSharedData(
    keyProp,
    context
  );
  const getTypeFrag = isListItem && typeProp ? genCallback(typeProp, context, context.sharedDataVForVar) : genDefaultTypeCallback(context.sharedDataVForVar);
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
  context.exitVFor();
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
  if (!isListItem) {
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
  }
  return [
    compilerVapor.NEWLINE,
    ...selectorDeclarations,
    ...compilerVapor.genCall(
      [helper("createSharedDataRecycleFor"), "undefined"],
      newSharedDataVForFrag,
      compilerVapor.genCall(
        [helper("preCreateSharedDataRecycleFor"), "undefined"],
        sourceExpr,
        getKeyWithoutSharedDataFrag
      ),
      blockFn,
      getKeyFrag,
      getTypeFrag,
      flags ? String(flags) : void 0,
      selectorSetup.length ? selectorSetup : void 0
    )
  ];
  function genCallbackWithoutSharedData(expr, context2) {
    if (!expr) return false;
    const res = context2.withId(
      () => genExpression$1(expr, context2),
      genSimpleIdMap()
    );
    return [
      ...compilerVapor.genMulti(
        ["(", ")", ", "],
        rawValue ? rawValue : rawKey || rawIndex ? "_" : void 0,
        rawKey ? rawKey : rawIndex ? "__" : void 0,
        rawIndex
      ),
      " => {",
      "return ",
      ...res,
      "}"
    ];
  }
  function genCallback(expr, context2, sharedDataVForVar) {
    if (!expr) return false;
    const res = context2.withId(
      () => compilerVapor.genCall(
        context2.helper("setSharedData"),
        sharedDataVForVar,
        JSON.stringify(expr.sharedData.ident),
        compilerVapor.genCall(
          context2.helper("toDisplayString"),
          genExpression$1(expr, context2)
        )
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
  function genDefaultTypeCallback(sharedDataVForVar) {
    return [
      ...compilerVapor.genMulti(
        ["(", ")", ", "],
        sharedDataVForVar,
        rawValue ? rawValue : rawKey || rawIndex ? "_" : void 0,
        rawKey ? rawKey : rawIndex ? "__" : void 0,
        rawIndex
      ),
      ' => "0"'
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
      const selector = matchSelectorPattern(effect, keyProp.content, idMap);
      if (selector) {
        selectorPatterns.push(selector);
        effect.generated = true;
      }
      const keyOnly = matchKeyOnlyBindingPattern(effect, keyProp.content);
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
function matchKeyOnlyBindingPattern(effect, key) {
  if (effect.expressions.length === 1) {
    const { ast, content } = effect.expressions[0];
    if (typeof ast === "object" && ast !== null) {
      if (isKeyOnlyBinding(ast, key, content)) {
        return { effect };
      }
    }
  }
}
function matchSelectorPattern(effect, key, idMap) {
  if (effect.expressions.length === 1) {
    const { ast, content } = effect.expressions[0];
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
              const aIsKey = isKeyOnlyBinding(a, key, content);
              const bIsKey = isKeyOnlyBinding(b, key, content);
              const bVars = analyzeVariableScopes(b, idMap);
              if (aIsKey && !bIsKey && !bVars.length) {
                matcheds.push([a, b]);
              }
            }
          }
        }
      });
      if (matcheds.length === 1) {
        const [key2, selector] = matcheds[0];
        const content2 = effect.expressions[0].content;
        let hasExtraId = false;
        compilerDom.walkIdentifiers(
          ast,
          (id) => {
            if (id.start !== key2.start && id.start !== selector.start) {
              hasExtraId = true;
            }
          },
          false
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
  }
}
function analyzeVariableScopes(ast, idMap) {
  let locals = [];
  const ids = [];
  compilerDom.walkIdentifiers(
    ast,
    (id) => {
      ids.push(id);
    },
    false
  );
  for (const id of ids) {
    if (shared.isGloballyAllowed(id.name)) {
      continue;
    }
    if (idMap[id.name]) {
      locals.push(id.name);
    }
  }
  return locals;
}
function isKeyOnlyBinding(expr, key, source) {
  let only = true;
  estreeWalker.walk(expr, {
    enter(node) {
      if (source.slice(node.start - 1, node.end - 1) === key) {
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
function genSharedDataVFor(context, vForCount) {
  return `${context.helper("createSharedDataVFor")}(${context.sharedDataScopeVar}, () => useSharedData<\`${context.sharedDataVForClassType(vForCount)}\`>(${context.sharedDataScopeVar}))`;
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
    tag,
    isChangeProp
  } = oper;
  const resolvedHelper = getRuntimeHelper(tag, key.content, modifier);
  const propertyType = context.getPropertyType(tag, key.content);
  const [frag, push] = compilerVapor.buildCodeFragment();
  if (sharedData) {
    push(
      compilerVapor.NEWLINE,
      ...compilerVapor.genCall(
        context.helper(
          getSetSharedDataHelper(
            resolvedHelper.name,
            isChangeProp
          )
        ),
        context.sharedDataVar,
        JSON.stringify(sharedData.ident),
        genCastPropValue(
          propertyType,
          tag,
          key.content,
          genPropValue$1(values, context),
          context
        )
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
          getSetSharedDataHelper(
            resolvedHelper.name,
            isChangeProp
          )
        ),
        context.sharedDataVar,
        JSON.stringify(value.sharedData.ident),
        genCastPropValue(
          propertyType,
          tag,
          key.content,
          genPropValue$1([value], context),
          context
        )
      )
    );
  });
  return frag;
}
function genCastPropValue(type, tagName, name, value, context) {
  if (type) {
    switch (type) {
      case "string":
      case "number":
      case "boolean":
      case "color":
        return compilerVapor.genCall(
          context.helper(`toSharedData${shared.capitalize(type)}`),
          value
        );
      case "enum":
        return genEnumPropValue$1(tagName, name, value, context);
    }
  }
  return value;
}
function genEnumPropValue$1(tagName, name, value, context) {
  return compilerVapor.genCall(
    context.helper(
      // @ts-expect-error
      `toSharedData${shared.capitalize(shared.camelize(tagName))}${shared.capitalize(shared.camelize(name))}`
    ),
    value
  );
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
  const handlerModifierPostfix = handlerModifiers && handlerModifiers.options ? handlerModifiers.options.map(shared.capitalize).join("") : "";
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
    key.push(' || ""');
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
  } else if (keyName === "class" || keyName === "hover-class" && tagName === "VIEW") {
    return helpers.setClass;
  } else if (keyName === "style") {
    return helpers.setStyle;
  } else if (keyName === "innerHTML") {
    return helpers.setHtml;
  } else if (keyName === "textContent") {
    return helpers.setText;
  }
}
function getSetSharedDataHelper(name, isChangeProp) {
  if (isChangeProp) {
    return "setSharedData";
  }
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
  if (context.options.isCppExpr(oper.value.ast)) {
    return [];
  }
  const [refValue, refKey] = genRefValue(oper.value, context);
  let setTemplateRefCode = compilerVapor.genCall(
    setTemplateRefIdent,
    // will be generated in root scope
    `n${oper.element}`,
    refValue,
    oper.effect ? `r${oper.element}` : oper.refFor ? "null" : void 0,
    oper.refFor && "true",
    refKey
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
function genDeclareOldRef$1(oper, context) {
  if (context.options.isCppExpr(oper.value.ast)) {
    return [];
  }
  return [compilerVapor.NEWLINE, `let r${oper.id}: any | null`];
}
function genRefValue(value, context) {
  if (value && context.options.inline) {
    const binding = context.options.bindingMetadata[value.content];
    if (binding === "setup-let" || binding === "setup-ref" || binding === "setup-maybe-ref") {
      return [[value.content], JSON.stringify(value.content)];
    }
  }
  return [genExpression$1(value, context)];
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
function genDirectivesForElement$1(id, context) {
  const dirs = filterCustomDirectives$1(id, context.block.operation);
  return dirs.length ? genCustomDirectives$1(dirs, context) : [];
}
function genCustomDirectives$1(opers, context) {
  const { helper } = context;
  const element = `n${opers[0].element}`;
  const directiveItems = opers.map(genDirectiveItem);
  const directives = compilerVapor.genMulti(compilerVapor.DELIMITERS_ARRAY, ...directiveItems);
  return [
    compilerVapor.NEWLINE,
    ...compilerVapor.genCall(helper("withVaporDirectives"), element, directives)
  ];
  function genDirectiveItem({
    dir,
    name,
    asset
  }) {
    const directiveVar = asset ? compilerDom.toValidAssetId(name, "directive") : genExpression$1(
      shared.extend(compilerDom.createSimpleExpression(name, false), { ast: null }),
      context
    );
    const value = dir.exp && ["() => ", ...genExpression$1(dir.exp, context)];
    const argument = dir.arg && genExpression$1(dir.arg, context);
    const modifiers = !!dir.modifiers.length && [
      "{ ",
      genDirectiveModifiers$1(dir.modifiers.map((m) => m.content)),
      " }"
    ];
    return compilerVapor.genMulti(
      compilerVapor.DELIMITERS_ARRAY.concat("null"),
      directiveVar,
      value,
      argument,
      modifiers
    );
  }
}
function genDirectiveModifiers$1(modifiers) {
  return modifiers.map(
    (value) => `${compilerDom.isSimpleIdentifier(value) ? value : JSON.stringify(value)}: true`
  ).join(", ");
}
function filterCustomDirectives$1(id, operations) {
  return operations.filter(
    (oper) => oper.type === 13 && oper.element === id && !oper.builtin
  );
}

function genCreateComponent$1(operation, context) {
  const { helper } = context;
  const tag = genTag();
  const { root, props, slots, sharedData } = operation;
  const rawSlots = genRawSlots$1(slots, context);
  const [ids, handlers] = processInlineHandlers(props, context);
  const rawProps = context.withId(() => genRawProps(props, context), ids);
  const inlineHandlers = handlers.reduce(
    (acc, { name, value }) => {
      const handler = genEventHandler(context, [value], void 0, false);
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
      const { tag: tag2 } = operation;
      const builtInTag = compilerVapor.isBuiltInComponent(tag2);
      if (builtInTag) {
        helper(builtInTag);
        return `_${builtInTag}`;
      }
      return genExpression$1(
        shared.extend(compilerDom.createSimpleExpression(tag2, false), { ast: null }),
        context
      );
    }
  }
}
function getUniqueHandlerName(context, name) {
  const { seenInlineHandlerNames } = context;
  name = genVarName$1(name);
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
          const name = getUniqueHandlerName(
            context,
            `_on_${prop.key.content.replace(/-/g, "_")}`
          );
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
    args.push([`'$': `, ...dynamicProps]);
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
    ...prop.handler ? genEventHandler(
      context,
      prop.values,
      prop.handlerModifiers,
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
  const modifiersKey = key.isStatic ? [shared.getModifierPropName(key.content)] : ["[", ...genExpression$1(key, context), ' + "Modifiers"]'];
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
    args.push([`'$': `, ...genDynamicSlots$1(dynamicSlots, context)]);
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
  const vForCount = context.enterVFor();
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
        const result2 = genSharedDataExpression(
          name,
          context,
          context.helper("toDisplayString")
        );
        resetBlock();
        return result2;
      }, idMap)
    ],
    [
      "fn: ",
      ...context.withId(() => genSlotBlockWithProps$1(fn, context), idMap)
    ]
  );
  const result = [
    ...compilerVapor.genCall(
      context.helper("createSharedDataForSlots"),
      compilerVapor.genCall(
        context.helper("setSharedData"),
        context.sharedDataVar,
        JSON.stringify(source.sharedData.ident),
        genSharedDataVFor(context, vForCount)
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
  context.exitVFor();
  return result;
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
    ...negative ? [...genDynamicSlot$1(negative, context)] : ["null"],
    compilerVapor.INDENT_END
  ];
}
function genSlotBlockWithProps$1(oper, context) {
  let propsName;
  let exitScope;
  let depth;
  const { props, key, node } = oper;
  const idToPathMap = props ? compilerVapor.parseValueDestructure(props, context) : /* @__PURE__ */ new Map();
  if (props) {
    if (props.ast) {
      [depth, exitScope] = context.enterScope();
      propsName = `_slotProps${depth}`;
    } else {
      propsName = props.content;
    }
  }
  const idMap = idToPathMap.size ? compilerVapor.buildDestructureIdMap(
    idToPathMap,
    propsName || "",
    context.options.expressionPlugins
  ) : {};
  if (propsName) {
    idMap[propsName] = null;
  }
  let blockFn = context.withId(
    () => genBlock$1(oper, context, propsName ? [propsName] : []),
    idMap
  );
  exitScope && exitScope();
  if (key) {
    blockFn = [
      `() => {`,
      compilerVapor.INDENT_START,
      compilerVapor.NEWLINE,
      `return `,
      ...compilerVapor.genCall(
        context.helper("createKeyedFragment"),
        [`() => `, ...genExpression$1(key, context)],
        blockFn
      ),
      compilerVapor.INDENT_END,
      compilerVapor.NEWLINE,
      `}`
    ];
  }
  if (node.type === 1) {
    const onlyTextNode = isOnlyTextNode(node);
    if (compilerVapor.needsVaporCtx(oper) || onlyTextNode) {
      blockFn = [
        `${context.helper("withSharedDataVaporCtx")}(`,
        ...blockFn,
        onlyTextNode ? `, 'string'` : "",
        `)`
      ];
    }
  }
  return blockFn;
}
function isOnlyTextNode(node) {
  return node.children.every((child) => isTextLike(child));
}
function isTextLike(node) {
  return node.type === 5 || node.type === 2;
}

function genSlotOutlet$1(oper, context) {
  const { helper } = context;
  const { name, fallback, noSlotted, once } = oper;
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
      fallbackArg,
      noSlotted && "null",
      // instance
      noSlotted && "true",
      // noSlotted
      once && "true"
      // v-once
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
      return genDeclareOldRef$1(oper, context);
    case 12:
      return genSlotOutlet$1(oper, context);
    case 13:
      return genBuiltinDirective$1(oper, context);
    case 17:
      return genGetTextChild$1();
    case 18:
      return [];
    case 19:
      return [];
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
  if (effects.length && frag.length) {
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
  const { operation, hasDynamicChild } = dynamic;
  if (operation) {
    push(...genOperationWithInsertionState$1(operation, context));
  }
  if (hasDynamicChild) {
    push(...genChildren$1(dynamic, context));
  }
  return frag;
}
function genChildren$1(dynamic, context) {
  const [frag, push] = compilerVapor.buildCodeFragment();
  const { children } = dynamic;
  for (const [index, child] of children.entries()) {
    if (child.operation && child.operation.anchor === -1) ;
    if (child.flags & 2) ; else if (child.ifBranch) ;
    const id = child.flags & 1 ? child.flags & 4 ? child.anchor : child.id : void 0;
    if (id === void 0 && !child.hasDynamicChild) {
      push(...genSelf$1(child, context));
      continue;
    }
    id === void 0 ? `p${context.block.tempId++}` : `n${id}`;
    if (id === child.anchor && !child.hasDynamicChild) {
      push(...genSelf$1(child, context));
    }
    if (id !== void 0) {
      push(...genDirectivesForElement$1(id, context));
    }
    push(...genChildren$1(child, context));
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
  const { dynamic, effect, operation, key } = block;
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
    if (!child.hasDynamicChild) {
      push(...genChildren$1(child, context));
    }
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
  if (root && context.ir.hasDeferredVShow) {
    push(compilerVapor.NEWLINE, `deferredApplyVShows.forEach(fn => fn())`);
  }
  if (dynamic.needsKey) {
    for (const child of dynamic.children) {
      const keyValue = key ? genExpression$1(key, context) : JSON.stringify(child.id);
      push(compilerVapor.NEWLINE, `n${child.id}.$key = `, ...keyValue);
    }
  }
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

function isEnumType(type) {
  if (!type) {
    return false;
  }
  if (type === "string" || type === "number" || type === "boolean" || type === "UniNativeColor" || type.startsWith("Array<")) {
    return false;
  }
  return true;
}
function createValueProcessorResult$1(valueCode, setterCode) {
  return {
    valueCode,
    setterCode
  };
}
function createValueProcessorError$1(error, options) {
  return {
    error,
    valueCode: "",
    setterCode: ""
  };
}
function createPropertyProcessor$1(processor, type, options) {
  processor.type = type;
  processor.options = options;
  return processor;
}

function createSetPropEnumValueProcessor(options, genEnumCode) {
  return createPropertyProcessor$1(
    (value) => {
      const enumValue = value + "";
      if (options.values && !options.values.includes(enumValue)) {
        return createValueProcessorError$1(
          `Invalid enum value: ${enumValue}. Expected one of: ${options.values.join(", ")}`);
      }
      const enumCode = genEnumCode(
        shared.capitalize(shared.camelize(enumValue.trim().replace(" ", "-")))
      );
      if (options.property) {
        return createValueProcessorResult$1(
          enumCode,
          `${options.name} = ${enumCode}`
        );
      }
      return createValueProcessorResult$1(
        enumCode,
        `${options.name}(${enumCode})`
      );
    },
    "enum",
    options
  );
}
function createGenEnumCode$1(target, propertyType) {
  if (isCPPTarget(target)) {
    return (enumValue) => {
      return `UTSCPP.propertyAccess(${propertyType}, "::", "${shared.capitalize(
        shared.camelize(enumValue + "")
      )}")`;
    };
  }
  return (enumValue) => {
    return `${propertyType}.${shared.capitalize(shared.camelize(enumValue + ""))}`;
  };
}

const NUMBER_TYPES$1 = ["number"];
function isNumberType$1(propertyType) {
  return !!(propertyType && NUMBER_TYPES$1.includes(propertyType));
}
function createSetPropNumberValueProcessor(options) {
  return createPropertyProcessor$1(
    (value) => {
      const numValue = parseFloat(String(value));
      if (!isNaN(numValue)) {
        if (options.property) {
          return createValueProcessorResult$1(
            `${numValue}`,
            `${options.name} = ${numValue}`
          );
        }
        return createValueProcessorResult$1(
          `${numValue}`,
          `${options.name}(${numValue})`
        );
      }
      return createValueProcessorError$1(`Invalid number value: ${value}`);
    },
    "number",
    options
  );
}

const STRING_TYPES$1 = ["string"];
function isStringType$1(propertyType) {
  return !!(propertyType && STRING_TYPES$1.includes(propertyType));
}
function createSetPropStringValueProcessor(options) {
  return createPropertyProcessor$1(
    (value) => {
      if (options.property) {
        return createValueProcessorResult$1(
          `"${value}"`,
          `${options.name} = "${value}"`
        );
      }
      return createValueProcessorResult$1(
        `"${value}"`,
        `${options.name}("${value}")`
      );
    },
    "string",
    options
  );
}

var appUVueJson = {
	global: {
		description: "全局配置，所有组件都支持的内容",
		classes: {
			dom: "UniElement",
			nv: "UniNativeBaseView"
		},
		attributes: {
			id: {
				type: "string",
				description: "组件的唯一标识",
				uniPlatform: {
					app: {
						"dom-c": {
							propertyName: "id"
						}
					},
					"app-android": {
						"dom-kt": {
							propertyName: "id"
						}
					}
				}
			},
			"class": {
				type: "Array<string>",
				description: "class属性值(class name)的集合，支持vue框架实现class属性",
				uniPlatform: {
					app: {
						"dom-c": {
							propertyName: "classList"
						}
					},
					"app-android": {
						"dom-kt": {
							propertyName: "classList"
						}
					}
				}
			},
			"data-*": {
				description: "自定义数据属性，需要对属性名称做转换，运行期在runtime层统一实现；编译器支持属性名称转换的话直接操作属性",
				uniPlatform: {
					app: {
						"dom-c": {
							propertyName: "dataset",
							setter: "setAttributeDataset"
						}
					},
					"app-android": {
						"dom-kt": {
							propertyName: "dataset",
							setter: "setAttributeDataset"
						}
					}
				}
			},
			slot: {
				type: "UniNativeSlotType",
				description: "插槽类型",
				defaultValue: "none",
				values: [
					"none",
					"refresher"
				],
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "slot"
						}
					}
				}
			}
		}
	},
	view: {
		classes: {
			dom: "UniViewElement",
			nv: "UniNativeView"
		},
		attributes: {
			flatten: {
				type: "boolean",
				description: "组件是否被拍平",
				uniPlatform: {
					app: {
						"page-c": {
							setter: "createNativeView"
						}
					},
					"app-android": {
						"page-kt": {
							setter: "createNativeView"
						}
					}
				}
			},
			"hover-class": {
				type: "string",
				description: "按下去的样式类，需要框架转换为样式列表hoverStyles",
				uniPlatform: {
					app: {
						"dom-c": {
							setter: "setHoverStyles"
						}
					},
					"app-android": {
						"dom-kt": {
							setter: "setHoverStyles"
						}
					}
				}
			},
			"hover-stop-propagation": {
				type: "boolean",
				description: "是否阻止本节点的祖先节点出现点击态",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "hoverStopPropagation"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "hoverStopPropagation"
						}
					}
				}
			},
			"hover-start-time": {
				type: "number",
				description: "按住后多久出现点击态",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "hoverStartTime"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "hoverStartTime"
						}
					}
				}
			},
			"hover-stay-time": {
				type: "number",
				description: "按住后多久出现点击态",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "hoverStayTime"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "hoverStayTime"
						}
					}
				}
			}
		}
	},
	text: {
		classes: {
			dom: "UniTextElement",
			nv: "UniNativeTextView"
		},
		attributes: {
			flatten: {
				type: "boolean",
				description: "组件是否被拍平",
				uniPlatform: {
					app: {
						"page-c": {
							setter: "createNativeTextView"
						}
					},
					"app-android": {
						"page-kt": {
							setter: "createNativeTextView"
						}
					}
				}
			},
			"user-select": {
				type: "boolean",
				description: "文本是否可选",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "userSelect"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "userSelect"
						}
					}
				}
			},
			"max-lines": {
				type: "number",
				description: "限制文本的最大行数",
				uniPlatform: {
					app: {
						"dom-c": {
							setter: "setMaxLines"
						}
					},
					"app-android": {
						"dom-kt": {
							setter: "setMaxLines"
						}
					}
				}
			}
		}
	},
	image: {
		classes: {
			dom: "UniImageElement",
			nv: "UniNativeImageView"
		},
		attributes: {
			flatten: {
				type: "boolean",
				description: "组件是否被拍平",
				uniPlatform: {
					app: {
						"page-c": {
							setter: "createNativeImageView"
						}
					},
					"app-android": {
						"page-kt": {
							setter: "createNativeImageView"
						}
					}
				}
			},
			src: {
				type: "string",
				description: "图片资源地址",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "src"
						},
						"dom-c": {
							setter: "setSrc"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "src"
						},
						"dom-c": {
							setter: "setSrc"
						}
					}
				}
			},
			mode: {
				type: "UniImageModeType",
				defaultValue: "scaleToFill",
				values: [
					"scaleToFill",
					"aspectFit",
					"aspectFill",
					"widthFix",
					"heightFix",
					"top",
					"bottom",
					"center",
					"left",
					"right",
					"top left",
					"top right",
					"bottom left",
					"bottom right"
				],
				description: "图片裁剪、缩放的模式",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "mode"
						},
						"dom-c": {
							setter: "setMode"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "mode"
						},
						"dom-c": {
							setter: "setMode"
						}
					}
				}
			},
			"lazy-load": {
				type: "boolean",
				description: "是否懒加载图片",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "lazyLoad"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "lazyLoad"
						}
					}
				}
			},
			"fade-show": {
				type: "boolean",
				description: "是否显示动画效果",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "fadeShow"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "fadeShow"
						}
					}
				}
			}
		}
	},
	"scroll-view": {
		classes: {
			dom: "UniScrollViewElement",
			nv: "UniNativeScrollView"
		},
		attributes: {
			direction: {
				type: "UniNativeScrollViewDirectionType",
				defaultValue: "vertical",
				values: [
					"none",
					"vertical",
					"horizontal",
					"all"
				],
				description: "滚动方向，可取值 none、all、horizontal、vertical，默认值vertical",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "direction"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "direction"
						}
					}
				}
			},
			"enable-back-to-top": {
				type: "boolean",
				description: "点击顶部状态栏滚动条返回顶部，只支持竖向",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "enableBackToTop"
						}
					}
				}
			},
			bounces: {
				type: "boolean",
				description: "控制是否回弹效果",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "bounces"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "bounces"
						}
					}
				}
			},
			"show-scrollbar": {
				type: "boolean",
				description: "控制是否出现滚动条",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "showScrollbar"
						}
					}
				}
			},
			"upper-threshold": {
				type: "number",
				description: "距顶部/左边多远时（单位px），触发 scrolltoupper 事件",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "upperThreshold"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "upperThreshold"
						}
					}
				}
			},
			"lower-threshold": {
				type: "number",
				description: "距底部/右边多远时（单位px），触发 scrolltolower 事件",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "lowerThreshold"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "lowerThreshold"
						}
					}
				}
			},
			"scroll-top": {
				type: "number",
				description: "设置竖向滚动条位置",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "scrollTop"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "scrollTop"
						}
					}
				}
			},
			"scroll-left": {
				type: "number",
				description: "设置横向滚动条位置",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "scrollLeft"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "scrollLeft"
						}
					}
				}
			},
			"scroll-with-animation": {
				type: "boolean",
				description: "是否在设置滚动条位置时使用滚动动画，设置false没有滚动动画",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "scrollWithAnimation"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "scrollWithAnimation"
						}
					}
				}
			},
			"refresher-enabled": {
				type: "boolean",
				description: "开启下拉刷新，暂时不支持scroll-x = true横向刷新",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "refresherEnabled"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "refresherEnabled"
						}
					}
				}
			},
			"refresher-threshold": {
				type: "number",
				description: "设置下拉刷新阈值",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "refresherThreshold"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "refresherThreshold"
						}
					}
				}
			},
			"refresher-max-drag-distance": {
				type: "number",
				description: "设置下拉最大拖拽距离（单位px），默认是下拉刷新控件高度的2.5倍",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "refresherMaxDragDistance"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "refresherMaxDragDistance"
						}
					}
				}
			},
			"refresher-background": {
				type: "UniNativeColor",
				description: "设置下拉刷新区域背景颜色，默认透明",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "refresherBackground"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "refresherBackground"
						}
					}
				}
			},
			"refresher-triggered": {
				type: "boolean",
				description: "设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发",
				uniPlatform: {
					app: {
						"nv-c": {
							setter: "refresherTriggered"
						}
					},
					"app-android": {
						"nv-kt": {
							setter: "refresherTriggered"
						}
					}
				}
			},
			type: {
				type: "string",
				description: "渲染模式，可取值 nested",
				uniPlatform: {
					"app-android": {
						"nv-kt": {
							setter: "type"
						}
					}
				}
			},
			"associative-container": {
				type: "string",
				description: "关联的滚动容器",
				uniPlatform: {
					"app-android": {
						"nv-kt": {
							setter: "associativeContainer"
						}
					}
				}
			}
		}
	}
};

const cacheElementsProperties = /* @__PURE__ */ new Map();
function getElementsProperties(platform) {
  if (cacheElementsProperties.has(platform)) {
    return cacheElementsProperties.get(platform);
  }
  const elements = {};
  const config = appUVueJson;
  const globalAttrs = getElementSupportedAttributes(
    platform,
    config.global.attributes
  );
  Object.keys(config).forEach((key) => {
    if (key !== "global") {
      const elementAttrs = getElementSupportedAttributes(
        platform,
        config[key].attributes
      );
      elements[key] = shared.extend({}, globalAttrs, elementAttrs);
    }
  });
  cacheElementsProperties.set(platform, elements);
  return elements;
}
function getElementSupportedAttributes(platform, attributes) {
  const attrs = {};
  Object.keys(attributes).forEach((name) => {
    const options = attributes[name];
    if (options.uniPlatform[platform] || options.uniPlatform["app"]) {
      const type = options.type;
      if (type) {
        switch (type) {
          case "string":
            attrs[name] = "string";
            break;
          case "number":
            attrs[name] = "number";
            break;
          case "boolean":
            attrs[name] = "boolean";
            break;
          case "UniNativeColor":
            attrs[name] = "color";
            break;
          case "Array<string>":
            attrs[name] = "Array<string>";
            break;
          default:
            attrs[name] = "enum";
            break;
        }
      }
    }
  });
  return attrs;
}
function getElementsPropertiesOptions(platform, target) {
  const elements = {};
  const config = appUVueJson;
  const globalAttrs = parseAttributes(
    platform,
    target,
    config.global.attributes
  );
  Object.keys(config).forEach((key) => {
    if (key !== "global") {
      const elementAttrs = parseAttributes(
        platform,
        target,
        config[key].attributes,
        config[key].classes[target.split("-")[0]]
      );
      elements[key] = {
        ...globalAttrs,
        ...elementAttrs
      };
    }
  });
  return elements;
}
function parseAttributes(platform, target, attributes, className) {
  const properties = {};
  Object.keys(attributes).forEach((name) => {
    const options = attributes[name];
    let propertyOptions;
    const platformConfig = options.uniPlatform[platform] || options.uniPlatform["app"];
    if (platformConfig) {
      const targetConfig = platformConfig[target];
      if (targetConfig) {
        const { type, propertyName, setter } = targetConfig;
        propertyOptions = {
          type: type || options.type,
          property: !!propertyName,
          name: propertyName || setter,
          values: options.values,
          className
        };
      }
    }
    properties[name] = propertyOptions;
  });
  return properties;
}

const BOOLEAN_TYPES = ["boolean"];
function isBooleanType(propertyType) {
  return !!(propertyType && BOOLEAN_TYPES.includes(propertyType));
}
function createSetPropBooleanValueProcessor(options) {
  return createPropertyProcessor$1(
    (value) => {
      if (options.property) {
        return createValueProcessorResult$1(`true`, `${options.name} = true`);
      }
      return createValueProcessorResult$1(`true`, `${options.name}(true)`);
    },
    "boolean",
    options
  );
}

const COLOR_TYPES$1 = ["UniNativeColor"];
function isColorType$1(propertyType) {
  return !!(propertyType && COLOR_TYPES$1.includes(propertyType));
}
function createSetPropNativeColorValueProcessor(options) {
  return createPropertyProcessor$1(
    (value) => {
      const nativeColorValue = parseNativeColorValue$1(String(value));
      if (nativeColorValue) {
        if (options.property) {
          return createValueProcessorResult$1(
            nativeColorValue,
            `${options.name} = ${nativeColorValue}`
          );
        }
        return createValueProcessorResult$1(
          nativeColorValue,
          `${options.name}(${nativeColorValue})`
        );
      }
      return createValueProcessorError$1(`Invalid color value: ${value}`);
    },
    "color",
    options
  );
}
function parseNativeColorValue$1(value) {
  const color = tinycolor(value);
  if (color.isValid()) {
    const hex8 = color.toHex8();
    const argb = hex8.slice(6, 8) + hex8.slice(0, 6);
    return "0x" + argb;
  }
}

const processorMapCache$1 = /* @__PURE__ */ new Map();
function getCacheKey$1(platform, target) {
  return `${platform}:${target}`;
}
function createDom2ElementsPropertiesProcessors(platform, target) {
  const cacheKey = getCacheKey$1(platform, target);
  if (processorMapCache$1.has(cacheKey)) {
    return processorMapCache$1.get(cacheKey);
  }
  const processorMap = {};
  const elementsPropertiesOptions = getElementsPropertiesOptions(
    platform,
    target
  );
  Object.keys(elementsPropertiesOptions).forEach((key) => {
    const propertiesOptions = elementsPropertiesOptions[key];
    const processors = {};
    Object.keys(propertiesOptions).forEach((propertyName) => {
      const propertyOptions = propertiesOptions[propertyName];
      let processor;
      if (propertyOptions) {
        processor = createPropertyValueProcessor(propertyOptions);
      }
      processors[propertyName] = processor;
    });
    processorMap[key] = processors;
  });
  processorMapCache$1.set(cacheKey, processorMap);
  return processorMap;
  function createPropertyValueProcessor(options) {
    const propertyType = options.type;
    if (isNumberType$1(propertyType)) {
      return createSetPropNumberValueProcessor(options);
    } else if (isStringType$1(propertyType)) {
      return createSetPropStringValueProcessor(options);
    } else if (isBooleanType(propertyType)) {
      return createSetPropBooleanValueProcessor(options);
    } else if (isColorType$1(propertyType)) {
      return createSetPropNativeColorValueProcessor(options);
    } else if (propertyType) {
      return createSetPropEnumValueProcessor(
        options,
        createGenEnumCode$1(target, propertyType)
      );
    }
  }
}
function createDom2ElementsPropertiesSupportChecker(platform) {
  const elementsProperties = getElementsProperties(platform);
  return (tagName, propertyName) => {
    if (propertyName.startsWith("data-")) {
      return true;
    }
    const properties = elementsProperties[tagName];
    if (!properties) {
      return false;
    }
    return !!properties[propertyName];
  };
}

function createParseStaticProp(platform) {
  return (target, tagName, propertyName, value) => {
    let code = "";
    const errors = [];
    const processor = createDom2ElementsPropertiesProcessors(platform, target);
    const processors = processor[tagName];
    if (processors) {
      if (propertyName in processors) {
        const processor2 = processors[propertyName];
        if (processor2) {
          const result = processor2(value, propertyName);
          code = result.setterCode;
          if (result.error) {
            errors.push(result.error);
          }
        }
      } else {
        errors.push(
          `Property '${propertyName}' is not supported on '<${tagName}>'`
        );
      }
      return {
        code,
        errors
      };
    }
  };
}
function createGetPropertyOptions(platform, target) {
  const processor = createDom2ElementsPropertiesProcessors(platform, target);
  return (tagName, propertyName) => {
    var _a;
    const processors = processor[tagName];
    if (processors) {
      if (propertyName in processors) {
        return (_a = processors[propertyName]) == null ? void 0 : _a.options;
      }
    }
  };
}
function createGetPlatformPropertyType(platform) {
  const elementsProperties = getElementsProperties(platform);
  return (tagName, propertyName) => {
    const properties = elementsProperties[tagName];
    if (!properties) {
      return;
    }
    return properties[propertyName];
  };
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
      root: "",
      mode: "module",
      platform: "app-harmony",
      prefixIdentifiers: true,
      sourceMap: false,
      filename: `template.vue.html`,
      relativeFilename: "",
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
      onError: compilerDom.defaultOnError,
      onWarn: compilerDom.defaultOnWarn,
      onVueTemplateCompileLog: () => {
      },
      isCppExpr: () => false,
      r: (name) => name
    };
    this.options = shared.extend(defaultOptions, options);
    this.block = ir.block;
    this.getPropertyType = createGetPlatformPropertyType(options.platform);
    if (this.options.r) {
      this.r = this.options.r;
    }
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
  enterScope() {
    return [this.scopeLevel++, () => this.scopeLevel--];
  }
  get sharedDataScopeVar() {
    return "__sharedDataScope";
  }
  sharedDataVForClassType(vForCount) {
    return `\${__SHARED_DATA_CLASS_NAME_TYPE}_VFor${vForCount}`;
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
    context.helper("useSharedDataPageId");
    context.helper("useSharedDataScope");
    context.helper("withSharedDataPage");
  } else {
    context.helper("useSharedDataScope");
    context.helper("withSharedDataComponent");
  }
  if (ir.hasTemplateRef) {
    push(
      compilerVapor.NEWLINE,
      `const ${setTemplateRefIdent} = ${context.helper("createSharedDataTemplateRefSetter")}()`
    );
  }
  if (ir.hasDeferredVShow) {
    push(compilerVapor.NEWLINE, `const deferredApplyVShows = []`);
  }
  push(...genBlockContent$1(ir.block, context, true));
  push(compilerVapor.NEWLINE, `return __sharedData`);
  push(compilerVapor.INDENT_END, compilerVapor.NEWLINE);
  push("})");
  const imports = genHelperImports$1(context) + genAssetImports$1(context);
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
function genAssetImports$1({ ir }) {
  const assetImports = ir.node.imports;
  let imports = "";
  for (const assetImport of assetImports) {
    imports += `import '${assetImport.path}';
`;
  }
  return imports;
}
function genClassName(context) {
  return `
const __className = '${context.options.className}' as const
type __SHARED_DATA_CLASS_NAME_TYPE = \`\${typeof __className}${context.r("SharedData")}\`
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
  [",", NEWLINE]
];
const DELIMITERS_OBJECT_NEWLINE = [
  ["{", INDENT_START, NEWLINE],
  [INDENT_END, NEWLINE, "}"],
  [",", NEWLINE]
];
function genCall(name, ...frags) {
  const hasPlaceholder = shared.isArray(name);
  const fnName = hasPlaceholder ? name[0] : name;
  const placeholder = hasPlaceholder ? name[1] : "null";
  return [fnName, ...genMulti(["(", ")", ", ", placeholder], ...frags)];
}
function codeFragmentToString(code, context) {
  const {
    options: { sourceMap }
  } = context;
  const filename = context.options.relativeFilename || context.options.filename;
  let map;
  if (sourceMap) {
    map = new require$$2.SourceMapGenerator();
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
    return [[content, -2, loc], assignment];
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
    ids.sort((a, b) => a.start - b.start).forEach((id, i) => {
      const start = id.start - 1;
      const end = id.end - 1;
      const last = ids[i - 1];
      const leadingText = content.slice(last ? last.end - 1 : 0, start);
      if (leadingText.length) push([leadingText, -3]);
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
      if (i === ids.length - 1 && end < content.length) {
        push([content.slice(end), -3]);
      }
    });
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
        name = raw = unref();
        break;
      case "setup-ref":
        name = raw = withAssignment(`${raw}.value`);
        break;
      case "setup-maybe-ref":
        const isDestructureAssignment = parent && compilerDom.isInDestructureAssignment(parent, parentStack || []);
        const isAssignmentLVal = parent && parent.type === "AssignmentExpression" && parent.left === id;
        const isUpdateArg = parent && parent.type === "UpdateExpression" && parent.argument === id;
        raw = isAssignmentLVal || isUpdateArg || isDestructureAssignment ? name = `${raw}.value` : unref();
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
    return s;
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
  } = compilerVapor.analyzeExpressions(expressions);
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
    exp.ast = parseExp(context, exp.content, exp.loc);
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
  if (vars.every((v) => v.every((e, idx) => e === first[idx]))) {
    return false;
  }
  return true;
}
function processRepeatedExpressions(context, expressions, varDeclarations, updatedVariable, expToVariableMap) {
  const declarations = [];
  const seenExp = expressions.reduce(
    (acc, exp) => {
      const vars = expToVariableMap.get(exp);
      if (!vars) return acc;
      const variables = vars.map((v) => v.name);
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
          exp.content = exp.content.replace(
            new RegExp(escapeRegExp(content), "g"),
            varName
          );
          exp.ast = parseExp(context, exp.content, exp.loc);
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
function parseExp(context, content, loc) {
  const plugins = context.options.expressionPlugins;
  const options = {
    plugins: plugins ? [...plugins, "typescript"] : ["typescript"]
  };
  try {
    return parser$1.parseExpression(`(${content})`, options);
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

function genSetEvent(oper, context) {
  var _a;
  if (!(context.feature & 2)) {
    return [];
  }
  const {
    element,
    key,
    keyOverride,
    modifiers,
    delegate,
    effect,
    sharedData,
    value
  } = oper;
  const name = genName();
  const { helper, options, r, sharedDataIdent } = context;
  if (value && ((_a = options.isCppExpr) == null ? void 0 : _a.call(options, value.ast))) {
    return [
      NEWLINE,
      ...genCall(helper("onElement"), `n${element}`, name, [
        `(${r("event")}: ${r("UniEvent")}) => {`,
        ...genExpression(value, context),
        `(${r("event")})`,
        `}`
      ])
    ];
  }
  const eventOptions = genEventOptions();
  const eventId = `e${sharedData.ident}${oper.element}`;
  return [
    NEWLINE,
    `const ${eventId} = ${sharedDataIdent(sharedData.ident)}`,
    NEWLINE,
    ...genCall(
      helper(delegate ? "delegate" : "onElement"),
      `n${element}`,
      name,
      [
        `(${r("event")}: ${r("UniEvent")}) => {`,
        `${eventId}(${r("event")})`,
        `}`
      ],
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
    let { options: options2 } = modifiers;
    if (!options2.length && !effect) return;
    return genMulti(
      DELIMITERS_OBJECT_NEWLINE,
      effect && ['"effect": true'],
      ...options2.map((option) => [`"${option}": true`])
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

function genFor(oper, context) {
  const { helper, pageVar, r } = context;
  const {
    source,
    value,
    key,
    index,
    render,
    keyProp,
    typeProp,
    once,
    id,
    component,
    onlyChild
  } = oper;
  const isListItem = isVForListItem(oper.node);
  const rawValue = value && value.content;
  const rawKey = key && key.content;
  const rawIndex = index && index.content;
  const isSharedData = !!source.sharedData;
  const sourceExpr = ["() => (", ...genExpression(source, context), ")"];
  const idToPathMap = isSharedData ? /* @__PURE__ */ new Map() : compilerVapor.parseValueDestructure(value, context);
  const vForCount = context.enterVFor();
  const [_, exitScope] = context.enterScope();
  const itemVar = `${r("_for_item")}${vForCount}`;
  const idMap = compilerVapor.buildDestructureIdMap(
    idToPathMap,
    isSharedData ? `${itemVar}.value` : `${context.helper("toDisplayString")}(${itemVar})`,
    context.options.expressionPlugins
  );
  idMap[itemVar] = null;
  const args = isSharedData ? [context.sharedDataVForItemVar] : [itemVar];
  const useSharedDataVFor = isSharedData ? `const ${context.sharedDataVForVar} = useSharedDataVFor<UniSharedData, ${context.sharedDataVForClass(vForCount)}>(${context.sharedDataVForItemVar})` : "";
  const keyVar = `${r("_for_key")}${vForCount}`;
  args.push(`, ${keyVar}`);
  if (rawKey) {
    idMap[rawKey] = isSharedData ? `${keyVar}.value` : `${context.helper("toDisplayString")}(${keyVar})`;
    idMap[keyVar] = null;
  }
  const indexVar = `${r("_for_index")}${vForCount}`;
  args.push(`, ${indexVar}`);
  if (rawIndex) {
    idMap[rawIndex] = isSharedData ? `${indexVar}.value` : `${context.helper("toDisplayString")}(${indexVar})`;
    idMap[indexVar] = null;
  }
  const resetBlock = context.enterBlock(render);
  const getKeyFrag = genCallback(
    keyProp,
    isSharedData ? context.sharedDataVForItemVar : void 0
  );
  const getTypeFrag = isListItem && typeProp ? genCallback(
    typeProp,
    isSharedData ? context.sharedDataVForItemVar : void 0
  ) : genDefaultTypeCallback(context.sharedDataVForItemVar);
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
            const operFrag = context.withEffect(
              () => genEffect(effect, context)
            );
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
  context.exitVFor();
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
  if (!isListItem) {
    return [
      NEWLINE,
      `const n${id} = `,
      ...genCall(
        [helper(`create${context.helperType}For`), "null"],
        pageVar,
        sourceExpr,
        blockFn,
        getKeyFrag,
        flags ? String(flags) : void 0,
        void 0
        // todo: hydrationNode
      )
    ];
  }
  return [
    NEWLINE,
    `const n${id} = `,
    ...genCall(
      [helper(`create${context.helperType}RecycleFor`), "null"],
      pageVar,
      sourceExpr,
      blockFn,
      getKeyFrag,
      getTypeFrag,
      flags ? String(flags) : void 0,
      void 0
      // todo: hydrationNode
    )
  ];
  function genCallback(expr, sharedDataVForItemVar) {
    if (!expr) return false;
    const res = context.withId(
      () => genExpression(expr, context),
      genSimpleIdMap()
    );
    return [
      ...genMulti(
        ["(", ")", ", "],
        sharedDataVForItemVar ? sharedDataVForItemVar : rawValue ? rawValue : "_",
        rawKey ? rawKey : "__",
        rawIndex ? rawIndex : "___"
      ),
      " => {",
      NEWLINE,
      useSharedDataVFor,
      NEWLINE,
      "return ",
      ...res,
      "}"
    ];
  }
  function genDefaultTypeCallback(sharedDataVForItemVar) {
    return [
      ...genMulti(["(", ")", ", "], sharedDataVForItemVar, "_", "__"),
      " => {",
      NEWLINE,
      'return "0"',
      "}"
    ];
  }
  function genSimpleIdMap() {
    const idMap2 = {};
    if (rawKey)
      idMap2[rawKey] = isSharedData ? null : `${context.helper("toDisplayString")}(${rawKey})`;
    if (rawIndex)
      idMap2[rawIndex] = isSharedData ? null : `${context.helper("toDisplayString")}(${rawIndex})`;
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
  const { helper, pageVar } = context;
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
      pageVar,
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

function genSetProp(oper, context) {
  const { helper } = context;
  const {
    prop: { key, values, sharedData },
    tag
  } = oper;
  const propName = key.content;
  if (!["class", "style", "hover-class"].includes(propName)) {
    const options = context.getPropertyOptions(tag, propName);
    if (!options) {
      return [];
    }
    const { name, property, className } = options;
    const [frag, push] = buildCodeFragment();
    push(NEWLINE);
    const varName = className ? `${context.genCastCode([`n${oper.element}`], className, { dereference: true }).join("")}` : `n${oper.element}`;
    if (property) {
      push(`${varName}.${name} = `);
    } else {
      push(`${varName}.${name}(`);
    }
    if (sharedData) {
      push(
        ...genEnumPropValue(
          options,
          [context.sharedDataIdent(sharedData.ident)],
          context
        )
      );
    } else {
      push(...genEnumPropValue(options, genPropValue(values, context), context));
    }
    if (!property) {
      push(")");
    }
    return frag;
  }
  if (context.options.renderer === "nativeView") {
    return [];
  }
  const isClassProp = propName === "class" || propName === "hover-class";
  const args = [`n${oper.element}`, false];
  if (isClassProp) {
    args.unshift(`${context.r("__sharedData")}`);
  }
  if (sharedData) {
    args.push(context.sharedDataIdent(sharedData.ident));
  } else {
    if (isClassProp && values.length === 1 && values[0].isStatic) {
      const value = values[0].content;
      args.push(JSON.stringify(value.split(/\s+/).map((item) => item)));
    } else {
      args.push(genPropValue(values, context));
    }
  }
  return [
    NEWLINE,
    ...genCall(
      [
        helper(
          propName === "class" ? "setElementClass" : propName === "hover-class" ? "setElementHoverClass" : "setElementStyle"
        ),
        null
      ],
      ...args
    )
  ];
}
function genEnumPropValue(options, value, context) {
  if (!isEnumType(options.type)) {
    return value;
  }
  return context.genCastCode(value, options.type);
}
function genDynamicProps(oper, context) {
  const { helper, sharedDataIdent, r, helperType } = context;
  return [
    NEWLINE,
    ...genCall(
      helper(`set${helperType}DynamicProps`),
      `${r("__sharedData")}`,
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
function genChangeProp({ prop }, { helper, sharedDataIdent, feature }) {
  if (!(feature & 32)) {
    return [];
  }
  const [frag, push] = buildCodeFragment();
  push(NEWLINE);
  const ident = prop.values[0].sharedData.ident;
  push(`const p_${ident} = ${sharedDataIdent(ident)}`);
  push(NEWLINE);
  push(`${helper(`runOnMainQueue`)}(() => {`);
  const memberExpr = prop.values[0].content;
  push(`${memberExpr}(p_${ident})`);
  push(`})`);
  return frag;
}

function genSetTemplateRef(oper, context) {
  if (!(context.feature & 16)) {
    return [];
  }
  if (context.options.isCppExpr(oper.value.ast)) {
    const { helper, r } = context;
    return [
      NEWLINE,
      ...genCall(helper("onElementRef"), `n${oper.element}`, [
        `(${r("el")}: ${r("UniElement")}) => {`,
        ...genExpression(oper.value, context),
        `(${r("el")})`,
        `}`
      ])
    ];
  }
  if (oper.value.sharedData) {
    return [
      NEWLINE,
      ...genCall(
        context.helper("onElementRef"),
        `n${oper.element}`,
        context.sharedDataIdent(oper.value.sharedData.ident)
      )
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
      DELIMITERS_ARRAY.concat("null"),
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
  const { root, slots, sharedData } = operation;
  const rawSlots = genRawSlots(slots, context);
  const args = [
    sharedDataIdent(sharedData.ident),
    void 0,
    rawSlots,
    root ? "true" : false
  ];
  let helperName = helper(`create${context.helperType}Component`);
  if (operation.dynamic && !operation.dynamic.isStatic) {
    helperName = helper(`create${context.helperType}DynamicComponent`);
  } else {
    if (operation.asset) {
      helperName = helper(`create${context.helperType}ComponentWithFallback`);
      args.unshift(context.pageVar);
    }
  }
  return [
    NEWLINE,
    `const n${operation.id} = `,
    ...genCall(
      helperName,
      ...args
      // once && 'true',
    ),
    ...genDirectivesForElement(operation.id, context)
  ];
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
    args.push([
      `'$': `,
      ...genDynamicSlots(dynamicSlots, context),
      ` as Vue${context.helperType}DynamicSlotSourceArray`
    ]);
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
  return genCall(
    context.helper(`create${context.helperType}DynamicSlot`),
    genExpression(name, context),
    genSlotBlockWithProps(fn, context)
  );
}
function genLoopSlot(slot, context) {
  const vForCount = context.enterVFor();
  const { name, fn, loop } = slot;
  const { value, key, index, source } = loop;
  const rawValue = value && value.content;
  const rawKey = key && key.content;
  const rawIndex = index && index.content;
  const idMap = {};
  if (rawValue) idMap[rawValue] = rawValue;
  if (rawKey) idMap[rawKey] = rawKey;
  if (rawIndex) idMap[rawIndex] = rawIndex;
  const slotExpr = genCall(
    context.helper(`create${context.helperType}DynamicSlot`),
    context.withId(() => {
      const resetBlock = context.enterBlock(fn);
      const result2 = genExpression(name, context);
      resetBlock();
      return result2;
    }, idMap),
    context.withId(() => genSlotBlockWithProps(fn, context), idMap)
  );
  const result = [
    ...genCall(
      context.helper(`create${context.helperType}ForSlots`),
      genExpression(source, context),
      [
        ...genMulti(["(", ")", ", "], context.sharedDataVForItemVar, "_", "__"),
        " => {",
        INDENT_START,
        NEWLINE,
        `const ${context.sharedDataVForVar} = useSharedDataVFor<UniSharedData, ${context.sharedDataVForClass(vForCount)}>(${context.sharedDataVForItemVar})`,
        NEWLINE,
        "return ",
        ...slotExpr,
        NEWLINE,
        INDENT_END,
        "}"
      ]
    )
  ];
  context.exitVFor();
  return result;
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
    ...negative ? [...genDynamicSlot(negative, context)] : ["null"],
    INDENT_END
  ];
}
function genSlotBlockWithProps(oper, context) {
  let isDestructureAssignment = false;
  let propsName;
  let exitScope;
  let depth;
  const { props, key, node } = oper;
  const idsOfProps = /* @__PURE__ */ new Set();
  if (props) {
    if (isDestructureAssignment = !!props.ast) {
      [depth, exitScope] = context.enterScope();
    }
  }
  const idMap = {};
  idsOfProps.forEach(
    (id) => idMap[id] = isDestructureAssignment ? `${propsName}[${JSON.stringify(id)}]` : null
  );
  let blockFn = context.withId(
    () => genBlock(oper, context, [propsName]),
    idMap
  );
  exitScope && exitScope();
  if (key) {
    blockFn = [
      `() => {`,
      INDENT_START,
      NEWLINE,
      `return `,
      ...genCall(
        context.helper("createKeyedFragment"),
        [`() => `, ...genExpression(key, context)],
        blockFn
      ),
      INDENT_END,
      NEWLINE,
      `}`
    ];
  }
  if (node.type === 1) {
    if (compilerVapor.needsVaporCtx(oper)) {
      blockFn = [
        `${context.helper(`with${context.helperType}VaporCtx`)}(`,
        ...blockFn,
        `)`
      ];
    }
  }
  return blockFn;
}

function genSlotOutlet(oper, context) {
  const { helper, pageVar } = context;
  const { id, name, fallback, noSlotted, once } = oper;
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
      pageVar,
      nameExpr,
      "null",
      fallbackArg,
      noSlotted && "true",
      // noSlotted
      once && "true"
      // v-once
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
    case 18:
      return genGetInsertionParent(oper, context);
    case 19:
      return genChangeProp(oper, context);
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
  const { parent, anchor, append, last } = operation;
  return [
    NEWLINE,
    ...genCall(
      context.helper(`set${context.helperType}InsertionState`),
      `n${parent}`,
      anchor == null ? void 0 : anchor === -1 ? `0` : append ? (
        // null or anchor > 0 for append
        // anchor > 0 is the logical index of append node - used for locate node during hydration
        anchor === 0 ? "null" : `${anchor}`
      ) : `n${anchor}`,
      last && "true"
    )
  ];
}
function genGetInsertionParent({ id }, context) {
  if (!(context.feature & 1)) {
    return [];
  }
  return [
    NEWLINE,
    `const n${id} = ${context.helper(`get${context.helperType}InsertionParent`)}()`
  ];
}

const NODE_TYPES = {
  TEXT: "text",
  COMMENT: "comment",
  ELEMENT: "element"
};
const flattenTags = ["view", "text", "image"];
const CONSTANTS = {
  VALUE_ATTR: "value",
  EMPTY_STRING: "",
  TEXT_PLACEHOLDER: compilerVapor.TEXT_PLACEHOLDER,
  UNKNOWN_COMMENT: "unknown",
  EXT_STYLE_MARKER: "ext:style"
};
const VAR_PREFIXES = {
  ELEMENT: "e",
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
    if (tag === "text" && children.length === 1 && children[0].type === "text" && children[0].content.length === 1 && children[0].content[0] !== "\n") {
      attrs["max-lines"] = "1";
    }
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
    return name === "id" || name === "class" || name === "style" || name === "hover-class";
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
function getFunctionSignature({ r, options }) {
  const paramType = `${r("page")}: ${r("UniPage")}`;
  const returnType = options.renderer === "element" ? `: ${r("UniElement")}` : `: ${r("UniNativeBaseView")}`;
  return { paramType, returnType };
}
function getNextVariableName(context) {
  return `${VAR_PREFIXES.ELEMENT}${context.templateVariableCounter++}`;
}

function genNodeStatements(node, context, resetCounters = true) {
  if (resetCounters) {
    context.resetTemplateCounters();
  }
  return genNodeCode(node, context);
}
function createDummyNode() {
  return {
    variableName: "",
    statements: []
  };
}
function genNodeCode(node, context) {
  const isNativeView = context.options.renderer === "nativeView";
  const renderTextContext = context.renderTextContext;
  switch (node.type) {
    case NODE_TYPES.TEXT:
      if (renderTextContext.inTextElement) {
        if (isNativeView) {
          return createDummyNode();
        }
        return createTextNode(node.content || CONSTANTS.EMPTY_STRING, context);
      } else {
        return createTextElement(
          node.content || CONSTANTS.EMPTY_STRING,
          context
        );
      }
    case NODE_TYPES.COMMENT:
      return createCommentNode(node.content || CONSTANTS.EMPTY_STRING, context);
    case NODE_TYPES.ELEMENT: {
      if (renderTextContext.inTextElement && isNativeView) {
        if (node.tag === "text") {
          renderTextContext.enterTextElement();
          genElementCode(node, context);
          renderTextContext.exitTextElement();
        }
        return createDummyNode();
      }
      if (node.tag === "text") {
        renderTextContext.enterTextElement();
        const result = genElementCode(node, context);
        if (isNativeView && renderTextContext.textElementCount === 1) {
          const increaseNativeViewCounter = renderTextContext.genIncreaseNativeViewCounter();
          if (increaseNativeViewCounter) {
            result.statements.push(
              renderTextContext.genIncreaseNativeViewCounter()
            );
          }
        }
        renderTextContext.exitTextElement();
        renderTextContext.textElementNames.pop();
        return result;
      }
      return genElementCode(node, context);
    }
    default:
      return createCommentNode(CONSTANTS.UNKNOWN_COMMENT, context);
  }
}
function isEmptyText(content) {
  return CONSTANTS.EMPTY_STRING === content || content === CONSTANTS.TEXT_PLACEHOLDER;
}
function unescapeHtml(content) {
  return content.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}
function createTextElement(content, context) {
  const varName = getNextVariableName(context);
  const statements = [
    `const ${varName} = ${context.genCreateTag("text")}`
  ];
  if (!isEmptyText(content)) {
    statements.push(
      `${varName}.${context.r("setText")}(${JSON.stringify(unescapeHtml(content))})`
    );
  }
  return { variableName: varName, statements };
}
function createTextNode(content, context) {
  const varName = getNextVariableName(context);
  const statements = [
    // `const ${varName} = ${context.genCreateTag('_text')}`,
  ];
  if (!isEmptyText(content)) {
    const lastTextElementName = context.renderTextContext.textElementNames.slice(-1)[0];
    statements.push(
      `${lastTextElementName != null ? lastTextElementName : varName}.${context.r("setText")}(${JSON.stringify(unescapeHtml(content))})`
    );
  }
  return { variableName: "", statements };
}
function createCommentNode(content, context) {
  const varName = getNextVariableName(context);
  const statements = [
    `const ${varName} = ${context.genCreateTag("comment", JSON.stringify(content))}`
  ];
  return { variableName: varName, statements };
}
const specialTagHandlers = {
  [NODE_TYPES.TEXT]: genTextElementCode
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
function genRegularElementCode(params, context) {
  const { tag, attrs, children } = params;
  return buildElementStatements(tag, context, attrs, children);
}
function filterAttrs(tag, attrs, context) {
  if (!attrs) {
    return;
  }
  const newAttrs = {};
  for (const [name, value] of Object.entries(attrs)) {
    if (!context.options.isIgnoreAttr(tag, name)) {
      newAttrs[name] = value;
    }
  }
  return newAttrs;
}
function buildElementStatements(tag, context, nodeAttrs, children) {
  const varName = getNextVariableName(context);
  const isText = tag === "text";
  const isNativeView = context.options.renderer === "nativeView";
  if (isText) {
    context.renderTextContext.textElementNames.push(varName);
  }
  const statements = [];
  statements.push(
    `const ${varName} = ${context.genCreateTag({
      tag,
      attrs: nodeAttrs,
      children
    })}`
  );
  const attrs = filterAttrs(tag, nodeAttrs, context);
  if (attrs && !isEmptyAttrs(attrs)) {
    let shouldCacheStyle = false;
    if (CONSTANTS.EXT_STYLE_MARKER in attrs) {
      shouldCacheStyle = true;
      delete attrs[CONSTANTS.EXT_STYLE_MARKER];
    }
    for (const [name, value] of Object.entries(attrs)) {
      if (name === "value" && tag === "text") {
        if (!isEmptyText(value)) {
          statements.push(
            `${varName}.${context.r("setText")}(${JSON.stringify(unescapeHtml(value))})`
          );
        }
      } else if (name === "style") {
        const target = getDom2AppTarget(
          context.options.platform,
          context.options.renderer
        );
        const { obj: styleObj } = context.options.parseStaticStyle(
          target,
          tag,
          value,
          false
        );
        if (styleObj) {
          const styleKeys = Object.keys(styleObj);
          if (shouldCacheStyle && // 仅 DOM 的API需要 cache
          (isDomTarget(target) || target === "all")) {
            const { code: styleCode } = context.options.parseStaticStyle(
              "all",
              tag,
              value,
              true
            );
            if (styleCode && styleCode !== "{}") {
              statements.push(
                `${context.helper("setElementExtStyle")}(${varName}, ${styleCode})`
              );
            }
          }
          styleKeys.forEach((key) => {
            const setterCode = styleObj[key].setterCode;
            if (setterCode) {
              statements.push(`${varName}.${styleObj[key].setterCode}`);
            }
          });
        }
      } else {
        const result = context.options.parseStaticProp(
          getDom2AppTarget(context.options.platform, context.options.renderer),
          tag,
          name,
          value
        );
        if (result && result.code) {
          statements.push(
            `${varName}.${result.code.replace(
              // replace import expressions with string concatenation
              new RegExp(`['"]${compilerVapor.IMPORT_EXP_START}(.*?)${compilerVapor.IMPORT_EXP_END}['"]`),
              `$1`
            )}`
          );
        }
      }
    }
  }
  if (children && children.length > 0) {
    for (const child of children) {
      const inlineCode = !(isText && isNativeView) && tryInlineChild(child, context);
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
      if (!(context.feature & 1)) {
        return context.genCreateTag("text");
      }
      if (isEmptyText(child.content)) {
        return context.genCreateTag("text");
      }
      return null;
    case NODE_TYPES.COMMENT:
      return context.genCreateTag(
        "comment",
        JSON.stringify(child.content || CONSTANTS.EMPTY_STRING)
      );
    case NODE_TYPES.ELEMENT:
      const elementChild = child;
      if (canInlineElement(elementChild)) {
        return context.genCreateTag(elementChild);
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
  if (!isEmptyAttrs(node.attrs)) {
    return false;
  }
  if (node.children && node.children.length > 0) {
    if (node.tag === NODE_TYPES.TEXT && node.children.length === 1 && node.children[0].type === NODE_TYPES.TEXT && isEmptyText(node.children[0].content)) {
      return true;
    }
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
    `  return ${context.genCreateTag("text")}`,
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
      return context.genCreateTag("text");
    case NODE_TYPES.COMMENT:
      return context.genCreateTag(
        "comment",
        JSON.stringify(node.content || CONSTANTS.EMPTY_STRING)
      );
    case NODE_TYPES.ELEMENT:
      const elementNode = node;
      if (isSimpleElement(elementNode)) {
        return context.genCreateTag(elementNode);
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
  if (node.type === NODE_TYPES.TEXT) {
    const textContent = extractTextContent(node.children);
    return !textContent;
  }
  return !node.children || node.children.length === 0;
}

const isTextNode = (template) => {
  return template[0] !== "<" && template !== compilerVapor.TEXT_PLACEHOLDER;
};
function genFactoryFunctions(templates, context) {
  const result = [];
  for (let i = 0; i < templates.length; i++) {
    const template = templates[i];
    if (!isTextNode(template)) {
      const functionFragments = genFactoryFunction(template, i, context);
      result.push(NEWLINE, ...functionFragments);
    }
  }
  return result;
}
function genFactoryCallsInRender(templates, rootIndexes, context) {
  const { helper, options } = context;
  const result = [];
  for (let i = 0; i < templates.length; i++) {
    const template = templates[i];
    if (isTextNode(template)) {
      if (template === compilerVapor.TEXT_NODE_PLACEHOLDER) {
        result.push(
          `const ${VAR_PREFIXES.TEMPLATE}${i} = () => ${context.options.renderer === "element" ? `${context.pageVar}.${context.r("createTextNode")}()` : '""'}`
        );
      } else {
        result.push(
          `const ${VAR_PREFIXES.TEMPLATE}${i} = (): string => "${context.options.renderer === "element" ? template : ""}"`
        );
      }
    } else {
      const rootParam = rootIndexes.has(i) ? ", true" : "";
      result.push(
        `const ${VAR_PREFIXES.TEMPLATE}${i} = ${helper(`${options.renderer}Factory`)}(${context.pageVar}, ${VAR_PREFIXES.FACTORY}${i}${rootParam})`
      );
    }
    if (i < templates.length - 1) {
      result.push(NEWLINE);
    }
  }
  return result;
}

function genTemplates(templates, _rootIndexes, context) {
  const factoryFunctions = genFactoryFunctions(
    Array.from(templates.keys()),
    context
  );
  return factoryFunctions;
}
function genSelf(dynamic, context) {
  const [frag, push] = buildCodeFragment();
  const { id, template, operation, hasDynamicChild } = dynamic;
  if (id !== void 0 && template !== void 0) {
    push(NEWLINE, `const n${id} = t${template}()`);
    push(...genDirectivesForElement(id, context));
  }
  if (operation) {
    push(...genOperationWithInsertionState(operation, context));
  }
  if (hasDynamicChild) {
    push(...genChildren(dynamic, context, push, `n${id}`));
  }
  return frag;
}
function genChildren(dynamic, context, pushBlock, from = `n${dynamic.id}`) {
  const { helper, helperType, options } = context;
  const [frag, push] = buildCodeFragment();
  const { children } = dynamic;
  let offset = 0;
  let prev;
  let textNodeCount = 0;
  const isDynamicText = dynamic.tag === "text";
  for (let [index, child] of children.entries()) {
    if (child.type === 2) {
      textNodeCount++;
      continue;
    }
    if (isDynamicText && options.renderer === "nativeView" && child.tag === "text") {
      textNodeCount++;
      continue;
    }
    index = index - textNodeCount;
    if (child.operation && child.operation.anchor === -1) ;
    if (child.flags & 2) {
      offset--;
    } else if (child.ifBranch) ;
    const id = child.flags & 1 ? child.flags & 4 ? child.anchor : child.id : void 0;
    if (id === void 0 && !child.hasDynamicChild) {
      push(...genSelf(child, context));
      continue;
    }
    const elementIndex = index + offset;
    const variable = id === void 0 ? `p${context.block.tempId++}` : `n${id}`;
    pushBlock(NEWLINE, `const ${variable} = `);
    if (prev) {
      if (elementIndex - prev[1] === 1) {
        pushBlock(
          ...genCall(
            helper(`next${helperType}`),
            prev[0]
            // String(logicalIndex),
          )
        );
      } else {
        pushBlock(
          ...genCall(
            helper(`nthChild${helperType}`),
            from,
            String(elementIndex)
            // String(logicalIndex),
          )
        );
      }
    } else {
      if (elementIndex === 0) {
        pushBlock(
          ...genCall(
            helper(`child${helperType}`),
            from
          )
        );
      } else {
        let init = genCall(helper(`child${helperType}`), from);
        if (elementIndex === 1) {
          init = genCall(
            helper(`next${helperType}`),
            init
            // String(logicalIndex),
          );
        } else if (elementIndex > 1) {
          init = genCall(
            helper(`nthChild${helperType}`),
            from,
            String(elementIndex)
            // String(logicalIndex),
          );
        }
        pushBlock(...init);
      }
    }
    if (id === child.anchor && !child.hasDynamicChild) {
      push(...genSelf(child, context));
    }
    if (id !== void 0) {
      push(...genDirectivesForElement(id, context));
    }
    prev = [variable, elementIndex];
    push(...genChildren(child, context, pushBlock, variable));
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
  const { dynamic, effect, operation, returns, key } = block;
  const resetBlock = context.enterBlock(block);
  for (const child of dynamic.children) {
    push(...genSelf(child, context));
  }
  for (const child of dynamic.children) {
    if (!child.hasDynamicChild) {
      push(...genChildren(child, context, push, `n${child.id}`));
    }
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
  if (root && context.ir.hasDeferredVShow) {
    push(NEWLINE, `deferredApplyVShows.forEach(fn => fn())`);
  }
  if (dynamic.needsKey) {
    for (const child of dynamic.children) {
      const keyValue = key ? genExpression(key, context) : JSON.stringify(child.id);
      push(NEWLINE, `n${child.id}.$key = `, ...keyValue);
    }
  }
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
function isIgnoreElementAttr(tagName, attrName) {
  return false;
}
function isIgnoreNativeViewAttr(tagName, attrName) {
  if (tagName === "text" && attrName === "value") {
    return true;
  }
  return false;
}

class RendererTextContext {
  constructor(options) {
    this.__inTextElement = false;
    this.increaseNativeViewCount = 0;
    this.textElementCount = 0;
    this.textElementNames = [];
    this.options = options;
  }
  set inTextElement(value) {
    if (this.__inTextElement === value) {
      return;
    }
    this.__inTextElement = value;
    if (value) {
      this.increaseNativeViewCount = 0;
    }
  }
  get inTextElement() {
    return this.__inTextElement;
  }
  enterTextElement() {
    if (this.inTextElement) {
      this.increaseNativeViewCount++;
    }
    this.inTextElement = true;
    this.textElementCount++;
  }
  exitTextElement() {
    this.textElementCount--;
    if (this.textElementCount === 0) {
      this.inTextElement = false;
    }
  }
  genIncreaseNativeViewCounter() {
    if (this.increaseNativeViewCount > 0) {
      return `${this.options.r("page")}.${this.options.r("increaseNativeViewCounter")}(${this.increaseNativeViewCount})`;
    }
    return "";
  }
}
class RendererCodegenContext extends SharedDataCodegenContext {
  constructor(ir, options) {
    super();
    this.ir = ir;
    this.helpers = /* @__PURE__ */ new Set([]);
    this.helper = (name) => {
      this.helpers.add(name);
      return this.r(`_${name}`);
    };
    this.delegates = /* @__PURE__ */ new Set();
    this.identifiers = /* @__PURE__ */ Object.create(null);
    this.seenInlineHandlerNames = /* @__PURE__ */ Object.create(null);
    this.scopeLevel = 0;
    this.sharedDataIdent = (ident) => {
      this.effectSharedDataIdentifiers.add(ident);
      return `${this.sharedDataVar}.get_${ident}(${this.r("__reactivity")})`;
    };
    // Template factory counters
    this.templateVariableCounter = 0;
    this.templateStyleCounter = 0;
    // 记录当前 effect 中使用的 sharedData 标识符列表
    this.effectSharedDataIdentifiers = /* @__PURE__ */ new Set();
    const defaultOptions = {
      root: "",
      mode: "module",
      platform: "app-harmony",
      target: "dom-c",
      renderer: "element",
      prefixIdentifiers: true,
      sourceMap: false,
      filename: `template.vue.html`,
      relativeFilename: "",
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
      scriptCppBlocks: [],
      parseStaticStyle: (target, tagName, style, genCode) => ({
        obj: {},
        messages: []
      }),
      parseStaticProp: () => void 0,
      isIgnoreAttr: () => false,
      onError: compilerDom.defaultOnError,
      onWarn: compilerDom.defaultOnWarn,
      onVueTemplateCompileLog: () => {
      },
      isCppExpr: () => false,
      r: (name) => name
    };
    this.options = shared.extend(defaultOptions, options);
    this.block = ir.block;
    const isNativeView = this.options.renderer === "nativeView";
    this.genCreateTag = isNativeView ? this.genCreateNativeView : this.genCreateElement;
    this.genAppendChild = isNativeView ? this.genAppendChildNativeView : this.genAppendChildElement;
    this.getPropertyOptions = createGetPropertyOptions(
      this.options.platform,
      this.options.target
    );
    this.renderTextContext = new RendererTextContext(this.options);
    this.r = this.options.r;
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
  enterScope() {
    return [this.scopeLevel++, () => this.scopeLevel--];
  }
  get insVar() {
    return this.r("__ins");
  }
  get insMethodName() {
    return `getCurrent${this.helperType}VaporComponentInstance`;
  }
  get pageVar() {
    return this.r("__page");
  }
  get helperType() {
    return this.options.renderer === "nativeView" ? "NativeView" : "Element";
  }
  sharedDataVForClass(vForCount) {
    return `${this.options.className}${this.r("SharedData_VFor")}${vForCount}`;
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
  genCreateNativeView(tagOrNode, options, flatten) {
    var _a;
    let tag;
    let createElementParams = null;
    if (typeof tagOrNode === "string") {
      tag = tagOrNode;
    } else {
      tag = tagOrNode.tag;
      createElementParams = tagOrNode;
    }
    const createArgs = [];
    if (options && tag !== "text") {
      createArgs.push(options);
    }
    if (flatten == null && createElementParams) {
      flatten = flattenTags.includes(tag) && !!((_a = createElementParams.attrs) == null ? void 0 : _a.flatten);
    }
    if (flatten) {
      createArgs.push("true");
    } else {
      createArgs.push("false");
    }
    const { r } = this;
    const curPageVar = r("page");
    const args = createArgs.join(", ");
    switch (tag) {
      case "view":
        return `${curPageVar}.${r("createNativeView")}(${args})`;
      case "text":
        return `${curPageVar}.${r("createNativeTextView")}(${args})`;
      case "image":
        return `${curPageVar}.${r("createNativeImageView")}(${args})`;
      case "comment":
        return `null`;
      case "scroll-view":
        return `${curPageVar}.${r("createNativeScrollView")}()`;
      case "native-view":
        return `${curPageVar}.${r("createNativeCustomView")}()`;
      default:
        return `${curPageVar}.${r("createNativeView")}(false)`;
    }
  }
  genCreateElement(tagOrNode, options, flatten) {
    var _a;
    let tag;
    let createElementParams = null;
    if (typeof tagOrNode === "string") {
      tag = tagOrNode;
    } else {
      tag = tagOrNode.tag;
      createElementParams = tagOrNode;
    }
    const createArgs = [];
    if (options && tag !== "comment") {
      createArgs.push(options);
    }
    if (flatten == null && createElementParams) {
      flatten = flattenTags.includes(tag) && !!((_a = createElementParams.attrs) == null ? void 0 : _a.flatten);
    }
    if (flatten) {
      createArgs.push("true");
    } else if (tag !== "comment") {
      createArgs.push("false");
    }
    const { r } = this;
    const curPageVar = r("page");
    const args = createArgs.join(", ");
    switch (tag) {
      case "view":
        return `${curPageVar}.${r("createViewElement")}(${args})`;
      case "text":
        return `${curPageVar}.${r("createTextElement")}(${args})`;
      case "_text":
        return `${curPageVar}.${r("createTextNode")}()`;
      case "image":
        return `${curPageVar}.${r("createImageElement")}(${args})`;
      case "comment":
        return `${curPageVar}.${r("createComment")}(${args || '""'})`;
      case "scroll-view":
        return `${curPageVar}.${r("createScrollViewElement")}()`;
      case "native-view":
        return `${curPageVar}.${r("createNativeViewElement")}()`;
      default:
        return `${curPageVar}.${r("createViewElement")}(false)`;
    }
  }
  genAppendChildNativeView(node, child) {
    if (node === "" || child === "") {
      return "";
    }
    return `${this.helper("appendNativeViewChild")}(${node}, ${child})`;
  }
  genAppendChildElement(node, child) {
    if (node === "" || child === "") {
      return "";
    }
    return `${node}.${this.r("appendChild")}(${child})`;
  }
  genCastCode(expr, type, options) {
    if (isCPPTarget(this.options.target)) {
      return genCall(
        `UTSCPP.as<${type}${(options == null ? void 0 : options.dereference) ? `, '*'` : ""}>`,
        expr
      );
    }
    return [";(", ...expr, "as", type, ")"];
  }
}
function generate(ir, options) {
  var _a;
  options.renderer = (_a = options.renderer) != null ? _a : "element";
  options.isIgnoreAttr = options.renderer === "element" ? isIgnoreElementAttr : isIgnoreNativeViewAttr;
  const [frag, push] = buildCodeFragment();
  const context = new RendererCodegenContext(ir, options);
  const { helpers, r } = context;
  const functionName = r("render" + shared.capitalize(options.renderer));
  const signature = [
    `${r("__sharedData")}: ${options.className}${r("SharedData")}`,
    `${r("__page")}: ${r("UniPage")}`,
    `${r("__reactivity")}: ${r("VueReactivity")}`
  ].join(", ");
  {
    push(
      NEWLINE,
      `export function ${functionName}(${signature}): ${r(`Uni${context.helperType}Block`)} {`
    );
  }
  push(INDENT_START);
  const insCodeIndex = push(NEWLINE);
  if (context.options.scriptCppBlocks.length > 0 && context.feature & 32) {
    push(...genCppInit(context.options.scriptCppBlocks, context));
  }
  push(...genAssetImports(context));
  const templates = genTemplates(ir.template, ir.rootTemplateIndexes, context);
  push(...templates);
  if (ir.template.size > 0) {
    const templateCalls = genFactoryCallsInRender(
      Array.from(ir.template.keys()),
      ir.rootTemplateIndexes,
      context
    );
    push(NEWLINE, ...templateCalls);
  }
  push(...genBlockContent(ir.block, context, true));
  push(INDENT_END, NEWLINE);
  {
    push("}");
  }
  if (context.helpers.has(context.insMethodName)) {
    frag.splice(
      insCodeIndex,
      0,
      `const ${context.insVar} = ${context.helper(context.insMethodName)}()!`
    );
  } else {
    frag.splice(insCodeIndex, 1);
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
function genAssetImports({ ir }) {
  const assetImports = ir.node.imports;
  const imports = [];
  for (const assetImport of assetImports) {
    const exp = assetImport.exp;
    const name = exp.content;
    imports.push(NEWLINE, `const ${name} = '${assetImport.path}';`);
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
function genCppInit(scriptCppBlocks, context) {
  const [frag, push] = buildCodeFragment();
  push(NEWLINE);
  for (const scriptCppBlock of scriptCppBlocks) {
    push(
      `const ${scriptCppBlock.module} = ${context.helper(`createUserClass`)}<${scriptCppBlock.className}>()`
    );
  }
  return frag;
}

function createDom2CompilerError(msg, loc) {
  const error = new SyntaxError(msg);
  if (loc) {
    error.loc = {
      start: { ...loc.start },
      end: { ...loc.end },
      source: loc.source
    };
  }
  return error;
}
function createDom2StaticStyleCompilerError(msg, loc) {
  const error = createDom2CompilerError(msg, loc);
  error.errorType = "css";
  return error;
}
function createDom2StaticPropCompilerError(msg, loc) {
  const error = createDom2CompilerError(msg, loc);
  error.errorType = "prop";
  return error;
}
const Dom2ErrorMessages = {
  [1e4]: "Text or interpolation can only be used inside <text> tag.",
  [10001]: "A <text> element can only contain one text node."
};
function createDom2TextCompilerError(code, loc, additionalMessage) {
  let message = Dom2ErrorMessages[code];
  return createDom2CompilerError(message, loc);
}

function isTextTag(element) {
  return element.type === 1 && element.tagType === 0 && element.tag === "text";
}
function isViewTag(element) {
  return element.type === 1 && element.tagType === 0 && element.tag === "view";
}
function isRealParent(element) {
  return element.tagType === 0 || element.tagType === 1;
}
function createTextWrapper(node) {
  return node;
}
function transformTextNodes(root, options) {
  function processChildren(children, parent, realParent) {
    var _a, _b;
    const currentRealParent = isRealParent(parent) ? parent : realParent;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.type === 2 || child.type === 5) {
        if (!currentRealParent) {
          (_a = options.onError) == null ? void 0 : _a.call(
            options,
            createDom2TextCompilerError(
              1e4,
              child.loc
            )
          );
        } else if (!isTextTag(currentRealParent) && // 自定义组件允许直接包含文本内容，不需要自动包裹
        currentRealParent.tagType !== 1) {
          if (isViewTag(currentRealParent)) {
            const wrapper = createTextWrapper(
              child
            );
            children[i] = wrapper;
          } else {
            (_b = options.onError) == null ? void 0 : _b.call(
              options,
              createDom2TextCompilerError(
                1e4,
                child.loc
              )
            );
          }
        }
      } else if (child.type === 1) {
        traverseNode(child, currentRealParent);
      }
    }
  }
  function traverseNode(node, realParent = null) {
    var _a, _b;
    if (node.type === 1) {
      const element = node;
      if (element.tag === "text") {
        let childTextNodeCount = 0;
        let inTextNode = false;
        for (let i = 0; i < element.children.length; i++) {
          const child = element.children[i];
          if (child.type === 2) {
            if (!inTextNode) {
              inTextNode = true;
              childTextNodeCount++;
              if (childTextNodeCount > 1) {
                (_a = options.onError) == null ? void 0 : _a.call(
                  options,
                  createDom2TextCompilerError(
                    10001,
                    element.loc
                  )
                );
                break;
              }
            }
          } else if (child.type === 1) {
            inTextNode = false;
          }
        }
      }
      processChildren(element.children, element, realParent);
    } else if (node.type === 0) {
      const rootNode = node;
      for (let i = 0; i < rootNode.children.length; i++) {
        const child = rootNode.children[i];
        if (child.type === 2 || child.type === 5) {
          (_b = options.onError) == null ? void 0 : _b.call(
            options,
            createDom2TextCompilerError(
              1e4,
              child.loc
            )
          );
        } else if (child.type === 1) {
          traverseNode(child, null);
        }
      }
    }
  }
  traverseNode(root);
}

const sharedDataCache = /* @__PURE__ */ new Map();
function getSharedDataResult(key) {
  return sharedDataCache.get(key) || {
    className: "",
    scriptCppBlocks: [],
    renderElementCode: "",
    renderNativeViewCode: "",
    renderElementSourceMap: null,
    renderNativeViewSourceMap: null
  };
}
function emitSharedData(filename, className, element, nativeView, scriptCppBlocks) {
  sharedDataCache.set(filename, {
    className,
    scriptCppBlocks,
    renderElementCode: element.code,
    renderElementSourceMap: element.map,
    renderNativeViewCode: nativeView.code,
    renderNativeViewSourceMap: nativeView.map
  });
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var picocolors = {exports: {}};

var hasRequiredPicocolors;

function requirePicocolors () {
	if (hasRequiredPicocolors) return picocolors.exports;
	hasRequiredPicocolors = 1;
	let p = process || {}, argv = p.argv || [], env = p.env || {};
	let isColorSupported =
		!(!!env.NO_COLOR || argv.includes("--no-color")) &&
		(!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || ((p.stdout || {}).isTTY && env.TERM !== "dumb") || !!env.CI);

	let formatter = (open, close, replace = open) =>
		input => {
			let string = "" + input, index = string.indexOf(close, open.length);
			return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close
		};

	let replaceClose = (string, close, replace, index) => {
		let result = "", cursor = 0;
		do {
			result += string.substring(cursor, index) + replace;
			cursor = index + close.length;
			index = string.indexOf(close, cursor);
		} while (~index)
		return result + string.substring(cursor)
	};

	let createColors = (enabled = isColorSupported) => {
		let f = enabled ? formatter : () => String;
		return {
			isColorSupported: enabled,
			reset: f("\x1b[0m", "\x1b[0m"),
			bold: f("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m"),
			dim: f("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m"),
			italic: f("\x1b[3m", "\x1b[23m"),
			underline: f("\x1b[4m", "\x1b[24m"),
			inverse: f("\x1b[7m", "\x1b[27m"),
			hidden: f("\x1b[8m", "\x1b[28m"),
			strikethrough: f("\x1b[9m", "\x1b[29m"),

			black: f("\x1b[30m", "\x1b[39m"),
			red: f("\x1b[31m", "\x1b[39m"),
			green: f("\x1b[32m", "\x1b[39m"),
			yellow: f("\x1b[33m", "\x1b[39m"),
			blue: f("\x1b[34m", "\x1b[39m"),
			magenta: f("\x1b[35m", "\x1b[39m"),
			cyan: f("\x1b[36m", "\x1b[39m"),
			white: f("\x1b[37m", "\x1b[39m"),
			gray: f("\x1b[90m", "\x1b[39m"),

			bgBlack: f("\x1b[40m", "\x1b[49m"),
			bgRed: f("\x1b[41m", "\x1b[49m"),
			bgGreen: f("\x1b[42m", "\x1b[49m"),
			bgYellow: f("\x1b[43m", "\x1b[49m"),
			bgBlue: f("\x1b[44m", "\x1b[49m"),
			bgMagenta: f("\x1b[45m", "\x1b[49m"),
			bgCyan: f("\x1b[46m", "\x1b[49m"),
			bgWhite: f("\x1b[47m", "\x1b[49m"),

			blackBright: f("\x1b[90m", "\x1b[39m"),
			redBright: f("\x1b[91m", "\x1b[39m"),
			greenBright: f("\x1b[92m", "\x1b[39m"),
			yellowBright: f("\x1b[93m", "\x1b[39m"),
			blueBright: f("\x1b[94m", "\x1b[39m"),
			magentaBright: f("\x1b[95m", "\x1b[39m"),
			cyanBright: f("\x1b[96m", "\x1b[39m"),
			whiteBright: f("\x1b[97m", "\x1b[39m"),

			bgBlackBright: f("\x1b[100m", "\x1b[49m"),
			bgRedBright: f("\x1b[101m", "\x1b[49m"),
			bgGreenBright: f("\x1b[102m", "\x1b[49m"),
			bgYellowBright: f("\x1b[103m", "\x1b[49m"),
			bgBlueBright: f("\x1b[104m", "\x1b[49m"),
			bgMagentaBright: f("\x1b[105m", "\x1b[49m"),
			bgCyanBright: f("\x1b[106m", "\x1b[49m"),
			bgWhiteBright: f("\x1b[107m", "\x1b[49m"),
		}
	};

	picocolors.exports = createColors();
	picocolors.exports.createColors = createColors;
	return picocolors.exports;
}

var tokenize;
var hasRequiredTokenize;

function requireTokenize () {
	if (hasRequiredTokenize) return tokenize;
	hasRequiredTokenize = 1;

	const SINGLE_QUOTE = "'".charCodeAt(0);
	const DOUBLE_QUOTE = '"'.charCodeAt(0);
	const BACKSLASH = '\\'.charCodeAt(0);
	const SLASH = '/'.charCodeAt(0);
	const NEWLINE = '\n'.charCodeAt(0);
	const SPACE = ' '.charCodeAt(0);
	const FEED = '\f'.charCodeAt(0);
	const TAB = '\t'.charCodeAt(0);
	const CR = '\r'.charCodeAt(0);
	const OPEN_SQUARE = '['.charCodeAt(0);
	const CLOSE_SQUARE = ']'.charCodeAt(0);
	const OPEN_PARENTHESES = '('.charCodeAt(0);
	const CLOSE_PARENTHESES = ')'.charCodeAt(0);
	const OPEN_CURLY = '{'.charCodeAt(0);
	const CLOSE_CURLY = '}'.charCodeAt(0);
	const SEMICOLON = ';'.charCodeAt(0);
	const ASTERISK = '*'.charCodeAt(0);
	const COLON = ':'.charCodeAt(0);
	const AT = '@'.charCodeAt(0);

	const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
	const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
	const RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
	const RE_HEX_ESCAPE = /[\da-f]/i;

	tokenize = function tokenizer(input, options = {}) {
	  let css = input.css.valueOf();
	  let ignore = options.ignoreErrors;

	  let code, content, escape, next, quote;
	  let currentToken, escaped, escapePos, n, prev;

	  let length = css.length;
	  let pos = 0;
	  let buffer = [];
	  let returned = [];

	  function position() {
	    return pos
	  }

	  function unclosed(what) {
	    throw input.error('Unclosed ' + what, pos)
	  }

	  function endOfFile() {
	    return returned.length === 0 && pos >= length
	  }

	  function nextToken(opts) {
	    if (returned.length) return returned.pop()
	    if (pos >= length) return

	    let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;

	    code = css.charCodeAt(pos);

	    switch (code) {
	      case NEWLINE:
	      case SPACE:
	      case TAB:
	      case CR:
	      case FEED: {
	        next = pos;
	        do {
	          next += 1;
	          code = css.charCodeAt(next);
	        } while (
	          code === SPACE ||
	          code === NEWLINE ||
	          code === TAB ||
	          code === CR ||
	          code === FEED
	        )

	        currentToken = ['space', css.slice(pos, next)];
	        pos = next - 1;
	        break
	      }

	      case OPEN_SQUARE:
	      case CLOSE_SQUARE:
	      case OPEN_CURLY:
	      case CLOSE_CURLY:
	      case COLON:
	      case SEMICOLON:
	      case CLOSE_PARENTHESES: {
	        let controlChar = String.fromCharCode(code);
	        currentToken = [controlChar, controlChar, pos];
	        break
	      }

	      case OPEN_PARENTHESES: {
	        prev = buffer.length ? buffer.pop()[1] : '';
	        n = css.charCodeAt(pos + 1);
	        if (
	          prev === 'url' &&
	          n !== SINGLE_QUOTE &&
	          n !== DOUBLE_QUOTE &&
	          n !== SPACE &&
	          n !== NEWLINE &&
	          n !== TAB &&
	          n !== FEED &&
	          n !== CR
	        ) {
	          next = pos;
	          do {
	            escaped = false;
	            next = css.indexOf(')', next + 1);
	            if (next === -1) {
	              if (ignore || ignoreUnclosed) {
	                next = pos;
	                break
	              } else {
	                unclosed('bracket');
	              }
	            }
	            escapePos = next;
	            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
	              escapePos -= 1;
	              escaped = !escaped;
	            }
	          } while (escaped)

	          currentToken = ['brackets', css.slice(pos, next + 1), pos, next];

	          pos = next;
	        } else {
	          next = css.indexOf(')', pos + 1);
	          content = css.slice(pos, next + 1);

	          if (next === -1 || RE_BAD_BRACKET.test(content)) {
	            currentToken = ['(', '(', pos];
	          } else {
	            currentToken = ['brackets', content, pos, next];
	            pos = next;
	          }
	        }

	        break
	      }

	      case SINGLE_QUOTE:
	      case DOUBLE_QUOTE: {
	        quote = code === SINGLE_QUOTE ? "'" : '"';
	        next = pos;
	        do {
	          escaped = false;
	          next = css.indexOf(quote, next + 1);
	          if (next === -1) {
	            if (ignore || ignoreUnclosed) {
	              next = pos + 1;
	              break
	            } else {
	              unclosed('string');
	            }
	          }
	          escapePos = next;
	          while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
	            escapePos -= 1;
	            escaped = !escaped;
	          }
	        } while (escaped)

	        currentToken = ['string', css.slice(pos, next + 1), pos, next];
	        pos = next;
	        break
	      }

	      case AT: {
	        RE_AT_END.lastIndex = pos + 1;
	        RE_AT_END.test(css);
	        if (RE_AT_END.lastIndex === 0) {
	          next = css.length - 1;
	        } else {
	          next = RE_AT_END.lastIndex - 2;
	        }

	        currentToken = ['at-word', css.slice(pos, next + 1), pos, next];

	        pos = next;
	        break
	      }

	      case BACKSLASH: {
	        next = pos;
	        escape = true;
	        while (css.charCodeAt(next + 1) === BACKSLASH) {
	          next += 1;
	          escape = !escape;
	        }
	        code = css.charCodeAt(next + 1);
	        if (
	          escape &&
	          code !== SLASH &&
	          code !== SPACE &&
	          code !== NEWLINE &&
	          code !== TAB &&
	          code !== CR &&
	          code !== FEED
	        ) {
	          next += 1;
	          if (RE_HEX_ESCAPE.test(css.charAt(next))) {
	            while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
	              next += 1;
	            }
	            if (css.charCodeAt(next + 1) === SPACE) {
	              next += 1;
	            }
	          }
	        }

	        currentToken = ['word', css.slice(pos, next + 1), pos, next];

	        pos = next;
	        break
	      }

	      default: {
	        if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
	          next = css.indexOf('*/', pos + 2) + 1;
	          if (next === 0) {
	            if (ignore || ignoreUnclosed) {
	              next = css.length;
	            } else {
	              unclosed('comment');
	            }
	          }

	          currentToken = ['comment', css.slice(pos, next + 1), pos, next];
	          pos = next;
	        } else {
	          RE_WORD_END.lastIndex = pos + 1;
	          RE_WORD_END.test(css);
	          if (RE_WORD_END.lastIndex === 0) {
	            next = css.length - 1;
	          } else {
	            next = RE_WORD_END.lastIndex - 2;
	          }

	          currentToken = ['word', css.slice(pos, next + 1), pos, next];
	          buffer.push(currentToken);
	          pos = next;
	        }

	        break
	      }
	    }

	    pos++;
	    return currentToken
	  }

	  function back(token) {
	    returned.push(token);
	  }

	  return {
	    back,
	    endOfFile,
	    nextToken,
	    position
	  }
	};
	return tokenize;
}

var terminalHighlight_1;
var hasRequiredTerminalHighlight;

function requireTerminalHighlight () {
	if (hasRequiredTerminalHighlight) return terminalHighlight_1;
	hasRequiredTerminalHighlight = 1;

	let pico = /*@__PURE__*/ requirePicocolors();

	let tokenizer = /*@__PURE__*/ requireTokenize();

	let Input;

	function registerInput(dependant) {
	  Input = dependant;
	}

	const HIGHLIGHT_THEME = {
	  ';': pico.yellow,
	  ':': pico.yellow,
	  '(': pico.cyan,
	  ')': pico.cyan,
	  '[': pico.yellow,
	  ']': pico.yellow,
	  '{': pico.yellow,
	  '}': pico.yellow,
	  'at-word': pico.cyan,
	  'brackets': pico.cyan,
	  'call': pico.cyan,
	  'class': pico.yellow,
	  'comment': pico.gray,
	  'hash': pico.magenta,
	  'string': pico.green
	};

	function getTokenType([type, value], processor) {
	  if (type === 'word') {
	    if (value[0] === '.') {
	      return 'class'
	    }
	    if (value[0] === '#') {
	      return 'hash'
	    }
	  }

	  if (!processor.endOfFile()) {
	    let next = processor.nextToken();
	    processor.back(next);
	    if (next[0] === 'brackets' || next[0] === '(') return 'call'
	  }

	  return type
	}

	function terminalHighlight(css) {
	  let processor = tokenizer(new Input(css), { ignoreErrors: true });
	  let result = '';
	  while (!processor.endOfFile()) {
	    let token = processor.nextToken();
	    let color = HIGHLIGHT_THEME[getTokenType(token, processor)];
	    if (color) {
	      result += token[1]
	        .split(/\r?\n/)
	        .map(i => color(i))
	        .join('\n');
	    } else {
	      result += token[1];
	    }
	  }
	  return result
	}

	terminalHighlight.registerInput = registerInput;

	terminalHighlight_1 = terminalHighlight;
	return terminalHighlight_1;
}

var cssSyntaxError;
var hasRequiredCssSyntaxError;

function requireCssSyntaxError () {
	if (hasRequiredCssSyntaxError) return cssSyntaxError;
	hasRequiredCssSyntaxError = 1;

	let pico = /*@__PURE__*/ requirePicocolors();

	let terminalHighlight = /*@__PURE__*/ requireTerminalHighlight();

	class CssSyntaxError extends Error {
	  constructor(message, line, column, source, file, plugin) {
	    super(message);
	    this.name = 'CssSyntaxError';
	    this.reason = message;

	    if (file) {
	      this.file = file;
	    }
	    if (source) {
	      this.source = source;
	    }
	    if (plugin) {
	      this.plugin = plugin;
	    }
	    if (typeof line !== 'undefined' && typeof column !== 'undefined') {
	      if (typeof line === 'number') {
	        this.line = line;
	        this.column = column;
	      } else {
	        this.line = line.line;
	        this.column = line.column;
	        this.endLine = column.line;
	        this.endColumn = column.column;
	      }
	    }

	    this.setMessage();

	    if (Error.captureStackTrace) {
	      Error.captureStackTrace(this, CssSyntaxError);
	    }
	  }

	  setMessage() {
	    this.message = this.plugin ? this.plugin + ': ' : '';
	    this.message += this.file ? this.file : '<css input>';
	    if (typeof this.line !== 'undefined') {
	      this.message += ':' + this.line + ':' + this.column;
	    }
	    this.message += ': ' + this.reason;
	  }

	  showSourceCode(color) {
	    if (!this.source) return ''

	    let css = this.source;
	    if (color == null) color = pico.isColorSupported;

	    let aside = text => text;
	    let mark = text => text;
	    let highlight = text => text;
	    if (color) {
	      let { bold, gray, red } = pico.createColors(true);
	      mark = text => bold(red(text));
	      aside = text => gray(text);
	      if (terminalHighlight) {
	        highlight = text => terminalHighlight(text);
	      }
	    }

	    let lines = css.split(/\r?\n/);
	    let start = Math.max(this.line - 3, 0);
	    let end = Math.min(this.line + 2, lines.length);
	    let maxWidth = String(end).length;

	    return lines
	      .slice(start, end)
	      .map((line, index) => {
	        let number = start + 1 + index;
	        let gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | ';
	        if (number === this.line) {
	          if (line.length > 160) {
	            let padding = 20;
	            let subLineStart = Math.max(0, this.column - padding);
	            let subLineEnd = Math.max(
	              this.column + padding,
	              this.endColumn + padding
	            );
	            let subLine = line.slice(subLineStart, subLineEnd);

	            let spacing =
	              aside(gutter.replace(/\d/g, ' ')) +
	              line
	                .slice(0, Math.min(this.column - 1, padding - 1))
	                .replace(/[^\t]/g, ' ');

	            return (
	              mark('>') +
	              aside(gutter) +
	              highlight(subLine) +
	              '\n ' +
	              spacing +
	              mark('^')
	            )
	          }

	          let spacing =
	            aside(gutter.replace(/\d/g, ' ')) +
	            line.slice(0, this.column - 1).replace(/[^\t]/g, ' ');

	          return (
	            mark('>') +
	            aside(gutter) +
	            highlight(line) +
	            '\n ' +
	            spacing +
	            mark('^')
	          )
	        }

	        return ' ' + aside(gutter) + highlight(line)
	      })
	      .join('\n')
	  }

	  toString() {
	    let code = this.showSourceCode();
	    if (code) {
	      code = '\n\n' + code + '\n';
	    }
	    return this.name + ': ' + this.message + code
	  }
	}

	cssSyntaxError = CssSyntaxError;
	CssSyntaxError.default = CssSyntaxError;
	return cssSyntaxError;
}

var stringifier;
var hasRequiredStringifier;

function requireStringifier () {
	if (hasRequiredStringifier) return stringifier;
	hasRequiredStringifier = 1;

	const DEFAULT_RAW = {
	  after: '\n',
	  beforeClose: '\n',
	  beforeComment: '\n',
	  beforeDecl: '\n',
	  beforeOpen: ' ',
	  beforeRule: '\n',
	  colon: ': ',
	  commentLeft: ' ',
	  commentRight: ' ',
	  emptyBody: '',
	  indent: '    ',
	  semicolon: false
	};

	function capitalize(str) {
	  return str[0].toUpperCase() + str.slice(1)
	}

	class Stringifier {
	  constructor(builder) {
	    this.builder = builder;
	  }

	  atrule(node, semicolon) {
	    let name = '@' + node.name;
	    let params = node.params ? this.rawValue(node, 'params') : '';

	    if (typeof node.raws.afterName !== 'undefined') {
	      name += node.raws.afterName;
	    } else if (params) {
	      name += ' ';
	    }

	    if (node.nodes) {
	      this.block(node, name + params);
	    } else {
	      let end = (node.raws.between || '') + (semicolon ? ';' : '');
	      this.builder(name + params + end, node);
	    }
	  }

	  beforeAfter(node, detect) {
	    let value;
	    if (node.type === 'decl') {
	      value = this.raw(node, null, 'beforeDecl');
	    } else if (node.type === 'comment') {
	      value = this.raw(node, null, 'beforeComment');
	    } else if (detect === 'before') {
	      value = this.raw(node, null, 'beforeRule');
	    } else {
	      value = this.raw(node, null, 'beforeClose');
	    }

	    let buf = node.parent;
	    let depth = 0;
	    while (buf && buf.type !== 'root') {
	      depth += 1;
	      buf = buf.parent;
	    }

	    if (value.includes('\n')) {
	      let indent = this.raw(node, null, 'indent');
	      if (indent.length) {
	        for (let step = 0; step < depth; step++) value += indent;
	      }
	    }

	    return value
	  }

	  block(node, start) {
	    let between = this.raw(node, 'between', 'beforeOpen');
	    this.builder(start + between + '{', node, 'start');

	    let after;
	    if (node.nodes && node.nodes.length) {
	      this.body(node);
	      after = this.raw(node, 'after');
	    } else {
	      after = this.raw(node, 'after', 'emptyBody');
	    }

	    if (after) this.builder(after);
	    this.builder('}', node, 'end');
	  }

	  body(node) {
	    let last = node.nodes.length - 1;
	    while (last > 0) {
	      if (node.nodes[last].type !== 'comment') break
	      last -= 1;
	    }

	    let semicolon = this.raw(node, 'semicolon');
	    for (let i = 0; i < node.nodes.length; i++) {
	      let child = node.nodes[i];
	      let before = this.raw(child, 'before');
	      if (before) this.builder(before);
	      this.stringify(child, last !== i || semicolon);
	    }
	  }

	  comment(node) {
	    let left = this.raw(node, 'left', 'commentLeft');
	    let right = this.raw(node, 'right', 'commentRight');
	    this.builder('/*' + left + node.text + right + '*/', node);
	  }

	  decl(node, semicolon) {
	    let between = this.raw(node, 'between', 'colon');
	    let string = node.prop + between + this.rawValue(node, 'value');

	    if (node.important) {
	      string += node.raws.important || ' !important';
	    }

	    if (semicolon) string += ';';
	    this.builder(string, node);
	  }

	  document(node) {
	    this.body(node);
	  }

	  raw(node, own, detect) {
	    let value;
	    if (!detect) detect = own;

	    // Already had
	    if (own) {
	      value = node.raws[own];
	      if (typeof value !== 'undefined') return value
	    }

	    let parent = node.parent;

	    if (detect === 'before') {
	      // Hack for first rule in CSS
	      if (!parent || (parent.type === 'root' && parent.first === node)) {
	        return ''
	      }

	      // `root` nodes in `document` should use only their own raws
	      if (parent && parent.type === 'document') {
	        return ''
	      }
	    }

	    // Floating child without parent
	    if (!parent) return DEFAULT_RAW[detect]

	    // Detect style by other nodes
	    let root = node.root();
	    if (!root.rawCache) root.rawCache = {};
	    if (typeof root.rawCache[detect] !== 'undefined') {
	      return root.rawCache[detect]
	    }

	    if (detect === 'before' || detect === 'after') {
	      return this.beforeAfter(node, detect)
	    } else {
	      let method = 'raw' + capitalize(detect);
	      if (this[method]) {
	        value = this[method](root, node);
	      } else {
	        root.walk(i => {
	          value = i.raws[own];
	          if (typeof value !== 'undefined') return false
	        });
	      }
	    }

	    if (typeof value === 'undefined') value = DEFAULT_RAW[detect];

	    root.rawCache[detect] = value;
	    return value
	  }

	  rawBeforeClose(root) {
	    let value;
	    root.walk(i => {
	      if (i.nodes && i.nodes.length > 0) {
	        if (typeof i.raws.after !== 'undefined') {
	          value = i.raws.after;
	          if (value.includes('\n')) {
	            value = value.replace(/[^\n]+$/, '');
	          }
	          return false
	        }
	      }
	    });
	    if (value) value = value.replace(/\S/g, '');
	    return value
	  }

	  rawBeforeComment(root, node) {
	    let value;
	    root.walkComments(i => {
	      if (typeof i.raws.before !== 'undefined') {
	        value = i.raws.before;
	        if (value.includes('\n')) {
	          value = value.replace(/[^\n]+$/, '');
	        }
	        return false
	      }
	    });
	    if (typeof value === 'undefined') {
	      value = this.raw(node, null, 'beforeDecl');
	    } else if (value) {
	      value = value.replace(/\S/g, '');
	    }
	    return value
	  }

	  rawBeforeDecl(root, node) {
	    let value;
	    root.walkDecls(i => {
	      if (typeof i.raws.before !== 'undefined') {
	        value = i.raws.before;
	        if (value.includes('\n')) {
	          value = value.replace(/[^\n]+$/, '');
	        }
	        return false
	      }
	    });
	    if (typeof value === 'undefined') {
	      value = this.raw(node, null, 'beforeRule');
	    } else if (value) {
	      value = value.replace(/\S/g, '');
	    }
	    return value
	  }

	  rawBeforeOpen(root) {
	    let value;
	    root.walk(i => {
	      if (i.type !== 'decl') {
	        value = i.raws.between;
	        if (typeof value !== 'undefined') return false
	      }
	    });
	    return value
	  }

	  rawBeforeRule(root) {
	    let value;
	    root.walk(i => {
	      if (i.nodes && (i.parent !== root || root.first !== i)) {
	        if (typeof i.raws.before !== 'undefined') {
	          value = i.raws.before;
	          if (value.includes('\n')) {
	            value = value.replace(/[^\n]+$/, '');
	          }
	          return false
	        }
	      }
	    });
	    if (value) value = value.replace(/\S/g, '');
	    return value
	  }

	  rawColon(root) {
	    let value;
	    root.walkDecls(i => {
	      if (typeof i.raws.between !== 'undefined') {
	        value = i.raws.between.replace(/[^\s:]/g, '');
	        return false
	      }
	    });
	    return value
	  }

	  rawEmptyBody(root) {
	    let value;
	    root.walk(i => {
	      if (i.nodes && i.nodes.length === 0) {
	        value = i.raws.after;
	        if (typeof value !== 'undefined') return false
	      }
	    });
	    return value
	  }

	  rawIndent(root) {
	    if (root.raws.indent) return root.raws.indent
	    let value;
	    root.walk(i => {
	      let p = i.parent;
	      if (p && p !== root && p.parent && p.parent === root) {
	        if (typeof i.raws.before !== 'undefined') {
	          let parts = i.raws.before.split('\n');
	          value = parts[parts.length - 1];
	          value = value.replace(/\S/g, '');
	          return false
	        }
	      }
	    });
	    return value
	  }

	  rawSemicolon(root) {
	    let value;
	    root.walk(i => {
	      if (i.nodes && i.nodes.length && i.last.type === 'decl') {
	        value = i.raws.semicolon;
	        if (typeof value !== 'undefined') return false
	      }
	    });
	    return value
	  }

	  rawValue(node, prop) {
	    let value = node[prop];
	    let raw = node.raws[prop];
	    if (raw && raw.value === value) {
	      return raw.raw
	    }

	    return value
	  }

	  root(node) {
	    this.body(node);
	    if (node.raws.after) this.builder(node.raws.after);
	  }

	  rule(node) {
	    this.block(node, this.rawValue(node, 'selector'));
	    if (node.raws.ownSemicolon) {
	      this.builder(node.raws.ownSemicolon, node, 'end');
	    }
	  }

	  stringify(node, semicolon) {
	    /* c8 ignore start */
	    if (!this[node.type]) {
	      throw new Error(
	        'Unknown AST node type ' +
	          node.type +
	          '. ' +
	          'Maybe you need to change PostCSS stringifier.'
	      )
	    }
	    /* c8 ignore stop */
	    this[node.type](node, semicolon);
	  }
	}

	stringifier = Stringifier;
	Stringifier.default = Stringifier;
	return stringifier;
}

var stringify_1;
var hasRequiredStringify;

function requireStringify () {
	if (hasRequiredStringify) return stringify_1;
	hasRequiredStringify = 1;

	let Stringifier = /*@__PURE__*/ requireStringifier();

	function stringify(node, builder) {
	  let str = new Stringifier(builder);
	  str.stringify(node);
	}

	stringify_1 = stringify;
	stringify.default = stringify;
	return stringify_1;
}

var symbols = {};

var hasRequiredSymbols;

function requireSymbols () {
	if (hasRequiredSymbols) return symbols;
	hasRequiredSymbols = 1;

	symbols.isClean = Symbol('isClean');

	symbols.my = Symbol('my');
	return symbols;
}

var node;
var hasRequiredNode;

function requireNode () {
	if (hasRequiredNode) return node;
	hasRequiredNode = 1;

	let CssSyntaxError = /*@__PURE__*/ requireCssSyntaxError();
	let Stringifier = /*@__PURE__*/ requireStringifier();
	let stringify = /*@__PURE__*/ requireStringify();
	let { isClean, my } = /*@__PURE__*/ requireSymbols();

	function cloneNode(obj, parent) {
	  let cloned = new obj.constructor();

	  for (let i in obj) {
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) {
	      /* c8 ignore next 2 */
	      continue
	    }
	    if (i === 'proxyCache') continue
	    let value = obj[i];
	    let type = typeof value;

	    if (i === 'parent' && type === 'object') {
	      if (parent) cloned[i] = parent;
	    } else if (i === 'source') {
	      cloned[i] = value;
	    } else if (Array.isArray(value)) {
	      cloned[i] = value.map(j => cloneNode(j, cloned));
	    } else {
	      if (type === 'object' && value !== null) value = cloneNode(value);
	      cloned[i] = value;
	    }
	  }

	  return cloned
	}

	function sourceOffset(inputCSS, position) {
	  // Not all custom syntaxes support `offset` in `source.start` and `source.end`
	  if (position && typeof position.offset !== 'undefined') {
	    return position.offset
	  }

	  let column = 1;
	  let line = 1;
	  let offset = 0;

	  for (let i = 0; i < inputCSS.length; i++) {
	    if (line === position.line && column === position.column) {
	      offset = i;
	      break
	    }

	    if (inputCSS[i] === '\n') {
	      column = 1;
	      line += 1;
	    } else {
	      column += 1;
	    }
	  }

	  return offset
	}

	class Node {
	  get proxyOf() {
	    return this
	  }

	  constructor(defaults = {}) {
	    this.raws = {};
	    this[isClean] = false;
	    this[my] = true;

	    for (let name in defaults) {
	      if (name === 'nodes') {
	        this.nodes = [];
	        for (let node of defaults[name]) {
	          if (typeof node.clone === 'function') {
	            this.append(node.clone());
	          } else {
	            this.append(node);
	          }
	        }
	      } else {
	        this[name] = defaults[name];
	      }
	    }
	  }

	  addToError(error) {
	    error.postcssNode = this;
	    if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
	      let s = this.source;
	      error.stack = error.stack.replace(
	        /\n\s{4}at /,
	        `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
	      );
	    }
	    return error
	  }

	  after(add) {
	    this.parent.insertAfter(this, add);
	    return this
	  }

	  assign(overrides = {}) {
	    for (let name in overrides) {
	      this[name] = overrides[name];
	    }
	    return this
	  }

	  before(add) {
	    this.parent.insertBefore(this, add);
	    return this
	  }

	  cleanRaws(keepBetween) {
	    delete this.raws.before;
	    delete this.raws.after;
	    if (!keepBetween) delete this.raws.between;
	  }

	  clone(overrides = {}) {
	    let cloned = cloneNode(this);
	    for (let name in overrides) {
	      cloned[name] = overrides[name];
	    }
	    return cloned
	  }

	  cloneAfter(overrides = {}) {
	    let cloned = this.clone(overrides);
	    this.parent.insertAfter(this, cloned);
	    return cloned
	  }

	  cloneBefore(overrides = {}) {
	    let cloned = this.clone(overrides);
	    this.parent.insertBefore(this, cloned);
	    return cloned
	  }

	  error(message, opts = {}) {
	    if (this.source) {
	      let { end, start } = this.rangeBy(opts);
	      return this.source.input.error(
	        message,
	        { column: start.column, line: start.line },
	        { column: end.column, line: end.line },
	        opts
	      )
	    }
	    return new CssSyntaxError(message)
	  }

	  getProxyProcessor() {
	    return {
	      get(node, prop) {
	        if (prop === 'proxyOf') {
	          return node
	        } else if (prop === 'root') {
	          return () => node.root().toProxy()
	        } else {
	          return node[prop]
	        }
	      },

	      set(node, prop, value) {
	        if (node[prop] === value) return true
	        node[prop] = value;
	        if (
	          prop === 'prop' ||
	          prop === 'value' ||
	          prop === 'name' ||
	          prop === 'params' ||
	          prop === 'important' ||
	          /* c8 ignore next */
	          prop === 'text'
	        ) {
	          node.markDirty();
	        }
	        return true
	      }
	    }
	  }

	  /* c8 ignore next 3 */
	  markClean() {
	    this[isClean] = true;
	  }

	  markDirty() {
	    if (this[isClean]) {
	      this[isClean] = false;
	      let next = this;
	      while ((next = next.parent)) {
	        next[isClean] = false;
	      }
	    }
	  }

	  next() {
	    if (!this.parent) return undefined
	    let index = this.parent.index(this);
	    return this.parent.nodes[index + 1]
	  }

	  positionBy(opts = {}) {
	    let pos = this.source.start;
	    if (opts.index) {
	      pos = this.positionInside(opts.index);
	    } else if (opts.word) {
	      let inputString =
	        'document' in this.source.input
	          ? this.source.input.document
	          : this.source.input.css;
	      let stringRepresentation = inputString.slice(
	        sourceOffset(inputString, this.source.start),
	        sourceOffset(inputString, this.source.end)
	      );
	      let index = stringRepresentation.indexOf(opts.word);
	      if (index !== -1) pos = this.positionInside(index);
	    }
	    return pos
	  }

	  positionInside(index) {
	    let column = this.source.start.column;
	    let line = this.source.start.line;
	    let inputString =
	      'document' in this.source.input
	        ? this.source.input.document
	        : this.source.input.css;
	    let offset = sourceOffset(inputString, this.source.start);
	    let end = offset + index;

	    for (let i = offset; i < end; i++) {
	      if (inputString[i] === '\n') {
	        column = 1;
	        line += 1;
	      } else {
	        column += 1;
	      }
	    }

	    return { column, line, offset: end }
	  }

	  prev() {
	    if (!this.parent) return undefined
	    let index = this.parent.index(this);
	    return this.parent.nodes[index - 1]
	  }

	  rangeBy(opts = {}) {
	    let inputString =
	      'document' in this.source.input
	        ? this.source.input.document
	        : this.source.input.css;
	    let start = {
	      column: this.source.start.column,
	      line: this.source.start.line,
	      offset: sourceOffset(inputString, this.source.start)
	    };
	    let end = this.source.end
	      ? {
	          column: this.source.end.column + 1,
	          line: this.source.end.line,
	          offset:
	            typeof this.source.end.offset === 'number'
	              ? // `source.end.offset` is exclusive, so we don't need to add 1
	                this.source.end.offset
	              : // Since line/column in this.source.end is inclusive,
	                // the `sourceOffset(... , this.source.end)` returns an inclusive offset.
	                // So, we add 1 to convert it to exclusive.
	                sourceOffset(inputString, this.source.end) + 1
	        }
	      : {
	          column: start.column + 1,
	          line: start.line,
	          offset: start.offset + 1
	        };

	    if (opts.word) {
	      let stringRepresentation = inputString.slice(
	        sourceOffset(inputString, this.source.start),
	        sourceOffset(inputString, this.source.end)
	      );
	      let index = stringRepresentation.indexOf(opts.word);
	      if (index !== -1) {
	        start = this.positionInside(index);
	        end = this.positionInside(index + opts.word.length);
	      }
	    } else {
	      if (opts.start) {
	        start = {
	          column: opts.start.column,
	          line: opts.start.line,
	          offset: sourceOffset(inputString, opts.start)
	        };
	      } else if (opts.index) {
	        start = this.positionInside(opts.index);
	      }

	      if (opts.end) {
	        end = {
	          column: opts.end.column,
	          line: opts.end.line,
	          offset: sourceOffset(inputString, opts.end)
	        };
	      } else if (typeof opts.endIndex === 'number') {
	        end = this.positionInside(opts.endIndex);
	      } else if (opts.index) {
	        end = this.positionInside(opts.index + 1);
	      }
	    }

	    if (
	      end.line < start.line ||
	      (end.line === start.line && end.column <= start.column)
	    ) {
	      end = {
	        column: start.column + 1,
	        line: start.line,
	        offset: start.offset + 1
	      };
	    }

	    return { end, start }
	  }

	  raw(prop, defaultType) {
	    let str = new Stringifier();
	    return str.raw(this, prop, defaultType)
	  }

	  remove() {
	    if (this.parent) {
	      this.parent.removeChild(this);
	    }
	    this.parent = undefined;
	    return this
	  }

	  replaceWith(...nodes) {
	    if (this.parent) {
	      let bookmark = this;
	      let foundSelf = false;
	      for (let node of nodes) {
	        if (node === this) {
	          foundSelf = true;
	        } else if (foundSelf) {
	          this.parent.insertAfter(bookmark, node);
	          bookmark = node;
	        } else {
	          this.parent.insertBefore(bookmark, node);
	        }
	      }

	      if (!foundSelf) {
	        this.remove();
	      }
	    }

	    return this
	  }

	  root() {
	    let result = this;
	    while (result.parent && result.parent.type !== 'document') {
	      result = result.parent;
	    }
	    return result
	  }

	  toJSON(_, inputs) {
	    let fixed = {};
	    let emitInputs = inputs == null;
	    inputs = inputs || new Map();
	    let inputsNextIndex = 0;

	    for (let name in this) {
	      if (!Object.prototype.hasOwnProperty.call(this, name)) {
	        /* c8 ignore next 2 */
	        continue
	      }
	      if (name === 'parent' || name === 'proxyCache') continue
	      let value = this[name];

	      if (Array.isArray(value)) {
	        fixed[name] = value.map(i => {
	          if (typeof i === 'object' && i.toJSON) {
	            return i.toJSON(null, inputs)
	          } else {
	            return i
	          }
	        });
	      } else if (typeof value === 'object' && value.toJSON) {
	        fixed[name] = value.toJSON(null, inputs);
	      } else if (name === 'source') {
	        if (value == null) continue
	        let inputId = inputs.get(value.input);
	        if (inputId == null) {
	          inputId = inputsNextIndex;
	          inputs.set(value.input, inputsNextIndex);
	          inputsNextIndex++;
	        }
	        fixed[name] = {
	          end: value.end,
	          inputId,
	          start: value.start
	        };
	      } else {
	        fixed[name] = value;
	      }
	    }

	    if (emitInputs) {
	      fixed.inputs = [...inputs.keys()].map(input => input.toJSON());
	    }

	    return fixed
	  }

	  toProxy() {
	    if (!this.proxyCache) {
	      this.proxyCache = new Proxy(this, this.getProxyProcessor());
	    }
	    return this.proxyCache
	  }

	  toString(stringifier = stringify) {
	    if (stringifier.stringify) stringifier = stringifier.stringify;
	    let result = '';
	    stringifier(this, i => {
	      result += i;
	    });
	    return result
	  }

	  warn(result, text, opts = {}) {
	    let data = { node: this };
	    for (let i in opts) data[i] = opts[i];
	    return result.warn(text, data)
	  }
	}

	node = Node;
	Node.default = Node;
	return node;
}

var comment;
var hasRequiredComment;

function requireComment () {
	if (hasRequiredComment) return comment;
	hasRequiredComment = 1;

	let Node = /*@__PURE__*/ requireNode();

	class Comment extends Node {
	  constructor(defaults) {
	    super(defaults);
	    this.type = 'comment';
	  }
	}

	comment = Comment;
	Comment.default = Comment;
	return comment;
}

var declaration;
var hasRequiredDeclaration;

function requireDeclaration () {
	if (hasRequiredDeclaration) return declaration;
	hasRequiredDeclaration = 1;

	let Node = /*@__PURE__*/ requireNode();

	class Declaration extends Node {
	  get variable() {
	    return this.prop.startsWith('--') || this.prop[0] === '$'
	  }

	  constructor(defaults) {
	    if (
	      defaults &&
	      typeof defaults.value !== 'undefined' &&
	      typeof defaults.value !== 'string'
	    ) {
	      defaults = { ...defaults, value: String(defaults.value) };
	    }
	    super(defaults);
	    this.type = 'decl';
	  }
	}

	declaration = Declaration;
	Declaration.default = Declaration;
	return declaration;
}

var container;
var hasRequiredContainer;

function requireContainer () {
	if (hasRequiredContainer) return container;
	hasRequiredContainer = 1;

	let Comment = /*@__PURE__*/ requireComment();
	let Declaration = /*@__PURE__*/ requireDeclaration();
	let Node = /*@__PURE__*/ requireNode();
	let { isClean, my } = /*@__PURE__*/ requireSymbols();

	let AtRule, parse, Root, Rule;

	function cleanSource(nodes) {
	  return nodes.map(i => {
	    if (i.nodes) i.nodes = cleanSource(i.nodes);
	    delete i.source;
	    return i
	  })
	}

	function markTreeDirty(node) {
	  node[isClean] = false;
	  if (node.proxyOf.nodes) {
	    for (let i of node.proxyOf.nodes) {
	      markTreeDirty(i);
	    }
	  }
	}

	class Container extends Node {
	  get first() {
	    if (!this.proxyOf.nodes) return undefined
	    return this.proxyOf.nodes[0]
	  }

	  get last() {
	    if (!this.proxyOf.nodes) return undefined
	    return this.proxyOf.nodes[this.proxyOf.nodes.length - 1]
	  }

	  append(...children) {
	    for (let child of children) {
	      let nodes = this.normalize(child, this.last);
	      for (let node of nodes) this.proxyOf.nodes.push(node);
	    }

	    this.markDirty();

	    return this
	  }

	  cleanRaws(keepBetween) {
	    super.cleanRaws(keepBetween);
	    if (this.nodes) {
	      for (let node of this.nodes) node.cleanRaws(keepBetween);
	    }
	  }

	  each(callback) {
	    if (!this.proxyOf.nodes) return undefined
	    let iterator = this.getIterator();

	    let index, result;
	    while (this.indexes[iterator] < this.proxyOf.nodes.length) {
	      index = this.indexes[iterator];
	      result = callback(this.proxyOf.nodes[index], index);
	      if (result === false) break

	      this.indexes[iterator] += 1;
	    }

	    delete this.indexes[iterator];
	    return result
	  }

	  every(condition) {
	    return this.nodes.every(condition)
	  }

	  getIterator() {
	    if (!this.lastEach) this.lastEach = 0;
	    if (!this.indexes) this.indexes = {};

	    this.lastEach += 1;
	    let iterator = this.lastEach;
	    this.indexes[iterator] = 0;

	    return iterator
	  }

	  getProxyProcessor() {
	    return {
	      get(node, prop) {
	        if (prop === 'proxyOf') {
	          return node
	        } else if (!node[prop]) {
	          return node[prop]
	        } else if (
	          prop === 'each' ||
	          (typeof prop === 'string' && prop.startsWith('walk'))
	        ) {
	          return (...args) => {
	            return node[prop](
	              ...args.map(i => {
	                if (typeof i === 'function') {
	                  return (child, index) => i(child.toProxy(), index)
	                } else {
	                  return i
	                }
	              })
	            )
	          }
	        } else if (prop === 'every' || prop === 'some') {
	          return cb => {
	            return node[prop]((child, ...other) =>
	              cb(child.toProxy(), ...other)
	            )
	          }
	        } else if (prop === 'root') {
	          return () => node.root().toProxy()
	        } else if (prop === 'nodes') {
	          return node.nodes.map(i => i.toProxy())
	        } else if (prop === 'first' || prop === 'last') {
	          return node[prop].toProxy()
	        } else {
	          return node[prop]
	        }
	      },

	      set(node, prop, value) {
	        if (node[prop] === value) return true
	        node[prop] = value;
	        if (prop === 'name' || prop === 'params' || prop === 'selector') {
	          node.markDirty();
	        }
	        return true
	      }
	    }
	  }

	  index(child) {
	    if (typeof child === 'number') return child
	    if (child.proxyOf) child = child.proxyOf;
	    return this.proxyOf.nodes.indexOf(child)
	  }

	  insertAfter(exist, add) {
	    let existIndex = this.index(exist);
	    let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
	    existIndex = this.index(exist);
	    for (let node of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node);

	    let index;
	    for (let id in this.indexes) {
	      index = this.indexes[id];
	      if (existIndex < index) {
	        this.indexes[id] = index + nodes.length;
	      }
	    }

	    this.markDirty();

	    return this
	  }

	  insertBefore(exist, add) {
	    let existIndex = this.index(exist);
	    let type = existIndex === 0 ? 'prepend' : false;
	    let nodes = this.normalize(
	      add,
	      this.proxyOf.nodes[existIndex],
	      type
	    ).reverse();
	    existIndex = this.index(exist);
	    for (let node of nodes) this.proxyOf.nodes.splice(existIndex, 0, node);

	    let index;
	    for (let id in this.indexes) {
	      index = this.indexes[id];
	      if (existIndex <= index) {
	        this.indexes[id] = index + nodes.length;
	      }
	    }

	    this.markDirty();

	    return this
	  }

	  normalize(nodes, sample) {
	    if (typeof nodes === 'string') {
	      nodes = cleanSource(parse(nodes).nodes);
	    } else if (typeof nodes === 'undefined') {
	      nodes = [];
	    } else if (Array.isArray(nodes)) {
	      nodes = nodes.slice(0);
	      for (let i of nodes) {
	        if (i.parent) i.parent.removeChild(i, 'ignore');
	      }
	    } else if (nodes.type === 'root' && this.type !== 'document') {
	      nodes = nodes.nodes.slice(0);
	      for (let i of nodes) {
	        if (i.parent) i.parent.removeChild(i, 'ignore');
	      }
	    } else if (nodes.type) {
	      nodes = [nodes];
	    } else if (nodes.prop) {
	      if (typeof nodes.value === 'undefined') {
	        throw new Error('Value field is missed in node creation')
	      } else if (typeof nodes.value !== 'string') {
	        nodes.value = String(nodes.value);
	      }
	      nodes = [new Declaration(nodes)];
	    } else if (nodes.selector || nodes.selectors) {
	      nodes = [new Rule(nodes)];
	    } else if (nodes.name) {
	      nodes = [new AtRule(nodes)];
	    } else if (nodes.text) {
	      nodes = [new Comment(nodes)];
	    } else {
	      throw new Error('Unknown node type in node creation')
	    }

	    let processed = nodes.map(i => {
	      /* c8 ignore next */
	      if (!i[my]) Container.rebuild(i);
	      i = i.proxyOf;
	      if (i.parent) i.parent.removeChild(i);
	      if (i[isClean]) markTreeDirty(i);

	      if (!i.raws) i.raws = {};
	      if (typeof i.raws.before === 'undefined') {
	        if (sample && typeof sample.raws.before !== 'undefined') {
	          i.raws.before = sample.raws.before.replace(/\S/g, '');
	        }
	      }
	      i.parent = this.proxyOf;
	      return i
	    });

	    return processed
	  }

	  prepend(...children) {
	    children = children.reverse();
	    for (let child of children) {
	      let nodes = this.normalize(child, this.first, 'prepend').reverse();
	      for (let node of nodes) this.proxyOf.nodes.unshift(node);
	      for (let id in this.indexes) {
	        this.indexes[id] = this.indexes[id] + nodes.length;
	      }
	    }

	    this.markDirty();

	    return this
	  }

	  push(child) {
	    child.parent = this;
	    this.proxyOf.nodes.push(child);
	    return this
	  }

	  removeAll() {
	    for (let node of this.proxyOf.nodes) node.parent = undefined;
	    this.proxyOf.nodes = [];

	    this.markDirty();

	    return this
	  }

	  removeChild(child) {
	    child = this.index(child);
	    this.proxyOf.nodes[child].parent = undefined;
	    this.proxyOf.nodes.splice(child, 1);

	    let index;
	    for (let id in this.indexes) {
	      index = this.indexes[id];
	      if (index >= child) {
	        this.indexes[id] = index - 1;
	      }
	    }

	    this.markDirty();

	    return this
	  }

	  replaceValues(pattern, opts, callback) {
	    if (!callback) {
	      callback = opts;
	      opts = {};
	    }

	    this.walkDecls(decl => {
	      if (opts.props && !opts.props.includes(decl.prop)) return
	      if (opts.fast && !decl.value.includes(opts.fast)) return

	      decl.value = decl.value.replace(pattern, callback);
	    });

	    this.markDirty();

	    return this
	  }

	  some(condition) {
	    return this.nodes.some(condition)
	  }

	  walk(callback) {
	    return this.each((child, i) => {
	      let result;
	      try {
	        result = callback(child, i);
	      } catch (e) {
	        throw child.addToError(e)
	      }
	      if (result !== false && child.walk) {
	        result = child.walk(callback);
	      }

	      return result
	    })
	  }

	  walkAtRules(name, callback) {
	    if (!callback) {
	      callback = name;
	      return this.walk((child, i) => {
	        if (child.type === 'atrule') {
	          return callback(child, i)
	        }
	      })
	    }
	    if (name instanceof RegExp) {
	      return this.walk((child, i) => {
	        if (child.type === 'atrule' && name.test(child.name)) {
	          return callback(child, i)
	        }
	      })
	    }
	    return this.walk((child, i) => {
	      if (child.type === 'atrule' && child.name === name) {
	        return callback(child, i)
	      }
	    })
	  }

	  walkComments(callback) {
	    return this.walk((child, i) => {
	      if (child.type === 'comment') {
	        return callback(child, i)
	      }
	    })
	  }

	  walkDecls(prop, callback) {
	    if (!callback) {
	      callback = prop;
	      return this.walk((child, i) => {
	        if (child.type === 'decl') {
	          return callback(child, i)
	        }
	      })
	    }
	    if (prop instanceof RegExp) {
	      return this.walk((child, i) => {
	        if (child.type === 'decl' && prop.test(child.prop)) {
	          return callback(child, i)
	        }
	      })
	    }
	    return this.walk((child, i) => {
	      if (child.type === 'decl' && child.prop === prop) {
	        return callback(child, i)
	      }
	    })
	  }

	  walkRules(selector, callback) {
	    if (!callback) {
	      callback = selector;

	      return this.walk((child, i) => {
	        if (child.type === 'rule') {
	          return callback(child, i)
	        }
	      })
	    }
	    if (selector instanceof RegExp) {
	      return this.walk((child, i) => {
	        if (child.type === 'rule' && selector.test(child.selector)) {
	          return callback(child, i)
	        }
	      })
	    }
	    return this.walk((child, i) => {
	      if (child.type === 'rule' && child.selector === selector) {
	        return callback(child, i)
	      }
	    })
	  }
	}

	Container.registerParse = dependant => {
	  parse = dependant;
	};

	Container.registerRule = dependant => {
	  Rule = dependant;
	};

	Container.registerAtRule = dependant => {
	  AtRule = dependant;
	};

	Container.registerRoot = dependant => {
	  Root = dependant;
	};

	container = Container;
	Container.default = Container;

	/* c8 ignore start */
	Container.rebuild = node => {
	  if (node.type === 'atrule') {
	    Object.setPrototypeOf(node, AtRule.prototype);
	  } else if (node.type === 'rule') {
	    Object.setPrototypeOf(node, Rule.prototype);
	  } else if (node.type === 'decl') {
	    Object.setPrototypeOf(node, Declaration.prototype);
	  } else if (node.type === 'comment') {
	    Object.setPrototypeOf(node, Comment.prototype);
	  } else if (node.type === 'root') {
	    Object.setPrototypeOf(node, Root.prototype);
	  }

	  node[my] = true;

	  if (node.nodes) {
	    node.nodes.forEach(child => {
	      Container.rebuild(child);
	    });
	  }
	};
	/* c8 ignore stop */
	return container;
}

var atRule;
var hasRequiredAtRule;

function requireAtRule () {
	if (hasRequiredAtRule) return atRule;
	hasRequiredAtRule = 1;

	let Container = /*@__PURE__*/ requireContainer();

	class AtRule extends Container {
	  constructor(defaults) {
	    super(defaults);
	    this.type = 'atrule';
	  }

	  append(...children) {
	    if (!this.proxyOf.nodes) this.nodes = [];
	    return super.append(...children)
	  }

	  prepend(...children) {
	    if (!this.proxyOf.nodes) this.nodes = [];
	    return super.prepend(...children)
	  }
	}

	atRule = AtRule;
	AtRule.default = AtRule;

	Container.registerAtRule(AtRule);
	return atRule;
}

var document;
var hasRequiredDocument;

function requireDocument () {
	if (hasRequiredDocument) return document;
	hasRequiredDocument = 1;

	let Container = /*@__PURE__*/ requireContainer();

	let LazyResult, Processor;

	class Document extends Container {
	  constructor(defaults) {
	    // type needs to be passed to super, otherwise child roots won't be normalized correctly
	    super({ type: 'document', ...defaults });

	    if (!this.nodes) {
	      this.nodes = [];
	    }
	  }

	  toResult(opts = {}) {
	    let lazy = new LazyResult(new Processor(), this, opts);

	    return lazy.stringify()
	  }
	}

	Document.registerLazyResult = dependant => {
	  LazyResult = dependant;
	};

	Document.registerProcessor = dependant => {
	  Processor = dependant;
	};

	document = Document;
	Document.default = Document;
	return document;
}

var nonSecure;
var hasRequiredNonSecure;

function requireNonSecure () {
	if (hasRequiredNonSecure) return nonSecure;
	hasRequiredNonSecure = 1;
	// This alphabet uses `A-Za-z0-9_-` symbols.
	// The order of characters is optimized for better gzip and brotli compression.
	// References to the same file (works both for gzip and brotli):
	// `'use`, `andom`, and `rict'`
	// References to the brotli default dictionary:
	// `-26T`, `1983`, `40px`, `75px`, `bush`, `jack`, `mind`, `very`, and `wolf`
	let urlAlphabet =
	  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

	let customAlphabet = (alphabet, defaultSize = 21) => {
	  return (size = defaultSize) => {
	    let id = '';
	    // A compact alternative for `for (var i = 0; i < step; i++)`.
	    let i = size | 0;
	    while (i--) {
	      // `| 0` is more compact and faster than `Math.floor()`.
	      id += alphabet[(Math.random() * alphabet.length) | 0];
	    }
	    return id
	  }
	};

	let nanoid = (size = 21) => {
	  let id = '';
	  // A compact alternative for `for (var i = 0; i < step; i++)`.
	  let i = size | 0;
	  while (i--) {
	    // `| 0` is more compact and faster than `Math.floor()`.
	    id += urlAlphabet[(Math.random() * 64) | 0];
	  }
	  return id
	};

	nonSecure = { nanoid, customAlphabet };
	return nonSecure;
}

var previousMap;
var hasRequiredPreviousMap;

function requirePreviousMap () {
	if (hasRequiredPreviousMap) return previousMap;
	hasRequiredPreviousMap = 1;

	let { existsSync, readFileSync } = require$$0;
	let { dirname, join } = require$$1;
	let { SourceMapConsumer, SourceMapGenerator } = require$$2;

	function fromBase64(str) {
	  if (Buffer) {
	    return Buffer.from(str, 'base64').toString()
	  } else {
	    /* c8 ignore next 2 */
	    return window.atob(str)
	  }
	}

	class PreviousMap {
	  constructor(css, opts) {
	    if (opts.map === false) return
	    this.loadAnnotation(css);
	    this.inline = this.startWith(this.annotation, 'data:');

	    let prev = opts.map ? opts.map.prev : undefined;
	    let text = this.loadMap(opts.from, prev);
	    if (!this.mapFile && opts.from) {
	      this.mapFile = opts.from;
	    }
	    if (this.mapFile) this.root = dirname(this.mapFile);
	    if (text) this.text = text;
	  }

	  consumer() {
	    if (!this.consumerCache) {
	      this.consumerCache = new SourceMapConsumer(this.text);
	    }
	    return this.consumerCache
	  }

	  decodeInline(text) {
	    let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
	    let baseUri = /^data:application\/json;base64,/;
	    let charsetUri = /^data:application\/json;charset=utf-?8,/;
	    let uri = /^data:application\/json,/;

	    let uriMatch = text.match(charsetUri) || text.match(uri);
	    if (uriMatch) {
	      return decodeURIComponent(text.substr(uriMatch[0].length))
	    }

	    let baseUriMatch = text.match(baseCharsetUri) || text.match(baseUri);
	    if (baseUriMatch) {
	      return fromBase64(text.substr(baseUriMatch[0].length))
	    }

	    let encoding = text.match(/data:application\/json;([^,]+),/)[1];
	    throw new Error('Unsupported source map encoding ' + encoding)
	  }

	  getAnnotationURL(sourceMapString) {
	    return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, '').trim()
	  }

	  isMap(map) {
	    if (typeof map !== 'object') return false
	    return (
	      typeof map.mappings === 'string' ||
	      typeof map._mappings === 'string' ||
	      Array.isArray(map.sections)
	    )
	  }

	  loadAnnotation(css) {
	    let comments = css.match(/\/\*\s*# sourceMappingURL=/g);
	    if (!comments) return

	    // sourceMappingURLs from comments, strings, etc.
	    let start = css.lastIndexOf(comments.pop());
	    let end = css.indexOf('*/', start);

	    if (start > -1 && end > -1) {
	      // Locate the last sourceMappingURL to avoid pickin
	      this.annotation = this.getAnnotationURL(css.substring(start, end));
	    }
	  }

	  loadFile(path) {
	    this.root = dirname(path);
	    if (existsSync(path)) {
	      this.mapFile = path;
	      return readFileSync(path, 'utf-8').toString().trim()
	    }
	  }

	  loadMap(file, prev) {
	    if (prev === false) return false

	    if (prev) {
	      if (typeof prev === 'string') {
	        return prev
	      } else if (typeof prev === 'function') {
	        let prevPath = prev(file);
	        if (prevPath) {
	          let map = this.loadFile(prevPath);
	          if (!map) {
	            throw new Error(
	              'Unable to load previous source map: ' + prevPath.toString()
	            )
	          }
	          return map
	        }
	      } else if (prev instanceof SourceMapConsumer) {
	        return SourceMapGenerator.fromSourceMap(prev).toString()
	      } else if (prev instanceof SourceMapGenerator) {
	        return prev.toString()
	      } else if (this.isMap(prev)) {
	        return JSON.stringify(prev)
	      } else {
	        throw new Error(
	          'Unsupported previous source map format: ' + prev.toString()
	        )
	      }
	    } else if (this.inline) {
	      return this.decodeInline(this.annotation)
	    } else if (this.annotation) {
	      let map = this.annotation;
	      if (file) map = join(dirname(file), map);
	      return this.loadFile(map)
	    }
	  }

	  startWith(string, start) {
	    if (!string) return false
	    return string.substr(0, start.length) === start
	  }

	  withContent() {
	    return !!(
	      this.consumer().sourcesContent &&
	      this.consumer().sourcesContent.length > 0
	    )
	  }
	}

	previousMap = PreviousMap;
	PreviousMap.default = PreviousMap;
	return previousMap;
}

var input;
var hasRequiredInput;

function requireInput () {
	if (hasRequiredInput) return input;
	hasRequiredInput = 1;

	let { nanoid } = /*@__PURE__*/ requireNonSecure();
	let { isAbsolute, resolve } = require$$1;
	let { SourceMapConsumer, SourceMapGenerator } = require$$2;
	let { fileURLToPath, pathToFileURL } = require$$3;

	let CssSyntaxError = /*@__PURE__*/ requireCssSyntaxError();
	let PreviousMap = /*@__PURE__*/ requirePreviousMap();
	let terminalHighlight = /*@__PURE__*/ requireTerminalHighlight();

	let lineToIndexCache = Symbol('lineToIndexCache');

	let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
	let pathAvailable = Boolean(resolve && isAbsolute);

	function getLineToIndex(input) {
	  if (input[lineToIndexCache]) return input[lineToIndexCache]
	  let lines = input.css.split('\n');
	  let lineToIndex = new Array(lines.length);
	  let prevIndex = 0;

	  for (let i = 0, l = lines.length; i < l; i++) {
	    lineToIndex[i] = prevIndex;
	    prevIndex += lines[i].length + 1;
	  }

	  input[lineToIndexCache] = lineToIndex;
	  return lineToIndex
	}

	class Input {
	  get from() {
	    return this.file || this.id
	  }

	  constructor(css, opts = {}) {
	    if (
	      css === null ||
	      typeof css === 'undefined' ||
	      (typeof css === 'object' && !css.toString)
	    ) {
	      throw new Error(`PostCSS received ${css} instead of CSS string`)
	    }

	    this.css = css.toString();

	    if (this.css[0] === '\uFEFF' || this.css[0] === '\uFFFE') {
	      this.hasBOM = true;
	      this.css = this.css.slice(1);
	    } else {
	      this.hasBOM = false;
	    }

	    this.document = this.css;
	    if (opts.document) this.document = opts.document.toString();

	    if (opts.from) {
	      if (
	        !pathAvailable ||
	        /^\w+:\/\//.test(opts.from) ||
	        isAbsolute(opts.from)
	      ) {
	        this.file = opts.from;
	      } else {
	        this.file = resolve(opts.from);
	      }
	    }

	    if (pathAvailable && sourceMapAvailable) {
	      let map = new PreviousMap(this.css, opts);
	      if (map.text) {
	        this.map = map;
	        let file = map.consumer().file;
	        if (!this.file && file) this.file = this.mapResolve(file);
	      }
	    }

	    if (!this.file) {
	      this.id = '<input css ' + nanoid(6) + '>';
	    }
	    if (this.map) this.map.file = this.from;
	  }

	  error(message, line, column, opts = {}) {
	    let endColumn, endLine, endOffset, offset, result;

	    if (line && typeof line === 'object') {
	      let start = line;
	      let end = column;
	      if (typeof start.offset === 'number') {
	        offset = start.offset;
	        let pos = this.fromOffset(offset);
	        line = pos.line;
	        column = pos.col;
	      } else {
	        line = start.line;
	        column = start.column;
	        offset = this.fromLineAndColumn(line, column);
	      }
	      if (typeof end.offset === 'number') {
	        endOffset = end.offset;
	        let pos = this.fromOffset(endOffset);
	        endLine = pos.line;
	        endColumn = pos.col;
	      } else {
	        endLine = end.line;
	        endColumn = end.column;
	        endOffset = this.fromLineAndColumn(end.line, end.column);
	      }
	    } else if (!column) {
	      offset = line;
	      let pos = this.fromOffset(offset);
	      line = pos.line;
	      column = pos.col;
	    } else {
	      offset = this.fromLineAndColumn(line, column);
	    }

	    let origin = this.origin(line, column, endLine, endColumn);
	    if (origin) {
	      result = new CssSyntaxError(
	        message,
	        origin.endLine === undefined
	          ? origin.line
	          : { column: origin.column, line: origin.line },
	        origin.endLine === undefined
	          ? origin.column
	          : { column: origin.endColumn, line: origin.endLine },
	        origin.source,
	        origin.file,
	        opts.plugin
	      );
	    } else {
	      result = new CssSyntaxError(
	        message,
	        endLine === undefined ? line : { column, line },
	        endLine === undefined ? column : { column: endColumn, line: endLine },
	        this.css,
	        this.file,
	        opts.plugin
	      );
	    }

	    result.input = { column, endColumn, endLine, endOffset, line, offset, source: this.css };
	    if (this.file) {
	      if (pathToFileURL) {
	        result.input.url = pathToFileURL(this.file).toString();
	      }
	      result.input.file = this.file;
	    }

	    return result
	  }

	  fromLineAndColumn(line, column) {
	    let lineToIndex = getLineToIndex(this);
	    let index = lineToIndex[line - 1];
	    return index + column - 1
	  }

	  fromOffset(offset) {
	    let lineToIndex = getLineToIndex(this);
	    let lastLine = lineToIndex[lineToIndex.length - 1];

	    let min = 0;
	    if (offset >= lastLine) {
	      min = lineToIndex.length - 1;
	    } else {
	      let max = lineToIndex.length - 2;
	      let mid;
	      while (min < max) {
	        mid = min + ((max - min) >> 1);
	        if (offset < lineToIndex[mid]) {
	          max = mid - 1;
	        } else if (offset >= lineToIndex[mid + 1]) {
	          min = mid + 1;
	        } else {
	          min = mid;
	          break
	        }
	      }
	    }
	    return {
	      col: offset - lineToIndex[min] + 1,
	      line: min + 1
	    }
	  }

	  mapResolve(file) {
	    if (/^\w+:\/\//.test(file)) {
	      return file
	    }
	    return resolve(this.map.consumer().sourceRoot || this.map.root || '.', file)
	  }

	  origin(line, column, endLine, endColumn) {
	    if (!this.map) return false
	    let consumer = this.map.consumer();

	    let from = consumer.originalPositionFor({ column, line });
	    if (!from.source) return false

	    let to;
	    if (typeof endLine === 'number') {
	      to = consumer.originalPositionFor({ column: endColumn, line: endLine });
	    }

	    let fromUrl;

	    if (isAbsolute(from.source)) {
	      fromUrl = pathToFileURL(from.source);
	    } else {
	      fromUrl = new URL(
	        from.source,
	        this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile)
	      );
	    }

	    let result = {
	      column: from.column,
	      endColumn: to && to.column,
	      endLine: to && to.line,
	      line: from.line,
	      url: fromUrl.toString()
	    };

	    if (fromUrl.protocol === 'file:') {
	      if (fileURLToPath) {
	        result.file = fileURLToPath(fromUrl);
	      } else {
	        /* c8 ignore next 2 */
	        throw new Error(`file: protocol is not available in this PostCSS build`)
	      }
	    }

	    let source = consumer.sourceContentFor(from.source);
	    if (source) result.source = source;

	    return result
	  }

	  toJSON() {
	    let json = {};
	    for (let name of ['hasBOM', 'css', 'file', 'id']) {
	      if (this[name] != null) {
	        json[name] = this[name];
	      }
	    }
	    if (this.map) {
	      json.map = { ...this.map };
	      if (json.map.consumerCache) {
	        json.map.consumerCache = undefined;
	      }
	    }
	    return json
	  }
	}

	input = Input;
	Input.default = Input;

	if (terminalHighlight && terminalHighlight.registerInput) {
	  terminalHighlight.registerInput(Input);
	}
	return input;
}

var root;
var hasRequiredRoot;

function requireRoot () {
	if (hasRequiredRoot) return root;
	hasRequiredRoot = 1;

	let Container = /*@__PURE__*/ requireContainer();

	let LazyResult, Processor;

	class Root extends Container {
	  constructor(defaults) {
	    super(defaults);
	    this.type = 'root';
	    if (!this.nodes) this.nodes = [];
	  }

	  normalize(child, sample, type) {
	    let nodes = super.normalize(child);

	    if (sample) {
	      if (type === 'prepend') {
	        if (this.nodes.length > 1) {
	          sample.raws.before = this.nodes[1].raws.before;
	        } else {
	          delete sample.raws.before;
	        }
	      } else if (this.first !== sample) {
	        for (let node of nodes) {
	          node.raws.before = sample.raws.before;
	        }
	      }
	    }

	    return nodes
	  }

	  removeChild(child, ignore) {
	    let index = this.index(child);

	    if (!ignore && index === 0 && this.nodes.length > 1) {
	      this.nodes[1].raws.before = this.nodes[index].raws.before;
	    }

	    return super.removeChild(child)
	  }

	  toResult(opts = {}) {
	    let lazy = new LazyResult(new Processor(), this, opts);
	    return lazy.stringify()
	  }
	}

	Root.registerLazyResult = dependant => {
	  LazyResult = dependant;
	};

	Root.registerProcessor = dependant => {
	  Processor = dependant;
	};

	root = Root;
	Root.default = Root;

	Container.registerRoot(Root);
	return root;
}

var list_1;
var hasRequiredList;

function requireList () {
	if (hasRequiredList) return list_1;
	hasRequiredList = 1;

	let list = {
	  comma(string) {
	    return list.split(string, [','], true)
	  },

	  space(string) {
	    let spaces = [' ', '\n', '\t'];
	    return list.split(string, spaces)
	  },

	  split(string, separators, last) {
	    let array = [];
	    let current = '';
	    let split = false;

	    let func = 0;
	    let inQuote = false;
	    let prevQuote = '';
	    let escape = false;

	    for (let letter of string) {
	      if (escape) {
	        escape = false;
	      } else if (letter === '\\') {
	        escape = true;
	      } else if (inQuote) {
	        if (letter === prevQuote) {
	          inQuote = false;
	        }
	      } else if (letter === '"' || letter === "'") {
	        inQuote = true;
	        prevQuote = letter;
	      } else if (letter === '(') {
	        func += 1;
	      } else if (letter === ')') {
	        if (func > 0) func -= 1;
	      } else if (func === 0) {
	        if (separators.includes(letter)) split = true;
	      }

	      if (split) {
	        if (current !== '') array.push(current.trim());
	        current = '';
	        split = false;
	      } else {
	        current += letter;
	      }
	    }

	    if (last || current !== '') array.push(current.trim());
	    return array
	  }
	};

	list_1 = list;
	list.default = list;
	return list_1;
}

var rule;
var hasRequiredRule;

function requireRule () {
	if (hasRequiredRule) return rule;
	hasRequiredRule = 1;

	let Container = /*@__PURE__*/ requireContainer();
	let list = /*@__PURE__*/ requireList();

	class Rule extends Container {
	  get selectors() {
	    return list.comma(this.selector)
	  }

	  set selectors(values) {
	    let match = this.selector ? this.selector.match(/,\s*/) : null;
	    let sep = match ? match[0] : ',' + this.raw('between', 'beforeOpen');
	    this.selector = values.join(sep);
	  }

	  constructor(defaults) {
	    super(defaults);
	    this.type = 'rule';
	    if (!this.nodes) this.nodes = [];
	  }
	}

	rule = Rule;
	Rule.default = Rule;

	Container.registerRule(Rule);
	return rule;
}

var fromJSON_1;
var hasRequiredFromJSON;

function requireFromJSON () {
	if (hasRequiredFromJSON) return fromJSON_1;
	hasRequiredFromJSON = 1;

	let AtRule = /*@__PURE__*/ requireAtRule();
	let Comment = /*@__PURE__*/ requireComment();
	let Declaration = /*@__PURE__*/ requireDeclaration();
	let Input = /*@__PURE__*/ requireInput();
	let PreviousMap = /*@__PURE__*/ requirePreviousMap();
	let Root = /*@__PURE__*/ requireRoot();
	let Rule = /*@__PURE__*/ requireRule();

	function fromJSON(json, inputs) {
	  if (Array.isArray(json)) return json.map(n => fromJSON(n))

	  let { inputs: ownInputs, ...defaults } = json;
	  if (ownInputs) {
	    inputs = [];
	    for (let input of ownInputs) {
	      let inputHydrated = { ...input, __proto__: Input.prototype };
	      if (inputHydrated.map) {
	        inputHydrated.map = {
	          ...inputHydrated.map,
	          __proto__: PreviousMap.prototype
	        };
	      }
	      inputs.push(inputHydrated);
	    }
	  }
	  if (defaults.nodes) {
	    defaults.nodes = json.nodes.map(n => fromJSON(n, inputs));
	  }
	  if (defaults.source) {
	    let { inputId, ...source } = defaults.source;
	    defaults.source = source;
	    if (inputId != null) {
	      defaults.source.input = inputs[inputId];
	    }
	  }
	  if (defaults.type === 'root') {
	    return new Root(defaults)
	  } else if (defaults.type === 'decl') {
	    return new Declaration(defaults)
	  } else if (defaults.type === 'rule') {
	    return new Rule(defaults)
	  } else if (defaults.type === 'comment') {
	    return new Comment(defaults)
	  } else if (defaults.type === 'atrule') {
	    return new AtRule(defaults)
	  } else {
	    throw new Error('Unknown node type: ' + json.type)
	  }
	}

	fromJSON_1 = fromJSON;
	fromJSON.default = fromJSON;
	return fromJSON_1;
}

var mapGenerator;
var hasRequiredMapGenerator;

function requireMapGenerator () {
	if (hasRequiredMapGenerator) return mapGenerator;
	hasRequiredMapGenerator = 1;

	let { dirname, relative, resolve, sep } = require$$1;
	let { SourceMapConsumer, SourceMapGenerator } = require$$2;
	let { pathToFileURL } = require$$3;

	let Input = /*@__PURE__*/ requireInput();

	let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
	let pathAvailable = Boolean(dirname && resolve && relative && sep);

	class MapGenerator {
	  constructor(stringify, root, opts, cssString) {
	    this.stringify = stringify;
	    this.mapOpts = opts.map || {};
	    this.root = root;
	    this.opts = opts;
	    this.css = cssString;
	    this.originalCSS = cssString;
	    this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;

	    this.memoizedFileURLs = new Map();
	    this.memoizedPaths = new Map();
	    this.memoizedURLs = new Map();
	  }

	  addAnnotation() {
	    let content;

	    if (this.isInline()) {
	      content =
	        'data:application/json;base64,' + this.toBase64(this.map.toString());
	    } else if (typeof this.mapOpts.annotation === 'string') {
	      content = this.mapOpts.annotation;
	    } else if (typeof this.mapOpts.annotation === 'function') {
	      content = this.mapOpts.annotation(this.opts.to, this.root);
	    } else {
	      content = this.outputFile() + '.map';
	    }
	    let eol = '\n';
	    if (this.css.includes('\r\n')) eol = '\r\n';

	    this.css += eol + '/*# sourceMappingURL=' + content + ' */';
	  }

	  applyPrevMaps() {
	    for (let prev of this.previous()) {
	      let from = this.toUrl(this.path(prev.file));
	      let root = prev.root || dirname(prev.file);
	      let map;

	      if (this.mapOpts.sourcesContent === false) {
	        map = new SourceMapConsumer(prev.text);
	        if (map.sourcesContent) {
	          map.sourcesContent = null;
	        }
	      } else {
	        map = prev.consumer();
	      }

	      this.map.applySourceMap(map, from, this.toUrl(this.path(root)));
	    }
	  }

	  clearAnnotation() {
	    if (this.mapOpts.annotation === false) return

	    if (this.root) {
	      let node;
	      for (let i = this.root.nodes.length - 1; i >= 0; i--) {
	        node = this.root.nodes[i];
	        if (node.type !== 'comment') continue
	        if (node.text.startsWith('# sourceMappingURL=')) {
	          this.root.removeChild(i);
	        }
	      }
	    } else if (this.css) {
	      this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, '');
	    }
	  }

	  generate() {
	    this.clearAnnotation();
	    if (pathAvailable && sourceMapAvailable && this.isMap()) {
	      return this.generateMap()
	    } else {
	      let result = '';
	      this.stringify(this.root, i => {
	        result += i;
	      });
	      return [result]
	    }
	  }

	  generateMap() {
	    if (this.root) {
	      this.generateString();
	    } else if (this.previous().length === 1) {
	      let prev = this.previous()[0].consumer();
	      prev.file = this.outputFile();
	      this.map = SourceMapGenerator.fromSourceMap(prev, {
	        ignoreInvalidMapping: true
	      });
	    } else {
	      this.map = new SourceMapGenerator({
	        file: this.outputFile(),
	        ignoreInvalidMapping: true
	      });
	      this.map.addMapping({
	        generated: { column: 0, line: 1 },
	        original: { column: 0, line: 1 },
	        source: this.opts.from
	          ? this.toUrl(this.path(this.opts.from))
	          : '<no source>'
	      });
	    }

	    if (this.isSourcesContent()) this.setSourcesContent();
	    if (this.root && this.previous().length > 0) this.applyPrevMaps();
	    if (this.isAnnotation()) this.addAnnotation();

	    if (this.isInline()) {
	      return [this.css]
	    } else {
	      return [this.css, this.map]
	    }
	  }

	  generateString() {
	    this.css = '';
	    this.map = new SourceMapGenerator({
	      file: this.outputFile(),
	      ignoreInvalidMapping: true
	    });

	    let line = 1;
	    let column = 1;

	    let noSource = '<no source>';
	    let mapping = {
	      generated: { column: 0, line: 0 },
	      original: { column: 0, line: 0 },
	      source: ''
	    };

	    let last, lines;
	    this.stringify(this.root, (str, node, type) => {
	      this.css += str;

	      if (node && type !== 'end') {
	        mapping.generated.line = line;
	        mapping.generated.column = column - 1;
	        if (node.source && node.source.start) {
	          mapping.source = this.sourcePath(node);
	          mapping.original.line = node.source.start.line;
	          mapping.original.column = node.source.start.column - 1;
	          this.map.addMapping(mapping);
	        } else {
	          mapping.source = noSource;
	          mapping.original.line = 1;
	          mapping.original.column = 0;
	          this.map.addMapping(mapping);
	        }
	      }

	      lines = str.match(/\n/g);
	      if (lines) {
	        line += lines.length;
	        last = str.lastIndexOf('\n');
	        column = str.length - last;
	      } else {
	        column += str.length;
	      }

	      if (node && type !== 'start') {
	        let p = node.parent || { raws: {} };
	        let childless =
	          node.type === 'decl' || (node.type === 'atrule' && !node.nodes);
	        if (!childless || node !== p.last || p.raws.semicolon) {
	          if (node.source && node.source.end) {
	            mapping.source = this.sourcePath(node);
	            mapping.original.line = node.source.end.line;
	            mapping.original.column = node.source.end.column - 1;
	            mapping.generated.line = line;
	            mapping.generated.column = column - 2;
	            this.map.addMapping(mapping);
	          } else {
	            mapping.source = noSource;
	            mapping.original.line = 1;
	            mapping.original.column = 0;
	            mapping.generated.line = line;
	            mapping.generated.column = column - 1;
	            this.map.addMapping(mapping);
	          }
	        }
	      }
	    });
	  }

	  isAnnotation() {
	    if (this.isInline()) {
	      return true
	    }
	    if (typeof this.mapOpts.annotation !== 'undefined') {
	      return this.mapOpts.annotation
	    }
	    if (this.previous().length) {
	      return this.previous().some(i => i.annotation)
	    }
	    return true
	  }

	  isInline() {
	    if (typeof this.mapOpts.inline !== 'undefined') {
	      return this.mapOpts.inline
	    }

	    let annotation = this.mapOpts.annotation;
	    if (typeof annotation !== 'undefined' && annotation !== true) {
	      return false
	    }

	    if (this.previous().length) {
	      return this.previous().some(i => i.inline)
	    }
	    return true
	  }

	  isMap() {
	    if (typeof this.opts.map !== 'undefined') {
	      return !!this.opts.map
	    }
	    return this.previous().length > 0
	  }

	  isSourcesContent() {
	    if (typeof this.mapOpts.sourcesContent !== 'undefined') {
	      return this.mapOpts.sourcesContent
	    }
	    if (this.previous().length) {
	      return this.previous().some(i => i.withContent())
	    }
	    return true
	  }

	  outputFile() {
	    if (this.opts.to) {
	      return this.path(this.opts.to)
	    } else if (this.opts.from) {
	      return this.path(this.opts.from)
	    } else {
	      return 'to.css'
	    }
	  }

	  path(file) {
	    if (this.mapOpts.absolute) return file
	    if (file.charCodeAt(0) === 60 /* `<` */) return file
	    if (/^\w+:\/\//.test(file)) return file
	    let cached = this.memoizedPaths.get(file);
	    if (cached) return cached

	    let from = this.opts.to ? dirname(this.opts.to) : '.';

	    if (typeof this.mapOpts.annotation === 'string') {
	      from = dirname(resolve(from, this.mapOpts.annotation));
	    }

	    let path = relative(from, file);
	    this.memoizedPaths.set(file, path);

	    return path
	  }

	  previous() {
	    if (!this.previousMaps) {
	      this.previousMaps = [];
	      if (this.root) {
	        this.root.walk(node => {
	          if (node.source && node.source.input.map) {
	            let map = node.source.input.map;
	            if (!this.previousMaps.includes(map)) {
	              this.previousMaps.push(map);
	            }
	          }
	        });
	      } else {
	        let input = new Input(this.originalCSS, this.opts);
	        if (input.map) this.previousMaps.push(input.map);
	      }
	    }

	    return this.previousMaps
	  }

	  setSourcesContent() {
	    let already = {};
	    if (this.root) {
	      this.root.walk(node => {
	        if (node.source) {
	          let from = node.source.input.from;
	          if (from && !already[from]) {
	            already[from] = true;
	            let fromUrl = this.usesFileUrls
	              ? this.toFileUrl(from)
	              : this.toUrl(this.path(from));
	            this.map.setSourceContent(fromUrl, node.source.input.css);
	          }
	        }
	      });
	    } else if (this.css) {
	      let from = this.opts.from
	        ? this.toUrl(this.path(this.opts.from))
	        : '<no source>';
	      this.map.setSourceContent(from, this.css);
	    }
	  }

	  sourcePath(node) {
	    if (this.mapOpts.from) {
	      return this.toUrl(this.mapOpts.from)
	    } else if (this.usesFileUrls) {
	      return this.toFileUrl(node.source.input.from)
	    } else {
	      return this.toUrl(this.path(node.source.input.from))
	    }
	  }

	  toBase64(str) {
	    if (Buffer) {
	      return Buffer.from(str).toString('base64')
	    } else {
	      return window.btoa(unescape(encodeURIComponent(str)))
	    }
	  }

	  toFileUrl(path) {
	    let cached = this.memoizedFileURLs.get(path);
	    if (cached) return cached

	    if (pathToFileURL) {
	      let fileURL = pathToFileURL(path).toString();
	      this.memoizedFileURLs.set(path, fileURL);

	      return fileURL
	    } else {
	      throw new Error(
	        '`map.absolute` option is not available in this PostCSS build'
	      )
	    }
	  }

	  toUrl(path) {
	    let cached = this.memoizedURLs.get(path);
	    if (cached) return cached

	    if (sep === '\\') {
	      path = path.replace(/\\/g, '/');
	    }

	    let url = encodeURI(path).replace(/[#?]/g, encodeURIComponent);
	    this.memoizedURLs.set(path, url);

	    return url
	  }
	}

	mapGenerator = MapGenerator;
	return mapGenerator;
}

var parser;
var hasRequiredParser;

function requireParser () {
	if (hasRequiredParser) return parser;
	hasRequiredParser = 1;

	let AtRule = /*@__PURE__*/ requireAtRule();
	let Comment = /*@__PURE__*/ requireComment();
	let Declaration = /*@__PURE__*/ requireDeclaration();
	let Root = /*@__PURE__*/ requireRoot();
	let Rule = /*@__PURE__*/ requireRule();
	let tokenizer = /*@__PURE__*/ requireTokenize();

	const SAFE_COMMENT_NEIGHBOR = {
	  empty: true,
	  space: true
	};

	function findLastWithPosition(tokens) {
	  for (let i = tokens.length - 1; i >= 0; i--) {
	    let token = tokens[i];
	    let pos = token[3] || token[2];
	    if (pos) return pos
	  }
	}

	class Parser {
	  constructor(input) {
	    this.input = input;

	    this.root = new Root();
	    this.current = this.root;
	    this.spaces = '';
	    this.semicolon = false;

	    this.createTokenizer();
	    this.root.source = { input, start: { column: 1, line: 1, offset: 0 } };
	  }

	  atrule(token) {
	    let node = new AtRule();
	    node.name = token[1].slice(1);
	    if (node.name === '') {
	      this.unnamedAtrule(node, token);
	    }
	    this.init(node, token[2]);

	    let type;
	    let prev;
	    let shift;
	    let last = false;
	    let open = false;
	    let params = [];
	    let brackets = [];

	    while (!this.tokenizer.endOfFile()) {
	      token = this.tokenizer.nextToken();
	      type = token[0];

	      if (type === '(' || type === '[') {
	        brackets.push(type === '(' ? ')' : ']');
	      } else if (type === '{' && brackets.length > 0) {
	        brackets.push('}');
	      } else if (type === brackets[brackets.length - 1]) {
	        brackets.pop();
	      }

	      if (brackets.length === 0) {
	        if (type === ';') {
	          node.source.end = this.getPosition(token[2]);
	          node.source.end.offset++;
	          this.semicolon = true;
	          break
	        } else if (type === '{') {
	          open = true;
	          break
	        } else if (type === '}') {
	          if (params.length > 0) {
	            shift = params.length - 1;
	            prev = params[shift];
	            while (prev && prev[0] === 'space') {
	              prev = params[--shift];
	            }
	            if (prev) {
	              node.source.end = this.getPosition(prev[3] || prev[2]);
	              node.source.end.offset++;
	            }
	          }
	          this.end(token);
	          break
	        } else {
	          params.push(token);
	        }
	      } else {
	        params.push(token);
	      }

	      if (this.tokenizer.endOfFile()) {
	        last = true;
	        break
	      }
	    }

	    node.raws.between = this.spacesAndCommentsFromEnd(params);
	    if (params.length) {
	      node.raws.afterName = this.spacesAndCommentsFromStart(params);
	      this.raw(node, 'params', params);
	      if (last) {
	        token = params[params.length - 1];
	        node.source.end = this.getPosition(token[3] || token[2]);
	        node.source.end.offset++;
	        this.spaces = node.raws.between;
	        node.raws.between = '';
	      }
	    } else {
	      node.raws.afterName = '';
	      node.params = '';
	    }

	    if (open) {
	      node.nodes = [];
	      this.current = node;
	    }
	  }

	  checkMissedSemicolon(tokens) {
	    let colon = this.colon(tokens);
	    if (colon === false) return

	    let founded = 0;
	    let token;
	    for (let j = colon - 1; j >= 0; j--) {
	      token = tokens[j];
	      if (token[0] !== 'space') {
	        founded += 1;
	        if (founded === 2) break
	      }
	    }
	    // If the token is a word, e.g. `!important`, `red` or any other valid property's value.
	    // Then we need to return the colon after that word token. [3] is the "end" colon of that word.
	    // And because we need it after that one we do +1 to get the next one.
	    throw this.input.error(
	      'Missed semicolon',
	      token[0] === 'word' ? token[3] + 1 : token[2]
	    )
	  }

	  colon(tokens) {
	    let brackets = 0;
	    let prev, token, type;
	    for (let [i, element] of tokens.entries()) {
	      token = element;
	      type = token[0];

	      if (type === '(') {
	        brackets += 1;
	      }
	      if (type === ')') {
	        brackets -= 1;
	      }
	      if (brackets === 0 && type === ':') {
	        if (!prev) {
	          this.doubleColon(token);
	        } else if (prev[0] === 'word' && prev[1] === 'progid') {
	          continue
	        } else {
	          return i
	        }
	      }

	      prev = token;
	    }
	    return false
	  }

	  comment(token) {
	    let node = new Comment();
	    this.init(node, token[2]);
	    node.source.end = this.getPosition(token[3] || token[2]);
	    node.source.end.offset++;

	    let text = token[1].slice(2, -2);
	    if (/^\s*$/.test(text)) {
	      node.text = '';
	      node.raws.left = text;
	      node.raws.right = '';
	    } else {
	      let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
	      node.text = match[2];
	      node.raws.left = match[1];
	      node.raws.right = match[3];
	    }
	  }

	  createTokenizer() {
	    this.tokenizer = tokenizer(this.input);
	  }

	  decl(tokens, customProperty) {
	    let node = new Declaration();
	    this.init(node, tokens[0][2]);

	    let last = tokens[tokens.length - 1];
	    if (last[0] === ';') {
	      this.semicolon = true;
	      tokens.pop();
	    }

	    node.source.end = this.getPosition(
	      last[3] || last[2] || findLastWithPosition(tokens)
	    );
	    node.source.end.offset++;

	    while (tokens[0][0] !== 'word') {
	      if (tokens.length === 1) this.unknownWord(tokens);
	      node.raws.before += tokens.shift()[1];
	    }
	    node.source.start = this.getPosition(tokens[0][2]);

	    node.prop = '';
	    while (tokens.length) {
	      let type = tokens[0][0];
	      if (type === ':' || type === 'space' || type === 'comment') {
	        break
	      }
	      node.prop += tokens.shift()[1];
	    }

	    node.raws.between = '';

	    let token;
	    while (tokens.length) {
	      token = tokens.shift();

	      if (token[0] === ':') {
	        node.raws.between += token[1];
	        break
	      } else {
	        if (token[0] === 'word' && /\w/.test(token[1])) {
	          this.unknownWord([token]);
	        }
	        node.raws.between += token[1];
	      }
	    }

	    if (node.prop[0] === '_' || node.prop[0] === '*') {
	      node.raws.before += node.prop[0];
	      node.prop = node.prop.slice(1);
	    }

	    let firstSpaces = [];
	    let next;
	    while (tokens.length) {
	      next = tokens[0][0];
	      if (next !== 'space' && next !== 'comment') break
	      firstSpaces.push(tokens.shift());
	    }

	    this.precheckMissedSemicolon(tokens);

	    for (let i = tokens.length - 1; i >= 0; i--) {
	      token = tokens[i];
	      if (token[1].toLowerCase() === '!important') {
	        node.important = true;
	        let string = this.stringFrom(tokens, i);
	        string = this.spacesFromEnd(tokens) + string;
	        if (string !== ' !important') node.raws.important = string;
	        break
	      } else if (token[1].toLowerCase() === 'important') {
	        let cache = tokens.slice(0);
	        let str = '';
	        for (let j = i; j > 0; j--) {
	          let type = cache[j][0];
	          if (str.trim().startsWith('!') && type !== 'space') {
	            break
	          }
	          str = cache.pop()[1] + str;
	        }
	        if (str.trim().startsWith('!')) {
	          node.important = true;
	          node.raws.important = str;
	          tokens = cache;
	        }
	      }

	      if (token[0] !== 'space' && token[0] !== 'comment') {
	        break
	      }
	    }

	    let hasWord = tokens.some(i => i[0] !== 'space' && i[0] !== 'comment');

	    if (hasWord) {
	      node.raws.between += firstSpaces.map(i => i[1]).join('');
	      firstSpaces = [];
	    }
	    this.raw(node, 'value', firstSpaces.concat(tokens), customProperty);

	    if (node.value.includes(':') && !customProperty) {
	      this.checkMissedSemicolon(tokens);
	    }
	  }

	  doubleColon(token) {
	    throw this.input.error(
	      'Double colon',
	      { offset: token[2] },
	      { offset: token[2] + token[1].length }
	    )
	  }

	  emptyRule(token) {
	    let node = new Rule();
	    this.init(node, token[2]);
	    node.selector = '';
	    node.raws.between = '';
	    this.current = node;
	  }

	  end(token) {
	    if (this.current.nodes && this.current.nodes.length) {
	      this.current.raws.semicolon = this.semicolon;
	    }
	    this.semicolon = false;

	    this.current.raws.after = (this.current.raws.after || '') + this.spaces;
	    this.spaces = '';

	    if (this.current.parent) {
	      this.current.source.end = this.getPosition(token[2]);
	      this.current.source.end.offset++;
	      this.current = this.current.parent;
	    } else {
	      this.unexpectedClose(token);
	    }
	  }

	  endFile() {
	    if (this.current.parent) this.unclosedBlock();
	    if (this.current.nodes && this.current.nodes.length) {
	      this.current.raws.semicolon = this.semicolon;
	    }
	    this.current.raws.after = (this.current.raws.after || '') + this.spaces;
	    this.root.source.end = this.getPosition(this.tokenizer.position());
	  }

	  freeSemicolon(token) {
	    this.spaces += token[1];
	    if (this.current.nodes) {
	      let prev = this.current.nodes[this.current.nodes.length - 1];
	      if (prev && prev.type === 'rule' && !prev.raws.ownSemicolon) {
	        prev.raws.ownSemicolon = this.spaces;
	        this.spaces = '';
	        prev.source.end = this.getPosition(token[2]);
	        prev.source.end.offset += prev.raws.ownSemicolon.length;
	      }
	    }
	  }

	  // Helpers

	  getPosition(offset) {
	    let pos = this.input.fromOffset(offset);
	    return {
	      column: pos.col,
	      line: pos.line,
	      offset
	    }
	  }

	  init(node, offset) {
	    this.current.push(node);
	    node.source = {
	      input: this.input,
	      start: this.getPosition(offset)
	    };
	    node.raws.before = this.spaces;
	    this.spaces = '';
	    if (node.type !== 'comment') this.semicolon = false;
	  }

	  other(start) {
	    let end = false;
	    let type = null;
	    let colon = false;
	    let bracket = null;
	    let brackets = [];
	    let customProperty = start[1].startsWith('--');

	    let tokens = [];
	    let token = start;
	    while (token) {
	      type = token[0];
	      tokens.push(token);

	      if (type === '(' || type === '[') {
	        if (!bracket) bracket = token;
	        brackets.push(type === '(' ? ')' : ']');
	      } else if (customProperty && colon && type === '{') {
	        if (!bracket) bracket = token;
	        brackets.push('}');
	      } else if (brackets.length === 0) {
	        if (type === ';') {
	          if (colon) {
	            this.decl(tokens, customProperty);
	            return
	          } else {
	            break
	          }
	        } else if (type === '{') {
	          this.rule(tokens);
	          return
	        } else if (type === '}') {
	          this.tokenizer.back(tokens.pop());
	          end = true;
	          break
	        } else if (type === ':') {
	          colon = true;
	        }
	      } else if (type === brackets[brackets.length - 1]) {
	        brackets.pop();
	        if (brackets.length === 0) bracket = null;
	      }

	      token = this.tokenizer.nextToken();
	    }

	    if (this.tokenizer.endOfFile()) end = true;
	    if (brackets.length > 0) this.unclosedBracket(bracket);

	    if (end && colon) {
	      if (!customProperty) {
	        while (tokens.length) {
	          token = tokens[tokens.length - 1][0];
	          if (token !== 'space' && token !== 'comment') break
	          this.tokenizer.back(tokens.pop());
	        }
	      }
	      this.decl(tokens, customProperty);
	    } else {
	      this.unknownWord(tokens);
	    }
	  }

	  parse() {
	    let token;
	    while (!this.tokenizer.endOfFile()) {
	      token = this.tokenizer.nextToken();

	      switch (token[0]) {
	        case 'space':
	          this.spaces += token[1];
	          break

	        case ';':
	          this.freeSemicolon(token);
	          break

	        case '}':
	          this.end(token);
	          break

	        case 'comment':
	          this.comment(token);
	          break

	        case 'at-word':
	          this.atrule(token);
	          break

	        case '{':
	          this.emptyRule(token);
	          break

	        default:
	          this.other(token);
	          break
	      }
	    }
	    this.endFile();
	  }

	  precheckMissedSemicolon(/* tokens */) {
	    // Hook for Safe Parser
	  }

	  raw(node, prop, tokens, customProperty) {
	    let token, type;
	    let length = tokens.length;
	    let value = '';
	    let clean = true;
	    let next, prev;

	    for (let i = 0; i < length; i += 1) {
	      token = tokens[i];
	      type = token[0];
	      if (type === 'space' && i === length - 1 && !customProperty) {
	        clean = false;
	      } else if (type === 'comment') {
	        prev = tokens[i - 1] ? tokens[i - 1][0] : 'empty';
	        next = tokens[i + 1] ? tokens[i + 1][0] : 'empty';
	        if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
	          if (value.slice(-1) === ',') {
	            clean = false;
	          } else {
	            value += token[1];
	          }
	        } else {
	          clean = false;
	        }
	      } else {
	        value += token[1];
	      }
	    }
	    if (!clean) {
	      let raw = tokens.reduce((all, i) => all + i[1], '');
	      node.raws[prop] = { raw, value };
	    }
	    node[prop] = value;
	  }

	  rule(tokens) {
	    tokens.pop();

	    let node = new Rule();
	    this.init(node, tokens[0][2]);

	    node.raws.between = this.spacesAndCommentsFromEnd(tokens);
	    this.raw(node, 'selector', tokens);
	    this.current = node;
	  }

	  spacesAndCommentsFromEnd(tokens) {
	    let lastTokenType;
	    let spaces = '';
	    while (tokens.length) {
	      lastTokenType = tokens[tokens.length - 1][0];
	      if (lastTokenType !== 'space' && lastTokenType !== 'comment') break
	      spaces = tokens.pop()[1] + spaces;
	    }
	    return spaces
	  }

	  // Errors

	  spacesAndCommentsFromStart(tokens) {
	    let next;
	    let spaces = '';
	    while (tokens.length) {
	      next = tokens[0][0];
	      if (next !== 'space' && next !== 'comment') break
	      spaces += tokens.shift()[1];
	    }
	    return spaces
	  }

	  spacesFromEnd(tokens) {
	    let lastTokenType;
	    let spaces = '';
	    while (tokens.length) {
	      lastTokenType = tokens[tokens.length - 1][0];
	      if (lastTokenType !== 'space') break
	      spaces = tokens.pop()[1] + spaces;
	    }
	    return spaces
	  }

	  stringFrom(tokens, from) {
	    let result = '';
	    for (let i = from; i < tokens.length; i++) {
	      result += tokens[i][1];
	    }
	    tokens.splice(from, tokens.length - from);
	    return result
	  }

	  unclosedBlock() {
	    let pos = this.current.source.start;
	    throw this.input.error('Unclosed block', pos.line, pos.column)
	  }

	  unclosedBracket(bracket) {
	    throw this.input.error(
	      'Unclosed bracket',
	      { offset: bracket[2] },
	      { offset: bracket[2] + 1 }
	    )
	  }

	  unexpectedClose(token) {
	    throw this.input.error(
	      'Unexpected }',
	      { offset: token[2] },
	      { offset: token[2] + 1 }
	    )
	  }

	  unknownWord(tokens) {
	    throw this.input.error(
	      'Unknown word ' + tokens[0][1],
	      { offset: tokens[0][2] },
	      { offset: tokens[0][2] + tokens[0][1].length }
	    )
	  }

	  unnamedAtrule(node, token) {
	    throw this.input.error(
	      'At-rule without name',
	      { offset: token[2] },
	      { offset: token[2] + token[1].length }
	    )
	  }
	}

	parser = Parser;
	return parser;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;

	let Container = /*@__PURE__*/ requireContainer();
	let Input = /*@__PURE__*/ requireInput();
	let Parser = /*@__PURE__*/ requireParser();

	function parse(css, opts) {
	  let input = new Input(css, opts);
	  let parser = new Parser(input);
	  try {
	    parser.parse();
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (e.name === 'CssSyntaxError' && opts && opts.from) {
	        if (/\.scss$/i.test(opts.from)) {
	          e.message +=
	            '\nYou tried to parse SCSS with ' +
	            'the standard CSS parser; ' +
	            'try again with the postcss-scss parser';
	        } else if (/\.sass/i.test(opts.from)) {
	          e.message +=
	            '\nYou tried to parse Sass with ' +
	            'the standard CSS parser; ' +
	            'try again with the postcss-sass parser';
	        } else if (/\.less$/i.test(opts.from)) {
	          e.message +=
	            '\nYou tried to parse Less with ' +
	            'the standard CSS parser; ' +
	            'try again with the postcss-less parser';
	        }
	      }
	    }
	    throw e
	  }

	  return parser.root
	}

	parse_1 = parse;
	parse.default = parse;

	Container.registerParse(parse);
	return parse_1;
}

var warning;
var hasRequiredWarning;

function requireWarning () {
	if (hasRequiredWarning) return warning;
	hasRequiredWarning = 1;

	class Warning {
	  constructor(text, opts = {}) {
	    this.type = 'warning';
	    this.text = text;

	    if (opts.node && opts.node.source) {
	      let range = opts.node.rangeBy(opts);
	      this.line = range.start.line;
	      this.column = range.start.column;
	      this.endLine = range.end.line;
	      this.endColumn = range.end.column;
	    }

	    for (let opt in opts) this[opt] = opts[opt];
	  }

	  toString() {
	    if (this.node) {
	      return this.node.error(this.text, {
	        index: this.index,
	        plugin: this.plugin,
	        word: this.word
	      }).message
	    }

	    if (this.plugin) {
	      return this.plugin + ': ' + this.text
	    }

	    return this.text
	  }
	}

	warning = Warning;
	Warning.default = Warning;
	return warning;
}

var result;
var hasRequiredResult;

function requireResult () {
	if (hasRequiredResult) return result;
	hasRequiredResult = 1;

	let Warning = /*@__PURE__*/ requireWarning();

	class Result {
	  get content() {
	    return this.css
	  }

	  constructor(processor, root, opts) {
	    this.processor = processor;
	    this.messages = [];
	    this.root = root;
	    this.opts = opts;
	    this.css = '';
	    this.map = undefined;
	  }

	  toString() {
	    return this.css
	  }

	  warn(text, opts = {}) {
	    if (!opts.plugin) {
	      if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
	        opts.plugin = this.lastPlugin.postcssPlugin;
	      }
	    }

	    let warning = new Warning(text, opts);
	    this.messages.push(warning);

	    return warning
	  }

	  warnings() {
	    return this.messages.filter(i => i.type === 'warning')
	  }
	}

	result = Result;
	Result.default = Result;
	return result;
}

/* eslint-disable no-console */

var warnOnce;
var hasRequiredWarnOnce;

function requireWarnOnce () {
	if (hasRequiredWarnOnce) return warnOnce;
	hasRequiredWarnOnce = 1;

	let printed = {};

	warnOnce = function warnOnce(message) {
	  if (printed[message]) return
	  printed[message] = true;

	  if (typeof console !== 'undefined' && console.warn) {
	    console.warn(message);
	  }
	};
	return warnOnce;
}

var lazyResult;
var hasRequiredLazyResult;

function requireLazyResult () {
	if (hasRequiredLazyResult) return lazyResult;
	hasRequiredLazyResult = 1;

	let Container = /*@__PURE__*/ requireContainer();
	let Document = /*@__PURE__*/ requireDocument();
	let MapGenerator = /*@__PURE__*/ requireMapGenerator();
	let parse = /*@__PURE__*/ requireParse();
	let Result = /*@__PURE__*/ requireResult();
	let Root = /*@__PURE__*/ requireRoot();
	let stringify = /*@__PURE__*/ requireStringify();
	let { isClean, my } = /*@__PURE__*/ requireSymbols();
	let warnOnce = /*@__PURE__*/ requireWarnOnce();

	const TYPE_TO_CLASS_NAME = {
	  atrule: 'AtRule',
	  comment: 'Comment',
	  decl: 'Declaration',
	  document: 'Document',
	  root: 'Root',
	  rule: 'Rule'
	};

	const PLUGIN_PROPS = {
	  AtRule: true,
	  AtRuleExit: true,
	  Comment: true,
	  CommentExit: true,
	  Declaration: true,
	  DeclarationExit: true,
	  Document: true,
	  DocumentExit: true,
	  Once: true,
	  OnceExit: true,
	  postcssPlugin: true,
	  prepare: true,
	  Root: true,
	  RootExit: true,
	  Rule: true,
	  RuleExit: true
	};

	const NOT_VISITORS = {
	  Once: true,
	  postcssPlugin: true,
	  prepare: true
	};

	const CHILDREN = 0;

	function isPromise(obj) {
	  return typeof obj === 'object' && typeof obj.then === 'function'
	}

	function getEvents(node) {
	  let key = false;
	  let type = TYPE_TO_CLASS_NAME[node.type];
	  if (node.type === 'decl') {
	    key = node.prop.toLowerCase();
	  } else if (node.type === 'atrule') {
	    key = node.name.toLowerCase();
	  }

	  if (key && node.append) {
	    return [
	      type,
	      type + '-' + key,
	      CHILDREN,
	      type + 'Exit',
	      type + 'Exit-' + key
	    ]
	  } else if (key) {
	    return [type, type + '-' + key, type + 'Exit', type + 'Exit-' + key]
	  } else if (node.append) {
	    return [type, CHILDREN, type + 'Exit']
	  } else {
	    return [type, type + 'Exit']
	  }
	}

	function toStack(node) {
	  let events;
	  if (node.type === 'document') {
	    events = ['Document', CHILDREN, 'DocumentExit'];
	  } else if (node.type === 'root') {
	    events = ['Root', CHILDREN, 'RootExit'];
	  } else {
	    events = getEvents(node);
	  }

	  return {
	    eventIndex: 0,
	    events,
	    iterator: 0,
	    node,
	    visitorIndex: 0,
	    visitors: []
	  }
	}

	function cleanMarks(node) {
	  node[isClean] = false;
	  if (node.nodes) node.nodes.forEach(i => cleanMarks(i));
	  return node
	}

	let postcss = {};

	class LazyResult {
	  get content() {
	    return this.stringify().content
	  }

	  get css() {
	    return this.stringify().css
	  }

	  get map() {
	    return this.stringify().map
	  }

	  get messages() {
	    return this.sync().messages
	  }

	  get opts() {
	    return this.result.opts
	  }

	  get processor() {
	    return this.result.processor
	  }

	  get root() {
	    return this.sync().root
	  }

	  get [Symbol.toStringTag]() {
	    return 'LazyResult'
	  }

	  constructor(processor, css, opts) {
	    this.stringified = false;
	    this.processed = false;

	    let root;
	    if (
	      typeof css === 'object' &&
	      css !== null &&
	      (css.type === 'root' || css.type === 'document')
	    ) {
	      root = cleanMarks(css);
	    } else if (css instanceof LazyResult || css instanceof Result) {
	      root = cleanMarks(css.root);
	      if (css.map) {
	        if (typeof opts.map === 'undefined') opts.map = {};
	        if (!opts.map.inline) opts.map.inline = false;
	        opts.map.prev = css.map;
	      }
	    } else {
	      let parser = parse;
	      if (opts.syntax) parser = opts.syntax.parse;
	      if (opts.parser) parser = opts.parser;
	      if (parser.parse) parser = parser.parse;

	      try {
	        root = parser(css, opts);
	      } catch (error) {
	        this.processed = true;
	        this.error = error;
	      }

	      if (root && !root[my]) {
	        /* c8 ignore next 2 */
	        Container.rebuild(root);
	      }
	    }

	    this.result = new Result(processor, root, opts);
	    this.helpers = { ...postcss, postcss, result: this.result };
	    this.plugins = this.processor.plugins.map(plugin => {
	      if (typeof plugin === 'object' && plugin.prepare) {
	        return { ...plugin, ...plugin.prepare(this.result) }
	      } else {
	        return plugin
	      }
	    });
	  }

	  async() {
	    if (this.error) return Promise.reject(this.error)
	    if (this.processed) return Promise.resolve(this.result)
	    if (!this.processing) {
	      this.processing = this.runAsync();
	    }
	    return this.processing
	  }

	  catch(onRejected) {
	    return this.async().catch(onRejected)
	  }

	  finally(onFinally) {
	    return this.async().then(onFinally, onFinally)
	  }

	  getAsyncError() {
	    throw new Error('Use process(css).then(cb) to work with async plugins')
	  }

	  handleError(error, node) {
	    let plugin = this.result.lastPlugin;
	    try {
	      if (node) node.addToError(error);
	      this.error = error;
	      if (error.name === 'CssSyntaxError' && !error.plugin) {
	        error.plugin = plugin.postcssPlugin;
	        error.setMessage();
	      } else if (plugin.postcssVersion) {
	        if (process.env.NODE_ENV !== 'production') {
	          let pluginName = plugin.postcssPlugin;
	          let pluginVer = plugin.postcssVersion;
	          let runtimeVer = this.result.processor.version;
	          let a = pluginVer.split('.');
	          let b = runtimeVer.split('.');

	          if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
	            // eslint-disable-next-line no-console
	            console.error(
	              'Unknown error from PostCSS plugin. Your current PostCSS ' +
	                'version is ' +
	                runtimeVer +
	                ', but ' +
	                pluginName +
	                ' uses ' +
	                pluginVer +
	                '. Perhaps this is the source of the error below.'
	            );
	          }
	        }
	      }
	    } catch (err) {
	      /* c8 ignore next 3 */
	      // eslint-disable-next-line no-console
	      if (console && console.error) console.error(err);
	    }
	    return error
	  }

	  prepareVisitors() {
	    this.listeners = {};
	    let add = (plugin, type, cb) => {
	      if (!this.listeners[type]) this.listeners[type] = [];
	      this.listeners[type].push([plugin, cb]);
	    };
	    for (let plugin of this.plugins) {
	      if (typeof plugin === 'object') {
	        for (let event in plugin) {
	          if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
	            throw new Error(
	              `Unknown event ${event} in ${plugin.postcssPlugin}. ` +
	                `Try to update PostCSS (${this.processor.version} now).`
	            )
	          }
	          if (!NOT_VISITORS[event]) {
	            if (typeof plugin[event] === 'object') {
	              for (let filter in plugin[event]) {
	                if (filter === '*') {
	                  add(plugin, event, plugin[event][filter]);
	                } else {
	                  add(
	                    plugin,
	                    event + '-' + filter.toLowerCase(),
	                    plugin[event][filter]
	                  );
	                }
	              }
	            } else if (typeof plugin[event] === 'function') {
	              add(plugin, event, plugin[event]);
	            }
	          }
	        }
	      }
	    }
	    this.hasListener = Object.keys(this.listeners).length > 0;
	  }

	  async runAsync() {
	    this.plugin = 0;
	    for (let i = 0; i < this.plugins.length; i++) {
	      let plugin = this.plugins[i];
	      let promise = this.runOnRoot(plugin);
	      if (isPromise(promise)) {
	        try {
	          await promise;
	        } catch (error) {
	          throw this.handleError(error)
	        }
	      }
	    }

	    this.prepareVisitors();
	    if (this.hasListener) {
	      let root = this.result.root;
	      while (!root[isClean]) {
	        root[isClean] = true;
	        let stack = [toStack(root)];
	        while (stack.length > 0) {
	          let promise = this.visitTick(stack);
	          if (isPromise(promise)) {
	            try {
	              await promise;
	            } catch (e) {
	              let node = stack[stack.length - 1].node;
	              throw this.handleError(e, node)
	            }
	          }
	        }
	      }

	      if (this.listeners.OnceExit) {
	        for (let [plugin, visitor] of this.listeners.OnceExit) {
	          this.result.lastPlugin = plugin;
	          try {
	            if (root.type === 'document') {
	              let roots = root.nodes.map(subRoot =>
	                visitor(subRoot, this.helpers)
	              );

	              await Promise.all(roots);
	            } else {
	              await visitor(root, this.helpers);
	            }
	          } catch (e) {
	            throw this.handleError(e)
	          }
	        }
	      }
	    }

	    this.processed = true;
	    return this.stringify()
	  }

	  runOnRoot(plugin) {
	    this.result.lastPlugin = plugin;
	    try {
	      if (typeof plugin === 'object' && plugin.Once) {
	        if (this.result.root.type === 'document') {
	          let roots = this.result.root.nodes.map(root =>
	            plugin.Once(root, this.helpers)
	          );

	          if (isPromise(roots[0])) {
	            return Promise.all(roots)
	          }

	          return roots
	        }

	        return plugin.Once(this.result.root, this.helpers)
	      } else if (typeof plugin === 'function') {
	        return plugin(this.result.root, this.result)
	      }
	    } catch (error) {
	      throw this.handleError(error)
	    }
	  }

	  stringify() {
	    if (this.error) throw this.error
	    if (this.stringified) return this.result
	    this.stringified = true;

	    this.sync();

	    let opts = this.result.opts;
	    let str = stringify;
	    if (opts.syntax) str = opts.syntax.stringify;
	    if (opts.stringifier) str = opts.stringifier;
	    if (str.stringify) str = str.stringify;

	    let map = new MapGenerator(str, this.result.root, this.result.opts);
	    let data = map.generate();
	    this.result.css = data[0];
	    this.result.map = data[1];

	    return this.result
	  }

	  sync() {
	    if (this.error) throw this.error
	    if (this.processed) return this.result
	    this.processed = true;

	    if (this.processing) {
	      throw this.getAsyncError()
	    }

	    for (let plugin of this.plugins) {
	      let promise = this.runOnRoot(plugin);
	      if (isPromise(promise)) {
	        throw this.getAsyncError()
	      }
	    }

	    this.prepareVisitors();
	    if (this.hasListener) {
	      let root = this.result.root;
	      while (!root[isClean]) {
	        root[isClean] = true;
	        this.walkSync(root);
	      }
	      if (this.listeners.OnceExit) {
	        if (root.type === 'document') {
	          for (let subRoot of root.nodes) {
	            this.visitSync(this.listeners.OnceExit, subRoot);
	          }
	        } else {
	          this.visitSync(this.listeners.OnceExit, root);
	        }
	      }
	    }

	    return this.result
	  }

	  then(onFulfilled, onRejected) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!('from' in this.opts)) {
	        warnOnce(
	          'Without `from` option PostCSS could generate wrong source map ' +
	            'and will not find Browserslist config. Set it to CSS file path ' +
	            'or to `undefined` to prevent this warning.'
	        );
	      }
	    }
	    return this.async().then(onFulfilled, onRejected)
	  }

	  toString() {
	    return this.css
	  }

	  visitSync(visitors, node) {
	    for (let [plugin, visitor] of visitors) {
	      this.result.lastPlugin = plugin;
	      let promise;
	      try {
	        promise = visitor(node, this.helpers);
	      } catch (e) {
	        throw this.handleError(e, node.proxyOf)
	      }
	      if (node.type !== 'root' && node.type !== 'document' && !node.parent) {
	        return true
	      }
	      if (isPromise(promise)) {
	        throw this.getAsyncError()
	      }
	    }
	  }

	  visitTick(stack) {
	    let visit = stack[stack.length - 1];
	    let { node, visitors } = visit;

	    if (node.type !== 'root' && node.type !== 'document' && !node.parent) {
	      stack.pop();
	      return
	    }

	    if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
	      let [plugin, visitor] = visitors[visit.visitorIndex];
	      visit.visitorIndex += 1;
	      if (visit.visitorIndex === visitors.length) {
	        visit.visitors = [];
	        visit.visitorIndex = 0;
	      }
	      this.result.lastPlugin = plugin;
	      try {
	        return visitor(node.toProxy(), this.helpers)
	      } catch (e) {
	        throw this.handleError(e, node)
	      }
	    }

	    if (visit.iterator !== 0) {
	      let iterator = visit.iterator;
	      let child;
	      while ((child = node.nodes[node.indexes[iterator]])) {
	        node.indexes[iterator] += 1;
	        if (!child[isClean]) {
	          child[isClean] = true;
	          stack.push(toStack(child));
	          return
	        }
	      }
	      visit.iterator = 0;
	      delete node.indexes[iterator];
	    }

	    let events = visit.events;
	    while (visit.eventIndex < events.length) {
	      let event = events[visit.eventIndex];
	      visit.eventIndex += 1;
	      if (event === CHILDREN) {
	        if (node.nodes && node.nodes.length) {
	          node[isClean] = true;
	          visit.iterator = node.getIterator();
	        }
	        return
	      } else if (this.listeners[event]) {
	        visit.visitors = this.listeners[event];
	        return
	      }
	    }
	    stack.pop();
	  }

	  walkSync(node) {
	    node[isClean] = true;
	    let events = getEvents(node);
	    for (let event of events) {
	      if (event === CHILDREN) {
	        if (node.nodes) {
	          node.each(child => {
	            if (!child[isClean]) this.walkSync(child);
	          });
	        }
	      } else {
	        let visitors = this.listeners[event];
	        if (visitors) {
	          if (this.visitSync(visitors, node.toProxy())) return
	        }
	      }
	    }
	  }

	  warnings() {
	    return this.sync().warnings()
	  }
	}

	LazyResult.registerPostcss = dependant => {
	  postcss = dependant;
	};

	lazyResult = LazyResult;
	LazyResult.default = LazyResult;

	Root.registerLazyResult(LazyResult);
	Document.registerLazyResult(LazyResult);
	return lazyResult;
}

var noWorkResult;
var hasRequiredNoWorkResult;

function requireNoWorkResult () {
	if (hasRequiredNoWorkResult) return noWorkResult;
	hasRequiredNoWorkResult = 1;

	let MapGenerator = /*@__PURE__*/ requireMapGenerator();
	let parse = /*@__PURE__*/ requireParse();
	const Result = /*@__PURE__*/ requireResult();
	let stringify = /*@__PURE__*/ requireStringify();
	let warnOnce = /*@__PURE__*/ requireWarnOnce();

	class NoWorkResult {
	  get content() {
	    return this.result.css
	  }

	  get css() {
	    return this.result.css
	  }

	  get map() {
	    return this.result.map
	  }

	  get messages() {
	    return []
	  }

	  get opts() {
	    return this.result.opts
	  }

	  get processor() {
	    return this.result.processor
	  }

	  get root() {
	    if (this._root) {
	      return this._root
	    }

	    let root;
	    let parser = parse;

	    try {
	      root = parser(this._css, this._opts);
	    } catch (error) {
	      this.error = error;
	    }

	    if (this.error) {
	      throw this.error
	    } else {
	      this._root = root;
	      return root
	    }
	  }

	  get [Symbol.toStringTag]() {
	    return 'NoWorkResult'
	  }

	  constructor(processor, css, opts) {
	    css = css.toString();
	    this.stringified = false;

	    this._processor = processor;
	    this._css = css;
	    this._opts = opts;
	    this._map = undefined;
	    let root;

	    let str = stringify;
	    this.result = new Result(this._processor, root, this._opts);
	    this.result.css = css;

	    let self = this;
	    Object.defineProperty(this.result, 'root', {
	      get() {
	        return self.root
	      }
	    });

	    let map = new MapGenerator(str, root, this._opts, css);
	    if (map.isMap()) {
	      let [generatedCSS, generatedMap] = map.generate();
	      if (generatedCSS) {
	        this.result.css = generatedCSS;
	      }
	      if (generatedMap) {
	        this.result.map = generatedMap;
	      }
	    } else {
	      map.clearAnnotation();
	      this.result.css = map.css;
	    }
	  }

	  async() {
	    if (this.error) return Promise.reject(this.error)
	    return Promise.resolve(this.result)
	  }

	  catch(onRejected) {
	    return this.async().catch(onRejected)
	  }

	  finally(onFinally) {
	    return this.async().then(onFinally, onFinally)
	  }

	  sync() {
	    if (this.error) throw this.error
	    return this.result
	  }

	  then(onFulfilled, onRejected) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!('from' in this._opts)) {
	        warnOnce(
	          'Without `from` option PostCSS could generate wrong source map ' +
	            'and will not find Browserslist config. Set it to CSS file path ' +
	            'or to `undefined` to prevent this warning.'
	        );
	      }
	    }

	    return this.async().then(onFulfilled, onRejected)
	  }

	  toString() {
	    return this._css
	  }

	  warnings() {
	    return []
	  }
	}

	noWorkResult = NoWorkResult;
	NoWorkResult.default = NoWorkResult;
	return noWorkResult;
}

var processor;
var hasRequiredProcessor;

function requireProcessor () {
	if (hasRequiredProcessor) return processor;
	hasRequiredProcessor = 1;

	let Document = /*@__PURE__*/ requireDocument();
	let LazyResult = /*@__PURE__*/ requireLazyResult();
	let NoWorkResult = /*@__PURE__*/ requireNoWorkResult();
	let Root = /*@__PURE__*/ requireRoot();

	class Processor {
	  constructor(plugins = []) {
	    this.version = '8.5.6';
	    this.plugins = this.normalize(plugins);
	  }

	  normalize(plugins) {
	    let normalized = [];
	    for (let i of plugins) {
	      if (i.postcss === true) {
	        i = i();
	      } else if (i.postcss) {
	        i = i.postcss;
	      }

	      if (typeof i === 'object' && Array.isArray(i.plugins)) {
	        normalized = normalized.concat(i.plugins);
	      } else if (typeof i === 'object' && i.postcssPlugin) {
	        normalized.push(i);
	      } else if (typeof i === 'function') {
	        normalized.push(i);
	      } else if (typeof i === 'object' && (i.parse || i.stringify)) {
	        if (process.env.NODE_ENV !== 'production') {
	          throw new Error(
	            'PostCSS syntaxes cannot be used as plugins. Instead, please use ' +
	              'one of the syntax/parser/stringifier options as outlined ' +
	              'in your PostCSS runner documentation.'
	          )
	        }
	      } else {
	        throw new Error(i + ' is not a PostCSS plugin')
	      }
	    }
	    return normalized
	  }

	  process(css, opts = {}) {
	    if (
	      !this.plugins.length &&
	      !opts.parser &&
	      !opts.stringifier &&
	      !opts.syntax
	    ) {
	      return new NoWorkResult(this, css, opts)
	    } else {
	      return new LazyResult(this, css, opts)
	    }
	  }

	  use(plugin) {
	    this.plugins = this.plugins.concat(this.normalize([plugin]));
	    return this
	  }
	}

	processor = Processor;
	Processor.default = Processor;

	Root.registerProcessor(Processor);
	Document.registerProcessor(Processor);
	return processor;
}

var postcss_1;
var hasRequiredPostcss;

function requirePostcss () {
	if (hasRequiredPostcss) return postcss_1;
	hasRequiredPostcss = 1;

	let AtRule = /*@__PURE__*/ requireAtRule();
	let Comment = /*@__PURE__*/ requireComment();
	let Container = /*@__PURE__*/ requireContainer();
	let CssSyntaxError = /*@__PURE__*/ requireCssSyntaxError();
	let Declaration = /*@__PURE__*/ requireDeclaration();
	let Document = /*@__PURE__*/ requireDocument();
	let fromJSON = /*@__PURE__*/ requireFromJSON();
	let Input = /*@__PURE__*/ requireInput();
	let LazyResult = /*@__PURE__*/ requireLazyResult();
	let list = /*@__PURE__*/ requireList();
	let Node = /*@__PURE__*/ requireNode();
	let parse = /*@__PURE__*/ requireParse();
	let Processor = /*@__PURE__*/ requireProcessor();
	let Result = /*@__PURE__*/ requireResult();
	let Root = /*@__PURE__*/ requireRoot();
	let Rule = /*@__PURE__*/ requireRule();
	let stringify = /*@__PURE__*/ requireStringify();
	let Warning = /*@__PURE__*/ requireWarning();

	function postcss(...plugins) {
	  if (plugins.length === 1 && Array.isArray(plugins[0])) {
	    plugins = plugins[0];
	  }
	  return new Processor(plugins)
	}

	postcss.plugin = function plugin(name, initializer) {
	  let warningPrinted = false;
	  function creator(...args) {
	    // eslint-disable-next-line no-console
	    if (console && console.warn && !warningPrinted) {
	      warningPrinted = true;
	      // eslint-disable-next-line no-console
	      console.warn(
	        name +
	          ': postcss.plugin was deprecated. Migration guide:\n' +
	          'https://evilmartians.com/chronicles/postcss-8-plugin-migration'
	      );
	      if (process.env.LANG && process.env.LANG.startsWith('cn')) {
	        /* c8 ignore next 7 */
	        // eslint-disable-next-line no-console
	        console.warn(
	          name +
	            ': 里面 postcss.plugin 被弃用. 迁移指南:\n' +
	            'https://www.w3ctech.com/topic/2226'
	        );
	      }
	    }
	    let transformer = initializer(...args);
	    transformer.postcssPlugin = name;
	    transformer.postcssVersion = new Processor().version;
	    return transformer
	  }

	  let cache;
	  Object.defineProperty(creator, 'postcss', {
	    get() {
	      if (!cache) cache = creator();
	      return cache
	    }
	  });

	  creator.process = function (css, processOpts, pluginOpts) {
	    return postcss([creator(pluginOpts)]).process(css, processOpts)
	  };

	  return creator
	};

	postcss.stringify = stringify;
	postcss.parse = parse;
	postcss.fromJSON = fromJSON;
	postcss.list = list;

	postcss.comment = defaults => new Comment(defaults);
	postcss.atRule = defaults => new AtRule(defaults);
	postcss.decl = defaults => new Declaration(defaults);
	postcss.rule = defaults => new Rule(defaults);
	postcss.root = defaults => new Root(defaults);
	postcss.document = defaults => new Document(defaults);

	postcss.CssSyntaxError = CssSyntaxError;
	postcss.Declaration = Declaration;
	postcss.Container = Container;
	postcss.Processor = Processor;
	postcss.Document = Document;
	postcss.Comment = Comment;
	postcss.Warning = Warning;
	postcss.AtRule = AtRule;
	postcss.Result = Result;
	postcss.Input = Input;
	postcss.Rule = Rule;
	postcss.Root = Root;
	postcss.Node = Node;

	LazyResult.registerPostcss(postcss);

	postcss_1 = postcss;
	postcss.default = postcss;
	return postcss_1;
}

var postcssExports = /*@__PURE__*/ requirePostcss();
var postcss = /*@__PURE__*/getDefaultExportFromCjs(postcssExports);

postcss.stringify;
postcss.fromJSON;
postcss.plugin;
postcss.parse;
postcss.list;

postcss.document;
postcss.comment;
postcss.atRule;
postcss.rule;
postcss.decl;
postcss.root;

postcss.CssSyntaxError;
postcss.Declaration;
postcss.Container;
postcss.Processor;
postcss.Document;
postcss.Comment;
const Warning = postcss.Warning;
postcss.AtRule;
postcss.Result;
postcss.Input;
postcss.Rule;
postcss.Root;
postcss.Node;

function dom2ToString(r, platform) {
  if (platform === "app-harmony") {
    return createObjToCppString(r);
  }
  return JSON.stringify;
}
function createObjToCppString(r) {
  return function objToCppString(obj, depth = 0) {
    if (depth === 0 && Object.keys(obj).length === 0) {
      return "{}";
    }
    const method = depth === 0 ? r("make_style_sheet") : depth === 1 ? r("make_property_map") : r("make_styles");
    const entries = [];
    const variableEntries = [];
    Object.entries(obj).forEach(([key, value]) => {
      if (value == "null") {
        value = "nullptr";
      }
      const keyString = key.includes("::") ? key : `"${key}"`;
      if (depth >= 2) {
        if (key.startsWith("--")) {
          variableEntries.push(`{"${key}", "${value}"}`);
        } else {
          if (keyString[0] === "!") {
            entries.push(
              `{${keyString.slice(1)}, UniCSSPropertyValueImportant(${value})}`
            );
          } else {
            entries.push(`{${keyString}, ${value}}`);
          }
        }
      } else {
        entries.push(
          `{${keyString}, ${objToCppString(
            value,
            depth + 1
          )}}`
        );
      }
    });
    if (variableEntries.length) {
      entries.unshift(
        `{${r("UniCSSPropertyID")}::Variable, ${r("UniCSSPropertyValueVariable")}{${variableEntries.join(
          ", "
        )}}}`
      );
    }
    return `${method}({${entries.join(",")}})`;
  };
}
function createDecl(prop, value, important, raws, source) {
  const decl = {
    type: "decl",
    prop,
    value: value.toString(),
    raws,
    source
  };
  if (important) {
    decl.important = true;
  }
  return decl;
}

var appCssJson = {
	"align-content": {
		type: "UniCSSAlignContentType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleAlignContent"
				}
			}
		},
		values: [
			"auto",
			"flex-start",
			"center",
			"flex-end",
			"stretch",
			"baseline",
			"space-between",
			"space-around",
			"space-evenly"
		],
		defaultValue: "stretch"
	},
	"align-items": {
		type: "UniCSSAlignItemsType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleAlignItems"
				}
			}
		},
		values: [
			"auto",
			"flex-start",
			"center",
			"flex-end",
			"stretch",
			"baseline",
			"space-between",
			"space-around",
			"space-evenly"
		],
		defaultValue: "stretch"
	},
	"align-self": {
		type: "UniCSSAlignSelfType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleAlignSelf"
				}
			}
		},
		values: [
			"auto",
			"flex-start",
			"center",
			"flex-end",
			"stretch",
			"baseline",
			"space-between",
			"space-around",
			"space-evenly"
		],
		defaultValue: "auto"
	},
	"flex-basis": {
		type: [
			"UniCSSUnitValue",
			"UniCSSFlexBasisType"
		],
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleFlexBasis"
				}
			}
		},
		values: [
			"auto",
			"content"
		],
		defaultValue: "auto"
	},
	"flex-direction": {
		type: "UniCSSFlexDirectionType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleFlexDirection"
				}
			}
		},
		values: [
			"row",
			"row-reverse",
			"column",
			"column-reverse"
		],
		defaultValue: "column"
	},
	"flex-grow": {
		type: "number",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleFlexGrow"
				}
			}
		}
	},
	"flex-shrink": {
		type: "number",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleFlexShrink"
				}
			}
		}
	},
	"flex-wrap": {
		type: "UniCSSFlexWrapType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleFlexWrap"
				}
			}
		},
		values: [
			"nowrap",
			"wrap",
			"wrap-reverse"
		],
		defaultValue: "nowrap"
	},
	"justify-content": {
		type: "UniCSSJustifyContentType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleJustifyContent"
				}
			}
		},
		values: [
			"auto",
			"flex-start",
			"center",
			"flex-end",
			"stretch",
			"baseline",
			"space-between",
			"space-around",
			"space-evenly"
		],
		defaultValue: "flex-start"
	},
	bottom: {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBottom"
				}
			}
		}
	},
	display: {
		type: "UniCSSDisplayType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleDisplay"
				},
				"nv-c": {
					type: "UniNativeDisplayType",
					setter: "display"
				}
			},
			"app-android": {
				"dom-c": {
					setter: "setStyleDisplay"
				},
				"nv-kt": {
					setter: "display"
				}
			}
		},
		values: [
			"flex",
			"none"
		],
		defaultValue: "flex"
	},
	height: {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleHeight"
				}
			}
		}
	},
	left: {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleLeft"
				}
			}
		}
	},
	"max-height": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleMaxHeight"
				}
			}
		}
	},
	"max-width": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleMaxWidth"
				}
			}
		}
	},
	"min-height": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleMinHeight"
				}
			}
		}
	},
	"min-width": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleMinWidth"
				}
			}
		}
	},
	position: {
		type: "UniCSSPositionType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStylePosition"
				},
				"nv-c": {
					type: "UniNativePositionType",
					setter: "position"
				}
			},
			"app-android": {
				"dom-c": {
					setter: "setStylePosition"
				},
				"nv-kt": {
					setter: "position"
				}
			}
		},
		values: [
			"relative",
			"absolute",
			"fixed",
			"sticky",
			"static"
		],
		defaultValue: "relative"
	},
	right: {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleRight"
				}
			}
		}
	},
	top: {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleTop"
				}
			}
		}
	},
	width: {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleWidth"
				}
			}
		}
	},
	visibility: {
		type: "UniCSSVisibilityType",
		uniPlatform: {
			app: {
				"nv-c": {
					type: "UniNativeVisibilityType",
					setter: "visibility"
				}
			},
			"app-android": {
				"nv-kt": {
					type: "UniNativeVisibilityType",
					setter: "visibility"
				}
			}
		},
		values: [
			"visible",
			"hidden"
		],
		defaultValue: "visible"
	},
	"background-clip": {
		type: "UniNativeBackgroundClip",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "backgroundClip"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "backgroundClip"
				}
			}
		},
		values: [
			"border-box",
			"padding-box",
			"content-box"
		],
		defaultValue: "border-box"
	},
	"background-color": {
		type: "UniNativeColor",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "backgroundColor"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "backgroundColor"
				}
			}
		}
	},
	"background-image": {
		type: "UniNativeBackgroundImage",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "backgroundImage"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "backgroundImage"
				}
			}
		}
	},
	"border-color": {
		type: "UniNativeBorderColors",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "borderColor"
				}
			}
		}
	},
	"border-bottom-color": {
		type: "UniNativeBorderColor",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "borderColorBottom"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "borderColorBottom"
				}
			}
		}
	},
	"border-left-color": {
		type: "UniNativeBorderColor",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "borderColorLeft"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "borderColorBottom"
				}
			}
		}
	},
	"border-right-color": {
		type: "UniNativeBorderColor",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "borderColorRight"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "borderColorBottom"
				}
			}
		}
	},
	"border-top-color": {
		type: "UniNativeBorderColor",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "borderColorTop"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "borderColorBottom"
				}
			}
		}
	},
	"border-style": {
		type: "UniCSSBorderStyleType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBorderStyle"
				},
				"nv-c": {
					type: "UniNativeBorderStyles",
					setter: "borderStyle"
				}
			}
		},
		values: [
			"none",
			"solid",
			"dashed",
			"dotted"
		],
		defaultValue: "none"
	},
	"border-bottom-style": {
		type: "UniCSSBorderStyleType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBorderBottomStyle"
				},
				"nv-c": {
					type: "UniNativeBorderStyle",
					setter: "borderStyleBottom"
				}
			},
			"app-android": {
				"dom-c": {
					setter: "setStyleBorderBottomStyle"
				},
				"nv-kt": {
					setter: "borderStyleBottom"
				}
			}
		},
		values: [
			"none",
			"solid",
			"dashed",
			"dotted"
		],
		defaultValue: "none"
	},
	"border-left-style": {
		type: "UniCSSBorderStyleType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBorderLeftStyle"
				},
				"nv-c": {
					type: "UniNativeBorderStyle",
					setter: "borderStyleLeft"
				}
			},
			"app-android": {
				"dom-c": {
					setter: "setStyleBorderBottomStyle"
				},
				"nv-kt": {
					setter: "borderStyleLeft"
				}
			}
		},
		values: [
			"none",
			"solid",
			"dashed",
			"dotted"
		],
		defaultValue: "none"
	},
	"border-right-style": {
		type: "UniCSSBorderStyleType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBorderRightStyle"
				},
				"nv-c": {
					type: "UniNativeBorderStyle",
					setter: "borderStyleRight"
				}
			},
			"app-android": {
				"dom-c": {
					setter: "setStyleBorderBottomStyle"
				},
				"nv-kt": {
					setter: "borderStyleRight"
				}
			}
		},
		values: [
			"none",
			"solid",
			"dashed",
			"dotted"
		],
		defaultValue: "none"
	},
	"border-top-style": {
		type: "UniCSSBorderStyleType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBorderTopStyle"
				},
				"nv-c": {
					type: "UniNativeBorderStyle",
					setter: "borderStyleTop"
				}
			},
			"app-android": {
				"dom-c": {
					setter: "setStyleBorderBottomStyle"
				},
				"nv-kt": {
					setter: "borderStyleTop"
				}
			}
		},
		values: [
			"none",
			"solid",
			"dashed",
			"dotted"
		],
		defaultValue: "none"
	},
	"border-bottom-width": {
		type: [
			"UniCSSUnitValue",
			"UniCSSBorderWidthType"
		],
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBorderBottomWidth"
				}
			}
		},
		values: [
			"thin",
			"medium",
			"thick"
		],
		defaultValue: "medium"
	},
	"border-left-width": {
		type: [
			"UniCSSUnitValue",
			"UniCSSBorderWidthType"
		],
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBorderLeftWidth"
				}
			}
		},
		values: [
			"thin",
			"medium",
			"thick"
		],
		defaultValue: "medium"
	},
	"border-right-width": {
		type: [
			"UniCSSUnitValue",
			"UniCSSBorderWidthType"
		],
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBorderRightWidth"
				}
			}
		},
		values: [
			"thin",
			"medium",
			"thick"
		],
		defaultValue: "medium"
	},
	"border-top-width": {
		type: [
			"UniCSSUnitValue",
			"UniCSSBorderWidthType"
		],
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBorderTopWidth"
				}
			}
		},
		values: [
			"thin",
			"medium",
			"thick"
		],
		defaultValue: "medium"
	},
	"border-bottom-left-radius": {
		type: "UniNativeBorderRadius",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "borderRadiusBottomLeft"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "borderRadiusBottomLeft"
				}
			}
		}
	},
	"border-bottom-right-radius": {
		type: "UniNativeBorderRadius",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "borderRadiusBottomRight"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "borderRadiusBottomRight"
				}
			}
		}
	},
	"border-top-left-radius": {
		type: "UniNativeBorderRadius",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "borderRadiusTopLeft"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "borderRadiusTopLeft"
				}
			}
		}
	},
	"border-top-right-radius": {
		type: "UniNativeBorderRadius",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "borderRadiusTopRight"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "borderRadiusTopRight"
				}
			}
		}
	},
	"box-shadow": {
		type: "UniNativeBoxShadow",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "boxShadow"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "boxShadow"
				}
			}
		}
	},
	"box-sizing": {
		type: "UniCSSBoxSizingType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleBoxSizing"
				}
			}
		},
		values: [
			"content-box",
			"border-box"
		],
		defaultValue: "border-box"
	},
	"margin-bottom": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleMarginBottom"
				}
			}
		}
	},
	"margin-left": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleMarginLeft"
				}
			}
		}
	},
	"margin-right": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleMarginRight"
				}
			}
		}
	},
	"margin-top": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleMarginTop"
				}
			}
		}
	},
	"padding-bottom": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStylePaddingBottom"
				}
			}
		}
	},
	"padding-left": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStylePaddingLeft"
				}
			}
		}
	},
	"padding-right": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStylePaddingRight"
				}
			}
		}
	},
	"padding-top": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStylePaddingTop"
				}
			}
		}
	},
	opacity: {
		type: "number",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "opacity"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "opacity"
				}
			}
		}
	},
	overflow: {
		type: "UniNativeOverflowType",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "overflow"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "overflow"
				}
			}
		},
		values: [
			"visible",
			"hidden"
		],
		defaultValue: "hidden"
	},
	"pointer-events": {
		type: "UniNativePointerEventType",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "pointerEvents"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "pointerEvents"
				}
			}
		},
		values: [
			"auto",
			"none"
		],
		defaultValue: "auto"
	},
	"z-index": {
		type: "number",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "zIndex"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "zIndex"
				}
			}
		}
	},
	transform: {
		type: "UniNativeTransform",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "transform"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "transform"
				}
			}
		}
	},
	"transform-origin": {
		type: "UniNativeTransformOrigin",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "transformOrigin"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "transformOrigin"
				}
			}
		}
	},
	"transition-delay": {
		type: "UniNativeTransitionDelay",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "transitionDelay"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "transitionDelay"
				}
			}
		}
	},
	"transition-duration": {
		type: "UniNativeTransitionDuration",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "transitionDuration"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "transitionDuration"
				}
			}
		}
	},
	"transition-property": {
		type: [
			"UniNativeTransitionProperty",
			"UniNativeTransitionPropertys"
		],
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "transitionProperty"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "transitionProperty"
				}
			}
		}
	},
	"transition-timing-function": {
		type: "UniNativeTransitionTimingFunction",
		uniPlatform: {
			app: {
				"nv-c": {
					setter: "transitionTimingFunction"
				}
			},
			"app-android": {
				"nv-kt": {
					setter: "transitionTimingFunction"
				}
			}
		}
	},
	color: {
		type: "UniNativeColor",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setColor"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setColor"
				}
			}
		}
	},
	"font-family": {
		type: "string",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setFontFamily"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setFontFamily"
				}
			}
		}
	},
	"font-size": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setFontSize"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setFontSize"
				}
			}
		}
	},
	"font-style": {
		type: "UniCSSFontStyleType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setFontStyle"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setFontStyle"
				}
			}
		},
		values: [
			"normal",
			"italic"
		],
		defaultValue: "normal"
	},
	"font-weight": {
		type: [
			"number",
			"UniCSSFontWeightType"
		],
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setFontWeight"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setFontWeight"
				}
			}
		},
		values: [
			"normal",
			"bold",
			"lighter",
			"bolder"
		],
		defaultValue: "normal"
	},
	"letter-spacing": {
		type: "UniCSSUnitValue",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setLetterSpacing"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setLetterSpacing"
				}
			}
		}
	},
	"line-height": {
		type: [
			"UniCSSUnitValue",
			"UniCSSLineHeightType"
		],
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setLineHeight"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setLineHeight"
				}
			}
		},
		values: [
			"normal"
		],
		defaultValue: "1.2"
	},
	"text-align": {
		type: "UniCSSTextAlign",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setTextAlign"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setTextAlign"
				}
			}
		},
		values: [
			"left",
			"right",
			"center"
		],
		defaultValue: "left"
	},
	"text-decoration-line": {
		type: "UniCSSTextDecorationLineType",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setTextDecorationLine"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setTextDecorationLine"
				}
			}
		},
		values: [
			"none",
			"underline",
			"overline",
			"line-through"
		],
		defaultValue: "none"
	},
	"text-overflow": {
		type: "UniCSSTextOverflow",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setTextOverflow"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setTextOverflow"
				}
			}
		},
		values: [
			"clip",
			"ellipsis"
		],
		defaultValue: "clip"
	},
	"text-shadow": {
		type: "UniCSSTextShadow",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setTextShadow"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setTextShadow"
				}
			}
		}
	},
	"white-space": {
		type: "UniCSSWhiteSpace",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setWhiteSpace"
				}
			},
			"app-android": {
				"txt-kt": {
					setter: "setWhiteSpace"
				}
			}
		},
		values: [
			"normal",
			"nowrap",
			"pre",
			"pre-wrap",
			"pre-line",
			"break-spaces"
		],
		defaultValue: "normal"
	},
	"--*": {
		description: "css变量",
		type: "string",
		uniPlatform: {
			app: {
				"dom-c": {
					setter: "setStyleVariable"
				}
			}
		}
	}
};

var CSSPropertyProcessorType = /* @__PURE__ */ ((CSSPropertyProcessorType2) => {
  CSSPropertyProcessorType2["Enum"] = "enum";
  CSSPropertyProcessorType2["Unit"] = "unit";
  CSSPropertyProcessorType2["Number"] = "number";
  CSSPropertyProcessorType2["String"] = "string";
  CSSPropertyProcessorType2["Color"] = "color";
  CSSPropertyProcessorType2["Struct"] = "struct";
  CSSPropertyProcessorType2["DefineVariable"] = "defineVariable";
  CSSPropertyProcessorType2["SetVariable"] = "setVariable";
  CSSPropertyProcessorType2["Other"] = "other";
  CSSPropertyProcessorType2["Combined"] = "combined";
  return CSSPropertyProcessorType2;
})(CSSPropertyProcessorType || {});

function createDefineStyleVariableProcessor() {
  const processor = (value, propertyName) => {
    return createValueProcessorResult(
      `"${value}"`,
      `defineStyleVariable("${propertyName}", "${value}")`
    );
  };
  processor.type = CSSPropertyProcessorType.DefineVariable;
  return processor;
}
const defineStyleVariableProcessor = createDefineStyleVariableProcessor();
function createSetStyleVariableProcessor(r) {
  const processor = (value, propertyName) => {
    return createValueProcessorResult(
      `"${value}"`,
      `setStyleVariable(${r("UniCSSPropertyID")}.${shared.capitalize(
        shared.camelize(propertyName)
      )}, "${value}")`
    );
  };
  processor.type = CSSPropertyProcessorType.SetVariable;
  return processor;
}

function getAppCssJson() {
  return appCssJson;
}
function createValueProcessorResult(valueCode, setterCode) {
  return {
    valueCode,
    setterCode
  };
}
function createValueProcessorError(value, propertyName) {
  return {
    error: `Property '${propertyName}' has invalid value: '${value}'`,
    valueCode: "",
    setterCode: ""
  };
}
function wrapPropertyProcessor(r, processor) {
  const setStyleVariableProcessor = createSetStyleVariableProcessor(r);
  return (value, propertyName, options) => {
    if (typeof value === "string" && value.includes("var(")) {
      return setStyleVariableProcessor(value, propertyName, options);
    }
    return processor(value, propertyName, options);
  };
}
function createPropertyProcessor(r, processor, type) {
  const wrappedProcessor = type === CSSPropertyProcessorType.DefineVariable || type === CSSPropertyProcessorType.SetVariable ? processor : wrapPropertyProcessor(r, processor);
  wrappedProcessor.type = type;
  return wrappedProcessor;
}
const PARTS_REG = /\s(?![^(]*\))/;
const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/;
const isLength = (v) => v === "0" || LENGTH_REG.test(v);
function getTargetConfig(propertyName, platform, target) {
  const property = getAppCssJson()[propertyName];
  if (!property || !property.uniPlatform) {
    return null;
  }
  const specificPlatform = platform;
  const generalPlatform = "app";
  const platformConfig = property.uniPlatform[specificPlatform] || property.uniPlatform[generalPlatform];
  if (!platformConfig) {
    return null;
  }
  if (propertyName === "background-color" && target === "dom-c") {
    return {
      setter: "setBackgroundColor"
    };
  }
  return platformConfig[target] || null;
}
function normalizeDurationToMilliseconds(enumValue) {
  const match = /^(-?\d*\.?\d+)(ms|s)$/i.exec(enumValue.trim());
  if (!match) {
    return null;
  }
  const numericPart = parseFloat(match[1]);
  if (Number.isNaN(numericPart)) {
    return null;
  }
  const unit = match[2].toLowerCase();
  const milliseconds = unit === "s" ? numericPart * 1e3 : numericPart;
  if (!Number.isFinite(milliseconds)) {
    return null;
  }
  return formatFloatLiteral(milliseconds);
}
function formatFloatLiteral(value) {
  const str = value.toString();
  return str.includes(".") ? str : `${str}.0`;
}

const UNIT_TYPES = ["UniCSSUnitValue", "UniNativeBorderRadius"];
function isUnitType(propertyType) {
  return propertyType ? UNIT_TYPES.includes(propertyType) : false;
}
function toUnitValueCode(unitValue, language) {
  if (language === "cpp") {
    return `UniCSSUnitValue{${unitValue.value}, UniCSSUnitType::${unitValue.unit}}`;
  }
  return `new UniCSSUnitValue(${unitValue.value}, UniCSSUnitType.${unitValue.unit})`;
}
function toUnitValueResult(setter, language, unitValue) {
  return createValueProcessorResult(
    toUnitValueCode(unitValue, language),
    `${setter}(${unitValue.value}, UniCSSUnitType.${unitValue.unit})`
  );
}
function createSetStyleUnitValueProcessor(r, setter, language) {
  return createPropertyProcessor(
    r,
    (value, propertyName) => {
      const unitValue = parseUnitValue(
        String(value),
        propertyName === "line-height" ? "EM" : "NONE"
      );
      if (unitValue) {
        return toUnitValueResult(setter, language, unitValue);
      }
      return createValueProcessorError(value, propertyName);
    },
    CSSPropertyProcessorType.Unit
  );
}
const unitMatchRe = /^(-?(?:\d*\.\d+|\d+\.?\d*))(%|[a-zA-Z]+)?$/;
function parseUnitValue(value, defaultUnit = "NONE") {
  if (value === "auto") {
    return {
      value: 0,
      unit: "AUTO"
    };
  }
  const unitMatch = value.match(unitMatchRe);
  if (unitMatch) {
    const value2 = parseFloat(unitMatch[1]);
    const unit = unitMatch[2] ? unitMatch[2].toUpperCase() : null;
    if (unit === null) {
      return {
        value: value2,
        unit: defaultUnit
      };
    }
    return {
      value: value2,
      unit: unit === "%" ? "PCT" : unit
    };
  }
}

function createSetStyleEnumValueProcessor(r, setter, genEnumCode) {
  return createPropertyProcessor(
    r,
    (value) => {
      const enumCode = genEnumCode(shared.capitalize(shared.camelize(value + "")));
      return createValueProcessorResult(
        enumCode,
        setter ? `${setter}(${enumCode})` : enumCode
      );
    },
    CSSPropertyProcessorType.Enum
  );
}
function createGenEnumCode(propertyType, language, platform, target) {
  if (language === "cpp") {
    return (enumValue) => {
      return `${propertyType}::${shared.capitalize(shared.camelize(enumValue + ""))}`;
    };
  }
  if (platform === "app-harmony" || platform === "app-ios") {
    return (enumValue) => {
      return genCPPEnumCode(propertyType, enumValue);
    };
  }
  return (enumValue) => {
    return `${propertyType}.${shared.capitalize(shared.camelize(enumValue + ""))}`;
  };
}
function genCPPEnumCode(propertyType, enumValue) {
  return `UTSCPP.propertyAccess(${propertyType}, "::", "${shared.capitalize(
    shared.camelize(enumValue + "")
  )}")`;
}

const COLOR_TYPES = ["UniNativeColor", "UniNativeBorderColor"];
function isColorType(propertyType) {
  return propertyType ? COLOR_TYPES.includes(propertyType) : false;
}
const dummyValueProcessorResult = createValueProcessorResult("", "");
function createSetStyleNativeColorValueProcessor(r, setter) {
  return createPropertyProcessor(
    r,
    (value, propertyName, options) => {
      if ((options == null ? void 0 : options.target) === "dom-c" && propertyName === "background-color") {
        if ((options == null ? void 0 : options.tagName) !== "text") {
          return dummyValueProcessorResult;
        }
      }
      if ((options == null ? void 0 : options.target) === "nv-c" && propertyName === "background-color" && (options == null ? void 0 : options.tagName) === "text") {
        return dummyValueProcessorResult;
      }
      const nativeColorValue = parseNativeColorValue(String(value));
      if (nativeColorValue) {
        return createValueProcessorResult(
          `${nativeColorValue}`,
          `${setter}(${nativeColorValue})`
        );
      }
      return createValueProcessorError(value, propertyName);
    },
    CSSPropertyProcessorType.Color
  );
}
function parseNativeColorValue(value) {
  const color = tinycolor(value);
  if (color.isValid()) {
    const hex8 = color.toHex8();
    const argb = hex8.slice(6, 8) + hex8.slice(0, 6);
    return "0x" + argb;
  }
}

const NUMBER_TYPES = ["number"];
function isNumberType(propertyType) {
  return propertyType ? NUMBER_TYPES.includes(propertyType) : false;
}
function createSetStyleNumberValueProcessor(r, setter) {
  return createPropertyProcessor(
    r,
    (value, propertyName) => {
      const numValue = parseFloat(String(value));
      if (!isNaN(numValue)) {
        return createValueProcessorResult(
          `${numValue}`,
          `${setter}(${numValue})`
        );
      }
      return createValueProcessorError(value, propertyName);
    },
    CSSPropertyProcessorType.Number
  );
}

const STRING_TYPES = ["string"];
function isStringType(propertyType) {
  return propertyType ? STRING_TYPES.includes(propertyType) : false;
}
function createSetStyleStringValueProcessor(r, setter) {
  return createPropertyProcessor(
    r,
    (value) => {
      return createValueProcessorResult(`"${value}"`, `${setter}("${value}")`);
    },
    CSSPropertyProcessorType.String
  );
}

const BOX_SHADOW_TYPES = ["UniNativeBoxShadow"];
function isBoxShadowType(propertyType) {
  return propertyType ? BOX_SHADOW_TYPES.includes(propertyType) : false;
}
function createSetStyleBoxShadowValueProcessor(r, setter) {
  return createPropertyProcessor(
    r,
    (value) => {
      if (value === "none") {
        return createValueProcessorResult(`null`, `${setter}(null)`);
      }
      const boxShadowValueCode = stringifyBoxShadowValue(
        parseBoxShadowValue(String(value))
      );
      return createValueProcessorResult(
        `${boxShadowValueCode}`,
        `${setter}(${boxShadowValueCode})`
      );
    },
    CSSPropertyProcessorType.Struct
  );
}
function stringifyBoxShadowValue(value) {
  return `UniNativeBoxShadow(${value.isInset}, ${value.offsetX}, ${value.offsetY}, ${value.blurRadius}, ${value.spreadRadius}, ${value.color})`;
}
function parseBoxShadowValue(str) {
  const parts = str.split(PARTS_REG);
  const isInset = parts.includes("inset");
  const last = parts.slice(-1)[0];
  const color = !isLength(last) ? parseNativeColorValue(last) : void 0;
  const unitValues = parts.filter((n) => n !== "inset").filter((n) => n !== color).map((v) => parseUnitValue(v));
  if (unitValues.length < 4) {
    unitValues.push(
      ...Array(4 - unitValues.length).fill({ value: 0, unit: "NONE" })
    );
  }
  const [offsetX, offsetY, blurRadius, spreadRadius] = unitValues.map(
    (v) => (v == null ? void 0 : v.value) || 0
  );
  return {
    isInset,
    offsetX,
    offsetY,
    blurRadius,
    spreadRadius,
    color: color || 0
  };
}

const BORDER_COLOR_TYPES = ["UniNativeBorderColors"];
function isBorderColorsType(propertyType) {
  return propertyType ? BORDER_COLOR_TYPES.includes(propertyType) : false;
}
function createSetStyleBorderColorsValueProcessor(r, setter) {
  return createPropertyProcessor(
    r,
    (value) => {
      const borderColorsValueCode = stringifyBorderColorsValue(
        parseBorderColorsValue(String(value))
      );
      return createValueProcessorResult(
        `${borderColorsValueCode}`,
        `${setter}(${borderColorsValueCode})`
      );
    },
    CSSPropertyProcessorType.Struct
  );
}
function stringifyBorderColorsValue(value) {
  return `UniNativeBorderColors(${value.top}, ${value.right}, ${value.bottom}, ${value.left})`;
}
function parseBorderColorsValue(str) {
  const parts = str.split(" ");
  const [top, right, bottom, left] = parts.map(
    parseNativeColorValue
  );
  return {
    top,
    right,
    bottom,
    left
  };
}

const BORDER_STYLE_TYPES = ["UniNativeBorderStyles"];
function isBorderStylesType(propertyType) {
  return propertyType ? BORDER_STYLE_TYPES.includes(propertyType) : false;
}
function createSetStyleBorderStylesValueProcessor(r, setter, processorMap) {
  return createPropertyProcessor(
    r,
    (value) => {
      const borderStylesValueCode = stringifyBorderStylesValue(
        parseBorderStylesValue(String(value), processorMap)
      );
      return createValueProcessorResult(
        `${borderStylesValueCode}`,
        `${setter}(${borderStylesValueCode})`
      );
    },
    CSSPropertyProcessorType.Struct
  );
}
function stringifyBorderStylesValue(value) {
  return `UniNativeBorderStyles(${value.top}, ${value.right}, ${value.bottom}, ${value.left})`;
}
function parseBorderStylesValue(str, processorMap) {
  const parts = str.split(" ");
  const [top, right, bottom, left] = parts;
  return {
    top: processorMap[`border-top-style`](top, "border-top-style").valueCode,
    right: processorMap[`border-right-style`](right, "border-right-style").valueCode,
    bottom: processorMap[`border-bottom-style`](bottom, "border-bottom-style").valueCode,
    left: processorMap[`border-left-style`](left, "border-left-style").valueCode
  };
}

const TEXT_SHADOW_TYPES = ["UniCSSTextShadow"];
function isTextShadowType(propertyType) {
  return propertyType ? TEXT_SHADOW_TYPES.includes(propertyType) : false;
}
function createSetStyleTextShadowValueProcessor(r, setter) {
  return createPropertyProcessor(
    r,
    (value) => {
      if (value === "none") {
        return createValueProcessorResult(`null`, `${setter}(null)`);
      }
      const textShadowValueCode = stringifyTextShadowValue(
        parseTextShadowValue(String(value))
      );
      return createValueProcessorResult(
        `${textShadowValueCode}`,
        `${setter}(${textShadowValueCode})`
      );
    },
    CSSPropertyProcessorType.Struct
  );
}
function stringifyTextShadowValue(value) {
  if (!value.color) {
    return `UniCSSTextShadow(${value.offsetX}, ${value.offsetY}, ${value.blurRadius})`;
  } else {
    return `UniCSSTextShadow(${value.offsetX}, ${value.offsetY}, ${value.blurRadius}, ${value.color})`;
  }
}
function parseTextShadowValue(str) {
  var _a, _b, _c;
  const parts = str.split(PARTS_REG);
  const unitValues = [];
  let color;
  for (const part of parts) {
    if (isLength(part)) {
      const unitValue = parseUnitValue(part);
      if (unitValue) {
        unitValues.push(unitValue);
      }
    } else {
      color = parseNativeColorValue(part);
    }
  }
  return {
    color: color || "",
    offsetX: ((_a = unitValues[0]) == null ? void 0 : _a.value) || 0,
    offsetY: ((_b = unitValues[1]) == null ? void 0 : _b.value) || 0,
    blurRadius: ((_c = unitValues[2]) == null ? void 0 : _c.value) || 0
  };
}

const TRANSFORM_TYPES = ["UniNativeTransform"];
function isTransformType(propertyType) {
  return propertyType ? TRANSFORM_TYPES.includes(propertyType) : false;
}
function createSetStyleTransformValueProcessor(r, setter, language) {
  return createPropertyProcessor(
    r,
    (value, propertyName) => {
      if (value === "none") {
        return createValueProcessorResult(`null`, `${setter}(null)`);
      }
      const transformValueCode = stringifyTransformValue(
        parseTransformValue(String(value)),
        language
      );
      if (!transformValueCode) {
        return createValueProcessorError(value, propertyName);
      }
      return createValueProcessorResult(
        `${transformValueCode}`,
        `${setter}(${transformValueCode})`
      );
    },
    CSSPropertyProcessorType.Struct
  );
}
function genCode$1(language, className, method, args) {
  if (language === "cpp") {
    return `${className}::${shared.capitalize(shared.camelize(method + ""))}(${args.join(
      ", "
    )})`;
  }
  return `${genCPPEnumCode(className, method)}(${args.join(", ")})`;
}
const TRANSFORM_CLASS_NAME = "UniCSSTransform";
const translateOption = {
  className: `${TRANSFORM_CLASS_NAME}Translate`,
  type: CSSPropertyProcessorType.Unit,
  spread: true
};
const scaleOption = {
  className: `${TRANSFORM_CLASS_NAME}Scale`,
  type: CSSPropertyProcessorType.Unit,
  spread: true
};
const rotateOption = {
  className: `${TRANSFORM_CLASS_NAME}Rotate`,
  type: CSSPropertyProcessorType.Unit,
  spread: true
};
const skewOption = {
  className: `${TRANSFORM_CLASS_NAME}Skew`,
  type: CSSPropertyProcessorType.Unit,
  spread: true
};
const matrixOption = {
  className: `${TRANSFORM_CLASS_NAME}Matrix`,
  type: CSSPropertyProcessorType.Number
};
const matrix3dOption = {
  className: `${TRANSFORM_CLASS_NAME}Matrix3D`,
  type: CSSPropertyProcessorType.Number
};
const perspectiveOption = {
  className: `${TRANSFORM_CLASS_NAME}Perspective`,
  type: CSSPropertyProcessorType.Unit,
  spread: true
};
const transformOptions = {
  translate: translateOption,
  translateX: translateOption,
  translateY: translateOption,
  translateZ: translateOption,
  translate3d: shared.extend({}, translateOption, { spread: false }),
  scale: scaleOption,
  scaleX: scaleOption,
  scaleY: scaleOption,
  scaleZ: scaleOption,
  scale3d: shared.extend({}, scaleOption, { spread: false }),
  rotate: rotateOption,
  rotateX: rotateOption,
  rotateY: rotateOption,
  rotateZ: rotateOption,
  rotate3d: shared.extend({}, rotateOption, { spread: false }),
  skew: skewOption,
  skewX: skewOption,
  skewY: skewOption,
  matrix: matrixOption,
  matrix3d: matrix3dOption,
  perspective: perspectiveOption
};
function stringifyTransformValue(functions, language) {
  if (functions.length === 0) {
    return "";
  }
  const functionCodes = functions.map((func) => {
    const args = func.args;
    const option = transformOptions[func.name];
    if (option) {
      if (option.type === CSSPropertyProcessorType.Unit) {
        const operator = language === "cpp" ? "::" : ".";
        return genCode$1(
          language,
          option.className,
          shared.capitalize(func.name.toLowerCase()),
          args.map((arg) => {
            if (option.spread) {
              return `${arg.value}, UniCSSUnitType${operator}${arg.unit}`;
            }
            return toUnitValueCode(arg, language);
          })
        );
      } else if (option.type === CSSPropertyProcessorType.Number) {
        return genCode$1(
          language,
          option.className,
          shared.capitalize(func.name.toLowerCase()),
          args.map((arg) => `${arg.value}`)
        );
      }
    }
    return "";
  }).filter((code) => code !== "");
  if (functionCodes.length === 0) {
    return "";
  }
  if (language === "cpp") {
    return `${TRANSFORM_CLASS_NAME}{${functionCodes.join(", ")}}`;
  }
  return `[${functionCodes.join(", ")}] as ${TRANSFORM_CLASS_NAME}`;
}
function parseTransformValue(str) {
  const functions = [];
  const functionRegex = /(\w+)\(([^)]+)\)/g;
  let match;
  while ((match = functionRegex.exec(str)) !== null) {
    const funcName = match[1];
    const argsString = match[2];
    const args = parseTransformArgs(funcName, argsString);
    if (args.length > 0) {
      functions.push({
        name: funcName,
        args
      });
    }
  }
  return functions;
}
function parseTransformArgs(funcName, argsString) {
  const parts = argsString.split(/[,\s]+/).filter((part) => part.trim() !== "");
  const args = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (isAngleFunction(funcName)) {
      const angleValue = parseAngleValue(trimmed);
      if (angleValue !== null) {
        args.push({ value: angleValue, unit: "DEG" });
      }
    } else if (isScaleFunction(funcName)) {
      const numValue = parseFloat(trimmed);
      if (!isNaN(numValue)) {
        args.push({ value: numValue, unit: "NONE" });
      }
    } else if (funcName === "matrix" || funcName === "matrix3d") {
      const numValue = parseFloat(trimmed);
      if (!isNaN(numValue)) {
        args.push({ value: numValue, unit: "NONE" });
      }
    } else {
      const unitValue = parseUnitValue(trimmed);
      if (unitValue) {
        args.push({ value: unitValue.value, unit: unitValue.unit });
      }
    }
  }
  return args;
}
function isAngleFunction(funcName) {
  return [
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "rotate3d",
    "skew",
    "skewX",
    "skewY"
  ].includes(funcName);
}
function isScaleFunction(funcName) {
  return ["scale", "scaleX", "scaleY", "scaleZ", "scale3d"].includes(funcName);
}
function parseAngleValue(value) {
  const angleRegex = /^(-?[\d.]+)(deg|rad|grad|turn)?$/;
  const match = value.match(angleRegex);
  if (match) {
    const numValue = parseFloat(match[1]);
    const unit = match[2] || "deg";
    switch (unit) {
      case "deg":
        return numValue;
      case "rad":
        return numValue * (180 / Math.PI);
      case "grad":
        return numValue * (180 / 200);
      case "turn":
        return numValue * 360;
      default:
        return numValue;
    }
  }
  return null;
}

const TRANSFORM_ORIGIN_TYPES = ["UniNativeTransformOrigin"];
function isTransformOriginType(propertyType) {
  return propertyType ? TRANSFORM_ORIGIN_TYPES.includes(propertyType) : false;
}
function createSetStyleTransformOriginValueProcessor(r, setter, language) {
  return createPropertyProcessor(
    r,
    (value, propertyName) => {
      const result = parseTransformOriginValue(String(value), language);
      if (!result.code) {
        return createValueProcessorError(value, propertyName);
      }
      return createValueProcessorResult(
        result.code,
        `${setter}(${result.code})`
      );
    },
    CSSPropertyProcessorType.Struct
  );
}
function parseTransformOriginValue(str, language) {
  const parts = str.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { code: "" };
  }
  if (parts.length === 1) {
    const keywordExpansion = expandSingleKeyword(parts[0]);
    if (keywordExpansion) {
      return { code: buildTransformOriginCode(keywordExpansion, language) };
    }
    const parsed = parseUnitValue(parts[0]);
    if (parsed) {
      return {
        code: buildTransformOriginCode(
          [
            {
              value: parsed.value,
              unit: parsed.unit
            }
          ],
          language
        )
      };
    }
    return {
      code: ""
    };
  }
  if (parts.length === 2 || parts.length === 3) {
    const x = parseAxisValue(parts[0], "x");
    if ("error" in x) {
      return { code: "", error: x.error };
    }
    const y = parseAxisValue(parts[1], "y");
    if ("error" in y) {
      return { code: "", error: y.error };
    }
    const values = [x, y];
    if (parts.length === 3) {
      const z = parseZValue(parts[2]);
      if ("error" in z) {
        return { code: "", error: z.error };
      }
      values.push(z);
    }
    return { code: buildTransformOriginCode(values, language) };
  }
  return {
    code: ""
  };
}
function buildTransformOriginCode(values, language) {
  const args = values.map((v) => toUnitValueCode(v, language)).join(", ");
  return `UniCSSTransformOrigin(${args})`;
}
function expandSingleKeyword(part) {
  const lower = part.toLowerCase();
  const mapping = SINGLE_KEYWORD_MAP[lower];
  if (!mapping) {
    return null;
  }
  return mapping.map((item) => ({ value: item.value, unit: item.unit }));
}
function parseAxisValue(part, axis) {
  const lower = part.toLowerCase();
  let keywordValue = axisKeywordToValue(lower, axis);
  if (keywordValue) {
    return {
      value: keywordValue.value,
      unit: keywordValue.unit
    };
  }
  const otherAxis = axis === "x" ? "y" : "x";
  keywordValue = axisKeywordToValue(lower, otherAxis);
  if (keywordValue) {
    return {
      value: keywordValue.value,
      unit: keywordValue.unit
    };
  }
  const unitValue = parseUnitValue(part);
  if (unitValue) {
    return {
      value: unitValue.value,
      unit: unitValue.unit
    };
  }
  return {
    error: `Invalid transform-origin value: ${part}`
  };
}
function parseZValue(part) {
  const lower = part.toLowerCase();
  if (isAxisKeyword(lower)) {
    return {
      error: `Invalid transform-origin value: ${part}`
    };
  }
  const unitValue = parseUnitValue(part);
  if (!unitValue || unitValue.unit === "PCT") {
    return {
      error: `Invalid transform-origin value: ${part}`
    };
  }
  return {
    value: unitValue.value,
    unit: unitValue.unit
  };
}
function isAxisKeyword(keyword) {
  return keyword in X_AXIS_KEYWORD_MAP || keyword in Y_AXIS_KEYWORD_MAP;
}
function axisKeywordToValue(keyword, axis) {
  if (axis === "x") {
    return X_AXIS_KEYWORD_MAP[keyword] || null;
  }
  return Y_AXIS_KEYWORD_MAP[keyword] || null;
}
const X_AXIS_KEYWORD_MAP = {
  left: { value: 0, unit: "PCT" },
  center: { value: 50, unit: "PCT" },
  right: { value: 100, unit: "PCT" }
};
const Y_AXIS_KEYWORD_MAP = {
  top: { value: 0, unit: "PCT" },
  center: { value: 50, unit: "PCT" },
  bottom: { value: 100, unit: "PCT" }
};
const SINGLE_KEYWORD_MAP = {
  left: [
    { value: 0, unit: "PCT" },
    { value: 50, unit: "PCT" },
    { value: 0, unit: "NONE" }
  ],
  center: [
    { value: 50, unit: "PCT" },
    { value: 50, unit: "PCT" },
    { value: 0, unit: "NONE" }
  ],
  right: [
    { value: 100, unit: "PCT" },
    { value: 50, unit: "PCT" },
    { value: 0, unit: "NONE" }
  ],
  top: [
    { value: 50, unit: "PCT" },
    { value: 0, unit: "PCT" },
    { value: 0, unit: "NONE" }
  ],
  bottom: [
    { value: 50, unit: "PCT" },
    { value: 100, unit: "PCT" },
    { value: 0, unit: "NONE" }
  ]
};

const BORDER_WIDTH_TYPES = ["UniCSSBorderWidthType"];
function isBorderWidthType(propertyType) {
  return propertyType ? BORDER_WIDTH_TYPES.includes(propertyType) : false;
}
const ENUM_BORDER_WIDTH_TYPE_VALUES = {
  thin: 1,
  medium: 3,
  thick: 5
};
function createSetStyleBorderWidthValueProcessor(r, setter, language) {
  return createPropertyProcessor(
    r,
    (value, propertyName) => {
      const pxValue = ENUM_BORDER_WIDTH_TYPE_VALUES[value];
      if (pxValue) {
        return toUnitValueResult(setter, language, {
          value: pxValue,
          unit: "PX"
        });
      }
      return createValueProcessorError(value, propertyName);
    },
    CSSPropertyProcessorType.Enum
  );
}

const BACKGROUND_IMAGE_TYPES = ["UniNativeBackgroundImage"];
function isBackgroundImageType(propertyType) {
  return propertyType ? BACKGROUND_IMAGE_TYPES.includes(propertyType) : false;
}
function createSetStyleBackgroundImageValueProcessor(r, setter, language) {
  return createPropertyProcessor(
    r,
    (value, propertyName) => {
      const valueStr = String(value).trim();
      if (valueStr === "none") {
        return createValueProcessorResult(`null`, `${setter}(null)`);
      }
      if (valueStr.startsWith("linear-gradient(")) {
        const gradientCode = parseLinearGradient(valueStr, language);
        if (!gradientCode) {
          return createValueProcessorError(value, propertyName);
        }
        return createValueProcessorResult(
          gradientCode,
          `${setter}(${gradientCode})`
        );
      }
      return createValueProcessorError(value, propertyName);
    },
    CSSPropertyProcessorType.Struct
  );
}
function parseLinearGradient(str, language) {
  const content = str.slice(16, -1).trim();
  const parts = splitGradientArgs(content);
  if (parts.length < 2) {
    return "";
  }
  const firstPart = parts[0].trim();
  let direction = "";
  let startIndex = 0;
  if (isDirectionKeyword(firstPart)) {
    direction = parseDirection(firstPart, language);
    startIndex = 1;
  } else if (firstPart.includes("deg")) {
    const angle = parseFloat(firstPart);
    direction = language === "cpp" ? `UniNativeLinearGradientDirectionType::Angle(${angle})` : `UTSCPP.propertyAccess(UniNativeLinearGradientDirectionType, "::", "Angle")(${angle})`;
    startIndex = 1;
  } else {
    direction = language === "cpp" ? "UniNativeLinearGradientDirectionType::ToBottom" : 'UTSCPP.propertyAccess(UniNativeLinearGradientDirectionType, "::", "ToBottom")';
    startIndex = 0;
  }
  const colorStops = [];
  for (let i = startIndex; i < parts.length; i++) {
    const stop = parseColorStop(parts[i].trim());
    if (stop) {
      colorStops.push(stop);
    }
  }
  if (colorStops.length < 2) {
    return "";
  }
  if (language === "cpp") {
    const colorStopsCode = colorStops.map((stop) => {
      const color = typeof stop.color === "number" ? `0x${stop.color.toString(16).padStart(8, "0")}` : stop.color;
      return `{${color}, 0.0f}`;
    }).join(", ");
    return `UniNativeLinearGradient(${direction}, {${colorStopsCode}})`;
  } else {
    const colorStopsCode = colorStops.map((stop) => {
      const color = typeof stop.color === "number" ? `0x${stop.color.toString(16).padStart(8, "0")}` : stop.color;
      return `new UniNativeLinearGradientColorStop(${color}, 0)`;
    }).join(",");
    return `new UniNativeLinearGradient(${direction},[${colorStopsCode}])`;
  }
}
function splitGradientArgs(str) {
  const parts = [];
  let current = "";
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === "(") {
      depth++;
      current += char;
    } else if (char === ")") {
      depth--;
      current += char;
    } else if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    parts.push(current.trim());
  }
  return parts;
}
function isDirectionKeyword(str) {
  const keywords = [
    "to top",
    "to bottom",
    "to left",
    "to right",
    "to top left",
    "to top right",
    "to bottom left",
    "to bottom right",
    "to left top",
    "to right top",
    "to left bottom",
    "to right bottom"
  ];
  return keywords.includes(str.toLowerCase());
}
function parseDirection(str, language) {
  const lower = str.toLowerCase();
  const directionMap = {
    "to top": "ToTop",
    "to bottom": "ToBottom",
    "to left": "ToLeft",
    "to right": "ToRight",
    "to top left": "ToTopLeft",
    "to left top": "ToTopLeft",
    "to top right": "ToTopRight",
    "to right top": "ToTopRight",
    "to bottom left": "ToBottomLeft",
    "to left bottom": "ToBottomLeft",
    "to bottom right": "ToBottomRight",
    "to right bottom": "ToBottomRight"
  };
  const directionName = directionMap[lower] || "ToBottom";
  if (language === "cpp") {
    return `UniNativeLinearGradientDirectionType::${directionName}`;
  } else {
    return `UTSCPP.propertyAccess(UniNativeLinearGradientDirectionType, "::", "${directionName}")`;
  }
}
function parseColorStop(str) {
  let colorStr = str;
  let depth = 0;
  let lastSpaceIndex = -1;
  for (let i = str.length - 1; i >= 0; i--) {
    const char = str[i];
    if (char === ")") {
      depth++;
    } else if (char === "(") {
      depth--;
    } else if (char === " " && depth === 0) {
      lastSpaceIndex = i;
      break;
    }
  }
  if (lastSpaceIndex > 0) {
    const potentialPosition = str.slice(lastSpaceIndex + 1).trim();
    if (potentialPosition.includes("%") || potentialPosition.match(/^\d+(\.\d+)?$/)) {
      colorStr = str.slice(0, lastSpaceIndex).trim();
    }
  }
  const color = parseNativeColorValue(colorStr);
  if (color !== void 0 && color !== "") {
    return {
      color
    };
  }
  return null;
}

const TRANSITION_CLASS_NAME = "UniNativeTransition";
const TRANSITION_DELAY_CLASS_NAME = `${TRANSITION_CLASS_NAME}Delay`;
const TRANSITION_DURATION_CLASS_NAME = `${TRANSITION_CLASS_NAME}Duration`;
const TRANSITION_PROPERTY_CLASS_NAME = `${TRANSITION_CLASS_NAME}Property`;
const TRANSITION_TIMING_FUNCTION_CLASS_NAME = `${TRANSITION_CLASS_NAME}TimingFunction`;
const TRANSITION_TYPES = [
  TRANSITION_DELAY_CLASS_NAME,
  TRANSITION_DURATION_CLASS_NAME,
  TRANSITION_PROPERTY_CLASS_NAME,
  // 复数，单词拼写不对，应该是：Properties
  TRANSITION_PROPERTY_CLASS_NAME + "s",
  TRANSITION_TIMING_FUNCTION_CLASS_NAME
];
function isTransitionType(propertyType) {
  return propertyType ? TRANSITION_TYPES.includes(propertyType) : false;
}
function createSetStyleTransitionValueProcessor(r, setter, language, propertyType) {
  return createPropertyProcessor(
    r,
    (value, propertyName) => {
      if (value === "none") {
        return createValueProcessorResult(`null`, `${setter}(null)`);
      }
      let code = "";
      if (propertyType === TRANSITION_DELAY_CLASS_NAME || propertyType === TRANSITION_DURATION_CLASS_NAME) {
        code = parseTransitionDurationValue(String(value));
      } else if (propertyType === TRANSITION_PROPERTY_CLASS_NAME) {
        code = parseTransitionPropertyValue(
          String(value),
          propertyType,
          language
        );
      } else if (propertyType === TRANSITION_TIMING_FUNCTION_CLASS_NAME) {
        code = parseTransitionTimingFunctionValue(
          String(value),
          propertyType,
          language
        );
      }
      if (!code) {
        return createValueProcessorError(value, propertyName);
      }
      return createValueProcessorResult(code, `${setter}(${code})`);
    },
    CSSPropertyProcessorType.Struct
  );
}
function parseTransitionPropertyValue(value, propertyType, language) {
  const trimmedValue = value.trim();
  if (!trimmedValue) return "";
  const properties = trimmedValue.includes(",") ? trimmedValue.split(",").map((p) => p.trim()) : [trimmedValue];
  if (language === "cpp") {
    return properties.length > 1 ? `UniNativeTransitionPropertys{${properties.map((p) => `${propertyType}::${shared.capitalize(shared.camelize(p))}`).join(",")}}` : `${propertyType}::${shared.capitalize(shared.camelize(properties[0]))}`;
  } else {
    return properties.length > 1 ? `[${properties.map(
      (p) => `UTSCPP.propertyAccess(${propertyType}, "::" , "${shared.capitalize(
        shared.camelize(p)
      )}")`
    ).join(",")}]` : genCPPEnumCode(propertyType, properties[0]);
  }
}
function parseTransitionTimingFunctionValue(value, propertyType, language) {
  const trimmedValue = value.trim();
  if (!trimmedValue) return "";
  const functions = [];
  let current = "";
  let parenthesesDepth = 0;
  for (let i = 0; i < trimmedValue.length; i++) {
    const char = trimmedValue[i];
    if (char === "(") {
      parenthesesDepth++;
      current += char;
    } else if (char === ")") {
      parenthesesDepth--;
      current += char;
    } else if (char === "," && parenthesesDepth === 0) {
      if (current.trim()) {
        functions.push(current.trim());
      }
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    functions.push(current.trim());
  }
  const parseSingleFunction = (fn) => {
    const cubicBezierMatch = fn.match(
      /cubic-bezier\s*\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)/
    );
    if (cubicBezierMatch) {
      const [, x1, y1, x2, y2] = cubicBezierMatch;
      const params = `${x1}, ${y1}, ${x2}, ${y2}`;
      if (language === "cpp") {
        return `${propertyType}(UniCSSTransitionTimingFunction::CubicBezier(${params}))`;
      } else {
        return `UTSCPP.propertyAccess(${propertyType}, "::", "CubicBezier(${params})")`;
      }
    }
    if (language === "cpp") {
      return `${propertyType}(UniCSSTransitionTimingFunction::${shared.capitalize(
        shared.camelize(fn)
      )}())`;
    } else {
      return `UTSCPP.propertyAccess(${propertyType}, "::", "${shared.capitalize(
        shared.camelize(fn)
      )}()")`;
    }
  };
  if (functions.length > 1) {
    if (language === "cpp") {
      return `UniNativeTransitionTimingFunctions{${functions.map(parseSingleFunction).join(",")}}`;
    } else {
      return `[${functions.map(parseSingleFunction).join(",")}]`;
    }
  }
  return parseSingleFunction(functions[0]);
}
function parseTransitionDurationValue(str, language) {
  const normalized = normalizeDurationToMilliseconds(str);
  if (normalized === null) {
    return "0.0";
  }
  return normalized;
}

const processorMapCache = /* @__PURE__ */ new Map();
function getCacheKey(platform, target, language) {
  return `${platform}:${target}:${language}`;
}
function createDom2PropertyProcessors(r, platform, target, language) {
  const cacheKey = getCacheKey(platform, target, language);
  if (processorMapCache.has(cacheKey)) {
    return processorMapCache.get(cacheKey);
  }
  const processorMap = {};
  const allProperties = Object.keys(getAppCssJson());
  allProperties.forEach((propertyName) => {
    const targetConfig = target === "all" ? {
      setter: "setStyle"
    } : getTargetConfig(propertyName, platform, target);
    if (targetConfig) {
      const setter = targetConfig.setter;
      const propertyType = targetConfig.type || getAppCssJson()[propertyName].type;
      if (typeof propertyType === "string") {
        const processor = createStyleValueProcessor(r, propertyType, setter);
        if (processor) {
          processorMap[propertyName] = processor;
        }
      } else if (Array.isArray(propertyType)) {
        const processor = createCombinedStyleValueProcessor(
          r,
          propertyType,
          setter
        );
        if (processor) {
          processorMap[propertyName] = processor;
        }
      }
    }
  });
  processorMapCache.set(cacheKey, processorMap);
  return processorMap;
  function createCombinedStyleValueProcessor(r2, propertyTypes, setter) {
    const processorSet = /* @__PURE__ */ new Set();
    propertyTypes.forEach((type) => {
      const processor = createStyleValueProcessor(r2, type, setter);
      if (processor) {
        processorSet.add(processor);
      }
    });
    const processors = Array.from(processorSet);
    if (processors.length === 0) {
      return void 0;
    }
    if (processors.length === 1) {
      return processors[0];
    }
    return createPropertyProcessor(
      r2,
      (value, propertyName) => {
        for (const processor of processors) {
          const result = processor(value, propertyName);
          if (!result.error) {
            return result;
          }
        }
        return createValueProcessorError(value, propertyName);
      },
      CSSPropertyProcessorType.Combined
    );
  }
  function createStyleValueProcessor(r2, propertyType, setter) {
    if (isUnitType(propertyType)) {
      return createSetStyleUnitValueProcessor(r2, setter, language);
    } else if (isColorType(propertyType)) {
      return createSetStyleNativeColorValueProcessor(r2, setter);
    } else if (isNumberType(propertyType)) {
      return createSetStyleNumberValueProcessor(r2, setter);
    } else if (isStringType(propertyType)) {
      return createSetStyleStringValueProcessor(r2, setter);
    } else if (isBorderColorsType(propertyType)) {
      return createSetStyleBorderColorsValueProcessor(r2, setter);
    } else if (isBorderStylesType(propertyType)) {
      return createSetStyleBorderStylesValueProcessor(r2, setter, processorMap);
    } else if (isBorderWidthType(propertyType)) {
      return createSetStyleBorderWidthValueProcessor(r2, setter, language);
    } else if (isBoxShadowType(propertyType)) {
      return createSetStyleBoxShadowValueProcessor(r2, setter);
    } else if (isTextShadowType(propertyType)) {
      return createSetStyleTextShadowValueProcessor(r2, setter);
    } else if (isTransformType(propertyType)) {
      return createSetStyleTransformValueProcessor(r2, setter, language);
    } else if (isTransformOriginType(propertyType)) {
      return createSetStyleTransformOriginValueProcessor(r2, setter, language);
    } else if (isBackgroundImageType(propertyType)) {
      return createSetStyleBackgroundImageValueProcessor(r2, setter, language);
    } else if (isTransitionType(propertyType)) {
      return createSetStyleTransitionValueProcessor(
        r2,
        setter,
        language,
        propertyType
      );
    } else if (propertyType) {
      return createSetStyleEnumValueProcessor(
        r2,
        setter,
        createGenEnumCode(propertyType, language, platform)
      );
    }
  }
}

var properties = {
	invalid: "Invalid",
	variable: "Variable",
	top: "Top",
	right: "Right",
	bottom: "Bottom",
	left: "Left",
	width: "Width",
	height: "Height",
	"min-width": "MinWidth",
	"min-height": "MinHeight",
	"max-width": "MaxWidth",
	"max-height": "MaxHeight",
	"box-sizing": "BoxSizing",
	margin: "Margin",
	"margin-top": "MarginTop",
	"margin-right": "MarginRight",
	"margin-bottom": "MarginBottom",
	"margin-left": "MarginLeft",
	padding: "Padding",
	"padding-top": "PaddingTop",
	"padding-right": "PaddingRight",
	"padding-bottom": "PaddingBottom",
	"padding-left": "PaddingLeft",
	border: "Border",
	"border-width": "BorderWidth",
	"border-style": "BorderStyle",
	"border-top": "BorderTop",
	"border-top-width": "BorderTopWidth",
	"border-top-style": "BorderTopStyle",
	"border-right": "BorderRight",
	"border-right-width": "BorderRightWidth",
	"border-right-style": "BorderRightStyle",
	"border-bottom": "BorderBottom",
	"border-bottom-width": "BorderBottomWidth",
	"border-bottom-style": "BorderBottomStyle",
	"border-left": "BorderLeft",
	"border-left-width": "BorderLeftWidth",
	"border-left-style": "BorderLeftStyle",
	flex: "Flex",
	"flex-direction": "FlexDirection",
	"flex-wrap": "FlexWrap",
	"flex-flow": "FlexFlow",
	"flex-grow": "FlexGrow",
	"flex-shrink": "FlexShrink",
	"flex-basis": "FlexBasis",
	"justify-content": "JustifyContent",
	"align-items": "AlignItems",
	"align-self": "AlignSelf",
	"align-content": "AlignContent",
	"z-index": "ZIndex",
	display: "Display",
	position: "Position",
	visibility: "Visibility",
	overflow: "Overflow",
	"border-bottom-left-radius": "BorderBottomLeftRadius",
	"border-bottom-right-radius": "BorderBottomRightRadius",
	"border-top-color": "BorderTopColor",
	"border-radius": "BorderRadius",
	"border-color": "BorderColor",
	"border-top-left-radius": "BorderTopLeftRadius",
	"border-top-right-radius": "BorderTopRightRadius",
	"border-left-color": "BorderLeftColor",
	"border-bottom-color": "BorderBottomColor",
	"border-right-color": "BorderRightColor",
	background: "Background",
	"background-color": "BackgroundColor",
	"background-image": "BackgroundImage",
	"background-clip": "BackgroundClip",
	"font-family": "FontFamily",
	"font-size": "FontSize",
	"font-style": "FontStyle",
	"font-weight": "FontWeight",
	"line-height": "LineHeight",
	"letter-spacing": "LetterSpacing",
	lines: "Lines",
	color: "Color",
	"text-align": "TextAlign",
	"text-decoration": "TextDecoration",
	"text-decoration-color": "TextDecorationColor",
	"text-decoration-line": "TextDecorationLine",
	"text-decoration-style": "TextDecorationStyle",
	"text-decoration-thickness": "TextDecorationThickness",
	"text-overflow": "TextOverflow",
	"text-shadow": "TextShadow",
	"white-space": "WhiteSpace",
	transform: "Transform",
	"transform-origin": "TransformOrigin",
	transition: "Transition",
	"transition-property": "TransitionProperty",
	"transition-duration": "TransitionDuration",
	"transition-delay": "TransitionDelay",
	"transition-timing-function": "TransitionTimingFunction",
	opacity: "Opacity",
	"box-shadow": "BoxShadow",
	"pointer-events": "PointerEvents",
	all: "All"
};

async function parseCss(input, options) {
  var _a;
  const r = ((_a = options.helper) == null ? void 0 : _a.K) || ((name) => name);
  const normalizeOptions = {
    ...options,
    type: "uvue",
    keepUnitPx: true
  };
  const { root, messages } = await postcss([
    uniNvueStyler.expand(normalizeOptions),
    uniNvueStyler.normalize(normalizeOptions)
  ]).process(input).catch((err) => {
    return {
      root: null,
      messages: [
        {
          type: "error",
          text: err.message
        }
      ]
    };
  });
  const propertyProcessors = createDom2PropertyProcessors(
    r,
    options.platform,
    // css 解析时，应该传入ALL，不需要根据target获取setter，且目标语言是cpp
    "all",
    "cpp"
  );
  const { obj, messages: objMessages } = root ? uniNvueStyler.objectifierWithMessages(root, {
    trim: false,
    // @ts-expect-error
    visitor,
    parseMessages: messages
  }) : { obj: {}, messages: [] };
  messages.push(...objMessages);
  let dom2FontFaces = [];
  if (obj["@FONT-FACE"]) {
    dom2FontFaces = obj["@FONT-FACE"];
    delete obj["@FONT-FACE"];
  }
  const code = dom2ToString(r, options.platform)(obj);
  return { code, messages, fontFaces: dom2FontFaces };
  function visitor(node, context) {
    var _a2;
    let name = node.__originalProp || node.prop;
    let value = node.value;
    if (((_a2 = node.parent) == null ? void 0 : _a2.type) === "rule") {
      if (name.startsWith("--")) ; else {
        const processor = propertyProcessors[name];
        if (processor) {
          const valueResult = processor(value, name);
          if (valueResult.error) {
            context.warn(node, `WARNING: ${valueResult.error}`);
          } else {
            value = valueResult.valueCode;
          }
          name = `${r("UniCSSPropertyID")}::` + properties[name];
        } else {
          context.warn(node, uniNvueStyler.supportedPropertyReason(name));
          return false;
        }
      }
    }
    return {
      name,
      value
    };
  }
}

function mergeShorthand(decls, property, defaultValue) {
  var _a, _b, _c, _d;
  const suffix = property;
  const borderProps = {
    [`border-top-${suffix}`]: null,
    [`border-right-${suffix}`]: null,
    [`border-bottom-${suffix}`]: null,
    [`border-left-${suffix}`]: null
  };
  const indices = [];
  for (let i = 0; i < decls.length; i++) {
    const decl = decls[i];
    const name = decl.__originalProp || decl.prop;
    if (name in borderProps) {
      borderProps[name] = decl;
      indices.push(i);
    }
  }
  if (indices.length === 0) {
    return false;
  }
  const topValue = ((_a = borderProps[`border-top-${suffix}`]) == null ? void 0 : _a.value) || defaultValue;
  const rightValue = ((_b = borderProps[`border-right-${suffix}`]) == null ? void 0 : _b.value) || defaultValue;
  const bottomValue = ((_c = borderProps[`border-bottom-${suffix}`]) == null ? void 0 : _c.value) || defaultValue;
  const leftValue = ((_d = borderProps[`border-left-${suffix}`]) == null ? void 0 : _d.value) || defaultValue;
  const value = `${topValue} ${rightValue} ${bottomValue} ${leftValue}`;
  const firstDecl = borderProps[`border-top-${suffix}`] || borderProps[`border-right-${suffix}`] || borderProps[`border-bottom-${suffix}`] || borderProps[`border-left-${suffix}`];
  const newDecl = createDecl(
    `border${shared.capitalize(suffix)}`,
    value,
    firstDecl.important || false,
    firstDecl.raws,
    firstDecl.source
  );
  newDecl.__originalProp = `border-${suffix}`;
  for (let i = indices.length - 1; i >= 0; i--) {
    decls.splice(indices[i], 1);
  }
  decls.splice(indices[0], 0, newDecl);
  return true;
}
function borderColor(decls) {
  return mergeShorthand(decls, "color", "#00000000");
}

function borderStyle(decls) {
  return mergeShorthand(decls, "style", "none");
}

function shorthand(decls, options) {
  if (options.platform === "app-harmony" && options.target === "nv-c") {
    borderColor(decls);
    borderStyle(decls);
  }
}

const tags = /* @__PURE__ */ new Map([["flex-direction", ["view", "scroll-view", "list-item", "swiper-item", "flow-item", "navigator"]], ["justify-content", ["view", "scroll-view", "list-view", "list-item", "flow-item", "swiper-item", "navigator"]], ["flex-wrap", ["view", "scroll-view", "list-item", "flow-item", "swiper-item", "navigator"]], ["align-items", ["view", "scroll-view", "list-view", "list-item", "flow-item", "swiper-item", "navigator"]], ["align-content", ["view", "scroll-view", "list-view", "list-item", "flow-item", "swiper-item", "navigator"]], ["flex-flow", ["view", "scroll-view", "list-view", "list-item", "flow-item", "swiper-item", "navigator"]], ["color", ["text", "button", "input", "textarea"]], ["font-size", ["text", "button", "input", "textarea"]], ["font-style", ["text", "button", "input", "textarea"]], ["font-weight", ["text", "button", "input", "textarea", "loading"]], ["text-decoration", ["text", "button"]], ["text-decoration-line", ["text", "button"]], ["text-decoration-color", ["text", "button"]], ["text-decoration-style", ["text", "button"]], ["text-decoration-thickness", ["text", "button"]], ["text-align", ["text", "button", "input", "textarea"]], ["font-family", ["text", "button", "input", "textarea"]], ["text-overflow", ["text", "button"]], ["line-height", ["text", "button", "textarea"]], ["lines", ["text", "button", "input", "textarea"]], ["letter-spacing", ["text", "button"]], ["white-space", ["text", "button"]], ["text-shadow", ["text", "button"]], ["animation-timing-function", ["loading"]]]);

function checkTagName(tagName) {
  const plugin = {
    postcssPlugin: `dom2:checkTagName`,
    Declaration(decl, helper) {
      const name = decl.__originalProp || decl.prop;
      const tags$1 = tags.get(name);
      if (!tags$1) {
        return;
      }
      if (!tags$1.includes(tagName)) {
        decl.warn(
          helper.result,
          `WARNING: property \`${name}\` is only supported on \`${tags$1.map((tag) => `<${tag}>`).join("|")}\``
        );
        decl.remove();
      }
    }
  };
  return plugin;
}

class CustomDeclaration {
  constructor(prop, value, important) {
    this.prop = prop;
    this.value = value;
    this.important = important;
  }
  warn(result, reason) {
    result.warn(reason, {
      node: this
    });
  }
}
class CustomResult {
  constructor() {
    this.messages = [];
  }
  warn(message, options) {
    this.messages.push(new Warning(message, options));
  }
}
class CustomHelpers {
  constructor() {
    this.result = new CustomResult();
  }
}
function parseStaticStyleDeclarations(input, options) {
  const styleObj = shared.parseStringStyle(input);
  const declarations = [];
  Object.entries(styleObj).forEach(([key, value]) => {
    const valueString = value + "";
    const important = valueString.includes("!important");
    const decl = new CustomDeclaration(
      key,
      valueString.replace("!important", "").trim(),
      important
    );
    declarations.push(decl);
  });
  const normalizeOptions = {
    type: "uvue",
    platform: options.platform,
    keepUnitPx: true
  };
  const helpers = new CustomHelpers();
  const expandedDeclarations = [];
  const { Declaration: expandDeclaration } = uniNvueStyler.expand(normalizeOptions);
  if (typeof expandDeclaration === "function") {
    declarations.forEach((declaration) => {
      expandedDeclarations.push(
        ...visit(helpers, declaration, expandDeclaration)
      );
    });
  } else {
    expandedDeclarations.push(...declarations);
  }
  const normalizedDeclarations = [];
  const { Declaration: normalizeDeclaration } = uniNvueStyler.normalize(normalizeOptions);
  if (typeof normalizeDeclaration === "function") {
    expandedDeclarations.forEach((declaration) => {
      normalizedDeclarations.push(
        ...visit(helpers, declaration, normalizeDeclaration)
      );
    });
  } else {
    normalizedDeclarations.push(...expandedDeclarations);
  }
  if (options.tagName) {
    const { Declaration: checkTagNameDeclaration } = checkTagName(
      options.tagName
    );
    if (typeof checkTagNameDeclaration === "function") {
      normalizedDeclarations.forEach((declaration) => {
        normalizedDeclarations.push(
          ...visit(helpers, declaration, checkTagNameDeclaration)
        );
      });
    }
  }
  return {
    decls: normalizedDeclarations,
    messages: helpers.result.messages
  };
}
function visit(helpers, declaration, transformDecl) {
  let removed = false;
  let replaced = false;
  const result = [];
  declaration.replaceWith = function(nodes) {
    replaced = true;
    result.push(
      ...nodes.map(
        (node) => new CustomDeclaration(node.prop, node.value, node.important)
      )
    );
    return this;
  };
  declaration.remove = function() {
    removed = true;
    return this;
  };
  transformDecl(declaration, helpers);
  if (!removed && !replaced) {
    result.push(declaration);
  }
  return result;
}

function parseStaticStyle(input, options) {
  var _a;
  const r = ((_a = options.helper) == null ? void 0 : _a.K) || ((name) => name);
  const result = {};
  const { decls, messages } = parseStaticStyleDeclarations(input, options);
  if (decls.length) {
    messages.forEach((m) => {
      if (m.type === "warning" || m.type === "error") {
        const index = decls.findIndex((d) => d === m.node);
        if (index !== -1) {
          decls.splice(index, 1);
        }
      }
    });
  }
  important(decls);
  shorthand(decls, options);
  const processors = createDom2PropertyProcessors(
    r,
    options.platform,
    options.target,
    "ts"
  );
  for (const declaration of decls) {
    const propertyName = declaration.__originalProp || declaration.prop;
    if (propertyName.startsWith("--")) {
      const processed = defineStyleVariableProcessor(
        declaration.value,
        propertyName
      );
      if (processed.error) {
        messages.push(new Warning(processed.error, { node: declaration }));
      } else {
        result[propertyName] = processed;
      }
    } else {
      const processor = processors[propertyName];
      if (processor) {
        if (declaration.important) ;
        const processed = processor(
          declaration.value,
          propertyName,
          options ? {
            platform: options.platform,
            target: options.target,
            tagName: options.tagName || ""
          } : void 0
        );
        if (processed.error) {
          messages.push(new Warning(processed.error, { node: declaration }));
        } else {
          if (processed.valueCode) {
            result[propertyName] = processed;
          }
        }
      }
    }
  }
  return {
    obj: result,
    messages,
    code: options.genCode ? genCode(r, result, options.target) : void 0
  };
}
function genCode(r, obj, target) {
  if (target === "all" || target === "dom-c" || target === "nv-c" || target === "txt-c") {
    const entries = [];
    const variableEntries = [];
    Object.entries(obj).forEach(([key, value]) => {
      if (!value.valueCode) {
        return;
      }
      if (key.startsWith("--")) {
        variableEntries.push(`{"${key}", ${value.valueCode}}`);
      } else {
        entries.push(
          `[${genCPPEnumCode(
            r("UniCSSPropertyID"),
            shared.capitalize(shared.camelize(key))
          )}]: ${value.valueCode}`
        );
      }
    });
    if (variableEntries.length) {
      entries.unshift(
        `[${genCPPEnumCode(
          r("UniCSSPropertyID"),
          "Variable"
        )}]: ${r("UniCSSPropertyValueVariable")}{${variableEntries.join(", ")}}`
      );
    }
    return `{${entries.join(", ")}}`;
  }
  return "";
}
function important(decls) {
  for (let i = decls.length - 1; i >= 0; i--) {
    const decl = decls[i];
    const prop = decl.prop;
    if (decl.important) {
      for (let j = i - 1; j >= 0; j--) {
        const prevProp = decls[j].prop;
        if (prevProp === prop) {
          decls.splice(j, 1);
          i--;
        }
      }
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prevProp = decls[j].prop;
        if (prevProp === prop && !decls[j].important) {
          decls.splice(j, 1);
          i--;
        }
      }
    }
  }
}

function compile(source, options) {
  const resolvedOptions = normalizeOptions(options);
  const ast = shared.isString(source) ? compilerVapor.parse(source, resolvedOptions) : source;
  transformTextNodes(ast, resolvedOptions);
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
  const { expressionPlugins } = resolvedOptions;
  if (!expressionPlugins || !expressionPlugins.includes("typescript")) {
    resolvedOptions.expressionPlugins = [
      ...expressionPlugins || [],
      "typescript"
    ];
  }
  const vaporIR = compilerVapor.transform(
    ast,
    shared.extend(
      {
        checkStaticStyle: createStaticStyleChecker(resolvedOptions),
        checkStaticProp: createStaticPropChecker(resolvedOptions),
        resolveChangeProp: createResolveChangePropChecker()
      },
      resolvedOptions,
      {
        nodeTransforms: [
          ...nodeTransforms,
          ...resolvedOptions.nodeTransforms || []
          // user transforms
        ],
        directiveTransforms: shared.extend(
          {},
          directiveTransforms,
          resolvedOptions.directiveTransforms || {}
          // user transforms
        )
      }
    )
  );
  vaporIR.hasTemplateRef = false;
  transformSharedData(vaporIR, resolvedOptions);
  const sharedDataResult = generate$1(vaporIR, resolvedOptions);
  const nativeViewResult = generate(vaporIR, {
    ...resolvedOptions,
    target: getDom2AppTarget(
      resolvedOptions.platform,
      "nativeView"
    ),
    renderer: "nativeView"
  });
  const elementResult = generate(vaporIR, {
    ...resolvedOptions,
    target: getDom2AppTarget(resolvedOptions.platform, "element"),
    renderer: "element"
  });
  if (resolvedOptions.filename && resolvedOptions.className) {
    const emit = resolvedOptions.emitSharedData || emitSharedData;
    emit(
      normalizePath(resolvedOptions.filename),
      resolvedOptions.className,
      elementResult,
      nativeViewResult,
      resolvedOptions.scriptCppBlocks
    );
  }
  if (resolvedOptions.isWatch) {
    sharedDataResult.ast.hash = hash_sum(
      sharedDataResult.code + nativeViewResult.code + elementResult.code
    );
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
function normalizeOptions(options) {
  const resolvedOptions = shared.extend({}, options);
  const cache = /* @__PURE__ */ new Map();
  resolvedOptions.parseStaticStyle = (target, tagName, style, genCode) => {
    const key = `${target}-${tagName}-${style}`;
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = parseStaticStyle(style, {
      platform: options.platform,
      target,
      tagName,
      genCode: true,
      helper: {
        K: options.r || ((name) => name)
      }
    });
    cache.set(key, result);
    return result;
  };
  resolvedOptions.parseStaticProp = createParseStaticProp(options.platform);
  if (resolvedOptions.scriptCppBlocks && !resolvedOptions.isCppExpr) {
    resolvedOptions.isCppExpr = (ast) => {
      if (!ast) {
        return false;
      }
      if (ast.type !== "MemberExpression") {
        return false;
      }
      if (ast.object.type !== "Identifier") {
        return false;
      }
      const name = ast.object.name;
      return resolvedOptions.scriptCppBlocks.some(
        (cppBlock) => cppBlock.module === name
      );
    };
  }
  return resolvedOptions;
}
function createStaticStyleChecker(options) {
  const parseStaticStyle2 = options.parseStaticStyle;
  const elementTarget = getDom2AppTarget(
    options.platform,
    "element"
  );
  const nativeViewTarget = getDom2AppTarget(
    options.platform,
    "nativeView"
  );
  function formatMessage(text) {
    return text.replace("ERROR: ", "").replace("WARNING: ", "");
  }
  return (style, loc, node, context) => {
    const { messages: elementMessages } = parseStaticStyle2(
      elementTarget,
      node.tag,
      style,
      false
    );
    const { messages: nativeViewMessages } = parseStaticStyle2(
      nativeViewTarget,
      node.tag,
      style,
      false
    );
    elementMessages.forEach((message) => {
      context.options.onWarn(
        createDom2StaticStyleCompilerError(formatMessage(message.text), loc)
      );
    });
    nativeViewMessages.forEach((message) => {
      if (!elementMessages.some((m) => m.text === message.text)) {
        context.options.onWarn(
          createDom2StaticStyleCompilerError(formatMessage(message.text), loc)
        );
      }
    });
  };
}
function createStaticPropChecker(options) {
  const parseStaticProp = options.parseStaticProp;
  const elementTarget = getDom2AppTarget(
    options.platform,
    "element"
  );
  const nativeViewTarget = getDom2AppTarget(
    options.platform,
    "nativeView"
  );
  const isPropertySupported = createDom2ElementsPropertiesSupportChecker(
    options.platform
  );
  return (isStatic, propertyName, value, loc, node, context) => {
    if (!isStatic) {
      if (!isPropertySupported(node.tag, propertyName)) {
        context.options.onWarn(
          createDom2StaticPropCompilerError(
            `Property '${propertyName}' is not supported on '<${node.tag}>'`,
            loc
          )
        );
        return false;
      }
      return true;
    }
    const elementResult = parseStaticProp(
      elementTarget,
      node.tag,
      propertyName,
      value
    );
    const errors = /* @__PURE__ */ new Set();
    if (elementResult) {
      if (elementResult.errors.length > 0) {
        elementResult.errors.forEach((error) => {
          errors.add(error);
        });
      }
    }
    const nativeViewResult = parseStaticProp(
      nativeViewTarget,
      node.tag,
      propertyName,
      value
    );
    if (nativeViewResult) {
      if (nativeViewResult.errors.length > 0) {
        nativeViewResult.errors.forEach((error) => {
          errors.add(error);
        });
      }
    }
    if (errors.size) {
      errors.forEach((error) => {
        context.options.onWarn(createDom2StaticPropCompilerError(error, loc));
      });
      return false;
    }
    return true;
  };
}
function createResolveChangePropChecker(options) {
  return (props, context) => {
    const changeProps = [];
    const propNames = [];
    for (const prop of props) {
      propNames.push(prop.key.content);
    }
    const indicesToRemove = [];
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      const name = prop.key.content;
      if (name.startsWith("change:")) {
        const propName = name.slice(7);
        if (!propNames.includes(propName)) {
          indicesToRemove.push(i);
          context.options.onWarn(
            createDom2StaticPropCompilerError(
              `Property '${propName}' is not defined`,
              prop.key.loc
            )
          );
        } else {
          changeProps.push(propName);
        }
      }
    }
    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
      props.splice(indicesToRemove[i], 1);
    }
    return changeProps;
  };
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
function updateSourceMapPosition(generator, sourceMap, updatePosition) {
  if (!generator) {
    generator = new require$$2.SourceMapGenerator();
  }
  const consumer = new require$$2.SourceMapConsumer(sourceMap);
  sourceMap.sources.forEach((source, index) => {
    const sources = generator._sources;
    if (!sources.has(source)) {
      sources.add(source);
      generator.setSourceContent(
        source,
        sourceMap.sourcesContent ? sourceMap.sourcesContent[index] : null
      );
    }
  });
  consumer.eachMapping((mapping) => {
    const updatedPos = updatePosition(
      mapping.generatedLine,
      mapping.generatedColumn
    );
    generator.addMapping({
      generated: {
        line: updatedPos ? updatedPos.line : mapping.generatedLine,
        column: updatedPos ? updatedPos.column : mapping.generatedColumn
      },
      original: mapping.originalLine ? {
        line: mapping.originalLine,
        column: mapping.originalColumn || 0
      } : null,
      source: mapping.source || "",
      name: mapping.name || ""
    });
  });
  return generator;
}

const TYPE_ARRAY_STRING = "ARRAY_STRING";

const identGenerator = new IdentGenerator(2e3);
function generateFlagList(flags, rename) {
  if (flags.size === 0) {
    return "";
  }
  let w = "";
  let r = "";
  for (const flag of flags) {
    w += indent(3) + `${rename("DEFINE_SHARED_DATA_MEMBER_FLAG_D")}(${flag})
`;
    r += indent(3) + `${rename("DEFINE_SHARED_DATA_MEMBER_FLAG_R")}(${flag})
`;
  }
  let result = indent(1) + `${rename("DEFINE_SHARED_DATA_MEMBER_FLAGS_AND_RESET")}(
`;
  result += indent(2) + `${rename("DEFINE_SHARED_DATA_MEMBER_FLAG_W")}(
`;
  result += w;
  result += indent(2) + `),
`;
  result += indent(2) + `${rename("DEFINE_SHARED_DATA_MEMBER_FLAG_W")}(
`;
  result += r;
  result += indent(2) + `)
`;
  result += indent(1) + `)
`;
  return result;
}
function formatTypeNode(type, ts) {
  if (ts.isTypeReferenceNode(type)) {
    if (ts.isIdentifier(type.typeName)) {
      switch (getIdentifierText(type.typeName)) {
        case "UniSharedDataEnum":
          return "uint16";
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
        case "UniElementStyles":
          return "UniElementStyles";
        case "Array":
          if (type.typeArguments && type.typeArguments.length === 1 && isKeywordTypeNode(type.typeArguments[0], ts) && type.typeArguments[0].kind === ts.SyntaxKind.StringKeyword) {
            return TYPE_ARRAY_STRING;
          }
        default:
          return "UniSharedDataComponent|" + getIdentifierText(type.typeName);
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
  const defineMacroHCommon = "DEFINE_SHARED_DATA";
  const defineMacroHMember = defineMacroHCommon + "_MEMBER";
  const defineMacroCpp = defineMacroH + "_CPP";
  const defineMacroCppInit = defineMacroCpp + "_INIT";
  const defineMacroCppCommon = defineMacroHCommon + "_CPP";
  const defineMacroCppCommonInitMember = defineMacroCppCommon + "_INIT_MEMBER";
  const defineMacroCppCommonMember = defineMacroCppCommon + "_MEMBER_SETTER";
  const members = decl.members;
  let codeHMember = "";
  let codeHFlag = "";
  let codeH = `${options.r(defineMacroH)}(${className},
`;
  let codeCpp = `${options.r(defineMacroCpp)}(${className},
`;
  let codeCppInit = indent(1) + `${options.r(defineMacroCppInit)}(${className},
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
    let _defineMacroCppMember = `${defineMacroCppCommonMember}_${memberSetterType.toUpperCase()}`;
    if ((optional || memberSetterType === "UniSharedDataAny") && memberSetterType !== "null") {
      _defineMacroHMember += `_OR_NULL`;
      _defineMacroCppMember += `_OR_NULL`;
    }
    codeHMember += indent(1) + `${options.r(_defineMacroHMember)}(${memberName}`;
    codeCppInit += indent(2) + `${options.r(defineMacroCppCommonInitMember)}(${memberName})
`;
    codeCppMembers += indent(1) + `${options.r(_defineMacroCppMember)}(${className}, ${memberName}`;
    codeHMember += `)
`;
    codeCppMembers += `, ${memberFlag}, ${memberBitValue})
`;
  }
  if (flags.size === 0) {
    flags.add("_flag0");
  }
  codeHFlag = generateFlagList(flags, options.r) + "\n";
  codeCppInit += indent(1) + `)
`;
  codeH += codeHFlag + codeHMember + `)`;
  codeCpp += codeCppInit + codeCppMembers + `)`;
  let codeCppMap = null;
  if (isPage || isComponent) {
    codeCpp = `namespace {
${indentMultiLine(`inline ${options.renderElementCode}`, 1)}
${indentMultiLine(`inline ${options.renderNativeViewCode}`, 1)}
}
${codeCpp}`;
    const generator = new require$$2.SourceMapGenerator();
    let lineOffset = 1;
    const columnOffset = indentMultiLine("", 1).length;
    if (options.renderElementSourceMap) {
      updateSourceMapPosition(
        generator,
        options.renderElementSourceMap,
        (line, column) => {
          return {
            line: line + lineOffset,
            column: column + columnOffset
          };
        }
      );
      lineOffset += options.renderElementCode.split("\n").length;
    }
    if (options.renderNativeViewSourceMap) {
      updateSourceMapPosition(
        generator,
        options.renderNativeViewSourceMap,
        (line, column) => {
          return {
            line: line + lineOffset,
            column: column + columnOffset
          };
        }
      );
    }
    codeCppMap = generator.toJSON();
  }
  return {
    files: [
      {
        code: codeH,
        name: `${className}.h`,
        class: className,
        map: null
      },
      {
        code: codeCpp,
        name: `${className}.cpp`,
        class: className,
        map: codeCppMap
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
function genAppSharedData({
  r
}) {
  const className = r("GenApp") + r("SharedData");
  return {
    files: [
      {
        name: `${className}.h`,
        code: `#pragma once
#include "sdk.h"

${r("DEFINE_USER_APP_SHARED_DATA")}(GenAppSharedData,
${generateFlagList(/* @__PURE__ */ new Set(["_flag0"]), r)}
)`,
        classes: [`${className}`]
      },
      {
        name: `${className}.cpp`,
        code: `#include "${className}.h"

${r("DEFINE_USER_APP_SHARED_DATA_CPP")}(${className},
  ${r("DEFINE_USER_APP_SHARED_DATA_CPP_INIT")}(${className},
  )
)`,
        classes: [`${className}`]
      }
    ]
  };
}
function generateIncludeAndUse(cppBlocks) {
  let includeCodeArr = [];
  let useCode = [];
  cppBlocks.forEach((block) => {
    if (block.src) {
      includeCodeArr.push(`#include "${block.src.trim()}"`);
    }
    if (block.namespace) {
      useCode.push(`using namespace ${block.namespace.trim()};`);
    }
  });
  return { includeCode: includeCodeArr.join("\n"), useCode: useCode.join("\n") };
}
function genSharedData(decls, options) {
  if (!options.r) {
    options.r = (name) => name;
  }
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
  const includeAndUse = generateIncludeAndUse(options.scriptCppBlocks || []);
  const includeCode = includeAndUse.includeCode ? includeAndUse.includeCode + "\n\n" : "";
  const useCode = includeAndUse.useCode ? includeAndUse.useCode + "\n\n" : "";
  const baseLineOffset = (
    // includeCode\n\n
    (includeCode ? includeCode.split("\n").length - 1 : 0) + // useCode\n\n
    (useCode ? useCode.split("\n").length - 1 : 0) + // #include "${hFile.name}"\n\n
    2
  );
  let groupName = "";
  let cppSourceMap = null;
  sharedDataResultList.forEach((result) => {
    if (result.groupName) {
      groupName = result.groupName;
    }
    result.files.forEach((file) => {
      if (file.name.endsWith(".h")) {
        hFile.code += (hFile.code ? "\n\n" : "") + file.code;
        hFile.classes.push(file.class);
      } else if (file.name.endsWith(".cpp")) {
        if (file.map) {
          const lineOffset = cppFile.code ? baseLineOffset + cppFile.code.split("\n").length + 1 : baseLineOffset;
          const generator = new require$$2.SourceMapGenerator();
          updateSourceMapPosition(generator, file.map, (line, column) => {
            return {
              line: line + lineOffset,
              column
            };
          });
          cppSourceMap = generator.toJSON();
        }
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

${includeCode}${useCode}${cppFile.code}`;
    cppFile.map = cppSourceMap;
  }
  return {
    files: [cppFile, hFile]
  };
}

exports.parse = compilerDom.parse;
exports.COMPONENT_TYPE = COMPONENT_TYPE;
exports.DOM2_APP_PLATFORM = DOM2_APP_PLATFORM;
exports.DOM2_APP_TARGET = DOM2_APP_TARGET;
exports.RENDERER_TYPE = RENDERER_TYPE;
exports.TARGET_LANGUAGE = TARGET_LANGUAGE;
exports.TARGET_PLATFORM = DOM2_APP_PLATFORM;
exports.compile = compile;
exports.genAppSharedData = genAppSharedData;
exports.genSharedData = genSharedData;
exports.genSharedDataClass = genSharedDataClass;
exports.getSharedDataResult = getSharedDataResult;
exports.parseCss = parseCss;
exports.parseStaticStyle = parseStaticStyle;
