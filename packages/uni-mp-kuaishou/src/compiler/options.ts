import path from 'path'
import type { CompilerOptions } from '@vue/compiler-core'
import {
  MiniProgramCompilerOptions,
  transformComponentLink,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.config.json'
import { transformOn } from './transforms/vOn'
import { transformModel } from './transforms/vModel'

const nodeTransforms = [transformRef, transformComponentLink]
const directiveTransforms = {
  on: transformOn,
  model: transformModel,
}

export const compilerOptions: CompilerOptions = {
  nodeTransforms,
  directiveTransforms,
}
const COMPONENTS_DIR = 'kscomponents'
export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: false,
  },
  slot: {
    fallbackContent: false,
    dynamicSlotNames: false,
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
    filter: undefined,
    extname: '.ksml',
    compilerOptions,
  },
  style: {
    extname: '.css',
  },
}
