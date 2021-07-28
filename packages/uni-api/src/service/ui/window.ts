import {
  API_ON_WINDOW_RESIZE,
  API_TYPE_ON_WINDOW_RESIZE,
  API_OFF_WINDOW_RESIZE,
  API_TYPE_OFF_WINDOW_RESIZE,
} from '../../protocols/ui/window'
import { defineOnApi, defineOffApi } from '../../helpers/api'

/**
 * 监听窗口大小变化
 */
export const onWindowResize = defineOnApi<API_TYPE_ON_WINDOW_RESIZE>(
  API_ON_WINDOW_RESIZE,
  () => {
    // 生命周期包括onResize，框架直接监听resize
    // window.addEventListener('resize', onResize)
  }
)
/**
 * 取消监听窗口大小变化
 */
export const offWindowResize = defineOffApi<API_TYPE_OFF_WINDOW_RESIZE>(
  API_OFF_WINDOW_RESIZE,
  () => {
    // window.removeEventListener('resize', onResize)
  }
)
