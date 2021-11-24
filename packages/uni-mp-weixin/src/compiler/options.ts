import path from 'path'
import type { CompilerOptions } from '@vue/compiler-core'
import {
  COMPONENT_CUSTOM_HIDDEN,
  MiniProgramCompilerOptions,
  transformComponentLink,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.config.json'

export const customElements = ['page-meta', 'navigation-bar', 'match-media']

export const compilerOptions: CompilerOptions = {
  nodeTransforms: [transformRef, transformComponentLink],
}

export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: true,
  },
  slot: {
    fallbackContent: false,
    dynamicSlotNames: true,
  },
  directive: 'wx:',
  lazyElement: {
    canvas: [{ name: 'bind', arg: ['canvas-id', 'id'] }],
    editor: [{ name: 'on', arg: ['ready'] }],
  },
  component: {
    vShow: COMPONENT_CUSTOM_HIDDEN,
  },
}
const projectConfigFilename = 'project.config.json'

export const options: UniMiniProgramPluginOptions = {
  vite: {
    inject: {
      uni: [path.resolve(__dirname, 'uni.api.esm.js'), 'default'],
    },
    alias: {
      'uni-mp-runtime': path.resolve(__dirname, 'uni.mp.esm.js'),
    },
    copyOptions: {
      assets: ['wxcomponents'],
      targets: [
        {
          src: [
            'theme.json',
            'sitemap.json',
            'ext.json',
            'custom-tab-bar',
            'functional-pages',
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
  },
  project: {
    filename: projectConfigFilename,
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
