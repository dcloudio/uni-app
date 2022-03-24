Promise.resolve().then(() => {
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
