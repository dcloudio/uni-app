import path from 'path'
import fs from 'fs'
import { extend, isArray, isString, NormalizedStyle } from '@vue/shared'
import {
  once,
  isH5NativeTag,
  createRpx2Unit,
  Rpx2UnitOptions,
} from '@dcloudio/uni-shared'
import {
  parseRpx2UnitOnce,
  resolveBuiltIn,
  getBuiltInPaths,
  transformMatchMedia,
  normalizePath,
  transformH5BuiltInComponents,
} from '@dcloudio/uni-cli-shared'
import type { ConfigEnv, ResolvedConfig, UserConfig } from 'vite'
import resolve from 'resolve'
import { resolveComponentType } from '@vue/compiler-dom'
import { transformPageHead } from '../plugin/transforms/transformPageHead'

// Temporal handling for 2.7 breaking change
export const isSSR = (opt: { ssr?: boolean } | boolean | undefined) =>
  opt === undefined ? false : typeof opt === 'boolean' ? opt : opt?.ssr === true

export function isSsrManifest(
  command: ConfigEnv['command'],
  config: UserConfig | ResolvedConfig
) {
  if (command === 'build') {
    return !!(config.build && config.build.ssrManifest)
  }
  return false
}

const SSR_ALIAS: Record<string, string> = {
  vue: '@dcloudio/uni-h5-vue',
  'vue/server-renderer': 'vue/server-renderer',
  '@vue/server-renderer': '@vue/server-renderer',
  '@dcloudio/uni-cloud': '@dcloudio/uni-cloud',
  '@dcloudio/uni-h5': '@dcloudio/uni-h5',
  '@dcloudio/uni-app': '@dcloudio/uni-app',
  '@dcloudio/uni-i18n': '@dcloudio/uni-i18n',
  '@dcloudio/uni-shared': '@dcloudio/uni-shared',
}
export const initSsrAliasOnce = once(() => {
  // 重写 package.json 的读取
  const oldJoin = path.join
  const alias = Object.keys(SSR_ALIAS).reduce((alias, key) => {
    const newKey = oldJoin('node_modules', key, 'package.json')
    if (key.endsWith('vue/server-renderer')) {
      alias[newKey] = path.join(
        path.dirname(resolveBuiltIn(SSR_ALIAS[key])),
        'package.json'
      )
    } else {
      alias[newKey] = resolveBuiltIn(SSR_ALIAS[key] + '/package.json')
    }
    return alias
  }, {} as Record<string, string>)
  // console.log(alias)
  path.join = (...paths: string[]): string => {
    let res = oldJoin.apply(path, paths)
    if (res.endsWith('package.json')) {
      const key = Object.keys(alias).find((key) => res.endsWith(key))
      if (key) {
        res = alias[key]
      }
    }
    return res
  }
})

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
      isString(val) ? `(${val})` : JSON.stringify(val)
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

export function rewriteSsrVue() {
  // 解决 @vue/server-renderer 中引入 vue 的映射
  require('module-alias').addAliases({
    vue: resolveBuiltIn(
      '@dcloudio/uni-h5-vue/' +
        (process.env.UNI_APP_X === 'true' ? 'dist-x' : 'dist') +
        '/vue.runtime.cjs.js'
    ),
    'vue/package.json': resolveBuiltIn('@dcloudio/uni-h5-vue/package.json'),
  })
  // TODO vite 2.7.0 版本会定制 require 的解析，解析后缓存的文件路径会被格式化，导致 windows 平台路径不一致，导致 cache 不生效
  if (require('os').platform() === 'win32') {
    require('vue')
    const vuePath = require.resolve('vue')
    require.cache[normalizePath(vuePath)] = require.cache[vuePath]
  }
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
    opts.paths.push(...getBuiltInPaths())
  }
  return opts
}

export function rewriteSsrResolve() {
  // 解决 ssr 时 __vite_ssr_import__("vue") 的映射
  const resolve = require(require.resolve('resolve', {
    paths: [
      path.resolve(require.resolve('vite/package.json'), '../node_modules'),
    ],
  }))
  const oldSync = resolve.sync
  resolve.sync = (id: string, opts?: resolve.SyncOpts) => {
    if (id === 'vue') {
      return resolveBuiltIn(
        '@dcloudio/uni-h5-vue/' +
          (process.env.UNI_APP_X === 'true' ? 'dist-x' : 'dist') +
          '/vue.runtime.cjs.js'
      )
    } else if (id === 'vue/package.json') {
      return resolveBuiltIn(`@dcloudio/uni-h5-vue/package.json`)
    } else if (id === 'vue/server-renderer/package.json') {
      return resolveBuiltIn(`@vue/server-renderer/package.json`)
    }
    return oldSync(id, initResolveSyncOpts(opts))
  }
}

export function rewriteSsrNativeTag() {
  // @ts-ignore
  const compilerDom = require(resolveBuiltIn('@vue/compiler-dom'))
  // TODO compiler-ssr时，传入的 isNativeTag 会被 @vue/compiler-dom 的 isNativeTag 覆盖
  // https://github.com/vuejs/vue-next/blob/master/packages/compiler-ssr/src/index.ts#L36
  compilerDom.parserOptions.isNativeTag = isH5NativeTag

  // ssr 时，ssrTransformComponent 执行时机很早，导致无法正确重写 tag，故通过 resolveComponentType 解决重写
  const oldResolveComponentType =
    compilerDom.resolveComponentType as typeof resolveComponentType
  const newResolveComponentType: typeof resolveComponentType = function (
    node,
    context,
    ssr
  ) {
    transformPageHead(node, context)
    transformMatchMedia(node, context)
    transformH5BuiltInComponents(node, context)
    return oldResolveComponentType(node, context, ssr)
  }
  compilerDom.resolveComponentType = newResolveComponentType
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
