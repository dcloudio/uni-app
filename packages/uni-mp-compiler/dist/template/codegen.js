"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genElementProps = exports.genElement = exports.genNode = exports.generate = void 0;
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
    push(`{{${(0, codegen_1.genNode)(node).code}}}`);
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
function genVFor(opts, props, { push }) {
    push(` wx:for="{{${opts.source}}}"`);
    if (opts.value) {
        push(` wx:for-item="${opts.value}"`);
    }
    if (opts.key) {
        push(` wx:for-index="${opts.key}"`);
    }
    const keyIndex = props.findIndex((prop) => prop.type === 7 /* DIRECTIVE */ &&
        prop.name === 'bind' &&
        prop.arg &&
        prop.arg.type === 4 /* SIMPLE_EXPRESSION */ &&
        prop.arg.content === 'key');
    if (keyIndex > -1) {
        const keyProp = props[keyIndex];
        const key = keyProp.exp.content;
        push(` wx:key="${key.includes('.') ? key.split('.')[1] : key}"`);
        props.splice(keyIndex, 1);
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
        genVFor(node.vFor, props, context);
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
            context.push(` ${prop.name}=${prop.value}`);
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
