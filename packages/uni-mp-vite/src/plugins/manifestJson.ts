import path from 'path'
import { Plugin } from 'vite'
import { hasOwn } from '@vue/shared'
import {
  defineUniManifestJsonPlugin,
  getLocaleFiles,
  parseMiniProgramProjectJson,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '../plugin'

export function uniManifestJsonPlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  let projectJson: Record<string, any>
  return defineUniManifestJsonPlugin((opts) => {
    return {
      name: 'vite:uni-mp-manifest-json',
      enforce: 'pre',
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        const inputDir = process.env.UNI_INPUT_DIR
        this.addWatchFile(path.resolve(inputDir, 'manifest.json'))
        getLocaleFiles(path.resolve(inputDir, 'locale')).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        if (options.project) {
          const template = options.project.source
          if (hasOwn(template, 'appid')) {
            let projectname = path.basename(inputDir)
            if (projectname === 'src') {
              projectname = path.basename(path.dirname(inputDir))
            }
            template.projectname = projectname
            // TODO condition
            if (process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
              if (!template.setting) {
                template.setting = {}
              }
              template.setting.urlCheck = false
            }
            projectJson = parseMiniProgramProjectJson(
              code,
              process.env.UNI_PLATFORM,
              { template }
            )
          } else {
            // 无需解析，直接拷贝，如 quickapp-webview
            projectJson = template
          }
        }

        return {
          code: '',
          map: this.getCombinedSourcemap(),
        }
      },
      generateBundle() {
        if (projectJson && options.project) {
          this.emitFile({
            fileName: options.project.filename,
            type: 'asset',
            source: JSON.stringify(projectJson, null, 2),
          })
        }
      },
    }
  })
}
