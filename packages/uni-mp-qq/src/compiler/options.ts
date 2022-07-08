import path from 'path'
import type { CompilerOptions } from '@vue/compiler-core'
import {
  COMPONENT_CUSTOM_HIDDEN,
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
const COMPONENTS_DIR = 'wxcomponents'

export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: true,
  },
  slot: {
    fallbackContent: false,
    dynamicSlotNames: true,
  },
  event: {
    key: true,
  },
  directive: 'qq:',
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
    vShow: COMPONENT_CUSTOM_HIDDEN,
    getPropertySync: false, // 为了避免 Setting data field "uP" to undefined is invalid 警告
  },
}

export const options: UniMiniProgramPluginOptions = {
  cdn: 5,
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
    usingComponents: true,
    normalize(appJson) {
      const hasUsingComponents =
        appJson.usingComponents && Object.keys(appJson.usingComponents).length
      if (!hasUsingComponents) {
        // fix https://github.com/dcloudio/uni-app/issues/2648
        appJson.usingComponents = {
          'fix-2648': '/fix-2648',
        }
      }
      return appJson
    },
  },
  project: {
    filename: 'project.config.json',
    config: ['project.qq.json', 'project.config.json'],
    source,
    normalize(projectJson) {
      projectJson.qqappid = projectJson.appid
      projectJson.qqLibVersion = projectJson.libVersion
      delete projectJson.appid
      delete projectJson.libVersion
      return projectJson
    },
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
