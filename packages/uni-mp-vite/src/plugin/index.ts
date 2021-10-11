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
  }
  global: string
  app: {
    darkmode: boolean
    subpackages: boolean
  }
  project: {
    filename: string
    source: Record<string, unknown>
  }
  template: {
    extname: string
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
      fs.outputFileSync(outputFilename, emittedFile.source!)
      return outputFilename
    }
    return ''
  }
  return {
    name: 'vite:uni-mp',
    uni: uniOptions({
      copyOptions,
      miniProgram: { emitFile },
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
  }
}
