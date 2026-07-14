import fs from 'fs-extra'
import path from 'path'
import type { AliasOptions, ResolvedConfig } from 'vite'
import {
  type AppJson,
  type CopyOptions,
  type MiniProgramCompilerOptions,
  type MiniProgramFilterOptions,
  type UniVitePlugin,
  type findMiniProgramTemplateFiles,
  genNVueCssCode,
  initPostcssPlugin,
  normalizeMiniProgramFilename,
  parseManifestJsonOnce,
  parseRpx2UnitOnce,
  parseUniXFlexDirection,
  preCss,
  relativeFile,
  removeExt,
  resolveBuiltIn,
  resolvePiniaAlias,
  resolveVueI18nRuntimeAlias,
} from '@dcloudio/uni-cli-shared'

import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { createConfigResolved } from './configResolved'
import { normalizeCopyOptions } from './copy'
import { emitFile, getFilterFiles, getTemplateFiles } from './template'

import {
  getIndependentRootByFilename,
  getIndependentSubPackages,
} from '../plugins/independentUtils'
import { getNVueCssPaths } from '../plugins/pagesJson'
import {
  rewriteCompileScriptOnce,
  rewriteCompilerSfcParseOnce,
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
     * 是否支持独立分包
     */
    independentSubpackages?: boolean
    /**
     * 是否支持发行插件
     */
    plugins?: boolean
    /**
     * 是否支持全局组件
     */
    usingComponents: boolean
    /**
     * 是否支持workers
     */
    workers?: boolean
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
      setStyle?: boolean
      generate: Parameters<typeof findMiniProgramTemplateFiles>[0]
    }
    compilerOptions?: CompilerOptions
    checkPropName?: MiniProgramCompilerOptions['checkPropName']
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
  const normalizedCopyOptions = normalizeCopyOptions(copyOptions, options)

  let resetCssEmitted = false

  let autoImportFilterEmitted = false

  let resolvedConfig: ResolvedConfig

  rewriteCompileScriptOnce(style.extname)
  rewriteCompilerSfcParseOnce()

  return {
    name: 'uni:mp',
    uni: uniOptions({
      copyOptions: normalizedCopyOptions,
      customElements: template.customElements,
      miniProgram: {
        event: template.event,
        class: template.class,
        filter: template.filter
          ? {
              lang: template.filter.lang,
              setStyle: template.filter.setStyle,
              generate: createAutoImportFilterGenerate(
                template.filter.generate
              ),
            }
          : undefined,
        directive: template.directive,
        lazyElement: template.lazyElement,
        component: template.component,
        emitFile,
        slot: template.slot,
        checkPropName: template.checkPropName,
      },
      compilerOptions: template.compilerOptions,
    }),
    config() {
      return {
        base: process.env.UNI_SUBPACKAGE
          ? '/' + process.env.UNI_SUBPACKAGE + '/'
          : '/', // 编译为分包时以分包名为基础路径
        resolve: {
          alias: {
            vue: resolveBuiltIn(
              `@dcloudio/uni-mp-vue/${
                process.env.UNI_APP_X === 'true' ? 'dist-x' : 'dist'
              }/vue.runtime.esm.js`
            ),
            ...resolveVueI18nRuntimeAlias(),
            // 项目未安装 pinia 时使用内部版本及其依赖
            ...resolvePiniaAlias(),
            '@vue/devtools-api': resolveBuiltIn('@dcloudio/uni-mp-vue'),
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
          noDiscovery: true,
          include: [],
        },
        build: buildOptions(options),
      }
    },
    configResolved(config) {
      resolvedConfig = config

      const plugin = config.plugins.find((p) => p.name === 'vite:vue')
      if (plugin?.api?.options) {
        plugin.api.options.devToolsEnabled = false
      }

      return (createConfigResolved(options) as Function)(config)
    },
    generateBundle() {
      const isX = process.env.UNI_APP_X === 'true'
      if (template.filter) {
        const extname = template.filter.extname
        if (isX) {
          if (process.env.UNI_COMPILE_TARGET !== 'uni_modules') {
            // 目前 mp-weixin（mp-qq）、mp-alipay（mp-dingtalk）、mp-toutiao（mp-lark）均支持视图层setStyle
            if (template.filter.setStyle && !autoImportFilterEmitted) {
              autoImportFilterEmitted = true
              let uniViewPath = '../../lib/filters/uniView.cjs.js'
              // 支付宝小程序 sjs 只支持 import/export
              if (process.env.UNI_PLATFORM === 'mp-alipay') {
                uniViewPath = '../../lib/filters/uniView.esm.js'
              }
              const uniViewSource = fs.readFileSync(
                path.resolve(__dirname, uniViewPath),
                'utf8'
              )
              this.emitFile({
                type: 'asset',
                fileName: `common/uniView${extname}`,
                source: uniViewSource,
              })
              getIndependentSubPackages().forEach(({ root }) => {
                this.emitFile({
                  type: 'asset',
                  fileName: `${root}/common/uniView${extname}`,
                  source: uniViewSource,
                })
              })
            }
          }
        }
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
      if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
        return
      }
      if (!resetCssEmitted) {
        if (isX) {
          resetCssEmitted = true
          const uvueCssSource = genUVueCssCode(
            parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
          )
          this.emitFile({
            type: 'asset',
            fileName: 'uvue' + style.extname,
            source: uvueCssSource,
          })
          getIndependentSubPackages().forEach(({ root }) => {
            this.emitFile({
              type: 'asset',
              fileName: `${root}/uvue${style.extname}`,
              source: uvueCssSource,
            })
          })
        } else {
          const nvueCssPaths = getNVueCssPaths(resolvedConfig)
          if (nvueCssPaths && nvueCssPaths.length) {
            resetCssEmitted = true
            const nvueCssSource = genNVueCssCode(
              parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
            )
            this.emitFile({
              type: 'asset',
              fileName: 'nvue' + style.extname,
              source: nvueCssSource,
            })
            getIndependentSubPackages().forEach(({ root }) => {
              this.emitFile({
                type: 'asset',
                fileName: `${root}/nvue${style.extname}`,
                source: nvueCssSource,
              })
            })
          }
        }
      }
    },
  }
}

