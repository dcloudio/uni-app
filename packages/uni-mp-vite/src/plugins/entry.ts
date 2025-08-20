import path from 'path'
import fs from 'fs'
import {
  type ComponentJson,
  addMiniProgramComponentJson,
  camelize,
  capitalize,
  decodeBase64Url,
  encodeBase64Url,
  getUniModulesEncryptType,
  normalizeMiniProgramFilename,
  normalizePath,
  parseManifestJsonOnce,
  removeExt,
} from '@dcloudio/uni-cli-shared'
import type { Plugin } from 'vite'

import type { UniMiniProgramPluginOptions } from '../plugin'

const uniPagePrefix = 'uniPage://'
const uniComponentPrefix = 'uniComponent://'

export function virtualPagePath(filepath: string) {
  return uniPagePrefix + encodeBase64Url(filepath)
}
export function virtualComponentPath(filepath: string) {
  return uniComponentPrefix + encodeBase64Url(filepath)
}

export function parseVirtualPagePath(uniPageUrl: string) {
  return decodeBase64Url(uniPageUrl.replace(uniPagePrefix, ''))
}

export function parseVirtualComponentPath(uniComponentUrl: string) {
  return decodeBase64Url(uniComponentUrl.replace(uniComponentPrefix, ''))
}

export function isUniPageUrl(id: string) {
  return id.startsWith(uniPagePrefix)
}

export function isUniComponentUrl(id: string) {
  return id.startsWith(uniComponentPrefix)
}

const styleIsolationRE = [
  /defineOptions\s*[\s\S]*?styleIsolation\s*:\s*['"](isolated|apply-shared|shared)['"]/,
  /export\s+default\s+[\s\S]*?styleIsolation\s*:\s*['|"](isolated|apply-shared|shared)['|"]/,
]
export function parseComponentStyleIsolation(content: string) {
  for (const regex of styleIsolationRE) {
    const matches = content.match(regex)
    if (matches) {
      return matches[1]
    }
  }
}

export function uniEntryPlugin({
  global,
  template,
  style,
}: UniMiniProgramPluginOptions): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const manifestJson = parseManifestJsonOnce(inputDir)
  const platformOptions = manifestJson[process.env.UNI_PLATFORM] || {}
  const easycomEncryptComponentPaths = new Set<string>()
  return {
    name: 'uni:virtual',
    enforce: 'pre',
    resolveId(id) {
      if (isUniPageUrl(id) || isUniComponentUrl(id)) {
        return id
      }
    },
    buildStart() {
      easycomEncryptComponentPaths.clear()
    },
    load(id) {
      if (isUniPageUrl(id)) {
        const filepath = normalizePath(
          path.resolve(inputDir, parseVirtualPagePath(id))
        )
        this.addWatchFile(filepath)
        return {
          code: `import MiniProgramPage from '${filepath}'
${global}.createPage(MiniProgramPage)`,
        }
      } else if (isUniComponentUrl(id)) {
        const filepath = normalizePath(
          path.resolve(inputDir, parseVirtualComponentPath(id))
        )
        this.addWatchFile(filepath)

        const relativePath = normalizePath(path.relative(inputDir, filepath))
        // 判断当前插件是否是easycom加密插件
        if (relativePath.startsWith('uni_modules')) {
          const pluginId = relativePath.split('/')[1]
          const encryptType = getUniModulesEncryptType(pluginId)
          if (encryptType === 'easycom') {
            const componentName = capitalize(
              camelize(removeExt(path.basename(relativePath)))
            )
            easycomEncryptComponentPaths.add(removeExt(relativePath))
            return {
              code: `import { defineComponent${componentName} } from '@/uni_modules/${pluginId}?uni_helpers'
  defineComponent${componentName}()`,
            }
          }
        }

        const json: ComponentJson = {
          component: true,
          styleIsolation: undefined,
        }

        if (process.env.UNI_PLATFORM === 'mp-alipay') {
          json.styleIsolation =
            parseComponentStyleIsolation(fs.readFileSync(filepath, 'utf-8')) ||
            platformOptions.styleIsolation ||
            'apply-shared'
        }
        // 微信小程序json文件中的styleIsolation优先级比options中的高，为了兼容旧版本，不能设置默认值，并且只有在manifest.json中配置styleIsolation才会静态分析组件的styleIsolation
        if (process.env.UNI_PLATFORM === 'mp-weixin') {
          if (platformOptions.styleIsolation) {
            json.styleIsolation =
              parseComponentStyleIsolation(
                fs.readFileSync(filepath, 'utf-8')
              ) || platformOptions.styleIsolation
          }
        }

        addMiniProgramComponentJson(
          removeExt(normalizeMiniProgramFilename(filepath, inputDir)),
          json
        )
        if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
          // 云编译时，组件的代码会直接内联到入口文件中，以方法对外导出，不能立刻执行createComponent
          return {
            code: `import Component from '${filepath}
export default Component`,
          }
        }
        return {
          code: `import Component from '${filepath}'
${global}.createComponent(Component)`,
        }
      }
    },
    generateBundle() {
      const cacheDir = process.env.UNI_MODULES_ENCRYPT_CACHE_DIR
      if (cacheDir) {
        for (const componentPath of easycomEncryptComponentPaths) {
          const componentCachePath = path.resolve(cacheDir, componentPath)
          ;['.json', template.extname, style.extname].forEach((extname) => {
            const filename = componentCachePath + extname
            if (fs.existsSync(filename)) {
              this.emitFile({
                fileName: componentPath + extname,
                type: 'asset',
                source: fs.readFileSync(filename, 'utf-8'),
              })
            }
          })
        }
      }
    },
  }
}
