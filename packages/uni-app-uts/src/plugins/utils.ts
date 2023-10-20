import {
  MANIFEST_JSON_UTS,
  PAGES_JSON_UTS,
  UniViteCopyPluginOptions,
  UniVitePlugin,
  initI18nOptions,
} from '@dcloudio/uni-cli-shared'
import { compileI18nJsonStr } from '@dcloudio/uni-i18n'

export function createUniOptions(): UniVitePlugin['uni'] {
  return {
    copyOptions() {
      const platform = process.env.UNI_PLATFORM
      const inputDir = process.env.UNI_INPUT_DIR
      const outputDir = process.env.UNI_OUTPUT_DIR
      const targets: UniViteCopyPluginOptions['targets'] = []
      // 自动化测试时，不启用隐私政策
      if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
        if (process.env.UNI_UTS_PLATFORM === 'app-android') {
          targets.push({
            src: 'androidPrivacy.json',
            dest: outputDir,
            transform(source) {
              const options = initI18nOptions(platform, inputDir, false, true)
              if (!options) {
                return
              }
              return compileI18nJsonStr(source.toString(), options)
            },
          })
        }
      }
      return {
        assets: ['hybrid/html/**/*', 'uni_modules/*/hybrid/html/**/*'],
        targets,
      }
    },
  }
}

export function isManifest(id: string) {
  return id.endsWith(MANIFEST_JSON_UTS)
}

export function isPages(id: string) {
  return id.endsWith(PAGES_JSON_UTS)
}
