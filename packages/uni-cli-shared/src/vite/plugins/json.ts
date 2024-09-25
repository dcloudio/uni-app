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
      if (path.extname(parseVueRequest(id).filename) !== '.json') {
        return
      }
      return {
        code: JSON.stringify(parseJson(preJson(code)), null, 2),
        map: null,
      }
    },
  }
}
