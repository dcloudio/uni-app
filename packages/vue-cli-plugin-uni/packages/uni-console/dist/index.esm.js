/// <reference types="@dcloudio/uni-app-x/types/uni/global" />
function initRuntimeSocket(hosts, port, id) {
    if (hosts == '' || port == '' || id == '')
        return Promise.resolve(null);
    return hosts
        .split(',')
        .reduce((promise, host) => {
        return promise.then((socket) => {
            if (socket != null)
                return Promise.resolve(socket);
            return tryConnectSocket(host, port, id);
        });
    }, Promise.resolve(null));
}
const SOCKET_TIMEOUT = 500;
function tryConnectSocket(host, port, id) {
    return new Promise((resolve, reject) => {
        const socket = uni.connectSocket({
            url: `ws://${host}:${port}/${id}`,
            multiple: true, // 支付宝小程序 是否开启多实例
            fail() {
                resolve(null);
            },
        });
        const timer = setTimeout(() => {
            // @ts-expect-error
            socket.close({
                code: 1006,
                reason: 'connect timeout',
            });
            resolve(null);
        }, SOCKET_TIMEOUT);
        socket.onOpen((e) => {
            clearTimeout(timer);
            resolve(socket);
        });
        socket.onClose((e) => {
            clearTimeout(timer);
            resolve(null);
        });
        socket.onError((e) => {
            clearTimeout(timer);
            resolve(null);
        });
    });
}

const CONSOLE_TYPES = ['log', 'warn', 'error', 'info', 'debug'];
const originalConsole = /*@__PURE__*/ CONSOLE_TYPES.reduce((methods, type) => {
    methods[type] = console[type].bind(console);
    return methods;
}, {});

let sendError = null;
// App.onError会监听到两类错误，一类是小程序自身抛出的，一类是 vue 的 errorHandler 触发的
// uni.onError 和 App.onError 会同时监听到错误(主要是App.onError监听之前的错误)，所以需要用 Set 来去重
// uni.onError 会在 App.onError 上边同时增加监听，因为要监听 vue 的errorHandler
// 目前 vue 的 errorHandler 仅会callHook('onError')，所以需要把uni.onError的也挂在 App.onError 上
const errorQueue = new Set();
const errorExtra = {};
function sendErrorMessages(errors) {
    if (sendError == null) {
        errors.forEach((error) => {
            errorQueue.add(error);
        });
        return;
    }
    const data = errors
        .map((err) => {
        if (typeof err === 'string') {
            return err;
        }
        const isPromiseRejection = err && 'promise' in err && 'reason' in err;
        const prefix = isPromiseRejection ? 'UnhandledPromiseRejection: ' : '';
        if (isPromiseRejection) {
            err = err.reason;
        }
        if (err instanceof Error && err.stack) {
            if (err.message && !err.stack.includes(err.message)) {
                return `${prefix}${err.message}
${err.stack}`;
            }
            return `${prefix}${err.stack}`;
        }
        if (typeof err === 'object' && err !== null) {
            try {
                return prefix + JSON.stringify(err);
            }
            catch (err) {
                return prefix + String(err);
            }
        }
        return prefix + String(err);
    })
        .filter(Boolean);
    if (data.length > 0) {
        sendError(JSON.stringify(Object.assign({
            type: 'error',
            data,
        }, errorExtra)));
    }
}
function setSendError(value, extra = {}) {
    sendError = value;
    Object.assign(errorExtra, extra);
    if (value != null && errorQueue.size > 0) {
        const errors = Array.from(errorQueue);
        errorQueue.clear();
        sendErrorMessages(errors);
    }
}
function initOnError() {
    function onError(error) {
        try {
            // 小红书小程序 socket.send 时，会报错，onError错误信息为：
            // Cannot create property 'errMsg' on string 'taskId'
            // 导致陷入死循环
            if (typeof PromiseRejectionEvent !== 'undefined' &&
                error instanceof PromiseRejectionEvent &&
                error.reason instanceof Error &&
                error.reason.message &&
                error.reason.message.includes(`Cannot create property 'errMsg' on string 'taskId`)) {
                return;
            }
            if (process.env.UNI_CONSOLE_KEEP_ORIGINAL) {
                originalConsole.error(error);
            }
            sendErrorMessages([error]);
        }
        catch (err) {
            originalConsole.error(err);
        }
    }
    if (typeof uni.onError === 'function') {
        uni.onError(onError);
    }
    if (typeof uni.onUnhandledRejection === 'function') {
        uni.onUnhandledRejection(onError);
    }
    return function offError() {
        if (typeof uni.offError === 'function') {
            uni.offError(onError);
        }
        if (typeof uni.offUnhandledRejection === 'function') {
            uni.offUnhandledRejection(onError);
        }
    };
}

