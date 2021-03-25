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
const t = __importStar(require("@babel/types"));
const helper_module_imports_1 = require("@babel/helper-module-imports");
const utils_1 = require("./utils");
const parseDirectives_1 = __importDefault(require("./parseDirectives"));
const transform_vue_jsx_1 = require("./transform-vue-jsx");
const xlinkRE = /^xlink([A-Z])/;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const getJSXAttributeValue = (path, state) => {
    const valuePath = path.get('value');
    if (valuePath.isJSXElement()) {
        return transform_vue_jsx_1.transformJSXElement(valuePath, state);
    }
    if (valuePath.isStringLiteral()) {
        return valuePath.node;
    }
    if (valuePath.isJSXExpressionContainer()) {
        return utils_1.transformJSXExpressionContainer(valuePath);
    }
    return null;
};
const transformJSXSpreadAttribute = (nodePath, path, mergeProps, args) => {
    const argument = path.get('argument');
    const { properties } = argument.node;
    if (!properties) {
        if (argument.isIdentifier()) {
            utils_1.walksScope(nodePath, argument.name, 2 /* DYNAMIC */);
        }
        args.push(mergeProps ? argument.node : t.spreadElement(argument.node));
    }
    else if (mergeProps) {
        args.push(t.objectExpression(properties));
    }
    else {
        args.push(...properties);
    }
};
const mergeAsArray = (existing, incoming) => {
    if (t.isArrayExpression(existing.value)) {
        existing.value.elements.push(incoming.value);
    }
    else {
        existing.value = t.arrayExpression([
            existing.value,
            incoming.value,
        ]);
    }
};
const dedupeProperties = (properties = [], mergeProps) => {
    if (!mergeProps) {
        return properties;
    }
    const knownProps = new Map();
    const deduped = [];
    properties.forEach((prop) => {
        const { value: name } = prop.key;
        const existing = knownProps.get(name);
        if (existing) {
            if (name === 'style' || name === 'class' || name.startsWith('on')) {
                mergeAsArray(existing, prop);
            }
        }
        else {
            knownProps.set(name, prop);
            deduped.push(prop);
        }
    });
    return deduped;
};
/**
 *  Check if an attribute value is constant
 * @param node
 * @returns boolean
 */
