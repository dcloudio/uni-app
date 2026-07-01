import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  addMiniProgramAppJson,
  addMiniProgramPageJson,
  addMiniProgramUsingComponents,
  findChangedJsonFiles,
  findMiniProgramUsingComponents,
  findUsingComponentsJson,
  resetMiniProgramJsonFiles,
} from '../src/json/mp/jsonFile'
import xrStart from './examples/usingComponents/wxcomponents/xr-start/xr-start.json'
import xrStartIndex from './examples/usingComponents/wxcomponents/xr-start-index/index.json'

describe('miniProgram:jsonFile', () => {
  const filename = 'pages/index/index'
  test(`usingComponents`, () => {
    const usingComponents = {
      subscribe: 'plugin://subscribeMsg/subscribe',
      demo: '/components/demo/demo',
    }
    addMiniProgramPageJson(filename, {
      usingComponents,
    })
    expect(JSON.parse(findChangedJsonFiles().get(filename)!)).toEqual({
      usingComponents: {
        subscribe: 'plugin://subscribeMsg/subscribe',
        demo: '../../components/demo/demo',
      },
    })
  })

  describe('independent subpackage', () => {
    const originalPlatform = process.env.UNI_PLATFORM
    const originalInputDir = process.env.UNI_INPUT_DIR

    afterEach(() => {
      resetMiniProgramJsonFiles()
      jest.restoreAllMocks()
      if (originalPlatform === undefined) {
        delete (process.env as Record<string, string | undefined>).UNI_PLATFORM
      } else {
        process.env.UNI_PLATFORM = originalPlatform
      }
      if (originalInputDir === undefined) {
        delete (process.env as Record<string, string | undefined>).UNI_INPUT_DIR
      } else {
        process.env.UNI_INPUT_DIR = originalInputDir
      }
    })

    test('inlines global usingComponents into independent pages', () => {
      withIndependentPagesJson('package-a', (inputDir) => {
        process.env.UNI_PLATFORM = 'mp-weixin'
        process.env.UNI_INPUT_DIR = inputDir
        const page = 'package-a/pages/index/index'

        addMiniProgramAppJson({
          ...createIndependentAppJson('package-a'),
          usingComponents: {
            'global-a': '/package-a/components/global-a',
          },
        })
        addMiniProgramUsingComponents('app', {
          'global-b': '/package-a/components/global-b',
        })
        addMiniProgramPageJson(page, {})

        expect(JSON.parse(findChangedJsonFiles(true).get(page)!)).toEqual({
          usingComponents: {
            'global-a': '../../components/global-a',
            'global-b': '../../components/global-b',
          },
        })
      })
    })

    test('throws when independent pages use root-outside global components', () => {
      withIndependentPagesJson('package-a', (inputDir) => {
        process.env.UNI_PLATFORM = 'mp-weixin'
        process.env.UNI_INPUT_DIR = inputDir
        const page = 'package-a/pages/index/index'

        addMiniProgramAppJson({
          ...createIndependentAppJson('package-a'),
          usingComponents: {
            'global-a': '/components/global-a',
          },
        })
        addMiniProgramPageJson(page, {})

        expect(() => findChangedJsonFiles(true)).toThrow(
          '独立分包 "package-a" 不能在 "package-a/pages/index/index" 中使用 root 外组件 "global-a"'
        )
      })
    })

    test('allows independent pages to override root-outside global components', () => {
      withIndependentPagesJson('package-a', (inputDir) => {
        process.env.UNI_PLATFORM = 'mp-weixin'
        process.env.UNI_INPUT_DIR = inputDir
        const page = 'package-a/pages/index/index'

        addMiniProgramAppJson({
          ...createIndependentAppJson('package-a'),
          usingComponents: {
            'global-a': '/components/global-a',
          },
        })
        addMiniProgramPageJson(page, {
          usingComponents: {
            'global-a': '/package-a/components/global-a',
          },
        })

        expect(JSON.parse(findChangedJsonFiles(true).get(page)!)).toEqual({
          usingComponents: {
            'global-a': '../../components/global-a',
          },
        })
      })
    })

    test('throws when independent pages use root-outside local components', () => {
      withIndependentPagesJson('package-a', (inputDir) => {
        process.env.UNI_PLATFORM = 'mp-weixin'
        process.env.UNI_INPUT_DIR = inputDir
        const page = 'package-a/pages/index/index'

        addMiniProgramAppJson(createIndependentAppJson('package-a'))
        addMiniProgramPageJson(page, {
          usingComponents: {
            'local-a': '/components/local-a',
          },
        })

        expect(() => findChangedJsonFiles(true)).toThrow(
          '独立分包 "package-a" 不能在 "package-a/pages/index/index" 中使用 root 外组件 "local-a"'
        )
      })
    })

    test('allows independent pages to use root-inside relative components', () => {
      withIndependentPagesJson('package-a', (inputDir) => {
        process.env.UNI_PLATFORM = 'mp-weixin'
        process.env.UNI_INPUT_DIR = inputDir
        const page = 'package-a/pages/index/index'

        addMiniProgramAppJson(createIndependentAppJson('package-a'))
        addMiniProgramPageJson(page, {
          usingComponents: {
            'local-a': '../../components/local-a',
          },
        })

        expect(JSON.parse(findChangedJsonFiles(true).get(page)!)).toEqual({
          usingComponents: {
            'local-a': '../../components/local-a',
          },
        })
      })
    })

    test('resolves independent page relative wxcomponents from owner filename', () => {
      withIndependentPagesJson('package-a', (inputDir) => {
        process.env.UNI_PLATFORM = 'mp-weixin'
        process.env.UNI_INPUT_DIR = inputDir
        const page = 'package-a/pages/index/index'
        const nativeJson = path.join(
          inputDir,
          'package-a/wxcomponents/native-badge/index.json'
        )
        fs.mkdirSync(path.dirname(nativeJson), { recursive: true })
        fs.writeFileSync(nativeJson, '{"component":true}')
        addMiniProgramPageJson(page, {
          usingComponents: {
            'native-badge': '../../wxcomponents/native-badge/index',
          },
        })
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

        expect(
          findMiniProgramUsingComponents({
            filename: path.join(inputDir, page + '.vue'),
            inputDir,
            componentsDir: 'wxcomponents',
          })
        ).toMatchObject({
          'native-badge': 'component',
        })
        expect(warnSpy).not.toHaveBeenCalled()
      })
    })

    test('resolves independent page absolute wxcomponents with root prefix', () => {
      withIndependentPagesJson('package-a', (inputDir) => {
        process.env.UNI_PLATFORM = 'mp-weixin'
        process.env.UNI_INPUT_DIR = inputDir
        const page = 'package-a/pages/index/index'
        const nativeJson = path.join(
          inputDir,
          'package-a/wxcomponents/native-badge/index.json'
        )
        fs.mkdirSync(path.dirname(nativeJson), { recursive: true })
        fs.writeFileSync(nativeJson, '{"component":true}')
        addMiniProgramPageJson(page, {
          usingComponents: {
            'native-badge': '/package-a/wxcomponents/native-badge/index',
          },
        })
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

        expect(
          findMiniProgramUsingComponents({
            filename: path.join(inputDir, page + '.vue'),
            inputDir,
            componentsDir: 'wxcomponents',
          })
        ).toMatchObject({
          'native-badge': 'component',
        })
        expect(warnSpy).not.toHaveBeenCalled()
      })
    })

    test('throws when independent pages use root-outside relative components', () => {
      withIndependentPagesJson('package-a', (inputDir) => {
        process.env.UNI_PLATFORM = 'mp-weixin'
        process.env.UNI_INPUT_DIR = inputDir
        const page = 'package-a/pages/index/index'

        addMiniProgramAppJson(createIndependentAppJson('package-a'))
        addMiniProgramPageJson(page, {
          usingComponents: {
            'local-a': '../../../components/local-a',
          },
        })

        expect(() => findChangedJsonFiles(true)).toThrow(
          '独立分包 "package-a" 不能在 "package-a/pages/index/index" 中使用 root 外组件 "local-a"'
        )
      })
    })
  })

  describe('miniProgram:jsonFile:findUsingComponentsJson', () => {
    let oldInput = process.env.UNI_INPUT_DIR
    let input = path.resolve(__dirname, './examples/usingComponents')
    beforeAll(() => {
      process.env.UNI_INPUT_DIR = input
    })
    afterAll(() => {
      process.env.UNI_INPUT_DIR = oldInput
    })
    test(`miniProgram:jsonFile:findMiniProgramUsingComponents`, () => {
      let json = findUsingComponentsJson(
        '../wxcomponents/xr-start/xr-start',
        'wxcomponents'
      )
      expect(json).toEqual(xrStart)
      json = findUsingComponentsJson(
        '/wxcomponents/xr-start-index',
        'wxcomponents'
      )
      expect(json).toEqual(xrStartIndex)
      json = findUsingComponentsJson(
        '../wxcomponents/xr-start-index',
        'wxcomponents'
      )
      expect(json).toEqual(xrStartIndex)
      json = findUsingComponentsJson(
        '../wxcomponents/xr-start-error',
        'wxcomponents'
      )
      expect(json).toEqual({})
      json = findUsingComponentsJson(
        '../error-components/xr-start-index',
        'wxcomponents'
      )
      expect(json).toEqual({})
    })
  })
})

function withIndependentPagesJson(
  root: string,
  test: (inputDir: string) => void
) {
  const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-json-file-'))
  fs.writeFileSync(
    path.join(inputDir, 'pages.json'),
    JSON.stringify({
      pages: [{ path: 'pages/index/index' }],
      subPackages: [
        {
          root,
          independent: true,
          pages: [{ path: 'pages/index/index' }],
        },
      ],
    })
  )
  try {
    test(inputDir)
  } finally {
    fs.rmSync(inputDir, { recursive: true, force: true })
  }
}

function createIndependentAppJson(root: string) {
  return {
    pages: [],
    subPackages: [
      {
        root,
        independent: true,
        pages: ['pages/index/index'],
      },
    ],
  }
}
