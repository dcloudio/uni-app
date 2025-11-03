// 注意：该文件尽可能少依赖其他文件，否则可能会导致还没有alias的时候，就加载了目标模块

import fs from 'fs'
import path from 'path'
import moduleAlias from 'module-alias'
import { isInHBuilderX } from './utils'
import type { Formatter } from '../logs/format'

const hbxPlugins = {
  typescript: 'compile-typescript/node_modules/typescript',
  less: 'compile-less/node_modules/less',
  sass: 'compile-dart-sass/node_modules/sass',
  stylus: 'compile-stylus/node_modules/stylus',
  pug: 'compile-pug-cli/node_modules/pug',
} as const

export function initModuleAlias() {
  const libDir = path.resolve(__dirname, '../../lib')
  const compilerSfcPath = path.resolve(libDir, '@vue/compiler-sfc')
  const serverRendererPath = require.resolve('@vue/server-renderer')
  // TODO 临时开关启用vapor
  if (
    !process.env.UNI_VUE_VAPOR &&
    process.env.UNI_INPUT_DIR &&
    // 该代码执行较早，不能使用UNI_UTS_PLATFORM
    (process.env.UNI_PLATFORM === 'app-harmony' ||
      (process.env.UNI_PLATFORM === 'app' &&
        process.env.UNI_APP_PLATFORM === 'ios'))
  ) {
    const vaporConfig = path.resolve(process.env.UNI_INPUT_DIR, '.vapor')
    if (fs.existsSync(vaporConfig)) {
      process.env.UNI_VUE_VAPOR = 'true'
      if (fs.readFileSync(vaporConfig, 'utf-8').trim() === '*') {
        process.env.UNI_VUE_VAPOR_ALL = 'true'
      }
    }
  }
  if (process.env.UNI_VUE_VAPOR === 'true') {
    const vuePkgs = [
      '@vue/compiler-core',
      '@vue/compiler-dom',
      '@vue/compiler-sfc',
      '@vue/compiler-ssr',
      '@vue/compiler-vapor',
      '@vue/server-renderer',
      '@vue/shared',
    ]
    vuePkgs.forEach((pkg) => {
      moduleAlias.addAlias(
        pkg,
        path.resolve(libDir, 'vapor', '@vue', pkg.split('/').pop()!)
      )
    })
    moduleAlias.addAlias(
      '@vitejs/plugin-vue',
      path.resolve(libDir, 'vapor', '@vitejs', 'plugin-vue')
    )
  } else {
    moduleAlias.addAliases({
      '@vue/shared': require.resolve('@vue/shared'),
      '@vue/shared/dist/shared.esm-bundler.js': require.resolve(
        '@vue/shared/dist/shared.esm-bundler.js'
      ),
      '@vue/compiler-core': path.resolve(libDir, '@vue/compiler-core'),
      '@vue/compiler-dom': require.resolve('@vue/compiler-dom'),
      '@vue/compiler-sfc': compilerSfcPath,
      '@vue/server-renderer': serverRendererPath,
      'vue/compiler-sfc': compilerSfcPath,
      'vue/server-renderer': serverRendererPath,
    })
  }
  if (process.env.VITEST) {
    moduleAlias.addAliases({
      vue: '@dcloudio/uni-h5-vue',
      'vue/package.json': '@dcloudio/uni-h5-vue/package.json',
    })
  }
  if (isInHBuilderX()) {
    // 又是为了复用 HBuilderX 的插件逻辑，硬编码映射
    Object.keys(hbxPlugins).forEach((lang) => {
      const realPath = path.resolve(
        process.env.UNI_HBUILDERX_PLUGINS,
        hbxPlugins[lang as keyof typeof hbxPlugins]
      )
      moduleAlias.addAlias(
        lang,
        // @ts-expect-error
        () => {
          try {
            require.resolve(realPath)
          } catch (e) {
            const msg = moduleAliasFormatter.format(
              `Preprocessor dependency "${lang}" not found. Did you install it?`
            )
            console.error(msg)
            process.exit(0)
          }
          return realPath
        }
      )
    })
    // web 平台用了 vite 内置 css 插件，该插件会加载预编译器如scss、less等，需要转向到 HBuilderX 的对应编译器插件
    if (
      process.env.UNI_PLATFORM === 'h5' ||
      process.env.UNI_PLATFORM === 'web'
    ) {
      // https://github.com/vitejs/vite/blob/main/packages/vite/src/node/packages.ts#L92
      // 拦截预编译器
      const join = path.join
      path.join = function (...paths: string[]): string {
        if (paths.length === 4) {
          // path.join(basedir, 'node_modules', pkgName, 'package.json')
          // const basedir = paths[0]
          const nodeModules = paths[1] // = node_modules
          const pkgName = paths[2]
          const packageJson = paths[3] // = package.json
          if (
            nodeModules === 'node_modules' &&
            packageJson === 'package.json' &&
            (hbxPlugins as any)[pkgName]
          ) {
            return path.resolve(
              process.env.UNI_HBUILDERX_PLUGINS,
              hbxPlugins[pkgName as keyof typeof hbxPlugins],
              packageJson
            )
          }
        }
        return join(...paths)
      }

      // https://github.com/vitejs/vite/blob/892916d040a035edde1add93c192e0b0c5c9dd86/packages/vite/src/node/plugins/css.ts#L1481
      // const oldSync = resovle.sync
      // resovle.sync = (id: string, opts?: SyncOpts) => {
      //   if ((hbxPlugins as any)[id]) {
      //     return path.resolve(
      //       process.env.UNI_HBUILDERX_PLUGINS,
      //       hbxPlugins[id as keyof typeof hbxPlugins]
      //     )
      //   }
      //   return oldSync(id, opts)
      // }
    }
  }
}

function supportAutoInstallPlugin() {
  return !!process.env.HX_Version
}

export function installHBuilderXPlugin(plugin: string) {
  if (!supportAutoInstallPlugin()) {
    return
  }
  return console.error(
    `%HXRunUniAPPPluginName%${plugin}%HXRunUniAPPPluginName%`
  )
}

const installPreprocessorTips: Record<string, boolean> = {}

export const moduleAliasFormatter: Formatter = {
  test(msg) {
    return msg.includes('Preprocessor dependency')
  },
  format(msg) {
    let lang = ''
    let preprocessor = ''
    if (msg.includes(`"pug"`)) {
      lang = 'pug'
      preprocessor = 'compile-pug-cli'
    } else if (msg.includes(`"sass"`)) {
      lang = 'sass'
      preprocessor = 'compile-dart-sass'
    } else if (msg.includes(`"less"`)) {
      lang = 'less'
      preprocessor = 'compile-less'
    } else if (msg.includes('"stylus"')) {
      lang = 'stylus'
      preprocessor = 'compile-stylus'
    } else if (msg.includes('"typescript"')) {
      lang = 'typescript'
      preprocessor = 'compile-typescript'
    }
    if (lang) {
      // 仅提醒一次
      if (installPreprocessorTips[lang]) {
        return ''
      }
      installPreprocessorTips[lang] = true
      installHBuilderXPlugin(preprocessor)
      return formatInstallHBuilderXPluginTips(lang, preprocessor)
    }
    return msg
  },
}

export function formatInstallHBuilderXPluginTips(
  lang: string,
  preprocessor: string
) {
  return `预编译器错误：代码使用了${lang}语言，但未安装相应的编译器插件，${
    supportAutoInstallPlugin() ? '正在从' : '请前往'
  }插件市场安装该插件:
https://ext.dcloud.net.cn/plugin?name=${preprocessor}`
}
