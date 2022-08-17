// @ts-expect-error
uni.invokePushCallback({
    type: 'enabled',
    offline: true,
});
Promise.resolve().then(() => {
    plus.push.setAutoNotification && plus.push.setAutoNotification(false);
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
