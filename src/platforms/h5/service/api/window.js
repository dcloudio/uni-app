const callbacks = []

function onResize () {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  callbacks.forEach(callbackId => {
    const {
      windowWidth,
      windowHeight,
      screenWidth,
      screenHeight
    } = uni.getSystemInfoSync()
    var landscape = typeof window.orientation === 'number' ? Math.abs(window.orientation) === 90 : screenWidth / screenHeight > 1
    var deviceOrientation = landscape ? 'landscape' : 'portrait'

    invoke(callbackId, {
      deviceOrientation,
      size: {
        windowWidth,
        windowHeight,
        screenWidth,
        screenHeight
      }
    })
  })
}
/**
 * 监听窗口大小变化
 * @param {*} callbackId
 */
export function onWindowResize (callbackId) {
  if (!callbacks.length) {
    window.addEventListener('resize', onResize)
  }
  callbacks.push(callbackId)
}
/**
 * 取消监听窗口大小变化
 * @param {*} callbackId
 */
export function offWindowResize (callbackId) {
  var index = callbacks.indexOf(callbackId)
  // 此处和微信平台一致查询不到去掉最后一个
  if (index >= 0) {
    callbacks.splice(index, 1)
  } else {
    callbacks.pop()
  }
  if (!callbacks.length) {
    window.removeEventListener('resize', onResize)
  }
}
