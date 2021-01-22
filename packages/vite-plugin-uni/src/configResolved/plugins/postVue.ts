import debug from 'debug'
import qs from 'querystring'
import { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'

import { UniPluginFilterOptions } from '.'

const debugPostVue = debug('uni:post-vue')

export function uniPostVuePlugin(options: UniPluginFilterOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'vite:uni-post-vue',
    transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (!query.vue && !filter(filename)) {
        return
      }
      if (query.vue) {
        debugPostVue(id)
        // TODO
        // 目前 vite 在 process.env.DEBUG 时，会追加 sourcemap 对象到文件中，如果 source 中包含/**/注释，会报错
        // 暂时移除此类请求的 sourcemap
        ;(this as any).sourcemapChain.length = 0
        return code
      }
    },
  }
}

interface VueQuery {
  vue?: boolean
  src?: boolean
  type?: 'script' | 'template' | 'style' | 'custom'
  index?: number
  lang?: string
}

function parseVueRequest(id: string) {
  const [filename, rawQuery] = id.split(`?`, 2)
  const query = qs.parse(rawQuery) as VueQuery
  if (query.vue != null) {
    query.vue = true
  }
  if (query.src != null) {
    query.src = true
  }
  if (query.index != null) {
    query.index = Number(query.index)
  }
  return {
    filename,
    query,
  }
}
