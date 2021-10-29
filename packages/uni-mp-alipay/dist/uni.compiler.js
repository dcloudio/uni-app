'use strict';

var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefaultLegacy(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

var component2 = true;
var enableAppxNg = true;
var source = {
	component2: component2,
	enableAppxNg: enableAppxNg
};

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */

/**
 * dev only flag -> name mapping
 */
const PatchFlagNames = {
    [1 /* TEXT */]: `TEXT`,
    [2 /* CLASS */]: `CLASS`,
    [4 /* STYLE */]: `STYLE`,
    [8 /* PROPS */]: `PROPS`,
    [16 /* FULL_PROPS */]: `FULL_PROPS`,
    [32 /* HYDRATE_EVENTS */]: `HYDRATE_EVENTS`,
    [64 /* STABLE_FRAGMENT */]: `STABLE_FRAGMENT`,
    [128 /* KEYED_FRAGMENT */]: `KEYED_FRAGMENT`,
    [256 /* UNKEYED_FRAGMENT */]: `UNKEYED_FRAGMENT`,
    [512 /* NEED_PATCH */]: `NEED_PATCH`,
    [1024 /* DYNAMIC_SLOTS */]: `DYNAMIC_SLOTS`,
    [2048 /* DEV_ROOT_FRAGMENT */]: `DEV_ROOT_FRAGMENT`,
    [-1 /* HOISTED */]: `HOISTED`,
    [-2 /* BAIL */]: `BAIL`
};

(process.env.NODE_ENV !== 'production')
    ? Object.freeze({})
    : {};
(process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
const NOOP = () => { };
/**
 * Always return false.
 */
const NO = () => false;
const extend = Object.assign;
const isArray = Array.isArray;
const isString = (val) => typeof val === 'string';
const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return ((str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
const hyphenateRE = /\B([A-Z])/g;
/**
 * @private
 */
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, '-$1').toLowerCase());

function defaultOnError(error) {
    throw error;
}
function defaultOnWarn(msg) {
    (process.env.NODE_ENV !== 'production') && console.warn(`[Vue warn] ${msg.message}`);
}
function createCompilerError(code, loc, messages, additionalMessage) {
    const msg = (process.env.NODE_ENV !== 'production') || !true
        ? (messages || errorMessages)[code] + (additionalMessage || ``)
        : code;
    const error = new SyntaxError(String(msg));
    error.code = code;
    error.loc = loc;
    return error;
}
const errorMessages = {
    // parse errors
    [0 /* ABRUPT_CLOSING_OF_EMPTY_COMMENT */]: 'Illegal comment.',
    [1 /* CDATA_IN_HTML_CONTENT */]: 'CDATA section is allowed only in XML context.',
    [2 /* DUPLICATE_ATTRIBUTE */]: 'Duplicate attribute.',
    [3 /* END_TAG_WITH_ATTRIBUTES */]: 'End tag cannot have attributes.',
    [4 /* END_TAG_WITH_TRAILING_SOLIDUS */]: "Illegal '/' in tags.",
    [5 /* EOF_BEFORE_TAG_NAME */]: 'Unexpected EOF in tag.',
    [6 /* EOF_IN_CDATA */]: 'Unexpected EOF in CDATA section.',
    [7 /* EOF_IN_COMMENT */]: 'Unexpected EOF in comment.',
    [8 /* EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT */]: 'Unexpected EOF in script.',
    [9 /* EOF_IN_TAG */]: 'Unexpected EOF in tag.',
    [10 /* INCORRECTLY_CLOSED_COMMENT */]: 'Incorrectly closed comment.',
    [11 /* INCORRECTLY_OPENED_COMMENT */]: 'Incorrectly opened comment.',
    [12 /* INVALID_FIRST_CHARACTER_OF_TAG_NAME */]: "Illegal tag name. Use '&lt;' to print '<'.",
    [13 /* MISSING_ATTRIBUTE_VALUE */]: 'Attribute value was expected.',
    [14 /* MISSING_END_TAG_NAME */]: 'End tag name was expected.',
    [15 /* MISSING_WHITESPACE_BETWEEN_ATTRIBUTES */]: 'Whitespace was expected.',
    [16 /* NESTED_COMMENT */]: "Unexpected '<!--' in comment.",
    [17 /* UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME */]: 'Attribute name cannot contain U+0022 ("), U+0027 (\'), and U+003C (<).',
    [18 /* UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE */]: 'Unquoted attribute value cannot contain U+0022 ("), U+0027 (\'), U+003C (<), U+003D (=), and U+0060 (`).',
    [19 /* UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME */]: "Attribute name cannot start with '='.",
    [21 /* UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME */]: "'<?' is allowed only in XML context.",
    [20 /* UNEXPECTED_NULL_CHARACTER */]: `Unexpected null character.`,
    [22 /* UNEXPECTED_SOLIDUS_IN_TAG */]: "Illegal '/' in tags.",
    // Vue-specific parse errors
    [23 /* X_INVALID_END_TAG */]: 'Invalid end tag.',
    [24 /* X_MISSING_END_TAG */]: 'Element is missing end tag.',
    [25 /* X_MISSING_INTERPOLATION_END */]: 'Interpolation end sign was not found.',
    [27 /* X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END */]: 'End bracket for dynamic directive argument was not found. ' +
        'Note that dynamic directive argument cannot contain spaces.',
    [26 /* X_MISSING_DIRECTIVE_NAME */]: 'Legal directive name was expected.',
    // transform errors
    [28 /* X_V_IF_NO_EXPRESSION */]: `v-if/v-else-if is missing expression.`,
    [29 /* X_V_IF_SAME_KEY */]: `v-if/else branches must use unique keys.`,
    [30 /* X_V_ELSE_NO_ADJACENT_IF */]: `v-else/v-else-if has no adjacent v-if or v-else-if.`,
    [31 /* X_V_FOR_NO_EXPRESSION */]: `v-for is missing expression.`,
    [32 /* X_V_FOR_MALFORMED_EXPRESSION */]: `v-for has invalid expression.`,
    [33 /* X_V_FOR_TEMPLATE_KEY_PLACEMENT */]: `<template v-for> key should be placed on the <template> tag.`,
    [34 /* X_V_BIND_NO_EXPRESSION */]: `v-bind is missing expression.`,
    [35 /* X_V_ON_NO_EXPRESSION */]: `v-on is missing expression.`,
    [36 /* X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET */]: `Unexpected custom directive on <slot> outlet.`,
    [37 /* X_V_SLOT_MIXED_SLOT_USAGE */]: `Mixed v-slot usage on both the component and nested <template>.` +
        `When there are multiple named slots, all slots should use <template> ` +
        `syntax to avoid scope ambiguity.`,
    [38 /* X_V_SLOT_DUPLICATE_SLOT_NAMES */]: `Duplicate slot names found. `,
    [39 /* X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN */]: `Extraneous children found when component already has explicitly named ` +
        `default slot. These children will be ignored.`,
    [40 /* X_V_SLOT_MISPLACED */]: `v-slot can only be used on components or <template> tags.`,
    [41 /* X_V_MODEL_NO_EXPRESSION */]: `v-model is missing expression.`,
    [42 /* X_V_MODEL_MALFORMED_EXPRESSION */]: `v-model value must be a valid JavaScript member expression.`,
    [43 /* X_V_MODEL_ON_SCOPE_VARIABLE */]: `v-model cannot be used on v-for or v-slot scope variables because they are not writable.`,
    [44 /* X_INVALID_EXPRESSION */]: `Error parsing JavaScript expression: `,
    [45 /* X_KEEP_ALIVE_INVALID_CHILDREN */]: `<KeepAlive> expects exactly one child component.`,
    // generic errors
    [46 /* X_PREFIX_ID_NOT_SUPPORTED */]: `"prefixIdentifiers" option is not supported in this build of compiler.`,
    [47 /* X_MODULE_MODE_NOT_SUPPORTED */]: `ES module mode is not supported in this build of compiler.`,
    [48 /* X_CACHE_HANDLER_NOT_SUPPORTED */]: `"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.`,
    [49 /* X_SCOPE_ID_NOT_SUPPORTED */]: `"scopeId" option is only supported in module mode.`,
    // just to fulfill types
    [50 /* __EXTEND_POINT__ */]: ``
};

const FRAGMENT = Symbol((process.env.NODE_ENV !== 'production') ? `Fragment` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `Teleport` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `Suspense` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `KeepAlive` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `BaseTransition` : ``);
const OPEN_BLOCK = Symbol((process.env.NODE_ENV !== 'production') ? `openBlock` : ``);
const CREATE_BLOCK = Symbol((process.env.NODE_ENV !== 'production') ? `createBlock` : ``);
const CREATE_ELEMENT_BLOCK = Symbol((process.env.NODE_ENV !== 'production') ? `createElementBlock` : ``);
const CREATE_VNODE = Symbol((process.env.NODE_ENV !== 'production') ? `createVNode` : ``);
const CREATE_ELEMENT_VNODE = Symbol((process.env.NODE_ENV !== 'production') ? `createElementVNode` : ``);
const CREATE_COMMENT = Symbol((process.env.NODE_ENV !== 'production') ? `createCommentVNode` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `createTextVNode` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `createStaticVNode` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `resolveComponent` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `resolveDynamicComponent` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `resolveDirective` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `resolveFilter` : ``);
const WITH_DIRECTIVES = Symbol((process.env.NODE_ENV !== 'production') ? `withDirectives` : ``);
const RENDER_LIST = Symbol((process.env.NODE_ENV !== 'production') ? `renderList` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `renderSlot` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `createSlots` : ``);
const TO_DISPLAY_STRING = Symbol((process.env.NODE_ENV !== 'production') ? `toDisplayString` : ``);
const MERGE_PROPS = Symbol((process.env.NODE_ENV !== 'production') ? `mergeProps` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `normalizeClass` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `normalizeStyle` : ``);
const NORMALIZE_PROPS = Symbol((process.env.NODE_ENV !== 'production') ? `normalizeProps` : ``);
const GUARD_REACTIVE_PROPS = Symbol((process.env.NODE_ENV !== 'production') ? `guardReactiveProps` : ``);
const TO_HANDLERS = Symbol((process.env.NODE_ENV !== 'production') ? `toHandlers` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `camelize` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `capitalize` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `toHandlerKey` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `setBlockTracking` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `pushScopeId` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `popScopeId` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `withCtx` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `unref` : ``);
Symbol((process.env.NODE_ENV !== 'production') ? `isRef` : ``);
const WITH_MEMO = Symbol((process.env.NODE_ENV !== 'production') ? `withMemo` : ``);
const IS_MEMO_SAME = Symbol((process.env.NODE_ENV !== 'production') ? `isMemoSame` : ``);

// AST Utilities ---------------------------------------------------------------
// Some expressions, e.g. sequence and conditional expressions, are never
// associated with template nodes, so their source locations are just a stub.
// Container types like CompoundExpression also don't need a real location.
const locStub = {
    source: '',
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 1, column: 1, offset: 0 }
};
function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives, isBlock = false, disableTracking = false, isComponent = false, loc = locStub) {
    if (context) {
        if (isBlock) {
            context.helper(OPEN_BLOCK);
            context.helper(getVNodeBlockHelper(context.inSSR, isComponent));
        }
        else {
            context.helper(getVNodeHelper(context.inSSR, isComponent));
        }
        if (directives) {
            context.helper(WITH_DIRECTIVES);
        }
    }
    return {
        type: 13 /* VNODE_CALL */,
        tag,
        props,
        children,
        patchFlag,
        dynamicProps,
        directives,
        isBlock,
        disableTracking,
        isComponent,
        loc
    };
}
function createObjectExpression(properties, loc = locStub) {
    return {
        type: 15 /* JS_OBJECT_EXPRESSION */,
        loc,
        properties
    };
}
function createObjectProperty(key, value) {
    return {
        type: 16 /* JS_PROPERTY */,
        loc: locStub,
        key: isString(key) ? createSimpleExpression(key, true) : key,
        value
    };
}
function createSimpleExpression(content, isStatic = false, loc = locStub, constType = 0 /* NOT_CONSTANT */) {
    return {
        type: 4 /* SIMPLE_EXPRESSION */,
        loc,
        content,
        isStatic,
        constType: isStatic ? 3 /* CAN_STRINGIFY */ : constType
    };
}
function createCompoundExpression(children, loc = locStub) {
    return {
        type: 8 /* COMPOUND_EXPRESSION */,
        loc,
        children
    };
}
function createCallExpression(callee, args = [], loc = locStub) {
    return {
        type: 14 /* JS_CALL_EXPRESSION */,
        loc,
        callee,
        arguments: args
    };
}
function createFunctionExpression(params, returns = undefined, newline = false, isSlot = false, loc = locStub) {
    return {
        type: 18 /* JS_FUNCTION_EXPRESSION */,
        params,
        returns,
        newline,
        isSlot,
        loc
    };
}
function createConditionalExpression(test, consequent, alternate, newline = true) {
    return {
        type: 19 /* JS_CONDITIONAL_EXPRESSION */,
        test,
        consequent,
        alternate,
        newline,
        loc: locStub
    };
}
function createBlockStatement(body) {
    return {
        type: 21 /* JS_BLOCK_STATEMENT */,
        body,
        loc: locStub
    };
}

