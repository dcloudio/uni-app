import path from 'path'
import fs from 'fs-extra'
import { OutputBundle, PluginContext } from 'rollup'
import {
  UniVitePlugin,
  emptyDir,
  getUTSEasyComAutoImports,
  normalizePath,
  parseManifestJsonOnce,
  parseUniExtApiNamespacesOnce,
  parseVueRequest,
  resolveMainPathOnce,
  resolveUTSCompiler,
  utsPlugins,
} from '@dcloudio/uni-cli-shared'
import {
  DEFAULT_APPID,
  parseImports,
  parseUTSRelativeFilename,
  uvueOutDir,
  getUniCloudSpaceList,
  getUniCloudObjectInfo,
  getExtApiComponents,
  UVUE_CLASS_NAME_PREFIX,
  createTryResolve,
} from './utils'
import { getOutputManifestJson } from './manifestJson'
import { configResolved, createUniOptions } from '../utils'
import { genClassName } from '../..'

const uniCloudSpaceList = getUniCloudSpaceList()

let isFirst = true
export function uniAppPlugin(): UniVitePlugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const mainUTS = resolveMainPathOnce(inputDir)
  const tempOutputDir = uvueOutDir()
  const manifestJson = parseManifestJsonOnce(inputDir)
  // 预留一个口子，方便切换测试
  const split = manifestJson['uni-app-x']?.split
  // 开始编译时，清空输出目录
  function emptyOutDir() {
    if (fs.existsSync(outputDir)) {
      emptyDir(outputDir)
    }
  }
  emptyOutDir()

  return {
    name: 'uni:app-uts',
    apply: 'build',
    uni: createUniOptions('android'),
    config() {
      return {
        base: '/', // 强制 base
        build: {
          outDir: tempOutputDir,
          lib: {
            // 必须使用 lib 模式
            fileName: 'output',
            entry: resolveMainPathOnce(inputDir),
            formats: ['cjs'],
          },
          rollupOptions: {
            external(source) {
              if (
                ['vue', 'vuex', 'pinia', '@dcloudio/uni-app'].includes(source)
              ) {
                return true
              }
              // 相对目录
              if (source.startsWith('@/') || source.startsWith('.')) {
                return false
              }
              if (path.isAbsolute(source)) {
                return false
              }
              // android 系统库，三方库
              if (source.includes('.')) {
                return true
              }
              return false
            },
            output: {
              chunkFileNames(chunk) {
                // if (chunk.isDynamicEntry && chunk.facadeModuleId) {
                //   const { filename } = parseVueRequest(chunk.facadeModuleId)
                //   if (filename.endsWith('.nvue')) {
                //     return (
                //       removeExt(
                //         normalizePath(path.relative(inputDir, filename))
                //       ) + '.js'
                //     )
                //   }
                // }
                return '[name].js'
              },
            },
          },
        },
      }
    },
    configResolved(config) {
      configResolved(config, true)
    },
    async transform(code, id) {
      if (process.env.UNI_APP_X_TSC === 'true') {
        return
      }
      const { filename } = parseVueRequest(id)
      if (!filename.endsWith('.uts') && !filename.endsWith('.ts')) {
        return
      }
      // 仅处理 uts 文件
      // 忽略 uni-app-uts/lib/automator/index.uts
      if (!filename.includes('uni-app-uts')) {
        const isMainUTS = normalizePath(id) === mainUTS
        const fileName = path.relative(inputDir, id)
        this.emitFile({
          type: 'asset',
          fileName: normalizeFilename(fileName, isMainUTS),
          source: normalizeCode(code, isMainUTS),
        })
      }
      code = await parseImports(
        code,
        createTryResolve(id, this.resolve.bind(this))
      )
      return code
    },
    generateBundle(_, bundle) {
      // 开发者仅在 script 中引入了 easyCom 类型，但模板里边没用到，此时额外生成一个辅助的.uvue文件
      checkUTSEasyComAutoImports(inputDir, bundle, this)
    },
    async writeBundle() {
      let pageCount = 0
      if (isFirst) {
        isFirst = false
        // 自动化测试时，不显示页面数量进度条
        if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
          pageCount = parseInt(process.env.UNI_APP_X_PAGE_COUNT) || 0
        }
      }
      const res = await resolveUTSCompiler().compileApp(
        path.join(tempOutputDir, 'main.uts'),
        {
          pageCount,
          uniCloudObjectInfo: getUniCloudObjectInfo(uniCloudSpaceList),
          split: split !== false,
          disableSplitManifest: process.env.NODE_ENV !== 'development',
          inputDir: tempOutputDir,
          outputDir: outputDir,
          package:
            'uni.' + (manifestJson.appid || DEFAULT_APPID).replace(/_/g, ''),
          sourceMap: process.env.NODE_ENV === 'development',
          uni_modules: [...utsPlugins],
          extApis: parseUniExtApiNamespacesOnce(
            process.env.UNI_UTS_PLATFORM,
            process.env.UNI_UTS_TARGET_LANGUAGE
          ),
          extApiComponents: [...getExtApiComponents()],
          uvueClassNamePrefix: UVUE_CLASS_NAME_PREFIX,
          autoImports: getUTSEasyComAutoImports(),
        }
      )
      if (res) {
        if (process.env.NODE_ENV === 'development') {
          const files: string[] = []
          if (process.env.UNI_APP_UTS_CHANGED_FILES) {
            try {
              files.push(...JSON.parse(process.env.UNI_APP_UTS_CHANGED_FILES))
            } catch (e) {}
          }
          if (res.changed) {
            // 触发了kotlinc编译，且没有编译成功
            if (!res.changed.length && res.kotlinc) {
              throw new Error('编译失败')
            }
            files.push(...res.changed)
          }
          process.env.UNI_APP_UTS_CHANGED_FILES = JSON.stringify([
            ...new Set(files),
          ])
        } else {
          // 生产环境，记录使用到的modules
          const modules = res.inject_modules
          const manifest = getOutputManifestJson()!
          if (manifest) {
            // 执行了摇树逻辑，就需要设置 modules 节点
            const app = manifest.app
            if (!app.distribute) {
              app.distribute = {}
            }
            if (!app.distribute.modules) {
              app.distribute.modules = {}
            }
            if (modules) {
              modules.forEach((name) => {
                const value = app.distribute.modules[name]
                app.distribute.modules[name] =
                  typeof value === 'object' && value !== null ? value : {}
              })
            }
            fs.outputFileSync(
              path.resolve(process.env.UNI_OUTPUT_DIR, 'manifest.json'),
              JSON.stringify(manifest, null, 2)
            )
          }
        }
      }
    },
  }
}

