import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'
import { hasOwn } from '@vue/shared'
import {
  defineUniManifestJsonPlugin,
  getLocaleFiles,
  parseJson,
  parseMiniProgramProjectJson,
  parsePagesJsonOnce,
} from '@dcloudio/uni-cli-shared'
import type { UniMiniProgramPluginOptions } from '../plugin'

function findUserProjectConfigFile(inputDir: string, config: string[]) {
  for (let i = 0; i < config.length; i++) {
    const projectFilename = path.resolve(inputDir, config[i])
    // 根目录包含指定文件，则直接拷贝
    if (fs.existsSync(projectFilename)) {
      return projectFilename
    }
  }
}

export function uniManifestJsonPlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  return defineUniManifestJsonPlugin((opts) => {
    const inputDir = process.env.UNI_INPUT_DIR
    const platform = process.env.UNI_PLATFORM
    let projectJson: Record<string, any>
    let userProjectFilename: string | undefined
    let projectSource: string
    if (options.project) {
      userProjectFilename = findUserProjectConfigFile(
        inputDir,
        options.project.config
      )
    }
    return {
      name: 'uni:mp-manifest-json',
      enforce: 'pre',
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        this.addWatchFile(path.resolve(inputDir, 'manifest.json'))
        getLocaleFiles(path.resolve(inputDir, 'locale')).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        if (options.project) {
          // 根目录包含指定文件，则直接拷贝
          if (userProjectFilename) {
            this.addWatchFile(userProjectFilename)
            projectJson = parseJson(
              fs.readFileSync(userProjectFilename, 'utf8'),
              false,
              userProjectFilename
            )
          } else {
            const template = options.project.source
            if (hasOwn(template, 'appid')) {
              let projectName = path.basename(inputDir)
              if (projectName === 'src') {
                projectName = path.basename(path.dirname(inputDir))
              }
              template.projectname = projectName
              // TODO condition
              if (process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
                if (!template.setting) {
                  template.setting = {}
                }
                template.setting.urlCheck = false
              }
              projectJson = parseMiniProgramProjectJson(code, platform, {
                template,
                pagesJson: parsePagesJsonOnce(inputDir, platform),
              })
            } else {
              // 无需解析，直接拷贝，如 quickapp-webview
              projectJson = template
            }
          }
        }

        return {
          code: '',
          map: { mappings: '' },
        }
      },
      generateBundle() {
        if (projectJson && options.project) {
          const { filename, normalize } = options.project
          const source = JSON.stringify(
            normalize ? normalize(projectJson) : projectJson,
            null,
            2
          )
          if (projectSource !== source) {
            projectSource = source
            this.emitFile({
              fileName: filename,
              type: 'asset',
              source,
            })
          }
        }
      },
    }
  })
}