function createAutoImportFilterGenerate(
  generate: Parameters<typeof findMiniProgramTemplateFiles>[0]
) {
  return (
    filter: MiniProgramFilterOptions,
    filename: string,
    ownerFilename?: string
  ) => {
    return generate?.(
      filter,
      ownerFilename
        ? resolveAutoImportFilterFilename(filter, filename, ownerFilename)
        : filename
    )
  }
}

function resolveAutoImportFilterFilename(
  filter: Omit<MiniProgramFilterOptions, 'code'>,
  filename: string,
  ownerFilename: string
) {
  const inputDir = process.env.UNI_INPUT_DIR
  if (!inputDir) {
    return filename
  }
  const resolvedFilename = path.isAbsolute(ownerFilename)
    ? ownerFilename
    : path.resolve(inputDir, ownerFilename)
  const independentRoot = getIndependentRootByFilename(
    resolvedFilename,
    inputDir
  )
  if (!independentRoot) {
    return filename
  }
  const templateFilename = removeExt(
    normalizeMiniProgramFilename(resolvedFilename, inputDir)
  )
  return relativeFile(
    templateFilename,
    `${independentRoot}/common/${filter.id}`
  )
}

export function genUVueCssCode(manifestJson: Record<string, any>) {
  let cssCode = preCss(
    fs.readFileSync(path.resolve(__dirname, '../../lib/uvue.css'), 'utf8'),
    'uvue.css'
  )
  const flexDirection = parseUniXFlexDirection(manifestJson)
  if (flexDirection !== 'column') {
    cssCode = cssCode.replace('column', flexDirection)
  }
  return cssCode
}
