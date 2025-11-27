import path from 'path'
import { normalizePath } from '../utils'
import { genUTSClassName } from '../utsUtils'

export function genDom2ClassName(
  filename: string,
  inputDir: string,
  prefix = 'Gen'
) {
  if (process.env.UNI_UTS_MODULE_TYPE === 'built-in') {
    return genUTSClassName(path.basename(filename), 'Uni')
  }
  return genUTSClassName(
    normalizePath(
      path.isAbsolute(filename) ? path.relative(inputDir, filename) : filename
    ),
    prefix
  )
}
