import path from 'path'
import type { CompilerOptions } from '@vue/compiler-core'
import {
  MiniProgramCompilerOptions,
  transformComponentLink,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './jsconfig.json'
import { formatAppJson } from './utils'

export const compilerOptions: CompilerOptions = {
  nodeTransforms: [transformRef, transformComponentLink],
}

export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: true,
  },
  slot: {
    fallbackContent: true,
    dynamicSlotNames: true,
  },
  directive: 'qa:',
}

const projectConfigFilename = 'jsconfig.json'

export const options: UniMiniProgramPluginOptions = {
  cdn: process.env.UNI_SUB_PLATFORM === 'quickapp-webview-huawei' ? 200 : 201,
  vite: {
    inject: {
      uni: [path.resolve(__dirname, 'uni.api.esm.js'), 'default'],
    },
    alias: {
      'uni-mp-runtime': path.resolve(__dirname, 'uni.mp.esm.js'),
    },
    copyOptions: {},
  },
  global: 'qa',
  app: {
    darkmode: false,
    subpackages: true,
    usingComponents: true,
  },
  json: {
    formatAppJson,
  },
  template: {
    /* eslint-disable no-restricted-syntax */
    ...miniProgram,
    filter: {
      extname: '.qjs',
      lang: 'qjs',
      generate(filter, filename) {
        if (filename) {
          return `<qjs src="${filename}.qjs" module="${filter.name}"/>`
        }
        return `<qjs module="${filter.name}">
${filter.code}
</qjs>`
      },
    },
    extname: '.qxml',
    compilerOptions,
  },
  style: {
    extname: '.css',
  },
  project: {
    filename: projectConfigFilename,
    config: [],
    source,
  },
}
