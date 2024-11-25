/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, [])).next());
    });
}

const SOCKET_HOSTS = process.env.UNI_SOCKET_HOSTS; // 日志通道IP列表，需要尝试哪一个
const SOCKET_PORT = process.env.UNI_SOCKET_PORT; // 日志通道端口
const SOCKET_ID = process.env.UNI_SOCKET_ID; // 日志通道ID
const hasRuntimeSocket = SOCKET_HOSTS && SOCKET_PORT && SOCKET_ID;
function initRuntimeSocket() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!hasRuntimeSocket)
            return;
        // 同时并发尝试所有，哪个成功，就使用哪个
        return Promise.race(SOCKET_HOSTS.split(',').map((host) => tryConnectSocket(host)));
    });
}
function tryConnectSocket(host) {
    return new Promise((resolve, reject) => {
        const socket = uni.connectSocket({
            url: `ws://${host}:${SOCKET_PORT}/${SOCKET_ID}`,
            success() {
                resolve(socket);
            },
            fail() {
                reject(null);
            },
        });
    });
}

const CONSOLE_TYPES = ['log', 'warn', 'error', 'info', 'debug'];
let send = null;
function setSend(value) {
    send = value;
    if (value != null) {
        const messages = messageQueue.slice();
        messageQueue.length = 0;
        messages.forEach((msg) => {
            value(msg);
        });
    }
}
const messageQueue = [];
function rewriteConsole() {
    const originalConsole = console;
    function wrapConsole(type) {
        return function (...args) {
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
            console[type] = originalConsole[type];
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
    return __awaiter(this, void 0, void 0, function* () {
        if (!hasRuntimeSocket)
            return;
        const restoreConsole = rewriteConsole();
        const socket = yield initRuntimeSocket();
        if (!socket) {
            restoreConsole();
            console.error('开发模式下日志通道连接失败');
            return;
        }
        function send(msg) {
            socket.send({
                data: {
                    type: 'console',
                    data: msg,
                },
            });
        }
        socket.onOpen(() => {
            setSend(send);
        });
        socket.onClose(() => {
            setSend(null);
        });
    });
}
initConsole();

export { initConsole };
