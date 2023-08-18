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
import { transformOn } from './transforms/vOn'
import { transformModel } from './transforms/vModel'

const directiveTransforms = {
  on: transformOn,
  model: transformModel,
}

export const compilerOptions: CompilerOptions = {
  nodeTransforms: [transformRef, transformComponentLink, transformMatchMedia],
  directiveTransforms,
}

const COMPONENTS_DIR = 'xhscomponents'

export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: false,
  },
  slot: {
    fallbackContent: false,
    dynamicSlotNames: false,
  },
  event: {
    key: true,
  },
  directive: 'xhs:',
  lazyElement: {
    canvas: [
      { name: 'bind', arg: ['canvas-id', 'id'] },
      {
        name: 'on',
        arg: ['touchstart', 'touchmove', 'touchcancel', 'touchend'],
      },
    ],
    editor: [
      {
        name: 'on',
        arg: ['ready'],
      },
    ],
    'scroll-view': [
      {
        name: 'on',
        arg: ['dragstart', 'dragging', 'dragend'],
      },
    ],
    // iOS 平台需要延迟
    input: [{ name: 'bind', arg: ['type'] }],
    textarea: [{ name: 'on', arg: ['input'] }],
  },
  component: {
    dir: COMPONENTS_DIR,
  },
}
const projectConfigFilename = 'project.config.json'

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
        // ...(process.env.UNI_MP_PLUGIN ? [copyMiniProgramPluginJson] : []),
        {
          src: [
            'sitemap.json',
            'project.private.config.json',
            projectConfigFilename,
          ],
          get dest() {
            return process.env.UNI_OUTPUT_DIR
          },
        },
        // ...copyMiniProgramThemeJson(),
      ],
    },
  },
  global: 'xhs',
  app: {
    darkmode: false,
    subpackages: true,
    usingComponents: true,
  },
  project: {
    filename: projectConfigFilename,
    config: ['project.config.json'],
    source,
  },
  template: {
    /* eslint-disable no-restricted-syntax */
    ...miniProgram,
    filter: {
      extname: '.sjs',
      lang: 'sjs',
      generate(filter, filename) {
        return `<sjs src="${filename}.sjs" module="${filter.name}"/>`
      },
    },
    extname: '.xhsml',
    compilerOptions,
  },
  style: {
    extname: '.css',
  },
}
