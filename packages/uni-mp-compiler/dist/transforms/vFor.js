"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForLoopParams = exports.parseForExpression = exports.transformFor = void 0;
const compiler_core_1 = require("@vue/compiler-core");
const ast_1 = require("../ast");
const codegen_1 = require("../codegen");
const transformExpression_1 = require("./transformExpression");
exports.transformFor = (0, compiler_core_1.createStructuralDirectiveTransform)('for', (_node, dir, _context) => {
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
    const { addIdentifiers, removeIdentifiers, scopes } = context;
    const { source, value, key, index } = parseResult;
    scopes.vFor++;
    if (context.prefixIdentifiers) {
        value && addIdentifiers(value);
        key && addIdentifiers(key);
        index && addIdentifiers(index);
    }
    const vForScope = context.addVForScope({
        source: source.content,
        value: value ? value.content : '',
        key: key ? key.content : '',
        index: index ? index.content : '',
        identifiers: {},
    });
    return () => {
        scopes.vFor--;
        if (context.prefixIdentifiers) {
            value && removeIdentifiers(value);
            key && removeIdentifiers(key);
            index && removeIdentifiers(index);
        }
        const { currentScope } = context;
        currentScope.body.push((0, ast_1.createVariableDeclaration)(currentScope.id.next(), (0, codegen_1.genVForScope)(vForScope)));
    };
});
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
