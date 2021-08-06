import path from 'path'
import {
  isServiceNativeTag,
  isServiceCustomElement,
} from '@dcloudio/uni-shared'
import { normalizePath, UniVitePlugin } from '@dcloudio/uni-cli-shared'

export function uniOptions(): UniVitePlugin['uni'] {
  return {
    copyOptions() {
      return {
        assets: ['hybrid/html'],
        targets: [
          {
            src: normalizePath(
              path.resolve(process.env.UNI_INPUT_DIR, 'androidPrivacy.json')
            ),
            dest: process.env.UNI_OUTPUT_DIR,
          },
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
