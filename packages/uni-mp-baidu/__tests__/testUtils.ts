import { isCustomElement, isNativeTag } from '@dcloudio/uni-shared'
import { compile, CompilerOptions } from '@dcloudio/uni-mp-compiler'
import { transformFor } from '../src/plugin/transforms/vFor'
import { transformOn } from '../src/plugin/transforms/vOn'
import { transformModel } from '../src/plugin/transforms/vModel'

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
    nodeTransforms: [transformFor],
    directiveTransforms: {
      on: transformOn,
      model: transformModel,
    },
    miniProgram: {
      slot: {
        fallback: false,
      },
      directive: 's-',
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
