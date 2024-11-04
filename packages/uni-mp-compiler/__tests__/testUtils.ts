import type { MiniProgramCompilerOptions } from '@dcloudio/uni-cli-shared'
import {
  createIsCustomElement,
  isMiniProgramNativeTag as isNativeTag,
} from '@dcloudio/uni-shared'
import { compile } from '../src/index'
import type { CompilerOptions } from '../src/options'

export const miniProgram: MiniProgramCompilerOptions = {
  class: {
    array: true,
  },
  slot: {
    fallbackContent: false,
    dynamicSlotNames: true,
  },
  directive: 'wx:',
  component: {
    dir: 'wxcomponents',
    getPropertySync: true,
  },
} as const

export function inspect(obj: any) {
  console.log(require('util').inspect(obj, { colors: true, depth: null }))
}

export function assert(
  template: string,
  templateCode: string,
  renderCode: string,
  options: CompilerOptions = {}
) {
  const compilerOptions: CompilerOptions = {
    root: '',
    mode: 'module',
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    isNativeTag,
    isCustomElement: createIsCustomElement([]),
    generatorOpts: {
      concise: true,
    },
    miniProgram: {
      ...miniProgram,
      ...options.miniProgram,
    },
    ...options,
  }
  compilerOptions.miniProgram!.emitFile = ({ source }) => {
    // console.log(source)
    if (!options.onError) {
      expect(source).toBe(templateCode)
    }
    return ''
  }
  const res = compile(template, compilerOptions)
  // expect(res.template).toBe(templateCode)
  // expect(res.code).toBe(renderCode)
  // console.log(require('util').inspect(res.code, { colors: true, depth: null }))
  // console.log(require('util').inspect(res, { colors: true, depth: null }))
  if (!options.onError) {
    expect(res.code).toBe(renderCode)
  }
}
