import path from 'path'
import type { Plugin } from 'vite'

import {
  EXTNAME_VUE,
  X_EXTNAME_VUE,
  clearMiniProgramTemplateFilter,
  isUniPageFile,
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
      if (
        process.env.UNI_APP_X_DOM2 === 'true' &&
        process.env.UNI_INPUT_DIR &&
        isUniPageFile(filename)
      ) {
        // dom2 页面模板编译会读取 pages.json 中的页面配置，
        // 需要让 pages.json 变更时重新 transform 页面，避免复用旧模板产物。
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'))
      }
      return {
        code: parseVueCode(code, isNVue).code, // 暂不提供sourcemap,意义不大
        map: null,
      }
    },
  }
}
