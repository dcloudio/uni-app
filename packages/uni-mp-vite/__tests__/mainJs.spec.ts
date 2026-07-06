import path from 'path'
import type { ResolvedId } from 'rollup'
import {
  PAGES_JSON_JS,
  findUsingComponents,
  normalizePath,
  resetMiniProgramJsonFiles,
} from '@dcloudio/uni-cli-shared'
import { parseVirtualComponentPathInfo } from '../src/plugins/entry'
import { uniMainJsPlugin } from '../src/plugins/mainJs'
import {
  initIndependentSubPackages,
  parseIndependentRoot,
  withIndependentRoot,
  withoutIndependentRoot,
} from '../src/plugins/independentUtils'

const inputDir = normalizePath(path.resolve('/project/src'))

async function resolve(source: string, importer?: string) {
  if (!source.startsWith('.')) {
    return { id: source } as ResolvedId
  }
  const root = importer && parseIndependentRoot(importer)
  const importerWithoutRoot = importer
    ? withoutIndependentRoot(importer)
    : inputDir
  const resolved = normalizePath(
    path.resolve(path.dirname(importerWithoutRoot), source)
  )
  return {
    id: root ? withIndependentRoot(resolved, root) : resolved,
  } as ResolvedId
}

function createPlugin() {
  const plugin = uniMainJsPlugin({ babelParserPlugins: ['typescript'] }) as any
  plugin.configResolved({})
  return plugin
}

describe('uniMainJsPlugin independent app factory', () => {
  const originalInputDir = process.env.UNI_INPUT_DIR

  beforeEach(() => {
    process.env.UNI_INPUT_DIR = inputDir
    resetMiniProgramJsonFiles()
    initIndependentSubPackages([])
  })

  afterEach(() => {
    resetMiniProgramJsonFiles()
    initIndependentSubPackages([])
    if (originalInputDir === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_INPUT_DIR
    } else {
      process.env.UNI_INPUT_DIR = originalInputDir
    }
  })

  test('keeps independent root when transforming global components', async () => {
    const source = `import App from './App.vue'
import { createSSRApp } from 'vue'
import GlobalCard from './package-independent/components/independent-card/independent-card.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.component('global-card', GlobalCard)
  return { app }
}
`
    const id = withIndependentRoot(`${inputDir}/main.js`, 'package-independent')
    const result = await createPlugin().transform.call({ resolve }, source, id)
    const componentImport = result.code.match(
      /const GlobalCard = \(\)=>import\('([^']+)'\)/
    )

    expect(result.code).not.toContain(PAGES_JSON_JS)
    expect(result.code).not.toContain('createApp().app.mount')
    expect(componentImport).toBeTruthy()
    expect(parseVirtualComponentPathInfo(componentImport![1])).toEqual({
      filepath: `${inputDir}/package-independent/components/independent-card/independent-card.vue`,
      root: 'package-independent',
    })
    expect(findUsingComponents('app')).toMatchObject({
      'global-card':
        '/package-independent/components/independent-card/independent-card',
    })
  })

  test('uses independent root for root-inside global components from app main', async () => {
    initIndependentSubPackages([
      {
        root: 'package-independent',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])
    const source = `import App from './App.vue'
import { createSSRApp } from 'vue'
import GlobalCard from './package-independent/components/independent-card/independent-card.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.component('global-card', GlobalCard)
  return { app }
}
`
    const result = await createPlugin().transform.call(
      { resolve },
      source,
      `${inputDir}/main.js`
    )
    const componentImport = result.code.match(
      /const GlobalCard = \(\)=>import\('([^']+)'\)/
    )

    expect(result.code).toContain(PAGES_JSON_JS)
    expect(result.code).toContain('createApp().app.mount')
    expect(componentImport).toBeTruthy()
    expect(parseVirtualComponentPathInfo(componentImport![1])).toEqual({
      filepath: `${inputDir}/package-independent/components/independent-card/independent-card.vue`,
      root: 'package-independent',
    })
  })

  test('throws when independent root main registers global component', async () => {
    const source = `import GlobalCard from './components/independent-card/independent-card.vue'

export function createApp(subApp) {
  subApp.component('global-card', GlobalCard)
}
`
    const id = withIndependentRoot(
      `${inputDir}/package-independent/main.ts`,
      'package-independent'
    )

    await expect(
      createPlugin().transform.call({ resolve }, source, id)
    ).rejects.toThrow('独立分包 main 暂不支持 app.component 注册全局组件')
  })

  test('allows non app component calls in independent root main', async () => {
    const source = `const foo = {
  component() {}
}

export function createApp(app) {
  foo.component('global-card')
}
`
    const id = withIndependentRoot(
      `${inputDir}/package-independent/main.ts`,
      'package-independent'
    )

    await expect(
      createPlugin().transform.call({ resolve }, source, id)
    ).resolves.toBeUndefined()
  })
})
