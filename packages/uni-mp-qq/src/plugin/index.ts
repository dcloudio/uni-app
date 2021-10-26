import { Plugin } from 'vite'
import { addComponentBindLink, resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin, {
  UniMiniProgramPluginOptions,
} from '@dcloudio/uni-mp-vite'

import source from './project.config.json'
import { fix2648 } from './fix2648'

const uniMiniProgramQQPlugin: Plugin = {
  name: 'vite:uni-mp-qq',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
    }
  },
  writeBundle(_, bundle) {
    fix2648(bundle)
  },
}

const options: UniMiniProgramPluginOptions = {
  vite: {
    inject: {
      uni: [
        resolveBuiltIn('@dcloudio/uni-mp-qq/dist/uni.api.esm.js'),
        'default',
      ],
    },
    alias: {
      'uni-mp-runtime': resolveBuiltIn(
        '@dcloudio/uni-mp-qq/dist/uni.mp.esm.js'
      ),
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

export default [uniMiniProgramQQPlugin, ...initMiniProgramPlugin(options)]
