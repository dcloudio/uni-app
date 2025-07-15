import type { CompilerOptions, NodeTransform } from '@dcloudio/uni-mp-compiler'
import {
  COMPONENT_CUSTOM_HIDDEN,
  type MiniProgramCompilerOptions,
  copyMiniProgramPluginJson,
  copyMiniProgramThemeJson,
  transformComponentLink,
  transformDirection,
  transformMPBuiltInTag,
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
  'keyboard-accessory',
  'open-data-list',
  'open-data-item',
  'selection',
]

const nodeTransforms: NodeTransform[] = [
  transformRef,
  transformComponentLink,
  transformAd,
]
if (process.env.UNI_APP_X === 'true') {
  nodeTransforms.push(transformMPBuiltInTag, transformDirection)
}

export const compilerOptions: CompilerOptions = {
  nodeTransforms,
}

const COMPONENTS_DIR = 'wxcomponents'

export function getMiniProgramOptions(
  isX: boolean
): MiniProgramCompilerOptions {
  return {
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
      'picker-view': [{ name: 'bind', arg: ['value'] }],
      // iOS 平台需要延迟
      input: [{ name: 'bind', arg: ['type'] }],
      textarea: [{ name: 'on', arg: ['input'] }],
    },
    component: {
      ':host': true,
      dir: COMPONENTS_DIR,
      vShow: COMPONENT_CUSTOM_HIDDEN,
      // 在 x 里边，已经把 u-p 补充了 || '' 来规避，理论上非 x 也可以，目前为了兼容性，暂时不开启
      getPropertySync: isX, // 为了避免 Setting data field "uP" to undefined is invalid 警告
      normalizeName: (name) =>
        name.startsWith('wx-') ? name.replace('wx-', 'weixin-') : name,
    },
    filter: {
      lang: 'wxs',
      setStyle: true,
    },
  }
}

const projectConfigFilename = 'project.config.json'

const miniProgram = getMiniProgramOptions(process.env.UNI_APP_X === 'true')

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
      ...miniProgram.filter,
      lang: 'wxs',
      extname: '.wxs',
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
