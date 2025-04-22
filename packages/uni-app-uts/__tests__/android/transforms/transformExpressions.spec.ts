// import { PatchFlagNames, PatchFlags } from '@vue/shared'
import {
  BindingTypes,
  ConstantTypes,
  type DirectiveNode,
  type ElementNode,
  type InterpolationNode,
  NodeTypes,
  baseParse as parse,
} from '@vue/compiler-core'
import { transform } from '../../../src/plugins/android/uvue/compiler/transform'
import { transformIf } from '../../../src/plugins/android/uvue/compiler/transforms/vIf'
import { transformExpression } from '../../../src/plugins/android/uvue/compiler/transforms/transformExpression'

import { compile as baseCompile } from '../../../src/plugins/android/uvue/compiler'
import type { TemplateCompilerOptions } from '../../../src/plugins/android/uvue/compiler/options'

function parseWithExpressionTransform(
  template: string,
  options: TemplateCompilerOptions = {}
) {
  const ast = parse(template)
  transform(ast, {
    prefixIdentifiers: true,
    nodeTransforms: [transformIf, transformExpression],
    ...options,
  })
  return ast.children[0]
}

describe('compiler: expression transform', () => {
  test('interpolation (root)', () => {
    const node = parseWithExpressionTransform(`{{ foo }}`) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: `_ctx.foo`,
    })
  })

  test('empty interpolation', () => {
    const node = parseWithExpressionTransform(`{{}}`) as InterpolationNode
    const node2 = parseWithExpressionTransform(`{{ }}`) as InterpolationNode
    const node3 = parseWithExpressionTransform(
      `<view>{{ }}</view>`
    ) as ElementNode

    const objectToBeMatched = {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: ``,
    }
    expect(node.content).toMatchObject(objectToBeMatched)
    expect(node2.content).toMatchObject(objectToBeMatched)
    expect((node3.children[0] as InterpolationNode).content).toMatchObject(
      objectToBeMatched
    )
  })

  test('interpolation (children)', () => {
    const el = parseWithExpressionTransform(
      `<view>{{ foo }}</view>`
    ) as ElementNode
    const node = el.children[0] as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: `_ctx.foo`,
    })
  })

  test('interpolation (complex)', () => {
    const el = parseWithExpressionTransform(
      `<view>{{ foo + bar(baz.qux) }}</view>`
    ) as ElementNode
    const node = el.children[0] as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        { content: `_ctx.foo` },
        ` + `,
        { content: `_ctx.bar` },
        `(`,
        { content: `_ctx.baz` },
        `.`,
        { content: `qux` },
        `)`,
      ],
    })
  })

  test('directive value', () => {
    const node = parseWithExpressionTransform(
      `<view v-foo:arg="baz"/>`
    ) as ElementNode
    const arg = (node.props[0] as DirectiveNode).arg!
    expect(arg).toMatchObject({
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: `arg`,
    })
    const exp = (node.props[0] as DirectiveNode).exp!
    expect(exp).toMatchObject({
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: `_ctx.baz`,
    })
  })

  test('dynamic directive arg', () => {
    const node = parseWithExpressionTransform(
      `<view v-foo:[arg]="baz"/>`
    ) as ElementNode
    const arg = (node.props[0] as DirectiveNode).arg!
    expect(arg).toMatchObject({
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: `_ctx.arg`,
    })
    const exp = (node.props[0] as DirectiveNode).exp!
    expect(exp).toMatchObject({
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: `_ctx.baz`,
    })
  })

  test('should prefix complex expressions', () => {
    const node = parseWithExpressionTransform(
      `{{ foo(baz + 1, { key: kuz }) }}`
    ) as InterpolationNode
    // should parse into compound expression
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        {
          content: `_ctx.foo`,
          loc: {
            source: `foo`,
            start: {
              offset: 3,
              line: 1,
              column: 4,
            },
            end: {
              offset: 6,
              line: 1,
              column: 7,
            },
          },
        },
        `(`,
        {
          content: `_ctx.baz`,
          loc: {
            source: `baz`,
            start: {
              offset: 7,
              line: 1,
              column: 8,
            },
            end: {
              offset: 10,
              line: 1,
              column: 11,
            },
          },
        },
        ` + 1, { key: `,
        {
          content: `_ctx.kuz`,
          loc: {
            source: `kuz`,
            start: {
              offset: 23,
              line: 1,
              column: 24,
            },
            end: {
              offset: 26,
              line: 1,
              column: 27,
            },
          },
        },
        ` })`,
      ],
    })
  })

  test('should not prefix whitelisted globals', () => {
    const node = parseWithExpressionTransform(
      `{{ Math.max(1, 2) }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [{ content: `Math` }, `.`, { content: `max` }, `(1, 2)`],
    })

    const node2 = parseWithExpressionTransform(
      `{{ uni.env.USER_DATA_PATH }}`
    ) as InterpolationNode
    expect(node2.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        { content: `uni` },
        `.`,
        { content: `env` },
        `.`,
        { content: `USER_DATA_PATH` },
      ],
    })
  })

  test('should not prefix reserved literals', () => {
    function assert(exp: string) {
      const node = parseWithExpressionTransform(
        `{{ ${exp} }}`
      ) as InterpolationNode
      expect(node.content).toMatchObject({
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: exp,
      })
    }
    assert(`true`)
    assert(`false`)
    assert(`null`)
    assert(`this`)
  })

  test('should not prefix id of a function declaration', () => {
    const node = parseWithExpressionTransform(
      `{{ function foo() { return bar } }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        `function `,
        { content: `foo` },
        `() { return `,
        { content: `_ctx.bar` },
        ` }`,
      ],
    })
  })

  test('should not prefix params of a function expression', () => {
    const node = parseWithExpressionTransform(
      `{{ foo => foo + bar }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        { content: `foo` },
        ` => `,
        { content: `foo` },
        ` + `,
        { content: `_ctx.bar` },
      ],
    })
  })

  test('should prefix default value of a function expression param', () => {
    const node = parseWithExpressionTransform(
      `{{ (foo = baz) => foo + bar }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        `(`,
        { content: `foo` },
        ` = `,
        { content: `_ctx.baz` },
        `) => `,
        { content: `foo` },
        ` + `,
        { content: `_ctx.bar` },
      ],
    })
  })

  test('should not prefix function param destructuring', () => {
    const node = parseWithExpressionTransform(
      `{{ ({ foo }) => foo + bar }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        `({ `,
        { content: `foo` },
        ` }) => `,
        { content: `foo` },
        ` + `,
        { content: `_ctx.bar` },
      ],
    })
  })

  test('function params should not affect out of scope identifiers', () => {
    const node = parseWithExpressionTransform(
      `{{ { a: foo => foo, b: foo } }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        `{ a: `,
        { content: `foo` },
        ` => `,
        { content: `foo` },
        `, b: `,
        { content: `_ctx.foo` },
        ` }`,
      ],
    })
  })

  test('should prefix default value of function param destructuring', () => {
    const node = parseWithExpressionTransform(
      `{{ ({ foo = bar }) => foo + bar }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        `({ `,
        { content: `foo` },
        ` = `,
        { content: `_ctx.bar` },
        ` }) => `,
        { content: `foo` },
        ` + `,
        { content: `_ctx.bar` },
      ],
    })
  })
  test('should not prefix an object property key', () => {
    const node = parseWithExpressionTransform(
      `{{ { foo() { baz() }, value: bar } }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        `{ foo() { `,
        { content: `_ctx.baz` },
        `() }, value: `,
        { content: `_ctx.bar` },
        ` }`,
      ],
    })
  })

  test('should not duplicate object key with same name as value', () => {
    const node = parseWithExpressionTransform(
      `{{ { foo: foo } }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [`{ foo: `, { content: `_ctx.foo` }, ` }`],
    })
  })

  test('should prefix a computed object property key', () => {
    const node = parseWithExpressionTransform(
      `{{ { [foo]: bar } }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        `{ [`,
        { content: `_ctx.foo` },
        `]: `,
        { content: `_ctx.bar` },
        ` }`,
      ],
    })
  })

  test('should prefix object property shorthand value', () => {
    const node = parseWithExpressionTransform(
      `{{ { foo } }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [`{ foo: `, { content: `_ctx.foo` }, ` }`],
    })
  })

  test('should not prefix id in a member expression', () => {
    const node = parseWithExpressionTransform(
      `{{ foo.bar.baz }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        { content: `_ctx.foo` },
        `.`,
        { content: `bar` },
        `.`,
        { content: `baz` },
      ],
    })
  })

  test('should prefix computed id in a member expression', () => {
    const node = parseWithExpressionTransform(
      `{{ foo[bar][baz] }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        { content: `_ctx.foo` },
        `[`,
        { content: `_ctx.bar` },
        `][`,
        { content: '_ctx.baz' },
        `]`,
      ],
    })
  })

  test('should handle parse error', () => {
    // const onError = vi.fn()
    // parseWithExpressionTransform(`{{ a( }}`, { onError })
    // expect(onError.mock.calls[0][0].message).toMatch(
    //   `Error parsing JavaScript expression: Unexpected token`
    // )
  })

  test('should prefix in assignment', () => {
    const node = parseWithExpressionTransform(
      `{{ x = 1 }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [{ content: `_ctx.x` }, ` = 1`],
    })
  })

  test('should prefix in assignment pattern', () => {
    const node = parseWithExpressionTransform(
      `{{ { x, y: [z] } = obj }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      type: NodeTypes.COMPOUND_EXPRESSION,
      children: [
        `{ x: `,
        { content: `_ctx.x` },
        `, y: [`,
        { content: `_ctx.z` },
        `] } = `,
        { content: `_ctx.obj` },
      ],
    })
  })

  // #8295
  test('should treat floating point number literals as constant', () => {
    const node = parseWithExpressionTransform(
      `{{ [1, 2.1] }}`
    ) as InterpolationNode
    expect(node.content).toMatchObject({
      constType: ConstantTypes.CAN_STRINGIFY,
    })
  })

  describe('ES Proposals support', () => {
    test('bigInt', () => {
      const node = parseWithExpressionTransform(
        `{{ 13000n }}`
      ) as InterpolationNode
      expect(node.content).toMatchObject({
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: `13000n`,
        isStatic: false,
        constType: ConstantTypes.CAN_STRINGIFY,
      })
    })

    test('nullish coalescing', () => {
      const node = parseWithExpressionTransform(
        `{{ a ?? b }}`
      ) as InterpolationNode
      expect(node.content).toMatchObject({
        type: NodeTypes.COMPOUND_EXPRESSION,
        children: [{ content: `_ctx.a` }, ` ?? `, { content: `_ctx.b` }],
      })
    })

    test('optional chaining', () => {
      const node = parseWithExpressionTransform(
        `{{ a?.b?.c }}`
      ) as InterpolationNode
      expect(node.content).toMatchObject({
        type: NodeTypes.COMPOUND_EXPRESSION,
        children: [
          { content: `_ctx.a` },
          `?.`,
          { content: `b` },
          `?.`,
          { content: `c` },
        ],
      })
    })

    test('Enabling additional plugins', () => {
      // enabling pipeline operator to replace filters:
      // const node = parseWithExpressionTransform(`{{ a |> uppercase }}`, {
      //   expressionPlugins: [
      //     [
      //       'pipelineOperator',
      //       {
      //         proposal: 'minimal',
      //       },
      //     ],
      //   ],
      // }) as InterpolationNode
      // expect(node.content).toMatchObject({
      //   type: NodeTypes.COMPOUND_EXPRESSION,
      //   children: [
      //     { content: `_ctx.a` },
      //     ` |> `,
      //     { content: `_ctx.uppercase` },
      //   ],
      // })
    })
  })

  describe('bindingMetadata', () => {
    const bindingMetadata = {
      props: BindingTypes.PROPS,
      setup: BindingTypes.SETUP_MAYBE_REF,
      setupConst: BindingTypes.SETUP_CONST,
      data: BindingTypes.DATA,
      options: BindingTypes.OPTIONS,
      reactive: BindingTypes.SETUP_REACTIVE_CONST,
      literal: BindingTypes.LITERAL_CONST,
      isNaN: BindingTypes.SETUP_REF,
    }

    function compileWithBindingMetadata(
      template: string,
      options?: TemplateCompilerOptions
    ) {
      return baseCompile(template, {
        prefixIdentifiers: true,
        bindingMetadata,
        ...options,
      })
    }

    test('non-inline mode', () => {
      const { code } = compileWithBindingMetadata(
        `<view>{{ props }} {{ setup }} {{ data }} {{ options }} {{ isNaN }}</view>`
      )
      expect(code).toMatch(`_ctx.props`)
      expect(code).toMatch(`_ctx.setup`)
      expect(code).toMatch(`_ctx.isNaN`)
      expect(code).toMatch(`_ctx.data`)
      expect(code).toMatch(`_ctx.options`)
      // expect(code).toMatch(`_ctx, _cache, $props, $setup, $data, $options`)
      expect(code).toMatchSnapshot()
    })

    test('should not prefix temp variable of for...in', () => {
      const { code } = compileWithBindingMetadata(
        `<view @click="() => {
          for (const x in list) {
            log(x)
          }         
        }"/>`
      )
      expect(code).not.toMatch(`_ctx.x`)
      expect(code).toMatchSnapshot()
    })

    test('should not prefix temp variable of for...of', () => {
      const { code } = compileWithBindingMetadata(
        `<view @click="() => {
          for (const x of list) {
            log(x)
          }         
        }"/>`
      )
      expect(code).not.toMatch(`_ctx.x`)
      expect(code).toMatchSnapshot()
    })

    test('should not prefix temp variable of for loop', () => {
      const { code } = compileWithBindingMetadata(
        `<view @click="() => {
          for (let i = 0; i < list.length; i++) {
            log(i)
          }         
        }"/>`
      )
      expect(code).not.toMatch(`_ctx.i`)
      expect(code).toMatchSnapshot()
    })

    test('inline mode', () => {
      const { code } = compileWithBindingMetadata(
        `<view>{{ props }} {{ setup }} {{ setupConst }} {{ data }} {{ options }} {{ isNaN }}</view>`,
        { inline: true }
      )
      expect(code).toMatch(`_ctx.props`)
      expect(code).toMatch(`unref(setup)`)
      expect(code).toMatch(`toDisplayString(setupConst)`)
      expect(code).toMatch(`_ctx.data`)
      expect(code).toMatch(`_ctx.options`)
      expect(code).toMatch(`isNaN.value`)
      expect(code).toMatchSnapshot()
    })

    test('literal const handling', () => {
      const { code } = compileWithBindingMetadata(
        `<view>{{ literal }}</view>`,
        {
          inline: true,
        }
      )
      expect(code).toMatch(`toDisplayString(literal)`)
      // #7973 should skip patch for literal const
      // TODO
      // expect(code).not.toMatch(
      //   `${PatchFlags.TEXT} /* ${PatchFlagNames[PatchFlags.TEXT]} */`
      // )
    })

    test('literal const handling， non-inline mode', () => {
      const { code } = compileWithBindingMetadata(`<view>{{ literal }}</view>`)
      expect(code).toMatch(`toDisplayString(_ctx.literal)`)
      // #7973 should skip patch for literal const
      // TODO
      // expect(code).not.toMatch(
      //   `${PatchFlags.TEXT} /* ${PatchFlagNames[PatchFlags.TEXT]} */`
      // )
    })

    test('reactive const handling', () => {
      // const { code } = compileWithBindingMetadata(`<view>{{ reactive }}</view>`, {
      //   inline: true,
      // })
      // #7973 should not skip patch for reactive const
      // TODO
      // expect(code).toMatch(
      //   `${PatchFlags.TEXT} /* ${PatchFlagNames[PatchFlags.TEXT]} */`
      // )
    })
  })
})
