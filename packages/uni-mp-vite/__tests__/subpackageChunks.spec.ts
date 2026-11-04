import fs from 'fs'
import os from 'os'
import path from 'path'
import { type OutputChunk, type RollupOptions, rollup } from 'rollup'
import {
  addMiniProgramComponentPackageRoot,
  parseManifestJsonOnce,
  resetMiniProgramJsonFiles,
} from '@dcloudio/uni-cli-shared'
import { createBuildOptions } from '../src/plugin/build'
import {
  uniEntryPlugin,
  virtualComponentPath,
  virtualPagePath,
} from '../src/plugins/entry'

describe('ordinary subpackage dependency chunks', () => {
  let inputDir: string
  let env: NodeJS.ProcessEnv
  let modules: Record<string, string>
  let pageA: string
  let pageB: string
  let component: string

  function initialize(enabled = true) {
    fs.writeFileSync(
      path.join(inputDir, 'manifest.json'),
      JSON.stringify({
        'mp-weixin': { optimization: { subPackages: enabled } },
      })
    )
    parseManifestJsonOnce(inputDir)['mp-weixin'] = {
      optimization: { subPackages: enabled },
    }
    const plugin = uniEntryPlugin({
      global: 'wx',
      template: { extname: '.wxml' },
      style: { extname: '.wxss' },
    } as any)
    ;(plugin.buildStart as Function).call({})
  }

  beforeEach(() => {
    env = { ...process.env }
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-subpackage-chunks-'))
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_PLATFORM = 'mp-weixin'
    process.env.UNI_APP_X = 'true'
    delete (process.env as Record<string, string | undefined>)
      .UNI_COMPILE_TARGET
    fs.writeFileSync(path.join(inputDir, 'main.ts'), '')
    fs.writeFileSync(
      path.join(inputDir, 'pages.json'),
      JSON.stringify({
        pages: [{ path: 'pages/index/index' }],
        subPackages: [
          { root: 'pkgA', pages: [{ path: 'index' }] },
          { root: 'pkgB', pages: [{ path: 'index' }] },
        ],
      })
    )
    initialize()
    pageA = virtualPagePath('pkgA/index.vue')
    pageB = virtualPagePath('pkgB/index.vue')
    component = virtualComponentPath('uni_modules/ui/components/foo/foo.vue')
    modules = {
      'main.ts': `export const loadA = () => import(${JSON.stringify(
        pageA
      )}); export const loadB = () => import(${JSON.stringify(pageB)});`,
      [pageA]: `export { value } from './utils/value.ts'`,
      [pageB]: 'export const other = 2',
      'utils/value.ts': 'export const value = 42',
    }
  })

  afterEach(() => {
    resetMiniProgramJsonFiles()
    process.env = env
    fs.rmSync(inputDir, { recursive: true, force: true })
  })

  async function build() {
    const sources = new Map(
      Object.entries(modules).map(([id, code]) => [
        id.startsWith('uniPage:') || id.startsWith('uniComponent:')
          ? id
          : path.join(inputDir, id),
        code,
      ])
    )
    const options = createBuildOptions(inputDir, 'mp-weixin')
    const bundle = await rollup({
      input: path.join(inputDir, 'main.ts'),
      plugins: [
        {
          name: 'fixture',
          resolveId(id, importer) {
            if (sources.has(id)) return id
            const resolved = path.resolve(
              importer && !importer.startsWith('uni')
                ? path.dirname(importer)
                : inputDir,
              id
            )
            if (sources.has(resolved)) return resolved
            throw new Error(`Unresolved fixture import: ${id}`)
          },
          load(id) {
            const code = sources.get(id)
            return code &&
              (id.startsWith('uniPage:') || id.startsWith('uniComponent:'))
              ? code + '; globalThis.registerMiniProgram();'
              : code
          },
        },
      ],
    })
    try {
      const { output } = await bundle.generate(
        (options.rollupOptions as RollupOptions).output as any
      )
      const chunks = output.filter(
        (item): item is OutputChunk => item.type === 'chunk'
      )
      const names = chunks.map((chunk) => chunk.fileName)
      // Check actual generated paths, not just the chunk naming callback.
      for (const chunk of chunks) {
        for (const imported of [...chunk.imports, ...chunk.dynamicImports]) {
          expect(names).toContain(imported)
          if (!chunk.fileName.startsWith('pkg')) {
            expect(
              chunk.imports.filter((name) => name.startsWith('pkg'))
            ).toEqual([])
          }
        }
      }
      return { chunks, names }
    } finally {
      await bundle.close()
    }
  }

  test('moves transitive JS dependencies without following synthetic app imports', async () => {
    modules['utils/value.ts'] = `export { value } from './nested.ts'`
    modules['utils/nested.ts'] = 'export const value = 42'
    const { names } = await build()
    expect(names).toContain('pkgA/utils/nested.js')
    expect(names).not.toContain('utils/nested.js')
  })

  test('uses final component placement for helpers outside the subpackage', async () => {
    addMiniProgramComponentPackageRoot(
      'uni_modules/ui/components/foo/foo',
      'pkgA'
    )
    modules[pageA] = `export const load = () => import(${JSON.stringify(
      component
    )})`
    modules[component] = `export { value } from './utils/value.ts'`
    const { names } = await build()
    expect(names).toContain('pkgA/utils/value.js')
    expect(names).toContain('pkgA/uni_modules/ui/components/foo/foo.js')
  })

  test('keeps dependencies of a shared component in main', async () => {
    addMiniProgramComponentPackageRoot(
      'uni_modules/ui/components/foo/foo',
      'pkgA'
    )
    addMiniProgramComponentPackageRoot(
      'uni_modules/ui/components/foo/foo',
      'pkgB'
    )
    modules[pageA] = `export const load = () => import(${JSON.stringify(
      component
    )})`
    modules[pageB] = modules[pageA]
    modules[component] = `export { value } from './utils/value.ts'`
    const { names } = await build()
    expect(names).toContain('utils/value.js')
    expect(names).not.toContain('pkgA/utils/value.js')
  })

  test('preserves one instance for JS shared across subpackages', async () => {
    modules[pageB] = modules[pageA]
    const { names } = await build()
    expect(names.filter((name) => name.endsWith('utils/value.js'))).toEqual([
      'utils/value.js',
    ])
  })

  test('keeps JS also consumed by App in main', async () => {
    modules['main.ts'] += `export { value } from './utils/value.ts'`
    expect((await build()).names).toContain('utils/value.js')
  })

  test('handles circular dependencies', async () => {
    modules[
      'utils/value.ts'
    ] = `import { read } from './nested.ts'; export const value = 42; export const result = read;`
    modules[
      'utils/nested.ts'
    ] = `import { value } from './value.ts'; export function read() { return value }`
    modules[pageA] = `export { value, result } from './utils/value.ts'`
    const { names } = await build()
    expect(names).toContain('pkgA/utils/value.js')
    expect(names).toContain('pkgA/utils/nested.js')
  })

  test('tracks dynamic consumers of a helper', async () => {
    modules[pageA] = `export const load = () => import('./utils/value.ts')`
    expect((await build()).names).toContain('pkgA/utils/value.js')
  })

  test('does not force erased type-only modules into empty chunks', async () => {
    modules[pageA] += `; import './props.ts'`
    modules['props.ts'] = 'export {}'
    const { names } = await build()
    expect(
      names.some((name) => name.endsWith('/props.js') || name === 'props.js')
    ).toBe(false)
  })

  test('preserves side-effect-only helpers', async () => {
    modules[pageA] += `; import './init.ts'`
    modules['init.ts'] = 'globalThis.initialized = true'
    const { chunks } = await build()
    expect(
      chunks.find((chunk) => chunk.fileName === 'pkgA/init.js')?.code
    ).toContain('initialized = true')
  })

  test('places asset export modules in the consuming subpackage', async () => {
    modules[pageA] = `export { default as logo } from './logo.png'`
    modules['logo.png'] = `export default '/static/logo.png'`
    expect((await build()).names).toContain('pkgA/common/assets.js')
  })

  test('keeps behavior when optimization is disabled', async () => {
    initialize(false)
    expect((await build()).names).toContain('utils/value.js')
  })

  test('keeps ordinary uni-app behavior', async () => {
    process.env.UNI_APP_X = 'false'
    expect((await build()).names).toContain('utils/value.js')
  })

  test('recomputes ownership after consumers change', async () => {
    expect((await build()).names).toContain('pkgA/utils/value.js')
    modules[pageB] = modules[pageA]
    expect((await build()).names).toContain('utils/value.js')
    delete modules[pageB]
    modules[pageB] = 'export const other = 2'
    expect((await build()).names).toContain('pkgA/utils/value.js')
  })
})
