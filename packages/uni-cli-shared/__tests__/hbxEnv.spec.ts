import fs from 'fs'
import os from 'os'
import path from 'path'
import { spawnSync } from 'child_process'
import BuiltinModule from 'module'
import { pathToFileURL } from 'url'

describe('initModulePaths', () => {
  const originalHxAppRoot = process.env.HX_APP_ROOT
  const originalUniCliContext = process.env.UNI_CLI_CONTEXT
  const originalNodeModulePaths = (BuiltinModule as any)._nodeModulePaths
  const originalRegisterHooks = (BuiltinModule as any).registerHooks
  const temporaryDirectories: string[] = []

  afterEach(() => {
    if (originalHxAppRoot === undefined) {
      Reflect.deleteProperty(process.env, 'HX_APP_ROOT')
    } else {
      process.env.HX_APP_ROOT = originalHxAppRoot
    }
    if (originalUniCliContext === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_CLI_CONTEXT')
    } else {
      process.env.UNI_CLI_CONTEXT = originalUniCliContext
    }
    ;(BuiltinModule as any)._nodeModulePaths = originalNodeModulePaths
    ;(BuiltinModule as any).registerHooks = originalRegisterHooks
    temporaryDirectories.splice(0).forEach((dir) => {
      fs.rmSync(dir, { recursive: true, force: true })
    })
    jest.restoreAllMocks()
    jest.resetModules()
  })

  test('Node 22 使用同步 hook 补充 ESM 并保留 CJS 查找逻辑', () => {
    const hxRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-hbx-'))
    const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-project-'))
    temporaryDirectories.push(hxRoot, projectDir)

    const cliContext = path.join(hxRoot, 'plugins', 'uniapp-cli-vite')
    const dependencyDir = path.join(
      cliContext,
      'node_modules',
      'hbx-only-package'
    )
    fs.mkdirSync(dependencyDir, { recursive: true })
    fs.writeFileSync(
      path.join(dependencyDir, 'package.json'),
      JSON.stringify({
        name: 'hbx-only-package',
        type: 'module',
        exports: './index.js',
      })
    )
    const dependencyEntry = path.join(dependencyDir, 'index.js')
    fs.writeFileSync(dependencyEntry, `export default 'resolved'`)
    const plainDependencyDir = path.join(
      cliContext,
      'node_modules',
      'plain-package'
    )
    fs.mkdirSync(plainDependencyDir, { recursive: true })
    fs.writeFileSync(
      path.join(plainDependencyDir, 'index.js'),
      `module.exports = 'resolved without package.json'`
    )

    process.env.HX_APP_ROOT = hxRoot
    process.env.UNI_CLI_CONTEXT = cliContext
    const register = jest
      .spyOn(BuiltinModule as any, 'register')
      .mockImplementation(() => {})
    const registerHooks = jest
      .spyOn(BuiltinModule as any, 'registerHooks')
      .mockImplementation(() => {})

    jest.isolateModules(() => {
      const { initModulePaths } = require('../src/hbx/env')
      initModulePaths()
      initModulePaths()
    })

    expect(registerHooks).toHaveBeenCalledTimes(1)
    expect(register).not.toHaveBeenCalled()
    const cjsPaths = (BuiltinModule as any)._nodeModulePaths(projectDir)
    expect(cjsPaths).toContain(path.join(cliContext, 'node_modules'))
    expect(
      fs.realpathSync(
        (BuiltinModule as any)._findPath('plain-package', cjsPaths, false)
      )
    ).toBe(fs.realpathSync(path.join(plainDependencyDir, 'index.js')))

    const { resolve } = registerHooks.mock.calls[0][0] as {
      resolve: (
        specifier: string,
        context: { parentURL: string },
        nextResolve: (
          specifier: string,
          context: { parentURL: string }
        ) => { url: string; shortCircuit?: boolean }
      ) => { url: string; shortCircuit?: boolean }
    }
    const projectURL = pathToFileURL(path.join(projectDir, 'main.mjs')).href
    const cliURL = pathToFileURL(path.join(cliContext, 'package.json')).href
    const esmError = Object.assign(new Error('missing'), {
      code: 'ERR_MODULE_NOT_FOUND',
    })
    let esmResolveCount = 0
    const esmResult = resolve(
      'hbx-only-package',
      { parentURL: projectURL },
      (_specifier, context) => {
        esmResolveCount++
        if (esmResolveCount === 1) {
          throw esmError
        }
        expect(context.parentURL).toBe(cliURL)
        return { url: pathToFileURL(dependencyEntry).href }
      }
    )
    expect(esmResult.url).toBe(pathToFileURL(dependencyEntry).href)

    const cjsError = Object.assign(new Error('missing'), {
      code: 'MODULE_NOT_FOUND',
    })
    expect(() =>
      resolve('hbx-only-package', { parentURL: projectURL }, () => {
        throw cjsError
      })
    ).toThrow(cjsError)

    expect(() =>
      resolve('\\\\server\\share', { parentURL: projectURL }, () => {
        throw esmError
      })
    ).toThrow(esmError)
    expect(() =>
      resolve('@scope/../package', { parentURL: projectURL }, () => {
        throw esmError
      })
    ).toThrow(esmError)
  })

  test('不支持 registerHooks 时兼容 ESM 回退解析', () => {
    const hxRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-hbx-'))
    const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-project-'))
    temporaryDirectories.push(hxRoot, projectDir)

    const cliContext = path.join(hxRoot, 'plugins', 'uniapp-cli-vite')
    const dependencyDir = path.join(
      cliContext,
      'node_modules',
      'hbx-only-package'
    )
    fs.mkdirSync(dependencyDir, { recursive: true })
    fs.writeFileSync(
      path.join(dependencyDir, 'package.json'),
      JSON.stringify({
        name: 'hbx-only-package',
        type: 'module',
        exports: './index.js',
      })
    )
    fs.writeFileSync(
      path.join(dependencyDir, 'index.js'),
      `export default 'resolved from HBuilderX'`
    )
    const ancestorDependencyDir = path.join(
      cliContext,
      '..',
      'node_modules',
      'hbx-ancestor-package'
    )
    fs.mkdirSync(ancestorDependencyDir, { recursive: true })
    fs.writeFileSync(
      path.join(ancestorDependencyDir, 'package.json'),
      JSON.stringify({
        name: 'hbx-ancestor-package',
        type: 'module',
        exports: './index.js',
      })
    )
    fs.writeFileSync(
      path.join(ancestorDependencyDir, 'index.js'),
      `export default 'must not be resolved'`
    )
    const projectEntry = path.join(projectDir, 'main.mjs')
    fs.writeFileSync(
      projectEntry,
      `
import value from 'hbx-only-package'

let ancestorResult
try {
  await import('hbx-ancestor-package')
  ancestorResult = 'resolved'
} catch (error) {
  ancestorResult = error.code
}
console.log(value)
console.log(ancestorResult)
`
    )

    process.env.HX_APP_ROOT = hxRoot
    process.env.UNI_CLI_CONTEXT = cliContext
    ;(BuiltinModule as any).registerHooks = undefined
    const register = jest
      .spyOn(BuiltinModule as any, 'register')
      .mockImplementation(() => {})

    jest.isolateModules(() => {
      const { initModulePaths } = require('../src/hbx/env')
      initModulePaths()
      initModulePaths()
    })

    expect(register).toHaveBeenCalledTimes(1)
    const [loader, parentURL] = register.mock.calls[0] as [string, URL]
    const result = spawnSync(
      process.execPath,
      [
        '-e',
        `const { register } = require('module'); register(${JSON.stringify(
          loader
        )}, ${JSON.stringify(parentURL.href)}); import(${JSON.stringify(
          pathToFileURL(projectEntry).href
        )})`,
      ],
      { encoding: 'utf8' }
    )

    expect(result.stderr).toBe('')
    expect(result.status).toBe(0)
    expect(result.stdout.trim().split('\n')).toEqual([
      'resolved from HBuilderX',
      'ERR_MODULE_NOT_FOUND',
    ])
  })
})