function normalizeFilename(filename: string, isMain = false) {
  if (isMain) {
    return 'main.uts'
  }
  return parseUTSRelativeFilename(filename)
}

function normalizeCode(code: string, isMain = false) {
  if (!isMain) {
    return code
  }
  const automatorCode = process.env.UNI_AUTOMATOR_WS_ENDPOINT
    ? 'initAutomator();'
    : ''
  return `${code}
export function main(app: IApp) {
    definePageRoutes();
    defineAppConfig();
    ${automatorCode}
    (createApp()['app'] as VueApp).mount(app);
}
`
}

function checkUTSEasyComAutoImports(
  inputDir: string,
  bundle: OutputBundle,
  ctx: PluginContext
) {
  const res = getUTSEasyComAutoImports()
  Object.keys(res).forEach((fileName) => {
    if (fileName.startsWith('@/')) {
      fileName = fileName.slice(2)
    }
    const relativeFileName = parseUTSRelativeFilename(fileName, inputDir)
    if (!bundle[relativeFileName]) {
      const className = genClassName(relativeFileName, UVUE_CLASS_NAME_PREFIX)
      ctx.emitFile({
        type: 'asset',
        fileName: relativeFileName,
        source: `function ${className}Render(): any | null { return null }
const ${className}Styles = []`,
      })
    }
  })
  return res
}
