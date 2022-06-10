import { parse } from 'jsonc-parser'
import { preJson } from '../preprocess'

export function parseJson<T = any>(jsonStr: string, shouldPre: boolean = false): T {
  return parse(shouldPre ? preJson(jsonStr) : jsonStr);
}
