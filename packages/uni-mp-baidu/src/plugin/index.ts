import type { Plugin } from 'vite'
import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin, {
  UniMiniProgramPluginOptions,
} from '@dcloudio/uni-mp-vite'

import source from './project.swan.json'
import { transformFor } from './transforms/vFor'
import { transformOn } from './transforms/vOn'
import { transformModel } from './transforms/vModel'

const uniMiniProgramBaiduPlugin: Plugin = {
  name: 'vite:uni-mp-baidu',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
    }
  },
}

const projectConfigFilename = 'project.swan.json'

const options: UniMiniProgramPluginOptions = {
  vite: {
    inject: {
      uni: [
        resolveBuiltIn('@dcloudio/uni-mp-baidu/dist/uni.api.esm.js'),
        'default',
      ],
    },
    alias: {
      'uni-mp-runtime': resolveBuiltIn(
        '@dcloudio/uni-mp-baidu/dist/uni.mp.esm.js'
      ),
    },
    copyOptions: {
      assets: ['swancomponents'],
    },
  },
  global: 'swan',
  app: {
    darkmode: false,
    subpackages: true,
  },
  project: {
    filename: projectConfigFilename,
    source,
  },
  template: {
    filter: {
      extname: '.sjs',
      lang: 'sjs',
      generate(filter, filename) {
        if (filename) {
          return `<import-sjs src="${filename}.sjs" module="${filter.name}"/>`
        }
        return `<import-sjs module="${filter.name}">
${filter.code}
</import-sjs>`
      },
    },
    slot: {
      fallback: false,
    },
    extname: '.swan',
    directive: 's-',
    compilerOptions: {
      nodeTransforms: [transformFor],
      directiveTransforms: {
        on: transformOn,
        model: transformModel,
      },
    },
  },
  style: {
    extname: '.css',
  },
}

export default [uniMiniProgramBaiduPlugin, ...initMiniProgramPlugin(options)]
