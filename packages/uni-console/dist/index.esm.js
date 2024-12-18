const CONSOLE_TYPES = ['log', 'warn', 'error', 'info', 'debug'];
let sendConsole = null;
const messageQueue = [];
function sendConsoleMessages(messages) {
    if (sendConsole == null) {
        messageQueue.push(...messages);
        return;
    }
    sendConsole(JSON.stringify({
        type: 'console',
        data: messages,
    }));
}
function setSendConsole(value) {
    sendConsole = value;
    if (value != null && messageQueue.length > 0) {
        const messages = messageQueue.slice();
        messageQueue.length = 0;
        sendConsoleMessages(messages);
    }
}
const originalConsole = /*@__PURE__*/ CONSOLE_TYPES.reduce((methods, type) => {
    methods[type] = console[type].bind(console);
    return methods;
}, {});
const atFileRegex = /^\s*at\s+[\w/./-]+:\d+$/;
function rewriteConsole() {
    function wrapConsole(type) {
        return function (...args) {
            const originalArgs = [...args];
            if (originalArgs.length) {
                const maybeAtFile = originalArgs[originalArgs.length - 1];
                // 移除最后的 at pages/index/index.uvue:6
                if (typeof maybeAtFile === 'string' && atFileRegex.test(maybeAtFile)) {
                    originalArgs.pop();
                }
            }
            if (__UNI_CONSOLE_KEEP_ORIGINAL__) {
                originalConsole[type](...originalArgs);
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
        // @ts-expect-error
        const oldLog = uni.__f__;
        if (oldLog) {
            // 重写 uni.__f__ 方法，这样的话，仅能打印开发者代码里的日志，其他没有被重写为__f__的日志将无法打印（比如uni-app框架、小程序框架等）
            // @ts-expect-error
            uni.__f__ = function (...args) {
                const [type, filename, ...rest] = args;
                // 原始日志移除 filename
                oldLog(type, '', ...rest);
                sendConsoleMessages([formatMessage(type, [...rest, filename])]);
            };
            return function restoreConsole() {
                // @ts-expect-error
                uni.__f__ = oldLog;
            };
        }
    }
    return function restoreConsole() { };
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
function formatMessage(type, args) {
    try {
        return {
            type,
            args: formatArgs(args),
        };
    }
    catch (e) {
        originalConsole.error(e);
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
    return ARG_FORMATTERS[typeof arg](arg, depth);
}
function formatObject(value, depth) {
    if (value === null) {
        return {
            type: 'null',
        };
    }
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
    return {
        type: 'object',
        value: {
            properties: Object.entries(value).map(([name, value]) => formatObjectProperty(name, value, depth + 1)),
        },
    };
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
    return Object.assign(formatArg(value, depth), {
        name,
    });
}
function formatArrayElement(value, index, depth) {
    return Object.assign(formatArg(value, depth), {
        name: `${index}`,
    });
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
const ARG_FORMATTERS = {
    function(value) {
        return {
            type: 'function',
            value: `function ${value.name}() {}`,
        };
    },
    undefined() {
        return {
            type: 'undefined',
        };
    },
    object(value, depth) {
        return formatObject(value, depth);
    },
    boolean(value) {
        return {
            type: 'boolean',
            value: String(value),
        };
    },
    number(value) {
        return {
            type: 'number',
            value: String(value),
        };
    },
    bigint(value) {
        return {
            type: 'bigint',
            value: String(value),
        };
    },
    string(value) {
        return {
            type: 'string',
            value,
        };
    },
    symbol(value) {
        return {
            type: 'symbol',
            value: value.description,
        };
    },
};

function initRuntimeSocket(hosts, port, id) {
    if (!hosts || !port || !id)
        return Promise.resolve(null);
    return hosts
        .split(',')
        .reduce((promise, host) => {
        return promise.then((socket) => {
            if (socket)
                return socket;
            return tryConnectSocket(host, port, id);
        });
    }, Promise.resolve(null));
}
const SOCKET_TIMEOUT = 500;
function tryConnectSocket(host, port, id) {
    return new Promise((resolve, reject) => {
        const socket = uni.connectSocket({
            url: `ws://${host}:${port}/${id}`,
            // 支付宝小程序 是否开启多实例
            multiple: true,
            fail() {
                resolve(null);
            },
        });
        const timer = setTimeout(() => {
            if (process.env.UNI_DEBUG) {
                originalConsole.log(`uni-app:[${Date.now()}][socket]`, `connect timeout: ${host}`);
            }
            socket.close({
                code: 1006,
                reason: 'connect timeout',
            });
            resolve(null);
        }, SOCKET_TIMEOUT);
        socket.onOpen((e) => {
            if (process.env.UNI_DEBUG) {
                originalConsole.log(`uni-app:[${Date.now()}][socket]`, `connect success: ${host}`, e);
            }
            clearTimeout(timer);
            resolve(socket);
        });
        socket.onClose((e) => {
            if (process.env.UNI_DEBUG) {
                originalConsole.log(`uni-app:[${Date.now()}][socket]`, `connect close: ${host}`, e);
            }
            clearTimeout(timer);
            resolve(null);
        });
        socket.onError((e) => {
            if (process.env.UNI_DEBUG) {
                originalConsole.log(`uni-app:[${Date.now()}][socket]`, `connect error: ${host}`, e);
            }
            clearTimeout(timer);
            resolve(null);
        });
    });
}

let sendError = null;
// App.onError会监听到两类错误，一类是小程序自身抛出的，一类是 vue 的 errorHandler 触发的
// uni.onError 和 App.onError 会同时监听到错误(主要是App.onError监听之前的错误)，所以需要用 Set 来去重
// uni.onError 会在 App.onError 上边同时增加监听，因为要监听 vue 的errorHandler
// 目前 vue 的 errorHandler 仅会callHook('onError')，所以需要把uni.onError的也挂在 App.onError 上
const errorQueue = new Set();
function sendErrorMessages(errors) {
    if (sendError == null) {
        errors.forEach((error) => {
            errorQueue.add(error);
        });
        return;
    }
    sendError(JSON.stringify({
        type: 'error',
        data: errors.map((err) => {
            const isPromiseRejection = err && 'promise' in err && 'reason' in err;
            const prefix = isPromiseRejection ? 'UnhandledPromiseRejection: ' : '';
            if (isPromiseRejection) {
                err = err.reason;
            }
            if (err instanceof Error && err.stack) {
                return prefix + err.stack;
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
        }),
    }));
}
function setSendError(value) {
    sendError = value;
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
            if (__UNI_CONSOLE_KEEP_ORIGINAL__) {
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

function initRuntimeSocketService() {
    const hosts = __UNI_SOCKET_HOSTS__;
    const port = __UNI_SOCKET_PORT__;
    const id = __UNI_SOCKET_ID__;
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
                originalConsole.error(`开发模式下日志通道建立 socket 连接失败。
如果是小程序平台，请勾选不校验合法域名配置。
如果是运行到真机，请确认手机与电脑处于同一网络。`);
                return false;
            }
            socket.onClose(() => {
                if (process.env.UNI_DEBUG) {
                    originalConsole.log(`uni-app:[${Date.now()}][socket]`, 'connect close and restore');
                }
                originalConsole.error('开发模式下日志通道 socket 连接关闭，请在 HBuilderX 中重新运行。');
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
initRuntimeSocketService();

export { initRuntimeSocketService };
