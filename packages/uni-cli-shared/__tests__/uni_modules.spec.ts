import path from 'path'
import os from 'os'
import fs from 'fs-extra'
import {
  checkEncryptUniModules,
  copyEncryptUniModulesDom2Bytes,
  findCloudEncryptUniModules,
  findUploadEncryptUniModulesFiles,
  getUniModulesEncryptType,
  parseUniModulesWithComponents,
  resolveEncryptUniModule,
  validateCloudCompileAppInfo,
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

describe('uni_modules:cloud dom2 bytes', () => {
  const envKeys = [
    'UNI_APP_X_DOM2',
    'UNI_APP_X_VAPOR_RENDER_TARGET',
    'UNI_UTS_PLATFORM',
    'UNI_MODULES_ENCRYPT_CACHE_DIR',
    'UNI_OUTPUT_DIR',
    'UNI_COMPILER_VERSION',
    'UNI_HELPERS_DIR',
    'UNI_HBUILDERX_PLUGINS',
    'UNI_INPUT_DIR',
    'UNI_APP_X_DOM2_CPP_DIR',
  ] as const

  function snapshotEnv() {
    return envKeys.reduce((res, key) => {
      res[key] = process.env[key]
      return res
    }, {} as Record<(typeof envKeys)[number], string | undefined>)
  }

  function restoreEnv(env: ReturnType<typeof snapshotEnv>) {
    envKeys.forEach((key) => {
      const value = env[key]
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        ;(process.env as Record<string, string | undefined>)[key] = value
      }
    })
  }

  function mockCloudHelperCode(extraMethods = '') {
    return `
module.exports = {
${extraMethods}
}
`
  }

  test('validates appid and appname before cloud compile upload', () => {
    expect(
      validateCloudCompileAppInfo({
        appid: '',
        appname: ' ',
      })
    ).toBe(
      '云编译插件失败：manifest.json 缺少 appid、name，请先配置后重新编译。'
    )
    expect(
      validateCloudCompileAppInfo({
        appid: '__UNI__TEST',
        appname: 'test',
      })
    ).toBe('')
  })

  test('stops cloud compile upload when dom2 app info is invalid', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-cloud-'))
    const inputDir = path.join(tempDir, 'input')
    const cacheDir = path.join(tempDir, 'cache')
    const hbxPluginsDir = path.join(tempDir, 'hbx-plugins')
    const pluginId = 'test-cloud-invalid-app-info'
    const oldEnv = snapshotEnv()
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      return undefined as never
    })

    try {
      fs.ensureDirSync(cacheDir)
      fs.ensureDirSync(path.join(inputDir, 'uni_modules', pluginId, 'encrypt'))
      fs.outputJsonSync(
        path.join(inputDir, 'uni_modules', pluginId, 'package.json'),
        {
          name: pluginId,
          version: '1.0.0',
        }
      )
      fs.outputFileSync(
        path.join(
          inputDir,
          'uni_modules',
          pluginId,
          'components',
          pluginId,
          `${pluginId}.uvue`
        ),
        '<template />'
      )

      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'bytecode'
      process.env.UNI_UTS_PLATFORM = 'app-android'
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = cacheDir
      process.env.UNI_OUTPUT_DIR = path.join(tempDir, 'output')
      process.env.UNI_COMPILER_VERSION = '4.17-test'
      process.env.UNI_HBUILDERX_PLUGINS = hbxPluginsDir
      process.env.UNI_INPUT_DIR = inputDir

      await checkEncryptUniModules(inputDir, {
        mode: 'development',
        packType: 'debug',
        compilerVersion: '4.17-test',
        appid: '',
        appname: '',
        platform: 'app-android',
        'uni-app-x': true,
        vapor: true,
        vaporRenderTarget: 'bytecode',
        env: {},
      })

      expect(errorSpy).toHaveBeenCalledWith(
        '云编译插件失败：manifest.json 缺少 appid、name，请先配置后重新编译。'
      )
      expect(exitSpy).toHaveBeenCalledWith(0)
      expect(
        fs.existsSync(path.join(cacheDir, 'cloud-compile-plugins.zip'))
      ).toBe(false)
    } finally {
      errorSpy.mockRestore()
      exitSpy.mockRestore()
      restoreEnv(oldEnv)
      fs.removeSync(tempDir)
    }
  })

  test('copies cloud compile bytes to output dir in dom2', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-dom2-bytes-'))
    const cacheDir = path.join(tempDir, 'cache')
    const outputDir = path.join(tempDir, 'output')
    const oldEnv = snapshotEnv()

    try {
      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'bytecode'
      process.env.UNI_UTS_PLATFORM = 'app-android'
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = cacheDir
      process.env.UNI_OUTPUT_DIR = outputDir

      fs.outputFileSync(path.join(cacheDir, 'bytes', 'app.bin'), 'app')
      fs.outputFileSync(
        path.join(cacheDir, 'bytes', 'pages', 'index.bin'),
        'page'
      )

      expect(copyEncryptUniModulesDom2Bytes()).toBe(true)
      expect(
        fs.readFileSync(path.join(outputDir, 'bytes', 'app.bin'), 'utf8')
      ).toBe('app')
      expect(
        fs.readFileSync(
          path.join(outputDir, 'bytes', 'pages', 'index.bin'),
          'utf8'
        )
      ).toBe('page')
    } finally {
      restoreEnv(oldEnv)
      fs.removeSync(tempDir)
    }
  })

  test('skips copy when dom2 is disabled', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-dom2-bytes-'))
    const cacheDir = path.join(tempDir, 'cache')
    const outputDir = path.join(tempDir, 'output')
    const oldEnv = snapshotEnv()

    try {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
      process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'bytecode'
      process.env.UNI_UTS_PLATFORM = 'app-android'
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = cacheDir
      process.env.UNI_OUTPUT_DIR = outputDir

      fs.outputFileSync(path.join(cacheDir, 'bytes', 'app.bin'), 'app')

      expect(copyEncryptUniModulesDom2Bytes()).toBe(false)
      expect(fs.existsSync(path.join(outputDir, 'bytes', 'app.bin'))).toBe(
        false
      )
    } finally {
      restoreEnv(oldEnv)
      fs.removeSync(tempDir)
    }
  })

  test('skips copy on non app platform', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-dom2-bytes-'))
    const cacheDir = path.join(tempDir, 'cache')
    const outputDir = path.join(tempDir, 'output')
    const oldEnv = snapshotEnv()

    try {
      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'bytecode'
      process.env.UNI_UTS_PLATFORM = 'web'
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = cacheDir
      process.env.UNI_OUTPUT_DIR = outputDir

      fs.outputFileSync(path.join(cacheDir, 'bytes', 'app.bin'), 'app')

      expect(copyEncryptUniModulesDom2Bytes()).toBe(false)
      expect(fs.existsSync(path.join(outputDir, 'bytes', 'app.bin'))).toBe(
        false
      )
    } finally {
      restoreEnv(oldEnv)
      fs.removeSync(tempDir)
    }
  })

  test('skips copy when nativecode cpp cache is missing', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-dom2-bytes-'))
    const cacheDir = path.join(tempDir, 'cache')
    const outputDir = path.join(tempDir, 'output')
    const oldEnv = snapshotEnv()

    try {
      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'nativecode'
      process.env.UNI_UTS_PLATFORM = 'app-android'
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = cacheDir
      process.env.UNI_OUTPUT_DIR = outputDir

      fs.outputFileSync(path.join(cacheDir, 'bytes', 'app.bin'), 'app')

      await expect(
        Promise.resolve(copyEncryptUniModulesDom2Bytes())
      ).resolves.toBe(false)
      expect(fs.existsSync(path.join(outputDir, 'bytes', 'app.bin'))).toBe(
        false
      )
    } finally {
      restoreEnv(oldEnv)
      fs.removeSync(tempDir)
    }
  })

  test('copies cloud compile cpp to dom2 cpp dir in nativecode', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-dom2-cpp-'))
    const cacheDir = path.join(tempDir, 'cache')
    const outputDir = path.join(tempDir, 'output')
    const cppDir = path.join(tempDir, 'dom2-cpp')
    const helpersDir = path.join(tempDir, 'helpers')
    const oldEnv = snapshotEnv()

    try {
      fs.outputFileSync(path.join(cacheDir, 'cpp', 'App.cpp'), 'app-cpp')
      fs.outputFileSync(path.join(cacheDir, 'cpp', 'include', 'App.h'), 'app-h')
      fs.outputFileSync(
        path.join(cacheDir, 'cpp', 'shared_data_init.h'),
        'shared-data'
      )
      fs.outputFileSync(
        path.join(cacheDir, 'cpp', 'assets', 'config.json'),
        '{"name":"app"}'
      )
      fs.outputFileSync(
        path.join(helpersDir, 'index.js'),
        mockCloudHelperCode()
      )

      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'nativecode'
      process.env.UNI_UTS_PLATFORM = 'app-android'
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = cacheDir
      process.env.UNI_OUTPUT_DIR = outputDir
      process.env.UNI_APP_X_DOM2_CPP_DIR = cppDir
      process.env.UNI_HELPERS_DIR = helpersDir

      await expect(
        Promise.resolve(copyEncryptUniModulesDom2Bytes())
      ).resolves.toBe(true)
      expect(fs.readFileSync(path.join(cppDir, 'App.cpp'), 'utf8')).toBe(
        'app-cpp'
      )
      expect(
        fs.readFileSync(path.join(cppDir, 'include', 'App.h'), 'utf8')
      ).toBe('app-h')
      expect(
        fs.readFileSync(path.join(cppDir, 'assets', 'config.json'), 'utf8')
      ).toBe('{"name":"app"}')
      expect(fs.existsSync(path.join(cppDir, 'shared_data_init.h'))).toBe(false)
    } finally {
      restoreEnv(oldEnv)
      fs.removeSync(tempDir)
    }
  })

  test('copies bytes right after cloud download', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-dom2-bytes-'))
    const inputDir = path.join(tempDir, 'input')
    const cacheDir = path.join(tempDir, 'cache')
    const outputDir = path.join(tempDir, 'output')
    const helpersDir = path.join(tempDir, 'helpers')
    const hbxPluginsDir = path.join(tempDir, 'hbx-plugins')
    const pluginId = 'test-cloud-bytes'
    const oldEnv = snapshotEnv()

    try {
      fs.ensureDirSync(cacheDir)
      fs.ensureDirSync(path.join(inputDir, 'uni_modules', pluginId, 'encrypt'))
      fs.outputJsonSync(
        path.join(inputDir, 'uni_modules', pluginId, 'package.json'),
        {
          name: pluginId,
          version: '1.0.0',
        }
      )
      fs.outputFileSync(
        path.join(
          inputDir,
          'uni_modules',
          pluginId,
          'components',
          pluginId,
          `${pluginId}.uvue`
        ),
        '<template />'
      )
      fs.outputFileSync(
        path.join(helpersDir, 'index.js'),
        `
module.exports = {
  R() {},
  async C() {
    return true
  },
  async D(url, file) {
    const AdmZip = require('adm-zip')
    const zip = new AdmZip()
    zip.addFile('bytes/app.bin', Buffer.from('app'))
    zip.writeZip(file)
  },
  async U() {
    return 'https://example.com/download.zip'
  },
}
`
      )
      fs.outputFileSync(
        path.join(hbxPluginsDir, 'uni_helpers/lib/bytenode.js'),
        'module.exports = {}'
      )

      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'bytecode'
      process.env.UNI_UTS_PLATFORM = 'app-android'
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = cacheDir
      process.env.UNI_OUTPUT_DIR = outputDir
      process.env.UNI_COMPILER_VERSION = '4.17-test'
      process.env.UNI_HELPERS_DIR = helpersDir
      process.env.UNI_HBUILDERX_PLUGINS = hbxPluginsDir
      process.env.UNI_INPUT_DIR = inputDir

      await checkEncryptUniModules(inputDir, {
        mode: 'development',
        packType: 'debug',
        compilerVersion: '4.17-test',
        appid: '__UNI__TEST',
        appname: 'test',
        platform: 'app-android',
        'uni-app-x': true,
        vapor: true,
        vaporRenderTarget: 'bytecode',
        env: {},
      })

      expect(
        fs.readFileSync(path.join(outputDir, 'bytes', 'app.bin'), 'utf8')
      ).toBe('app')
    } finally {
      restoreEnv(oldEnv)
      fs.removeSync(tempDir)
    }
  })

  test('skips app info validation before cloud compile upload when dom2 is disabled', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-cloud-'))
    const inputDir = path.join(tempDir, 'input')
    const cacheDir = path.join(tempDir, 'cache')
    const helpersDir = path.join(tempDir, 'helpers')
    const hbxPluginsDir = path.join(tempDir, 'hbx-plugins')
    const markerFile = path.join(tempDir, 'upload.log')
    const pluginId = 'test-cloud-non-dom2'
    const oldEnv = snapshotEnv()

    try {
      fs.ensureDirSync(cacheDir)
      fs.ensureDirSync(path.join(inputDir, 'uni_modules', pluginId, 'encrypt'))
      fs.outputJsonSync(
        path.join(inputDir, 'uni_modules', pluginId, 'package.json'),
        {
          name: pluginId,
          version: '1.0.0',
        }
      )
      fs.outputFileSync(
        path.join(
          inputDir,
          'uni_modules',
          pluginId,
          'components',
          pluginId,
          `${pluginId}.uvue`
        ),
        '<template />'
      )
      fs.outputFileSync(
        path.join(helpersDir, 'index.js'),
        mockCloudHelperCode(`  async C() {
    return true
  },
  R() {},
  async D(url, file) {
    const AdmZip = require('adm-zip')
    const zip = new AdmZip()
    zip.writeZip(file)
  },
  async U() {
    require('fs').writeFileSync(${JSON.stringify(markerFile)}, 'uploaded')
    return 'https://example.com/download.zip'
  },
`)
      )
      fs.outputFileSync(
        path.join(hbxPluginsDir, 'uni_helpers/lib/bytenode.js'),
        'module.exports = {}'
      )

      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
      Reflect.deleteProperty(process.env, 'UNI_APP_X_VAPOR_RENDER_TARGET')
      process.env.UNI_UTS_PLATFORM = 'app-ios'
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = cacheDir
      process.env.UNI_COMPILER_VERSION = '4.17-test'
      process.env.UNI_HELPERS_DIR = helpersDir
      process.env.UNI_HBUILDERX_PLUGINS = hbxPluginsDir
      process.env.UNI_INPUT_DIR = inputDir

      await checkEncryptUniModules(inputDir, {
        mode: 'development',
        packType: 'debug',
        compilerVersion: '4.17-test',
        appid: '',
        appname: '',
        platform: 'app-ios',
        'uni-app-x': true,
        vapor: false,
        env: {},
      })

      expect(fs.readFileSync(markerFile, 'utf8')).toBe('uploaded')
    } finally {
      restoreEnv(oldEnv)
      fs.removeSync(tempDir)
    }
  })

  test('copies cpp right after cloud download in nativecode', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-dom2-cpp-'))
    const inputDir = path.join(tempDir, 'input')
    const cacheDir = path.join(tempDir, 'cache')
    const outputDir = path.join(tempDir, 'output')
    const cppDir = path.join(tempDir, 'dom2-cpp')
    const helpersDir = path.join(tempDir, 'helpers')
    const hbxPluginsDir = path.join(tempDir, 'hbx-plugins')
    const pluginId = 'test-cloud-cpp'
    const oldEnv = snapshotEnv()

    try {
      fs.ensureDirSync(cacheDir)
      fs.ensureDirSync(path.join(inputDir, 'uni_modules', pluginId, 'encrypt'))
      fs.outputJsonSync(
        path.join(inputDir, 'uni_modules', pluginId, 'package.json'),
        {
          name: pluginId,
          version: '1.0.0',
        }
      )
      fs.outputFileSync(
        path.join(
          inputDir,
          'uni_modules',
          pluginId,
          'components',
          pluginId,
          `${pluginId}.uvue`
        ),
        '<template />'
      )
      fs.outputFileSync(
        path.join(helpersDir, 'index.js'),
        mockCloudHelperCode(`  R() {},
  async C() {
    return true
  },
  async D(url, file) {
    const AdmZip = require('adm-zip')
    const zip = new AdmZip()
    zip.addFile('cpp/App.cpp', Buffer.from('app-cpp'))
    zip.addFile('cpp/include/App.h', Buffer.from('app-h'))
    zip.addFile('cpp/shared_data_init.h', Buffer.from('shared-data'))
    zip.writeZip(file)
  },
  async U() {
    return 'https://example.com/download.zip'
  },
`)
      )
      fs.outputFileSync(
        path.join(hbxPluginsDir, 'uni_helpers/lib/bytenode.js'),
        'module.exports = {}'
      )

      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'nativecode'
      process.env.UNI_UTS_PLATFORM = 'app-android'
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = cacheDir
      process.env.UNI_OUTPUT_DIR = outputDir
      process.env.UNI_APP_X_DOM2_CPP_DIR = cppDir
      process.env.UNI_COMPILER_VERSION = '4.17-test'
      process.env.UNI_HELPERS_DIR = helpersDir
      process.env.UNI_HBUILDERX_PLUGINS = hbxPluginsDir
      process.env.UNI_INPUT_DIR = inputDir

      await checkEncryptUniModules(inputDir, {
        mode: 'development',
        packType: 'debug',
        compilerVersion: '4.17-test',
        appid: '__UNI__TEST',
        appname: 'test',
        platform: 'app-android',
        'uni-app-x': true,
        vapor: true,
        vaporRenderTarget: 'nativecode',
        env: {},
      })

      expect(fs.readFileSync(path.join(cppDir, 'App.cpp'), 'utf8')).toBe(
        'app-cpp'
      )
      expect(
        fs.readFileSync(path.join(cppDir, 'include', 'App.h'), 'utf8')
      ).toBe('app-h')
      expect(fs.existsSync(path.join(cppDir, 'shared_data_init.h'))).toBe(false)
    } finally {
      restoreEnv(oldEnv)
      fs.removeSync(tempDir)
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
    isDom2: boolean,
    appInfo = {
      appid: '__UNI__TEST',
      appname: 'test',
    }
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
        appid: appInfo.appid,
        appname: appInfo.appname,
        platform,
        'uni-app-x': true,
        vapor: isDom2,
        ...(isDom2 ? { vaporRenderTarget: 'bytecode' as const } : {}),
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

  test('skips app info validation on cache hit', async () => {
    await expect(
      runCheck('app-ios', false, {
        appid: '',
        appname: '',
      })
    ).resolves.toHaveLength(0)
  })
})

