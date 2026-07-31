import {
  addMiniProgramComponentPackageRoot,
  resetMiniProgramJsonFiles,
} from '@dcloudio/uni-cli-shared'
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
    resetMiniProgramJsonFiles()
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

  test('keeps package root when generating dynamic component imports', () => {
    process.env.UNI_INPUT_DIR = '/project/src'
    const code = dynamicImport(
      'UniNumberBox',
      '/project/src/uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box.uvue',
      {
        packageRoot: 'pages-sub',
        inputDir: process.env.UNI_INPUT_DIR,
      }
    )
    const [, id] = code.match(/import\('(.+)'\)/)!

    expect(id).toBe(
      virtualComponentPath(
        '/project/src/uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box.uvue',
        undefined,
        'pages-sub'
      )
    )
    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath:
        '/project/src/uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box.uvue',
      root: undefined,
      packageRoot: 'pages-sub',
    })
  })

  test('keeps current package root when multiple packages use same component', () => {
    process.env.UNI_INPUT_DIR = '/project/src'
    addMiniProgramComponentPackageRoot(
      'uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box',
      'pages-other'
    )
    const code = dynamicImport(
      'UniNumberBox',
      '/project/src/uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box.uvue',
      {
        packageRoot: 'pages-sub',
        inputDir: process.env.UNI_INPUT_DIR,
      }
    )
    const [, id] = code.match(/import\('(.+)'\)/)!

    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath:
        '/project/src/uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box.uvue',
      root: undefined,
      packageRoot: 'pages-sub',
    })
  })

  test('keeps component in main when main package also uses it', () => {
    process.env.UNI_INPUT_DIR = '/project/src'
    addMiniProgramComponentPackageRoot(
      'uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box'
    )
    const code = dynamicImport(
      'UniNumberBox',
      '/project/src/uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box.uvue',
      {
        packageRoot: 'pages-sub',
        inputDir: process.env.UNI_INPUT_DIR,
      }
    )
    const [, id] = code.match(/import\('(.+)'\)/)!

    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath:
        '/project/src/uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box.uvue',
      root: undefined,
      packageRoot: undefined,
    })
  })

  test('does not keep package root for independent root imports', () => {
    process.env.UNI_INPUT_DIR = '/project/src'
    const code = dynamicImport(
      'UniNumberBox',
      withIndependentRoot(
        '/project/src/uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box.uvue',
        'package-a'
      ),
      {
        root: 'package-a',
        packageRoot: 'package-a',
        inputDir: process.env.UNI_INPUT_DIR,
      }
    )
    const [, id] = code.match(/import\('(.+)'\)/)!

    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath:
        '/project/src/uni_modules/uni-number-box-x/components/uni-number-box/uni-number-box.uvue',
      root: 'package-a',
      packageRoot: undefined,
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
