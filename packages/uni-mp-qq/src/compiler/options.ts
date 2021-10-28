import path from 'path'

import { addComponentBindLink } from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.config.json'

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
  },
  project: {
    filename: 'project.config.json',
    source,
  },
  template: {
    class: {
      array: true,
    },
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
    slot: {
      fallback: false,
    },
    extname: '.qml',
    directive: 'qq:',
    compilerOptions: {
      nodeTransforms: [addComponentBindLink],
    },
  },
  style: {
    extname: '.qss',
  },
}
