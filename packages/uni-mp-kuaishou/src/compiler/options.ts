import path from 'path'
import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'
import {
  type MiniProgramCompilerOptions,
  createCopyPluginTarget,
  getNativeTags,
  transformComponentLink,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import type { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.config.json'
// import { transformOn } from './transforms/vOn'
// import { transformModel } from './transforms/vModel'

const nodeTransforms = [transformRef, transformComponentLink]
// const directiveTransforms = {
//   on: transformOn,
//   model: transformModel,
// }

export const customElements = [
  'playlet',
  'ad',
  'follow-service',
  'payment-list',
  'web-view',
  'playlet-plugin',
  'address',
  'page-meta',
  'navigation-bar',
  ...getNativeTags(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM),
]

export const compilerOptions: CompilerOptions = {
  nodeTransforms,
  // directiveTransforms,
}
const COMPONENTS_DIR = 'kscomponents'
export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: false,
  },
  slot: {
    fallbackContent: false,
    dynamicSlotNames: true,
  },
  directive: 'ks:',
  lazyElement: {
    switch: [{ name: 'on', arg: ['change'] }],
  },
  component: {
    dir: COMPONENTS_DIR,
  },
}
const projectConfigFilename = 'project.config.json'

export const options: UniMiniProgramPluginOptions = {
  cdn: 9,
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
          src: ['project.private.config.json'],
          get dest() {
            return process.env.UNI_OUTPUT_DIR
          },
        },
        createCopyPluginTarget(['ext.json']),
      ],
    },
  },
  global: 'ks',
  app: {
    darkmode: false,
    subpackages: true,
    usingComponents: true,
  },
  project: {
    filename: projectConfigFilename,
    config: ['project.ks.json'],
    source,
  },
  template: {
    /* eslint-disable no-restricted-syntax */
    ...miniProgram,
    customElements,
    filter: undefined,
    extname: '.ksml',
    compilerOptions,
  },
  style: {
    extname: '.css',
  },
}
