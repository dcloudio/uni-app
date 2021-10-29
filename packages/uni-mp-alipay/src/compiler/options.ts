import path from 'path'
import {
  COMPONENT_ON_LINK,
  createTransformComponentLink,
  MiniProgramCompilerOptions,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'
import { NodeTypes } from '@vue/compiler-core'
import source from './mini.project.json'
import { transformRef } from './transforms/transformRef'

const projectConfigFilename = 'mini.project.json'
export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: false,
  },
  slot: {
    fallback: true,
  },
  directive: 'a:',
}
export const nodeTransforms = [
  transformRef,
  createTransformComponentLink(COMPONENT_ON_LINK, NodeTypes.ATTRIBUTE),
]
export const options: UniMiniProgramPluginOptions = {
  vite: {
    inject: {
      uni: [path.resolve(__dirname, 'uni.api.esm.js'), 'default'],
    },
    alias: {
      'uni-mp-runtime': path.resolve(__dirname, 'uni.mp.esm.js'),
    },
    copyOptions: {
      assets: ['mycomponents'],
    },
  },
  global: 'my',
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
          return `<sjs src="${filename}.sjs" module="${filter.name}"/>`
        }
        return `<sjs module="${filter.name}">
${filter.code}
</sjs>`
      },
    },
    extname: '.axml',
    compilerOptions: {
      nodeTransforms,
    },
  },
  style: {
    extname: '.acss',
  },
}