const isStaticExp = (p) => p.type === 4 /* SIMPLE_EXPRESSION */ && p.isStatic;
const isBuiltInType = (tag, expected) => tag === expected || tag === hyphenate(expected);
NOOP
    ;
function getInnerRange(loc, offset, length) {
    const source = loc.source.slice(offset, offset + length);
    const newLoc = {
        source,
        start: advancePositionWithClone(loc.start, loc.source, offset),
        end: loc.end
    };
    if (length != null) {
        newLoc.end = advancePositionWithClone(loc.start, loc.source, offset + length);
    }
    return newLoc;
}
function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
    return advancePositionWithMutation(extend({}, pos), source, numberOfCharacters);
}
// advance by mutation without cloning (for performance reasons), since this
// gets called a lot in the parser
function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
    let linesCount = 0;
    let lastNewLinePos = -1;
    for (let i = 0; i < numberOfCharacters; i++) {
        if (source.charCodeAt(i) === 10 /* newline char code */) {
            linesCount++;
            lastNewLinePos = i;
        }
    }
    pos.offset += numberOfCharacters;
    pos.line += linesCount;
    pos.column =
        lastNewLinePos === -1
            ? pos.column + numberOfCharacters
            : numberOfCharacters - lastNewLinePos;
    return pos;
}
function findDir(node, name, allowEmpty = false) {
    for (let i = 0; i < node.props.length; i++) {
        const p = node.props[i];
        if (p.type === 7 /* DIRECTIVE */ &&
            (allowEmpty || p.exp) &&
            (isString(name) ? p.name === name : name.test(p.name))) {
            return p;
        }
    }
}
function findProp(node, name, dynamicOnly = false, allowEmpty = false) {
    for (let i = 0; i < node.props.length; i++) {
        const p = node.props[i];
        if (p.type === 6 /* ATTRIBUTE */) {
            if (dynamicOnly)
                continue;
            if (p.name === name && (p.value || allowEmpty)) {
                return p;
            }
        }
        else if (p.name === 'bind' &&
            (p.exp || allowEmpty) &&
            isBindKey(p.arg, name)) {
            return p;
        }
    }
}
function isBindKey(arg, name) {
    return !!(arg && isStaticExp(arg) && arg.content === name);
}
function isVSlot(p) {
    return p.type === 7 /* DIRECTIVE */ && p.name === 'slot';
}
function isTemplateNode(node) {
    return (node.type === 1 /* ELEMENT */ && node.tagType === 3 /* TEMPLATE */);
}
function isSlotOutlet(node) {
    return node.type === 1 /* ELEMENT */ && node.tagType === 2 /* SLOT */;
}
function getVNodeHelper(ssr, isComponent) {
    return ssr || isComponent ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
}
function getVNodeBlockHelper(ssr, isComponent) {
    return ssr || isComponent ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
}
const propsHelperSet = new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);
function getUnnormalizedProps(props, callPath = []) {
    if (props &&
        !isString(props) &&
        props.type === 14 /* JS_CALL_EXPRESSION */) {
        const callee = props.callee;
        if (!isString(callee) && propsHelperSet.has(callee)) {
            return getUnnormalizedProps(props.arguments[0], callPath.concat(props));
        }
    }
    return [props, callPath];
}
function injectProp(node, prop, context) {
    let propsWithInjection;
    const originalProps = node.type === 13 /* VNODE_CALL */ ? node.props : node.arguments[2];
    /**
     * 1. mergeProps(...)
     * 2. toHandlers(...)
     * 3. normalizeProps(...)
     * 4. normalizeProps(guardReactiveProps(...))
     *
     * we need to get the real props before normalization
     */
    let props = originalProps;
    let callPath = [];
    let parentCall;
    if (props &&
        !isString(props) &&
        props.type === 14 /* JS_CALL_EXPRESSION */) {
        const ret = getUnnormalizedProps(props);
        props = ret[0];
        callPath = ret[1];
        parentCall = callPath[callPath.length - 1];
    }
    if (props == null || isString(props)) {
        propsWithInjection = createObjectExpression([prop]);
    }
    else if (props.type === 14 /* JS_CALL_EXPRESSION */) {
        // merged props... add ours
        // only inject key to object literal if it's the first argument so that
        // if doesn't override user provided keys
        const first = props.arguments[0];
        if (!isString(first) && first.type === 15 /* JS_OBJECT_EXPRESSION */) {
            first.properties.unshift(prop);
        }
        else {
            if (props.callee === TO_HANDLERS) {
                // #2366
                propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
                    createObjectExpression([prop]),
                    props
                ]);
            }
            else {
                props.arguments.unshift(createObjectExpression([prop]));
            }
        }
        !propsWithInjection && (propsWithInjection = props);
    }
    else if (props.type === 15 /* JS_OBJECT_EXPRESSION */) {
        let alreadyExists = false;
        // check existing key to avoid overriding user provided keys
        if (prop.key.type === 4 /* SIMPLE_EXPRESSION */) {
            const propKeyName = prop.key.content;
            alreadyExists = props.properties.some(p => p.key.type === 4 /* SIMPLE_EXPRESSION */ &&
                p.key.content === propKeyName);
        }
        if (!alreadyExists) {
            props.properties.unshift(prop);
        }
        propsWithInjection = props;
    }
    else {
        // single v-bind with expression, return a merged replacement
        propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
            createObjectExpression([prop]),
            props
        ]);
        // in the case of nested helper call, e.g. `normalizeProps(guardReactiveProps(props))`,
        // it will be rewritten as `normalizeProps(mergeProps({ key: 0 }, props))`,
        // the `guardReactiveProps` will no longer be needed
        if (parentCall && parentCall.callee === GUARD_REACTIVE_PROPS) {
            parentCall = callPath[callPath.length - 2];
        }
    }
    if (node.type === 13 /* VNODE_CALL */) {
        if (parentCall) {
            parentCall.arguments[0] = propsWithInjection;
        }
        else {
            node.props = propsWithInjection;
        }
    }
    else {
        if (parentCall) {
            parentCall.arguments[0] = propsWithInjection;
        }
        else {
            node.arguments[2] = propsWithInjection;
        }
    }
}
function getMemoedVNodeCall(node) {
    if (node.type === 14 /* JS_CALL_EXPRESSION */ && node.callee === WITH_MEMO) {
        return node.arguments[1].returns;
    }
    else {
        return node;
    }
}
function makeBlock(node, { helper, removeHelper, inSSR }) {
    if (!node.isBlock) {
        node.isBlock = true;
        removeHelper(getVNodeHelper(inSSR, node.isComponent));
        helper(OPEN_BLOCK);
        helper(getVNodeBlockHelper(inSSR, node.isComponent));
    }
}

