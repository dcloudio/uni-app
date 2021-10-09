"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genElementProps = exports.genElement = exports.genNode = exports.generate = void 0;
const compiler_core_1 = require("@vue/compiler-core");
const codegen_1 = require("../codegen");
const vFor_1 = require("../transforms/vFor");
const vIf_1 = require("../transforms/vIf");
function generate({ children }, { emitFile, filename }) {
    const context = {
        code: '',
        push(code) {
            context.code += code;
        },
    };
    children.forEach((node) => {
        genNode(node, context);
    });
    emitFile({ type: 'asset', fileName: filename, source: context.code });
}
exports.generate = generate;
function genNode(node, context) {
    switch (node.type) {
        case 9 /* IF */:
            return node.branches.forEach((node) => {
                genElement(node, context);
            });
        case 2 /* TEXT */:
            return genText(node, context);
        case 5 /* INTERPOLATION */:
            return genExpression(node.content, context);
        case 1 /* ELEMENT */:
            return genElement(node, context);
    }
}
exports.genNode = genNode;
function genText(node, { push }) {
    push(node.content);
}
function genExpression(node, { push }) {
    push(`{{${(0, codegen_1.genExpr)(node)}}}`);
}
function genVIf(exp, { push }) {
    push(` wx:if="{{${exp}}}"`);
}
function genVElseIf(exp, { push }) {
    push(` wx:elif="{{${exp}}}"`);
}
function genVElse({ push }) {
    push(` wx:else`);
}
function genVFor({ sourceAlias, valueAlias, keyAlias }, node, { push }) {
    push(` wx:for="{{${sourceAlias}}}"`);
    if (valueAlias) {
        push(` wx:for-item="${valueAlias}"`);
    }
    if (keyAlias) {
        push(` wx:for-index="${keyAlias}"`);
    }
    const keyProp = (0, compiler_core_1.findProp)(node, 'key', true);
    if (keyProp) {
        const key = keyProp.exp.content;
        push(` wx:key="${key.includes('.') ? key.split('.')[1] : key}"`);
        node.props.splice(node.props.indexOf(keyProp), 1);
    }
}
const tagMap = {
    template: 'block',
};
function genElement(node, context) {
    const { children, isSelfClosing, props } = node;
    const tag = tagMap[node.tag] || node.tag;
    const { push } = context;
    push(`<${tag}`);
    if ((0, vIf_1.isIfElementNode)(node)) {
        const { name, condition } = node.vIf;
        if (name === 'if') {
            genVIf(condition, context);
        }
        else if (name === 'else-if') {
            genVElseIf(condition, context);
        }
        else if (name === 'else') {
            genVElse(context);
        }
    }
    if ((0, vFor_1.isForElementNode)(node)) {
        genVFor(node.vFor, node, context);
    }
    if (props.length) {
        genElementProps(props, context);
    }
    if (isSelfClosing) {
        push(`/>`);
    }
    else {
        push(`>`);
        children.forEach((node) => {
            genNode(node, context);
        });
        push(`</${tag}>`);
    }
}
exports.genElement = genElement;
function genElementProps(props, context) {
    const { push } = context;
    props.forEach((prop) => {
        if (prop.type === 6 /* ATTRIBUTE */) {
            const { value } = prop;
            if (value) {
                context.push(` ${prop.name}="${value.content}"`);
            }
            else {
                context.push(` ${prop.name}`);
            }
        }
        else {
            const { name } = prop;
            if (name === 'bind') {
                push(` `);
                genDirectiveNode(prop, context);
            }
        }
    });
}
exports.genElementProps = genElementProps;
function genDirectiveNode(prop, { push }) {
    const arg = prop.arg.content;
    const exp = prop.exp.content;
    push(`${arg}="{{${exp}}}"`);
}
