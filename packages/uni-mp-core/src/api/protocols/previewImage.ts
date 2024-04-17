import { isArray } from '@vue/shared'
import type { MPProtocol } from './types'

export const previewImage: MPProtocol = {
  args(
    fromArgs: UniApp.PreviewImageOptions,
    toArgs: WechatMiniprogram.PreviewImageOption
  ) {
    let currentIndex = parseInt(fromArgs.current as string)
    if (isNaN(currentIndex)) {
      return
    }
    const urls = fromArgs.urls
    if (!isArray(urls)) {
      return
    }
    const len = urls.length
    if (!len) {
      return
    }
    if (currentIndex < 0) {
      currentIndex = 0
    } else if (currentIndex >= len) {
      currentIndex = len - 1
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex]
      toArgs.urls = urls.filter((item, index) =>
        index < currentIndex ? item !== urls[currentIndex] : true
      )
    } else {
      toArgs.current = urls[0]
    }
    return {
      indicator: false,
      loop: false,
    }
  },
}
