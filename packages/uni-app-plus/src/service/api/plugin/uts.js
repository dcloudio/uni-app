import { isArray, isPlainObject, hasOwn, extend, capitalize, isString } from 'uni-shared';

// 生成的 uts.js 需要同步到 vue2 src/platforms/app-plus/service/api/plugin
let callbackId = 1;
let proxy;
const keepAliveCallbacks = {};
function isUniElement(obj) {
    return obj && typeof obj.getNodeId === 'function' && obj.pageId;
}
function isComponentPublicInstance(instance) {
    return instance && instance.$ && instance.$.proxy === instance;
}
function parseElement(obj) {
    if (isUniElement(obj)) {
        return obj;
    }
}
function serializeComponentPublicInstance(obj) {
    if (obj.$el) {
        return serializeUniElement(obj.$el, 'ComponentPublicInstance');
    }
    else {
        return { __type__: 'ComponentPublicInstance', pageId: '', nodeId: '' };
    }
}
function serializeArrayBuffer(obj) {
    // @ts-expect-error ios 提供了 ArrayBufferWrapper 类来处理 ArrayBuffer 的传递
    if (typeof ArrayBufferWrapper !== 'undefined') {
        // @ts-expect-error
        return { __type__: 'ArrayBuffer', value: new ArrayBufferWrapper(obj) };
    }
    return { __type__: 'ArrayBuffer', value: obj };
}
// 序列化 UniElement | ComponentPublicInstance
function serializeUniElement(el, type) {
    let nodeId = '';
    let pageId = '';
    // 非 x 可能不存在 getNodeId 方法？
    if (el && el.getNodeId) {
        pageId = el.pageId;
        nodeId = el.getNodeId();
    }
    return { __type__: type, pageId, nodeId };
}
function toRaw(observed) {
    const seen = new WeakSet();
    let current = observed;
    while (current) {
        const raw = current.__v_raw;
        if (!raw) {
            return current;
        }
        if (typeof current === 'object' || typeof current === 'function') {
            if (seen.has(current)) {
                return current;
            }
            seen.add(current);
        }
        current = raw;
    }
    return current;
}
const SKIP_CIRCULAR_REFERENCE = {};
function enterStack(arg, stack) {
    if (stack.has(arg)) {
        return false;
    }
    stack.add(arg);
    return true;
}
function normalizeArg(arg, callbacks, keepAlive, context, stack = new WeakSet()) {
    arg = toRaw(arg);
    const isVaporAndroid = false;
    if (typeof arg === 'function') {
        let id;
        if (keepAlive) {
            // 仅keepAlive时，需要查找缓存，非keepAlive时，直接创建，避免函数被复用时，回调函数被误删
            const oldId = Object.keys(callbacks).find((id) => callbacks[id] === arg);
            id = oldId ? parseInt(oldId) : callbackId++;
            callbacks[id] = arg;
        }
        else {
            id = callbackId++;
            callbacks[id] = arg;
        }
        return id;
    }
    else if (isArray(arg)) {
        if (!enterStack(arg, stack)) {
            return SKIP_CIRCULAR_REFERENCE;
        }
        context.depth++;
        const newArg = new Array(arg.length);
        try {
            arg.forEach((item, index) => {
                const value = normalizeArg(item, callbacks, keepAlive, context, stack);
                if (value !== SKIP_CIRCULAR_REFERENCE) {
                    newArg[index] = value;
                }
            });
            return newArg;
        }
        finally {
            stack.delete(arg);
        }
        // 为啥还要额外判断了isUniElement?，isPlainObject不是包含isUniElement的逻辑吗？为了避免出bug，保留此逻辑
    }
    else if (arg instanceof ArrayBuffer) {
        if (context.depth > 0) {
            context.nested = true;
        }
        return serializeArrayBuffer(arg);
    }
    else if (isPlainObject(arg) || isUniElement(arg)) {
        const uniElement = parseElement(arg);
        if (uniElement) {
            if (context.depth > 0 || isVaporAndroid) {
                context.nested = true;
            }
            return serializeUniElement(uniElement, 'UniElement');
        }
        else if (isComponentPublicInstance(arg)) {
            if (context.depth > 0 || isVaporAndroid) {
                context.nested = true;
            }
            return serializeComponentPublicInstance(arg);
        }
        else {
            // 必须复制，否则会污染原始对象，比如：
            // const obj = {
            //   a: 1,
            //   b: () => {}
            // }
            // const newObj = normalizeArg(obj, {}, false)
            // newObj.a = 2 // 这会污染原始对象 obj
            if (!enterStack(arg, stack)) {
                return SKIP_CIRCULAR_REFERENCE;
            }
            const newArg = {};
            try {
                Object.keys(arg).forEach((name) => {
                    context.depth++;
                    const value = normalizeArg(arg[name], callbacks, keepAlive, context, stack);
                    if (value !== SKIP_CIRCULAR_REFERENCE) {
                        newArg[name] = value;
                    }
                });
                return newArg;
            }
            finally {
                stack.delete(arg);
            }
        }
    }
    return arg;
}
function initUTSInstanceMethod(async, opts, instanceIdOrInstance, proxy) {
    return initProxyFunction('method', async, opts, instanceIdOrInstance, proxy);
}
function getProxy() {
    if (!proxy) {
        {
            proxy = uni.requireNativePlugin('UTS-Proxy');
        }
    }
    return proxy;
}
function resolveSyncResult(args, res, returnOptions, instanceIdOrInstance, proxy) {
    if ((process.env.NODE_ENV !== 'production')) {
        console.log('uts.invokeSync.result', JSON.stringify([res, returnOptions, instanceIdOrInstance, typeof proxy]));
    }
    if (!res) {
        throw new Error('返回值为：' +
            JSON.stringify(res) +
            '；请求参数为：' +
            JSON.stringify(args));
    }
    // devtools 环境是字符串？
    if (isString(res)) {
        try {
            res = JSON.parse(res);
        }
        catch (e) {
            throw new Error(`JSON.parse(${res}): ` + e);
        }
    }
    if (res.errMsg) {
        throw new Error(res.errMsg);
    }
    if (returnOptions) {
        if (returnOptions.type === 'interface' && typeof res.params === 'number') {
            // 返回了 0
            if (!res.params) {
                return null;
            }
            let instanceId = typeof instanceIdOrInstance === 'number'
                ? instanceIdOrInstance
                : undefined;
            if (res.params === instanceId && proxy) {
                return proxy;
            }
            if (interfaceDefines[returnOptions.options]) {
                const ProxyClass = initUTSProxyClass(extend({ instanceId: res.params }, interfaceDefines[returnOptions.options]));
                const result = new ProxyClass();
                return result;
            }
        }
    }
    return res.params;
}
function invokePropGetter(args) {
    if (args.errMsg) {
        throw new Error(args.errMsg);
    }
    delete args.errMsg;
    if ((process.env.NODE_ENV !== 'production')) {
        console.log('uts.invokePropGetter.args', args);
    }
    return resolveSyncResult(args, getProxy().invokeSync(args, () => { }));
}
function initProxyFunction(type, async, { moduleName, moduleType, package: pkg, class: cls, name: methodName, method, companion, keepAlive, params: methodParams, return: returnOptions, errMsg, }, instanceIdOrInstance, proxy) {
    if (!keepAlive) {
        keepAlive =
            (methodName.indexOf('on') === 0 || methodName.indexOf('off') === 0) &&
                methodParams.length === 1 &&
                methodParams[0].type === 'UTSCallback';
    }
    // id: 0为非法instanceId
    const isNumber = typeof instanceIdOrInstance === 'number';
    let instanceId = isNumber ? instanceIdOrInstance : undefined;
    let instance = isNumber ? undefined : instanceIdOrInstance;
    const baseArgs = instanceId
        ? {
            moduleName,
            moduleType,
            id: instanceId,
            type,
            name: methodName,
            method: methodParams,
            nested: false,
            keepAlive,
        }
        : instance
            ? {
                moduleName,
                moduleType,
                ins: instance,
                type,
                name: methodName,
                method: methodParams,
                nested: true,
                keepAlive,
            }
            : {
                moduleName,
                moduleType,
                package: pkg,
                class: cls,
                name: method || methodName,
                type,
                companion,
                method: methodParams,
                nested: false,
                keepAlive,
            };
    return (...args) => {
        if (errMsg) {
            throw new Error(errMsg);
        }
        // TODO 隐患：部分callback可能不会被删除，比如传入了success、fail、complete，但是仅触发了success、complete，那么fail就不会被删除
        // 需要有个机制来知道整个函数已经结束了，需要清理所有相关callbacks
        const callbacks = keepAlive ? keepAliveCallbacks : {};
        const invokeCallback = ({ id, name, params }) => {
            const callback = callbacks[id];
            if (callback) {
                callback(...params);
                if (!keepAlive) {
                    delete callbacks[id];
                }
            }
            else {
                console.error(`uts插件[${moduleName}] ${pkg}${cls}.${methodName.replace('ByJs', '')} ${name}回调函数已释放，不能再次执行，参考文档：https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#keepalive`);
            }
        };
        const context = {
            depth: 0,
            nested: false,
        };
        const invokeArgs = extend({}, baseArgs, {
            params: args.map((arg) => normalizeArg(arg, callbacks, keepAlive, context)),
        });
        invokeArgs.nested = context.nested;
        if (async) {
            return new Promise((resolve, reject) => {
                if ((process.env.NODE_ENV !== 'production')) {
                    console.log('uts.invokeAsync.args', invokeArgs);
                }
                getProxy().invokeAsync(invokeArgs, (res) => {
                    if ((process.env.NODE_ENV !== 'production')) {
                        console.log('uts.invokeAsync.result', res);
                    }
                    if (res.type !== 'return') {
                        invokeCallback(res);
                    }
                    else {
                        if (res.errMsg) {
                            reject(res.errMsg);
                        }
                        else {
                            resolve(res.params);
                        }
                    }
                });
            });
        }
        if ((process.env.NODE_ENV !== 'production')) {
            console.log('uts.invokeSync.args', invokeArgs);
        }
        return resolveSyncResult(invokeArgs, getProxy().invokeSync(invokeArgs, invokeCallback), returnOptions, instanceIdOrInstance, proxy);
    };
}
function initUTSStaticMethod(async, opts) {
    if (opts.main && !opts.method) {
        if (isUTSiOS()) {
            opts.method = 's_' + opts.name;
        }
    }
    return initProxyFunction('method', async, opts, 0);
}
const initUTSProxyFunction = initUTSStaticMethod;
function parseClassMethodName(name, methods) {
    if (typeof name === 'string' && hasOwn(methods, name + 'ByJs')) {
        return name + 'ByJs';
    }
    return name;
}
function isUndefined(value) {
    return typeof value === 'undefined';
}
function isProxyInterfaceOptions(options) {
    return !isUndefined(options.instanceId);
}
function parseClassPropertySetter(name) {
    return '__$set' + capitalize(name);
}
function initUTSProxyClass(options) {
    const { moduleName, moduleType, package: pkg, class: cls, methods, props, setters, errMsg, } = options;
    const baseOptions = {
        moduleName,
        moduleType,
        package: pkg,
        class: cls,
        errMsg,
    };
    let instanceId;
    let constructorParams = [];
    let staticMethods = {};
    let staticProps = [];
    let staticSetters = {};
    let isProxyInterface = false;
    if (isProxyInterfaceOptions(options)) {
        isProxyInterface = true;
        instanceId = options.instanceId;
    }
    else {
        constructorParams = options.constructor.params;
        staticMethods = options.staticMethods;
        staticProps = options.staticProps;
        staticSetters = options.staticSetters;
    }
    // iOS 需要为 ByJs 的 class 构造函数（如果包含JSONObject或UTSCallback类型）补充最后一个参数
    if (isUTSiOS()) {
        if (constructorParams.find((p) => p.type === 'UTSCallback' || p.type.indexOf('JSONObject') > 0)) {
            constructorParams.push({ name: '_byJs', type: 'boolean' });
        }
    }
    const ProxyClass = class UTSClass {
        constructor(...params) {
            this.__instanceId = 0;
            if (errMsg) {
                throw new Error(errMsg);
            }
            const target = {};
            // 初始化实例 ID
            if (!isProxyInterface) {
                // 初始化未指定时，每次都要创建instanceId
                this.__instanceId = initProxyFunction('constructor', false, extend({
                    name: 'constructor',
                    keepAlive: false,
                    params: constructorParams,
                }, baseOptions), 0).apply(null, params);
            }
            else if (typeof instanceId === 'number') {
                this.__instanceId = instanceId;
            }
            if (!this.__instanceId) {
                throw new Error(`new ${cls} is failed`);
            }
            const instance = this;
            const proxy = new Proxy(instance, {
                get(_, name) {
                    // 重要：禁止响应式
                    if (name === '__v_skip') {
                        return true;
                    }
                    if (!target[name]) {
                        //实例方法
                        name = parseClassMethodName(name, methods);
                        if (hasOwn(methods, name)) {
                            const { async, keepAlive, params, return: returnOptions, } = methods[name];
                            target[name] = initUTSInstanceMethod(!!async, extend({
                                name,
                                keepAlive,
                                params,
                                return: returnOptions,
                            }, baseOptions), instance.__instanceId, proxy);
                        }
                        else if (props.includes(name)) {
                            // 实例属性
                            return invokePropGetter({
                                moduleName,
                                moduleType,
                                id: instance.__instanceId,
                                type: 'getter',
                                keepAlive: false,
                                nested: false,
                                name: name,
                                errMsg,
                            });
                        }
                    }
                    return target[name];
                },
                set(_, name, newValue) {
                    if (props.includes(name)) {
                        const setter = parseClassPropertySetter(name);
                        if (!target[setter]) {
                            const param = setters[name];
                            if (param) {
                                target[setter] = initProxyFunction('setter', false, extend({
                                    name: name,
                                    keepAlive: false,
                                    params: [param],
                                }, baseOptions), instance.__instanceId, proxy);
                            }
                        }
                        target[parseClassPropertySetter(name)](newValue);
                        return true;
                    }
                    return false;
                },
            });
            return Object.freeze(proxy);
        }
    };
    const staticPropSetterCache = {};
    const staticMethodCache = {};
    return Object.freeze(new Proxy(ProxyClass, {
        get(target, name, receiver) {
            name = parseClassMethodName(name, staticMethods);
            if (hasOwn(staticMethods, name)) {
                if (!staticMethodCache[name]) {
                    const { async, keepAlive, params, return: returnOptions, } = staticMethods[name];
                    // 静态方法
                    staticMethodCache[name] = initUTSStaticMethod(!!async, extend({
                        name,
                        companion: true,
                        keepAlive,
                        params,
                        return: returnOptions,
                    }, baseOptions));
                }
                return staticMethodCache[name];
            }
            if (staticProps.includes(name)) {
                return invokePropGetter(extend({
                    name: name,
                    companion: true,
                    type: 'getter',
                }, baseOptions));
            }
            return Reflect.get(target, name, receiver);
        },
        set(_, name, newValue) {
            if (staticProps.includes(name)) {
                // 静态属性
                const setter = parseClassPropertySetter(name);
                if (!staticPropSetterCache[setter]) {
                    const param = staticSetters[name];
                    if (param) {
                        staticPropSetterCache[setter] = initProxyFunction('setter', false, extend({
                            name: name,
                            keepAlive: false,
                            params: [param],
                        }, baseOptions), 0);
                    }
                }
                staticPropSetterCache[parseClassPropertySetter(name)](newValue);
                return true;
            }
            return false;
        },
    }));
}
// UniElementImpl基类优先方法列表
const uniElementImplPriorityMethods = [
    'hasAttribute',
    'getAttribute',
    // 'setAttribute',
    // 'removeAttribute',
    'getAnyAttribute',
    // 'setAnyAttribute',
];
let elementClassDefineId = 0;
function initUTSElementProxyClass(options) {
    const { moduleName, moduleType, package: pkg, class: cls, methods, props, setters, errMsg, } = options;
    const baseOptions = {
        moduleName,
        moduleType,
        package: pkg,
        class: cls,
        errMsg,
    };
    const staticMethods = options.staticMethods || {};
    const staticProps = options.staticProps || [];
    const staticSetters = options.staticSetters || {};
    const classId = ++elementClassDefineId;
    const BaseClass = class {
    };
    const ProxyClass = class UTSClass extends BaseClass {
        static [Symbol.hasInstance](instance) {
            return instance && instance.__element_class_id__ === classId;
        }
        // page: UniNativePageImpl
        constructor(nodeId, page, tagName) {
            super(nodeId, page, tagName);
            const pageId = page.pageId;
            const element = { __type__: 'UniElement', pageId, nodeId };
            const target = {};
            const proxy = new Proxy(this, {
                get(_target, name) {
                    // 重要：禁止响应式
                    if (name === '__v_skip') {
                        return true;
                    }
                    if (name === '__element_class_id__') {
                        return classId;
                    }
                    if (uniElementImplPriorityMethods.includes(name) &&
                        name in _target) {
                        return _target[name].bind(_target);
                    }
                    if (!target[name]) {
                        //实例方法
                        if (hasOwn(methods, name)) {
                            const { async, keepAlive, params, return: returnOptions, } = methods[name];
                            target[name] = initUTSInstanceMethod(!!async, extend({
                                name,
                                keepAlive,
                                params,
                                return: returnOptions,
                            }, baseOptions), element, proxy);
                        }
                        else if (props.includes(name)) {
                            // 实例属性
                            return invokePropGetter({
                                moduleName,
                                moduleType,
                                ins: element,
                                type: 'getter',
                                keepAlive: false,
                                nested: true,
                                name: name,
                                errMsg,
                            });
                        }
                    }
                    if (target[name]) {
                        return target[name];
                    }
                    const propOrMethod = _target[name];
                    if (typeof propOrMethod === 'function') {
                        return propOrMethod.bind(_target);
                    }
                    return propOrMethod;
                },
                set(_target, name, newValue) {
                    if (props.includes(name)) {
                        const setter = parseClassPropertySetter(name);
                        if (!target[setter]) {
                            const param = setters[name];
                            if (param) {
                                target[setter] = initProxyFunction('setter', false, extend({
                                    name: name,
                                    keepAlive: false,
                                    params: [param],
                                }, baseOptions), element, proxy);
                            }
                        }
                        target[parseClassPropertySetter(name)](newValue);
                        return true;
                    }
                    _target[name] = newValue;
                    return true;
                },
            });
            return proxy;
        }
    };
    const staticPropSetterCache = {};
    const staticMethodCache = {};
    return Object.freeze(new Proxy(ProxyClass, {
        get(target, name, receiver) {
            name = parseClassMethodName(name, staticMethods);
            if (hasOwn(staticMethods, name)) {
                if (!staticMethodCache[name]) {
                    const { async, keepAlive, params, return: returnOptions, } = staticMethods[name];
                    // 静态方法
                    staticMethodCache[name] = initUTSStaticMethod(!!async, extend({
                        name,
                        companion: true,
                        keepAlive,
                        params,
                        return: returnOptions,
                    }, baseOptions));
                }
                return staticMethodCache[name];
            }
            if (staticProps.includes(name)) {
                return invokePropGetter(extend({
                    name: name,
                    companion: true,
                    type: 'getter',
                }, baseOptions));
            }
            return Reflect.get(target, name, receiver);
        },
        set(_, name, newValue) {
            if (staticProps.includes(name)) {
                // 静态属性
                const setter = parseClassPropertySetter(name);
                if (!staticPropSetterCache[setter]) {
                    const param = staticSetters[name];
                    if (param) {
                        staticPropSetterCache[setter] = initProxyFunction('setter', false, extend({
                            name: name,
                            keepAlive: false,
                            params: [param],
                        }, baseOptions), 0);
                    }
                }
                staticPropSetterCache[parseClassPropertySetter(name)](newValue);
                return true;
            }
            return false;
        },
    }));
}
function isUTSAndroid() {
    return typeof plus !== 'undefined' && plus.os.name === 'Android';
}
function isUTSiOS() {
    return !isUTSAndroid();
}
function initUTSPackageName(name, is_uni_modules) {
    if (isUTSAndroid()) {
        return 'uts.sdk.' + (is_uni_modules ? 'modules.' : '') + name;
    }
    return '';
}
function initUTSIndexClassName(moduleName, is_uni_modules) {
    return initUTSClassName(moduleName, isUTSAndroid() ? 'IndexKt' : 'IndexSwift', is_uni_modules);
}
function initUTSClassName(moduleName, className, is_uni_modules) {
    if (isUTSAndroid()) {
        return className;
    }
    return ('UTSSDK' +
        (is_uni_modules ? 'Modules' : '') +
        capitalize(moduleName) +
        capitalize(className));
}
const interfaceDefines = {};
function registerUTSInterface(name, define) {
    interfaceDefines[name] = define;
}
const pluginDefines = {};
function registerUTSPlugin(name, define) {
    pluginDefines[name] = define;
}
function requireUTSPlugin(name, silent = false) {
    const define = pluginDefines[name];
    if (!define) {
        if (!silent) {
            console.error(`${name} is not found`);
        }
    }
    return define;
}

export { initUTSClassName, initUTSElementProxyClass, initUTSIndexClassName, initUTSPackageName, initUTSProxyClass, initUTSProxyFunction, normalizeArg, registerUTSInterface, registerUTSPlugin, requireUTSPlugin };