// The default decoder only provides escapes for characters reserved as part of
// the template syntax, and is only used if the custom renderer did not provide
// a platform-specific decoder.
const decodeRE = /&(gt|lt|amp|apos|quot);/g;
const decodeMap = {
    gt: '>',
    lt: '<',
    amp: '&',
    apos: "'",
    quot: '"'
};
({
    delimiters: [`{{`, `}}`],
    getNamespace: () => 0 /* HTML */,
    getTextMode: () => 0 /* DATA */,
    isVoidTag: NO,
    isPreTag: NO,
    isCustomElement: NO,
    decodeEntities: (rawText) => rawText.replace(decodeRE, (_, p1) => decodeMap[p1]),
    onError: defaultOnError,
    onWarn: defaultOnWarn,
    comments: (process.env.NODE_ENV !== 'production')
});
function traverseChildren(parent, context) {
    let i = 0;
    const nodeRemoved = () => {
        i--;
    };
    for (; i < parent.children.length; i++) {
        const child = parent.children[i];
        if (isString(child))
            continue;
        context.parent = parent;
        context.childIndex = i;
        context.onNodeRemoved = nodeRemoved;
        traverseNode(child, context);
    }
}
function traverseNode(node, context) {
    context.currentNode = node;
    // apply transform plugins
    const { nodeTransforms } = context;
    const exitFns = [];
    for (let i = 0; i < nodeTransforms.length; i++) {
        const onExit = nodeTransforms[i](node, context);
        if (onExit) {
            if (isArray(onExit)) {
                exitFns.push(...onExit);
            }
            else {
                exitFns.push(onExit);
            }
        }
        if (!context.currentNode) {
            // node was removed
            return;
        }
        else {
            // node may have been replaced
            node = context.currentNode;
        }
    }
    switch (node.type) {
        case 3 /* COMMENT */:
            if (!context.ssr) {
                // inject import for the Comment symbol, which is needed for creating
                // comment nodes with `createVNode`
                context.helper(CREATE_COMMENT);
            }
            break;
        case 5 /* INTERPOLATION */:
            // no need to traverse, but we need to inject toString helper
            if (!context.ssr) {
                context.helper(TO_DISPLAY_STRING);
            }
            break;
        // for container types, further traverse downwards
        case 9 /* IF */:
            for (let i = 0; i < node.branches.length; i++) {
                traverseNode(node.branches[i], context);
            }
            break;
        case 10 /* IF_BRANCH */:
        case 11 /* FOR */:
        case 1 /* ELEMENT */:
        case 0 /* ROOT */:
            traverseChildren(node, context);
            break;
    }
    // exit transforms
    context.currentNode = node;
    let i = exitFns.length;
    while (i--) {
        exitFns[i]();
    }
}
function createStructuralDirectiveTransform(name, fn) {
    const matches = isString(name)
        ? (n) => n === name
        : (n) => name.test(n);
    return (node, context) => {
        if (node.type === 1 /* ELEMENT */) {
            const { props } = node;
            // structural directive transforms are not concerned with slots
            // as they are handled separately in vSlot.ts
            if (node.tagType === 3 /* TEMPLATE */ && props.some(isVSlot)) {
                return;
            }
            const exitFns = [];
            for (let i = 0; i < props.length; i++) {
                const prop = props[i];
                if (prop.type === 7 /* DIRECTIVE */ && matches(prop.name)) {
                    // structural directives are removed to avoid infinite recursion
                    // also we remove them *before* applying so that it can further
                    // traverse itself in case it moves the node around
                    props.splice(i, 1);
                    i--;
                    const onExit = fn(node, prop, context);
                    if (onExit)
                        exitFns.push(onExit);
                }
            }
            return exitFns;
        }
    };
}

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
const prohibitedKeywordRE = new RegExp('\\b' +
    ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
        'super,throw,while,yield,delete,export,import,return,switch,default,' +
        'extends,finally,continue,debugger,function,arguments,typeof,void')
        .split(',')
        .join('\\b|\\b') +
    '\\b');
