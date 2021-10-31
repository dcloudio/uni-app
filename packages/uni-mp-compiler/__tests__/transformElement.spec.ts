import { BindingTypes, ElementNode, RootNode } from '@vue/compiler-core'
import { compileTemplate, TemplateCompiler } from '@vue/compiler-sfc'
import { compile } from '../src'
import * as MPCompiler from '../src'
import { MPErrorCodes } from '../src/errors'
import { CodegenRootNode, CompilerOptions } from '../src/options'
import { BindingComponentTypes } from '../src/transform'
import { createUniVueTransformAssetUrls } from '@dcloudio/uni-cli-shared'

function parseWithElementTransform(
  template: string,
  options: CompilerOptions = {}
): {
  code: string
  preamble: string
  root: RootNode
  node: ElementNode
} {
  const { ast, code, preamble } = compile(`<div>${template}</div>`, {
    generatorOpts: {
      concise: true,
    },
    ...options,
  })
  const node = (ast as any).children[0].children[0]
  return {
    code,
    preamble,
    root: ast,
    node,
  }
}

describe('compiler: element transform', () => {
  test(`transformAssetUrls`, () => {
    const result = compileTemplate({
      source: `<image src="/static/logo.png"/>`,
      filename: 'foo.vue',
      id: 'foo',

      compiler: MPCompiler as unknown as TemplateCompiler,
      compilerOptions: {
        mode: 'module',
        generatorOpts: {
          concise: true,
        },
      } as any,
      transformAssetUrls: {
        includeAbsolute: true,
        ...(createUniVueTransformAssetUrls('/') as Record<string, any>),
      },
    })
    expect(result.code).toBe(`import _imports_0 from '/static/logo.png'

export function render(_ctx, _cache) {
  return { a: _imports_0 }
}`)
  })

  test('import + resolve component', () => {
    const { root } = parseWithElementTransform(`<Foo/>`)
    expect((root as CodegenRootNode).bindingComponents).toEqual({
      Foo: { name: '_component_Foo', type: BindingComponentTypes.UNKNOWN },
    })
    // expect(code).toContain(`if (!Math) { Math.max.call(Max, _component_Foo) }`)
  })

  test('import + resolve component multi', () => {
    const { root, code } = parseWithElementTransform(
      `<Foo/><Bar/><Example/><Test/>`,
      {
        filename: `/foo/bar/Test.vue?vue&type=template`,
        bindingMetadata: {
          Example: BindingTypes.SETUP_MAYBE_REF,
        },
      }
    )
    expect((root as CodegenRootNode).bindingComponents).toEqual({
      Foo: { name: '_component_Foo', type: BindingComponentTypes.UNKNOWN },
      Bar: { name: '_component_Bar', type: BindingComponentTypes.UNKNOWN },
      Example: { name: '$setup["Example"]', type: BindingComponentTypes.SETUP },
      Test: { name: '_component_Test', type: BindingComponentTypes.UNKNOWN },
    })
    expect(code).toContain(
      `if (!Math) { Math.max.call(Max, $setup["Example"]) }`
    )
  })

  test('resolve implcitly self-referencing component', () => {
    const { root } = parseWithElementTransform(`<Example/>`, {
      filename: `/foo/bar/Example.vue?vue&type=template`,
    })
    expect((root as CodegenRootNode).bindingComponents).toEqual({
      Example: {
        name: '_component_Example',
        type: BindingComponentTypes.UNKNOWN,
      },
    })
  })

  test('resolve component from setup bindings', () => {
    const { root, code } = parseWithElementTransform(`<Example/>`, {
      bindingMetadata: {
        Example: BindingTypes.SETUP_MAYBE_REF,
      },
    })
    expect((root as CodegenRootNode).bindingComponents).toEqual({
      Example: { name: '$setup["Example"]', type: BindingComponentTypes.SETUP },
    })
    expect(code).toContain(
      `if (!Math) { Math.max.call(Max, $setup["Example"]) }`
    )
  })

  test('resolve component from setup bindings (inline)', () => {
    const { root, preamble } = parseWithElementTransform(`<Example/>`, {
      inline: true,
      bindingMetadata: {
        Example: BindingTypes.SETUP_MAYBE_REF,
      },
    })
    expect((root as CodegenRootNode).bindingComponents).toEqual({
      Example: { name: '_unref(Example)', type: BindingComponentTypes.SETUP },
    })
    expect(preamble).toContain(
      `if (!Math) { Math.max.call(Max, _unref(Example)) }`
    )
  })

  test('resolve component from setup bindings (inline const)', () => {
    const { root, preamble } = parseWithElementTransform(`<Example/>`, {
      inline: true,
      bindingMetadata: {
        Example: BindingTypes.SETUP_CONST,
      },
    })
    expect((root as CodegenRootNode).bindingComponents).toEqual({
      Example: { name: 'Example', type: BindingComponentTypes.SETUP },
    })
    expect(preamble).toContain(`if (!Math) { Math.max.call(Max, Example) }`)
  })

  test('resolve namespaced component from setup bindings', () => {
    const onError = jest.fn()
    parseWithElementTransform(`<Foo.Example/>`, {
      onError,
      bindingMetadata: {
        Foo: BindingTypes.SETUP_MAYBE_REF,
      },
    })
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        code: MPErrorCodes.X_NOT_SUPPORTED,
      })
    )
  })

  test('resolve namespaced component from setup bindings (inline)', () => {
    const onError = jest.fn()
    parseWithElementTransform(`<Foo.Example/>`, {
      onError,
      inline: true,
      bindingMetadata: {
        Foo: BindingTypes.SETUP_MAYBE_REF,
      },
    })
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        code: MPErrorCodes.X_NOT_SUPPORTED,
      })
    )
  })

  test('resolve namespaced component from setup bindings (inline const)', () => {
    const onError = jest.fn()
    parseWithElementTransform(`<Foo.Example/>`, {
      onError,
      inline: true,
      bindingMetadata: {
        Foo: BindingTypes.SETUP_CONST,
      },
    })
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        code: MPErrorCodes.X_NOT_SUPPORTED,
      })
    )
  })

  test('do not resolve component from non-script-setup bindings', () => {
    const bindingMetadata = {
      Example: BindingTypes.SETUP_MAYBE_REF,
    }
    Object.defineProperty(bindingMetadata, '__isScriptSetup', { value: false })
    const { root } = parseWithElementTransform(`<Example/>`, {
      bindingMetadata,
    })
    expect((root as CodegenRootNode).bindingComponents).toEqual({
      Example: {
        name: '_component_Example',
        type: BindingComponentTypes.UNKNOWN,
      },
    })
  })

  describe('dynamic component', () => {
    test('static binding', () => {
      const onError = jest.fn()
      parseWithElementTransform(`<component is="foo" />`, {
        onError,
      })
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: MPErrorCodes.X_DYNAMIC_COMPONENT_NOT_SUPPORTED,
        })
      )
    })

    test('capitalized version w/ static binding', () => {
      const onError = jest.fn()
      parseWithElementTransform(`<Component is="foo" />`, {
        onError,
      })
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: MPErrorCodes.X_DYNAMIC_COMPONENT_NOT_SUPPORTED,
        })
      )
    })

    test('dynamic binding', () => {
      const onError = jest.fn()
      parseWithElementTransform(`<component :is="foo" />`, {
        onError,
      })
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: MPErrorCodes.X_DYNAMIC_COMPONENT_NOT_SUPPORTED,
        })
      )
    })

    test('v-is', () => {
      const onError = jest.fn()
      parseWithElementTransform(`<div v-is="'foo'" />`, {
        onError,
      })
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: MPErrorCodes.X_V_IS_NOT_SUPPORTED,
        })
      )
    })
  })
})
