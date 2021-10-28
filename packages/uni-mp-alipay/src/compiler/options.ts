import path from 'path'
import {
  COMPONENT_ON_LINK,
  createTransformComponentLink,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './mini.project.json'

const projectConfigFilename = 'mini.project.json'

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
  app: {
    darkmode: false,
    subpackages: true,
  },
  project: {
    filename: projectConfigFilename,
    source,
  },
  template: {
    class: {
      array: false,
    },
    filter: {
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
    slot: {
      fallback: true,
    },
    extname: '.axml',
    directive: 'a:',
    compilerOptions: {
      nodeTransforms: [createTransformComponentLink(COMPONENT_ON_LINK)],
    },
  },
  style: {
    extname: '.acss',
  },
}
