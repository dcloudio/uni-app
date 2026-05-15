const ROLLDOWN_APP_EXTERNALS: Record<string, string> = {
  vue: 'vue',
  '@vue/shared': '__vue_shared',
}

const ROLLDOWN_ESBUILD_EXTERNALS: Record<string, string> = {
  vue: 'require_vue()',
  vuex: 'require_vuex()',
  pinia: 'require_pinia()',
}

const APP_EXTERNAL_REQUIRE_RE = /\brequire\(\s*(['"])(vue|@vue\/shared)\1\s*\)/g
const ESBUILD_EXTERNAL_REQUIRE_RE =
  /\b__require\(\s*(['"])(vue|vuex|pinia)\1\s*\)/g

export function replaceRolldownAppExternalRequire(code: string) {
  if (!code.includes('require')) {
    return code
  }
  // pinia@2 依赖的 vue-demi 会 export * from 'vue'，Rolldown 在处理
  // external re-export 时会生成 __reExport(..., require('vue'))。
  // App 运行时没有 CommonJS require，这里改回 output.globals 对应的局部变量。
  return code.replace(
    APP_EXTERNAL_REQUIRE_RE,
    (_match, _quote, id: keyof typeof ROLLDOWN_APP_EXTERNALS) => {
      return ROLLDOWN_APP_EXTERNALS[id]
    }
  )
}

export function replaceRolldownEsbuildExternalRequire(code: string) {
  if (!code.includes('__require')) {
    return code
  }
  // 普通 nvue 页面也可能受到 pinia@2/vue-demi 间接影响，产生 external require。
  // 页面会再经过 esbuild 包成 IIFE，require 会被转成 __require，因此这里改为
  // esbuildGlobalPlugin 生成的全局桥接函数。
  return code.replace(
    ESBUILD_EXTERNAL_REQUIRE_RE,
    (_match, _quote, id: keyof typeof ROLLDOWN_ESBUILD_EXTERNALS) => {
      return ROLLDOWN_ESBUILD_EXTERNALS[id]
    }
  )
}
