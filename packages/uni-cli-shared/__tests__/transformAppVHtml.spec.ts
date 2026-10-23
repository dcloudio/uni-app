import {
  type CompilerError,
  type DirectiveNode,
  type ElementNode,
  NodeTypes,
  baseParse,
  transform,
} from '@vue/compiler-core'
import { transformAppVHtml } from '../src/vue/transforms/x/transformVHtml'

function parse(template: string) {
  const warnings: CompilerError[] = []
  const errors: CompilerError[] = []
  const ast = baseParse(template, {
    isNativeTag: (tag) => tag === 'view' || tag === 'text',
  })

  transform(ast, {
    nodeTransforms: [transformAppVHtml],
    onWarn: (warning) => warnings.push(warning),
    onError: (error) => errors.push(error),
  })

  return { ast, warnings, errors }
}

describe('compiler: app-x v-html', () => {
  test('only transforms view', () => {
    const { ast, warnings, errors } = parse('<view v-html="html" />')
    const view = ast.children[0] as ElementNode

    expect(view.type).toBe(NodeTypes.ELEMENT)
    expect(view.props).toHaveLength(0)
    expect(view.children).toHaveLength(1)
    expect(view.children[0]).toMatchObject({
      type: NodeTypes.ELEMENT,
      tag: 'rich-text',
      tagType: 1,
    })
    expect(warnings).toHaveLength(0)
    expect(errors).toHaveLength(0)
  })

  test('warns and ignores unsupported tags', () => {
    const { ast, warnings, errors } = parse('<text v-html="html" />')
    const text = ast.children[0] as ElementNode

    expect(text.type).toBe(NodeTypes.ELEMENT)
    expect(text.props).toHaveLength(0)
    expect(text.children).toHaveLength(0)
    expect(warnings).toHaveLength(1)
    expect(warnings[0].code).toBe('X_APP_V_HTML_UNSUPPORTED_TAG')
    expect(errors).toHaveLength(0)
  })

  test('keeps children when ignoring unsupported tags', () => {
    const { ast, warnings, errors } = parse(
      '<text v-html="html">fallback</text>'
    )
    const text = ast.children[0] as ElementNode

    expect(text.props).toHaveLength(0)
    expect(text.children).toMatchObject([
      { type: NodeTypes.TEXT, content: 'fallback' },
    ])
    expect(warnings).toHaveLength(1)
    expect(errors).toHaveLength(0)
  })

  test('warns and ignores component tags', () => {
    const { ast, warnings, errors } = parse('<Foo v-html="html" />')
    const component = ast.children[0] as ElementNode

    expect(component.type).toBe(NodeTypes.ELEMENT)
    expect(component.props).toHaveLength(0)
    expect(warnings).toHaveLength(1)
    expect(warnings[0].code).toBe('X_APP_V_HTML_UNSUPPORTED_TAG')
    expect(errors).toHaveLength(0)
  })

  test('reports invalid view usage with no expression or children', () => {
    const { ast, warnings, errors } = parse('<view v-html>fallback</view>')
    const view = ast.children[0] as ElementNode
    const richText = view.children[0] as ElementNode
    const nodes = richText.props[0] as DirectiveNode

    expect(nodes.type).toBe(NodeTypes.DIRECTIVE)
    expect(nodes.exp).toMatchObject({
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: '',
      isStatic: false,
    })
    expect(errors.map((error) => error.code)).toEqual([
      'X_APP_V_HTML_NO_EXPRESSION',
      'X_APP_V_HTML_WITH_CHILDREN',
    ])
    expect(warnings).toHaveLength(0)
  })
})
