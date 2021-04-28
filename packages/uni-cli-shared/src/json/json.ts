import { parse } from 'jsonc-parser'
import { preJson } from '../preprocess'

export function parseJson(jsonStr: string, shouldPre: boolean = false) {
  return parse(shouldPre ? preJson(jsonStr) : jsonStr)
}
