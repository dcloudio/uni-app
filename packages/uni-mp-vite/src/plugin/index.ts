import { AliasOptions, ResolvedConfig } from 'vite'
import {
  CopyOptions,
  resolveBuiltIn,
  UniVitePlugin,
  genNVueCssCode,
  parseManifestJsonOnce,
  findMiniProgramTemplateFiles,
} from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { createConfigResolved } from './configResolved'
import { emitFile, getFilterFiles, getTemplateFiles } from './template'

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
    slot: {
      // 是否支持fallback content
      fallback: boolean
    }
    filter?: {
      extname: string
      tag: string
      generate: Parameters<typeof findMiniProgramTemplateFiles>[0]
    }
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
}

export function uniMiniProgramPlugin(
  options: UniMiniProgramPluginOptions
): UniVitePlugin {
  const {
    vite: { alias, copyOptions },
    template,
    style,
  } = options

  let isFirst = true
  let resolvedConfig: ResolvedConfig
  return {
    name: 'vite:uni-mp',
    uni: uniOptions({
      copyOptions,
      miniProgram: {
        directive: template.directive,
        emitFile,
        slot: template.slot,
      },
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
    configResolved(config) {
      resolvedConfig = config
      return createConfigResolved(options)!(config)
    },
    generateBundle() {
      if (template.filter) {
        const extname = template.filter.extname
        const filterFiles = getFilterFiles(resolvedConfig, this.getModuleInfo)
        Object.keys(filterFiles).forEach((filename) => {
          this.emitFile({
            type: 'asset',
            fileName: filename + extname,
            source: filterFiles[filename],
          })
        })
      }
      const templateFiles = getTemplateFiles(template)
      Object.keys(templateFiles).forEach((filename) => {
        this.emitFile({
          type: 'asset',
          fileName: filename + template.extname,
          source: templateFiles[filename],
        })
      })
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
