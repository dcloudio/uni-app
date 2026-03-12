import path from 'path'
import os from 'os'
import fs from 'fs-extra'
import {
  checkEncryptUniModules,
  findCloudEncryptUniModules,
  findUploadEncryptUniModulesFiles,
  parseUniModulesWithComponents,
} from '../src/uni_modules.cloud'
import { normalizePath } from '../src/utils'
import { isNonTreeShakingPlugin } from '../src/uni_modules'

const platforms = [
  'app-android',
  'app-ios',
  'web',
  'app-harmony',
  'mp-weixin',
] as const
const originalAppX = process.env.UNI_APP_X
beforeAll(() => {
  process.env.UNI_APP_X = 'true'
})

afterAll(() => {
  if (originalAppX === undefined) {
    Reflect.deleteProperty(process.env, 'UNI_APP_X')
  } else {
    process.env.UNI_APP_X = originalAppX
  }
})

describe('uni_modules:uni-ext-api', () => {
  const inputDir = path.resolve(__dirname, '../../playground/uni_modules/src')

  platforms.forEach((platform) => {
    test(`findCloudEncryptUniModules(${platform})`, () => {
      expect(findCloudEncryptUniModules(platform, inputDir)).toMatchSnapshot()
    })
    test(`findUploadEncryptUniModulesFiles(${platform})`, () => {
      const modules = findUploadEncryptUniModulesFiles(
        findCloudEncryptUniModules(platform, inputDir),
        platform,
        inputDir
      )
      expect(
        Object.keys(modules).reduce((res: string[], id: string) => {
          res.push(
            ...modules[id].map((item) => normalizePath(item).split('/src/')[1])
          )
          return res
        }, [])
      ).toMatchSnapshot()
    })
  })
})
describe('uni_modules:cloud', () => {
  const inputDir = path.resolve(__dirname, 'examples/cloud')
  test('parseUniModulesWithComponents', () => {
    expect(
      parseUniModulesWithComponents(inputDir, 'app-android')
    ).toMatchSnapshot()
    expect(parseUniModulesWithComponents(inputDir, 'app-ios')).toMatchSnapshot()
    expect(parseUniModulesWithComponents(inputDir, 'web')).toMatchSnapshot()
    expect(
      parseUniModulesWithComponents(inputDir, 'mp-weixin')
    ).toMatchSnapshot()
  })

  test('parseUniModulesWithComponents(app-android vapor)', () => {
    const dom2 = process.env.UNI_APP_X_DOM2
    process.env.UNI_APP_X_DOM2 = 'true'
    try {
      expect(
        parseUniModulesWithComponents(inputDir, 'app-android')
      ).toMatchSnapshot()
    } finally {
      if (dom2 === undefined) {
        delete process.env.UNI_APP_X_DOM2
      } else {
        process.env.UNI_APP_X_DOM2 = dom2
      }
    }
  })
})

