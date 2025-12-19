import {
  createIsCustomElement,
  isMiniProgramNativeTag,
  isMiniProgramUVueNativeTag,
} from '@dcloudio/uni-shared'
import { type CompilerOptions, compile } from '@dcloudio/uni-mp-compiler'

import {
  compilerOptions,
  customElements,
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
    isNativeTag: options.isX
      ? isMiniProgramUVueNativeTag
      : isMiniProgramNativeTag,
    isCustomElement: createIsCustomElement(customElements),
    generatorOpts: {
      concise: true,
    },
    miniProgram: {
      ...miniProgram,
      emitFile({ source }) {
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
