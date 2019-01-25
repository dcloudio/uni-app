const callbacks = []

var tasks = []

function onResize () {
  tasks.push(setTimeout(() => {
    tasks.forEach(task => clearTimeout(task))

    const {
      invokeCallbackHandler: invoke
    } = UniServiceJSBridge
    const {
      windowWidth,
      windowHeight,
      screenWidth,
      screenHeight
    } = uni.getSystemInfoSync()
    var landscape = Math.abs(window.orientation) === 90
    var deviceOrientation = landscape ? 'landscape' : 'portrait'

    callbacks.forEach(callbackId => {
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
  }, 10))
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
  // 此处和微信平台一致查询不到去掉最后一个
  callbacks.splice(callbacks.indexOf(callbackId), 1)
  if (!callbacks.length) {
    window.removeEventListener('resize', onResize)
  }
}
