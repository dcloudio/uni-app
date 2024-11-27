let SOCKET_HOSTS = ''; // 日志通道IP列表，需要尝试哪一个
let SOCKET_PORT = ''; // 日志通道端口
let SOCKET_ID = ''; // 日志通道ID
function hasRuntimeSocket() {
    return !!(SOCKET_HOSTS && SOCKET_PORT && SOCKET_ID);
}
function initRuntimeSocket() {
    SOCKET_HOSTS = __UNI_SOCKET_HOSTS__;
    SOCKET_PORT = __UNI_SOCKET_PORT__;
    SOCKET_ID = __UNI_SOCKET_ID__;
    if (!hasRuntimeSocket())
        return Promise.resolve(null);
    const hosts = SOCKET_HOSTS.split(',');
    return hosts.reduce((promise, host) => {
        return promise.then((socket) => {
            if (socket)
                return socket;
            return tryConnectSocket(host);
        });
    }, Promise.resolve(null));
}
function tryConnectSocket(host) {
    return new Promise((resolve, reject) => {
        const socket = uni.connectSocket({
            url: `ws://${host}:${SOCKET_PORT}/${SOCKET_ID}`,
            timeout: 1000,
            fail() {
                resolve(null);
            },
        });
        socket.onOpen((e) => {
            // console.log(`socket 连接成功: ${host}`, e)
            resolve(socket);
        });
        socket.onClose((e) => {
            // console.error(`socket 连接关闭: ${host}`, e)
            resolve(null);
        });
        socket.onError((e) => {
            // console.error(`socket 连接失败: ${host}`, e)
            resolve(null);
        });
    });
}

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
function rewriteConsole() {
    // 保存原始控制台方法的副本
    const originalMethods = CONSOLE_TYPES.reduce((methods, type) => {
        methods[type] = console[type].bind(console);
        return methods;
    }, {});
    function wrapConsole(type) {
        return function (...args) {
            // 使用保存的原始方法输出到控制台
            originalMethods[type](...args);
            sendConsoleMessages([formatMessage(type, args)]);
        };
    }
    CONSOLE_TYPES.forEach((type) => {
        console[type] = wrapConsole(type);
    });
    return function restoreConsole() {
        CONSOLE_TYPES.forEach((type) => {
            console[type] = originalMethods[type];
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
        sendErrorMessages([error]);
    }
    // TODO 是否需要监听 uni.onUnhandledRejection？
    if (typeof uni.onError === 'function') {
        uni.onError(onError);
    }
    return function offError() {
        if (typeof uni.offError === 'function') {
            // @ts-expect-error
            uni.offError(onError);
        }
    };
}

function initRuntimeSocketService() {
    if (!hasRuntimeSocket)
        return Promise.resolve(false);
    const restoreError = initOnError();
    const restoreConsole = rewriteConsole();
    return initRuntimeSocket().then((socket) => {
        if (!socket) {
            restoreError();
            restoreConsole();
            console.error('开发模式下日志通道建立连接失败');
            return false;
        }
        setSendConsole((data) => {
            socket.send({
                data,
            });
        });
        setSendError((data) => {
            socket.send({
                data,
            });
        });
        return true;
    });
}
initRuntimeSocketService();

export { initRuntimeSocketService };
