import path from 'path'
import fs from 'fs-extra'
import { isString, NormalizedStyle } from '@vue/shared'
import {
  isNativeTag,
  createRpx2Unit,
  Rpx2UnitOptions,
} from '@dcloudio/uni-shared'
import { parseRpx2UnitOnce } from '@dcloudio/uni-cli-shared'
import { ConfigEnv, ResolvedConfig, UserConfig } from 'vite'

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

function serializeDefine(define: Record<string, any>): string {
  let res = `{`
  for (const key in define) {
    const val = define[key]
    res += `${JSON.stringify(key)}: ${
      typeof val === 'string' && !key.startsWith('process.env.') // process.env.* 必须序列化为字符串
        ? `(${val})`
        : JSON.stringify(val)
    }, `
  }
  return res + `}`
}

export function generateSSRDefineCode(
  define: Record<string, any>,
  { unit, unitRatio, unitPrecision }: Rpx2UnitOptions
): string {
  return fs
    .readFileSync(path.join(__dirname, '../../lib/ssr/define.js'), 'utf8')
    .replace('__DEFINES__', serializeDefine(define))
    .replace('__UNIT__', JSON.stringify(unit))
    .replace('__UNIT_RATIO__', JSON.stringify(unitRatio))
    .replace('__UNIT_PRECISION__', JSON.stringify(unitPrecision))
}

export function generateSSREntryServerCode() {
  return fs.readFileSync(
    path.join(__dirname, '../../lib/ssr/entry-server.js'),
    'utf8'
  )
}

export function rewriteSsrNativeTag() {
  const { parserOptions } = require('@vue/compiler-dom')
  // TODO compiler-ssr时，传入的 isNativeTag 会被 @vue/compiler-dom 的 isNativeTag 覆盖
  // https://github.com/vuejs/vue-next/blob/master/packages/compiler-ssr/src/index.ts#L36
  parserOptions.isNativeTag = isNativeTag
}

export function rewriteSsrRenderStyle(inputDir: string) {
  const { unit, unitRatio, unitPrecision } = parseRpx2UnitOnce(inputDir)
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