// strip strings in expressions
const stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
/**
 * Validate a non-prefixed expression.
 * This is only called when using the in-browser runtime compiler since it
 * doesn't prefix expressions.
 */
function validateBrowserExpression(node, context, asParams = false, asRawStatements = false) {
    const exp = node.content;
    // empty expressions are validated per-directive since some directives
    // do allow empty expressions.
    if (!exp.trim()) {
        return;
    }
    try {
        new Function(asRawStatements
            ? ` ${exp} `
            : `return ${asParams ? `(${exp}) => {}` : `(${exp})`}`);
    }
    catch (e) {
        let message = e.message;
        const keywordMatch = exp
            .replace(stripStringRE, '')
            .match(prohibitedKeywordRE);
        if (keywordMatch) {
            message = `avoid using JavaScript keyword as property name: "${keywordMatch[0]}"`;
        }
        context.onError(createCompilerError(44 /* X_INVALID_EXPRESSION */, node.loc, undefined, message));
    }
}

createStructuralDirectiveTransform(/^(if|else|else-if)$/, (node, dir, context) => {
    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
        // #1587: We need to dynamically increment the key based on the current
        // node's sibling nodes, since chained v-if/else branches are
        // rendered at the same depth
        const siblings = context.parent.children;
        let i = siblings.indexOf(ifNode);
        let key = 0;
        while (i-- >= 0) {
            const sibling = siblings[i];
            if (sibling && sibling.type === 9 /* IF */) {
                key += sibling.branches.length;
            }
        }
        // Exit callback. Complete the codegenNode when all children have been
        // transformed.
        return () => {
            if (isRoot) {
                ifNode.codegenNode = createCodegenNodeForBranch(branch, key, context);
            }
            else {
                // attach this branch's codegen node to the v-if root.
                const parentCondition = getParentCondition(ifNode.codegenNode);
                parentCondition.alternate = createCodegenNodeForBranch(branch, key + ifNode.branches.length - 1, context);
            }
        };
    });
});
// target-agnostic transform used for both Client and SSR
function processIf(node, dir, context, processCodegen) {
    if (dir.name !== 'else' &&
        (!dir.exp || !dir.exp.content.trim())) {
        const loc = dir.exp ? dir.exp.loc : node.loc;
        context.onError(createCompilerError(28 /* X_V_IF_NO_EXPRESSION */, dir.loc));
        dir.exp = createSimpleExpression(`true`, false, loc);
    }
    if ((process.env.NODE_ENV !== 'production') && true && dir.exp) {
        validateBrowserExpression(dir.exp, context);
    }
    if (dir.name === 'if') {
        const branch = createIfBranch(node, dir);
        const ifNode = {
            type: 9 /* IF */,
            loc: node.loc,
            branches: [branch]
        };
        context.replaceNode(ifNode);
        if (processCodegen) {
            return processCodegen(ifNode, branch, true);
        }
    }
    else {
        // locate the adjacent v-if
        const siblings = context.parent.children;
        const comments = [];
        let i = siblings.indexOf(node);
        while (i-- >= -1) {
            const sibling = siblings[i];
            if ((process.env.NODE_ENV !== 'production') && sibling && sibling.type === 3 /* COMMENT */) {
                context.removeNode(sibling);
                comments.unshift(sibling);
                continue;
            }
            if (sibling &&
                sibling.type === 2 /* TEXT */ &&
                !sibling.content.trim().length) {
                context.removeNode(sibling);
                continue;
            }
            if (sibling && sibling.type === 9 /* IF */) {
                // Check if v-else was followed by v-else-if
                if (dir.name === 'else-if' &&
                    sibling.branches[sibling.branches.length - 1].condition === undefined) {
                    context.onError(createCompilerError(30 /* X_V_ELSE_NO_ADJACENT_IF */, node.loc));
                }
                // move the node to the if node's branches
                context.removeNode();
                const branch = createIfBranch(node, dir);
                if ((process.env.NODE_ENV !== 'production') &&
                    comments.length &&
                    // #3619 ignore comments if the v-if is direct child of <transition>
                    !(context.parent &&
                        context.parent.type === 1 /* ELEMENT */ &&
                        isBuiltInType(context.parent.tag, 'transition'))) {
                    branch.children = [...comments, ...branch.children];
                }
                // check if user is forcing same key on different branches
                if ((process.env.NODE_ENV !== 'production') || !true) {
                    const key = branch.userKey;
                    if (key) {
                        sibling.branches.forEach(({ userKey }) => {
                            if (isSameKey(userKey, key)) {
                                context.onError(createCompilerError(29 /* X_V_IF_SAME_KEY */, branch.userKey.loc));
                            }
                        });
                    }
                }
                sibling.branches.push(branch);
                const onExit = processCodegen && processCodegen(sibling, branch, false);
                // since the branch was removed, it will not be traversed.
                // make sure to traverse here.
                traverseNode(branch, context);
                // call on exit
                if (onExit)
                    onExit();
                // make sure to reset currentNode after traversal to indicate this
                // node has been removed.
                context.currentNode = null;
            }
            else {
                context.onError(createCompilerError(30 /* X_V_ELSE_NO_ADJACENT_IF */, node.loc));
            }
            break;
        }
    }
}
function createIfBranch(node, dir) {
    return {
        type: 10 /* IF_BRANCH */,
        loc: node.loc,
        condition: dir.name === 'else' ? undefined : dir.exp,
        children: node.tagType === 3 /* TEMPLATE */ && !findDir(node, 'for')
            ? node.children
            : [node],
        userKey: findProp(node, `key`)
    };
}
function createCodegenNodeForBranch(branch, keyIndex, context) {
    if (branch.condition) {
        return createConditionalExpression(branch.condition, createChildrenCodegenNode(branch, keyIndex, context), 
        // make sure to pass in asBlock: true so that the comment node call
        // closes the current block.
        createCallExpression(context.helper(CREATE_COMMENT), [
            (process.env.NODE_ENV !== 'production') ? '"v-if"' : '""',
            'true'
        ]));
    }
    else {
        return createChildrenCodegenNode(branch, keyIndex, context);
    }
}
function createChildrenCodegenNode(branch, keyIndex, context) {
    const { helper } = context;
    const keyProperty = createObjectProperty(`key`, createSimpleExpression(`${keyIndex}`, false, locStub, 2 /* CAN_HOIST */));
    const { children } = branch;
    const firstChild = children[0];
    const needFragmentWrapper = children.length !== 1 || firstChild.type !== 1 /* ELEMENT */;
    if (needFragmentWrapper) {
        if (children.length === 1 && firstChild.type === 11 /* FOR */) {
            // optimize away nested fragments when child is a ForNode
            const vnodeCall = firstChild.codegenNode;
            injectProp(vnodeCall, keyProperty, context);
            return vnodeCall;
        }
        else {
            let patchFlag = 64 /* STABLE_FRAGMENT */;
            let patchFlagText = PatchFlagNames[64 /* STABLE_FRAGMENT */];
            // check if the fragment actually contains a single valid child with
            // the rest being comments
            if ((process.env.NODE_ENV !== 'production') &&
                children.filter(c => c.type !== 3 /* COMMENT */).length === 1) {
                patchFlag |= 2048 /* DEV_ROOT_FRAGMENT */;
                patchFlagText += `, ${PatchFlagNames[2048 /* DEV_ROOT_FRAGMENT */]}`;
            }
            return createVNodeCall(context, helper(FRAGMENT), createObjectExpression([keyProperty]), children, patchFlag + ((process.env.NODE_ENV !== 'production') ? ` /* ${patchFlagText} */` : ``), undefined, undefined, true, false, false /* isComponent */, branch.loc);
        }
    }
    else {
        const ret = firstChild.codegenNode;
        const vnodeCall = getMemoedVNodeCall(ret);
        // Change createVNode to createBlock.
        if (vnodeCall.type === 13 /* VNODE_CALL */) {
            makeBlock(vnodeCall, context);
        }
        // inject branch key
        injectProp(vnodeCall, keyProperty, context);
        return ret;
    }
}
function isSameKey(a, b) {
    if (!a || a.type !== b.type) {
        return false;
    }
    if (a.type === 6 /* ATTRIBUTE */) {
        if (a.value.content !== b.value.content) {
            return false;
        }
    }
    else {
        // directive
        const exp = a.exp;
        const branchExp = b.exp;
        if (exp.type !== branchExp.type) {
            return false;
        }
        if (exp.type !== 4 /* SIMPLE_EXPRESSION */ ||
            exp.isStatic !== branchExp.isStatic ||
            exp.content !== branchExp.content) {
            return false;
        }
    }
    return true;
}
function getParentCondition(node) {
    while (true) {
        if (node.type === 19 /* JS_CONDITIONAL_EXPRESSION */) {
            if (node.alternate.type === 19 /* JS_CONDITIONAL_EXPRESSION */) {
                node = node.alternate;
            }
            else {
                return node;
            }
        }
        else if (node.type === 20 /* JS_CACHE_EXPRESSION */) {
            node = node.value;
        }
    }
}

