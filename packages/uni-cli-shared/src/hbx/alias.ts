import path from 'path'
import moduleAlias from 'module-alias'
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
  // const serverRendererPath = require.resolve('@vue/server-renderer')
  moduleAlias.addAliases({
    '@vue/shared': require.resolve('@vue/shared'),
    '@vue/shared/dist/shared.esm-bundler.js': require.resolve(
      '@vue/shared/dist/shared.esm-bundler.js'
    ),
    '@vue/compiler-dom': require.resolve('@vue/compiler-dom'),
    '@vue/compiler-sfc': compilerSfcPath,
    // '@vue/server-renderer': serverRendererPath,
    'vue/compiler-sfc': compilerSfcPath,
    // 'vue/server-renderer': serverRendererPath,
  })
  if (process.env.VITEST) {
    moduleAlias.addAliases({
      vue: '@dcloudio/uni-h5-vue',
    })
  }
  if (isInHBuilderX()) {
    Object.keys(hbxPlugins).forEach((name) => {
      moduleAlias.addAlias(
        name,
        path.resolve(
          process.env.UNI_HBUILDERX_PLUGINS,
          hbxPlugins[name as keyof typeof hbxPlugins]
        )
      )
    })
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
