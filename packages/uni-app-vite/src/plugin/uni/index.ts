import {
  isServiceNativeTag,
  isServiceCustomElement,
} from '@dcloudio/uni-shared'
import { UniVitePlugin } from '@dcloudio/uni-cli-shared'

export function uniOptions(): UniVitePlugin['uni'] {
  return {
    copyOptions() {
      return {
        assets: [
          'androidPrivacy.json',
          'hybrid/html/**/*',
          'uni_modules/*/hybrid/html/**/*',
        ],
      }
    },
    compilerOptions: {
      isNativeTag: isServiceNativeTag,
      isCustomElement: isServiceCustomElement,
    },
    transformEvent: {
      tap: 'click',
    },
  }
}
