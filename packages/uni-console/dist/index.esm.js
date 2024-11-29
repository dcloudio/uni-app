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
const atFileRegex = /^at\s+[\w/./-]+:\d+$/;
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
            originalConsole[type](...originalArgs);
            sendConsoleMessages([formatMessage(type, args)]);
        };
    }
    CONSOLE_TYPES.forEach((type) => {
        console[type] = wrapConsole(type);
    });
    return function restoreConsole() {
        CONSOLE_TYPES.forEach((type) => {
            console[type] = originalConsole[type];
        });
    };
}
function formatMessage(type, args) {
    return {
        type,
        args: formatArgs(args),
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
            value: value.toString(),
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
            fail() {
                resolve(null);
            },
        });
        const timer = setTimeout(() => {
            if ((process.env.NODE_ENV !== 'production')) {
                originalConsole.log(`uni-app:[${Date.now()}][socket]`, `connect timeout: ${host}`);
            }
            socket.close({
                code: 1006,
                reason: 'connect timeout',
            });
            resolve(null);
        }, SOCKET_TIMEOUT);
        socket.onOpen((e) => {
            if ((process.env.NODE_ENV !== 'production')) {
                originalConsole.log(`uni-app:[${Date.now()}][socket]`, `connect success: ${host}`, e);
            }
            clearTimeout(timer);
            resolve(socket);
        });
        socket.onClose((e) => {
            if ((process.env.NODE_ENV !== 'production')) {
                originalConsole.log(`uni-app:[${Date.now()}][socket]`, `connect close: ${host}`, e);
            }
            clearTimeout(timer);
            resolve(null);
        });
        socket.onError((e) => {
            if ((process.env.NODE_ENV !== 'production')) {
                originalConsole.log(`uni-app:[${Date.now()}][socket]`, `connect error: ${host}`, e);
            }
            clearTimeout(timer);
            resolve(null);
        });
    });
}

let sendError = null;
const errorQueue = [];
function sendErrorMessages(errors) {
    if (sendError == null) {
        errorQueue.push(...errors);
        return;
    }
    sendError(JSON.stringify({ type: 'error', data: errors }));
}
function setSendError(value) {
    sendError = value;
    if (value != null && errorQueue.length > 0) {
        const errors = errorQueue.slice();
        errorQueue.length = 0;
        sendErrorMessages(errors);
    }
}
function initOnError() {
    function onError(error) {
        // 小红书小程序 socket.send 时，会报错，onError错误信息为：
        // Cannot create property 'errMsg' on string 'taskId'
        // 导致陷入死循环
        if (typeof PromiseRejectionEvent !== 'undefined' &&
            error instanceof PromiseRejectionEvent &&
            error.reason instanceof Error &&
            error.reason.message.includes(`Cannot create property 'errMsg' on string 'taskId`)) {
            return;
        }
        if (error instanceof Error && error.stack) {
            sendErrorMessages([error.stack]);
        }
        else {
            sendErrorMessages([String(error)]);
        }
    }
    // TODO 是否需要监听 uni.onUnhandledRejection？
    if (typeof uni.onError === 'function') {
        uni.onError(onError);
    }
    return function offError() {
        if (typeof uni.offError === 'function') {
            uni.offError(onError);
        }
    };
}

function initRuntimeSocketService() {
    const hosts = __UNI_SOCKET_HOSTS__;
    const port = __UNI_SOCKET_PORT__;
    const id = __UNI_SOCKET_ID__;
    if (!hosts || !port || !id)
        return Promise.resolve(false);
    const restoreError = initOnError();
    const restoreConsole = rewriteConsole();
    return initRuntimeSocket(hosts, port, id).then((socket) => {
        if (!socket) {
            restoreError();
            restoreConsole();
            console.error('开发模式下日志通道建立连接失败');
            return false;
        }
        socket.onClose(() => {
            if ((process.env.NODE_ENV !== 'production')) {
                originalConsole.log(`uni-app:[${Date.now()}][socket]`, 'connect close and restore');
            }
            restoreError();
            restoreConsole();
        });
        setSendConsole((data) => {
            if ((process.env.NODE_ENV !== 'production')) {
                originalConsole.log(`uni-app:[${Date.now()}][console]`, data);
            }
            socket.send({
                data,
            });
        });
        setSendError((data) => {
            if ((process.env.NODE_ENV !== 'production')) {
                originalConsole.log(`uni-app:[${Date.now()}][error]`, data);
            }
            socket.send({
                data,
            });
        });
        return true;
    });
}
initRuntimeSocketService();

export { initRuntimeSocketService };
