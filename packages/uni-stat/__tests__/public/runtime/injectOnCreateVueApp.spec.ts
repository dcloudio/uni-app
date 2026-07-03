/**
 * 锁定 H5 发行 inject 对公有版 `uni.onCreateVueApp` 字面量的静态替换能力。
 *
 * 若改为动态 `u.onCreateVueApp`，inject 无法识别，H5 build 后 mixin 未注入。
 */
import { parse } from '@babel/parser'
import type { TransformPluginContext } from 'rollup'
import { uniViteInjectPlugin } from '../../../../uni-cli-shared/src/vite/plugins/inject'

const apiJson = require('../../../../uni-h5-vite/lib/api.json') as string[]

const injectOptions = {
  sourceMap: false,
  'uni.': [
    '@dcloudio/uni-h5',
    ((method: string) => apiJson.includes(method)) as unknown as string,
  ],
}

/** 与 dist/uni-stat-public.es.js 中 tryRegisterVueAppMixin 保持同形（字面量 uni.onCreateVueApp）。 */
const STAT_MIXIN_SNIPPET = `
function tryRegisterVueAppMixin(mixin) {
  try {
    uni.onCreateVueApp((vueApp) => {
      vueApp.mixin(mixin);
    });
    return true;
  } catch (_e) {}
  return false;
}
`

describe('runtime/injectOnCreateVueApp', () => {
  test('H5 inject 应静态替换字面量 uni.onCreateVueApp', () => {
    const plugin = uniViteInjectPlugin('uni:inject-test', injectOptions)
    const ctx = {
      parse: (code: string) => parse(code).program,
    } as unknown as TransformPluginContext
    const out = (plugin.transform as Function).call(
      ctx,
      STAT_MIXIN_SNIPPET,
      '/project/uni-stat-public.es.js'
    ) as { code: string }
    expect(out.code).toContain("from '@dcloudio/uni-h5'")
    expect(out.code).toContain('onCreateVueApp')
    expect(out.code).not.toMatch(/\buni\.onCreateVueApp\b/)
  })

  test('动态 u.onCreateVueApp 不会被 inject 替换（回归警示）', () => {
    const dynamicSnippet = `
function badRegister(mixin) {
  const u = globalThis.uni;
  u.onCreateVueApp((app) => app.mixin(mixin));
}
`
    const plugin = uniViteInjectPlugin('uni:inject-test', injectOptions)
    const ctx = {
      parse: (code: string) => parse(code).program,
    } as unknown as TransformPluginContext
    const out = (plugin.transform as Function).call(
      ctx,
      dynamicSnippet,
      '/project/bad.js'
    ) as { code: string } | null
    expect(out).toBeNull()
  })
})
