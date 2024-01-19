import { parse } from 'jsonc-parser'
import { preJson, preUVueJson } from '../preprocess'

export function parseJson(jsonStr: string, shouldPre: boolean = false) {
  return parse(
    shouldPre
      ? process.env.UNI_APP_X === 'true'
        ? preUVueJson(jsonStr)
        : preJson(jsonStr)
      : jsonStr
  )
}
