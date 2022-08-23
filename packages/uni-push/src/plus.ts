import { initPushNotification } from './route'

// @ts-expect-error
uni.invokePushCallback({
  type: 'enabled',
  offline: true,
})
Promise.resolve().then(() => {
  initPushNotification()
  plus.push.setAutoNotification && plus.push.setAutoNotification(false)
  plus.push.addEventListener('receive', (result) => {
    // @ts-expect-error
    uni.invokePushCallback({
      type: 'pushMsg',
      message: result,
    })
  })
})
