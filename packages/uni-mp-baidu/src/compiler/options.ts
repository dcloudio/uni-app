import path from 'path'
import { MiniProgramCompilerOptions } from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.swan.json'
import { transformFor } from './transforms/vFor'
import { transformOn } from './transforms/vOn'
import { transformModel } from './transforms/vModel'

export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: true,
  },
  slot: {
    fallback: false,
  },
  directive: 's-',
}

const projectConfigFilename = 'project.swan.json'

export const options: UniMiniProgramPluginOptions = {
  vite: {
    inject: {
      uni: [path.resolve(__dirname, 'uni.api.esm.js'), 'default'],
    },
    alias: {
      'uni-mp-runtime': path.resolve(__dirname, 'uni.mp.esm.js'),
    },
    copyOptions: {
      assets: ['swancomponents'],
    },
  },
  global: 'swan',
  app: {
    darkmode: false,
    subpackages: true,
  },
  project: {
    filename: projectConfigFilename,
    source,
  },
  template: {
    /* eslint-disable no-restricted-syntax */
    ...miniProgram,
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
    compilerOptions: {
      nodeTransforms: [transformFor],
      directiveTransforms: {
        on: transformOn,
        model: transformModel,
      },
    },
  },
  style: {
    extname: '.css',
  },
}
