import { isPlainObject, hasOwn, extend, capitalize } from 'uni-shared';

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
function initUTSInstanceMethod(async, opts, instanceId) {
    return initProxyFunction(async, opts, instanceId);
}
function getProxy() {
    if (!proxy) {
        proxy = uni.requireNativePlugin('UTS-Proxy');
    }
    return proxy;
}
function resolveSyncResult(res) {
    if (res.errMsg) {
        throw new Error(res.errMsg);
    }
    return res.params;
}
function invokePropGetter(args) {
    if (args.errMsg) {
        throw new Error(args.errMsg);
    }
    delete args.errMsg;
    return resolveSyncResult(getProxy().invokeSync(args, () => { }));
}
function initProxyFunction(async, { package: pkg, class: cls, name: propOrMethod, method, companion, params: methodParams, errMsg, }, instanceId) {
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
        ? { id: instanceId, name: propOrMethod, method: methodParams }
        : {
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
                getProxy().invokeAsync(invokeArgs, (res) => {
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
        return resolveSyncResult(getProxy().invokeSync(invokeArgs, invokeCallback));
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
function initUTSProxyClass({ package: pkg, class: cls, constructor: { params: constructorParams }, methods, props, staticProps, staticMethods, errMsg, }) {
    const baseOptions = {
        package: pkg,
        class: cls,
        errMsg,
    };
    const ProxyClass = class UTSClass {
        constructor(...params) {
            if (errMsg) {
                throw new Error(errMsg);
            }
            const target = {};
            // 初始化实例 ID
            const instanceId = initProxyFunction(false, extend({ name: 'constructor', params: constructorParams }, baseOptions), 0).apply(null, params);
            if (!instanceId) {
                throw new Error(`new ${cls} is failed`);
            }
            return new Proxy(this, {
                get(_, name) {
                    if (!target[name]) {
                        //实例方法
                        if (hasOwn(methods, name)) {
                            const { async, params } = methods[name];
                            target[name] = initUTSInstanceMethod(!!async, extend({
                                name,
                                params,
                            }, baseOptions), instanceId);
                        }
                        else if (props.includes(name)) {
                            // 实例属性
                            return invokePropGetter({
                                id: instanceId,
                                name: name,
                                errMsg,
                            });
                        }
                    }
                    return target[name];
                },
            });
        }
    };
    const staticMethodCache = {};
    return new Proxy(ProxyClass, {
        get(target, name, receiver) {
            if (hasOwn(staticMethods, name)) {
                if (!staticMethodCache[name]) {
                    const { async, params } = staticMethods[name];
                    // 静态方法
                    staticMethodCache[name] = initUTSStaticMethod(!!async, extend({ name, companion: true, params }, baseOptions));
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

export { initUTSClassName, initUTSIndexClassName, initUTSPackageName, initUTSProxyClass, initUTSProxyFunction, normalizeArg, registerUTSPlugin, requireUTSPlugin };
