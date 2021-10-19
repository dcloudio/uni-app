import path from 'path'
import debug from 'debug'
import fs from 'fs-extra'
import { AliasOptions } from 'vite'
import {
  CopyOptions,
  EXTNAME_VUE_RE,
  normalizeNodeModules,
  resolveBuiltIn,
  UniVitePlugin,
  genNVueCssCode,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { createConfigResolved } from './configResolved'
import { EmittedFile } from 'rollup'

const debugMp = debug('vite:uni:mp')
export interface UniMiniProgramPluginOptions {
  vite: {
    alias: AliasOptions
    copyOptions: CopyOptions
    inject: {
      [name: string]: [string, string]
    }
  }
  global: string
  app: {
    darkmode: boolean
    subpackages: boolean
  }
  project?: {
    filename: string
    source: Record<string, any>
  }
  template: {
    extname: string
    directive: string
  }
  style: {
    extname: string
    cssVars: {
      '--status-bar-height': string
      '--window-top': string
      '--window-bottom': string
      '--window-left': string
      '--window-right': string
    }
  }
  filter?: {
    extname: string
    tag: string
  }
}

export function uniMiniProgramPlugin(
  options: UniMiniProgramPluginOptions
): UniVitePlugin {
  const {
    vite: { alias, copyOptions },
    template,
    style,
  } = options
  const emitFile: (emittedFile: EmittedFile) => string = (emittedFile) => {
    if (emittedFile.type === 'asset') {
      const filename = emittedFile.fileName!
      const outputFilename = normalizeNodeModules(
        path.resolve(
          process.env.UNI_OUTPUT_DIR,
          path.relative(process.env.UNI_INPUT_DIR, filename)
        )
      ).replace(EXTNAME_VUE_RE, template.extname)
      debugMp(outputFilename)
      fs.outputFile(outputFilename, emittedFile.source!)
      return outputFilename
    }
    return ''
  }
  let isFirst = true
  return {
    name: 'vite:uni-mp',
    uni: uniOptions({
      copyOptions,
      miniProgram: { directive: template.directive, emitFile },
    }),
    config() {
      return {
        resolve: {
          alias: {
            vue: resolveBuiltIn('@dcloudio/uni-mp-vue'),
            ...alias,
          },
        },
        build: buildOptions(),
      }
    },
    configResolved: createConfigResolved(options),
    generateBundle() {
      if (isFirst) {
        // 仅生成一次
        isFirst = false
        this.emitFile({
          type: 'asset',
          fileName: 'nvue' + style.extname,
          source: genNVueCssCode(
            parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
          ),
        })
      }
    },
  }
}
