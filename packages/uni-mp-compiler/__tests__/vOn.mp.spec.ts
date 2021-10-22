import { ElementNode } from '@vue/compiler-core'
import { compile } from '../src'
import { MPErrorCodes } from '../src/errors'
import { CompilerOptions } from '../src/options'
import { assert } from './testUtils'

function parseWithVOn(template: string, options: CompilerOptions = {}) {
  const { ast } = compile(template, options)
  return {
    root: ast,
    node: ast.children[0] as ElementNode,
  }
}

describe('compiler(mp): transform v-on', () => {
  test('lazy element', () => {
    assert(
      `<editor/>`,
      `<editor/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<editor @ready="ready"/>`,
      `<block wx:if="{{r0}}"><editor bindready="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.ready) }
}`
    )
  })
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
