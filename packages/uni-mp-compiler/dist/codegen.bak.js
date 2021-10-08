"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genNode = exports.generate = void 0;
const compiler_core_1 = require("@vue/compiler-core");
const shared_1 = require("@vue/shared");
function generate(ast, options = {}) {
    const context = createCodegenContext(ast, options);
    const { push, indent, deindent, mode } = context;
    const isSetupInlined = !!options.inline;
    // preambles
    // in setup() inline mode, the preamble is generated in a sub context
    // and returned separately.
    const preambleContext = isSetupInlined
        ? createCodegenContext(ast, options)
        : context;
    if (mode === 'module') {
        genModulePreamble(ast, preambleContext, isSetupInlined);
    }
    else {
        genFunctionPreamble(ast, preambleContext);
    }
    // enter render function
    const functionName = `render`;
    const args = ['_ctx', '_cache'];
    if (options.bindingMetadata && !options.inline) {
        // binding optimization args
        args.push('$props', '$setup', '$data', '$options');
    }
    const signature = options.isTS
        ? args.map((arg) => `${arg}: any`).join(',')
        : args.join(', ');
    if (isSetupInlined) {
        push(`(${signature}) => {`);
    }
    else {
        push(`function ${functionName}(${signature}) {`);
    }
    indent();
    deindent();
    push(`}`);
    return {
        code: context.code,
        preamble: '',
        ast,
    };
}
exports.generate = generate;
function createCodegenContext(ast, { mode = 'function', prefixIdentifiers = mode === 'module', filename = `template.vue.html`, scopeId = null, runtimeGlobalName = `Vue`, runtimeModuleName = `vue`, isTS = false, }) {
    const context = {
        mode,
        prefixIdentifiers,
        filename,
        scopeId,
        runtimeGlobalName,
        runtimeModuleName,
        isTS,
        source: ast.loc.source,
        code: ``,
        column: 1,
        line: 1,
        offset: 0,
        indentLevel: 0,
        pure: false,
        map: undefined,
        helper(key) {
            return `_${compiler_core_1.helperNameMap[key]}`;
        },
        push(code, node) {
            context.code += code;
        },
        indent() {
            newline(++context.indentLevel);
        },
        deindent(withoutNewLine = false) {
            if (withoutNewLine) {
                --context.indentLevel;
            }
            else {
                newline(--context.indentLevel);
            }
        },
        newline() {
            newline(context.indentLevel);
        },
    };
    function newline(n) {
        context.push('\n' + `  `.repeat(n));
    }
    return context;
}
function genModulePreamble(ast, context, inline) {
    const { push, newline, runtimeModuleName } = context;
    // generate import statements for helpers
    if (ast.helpers.length) {
        push(`import { ${ast.helpers
            .map((s) => `${compiler_core_1.helperNameMap[s]} as _${compiler_core_1.helperNameMap[s]}`)
            .join(', ')} } from ${JSON.stringify(runtimeModuleName)}\n`);
    }
    newline();
    if (!inline) {
        push(`export `);
    }
}
function genFunctionPreamble(ast, context) {
    const { prefixIdentifiers, push, newline, runtimeGlobalName } = context;
    const VueBinding = runtimeGlobalName;
    const aliasHelper = (s) => `${compiler_core_1.helperNameMap[s]}: _${compiler_core_1.helperNameMap[s]}`;
    // Generate const declaration for helpers
    // In prefix mode, we place the const declaration at top so it's done
    // only once; But if we not prefixing, we place the declaration inside the
    // with block so it doesn't incur the `in` check cost for every helper access.
    if (ast.helpers.length > 0) {
        if (prefixIdentifiers) {
            push(`const { ${ast.helpers.map(aliasHelper).join(', ')} } = ${VueBinding}\n`);
        }
        else {
            // "with" mode.
            // save Vue in a separate variable to avoid collision
            push(`const _Vue = ${VueBinding}\n`);
            // in "with" mode, helpers are declared inside the with block to avoid
            // has check cost, but hoists are lifted out of the function - we need
            // to provide the helper here.
        }
    }
    newline();
    push(`return `);
}
function createGenNodeContext() {
    const context = {
        code: '',
        helper(key) {
            return `_${compiler_core_1.helperNameMap[key]}`;
        },
        push(code) {
            context.code += code;
        },
    };
    return context;
}
function genNode(node, context) {
    if (!context) {
        context = createGenNodeContext();
    }
    if ((0, shared_1.isString)(node)) {
        context.push(node);
        return context;
    }
    if ((0, shared_1.isSymbol)(node)) {
        context.push(context.helper(node));
        return context;
    }
    switch (node.type) {
        case 2 /* TEXT */:
            genText(node, context);
            break;
        case 4 /* SIMPLE_EXPRESSION */:
            genExpression(node, context);
            break;
        case 5 /* INTERPOLATION */:
            genInterpolation(node, context);
            break;
        case 8 /* COMPOUND_EXPRESSION */:
            genCompoundExpression(node, context);
            break;
    }
    return context;
}
exports.genNode = genNode;
function genText(node, context) {
    context.push(JSON.stringify(node.content), node);
}
function genExpression(node, context) {
    const { content, isStatic } = node;
    context.push(isStatic ? JSON.stringify(content) : content, node);
}
function genInterpolation(node, context) {
    const { push, helper } = context;
    push(`${helper(compiler_core_1.TO_DISPLAY_STRING)}(`);
    genNode(node.content, context);
    push(`)`);
}
function genCompoundExpression(node, context) {
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if ((0, shared_1.isString)(child)) {
            context.push(child);
        }
        else {
            genNode(child, context);
        }
    }
}
