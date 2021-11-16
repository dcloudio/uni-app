import path from 'path'
import type { CompilerOptions } from '@vue/compiler-core'
import {
  MiniProgramCompilerOptions,
  transformComponentLink,
  transformMatchMedia,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.config.json'

const nodeTransforms = [
  transformRef,
  transformMatchMedia,
  transformComponentLink,
]

export const compilerOptions: CompilerOptions = {
  nodeTransforms,
}

export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: true,
  },
  slot: {
    fallbackContent: false,
    dynamicSlotNames: true,
  },
  directive: 'qq:',
}

export const options: UniMiniProgramPluginOptions = {
  vite: {
    inject: {
      uni: [path.resolve(__dirname, 'uni.api.esm.js'), 'default'],
    },
    alias: {
      'uni-mp-runtime': path.resolve(__dirname, 'uni.mp.esm.js'),
    },
    copyOptions: {
      assets: ['wxcomponents'],
      targets: [
        {
          src: ['custom-tab-bar'],
          get dest() {
            return process.env.UNI_OUTPUT_DIR
          },
        },
      ],
    },
  },
  global: 'qq',
  app: {
    darkmode: false,
    subpackages: true,
  },
  project: {
    filename: 'project.config.json',
    source,
  },
  template: {
    /* eslint-disable no-restricted-syntax */
    ...miniProgram,
    filter: {
      extname: '.qs',
      lang: 'wxs',
      generate(filter, filename) {
        if (filename) {
          return `<qs src="${filename}.qs" module="${filter.name}"/>`
        }
        return `<qs module="${filter.name}">
  ${filter.code}
  </qs>`
      },
    },
    extname: '.qml',
    compilerOptions,
  },
  style: {
    extname: '.qss',
  },
}
