import {
  parseVirtualComponentPathInfo,
  virtualComponentPath,
} from '../src/plugins/entry'
import {
  initIndependentSubPackages,
  withIndependentRoot,
} from '../src/plugins/independentUtils'
import { dynamicImport } from '../src/plugins/usingComponents'

describe('mp vite usingComponents', () => {
  const originalInputDir = process.env.UNI_INPUT_DIR

  afterEach(() => {
    initIndependentSubPackages([])
    if (originalInputDir === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_INPUT_DIR
    } else {
      process.env.UNI_INPUT_DIR = originalInputDir
    }
  })

  test('keeps independent root when generating dynamic component imports', () => {
    const code = dynamicImport(
      'ComponentA',
      withIndependentRoot(
        '/project/src/package-a/components/component-a.vue',
        'package-a'
      )
    )
    const [, id] = code.match(/import\('(.+)'\)/)!

    expect(id).toBe(
      virtualComponentPath(
        '/project/src/package-a/components/component-a.vue',
        'package-a'
      )
    )
    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath: '/project/src/package-a/components/component-a.vue',
      root: 'package-a',
    })
  })

  test('infers independent root when explicitly enabled', () => {
    process.env.UNI_INPUT_DIR = '/project/src'
    initIndependentSubPackages([
      {
        root: 'package-a',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])

    const code = dynamicImport(
      'ComponentA',
      '/project/src/package-a/components/component-a.vue',
      {
        inferRoot: true,
        inputDir: process.env.UNI_INPUT_DIR,
      }
    )
    const [, id] = code.match(/import\('(.+)'\)/)!

    expect(id).toBe(
      virtualComponentPath(
        '/project/src/package-a/components/component-a.vue',
        'package-a'
      )
    )
    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath: '/project/src/package-a/components/component-a.vue',
      root: 'package-a',
    })
  })

  test('throws when sync component import crosses into independent subpackage', () => {
    process.env.UNI_INPUT_DIR = '/project/src'
    initIndependentSubPackages([
      {
        root: 'package-a',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])

    expect(() =>
      dynamicImport(
        'ComponentA',
        '/project/src/package-a/components/component-a.vue',
        {
          checkIndependentRoot: true,
          inputDir: process.env.UNI_INPUT_DIR,
        }
      )
    ).toThrow('暂不支持跨分包组件同步引用')
  })
})
