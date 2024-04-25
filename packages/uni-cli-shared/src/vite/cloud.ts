import path from 'path'
import fs from 'fs-extra'
import type { BuildOptions, Plugin, ResolvedConfig } from 'vite'
import {
  genEncryptEasyComModuleIndex,
  parseEncryptEasyComModules,
} from '../uni_modules'
import { cleanUrl } from './plugins/vitejs/utils'

export function uniEncryptEasyComUniModulesPlugin(): Plugin {
  return {
    name: 'uni:encrypt-easy-com-uni-modules',
    apply: 'build',
    config() {
      return {
        resolve: {
          alias: initEncryptUniModulesAlias(),
        },
        build: initEncryptUniModulesBuildOptions(process.env.UNI_INPUT_DIR),
      }
    },
    configResolved(config) {
      config.build.rollupOptions.external = createExternal(config)
    },
  }
}

function createExternal(config: ResolvedConfig) {
  return function external(source) {
    if (config.assetsInclude(cleanUrl(source))) {
      return true
    }
    if (
      [
        'vue',
        'plugin-vue:export-helper',
        'vue-router',
        'pinia',
        'vuex',
        'vue-i18n',
      ].includes(source)
    ) {
      return true
    }
    if (source.startsWith('@vue/')) {
      return true
    }
    if (source.startsWith('@dcloudio/')) {
      return true
    }
    if (source.startsWith('@/uni_modules/')) {
      return true
    }
    return false
  }
}

function initEncryptUniModulesAlias() {
  return {
    '\0plugin-vue:export-helper': 'plugin-vue:export-helper',
  }
}

function initEncryptUniModulesBuildOptions(inputDir: string): BuildOptions {
  const modules = parseEncryptEasyComModules(inputDir, false)
  const moduleNames = Object.keys(modules)
  if (!moduleNames.length) {
    throw new Error('No encrypt uni_modules found')
  }
  // 生成入口文件
  const input: { [entryAlias: string]: string } = {}
  moduleNames.forEach((module) => {
    const indexEncryptFile = path.resolve(
      inputDir,
      'uni_modules',
      module,
      'index.encrypt.js'
    )
    fs.writeFileSync(
      indexEncryptFile,
      genEncryptEasyComModuleIndex(modules[module])
    )
    input['uni_modules/' + module + '/index.encrypt'] = indexEncryptFile
  })
  return {
    lib: {
      entry: input,
      formats: ['es'],
    },
    rollupOptions: {
      input: '',
      output: {
        entryFileNames: '[name].js',
      },
    },
  }
}
