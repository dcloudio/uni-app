import { isNativeTag } from '@dcloudio/uni-shared'
import { compile, CompilerOptions } from '@dcloudio/uni-mp-compiler'

import {
  isCustomElement,
  miniProgram,
  nodeTransforms,
} from '../src/compiler/options'

export function assert(
  template: string,
  templateCode: string,
  renderCode: string,
  options: CompilerOptions = {}
) {
  const res = compile(template, {
    mode: 'module',
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    isNativeTag,
    isCustomElement,
    generatorOpts: {
      concise: true,
    },
    nodeTransforms,
    miniProgram: {
      ...miniProgram,
      emitFile({ source }) {
        // console.log(source)
        if (!options.onError) {
          expect(source).toBe(templateCode)
        }
        return ''
      },
    },
    ...options,
  })
  if (!options.onError) {
    expect(res.code).toBe(renderCode)
  }
}
