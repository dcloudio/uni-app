import path from 'path'
import type { Plugin } from 'vite'

import {
  EXTNAME_VUE,
  X_EXTNAME_VUE,
  clearMiniProgramTemplateFilter,
  normalizeMiniProgramFilename,
  parseVueCode,
  parseVueRequest,
  removeExt,
} from '@dcloudio/uni-cli-shared'

export function uniPreVuePlugin(): Plugin {
  let isNVue = false
  return {
    name: 'uni:pre-vue',
    config(config) {
      isNVue = (config as any).nvue
    },
    async transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (query.vue) {
        return
      }
      if (
        !(
          process.env.UNI_APP_X === 'true' ? X_EXTNAME_VUE : EXTNAME_VUE
        ).includes(path.extname(filename))
      ) {
        return
      }
      // 清空当前页面已缓存的 filter 信息
      clearMiniProgramTemplateFilter(
        removeExt(normalizeMiniProgramFilename(id, process.env.UNI_INPUT_DIR))
      )
      return {
        code: parseVueCode(code, isNVue).code, // 暂不提供sourcemap,意义不大
        map: null,
      }
    },
  }
}
