import path from 'path'
import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'
import {
  COMPONENT_CUSTOM_HIDDEN_BIND,
  type MiniProgramCompilerOptions,
  getNativeTags,
  transformComponentLink,
  transformRef,
  // transformMatchMedia,
} from '@dcloudio/uni-cli-shared'
import type { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.config.json'
// import { transformSwiper } from './transforms/transformSwiper'

const projectConfigFilename = 'project.config.json'

const nodeTransforms = [
  transformRef,
  // transformMatchMedia,
  transformComponentLink,
]

export const customElements = [
  'root-portal',
  'page-container',
  ...getNativeTags(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM),
]

export const compilerOptions: CompilerOptions = {
  nodeTransforms,
}

const COMPONENTS_DIR = 'jdcomponents'

export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    /**
     * 是否支持绑定 array 类型
     */
    array: false,
  },
  slot: {
    /**
     * 是否支持后备内容
     */
    fallbackContent: true,
    /**
     * 是否支持动态插槽名
     */
    dynamicSlotNames: true,
  },
  directive: 'jd:',
  component: {
    dir: COMPONENTS_DIR,
    vShow: COMPONENT_CUSTOM_HIDDEN_BIND,
    // 父组件 setData 后，子组件的 properties 是否可以同步获取
    getPropertySync: false,
  },
}

export const options: UniMiniProgramPluginOptions = {
  // ？
  cdn: 11,
  vite: {
    inject: {
      uni: [path.resolve(__dirname, 'uni.api.esm.js'), 'default'],
    },
    alias: {
      'uni-mp-runtime': path.resolve(__dirname, 'uni.mp.esm.js'),
    },
    copyOptions: {
      /**
       * 静态资源，配置的目录，在 uni_modules 中同样支持
       */
      assets: [COMPONENTS_DIR],
      targets: [
        {
          // FileWatcher这个类监听的文件，文件改动触发整体编译？编译什么？
          src: ['project.config.json', 'custom-tab-bar'],
          // 输出目录
          get dest() {
            return process.env.UNI_OUTPUT_DIR
          },
        },
      ],
    },
  },
  global: 'jd',
  app: {
    /**
     * 是否支持darkmode
     */
    darkmode: true,
    /**
     * 是否支持subpackages
     */
    subpackages: true,
    /**
     * 是否支持发行插件
     */
    plugins: true,
    /**
     * 是否支持全局组件
     */
    usingComponents: true,
  },
  project: {
    filename: projectConfigFilename,
    config: ['project.config.json'],
    source,
  },
  // 对模版的编译处理
  template: {
    /* eslint-disable no-restricted-syntax */
    ...miniProgram,
    customElements,
    filter: {
      extname: '.jds',
      lang: 'jds',
      generate(filter, filename) {
        if (filename) {
          return `<jds src="${filename}.jds" module="${filter.name}"/>`
        }
        return `<jds module="${filter.name}">
${filter.code}
</jds>`
      },
    },
    extname: '.jxml',
    compilerOptions,
  },
  style: {
    extname: '.jxss',
  },
}
