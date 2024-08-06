import { defineSyncApi } from '@dcloudio/uni-api'

import type { UniRequestAnimationFrameCallback } from '@dcloudio/uni-app-x/types/uni'

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
