"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructuralDirectiveTransform = exports.createTransformContext = exports.traverseChildren = exports.traverseNode = exports.transform = exports.isVForScope = exports.isVIfScope = exports.isRootScope = void 0;
const shared_1 = require("@vue/shared");
const compiler_core_1 = require("@vue/compiler-core");
const identifier_1 = __importDefault(require("./identifier"));
function isRootScope(scope) {
    return !isVIfScope(scope) && !isVForScope(scope);
}
exports.isRootScope = isRootScope;
function isVIfScope(scope) {
    return !!scope.condition;
}
exports.isVIfScope = isVIfScope;
function isVForScope(scope) {
    return !!scope.source;
}
exports.isVForScope = isVForScope;
function transform(root, options) {
    const context = createTransformContext(root, options);
    traverseNode(root, context);
    return context;
}
exports.transform = transform;
function traverseNode(node, context) {
    context.currentNode = node;
    // apply transform plugins
    const { nodeTransforms } = context;
    const exitFns = [];
    for (let i = 0; i < nodeTransforms.length; i++) {
        const onExit = nodeTransforms[i](node, context);
        if (onExit) {
            if ((0, shared_1.isArray)(onExit)) {
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
            context.helper(compiler_core_1.CREATE_COMMENT);
            break;
        case 5 /* INTERPOLATION */:
            context.helper(compiler_core_1.TO_DISPLAY_STRING);
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
exports.traverseNode = traverseNode;
function traverseChildren(parent, context) {
    let i = 0;
    const nodeRemoved = () => {
        i--;
    };
    for (; i < parent.children.length; i++) {
        const child = parent.children[i];
        if ((0, shared_1.isString)(child))
            continue;
        context.parent = parent;
        context.childIndex = i;
        context.onNodeRemoved = nodeRemoved;
        traverseNode(child, context);
    }
}
exports.traverseChildren = traverseChildren;
function defaultOnError(error) {
    throw error;
}
function defaultOnWarn(msg) {
    console.warn(`[Vue warn] ${msg.message}`);
}
function createTransformContext(root, { isTS = false, inline = false, bindingMetadata = shared_1.EMPTY_OBJ, prefixIdentifiers = false, skipTransformIdentifier = false, nodeTransforms = [], directiveTransforms = {}, isBuiltInComponent = shared_1.NOOP, isCustomElement = shared_1.NOOP, expressionPlugins = [], onError = defaultOnError, onWarn = defaultOnWarn, }) {
    const scope = {
        id: new identifier_1.default(),
        identifiers: [],
        properties: [],
    };
    function createScope(id, initScope) {
        return (0, shared_1.extend)({
            id,
            properties: [],
            get identifiers() {
                return Object.keys(identifiers);
            },
        }, initScope);
    }
    const identifiers = Object.create(null);
    const scopes = [scope];
    const context = {
        // options
        isTS,
        inline,
        bindingMetadata,
        prefixIdentifiers,
        nodeTransforms,
        directiveTransforms,
        expressionPlugins,
        skipTransformIdentifier,
        isBuiltInComponent,
        isCustomElement,
        onError,
        onWarn,
        // state
        parent: null,
        childIndex: 0,
        helpers: new Map(),
        identifiers,
        scope,
        scopes: {
            vFor: 0,
        },
        get currentScope() {
            return scopes[scopes.length - 1];
        },
        currentNode: root,
        // methods
        popScope() {
            return scopes.pop();
        },
        addVIfScope(initScope) {
            const vIfScope = createScope(scopes[scopes.length - 1].id, initScope);
            scopes.push(vIfScope);
            return vIfScope;
        },
        addVForScope(initScope) {
            const vForScope = createScope(new identifier_1.default(), initScope);
            scopes.push(vForScope);
            return vForScope;
        },
        helper(name) {
            const count = context.helpers.get(name) || 0;
            context.helpers.set(name, count + 1);
            return name;
        },
        removeHelper(name) {
            const count = context.helpers.get(name);
            if (count) {
                const currentCount = count - 1;
                if (!currentCount) {
                    context.helpers.delete(name);
                }
                else {
                    context.helpers.set(name, currentCount);
                }
            }
        },
        helperString(name) {
            return `_${compiler_core_1.helperNameMap[context.helper(name)]}`;
        },
        replaceNode(node) {
            context.parent.children[context.childIndex] = context.currentNode = node;
        },
        removeNode(node) {
            if (!context.parent) {
                throw new Error(`Cannot remove root node.`);
            }
            const list = context.parent.children;
            const removalIndex = node
                ? list.indexOf(node)
                : context.currentNode
                    ? context.childIndex
                    : -1;
            /* istanbul ignore if */
            if (removalIndex < 0) {
                throw new Error(`node being removed is not a child of current parent`);
            }
            if (!node || node === context.currentNode) {
                // current node removed
                context.currentNode = null;
                context.onNodeRemoved();
            }
            else {
                // sibling node removed
                if (context.childIndex > removalIndex) {
                    context.childIndex--;
                    context.onNodeRemoved();
                }
            }
            context.parent.children.splice(removalIndex, 1);
        },
        onNodeRemoved: () => { },
        addIdentifiers(exp) {
            if ((0, shared_1.isString)(exp)) {
                addId(exp);
            }
            else if (exp.identifiers) {
                exp.identifiers.forEach(addId);
            }
            else if (exp.type === 4 /* SIMPLE_EXPRESSION */) {
                addId(exp.content);
            }
        },
        removeIdentifiers(exp) {
            if ((0, shared_1.isString)(exp)) {
                removeId(exp);
            }
            else if (exp.identifiers) {
                exp.identifiers.forEach(removeId);
            }
            else if (exp.type === 4 /* SIMPLE_EXPRESSION */) {
                removeId(exp.content);
            }
        },
    };
    function addId(id) {
        const { identifiers } = context;
        if (identifiers[id] === undefined) {
            identifiers[id] = 0;
        }
        identifiers[id]++;
    }
    function removeId(id) {
        context.identifiers[id]--;
    }
    return context;
}
exports.createTransformContext = createTransformContext;
function createStructuralDirectiveTransform(name, fn) {
    const matches = (0, shared_1.isString)(name)
        ? (n) => n === name
        : (n) => name.test(n);
    return (node, context) => {
        if (node.type === 1 /* ELEMENT */) {
            const { props } = node;
            // structural directive transforms are not concerned with slots
            // as they are handled separately in vSlot.ts
            if (node.tagType === 3 /* TEMPLATE */ && props.some(compiler_core_1.isVSlot)) {
                return;
            }
            const exitFns = [];
            for (let i = 0; i < props.length; i++) {
                const prop = props[i];
                if (prop.type === 7 /* DIRECTIVE */ && matches(prop.name)) {
                    // structural directives are removed to avoid infinite recursion
                    // also we remove them *before* applying so that it can further
                    // traverse itself in case it moves the node around
                    // props.splice(i, 1)
                    // i--
                    const onExit = fn(node, prop, context);
                    if (onExit)
                        exitFns.push(onExit);
                }
            }
            return exitFns;
        }
    };
}
exports.createStructuralDirectiveTransform = createStructuralDirectiveTransform;
