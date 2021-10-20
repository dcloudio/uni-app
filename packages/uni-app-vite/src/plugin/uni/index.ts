import { isNativeTag, isCustomElement } from '@dcloudio/uni-shared'
import { compileI18nJsonStr } from '@dcloudio/uni-i18n'
import { UniVitePlugin, initI18nOptions } from '@dcloudio/uni-cli-shared'

export function uniOptions(): UniVitePlugin['uni'] {
  return {
    copyOptions() {
      const platfrom = process.env.UNI_PLATFORM
      const inputDir = process.env.UNI_INPUT_DIR
      const outputDir = process.env.UNI_OUTPUT_DIR
      return {
        assets: ['hybrid/html/**/*', 'uni_modules/*/hybrid/html/**/*'],
        targets: [
          {
            src: 'androidPrivacy.json',
            dest: outputDir,
            transform(source) {
              const options = initI18nOptions(platfrom, inputDir, false, true)
              if (!options) {
                return
              }
              return compileI18nJsonStr(source.toString(), options)
            },
          },
        ],
      }
    },
    compilerOptions: {
      isNativeTag,
      isCustomElement,
    },
    transformEvent: {
      tap: 'click',
    },
  }
}
