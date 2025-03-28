import path from 'path'
import type { Plugin } from 'vite'

import { EXTNAME_VUE, parseVueRequest } from '@dcloudio/uni-cli-shared'

const WXS_RE = /vue&type=(wxs|renderjs)/
export function uniPostVuePlugin(): Plugin {
  return {
    name: 'uni:post-vue',
    apply: 'serve',
    enforce: 'post',
    async transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (query.vue) {
        return
      }
      if (!EXTNAME_VUE.includes(path.extname(filename))) {
        return
      }
      if (!WXS_RE.test(code)) {
        return
      }
      const hmrId = parseHmrId(code)
      if (!hmrId) {
        return
      }
      // TODO 内部解决 @vitejs/plugin-vue 自定义块外链热刷的问题
      // https://github.com/vitejs/vite/blob/main/packages/plugin-vue/src/main.ts#L387
      // 没有增加 src=descriptor.id
      // 包含外链 wxs,renderjs
      code = code.replace(
        /vue&type=(wxs|renderjs)&index=([0-9]+)&src&/gi,
        (_, type, index) => {
          return `vue&type=${type}&index=${index}&src=${hmrId}&`
        }
      )
      return {
        code: code, // 暂不提供sourcemap,意义不大
        map: null,
      }
    },
  }
}

function parseHmrId(code: string) {
  const matches = code.match(/_sfc_main.__hmrId = "(.*)"/)
  return matches && matches[1]
}
