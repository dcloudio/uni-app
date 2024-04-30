import path from 'path'
import debug from 'debug'
import type { Plugin, ResolvedConfig, UserConfig } from 'vite'

import { RENDERJS_MODULES, WXS_MODULES } from '@dcloudio/uni-shared'

import {
  cleanUrl,
  hash,
  missingModuleName,
  normalizePath,
  parseRenderjs,
  transformWithEsbuild,
} from '@dcloudio/uni-cli-shared'

const debugRenderjs = debug('uni:app-renderjs')

export const APP_WXS_JS = 'app-wxs.js'
export const APP_RENDERJS_JS = 'app-renderjs.js'

const wxsModulesCache = new WeakMap<ResolvedConfig, Map<string, string>>()
const renderjsModulesCache = new WeakMap<ResolvedConfig, Map<string, string>>()
export function uniRenderjsPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  let userConfig: UserConfig
  let changed: boolean = false
  return {
    name: 'uni:app-vue-renderjs',
    config(config) {
      userConfig = config
    },
    configResolved(config) {
      resolvedConfig = config
      wxsModulesCache.set(resolvedConfig, new Map<string, string>())
      renderjsModulesCache.set(resolvedConfig, new Map<string, string>())
    },
    async transform(code, id) {
      const { type, name, filename } = parseRenderjs(id)
      if (!type) {
        return
      }
      if (type !== 'wxs' && type !== 'renderjs') {
        return
      }
      debugRenderjs(id)
      this.addWatchFile(cleanUrl(id))
      if (!name) {
        this.error(missingModuleName(type, code))
      }
      const modulePath = normalizePath(
        path.normalize(path.relative(process.env.UNI_INPUT_DIR, id))
      )
      const moduleHashId = hash(modulePath)
      const globalName = type === 'wxs' ? WXS_MODULES : RENDERJS_MODULES
      const { isProduction } = resolvedConfig
      const resultCode = normalizeCode(
        type === 'wxs'
          ? await transformWxs(
              code,
              filename,
              `__${globalName}['${moduleHashId}']`,
              isProduction,
              userConfig
            )
          : await transformRenderjs(
              code,
              filename,
              `__${globalName}['${moduleHashId}']`,
              isProduction,
              userConfig
            ),
        globalName,
        isProduction
      )
      if (type === 'wxs') {
        wxsModulesCache.get(resolvedConfig)!.set(moduleHashId, resultCode)
      } else {
        renderjsModulesCache.get(resolvedConfig)!.set(moduleHashId, resultCode)
      }
      changed = true
      debugRenderjs(type, modulePath, moduleHashId)
      return {
        code: `export default Comp => {
          ;(Comp.$${type} || (Comp.$${type} = [])).push('${name}')
          ;(Comp.$${globalName} || (Comp.$${globalName} = {}))['${name}'] = '${moduleHashId}'
        }`,
        map: { mappings: '' },
      }
    },
    generateBundle() {
      if (!changed) {
        return
      }
      const wxsCode = [...wxsModulesCache.get(resolvedConfig)!.values()].join(
        '\n'
      )
      if (wxsCode) {
        this.emitFile({
          fileName: APP_WXS_JS,
          source: `var __${WXS_MODULES}={};\n` + wxsCode,
          type: 'asset',
        })
      }
      const renderjsCode = [
        ...renderjsModulesCache.get(resolvedConfig)!.values(),
      ].join('\n')
      if (renderjsCode) {
        this.emitFile({
          fileName: APP_RENDERJS_JS,
          source: `var __${RENDERJS_MODULES}={};\n` + renderjsCode,
          type: 'asset',
        })
      }
    },
  }
}

function normalizeCode(
  code: string,
  globalName: string,
  isProduction: boolean
) {
  return code.replace(
    isProduction
      ? `var __${globalName}=__${globalName}||{};`
      : `var __${globalName} = __${globalName} || {};`,
    ''
  )
}

function transformWxs(
  code: string,
  filename: string,
  globalName: string,
  isProduction: boolean,
  config: UserConfig
) {
  return transformWithEsbuild(code, filename, {
    format: 'iife',
    globalName,
    target: config.build?.target || 'es6',
    minify: isProduction ? true : false,
    bundle: true,
    write: false,
  }).then((res) => {
    if (res.outputFiles) {
      return res.outputFiles[0].text
    }
    return ''
  })
}

function transformRenderjs(
  code: string,
  filename: string,
  globalName: string,
  isProduction: boolean,
  config: UserConfig
) {
  return transformWithEsbuild(code, filename, {
    format: 'iife',
    globalName,
    target: config.build?.target || 'es6',
    minify: isProduction ? true : false,
    bundle: true,
    write: false,
  }).then((res) => {
    if (res.outputFiles) {
      return res.outputFiles[0].text
    }
    return ''
  })
}
