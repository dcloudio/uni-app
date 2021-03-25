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
Object.defineProperty(exports, "__esModule", { value: true });
const t = __importStar(require("@babel/types"));
const utils_1 = require("./utils");
/**
 * Get JSX element type
 *
 * @param path Path<JSXOpeningElement>
 */
const getType = (path) => {
    const typePath = path
        .get('attributes')
        .find((attribute) => {
        if (!t.isJSXAttribute(attribute)) {
            return false;
        }
        return t.isJSXIdentifier(attribute.get('name'))
            && attribute.get('name').node.name === 'type';
    });
    return typePath ? typePath.get('value').node : null;
};
const parseModifiers = (value) => (t.isArrayExpression(value)
    ? value.elements
        .map((el) => (t.isStringLiteral(el) ? el.value : ''))
        .filter(Boolean)
    : []);
const parseDirectives = (params) => {
    var _a, _b, _c;
    const { name, path, value, state, tag, isComponent, } = params;
    const args = [];
    const vals = [];
    const modifiersSet = [];
    const underscoreModifiers = name.split('_');
    const directiveName = ((_a = underscoreModifiers.shift()) === null || _a === void 0 ? void 0 : _a.replace(/^v/, '').replace(/^-/, '').replace(/^\S/, (s) => s.toLowerCase())) || '';
    const isVModels = directiveName === 'models';
    const isVModel = directiveName === 'model';
    if (isVModel && !t.isJSXExpressionContainer(path.get('value'))) {
        throw new Error('You have to use JSX Expression inside your v-model');
    }
    if (isVModels && !isComponent) {
        throw new Error('v-models can only use in custom components');
    }
    const shouldResolve = !['html', 'text', 'model', 'models'].includes(directiveName)
        || (isVModel && !isComponent);
    if (['models', 'model'].includes(directiveName)) {
        if (t.isArrayExpression(value)) {
            const elementsList = isVModels ? value.elements : [value];
            elementsList.forEach((element) => {
                if (isVModels && !t.isArrayExpression(element)) {
                    throw new Error('You should pass a Two-dimensional Arrays to v-models');
                }
                const { elements } = element;
                const [first, second, third] = elements;
                let modifiers = underscoreModifiers;
                if (t.isStringLiteral(second)) {
                    args.push(second);
                    modifiers = parseModifiers(third);
                }
                else if (t.isArrayExpression(second)) {
                    args.push(t.nullLiteral());
                    modifiers = parseModifiers(second);
                }
                else {
                    // work as v-model={[value]} or v-models={[[value]]}
                    args.push(t.nullLiteral());
                }
                modifiersSet.push(new Set(modifiers));
                vals.push(first);
            });
        }
        else if (isVModel) {
            // work as v-model={value}
            args.push(t.nullLiteral());
            modifiersSet.push(new Set(underscoreModifiers));
        }
    }
    else {
        modifiersSet.push(new Set(underscoreModifiers));
    }
    return {
        directiveName,
        modifiers: modifiersSet,
        values: vals.length ? vals : [value],
        args,
        directive: shouldResolve ? [
            resolveDirective(path, state, tag, directiveName),
            vals[0] || value,
            !!((_b = modifiersSet[0]) === null || _b === void 0 ? void 0 : _b.size) && t.unaryExpression('void', t.numericLiteral(0), true),
            !!((_c = modifiersSet[0]) === null || _c === void 0 ? void 0 : _c.size) && t.objectExpression([...modifiersSet[0]].map((modifier) => t.objectProperty(t.identifier(modifier), t.booleanLiteral(true)))),
        ].filter(Boolean) : undefined,
    };
};
const resolveDirective = (path, state, tag, directiveName) => {
    var _a;
    if (directiveName === 'show') {
        return utils_1.createIdentifier(state, 'vShow');
    }
    if (directiveName === 'model') {
        let modelToUse;
        const type = getType(path.parentPath);
        switch (tag.value) {
            case 'select':
                modelToUse = utils_1.createIdentifier(state, 'vModelSelect');
                break;
            case 'textarea':
                modelToUse = utils_1.createIdentifier(state, 'vModelText');
                break;
            default:
                if (t.isStringLiteral(type) || !type) {
                    switch ((_a = type) === null || _a === void 0 ? void 0 : _a.value) {
                        case 'checkbox':
                            modelToUse = utils_1.createIdentifier(state, 'vModelCheckbox');
                            break;
                        case 'radio':
                            modelToUse = utils_1.createIdentifier(state, 'vModelRadio');
                            break;
                        default:
                            modelToUse = utils_1.createIdentifier(state, 'vModelText');
                    }
                }
                else {
                    modelToUse = utils_1.createIdentifier(state, 'vModelDynamic');
                }
        }
        return modelToUse;
    }
    return t.callExpression(utils_1.createIdentifier(state, 'resolveDirective'), [
        t.stringLiteral(directiveName),
    ]);
};
exports.default = parseDirectives;
