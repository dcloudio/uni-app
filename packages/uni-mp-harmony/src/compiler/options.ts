import path from 'path'
import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'
import {
  type MiniProgramCompilerOptions,
  transformComponentLink,
  transformRef,
} from '@dcloudio/uni-cli-shared'
import type { UniMiniProgramPluginOptions } from '@dcloudio/uni-mp-vite'

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
  directive: 'has:',
  checkPropName(name, prop) {
    // 快应用不允许使用 key 属性，应该还有很多其他保留字，目前先简单处理
    // ERROR: Unexpected JavaScript keyword as attribute name: 'key', please change it.
    if (name === 'key') {
      return false
    }
    if (
      name === 'bind' &&
      prop.type === /*NodeTypes.DIRECTIVE*/ 7 &&
      prop.arg
    ) {
      if (prop.arg.type === /*NodeTypes.SIMPLE_EXPRESSION*/ 4) {
        if (prop.arg.content === 'key') {
          return false
        }
      }
    }
    return true
  },
}

export const options: UniMiniProgramPluginOptions = {
  cdn: 300,
  vite: {
    inject: {
      uni: [path.resolve(__dirname, 'uni.api.esm.js'), 'default'],
    },
    alias: {
      'uni-mp-runtime': path.resolve(__dirname, 'uni.mp.esm.js'),
    },
    copyOptions: {},
  },
  global: 'has',
  app: {
    darkmode: false,
    subpackages: true,
    usingComponents: true,
  },
  template: {
    /* eslint-disable no-restricted-syntax */
    ...miniProgram,
    filter: {
      extname: '.hjs',
      lang: 'hjs',
      generate(filter, filename) {
        if (filename) {
          return `<hjs src="${filename}.hjs" module="${filter.name}"/>`
        }
        return `<hjs module="${filter.name}">
${filter.code}
</hjs>`
      },
    },
    extname: '.hxml',
    compilerOptions,
  },
  style: {
    extname: '.css',
  },
}
