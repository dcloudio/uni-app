import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  resolvePinia,
  resolvePiniaAlias,
  resolvePiniaDependencies,
  resolveProjectPinia,
  resolveProjectVueI18n,
  resolveVueI18n,
  resolveVueI18nDependencies,
  resolveVueI18nRuntime,
  resolveVueI18nRuntimeAlias,
} from '../src/resolve'

describe('resolve vue-i18n', () => {
  const originalUniAppX = process.env.UNI_APP_X
  const originalUniCliContext = process.env.UNI_CLI_CONTEXT
  const originalUniInputDir = process.env.UNI_INPUT_DIR
  const temporaryDirectories: string[] = []

  beforeEach(() => {
    Reflect.deleteProperty(process.env, 'UNI_CLI_CONTEXT')
    Reflect.deleteProperty(process.env, 'UNI_INPUT_DIR')
  })

  afterEach(() => {
    if (originalUniAppX === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X')
    } else {
      process.env.UNI_APP_X = originalUniAppX
    }
    if (originalUniCliContext === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_CLI_CONTEXT')
    } else {
      process.env.UNI_CLI_CONTEXT = originalUniCliContext
    }
    if (originalUniInputDir === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_INPUT_DIR')
    } else {
      process.env.UNI_INPUT_DIR = originalUniInputDir
    }
    temporaryDirectories.splice(0).forEach((dir) => {
      fs.rmSync(dir, { recursive: true, force: true })
    })
  })

  test('uses vue-i18n 9 for non uni-app x projects', () => {
    process.env.UNI_APP_X = 'false'

    expect(resolveVueI18nRuntime()).toContain(
      path.join('lib', 'vue-i18n', 'dist', 'vue-i18n.runtime.esm-bundler.js')
    )
    expect(resolveVueI18nDependencies()).toEqual({})
    expect(resolvePiniaDependencies()).toEqual({})
    expect(resolvePiniaAlias()).toEqual({})
  })

  test('uses vue-i18n 11 and its vendored dependencies for uni-app x', () => {
    process.env.UNI_APP_X = 'true'

    expect(resolveVueI18nRuntime()).toContain(
      path.join(
        'lib',
        'dom2',
        'vue-i18n',
        'dist',
        'vue-i18n.runtime.esm-bundler.js'
      )
    )
    expect(resolveVueI18n()).toContain(
      path.join('lib', 'dom2', 'vue-i18n', 'dist', 'vue-i18n.esm-bundler.js')
    )

    const dependencies = resolveVueI18nDependencies()
    expect(Object.keys(dependencies)).toEqual([
      '@intlify/core-base',
      '@intlify/message-compiler',
      '@intlify/shared',
      '@vue/devtools-api',
    ])
    Object.values(dependencies).forEach((filename) => {
      expect(filename).toContain(path.join('lib', 'dom2'))
      expect(fs.existsSync(filename)).toBe(true)
    })
    expect(fs.existsSync(resolveVueI18n())).toBe(true)
    expect(fs.existsSync(resolveVueI18nRuntime())).toBe(true)
  })

  test('uses vue-i18n resolved from the project', () => {
    const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-i18n-'))
    const cliContext = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-cli-'))
    temporaryDirectories.push(projectDir)
    temporaryDirectories.push(cliContext)
    fs.mkdirSync(path.join(projectDir, 'src'))
    const vueI18nDir = path.join(projectDir, 'node_modules/vue-i18n')
    fs.mkdirSync(vueI18nDir, { recursive: true })
    fs.writeFileSync(
      path.join(vueI18nDir, 'package.json'),
      JSON.stringify({
        name: 'vue-i18n',
        exports: {
          '.': './index.js',
        },
      })
    )
    fs.writeFileSync(path.join(vueI18nDir, 'index.js'), 'module.exports = {}')
    fs.writeFileSync(path.join(cliContext, 'package.json'), '{}')
    process.env.UNI_APP_X = 'true'
    process.env.UNI_CLI_CONTEXT = cliContext
    process.env.UNI_INPUT_DIR = path.join(projectDir, 'src')

    expectSameFile(
      resolveProjectVueI18n(),
      path.join(vueI18nDir, 'package.json')
    )
    expect(resolveVueI18nDependencies()).toEqual({})
    expect(resolveVueI18nRuntimeAlias()).toEqual({})
  })

  test('uses pinia 3 and its vendored dependencies for uni-app x', () => {
    process.env.UNI_APP_X = 'true'

    expect(resolvePinia()).toContain(
      path.join('lib', 'dom2', 'pinia', 'dist', 'pinia.mjs')
    )

    const dependencies = resolvePiniaDependencies()
    expect(Object.keys(dependencies)).toEqual(['@vue/devtools-api'])
    Object.values(dependencies).forEach((filename) => {
      expect(filename).toContain(path.join('lib', 'dom2'))
      expect(fs.existsSync(filename)).toBe(true)
    })
    expect(fs.existsSync(resolvePinia())).toBe(true)
    const devtoolsApi = fs.readFileSync(
      dependencies['@vue/devtools-api'],
      'utf8'
    )
    ;[
      'addCustomCommand',
      'addCustomTab',
      'onDevToolsClientConnected',
      'onDevToolsConnected',
      'removeCustomCommand',
      'setupDevToolsPlugin',
      'setupDevtoolsPlugin',
      'isPerformanceSupported',
      'now',
    ].forEach((name) => expect(devtoolsApi).toContain(name))
    expect(devtoolsApi).not.toMatch(/\b(?:import|from)\b/)
  })

  test('uses pinia resolved from the project', () => {
    const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-pinia-'))
    const cliContext = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-cli-'))
    temporaryDirectories.push(projectDir)
    temporaryDirectories.push(cliContext)
    fs.mkdirSync(path.join(projectDir, 'src'))
    const piniaDir = path.join(projectDir, 'node_modules/pinia')
    fs.mkdirSync(piniaDir, { recursive: true })
    fs.writeFileSync(
      path.join(piniaDir, 'package.json'),
      JSON.stringify({
        name: 'pinia',
        exports: {
          '.': './index.js',
        },
      })
    )
    fs.writeFileSync(path.join(piniaDir, 'index.js'), 'module.exports = {}')
    fs.writeFileSync(path.join(cliContext, 'package.json'), '{}')
    process.env.UNI_APP_X = 'true'
    process.env.UNI_CLI_CONTEXT = cliContext
    process.env.UNI_INPUT_DIR = path.join(projectDir, 'src')

    expectSameFile(resolveProjectPinia(), path.join(piniaDir, 'package.json'))
    expect(resolvePiniaDependencies()).toEqual({})
    expect(resolvePiniaAlias()).toEqual({})
  })

  test('ignores dependencies injected from the HBuilderX CLI context', () => {
    const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-project-'))
    const cliContext = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-cli-'))
    temporaryDirectories.push(projectDir, cliContext)
    fs.mkdirSync(path.join(projectDir, 'src'))

    const cliNodeModules = path.join(cliContext, 'node_modules')
    ;['vue-i18n', 'pinia'].forEach((name) => {
      const packageDir = path.join(cliNodeModules, name)
      fs.mkdirSync(packageDir, { recursive: true })
      fs.writeFileSync(
        path.join(packageDir, 'package.json'),
        JSON.stringify({ name, main: 'index.js' })
      )
      fs.writeFileSync(path.join(packageDir, 'index.js'), 'module.exports = {}')
    })

    process.env.UNI_APP_X = 'true'
    process.env.UNI_CLI_CONTEXT = cliContext
    process.env.UNI_INPUT_DIR = path.join(projectDir, 'src')

    expect(resolveProjectVueI18n()).toBeUndefined()
    expect(resolveProjectPinia()).toBeUndefined()
    expect(resolveVueI18nRuntimeAlias()['vue-i18n']).toBe(
      resolveVueI18nRuntime()
    )
    expect(resolvePiniaAlias().pinia).toBe(resolvePinia())
  })

  test('vendored package manifests only reference existing files', () => {
    const libDir = path.resolve(__dirname, '../lib/dom2')
    const packageJsonFiles = [
      'vue-i18n/package.json',
      '@intlify/core-base/package.json',
      '@intlify/message-compiler/package.json',
      '@intlify/shared/package.json',
      '@vue/devtools-api/package.json',
      'pinia/package.json',
    ].map((filename) => path.resolve(libDir, filename))

    const collectEntryFiles = (value: unknown): string[] => {
      if (typeof value === 'string') {
        return [value]
      }
      if (!value || typeof value !== 'object') {
        return []
      }
      return Object.values(value).flatMap(collectEntryFiles)
    }

    packageJsonFiles.forEach((packageJsonFile) => {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'))
      const packageDir = path.dirname(packageJsonFile)
      const entryFiles = collectEntryFiles([
        packageJson.module,
        packageJson.browser,
        packageJson.exports,
      ])
      entryFiles.forEach((entryFile) => {
        expect(fs.existsSync(path.resolve(packageDir, entryFile))).toBe(true)
      })
    })
  })
})