function formatMessage(type, args) {
    try {
        return {
            type,
            args: formatArgs(args),
        };
    }
    catch (e) {
        // originalConsole.error(e)
    }
    return {
        type,
        args: [],
    };
}
function formatArgs(args) {
    return args.map((arg) => formatArg(arg));
}
function formatArg(arg, depth = 0) {
    if (depth >= 7) {
        return {
            type: 'object',
            value: '[Maximum depth reached]',
        };
    }
    const type = typeof arg;
    switch (type) {
        case 'string':
            return formatString(arg);
        case 'number':
            return formatNumber(arg);
        case 'boolean':
            return formatBoolean(arg);
        case 'object':
            try {
                // 鸿蒙里边 object 可能包含 nativePtr 指针，该指针 typeof 是 object
                // 但是又不能访问上边的任意属性，否则会报：TypeError: Can not get Prototype on non ECMA Object
                // 所以这里需要捕获异常，防止报错
                return formatObject(arg, depth);
            }
            catch (e) {
                return {
                    type: 'object',
                    value: {
                        properties: [],
                    },
                };
            }
        case 'undefined':
            return formatUndefined();
        case 'function':
            return formatFunction(arg);
        case 'symbol':
            {
                return formatSymbol(arg);
            }
        case 'bigint':
            return formatBigInt(arg);
    }
}
function formatFunction(value) {
    return {
        type: 'function',
        value: `function ${value.name}() {}`,
    };
}
function formatUndefined() {
    return {
        type: 'undefined',
    };
}
function formatBoolean(value) {
    return {
        type: 'boolean',
        value: String(value),
    };
}
function formatNumber(value) {
    return {
        type: 'number',
        value: String(value),
    };
}
function formatBigInt(value) {
    return {
        type: 'bigint',
        value: String(value),
    };
}
function formatString(value) {
    return {
        type: 'string',
        value,
    };
}
function formatSymbol(value) {
    return {
        type: 'symbol',
        value: value.description,
    };
}
function formatObject(value, depth) {
    if (value === null) {
        return {
            type: 'null',
        };
    }
    {
        if (isComponentPublicInstance(value)) {
            return formatComponentPublicInstance(value, depth);
        }
        if (isComponentInternalInstance(value)) {
            return formatComponentInternalInstance(value, depth);
        }
        if (isUniElement(value)) {
            return formatUniElement(value, depth);
        }
        if (isCSSStyleDeclaration(value)) {
            return formatCSSStyleDeclaration(value, depth);
        }
    }
    if (Array.isArray(value)) {
        return {
            type: 'object',
            subType: 'array',
            value: {
                properties: value.map((v, i) => formatArrayElement(v, i, depth + 1)),
            },
        };
    }
    if (value instanceof Set) {
        return {
            type: 'object',
            subType: 'set',
            className: 'Set',
            description: `Set(${value.size})`,
            value: {
                entries: Array.from(value).map((v) => formatSetEntry(v, depth + 1)),
            },
        };
    }
    if (value instanceof Map) {
        return {
            type: 'object',
            subType: 'map',
            className: 'Map',
            description: `Map(${value.size})`,
            value: {
                entries: Array.from(value.entries()).map((v) => formatMapEntry(v, depth + 1)),
            },
        };
    }
    if (value instanceof Promise) {
        return {
            type: 'object',
            subType: 'promise',
            value: {
                properties: [],
            },
        };
    }
    if (value instanceof RegExp) {
        return {
            type: 'object',
            subType: 'regexp',
            value: String(value),
            className: 'Regexp',
        };
    }
    if (value instanceof Date) {
        return {
            type: 'object',
            subType: 'date',
            value: String(value),
            className: 'Date',
        };
    }
    if (value instanceof Error) {
        return {
            type: 'object',
            subType: 'error',
            value: value.message || String(value),
            className: value.name || 'Error',
        };
    }
    let className = undefined;
    {
        const constructor = value.constructor;
        if (constructor) {
            // @ts-expect-error
            if (constructor.get$UTSMetadata$) {
                // @ts-expect-error
                className = constructor.get$UTSMetadata$().name;
            }
        }
    }
    let entries = Object.entries(value);
    if (isHarmonyBuilderParams(value)) {
        entries = entries.filter(([key]) => key !== 'modifier' && key !== 'nodeContent');
    }
    return {
        type: 'object',
        className,
        value: {
            properties: entries.map((entry) => formatObjectProperty(entry[0], entry[1], depth + 1)),
        },
    };
}
function isHarmonyBuilderParams(value) {
    return value.modifier && value.modifier._attribute && value.nodeContent;
}
function isComponentPublicInstance(value) {
    return value.$ && isComponentInternalInstance(value.$);
}
function isComponentInternalInstance(value) {
    return value.type && value.uid != null && value.appContext;
}
function formatComponentPublicInstance(value, depth) {
    return {
        type: 'object',
        className: 'ComponentPublicInstance',
        value: {
            properties: Object.entries(value.$.type).map(([name, value]) => formatObjectProperty(name, value, depth + 1)),
        },
    };
}
function formatComponentInternalInstance(value, depth) {
    return {
        type: 'object',
        className: 'ComponentInternalInstance',
        value: {
            properties: Object.entries(value.type).map(([name, value]) => formatObjectProperty(name, value, depth + 1)),
        },
    };
}
function isUniElement(value) {
    return value.style && value.tagName != null && value.nodeName != null;
}
function formatUniElement(value, depth) {
    return {
        type: 'object',
        // 非 x 没有 UniElement 的概念
        // className: 'UniElement',
        value: {
            properties: Object.entries(value)
                .filter(([name]) => [
                'id',
                'tagName',
                'nodeName',
                'dataset',
                'offsetTop',
                'offsetLeft',
                'style',
            ].includes(name))
                .map(([name, value]) => formatObjectProperty(name, value, depth + 1)),
        },
    };
}
function isCSSStyleDeclaration(value) {
    return (typeof value.getPropertyValue === 'function' &&
        typeof value.setProperty === 'function' &&
        value.$styles);
}
function formatCSSStyleDeclaration(style, depth) {
    return {
        type: 'object',
        value: {
            properties: Object.entries(style.$styles).map(([name, value]) => formatObjectProperty(name, value, depth + 1)),
        },
    };
}
function formatObjectProperty(name, value, depth) {
    const result = formatArg(value, depth);
    result.name = name;
    return result;
}
function formatArrayElement(value, index, depth) {
    const result = formatArg(value, depth);
    result.name = `${index}`;
    return result;
}
function formatSetEntry(value, depth) {
    return {
        value: formatArg(value, depth),
    };
}
function formatMapEntry(value, depth) {
    return {
        key: formatArg(value[0], depth),
        value: formatArg(value[1], depth),
    };
}

