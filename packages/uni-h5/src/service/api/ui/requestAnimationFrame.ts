// TODO 临时拷贝 uni-app/api/requestAnimationFrame

import type { UniRequestAnimationFrameCallback } from '@dcloudio/uni-app-x/types/uni'

export const requestAnimationFrame = function (
  callback: UniRequestAnimationFrameCallback
): number {
  return window.requestAnimationFrame(callback)
}
