import path from 'path'
import fs from 'fs'
import {
  type ComponentJson,
  addMiniProgramComponentJson,
  addMiniProgramComponentPackageRoot,
  camelize,
  capitalize,
  decodeBase64Url,
  encodeBase64Url,
  getUniModulesEncryptType,
  isAlipayXStyleIsolation,
  normalizeMiniProgramFilename,
  normalizePath,
  parseManifestJsonOnce,
  parseMiniProgramPagesJson,
  removeExt,
  resolveMiniProgramComponentPackageRoot,
} from '@dcloudio/uni-cli-shared'
import type { Plugin } from 'vite'

import type { UniMiniProgramPluginOptions } from '../plugin'
import { UNI_MP_RUNTIME_ID, withIndependentRoot } from './independentUtils'

const uniPagePrefix = 'uniPage://'
const uniComponentPrefix = 'uniComponent://'

interface VirtualMiniProgramFileInfo {
  filepath: string
  root?: string
  packageRoot?: string
}

export function virtualPagePath(filepath: string, root?: string) {
  return uniPagePrefix + encodeVirtualFileInfo(filepath, root)
}
export function virtualComponentPath(
  filepath: string,
  root?: string,
  packageRoot?: string
) {
  return uniComponentPrefix + encodeVirtualFileInfo(filepath, root, packageRoot)
}

export function parseVirtualPagePath(uniPageUrl: string) {
  return parseVirtualPagePathInfo(uniPageUrl).filepath
}

export function parseVirtualComponentPath(uniComponentUrl: string) {
  return parseVirtualComponentPathInfo(uniComponentUrl).filepath
}

export function parseVirtualPagePathInfo(uniPageUrl: string) {
  return decodeVirtualFileInfo(uniPageUrl, uniPagePrefix)
}

export function parseVirtualComponentPathInfo(uniComponentUrl: string) {
  return decodeVirtualFileInfo(uniComponentUrl, uniComponentPrefix)
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

let hasOptimizationSubPackages = false // 是否开启分包优化配置
let subPackages: string[] = []
let subPackageRoots: string[] = []
function initSubPackages() {
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  const pagesJsonFile = path.resolve(inputDir, 'pages.json')
  if (!fs.existsSync(pagesJsonFile)) {
    hasOptimizationSubPackages = false
    subPackages = []
    subPackageRoots = []
    return
  }
  const platform = process.env.UNI_PLATFORM
  const manifestJson = parseManifestJsonOnce(inputDir)
  hasOptimizationSubPackages =
    platform && manifestJson[platform]?.optimization?.subPackages
  const { appJson } = parseMiniProgramPagesJson(
    fs.readFileSync(pagesJsonFile, 'utf8'),
    platform,
    { subpackages: true }
  )
  subPackageRoots = Object.values(
    appJson.subPackages || appJson.subpackages || {}
  )
    .filter(Boolean)
    .map(({ root, independent }) => {
      if (independent === true) {
        return ''
      }
      return normalizePath(root).replace(/^\/+|\/+$/g, '')
    })
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
  subPackages = subPackageRoots.map((root) => `${root}/`)
}
export function getSubPackages() {
  return {
    hasOptimizationSubPackages,
    subPackages,
  }
}

export function getSubPackageRootByFilename(
  filename: string,
  inputDir: string
) {
  const normalizedFilename = normalizePath(filename).split('?')[0]
  const relativeFilename = path.isAbsolute(normalizedFilename)
    ? normalizePath(path.relative(inputDir, normalizedFilename))
    : normalizedFilename
  return subPackageRoots.find((root) => {
    return relativeFilename === root || relativeFilename.startsWith(root + '/')
  })
}

export function normalizeMiniProgramComponentFilename(
  filename: string,
  inputDir: string,
  packageRoot?: string
) {
  const miniProgramFilename = normalizeMiniProgramFilename(filename, inputDir)
  if (packageRoot && miniProgramFilename.startsWith('uni_modules/')) {
    return `${packageRoot}/${miniProgramFilename}`
  }
  return miniProgramFilename
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
      initSubPackages()
    },
    load(id) {
      if (isUniPageUrl(id)) {
        const { filepath: pageFilepath, root } = parseVirtualPagePathInfo(id)
        const filepath = normalizePath(path.resolve(inputDir, pageFilepath))
        this.addWatchFile(filepath)
        return {
          code: `${genIndependentCreateImport(
            'createPage',
            '__uniCreatePage',
            root
          )}import MiniProgramPage from '${
            root ? withIndependentRoot(filepath, root) : filepath
          }'
${root ? '__uniCreatePage' : `${global}.createPage`}(MiniProgramPage)`,
        }
      } else if (isUniComponentUrl(id)) {
        const {
          filepath: componentFilepath,
          root,
          packageRoot,
        } = parseVirtualComponentPathInfo(id)
        const filepath = normalizePath(
          path.resolve(inputDir, componentFilepath)
        )
        const relativePath = normalizePath(path.relative(inputDir, filepath))
        if (!root && relativePath.startsWith('uni_modules/')) {
          addMiniProgramComponentPackageRoot(relativePath, packageRoot)
        }
        this.addWatchFile(filepath)

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

        if (isAlipayXStyleIsolation()) {
          // 隔离命中由前缀 class 控制，原生层统一开放全局样式可见性且不向外泄漏组件样式。
          json.styleIsolation = 'apply-shared'
        } else if (process.env.UNI_PLATFORM === 'mp-alipay') {
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
          removeExt(
            normalizeMiniProgramComponentFilename(
              filepath,
              inputDir,
              root
                ? undefined
                : resolveMiniProgramComponentPackageRoot(
                    relativePath,
                    packageRoot
                  )
            )
          ),
          json
        )
        if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
          // 云编译时，组件的代码会直接内联到入口文件中，以方法对外导出，不能立刻执行createComponent
          return {
            code: `import Component from '${filepath}'
export default Component`,
          }
        }
        return {
          code: `${genIndependentCreateImport(
            'createComponent',
            '__uniCreateComponent',
            root
          )}import Component from '${
            root ? withIndependentRoot(filepath, root) : filepath
          }'
${root ? '__uniCreateComponent' : `${global}.createComponent`}(Component)`,
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

function genIndependentCreateImport(
  name: 'createPage' | 'createComponent',
  alias: string,
  root?: string
) {
  return root
    ? `import { ${name} as ${alias} } from ${JSON.stringify(
        withIndependentRoot(UNI_MP_RUNTIME_ID, root)
      )}
`
    : ''
}

function encodeVirtualFileInfo(
  filepath: string,
  root?: string,
  packageRoot?: string
) {
  return encodeBase64Url(
    root || packageRoot
      ? JSON.stringify({ filepath, root, packageRoot })
      : filepath
  )
}

function decodeVirtualFileInfo(
  url: string,
  prefix: string
): VirtualMiniProgramFileInfo {
  const decoded = decodeBase64Url(url.replace(prefix, ''))
  if (decoded[0] === '{') {
    try {
      const info = JSON.parse(decoded)
      if (info && typeof info.filepath === 'string') {
        return {
          filepath: info.filepath,
          root: typeof info.root === 'string' ? info.root : undefined,
          packageRoot:
            typeof info.packageRoot === 'string' ? info.packageRoot : undefined,
        }
      }
    } catch (e) {
      // 非 JSON 编码时按旧格式处理
    }
  }
  return { filepath: decoded }
}
