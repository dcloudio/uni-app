import { type OutputChunk, rollup } from 'rollup'
import { SourceMapConsumer } from 'source-map-js'

import {
  rewriteImportVue,
  rewriteImportVuePlugin,
} from '../src/uvue/plugins/rewriteImportVue'

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

describe('rewriteImportVuePlugin', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test.each<[NodeJS.ProcessEnv['UNI_UTS_PLATFORM'], 'arkts' | 'jsvm', boolean]>(
    [
      ['app-harmony', 'arkts', true],
      ['app-harmony', 'jsvm', false],
      ['app-ios', 'arkts', false],
    ]
  )(
    'handles Vue dependencies in ESM chunks for %s (%s)',
    async (platform, scriptEngine, rewritesChunks) => {
      jest.replaceProperty(process, 'env', {
        ...process.env,
        UNI_UTS_PLATFORM: platform,
        UNI_APP_X_HARMONY_SCRIPT_ENGINE: scriptEngine,
      })

      const sources = new Map([
        [
          'main.js',
          `import { useStore } from 'pinia.js';
export const counter = useStore();
export const loadPage = () => import('page.js');`,
        ],
        [
          'page.js',
          `import { computed } from 'vue';
import { useStore } from 'store.js';
export default () => computed(() => useStore().value);`,
        ],
        ['store.js', `export { useStore } from 'pinia.js';`],
        [
          'pinia.js',
          `import { ref } from 'vue-demi.js';
export const useStore = () => ref(0);`,
        ],
        ['vue-demi.js', `export * from 'vue';`],
      ])
      const bundle = await rollup({
        input: 'main.js',
        external: ['vue'],
        plugins: [
          {
            name: 'vue-chunk-fixture',
            resolveId(id) {
              if (sources.has(id)) {
                return id
              }
            },
            load(id) {
              return sources.get(id)
            },
          },
          rewriteImportVuePlugin(),
        ],
      })
      try {
        const { output } = await bundle.generate({
          format: 'es',
          entryFileNames: 'app-service.js',
          chunkFileNames: 'assets/[name].js',
          sourcemap: true,
          manualChunks: {
            'pages/index/index': ['page.js'],
            'store/index': ['store.js'],
            vendor: ['pinia.js', 'vue-demi.js'],
          },
        })
        const chunks = Object.fromEntries(
          output
            .filter((chunk): chunk is OutputChunk => chunk.type === 'chunk')
            .map((chunk) => [chunk.fileName, chunk])
        )
        const page = chunks['assets/pages/index/index.js']
        const vendor = chunks['assets/vendor.js']
        expect(page.code).toContain('const { computed } = globalThis.Vue')
        if (rewritesChunks) {
          for (const chunk of Object.values(chunks)) {
            expect(chunk.code).not.toMatch(/^import[^\n]*['"]vue['"]/m)
          }
          expect(vendor.code).toContain('const { ref } = globalThis.Vue')
          const consumer = new SourceMapConsumer(
            JSON.parse(page.map!.toString())
          )
          const original = consumer.originalPositionFor(
            generatedPositionFor(page.code, 'useStore().value')
          )
          expect(original).toMatchObject({ line: 3 })
          expect(original.source).toMatch(/(?:^|\/)page\.js$/)
        } else {
          expect(chunks['app-service.js'].code).toMatch(/^import ['"]vue['"]/m)
          expect(page.code).toMatch(/^import ['"]vue['"]/m)
          expect(vendor.code).toMatch(/^import \{ ref \} from ['"]vue['"]/m)
        }
      } finally {
        await bundle.close()
      }
    }
  )
})
