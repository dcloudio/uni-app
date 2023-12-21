import { isPlainObject, hasOwn, extend, capitalize, isString } from 'uni-shared';

let callbackId = 1;
let proxy;
const callbacks = {};
function normalizeArg(arg) {
    if (typeof arg === 'function') {
        // 查找该函数是否已缓存
        const oldId = Object.keys(callbacks).find((id) => callbacks[id] === arg);
        const id = oldId ? parseInt(oldId) : callbackId++;
        callbacks[id] = arg;
        return id;
    }
    else if (isPlainObject(arg)) {
        Object.keys(arg).forEach((name) => {
            arg[name] = normalizeArg(arg[name]);
        });
    }
    return arg;
}
function initUTSInstanceMethod(async, opts, instanceId, proxy) {
    return initProxyFunction(async, opts, instanceId, proxy);
}
function getProxy() {
    if (!proxy) {
        proxy = uni.requireNativePlugin('UTS-Proxy');
    }
    return proxy;
}
function resolveSyncResult(args, res, returnOptions, instanceId, proxy) {
    if ((process.env.NODE_ENV !== 'production')) {
        console.log('uts.invokeSync.result', JSON.stringify([res, returnOptions, instanceId, typeof proxy]));
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
            if (res.params === instanceId && proxy) {
                return proxy;
            }
            if (interfaceDefines[returnOptions.options]) {
                const ProxyClass = initUTSProxyClass(extend({ instanceId: res.params }, interfaceDefines[returnOptions.options]));
                return new ProxyClass();
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
function initProxyFunction(async, { moduleName, moduleType, package: pkg, class: cls, name: propOrMethod, method, companion, params: methodParams, return: returnOptions, errMsg, }, instanceId, proxy) {
    const invokeCallback = ({ id, name, params, keepAlive, }) => {
        const callback = callbacks[id];
        if (callback) {
            callback(...params);
            if (!keepAlive) {
                delete callbacks[id];
            }
        }
        else {
            console.error(`${pkg}${cls}.${propOrMethod} ${name} is not found`);
        }
    };
    const baseArgs = instanceId
        ? {
            moduleName,
            moduleType,
            id: instanceId,
            name: propOrMethod,
            method: methodParams,
        }
        : {
            moduleName,
            moduleType,
            package: pkg,
            class: cls,
            name: method || propOrMethod,
            companion,
            method: methodParams,
        };
    return (...args) => {
        if (errMsg) {
            throw new Error(errMsg);
        }
        const invokeArgs = extend({}, baseArgs, {
            params: args.map((arg) => normalizeArg(arg)),
        });
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
        return resolveSyncResult(invokeArgs, getProxy().invokeSync(invokeArgs, invokeCallback), returnOptions, instanceId, proxy);
    };
}
function initUTSStaticMethod(async, opts) {
    if (opts.main && !opts.method) {
        if (typeof plus !== 'undefined' && plus.os.name === 'iOS') {
            opts.method = 's_' + opts.name;
        }
    }
    return initProxyFunction(async, opts, 0);
}
const initUTSProxyFunction = initUTSStaticMethod;
function parseClassMethodName(name, methods) {
    if (hasOwn(methods, name + 'ByJs')) {
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
function initUTSProxyClass(options) {
    const { moduleName, moduleType, package: pkg, class: cls, methods, props, errMsg, } = options;
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
    let isProxyInterface = false;
    if (isProxyInterfaceOptions(options)) {
        isProxyInterface = true;
        instanceId = options.instanceId;
    }
    else {
        constructorParams = options.constructor.params;
        staticMethods = options.staticMethods;
        staticProps = options.staticProps;
    }
    // iOS 需要为 ByJs 的 class 构造函数（如果包含JSONObject或UTSCallback类型）补充最后一个参数
    if (typeof plus !== 'undefined' && plus.os.name === 'iOS') {
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
                this.__instanceId = initProxyFunction(false, extend({ name: 'constructor', params: constructorParams }, baseOptions), 0).apply(null, params);
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
                    if (!target[name]) {
                        //实例方法
                        name = parseClassMethodName(name, methods);
                        if (hasOwn(methods, name)) {
                            const { async, params, return: returnOptions } = methods[name];
                            target[name] = initUTSInstanceMethod(!!async, extend({
                                name,
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
                                name: name,
                                errMsg,
                            });
                        }
                    }
                    return target[name];
                },
            });
            return proxy;
        }
    };
    const staticMethodCache = {};
    return new Proxy(ProxyClass, {
        get(target, name, receiver) {
            name = parseClassMethodName(name, staticMethods);
            if (hasOwn(staticMethods, name)) {
                if (!staticMethodCache[name]) {
                    const { async, params, return: returnOptions } = staticMethods[name];
                    // 静态方法
                    staticMethodCache[name] = initUTSStaticMethod(!!async, extend({ name, companion: true, params, return: returnOptions }, baseOptions));
                }
                return staticMethodCache[name];
            }
            if (staticProps.includes(name)) {
                // 静态属性
                return invokePropGetter(extend({ name: name, companion: true }, baseOptions));
            }
            return Reflect.get(target, name, receiver);
        },
    });
}
function initUTSPackageName(name, is_uni_modules) {
    if (typeof plus !== 'undefined' && plus.os.name === 'Android') {
        return 'uts.sdk.' + (is_uni_modules ? 'modules.' : '') + name;
    }
    return '';
}
function initUTSIndexClassName(moduleName, is_uni_modules) {
    if (typeof plus === 'undefined') {
        return '';
    }
    return initUTSClassName(moduleName, plus.os.name === 'iOS' ? 'IndexSwift' : 'IndexKt', is_uni_modules);
}
function initUTSClassName(moduleName, className, is_uni_modules) {
    if (typeof plus === 'undefined') {
        return '';
    }
    if (plus.os.name === 'Android') {
        return className;
    }
    if (plus.os.name === 'iOS') {
        return ('UTSSDK' +
            (is_uni_modules ? 'Modules' : '') +
            capitalize(moduleName) +
            capitalize(className));
    }
    return '';
}
const interfaceDefines = {};
function registerUTSInterface(name, define) {
    interfaceDefines[name] = define;
}
const pluginDefines = {};
function registerUTSPlugin(name, define) {
    pluginDefines[name] = define;
}
function requireUTSPlugin(name) {
    const define = pluginDefines[name];
    if (!define) {
        console.error(`${name} is not found`);
    }
    return define;
}

export { initUTSClassName, initUTSIndexClassName, initUTSPackageName, initUTSProxyClass, initUTSProxyFunction, normalizeArg, registerUTSInterface, registerUTSPlugin, requireUTSPlugin };
