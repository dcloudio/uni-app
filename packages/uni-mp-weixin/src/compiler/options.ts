import path from 'path'
import type { CompilerOptions } from '@vue/compiler-core'
import {
  isNativeTag,
  isCustomElement as baseIsCustomElement,
} from '@dcloudio/uni-shared'
import {
  MiniProgramCompilerOptions,
  transformComponentLink,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.config.json'

export const compilerOptions: CompilerOptions = {
  isNativeTag,
  isCustomElement: (tag) => {
    return (
      ['page-meta', 'navigation-bar', 'match-media'].includes(tag) ||
      baseIsCustomElement(tag)
    )
  },
  nodeTransforms: [transformRef, transformComponentLink],
}

export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: true,
  },
  slot: {
    fallback: false,
  },
  directive: 'wx:',
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
