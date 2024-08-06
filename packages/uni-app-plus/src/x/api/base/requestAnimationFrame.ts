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
  (taskId: number) => {
    globalThis.__uniappx__.cancelAnimationFrame(Number(taskId))
  }
)