let sendConsole = null;
const messageQueue = [];
const messageExtra = {};
const EXCEPTION_BEGIN_MARK = '---BEGIN:EXCEPTION---';
const EXCEPTION_END_MARK = '---END:EXCEPTION---';
function sendConsoleMessages(messages) {
    if (sendConsole == null) {
        messageQueue.push(...messages);
        return;
    }
    sendConsole(JSON.stringify(Object.assign({
        type: 'console',
        data: messages,
    }, messageExtra)));
}
function setSendConsole(value, extra = {}) {
    sendConsole = value;
    Object.assign(messageExtra, extra);
    if (value != null && messageQueue.length > 0) {
        const messages = messageQueue.slice();
        messageQueue.length = 0;
        sendConsoleMessages(messages);
    }
}
const atFileRegex = /^\s*at\s+[\w/./-]+:\d+$/;
function rewriteConsole() {
    function wrapConsole(type) {
        return function (...args) {
            if (process.env.UNI_CONSOLE_KEEP_ORIGINAL) {
                const originalArgs = [...args];
                if (originalArgs.length) {
                    const maybeAtFile = originalArgs[originalArgs.length - 1];
                    // 移除最后的 at pages/index/index.uvue:6
                    if (typeof maybeAtFile === 'string' &&
                        atFileRegex.test(maybeAtFile)) {
                        originalArgs.pop();
                    }
                }
                originalConsole[type](...originalArgs);
            }
            if (type === 'error' && args.length === 1) {
                const arg = args[0];
                if (typeof arg === 'string' && arg.startsWith(EXCEPTION_BEGIN_MARK)) {
                    const startIndex = EXCEPTION_BEGIN_MARK.length;
                    const endIndex = arg.length - EXCEPTION_END_MARK.length;
                    sendErrorMessages([arg.slice(startIndex, endIndex)]);
                    return;
                }
                else if (arg instanceof Error) {
                    sendErrorMessages([arg]);
                    return;
                }
            }
            sendConsoleMessages([formatMessage(type, args)]);
        };
    }
    // 百度小程序不允许赋值，所以需要判断是否可写
    if (isConsoleWritable()) {
        CONSOLE_TYPES.forEach((type) => {
            console[type] = wrapConsole(type);
        });
        return function restoreConsole() {
            CONSOLE_TYPES.forEach((type) => {
                console[type] = originalConsole[type];
            });
        };
    }
    else {
        {
            if (typeof uni !== 'undefined' && uni.__f__) {
                const oldLog = uni.__f__;
                if (oldLog) {
                    // 重写 uni.__f__ 方法，这样的话，仅能打印开发者代码里的日志，其他没有被重写为__f__的日志将无法打印（比如uni-app框架、小程序框架等）
                    uni.__f__ = function (...args) {
                        const [type, filename, ...rest] = args;
                        // 原始日志移除 filename
                        oldLog(type, '', ...rest);
                        sendConsoleMessages([formatMessage(type, [...rest, filename])]);
                    };
                    return function restoreConsole() {
                        uni.__f__ = oldLog;
                    };
                }
            }
        }
    }
    return function restoreConsole() {
    };
}
function isConsoleWritable() {
    const value = console.log;
    const sym = Symbol();
    try {
        // @ts-expect-error
        console.log = sym;
    }
    catch (ex) {
        return false;
    }
    // @ts-expect-error
    const isWritable = console.log === sym;
    console.log = value;
    return isWritable;
}

