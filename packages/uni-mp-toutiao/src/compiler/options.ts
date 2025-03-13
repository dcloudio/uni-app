import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'
import {
  COMPONENT_CUSTOM_HIDDEN_BIND,
  type MiniProgramCompilerOptions,
  transformComponentLink,
  transformDirection,
  transformMPBuiltInTag,
  transformMatchMedia,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import {
  type UniMiniProgramPluginOptions,
  resolveMiniProgramRuntime,
} from '@dcloudio/uni-mp-vite'

import source from './project.config.json'
import { transformSwiper } from './transforms/transformSwiper'

export const customElements = [
  'aweme-data',
  'consume-card',
  'pay-button',
  'rate-button',
  'member-button',
  'confirm-receipt-button',
  'live-preview',
  'aweme-live-book',
  'aweme-user-card',
  'rtc-room',
]

const projectConfigFilename = 'project.config.json'

const nodeTransforms = [
  transformRef,
  transformSwiper,
  transformMatchMedia,
  transformComponentLink,
]

if (process.env.UNI_APP_X === 'true') {
  nodeTransforms.push(transformMPBuiltInTag, transformDirection)
}

export const compilerOptions: CompilerOptions = {
  nodeTransforms,
}
const COMPONENTS_DIR = 'ttcomponents'
export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: false,
  },
  slot: {
    fallbackContent: true,
    dynamicSlotNames: true,
  },
  directive: 'tt:',
  component: {
    dir: COMPONENTS_DIR,
    vShow: COMPONENT_CUSTOM_HIDDEN_BIND,
  },
  filter: {
    lang: 'sjs',
    setStyle: true,
  },
}

export const options: UniMiniProgramPluginOptions = {
  cdn: 4,
  vite: {
    inject: {
      uni: [resolveMiniProgramRuntime(__dirname, 'uni.api.esm.js'), 'default'],
    },
    alias: {
      'uni-mp-runtime': resolveMiniProgramRuntime(__dirname, 'uni.mp.esm.js'),
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
  global: 'tt',
  app: {
    darkmode: false,
    subpackages: true,
    usingComponents: false,
  },
  project: {
    filename: projectConfigFilename,
    config: ['project.tt.json'],
    source,
  },
  template: {
    /* eslint-disable no-restricted-syntax */
    ...miniProgram,
    customElements,
    filter: {
      ...miniProgram.filter,
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
    extname: '.ttml',
    compilerOptions,
  },
  style: {
    extname: '.ttss',
  },
}
