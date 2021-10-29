import path from 'path'
import { NodeTypes } from '@vue/compiler-core'
import {
  COMPONENT_ON_LINK,
  createTransformComponentLink,
  MiniProgramCompilerOptions,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'
import source from './mini.project.json'
import { transformRef } from './transforms/transformRef'
import { event } from './event'

const projectConfigFilename = 'mini.project.json'

export const miniProgram: MiniProgramCompilerOptions = {
  event,
  class: {
    array: false,
  },
  slot: {
    $slots: true,
    // 支付宝 fallback 有 bug，当多个带默认 slot 组件嵌套使用时，所有的默认slot均会显示，如uni-file-picker(image)
    fallback: false,
  },
  directive: 'a:',
}
// TODO getPhoneNumber 等事件
export const nodeTransforms = [
  transformRef,
  createTransformComponentLink(COMPONENT_ON_LINK, NodeTypes.ATTRIBUTE),
]
export const tags = [
  'lifestyle',
  'life-follow',
  'contact-button',
  'spread',
  'error-view',
  'poster',
  'cashier',
  'ix-grid',
  'ix-native-grid',
  'ix-native-list',
  'mkt',
]
export function isCustomElement(tag: string) {
  return tags.includes(tag)
}
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
  json: {
    windowOptionsMap: {
      defaultTitle: 'navigationBarTitleText',
      pullRefresh: 'enablePullDownRefresh',
      allowsBounceVertical: 'allowsBounceVertical',
      titleBarColor: 'navigationBarBackgroundColor',
      optionMenu: 'optionMenu',
      backgroundColor: 'backgroundColor',
      usingComponents: 'usingComponents',
      navigationBarShadow: 'navigationBarShadow',
      titleImage: 'titleImage',
      transparentTitle: 'transparentTitle',
      titlePenetrate: 'titlePenetrate',
    },
    tabBarOptionsMap: {
      textColor: 'color',
      selectedColor: 'selectedColor',
      backgroundColor: 'backgroundColor',
      items: 'list',
    },
    tabBarItemOptionsMap: {
      pagePath: 'pagePath',
      name: 'text',
      icon: 'iconPath',
      activeIcon: 'selectedIconPath',
    },
  },
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
        // TODO 标签内的 code 代码需要独立生成一个 sjs 文件
        // 暂不处理，让开发者自己全部使用 src 引入
        return `<import-sjs name="${filter.name}" from="${filename}.sjs"/>`
      },
    },
    extname: '.axml',
    compilerOptions: {
      isCustomElement,
      nodeTransforms,
    },
  },
  style: {
    extname: '.acss',
  },
}
