import { extend } from '@vue/shared'
import {
  type CompilerOptions,
  baseParse as parse,
  transform,
  transformElement,
} from '@vue/compiler-core'
import { ErrorCodes } from '../../../src/plugins/android/uvue/compiler/errors'
import { transformVHtml } from '../../../src/plugins/android/uvue/compiler/transforms/vHtml'
import { transformExpression } from '../../../src/plugins/android/uvue/compiler/transforms/transformExpression'
import { assert } from '../testUtils'

function parseWithVHtml(template: string, options: CompilerOptions = {}) {
  const ast = parse(template)

  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers: options.prefixIdentifiers,
      nodeTransforms: [transformVHtml, transformExpression, transformElement],
    })
  )

  return ast
}

describe('compiler: transform v-html', () => {
  test('simple expression', () => {
    assert(
      `<view v-html="html" />`,
      `_cE(\"view\", null, [
  _cE(\"rich-text\", _uM({ nodes: _ctx.html }), null, 8 /* PROPS */, [\"nodes\"])
])`
    )
  })

  test('Non-Element should be ignored', () => {
    assert(`<Foo v-html="html" />`, `_cV(_component_Foo)`)
  })

  test('should throw error when missing expression', () => {
    const onError = jest.fn()
    parseWithVHtml('<view v-html="" />', {
      onError,
      prefixIdentifiers: true,
    })

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        code: ErrorCodes.X_V_HTML_NO_EXPRESSION,
      })
    )
  })

  test('should throw error when has children', () => {
    const onError = jest.fn()
    parseWithVHtml(
      '<view v-html="html"><text>text child in v-html</text></view>',
      {
        onError,
        prefixIdentifiers: true,
      }
    )

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        code: ErrorCodes.X_V_HTML_WITH_CHILDREN,
      })
    )
  })
})
