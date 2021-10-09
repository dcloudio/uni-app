"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genExpr = exports.generate = void 0;
const shared_1 = require("@vue/shared");
const compiler_core_1 = require("@vue/compiler-core");
const generator_1 = __importDefault(require("@babel/generator"));
const ast_1 = require("./ast");
function generate(scope, options) {
    const isSetupInlined = !!options.inline;
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
    const codes = [];
    if (isSetupInlined) {
        codes.push(`(${signature}) => {`);
    }
    else {
        codes.push(`function ${functionName}(${signature}) {`);
    }
    codes.push(`return ` +
        (0, generator_1.default)((0, ast_1.createObjectExpression)(scope.properties), {
        // concise: true,
        }).code);
    codes.push(`}`);
    return {
        code: codes.join('\n'),
        preamble: '',
    };
}
exports.generate = generate;
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
function genExpr(node, context) {
    return genNode(node, context).code;
}
exports.genExpr = genExpr;
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
    genExpr(node.content, context);
    push(`)`);
}
function genCompoundExpression(node, context) {
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if ((0, shared_1.isString)(child)) {
            context.push(child);
        }
        else {
            genExpr(child, context);
        }
    }
}