describe('uni_modules:uni-ext-api vapor', () => {
  const inputDir = path.resolve(__dirname, '../../playground/uni_modules/src')
  test('findUploadEncryptUniModulesFiles(app-android vapor)', () => {
    const dom2 = process.env.UNI_APP_X_DOM2
    process.env.UNI_APP_X_DOM2 = 'true'
    try {
      const modules = findUploadEncryptUniModulesFiles(
        findCloudEncryptUniModules('app-android', inputDir),
        'app-android',
        inputDir
      )
      expect(
        Object.keys(modules).reduce((res: string[], id: string) => {
          res.push(
            ...modules[id].map((item) => normalizePath(item).split('/src/')[1])
          )
          return res
        }, [])
      ).toMatchSnapshot()
    } finally {
      if (dom2 === undefined) {
        delete process.env.UNI_APP_X_DOM2
      } else {
        process.env.UNI_APP_X_DOM2 = dom2
      }
    }
  })
})
describe('uni_modules:nonTreeShaking', () => {
  test('should return true when treeShaking is false', () => {
    const uni_modules = {
      treeShaking: false,
    }

    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules)).toBe(true)
  })

  test('should return false when treeShaking is undefined', () => {
    const uni_modules = {}

    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules)).toBe(false)
  })

  test('should return false when treeShaking is true', () => {
    const uni_modules = {
      treeShaking: true,
    }

    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules)).toBe(false)
  })

  test('should return correct result based on platform configuration', () => {
    const uni_modules = {
      treeShaking: {
        web: false,
        'mp-weixin': false,
        'app-android': true,
        'app-ios': true,
      },
    }

    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
  })

  test('should handle nested platform configuration - base app platform is false', () => {
    const uni_modules = {
      treeShaking: {
        app: false,
        web: true,
      },
    }

    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-harmony', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(false)
  })

  test('should handle nested platform configuration - specific sub-platform is false', () => {
    const uni_modules = {
      treeShaking: {
        app: {
          android: false,
          ios: true,
          harmony: false,
        },
        web: true,
      },
    }

    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-harmony', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(false)
  })

  test('should handle mixed configuration - both direct platform and nested configuration', () => {
    const uni_modules = {
      treeShaking: {
        web: false,
        'mp-weixin': true,
        app: {
          android: false,
          ios: true,
        },
      },
    }

    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
  })

  test('should handle empty nested configuration', () => {
    const uni_modules = {
      treeShaking: {
        app: {},
        web: true,
      },
    }

    expect(isNonTreeShakingPlugin('app-android', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app-ios', uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('web', uni_modules)).toBe(false)
  })

  test('should handle invalid platform formats', () => {
    const uni_modules = {
      treeShaking: {
        web: false,
        app: false,
      },
    }

    expect(isNonTreeShakingPlugin('invalid' as any, uni_modules)).toBe(false)
    expect(isNonTreeShakingPlugin('app', uni_modules)).toBe(true)
    expect(isNonTreeShakingPlugin('web-unknown' as any, uni_modules)).toBe(true)
  })

  test('should handle empty objects and null values', () => {
    expect(isNonTreeShakingPlugin('web', {})).toBe(false)
    expect(isNonTreeShakingPlugin('web', { treeShaking: {} })).toBe(false)
    expect(isNonTreeShakingPlugin('web', { treeShaking: null })).toBe(false)
  })

  test('should handle complex real-world configuration scenarios', () => {
    const uni_modules1 = {
      treeShaking: {
        app: {
          android: false,
          ios: true,
          harmony: false,
        },
        web: false,
        'mp-weixin': true,
        'mp-alipay': false,
      },
    }

    // Platforms expected to disable tree shaking
    expect(isNonTreeShakingPlugin('app-android', uni_modules1)).toBe(true)
    expect(isNonTreeShakingPlugin('app-harmony', uni_modules1)).toBe(true)
    expect(isNonTreeShakingPlugin('web', uni_modules1)).toBe(true)
    expect(isNonTreeShakingPlugin('mp-alipay', uni_modules1)).toBe(true)

    // Platforms expected to enable tree shaking
    expect(isNonTreeShakingPlugin('app-ios', uni_modules1)).toBe(false)
    expect(isNonTreeShakingPlugin('mp-weixin', uni_modules1)).toBe(false)
  })
})