createStructuralDirectiveTransform('for', (node, dir, context) => {
    const { helper, removeHelper } = context;
    return processFor(node, dir, context, forNode => {
        // create the loop render function expression now, and add the
        // iterator on exit after all children have been traversed
        const renderExp = createCallExpression(helper(RENDER_LIST), [
            forNode.source
        ]);
        const memo = findDir(node, 'memo');
        const keyProp = findProp(node, `key`);
        const keyExp = keyProp &&
            (keyProp.type === 6 /* ATTRIBUTE */
                ? createSimpleExpression(keyProp.value.content, true)
                : keyProp.exp);
        const keyProperty = keyProp ? createObjectProperty(`key`, keyExp) : null;
        const isStableFragment = forNode.source.type === 4 /* SIMPLE_EXPRESSION */ &&
            forNode.source.constType > 0 /* NOT_CONSTANT */;
        const fragmentFlag = isStableFragment
            ? 64 /* STABLE_FRAGMENT */
            : keyProp
                ? 128 /* KEYED_FRAGMENT */
                : 256 /* UNKEYED_FRAGMENT */;
        forNode.codegenNode = createVNodeCall(context, helper(FRAGMENT), undefined, renderExp, fragmentFlag +
            ((process.env.NODE_ENV !== 'production') ? ` /* ${PatchFlagNames[fragmentFlag]} */` : ``), undefined, undefined, true /* isBlock */, !isStableFragment /* disableTracking */, false /* isComponent */, node.loc);
        return () => {
            // finish the codegen now that all children have been traversed
            let childBlock;
            const isTemplate = isTemplateNode(node);
            const { children } = forNode;
            // check <template v-for> key placement
            if (((process.env.NODE_ENV !== 'production') || !true) && isTemplate) {
                node.children.some(c => {
                    if (c.type === 1 /* ELEMENT */) {
                        const key = findProp(c, 'key');
                        if (key) {
                            context.onError(createCompilerError(33 /* X_V_FOR_TEMPLATE_KEY_PLACEMENT */, key.loc));
                            return true;
                        }
                    }
                });
            }
            const needFragmentWrapper = children.length !== 1 || children[0].type !== 1 /* ELEMENT */;
            const slotOutlet = isSlotOutlet(node)
                ? node
                : isTemplate &&
                    node.children.length === 1 &&
                    isSlotOutlet(node.children[0])
                    ? node.children[0] // api-extractor somehow fails to infer this
                    : null;
            if (slotOutlet) {
                // <slot v-for="..."> or <template v-for="..."><slot/></template>
                childBlock = slotOutlet.codegenNode;
                if (isTemplate && keyProperty) {
                    // <template v-for="..." :key="..."><slot/></template>
                    // we need to inject the key to the renderSlot() call.
                    // the props for renderSlot is passed as the 3rd argument.
                    injectProp(childBlock, keyProperty, context);
                }
            }
            else if (needFragmentWrapper) {
                // <template v-for="..."> with text or multi-elements
                // should generate a fragment block for each loop
                childBlock = createVNodeCall(context, helper(FRAGMENT), keyProperty ? createObjectExpression([keyProperty]) : undefined, node.children, 64 /* STABLE_FRAGMENT */ +
                    ((process.env.NODE_ENV !== 'production')
                        ? ` /* ${PatchFlagNames[64 /* STABLE_FRAGMENT */]} */`
                        : ``), undefined, undefined, true, undefined, false /* isComponent */);
            }
            else {
                // Normal element v-for. Directly use the child's codegenNode
                // but mark it as a block.
                childBlock = children[0]
                    .codegenNode;
                if (isTemplate && keyProperty) {
                    injectProp(childBlock, keyProperty, context);
                }
                if (childBlock.isBlock !== !isStableFragment) {
                    if (childBlock.isBlock) {
                        // switch from block to vnode
                        removeHelper(OPEN_BLOCK);
                        removeHelper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
                    }
                    else {
                        // switch from vnode to block
                        removeHelper(getVNodeHelper(context.inSSR, childBlock.isComponent));
                    }
                }
                childBlock.isBlock = !isStableFragment;
                if (childBlock.isBlock) {
                    helper(OPEN_BLOCK);
                    helper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
                }
                else {
                    helper(getVNodeHelper(context.inSSR, childBlock.isComponent));
                }
            }
            if (memo) {
                const loop = createFunctionExpression(createForLoopParams(forNode.parseResult, [
                    createSimpleExpression(`_cached`)
                ]));
                loop.body = createBlockStatement([
                    createCompoundExpression([`const _memo = (`, memo.exp, `)`]),
                    createCompoundExpression([
                        `if (_cached`,
                        ...(keyExp ? [` && _cached.key === `, keyExp] : []),
                        ` && ${context.helperString(IS_MEMO_SAME)}(_cached, _memo)) return _cached`
                    ]),
                    createCompoundExpression([`const _item = `, childBlock]),
                    createSimpleExpression(`_item.memo = _memo`),
                    createSimpleExpression(`return _item`)
                ]);
                renderExp.arguments.push(loop, createSimpleExpression(`_cache`), createSimpleExpression(String(context.cached++)));
            }
            else {
                renderExp.arguments.push(createFunctionExpression(createForLoopParams(forNode.parseResult), childBlock, true /* force newline */));
            }
        };
    });
});
// target-agnostic transform used for both Client and SSR
function processFor(node, dir, context, processCodegen) {
    if (!dir.exp) {
        context.onError(createCompilerError(31 /* X_V_FOR_NO_EXPRESSION */, dir.loc));
        return;
    }
    const parseResult = parseForExpression(
    // can only be simple expression because vFor transform is applied
    // before expression transform.
    dir.exp, context);
    if (!parseResult) {
        context.onError(createCompilerError(32 /* X_V_FOR_MALFORMED_EXPRESSION */, dir.loc));
        return;
    }
    const { addIdentifiers, removeIdentifiers, scopes } = context;
    const { source, value, key, index } = parseResult;
    const forNode = {
        type: 11 /* FOR */,
        loc: dir.loc,
        source,
        valueAlias: value,
        keyAlias: key,
        objectIndexAlias: index,
        parseResult,
        children: isTemplateNode(node) ? node.children : [node]
    };
    context.replaceNode(forNode);
    // bookkeeping
    scopes.vFor++;
    const onExit = processCodegen && processCodegen(forNode);
    return () => {
        scopes.vFor--;
        if (onExit)
            onExit();
    };
}
const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
// This regex doesn't cover the case if key or index aliases have destructuring,
// but those do not make sense in the first place, so this works in practice.
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
        index: undefined
    };
    if ((process.env.NODE_ENV !== 'production') && true) {
        validateBrowserExpression(result.source, context);
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
            if ((process.env.NODE_ENV !== 'production') && true) {
                validateBrowserExpression(result.key, context, true);
            }
        }
        if (iteratorMatch[2]) {
            const indexContent = iteratorMatch[2].trim();
            if (indexContent) {
                result.index = createAliasExpression(loc, indexContent, exp.indexOf(indexContent, result.key
                    ? keyOffset + keyContent.length
                    : trimmedOffset + valueContent.length));
                if ((process.env.NODE_ENV !== 'production') && true) {
                    validateBrowserExpression(result.index, context, true);
                }
            }
        }
    }
    if (valueContent) {
        result.value = createAliasExpression(loc, valueContent, trimmedOffset);
        if ((process.env.NODE_ENV !== 'production') && true) {
            validateBrowserExpression(result.value, context, true);
        }
    }
    return result;
}
function createAliasExpression(range, content, offset) {
    return createSimpleExpression(content, false, getInnerRange(range, offset, content.length));
}
function createForLoopParams({ value, key, index }, memoArgs = []) {
    return createParamsList([value, key, index, ...memoArgs]);
}
function createParamsList(args) {
    let i = args.length;
    while (i--) {
        if (args[i])
            break;
    }
    return args
        .slice(0, i + 1)
        .map((arg, i) => arg || createSimpleExpression(`_`.repeat(i + 1), false));
}

