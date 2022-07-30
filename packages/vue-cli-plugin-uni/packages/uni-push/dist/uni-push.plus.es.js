// @ts-expect-error
uni.invokePushCallback({
    type: 'enabled',
});
Promise.resolve().then(() => {
    plus.push.setAutoNotification && plus.push.setAutoNotification(false);
    plus.push.getClientInfoAsync((info) => {
        if (info.clientid) {
            // @ts-expect-error
            uni.invokePushCallback({
                type: 'clientId',
                cid: info.clientid,
            });
        }
    }, (res) => {
        // @ts-expect-error
        uni.invokePushCallback({
            type: 'clientId',
            cid: '',
            errMsg: res.code + ': ' + res.message,
        });
    });
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
