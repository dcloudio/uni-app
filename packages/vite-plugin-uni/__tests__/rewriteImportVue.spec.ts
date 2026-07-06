import { SourceMapConsumer } from 'source-map-js'

import { rewriteImportVue } from '../src/uvue/plugins/rewriteImportVue'

function generatedPositionFor(code: string, pattern: string) {
  const index = code.indexOf(pattern)
  expect(index).toBeGreaterThanOrEqual(0)
  const before = code.slice(0, index)
  const lines = before.split('\n')
  return {
    line: lines.length,
    column: lines[lines.length - 1].length,
  }
}

function importRangeOf(code: string, importStatement: string) {
  const ss = code.indexOf(importStatement)
  expect(ss).toBeGreaterThanOrEqual(0)
  return {
    ss,
    se: ss + importStatement.length,
  }
}

describe('rewriteImportVue', () => {
  test('rewrites vue imports and preserves sourceMap mappings', async () => {
    const vueImport = [
      `import {`,
      `  ref as r,`,
      `  computed,`,
      `} from 'vue'`,
    ].join('\n')
    const input = [
      `${vueImport};`,
      `import Foo from './foo';`,
      `const value = computed(() => r(1));`,
      `export { Foo, value };`,
      ``,
    ].join('\n')

    const rewritten = rewriteImportVue(input, [importRangeOf(input, vueImport)])
    const code = rewritten.toString()
    const map = rewritten.generateMap({ hires: 'boundary' })

    expect(code).toBe(
      [
        `const { ref: r, computed } = globalThis.Vue;`,
        `import Foo from './foo';`,
        `const value = computed(() => r(1));`,
        `export { Foo, value };`,
        ``,
      ].join('\n')
    )

    const consumer = new SourceMapConsumer(map as any)
    const original = consumer.originalPositionFor(
      generatedPositionFor(code, 'const value')
    )
    expect(original).toMatchObject({
      line: 6,
      column: 0,
    })
  })

  test('rewrites default, namespace and named vue imports', async () => {
    const defaultImport = `import Vue from 'vue'`
    const namespaceImport = `import * as VueNS from 'vue'`
    const namedImport = `import { ref as r, computed } from 'vue'`
    const input = [
      `${defaultImport};`,
      `${namespaceImport};`,
      `${namedImport};`,
      `import other from './other';`,
      `export { Vue, VueNS, r, computed, other };`,
      ``,
    ].join('\n')

    const rewritten = rewriteImportVue(input, [
      importRangeOf(input, defaultImport),
      importRangeOf(input, namespaceImport),
      importRangeOf(input, namedImport),
    ])

    expect(rewritten.toString()).toBe(
      [
        `const { default: Vue } = globalThis.Vue;`,
        `const VueNS = globalThis.Vue;`,
        `const { ref: r, computed } = globalThis.Vue;`,
        `import other from './other';`,
        `export { Vue, VueNS, r, computed, other };`,
        ``,
      ].join('\n')
    )
  })
})
