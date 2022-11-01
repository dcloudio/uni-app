import path from 'path'
import type { CompilerOptions } from '@vue/compiler-core'
import {
  COMPONENT_CUSTOM_HIDDEN,
  copyMiniProgramPluginJson,
  MiniProgramCompilerOptions,
  transformComponentLink,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'
import { transformAd } from './transforms/transformAd'

import source from './project.config.json'

export const customElements = [
  'page-container',
  'page-meta',
  'navigation-bar',
  'match-media',
  'ad-custom',
]

export const compilerOptions: CompilerOptions = {
  nodeTransforms: [transformRef, transformComponentLink, transformAd],
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
  directive: 'wx:',
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
    vShow: COMPONENT_CUSTOM_HIDDEN,
    getPropertySync: false, // 为了避免 Setting data field "uP" to undefined is invalid 警告
    normalizeName: (name) =>
      name.startsWith('wx-') ? name.replace('wx-', 'weixin-') : name,
  },
}
const projectConfigFilename = 'project.config.json'

export const options: UniMiniProgramPluginOptions = {
  cdn: 1,
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
        ...(process.env.UNI_MP_PLUGIN ? [copyMiniProgramPluginJson] : []),
        {
          src: [
            'theme.json',
            'sitemap.json',
            'ext.json',
            'custom-tab-bar',
            'functional-pages',
            'project.private.config.json',
            projectConfigFilename,
          ],
          get dest() {
            return process.env.UNI_OUTPUT_DIR
          },
        },
      ],
    },
  },
  global: 'wx',
  app: {
    darkmode: true,
    subpackages: true,
    plugins: true,
    usingComponents: true,
  },
  project: {
    filename: projectConfigFilename,
    config: ['project.wx.json', 'project.config.json'],
    source,
  },
  template: {
    /* eslint-disable no-restricted-syntax */
    ...miniProgram,
    customElements,
    filter: {
      extname: '.wxs',
      lang: 'wxs',
      generate(filter, filename) {
        if (filename) {
          return `<wxs src="${filename}.wxs" module="${filter.name}"/>`
        }
        return `<wxs module="${filter.name}">
${filter.code}
</wxs>`
      },
    },
    extname: '.wxml',
    compilerOptions,
  },
  style: {
    extname: '.wxss',
  },
}
