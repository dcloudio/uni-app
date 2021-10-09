"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForLoopParams = exports.parseForExpression = exports.transformFor = exports.isForElementNode = void 0;
const shared_1 = require("@vue/shared");
const compiler_core_1 = require("@vue/compiler-core");
const ast_1 = require("../ast");
const transformExpression_1 = require("./transformExpression");
const codegen_1 = require("../codegen");
const types_1 = require("@babel/types");
function isForElementNode(node) {
    return !!node.vFor;
}
exports.isForElementNode = isForElementNode;
exports.transformFor = (0, compiler_core_1.createStructuralDirectiveTransform)('for', (node, dir, _context) => {
    const context = _context;
    if (!dir.exp) {
        context.onError((0, compiler_core_1.createCompilerError)(31 /* X_V_FOR_NO_EXPRESSION */, dir.loc));
        return;
    }
    const parseResult = parseForExpression(dir.exp, context);
    if (!parseResult) {
        context.onError((0, compiler_core_1.createCompilerError)(32 /* X_V_FOR_MALFORMED_EXPRESSION */, dir.loc));
        return;
    }
    parseResult.tagType = node.tagType;
    const { addIdentifiers, removeIdentifiers } = context;
    const { source, value, key, index } = parseResult;
    if (context.prefixIdentifiers) {
        value && addIdentifiers(value);
        key && addIdentifiers(key);
        index && addIdentifiers(index);
    }
    const { currentScope: parentScope, scopes, popScope } = context;
    const sourceExpr = (0, ast_1.parseExpr)(source, context);
    const valueCode = value && (0, codegen_1.genExpr)(value);
    const valueExpr = valueCode
        ? (0, ast_1.parseParam)(valueCode, context, value)
        : undefined;
    const valueAlias = (valueExpr && parseAlias(valueExpr, valueCode, 'v' + scopes.vFor)) ||
        'v' + scopes.vFor;
    const keyCode = key && (0, codegen_1.genExpr)(key);
    const keyExpr = keyCode ? (0, ast_1.parseParam)(keyCode, context, key) : undefined;
    const keyAlias = keyExpr && parseAlias(keyExpr, keyCode, 'k' + scopes.vFor);
    const indexCode = index && (0, codegen_1.genExpr)(index);
    const indexExpr = indexCode
        ? (0, ast_1.parseParam)(indexCode, context, index)
        : undefined;
    const indexAlias = indexExpr && parseAlias(indexExpr, indexCode, 'i' + scopes.vFor);
    const vForData = {
        source,
        sourceExpr,
        value,
        valueCode,
        valueExpr,
        valueAlias,
        key,
        keyCode,
        keyExpr,
        keyAlias,
        index,
        indexCode,
        indexExpr,
        indexAlias,
    };
    const vForScope = context.addVForScope({
        ...vForData,
        locals: findVForLocals(parseResult),
    });
    scopes.vFor++;
    return () => {
        if ((0, compiler_core_1.isTemplateNode)(node)) {
            node.children.some((c) => {
                if (c.type === 1 /* ELEMENT */ && !isForElementNode(c)) {
                    const key = (0, compiler_core_1.findProp)(c, 'key');
                    if (key) {
                        context.onError((0, compiler_core_1.createCompilerError)(33 /* X_V_FOR_TEMPLATE_KEY_PLACEMENT */, key.loc));
                        return true;
                    }
                }
            });
        }
        if (context.prefixIdentifiers) {
            value && removeIdentifiers(value);
            key && removeIdentifiers(key);
            index && removeIdentifiers(index);
        }
        const id = parentScope.id.next();
        node.vFor = {
            sourceAlias: id,
            ...vForData,
        };
        parentScope.properties.push((0, ast_1.createObjectProperty)(id, (0, ast_1.createVForCallExpression)(vForScope)));
        popScope();
    };
});
function parseAlias(babelExpr, exprCode, defaultAlias) {
    if ((0, types_1.isIdentifier)(babelExpr)) {
        return exprCode;
    }
    return defaultAlias;
}
function findVForLocals({ value, key, index }) {
    const ids = [];
    if (value) {
        findIds(value, ids);
    }
    if (key) {
        findIds(key, ids);
    }
    if (index) {
        findIds(index, ids);
    }
    return ids;
}
function findIds(exp, ids) {
    if ((0, shared_1.isString)(exp)) {
        ids.push(exp);
    }
    else if (exp.identifiers) {
        exp.identifiers.forEach((id) => ids.push(id));
    }
    else if (exp.type === 4 /* SIMPLE_EXPRESSION */) {
        ids.push(exp.content);
    }
}
const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
const stripParensRE = /^\(|\)$/g;
function parseForExpression(input, context) {
    const loc = input.loc;
    const exp = input.content;
    const inMatch = exp.match(forAliasRE);
    if (!inMatch)
        return;
    const [, LHS, RHS] = inMatch;
    const result = {
        source: createAliasExpression(loc, RHS.trim(), exp.indexOf(RHS, LHS.length)),
        value: undefined,
        key: undefined,
        index: undefined,
        tagType: 0 /* ELEMENT */,
    };
    if (context.prefixIdentifiers) {
        result.source = (0, transformExpression_1.processExpression)(result.source, context);
    }
    let valueContent = LHS.trim().replace(stripParensRE, '').trim();
    const trimmedOffset = LHS.indexOf(valueContent);
    const iteratorMatch = valueContent.match(forIteratorRE);
    if (iteratorMatch) {
        valueContent = valueContent.replace(forIteratorRE, '').trim();
        const keyContent = iteratorMatch[1].trim();
        let keyOffset;
        if (keyContent) {
            keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
            result.key = createAliasExpression(loc, keyContent, keyOffset);
            if (context.prefixIdentifiers) {
                result.key = (0, transformExpression_1.processExpression)(result.key, context, true);
            }
        }
        if (iteratorMatch[2]) {
            const indexContent = iteratorMatch[2].trim();
            if (indexContent) {
                result.index = createAliasExpression(loc, indexContent, exp.indexOf(indexContent, result.key
                    ? keyOffset + keyContent.length
                    : trimmedOffset + valueContent.length));
                if (context.prefixIdentifiers) {
                    result.index = (0, transformExpression_1.processExpression)(result.index, context, true);
                }
            }
        }
    }
    if (valueContent) {
        result.value = createAliasExpression(loc, valueContent, trimmedOffset);
        if (context.prefixIdentifiers) {
            result.value = (0, transformExpression_1.processExpression)(result.value, context, true);
        }
    }
    return result;
}
exports.parseForExpression = parseForExpression;
function createAliasExpression(range, content, offset) {
    return (0, compiler_core_1.createSimpleExpression)(content, false, (0, compiler_core_1.getInnerRange)(range, offset, content.length));
}
function createForLoopParams({ value, key, index }, memoArgs = []) {
    return createParamsList([value, key, index, ...memoArgs]);
}
exports.createForLoopParams = createForLoopParams;
function createParamsList(args) {
    let i = args.length;
    while (i--) {
        if (args[i])
            break;
    }
    return args
        .slice(0, i + 1)
        .map((arg, i) => arg || (0, compiler_core_1.createSimpleExpression)(`_`.repeat(i + 1), false));
}
