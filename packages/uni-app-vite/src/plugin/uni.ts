import {
  isServiceNativeTag,
  isServiceCustomElement,
} from '@dcloudio/uni-shared'
import { UniVitePlugin } from '@dcloudio/uni-cli-shared'

export const uniOptions: UniVitePlugin['uni'] = {
  compilerOptions: {
    isNativeTag: isServiceNativeTag,
    isCustomElement: isServiceCustomElement,
  },
  transformEvent: {
    tap: 'click',
  },
}
