import { AliasOptions, ResolvedConfig } from 'vite'
import {
  CopyOptions,
  resolveBuiltIn,
  UniVitePlugin,
  genNVueCssCode,
  parseManifestJsonOnce,
  findMiniProgramTemplateFiles,
  MiniProgramCompilerOptions,
} from '@dcloudio/uni-cli-shared'

import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { createConfigResolved } from './configResolved'
import { emitFile, getFilterFiles, getTemplateFiles } from './template'

import { getNVueCssPaths } from '../plugins/pagesJson'

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
    event?: MiniProgramCompilerOptions['event']
    class: MiniProgramCompilerOptions['class']
    slot: MiniProgramCompilerOptions['slot']
    filter?: {
      lang: string
      extname: string
      generate: Parameters<typeof findMiniProgramTemplateFiles>[0]
    }
    compilerOptions?: CompilerOptions
  }
  style: {
    extname: string
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

  let nvueCssEmitted = false

  let resolvedConfig: ResolvedConfig
  return {
    name: 'vite:uni-mp',
    uni: uniOptions({
      copyOptions,
      miniProgram: {
        event: template.event,
        class: template.class,
        filter: template.filter ? { lang: template.filter.lang } : undefined,
        directive: template.directive,
        emitFile,
        slot: template.slot,
      },
      compilerOptions: template.compilerOptions,
    }),
    config() {
      return {
        resolve: {
          alias: {
            vue: resolveBuiltIn('@dcloudio/uni-mp-vue'),
            '@vue/devtools-api': resolveBuiltIn('@dcloudio/uni-mp-vue'),
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
          const { code } = filterFiles[filename]
          this.emitFile({
            type: 'asset',
            fileName: filename + extname,
            source: code,
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
      if (!nvueCssEmitted) {
        const nvueCssPaths = getNVueCssPaths(resolvedConfig)
        if (nvueCssPaths && nvueCssPaths.length) {
          nvueCssEmitted = true
          this.emitFile({
            type: 'asset',
            fileName: 'nvue' + style.extname,
            source: genNVueCssCode(
              parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
            ),
          })
        }
      }
    },
  }
}
