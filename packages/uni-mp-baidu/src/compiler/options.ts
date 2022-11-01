import path from 'path'
import type { CompilerOptions } from '@vue/compiler-core'
import {
  MiniProgramCompilerOptions,
  transformMatchMedia,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.swan.json'
import { transformFor } from './transforms/vFor'
import { transformOn } from './transforms/vOn'
import { transformModel } from './transforms/vModel'

export const customElements = ['follow-swan', 'login', 'inline-payment-panel']
const nodeTransforms = [transformRef, transformFor, transformMatchMedia]
const directiveTransforms = {
  on: transformOn,
  model: transformModel,
}
const COMPONENTS_DIR = 'swancomponents'
export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: true,
  },
  slot: {
    fallbackContent: true,
    // https://github.com/baidu/san/discussions/601
    dynamicSlotNames: false,
  },
  directive: 's-',
  lazyElement: {
    editor: [
      {
        name: 'on',
        arg: ['ready'],
      },
    ],
  },
  component: {
    dir: COMPONENTS_DIR,
  },
}

export const compilerOptions: CompilerOptions = {
  nodeTransforms,
  directiveTransforms,
}

const projectConfigFilename = 'project.swan.json'

export const options: UniMiniProgramPluginOptions = {
  cdn: 3,
  vite: {
    inject: {
      uni: [path.resolve(__dirname, 'uni.api.esm.js'), 'default'],
    },
    alias: {
      'uni-mp-runtime': path.resolve(__dirname, 'uni.mp.esm.js'),
    },
    copyOptions: {
      assets: [COMPONENTS_DIR],
      targets: [
        {
          src: ['ext.json'],
          get dest() {
            return process.env.UNI_OUTPUT_DIR
          },
        },
      ],
    },
  },
  global: 'swan',
  app: {
    darkmode: false,
    subpackages: true,
    usingComponents: true,
  },
  project: {
    filename: projectConfigFilename,
    config: ['project.swan.json'],
    source,
  },
  template: {
    /* eslint-disable no-restricted-syntax */
    ...miniProgram,
    customElements,
    filter: {
      extname: '.sjs',
      lang: 'sjs',
      generate(filter, filename) {
        if (filename) {
          return `<import-sjs src="${filename}.sjs" module="${filter.name}"/>`
        }
        return `<import-sjs module="${filter.name}">
  ${filter.code}
  </import-sjs>`
      },
    },
    extname: '.swan',
    compilerOptions,
  },
  style: {
    extname: '.css',
  },
}
