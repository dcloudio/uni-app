import {
  API_ON_WINDOW_RESIZE,
  API_TYPE_ON_WINDOW_RESIZE,
  API_OFF_WINDOW_RESIZE,
  API_TYPE_OFF_WINDOW_RESIZE,
  defineOnApi,
  defineOffApi,
} from '@dcloudio/uni-api'

var tasks: number[] = []

function onResize() {
  tasks.push(
    setTimeout(() => {
      tasks.forEach((task) => clearTimeout(task))
      tasks.length = 0

      const { windowWidth, windowHeight, screenWidth, screenHeight } =
        uni.getSystemInfoSync()
      var landscape = Math.abs(Number(window.orientation)) === 90
      var deviceOrientation = landscape ? 'landscape' : 'portrait'

      UniServiceJSBridge.invokeOnCallback<API_TYPE_ON_WINDOW_RESIZE>(
        API_ON_WINDOW_RESIZE,
        {
          // @ts-ignore
          deviceOrientation,
          size: {
            windowWidth,
            windowHeight,
            screenWidth,
            screenHeight,
          },
        }
      )
    }, 20)
  )
}

/**
 * 监听窗口大小变化
 * @param {*} callbackId
 */
export const onWindowResize = defineOnApi<API_TYPE_ON_WINDOW_RESIZE>(
  API_ON_WINDOW_RESIZE,
  () => {
    window.addEventListener('resize', onResize)
  }
)
/**
 * 取消监听窗口大小变化
 * @param {*} callbackId
 */
export const offWindowResize = defineOffApi<API_TYPE_OFF_WINDOW_RESIZE>(
  API_OFF_WINDOW_RESIZE,
  () => {
    window.removeEventListener('resize', onResize)
  }
)
