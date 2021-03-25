"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSX_HELPER_KEY = exports.buildIIFE = exports.walksScope = exports.FRAGMENT = exports.shouldTransformedToSlots = exports.transformJSXExpressionContainer = exports.transformJSXSpreadChild = exports.transformJSXText = exports.getJSXAttributeName = exports.getTag = exports.transformJSXMemberExpression = exports.checkIsComponent = exports.isDirective = exports.createIdentifier = void 0;
const t = __importStar(require("@babel/types"));
const html_tags_1 = __importDefault(require("html-tags"));
const svg_tags_1 = __importDefault(require("svg-tags"));
const JSX_HELPER_KEY = 'JSX_HELPER_KEY';
exports.JSX_HELPER_KEY = JSX_HELPER_KEY;
const FRAGMENT = 'Fragment';
exports.FRAGMENT = FRAGMENT;
const KEEP_ALIVE = 'KeepAlive';
/**
 * create Identifier
 * @param path NodePath
 * @param state
 * @param name string
 * @returns MemberExpression
 */
const createIdentifier = (state, name) => state.get(name)();
exports.createIdentifier = createIdentifier;
/**
 * Checks if string is describing a directive
 * @param src string
 */
const isDirective = (src) => src.startsWith('v-')
    || (src.startsWith('v') && src.length >= 2 && src[1] >= 'A' && src[1] <= 'Z');
exports.isDirective = isDirective;
/**
 * Should transformed to slots
 * @param tag string
 * @returns boolean
 */
const shouldTransformedToSlots = (tag) => !(tag.endsWith(FRAGMENT) || tag === KEEP_ALIVE);
exports.shouldTransformedToSlots = shouldTransformedToSlots;
/**
 * Check if a Node is a component
 *
 * @param t
 * @param path JSXOpeningElement
 * @returns boolean
 */
const checkIsComponent = (path, state) => {
    const namePath = path.get('name');
    if (namePath.isJSXMemberExpression()) {
        return shouldTransformedToSlots(namePath.node.property.name); // For withCtx
    }
    const tag = namePath.node.name;
    if(state.opts.isCustomElement && state.opts.isCustomElement(tag)){
      return false
    }
    return shouldTransformedToSlots(tag) && !html_tags_1.default.includes(tag) && !svg_tags_1.default.includes(tag);
};
exports.checkIsComponent = checkIsComponent;
/**
 * Transform JSXMemberExpression to MemberExpression
 * @param path JSXMemberExpression
 * @returns MemberExpression
 */
const transformJSXMemberExpression = (path) => {
    const objectPath = path.node.object;
    const propertyPath = path.node.property;
    const transformedObject = t.isJSXMemberExpression(objectPath)
        ? transformJSXMemberExpression(path.get('object'))
        : t.isJSXIdentifier(objectPath)
            ? t.identifier(objectPath.name)
            : t.nullLiteral();
    const transformedProperty = t.identifier(propertyPath.name);
    return t.memberExpression(transformedObject, transformedProperty);
};
exports.transformJSXMemberExpression = transformJSXMemberExpression;
/**
 * Get tag (first attribute for h) from JSXOpeningElement
 * @param path JSXElement
 * @param state State
 * @returns Identifier | StringLiteral | MemberExpression | CallExpression
 */
const getTag = (path, state) => {
    var _a, _b;
    const namePath = path.get('openingElement').get('name');
    if (namePath.isJSXIdentifier()) {
        const { name } = namePath.node;
        if (!html_tags_1.default.includes(name) && !svg_tags_1.default.includes(name)) {
            return (name === FRAGMENT
                ? createIdentifier(state, FRAGMENT)
                : path.scope.hasBinding(name)
                    ? t.identifier(name)
                    : ((_b = (_a = state.opts).isCustomElement) === null || _b === void 0 ? void 0 : _b.call(_a, name)) ? t.stringLiteral(name)
                        : t.callExpression(createIdentifier(state, 'resolveComponent'), [t.stringLiteral(name)]));
        }
        return t.stringLiteral(name);
    }
    if (namePath.isJSXMemberExpression()) {
        return transformJSXMemberExpression(namePath);
    }
    throw new Error(`getTag: ${namePath.type} is not supported`);
};
exports.getTag = getTag;
const getJSXAttributeName = (path) => {
    const nameNode = path.node.name;
    if (t.isJSXIdentifier(nameNode)) {
        return nameNode.name;
    }
    return `${nameNode.namespace.name}:${nameNode.name.name}`;
};
exports.getJSXAttributeName = getJSXAttributeName;
/**
 * Transform JSXText to StringLiteral
 * @param path JSXText
 * @returns StringLiteral | null
 */
const transformJSXText = (path) => {
    const { node } = path;
    const lines = node.value.split(/\r\n|\n|\r/);
    let lastNonEmptyLine = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/[^ \t]/)) {
            lastNonEmptyLine = i;
        }
    }
    let str = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isFirstLine = i === 0;
        const isLastLine = i === lines.length - 1;
        const isLastNonEmptyLine = i === lastNonEmptyLine;
        // replace rendered whitespace tabs with spaces
        let trimmedLine = line.replace(/\t/g, ' ');
        // trim whitespace touching a newline
        if (!isFirstLine) {
            trimmedLine = trimmedLine.replace(/^[ ]+/, '');
        }
        // trim whitespace touching an endline
        if (!isLastLine) {
            trimmedLine = trimmedLine.replace(/[ ]+$/, '');
        }
        if (trimmedLine) {
            if (!isLastNonEmptyLine) {
                trimmedLine += ' ';
            }
            str += trimmedLine;
        }
    }
    return str !== '' ? t.stringLiteral(str) : null;
};
exports.transformJSXText = transformJSXText;
/**
 * Transform JSXExpressionContainer to Expression
 * @param path JSXExpressionContainer
 * @returns Expression
 */
const transformJSXExpressionContainer = (path) => path.get('expression').node;
exports.transformJSXExpressionContainer = transformJSXExpressionContainer;
/**
 * Transform JSXSpreadChild
 * @param path JSXSpreadChild
 * @returns SpreadElement
 */
const transformJSXSpreadChild = (path) => t.spreadElement(path.get('expression').node);
exports.transformJSXSpreadChild = transformJSXSpreadChild;
const walksScope = (path, name, slotFlag) => {
    if (path.scope.hasBinding(name) && path.parentPath) {
        if (t.isJSXElement(path.parentPath.node)) {
            path.parentPath.setData('slotFlag', slotFlag);
        }
        walksScope(path.parentPath, name, slotFlag);
    }
};
exports.walksScope = walksScope;
const buildIIFE = (path, children) => {
    const { parentPath } = path;
    if (t.isAssignmentExpression(parentPath)) {
        const { left } = parentPath.node;
        if (t.isIdentifier(left)) {
            return children.map((child) => {
                if (t.isIdentifier(child) && child.name === left.name) {
                    const insertName = path.scope.generateUidIdentifier(child.name);
                    parentPath.insertBefore(t.variableDeclaration('const', [
                        t.variableDeclarator(insertName, t.callExpression(t.functionExpression(null, [], t.blockStatement([t.returnStatement(child)])), [])),
                    ]));
                    return insertName;
                }
                return child;
            });
        }
    }
    return children;
};
exports.buildIIFE = buildIIFE;
