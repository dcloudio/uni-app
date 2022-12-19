"use strict";
exports.__esModule = true;
exports.initUtsClassName = exports.initUtsIndexClassName = exports.initUtsPackageName = exports.initUtsProxyClass = exports.initUtsProxyFunction = exports.normalizeArg = void 0;
var utils_1 = require("./utils");
var callbackId = 1;
var proxy;
var callbacks = {};
function normalizeArg(arg) {
    if (typeof arg === 'function') {
        // 查找该函数是否已缓存
        var oldId = Object.keys(callbacks).find(function (id) { return callbacks[id] === arg; });
        var id = oldId ? parseInt(oldId) : callbackId++;
        callbacks[id] = arg;
        return id;
    }
    else if ((0, utils_1.isPlainObject)(arg)) {
        Object.keys(arg).forEach(function (name) {
            ;
            arg[name] = normalizeArg(arg[name]);
        });
    }
    return arg;
}
exports.normalizeArg = normalizeArg;
function initUtsInstanceMethod(async, opts, instanceId) {
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
    return resolveSyncResult(getProxy().invokeSync(args, function () { }));
}
function initProxyFunction(async, _a, instanceId) {
    var pkg = _a.package, cls = _a["class"], propOrMethod = _a.name, method = _a.method, companion = _a.companion, methodParams = _a.params, errMsg = _a.errMsg;
    var invokeCallback = function (_a) {
        var id = _a.id, name = _a.name, params = _a.params, keepAlive = _a.keepAlive;
        var callback = callbacks[id];
        if (callback) {
            callback.apply(void 0, params);
            if (!keepAlive) {
                delete callbacks[id];
            }
        }
        else {
            console.error("".concat(pkg).concat(cls, ".").concat(propOrMethod, " ").concat(name, " is not found"));
        }
    };
    var baseArgs = instanceId
        ? { id: instanceId, name: propOrMethod, method: methodParams }
        : {
            package: pkg,
            "class": cls,
            name: method || propOrMethod,
            companion: companion,
            method: methodParams
        };
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (errMsg) {
            throw new Error(errMsg);
        }
        var invokeArgs = (0, utils_1.extend)({}, baseArgs, {
            params: args.map(function (arg) { return normalizeArg(arg); })
        });
        if (async) {
            return new Promise(function (resolve, reject) {
                getProxy().invokeAsync(invokeArgs, function (res) {
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
function initUtsStaticMethod(async, opts) {
    if (opts.main && !opts.method) {
        if (typeof plus !== 'undefined' && plus.os.name === 'iOS') {
            opts.method = 's_' + opts.name;
        }
    }
    return initProxyFunction(async, opts, 0);
}
exports.initUtsProxyFunction = initUtsStaticMethod;
function initUtsProxyClass(_a) {
    var pkg = _a.package, cls = _a["class"], constructorParams = _a.constructor.params, methods = _a.methods, props = _a.props, staticProps = _a.staticProps, staticMethods = _a.staticMethods, errMsg = _a.errMsg;
    var baseOptions = {
        package: pkg,
        "class": cls,
        errMsg: errMsg
    };
    var ProxyClass = /** @class */ (function () {
        function UtsClass() {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            if (errMsg) {
                throw new Error(errMsg);
            }
            var target = {};
            // 初始化实例 ID
            var instanceId = initProxyFunction(false, (0, utils_1.extend)({ name: 'constructor', params: constructorParams }, baseOptions), 0).apply(null, params);
            if (!instanceId) {
                throw new Error("new ".concat(cls, " is failed"));
            }
            return new Proxy(this, {
                get: function (_, name) {
                    if (!target[name]) {
                        //实例方法
                        if ((0, utils_1.hasOwn)(methods, name)) {
                            var _a = methods[name], async = _a.async, params_1 = _a.params;
                            target[name] = initUtsInstanceMethod(!!async, (0, utils_1.extend)({
                                name: name,
                                params: params_1
                            }, baseOptions), instanceId);
                        }
                        else if (props.includes(name)) {
                            // 实例属性
                            return invokePropGetter({
                                id: instanceId,
                                name: name,
                                errMsg: errMsg
                            });
                        }
                    }
                    return target[name];
                }
            });
        }
        return UtsClass;
    }());
    var staticMethodCache = {};
    return new Proxy(ProxyClass, {
        get: function (target, name, receiver) {
            if ((0, utils_1.hasOwn)(staticMethods, name)) {
                if (!staticMethodCache[name]) {
                    var _a = staticMethods[name], async = _a.async, params = _a.params;
                    // 静态方法
                    staticMethodCache[name] = initUtsStaticMethod(!!async, (0, utils_1.extend)({ name: name, companion: true, params: params }, baseOptions));
                }
                return staticMethodCache[name];
            }
            if (staticProps.includes(name)) {
                // 静态属性
                return invokePropGetter((0, utils_1.extend)({ name: name, companion: true }, baseOptions));
            }
            return Reflect.get(target, name, receiver);
        }
    });
}
exports.initUtsProxyClass = initUtsProxyClass;
function initUtsPackageName(name, is_uni_modules) {
    if (typeof plus !== 'undefined' && plus.os.name === 'Android') {
        return 'uts.sdk.' + (is_uni_modules ? 'modules.' : '') + name;
    }
    return '';
}
exports.initUtsPackageName = initUtsPackageName;
function initUtsIndexClassName(moduleName, is_uni_modules) {
    if (typeof plus === 'undefined') {
        return '';
    }
    return initUtsClassName(moduleName, plus.os.name === 'iOS' ? 'IndexSwift' : 'IndexKt', is_uni_modules);
}
exports.initUtsIndexClassName = initUtsIndexClassName;
function initUtsClassName(moduleName, className, is_uni_modules) {
    if (typeof plus === 'undefined') {
        return '';
    }
    if (plus.os.name === 'Android') {
        return className;
    }
    if (plus.os.name === 'iOS') {
        return ('UTSSDK' +
            (is_uni_modules ? 'Modules' : '') +
            (0, utils_1.capitalize)(moduleName) +
            (0, utils_1.capitalize)(className));
    }
    return '';
}
exports.initUtsClassName = initUtsClassName;
