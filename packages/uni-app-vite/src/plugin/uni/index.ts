import { isAppNativeTag, isAppNVueNativeTag } from '@dcloudio/uni-shared'
import { compileI18nJsonStr } from '@dcloudio/uni-i18n'
import {
  UniVitePlugin,
  initI18nOptions,
  transformPageHead,
  transformMatchMedia,
  transformTapToClick,
  UniViteCopyPluginOptions,
} from '@dcloudio/uni-cli-shared'

import { initNVueNodeTransforms } from '../../nvue'

export function uniOptions(): UniVitePlugin['uni'] {
  const isNVueCompiler = process.env.UNI_COMPILER === 'nvue'
  return {
    copyOptions() {
      const platfrom = process.env.UNI_PLATFORM
      const inputDir = process.env.UNI_INPUT_DIR
      const outputDir = process.env.UNI_OUTPUT_DIR
      const targets: UniViteCopyPluginOptions['targets'] = []
      // 自动化测试时，不启用隐私政策
      if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
        targets.push({
          src: 'androidPrivacy.json',
          dest: outputDir,
          transform(source) {
            const options = initI18nOptions(platfrom, inputDir, false, true)
            if (!options) {
              return
            }
            return compileI18nJsonStr(source.toString(), options)
          },
        })
      }
      return {
        assets: ['hybrid/html/**/*', 'uni_modules/*/hybrid/html/**/*'],
        targets,
      }
    },
    compilerOptions: {
      isNativeTag: isNVueCompiler ? isAppNVueNativeTag : isAppNativeTag,
      nodeTransforms: [
        ...(isNVueCompiler ? initNVueNodeTransforms() : []),
        transformTapToClick,
        transformMatchMedia,
        transformPageHead,
      ],
    },
  }
}