(process.env.NODE_ENV !== 'production')
    ? Object.freeze({})
    : {};
(process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];

function transformRef(node, context) {
    if (!uniCliShared.isUserComponent(node, context)) {
        return;
    }
    addVueRef(node, context);
}
function addVueRef(node, context) {
    // 仅配置了 ref 属性的，才需要增补 vue-ref
    const refProp = findProp(node, 'ref');
    if (!refProp) {
        return;
    }
    const dataRef = 'data-' +
        (context.inVFor
            ? uniCliShared.VUE_REF_IN_FOR
            : uniCliShared.VUE_REF);
    if (refProp.type === 6 /* ATTRIBUTE */) {
        refProp.name = dataRef;
    }
    else {
        refProp.arg.content = dataRef;
    }
    const { props } = node;
    props.splice(props.indexOf(refProp), 0, uniCliShared.createAttributeNode('ref', '__r'));
}

const projectConfigFilename = 'mini.project.json';
const miniProgram = {
    class: {
        array: false,
    },
    slot: {
        $slots: true,
        fallback: true,
    },
    directive: 'a:',
};
const nodeTransforms = [
    transformRef,
    uniCliShared.createTransformComponentLink(uniCliShared.COMPONENT_ON_LINK, 6 /* ATTRIBUTE */),
];
const options = {
    vite: {
        inject: {
            uni: [path__default["default"].resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default["default"].resolve(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {
            assets: ['mycomponents'],
        },
    },
    global: 'my',
    app: {
        darkmode: false,
        subpackages: true,
    },
    project: {
        filename: projectConfigFilename,
        source,
    },
    template: Object.assign(Object.assign({}, miniProgram), { filter: {
            extname: '.sjs',
            lang: 'sjs',
            generate(filter, filename) {
                if (filename) {
                    return `<sjs src="${filename}.sjs" module="${filter.name}"/>`;
                }
                return `<sjs module="${filter.name}">
${filter.code}
</sjs>`;
            },
        }, extname: '.axml', compilerOptions: {
            nodeTransforms,
        } }),
    style: {
        extname: '.acss',
    },
};

const uniMiniProgramAlipayPlugin = {
    name: 'vite:uni-mp-alipay',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: false,
            },
            build: {
                assetsInlineLimit: 0,
            },
        };
    },
};
var index = [uniMiniProgramAlipayPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
