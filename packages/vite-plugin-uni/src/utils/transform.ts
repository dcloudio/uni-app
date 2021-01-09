import path from 'path'
import debug from 'debug'

import { TransformHook } from 'rollup'

const debugPre = debug('uni:pre')

const extensions = ['.vue', '.nvue', '.js', '.json', '.css']

export const transform: TransformHook = (code, id) => {
  const extname = path.extname(id)
  if (!extensions.includes(extname)) {
    return
  }
  // TODO
  debugPre(id)
  return code
}
