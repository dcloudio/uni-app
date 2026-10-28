import path from 'path'
import fs from 'fs'
import os from 'os'

function loadPluginPaths() {
  let pluginPaths!: typeof import('../src/hbx/pluginPaths')
  jest.isolateModules(() => {
    pluginPaths = require('../src/hbx/pluginPaths')
  })
  return pluginPaths
}

describe('HBuilderX plugin paths', () => {
  const originalPluginPaths = process.env.HX_PLUGIN_PATHS
  const originalPluginsRoot = process.env.UNI_HBUILDERX_PLUGINS
  const originalHxAppRoot = process.env.HX_APP_ROOT
  const originalProjectType = process.env.UNI_PROJECT_TYPE

  beforeEach(() => {
    Reflect.deleteProperty(process.env, 'UNI_PROJECT_TYPE')
  })

  afterEach(() => {
    if (originalPluginPaths === undefined) {
      Reflect.deleteProperty(process.env, 'HX_PLUGIN_PATHS')
    } else {
      process.env.HX_PLUGIN_PATHS = originalPluginPaths
    }
    if (originalPluginsRoot === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')
    } else {
      process.env.UNI_HBUILDERX_PLUGINS = originalPluginsRoot
    }
    if (originalHxAppRoot === undefined) {
      Reflect.deleteProperty(process.env, 'HX_APP_ROOT')
    } else {
      process.env.HX_APP_ROOT = originalHxAppRoot
    }
    if (originalProjectType === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_PROJECT_TYPE')
    } else {
      process.env.UNI_PROJECT_TYPE = originalProjectType
    }
    jest.resetModules()
  })

  test('新配置优先于旧插件根目录', () => {
    process.env.HX_PLUGIN_PATHS = JSON.stringify({
      'uniapp-cli-vite': path.resolve('/new/plugins/uniapp-cli-vite'),
    })
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve('/legacy/plugins')
    const { resolveHBuilderXPluginPath } = loadPluginPaths()

    expect(resolveHBuilderXPluginPath('uniapp-cli-vite', 'node_modules')).toBe(
      path.resolve('/new/plugins/uniapp-cli-vite/node_modules')
    )
  })

  test('新配置缺少插件时不回退旧插件根目录', () => {
    process.env.HX_PLUGIN_PATHS = JSON.stringify({})
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve('/legacy/plugins')
    const { resolveHBuilderXPluginPath } = loadPluginPaths()

    expect(resolveHBuilderXPluginPath('uni_helpers')).toBeUndefined()
  })

  test('没有新配置时使用旧插件根目录', () => {
    Reflect.deleteProperty(process.env, 'HX_PLUGIN_PATHS')
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve('/legacy/plugins')
    const { resolveHBuilderXPluginPath } = loadPluginPaths()

    expect(resolveHBuilderXPluginPath('uni_helpers', 'lib/bytenode')).toBe(
      path.resolve('/legacy/plugins/uni_helpers/lib/bytenode')
    )
  })

  test('拒绝无效配置', () => {
    process.env.HX_PLUGIN_PATHS = '[]'
    const { resolveHBuilderXPluginPath } = loadPluginPaths()
    expect(() => resolveHBuilderXPluginPath('uni_helpers')).toThrow(
      'Invalid HX_PLUGIN_PATHS'
    )
  })

  test('新配置存在时仍保留 HX_APP_ROOT 对旧插件根目录的初始化', () => {
    const hxAppRoot = path.resolve('/hbuilder')
    process.env.HX_PLUGIN_PATHS = JSON.stringify({})
    process.env.HX_APP_ROOT = hxAppRoot
    Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')

    let isInHBuilderX!: typeof import('../src/hbx/utils').isInHBuilderX
    jest.isolateModules(() => {
      isInHBuilderX = require('../src/hbx/utils').isInHBuilderX
    })

    expect(isInHBuilderX()).toBe(true)
    expect(process.env.UNI_HBUILDERX_PLUGINS).toBe(
      path.resolve(hxAppRoot, 'plugins')
    )
  })

  describe('工程类型与历史编译环境识别', () => {
    let root: string
    let cwdSpy: jest.SpyInstance

    beforeEach(() => {
      root = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-hbx-env-'))
      Reflect.deleteProperty(process.env, 'HX_APP_ROOT')
      Reflect.deleteProperty(process.env, 'HX_PLUGIN_PATHS')
      Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')
      cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(root)
    })

    afterEach(() => {
      cwdSpy.mockRestore()
      fs.rmSync(root, { recursive: true, force: true })
    })

    function isInHBuilderX() {
      let result!: boolean
      jest.isolateModules(() => {
        result = require('../src/hbx/utils').isInHBuilderX()
      })
      return result
    }

    test.each(['无配置', '仅旧根目录', '仅映射', '映射和旧根目录'])(
      '显式 CLI 工程不因插件路径被识别为内置环境：%s',
      (mode) => {
        process.env.UNI_PROJECT_TYPE = 'cli'
        if (mode.includes('映射')) {
          process.env.HX_PLUGIN_PATHS = JSON.stringify({
            'uniapp-cli-vite': path.join(
              root,
              'plugins [新]',
              'uniapp-cli-vite'
            ),
          })
        }
        if (mode.includes('旧根目录')) {
          process.env.UNI_HBUILDERX_PLUGINS = path.join(root, 'plugins [旧]')
        }
        const pluginsRoot = process.env.UNI_HBUILDERX_PLUGINS
        expect(isInHBuilderX()).toBe(false)
        expect(process.env.UNI_HBUILDERX_PLUGINS).toBe(pluginsRoot)
      }
    )

    test.each([
      [false, false],
      [true, false],
      [false, true],
      [true, true],
    ])(
      '沿用引入插件映射前的 about 初始化：映射=%s，已有根目录=%s',
      (withMapping, withPluginsRoot) => {
        const pluginsRoot = path.join(root, 'plugins [旧]')
        const aboutDir = path.join(pluginsRoot, 'about')
        const cliDir = path.join(pluginsRoot, 'uniapp-cli-vite')
        fs.mkdirSync(aboutDir, { recursive: true })
        fs.mkdirSync(cliDir)
        fs.writeFileSync(
          path.join(aboutDir, 'package.json'),
          JSON.stringify({ name: 'about' })
        )
        cwdSpy.mockReturnValue(cliDir)
        if (withPluginsRoot) {
          process.env.UNI_HBUILDERX_PLUGINS = path.join(
            root,
            'external-plugins'
          )
        }
        if (withMapping) {
          process.env.HX_PLUGIN_PATHS = JSON.stringify({
            'uniapp-cli-vite': path.join(root, 'other-compiler'),
          })
        }
        expect(isInHBuilderX()).toBe(true)
        expect(process.env.UNI_HBUILDERX_PLUGINS).toBe(pluginsRoot)
      }
    )

    test.each([undefined, 'cli', 'hbuilder'] as const)(
      '独立插件布局仅由明确的工程类型识别：%s',
      (projectType) => {
        if (projectType !== undefined) {
          process.env.UNI_PROJECT_TYPE = projectType
        }
        // 即使映射到当前目录，也不能将插件位置当作工程类型。
        process.env.HX_PLUGIN_PATHS = JSON.stringify({
          'uniapp-cli-vite': root,
        })
        expect(isInHBuilderX()).toBe(projectType === 'hbuilder')
        process.env.UNI_HBUILDERX_PLUGINS = path.join(root, 'plugins')
        expect(isInHBuilderX()).toBe(projectType === 'hbuilder')
      }
    )

    test('显式 HBuilder 工程无需依赖相邻 about 或插件路径变量', () => {
      process.env.UNI_PROJECT_TYPE = 'hbuilder'
      expect(isInHBuilderX()).toBe(true)
    })

    test('显式 CLI 工程优先于自动化测试根目录', () => {
      process.env.UNI_PROJECT_TYPE = 'cli'
      process.env.HX_APP_ROOT = root
      expect(isInHBuilderX()).toBe(false)
      expect(process.env.UNI_HBUILDERX_PLUGINS).toBeUndefined()
    })

    test('显式 HBuilder 工程保留自动化测试根目录初始化', () => {
      process.env.UNI_PROJECT_TYPE = 'hbuilder'
      process.env.HX_APP_ROOT = root
      expect(isInHBuilderX()).toBe(true)
      expect(process.env.UNI_HBUILDERX_PLUGINS).toBe(path.join(root, 'plugins'))
    })

    test.each([undefined, '', 'unknown'])(
      '未识别的工程类型不能通过插件映射推断：%s',
      (value) => {
        if (value !== undefined) {
          // 模拟旧启动端或外部进程传入约定之外的值。
          Object.assign(process.env, { UNI_PROJECT_TYPE: value })
        }
        expect(isInHBuilderX()).toBe(false)
        process.env.HX_PLUGIN_PATHS = '{}'
        expect(isInHBuilderX()).toBe(false)
        process.env.UNI_HBUILDERX_PLUGINS = path.join(root, 'plugins')
        expect(isInHBuilderX()).toBe(false)
      }
    )
  })
})
