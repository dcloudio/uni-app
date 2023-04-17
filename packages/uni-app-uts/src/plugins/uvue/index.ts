import path from 'path'
import fs from 'fs-extra'
import { normalizePath, parseVueRequest } from '@dcloudio/uni-cli-shared'
import type { Plugin } from 'vite'

import { ResolvedOptions, createDescriptor } from './descriptorCache'
import { createRollupError } from './error'
import { genClassName, parseImports } from '../utils'
import { genScript } from './code/script'
import { genTemplate } from './code/template'
import { genStyle } from './code/style'

function resolveAppVue(inputDir: string) {
  const appUVue = path.resolve(inputDir, 'app.uvue')
  if (fs.existsSync(appUVue)) {
    return normalizePath(appUVue)
  }
  return normalizePath(path.resolve(inputDir, 'App.vue'))
}

export function uniAppUVuePlugin(): Plugin {
  const options: ResolvedOptions = {
    root: process.env.UNI_INPUT_DIR,
    sourceMap: false,
    // eslint-disable-next-line no-restricted-globals
    compiler: require('@vue/compiler-sfc'),
  }

  const appVue = resolveAppVue(process.env.UNI_INPUT_DIR)
  function isAppVue(id: string) {
    return normalizePath(id) === appVue
  }

  return {
    name: 'uni:app-uvue',
    apply: 'build',
    transform(code, id) {
      const { filename } = parseVueRequest(id)
      const isVue = filename.endsWith('.vue') || filename.endsWith('.uvue')
      if (!isVue) {
        return
      }
      // prev descriptor is only set and used for hmr
      const { descriptor, errors } = createDescriptor(filename, code, options)

      if (errors.length) {
        errors.forEach((error) =>
          this.error(createRollupError(filename, error))
        )
        return null
      }
      const isApp = isAppVue(id)
      const fileName = path.relative(process.env.UNI_INPUT_DIR, id)
      const className = genClassName(fileName)
      // 生成 script 文件
      this.emitFile({
        type: 'asset',
        fileName,
        source:
          genScript(descriptor.script, { filename: className }) +
          '\n' +
          genStyle(descriptor.styles, { filename: className }) +
          '\n' +
          (!isApp
            ? genTemplate(descriptor.template, {
                targetLanguage: process.env.UNI_UVUE_TARGET_LANGUAGE as
                  | 'kotlin'
                  | 'swift',
                mode: 'function',
                filename: className,
              })
            : ''),
      })
      const content = descriptor.script?.content
      if (content) {
        return parseImports(content)
      }
      return {
        code: 'export default {}',
      }
    },
  }
}
