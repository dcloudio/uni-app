import { AliasOptions, ResolvedConfig } from 'vite'
import {
  CopyOptions,
  resolveBuiltIn,
  UniVitePlugin,
  genNVueCssCode,
  parseManifestJsonOnce,
  findMiniProgramTemplateFiles,
  MiniProgramCompilerOptions,
  initPostcssPlugin,
  parseRpx2UnitOnce,
  AppJson,
  resolveVueI18nRuntime,
} from '@dcloudio/uni-cli-shared'

import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { createConfigResolved } from './configResolved'
import { emitFile, getFilterFiles, getTemplateFiles } from './template'

import { getNVueCssPaths } from '../plugins/pagesJson'
import {
  rewriteCompilerSfcParseOnce,
  rewriteCompileScriptOnce,
} from './polyfill'

export interface UniMiniProgramPluginOptions {
  cdn?: number
  vite: {
    alias: AliasOptions
    copyOptions: CopyOptions
    inject: {
      [name: string]: [string, string]
    }
  }
  global: string
  json?: {
    windowOptionsMap?: Record<string, string>
    tabBarOptionsMap?: Record<string, string>
    tabBarItemOptionsMap?: Record<string, string>
    formatAppJson?: (
      appJson: Record<string, any>,
      manifestJson: Record<string, any>,
      pagesJson: Record<string, any>
    ) => void
  }
  app: {
    /**
     * 是否支持darkmode
     */
    darkmode?: boolean
    /**
     * 是否支持subpackages
     */
    subpackages?: boolean
    /**
     * 是否支持发行插件
     */
    plugins?: boolean
    /**
     * 是否支持全局组件
     */
    usingComponents: boolean
    normalize?: (appJson: AppJson) => AppJson
  }
  project?: {
    filename: string
    config: string[]
    source: Record<string, any>
    normalize?: (
      projectJson: Record<string, unknown>
    ) => Record<string, unknown>
  }
  template: {
    extname: string
    directive: string
    event?: MiniProgramCompilerOptions['event']
    class: MiniProgramCompilerOptions['class']
    slot: MiniProgramCompilerOptions['slot']
    lazyElement?: MiniProgramCompilerOptions['lazyElement']
    component?: MiniProgramCompilerOptions['component']
    customElements?: string[]
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

  rewriteCompileScriptOnce()
  rewriteCompilerSfcParseOnce()

  return {
    name: 'uni:mp',
    uni: uniOptions({
      copyOptions,
      customElements: template.customElements,
      miniProgram: {
        event: template.event,
        class: template.class,
        filter: template.filter ? { lang: template.filter.lang } : undefined,
        directive: template.directive,
        lazyElement: template.lazyElement,
        component: template.component,
        emitFile,
        slot: template.slot,
      },
      compilerOptions: template.compilerOptions,
    }),
    config() {
      return {
        base: '/', // 小程序平台强制 base
        resolve: {
          alias: {
            vue: resolveBuiltIn('@dcloudio/uni-mp-vue'),
            '@vue/devtools-api': resolveBuiltIn('@dcloudio/uni-mp-vue'),
            'vue-i18n': resolveVueI18nRuntime(),
            ...alias,
          },
          preserveSymlinks: true,
        },
        css: {
          postcss: {
            plugins: initPostcssPlugin({
              uniApp: parseRpx2UnitOnce(
                process.env.UNI_INPUT_DIR,
                process.env.UNI_PLATFORM
              ),
            }),
          },
        },
        optimizeDeps: {
          disabled: true,
        },
        build: buildOptions(),
      }
    },
    configResolved(config) {
      resolvedConfig = config
      return (createConfigResolved(options) as Function)(config)
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
