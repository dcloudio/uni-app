import type { ElementNode } from '@vue/compiler-core'
import { compile } from '../src'
import { MPErrorCodes } from '../src/errors'
import type { CompilerOptions } from '../src/options'

function parseWithVOn(template: string, options: CompilerOptions = {}) {
  const { ast } = compile(template, {
    generatorOpts: {
      concise: true,
    },
    ...options,
  })
  return {
    root: ast,
    node: ast.children[0] as ElementNode,
  }
}

describe('compiler(mp): transform v-on', () => {
  test('should error if dynamic event', () => {
    const onError = jest.fn()
    parseWithVOn(`<div v-on:[event]="onClick" />`, { onError })
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_ON_DYNAMIC_EVENT,
      loc: {
        start: {
          line: 1,
          column: 6,
        },
        end: {
          line: 1,
          column: 28,
        },
      },
    })
  })
})