describe('uni_modules:cloud cache init', () => {
  const inputDir = path.resolve(__dirname, '../../playground/uni_modules/src')
  const compilerVersion = '4.17-test'

  function writeCachePackage(cacheDir: string, pluginId: string) {
    const sourcePkg = fs.readJsonSync(
      path.resolve(inputDir, 'uni_modules', pluginId, 'package.json')
    )
    fs.outputJsonSync(
      path.resolve(cacheDir, 'uni_modules', pluginId, 'package.json'),
      {
        id: pluginId,
        version: sourcePkg.version,
        uni_modules: {
          dependencies: [],
          artifacts: {
            env: {
              compilerVersion,
            },
            apis: [],
            components: [],
            scopedSlots: [],
            customElements: [],
            declaration: '',
          },
        },
      }
    )
  }

  async function runCheck(
    platform: 'app-android' | 'app-ios',
    isDom2: boolean
  ) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-modules-cloud-'))
    const helpersDir = path.join(tempDir, 'helpers')
    const hbxPluginsDir = path.join(tempDir, 'hbx-plugins')
    const markerFile = path.join(tempDir, 'helpers.log')
    fs.outputFileSync(
      path.join(helpersDir, 'index.js'),
      `
const fs = require('fs')
module.exports = {
  R(args) {
    fs.appendFileSync(${JSON.stringify(
      markerFile
    )}, JSON.stringify(args) + '\\n')
  },
  async C() {
    return true
  },
  async D() {},
  async U() {
    return ''
  },
}
`
    )
    fs.outputFileSync(
      path.join(hbxPluginsDir, 'uni_helpers/lib/bytenode.js'),
      'module.exports = {}'
    )

    writeCachePackage(tempDir, 'test-com1')
    writeCachePackage(tempDir, 'test-com2')

    const oldCacheDir = process.env.UNI_MODULES_ENCRYPT_CACHE_DIR
    const oldCompilerVersion = process.env.UNI_COMPILER_VERSION
    const oldHelpersDir = process.env.UNI_HELPERS_DIR
    const oldHbxPlugins = process.env.UNI_HBUILDERX_PLUGINS
    const oldInputDir = process.env.UNI_INPUT_DIR
    const oldDom2 = process.env.UNI_APP_X_DOM2
    try {
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = tempDir
      process.env.UNI_COMPILER_VERSION = compilerVersion
      process.env.UNI_HELPERS_DIR = helpersDir
      process.env.UNI_HBUILDERX_PLUGINS = hbxPluginsDir
      process.env.UNI_INPUT_DIR = inputDir
      if (isDom2) {
        process.env.UNI_APP_X_DOM2 = 'true'
      } else {
        Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
      }
      await checkEncryptUniModules(inputDir, {
        mode: 'development',
        packType: 'debug',
        compilerVersion,
        appid: '__UNI__TEST',
        appname: 'test',
        platform,
        'uni-app-x': true,
        env: {},
      })
      return fs.existsSync(markerFile)
        ? fs.readFileSync(markerFile, 'utf8').trim().split('\n').filter(Boolean)
        : []
    } finally {
      if (oldCacheDir === undefined) {
        Reflect.deleteProperty(process.env, 'UNI_MODULES_ENCRYPT_CACHE_DIR')
      } else {
        process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = oldCacheDir
      }
      if (oldCompilerVersion === undefined) {
        Reflect.deleteProperty(process.env, 'UNI_COMPILER_VERSION')
      } else {
        process.env.UNI_COMPILER_VERSION = oldCompilerVersion
      }
      if (oldHelpersDir === undefined) {
        Reflect.deleteProperty(process.env, 'UNI_HELPERS_DIR')
      } else {
        process.env.UNI_HELPERS_DIR = oldHelpersDir
      }
      if (oldHbxPlugins === undefined) {
        Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')
      } else {
        process.env.UNI_HBUILDERX_PLUGINS = oldHbxPlugins
      }
      if (oldInputDir === undefined) {
        Reflect.deleteProperty(process.env, 'UNI_INPUT_DIR')
      } else {
        process.env.UNI_INPUT_DIR = oldInputDir
      }
      if (oldDom2 === undefined) {
        Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
      } else {
        process.env.UNI_APP_X_DOM2 = oldDom2
      }
      fs.removeSync(tempDir)
    }
  }

  test('legacy app-android initializes cache on cache hit', async () => {
    await expect(runCheck('app-android', false)).resolves.toHaveLength(1)
  })

  test('app-android vapor skips cache init on cache hit', async () => {
    await expect(runCheck('app-android', true)).resolves.toHaveLength(0)
  })

  test('app-ios skips cache init on cache hit', async () => {
    await expect(runCheck('app-ios', false)).resolves.toHaveLength(0)
  })
})
