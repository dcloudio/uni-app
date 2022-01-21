import {
  createIsCustomElement,
  isMiniProgramNativeTag as isNativeTag,
} from '@dcloudio/uni-shared'
import { compile, CompilerOptions } from '@dcloudio/uni-mp-compiler'

import {
  customElements,
  compilerOptions,
  miniProgram,
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
    generatorOpts: {
      concise: true,
    },
    isNativeTag,
    isCustomElement: createIsCustomElement(customElements),
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
    ...compilerOptions,
    ...options,
  })
  if (!options.onError) {
    expect(res.code).toBe(renderCode)
  }
}
