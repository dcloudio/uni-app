import {
  isServiceNativeTag,
  isServiceCustomElement,
} from '@dcloudio/uni-shared'
import { UniVitePlugin } from '@dcloudio/uni-cli-shared'

export function uniOptions(): UniVitePlugin['uni'] {
  return {
    compilerOptions: {
      isNativeTag: isServiceNativeTag,
      isCustomElement: isServiceCustomElement,
    },
  }
}
