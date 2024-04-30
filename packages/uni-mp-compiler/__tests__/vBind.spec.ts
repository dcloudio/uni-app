import { type ElementNode, ErrorCodes } from '@vue/compiler-core'
import { compile } from '../src'
import { MPErrorCodes } from '../src/errors'
import type { CompilerOptions } from '../src/options'
import { assert, miniProgram } from './testUtils'

function parseWithVBind(template: string, options: CompilerOptions = {}) {
  const { ast, code } = compile(template, {
    generatorOpts: {
      concise: true,
    },
    ...options,
  })
  return {
    code,
    node: ast.children[0] as ElementNode,
  }
}

describe('compiler: transform v-bind', () => {
  test('basic', () => {
    assert(
      `<view v-bind:id="id"/>`,
      `<view id="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.id }
}`,
      {}
    )
  })

  test('literal', () => {
    assert(
      `<view :number="20" :str="'str'" :boolean="true" :null="null" :undefined="undefined"/>`,
      `<view number="{{20}}" str="{{'str'}}" boolean="{{true}}" null="{{null}}" undefined="{{undefined}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('dynamic arg', () => {
    const onError = jest.fn()
    parseWithVBind(`<view v-bind:[id]="id" />`, {
      onError,
      filename: 'foo.vue',
      miniProgram: {
        ...miniProgram,
        emitFile({ source }) {
          expect(source).toBe(`<view/>`)
          return ''
        },
      },
    })
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 23,
        },
      },
    })
    parseWithVBind(`<view v-bind:[foo.id]="id" />`, {
      onError,
      filename: 'foo.vue',
      miniProgram: {
        ...miniProgram,
        emitFile({ source }) {
          expect(source).toBe(`<view/>`)
          return ''
        },
      },
    })
    expect(onError.mock.calls[1][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 27,
        },
      },
    })
  })

  test('should error if no expression', () => {
    const onError = jest.fn()
    parseWithVBind(`<view v-bind />`, { onError })
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_NO_ARGUMENT,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 13,
        },
      },
    })
    parseWithVBind(`<view v-bind:arg />`, { onError })
    expect(onError.mock.calls[1][0]).toMatchObject({
      code: ErrorCodes.X_V_BIND_NO_EXPRESSION,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 17,
        },
      },
    })
  })

  test('.camel modifier', () => {
    assert(
      `<view v-bind:foo-bar.camel="id"/>`,
      '<view fooBar="{{a}}"/>',
      `(_ctx, _cache) => {
  return { a: _ctx.id }
}`
    )
  })

  test('.camel modifier w/ dynamic arg', () => {
    const onError = jest.fn()
    parseWithVBind(`<view v-bind:[foo].camel="id"/>`, {
      onError,
      prefixIdentifiers: false,
      filename: 'foo.vue',
      miniProgram: {
        ...miniProgram,
        emitFile({ source }) {
          expect(source).toBe(`<view/>`)
          return ''
        },
      },
    })
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 30,
        },
      },
    })
  })

  test('.camel modifier w/ dynamic arg + prefixIdentifiers', () => {
    const onError = jest.fn()
    parseWithVBind(`<view v-bind:[foo].camel="id"/>`, {
      onError,
      prefixIdentifiers: true,
      filename: 'foo.vue',
      miniProgram: {
        ...miniProgram,
        emitFile({ source }) {
          expect(source).toBe(`<view/>`)
          return ''
        },
      },
    })
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 30,
        },
      },
    })
  })

  test('.prop modifier', () => {
    const onWarn = jest.fn()
    parseWithVBind(`<view v-bind:fooBar.prop="id"/>`, { onWarn })
    expect(onWarn.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_MODIFIER_PROP,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 30,
        },
      },
    })
  })

  test('.prop modifier w/ dynamic arg', () => {
    const onError = jest.fn()
    parseWithVBind(`<view v-bind:[fooBar].prop="id"/>`, {
      onError,
      filename: 'foo.vue',
      prefixIdentifiers: false,
      miniProgram: {
        ...miniProgram,
        emitFile({ source }) {
          expect(source).toBe(`<view/>`)
          return ''
        },
      },
    })
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 32,
        },
      },
    })
  })

  test('.prop modifier w/ dynamic arg + prefixIdentifiers', () => {
    const onError = jest.fn()
    parseWithVBind(`<view v-bind:[foo(bar)].prop="id"/>`, {
      onError,
      prefixIdentifiers: true,
      filename: 'foo.vue',
      miniProgram: {
        ...miniProgram,
        emitFile({ source }) {
          expect(source).toBe(`<view/>`)
          return ''
        },
      },
    })
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 34,
        },
      },
    })
  })

  test('.prop modifier (shorthand)', () => {
    const onWarn = jest.fn()
    parseWithVBind(`<view .fooBar="id"/>`, {
      onWarn,
      filename: 'foo.vue',
      miniProgram: {
        ...miniProgram,
        emitFile({ source }) {
          expect(source).toBe(`<view fooBar="{{a}}"/>`)
          return ''
        },
      },
    })
    expect(onWarn.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_MODIFIER_PROP,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 19,
        },
      },
    })
  })

  test('.attr modifier', () => {
    const onWarn = jest.fn()
    parseWithVBind(`<view v-bind:foo-bar.attr="id"/>`, {
      onWarn,
      filename: 'foo.vue',
      miniProgram: {
        ...miniProgram,
        emitFile({ source }) {
          expect(source).toBe(`<view foo-bar="{{a}}"/>`)
          return ''
        },
      },
    })
    expect(onWarn.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_MODIFIER_ATTR,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 31,
        },
      },
    })
  })
})
