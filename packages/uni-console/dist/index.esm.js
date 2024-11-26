const SOCKET_HOSTS = __UNI_SOCKET_HOSTS__; // 日志通道IP列表，需要尝试哪一个
const SOCKET_PORT = __UNI_SOCKET_PORT__; // 日志通道端口
const SOCKET_ID = __UNI_SOCKET_ID__; // 日志通道ID
const hasRuntimeSocket = SOCKET_HOSTS && SOCKET_PORT && SOCKET_ID;
function initRuntimeSocket() {
    if (!hasRuntimeSocket)
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
                reject(null);
            },
        });
        socket.onOpen((e) => {
            // console.log(`socket 连接成功: ${host}`, e)
            resolve(socket);
        });
        socket.onClose((e) => {
            // console.error(`socket 连接关闭: ${host}`, e)
            reject(null);
        });
        socket.onError((e) => {
            // console.error(`socket 连接失败: ${host}`, e)
            reject(null);
        });
    });
}

const CONSOLE_TYPES = ['log', 'warn', 'error', 'info', 'debug'];
let send = null;
function setSend(value) {
    send = value;
    if (value != null) {
        value(messageQueue);
    }
}
const messageQueue = [];
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
            const message = formatMessage(type, args);
            if (send == null) {
                messageQueue.push(message);
                return;
            }
            send(message);
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
        message: args.map((arg) => JSON.stringify(arg)).join(' '),
    };
}

function initConsole() {
    if (!hasRuntimeSocket)
        return Promise.resolve(false);
    const restoreConsole = rewriteConsole();
    return initRuntimeSocket().then((socket) => {
        if (!socket) {
            restoreConsole();
            console.error('开发模式下日志通道建立连接失败');
            return false;
        }
        setSend((msgs) => {
            socket.send({
                data: {
                    type: 'console',
                    data: msgs,
                },
            });
        });
        return true;
    });
}
initConsole();

export { initConsole };
