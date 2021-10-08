"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processExpression = exports.transformExpression = void 0;
const shared_1 = require("@vue/shared");
const compiler_core_1 = require("@vue/compiler-core");
const parser_1 = require("@babel/parser");
const isLiteralWhitelisted = /*#__PURE__*/ (0, shared_1.makeMap)('true,false,null,this');
const transformExpression = (node, context) => {
    if (node.type === 5 /* INTERPOLATION */) {
        node.content = processExpression(node.content, context);
    }
    else if (node.type === 1 /* ELEMENT */) {
        // handle directives on element
        for (let i = 0; i < node.props.length; i++) {
            const dir = node.props[i];
            // do not process for v-on & v-for since they are special handled
            if (dir.type === 7 /* DIRECTIVE */ && dir.name !== 'for') {
                const exp = dir.exp;
                const arg = dir.arg;
                // do not process exp if this is v-on:arg - we need special handling
                // for wrapping inline statements.
                if (exp &&
                    exp.type === 4 /* SIMPLE_EXPRESSION */ &&
                    !(dir.name === 'on' && arg)) {
                    dir.exp = processExpression(exp, context, 
                    // slot args must be processed as function params
                    dir.name === 'slot');
                }
                if (arg && arg.type === 4 /* SIMPLE_EXPRESSION */ && !arg.isStatic) {
                    dir.arg = processExpression(arg, context);
                }
            }
        }
    }
};
exports.transformExpression = transformExpression;
function processExpression(node, context, 
// some expressions like v-slot props & v-for aliases should be parsed as
// function params
asParams = false, 
// v-on handler values may contain multiple statements
asRawStatements = false, localVars = Object.create(context.identifiers)) {
    if (!node.content.trim()) {
        return node;
    }
    const { inline, bindingMetadata } = context;
    const rewriteIdentifier = (raw, parent, id) => {
        const type = (0, shared_1.hasOwn)(bindingMetadata, raw) && bindingMetadata[raw];
        if (inline) {
            // x = y
            const isAssignmentLVal = parent && parent.type === 'AssignmentExpression' && parent.left === id;
            // x++
            const isUpdateArg = parent && parent.type === 'UpdateExpression' && parent.argument === id;
            // ({ x } = y)
            const isDestructureAssignment = parent && (0, compiler_core_1.isInDestructureAssignment)(parent, parentStack);
            if (type === "setup-const" /* SETUP_CONST */ || localVars[raw]) {
                return raw;
            }
            else if (type === "setup-ref" /* SETUP_REF */) {
                return `${raw}.value`;
            }
            else if (type === "setup-maybe-ref" /* SETUP_MAYBE_REF */) {
                // const binding that may or may not be ref
                // if it's not a ref, then assignments don't make sense -
                // so we ignore the non-ref assignment case and generate code
                // that assumes the value to be a ref for more efficiency
                return isAssignmentLVal || isUpdateArg || isDestructureAssignment
                    ? `${raw}.value`
                    : `${context.helperString(compiler_core_1.UNREF)}(${raw})`;
            }
            else if (type === "setup-let" /* SETUP_LET */) {
                if (isAssignmentLVal) {
                    // let binding.
                    // this is a bit more tricky as we need to cover the case where
                    // let is a local non-ref value, and we need to replicate the
                    // right hand side value.
                    // x = y --> isRef(x) ? x.value = y : x = y
                    const { right: rVal, operator } = parent;
                    const rExp = rawExp.slice(rVal.start - 1, rVal.end - 1);
                    const rExpString = stringifyExpression(processExpression((0, compiler_core_1.createSimpleExpression)(rExp, false), context, false, false, knownIds));
                    return `${context.helperString(compiler_core_1.IS_REF)}(${raw})${context.isTS ? ` //@ts-ignore\n` : ``} ? ${raw}.value ${operator} ${rExpString} : ${raw}`;
                }
                else if (isUpdateArg) {
                    // make id replace parent in the code range so the raw update operator
                    // is removed
                    id.start = parent.start;
                    id.end = parent.end;
                    const { prefix: isPrefix, operator } = parent;
                    const prefix = isPrefix ? operator : ``;
                    const postfix = isPrefix ? `` : operator;
                    // let binding.
                    // x++ --> isRef(a) ? a.value++ : a++
                    return `${context.helperString(compiler_core_1.IS_REF)}(${raw})${context.isTS ? ` //@ts-ignore\n` : ``} ? ${prefix}${raw}.value${postfix} : ${prefix}${raw}${postfix}`;
                }
                else if (isDestructureAssignment) {
                    // TODO
                    // let binding in a destructure assignment - it's very tricky to
                    // handle both possible cases here without altering the original
                    // structure of the code, so we just assume it's not a ref here
                    // for now
                    return raw;
                }
                else {
                    return `${context.helperString(compiler_core_1.UNREF)}(${raw})`;
                }
            }
            else if (type === "props" /* PROPS */) {
                // use __props which is generated by compileScript so in ts mode
                // it gets correct type
                return `__props.${raw}`;
            }
        }
        else {
            if (type && type.startsWith('setup')) {
                // setup bindings in non-inline mode
                return `$setup.${raw}`;
            }
            else if (type) {
                return `$${type}.${raw}`;
            }
        }
        // fallback to ctx
        return `_ctx.${raw}`;
    };
    // fast path if expression is a simple identifier.
    const rawExp = node.content;
    // bail constant on parens (function invocation) and dot (member access)
    const bailConstant = rawExp.indexOf(`(`) > -1 || rawExp.indexOf('.') > 0;
    if ((0, compiler_core_1.isSimpleIdentifier)(rawExp)) {
        const isScopeVarReference = context.identifiers[rawExp];
        const isAllowedGlobal = (0, shared_1.isGloballyWhitelisted)(rawExp);
        const isLiteral = isLiteralWhitelisted(rawExp);
        if (!asParams && !isScopeVarReference && !isAllowedGlobal && !isLiteral) {
            // const bindings exposed from setup can be skipped for patching but
            // cannot be hoisted to module scope
            if (bindingMetadata[node.content] === "setup-const" /* SETUP_CONST */) {
                node.constType = 1 /* CAN_SKIP_PATCH */;
            }
            node.content = rewriteIdentifier(rawExp);
        }
        else if (!isScopeVarReference) {
            if (isLiteral) {
                node.constType = 3 /* CAN_STRINGIFY */;
            }
            else {
                node.constType = 2 /* CAN_HOIST */;
            }
        }
        return node;
    }
    let ast;
    // exp needs to be parsed differently:
    // 1. Multiple inline statements (v-on, with presence of `;`): parse as raw
    //    exp, but make sure to pad with spaces for consistent ranges
    // 2. Expressions: wrap with parens (for e.g. object expressions)
    // 3. Function arguments (v-for, v-slot): place in a function argument position
    const source = asRawStatements
        ? ` ${rawExp} `
        : `(${rawExp})${asParams ? `=>{}` : ``}`;
    try {
        ast = (0, parser_1.parse)(source, {
            plugins: [...context.expressionPlugins, ...shared_1.babelParserDefaultPlugins],
        }).program;
    }
    catch (e) {
        context.onError((0, compiler_core_1.createCompilerError)(44 /* X_INVALID_EXPRESSION */, node.loc, undefined, e.message));
        return node;
    }
    const ids = [];
    const parentStack = [];
    const knownIds = Object.create(context.identifiers);
    (0, compiler_core_1.walkIdentifiers)(ast, (node, parent, _, isReferenced, isLocal) => {
        if ((0, compiler_core_1.isStaticPropertyKey)(node, parent)) {
            return;
        }
        const needPrefix = isReferenced && canPrefix(node);
        if (needPrefix && !isLocal) {
            if ((0, compiler_core_1.isStaticProperty)(parent) && parent.shorthand) {
                // property shorthand like { foo }, we need to add the key since
                // we rewrite the value
                ;
                node.prefix = `${node.name}: `;
            }
            node.name = rewriteIdentifier(node.name, parent, node);
            ids.push(node);
        }
        else {
            // The identifier is considered constant unless it's pointing to a
            // local scope variable (a v-for alias, or a v-slot prop)
            if (!(needPrefix && isLocal) && !bailConstant) {
                ;
                node.isConstant = true;
            }
            // also generate sub-expressions for other identifiers for better
            // source map support. (except for property keys which are static)
            ids.push(node);
        }
    }, true, // invoke on ALL identifiers
    parentStack, knownIds);
    // We break up the compound expression into an array of strings and sub
    // expressions (for identifiers that have been prefixed). In codegen, if
    // an ExpressionNode has the `.children` property, it will be used instead of
    // `.content`.
    const children = [];
    ids.sort((a, b) => a.start - b.start);
    ids.forEach((id, i) => {
        // range is offset by -1 due to the wrapping parens when parsed
        const start = id.start - 1;
        const end = id.end - 1;
        const last = ids[i - 1];
        const leadingText = rawExp.slice(last ? last.end - 1 : 0, start);
        if (leadingText.length || id.prefix) {
            children.push(leadingText + (id.prefix || ``));
        }
        const source = rawExp.slice(start, end);
        children.push((0, compiler_core_1.createSimpleExpression)(id.name, false, {
            source,
            start: (0, compiler_core_1.advancePositionWithClone)(node.loc.start, source, start),
            end: (0, compiler_core_1.advancePositionWithClone)(node.loc.start, source, end),
        }, id.isConstant ? 3 /* CAN_STRINGIFY */ : 0 /* NOT_CONSTANT */));
        if (i === ids.length - 1 && end < rawExp.length) {
            children.push(rawExp.slice(end));
        }
    });
    let ret;
    if (children.length) {
        ret = (0, compiler_core_1.createCompoundExpression)(children, node.loc);
    }
    else {
        ret = node;
        ret.constType = bailConstant
            ? 0 /* NOT_CONSTANT */
            : 3 /* CAN_STRINGIFY */;
    }
    ret.identifiers = Object.keys(knownIds);
    return ret;
}
exports.processExpression = processExpression;
function canPrefix(id) {
    // skip whitelisted globals
    if ((0, shared_1.isGloballyWhitelisted)(id.name)) {
        return false;
    }
    // special case for webpack compilation
    if (id.name === 'require') {
        return false;
    }
    return true;
}
function stringifyExpression(exp) {
    if ((0, shared_1.isString)(exp)) {
        return exp;
    }
    else if (exp.type === 4 /* SIMPLE_EXPRESSION */) {
        return exp.content;
    }
    else {
        return exp.children
            .map(stringifyExpression)
            .join('');
    }
}
