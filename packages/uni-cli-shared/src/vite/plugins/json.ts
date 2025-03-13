import path from 'path'
import type { Plugin } from 'vite'
import { parseJson } from '../../json'
import { preJson } from '../../preprocess'
import { parseVueRequest } from '../utils'

export function uniJsonPlugin(): Plugin {
  return {
    name: 'uni:json',
    enforce: 'pre',
    transform(code, id) {
      // 如果已经被其他插件处理过了，就不再处理，比如 commonjs 插件，ICAPRegistrar.json?commonjs-external
      if (id.startsWith('\0')) {
        return
      }
      if (path.extname(parseVueRequest(id).filename) !== '.json') {
        return
      }
      return {
        code: JSON.stringify(parseJson(preJson(code)), null, 2),
        map: {
          mappings: '',
        },
      }
    },
  }
}
