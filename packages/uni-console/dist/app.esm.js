function currentPageCaptureScreenshot(fullPage, callback) {
    var _a;
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    (_a = currentPage.vm) === null || _a === void 0 ? void 0 : _a.$viewToTempFilePath({
        wholeContent: fullPage,
        overwrite: true,
        success: (res) => {
            const fileManager = uni.getFileSystemManager();
            // @ts-expect-error
            fileManager.readFile({
                encoding: 'base64',
                filePath: res.tempFilePath,
                success(readFileRes) {
                    callback(readFileRes.data, '');
                },
                fail(err) {
                    callback('', `captureScreenshot fail: ${JSON.stringify(err)}`);
                },
            });
        },
        fail: (err) => {
            callback('', `captureScreenshot fail: ${JSON.stringify(err)}`);
        },
    });
}

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
        // 接收 hx 消息，处理截屏请求
        socket.onMessage((result) => {
            if (typeof result['data'] == 'string') {
                // @ts-expect-error
                const message = JSON.parse(result['data']);
                if (message['type'] == 'screencap') {
                    const id = message['id'];
                    currentPageCaptureScreenshot(message['fullPage'], (base64, error) => {
                        // @ts-expect-error
                        socket.send({
                            data: JSON.stringify({
                                id,
                                base64,
                                error,
                            }),
                        });
                    });
                }
            }
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
    return Promise.resolve()
        .then(() => {
        return initRuntimeSocket(hosts, port, id).then((socket) => {
            if (socket == null) {
                return false;
            }
            return true;
        });
    })
        .catch(() => {
        return false;
    });
}
initRuntimeSocketService();

export { initRuntimeSocketService };
