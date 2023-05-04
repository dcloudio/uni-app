import path from 'path'
import moduleAlias from 'module-alias'
import resovle, { SyncOpts } from 'resolve'
import { isInHBuilderX } from './env'
import type { Formatter } from '../logs/format'

const hbxPlugins = {
  // typescript: 'compile-typescript/node_modules/typescript',
  less: 'compile-less/node_modules/less',
  sass: 'compile-dart-sass/node_modules/sass',
  stylus: 'compile-stylus/node_modules/stylus',
  pug: 'compile-pug-cli/node_modules/pug',
} as const

export function initModuleAlias() {
  const compilerSfcPath = require.resolve('@vue/compiler-sfc')
  const serverRendererPath = require.resolve('@vue/server-renderer')
  moduleAlias.addAliases({
    '@vue/shared': require.resolve('@vue/shared'),
    '@vue/shared/dist/shared.esm-bundler.js': require.resolve(
      '@vue/shared/dist/shared.esm-bundler.js'
    ),
    '@vue/compiler-dom': require.resolve('@vue/compiler-dom'),
    '@vue/compiler-sfc': compilerSfcPath,
    '@vue/server-renderer': serverRendererPath,
    'vue/compiler-sfc': compilerSfcPath,
    'vue/server-renderer': serverRendererPath,
  })
  if (process.env.VITEST) {
    moduleAlias.addAliases({
      vue: '@dcloudio/uni-h5-vue',
      'vue/package.json': '@dcloudio/uni-h5-vue/package.json',
    })
  }
  if (isInHBuilderX()) {
    // 又是为了复用 HBuilderX 的插件逻辑，硬编码映射
    Object.keys(hbxPlugins).forEach((name) => {
      moduleAlias.addAlias(
        name,
        path.resolve(
          process.env.UNI_HBUILDERX_PLUGINS,
          hbxPlugins[name as keyof typeof hbxPlugins]
        )
      )
    })
    // https://github.com/vitejs/vite/blob/892916d040a035edde1add93c192e0b0c5c9dd86/packages/vite/src/node/plugins/css.ts#L1481
    const oldSync = resovle.sync
    resovle.sync = (id: string, opts?: SyncOpts) => {
      if ((hbxPlugins as any)[id]) {
        return path.resolve(
          process.env.UNI_HBUILDERX_PLUGINS,
          hbxPlugins[id as keyof typeof hbxPlugins]
        )
      }
      return oldSync(id, opts)
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
    if (msg.includes(`"sass"`)) {
      lang = 'sass'
      preprocessor = 'compile-dart-sass'
    } else if (msg.includes(`"less"`)) {
      lang = 'less'
      preprocessor = 'compile-less'
    } else if (msg.includes('"stylus"')) {
      lang = 'stylus'
      preprocessor = 'compile-stylus'
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
