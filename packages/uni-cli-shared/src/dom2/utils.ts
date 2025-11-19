import path from 'path'
import { normalizePath } from '../utils'
import { genUTSClassName } from '../utsUtils'

export function genDom2ClassName(
  filename: string,
  inputDir: string,
  prefix = 'Gen'
) {
  return genUTSClassName(
    normalizePath(
      path.isAbsolute(filename) ? path.relative(inputDir, filename) : filename
    ),
    prefix
  )
}