const isConstant = (node) => {
    if (t.isIdentifier(node)) {
        return node.name === 'undefined';
    }
    if (t.isArrayExpression(node)) {
        const { elements } = node;
        return elements.every((element) => element && isConstant(element));
    }
    if (t.isObjectExpression(node)) {
        return node.properties.every((property) => isConstant(property.value));
    }
    if (t.isLiteral(node)) {
        return true;
    }
    return false;
};
const buildProps = (path, state) => {
    const tag = utils_1.getTag(path, state);
    const isComponent = utils_1.checkIsComponent(path.get('openingElement'), state);
    const props = path.get('openingElement').get('attributes');
    const directives = [];
    const dynamicPropNames = new Set();
    let slots = null;
    let patchFlag = 0;
    if (props.length === 0) {
        return {
            tag,
            isComponent,
            slots,
            props: t.nullLiteral(),
            directives,
            patchFlag,
            dynamicPropNames,
        };
    }
    let properties = [];
    // patchFlag analysis
    let hasRef = false;
    let hasClassBinding = false;
    let hasStyleBinding = false;
    let hasHydrationEventBinding = false;
    let hasDynamicKeys = false;
    const mergeArgs = [];
    const { mergeProps = true } = state.opts;
    props
        .forEach((prop) => {
        if (prop.isJSXAttribute()) {
            let name = utils_1.getJSXAttributeName(prop);
            const attributeValue = getJSXAttributeValue(prop, state);
            if (!isConstant(attributeValue) || name === 'ref') {
                if (!isComponent
                    && isOn(name)
                    // omit the flag for click handlers becaues hydration gives click
                    // dedicated fast path.
                    && name.toLowerCase() !== 'onclick'
                    // omit v-model handlers
                    && name !== 'onUpdate:modelValue') {
                    hasHydrationEventBinding = true;
                }
                if (name === 'ref') {
                    hasRef = true;
                }
                else if (name === 'class' && !isComponent) {
                    hasClassBinding = true;
                }
                else if (name === 'style' && !isComponent) {
                    hasStyleBinding = true;
                }
                else if (name !== 'key'
                    && !utils_1.isDirective(name)
                    && name !== 'on') {
                    dynamicPropNames.add(name);
                }
            }
            if (state.opts.transformOn && (name === 'on' || name === 'nativeOn')) {
                if (!state.get('transformOn')) {
                    state.set('transformOn', helper_module_imports_1.addDefault(path, '@vue/babel-helper-vue-transform-on', { nameHint: '_transformOn' }));
                }
                mergeArgs.push(t.callExpression(state.get('transformOn'), [attributeValue || t.booleanLiteral(true)]));
                return;
            }
            if (utils_1.isDirective(name)) {
                const { directive, modifiers, values, args, directiveName, } = parseDirectives_1.default({
                    tag,
                    isComponent,
                    name,
                    path: prop,
                    state,
                    value: attributeValue,
                });
                if (directiveName === 'slots') {
                    slots = attributeValue;
                    return;
                }
                if (directive) {
                    directives.push(t.arrayExpression(directive));
                }
                else if (directiveName === 'html') {
                    properties.push(t.objectProperty(t.stringLiteral('innerHTML'), values[0]));
                    dynamicPropNames.add('innerHTML');
                }
                else if (directiveName === 'text') {
                    properties.push(t.objectProperty(t.stringLiteral('textContent'), values[0]));
                    dynamicPropNames.add('textContent');
                }
                if (['models', 'model'].includes(directiveName)) {
                    values.forEach((value, index) => {
                        var _a, _b;
                        const argVal = (_a = args[index]) === null || _a === void 0 ? void 0 : _a.value;
                        const propName = argVal || 'modelValue';
                        // must be v-model or v-models and is a component
                        if (!directive) {
                            properties.push(t.objectProperty(t.stringLiteral(propName), value));
                            dynamicPropNames.add(propName);
                            if ((_b = modifiers[index]) === null || _b === void 0 ? void 0 : _b.size) {
                                properties.push(t.objectProperty(t.stringLiteral(`${argVal || 'model'}Modifiers`), t.objectExpression([...modifiers[index]].map((modifier) => t.objectProperty(t.stringLiteral(modifier), t.booleanLiteral(true))))));
                            }
                        }
                        properties.push(t.objectProperty(t.stringLiteral(`onUpdate:${propName}`), t.arrowFunctionExpression([t.identifier('$event')], t.assignmentExpression('=', value, t.identifier('$event')))));
                        dynamicPropNames.add(`onUpdate:${propName}`);
                    });
                }
            }
            else {
                if (name.match(xlinkRE)) {
                    name = name.replace(xlinkRE, (_, firstCharacter) => `xlink:${firstCharacter.toLowerCase()}`);
                }
                properties.push(t.objectProperty(t.stringLiteral(name), attributeValue || t.booleanLiteral(true)));
            }
        }
        else {
            if (properties.length && mergeProps) {
                mergeArgs.push(t.objectExpression(dedupeProperties(properties, mergeProps)));
                properties = [];
            }
            // JSXSpreadAttribute
            hasDynamicKeys = true;
            transformJSXSpreadAttribute(path, prop, mergeProps, mergeProps ? mergeArgs : properties);
        }
    });
    // patchFlag analysis
    if (hasDynamicKeys) {
        patchFlag |= 16 /* FULL_PROPS */;
    }
    else {
        if (hasClassBinding) {
            patchFlag |= 2 /* CLASS */;
        }
        if (hasStyleBinding) {
            patchFlag |= 4 /* STYLE */;
        }
        if (dynamicPropNames.size) {
            patchFlag |= 8 /* PROPS */;
        }
        if (hasHydrationEventBinding) {
            patchFlag |= 32 /* HYDRATE_EVENTS */;
        }
    }
    if ((patchFlag === 0 || patchFlag === 32 /* HYDRATE_EVENTS */)
        && (hasRef || directives.length > 0)) {
        patchFlag |= 512 /* NEED_PATCH */;
    }
    let propsExpression = t.nullLiteral();
    if (mergeArgs.length) {
        if (properties.length) {
            mergeArgs.push(t.objectExpression(dedupeProperties(properties, mergeProps)));
        }
        if (mergeArgs.length > 1) {
            propsExpression = t.callExpression(utils_1.createIdentifier(state, 'mergeProps'), mergeArgs);
        }
        else {
            // single no need for a mergeProps call
            propsExpression = mergeArgs[0];
        }
    }
    else if (properties.length) {
        // single no need for spread
        if (properties.length === 1 && t.isSpreadElement(properties[0])) {
            propsExpression = properties[0].argument;
        }
        else {
            propsExpression = t.objectExpression(dedupeProperties(properties, mergeProps));
        }
    }
    return {
        tag,
        props: propsExpression,
        isComponent,
        slots,
        directives,
        patchFlag,
        dynamicPropNames,
    };
};
exports.default = buildProps;
