import path from 'path'
import fs from 'fs-extra'

import type { Plugin } from 'vite'
import type { SFCBlock } from '@vue/compiler-sfc'
import type { TransformPluginContext } from 'rollup'

import { normalizePath, parseVueRequest } from '@dcloudio/uni-cli-shared'

import {
  ResolvedOptions,
  createDescriptor,
  getDescriptor,
  getSrcDescriptor,
} from './descriptorCache'
import { createRollupError } from './error'
import { genClassName, isVue, parseImports } from '../utils'
import { genScript } from './code/script'
import { genTemplate } from './code/template'
import { genJsStylesCode, genStyle, transformStyle } from './code/style'

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

  async function transformMain(
    code: string,
    filename: string,
    options: ResolvedOptions,
    pluginContext: TransformPluginContext
  ) {
    // prev descriptor is only set and used for hmr
    const { descriptor, errors } = createDescriptor(filename, code, options)

    if (errors.length) {
      errors.forEach((error) =>
        pluginContext.error(createRollupError(filename, error))
      )
      return null
    }
    const isApp = isAppVue(filename)
    const fileName = path.relative(process.env.UNI_INPUT_DIR, filename)
    const className = genClassName(fileName)
    // 生成 script 文件
    pluginContext.emitFile({
      type: 'asset',
      fileName,
      source:
        genScript(descriptor, { filename: className }) +
        '\n' +
        genStyle(descriptor, { filename: fileName, className }) +
        '\n' +
        (!isApp
          ? genTemplate(descriptor, {
              targetLanguage: process.env.UNI_UVUE_TARGET_LANGUAGE as
                | 'kotlin'
                | 'swift',
              mode: 'function',
              filename: className,
              prefixIdentifiers: true,
            })
          : ''),
    })
    let jsCode = ''
    const content = descriptor.script?.content
    if (content) {
      jsCode += await parseImports(content)
    }
    if (descriptor.styles.length) {
      jsCode += '\n' + (await genJsStylesCode(descriptor, pluginContext))
    }
    jsCode += `\nexport default "${className}"`
    return {
      code: jsCode,
    }
  }

  return {
    name: 'uni:app-uvue',
    apply: 'build',
    async resolveId(id) {
      // serve sub-part requests (*?vue) as virtual modules
      if (parseVueRequest(id).query.vue) {
        return id
      }
    },

    load(id) {
      const { filename, query } = parseVueRequest(id)
      // select corresponding block for sub-part virtual modules
      if (query.vue) {
        if (query.src) {
          return fs.readFileSync(filename, 'utf-8')
        }
        const descriptor = getDescriptor(filename, options)!
        let block: SFCBlock | null | undefined
        if (query.type === 'style') {
          block = descriptor.styles[query.index!]
        } else if (query.index != null) {
          block = descriptor.customBlocks[query.index]
        }
        if (block) {
          return {
            code: block.content,
            map: block.map as any,
          }
        }
      }
    },
    async transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (!isVue(filename)) {
        return
      }
      if (!query.vue) {
        // main request
        return transformMain(code, filename, options, this)
      } else {
        // sub block request
        const descriptor = query.src
          ? getSrcDescriptor(filename)!
          : getDescriptor(filename, options)!

        if (query.type === 'style') {
          return transformStyle(
            code,
            descriptor,
            Number(query.index),
            options,
            this,
            filename
          )
        }
      }
    },
  }
}
