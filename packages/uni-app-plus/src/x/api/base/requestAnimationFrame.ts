import { defineSyncApi } from '@dcloudio/uni-api'

type UniRequestAnimationFrameCallback = (task: number) => void

export const requestAnimationFrame = defineSyncApi(
  'requestAnimationFrame',
  (callback: UniRequestAnimationFrameCallback) => {
    return globalThis.__uniappx__.requestAnimationFrame(callback)
  }
)

export const cancelAnimationFrame = defineSyncApi(
  'cancelAnimationFrame',
  () => {
    return function (taskId: number) {
      globalThis.__uniappx__.cancelAnimationFrame(taskId)
    }
  }
)