function initRuntimeSocketService() {
    const hosts = process.env.UNI_SOCKET_HOSTS;
    const port = process.env.UNI_SOCKET_PORT;
    const id = process.env.UNI_SOCKET_ID;
    if (!hosts || !port || !id)
        return Promise.resolve(false);
    // 百度小程序需要延迟初始化，不然会存在循环引用问题vendor.js
    const lazy = typeof swan !== 'undefined';
    // 重写需要同步，避免丢失早期日志信息
    let restoreError = lazy ? () => { } : initOnError();
    let restoreConsole = lazy ? () => { } : rewriteConsole();
    // 百度小程序需要异步初始化，不然调用 uni.connectSocket 会循环引入vendor.js
    return Promise.resolve().then(() => {
        if (lazy) {
            restoreError = initOnError();
            restoreConsole = rewriteConsole();
        }
        return initRuntimeSocket(hosts, port, id).then((socket) => {
            if (!socket) {
                restoreError();
                restoreConsole();
                originalConsole.error(wrapError('开发模式下日志通道建立 socket 连接失败。'));
                originalConsole.error(wrapError('如果是运行到真机，请确认手机与电脑处于同一网络。'));
                return false;
            }
            socket.onClose(() => {
                if (process.env.UNI_DEBUG) {
                    originalConsole.log(`uni-app:[${Date.now()}][socket]`, 'connect close and restore');
                }
                // @ts-expect-error
                {
                    originalConsole.error(wrapError('手机端日志通道 socket 连接已断开，请重启基座应用或重新运行。'));
                }
                restoreError();
                restoreConsole();
            });
            setSendConsole((data) => {
                if (process.env.UNI_DEBUG) {
                    originalConsole.log(`uni-app:[${Date.now()}][console]`, data);
                }
                socket.send({
                    data,
                });
            });
            setSendError((data) => {
                if (process.env.UNI_DEBUG) {
                    originalConsole.log(`uni-app:[${Date.now()}][error]`, data);
                }
                socket.send({
                    data,
                });
            });
            return true;
        });
    });
}
const ERROR_CHAR = '\u200C';
function wrapError(error) {
    return `${ERROR_CHAR}${error}${ERROR_CHAR}`;
}
initRuntimeSocketService();

export { initRuntimeSocketService };
