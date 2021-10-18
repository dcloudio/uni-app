import path from 'path'
import fs from 'fs-extra'
import { extend, isArray, isString, NormalizedStyle } from '@vue/shared'
import {
  isNativeTag,
  createRpx2Unit,
  Rpx2UnitOptions,
} from '@dcloudio/uni-shared'
import { parseRpx2UnitOnce, resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import { ConfigEnv, ResolvedConfig, UserConfig } from 'vite'
import resolve from 'resolve'

export function isSsr(
  command: ConfigEnv['command'],
  config: UserConfig | ResolvedConfig
) {
  if (command === 'serve') {
    return !!(config.server && config.server.middlewareMode)
  }
  if (command === 'build') {
    return !!(config.build && config.build.ssr)
  }
  return false
}

export function isSsrManifest(
  command: ConfigEnv['command'],
  config: UserConfig | ResolvedConfig
) {
  if (command === 'build') {
    return !!(config.build && config.build.ssrManifest)
  }
  return false
}

export function initSsrDefine(config: ResolvedConfig) {
  return extend(globalThis, {
    __IMPORT_META_ENV_BASE_URL__: config.env.BASE_URL,
  })
}

function serializeDefine(define: Record<string, any>): string {
  let res = `{`
  for (const key in define) {
    const val = define[key]
    res += `${JSON.stringify(key)}: ${
      typeof val === 'string' ? `(${val})` : JSON.stringify(val)
    }, `
  }
  return res + `}`
}

function normalizeSsrDefine(config: ResolvedConfig) {
  const defines = extend(
    {
      __IMPORT_META_ENV_BASE_URL__: JSON.stringify(config.env.BASE_URL),
    },
    config.define!
  )
  delete defines['import.meta.env.LEGACY']
  return defines
}
export function generateSsrDefineCode(
  config: ResolvedConfig,
  { unit, unitRatio, unitPrecision }: Rpx2UnitOptions
): string {
  return fs
    .readFileSync(path.join(__dirname, '../../lib/ssr/define.js'), 'utf8')
    .replace('__DEFINES__', serializeDefine(normalizeSsrDefine(config)))
    .replace('__UNIT__', JSON.stringify(unit))
    .replace('__UNIT_RATIO__', JSON.stringify(unitRatio))
    .replace('__UNIT_PRECISION__', JSON.stringify(unitPrecision))
}

export function generateSsrEntryServerCode() {
  return fs.readFileSync(
    path.join(__dirname, '../../lib/ssr/entry-server.js'),
    'utf8'
  )
}

export function rewriteSsrVue(mode?: 2 | 3) {
  // 解决 @vue/server-renderer 中引入 vue 的映射
  let vuePath: string
  if (mode === 2) {
    vuePath = resolveBuiltIn(
      '@dcloudio/uni-h5-vue/dist/vue.runtime.compat.cjs.js'
    )
  } else {
    vuePath = resolveBuiltIn('@dcloudio/uni-h5-vue/dist/vue.runtime.cjs.js')
  }
  require('module-alias').addAlias('vue', vuePath)
}

function initResolveSyncOpts(opts?: resolve.SyncOpts) {
  if (!opts) {
    opts = {}
  }
  if (!opts.paths) {
    opts.paths = []
  }
  if (isString(opts.paths)) {
    opts.paths = [opts.paths]
  }
  if (isArray(opts.paths)) {
    opts.paths.push(path.join(process.env.UNI_CLI_CONTEXT, 'node_modules'))
  }
  return opts
}

export function rewriteSsrResolve(mode?: 2 | 3) {
  // 解决 ssr 时 __vite_ssr_import__("vue") 的映射
  const resolve = require('resolve')
  const oldSync = resolve.sync
  resolve.sync = (id: string, opts?: resolve.SyncOpts) => {
    if (id === 'vue') {
      return resolveBuiltIn(
        `@dcloudio/uni-h5-vue/dist/vue.runtime.${
          mode === 2 ? 'compat.' : ''
        }cjs.js`
      )
    }
    return oldSync(id, initResolveSyncOpts(opts))
  }
}

export function rewriteSsrNativeTag() {
  const { parserOptions } = require('@vue/compiler-dom')
  // TODO compiler-ssr时，传入的 isNativeTag 会被 @vue/compiler-dom 的 isNativeTag 覆盖
  // https://github.com/vuejs/vue-next/blob/master/packages/compiler-ssr/src/index.ts#L36
  parserOptions.isNativeTag = isNativeTag
}

export function rewriteSsrRenderStyle(inputDir: string) {
  const { unit, unitRatio, unitPrecision } = parseRpx2UnitOnce(inputDir, 'h5')
  const rpx2unit = createRpx2Unit(unit, unitRatio, unitPrecision)
  const shared = require('@vue/shared')
  const oldStringifyStyle = shared.stringifyStyle
  shared.stringifyStyle = (styles: NormalizedStyle | undefined) =>
    rpx2unit(oldStringifyStyle(styles))
  const serverRender = require('@vue/server-renderer')
  const oldSsrRenderStyle = serverRender.ssrRenderStyle
  // 仅对字符串类型做转换，非字符串类型，通过 stringifyStyle 转换
  serverRender.ssrRenderStyle = (raw: unknown) =>
    isString(raw) ? rpx2unit(oldSsrRenderStyle(raw)) : oldSsrRenderStyle(raw)
}
