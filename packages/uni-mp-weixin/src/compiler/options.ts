import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'
import {
  COMPONENT_CUSTOM_HIDDEN,
  type MiniProgramCompilerOptions,
  copyMiniProgramPluginJson,
  copyMiniProgramThemeJson,
  transformComponentLink,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import {
  type UniMiniProgramPluginOptions,
  resolveMiniProgramRuntime,
} from '@dcloudio/uni-mp-vite'
import { transformAd } from './transforms/transformAd'

import source from './project.config.json'

export const customElements = [
  'page-container',
  'page-meta',
  'navigation-bar',
  'match-media',
  'ad-custom',
  'share-element',
  'channel-live',
  'channel-video',
  'voip-room',
  'root-portal',
  'subscribe',
  // 手势组件
  'tap-gesture-handler',
  'double-tap-gesture-handler',
  'scale-gesture-handler',
  'force-press-gesture-handler',
  'pan-gesture-handler',
  'vertical-drag-gesture-handler',
  'horizontal-drag-gesture-handler',
  'long-press-gesture-handler',
  //其他
  'draggable-sheet',
  'grid-builder',
  'grid-view',
  'list-builder',
  'list-view',
  'nested-scroll-body',
  'nested-scroll-header',
  'open-container',
  'share-element',
  'snapshot',
  // 'span', //  todo: 临时移除 span 的支持，后续判断 skyline 环境进行区分 ask 190418
  'sticky-header',
  'sticky-section',
  'store-product',
  'store-home',
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
    ':host': true,
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
      uni: [resolveMiniProgramRuntime(__dirname, 'uni.api.esm.js'), 'default'],
      wx: [resolveMiniProgramRuntime(__dirname, 'uni.api.esm.js'), 'wx'],
    },
    alias: {
      'uni-mp-runtime': resolveMiniProgramRuntime(__dirname, 'uni.mp.esm.js'),
    },
    copyOptions: {
      assets: [COMPONENTS_DIR],
      targets: [
        ...(process.env.UNI_MP_PLUGIN ? [copyMiniProgramPluginJson] : []),
        {
          src: [
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
        ...copyMiniProgramThemeJson(),
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
