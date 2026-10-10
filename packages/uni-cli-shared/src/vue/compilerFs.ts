import fs from 'fs-extra'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import { preJs } from '../preprocess'
import { normalizePath } from '../utils'

export function createVueCompilerFs(): NonNullable<
  SFCScriptCompileOptions['fs']
> {
  function resolveFile(file: string) {
    return file.startsWith('@/')
      ? file.replace('@', normalizePath(process.env.UNI_INPUT_DIR))
      : file
  }
  return {
    fileExists(file) {
      return fs.existsSync(resolveFile(file))
    },
    readFile(file) {
      const filename = resolveFile(file)
      return preJs(fs.readFileSync(filename, 'utf-8'), filename)
    },
    realpath: resolveFile,
  }
}
