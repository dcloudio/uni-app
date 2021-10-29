import path from 'path'
import {
  COMPONENT_BIND_LINK,
  createTransformComponentLink,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

import source from './project.config.json'

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
      assets: ['ttcomponents'],
    },
  },
  global: 'tt',
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
    extname: '.ttml',
    directive: 'tt:',
    compilerOptions: {
      nodeTransforms: [
        transformRef,
        createTransformComponentLink(COMPONENT_BIND_LINK),
      ],
    },
  },
  style: {
    extname: '.ttss',
  },
}
