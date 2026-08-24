import * as ts from 'typescript'
import { SourceMapConsumer } from 'source-map-js'
import { createUniAppXScriptMacrosTransformer } from '../src/uts/scriptMacros'
import { transformUniAppXStandardScript } from '../src/vite/plugins/uts/standardScript'

describe('UniApp X script macros', () => {
  test('transforms defineMixin and definePlugin AST calls', () => {
    const sourceFile = ts.createSourceFile(
      '/src/index.ts',
      `const mixin = defineMixin<{ value: number }>({ value: 1 })
const plugin = definePlugin(() => {})`,
      ts.ScriptTarget.Latest,
      false,
      ts.ScriptKind.TS
    )
    const transformed = ts.transform(sourceFile, [
      createUniAppXScriptMacrosTransformer({ typescript: ts }),
    ])
    const code = ts
      .createPrinter()
      .printFile(transformed.transformed[0] as ts.SourceFile)
    transformed.dispose()

    expect(code).not.toContain('defineMixin')
    expect(code).not.toContain('definePlugin')
    expect(code).toContain('const mixin = { value: 1 };')
    expect(code).toContain('const plugin = () => { };')
  })

  test('reports nestable source edits and keeps member calls unchanged', () => {
    const source = `const value = defineMixin<Type>(
  /* before */ definePlugin(createPlugin()) /* after */,
  ignored
)
const other = helper.defineMixin(value)`
    const result = transformUniAppXStandardScript(source, '/src/index.ts', ts)

    expect(result?.code).toBe(`const value = (
  /* before */ (createPlugin()) /* after */)
const other = helper.defineMixin(value)`)
    expect(result?.map.sources).toEqual(['/src/index.ts'])
    expect(result?.map.sourcesContent).toEqual([source])
  })

  test('maps generated positions back to the original source', () => {
    const source = 'const value = defineMixin({ value: 1 })'
    const result = transformUniAppXStandardScript(source, '/src/index.ts', ts)!
    const generatedColumn = result.code.indexOf('value: 1')
    const consumer = new SourceMapConsumer(result.map as any)

    expect(
      consumer.originalPositionFor({ line: 1, column: generatedColumn })
    ).toMatchObject({
      source: '/src/index.ts',
      line: 1,
      column: source.indexOf('value: 1'),
    })
  })

  test('keeps trailing comments after the first argument', () => {
    const source = 'const value = defineMixin(createPlugin() /* keep */)'

    expect(
      transformUniAppXStandardScript(source, '/src/index.ts', ts)?.code
    ).toBe('const value = (createPlugin() /* keep */)')
  })

  test.each([
    'defineMixin(value,)',
    'defineMixin<Type>(value,)',
    'definePlugin(value,)',
  ])('removes the trailing comma from %s', (expression) => {
    expect(
      transformUniAppXStandardScript(
        `const result = ${expression}`,
        '/src/index.ts',
        ts
      )?.code
    ).toBe('const result = (value)')
  })

  test('skips parsing files without script macros', () => {
    const createSourceFile = jest.fn()

    expect(
      transformUniAppXStandardScript('const value = 1', '/src/index.ts', {
        createSourceFile,
      } as any)
    ).toBeUndefined()
    expect(createSourceFile).not.toHaveBeenCalled()
  })
})
