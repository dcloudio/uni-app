function initPushRoute() {
    // @ts-expect-error
    uni.onPushMessage((res) => {
        if (res.data && res.data.path) {
            if (res.type === 'click') {
                const url = res.data.path;
                // 优先使用 navigateTo
                uni.navigateTo({
                    url,
                    fail(result) {
                        // 说明是 tabBar 页面，必须使用 switchTab
                        if (result.errMsg.indexOf('tabbar')) {
                            uni.switchTab({
                                url,
                            });
                        }
                    },
                });
            }
            else if (res.type === 'receive') {
                // 仅 App 端
                if (typeof plus !== 'undefined' && plus.push) {
                    // 创建通知栏，并屏蔽消息的继续传递
                    plus.push.createMessage(res.data.content, JSON.stringify(res.data.payload), {
                        title: res.data.title,
                        path: res.data.path,
                    });
                    // 内部属性，停止传播
                    res.stopped = true;
                }
            }
        }
    });
}

// @ts-expect-error
uni.invokePushCallback({
    type: 'enabled',
});
initPushRoute();
Promise.resolve().then(() => {
    plus.push.setAutoNotification && plus.push.setAutoNotification(false);
    const info = plus.push.getClientInfo();
    if (info.clientid) {
        // @ts-expect-error
        uni.invokePushCallback({
            type: 'clientId',
            cid: info.clientid,
        });
    }
    plus.push.addEventListener('click', (result) => {
        // @ts-expect-error
        uni.invokePushCallback({
            type: 'click',
            message: result,
        });
    });
    plus.push.addEventListener('receive', (result) => {
        // @ts-expect-error
        uni.invokePushCallback({
            type: 'pushMsg',
            message: result,
        });
    });
});
