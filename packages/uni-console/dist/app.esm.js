/// <reference types="@dcloudio/uni-app-x/types/uni/global" />
// 之所以又写了一份，是因为外层的socket，connectSocket的时候必须传入multiple:true
// 但是android又不能传入，目前代码里又不能写条件编译之类的。
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

function initRuntimeSocketService() {
    const hosts = process.env.UNI_SOCKET_HOSTS;
    const port = process.env.UNI_SOCKET_PORT;
    const id = process.env.UNI_SOCKET_ID;
    if (hosts == '' || port == '' || id == '')
        return Promise.resolve(false);
    let socketTask = null;
    let webviewCode = null;
    __registerWebViewUniConsole(() => {
        if (webviewCode == null) {
            try {
                webviewCode = uni
                    .getFileSystemManager()
                    .readFileSync('__uniwebview.js', 'utf-8');
            }
            catch (e) {
                webviewCode = '';
            }
        }
        return webviewCode;
    }, (data) => {
        socketTask?.send({
            data,
        });
    });
    return Promise.resolve().then(() => {
        return initRuntimeSocket(hosts, port, id).then((socket) => {
            if (socket == null) {
                return false;
            }
            socketTask = socket;
            return true;
        });
    });
}
initRuntimeSocketService();

export { initRuntimeSocketService };