describe('uni_modules:cloud harmony split state', () => {
  const compilerVersion = '4.17-test'

  test('keeps utssdk type after easycom scan returns empty', async () => {
    const tempDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'uni-modules-harmony-')
    )
    const inputDir = path.join(tempDir, 'input')
    const cacheDir = path.join(tempDir, 'cache')
    const pluginId = 'test-harmony-mixed'
    const componentName = 'test-lottie'
    const componentFile = normalizePath(
      path.join(
        inputDir,
        'uni_modules',
        pluginId,
        'components',
        componentName,
        `${componentName}.uvue`
      )
    )

    fs.ensureDirSync(path.join(inputDir, 'uni_modules', pluginId, 'encrypt'))
    fs.outputJsonSync(
      path.join(inputDir, 'uni_modules', pluginId, 'package.json'),
      {
        name: pluginId,
        version: '1.0.0',
      }
    )
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules',
        pluginId,
        'utssdk',
        'app-harmony',
        'index.uts'
      ),
      'export {}'
    )
    fs.outputFileSync(componentFile, '<template />')
    fs.outputJsonSync(
      path.join(cacheDir, 'uni_modules', pluginId, 'package.json'),
      {
        id: pluginId,
        version: '1.0.0',
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

    const oldCacheDir = process.env.UNI_MODULES_ENCRYPT_CACHE_DIR
    const oldCompilerVersion = process.env.UNI_COMPILER_VERSION
    const oldHbxPlugins = process.env.UNI_HBUILDERX_PLUGINS
    const oldInputDir = process.env.UNI_INPUT_DIR

    try {
      process.env.UNI_MODULES_ENCRYPT_CACHE_DIR = cacheDir
      process.env.UNI_COMPILER_VERSION = compilerVersion
      process.env.UNI_HBUILDERX_PLUGINS = tempDir
      process.env.UNI_INPUT_DIR = inputDir

      const baseParams = {
        mode: 'development' as const,
        packType: 'debug' as const,
        compilerVersion,
        appid: '__UNI__TEST',
        appname: 'test',
        platform: 'app-harmony' as const,
        'uni-app-x': true,
        vapor: false,
        env: {},
      }

      await checkEncryptUniModules(
        inputDir,
        {
          ...baseParams,
          env: {
            UNI_HARMONY_SDK_TYPE: 'utssdk',
          },
        },
        'utssdk'
      )
      await checkEncryptUniModules(
        inputDir,
        {
          ...baseParams,
          env: {
            UNI_HARMONY_SDK_TYPE: 'easycom',
          },
        },
        'easycom'
      )

      expect(getUniModulesEncryptType(pluginId)).toBe('utssdk')
      expect(resolveEncryptUniModule(componentFile, 'app-harmony')).toBe(
        undefined
      )
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
      fs.removeSync(tempDir)
    }
  })
})
