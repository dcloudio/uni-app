import path from 'path'
import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'
import {
  type MiniProgramCompilerOptions,
  createCopyPluginTarget,
  getNativeTags,
  // transformMatchMedia,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import type { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.swan.json'
import { transformFor } from './transforms/vFor'
import { transformOn } from './transforms/vOn'
import { transformModel } from './transforms/vModel'

export const customElements = [
  'animation-video',
  'animation-view',
  'ar-camera',
  'rtc-room',
  'rtc-room-item',
  'tabs',
  'tab-item',
  'follow-swan',
  'login',
  'inline-payment-panel',
  'talos-linear-gradient',
  'talos-rc-view',
  'talos-nested-scroll-view',
  'talos-nested-scroll-top-container',
  'talos-nested-scroll-bottom-container',
  'talos-waterfall-view',
  'talos-waterfall-item',
  'talos-waterfall-header',
  'talos-waterfall-footer',
  'talos-pull-refresh',
  'talos-control-container',
  'talos-na-refresh-control',
  'talos-modal',
  'talos-svg',
  ...getNativeTags(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM),
]
const nodeTransforms = [
  transformRef,
  transformFor,
  // transformMatchMedia
]
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
    'animation-view': true,
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
interface ConditionConfig {
  miniprogram?: UniApp.PagesJson['condition']
}

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
      targets: [createCopyPluginTarget(['ext.json'])],
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
    normalize(projectJson) {
      const miniprogram = (projectJson.condition as ConditionConfig)
        ?.miniprogram
      if (
        miniprogram &&
        Array.isArray(miniprogram.list) &&
        miniprogram.list.length
      ) {
        ;(projectJson['compilation-args'] as any).options =
          miniprogram.list.map((item) => {
            return {
              id: item.id,
              text: item.name,
              extra: {
                index: item.pathName,
                query: item.query,
              },
            }
          })
        delete projectJson.condition
      }
      return projectJson
    },
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
