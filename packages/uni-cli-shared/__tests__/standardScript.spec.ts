import * as ts from 'typescript'
import { SourceMapConsumer } from 'source-map-js'
import {
  resolveUniAppXStandardScriptRequest,
  transformUniAppXStandardScript,
} from '../src/vite/plugins/uts/standardScript'
import { createLoadUasmTransformer } from '../src/uasm'

const uasm = {
  resolve(modulePath: string) {
    return modulePath === 'uni_modules/test-uasm'
      ? {
          id: 'test-uasm',
          entry: '@/uni_modules/test-uasm/uasm/web/test-uasm.js',
        }
      : undefined
  },
  createLoadUasmTransformer,
}

describe('uni-app x standard script', () => {
  test.each([
    ['/src/index.ts', 'module'],
    ['/src/index.js?v=1', 'module'],
    ['/pages/index/index.uvue', 'sfc'],
    ['/components/test.vue?t=1', 'sfc'],
    ['/src/index.ts?raw', undefined],
    ['/src/index.js?url', undefined],
    ['/src/index.d.ts', undefined],
    ['/src/index.uts', undefined],
    ['/pages/index/index.uvue?vue&type=script', undefined],
  ])('resolves standard script request %s', (id, expected) => {
    expect(resolveUniAppXStandardScriptRequest(id)).toBe(expected)
  })

  test('transforms script macros and UASM in one module pass', () => {
    const source = `const plugin = definePlugin(() => uni.loadUasm<Bridge>('uni_modules/test-uasm'))`
    const result = transformUniAppXStandardScript(source, '/src/index.ts', ts, {
      uasm,
    })!

    expect(result.code).not.toContain('definePlugin')
    expect(result.code).toContain(
      'uni.loadUasm<Bridge>({ id: "test-uasm", loader: () => import("@/uni_modules/test-uasm/uasm/web/test-uasm.js") })'
    )
    expect(result.map.sourcesContent).toEqual([source])
  })

  test.each([
    `uni . loadUasm('uni_modules/test-uasm')`,
    `uni /* comment */.loadUasm('uni_modules/test-uasm')`,
  ])('transforms UASM calls containing whitespace or comments', (source) => {
    const result = transformUniAppXStandardScript(source, '/src/index.ts', ts, {
      uasm,
    })!

    expect(result.code).toContain(
      '{ id: "test-uasm", loader: () => import("@/uni_modules/test-uasm/uasm/web/test-uasm.js") }'
    )
  })

  test('does not transform UASM when the platform does not enable it', () => {
    const source = `const bridge = uni.loadUasm('uni_modules/test-uasm')`

    expect(
      transformUniAppXStandardScript(source, '/src/index.ts', ts)
    ).toBeUndefined()
  })

  test('transforms only inline JavaScript and TypeScript SFC blocks', () => {
    const source = `<script lang="uts">const legacy = defineMixin(uni.loadUasm('uni_modules/test-uasm'))</script>
<script setup lang="ts">const value = defineMixin(uni.loadUasm('uni_modules/test-uasm'))</script>`
    const result = transformUniAppXStandardScript(
      source,
      '/pages/index/index.uvue',
      ts,
      { uasm }
    )!

    expect(result.code).toContain(
      `<script lang="uts">const legacy = defineMixin(uni.loadUasm('uni_modules/test-uasm'))</script>`
    )
    expect(result.code).toContain(
      `<script setup lang="ts">const value = (uni.loadUasm({ id: "test-uasm", loader: () => import("@/uni_modules/test-uasm/uasm/web/test-uasm.js") }))</script>`
    )
  })

  test('maps transformed SFC code back to the original source', () => {
    const source = `<script setup lang="ts">const value = defineMixin({ value: 1 })</script>`
    const result = transformUniAppXStandardScript(
      source,
      '/pages/index/index.uvue',
      ts
    )!
    const generatedColumn = result.code.indexOf('value: 1')
    const consumer = new SourceMapConsumer(result.map as any)

    expect(
      consumer.originalPositionFor({ line: 1, column: generatedColumn })
    ).toMatchObject({
      source: '/pages/index/index.uvue',
      line: 1,
      column: source.indexOf('value: 1'),
    })
  })

  test('reports UASM diagnostics at the original SFC offset', () => {
    const source = `<script setup lang="ts">uni.loadUasm('missing')</script>`

    try {
      transformUniAppXStandardScript(source, '/pages/index/index.uvue', ts, {
        uasm,
      })
      throw new Error('expected UASM transform to fail')
    } catch (error) {
      expect(error).toMatchObject({
        id: '/pages/index/index.uvue',
        pos: source.indexOf("'missing'"),
      })
    }
  })

  test('skips AST parsing when no enabled transform is present', () => {
    const createSourceFile = jest.fn()

    expect(
      transformUniAppXStandardScript(
        '<script setup lang="ts">const value = 1</script>',
        '/pages/index/index.uvue',
        { createSourceFile } as any
      )
    ).toBeUndefined()
    expect(createSourceFile).not.toHaveBeenCalled()
  })
})
